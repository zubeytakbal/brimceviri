// İsveççe, Norveççe ve Danca "iki tarih arası gün" aracının metinleri ve
// "kaç gün kaldı" tablosundaki sabit tarihler. Tüm tarihler kurala bağlı
// (sabit gün ya da Paskalya/Midsommar formülü); yasa değişikliğine bağlı değil.
import type { YMD } from "./calendars";
import { addDaysYmd, diffDays, weekdayOf } from "./dateMath";
import { easterSunday } from "./germanHolidays";
import type { NordicLocale } from "./nordicWeek";

export const NORDIC_DAYS_PATHS: Record<NordicLocale, string> = {
  sv: "/sv/dagar-mellan-datum",
  no: "/no/dager-mellom-datoer",
  da: "/da/dage-mellem-datoer",
};

/** İsveç Midsommarafton: 19–25 Haziran arasındaki cuma. */
export function midsommarafton(year: number): YMD {
  for (let day = 19; day <= 25; day++) {
    const d = { year, month: 6, day };
    if (weekdayOf(d) === 5) return d;
  }
  throw new Error("unreachable");
}

type Target = { name: string; date: (year: number) => YMD };

const fixed = (month: number, day: number) => (year: number) => ({ year, month, day });

const TARGETS: Record<NordicLocale, Target[]> = {
  sv: [
    { name: "Julafton", date: fixed(12, 24) },
    { name: "Nyårsafton", date: fixed(12, 31) },
    { name: "Påskdagen", date: easterSunday },
    { name: "Midsommarafton", date: midsommarafton },
    { name: "Sveriges nationaldag", date: fixed(6, 6) },
  ],
  no: [
    { name: "Julaften", date: fixed(12, 24) },
    { name: "Nyttårsaften", date: fixed(12, 31) },
    { name: "Første påskedag", date: easterSunday },
    { name: "17. mai", date: fixed(5, 17) },
    { name: "Sankthansaften", date: fixed(6, 23) },
  ],
  da: [
    { name: "Juleaften", date: fixed(12, 24) },
    { name: "Nytårsaften", date: fixed(12, 31) },
    { name: "Påskedag", date: easterSunday },
    { name: "Grundlovsdag", date: fixed(6, 5) },
    { name: "Sankthansaften", date: fixed(6, 23) },
  ],
};

/** Bugünden itibaren her hedefin bir sonraki tarihi ve kalan gün, yakından uzağa. */
export function upcomingTargets(locale: NordicLocale, today: YMD) {
  return TARGETS[locale]
    .map((t) => {
      const thisYear = t.date(today.year);
      const date = diffDays(today, thisYear) >= 0 ? thisYear : t.date(today.year + 1);
      return { name: t.name, date, days: diffDays(today, date) };
    })
    .sort((a, b) => a.days - b.days);
}

export const DAYS_AHEAD = [7, 14, 30, 60, 90, 100, 180, 365];

export function daysAhead(today: YMD) {
  return DAYS_AHEAD.map((n) => ({ n, date: addDaysYmd(today, n) }));
}

export type NordicDaysCopy = {
  crumb: string;
  metaTitle: string;
  description: string;
  h1: string;
  intro: string;
  modeDiff: string;
  modeAdd: string;
  start: string;
  end: string;
  inclusive: string;
  days: string;
  weeksAndDays: (weeks: number, days: number) => string;
  ymd: string;
  ymdValue: (y: number, m: number, d: number) => string;
  weekdays: string;
  weekdaysNote: string;
  invalidDiff: string;
  base: string;
  amount: string;
  direction: string;
  plus: string;
  minus: string;
  result: string;
  week: string;
  invalidAdd: string;
  countdownTitle: string;
  occasion: string;
  date: string;
  daysFromToday: string;
  today: string;
  aheadTitle: (today: string) => string;
  inDays: (n: number) => string;
  faq: (a: { christmasName: string; christmasDate: string; christmasDays: number; today: string; in90: string }) => Array<{ question: string; answer: string }>;
};

export const NORDIC_DAYS_COPY: Record<NordicLocale, NordicDaysCopy> = {
  sv: {
    crumb: "Dagar mellan datum",
    metaTitle: "Räkna dagar mellan datum – dagräknare",
    description: "Hur många dagar är det mellan två datum? Räkna dagar, veckor, månader och år, eller lägg till och dra ifrån dagar. Med dagar kvar till julafton och midsommar.",
    h1: "Räkna dagar mellan datum",
    intro: "Räkna ut hur många dagar det är mellan två datum – i dagar, veckor samt år, månader och dagar – eller vilket datum det blir om ett visst antal dagar.",
    modeDiff: "Dagar mellan två datum",
    modeAdd: "Lägg till / dra ifrån dagar",
    start: "Startdatum",
    end: "Slutdatum",
    inclusive: "Räkna med slutdatumet",
    days: "Antal dagar",
    weeksAndDays: (w, d) => `${w} veckor och ${d} dagar`,
    ymd: "År, månader, dagar",
    ymdValue: (y, m, d) => `${y} år, ${m} mån, ${d} d`,
    weekdays: "Vardagar mån–fre",
    weekdaysNote: "helgdagar är inte borträknade",
    invalidDiff: "Ange två giltiga datum.",
    base: "Utgångsdatum",
    amount: "Dagar",
    direction: "Riktning",
    plus: "plus",
    minus: "minus",
    result: "Resultat",
    week: "Vecka",
    invalidAdd: "Ange ett giltigt datum och ett heltal.",
    countdownTitle: "Hur många dagar kvar till …?",
    occasion: "Tillfälle",
    date: "Datum",
    daysFromToday: "Dagar från idag",
    today: "idag",
    aheadTitle: (t) => `Datum om X dagar (från ${t})`,
    inDays: (n) => `Om ${n} dagar`,
    faq: (a) => [
      { question: "Hur räknar man dagar mellan två datum?", answer: "Dra det tidigare datumet från det senare; räknaren tar hänsyn till månadernas längd och skottår. Som standard räknas bara en av de två dagarna (1–2 januari = 1 dag). Kryssa i rutan om slutdatumet ska räknas med." },
      { question: `Hur många dagar är det kvar till ${a.christmasName.toLowerCase()}?`, answer: `Till ${a.christmasName.toLowerCase()} (${a.christmasDate}) är det ${a.christmasDays} dagar kvar från idag.` },
      { question: "Vilket datum är det om 90 dagar?", answer: `Från idag (${a.today}) blir det ${a.in90}.` },
    ],
  },
  no: {
    crumb: "Dager mellom datoer",
    metaTitle: "Regn ut dager mellom datoer – dagskalkulator",
    description: "Hvor mange dager er det mellom to datoer? Regn ut dager, uker, måneder og år, eller legg til og trekk fra dager. Med dager igjen til julaften og 17. mai.",
    h1: "Regn ut dager mellom datoer",
    intro: "Regn ut hvor mange dager det er mellom to datoer – i dager, uker og år, måneder og dager – eller hvilken dato det blir om et bestemt antall dager.",
    modeDiff: "Dager mellom to datoer",
    modeAdd: "Legg til / trekk fra dager",
    start: "Startdato",
    end: "Sluttdato",
    inclusive: "Ta med sluttdatoen",
    days: "Antall dager",
    weeksAndDays: (w, d) => `${w} uker og ${d} dager`,
    ymd: "År, måneder, dager",
    ymdValue: (y, m, d) => `${y} år, ${m} mnd, ${d} d`,
    weekdays: "Hverdager man–fre",
    weekdaysNote: "helligdager er ikke trukket fra",
    invalidDiff: "Skriv inn to gyldige datoer.",
    base: "Utgangsdato",
    amount: "Dager",
    direction: "Retning",
    plus: "pluss",
    minus: "minus",
    result: "Resultat",
    week: "Uke",
    invalidAdd: "Skriv inn en gyldig dato og et heltall.",
    countdownTitle: "Hvor mange dager er det igjen til …?",
    occasion: "Anledning",
    date: "Dato",
    daysFromToday: "Dager fra i dag",
    today: "i dag",
    aheadTitle: (t) => `Dato om X dager (fra ${t})`,
    inDays: (n) => `Om ${n} dager`,
    faq: (a) => [
      { question: "Hvordan regner man ut dager mellom to datoer?", answer: "Trekk den tidligste datoen fra den seneste; kalkulatoren tar hensyn til månedenes lengde og skuddår. Som standard telles bare én av de to dagene (1.–2. januar = 1 dag). Kryss av i ruten hvis sluttdatoen skal telles med." },
      { question: `Hvor mange dager er det igjen til ${a.christmasName.toLowerCase()}?`, answer: `Til ${a.christmasName.toLowerCase()} (${a.christmasDate}) er det ${a.christmasDays} dager igjen fra i dag.` },
      { question: "Hvilken dato er det om 90 dager?", answer: `Fra i dag (${a.today}) blir det ${a.in90}.` },
    ],
  },
  da: {
    crumb: "Dage mellem datoer",
    metaTitle: "Beregn dage mellem datoer – dageberegner",
    description: "Hvor mange dage er der mellem to datoer? Beregn dage, uger, måneder og år, eller læg dage til og træk dage fra. Med dage til juleaften og grundlovsdag.",
    h1: "Beregn dage mellem datoer",
    intro: "Beregn, hvor mange dage der er mellem to datoer – i dage, uger samt år, måneder og dage – eller hvilken dato det bliver om et bestemt antal dage.",
    modeDiff: "Dage mellem to datoer",
    modeAdd: "Læg til / træk fra dage",
    start: "Startdato",
    end: "Slutdato",
    inclusive: "Medregn slutdatoen",
    days: "Antal dage",
    weeksAndDays: (w, d) => `${w} uger og ${d} dage`,
    ymd: "År, måneder, dage",
    ymdValue: (y, m, d) => `${y} år, ${m} mdr., ${d} d.`,
    weekdays: "Hverdage man.–fre.",
    weekdaysNote: "helligdage er ikke trukket fra",
    invalidDiff: "Indtast to gyldige datoer.",
    base: "Udgangsdato",
    amount: "Dage",
    direction: "Retning",
    plus: "plus",
    minus: "minus",
    result: "Resultat",
    week: "Uge",
    invalidAdd: "Indtast en gyldig dato og et helt tal.",
    countdownTitle: "Hvor mange dage er der til …?",
    occasion: "Anledning",
    date: "Dato",
    daysFromToday: "Dage fra i dag",
    today: "i dag",
    aheadTitle: (t) => `Dato om X dage (fra ${t})`,
    inDays: (n) => `Om ${n} dage`,
    faq: (a) => [
      { question: "Hvordan beregner man dage mellem to datoer?", answer: "Træk den tidligste dato fra den seneste; beregneren tager højde for månedernes længde og skudår. Som standard tælles kun én af de to dage (1.–2. januar = 1 dag). Sæt flueben, hvis slutdatoen skal medregnes." },
      { question: `Hvor mange dage er der til ${a.christmasName.toLowerCase()}?`, answer: `Til ${a.christmasName.toLowerCase()} (${a.christmasDate}) er der ${a.christmasDays} dage fra i dag.` },
      { question: "Hvilken dato er det om 90 dage?", answer: `Fra i dag (${a.today}) bliver det ${a.in90}.` },
    ],
  },
};
