/* RN Ready — remote adapter. When the app is served by server.js, the item bank
   arrives SANITIZED (no answer keys, no rationales): scoring happens on the server,
   explanations are fetched only after answering. Also carries the account session
   token and progress sync. Standalone file → full local mode.                     */
window.NC = window.NC || {};
NC.api = {
  remote: false, ready: false, token: null, account: null,

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
      if (d.account) this.account = d.account; else if (this.token){ this.token=null; this.account=null; } // stale token
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
  state(){ return fetch("/api/state", { headers: this.token? {Authorization:"Bearer "+this.token} : {} })
      .then(r=>{ if(!r.ok) throw new Error("state "+r.status); return r.json(); }); },

  /* simulation (server-side CAT) */
  simStart(examId){ return this.post("/api/sim/start", {examId}); },
  simNext(simId){ return this.post("/api/sim/next", {simId}); },
  simAnswer(simId, qid, ans, timeMs){ return this.post("/api/sim/answer", {simId, qid, ans, timeMs}); },
  simCaseAnswer(simId, caseId, step, ans, timeMs){ return this.post("/api/sim/case-answer", {simId, caseId, step, ans, timeMs}); },
  simResult(simId){ return this.post("/api/sim/result", {simId}); }
};
