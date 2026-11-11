import type { Locale } from "./config";
import { buildLanguageAlternates } from "./routing";

// Uyku hesaplayici sayfalari: tum diller birbirine hreflang ile baglanir.
export const sleepGuidePaths: Partial<Record<Locale, string>> = {
  tr: "/uyku-hesaplama",
  en: "/en/sleep-calculator",
  de: "/de/schlafrechner",
};

export function sleepGuideAlternates() {
  return buildLanguageAlternates(sleepGuidePaths, "tr");
}
