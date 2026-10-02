"use client";

import AnalogClock from "../time/AnalogClock";
import { useNow } from "../time/useNow";
import { WORLD_LOCALE, wallClockDate, zoneOffsetMinutes, type WorldLang } from "./useSecondNow";

const HOUR_SHORT: Record<WorldLang, string> = { tr: "sa", en: "h", de: "Std.", sv: "tim", no: "t", da: "t." };

export type CityClockCopy = {
  localCaption: string;
  yourTime: string;
  sameAsYou: string;
  ahead: string;
  behind: string;
};

// Sehir sayfasinin ust kismi: o sehrin canli analog + dijital saati ve ziyaretcinin
// kendi saatine gore farki (farki tarayici hesaplar).
export default function CityLiveClock({
  timeZone,
  lang,
  cityName,
  copy,
}: {
  timeZone: string;
  lang: WorldLang;
  cityName: string;
  copy: CityClockCopy;
}) {
  const now = useNow();
  const locale = WORLD_LOCALE[lang];
  const wall = now ? wallClockDate(now, timeZone) : null;
  const time = now
    ? new Intl.DateTimeFormat(locale, { timeZone, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: lang === "en" }).format(now)
    : "--:--:--";
  const date = now ? new Intl.DateTimeFormat(locale, { timeZone, weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(now) : " ";
  const diff = now ? zoneOffsetMinutes(timeZone, now) + now.getTimezoneOffset() : 0;
  const abs = Math.abs(diff);
  const amount = `${Math.floor(abs / 60)}${abs % 60 ? `:${String(abs % 60).padStart(2, "0")}` : ""} ${HOUR_SHORT[lang]}`;
  const diffText = diff === 0 ? copy.sameAsYou : `${amount} ${diff > 0 ? copy.ahead : copy.behind}`;

  return (
    <div className="time-tool">
      <div className="time-tool-hero city-clock-hero">
        <AnalogClock date={wall} size={230} label={`${cityName} ${time}`} allNumbers />
        <div className="time-tool-digital" aria-live="off">
          <span className="time-tool-caption">{copy.localCaption}</span>
          <strong>{time}</strong>
          <span className="city-clock-date">{date}</span>
          {now && (
            <span className="time-tool-next">
              {copy.yourTime}: {diffText}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
