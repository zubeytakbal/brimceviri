import type { Locale } from "./config";
import { buildLanguageAlternates } from "./routing";

// Zaman araclari (alarm, zamanlayici, kronometre): diller hreflang ile baglanir.
export type TimeToolId = "clock" | "worldClock" | "countdown" | "alarm" | "timer" | "stopwatch";

export const timeToolPaths: Record<TimeToolId, Partial<Record<Locale, string>>> = {
  clock: { tr: "/online-saat", en: "/en/online-clock" },
  worldClock: { tr: "/dunya-saatleri", en: "/en/world-clock" },
  countdown: { tr: "/geri-sayim", en: "/en/countdown" },
  alarm: { tr: "/online-alarm-kur", en: "/en/alarm-clock" },
  timer: { tr: "/zamanlayici", en: "/en/timer" },
  stopwatch: { tr: "/kronometre", en: "/en/stopwatch" },
};

export function timeToolAlternates(tool: TimeToolId) {
  return buildLanguageAlternates(timeToolPaths[tool], "tr");
}

// Hazir sure sayfalari: en cok aranan zamanlayici sureleri (dakika).
export const timerPresetMinutes = [1, 2, 3, 5, 10, 15, 20, 25, 30, 45, 60] as const;

export const timerPresetSlug = {
  tr: (minutes: number) => `${minutes}-dakika`,
  en: (minutes: number) => (minutes === 1 ? "1-minute" : `${minutes}-minutes`),
};

export function parseTimerPresetSlug(slug: string): number | null {
  const match = /^(\d+)-(dakika|minutes?)$/.exec(slug);
  if (!match) return null;
  const minutes = Number(match[1]);
  return (timerPresetMinutes as readonly number[]).includes(minutes) ? minutes : null;
}

export function timerPresetAlternates(minutes: number) {
  return buildLanguageAlternates(
    {
      tr: `/zamanlayici/${timerPresetSlug.tr(minutes)}`,
      en: `/en/timer/${timerPresetSlug.en(minutes)}`,
    },
    "tr",
  );
}

// Hazir alarm saatleri (24 saat, "HH:MM").
export const alarmPresetTimes = ["05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00"] as const;

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
