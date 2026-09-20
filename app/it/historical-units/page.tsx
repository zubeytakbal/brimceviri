import Link from "next/link";
import CategoryUnitConverter from "../../components/CategoryUnitConverter";
import StaticPageLayout from "../../components/StaticPageLayout";
import { buildSiteUrl } from "../../siteConfig";

export const metadata = {
  title: "Unità di misura storiche",
  description:
    "Scopri le unità di misura bizantine, ottomane e turche antiche e convertile in metri e grammi con brevi spiegazioni.",
  alternates: {
    canonical: "/it/historical-units",
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
      "x-default": "/tarihi-olcu-birimleri",
    },
  },
  openGraph: {
    title: "Unità di misura storiche",
    description: "Scopri le unità di misura bizantine, ottomane e turche antiche.",
    url: buildSiteUrl("/it/historical-units"),
    siteName: "BirimCeviri.app",
    locale: "it_IT",
    type: "website",
  },
};

const historicalLengthUnitOptions = [
  { value: "m", label: "Metro (m)", symbol: "m" },
  { value: "arşın", label: "Arşın", symbol: "arşın" },
  { value: "endaze", label: "Endaze", symbol: "endaze" },
  { value: "pus", label: "Piede bizantino (Pous)", symbol: "pus" },
  { value: "orgyia", label: "Braccio bizantino (Orgyia)", symbol: "orgyia" },
  { value: "çığ", label: "Çığ", symbol: "çığ" },
];

const historicalMassUnitOptions = [
  { value: "g", label: "Grammo (g)", symbol: "g" },
  { value: "okka", label: "Okka ottomana", symbol: "okka" },
  { value: "dirhem", label: "Dirhem", symbol: "dirhem" },
  { value: "litra", label: "Litra bizantina", symbol: "litra" },
  { value: "ounkia", label: "Ounkia bizantina", symbol: "ounkia" },
];

const byzantineUnits = [
  {
    href: "/birimler/bizans-ayagi",
    name: "Piede bizantino (pous)",
    value: "≈ 0,3148 m",
    note: "Estensione del piede greco antico, usata fino al 1453.",
  },
  {
    href: "/birimler/bizans-kulaci",
    name: "Braccio bizantino (orgyia)",
    value: "= 6 pous ≈ 1,8888 m",
    note: "Distanza tra le punte delle dita con le braccia completamente distese.",
  },
  {
    href: "/birimler/bizans-litrasi",
    name: "Litra bizantina (litra)",
    value: "≈ 324 g",
    note: "Unità di massa di base della tradizione bizantina, influenzata dalla libbra romana.",
  },
  {
    href: "/birimler/bizans-onsu",
    name: "Ounkia bizantina (ounkia)",
    value: "= 1/12 litra ≈ 27 g",
    note: "Diversa dall'oncia moderna dei sistemi britannico e statunitense.",
  },
];

const ottomanUnits = [
  {
    href: "/birimler/arsin",
    name: "Arşın",
    value: "≈ 0,68 m",
    note: "Aveva vari usi: l'arşın di mercato, il più noto, e l'arşın da costruzione, usato per lunghezze maggiori.",
  },
  {
    href: "/birimler/endaze",
    name: "Endaze",
    value: "= 0,65 m",
    note: "Usata soprattutto per misurare tessuti e il relativo commercio.",
  },
  {
    href: "/birimler/okka",
    name: "Okka ottomana (Okka)",
    value: "= 400 dirhem ≈ 1282,945 g",
    note: "Una delle unità di peso più conosciute dei mercati ottomani tradizionali.",
  },
  {
    href: "/birimler/dirhem",
    name: "Dirhem",
    value: "= 1/400 okka ≈ 3,207 g",
    note: "Usata per piccole quantità, come metalli preziosi, spezie e alcuni cosmetici.",
  },
];

const oldTurkicUnits = [
  {
    href: "/birimler/cig",
    name: "Çığ",
    value: "≈ 0,333 m",
    note: "Un'antica unità di lunghezza turca, presente in fonti linguistiche e storiche antiche.",
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

export default function ItalianHistoricalUnitsPage() {
  return (
    <StaticPageLayout
      locale="it"
      breadcrumbAriaLabel="Percorso di navigazione"
      breadcrumbs={[
        { href: "/it", label: "Home" },
        { label: "Unità di misura storiche" },
      ]}
      title="Unità di misura storiche"
      description="Scopri le unità di misura bizantine, ottomane e turche antiche con i loro equivalenti moderni in metri e grammi e convertile direttamente con due strumenti pratici."
      alternateLink={{
        href: "/tarihi-olcu-birimleri",
        hrefLang: "tr",
        label: "Apri la versione turca",
      }}
      sections={[
        {
          heading: "Breve contesto storico",
          content: (
            <>
              <p>
                La storia della misurazione in Anatolia e in questa regione
                non è iniziata con il sistema metrico moderno; è passata
                attraverso vari strati di sistemi bizantini e poi ottomani,
                oltre a misure turche ancora più antiche.
              </p>
              <p>
                Per questo nomi come arşın, okka e dirhem compaiono ancora
                oggi in documenti antichi, oltre che in alcuni libri e
                ricerche storiche.
              </p>
            </>
          ),
        },
        {
          heading: "Convertitore di unità di lunghezza storiche",
          content: (
            <>
              <p>
                Converti direttamente tra arşın, endaze, piede bizantino,
                braccio bizantino e çığ, con l'equivalente moderno in
                metri. Per vedere tutte le unità di lunghezza moderne, apri
                la{" "}
                <Link href="/it/categories/lunghezza">biblioteca completa delle lunghezze</Link>.
              </p>
              <CategoryUnitConverter
                category="uzunluk"
                locale="it"
                unitOptions={historicalLengthUnitOptions}
              />
            </>
          ),
        },
        {
          heading: "Convertitore di unità di massa storiche",
          content: (
            <>
              <p>
                Converti tra l'okka ottomana, il dirhem, la litra bizantina
                e l'ounkia bizantina, usando il grammo moderno come
                riferimento. Per unità moderne come il chilogrammo e la
                tonnellata, apri la{" "}
                <Link href="/it/categories/massa">biblioteca completa delle masse</Link>.
              </p>
              <CategoryUnitConverter
                category="kutle"
                locale="it"
                unitOptions={historicalMassUnitOptions}
              />
            </>
          ),
        },
        {
          heading: "Unità dell'epoca bizantina",
          content: (
            <>
              <p>
                Bisanzio ereditò gran parte della tradizione di misurazione
                greca e romana e creò unità di lunghezza e massa pratiche
                che rimasero in uso nel commercio e nell'edilizia per
                secoli.
              </p>
              <UnitList units={byzantineUnits} />
            </>
          ),
        },
        {
          heading: "Unità dell'epoca ottomana",
          content: (
            <>
              <p>
                Prima che lo Stato ottomano passasse completamente al
                sistema metrico nel XX secolo, unità come arşın, endaze,
                okka e dirhem erano usate nel commercio, nell'edilizia e
                nella vita quotidiana.
              </p>
              <UnitList units={ottomanUnits} />
            </>
          ),
        },
        {
          heading: "Unità turche ancora più antiche",
          content: (
            <>
              <p>
                Alcune unità antiche sono ancora conosciute grazie a fonti
                linguistiche e storiche, e sono importanti per comprendere
                testi antichi e collegarli alle misure moderne.
              </p>
              <UnitList units={oldTurkicUnits} />
            </>
          ),
        },
        {
          heading: "Perché queste unità sono ancora importanti oggi?",
          content: (
            <>
              <p>
                Questi nomi compaiono ancora oggi in atti di waqf,
                registri antichi, ricerca storica e lavori di traduzione;
                convertirli in metri o grammi aiuta a comprenderli
                rapidamente.
              </p>
              <p>
                Questa pagina è utile anche per studenti, creatori di
                contenuti e chiunque voglia leggere numeri storici con
                riferimenti moderni chiari.
              </p>
            </>
          ),
        },
        {
          heading: "Strumenti correlati",
          content: (
            <ul className="related-conversion-list">
              <li>
                <Link href="/it/kitchen-measurement-converter">Convertitore di misure da cucina</Link>
              </li>
              <li>
                <Link href="/it/recipe-converter">Convertitore di ricette</Link>
              </li>
              <li>
                <Link href="/it/shoe-size-converter">Convertitore di numeri di scarpe</Link>
              </li>
            </ul>
          ),
        },
      ]}
    />
  );
}
