"use client";

import { useSecondNow } from "../world/useSecondNow";

export type CountdownTarget = { year: number; month: number; day: number; hour?: number; minute?: number };

export type CountdownCopy = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  today: string;
  until: string;
};

/** istanbul: Turkiye saati (UTC+3, yaz saati yok); local: ziyaretcinin saat dilimi. */
export function targetMs(target: CountdownTarget, zone: "istanbul" | "local") {
  const h = target.hour ?? 0;
  const m = target.minute ?? 0;
  if (zone === "istanbul") return Date.UTC(target.year, target.month - 1, target.day, h, m) - 3 * 3600000;
  return new Date(target.year, target.month - 1, target.day, h, m).getTime();
}

// Canli geri sayim. Hedef gun gelince "bugun" gosterir; gun bitince listedeki bir
// sonraki tarihe kendiliginden gecer (sayfa yenilenmeden yil degisir).
export default function CountdownDisplay({
  targets,
  zone,
  lang,
  title,
  copy,
  compact = false,
}: {
  targets: CountdownTarget[];
  zone: "istanbul" | "local";
  lang: "tr" | "en";
  title: string;
  copy: CountdownCopy;
  compact?: boolean;
}) {
  const now = useSecondNow();
  const current = now ? targets.find((t) => targetMs(t, zone) + (t.hour === undefined ? 86400000 : 60000) > now.getTime()) ?? null : targets[0] ?? null;
  const locale = lang === "tr" ? "tr-TR" : "en-US";

  if (!current) return null;
  const target = targetMs(current, zone);
  const remaining = now ? Math.max(0, target - now.getTime()) : 0;
  const isToday = now !== null && remaining === 0;
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  const dateLabel = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    ...(current.hour !== undefined ? { hour: "2-digit", minute: "2-digit" } : {}),
    timeZone: zone === "istanbul" ? "Europe/Istanbul" : undefined,
  }).format(new Date(target));

  const tiles: Array<[number, string]> = [
    [days, copy.days],
    [hours, copy.hours],
    [minutes, copy.minutes],
    [seconds, copy.seconds],
  ];

  return (
    <div className={`countdown-card${compact ? " is-compact" : ""}${isToday ? " is-today" : ""}`}>
      {!compact && <p className="countdown-title">{title}</p>}
      {isToday ? (
        <p className="countdown-today">🎉 {copy.today}</p>
      ) : (
        <div className="countdown-tiles" role="timer" aria-live="off" aria-label={`${days} ${copy.days}, ${hours} ${copy.hours}`}>
          {tiles.map(([value, label]) => (
            <span key={label} className="countdown-tile">
              <strong>{now ? String(value).padStart(label === copy.days ? 1 : 2, "0") : "–"}</strong>
              <small>{label}</small>
            </span>
          ))}
        </div>
      )}
      <p className="countdown-date">
        {copy.until}: {dateLabel}
      </p>
    </div>
  );
}
