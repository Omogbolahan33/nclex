/* RN Ready — bulk draft scaffolder (thousands-scale authoring pipeline).
   Generates schema-VALID skeleton items for the authoring pipeline: every
   scaffold passes authoring.validateItem, lands as status=draft via
   POST /api/admin/import (author/editor/admin key), and can never reach
   examinees until a reviewer approves and a publisher releases it.

   Usage:
     node tools/draft-bank.mjs --count 40 --cn PHA --sys GI                # stdout JSON
     node tools/draft-bank.mjs --count 60 --cn MOC --out drafts.json       # file

   IDs continue each Client-Need sequence without colliding (reads the live
   bank via the same vm harness the server uses). Stems/options carry DRAFT
   markers so half-finished work is unmistakable. Then:
     DATABASE_URL=… (or a local server) → import → review → approve → publish
   itemlint stays the gate: drafts are never lint-gated (they are not in the
   bank), but PUBLISH should follow a lint pass on the filled items.        */
import fs from "fs"; import path from "path"; import vm from "vm";
import { fileURLToPath } from "url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { contentFiles } = await import(path.join(root, "content.js"));

const args = process.argv.slice(2);
const opt = n => { const i = args.indexOf("--"+n); return i >= 0 ? args[i+1] : null; };
const COUNT = Math.max(1, Math.min(500, Number(opt("count") || 20)));
const CN = (opt("cn") || "PHA").toUpperCase();
const SYS = (opt("sys") || "INF").toUpperCase();
const OUT = opt("out");

if (args.includes("--help")){
  console.log("usage: node tools/draft-bank.mjs --count N --cn PHA --sys GI [--out file.json]");
  process.exit(0);
}

/* load the bank to find the highest used id per Client Need */
const ctx = { NC:{}, window:{} }; ctx.globalThis = ctx; ctx.window = ctx; vm.createContext(ctx);
for (const f of ["js/taxonomy.js", ...contentFiles(root).all, "js/engine.js"])
  vm.runInContext(fs.readFileSync(path.join(root, f), "utf8"), ctx, { filename:f });
ctx.NC.load();

const T = ctx.window.NC.TAX;
if (!T.clientNeeds.some(c=>c.id===CN)){ console.error("cn must be one of: "+T.clientNeeds.map(c=>c.id).join(", ")); process.exit(1); }
const sysIds = T.systems.map(s=>s.id||s);
if (!sysIds.includes(SYS)){ console.error("sys must be one of: "+sysIds.join(", ")); process.exit(1); }

const prefixes = { MOC:"MOC", SIC:"SIC", HPM:"HPM", PSY:"PSY", BCC:"BCC", PHA:"PHA", RRP:"RRP", PAA:"PAA" };
const pre = prefixes[CN] || CN.slice(0,3);
const used = new Set(ctx.window.NC.allItems().map(q=>q.id));
const reID = new RegExp("^"+pre+"-([0-9]+)$");
let next = ctx.window.NC.allItems().reduce((m,q)=>{ const c = reID.exec(q.id); return c ? Math.max(m, Number(c[1])) : m; }, 0) + 1;
const nid = () => { let id = `${pre}-${String(next).padStart(3,"0")}`; while (used.has(id)) { next++; id = `${pre}-${String(next).padStart(3,"0")}`; } used.add(id); next++; return id; };

const drafts = [];
for (let i=0;i<COUNT;i++){
  drafts.push({
    id: nid(), t: "single", cn: CN, sys: SYS, topic: `DRAFT: topic ${i+1} of ${COUNT} (${SYS})`,
    d: 1, b: 0, cj: "act", tags: ["draft","needs-writing"],
    stem: `DRAFT scaffold — replace with the clinical scenario #${i+1}: client presentation, age, setting, and the question actually being asked (keep it over 80 characters).`,
    opts: [ "DRAFT key — replace with the best action and its rationale-bearing detail",
            "DRAFT plausible near-miss — same domain, wrong reasoning",
            "DRAFT plausible near-miss — common misconception",
            "DRAFT clearly-wrong distractor for contrast" ],
    ans: 0,
    rat: { c: "DRAFT — explain why the key is correct and the physiology/principle behind it.",
           o: [ "DRAFT — why this option is correct.",
                "DRAFT — the error this distractor rewards.",
                "DRAFT — the misconception exposed.",
                "DRAFT — why this is plainly wrong." ],
           s: "DRAFT — the test-taking strategy or cue this item trains." },
    ref: "DRAFT — reference (guideline, text chapter, test-plan area)"
  });
}

const payload = JSON.stringify({ note: `scaffold ${COUNT} × ${CN}/${SYS} — ${new Date().toISOString().slice(0,10)}`, items: drafts }, null, 1);
if (OUT){ fs.writeFileSync(OUT, payload); console.log(`wrote ${COUNT} drafts → ${OUT} (import with an author/editor/admin key)`); }
else console.log(payload);
