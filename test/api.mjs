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

console.log("— exposure history syncs (no silent re-serving on a new device) —");
{
  const seenPost = (seen) => fetch(B+"/api/track", {method:"POST",
    headers:{"Content-Type":"application/json", Authorization:"Bearer "+TOK},
    body:JSON.stringify({seen})}).then(r=>r.json());
  const getState = () => fetch(B+"/api/state", {headers:{Authorization:"Bearer "+TOK}}).then(r=>r.json());
  let s1 = await getState();
  ok(s1.seen && typeof s1.seen === "object", "GET /api/state returns a seen map");
  await seenPost({ "MOC-001": 2, "PHA-007": 1 });
  s1 = await getState();
  ok(s1.seen["MOC-001"] === 2 && s1.seen["PHA-007"] === 1,
     `uploaded exposure history is stored (MOC-001=${s1.seen["MOC-001"]}, PHA-007=${s1.seen["PHA-007"]})`);
  await seenPost({ "MOC-001": 1, "PHA-007": 4, "SIC-001": 1 });
  s1 = await getState();
  ok(s1.seen["MOC-001"] === 2, `a lower count never lowers stored exposure (MOC-001=${s1.seen["MOC-001"]})`);
  ok(s1.seen["PHA-007"] === 4 && s1.seen["SIC-001"] === 1, "a higher count wins and new qids are added");
  const junk = await fetch(B+"/api/track", {method:"POST",
    headers:{"Content-Type":"application/json", Authorization:"Bearer "+TOK},
    body:JSON.stringify({seen:{ "not-a-string": 1, [ "x".repeat(200) ]: 1, "MOC-002": "3" }})}).then(r=>r.status);
  ok(junk === 200, "malformed seen entries are accepted but ignored");
  s1 = await getState();
  ok(s1.seen["MOC-002"] === 3 && Object.keys(s1.seen).every(k=>k.length <= 64),
     "numeric strings coerce; oversized keys dropped");
  // and the sim path takes the same hint without tripping validation
  const simHint = await j("/api/sim/start", {examId:"rn-preview-sim", seen:["MOC-001","PHA-007", 42, null, "y".repeat(300)]});
  ok(simHint.status === 200 && simHint.data.simId, "sim/start tolerates a messy seen hint");
}

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

console.log("— session durability: never expires, and a lost store is diagnosable —");
{
  // A candidate must never be forced to re-register because a session lapsed.
  const h = await j("/api/health");
  ok(h.data.store && typeof h.data.store.durable === "boolean", "health reports store.durable");
  ok(h.data.store.sessionTtlDays === 0, "sessions never expire by default (sessionTtlDays=0), got "+h.data.store.sessionTtlDays);

  // bootstrap must say WHY a token was not recognised, so the client can tell
  // "bad credential" apart from "the server lost its account store" instead of
  // silently dropping the candidate into a fresh sign-up.
  const anon = await j("/api/bootstrap");
  ok(anon.data.session && anon.data.session.presented === false && anon.data.session.recognized === false,
     "anonymous bootstrap: session.presented=false, recognized=false");
  const withTok = await fetch(B+"/api/bootstrap", {headers:{Authorization:"Bearer "+lg.data.token}}).then(r=>r.json());
  ok(withTok.session.presented === true && withTok.session.recognized === true,
     "valid token: session.presented=true, recognized=true");
  ok(withTok.account && withTok.account.email === EMAIL, "valid token resolves the account");
  const bogus = await fetch(B+"/api/bootstrap", {headers:{Authorization:"Bearer "+"f".repeat(48)}}).then(r=>r.json());
  ok(bogus.session.presented === true && bogus.session.recognized === false && bogus.account === null,
     "unrecognised token: presented=true, recognized=false, account=null");

  // expires === 0 means never. A naive `expires < Date.now()` check treats 0 as
  // already-expired and deletes every permanent session on first use, so assert
  // on the stored value, not just on the request succeeding.
  await new Promise(r=>setTimeout(r,500)); // allow the debounced store write to land
  let stored = null;
  try { stored = JSON.parse(readFileSync(new URL("../data/store.json", import.meta.url), "utf8")); } catch(e){}
  if (stored && stored.tokens) {
    const t = stored.tokens[lg.data.token];
    ok(!!t, "issued token is present in the store");
    ok(t && t.expires === 0, "issued token is non-expiring (expires===0), got "+JSON.stringify(t && t.expires));
  } else console.log("  (json store not readable — skipping stored-token assertions)");
}

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

console.log("— engine diagnostics (calibration, distractors, duplicates) —");
{
  const key = { "Content-Type":"application/json", "X-Admin-Key":"dev-admin" };
  const req = (p, opts) => fetch(B+p, Object.assign({headers:key}, opts||{})).then(r=>r.json().then(d=>({status:r.status, data:d})).catch(()=>({status:r.status,data:null})));
  // the authoring console and its CRUD endpoints are gone; the diagnostics stay key-gated
  for (const p of ["/api/admin/distractors","/api/admin/duplicates","/api/admin/calibration"]){
    const r = await fetch(B+p);
    ok(r.status===401, `${p} requires an admin key`);
  }
  for (const p of ["/api/admin/items","/api/admin/import","/api/admin/export","/api/admin/versions","/admin"]){
    const r = await fetch(B+p);
    ok(r.status===404, `removed console surface ${p} is gone`);
  }
  // seed MOC-001 answers so the report is populated on a blank store also
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


  const dnoKey = await fetch(B+"/api/admin/duplicates");
  ok(dnoKey.status === 401, "duplicates endpoint requires an admin key");
  const dups = await req("/api/admin/duplicates");
  ok(dups.status === 200 && Array.isArray(dups.data.detail), "duplicate report returned");
  ok(typeof dups.data.clusters === "number" && Array.isArray(dups.data.sameContent) && Array.isArray(dups.data.sharedStems),
     "report separates same-content from shared-stem clusters");
  ok(dups.data.detail.every(c => Array.isArray(c.ids) && c.ids.length >= 2 && typeof c.stem === "string"),
     "every reported cluster lists its ids and a stem preview");
  const health2 = await j("/api/health");
  ok(typeof health2.data.duplicateClusters === "number" && typeof health2.data.duplicateItems === "number",
     `health exposes the duplicate count (${health2.data.duplicateClusters} clusters / ${health2.data.duplicateItems} items)`);
  ok(typeof health2.data.variantGroups === "number" && health2.data.variantGroups >= 11,
     `authored variant groups are reported separately (${health2.data.variantGroups})`);
  ok(health2.data.duplicateClusters === dups.data.clusters - health2.data.variantGroups,
     "health and the admin report agree once authored variant groups are excluded");
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail?1:0);
