import { SimpleCalculatorPage } from "../../features/calculators/simple/SimpleCalculatorPage";
import { simpleDefinitions } from "../../features/calculators/simple/definitions";
import { TrackedCalculator } from "./TrackedCalculator";

export const meta = () => [
  { title: "SIP Calculator | FinCalc India" },
  { name: "description", content: "Project monthly SIP contributions and estimated growth over time." }
];

export default function Route() {
  return <TrackedCalculator id="sip"><SimpleCalculatorPage definition={simpleDefinitions.sip} /></TrackedCalculator>;
}
