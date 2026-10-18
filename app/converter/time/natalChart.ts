// Doğum anına göre Güneş, Ay ve yükselen burç (tropikal zodyak). Hesap tamamen astronomiktir:
// - Yerel saat → UTC: IANA saat dilimi veritabanı (tarayıcının Intl'i; Türkiye'nin 2016 öncesi yaz/kış saati dahil).
// - Güneş boylamı: Meeus bölüm 25 düşük hassasiyet (~0,01°). Ay: moonPosition.ts (Meeus bölüm 47).
// - Yükselen (ASC): doğu ufkunun ekliptiği kestiği nokta, yerel yıldız zamanından (Meeus bölüm 12) hesaplanır.
import { moonPosition, signIndex } from "./moonPosition";

const rad = Math.PI / 180;
const DAY = 86400000;
const norm = (d: number) => ((d % 360) + 360) % 360;

/** Saat dilimindeki yerel saati UTC'ye çevirir. Yaz saati geçişindeki atlanan/tekrar eden saatlerde ilk uyan karşılık döner. */
export function localToUtc(y: number, m: number, d: number, hour: number, minute: number, timeZone = "Europe/Istanbul"): Date {
  const wall = Date.UTC(y, m - 1, d, hour, minute);
  const fmt = new Intl.DateTimeFormat("en-US", { timeZone, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
  const offsetAt = (t: number) => {
    const p = Object.fromEntries(fmt.formatToParts(new Date(t)).map((x) => [x.type, x.value]));
    return Date.UTC(Number(p.year), Number(p.month) - 1, Number(p.day), Number(p.hour), Number(p.minute)) - Math.floor(t / 60000) * 60000;
  };
  let t = wall - offsetAt(wall);
  t = wall - offsetAt(t);
  return new Date(t);
}

const julian = (date: Date) => date.getTime() / DAY + 2440587.5;

/** Güneş'in görünür ekliptik boylamı (derece). */
export function sunLongitude(date: Date) {
  const T = (julian(date) - 2451545) / 36525;
  const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  const M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
  const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M * rad) + (0.019993 - 0.000101 * T) * Math.sin(2 * M * rad) + 0.000289 * Math.sin(3 * M * rad);
  const omega = 125.04 - 1934.136 * T;
  return norm(L0 + C - 0.00569 - 0.00478 * Math.sin(omega * rad));
}

/** Ekliptiğin eğikliği (derece, ortalama). */
const obliquity = (date: Date) => 23.4392911 - 0.0130042 * ((julian(date) - 2451545) / 36525);

/** Yerel yıldız zamanı (derece). */
export function localSiderealTime(date: Date, lon: number) {
  const jd = julian(date);
  const T = (jd - 2451545) / 36525;
  return norm(280.46061837 + 360.98564736629 * (jd - 2451545) + 0.000387933 * T * T - (T * T * T) / 38710000 + lon);
}

/** Yükselen (ASC) ve gökyüzü ortası (MC) ekliptik boylamları. */
export function angles(date: Date, lat: number, lon: number) {
  const ramc = localSiderealTime(date, lon) * rad;
  const eps = obliquity(date) * rad;
  const asc = norm(Math.atan2(Math.cos(ramc), -(Math.sin(ramc) * Math.cos(eps) + Math.tan(lat * rad) * Math.sin(eps))) / rad);
  const mc = norm(Math.atan2(Math.sin(ramc), Math.cos(ramc) * Math.cos(eps)) / rad);
  return { asc, mc };
}

export type NatalResult = {
  utc: Date;
  sun: number;
  moon: number;
  asc: number;
  mc: number;
  /** Doğum saati ±15 dakika kayarsa yükselenin alabileceği burçlar (ilk eleman hesaplanan burç). */
  ascRange: number[];
  /** O gün içinde Ay'ın bulunduğu burçlar (gün içinde burç değiştiriyorsa iki eleman). */
  moonDay: number[];
};

export function natalChart(utc: Date, lat: number, lon: number, dayStartUtc?: Date): NatalResult {
  const { asc, mc } = angles(utc, lat, lon);
  const ascRange = [signIndex(asc)];
  for (const min of [-15, 15]) {
    const s = signIndex(angles(new Date(utc.getTime() + min * 60000), lat, lon).asc);
    if (!ascRange.includes(s)) ascRange.push(s);
  }
  const moonDay: number[] = [];
  if (dayStartUtc) {
    for (const h of [0, 23.99]) {
      const s = signIndex(moonPosition(new Date(dayStartUtc.getTime() + h * 3600000)).longitude);
      if (!moonDay.includes(s)) moonDay.push(s);
    }
  }
  return { utc, sun: sunLongitude(utc), moon: moonPosition(utc).longitude, asc, mc, ascRange, moonDay };
}

/** Burcun içindeki derece ve dakika: 254,5° → { sign: 8, deg: 14, min: 30 }. */
export function degreeInSign(longitude: number) {
  const l = norm(longitude);
  const within = l - Math.floor(l / 30) * 30;
  let deg = Math.floor(within);
  let min = Math.round((within - deg) * 60);
  if (min === 60) {
    deg += 1;
    min = 0;
  }
  return { sign: signIndex(l), deg, min };
}

/** Bir günde her burcun ufukta yükselme süresi (dakika): enleme göre değişir. */
export function risingDurations(dayUtc: Date, lat: number, lon: number) {
  const out = new Array(12).fill(0);
  for (let m = 0; m < 1436; m += 4) out[signIndex(angles(new Date(dayUtc.getTime() + m * 60000), lat, lon).asc)] += 4;
  return out;
}
