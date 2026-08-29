/* RN Ready — bulk content importer (large-bank path).
   Ingests a JSON file of items into the AUTHORING PIPELINE as drafts, with no
   HTTP round-trip and none of the 500-item cap the admin API enforces. This is
   the intended route for loading a large externally-authored bank:

     node scripts/import-bank.js --file items.json
     node scripts/import-bank.js --file items.json --dry-run
     node scripts/import-bank.js --file items.json --limit 200

   Input is either a bare array of items or { note, items:[…] } — the same
   shape tools/draft-bank.mjs emits, so the scaffolder pipes straight in.

   Everything lands as status=draft. That is deliberate and not a gap to work
   around: authoring.js documents that AI- or bulk-drafted content cannot reach
   examinees until a human walks it through review → approved → published. This
   script therefore has NO --publish flag by design; release stays a human
   decision made in the admin console, where separation of duties is enforced.

   Guarantees on the way in:
     · every item is validated against the full schema (authoring.validateItem)
     · duplicates are rejected both against the live bank and WITHIN the batch
     · nothing is written unless at least one item imports cleanly
     · --dry-run reports the same verdicts and writes nothing

   Storage: uses the same backend the server uses (store.js → JSON file, or
   Postgres when STORE=pg + DATABASE_URL). */
const fs = require("fs"), path = require("path");

const ROOT = path.join(__dirname, "..");
const args = process.argv.slice(2);
const opt = n => { const i = args.indexOf("--" + n); return i >= 0 ? args[i + 1] : null; };
const FILE = opt("file");
const LIMIT = opt("limit") ? Math.max(1, parseInt(opt("limit"), 10)) : Infinity;
const DRY = args.includes("--dry-run");
const NOTE = opt("note") || "bulk import";
const BATCH = 250; // keeps per-batch error reporting readable at large N

if (!FILE || args.includes("--help")) {
  console.error("usage: node scripts/import-bank.js --file items.json [--limit N] [--note TEXT] [--dry-run]");
  console.error("\n  imports items as DRAFTS; publishing stays a human decision in the admin console");
  process.exit(FILE ? 0 : 1);
}

/* Load the bank through the same vm harness the server uses, so duplicate
   detection and validation run against exactly what examinees would see. */
function loadNC() {
  const vm = require("vm");
  const ctx = { console, Math, JSON, Date, Set, Map, Array, Object, Number, String,
                parseInt, parseFloat, isNaN, RegExp, setTimeout, clearTimeout };
  ctx.globalThis = ctx; ctx.window = ctx;
  vm.createContext(ctx);
  const { contentFiles } = require(path.join(ROOT, "content.js"));
  for (const f of ["js/taxonomy.js", ...contentFiles(ROOT).all, "js/engine.js"])
    vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), ctx, { filename: f });
  ctx.window.NC.load();
  return ctx.window.NC;
}

function readItems(file) {
  const raw = JSON.parse(fs.readFileSync(file, "utf8"));
  const items = Array.isArray(raw) ? raw : (raw && Array.isArray(raw.items) ? raw.items : null);
  if (!items) throw new Error(`${file} must be an array of items, or {note, items:[…]}`);
  return { items, note: (raw && !Array.isArray(raw) && raw.note) || null };
}

async function main() {
  const src = readItems(path.isAbsolute(FILE) ? FILE : path.join(process.cwd(), FILE));
  const all = src.items.filter(Boolean);
  const items = all.slice(0, LIMIT === Infinity ? all.length : LIMIT);
  if (!items.length) { console.error("[import] no items found in " + FILE); process.exit(1); }

  const NC = loadNC();
  const authoring = require(path.join(ROOT, "authoring.js"));
  const store = require(path.join(ROOT, "store.js"));
  const D = store.load();

  const actor = { role: "admin", name: "import-bank", key: "cli" };
  const created = [];
  const errors = [];

  console.log(`[import] ${items.length} item(s) from ${path.basename(FILE)}${LIMIT < all.length ? ` (limited from ${all.length})` : ""}`);
  console.log(`[import] live bank: ${NC.BANK.length} item(s) · backend: ${store.FILE}`);
  if (DRY) console.log("[import] DRY RUN — nothing will be written\n");
  else console.log("");

  for (let i = 0; i < items.length; i += BATCH) {
    const chunk = items.slice(i, i + BATCH);
    if (DRY) {
      // validate without mutating: importDrafts mutates D, so mirror its checks
      chunk.forEach((item, j) => {
        const errs = authoring.validateItem(item, NC);
        if (!errs.length) {
          const dup = authoring.duplicateOf(NC, item);
          if (dup) errs.push(`duplicates ${dup.id} (${dup.kind})`);
        }
        if (errs.length) errors.push({ index: i + j, id: item && item.id, errors: errs });
        else created.push(item.id);
      });
    } else {
      const r = authoring.importDrafts(NC, D, chunk, `${NOTE} #${Math.floor(i / BATCH) + 1}`, actor);
      created.push(...r.created);
      r.errors.forEach(e => errors.push({ ...e, index: e.index + i }));
    }
    process.stdout.write(`  ${Math.min(i + BATCH, items.length)}/${items.length}\r`);
  }
  console.log(" ".repeat(30) + "\r" + `  processed ${items.length}`);

  console.log(`\n[import] accepted as draft : ${created.length}`);
  console.log(`[import] rejected          : ${errors.length}`);
  if (errors.length) {
    const byReason = {};
    errors.forEach(e => e.errors.forEach(msg => {
      const k = msg.replace(/\d+/g, "n").slice(0, 58);
      byReason[k] = (byReason[k] || 0) + 1;
    }));
    console.log("\n[import] rejection reasons:");
    Object.entries(byReason).sort((a, b) => b[1] - a[1]).slice(0, 12)
      .forEach(([k, n]) => console.log(`  ${String(n).padStart(5)}  ${k}`));
    console.log("\n[import] first 10 rejected items:");
    errors.slice(0, 10).forEach(e => console.log(`  [${e.index}] ${e.id || "(no id)"}: ${e.errors.join("; ")}`));
  }

  if (created.length && !DRY) {
    store.saveNow();
    const q = authoring.queueSummary(D);
    console.log(`\n[import] saved. authoring queue: ${JSON.stringify(q)}`);
  } else if (DRY) {
    console.log("\n[import] dry run — re-run without --dry-run to write these drafts.");
  } else {
    console.log("\n[import] nothing imported; store untouched.");
  }

  console.log("\n[import] drafts are NOT visible to examinees. Review and publish in the admin console:");
  console.log("         draft → review → approved → published (separation of duties enforced).");
  process.exit(errors.length && !created.length ? 1 : 0);
}

main().catch(e => { console.error("[import] failed: " + e.message); process.exit(1); });
