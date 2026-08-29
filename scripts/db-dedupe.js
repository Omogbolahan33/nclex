/* RN Ready — duplicate-question finder for the content database (v3o).

   "Some questions in my db are repeated" is a content problem, not an id
   problem: the same question arrives twice under DIFFERENT qids (a document
   imported twice, a bank re-seeded from a renamed file), so every id-keyed
   rule — one-item-per-exam, seen-tracking, calibration — treats them as two
   separate questions and an examinee meets the same one several times.

   This tool reports those clusters straight from the `items` table:
     same-content   stem + every presented option/row/line matches → true repeat
     shared-stem    the stem matches, the options differ → an item set

   The runtime already refuses to co-serve them (server.js links each cluster
   into one constraint group at boot, so at most one member reaches an exam and
   re-tests rotate to the least-exposed copy). This script is for actually
   cleaning the table.

     DATABASE_URL="postgresql://…" npm run db:dedupe                 # report only
     DATABASE_URL="postgresql://…" npm run db:dedupe -- --delete      # delete the extra rows
     DATABASE_URL="postgresql://…" npm run db:dedupe -- --delete --keep=last   # keep the highest id
     add --dry-run to --delete to preview the exact statements.

   Which copy is kept (default: the LOWEST id, i.e. the original):
     --keep=first  lowest qid            --keep=last   highest qid
     --keep=least  the least-exposed copy per the `seen` table

   Responses, sims and the calibration log key on qid, so deleting a row does
   not rewrite history — but the retired copy stops being served. Re-run
   `npm run db:seed` afterwards if the repo bank still contains the copy you
   removed, or it will come back on the next seed.                          */
const path = require("path");
const ROOT = path.join(__dirname, "..");

const arg = n => (process.argv.find(a => a.startsWith("--" + n + "=")) || "").split("=")[1];
const DELETE = process.argv.includes("--delete");
const DRY = process.argv.includes("--dry-run");
const KEEP = (arg("keep") || "first").toLowerCase();
if (!["first", "last", "least"].includes(KEEP)) {
  console.error(`[db:dedupe] unknown --keep=${KEEP} (use first | last | least)`);
  process.exit(1);
}

/* ── same fingerprints the engine and the authoring gate use ── */
const norm = v => String(v == null ? "" : v).toLowerCase()
  .replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"')
  .replace(/[^a-z0-9]+/g, " ").trim();
function presented(q) {
  const p = [String(q.stem || "")];
  if (Array.isArray(q.opts)) q.opts.forEach(o => p.push(String(o)));
  if (q.groups) q.groups.forEach(g => { p.push(String(g.q || g.prompt || "")); (g.opts || []).forEach(o => p.push(String(o))); });
  if (q.drag) { (q.drag.targets || []).forEach(t => p.push(String(t))); (q.drag.opts || []).forEach(o => p.push(String(o))); }
  if (q.cloze) (q.cloze.lines || []).forEach(l => { p.push(String(l.text || l.prompt || "")); (l.opts || []).forEach(o => p.push(String(o))); });
  if (q.hotspot) { p.push(String(q.hotspot.mode || "")); (q.hotspot.rows || []).forEach(r => p.push(String(r))); }
  if (q.matrix) { p.push(String(q.matrix.mode || "")); (q.matrix.cols || []).forEach(c => p.push(String(c))); (q.matrix.rows || []).forEach(r => p.push(String(r))); }
  return p.join("\u0001");
}
const fpOf = q => norm(presented(q));
const stemOf = q => norm(q.stem);

function sslOpts() {
  const CONN = process.env.DATABASE_URL || "";
  const auto = /supabase[.]com|[.]supabase[.]co|render[.]com|amazonaws[.]com/i.test(CONN) ? "require" : "";
  const mode = (process.env.PGSSL || "").toLowerCase() || auto;
  if (mode === "off") return undefined;
  if (mode === "verify") return { rejectUnauthorized: true };
  if (mode === "require") return { rejectUnauthorized: false };
  return undefined;
}

function cluster(list) {                    // group ids by fingerprint
  const m = new Map();
  list.forEach(x => { const k = x.key; if (!m.has(k)) m.set(k, []); m.get(k).push(x); });
  return [...m.values()].filter(v => v.length > 1);
}

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("[db:dedupe] DATABASE_URL is not set — nothing to scan.");
    process.exit(1);
  }
  let pg;
  try { pg = require("pg"); }
  catch (e) { console.error("[db:dedupe] pg driver missing — run: npm i pg"); process.exit(1); }

  const client = new pg.Client({ connectionString: process.env.DATABASE_URL, ssl: sslOpts() });
  await client.connect();
  try {
    const rows = (await client.query("SELECT qid, item FROM items ORDER BY qid")).rows;
    const seen = new Map((await client.query("SELECT qid, n FROM seen")).rows.map(r => [r.qid, r.n]));
    if (!rows.length) { console.log("[db:dedupe] the items table is empty — run `npm run db:seed` first."); return; }

    const items = rows.map(r => ({ qid: r.qid, item: r.item || {}, n: seen.get(r.qid) || 0 }));
    const exact = cluster(items.map(x => ({ ...x, key: fpOf(x.item) })));
    const exactIds = new Set(exact.flat().map(x => x.qid));
    const stems = cluster(items.filter(x => !exactIds.has(x.qid)).map(x => ({ ...x, key: stemOf(x.item) })));

    console.log(`[db:dedupe] scanned ${items.length} row(s) in \`items\`\n`);

    const report = (title, groups, note) => {
      console.log(`— ${title}: ${groups.length} cluster(s), ${groups.reduce((a, g) => a + g.length, 0)} row(s) — ${note}`);
      groups.forEach(g => {
        const keep = pickKeeper(g);
        g.forEach(x => console.log(`    ${x.qid === keep ? "keep  " : "DROP  "} ${x.qid.padEnd(12)} seen=${x.n}`));
        console.log(`    stem: ${String(g[0].item.stem || "").slice(0, 110)}`);
        console.log("");
      });
    };
    function pickKeeper(g) {
      if (KEEP === "last") return g[g.length - 1].qid;
      if (KEEP === "least") return g.slice().sort((a, b) => a.n - b.n || String(a.qid).localeCompare(String(b.qid)))[0].qid;
      return g[0].qid;
    }

    if (!exact.length && !stems.length) {
      console.log("No duplicate content and no shared stems — the bank is clean.");
      return;
    }
    if (exact.length) report("SAME CONTENT (the same question under several ids)", exact,
      "true repeats: one row per cluster is enough");
    if (stems.length) report("SHARED STEM (item set: same stem, different options)", stems,
      "legitimate as an item set, but never co-served in one exam");

    const doomed = [];
    exact.forEach(g => { const k = pickKeeper(g); g.forEach(x => { if (x.qid !== k) doomed.push(x.qid); }); });
    console.log(`[db:dedupe] ${doomed.length} row(s) would be removed (keeping --keep=${KEEP}); shared stems are left alone`);

    if (!DELETE) {
      console.log("[db:dedupe] report only — re-run with --delete to remove the extra rows (add --dry-run to preview)");
      return;
    }
    if (!doomed.length) { console.log("[db:dedupe] nothing to delete."); return; }
    if (DRY) {
      console.log("[db:dedupe] --dry-run: would run");
      console.log(`  DELETE FROM items WHERE qid = ANY($1)  -- [${doomed.join(", ")}]`);
      console.log(`  DELETE FROM bank_patches WHERE qid = ANY($1)  -- [${doomed.join(", ")}]`);
      return;
    }
    await client.query("BEGIN");
    const r1 = await client.query("DELETE FROM items WHERE qid = ANY($1)", [doomed]);
    let patches = 0;
    try { patches = (await client.query("DELETE FROM bank_patches WHERE qid = ANY($1)", [doomed])).rowCount; }
    catch (e) { /* bank_patches absent on a v1 schema — not fatal */ }
    await client.query("COMMIT");
    console.log(`[db:dedupe] removed ${r1.rowCount} duplicate item row(s)` +
                (patches ? ` and ${patches} authoring patch(es)` : "") +
                `. Restart the service to reload the bank.`);
  } catch (e) {
    await client.query("ROLLBACK").catch(() => {});
    throw e;
  } finally { await client.end(); }
}
main().catch(e => { console.error("[db:dedupe] failed:", e.message); process.exit(1); });
