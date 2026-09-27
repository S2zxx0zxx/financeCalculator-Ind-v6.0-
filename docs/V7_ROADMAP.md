# FinCalc v7 — Execution Roadmap

## Phase 0 — Baseline
Current main baseline: 0447f1cb465f02dc3b23cbbdafa8ad00fcfb90e3.
Upgrade branch: upgrade/fincalc-fullstack-v7.
Legacy production remains untouched while v7 is built.

## Phase 1 — Forensic inventory
Catalog every calculator, input, output, formula, edge case, localStorage key, route/hash, article, structured-data block, PWA asset and outbound/share action.

## Phase 2 — Engineering foundation
Introduce strict TypeScript, Vite, React app shell, routing, design tokens, lint/type/test gates and feature/domain boundaries.

## Phase 3 — FinCalc design system
Build typography, spacing, surfaces, navigation, fields, sliders, currency inputs, result cards, charts, dialogs, sheets, toast/feedback, skeletons and responsive primitives.

## Phase 4 — Calculator engine
Extract financial math into pure typed functions. Add fixture-based parity tests. Never couple formulas to components.

## Phase 5 — App experience
Tool discovery/search, categories, recent tools, favorites, compare scenarios, calculation history, share/export, contextual explanations and related calculators.

## Phase 6 — Content platform
Preserve all current articles and metadata while moving shared presentation into maintainable templates/content data.

## Phase 7 — PWA and resilience
Offline calculator shell, cache versioning, update UX, installability, safe fallbacks and low-network behavior.

## Phase 8 — Full-stack capabilities
Server/API only for real server-owned concerns: authenticated sync, cloud history/preferences, feedback/telemetry endpoints, admin/content workflows if enabled. Anonymous calculators remain usable without signup.

## Phase 9 — Quality gates
Unit/formula tests, component tests, E2E, accessibility, responsive QA, security headers, bundle analysis and Core Web Vitals budget.

## Definition of done
No legacy capability lost; formula parity proven; key URLs preserved; mobile/desktop polished; offline path works; strict type/lint/tests pass; production build passes; main is merged only after review.
