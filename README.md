# FinCalc · by FinCo-Pilot

A static, responsive finance decision web app for India. Each calculator identifies its assumptions and limitations. It is served from GitHub Pages; an account, API server and native Android package are **not** part of this release.

## Run locally

From the repository root, serve files over HTTP (ES modules do not load correctly from a file URL):

    python -m http.server 8000

Then visit http://localhost:8000/. Use Node 22 or newer for the checks:

    node --test tests/*.test.mjs
    node scripts/check-static.mjs

The repository's protected GitHub Actions check runs these tests on pull requests. Publishing to GitHub Pages remains a separate main-branch workflow; merging is a release decision.

## Routes

- / — focused home, including redirects from original #emi, #sip, #tax and other calculator hashes.
- /app/ — category directory and search for eleven topics.
- /calculators/{slug}/ — EMI, SIP, income-tax, GST, FD, RD, retirement, inflation, loan-eligibility, rent-vs-buy and credit-health.
- /saved/ and /compare/ — private browser storage and compatible scenario comparison.
- /blog/ and /blog/*.html — existing index and 29 preserved article paths, with an unreviewed-archive banner on articles.
- /podcast/ — an honest unavailable-audio notice until genuine recordings exist.

## Product boundaries

Calculator rates are entered by the visitor; no bank offer, live market rate, loan approval or actual CIBIL score is fetched. Income tax is deliberately restricted to a resident salaried AY 2026–27 new-regime case at or below ₹12 lakh taxable income. For complex cases the page links to the official checker and does not present a fabricated answer. Credit health links directly to the bureau.

Contact composes an email draft in the visitor's mail app; the visitor has to send it. Newsletter registration and podcast playback are paused pending working services. Legacy external ad and analytics loaders are paused pending consent review. Scenarios are held in IndexedDB on that browser only, with voluntary export/import. Browser storage can be cleared.

## Layout

- assets/js/domain — deterministic and testable finance calculations.
- assets/js/app/registry.mjs — tool/category definitions and fields.
- assets/js/app/app.mjs — directory, form, results, compare and saved UI.
- assets/js/app/storage.mjs — local scenario schema and IndexedDB repository.
- assets/css/app.css — accessible responsive design tokens and components.
- scripts/generate-pages.mjs — regenerates static route shells from registry.
- scripts/check-static.mjs and tests — route/trust and arithmetic checks.
- docs/ARCHITECTURE.md — decisions, finance scope and remaining production gates.

## Release state

This is an implementation branch under draft review. Unit and static checks run, but mobile browser and assistive-technology testing, finance-domain sign-off, editorial verification of older articles and a staged production rollout remain required before declaring the whole application production ready. The full web-first PRD/TRD is maintained separately. Android is a later, evidence-driven decision.
