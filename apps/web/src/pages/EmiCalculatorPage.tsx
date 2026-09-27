import { useMemo, useState } from "react";
import { calculateEmi } from "@fincalc/finance-core";
import { AccessibleRatioChart } from "../shared/charts/AccessibleRatioChart";

const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export function EmiCalculatorPage() {
  const [principal, setPrincipal] = useState(1_000_000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);
  const result = useMemo(() => calculateEmi({ principal, annualRate: rate, tenureYears: years }), [principal, rate, years]);

  return (
    <div className="calculator-layout">
      <section className="calc-intro">
        <span className="eyebrow">LOANS · EMI</span>
        <h1>Know the monthly commitment before you borrow.</h1>
        <p>Same deterministic legacy EMI formula, now isolated from the UI and regression-tested.</p>
      </section>

      <section className="calculator-card">
        <div className="input-stack">
          <label>Loan amount <strong>{money.format(principal)}</strong>
            <input type="range" min="10000" max="50000000" step="10000" value={principal} onChange={e => setPrincipal(Number(e.target.value))} />
            <input inputMode="decimal" type="number" min="10000" max="500000000" value={principal} onChange={e => setPrincipal(Number(e.target.value))} />
          </label>
          <label>Interest rate <strong>{rate.toFixed(2)}%</strong>
            <input type="range" min="0.1" max="30" step="0.05" value={rate} onChange={e => setRate(Number(e.target.value))} />
          </label>
          <label>Tenure <strong>{years} years</strong>
            <input type="range" min="1" max="40" step="1" value={years} onChange={e => setYears(Number(e.target.value))} />
          </label>
        </div>
        <div className="result-panel" aria-live="polite" aria-atomic="true">
          <span className="eyebrow">MONTHLY EMI</span>
          <div className="result-big">{money.format(result.values.monthlyEmi)}</div>
          <div className="result-grid">
            <div><span>Principal</span><strong>{money.format(result.values.principal)}</strong></div>
            <div><span>Total interest</span><strong>{money.format(result.values.totalInterest)}</strong></div>
            <div><span>Total payment</span><strong>{money.format(result.values.totalPayment)}</strong></div>
            <div><span>Term</span><strong>{result.values.months} months</strong></div>
          </div>
          <AccessibleRatioChart
            title="Repayment breakdown"
            segments={[
              { label: "Principal", value: result.values.principal, formatted: money.format(result.values.principal) },
              { label: "Interest", value: result.values.totalInterest, formatted: money.format(result.values.totalInterest) }
            ]}
          />
          <details>
            <summary>Formula & assumptions</summary>
            <p>Monthly reducing-balance EMI. Legacy input bounds and calculation behavior are preserved in the finance-core module.</p>
          </details>
        </div>
      </section>
    </div>
  );
}
