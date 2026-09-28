# FinCalc Legacy Reality Inventory

Source of truth: restored baseline commit `0447f1cb465f02dc3b23cbbdafa8ad00fcfb90e3`.

## Confirmed live calculator implementation
The restored production `index.html` contains exactly these 11 calculator sections/functions:

| Route/section id | Legacy function | V7 domain status |
|---|---|---|
| sec-emi | calcEMI | migrated + hard parity fixture |
| sec-sip | calcSIP | migrated + hard parity fixture |
| sec-tax | calcTax | migrated as versioned legacy rule + fixture; current-law verification still required |
| sec-gst | calcGST | migrated + hard parity fixture |
| sec-fd | calcFD | migrated + hard parity fixture |
| sec-rd | calcRD | migrated + hard parity fixture |
| sec-retire | calcRetire | migrated + hard parity fixture |
| sec-inflation | calcInflation | migrated + hard parity fixture |
| sec-eligibility | calcEligibility | migrated + hard parity fixture |
| sec-rentvsbuy | calcRentVsBuy | migrated + hard parity fixture |
| sec-cibil | calcCibil | score-band compatibility migrated; time-sensitive lending-rate copy intentionally excluded pending current-source verification |

README/llms files claim 14 calculators including PPF, NPS and SSY, but no `calcPPF`, `calcNPS`, `calcSSY` function or corresponding `sec-*` section exists in the restored production index. They are therefore classified as documented/planned/stale until executable implementation is found elsewhere.

## Confirmed supporting behavior
- Results use `aria-live` in multiple calculator sections.
- Canvas-based result visualizations exist, including EMI and other calculator donuts/gauges.
- Share actions exist, including calculator sharing/WhatsApp-related flows.
- PDF action currently generates a printable HTML report and invokes browser print.
- Calculation history uses `fincalc-history`, stores latest first and is capped at 20 items in current code (README text that says "last 5" is stale).
- Dark/light theme persistence exists.
- Hindi/English state exists.
- PWA manifest and service worker exist.
- Blog ecosystem contains 29 standalone article files plus blog index/feed.
- Podcast page exists.
- Static About, Contact, Privacy and Disclaimer pages exist.
- Contact form currently stores messages in browser localStorage and shows success; no real delivery occurs.
- Blog newsletter currently uses a local subscription flag; it is not a real email subscription backend.

## Confirmed main-page storage contract
- `fincalc-theme`
- `fincalc-lang`
- `fincalc-history`
- `fincalc-cookies`
- `fincalc-subs`
- `fincalc-exit-dismissed`
- `fincalc-sticky-closed`

Additional page-specific keys include podcast progress/ratings and blog-index keys such as the legacy `fc-theme` variant. These require a compatibility migration rather than abrupt deletion.

## Important architecture findings
- Financial domain math and DOM mutation are mixed in one giant legacy page.
- Chart rendering is coupled to calculation functions and is re-triggered by theme changes.
- Theme/navigation scripts are copied across many static/blog pages.
- Blog index uses `fc-theme` while most other pages use `fincalc-theme`.
- Documentation and executable reality have materially drifted.
- Some finance/tax/rate copy is time-sensitive and must be independently verified before being labelled current.

## Still to freeze before retiring legacy
- Full public URL/internal-link map.
- All blog article metadata/schema/internal-link graph.
- Service-worker cache list/version/update behavior.
- Analytics event inventory and privacy review.
- Every chart/table visualization and accessible fallback.
- Exact language dictionary coverage.
- Share copy/deep-link compatibility.
