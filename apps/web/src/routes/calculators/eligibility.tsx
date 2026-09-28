import { SimpleCalculatorPage } from "../../features/calculators/simple/SimpleCalculatorPage";
import { simpleDefinitions } from "../../features/calculators/simple/definitions";
import { TrackedCalculator } from "./TrackedCalculator";

export const meta = () => [
  { title: "Loan Eligibility Calculator | FinCalc India" },
  { name: "description", content: "Estimate borrowing capacity using FinCalc's disclosed FOIR assumption." }
];

export default function Route() {
  return <TrackedCalculator id="eligibility"><SimpleCalculatorPage definition={simpleDefinitions.eligibility} /></TrackedCalculator>;
}
