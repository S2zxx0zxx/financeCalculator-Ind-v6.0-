import { useState } from "react";
import { track } from "../../shared/analytics/analytics";
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

  function save() {
    saveCalculation(record());
    track({ name: "calculation_saved", calculatorId });
    setMessage("Saved to history");
  }

  async function share() {
    const current = record();
    const outcome = await nativeShare(current);
    if (outcome === "unavailable") {
      const copied = await copyCalculation(current);
      if (copied) track({ name: "calculation_shared", calculatorId, method: "clipboard" });
      setMessage(copied ? "Result copied" : "Sharing is unavailable");
    } else if (outcome === "shared") {
      track({ name: "calculation_shared", calculatorId, method: "native" });
      setMessage("Shared");
    }
  }

  function whatsapp() {
    shareWhatsApp(record());
    track({ name: "calculation_shared", calculatorId, method: "whatsapp" });
  }

  function print() {
    printCalculation(record());
    track({ name: "calculation_printed", calculatorId, method: "print" });
  }

  return (
    <div className="calculator-actions" aria-label="Calculation actions">
      <button type="button" onClick={save}>Save</button>
      <button type="button" onClick={share}>Share</button>
      <button type="button" onClick={whatsapp}>WhatsApp</button>
      <button type="button" onClick={print}>Print / PDF</button>
      <span role="status" aria-live="polite">{message}</span>
    </div>
  );
}
