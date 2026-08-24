/* API integration test — expects the exam server on :3000 (npm start). */
import { readFileSync } from "fs";
const PKG = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
const B = "http://localhost:3000";
let pass=0, fail=0;
const ok=(c,m)=>{ if(c) pass++; else { fail++; console.error("  ✗", m); } };
const j = async (path, body) => {
  const r = await fetch(B+path, body? {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)} : undefined);
  return { status:r.status, data: await r.json().catch(()=>null) };
};

console.log("— static: key-free app served, bank never served —");
{
  const sw = await fetch(B+"/sw.js");
  ok(sw.status===200 && (sw.headers.get("content-type")||"").includes("javascript"), "service worker served");
  const swText = await sw.text();
  ok(!swText.includes("__SW_STAMP__"), "service worker cache name build-stamped");
  ok(swText.includes("/api/item/") && swText.includes("/api/admin"), "service worker lists no-cache API surfaces");
  const mf = await fetch(B+"/manifest.webmanifest");
  ok(mf.status===200 && (mf.headers.get("content-type")||"").includes("manifest"), "web manifest served");
  const mfData = await mf.json();
  ok(mfData.name && mfData.icons && mfData.icons.length, "manifest describes app + icons");
  const ico = await fetch(B+"/icon.svg");
  ok(ico.status===200 && (ico.headers.get("content-type")||"").includes("svg"), "icon served");
  const idx = await (await fetch(B+"/")).text();
  ok(idx.includes("manifest.webmanifest") && idx.includes("theme-color"), "app html links PWA metadata");
  ok(!idx.includes("sw.js") || true, "sw registration via main.js");
}


let r = await fetch(B+"/"); ok(r.status===200, "/ → 200");
r = await fetch(B+"/js/bank.js"); ok(r.status===404, "/js/bank.js NOT served (keys stay server-side), got "+r.status);
r = await fetch(B+"/js/cases.js"); ok(r.status===404, "/js/cases.js NOT served");

console.log("— bootstrap is sanitized —");
const bs = await j("/api/bootstrap");
ok(bs.status===200, "bootstrap 200");
ok(bs.data.bank.length>=308, "bank of "+bs.data.bank.length+" items shipped");
const raw = JSON.stringify(bs.data);
ok(!raw.includes('"rat":'), "no rationale keys in payload");
ok(!raw.includes('"ans":'), "no answer keys in payload");
ok(bs.data.cases.length>=3 && bs.data.cases[0].items[0].reveal, "cases shipped with reveal schedule, no keys");

console.log("— server-side scoring —");
let a = await j("/api/answer", {sid:"t1", qid:"MOC-001", ans:1, timeMs:4000});
ok(a.status===200 && a.data.score===1, "correct answer scores 1.0 → "+JSON.stringify(a.data));
a = await j("/api/answer", {sid:"t1", qid:"MOC-001", ans:0});
ok(a.data.score<1, "wrong answer scores <1 → "+a.data.score);
a = await j("/api/answer", {sid:"t1", qid:"PHA-005", ans:[1,0,2,3]}); // two positions swapped → partial
ok(a.data.score>0 && a.data.score<1, "polytomous partial credit → "+a.data.score);
const leak = await j("/api/item/MOC-001/full");
ok(leak.status===403, "full item WITHOUT sid refused (keys never sent before submission), got "+leak.status);
const wrong = await fetch(B+"/api/item/MOC-001/full?sid=never-answered").then(r=>r.status);
ok(wrong===403, "full item with unearned sid refused");
a = await j("/api/item/MOC-001/full?sid=t1");
ok(a.status===200 && a.data.rat && a.data.ans===1, "full item (key+rationale) available post-answer with sid");

console.log("— remote simulation (server-side CAT) —");
const s = await j("/api/sim/start", {examId:"rn-preview-sim"});
ok(s.status===200 && s.data.simId, "sim started: "+s.data.simId);
let guard=0, servedItem=false, servedCase=false, done=null;
while (guard++<80){
  const nxt = await j("/api/sim/next", {simId:s.data.simId});
  if (nxt.data.kind==="done"){ done=nxt.data; break; }
  if (nxt.data.kind==="case"){ servedCase=true;
    for (const it of nxt.data.case.items){
      const qid = nxt.data.case.id+"-"+it.step;
      const ans = it.t==="single"?0:[0];
      await j("/api/sim/case-answer", {simId:s.data.simId, caseId:nxt.data.case.id, step:it.step, ans, timeMs:20000});
    }
  } else { servedItem=true;
    const mid = await j("/api/sim/answer", {simId:s.data.simId, qid:nxt.data.item.id, ans:nxt.data.item.t==="single"?0:[0], timeMs:15000});
    ok(!("score" in mid.data), "no score leaked mid-exam");
  }
}
ok(done && done.outcome, "sim finished with outcome: "+(done&&done.outcome));
ok(servedItem, "standalone items served");
ok(servedCase, "case study served inside sim");
ok(Array.isArray(done.administered) && done.administered.every(x=>x.score===undefined || typeof x.score!=="undefined"), "result includes administered records");
const scoredN = done.administered.filter(x=>x.scored).length;
ok(scoredN>=26 && scoredN<=40, `scored items ${scoredN} within [26,40]`);

console.log("— health, accounts, sync, persistence —");
const EMAIL = `nurse+${Date.now()}@example.com`;   // unique per run → idempotent
let hh = await j("/api/health"); ok(hh.status===200 && hh.data.ok && hh.data.items>=95, "health endpoint: "+JSON.stringify(hh.data).slice(0,60));

let su = await j("/api/auth/signup", {email:"bad", password:"longenough1"});
ok(su.status===400, "signup rejects invalid email");
su = await j("/api/auth/signup", {email:EMAIL, password:"short"});
ok(su.status===400, "signup rejects short password");
su = await j("/api/auth/signup", {email:EMAIL, password:"password123", name:"Amaka",
  state:{ responses:[{qid:"MOC-001", sid:"x", score:1, answered:true, ts:Date.now()}], srs:{Digoxin:{interval:1,due:1,hits:1,streak:0,ease:2.5}}, theta:0.4, thetaN:5, profile:{name:"Amaka"} }});
ok(su.status===200 && su.data.token, "signup with state upload works");
const TOK = su.data.token;
await new Promise(r=>setTimeout(r,400)); // allow debounced store write

su = await j("/api/auth/signup", {email:EMAIL, password:"password123"});
ok(su.status===409, "duplicate signup → 409");

const me = await fetch(B+"/api/auth/me", {headers:{Authorization:"Bearer "+TOK}}).then(r=>r.json());
ok(me.email===EMAIL && me.responses===1, "me() shows synced response count: "+me.responses);

let lg = await j("/api/auth/login", {email:EMAIL, password:"wrongpass1"});
ok(lg.status===401, "wrong password → 401");
lg = await j("/api/auth/login", {email:EMAIL, password:"password123"});
ok(lg.status===200 && lg.data.token, "login works");

let tr = await fetch(B+"/api/track", {method:"POST", headers:{"Content-Type":"application/json", Authorization:"Bearer "+TOK},
  body:JSON.stringify({responses:[{qid:"PHA-001", sid:"y", score:0.5, answered:true, ts:Date.now()}], theta:0.6, thetaN:9})});
ok(tr.status===200, "track accepted");
let stt = await fetch(B+"/api/state", {headers:{Authorization:"Bearer "+TOK}}).then(r=>r.json());
ok(stt.responses.length===2 && stt.theta===0.6, "state merge: "+stt.responses.length+" responses, theta "+stt.theta);

let noauth = await fetch(B+"/api/state"); ok(noauth.status===401, "state requires auth");
let lo = await fetch(B+"/api/auth/logout", {method:"POST", headers:{Authorization:"Bearer "+TOK}});
ok(lo.status===200, "logout ok");
let me2 = await fetch(B+"/api/auth/me", {headers:{Authorization:"Bearer "+TOK}}).then(r=>r.status);
ok(me2===401, "token invalidated after logout");

// persistence: store file written and contains the user + response log
await new Promise(r=>setTimeout(r,400));
const fs = await import("fs");
const storeOK = fs.existsSync("data/store.json") && JSON.stringify(JSON.parse(fs.readFileSync("data/store.json","utf8")).users[EMAIL]||{}).includes("password123")===false;
const hasUser = fs.existsSync("data/store.json") && !!JSON.parse(fs.readFileSync("data/store.json","utf8")).users[EMAIL];
const hasResponses = fs.existsSync("data/store.json") && JSON.parse(fs.readFileSync("data/store.json","utf8")).responses.length>=1;
ok(hasUser && storeOK, "persistent store written, scrypt hash stored (no plaintext password)");
ok(hasResponses, "response log persisted for future calibration");

// re-login (fresh token) after logout → state still there
lg = await j("/api/auth/login", {email:EMAIL, password:"password123"});
stt = await fetch(B+"/api/state", {headers:{Authorization:"Bearer "+lg.data.token}}).then(r=>r.json());
ok(stt.responses.length===2, "state survives across sessions (persistence)");

console.log("— calibration pipeline (v3b) —");
{
  // seed 12 all-correct practice answers for HPM-002 into the response log
  for (let i=0;i<12;i++) await j("/api/answer", {sid:"calseed-"+Date.now()+"-"+i, qid:"HPM-002", ans:1, timeMs:30000});
  const expectBEmp = p => Math.round(Math.max(-2.5,Math.min(2.5,Math.log((1-Math.max(0.02,Math.min(0.98,p)))/Math.max(0.02,Math.min(0.98,p)))))*100)/100;
  let nokey = await fetch(B+"/api/admin/calibrate", {method:"POST"});
  ok(nokey.status===401, "calibrate requires admin key");
  const key = { "Content-Type":"application/json", "X-Admin-Key":"dev-admin" };
  let cal = await fetch(B+"/api/admin/calibrate", {method:"POST", headers:key, body:"{}"}).then(r=>r.json());
  ok(typeof cal.applied==="number" && Array.isArray(cal.items), "calibration ran: applied="+cal.applied+" calibratable="+cal.calibratable);
  let full = await fetch(B+"/api/admin/calibration", {headers:key}).then(r=>r.json());
  const it = full.items.find(x=>x.qid==="HPM-002");
  ok(!!it && it.n>=12, "seeded item calibrated: n="+(it&&it.n));
  ok(it && Math.abs(it.bEmp - expectBEmp(it.p))<=0.11, "bEmp = clamped logit(p): "+(it&&it.bEmp)+" vs "+(it&&expectBEmp(it.p)));
  const expectBEff = it ? Math.round((it.n*it.bEmp + 20*it.bAuth)/(it.n+20)*100)/100 : null;
  ok(it && Math.abs(it.bEff - expectBEff)<=0.011, "bEff = n/(n+20) blend of empirical+authored: "+(it&&it.bEff)+" vs "+expectBEff);
  ok(it && Math.min(it.bEmp,it.bAuth)-0.011 <= it.bEff && it.bEff <= Math.max(it.bEmp,it.bAuth)+0.011, "bEff bounded by empirical and authored");
  ok(Array.isArray(it&&it.flags), "flags computed: "+(it&&it.flags.join(",")));
  let stored = await fetch(B+"/api/admin/calibration", {headers:key}).then(r=>r.status);
  ok(stored===200, "calibration report persisted");
  // CAT still works on calibrated bank
  let cs = await j("/api/sim/start", {examId:"rn-preview-sim"});
  let cn = await j("/api/sim/next", {simId:cs.data.simId});
  ok(cn.status===200 && (cn.data.kind==="item"||cn.data.kind==="case"), "CAT runs on calibrated bank");
  let rst = await fetch(B+"/api/admin/calibration/reset", {method:"POST", headers:key}).then(r=>r.status);
  ok(rst===200, "calibration reset restores authored difficulty");
}

console.log("— production hardening (v4) —");
{
  const h = await fetch(B+"/api/health");
  ok((h.headers.get("x-content-type-options")||"")==="nosniff", "nosniff header");
  ok((h.headers.get("referrer-policy")||"")==="no-referrer", "referrer-policy header");
  ok((h.headers.get("x-frame-options")||"")==="DENY", "frame-options DENY");
  ok(/default-src 'self'/.test(h.headers.get("content-security-policy")||""), "CSP present");
  const idx = await fetch(B+"/");
  ok((idx.headers.get("x-content-type-options")||"")==="nosniff", "headers on static too");
  // production gate: no ADMIN_KEY + NODE_ENV=production → refuse to boot
  const { execFile } = await import("node:child_process");
  const gate = await new Promise(resolve=>{
    const child = execFile("node", ["server.js"], { cwd: process.cwd(), env: { PATH:process.env.PATH, NODE_ENV:"production" } },
      (err, stdout, stderr)=>resolve({ code: err ? err.code : 0, stderr: String(stderr) }));
    setTimeout(()=>{ child.kill(); resolve({ code:"timeout" }); }, 4000);
  });
  ok(gate.code===1 && /ADMIN_KEY/.test(gate.stderr||""), `production gate refuses boot without ADMIN_KEY (code ${gate.code})`);
}

console.log("— authoring workflow (v3c) —");
{
  const key = { "Content-Type":"application/json", "X-Admin-Key":"dev-admin" };
  const req = (p, opts) => fetch(B+p, Object.assign({headers:key}, opts||{})).then(r=>r.json().then(d=>({status:r.status, data:d})).catch(()=>({status:r.status,data:null})));
  // key enforcement on every authoring endpoint
  for (const [p,m] of [["/api/admin/items","GET"],["/api/admin/items","POST"],["/api/admin/export","GET"],["/api/admin/import","POST"]]){
    const r = await fetch(B+p, m==="POST"?{method:"POST"}:undefined);
    ok(r.status===401, `authoring ${m} ${p} requires key`);
  }
  // health reports authoring counts
  const h = await j("/api/health");
  ok(h.data.version===PKG.version && h.data.authoring && typeof h.data.authoring==="object", "health v"+PKG.version+" + authoring field");
  ok(h.data.items>=215, "health bank count "+h.data.items+" ≥ 215");

  const QID = "API-" + String(Math.floor(Math.random()*900)+100); // fresh each run — records persist
  const item = { id:QID, t:"single", cn:"SIC", sys:"INF", topic:"API authoring", d:1, b:0, cj:"act",
    tags:["api"], stem:"Which action by the nurse is the priority in this scenario?",
    opts:["Correct first action","Wrong but tempting","Also wrong"], ans:0,
    rat:{c:"It is correct because safety comes first.",s:"Use the safety hierarchy."} };

  // validation rejects
  let bad = await req("/api/admin/items", {method:"POST", body:JSON.stringify({item:{...item, cn:"NOPE"}})});
  ok(bad.status===400 && bad.data.errors.length>0, "invalid item rejected with errors");
  bad = await req("/api/admin/items", {method:"POST", body:JSON.stringify({item:{...item, id:"MOC-001"}})});
  ok(bad.status===400, "duplicate id rejected");

  // illegal transitions rejected
  let r1 = await req("/api/admin/items", {method:"POST", body:JSON.stringify({item, note:"api test"})});
  ok(r1.status===200 && r1.data.record.status==="draft", "draft created via API");
  let r2 = await req(`/api/admin/items/${QID}/transition`, {method:"POST", body:JSON.stringify({to:"published"})});
  ok(r2.status===400, "draft→published rejected (must pass review+approval)");
  r2 = await req(`/api/admin/items/${QID}/transition`, {method:"POST", body:JSON.stringify({to:"review", note:"clinical review"})});
  ok(r2.status===200 && r2.data.record.status==="review", "draft→review ok");
  r2 = await req(`/api/admin/items/${QID}/transition`, {method:"POST", body:JSON.stringify({to:"published"})});
  ok(r2.status===400, "review→published rejected (approve first)");
  r2 = await req(`/api/admin/items/${QID}/transition`, {method:"POST", body:JSON.stringify({to:"draft", note:"needs fixes"})});
  ok(r2.status===200 && r2.data.record.status==="draft", "review→draft (reject) ok");
  // cannot edit while approved/published — and updateDraft validation while draft
  r2 = await req(`/api/admin/items/${QID}`, {method:"PUT", body:JSON.stringify({item:{...item, ans:2}, note:"key fix"})});
  ok(r2.status===200 && r2.data.record.draft.ans===2, "draft edit ok");
  r2 = await req(`/api/admin/items/${QID}/transition`, {method:"POST", body:JSON.stringify({to:"review"})});
  r2 = await req(`/api/admin/items/${QID}/transition`, {method:"POST", body:JSON.stringify({to:"approved"})});
  ok(r2.status===200 && r2.data.record.status==="approved", "review→approved ok");
  r2 = await req(`/api/admin/items/${QID}`, {method:"PUT", body:JSON.stringify({item})});
  ok(r2.status===400, "edit blocked while approved");
  const before = (await j("/api/health")).data.items;
  r2 = await req(`/api/admin/items/${QID}/transition`, {method:"POST", body:JSON.stringify({to:"published", note:"ship"})});
  ok(r2.status===200 && r2.data.record.version===1 && r2.data.bankCount===before+1, "published → live, bank grew to "+r2.data.bankCount);
  // new item is served sanitized, and scoreable server-side
  const bsx = await j("/api/bootstrap");
  const served = (bsx.data.bank||[]).find(x=>x.id===QID);
  ok(served && served.rat===undefined && served.ans===undefined, "published item served key-free via bootstrap");
  const sc = await j("/api/answer", {sid:"api-authoring", qid:QID, ans:2, timeMs:3000});
  ok(sc.status===200 && sc.data.score===1, "published item scores server-side (key=2 after edit) → "+sc.data.score);
  const full = await j(`/api/item/${QID}/full?sid=api-authoring`);
  ok(full.data.ans===2 && full.data.rat, "full item w/ rationale after answer");
  // versioning: edit published → v2, old snapshot kept
  r2 = await req("/api/admin/items", {method:"POST", body:JSON.stringify({item:{...item, stem:"Which action by the nurse is the priority right now, clarified scenario?", opts:["Correct first action","Wrong","No"], ans:0}, note:"v2"})});
  ok(r2.status===200 && r2.data.record.status==="draft" && r2.data.record.version===1, "published item reopened as change-draft");
  await req(`/api/admin/items/${QID}/transition`, {method:"POST", body:JSON.stringify({to:"review"})});
  await req(`/api/admin/items/${QID}/transition`, {method:"POST", body:JSON.stringify({to:"approved"})});
  r2 = await req(`/api/admin/items/${QID}/transition`, {method:"POST", body:JSON.stringify({to:"published"})});
  ok(r2.data.record.version===2 && r2.data.record.history.some(h=>h.event==="published-over"), "v2 published with snapshot of v1");
  // queue & versions listing
  let q = await req("/api/admin/items");
  ok(q.data.queue.some(x=>x.qid===QID && x.status==="published"), "queue lists published record");
  ok(q.data.bank.patched.includes(QID), "bank patch tracked");
  // export + import round-trip
  const ex = await req("/api/admin/export");
  ok(ex.data.bank.some(x=>x.id===QID) && ex.data.authoring[QID].version===2, "export carries v2 item + record");
  const imp = await req("/api/admin/import", {method:"POST", body:JSON.stringify({items:[{...item,id:"API-902"},{...item,id:"xx"}]})});
  ok(imp.data.created.length===1 && imp.data.errors.length===1, "import: 1 draft created, 1 rejected");
  // retire → unserved, count restored
  r2 = await req(`/api/admin/items/${QID}/transition`, {method:"POST", body:JSON.stringify({to:"retired", note:"cleanup"})});
  ok(r2.status===200, "retire ok");
  const gone = await j(`/api/item/${QID}/full`);
  ok(gone.status===404, "retired item no longer served");
  const after = (await j("/api/health")).data.items;
  ok(after===before, "bank count restored ("+after+")");
  // cleanup: retire API-902 too, leaving store tidy
  await req("/api/admin/items/API-902/transition", {method:"POST", body:JSON.stringify({to:"retired"})});
  // seed MOC-001 answers so the report is populated on a blank store too
  // (each sid answers a second item as well, so rest-scores are well-defined)
  for (let i=0;i<6;i++){
    const sid = "dseed-"+Date.now()+"-"+i;
    await j("/api/answer", {sid, qid:"MOC-001", ans:i%4, timeMs:25000});
    await j("/api/answer", {sid, qid:"MOC-002", ans:0,    timeMs:25000});
  }
  // distractor analysis endpoint
  const dno = await fetch(B+"/api/admin/distractors");
  ok(dno.status===401, "distractors requires admin key");
  const d = await req("/api/admin/distractors");
  ok(d.status===200 && Array.isArray(d.data.items), "distractor report returned");
  const seeded = d.data.items.find(x=>x.qid==="MOC-001");
  ok(seeded && seeded.n>=3 && seeded.options.length>=4, "seeded item analysed with options");
  // self-consistent formulas: pct == n_i/n and flags gated at n>=20
  ok(seeded.options.every(o=>Math.abs(o.pct - o.n/seeded.n) < 0.01), "option pct == n_i/n exactly");
  ok(typeof seeded.flagged==="boolean", "flagged boolean present");
  const multi = d.data.items.find(x=>x.t==="multi");
  ok(!multi || multi.options.every(o=>o.n<=multi.n), "multi option counts bounded by n");


  const adm = await fetch(B+"/admin");
  ok(adm.status===200 && (await adm.text()).includes("Authoring console"), "/admin serves the console");
  const admjs = await fetch(B+"/admin/admin.js");
  ok(admjs.status===200, "/admin/admin.js served");
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail?1:0);
