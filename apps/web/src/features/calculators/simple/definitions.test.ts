import { describe, expect, it } from "vitest";
import { simpleDefinitions } from "./definitions";

describe("shared calculator definitions", () => {
  it("has deterministic valid defaults for every configured calculator", () => {
    for (const definition of Object.values(simpleDefinitions)) {
      const defaults = Object.fromEntries(definition.fields.map(field => [field.key, field.defaultValue]));
      const view = definition.calculate(defaults);
      expect(view.primaryLabel.length).toBeGreaterThan(0);
      expect(view.primaryValue.length).toBeGreaterThan(0);
      expect(view.metrics.length).toBeGreaterThan(0);
      for (const field of definition.fields) {
        expect(field.defaultValue).toBeGreaterThanOrEqual(field.min);
        expect(field.defaultValue).toBeLessThanOrEqual(field.max);
      }
    }
  });

  it("uses unique field keys within each calculator", () => {
    for (const definition of Object.values(simpleDefinitions)) {
      const keys = definition.fields.map(field => field.key);
      expect(new Set(keys).size).toBe(keys.length);
    }
  });
});
