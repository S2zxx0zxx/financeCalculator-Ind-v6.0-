export interface SimpleField {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  display: "money" | "percent" | "years" | "number";
}

export interface SimpleMetric {
  label: string;
  value: string;
}

export interface SimpleRatio {
  title: string;
  first: { label: string; value: number; formatted: string };
  second: { label: string; value: number; formatted: string };
}

export interface SimpleCalculatorView {
  primaryLabel: string;
  primaryValue: string;
  metrics: SimpleMetric[];
  ratio?: SimpleRatio;
  note?: string;
}

export interface SimpleCalculatorDefinition {
  id: string;
  category: string;
  title: string;
  description: string;
  fields: SimpleField[];
  calculate: (values: Record<string, number>) => SimpleCalculatorView;
}
