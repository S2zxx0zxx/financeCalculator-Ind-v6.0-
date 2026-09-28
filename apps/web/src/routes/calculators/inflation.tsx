import { SimpleCalculatorPage } from "../../features/calculators/simple/SimpleCalculatorPage";
import { simpleDefinitions } from "../../features/calculators/simple/definitions";
import { TrackedCalculator } from "./TrackedCalculator";

export const meta = () => [
  { title: "Inflation Calculator | FinCalc India" },
  { name: "description", content: "Model future cost and purchasing-power impact from an annual inflation assumption." }
];

export default function Route() {
  return <TrackedCalculator id="inflation"><SimpleCalculatorPage definition={simpleDefinitions.inflation} /></TrackedCalculator>;
}
