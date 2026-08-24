/* RN Ready — schema migration runner.
   Applies schema.sql (idempotent: CREATE TABLE IF NOT EXISTS / CREATE OR REPLACE)
   to the database named by DATABASE_URL. Zero-dep apart from the `pg` driver,
   which this script loads explicitly:

     npm i pg
     DATABASE_URL="postgresql://…" npm run db:migrate

   Supabase: use the SESSION pooler connection string (Settings → Database →
   Connection string → Session pooler). The runner prints the resulting table
   inventory so the migration is visibly verified.                            */
const fs = require("fs"), path = require("path");

async function main(){
  if (!process.env.DATABASE_URL){
    console.error("[db:migrate] DATABASE_URL is not set — nothing to migrate.");
    process.exit(1);
  }
  let pg;
  try { pg = require("pg"); }
  catch(e){ console.error("[db:migrate] pg driver missing — run: npm i pg"); process.exit(1); }

  const CONN = process.env.DATABASE_URL;
  const auto = /supabase[.]com|[.]supabase[.]co|render[.]com|amazonaws[.]com/i.test(CONN) ? "require" : "";
  const mode = (process.env.PGSSL || "").toLowerCase() || auto;
  const ssl = mode === "off" ? undefined : mode === "verify" ? { rejectUnauthorized:true }
            : mode === "require" ? { rejectUnauthorized:false } : undefined;

  const client = new pg.Client({ connectionString: CONN, ssl });
  const ddl = fs.readFileSync(path.join(__dirname, "..", "schema.sql"), "utf8");
  await client.connect();
  try {
    await client.query(ddl);
    const inv = await client.query(`
      SELECT table_name, (SELECT count(*) FROM information_schema.columns c
        WHERE c.table_name = t.table_name) AS cols
      FROM information_schema.tables t
      WHERE table_schema='public' AND table_type='BASE TABLE' ORDER BY table_name`);
    console.log("[db:migrate] applied schema.sql — tables now:");
    inv.rows.forEach(r => console.log(`  ${r.table_name.padEnd(20)} ${r.cols} cols`));
    const ver = await client.query("SELECT v FROM meta WHERE k='schema_version'");
    console.log(`[db:migrate] schema_version = ${ver.rows[0] ? ver.rows[0].v : "(pending first store flush)"}`);
  } finally { await client.end(); }
}
main().catch(e => { console.error("[db:migrate] failed:", e.message); process.exit(1); });
