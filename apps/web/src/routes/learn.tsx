import { LegacyBridgePage } from "../pages/LegacyBridgePage";

export const meta = () => [
  { title: "Learn — FinCalc India" },
  { name: "description", content: "Explore FinCalc's finance guides while the content system is migrated without breaking existing article URLs." }
];

export default function LearnRoute() {
  return <LegacyBridgePage kind="blog" />;
}
