# NCLEX-RN Preparation Platform — Product Requirements Specification (PRS)

**Version:** 1.0 (Build-Ready Draft) · **Date:** 2026-08-23 · **Status:** For engineering/design/content review

> **Product definition:** A mobile-first adaptive NCLEX-RN preparation platform that combines structured nursing knowledge, clinical-judgment training, personalized practice, spaced remediation, and realistic CAT-style examination simulations.

## What this document set is

This PRS converts the product vision into a build-ready specification: screen-by-screen UX requirements, a complete feature catalog, the content/data model, exam engine requirements, the adaptive (CAT-style) algorithm specification, admin/content-management requirements, and MVP vs. Phase 2 scope.

## Document map

| # | Document | Contents |
|---|----------|----------|
| 01 | [Product Overview](01-product-overview.md) | Vision, goals/non-goals, personas, product principles, NCLEX reference facts, glossary |
| 02 | [Information Architecture](02-information-architecture.md) | Navigation, screen inventory, core user flows, progression model, routes |
| 03 | [UX Screen Specification](03-ux-screens.md) | Screen-by-screen requirements: layout, elements, states, edge cases, a11y, analytics |
| 04 | [Feature Requirements](04-feature-requirements.md) | Full feature catalog with IDs, priorities, and acceptance criteria |
| 05 | [Data & Content Model](05-data-model.md) | Taxonomy, entity schemas, JSON item examples, exam configuration, seed data |
| 06 | [Exam Engine Requirements](06-exam-engine.md) | Engine architecture, question-type interaction/scoring contracts, session management |
| 07 | [Adaptive Engine (CAT) Specification](07-adaptive-engine.md) | Ability estimation, item selection, blueprint control, stopping rules, readiness engine |
| 08 | [Admin & Content Management](08-admin-cms.md) | Authoring, review workflow, versioning, calibration, admin analytics |
| 09 | [Cross-Cutting Requirements](09-cross-cutting.md) | Security, exam integrity, privacy, accessibility, offline/PWA, notifications, telemetry, subscriptions |
| 10 | [MVP Scope & Roadmap](10-mvp-roadmap.md) | Release cut, content targets, acceptance criteria, KPIs, risks, open questions |

## Conventions

### Requirement IDs

| Prefix | Domain |
|--------|--------|
| `FR-<AREA>-###` | Feature requirement (catalog in doc 04) |
| `UX-<###>` | Screen requirement (doc 03) |
| `DM-###` | Data-model requirement (doc 05) |
| `ENG-###` | Exam-engine requirement (doc 06) |
| `ADP-###` | Adaptive-engine requirement (doc 07) |
| `ADM-###` | Admin/CMS requirement (doc 08) |
| `XCU-###` | Cross-cutting requirement (doc 09) |

### Priority levels

- **P0 — MVP.** Launch-blocking. The first production release is incomplete without it.
- **P1 — Phase 2.** Within ~3 months post-launch.
- **P2 — Later.** Designed-for (architecture accommodates) but not scheduled.

### Source of truth

- The **NCSBN 2026 NCLEX-RN Test Plan** (effective 2026-04-01 through 2029-03-31) is the source of truth for the NCLEX-RN content blueprint, clinical judgment model (NCJMM), and item formats.
- Where this PRS cites exam characteristics (85–150 items, 5 hours, 3 case studies, 15 pretest items, optional breaks at ~2h and ~3.5h inside the 5-hour clock, no backtracking, on-screen calculator), those characteristics are encoded as **data** (see `ExamConfiguration` in doc 05), never hard-coded.

### Mandatory disclaimers (product-wide)

1. The platform is **not affiliated with, endorsed by, or sponsored by NCSBN**. "NCLEX" and "NCSBN" are used descriptively; branding must make this clear on first-run, simulation pre-flight, and all result screens.
2. Simulation outcomes and readiness scores are **app-generated estimates, not predictions** of official NCLEX results. Exact copy is specified in doc 03 (UX-S6, UX-G2).
3. No answer keys, rationales, or psychometric parameters are ever sent to the client before an answer is submitted (see doc 09, XCU-S).
