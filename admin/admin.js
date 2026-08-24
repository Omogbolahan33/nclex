/* RN Ready — admin authoring console (v3c).
   Plain JS, no deps. Talks only to key-gated /api/admin/* endpoints.
   The transition buttons are generated from the server's transition map —
   the workflow lives in one place (authoring.js), the UI just renders it.   */
(function(){
"use strict";
const $ = id => document.getElementById(id);
let KEY = sessionStorage.getItem("adminKey") || "";
let META = null;          // {statuses, transitions, bank}
let CURRENT = null;       // authoring record being edited (or null = new)

/* ── api helper ── */
async function api(path, opts){
  const r = await fetch(path, Object.assign({}, opts||{}, {
    headers: Object.assign({"X-Admin-Key":KEY,"Content-Type":"application/json"},
      (opts&&opts.headers)||{})
  }));
  const data = await r.json().catch(()=>({}));
  if (r.status === 401){ lock("key rejected"); return { status:401, data }; }
  return { status:r.status, data };
}
function toast(msg, isErr){
  const t = $("toast");
  t.textContent = msg; t.className = "toast show" + (isErr ? " err" : "");
  clearTimeout(t._h); t._h = setTimeout(()=>{ t.className = "toast"; }, 3200);
}
const esc = s => String(s==null?"":s).replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

/* ── gate ── */
function lock(msg){
  sessionStorage.removeItem("adminKey"); KEY = "";
  $("app").classList.add("hidden"); $("gate").classList.remove("hidden");
  $("gate-msg").textContent = msg || "";
}
async function unlock(){
  try{
    const r = await api("/api/admin/items");
    if (r.status !== 200) return lock("cannot reach server");
    META = r.data;
    sessionStorage.setItem("adminKey", KEY);
    $("gate").classList.add("hidden"); $("app").classList.remove("hidden");
    renderQueue();
  }catch(e){ /* 401 already handled */ }
}

/* ── queue ── */
function renderQueue(){
  const q = META.queue || [];
  const f = $("filter-status").value;
  const rows = q.filter(r => !f || r.status === f);
  $("bank-sub").textContent = `${META.bank.count} items live · ${META.bank.patched.length} patched`;
  $("queue-count").textContent = q.length ? `· ${q.length}` : "";
  $("queue").innerHTML = rows.length ? rows.map(r => `
    <div class="queue-item" data-qid="${esc(r.qid)}" role="button" tabindex="0">
      <div style="min-width:0">
        <div class="qid">${esc(r.qid)} <span class="muted">v${r.version}</span></div>
        <div class="topic">${esc(r.topic||"")} · ${esc(r.cn)} · ${esc(r.t)}</div>
      </div>
      <div class="right">
        <span class="badge ${r.status}">${r.status}</span>
        <div class="muted" style="font-size:10.5px">${new Date(r.updated).toLocaleDateString()}</div>
      </div>
    </div>`).join("")
    : `<p class="muted" style="padding:8px 0">Nothing here. “+ New item” to draft one, or bulk-import below.</p>`;
  Array.from($("queue").querySelectorAll(".queue-item")).forEach(el => {
    const open = ()=>openEditor(el.getAttribute("data-qid"));
    el.addEventListener("click", open);
    el.addEventListener("keydown", e=>{ if (e.key==="Enter"||e.key===" "){ e.preventDefault(); open(); } });
  });
}

/* ── editor ── */
function blankItem(){
  return { id:"", t:"single", cn:"MOC", sys:"CV", topic:"", d:1, b:0, cj:"recognize",
           tags:[], stem:"", opts:["",""], ans:0, rat:{c:"",s:""}, ref:"" };
}
async function openEditor(qid){
  CURRENT = null;
  if (qid){
    const r = await api("/api/admin/items/"+encodeURIComponent(qid));
    if (r.status !== 200){ toast("no record: "+qid, true); return; }
    CURRENT = r.data.record;
    fillForm(CURRENT.draft || CURRENT.published);
  } else fillForm(blankItem());
  renderStatusLine();
  $("editor-card").classList.remove("hidden");
  $("history-card").classList.toggle("hidden", !CURRENT);
  if (CURRENT) renderHistory(CURRENT);
  const card = $("editor-card");
  if (card.scrollIntoView) card.scrollIntoView({behavior:"smooth"});
  $("f-id").focus();
}
function fillForm(q){
  $("f-id").value = q.id||"";           $("f-t").value = q.t||"single";
  $("f-cn").value = q.cn||"MOC";        $("f-sys").value = q.sys||"CV";
  $("f-cj").value = q.cj||"recognize";  $("f-topic").value = q.topic||"";
  $("f-d").value = String(q.d==null?1:q.d); $("f-b").value = String(q.b||0);
  $("f-tags").value = (q.tags||[]).join(", ");
  $("f-vg").value = q.variantGroup||"";
  $("f-stem").value = q.stem||"";
  // options with * markers for keys
  const adv = ["drag","cloze","matrix","hotspot"].filter(k=>q[k]);
  if (adv.length){ $("f-opts").value = ""; $("f-adv").value = JSON.stringify(Object.fromEntries(adv.map(k=>[k,q[k]])), null, 1); }
  else {
    $("f-adv").value = "";
    const opts = q.opts||[];
    const keys = Array.isArray(q.ans) ? q.ans : [q.ans];
    $("f-opts").value = opts.map((o,i)=>(keys.includes(i)?"*":"")+o).join("\n");
  }
  $("f-ratc").value = (q.rat&&q.rat.c)||""; $("f-rats").value = (q.rat&&q.rat.s)||"";
  $("f-ref").value = q.ref||"";
  $("editor-errors").innerHTML = "";
}
function collectItem(){
  const lines = $("f-opts").value.split("\n").map(s=>s.trim()).filter(Boolean);
  const opts = lines.map(l=>l.replace(/^\*/,"").trim());
  const keys = lines.map((l,i)=>l.startsWith("*")?i:-1).filter(i=>i>=0);
  let t = $("f-t").value;
  let item = {
    id: $("f-id").value.trim().toUpperCase(), t,
    cn: $("f-cn").value, sys: $("f-sys").value, cj: $("f-cj").value,
    topic: $("f-topic").value.trim(),
    d: parseInt($("f-d").value,10), b: parseFloat($("f-b").value)||0,
    tags: $("f-tags").value.split(",").map(s=>s.trim()).filter(Boolean),
    stem: $("f-stem").value.trim(),
    rat: { c: $("f-ratc").value.trim(), s: $("f-rats").value.trim() },
    ref: $("f-ref").value.trim() || undefined
  };
  if ($("f-vg").value.trim()) item.variantGroup = $("f-vg").value.trim();
  const advRaw = $("f-adv").value.trim();
  if (advRaw){
    let adv; try { adv = JSON.parse(advRaw); } catch(e){ throw {errors:["advanced JSON does not parse: "+e.message]}; }
    ["drag","cloze","matrix","hotspot"].forEach(k=>{ if (adv[k]) item[k] = adv[k]; });
  } else {
    if (t==="single") item.ans = keys.length ? keys[0] : 0;
    else if (t==="multi") item.ans = keys.length ? keys : [0];
    else item.opts = opts; // advanced types validate server-side
    if (t==="single"||t==="multi") item.opts = opts;
  }
  return item;
}
function renderStatusLine(){
  if (!CURRENT){ $("status-line").innerHTML = `<span class="badge draft">new draft</span>
    <span class="muted">not in the workflow yet — save to create the record</span>`; return; }
  $("status-line").innerHTML = `<span class="badge ${CURRENT.status}">${CURRENT.status}</span>
    <span class="muted"> v${CURRENT.version} · updated ${new Date(CURRENT.updated).toLocaleString()}</span>`;
  // transition buttons from the server's map — single source of truth
  const acts = $("editor-actions");
  acts.querySelectorAll(".dyn").forEach(b=>b.remove());
  const allowed = (META.transitions||{})[CURRENT.status]||[];
  const labels = { review:"Send to review →", approved:"Approve", published:"Publish",
                   draft:"Reject → draft", retired:"Retire" };
  allowed.filter(to=>to!=="retired").forEach(to=>{
    const b = document.createElement("button");
    b.className = "btn dyn" + (to==="published"?" ok":" ghost");
    b.textContent = labels[to]||to;
    b.addEventListener("click", ()=>doTransition(to));
    acts.appendChild(b);
  });
  if (allowed.includes("retired")){
    const b = document.createElement("button");
    b.className = "btn dyn danger";
    b.textContent = "Retire";
    b.addEventListener("click", ()=>doTransition("retired"));
    acts.appendChild(b);
  }
}
async function doTransition(to){
  if (to==="published" && !confirm("Publish this item? It becomes live for examinees.")) return;
  const r = await api(`/api/admin/items/${encodeURIComponent(CURRENT.qid)}/transition`,
    { method:"POST", body: JSON.stringify({ to, note: $("f-note").value }) });
  if (r.status !== 200) return showErrors(r.data);
  CURRENT = r.data.record;
  fillForm(CURRENT.draft||CURRENT.published);
  renderStatusLine(); renderHistory(CURRENT); await refreshMeta(); renderQueue();
  toast(`${CURRENT.qid} → ${to} (v${CURRENT.version})`);
}
function showErrors(data){
  const errs = (data && data.errors) || [ (data && data.error) || "request failed" ];
  $("editor-errors").innerHTML = `<ul class="errors">${errs.map(e=>`<li>${esc(e)}</li>`).join("")}</ul>`;
  toast(errs[0], true);
}
async function save(){
  let item; try { item = collectItem(); } catch(e){ return showErrors(e); }
  const note = $("f-note").value;
  const editingSame = CURRENT && CURRENT.qid === item.id
    && (CURRENT.status==="draft" || CURRENT.status==="review");
  const r = await api(editingSame ? "/api/admin/items/"+encodeURIComponent(item.id) : "/api/admin/items",
    { method: editingSame ? "PUT" : "POST", body: JSON.stringify({ item, note }) });
  if (r.status !== 200) return showErrors(r.data);
  CURRENT = r.data.record;
  renderStatusLine(); renderHistory(CURRENT); await refreshMeta(); renderQueue();
  toast(`saved ${item.id} (${CURRENT.status})`);
}
function renderHistory(rec){
  const h = (rec.history||[]).slice().reverse();
  $("history").innerHTML = h.length ? h.map(e=>`
    <div class="history-item">
      <div><b>${esc(e.event)}</b>${e.snapshot?` · snapshot ${e.snapshot.id} kept`:''}</div>
      <div class="when">${new Date(e.ts).toLocaleString()} ${e.note?"— "+esc(e.note):""}</div>
    </div>`).join("") : `<p class="muted">no events yet</p>`;
}

/* ── bulk import / export ── */
async function doImport(){
  let items; try { items = JSON.parse($("import-json").value); }
  catch(e){ return toast("JSON does not parse: "+e.message, true); }
  const r = await api("/api/admin/import", { method:"POST", body: JSON.stringify({ items }) });
  if (r.status !== 200) return toast(r.data.error||"import failed", true);
  toast(`imported ${r.data.created.length} drafts · ${r.data.errors.length} rejected`);
  if (r.data.errors.length) console.warn("import errors", r.data.errors);
  $("import-json").value = "";
  await refreshMeta(); renderQueue();
}
function doExport(){
  api("/api/admin/export").then(r=>{
    const blob = new Blob([JSON.stringify(r.data,null,1)],{type:"application/json"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "rn-ready-bank-"+new Date().toISOString().slice(0,10)+".json";
    a.click(); URL.revokeObjectURL(a.href);
    toast("export downloaded (contains keys — store safely)");
  });
}
async function refreshMeta(){
  const r = await api("/api/admin/items");
  if (r.status===200) META = r.data;
}

/* ── distractor analysis ── */
async function doDistractors(){
  const btn = $("btn-distract");
  btn.disabled = true; btn.textContent = "Running…";
  const r = await api("/api/admin/distractors");
  btn.disabled = false; btn.textContent = "Run analysis";
  if (r.status !== 200) return toast(r.data.error||"analysis failed", true);
  const flagged = (r.data.items||[]).filter(x=>x.flagged);
  const rows = flagged.slice(0,30).map(x=>
    x.options.filter(o=>o.flags.length).map(o=>`
      <div class="history-item">
        <div><b>${esc(x.qid)}</b> · option ${o.i} ${o.key?"· <b>KEY</b>":""} · n=${o.n} (${Math.round(o.pct*100)}%) · rpb ${o.rpb==null?"—":o.rpb}</div>
        <div class="when">${o.flags.map(esc).join(", ")}</div>
      </div>`).join("")
  ).join("");
  $("distract-out").innerHTML = rows
    ? `<div class="muted" style="margin-bottom:6px">${r.data.items.length} single/multi items · ${flagged.length} with flagged options (top 30 shown)</div>${rows}`
    : `<p class="muted">No flagged options at current sample sizes (n≥20 gate).</p>`;
  toast(`distractor analysis: ${flagged.length} items flagged`);
}

/* ── wire up ── */
$("key-go").addEventListener("click", ()=>{ KEY = $("key-in").value; unlock(); });
$("key-in").addEventListener("keydown", e=>{ if (e.key==="Enter"){ KEY = $("key-in").value; unlock(); } });
$("btn-logout").addEventListener("click", ()=>lock("locked"));
$("btn-export").addEventListener("click", doExport);
$("btn-import").addEventListener("click", doImport);
$("btn-distract").addEventListener("click", doDistractors);
$("btn-new").addEventListener("click", ()=>openEditor(null));
$("btn-save").addEventListener("click", save);
$("filter-status").addEventListener("change", renderQueue);
if (KEY) unlock(); else lock();
})();
