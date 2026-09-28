import { useMemo, useState } from "react";
import { Link } from "react-router";
import { track } from "../shared/analytics/analytics";
import { readCalculationHistory } from "../features/history/storage";
import {
  calculatorIdsWithScenarios,
  initialComparison,
  resolveComparison,
  scenariosFor,
  selectionForCalculator,
  type ComparisonSelection
} from "../features/compare/model";

export function ComparePage() {
  const history = useMemo(() => readCalculationHistory(), []);
  const [selection, setSelection] = useState<ComparisonSelection>(() => initialComparison(history));
  const calculatorIds = calculatorIdsWithScenarios(history);
  const options = scenariosFor(history, selection.calculatorId);
  const comparison = resolveComparison(history, selection);

  function changeCalculator(next: string) {
    setSelection(selectionForCalculator(history, next));
  }

  function compare(next: ComparisonSelection) {
    setSelection(next);
    if (resolveComparison(history, next)) track({ name: "scenario_compared", calculatorId: next.calculatorId });
  }

  if (history.length < 2) {
    return (
      <section className="hero-panel">
        <span className="eyebrow">COMPARE</span>
        <h1>Save two scenarios to compare them.</h1>
        <p>FinCalc compares saved runs only after you explicitly save them. Your local calculation history is not uploaded.</p>
        <Link className="primary-button" to="/">Open calculators</Link>
      </section>
    );
  }

  return (
    <div className="compare-page">
      <section className="calc-intro">
        <span className="eyebrow">SCENARIO LAB</span>
        <h1>Put two money scenarios next to each other.</h1>
        <p>Compare inputs and outputs without recomputing or hiding assumptions.</p>
      </section>
      <section className="compare-controls">
        <label>Calculator
          <select value={selection.calculatorId} onChange={event => changeCalculator(event.target.value)}>
            {calculatorIds.map(id => <option key={id} value={id}>{history.find(item => item.calculatorId === id)?.calculatorTitle ?? id}</option>)}
          </select>
        </label>
        <label>Scenario A
          <select value={selection.leftId} onChange={event => compare({ ...selection, leftId:event.target.value })}>
            {options.map(item => <option key={item.id} value={item.id}>{new Date(item.createdAt).toLocaleString("en-IN")}</option>)}
          </select>
        </label>
        <label>Scenario B
          <select value={selection.rightId} onChange={event => compare({ ...selection, rightId:event.target.value })}>
            {options.map(item => <option key={item.id} value={item.id}>{new Date(item.createdAt).toLocaleString("en-IN")}</option>)}
          </select>
        </label>
      </section>
      {comparison ? (
        <section className="comparison-grid">
          {[comparison.left,comparison.right].map((record,index) => (
            <article className="comparison-card" key={record.id}>
              <span className="eyebrow">SCENARIO {index === 0 ? "A" : "B"}</span>
              <h2>{record.calculatorTitle}</h2>
              <h3>Inputs</h3>
              <dl>{Object.entries(record.inputs).map(([key,value]) => <div key={key}><dt>{key}</dt><dd>{String(value)}</dd></div>)}</dl>
              <h3>Results</h3>
              <dl>{Object.entries(record.summary).map(([key,value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl>
            </article>
          ))}
        </section>
      ) : (
        <div className="empty-state"><strong>Two different saved runs of the same calculator are required</strong><span>Save another scenario or choose two different records.</span></div>
      )}
    </div>
  );
}
