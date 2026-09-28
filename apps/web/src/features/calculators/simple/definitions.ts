import {
  calculateInflation,
  calculateLoanEligibility,
  calculateRd,
  calculateRentVsBuy,
  calculateRetirement,
  calculateSip
} from "@fincalc/finance-core";
import type { SimpleCalculatorDefinition } from "./types";

const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
const percent = (value: number) => `${value.toFixed(1)}%`;

export const simpleDefinitions = {
  sip: {
    id: "sip",
    category: "Investing",
    title: "SIP Calculator",
    description: "See how monthly investing can compound over time using the preserved FinCalc formula.",
    fields: [
      { key: "monthlyInvestment", label: "Monthly investment", min: 100, max: 1_000_000, step: 100, defaultValue: 5_000, display: "money" },
      { key: "annualReturn", label: "Expected annual return", min: 1, max: 50, step: 0.1, defaultValue: 12, display: "percent" },
      { key: "years", label: "Investment period", min: 1, max: 50, step: 1, defaultValue: 10, display: "years" }
    ],
    calculate(values) {
      const { values: result } = calculateSip({
        monthlyInvestment: values.monthlyInvestment ?? 5_000,
        annualReturn: values.annualReturn ?? 12,
        years: values.years ?? 10
      });
      return {
        primaryLabel: "Estimated maturity",
        primaryValue: money.format(result.maturity),
        metrics: [
          { label: "Amount invested", value: money.format(result.invested) },
          { label: "Estimated gain", value: money.format(result.gain) },
          { label: "Return on contribution", value: percent(result.roiPercent) },
          { label: "Duration", value: `${result.months} months` }
        ],
        ratio: {
          title: "Contribution vs growth",
          first: { label: "Invested", value: result.invested, formatted: money.format(result.invested) },
          second: { label: "Growth", value: result.gain, formatted: money.format(result.gain) }
        },
        note: "Expected return is an assumption, not a guaranteed investment outcome."
      };
    }
  },
  rd: {
    id: "rd",
    category: "Deposits",
    title: "RD Calculator",
    description: "Project recurring-deposit maturity with the legacy quarterly-compounding behavior preserved.",
    fields: [
      { key: "monthlyDeposit", label: "Monthly deposit", min: 100, max: 500_000, step: 100, defaultValue: 500, display: "money" },
      { key: "annualRate", label: "Annual interest rate", min: 1, max: 15, step: 0.1, defaultValue: 7, display: "percent" },
      { key: "years", label: "Tenure", min: 1, max: 30, step: 1, defaultValue: 1, display: "years" }
    ],
    calculate(values) {
      const { values: result } = calculateRd({
        monthlyDeposit: values.monthlyDeposit ?? 500,
        annualRate: values.annualRate ?? 7,
        years: values.years ?? 1
      });
      return {
        primaryLabel: "Estimated maturity",
        primaryValue: money.format(result.maturity),
        metrics: [
          { label: "Deposited", value: money.format(result.deposited) },
          { label: "Interest", value: money.format(result.interest) },
          { label: "Term", value: `${result.months} months` }
        ],
        ratio: {
          title: "Deposit vs interest",
          first: { label: "Deposited", value: result.deposited, formatted: money.format(result.deposited) },
          second: { label: "Interest", value: result.interest, formatted: money.format(result.interest) }
        }
      };
    }
  },
  inflation: {
    id: "inflation",
    category: "Planning",
    title: "Inflation Calculator",
    description: "Understand what today’s money may need to become to buy the same thing later.",
    fields: [
      { key: "amount", label: "Cost today", min: 100, max: 999_999_999, step: 100, defaultValue: 10_000, display: "money" },
      { key: "annualInflation", label: "Annual inflation", min: 1, max: 30, step: 0.1, defaultValue: 6, display: "percent" },
      { key: "years", label: "Time horizon", min: 1, max: 50, step: 1, defaultValue: 10, display: "years" }
    ],
    calculate(values) {
      const { values: result } = calculateInflation({
        amount: values.amount ?? 10_000,
        annualInflation: values.annualInflation ?? 6,
        years: values.years ?? 10
      });
      return {
        primaryLabel: "Future cost",
        primaryValue: money.format(result.futureCost),
        metrics: [
          { label: "Cost today", value: money.format(result.amount) },
          { label: "Purchasing power lost", value: percent(result.purchasingPowerLostPercent) },
          { label: "₹100 today may feel like", value: money.format(result.currentHundredFutureWorth) }
        ],
        note: "Inflation is modeled as a constant annual assumption for this scenario."
      };
    }
  },
  eligibility: {
    id: "eligibility",
    category: "Loans",
    title: "Loan Eligibility",
    description: "Estimate a loan ceiling from monthly income, obligations, rate and tenure.",
    fields: [
      { key: "monthlyIncome", label: "Monthly net income", min: 5_000, max: 10_000_000, step: 1_000, defaultValue: 50_000, display: "money" },
      { key: "existingMonthlyObligations", label: "Existing monthly EMIs", min: 0, max: 5_000_000, step: 500, defaultValue: 0, display: "money" },
      { key: "annualRate", label: "Expected loan rate", min: 0.1, max: 30, step: 0.1, defaultValue: 8.5, display: "percent" },
      { key: "tenureYears", label: "Tenure", min: 1, max: 40, step: 1, defaultValue: 20, display: "years" }
    ],
    calculate(values) {
      const { values: result } = calculateLoanEligibility({
        monthlyIncome: values.monthlyIncome ?? 50_000,
        existingMonthlyObligations: values.existingMonthlyObligations ?? 0,
        annualRate: values.annualRate ?? 8.5,
        tenureYears: values.tenureYears ?? 20
      });
      return {
        primaryLabel: result.eligible ? "Estimated maximum loan" : "Not eligible under this model",
        primaryValue: result.eligible ? money.format(result.maxLoan) : money.format(0),
        metrics: [
          { label: "Maximum modeled EMI", value: money.format(result.maxEmi) },
          { label: "FOIR assumption", value: percent(result.foir * 100) }
        ],
        note: "Legacy FinCalc uses a fixed 50% FOIR. Actual lender eligibility can differ materially."
      };
    }
  },
  retirement: {
    id: "retirement",
    category: "Planning",
    title: "Retirement Calculator",
    description: "Model future living cost, target corpus and the monthly SIP needed to approach it.",
    fields: [
      { key: "currentAge", label: "Current age", min: 18, max: 60, step: 1, defaultValue: 25, display: "number" },
      { key: "retirementAge", label: "Retirement age", min: 40, max: 80, step: 1, defaultValue: 60, display: "number" },
      { key: "monthlyExpense", label: "Monthly expense today", min: 1_000, max: 10_000_000, step: 1_000, defaultValue: 30_000, display: "money" },
      { key: "inflationPercent", label: "Inflation assumption", min: 1, max: 20, step: 0.1, defaultValue: 6, display: "percent" },
      { key: "annualReturnPercent", label: "Return assumption", min: 1, max: 30, step: 0.1, defaultValue: 12, display: "percent" }
    ],
    calculate(values) {
      const currentAge = values.currentAge ?? 25;
      const retirementAge = Math.max(values.retirementAge ?? 60, currentAge + 1);
      const { values: result } = calculateRetirement({
        currentAge,
        retirementAge,
        monthlyExpense: values.monthlyExpense ?? 30_000,
        inflationPercent: values.inflationPercent ?? 6,
        annualReturnPercent: values.annualReturnPercent ?? 12
      });
      return {
        primaryLabel: "Estimated retirement corpus",
        primaryValue: money.format(result.corpus),
        metrics: [
          { label: "Monthly expense at retirement", value: money.format(result.futureMonthlyExpense) },
          { label: "Monthly SIP required", value: money.format(result.monthlySipRequired) },
          { label: "Years to retirement", value: String(result.yearsToRetire) }
        ],
        note: "Legacy model assumes 25 retirement years and constant inflation/return assumptions."
      };
    }
  },
  rentvsbuy: {
    id: "rentvsbuy",
    category: "Planning",
    title: "Rent vs Buy",
    description: "Compare the restored FinCalc rent-growth and property-growth scenario before upgrading the model.",
    fields: [
      { key: "propertyValue", label: "Property price", min: 500_000, max: 500_000_000, step: 100_000, defaultValue: 5_000_000, display: "money" },
      { key: "monthlyRent", label: "Monthly rent", min: 1_000, max: 5_000_000, step: 1_000, defaultValue: 15_000, display: "money" },
      { key: "annualRentIncreasePercent", label: "Annual rent increase", min: 0, max: 30, step: 0.1, defaultValue: 5, display: "percent" },
      { key: "annualLoanRatePercent", label: "Loan rate", min: 0.1, max: 20, step: 0.1, defaultValue: 8.5, display: "percent" },
      { key: "annualPropertyGrowthPercent", label: "Property growth", min: 0, max: 30, step: 0.1, defaultValue: 6, display: "percent" },
      { key: "years", label: "Comparison period", min: 1, max: 40, step: 1, defaultValue: 10, display: "years" }
    ],
    calculate(values) {
      const { values: result } = calculateRentVsBuy({
        propertyValue: values.propertyValue ?? 5_000_000,
        monthlyRent: values.monthlyRent ?? 15_000,
        annualRentIncreasePercent: values.annualRentIncreasePercent ?? 5,
        annualLoanRatePercent: values.annualLoanRatePercent ?? 8.5,
        annualPropertyGrowthPercent: values.annualPropertyGrowthPercent ?? 6,
        years: values.years ?? 10
      });
      return {
        primaryLabel: result.better === "buy" ? "Legacy model favors buying" : "Legacy model favors renting",
        primaryValue: money.format(result.difference),
        metrics: [
          { label: "Total rent", value: money.format(result.totalRent) },
          { label: "Total EMIs", value: money.format(result.totalEmi) },
          { label: "Future property value", value: money.format(result.futurePropertyValue) },
          { label: "Legacy net buy cost", value: money.format(result.netBuyCost) }
        ],
        note: "This preserves the old simplified formula. Maintenance, transaction costs and opportunity cost are not yet included."
      };
    }
  }
} satisfies Record<string, SimpleCalculatorDefinition>;

export type SimpleCalculatorId = keyof typeof simpleDefinitions;

export function getSimpleDefinition(id: string): SimpleCalculatorDefinition | undefined {
  if (id in simpleDefinitions) return simpleDefinitions[id as SimpleCalculatorId];
  return undefined;
}
