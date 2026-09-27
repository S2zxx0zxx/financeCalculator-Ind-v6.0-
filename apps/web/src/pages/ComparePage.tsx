import { useMemo, useState } from "react";
import { Link } from "react-router";
import { readCalculationHistory } from "../features/history/storage";

export function ComparePage() {
  const history = useMemo(() => readCalculationHistory(), []);
  const calculatorIds = [...new Set(history.map(item => item.calculatorId))];
  const [calculatorId, setCalculatorId] = useState(calculatorIds[0] ?? "");
  const options = history.filter(item => item.calculatorId === calculatorId);
  const [leftId, setLeftId] = useState(options[0]?.id ?? "");
  const [rightId, setRightId] = useState(options[1]?.id ?? "");
  const left = history.find(item => item.id === leftId);
  const right = history.find(item => item.id === rightId);

  function changeCalculator(next: string) {
    setCalculatorId(next);
    const nextOptions = history.filter(item => item.calculatorId === next);
    setLeftId(nextOptions[0]?.id ?? "");
    setRightId(nextOptions[1]?.id ?? "");
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
          <select value={calculatorId} onChange={event => changeCalculator(event.target.value)}>
            {calculatorIds.map(id => <option key={id} value={id}>{history.find(item => item.calculatorId === id)?.calculatorTitle ?? id}</option>)}
          </select>
        </label>
        <label>Scenario A
          <select value={leftId} onChange={event => setLeftId(event.target.value)}>
            {options.map(item => <option key={item.id} value={item.id}>{new Date(item.createdAt).toLocaleString("en-IN")}</option>)}
          </select>
        </label>
        <label>Scenario B
          <select value={rightId} onChange={event => setRightId(event.target.value)}>
            {options.map(item => <option key={item.id} value={item.id}>{new Date(item.createdAt).toLocaleString("en-IN")}</option>)}
          </select>
        </label>
      </section>
      {left && right ? (
        <section className="comparison-grid">
          {[left,right].map((record,index) => (
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
        <div className="empty-state"><strong>Two saved runs of the same calculator are required</strong><span>Save another scenario, then return here.</span></div>
      )}
    </div>
  );
}
