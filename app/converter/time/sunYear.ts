// Türkiye için yıllık güneş hesapları: gün gün doğuş/batış, en erken batış, günlerin uzaması.
// Türkiye 2016'dan beri yıl boyu UTC+3 kullanır; saatler bu sabit farkla verilir.
import { trDative, trLocative } from "../turkishSuffix";
import { seasons, sunTimes } from "./solar";

export const TR_OFFSET_MIN = 180;

/** Türkiye saatiyle günün dakikası (0–1439). */
export const trMinutes = (d: Date) => (((Math.floor(d.getTime() / 60000) + TR_OFFSET_MIN) % 1440) + 1440) % 1440;

/** "06:42" biçimi; saniyeler en yakın dakikaya yuvarlanır. */
export function trClock(d: Date) {
  const m = Math.round(d.getTime() / 60000) + TR_OFFSET_MIN;
  const day = ((m % 1440) + 1440) % 1440;
  return `${String(Math.floor(day / 60)).padStart(2, "0")}:${String(day % 60).padStart(2, "0")}`;
}

/** Türkiye saatine göre tarih parçaları. */
export function trDateParts(d: Date) {
  const t = new Date(d.getTime() + TR_OFFSET_MIN * 60000);
  return { year: t.getUTCFullYear(), month: t.getUTCMonth() + 1, day: t.getUTCDate() };
}

export type SunDay = { month: number; day: number; sunrise: Date; sunset: Date; noon: Date; dayLength: number };

const daysInYear = (y: number) => (y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0) ? 366 : 365);

/** Yılın her günü için doğuş, batış, öğle ve gün uzunluğu (dakika). Türkiye enlemlerinde kutup günü yoktur. */
export function sunYear(year: number, lat: number, lon: number): SunDay[] {
  const out: SunDay[] = [];
  for (let i = 0; i < daysInYear(year); i++) {
    const dt = new Date(Date.UTC(year, 0, 1 + i));
    const month = dt.getUTCMonth() + 1;
    const day = dt.getUTCDate();
    const s = sunTimes(year, month, day, lat, lon);
    if (s.kind !== "normal") continue;
    out.push({ month, day, sunrise: s.sunrise, sunset: s.sunset, noon: s.solarNoon, dayLength: (s.sunset.getTime() - s.sunrise.getTime()) / 60000 });
  }
  return out;
}

const pick = (days: SunDay[], score: (d: SunDay) => number, max: boolean) =>
  days.reduce((best, d) => ((max ? score(d) > score(best) : score(d) < score(best)) ? d : best), days[0]);

/** En uzun/kısa gün, en erken/geç doğuş ve batış (Türkiye saatiyle, saniye hassasiyetinde). */
export function sunExtremes(year: number, lat: number, lon: number) {
  const days = sunYear(year, lat, lon);
  const sec = (d: Date) => ((((d.getTime() / 1000 + TR_OFFSET_MIN * 60) % 86400) + 86400) % 86400);
  return {
    longest: pick(days, (d) => d.dayLength, true),
    shortest: pick(days, (d) => d.dayLength, false),
    earliestSunrise: pick(days, (d) => sec(d.sunrise), false),
    latestSunrise: pick(days, (d) => sec(d.sunrise), true),
    earliestSunset: pick(days, (d) => sec(d.sunset), false),
    latestSunset: pick(days, (d) => sec(d.sunset), true),
  };
}

/**
 * Aralık gündönümünden sonra güneşin Türkiye saatiyle ilk kez `hour:minute` ve sonrasında battığı gün.
 * Örn. 18:00 → "akşam altıdan sonra ilk ne zaman kararır". Bulunamazsa null.
 */
export function firstSunsetAtOrAfter(year: number, lat: number, lon: number, hour: number, minute = 0) {
  const target = hour * 60 + minute;
  for (let i = 0; i < 200; i++) {
    const dt = new Date(Date.UTC(year, 0, 1 + i));
    const s = sunTimes(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate(), lat, lon);
    if (s.kind === "normal" && trMinutes(s.sunset) >= target) return { month: dt.getUTCMonth() + 1, day: dt.getUTCDate(), sunset: s.sunset };
  }
  return null;
}

/** Türkiye saatiyle gündönümü ve ekinoks anları. */
export function trSeasons(year: number) {
  const s = seasons(year);
  return [
    { key: "march" as const, label: "Mart ekinoksu (ilkbahar)", date: s.march },
    { key: "june" as const, label: "Haziran gündönümü (yaz)", date: s.june },
    { key: "september" as const, label: "Eylül ekinoksu (sonbahar)", date: s.september },
    { key: "december" as const, label: "Aralık gündönümü (kış)", date: s.december },
  ];
}

const AYLAR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
export const ayAdi = (m: number) => AYLAR[m - 1];
export const trDayLabel = (month: number, day: number) => `${day} ${AYLAR[month - 1]}`;

/** Gün uzunluğu "14 sa 52 dk" biçiminde. */
export const durationLabel = (minutes: number) => {
  const m = Math.round(minutes);
  return `${Math.floor(m / 60)} sa ${m % 60} dk`;
};

/** Saate bulunma eki: "05:20'de", "17:40'ta"; tam saatlerde saat okunur ("06:00'da"). */
export function atClock(d: Date) {
  return withSuffix(trClock(d), trLocative);
}

/** Saate yönelme eki: "05:20'ye", "17:40'a". */
export function toClock(d: Date) {
  return withSuffix(trClock(d), trDative);
}

function withSuffix(clock: string, fn: (v: number) => string) {
  const mm = Number(clock.slice(3));
  const key = mm === 0 ? Number(clock.slice(0, 2)) : mm;
  return clock + fn(key).slice(String(key).length);
}
