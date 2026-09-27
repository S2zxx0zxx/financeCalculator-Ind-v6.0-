import { useMemo, useState } from "react";
import { calculateFd } from "@fincalc/finance-core";
import { AccessibleRatioChart } from "../shared/charts/AccessibleRatioChart";

const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export function FdCalculatorPage() {
  const [principal, setPrincipal] = useState(100000);
  const [annualRate, setAnnualRate] = useState(7.1);
  const [years, setYears] = useState(3);
  const [compoundsPerYear, setCompoundsPerYear] = useState(4);
  const result = useMemo(
    () => calculateFd({ principal, annualRate, years, compoundsPerYear }),
    [principal, annualRate, years, compoundsPerYear]
  );

  return (
    <div className="calculator-layout">
      <section className="calc-intro">
        <span className="eyebrow">DEPOSITS · FD</span>
        <h1>Project maturity without hiding the assumptions.</h1>
        <p>Change deposit, rate, tenure and compounding frequency. FinCalc keeps the calculation logic separate from the interface.</p>
      </section>
      <section className="calculator-card">
        <div className="input-stack">
          <label>Deposit amount <strong>{money.format(principal)}</strong>
            <input type="range" min="1000" max="10000000" step="1000" value={principal} onChange={e => setPrincipal(Number(e.target.value))} />
            <input type="number" inputMode="decimal" min="1000" max="100000000" value={principal} onChange={e => setPrincipal(Number(e.target.value))} />
          </label>
          <label>Annual interest rate <strong>{annualRate}%</strong>
            <input type="range" min="1" max="15" step="0.1" value={annualRate} onChange={e => setAnnualRate(Number(e.target.value))} />
          </label>
          <label>Tenure <strong>{years} years</strong>
            <input type="range" min="1" max="30" step="1" value={years} onChange={e => setYears(Number(e.target.value))} />
          </label>
          <label>Compounding
            <select value={compoundsPerYear} onChange={e => setCompoundsPerYear(Number(e.target.value))}>
              <option value={1}>Yearly</option>
              <option value={2}>Half-yearly</option>
              <option value={4}>Quarterly</option>
              <option value={12}>Monthly</option>
            </select>
          </label>
        </div>
        <div className="result-panel" aria-live="polite" aria-atomic="true">
          <span className="eyebrow">ESTIMATED MATURITY</span>
          <div className="result-big">{money.format(result.values.maturity)}</div>
          <div className="result-grid">
            <div><span>Principal</span><strong>{money.format(result.values.principal)}</strong></div>
            <div><span>Interest earned</span><strong>{money.format(result.values.interest)}</strong></div>
            <div><span>Compounding</span><strong>{compoundsPerYear}× / year</strong></div>
            <div><span>Tenure</span><strong>{years} years</strong></div>
          </div>
          <AccessibleRatioChart
            title="Maturity composition"
            segments={[
              { label: "Principal", value: result.values.principal, formatted: money.format(result.values.principal) },
              { label: "Interest", value: result.values.interest, formatted: money.format(result.values.interest) }
            ]}
          />
          <div className="assumption-note">Actual bank maturity can differ because deposit conventions, compounding dates, TDS and premature-withdrawal rules vary.</div>
        </div>
      </section>
    </div>
  );
}
