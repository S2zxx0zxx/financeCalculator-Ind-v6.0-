import { CibilPage } from "../../pages/CibilPage";
import { TrackedCalculator } from "./TrackedCalculator";

export const meta = () => [
  { title: "CIBIL Score Guide | FinCalc India" },
  { name: "description", content: "Understand a 300–900 CIBIL Score using current official guidance without lender-rate promises." }
];

export default function Route() {
  return <TrackedCalculator id="cibil"><CibilPage /></TrackedCalculator>;
}
