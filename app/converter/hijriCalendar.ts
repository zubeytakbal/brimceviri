// تحويل التاريخ بين الميلادي والهجري باستخدام التقويم الهجري الحسابي
// (الجدولي المدني) المبني على دورة 30 سنة (11 سنة كبيسة). هذا هو
// الخوارزم القياسي المستخدم في معظم أدوات التحويل غير الفلكية --
// وقد يختلف يوم واحد عن التقويم الهجري المعتمد على رؤية الهلال الفعلية
// (كتقويم أم القرى الرسمي في السعودية)، وهذا الفارق طبيعي ومتوقع.

const ISLAMIC_EPOCH = 1948440; // JDN لأول محرم 1 هـ (وفق التقويم الحسابي المدني)

export type CalendarDate = {
  year: number;
  month: number; // 1-12
  day: number;
};

function gregorianToJdn(date: CalendarDate): number {
  const a = Math.floor((14 - date.month) / 12);
  const y = date.year + 4800 - a;
  const m = date.month + 12 * a - 3;

  return (
    date.day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045
  );
}

function jdnToGregorian(jdn: number): CalendarDate {
  const a = jdn + 32044;
  const b = Math.floor((4 * a + 3) / 146097);
  const c = a - Math.floor((146097 * b) / 4);
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * d) / 4);
  const m = Math.floor((5 * e + 2) / 153);

  const day = e - Math.floor((153 * m + 2) / 5) + 1;
  const month = m + 3 - 12 * Math.floor(m / 10);
  const year = 100 * b + d - 4800 + Math.floor(m / 10);

  return { year, month, day };
}

function islamicToJdn(date: CalendarDate): number {
  return (
    date.day +
    Math.ceil(29.5 * (date.month - 1)) +
    (date.year - 1) * 354 +
    Math.floor((3 + 11 * date.year) / 30) +
    ISLAMIC_EPOCH -
    1
  );
}

function jdnToIslamic(jdn: number): CalendarDate {
  const year = Math.floor((30 * (jdn - ISLAMIC_EPOCH) + 10646) / 10631);
  const priorYearStart = islamicToJdn({ year, month: 1, day: 1 });
  const month = Math.min(
    12,
    Math.ceil((jdn - (29 + priorYearStart)) / 29.5) + 1
  );
  const day = jdn - islamicToJdn({ year, month, day: 1 }) + 1;

  return { year, month, day };
}

export function gregorianToHijri(date: CalendarDate): CalendarDate {
  return jdnToIslamic(gregorianToJdn(date));
}

export function hijriToGregorian(date: CalendarDate): CalendarDate {
  return jdnToGregorian(islamicToJdn(date));
}

export const hijriMonthNamesAr = [
  "محرم",
  "صفر",
  "ربيع الأول",
  "ربيع الآخر",
  "جمادى الأولى",
  "جمادى الآخرة",
  "رجب",
  "شعبان",
  "رمضان",
  "شوال",
  "ذو القعدة",
  "ذو الحجة",
];

export const gregorianMonthNamesAr = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];
