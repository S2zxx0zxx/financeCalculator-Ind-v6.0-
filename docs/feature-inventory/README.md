# FinCalc Legacy Reality Inventory

Source of truth: restored baseline commit 0447f1cb465f02dc3b23cbbdafa8ad00fcfb90e3.

## Confirmed implementation discovered so far
- Calculator flows wired in index.html include EMI, SIP, Income Tax, GST, FD, RD, Retirement, Inflation, Loan Eligibility, Rent vs Buy and CIBIL.
- Results use aria-live in multiple calculator sections.
- EMI includes a Canvas breakdown visualization.
- Share actions exist, including calculator sharing/WhatsApp-related flows.
- PDF download action exists in calculator results.
- Local calculation-history behavior exists and is documented as last-five/localStorage based.
- Dark/light theme persistence exists, but storage-key conventions are duplicated/inconsistent across pages.
- Hindi/English toggle behavior is documented/implemented in the legacy experience.
- PWA manifest and service worker exist.
- Blog ecosystem contains 29 standalone article files plus blog index/feed.
- Podcast page exists.
- Static About, Contact, Privacy and Disclaimer pages exist.
- Contact form currently stores the submitted message in browser localStorage before showing success; this is not real backend delivery.
- Blog pages contain their own visualizations in some articles.
- SEO assets include sitemap, robots, structured-data/meta work, social metadata and feed infrastructure.

## Documentation mismatch
README describes 14 calculators and a large AI/Financial Twin/real-time roadmap. Documented/planned features are not automatically classified as implemented. Every item must be proven from executable source before preservation parity is marked complete.

## Inventory work still required
- Extract exact list of all calculator cards/sections and aliases.
- Extract every formula, rounding rule, default, min/max and edge behavior.
- Map every public URL/hash and internal link.
- Map all localStorage keys and migration policy.
- Inventory every Canvas/chart/table visualization.
- Inventory analytics events and identifiers.
- Inventory every blog article metadata/schema/internal link.
- Verify service-worker cache scope/version/update behavior.
- Verify PDF/share behavior per calculator.
- Classify README claims as implemented/partial/planned/stale.
