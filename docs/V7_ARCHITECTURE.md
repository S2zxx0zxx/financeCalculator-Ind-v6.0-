# FinCalc v7 — Product Rebuild Architecture

## Non-negotiable preservation contract
- No existing calculator, formula, blog article, SEO route, PWA capability, legal page, share flow, theme behavior, sitemap/robots asset, or user-facing capability is removed during migration.
- Legacy main remains deployable until parity gates pass.
- Every migrated calculator receives deterministic formula fixtures before UI replacement.
- Existing public URLs get preserved or redirected explicitly.

## Target stack
- React + TypeScript + Vite
- React Router with route-level lazy loading
- Tailwind CSS + FinCalc design tokens + accessible headless primitives
- React Hook Form + Zod for typed calculator inputs
- Zustand only for small persistent client preferences/history; domain math remains pure functions
- Recharts for accessible financial visualizations
- Vitest + Testing Library for unit/component tests
- Playwright for critical user journeys
- vite-plugin-pwa / Workbox strategy for installability and offline calculator access
- ESLint + Prettier + strict TypeScript
- Optional API boundary under server/ only for capabilities that genuinely need a server

## Dependency rule
app -> pages -> features -> domain -> shared
UI never owns financial formulas. Domain functions never depend on React.

## Proposed structure
src/
  app/
    providers/
    router/
    shell/
  pages/
  features/
    calculators/
      emi/
      sip/
      tax/
      gst/
      fd/
      rd/
      ppf/
      nps/
      ssy/
    calculator-discovery/
    recent-tools/
    favorites/
    comparison/
    export-share/
    blog/
  domain/
    finance/
      formulas/
      validation/
      formatting/
      types/
  shared/
    ui/
    charts/
    hooks/
    lib/
    constants/
    styles/
  assets/
server/
  api/
  services/
  middleware/
tests/
  fixtures/
  unit/
  integration/
  e2e/
docs/
legacy/

## Product UX
Desktop: app sidebar + command/search + content workspace.
Mobile: compact top bar + bottom navigation + calculator-first flows.
Calculator page: purpose/context -> inputs -> live result -> breakdown/chart -> scenarios -> explanation -> share/export -> related tools.
States: empty, input, calculating, success, invalid, edge-case, offline.
Accessibility: keyboard-first, semantic landmarks, visible focus, screen-reader result announcements, reduced-motion support.

## Migration gates
1. Inventory legacy behavior.
2. Freeze formula fixtures and URL map.
3. Scaffold modern app without replacing production entry.
4. Build design system and shell.
5. Migrate calculators one-by-one with parity tests.
6. Migrate content/blog/SEO without URL loss.
7. Upgrade PWA/offline.
8. Add optional account/cloud backend only after anonymous/local-first parity.
9. Performance/accessibility/security QA.
10. Production build + E2E + visual QA.
11. Merge only after parity checklist passes.
