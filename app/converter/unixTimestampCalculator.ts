export type TimestampUnit = "seconds" | "milliseconds";

// Turkey has used a fixed UTC+3 offset (no DST) since 2016, so this can be
// a constant rather than something derived from Intl/timezone data.
const ISTANBUL_UTC_OFFSET_MINUTES = 180;

const turkishWeekdays = [
  "Pazar",
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
];

export function timestampToDate(
  value: number,
  unit: TimestampUnit
): Date | null {
  if (!Number.isFinite(value)) {
    return null;
  }

  const ms = unit === "seconds" ? value * 1000 : value;
  const date = new Date(ms);

  return Number.isNaN(date.getTime()) ? null : date;
}

export function istanbulDateTimeToTimestamp(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number
): { seconds: number; milliseconds: number } | null {
  const utcMs =
    Date.UTC(year, month - 1, day, hour, minute, 0) -
    ISTANBUL_UTC_OFFSET_MINUTES * 60 * 1000;

  if (Number.isNaN(utcMs)) {
    return null;
  }

  return { seconds: Math.floor(utcMs / 1000), milliseconds: utcMs };
}

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

export function formatIstanbulDateTime(date: Date): string {
  const istanbulMs = date.getTime() + ISTANBUL_UTC_OFFSET_MINUTES * 60 * 1000;
  const shifted = new Date(istanbulMs);

  return `${shifted.getUTCFullYear()}-${pad(shifted.getUTCMonth() + 1)}-${pad(
    shifted.getUTCDate()
  )} ${pad(shifted.getUTCHours())}:${pad(shifted.getUTCMinutes())}:${pad(
    shifted.getUTCSeconds()
  )}`;
}

export function formatUtcDateTime(date: Date): string {
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(
    date.getUTCDate()
  )} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(
    date.getUTCSeconds()
  )}`;
}

export function getIstanbulWeekday(date: Date): string {
  const istanbulMs = date.getTime() + ISTANBUL_UTC_OFFSET_MINUTES * 60 * 1000;
  const shifted = new Date(istanbulMs);

  return turkishWeekdays[shifted.getUTCDay()];
}
