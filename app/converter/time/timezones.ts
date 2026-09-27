// Saat dilimi yardimcilari: Intl (IANA tz veritabani) uzerinden UTC farki,
// yaz saati durumu ve bir yildaki saat degisikligi anlari.

const offsetFormatters = new Map<string, Intl.DateTimeFormat>();

function offsetFormatter(timeZone: string) {
  let formatter = offsetFormatters.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "longOffset" });
    offsetFormatters.set(timeZone, formatter);
  }
  return formatter;
}

/** Verilen andaki UTC farki (dakika). Ornek: Istanbul = 180, New York (yaz) = -240. */
export function offsetMinutes(timeZone: string, date: Date) {
  const part = offsetFormatter(timeZone)
    .formatToParts(date)
    .find((p) => p.type === "timeZoneName")?.value;
  const match = /GMT([+-])(\d{2}):(\d{2})/.exec(part ?? "");
  if (!match) return 0;
  const minutes = Number(match[2]) * 60 + Number(match[3]);
  return match[1] === "-" ? -minutes : minutes;
}

/** "UTC+3", "UTC−4", "UTC+5:30" */
export function formatUtcOffset(minutes: number) {
  if (minutes === 0) return "UTC";
  const sign = minutes > 0 ? "+" : "−";
  const abs = Math.abs(minutes);
  const hours = Math.floor(abs / 60);
  const rest = abs % 60;
  return `UTC${sign}${hours}${rest ? `:${String(rest).padStart(2, "0")}` : ""}`;
}

/** Iki saat dilimi arasindaki fark (dakika): b - a. */
export function differenceMinutes(fromZone: string, toZone: string, date: Date) {
  return offsetMinutes(toZone, date) - offsetMinutes(fromZone, date);
}

/** Yil icindeki standart (kis) farki: Ocak ve Temmuz farklarinin kucugu. */
export function standardOffset(timeZone: string, year: number) {
  return Math.min(offsetMinutes(timeZone, new Date(Date.UTC(year, 0, 15))), offsetMinutes(timeZone, new Date(Date.UTC(year, 6, 15))));
}

export function observesDst(timeZone: string, year: number) {
  return offsetMinutes(timeZone, new Date(Date.UTC(year, 0, 15))) !== offsetMinutes(timeZone, new Date(Date.UTC(year, 6, 15)));
}

export function isDst(timeZone: string, date: Date) {
  return offsetMinutes(timeZone, date) > standardOffset(timeZone, date.getUTCFullYear());
}

export type OffsetTransition = { at: Date; fromMinutes: number; toMinutes: number };

/** Verilen tarihten sonraki saat degisikligi (en fazla ~13 ay ileri bakar). */
export function nextTransition(timeZone: string, from: Date): OffsetTransition | null {
  const hour = 3600000;
  let previous = offsetMinutes(timeZone, from);
  let cursor = from.getTime();
  // Gun gun ilerle, degisim bulununca saat saat daralt.
  for (let day = 0; day < 400; day += 1) {
    const next = cursor + 24 * hour;
    const offset = offsetMinutes(timeZone, new Date(next));
    if (offset !== previous) {
      let low = cursor;
      let high = next;
      while (high - low > 60000) {
        const mid = Math.floor((low + high) / 2);
        if (offsetMinutes(timeZone, new Date(mid)) === previous) low = mid;
        else high = mid;
      }
      // Degisimler tam dakikada olur: low'dan sonraki ilk dakika siniri.
      let at = Math.ceil((low + 1) / 60000) * 60000;
      if (offsetMinutes(timeZone, new Date(at)) === previous) at += 60000;
      return { at: new Date(at), fromMinutes: previous, toMinutes: offset };
    }
    cursor = next;
    previous = offset;
  }
  return null;
}

/** Saat dilimi adi, dile gore: "Kuzey Amerika Doğu Yaz Saati" / "Eastern Daylight Time". */
export function timeZoneLongName(timeZone: string, locale: string, date: Date) {
  return (
    new Intl.DateTimeFormat(locale, { timeZone, timeZoneName: "long" }).formatToParts(date).find((p) => p.type === "timeZoneName")?.value ??
    timeZone
  );
}

export function formatInZone(date: Date, timeZone: string, locale: string, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(locale, { timeZone, ...options }).format(date);
}

/** Saat dilimindeki yerel tarih parcasi (yil/ay/gun) — gun dogumu hesabi icin. */
export function localDateParts(timeZone: string, date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(date);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return { year: get("year"), month: get("month"), day: get("day") };
}
