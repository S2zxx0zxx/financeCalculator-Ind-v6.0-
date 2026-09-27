import { useEffect, useMemo, useState } from "react";
import { calculateGst, type GstMode } from "@fincalc/finance-core";
import { AccessibleRatioChart } from "../shared/charts/AccessibleRatioChart";
import { CalculatorActions } from "../features/export-share/CalculatorActions";
import { savedNumber, savedString, useSavedScenario } from "../features/history/useSavedScenario";

const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 });

export function GstCalculatorPage() {
  const savedScenario = useSavedScenario();
  const [amount, setAmount] = useState(() => savedNumber(savedScenario?.inputs, "amount", 1000));
  const [ratePercent, setRatePercent] = useState(() => savedNumber(savedScenario?.inputs, "ratePercent", 18));
  const [mode, setMode] = useState<GstMode>(() => savedString(savedScenario?.inputs, "mode", "add") === "remove" ? "remove" : "add");
  useEffect(() => {
    if (!savedScenario) return;
    setAmount(savedNumber(savedScenario.inputs, "amount", 1000));
    setRatePercent(savedNumber(savedScenario.inputs, "ratePercent", 18));
    setMode(savedString(savedScenario.inputs, "mode", "add") === "remove" ? "remove" : "add");
  }, [savedScenario?.recordId]);
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
          <CalculatorActions
            calculatorId="gst"
            calculatorTitle="GST Calculator"
            inputs={{ amount, ratePercent, mode }}
            summary={{ total: money.format(result.values.total), base: money.format(result.values.base), gst: money.format(result.values.gst), cgst: money.format(result.values.cgst), sgst: money.format(result.values.sgst) }}
          />
          <div className="assumption-note">CGST/SGST is shown as an equal split, matching the existing FinCalc behavior. Interstate IGST cases need separate treatment.</div>
        </div>
      </section>
    </div>
  );
}
