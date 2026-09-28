# FinCalc V7 — Tax & Credit Verification (2026)

## Tax Year 2026-27
Verified against Government of India / Income Tax Department material before replacing the legacy calculator:

- Income-tax Act, 2025 applies to Tax Year 2026-27 onwards.
- Tax Year 2026-27 corresponds to Financial Year 2026-27; the new Act discontinues the AY terminology for these current-year computations.
- Section 202 new/default-regime slab rates for Tax Year 2026-27: nil to ₹4L; 5% ₹4L–₹8L; 10% ₹8L–₹12L; 15% ₹12L–₹16L; 20% ₹16L–₹20L; 25% ₹20L–₹24L; 30% above ₹24L.
- Income-tax Act, 2025 section 19 provides ₹75,000 salary standard deduction under section 202(1), and ₹50,000 otherwise.
- Budget 2026 CBDT FAQ confirms up to ₹60,000 rebate at ₹12L total income in the new regime, ₹75,000 standard deduction for salary, and marginal relief immediately above ₹12L.
- Health & Education cess remains 4%.
- V7's current simple estimator excludes special-rate income and surcharge/marginal-surcharge cases; the UI discloses this instead of returning false precision.

Official references:
- https://www.incometax.gov.in/iec/foportal/help/all-topics/e-filing-services/general-questions-0
- https://www.incometax.gov.in/iec/foportal/help/all-topics/e-filing-services/objective-and-scope-new-act
- https://www.incometaxindia.gov.in/w/section-19-199
- https://www.incometaxindia.gov.in/Documents/Budget2026/FAQs-Budget-2026.pdf
- https://www.indiabudget.gov.in/doc/memo.pdf

## CIBIL
Current TransUnion CIBIL guidance confirms:
- score range is 300–900;
- the closer the score is to 900, the better the general chance of approval;
- a score above 700 is generally considered good;
- the lender, not CIBIL, makes the loan/credit-card sanction decision;
- current official guidance emphasizes payment history, utilisation, credit age/mix and enquiries.

V7 therefore does not carry over hard-coded historical lender-rate promises from the legacy CIBIL UI.

Official references:
- https://www.cibil.com/faq-brochure
- https://www.cibil.com/faq/credit-score-and-loan-basics
- https://www.cibil.com/faq/understand-your-credit-score-and-report
- https://www.cibil.com/frequent-queries
