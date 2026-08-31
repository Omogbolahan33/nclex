/* RN Ready — Postgres store adapter v2: PER-TABLE NORMALIZED (STORE=pg).
   Same interface as store-json.js (load · loadAsync · save · saveNow · FILE),
   so server.js and the engine need no changes — but every growing collection
   is persisted as real rows (see schema.sql):

     users · tokens · responses · sims · seen · authoring_records · bank_patches · meta

   Read path:  loadAsync() rebuilds the state doc from the tables; a legacy v1
   document row (single JSONB) is migrated into the tables on first boot.
   Write path: flush() runs one transaction — table upserts, append/upsert of
   responses newer than the last written timestamp, exposure counters, the
   authoring pipeline, and a legacy `store` doc row kept as backup + migration
   source (so rollback to v1 remains possible).

   Contract notes:
   - save() debounces at 250 ms exactly like the JSON backend; saveNow() awaits.
   - responses rows use UNIQUE(owner, sid, qid) + ON CONFLICT DO UPDATE to
     mirror the engine's replace-on-re-answer semantics; ts is the watermark.
   - owner='doc' rows feed server-side calibration (capped at 20k like v1);
     per-user rows carry the owner email.
   - A dead database logs and never throws (exam uptime outranks durability).

   Requires the `pg` driver: npm i pg   (not bundled — zero-dep default stays). */
const CONN = process.env.DATABASE_URL || "";
/* TLS: managed Postgres (Supabase, Render, RDS) requires it. PGSSL=off|require|verify
   overrides; otherwise supabase/pooler hosts are auto-detected. */
function sslOpts(){
  const auto = /supabase[.]com|[.]supabase[.]co|render[.]com|amazonaws[.]com/i.test(CONN) ? "require" : "";
  const mode = (process.env.PGSSL || "").toLowerCase() || auto;
  if (mode === "off") return undefined;
  if (mode === "verify") return { rejectUnauthorized:true };
  if (mode === "require") return { rejectUnauthorized:false };  // managed-CAs w/o pinning
  return undefined;
}
const POOL_OPTS = {
  connectionString: process.env.DATABASE_URL,
  max: Number(process.env.PG_POOL_MAX || 5),
  idleTimeoutMillis: 30000,
  ssl: sslOpts()
};
const KEY = process.env.PG_STORE_KEY || "state";
const DOC_CAP = 20000;

let pg = null, pool = null, data = null, timer = null;
let isFlushing = false, pendingFlush = false, waiters = [];
let watermarkTs = 0, tablesRead = false;

function drv(){
  if (pg) return pg;
  try { pg = require("pg"); }
  catch(e){
    // Unrecoverable: unlike a network blip this can never resolve by retrying,
    // so it must abort the boot rather than degrade to an in-memory store.
    const err = new Error("STORE=pg but the pg driver is not installed — run: npm i pg");
    err.fatal = true; throw err;
  }
  return pg;
}
function getPool(){ if (!pool){ drv(); pool = new pg.Pool(POOL_OPTS); } return pool; }

function blank(){ return { users:{}, tokens:{}, sims:[], responses:[] }; }
const profOf = u => { const p = { ...u }; delete p.hash; delete p.salt; delete p.responses; return p; };

/* ── table → doc rebuild ─────────────────────────────────────────────── */
async function readTables(){
  const q = async s => (await getPool().query(s)).rows;
  const [metaR, usersR, tokensR, simsR, seenR, authR, patchR, respR, itemsR, casesR] = await Promise.all([
    q("SELECT k, v FROM meta"),
    q("SELECT email, hash, salt, profile FROM users"),
    q("SELECT token, email, expires FROM tokens"),
    q("SELECT id, doc FROM sims"),
    q("SELECT qid, n FROM seen"),
    q("SELECT qid, record FROM authoring_records"),
    q("SELECT qid, op, item FROM bank_patches"),
    q(`SELECT owner, sid, qid, ans, score, answered, ts, mode, time_ms, timed
       FROM responses ORDER BY ts ASC`),   // both owners; split in docFromTables
    q("SELECT qid, item FROM items"),
    q("SELECT cid, payload FROM cases"),
  ]);
  return { metaR, usersR, tokensR, simsR, seenR, authR, patchR, respR, itemsR, casesR };
}
function rowToResponse(r){
  return { qid:r.qid, sid:r.sid, mode:r.mode, ans:r.ans, score:r.score,
           answered:r.answered, ts:Number(r.ts), timeMs:r.time_ms, timed:r.timed };
}
function docFromTables(t){
  const doc = blank();
  doc.users = {};
  t.usersR.forEach(u => { doc.users[u.email] = { email:u.email, hash:u.hash, salt:u.salt,
    ...(u.profile||{}), responses:[] }; });
  t.respR.filter(r => r.owner && doc.users[r.owner])
         .forEach(r => doc.users[r.owner].responses.push(rowToResponse(r)));
  doc.responses = t.respR.filter(r => r.owner === "doc").map(rowToResponse).slice(-DOC_CAP);
  doc.tokens = {}; t.tokensR.forEach(x => { doc.tokens[x.token] = { email:x.email, expires:Number(x.expires) }; });
  doc.sims = t.simsR.map(x => x.doc).filter(Boolean);
  doc.seen = {}; t.seenR.forEach(x => { doc.seen[x.qid] = x.n; });
  doc.authoring = {}; t.authR.forEach(x => { doc.authoring[x.qid] = x.record; });
  doc.bankPatches = {}; t.patchR.forEach(x => { doc.bankPatches[x.qid] = { op:x.op, item:x.item }; });
  doc.items = (t.itemsR||[]).map(x => x.item).filter(Boolean);
  doc.cases = (t.casesR||[]).map(x => x.payload).filter(Boolean);
  t.metaR.forEach(m => {
    if (m.k === "calibration" && m.v) doc.calibration = m.v;
  });
  return doc;
}
async function readLegacy(){
  const r = await getPool().query("SELECT doc FROM store WHERE key = $1", [KEY]);
  return r.rows && r.rows[0] ? r.rows[0].doc : null;
}

/* ── doc → tables (one transaction) ─────────────────────────────────── */
async function writeTables(client, doc){
  const J = JSON.stringify;
  const upsert = (sql, params) => client.query(sql, params);

  await upsert(`INSERT INTO meta (k, v, updated_at) VALUES ('schema_version','2',now())
                ON CONFLICT (k) DO UPDATE SET v='2', updated_at=now()`, []);

  /* users + their responses */
  const userResp = [];
  for (const [email, u] of Object.entries(doc.users||{})){
    await upsert(`INSERT INTO users (email, hash, salt, profile, updated_at)
                  VALUES ($1,$2,$3,$4::jsonb,now())
                  ON CONFLICT (email) DO UPDATE SET hash=$2, salt=$3, profile=$4::jsonb, updated_at=now()`,
                  [email, u.hash||null, u.salt||null, J(profOf(u))]);
    (u.responses||[]).forEach(r => userResp.push({ owner:email, ...r }));
  }
  /* tokens */
  for (const [token, t] of Object.entries(doc.tokens||{})){
    await upsert(`INSERT INTO tokens (token, email, expires) VALUES ($1,$2,$3)
                  ON CONFLICT (token) DO UPDATE SET email=$2, expires=$3`,
                  [token, t.email, Number(t.expires||0)]);
  }
  /* responses: append/upsert everything newer than the watermark */
  const allResp = [ ...(doc.responses||[]).map(r=>({ owner:"doc", ...r })), ...userResp ];
  const fresh = allResp.filter(r => Number(r.ts||0) > watermarkTs);
  for (const r of fresh){
    await upsert(`INSERT INTO responses (owner, sid, qid, ans, score, answered, ts, mode, time_ms, timed)
                  VALUES ($1,$2,$3,$4::jsonb,$5,$6,$7,$8,$9,$10)
                  ON CONFLICT (owner, sid, qid) DO UPDATE
                  SET ans=$4::jsonb, score=$5, answered=$6, ts=$7, mode=$8, time_ms=$9, timed=$10`,
                  [r.owner||"doc", String(r.sid||""), r.qid, J(r.ans||null), r.score!=null?r.score:null,
                   !!r.answered, Number(r.ts||Date.now()), r.mode||null, r.timeMs|r.time_ms|0, !!r.timed]);
    watermarkTs = Math.max(watermarkTs, Number(r.ts||0));
  }
  /* keep the doc-level calibration feed capped, like v1 */
  await upsert(`DELETE FROM responses WHERE owner='doc' AND id IN
                (SELECT id FROM responses WHERE owner='doc' ORDER BY ts DESC OFFSET ${DOC_CAP})`, []);
  /* sims: upsert current, drop rows for sims no longer present */
  const simIds = (doc.sims||[]).map(s => s.id).filter(Boolean);
  for (const s of (doc.sims||[])){
    if (!s.id) continue;
    await upsert(`INSERT INTO sims (id, exam_id, status, theta, doc, updated_at)
                  VALUES ($1,$2,$3,$4,$5::jsonb,now())
                  ON CONFLICT (id) DO UPDATE SET exam_id=$2, status=$3, theta=$4, doc=$5::jsonb, updated_at=now()`,
                  [s.id, s.examId||s.exam_id||null, s.status||"open", typeof s.theta==="number"?s.theta:0, J(s)]);
  }
  if (simIds.length)
    await upsert(`DELETE FROM sims WHERE id <> ALL($1::text[])`, [simIds]);
  /* exposure counters */
  for (const [qid, n] of Object.entries(doc.seen||{})){
    await upsert(`INSERT INTO seen (qid, n) VALUES ($1,$2)
                  ON CONFLICT (qid) DO UPDATE SET n=$2`, [qid, Number(n)||0]);
  }
  /* authoring pipeline + bank patches (full key sync) */
  for (const [qid, rec] of Object.entries(doc.authoring||{})){
    await upsert(`INSERT INTO authoring_records (qid, status, version, updated_by, record, updated_at)
                  VALUES ($1,$2,$3,$4,$5::jsonb,now())
                  ON CONFLICT (qid) DO UPDATE SET status=$2, version=$3, updated_by=$4, record=$5::jsonb, updated_at=now()`,
                  [qid, rec.status||"draft", rec.version|0, rec.by||null, J(rec)]);
  }
  const patchIds = Object.keys(doc.bankPatches||{});
  for (const [qid, p] of Object.entries(doc.bankPatches||{})){
    await upsert(`INSERT INTO bank_patches (qid, op, item) VALUES ($1,$2,$3::jsonb)
                  ON CONFLICT (qid) DO UPDATE SET op=$2, item=$3::jsonb`,
                  [qid, p.op, p.item ? J(p.item) : null]);
  }
  if (patchIds.length)
    await upsert(`DELETE FROM bank_patches WHERE qid <> ALL($1::text[])`, [patchIds]);
  /* calibration report */
  if (doc.calibration){
    await upsert(`INSERT INTO meta (k, v, updated_at) VALUES ('calibration',$1::jsonb,now())
                  ON CONFLICT (k) DO UPDATE SET v=$1::jsonb, updated_at=now()`, [J(doc.calibration)]);
  }
  /* legacy backup row: keeps v1 rollback + store_doc_size() meaningful */
  const backupDoc = { ...doc };
  delete backupDoc.items;
  delete backupDoc.cases;
  await upsert(`INSERT INTO store (key, doc, updated_at) VALUES ($1,$2::jsonb,now())
                ON CONFLICT (key) DO UPDATE SET doc=$2::jsonb, updated_at=now()`, [KEY, J(backupDoc)]);
}

/* ── public contract ────────────────────────────────────────────────── */
async function loadAsync(){
  const q = s => getPool().query(s);
  try {
    const legacy = await readLegacy().catch(()=>null);
    const t = await readTables();
    const empty = !t.usersR.length && !t.tokensR.length && !t.simsR.length &&
                  !t.seenR.length && !t.authR.length && !t.patchR.length && !t.respR.length;
    let doc;
    if (empty && legacy && typeof legacy === "object"){
      // one-time v1 → v2 migration: rows are born from the document
      const client = await getPool().connect();
      try { await client.query("BEGIN"); await writeTables(client, legacy);
            await client.query("INSERT INTO meta (k,v,updated_at) VALUES ('migrated_v1','true',now()) ON CONFLICT (k) DO NOTHING");
            await client.query("COMMIT");
      } catch(e){ await client.query("ROLLBACK").catch(()=>{}); throw e; }
      finally { client.release(); }
      const t2 = await readTables();
      doc = docFromTables(t2);
    } else {
      doc = docFromTables(t);
      // non-normalized root keys (if any) survive from the legacy backup row
      if (legacy && typeof legacy === "object")
        for (const k of Object.keys(legacy))
          if (!(k in doc) && k !== "v") doc[k] = legacy[k];
    }
    const maxTs = await q("SELECT COALESCE(max(ts),0) AS m FROM responses");
    watermarkTs = Number(maxTs.rows?.[0]?.m || 0);
    tablesRead = true;
    if (!data) data = blank();
    for (const k of ["users","tokens","sims","responses","seen","authoring","bankPatches","calibration","items","cases"])
      delete data[k];
    Object.assign(data, doc);
    data.users = data.users || {}; data.tokens = data.tokens || {};
    data.sims = data.sims || []; data.responses = data.responses || [];
    return data;
  } catch(e){
    // Transient failures (network, restarting database) fall back to the
    // in-memory doc and reconcile on the next read. Fatal ones must not:
    // serving with a blank store silently discards every write.
    if (e && e.fatal) throw e;
    console.error("[store-pg] loadAsync failed:", e.message);
    return data || (data = blank());
  }
}
function load(){
  if (data) return data;
  data = blank();
  loadAsync().catch(e=>{ // reconciles as soon as the database answers
    if (e && e.fatal){ console.error("[fatal] store init failed:", e.message); process.exit(1); }
  });
  return data;
}

function snapshot(doc){
  const src = doc || blank();
  return {
    users: src.users ? JSON.parse(JSON.stringify(src.users)) : {},
    tokens: src.tokens ? JSON.parse(JSON.stringify(src.tokens)) : {},
    sims: src.sims ? JSON.parse(JSON.stringify(src.sims)) : [],
    responses: src.responses ? src.responses.slice(-DOC_CAP) : [],
    seen: src.seen ? { ...src.seen } : {},
    authoring: src.authoring ? JSON.parse(JSON.stringify(src.authoring)) : {},
    bankPatches: src.bankPatches ? JSON.parse(JSON.stringify(src.bankPatches)) : {},
    calibration: src.calibration ? JSON.parse(JSON.stringify(src.calibration)) : undefined
  };
}

function save(){
  if (timer) return;
  timer = setTimeout(()=>{ timer = null; triggerFlush(); }, 250);
}

function saveNow(){
  if (timer){ clearTimeout(timer); timer = null; }
  return new Promise((resolve, reject) => {
    waiters.push({ resolve, reject });
    triggerFlush();
  });
}

function triggerFlush(){
  if (isFlushing){
    pendingFlush = true;
    return;
  }
  isFlushing = true;
  pendingFlush = false;
  const currentWaiters = waiters;
  waiters = [];

  const snap = snapshot(data);
  writeDb(snap)
    .then(() => {
      currentWaiters.forEach(w => w.resolve());
    })
    .catch(e => {
      console.error("[store-pg] save failed:", e.message);
      currentWaiters.forEach(w => w.resolve());
    })
    .finally(() => {
      isFlushing = false;
      if (pendingFlush || waiters.length > 0){
        triggerFlush();
      }
    });
}

async function writeDb(snap){
  const client = await getPool().connect();
  try {
    await client.query("BEGIN");
    await writeTables(client, snap);
    await client.query("COMMIT");
  } catch(e){
    await client.query("ROLLBACK").catch(()=>{});
    throw e;
  } finally { client.release(); }
}

module.exports = { load, loadAsync, save, saveNow, FILE: "postgres:"+KEY, EPHEMERAL: false,
  connected: () => tablesRead,
  _reset(){
    data = null;
    if (timer){ clearTimeout(timer); timer = null; }
    isFlushing = false;
    pendingFlush = false;
    waiters = [];
    watermarkTs = 0;
    tablesRead = false;
  }
};
