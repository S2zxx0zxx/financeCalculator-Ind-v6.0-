import { useState } from "react";
import { createCalculationRecord, saveCalculation, type CalculationRecord } from "../history/storage";
import { copyCalculation, nativeShare, printCalculation, shareWhatsApp } from "./share";

interface Props {
  calculatorId: string;
  calculatorTitle: string;
  inputs: CalculationRecord["inputs"];
  summary: CalculationRecord["summary"];
}

export function CalculatorActions({ calculatorId, calculatorTitle, inputs, summary }: Props) {
  const [message, setMessage] = useState("");
  const record = () => createCalculationRecord(calculatorId, calculatorTitle, inputs, summary);

  async function share() {
    const current = record();
    const outcome = await nativeShare(current);
    if (outcome === "unavailable") {
      const copied = await copyCalculation(current);
      setMessage(copied ? "Result copied" : "Sharing is unavailable");
    } else if (outcome === "shared") {
      setMessage("Shared");
    }
  }

  return (
    <div className="calculator-actions" aria-label="Calculation actions">
      <button type="button" onClick={() => { saveCalculation(record()); setMessage("Saved to history"); }}>Save</button>
      <button type="button" onClick={share}>Share</button>
      <button type="button" onClick={() => shareWhatsApp(record())}>WhatsApp</button>
      <button type="button" onClick={() => printCalculation(record())}>Print / PDF</button>
      <span role="status" aria-live="polite">{message}</span>
    </div>
  );
}
