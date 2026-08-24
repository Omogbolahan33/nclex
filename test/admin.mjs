/* Admin console test: boots admin/index.html + admin.js in jsdom with a
   stubbed fetch (recorded calls, canned server replies) and walks the
   authoring workflow end-to-end: gate → queue → editor → transitions.      */
import fs from "fs"; import path from "path";
import { JSDOM } from "jsdom";
const root = path.resolve(process.cwd());

const html = fs.readFileSync(path.join(root,"admin","index.html"),"utf8")
  .replace('<link rel="stylesheet" href="/admin/admin.css">',"")
  .replace('<script src="/admin/admin.js"></script>',"");
const dom = new JSDOM(html, { runScripts:"outside-only", url:"https://admin.local/admin", pretendToBeVisual:true });
const { window } = dom;
const { document } = window;

/* fetch stub: records requests, replies from a scriptable table */
const calls = [];
const replies = {};   // "METHOD path" -> {status, data}
window.fetch = async (p, opts) => {
  opts = opts || {};
  const url = String(p);
  const key = (opts.method||"GET")+" "+url;
  calls.push({ key, url, body: opts.body ? JSON.parse(opts.body) : null, headers: opts.headers||{} });
  const hit = replies[key] || { status:404, data:{error:"no stub for "+key} };
  return { status: hit.status, json: async()=>hit.data };
};
window.confirm = () => true;
window.sessionStorage.clear(); // real jsdom storage (https origin) — start locked
window.URL.createObjectURL = () => "blob:x"; window.URL.revokeObjectURL = () => {};
window.HTMLAnchorElement.prototype.click = function(){}; // no navigation in jsdom
const after = (ms=10)=>new Promise(r=>setTimeout(r,ms));

let pass=0, fail=0;
const ok=(c,m)=>{ if(c) pass++; else { fail++; console.error("  ✗", m); } };
const $ = id => document.getElementById(id);
const click = el => { el.dispatchEvent(new window.Event("click",{bubbles:true})); };
const reset = key => { const i=calls.findIndex(c=>c.key===key); if(i>=0) calls.splice(i,1); };

const QUEUE = { queue:[
  { qid:"PHA-100", status:"review", version:1, topic:"Heparin drip", cn:"PHA", t:"single", updated:Date.now(), by:"admin", histories:2 },
  { qid:"MOC-050", status:"published", version:3, topic:"Delegation", cn:"MOC", t:"multi", updated:Date.now(), by:"admin", histories:9 }
], bank:{ count:127, patched:["PHA-100"] }, statuses:["draft","review","approved","published","retired"],
  transitions:{ draft:["review","retired"], review:["draft","approved","retired"],
    approved:["review","published","retired"], published:["retired"], retired:["published"] } };
const DRAFT_ITEM = { id:"PHA-100", t:"multi", cn:"PHA", sys:"HEME", topic:"Heparin drip", d:2, b:0.4, cj:"act",
  tags:["anticoag"], stem:"Select all that apply.", opts:["A","B","C","D"], ans:[0,2], rat:{c:"ok because",s:"strategy here"} };

/* boot the console logic */
window.eval(fs.readFileSync(path.join(root,"admin","admin.js"),"utf8"));
await after();

console.log("— gate & unlock —");
ok($("app").classList.contains("hidden") && !$("gate").classList.contains("hidden"), "gate shown first, app hidden");
replies["GET /api/admin/items"] = { status:200, data: QUEUE };
$("key-in").value = "dev-admin";
click($("key-go"));
await after();
ok(!$("app").classList.contains("hidden"), "app unlocked after key");
ok(window.sessionStorage.getItem("adminKey")==="dev-admin", "key persisted in sessionStorage");
ok(calls.some(c=>c.headers["X-Admin-Key"]==="dev-admin"), "X-Admin-Key header sent");

console.log("— queue renders —");
ok($("bank-sub").textContent.includes("127"), "bank count shown");
ok(document.querySelectorAll(".queue-item").length===2, "queue rows rendered");
ok(document.querySelector(".badge.review") && document.querySelector(".badge.published"), "status badges rendered");
$("filter-status").value = "review";
$("filter-status").dispatchEvent(new window.Event("change",{bubbles:true}));
ok(document.querySelectorAll(".queue-item").length===1, "status filter narrows queue");
$("filter-status").value = "";
$("filter-status").dispatchEvent(new window.Event("change",{bubbles:true}));

console.log("— editor: new item → collect → save (POST) —");
click($("btn-new"));
await after();
ok(!$("editor-card").classList.contains("hidden"), "editor opens");
$("f-id").value="PHA-101"; $("f-topic").value="Vancomycin flushing";
$("f-stem").value="A client develops flushing and hypotension during a rapid vancomycin infusion. Which action is first?";
$("f-opts").value="*Stop the infusion\nSlow the rate\nGive diphenhydramine\nContinue and monitor";
$("f-ratc").value="Flushing with hypotension is red-man syndrome; stop the infusion first.";
$("f-rats").value="Infusion-reaction signs point to stopping the trigger.";
replies["POST /api/admin/items"] = { status:200, data:{ record:{ qid:"PHA-101", status:"draft", version:0, updated:Date.now(), history:[{event:"edited",ts:Date.now()}] } } };
click($("btn-save"));
await after();
const posted = calls.find(c=>c.key==="POST /api/admin/items");
ok(!!posted, "POST /api/admin/items called");
ok(posted.body.item.ans===0 && posted.body.item.opts.length===4, "star-parsed key & opts collected");
ok(posted.body.item.rat.c.length>5 && posted.body.item.t==="single", "rationale & type collected");
ok(posted.body.item.cn==="MOC" && typeof posted.body.item.d==="number" && typeof posted.body.item.b==="number", "metadata collected");

console.log("— editor: open record, transitions follow server map —");
replies["GET /api/admin/items/PHA-100"] = { status:200, data:{ record:{
  qid:"PHA-100", status:"review", version:1, updated:Date.now(),
  history:[{event:"review",ts:Date.now(),note:"clinician eyes"}], draft:DRAFT_ITEM } } };
const row = document.querySelector('.queue-item[data-qid="PHA-100"]');
ok(!!row, "queue row present");
row.dispatchEvent(new window.Event("click",{bubbles:true})); await after();
ok($("f-id").value==="PHA-100", "editor filled with record draft");
ok($("f-opts").value.startsWith("*A"), "multi keys rendered with * markers");
const dyn = [...document.querySelectorAll("#editor-actions .dyn")].map(b=>b.textContent);
ok(dyn.some(t=>/Reject → draft/.test(t)) && dyn.some(t=>/Approve/.test(t)), "review transitions offered: "+dyn.join(" | "));
ok(!dyn.some(t=>/Publish/.test(t)), "publish NOT offered directly from review (approve first)");
ok(!$("history-card").classList.contains("hidden") && $("history").textContent.includes("clinician eyes"), "history rendered");

console.log("— transition → approved —");
replies["POST /api/admin/items/PHA-100/transition"] = { status:200, data:{ record:{
  qid:"PHA-100", status:"approved", version:1, updated:Date.now(),
  history:[{event:"review",ts:1},{event:"approved",ts:Date.now(),note:"verified doses"}], draft:DRAFT_ITEM } } };
const approveBtn = [...document.querySelectorAll("#editor-actions .dyn")].find(b=>/Approve/.test(b.textContent));
click(approveBtn); await after();
const tr = calls.find(c=>c.key==="POST /api/admin/items/PHA-100/transition");
ok(tr && tr.body.to==="approved" && typeof tr.body.note==="string", "transition POST with to + note");
ok(document.querySelector("#status-line .badge.approved"), "status badge advanced to approved");
ok($("history").textContent.includes("verified doses"), "history refreshed after transition");

console.log("— server validation errors surface in editor —");
replies["GET /api/admin/items/PHA-100"] = { status:200, data:{ record:{
  qid:"PHA-100", status:"review", version:1, updated:Date.now(), history:[], draft:DRAFT_ITEM } } };
click(document.querySelector('.queue-item[data-qid="PHA-100"]')); await after();
replies["PUT /api/admin/items/PHA-100"] = { status:400, data:{ error:"cannot update", errors:["ans must index opts","stem too short (≥10 chars)"] } };
click($("btn-save")); await after();
ok($("editor-errors").textContent.includes("index"), "validation errors listed in editor");
ok(document.querySelectorAll(".errors li").length===2, "both errors shown");
ok($("toast").className.includes("err"), "error toast shown");

console.log("— bulk import & export —");
$("import-json").value = '[{"id":"PHA-102","t":"single","cn":"PHA"}]';
replies["POST /api/admin/import"] = { status:200, data:{ created:["PHA-102"], errors:[{index:1,id:"BAD",errors:["bad id"]}] } };
click($("btn-import")); await after();
const imp = calls.find(c=>c.key==="POST /api/admin/import");
ok(imp && imp.body.items.length===1, "import body passed through");
ok($("toast").textContent.includes("1 drafts"), "import toast reports counts");
replies["GET /api/admin/export"] = { status:200, data:{ bank:[], cases:[], authoring:{}, bankPatches:{} } };
click($("btn-export")); await after();
ok(calls.some(c=>c.key==="GET /api/admin/export"), "export fetched");
ok($("toast").textContent.includes("keys"), "export warns about key safety");

console.log("— distractor analysis card —");
replies["GET /api/admin/items"] = { status:200, data: QUEUE };
replies["GET /api/admin/distractors"] = { status:200, data:{ generated:Date.now(), items:[
  { qid:"PHA-001", t:"single", n:28, topic:"Heparin", cn:"PHA", flagged:true, options:[
    { i:0, key:true, n:10, pct:0.357, rpb:-0.948, flags:["weak-key"] },
    { i:2, key:false, n:0, pct:0, rpb:null, flags:["dead"] } ] },
  { qid:"MOC-005", t:"multi", n:40, topic:"Ethics", cn:"MOC", flagged:false, options:[
    { i:0, key:true, n:30, pct:0.75, rpb:0.41, flags:[] } ] }
]}};
// unlock again after the 401 test re-locked the console
$("gate").classList.remove("hidden");
$("key-in").value = "dev-admin";
click($("key-go")); await after();
click($("btn-distract")); await after();
ok(calls.some(c=>c.key==="GET /api/admin/distractors"), "distractor endpoint called");
const out = $("distract-out").textContent;
ok(out.includes("PHA-001") && out.includes("weak-key") && out.includes("dead"), "flagged options rendered");
ok(out.includes("1 items flagged") || /1 items flagged|flagged: 1/.test(out) || $("toast").textContent.includes("1 items flagged"), "summary toast/count");
ok(!out.includes("MOC-005") || out.includes("unflagged")===false ? !out.includes("75%") : true, "unflagged items omitted from flag list");


replies["GET /api/admin/items/PHA-100"] = { status:401, data:{ error:"admin key required" } };
click(document.querySelector('.queue-item[data-qid="PHA-100"]')); await after();
ok($("app").classList.contains("hidden") && !$("gate").classList.contains("hidden"), "401 re-locks console");
ok(window.sessionStorage.getItem("adminKey")==null, "bad key cleared from session");

console.log(`${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
