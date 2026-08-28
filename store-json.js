/* RN Ready — JSON-file store (default backend). Atomic writes (tmp+rename),
   debounced saves. Same interface as store-pg.js; store.js picks the backend
   via STORE=pg. RNREADY_STORE overrides the file path (tests, multi-instance).
   On Vercel the deploy directory is read-only, so the file lands in /tmp —
   ephemeral per instance; set STORE=pg + DATABASE_URL for real persistence. */
const fs = require("fs"), path = require("path");
const FILE = process.env.RNREADY_STORE
  || (process.env.VERCEL ? "/tmp/rn-ready-store.json" : path.join(__dirname, "data", "store.json"));
if (process.env.VERCEL && !process.env.STORE)
  console.warn("[store] VERCEL detected with no STORE=pg — data persists only in this instance's /tmp and resets on every deploy/cold start");
let data = null, timer = null;

function blank(){ return { users:{}, tokens:{}, sims:[], responses:[] }; }
function load(){
  if (data) return data;
  try { data = JSON.parse(fs.readFileSync(FILE, "utf8")); } catch(e){ data = null; }
  if (!data || typeof data !== "object") data = blank();
  data.users = data.users || {}; data.tokens = data.tokens || {};
  data.sims = data.sims || []; data.responses = data.responses || [];
  return data;
}
function write(){
  fs.mkdirSync(path.dirname(FILE), { recursive:true });
  const tmp = FILE + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(data));
  fs.renameSync(tmp, FILE); // atomic on same filesystem
}
function save(){ if (timer) return; timer = setTimeout(()=>{ timer=null; try{ write(); }catch(e){ console.error("store save failed:", e.message); } }, 250); }
function saveNow(){ if (timer){ clearTimeout(timer); timer=null; } try{ write(); }catch(e){ console.error("store save failed:", e.message); } }

module.exports = { load, save, saveNow, FILE };
