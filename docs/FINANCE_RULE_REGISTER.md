# FinCalc financial rule register

Checked 27 September 2026. This register distinguishes user-entered illustrations from changing official financial rules. It records scope, not independent professional certification. `assets/js/domain/tools.mjs` is the calculation source; `assets/js/app/registry.mjs` defines displayed fields and provenance. Regression tests cover independent anchors and directional properties.

| Tool | Formula or source | Allowed claim | Boundary requiring finance review |
| --- | --- | --- | --- |
| EMI | Fixed nominal annual rate / 12; standard amortization with zero-rate limit | Monthly payment, total interest and cash paid | Floating rate, prepayment, fees, lender rounding excluded |
| SIP | End-of-month annuity, user-entered constant nominal return | Hypothetical value and invested amount | Real returns, risk, fees, tax and negative returns excluded |
| FD | Compound interest with user-selected compounding frequency | Illustrative maturity before tax | Bank product, TDS, renewal and premature withdrawal excluded |
| RD | End-of-month installments and monthly compounding | Illustrative maturity before tax | Bank compounding and deposit schedules may differ |
| GST | Inclusive/exclusive percentage decomposition | Amount at user-entered percentage | Classification and interstate tax rules not determined. Verify at https://cbic-gst.gov.in/gst-goods-services-rates.html |
| Inflation | Compound annual assumed inflation | Future price and remaining buying power | Household-specific rates and historical evidence not modeled |
| Retirement | Inflation-adjusted spending sum for explicit horizon, no post-retirement investment return | Simplified future spending requirement | Longevity, changing spending, investment/tax/health costs excluded |
| Loan capacity | User-defined obligation cap and reversed fixed-payment annuity | Principal consistent with chosen ratio, rate and term | Never lender eligibility or approval; credit checks excluded |
| Rent vs buy | Projected rent cash paid versus down payment plus EMI less assumed gross sale value | Scenario cash-flow difference | Maintenance, taxes, transaction costs, rents/deposits and alternative investment excluded; no winner recommended |
| Income tax | AY 2026–27 salaried individual guide: https://www.incometax.gov.in/iec/foportal/help/individual/return-applicable-1 ; standard deduction reference https://www.incometaxindia.gov.in/w/deductions-allowable-to-tax-payer | Limited AY 2026–27 resident salary-only, new regime with taxable income ≤ ₹12 lakh; Section 87A rebate cap ₹60,000, 4% cess | Higher income, other/special-rate income, old regime, surcharge and credits stop without output. Independent qualified tax review before using for filing |
| Credit health | CIBIL's official consumer guidance https://www.cibil.com/freecibilscore and lender decision FAQ https://www.cibil.com/faq/credit-score-and-loan-basics | Links to genuine bureau report; educational next steps | No bureau lookup, invented score, or lender decision |

Rules are versioned inside result snapshots; compare blocks mismatched versions. Assumed rates come from the visitor's inputs and have no live-source badge. A material source or formula update requires tests, review notes and a rules version bump. If the tax year becomes stale, the supported case must be disabled and pointed to the official checker until reverified.
