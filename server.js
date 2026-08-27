/* RN Ready — exam server (version lives in package.json; zero runtime dependencies).
   - Admin authoring: draft → review → approved → published, with versioning
   - Serves the key-free app from public/ (bank/rationales never leave the server)
   - Server-side scoring + server-side CAT simulation
   - Accounts (scrypt password hashing, bearer tokens) + progress sync
   - JSON-file persistence: users, tokens, sims, response log survive restarts
   - Rate limiting, gzip, health endpoint                                                */
const http = require("http"), fs = require("fs"), path = require("path"), vm = require("vm"),
      crypto = require("crypto"), zlib = require("zlib");
const ROOT = __dirname, PUB = path.join(ROOT, "public");
const store = require("./store");
const calibrate = require("./calibrate");
const authoring = require("./authoring.js");
const ADMIN_KEY = process.env.ADMIN_KEY || "dev-admin"; // set ADMIN_KEY in production!

/* ── DEMO_BANK switch (set it in the Render dashboard, e.g. DEMO_BANK=1) ──
   true  → the server serves ONLY the demo/practice question set (the 128
           attached items, seeded into the `items`/`cases` tables by
           `npm run db:seed:demo`; falls back to the bundled demo/ files
           when the database has no demo rows).
   false/unset → the regular bank is served as before, and any demo rows
           present in the database are ignored.
   Demo ids are recognizable by prefix: items DEMO-*, cases CASE-DEMO-*.  */
const DEMO_BANK = /^(1|true|yes|on)$/i.test(process.env.DEMO_BANK || "");
if (!process.env.ADMIN_KEY && process.env.NODE_ENV === "production"){
  console.error("[fatal] NODE_ENV=production but ADMIN_KEY is not set — refusing to start.");
  process.exit(1);
}
if (!process.env.ADMIN_KEY) console.warn("[warn] ADMIN_KEY not set — using dev default");

/* ── role principals (v3k): ADMIN_KEY stays break-glass admin; AUTH_KEYS adds
   narrowly-scoped staff keys.  Format:  AUTH_KEYS="key:role:name,key:role:name"
   roles: author · reviewer · publisher · editor (see authoring.ACTIONS).
   Read endpoints accept any principal; writes are gated per role.            */
const PRINCIPALS = new Map([[ADMIN_KEY, { role:"admin", name:"admin" }]]);
for (const part of (process.env.AUTH_KEYS||"").split(",")){
  const t = part.trim(); if (!t) continue;
  const [key, role, name] = t.split(":");
  if (!key || !authoring.ROLES.includes(role||"")) continue;
  if (key === ADMIN_KEY) continue; // admin key role is fixed
  PRINCIPALS.set(key, { role, name: name || role });
}
const principal = req => PRINCIPALS.get(req.headers["x-admin-key"]) || null;
const guard = (req, res, action) => {
  const p = principal(req);
  if (!p) { json(res, 401, { error: "valid X-Admin-Key required" }, req); return null; }
  if (action && !authoring.can(p, action)) { json(res, 403, { error: `role '${p.role}' lacks '${action}' permission`, you:{ name:p.name, role:p.role } }, req); return null; }
  return p;
};

/* ── boot the engine sandbox-side (taxonomy → banks → cases → engine) ── */
const ctx = { console, Math, JSON, Date, Set, Map, Array, Object, Number, String, parseInt, parseFloat, isNaN, setTimeout, clearTimeout };
ctx.globalThis = ctx; ctx.window = ctx;
vm.createContext(ctx);
{ const { contentFiles } = require("./content");
  for (const f of ["js/taxonomy.js", ...contentFiles().all, "js/engine.js"])
  vm.runInContext(fs.readFileSync(path.join(ROOT,f),"utf8"), ctx, {filename:f});
}
const NC = ctx.window.NC;
const engState = vm.runInContext("NC.load()", ctx);

/* ── persistence: engine state ↔ store, hooked through NC.save ── */
const D = store.load();
function hydrate(){ // links live engine refs to the persisted doc (re-runnable for async stores)
  if (Array.isArray(D.sims) && D.sims.length) engState.sims = D.sims;
  if (Array.isArray(D.responses) && D.responses.length) engState.responses = D.responses;
  if (D.seen && typeof D.seen === "object") engState.seen = D.seen; // item exposure counts
  NC.save = function(){ // engine calls this after every mutation
    D.sims = engState.sims;
    D.responses = engState.responses.slice(-20000); // calibration feed (v3b)
    D.seen = engState.seen;
    store.save();
  };
  // Content bank from the database (STORE=pg), overlaid on the in-repo
  // baseline: a row replaces the item sharing its id, or is appended when the
  // id is new. Seed the tables with `npm run db:seed`. An empty or unreachable
  // database simply leaves the repo bank in place, so the app still boots.
  // Authoring patches apply after this, keeping the governed pipeline on top.
  //
  // DEMO_BANK (see the switch near the top): when on, the bank is REPLACED by
  // the demo set — database rows first, bundled demo/ files as fallback.
  // When off, demo rows (DEMO-*) are filtered out even if they are in the
  // database, so the switch is the single source of truth.
  const demoItem = it => typeof it.id === "string" && (it.id.startsWith("DEMO-"));
  const demoCase = c => typeof c.id === "string" && (c.id.startsWith("CASE-DEMO"));
  const dbItems = (Array.isArray(D.items) ? D.items : []).filter(x => x && x.id);
  const dbCases = (Array.isArray(D.cases) ? D.cases : []).filter(x => x && x.id);
  if (DEMO_BANK){
    let items = dbItems.filter(demoItem), cases = dbCases.filter(demoCase);
    const from = [];
    if (items.length) from.push("items:database"); else { items = require("./demo/bank.demo.js"); from.push("items:bundled demo file"); }
    if (cases.length) from.push("cases:database"); else { cases = require("./demo/cases.demo.js"); from.push("cases:bundled demo file"); }
    NC.BANK.length = 0; NC.BANK.push(...items);
    NC.CASES.length = 0; NC.CASES.push(...cases);
    console.log(`DEMO_BANK on — serving the demo set only: ${NC.BANK.length} items + ${NC.CASES.length} cases (source: ${from.join(" · ")})`);
  } else {
    const dItems = dbItems.filter(demoItem).length, dCases = dbCases.filter(demoCase).length;
    if (dItems || dCases) console.log(`DEMO_BANK off — ignoring ${dItems} demo item(s) and ${dCases} demo case(s) present in the database`);
    {
      let replaced = 0, added = 0;
      for (const it of dbItems.filter(x => !demoItem(x))){
        const i = NC.BANK.findIndex(q => q.id === it.id);
        if (i >= 0){ NC.BANK[i] = it; replaced++; } else { NC.BANK.push(it); added++; }
      }
      if (replaced || added) console.log(`bank from database: ${replaced} replaced, ${added} added (${NC.BANK.length} items live)`);
    }
    {
      let replaced = 0, added = 0;
      for (const c of dbCases.filter(x => !demoCase(x))){
        const i = NC.CASES.findIndex(x => x.id === c.id);
        if (i >= 0){ NC.CASES[i] = c; replaced++; } else { NC.CASES.push(c); added++; }
      }
      if (replaced || added) console.log(`cases from database: ${replaced} replaced, ${added} added (${NC.CASES.length} cases live)`);
    }
  }
  if (D.bankPatches && Object.keys(D.bankPatches).length){
    if (DEMO_BANK) console.log("DEMO_BANK on — authoring patches skipped (demo set is served verbatim)");
    else {
      const rep = authoring.applyPatches(NC, D);
      console.log(`re-applied authoring patches: ${rep.set} set, ${rep.removed} removed`);
    }
  }
  if (D.calibration && Array.isArray(D.calibration.items)){
    if (DEMO_BANK) console.log("DEMO_BANK on — calibration overlay skipped (demo set keeps authored difficulty)");
    else {
      const n = calibrate.apply(NC, D.calibration);
      console.log(`re-applied calibration: ${n} items on empirical difficulty (${new Date(D.calibration.generated).toISOString()})`);
    }
  }
}

/* ── sanitizers: strip answer keys & rationales ── */
function sanitizeItem(q){
  const c = Object.assign({}, q);
  delete c.ans; delete c.rat;
  if (c.groups) c.groups = c.groups.map(g=>{ const x=Object.assign({},g); delete x.ans; return x; });
  if (c.cloze)  c.cloze  = { lines: c.cloze.lines.map(l=>{ const x=Object.assign({},l); delete x.ans; return x; }) };
  if (c.drag)   c.drag   = { targets: c.drag.targets.slice(), opts: c.drag.opts.slice() };
  if (c.hotspot)c.hotspot= { mode: c.hotspot.mode, rows: c.hotspot.rows.slice() };
  if (c.matrix) c.matrix = { cols: c.matrix.cols.slice(), mode: c.matrix.mode, rows: c.matrix.rows.slice() };
  return c;
}
const sanitizeCase = c => c ? Object.assign({}, c, { items: (c.items || []).map(sanitizeItem) }) : null;

/* ── static: whitelist of key-free files only ── */
const STATIC = {
  "/":            ["index-app.html","text/html"],
  "/index.html":  ["index-app.html","text/html"],
  "/css/app.css": ["css/app.css","text/css"],
  "/js/taxonomy.js": ["js/taxonomy.js","text/javascript"],
  "/js/engine.js":   ["js/engine.js","text/javascript"],
  "/js/render.js":   ["js/render.js","text/javascript"],
  "/js/ui.js":       ["js/ui.js","text/javascript"],
  "/js/api.js":      ["js/api.js","text/javascript"],
  "/js/main.js":     ["js/main.js","text/javascript"],
  "/js/notify.js":   ["js/notify.js","text/javascript"],
  "/sw.js":          ["sw.js","text/javascript"],
  "/manifest.webmanifest": ["manifest.webmanifest","application/manifest+json"],
  "/icon.svg":       ["icon.svg","image/svg+xml"]
};
function serveStatic(req,res,urlPath){
  const hit = STATIC[urlPath];
  if (!hit){ res.writeHead(404,{"Content-Type":"text/plain"}); return res.end("Not found"); }
  fs.readFile(path.join(PUB, hit[0]), (e,buf)=>{
    if (e){ res.writeHead(500); return res.end("missing build — run: node build-online.mjs"); }
    res.writeHead(200,{"Content-Type":hit[1],"Cache-Control":"no-cache"});
    res.end(buf);
  });
}

/* ── helpers ── */
function json(res, code, obj, req){
  const buf = Buffer.from(JSON.stringify(obj));
  const enc = (req && req.headers && req.headers["accept-encoding"]) || "";
  if (typeof enc === "string" && enc.includes("gzip") && buf.length > 2048){
    res.writeHead(code, {"Content-Type":"application/json","Content-Encoding":"gzip","Cache-Control":"no-store"});
    return res.end(zlib.gzipSync(buf));
  }
  res.writeHead(code, {"Content-Type":"application/json","Cache-Control":"no-store"});
  res.end(buf);
}
async function body(req){
  return new Promise((resolve)=>{
    let b=""; req.on("data",c=>{ b+=c; if (b.length>1e6){ req.destroy(); resolve({}); } });
    req.on("end", ()=>{ try{ resolve(JSON.parse(b||"{}")); }catch(e){ resolve({}); } });
    req.on("error", ()=>resolve({}));
  });
}

/* ── rate limiting (per-IP token buckets) ── */
const buckets = {};
function limited(bucket, key, max, windowMs){
  const now = Date.now();
  const b = buckets[bucket] || (buckets[bucket]={});
  const rec = b[key] || (b[key]={ n:0, reset: now+windowMs });
  if (now > rec.reset){ rec.n = 0; rec.reset = now+windowMs; }
  rec.n++;
  return rec.n > max;
}
function sweepBuckets(){
  const now = Date.now();
  for (const b of Object.values(buckets)){
    for (const [k, rec] of Object.entries(b)){
      if (now > rec.reset + 300000) delete b[k];
    }
  }
}
setInterval(sweepBuckets, 300000).unref();
const ip = req => (req.headers["x-forwarded-for"]||req.socket.remoteAddress||"?").split(",")[0].trim();

/* ── auth ── */
const hashPw = (pw,salt) => crypto.scryptSync(String(pw), salt, 64).toString("hex");
function verifyPw(pw, salt, hash){
  const a = Buffer.from(hash,"hex"), b = Buffer.from(hashPw(pw,salt),"hex");
  return a.length===b.length && crypto.timingSafeEqual(a,b);
}
function issueToken(email){
  const tok = crypto.randomBytes(24).toString("hex");
  D.tokens[tok] = { email, expires: Date.now()+30*864e5 };
  store.save();
  return tok;
}
function authUser(req){
  const m = (req.headers.authorization||"").match(/^Bearer (.+)$/);
  if (!m) return null;
  const t = D.tokens[m[1]];
  if (!t) return null;
  if (t.expires < Date.now()){ delete D.tokens[m[1]]; store.save(); return null; }
  return D.users[t.email] || null;
}

/* ── user state merge (sync) ── */
function mergeIntoUser(u, s){
  let added = 0;
  if (Array.isArray(s.responses)){
    const key = r => r.sid+"|"+r.qid;
    const map = new Map(u.responses.map(r=>[key(r),r]));
    s.responses.forEach(r=>{ if(!r||!r.qid) return; const k=key(r); const cur=map.get(k);
      if (!cur){ map.set(k,r); added++; } else if ((r.ts||0) > (cur.ts||0)) map.set(k,r); });
    u.responses = [...map.values()].slice(-20000);
  }
  if (s.srs && typeof s.srs==="object"){
    u.srs = u.srs||{};
    Object.entries(s.srs).forEach(([t,v])=>{ const cur=u.srs[t];
      if (!cur || (v.due||0) < (cur.due||0) || (v.hits||0) > (cur.hits||0)) u.srs[t]=v; });
  }
  if (s.profile && typeof s.profile==="object"){
    ["name","examDate","level","dailyMin","diagDone"].forEach(k=>{ if (s.profile[k]!=null) u.profile[k]=s.profile[k]; });
  }
  if (typeof s.theta==="number" && (s.thetaN||0) > (u.thetaN||0)){ u.theta=s.theta; u.thetaN=s.thetaN; }
  store.save();
  return added;
}

const simSummary = sim => ({
  outcome: sim.outcome, stopReason: sim.stopReason, theta: sim.theta,
  answeredCount: sim.answeredCount, counts: sim.counts, status: sim.status,
  startedTs: sim.startedTs, finishedTs: sim.finishedTs || Date.now(),
  administered: sim.administered.map(a=>({ qid:a.qid, b:a.b, pretest:a.pretest, scored:a.scored,
    cn:a.cn, t:a.t, score:a.score, answered:a.answered, caseId:a.caseId||null, timeMs:a.timeMs||0 }))
});

/* ── error hook (production track): JSONL error log + process safety net ── */
const ERRLOG = path.join(ROOT, "data", "errors.log");
function logError(kind, detail){
  const line = JSON.stringify({ ts:new Date().toISOString(), kind, pid:process.pid,
    message: detail && detail.message || String(detail),
    stack: detail && detail.stack ? String(detail.stack).slice(0, 2000) : undefined });
  try { fs.appendFileSync(ERRLOG, line + "\n"); } catch(e){}
  console.error("[error]", kind, line.slice(0, 300));
}
process.on("uncaughtException", e => { logError("uncaughtException", e); process.exit(1); });
process.on("unhandledRejection", e => logError("unhandledRejection", e));

/* ── security headers on every response (applied via writeHead wrapper) ── */
const HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "X-Frame-Options": "DENY",
  "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'"
};

const REQ_LOG = process.env.REQ_LOG === "1";

const requestHandler = async (req,res)=>{
  const t0 = Date.now();
  const u = req.url.split("?")[0];
  { // central header + request-log wrapper
    const orig = res.writeHead.bind(res);
    res.writeHead = (code, hdrs) => {
      if (REQ_LOG) console.log(`${new Date().toISOString()} ${req.method} ${u} → ${code} ${Date.now()-t0}ms`);
      return orig(code, Object.assign({}, hdrs||{}, HEADERS));
    };
  }
  try{
    if (u === "/api/health")
      return json(res,200,{ ok:true, uptime:Math.round(process.uptime()), items:NC.BANK.length,
        cases:NC.CASES.length, users:Object.keys(D.users).length,
        responseLog:D.responses.length, exposureTracked:Object.keys(D.seen||{}).length,
        calibrated: !!(D.calibration && D.calibration.items && D.calibration.items.length),
        // Question-source switch: true when the demo/practice set is being served
        // (DEMO_BANK=1|true|yes|on in the environment).
        demoBank: DEMO_BANK,
        authoring: Object.values(D.authoring||{}).reduce((a,r)=>{ a[r.status]=(a[r.status]||0)+1; return a; },{}),
        // Persistence status. Stays 200 either way so the platform health check
        // does not restart-loop, but "persisted:false" on a pg store means
        // writes are only in memory — check the logs for [store-pg] lines.
        store: { backend: store.FILE, persisted: store.connected ? store.connected() : true },
        version: require("./package.json").version });

    if (u.startsWith("/api/auth/")){
      if (limited("auth", ip(req), 30, 5*60000)) return json(res,429,{error:"too many attempts — wait a few minutes"},req);
      const b = req.method==="POST" ? await body(req) : {};
      if (u === "/api/auth/signup"){
        const email = String(b.email||"").trim().toLowerCase();
        const pw = String(b.password||"");
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json(res,400,{error:"invalid email"},req);
        if (pw.length < 8) return json(res,400,{error:"password must be at least 8 characters"},req);
        if (D.users[email]) return json(res,409,{error:"account already exists — sign in"},req);
        const salt = crypto.randomBytes(16).toString("hex");
        D.users[email] = { id:crypto.randomUUID(), email, salt, hash:hashPw(pw,salt),
          profile:{ name:String(b.name||"").slice(0,40) || email.split("@")[0] },
          responses:[], srs:{}, theta:0, thetaN:0, created:Date.now() };
        if (b.state) mergeIntoUser(D.users[email], b.state); // bring local progress on signup
        const tok = issueToken(email);
        return json(res,200,{ token:tok, account:{ email, name:D.users[email].profile.name } });
      }
      if (u === "/api/auth/login"){
        const email = String(b.email||"").trim().toLowerCase();
        const user = D.users[email];
        if (!user || !verifyPw(String(b.password||""), user.salt, user.hash))
          return json(res,401,{error:"invalid email or password"},req);
        return json(res,200,{ token:issueToken(email), account:{ email, name:user.profile.name } });
      }
      if (u === "/api/auth/logout"){
        const m = (req.headers.authorization||"").match(/^Bearer (.+)$/);
        if (m && D.tokens[m[1]]){ delete D.tokens[m[1]]; store.save(); }
        return json(res,200,{ ok:true });
      }
      if (u === "/api/auth/me"){
        const user = authUser(req);
        if (!user) return json(res,401,{error:"not signed in"},req);
        return json(res,200,{ email:user.email, name:user.profile.name,
          responses:user.responses.length, srsCount:Object.keys(user.srs||{}).length, theta:user.theta });
      }
      return json(res,404,{error:"no such endpoint"},req);
    }

    if (u.startsWith("/api/")){
      if (limited("api", ip(req), 400, 60000)) return json(res,429,{error:"rate limit"},req);
      const user = authUser(req);

      if (u === "/api/bootstrap"){
        return json(res,200,{ tax:NC.TAX, exams:NC.EXAMS, disclaimer:NC.DISCLAIMER,
          bank:NC.BANK.map(sanitizeItem), cases:NC.CASES.map(sanitizeCase),
          account: user? { email:user.email, name:user.profile.name } : null }, req);
      }
      if (u === "/api/answer" && req.method==="POST"){
        const b = await body(req); const item = NC.item(b.qid);
        if (!item) return json(res,404,{error:"unknown item"},req);
        const r = NC.scoreItem(item, b.ans);
        NC.recordAnswer("srv:"+String(b.sid||"anon"), b.qid, b.ans, b.timeMs||0, !!b.timed); // calibration feed
        return json(res,200,{ score:r.score, ok:r.ok, n:r.n, answered:r.answered }, req);
      }
      if (u.startsWith("/api/item/") && u.endsWith("/full")){
        const qPath = u.split("?")[0];
        const qid = decodeURIComponent(qPath.slice("/api/item/".length, -"/full".length));
        const sid = new URL(req.url, "http://x").searchParams.get("sid");
        const item = NC.item(qid);
        if (!item) return json(res,404,{error:"unknown item"},req);
        // keys & rationales only after submission: the session must have answered this item
        const answered = sid && (engState.responses.some(x=>x.qid===qid && (x.sid===sid || x.sid==="srv:"+sid)));
        if (!answered) return json(res,403,{error:"answer the item first — keys are never sent before submission"},req);
        return json(res,200,item,req);
      }
      if (u === "/api/sim/start" && req.method==="POST"){
        const b = await body(req);
        if (!NC.EXAMS[b.examId]) return json(res,400,{error:"unknown exam"},req);
        const sim = NC.newSim(b.examId);
        return json(res,200,{ simId:sim.id, examId:sim.examId }, req);
      }
      if (u === "/api/sim/next" && req.method==="POST"){
        const b = await body(req); const sim = NC.getSim(b.simId);
        if (!sim) return json(res,404,{error:"unknown sim"},req);
        const nxt = NC.simNext(sim);
        if (nxt.kind==="done")  return json(res,200,Object.assign({kind:"done"}, simSummary(sim)), req);
        if (nxt.kind==="case")  return json(res,200,{kind:"case", case:sanitizeCase(nxt.case), resumeAt:nxt.resumeAt||0}, req);
        return json(res,200,{ kind:"item", n:nxt.n, pretest:!!nxt.pretest, item:sanitizeItem(nxt.item) }, req);
      }
      if (u === "/api/sim/answer" && req.method==="POST"){
        const b = await body(req); const sim = NC.getSim(b.simId); const item = NC.item(b.qid);
        if (!sim || !item) return json(res,404,{error:"unknown sim/item"},req);
        NC.simAnswer(sim, item, b.ans, b.timeMs||0);
        return json(res,200,{ received:true }, req);
      }
      if (u === "/api/sim/case-answer" && req.method==="POST"){
        const b = await body(req); const sim = NC.getSim(b.simId);
        const caseObj = NC.CASES.find(c=>c.id===b.caseId);
        if (!sim || !caseObj) return json(res,404,{error:"unknown sim/case"},req);
        NC.simCaseItemAnswered(sim, caseObj, b.step, b.ans, b.timeMs||0);
        return json(res,200,{ received:true }, req);
      }
      if (u === "/api/sim/result" && req.method==="POST"){
        const b = await body(req); const sim = NC.getSim(b.simId);
        if (!sim) return json(res,404,{error:"unknown sim"},req);
        if (sim.status==="open") NC.simFinish(sim, "time");
        return json(res,200,simSummary(sim), req);
      }

      /* ── progress sync (auth required) ── */
      /* ── admin: calibration (X-Admin-Key) ── */
      const isAdmin = principal(req)?.role === "admin";
      if (u === "/api/admin/calibrate" && req.method==="POST"){
        if (!isAdmin) return json(res,401,{error:"admin key required"},req);
        const responses = [...D.responses, ...Object.values(D.users).flatMap(x=>x.responses||[])];
        const report = calibrate.compute(responses, NC.allItems());
        const applied = calibrate.apply(NC, report);
        D.calibration = report; store.saveNow();
        return json(res,200,{ applied, flagged: report.items.filter(x=>x.flags.length).length,
          calibratable: report.items.filter(x=>x.n>=calibrate.MIN_N).length,
          items: report.items.slice(0,25) }, req);
      }
      if (u === "/api/admin/calibration"){
        if (!isAdmin) return json(res,401,{error:"admin key required"},req);
        if (!D.calibration) return json(res,404,{error:"no calibration yet — POST /api/admin/calibrate"},req);
        return json(res,200,D.calibration,req);
      }
      if (u === "/api/admin/calibration/reset" && req.method==="POST"){
        if (!isAdmin) return json(res,401,{error:"admin key required"},req);
        calibrate.reset(NC); delete D.calibration; store.saveNow();
        return json(res,200,{ ok:true, restored:"authored difficulty" },req);
      }
      /* ── admin: authoring & review workflow (X-Admin-Key) ── */
      const AID = u.startsWith("/api/admin/items/") ? u.slice("/api/admin/items/".length).split("/") : null;
      if (u === "/api/admin/items" && req.method==="POST"){
        const actor = guard(req, res, "edit"); if (!actor) return;
        const b = await body(req);
        const r = authoring.createDraft(NC, D, b.item, b.note, actor);
        if (r.forbidden) return json(res,403,{error:"not permitted for role '"+actor.role+"'", errors:r.errors},req);
        if (r.errors) return json(res,400,{error:"validation failed", errors:r.errors},req);
        store.saveNow(); return json(res,200,{ record:r.record },req);
      }
      if (u === "/api/admin/items" && req.method==="GET"){
        const actor = guard(req, res, "read"); if (!actor) return;
        return json(res,200,{ you:{ name:actor.name, role:actor.role }, queue: authoring.queueSummary(D),
          bank:{ count:NC.BANK.length, patched:Object.keys(D.bankPatches||{}) },
          statuses: authoring.STATUSES, transitions: authoring.TRANSITIONS },req);
      }
      if (AID && AID.length===1 && req.method==="GET"){          // /api/admin/items/:id
        const actor = guard(req, res, "read"); if (!actor) return;
        const rec = authoring.getRecord(D, decodeURIComponent(AID[0]));
        if (!rec) return json(res,404,{error:"no record for "+AID[0]},req);
        return json(res,200,{ record:rec },req);
      }
      if (AID && AID.length===1 && req.method==="PUT"){          // edit draft
        const actor = guard(req, res, "edit"); if (!actor) return;
        const b = await body(req);
        const r = authoring.updateDraft(NC, D, decodeURIComponent(AID[0]), b.item, b.note, actor);
        if (r.forbidden) return json(res,403,{error:"not permitted for role '"+actor.role+"'", errors:r.errors},req);
        if (r.errors) return json(res,400,{error:"cannot update", errors:r.errors},req);
        store.saveNow(); return json(res,200,{ record:r.record },req);
      }
      if (AID && AID.length===2 && AID[1]==="transition" && req.method==="POST"){
        const actor = guard(req, res, null); if (!actor) return; // action decided by target state inside authoring.transition
        const b = await body(req);
        const r = authoring.transition(NC, D, decodeURIComponent(AID[0]), String(b.to||""), b.note, actor);
        if (r.forbidden) return json(res,403,{error:"not permitted for role '"+actor.role+"'", errors:r.errors},req);
        if (r.errors) return json(res,400,{error:"transition rejected", errors:r.errors},req);
        store.saveNow(); return json(res,200,{ record:r.record, bankCount:NC.BANK.length },req);
      }
      if (u === "/api/admin/import" && req.method==="POST"){
        const actor = guard(req, res, "edit"); if (!actor) return;
        const b = await body(req);
        if (!Array.isArray(b.items) || b.items.length>500) return json(res,400,{error:"items must be an array (≤500)"},req);
        const r = authoring.importDrafts(NC, D, b.items, b.note, actor);
        if (r.forbidden) return json(res,403,{error:"not permitted for role '"+actor.role+"'", errors:r.errors.map(e=>e.errors.join("; "))},req);
        store.saveNow(); return json(res,200, r, req);
      }
      if (u === "/api/admin/export"){
        if (!isAdmin) return json(res,401,{error:"admin key required"},req);
        return json(res,200, authoring.exportAll(NC, D), req);
      }
      if (u === "/api/admin/distractors" && req.method==="GET"){
        const actor = guard(req, res, "read"); if (!actor) return;
        const responses = [...D.responses, ...Object.values(D.users).flatMap(x=>x.responses||[])];
        return json(res,200, calibrate.distractors(responses, NC.allItems()), req);
      }
      if (u === "/api/admin/versions" && req.method==="GET"){
        const actor = guard(req, res, "read"); if (!actor) return;
        return json(res,200,{ versions: Object.values(D.authoring||{})
          .map(r=>({qid:r.qid, version:r.version, status:r.status, events:r.history.length})) },req);
      }
      if (u === "/api/track" && req.method==="POST"){
        if (!user) return json(res,401,{error:"not signed in"},req);
        const b = await body(req);
        const added = mergeIntoUser(user, b);
        return json(res,200,{ ok:true, stored:user.responses.length, added }, req);
      }
      if (u === "/api/state"){
        if (!user) return json(res,401,{error:"not signed in"},req);
        return json(res,200,{ responses:user.responses, srs:user.srs||{}, profile:user.profile,
          theta:user.theta, thetaN:user.thetaN }, req);
      }
      return json(res,404,{error:"no such endpoint"},req);
    }
    if (u === "/admin" || u === "/admin/"){
      return fs.readFile(path.join(ROOT,"admin","index.html"),(e,buf)=>{
        if (e){ res.writeHead(500); return res.end("admin UI missing"); }
        res.writeHead(200,{"Content-Type":"text/html","Cache-Control":"no-cache"}); res.end(buf);
      });
    }
    if (u === "/admin/admin.js" || u === "/admin/admin.css"){
      const f = u.slice("/admin/".length);
      const types = { "admin.js":"text/javascript", "admin.css":"text/css" };
      return fs.readFile(path.join(ROOT,"admin",f),(e,buf)=>{
        if (e){ res.writeHead(404); return res.end("not found"); }
        res.writeHead(200,{"Content-Type":types[f],"Cache-Control":"no-cache"}); res.end(buf);
      });
    }
    return serveStatic(req,res,u);
  }catch(e){ logError("request", e); return json(res,500,{error:"server error"},req); }
};
const server = http.createServer(requestHandler);
const PORT = process.env.PORT || 3000;

/* token sweep: drop expired sessions (boot + hourly) */
function sweepTokens(){
  const now = Date.now();
  const gone = Object.keys(D.tokens||{}).filter(k=>D.tokens[k] && D.tokens[k].expires < now);
  if (gone.length){ gone.forEach(k=>delete D.tokens[k]); store.save(); }
}
setInterval(sweepTokens, 3600e3).unref();

function graceful(sig){
  console.log(`\n${sig} — shutting down (flushing store)…`);
  // saveNow() is synchronous for the JSON store but returns a promise for
  // Postgres. Exiting without awaiting it aborts the final transaction
  // mid-flight and loses the writes it was carrying — and the platform
  // sends SIGTERM on every deploy and every idle sleep.
  const flushed = Promise.resolve()
    .then(()=>store.saveNow())
    .catch(e=>console.error("[shutdown] store flush failed:", e.message));
  server.close(()=>{});                 // stop accepting new connections now
  flushed.then(()=>{ console.log("store flushed — exiting"); process.exit(0); });
  setTimeout(()=>{ console.error("[shutdown] flush timed out — exiting anyway"); process.exit(1); }, 10000).unref();
}
process.on("SIGTERM", ()=>graceful("SIGTERM"));
process.on("SIGINT",  ()=>graceful("SIGINT"));

function listenAll(){
  sweepTokens();
  server.listen(PORT, "0.0.0.0", ()=>console.log(`RN Ready exam server v${require("./package.json").version} on :${PORT} — ${NC.BANK.length} items + ${NC.CASES.length} cases · persisted store: ${store.FILE}`));
  /* optional HTTPS alongside HTTP: TLS_CERT + TLS_KEY (PEM), TLS_PORT (default 3443) */
  const TLS_CERT = process.env.TLS_CERT, TLS_KEY = process.env.TLS_KEY;
  if (TLS_CERT && TLS_KEY){
    const https = require("https");
    try {
      const tserver = https.createServer({ cert: fs.readFileSync(TLS_CERT), key: fs.readFileSync(TLS_KEY) }, requestHandler);
      const TLS_PORT = Number(process.env.TLS_PORT || 3443);
      tserver.listen(TLS_PORT, "0.0.0.0", ()=>console.log(`HTTPS on :${TLS_PORT} (cert: ${TLS_CERT})`));
    } catch(e){ console.error("[warn] TLS failed:", e.message); }
  }
}

if (store.loadAsync){ // async backend (Postgres): link refs only after the doc arrives
  store.loadAsync().then(()=>{ hydrate(); listenAll(); })
    .catch(e=>{ console.error("[fatal] store init failed:", e.message); process.exit(1); });
} else { hydrate(); listenAll(); }
