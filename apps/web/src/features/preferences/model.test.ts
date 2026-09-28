import { describe, expect, it } from "vitest";
import { MAX_RECENT, addRecent, normalizeIds, toggleId } from "./model";

describe("tool preference model", () => {
  it("normalizes invalid and duplicate ids", () => {
    expect(normalizeIds(["emi", "", "emi", 7, "sip"])).toEqual(["emi", "sip"]);
  });

  it("toggles favorites deterministically", () => {
    expect(toggleId(["emi"], "sip")).toEqual({ values: ["sip", "emi"], active: true });
    expect(toggleId(["emi", "sip"], "emi")).toEqual({ values: ["sip"], active: false });
  });

  it("moves recent tool to front and caps the list", () => {
    const values = Array.from({ length: MAX_RECENT }, (_, index) => `tool-${index}`);
    expect(addRecent(values, "tool-4")[0]).toBe("tool-4");
    expect(addRecent(values, "new")).toHaveLength(MAX_RECENT);
  });
});
