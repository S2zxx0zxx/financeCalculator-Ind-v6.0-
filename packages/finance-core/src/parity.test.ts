import { describe, expect, it } from "vitest";
import {
  calculateEmi,
  calculateFd,
  calculateGst,
  calculateInflation,
  calculateLegacyTax,
  calculateLoanEligibility,
  calculateRd,
  calculateRentVsBuy,
  calculateRetirement,
  calculateSip,
  classifyLegacyCibil
} from "./index";

describe("legacy parity fixtures", () => {
  it("preserves EMI default fixture", () => {
    const { values } = calculateEmi({ principal: 1_000_000, annualRate: 8.5, tenureYears: 20 });
    expect(values.monthlyEmi).toBeCloseTo(8678.232333655342, 8);
    expect(values.totalPayment).toBeCloseTo(2082775.760077282, 6);
    expect(values.totalInterest).toBeCloseTo(1082775.760077282, 6);
  });

  it("preserves SIP default fixture", () => {
    const { values } = calculateSip({ monthlyInvestment: 5000, annualReturn: 12, years: 10 });
    expect(values.maturity).toBeCloseTo(1161695.3817597027, 6);
    expect(values.invested).toBe(600000);
    expect(values.gain).toBeCloseTo(561695.3817597027, 6);
    expect(values.roiPercent).toBe(93.6);
  });

  it("preserves GST add and remove fixtures", () => {
    expect(calculateGst({ amount: 1000, ratePercent: 18, mode: "add" }).values.total).toBeCloseTo(1180, 10);
    const removed = calculateGst({ amount: 1180, ratePercent: 18, mode: "remove" }).values;
    expect(removed.base).toBeCloseTo(1000, 10);
    expect(removed.gst).toBeCloseTo(180, 10);
    expect(removed.cgst).toBeCloseTo(90, 10);
  });

  it("preserves FD default-style fixture", () => {
    const { values } = calculateFd({ principal: 5000, annualRate: 7.1, years: 1, compoundsPerYear: 4 });
    expect(values.maturity).toBeCloseTo(5364.564218509393, 8);
    expect(values.interest).toBeCloseTo(364.56421850939296, 8);
  });

  it("preserves RD quarterly-compounding fixture", () => {
    const { values } = calculateRd({ monthlyDeposit: 500, annualRate: 7, years: 1 });
    expect(values.deposited).toBe(6000);
    expect(values.maturity).toBeCloseTo(6195.136538107413, 8);
  });

  it("preserves inflation fixture", () => {
    const { values } = calculateInflation({ amount: 10000, annualInflation: 6, years: 10 });
    expect(values.futureCost).toBeCloseTo(17908.476965428545, 8);
    expect(values.purchasingPowerLostPercent).toBe(44.2);
    expect(values.currentHundredFutureWorth).toBe(56);
  });

  it("preserves retirement legacy assumptions", () => {
    const { values } = calculateRetirement({
      currentAge: 25,
      retirementAge: 60,
      monthlyExpense: 30000,
      inflationPercent: 6,
      annualReturnPercent: 12
    });
    expect(values.yearsToRetire).toBe(35);
    expect(values.futureMonthlyExpense).toBeCloseTo(230582.60376937047, 6);
    expect(values.corpus).toBeCloseTo(36542281.471461274, 4);
    expect(values.monthlySipRequired).toBeCloseTo(5625.984250872727, 6);
  });

  it("preserves 50 percent FOIR loan eligibility fixture", () => {
    const { values } = calculateLoanEligibility({
      monthlyIncome: 50000,
      existingMonthlyObligations: 0,
      annualRate: 8.5,
      tenureYears: 20
    });
    expect(values.maxEmi).toBe(25000);
    expect(values.maxLoan).toBeCloseTo(2880770.995614703, 6);
  });

  it("preserves rent-vs-buy legacy fixture", () => {
    const { values } = calculateRentVsBuy({
      propertyValue: 5000000,
      monthlyRent: 15000,
      annualRentIncreasePercent: 5,
      annualLoanRatePercent: 8.5,
      annualPropertyGrowthPercent: 6,
      years: 10
    });
    expect(values.totalRent).toBeCloseTo(2264020.656398789, 6);
    expect(values.totalEmi).toBeCloseTo(5951313.065976536, 6);
    expect(values.futurePropertyValue).toBeCloseTo(8954238.482714273, 6);
    expect(values.netBuyCost).toBeCloseTo(-2002925.4167377371, 6);
    expect(values.better).toBe("buy");
  });

  it("preserves restored legacy tax code as a versioned fixture, not current-law truth", () => {
    const { values, meta } = calculateLegacyTax({
      income: 1500000,
      ageGroup: "general",
      section80C: 150000,
      section80D: 25000
    });
    expect(values.taxableNew).toBe(1425000);
    expect(values.newTax).toBeCloseTo(97500, 8);
    expect(values.taxableOld).toBe(1275000);
    expect(values.oldTax).toBeCloseTo(202800, 8);
    expect(values.better).toBe("new");
    expect(meta.ruleVersion).toBe("legacy-2025-26-source-code");
  });

  it("preserves legacy input clamping", () => {
    const { values } = calculateEmi({ principal: 1, annualRate: 99, tenureYears: 0 });
    expect(values.principal).toBe(10000);
    expect(values.months).toBe(12);
  });

  it("preserves CIBIL UI thresholds without carrying stale rate claims into the domain", () => {
    expect(classifyLegacyCibil(800).values.band).toBe("excellent");
    expect(classifyLegacyCibil(750).values.band).toBe("very-good");
    expect(classifyLegacyCibil(650).values.band).toBe("good");
    expect(classifyLegacyCibil(550).values.band).toBe("average");
    expect(classifyLegacyCibil(549).values.band).toBe("poor");
  });
});
