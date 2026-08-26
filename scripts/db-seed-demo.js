/* RN Ready — DEMO / PRACTICE question-set seeder.
   Upserts the demo bank (demo/bank.demo.js) and demo cases
   (demo/cases.demo.js) into the same `items` / `cases` tables the regular
   bank uses. The ids carry the DEMO- / CASE-DEMO- prefixes, and server.js
   decides at boot whether to serve them:

     DEMO_BANK=1 (Render dashboard) → the demo set REPLACES the served bank
     DEMO_BANK unset/false          → demo rows are ignored; regular bank

   Usage:
     DATABASE_URL="postgresql://…" npm run db:seed:demo          # seed/upsert
     DATABASE_URL="postgresql://…" npm run db:seed:demo -- --remove   # delete
     add --dry-run to either to preview without writing.

   The seed is idempotent — re-run any time the demo files change.           */
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DRY = process.argv.includes("--dry-run");
const REMOVE = process.argv.includes("--remove");

const demoItems = require(path.join(ROOT, "demo", "bank.demo.js"));
const demoCases = require(path.join(ROOT, "demo", "cases.demo.js"));

/* ssl: managed hosts (Supabase/Render/RDS) require TLS unless PGSSL=off */
function sslOpts(){
  const CONN = process.env.DATABASE_URL || "";
  const auto = /supabase[.]com|[.]supabase[.]co|render[.]com|amazonaws[.]com/i.test(CONN) ? "require" : "";
  const mode = (process.env.PGSSL || "").toLowerCase() || auto;
  if (mode === "off") return undefined;
  if (mode === "verify") return { rejectUnauthorized:true };
  if (mode === "require") return { rejectUnauthorized:false };
  return undefined;
}

async function main(){
  if (!process.env.DATABASE_URL){
    console.error("[db:seed:demo] DATABASE_URL is not set — nothing to do.");
    process.exit(1);
  }
  let pg;
  try { pg = require("pg"); }
  catch(e){ console.error("[db:seed:demo] pg driver missing — run: npm i pg"); process.exit(1); }

  const items = demoItems.filter(x => x && x.id && x.id.startsWith("DEMO-"));
  const cases = demoCases.filter(x => x && x.id && x.id.startsWith("CASE-DEMO"));
  if (!items.length || !cases.length){
    console.error("[db:seed:demo] demo files failed prefix validation — aborting.");
    process.exit(1);
  }

  const client = new pg.Client({ connectionString: process.env.DATABASE_URL, ssl: sslOpts() });
  await client.connect();
  try {
    const count = async q => (await client.query(q)).rows[0].n;
    const demoRows = {
      items: (await count("SELECT count(*)::int n FROM items WHERE qid LIKE 'DEMO-%'")),
      cases: (await count("SELECT count(*)::int n FROM cases WHERE cid LIKE 'CASE-DEMO%'")),
    };
    const caseQs = cases.reduce((a,c)=>a+c.items.length, 0);
    console.log(`[db:seed:demo] demo content: ${items.length} standalone items + ${cases.length} cases (${caseQs} case items, ${items.length+caseQs} questions total)`);
    console.log(`[db:seed:demo] database now: ${demoRows.items} demo item(s), ${demoRows.cases} demo case(s)`);

    if (REMOVE){
      if (DRY){ console.log("[db:seed:demo] --dry-run: would delete the demo rows above"); return; }
      await client.query("BEGIN");
      const r1 = await client.query("DELETE FROM items WHERE qid LIKE 'DEMO-%'");
      const r2 = await client.query("DELETE FROM cases WHERE cid LIKE 'CASE-DEMO%'");
      await client.query("COMMIT");
      console.log(`[db:seed:demo] removed ${r1.rowCount} item(s), ${r2.rowCount} case(s).`);
      return;
    }

    if (DRY){ console.log(`[db:seed:demo] --dry-run: would upsert ${items.length} items + ${cases.length} cases`); return; }

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
    await client.query("COMMIT");

    console.log(`[db:seed:demo] upserted ${items.length} item(s) + ${cases.length} case(s).`);
    console.log("[db:seed:demo] done — set DEMO_BANK=1 (then restart) to serve them; unset to serve the regular bank.");
  } catch(e){
    await client.query("ROLLBACK").catch(()=>{});
    throw e;
  } finally { await client.end(); }
}
main().catch(e => { console.error("[db:seed:demo] failed:", e.message); process.exit(1); });
