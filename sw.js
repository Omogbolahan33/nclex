/* RN Ready service worker (v3c) — offline app shell for the served app.
   Rules:
   - Precache ONLY the key-free shell: app html, css, engine/ui js, taxonomy.
     Bank & case files never exist client-side, so they can never be cached.
   - /api/bootstrap (sanitized, key-free) may be cached for offline practice.
   - NEVER cache: /api/item/…/full (answer keys!), /api/admin, auth, sims.
     API POSTs are never cached — the app queues answers in localStorage
     (js/api.js) and replays them through /api/track when back online.
   - Cache name is stamped at build time by build-online.mjs; old caches purge. */

const SHELL = [
  "/", "/index.html",
  "/css/app.css",
  "/js/taxonomy.js", "/js/engine.js", "/js/render.js", "/js/ui.js", "/js/api.js", "/js/notify.js", "/js/main.js",
  "/manifest.webmanifest", "/icon.svg"
];
const CACHE = "rn-ready-__SW_STAMP__";

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;

  // keys & admin surfaces: network only — never touch cache
  if (url.pathname.startsWith("/api/item/") || url.pathname.startsWith("/api/admin")) return;
  if (url.pathname.startsWith("/api/auth/") || url.pathname.startsWith("/api/sim/")) return;

  // sanitized bootstrap: network-first, cache fallback (offline item source)
  if (url.pathname === "/api/bootstrap"){
    e.respondWith(fetch(e.request)
      .then(r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); return r; })
      .catch(() => caches.match(e.request)));
    return;
  }
  if (url.pathname.startsWith("/api/")) return; // everything else API: network only

  // app shell & statics: cache-first with background refresh
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(r => {
      if (r.ok){ const cp = r.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); }
      return r;
    }).catch(() => caches.match("/")))
  );
});
