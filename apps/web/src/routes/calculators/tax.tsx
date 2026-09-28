import { TaxCalculatorPage } from "../../pages/TaxCalculatorPage";
import { TrackedCalculator } from "./TrackedCalculator";

export const meta = () => [
  { title: "Income Tax Calculator — Tax Year 2026–27 | FinCalc India" },
  { name: "description", content: "Compare a salary-focused new and old regime estimate under the verified 2026–27 rules." }
];

export default function Route() {
  return <TrackedCalculator id="tax"><TaxCalculatorPage /></TrackedCalculator>;
}
