import type { Locale } from "./config";
import { buildLanguageAlternates } from "./routing";

// Zaman araclari (alarm, zamanlayici, kronometre): diller hreflang ile baglanir.
export type TimeToolId = "clock" | "worldClock" | "timeZoneConverter" | "countdown" | "alarm" | "timer" | "stopwatch" | "pomodoro" | "interval";

export const timeToolPaths: Record<TimeToolId, Partial<Record<Locale, string>>> = {
  clock: { tr: "/online-saat", en: "/en/online-clock" },
  worldClock: { tr: "/dunya-saatleri", en: "/en/world-clock" },
  countdown: { tr: "/geri-sayim", en: "/en/countdown" },
  timeZoneConverter: { tr: "/saat-dilimi-cevirici", en: "/en/time-zone-converter" },
  alarm: { tr: "/online-alarm-kur", en: "/en/alarm-clock" },
  timer: { tr: "/zamanlayici", en: "/en/timer" },
  stopwatch: { tr: "/kronometre", en: "/en/stopwatch" },
  pomodoro: { tr: "/pomodoro", en: "/en/pomodoro-timer" },
  interval: { tr: "/tabata-zamanlayici", en: "/en/interval-timer" },
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

export function formatEnglishTime(time: string) {
  return alarmPresetSlug.en(time).replace(/-(\d\d)-/, ":$1 ").replace(/-(am|pm)$/, " $1").replace(/ (am|pm)$/, (s) => s.toUpperCase());
}

export function alarmPresetAlternates(time: string) {
  return buildLanguageAlternates(
    {
      tr: `/online-alarm-kur/${alarmPresetSlug.tr(time)}`,
      en: `/en/alarm-clock/${alarmPresetSlug.en(time)}`,
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
