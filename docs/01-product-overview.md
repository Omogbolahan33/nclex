# 01 · Product Overview

## 1. Vision

Most NCLEX "prep apps" are question banks with a leaderboard. This product is a **preparation system** with four distinct jobs:

1. **Learn** — build knowledge and clinical reasoning.
2. **Practice** — repeatedly attack specific weaknesses.
3. **Simulate** — reproduce the actual NCLEX experience as closely as a non-official product honestly can.
4. **Measure readiness** — estimate whether the candidate is approaching exam readiness.

### Honesty constraint (non-negotiable)

A web app cannot reproduce the official NCLEX CAT without NCSBN's psychometric calibration and item pool. The product therefore provides an **NCLEX-style adaptive simulation** and **never claims to predict** the official result. This constraint drives copy, UX, and engineering decisions throughout this PRS.

## 2. Primary and future targets

| Target | Scope |
|--------|-------|
| **Primary** | NCLEX-RN, 2026 Test Plan (effective 2026-04-01 → 2029-03-31) |
| **Future** | NCLEX-PN; future test-plan versions; different exam configurations, banks, and scoring models |

The exam engine is a **generic exam engine parameterized by `ExamConfiguration` data** (doc 05 §6). Nothing about RN item counts, blueprint percentages, or timing may be hard-coded in the frontend or engine logic.

## 3. Goals and non-goals

### Goals

- Get a candidate from "unknown baseline" to "demonstrably ready" through a guided progression (diagnose → build → strengthen → integrate → apply → perform → simulate → ready).
- Make every answered question a **teaching event** (option-level rationales, NCLEX strategy, concept linkage).
- Make **clinical judgment (NCJMM)** a first-class, dedicated practice mode — not a tag buried in filters.
- Give practice generation along **any axis** the user wants: Client Need, body system, topic, difficulty, question type, clinical-judgment step, weakness.
- Produce an exam simulation faithful in *structure* (variable length 85–150, 5-hour clock, no backtracking, one item at a time, case studies, calculator, no feedback) and honest about being an *approximation* in *measurement*.
- Separate **what the candidate knows / how they think / how they perform** (knowledge, clinical judgment, stamina/timing/format skill) in every analytic surface.

### Non-goals (v1 and explicitly out of scope)

- Official score prediction or "pass guarantee" claims.
- Proctoring, identity verification, or lockdown-browser behavior.
- Nursing-school curriculum management (courseware, syllabi, grading).
- Live tutoring marketplace, community forums (Phase 2+ decision), social leaderboards.
- Publishing user content; the item bank is professionally authored and reviewed only (AI-assisted drafting allowed, human-reviewed before publication — doc 08 §7).

## 4. Personas

| Persona | Context | Primary needs | Product implications |
|---------|---------|---------------|----------------------|
| **Amaka — new graduate, first attempt** | Finished nursing program within 12 months; studying 2–4 h/day; exam in 8–10 weeks. | Structure, a plan she can trust, honest readiness signal. | Onboarding → diagnostic → study plan; daily goal; streaks kept secondary. |
| **Tunde — internationally educated nurse (IEN)** | Trained outside the US; working while studying; exam date set by licensure timeline. | Efficient sessions (45–90 min), unfamiliar NGN formats, weakness mapping vs. US-style items. | Question-type practice mode; timed practice; case-study training; offline practice for commute. |
| **Grace — repeat test-taker** | Failed once; anxious; over-practices strong areas. | Targeted remediation; confidence management; evidence of change. | Weak-area engine, spaced repetition, readiness trend, simulation exposure therapy. |
| **Chidi — employed nurse, limited time** | 30–45 min sessions on mobile, often on poor connectivity. | Daily question set, offline, no friction. | PWA, daily practice, sync-on-reconnect, aggressive performance budget. |

## 5. Product principles

1. **Knowledge / thinking / performance are different axes.** A candidate can have Knowledge 85%, Clinical Judgment 65%, Exam Stamina 52% and still be under-prepared. Every progress surface must reflect the split (doc 03 UX-G1/G2).
2. **Multi-axis practice, not one syllabus.** A question simultaneously belongs to Client Need × Body System × Topic × Concept × Skill × CJ step × Type × Difficulty. Practice generation is a query over that graph (doc 05 §2, doc 06 §2).
3. **Content quality > quantity.** Every item passes a defined review pipeline before publication (doc 08 §4). A smaller verified bank beats a large unreviewed one.
4. **The exam is the UX for simulation.** No explanations, no backtracking, no score, no "questions remaining" hints during simulation (doc 03 UX-S3).
5. **Teach, don't just score.** Every practice answer produces rationale content and a learning record (doc 03 UX-Q6; doc 05 §4).
6. **Mobile-first (360–430 px), accessible (WCAG 2.1 AA), fast, offline-tolerant for practice.**

## 6. NCLEX-RN reference facts (encoded as data)

### 6.1 Exam characteristics — 2026 RN Test Plan

| Characteristic | Value | Where encoded |
|---|---|---|
| Minimum items | 85 | `ExamConfiguration.minItems` |
| Maximum items | 150 | `ExamConfiguration.maxItems` |
| Maximum duration | 300 minutes (5 h) | `durationMinutes` |
| Delivery | Computerized adaptive testing | Adaptive engine (doc 07) |
| Clinical judgment case studies | 3 case studies / 18 scored case items | `caseStudies` |
| Pretest (unscored) items | 15 | `pretestItems` |
| Item review/backtracking | Not allowed after advancing | `allowBackNavigation: false` |
| Presentation | One item at a time | Session manager |
| Calculator | On-screen basic calculator | `calculator: true` |
| Breaks | Optional, offered after ~2 h and ~3.5 h; included in the 5-hour clock | `breaks` |
| Stopping | Adaptive; not necessarily at 85 or 150 | `stoppingRule` |

### 6.2 Client Needs blueprint (2026 RN) — seed data

| Category | Subcategory | Range | Midpoint (planning default) |
|---|---|---|---|
| Safe & Effective Care Environment | Management of Care | 15–21% | 18% |
| Safe & Effective Care Environment | Safety & Infection Prevention and Control | 10–16% | 13% |
| Health Promotion & Maintenance | — | 6–12% | 9% |
| Psychosocial Integrity | — | 6–12% | 9% |
| Physiological Integrity | Basic Care & Comfort | 6–12% | 9% |
| Physiological Integrity | Pharmacological & Parenteral Therapies | 13–19% | 16% |
| Physiological Integrity | Reduction of Risk Potential | 9–15% | 12% |
| Physiological Integrity | Physiological Adaptation | 11–17% | 14% |

Individual exams vary **within** the permitted ranges; the adaptive engine samples within ranges, not always at midpoints (doc 07 §4.3).

### 6.3 Clinical judgment — NCJMM

Six-layer model; case studies map one item per layer:

1. Recognize Cues → 2. Analyze Cues → 3. Prioritize Hypotheses → 4. Generate Solutions → 5. Take Action → 6. Evaluate Outcomes.

### 6.4 Item formats

Multiple choice · Multiple response · Extended multiple response · Extended drag-and-drop · Cloze/drop-down · Enhanced hot spot (highlighting) · Matrix/grid. The five NGN case-study formats: extended multiple response, extended drag-and-drop, cloze, enhanced hot spot, matrix/grid.

## 7. Three-dimension model (drives analytics & readiness)

| Dimension | Measures | Sources |
|---|---|---|
| **Knows** (Knowledge) | Concept mastery, topic mastery, Client Need mastery | Practice responses, spaced review |
| **Thinks** (Clinical judgment) | NCJMM step performance, prioritization, delegation decisions | CJ-tagged items, case studies |
| **Performs** (Exam performance) | Timing, stamina, format familiarity, simulation outcome | Timed sessions, simulation events |

## 8. Glossary

| Term | Definition |
|---|---|
| **CAT** | Computerized adaptive testing; item selection driven by an ability estimate. |
| **IRT** | Item response theory; psychometric model linking item parameters (difficulty *b*, discrimination *a*, guessing *c*) to ability θ. |
| **NCJMM** | NCSBN Clinical Judgment Measurement Model (6 cognitive steps, §6.3). |
| **Item** | One scored question of any format. |
| **Case study** | Unfolding patient scenario with 6 linked items, one per NCJMM step. |
| **Exhibit** | Case-attached artifact (vitals, labs, MAR, notes, charts, images) the candidate must inspect. |
| **Polytomous scoring** | Partial credit across multiple response elements (options, blanks, cells). |
| **Exposure control** | Limiting how often an item is served to avoid overexposure/memorization. |
| **Blueprint** | The required content distribution of an exam (Client Need ranges + case studies + pretest). |
| **Readiness score** | App-generated 0–100 estimate of exam readiness; **not** an official prediction. |
| **Variant** | An authored alternate of an item (different demographics/vitals/distractors) protecting against pattern memorization. |
| **Pretest item** | Unscored item mixed into simulation for future calibration; performance invisible to the candidate. |
