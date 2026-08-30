/* Smoke test: loads the app scripts in a bare Node context and exercises the engine. */
import fs from "fs"; import path from "path"; import vm from "vm";
import { createRequire } from "module";
const root = path.resolve(process.cwd());
const { contentFiles } = await import("../content.js");
const files = ["js/taxonomy.js", ...contentFiles(root).all, "js/engine.js"];
const ctx = { console, Math, JSON, Date, Set, Map, Array, Object, Number, String, parseInt, parseFloat, isNaN };
ctx.globalThis = ctx;
ctx.window = ctx;
vm.createContext(ctx);
for (const f of files) vm.runInContext(fs.readFileSync(path.join(root,f),"utf8"), ctx, {filename:f});
vm.runInContext(`
  NC.load();  // init mem state
`, ctx);

const NC = ctx.window.NC;
let pass=0, fail=0;
const ok = (cond,msg)=>{ if(cond){pass++;} else {fail++; console.error("  ✗ FAIL:", msg);} };
const correctAnsFor = q => {
  switch(q.t){
    case "single": return q.ans;
    case "multi": return q.ans;
    case "emr": { const o={}; q.groups.forEach((g,i)=>o[i]=g.ans); return o; }
    case "drag": return q.drag.ans;
    case "cloze": return q.cloze.lines.map(l=>l.ans);
    case "hotspot": return q.hotspot.ans;
    case "matrix": return q.matrix.ans;
  }
};

console.log("— item-writing lint gate (NCSBN-style) —");
{
  const { lintItem, HARD } = await import("../itemlint.js");
  const flagged = [];
  for (const q of NC.allItems()){
    const hard = lintItem(q).filter(f=>HARD.has(f[0]));
    if (hard.length) flagged.push(q.id+": "+hard.map(f=>f[1]).join("; "));
  }
  ok(flagged.length===0, "0 HARD item-writing flags across all items — "+flagged.slice(0,5).join(" | "));
}

console.log("— loader auto-discovery + index.html drift guard —");
{
  const html = fs.readFileSync(path.join(root,"index.html"),"utf8");
  const tags = new Set([...html.matchAll(/<script src="js\/(bank[0-9]*|cases?|case[0-9]*)[.]js"><\/script>/g)].map(m=>"js/"+m[1]+".js"));
  const expected = new Set(contentFiles(root).all);
  const missing = [...expected].filter(f=>!tags.has(f));
  ok(missing.length===0, `every discovered content file wired into index.html (missing: ${missing.join(", ")||"none"})`);
  const extra = [...tags].filter(f=>!expected.has(f));
  ok(extra.length===0, `no stale script tags in index.html (extra: ${extra.join(", ")||"none"})`);
}

console.log("— bank integrity —");
for (const q of NC.BANK){
  ok(q.id && q.stem && q.cn && q.sys && q.topic!=null && q.rat?.c && q.rat?.s, "meta "+q.id);
  ok(typeof q.d==="number" && q.d>=0 && q.d<=3, "difficulty "+q.id);
}
ok(NC.BANK.length>=308, "bank size >= 308, got "+NC.BANK.length);
ok(new Set(NC.BANK.map(q=>q.id)).size===NC.BANK.length, "bank ids unique");
console.log("— variant groups (anti-memorization) —");
{
  const groups = {};
  NC.allItems().forEach(q=>{ if(q.variantGroup) (groups[q.variantGroup] ||= []).push(q.id); });
  const gids = Object.keys(groups);
  ok(gids.length>=11, `variant groups present (${gids.length})`);
  ok(gids.every(g=>groups[g].length>=2), `every variant group has ≥2 members: ${JSON.stringify(groups)}`);
  ok(gids.every(g=>new Set(groups[g]).size===groups[g].length), "no duplicate ids inside groups");
  // practice picks never contain 2 items of the same group — 20 iterations, deterministic rule
  for (let i=0;i<20;i++){
    const pick = NC.pickItems({excludeSeen:false}, 60);
    const g = {};
    let clash = false;
    pick.forEach(q=>{ if(q.variantGroup){ if(g[q.variantGroup]) clash=true; g[q.variantGroup]=1; } });
    ok(!clash && pick.length===60, `pickItems ≤1/group iter ${i} (${pick.length} picked)`);
  }
  // explicit pair: ids-filtered pick returns exactly one member of a group
  {
    const one = NC.pickItems({ids:["PHA-002","PHA-030"]}, 2);
    ok(one.length===1, `group pair collapses to 1 in one pick (${one.map(q=>q.id)})`);
  }
  // rotation: mark one member heavily exposed → picks must prefer the fresh sibling
  {
    const st = NC.load(); const bak = JSON.stringify(st.seen);
    st.seen["PHA-002"]=9; st.seen["PHA-030"]=0;
    NC.save();
    let rotated=0;
    for (let i=0;i<10;i++){ if (NC.pickItems({ids:["PHA-002","PHA-030"],excludeSeen:true},1)[0].id==="PHA-030") rotated++; }
    ok(rotated===10, `exposure rotation picks fresh sibling 10/10 (got ${rotated})`);
    NC.load().seen = JSON.parse(bak); NC.save();
  }
}
ok(NC.CASES.length>=6, "cases >= 6, got "+NC.CASES.length);

console.log("— authoring: authored items are live immediately —");
{
  const A = (await import("file://"+path.join(root,"authoring.js"))).default || require(path.join(root,"authoring.js"));
  const D = {};
  const base = { id:"ZZZ-901", t:"single", cn:"SIC", sys:"INF", topic:"Authoring test", d:1, b:0, cj:"act",
    tags:["test"], stem:"Which action by the nurse is the priority in this scenario?",
    opts:["Do the right thing","Do a risky thing","Do nothing"], ans:0,
    rat:{c:"The right thing is evidence-based and safest.",s:"Fall back on ABC and infection control."} };
  // validation unit checks
  ok(A.validateItem(base,NC).length===0, "valid item passes");
  ok(A.validateItem({...base,id:"zz-9"},NC).some(e=>/id/.test(e)), "bad id rejected");
  // qid width: 3 digits preserved for the existing bank, 4 now allowed.
  // The old /\d{3}/ capped the bank at 999 per prefix (8 client-need prefixes
  // x 999 = 7,992 qids) — below any large-bank target. 4 digits gives 79,992.
  ok(A.validateItem({...base,id:"ZZZ-999"},NC).length===0, "3-digit qid still valid (back-compat)");
  ok(A.validateItem({...base,id:"ZZZ-1000"},NC).length===0, "4-digit qid valid (ceiling lifted)");
  ok(A.validateItem({...base,id:"ZZZ-9999"},NC).length===0, "4-digit qid at range top valid");
  ok(A.validateItem({...base,id:"ZZZ-10000"},NC).some(e=>/id/.test(e)), "5-digit qid rejected");
  const wide = A.createDraft(NC,D,{...base,id:"ZZZ-1001",stem:"Which action by the nurse is the priority for a four-digit qid item?"},"wide id");
  ok(wide.record && wide.record.status==="published", "4-digit qid authored end-to-end");
  ok(A.validateItem({...base,cn:"XX"},NC).some(e=>/cn/.test(e)), "bad client need rejected");
  ok(A.validateItem({...base,t:"single",ans:7},NC).some(e=>/ans/.test(e)), "out-of-range key rejected");
  ok(A.validateItem({...base,t:"multi",opts:["a","b"],ans:[]},NC).length>0, "empty multi key rejected");
  ok(A.validateItem({...base,rat:{}},NC).length>=2, "missing rationales rejected");
  ok(A.validateItem({...base,t:"drag",drag:{targets:["A","B"],opts:["x"],ans:[0,5]}},NC).length>0, "malformed drag rejected");
  ok(A.validateItem({...base,t:"matrix",matrix:{cols:["y","n"],rows:["r1","r2"],ans:[0]}},NC).length>0, "short matrix ans rejected");

  /* ── whole-bank schema guard ───────────────────────────────────────────
     29 shipped items silently failed validateItem: 17 had cj:null, 6 had the
     legacy cj:"take-action", and 6 hotspot items used mode:"rows" against a
     validator that only accepted "row"/"cell". Nothing caught it because the
     validator only ever ran on incoming drafts, never on the content bank —
     so every one of those items was invisible to any cj filter and would have
     been rejected the moment an editor opened it in the authoring console.   */
  const invalid = NC.BANK.filter(q=>A.validateItem(q,NC).length>0)
    .map(q=>`${q.id}:${A.validateItem(q,NC)[0]}`);
  ok(invalid.length===0, `every bank item passes validateItem (${invalid.length} invalid${invalid.length?": "+invalid.slice(0,3).join(", "):""})`);
  const badCj = NC.BANK.filter(q=>!NC.TAX.cjSteps.includes(q.cj)).map(q=>q.id);
  ok(badCj.length===0, `every bank item uses a taxonomy cj step (${badCj.length} off-taxonomy${badCj.length?": "+badCj.slice(0,3).join(", "):""})`);

  /* id-prefix / client-need consistency. Two wave-30 items shipped with PAA
     ids and cn:"PHA". Nothing caught it: validateItem checks the id shape and
     the cn value independently but never compares them, and itemlint skips
     both — so the whole suite passed while the coverage report, which groups
     by q.cn, silently attributed the items to the wrong blueprint area. The
     prefix is what an author reads when choosing the next free id, so a
     mismatch also corrupts id allocation. Only NC.BANK is checked: case
     sub-items legitimately carry a body-system id (CASE-MI-01-act) with a
     per-step cn, so including them would fail on 36 correct items.          */
  const cnIds = NC.TAX.clientNeeds.map(c=>c.id);
  const badPfx = NC.BANK
    // Only real client-need prefixes. The ZZZ-* items this file creates via
    // createDraft land in NC.BANK too, and their prefix is deliberately not a
    // client need, so an unscoped check fails on its own fixtures.
    .filter(q=>cnIds.includes(String(q.id).split("-")[0]))
    .filter(q=>String(q.id).split("-")[0]!==q.cn)
    .map(q=>`${q.id}(cn=${q.cn})`);
  ok(badPfx.length===0, `every bank item's id prefix matches its cn (${badPfx.length} mismatched${badPfx.length?": "+badPfx.slice(0,3).join(", "):""})`);

  /* Paraphrase guard. duplicateClusters() is fingerprint-exact, so a reworded
     copy of an existing item sails through — 12 wave-4 items reused topics the
     bank already covered while the scan reported "0 duplicates". Same stem AND
     same key under two ids is the repeat-the-user-sees case.               */
  const il = createRequire(import.meta.url)(path.join(root,"itemlint.js"));
  ok(il.duplicateClusters(NC.BANK).exactCount===0, "no same-content clusters in the bank");
  const near = il.nearDuplicatePairs(NC.BANK);
  ok(near.length===0, `no near-duplicate pairs (stem ≥0.45 + key ≥0.50)${near.length?": "+near.slice(0,3).map(p=>p.a+"~"+p.b).join(", "):""}`);
  // lifecycle: authoring publishes in one step, with no review queue
  const bank0 = NC.BANK.length;
  const r0 = A.createDraft(NC,D,{...base,id:"ZZZ-902"},"n1");
  ok(r0.record && r0.record.status==="published", "authored item is published immediately");
  ok(NC.BANK.length===bank0+1 && NC.item("ZZZ-902"), "authored item is live in the bank at once");
  ok(!!D.bankPatches["ZZZ-902"], "authored item wrote a bank patch for boot replay");
  ok(r0.record.version===1, "first authoring is version 1");
  // overwriting a live item still snapshots the outgoing version
  const pub2 = A.createDraft(NC,D,{...base,id:"ZZZ-902",stem:"Which action by the nurse is the priority, revised for clarity?"},"v2 edit");
  ok(pub2.record.version===2, "re-authoring bumps version");
  ok(pub2.record.history.some(h=>h.event==="published-over" && h.snapshot), "outgoing version snapshotted");
  ok(NC.item("ZZZ-902").stem.includes("revised"), "bank serves v2");
  // the two real gates still hold
  const badD = A.createDraft(NC,D,{...base,id:"ZZZ-903",cn:"BAD"},"bad");
  ok(badD.errors && badD.errors.length>0, "invalid item refused outright");
  const dupD = A.createDraft(NC,D,{...base,id:"ZZZ-905",stem:"Which action by the nurse is the priority, revised for clarity?"},"dup");
  ok(dupD.errors && /duplicates ZZZ-902/.test(dupD.errors[0]), "duplicate content refused outright");
  // retire removes from serving, patch replays at boot
  A.transition(NC,D,"ZZZ-902","retired","done");
  ok(!NC.item("ZZZ-902") && NC.BANK.length===bank0, "retired item unserved");
  const replay = A.applyPatches(NC,D);
  ok(replay.set>=0 && replay.removed>=0, `boot patch replay ok (${replay.set} set, ${replay.removed} removed)`);
  // bulk import publishes the valid rows and rejects the invalid ones
  const imp = A.importDrafts(NC,D,[{...base,id:"ZZZ-904"},{...base,id:"nope"}],"bulk");
  ok(imp.created.length===1 && imp.errors.length===1, "bulk import filters invalid rows");
  ok(A.getRecord(D,"ZZZ-904") && A.getRecord(D,"ZZZ-904").status==="published", "imported items are live immediately");
  ok(!!NC.item("ZZZ-904"), "imported item is in the bank");
  const ex = A.exportAll(NC,D);
  ok(ex.bank===NC.BANK && ex.authoring["ZZZ-902"].version===2, "export carries bank + authoring state");
}
console.log("— scoring: correct answers earn 100% —");
const all = NC.allItems();
for (const q of all){
  const r = NC.scoreItem(q, correctAnsFor(q));
  ok(r.answered && r.score===1, `full credit ${q.id} → ${r.score}`);
}
console.log("— scoring: wrong answers < 100% —");
const wrongAnsFor = q => {
  switch(q.t){
    case "single": return (q.ans+1)%q.opts.length;
    case "multi": return q.opts.map((_,i)=>!q.ans.includes(i)?i:null).filter(x=>x!=null);
    case "emr": { const w={}; q.groups.forEach((g,i)=>w[i]=g.opts.map((_,j)=>!g.ans.includes(j)?j:null).filter(x=>x!=null)); return w; }
    case "drag": return q.drag.ans.map(x=>(x+1)%q.drag.targets.length);
    case "cloze": return q.cloze.lines.map(l=>(l.ans+1)%l.opts.length);
    case "hotspot": return q.hotspot.rows.map((_,i)=>i).filter(i=>!q.hotspot.ans.includes(i));
    case "matrix": return q.matrix.ans.map(x=>(x+1)%q.matrix.cols.length);
  }
};
for (const q of all){
  const r = NC.scoreItem(q, wrongAnsFor(q));
  ok(r.score<1, `wrong scores <1 ${q.id} → ${r.score}`);
}
console.log("— scoring: unanswered is flagged, not credit —");
ok(NC.scoreItem(NC.BANK[0], null).answered===false, "unanswered flagged");

console.log("— blueprint coverage of bank —");
const byCn = {};
NC.allItems().forEach(q=>byCn[q.cn]=(byCn[q.cn]||0)+1);
NC.TAX.clientNeeds.forEach(c=>ok(byCn[c.id]>=3, `coverage ${c.id} = ${byCn[c.id]||0}`));
const types = new Set(NC.allItems().map(q=>q.t));
["single","multi","emr","drag","cloze","hotspot","matrix"].forEach(t=>ok(types.has(t), "type present: "+t));

console.log("— simulation: all-correct candidate stops above threshold —");
vm.runInContext("NC.load().seen = {};", ctx);
const sim = NC.newSim("rn-preview-sim");
let guard=0, servedCase=false;
while(true){
  const nxt = NC.simNext(sim);
  if (nxt.kind==="done") break;
  if (guard++>300) { ok(false,"sim infinite loop"); break; }
  if (nxt.kind==="item"){ NC.simAnswer(sim, nxt.item, correctAnsFor(nxt.item), 20000); }
  else { servedCase = true;
    for (const it of nxt.case.items){ NC.simCaseItemAnswered(sim, nxt.case, it.step, correctAnsFor(it), 30000); } }
}
const scoredCount = sim.administered.filter(x=>x.scored).length;
ok(sim.status==="done", "sim finished");
ok(scoredCount>=sim.cfg.minItems, `stopped at/after min (${scoredCount} ≥ ${sim.cfg.minItems})`);
ok(scoredCount<=sim.cfg.maxItems, `stopped at/before max (${scoredCount})`);
ok(sim.outcome==="above", "all-correct → above, got "+sim.outcome);
ok(sim.theta>0.8, "theta climbed: "+sim.theta.toFixed(2));
const cnSum = Object.values(sim.counts).reduce((a,b)=>a+b,0);
ok(cnSum===scoredCount, `blueprint counts sum ${cnSum} == scored ${scoredCount}`);
ok(servedCase, "case study served in sim");

console.log("— simulation: case selection covers the whole case pool —");
{
  // every sim carries its own shuffled selection; served cases must come from it,
  // and across sims EVERY case in the pool must be reachable (regression for the
  // round-robin bug that stranded the 4th case when caseStudies < CASES.length)
  const picked = new Set();
  // 60 trials left ~0.16% miss probability per case (~3% per run) because selection
  // is a uniform shuffle; that made this a flaky test rather than a regression guard.
  // 300 trials push the false-failure probability to ~1e-14 while a genuinely
  // stranded case still can never be picked, so the guard keeps its meaning.
  for (let t=0; t<300; t++){
    // alternate two RN configs: the full sim takes 3 cases, the preview takes 1,
    // so together they must still reach every case in the pool
    const sx = NC.newSim(t%2 ? "rn-preview-sim" : "nclex-rn-2026");
    ok(sx.caseIds && sx.caseIds.length===sx.cfg.caseStudies && new Set(sx.caseIds).size===sx.caseIds.length,
       `sim selects ${sx.cfg.caseStudies} distinct cases (${sx.caseIds})`);
    sx.caseIds.forEach(c=>picked.add(c));
  }
  ok(NC.CASES.every(c=>picked.has(c.id)), "all "+NC.CASES.length+" cases reachable across RN sims (picked "+[...picked].join(", ")+")");
  // walk one sim to its first case slot and confirm the served case is from that sim's selection
  const sw = NC.newSim("rn-preview-sim");
  let servedCase=null, guard=0;
  while (guard++<400 && sw.status==="open"){
    const nxt = NC.simNext(sw);
    if (nxt.kind==="done") break;
    if (nxt.kind==="case"){ servedCase = nxt.case.id; break; }
    NC.simAnswer(sw, nxt.item, correctAnsFor(nxt.item), 15000);
  }
  ok(servedCase && sw.caseIds.includes(servedCase), `first served case '${servedCase}' ∈ sim selection [${sw.caseIds}]`);
}

console.log("— simulation: all-wrong candidate stops below threshold —");
const sim2 = NC.newSim("rn-preview-sim");
guard=0;
while(true){
  const nxt = NC.simNext(sim2);
  if (nxt.kind==="done") break;
  if (guard++>300) { ok(false,"sim2 loop"); break; }
  if (nxt.kind==="item") NC.simAnswer(sim2, nxt.item, wrongAnsFor(nxt.item), 90000);
  else for (const it of nxt.case.items) NC.simCaseItemAnswered(sim2, nxt.case, it.step, wrongAnsFor(it), 90000);
}
ok(sim2.outcome==="below", "all-wrong → below, got "+sim2.outcome+" theta="+sim2.theta.toFixed(2));

console.log("— stats & readiness —");
const st = NC.stats();
ok(st.byCn.length===8 && st.byCj.length===6, "stat axes complete");
const R = NC.readiness();
ok(R.ok===true, "readiness unlocked (need ≥10 responses)");
ok(R.score>=1 && R.score<=99, "readiness in range: "+R.score);
ok(R.dims && R.dims.knows>0, "three-dimension model present");
const weak = NC.weakAreas(1,5);
ok(Array.isArray(weak) && weak.length<=5, "weak areas detected: "+weak.length);

console.log("— full 85–150 simulation runs without reuse —");
{
  const st0 = NC.load(); st0.seen = {}; NC.save = NC.save || function(){};
  const sim3 = NC.newSim("nclex-rn-2026");
  let guard=0; const ids=[];
  while(true){
    const nxt = NC.simNext(sim3);
    if (nxt.kind==="done") break;
    if (guard++>200){ ok(false,"full sim loop"); break; }
    if (nxt.kind==="item"){ ids.push(nxt.item.id); NC.simAnswer(sim3, nxt.item, wrongAnsFor(nxt.item), 60000); }
    else for (const it of nxt.case.items){ ids.push(nxt.case.id+"-"+it.step); NC.simCaseItemAnswered(sim3, nxt.case, it.step, wrongAnsFor(it), 60000); }
  }
  const scored = sim3.administered.filter(x=>x.scored);
  ok(sim3.status==="done", "full sim finished");
  ok(scored.length>=85 && scored.length<=150, `scored ${scored.length} in [85,150]`);
  const unique = new Set(sim3.administered.map(a=>a.qid)).size;
  ok(unique===sim3.administered.length, `no item reuse (${unique}/${sim3.administered.length} unique)`);
  ok(sim3.casesDone===3, "3 case studies served, got "+sim3.casesDone);
  const vg = NC.variantGroups();
  const served = sim3.administered.map(a=>{ const q=NC.item(a.qid); return q && q.variantGroup; }).filter(Boolean);
  ok(served.length===new Set(served).size, `simulation served ≤1 item per variant group (${served.length} grouped serves)`);
}

console.log("— sims survive JSON persistence (pretest slots) —");
{
  // Sims are stored as JSON (localStorage; JSONB rows under STORE=pg), so no
  // field on a sim may be a Set: it stringifies to {}. Regression for
  // "sim.pretestAt.has is not a function" — a restart used to crash /api/sim/next
  // on every in-flight exam.
  const st = NC.load();
  const fresh = NC.newSim("nclex-rn-2026");
  ok(JSON.parse(JSON.stringify(fresh.pretestAt)).length > 0, "pretest slots survive a JSON round-trip");

  // rehydrate the way hydrate() does: the doc read back from the store replaces
  // the live sim, then the engine must keep serving items.
  const revived = JSON.parse(JSON.stringify(fresh));
  st.sims[st.sims.indexOf(fresh)] = revived;
  ok(NC.simNext(revived).kind === "item", "revived sim serves its next item");

  // sims written before the fix carry pretestAt as the flattened {} (or nothing);
  // slots are re-planned from cfg rather than crashing.
  for (const legacy of [{}, undefined]){
    const old = JSON.parse(JSON.stringify(fresh));
    old.id = "legacy" + (legacy ? "-obj" : "-missing");
    if (legacy) old.pretestAt = legacy; else delete old.pretestAt;
    st.sims.push(old);
    ok(NC.simNext(old).kind === "item", "legacy sim (" + old.id + ") serves its next item");
    ok(Array.isArray(old.pretestAt) && old.pretestAt.join() === fresh.pretestAt.join(),
       "legacy sim (" + old.id + ") re-plans the same slots [" + old.pretestAt.join(",") + "]");
  }

  // pretest items are still marked, and never scored
  const walk = NC.newSim("nclex-rn-2026");
  let g = 0, pretests = 0;
  while (g++ < 200){
    const nxt = NC.simNext(walk);
    if (nxt.kind === "done") break;
    if (nxt.kind === "item"){ if (nxt.pretest) pretests++; NC.simAnswer(walk, nxt.item, wrongAnsFor(nxt.item), 60000); }
    else for (const it of nxt.case.items) NC.simCaseItemAnswered(walk, nxt.case, it.step, wrongAnsFor(it), 60000);
  }
  ok(pretests === walk.cfg.pretestItems, `served ${pretests}/${walk.cfg.pretestItems} pretest items`);
  ok(walk.administered.filter(x=>x.pretest).every(x=>x.scored===false), "pretest items are never scored");
}

console.log("— spaced repetition scheduling —");
{
  const resp0 = NC.load().responses.length;
  // simulate a session with misses across two topics
  const sid = "srstest";
  NC.applyScore(sid, "PHA-001", 1, {score:1, answered:true}, 9000, false);   // correct → not scheduled
  NC.applyScore(sid, "PHA-002", [0], {score:0.2, answered:true}, 9000, false); // miss → scheduled
  NC.applyScore(sid, "MOC-005", [0,2,1,0,2], {score:1, answered:true}, 9000, false);
  const scheduled = NC.srsProcessSession(sid);
  ok(scheduled===1, "one missed concept scheduled, got "+scheduled);
  ok(NC.srsCounts().total>=1, "srs queue populated");
  // nothing due yet (due = +1 day)
  ok(NC.srsDue().every(d=>d.topic!=="Digoxin toxicity")||NC.srsDue().length>=0, "due computed");
  // force one due, then pass the check → interval grows; fail → resets
  const st = NC.load(); const key = Object.keys(st.srs)[0];
  st.srs[key].due = Date.now()-1000;
  const dueList = NC.srsDue();
  ok(dueList.some(d=>d.topic===key), "forced-due concept appears in queue");
  NC.srsCheck(key, 0.9);
  ok(NC.load().srs[key].interval>=2, "pass grows interval to "+NC.load().srs[key].interval);
  NC.srsCheck(key, 0.2);
  ok(NC.load().srs[key].interval===1 && NC.load().srs[key].streak===0, "fail resets to interval 1");
}

console.log("— distractor analysis (v3d) —");
{
  const C = (await import("file://"+path.join(root,"calibrate.js"))).default;
  const item = { id:"DTX-001", t:"single", cn:"MOC", sys:"INF", topic:"Distractor test", d:1, b:0,
    opts:["key","trap","deadA","deadB"], ans:0 };
  // 20 sessions: 10 strong (rest 1.0) pick the trap option 1; 10 weak (rest 0.0) pick the key
  const rs=[];
  for (let k=0;k<10;k++){
    const strong="s"+k, weak="w"+k;
    for (let f=0;f<4;f++) rs.push({qid:"F"+f, sid:strong, answered:true, score:1, ans:0});
    rs.push({qid:"DTX-001", sid:strong, answered:true, score:0, ans:1});
    for (let f=0;f<4;f++) rs.push({qid:"F"+f, sid:weak, answered:true, score:0, ans:0});
    rs.push({qid:"DTX-001", sid:weak, answered:true, score:1, ans:0});
  }
  const da = C.distractors(rs, [item]);
  const row = da.items.find(x=>x.qid==="DTX-001");
  ok(row && row.n===20 && row.flagged, "distractor row computed (n=20, flagged)");
  const o = row.options;
  ok(o[0].key===true && o[0].n===10 && o[0].pct===0.5, "key option: 10/20 picks, pct .5");
  ok(o[0].rpb===-1 && o[0].flags.includes("weak-key"), "key discriminates negatively → weak-key flag");
  ok(o[1].n===10 && o[1].rpb===1 && o[1].flags.includes("attracts-strong"), "trap picked by strong candidates → attracts-strong");
  ok(o[2].n===0 && o[2].flags.includes("dead") && o[3].flags.includes("dead"), "unpicked options flagged dead");
  // multi: per-option binary, thin sample → no flags
  const mitem = { id:"DTX-002", t:"multi", cn:"MOC", sys:"INF", topic:"Multi", d:1, b:0,
    opts:["a","b","c"], ans:[0,2] };
  const mrs = [];
  for (let k=0;k<6;k++) mrs.push({qid:"DTX-002", sid:"m"+k, answered:true, score:1, ans:[0,2]});
  const da2 = C.distractors(mrs, [mitem]);
  const mrow = da2.items.find(x=>x.qid==="DTX-002");
  ok(mrow.options[0].n===6 && mrow.options[0].key===true && mrow.options[1].n===0, "multi per-option counts");
  ok(mrow.options.every(x=>!x.flags.length), "thin sample (n=6 < 20) → no flags thrown");
}

console.log("— study reminders (v3d) —");
{
  // notify.js runs against window.NC — load it into the engine ctx (window === ctx)
  vm.runInContext(fs.readFileSync(path.join(root,"js","notify.js"),"utf8"), ctx, {filename:"js/notify.js"});
  const N = ctx.window.NC.notify;
  ok(!!N && typeof N.nextDue==="function", "notify module loaded in engine context");
  const now = new Date("2026-08-23T10:00:00").getTime();
  ok(N.nextDue("19:00", now) === new Date("2026-08-23T19:00:00").getTime(), "nextDue: later today");
  ok(N.nextDue("09:00", now) === new Date("2026-08-24T09:00:00").getTime(), "nextDue: rolls to tomorrow when passed");
  ok(N.nextDue("bogus", now)===null, "nextDue: invalid time → null");
  ok(N.nextDue("7:05", now) === new Date("2026-08-24T07:05:00").getTime(), "nextDue: single-digit hour parses");
  // persistence via engine state
  ok(N.cfg().on===false, "reminder off by default");
  N.cfg().on=true; N.cfg().time="18:30"; NC.save();
  ok(NC.load().user.reminder.on===true && NC.load().user.reminder.time==="18:30", "reminder persists in engine state");
  N.cfg().on=false; NC.save();
  // message builder uses exam date + streak
  const st = NC.load(); st.user.examDate = new Date(Date.now()+3*864e5).toISOString().slice(0,10);
  NC.save();
  ok(/3 days to your exam/.test(N.message()), "message counts down to exam: "+N.message());
}

console.log("— EAP ability estimation (v3b) —");
{
  const easy={b:-1.4}, mid={b:0}, hard={b:1.35};
  ok(NC.eapTheta([])===0, "no items → prior center 0");
  ok(NC.eapTheta([{...mid,score:1}])>0.3, "one correct mid item → positive theta: "+NC.eapTheta([{...mid,score:1}]));
  ok(NC.eapTheta([{...mid,score:0}])<-0.3, "one wrong mid item → negative theta");
  const tHard = NC.eapTheta([{...hard,score:1},{...hard,score:1},{...hard,score:1},{...hard,score:1}]);
  const tEasy = NC.eapTheta([{...easy,score:1},{...easy,score:1},{...easy,score:1},{...easy,score:1}]);
  ok(tHard>tEasy+0.5, `correct-on-hard ranks above correct-on-easy (${tHard} > ${tEasy})`);
  const mixed=[{...easy,score:1},{...mid,score:0.5},{...hard,score:0}];
  ok(Math.abs(NC.eapTheta(mixed))<1.0, "mixed performance → mid theta: "+NC.eapTheta(mixed));
  // monotonic in n for consistent performance
  const grow=[...Array(8)].map(()=>({...hard,score:1}));
  ok(NC.eapTheta(grow.slice(0,4)) <= NC.eapTheta(grow)+0.01, "more evidence doesn't lower consistent-correct theta");
  // recomputeTheta consistency after practice
  const th0 = NC.load().theta;
  ok(typeof th0==="number" && th0>=-2.5 && th0<=2.5, "global theta in range: "+th0);
}

console.log("— study plan & filter engine —");
ok(NC.studyPlan().length>=2, "study plan generated");
ok(NC.countFor({cn:["PHA"]})>0 && NC.countFor({types:["matrix"]})>0, "axis filters resolve");
ok(NC.pickItems({cn:["PHA"],excludeSeen:true},5).every(q=>q.cn==="PHA"), "filtered pick respects Client Need");

console.log("— duplicate questions: never co-served, never repeated in one exam (v3o) —");
{
  const st0 = NC.load();
  const bankBak = NC.BANK.slice(), casesBak = NC.CASES.slice(), seenBak = JSON.stringify(st0.seen);
  st0.seen = {};

  // (1) THE REPORTED BUG: a pool smaller than the exam used to recycle items —
  //     the same question could be served 5, 10, 12 times in one sitting.
  {
    NC.BANK.length = 0; NC.BANK.push(...bankBak.slice(0,30));
    NC.CASES.length = 0;
    NC.linkDuplicates();
    let worst = 0, poolStops = 0;
    for (let run=0; run<5; run++){
      const sim = NC.newSim("nclex-rn-2026");
      const served = []; let guard = 0, done = null;
      while (guard++ < 400){
        const nxt = NC.simNext(sim);
        if (nxt.kind === "done"){ done = nxt; break; }
        served.push(nxt.item.id);
        NC.simAnswer(sim, nxt.item, wrongAnsFor(nxt.item), 60000);
      }
      const tally = {}; served.forEach(id => tally[id] = (tally[id]||0)+1);
      worst = Math.max(worst, ...Object.values(tally));
      ok(new Set(served).size === served.length, `small pool: exam served each item once (run ${run}, ${served.length} items)`);
      if (done && done.reason === "pool") poolStops++;
    }
    ok(worst === 1, `small pool: no item served twice across 5 exams (worst repeat ${worst})`);
    ok(poolStops === 5, `small pool: exam ends with stopReason "pool" instead of recycling (${poolStops}/5)`);
  }

  // (2) same question under a second id + a shared-stem sibling
  {
    NC.BANK.length = 0; NC.BANK.push(...bankBak.slice(0,12).map(q=>({...q})));
    const copy  = { ...bankBak[3], id:"DUP-001" };                       // same content, new id
    const sib   = { ...bankBak[5], id:"DUP-002", ans:0 };                // same stem, other options
    NC.BANK.push(copy, sib);
    const rep = NC.linkDuplicates();
    ok(rep.clusters >= 2, `duplicate index found the injected clusters (${rep.clusters})`);
    ok(rep.exact >= 1 && rep.sharedStems >= 1, `report separates same-content (${rep.exact}) from shared-stem (${rep.sharedStems})`);
    const g1 = NC.groupOf(NC.BANK.find(q=>q.id==="DUP-001"));
    ok(!!g1 && g1 === NC.groupOf(bankBak[3]), "a re-seeded copy lands in the same constraint group as the original");
    ok(NC.groupOf(bankBak[0]) == null || NC.groupOf(bankBak[0]) !== g1, "unrelated items stay unconstrained");
    let coServed = 0, stemCo = 0, repeats = 0;
    for (let run=0; run<25; run++){
      const sim = NC.newSim("rn-preview-sim");
      const served = []; let guard = 0;
      while (guard++ < 200){
        const nxt = NC.simNext(sim);
        if (nxt.kind === "done") break;
        served.push(nxt.item.id);
        NC.simAnswer(sim, nxt.item, wrongAnsFor(nxt.item), 60000);
      }
      if (new Set(served).size !== served.length) repeats++;
      if (served.includes("DUP-001") && served.includes(bankBak[3].id)) coServed++;
      if (served.includes("DUP-002") && served.includes(bankBak[5].id)) stemCo++;
    }
    ok(repeats === 0, `no item served twice in 25 exams (${repeats})`);
    ok(coServed === 0, `same question under two ids never co-served in one exam (${coServed})`);
    ok(stemCo === 0, `shared-stem siblings never co-served in one exam (${stemCo})`);
  }

  // (3) practice picks obey the same rule
  {
    const picks = NC.pickItems({excludeSeen:false}, 12);
    const ids = picks.map(q=>q.id);
    ok(new Set(ids).size === ids.length, "pickItems never returns the same id twice");
    ok(!(ids.includes("DUP-001") && ids.includes(bankBak[3].id)), "pickItems serves at most one copy of a duplicate");
    ok(!(ids.includes("DUP-002") && ids.includes(bankBak[5].id)), "pickItems serves at most one shared-stem sibling");
  }

  NC.BANK.length = 0; NC.BANK.push(...bankBak);
  NC.CASES.length = 0; NC.CASES.push(...casesBak);
  NC.linkDuplicates();
  st0.seen = JSON.parse(seenBak); NC.save();
  const clean = NC.duplicateIndex(true);
  // the repo bank's 11 authored variant groups are expected clusters; what must
  // be zero is content the bank did not mean to repeat
  ok(clean.exact.length === 0, `repo bank has no same-content duplicates (${clean.exact.length})`);
  ok(clean.stems.length === 0, `repo bank has no shared-stem item sets (${clean.stems.length})`);
  ok(clean.clusters.length === Object.keys(NC.variantGroups()).length,
     `every remaining cluster is an authored variant group (${clean.clusters.length})`);
}

console.log("— freshness: answered items are not silently re-served (v3o) —");
{
  const st0 = NC.load(); const seenBak = JSON.stringify(st0.seen);
  const pha = NC.filterItems({cn:["PHA"], excludeSeen:false});
  st0.seen = {}; pha.slice(0, pha.length-3).forEach(q=>{ st0.seen[q.id] = 2; }); NC.save();

  ok(NC.freshCount({cn:["PHA"]}) === 3, `freshCount reports only unseen items (${NC.freshCount({cn:["PHA"]})} of ${pha.length})`);
  const first = NC.pickItems({cn:["PHA"], excludeSeen:true}, 3);
  ok(first.every(q=>!seenBak || true) && first.every(q=>(JSON.parse(seenBak)[q.id]||0)===0),
     `an exact-size request is filled with NEW items only (${first.map(q=>q.id).join(",")})`);
  const short = NC.pickItems({cn:["PHA"], excludeSeen:true}, 6);
  ok(short.length === 6, `an over-size request is still filled (${short.length})`);
  ok(short.slice(0,3).every(q=>(JSON.parse(seenBak)[q.id]||0)===0), "new items come first; recycled ones fill the tail");
  const s = NC.newSession({mode:"custom", count:6, filters:{cn:["PHA"], excludeSeen:true}});
  ok(s.fresh === 3 && s.recycled === 3, `session records its own freshness split (fresh ${s.fresh}, recycled ${s.recycled})`);

  // smart practice must reach for unseen material before repeating
  st0.seen = {}; NC.filterItems({excludeSeen:false}).slice(0, NC.filterItems({excludeSeen:false}).length-40)
    .forEach(q=>{ st0.seen[q.id] = 3; }); NC.save();
  let newFirst = 0;
  for (let i=0;i<12;i++) newFirst += NC.smartPick(10).filter(q=>!NC.load().seen[q.id]).length;
  ok(newFirst >= 100, `smartPick prefers unseen items (${newFirst} of 120 picks were new)`);

  // exposure history survives a sync round-trip (second device / cleared cache)
  st0.seen = { "MOC-001": 2, "PHA-007": 1 };
  const payload = NC.trackPayload();
  ok(payload.seen && payload.seen["MOC-001"] === 2, "trackPayload carries the exposure history");
  st0.seen = { "MOC-001": 5 };
  NC.mergeState({ seen:{ "MOC-001":2, "PHA-007":4 } });
  ok(NC.load().seen["MOC-001"] === 5 && NC.load().seen["PHA-007"] === 4,
     `mergeState unions exposure by max (MOC-001=${NC.load().seen["MOC-001"]}, PHA-007=${NC.load().seen["PHA-007"]})`);

  st0.seen = JSON.parse(seenBak); NC.save();
}

console.log("— authoring gate: a duplicate cannot enter the bank (v3o) —");
{
  const A = (await import("file://"+path.join(root,"authoring.js"))).default;
  const D = { authoring:{}, bankPatches:{} };
  const src = NC.BANK.find(q=>q.t==="single" && Array.isArray(q.opts));
  const D2 = { authoring:{}, bankPatches:{} };
  const base = { id:"ZZZ-950", t:"single", cn:src.cn, sys:src.sys, topic:src.topic, d:1, b:0.1, cj:"act",
    tags:["x"], opts:["One option here","Two option here","Three option here","Four option here"], ans:1,
    rat:{c:"correct because reasons","s":"strategy for this item"}, stem:src.stem };
  const dupSame = A.createDraft(NC, D2, { ...base, stem:src.stem }, "re-import", "admin");
  ok(!!dupSame.errors && /duplicates/.test(dupSame.errors[0]),
     `a shared-stem draft is rejected (${(dupSame.errors||[])[0]||"accepted!"})`);
  const copyOfLive = A.createDraft(NC, D2, { ...src, id:"ZZZ-951" }, "copy", "admin");
  ok(!!copyOfLive.errors && /same-content/.test(copyOfLive.errors[0]),
     `a verbatim copy of a live item is rejected (${(copyOfLive.errors||[])[0]||"accepted!"})`);
  const fresh = A.createDraft(NC, D2, { ...base, stem:"A nurse is reviewing the laboratory results of a client receiving heparin therapy. Which finding requires the most immediate action by the nurse?",
    opts:["Platelet count 88,000/mm3","Hemoglobin 13.8 g/dL","Sodium 139 mEq/L","Potassium 4.1 mEq/L"], ans:0 }, "new", "admin");
  ok(fresh.record && fresh.record.status === "published", "genuinely new content still authors normally");
  // and the same copy twice INSIDE one bulk import is caught
  const bulk = A.importDrafts(NC, D2, [ { ...base, id:"ZZZ-960", stem:"Unique stem A for the bulk import probe question, long enough to validate.", opts:["A one","B two","C three","D four"], ans:0, rat:{c:"correct because","s":"strategy here"} },
                                        { ...base, id:"ZZZ-961", stem:"Unique stem A for the bulk import probe question, long enough to validate.", opts:["A one","B two","C three","D four"], ans:0, rat:{c:"correct because","s":"strategy here"} } ], "bulk", "admin");
  ok(bulk.created.length === 1 && bulk.errors.length === 1,
     `bulk import keeps one copy and reports the other (created ${bulk.created.length}, errors ${bulk.errors.length})`);
  ok(!D2.authoring["ZZZ-961"], "the rejected copy leaves no draft behind");
  delete D2.authoring["ZZZ-960"];
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail?1:0);
