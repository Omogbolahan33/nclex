/* DOM smoke test: boots the full app in jsdom and walks the critical screens. */
import fs from "fs"; import path from "path";
import { JSDOM } from "jsdom";
const root = path.resolve(process.cwd());
const dom = new JSDOM(`<!DOCTYPE html><html><body><div id="app"></div></body></html>`, {
  runScripts: "outside-only", url: "https://app.local/", pretendToBeVisual: true
});
process.on("unhandledRejection", e => { console.error("UNHANDLED:", e && e.name, "|", e && e.message); process.exit(1); });
const { window } = dom;
const { contentFiles } = await import("../content.js");
const files = ["js/taxonomy.js", ...contentFiles(root).all, "js/engine.js", "js/render.js", "js/ui.js", "js/api.js", "js/notify.js", "js/main.js"];
for (const f of files) window.eval(fs.readFileSync(path.join(root,f),"utf8"));
const after = (ms=30)=>new Promise(r=>setTimeout(r,ms));
await after(80);
let pass=0, fail=0;
const ok=(c,m)=>{ if(c) pass++; else { fail++; console.error("  ✗", m);} };
const q = s => window.document.querySelectorAll(s);
const click=async (sel,txt)=>{ const el=[...q(sel)].find(e=>!txt||e.textContent.trim().includes(txt)); if(!el) throw new Error("not found: "+sel+" "+txt); el.dispatchEvent(new window.Event("click",{bubbles:true})); await after(); };
const nav=async (h)=>{ window.location.hash=h; window.dispatchEvent(new window.HashChangeEvent("hashchange")); await after(); };
const answerCurrent=()=>{
  const btn=q('.opt:not([disabled])')[0] || q('.hs-row:not([disabled])')[0];
  if (btn) btn.dispatchEvent(new window.Event("click",{bubbles:true}));
  const dd=q('.dd-opt .mv button')[0]; if (dd) dd.dispatchEvent(new window.Event("click",{bubbles:true}));
  const sel=q('select')[0]; if (sel){ sel.value="0"; sel.dispatchEvent(new window.Event("change",{bubbles:true})); }
  const mx=q('.mx input')[0]; if (mx){ mx.checked=true; mx.dispatchEvent(new window.Event("change",{bubbles:true})); }
};
const txt=()=>window.document.getElementById("app").textContent;
window.confirm=()=>true;

console.log("— boot & onboarding —");
ok(/Welcome to RN Ready/.test(txt()), "onboarding shown");
window.document.getElementById("ob-name").value="Amaka";
window.document.getElementById("ob-date").value="2026-11-15";
await click("#ob-min button:nth-child(3)");
await click("#ob-level button");
await click('[data-act="ob-done"]');
ok(/Good (morning|afternoon|evening)/.test(txt()), "home rendered for new user");
ok(/Start with a 30-item diagnostic/.test(txt()), "diagnostic prompt shown");

console.log("— diagnostic runs end-to-end —");
await click('[data-act="go"][data-to="#/session/diag"]');
await after(60);
ok(/Question 1 of/.test(txt()), "diagnostic runner open");
for (let i=0;i<45;i++){
  if (/Session Results|Preparation Profile/.test(txt())) break;
  answerCurrent();
  const next=q('[data-act="next"]')[0];
  if(!next) break;
  next.dispatchEvent(new window.Event("click",{bubbles:true})); await after();
}
ok(/Session Results|Preparation Profile/.test(txt()), "diagnostic completed → results");
ok(/Priority weaknesses|Client Needs/.test(txt()), "profile bands shown");

console.log("— tabs & practice hub —");
await nav("#/practice"); ok(/Quick Practice/.test(txt()) && /Smart Practice/.test(txt()), "practice hub");
await nav("#/custom"); ok(/Custom Practice/.test(txt()), "custom builder");
await nav("#/browse/cn"); ok(/Management of Care/.test(txt()), "client-need browser");
await nav("#/browse/type"); ok(/Matrix/.test(txt()), "type browser");
await nav("#/cj"); ok(/Clinical Judgment/.test(txt()) && /unfolds/.test(txt()), "case hub");

console.log("— case study walkthrough —");
await click('.mode');
ok(/Case Study · item 1 of 6/.test(txt()), "case runner item 1");
await click('.exhibit-bar button');
ok(/Nurse's Notes|Vital Signs|Laboratory|History/.test(window.document.body.textContent), "exhibit sheet opens");
await click('[data-act="close-sheet"]');
for (let i=0;i<6;i++){
  answerCurrent();
  await click('[data-act="case-next"]');
}
ok(/Case Debrief/.test(txt()), "case debrief shown");
ok(/Recognize Cues/.test(txt()) && /Evaluate Outcomes/.test(txt()), "six NCJMM steps listed");

console.log("— explanation view —");
await nav("#/explain/"+encodeURIComponent("PHA-001"));
ok(/Why this is correct/.test(txt()), "explanation renders");
ok(/NCLEX strategy/.test(txt()), "strategy block present");

console.log("— quick practice session —");
await nav("#/quick");
await click('.mode');                       // 5 questions
ok(/Question 1 of 5/.test(txt()), "quick session started");
for (let i=0;i<5;i++){ answerCurrent(); await click('[data-act="next"]'); }
ok(/Session Results/.test(txt()), "results after 5");
ok(/Review every item/.test(txt()), "review list present");
await click('.rev-row');
ok(/Explanation|Why this is correct/.test(txt()), "item explanation from results");

console.log("— simulation pre-flight & run —");
await nav("#/simulate"); ok(/Preview Simulation/.test(txt()), "simulate hub");
{
  ok(/NCLEX-PN 2026/.test(txt()), "PN full simulation listed");
  ok(/PN Preview/.test(txt()), "PN preview listed");
  window.location.hash="#/sim/preflight/nclex-pn-2026";
  window.dispatchEvent(new window.HashChangeEvent("hashchange")); await after();
  ok(/Coordinated Care/.test(txt()), "PN pre-flight shows PN client-need names");
  ok(/21%/.test(txt()), "PN pre-flight shows Coordinated Care 21%");
  ok(/shared RN-focused item bank/.test(txt()), "PN approximation disclosed in pre-flight");
  await nav("#/simulate");
}
await click('[data-to="#/sim/preflight/rn-preview-sim"]');
ok(/Acknowledge the exam rules/.test(txt()), "preflight checklist");
[...q('.checkrow input')].forEach(cb=>{ cb.checked=true; cb.dispatchEvent(new window.Event("change",{bubbles:true})); });
await click('[data-act="sim-start"]');
ok(/Item 1|Case Study/.test(txt()), "sim runner started");
for (let i=0;i<80;i++){
  if (/Simulation Complete/.test(txt())) break;
  if (/Case Study/.test(txt())){
    for (let j=0;j<8;j++){
      if (!/Case Study/.test(txt())) break;
      answerCurrent();
      await click('[data-act="sim-case-next"]');
    }
  } else { answerCurrent(); await click('[data-act="sim-next"]'); }
}
ok(/Simulation Complete/.test(txt()), "simulation finished");
ok(/Below readiness threshold|Above readiness threshold|Borderline/.test(txt()), "outcome band shown");
ok(/not an official|not predictions/.test(txt()), "disclaimer on results");

console.log("— spaced repetition —");
await nav("#/spaced"); ok(/Spaced Review/.test(txt()), "spaced view renders");
ok(/Concepts you miss|Due now/.test(txt()), "queue state shown");
await nav("#/study"); ok(/Spaced Review/.test(txt()), "study hub lists spaced review");
const srsBefore = window.NC.srsCounts().total;
ok(srsBefore>=1, "missed concepts scheduled ("+srsBefore+" in rotation)");

console.log("— study & progress —");
ok(/Weak Areas/.test(txt()), "study hub");
await nav("#/weak"); ok(/Weak Areas|No weak areas/.test(txt()), "weak areas view");
await nav("#/incorrect"); ok(/Review Incorrect/.test(txt()), "incorrect list");
await nav("#/bookmarks"); ok(/Bookmarks/.test(txt()), "bookmarks");
await nav("#/progress");
ok(/NCLEX Readiness/.test(txt()), "progress view");
ok(/Knows/.test(txt()) && /Thinks/.test(txt()) && /Performs/.test(txt()), "three-dimension strip");
ok(/Client Needs/.test(txt()) && /Clinical Judgment/.test(txt()), "analytics sections");
await nav("#/settings"); ok(/Reset all progress/.test(txt()), "settings");

console.log("— study reminders (v3d) —");
{
  // stub the Notification API (jsdom lacks it)
  const fired = [];
  window.Notification = function(body, opts){ fired.push({body, opts}); };
  window.Notification.permission = "granted";
  ok(window.NC.notify.supported===true, "notify detects Notification API");
  await nav("#/settings");
  ok(/Study reminder/.test(txt()), "settings shows reminder card");
  ok(/Reminders/.test(txt()) && /Off/.test(txt()), "reminder off by default");
  window.document.getElementById("st-rem-time").value = "07:30";
  await click('[data-act="rem-save"]');
  ok(window.NC.notify.cfg().on===true && window.NC.notify.cfg().time==="07:30", "reminder enabled at 07:30");
  ok(/On · 07:30/.test(txt()), "settings reflects on-state");
  ok(window.NC.load().user.reminder.on===true, "reminder persisted");
  await click('[data-act="rem-test"]');
  ok(fired.length===1 && fired[0].opts.tag==="rnready-test", "test fires a browser notification");
  // fire() uses granted permission + reschedules
  window.NC.notify.fire();
  ok(fired.length===2 && /practice|streak|exam/.test(fired[1].opts.body), "daily fire sends reminder");
  await click('[data-act="rem-off"]');
  ok(window.NC.notify.cfg().on===false && window.NC.notify.timer==null, "reminder off clears schedule");
  // home shows the ⏰ marker while on
  window.document.getElementById("st-rem-time").value = "20:00";
  await click('[data-act="rem-save"]');
  await nav("#/home");
  ok(/⏰ 20:00/.test(txt()), "home header shows reminder time");
  window.NC.notify.disable();
  delete window.Notification;
}

console.log("— offline answer queue (PWA) —");
{
  // simulate remote mode with a dead network
  const realFetch = window.fetch;
  window.fetch = () => Promise.reject(new TypeError("Failed to fetch"));
  window.NC.api.remote = true;
  window.sessionStorage; // noop
  window.localStorage.removeItem("rnready-outq");
  ok(window.NC.api.queueSize()===0, "queue starts empty");
  // answer an item inside a quick practice session while "offline"
  const items = window.NC.pickItems({excludeSeen:false}, 3);
  window.NC.startSession && window.NC.startSession("quick", items, {timed:false});
  // direct: run the submit path used by actions.next
  const sid = "q-offline-test";
  let queued = false, threw = false;
  try { await window.NC.api.submitAnswer(sid, items[0].id, 0, 5000, false); }
  catch(e){ threw = true; queued = window.NC.api.queueAnswer({sid, qid:items[0].id, ans:0, timeMs:5000, timed:false}); }
  ok(threw && queued, "offline submit fails → queues");
  ok(window.NC.api.queueSize()===1, "queue holds 1 entry");
  window.NC.applyScore(sid, items[0].id, 0, {score:0, answered:false}, 5000, false);
  const pend = window.NC.load().responses.find(r=>r.sid===sid);
  ok(pend && pend.answered===false && pend.score===0, "pending response recorded (excluded from stats)");
  // network returns: flush replays through /api/answer and scores
  const posts = [];
  window.fetch = (p, opts) => {
    posts.push({ url:String(p), body: opts && opts.body ? JSON.parse(opts.body) : null });
    return Promise.resolve({ ok:true, status:200, json:async()=>({score:1, ok:1, n:1, answered:true}) });
  };
  const synced = await window.NC.api.flushQueue();
  ok(synced===1 && posts.length>=1 && posts[0].url.includes("/api/answer"), "flush replays queued answer to server");
  ok(posts[0].body.qid===items[0].id && posts[0].body.sid===sid, "replayed payload preserves qid+sid");
  ok(window.NC.api.queueSize()===0, "queue drained");
  const scored = window.NC.load().responses.find(r=>r.sid===sid);
  ok(scored && scored.answered===true && scored.score===1, "pending row replaced by scored row (idempotent)");
  // re-flush is a no-op
  const again = await window.NC.api.flushQueue();
  ok(again===0, "second flush is a no-op");
  window.NC.api.remote = false;
  window.fetch = realFetch;
}

console.log("— calculator opens in a runner —");
await nav("#/quick"); await click('.mode'); await click('[data-act="calc"]');
ok(q("[data-k]").length===20, "calculator keys present");

console.log("— remote simulation: short cases, real-time saving & no hang on progression —");
{
  const realFetch = window.fetch;
  window.NC.api.remote = true;
  const mockCase = {
    id: "CASE-SHORT-01",
    title: "Brief Case — 1 Item",
    setting: "Urgent care",
    sys: "GI", cn: "PAA", d: 2, b: 0.5,
    summary: "A brief single-item case study test",
    exhibits: { notes: { name: "Notes", type: "text", body: "Patient note..." } },
    items: [
      { step: "recognize", t: "single", stem: "What is the priority finding?", opts: ["Finding A", "Finding B"], ans: 0, reveal: ["notes"] }
    ]
  };

  const sim = {
    id: "sim-test-" + Date.now(),
    examId: "rn-preview-sim",
    cfg: window.NC.EXAMS["rn-preview-sim"],
    remote: true,
    status: "open",
    startedTs: Date.now(),
    endsAt: Date.now() + 600000,
    administered: [],
    counts: {},
    theta: 0,
    answeredCount: 0,
    served: 0
  };
  window.NC.load().sims.push(sim);
  window.NC.save();

  let apiCalls = [];
  window.NC.api.simCaseAnswer = async (simId, caseId, step, ans, timeMs) => {
    apiCalls.push({ simId, caseId, step, ans, timeMs });
    return { received: true };
  };

  let nextCallCount = 0;
  window.NC.api.simNext = async (simId) => {
    nextCallCount++;
    if (!sim.remoteAnswered) {
      return { kind: "case", case: mockCase, resumeAt: 0 };
    }
    return { kind: "done", outcome: "above", stopReason: "confidence-above" };
  };
  window.NC.api.simResult = async (simId) => ({
    outcome: "above",
    stopReason: "confidence-above",
    theta: 0.8,
    answeredCount: sim.remoteAnswered || 1,
    administered: sim.administered || [],
    finishedTs: Date.now()
  });

  // Navigate to remote sim run
  await nav("#/sim/run/" + sim.id);
  ok(/Brief Case/.test(txt()), "1-item case renders successfully");
  ok(/item 1/.test(txt()), "shows item 1");

  // Select an answer
  answerCurrent();
  await click('[data-act="sim-case-next"]');
  await after(80);

  // Verify: system did NOT crash or hang, progressed to next step (simNext was called again for 'done')
  ok(apiCalls.length === 1, "simCaseAnswer API was called");
  ok(apiCalls[0].step === "recognize", "correct step submitted");
  ok(nextCallCount >= 2, "system progressed and called simNext rather than hanging at item 1 of 1-item case");
  ok(/Simulation Complete|readiness threshold/.test(txt()), "completed simulation and reached results view");

  // Verify: user progress was saved in real time!
  ok(sim.served === 1, "sim.served incremented in real time");
  ok(sim.remoteAnswered === 1, "sim.remoteAnswered incremented in real time");
  const adminRec = sim.administered.find(a => a.qid === "CASE-SHORT-01-recognize");
  ok(adminRec && adminRec.done === true, "case item recorded in sim.administered in real time");
  const storedResp = window.NC.load().responses.find(r => r.qid === "CASE-SHORT-01-recognize");
  ok(storedResp != null, "response saved in real time in user responses");

  // Test edge case: invalid case object in simNext does NOT hang or crash
  const sim2 = {
    id: "sim-test2-" + Date.now(),
    examId: "rn-preview-sim",
    cfg: window.NC.EXAMS["rn-preview-sim"],
    remote: true,
    status: "open",
    startedTs: Date.now(),
    endsAt: Date.now() + 600000,
    administered: [],
    counts: {},
    theta: 0,
    answeredCount: 0,
    served: 0
  };
  window.NC.load().sims.push(sim2);
  window.NC.save();

  let sim2ReturnedEmpty = false;
  let sim2Calls = 0;
  window.NC.api.simNext = async () => {
    sim2Calls++;
    if (!sim2ReturnedEmpty) {
      sim2ReturnedEmpty = true;
      return { kind: "case", case: { id: "CASE-EMPTY", items: [] }, resumeAt: 0 };
    }
    return { kind: "done", outcome: "above" };
  };

  await nav("#/sim/run/" + sim2.id);
  await after(80);
  ok(sim2ReturnedEmpty === true && sim2Calls >= 2, "empty case was cleanly skipped and progressed to done without hanging");

  // Test button unhang safety net on unexpected action failure
  const dummyBtn = window.document.createElement("button");
  dummyBtn.dataset.act = "test-failing-action";
  dummyBtn.dataset.actText = "RETRY →";
  dummyBtn.textContent = "Click Me";
  dummyBtn.disabled = false;
  window.document.body.appendChild(dummyBtn);
  window.NC.actions["test-failing-action"] = async (d, elm) => {
    elm.disabled = true;
    elm.textContent = "…";
    throw new Error("Simulated failure");
  };
  window.NC.wire(window.document.body);
  await click('[data-act="test-failing-action"]');
  await after(40);
  ok(dummyBtn.disabled === false, "button was re-enabled after action failure (no hang)");
  ok(dummyBtn.textContent === "RETRY →", "button text was restored after failure");
  dummyBtn.remove();

  window.NC.api.remote = false;
  window.fetch = realFetch;
}

console.log("— premature simulation close: prompt to pick up exactly where stopped —");
{
  // 1. Create an open simulation where the user stopped mid-exam at a specific item
  const stoppedSim = {
    id: "sim-premature-" + Date.now(),
    examId: "nclex-rn-2026",
    cfg: window.NC.EXAMS["nclex-rn-2026"],
    remote: false,
    status: "open",
    startedTs: Date.now() - 300000,
    endsAt: Date.now() + 15000000,
    remainingMs: 15000000,
    currentCase: "CASE-RESP-01",
    caseIdx: 2, // stopped at step 3
    caseSlots: [6, 40, 75],
    casesDone: 0,
    administered: [
      { qid: "CASE-RESP-01-recognize", b: 0, score: 1, answered: true, done: true, scored: true },
      { qid: "CASE-RESP-01-analyze", b: 0, score: 1, answered: true, done: true, scored: true }
    ],
    counts: {},
    theta: 0.2,
    answeredCount: 2,
    served: 2
  };
  window.NC.load().sims.push(stoppedSim);
  window.NC.save();

  // 2. Open app back (navigate to #/home)
  await nav("#/home");
  await after(150);

  // Verify prompt sheet appears
  const promptSheet = window.document.getElementById("sim-resume-prompt");
  ok(promptSheet != null, "prompt sheet appears on opening app back");
  ok(/Resume Your Simulation\?/.test(promptSheet.textContent), "prompt sheet title is clear");
  ok(/Question 3 of 6/.test(promptSheet.textContent), "prompt states exact question where candidate stopped");
  ok(/Pick up where I stopped/.test(promptSheet.textContent), "prompt offers pick up action");

  // Verify Home screen also has the prominent resume card
  ok(/Resume In-Progress Simulation/.test(txt()), "home screen shows prominent resume card");
  ok(/Question 3 of 6/.test(txt()), "home card indicates exact question where stopped");

  // 3. Click the prompt action to resume
  const resumeBtn = promptSheet.querySelector('[data-act="sim-resume"]');
  ok(resumeBtn != null, "prompt resume button exists");
  await click('[data-act="sim-resume"]');
  await after(100);

  // Verify candidate is right at Question 3 of the case study
  ok(/Case Study/.test(txt()), "returned to case study");
  ok(/item 3/i.test(txt()), "resumed exactly at item 3 where user stopped");

  // 4. Test Simulate hub display
  await nav("#/simulate");
  await after(100);
  ok(/Simulation in Progress/.test(txt()), "simulate hub shows in-progress banner");
  ok(/Question 3 of 6/.test(txt()), "simulate hub banner indicates exact position");

  // 5. Test abandoning the simulation
  const abandonBtn = q('[data-act="sim-abandon"]')[0];
  ok(abandonBtn != null, "abandon button available");
  await click('[data-act="sim-abandon"]');
  await after(100);
  ok(stoppedSim.status === "done", "abandon marks sim as done");
  ok(/Simulation Complete/.test(txt()), "navigates to simulation results upon abandon");
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail?1:0);
