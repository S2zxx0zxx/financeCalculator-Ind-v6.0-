import { ContactPage } from "../pages/ContactPage";

export const meta = () => [
  { title: "Contact & Support — FinCalc India" },
  { name: "description", content: "Contact FinCalc through a validated server-delivery workflow with honest delivery status." },
  { name: "robots", content: "index,follow" }
];

export default function ContactRoute() {
  return <ContactPage />;
}
