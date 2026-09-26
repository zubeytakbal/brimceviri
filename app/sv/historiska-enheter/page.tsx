import Link from "next/link";
import CategoryUnitConverter from "../../components/CategoryUnitConverter";
import StaticPageLayout from "../../components/StaticPageLayout";
import { buildSiteUrl } from "../../siteConfig";

export const metadata = {
  title: "Historiska mätenheter",
  description:
    "Upptäck bysantinska, osmanska och gammalturkiska mätenheter och omvandla dem till meter och gram med korta förklaringar.",
  alternates: {
    canonical: "/sv/historiska-enheter",
    languages: {
      tr: "/tarihi-olcu-birimleri",
      en: "/en/historical-units",
      de: "/de/historische-masseinheiten",
      bn: "/bn/historical-units",
      fr: "/fr/unites-historiques",
      es: "/es/unidades-historicas",
      "es-419": "/es-419/unidades-historicas",
      pt: "/pt/unidades-historicas",
      it: "/it/unita-storiche",
      nl: "/nl/historische-eenheden",
      sv: "/sv/historiska-enheter",
      "x-default": "/tarihi-olcu-birimleri",
    },
  },
  openGraph: {
    title: "Historiska mätenheter",
    description: "Upptäck bysantinska, osmanska och gammalturkiska mätenheter.",
    url: buildSiteUrl("/sv/historiska-enheter"),
    siteName: "BirimCeviri.app",
    locale: "sv_SE",
    type: "website",
  },
};

const historicalLengthUnitOptions = [
  { value: "m", label: "Meter (m)", symbol: "m" },
  { value: "arşın", label: "Arşın", symbol: "arşın" },
  { value: "endaze", label: "Endaze", symbol: "endaze" },
  { value: "pus", label: "Bysantinsk fot (Pous)", symbol: "pus" },
  { value: "orgyia", label: "Bysantinskt famntag (Orgyia)", symbol: "orgyia" },
  { value: "çığ", label: "Çığ", symbol: "çığ" },
];

const historicalMassUnitOptions = [
  { value: "g", label: "Gram (g)", symbol: "g" },
  { value: "okka", label: "Osmansk okka", symbol: "okka" },
  { value: "dirhem", label: "Dirhem", symbol: "dirhem" },
  { value: "litra", label: "Bysantinsk litra", symbol: "litra" },
  { value: "ounkia", label: "Bysantinsk ounkia", symbol: "ounkia" },
];

const byzantineUnits = [
  {
    href: "/birimler/bizans-ayagi",
    name: "Bysantinsk fot (pous)",
    value: "≈ 0,3148 m",
    note: "Förlängning av den antika grekiska foten, använd fram till 1453.",
  },
  {
    href: "/birimler/bizans-kulaci",
    name: "Bysantinskt famntag (orgyia)",
    value: "= 6 pous ≈ 1,8888 m",
    note: "Avståndet mellan fingertopparna med helt utsträckta armar.",
  },
  {
    href: "/birimler/bizans-litrasi",
    name: "Bysantinsk litra (litra)",
    value: "≈ 324 g",
    note: "Grundläggande massaenhet i den bysantinska traditionen, påverkad av det romerska pundet.",
  },
  {
    href: "/birimler/bizans-onsu",
    name: "Bysantinsk ounkia (ounkia)",
    value: "= 1/12 litra ≈ 27 g",
    note: "Skiljer sig från det moderna unset i de brittiska och amerikanska systemen.",
  },
];

const ottomanUnits = [
  {
    href: "/birimler/arsin",
    name: "Arşın",
    value: "≈ 0,68 m",
    note: "Hade flera användningsområden: marknadsarşın, den mest kända, och byggarşın, som användes för större längder.",
  },
  {
    href: "/birimler/endaze",
    name: "Endaze",
    value: "= 0,65 m",
    note: "Användes särskilt för att mäta tyg och textil, samt relaterad handel.",
  },
  {
    href: "/birimler/okka",
    name: "Osmansk okka (Okka)",
    value: "= 400 dirhem ≈ 1282,945 g",
    note: "En av de mest kända viktenheterna på traditionella osmanska marknader.",
  },
  {
    href: "/birimler/dirhem",
    name: "Dirhem",
    value: "= 1/400 okka ≈ 3,207 g",
    note: "Användes för små mängder, som ädla metaller, kryddor och vissa kosmetiska produkter.",
  },
];

const oldTurkicUnits = [
  {
    href: "/birimler/cig",
    name: "Çığ",
    value: "≈ 0,333 m",
    note: "En gammal turkisk längdenhet som förekommer i gamla språkliga och historiska källor.",
  },
];

function UnitList({
  units,
}: {
  units: Array<{
    href: string;
    name: string;
    value: string;
    note: string;
  }>;
}) {
  return (
    <ul className="calculator-example-list">
      {units.map((unit) => (
        <li key={unit.href}>
          <article>
            <h3>
              <Link href={unit.href}>{unit.name}</Link>
            </h3>
            <p>
              <strong>{unit.value}</strong> {" - "} {unit.note}
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
}

export default function SwedishHistoricalUnitsPage() {
  return (
    <StaticPageLayout
      locale="sv"
      breadcrumbAriaLabel="Sidnavigering"
      breadcrumbs={[
        { href: "/sv", label: "Hem" },
        { label: "Historiska mätenheter" },
      ]}
      title="Historiska mätenheter"
      description="Upptäck bysantinska, osmanska och gammalturkiska mätenheter med sina moderna motsvarigheter i meter och gram och omvandla dem direkt med två praktiska verktyg."
      alternateLink={{
        href: "/tarihi-olcu-birimleri",
        hrefLang: "tr",
        label: "Öppna den turkiska versionen",
      }}
      sections={[
        {
          heading: "Kort historisk bakgrund",
          content: (
            <>
              <p>
                Mätningens historia i Anatolien och denna region började
                inte med det moderna metriska systemet; den gick igenom
                flera lager av bysantinska och senare osmanska system,
                utöver ännu äldre turkiska mått.
              </p>
              <p>
                Därför förekommer namn som arşın, okka och dirhem fortfarande
                idag i gamla dokument, samt i vissa böcker och historisk
                forskning.
              </p>
            </>
          ),
        },
        {
          heading: "Konverterare för historiska längdenheter",
          content: (
            <>
              <p>
                Omvandla direkt mellan arşın, endaze, bysantinsk fot,
                bysantinskt famntag och çığ, med den moderna motsvarigheten
                i meter. För alla moderna längdenheter, se{" "}
                <Link href="/sv/kategorier/langd">det fullständiga längdbiblioteket</Link>.
              </p>
              <CategoryUnitConverter
                category="uzunluk"
                locale="sv"
                unitOptions={historicalLengthUnitOptions}
              />
            </>
          ),
        },
        {
          heading: "Konverterare för historiska massaenheter",
          content: (
            <>
              <p>
                Omvandla mellan osmansk okka, dirhem, bysantinsk litra och
                bysantinsk ounkia, med det moderna grammet som referens. För
                moderna enheter som kilogram och ton, se{" "}
                <Link href="/sv/kategorier/massa">det fullständiga massbiblioteket</Link>.
              </p>
              <CategoryUnitConverter
                category="kutle"
                locale="sv"
                unitOptions={historicalMassUnitOptions}
              />
            </>
          ),
        },
        {
          heading: "Enheter från den bysantinska tiden",
          content: (
            <>
              <p>
                Bysans ärvde en stor del av den grekiska och romerska
                mätningstraditionen och skapade praktiska längd- och
                massaenheter som användes inom handel och byggnation i
                århundraden.
              </p>
              <UnitList units={byzantineUnits} />
            </>
          ),
        },
        {
          heading: "Enheter från den osmanska tiden",
          content: (
            <>
              <p>
                Innan den osmanska staten helt övergick till det metriska
                systemet på 1900-talet användes enheter som arşın, endaze,
                okka och dirhem inom handel, byggnation och vardagsliv.
              </p>
              <UnitList units={ottomanUnits} />
            </>
          ),
        },
        {
          heading: "Ännu äldre turkiska enheter",
          content: (
            <>
              <p>
                Vissa gamla enheter är fortfarande kända tack vare
                språkliga och historiska källor, och är viktiga för att
                första gamla texter och relatera dem till moderna mått.
              </p>
              <UnitList units={oldTurkicUnits} />
            </>
          ),
        },
        {
          heading: "Varför är dessa enheter fortfarande viktiga idag?",
          content: (
            <>
              <p>
                Dessa namn förekommer fortfarande idag i vakufhandlingar,
                gamla register, historisk forskning och översättningsarbete;
                att omvandla dem till meter eller gram hjälper till att
                snabbt första dem.
              </p>
              <p>
                Denna sida är också användbar för studenter, innehålls-
                skapare och alla som vill läsa historiska tal med tydliga
                moderna referenser.
              </p>
            </>
          ),
        },
        {
          heading: "Relaterade verktyg",
          content: (
            <ul className="related-conversion-list">
              <li>
                <Link href="/sv/koksmatt-omvandlare">Kokmått</Link>
              </li>
              <li>
                <Link href="/sv/receptomvandlare">Receptomvandlare</Link>
              </li>
              <li>
                <Link href="/sv/skostorlekar">Skostorlekskonverterare</Link>
              </li>
            </ul>
          ),
        },
      ]}
    />
  );
}
