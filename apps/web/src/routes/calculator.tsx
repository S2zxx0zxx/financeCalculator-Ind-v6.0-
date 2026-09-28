import { CalculatorRoutePage } from "../pages/CalculatorRoutePage";

export const meta = () => [
  { title: "Financial Calculator — FinCalc India" },
  { name: "description", content: "Interactive FinCalc calculator with transparent assumptions, saved scenarios, sharing and accessible result breakdowns." }
];

export default function CalculatorRoute() {
  return <CalculatorRoutePage />;
}
