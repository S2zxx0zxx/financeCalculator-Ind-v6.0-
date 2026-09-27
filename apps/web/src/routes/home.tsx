import { DashboardPage } from "../pages/DashboardPage";

export const meta = () => [
  { title: "FinCalc India — Finance Calculators & Decision Workspace" },
  { name: "description", content: "Calculate EMI, SIP, tax, GST, deposits, retirement, inflation and more with clear assumptions and privacy-first local tools." }
];

export default function HomeRoute() {
  return <DashboardPage />;
}
