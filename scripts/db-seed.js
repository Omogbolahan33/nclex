/* RN Ready — content bank seeder.
   Loads js/bank*.js + js/case*.js the same way the server does, then upserts
   every item and case into the `items` / `cases` tables. Idempotent: re-run
   after editing the repo bank to push the changes up.

     npm i pg
     DATABASE_URL="postgresql://…" npm run db:seed

   The server reads these tables at boot and overlays them on the in-repo
   baseline (server.js hydrate), so a row edited here is what examinees see
   after the next restart — no redeploy needed.

   Flags:
     --dry-run   report what would change, write nothing
     --prune     delete rows whose id is no longer in the repo bank
                 (off by default: DB-only items are preserved)                */
const fs = require("fs"), path = require("path"), vm = require("vm");

const ROOT = path.join(__dirname, "..");
const DRY = process.argv.includes("--dry-run");
const PRUNE = process.argv.includes("--prune");

function loadBank(){
  const ctx = { console, Math, JSON, Date, Set, Map, Array, Object, Number, String,
                parseInt, parseFloat, isNaN, setTimeout, clearTimeout };
  ctx.globalThis = ctx; ctx.window = ctx;
  vm.createContext(ctx);
  const { contentFiles } = require(path.join(ROOT, "content.js"));
  for (const f of ["js/taxonomy.js", ...contentFiles(ROOT).all, "js/engine.js"])
    vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), ctx, { filename:f });
  return ctx.window.NC;
}

async function main(){
  if (!process.env.DATABASE_URL){
    console.error("[db:seed] DATABASE_URL is not set — nothing to seed.");
    process.exit(1);
  }
  let pg;
  try { pg = require("pg"); }
  catch(e){ console.error("[db:seed] pg driver missing — run: npm i pg"); process.exit(1); }

  const NC = loadBank();
  const items = NC.BANK.filter(q => q && q.id);
  const cases = NC.CASES.filter(c => c && c.id);
  if (!items.length){ console.error("[db:seed] no items discovered — aborting."); process.exit(1); }

  const CONN = process.env.DATABASE_URL;
  const auto = /supabase[.]com|[.]supabase[.]co|render[.]com|amazonaws[.]com/i.test(CONN) ? "require" : "";
  const mode = (process.env.PGSSL || "").toLowerCase() || auto;
  const ssl = mode === "off" ? undefined : mode === "verify" ? { rejectUnauthorized:true }
            : mode === "require" ? { rejectUnauthorized:false } : undefined;

  const client = new pg.Client({ connectionString: CONN, ssl });
  await client.connect();
  try {
    const before = {
      items: (await client.query("SELECT count(*)::int n FROM items")).rows[0].n,
      cases: (await client.query("SELECT count(*)::int n FROM cases")).rows[0].n,
    };
    console.log(`[db:seed] repo: ${items.length} items, ${cases.length} cases`);
    console.log(`[db:seed] database before: ${before.items} items, ${before.cases} cases`);

    if (DRY){
      const ex = (await client.query("SELECT qid FROM items")).rows.map(r=>r.qid);
      const have = new Set(ex);
      const add = items.filter(i=>!have.has(i.id)).length;
      const repoIds = new Set(items.map(i=>i.id));
      const orphan = ex.filter(q=>!repoIds.has(q));
      console.log(`[db:seed] --dry-run: would insert ${add}, update ${items.length-add}`);
      console.log(`[db:seed] --dry-run: ${orphan.length} row(s) in the database are not in the repo bank` +
                  (orphan.length ? ` (${orphan.slice(0,8).join(", ")}${orphan.length>8?", …":""})` : ""));
      return;
    }

    await client.query("BEGIN");
    for (const it of items)
      await client.query(
        `INSERT INTO items (qid, item, updated_at) VALUES ($1,$2::jsonb,now())
         ON CONFLICT (qid) DO UPDATE SET item=$2::jsonb, updated_at=now()`,
        [it.id, JSON.stringify(it)]);
    for (const c of cases)
      await client.query(
        `INSERT INTO cases (cid, payload, updated_at) VALUES ($1,$2::jsonb,now())
         ON CONFLICT (cid) DO UPDATE SET payload=$2::jsonb, updated_at=now()`,
        [c.id, JSON.stringify(c)]);

    let pruned = { items:0, cases:0 };
    if (PRUNE){
      const r1 = await client.query("DELETE FROM items WHERE NOT (qid = ANY($1))", [items.map(i=>i.id)]);
      const r2 = await client.query("DELETE FROM cases WHERE NOT (cid = ANY($1))", [cases.map(c=>c.id)]);
      pruned = { items:r1.rowCount, cases:r2.rowCount };
    }
    await client.query("COMMIT");

    const after = {
      items: (await client.query("SELECT count(*)::int n FROM items")).rows[0].n,
      cases: (await client.query("SELECT count(*)::int n FROM cases")).rows[0].n,
    };
    console.log(`[db:seed] database after:  ${after.items} items, ${after.cases} cases`);
    if (PRUNE) console.log(`[db:seed] pruned ${pruned.items} item(s), ${pruned.cases} case(s) not in the repo bank`);
    else if (after.items > items.length)
      console.log(`[db:seed] note: ${after.items - items.length} database-only item(s) left untouched (use --prune to remove)`);
    console.log("[db:seed] done — restart the service to pick the bank up.");
  } catch(e){
    await client.query("ROLLBACK").catch(()=>{});
    throw e;
  } finally { await client.end(); }
}
main().catch(e => { console.error("[db:seed] failed:", e.message); process.exit(1); });
