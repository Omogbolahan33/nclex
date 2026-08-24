/* RN Ready — bootstrap. If served by server.js, fetch the sanitized bank first. */
window.addEventListener("hashchange", NC.route);
(async function init(){
  try { if (NC.api && !NC.api.ready) await NC.api.bootstrap(); } catch(e){ /* local mode */ }
  if (!location.hash) location.hash = "#/home";
  NC.route();
  if (NC.notify && NC.notify.init) NC.notify.init();
  /* PWA: install the offline shell (served app only — not the standalone file) */
  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)){
    try { navigator.serviceWorker.register("/sw.js"); } catch(e){}
    // replay any answers queued while offline
    if (NC.api && NC.api.remote && navigator.onLine) NC.api.flushQueue().catch(()=>{});
    window.addEventListener("online", ()=>{ NC.api && NC.api.flushQueue && NC.api.flushQueue().catch(()=>{}); });
  }
})();
