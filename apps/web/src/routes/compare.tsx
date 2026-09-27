import { ComparePage } from "../pages/ComparePage";

export const meta = () => [
  { title: "Compare Financial Scenarios — FinCalc India" },
  { name: "description", content: "Compare two locally saved FinCalc scenarios side by side." },
  { name: "robots", content: "noindex,follow" }
];

export default function CompareRoute() {
  return <ComparePage />;
}
