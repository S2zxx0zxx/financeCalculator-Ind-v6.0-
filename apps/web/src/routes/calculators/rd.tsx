import { SimpleCalculatorPage } from "../../features/calculators/simple/SimpleCalculatorPage";
import { simpleDefinitions } from "../../features/calculators/simple/definitions";
import { TrackedCalculator } from "./TrackedCalculator";

export const meta = () => [
  { title: "RD Calculator | FinCalc India" },
  { name: "description", content: "Project recurring-deposit maturity using the preserved FinCalc compounding model." }
];

export default function Route() {
  return <TrackedCalculator id="rd"><SimpleCalculatorPage definition={simpleDefinitions.rd} /></TrackedCalculator>;
}
