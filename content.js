/* RN Ready — content auto-discovery (v3m scale enabler).
   Hand-typed bank file lists were a per-wave wiring tax and a drift hazard once
   the bank grows past a dozen files. Loader sites (server.js, itemlint CLI,
   calibrate CLI, test/smoke.mjs, build-online.mjs) discover js/bank*.js and
   js/case*.js here, in deterministic numeric order:

     bank.js (=1), bank2.js … bank10.js, bank11.js …
     cases.js (=0), case3.js, case4.js …

   index.html keeps static <script> tags (it is served as-is); a drift guard in
   the smoke suite fails loudly whenever a discovered file is missing there.

   Root resolution (v3n): explicit arg → RENDER_SRC_DIR → the directory this
   file lives in. process.cwd() was the old default and it broke whenever the
   server was started from another directory (systemd, Vercel lambdas, shells)
   with "ENOENT … scandir '/var/task/js'". __dirname always points at the repo.

   Serverless fallback: on Vercel the js/ sources are compiled INTO the function
   bundle (scripts/vercel-content.mjs runs during `buildCommand` and emits
   vercel-content.cjs, which the bundler inlines). When the js/ directory is not
   on disk, discovery and source loading fall back to that embedded map, so the
   lambda boots without any external files.                                  */
const fs = require("fs"), path = require("path");
const HERE = __dirname;

let EMBEDDED = null; // lazy: only touched when disk reads fail
function embedded(){
  if (EMBEDDED !== null) return EMBEDDED;
  try { EMBEDDED = require("./vercel-content.cjs"); }
  catch(e){ EMBEDDED = null; }
  return EMBEDDED;
}

function base(root){
  return root || process.env.RENDER_SRC_DIR || HERE;
}

function classify(files){ // [filename] → { banks, cases, all } of "js/…" paths
  const found = files.map(f => {
    const m = /^(bank|cases?|case)([0-9]*)[.]js$/.exec(f);
    if (!m) return null;
    const n = m[2] === "" ? (m[1] === "bank" ? 1 : 0) : parseInt(m[2], 10);
    return { file: f, kind: m[1].startsWith("case") ? "case" : "bank", n };
  }).filter(Boolean);
  const byN = (a,b) => a.n - b.n || a.file.localeCompare(b.file);
  const banks = found.filter(x => x.kind === "bank").sort(byN);
  const cases = found.filter(x => x.kind === "case").sort(byN);
  return {
    banks: banks.map(x => "js/" + x.file),
    cases: cases.map(x => "js/" + x.file),
    all: [...banks, ...cases].map(x => "js/" + x.file)
  };
}

function contentFiles(root){
  const dir = path.join(base(root), "js");
  try {
    return classify(fs.readdirSync(dir));
  } catch(e){
    // js/ not on disk (serverless bundle) → use the files compiled into the
    // function by scripts/vercel-content.mjs. Content files only; taxonomy
    // and engine are loaded separately and are also in the embedded map.
    const emb = embedded();
    if (emb){
      const files = Object.keys(emb).map(f => path.basename(f))
        .filter(f => /^(bank|cases?|case)([0-9]*)[.]js$/.test(f));
      console.log(`[content] js/ not found at ${dir} — using embedded bundle (${files.length} content files)`);
      return classify(files);
    }
    console.error(`[content] no js/ directory at ${dir} and no embedded content bundle — run scripts/vercel-content.mjs or deploy from the repo root`);
    throw e;
  }
}

/* Source of one app/content file: disk first, embedded bundle as fallback. */
function loadSource(f, root){
  try { return fs.readFileSync(path.join(base(root), f), "utf8"); }
  catch(e){
    const emb = embedded();
    if (emb && Object.prototype.hasOwnProperty.call(emb, f)) return emb[f];
    throw e;
  }
}

module.exports = { contentFiles, loadSource };
