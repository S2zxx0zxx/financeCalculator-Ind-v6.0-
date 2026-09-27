import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  route("calculators/:calculatorId", "./routes/calculator.tsx"),
  route("activity", "./routes/activity.tsx"),
  route("compare", "./routes/compare.tsx"),
  route("learn", "./routes/learn.tsx")
] satisfies RouteConfig;
