export type CalculatorEventName =
  | "calculator_opened"
  | "calculation_saved"
  | "calculation_shared"
  | "calculation_printed"
  | "scenario_compared";

export type ContentEventName =
  | "article_opened"
  | "article_to_calculator"
  | "calculator_to_article";

export type FinCalcEventName = CalculatorEventName | ContentEventName;

export interface FinCalcEvent {
  name: FinCalcEventName;
  calculatorId?: string;
  articleSlug?: string;
  method?: "native" | "clipboard" | "whatsapp" | "print";
}

/**
 * Intentionally excludes money amounts, income, credit scores, tax values,
 * email addresses and free-form user input from analytics payloads.
 */
export function sanitizeEvent(event: FinCalcEvent): FinCalcEvent {
  return {
    name: event.name,
    ...(event.calculatorId ? { calculatorId: event.calculatorId } : {}),
    ...(event.articleSlug ? { articleSlug: event.articleSlug } : {}),
    ...(event.method ? { method: event.method } : {})
  };
}
