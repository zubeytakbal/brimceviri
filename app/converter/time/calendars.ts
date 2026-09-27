// Takvim donusumleri: Miladi (Gregoryen), Julyen, Hicri ve Rumi (Osmanli mali takvimi).
//
// Rumi takvim kurallari:
// - 1 Mart 1256 (13 Mart 1840) - 15 Subat 1332 (28 Subat 1917): Julyen takvim, yil 1 Mart'ta baslar,
//   Rumi yil = Julyen yil - 584 (Mart-Aralik), - 585 (Ocak-Subat).
// - 1917'de 13 gun atlanir: 16 Subat 1332 gunu "1 Mart 1333" (1 Mart 1917) sayilir; gunler Gregoryen olur.
// - 1918'den itibaren yil 1 Kanunusani'de (Ocak) baslar: Rumi yil = Miladi yil - 584.
// - 1 Ocak 1926'da Miladi takvime gecilir (Rumi 1341'in sonu).
// Hicri: Intl "islamic-umalqura" (1937-2077 arasi Umm al-Qura; disinda tablo takvimi). Tarihi
// belgelerde hilal gozlemine bagli olarak ±1 gun fark olabilir.

export type YMD = { year: number; month: number; day: number };

export const RUMI_MONTHS = ["Kanunusani", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Teşrinievvel", "Teşrinisani", "Kanunuevvel"];
export const HIJRI_MONTHS_TR = ["Muharrem", "Safer", "Rebiülevvel", "Rebiülahir", "Cemaziyelevvel", "Cemaziyelahir", "Recep", "Şaban", "Ramazan", "Şevval", "Zilkade", "Zilhicce"];
export const HIJRI_MONTHS_EN = ["Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani", "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Sha'ban", "Ramadan", "Shawwal", "Dhu al-Qadah", "Dhu al-Hijjah"];

const DAY = 86400000;

/** Gregoryen tarihin Julian Day Number'i (oglen). */
export function gregorianToJdn({ year, month, day }: YMD) {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

export function jdnToGregorian(jdn: number): YMD {
  const a = jdn + 32044;
  const b = Math.floor((4 * a + 3) / 146097);
  const c = a - Math.floor((146097 * b) / 4);
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * d) / 4);
  const m = Math.floor((5 * e + 2) / 153);
  return { day: e - Math.floor((153 * m + 2) / 5) + 1, month: m + 3 - 12 * Math.floor(m / 10), year: 100 * b + d - 4800 + Math.floor(m / 10) };
}

export function julianToJdn({ year, month, day }: YMD) {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083;
}

export function jdnToJulian(jdn: number): YMD {
  const c = jdn + 32082;
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * d) / 4);
  const m = Math.floor((5 * e + 2) / 153);
  return { day: e - Math.floor((153 * m + 2) / 5) + 1, month: m + 3 - 12 * Math.floor(m / 10), year: d - 4800 + Math.floor(m / 10) };
}

export function isValidGregorian(date: YMD) {
  const back = jdnToGregorian(gregorianToJdn(date));
  return back.year === date.year && back.month === date.month && back.day === date.day;
}

// Rumi takvim sinirlari (JDN).
const RUMI_START = gregorianToJdn({ year: 1840, month: 3, day: 13 }); // 1 Mart 1256
const RUMI_GREGORIAN_SWITCH = gregorianToJdn({ year: 1917, month: 3, day: 1 }); // 1 Mart 1333
const RUMI_JANUARY_START = gregorianToJdn({ year: 1918, month: 1, day: 1 }); // 1 Kanunusani 1334
const RUMI_END = gregorianToJdn({ year: 1925, month: 12, day: 31 }); // 31 Kanunuevvel 1341

export const RUMI_RANGE = { first: jdnToGregorian(RUMI_START), last: jdnToGregorian(RUMI_END) };

/** Miladi -> Rumi. Kapsam disindaysa null. */
export function gregorianToRumi(date: YMD): YMD | null {
  const jdn = gregorianToJdn(date);
  if (jdn < RUMI_START || jdn > RUMI_END) return null;
  if (jdn >= RUMI_JANUARY_START) return { year: date.year - 584, month: date.month, day: date.day };
  if (jdn >= RUMI_GREGORIAN_SWITCH) return { year: 1333, month: date.month, day: date.day };
  const julian = jdnToJulian(jdn);
  return { year: julian.year - (julian.month >= 3 ? 584 : 585), month: julian.month, day: julian.day };
}

/** Rumi -> Miladi. Gecersiz ya da kapsam disi tarihte null. */
export function rumiToGregorian(rumi: YMD): YMD | null {
  const { year, month, day } = rumi;
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  let result: YMD;
  if (year >= 1334) {
    result = { year: year + 584, month, day };
    if (!isValidGregorian(result)) return null;
  } else if (year === 1333 && month >= 3) {
    result = { year: 1917, month, day };
    if (!isValidGregorian(result)) return null;
  } else {
    const julianYear = year + (month >= 3 ? 584 : 585);
    const julian = { year: julianYear, month, day };
    const jdn = julianToJdn(julian);
    const back = jdnToJulian(jdn);
    if (back.day !== day || back.month !== month) return null;
    result = jdnToGregorian(jdn);
  }
  const jdn = gregorianToJdn(result);
  if (jdn < RUMI_START || jdn > RUMI_END) return null;
  // 16-28 Subat 1332 hic yasanmadi (13 gun atlandi).
  return gregorianToRumi(result)?.year === year ? result : null;
}

let hijriFormatter: Intl.DateTimeFormat | null = null;

export function gregorianToHijri(date: YMD): YMD {
  hijriFormatter ??= new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", { year: "numeric", month: "numeric", day: "numeric", timeZone: "UTC" });
  const parts = hijriFormatter.formatToParts(new Date(Date.UTC(date.year, date.month - 1, date.day, 12)));
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value?.replace(/[^\d]/g, ""));
  return { year: get("year"), month: get("month"), day: get("day") };
}

/** Hicri -> Miladi: tablo tahmini, sonra ±3 gun icinde Intl ile birebir eslesme. */
export function hijriToGregorian(hijri: YMD): YMD | null {
  const { year, month, day } = hijri;
  if (month < 1 || month > 12 || day < 1 || day > 30 || year < 1) return null;
  const estimate = Math.floor((11 * year + 3) / 30) + 354 * year + 30 * month - Math.floor((month - 1) / 2) + day + 1948440 - 385;
  for (let offset = 0; offset <= 4; offset += 1) {
    for (const sign of offset ? [1, -1] : [1]) {
      const candidate = jdnToGregorian(estimate + sign * offset);
      const back = gregorianToHijri(candidate);
      if (back.year === year && back.month === month && back.day === day) return candidate;
    }
  }
  return null;
}

export function weekdayIndex(date: YMD) {
  return new Date(Date.UTC(date.year, date.month - 1, date.day)).getUTCDay();
}

export function daysBetween(a: YMD, b: YMD) {
  return Math.round((Date.UTC(b.year, b.month - 1, b.day) - Date.UTC(a.year, a.month - 1, a.day)) / DAY);
}
