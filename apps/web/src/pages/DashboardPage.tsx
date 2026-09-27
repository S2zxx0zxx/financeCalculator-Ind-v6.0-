import { Link } from "react-router";
import { CalculatorDirectory } from "../features/calculator-discovery/CalculatorDirectory";

export function DashboardPage() {
  return (
    <>
      <section className="hero-panel">
        <span className="eyebrow">YOUR MONEY TOOLKIT</span>
        <h1>One calm workspace for every important money calculation.</h1>
        <p>FinCalc V7 is being rebuilt without sacrificing the formulas, articles, offline behavior or useful workflows already in production.</p>
        <div className="hero-actions">
          <Link className="primary-button" to="/calculators/emi">Open migrated EMI</Link>
          <a className="secondary-button" href="/index.html">Use current suite</a>
        </div>
      </section>
      <CalculatorDirectory />
    </>
  );
}
