import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  route("calculators/emi", "./routes/calculators/emi.tsx"),
  route("calculators/sip", "./routes/calculators/sip.tsx"),
  route("calculators/tax", "./routes/calculators/tax.tsx"),
  route("calculators/gst", "./routes/calculators/gst.tsx"),
  route("calculators/fd", "./routes/calculators/fd.tsx"),
  route("calculators/rd", "./routes/calculators/rd.tsx"),
  route("calculators/retirement", "./routes/calculators/retirement.tsx"),
  route("calculators/inflation", "./routes/calculators/inflation.tsx"),
  route("calculators/eligibility", "./routes/calculators/eligibility.tsx"),
  route("calculators/rentvsbuy", "./routes/calculators/rentvsbuy.tsx"),
  route("calculators/cibil", "./routes/calculators/cibil.tsx"),
  route("activity", "./routes/activity.tsx"),
  route("compare", "./routes/compare.tsx"),
  route("learn", "./routes/learn.tsx"),
  route("contact", "./routes/contact.tsx")
] satisfies RouteConfig;
