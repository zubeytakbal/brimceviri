import Link from "next/link";
import CategoryUnitConverter from "../../components/CategoryUnitConverter";
import StaticPageLayout from "../../components/StaticPageLayout";
import { buildSiteUrl } from "../../siteConfig";

export const metadata = {
  title: "Historiske måleenheter",
  description:
    "Utforsk bysantinske, osmanske og gammeltyrkiske måleenheter og regn dem om til meter og gram med korte forklaringer.",
  alternates: {
    canonical: "/no/historiske-enheter",
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
      no: "/no/historiske-enheter",
      "x-default": "/tarihi-olcu-birimleri",
    },
  },
  openGraph: {
    title: "Historiske måleenheter",
    description: "Utforsk bysantinske, osmanske og gammeltyrkiske måleenheter.",
    url: buildSiteUrl("/no/historiske-enheter"),
    siteName: "BirimCeviri.app",
    locale: "nb_NO",
    type: "website",
  },
};

const historicalLengthUnitOptions = [
  { value: "m", label: "Meter (m)", symbol: "m" },
  { value: "arşın", label: "Arşın", symbol: "arşın" },
  { value: "endaze", label: "Endaze", symbol: "endaze" },
  { value: "pus", label: "Bysantinsk fot (Pous)", symbol: "pus" },
  { value: "orgyia", label: "Bysantinsk favn (Orgyia)", symbol: "orgyia" },
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
    note: "Forlengelse av den antikke greske foten, brukt frem til 1453.",
  },
  {
    href: "/birimler/bizans-kulaci",
    name: "Bysantinsk favn (orgyia)",
    value: "= 6 pous ≈ 1,8888 m",
    note: "Avstanden mellom fingertuppene med helt utstrakte armer.",
  },
  {
    href: "/birimler/bizans-litrasi",
    name: "Bysantinsk litra (litra)",
    value: "≈ 324 g",
    note: "Grunnleggende masseenhet i den bysantinske tradisjonen, påvirket av det romerske pundet.",
  },
  {
    href: "/birimler/bizans-onsu",
    name: "Bysantinsk ounkia (ounkia)",
    value: "= 1/12 litra ≈ 27 g",
    note: "Skiller seg fra den moderne ounce i de britiske og amerikanske systemene.",
  },
];

const ottomanUnits = [
  {
    href: "/birimler/arsin",
    name: "Arşın",
    value: "≈ 0,68 m",
    note: "Hadde flere bruksområder: markeds-arşın, den mest kjente, og bygge-arşın, som ble brukt for større lengder.",
  },
  {
    href: "/birimler/endaze",
    name: "Endaze",
    value: "= 0,65 m",
    note: "Ble særlig brukt til å måle stoff og tekstiler, samt relatert handel.",
  },
  {
    href: "/birimler/okka",
    name: "Osmansk okka (Okka)",
    value: "= 400 dirhem ≈ 1282,945 g",
    note: "En av de mest kjente vektenhetene på tradisjonelle osmanske markeder.",
  },
  {
    href: "/birimler/dirhem",
    name: "Dirhem",
    value: "= 1/400 okka ≈ 3,207 g",
    note: "Ble brukt for små mengder, som edle metaller, krydder og enkelte kosmetiske produkter.",
  },
];

const oldTurkicUnits = [
  {
    href: "/birimler/cig",
    name: "Çığ",
    value: "≈ 0,333 m",
    note: "En gammel tyrkisk lengdeenhet som forekommer i gamle språkvitenskapelige og historiske kilder.",
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

export default function NorwegianHistoricalUnitsPage() {
  return (
    <StaticPageLayout
      locale="no"
      breadcrumbAriaLabel="Sidenavigering"
      breadcrumbs={[
        { href: "/no", label: "Hjem" },
        { label: "Historiske måleenheter" },
      ]}
      title="Historiske måleenheter"
      description="Utforsk bysantinske, osmanske og gammeltyrkiske måleenheter med sine moderne motsvarigheter i meter og gram, og regn dem om direkte med to praktiske verktøy."
      alternateLink={{
        href: "/tarihi-olcu-birimleri",
        hrefLang: "tr",
        label: "Oppnå den turkiska versionen",
      }}
      sections={[
        {
          heading: "Kort historisk bakgrunn",
          content: (
            <>
              <p>
                Målingens historie i Anatolia og denne regionen startet
                ikke med det moderne metriske systemet; den gikk gjennom
                flere lag av bysantinske og senere osmanske systemer, i
                tillegg til enda eldre tyrkiske mål.
              </p>
              <p>
                Derfor forekommer navn som arşın, okka og dirhem fortsatt i
                dag i gamle dokumenter, samt i enkelte bøker og historisk
                forskning.
              </p>
            </>
          ),
        },
        {
          heading: "Omregner for historiske lengdeenheter",
          content: (
            <>
              <p>
                Regn direkte om mellom arşın, endaze, bysantinsk fot,
                bysantinsk favn og çığ, med den moderne motsvarigheten i
                meter. For alle moderne lengdeenheter, se{" "}
                <Link href="/no/kategorier/lengde">det fullstendige lengdebiblioteket</Link>.
              </p>
              <CategoryUnitConverter
                category="uzunluk"
                locale="no"
                unitOptions={historicalLengthUnitOptions}
              />
            </>
          ),
        },
        {
          heading: "Omregner for historiske masseenheter",
          content: (
            <>
              <p>
                Regn om mellom osmansk okka, dirhem, bysantinsk litra og
                bysantinsk ounkia, med det moderne grammet som referanse.
                For moderne enheter som kilogram og tonn, se{" "}
                <Link href="/no/kategorier/masse">det fullstendige massebiblioteket</Link>.
              </p>
              <CategoryUnitConverter
                category="kutle"
                locale="no"
                unitOptions={historicalMassUnitOptions}
              />
            </>
          ),
        },
        {
          heading: "Enheter fra den bysantinske tiden",
          content: (
            <>
              <p>
                Bysants arvet en stor del av den greske og romerske
                måletradisjonen og skapte praktiske lengde- og
                masseenheter som ble brukt innen handel og byggevirksomhet
                i århundrer.
              </p>
              <UnitList units={byzantineUnits} />
            </>
          ),
        },
        {
          heading: "Enheter fra den osmanske tiden",
          content: (
            <>
              <p>
                For den osmanske staten helt gikk over til det metriske
                systemet på 1900-tallet, ble enheter som arşın, endaze,
                okka og dirhem brukt innen handel, byggevirksomhet og
                dagligliv.
              </p>
              <UnitList units={ottomanUnits} />
            </>
          ),
        },
        {
          heading: "Enda eldre tyrkiske enheter",
          content: (
            <>
              <p>
                Enkelte gamle enheter er fortsatt kjent takket være
                språkvitenskapelige og historiske kilder, og er viktige for
                å forstå gamle tekster og relatere dem til moderne mål.
              </p>
              <UnitList units={oldTurkicUnits} />
            </>
          ),
        },
        {
          heading: "Hvorfor er disse enhetene fortsatt viktige i dag?",
          content: (
            <>
              <p>
                Disse navnene forekommer fortsatt i dag i vakf-dokumenter,
                gamle registre, historisk forskning og oversettelsesarbeid;
                å regne dem om til meter eller gram hjelper til med å
                raskt forstå dem.
              </p>
              <p>
                Denne siden er også nyttig for studenter,
                innholdsprodusenter og alle som ønsker å lese historiske
                tall med tydelige moderne referanser.
              </p>
            </>
          ),
        },
        {
          heading: "Relaterte verktøy",
          content: (
            <ul className="related-conversion-list">
              <li>
                <Link href="/no/kjokkenmal-omregner">Kjøkkenmål</Link>
              </li>
              <li>
                <Link href="/no/oppskriftomregner">Oppskriftomregner</Link>
              </li>
              <li>
                <Link href="/no/skostorrelser">Skostørrelseomregner</Link>
              </li>
            </ul>
          ),
        },
      ]}
    />
  );
}
