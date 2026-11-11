import type { Locale } from "./config";
import { buildLanguageAlternates } from "./routing";

// Uyku hesaplayici sayfalari: tum diller birbirine hreflang ile baglanir.
export const sleepGuidePaths: Partial<Record<Locale, string>> = {
  tr: "/uyku-hesaplama",
  en: "/en/sleep-calculator",
  de: "/de/schlafrechner",
  ar: "/ar/sleep-calculator",
  bn: "/bn/sleep-calculator",
  fr: "/fr/calculateur-de-sommeil",
  es: "/es/calculadora-de-sueno",
  pt: "/pt/calculadora-de-sono",
  it: "/it/calcolatore-del-sonno",
  nl: "/nl/slaapcalculator",
};

export function sleepGuideAlternates() {
  return buildLanguageAlternates(sleepGuidePaths, "tr");
}
