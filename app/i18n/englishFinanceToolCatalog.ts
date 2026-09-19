export type EnglishFinanceToolId = "mortgage" | "loan-amortization" | "compound-interest";

export type EnglishFinanceTool = {
  id: EnglishFinanceToolId;
  href: string;
  title: string;
  description: string;
  formula: string;
  inputs: string;
  workedExample: string;
  limitations: string;
};

export const englishFinanceTools: EnglishFinanceTool[] = [
  { id: "mortgage", href: "/en/finance-calculators/mortgage", title: "Mortgage Calculator", description: "Estimate a fixed-rate monthly mortgage payment, including optional tax, insurance and HOA inputs.", formula: "monthly P&I = P x r(1+r)^n / ((1+r)^n - 1)", inputs: "Home price, down payment, fixed annual interest rate, loan term, annual property tax, annual insurance and optional monthly HOA fee.", workedExample: "A $400,000 home with $80,000 down, a 6% fixed rate and a 30-year term has an estimated principal-and-interest payment of about $1,918.56 per month.", limitations: "This is an estimate for a fully amortizing fixed-rate loan. It excludes closing costs, lender fees, PMI, rate changes, escrow adjustments, points and local lending rules. Review your official Loan Estimate before deciding." },
  { id: "loan-amortization", href: "/en/finance-calculators/loan-amortization", title: "Loan Amortization Calculator", description: "Calculate fixed monthly payment, total interest and an annual principal-interest breakdown for a loan.", formula: "payment = P x r(1+r)^n / ((1+r)^n - 1)", inputs: "Loan amount, fixed annual interest rate and loan term in years.", workedExample: "A $20,000 loan at 7% for five years has an estimated monthly principal-and-interest payment of about $396.02.", limitations: "The schedule assumes every payment is made on time, at a fixed rate and without extra payments or fees. Actual lender disclosures control the terms of your loan." },
  { id: "compound-interest", href: "/en/finance-calculators/compound-interest", title: "Compound Interest Calculator", description: "Project a balance from an initial amount, monthly contributions, annual rate and time horizon.", formula: "future value = P(1 + r/12)^(12y) + C[((1 + r/12)^(12y) - 1) / (r/12)]", inputs: "Initial balance, end-of-month contribution, assumed annual rate and years.", workedExample: "$10,000 at an assumed 5% annual rate with $100 monthly contributions for 10 years grows to about $31,998 before taxes and fees.", limitations: "This is a mathematical projection, not an investment recommendation or guaranteed return. It excludes taxes, fees, inflation, losses and changes in contribution or return rate." },
];

export function findEnglishFinanceTool(id: string) {
  return englishFinanceTools.find((tool) => tool.id === id);
}
