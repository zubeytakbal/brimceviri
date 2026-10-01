// İsveççe, Norveççe ve Danca hafta numarası sayfalarının metinleri ve tarih
// biçimleri. Hesap Almanca KW aracıyla aynı: ISO 8601 (hafta pazartesi başlar,
// 1. hafta yılın ilk perşembesini içeren haftadır). Üç ülke de Berlin ile aynı
// saat diliminde (CET/CEST), bu yüzden "bugün" todayBerlin ile bulunur.
import type { YMD } from "./calendars";
import { ymdToMs } from "./dateMath";

export type NordicLocale = "sv" | "no" | "da";

export const NORDIC_WEEK_PATHS: Record<NordicLocale, string> = {
  sv: "/sv/veckonummer",
  no: "/no/ukenummer",
  da: "/da/ugenummer",
};

const INTL_LOCALE: Record<NordicLocale, string> = { sv: "sv-SE", no: "nb-NO", da: "da-DK" };

function fmt(locale: NordicLocale, date: YMD, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(INTL_LOCALE[locale], { ...options, timeZone: "UTC" }).format(new Date(ymdToMs(date)));
}

/** "torsdag 1 oktober 2026" */
export const formatNordicLong = (locale: NordicLocale, date: YMD) =>
  fmt(locale, date, { weekday: "long", day: "numeric", month: "long", year: "numeric" });

/** "1 oktober 2026" */
export const formatNordicDate = (locale: NordicLocale, date: YMD) =>
  fmt(locale, date, { day: "numeric", month: "long", year: "numeric" });

/** "torsdag" */
export const formatNordicWeekday = (locale: NordicLocale, date: YMD) => fmt(locale, date, { weekday: "long" });

/** "28 september – 4 oktober 2026" */
export function nordicWeekRange(locale: NordicLocale, monday: YMD, sunday: YMD) {
  return `${fmt(locale, monday, { day: "numeric", month: "long" })} – ${formatNordicDate(locale, sunday)}`;
}

export type NordicWeekCopy = {
  home: string;
  homeHref: string;
  crumbLabel: string;
  toolName: string;
  ogLocale: string;
  metaTitle: (week: number, year: number, range: string) => string;
  shortTitle: (week: number, year: number) => string;
  metaDescription: (todayLong: string, week: number, year: number) => string;
  h1: (week: number) => string;
  intro: (todayLong: string, week: number, range: string) => string;
  // Araç
  date: string;
  week: string;
  year: string;
  weekday: string;
  weeksInYear: (year: number) => string;
  invalidDate: string;
  weekOfYear: (week: string, year: string) => string;
  mondayToSunday: (monday: string, sunday: string) => string;
  validWeeks: (year: string, weeks: number) => string;
  // Sayfa
  tableTitle: (year: number) => string;
  current: string;
  monday: string;
  sunday: string;
  rulesTitle: string;
  rules: string[];
  tocTitle: string;
  faqTitle: string;
  relatedTitle: string;
  related: Array<{ href: string; label: string }>;
  faq: (args: {
    todayLong: string;
    week: number;
    monday: string;
    sunday: string;
    year: number;
    weeks: number;
    nextYear: number;
    nextWeek1: string;
    weeksNext: number;
  }) => Array<{ question: string; answer: string }>;
};

const why53 = {
  sv: "Det händer när året börjar på en torsdag, eller när ett skottår börjar på en onsdag.",
  no: "Det skjer når året begynner på en torsdag, eller når et skuddår begynner på en onsdag.",
  da: "Det sker, når året begynder på en torsdag, eller når et skudår begynder på en onsdag.",
};

export const NORDIC_WEEK_COPY: Record<NordicLocale, NordicWeekCopy> = {
  sv: {
    home: "Hem",
    homeHref: "/sv",
    crumbLabel: "Brödsmulor",
    toolName: "Veckonummer",
    ogLocale: "sv_SE",
    metaTitle: (w, _y, range) => `Vilken vecka är det? Vecka ${w} (${range})`,
    shortTitle: (w, y) => `Vilken vecka är det? Vecka ${w} ${y}`,
    metaDescription: (today, w, y) =>
      `Idag är det ${today} och vi är i vecka ${w}. Räkna ut veckonumret för valfritt datum och se alla veckor ${y} med datum enligt ISO 8601.`,
    h1: (w) => `Vilken vecka är det? Just nu vecka ${w}`,
    intro: (today, w, range) =>
      `Idag är det ${today} och vi är i vecka ${w} (${range}). Räkna ut veckonumret för valfritt datum eller se vilka datum en viss vecka omfattar.`,
    date: "Datum",
    week: "Vecka",
    year: "År",
    weekday: "Veckodag",
    weeksInYear: (y) => `Veckor år ${y}`,
    invalidDate: "Ange ett giltigt datum.",
    weekOfYear: (w, y) => `Vecka ${w} år ${y}`,
    mondayToSunday: (a, b) => `måndag ${a} till söndag ${b}`,
    validWeeks: (y, n) => `År ${y} har veckorna 1 till ${n}.`,
    tableTitle: (y) => `Alla veckor ${y}`,
    current: "nu",
    monday: "Måndag",
    sunday: "Söndag",
    rulesTitle: "Så räknas veckonummer i Sverige",
    rules: [
      "Sverige följer standarden ISO 8601, precis som resten av Norden och större delen av Europa: en vecka börjar på måndag och slutar på söndag. Vecka 1 är den vecka som innehåller årets första torsdag, vilket alltid är veckan med den 4 januari. Därför kan 1–3 januari fortfarande höra till förra årets sista vecka, och 29–31 december redan till vecka 1 nästa år.",
      "De flesta år har 52 veckor. Ett år har 53 veckor när det börjar på en torsdag, eller när ett skottår börjar på en onsdag.",
    ],
    tocTitle: "Innehåll",
    faqTitle: "Vanliga frågor",
    relatedTitle: "Du kanske också gillar",
    related: [
      { href: "/sv/somnkalkylator", label: "Sömnkalkylator" },
      { href: "/sv/kategorier/tid", label: "Omvandla tidsenheter" },
    ],
    faq: (a) => [
      { question: "Vilken vecka är det?", answer: `Idag (${a.todayLong}) är det vecka ${a.week}. Den varar från måndag ${a.monday} till söndag ${a.sunday}.` },
      { question: `Hur många veckor har ${a.year}?`, answer: `${a.year} har ${a.weeks} veckor. ${a.weeks === 53 ? why53.sv : `Ett år har bara 53 veckor när det börjar på en torsdag, eller när ett skottår börjar på en onsdag.`}` },
      { question: `När börjar vecka 1 ${a.nextYear}?`, answer: `Vecka 1 ${a.nextYear} börjar måndag ${a.nextWeek1}. ${a.nextYear} har ${a.weeksNext} veckor.` },
      { question: "Hur räknas veckonummer?", answer: "Enligt ISO 8601 börjar varje vecka på måndag. Vecka 1 är veckan som innehåller årets första torsdag, alltså alltid veckan med den 4 januari." },
      { question: "Varför visar en amerikansk kalender en annan vecka?", answer: "I USA börjar veckan på söndag och vecka 1 är veckan med den 1 januari. Därför skiljer sig veckonumret där ofta med ett." },
    ],
  },
  no: {
    home: "Hjem",
    homeHref: "/no",
    crumbLabel: "Brødsmuler",
    toolName: "Ukenummer",
    ogLocale: "nb_NO",
    metaTitle: (w, _y, range) => `Hvilken uke er det? Uke ${w} (${range})`,
    shortTitle: (w, y) => `Hvilken uke er det? Uke ${w} ${y}`,
    metaDescription: (today, w, y) =>
      `I dag er det ${today}, og vi er i uke ${w}. Finn ukenummeret for en hvilken som helst dato og se alle uker i ${y} med datoer etter ISO 8601.`,
    h1: (w) => `Hvilken uke er det? Nå er det uke ${w}`,
    intro: (today, w, range) =>
      `I dag er det ${today}, og vi er i uke ${w} (${range}). Finn ukenummeret for en hvilken som helst dato, eller se hvilke datoer en bestemt uke dekker.`,
    date: "Dato",
    week: "Uke",
    year: "År",
    weekday: "Ukedag",
    weeksInYear: (y) => `Uker i ${y}`,
    invalidDate: "Skriv inn en gyldig dato.",
    weekOfYear: (w, y) => `Uke ${w} i ${y}`,
    mondayToSunday: (a, b) => `mandag ${a} til søndag ${b}`,
    validWeeks: (y, n) => `${y} har uke 1 til ${n}.`,
    tableTitle: (y) => `Alle uker i ${y}`,
    current: "nå",
    monday: "Mandag",
    sunday: "Søndag",
    rulesTitle: "Slik telles ukenummer i Norge",
    rules: [
      "Norge følger standarden ISO 8601, som resten av Norden og det meste av Europa: en uke begynner på mandag og slutter på søndag. Uke 1 er uken som inneholder årets første torsdag, altså alltid uken med 4. januar. Derfor kan 1.–3. januar fortsatt høre til fjorårets siste uke, og 29.–31. desember allerede til uke 1 neste år.",
      "De fleste år har 52 uker. Et år har 53 uker når det begynner på en torsdag, eller når et skuddår begynner på en onsdag.",
    ],
    tocTitle: "Innhold",
    faqTitle: "Vanlige spørsmål",
    relatedTitle: "Kanskje du også liker",
    related: [
      { href: "/no/sovnkalkulator", label: "Søvnkalkulator" },
      { href: "/no/kategorier/tid", label: "Konverter tidsenheter" },
    ],
    faq: (a) => [
      { question: "Hvilken uke er det?", answer: `I dag (${a.todayLong}) er det uke ${a.week}. Den varer fra mandag ${a.monday} til søndag ${a.sunday}.` },
      { question: `Hvor mange uker har ${a.year}?`, answer: `${a.year} har ${a.weeks} uker. ${a.weeks === 53 ? why53.no : `Et år har bare 53 uker når det begynner på en torsdag, eller når et skuddår begynner på en onsdag.`}` },
      { question: `Når starter uke 1 i ${a.nextYear}?`, answer: `Uke 1 i ${a.nextYear} starter mandag ${a.nextWeek1}. ${a.nextYear} har ${a.weeksNext} uker.` },
      { question: "Hvordan regnes ukenummer ut?", answer: "Etter ISO 8601 begynner hver uke på mandag. Uke 1 er uken som inneholder årets første torsdag, altså alltid uken med 4. januar." },
      { question: "Hvorfor viser en amerikansk kalender en annen uke?", answer: "I USA begynner uken på søndag, og uke 1 er uken med 1. januar. Derfor er ukenummeret der ofte ett nummer forskjellig." },
    ],
  },
  da: {
    home: "Forside",
    homeHref: "/da",
    crumbLabel: "Brødkrummer",
    toolName: "Ugenummer",
    ogLocale: "da_DK",
    metaTitle: (w, _y, range) => `Hvilken uge er det? Uge ${w} (${range})`,
    shortTitle: (w, y) => `Hvilken uge er det? Uge ${w} ${y}`,
    metaDescription: (today, w, y) =>
      `I dag er det ${today}, og vi er i uge ${w}. Find ugenummeret for en hvilken som helst dato, og se alle uger i ${y} med datoer efter ISO 8601.`,
    h1: (w) => `Hvilken uge er det? Lige nu er det uge ${w}`,
    intro: (today, w, range) =>
      `I dag er det ${today}, og vi er i uge ${w} (${range}). Find ugenummeret for en hvilken som helst dato, eller se hvilke datoer en bestemt uge dækker.`,
    date: "Dato",
    week: "Uge",
    year: "År",
    weekday: "Ugedag",
    weeksInYear: (y) => `Uger i ${y}`,
    invalidDate: "Indtast en gyldig dato.",
    weekOfYear: (w, y) => `Uge ${w} i ${y}`,
    mondayToSunday: (a, b) => `mandag ${a} til søndag ${b}`,
    validWeeks: (y, n) => `${y} har uge 1 til ${n}.`,
    tableTitle: (y) => `Alle uger i ${y}`,
    current: "nu",
    monday: "Mandag",
    sunday: "Søndag",
    rulesTitle: "Sådan tælles ugenumre i Danmark",
    rules: [
      "Danmark følger standarden ISO 8601 ligesom resten af Norden og det meste af Europa: en uge begynder mandag og slutter søndag. Uge 1 er den uge, der indeholder årets første torsdag, altså altid ugen med den 4. januar. Derfor kan 1.–3. januar stadig høre til sidste års sidste uge, og 29.–31. december allerede til uge 1 i det nye år.",
      "De fleste år har 52 uger. Et år har 53 uger, når det begynder på en torsdag, eller når et skudår begynder på en onsdag.",
    ],
    tocTitle: "Indhold",
    faqTitle: "Ofte stillede spørgsmål",
    relatedTitle: "Måske kan du også lide",
    related: [
      { href: "/da/sovnberegner", label: "Søvnberegner" },
      { href: "/da/kategorier/tid", label: "Omregn tidsenheder" },
    ],
    faq: (a) => [
      { question: "Hvilken uge er det?", answer: `I dag (${a.todayLong}) er det uge ${a.week}. Den varer fra mandag ${a.monday} til søndag ${a.sunday}.` },
      { question: `Hvor mange uger har ${a.year}?`, answer: `${a.year} har ${a.weeks} uger. ${a.weeks === 53 ? why53.da : `Et år har kun 53 uger, når det begynder på en torsdag, eller når et skudår begynder på en onsdag.`}` },
      { question: `Hvornår begynder uge 1 i ${a.nextYear}?`, answer: `Uge 1 i ${a.nextYear} begynder mandag den ${a.nextWeek1}. ${a.nextYear} har ${a.weeksNext} uger.` },
      { question: "Hvordan beregnes ugenummeret?", answer: "Efter ISO 8601 begynder hver uge mandag. Uge 1 er den uge, der indeholder årets første torsdag, altså altid ugen med den 4. januar." },
      { question: "Hvorfor viser en amerikansk kalender en anden uge?", answer: "I USA begynder ugen søndag, og uge 1 er ugen med den 1. januar. Derfor afviger ugenummeret der ofte med én." },
    ],
  },
};
