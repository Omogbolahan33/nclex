# RN Ready — NCLEX-RN Practice Platform · v3m

Mobile-first NCLEX-RN preparation platform: multi-axis practice, all 7 item formats,
unfolding clinical-judgment cases, server-side adaptive CAT simulation, spaced
repetition, honest readiness analytics — with accounts, cross-device sync, persistence,
and answer keys that never leave the server.

## Run it

```bash
npm i jsdom            # once per environment (dev dependency for the DOM test)
npm run build          # build standalone.html + public/ (key-free app)
npm start              # exam server on :3000
npm test               # engine/bank smoke (2144) + DOM (99) + admin (35) + store (36) + demo (1214)
npm run test:api       # API/security/authoring/PWA/hardening suite (~140, CAT-length dependent) — needs `npm start` running
npm run lint           # item-writing gate + duplicate-content scan of the bank
npm run calibrate      # item calibration report from the response log (--apply to persist)
npm run db:dedupe      # report duplicate question rows in the database (--delete to clean)
npm run import:bank    # bulk-import a JSON bank file as reviewable drafts (see below)
```

## Architecture

```
server.js        zero-dep exam server: key-free static hosting, scoring API,
                 server-side CAT, accounts (scrypt + bearer tokens), sync,
                 rate limiting, gzip, health, persistence hook
store.js         JSON-file store (atomic, debounced writes) → swap for Postgres
data/store.json  users · tokens · sims · response log (calibration feed)
public/          the served client — contains NO bank files at all; PWA shell
                 (sw.js build-stamped cache, manifest, icon) — sw never touches
                 /api/item/…/full, /api/admin, auth or sims
js/bank*.js      456 standalone items incl. 11 variantGroup sets (27 items), all
                 7 item formats, full metadata + rationales (server-side only)
js/case*.js      3 unfolding NCJMM case studies (18 items)
js/engine.js     scoring · θ ability · blueprint CAT · stopping rules · SRS ·
                 stats/readiness · sync merge · duplicate-content detection
                 (DOM-free, unit-tested)
js/render.js     7 NCLEX format renderers (accessible + review marking)
js/ui.js         hash router + screens (Home/Practice/Study/Simulate/Progress/Settings)
js/api.js        remote adapter: sanitized bootstrap, server scoring,
                 post-answer explanations, auth + track/state sync
authoring.js     v3c review workflow + v3l RBAC: draft → review → approved → published →
                 retired; full item validation against the taxonomy; versioning
                 (published items are never overwritten without a snapshot in
                 history); bulk import lands everything as drafts; bank patches
                 persist and replay at boot
admin/           authoring console (mobile-first, /admin) — key-gated UI whose
                 transition buttons render from the server's transition map
js/notify.js     v3d study reminders: permission-gated Notification API with
                 in-app fallback, daily time preference, exam-countdown + streak
                 messaging; local-only (no server push)
calibrate.js     v3b psychometrics: p-value, point-biserial discrimination,
                 empirical difficulty (logit) blended with authored b (n/(n+K));
                 flags low-discrimination / hard-floor / ceiling / slow items
standalone.html  the whole app in one self-contained file (local demo/offline mode)
store.js         storage dispatcher: JSON file (default) or Postgres (STORE=pg)
store-json.js    zero-dep JSON store — atomic tmp+rename writes, debounced,
                 RNREADY_STORE path override
store-pg.js      Postgres adapter v2 (PER-TABLE NORMALIZED): users · tokens ·
                 responses (ts-watermarked upserts, UNIQUE owner/sid/qid) · sims ·
                 seen · authoring_records · bank_patches · meta, one transaction per
                 flush + automatic v1 document migration; identical interface; `npm i pg`
schema.sql       Postgres DDL v2: normalized tables (users, tokens, responses,
                 sims, seen, authoring_records, bank_patches, meta) + v1 migration
test/            smoke (2144) · dom (99) · admin (35) · store (36) · demo (1214) · api (~140, CAT-length dependent) — 3,660+ checks total
```

## Feature set

| Area | Details |
|---|---|
| **Content** | 456 standalone items + 6 NCJMM case studies (36 sub-items) = 492-item pool tracking the 2026 NCLEX-RN blueprint; 74 items at maximum difficulty (16.2%); 11 variant groups across 27 items; all 7 item formats in use; all 8 Client Needs; every item: rationale per option, NCLEX strategy, difficulty (label + numeric *b*), CJ step, system/topic, tags, reference |
| **Practice** | Quick / Smart / Custom builder / by Client Need · system · topic · type · difficulty / Medication / Priority & Delegation / Timed; 30-item diagnostic → preparation profile; review-incorrect, bookmarks, review-later, re-test |
| **Simulation** | Full NCLEX-RN 2026 (85–150 items, 5 h, 3 cases, 15 pretest — zero reuse), Preview (26–40), Timed 60; pre-flight consent, no backtracking, no feedback, blueprint-constrained adaptive selection, 95%-confidence stopping rule vs cut score |
| **Clinical judgment** | Unfolding case studies with exhibit reveal schedules; six-step debrief mapped to NCJMM |
| **Spaced repetition** | Missed concepts auto-schedule (SM-2-lite); Study → Spaced Review queue; interval growth 1→3→7→16→35+ days; Home task integration |
| **Analytics** | Mastery by Client Need / system / type / CJ step / difficulty (recency-weighted), pacing, readiness score with weighted components + Knows/Thinks/Performs |
| **Psychometrics (v3b)** | EAP ability estimation (2PL, wide normal prior) replaces the Elo update in all engine paths; exposure-aware item selection (least-exposed among the 5 best-targeting items); calibration pipeline over the response log with admin endpoints (`X-Admin-Key`): compute → apply empirical difficulty → persist → re-apply on boot; CLI `npm run calibrate` |
| **Accounts & sync (v3a)** | Sign up / sign in / sign out in Settings; scrypt-hashed passwords, 30-day bearer tokens; progress uploads after each session and restores on any device; local progress merges (no data loss) |
| **Persistence (v3a)** | Users, tokens, sims, and the full response log survive restarts (`data/store.json`) — the response log is the feed for future item calibration |
| **Security** | Sanitized bank in the browser (no keys/rationales), server-side scoring, bank files never served (404), per-IP rate limits (auth 30/5 min, API 400/min), no plaintext secrets at rest |
| **Authoring & review (v3c)** | Workflow draft → clinical review → approved → published with legal-transition enforcement and version history (outgoing items snapshotted, never silently overwritten); full item-schema validation; bulk import (AI drafts land as drafts — human review before anything reaches examinees); export for backup; published items grow the live bank via persistent boot-replayed patches; admin console at `/admin` (key-gated) |
| **Anti-memorization (v3c/e)** | Items can carry a `variantGroup` (11 groups); the engine serves at most one member per exam/session in every selection path (practice, smart, diagnostic, simulation) and rotates re-tests to the least-exposed sibling |
| **No repeats, ever (v3o)** | A question is served **at most once per exam** — excluded by qid, by variant/duplicate group, and by content, so a bank that holds the same question under two ids cannot show it twice. When the eligible pool runs out the exam ends (`stopReason:"pool"`) instead of recycling answered items. Duplicate content (same stem + options, or a shared stem) is detected at boot, linked into one constraint group, reported at `GET /api/admin/duplicates`, and blocked at the authoring gate. Exposure history (`seen`) syncs with the account, and practice says out loud how much of a set is new: `12 new · 3 already answered` |
| **Key-gated explanations (v3c)** | `/api/item/:id/full` refuses (403) unless the requesting session already answered that item — rationales are never available before submission, even to a crafted request |
| **Distractor analysis (v3d)** | Per-option pick rate + point-biserial vs rest-score for single/multi items from the response log; flags dead (<5%), attracts-strong (rpb >+0.20 on a non-key option), weak-key; `GET /api/admin/distractors` + admin-console card + CLI section |
| **Study reminders (v3d)** | Daily reminder at a chosen time (Settings): browser notification when permission is granted, in-app fallback otherwise; exam-countdown and streak-aware messaging; persisted locally |
| **PWA offline (v3c)** | Service worker precaches the key-free shell + sanitized bootstrap (build-stamped, old caches purged); offline answers queue in localStorage as pending (excluded from stats) and replay through `/api/answer` on reconnect — scoring stays server-side because the keys never leave the server |

## Production deployment

Cloud: **Render Web Service (free tier) + Supabase Postgres** — see
`DEPLOYMENT.md` (runbook), `render.yaml` (checked-in record of the dashboard
settings), `npm run db:migrate` (schema.sql, idempotent), then
`npm run db:seed` (loads the bank into the `items`/`cases` tables).

**Vercel also works out of the box** (`vercel.json` + `api/index.js`; see
DEPLOYMENT.md §3b). The Vercel build embeds the bank into the serverless
bundle and serves the key-free app from the CDN; set `ADMIN_KEY` and
`STORE=pg`/`DATABASE_URL` in the project settings. Deploy from the repo —
not from a locally mutated copy (a hand-renamed `server.cjs` deployment is
what caused the 2026-08 `/var/task/js` ENOENT outage).

The content bank lives in Postgres at runtime: the server reads `items` and
`cases` at boot and overlays them on the in-repo bank, so editing a row in
the database changes what examinees see on the next restart without a
redeploy. `js/bank*.js` remain the seed source, the `standalone.html` build
input, and the fallback when the database is empty or unreachable.

**Demo / practice set (env switch).** A second, self-contained 128-question
packet (107 standalone items + 6 case studies, incl. the bow-tie and trend
items) lives in `demo/` and is seeded with `npm run db:seed:demo`. Set
`DEMO_BANK=1` in the Render dashboard to serve that set — and only that set —
to examinees; unset it (or `0`/`false`) to serve the regular bank again. The
health endpoint reports the live position: `"demoBank": true|false`. The
source document contains no answer key; answers + rationales were authored
for practice use. See DEPLOYMENT.md §4c.

Create the service by hand (**New → Web Service**); no Blueprint required.
Build `npm ci && node build-online.mjs`, start `npm start`, health
`/api/health`. Free instances have no persistent disk, so `STORE=pg` against an
external database is mandatory.

```bash
NODE_ENV=production ADMIN_KEY=<strong-key> npm start          # gate: refuses to boot without ADMIN_KEY
NODE_ENV=production ADMIN_KEY=<key> \
  TLS_CERT=/etc/tls/fullchain.pem TLS_KEY=/etc/tls/privkey.pem \
  PORT=3000 TLS_PORT=3443 npm start                            # HTTPS alongside HTTP (same handler)
STORE=pg DATABASE_URL=postgres://… PGSSL=require npm start    # Postgres backend (run db:migrate first)
REQ_LOG=1 npm start                                            # per-request access log line
```

| Concern | What ships |
|---|---|
| Security headers | `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options: DENY`, CSP (`default-src 'self'`, `frame-ancestors 'none'`) on every response |
| Error hook | JSONL error log at `data/errors.log`; `uncaughtException` (log + exit), `unhandledRejection` (log), request errors hooked |
| Lifecycle | SIGTERM/SIGINT → store flush → close → exit (verified live); expired-token sweep hourly |
| Secrets | `ADMIN_KEY` mandatory in production (boot gate + tested); scrypt passwords; bearer tokens expire |
| Storage | JSON default (atomic, debounced) or per-table Postgres (schema.sql v2; TLS auto-required for Supabase/Render/RDS hosts) |
| TLS | cert/key PEM paths + optional port; dev cert generation in `data/tls/` for testing only |

### Duplicate questions & repeats (v3o)

Two symptoms, one root cause each:

*“I saw the same question five times in one simulation.”* A bank seeded or
imported into a database can hold the same question under several qids, and
every selection rule was keyed on qid — so the copies looked unrelated. Worse,
when the eligible pool ran out mid-exam the engine fell back to the **whole
bank**, re-serving items the candidate had already answered (measured: the same
item up to 12× in one sitting on a 30-item pool). Both are gone:

- an item is excluded from an exam by qid **and** by variant/duplicate group,
  and there is no full-bank fallback — when nothing new is left the exam ends
  with `stopReason:"pool"` and is scored on what was administered;
- `NC.duplicateIndex()` fingerprints every item (stem + presented options) and
  its stem, unions those with authored `variantGroup` edges, and any cluster of
  ≥2 becomes one constraint group — at most one member per exam/session, in
  every selection path (simulation, practice, smart, diagnostic).

Nothing is deleted, so responses, stats, calibration and authoring history keep
resolving; the extra copies simply can never be co-served.

*“There are no new questions.”* `pickItems` used to silently drop
`excludeSeen` whenever the unseen pool was smaller than the request, and the
exposure map lived only in one device's `localStorage`. Now new items are
always taken first and recycled ones fill the tail least-exposed-first, the
session records its own split (`s.fresh` / `s.recycled`), the UI states it
(`12 new · 3 already answered`), and `seen` rides the account sync
(`/api/track` → `/api/state`, merged by max) so a second device or a cleared
cache no longer starts from zero. Sims also receive the candidate's history as
a soft preference, so returning candidates get new material first.

| Where | What |
|---|---|
| boot log | `duplicate content linked: N cluster(s) …` or `no duplicate content in the bank` |
| `GET /api/health` | `duplicateClusters` · `duplicateItems` · `variantGroups` |
| `GET /api/admin/duplicates` | full cluster report with ids, reasons and stem previews |
| `npm run lint` | duplicate scan; same-content clusters fail the lint gate |
| `npm run db:dedupe` | reports duplicate rows straight from the `items` table; `--delete` removes the extra copy (`--keep=first\|last\|least`, `--dry-run` to preview) |
| authoring gate | a draft/import that repeats a bank item is rejected with the id it collides with |

## Honest limits (ongoing)

- Practice *selection* is still client-side (scoring is server-side).
- Calibration needs real candidate volume — current stats come mostly from test traffic (n≥8 gate, blend weight n/(n+20) protects against thin data).
- Offline-queued answers score only on reconnect (keys are server-side by design) — pending items are excluded from stats until synced.
- **v3o — no repeats**: hard one-serve-per-exam rule (qid + variant/duplicate group, no full-bank fallback — a dry pool ends the exam as `stopReason:"pool"`), boot-time duplicate-content detection that links repeats and shared stems into one constraint group, an authoring/import gate against new duplicates, `npm run db:dedupe` + `GET /api/admin/duplicates` reporting, and exposure history (`seen`) synced per account with honest "N new · M already answered" messaging in practice.
- **v3m — deploy + scale**: `content.js` auto-discovers `js/bank<N>.js`/`js/case<N>.js` (drop a file in, add its script tag — the smoke drift guard fails on missing *or* stale tags; all loaders/linter/calibration/build/tests share it), Render Web Service settings (`render.yaml`) + Supabase runbook (`DEPLOYMENT.md`) + idempotent `npm run db:migrate`, managed-Postgres TLS auto-detect, and `tools/draft-bank.mjs` — a bulk scaffolder that emits schema-valid drafts continuing each CN ID sequence for the governed import→review→approve→publish pipeline (verified live: published item reaches examinees, drafts never do; bank restored after retire). Bootstrap payload: 240 KB raw / 75 KB gzipped at 344 items (~250 B/item gzipped → thousands ≈ well under 1 MB). Health/banner versions now track `package.json`.
- **v3l — governance + storage**: role-based authoring (AUTH_KEYS="key:role:name,…": author drafts, reviewer approves — with separation of duties, a reviewer cannot approve content they last edited — publisher releases; admin stays break-glass and self-approvals are tagged in history; 403 vs 400 semantics enforced), and per-table Postgres normalization (schema.sql v2: users/tokens/responses/sims/seen/authoring_records/bank_patches/meta; automatic v1→v2 document migration on first boot; ts-watermarked upsert responses mirroring the engine's replace-on-re-answer; legacy backup row kept for rollback).
- The product is NCLEX-RN only. The PN exam family was removed along with the `fam` affinity system in the exam engine; the 30 items that had been authored from the practical/vocational nurse perspective remain in the bank as ordinary RN-eligible content.
- Reminders fire while the app is open (tab or installed PWA); no server push or closed-app delivery on the zero-dep stack.
- Distractor statistics inherit the calibration caveat: current samples are mostly test traffic (n≥20 gating; dead/weak flags are provisional until real candidate volume).
- Built-in TLS is for direct exposure/testing — put a real reverse proxy (Let's Encrypt, HTTP/2) in front for public deployments.
- All bank content is AI-assisted drafting: mandatory human clinical review before any production use (the review workflow exists for exactly this).
