import { ActivityPage } from "../pages/ActivityPage";

export const meta = () => [
  { title: "Your FinCalc Activity" },
  { name: "description", content: "Recent tools, favorites and locally saved FinCalc calculations." },
  { name: "robots", content: "noindex,follow" }
];

export default function ActivityRoute() {
  return <ActivityPage />;
}
