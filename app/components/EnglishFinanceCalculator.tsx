"use client";

import { useMemo, useState } from "react";
import type { EnglishFinanceToolId } from "../i18n/englishFinanceToolCatalog";

function number(value: string) {
  const parsed = Number(value.trim().replace(/,/g, "."));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function format(value: number, digits = 2) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(value);
}

function monthlyPayment(principal: number, annualRate: number, months: number) {
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) return principal / months;
  const factor = (1 + monthlyRate) ** months;
  return principal * (monthlyRate * factor) / (factor - 1);
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="category-general-converter-field"><span>{label}</span><input inputMode="decimal" type="text" value={value} onChange={(event) => onChange(event.target.value)} /></label>;
}

export default function EnglishFinanceCalculator({ tool }: { tool: EnglishFinanceToolId }) {
  const [values, setValues] = useState({ homePrice: "400000", downPayment: "80000", mortgageRate: "6", mortgageYears: "30", propertyTax: "4800", homeInsurance: "1800", hoa: "0", loanAmount: "20000", loanRate: "7", loanYears: "5", initialBalance: "10000", monthlyContribution: "100", investmentRate: "5", investmentYears: "10" });
  const set = (key: keyof typeof values) => (value: string) => setValues((current) => ({ ...current, [key]: value }));

  const result = useMemo(() => {
    if (tool === "mortgage") {
      const homePrice = number(values.homePrice); const downPayment = number(values.downPayment); const rate = number(values.mortgageRate); const years = number(values.mortgageYears); const propertyTax = number(values.propertyTax); const homeInsurance = number(values.homeInsurance); const hoa = number(values.hoa);
      if (![homePrice, downPayment, rate, years, propertyTax, homeInsurance, hoa].every(Number.isFinite) || homePrice <= 0 || downPayment < 0 || downPayment >= homePrice || rate < 0 || years <= 0 || propertyTax < 0 || homeInsurance < 0 || hoa < 0) return null;
      const principal = homePrice - downPayment; const months = years * 12; const payment = monthlyPayment(principal, rate, months); const taxInsurance = (propertyTax + homeInsurance) / 12;
      return { rows: [["Loan principal", format(principal)], ["Monthly principal & interest", format(payment)], ["Monthly property tax & insurance", format(taxInsurance)], ["Monthly HOA", format(hoa)], ["Estimated total monthly housing payment", format(payment + taxInsurance + hoa)], ["Total interest over the loan term", format(payment * months - principal)]] };
    }
    if (tool === "loan-amortization") {
      const principal = number(values.loanAmount); const rate = number(values.loanRate); const years = number(values.loanYears);
      if (![principal, rate, years].every(Number.isFinite) || principal <= 0 || rate < 0 || years <= 0) return null;
      const months = Math.round(years * 12); const payment = monthlyPayment(principal, rate, months); const monthlyRate = rate / 100 / 12; let balance = principal; const annualRows: Array<[string, string]> = [];
      for (let month = 1; month <= months; month += 1) {
        const interest = balance * monthlyRate; const principalPaid = Math.min(payment - interest, balance); balance = Math.max(0, balance - principalPaid);
        if (month % 12 === 0 || month === months) annualRows.push([`Balance after month ${month}`, format(balance)]);
      }
      return { rows: [["Fixed monthly payment", format(payment)], ["Total of payments", format(payment * months)], ["Total interest", format(payment * months - principal)]], annualRows };
    }
    const initialBalance = number(values.initialBalance); const contribution = number(values.monthlyContribution); const annualRate = number(values.investmentRate); const years = number(values.investmentYears);
    if (![initialBalance, contribution, annualRate, years].every(Number.isFinite) || initialBalance < 0 || contribution < 0 || annualRate < 0 || years <= 0) return null;
    const periods = Math.round(years * 12); const monthlyRate = annualRate / 100 / 12; const factor = (1 + monthlyRate) ** periods; const futureValue = monthlyRate === 0 ? initialBalance + contribution * periods : initialBalance * factor + contribution * ((factor - 1) / monthlyRate);
    const contributed = initialBalance + contribution * periods;
    return { rows: [["Total contributed", format(contributed)], ["Projected ending balance", format(futureValue)], ["Projected growth", format(futureValue - contributed)], ["Months", String(periods)]] };
  }, [tool, values]);

  const fields = tool === "mortgage" ? <><Field label="Home price" value={values.homePrice} onChange={set("homePrice")} /><Field label="Down payment" value={values.downPayment} onChange={set("downPayment")} /><Field label="Fixed annual interest rate (%)" value={values.mortgageRate} onChange={set("mortgageRate")} /><Field label="Loan term (years)" value={values.mortgageYears} onChange={set("mortgageYears")} /><Field label="Annual property tax" value={values.propertyTax} onChange={set("propertyTax")} /><Field label="Annual homeowners insurance" value={values.homeInsurance} onChange={set("homeInsurance")} /><Field label="Monthly HOA fee (optional)" value={values.hoa} onChange={set("hoa")} /></>
    : tool === "loan-amortization" ? <><Field label="Loan amount" value={values.loanAmount} onChange={set("loanAmount")} /><Field label="Fixed annual interest rate (%)" value={values.loanRate} onChange={set("loanRate")} /><Field label="Loan term (years)" value={values.loanYears} onChange={set("loanYears")} /></>
      : <><Field label="Initial balance" value={values.initialBalance} onChange={set("initialBalance")} /><Field label="Monthly contribution" value={values.monthlyContribution} onChange={set("monthlyContribution")} /><Field label="Assumed annual rate (%)" value={values.investmentRate} onChange={set("investmentRate")} /><Field label="Time horizon (years)" value={values.investmentYears} onChange={set("investmentYears")} /></>;
  const error = tool === "mortgage" ? "Enter valid non-negative costs, a positive home price and a down payment smaller than the home price." : tool === "loan-amortization" ? "Enter a positive loan amount and term, with a non-negative fixed rate." : "Enter non-negative balances, contributions and rate, with a positive time horizon.";

  return <div className="category-general-converter"><div className="engineering-calculator-card"><p className="calculator-usage-hint">Enter all monetary amounts in the same currency. Results do not convert currency or replace lender, tax or investment documentation.</p><div className="paint-calculator-grid">{fields}</div></div><div aria-live="polite" className="category-general-converter-result paint-calculator-result">{!result ? <strong>{error}</strong> : <div className="paint-calculator-result-grid">{result.rows.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>}</div>{result?.annualRows?.length ? <div className="conversion-table-wrap"><table className="conversion-table"><caption>Estimated year-end loan balance</caption><tbody>{result.annualRows.map(([label, value]) => <tr key={label}><td>{label}</td><td>{value}</td></tr>)}</tbody></table></div> : null}</div>;
}
