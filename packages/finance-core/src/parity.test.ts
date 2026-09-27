import { describe, expect, it } from "vitest";
import {
  calculateEmi,
  calculateFd,
  calculateGst,
  calculateInflation,
  calculateLoanEligibility,
  calculateRd,
  calculateRentVsBuy,
  calculateSip,
  classifyLegacyCibil
} from "./index";

describe("legacy parity fixtures", () => {
  it("preserves EMI baseline", () => {
    const { values } = calculateEmi({ principal: 1_000_000, annualRate: 8.5, tenureYears: 20 });
    expect(values.monthlyEmi).toBeCloseTo(8678.232333655342, 8);
    expect(values.totalInterest).toBeCloseTo(1082775.760077282, 6);
  });

  it("clamps EMI inputs exactly like legacy validateInput", () => {
    const { values } = calculateEmi({ principal: 1, annualRate: 99, tenureYears: 0 });
    expect(values.principal).toBe(10_000);
    expect(values.months).toBe(12);
  });

  it("preserves inclusive and exclusive GST paths", () => {
    expect(calculateGst({ amount: 1000, ratePercent: 18, mode: "add" }).values.total).toBeCloseTo(1180, 10);
    const removed = calculateGst({ amount: 1180, ratePercent: 18, mode: "remove" }).values;
    expect(removed.base).toBeCloseTo(1000, 10);
    expect(removed.gst).toBeCloseTo(180, 10);
  });

  it("keeps baseline calculator outputs finite", () => {
    const values = [
      calculateSip({ monthlyInvestment: 5000, annualReturn: 12, years: 10 }).values.maturity,
      calculateFd({ principal: 100000, annualRate: 7.1, years: 3, compoundsPerYear: 4 }).values.maturity,
      calculateRd({ monthlyDeposit: 5000, annualRate: 7, years: 3 }).values.maturity,
      calculateInflation({ amount: 10000, annualInflation: 6, years: 10 }).values.futureCost,
      calculateLoanEligibility({ monthlyIncome: 50000, existingMonthlyObligations: 0, annualRate: 8.5, tenureYears: 20 }).values.maxLoan,
      calculateRentVsBuy({ propertyValue: 5000000, monthlyRent: 15000, annualRentIncreasePercent: 5, annualLoanRatePercent: 8.5, annualPropertyGrowthPercent: 6, years: 10 }).values.totalRent
    ];
    for (const value of values) expect(Number.isFinite(value)).toBe(true);
  });

  it("preserves CIBIL UI thresholds without carrying stale rate claims into the domain", () => {
    expect(classifyLegacyCibil(800).values.band).toBe("excellent");
    expect(classifyLegacyCibil(750).values.band).toBe("very-good");
    expect(classifyLegacyCibil(650).values.band).toBe("good");
    expect(classifyLegacyCibil(550).values.band).toBe("average");
    expect(classifyLegacyCibil(549).values.band).toBe("poor");
  });
});
