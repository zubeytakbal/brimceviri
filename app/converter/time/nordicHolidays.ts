// İsveç, Norveç ve Danimarka resmi tatilleri (helgdagar / helligdager / helligdage).
// Kaynak kurallar:
// - İsveç: Lag (1989:253) om allmänna helgdagar. Midsommardagen 20–26 Haziran
//   arasındaki cumartesi, Alla helgons dag 31 Ekim–6 Kasım arasındaki cumartesi.
//   Nationaldagen 2005'ten beri helgdag (annandag pingst'in yerine).
// - Norveç: Lov om helligdager og helligdagsfred (1995); 1. ve 17. Mayıs
//   "offentlige høytidsdager" (lov 1947).
// - Danimarka: Store bededag 2024'ten itibaren resmi tatil değil (2023 yasası).
// Paskalya'ya bağlı günler easterSunday (Gauss/anonim Gregoryen formül) ile.
import type { YMD } from "./calendars";
import { addDaysYmd, weekdayOf, ymdKey } from "./dateMath";
import { easterSunday } from "./germanHolidays";
import { midsommarafton } from "./nordicDays";
import type { NordicLocale } from "./nordicWeek";

export const NORDIC_HOLIDAY_PATHS: Record<NordicLocale, string> = {
  sv: "/sv/helgdagar",
  no: "/no/helligdager",
  da: "/da/helligdage",
};

/** holiday: resmi tatil. eve: resmi değil ama çoğu kişi için izinli (afton günleri vb.). */
export type NordicHoliday = { id: string; name: string; date: YMD; kind: "holiday" | "eve"; note: string };

const d = (year: number, month: number, day: number): YMD => ({ year, month, day });

/** İlk cumartesi: from gününden itibaren 7 gün içinde. */
function saturdayFrom(start: YMD): YMD {
  for (let i = 0; i < 7; i++) {
    const day = addDaysYmd(start, i);
    if (weekdayOf(day) === 6) return day;
  }
  throw new Error("unreachable");
}

function swedish(year: number): NordicHoliday[] {
  const easter = easterSunday(year);
  const e = (n: number) => addDaysYmd(easter, n);
  const list: NordicHoliday[] = [
    { id: "nyarsdagen", name: "Nyårsdagen", date: d(year, 1, 1), kind: "holiday", note: "Årets första dag." },
    { id: "trettondedag-jul", name: "Trettondedag jul", date: d(year, 1, 6), kind: "holiday", note: "Till minne av de tre vise männens besök. Kallas även trettondagen." },
    { id: "langfredagen", name: "Långfredagen", date: e(-2), kind: "holiday", note: "Fredagen före påskdagen." },
    { id: "paskafton", name: "Påskafton", date: e(-1), kind: "eve", note: "Lördagen före påskdagen. Ingen helgdag, men ledig för de flesta." },
    { id: "paskdagen", name: "Påskdagen", date: easter, kind: "holiday", note: "Söndagen efter den första fullmånen efter vårdagjämningen." },
    { id: "annandag-pask", name: "Annandag påsk", date: e(1), kind: "holiday", note: "Måndagen efter påskdagen." },
    { id: "forsta-maj", name: "Första maj", date: d(year, 5, 1), kind: "holiday", note: "Arbetarrörelsens dag, allmän helgdag sedan 1939." },
    { id: "kristi-himmelsfardsdag", name: "Kristi himmelsfärdsdag", date: e(39), kind: "holiday", note: "Torsdag, 39 dagar efter påskdagen." },
    { id: "pingstdagen", name: "Pingstdagen", date: e(49), kind: "holiday", note: "Söndag, 49 dagar efter påskdagen." },
    { id: "nationaldagen", name: "Sveriges nationaldag", date: d(year, 6, 6), kind: "holiday", note: "Allmän helgdag sedan 2005, då den ersatte annandag pingst." },
    { id: "midsommarafton", name: "Midsommarafton", date: midsommarafton(year), kind: "eve", note: "Fredagen mellan 19 och 25 juni. Likställs med söndag enligt semesterlagen." },
    { id: "midsommardagen", name: "Midsommardagen", date: saturdayFrom(d(year, 6, 20)), kind: "holiday", note: "Lördagen mellan 20 och 26 juni." },
    { id: "alla-helgons-dag", name: "Alla helgons dag", date: saturdayFrom(d(year, 10, 31)), kind: "holiday", note: "Lördagen mellan 31 oktober och 6 november." },
    { id: "julafton", name: "Julafton", date: d(year, 12, 24), kind: "eve", note: "Ingen helgdag, men likställs med söndag enligt semesterlagen." },
    { id: "juldagen", name: "Juldagen", date: d(year, 12, 25), kind: "holiday", note: "Firar Jesu födelse." },
    { id: "annandag-jul", name: "Annandag jul", date: d(year, 12, 26), kind: "holiday", note: "Dagen efter juldagen." },
    { id: "nyarsafton", name: "Nyårsafton", date: d(year, 12, 31), kind: "eve", note: "Ingen helgdag, men likställs med söndag enligt semesterlagen." },
  ];
  return list;
}

function norwegian(year: number): NordicHoliday[] {
  const easter = easterSunday(year);
  const e = (n: number) => addDaysYmd(easter, n);
  return [
    { id: "nyttarsdag", name: "1. nyttårsdag", date: d(year, 1, 1), kind: "holiday", note: "Årets første dag." },
    { id: "skjaertorsdag", name: "Skjærtorsdag", date: e(-3), kind: "holiday", note: "Torsdagen før påske, til minne om det siste måltidet." },
    { id: "langfredag", name: "Langfredag", date: e(-2), kind: "holiday", note: "Fredagen før 1. påskedag." },
    { id: "paskeaften", name: "Påskeaften", date: e(-1), kind: "eve", note: "Lørdagen før 1. påskedag. Ikke helligdag, men fri for de fleste." },
    { id: "forste-paskedag", name: "1. påskedag", date: easter, kind: "holiday", note: "Søndagen etter den første fullmånen etter vårjevndøgn." },
    { id: "andre-paskedag", name: "2. påskedag", date: e(1), kind: "holiday", note: "Mandagen etter 1. påskedag." },
    { id: "forste-mai", name: "1. mai", date: d(year, 5, 1), kind: "holiday", note: "Arbeidernes dag. Offentlig høytidsdag." },
    { id: "syttende-mai", name: "17. mai", date: d(year, 5, 17), kind: "holiday", note: "Grunnlovsdagen, til minne om Grunnloven av 1814. Offentlig høytidsdag." },
    { id: "kristi-himmelfartsdag", name: "Kristi himmelfartsdag", date: e(39), kind: "holiday", note: "Torsdag, 39 dager etter 1. påskedag." },
    { id: "forste-pinsedag", name: "1. pinsedag", date: e(49), kind: "holiday", note: "Søndag, 49 dager etter 1. påskedag." },
    { id: "andre-pinsedag", name: "2. pinsedag", date: e(50), kind: "holiday", note: "Mandagen etter 1. pinsedag." },
    { id: "julaften", name: "Julaften", date: d(year, 12, 24), kind: "eve", note: "Ikke helligdag, men mange arbeidsplasser stenger tidlig." },
    { id: "forste-juledag", name: "1. juledag", date: d(year, 12, 25), kind: "holiday", note: "Feirer Jesu fødsel." },
    { id: "andre-juledag", name: "2. juledag", date: d(year, 12, 26), kind: "holiday", note: "Dagen etter 1. juledag." },
    { id: "nyttarsaften", name: "Nyttårsaften", date: d(year, 12, 31), kind: "eve", note: "Ikke helligdag, men mange arbeidsplasser stenger tidlig." },
  ];
}

function danish(year: number): NordicHoliday[] {
  const easter = easterSunday(year);
  const e = (n: number) => addDaysYmd(easter, n);
  const list: NordicHoliday[] = [
    { id: "nytarsdag", name: "Nytårsdag", date: d(year, 1, 1), kind: "holiday", note: "Årets første dag." },
    { id: "skaertorsdag", name: "Skærtorsdag", date: e(-3), kind: "holiday", note: "Torsdagen før påske, til minde om den sidste nadver." },
    { id: "langfredag", name: "Langfredag", date: e(-2), kind: "holiday", note: "Fredagen før påskedag." },
    { id: "paskedag", name: "Påskedag", date: easter, kind: "holiday", note: "Søndagen efter den første fuldmåne efter forårsjævndøgn." },
    { id: "anden-paskedag", name: "2. påskedag", date: e(1), kind: "holiday", note: "Mandagen efter påskedag." },
    { id: "kristi-himmelfartsdag", name: "Kristi himmelfartsdag", date: e(39), kind: "holiday", note: "Torsdag, 39 dage efter påskedag." },
    { id: "pinsedag", name: "Pinsedag", date: e(49), kind: "holiday", note: "Søndag, 49 dage efter påskedag." },
    { id: "anden-pinsedag", name: "2. pinsedag", date: e(50), kind: "holiday", note: "Mandagen efter pinsedag." },
    { id: "grundlovsdag", name: "Grundlovsdag", date: d(year, 6, 5), kind: "eve", note: "Til minde om grundloven af 1849. Ikke en officiel helligdag, men mange har helt eller halvt fri efter overenskomst." },
    { id: "juleaften", name: "Juleaften", date: d(year, 12, 24), kind: "eve", note: "Ikke en officiel helligdag, men fri for de fleste." },
    { id: "juledag", name: "Juledag", date: d(year, 12, 25), kind: "holiday", note: "Fejrer Jesu fødsel. Kaldes også 1. juledag." },
    { id: "anden-juledag", name: "2. juledag", date: d(year, 12, 26), kind: "holiday", note: "Dagen efter juledag." },
    { id: "nytarsaften", name: "Nytårsaften", date: d(year, 12, 31), kind: "eve", note: "Ikke en officiel helligdag, men mange har fri." },
  ];
  // Store bededag: 4. fredag efter påske; afskaffet som helligdag fra og med 2024.
  if (year <= 2023) list.push({ id: "store-bededag", name: "Store bededag", date: e(26), kind: "holiday", note: "Fjerde fredag efter påske. Afskaffet som helligdag fra og med 2024." });
  return list;
}

export function nordicHolidays(locale: NordicLocale, year: number): NordicHoliday[] {
  const list = locale === "sv" ? swedish(year) : locale === "no" ? norwegian(year) : danish(year);
  return list.sort((a, b) => ymdKey(a.date).localeCompare(ymdKey(b.date)));
}

/** Hafta sonu ya da resmi tatil. */
function isOff(date: YMD, holidays: Set<string>) {
  const wd = weekdayOf(date);
  return wd === 0 || wd === 6 || holidays.has(ymdKey(date));
}

/** Köprü günleri (klämdag / inneklemt dag / klemmedag): iki izin günü arasında kalan hafta içi gün. */
export function bridgeDays(locale: NordicLocale, year: number): YMD[] {
  const list = nordicHolidays(locale, year).filter((h) => h.kind === "holiday");
  const holidays = new Set(list.map((h) => ymdKey(h.date)));
  const result: YMD[] = [];
  for (const h of list) {
    for (const candidate of [addDaysYmd(h.date, -1), addDaysYmd(h.date, 1)]) {
      if (candidate.year !== year || isOff(candidate, holidays)) continue;
      if (isOff(addDaysYmd(candidate, -1), holidays) && isOff(addDaysYmd(candidate, 1), holidays)) {
        if (!result.some((r) => ymdKey(r) === ymdKey(candidate))) result.push(candidate);
      }
    }
  }
  return result.sort((a, b) => ymdKey(a).localeCompare(ymdKey(b)));
}

/** Resmi tatillerden hafta içine (pazartesi–cuma) denk gelenlerin sayısı. */
export function weekdayHolidayCount(locale: NordicLocale, year: number) {
  return nordicHolidays(locale, year).filter((h) => h.kind === "holiday" && weekdayOf(h.date) >= 1 && weekdayOf(h.date) <= 5).length;
}

type Copy = {
  metaTitle: (year: number) => string;
  description: (year: number) => string;
  crumb: string;
  h1: (year: number) => string;
  intro: string;
  yearLabel: string;
  colDate: string;
  colDay: string;
  colName: string;
  colLeft: string;
  today: string;
  eveBadge: string;
  next: string;
  tableTitle: (year: number) => string;
  summary: (year: number, holidays: number, onWeekdays: number) => string;
  bridgeTitle: (year: number) => string;
  bridgeIntro: string;
  noBridge: string;
  sections: Array<{ id: string; title: string; paragraphs: string[] }>;
  faq: (year: number, easter: string, firstHoliday: string) => Array<{ question: string; answer: string }>;
};

export const NORDIC_HOLIDAY_COPY: Record<NordicLocale, Copy> = {
  sv: {
    metaTitle: (y) => `Röda dagar ${y} – alla helgdagar i Sverige`,
    description: (y) => `Alla röda dagar och helgdagar i Sverige ${y} med datum och veckodag: påsk, midsommar, nationaldagen och jul. Med klämdagar och aftnar.`,
    crumb: "Röda dagar",
    h1: (y) => `Röda dagar ${y} i Sverige`,
    intro: "Här ser du alla allmänna helgdagar i Sverige med datum och veckodag, plus aftnar som julafton och midsommarafton som de flesta är lediga. Välj ett annat år för att se när påsk och midsommar infaller.",
    yearLabel: "År",
    colDate: "Datum",
    colDay: "Veckodag",
    colName: "Helgdag",
    colLeft: "Dagar kvar",
    today: "I dag",
    eveBadge: "afton",
    next: "Nästa röda dag",
    tableTitle: (y) => `Helgdagar ${y}`,
    summary: (y, n, w) => `${y} har Sverige ${n} allmänna helgdagar. ${w} av dem infaller en vardag (måndag–fredag).`,
    bridgeTitle: (y) => `Klämdagar ${y}`,
    bridgeIntro: "En klämdag är en vardag som ligger mellan en helgdag och en helg. Många tar ledigt då och får en lång ledighet för en semesterdag.",
    noBridge: "Inga klämdagar detta år.",
    sections: [
      {
        id: "regler",
        title: "Hur bestäms helgdagarna?",
        paragraphs: [
          "De allmänna helgdagarna står i lagen (1989:253) om allmänna helgdagar. Vissa har fast datum, som juldagen och nationaldagen den 6 juni. Andra följer påsken: långfredagen, annandag påsk, Kristi himmelsfärdsdag och pingstdagen.",
          "Påskdagen är söndagen efter den första fullmånen efter vårdagjämningen och infaller mellan 22 mars och 25 april. Midsommardagen är lördagen mellan 20 och 26 juni, och Alla helgons dag är lördagen mellan 31 oktober och 6 november.",
        ],
      },
      {
        id: "aftnar",
        title: "Aftnar: julafton, nyårsafton och midsommarafton",
        paragraphs: [
          "Julafton, nyårsafton och midsommarafton är inte allmänna helgdagar, men enligt semesterlagen likställs de med söndag. I praktiken är de lediga för de flesta som arbetar måndag–fredag.",
          "Söndagar räknas också som helgdagar, så påskdagen och pingstdagen ger ingen extra ledig dag.",
        ],
      },
    ],
    faq: (y, easter, first) => [
      { question: `När är påsk ${y}?`, answer: `Påskdagen ${y} infaller ${easter}. Långfredagen är två dagar tidigare och annandag påsk dagen efter.` },
      { question: "Är julafton en röd dag?", answer: "Nej, julafton är ingen allmän helgdag, men enligt semesterlagen räknas den som söndag. De flesta har ledigt." },
      { question: "Varför är annandag pingst inte längre röd dag?", answer: "När nationaldagen den 6 juni blev allmän helgdag 2005 togs annandag pingst bort som helgdag." },
      { question: `Vilken är första röda dagen ${y}?`, answer: `Den första helgdagen är ${first}.` },
    ],
  },
  no: {
    metaTitle: (y) => `Røde dager ${y} – alle helligdager i Norge`,
    description: (y) => `Alle røde dager og helligdager i Norge ${y} med dato og ukedag: påske, 17. mai, pinse og jul. Med inneklemte dager.`,
    crumb: "Røde dager",
    h1: (y) => `Røde dager ${y} i Norge`,
    intro: "Her ser du alle helligdager og offentlige høytidsdager i Norge med dato og ukedag. Velg et annet år for å se når påsken og pinsen faller.",
    yearLabel: "År",
    colDate: "Dato",
    colDay: "Ukedag",
    colName: "Helligdag",
    colLeft: "Dager igjen",
    today: "I dag",
    eveBadge: "aften",
    next: "Neste røde dag",
    tableTitle: (y) => `Helligdager ${y}`,
    summary: (y, n, w) => `I ${y} har Norge ${n} helligdager og høytidsdager. ${w} av dem faller på en hverdag (mandag–fredag).`,
    bridgeTitle: (y) => `Inneklemte dager ${y}`,
    bridgeIntro: "En inneklemt dag er en hverdag mellom en helligdag og en helg. Mange tar fri da og får en lang fridag for én feriedag.",
    noBridge: "Ingen inneklemte dager dette året.",
    sections: [
      {
        id: "regler",
        title: "Hvordan bestemmes helligdagene?",
        paragraphs: [
          "Helligdagene står i lov om helligdager og helligdagsfred. I tillegg er 1. mai og 17. mai offentlige høytidsdager. Noen dager har fast dato, som 17. mai og 1. juledag. Andre følger påsken: skjærtorsdag, langfredag, 2. påskedag, Kristi himmelfartsdag og pinsen.",
          "1. påskedag er søndagen etter den første fullmånen etter vårjevndøgn og faller mellom 22. mars og 25. april. Kristi himmelfartsdag kommer 39 dager senere, og 1. pinsedag 49 dager etter påske.",
        ],
      },
      {
        id: "aftener",
        title: "Julaften, nyttårsaften og påskeaften",
        paragraphs: [
          "Julaften, nyttårsaften og påskeaften er ikke helligdager. Mange arbeidsplasser stenger likevel tidlig, ofte etter tariffavtale.",
          "Søndager er også helligdager, så 1. påskedag og 1. pinsedag gir ingen ekstra fridag. Når 17. mai faller på en lørdag eller søndag, blir det heller ingen ekstra fridag.",
        ],
      },
    ],
    faq: (y, easter, first) => [
      { question: `Når er påsken ${y}?`, answer: `1. påskedag ${y} er ${easter}. Skjærtorsdag og langfredag er torsdagen og fredagen før, og 2. påskedag er dagen etter.` },
      { question: "Er skjærtorsdag en helligdag?", answer: "Ja, i Norge er skjærtorsdag en helligdag. I Sverige er den det ikke." },
      { question: "Er julaften en rød dag?", answer: "Nei, julaften er ikke en helligdag, men mange har fri fra midt på dagen." },
      { question: `Hva er første røde dag i ${y}?`, answer: `Den første helligdagen er ${first}.` },
    ],
  },
  da: {
    metaTitle: (y) => `Helligdage ${y} – alle helligdage i Danmark`,
    description: (y) => `Alle danske helligdage ${y} med dato og ugedag: påske, Kristi himmelfart, pinse og jul. Med grundlovsdag og klemmedage.`,
    crumb: "Helligdage",
    h1: (y) => `Helligdage ${y} i Danmark`,
    intro: "Her ser du alle officielle helligdage i Danmark med dato og ugedag, plus dage som grundlovsdag og juleaften, hvor mange har fri. Vælg et andet år for at se, hvornår påsken og pinsen falder.",
    yearLabel: "År",
    colDate: "Dato",
    colDay: "Ugedag",
    colName: "Helligdag",
    colLeft: "Dage tilbage",
    today: "I dag",
    eveBadge: "ikke officiel",
    next: "Næste helligdag",
    tableTitle: (y) => `Helligdage ${y}`,
    summary: (y, n, w) => `I ${y} har Danmark ${n} officielle helligdage. ${w} af dem falder på en hverdag (mandag–fredag).`,
    bridgeTitle: (y) => `Klemmedage ${y}`,
    bridgeIntro: "En klemmedag er en hverdag mellem en helligdag og en weekend. Mange holder fri og får en lang weekend for én feriedag. Den mest kendte er fredagen efter Kristi himmelfartsdag.",
    noBridge: "Ingen klemmedage i år.",
    sections: [
      {
        id: "regler",
        title: "Hvordan fastsættes helligdagene?",
        paragraphs: [
          "Nogle helligdage har fast dato, som nytårsdag og juledag. De fleste følger påsken: skærtorsdag, langfredag, 2. påskedag, Kristi himmelfartsdag og pinsen.",
          "Påskedag er søndagen efter den første fuldmåne efter forårsjævndøgn og falder mellem 22. marts og 25. april. Kristi himmelfartsdag ligger 39 dage efter påskedag og pinsedag 49 dage efter.",
        ],
      },
      {
        id: "store-bededag",
        title: "Store bededag og grundlovsdag",
        paragraphs: [
          "Store bededag var den fjerde fredag efter påske. Folketinget vedtog i 2023 at afskaffe den som helligdag, og fra og med 2024 er den en almindelig arbejdsdag.",
          "Grundlovsdag den 5. juni, 1. maj, juleaften og nytårsaften er ikke officielle helligdage. Mange har alligevel helt eller halvt fri efter deres overenskomst eller ansættelseskontrakt.",
        ],
      },
    ],
    faq: (y, easter, first) => [
      { question: `Hvornår er påske ${y}?`, answer: `Påskedag ${y} er ${easter}. Skærtorsdag og langfredag ligger før, og 2. påskedag er dagen efter.` },
      { question: "Er store bededag stadig en helligdag?", answer: "Nej. Store bededag blev afskaffet som helligdag fra og med 2024." },
      { question: "Er grundlovsdag en helligdag?", answer: "Nej, grundlovsdag er ikke en officiel helligdag, men mange har fri hele eller halvdelen af dagen efter overenskomst." },
      { question: `Hvad er den første helligdag i ${y}?`, answer: `Den første helligdag er ${first}.` },
    ],
  },
};
