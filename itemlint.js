/* RN Ready — item-writing quality linter (v3h).
   Enforces NCSBN-style item-construction standards across the bank + cases.
   Hard flags (test-enforced): construct flaws that leak the key or confuse.
   Soft flags (reported only): stylistic risks worth a human look.

   Hard:
     stem-cue        a distinctive stem word appears ONLY in the key option (clueing)
     absolute        "always/never/all-of-the-above/none-of-the-above" in an option
     double-negative "not"/"except" stacked in the stem
     dup-options     two options near-duplicate (Jaccard ≥ 0.7)
     rat-coverage    per-option rationale array ≠ option count (single/multi)
     opt-parity      single item has <3 options
   Soft:
     longest-key     key is the longest option and >1.5× mean length (testwiseness)
     b-d-mismatch    authored b disagrees with the d label beyond tolerance
     thin-stem       stem under 80 characters (insufficient context)        */
const STOP = new Set(["which","what","when","where","this","that","these","those","client","patient","nurse","nurses","should","would","most","least","best","first","action","actions","following","from","with","have","has","been","their","them","they","about","after","before","during","because","been","into","than","then","also","only","each","every","some","more","less","need","needs","care","report","reports","stated","states","asks","asking","your","you","are","was","were","will","must","does","done","giving","given","take","takes","call","calls","dose","new","day","days","hour","hours","minute","minutes","been","being","over","under","upon","while","both","between","against","received","receiving","prescribed","order","ordered","provide","perform","administer","administered","medication","medications","provider","clinic","hospital","unit","room","shift","history","home","time","high","low"]);

const norm = s => String(s||"").toLowerCase().replace(/[^a-z0-9\s-]/g," ").split(/\s+/).filter(Boolean);
const tokens = s => norm(s).filter(w => w.length>=5 && !STOP.has(w));
const jaccard = (a,b) => { const A=new Set(a), B=new Set(b); let i=0; A.forEach(x=>{ if(B.has(x)) i++; }); return i/(A.size+B.size-i||1); };

function lintItem(q){
  const flags = [];
  const isChoice = q.t==="single" || q.t==="multi";
  if (isChoice && Array.isArray(q.opts)){
    const opts = q.opts.map(String);
    if (opts.length<3) flags.push(["opt-parity", `${opts.length} options`]);
    const stemToks = new Set(tokens(q.stem));
    const optToks = opts.map(o=>new Set(tokens(o)));
    // stem-cue: a distinctive stem token present in exactly one option AND that option is the (sole) key
    const keyIdx = q.t==="single" ? [q.ans] : (Array.isArray(q.ans)?q.ans:[]);
    if (keyIdx.length===1){
      optToks.forEach((O,i)=>{
        O.forEach(tok=>{
          if (stemToks.has(tok)){
            const others = optToks.filter((_,j)=>j!==i).some(O2=>O2.has(tok));
            if (!others && i===keyIdx[0]) flags.push(["stem-cue", `stem word "${tok}" appears only in the key option`]);
          }
        });
      });
    }
    // absolute wording
    opts.forEach((o,i)=>{
      if (/\ball of the above\b|\bnone of the above\b/i.test(o)) flags.push(["absolute", `option ${i}: "of the above" construct`]);
      if (/^(always|never)\b/i.test(o.trim()) && q.t==="single") flags.push(["absolute", `option ${i}: opens with always/never`]);
    });
    // duplicate options — with principled exemptions:
    //   · numeric options that share scaffolding text but differ in VALUES are distinct
    //   · sequence options with the same tokens in a DIFFERENT ORDER are distinct (order is the content)
    for (let a=0;a<opts.length;a++) for (let b=a+1;b<opts.length;b++){
      const ta=norm(opts[a]), tb=norm(opts[b]);
      const na=new Set(ta.filter(w=>/^\d/.test(w))), nb=new Set(tb.filter(w=>/^\d/.test(w)));
      const numsDiffer = na.size && nb.size && [...na].some(x=>!nb.has(x));
      const sameSetDiffOrder = ta.length===tb.length && ta.every(w=>tb.includes(w)) && ta.join(" ")!==tb.join(" ");
      if (!numsDiffer && !sameSetDiffOrder && jaccard(ta, tb) >= 0.7)
        flags.push(["dup-options", `options ${a} & ${b} near-duplicate`]);
    }
    // longest-key (soft)
    const lens = opts.map(o=>o.length);
    const mean = lens.reduce((x,y)=>x+y,0)/lens.length;
    const keyLongest = keyIdx.length && lens[keyIdx[0]] === Math.max(...lens);
    if (keyLongest && lens[keyIdx[0]] > 1.5*mean) flags.push(["longest-key", `key is longest option at ${(lens[keyIdx[0]]/mean).toFixed(1)}× mean`]);
    // rationale coverage
    if (q.rat && Array.isArray(q.rat.o) && q.rat.o.length !== opts.length)
      flags.push(["rat-coverage", `rat.o has ${q.rat.o.length} entries for ${opts.length} options`]);
  }
  // double negative in stem
  const stem = String(q.stem||"");
  // true item-writing negatives: "EXCEPT" constructs or stacked logical negatives.
  // (A single "does not respond"/"has not spoken" clinical fact is not a construct flaw.)
  const exceptish = /\bexcept\b|\bleast likely\b|\bnot appropriate\b/i.test(stem);
  const stacked = (/\bnot\b/i.test(stem) && /\b(unnecessary|incorrect|inappropriate)\b/i.test(stem));
  if (exceptish || stacked) flags.push(["double-negative", "stem uses an except/negation construct"]);
  // b-d consistency (soft): d 0 → b ≤ 0.3 · d 3 → b ≥ 0.3 · d 1 → b ≤ 0.9 · d 2 → b ≥ −0.9
  if (typeof q.b==="number" && Number.isInteger(q.d)){
    const off = (q.d===0 && q.b>0.3) || (q.d===3 && q.b<0.3) || (q.d===1 && q.b>0.9) || (q.d===2 && q.b<-0.9);
    if (off) flags.push(["b-d-mismatch", `d=${q.d} with b=${q.b}`]);
  }
  if (stem.length < 80) flags.push(["thin-stem", `${stem.length} chars`]);
  return flags;
}

/* ── cross-item duplicate scan ────────────────────────────────────────────
   The same question under two ids (a re-seeded row, a re-imported document)
   is what makes an examinee see one question several times in an exam: every
   selection rule is keyed on id. `duplicateClusters` reports those, plus
   items that share a stem (item sets — legitimate on paper, but they read as
   a repeat when both land in one sitting). The engine links them into one
   constraint group at runtime; this is the report + the gate.             */
function duplicateClusters(items){
  const norm = v => String(v==null?"":v).toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
  const presented = q => {
    const p = [String(q.stem||"")];
    if (Array.isArray(q.opts)) q.opts.forEach(o=>p.push(String(o)));
    if (q.groups) q.groups.forEach(g=>{ p.push(String(g.q||g.prompt||"")); (g.opts||[]).forEach(o=>p.push(String(o))); });
    if (q.drag){ (q.drag.targets||[]).forEach(t=>p.push(String(t))); (q.drag.opts||[]).forEach(o=>p.push(String(o))); }
    if (q.cloze) q.cloze.lines.forEach(l=>{ p.push(String(l.text||l.prompt||"")); (l.opts||[]).forEach(o=>p.push(String(o))); });
    if (q.hotspot){ p.push(String(q.hotspot.mode||"")); (q.hotspot.rows||[]).forEach(r=>p.push(String(r))); }
    if (q.matrix){ p.push(String(q.matrix.mode||"")); (q.matrix.cols||[]).forEach(c=>p.push(String(c))); (q.matrix.rows||[]).forEach(r=>p.push(String(r))); }
    return p.join("\u0001");
  };
  const byContent = new Map(), byStem = new Map();
  (items||[]).forEach(q=>{
    if (!q || !q.id) return;
    const c = norm(presented(q)), s2 = norm(q.stem);
    if (c){ if (!byContent.has(c)) byContent.set(c,[]); byContent.get(c).push(q.id); }
    if (s2){ if (!byStem.has(s2)) byStem.set(s2,[]); byStem.get(s2).push(q.id); }
  });
  const sameContent = [...byContent.values()].filter(v=>v.length>1);
  const sharedStem  = [...byStem.values()].filter(v=>v.length>1)
    .filter(v=>!sameContent.some(c=>c.length===v.length && c.every((x,i)=>x===v[i])));
  return { sameContent, sharedStem,
    exactCount: sameContent.length,
    stemCount: sharedStem.length,
    affected: new Set([...sameContent, ...sharedStem].flat()).size };
}

function lint(items){
  const out = [];
  (items||[]).forEach(q=>{
    const flags = lintItem(q);
    if (flags.length) out.push({ id:q.id, t:q.t, flags });
  });
  const HARD = new Set(["stem-cue","absolute","double-negative","dup-options","rat-coverage","opt-parity"]);
  const hard = out.filter(x=>x.flags.some(f=>HARD.has(f[0])));
  const soft = out.filter(x=>!x.flags.some(f=>HARD.has(f[0])));
  return { items:out, hard, soft, hardCount:hard.length };
}

module.exports = { lint, lintItem, duplicateClusters,
                   HARD:new Set(["stem-cue","absolute","double-negative","dup-options","rat-coverage","opt-parity"]) };

/* CLI */
if (require.main === module){
  const fs=require("fs"), path=require("path"), vm=require("vm");
  const ctx={NC:{},window:{},console,Math,JSON,Date,Set,Map,Array,Object,Number,String,parseInt,parseFloat,isNaN};
  ctx.globalThis=ctx; ctx.window=ctx; vm.createContext(ctx);
  ["js/taxonomy.js", ...require("./content").contentFiles(__dirname).all, "js/engine.js"]
    .forEach(f=>vm.runInContext(fs.readFileSync(path.join(__dirname,f),"utf8"),ctx,{filename:f}));
  const NC=ctx.window.NC; vm.runInContext("NC.load()",ctx);
  const r = lint(NC.allItems());
  const dup = module.exports.duplicateClusters(NC.BANK);
  console.log(`itemlint: ${NC.allItems().length} items · ${r.hardCount} HARD flags · ${r.soft.length} items with soft warnings`);
  console.log(`duplicate scan: ${dup.exactCount} same-content cluster(s), ${dup.stemCount} shared-stem cluster(s), ${dup.affected} item(s) affected\n`);
  if (r.hard.length){
    console.log("— HARD (must fix) —");
    r.hard.forEach(x=>console.log(`  ${x.id} [${x.t}]  ${x.flags.filter(f=>module.exports.HARD.has(f[0])).map(f=>f[0]+": "+f[1]).join(" | ")}`));
  }
  if (r.soft.length){
    console.log("\n— soft (review) —");
    r.soft.slice(0,25).forEach(x=>console.log(`  ${x.id}  ${x.flags.map(f=>f[0]).join(",")}`));
  }
  if (dup.sameContent.length){
    console.log("\n— DUPLICATE CONTENT (same question under several ids — never co-served at runtime) —");
    dup.sameContent.forEach(ids=>console.log("  " + ids.join(" = ") + "  || " +
      String((NC.BANK.find(q=>q.id===ids[0])||{}).stem||"").slice(0,100)));
  }
  if (dup.sharedStem.length){
    console.log("\n— SHARED STEM (item set: at most one member per exam) —");
    dup.sharedStem.forEach(ids=>console.log("  " + ids.join(" ~ ") + "  || " +
      String((NC.BANK.find(q=>q.id===ids[0])||{}).stem||"").slice(0,100)));
  }
  process.exit((r.hardCount || dup.exactCount) ? 1 : 0);
}
