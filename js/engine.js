/* RN Ready — engine: persistence, scoring, adaptive selection, CAT simulation,
   stopping rules, mastery statistics, readiness estimation. Pure logic (no DOM). */
window.NC = window.NC || {};
(function(){
const T = () => NC.TAX;

/* ── persistence (guarded: works even where localStorage is blocked) ── */
const KEY = "rnready-v1";
let mem = null;
NC.load = function(){
  if (mem) return mem;
  try { mem = JSON.parse(localStorage.getItem(KEY) || "null"); } catch(e){ mem = null; }
  if (!mem || mem.v !== 1) mem = null;
  if (!mem) mem = {
    v:1,
    user:{ name:"", examDate:null, level:null, dailyMin:30, onboarded:false, diagDone:false },
    theta:0, thetaN:0,
    sessions:[], responses:[], sims:[],
    bookmarks:[], reviewLater:[],
    streak:{ count:0, last:null },
    daily:{ date:null, tasks:{} },
    seen:{},                 // qid -> times shown
    srs:{},                  // topic -> {interval, ease, due, streak, hits}
    events:[]
  };
  return mem;
};
NC.save = function(){
  try { localStorage.setItem(KEY, JSON.stringify(NC.load())); } catch(e){/* sandboxed */}
};
const S = () => NC.load();

/* ── lookups ── */
NC.item = function(id){
  const q = NC.BANK.find(x=>x.id===id);
  if (q) return q;
  for (const c of NC.CASES){
    const i = c.items.find(x=>c.id+"-"+x.step===id);
    if (i) return { ...i, id, caseId:c.id, cn:c.cn, sys:c.sys, d:c.d, b:c.b, topic:c.title };
  }
  return undefined;
};
NC.allItems = function(){
  const flat = [];
  NC.BANK.forEach(q=>flat.push(q));
  NC.CASES.forEach(c=>c.items.forEach(i=>flat.push({...i, id:c.id+"-"+i.step, caseId:c.id, cn:c.cn, sys:c.sys, d:c.d, b:c.b})));
  return flat;
};
NC.cn = id => T().clientNeeds.find(c=>c.id===id);
NC.sysName = id => (T().systems.find(s=>s.id===id)||{}).name || id;
NC.dName = d => T().difficulty[d].name;
NC.diffB = q => (typeof q.b === "number") ? q.b : T().difficulty[q.d].b;

/* ── scoring: element-wise (polytomous) → fraction 0..1 ── */
const set = a => new Set(Array.isArray(a)?a:[a]);
NC.scoreItem = function(item, ans){
  // ans formats: single:number · multi/emr:number[] (emr: {groupIdx:[idx]}) · drag:number[] (target per opt) · cloze:number[] · hotspot:number[] · matrix:number[] (radio per row) | matrix check: number[][]
  const el = [];           // {ok:bool}
  const push = ok => el.push(!!ok);
  switch(item.t){
    case "single": push(ans === item.ans); break;
    case "multi": item.opts.forEach((_,i)=> push(set(item.ans).has(i) === set(ans).has(i))); break;
    case "emr": item.groups.forEach((g,gi)=>{ const a = (ans&&ans[gi])||[]; g.opts.forEach((_,i)=> push(set(g.ans).has(i) === set(a).has(i))); }); break;
    case "drag": item.drag.opts.forEach((_,i)=> push(ans && ans[i] === item.drag.ans[i])); break;
    case "cloze": item.cloze.lines.forEach((l,i)=> push(ans && ans[i] === l.ans)); break;
    case "hotspot": item.hotspot.rows.forEach((_,i)=> push(set(item.hotspot.ans).has(i) === set(ans||[]).has(i))); break;
    case "matrix":
      if (item.matrix.mode === "check")
        item.matrix.rows.forEach((_,r)=>{ const a = set((ans&&ans[r])||[]); const shouldR = set(item.matrix.ans[r]||[]);
          item.matrix.cols.forEach((__,c)=> push(a.has(c) === shouldR.has(c))); });
      else item.matrix.rows.forEach((_,r)=> push(ans && ans[r] === item.matrix.ans[r]));
      break;
    default: push(false);
  }
  const n = el.length || 1;
  const okc = el.filter(Boolean).length;
  return { score: okc/n, ok: okc, n, answered: ans !== null && ans !== undefined && (Array.isArray(ans) ? ans.length>0 : true) };
};

/* ── ability estimation ──
   v3b: EAP (expected a posteriori) over a 2PL model (a=1) with a wide normal
   prior, computed from the candidate's answered items. The incremental Elo
   updater is retained for compatibility but the engine paths use EAP.       */
NC.probCorrect = function(theta, b){ return 1/(1+Math.exp(-(theta-b))); };
NC.eapTheta = function(items){
  if (!items || !items.length) return 0;
  let best = 0, bestL = -Infinity;
  for (let t=-2.5; t<=2.5001; t+=0.02){
    let l = -(t*t)/(2*1.44); // prior N(0, 1.2²)
    for (const it of items){
      const P = NC.probCorrect(t, it.b);
      l += Math.log(P+1e-9)*(it.score??0) + Math.log(1-P+1e-9)*(1-(it.score??0));
    }
    if (l > bestL){ bestL = l; best = t; }
  }
  return Math.round(best*50)/50; // 0.02 resolution
};
/* incremental (legacy) update — kept for compatibility */
NC.updateTheta = function(theta, b, score, nAnswered){
  const P = NC.probCorrect(theta,b);
  const K = 0.28 + 1.6/(1 + nAnswered/5);
  let t = theta + K*((score??0) - P);
  return Math.max(-2.5, Math.min(2.5, t));
};
/* recompute the global ability estimate from recent responses */
NC.recomputeTheta = function(){
  const st = S();
  const rs = st.responses.filter(r=>r.answered).slice(-300);
  const items = rs.map(r=>{ const q = NC.item(r.qid); return q? {b:NC.diffB(q), score:r.score}:null; }).filter(Boolean);
  if (!items.length) return st.theta;
  st.theta = NC.eapTheta(items);
  st.thetaN = items.length;
  return st.theta;
};
NC.seAbility = function(theta, items){ // items: [{b, score}]
  let info = 0;
  items.forEach(it=>{ const P = NC.probCorrect(theta, it.b); info += P*(1-P); });
  return info > 0.05 ? 1/Math.sqrt(info) : 0.9;
};
const simEAP = sim => NC.eapTheta(sim.administered.filter(x=>x.scored && x.done && x.answered).map(x=>({b:x.b, score:x.score})));

/* ── filtering & selection ── */
NC.filterItems = function(f){
  f = f || {};
  const seen = S().seen;
  return NC.allItems().filter(q=>{
    if (f.cn && f.cn.length && !f.cn.includes(q.cn)) return false;
    if (f.sys && f.sys.length && !f.sys.includes(q.sys)) return false;
    if (f.topic && q.topic !== f.topic) return false;
    if (f.types && f.types.length && !f.types.includes(q.t)) return false;
    if (f.diffs && f.diffs.length && !f.diffs.includes(q.d)) return false;
    if (f.cj && f.cj.length && !(q.cj && f.cj.includes(q.cj))) return false;
    if (f.tags && f.tags.length && !(q.tags||[]).some(t=>f.tags.includes(t))) return false;
    if (f.excludeSeen && seen[q.id]) return false;
    if (f.ids && !f.ids.includes(q.id)) return false;
    if (f.caseOnly && !q.caseId) return false;
    return true;
  });
};
const shuffle = a => { a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };

/* ── variant groups (anti-memorization) ──
   Items sharing a variantGroup are alternates for the SAME clinical concept.
   Rules: (1) never serve two members of one group in the same exam/session;
          (2) when re-testing a concept, rotate to the least-exposed member.   */
const seenCount = qid => (S().seen[qid]||0);
NC.variantGroups = function(){
  const g = {};
  NC.allItems().forEach(q=>{ if (q.variantGroup) (g[q.variantGroup] ||= []).push(q.id); });
  return g;
};
/* within a shuffled pool, order same-group items least-exposed first (stable) */
const freshestFirst = arr => arr.sort((a,b)=>
  (a.variantGroup && a.variantGroup===b.variantGroup) ? seenCount(a.id)-seenCount(b.id) : 0);
NC.pickItems = function(f, count){
  let pool = NC.filterItems(f);
  if (pool.length < count && f.excludeSeen) pool = NC.filterItems({...f, excludeSeen:false});
  const shuffled = freshestFirst(shuffle(pool));
  const out=[], usedG=new Set();
  for (const q of shuffled){
    if (out.length>=count) break;
    if (q.variantGroup && usedG.has(q.variantGroup)) continue;   // one per group — hard rule
    out.push(q); if (q.variantGroup) usedG.add(q.variantGroup);
  }
  return out; // may be < count when the pool cannot supply count without repeating a concept
};
NC.countFor = f => NC.filterItems(f).length;

/* smart practice: weight areas by weakness (client need + difficulty targeting) */
NC.smartPick = function(count){
  const st = NC.stats();
  const byCn = {}; st.byCn.forEach(x=>byCn[x.id]=x);
  const pool = NC.filterItems({excludeSeen:false});
  const weighted = pool.map(q=>{
    const m = byCn[q.cn];
    const weakness = m && m.n >= 3 ? (1 - m.pct/100) : 0.55;      // unknown areas stay attractive
    const theta = S().theta;
    const info = NC.probCorrect(theta, NC.diffB(q));                // target ~50% success
    const w = weakness * (0.5 + info) * Math.random();
    return {q, w};
  }).sort((a,b)=>b.w-a.w);
  const out=[], used=new Set(), usedG=new Set();
  for (const x of weighted){
    if (out.length>=count) break;
    if (used.has(x.q.id)) continue;
    if (x.q.variantGroup){ if (usedG.has(x.q.variantGroup)) continue; usedG.add(x.q.variantGroup); }
    used.add(x.q.id); out.push(x.q);
  }
  return out;
};

/* ── mastery statistics (recency-weighted) ── */
const R_W = r => r.ts > Date.now()-90*864e5 ? 1 : 0.45;
NC.stats = function(){
  const st = S();
  const mk = () => ({w:0, n:0});
  const acc = { byCn:{}, bySys:{}, byType:{}, byCj:{}, byDiff:{}, byTopic:{} };
  const bucket = (store, key, score, w, time)=>{ if(!key) return;
    store[key] = store[key] || {w:0, n:0, time:0, items:0};
    store[key].w += score*w; store[key].n += 1; store[key].time += (time||0); store[key].items += 1; };
  st.responses.forEach(r=>{
    const q = NC.item(r.qid); if (!q) return;
    const w = R_W(r);
    bucket(acc.byCn, q.cn, r.score, w, r.timeMs);
    bucket(acc.bySys, q.sys, r.score, w, r.timeMs);
    bucket(acc.byType, q.t, r.score, w, r.timeMs);
    bucket(acc.byCj, q.cj, r.score, w, r.timeMs);
    bucket(acc.byDiff, q.d, r.score, w, r.timeMs);
    bucket(acc.byTopic, q.topic, r.score, w, r.timeMs);
  });
  const toArr = (store, order) => {
    const out = [];
    (order || Object.keys(store)).forEach(id=>{
      const x = store[id]; if (!x) { out.push({id, pct:null, n:0}); return; }
      out.push({ id, pct: Math.round(100*x.w/x.n), n: x.n, avgTime: x.n? Math.round(x.time/x.n/1000):0 });
    });
    return out;
  };
  return {
    byCn:  toArr(acc.byCn, T().clientNeeds.map(c=>c.id)),
    bySys: toArr(acc.bySys, T().systems.map(c=>c.id)),
    byType:toArr(acc.byType, Object.keys(T().qTypes)),
    byCj:  toArr(acc.byCj, T().cjSteps),
    byDiff:toArr(acc.byDiff, [0,1,2,3]),
    byTopic:toArr(acc.byTopic).sort((a,b)=> (b.n||0)-(a.n||0)),
    totals: NC.totals()
  };
};
NC.totals = function(){
  const rs = S().responses;
  const scored = rs.filter(r=>r.answered);
  return { answered: scored.length, correct: scored.filter(r=>r.score===1).length,
    partial: Math.round(100*scored.reduce((a,r)=>a+r.score,0)/Math.max(1,scored.length)),
    timeMs: rs.reduce((a,r)=>a+(r.timeMs||0),0) };
};
/* weakest areas with enough data */
NC.weakAreas = function(minN=3, max=6){
  const st = NC.stats();
  const cand = [];
  st.byCn.forEach(x=>{ if(x.n>=minN) cand.push({kind:"Client Need", id:x.id, name:NC.cn(x.id).name, pct:x.pct, n:x.n}); });
  st.bySys.forEach(x=>{ if(x.n>=minN) cand.push({kind:"Body System", id:x.id, name:NC.sysName(x.id), pct:x.pct, n:x.n}); });
  st.byTopic.forEach(x=>{ if(x.n>=minN) cand.push({kind:"Topic", id:x.id, name:x.id, pct:x.pct, n:x.n}); });
  return cand.sort((a,b)=>a.pct-b.pct).slice(0,max);
};

/* ── readiness (three dimensions; gated components; clearly labeled estimate) ── */
NC.readiness = function(){
  const st = S(), rs = st.responses.filter(r=>r.answered);
  if (rs.length < 10) return { ok:false, need:rs.length };
  const wacc = rs.map(r=>({s:r.score, w:R_W(r), d:NC.item(r.qid)?.d ?? 1}));
  const recent = wacc.slice(-400);
  const acc = recent.reduce((a,r)=>a+r.s*r.w,0)/recent.reduce((a,r)=>a+r.w,0);
  const cnStats = NC.stats().byCn;
  const cnBalance = cnStats.reduce((a,x)=>a + (x.n? x.pct/100 : 0.45),0)/cnStats.length;
  const cjR = rs.filter(r=>NC.item(r.qid)?.cj);
  const cj = cjR.length ? cjR.reduce((a,r)=>a+r.score*R_W(r),0)/cjR.reduce((a,r)=>a+R_W(r),0) : null;
  const tyStats = NC.stats().byType;
  const types = tyStats.reduce((a,x)=>a + (x.n? x.pct/100:0.5),0)/tyStats.length;
  const timedR = rs.filter(r=>r.timed);
  const timed = timedR.length>=10 ? timedR.reduce((a,r)=>a+r.score,0)/timedR.length : null;
  const lastSim = st.sims.filter(s=>s.status==="done").slice(-1)[0];
  const sim = lastSim ? (lastSim.outcome==="above"?0.9: lastSim.outcome==="below"?0.35:0.6) : null;
  const sessAcc = [];
  const byS = {}; rs.forEach(r=>{ (byS[r.sid]=byS[r.sid]||[]).push(r.score); });
  Object.values(byS).slice(-10).forEach(a=>sessAcc.push(a.reduce((x,y)=>x+y,0)/a.length));
  const mean = sessAcc.reduce((a,b)=>a+b,0)/Math.max(1,sessAcc.length);
  const sd = Math.sqrt(sessAcc.reduce((a,b)=>a+(b-mean)**2,0)/Math.max(1,sessAcc.length));
  const consistency = sessAcc.length>=4 ? Math.max(0, 1 - sd/0.35) : null;
  const comps = [
    {id:"recent", name:"Recent performance (difficulty-weighted)", v:acc, w:0.30},
    {id:"balance",name:"Client Need balance",                     v:cnBalance, w:0.20},
    {id:"cj",     name:"Clinical judgment",                       v:cj, w:0.15, skip:cj===null},
    {id:"types",  name:"Question-format skill",                   v:types, w:0.10},
    {id:"timed",  name:"Timed performance",                       v:timed, w:0.10, skip:timed===null},
    {id:"sim",    name:"Simulation outcome",                      v:sim, w:0.10, skip:sim===null},
    {id:"cons",   name:"Consistency",                             v:consistency, w:0.05, skip:consistency===null}
  ].filter(c=>!c.skip);
  const W = comps.reduce((a,c)=>a+c.w,0);
  const score = Math.round(100*comps.reduce((a,c)=>a+c.v*c.w,0)/W);
  // trend: last 30d vs previous 30d
  const now = Date.now();
  const recent30 = rs.filter(r=>r.ts>now-30*864e5), prior30 = rs.filter(r=>r.ts<=now-30*864e5 && r.ts>now-60*864e5);
  const a30 = recent30.length? recent30.reduce((a,r)=>a+r.score,0)/recent30.length : null;
  const p30 = prior30.length>=10? prior30.reduce((a,r)=>a+r.score,0)/prior30.length : null;
  const knows = cnBalance, thinks = cj==null?knows:cj, performs = ((timed??acc)+(types)+(sim??acc))/3;
  return { ok:true, score:Math.min(99,Math.max(1,score)), comps, trend: (a30!=null&&p30!=null)? (a30-p30) : null,
    dims:{ knows:Math.round(100*knows), thinks:Math.round(100*thinks), performs:Math.round(100*performs) } };
};

/* ── sessions (practice) ── */
NC.newSession = function(cfg){
  const id = "s"+Date.now().toString(36);
  let items;
  if (cfg.mode==="smart") items = NC.smartPick(cfg.count);
  else if (cfg.mode==="diagnostic") items = NC.diagnosticPick(cfg.count||30);
  else items = NC.pickItems(cfg.filters||{}, cfg.count);
  const s = { id, mode:cfg.mode, count:items.length, filters:cfg.filters||{}, timed:!!cfg.timed, secs:cfg.secs||null,
    items:items.map(q=>q.id), idx:0, answers:{}, times:{}, startedTs:Date.now(), status:"open" };
  S().sessions.push(s); NC.save();
  return s;
};
NC.getSession = id => S().sessions.find(x=>x.id===id);

NC.recordAnswer = function(sid, qid, ans, timeMs, timed){
  const item = NC.item(qid); if (!item) return null;
  const res = NC.scoreItem(item, ans);
  NC.applyScore(sid, qid, ans, res, timeMs, timed);
  return res;
};
/* record a (possibly server-computed) score without needing the local answer key */
NC.applyScore = function(sid, qid, ans, res, timeMs, timed){
  const item = NC.item(qid); if (!item) return null;
  const st = S();
  st.responses = st.responses.filter(r=>!(r.sid===sid && r.qid===qid));
  st.responses.push({ qid, sid, mode:st.sessions.find(s=>s.id===sid)?.mode||"practice", ans:JSON.parse(JSON.stringify(ans||null)),
    score:res.score, answered:res.answered, ts:Date.now(), timeMs:timeMs||0, timed:!!timed });
  NC.recomputeTheta();
  NC.touchStreak();
  NC.save();
  return res;
};

/* ── spaced repetition (concept = topic level; SM-2-lite) ── */
NC.srsProcessSession = function(sid){
  const st = S(); st.srs = st.srs || {};
  const rs = st.responses.filter(r=>r.sid===sid && r.answered);
  const byTopic = {};
  rs.forEach(r=>{ const q = NC.item(r.qid); if(!q) return; (byTopic[q.topic]=byTopic[q.topic]||[]).push(r.score); });
  let scheduled = 0;
  Object.entries(byTopic).forEach(([topic,scores])=>{
    if (!scores.some(s=>s<1)) return;                 // only missed concepts enter the queue
    const cur = st.srs[topic];
    st.srs[topic] = { interval:1, ease: cur? Math.max(1.3, cur.ease-0.2) : 2.5,
      due: Date.now()+864e5, streak:0, hits:(cur?.hits||0)+1 };
    scheduled++;
  });
  NC.save();
  return scheduled;
};
NC.srsDue = function(){
  const st = S();
  return Object.entries(st.srs||{})
    .filter(([k,v])=>v.due<=Date.now())
    .map(([k,v])=>({topic:k, ...v, pct: (()=>{ const x=NC.stats().byTopic.find(t=>t.id===k); return x&&x.n? x.pct:null; })()}))
    .sort((a,b)=>a.due-b.due);
};
NC.srsCounts = function(){ const st=S(); return { total:Object.keys(st.srs||{}).length, due:NC.srsDue().length }; };
NC.srsCheck = function(topic, avgScore){
  const st = S(); st.srs = st.srs||{}; const cur = st.srs[topic]; if(!cur) return;
  if (avgScore >= 0.7){
    const iv = Math.min(60, Math.max(1, Math.round(cur.interval*cur.ease)));
    st.srs[topic] = { interval:iv, ease:Math.min(2.8, cur.ease+0.05), due:Date.now()+iv*864e5, streak:cur.streak+1, hits:cur.hits };
  } else {
    st.srs[topic] = { interval:1, ease:Math.max(1.3, cur.ease-0.2), due:Date.now()+864e5, streak:0, hits:cur.hits };
  }
  NC.save();
};

/* ── sync: payload to push, and merge for a server-provided state ── */
NC.trackPayload = function(){
  const st = S();
  return { responses: st.responses.slice(-400), srs: st.srs||{}, theta: st.theta, thetaN: st.thetaN,
    profile:{ name:st.user.name, examDate:st.user.examDate, level:st.user.level, dailyMin:st.user.dailyMin, diagDone:st.user.diagDone } };
};
NC.mergeState = function(remote){
  if (!remote) return;
  const st = S();
  if (Array.isArray(remote.responses)){
    const key = r => r.sid+"|"+r.qid;
    const map = new Map(st.responses.map(r=>[key(r),r]));
    remote.responses.forEach(r=>{ if(!r||!r.qid) return; const k=key(r); const cur=map.get(k);
      if (!cur || (r.ts||0) > (cur.ts||0)) map.set(k,r); });
    st.responses = [...map.values()].sort((a,b)=>(a.ts||0)-(b.ts||0)).slice(-5000);
  }
  if (remote.srs && typeof remote.srs==="object"){
    st.srs = st.srs||{};
    Object.entries(remote.srs).forEach(([t,v])=>{ const cur=st.srs[t];
      if (!cur || (v.due||0) < (cur.due||0) || (v.hits||0) > (cur.hits||0)) st.srs[t]=v; });
  }
  if (typeof remote.theta==="number" && (remote.thetaN||0) > st.thetaN){ st.theta=remote.theta; st.thetaN=remote.thetaN; }
  if (remote.profile){
    ["name","examDate","level","dailyMin","diagDone"].forEach(k=>{ if (remote.profile[k]!=null) st.user[k]=remote.profile[k]; });
  }
  NC.save();
};

/* diagnostic: spread difficulty wide, light blueprint */
NC.diagnosticPick = function(count){
  const pool = NC.filterItems({excludeSeen:false});
  const byD = [[],[],[],[]];
  pool.forEach(q=>byD[q.d].push(q));
  const want = [Math.round(count*.2), Math.round(count*.35), Math.round(count*.3)];
  want[3] = count - want[0]-want[1]-want[2];
  const out=[], usedG=new Set();
  byD.forEach((arr,i)=>{
    let n = Math.max(0,want[i]||0);
    for (const q of freshestFirst(shuffle(arr))){
      if (n<=0) break;
      if (q.variantGroup && usedG.has(q.variantGroup)) continue; // one per group
      out.push(q); if (q.variantGroup) usedG.add(q.variantGroup); n--;
    }
  });
  return shuffle(out).slice(0,count); // one per variant group — hard rule; may return < count
};

/* ── simulation (CAT-style) ── */
/* Pretest slots (by answered-item count) are planned once at sim start and must
   survive persistence: sims are stored as JSON, and a Set stringifies to {}, so
   they live on the sim as a plain array. Sims written before that — or reloaded
   from a store that flattened the Set — are re-planned from cfg by the same
   deterministic formula, so a resumed exam keeps its original slots. */
function planPretestAt(cfg){
  const at = [];
  if (!cfg || !(cfg.pretestItems > 0)) return at;
  const step = Math.max(4, Math.floor(cfg.maxItems/cfg.pretestItems));
  for (let i=step; at.length<cfg.pretestItems && i<cfg.maxItems; i+=step) at.push(i);
  return at;
}
function pretestSlots(sim){
  const at = sim.pretestAt;
  if (Array.isArray(at)) return at;
  if (at && typeof at.has === "function") return (sim.pretestAt = [...at]); // live Set
  return (sim.pretestAt = planPretestAt(sim.cfg || NC.EXAMS[sim.examId]));
}
NC.newSim = function(examId){
  const cfg = NC.EXAMS[examId];
  const st = S();
  const seenPool = NC.allItems();
  // family affinity for case selection, three tiers: family-specific cases first,
  // shared (untagged) cases next, off-family cases only fill any remainder
  const specOf = c => c.fam && cfg.examFamily && c.fam === cfg.examFamily;
  const sharedCase = c => !c.fam || !cfg.examFamily;
  const cases = shuffle(NC.CASES.filter(specOf)).concat(shuffle(NC.CASES.filter(sharedCase)))
                 .concat(shuffle(NC.CASES.filter(c=>!specOf(c) && !sharedCase(c))))
                 .slice(0, cfg.caseStudies);
  // plan case insertion points (by answered-item count)
  const span = Math.floor(cfg.maxItems*0.6);
  const caseSlots = cases.map((_,i)=> Math.max(6, Math.round(span*(i+1)/(cfg.caseStudies+1))));
  const pretestAt = planPretestAt(cfg);
  const sim = { id:"e"+Date.now().toString(36), examId, cfg, theta:0, answeredCount:0,
    administered:[], // {qid, b, pretest, caseId?}
    counts:{}, caseSlots, caseIds:cases.map(c=>c.id), casesDone:0, pretestDone:0, pretestAt,
    startedTs:Date.now(), endsAt:Date.now()+cfg.durationMinutes*60000, status:"open", events:[] };
  st.sims.push(sim); NC.save();
  return sim;
};
NC.getSim = id => S().sims.find(x=>x.id===id);

NC.simNext = function(sim){
  sim.cfg = sim.cfg || (NC.EXAMS && NC.EXAMS[sim.examId]) || (NC.EXAMS && NC.EXAMS["nclex-rn-2026"]);
  // returns {kind:'item', item, pretest} | {kind:'case', case} | {kind:'done', reason, outcome}
  if (sim.status!=="open") return {kind:"done", reason:sim.stopReason, outcome:sim.outcome};
  // resume an item already served but not yet answered (e.g. after reload)
  if (sim.currentQid){
    const pending = sim.administered.find(x=>x.qid===sim.currentQid && !x.done);
    const it = NC.item(sim.currentQid);
    if (it && (!pending || !pending.done)){
      const n = sim.administered.filter(x=>x.scored && x.done).length + (pending && !pending.pretest ? 1 : 0);
      return {kind:"item", item:it, pretest: pending? !!pending.pretest:false, n:Math.max(1,n)};
    }
  }
  if (Date.now() > sim.endsAt) return NC.simFinish(sim, "time");
  const answered = sim.administered.filter(x=>x.scored).length;
  if (answered >= sim.cfg.maxItems) return NC.simFinish(sim, "max");
  // stopping rule: 95% one-sided confidence vs cut, only at/above min scored items
  if (answered >= sim.cfg.minItems){
    const scoredItems = sim.administered.filter(x=>x.scored);
    const se = NC.seAbility(sim.theta, scoredItems);
    if (sim.theta - 1.645*se > sim.cfg.cut) return NC.simFinish(sim, "confidence-above", "above");
    if (sim.theta + 1.645*se < sim.cfg.cut) return NC.simFinish(sim, "confidence-below", "below");
  }
  // case study due? (insert as a block; each case item counted when answered)
  const nextSlot = sim.caseSlots[sim.casesDone];
  if (sim.cfg.caseStudies>0 && nextSlot!=null && answered >= nextSlot && sim.currentCase==null){
    // serve from THIS sim's shuffled selection (legacy sims: round-robin fallback)
    const cid = sim.caseIds ? sim.caseIds[sim.casesDone] : NC.CASES[sim.casesDone % NC.CASES.length].id;
    const c = NC.CASES.find(x=>x.id===cid);
    sim.currentCase = c.id; sim.caseIdx = 0; NC.save();
    return {kind:"case", case:c};
  }
  if (sim.currentCase){ // resume mid-case (after reload)
    return {kind:"case", case:NC.CASES.find(x=>x.id===sim.currentCase), resumeAt:sim.caseIdx};
  }
  // blueprint-constrained adaptive selection
  // variant groups: exclude any group already served in THIS exam (one member per exam)
  const usedGroups = new Set(sim.administered.map(a=>NC.item(a.qid)).filter(q=>q && q.variantGroup).map(q=>q.variantGroup));
  const pool = NC.allItems().filter(q=>!q.caseId && !sim.administered.some(a=>a.qid===q.id)
    && !(q.variantGroup && usedGroups.has(q.variantGroup)));
  const fallback = pool.length ? pool : NC.allItems().filter(q=>!q.caseId); // reuse if exhausted (small pool)
  // blueprint weights: per-exam override (PN plans differ from RN), else taxonomy midpoints
  const bp = sim.cfg.blueprint;
  const mids = bp ? Object.keys(bp).map(id=>({id, mid:bp[id]/100}))
                  : T().clientNeeds.map(c=>({id:c.id, mid:c.mid/100}));
  const total = answered + 4;
  let best=null, bestDef=-1;
  mids.forEach(m=>{
    const cur = (sim.counts[m.id]||0)/Math.max(1,total);
    const def = m.mid - cur + Math.random()*0.04;
    const has = fallback.some(q=>q.cn===m.id);
    if (def > bestDef && has){ bestDef=def; best=m.id; }
  });
  let cands = fallback.filter(q=>q.cn===best);
  if (!cands.length) cands = fallback;
  // family affinity: exams declaring an examFamily prefer items authored for that
  // family whenever a genuine choice exists (untagged items are shared: they match all)
  if (sim.cfg.examFamily){
    const famCands = cands.filter(q=>!q.fam || q.fam===sim.cfg.examFamily);
    if (famCands.length>=2) cands = famCands;
  }
  // randomesque with exposure control: top-5 by |b - theta|, least-exposed first
  cands = cands.map(q=>({q, d:Math.abs(NC.diffB(q)-sim.theta), ex:(S().seen[q.id]||0)}))
              .sort((a,b)=>a.d-b.d).slice(0,5)
              .sort((a,b)=>(a.ex-b.ex)||(a.d-b.d));
  let pick = cands[0].q;
  // anti-memorization rotation: if the chosen item has a same-group sibling in the pool
  // with strictly lower lifetime exposure, serve the fresher one instead
  if (pick.variantGroup){
    const sibs = fallback.filter(q=>q.variantGroup===pick.variantGroup && q.id!==pick.id);
    for (const s of sibs){ if (seenCount(s.id) < seenCount(pick.id)){ pick = s; break; } }
  }
  const stv = S(); stv.seen[pick.id] = (stv.seen[pick.id]||0)+1;
  const isPretest = pretestSlots(sim).includes(answered) && sim.pretestDone < sim.cfg.pretestItems;
  if (isPretest) sim.pretestDone++;
  sim.administered.push({qid:pick.id, b:NC.diffB(pick), pretest:isPretest, scored:!isPretest, cn:pick.cn, t:pick.t});
  NC.save();
  return {kind:"item", item:pick, pretest:isPretest, n:answered+1};
};

NC.simAnswer = function(sim, item, ans, timeMs){
  const res = NC.scoreItem(item, ans);
  const rec = sim.administered.find(x=>x.qid===item.id && !x.done);
  const scored = !rec || (!rec.pretest && rec.scored!==false);
  if (rec){ rec.score = res.score; rec.answered = res.answered; rec.done = true; }
  if (scored && res.answered){
    sim.answeredCount++;
    sim.counts[item.cn] = (sim.counts[item.cn]||0)+1;
    sim.theta = simEAP(sim);
  }
  NC.recordAnswer("sim:"+sim.id, item.id, ans, timeMs, true);
  NC.save();
  return res;
};
NC.simCaseItemAnswered = function(sim, caseObj, step, ans, timeMs){
  const qid = caseObj.id+"-"+step;
  const item = NC.item(qid);
  const res = NC.scoreItem(item, ans);
  sim.administered.push({qid, b:NC.diffB(item), pretest:false, scored:true, cn:caseObj.cn, t:item.t, score:res.score, answered:res.answered, done:true, caseId:caseObj.id});
  if (res.answered){
    sim.answeredCount++; sim.counts[caseObj.cn]=(sim.counts[caseObj.cn]||0)+1;
    sim.theta = simEAP(sim);
  }
  sim.caseIdx++;
  if (sim.caseIdx >= caseObj.items.length){ sim.currentCase=null; sim.casesDone++; }
  NC.recordAnswer("sim:"+sim.id, qid, ans, timeMs, true);
  NC.save();
  return res;
};
NC.simFinish = function(sim, reason, outcome){
  sim.cfg = sim.cfg || (NC.EXAMS && NC.EXAMS[sim.examId]) || (NC.EXAMS && NC.EXAMS["nclex-rn-2026"]);
  if (reason==="max" || reason==="time"){
    const se = NC.seAbility(sim.theta, sim.administered.filter(x=>x.scored));
    outcome = sim.theta - se*0.9 > sim.cfg.cut ? "above" : (sim.theta + se*0.9 < sim.cfg.cut ? "below" : "border");
  }
  sim.status="done"; sim.stopReason=reason; sim.outcome=outcome||"border"; sim.finishedTs=Date.now();
  NC.save();
  return {kind:"done", reason, outcome:sim.outcome};
};

/* ── streak & daily ── */
NC.touchStreak = function(){
  const st = S(); const day = new Date().toISOString().slice(0,10);
  if (st.streak.last === day) return;
  const yest = new Date(Date.now()-864e5).toISOString().slice(0,10);
  st.streak.count = st.streak.last===yest ? st.streak.count+1 : 1;
  st.streak.last = day; NC.save();
};
NC.markSeen = function(qid){ const st=S(); st.seen[qid]=(st.seen[qid]||0)+1; NC.save(); };
NC.logEvent = function(name, props){ S().events.push({name, props:props||{}, ts:Date.now()}); if(S().events.length>800) S().events=S().events.slice(-500); NC.save(); };

/* days until exam */
NC.daysToExam = function(){ const d = S().user.examDate; if(!d) return null;
  return Math.ceil((new Date(d+"T12:00:00") - Date.now())/864e5); };

/* simple adaptive study plan */
NC.studyPlan = function(){
  const st = S(); const days = NC.daysToExam() ?? 56;
  const weeks = Math.max(2, Math.min(12, Math.round(days/7)));
  const weak = NC.weakAreas(3, 8).map(w=>w.name);
  const focus = ["Fundamentals · Safety & Infection Control","Pharmacology & Dosage","Cardiovascular · Respiratory","Neurological · Endocrine & Renal","Maternal-Newborn · Pediatrics","Psychosocial · Management of Care","Clinical Judgment Intensive","Full Simulations & Final Review"];
  const plan = [];
  for(let i=0;i<weeks;i++){
    let f = focus[Math.min(i, focus.length-1)];
    if (i>0 && weak.length && i%2===1) f = "Targeted remediation: " + weak.slice(0,2).join(" · ");
    plan.push({week:i+1, focus:f});
  }
  return plan;
};
})();
