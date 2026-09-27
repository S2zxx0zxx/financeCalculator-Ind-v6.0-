# FinCalc web architecture — decision record, 27 September 2026

## Chosen release foundation

A multi-page static app with native JavaScript modules, shared CSS and a pure calculation domain. GitHub Pages already publishes the repository without a build pipeline; adding an Astro build without a proven route/content migration would complicate the first release. The planned Astro proof is now a follow-up architecture experiment, contingent on content authoring and HTML migration benefits. Keep routes and calculation modules independent of the renderer so a later Astro move does not rewrite finance logic.

The root is a genuine homepage. /app/ lists eleven topics by five categories. /calculators/{slug}/ are individual crawlable HTML pages with one shared UI module. /compare/ and /saved/ use the same design system. The 29 existing /blog/*.html routes remain served. Historical homepage hash routes redirect to equivalent new tools. No server or login is required for current calculators.

## Data boundaries

- Domain: assets/js/domain/tools.mjs and emi.mjs. Pure deterministic functions with explicit validation and assumptions. Interest rates are user-entered illustrations, not fetched lender data.
- Tool registry: assets/js/app/registry.mjs. One category, fields, labels, source, and restrictions per tool. Credit health is educational; it does not fabricate a bureau score.
- Presentation: assets/js/app/app.mjs, assets/css/app.css and static HTML route shells. Data values render through text or escaped markup. All tool pages use the same UI.
- Local data: assets/js/app/storage.mjs. Versioned IndexedDB store, deliberate export/import and deletion. No silent import of old localStorage contact/newsletter keys.
- Content: four formula guides mirror the deterministic calculator math; 29 historical URLs remain as noindex review notices with unverified bodies withheld from public delivery. See ARTICLE_REVIEW_LEDGER.md.
- PWA: sw.js precaches the shell and tools. Articles need a network connection and are not cached as current. An offline fallback explains the limit.

## Rule boundaries and reviewed scope

Income-tax page handles only resident ordinary salary, AY 2026–27 new regime and taxable income at or below ₹12 lakh. Slabs, ₹60k Section 87A rebate and 4% cess are from the Income Tax Department's AY 2026–27 salaried guide. ₹75k standard deduction is supported by official Income Tax deduction references. Unsupported income, old regime, higher taxable income, surcharge and special-rate cases stop and link to the official calculator. Source review: 2026-09-27. A legal/tax domain specialist must review this implementation before treating it as tax-filing guidance.

GST accepts a rate selected by the user: verify product/service classification at CBIC. Borrowing capacity ratio is a user assumption, never a lender approval. FD/RD, SIP, inflation, retirement and housing are illustrative models; caveats are part of results. Pure functions are tested using independent arithmetic anchors and edge cases. Formula versions live in saved results; cross-version compare is refused.

## Trust and commercial status

The former podcast feature and route are removed; newsletter CTAs are paused; contact opens an email draft and never confirms delivery. Third-party analytics/ad loaders are paused throughout public pages until consent/disclosure can be reviewed. This affects existing monetization and measurement; product owner must decide whether and how to restore them with verified behavior. No FinCo-Pilot API or account integration is assumed or included.

## Open production gates

1. Manual browser and assistive-technology QA on actual Android Chrome, iOS Safari and desktop browsers. The local environment lacks a Playwright browser binary, so automated browser E2E has not run here.
2. Independent finance/domain review of all formulas, especially tax, housing and retirement assumptions; revision after review.
3. Article-by-article editorial research; remove any historical statement that cannot be substantiated. A banner alone does not verify the article.
4. Privacy/marketing review before restoring analytics, ads or newsletter; working provider and consent contracts needed. Audio is permanently outside product scope.
5. Device performance measurements, PWA upgrade flow, accessibility checks, content localization and production staging review. Avoid presenting these as completed.

See REVIVAL_BASELINE.md for source facts and the masterplan for full delivery gates.
