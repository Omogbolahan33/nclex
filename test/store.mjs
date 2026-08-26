/* Store contract tests: the same behavioural suite runs against
   (a) the JSON backend on a temp file, and
   (b) the Postgres adapter with a stubbed pg driver that records SQL.
   Real-database behaviour needs a live Postgres (see schema.sql) — this file
   verifies the INTERFACE contract and the SQL shape the adapter emits.        */
import fs from "fs"; import path from "path"; import url from "url";
const root = path.resolve(process.cwd());
let pass=0, fail=0;
const ok=(c,m)=>{ if(c) pass++; else { fail++; console.error("  ✗", m); } };
const after = ms => new Promise(r=>setTimeout(r,ms));

console.log("— JSON backend (temp file via RNREADY_STORE) —");
{
  const tmp = path.join(fs.mkdtempSync("/tmp/rnready-"), "store.json");
  process.env.RNREADY_STORE = tmp;              // must be set BEFORE require
  const store = (await import(url.pathToFileURL(path.join(root,"store-json.js")).href)).default;
  ok(store.FILE === tmp, "FILE honours RNREADY_STORE");

  const d1 = store.load();
  ok(d1 && typeof d1 === "object" && d1.users && d1.tokens && Array.isArray(d1.responses),
    "blank() shape on fresh load");
  d1.users["a@x.com"] = { email:"a@x.com", responses:[{qid:"MOC-001", score:1}] };
  d1.responses.push({ qid:"MOC-001", sid:"s1", score:1, answered:true });
  store.save();
  await after(400); // debounce window
  ok(fs.existsSync(tmp), "debounced save wrote the file");
  const onDisk = JSON.parse(fs.readFileSync(tmp,"utf8"));
  ok(onDisk.users["a@x.com"] && onDisk.responses.length===1, "roundtrip persists users + responses");

  // second instance sees the same doc (per-process singleton, fresh read)
  delete process.env.RNREADY_STORE;
  const raw = fs.readFileSync(tmp,"utf8");
  ok(JSON.parse(raw).users["a@x.com"].email === "a@x.com", "atomic write produced valid JSON");
}

console.log("— Postgres adapter v2 (normalized, in-memory fake pg) —");
{
  /* mini database: real row storage so migration, watermark appends and
     round-trips can be verified end-to-end without a live Postgres        */
  const db = { store:{}, meta:{}, users:{}, tokens:{}, responses:new Map(), sims:{}, seen:{}, authoring:{}, patches:{}, items:{}, cases:{} };
  let respSeq = 1;
  const inTx = [];
  class FakeClient {
    async query(q, p){
      q = String(q);
      if (q === "BEGIN" || q === "COMMIT" || q === "ROLLBACK"){ inTx.push(q); return; }
      return exec(q, p, true);
    }
    release(){}
  }
  class FakePool {
    async query(q, p){ return exec(String(q), p, false); }
    async connect(){ return new FakeClient(); }
  }
  function exec(q, p, inClient){
    // SELECTs
    if (q.startsWith("SELECT doc FROM store")) return { rows: Object.values(db.store) };
    if (q.startsWith("SELECT k, v FROM meta")) return { rows: Object.entries(db.meta).map(([k,v])=>({k,v})) };
    if (q.startsWith("SELECT email, hash, salt, profile")) return { rows: Object.values(db.users) };
    if (q.startsWith("SELECT token, email")) return { rows: Object.entries(db.tokens).map(([token,t])=>({token,...t})) };
    if (q.startsWith("SELECT id, doc")) return { rows: Object.values(db.sims) };
    if (q.startsWith("SELECT qid, n")) return { rows: Object.entries(db.seen).map(([qid,n])=>({qid,n})) };
    if (q.startsWith("SELECT qid, record")) return { rows: Object.entries(db.authoring).map(([qid,record])=>({qid,record})) };
    if (q.startsWith("SELECT qid, op, item")) return { rows: Object.entries(db.patches).map(([qid,x])=>({qid,...x})) };
    if (q.startsWith("SELECT qid, item FROM items")) return { rows: Object.entries(db.items).map(([qid,item])=>({qid,item})) };
    if (q.startsWith("SELECT cid, payload FROM cases")) return { rows: Object.entries(db.cases).map(([cid,payload])=>({cid,payload})) };
    if (q.startsWith("SELECT owner, sid, qid")) return { rows: [...db.responses.values()].sort((a,b)=>a.ts-b.ts) };
    if (q.startsWith("SELECT COALESCE(max(ts)")) return { rows: [{ m: Math.max(0, ...[...db.responses.values()].map(r=>r.ts)) }] };
    // meta upserts
    if (q.startsWith("INSERT INTO meta")){
      if (!p || !p.length){   // literal upserts (schema_version / migrated_v1)
        const m = q.match(/VALUES\s+\('([a-z_0-9]+)'(?:,'([^']*)')?/i);
        if (m) db.meta[m[1]] = m[2]===undefined ? true : (m[2]==='true' ? true : m[2]==='false' ? false : isNaN(+m[2]) ? m[2] : +m[2]);
        return {};
      }
      if (p.length === 1){    // literal-key upsert (calibration): value only
        const m = q.match(/VALUES\s+\('([a-z_0-9]+)'/i);
        if (m){ db.meta[m[1]] = JSON.parse(p[0]); return {}; }
      }
      const k = p[0], v = JSON.parse(p[1]);
      db.meta[k] = v; return {};
    }
    if (q.startsWith("INSERT INTO users")){
      db.users[p[0]] = { email:p[0], hash:p[1], salt:p[2], profile:JSON.parse(p[3]) }; return {};
    }
    if (q.startsWith("INSERT INTO tokens")){
      db.tokens[p[0]] = { email:p[1], expires:p[2] }; return {};
    }
    if (q.startsWith("INSERT INTO responses")){
      const key = p[0]+"|"+p[1]+"|"+p[2];
      const row = { id: db.responses.get(key)?.id || respSeq++, owner:p[0], sid:p[1], qid:p[2],
        ans:JSON.parse(p[3]), score:p[4], answered:p[5], ts:p[6], mode:p[7], time_ms:p[8], timed:p[9] };
      db.responses.set(key, row); return {};
    }
    if (q.startsWith("DELETE FROM responses")) return {};   // cap prune — no-op at this scale
    if (q.startsWith("INSERT INTO sims")){
      db.sims[p[0]] = { id:p[0], doc:JSON.parse(p[4]) }; return {};
    }
    if (q.startsWith("DELETE FROM sims")) return {};
    if (q.startsWith("INSERT INTO seen")){
      db.seen[p[0]] = p[1]; return {};
    }
    if (q.startsWith("INSERT INTO authoring_records")){
      db.authoring[p[0]] = JSON.parse(p[4]); return {};
    }
    if (q.startsWith("INSERT INTO bank_patches")){
      db.patches[p[0]] = { op:p[1], item:p[2]?JSON.parse(p[2]):null }; return {};
    }
    if (q.startsWith("DELETE FROM bank_patches")) return {};
    if (q.startsWith("INSERT INTO store")){
      db.store["state"] = { key:"state", doc:JSON.parse(p[1]) }; return {};
    }
    return { rows: [] };
  }
  const fakePg = { Pool: FakePool };
  const shimDir = path.join(root, "node_modules", "pg");
  // The shim is written over the real driver's path and torn down at the end
  // of this block, which would silently uninstall a genuine pg install that
  // db:migrate / db:seed / STORE=pg all need. Stash it and put it back.
  const backupDir = shimDir + ".real-backup";
  let restoreReal = false;
  if (fs.existsSync(shimDir)){
    try {
      const v = JSON.parse(fs.readFileSync(path.join(shimDir,"package.json"),"utf8")).version;
      if (v !== "0.0.0-stub"){
        fs.rmSync(backupDir, { recursive:true, force:true });
        fs.renameSync(shimDir, backupDir);
        restoreReal = true;
      }
    } catch(e){}
  }
  fs.mkdirSync(shimDir, { recursive:true });
  fs.writeFileSync(path.join(shimDir, "package.json"), JSON.stringify({ name:"pg", version:"0.0.0-stub", main:"index.js" }));
  fs.writeFileSync(path.join(shimDir, "index.js"), "module.exports = globalThis.__FAKE_PG__;");
  globalThis.__FAKE_PG__ = fakePg;

  /* v1 legacy document row present, tables empty → automatic migration */
  const LEGACY = { users:{ "b@x.com": { email:"b@x.com", hash:"h", salt:"s", theta:0.4, responses:[{qid:"PHA-001",sid:"u1",ts:100,score:0,answered:true}] } },
                   tokens:{ t1:{ email:"b@x.com", expires: Date.now()+864e5 } },
                   sims:[{ id:"simA", examId:"rn-preview-sim", status:"done", theta:1.2, administered:[] }],
                   responses:[{qid:"PHA-001",sid:"srv:s2",mode:"practice",ans:[0],score:0,answered:true,ts:50,timeMs:9000,timed:false}],
                   seen:{ "MOC-001": 7 }, authoring:{ "ZZZ-100":{qid:"ZZZ-100",status:"review",version:0,history:[],by:"Kim"} },
                   bankPatches:{ "ZZZ-100":{op:"set",item:{id:"ZZZ-100"}} }, calibration:{ generated: 123, items:[] } };
  db.store["state"] = { key:"state", doc: JSON.parse(JSON.stringify(LEGACY)) };

  const storePg = (await import(url.pathToFileURL(path.join(root,"store-pg.js")).href)).default;
  const d = storePg.load();
  await storePg.loadAsync();
  ok(d.users["b@x.com"] && d.users["b@x.com"].theta===0.4, "migration: user + profile rebuilt from tables");
  ok(d.users["b@x.com"].responses.length===1 && d.users["b@x.com"].responses[0].qid==="PHA-001", "migration: user-owned response row attached");
  ok(d.responses.length===1 && d.responses[0].sid==="srv:s2", "migration: doc-level calibration feed rebuilt");
  ok(d.tokens.t1 && d.tokens.t1.email==="b@x.com", "migration: tokens table → map");
  ok(d.sims.length===1 && d.sims[0].id==="simA", "migration: sims row → array");
  ok(d.seen["MOC-001"]===7, "migration: exposure counters rebuilt");
  ok(d.authoring["ZZZ-100"]?.status==="review" && d.bankPatches["ZZZ-100"]?.op==="set", "migration: authoring + patches rebuilt");
  ok(d.calibration?.generated===123, "migration: calibration report from meta");
  ok(db.meta.schema_version===2 && db.meta.migrated_v1===true, "migration: schema_version + migrated flag written");
  ok(db.users["b@x.com"] && db.responses.size===2, "migration: normalized rows physically written");
  ok(storePg.FILE === "postgres:state", "FILE labels the backend");

  /* append watermark: only responses newer than the last flush are inserted */
  const insertsBefore = respSeq;
  d.responses.push({ qid:"MOC-002", sid:"srv:s2", mode:"practice", ans:1, score:1, answered:true, ts:900, timeMs:4000, timed:false });
  await storePg.saveNow();
  const rows = [...db.responses.values()];
  ok(rows.length===3 && rows.some(r=>r.qid==="MOC-002" && r.owner==="doc"), "flush appends only fresh responses");
  ok(db.sims.simA && db.store["state"].doc.responses.length===2, "flush keeps sims + legacy backup doc in sync");
  const seqAfter = respSeq;
  await storePg.saveNow();   // no new data → no new response rows
  ok(respSeq===seqAfter, "watermark prevents duplicate response inserts");
  ok(inTx.includes("BEGIN") && inTx.includes("COMMIT") && inTx[inTx.length-1]!=="ROLLBACK", "flushes wrapped in committed transactions");

  /* replace-on-reanswer: same (owner,sid,qid) updates in place, no new row */
  d.responses = d.responses.map(r => r.sid==="srv:s2" && r.qid==="PHA-001" ? { ...r, score:1, ts:1000 } : r);
  await storePg.saveNow();
  ok([...db.responses.values()].filter(r=>r.qid==="PHA-001" && r.owner==="doc").length===1, "re-answer upserts the same row (UNIQUE owner,sid,qid)");

  /* second instance rebuilds purely from tables (no legacy dependency) */
  db.store["state"] = { key:"state", doc:{ users:{}, tokens:{}, sims:[], responses:[] } };
  storePg._reset();
  const d2 = storePg.load();
  await storePg.loadAsync();
  ok(d2.users["b@x.com"] && d2.responses.length===2, "boot #2 rebuilds from normalized tables alone");

  /* content bank: items/cases tables are READ into the doc, and never written
     back by a flush — the server must not clobber a row edited in SQL */
  db.items["MOC-001"] = { id:"MOC-001", t:"single", stem:"from the database", opts:["a","b"], ans:0 };
  db.items["NEW-001"] = { id:"NEW-001", t:"single", stem:"db-only item", opts:["a","b"], ans:1 };
  db.cases["CASE-DB-1"] = { id:"CASE-DB-1", title:"db case", items:[] };
  storePg._reset();
  const d3 = storePg.load();
  await storePg.loadAsync();
  ok(Array.isArray(d3.items) && d3.items.length===2, "items table read into doc.items ("+(d3.items||[]).length+")");
  ok(d3.items.some(i=>i.id==="MOC-001") && d3.items.some(i=>i.id==="NEW-001"), "both overriding and db-only items surface");
  ok(Array.isArray(d3.cases) && d3.cases.length===1 && d3.cases[0].id==="CASE-DB-1", "cases table read into doc.cases");

  const itemsSnapshot = JSON.stringify(db.items), casesSnapshot = JSON.stringify(db.cases);
  d3.responses.push({ qid:"MOC-003", sid:"srv:s9", mode:"practice", ans:1, score:1, answered:true, ts:5000, timeMs:1000, timed:false });
  await storePg.saveNow();
  ok(JSON.stringify(db.items)===itemsSnapshot, "flush never rewrites the items table (SQL edits survive)");
  ok(JSON.stringify(db.cases)===casesSnapshot, "flush never rewrites the cases table");
  ok(!db.store["state"].doc.items && !db.store["state"].doc.cases, "legacy backup row omits items/cases to prevent document bloat");

  /* write coalescing: multiple rapid save calls do not spawn unbounded promises */
  for (let i=0; i<30; i++){
    d3.seen["RAPID-"+i] = i;
    storePg.save();
  }
  await storePg.saveNow();
  ok(db.seen["RAPID-29"] === 29, "coalesced flush writes latest state");

  /* empty content tables must not wipe the in-repo baseline */
  db.items = {}; db.cases = {};
  storePg._reset();
  const d4 = storePg.load();
  await storePg.loadAsync();
  ok(Array.isArray(d4.items) && d4.items.length===0, "empty items table yields an empty overlay, not a crash");

  /* dead database: logged, never thrown */
  globalThis.__FAKE_PG__ = { Pool: function(){ return { query: async ()=>{ throw new Error("connection lost"); }, connect: async ()=>{ throw new Error("down"); } }; } };
  storePg._reset();
  const quiet = storePg.load();
  await storePg.saveNow(); await after(50);
  ok(typeof quiet.users === "object", "adapter survives a dead database (logged, no crash)");

  fs.rmSync(shimDir, { recursive:true, force:true });
  if (restoreReal) fs.renameSync(backupDir, shimDir);   // real driver back in place
}

console.log("— dispatcher —");
{
  const disp = (await import(url.pathToFileURL(path.join(root,"store.js")).href)).default;
  ok(typeof disp.load==="function" && typeof disp.save==="function" && typeof disp.saveNow==="function",
    "default backend exposes the contract");
}

console.log(`${pass} passed, ${fail} failed`);
process.exit(fail?1:0);
