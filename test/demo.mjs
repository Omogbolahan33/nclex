/* Demo question-set tests:
   1. content shape — ids, prefixes, uniqueness, per-type answer/rationale fields
   2. lint — the demo set passes the same HARD item-writing gates as the repo bank
   3. scoring — every item scores 1.0 against its own key in the real engine
   4. switch — boots the real server twice on a store that (like Postgres)
      already contains demo rows:
        DEMO_BANK=1  → only the demo set is served (items+cases, health flag)
        DEMO_BANK unset → demo rows are ignored, regular bank served          */
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import url from "url";
import vm from "vm";
import { createRequire } from "module";

const root = path.resolve(url.fileURLToPath(new URL("..", import.meta.url)));
const require = createRequire(import.meta.url);
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.error("  ✗", m); } };

console.log("— demo content shape —");
const bank = require(path.join(root, "demo", "bank.demo.js"));
const cases = require(path.join(root, "demo", "cases.demo.js"));
ok(Array.isArray(bank) && bank.length === 107, `107 standalone demo items (got ${bank?.length})`);
ok(Array.isArray(cases) && cases.length === 6, `6 demo cases (got ${cases?.length})`);
const caseQs = cases.reduce((a, c) => a + c.items.length, 0);
ok(bank.length + caseQs === 128, `128 questions total (got ${bank.length + caseQs})`);

const TYPES = new Set(["single", "multi", "emr", "drag", "cloze", "hotspot", "matrix"]);
const ids = new Set();
for (const q of bank){
  const tag = q.id || "(no id)";
  ok(/^DEMO-\d{3}$/.test(q.id || ""), `${tag}: id matches DEMO-nnn`);
  ok(!ids.has(q.id), `${tag}: id unique`); ids.add(q.id);
  ok(TYPES.has(q.t), `${tag}: known type (${q.t})`);
  ok(typeof q.stem === "string" && q.stem.length > 20, `${tag}: stem present`);
  ok(q.rat && typeof q.rat.c === "string" && q.rat.c.length > 20, `${tag}: rationale (rat.c) present`);
  ok(Number.isInteger(q.d) && q.d >= 0 && q.d <= 3, `${tag}: difficulty d`);
  ok(typeof q.b === "number", `${tag}: IRT b`);
  ok(q.cn && ["MOC","SIC","HPM","PSY","BCC","PHA","RRP","PAA"].includes(q.cn), `${tag}: client need`);
  if (q.t === "single") ok(Number.isInteger(q.ans) && q.ans < q.opts.length, `${tag}: single key in range`);
  if (q.t === "multi") ok(Array.isArray(q.ans) && q.ans.every(a => a < q.opts.length), `${tag}: multi keys in range`);
  if ((q.t === "single" || q.t === "multi") && q.rat.o) ok(q.rat.o.length === q.opts.length, `${tag}: per-option rationales`);
}
const STEPS = new Set(["recognize","analyze","prioritize","generate","act","evaluate"]);
for (const c of cases){
  ok(/^CASE-DEMO-\d{2}$/.test(c.id || ""), `${c.id}: id matches CASE-DEMO-nn`);
  ok(c.exhibits && Object.keys(c.exhibits).length > 0, `${c.id}: exhibits present`);
  ok(c.items.length >= 1, `${c.id}: has items`);
  const steps = new Set();
  for (const it of c.items){
    ok(STEPS.has(it.step), `${c.id}/${it.step}: valid cj step`);
    ok(!steps.has(it.step), `${c.id}/${it.step}: step unique in case`); steps.add(it.step);
    ok(Array.isArray(it.reveal) && it.reveal.length > 0, `${c.id}/${it.step}: reveal list`);
    ok(it.reveal.every(k => c.exhibits[k]), `${c.id}/${it.step}: reveal keys exist`);
    ok(it.rat && typeof it.rat.c === "string", `${c.id}/${it.step}: rationale present`);
  }
}

console.log("— demo lint (same HARD gates as the repo bank) —");
{
  const { lint } = require(path.join(root, "itemlint.js"));
  const r = lint([...bank, ...cases.flatMap(c => c.items.map(i => ({ ...i, id: c.id + "-" + i.step })))]);
  ok(r.hardCount === 0, `no HARD lint flags (got ${r.hardCount})`);
  r.hard.forEach(x => console.error("    HARD", x.id, x.flags.map(f => f[0]).join(",")));
}

console.log("— demo items score 1.0 with their own key (real engine) —");
{
  const ctx = { console, Math, JSON, Date, Set, Map, Array, Object, Number, String, parseInt, parseFloat, isNaN, setTimeout, clearTimeout };
  ctx.globalThis = ctx; ctx.window = ctx; vm.createContext(ctx);
  for (const f of ["js/taxonomy.js", "js/engine.js"])
    vm.runInContext(fs.readFileSync(path.join(root, f), "utf8"), ctx, { filename: f });
  const NC = ctx.window.NC;
  vm.runInContext("NC.load()", ctx);
  NC.BANK = bank.slice(); NC.CASES = cases.slice();
  ok(NC.allItems().length === 128, `engine sees all 128 items (got ${NC.allItems().length})`);
  ok(!!NC.item("DEMO-001") && !!NC.item("CASE-DEMO-04-analyze"), "engine lookups resolve demo ids");
  let bad = 0;
  for (const q of NC.allItems()){
    let ans;
    if (q.t === "emr") ans = q.groups.map(g => g.ans);
    else if (q.cloze) ans = q.cloze.lines.map(l => l.ans);
    else if (q.drag) ans = q.drag.ans;
    else if (q.hotspot) ans = q.hotspot.ans;
    else if (q.matrix) ans = q.matrix.ans;
    else ans = q.ans;
    if (NC.scoreItem(q, ans).score !== 1){ bad++; console.error("    score fail", q.id); }
  }
  ok(bad === 0, `every item scores 1.0 against its key (${bad} failures)`);
}

console.log("— DEMO_BANK switch through the real server —");
{
  // a store that mimics the Postgres layout: demo rows ALREADY present
  const tmp = path.join(fs.mkdtempSync("/tmp/rnready-demo-"), "store.json");
  fs.writeFileSync(tmp, JSON.stringify({ users:{}, tokens:{}, sims:[], responses:[], items: bank, cases }));

  async function boot(env, port){
    const child = spawn(process.execPath, ["server.js"], {
      cwd: root, env: { ...process.env, ...env, PORT: String(port), RNREADY_STORE: tmp }, stdio: ["ignore","pipe","pipe"],
    });
    let logs = "";
    child.stdout.on("data", d => logs += d); child.stderr.on("data", d => logs += d);
    for (let i = 0; i < 60; i++){
      try { const r = await fetch(`http://127.0.0.1:${port}/api/health`); if (r.ok) return { child, logs }; } catch(e){}
      await new Promise(r => setTimeout(r, 250));
    }
    child.kill("SIGKILL");
    throw new Error("server did not boot:\n" + logs);
  }

  // ON: only the demo set is served, sourced from the store (database stand-in)
  {
    const { child, logs } = await boot({ DEMO_BANK: "1" }, 4187);
    const health = await (await fetch("http://127.0.0.1:4187/api/health")).json();
    ok(health.demoBank === true, "health reports demoBank:true when DEMO_BANK=1");
    ok(health.items === 107 && health.cases === 6, `demo-only counts (items ${health.items}, cases ${health.cases})`);
    const bs = await (await fetch("http://127.0.0.1:4187/api/bootstrap")).json();
    ok(bs.bank.length === 107 && bs.bank.every(q => q.id.startsWith("DEMO-")), "bootstrap ships only DEMO- items");
    ok(bs.cases.length === 6 && bs.cases.every(c => c.id.startsWith("CASE-DEMO")), "bootstrap ships only CASE-DEMO cases");
    ok(!bs.bank.some(q => q.id === "MOC-001"), "regular bank hidden while DEMO_BANK on");
    const raw = JSON.stringify(bs);
    ok(!raw.includes('"ans":') && !raw.includes('"rat":'), "demo payload sanitized (no keys/rationales)");
    const ans = await (await fetch("http://127.0.0.1:4187/api/answer", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ sid:"demo-t", qid:"DEMO-001", ans:1 }) })).json();
    ok(ans.score === 1, "server-side scoring works for demo item (DEMO-001)");
    child.kill("SIGTERM"); await new Promise(r => child.on("exit", r));
    ok(logs.includes("DEMO_BANK on"), "boot log announces demo mode");
  }

  // OFF/unset: demo rows in the store are ignored; the regular bank is served
  {
    const { child, logs } = await boot({ DEMO_BANK: "" }, 4189);
    const health = await (await fetch("http://127.0.0.1:4189/api/health")).json();
    ok(health.demoBank === false, "health reports demoBank:false when unset");
    ok(health.items > 300, `regular bank restored (items ${health.items})`);
    const bs = await (await fetch("http://127.0.0.1:4189/api/bootstrap")).json();
    ok(!bs.bank.some(q => q.id.startsWith("DEMO-")), "no DEMO- items served while off");
    ok(!bs.cases.some(c => c.id.startsWith("CASE-DEMO")), "no CASE-DEMO cases served while off");
    ok(bs.bank.some(q => q.id === "MOC-001"), "regular bank items present while off");
    child.kill("SIGTERM"); await new Promise(r => child.on("exit", r));
    ok(logs.includes("DEMO_BANK off — ignoring 107 demo item(s) and 6 demo case(s)"), "boot log reports ignored demo rows");
  }
  fs.rmSync(path.dirname(tmp), { recursive: true, force: true });
}

console.log(`\ndemo suite: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
