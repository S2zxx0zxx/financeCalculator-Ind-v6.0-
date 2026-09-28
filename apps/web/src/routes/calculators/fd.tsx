import { FdCalculatorPage } from "../../pages/FdCalculatorPage";
import { TrackedCalculator } from "./TrackedCalculator";

export const meta = () => [
  { title: "FD Calculator | FinCalc India" },
  { name: "description", content: "Project fixed-deposit maturity across rate, tenure and compounding assumptions." }
];

export default function Route() {
  return <TrackedCalculator id="fd"><FdCalculatorPage /></TrackedCalculator>;
}
