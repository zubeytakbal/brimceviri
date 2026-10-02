"use client";

import { useEffect, useState } from "react";

// Saniyede bir guncellenen zaman (cok sayida saat gosteren panolar icin; rAF'den hafif).
// Sunucuda null doner, hidrasyon uyumlu.
export function useSecondNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    let timer = 0;
    const tick = () => {
      setNow(new Date());
      timer = window.setTimeout(tick, 1000 - (Date.now() % 1000) + 5);
    };
    const frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);
  return now;
}

export function zoneOffsetMinutes(timeZone: string, date: Date) {
  const part = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "longOffset" })
    .formatToParts(date)
    .find((p) => p.type === "timeZoneName")?.value;
  const match = /GMT([+-])(\d{2}):(\d{2})/.exec(part ?? "");
  if (!match) return 0;
  const minutes = Number(match[2]) * 60 + Number(match[3]);
  return match[1] === "-" ? -minutes : minutes;
}

/** Saat dilimindeki duvar saatini tasiyan Date (getHours() o bolgenin saatini verir). */
export function wallClockDate(now: Date, timeZone: string) {
  const localOffset = -now.getTimezoneOffset();
  return new Date(now.getTime() + (zoneOffsetMinutes(timeZone, now) - localOffset) * 60000);
}

export type WorldLang = "tr" | "en" | "de" | "sv" | "no" | "da";

/** Saat ve tarih biçimi için Intl dili. */
export const WORLD_LOCALE: Record<WorldLang, string> = { tr: "tr-TR", en: "en-US", de: "de-DE", sv: "sv-SE", no: "nb-NO", da: "da-DK" };

const SAME_TIME: Record<WorldLang, string> = { tr: "aynı saat", en: "same time", de: "gleiche Zeit", sv: "samma tid", no: "samme tid", da: "samme tid" };
const HOUR_UNIT: Record<WorldLang, string> = { tr: "sa", en: "h", de: "Std.", sv: "tim", no: "t", da: "t." };

export function shortDifference(minutes: number, lang: WorldLang) {
  if (minutes === 0) return SAME_TIME[lang];
  const sign = minutes > 0 ? "+" : "−";
  const abs = Math.abs(minutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  const unit = HOUR_UNIT[lang];
  return `${sign}${h}${m ? `:${String(m).padStart(2, "0")}` : ""} ${unit}`;
}
