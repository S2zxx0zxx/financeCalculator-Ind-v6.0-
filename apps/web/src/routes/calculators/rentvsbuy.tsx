import { SimpleCalculatorPage } from "../../features/calculators/simple/SimpleCalculatorPage";
import { simpleDefinitions } from "../../features/calculators/simple/definitions";
import { TrackedCalculator } from "./TrackedCalculator";

export const meta = () => [
  { title: "Rent vs Buy Calculator | FinCalc India" },
  { name: "description", content: "Compare FinCalc's preserved rent-versus-buy scenario model and assumptions." }
];

export default function Route() {
  return <TrackedCalculator id="rentvsbuy"><SimpleCalculatorPage definition={simpleDefinitions.rentvsbuy} /></TrackedCalculator>;
}
