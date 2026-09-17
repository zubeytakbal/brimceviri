// O'zbekistonda ish haqidan ushlab qolinadigan soliqlarni hisoblash --
// jismoniy shaxslardan olinadigan daromad solig'i (JShShS, standart
// stavka 12%, IT Park rezidenti xodimlari uchun imtiyozli 7,5%) va
// individual jamg'arma pensiya hisobiga (IJPH) badali (0,1%), ikkalasi
// ham hisoblangan (brutto) ish haqining o'zidan alohida-alohida
// hisoblanadi (ketma-ket kompaundlanmaydi). Ish beruvchi tomonidan
// to'lanadigan ijtimoiy soliq (12%) xodimning "qo'lga oladigan"
// summasiga ta'sir qilmaydi, faqat ish beruvchi uchun qo'shimcha
// xarajatni bildiradi. Misol bilan tekshirilgan: 15 000 000 so'm
// brutto => 1 800 000 JShShS + 15 000 IJPH ushlanib, 13 185 000 so'm
// qo'lga tegadi (ko'paytiruvchi 0,879).

export const STANDARD_INCOME_TAX_RATE = 0.12;
export const IT_PARK_INCOME_TAX_RATE = 0.075;
export const PENSION_CONTRIBUTION_RATE = 0.001;
export const EMPLOYER_SOCIAL_TAX_RATE = 0.12;

export type SalaryRegime = "standard" | "it-park";

export type SalaryBreakdown = {
  grossSalary: number;
  incomeTax: number;
  pensionContribution: number;
  netSalary: number;
  employerSocialTax: number;
  employerTotalCost: number;
};

function getIncomeTaxRate(regime: SalaryRegime): number {
  return regime === "it-park" ? IT_PARK_INCOME_TAX_RATE : STANDARD_INCOME_TAX_RATE;
}

export function calculateFromGross(
  grossSalary: number,
  regime: SalaryRegime
): SalaryBreakdown | null {
  if (!Number.isFinite(grossSalary) || grossSalary <= 0) {
    return null;
  }

  const incomeTaxRate = getIncomeTaxRate(regime);
  const incomeTax = grossSalary * incomeTaxRate;
  const pensionContribution = grossSalary * PENSION_CONTRIBUTION_RATE;
  const netSalary = grossSalary - incomeTax - pensionContribution;
  const employerSocialTax = grossSalary * EMPLOYER_SOCIAL_TAX_RATE;

  return {
    grossSalary,
    incomeTax,
    pensionContribution,
    netSalary,
    employerSocialTax,
    employerTotalCost: grossSalary + employerSocialTax,
  };
}

export function calculateFromNet(
  netSalary: number,
  regime: SalaryRegime
): SalaryBreakdown | null {
  if (!Number.isFinite(netSalary) || netSalary <= 0) {
    return null;
  }

  const incomeTaxRate = getIncomeTaxRate(regime);
  const netMultiplier = 1 - incomeTaxRate - PENSION_CONTRIBUTION_RATE;
  const grossSalary = netSalary / netMultiplier;

  return calculateFromGross(grossSalary, regime);
}
