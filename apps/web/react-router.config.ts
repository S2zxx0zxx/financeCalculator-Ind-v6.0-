import type { Config } from "@react-router/dev/config";

const calculatorPaths = [
  "emi", "sip", "tax", "gst", "fd", "rd", "retirement", "inflation", "eligibility", "rentvsbuy", "cibil"
].map(id => `/calculators/${id}`);

export default {
  appDirectory: "src",
  ssr: false,
  prerender: ["/", "/activity", "/compare", "/learn", ...calculatorPaths]
} satisfies Config;
