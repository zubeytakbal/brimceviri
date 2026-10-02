// İsveççe, Norveççe ve Danca dünya saati panosu sayfası.
import type { Metadata } from "next";
import type { NordicLocale } from "../../converter/time/nordicWeek";
import { cityNameNordic, cityPathNordic, countryNameNordic, NORDIC_REGION_NAMES, NORDIC_WORLD_BASE } from "../../converter/time/nordicWorld";
import { worldCities } from "../../converter/time/worldCities";
import { timeToolAlternates } from "../../i18n/timeToolPaths";
import { buildSiteUrl } from "../../siteConfig";
import { NORDIC_TIME_LABELS, NORDIC_TIME_PATHS, NORDIC_TIME_UI } from "../time/nordicTimeCopy";
import TimeToolPage from "../time/TimeToolPage";
import WorldClockBoard, { type BoardCity } from "./WorldClockBoard";

export const NORDIC_WORLD_CLOCK_PATHS = NORDIC_WORLD_BASE;

const REGIONS = ["europe", "turkey", "middle-east", "asia", "africa", "oceania", "americas"];
const COUNT = worldCities.length;

const COPY: Record<
  NordicLocale,
  {
    crumb: string;
    metaTitle: string;
    description: string;
    h1: string;
    intro: string;
    board: { search: string; all: string; favorites: string; addFavorite: string; removeFavorite: string; yourTime: string; noResults: string; today: string; tomorrow: string; yesterday: string };
    zonesTitle: string;
    zones: string[];
    faq: Array<{ question: string; answer: string }>;
  }
> = {
  sv: {
    crumb: "Världsklocka",
    metaTitle: `Världsklocka – vad är klockan i ${COUNT} städer?`,
    description: `Vad är klockan i New York, Tokyo eller Bangkok? Världsklockan visar aktuell tid i ${COUNT} städer live, med tidsskillnad mot din tid, sökning, regioner och favoriter.`,
    h1: "Världsklocka",
    intro: `Aktuell tid i ${COUNT} städer live. Sök efter en stad, filtrera på region och markera favoriter; varje kort visar tidsskillnaden mot din tid.`,
    board: { search: "Sök stad eller land…", all: "Alla", favorites: "Favoriter", addFavorite: "Lägg till i favoriter", removeFavorite: "Ta bort från favoriter", yourTime: "Din tid", noResults: "Ingen stad hittades. Lägg till favoriter med ☆ på ett kort.", today: "Idag", tomorrow: "Imorgon", yesterday: "Igår" },
    zonesTitle: "Tidszoner och världstid",
    zones: [
      "Jorden roterar ett varv på 24 timmar, alltså 15 längdgrader i timmen. Därför delas världen in i tidszoner som oftast skiljer sig med en hel timme och anges i förhållande till UTC. Gränserna följer dock länder: Spanien ligger geografiskt i Londons zon men använder samma tid som Sverige.",
      "Sverige har centraleuropeisk tid (CET, UTC+1) och sommartid (CEST, UTC+2) från sista söndagen i mars till sista söndagen i oktober.",
    ],
    faq: [
      { question: "Hur mycket är klockan i New York när den är 12 i Sverige?", answer: "Oftast 6 på morgonen. De veckor då USA redan har eller fortfarande har sommartid men Europa inte, är den 7." },
      { question: "Vad är UTC?", answer: "Koordinerad universell tid (UTC) är världens referenstid för alla tidszoner. Sverige ligger på UTC+1 på vintern och UTC+2 på sommaren." },
      { question: "Varför har Kina bara en tidszon?", answer: "Kina använder sedan 1949 Pekingtid (UTC+8) i hela landet, trots att det sträcker sig över fem geografiska tidszoner. I väst går solen därför upp mycket sent." },
    ],
  },
  no: {
    crumb: "Verdensklokke",
    metaTitle: `Verdensklokke – hva er klokka i ${COUNT} byer?`,
    description: `Hva er klokka i New York, Tokyo eller Bangkok? Verdensklokka viser nåværende tid i ${COUNT} byer direkte, med tidsforskjell til din tid, søk, regioner og favoritter.`,
    h1: "Verdensklokke",
    intro: `Nåværende tid i ${COUNT} byer direkte. Søk etter en by, filtrer på region og merk favoritter; hvert kort viser tidsforskjellen til din tid.`,
    board: { search: "Søk etter by eller land…", all: "Alle", favorites: "Favoritter", addFavorite: "Legg til i favoritter", removeFavorite: "Fjern fra favoritter", yourTime: "Din tid", noResults: "Fant ingen by. Legg til favoritter med ☆ på et kort.", today: "I dag", tomorrow: "I morgen", yesterday: "I går" },
    zonesTitle: "Tidssoner og verdenstid",
    zones: [
      "Jorda roterer én gang på 24 timer, altså 15 lengdegrader i timen. Derfor deles verden inn i tidssoner som oftest skiller seg med en hel time og angis i forhold til UTC. Grensene følger likevel land: Spania ligger geografisk i Londons sone, men bruker samme tid som Norge.",
      "Norge har sentraleuropeisk tid (CET, UTC+1) og sommertid (CEST, UTC+2) fra siste søndag i mars til siste søndag i oktober.",
    ],
    faq: [
      { question: "Hva er klokka i New York når den er 12 i Norge?", answer: "Som regel 6 om morgenen. I ukene der USA allerede har eller fortsatt har sommertid, men Europa ikke, er den 7." },
      { question: "Hva er UTC?", answer: "Koordinert universaltid (UTC) er verdens referansetid for alle tidssoner. Norge ligger på UTC+1 om vinteren og UTC+2 om sommeren." },
      { question: "Hvorfor har Kina bare én tidssone?", answer: "Kina har siden 1949 brukt Beijing-tid (UTC+8) i hele landet, selv om det strekker seg over fem geografiske tidssoner. I vest står sola derfor opp svært sent." },
    ],
  },
  da: {
    crumb: "Verdensur",
    metaTitle: `Verdensur – hvad er klokken i ${COUNT} byer?`,
    description: `Hvad er klokken i New York, Tokyo eller Bangkok? Verdensuret viser den aktuelle tid i ${COUNT} byer live, med tidsforskel til din tid, søgning, regioner og favoritter.`,
    h1: "Verdensur",
    intro: `Den aktuelle tid i ${COUNT} byer live. Søg efter en by, filtrer på region, og marker favoritter; hvert kort viser tidsforskellen til din tid.`,
    board: { search: "Søg efter by eller land…", all: "Alle", favorites: "Favoritter", addFavorite: "Føj til favoritter", removeFavorite: "Fjern fra favoritter", yourTime: "Din tid", noResults: "Ingen by fundet. Tilføj favoritter med ☆ på et kort.", today: "I dag", tomorrow: "I morgen", yesterday: "I går" },
    zonesTitle: "Tidszoner og verdenstid",
    zones: [
      "Jorden drejer én omgang på 24 timer, altså 15 længdegrader i timen. Derfor er verden delt i tidszoner, som oftest adskiller sig med en hel time og angives i forhold til UTC. Grænserne følger dog landene: Spanien ligger geografisk i Londons zone, men bruger samme tid som Danmark.",
      "Danmark har centraleuropæisk tid (CET, UTC+1) og sommertid (CEST, UTC+2) fra sidste søndag i marts til sidste søndag i oktober.",
    ],
    faq: [
      { question: "Hvad er klokken i New York, når den er 12 i Danmark?", answer: "Som regel 6 om morgenen. I de uger, hvor USA allerede har eller stadig har sommertid, men Europa ikke har, er den 7." },
      { question: "Hvad er UTC?", answer: "Koordineret universaltid (UTC) er verdens referencetid for alle tidszoner. Danmark ligger på UTC+1 om vinteren og UTC+2 om sommeren." },
      { question: "Hvorfor har Kina kun én tidszone?", answer: "Kina har siden 1949 brugt Beijing-tid (UTC+8) i hele landet, selv om det strækker sig over fem geografiske tidszoner. Mod vest står solen derfor meget sent op." },
    ],
  },
};

export function nordicWorldClockMetadata(locale: NordicLocale): Metadata {
  const c = COPY[locale];
  const path = NORDIC_WORLD_CLOCK_PATHS[locale];
  return {
    title: c.metaTitle,
    description: c.description,
    alternates: { canonical: path, ...timeToolAlternates("worldClock") },
    openGraph: { title: c.metaTitle, description: c.description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: NORDIC_TIME_UI[locale].ogLocale, type: "website" },
  };
}

export default function NordicWorldClockPage({ locale }: { locale: NordicLocale }) {
  const c = COPY[locale];
  const ui = NORDIC_TIME_UI[locale];
  const path = NORDIC_WORLD_CLOCK_PATHS[locale];
  const intl = locale === "no" ? "nb" : locale;
  const cities: BoardCity[] = worldCities
    .map((city) => ({
      slug: city.en,
      href: cityPathNordic(locale, city),
      name: cityNameNordic(locale, city),
      country: countryNameNordic(locale, city),
      timeZone: city.timeZone,
      region: city.region,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, intl));
  const regions = REGIONS.map((id) => ({ id, name: NORDIC_REGION_NAMES[locale][id] }));

  return (
    <div lang={intl}>
      <TimeToolPage
        crumbs={[
          { href: ui.homeHref, label: ui.home },
          { href: path, label: c.crumb },
        ]}
        crumbLabel={ui.crumbLabel}
        title={c.h1}
        intro={c.intro}
        tool={<WorldClockBoard cities={cities} regions={regions} lang={locale} copy={c.board} />}
        related={{
          title: ui.relatedTitle,
          links: [
            { href: NORDIC_TIME_PATHS.clock[locale], label: NORDIC_TIME_LABELS.clock[locale] },
            { href: NORDIC_TIME_PATHS.alarm[locale], label: NORDIC_TIME_LABELS.alarm[locale] },
            { href: NORDIC_TIME_PATHS.timer[locale], label: NORDIC_TIME_LABELS.timer[locale] },
          ],
        }}
        tocTitle={ui.tocTitle}
        tocItems={[
          { id: "tidszoner", label: c.zonesTitle },
          { id: "faq", label: ui.faqTitle },
        ]}
        faqTitle={ui.faqTitle}
        faqItems={c.faq}
      >
        <h2 id="tidszoner">{c.zonesTitle}</h2>
        {c.zones.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </TimeToolPage>
    </div>
  );
}
