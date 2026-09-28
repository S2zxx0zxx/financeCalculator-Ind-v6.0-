import { GstCalculatorPage } from "../../pages/GstCalculatorPage";
import { TrackedCalculator } from "./TrackedCalculator";

export const meta = () => [
  { title: "GST Calculator | FinCalc India" },
  { name: "description", content: "Add or reverse GST with transparent base, CGST and SGST breakdowns." }
];

export default function Route() {
  return <TrackedCalculator id="gst"><GstCalculatorPage /></TrackedCalculator>;
}
