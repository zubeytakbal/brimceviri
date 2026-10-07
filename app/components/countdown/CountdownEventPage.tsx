import { daysUntil, hasStarted, upcomingOccurrences, type CountdownEvent, type DateParts } from "../../converter/time/countdownEvents";

// Geri sayım sayfalarının ortak tarih yardımcıları (TR, EN, DE). Tarihler her yenilemede
// yeniden hesaplanır; bu yıl geçince otomatik olarak bir sonraki yıla geçer.

export function formatEventDate(parts: DateParts, lang: "tr" | "en" | "de", withWeekday = true) {
  return new Intl.DateTimeFormat(lang === "tr" ? "tr-TR" : lang === "de" ? "de-DE" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...(withWeekday ? { weekday: "long" as const } : {}),
    timeZone: "UTC",
  }).format(new Date(Date.UTC(parts.year, parts.month - 1, parts.day)));
}

export function eventSummary(event: CountdownEvent, now: Date) {
  const next = upcomingOccurrences(event, now, 1)[0] ?? null;
  return { next, days: next ? daysUntil(next, event.zone, now) : null, started: next ? hasStarted(next, event.zone, now) : false };
}

