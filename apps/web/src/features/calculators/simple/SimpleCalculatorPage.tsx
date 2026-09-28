import { useEffect, useMemo, useState } from "react";
import { AccessibleRatioChart } from "../../../shared/charts/AccessibleRatioChart";
import { CalculatorActions } from "../../export-share/CalculatorActions";
import { savedNumber, useSavedScenario } from "../../history/useSavedScenario";
import type { SimpleCalculatorDefinition, SimpleField } from "./types";

const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

function displayField(field: SimpleField, value: number) {
  if (field.display === "money") return money.format(value);
  if (field.display === "percent") return `${value}%`;
  if (field.display === "years") return `${value} years`;
  return String(value);
}

export function SimpleCalculatorPage({ definition }: { definition: SimpleCalculatorDefinition }) {
  const savedScenario = useSavedScenario();
  const defaults = useMemo(() => Object.fromEntries(definition.fields.map(field => [field.key, field.defaultValue])), [definition]);
  const [values, setValues] = useState<Record<string, number>>(() => Object.fromEntries(definition.fields.map(field => [field.key, savedNumber(savedScenario?.inputs, field.key, field.defaultValue)])));
  useEffect(() => {
    if (!savedScenario) return;
    setValues(Object.fromEntries(definition.fields.map(field => [field.key, savedNumber(savedScenario.inputs, field.key, field.defaultValue)])));
  }, [definition, defaults, savedScenario?.recordId]);
  const view = useMemo(() => definition.calculate(values), [definition, values]);
  const summary = useMemo(
    () => Object.fromEntries([[view.primaryLabel, view.primaryValue], ...view.metrics.map(metric => [metric.label, metric.value])]),
    [view]
  );

  return (
    <div className="calculator-layout">
      <section className="calc-intro">
        <span className="eyebrow">{definition.category} · {definition.id}</span>
        <h1>{definition.title}</h1>
        <p>{definition.description}</p>
      </section>
      <section className="calculator-card">
        <div className="input-stack">
          {definition.fields.map(field => {
            const value = values[field.key] ?? field.defaultValue;
            return (
              <label key={field.key}>
                {field.label} <strong>{displayField(field, value)}</strong>
                <input
                  type="range"
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  value={value}
                  onChange={event => setValues(current => ({ ...current, [field.key]: Number(event.target.value) }))}
                />
                <input
                  type="number"
                  inputMode="decimal"
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  value={value}
                  onChange={event => setValues(current => ({ ...current, [field.key]: Number(event.target.value) }))}
                />
              </label>
            );
          })}
        </div>
        <div className="result-panel" aria-live="polite" aria-atomic="true">
          <span className="eyebrow">{view.primaryLabel}</span>
          <div className="result-big">{view.primaryValue}</div>
          <div className="result-grid">
            {view.metrics.map(metric => <div key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong></div>)}
          </div>
          {view.ratio ? <AccessibleRatioChart title={view.ratio.title} segments={[view.ratio.first, view.ratio.second]} /> : null}
          {view.note ? <div className="assumption-note">{view.note}</div> : null}
          <CalculatorActions calculatorId={definition.id} calculatorTitle={definition.title} inputs={values} summary={summary} />
        </div>
      </section>
    </div>
  );
}
