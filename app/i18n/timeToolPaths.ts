import type { Locale } from "./config";
import { buildLanguageAlternates } from "./routing";

// Zaman araclari (alarm, zamanlayici, kronometre): diller hreflang ile baglanir.
export type TimeToolId = "clock" | "worldClock" | "timeZoneConverter" | "countdown" | "alarm" | "timer" | "stopwatch" | "pomodoro" | "interval" | "dateDiff" | "businessDays" | "dateAdd" | "weekNumber";

export const timeToolPaths: Record<TimeToolId, Partial<Record<Locale, string>>> = {
  clock: { tr: "/online-saat", en: "/en/online-clock", de: "/de/online-uhr", sv: "/sv/klocka", no: "/no/klokka", da: "/da/klokken" },
  worldClock: { tr: "/dunya-saatleri", en: "/en/world-clock", de: "/de/weltuhr", sv: "/sv/varldsklocka", no: "/no/verdensklokke", da: "/da/verdensur" },
  countdown: { tr: "/geri-sayim", en: "/en/countdown", de: "/de/countdown" },
  timeZoneConverter: { tr: "/saat-dilimi-cevirici", en: "/en/time-zone-converter", de: "/de/zeitzonenrechner" },
  alarm: { tr: "/online-alarm-kur", en: "/en/alarm-clock", de: "/de/wecker", sv: "/sv/vackarklocka", no: "/no/vekkerklokke", da: "/da/vaekkeur" },
  timer: { tr: "/zamanlayici", en: "/en/timer", de: "/de/timer", sv: "/sv/timer", no: "/no/timer", da: "/da/timer" },
  stopwatch: { tr: "/kronometre", en: "/en/stopwatch", de: "/de/stoppuhr", sv: "/sv/stoppur", no: "/no/stoppeklokke", da: "/da/stopur" },
  pomodoro: { tr: "/pomodoro", en: "/en/pomodoro-timer", de: "/de/pomodoro-timer", sv: "/sv/pomodoro", no: "/no/pomodoro", da: "/da/pomodoro" },
  interval: { tr: "/tabata-zamanlayici", en: "/en/interval-timer", de: "/de/intervall-timer", sv: "/sv/intervalltimer", no: "/no/intervalltimer", da: "/da/intervaltimer" },
  dateDiff: { tr: "/iki-tarih-arasi-gun-hesaplama", en: "/en/days-between-dates", de: "/de/tagerechner", sv: "/sv/dagar-mellan-datum", no: "/no/dager-mellom-datoer", da: "/da/dage-mellem-datoer" },
  businessDays: { tr: "/is-gunu-hesaplama", en: "/en/business-day-calculator", de: "/de/arbeitstage-rechner" },
  dateAdd: { tr: "/tarihe-gun-ekleme", en: "/en/date-calculator" },
  weekNumber: { tr: "/kacinci-hafta", en: "/en/week-number", de: "/de/kalenderwoche", sv: "/sv/veckonummer", no: "/no/ukenummer", da: "/da/ugenummer" },
};

export function timeToolAlternates(tool: TimeToolId) {
  return buildLanguageAlternates(timeToolPaths[tool], "tr");
}

// Hazir alarm saatleri (24 saat, "HH:MM").
export const alarmPresetTimes = ["04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "11:00", "12:00"] as const;

export const alarmPresetSlug = {
  tr: (time: string) => time.replace(":", "-"),
  en: (time: string) => {
    const [h, m] = time.split(":").map(Number);
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    const suffix = h < 12 ? "am" : "pm";
    return m === 0 ? `${hour12}-${suffix}` : `${hour12}-${String(m).padStart(2, "0")}-${suffix}`;
  },
};

/** Deutscher URL-Teil einer Weckzeit: "06:30" → "6-30". */
export const alarmSlugDe = (time: string) => {
  const [h, m] = time.split(":");
  return `${Number(h)}-${m}`;
};

export function formatEnglishTime(time: string) {
  return alarmPresetSlug.en(time).replace(/-(\d\d)-/, ":$1 ").replace(/-(am|pm)$/, " $1").replace(/ (am|pm)$/, (s) => s.toUpperCase());
}

export function alarmPresetAlternates(time: string) {
  return buildLanguageAlternates(
    {
      tr: `/online-alarm-kur/${alarmPresetSlug.tr(time)}`,
      en: `/en/alarm-clock/${alarmPresetSlug.en(time)}`,
      de: `/de/wecker/${alarmSlugDe(time)}`,
    },
    "tr",
  );
}

// Saatin okunusuna gore bulunma eki: 05:00'te (bes), 07:00'de (yedi), 09:00'da (dokuz), 07:30'da (otuz).
const HOUR_LOCATIVE: Record<number, string> = {
  0: "da",
  1: "de",
  2: "de",
  3: "te",
  4: "te",
  5: "te",
  6: "da",
  7: "de",
  8: "de",
  9: "da",
  10: "da",
  11: "de",
  12: "de",
};

export function trTimeLocative(time: string) {
  const [h, m] = time.split(":").map(Number);
  if (m === 0) return `${time}'${HOUR_LOCATIVE[h % 12 === 0 && h !== 0 ? 12 : h % 12]}`;
  // Dakika okunusunun son kelimesi: on/yirmi/otuz/kirk/elli ve birler.
  const tens: Record<number, string> = { 1: "da", 2: "de", 3: "da", 4: "ta", 5: "de" };
  const ones: Record<number, string> = { 1: "de", 2: "de", 3: "te", 4: "te", 5: "te", 6: "da", 7: "de", 8: "de", 9: "da" };
  return `${time}'${m % 10 === 0 ? tens[m / 10] : ones[m % 10]}`;
}
