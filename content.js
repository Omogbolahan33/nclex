/* RN Ready — content auto-discovery (v3m scale enabler).
   Hand-typed bank file lists were a per-wave wiring tax and a drift hazard once
   the bank grows past a dozen files. Loader sites (server.js, itemlint CLI,
   calibrate.js, test/smoke.mjs, test/dom.mjs, build-online.mjs) now discover
   js/bank*.js and js/case*.js here, in deterministic numeric order:

     bank.js (=1), bank2.js … bank10.js, bank11.js …
     cases.js (=0), case3.js, case4.js …

   index.html keeps static <script> tags (it is served as-is); a drift guard in
   the smoke suite fails loudly whenever a discovered file is missing there.  */
const fs = require("fs"), path = require("path");

function contentFiles(root){
  const dir = path.join(root || __dirname, "js");
  const found = fs.readdirSync(dir).map(f => {
    const m = /^(bank|cases?|case)([0-9]*)[.]js$/.exec(f);
    if (!m) return null;
    const n = m[2] === "" ? (m[1] === "bank" ? 1 : 0) : parseInt(m[2], 10);
    return { file: f, kind: m[1].startsWith('case') ? 'case' : 'bank', n };
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

module.exports = { contentFiles };
