/* RN Ready — UI: router, screens, runners, overlays. Vanilla JS, mobile-first. */
window.NC = window.NC || {};
(function(){
const $app = () => document.getElementById("app");
let tick = null; // timer interval
NC.ui = {};

/* ---------- helpers ---------- */
function esc(s){ return NC.esc(s); }
function go(h){ location.hash = h; }
NC.ui.go = go;
NC.ui.toast = function(msg){ const t=document.createElement("div"); t.className="toast"; t.textContent=msg; document.body.appendChild(t); setTimeout(()=>t.remove(),2200); };
function h(html){ const d=document.createElement("div"); d.innerHTML=html.trim(); return d.firstElementChild; }
function pct(p){ return p==null? "—" : p+"%"; }
function bar(p){ const cls = p==null? "" : p>=75?"ok": p>=55?"":"bad"; return `<span class="bar ${cls}"><i style="width:${p||0}%"></i></span>`; }
function statRow(name,p,n){ return `<div class="statline"><span class="lbl">${esc(name)}</span>${bar(p)}<span class="pct">${pct(p)}</span><span class="n">${n?("n="+n):""}</span></div>`; }
function radio(name,val){ return `<input type="radio" name="${name}" value="${val}" style="width:20px;height:20px;accent-color:var(--teal)">`; }

const TABS = [["#/home","⌂","Home"],["#/practice","✎","Practice"],["#/study","◔","Study"],["#/simulate","◷","Simulate"],["#/progress","▤","Progress"]];
NC.actions = {};
NC.actions["go"] = (d)=>{ if(d && d.to) go(d.to); };
/* "12 new · 3 seen before" — the app used to silently recycle answered items
   when a filter ran dry, which reads to a candidate as "there are no new
   questions". Every practice entry point now says what it is serving.       */
function freshLine(filters){
  const total = NC.countFor(Object.assign({}, filters, { excludeSeen:false }));
  const fresh = NC.freshCount(filters);
  if (!total) return `<b style="color:var(--teal)">0</b> items match`;
  return fresh < total
    ? `<b style="color:var(--teal)">${fresh}</b> new · ${total-fresh} already answered (${total} match)`
    : `<b style="color:var(--teal)">${total}</b> items match — all new`;
}
NC.ui.freshLine = freshLine;
function freshToast(s){
  if (!s || !s.items || !s.items.length) return;
  if (s.recycled > 0 && s.fresh === 0)
    NC.ui.toast(`You've answered all of these before — recycling ${s.recycled} for spaced review`);
  else if (s.recycled > 0)
    NC.ui.toast(`${s.fresh} new · ${s.recycled} seen before`);
}
NC.ui.freshToast = freshToast;
NC.actions["start"] = (d)=>{
  const count = Math.min(+d.count||10, NC.countFor({excludeSeen:false}));
  const s = NC.newSession({mode:d.mode||"quick", count:Math.max(1,count), filters:{excludeSeen:true}});
  freshToast(s);
  go("#/session/"+s.id);
};
function tabbar(active){
  return `<nav class="tabbar" role="tablist">${TABS.map(t=>`<button class="tab" role="tab" aria-current="${t[0]===active?"page":"false"}" data-act="go" data-to="${t[0]}"><span class="ico" aria-hidden="true">${t[1]}</span>${t[2]}</button>`).join("")}</nav>`;
}
function screen(inner, tab, opts){
  opts=opts||{};
  $app().innerHTML = `<div class="screen ${opts.noTab?"no-tab":""}">${tab?tabbar(tab):""}${inner}</div>`;
  wire($app());
}
function wire(root){
  root.querySelectorAll("[data-act]").forEach(elm=>{
    elm.onclick = async (e)=>{
      const act = elm.dataset.act;
      const A = NC.actions; if (!A[act]) return;
      try {
        const res = A[act](elm.dataset, elm, e);
        if (res && typeof res.then === "function") {
          await res;
        }
      } catch (err) {
        console.error("Action error:", act, err);
        if (elm) {
          elm.disabled = false;
          if (elm.textContent === "…" || elm.textContent === "Saving…") {
            elm.textContent = elm.dataset.actText || "NEXT →";
          }
        }
        try { NC.save(); } catch(_) {}
      }
    };
  });
}
NC.wire = wire;

/* ---------- router ---------- */
NC.route = function(){
  if (tick){ clearInterval(tick); tick=null; }
  const r = (location.hash || "#/home").replace("#/","");
  const [page, a, b] = r.split("/");
  NC.logEvent("view",{page:r});
  const S = NC.load();
  if (!S.user.onboarded && page!=="onboard") return go("#/onboard");
  const res = (()=>{
    switch(page){
      case "onboard": return onboard();
      case "home": return home();
      case "practice": return practiceHub();
      case "quick": return quickPick();
      case "custom": return customBuilder();
      case "browse": return browse(a);
      case "session": return b==="results"? sessionResults(a) : sessionRunner(a);
      case "case": return b==="results"? caseResults(a) : caseRunner(a);
      case "cj": return caseHub();
      case "simulate": return simHub();
      case "sim": return a==="preflight"? simPreflight(b) : a==="run"? simRun(b) : simResults(a);
      case "study": return studyHub();
      case "plan": return studyPlan();
      case "incorrect": return reviewList("incorrect");
      case "bookmarks": return reviewList("bookmarks");
      case "later": return reviewList("later");
      case "progress": return progress();
      case "explain": return explain(a);
      case "settings": return settings();
      case "weak": return NC.routeStudyWeak();
      case "spaced": return spacedView();
      default: return home();
    }
  })();
  if (page !== "sim" || a !== "run") {
    checkResumeSimPrompt();
  }
  return res;
};

/* ================= ONBOARDING ================= */
function onboard(){
  const S = NC.load();
  screen(`
   <div class="topbar"><h1>Welcome to RN Ready</h1></div>
   <div class="card"><p style="font-size:14px;margin:0 0 4px">NCLEX-RN preparation — practice, clinical-judgment cases, adaptive simulation, and honest readiness tracking.</p>
   <p class="hint">A few questions to personalize your plan.</p></div>
   <div class="card">
    <div class="field"><label>Your first name</label><input id="ob-name" placeholder="e.g. Amaka" value="${esc(S.user.name||"")}"></div>
    <div class="field"><label>Exam date</label><input id="ob-date" type="date" min="${new Date().toISOString().slice(0,10)}" value="${S.user.examDate||""}"></div>
    <div class="field"><label>Where are you starting from?</label>
      <div class="seg" id="ob-level">
        ${["Just beginning","Comfortable","Final review"].map((l,i)=>`<button type="button" data-lv="${esc(l)}" aria-pressed="false">${l}</button>`).join("")}
      </div></div>
    <div class="field"><label>Daily study time</label>
      <div class="seg" id="ob-min">
        ${[15,30,60,90].map(m=>`<button type="button" data-m="${m}" aria-pressed="${m===30}" style="min-width:64px">${m}<span class="c">min/day</span></button>`).join("")}
      </div></div>
    <button class="btn" data-act="ob-done">Start preparing →</button>
   </div>
   <p class="tag-disclaimer">${esc(NC.DISCLAIMER)}</p>`, null, {noTab:true});
  let lv=null, mins=30;
  document.getElementById("ob-level").querySelectorAll("button").forEach(x=>x.onclick=()=>{ lv=x.dataset.lv; document.getElementById("ob-level").querySelectorAll("button").forEach(y=>y.setAttribute("aria-pressed", y===x)); });
  document.getElementById("ob-min").querySelectorAll("button").forEach(x=>x.onclick=()=>{ mins=+x.dataset.m; document.getElementById("ob-min").querySelectorAll("button").forEach(y=>y.setAttribute("aria-pressed", y===x)); });
  NC.actions["ob-done"] = ()=>{
    const S = NC.load();
    S.user.name = (document.getElementById("ob-name").value||"").trim() || "there";
    S.user.examDate = document.getElementById("ob-date").value || null;
    S.user.level = lv; S.user.dailyMin = mins; S.user.onboarded = true;
    NC.save(); go("#/home");
  };
}

/* ================= HOME ================= */
function home(){
  const S = NC.load(), R = NC.readiness();
  const first = !S.user.diagDone;
  const day = new Date().toISOString().slice(0,10);
  S.daily.date = day; NC.save();
  const t = new Date().getHours();
  const greet = t<12?"Good morning": t<17?"Good afternoon":"Good evening";
  const dte = NC.daysToExam();
  const weak = NC.weakAreas(3,3);
  const streak = S.streak.count>0 ? `Streak ${S.streak.count} 🔥` : "";
  const resume = S.sessions.filter(s=>s.status==="open").slice(-1)[0];
  const openSim = S.sims.filter(s=>s.status==="open").slice(-1)[0];
  let simResumeHtml = "";
  if (openSim) {
    const exam = (NC.EXAMS && NC.EXAMS[openSim.examId]) || { name: "NCLEX Simulation" };
    const stoppedWhere = simStoppedWhere(openSim);
    const leftMs = openSim.remainingMs || Math.max(0, openSim.endsAt - Date.now());
    simResumeHtml = `
   <div class="card resume-sim-card" style="border-left:4px solid var(--teal); background:var(--card)">
     <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px">
       <div style="flex:1">
         <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px">
           <span class="ico" style="font-size:18px">◷</span>
           <b style="font-size:15px">Resume In-Progress Simulation</b>
         </div>
         <div class="hint" style="margin-bottom:6px"><b>${esc(exam.name)}</b> · stopped at <b>${esc(stoppedWhere)}</b></div>
         <div class="hint">${fmt(leftMs)} remaining · Pick up exactly where you stopped</div>
       </div>
     </div>
     <div style="display:flex;gap:8px;margin-top:12px">
       <button class="btn sm" data-act="sim-resume" data-id="${openSim.id}">Pick up where you stopped →</button>
       <button class="btn sm soft" data-act="sim-abandon" data-id="${openSim.id}">Abandon</button>
     </div>
   </div>`;
  }
  const taskDone = k=> !!(S.daily.tasks[day]&&S.daily.tasks[day][k]);
  const srsDue = NC.srsCounts().due;
  const tasks = [
    {k:"set", ico:"✎", t:"Daily set — 10 questions", why: weak[0]? `Focus: ${weak[0].name} (${weak[0].pct}%)` : "Adaptive mix", act:"daily-set"},
    {k:"case", ico:"❋", t:"1 clinical judgment case", why: "Unfolding NCJMM practice", act:"daily-case"}
  ];
  if (srsDue>0) tasks.push({k:"srs", ico:"⟳", t:`Spaced review — ${srsDue} concept${srsDue===1?"":"s"} due`, why:"Lock in what you missed", act:"daily-srs"});
  else tasks.push({k:"fix", ico:"⟳", t:"Fix 5 missed concepts", why: S.responses.some(r=>r.score<1)? "Spaced remediation" : "Nothing to fix yet — nice", act:"daily-fix"});
  const tasksHtml = tasks.map((x,i)=>`<div class="task ${taskDone(x.k)?"done":""}"><span class="num">${taskDone(x.k)?"✓":i+1}</span><div style="flex:1"><div class="t">${x.ico} ${x.t}</div><div class="why">${x.why}</div></div>${taskDone(x.k)?"":`<button class="btn sm soft" data-act="${x.act}">Go</button>`}</div>`).join("");

  screen(`
   <div class="topbar"><div><h1>${greet}${S.user.name?", "+esc(S.user.name):""}</h1>
     <div class="sub">${dte!=null? (dte>0? `Exam in ${dte} day${dte===1?"":"s"}` : "Exam day is here — good luck") : "No exam date set"}${streak?" · "+streak:""}${NC.notify.cfg().on? " · ⏰ "+esc(NC.notify.cfg().time):""}</div></div>
     <div class="spacer"></div><button class="back" data-act="go" data-to="#/settings" aria-label="Settings">⚙</button></div>
   ${simResumeHtml}
   ${first? `<div class="card" style="border-left:4px solid var(--teal)"><h3>Start with a 30-item diagnostic</h3>
     <p class="hint">Establishes your baseline and powers your daily plan.</p>
     <button class="btn" data-act="go" data-to="#/session/diag">Take diagnostic →</button></div>`:""}
   <div class="card hero-readiness" role="button" data-act="go" data-to="#/progress">
     <div class="ring" style="--p:${R.ok?R.score:0}" aria-label="Readiness ${R.ok?R.score+"%":"not enough data"}"><b>${R.ok?R.score:"?"}</b></div>
     <div><h3 style="margin:0">NCLEX Readiness</h3>
       <div class="hint">${R.ok? `Knowledge ${R.dims.knows} · Judgment ${R.dims.thinks} · Performance ${R.dims.performs}` : `Answer ${10-S.responses.length} more questions to unlock`}</div>
       ${R.ok&&R.trend!=null? `<div class="hint" style="color:${R.trend>=0?"var(--ok)":"var(--bad)"};font-weight:700">${R.trend>=0?"▲":"▼"} ${Math.abs(Math.round(R.trend*100))} pts vs prior month</div>`:""}
     </div></div>
   <div class="card"><h3>Today's plan</h3>${tasksHtml}</div>
   ${resume? `<div class="card row"><div style="flex:1"><h3 style="margin:0">Resume session</h3><div class="hint">Question ${resume.idx+1} of ${resume.count}</div></div><button class="btn sm" data-act="go" data-to="#/session/${resume.id}">Continue</button></div>`:""}
   <div class="quickgrid">
     <div class="card" role="button" data-act="go" data-to="#/quick"><span class="ico">✎</span><div class="lbl">Quick Practice</div></div>
     <div class="card" role="button" data-act="go" data-to="#/simulate"><span class="ico">◷</span><div class="lbl">Mock Exam</div></div>
     <div class="card" role="button" data-act="go" data-to="#/cj"><span class="ico">❋</span><div class="lbl">Clinical Judgment</div></div>
     <div class="card" role="button" data-act="go" data-to="#/browse/sys"><span class="ico">☰</span><div class="lbl">By Topic</div></div>
   </div>
   <p class="tag-disclaimer">${esc(NC.DISCLAIMER)}</p>`, "#/home");
}

/* ================= PRACTICE HUB ================= */
function masteryOf(fn){ const st=NC.stats(); const arr=fn(st); return arr; }
function practiceHub(){
  const st = NC.stats();
  const cnMap = {}; st.byCn.forEach(x=>cnMap[x.id]=x);
  const modes = [
    ["#quick","✎","Quick Practice","5 / 10 / 20 / 30 questions, balanced mix",""],
    ["smart","✦","Smart Practice","Weighted to your weakest areas", NC.weakAreas(3,2).map(w=>esc(w.name)).join(" · ")],
    ["#custom","⚙","Custom Practice","Filters: topic · type · difficulty · CJ step",""],
    ["#/browse/cn","▦","By Client Need","The 8 NCLEX-RN blueprint categories",""],
    ["#/browse/sys","☰","By Body System","12 systems, drill into topics",""],
    ["#/browse/topic","⌕","By Topic","Search all topics A–Z",""],
    ["#/browse/type","◫","By Question Type","Train unfamiliar NCLEX formats",""],
    ["#/browse/diff","▲","By Difficulty","Easy → Very Hard",""],
    ["#/cj","❋","Clinical Judgment","Unfolding 6-step NGN case studies",""],
    ["med","℞","Medication Practice","Pharmacology & dosage calculation",""],
    ["pnd","⇄","Priority & Delegation","ABCs · Maslow · scope · assignment",""],
    ["timed","◷","Timed Practice","Pace drills against the clock",""]
  ].map(m=>`<button class="mode" data-act="${m[0].startsWith("#")?"go":"mode"}" data-to="${m[0].startsWith("#")?m[0]:""}" data-mode="${m[0]}">
     <span class="ico" aria-hidden="true">${m[1]}</span><span style="flex:1"><span class="t">${m[2]}</span><span class="d" style="display:block">${m[3]}${m[4]?` — <b style="color:var(--warn)">${m[4]}</b>`:""}</span></span><span class="arr">›</span></button>`).join("");
  screen(`<div class="topbar"><h1>Practice</h1></div>${modes}`, "#/practice");
}

/* quick pick */
function quickPick(){
  const opts=[5,10,20,30].map(n=>`<button class="mode" data-act="start" data-mode="quick" data-count="${n}">
    <span class="ico">${n}</span><span style="flex:1"><span class="t">${n} questions</span><span class="d" style="display:block">Balanced client-need mix</span></span><span class="arr">›</span></button>`).join("");
  screen(`<div class="topbar"><button class="back" data-act="go" data-to="#/practice" aria-label="Back">‹</button><h1>Quick Practice</h1></div>${opts}`, "#/practice");
}

/* custom builder */
let CF = {cn:new Set(), sys:new Set(), types:new Set(), diffs:new Set(), cj:new Set(), tags:new Set(), count:20, timed:false};
function chipGroup(title, items, setKey, getName){
  return `<div class="field"><label>${title}</label><div class="seg" data-set="${setKey}">${items.map(i=>
    `<button type="button" data-v="${i.id}" aria-pressed="${CF[setKey].has(i.id)}">${getName? getName(i):i.name}${i.range?`<span class="c">${i.range[0]}–${i.range[1]}%</span>`:""}</button>`).join("")}</div></div>`;
}
function customBuilder(){
  const T = NC.TAX;
  screen(`<div class="topbar"><button class="back" data-act="go" data-to="#/practice" aria-label="Back">‹</button><h1>Custom Practice</h1></div>
   <div class="card">
    <div class="field"><label>Questions</label>
      <div class="stepper"><button data-act="cf-count" data-d="-5">−</button><b id="cf-count">${CF.count}</b><button data-act="cf-count" data-d="5">+</button></div></div>
    ${chipGroup("Client Need", T.clientNeeds, "cn")}
    ${chipGroup("Body System", T.systems, "sys")}
    ${chipGroup("Question Type", Object.keys(T.qTypes).map(k=>({id:k,name:T.qTypes[k].name})), "types")}
    ${chipGroup("Difficulty", T.difficulty, "diffs")}
    ${chipGroup("Clinical Judgment Step", T.cjSteps.map(s=>({id:s,name:T.cjNames[s]})), "cj")}
    ${chipGroup("Focus Tags", T.tags.map(t=>({id:t,name:t[0].toUpperCase()+t.slice(1)})), "tags")}
    <div class="field"><label>Pacing</label>
      <div class="seg"><button type="button" data-act="cf-timed" data-v="0" aria-pressed="${!CF.timed}">Untimed</button>
      <button type="button" data-act="cf-timed" data-v="1" aria-pressed="${CF.timed}">Timed</button></div></div>
   </div>
   <div class="card"><div id="cf-match" class="hint" style="margin-bottom:8px">…</div>
    <button class="btn" data-act="cf-start">Start practice →</button></div>`, "#/practice");
  const rerenderMatch = ()=>{
    const n = NC.countFor({cn:[...CF.cn], sys:[...CF.sys], types:[...CF.types], diffs:[...CF.diffs], cj:[...CF.cj], tags:[...CF.tags], excludeSeen:false});
    document.getElementById("cf-match").innerHTML =
      freshLine({cn:[...CF.cn], sys:[...CF.sys], types:[...CF.types], diffs:[...CF.diffs], cj:[...CF.cj], tags:[...CF.tags]}) +
      ` · starting ${Math.min(CF.count,n)}`;
    return n;
  };
  document.querySelectorAll(".seg[data-set]").forEach(seg=>{
    seg.querySelectorAll("button").forEach(b=>b.onclick=()=>{
      const k=seg.dataset.set, v=b.dataset.v;
      CF[k].has(v)? CF[k].delete(v):CF[k].add(v);
      b.setAttribute("aria-pressed", CF[k].has(v));
      rerenderMatch();
    });
  });
  NC.actions["cf-count"] = (d)=>{ CF.count=Math.max(5,Math.min(100,CF.count+(+d.d))); document.getElementById("cf-count").textContent=CF.count; rerenderMatch(); };
  NC.actions["cf-timed"] = (d)=>{ CF.timed = d.v==="1"; document.querySelectorAll('[data-act="cf-timed"]').forEach(x=>x.setAttribute("aria-pressed", x.dataset.v===d.v)); };
  NC.actions["cf-start"] = ()=>{ const n=rerenderMatch(); if(!n) return NC.ui.toast("No items match — relax a filter");
    const s = NC.newSession({mode:"custom", count:Math.min(CF.count,n), timed:CF.timed, secs:CF.timed? Math.min(CF.count,n)*90:null,
      filters:{cn:[...CF.cn], sys:[...CF.sys], types:[...CF.types], diffs:[...CF.diffs], cj:[...CF.cj], tags:[...CF.tags], excludeSeen:true}});
    freshToast(s);
    go("#/session/"+s.id); };
  rerenderMatch();
}

/* browse axes */
function browse(axis){
  const T=NC.TAX, st=NC.stats();
  const cfg = {cn:{title:"By Client Need", items:T.clientNeeds.map(c=>({...c, sub:c.cat}))},
    sys:{title:"By Body System", items:T.systems},
    topic:{title:"By Topic", items:[...new Set(NC.allItems().map(q=>q.topic))].sort().map(t=>({id:t,name:t,topic:true}))},
    type:{title:"By Question Type", items:Object.keys(T.qTypes).map(k=>({id:k,name:T.qTypes[k].name,desc:true}))},
    diff:{title:"By Difficulty", items:T.difficulty.map(d=>({...d,id:""+d.id}))}}[axis];
  const statFor = (id)=>{
    if (axis==="cn") return st.byCn.find(x=>x.id===id);
    if (axis==="sys") return st.bySys.find(x=>x.id===id);
    if (axis==="type") return st.byType.find(x=>x.id===id);
    if (axis==="diff") return st.byDiff.find(x=>x.id===+id);
    return st.byTopic.find(x=>x.id===id);
  };
  const list = cfg.items.map(it=>{
    const s=statFor(it.id), n=NC.countFor(axis==="cn"?{cn:[it.id]}: axis==="sys"?{sys:[it.id]}: axis==="type"?{types:[it.id]}: axis==="diff"?{diffs:[+it.id]}: {topic:it.id});
    return `<button class="mode" data-act="axis-drill" data-axis="${axis}" data-id="${esc(it.id)}">
      <span style="flex:1"><span class="t">${esc(it.name)}</span>
      <span class="d" style="display:block">${it.sub?esc(it.sub):""} ${n} item${n===1?"":"s"}${s&&s.n? ` · mastery ${s.pct}%`:""}</span></span>
      <span class="arr">${s&&s.n? bar(s.pct):"›"}</span></button>`;
  }).join("");
  screen(`<div class="topbar"><button class="back" data-act="go" data-to="#/practice" aria-label="Back">‹</button><h1>${cfg.title}</h1></div>${list}`, "#/practice");
}
NC.actions["axis-drill"] = (d)=>{
  const axis=d.axis, id=d.id;
  const filters = axis==="cn"?{cn:[id]}: axis==="sys"?{sys:[id]}: axis==="type"?{types:[id]}: axis==="diff"?{diffs:[+id]}:{topic:id};
  const n = NC.countFor({...filters, excludeSeen:false});
  if (!n) return NC.ui.toast("No items available yet");
  const s = NC.newSession({mode:"custom", count:Math.min(20,n), filters:{...filters, excludeSeen:true}});
  freshToast(s);
  go("#/session/"+s.id);
};

/* ================= SESSION RUNNER (practice) ================= */
let cur = null; // {item, ans, startTs, session}
function sessionRunner(sid){
  if (sid==="diag"){ // bootstrap a fresh diagnostic session
    const diag = NC.newSession({mode:"diagnostic", count:Math.min(30, NC.countFor({excludeSeen:false}))});
    go("#/session/"+diag.id); return;
  }
  const s = NC.getSession(sid);
  if (!s) return go("#/home");
  if (s.status!=="open") return sessionResults(sid);
  renderSessionItem(s);
}
function renderSessionItem(s){
  const qid = s.items[s.idx];
  const item = NC.item(qid);
  if (!item){ s.idx++; if(s.idx>=s.items.length) return finishSession(s); NC.save(); return renderSessionItem(s); }
  NC.markSeen(qid);
  const S = NC.load();
  const answered = S.responses.length;
  const isCase = !!item.caseId;
  const meta = [NC.cn(item.cn).name, NC.sysName(item.sys), item.topic, NC.dName(item.d)];
  const timed = s.timed && s.secs;
  const left = timed? Math.max(0, s.startedTs + s.secs*1000 - Date.now()) : null;
  cur = { item, ans:null, startTs:Date.now(), session:s };
  screen(`
   <div class="run-head">
     <div class="r1"><b>${s.mode==="diagnostic"?"Diagnostic":"Practice"}</b>
       <span>Question ${s.idx+1} of ${s.items.length}</span>
       ${timed? `<span class="timer" id="tm" role="timer">${fmt(left)}</span>` : `<span class="spacer"></span>`}
       <button class="iconbtn ${S.reviewLater.includes(qid)?"on":""}" data-act="later" data-qid="${qid}" aria-label="Mark for review">⚑</button>
       <button class="iconbtn ${S.bookmarks.includes(qid)?"on":""}" data-act="bmk" data-qid="${qid}" aria-label="Bookmark">☆</button>
     </div>
     <div class="progress-hairline"><i style="width:${100*(s.idx)/s.items.length}%"></i></div>
   </div>
   ${meta.length&&s.mode!=="diagnostic"? `<div><span class="chip gray">${esc(meta[0])}</span><span class="chip gray">${esc(meta[1])}</span><span class="chip">${esc(meta[2])}</span><span class="chip gray">${esc(meta[3])}</span>${item.cj?`<span class="chip">${esc(NC.TAX.cjNames[item.cj])}</span>`:""}</div>`:""}
   <div id="qmount"></div>
   <div class="actionbar"><div class="inner">
     <button class="btn" data-act="next">NEXT →</button>
     <button class="icon-tgl" data-act="calc" aria-label="Calculator">🖩</button>
   </div></div>`, "#/practice", {noTab:true});
  const mount = document.getElementById("qmount");
  mount.appendChild(NC.renderStem(item, true));
  const state = { get ans(){return cur.ans;}, set(v){cur.ans=v;} };
  NC.render.refresh = ()=>{ mount.querySelectorAll(".qbox").forEach(x=>x.remove()); mount.appendChild(NC.renderItem(item, state, {})); wire(mount); };
  NC.render.refresh();
  if (timed){
    tick = setInterval(()=>{
      const elx = document.getElementById("tm"); if(!elx) return clearInterval(tick);
      const rem = s.startedTs + s.secs*1000 - Date.now();
      elx.textContent = fmt(rem);
      if (rem < 120000) elx.classList.add("warn");
      if (rem <= 0){ clearInterval(tick); finishSession(s, true); }
    }, 500);
  }
}
NC.actions["next"] = async (d,elm)=>{
  const s = cur.session, item = cur.item;
  const timeMs = Date.now()-cur.startTs;
  if (cur.ans==null && !confirm("Skip without answering? The item will be scored incorrect.")) return;
  const btn = elm || document.querySelector('[data-act="next"]');
  if (btn){ btn.disabled=true; btn.dataset.actText = btn.textContent; btn.textContent="Saving…"; }
  try{
    if (NC.api && NC.api.remote){
      const res = await NC.api.submitAnswer(s.id, item.id, cur.ans, timeMs, s.timed);
      NC.applyScore(s.id, item.id, cur.ans, res, timeMs, s.timed);
    } else {
      NC.recordAnswer(s.id, item.id, cur.ans, timeMs, s.timed);
    }
    if (NC.api && NC.api.account && NC.api.track) {
      NC.api.track(NC.trackPayload()).catch(()=>{});
    }
  }catch(e){
    if (e.status == null && NC.api.queueAnswer({sid:s.id, qid:item.id, ans:cur.ans, timeMs, timed:s.timed})){
      // offline: keys live server-side, so score on reconnect; mark pending now
      NC.applyScore(s.id, item.id, cur.ans, {score:0, answered:false}, timeMs, s.timed);
      NC.ui.toast("Offline — answer queued, will score when back online");
    } else {
      NC.ui.toast("Connection problem — answer not recorded");
      if(btn){btn.disabled=false; btn.textContent="NEXT →";}
      return;
    }
  }
  s.idx++;
  if (s.idx >= s.items.length) return finishSession(s);
  NC.save();
  try {
    renderSessionItem(s);
  } catch(err) {
    console.error("Error rendering session item:", err);
    s.idx++;
    if (s.idx >= s.items.length) return finishSession(s);
    NC.save();
    renderSessionItem(s);
  }
};
NC.actions["bmk"] = (d,elm)=>{ const S=NC.load(); S.bookmarks.includes(d.qid)? S.bookmarks=S.bookmarks.filter(x=>x!==d.qid):S.bookmarks.push(d.qid); NC.save(); elm.classList.toggle("on"); NC.ui.toast(S.bookmarks.includes(d.qid)?"Bookmarked":"Removed"); };
NC.actions["later"] = (d,elm)=>{ const S=NC.load(); S.reviewLater.includes(d.qid)? S.reviewLater=S.reviewLater.filter(x=>x!==d.qid):S.reviewLater.push(d.qid); NC.save(); elm.classList.toggle("on"); };
NC.actions["calc"] = ()=>calcOverlay();
function fmt(ms){ const s=Math.max(0,Math.round(ms/1000)); return Math.floor(s/60)+":"+String(s%60).padStart(2,"0"); }

function finishSession(s, timedOut){
  s.status="done"; NC.save();
  clearInterval(tick);
  if (s.mode==="diagnostic"){ const S=NC.load(); S.user.diagDone=true; NC.save(); }
  if (s.mode==="srs" && s.srsTopic){
    const rs = NC.load().responses.filter(r=>r.sid===s.id && r.answered);
    if (rs.length) NC.srsCheck(s.srsTopic, rs.reduce((a,r)=>a+r.score,0)/rs.length);
  } else {
    NC.srsProcessSession(s.id);
  }
  NC.logEvent("session_done",{mode:s.mode, count:s.items.length, timedOut:!!timedOut});
  if (NC.api && NC.api.remote && NC.api.account){
    NC.api.track(NC.trackPayload()).catch(()=>{}); // fire-and-forget sync
  }
  go("#/session/"+s.id+"/results");
}

/* ================= SESSION RESULTS ================= */
function sessionResults(sid){
  const s = NC.getSession(sid); if(!s) return go("#/home");
  const S = NC.load();
  const rs = S.responses.filter(r=>r.sid===sid);
  const scored = rs.filter(r=>r.answered);
  const correct = scored.filter(r=>r.score===1).length;
  const pctv = scored.length? Math.round(100*correct/scored.length):0;
  const partial = scored.length? Math.round(100*scored.reduce((a,r)=>a+r.score,0)/scored.length):0;
  const timeS = Math.round(rs.reduce((a,r)=>a+(r.timeMs||0),0)/1000);
  const isDiag = s.mode==="diagnostic";
  const weakBands = ()=> {
    const st = NC.stats();
    const cn = statRow; 
    return st.byCn.filter(x=>x.n>0).map(x=>statRow(NC.cn(x.id).name, x.pct, x.n)).join("");
  };
  const list = s.items.map((qid,i)=>{
    const r = rs.find(x=>x.qid===qid);
    const item = NC.item(qid);
    const mark = !r? "○" : r.score===1? "✓" : r.score>0? "◐":"✗";
    const color = !r||r.score===0? "var(--bad)": r.score===1? "var(--ok)":"var(--warn)";
    return `<button class="rev-row" data-act="go" data-to="#/explain/${encodeURIComponent(qid)}">
      <span class="mark" style="color:${color}">${mark}</span>
      <span class="meta"><span class="t">${i+1}. ${esc((item?.topic)||"Item")}</span>
      <span class="s">${item? esc(NC.TAX.qTypes[item.t]?.name||item.t):""} · ${r? Math.round(r.score*100)+"% credit":"not answered"}</span></span>
      <span class="arr" style="color:var(--ink-3)">›</span></button>`;
  }).join("");
  screen(`<div class="topbar"><button class="back" data-act="go" data-to="#/home" aria-label="Home">‹</button><h1>${isDiag?"Your Preparation Profile":"Session Results"}</h1></div>
   <div class="card score-hero">
     <div class="big" style="color:${pctv>=75?"var(--ok)":pctv>=55?"var(--warn)":"var(--bad)"}">${pctv}%</div>
     <div class="sub">${correct} of ${scored.length} answered correctly · ${partial}% with partial credit</div>
     <div class="sub">${Math.floor(timeS/60)}m ${timeS%60}s · ${scored.length? Math.round(timeS/scored.length):0}s/item average</div>
   </div>
   ${isDiag? diagProfile(rs) : ""}
   <div class="card"><h3>Client Needs in this session</h3>${weakBands()}</div>
   <div class="card"><h3>Review every item</h3>${list}</div>
   <div class="card">
     <button class="btn soft" data-act="again">${s.mode==="diagnostic"?"Practice from profile":"Practice similar"}</button>
   </div>`, "#/practice");
  NC.actions["again"] = ()=>{ const sn=NC.newSession({mode:"smart", count:10}); go("#/session/"+sn.id); };
}
function diagProfile(rs){
  const st = NC.stats();
  const weak = NC.weakAreas(1,4);
  const cjW = st.byCj.filter(x=>x.n>0).sort((a,b)=>a.pct-b.pct).slice(0,2);
  const tyW = st.byType.filter(x=>x.n>0).sort((a,b)=>a.pct-b.pct).slice(0,2);
  const theta = NC.load().theta;
  const band = theta>0.8? ["Strong baseline","var(--ok)"] : theta>-0.3? ["Developing","var(--warn)"] : ["Foundation stage","var(--bad)"];
  return `<div class="card">
    <h3>Baseline ability</h3>
    <div class="row"><span class="verdict-pill" style="background:${band[1]}1a;color:${band[1]}">${band[0]}</span>
    <span class="hint">θ ≈ ${theta.toFixed(2)} (internal estimate)</span></div>
    ${weak.length? `<h3 style="margin-top:12px">Priority weaknesses</h3>${weak.map(w=>statRow(w.name+" ("+w.kind+")", w.pct, w.n)).join("")}`:""}
    ${cjW.length? `<h3 style="margin-top:12px">Clinical judgment gaps</h3>${cjW.map(x=>statRow(NC.TAX.cjNames[x.id], x.pct, x.n)).join("")}`:""}
    ${tyW.length? `<h3 style="margin-top:12px">Format gaps</h3>${tyW.map(x=>statRow(NC.TAX.qTypes[x.id]?.name||x.id, x.pct, x.n)).join("")}`:""}
    <p class="hint" style="margin-top:10px">Your daily plan and Smart Practice now target these areas.</p></div>`;
}

/* ================= EXPLANATION ================= */
async function explain(qid){
  qid = decodeURIComponent(qid);
  let item = NC.item(qid);
  if(!item) return go("#/home");
  const S = NC.load();
  const r = S.responses.filter(x=>x.qid===qid).slice(-1)[0];
  if (NC.api && NC.api.remote && item.rat==null){
    try{
      item = await NC.api.itemFull(qid, r && r.sid);
      NC.EXPLAIN_CACHE = NC.EXPLAIN_CACHE||{}; NC.EXPLAIN_CACHE[qid]=item;
    }catch(e){ NC.ui.toast("Could not load explanation — check connection"); }
  }
  const isCase = !!item.caseId;
  const credit = r? Math.round(r.score*100)+"% credit" : "not answered";
  const verdict = !r||!r.answered? ["Not answered","var(--ink-3)"] : r.score===1? ["Correct","var(--ok)"] : r.score>0? ["Partially correct","var(--warn)"] : ["Incorrect","var(--bad)"];
  // re-render item in review mode
  screen(`<div class="topbar"><button class="back" id="ex-back" data-act="go" data-to="#/home" aria-label="Back">‹</button>
    <h1>Explanation</h1><div class="spacer"></div>
    <button class="iconbtn ${S.bookmarks.includes(qid)?"on":""}" data-act="bmk" data-qid="${qid}" aria-label="Bookmark">☆</button></div>
   <div><span class="chip ${r&&r.score===1?"":"warn"}" style="color:${verdict[1]};background:${verdict[1]}18">${verdict[0]} · ${credit}</span>
   <span class="chip gray">${esc(NC.cn(item.cn).name)}</span><span class="chip gray">${esc(NC.sysName(item.sys))}</span>
   <span class="chip">${esc(item.topic)}</span><span class="chip gray">${esc(NC.dName(item.d))}</span>
   ${item.cj?`<span class="chip">${esc(NC.TAX.cjNames[item.cj])}</span>`:""}</div>
   <div id="qmount"></div>
   <div class="card">
     <div class="why-block"><h4>Why this is correct</h4><p>${esc(item.rat.c)}</p></div>
     ${whyOpts(item)}
     <div class="why-block"><h4>NCLEX strategy</h4><p>${esc(item.rat.s)}</p></div>
     <p class="hint">Reference: ${esc(item.ref||"—")}</p>
   </div>
   <div class="card">
    <button class="btn soft" data-act="similar" data-topic="${esc(item.topic)}">Practice similar — ${esc(item.topic)} →</button>
   </div>`, "#/study");
  document.getElementById("ex-back").dataset.to = document.referrer? "#/study":"#/home";
  const mount = document.getElementById("qmount");
  mount.appendChild(NC.renderStem(item, true));
  const state = { get ans(){return r? r.ans: null;}, set(){} };
  mount.appendChild(NC.renderItem(item, state, {review:true}));
}
function whyOpts(item){
  const L="ABCDEFGH";
  if ((item.t==="single"||item.t==="multi") && item.rat.o) return item.opts.map((o,i)=>{
    const should = Array.isArray(item.ans)? item.ans.includes(i): item.ans===i;
    return `<div class="why-opt ${should?"good":"bad"}"><span class="k">${L[i]}</span><span><b>${esc(o)}</b><br>${esc(item.rat.o[i]||"")}</span></div>`;
  }).join("");
  if (item.t==="emr" && item.rat.o) return item.rat.o.map((x,i)=>`<div class="why-opt ${item.groups.flatMap(g=>g.opts)[i]&&false?"good":"bad"}"><span class="k">•</span><span>${esc(x)}</span></div>`).join("");
  if (item.rat.o) return item.rat.o.map(x=>`<div class="why-opt"><span class="k">•</span><span>${esc(x)}</span></div>`).join("");
  return "";
}
NC.actions["similar"] = (d)=>{
  const n = NC.countFor({topic:d.topic, excludeSeen:false});
  const s = NC.newSession({mode:"custom", count:Math.min(10,n||1), filters:{topic:d.topic, excludeSeen:true}});
  if (!NC.getSession(s.id).items.length){ // fall back to any unseen
    const s2 = NC.newSession({mode:"custom", count:5, filters:{excludeSeen:true}}); return go("#/session/"+s2.id);
  }
  go("#/session/"+s.id);
};
NC.actions["daily-set"] = ()=>{ const s=NC.newSession({mode:"smart", count:10}); markTask("set"); go("#/session/"+s.id); };
NC.actions["daily-case"] = ()=>{ markTask("case"); go("#/cj"); };
NC.actions["daily-srs"] = ()=>{ markTask("srs"); go("#/spaced"); };
NC.actions["daily-fix"] = ()=>{
  const S=NC.load();
  const missed=[...new Set(S.responses.filter(r=>r.score<1).map(r=>r.qid))].slice(-5);
  if(!missed.length){ NC.ui.toast("Nothing to fix — keep it up!"); return; }
  markTask("fix");
  const s={ id:"fix"+Date.now().toString(36), mode:"retest", count:missed.length, filters:{}, timed:false, secs:null,
    items:missed, idx:0, answers:{}, times:{}, startedTs:Date.now(), status:"open" };
  S.sessions.push(s); NC.save(); go("#/session/"+s.id);
};
function markTask(k){ const S=NC.load(); const day=new Date().toISOString().slice(0,10); S.daily.tasks[day]=S.daily.tasks[day]||{}; S.daily.tasks[day][k]=true; NC.save(); }
NC.actions["mode"] = (d)=>{
  const mode=d.mode;
  if (mode==="smart"){ const s=NC.newSession({mode:"smart", count:20}); return go("#/session/"+s.id); }
  if (mode==="med"){ const n=NC.countFor({tags:["medication","calculation"]});
    if(!n) return NC.ui.toast("No medication items available");
    const s=NC.newSession({mode:"custom", count:Math.min(15,n), filters:{tags:["medication","calculation"]}}); return go("#/session/"+s.id); }
  if (mode==="pnd"){ const n=NC.countFor({tags:["priority","delegation"]});
    if(!n) return NC.ui.toast("No items available");
    const s=NC.newSession({mode:"custom", count:Math.min(15,n), filters:{tags:["priority","delegation"]}}); return go("#/session/"+s.id); }
  if (mode==="timed"){ const n=NC.countFor({});
    const s=NC.newSession({mode:"custom", count:30, timed:true, secs:30*72, filters:{excludeSeen:false}}); return go("#/session/"+s.id); }
};

/* ================= CASE STUDIES ================= */
function caseHub(){
  const S=NC.load();
  const cards = NC.CASES.map(c=>{
    const done = S.responses.some(r=>r.qid===c.id+"-evaluate");
    const pctv = (()=>{ const rs=c.items.map(i=>S.responses.filter(r=>r.qid===c.id+"-"+i.step).slice(-1)[0]).filter(Boolean);
      return rs.length? Math.round(100*rs.reduce((a,r)=>a+r.score,0)/Math.max(1,rs.length)):null; })();
    return `<button class="mode" data-act="go" data-to="#/case/${c.id}">
      <span class="ico" aria-hidden="true">❋</span>
      <span style="flex:1"><span class="t">${esc(c.title)}</span>
      <span class="d" style="display:block">${esc(c.setting)} · ${esc(NC.sysName(c.sys))} · ${NC.dName(c.d)}</span></span>
      <span class="mastery" style="font-size:11px;font-weight:700;color:${pctv==null?"var(--ink-3)":pctv>=75?"var(--ok)":"var(--warn)"}">${done?"completed":pctv!=null? pctv+"%":"new"}</span></button>`;
  }).join("");
  screen(`<div class="topbar"><button class="back" data-act="go" data-to="#/practice" aria-label="Back">‹</button><h1>Clinical Judgment</h1></div>
   <div class="card"><p style="font-size:13.5px;margin:0">Each case unfolds like the real NGN case studies: information is revealed step by step and <b>you cannot go back</b> once you advance. Six items map to the NCSBN clinical judgment model: Recognize Cues → Analyze Cues → Prioritize Hypotheses → Generate Solutions → Take Action → Evaluate Outcomes.</p></div>${cards}`, "#/practice");
}
let caseCtx = null;
function caseRunner(cid){
  const c = NC.CASES.find(x=>x.id===cid); if(!c) return go("#/cj");
  if (!caseCtx || caseCtx.id!==cid || caseCtx.finished) caseCtx = {id:cid, i:0, ans:null, startTs:Date.now(), finished:false};
  renderItemInCase(c);
}
function renderItemInCase(c){
  if (!c || !c.items || !c.items.length || caseCtx.i >= c.items.length) {
    caseCtx = caseCtx || {}; caseCtx.finished = true;
    return caseResults(c ? c.id : (caseCtx && caseCtx.id));
  }
  const it = c.items[caseCtx.i];
  if (!it) {
    caseCtx.finished = true;
    return caseResults(c.id);
  }
  const S = NC.load();
  const reveals = (Array.isArray(it.reveal) ? it.reveal : [])
    .map(k => (c.exhibits && c.exhibits[k]) || { name: k, type: "text", body: "" })
    .filter(Boolean);
  const total = c.items.length;
  screen(`
   <div class="run-head">
     <div class="r1"><b>${esc(c.title.split("—")[0])}</b><span>Case Study · item ${caseCtx.i+1} of ${total}</span><span class="spacer"></span>
       <button class="iconbtn" data-act="bmk" data-qid="${c.id}-${it.step}" aria-label="Bookmark">☆</button></div>
     <div class="progress-hairline"><i style="width:${100*caseCtx.i/total}%"></i></div>
   </div>
   <div><span class="chip">${esc(NC.TAX.cjNames[it.step] || it.step)}</span><span class="chip gray">${esc(c.setting)}</span></div>
   <div class="exhibit-bar">${reveals.map((e,i)=>`<button data-act="exh" data-i="${i}">${esc(e.name)} ▾</button>`).join("")}</div>
   <div id="qmount"></div>
   <div class="actionbar"><div class="inner"><button class="btn" data-act="case-next">NEXT →</button><button class="icon-tgl" data-act="calc" aria-label="Calculator">🖩</button></div></div>`, "#/practice", {noTab:true});
  const mount = document.getElementById("qmount");
  try {
    mount.appendChild(NC.renderStem(it, false));
    const state = { get ans(){return caseCtx.ans;}, set(v){caseCtx.ans=v;} };
    NC.render.refresh = ()=>{ mount.querySelectorAll(".qbox").forEach(x=>x.remove()); mount.appendChild(NC.renderItem(it, state, {})); wire(mount); };
    NC.render.refresh();
  } catch(err) {
    console.error("Error rendering standalone case item:", err);
    caseCtx.i++;
    if (caseCtx.i >= c.items.length) { caseCtx.finished = true; return caseResults(c.id); }
    return renderItemInCase(c);
  }
  NC.actions["exh"] = (d,elm)=>exhibitSheet(reveals[+d.i]);
  NC.actions["case-next"] = async (d,elm)=>{
    if (caseCtx.ans==null && !confirm("Skip without answering?")) return;
    const timeMs = Date.now()-caseCtx.startTs;
    if (elm){ elm.disabled=true; elm.dataset.actText = elm.textContent; elm.textContent="Saving…"; }
    try{
      if (NC.api && NC.api.remote){
        const res = await NC.api.submitAnswer("case:"+c.id, c.id+"-"+it.step, caseCtx.ans, timeMs, false);
        NC.applyScore("case:"+c.id+":"+Date.now(), c.id+"-"+it.step, caseCtx.ans, res, timeMs, false);
      } else {
        NC.recordAnswer("case:"+c.id+":"+Date.now(), c.id+"-"+it.step, caseCtx.ans, timeMs, false);
      }
      if (NC.api && NC.api.account && NC.api.track) {
        NC.api.track(NC.trackPayload()).catch(()=>{});
      }
    }catch(e){
      if (e.status == null && NC.api.queueAnswer({sid:"case:"+c.id, qid:c.id+"-"+it.step, ans:caseCtx.ans, timeMs, timed:false})){
        NC.applyScore("case:"+c.id+":"+Date.now(), c.id+"-"+it.step, caseCtx.ans, {score:0, answered:false}, timeMs, false);
        NC.ui.toast("Offline — answer queued, will score when back online");
      } else {
        NC.ui.toast("Connection problem — answer not recorded");
        if(elm){elm.disabled=false; elm.textContent="NEXT →";}
        return;
      }
    }
    caseCtx.i++; caseCtx.ans=null; caseCtx.startTs=Date.now();
    if (caseCtx.i>=c.items.length){ caseCtx.finished=true; NC.logEvent("case_done",{case:c.id}); return caseResults(c.id); }
    try {
      renderItemInCase(c);
    } catch(err) {
      console.error("Error advancing standalone case:", err);
      caseCtx.finished = true;
      return caseResults(c.id);
    }
  };
}
function exhibitSheet(exh){
  const bg = h(`<div class="sheet-bg"><div class="sheet" role="dialog" aria-label="${esc(exh.name)}"><button class="x icon-tgl" data-act="close-sheet" aria-label="Close">✕</button><h3>${esc(exh.name)}</h3></div></div>`);
  bg.querySelector(".sheet").appendChild(NC.renderExhibit(exh));
  document.body.appendChild(bg);
  bg.onclick = e=>{ if(e.target===bg) bg.remove(); };
  NC.actions["close-sheet"]=()=>bg.remove();
}
function caseResults(cid){
  const c = NC.CASES.find(x=>x.id===cid); if(!c) return go("#/cj");
  const S=NC.load();
  const rows = c.items.map((it,i)=>{
    const r = S.responses.filter(x=>x.qid===c.id+"-"+it.step).slice(-1)[0];
    const score = r? r.score:null;
    const cls = score==null? "part": score===1?"ok": score>0?"part":"bad";
    return `<div class="cj-step-row"><span class="dot ${cls}">${score==null?"–": score===1?"✓": Math.round(score*100)+"%"}</span>
      <span style="flex:1"><b>${esc(NC.TAX.cjNames[it.step] || it.step)}</b><br><span class="hint">${i+1}. ${esc(it.stem.slice(0,70))}…</span></span>
      <button class="btn sm soft" data-act="go" data-to="#/explain/${encodeURIComponent(c.id+"-"+it.step)}">Why</button></div>`;
  }).join("");
  const rs = c.items.map(it=>S.responses.filter(x=>x.qid===c.id+"-"+it.step).slice(-1)[0]).filter(Boolean);
  const pctv = rs.length? Math.round(100*rs.reduce((a,r)=>a+r.score,0)/rs.length):0;
  const stepLabel = c.items.length === 6 ? "Six-step walkthrough" : `${c.items.length}-step walkthrough`;
  screen(`<div class="topbar"><button class="back" data-act="go" data-to="#/cj" aria-label="Back">‹</button><h1>Case Debrief</h1></div>
   <div class="card score-hero"><div class="big" style="color:${pctv>=75?"var(--ok)":pctv>=50?"var(--warn)":"var(--bad)"}">${pctv}%</div>
    <div class="sub">${esc(c.title)} · clinical judgment performance</div></div>
   <div class="card"><h3>${stepLabel}</h3>${rows}</div>
   <div class="card"><h3>How the case unfolded</h3><p style="font-size:13.5px">${esc(c.summary)}</p>
    <p class="hint">Read each “Why” above — the debrief is where clinical judgment is actually built.</p></div>
   <div class="card"><button class="btn soft" data-act="go" data-to="#/cj">Choose another case</button></div>`, "#/practice");
}

/* ================= SIMULATION ================= */
function simHub(){
  const S=NC.load();
  const openSim = S.sims.filter(s=>s.status==="open").slice(-1)[0];
  let openSimBanner = "";
  if (openSim) {
    const exam = (NC.EXAMS && NC.EXAMS[openSim.examId]) || { name: "NCLEX Simulation" };
    const stoppedWhere = simStoppedWhere(openSim);
    const leftMs = openSim.remainingMs || Math.max(0, openSim.endsAt - Date.now());
    openSimBanner = `
      <div class="card resume-sim-card" style="border-left:4px solid var(--teal); background:var(--card); margin-bottom:12px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
          <span class="ico" style="font-size:18px">◷</span>
          <b style="font-size:15px">Simulation in Progress</b>
        </div>
        <p class="hint" style="margin:4px 0 10px">
          You have an unfinished <b>${esc(exam.name)}</b> simulation stopped at <b>${esc(stoppedWhere)}</b> (${fmt(leftMs)} remaining).
        </p>
        <div style="display:flex;gap:8px">
          <button class="btn sm" data-act="sim-resume" data-id="${openSim.id}">Pick up where you stopped →</button>
          <button class="btn sm soft" data-act="sim-abandon" data-id="${openSim.id}">Abandon</button>
        </div>
      </div>`;
  }
  const sims = S.sims.filter(x=>x.status==="done").slice(-6).reverse().map(x=>{
    const lbl = x.outcome==="above"? ["Above readiness threshold","var(--ok)"]: x.outcome==="below"? ["Below readiness threshold","var(--bad)"]:["Borderline","var(--warn)"];
    return `<button class="rev-row" data-act="go" data-to="#/sim/${x.id}">
      <span class="mark" style="color:${lbl[1]}">●</span>
      <span class="meta"><span class="t">${esc(NC.EXAMS[x.examId].name)}</span>
      <span class="s">${new Date(x.finishedTs).toLocaleDateString()} · ${x.administered.filter(a=>a.scored).length} scored items · stopped: ${esc(x.stopReason||"—")}</span></span>
      <span class="arr">›</span></button>`;
  }).join("");
  const cards = Object.entries(NC.EXAMS).map(([id,e])=>`
    <button class="mode" data-act="go" data-to="#/sim/preflight/${id}">
      <span class="ico" aria-hidden="true">◷</span>
      <span style="flex:1"><span class="t">${esc(e.name)}</span>
      <span class="d" style="display:block">${e.minItems===e.maxItems? e.minItems+" items": e.minItems+"–"+e.maxItems+" adaptive items"} · ${e.durationMinutes} min · ${e.caseStudies} case stud${e.caseStudies===1?"y":"ies"} · ${esc(e.version)}</span></span>
      <span class="arr">›</span></button>`).join("");
  screen(`<div class="topbar"><h1>Simulate</h1></div>
   ${openSimBanner}
   <div class="banner info">Exam rules apply: one item at a time, no going back, no feedback until the end. The exam decides when it ends — <b>you won't see “questions remaining.”</b></div>
   ${cards}
   ${sims? `<div class="card"><h3>Simulation history</h3>${sims}</div>`:""}
   <p class="tag-disclaimer">${esc(NC.DISCLAIMER)}</p>`, "#/simulate");
}
function simPreflight(examId){
  const e = NC.EXAMS[examId]; if(!e) return go("#/simulate");
  const rules = [
    `${e.minItems===e.maxItems? e.minItems+" items": "Between "+e.minItems+" and "+e.maxItems+" items — length varies and you will not know when it ends"}`,
    `${e.durationMinutes} minutes total${e.breaks.length? " · optional breaks offered at "+e.breaks.map(b=>Math.round(b.afterMin/60*10)/10+" h").join(" and ")+" (clock keeps running)":""}`,
    "One item at a time — you cannot return to a previous item",
    "No explanations, scores, or feedback during the exam",
    "Calculator available on every item",
    `Includes ${e.caseStudies} unfolding case stud${e.caseStudies===1?"y":"ies"} (${e.caseStudies*6} items)`,
    "Work uninterrupted and treat it like test day"
  ];
  const bp = e.blueprint || Object.fromEntries(NC.TAX.clientNeeds.map(c=>[c.id,c.mid]));
  const nameOf = id => (e.cnNames && e.cnNames[id]) || NC.cn(id).name;
  const bpRows = Object.entries(bp).sort((a,b)=>b[1]-a[1]).map(([id,v])=>`
    <div class="kv"><span>${esc(nameOf(id))}</span><b>${v}%</b></div>`).join("");
  screen(`<div class="topbar"><button class="back" data-act="go" data-to="#/simulate" aria-label="Back">‹</button><h1>Pre-flight</h1></div>
   <div class="card"><h3>${esc(e.name)}</h3><p class="hint">${esc(e.version)}</p>
     <p class="hint" style="margin:8px 0 0">Blueprint percentages below drive the adaptive selection.</p></div>
   <div class="card"><h3>Blueprint</h3>${bpRows}</div>
   <div class="card"><h3>Acknowledge the exam rules</h3>
    ${rules.map((r,i)=>`<div class="checkrow"><input type="checkbox" id="pf${i}" data-act=""><label for="pf${i}">${esc(r)}</label></div>`).join("")}
   </div>
   <div class="card"><button class="btn" id="pf-start" data-act="sim-start" data-exam="${examId}" disabled>Begin simulation →</button>
    <p class="hint" style="margin-top:8px">Requires connectivity. If you close mid-exam, you can resume this session once.</p></div>`, "#/simulate", {noTab:true});
  document.querySelectorAll('.checkrow input').forEach(cb=>cb.onchange=()=>{
    const all=[...document.querySelectorAll('.checkrow input')].every(x=>x.checked);
    document.getElementById("pf-start").disabled = !all;
  });
}
NC.actions["sim-start"] = async (d,elm)=>{
  const existing = NC.load().sims.find(s=>s.examId===d.exam && s.status==="open");
  if (existing) {
    return go("#/sim/run/" + existing.id);
  }
  let sim;
  if (NC.api && NC.api.remote){
    try{
      if(elm){elm.disabled=true; elm.textContent="Preparing…";}
      const r = await NC.api.simStart(d.exam);
      sim = { id:r.simId, examId:d.exam, cfg:NC.EXAMS[d.exam], remote:true,
        status:"open", startedTs:Date.now(), endsAt:Date.now()+NC.EXAMS[d.exam].durationMinutes*60000,
        remainingMs:NC.EXAMS[d.exam].durationMinutes*60000,
        administered:[], counts:{}, theta:0, answeredCount:0, served:0 };
      NC.load().sims.push(sim); NC.save();
    }catch(e){ NC.ui.toast("Could not reach the exam server"); if(elm){elm.disabled=false; elm.textContent="Begin simulation →";} return; }
  } else {
    sim = NC.newSim(d.exam, { avoid:Object.keys(NC.load().seen||{}).slice(-5000) });
  }
  NC.logEvent("sim_started",{exam:d.exam, remote:!!sim.remote});
  go("#/sim/run/"+sim.id);
};

let simCtx = null;
function simRun(simId){
  const sim = NC.getSim(simId); if(!sim) return go("#/simulate");
  if (sim.status!=="open") return simResults(simId);
  if (sim.remainingMs && Date.now() > sim.endsAt){
    sim.endsAt = Date.now() + sim.remainingMs;
    NC.save();
  }
  simCtx = {sim, ans:null, startTs:Date.now(), pretest:false, n:0};
  if (sim.remote) return serveSimRemote(sim);
  serveSim();
}
/* ---- remote (server-authoritative CAT) path ---- */
/* The server lost this sim (restart / wiped store), so the old id can never
   resolve again. Mint a fresh one, carry the local record over, and re-route.
   Counters reset because the server-side exam is starting from scratch — the
   client must not keep a tally the server knows nothing about. */
async function recoverRemoteSim(sim){
  const oldId = sim.id;
  try{
    const r = await NC.api.simStart(sim.examId);
    const mins = (sim.cfg && sim.cfg.durationMinutes) || NC.EXAMS[sim.examId].durationMinutes;
    sim.id = r.simId;
    sim.startedTs = Date.now();
    sim.endsAt = Date.now() + mins*60000;
    sim.remainingMs = mins*60000;
    sim.administered = []; sim.counts = {}; sim.theta = 0;
    sim.answeredCount = 0; sim.served = 0; sim.remoteAnswered = 0;
    sim.currentQid = null; sim.currentCase = null; sim.caseIdx = 0;
    NC.save();
    NC.logEvent("sim_recovered",{exam:sim.examId, oldId, newId:sim.id});
    NC.ui.toast("Your exam session had expired — starting a fresh one…");
    return go("#/sim/run/" + sim.id);
  }catch(_){
    NC.ui.toast("Could not reach the exam server — retrying…");
    setTimeout(()=>{ if(NC.route && location.hash.includes(oldId)) recoverRemoteSim(sim); },3000);
  }
}
async function serveSimRemote(sim){
  let nxt;
  try{ nxt = await NC.api.simNext(sim.id); }
  catch(e){
    /* A 404 here is permanent, not transient: the server answers "unknown sim"
       when NC.getSim finds no record, which happens after a restart because
       data/store.json is gitignored — a redeploy or a fresh workspace starts
       from a blank store while the browser still holds the old simId. Retrying
       the same id loops forever behind a "Connection problem" toast, so mint a
       new sim instead. Anything without a status (offline, DNS) or 5xx really
       is transient and is still retried. */
    if (e && e.status === 404) return recoverRemoteSim(sim);
    NC.ui.toast("Connection problem — retrying…");
    setTimeout(()=>{ if(NC.route && location.hash.includes(sim.id)) serveSimRemote(sim); },1500);
    return;
  }
  if (nxt.kind==="done") return finishRemoteSim(sim, nxt);
  if (nxt.kind==="case"){
    if (!nxt.case || !Array.isArray(nxt.case.items) || !nxt.case.items.length) {
      console.warn("Invalid/empty case study received, skipping to keep progressing:", nxt);
      return serveSimRemote(sim);
    }
    sim.currentCase = nxt.case.id;
    sim.caseIdx = nxt.resumeAt || 0;
    sim.currentQid = null;
    sim.remainingMs = Math.max(0, sim.endsAt - Date.now());
    NC.save();
    try {
      return renderSimCaseRemote(sim, nxt.case, nxt.resumeAt||0);
    } catch(err) {
      console.error("Error in renderSimCaseRemote, progressing simulation:", err);
      NC.ui.toast("Case study error — advancing exam…");
      return serveSimRemote(sim);
    }
  }
  const item = NC.item(nxt.item && nxt.item.id) || (nxt && nxt.item);
  if (!item) {
    console.warn("Invalid/empty item in serveSimRemote, advancing:", nxt);
    return serveSimRemote(sim);
  }
  NC.markSeen(item.id);
  sim.currentQid = item.id;
  sim.currentCase = null;
  sim.remainingMs = Math.max(0, sim.endsAt - Date.now());
  NC.save();
  simCtx = {sim, item, ans:null, startTs:Date.now(), pretest:!!nxt.pretest, n:nxt.n||1};
  const left = sim.endsAt - Date.now();
  screen(`
   <div class="run-head">
     <div class="r1"><b>${esc(NC.EXAMS[sim.examId].name.split("(")[0].trim())}</b>
       <span>Item ${simCtx.n}</span>
       <span class="timer" id="tm" role="timer">${fmt(left)}</span>
       <button class="icon-tgl" data-act="calc" aria-label="Calculator">🖩</button></div>
     <div class="progress-hairline"><i style="width:${Math.min(100, 100*(sim.served||0)/sim.cfg.maxItems)}%;opacity:.35"></i></div>
   </div>
   <div id="qmount"></div>
   <div class="actionbar"><div class="inner"><button class="btn" data-act="sim-next">NEXT →</button></div></div>`, "#/simulate", {noTab:true});
  const mount=document.getElementById("qmount");
  try {
    mount.appendChild(NC.renderStem(item, false));
    const state={ get ans(){return simCtx.ans;}, set(v){simCtx.ans=v;} };
    NC.render.refresh=()=>{ mount.querySelectorAll(".qbox").forEach(x=>x.remove()); mount.appendChild(NC.renderItem(item,state,{})); wire(mount); };
    NC.render.refresh();
  } catch(renderErr) {
    console.error("Error rendering item stem/body:", renderErr);
    NC.ui.toast("Item display issue — advancing…");
    return serveSimRemote(sim);
  }
  startSimClock(sim);
}
async function finishRemoteSim(sim, done){
  clearInterval(tick);
  let r;
  try{
    r = await NC.api.simResult(sim.id);
  } catch(e){
    console.warn("Could not fetch remote sim result, falling back to local progress:", e);
    r = {
      outcome: (done && done.outcome) || "borderline",
      stopReason: (done && done.stopReason) || "done",
      theta: sim.theta || 0,
      answeredCount: sim.remoteAnswered || (sim.administered||[]).filter(x=>x.scored).length,
      counts: sim.counts || {},
      administered: sim.administered || [],
      finishedTs: Date.now()
    };
  }
  const S = NC.load();
  (r.administered||[]).forEach(a=>{
    if (a.scored && a.answered){
      NC.applyScore("sim:"+sim.id, a.qid, null, {score:a.score, answered:true}, a.timeMs||0, true);
    }
  });
  Object.assign(sim, { status:"done", outcome:r.outcome, stopReason:r.stopReason, theta:r.theta,
    answeredCount:r.answeredCount, counts:r.counts||{}, administered:r.administered||[],
    finishedTs:r.finishedTs||Date.now() });
  NC.save();
  if (NC.api && NC.api.account && NC.api.track) {
    NC.api.track(NC.trackPayload()).catch(()=>{});
  }
  NC.logEvent("sim_done",{exam:sim.examId, outcome:r.outcome, items:r.answeredCount});
  go("#/sim/"+sim.id+"/results");
}
let simCaseCtxR = null;
function renderSimCaseRemote(sim, c, startAt){
  if (!c || !c.items || !c.items.length) {
    simCaseCtxR = null;
    sim.currentCase = null;
    sim.caseIdx = 0;
    NC.save();
    return serveSimRemote(sim);
  }
  if (!simCaseCtxR || simCaseCtxR.cid!==c.id) {
    simCaseCtxR={cid:c.id, i:startAt||0, ans:null, startTs:Date.now()};
  } else if (startAt != null && simCaseCtxR.i !== startAt) {
    simCaseCtxR.i = startAt;
  }
  if (simCaseCtxR.i >= c.items.length) {
    simCaseCtxR = null;
    sim.currentCase = null;
    sim.caseIdx = 0;
    NC.save();
    return serveSimRemote(sim);
  }
  const it=c.items[simCaseCtxR.i];
  if (!it) {
    simCaseCtxR = null;
    sim.currentCase = null;
    sim.caseIdx = 0;
    NC.save();
    return serveSimRemote(sim);
  }
  const reveals=(Array.isArray(it.reveal) ? it.reveal : [])
    .map(k=>(c.exhibits && c.exhibits[k]) || {name:k, type:"text", body:""})
    .filter(Boolean);
  const left=sim.endsAt-Date.now();
  screen(`
   <div class="run-head"><div class="r1"><b>Case Study</b><span>item ${(sim.served||0)+1}</span>
     <span class="timer" id="tm" role="timer">${fmt(left)}</span><button class="icon-tgl" data-act="calc" aria-label="Calculator">🖩</button></div>
   </div>
   <div class="card" style="padding:10px 12px"><b style="font-size:13.5px">${esc(c.title.split("—")[0])}</b>
    <div class="hint">${esc(c.setting)} · review the exhibits before answering</div></div>
   <div class="exhibit-bar">${reveals.map((e,i)=>`<button data-act="exh" data-i="${i}">${esc(e.name)} ▾</button>`).join("")}</div>
   <div id="qmount"></div>
   <div class="actionbar"><div class="inner"><button class="btn" data-act="sim-case-next">NEXT →</button></div></div>`, "#/simulate", {noTab:true});
  const mount=document.getElementById("qmount");
  try {
    mount.appendChild(NC.renderStem(it,false));
    const state={ get ans(){return simCaseCtxR.ans;}, set(v){simCaseCtxR.ans=v;} };
    NC.render.refresh=()=>{ mount.querySelectorAll(".qbox").forEach(x=>x.remove()); mount.appendChild(NC.renderItem(it,state,{})); wire(mount); };
    NC.render.refresh();
  } catch(renderErr) {
    console.error("Failed to render case item stem/item:", renderErr);
    NC.ui.toast("Item render issue — progressing…");
    simCaseCtxR.i++;
    if (simCaseCtxR.i >= c.items.length) {
      simCaseCtxR = null;
      sim.currentCase = null;
      sim.caseIdx = 0;
      NC.save();
      return serveSimRemote(sim);
    }
    return renderSimCaseRemote(sim, c, simCaseCtxR.i);
  }
  NC.actions["exh"]=(d)=>exhibitSheet(reveals[+d.i]);
  NC.actions["sim-case-next"]=async (d,elm)=>{
    if (simCaseCtxR.ans==null && !confirm("You must answer to continue. (No answer = scored incorrect.)")) return;
    if(elm){elm.disabled=true; elm.dataset.actText = elm.textContent; elm.textContent="…";}
    const timeMs = Date.now()-simCaseCtxR.startTs;
    const currentAns = simCaseCtxR.ans;
    const step = it.step;
    const qid = c.id+"-"+step;
    try{ await NC.api.simCaseAnswer(sim.id, c.id, step, currentAns, timeMs); }
    catch(e){ NC.ui.toast("Connection problem — retry"); if(elm){elm.disabled=false; elm.textContent="NEXT →";} return; }

    // Save progress in real time
    sim.served=(sim.served||0)+1;
    sim.remoteAnswered=(sim.remoteAnswered||0)+1;
    sim.administered = sim.administered || [];
    const itemB = (it && typeof it.b === "number") ? it.b : (typeof c.b === "number") ? c.b : (NC.diffB ? NC.diffB(it) : 0);
    sim.administered.push({
      qid,
      b: itemB,
      pretest: false,
      scored: true,
      cn: c.cn,
      t: it.t,
      ans: currentAns,
      answered: currentAns != null,
      timeMs,
      done: true,
      caseId: c.id
    });
    NC.applyScore("sim:"+sim.id, qid, currentAns, {score:0, answered:currentAns!=null}, timeMs, true);

    simCaseCtxR.ans=null; simCaseCtxR.startTs=Date.now(); simCaseCtxR.i++;

    if (simCaseCtxR.i >= c.items.length){
      sim.currentCase = null;
      sim.caseIdx = 0;
    } else {
      sim.currentCase = c.id;
      sim.caseIdx = simCaseCtxR.i;
    }
    NC.save();

    if (NC.api && NC.api.account && NC.api.track) {
      NC.api.track(NC.trackPayload()).catch(()=>{});
    }

    try {
      if (simCaseCtxR.i>=c.items.length){ simCaseCtxR=null; return serveSimRemote(sim); }
      renderSimCaseRemote(sim, c, simCaseCtxR.i);
    } catch(err) {
      console.error("Error advancing case item, progressing simulation:", err);
      simCaseCtxR = null;
      sim.currentCase = null;
      sim.caseIdx = 0;
      NC.save();
      if (elm) { elm.disabled = false; elm.textContent = "NEXT →"; }
      return serveSimRemote(sim);
    }
  };
  startSimClock(sim);
}
function serveSim(){
  const sim = simCtx.sim;
  const nxt = NC.simNext(sim, { avoid:Object.keys(NC.load().seen||{}).slice(-5000) });
  if (nxt.kind==="done"){ return simResults(sim.id); }
  if (nxt.kind==="case"){
    if (!nxt.case || !Array.isArray(nxt.case.items) || !nxt.case.items.length) {
      sim.currentCase = null; sim.casesDone = (sim.casesDone||0)+1; NC.save();
      return serveSim();
    }
    sim.currentCase = nxt.case.id;
    sim.caseIdx = nxt.resumeAt || 0;
    sim.currentQid = null;
    sim.remainingMs = Math.max(0, sim.endsAt - Date.now());
    NC.save();
    try {
      return renderSimCase(nxt.case, nxt.resumeAt||0);
    } catch(err) {
      console.error("Error in renderSimCase, progressing:", err);
      sim.currentCase = null; sim.casesDone = (sim.casesDone||0)+1; NC.save();
      return serveSim();
    }
  }
  // item
  const item = nxt.item;
  if (!item) {
    console.warn("Invalid item in serveSim, advancing");
    return serveSim();
  }
  sim.currentQid = item.id;
  sim.currentCase = null;
  sim.remainingMs = Math.max(0, sim.endsAt - Date.now());
  NC.save();
  simCtx = {sim, item, ans:null, startTs:Date.now(), pretest:!!nxt.pretest, n:nxt.n||1};
  NC.markSeen(item.id);
  const total = sim.cfg.maxItems;
  const left = sim.endsAt - Date.now();
  screen(`
   <div class="run-head">
     <div class="r1"><b>${esc(NC.EXAMS[sim.examId].name.split("(")[0].trim())}</b>
       <span>Item ${simCtx.n}</span>
       <span class="timer" id="tm" role="timer">${fmt(left)}</span>
       <button class="icon-tgl" data-act="calc" aria-label="Calculator">🖩</button></div>
     <div class="progress-hairline"><i style="width:${Math.min(100, 100*sim.administered.length/total)}%;opacity:.35"></i></div>
   </div>
   <div id="qmount"></div>
   <div class="actionbar"><div class="inner"><button class="btn" data-act="sim-next">NEXT →</button></div></div>`, "#/simulate", {noTab:true});
  const mount=document.getElementById("qmount");
  try {
    mount.appendChild(NC.renderStem(item, false));
    const state={ get ans(){return simCtx.ans;}, set(v){simCtx.ans=v;} };
    NC.render.refresh=()=>{ mount.querySelectorAll(".qbox").forEach(x=>x.remove()); mount.appendChild(NC.renderItem(item,state,{})); wire(mount); };
    NC.render.refresh();
  } catch(renderErr) {
    console.error("Failed to render item in serveSim, advancing:", renderErr);
    return serveSim();
  }
  startSimClock(sim);
}
function startSimClock(sim){
  if (tick) clearInterval(tick);
  tick = setInterval(()=>{
    const elx=document.getElementById("tm"); if(!elx) return clearInterval(tick);
    const rem = sim.endsAt-Date.now();
    sim.remainingMs = Math.max(0, rem);
    elx.textContent = fmt(rem);
    if (rem<15*60000) elx.classList.add("warn");
    if (rem<=0){ clearInterval(tick); NC.simFinish(sim,"time"); NC.ui.toast("Time expired — scoring your exam"); go("#/sim/"+sim.id+"/results"); }
  },500);
}
NC.actions["sim-next"] = async (d,elm)=>{
  const sim=simCtx.sim, item=simCtx.item;
  if (simCtx.ans==null){
    if (!confirm("You must answer to continue. (No answer = scored incorrect.)")) return;
  }
  const answeredCount = sim.remote ? (sim.remoteAnswered||0) : sim.administered.filter(x=>x.scored).length;
  if (answeredCount<2 && !confirm("Once you advance, you cannot return to this item. Continue?")) return;
  const timeMs=Date.now()-simCtx.startTs;
  if (sim.remote){
    if(elm){elm.disabled=true; elm.dataset.actText = elm.textContent; elm.textContent="…";}
    try{ await NC.api.simAnswer(sim.id, item.id, simCtx.ans, timeMs); }
    catch(e){ NC.ui.toast("Connection problem — retry"); if(elm){elm.disabled=false; elm.textContent="NEXT →";} return; }
    sim.remoteAnswered=(sim.remoteAnswered||0)+1;
    sim.served=(sim.served||0)+1;
    sim.administered = sim.administered || [];
    sim.administered.push({
      qid: item.id,
      b: NC.diffB(item),
      pretest: !!simCtx.pretest,
      scored: !simCtx.pretest,
      cn: item.cn,
      t: item.t,
      ans: simCtx.ans,
      answered: simCtx.ans != null,
      timeMs,
      done: true
    });
    NC.applyScore("sim:"+sim.id, item.id, simCtx.ans, {score:0, answered:simCtx.ans!=null}, timeMs, true);
    sim.currentQid=null;
    NC.save();
    if (NC.api && NC.api.account && NC.api.track) {
      NC.api.track(NC.trackPayload()).catch(()=>{});
    }
    try {
      return serveSimRemote(sim);
    } catch(err) {
      console.error("Error serving next remote sim item:", err);
      if (elm){ elm.disabled = false; elm.textContent = "NEXT →"; }
      return serveSimRemote(sim);
    }
  }
  NC.simAnswer(sim, item, simCtx.ans, timeMs);
  sim.currentQid=null; NC.save();
  if (NC.api && NC.api.account && NC.api.track) {
    NC.api.track(NC.trackPayload()).catch(()=>{});
  }
  serveSim();
};
/* case inside simulation */
let simCaseCtx=null;
function renderSimCase(c, startAt){
  const sim=simCtx.sim;
  if (!c || !c.items || !c.items.length){
    simCaseCtx = null; sim.currentCase = null; sim.casesDone = (sim.casesDone||0)+1; NC.save();
    return serveSim();
  }
  if (!simCaseCtx || simCaseCtx.cid!==c.id) {
    simCaseCtx={cid:c.id, i:startAt||0, ans:null, startTs:Date.now()};
  } else if (startAt != null && simCaseCtx.i !== startAt) {
    simCaseCtx.i = startAt;
  }
  if (simCaseCtx.i >= c.items.length){
    simCaseCtx = null; sim.currentCase = null; sim.currentQid = null; NC.save();
    return serveSim();
  }
  const it=c.items[simCaseCtx.i];
  if (!it){
    simCaseCtx = null; sim.currentCase = null; sim.currentQid = null; NC.save();
    return serveSim();
  }
  const reveals=(Array.isArray(it.reveal) ? it.reveal : [])
    .map(k=>(c.exhibits && c.exhibits[k]) || {name:k, type:"text", body:""})
    .filter(Boolean);
  sim.currentCase = c.id;
  sim.caseIdx = simCaseCtx.i;
  sim.currentQid = null;
  sim.remainingMs = Math.max(0, sim.endsAt - Date.now());
  NC.save();
  const left=sim.endsAt-Date.now();
  screen(`
   <div class="run-head"><div class="r1"><b>Case Study</b><span>item ${sim.administered.filter(x=>x.scored).length+1}</span>
     <span class="timer" id="tm" role="timer">${fmt(left)}</span><button class="icon-tgl" data-act="calc" aria-label="Calculator">🖩</button></div>
   </div>
   <div class="card" style="padding:10px 12px"><b style="font-size:13.5px">${esc(c.title.split("—")[0])}</b>
    <div class="hint">${esc(c.setting)} · review the exhibits before answering</div></div>
   <div class="exhibit-bar">${reveals.map((e,i)=>`<button data-act="exh" data-i="${i}">${esc(e.name)} ▾</button>`).join("")}</div>
   <div id="qmount"></div>
   <div class="actionbar"><div class="inner"><button class="btn" data-act="sim-case-next">NEXT →</button></div></div>`, "#/simulate", {noTab:true});
  const mount=document.getElementById("qmount");
  try {
    mount.appendChild(NC.renderStem(it,false));
    const state={ get ans(){return simCaseCtx.ans;}, set(v){simCaseCtx.v=v; simCaseCtx.ans=v;} };
    NC.render.refresh=()=>{ mount.querySelectorAll(".qbox").forEach(x=>x.remove()); mount.appendChild(NC.renderItem(it,state,{})); wire(mount); };
    NC.render.refresh();
  } catch(renderErr) {
    console.error("Failed to render local case item:", renderErr);
    simCaseCtx.i++;
    if (simCaseCtx.i >= c.items.length){
      simCaseCtx = null; sim.currentCase = null; sim.currentQid = null; NC.save();
      return serveSim();
    }
    return renderSimCase(c, simCaseCtx.i);
  }
  NC.actions["exh"]=(d)=>exhibitSheet(reveals[+d.i]);
  NC.actions["sim-case-next"]=()=>{
    if (simCaseCtx.ans==null && !confirm("You must answer to continue. (No answer = scored incorrect.)")) return;
    try {
      NC.simCaseItemAnswered(sim, c, it.step, simCaseCtx.ans, Date.now()-simCaseCtx.startTs);
      if (NC.api && NC.api.account && NC.api.track) {
        NC.api.track(NC.trackPayload()).catch(()=>{});
      }
      simCaseCtx.ans=null; simCaseCtx.startTs=Date.now(); simCaseCtx.i++;
      if (simCaseCtx.i>=c.items.length){
        simCaseCtx=null; sim.currentCase = null; sim.caseIdx = 0; sim.currentQid=null;
      } else {
        sim.currentCase = c.id; sim.caseIdx = simCaseCtx.i;
      }
      sim.remainingMs = Math.max(0, sim.endsAt - Date.now());
      NC.save();
      if (simCaseCtx==null) return serveSim();
      renderSimCase(c, simCaseCtx.i);
    } catch(err) {
      console.error("Error in local sim case progression:", err);
      simCaseCtx = null; sim.currentCase = null; sim.currentQid = null; NC.save();
      return serveSim();
    }
  };
  startSimClock(sim);
}
function simResults(simId){
  const sim=NC.getSim(simId); if(!sim) return go("#/simulate");
  const S=NC.load();
  const rs=S.responses.filter(r=>r.sid==="sim:"+sim.id && r.answered);
  const scoredAdmin=sim.administered.filter(x=>x.scored);
  const outcome=sim.outcome;
  const pill = outcome==="above"? `<span class="verdict-pill above">Above readiness threshold</span>`: outcome==="below"? `<span class="verdict-pill below">Below readiness threshold</span>`: `<span class="verdict-pill border">Borderline — indistinguishable from the passing standard at this length</span>`;
  const reason = {["confidence-above"]:"95% confidence above the standard — stopped early",["confidence-below"]:"95% confidence below the standard — stopped early",max:"Maximum items reached",time:"Time expired",
    pool:"Item pool exhausted — the exam stopped rather than repeat a question you had already answered"}[sim.stopReason]||sim.stopReason;
  const se=NC.seAbility(sim.theta, scoredAdmin);
  const thetaPos = Math.max(0,Math.min(100, ((sim.theta+2.5)/5)*100));
  const cutPos = ((sim.cfg.cut+2.5)/5)*100;
  const st=NC.stats();
  const cnRows = NC.TAX.clientNeeds.map(cn=>{
    const got=(sim.counts[cn.id]||0);
    return {name:cn.name, n:got, target:cn.mid, id:cn.id};
  });
  const cjRows = st.byCj.map(x=>x.n? statRow(NC.TAX.cjNames[x.id], x.pct, x.n):"").join("");
  const times = rs.map(r=>r.timeMs/1000);
  const avg = times.length? Math.round(times.reduce((a,b)=>a+b,0)/times.length):0;
  const pace = times.map(t=>Math.min(100, Math.round(t/3)));
  const weak = NC.weakAreas(3,3);
  const per = rs.length? Math.round(100*rs.reduce((a,r)=>a+r.score,0)/rs.length):0;
  screen(`<div class="topbar"><button class="back" data-act="go" data-to="#/simulate" aria-label="Back">‹</button><h1>Simulation Complete</h1></div>
   <div class="card score-hero">${pill}
    <div class="sub" style="margin-top:8px">Scored items: ${scoredAdmin.length} · stop reason: ${esc(reason)}<br>
    Item credit: ${per}% (partial-credit average)</div></div>
   <div class="card"><h3>Estimated ability vs standard</h3>
    <div style="position:relative;height:26px;background:linear-gradient(90deg,var(--bad-l),var(--warn-l),var(--ok-l));border-radius:99px;margin:18px 0 6px">
      <div style="position:absolute;left:${cutPos}%;top:-6px;bottom:-6px;width:3px;background:var(--ink);border-radius:2px" title="Passing standard"></div>
      <div style="position:absolute;left:calc(${thetaPos}% - 26px);top:-8px;width:52px;text-align:center;font-weight:800">θ</div>
    </div>
    <div class="hint">θ = ${sim.theta.toFixed(2)} ± ${se.toFixed(2)} · your estimate sits ${sim.theta>sim.cfg.cut?"above":"below"} the standard. ${esc(NC.DISCLAIMER)}</div></div>
   <div class="card"><h3>Content coverage (items served)</h3>
    ${cnRows.map(c=>`<div class="statline"><span class="lbl" style="width:170px">${esc(c.name)}</span>${bar(Math.round(100*Math.min(1,c.n/Math.max(4,c.target*scoredAdmin.length/100))))}<span class="pct">${c.n}</span></div>`).join("")}
   </div>
   <div class="card"><h3>Timing & stamina</h3>
    <div class="kv"><span>Average per item</span><b>${avg}s</b></div>
    <div class="kv"><span>Items answered</span><b>${rs.length}</b></div>
    <div class="kv"><span>Total time used</span><b>${fmt(sim.finishedTs-sim.startedTs)}</b></div>
    <div class="pace-curve" aria-hidden="true">${pace.map(p=>`<i style="height:${p}%"></i>`).join("")}</div>
    <div class="hint">Pace curve: seconds per item across the exam (taller = slower).</div></div>
   ${cjRows? `<div class="card"><h3>Clinical judgment</h3>${cjRows}</div>`:""}
   ${weak.length? `<div class="card"><h3>Recommended next steps</h3>
     ${weak.map(w=>`<div class="task"><span class="num">!</span><div style="flex:1"><div class="t">${esc(w.name)}</div><div class="why">${w.kind} · ${w.pct}% mastery</div></div>
       <button class="btn sm soft" data-act="drill" data-cn="${w.kind==="Client Need"?w.id:""}" data-sys="${w.kind==="Body System"?w.id:""}">Drill</button></div>`).join("")}
     <div class="task"><span class="num">◷</span><div style="flex:1"><div class="t">1 clinical judgment case</div><div class="why">Case-study practice</div></div><button class="btn sm soft" data-act="go" data-to="#/cj">Go</button></div></div>`:""}
   <p class="tag-disclaimer">${esc(NC.DISCLAIMER)}</p>`, "#/simulate");
  NC.actions["drill"]=(d)=>{
    const filters = d.cn? {cn:[d.cn]} : d.sys? {sys:[d.sys]} : {};
    const n=NC.countFor({...filters, excludeSeen:false});
    if(!n) return NC.ui.toast("Pool expanding — try Smart Practice");
    const s=NC.newSession({mode:"custom", count:Math.min(20,n), filters:{...filters, excludeSeen:true}});
    go("#/session/"+s.id);
  };
}

/* ================= STUDY ================= */
function studyHub(){
  const S=NC.load();
  const missed=[...new Set(S.responses.filter(r=>r.score<1).map(r=>r.qid))];
  const srs=NC.srsCounts();
  const rows=[
    ["#/plan","▦","Study Plan","Adaptive weeks to your exam date",""],
    ["#/weak","⚠","Weak Areas","Auto-detected from performance", NC.weakAreas(3,1).map(w=>esc(w.name)).join(" · ")],
    ["#/spaced","⟳","Spaced Review", srs.total? `${srs.due} due now · ${srs.total} concepts in rotation` : "Concepts you miss auto-schedule here", srs.due? String(srs.due)+" due":""],
    ["#/incorrect","✗","Review Incorrect", missed.length+" items answered incorrectly",""],
    ["#/bookmarks","☆","Bookmarks", S.bookmarks.length+" saved items",""],
    ["#/later","⚑","Review Later", S.reviewLater.length+" flagged items",""]
  ].map(r=>`<button class="mode" data-act="go" data-to="${r[0]}">
    <span class="ico">${r[1]}</span><span style="flex:1"><span class="t">${r[2]}</span><span class="d" style="display:block">${r[3]}${r[4]?` — <b style="color:var(--warn)">${r[4]}</b>`:""}</span></span><span class="arr">›</span></button>`).join("");
  screen(`<div class="topbar"><h1>Study</h1></div>${rows}`, "#/study");
}
/* spaced repetition queue */
function spacedView(){
  const due = NC.srsDue();
  const counts = NC.srsCounts();
  const rows = due.map(d=>`<div class="task"><span class="num">${d.streak>0? "✓"+d.streak : "•"}</span>
    <div style="flex:1"><div class="t">${esc(d.topic)}</div>
    <div class="why">missed ${d.hits}×${d.pct!=null? " · mastery "+d.pct+"%":""}${d.streak>0? " · held "+d.interval+"d":""}</div></div>
    <button class="btn sm soft" data-act="srs-start" data-topic="${esc(d.topic)}">Check</button></div>`).join("");
  screen(`<div class="topbar"><button class="back" data-act="go" data-to="#/study" aria-label="Back">‹</button><h1>Spaced Review</h1></div>
   <div class="card"><h3>Due now (${due.length})</h3>
    ${due.length? rows : `<div class="empty"><span class="ico">✓</span>Nothing due right now.<br>Concepts you miss are automatically scheduled here.</div>`}
    <p class="hint" style="margin-top:8px">Each check serves 3 fresh items on the concept. Score ≥70% and the interval grows (1 → 3 → 7 → 16 → 35+ days); miss and it resets to tomorrow.</p></div>
   ${counts.total? `<div class="card"><h3>Rotation</h3>
     <div class="kv"><span>Concepts in rotation</span><b>${counts.total}</b></div>
     <div class="kv"><span>Due now</span><b>${counts.due}</b></div>
     <div class="kv"><span>Scheduled (not due)</span><b>${counts.total-counts.due}</b></div></div>`:""}
   <p class="tag-disclaimer">${esc(NC.DISCLAIMER)}</p>`, "#/study");
  NC.actions["srs-start"]=(d)=>{
    const n=NC.countFor({topic:d.topic, excludeSeen:false});
    if(!n) return NC.ui.toast("No items available for this concept yet");
    const s=NC.newSession({mode:"srs", count:Math.min(3,n), filters:{topic:d.topic, excludeSeen:true}});
    s.srsTopic=d.topic; NC.save();
    go("#/session/"+s.id);
  };
}
NC.routeStudyWeak = function(){ // #/weak
  const weak=NC.weakAreas(3,8);
  const html = weak.length? weak.map(w=>`<div class="task"><span class="num" style="background:var(--bad-l);color:var(--bad)">${w.pct}%</span>
    <div style="flex:1"><div class="t">${esc(w.name)}</div><div class="why">${w.kind} · ${w.n} items seen</div></div>
    <button class="btn sm soft" data-act="drill" data-cn="${w.kind==="Client Need"?w.id:""}" data-sys="${w.kind==="Body System"?w.id:""}">Drill</button></div>`).join("")
    : `<div class="empty"><span class="ico">🌱</span>No weak areas detected yet.<br>Answer at least 30 questions.</div>`;
  screen(`<div class="topbar"><button class="back" data-act="go" data-to="#/study" aria-label="Back">‹</button><h1>Weak Areas</h1></div>
   <div class="card"><h3>Ranked by mastery</h3>${html}</div>`, "#/study");
  NC.actions["drill"]=(d)=>{ const filters=d.cn?{cn:[d.cn]}:d.sys?{sys:[d.sys]}:{};
    const n=NC.countFor({...filters,excludeSeen:false});
    if(!n) return NC.ui.toast("Pool expanding — try Smart Practice");
    const s=NC.newSession({mode:"custom",count:Math.min(20,n),filters:{...filters,excludeSeen:true}}); go("#/session/"+s.id); };
};
function studyPlan(){
  const plan=NC.studyPlan();
  const S=NC.load();
  screen(`<div class="topbar"><button class="back" data-act="go" data-to="#/study" aria-label="Back">‹</button><h1>Study Plan</h1></div>
   <div class="card"><p class="hint" style="margin:0 0 8px">${NC.daysToExam()!=null? NC.daysToExam()+" days to exam · ":""}~${S.user.dailyMin||30} min/day · re-plans automatically as performance data accumulates</p>
    ${plan.map(w=>`<div class="week"><span class="wn">W${w.week}</span><div><div class="wt">${esc(w.focus)}</div>
      <div class="wd">Daily set · 1 case study · spaced review</div></div></div>`).join("")}
   </div>`, "#/study");
}
function reviewList(kind){
  const S=NC.load();
  let ids;
  if (kind==="incorrect") ids=[...new Set(S.responses.filter(r=>r.score<1).map(r=>r.qid))].reverse();
  else ids = kind==="bookmarks"? S.bookmarks.slice().reverse() : S.reviewLater.slice().reverse();
  const title = kind==="incorrect"?"Review Incorrect": kind==="bookmarks"?"Bookmarks":"Review Later";
  const list = ids.map(qid=>{ const item=NC.item(qid); if(!item) return "";
    const r=S.responses.filter(x=>x.qid===qid).slice(-1)[0];
    return `<button class="rev-row" data-act="go" data-to="#/explain/${encodeURIComponent(qid)}">
      <span class="mark">${kind==="incorrect"? "✗":"☆"}</span>
      <span class="meta"><span class="t">${esc(item.topic)}</span>
      <span class="s">${esc(NC.cn(item.cn).name)} · ${esc(NC.TAX.qTypes[item.t]?.name||"")} ${r? "· last: "+Math.round(r.score*100)+"%":""}</span></span><span class="arr">›</span></button>`;
  }).join("");
  screen(`<div class="topbar"><button class="back" data-act="go" data-to="#/study" aria-label="Back">‹</button><h1>${title}</h1></div>
   <div class="card">${list || `<div class="empty"><span class="ico">✓</span>Nothing here yet.</div>`}</div>
   ${kind==="incorrect"&&ids.length? `<div class="card"><button class="btn soft" data-act="retest">Re-test these concepts</button></div>`:""}`, "#/study");
  NC.actions["retest"]=()=>{
    const s={ id:"rt"+Date.now().toString(36), mode:"retest", count:ids.length, filters:{}, timed:false, secs:null,
      items:NC.pickItems({ids, excludeSeen:false}, ids.length).map(q=>q.id), idx:0, startedTs:Date.now(), status:"open" };
    NC.load().sessions.push(s); NC.save(); go("#/session/"+s.id);
  };
}

/* ================= PROGRESS ================= */
function progress(){
  const R=NC.readiness();
  const st=NC.stats();
  const S=NC.load();
  const tabs = window.innerWidth<430;
  screen(`<div class="topbar"><h1>Progress</h1></div>
   <div class="card hero-readiness">
     <div class="ring" style="--p:${R.ok?R.score:0}"><b>${R.ok?R.score:"?"}</b></div>
     <div style="flex:1"><h3 style="margin:0 0 4px">NCLEX Readiness</h3>
      <div class="row" style="flex-wrap:wrap;gap:6px">
        <span class="chip">Knows ${R.ok?R.dims.knows:"–"}%</span>
        <span class="chip">Thinks ${R.ok?R.dims.thinks:"–"}%</span>
        <span class="chip">Performs ${R.ok?R.dims.performs:"–"}%</span>
      </div>
      <p class="hint">${R.ok? "": `Answer ${10-S.responses.length} more items to unlock.`}</p>
     </div></div>
   ${R.ok? `<div class="card"><h3>What feeds the score</h3>
     ${R.comps.map(c=>`<div class="statline"><span class="lbl">${esc(c.name)}</span>${bar(Math.round(100*c.v))}<span class="pct">${Math.round(100*c.v)}%</span><span class="n">${Math.round(c.w*100)}%</span></div>`).join("")}
     <p class="hint">Readiness is an app-generated estimate — not an official NCLEX result or prediction.</p></div>`:""}
   <div class="card"><h3>Totals</h3>
     <div class="kv"><span>Questions answered</span><b>${st.totals.answered}</b></div>
     <div class="kv"><span>Correct (strict)</span><b>${st.totals.correct}</b></div>
     <div class="kv"><span>Credit (partial)</span><b>${st.totals.partial}%</b></div>
     <div class="kv"><span>Case studies</span><b>${new Set(S.responses.filter(r=>r.qid.startsWith("CASE-")).map(r=>r.qid.split("-").slice(0,2).join("-"))).size} started</b></div>
     <div class="kv"><span>Simulations</span><b>${S.sims.filter(x=>x.status==="done").length}</b></div>
     <div class="kv"><span>Study streak</span><b>${S.streak.count} days</b></div>
     <div class="kv"><span>Time practiced</span><b>${Math.round(st.totals.timeMs/60000)} min</b></div></div>
   <div class="card"><h3>Client Needs <span class="hint">(blueprint midpoints in gray)</span></h3>
     ${st.byCn.map(x=>statRow(NC.cn(x.id).name, x.pct, x.n)).join("")}</div>
   <div class="card"><h3>Body Systems</h3>
     ${st.bySys.map(x=> x.n? statRow(NC.sysName(x.id), x.pct, x.n):"").join("") || `<div class="empty">No data yet</div>`}</div>
   <div class="card"><h3>Question Types</h3>
     ${st.byType.map(x=> x.n? statRow(NC.TAX.qTypes[x.id]?.name||x.id, x.pct, x.n):"").join("") || `<div class="empty">No data yet</div>`}</div>
   <div class="card"><h3>Clinical Judgment (NCJMM)</h3>
     ${st.byCj.map(x=> x.n? statRow(NC.TAX.cjNames[x.id], x.pct, x.n):"").join("") || `<div class="empty">Complete a case study to populate</div>`}</div>
   <div class="card"><h3>Pacing</h3>
     ${st.byType.map(x=> x.n? `<div class="kv"><span>${esc(NC.TAX.qTypes[x.id]?.name||x.id)}</span><b>~${x.avgTime}s/item</b></div>`:"").join("") || `<div class="empty">No data yet</div>`}</div>
   <p class="tag-disclaimer">${esc(NC.DISCLAIMER)}</p>`, "#/progress");
}

/* ================= SETTINGS ================= */
function settings(){
  const S=NC.load();
  const acct = NC.api.account
    ? `<div class="kv"><span>Signed in</span><b>${esc(NC.api.account.email)}</b></div>
       <div class="row" style="margin-top:10px;gap:8px">
         <button class="btn soft sm" data-act="acct-sync">Sync now</button>
         <button class="btn ghost sm" data-act="acct-logout">Sign out</button></div>`
    : `<div class="field"><label>Email</label><input id="ac-email" type="email" autocomplete="email" placeholder="you@example.com"></div>
       <div class="field"><label>Password (8+ characters)</label><input id="ac-pass" type="password" autocomplete="new-password"></div>
       <div class="row" style="gap:8px">
         <button class="btn soft sm" data-act="acct-signup">Create account</button>
         <button class="btn ghost sm" data-act="acct-login">Sign in</button></div>`;
  screen(`<div class="topbar"><button class="back" data-act="go" data-to="#/home" aria-label="Back">‹</button><h1>Settings</h1></div>
   <div class="card">
    <div class="field"><label>Name</label><input id="st-name" value="${esc(S.user.name||"")}"></div>
    <div class="field"><label>Exam date</label><input id="st-date" type="date" value="${S.user.examDate||""}"></div>
    <div class="field"><label>Daily minutes</label><input id="st-min" type="number" min="10" max="300" step="5" value="${S.user.dailyMin||30}"></div>
    <button class="btn soft" data-act="st-save">Save</button>
   </div>
   <div class="card"><h3>Study reminder</h3>
    <div class="kv"><span>Reminders</span><b>${NC.notify.cfg().on? "On · "+esc(NC.notify.cfg().time) : "Off"}</b></div>
    <div class="row" style="gap:8px;margin-top:10px;align-items:center">
      <input id="st-rem-time" type="time" value="${esc(NC.notify.cfg().time)}" style="flex:0 0 110px" aria-label="Reminder time">
      <button class="btn soft sm" data-act="rem-save">${NC.notify.cfg().on? "Update" : "Turn on"}</button>
      ${NC.notify.cfg().on? '<button class="btn ghost sm" data-act="rem-off">Turn off</button>':""}
      <button class="btn ghost sm" data-act="rem-test">Test</button>
    </div>
    <p class="hint" style="margin-top:8px">${NC.notify.supported
      ? "Browser notification at your daily time while the app is open (installed PWA included). " + (NC.notify.permission==="granted" ? "Permission granted." : NC.notify.permission==="denied" ? "Permission blocked — in-app reminders only." : "You'll be asked for permission.")
      : "Notifications aren't supported here — in-app reminders show while the app is open."}</p></div>
   <div class="card"><h3>Account & sync</h3>
    ${acct}
    <p class="hint" style="margin-top:8px">${NC.api.remote
      ? (NC.api.account ? "Progress syncs to your account after each session and restores on any device when you sign in." : "Create an account to back up progress and restore it on any device. Progress also works fully offline on this device.")
      : "Offline/standalone mode — accounts and sync are available when the app is served by the exam server."}</p></div>
   <div class="card"><h3>Data</h3>
    <div class="kv"><span>Items in local bank</span><b>${NC.BANK.length + NC.CASES.length*6}</b></div>
    <div class="kv"><span>Responses recorded</span><b>${S.responses.length}</b></div>
    <button class="btn danger sm" data-act="st-reset" style="margin-top:10px">Reset all progress</button></div>
   <p class="tag-disclaimer">${esc(NC.DISCLAIMER)}</p>`, "#/home");
  const readCreds = ()=>({ email:(document.getElementById("ac-email")? document.getElementById("ac-email").value:"").trim(),
    pass: document.getElementById("ac-pass")? document.getElementById("ac-pass").value : "" });
  NC.actions["acct-signup"] = async ()=>{
    const c = readCreds();
    if (!c.email || c.pass.length<8) return NC.ui.toast("Enter an email and a password of 8+ characters");
    try{
      const r = await NC.api.signup(c.email, c.pass, S.user.name, NC.trackPayload());
      NC.api.setAuth(r.token, r.account);
      const st = await NC.api.state(); NC.mergeState(st);
      NC.ui.toast("Account created — progress backed up"); settings();
    }catch(e){ NC.ui.toast((e.body&&e.body.error) || "Could not create account"); }
  };
  NC.actions["acct-login"] = async ()=>{
    const c = readCreds();
    if (!c.email || !c.pass) return NC.ui.toast("Enter your email and password");
    try{
      const r = await NC.api.login(c.email, c.pass);
      NC.api.setAuth(r.token, r.account);
      const st = await NC.api.state();
      // Always merge, unconditionally. mergeState is a union (newer wins per
      // sid+qid, exposure counts merged by max), so it never loses local work —
      // and gating it on "remote has more responses" meant a device that had
      // practised offline never received its `seen` history, then re-served
      // every question it had already answered.
      NC.mergeState(st);
      try{ await NC.api.track(NC.trackPayload()); }catch(_){}
      NC.ui.toast("Signed in — progress synced"); settings();
    }catch(e){ NC.ui.toast((e.body&&e.body.error) || "Sign-in failed"); }
  };
  NC.actions["rem-save"] = async ()=>{ const t=document.getElementById("st-rem-time").value||"19:00";
    await NC.notify.enable(t); NC.ui.toast(NC.notify.permission==="denied" ? "Reminder set (in-app while open)" : "Reminder set for "+t); settings(); };
  NC.actions["rem-off"] = ()=>{ NC.notify.disable(); NC.ui.toast("Reminder off"); settings(); };
  NC.actions["rem-test"] = ()=>{ const how=NC.notify.test(); NC.ui.toast(how==="notification"? "Test notification sent":"In-app test reminder shown"); };
  NC.actions["acct-logout"] = async ()=>{ try{ await NC.api.logout(); }catch(e){} NC.api.setAuth(null,null); NC.ui.toast("Signed out"); settings(); };
  NC.actions["acct-sync"] = async ()=>{
    try{ await NC.api.track(NC.trackPayload()); const st = await NC.api.state(); NC.mergeState(st); NC.ui.toast("Synced"); }
    catch(e){ NC.ui.toast("Sync failed — check connection"); }
  };
  NC.actions["st-save"]=()=>{ const Su=NC.load();
    Su.user.name=document.getElementById("st-name").value.trim();
    Su.user.examDate=document.getElementById("st-date").value||null;
    Su.user.dailyMin=+document.getElementById("st-min").value||30;
    NC.save(); NC.ui.toast("Saved"); go("#/home"); };
  NC.actions["st-reset"]=()=>{ if(confirm("Erase ALL progress, history and readiness data?")){ try{localStorage.removeItem("rnready-v1");}catch(e){} location.hash="#/onboard"; location.reload(); } };
}


/* ---------- calculator overlay ---------- */
function calcOverlay(){
  const bg=h(`<div class="sheet-bg" style="z-index:80"><div class="sheet" style="max-width:340px" role="dialog" aria-label="Calculator">
    <div class="calc"><div class="disp" id="cd">0</div>
    <div class="keys">
      ${["C","±","%","÷","7","8","9","×","4","5","6","−","1","2","3","+","0",".","⌫","="].map(k=>
        `<button class="${["÷","×","−","+","="].includes(k)?"op":""} ${k==="="?"eq":""}" data-k="${k}">${k}</button>`).join("")}
    </div></div>
    <button class="btn soft sm" style="margin-top:12px" data-act="close-sheet">Close</button></div></div>`);
  document.body.appendChild(bg);
  bg.onclick=e=>{ if(e.target===bg) bg.remove(); };
  NC.actions["close-sheet"]=()=>bg.remove();
  let curv="0", prev=null, op=null, fresh=true;
  const disp=bg.querySelector("#cd");
  const apply=(a,b,o)=>o==="+"?a+b: o==="−"?a-b: o==="×"?a*b: b===0?NaN:a/b;
  bg.querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>{
    const k=b.dataset.k;
    if(/[0-9]/.test(k)){ curv = fresh||curv==="0"? k : curv+k; fresh=false; }
    else if(k==="."){ if(!curv.includes(".")) curv+="."; }
    else if(k==="C"){ curv="0"; prev=null; op=null; fresh=true; }
    else if(k==="⌫"){ curv=curv.length>1? curv.slice(0,-1):"0"; }
    else if(k==="±"){ curv=String(-parseFloat(curv)); }
    else if(k==="%"){ curv=String(parseFloat(curv)/100); }
    else if(["+","−","×","÷"].includes(k)){ if(op&&prev!=null&&!fresh){ curv=String(apply(parseFloat(prev),parseFloat(curv),op)); } prev=curv; op=k; fresh=true; }
    else if(k==="="){ if(op&&prev!=null){ curv=String(apply(parseFloat(prev),parseFloat(curv),op)); op=null; prev=null; fresh=true; } }
    disp.textContent = (curv.length>12? parseFloat(curv).toPrecision(8).replace(/\.?0+$/,"") : curv) || "0";
  });
}

/* ---------- simulation resume prompt on reopen ---------- */
let resumePromptDismissedFor = null;
function simStoppedWhere(sim){
  if (sim.currentCase) {
    const c = (NC.CASES && NC.CASES.find(x => x.id === sim.currentCase)) || null;
    const stepIdx = (sim.caseIdx || 0) + 1;
    const total = c && c.items ? c.items.length : 6;
    const title = c ? c.title.split("—")[0].trim() : "Case Study";
    return `${title} · Question ${stepIdx} of ${total}`;
  }
  const answered = sim.remote ? (sim.remoteAnswered || 0) : (sim.administered || []).filter(x => x.scored && x.done).length;
  const currentNum = (sim.served || answered) + 1;
  if (sim.currentQid) {
    const it = NC.item(sim.currentQid);
    if (it && it.cn && NC.cn(it.cn)) return `Item ${currentNum} (${NC.cn(it.cn).name})`;
  }
  return `Item ${currentNum}`;
}

function promptResumeSimSheet(sim){
  if (typeof document === "undefined") return;
  if (document.getElementById("sim-resume-prompt")) return;
  const exam = (NC.EXAMS && NC.EXAMS[sim.examId]) || { name: "NCLEX Simulation" };
  const stoppedWhere = simStoppedWhere(sim);
  const leftMs = sim.remainingMs || Math.max(0, sim.endsAt - Date.now());
  const bg = h(`
    <div class="sheet-bg" id="sim-resume-prompt">
      <div class="sheet" role="dialog" aria-label="Resume Simulation">
        <button class="x icon-tgl" data-act="close-resume-prompt" aria-label="Close">✕</button>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
          <span style="font-size:22px">◷</span>
          <h3 style="margin:0;font-size:17px">Resume Your Simulation?</h3>
        </div>
        <p style="margin:8px 0 14px;font-size:14px;color:var(--ink-2);line-height:1.45">
          You have an unfinished <b>${esc(exam.name)}</b> simulation.
          Pick up exactly where you stopped at <b>${esc(stoppedWhere)}</b> (${fmt(leftMs)} remaining).
        </p>
        <div style="display:flex;flex-direction:column;gap:9px">
          <button class="btn" data-act="sim-resume" data-id="${sim.id}">Pick up where I stopped →</button>
          <div style="display:flex;gap:8px">
            <button class="btn soft" style="flex:1" data-act="close-resume-prompt">Later</button>
            <button class="btn soft" style="flex:1" data-act="sim-abandon" data-id="${sim.id}">Abandon Exam</button>
          </div>
        </div>
      </div>
    </div>
  `);
  document.body.appendChild(bg);
  wire(bg);
  bg.onclick = e => { if (e.target === bg) { resumePromptDismissedFor = sim.id; bg.remove(); } };
  NC.actions["close-resume-prompt"] = () => {
    resumePromptDismissedFor = sim.id;
    bg.remove();
  };
}

function checkResumeSimPrompt(){
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const S = NC.load();
  const openSim = S && S.sims && S.sims.find(s => s.status === "open");
  if (!openSim) return;
  if (location.hash && location.hash.includes("/sim/run/" + openSim.id)) return;
  if (resumePromptDismissedFor === openSim.id) return;
  promptResumeSimSheet(openSim);
}

NC.promptResumeSim = promptResumeSimSheet;
NC.checkResumeSimPrompt = checkResumeSimPrompt;
NC.simStoppedWhere = simStoppedWhere;

NC.actions["sim-resume"] = (d) => {
  const prompt = document.getElementById("sim-resume-prompt");
  if (prompt) prompt.remove();
  go("#/sim/run/" + d.id);
};

NC.actions["sim-abandon"] = (d) => {
  const sim = NC.getSim(d.id);
  if (!sim) return;
  if (!confirm("Are you sure you want to abandon this simulation? It will be scored based on items completed so far.")) return;
  if (tick) clearInterval(tick);
  NC.simFinish(sim, "abandon", "below");
  NC.save();
  if (NC.api && NC.api.account && NC.api.track) {
    NC.api.track(NC.trackPayload()).catch(()=>{});
  }
  const prompt = document.getElementById("sim-resume-prompt");
  if (prompt) prompt.remove();
  NC.ui.toast("Exam abandoned and scored");
  go("#/sim/" + sim.id + "/results");
};

/* ---------- resilience net: prevent UI hangs & preserve user progress ---------- */
if (typeof window !== "undefined") {
  const saveOpenSimRemaining = () => {
    try {
      const S = NC.load();
      const openSim = S && S.sims && S.sims.find(s => s.status === "open");
      if (openSim) {
        openSim.remainingMs = Math.max(0, openSim.endsAt - Date.now());
        openSim.lastActiveTs = Date.now();
        NC.save();
      }
    } catch(_) {}
  };
  window.addEventListener("beforeunload", saveOpenSimRemaining);
  window.addEventListener("pagehide", saveOpenSimRemaining);

  window.addEventListener("unhandledrejection", (ev) => {
    console.error("Unhandled rejection caught by resilience net:", ev.reason);
    try { NC.save(); } catch(_) {}
    try {
      document.querySelectorAll("button:disabled").forEach(b => {
        if (b.textContent === "…" || b.textContent === "Saving…") {
          b.disabled = false;
          b.textContent = b.dataset.actText || "NEXT →";
        }
      });
    } catch(_) {}
  });
  window.addEventListener("error", (ev) => {
    console.error("Uncaught runtime error caught by resilience net:", ev.error || ev.message);
    try { NC.save(); } catch(_) {}
    try {
      document.querySelectorAll("button:disabled").forEach(b => {
        if (b.textContent === "…" || b.textContent === "Saving…") {
          b.disabled = false;
          b.textContent = b.dataset.actText || "NEXT →";
        }
      });
    } catch(_) {}
  });
}
})();
