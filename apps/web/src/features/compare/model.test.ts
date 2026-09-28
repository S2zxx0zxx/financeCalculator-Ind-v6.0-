import { describe, expect, it } from "vitest";
import type { CalculationRecord } from "../history/model";
import { initialComparison, resolveComparison, scenariosFor, selectionForCalculator } from "./model";

function rec(id: string, calculatorId: string): CalculationRecord {
  return { schemaVersion:1,id,calculatorId,calculatorTitle:calculatorId,createdAt:"2026-09-28T12:00:00.000Z",inputs:{},summary:{} };
}

describe("scenario comparison model", () => {
  const history = [rec("e1","emi"),rec("s1","sip"),rec("e2","emi"),rec("s2","sip")];

  it("selects a calculator with two scenarios and two distinct records", () => {
    expect(initialComparison(history)).toEqual({ calculatorId:"emi", leftId:"e1", rightId:"e2" });
  });

  it("filters options by calculator", () => {
    expect(scenariosFor(history,"sip").map(item=>item.id)).toEqual(["s1","s2"]);
  });

  it("resets ids when calculator changes", () => {
    expect(selectionForCalculator(history,"sip")).toEqual({ calculatorId:"sip", leftId:"s1", rightId:"s2" });
  });

  it("refuses same-record or cross-calculator comparisons", () => {
    expect(resolveComparison(history,{calculatorId:"emi",leftId:"e1",rightId:"e1"})).toBeNull();
    expect(resolveComparison(history,{calculatorId:"emi",leftId:"e1",rightId:"s1"})).toBeNull();
  });
});
