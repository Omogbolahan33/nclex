/* RN Ready — remote adapter. When the app is served by server.js, the item bank
   arrives SANITIZED (no answer keys, no rationales): scoring happens on the server,
   explanations are fetched only after answering. Also carries the account session
   token and progress sync. Standalone file → full local mode.                     */
window.NC = window.NC || {};
NC.api = {
  remote: false, ready: false, token: null, account: null, sessionLost: null,

  initAuth(){
    try {
      this.token = localStorage.getItem("rnready-token") || null;
      this.account = JSON.parse(localStorage.getItem("rnready-account") || "null");
    } catch(e){ this.token = null; this.account = null; }
  },
  setAuth(token, account){
    this.token = token; this.account = account;
    try {
      if (token){ localStorage.setItem("rnready-token", token); localStorage.setItem("rnready-account", JSON.stringify(account)); }
      else { localStorage.removeItem("rnready-token"); localStorage.removeItem("rnready-account"); }
    } catch(e){}
  },

  async post(path, body){
    const headers = {"Content-Type":"application/json"};
    if (this.token) headers["Authorization"] = "Bearer "+this.token;
    const r = await fetch(path, { method:"POST", headers, body:JSON.stringify(body||{}) });
    if (!r.ok) { const e = new Error("api "+path+" "+r.status); e.status=r.status; try{ e.body=await r.json(); }catch(_){} throw e; }
    return r.json();
  },

  async bootstrap(){
    this.initAuth();
    let d = null;
    try {
      const r = await fetch("/api/bootstrap", { headers: this.token? {Authorization:"Bearer "+this.token} : {} });
      if (!r.ok) throw new Error("no api");
      d = await r.json();
      NC.TAX = d.tax; NC.EXAMS = d.exams; NC.DISCLAIMER = d.disclaimer;
      NC.BANK = d.bank; NC.CASES = d.cases;      // sanitized: no ans / no rat
      NC.REMOTE = this.remote = true;
      if (d.account){ this.account = d.account; this.sessionLost = null; }
      else if (this.token){
        /* The server did not recognize our token. That has two very different
           causes and the old code treated both as "stale": it nulled this.token
           in memory (leaving the stale value in localStorage) and dropped the
           candidate into a fresh sign-up with no explanation.
             invalid-token    → the credential really is bad; clear it.
             ephemeral-store  → the host discards its filesystem on every cold
                                start, so the account row is gone. Nothing the
                                client can do, but the user deserves the reason.
             store-empty      → same symptom, store is simply blank. */
        const s = d.session || {};
        this.sessionLost = {
          cause: s.durable === false ? "ephemeral-store" : s.storeEmpty ? "store-empty" : "invalid-token",
          presented: !!s.presented
        };
        this.setAuth(null, null); // clears memory AND localStorage
      }
    } catch(e){ NC.REMOTE = this.remote = false; }
    this.ready = true;
    return this.remote;
  },

  /* ── offline answer queue (PWA) ─────────────────────────────
     The server holds the keys, so offline answers can't be scored on-device.
     Instead: queue the raw submission, record a PENDING response locally
     (answered:false → excluded from stats), and replay through /api/answer
     when connectivity returns. applyScore's sid+qid replace semantics make
     the replay idempotent — the pending row is replaced by the scored one. */
  QKEY: "rnready-outq",
  queueAnswer(p){
    try {
      const q = JSON.parse(localStorage.getItem(this.QKEY) || "[]");
      q.push(Object.assign({queuedTs:Date.now()}, p));
      localStorage.setItem(this.QKEY, JSON.stringify(q.slice(-500)));
      return true;
    } catch(e){ return false; }
  },
  queueSize(){ try { return JSON.parse(localStorage.getItem(this.QKEY) || "[]").length; } catch(e){ return 0; } },
  async flushQueue(){
    let q = [];
    try { q = JSON.parse(localStorage.getItem(this.QKEY) || "[]"); } catch(e){}
    if (!q.length) return 0;
    const stillDown = [];
    let synced = 0, scored = [];
    for (const p of q){
      try {
        const res = await this.post("/api/answer", {sid:p.sid, qid:p.qid, ans:p.ans, timeMs:p.timeMs, timed:p.timed});
        NC.applyScore(p.sid, p.qid, p.ans, res, p.timeMs, p.timed);
        scored.push(p); synced++;
      } catch(e){ if (e.status == null) stillDown.push(p); else synced++; /* 4xx: server rejected; drop */ }
    }
    try { localStorage.setItem(this.QKEY, JSON.stringify(stillDown)); } catch(e){}
    if (scored.length && this.account){ this.track(NC.trackPayload()).catch(()=>{}); }
    if (synced) try { NC.ui && NC.ui.toast && NC.ui.toast(`Synced ${synced} queued answer${synced>1?"s":""}`); } catch(e){}
    return synced;
  },

  /* practice scoring (server holds the key) */
  async submitAnswer(sid, qid, ans, timeMs, timed){
    return this.post("/api/answer", {sid, qid, ans, timeMs, timed});
  },
  /* full item (with key + rationales) for the explanation view — post-answer only.
     sid proves to the server that THIS session submitted an answer for qid.     */
  async itemFull(qid, sid){
    const r = await fetch("/api/item/"+encodeURIComponent(qid)+"/full"+(sid? "?sid="+encodeURIComponent(sid):""));
    if (!r.ok) throw new Error("item fetch failed");
    return r.json();
  },

  /* accounts & sync */
  signup(email, password, name, state){ return this.post("/api/auth/signup", {email, password, name, state}); },
  login(email, password){ return this.post("/api/auth/login", {email, password}); },
  logout(){ return this.post("/api/auth/logout", {}); },
  me(){
    return fetch("/api/auth/me", { headers: this.token? {Authorization:"Bearer "+this.token} : {} })
      .then(r=>{ if(!r.ok) throw new Error("me "+r.status); return r.json(); });
  },
  track(state){ return this.post("/api/track", state); },

  /* ── immediate profile sync ──────────────────────────────────────────────
     Every answered question pushes the profile to the server straight away.
     The old call sites used `NC.api.track(...).catch(()=>{})`, which discarded
     the failure silently: a candidate could answer for an hour on a dropped
     connection and believe every answer was on their remote profile when none
     of it ever left the device. syncNow() records the outcome, coalesces bursts
     into one request, retries with backoff, and exposes state for the UI.     */
  sync: { state:"idle", lastTs:0, lastError:null, fails:0, inflight:null },
  syncNow(){
    if (!this.remote || !this.account) return Promise.resolve(false);
    if (this.sync.inflight) return this.sync.inflight;   // coalesce rapid answers
    this.sync.state = "syncing";
    this.sync.inflight = this.post("/api/track", NC.trackPayload())
      .then(()=>{ this.sync.state="saved"; this.sync.lastTs=Date.now();
                  this.sync.lastError=null; this.sync.fails=0; return true; })
      .catch(e=>{ this.sync.state="error"; this.sync.fails++;
                  this.sync.lastError = (e && e.body && e.body.error) || (e && e.message) || "sync failed";
                  this.scheduleRetry(); return false; })
      .finally(()=>{ this.sync.inflight = null; });
    return this.sync.inflight;
  },
  scheduleRetry(){
    if (this._retryTimer) return;
    const delay = Math.min(30000, 2000 * Math.pow(2, Math.max(0, Math.min(4, this.sync.fails-1))));
    this._retryTimer = setTimeout(()=>{ this._retryTimer=null; this.syncNow(); }, delay);
    if (this._retryTimer.unref) this._retryTimer.unref();
  },
  syncLabel(){
    if (!this.remote) return "Offline — saved on this device";
    if (!this.account) return "Not signed in";
    if (this.sync.state === "syncing") return "Syncing…";
    if (this.sync.state === "error") return "Sync failed — will retry";
    if (this.sync.lastTs) return "Saved " + new Date(this.sync.lastTs).toLocaleTimeString();
    return "Synced";
  },
  state(){ return fetch("/api/state", { headers: this.token? {Authorization:"Bearer "+this.token} : {} })
      .then(r=>{ if(!r.ok) throw new Error("state "+r.status); return r.json(); }); },

  /* simulation (server-side CAT) */
  /* Exposure history travels with the request: the server is not authenticated
     for sims, so this is how a returning candidate gets NEW items first instead
     of meeting questions they answered last week. Capped — it is a hint.     */
  seenHint(){
    try {
      const seen = (NC.load && NC.load().seen) || {};
      return Object.keys(seen).slice(-5000);
    } catch(e){ return []; }
  },
  simStart(examId){ return this.post("/api/sim/start", {examId, seen:this.seenHint()}); },
  simNext(simId){
    const sim = typeof NC !== "undefined" && NC.getSim && NC.getSim(simId);
    const remainingMs = sim ? (sim.remainingMs || Math.max(0, sim.endsAt - Date.now())) : null;
    return this.post("/api/sim/next", {simId, remainingMs, seen:this.seenHint()});
  },
  simAnswer(simId, qid, ans, timeMs){ return this.post("/api/sim/answer", {simId, qid, ans, timeMs}); },
  simCaseAnswer(simId, caseId, step, ans, timeMs){ return this.post("/api/sim/case-answer", {simId, caseId, step, ans, timeMs}); },
  simResult(simId){ return this.post("/api/sim/result", {simId}); }
};
