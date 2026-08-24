-- RN Ready — Postgres schema v2: PER-TABLE NORMALIZED (STORE=pg).
-- Apply once:  psql "$DATABASE_URL" -f schema.sql
--
-- v2 layout: every growing collection lives in its own table so concurrent
-- readers (analytics, calibration jobs, a future multi-process writer) can
-- query real rows instead of cracking one JSONB document open.
--   users / tokens            authentication + sessions
--   responses                 every scored answer (owner = 'doc' for the
--                             server calibration feed, user email otherwise)
--   sims                      one row per simulation (hot fields + doc JSONB)
--   seen                      item-exposure counters (anti-memorization)
--   authoring_records         draft→review→approved→published→retired state
--   bank_patches              published/retired item patches replayed at boot
--   meta                      schema version, calibration report, migration flag
--   store (v1 legacy)         kept as migration source + per-flush backup doc
--
-- The adapter (store-pg.js) reads tables first; a legacy v1 document row is
-- migrated into these tables automatically on first boot.

CREATE TABLE IF NOT EXISTS store (
  key        TEXT PRIMARY KEY,
  doc        JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS meta (
  k          TEXT PRIMARY KEY,
  v          JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS users (
  email      TEXT PRIMARY KEY,
  hash       TEXT,
  salt       TEXT,
  profile    JSONB NOT NULL DEFAULT '{}'::jsonb,   -- user minus hash/salt/responses
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tokens (
  token      TEXT PRIMARY KEY,
  email      TEXT NOT NULL,
  expires    BIGINT NOT NULL
);
CREATE INDEX IF NOT EXISTS tokens_email_idx ON tokens (email);

CREATE TABLE IF NOT EXISTS responses (
  id         BIGSERIAL PRIMARY KEY,
  owner      TEXT NOT NULL DEFAULT 'doc',
  sid        TEXT NOT NULL DEFAULT '',
  qid        TEXT NOT NULL,
  ans        JSONB,
  score      REAL,
  answered   BOOLEAN,
  ts         BIGINT NOT NULL,
  mode       TEXT,
  time_ms    INT,
  timed      BOOLEAN,
  UNIQUE (owner, sid, qid)          -- mirrors engine.applyScore replace-on-reanswer
);
CREATE INDEX IF NOT EXISTS responses_ts_idx    ON responses (ts);
CREATE INDEX IF NOT EXISTS responses_qid_idx   ON responses (qid);
CREATE INDEX IF NOT EXISTS responses_owner_idx ON responses (owner);

CREATE TABLE IF NOT EXISTS sims (
  id         TEXT PRIMARY KEY,
  exam_id    TEXT,
  status     TEXT,
  theta      REAL,
  doc        JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS seen (
  qid        TEXT PRIMARY KEY,
  n          INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS authoring_records (
  qid        TEXT PRIMARY KEY,
  status     TEXT NOT NULL,
  version    INT NOT NULL DEFAULT 0,
  updated_by TEXT,
  record     JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS bank_patches (
  qid        TEXT PRIMARY KEY,
  op         TEXT NOT NULL,
  item       JSONB
);

-- Optional helpers (kept from v1, plus a size watch per collection)
CREATE OR REPLACE FUNCTION store_doc_size() RETURNS BIGINT
LANGUAGE sql AS $$ SELECT COALESCE(octet_length(doc::text), 0) FROM store WHERE key = 'state'; $$;

CREATE OR REPLACE VIEW store_table_sizes AS
SELECT 'responses' AS tbl, count(*)::BIGINT AS rows FROM responses
UNION ALL SELECT 'users',        count(*) FROM users
UNION ALL SELECT 'sims',         count(*) FROM sims
UNION ALL SELECT 'tokens',       count(*) FROM tokens
UNION ALL SELECT 'authoring_records', count(*) FROM authoring_records
UNION ALL SELECT 'bank_patches', count(*) FROM bank_patches;
