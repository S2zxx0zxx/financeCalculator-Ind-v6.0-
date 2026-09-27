export type CalculatorCategory = "Loans" | "Investing" | "Tax" | "Deposits" | "Planning" | "Credit";

export interface CalculatorDescriptor {
  id: string;
  title: string;
  description: string;
  category: CalculatorCategory;
  status: "migrated" | "legacy";
  href: string;
}

export const calculatorCatalog: CalculatorDescriptor[] = [
  { id: "emi", title: "EMI Calculator", description: "Monthly EMI, interest and total repayment.", category: "Loans", status: "migrated", href: "/calculators/emi" },
  { id: "eligibility", title: "Loan Eligibility", description: "Estimate borrowing capacity using the preserved 50% FOIR model.", category: "Loans", status: "migrated", href: "/calculators/eligibility" },
  { id: "rentvsbuy", title: "Rent vs Buy", description: "Compare the current simplified rent and ownership model.", category: "Planning", status: "migrated", href: "/calculators/rentvsbuy" },
  { id: "sip", title: "SIP Calculator", description: "Project recurring investment growth.", category: "Investing", status: "migrated", href: "/calculators/sip" },
  { id: "tax", title: "Income Tax", description: "Current legacy implementation retained until FY 2026-27 rules are verified and upgraded.", category: "Tax", status: "legacy", href: "/#sec-tax" },
  { id: "gst", title: "GST Calculator", description: "Add or remove GST and split CGST/SGST.", category: "Tax", status: "migrated", href: "/calculators/gst" },
  { id: "fd", title: "FD Calculator", description: "Compound fixed-deposit maturity.", category: "Deposits", status: "migrated", href: "/calculators/fd" },
  { id: "rd", title: "RD Calculator", description: "Recurring-deposit maturity projection.", category: "Deposits", status: "migrated", href: "/calculators/rd" },
  { id: "retire", title: "Retirement Calculator", description: "Estimate corpus and required SIP using the preserved legacy assumptions.", category: "Planning", status: "migrated", href: "/calculators/retirement" },
  { id: "inflation", title: "Inflation Calculator", description: "See future cost and purchasing-power impact.", category: "Planning", status: "migrated", href: "/calculators/inflation" },
  { id: "cibil", title: "CIBIL Guide", description: "Score-band logic preserved; time-sensitive lending copy is being re-verified.", category: "Credit", status: "legacy", href: "/#sec-cibil" }
];
