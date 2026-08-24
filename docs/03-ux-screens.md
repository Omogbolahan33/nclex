# 03 · UX Screen Specification (Mobile-First)

**Design canvas:** 360–430 px width, primary; tablet/desktop supported by graceful widening (max content column 720 px). Touch targets ≥ 44×44 px. Typography ≥ 16 px body. All requirements apply at 360 px without horizontal scroll.

**Shared chrome (practice runners):** header strip = product wordmark (small) · optional timer · item counter (practice only) · flag ⚑ · bookmark ☆. Bottom = primary action bar with **NEXT →**.

---

## A. Onboarding & Account

### UX-O1 · Splash / app shell
- **Purpose:** first paint, session restore, route decision.
- **Behavior:** silent token refresh → authed ? route to last context (active session resume prompt if one exists) : `/auth`. Skeleton ≤ 1.5 s; then progress feedback.
- **Edge:** offline → serve cached shell; banner "Offline — cached practice available."
- **A11y:** reduced-motion honored (no animated logo loops).

### UX-O2 · Sign up / sign in
- **Elements:** email+password, OAuth (Apple/Google), password reset link, legal consent (privacy/TOS incl. NCSBN non-affiliation disclaimer), locale/timezone capture.
- **Validation:** inline, on blur; server errors mapped to fields.
- **Edge:** duplicate email → sign-in prompt; rate-limited after 5 failures (XCU-S6).
- **Analytics:** `signup_completed`, `signin_failed`.

### UX-O3 · Exam profile setup (wizard, 4 steps)
1. **Exam** — NCLEX-RN (only active choice; PN shown as "coming soon" — data-driven, not hard-coded).
2. **Exam date** — date picker (min today+1, max +24 months); shows computed "weeks remaining."
3. **Self-assessment** — level (just beginning / comfortable / final review) + daily study minutes (15/30/60/90/120).
4. **Goal** — target readiness (default 80) + optional licensure jurisdiction note.
- **Behavior:** profile editable in Settings; changing exam date re-plans study plan (UX-T2).
- **Skip:** allowed after step 1; defaults applied; nudge card on Home.

### UX-D1 · Diagnostic intro
- **Content:** what it measures (baseline ability, Client Need / body-system / CJ / format weaknesses), length (30 items, adaptive, ~30–40 min), rules (untimed by default; optional 45-min timer; no explanations until end).
- **CTA:** Start diagnostic · secondary "Later".
- **Edge:** resume support if abandoned mid-diagnostic (single resume; second abandon → restart).

### UX-D2 · Diagnostic runner
- Reuse UX-Q1 in restricted mode: no explanations per item, no score until end, flag/bookmark allowed, NEXT requires answer.
- Adaptive selection per doc 07 §6 (diagnostic variant: wider difficulty spread, fixed blueprint-lite).

### UX-D3 · Preparation profile (diagnostic results)
- **Sections:** ability band (e.g., "Developing — 42nd percentile of prep users" with disclaimer), weakest 3 Client Needs with bars, weakest 3 body systems, CJ step profile (6 bars), format weaknesses (types with <70%), pacing note (if timed), recommended starting stage + "Your 8-week plan" preview → CTA to Home.
- **Copy rule:** never imply NCLEX outcome; label "Preparation profile."

---

## B. Home

### UX-H1 · Home dashboard
- **Purpose:** answer "What should I do today?" in ≤ 3 seconds.

```
┌─────────────────────────────┐
│ Good afternoon, Amaka       │
│ Exam in 6 weeks · Streak 12 │
│                             │
│ ┌─────────────────────────┐ │
│ │ NCLEX READINESS      78 │ │  ← tap → UX-G2
│ │ ▲ +3 this week         │ │
│ └─────────────────────────┘ │
│ TODAY'S PLAN                │
│ ┌─────────────────────────┐ │
│ │ 1 · 10 questions        │ │  ← Pharmacology (weak)
│ │ 2 · 1 clinical case     │ │  ← Respiratory
│ │ 3 · Review 7 concepts   │ │  ← spaced queue
│ │              Continue → │ │
│ └─────────────────────────┘ │
│ Quick Practice · Mock Exam  │
│ Clinical Judgment · Topics  │
│ (2×2 grid, → UX-P1/UX-S1)  │
└─────────────────────────────┘
```

- **Elements:** greeting (time-of-day), exam countdown chip, streak chip, readiness ring (tap→UX-G2), Today's Plan card (2–3 tasks, ordered by strategy engine; each row = task + reason tag; Continue starts next task), quick-action grid, recent-activity strip (last session, resume CTA).
- **States:** new user → diagnostic card replaces plan; plan complete → celebratory-but-calm summary + "plan tomorrow's 3 tasks."
- **Edge:** exam date passed → prompt to update date; readiness "insufficient data" → show placeholder ring with "Take diagnostic."
- **Analytics:** `home_viewed`, `today_task_started{task_type}`.

---

## C. Practice

### UX-P1 · Practice hub
- **Order (strategy-ranked, static structure):**
  1. **Quick Practice** → UX-P2 (5/10/20/30)
  2. **Smart Practice** (weakness-weighted; shows current target areas, e.g., "Pharmacology + Physiological Adaptation")
  3. **Custom Practice** → UX-P3
  4. **By Client Need** (8 subcategories with live mastery %)
  5. **By Body System** (12 systems; drill into topics)
  6. **By Topic** (search + A–Z)
  7. **By Question Type** (8 formats)
  8. **Clinical Judgment** → UX-C1
  9. **Medication Practice** (pharm + dosage calc)
  10. **Priority & Delegation** (ABCs, Maslow, acute/chronic, stable/unstable, expected/unexpected, RN/LPN/UAP scope)
  11. **By Difficulty** (Easy/Moderate/Hard/Very Hard)
  12. **Timed Practice** (pace targets)
- Each row shows live mastery % and item availability count (e.g., "Cardiovascular · 82% · 214 items").
- **Empty states:** any filter with 0 items → "Not enough items yet — nearest match:" suggestion (never dead-end).

### UX-P2 · Quick practice picker
- Cards: 5 / 10 / 20 / 30 questions; mix mode (auto-balanced blueprint-lite); CTA starts immediately. Remember last choice.

### UX-P3 · Custom practice builder
- **Filters (stackable):** count (10–100, stepper), Client Need (multi), body system (multi), topic (multi), difficulty (multi), question type (multi), CJ step (multi / "case studies only"), tags (calculation, priority, delegation, safety, teaching, assessment, intervention, evaluation), timed toggle + pace, "exclude seen items" toggle (default on).
- **Live footer:** "≈ 68 items match · starting 20" — if matches < requested, show actual and offer "relax filters" link.
- **Confirm sheet:** summary + Start.

### UX-P4 · Content browser (`:axis` = client-need | body-system | topic | type)
- Hierarchy drill: axis list → subcategory/topic list (mastery % + counts) → topic detail (description, performance, subtopics, "Practice 10/20/All") → confirm sheet.
- Topic detail includes **concept chips** (e.g., Heart Failure → fluid overload, digoxin toxicity) linking to concept cards (UX-T6).

---

## D. Quiz Runner (all practice modes)

### UX-Q1 · Runner shell
```
┌─────────────────────────────┐
│ NCLEX Practice   12:42  17/20│  ← timer (if timed) · count
│ ─────────────────────────── │  ← progress hairline
│ Pharmacological Therapies   │  ← context chip (practice only)
│ A 62-year-old client with   │
│ heart failure is receiving  │
│ digoxin 0.25 mg daily...    │
│ [Exhibits ▾] (if any)       │
│ ─────────────────────────── │
│  ◯ A  Check apical pulse... │
│  ◯ B  Assess oxygen sat...  │
│  ◯ C  Review potassium...   │
│  ◯ D  Monitor for ...       │
│ ⚑ Flag        ☆ Bookmark    │
│                    NEXT →   │
└─────────────────────────────┘
```
- **Behaviors:** answers changeable any time before submission; NEXT with no selection → confirm "Skip without answering?" (skips are recorded as unanswered, scored incorrect); item elapsed time recorded server-side (view→submit deltas); leaving runner (back/close) → save state + resume card on Home; timer end → auto-submit session.
- **Context chips** show axis (Client Need / system / topic) and difficulty **in practice only** — never in simulation.
- **Edge:** images/exhibits lazy-loaded with placeholders; if an item fails asset load → "Report issue" + substitute item offered (practice only; in simulation the item still must render — see ENG-14).

### UX-Q2 · Question renderers (interaction contracts)

| Format | Interaction | Selection rules | Keyboard/AT path |
|---|---|---|---|
| **Single response** | Radio list A–D/E | 1 required | ↑↓ + Space; roving tabindex |
| **Multiple response** | Checkbox list, "Select all that apply" | ≥1; server validates count policy | Space toggles |
| **Extended multiple response** | 2–4 checkbox groups, each "select all" | ≥1 per group | Groups are fieldsets with legend |
| **Extended drag & drop** | Options → targets (categories or ordered ranks) | Drag via pointer; **always** paired with ↑/↓ move buttons and "assign" menu | Fully keyboard-operable; same scoring |
| **Cloze / drop-down** | 1–3 sentences, each blank a `<select>`-style control | All blanks required | Native select semantics |
| **Enhanced hot spot (highlight)** | Tap/click words or table cells or image regions to highlight | Per-item spec (word span / row / region) | "Toggle highlight" buttons per unit; text alternative list |
| **Matrix / grid** | Rows × columns, radio (one per row) or checkbox (any) per item spec | Row-wise rules enforced | Grid with row-wise tab order |
| **Case study item** | Embedded in UX-C2 | Per-item type | See UX-C2 |

All renderers: option letters preserved (A, B, C…); selected state = filled control + 2 px focus ring + bold (never color alone); option text 16 px+; long stems scroll within content area, action bar pinned.

### UX-Q3 · Calculator (overlay)
- **Spec (mirrors on-screen calculator):** display (up to 12 digits), 0–9, `.`, `+ − × ÷`, `=`, `+/-`, `%`, `C` (clear entry), `AC`, backspace. No history tape, no scientific functions.
- Opens as bottom sheet over item; persists per session; keyboard input supported on desktop; labeled "Calculator" for AT.

### UX-Q4 · Confirmations
- Submit session with unanswered items → list count, confirm/cancel.
- Quit mid-session → "Save & exit" (default) / "Discard" (destructive, second confirm).
- In simulation: **no** quit-without-second-confirm; wording is neutral ("End simulation and score with items answered?").

### UX-Q5 · Practice results summary
- **Header:** score ring (correct %) + item count + time; then strip: "Score all-or-nothing vs partial credit" toggle where applicable (display convention: show both, e.g., 12/20 strict · 15.5/20 partial).
- **Bands:** by Client Need, by axis drilled, CJ steps (mini bars).
- **CTAs:** Review all items → UX-Q7 · Practice similar (re-generates same-filter set excluding seen) · Back home.
- Incorrect > 50% → supportive copy + "These concepts went to your review queue."

### UX-Q6 · Explanation view (the teaching event)
Structure (per item):
1. **Your answer vs correct** — clear marking; if multiple formats, per-element marking (which options/blanks/cells were right/wrong).
2. **Why the correct answer is correct** (clinical reasoning).
3. **Why each distractor is wrong** — one by one, always present for choice-type items.
4. **NCLEX strategy** — how to think about it on the exam (prioritization frame, ABCs, therapeutic vs non-therapeutic, safety-first, etc.).
5. **Key concept** — chip linking to concept card; related concepts row.
6. **Item metadata** — Client Need, system, topic, difficulty, CJ step (collapsible).
7. For CJ items: **step-mapped rationale** (Recognize cues → … → Evaluate outcomes walkthrough).
- **Actions:** ☆ bookmark · ⚑ report issue · "Practice similar" (same concept, unseen items/variants).

### UX-Q7 · Session review list
- Rows: item # · format icon · ✓/✗/unanswered · flagged ⚑ · bookmarked ☆ · topic chip. Filter chips: All / Incorrect / Flagged / Bookmarked. Tap → UX-Q6. List persists in History.

---

## E. Clinical Judgment

### UX-C1 · CJ hub
- Intro explainer card (NCJMM 6 steps, collapsible). Case list: cards with title, setting (med-surg/ICU/ED/etc.), systems tags, difficulty, personal score if attempted, "New case" / "Resume." Filters: body system, setting, CJ step emphasis (find cases weak on a step), unseen only.

### UX-C2 · Case study runner
```
┌─────────────────────────────┐
│ Case Study            2 / 6 │
│ 64-year-old male · Room 12  │
│ ─────────────────────────── │
│ [History][Vitals][Labs][MAR]│  ← exhibit tabs (UNFOLD)
│ ┌─────────────────────────┐ │
│ │ Nurse's Notes (tap)     │ │  exhibits open as sheets
│ └─────────────────────────┘ │
│ QUESTION — Analyze Cues     │
│ Which findings require      │
│ immediate follow-up?        │
│ □ Finding 1  □ Finding 2    │
│ □ Finding 3  □ Finding 4    │
│                    NEXT →   │
└─────────────────────────────┘
```
- **Unfolding rule (hard):** the exhibit set available at item *i* is exactly what the case defines for item *i*. Later evidence never appears earlier. Items cannot be revisited (mirror NCLEX case behavior); this is stated in CJ-hub explainer.
- **Behaviors:** exhibit sheets stay open while answering (candidate must inspect, like the real exam's drop-down exhibits); flag/bookmark allowed; item type varies (EMR, drag-drop, cloze, hot spot, matrix per NGN).
- **Edge:** resume mid-case (exact item + exhibits state); case time recorded per item.

### UX-C3 · Case results
- Per-step scorecard: 6 rows (Recognize cues … Evaluate outcomes) ✓/✗ + partial credit where applicable; then per-item explanations (UX-Q6) **plus** the full unfolded case timeline ("what you saw → what it meant") as a narrative walkthrough — the core CJ teaching artifact.
- CTA: "Practice a similar case" / "Drill weakest step: Prioritize Hypotheses."

---

## F. Simulation

### UX-S1 · Simulate hub
- Cards: **NCLEX Simulation** (full adaptive, primary), **Timed Exam** (fixed-length, e.g., 60/85 items, adaptive-lite), **Custom Mock** (choose length/time/blueprint emphasis — still exam rules). History list of past simulations (date, length, outcome band, ability trend sparkline).
- Config sourced from `ExamConfiguration` (2026 RN: 85–150 · 300 min · 3 cases · 15 pretest).

### UX-S2 · Pre-flight (rules & consent)
- Checklist (checkbox per row, all required):
  - 85–150 items; length varies — you will not know when it ends
  - 5-hour total time; optional breaks ~2 h and ~3.5 h (clock keeps running)
  - One item at a time; **no going back**
  - No explanations or feedback during the exam
  - Calculator available
  - Work uninterrupted; treat it like test day
- Environment setup hints (do-not-disturb, charger, water). Start button disabled until all boxes checked. Requires stable connectivity (offline simulation blocked — XCU-O2).

### UX-S3 · Simulation runner
- **Chrome:** minimal header = timer (mm:ss → hh:mm:ss after 1 h) · item position indicator **"Item 17"** (sequential count only — never "items remaining," never percentage, never projected stop) · calculator button · flag ⚑ (organizational only, never returns to items) · break button (enabled only at break points).
- **Behaviors:** NEXT is one-way and irreversible (confirm on first 2 items only, then no confirm — mirrors exam flow and prevents accidental double-advance); no score, no correctness feedback, no explanations; case studies appear as 6-item unfolding blocks per UX-C2 rules; pretest items indistinguishable; leaving route (refresh/close) triggers UX-S5; timer expiry → auto-score with answered items (rules screen states this).
- **Stamina telemetry (silent):** per-item time, blinks of inactivity, scroll behavior — feeds pacing analytics (FR-ANA-40).
- **A11y:** same renderer contracts (UX-Q2); AT users get identical no-backtracking semantics.

### UX-S4 · Break screen
- Offered automatically at ~2 h and ~3.5 h checkpoints (between items): "Optional break — the 5-hour clock continues. Estimated remaining: [time]." Buttons: Take break / Continue. Break screen shows only elapsed total time (no item info) + "Resume" (user-controlled; no fixed 10-min cap in v1 — configurable).

### UX-S5 · Interruption / resume gate
- On return after accidental navigation/reload: full-screen gate — "Your simulation is paused. Resume (recommended) or end now and score with items answered." Suspicious repeated reloads (>2) logged to session events (XCU-I3); after 3 interruptions in one simulation, warn once: "Interruptions affect the usefulness of this simulation."

### UX-S6 · Simulation results
- **Header (mandatory copy):** "NCLEX-style simulation complete — app estimate, not an official or predicted NCLEX result."
- **Outcome band (two bands, deliberately not pass/fail):**
  - **Above readiness threshold** — ability estimate comfortably above passing standard θ-cut
  - **Below readiness threshold**
  - (Edge state near cut: "Borderline — indistinguishable from the passing standard at this session length")
- **Panels:** ability estimate (θ with confidence band + where the cut sits), items administered & stop reason (85-stop early confidence / continued / 150 max / time), content coverage vs blueprint (8 bars), CJ performance (6 steps), format performance, time management (pace curve: sec/item across the session; flags "pace deteriorated after item 60"), stamina markers.
- **Weaknesses:** top 3 named areas with one-line evidence.
- **Recommended next steps:** concrete, tappable (e.g., 20 pharmacology items · 2 CJ cases · 1 timed 60-item session).
- **Never shown:** official-looking pass certificate, percentile-as-promise, "you will pass."

---

## G. Study

### UX-T1 · Study hub
Rows: Study Plan · Weak Areas · Review Incorrect · Bookmarks · Review Later (items flagged for study) · Spaced Review (P1, with due-count badge) · Concept Library (P2).

### UX-T2 · Study plan
- Inputs (editable): exam date, weekly hours, start stage. Output: week-by-week plan (e.g., Wk1 Fundamentals+Safety … Wk8 Simulations) rendered as vertical timeline; each week: focus areas, task checklist (sets/cases/reviews), estimated hours.
- **Adaptive rule:** weekly focus re-weights toward weakest Client Needs; completed weeks lock with summary; "Re-plan" regenerates remaining weeks from current evidence.
- **Edge:** plan shorter than 2 weeks → daily-level plan; exam date moved → re-plan prompt.

### UX-T3 · Weak areas
- Ranked list (mastery ascending, min 10 items seen): area (Client Need / system / topic / concept) · mastery % · trend arrow · "weak since" duration · CTA "Practice 20 on this." Empty state: "No weak areas detected yet — answer at least 30 questions."

### UX-T4 · Review incorrect
- All items answered incorrectly, newest first; filters (axis, session, age); each row → UX-Q6 (explanation). "Re-test all" generates a set of same-concept **unseen variants** (anti-memorization, FR-VAR-1).

### UX-T5 · Bookmarks / Review later
- Two segments (saved ☆ / marked for study ⚑); sort & filter; note field per bookmark (P1); export list (P2).

### UX-T6 · Spaced review queue (P1)
- Due-today concept cards (not items): each card = concept summary (2–4 lines from concept library) + "Check understanding" → 1–3 fresh items on the concept → delayed reschedule (interval × performance: miss → shorter interval).
- Queue view: due now / this week / future (counts only).

---

## H. Progress

### UX-G1 · Progress hub
- Header: readiness ring + 3-dimension summary strip (**Knows / Thinks / Performs** percentages) — the signature view.
- Cards → UX-G2 Readiness · UX-G3 Performance · UX-G4 History · Clinical Judgment profile · Timing & stamina.

### UX-G2 · Readiness detail
- Score composition: contribution bars (weights in doc 07 §8), trend (12-week sparkline), component table (recent difficulty-adjusted performance, Client Need balance, CJ, formats, timed, simulation, consistency).
- Data gates: any component with insufficient data → "Not enough data yet" + what to do (e.g., "Complete 1 simulation").
- **Fixed disclaimer:** "This is an app-generated readiness estimate. It is not an official NCLEX result or a prediction."

### UX-G3 · Performance breakdowns
- Tabs: Client Needs (8 bars + target range shading) · Body Systems (12 bars) · Question Types (8 bars) · CJ Steps (6 bars) · Difficulty (4 bars) · Topics (drill-in). Each bar: mastery %, n answered, trend. Tap-through to filtered practice CTA.
- Timing tab: avg sec/item · by type · by difficulty · pace curve across sessions · "accuracy vs speed" scatter insight sentences (e.g., "Your accuracy drops 14% when you answer in under 45 s").

### UX-G4 · History
- Sessions & simulations list (date, mode, score, duration); calendar heat-map of activity; streaks; totals (items answered, cases completed, simulations, hours).

---

## I. Settings & Subscription

### UX-X1 · Settings
- Profile (name, email, exam type, exam date, daily target) · Accessibility (text size S/M/L, reduce motion, high contrast, left-handed thumb zone — P1) · Data (export my data, delete account) · Legal & disclaimers · Sign out.

### UX-X2 · Notification settings (P1)
- Master toggle + per-type: daily reminder (time), plan reminder, weak-topic nudge, spaced review due, exam countdown, simulation recommendation. Quiet hours respected.

### UX-X3 · Subscription / paywall (P1)
- Tier comparison (Free/Premium; see doc 09 §8); paywall surfaces only at limit boundaries with graceful message (never mid-item); restore purchases; manage plan; entitlement state cached offline.
