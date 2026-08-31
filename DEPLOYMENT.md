# RN Ready — Deployment & Scale Runbook

One Render web service + one managed Postgres (Supabase recommended). The app
server itself uses no framework — `server.js` is plain Node. The only runtime
dependency is the `pg` driver, declared in `package.json` so any standard
`npm ci` installs it.

| Piece | What | Where |
|---|---|---|
| Web | Node 20+, `npm start`, health `/api/health` | Render Web Service (free tier) |
| DB | Postgres, per-table schema (`schema.sql`) | Supabase (or any managed PG) |
| Items | `js/bank*.js` + `js/case*.js`, auto-discovered | in repo (`content.js`), seeded to `items`/`cases` via `npm run db:seed` |
| Auth | `X-Admin-Key` header = `ADMIN_KEY` or a staff key | env vars |

---

## 1. Prerequisites

- GitHub repo with this code (Render deploys from the connected repo).
- [Supabase](https://supabase.com) account (free tier is fine) — or Render's
  own Postgres, or RDS; any Postgres works.
- Node ≥ 20 locally if you want to run migrations from your machine.

## 2. Create the database (Supabase)

1. New project → pick the region nearest your users (Render service region in
   `render.yaml` should match; default `oregon`).
2. **Settings → Database → Connection string → URI — Session pooler**.
   It looks like:
   `postgresql://postgres.<project-ref>:<password>@aws-0-<region>.pooler.supabase.com:5432/postgres`
3. Keep that string secret; it becomes `DATABASE_URL`.

> Use the **session pooler** (port 5432), not the transaction pooler (6543) —
> the app uses multi-statement DDL for migrations and per-connection session
> state that the transaction pooler cannot carry.

## 3. Deploy the web service (manual — free tier)

No Blueprint needed. Create the service by hand; `render.yaml` is kept in the
repo only as a record of these settings and is **ignored** by a manually
created service.

> **Why a Web Service and not a Static Site?** The bank, answer keys and
> rationales never leave the server — scoring, the CAT engine, accounts and
> auth all run server-side. A Static Site has no Node process, so the only
> thing it could host is `standalone.html`, which embeds the entire item bank
> *including every answer key* in the page. Fine as an offline study build,
> never as your public site.

1. Render dashboard → **New → Web Service** → **Build and deploy from a Git
   repository** → connect `Omogbolahan33/nclex` → **Connect**.

2. Fill the form:

   | Field | Value |
   |---|---|
   | Name | `rn-ready-exam` (becomes `rn-ready-exam.onrender.com`) |
   | Language / Runtime | **Node** |
   | Branch | `main` |
   | Region | nearest your users — **match your Supabase region** |
   | Root Directory | *(leave blank — the app is at the repo root)* |
   | Build Command | `npm ci && node build-online.mjs` |
   | Start Command | `npm start` |
   | Instance Type | **Free** |

3. Expand **Advanced** and set **Health Check Path** to `/api/health`.

4. Add the environment variables (**Advanced → Add Environment Variable**).
   `ADMIN_KEY` is *not* auto-generated on this path — you supply it. Generate
   one with `node -e "console.log(require('crypto').randomBytes(24).toString('base64url'))"`
   and store it in your password manager **before** first login.

   | Key | Value |
   |---|---|
   | `NODE_ENV` | `production` |
   | `STORE` | `pg` |
   | `DATABASE_URL` | session-pooler URI from step 2 |
   | `PGSSL` | `require` |
   | `PG_STORE_KEY` | `state` |
   | `PG_POOL_MAX` | `5` |
   | `ADMIN_KEY` | your generated key |
   
   > Setting `NODE_ENV=production` is what arms the boot gate: the server
   > **refuses to start** if `ADMIN_KEY` is missing, so it can never come up
   > on the `dev-admin` default. It also makes `npm ci` skip devDependencies —
   > the runtime needs zero packages, so the only install is `pg`.

5. **Create Web Service**. First build takes a couple of minutes.

### Free-tier realities

- **No persistent disk.** The filesystem resets on every deploy and restart, so
  `STORE=pg` with an external database is mandatory — leave `STORE` unset and
  every account and answer is wiped on the next deploy.
- **Instances sleep after inactivity.** The first request after a nap takes
  roughly a minute to wake. Exam state lives in Postgres, so nothing is lost.
- Auto-deploy on push to `main` is on by default; leave it on.

## 3b. Deploy to Vercel (alternative to Render)

The repo ships first-class Vercel support (`vercel.json`, `api/index.js`).
Framework preset **Other**; no dashboard config needed beyond env vars.

> **Deploy from the repo, never from a hand-mutated local folder.** A previous
> deploy failed with `ENOENT … scandir '/var/task/js'` because `server.js` /
> `content.js` had been renamed to `.cjs` in the deploy directory and the
> serverless bundle was assembled without the `js/` content files. The repo's
> own pipeline handles all of that: the build step
> (`node scripts/vercel-content.mjs`) embeds every bank/case file into the
> function bundle, and `content.js` falls back to that embedded copy when
> `js/` is not on disk.

**What the Vercel pipeline does** (driven by `vercel.json`):

| Piece | What |
|---|---|
| `buildCommand` | embeds content (`scripts/vercel-content.mjs`) → builds the key-free app (`build-online.mjs`) |
| `outputDirectory: public` | only the key-free shell is served from the CDN — banks with answer keys never ship to the browser |
| `api/index.js` | serverless entry: boots the engine once per instance, drives the same `requestHandler` as the standalone server |
| `rewrites` | `/` → `index-app.html`, `/favicon.ico` → `icon.svg`, `/api/*` → the function; unmatched paths 404 at the CDN |

**Steps**

1. `vercel` from a clean checkout of this repo (or import the GitHub repo in
   the dashboard — Framework: **Other**; `vercel.json` drives the rest).
2. Set env vars (Project → Settings → Environment Variables):
   - `ADMIN_KEY` — required. Without it the app still boots for examinees,
     but **all diagnostics endpoints are locked** (401) — the log says so.
   - `STORE=pg` + `DATABASE_URL` — strongly recommended. The default JSON
     store degrades to the instance's `/tmp` on Vercel (read-only deploy dir):
     every cold start starts empty and writes are lost on redeploy.
   - `DEMO_BANK` — same meaning as on Render.
   - `BANK_SOURCE` — same meaning as on Render, but already declared as
     `env` in `vercel.json`, so it ships with the deployment and needs no
     dashboard entry. A value set in the dashboard overrides the file.
3. `vercel --prod` (CLI) or push to the connected branch.
4. Verify: `/api/health` → `"ok":true` with the expected `items` count.

**Notes**

- Serverless = per-instance memory. Engine state (sims, exposure counts)
  hydrates from the store on each cold start; with `STORE=pg` this is
  transparent, without it the instances do not share state.
- Postgres connections scale with concurrent instances — keep the Supabase
  **session pooler** URL as on Render (see §2).
- **`BANK_SOURCE=db` is riskier on serverless than on Render.** `hydrate()`
  runs per lambda instance, so every cold start re-reads `items`/`cases`.
  `store-pg` logs and never throws on a dead database (exam uptime outranks
  durability), so an instance whose read fails keeps the in-repo baseline and
  serves the FULL bank while healthy instances serve the curated one — two
  users can get different question sets at the same moment. `/api/health`
  reports `items` and `bankSource` per instance; an unexpected `items` count
  means a failed read on that instance, not missing content. Poll it a few
  times after a deploy rather than trusting a single 200.
- `npm test`, `npm run build`, Render, and local dev are unaffected: the
  embedded bundle is generated only by the Vercel build command and is
  gitignored (`vercel-content.cjs`).

## 4. Migrate the database (once per fresh DB)

The server boots against an empty database without crashing, but tables are
created by the migration runner (idempotent — safe to re-run any time):

**Run it from your machine** — Render's Shell is a paid feature, so on the
free tier this is the only route. Clone the repo, then with the same
connection string from step 2:

```bash
npm ci
DATABASE_URL="postgresql://postgres.<ref>:<pw>@aws-0-<region>.pooler.supabase.com:5432/postgres" \
  npm run db:migrate
```

You can run this before or after the first deploy — the server boots fine
against an empty database and starts persisting once the tables exist.

`PGSSL=require` is the default for Supabase/Render/RDS hosts (auto-detected),
so no extra flags are needed. Expected output ends with the table inventory:

```
[db:migrate] applied schema.sql — tables now:
  authoring_records   6 cols
  bank_patches        3 cols
  meta                3 cols
  responses          11 cols
  seen                2 cols
  sims                6 cols
  store               3 cols
  tokens              3 cols
  users               5 cols
```

## 4b. Seed the content bank into the database

The migration creates the tables; this fills `items` and `cases` with the
344-item bank read from `js/bank*.js` / `js/case*.js`. Idempotent — re-run
after editing the repo bank to push the changes up.

```bash
DATABASE_URL="postgresql://…" npm run db:seed
```

```
[db:seed] repo: 308 items, 6 cases
[db:seed] database before: 0 items, 0 cases
[db:seed] database after:  308 items, 6 cases
```

At boot the server reads these tables and overlays them on the in-repo bank:
a row replaces the item sharing its id, a new id is appended. The log says so:

```
bank from database: 308 replaced, 0 added (308 items live)
cases from database: 6 replaced, 0 added (6 cases live)
```

**What this buys you.** Editing an item row in Supabase changes what
examinees see on the next restart — no redeploy, no code change. The server
never writes these tables during normal operation, so a SQL edit is
authoritative and survives every flush.

**Precedence**, lowest to highest: the in-repo bank → the `items`/`cases`
tables → authoring-pipeline patches (`bank_patches`) → calibration. The
governed draft→review→publish flow therefore still wins over a raw SQL edit.

**Fallback.** An empty or unreachable database leaves the repo bank in place,
so the app always boots with a full bank.

Useful flags:

| Flag | Effect |
|---|---|
| `--dry-run` | report what would change, write nothing |
| `--prune` | delete rows whose id is no longer in the repo bank (off by default, so database-only items are preserved) |

> `npm run db:seed` also doubles as the restore path: it rewrites every row
> from the repo, undoing an unwanted SQL edit.

## 4c. Demo / practice question set (`DEMO_BANK` switch)

The repo carries a second, self-contained question set: the 128-question
demo/practice packet (107 standalone items + 6 case studies: three 6-screen
unfolding cases, the bow-tie item, the stand-alone trend item, and the
stand-alone psychiatric screen). It lives in `demo/bank.demo.js` and
`demo/cases.demo.js` — **not** in the auto-discovered `js/bank*.js`, so it
never touches the regular bank, the standalone build, or the seeder above.
Item ids use the `DEMO-` / `CASE-DEMO-` prefixes. The source document ships
without an answer key; the answers + rationales in those files are authored
practice content.

Seed it into the same tables (idempotent; `--remove` deletes the rows,
`--dry-run` previews):

```bash
DATABASE_URL="postgresql://…" npm run db:seed:demo
```

Then flip what the server serves with one environment variable in the Render
dashboard:

| `DEMO_BANK` | What examinees get |
|---|---|
| `1` / `true` / `yes` / `on` | **Only the demo set** (107 items + 6 cases) — the regular bank is hidden. Rows come from the database; if the database has no demo rows (e.g. local dev without Postgres), the bundled `demo/` files are used instead. Authoring patches and calibration overlays are skipped in this mode so the set is served verbatim. |
| unset / `false` / `0` | The regular bank, exactly as before. Any demo rows sitting in the database are ignored — the switch is the single source of truth, so you can leave the rows seeded and toggle freely. |

Changing the variable restarts the service (Render redeploys on env change);
`GET /api/health` then shows the live position of the switch:

```json
{"ok":true,"items":107,"cases":6,"demoBank":true,…}    // demo set served
{"ok":true,"items":308,"cases":6,"demoBank":false,…}   // regular bank served
```

Verified by `test/demo.mjs` (`npm test`): content shape, itemlint HARD gates,
engine scoring of every key, and a real two-boot test of the switch against a
store that already contains the demo rows.

## 4e. Serving only what is in the database (`BANK_SOURCE` switch)

By default the database is an **overlay**: a row replaces the item sharing its
id, a new id is appended, and every repo item the database does not mention
still ships. That is the right default while `js/bank*.js` is the source of
truth — but it means content cannot be retired by deleting it from the
database, because the bundled copy simply comes back.

Set `BANK_SOURCE=db` to make the database authoritative:

| `BANK_SOURCE` | What is served |
|---|---|
| unset / `overlay` | in-repo bank, with database rows laid over it |
| `db` | only the `items` / `cases` rows in the database |

```
BANK_SOURCE=db — database IS the bank: 1077 items + 20 cases live
                 (in-repo baseline of 1533 items dropped)
```

Confirm on a deployed instance with `GET /api/health`, which reports
`bankSource` alongside `items` and `cases`.

**Seed before switching it on.** A database that returns zero non-demo items
is treated as a misconfiguration, not as "serve nothing": the repo baseline is
kept and a warning is logged, because an empty bank breaks every exam route.

```
[bank] BANK_SOURCE=db but the database holds 0 non-demo items — keeping the
       1533-item repo baseline so the app still boots. Seed the items table,
       then restart.
```

That fallback also fires when the database is merely *unreachable* at boot
(`[store-pg] loadAsync failed`), so a connectivity blip serves the full in-repo
bank rather than the curated set. Treat a `bankSource=db` instance reporting an
unexpected `items` count as a failed database read, not as missing content.

## 4d. Duplicate questions in the bank

A database-seeded bank can end up holding the same question twice — a document
imported a second time, a wave re-seeded from a renamed file. Because every
selection rule is keyed on **qid**, two copies of one question look unrelated,
and an examinee can meet the same question once per copy in a single exam.

The server now handles this at three levels; nothing here is required for
correctness, but the tooling tells you what is in your table.

**1. Runtime (automatic).** At boot `server.js` fingerprints every item (stem +
presented options) and its stem, and links any cluster of two or more into one
constraint group. At most one member of a group is served per exam or practice
session, in every selection path, and re-tests rotate to the least-exposed
copy. The boot log says what it found:

```
duplicate content linked: 2 cluster(s) covering 4 items (0 same-content, 2 shared-stem) — one member per exam/session
  · DEMO-018 = DEMO-023  [same-stem]
  · DEMO-077 = DEMO-109  [same-stem]
```

or, for a clean bank:

```
no duplicate content in the bank (11 authored variant group(s) enforced as one-per-exam)
```

`GET /api/health` reports `duplicateClusters` / `duplicateItems` /
`variantGroups`; `GET /api/admin/duplicates` (admin key) returns the full
cluster list with ids, reasons and stem previews.

**2. Report and clean the table.**

```bash
DATABASE_URL="postgresql://…" npm run db:dedupe              # report only
DATABASE_URL="postgresql://…" npm run db:dedupe -- --delete --dry-run
DATABASE_URL="postgresql://…" npm run db:dedupe -- --delete   # remove the extra rows
```

The report separates **same-content** (a true repeat — one row is enough) from
**shared-stem** (an item set: same stem, different options — left alone). Which
copy survives is `--keep=first` (lowest qid, the default), `--keep=last`, or
`--keep=least` (the least-exposed copy per the `seen` table). Deleting a row
does not rewrite history — responses, sims and the calibration log keep their
qid — it just stops that copy being served. Re-run `npm run db:seed` only if
the repo bank still contains the row you removed, otherwise it comes back.

**3. Prevention.** `npm run lint` fails on same-content clusters, and the
authoring pipeline rejects a draft or bulk import that repeats a bank item,
naming the id it collides with — merge the change into that item or give the
new one a `variantGroup` so the two alternate instead of repeating.

## 5. Verify the deployment

```bash
BASE=https://<your-service>.onrender.com

curl $BASE/api/health          # {"ok":true,…,"store":{…,"persisted":true},…}
```

> **Check `store.persisted` first.** `true` means the server has read your
> Postgres tables and writes are landing there. `false` means it is running
> **in memory only and silently discarding every write** — the health check
> still returns 200 so the platform does not restart-loop, so this field is
> your only outside signal. If it is false, check the logs for `[store-pg]`
> lines and confirm `DATABASE_URL` and that step 4 ran.

- `items` = standalone bank items; `cases` = case sets (344 total at repo default).
  With `DEMO_BANK=1` these become `107` / `6` and `demoBank` reads `true`.
- `duplicateClusters` / `duplicateItems` = repeated content found in the bank
  (see §4d); `variantGroups` = authored alternates, counted separately.
- Without a key, admin endpoints return 401; wrong role returns
  `403 {"error":"not permitted for role 'author'"}`.

## 6. Environment reference

| Var | Default | Notes |
|---|---|---|
| `PORT` | `3000` | Set by Render automatically. |
| `NODE_ENV` | — | `production` on Render. |
| `STORE` | `file` | `pg` on Render; omit locally to use `data/store.json`. |
| `DATABASE_URL` | — | Session-pooler URI. Required when `STORE=pg`. |
| `PGSSL` | auto | `require` for Supabase/Render/AWS hosts; `off`/`verify` to override. |
| `PG_STORE_KEY` | `state` | Row key for legacy-blob backup; leave as-is. |
| `ADMIN_KEY` | — | Break-glass admin (all actions). Generated by Render. |
| `PG_POOL_MAX` | `5` | Pool size per server instance. |
| `DEMO_BANK` | off | Truthy (`1`/`true`/`yes`/`on`) serves the 128-question demo/practice set instead of the regular bank; unset/false ignores demo rows in the database. See §4c. |
| `BANK_SOURCE` | `overlay` | `db` makes the database the bank: the in-repo baseline is dropped and only `items`/`cases` rows are served. Seed first — an empty result keeps the repo bank and logs a warning. See §4e. |

## 7. Scaling the bank to thousands

Two independent levers; both are already wired.

**A. More content files (no per-wave wiring).** `content.js` auto-discovers
every `js/bank<N>.js` and `js/case<N>.js` in numeric order — drop in
`js/bank11.js`, add its `<script>` tag to `index.html` (the smoke suite's
drift guard fails if you forget or add a stale tag), redeploy. Loader,
linter, calibration, build and tests all pick the files up automatically.
`npm run lint` (itemlint) is the publish gate: it lints every discovered item
and must report `0 HARD` before a deploy.

**B. Bulk authoring pipeline (governed).** Drafts can never reach examinees:
bootstrap serves only in-bank items, and a draft only enters the bank after a
reviewer approves **and** a publisher releases it.

```bash
# 1. Scaffold N schema-valid drafts (IDs continue each CN sequence, no gaps reused)
node tools/draft-bank.mjs --count 200 --cn PHA --sys GI --out drafts.json

# 2. Import with an author/editor/admin key → all land status=draft
curl -H "X-Admin-Key: <author-key>" -H "Content-Type: application/json" \
     --data @drafts.json $BASE/api/admin/import

# 3. Writers fill stems/options (draft markers in place), then submit
# 4. Reviewer approves  → 5. Publisher publishes  → 6. npm run lint, then
#    fold into js/bank<N>.js via export so items ship in-repo
```

Roles are enforced server-side (approve requires reviewer/editor; publish
requires publisher/admin; separation-of-duties blocks approving your own
edit unless admin) — see README's authoring section.

## 8. Operations

- **Deploys:** every push to `main` auto-deploys (on by default).
- **Health:** Render polls `/api/health`; it returns `ok:true` even if the DB
  is briefly unreachable (the PG store logs and retries) — check Render logs
  for `[store:pg]` lines if data isn't persisting.
- **Plan notes:** free instances sleep after idle → the first request after a
  nap is slow; exam state lives in Postgres, so nothing is lost. Paid instances
  (starter and up) do not sleep.
- **Backups:** Supabase side (dashboard → Database → Backups / PITR).
- **Local parity with production:**
  `STORE=pg DATABASE_URL="postgresql://…" PGSSL=require npm start`

## 9. Troubleshooting

| Symptom | Fix |
|---|---|
| `no pg_config / SSL required` on connect | Keep `PGSSL=require`; ensure `DATABASE_URL` is the **session pooler** URI. |
| `relation "users" does not exist` | Run step 4 (`npm run db:migrate`) — tables are created by the runner. |
| Health OK but logins don't persist | Same as above, or wrong `DATABASE_URL` (check `[store:pg]` log lines). |
| Slow cold starts | Free/starter plan sleeps; upgrade plan or accept first-request latency. |
| Item edit in Supabase has no effect | The overlay is read at boot — restart the service. Confirm the log shows `bank from database: … replaced`. |
| Bank looks stale after editing `js/bank*.js` | The database overlay wins over the repo file. Re-run `npm run db:seed` to push the repo bank up. |
| `npm run db:seed` says pg driver missing | Run `npm ci` — `npm test` used to delete `node_modules/pg`; it now restores it. |
