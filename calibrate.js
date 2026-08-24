/* RN Ready — item calibration (v3b).
   Computes empirical item statistics from the response log and derives a blended
   difficulty (empirical p-value logit ∝ authored b) used by the CAT.

   Stats per item (n ≥ MIN_N answered):
     p       — mean item score (difficulty index)
     rpb     — point-biserial correlation vs session rest-score (discrimination)
     avgTime — mean seconds
     bEmp    — logit difficulty from p: ln((1-p)/p), clamped to ±2.5
     bEff    — blend of bEmp and authored b, weight = n/(n+K)
   Flags: low-discrimination (rpb<0.10, n≥20), hard-floor (p≤0.15, n≥20),
          ceiling (p≥0.95, n≥20), slow (avgTime>120s, n≥10).

   Distractor analysis (v3d): per-option pick rate + point-biserial vs rest-score
   for single/multi items. Healthy distractors attract weaker candidates (negative
   rpb). Flags: "dead" (picked <5%, n≥20), "attracts-strong" (rpb > +0.20 on a
   non-key option — ambiguity or miskey suspicion).

   CLI:  node calibrate.js            → print report
         node calibrate.js --apply    → print + persist + apply to the bank   */
const MIN_N = 8, K = 20;
const clamp = (v,lo,hi)=>Math.max(lo,Math.min(hi,v));
const r3 = v=>Math.round(v*1000)/1000, r2 = v=>Math.round(v*100)/100;

/* rest-score per response: mean score of the session's OTHER answered items */
function restScores(responses){
  const bySid={};
  (responses||[]).forEach(r=>{
    if (!r || !r.qid || !r.answered || typeof r.score!=="number") return;
    (bySid[r.sid]=bySid[r.sid]||[]).push(r);
  });
  const rest = new Map();
  Object.values(bySid).forEach(arr=>{
    if (arr.length<2){ arr.forEach(r=>rest.set(r,0)); return; }
    const total = arr.reduce((a,x)=>a+x.score,0);
    arr.forEach(r=>rest.set(r,(total-r.score)/(arr.length-1)));
  });
  return rest;
}
function pointBiserial(xs, ys){
  const n = xs.length;
  if (!n) return null;
  const mx=xs.reduce((a,b)=>a+b,0)/n, my=ys.reduce((a,b)=>a+b,0)/n;
  let cov=0,sxx=0,syy=0;
  for(let i=0;i<n;i++){ cov+=(xs[i]-mx)*(ys[i]-my); sxx+=(xs[i]-mx)**2; syy+=(ys[i]-my)**2; }
  return (sxx>1e-9&&syy>1e-9)? r3(cov/Math.sqrt(sxx*syy)) : null;
}

function compute(responses, items){
  const byItem={};
  (responses||[]).forEach(r=>{
    if (!r || !r.qid || !r.answered || typeof r.score!=="number") return;
    (byItem[r.qid]=byItem[r.qid]||[]).push(r);
  });
  const rest = restScores(responses);
  const out=[];
  Object.entries(byItem).forEach(([qid,rs])=>{
    const n = rs.length;
    const q = items.find(x=>x.id===qid);
    if (!q) return;
    const p = rs.reduce((a,r)=>a+r.score,0)/n;
    const avgTime = Math.round(rs.reduce((a,r)=>a+(r.timeMs||0),0)/n/1000);
    const rpb = pointBiserial(rs.map(r=>r.score), rs.map(r=>rest.get(r)||0));
    const pc = clamp(p,0.02,0.98);
    const bEmp = r2(clamp(Math.log((1-pc)/pc),-2.5,2.5));
    const bAuth = (q.bAuth!=null)? q.bAuth : q.b;
    const bEff = n>=MIN_N ? r2((n*bEmp + K*(bAuth??0))/(n+K)) : (bAuth??null);
    const flags=[];
    if (n>=20 && rpb!=null && rpb<0.10) flags.push("low-discrimination");
    if (n>=20 && p<=0.15) flags.push("hard-floor");
    if (n>=20 && p>=0.95) flags.push("ceiling");
    if (n>=10 && avgTime>120) flags.push("slow");
    out.push({ qid, cn:q.cn||null, topic:q.topic||null, n,
      p:r3(p), rpb, avgTime, bAuth:r2(bAuth??0), bEmp, bEff, flags });
  });
  return { generated: Date.now(), minN: MIN_N, blendK: K,
    items: out.sort((a,b)=> (a.flags.length? -1:0)-(b.flags.length? -1:0) || b.n-a.n) };
}

/* apply a report to a live NC bank: empirical difficulty becomes the item's b */
function apply(NC, report){
  let applied=0;
  (report.items||[]).forEach(x=>{
    const q = NC.item(x.qid);
    if (q && x.n>=MIN_N && typeof x.bEff==="number"){
      if (q.bAuth==null) q.bAuth = q.b;   // preserve the authored value once
      q.b = x.bEff; applied++;
    }
  });
  return applied;
}
function reset(NC){
  NC.BANK.forEach(q=>{ if (q.bAuth!=null){ q.b=q.bAuth; delete q.bAuth; } });
}

/* ── distractor analysis (v3d) ──
   single: pick = the chosen option index.
   multi:  "pick" = option included in the response (per-option binary).        */
function distractors(responses, items){
  const byItem={};
  (responses||[]).forEach(r=>{
    if (!r || !r.qid || !r.answered) return;
    (byItem[r.qid]=byItem[r.qid]||[]).push(r);
  });
  const rest = restScores(responses);
  const out=[];
  Object.entries(byItem).forEach(([qid,rs])=>{
    const q = items.find(x=>x.id===qid);
    if (!q || (q.t!=="single" && q.t!=="multi")) return;
    const nOpts = (q.opts||[]).length;
    if (!nOpts) return;
    const keyIdx = q.t==="single" ? [q.ans] : (Array.isArray(q.ans)? q.ans : []);
    const options=[];
    for (let i=0;i<nOpts;i++){
      const picks = rs.map(r=>{
        const a = r.ans;
        if (a==null) return 0;
        return q.t==="single" ? (a===i?1:0) : (Array.isArray(a)&&a.includes(i)?1:0);
      });
      const nI = picks.reduce((a,b)=>a+b,0);
      const pct = nI/rs.length;
      const rpbI = nI>0 && nI<rs.length
        ? pointBiserial(picks, rs.map(r=>rest.get(r)||0)) : null;
      const isKey = keyIdx.includes(i);
      const flags=[];
      if (rs.length>=20 && !isKey && pct<0.05) flags.push("dead");
      if (rs.length>=20 && !isKey && rpbI!=null && rpbI>0.20) flags.push("attracts-strong");
      if (rs.length>=20 && isKey && rpbI!=null && rpbI<0.10) flags.push("weak-key");
      options.push({ i, key:isKey, n:nI, pct:r3(pct), rpb:rpbI, flags });
    }
    out.push({ qid, t:q.t, n:rs.length, topic:q.topic||null, cn:q.cn||null, options,
      flagged: options.some(o=>o.flags.length) });
  });
  return { generated:Date.now(), items: out.sort((a,b)=> (b.flagged?1:0)-(a.flagged?1:0) || b.n-a.n) };
}

module.exports = { compute, apply, reset, distractors, restScores, pointBiserial, MIN_N };

/* ── CLI ── */
if (require.main === module){
  const fs=require("fs"), path=require("path"), vm=require("vm");
  const ctx={console,Math,JSON,Date,Set,Map,Array,Object,Number,String,parseInt,parseFloat,isNaN};
  ctx.globalThis=ctx; ctx.window=ctx; vm.createContext(ctx);
  ["js/taxonomy.js", ...require("./content").contentFiles(__dirname).all, "js/engine.js"]
    .forEach(f=>vm.runInContext(fs.readFileSync(path.join(__dirname,f),"utf8"),ctx,{filename:f}));
  const NC=ctx.window.NC; vm.runInContext("NC.load()",ctx);
  const store=require("./store"); const D=store.load();
  const responses=[...D.responses, ...Object.values(D.users).flatMap(u=>u.responses||[])];
  const report=compute(responses, NC.allItems());
  const flagged=report.items.filter(x=>x.flags.length);
  console.log(`calibration: ${report.items.length} items with ≥1 response · ${report.items.filter(x=>x.n>=MIN_N).length} with n≥${MIN_N} (calibratable) · ${flagged.length} flagged\n`);
  console.log("qid            n     p      rpb     t(s)  bAuth → bEff   flags");
  console.log("-".repeat(88));
  report.items.slice(0,30).forEach(x=>{
    console.log(`${x.qid.padEnd(14)} ${String(x.n).padStart(4)}  ${String(x.p).padStart(5)}  ${String(x.rpb??"—").padStart(5)}  ${String(x.avgTime).padStart(4)}  ${String(x.bAuth).padStart(5)} → ${String(x.bEff??"—").padStart(5)}  ${x.flags.join(",")||""}`);
  });
  if (process.argv.includes("--apply")){
    const applied=apply(NC,report);
    D.calibration=report; store.saveNow();
    console.log(`\napplied empirical difficulty to ${applied} items (stored in calibration report).`);
  } else {
    console.log("\n(dry run — use --apply to persist and apply to the bank)");
  }
  const da = distractors(responses, NC.allItems());
  const flaggedOpts = da.items.filter(x=>x.flagged);
  if (flaggedOpts.length){
    console.log(`\ndistractor analysis: ${da.items.length} single/multi items · ${flaggedOpts.length} with flagged options`);
    console.log("qid            opt key    n   pct    rpb   flags");
    console.log("-".repeat(72));
    flaggedOpts.slice(0,15).forEach(x=>{
      x.options.filter(o=>o.flags.length).forEach(o=>{
        console.log(`${x.qid.padEnd(14)} ${String(o.i).padStart(3)}  ${o.key?"K":" "}  ${String(o.n).padStart(4)}  ${String(o.pct).padStart(5)}  ${String(o.rpb??"—").padStart(5)}  ${o.flags.join(",")}`);
      });
    });
  }
}
