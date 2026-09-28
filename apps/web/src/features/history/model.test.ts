import { describe, expect, it } from "vitest";
import { MAX_HISTORY, normalizeHistory, removeHistoryRecord, upsertHistory, type CalculationRecord } from "./model";

function record(id: string, createdAt = "2026-09-28T12:00:00.000Z"): CalculationRecord {
  return {
    schemaVersion: 1,
    id,
    calculatorId: "emi",
    calculatorTitle: "EMI Calculator",
    createdAt,
    inputs: { principal: 1_000_000, rate: 8.5 },
    summary: { monthlyEmi: "₹8,678" }
  };
}

describe("calculation history model", () => {
  it("rejects malformed records and duplicate ids", () => {
    const values: unknown[] = [
      record("a"),
      { ...record("bad-date"), createdAt: "not-a-date" },
      { schemaVersion: 1, id: "missing" },
      record("a"),
      record("b")
    ];
    expect(normalizeHistory(values).map(item => item.id)).toEqual(["a", "b"]);
  });

  it("caps history to the declared maximum", () => {
    const many = Array.from({ length: MAX_HISTORY + 5 }, (_, index) => record(String(index)));
    expect(normalizeHistory(many)).toHaveLength(MAX_HISTORY);
  });

  it("upserts newest first without duplicating ids", () => {
    const next = upsertHistory([record("a"), record("b")], { ...record("b"), summary: { monthlyEmi: "₹9,000" } });
    expect(next.map(item => item.id)).toEqual(["b", "a"]);
    expect(next[0]?.summary.monthlyEmi).toBe("₹9,000");
  });

  it("removes only the requested record", () => {
    expect(removeHistoryRecord([record("a"), record("b")], "a").map(item => item.id)).toEqual(["b"]);
  });
});
