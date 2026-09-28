import { describe, expect, it } from "vitest";
import type { CalculationRecord } from "../history/model";
import { buildPrintHtml, buildShareText, escapeHtml, humanizeLabel } from "./share";

const record: CalculationRecord = {
  schemaVersion:1,
  id:"1",
  calculatorId:"emi",
  calculatorTitle:"EMI <script>alert(x)</script>",
  createdAt:"2026-09-28T12:00:00.000Z",
  inputs:{ principal:1000000, note:"><img src=x onerror=alert(1)>" },
  summary:{ monthlyEmi:"₹8,678", totalInterest:"₹10,82,776" }
};

describe("share and print output", () => {
  it("creates human-readable labels and stable share text", () => {
    expect(humanizeLabel("monthlyEmi")).toBe("Monthly Emi");
    expect(buildShareText(record)).toContain("Monthly Emi: ₹8,678");
    expect(buildShareText(record)).not.toContain(String(record.inputs.note));
  });

  it("escapes all user-controlled print values", () => {
    const html=buildPrintHtml(record);
    expect(html).not.toContain("<script>alert(x)</script>");
    expect(html).not.toContain("<img src=x onerror=alert(1)>");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("&lt;img src=x onerror=alert(1)&gt;");
  });

  it("escapes HTML metacharacters", () => {
    expect(escapeHtml("<>&\"'")).toBe("&lt;&gt;&amp;&quot;&#039;");
  });
});
