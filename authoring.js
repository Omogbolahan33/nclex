/* RN Ready — authoring (v4). Zero-dep, Node-side module.

   Lifecycle: authored → live. `createDraft` validates, duplicate-checks, and
   publishes in one step; `transition` retires and restores.

   The previous pipeline (draft → review → approved → published, with role-based
   access control and separation of duties) has been retired along with the admin
   console that drove it. An authored item is available immediately. What still
   gates it is the two checks that actually protect an examinee:
     · validateItem — schema + taxonomy contract
     · duplicateOf  — the same question cannot enter under a second id
   And what is still guaranteed is rollback: overwriting a live item snapshots the
   outgoing version into record.history first, so nothing is lost silently.

   Storage shape (D.authoring[qid]):
   { qid, status, version, draft, published?, created, updated, by,
     history:[{version, ts, event, note, snapshot?}] }
   D.bankPatches[qid] = {op:"set", item} | {op:"remove"}  → replayed at boot.   */

/* qid = 2–4 letters, hyphen, then 3 OR 4 digits.
   Was `\d{3}` only, which capped the bank at 999 items per client-need prefix
   (8 prefixes x 999 = 7,992 qids) — below any large-bank target. Allowing a
   4th digit raises that to 8 x 9,999 = 79,992. Variable width is deliberate:
   existing 3-digit qids (MOC-001) stay valid and unrenamed, so no migration,
   no history rewrite, and every stored response/sim row keeps resolving.
   Nothing parses the numeric part for meaning — the only readers are the
   max-id scan in tools/draft-bank.mjs (regex `[0-9]+`, width-agnostic) and
   deterministic report sorts, which stay deterministic at mixed widths.      */
const ID_RE = /^[A-Z]{2,4}-\d{3,4}$/;
const STATUSES = ["published","retired"];

/* `by` is kept purely as an attribution string for the audit history. It used to
   select a role from ROLES and gate actions through ACTIONS; role-based access
   control went with the review pipeline, so any actor may author and retire.  */
function actorOf(by){
  if (by && typeof by === "object") return { name: by.name || "admin" };
  return { name: (typeof by === "string" && by) || "admin" };
}
/* Flat lifecycle. This used to be draft → review → approved → published with
   role gates and separation of duties, so nothing reached an examinee until a
   reviewer signed off and a publisher released it. That review pipeline is
   retired: an authored item is validated, duplicate-checked, and live in one
   step. The guarantees worth keeping are kept — schema validation, the
   duplicate gate, and version history with a snapshot of anything overwritten.
   The intermediate states remain listed so stored records from the old
   pipeline still resolve and can move forward.                            */
const TRANSITIONS = {
  draft:    ["published","retired"],
  review:   ["draft","published","retired"],
  approved: ["published","retired"],
  published:["draft","retired"],
  retired:  ["draft","published"]
};

/* ── validation: full item schema (same rules the engine/render rely on) ── */
function validateItem(q, NC){
  const errs = [];
  const T = NC.TAX;
  if (!q || typeof q !== "object") return ["item must be an object"];
  if (!q.id || typeof q.id !== "string" || !ID_RE.test(q.id)) errs.push("id must match ABC-123 or ABC-1234 (2–4 letters + 3–4 digits)");
  if (typeof q.stem !== "string" || q.stem.length < 10) errs.push("stem too short (≥10 chars)");
  if (q.stem && q.stem.length > 2000) errs.push("stem too long (≤2000 chars)");
  if (!T.clientNeeds.some(c=>c.id===q.cn)) errs.push("cn must be one of: "+T.clientNeeds.map(c=>c.id).join(", "));
  const sysIds = T.systems.map(s=>s.id||s);
  if (!sysIds.includes(q.sys)) errs.push("sys must be one of: "+sysIds.join(", "));
  if (typeof q.topic !== "string" || !q.topic.trim()) errs.push("topic required");
  if (!Number.isInteger(q.d) || q.d < 0 || q.d > 3) errs.push("difficulty d must be integer 0–3");
  if (typeof q.b !== "number" || !isFinite(q.b) || Math.abs(q.b) > 3) errs.push("b must be a number in [-3,3]");
  if (!T.cjSteps.includes(q.cj)) errs.push("cj must be one of: "+T.cjSteps.join(", "));
  if (!Array.isArray(q.tags) || !q.tags.every(t=>typeof t==="string")) errs.push("tags must be an array of strings");
  if (q.variantGroup!=null && (typeof q.variantGroup!=="string" || !q.variantGroup.trim())) errs.push("variantGroup must be a non-empty string");
  const rat = q.rat || {};
  if (typeof rat.c !== "string" || rat.c.length < 5) errs.push("rationale.rat.c (correct) required (≥5 chars)");
  if (typeof rat.s !== "string" || rat.s.length < 5) errs.push("rationale.rat.s (strategy) required (≥5 chars)");
  if (q.ref!=null && typeof q.ref !== "string") errs.push("ref must be a string");

  const intIn = (v, lo, hi) => Number.isInteger(v) && v >= lo && v <= hi;
  switch (q.t){
    case "single":
      if (!Array.isArray(q.opts) || q.opts.length < 2 || q.opts.length > 6) errs.push("single: needs 2–6 opts");
      else if (!intIn(q.ans, 0, q.opts.length-1)) errs.push("single: ans must index opts");
      break;
    case "multi":
      if (!Array.isArray(q.opts) || q.opts.length < 3 || q.opts.length > 8) errs.push("multi: needs 3–8 opts");
      else if (!Array.isArray(q.ans) || !q.ans.length || !q.ans.every(a=>intIn(a,0,q.opts.length-1)) || new Set(q.ans).size!==q.ans.length)
        errs.push("multi: ans must be a non-empty array of unique opt indices");
      break;
    case "drag": {
      const d = q.drag;
      if (!d || !Array.isArray(d.targets) || d.targets.length < 2) errs.push("drag: ≥2 targets required");
      else if (!Array.isArray(d.opts) || d.opts.length < 2) errs.push("drag: ≥2 opts required");
      else if (!Array.isArray(d.ans) || d.ans.length !== d.targets.length || !d.ans.every(a=>intIn(a,0,d.opts.length-1)))
        errs.push("drag: ans must map every target to an opt index");
      break;
    }
    case "cloze": {
      const c = q.cloze;
      if (!c || !Array.isArray(c.lines) || c.lines.length < 1) errs.push("cloze: ≥1 line required");
      else if (!c.lines.every(l => Array.isArray(l.opts) && l.opts.length >= 2 && intIn(l.ans, 0, l.opts.length-1)))
        errs.push("cloze: every line needs ≥2 opts and a valid ans index");
      break;
    }
    case "matrix": {
      const m = q.matrix;
      if (!m || !Array.isArray(m.cols) || m.cols.length < 2) errs.push("matrix: ≥2 cols required");
      else if (!Array.isArray(m.rows) || m.rows.length < 2) errs.push("matrix: ≥2 rows required");
      else if (!Array.isArray(m.ans) || m.ans.length !== m.rows.length || !m.ans.every(a=>intIn(a,0,m.cols.length-1)))
        errs.push("matrix: ans must answer every row with a col index");
      break;
    }
    case "hotspot": {
      const h = q.hotspot;
      /* mode is advisory metadata — no renderer branches on it, js/engine.js only
         folds it into the duplicate fingerprint. The bank ships "rows"; accept the
         singular spelling too so older drafts keep validating. */
      const MODES = ["row", "rows", "cell", "cells"];
      if (!h || !MODES.includes(h.mode)) errs.push("hotspot: mode must be 'row(s)' or 'cell(s)'");
      else if (!Array.isArray(h.rows) || h.rows.length < 2) errs.push("hotspot: ≥2 rows required");
      else if (!Array.isArray(h.ans) || !h.ans.length || !h.ans.every(a=>intIn(a,0,h.rows.length-1)))
        errs.push("hotspot: ans must list valid row indices");
      break;
    }
    default:
      if (q.t !== "emr") errs.push("t must be one of: single, multi, drag, cloze, matrix, hotspot, emr");
  }
  return errs;
}

/* ── duplicate content guard (v3o) ────────────────────────────────────────
   A new draft that repeats a question already in the bank (same stem + same
   presented options, or just the same stem) is how a database ends up with the
   same question under several ids — and how examinees see one question five
   times in a single exam. Publishing it is blocked with the id of the item it
   collides with, so the author either merges the change into that item or
   deliberately makes it a `variantGroup` sibling. The engine separately links
   whatever duplicates already exist, so nothing can be co-served.          */
const normTxt = v => String(v==null?"":v).toLowerCase()
  .replace(/[\u2018\u2019]/g,"'").replace(/[\u201C\u201D]/g,'"')
  .replace(/[^a-z0-9]+/g," ").trim();
function presented(q){
  const p = [String(q.stem||"")];
  if (Array.isArray(q.opts)) q.opts.forEach(o=>p.push(String(o)));
  if (q.groups) q.groups.forEach(g=>{ p.push(String(g.q||g.prompt||"")); (g.opts||[]).forEach(o=>p.push(String(o))); });
  if (q.drag){ (q.drag.targets||[]).forEach(t=>p.push(String(t))); (q.drag.opts||[]).forEach(o=>p.push(String(o))); }
  if (q.cloze) q.cloze.lines.forEach(l=>{ p.push(String(l.text||l.prompt||"")); (l.opts||[]).forEach(o=>p.push(String(o))); });
  if (q.hotspot){ p.push(String(q.hotspot.mode||"")); (q.hotspot.rows||[]).forEach(r=>p.push(String(r))); }
  if (q.matrix){ p.push(String(q.matrix.mode||"")); (q.matrix.cols||[]).forEach(c=>p.push(String(c))); (q.matrix.rows||[]).forEach(r=>p.push(String(r))); }
  return p.join("\u0001");
}
/* → { id, kind } of the first bank item this draft repeats, or null */
function duplicateOf(NC, item, exceptId){
  if (!item || typeof item !== "object" || !item.stem) return null;
  const fp = normTxt(presented(item)), st = normTxt(item.stem);
  for (const q of (NC.BANK||[])){
    if (!q || q.id === exceptId) continue;
    if (normTxt(presented(q)) === fp) return { id:q.id, kind:"same-content" };
  }
  for (const q of (NC.BANK||[])){
    if (!q || q.id === exceptId) continue;
    if (normTxt(q.stem) === st) return { id:q.id, kind:"same-stem" };
  }
  return null;
}

/* ── records ── */
const now = () => Date.now();
function ensureState(D){
  D.authoring = D.authoring || {};
  D.bankPatches = D.bankPatches || {};
}
function getRecord(D, qid){ ensureState(D); return D.authoring[qid] || null; }

/* create a draft (new item, or a change-draft against a published item —
   editing a published item reopens it as a draft; the live bank copy keeps
   serving until the new version is published, and the outgoing item is
   snapshotted at that moment) */
/* Author an item and make it live in one step.

   There is no longer a review queue: the approval pipeline that kept AI-assisted
   drafts away from examinees until a reviewer signed off has been retired, so
   authoring an item publishes it. The two guarantees that actually protect
   examinees are kept and now run as the only gate:
     · validateItem — the schema + taxonomy contract
     · duplicateOf  — the same question cannot enter under a second id
   Anything overwritten is still snapshotted into history, so a live item can
   always be rolled back.                                                    */
function createDraft(NC, D, item, note, by){
  const errs = validateItem(item, NC);
  if (errs.length) return { errors: errs };
  ensureState(D);
  const prior = D.authoring[item.id];
  const dup = duplicateOf(NC, item, item.id);
  if (dup) return { errors:[`duplicates ${dup.id} (${dup.kind}) — edit that item instead, or give this one a ` +
                           `variantGroup so the two are served as alternates, never together`] };
  const ts = now();
  const rec = prior || { qid: item.id, status:"draft", version: 0, history: [], created: ts };
  if (NC.CASES.some(c=>c.items.some(i=>i.id===item.id)))
    return { errors:["qid collides with a case-study item"] };

  const outgoing = NC.BANK.find(q=>q.id===item.id);
  if (outgoing) rec.history.push({ version: rec.version, ts, event:"published-over", note: note||"", snapshot: outgoing });

  const idx = NC.BANK.findIndex(q=>q.id===item.id);
  if (idx >= 0) NC.BANK[idx] = item; else NC.BANK.push(item);

  rec.draft = item;
  rec.published = item;
  rec.version += 1;
  rec.status = "published";
  rec.by = actorOf(by).name;
  rec.updated = ts;
  rec.history.push({ version: rec.version, ts, event:"authored", note: note || "authored and published", snapshot: item });
  D.authoring[item.id] = rec;
  D.bankPatches[item.id] = { op:"set", item };
  return { record: rec };
}

/* edit a live item — publishes the new version immediately and snapshots the
   outgoing one into history so it can be rolled back. */
function updateDraft(NC, D, qid, item, note, by){
  const rec = getRecord(D, qid);
  if (!rec) return { errors:["no such record"] };
  const errs = validateItem(item, NC);
  if (errs.length) return { errors: errs };
  if (item.id !== qid) return { errors:["id cannot change on an existing item"] };
  const dup = duplicateOf(NC, item, qid);
  if (dup) return { errors:[`duplicates ${dup.id} (${dup.kind}) — edit that item instead, or give this one a ` +
                           `variantGroup so the two are served as alternates, never together`] };
  const ts = now();
  const outgoing = NC.BANK.find(q=>q.id===qid);
  if (outgoing) rec.history.push({ version: rec.version, ts, event:"published-over", note: note||"", snapshot: outgoing });
  const idx = NC.BANK.findIndex(q=>q.id===qid);
  if (idx >= 0) NC.BANK[idx] = item; else NC.BANK.push(item);
  rec.draft = item; rec.published = item; rec.version += 1; rec.status = "published";
  rec.by = actorOf(by).name; rec.updated = ts;
  rec.history.push({ version: rec.version, ts, event:"authored", note: note || "item updated", snapshot: item });
  D.bankPatches[qid] = { op:"set", item };
  return { record: rec };
}

/* workflow transition; publish/retired also mutate the live bank + patches */
function transition(NC, D, qid, to, note, by){
  const rec = getRecord(D, qid);
  if (!rec) return { errors:["no such record"] };
  if (!STATUSES.includes(to)) return { errors:["unknown status: "+to] };
  if (!TRANSITIONS[rec.status].includes(to))
    return { errors:[`illegal transition ${rec.status} → ${to} (allowed: ${TRANSITIONS[rec.status].join(", ")})`] };

  const actor = actorOf(by);
  ensureState(D);
  const ts = now();
  if (to === "published"){
    const errs = validateItem(rec.draft, NC);
    if (errs.length) return { errors:["cannot publish an invalid item: "+errs[0]] };
    const dup = duplicateOf(NC, rec.draft, qid);
    if (dup) return { errors:[`cannot publish: duplicates ${dup.id} (${dup.kind}) — retire that item first, ` +
                              `or set a shared variantGroup so they alternate instead of repeating`] };
    const existing = NC.BANK.find(q=>q.id===qid);
    if (existing) rec.history.push({ version: rec.version, ts, event:"published-over", note: note||"", snapshot: existing });
    else if (NC.CASES.some(c=>c.items.some(i=>i.id===qid))) return { errors:["qid collides with a case-study item"] };
    const idx = NC.BANK.findIndex(q=>q.id===qid);
    if (idx >= 0) NC.BANK[idx] = rec.draft; else NC.BANK.push(rec.draft);
    rec.version += 1;
    rec.status = "published";
    rec.published = rec.draft;
    D.bankPatches[qid] = { op:"set", item: rec.draft };
    rec.history.push({ version: rec.version, ts, event:"published", note: note||"", snapshot: rec.draft });
  } else if (to === "retired"){
    const existing = NC.BANK.find(q=>q.id===qid);
    if (existing) rec.history.push({ version: rec.version, ts, event:"retired", note: note||"", snapshot: existing });
    const idx = NC.BANK.findIndex(q=>q.id===qid);
    if (idx >= 0) NC.BANK.splice(idx, 1);
    rec.status = "retired";
    D.bankPatches[qid] = { op:"remove" };
  } else {
    rec.status = to;
    rec.history.push({ version: rec.version, ts, event: to, note: note||"" });
  }
  rec.by = actor.name;
  rec.updated = ts;
  return { record: rec };
}

/* ── bulk import: every item is validated, duplicate-checked, and published ── */
function importDrafts(NC, D, items, note, by){
  const created = [], errors = [];
  (Array.isArray(items) ? items : []).forEach((item, i) => {
    const r = createDraft(NC, D, item, (note||"bulk import") + ` #${i+1}`, by);
    if (r.errors) errors.push({ index:i, id: item && item.id, errors: r.errors });
    else created.push(item.id);
  });
  // a second copy INSIDE the batch is a duplicate too (createDraft only sees the bank)
  const seenFp = new Map(), seenStem = new Map(), dropped = [];
  for (let i=0;i<created.length;i++){
    const id = created[i], item = (Array.isArray(items)?items:[]).find(x=>x && x.id===id);
    if (!item) continue;
    const fp = normTxt(presented(item)), st = normTxt(item.stem);
    const clashWith = seenFp.get(fp) || seenStem.get(st);
    if (clashWith){
      dropped.push({ index: items.indexOf(item), id, errors:[`duplicates ${clashWith} inside this import — skipped`] });
      const rec = D.authoring[id]; if (rec) delete D.authoring[id];
      created.splice(i,1); i--; continue;
    }
    seenFp.set(fp, id); seenStem.set(st, id);
  }
  return { created, errors: errors.concat(dropped) };
}

/* full-fidelity export (includes keys — admin/trusted only) */
function exportAll(NC, D){
  ensureState(D);
  return {
    exportedAt: new Date().toISOString(),
    bank: NC.BANK,
    cases: NC.CASES,
    authoring: D.authoring,
    bankPatches: D.bankPatches
  };
}

/* boot: replay published/retired patches onto the freshly-loaded bank files */
function applyPatches(NC, D){
  ensureState(D);
  let set = 0, removed = 0;
  Object.entries(D.bankPatches).forEach(([qid, p]) => {
    if (p.op === "set"){
      const idx = NC.BANK.findIndex(q=>q.id===p.item.id);
      if (idx >= 0) NC.BANK[idx] = p.item; else NC.BANK.push(p.item);
      set++;
    } else if (p.op === "remove"){
      const idx = NC.BANK.findIndex(q=>q.id===qid);
      if (idx >= 0){ NC.BANK.splice(idx, 1); removed++; }
    }
  });
  return { set, removed };
}

/* summary for the admin queue table */
function queueSummary(D){
  ensureState(D);
  return Object.values(D.authoring)
    .sort((a,b)=>b.updated-a.updated)
    .map(r => ({ qid:r.qid, status:r.status, version:r.version, topic:r.draft?.topic, cn:r.draft?.cn,
                 t:r.draft?.t, updated:r.updated, by:r.by, histories:r.history.length }));
}

module.exports = { STATUSES, TRANSITIONS, validateItem, duplicateOf, createDraft, updateDraft,
                   transition, importDrafts, exportAll, applyPatches, queueSummary, getRecord, ID_RE };
