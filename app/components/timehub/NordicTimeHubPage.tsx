// İsveççe, Norveççe ve Danca "Tid och datum / Tid og dato" bölüm ana sayfası:
// canlı saat, kuzey şehirleri dahil güneş saatleri (gece yarısı güneşi ve kutup
// gecesi), bugünün bilgileri, sıradaki tatiller ve tüm saat-takvim araçları.
import Link from "@/app/components/SiteLink";
import type { FaqItem } from "../../converter/faqSchema";
import { NORDIC_FUEL_PATHS } from "../../converter/fuel/nordicFuel";
import type { YMD } from "../../converter/time/calendars";
import { addDaysYmd, dayOfYear, diffDays, isoWeek, weekdayOf, ymdKey } from "../../converter/time/dateMath";
import { todayBerlin } from "../../converter/time/germanDates";
import { moonState, phaseName, type PhaseName } from "../../converter/time/moon";
import { NORDIC_DAYS_PATHS } from "../../converter/time/nordicDays";
import { NORDIC_HOLIDAY_PATHS, nordicHolidays } from "../../converter/time/nordicHolidays";
import { formatNordicDate, formatNordicLong, NORDIC_WEEK_PATHS, type NordicLocale } from "../../converter/time/nordicWeek";
import { cityNameNordic, cityPathNordic, NORDIC_WORLD_BASE } from "../../converter/time/nordicWorld";
import { worldCities } from "../../converter/time/worldCities";
import { sleepGuidePaths } from "../../i18n/sleepGuidePaths";
import { timeToolPaths } from "../../i18n/timeToolPaths";
import { DecorativeIcon, type SiteIconName } from "../siteIcons";
import { NORDIC_TIME_LABELS, NORDIC_TIME_PATHS, NORDIC_TIME_UI } from "../time/nordicTimeCopy";
import TimeToolPage from "../time/TimeToolPage";
import DayNightMap from "./DayNightMap";
import { TIME_HUB_PATHS } from "./timeHubPaths";
import TimeHubHero, { type HubHeroCopy, type HubPlace } from "./TimeHubHero";

export const NORDIC_TIME_HUB_PATHS: Record<NordicLocale, string> = { sv: TIME_HUB_PATHS.sv, no: TIME_HUB_PATHS.no, da: TIME_HUB_PATHS.da };

const TIME_ZONE: Record<NordicLocale, string> = { sv: "Europe/Stockholm", no: "Europe/Oslo", da: "Europe/Copenhagen" };
const INTL: Record<NordicLocale, string> = { sv: "sv-SE", no: "nb-NO", da: "da-DK" };

// Koordinatlar: şehir merkezleri (GeoNames), iki ondalık basamak yeterli.
const PLACES: Record<NordicLocale, HubPlace[]> = {
  sv: [
    { id: "stockholm", name: "Stockholm", lat: 59.33, lon: 18.07 },
    { id: "goteborg", name: "Göteborg", lat: 57.71, lon: 11.97 },
    { id: "malmo", name: "Malmö", lat: 55.61, lon: 13.0 },
    { id: "uppsala", name: "Uppsala", lat: 59.86, lon: 17.64 },
    { id: "linkoping", name: "Linköping", lat: 58.41, lon: 15.62 },
    { id: "orebro", name: "Örebro", lat: 59.28, lon: 15.21 },
    { id: "sundsvall", name: "Sundsvall", lat: 62.39, lon: 17.31 },
    { id: "ostersund", name: "Östersund", lat: 63.18, lon: 14.64 },
    { id: "umea", name: "Umeå", lat: 63.83, lon: 20.26 },
    { id: "lulea", name: "Luleå", lat: 65.58, lon: 22.15 },
    { id: "kiruna", name: "Kiruna", lat: 67.86, lon: 20.23 },
  ],
  no: [
    { id: "oslo", name: "Oslo", lat: 59.91, lon: 10.75 },
    { id: "bergen", name: "Bergen", lat: 60.39, lon: 5.32 },
    { id: "trondheim", name: "Trondheim", lat: 63.43, lon: 10.4 },
    { id: "stavanger", name: "Stavanger", lat: 58.97, lon: 5.73 },
    { id: "kristiansand", name: "Kristiansand", lat: 58.16, lon: 8.02 },
    { id: "alesund", name: "Ålesund", lat: 62.47, lon: 6.15 },
    { id: "bodo", name: "Bodø", lat: 67.28, lon: 14.4 },
    { id: "tromso", name: "Tromsø", lat: 69.65, lon: 18.96 },
    { id: "alta", name: "Alta", lat: 69.97, lon: 23.27 },
    { id: "hammerfest", name: "Hammerfest", lat: 70.66, lon: 23.68 },
    { id: "longyearbyen", name: "Longyearbyen", lat: 78.22, lon: 15.63 },
  ],
  da: [
    { id: "kobenhavn", name: "København", lat: 55.68, lon: 12.57 },
    { id: "aarhus", name: "Aarhus", lat: 56.16, lon: 10.2 },
    { id: "odense", name: "Odense", lat: 55.4, lon: 10.4 },
    { id: "aalborg", name: "Aalborg", lat: 57.05, lon: 9.92 },
    { id: "esbjerg", name: "Esbjerg", lat: 55.48, lon: 8.46 },
    { id: "randers", name: "Randers", lat: 56.46, lon: 10.04 },
    { id: "kolding", name: "Kolding", lat: 55.49, lon: 9.47 },
    { id: "skagen", name: "Skagen", lat: 57.72, lon: 10.58 },
    { id: "ronne", name: "Rønne (Bornholm)", lat: 55.1, lon: 14.71 },
  ],
};

const STRIP = ["new-york", "london", "istanbul", "dubai", "bangkok", "beijing", "tokyo", "sydney", "los-angeles"];
const MAP = ["london", "new-york", "los-angeles", "sao-paulo", "cairo", "istanbul", "moscow", "new-delhi", "beijing", "tokyo", "sydney"];
const HOME_CITY: Record<NordicLocale, string> = { sv: "stockholm", no: "oslo", da: "copenhagen" };

const MOON: Record<NordicLocale, Record<PhaseName, string>> = {
  sv: { new: "Nymåne", "waxing-crescent": "Tilltagande skära", first: "Första kvarteret", "waxing-gibbous": "Tilltagande måne", full: "Fullmåne", "waning-gibbous": "Avtagande måne", last: "Sista kvarteret", "waning-crescent": "Avtagande skära" },
  no: { new: "Nymåne", "waxing-crescent": "Voksende månesigd", first: "Første kvarter", "waxing-gibbous": "Voksende måne", full: "Fullmåne", "waning-gibbous": "Minkende måne", last: "Siste kvarter", "waning-crescent": "Minkende månesigd" },
  da: { new: "Nymåne", "waxing-crescent": "Tiltagende månesegl", first: "Første kvarter", "waxing-gibbous": "Tiltagende måne", full: "Fuldmåne", "waning-gibbous": "Aftagende måne", last: "Sidste kvarter", "waning-crescent": "Aftagende månesegl" },
};

type Copy = {
  crumb: string;
  title: string;
  metaTitle: string;
  description: string;
  h1: string;
  intro: string;
  hero: HubHeroCopy;
  today: (date: string) => string;
  week: string;
  year: string;
  dayOfYear: (n: number) => string;
  daysLeft: (n: number) => string;
  moon: string;
  lit: (pct: number) => string;
  clockChange: string;
  toSummer: string;
  toWinter: string;
  forward: string;
  back: string;
  nextHoliday: string;
  inDays: (n: number) => string;
  todayWord: string;
  mapTitle: string;
  mapText: string;
  mapAria: string;
  day: string;
  night: string;
  upcomingTitle: string;
  upcomingLinks: string;
  eve: string;
  holiday: string;
  toolsTitle: string;
  groups: { clock: string; calendar: string; world: string; more: string };
  notes: Record<string, string>;
  labels: { days: string; week: string; holidays: string; sleep: string; fuel: string; world: string; tz: string };
  faq: (week: number) => FaqItem[];
};

const COPY: Record<NordicLocale, Copy> = {
  sv: {
    crumb: "Tid och datum",
    title: "Tid och datum",
    metaTitle: "Vad är klockan? Tid i Sverige, datum och veckonummer",
    description: "Klockan i Sverige just nu, dagens datum och veckonummer, soluppgång och solnedgång från Malmö till Kiruna, månfas, nästa röda dag och alla verktyg för tid och kalender.",
    h1: "Tid och datum",
    intro: "Vad är klockan i Sverige, vilken vecka är det och när är nästa röda dag? Här finns en klocka i realtid, soltider från Malmö till Kiruna, månfas och alla verktyg för tid och kalender på ett ställe.",
    hero: {
      ariaLabel: "Aktuell tid",
      zoneLabel: "Svensk tid",
      dateLine: "{date} · vecka {week} · dag {doy} av året",
      deviceTime: "Klockan på din enhet: {time} ({zone})",
      sun: "Solen",
      placeLabel: "Välj ort",
      dayLength: "{h} tim {m} min dagsljus",
      same: "samma tid",
      hourAbbr: "tim",
      polarDay: "Midnattssol – solen går inte ner",
      polarNight: "Polarnatt – solen går inte upp",
    },
    today: (d) => `I dag: ${d}`,
    week: "Vecka",
    year: "Året",
    dayOfYear: (n) => `Dag ${n}`,
    daysLeft: (n) => `${n} dagar kvar till nyår`,
    moon: "Månen",
    lit: (p) => `${p} % belyst`,
    clockChange: "Tidsomställning",
    toSummer: "Sommartid",
    toWinter: "Normaltid (vintertid)",
    forward: "klockan ställs fram från 02 till 03",
    back: "klockan ställs tillbaka från 03 till 02",
    nextHoliday: "Nästa röda dag",
    inDays: (n) => `om ${n} dagar`,
    todayWord: "i dag",
    mapTitle: "Var är det dag och var är det natt just nu?",
    mapText: "Det mörka området visar var det är natt just nu, och den gula pricken visar var solen står i zenit. Kartan uppdateras varje minut. Mellan höstdagjämningen (22–23 september) och vårdagjämningen (20–21 mars) är nätterna längre än dagarna på norra halvklotet.",
    mapAria: "Världskarta med dag och natt",
    day: "dag",
    night: "natt",
    upcomingTitle: "Snart",
    upcomingLinks: "Alla röda dagar",
    eve: "afton",
    holiday: "helgdag",
    toolsTitle: "Alla verktyg för tid och datum",
    groups: { clock: "Klocka och timer", calendar: "Kalender", world: "Världen", more: "Mer" },
    notes: { clock: "Klocka i realtid", alarm: "Väckning i webbläsaren", timer: "Nedräkning med signal", stopwatch: "Med varvtider", pomodoro: "25 + 5 minuter", interval: "Tabata och HIIT", days: "Räkna dagar och datum", week: "Aktuellt veckonummer", holidays: "Med klämdagar", world: "Tid i 97 städer", tz: "Med mötesplanerare", sleep: "När ska du sova?", fuel: "Bränsle och resekostnad" },
    labels: { days: "Dagar mellan datum", week: "Veckonummer", holidays: "Röda dagar", sleep: "Sömnkalkylator", fuel: "Liter per mil", world: "Världsklocka", tz: "Tidsskillnad" },
    faq: (w) => [
      { question: "Vilken tidszon har Sverige?", answer: "Sverige har centraleuropeisk tid (CET, UTC+1) på vintern och centraleuropeisk sommartid (CEST, UTC+2) på sommaren. Klockan ställs om sista söndagen i mars och sista söndagen i oktober." },
      { question: "Hur räknas veckonumret?", answer: `Sverige följer ISO 8601: veckan börjar på måndag och vecka 1 är den vecka som innehåller årets första torsdag. Just nu är det vecka ${w}.` },
      { question: "Var i Sverige finns midnattssol?", answer: "Norr om polcirkeln, till exempel i Kiruna, går solen inte ner under några veckor runt midsommar. På vintern råder polarnatt där i stället. Välj Kiruna ovan för att se dagens soltider." },
    ],
  },
  no: {
    crumb: "Tid og dato",
    title: "Tid og dato",
    metaTitle: "Hva er klokka? Tid i Norge, dato og ukenummer",
    description: "Klokka i Norge akkurat nå, dagens dato og ukenummer, soloppgang og solnedgang fra Kristiansand til Longyearbyen, månefase, neste røde dag og alle verktøy for tid og kalender.",
    h1: "Tid og dato",
    intro: "Hva er klokka i Norge, hvilken uke er det og når er neste røde dag? Her finner du klokke i sanntid, soltider fra Kristiansand til Svalbard, månefase og alle verktøy for tid og kalender samlet.",
    hero: {
      ariaLabel: "Nåværende tid",
      zoneLabel: "Norsk tid",
      dateLine: "{date} · uke {week} · dag {doy} i året",
      deviceTime: "Klokka på enheten din: {time} ({zone})",
      sun: "Sola",
      placeLabel: "Velg sted",
      dayLength: "{h} t {m} min dagslys",
      same: "samme tid",
      hourAbbr: "t",
      polarDay: "Midnattssol – sola går ikke ned",
      polarNight: "Mørketid – sola går ikke opp",
    },
    today: (d) => `I dag: ${d}`,
    week: "Uke",
    year: "Året",
    dayOfYear: (n) => `Dag ${n}`,
    daysLeft: (n) => `${n} dager igjen til nyttår`,
    moon: "Månen",
    lit: (p) => `${p} % opplyst`,
    clockChange: "Tidsomstilling",
    toSummer: "Sommertid",
    toWinter: "Normaltid (vintertid)",
    forward: "klokka stilles fram fra 02 til 03",
    back: "klokka stilles tilbake fra 03 til 02",
    nextHoliday: "Neste røde dag",
    inDays: (n) => `om ${n} dager`,
    todayWord: "i dag",
    mapTitle: "Hvor er det dag og hvor er det natt akkurat nå?",
    mapText: "Det mørke området viser hvor det er natt akkurat nå, og den gule prikken viser hvor sola står i senit. Kartet oppdateres hvert minutt. Mellom høstjevndøgn (22.–23. september) og vårjevndøgn (20.–21. mars) er nettene lengre enn dagene på den nordlige halvkule.",
    mapAria: "Verdenskart med dag og natt",
    day: "dag",
    night: "natt",
    upcomingTitle: "Snart",
    upcomingLinks: "Alle røde dager",
    eve: "aften",
    holiday: "helligdag",
    toolsTitle: "Alle verktøy for tid og dato",
    groups: { clock: "Klokke og timer", calendar: "Kalender", world: "Verden", more: "Mer" },
    notes: { clock: "Klokke i sanntid", alarm: "Vekking i nettleseren", timer: "Nedtelling med signal", stopwatch: "Med rundetider", pomodoro: "25 + 5 minutter", interval: "Tabata og HIIT", days: "Regn ut dager og datoer", week: "Gjeldende ukenummer", holidays: "Med inneklemte dager", world: "Tid i 97 byer", tz: "Med møteplanlegger", sleep: "Når bør du legge deg?", fuel: "Drivstoff og turkostnad" },
    labels: { days: "Dager mellom datoer", week: "Ukenummer", holidays: "Røde dager", sleep: "Søvnkalkulator", fuel: "Liter per mil", world: "Verdensklokke", tz: "Tidsforskjell" },
    faq: (w) => [
      { question: "Hvilken tidssone har Norge?", answer: "Norge har sentraleuropeisk tid (CET, UTC+1) om vinteren og sentraleuropeisk sommertid (CEST, UTC+2) om sommeren. Klokka stilles om siste søndag i mars og siste søndag i oktober." },
      { question: "Hvordan telles ukenummeret?", answer: `Norge følger ISO 8601: uka begynner på mandag, og uke 1 er uka som inneholder årets første torsdag. Nå er det uke ${w}.` },
      { question: "Hvor i Norge er det midnattssol og mørketid?", answer: "Nord for polarsirkelen, for eksempel i Bodø og Tromsø, går sola ikke ned på sommeren og ikke opp i mørketida om vinteren. Velg et sted ovenfor for å se dagens soltider." },
    ],
  },
  da: {
    crumb: "Tid og dato",
    title: "Tid og dato",
    metaTitle: "Hvad er klokken? Tid i Danmark, dato og ugenummer",
    description: "Klokken i Danmark lige nu, dagens dato og ugenummer, solopgang og solnedgang fra Skagen til Bornholm, månefase, næste helligdag og alle værktøjer til tid og kalender.",
    h1: "Tid og dato",
    intro: "Hvad er klokken i Danmark, hvilken uge er det, og hvornår er næste helligdag? Her finder du et ur i realtid, solopgang og solnedgang fra Skagen til Bornholm, månefase og alle værktøjer til tid og kalender samlet.",
    hero: {
      ariaLabel: "Aktuel tid",
      zoneLabel: "Dansk tid",
      dateLine: "{date} · uge {week} · dag {doy} i året",
      deviceTime: "Klokken på din enhed: {time} ({zone})",
      sun: "Solen",
      placeLabel: "Vælg by",
      dayLength: "{h} t {m} min dagslys",
      same: "samme tid",
      hourAbbr: "t",
    },
    today: (d) => `I dag: ${d}`,
    week: "Uge",
    year: "Året",
    dayOfYear: (n) => `Dag ${n}`,
    daysLeft: (n) => `${n} dage til nytår`,
    moon: "Månen",
    lit: (p) => `${p} % belyst`,
    clockChange: "Tidsomstilling",
    toSummer: "Sommertid",
    toWinter: "Normaltid (vintertid)",
    forward: "uret stilles frem fra 02 til 03",
    back: "uret stilles tilbage fra 03 til 02",
    nextHoliday: "Næste helligdag",
    inDays: (n) => `om ${n} dage`,
    todayWord: "i dag",
    mapTitle: "Hvor er det dag, og hvor er det nat lige nu?",
    mapText: "Det mørke område viser, hvor det er nat lige nu, og den gule prik viser, hvor solen står i zenit. Kortet opdateres hvert minut. Mellem efterårsjævndøgn (22.–23. september) og forårsjævndøgn (20.–21. marts) er nætterne længere end dagene på den nordlige halvkugle.",
    mapAria: "Verdenskort med dag og nat",
    day: "dag",
    night: "nat",
    upcomingTitle: "Snart",
    upcomingLinks: "Alle helligdage",
    eve: "ikke officiel",
    holiday: "helligdag",
    toolsTitle: "Alle værktøjer til tid og dato",
    groups: { clock: "Ur og timer", calendar: "Kalender", world: "Verden", more: "Mere" },
    notes: { clock: "Ur i realtid", alarm: "Vækning i browseren", timer: "Nedtælling med signal", stopwatch: "Med omgangstider", pomodoro: "25 + 5 minutter", interval: "Tabata og HIIT", days: "Beregn dage og datoer", week: "Aktuelt ugenummer", holidays: "Med klemmedage", world: "Tid i 97 byer", tz: "Med mødeplanlægger", sleep: "Hvornår skal du sove?", fuel: "Brændstof og turpris" },
    labels: { days: "Dage mellem datoer", week: "Ugenummer", holidays: "Helligdage", sleep: "Søvnberegner", fuel: "Km pr. liter", world: "Verdensur", tz: "Tidsforskel" },
    faq: (w) => [
      { question: "Hvilken tidszone har Danmark?", answer: "Danmark har centraleuropæisk tid (CET, UTC+1) om vinteren og centraleuropæisk sommertid (CEST, UTC+2) om sommeren. Uret stilles om den sidste søndag i marts og den sidste søndag i oktober." },
      { question: "Hvordan tælles ugenummeret?", answer: `Danmark følger ISO 8601: ugen begynder mandag, og uge 1 er den uge, der indeholder årets første torsdag. Lige nu er det uge ${w}.` },
      { question: "Hvorfor er dagene så korte om vinteren?", answer: "Danmark ligger mellem 54. og 58. breddegrad. Omkring vintersolhverv står solen kun op i cirka 7 timer i København, mens den om sommeren skinner i over 17 timer." },
    ],
  },
};

/** Sidste søndag i en måned. */
function lastSunday(year: number, month: number): YMD {
  let d = addDaysYmd(month === 12 ? { year: year + 1, month: 1, day: 1 } : { year, month: month + 1, day: 1 }, -1);
  while (weekdayOf(d) !== 0) d = addDaysYmd(d, -1);
  return d;
}

function nextClockChange(today: YMD) {
  for (const year of [today.year, today.year + 1])
    for (const [month, toSummer] of [
      [3, true],
      [10, false],
    ] as const) {
      const date = lastSunday(year, month);
      if (diffDays(today, date) >= 0) return { date, toSummer };
    }
  return null;
}

export default function NordicTimeHubPage({ locale }: { locale: NordicLocale }) {
  const t = COPY[locale];
  const ui = NORDIC_TIME_UI[locale];
  const today = todayBerlin(); // Stockholm, Oslo og København følger samme tid som Berlin.
  const moon = moonState(new Date(Date.UTC(today.year, today.month - 1, today.day, 10)));
  const change = nextClockChange(today);
  const all = [...nordicHolidays(locale, today.year), ...nordicHolidays(locale, today.year + 1)].filter((h) => diffDays(today, h.date) >= 0);
  const nextHoliday = all.find((h) => h.kind === "holiday");
  const upcoming = all.slice(0, 8);
  const week = isoWeek(today).week;
  const yearDays = diffDays({ year: today.year, month: 1, day: 1 }, { year: today.year + 1, month: 1, day: 1 });
  const doy = dayOfYear(today);

  const strip = STRIP.map((slug) => worldCities.find((c) => c.en === slug))
    .filter((c) => c !== undefined)
    .map((c) => ({ name: cityNameNordic(locale, c), timeZone: c.timeZone, href: cityPathNordic(locale, c) }));
  const mapCities = [HOME_CITY[locale], ...MAP]
    .map((slug) => worldCities.find((c) => c.en === slug))
    .filter((c) => c !== undefined)
    .map((c) => ({ name: cityNameNordic(locale, c), lat: c.lat, lon: c.lon, timeZone: c.timeZone }));

  const groups: Array<{ id: string; title: string; icon: SiteIconName; links: Array<{ href: string; label: string; note: string }> }> = [
    {
      id: "klocka",
      title: t.groups.clock,
      icon: "time",
      links: (["clock", "alarm", "timer", "stopwatch", "pomodoro", "interval"] as const).map((k) => ({ href: NORDIC_TIME_PATHS[k][locale], label: NORDIC_TIME_LABELS[k][locale], note: t.notes[k] })),
    },
    {
      id: "kalender",
      title: t.groups.calendar,
      icon: "dateCalculator",
      links: [
        { href: NORDIC_WEEK_PATHS[locale], label: t.labels.week, note: t.notes.week },
        { href: NORDIC_HOLIDAY_PATHS[locale], label: t.labels.holidays, note: t.notes.holidays },
        { href: NORDIC_DAYS_PATHS[locale], label: t.labels.days, note: t.notes.days },
      ],
    },
    {
      id: "varlden",
      title: t.groups.world,
      icon: "greatCircleCalculator",
      links: [
        { href: NORDIC_WORLD_BASE[locale], label: t.labels.world, note: t.notes.world },
        { href: timeToolPaths.timeZoneConverter[locale]!, label: t.labels.tz, note: t.notes.tz },
      ],
    },
    {
      id: "mer",
      title: t.groups.more,
      icon: "sleepCalculator",
      links: [
        { href: sleepGuidePaths[locale]!, label: t.labels.sleep, note: t.notes.sleep },
        { href: NORDIC_FUEL_PATHS[locale], label: t.labels.fuel, note: t.notes.fuel },
      ],
    },
  ];

  return (
    <div lang={locale === "no" ? "nb" : locale}>
      <TimeToolPage
        crumbs={[{ href: ui.homeHref, label: ui.home }, { label: t.crumb }]}
        crumbLabel={ui.crumbLabel}
        title={t.h1}
        intro={t.intro}
        tool={
          <TimeHubHero
            intlLocale={INTL[locale]}
            timeZone={TIME_ZONE[locale]}
            copy={t.hero}
            places={PLACES[locale]}
            defaultPlace={PLACES[locale][0].id}
            storageKey={`tid-och-datum-${locale}`}
            strip={strip}
          />
        }
        tocTitle={ui.tocTitle}
        tocItems={[
          { id: "idag", label: t.today(formatNordicDate(locale, today)) },
          { id: "dag-natt", label: t.mapTitle },
          { id: "snart", label: t.upcomingTitle },
          { id: "verktyg", label: t.toolsTitle },
          { id: "faq", label: ui.faqTitle },
        ]}
        faqTitle={ui.faqTitle}
        faqItems={t.faq(week)}
      >
        <h2 id="idag">{t.today(formatNordicLong(locale, today))}</h2>
        <div className="timehub-today">
          <div className="timehub-today-item">
            <span>{t.week}</span>
            <strong>{week}</strong>
          </div>
          <div className="timehub-today-item">
            <span>{t.year}</span>
            <strong>{t.dayOfYear(doy)}</strong>
            <em>{t.daysLeft(yearDays - doy)}</em>
          </div>
          <div className="timehub-today-item">
            <span>{t.moon}</span>
            <strong>{MOON[locale][phaseName(moon.age)]}</strong>
            <em>{t.lit(Math.round(moon.illumination * 100))}</em>
          </div>
          {change ? (
            <div className="timehub-today-item">
              <span>{t.clockChange}</span>
              <strong>{change.toSummer ? t.toSummer : t.toWinter}</strong>
              <em>
                {formatNordicLong(locale, change.date)} · {change.toSummer ? t.forward : t.back}
              </em>
            </div>
          ) : null}
          {nextHoliday ? (
            <div className="timehub-today-item is-accent">
              <span>{t.nextHoliday}</span>
              <strong>{nextHoliday.name}</strong>
              <em>
                {formatNordicLong(locale, nextHoliday.date)} · {t.inDays(diffDays(today, nextHoliday.date))}
              </em>
            </div>
          ) : null}
        </div>

        <h2 id="dag-natt">{t.mapTitle}</h2>
        <p>{t.mapText}</p>
        <DayNightMap ariaLabel={t.mapAria} lang="en" intlLocale={INTL[locale]} cities={mapCities} dayLabel={t.day} nightLabel={t.night} />

        <h2 id="snart">{t.upcomingTitle}</h2>
        <ul className="timehub-upcoming">
          {upcoming.map((h) => {
            const days = diffDays(today, h.date);
            return (
              <li key={`${h.id}-${ymdKey(h.date)}`}>
                <Link href={NORDIC_HOLIDAY_PATHS[locale]}>
                  <strong>{h.name}</strong>
                  <span>{formatNordicLong(locale, h.date)}</span>
                  <em>
                    {days === 0 ? t.todayWord : t.inDays(days)} · {h.kind === "eve" ? t.eve : t.holiday}
                  </em>
                </Link>
              </li>
            );
          })}
        </ul>
        <p>
          <Link href={NORDIC_HOLIDAY_PATHS[locale]}>{t.upcomingLinks}</Link>
        </p>

        <h2 id="verktyg">{t.toolsTitle}</h2>
        <div className="timehub-groups">
          {groups.map((group) => (
            <section className="timehub-group" key={group.id} aria-labelledby={`grupp-${group.id}`}>
              <h3 id={`grupp-${group.id}`}>
                <span className="home-category-icon-box" aria-hidden="true">
                  <DecorativeIcon className="home-category-icon-svg" name={group.icon} size={28} />
                </span>
                {group.title}
              </h3>
              <ul>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <strong>{link.label}</strong>
                      <span>{link.note}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </TimeToolPage>
    </div>
  );
}

export const NORDIC_TIME_HUB_COPY = COPY;
