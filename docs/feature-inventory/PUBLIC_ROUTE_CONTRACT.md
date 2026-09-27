# FinCalc V7 — Public Route & PWA Preservation Contract

Baseline: `0447f1cb465f02dc3b23cbbdafa8ad00fcfb90e3`.

## Root/static routes that must not silently disappear
- /
- /index.html
- /about.html
- /contact.html
- /privacy-policy.html
- /disclaimer.html
- /podcast/
- /blog/
- /blog/feed.xml
- /manifest.json
- /sw.js
- /robots.txt
- /sitemap.xml
- /llms.txt
- /llms-full.txt
- /ads.txt
- /og-image.svg
- /icons/icon-192.png
- /icons/icon-512.png
- /icons/fincalc-logo-splash.png

## Confirmed 29 article routes
1. /blog/12-lakh-tax-free-income-2026-complete-guide.html
2. /blog/akshaya-tritiya-2026-gold-price-guide.html
3. /blog/cibil-score-guide-2026.html
4. /blog/crypto-india-2026-bitcoin-tax-legal-guide.html
5. /blog/fd-rates-april-2026-best-banks-guide.html
6. /blog/gold-vs-mutual-fund-india.html
7. /blog/gst-calculation-guide-india.html
8. /blog/home-loan-emi-50-lakh-2026.html
9. /blog/hra-exemption-2026-new-cities-bangalore-pune.html
10. /blog/income-tax-2026-27-guide.html
11. /blog/india-gdp-third-economy-2030-investment-guide.html
12. /blog/india-investment-strategy-tariff-war-2026.html
13. /blog/india-us-trade-deal-2026-impact-common-man.html
14. /blog/inflation-india-2026-fight-budget-save-guide.html
15. /blog/ipl-2026-economy-stock-market-financial-impact.html
16. /blog/iran-war-india-impact-2026.html
17. /blog/itr-filing-2026-deadline-new-rules-guide.html
18. /blog/new-income-tax-act-2025-april-2026-guide.html
19. /blog/nri-india-investment-guide-2026-nre-fd-sgb-sip.html
20. /blog/ppf-epf-nps-comparison-2026-tax-saving-guide.html
21. /blog/rbi-repo-rate-5-25-emi-impact-2026.html
22. /blog/rbi-upi-10000-delay-rule-2026-guide.html
23. /blog/real-estate-india-2026-buy-rent-tier2-guide.html
24. /blog/rupee-93-dollar-impact-india-2026-guide.html
25. /blog/sgb-302-return-redeem-ya-hold-2026.html
26. /blog/sip-vs-fd-2026-v2.html
27. /blog/state-elections-2026-results-economic-impact-india.html
28. /blog/term-insurance-health-insurance-india-2026-guide.html
29. /blog/trump-tariff-india-impact-2026-complete-guide.html

## Legacy calculator anchors
The restored index exposes 11 calculator section IDs:
- #sec-emi
- #sec-sip
- #sec-tax
- #sec-gst
- #sec-fd
- #sec-rd
- #sec-retire
- #sec-inflation
- #sec-eligibility
- #sec-rentvsbuy
- #sec-cibil

The V7 router may introduce dedicated calculator routes, but existing anchor/deep-link behavior must receive a compatibility adapter or redirect before legacy entry is retired.

## Current PWA contract
- Manifest scope/start URL: `/`.
- Display mode: standalone.
- Orientation: portrait-primary.
- Core install precache: `/`, `/index.html`, manifest and 192/512 icons.
- Optional precache: splash logo + OG image.
- Navigation strategy: network-first with cached request then `/index.html` fallback.
- Static same-origin assets: cache-first.
- Current cache name: `fincalc-v6`.
- Service worker deletes older cache names on activation.

## Deployment contract
Current production deployment is GitHub Pages from `main` and uploads the entire repository. V7 files under `apps/` are therefore source-only until the deployment workflow is deliberately changed to build and publish a controlled artifact.

## Migration hazards already identified
- Current sitemap dates are April 2026 and must not be rewritten with fake "fresh" dates.
- `_headers` contains duplicate `/llms.txt` rules and legacy `X-XSS-Protection`; security-header modernization must be deployment-aware because GitHub Pages does not apply Cloudflare Pages-style header files by itself.
- PWA navigation fallback to legacy `/index.html` must be changed only when the V7 app becomes production entry.
- Blog/article URLs carry SEO value and remain immutable by default.
