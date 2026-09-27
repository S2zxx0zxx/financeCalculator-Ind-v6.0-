import { Navigate, useParams } from "react-router";
import { EmiCalculatorPage } from "./EmiCalculatorPage";
import { FdCalculatorPage } from "./FdCalculatorPage";
import { GstCalculatorPage } from "./GstCalculatorPage";
import { SimpleCalculatorPage } from "../features/calculators/simple/SimpleCalculatorPage";
import { simpleDefinitions } from "../features/calculators/simple/definitions";

export function CalculatorRoutePage() {
  const { calculatorId } = useParams();
  if (calculatorId === "emi") return <EmiCalculatorPage />;
  if (calculatorId === "gst") return <GstCalculatorPage />;
  if (calculatorId === "fd") return <FdCalculatorPage />;
  const definition = calculatorId ? simpleDefinitions[calculatorId] : undefined;
  if (!definition) return <Navigate to="/" replace />;
  return <SimpleCalculatorPage definition={definition} />;
}
