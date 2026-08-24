# 02 · Information Architecture

## 1. Core navigation (mobile, bottom tab bar)

```
┌──────────────────────────────────────────┐
│              [screen content]            │
├──────────────────────────────────────────┤
│   Home    Practice   Study   Simulate    │
│                      (5th tab: Progress) │
└──────────────────────────────────────────┘
```

| Tab | Purpose | Answers |
|---|---|---|
| **Home** | Daily orchestration | "What should I do today?" |
| **Practice** | All practice modes & content browsing | "What do I want to drill?" |
| **Study** | Plan, remediation, review queues | "What do I need to fix & revisit?" |
| **Simulate** | Exam simulations | "How will I perform under real conditions?" |
| **Progress** | Readiness & analytics | "How ready am I, and where am I weak?" |

Tab order fixed; active tab indicated by label + icon (never color alone). Tab bar hides during active quiz/case/simulation runners (full immersion) — return via in-screen controls only.

## 2. Screen inventory & routes

| ID | Screen | Route (PWA) | Priority |
|---|---|---|---|
| UX-O1 | Splash / app shell | `/` | P0 |
| UX-O2 | Sign up / sign in | `/auth` | P0 |
| UX-O3 | Exam profile setup (wizard) | `/onboarding/profile` | P0 |
| UX-D1 | Diagnostic intro | `/diagnostic` | P0 |
| UX-D2 | Diagnostic runner | `/diagnostic/run` | P0 |
| UX-D3 | Preparation profile (diagnostic results) | `/diagnostic/results` | P0 |
| UX-H1 | Home dashboard | `/home` | P0 |
| UX-P1 | Practice hub | `/practice` | P0 |
| UX-P2 | Quick practice picker | `/practice/quick` | P0 |
| UX-P3 | Custom practice builder | `/practice/custom` | P0 |
| UX-P4 | Content browser (Client Need / Body System / Topic / Type) | `/practice/browse/:axis` | P0 |
| UX-Q1 | Quiz runner (all practice modes) | `/session/:id` | P0 |
| UX-Q2 | Question renderers (8 formats) | (embedded in UX-Q1) | P0 |
| UX-Q3 | Calculator | (overlay in runners) | P0 |
| UX-Q4 | Submit/quit confirmations | (overlay) | P0 |
| UX-Q5 | Practice results summary | `/session/:id/results` | P0 |
| UX-Q6 | Explanation view | `/session/:id/review/:itemId` | P0 |
| UX-Q7 | Session review list | `/session/:id/review` | P0 |
| UX-C1 | Clinical judgment hub | `/practice/cj` | P0 |
| UX-C2 | Case study runner | `/case/:sessionId` | P0 |
| UX-C3 | Case results & CJ-step breakdown | `/case/:sessionId/results` | P0 |
| UX-S1 | Simulate hub | `/simulate` | P0 |
| UX-S2 | Simulation pre-flight (rules & consent) | `/simulate/:examId/preflight` | P0 |
| UX-S3 | Simulation runner | `/simulate/:sessionId/run` | P0 |
| UX-S4 | Break screen | (overlay in UX-S3) | P0 |
| UX-S5 | Interruption / resume gate | (overlay) | P0 |
| UX-S6 | Simulation results | `/simulate/:sessionId/results` | P0 |
| UX-T1 | Study hub | `/study` | P0 |
| UX-T2 | Study plan | `/study/plan` | P0 |
| UX-T3 | Weak areas | `/study/weak` | P0 |
| UX-T4 | Review incorrect | `/study/incorrect` | P0 |
| UX-T5 | Bookmarks / review later | `/study/bookmarks` | P0 |
| UX-T6 | Spaced review queue | `/study/spaced` | P1 |
| UX-G1 | Progress hub | `/progress` | P0 |
| UX-G2 | Readiness detail | `/progress/readiness` | P0 |
| UX-G3 | Performance breakdowns | `/progress/performance` | P0 |
| UX-G4 | History | `/progress/history` | P0 |
| UX-X1 | Settings & profile | `/settings` | P0 |
| UX-X2 | Notification settings | `/settings/notifications` | P1 |
| UX-X3 | Subscription / paywall | `/subscribe` | P1 |
| UX-AD1–AD9 | Admin app screens | separate web app (`/admin`) | P0 (core), P1 (analytics) — doc 08 |

## 3. Core flows

### 3.1 First run → diagnostic → home (activation flow)

```
Splash → Sign up → Exam profile wizard
  (exam type RN, exam date, self-rated level, daily minutes)
→ Diagnostic intro (expectations, ~30 items, untimed option)
→ Diagnostic runner (adaptive, no explanations)
→ Preparation profile:
     baseline ability band · weakest Client Needs · weakest body systems
     · CJ weaknesses · format weaknesses · recommended starting stage
→ Home (today's plan seeded from profile)
```

Skipping the diagnostic is allowed (bounced to Home with a persistent "Take diagnostic" card) but personalization is degraded until it completes.

### 3.2 Practice loop

```
Practice hub → choose mode → (optional filters) → confirm sheet
→ Quiz runner (item 1…N)
   ├─ flag ⚑ / bookmark ☆ (any time, no penalty)
   ├─ calculator (practice: optional toggle)
   ├─ change answers freely (practice only)
   └─ NEXT (unanswered → confirm dialog)
→ Results summary → Review list → Explanation view
   ├─ "Practice similar questions" CTA
   └─ "Review concept" CTA (concept card)
→ Learning records written; weak-area & spaced queues updated
```

### 3.3 Case-study flow (clinical judgment)

```
CJ hub → case list (filters: setting, body system, CJ step emphasis)
→ Case runner: patient banner + exhibit tabs; information UNFOLDS
   (exhibit set grows per item; earlier items cannot see later evidence)
→ Item i of 6, in NCJMM order
→ Case results: per-step performance, unfolding rationale walkthrough
```

### 3.4 Simulation flow

```
Simulate hub → select simulation type
→ Pre-flight: rules summary + acknowledgment checkboxes (P0)
→ Runner: no explanations · no backtracking · one item at a time
   · persistent timer · calculator · optional breaks at 2h/3.5h
   · NO "questions remaining" or stop-time hints
→ Adaptive stop (85–150) OR time expiry OR max items
→ Results: estimated outcome band (NOT pass/fail language see UX-S6),
   ability estimate, content coverage, CJ performance, time management,
   weaknesses, recommended next actions
```

### 3.5 Remediation loop

```
Any result / analytics → Weak area (e.g., Pharmacology 61%)
→ Focused 20-question set on that area
→ Missed concepts → spaced review queue (concept-level, not item-level)
→ Delayed re-test with a DIFFERENT item (variant / same-concept pool)
```

## 4. Progression model (stages)

Stages are computed (not manually chosen) from evidence; user can always override downward into any practice mode.

| Stage | Name | Entry evidence | App behavior |
|---|---|---|---|
| 1 | Discover | New user | Diagnostic required for full personalization |
| 2 | Build | Diagnostic complete | Topic-focused sets; study plan active |
| 3 | Strengthen | ≥300 items answered | Weak-area smart practice offered prominently |
| 4 | Integrate | ≥600 items, all 8 subcategories touched | Mixed Client Needs sets recommended |
| 5 | Apply | ≥2 case studies/week for 2 weeks OR CJ <70% flag | CJ practice emphasized |
| 6 | Perform | Readiness ≥60 | Timed sets & pacing analytics emphasized |
| 7 | Simulate | Readiness ≥65 or exam date ≤ 21 days | Full simulations recommended |
| 8 | Ready | Readiness ≥75 with stable trend | Maintain plan; confidence messaging |

Stage transitions fire a lightweight notification and update Home's "Today's plan."

## 5. Deep links

All routes above are shareable deep links (PWA). Additional parameterized links:

- `/session/new?mode=smart&count=20` — instant smart practice
- `/practice/browse/topic/heart-failure?count=20` — axis drill
- `/simulate/nclex-rn-2026` — straight to pre-flight
- Notifications (doc 09 §7) always deep-link into the exact task.
