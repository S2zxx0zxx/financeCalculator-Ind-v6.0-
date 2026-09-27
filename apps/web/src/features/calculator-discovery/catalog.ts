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
  { id: "eligibility", title: "Loan Eligibility", description: "Estimate borrowing capacity using legacy FOIR logic.", category: "Loans", status: "legacy", href: "/#eligibility" },
  { id: "rentvsbuy", title: "Rent vs Buy", description: "Compare long-term rent and ownership cost.", category: "Planning", status: "legacy", href: "/#rentvsbuy" },
  { id: "sip", title: "SIP Calculator", description: "Project recurring investment growth.", category: "Investing", status: "legacy", href: "/#sip" },
  { id: "tax", title: "Income Tax", description: "Compare legacy new/old regime implementation.", category: "Tax", status: "legacy", href: "/#tax" },
  { id: "gst", title: "GST Calculator", description: "Add or remove GST and split CGST/SGST.", category: "Tax", status: "legacy", href: "/#gst" },
  { id: "fd", title: "FD Calculator", description: "Compound fixed-deposit maturity.", category: "Deposits", status: "legacy", href: "/#fd" },
  { id: "rd", title: "RD Calculator", description: "Recurring-deposit maturity projection.", category: "Deposits", status: "legacy", href: "/#rd" },
  { id: "retire", title: "Retirement Calculator", description: "Estimate corpus and required SIP.", category: "Planning", status: "legacy", href: "/#retire" },
  { id: "inflation", title: "Inflation Calculator", description: "See future cost and purchasing-power impact.", category: "Planning", status: "legacy", href: "/#inflation" },
  { id: "cibil", title: "CIBIL Guide", description: "Legacy score-band guidance and loan context.", category: "Credit", status: "legacy", href: "/#cibil" }
];
