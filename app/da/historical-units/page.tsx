import Link from "next/link";
import CategoryUnitConverter from "../../components/CategoryUnitConverter";
import StaticPageLayout from "../../components/StaticPageLayout";
import { buildSiteUrl } from "../../siteConfig";

export const metadata = {
  title: "Historiske maleenheder",
  description:
    "Udforsk byzantinske, osmanniske og gammeltyrkiske maleenheder og omregn dem til meter og gram med korte forklaringer.",
  alternates: {
    canonical: "/da/historical-units",
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
      no: "/no/historical-units",
      da: "/da/historical-units",
      "x-default": "/tarihi-olcu-birimleri",
    },
  },
  openGraph: {
    title: "Historiske maleenheder",
    description: "Udforsk byzantinske, osmanniske og gammeltyrkiske maleenheder.",
    url: buildSiteUrl("/da/historical-units"),
    siteName: "BirimCeviri.app",
    locale: "da_DK",
    type: "website",
  },
};

const historicalLengthUnitOptions = [
  { value: "m", label: "Meter (m)", symbol: "m" },
  { value: "arşın", label: "Arşın", symbol: "arşın" },
  { value: "endaze", label: "Endaze", symbol: "endaze" },
  { value: "pus", label: "Byzantinsk fod (Pous)", symbol: "pus" },
  { value: "orgyia", label: "Byzantinsk favn (Orgyia)", symbol: "orgyia" },
  { value: "çığ", label: "Çığ", symbol: "çığ" },
];

const historicalMassUnitOptions = [
  { value: "g", label: "Gram (g)", symbol: "g" },
  { value: "okka", label: "Osmannisk okka", symbol: "okka" },
  { value: "dirhem", label: "Dirhem", symbol: "dirhem" },
  { value: "litra", label: "Byzantinsk litra", symbol: "litra" },
  { value: "ounkia", label: "Byzantinsk ounkia", symbol: "ounkia" },
];

const byzantineUnits = [
  {
    href: "/birimler/bizans-ayagi",
    name: "Byzantinsk fod (pous)",
    value: "≈ 0,3148 m",
    note: "Forlaengelse af den antikke graeske fod, brugt frem til 1453.",
  },
  {
    href: "/birimler/bizans-kulaci",
    name: "Byzantinsk favn (orgyia)",
    value: "= 6 pous ≈ 1,8888 m",
    note: "Afstanden mellem fingerspidserne med helt udstrakte arme.",
  },
  {
    href: "/birimler/bizans-litrasi",
    name: "Byzantinsk litra (litra)",
    value: "≈ 324 g",
    note: "Grundlaeggende masseenhed i den byzantinske tradition, pavirket af det romerske pund.",
  },
  {
    href: "/birimler/bizans-onsu",
    name: "Byzantinsk ounkia (ounkia)",
    value: "= 1/12 litra ≈ 27 g",
    note: "Adskiller sig fra den moderne ounce i de britiske og amerikanske systemer.",
  },
];

const ottomanUnits = [
  {
    href: "/birimler/arsin",
    name: "Arşın",
    value: "≈ 0,68 m",
    note: "Havde flere anvendelsesomrader: marked-arşın, den mest kendte, og bygge-arşın, som blev brugt til storre laengder.",
  },
  {
    href: "/birimler/endaze",
    name: "Endaze",
    value: "= 0,65 m",
    note: "Blev saerligt brugt til at male stof og tekstiler, samt relateret handel.",
  },
  {
    href: "/birimler/okka",
    name: "Osmannisk okka (Okka)",
    value: "= 400 dirhem ≈ 1282,945 g",
    note: "En af de mest kendte vaegtenheder pa traditionelle osmanniske markeder.",
  },
  {
    href: "/birimler/dirhem",
    name: "Dirhem",
    value: "= 1/400 okka ≈ 3,207 g",
    note: "Blev brugt til sma maengder, som aedle metaller, krydderier og enkelte kosmetiske produkter.",
  },
];

const oldTurkicUnits = [
  {
    href: "/birimler/cig",
    name: "Çığ",
    value: "≈ 0,333 m",
    note: "En gammel tyrkisk laengdeenhed, der forekommer i gamle sprogvidenskabelige og historiske kilder.",
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

export default function DanishHistoricalUnitsPage() {
  return (
    <StaticPageLayout
      locale="da"
      breadcrumbAriaLabel="Sidenavigation"
      breadcrumbs={[
        { href: "/da", label: "Hjem" },
        { label: "Historiske maleenheder" },
      ]}
      title="Historiske maleenheder"
      description="Udforsk byzantinske, osmanniske og gammeltyrkiske maleenheder med deres moderne modstykker i meter og gram, og omregn dem direkte med to praktiske vaerktojer."
      alternateLink={{
        href: "/tarihi-olcu-birimleri",
        hrefLang: "tr",
        label: "Abn den tyrkiske version",
      }}
      sections={[
        {
          heading: "Kort historisk baggrund",
          content: (
            <>
              <p>
                Malingens historie i Anatolien og denne region begyndte
                ikke med det moderne metriske system; den gennemgik flere
                lag af byzantinske og senere osmanniske systemer, ud over
                endnu aeldre tyrkiske mal.
              </p>
              <p>
                Derfor forekommer navne som arşın, okka og dirhem stadig i
                dag i gamle dokumenter, samt i enkelte boger og historisk
                forskning.
              </p>
            </>
          ),
        },
        {
          heading: "Omregner for historiske laengdeenheder",
          content: (
            <>
              <p>
                Omregn direkte mellem arşın, endaze, byzantinsk fod,
                byzantinsk favn og çığ, med den moderne modvaerdi i meter.
                For alle moderne laengdeenheder, se{" "}
                <Link href="/da/categories/laengde">det fuldstaendige laengdebibliotek</Link>.
              </p>
              <CategoryUnitConverter
                category="uzunluk"
                locale="da"
                unitOptions={historicalLengthUnitOptions}
              />
            </>
          ),
        },
        {
          heading: "Omregner for historiske masseenheder",
          content: (
            <>
              <p>
                Omregn mellem osmannisk okka, dirhem, byzantinsk litra og
                byzantinsk ounkia, med det moderne gram som reference. For
                moderne enheder som kilogram og ton, se{" "}
                <Link href="/da/categories/masse">det fuldstaendige massebibliotek</Link>.
              </p>
              <CategoryUnitConverter
                category="kutle"
                locale="da"
                unitOptions={historicalMassUnitOptions}
              />
            </>
          ),
        },
        {
          heading: "Enheder fra den byzantinske tid",
          content: (
            <>
              <p>
                Byzans arvede en stor del af den graeske og romerske
                maletradition og skabte praktiske laengde- og masseenheder,
                der blev brugt inden for handel og byggeri i arhundreder.
              </p>
              <UnitList units={byzantineUnits} />
            </>
          ),
        },
        {
          heading: "Enheder fra den osmanniske tid",
          content: (
            <>
              <p>
                For den osmanniske stat helt gik over til det metriske
                system i 1900-tallet, blev enheder som arşın, endaze,
                okka og dirhem brugt inden for handel, byggeri og
                dagligdagen.
              </p>
              <UnitList units={ottomanUnits} />
            </>
          ),
        },
        {
          heading: "Endnu aeldre tyrkiske enheder",
          content: (
            <>
              <p>
                Enkelte gamle enheder er stadig kendt takket vaere
                sprogvidenskabelige og historiske kilder, og er vigtige
                for at forsta gamle tekster og relatere dem til moderne
                mal.
              </p>
              <UnitList units={oldTurkicUnits} />
            </>
          ),
        },
        {
          heading: "Hvorfor er disse enheder stadig vigtige i dag?",
          content: (
            <>
              <p>
                Disse navne forekommer stadig i dag i vakf-dokumenter,
                gamle registre, historisk forskning og oversaettelsesarbejde;
                at omregne dem til meter eller gram hjaelper med at forsta
                dem hurtigt.
              </p>
              <p>
                Denne side er ogsa nyttig for studerende,
                indholdsproducenter og alle, der onsker at laese historiske
                tal med tydelige moderne referencer.
              </p>
            </>
          ),
        },
        {
          heading: "Relaterede vaerktojer",
          content: (
            <ul className="related-conversion-list">
              <li>
                <Link href="/da/kitchen-measurement-converter">Kokkenmal</Link>
              </li>
              <li>
                <Link href="/da/recipe-converter">Opskriftomregner</Link>
              </li>
              <li>
                <Link href="/da/shoe-size-converter">Skostorrelseomregner</Link>
              </li>
            </ul>
          ),
        },
      ]}
    />
  );
}
