/* RN Ready — JSON-file store (default backend). Atomic writes (tmp+rename),
   debounced saves. Same interface as store-pg.js; store.js picks the backend
   via STORE=pg. RNREADY_STORE overrides the file path (tests, multi-instance).
   On Vercel the deploy directory is read-only, so the file lands in /tmp —
   ephemeral per instance; set STORE=pg + DATABASE_URL for real persistence. */
const fs = require("fs"), path = require("path");
const FILE = process.env.RNREADY_STORE
  || (process.env.VERCEL ? "/tmp/rn-ready-store.json" : path.join(__dirname, "data", "store.json"));
/* True when the backing file cannot outlive this process or host. Serverless
   and free-tier hosts (Vercel, Render free, Lambda, containers) discard their
   filesystem on every recycle, cold start or deploy — so accounts and session
   tokens written here vanish, and the candidate experiences it as "I have to
   create an account again". Set STORE=pg + DATABASE_URL for real durability. */
const EPHEMERAL = !!process.env.VERCEL
  || /^(1|true|yes|on)$/i.test(process.env.EPHEMERAL_FS || "")
  || /(^|\/)tmp\//.test(FILE);
if (EPHEMERAL && !process.env.STORE)
  console.warn("[store] ⚠ EPHEMERAL STORAGE — no STORE=pg. Accounts, sessions and progress are"
    + " written to " + FILE + ", which is destroyed on every cold start, recycle and deploy."
    + " Candidates will be signed out and forced to re-register. Set STORE=pg + DATABASE_URL"
    + " and run `npm run db:migrate` to persist them.");
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

module.exports = { load, save, saveNow, FILE, EPHEMERAL };
