import { EmiCalculatorPage } from "../../pages/EmiCalculatorPage";
import { TrackedCalculator } from "./TrackedCalculator";

export const meta = () => [
  { title: "EMI Calculator | FinCalc India" },
  { name: "description", content: "Monthly EMI, interest and total repayment for loan scenarios." }
];

export default function Route() {
  return <TrackedCalculator id="emi"><EmiCalculatorPage /></TrackedCalculator>;
}
