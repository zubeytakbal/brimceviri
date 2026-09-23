import Link from "next/link";
import CategoryUnitConverter from "../../components/CategoryUnitConverter";
import StaticPageLayout from "../../components/StaticPageLayout";
import { buildSiteUrl } from "../../siteConfig";

export const metadata = {
  title: "Historiska matenheter",
  description:
    "Upptack bysantinska, osmanska och gammalturkiska matenheter och omvandla dem till meter och gram med korta forklaringar.",
  alternates: {
    canonical: "/sv/historical-units",
    languages: {
      tr: "/tarihi-olcu-birimleri",
      en: "/en/historical-units",
      de: "/de/historische-masseinheiten",
      bn: "/bn/historical-units",
      fr: "/fr/historical-units",
      es: "/es/historical-units",
      "es-419": "/es-419/historical-units",
      pt: "/pt/historical-units",
      it: "/it/historical-units",
      nl: "/nl/historical-units",
      sv: "/sv/historical-units",
      "x-default": "/tarihi-olcu-birimleri",
    },
  },
  openGraph: {
    title: "Historiska matenheter",
    description: "Upptack bysantinska, osmanska och gammalturkiska matenheter.",
    url: buildSiteUrl("/sv/historical-units"),
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
    note: "Forlangning av den antika grekiska foten, anvand fram till 1453.",
  },
  {
    href: "/birimler/bizans-kulaci",
    name: "Bysantinskt famntag (orgyia)",
    value: "= 6 pous ≈ 1,8888 m",
    note: "Avstandet mellan fingertopparna med helt utstrackta armar.",
  },
  {
    href: "/birimler/bizans-litrasi",
    name: "Bysantinsk litra (litra)",
    value: "≈ 324 g",
    note: "Grundlaggande massaenhet i den bysantinska traditionen, paverkad av det romerska pundet.",
  },
  {
    href: "/birimler/bizans-onsu",
    name: "Bysantinsk ounkia (ounkia)",
    value: "= 1/12 litra ≈ 27 g",
    note: "Skiljer sig fran det moderna unset i de brittiska och amerikanska systemen.",
  },
];

const ottomanUnits = [
  {
    href: "/birimler/arsin",
    name: "Arşın",
    value: "≈ 0,68 m",
    note: "Hade flera anvandningsomraden: marknadsarşın, den mest kanda, och byggarşın, som anvandes for storre langder.",
  },
  {
    href: "/birimler/endaze",
    name: "Endaze",
    value: "= 0,65 m",
    note: "Anvandes sarskilt for att mata tyg och textil, samt relaterad handel.",
  },
  {
    href: "/birimler/okka",
    name: "Osmansk okka (Okka)",
    value: "= 400 dirhem ≈ 1282,945 g",
    note: "En av de mest kanda viktenheterna pa traditionella osmanska marknader.",
  },
  {
    href: "/birimler/dirhem",
    name: "Dirhem",
    value: "= 1/400 okka ≈ 3,207 g",
    note: "Anvandes for sma mangder, som adla metaller, kryddor och vissa kosmetiska produkter.",
  },
];

const oldTurkicUnits = [
  {
    href: "/birimler/cig",
    name: "Çığ",
    value: "≈ 0,333 m",
    note: "En gammal turkisk langdenhet som forekommer i gamla sprakliga och historiska kallor.",
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
        { label: "Historiska matenheter" },
      ]}
      title="Historiska matenheter"
      description="Upptack bysantinska, osmanska och gammalturkiska matenheter med sina moderna motsvarigheter i meter och gram och omvandla dem direkt med tva praktiska verktyg."
      alternateLink={{
        href: "/tarihi-olcu-birimleri",
        hrefLang: "tr",
        label: "Oppna den turkiska versionen",
      }}
      sections={[
        {
          heading: "Kort historisk bakgrund",
          content: (
            <>
              <p>
                Matningens historia i Anatolien och denna region borjade
                inte med det moderna metriska systemet; den gick igenom
                flera lager av bysantinska och senare osmanska system,
                utover annu aldre turkiska matt.
              </p>
              <p>
                Darfor forekommer namn som arşın, okka och dirhem fortfarande
                idag i gamla dokument, samt i vissa bocker och historisk
                forskning.
              </p>
            </>
          ),
        },
        {
          heading: "Konverterare for historiska langdenheter",
          content: (
            <>
              <p>
                Omvandla direkt mellan arşın, endaze, bysantinsk fot,
                bysantinskt famntag och çığ, med den moderna motsvarigheten
                i meter. For alla moderna langdenheter, se{" "}
                <Link href="/sv/categories/langd">det fullstandiga langdbiblioteket</Link>.
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
          heading: "Konverterare for historiska massaenheter",
          content: (
            <>
              <p>
                Omvandla mellan osmansk okka, dirhem, bysantinsk litra och
                bysantinsk ounkia, med det moderna grammet som referens. For
                moderna enheter som kilogram och ton, se{" "}
                <Link href="/sv/categories/massa">det fullstandiga massbiblioteket</Link>.
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
          heading: "Enheter fran den bysantinska tiden",
          content: (
            <>
              <p>
                Bysans arvde en stor del av den grekiska och romerska
                matningstraditionen och skapade praktiska langd- och
                massaenheter som anvandes inom handel och byggnation i
                arhundraden.
              </p>
              <UnitList units={byzantineUnits} />
            </>
          ),
        },
        {
          heading: "Enheter fran den osmanska tiden",
          content: (
            <>
              <p>
                Innan den osmanska staten helt overgick till det metriska
                systemet pa 1900-talet anvandes enheter som arşın, endaze,
                okka och dirhem inom handel, byggnation och vardagsliv.
              </p>
              <UnitList units={ottomanUnits} />
            </>
          ),
        },
        {
          heading: "Annu aldre turkiska enheter",
          content: (
            <>
              <p>
                Vissa gamla enheter ar fortfarande kanda tack vare
                sprakliga och historiska kallor, och ar viktiga for att
                forsta gamla texter och relatera dem till moderna matt.
              </p>
              <UnitList units={oldTurkicUnits} />
            </>
          ),
        },
        {
          heading: "Varfor ar dessa enheter fortfarande viktiga idag?",
          content: (
            <>
              <p>
                Dessa namn forekommer fortfarande idag i vakufhandlingar,
                gamla register, historisk forskning och oversattningsarbete;
                att omvandla dem till meter eller gram hjalper till att
                snabbt forsta dem.
              </p>
              <p>
                Denna sida ar ocksa anvandbar for studenter, innehalls-
                skapare och alla som vill lasa historiska tal med tydliga
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
                <Link href="/sv/kitchen-measurement-converter">Kokmatt</Link>
              </li>
              <li>
                <Link href="/sv/recipe-converter">Receptomvandlare</Link>
              </li>
              <li>
                <Link href="/sv/shoe-size-converter">Skostorlekskonverterare</Link>
              </li>
            </ul>
          ),
        },
      ]}
    />
  );
}
