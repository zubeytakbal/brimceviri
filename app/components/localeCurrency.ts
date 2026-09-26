import type { Locale } from "../i18n/config";

// Her dil surumunun hitap ettigi ulkede kullanilan para birimi (tutar ve
// fiyat alanlarinda gosterilir). Arapca birden fazla ulkeye hitap ettigi
// icin bos birakildi; Latin Amerika icin genel "$" isareti kullanildi.
export const currencyByLocale: Record<Locale, string> = {
  tr: "TL",
  en: "EUR",
  de: "EUR",
  fr: "EUR",
  es: "EUR",
  "es-419": "$",
  pt: "R$",
  it: "EUR",
  nl: "EUR",
  sv: "kr",
  no: "kr",
  da: "kr.",
  ar: "",
  uz: "so'm",
  bn: "৳",
  ru: "EUR",
};

export function formatWithCurrency(formattedNumber: string, locale: Locale) {
  const currency = currencyByLocale[locale];
  return currency ? `${formattedNumber} ${currency}` : formattedNumber;
}
