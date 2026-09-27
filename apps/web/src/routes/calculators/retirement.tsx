import { SimpleCalculatorPage } from "../../features/calculators/simple/SimpleCalculatorPage";
import { simpleDefinitions } from "../../features/calculators/simple/definitions";
import { TrackedCalculator } from "./TrackedCalculator";

export const meta = () => [
  { title: "Retirement Calculator | FinCalc India" },
  { name: "description", content: "Estimate future monthly expenses, target retirement corpus and required monthly SIP." }
];

export default function Route() {
  return <TrackedCalculator id="retirement"><SimpleCalculatorPage definition={simpleDefinitions.retirement} /></TrackedCalculator>;
}
