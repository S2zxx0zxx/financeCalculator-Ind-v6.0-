import { describe, expect, it } from "vitest";
import { messages } from "./messages";

describe("i18n catalog", () => {
  it("keeps English and Hindi key coverage identical", () => {
    expect(Object.keys(messages.hi).sort()).toEqual(Object.keys(messages.en).sort());
  });

  it("has non-empty translations for every key", () => {
    for (const locale of [messages.en, messages.hi]) {
      for (const value of Object.values(locale)) expect(value.trim().length).toBeGreaterThan(0);
    }
  });
});
