// Uzbekistan has used a fixed UTC+5 offset (no DST) since 1994, so this can
// be a constant rather than something derived from Intl/timezone data.
const TASHKENT_UTC_OFFSET_MINUTES = 300;

const uzbekWeekdays = [
  "Yakshanba",
  "Dushanba",
  "Seshanba",
  "Chorshanba",
  "Payshanba",
  "Juma",
  "Shanba",
];

export function tashkentDateTimeToTimestamp(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number
): { seconds: number; milliseconds: number } | null {
  const utcMs =
    Date.UTC(year, month - 1, day, hour, minute, 0) -
    TASHKENT_UTC_OFFSET_MINUTES * 60 * 1000;

  if (Number.isNaN(utcMs)) {
    return null;
  }

  return { seconds: Math.floor(utcMs / 1000), milliseconds: utcMs };
}

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

export function formatTashkentDateTime(date: Date): string {
  const tashkentMs = date.getTime() + TASHKENT_UTC_OFFSET_MINUTES * 60 * 1000;
  const shifted = new Date(tashkentMs);

  return `${shifted.getUTCFullYear()}-${pad(shifted.getUTCMonth() + 1)}-${pad(
    shifted.getUTCDate()
  )} ${pad(shifted.getUTCHours())}:${pad(shifted.getUTCMinutes())}:${pad(
    shifted.getUTCSeconds()
  )}`;
}

export function formatUtcDateTimeUz(date: Date): string {
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(
    date.getUTCDate()
  )} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(
    date.getUTCSeconds()
  )}`;
}

export function getTashkentWeekday(date: Date): string {
  const tashkentMs = date.getTime() + TASHKENT_UTC_OFFSET_MINUTES * 60 * 1000;
  const shifted = new Date(tashkentMs);

  return uzbekWeekdays[shifted.getUTCDay()];
}
