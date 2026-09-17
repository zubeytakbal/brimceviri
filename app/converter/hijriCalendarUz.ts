// Hijriy-milodiy sana aylantirgich -- jadvalli (tabular) Islom taqvimi
// algoritmi (Kuvayt/Microsoft algoritmi nomi bilan ham tanilgan)
// asosida ishlaydi. Bu 30 yillik davrda 11 kabisa yili bo'lgan sof
// matematik qoidaga asoslangan hisoblash usuli -- oy ko'rinishiga
// (real kuzatuvga) asoslangan rasmiy e'lon qilingan sanalardan 1-2
// kunga farq qilishi mumkin. Epoch: JDN 1948440 = 1 Muharram 1 h.
// (16-iyul 622-yil, yulian taqvimi). Formula manbasi: Fourmilab
// taqvim aylantirish algoritmi (John Walker, jamoat mulki) va
// jQuery Calendars Islamic plagini (jdEpoch: 1948439.5) bilan
// tasdiqlangan; 1445-01-01 h. = 19-iyul 2023-yil (keng e'lon
// qilingan sana) bilan tekshirilgan.

const ISLAMIC_EPOCH_JDN = 1948440;

const HIJRI_MONTH_NAMES = [
  "Muharram",
  "Safar",
  "Rabi' ul-avval",
  "Rabi' us-soniy",
  "Jumod ul-avval",
  "Jumod us-soniy",
  "Rajab",
  "Sha'bon",
  "Ramazon",
  "Shavvol",
  "Zul-qa'da",
  "Zul-hijja",
];

const GREGORIAN_MONTH_NAMES_UZ = [
  "Yanvar",
  "Fevral",
  "Mart",
  "Aprel",
  "May",
  "Iyun",
  "Iyul",
  "Avgust",
  "Sentyabr",
  "Oktyabr",
  "Noyabr",
  "Dekabr",
];

export type HijriDate = { year: number; month: number; day: number };
export type GregorianDate = { year: number; month: number; day: number };

function idiv(a: number, b: number): number {
  return Math.floor(a / b);
}

export function gregorianToJdn(year: number, month: number, day: number): number {
  const a = idiv(14 - month, 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return (
    day +
    idiv(153 * m + 2, 5) +
    365 * y +
    idiv(y, 4) -
    idiv(y, 100) +
    idiv(y, 400) -
    32045
  );
}

export function jdnToGregorian(jdn: number): GregorianDate {
  const a = jdn + 32044;
  const b = idiv(4 * a + 3, 146097);
  const c = a - idiv(146097 * b, 4);
  const d = idiv(4 * c + 3, 1461);
  const e = c - idiv(1461 * d, 4);
  const m = idiv(5 * e + 2, 153);
  const day = e - idiv(153 * m + 2, 5) + 1;
  const month = m + 3 - 12 * idiv(m, 10);
  const year = 100 * b + d - 4800 + idiv(m, 10);
  return { year, month, day };
}

export function isLeapHijriYear(year: number): boolean {
  return (year * 11 + 14) % 30 < 11;
}

export function hijriToJdn(year: number, month: number, day: number): number {
  return (
    day +
    Math.ceil(29.5 * (month - 1)) +
    (year - 1) * 354 +
    idiv(3 + 11 * year, 30) +
    ISLAMIC_EPOCH_JDN -
    1
  );
}

export function jdnToHijri(jdn: number): HijriDate {
  const year = Math.floor((30 * (jdn - ISLAMIC_EPOCH_JDN) + 10646) / 10631);
  const month = Math.min(
    12,
    Math.ceil((jdn - (29 + hijriToJdn(year, 1, 1))) / 29.5) + 1
  );
  const day = jdn - hijriToJdn(year, month, 1) + 1;
  return { year, month, day };
}

export function gregorianToHijri(date: GregorianDate): HijriDate {
  return jdnToHijri(gregorianToJdn(date.year, date.month, date.day));
}

export function hijriToGregorian(date: HijriDate): GregorianDate {
  return jdnToGregorian(hijriToJdn(date.year, date.month, date.day));
}

export function getHijriMonthName(month: number): string {
  return HIJRI_MONTH_NAMES[month - 1] ?? "";
}

export function getGregorianMonthNameUz(month: number): string {
  return GREGORIAN_MONTH_NAMES_UZ[month - 1] ?? "";
}

export function getHijriMonthLength(year: number, month: number): number {
  if (month === 12) {
    return isLeapHijriYear(year) ? 30 : 29;
  }
  return month % 2 === 1 ? 30 : 29;
}
