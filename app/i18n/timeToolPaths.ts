import type { Locale } from "./config";
import { buildLanguageAlternates } from "./routing";

// Tarih ve saat hesaplayicilari: diller hreflang ile baglanir.
export type TimeToolId = "timeZoneConverter" | "dateDiff" | "businessDays" | "dateAdd" | "weekNumber";

export const timeToolPaths: Record<TimeToolId, Partial<Record<Locale, string>>> = {
  timeZoneConverter: { tr: "/saat-dilimi-cevirici", en: "/en/time-zone-converter", de: "/de/zeitzonenrechner", sv: "/sv/tidsskillnad", no: "/no/tidsforskjell", da: "/da/tidsforskel" },
  dateDiff: { tr: "/iki-tarih-arasi-gun-hesaplama", en: "/en/days-between-dates", de: "/de/tagerechner", sv: "/sv/dagar-mellan-datum", no: "/no/dager-mellom-datoer", da: "/da/dage-mellem-datoer" },
  businessDays: { tr: "/is-gunu-hesaplama", en: "/en/business-day-calculator", de: "/de/arbeitstage-rechner" },
  dateAdd: { tr: "/tarihe-gun-ekleme", en: "/en/date-calculator" },
  weekNumber: { tr: "/kacinci-hafta", en: "/en/week-number", de: "/de/kalenderwoche", sv: "/sv/veckonummer", no: "/no/ukenummer", da: "/da/ugenummer" },
};

export function timeToolAlternates(tool: TimeToolId) {
  return buildLanguageAlternates(timeToolPaths[tool], "tr");
}
