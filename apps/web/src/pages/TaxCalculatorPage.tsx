import { useMemo, useState } from "react";
import { calculateSalaryTax2026, type AgeGroup } from "@fincalc/finance-core";
import { CalculatorActions } from "../features/export-share/CalculatorActions";

const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export function TaxCalculatorPage() {
  const [grossSalary, setGrossSalary] = useState(1_275_000);
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("general");
  const [section80C, setSection80C] = useState(150_000);
  const [section80D, setSection80D] = useState(25_000);
  const result = useMemo(() => calculateSalaryTax2026({
    grossSalary,
    ageGroup,
    resident: true,
    section80C,
    section80D
  }), [grossSalary, ageGroup, section80C, section80D]);
  const { newRegime, oldRegime, better, savings } = result.values;
  const needsAdvanced = grossSalary > 5_000_000;

  return (
    <div className="calculator-layout">
      <section className="calc-intro">
        <span className="eyebrow">TAX YEAR 2026–27 · INCOME-TAX ACT, 2025</span>
        <h1>Compare salary tax without mixing old and new-year rules.</h1>
        <p>This V7 estimator is versioned for Tax Year 2026–27. It models ordinary salary income, standard deduction, rebate/marginal relief, cess and a practical old-regime comparison.</p>
      </section>
      <section className="calculator-card">
        <div className="input-stack">
          <label>Gross annual salary <strong>{money.format(grossSalary)}</strong>
            <input type="range" min="100000" max="5000000" step="10000" value={Math.min(grossSalary, 5000000)} onChange={e => setGrossSalary(Number(e.target.value))} />
            <input type="number" inputMode="decimal" min="0" value={grossSalary} onChange={e => setGrossSalary(Number(e.target.value))} />
          </label>
          <label>Age group
            <select value={ageGroup} onChange={e => setAgeGroup(e.target.value as AgeGroup)}>
              <option value="general">Below 60</option>
              <option value="senior">60–79</option>
              <option value="super">80+</option>
            </select>
          </label>
          <label>Old regime · Section 80C <strong>{money.format(section80C)}</strong>
            <input type="range" min="0" max="150000" step="5000" value={section80C} onChange={e => setSection80C(Number(e.target.value))} />
          </label>
          <label>Old regime · Section 80D <strong>{money.format(section80D)}</strong>
            <input type="range" min="0" max="100000" step="5000" value={section80D} onChange={e => setSection80D(Number(e.target.value))} />
          </label>
        </div>
        <div className="result-panel" aria-live="polite" aria-atomic="true">
          <span className="eyebrow">{better === "new" ? "NEW REGIME LOWER IN THIS MODEL" : "OLD REGIME LOWER IN THIS MODEL"}</span>
          <div className="result-big">{money.format(savings)} saved</div>
          <div className="regime-compare">
            <section>
              <span>Default / new regime</span>
              <strong>{money.format(newRegime.totalTax)}</strong>
              <small>Taxable {money.format(newRegime.taxableIncome)}</small>
            </section>
            <section>
              <span>Old regime comparison</span>
              <strong>{money.format(oldRegime.totalTax)}</strong>
              <small>Taxable {money.format(oldRegime.taxableIncome)}</small>
            </section>
          </div>
          <div className="result-grid">
            <div><span>New-regime rebate</span><strong>{money.format(newRegime.rebate)}</strong></div>
            <div><span>New-regime marginal relief</span><strong>{money.format(newRegime.marginalRelief)}</strong></div>
            <div><span>New-regime cess</span><strong>{money.format(newRegime.cess)}</strong></div>
            <div><span>Old-regime cess</span><strong>{money.format(oldRegime.cess)}</strong></div>
          </div>
          <CalculatorActions
            calculatorId="tax"
            calculatorTitle="Income Tax Calculator — Tax Year 2026–27"
            inputs={{ grossSalary, ageGroup, resident: true, section80C, section80D }}
            summary={{ newRegimeTax: money.format(newRegime.totalTax), oldRegimeTax: money.format(oldRegime.totalTax), lowerInModel: better, difference: money.format(savings) }}
          />
          {needsAdvanced ? <div className="warning-note">Income above ₹50 lakh can involve surcharge and marginal-surcharge relief. This simplified estimator intentionally does not pretend to compute those advanced cases yet.</div> : null}
          <div className="assumption-note">Special-rate income such as certain capital gains or lottery income is outside this salary-focused estimate. Tax Year 2026–27 uses the Income-tax Act, 2025.</div>
        </div>
      </section>
    </div>
  );
}
