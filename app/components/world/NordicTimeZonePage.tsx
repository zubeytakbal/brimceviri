// İsveççe, Norveççe ve Danca saat farkı (tidsskillnad / tidsforskjell / tidsforskel)
// sayfası: saat dilimi çevirici + toplantı planlayıcı, ülkeden saat farkı tablosu,
// saat değişimi ve SSS.
import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import type { FaqItem } from "../../converter/faqSchema";
import type { YMD } from "../../converter/time/calendars";
import { nthWeekdayYmd } from "../../converter/time/dateMath";
import { todayBerlin } from "../../converter/time/germanDates";
import { formatNordicLong, type NordicLocale } from "../../converter/time/nordicWeek";
import { cityNameNordic, cityPathNordic, nordicZoneOptions, NORDIC_WORLD_BASE } from "../../converter/time/nordicWorld";
import { differenceMinutes } from "../../converter/time/timezones";
import { worldCities } from "../../converter/time/worldCities";
import { timeToolAlternates, timeToolPaths } from "../../i18n/timeToolPaths";
import { buildSiteUrl } from "../../siteConfig";
import { NORDIC_TIME_UI } from "../time/nordicTimeCopy";
import TimeToolPage from "../time/TimeToolPage";
import { TIME_HUB_PATHS } from "../timehub/timeHubPaths";
import TimeZoneConverter, { type ConverterCopy } from "./TimeZoneConverter";

const HOME: Record<NordicLocale, { city: string; zone: string }> = {
  sv: { city: "stockholm", zone: "Europe/Stockholm" },
  no: { city: "oslo", zone: "Europe/Oslo" },
  da: { city: "copenhagen", zone: "Europe/Copenhagen" },
};

const TABLE = ["london", "new-york", "los-angeles", "istanbul", "dubai", "bangkok", "new-delhi", "beijing", "tokyo", "sydney", "sao-paulo", "cairo"];

type Copy = {
  metaTitle: string;
  description: string;
  crumb: string;
  h1: string;
  intro: string;
  converter: ConverterCopy;
  tableTitle: string;
  city: string;
  winter: string;
  summer: string;
  tableNote: (year: number) => string;
  dstTitle: (year: number) => string;
  dst: (year: number, march: string, october: string) => string[];
  worldLink: string;
  hubLink: string;
  faq: (march: string, october: string) => FaqItem[];
  hours: string;
};

const COPY: Record<NordicLocale, Copy> = {
  sv: {
    metaTitle: "Tidsskillnad – räkna om tid mellan tidszoner",
    description: "Räkna ut tidsskillnaden mellan Sverige och resten av världen: Thailand, New York, Tokyo, Dubai och 90 andra städer. Med sommartid och mötesplanerare.",
    crumb: "Tidsskillnad",
    h1: "Tidsskillnad och tidszoner",
    intro: "Räkna om en tid till andra tidszoner med sommartid inräknad. Lägg till flera orter och hitta en tid som passar alla i mötesplaneraren.",
    converter: {
      from: "Från tidszon", to: "Till tidszon", date: "Datum", time: "Tid", now: "Nu", swap: "Byt plats", add: "Lägg till tidszon", remove: "Ta bort",
      share: "Kopiera länk", copied: "Kopierad ✓", planner: "Mötesplanerare",
      plannerHint: "Kolumnerna är dygnets 24 timmar i den första tidszonen. Grönt: arbetstid (9–18), mörkt: natt. Tryck på en timme för att välja den.",
      abbrGroup: "Tidszoner", cityGroup: "Städer", work: "Arbetstid", night: "Natt", nextDay: "Nästa dag", prevDay: "Föregående dag",
    },
    tableTitle: "Tidsskillnad från Sverige",
    city: "Stad",
    winter: "Vinter (CET)",
    summer: "Sommar (CEST)",
    tableNote: (y) => `Plus betyder att klockan där är före svensk tid. Läget i mitten av januari och mitten av juli ${y}.`,
    dstTitle: (y) => `Sommartid ${y}`,
    dst: (y, m, o) => [
      `Sverige har normaltid (CET, UTC+1) på vintern och sommartid (CEST, UTC+2) på sommaren. ${y} börjar sommartiden ${m}, då klockan ställs fram från 02 till 03. Den slutar ${o}, då klockan ställs tillbaka från 03 till 02.`,
      "USA byter tid andra söndagen i mars och första söndagen i november. Under några veckor varje vår och höst är tidsskillnaden till New York därför en timme mindre än vanligt. Thailand, Japan, Kina och Turkiet har ingen sommartid, så skillnaden dit ändras två gånger om året.",
    ],
    worldLink: "Världsklocka",
    hubLink: "Tid och datum",
    faq: (m, o) => [
      { question: "Hur stor är tidsskillnaden till Thailand?", answer: "Thailand ligger 6 timmar före Sverige på vintern och 5 timmar före på sommaren, eftersom Thailand inte har sommartid." },
      { question: "Hur stor är tidsskillnaden till New York?", answer: "Oftast är New York 6 timmar efter Sverige. Under några veckor i mars och i oktober–november, när länderna byter tid olika dagar, är skillnaden 5 timmar." },
      { question: "När ställs klockan om?", answer: `Klockan ställs fram ${m} och tillbaka ${o}.` },
      { question: "Hur fungerar mötesplaneraren?", answer: "Den visar dygnets 24 timmar i den första tidszonen och tiden på alla andra valda orter. Gröna rutor ligger inom arbetstid överallt." },
    ],
    hours: "tim",
  },
  no: {
    metaTitle: "Tidsforskjell – regn om tid mellom tidssoner",
    description: "Finn tidsforskjellen mellom Norge og resten av verden: Thailand, New York, Tokyo, Dubai og 90 andre byer. Med sommertid og møteplanlegger.",
    crumb: "Tidsforskjell",
    h1: "Tidsforskjell og tidssoner",
    intro: "Regn om et klokkeslett til andre tidssoner med sommertid tatt med. Legg til flere steder og finn et tidspunkt som passer alle i møteplanleggeren.",
    converter: {
      from: "Fra tidssone", to: "Til tidssone", date: "Dato", time: "Klokkeslett", now: "Nå", swap: "Bytt", add: "Legg til tidssone", remove: "Fjern",
      share: "Kopier lenke", copied: "Kopiert ✓", planner: "Møteplanlegger",
      plannerHint: "Kolonnene er døgnets 24 timer i den første tidssonen. Grønt: arbeidstid (9–18), mørkt: natt. Trykk på en time for å velge den.",
      abbrGroup: "Tidssoner", cityGroup: "Byer", work: "Arbeidstid", night: "Natt", nextDay: "Neste dag", prevDay: "Forrige dag",
    },
    tableTitle: "Tidsforskjell fra Norge",
    city: "By",
    winter: "Vinter (CET)",
    summer: "Sommer (CEST)",
    tableNote: (y) => `Pluss betyr at klokka der er foran norsk tid. Midten av januar og midten av juli ${y}.`,
    dstTitle: (y) => `Sommertid ${y}`,
    dst: (y, m, o) => [
      `Norge har normaltid (CET, UTC+1) om vinteren og sommertid (CEST, UTC+2) om sommeren. I ${y} begynner sommertiden ${m}, da klokka stilles fram fra 02 til 03. Den slutter ${o}, da klokka stilles tilbake fra 03 til 02.`,
      "USA skifter tid andre søndag i mars og første søndag i november. Noen uker hver vår og høst er tidsforskjellen til New York derfor én time mindre enn vanlig. Thailand, Japan, Kina og Tyrkia har ikke sommertid, så forskjellen dit endres to ganger i året.",
    ],
    worldLink: "Verdensklokke",
    hubLink: "Tid og dato",
    faq: (m, o) => [
      { question: "Hvor stor er tidsforskjellen til Thailand?", answer: "Thailand ligger 6 timer foran Norge om vinteren og 5 timer foran om sommeren, fordi Thailand ikke har sommertid." },
      { question: "Hvor stor er tidsforskjellen til New York?", answer: "Som regel er New York 6 timer bak Norge. Noen uker i mars og i oktober–november, når landene skifter tid på ulike dager, er forskjellen 5 timer." },
      { question: "Når stilles klokka om?", answer: `Klokka stilles fram ${m} og tilbake ${o}.` },
      { question: "Hvordan virker møteplanleggeren?", answer: "Den viser døgnets 24 timer i den første tidssonen og klokkeslettet på alle andre valgte steder. Grønne ruter er innenfor arbeidstid overalt." },
    ],
    hours: "t",
  },
  da: {
    metaTitle: "Tidsforskel – omregn tid mellem tidszoner",
    description: "Find tidsforskellen mellem Danmark og resten af verden: Thailand, New York, Tokyo, Dubai og 90 andre byer. Med sommertid og mødeplanlægger.",
    crumb: "Tidsforskel",
    h1: "Tidsforskel og tidszoner",
    intro: "Omregn et klokkeslæt til andre tidszoner med sommertid regnet med. Tilføj flere steder, og find et tidspunkt, der passer alle, i mødeplanlæggeren.",
    converter: {
      from: "Fra tidszone", to: "Til tidszone", date: "Dato", time: "Klokkeslæt", now: "Nu", swap: "Byt om", add: "Tilføj tidszone", remove: "Fjern",
      share: "Kopiér link", copied: "Kopieret ✓", planner: "Mødeplanlægger",
      plannerHint: "Kolonnerne er døgnets 24 timer i den første tidszone. Grøn: arbejdstid (9–18), mørk: nat. Tryk på en time for at vælge den.",
      abbrGroup: "Tidszoner", cityGroup: "Byer", work: "Arbejdstid", night: "Nat", nextDay: "Næste dag", prevDay: "Forrige dag",
    },
    tableTitle: "Tidsforskel fra Danmark",
    city: "By",
    winter: "Vinter (CET)",
    summer: "Sommer (CEST)",
    tableNote: (y) => `Plus betyder, at klokken dér er foran dansk tid. Midt i januar og midt i juli ${y}.`,
    dstTitle: (y) => `Sommertid ${y}`,
    dst: (y, m, o) => [
      `Danmark har normaltid (CET, UTC+1) om vinteren og sommertid (CEST, UTC+2) om sommeren. I ${y} begynder sommertiden ${m}, hvor uret stilles frem fra 02 til 03. Den slutter ${o}, hvor uret stilles tilbage fra 03 til 02.`,
      "USA skifter tid anden søndag i marts og første søndag i november. Nogle uger hvert forår og efterår er tidsforskellen til New York derfor én time mindre end normalt. Thailand, Japan, Kina og Tyrkiet har ikke sommertid, så forskellen dertil ændrer sig to gange om året.",
    ],
    worldLink: "Verdensur",
    hubLink: "Tid og dato",
    faq: (m, o) => [
      { question: "Hvor stor er tidsforskellen til Thailand?", answer: "Thailand er 6 timer foran Danmark om vinteren og 5 timer foran om sommeren, fordi Thailand ikke har sommertid." },
      { question: "Hvor stor er tidsforskellen til New York?", answer: "Normalt er New York 6 timer bagud i forhold til Danmark. Nogle uger i marts og i oktober–november, hvor landene skifter tid på forskellige dage, er forskellen 5 timer." },
      { question: "Hvornår stilles uret om?", answer: `Uret stilles frem ${m} og tilbage ${o}.` },
      { question: "Hvordan virker mødeplanlæggeren?", answer: "Den viser døgnets 24 timer i den første tidszone og klokkeslættet alle andre valgte steder. Grønne felter ligger inden for arbejdstid overalt." },
    ],
    hours: "t.",
  },
};

export function nordicTimeZoneMetadata(locale: NordicLocale): Metadata {
  const t = COPY[locale];
  const path = timeToolPaths.timeZoneConverter[locale]!;
  return {
    title: t.metaTitle,
    description: t.description,
    alternates: { canonical: path, ...timeToolAlternates("timeZoneConverter") },
    openGraph: { title: t.metaTitle, description: t.description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: NORDIC_TIME_UI[locale].ogLocale, type: "website" },
  };
}

function hours(minutes: number, unit: string) {
  if (minutes === 0) return "±0";
  const a = Math.abs(minutes);
  return `${minutes > 0 ? "+" : "−"}${Math.floor(a / 60)}${a % 60 ? `:${String(a % 60).padStart(2, "0")}` : ""} ${unit}`;
}

export default function NordicTimeZonePage({ locale }: { locale: NordicLocale }) {
  const t = COPY[locale];
  const ui = NORDIC_TIME_UI[locale];
  const path = timeToolPaths.timeZoneConverter[locale]!;
  const year = todayBerlin().year;
  const winter = new Date(Date.UTC(year, 0, 15, 12));
  const summer = new Date(Date.UTC(year, 6, 15, 12));
  const home = HOME[locale];
  const rows = TABLE.map((id) => worldCities.find((c) => c.en === id))
    .filter((c) => c !== undefined)
    .map((c) => ({ c, w: differenceMinutes(home.zone, c.timeZone, winter), s: differenceMinutes(home.zone, c.timeZone, summer) }));
  const march: YMD = nthWeekdayYmd(year, 3, 0, -1);
  const october: YMD = nthWeekdayYmd(year, 10, 0, -1);
  const m = formatNordicLong(locale, march);
  const o = formatNordicLong(locale, october);

  return (
    <div lang={locale === "no" ? "nb" : locale}>
      <TimeToolPage
        crumbs={[
          { href: ui.homeHref, label: ui.home },
          { href: path, label: t.crumb },
        ]}
        crumbLabel={ui.crumbLabel}
        title={t.h1}
        intro={t.intro}
        tool={<TimeZoneConverter options={nordicZoneOptions(locale)} lang={locale} copy={t.converter} initialFrom={home.city} initialTo={["new-york", "bangkok"]} basePath={path} />}
        related={{
          title: ui.relatedTitle,
          links: [
            { href: TIME_HUB_PATHS[locale], label: t.hubLink },
            { href: NORDIC_WORLD_BASE[locale], label: t.worldLink },
          ],
        }}
        tocTitle={ui.tocTitle}
        tocItems={[
          { id: "tabell", label: t.tableTitle },
          { id: "sommartid", label: t.dstTitle(year) },
          { id: "faq", label: ui.faqTitle },
        ]}
        faqTitle={ui.faqTitle}
        faqItems={t.faq(m, o)}
      >
        <h2 id="tabell">{t.tableTitle}</h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">{t.city}</th>
                <th scope="col">{t.winter}</th>
                <th scope="col">{t.summer}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ c, w, s }) => (
                <tr key={c.en}>
                  <td>
                    <Link href={cityPathNordic(locale, c)} prefetch={false}>
                      {cityNameNordic(locale, c)}
                    </Link>
                  </td>
                  <td>{hours(w, t.hours)}</td>
                  <td>{hours(s, t.hours)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          <small>{t.tableNote(year)}</small>
        </p>

        <h2 id="sommartid">{t.dstTitle(year)}</h2>
        {t.dst(year, m, o).map((p) => (
          <p key={p}>{p}</p>
        ))}
      </TimeToolPage>
    </div>
  );
}
