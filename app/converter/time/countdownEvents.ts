// Geri sayim etkinlikleri. Tarih kurallari: sabit gun, "ayin N. X gunu", Paskalya
// (Gregoryen hesap) ve Diyanet'in ilan ettigi dini gunler (yalnizca dogrulanmis yillar).

export type DateParts = { year: number; month: number; day: number; estimated?: boolean };
export type CountdownLang = "tr" | "en";

type Rule =
  | { kind: "fixed"; month: number; day: number }
  | { kind: "nth-weekday"; month: number; weekday: number; nth: number; offsetDays?: number }
  | { kind: "easter"; offsetDays?: number }
  /** Hicri takvim gunu: Diyanet'in ilan ettigi yillar "verified"; digerleri Umm al-Qura ile tahmin. */
  | { kind: "hijri"; hijriMonth: number; hijriDay: number; verified: DateParts[] };

export type CountdownEvent = {
  id: string;
  lang: CountdownLang;
  slug: string;
  /** Diger dildeki karsiligi (hreflang). */
  pair?: string;
  name: string;
  question: string;
  rule: Rule;
  /** TR etkinlikleri Turkiye saatiyle (UTC+3), EN etkinlikleri ziyaretcinin yerel saatiyle. */
  zone: "istanbul" | "local";
  holiday: string;
  about: string;
  source?: string;
};

/** Diyanet Isleri Baskanligi dini gunler takvimi (bayramin 1. gunu). Umm al-Qura hesabi
 * 2025-2028 icin bu tarihlerle birebir ortusur (bkz. tests/countdown.test.ts). */
const RAMAZAN_BAYRAMI: DateParts[] = [
  { year: 2027, month: 3, day: 9 },
  { year: 2028, month: 2, day: 26 },
];
const KURBAN_BAYRAMI: DateParts[] = [
  { year: 2027, month: 5, day: 16 },
  { year: 2028, month: 5, day: 5 },
];
const RAMAZAN_BASLANGICI: DateParts[] = [{ year: 2027, month: 2, day: 8 }];

const DIYANET = "Diyanet İşleri Başkanlığı dini günler takvimi";

export const countdownEvents: CountdownEvent[] = [
  {
    id: "yilbasi",
    lang: "tr",
    slug: "yilbasi",
    pair: "new-year",
    name: "Yılbaşı",
    question: "Yılbaşına kaç gün kaldı?",
    rule: { kind: "fixed", month: 1, day: 1 },
    zone: "istanbul",
    holiday: "Evet. 1 Ocak resmî tatildir (2429 sayılı Kanun).",
    about:
      "Yılbaşı, Gregoryen takvimde yeni yılın ilk günüdür. Türkiye'de 1 Ocak 1926'dan bu yana miladi takvim kullanılır ve 1 Ocak tam gün resmî tatildir. Geri sayım 31 Aralık gecesi saat 00:00'a (Türkiye saati) göre yapılır.",
  },
  {
    id: "ramazan",
    lang: "tr",
    slug: "ramazan",
    name: "Ramazan",
    question: "Ramazan'a kaç gün kaldı?",
    rule: { kind: "hijri", hijriMonth: 9, hijriDay: 1, verified: RAMAZAN_BASLANGICI },
    zone: "istanbul",
    holiday: "Hayır. Ramazan ayı resmî tatil değildir; ayın sonundaki Ramazan Bayramı resmî tatildir.",
    about:
      "Ramazan, Hicri takvimin dokuzuncu ayıdır ve oruç ayı olarak bilinir. Hicri takvim Ay'a dayandığı için Ramazan her yıl miladi takvimde yaklaşık 11 gün öne kayar. İlk oruç, ayın ilk gününün sabahı tutulur; teravih namazı bir önceki akşam başlar.",
    source: DIYANET,
  },
  {
    id: "ramazan-bayrami",
    lang: "tr",
    slug: "ramazan-bayrami",
    name: "Ramazan Bayramı",
    question: "Ramazan Bayramı'na kaç gün kaldı?",
    rule: { kind: "hijri", hijriMonth: 10, hijriDay: 1, verified: RAMAZAN_BAYRAMI },
    zone: "istanbul",
    holiday: "Evet. Ramazan Bayramı 3 gün resmî tatildir; arefe günü öğleden sonra (13:00'ten itibaren) yarım gün tatildir.",
    about:
      "Ramazan Bayramı (Şeker Bayramı), Ramazan ayının bitişini izleyen Şevval ayının ilk üç günü kutlanır. Tarihi Hicri takvime göre belirlendiği için her yıl yaklaşık 11 gün öne gelir. Geri sayım bayramın ilk günü saat 00:00'a göredir; bayram namazı o sabah kılınır.",
    source: DIYANET,
  },
  {
    id: "kurban-bayrami",
    lang: "tr",
    slug: "kurban-bayrami",
    name: "Kurban Bayramı",
    question: "Kurban Bayramı'na kaç gün kaldı?",
    rule: { kind: "hijri", hijriMonth: 12, hijriDay: 10, verified: KURBAN_BAYRAMI },
    zone: "istanbul",
    holiday: "Evet. Kurban Bayramı 4 gün resmî tatildir; arefe günü öğleden sonra (13:00'ten itibaren) yarım gün tatildir.",
    about:
      "Kurban Bayramı, Hicri takvimin Zilhicce ayının 10. günü başlar ve dört gün sürer. Hac ibadetinin de doruk noktasına denk gelir. Hicri takvim nedeniyle her yıl miladi takvimde yaklaşık 11 gün öne kayar.",
    source: DIYANET,
  },
  {
    id: "sevgililer-gunu",
    lang: "tr",
    slug: "sevgililer-gunu",
    pair: "valentines-day",
    name: "Sevgililer Günü",
    question: "Sevgililer Günü'ne kaç gün kaldı?",
    rule: { kind: "fixed", month: 2, day: 14 },
    zone: "istanbul",
    holiday: "Hayır, Sevgililer Günü resmî tatil değildir.",
    about:
      "Sevgililer Günü her yıl 14 Şubat'ta kutlanır. Adını Aziz Valentin'den alan gün, dünyanın birçok ülkesinde sevgiye ayrılmış gün olarak bilinir.",
  },
  {
    id: "23-nisan",
    lang: "tr",
    slug: "23-nisan",
    name: "23 Nisan Ulusal Egemenlik ve Çocuk Bayramı",
    question: "23 Nisan'a kaç gün kaldı?",
    rule: { kind: "fixed", month: 4, day: 23 },
    zone: "istanbul",
    holiday: "Evet. 23 Nisan tam gün resmî tatildir.",
    about:
      "23 Nisan 1920'de Türkiye Büyük Millet Meclisi Ankara'da açıldı. Atatürk bu günü çocuklara armağan etti; 23 Nisan dünyada çocuklara adanmış ilk ulusal bayram olarak da bilinir.",
  },
  {
    id: "1-mayis",
    lang: "tr",
    slug: "1-mayis",
    name: "1 Mayıs Emek ve Dayanışma Günü",
    question: "1 Mayıs'a kaç gün kaldı?",
    rule: { kind: "fixed", month: 5, day: 1 },
    zone: "istanbul",
    holiday: "Evet. 1 Mayıs 2009'dan bu yana tam gün resmî tatildir.",
    about: "1 Mayıs, dünyada işçi bayramı olarak kutlanır. Türkiye'de Emek ve Dayanışma Günü adıyla 2009'dan beri resmî tatildir.",
  },
  {
    id: "anneler-gunu",
    lang: "tr",
    slug: "anneler-gunu",
    pair: "mothers-day",
    name: "Anneler Günü",
    question: "Anneler Günü'ne kaç gün kaldı?",
    rule: { kind: "nth-weekday", month: 5, weekday: 0, nth: 2 },
    zone: "istanbul",
    holiday: "Hayır, Anneler Günü resmî tatil değildir; zaten her yıl pazar gününe denk gelir.",
    about: "Türkiye'de Anneler Günü her yıl mayıs ayının ikinci pazarı kutlanır. Bu yüzden tarih yıldan yıla 8 ile 14 Mayıs arasında değişir.",
  },
  {
    id: "19-mayis",
    lang: "tr",
    slug: "19-mayis",
    name: "19 Mayıs Atatürk'ü Anma, Gençlik ve Spor Bayramı",
    question: "19 Mayıs'a kaç gün kaldı?",
    rule: { kind: "fixed", month: 5, day: 19 },
    zone: "istanbul",
    holiday: "Evet. 19 Mayıs tam gün resmî tatildir.",
    about: "19 Mayıs 1919'da Mustafa Kemal Samsun'a çıktı ve Kurtuluş Savaşı başladı. Gün, Atatürk tarafından gençliğe armağan edilmiştir.",
  },
  {
    id: "babalar-gunu",
    lang: "tr",
    slug: "babalar-gunu",
    pair: "fathers-day",
    name: "Babalar Günü",
    question: "Babalar Günü'ne kaç gün kaldı?",
    rule: { kind: "nth-weekday", month: 6, weekday: 0, nth: 3 },
    zone: "istanbul",
    holiday: "Hayır, Babalar Günü resmî tatil değildir; her yıl pazar gününe denk gelir.",
    about: "Türkiye'de Babalar Günü her yıl haziran ayının üçüncü pazarı kutlanır; tarih 15 ile 21 Haziran arasında değişir.",
  },
  {
    id: "15-temmuz",
    lang: "tr",
    slug: "15-temmuz",
    name: "15 Temmuz Demokrasi ve Millî Birlik Günü",
    question: "15 Temmuz'a kaç gün kaldı?",
    rule: { kind: "fixed", month: 7, day: 15 },
    zone: "istanbul",
    holiday: "Evet. 15 Temmuz 2017'den bu yana tam gün resmî tatildir.",
    about: "15 Temmuz, 2016'daki darbe girişimine karşı verilen mücadelenin anısına Demokrasi ve Millî Birlik Günü olarak anılır.",
  },
  {
    id: "30-agustos",
    lang: "tr",
    slug: "30-agustos",
    name: "30 Ağustos Zafer Bayramı",
    question: "30 Ağustos'a kaç gün kaldı?",
    rule: { kind: "fixed", month: 8, day: 30 },
    zone: "istanbul",
    holiday: "Evet. 30 Ağustos tam gün resmî tatildir.",
    about: "30 Ağustos 1922'de Başkomutanlık Meydan Muharebesi kazanıldı. Zafer Bayramı, Kurtuluş Savaşı'nın bu dönüm noktasını anar.",
  },
  {
    id: "29-ekim",
    lang: "tr",
    slug: "29-ekim",
    name: "29 Ekim Cumhuriyet Bayramı",
    question: "29 Ekim'e kaç gün kaldı?",
    rule: { kind: "fixed", month: 10, day: 29 },
    zone: "istanbul",
    holiday: "Evet. 29 Ekim tam gün, 28 Ekim ise öğleden sonra (13:00'ten itibaren) yarım gün resmî tatildir.",
    about: "29 Ekim 1923'te Türkiye Cumhuriyeti ilan edildi. Cumhuriyet Bayramı, Türkiye'nin en coşkulu kutlanan millî bayramıdır.",
  },
  {
    id: "ogretmenler-gunu",
    lang: "tr",
    slug: "ogretmenler-gunu",
    name: "Öğretmenler Günü",
    question: "Öğretmenler Günü'ne kaç gün kaldı?",
    rule: { kind: "fixed", month: 11, day: 24 },
    zone: "istanbul",
    holiday: "Hayır, Öğretmenler Günü resmî tatil değildir.",
    about: "24 Kasım, Atatürk'ün 1928'de Millet Mektepleri Başöğretmenliğini kabul ettiği gündür ve 1981'den beri Öğretmenler Günü olarak kutlanır.",
  },
  {
    id: "yaz",
    lang: "tr",
    slug: "yaz",
    name: "Yaz",
    question: "Yaza kaç gün kaldı?",
    rule: { kind: "fixed", month: 6, day: 21 },
    zone: "istanbul",
    holiday: "Hayır, yazın başlangıcı resmî tatil değildir.",
    about:
      "Kuzey yarımkürede yaz, en uzun günün yaşandığı yaz gündönümüyle başlar. Gündönümü yıla göre 20 ya da 21 Haziran'a denk gelir; bu sayfa geleneksel başlangıç olan 21 Haziran'ı esas alır. Meteorolojide ise yaz 1 Haziran'da başlamış sayılır.",
  },
  {
    id: "new-year",
    lang: "en",
    slug: "new-year",
    pair: "yilbasi",
    name: "New Year",
    question: "How many days until New Year?",
    rule: { kind: "fixed", month: 1, day: 1 },
    zone: "local",
    holiday: "Yes. New Year's Day (January 1) is a federal holiday in the US and a public holiday in most countries.",
    about: "New Year's Day marks the first day of the Gregorian calendar year. The countdown runs to midnight on January 1 in your own time zone.",
  },
  {
    id: "valentines-day",
    lang: "en",
    slug: "valentines-day",
    pair: "sevgililer-gunu",
    name: "Valentine's Day",
    question: "How many days until Valentine's Day?",
    rule: { kind: "fixed", month: 2, day: 14 },
    zone: "local",
    holiday: "No. Valentine's Day is not a public holiday.",
    about: "Valentine's Day falls on February 14 every year and is named after Saint Valentine. It is celebrated as a day of love in many countries.",
  },
  {
    id: "easter",
    lang: "en",
    slug: "easter",
    name: "Easter",
    question: "How many days until Easter?",
    rule: { kind: "easter" },
    zone: "local",
    holiday: "Easter Sunday is not a US federal holiday; Good Friday and Easter Monday are public holidays in many other countries.",
    about:
      "Western Easter falls on the first Sunday after the first ecclesiastical full moon on or after March 21, so it moves between March 22 and April 25. Dates here use the standard Gregorian (Western) computation.",
  },
  {
    id: "mothers-day",
    lang: "en",
    slug: "mothers-day",
    pair: "anneler-gunu",
    name: "Mother's Day",
    question: "How many days until Mother's Day?",
    rule: { kind: "nth-weekday", month: 5, weekday: 0, nth: 2 },
    zone: "local",
    holiday: "No, it is not a federal holiday — it always falls on a Sunday.",
    about: "In the US, Canada and many other countries Mother's Day is the second Sunday in May. (The UK celebrates Mothering Sunday in March.)",
  },
  {
    id: "fathers-day",
    lang: "en",
    slug: "fathers-day",
    pair: "babalar-gunu",
    name: "Father's Day",
    question: "How many days until Father's Day?",
    rule: { kind: "nth-weekday", month: 6, weekday: 0, nth: 3 },
    zone: "local",
    holiday: "No, it is not a federal holiday — it always falls on a Sunday.",
    about: "In the US, the UK and Canada Father's Day is the third Sunday in June, so it falls between June 15 and June 21.",
  },
  {
    id: "independence-day",
    lang: "en",
    slug: "independence-day",
    name: "Independence Day (July 4th)",
    question: "How many days until the 4th of July?",
    rule: { kind: "fixed", month: 7, day: 4 },
    zone: "local",
    holiday: "Yes. Independence Day is a US federal holiday; if it falls on a weekend, the nearest weekday is observed.",
    about: "The Declaration of Independence was adopted on July 4, 1776. The day is celebrated across the US with parades and fireworks.",
  },
  {
    id: "halloween",
    lang: "en",
    slug: "halloween",
    name: "Halloween",
    question: "How many days until Halloween?",
    rule: { kind: "fixed", month: 10, day: 31 },
    zone: "local",
    holiday: "No. Halloween is not a public holiday.",
    about: "Halloween is celebrated on October 31, the eve of All Saints' Day, with costumes, pumpkin carving and trick-or-treating.",
  },
  {
    id: "thanksgiving",
    lang: "en",
    slug: "thanksgiving",
    name: "Thanksgiving",
    question: "How many days until Thanksgiving?",
    rule: { kind: "nth-weekday", month: 11, weekday: 4, nth: 4 },
    zone: "local",
    holiday: "Yes. Thanksgiving is a US federal holiday on the fourth Thursday of November.",
    about: "US Thanksgiving is held on the fourth Thursday of November, so it falls between November 22 and 28. (Canadian Thanksgiving is the second Monday of October.)",
  },
  {
    id: "black-friday",
    lang: "en",
    slug: "black-friday",
    name: "Black Friday",
    question: "How many days until Black Friday?",
    rule: { kind: "nth-weekday", month: 11, weekday: 4, nth: 4, offsetDays: 1 },
    zone: "local",
    holiday: "No. Black Friday is not a federal holiday, although some employers give the day off.",
    about: "Black Friday is the day after US Thanksgiving and traditionally opens the holiday shopping season.",
  },
  {
    id: "christmas",
    lang: "en",
    slug: "christmas",
    name: "Christmas",
    question: "How many days until Christmas?",
    rule: { kind: "fixed", month: 12, day: 25 },
    zone: "local",
    holiday: "Yes. Christmas Day (December 25) is a US federal holiday and a public holiday in most Western countries.",
    about: "Christmas is celebrated on December 25 in the Gregorian calendar. (Orthodox churches using the Julian calendar celebrate on January 7.)",
  },
];

function addDays(parts: DateParts, days: number): DateParts {
  const date = new Date(Date.UTC(parts.year, parts.month - 1, parts.day + days));
  return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() };
}

/** Gregoryen (Bati) Paskalya pazari — Anonim Gregoryen algoritmasi. */
export function easterSunday(year: number): DateParts {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return { year, month, day };
}

export function nthWeekday(year: number, month: number, weekday: number, nth: number): DateParts {
  const first = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const day = 1 + ((weekday - first + 7) % 7) + (nth - 1) * 7;
  return { year, month, day };
}

export function occurrenceInYear(event: CountdownEvent, year: number): DateParts | null {
  const rule = event.rule;
  switch (rule.kind) {
    case "fixed":
      return { year, month: rule.month, day: rule.day };
    case "nth-weekday":
      return addDays(nthWeekday(year, rule.month, rule.weekday, rule.nth), rule.offsetDays ?? 0);
    case "easter":
      return addDays(easterSunday(year), rule.offsetDays ?? 0);
    case "hijri":
      return rule.verified.find((d) => d.year === year) ?? hijriEstimate(year, rule.hijriMonth, rule.hijriDay);
  }
}

let hijriFormatter: Intl.DateTimeFormat | null = null;

/** Verilen miladi yilda Hicri ay/gunun denk geldigi tarih (Umm al-Qura), "tahmini" isaretli. */
export function hijriEstimate(year: number, hijriMonth: number, hijriDay: number): DateParts | null {
  hijriFormatter ??= new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", { month: "numeric", day: "numeric", timeZone: "UTC" });
  for (let offset = 0; offset < 366; offset += 1) {
    const date = new Date(Date.UTC(year, 0, 1 + offset));
    if (date.getUTCFullYear() !== year) break;
    const parts = hijriFormatter.formatToParts(date);
    const month = Number(parts.find((p) => p.type === "month")?.value);
    const day = Number(parts.find((p) => p.type === "day")?.value);
    if (month === hijriMonth && day === hijriDay) return { year, month: date.getUTCMonth() + 1, day: date.getUTCDate(), estimated: true };
  }
  return null;
}

/** Etkinlik gunu baslangicinin UTC zaman damgasi (istanbul: UTC+3; local: sunucuda UTC varsayilir). */
export function startMs(parts: DateParts, zone: CountdownEvent["zone"]) {
  return Date.UTC(parts.year, parts.month - 1, parts.day) - (zone === "istanbul" ? 3 * 3600000 : 0);
}

/** Simdiden sonraki (ya da bugunku) ilk tarih ve sonrakiler. Gun bittiyse bir sonraki yila gecer. */
export function upcomingOccurrences(event: CountdownEvent, now: Date, count: number): DateParts[] {
  const result: DateParts[] = [];
  const startYear = now.getUTCFullYear() - 1;
  for (let year = startYear; year < startYear + 12 && result.length < count; year += 1) {
    const parts = occurrenceInYear(event, year);
    if (!parts) continue;
    // Etkinlik gunu tamamen gecmediyse dahil (gun boyu "bugun" gosterilir).
    if (startMs(parts, event.zone) + 86400000 > now.getTime()) result.push(parts);
  }
  return result;
}

export function findCountdownEvent(lang: CountdownLang, slug: string) {
  return countdownEvents.find((event) => event.lang === lang && event.slug === slug) ?? null;
}

export function countdownPath(event: CountdownEvent) {
  return event.lang === "tr" ? `/geri-sayim/${event.slug}` : `/en/countdown/${event.slug}`;
}

export function pairedEvent(event: CountdownEvent) {
  if (!event.pair) return null;
  return countdownEvents.find((other) => other.lang !== event.lang && other.slug === event.pair) ?? null;
}

/** Tam gun sayisi (canli sayactaki "gun" ile ayni). 0 ise ya bugun ya da 1 gunden az kaldi. */
export function daysUntil(parts: DateParts, zone: CountdownEvent["zone"], now: Date) {
  return Math.max(0, Math.floor((startMs(parts, zone) - now.getTime()) / 86400000));
}

export function hasStarted(parts: DateParts, zone: CountdownEvent["zone"], now: Date) {
  return startMs(parts, zone) <= now.getTime();
}
