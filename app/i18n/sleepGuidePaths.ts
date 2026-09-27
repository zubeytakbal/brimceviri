import type { Locale } from "./config";
import { buildLanguageAlternates } from "./routing";

// Uyku hesaplayici sayfalari: tum diller birbirine hreflang ile baglanir.
export const sleepGuidePaths: Partial<Record<Locale, string>> = {
  tr: "/uyku-hesaplama",
  en: "/en/sleep-calculator",
  de: "/de/schlafrechner",
  ar: "/ar/sleep-calculator",
  uz: "/uz/uyqu-hisoblash",
  bn: "/bn/sleep-calculator",
  fr: "/fr/calculateur-de-sommeil",
  es: "/es/calculadora-de-sueno",
  "es-419": "/es-419/calculadora-de-sueno",
  pt: "/pt/calculadora-de-sono",
  it: "/it/calcolatore-del-sonno",
  nl: "/nl/slaapcalculator",
  sv: "/sv/somnkalkylator",
  no: "/no/sovnkalkulator",
  da: "/da/sovnberegner",
};

export function sleepGuideAlternates() {
  return buildLanguageAlternates(sleepGuidePaths, "tr");
}
