/* RN Ready — study reminders (v3d).
   Local-only notifications: no server push, no external services. While the app
   is open (tab or installed PWA), a daily reminder fires at the chosen time via
   the Notification API (permission-gated) with an in-app toast fallback.
   Preference persists in the engine state (S.user.reminder).                       */
window.NC = window.NC || {};
NC.notify = {
  timer: null,
  get supported(){ return ("Notification" in window); },
  get permission(){ return this.supported ? Notification.permission : "unsupported"; },
  cfg(){
    const S = NC.load();
    return S.user.reminder || (S.user.reminder = { on:false, time:"19:00" });
  },
  /* next fire timestamp for a "HH:MM" time (tomorrow if already past today's) */
  nextDue(timeStr, now){
    const m = /^(\d{1,2}):(\d{2})$/.exec(String(timeStr||""));
    if (!m) return null;
    const nowTs = now || Date.now();
    const d = new Date(nowTs);
    d.setHours(parseInt(m[1],10), parseInt(m[2],10), 0, 0);
    if (d.getTime() <= nowTs) d.setDate(d.getDate()+1);
    return d.getTime();
  },
  daysToExam(){
    const S = NC.load();
    if (!S.user.examDate) return null;
    const d = new Date(S.user.examDate+"T00:00:00");
    return Math.ceil((d - Date.now())/864e5);
  },
  message(){
    const S = NC.load();
    const dte = this.daysToExam();
    const streak = (S.streak && S.streak.count) || 0;
    const head = streak>0 ? `Keep your ${streak}-day streak alive` : "Time for today's practice";
    const tail = dte!=null && dte>0 ? ` — ${dte} day${dte===1?"":"s"} to your exam` : "";
    return head + tail;
  },
  fire(){
    const c = this.cfg();
    if (!c.on) return;
    NC.logEvent("reminder_fired", { time:c.time });
    const msg = this.message();
    let shown = false;
    if (this.supported && Notification.permission === "granted"){
      try {
        const n = new Notification("RN Ready", { body: msg + " · ~" + (NC.load().user.dailyMin||30) + " min", tag:"rnready-daily" });
        n.onclick = ()=>{ window.focus(); n.close(); };
        shown = true;
      } catch(e){}
    }
    if (!shown && NC.ui && NC.ui.toast) NC.ui.toast("⏰ " + msg, true);
    this.schedule(); // next day
  },
  schedule(){
    if (this.timer){ clearTimeout(this.timer); this.timer = null; }
    const c = this.cfg();
    if (!c.on || !this.supported && !NC.ui) return;
    const due = this.nextDue(c.time);
    if (!due) return;
    const wait = Math.max(1000, due - Date.now());
    this.timer = setTimeout(()=>this.fire(), Math.min(wait, 2147483647));
  },
  async enable(timeStr){
    const c = this.cfg();
    c.time = /^\d{1,2}:\d{2}$/.test(String(timeStr||"")) ? timeStr : c.time;
    c.on = true;
    NC.save();
    if (this.supported && Notification.permission === "default"){
      try { await Notification.requestPermission(); } catch(e){}
    }
    this.schedule();
    return this.permission;
  },
  disable(){
    const c = this.cfg();
    c.on = false;
    NC.save();
    if (this.timer){ clearTimeout(this.timer); this.timer = null; }
  },
  test(){
    const msg = this.message();
    if (this.supported && Notification.permission === "granted"){
      try { new Notification("RN Ready (test)", { body: msg, tag:"rnready-test" }); return "notification"; } catch(e){}
    }
    if (NC.ui && NC.ui.toast) NC.ui.toast("⏰ " + msg + " (in-app)", true);
    return "toast";
  },
  init(){ this.schedule(); }
};
