import { useMemo, useState } from "react";
import { calculateGst, type GstMode } from "@fincalc/finance-core";
import { AccessibleRatioChart } from "../shared/charts/AccessibleRatioChart";

const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 });

export function GstCalculatorPage() {
  const [amount, setAmount] = useState(1000);
  const [ratePercent, setRatePercent] = useState(18);
  const [mode, setMode] = useState<GstMode>("add");
  const result = useMemo(() => calculateGst({ amount, ratePercent, mode }), [amount, ratePercent, mode]);

  return (
    <div className="calculator-layout">
      <section className="calc-intro">
        <span className="eyebrow">TAX · GST</span>
        <h1>See the base price and tax clearly.</h1>
        <p>Add GST to a base amount or reverse-calculate GST from an inclusive total. The result is deterministic and updates instantly.</p>
      </section>
      <section className="calculator-card">
        <div className="input-stack">
          <label>Amount <strong>{money.format(amount)}</strong>
            <input type="number" inputMode="decimal" min="1" max="999999999999" value={amount} onChange={e => setAmount(Number(e.target.value))} />
          </label>
          <label>GST rate <strong>{ratePercent}%</strong>
            <select value={ratePercent} onChange={e => setRatePercent(Number(e.target.value))}>
              {[0, 5, 12, 18, 28].map(rate => <option key={rate} value={rate}>{rate}%</option>)}
            </select>
          </label>
          <fieldset className="segmented-field">
            <legend>Amount type</legend>
            <button type="button" aria-pressed={mode === "add"} onClick={() => setMode("add")}>Add GST</button>
            <button type="button" aria-pressed={mode === "remove"} onClick={() => setMode("remove")}>GST included</button>
          </fieldset>
        </div>
        <div className="result-panel" aria-live="polite" aria-atomic="true">
          <span className="eyebrow">{mode === "add" ? "TOTAL WITH GST" : "BASE AMOUNT"}</span>
          <div className="result-big">{money.format(mode === "add" ? result.values.total : result.values.base)}</div>
          <div className="result-grid">
            <div><span>Base amount</span><strong>{money.format(result.values.base)}</strong></div>
            <div><span>Total GST</span><strong>{money.format(result.values.gst)}</strong></div>
            <div><span>CGST</span><strong>{money.format(result.values.cgst)}</strong></div>
            <div><span>SGST</span><strong>{money.format(result.values.sgst)}</strong></div>
          </div>
          <AccessibleRatioChart
            title="Price composition"
            segments={[
              { label: "Base", value: result.values.base, formatted: money.format(result.values.base) },
              { label: "GST", value: result.values.gst, formatted: money.format(result.values.gst) }
            ]}
          />
          <div className="assumption-note">CGST/SGST is shown as an equal split, matching the existing FinCalc behavior. Interstate IGST cases need separate treatment.</div>
        </div>
      </section>
    </div>
  );
}
