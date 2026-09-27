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


## Product experience expansion — calculators + blog + visualization
This is a hard requirement, not optional polish.

### Universal discoverability
- Every existing feature and category must remain easy to see, understand and reach.
- Navigation is task-oriented: dashboard, calculator categories, universal search/command, recent, favorites, blog/content and utilities.
- Desktop, tablet and mobile receive purpose-built navigation patterns rather than a squeezed desktop layout.
- Important tools should be reachable with minimal interaction; secondary tools remain discoverable without visual clutter.

### Calculator redesign standard
- Redesign every existing calculator, not only the homepage.
- Standard flow: clear purpose -> ergonomic inputs -> immediate validated result -> visual breakdown -> scenario/compare -> explanation -> save/share/export -> related tools.
- Currency/percentage/date/tenure controls use consistent components and Indian formatting.
- Advanced options are progressively disclosed so first-time users are not overwhelmed.
- All legacy formula behavior is regression-tested before replacement.

### Charts and financial visualization
- Inventory every existing chart and visualization.
- Upgrade responsive layout, labels, legends, tooltips, number formatting, accessibility and mobile interaction.
- Chart data comes from the same tested domain result as textual totals so numbers cannot drift.
- Handle zero/negative/extreme values, long labels, resize, dark/light themes and reduced motion.
- Prefer the clearest chart for the financial question; decoration must never obscure data.

### Blog redesign standard
- Redesign blog home, category/discovery, article cards, article reading experience and related-content journeys.
- Preserve every existing article and its public SEO value.
- Add consistent reading width, typography hierarchy, table/figure styles, TOC where useful, reading progress, share actions, related calculators and related articles.
- Calculator-to-blog and blog-to-calculator navigation should make the two parts feel like one product.

### 2026-27 visual quality bar
- Premium finance-product aesthetic: calm, information-dense where useful, spacious where comprehension matters.
- Strong hierarchy, polished typography, consistent iconography, restrained motion, intentional surfaces and meaningful visual states.
- Dark and light modes are designed independently, not mechanically inverted.
- No template-like glassmorphism, excessive gradients, random decoration or visual effects that reduce trust/readability.
- Micro-interactions communicate state and affordance; they are not ornamental noise.

### UX audit gates
For every existing feature/category/page ask:
1. Can a new user discover it?
2. Is its purpose obvious before clicking?
3. Is it usable one-handed on mobile?
4. Are primary actions visually dominant?
5. Are results/data understandable without financial expertise?
6. Are error, loading, empty, offline and edge states designed?
7. Does it meet accessibility and keyboard requirements?
8. Does it preserve or improve current functionality?
9. Does it share the same FinCalc design language?
10. Is there a clear next useful action?

### Accuracy rule
“Realtime” UI never means invented live financial data. Deterministic calculators update instantly from user inputs. Any future live rates, tax rules, market data or external facts must come from an explicit authoritative data source with timestamp/freshness and fallback behavior.
