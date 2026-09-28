import { LearnPage } from "../pages/LearnPage";

export const meta = () => [
  { title: "Learn Personal Finance — FinCalc India" },
  { name: "description", content: "Browse FinCalc's 29 preserved finance guides by topic without breaking existing indexed article URLs." }
];

export default function LearnRoute() {
  return <LearnPage />;
}
