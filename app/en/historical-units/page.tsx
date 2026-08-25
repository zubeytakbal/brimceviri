import type { Metadata } from "next";
import Link from "next/link";
import CategoryUnitConverter from "../../components/CategoryUnitConverter";
import StaticPageLayout from "../../components/StaticPageLayout";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title:
    "Historical Units of Measurement: Byzantine, Ottoman and Old Turkic",
  description:
    "Convert historical units from the Byzantine, Ottoman and Old Turkic periods (arşın, okka, dirhem, endaze, Byzantine foot, Byzantine litra, çığ) to meters and grams for free.",
  alternates: {
    canonical: "/en/historical-units",
    languages: {
      tr: "/tarihi-olcu-birimleri",
      en: "/en/historical-units",
      "x-default": "/tarihi-olcu-birimleri",
    },
  },
  openGraph: {
    title:
      "Historical Units of Measurement: Byzantine, Ottoman and Old Turkic",
    description:
      "Convert historical Byzantine, Ottoman and Old Turkic units to modern meters and grams; review their history and sources.",
    url: buildSiteUrl("/en/historical-units"),
    siteName: "BirimCeviri.app",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title:
      "Historical Units of Measurement: Byzantine, Ottoman and Old Turkic",
    description:
      "Convert historical Byzantine, Ottoman and Old Turkic units to modern meters and grams.",
  },
};

const historicalLengthUnitOptions = [
  { value: "m", label: "Meter (m)", symbol: "m" },
  { value: "arşın", label: "Arşın", symbol: "arşın" },
  { value: "endaze", label: "Endaze", symbol: "endaze" },
  { value: "pus", label: "Byzantine Foot (Pous)", symbol: "pus" },
  { value: "orgyia", label: "Byzantine Fathom (Orgyia)", symbol: "orgyia" },
  { value: "çığ", label: "Çığ", symbol: "çığ" },
];

const historicalMassUnitOptions = [
  { value: "g", label: "Gram (g)", symbol: "g" },
  { value: "okka", label: "Okka", symbol: "okka" },
  { value: "dirhem", label: "Dirhem", symbol: "dirhem" },
  { value: "litra", label: "Byzantine Litra", symbol: "litra" },
  { value: "ounkia", label: "Byzantine Ounkia", symbol: "ounkia" },
];

const byzantineUnits = [
  {
    href: "/birimler/bizans-ayagi",
    name: "Byzantine Foot (pous)",
    value: "≈ 0.3148 m",
    note: "Derived from the Ancient Greek pous, used until 1453.",
  },
  {
    href: "/birimler/bizans-kulaci",
    name: "Byzantine Fathom (orgyia)",
    value: "= 6 pous ≈ 1.8888 m",
    note: "The distance between fingertips with arms spread wide.",
  },
  {
    href: "/birimler/bizans-litrasi",
    name: "Byzantine Litra (litra)",
    value: "≈ 324 g",
    note: "The base mass unit, from the tradition of the Roman libra.",
  },
  {
    href: "/birimler/bizans-onsu",
    name: "Byzantine Ounkia (ounkia)",
    value: "= 1/12 litra ≈ 27 g",
    note: "Different from the modern imperial ounce (28.35 g).",
  },
];

const ottomanUnits = [
  {
    href: "/birimler/arsin",
    name: "Arşın",
    value: "≈ 0.68 m (market arşın)",
    note: "68 cm in trade, 75.77 cm in construction (architect's arşın).",
  },
  {
    href: "/birimler/endaze",
    name: "Endaze",
    value: "= 0.65 m",
    note: "Used especially for measuring fabric and textiles.",
  },
  {
    href: "/birimler/okka",
    name: "Okka (Kıyye)",
    value: "= 400 dirhem ≈ 1282.945 g",
    note: "The most common weight unit used in markets and bazaars.",
  },
  {
    href: "/birimler/dirhem",
    name: "Dirhem",
    value: "= 1/400 okka ≈ 3.207 g",
    note: "Used for small quantities like precious metals, spices and medicine.",
  },
];

const oldTurkicUnits = [
  {
    href: "/birimler/cig",
    name: "Çığ",
    value: "≈ 0.333 m",
    note:
      "An Old Turkic length unit mentioned in Kaşgarlı Mahmud's Dîvânu Lugâti't-Türk.",
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
              <Link href={unit.href} hrefLang="tr">
                {unit.name}
              </Link>
            </h3>
            <p>
              <strong>{unit.value}</strong> — {unit.note}
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
}

export default function EnglishHistoricalUnitsPage() {
  return (
    <StaticPageLayout
      locale="en"
      breadcrumbAriaLabel="Breadcrumb"
      breadcrumbs={[
        { href: "/en", label: "Home" },
        { label: "Historical Units of Measurement" },
      ]}
      title="Historical Units of Measurement"
      description="Explore units of measurement from the Byzantine, Ottoman and Old Turkic periods alongside their modern meter and gram equivalents, and convert freely between them."
      alternateLink={{
        href: "/tarihi-olcu-birimleri",
        hrefLang: "tr",
        label: "Türkçe versiyonunu görüntüle",
      }}
      sections={[
        {
          heading: "From Byzantium to the Republic: a history of measurement",
          content: (
            <>
              <p>
                The units used across what is now Turkey do not come from
                a single source: there is an unbroken historical thread
                running from the Byzantine Empire&apos;s fathom and litra,
                through the Ottoman arşın and okka, to the Old Turkic
                tribes&apos; çığ, and finally to the metric system adopted
                with the 1931 Weights and Measures Act.
              </p>
              <p>
                This page brings together units from these three
                different eras. You can find each unit&apos;s modern SI
                equivalent, a short history, and conversion tools for
                related units in the sections below.
              </p>
            </>
          ),
        },
        {
          heading: "Historical Length Unit Converter",
          content: (
            <>
              <p>
                Convert instantly between arşın, endaze, the Byzantine
                foot, the Byzantine fathom and çığ, alongside the modern
                meter equivalent. (For all modern length units like
                meters and kilometers, use the{" "}
                <Link href="/en/categories/length">
                  length conversions page
                </Link>
                .)
              </p>
              <CategoryUnitConverter
                category="uzunluk"
                locale="en"
                unitOptions={historicalLengthUnitOptions}
              />
            </>
          ),
        },
        {
          heading: "Historical Mass Unit Converter",
          content: (
            <>
              <p>
                Convert instantly between okka, dirhem, the Byzantine
                litra and the Byzantine ounkia, alongside the modern gram
                equivalent. (For all modern mass units like kilograms and
                tonnes, use the{" "}
                <Link href="/en/categories/mass">
                  mass conversions page
                </Link>
                .)
              </p>
              <CategoryUnitConverter
                category="kutle"
                locale="en"
                unitOptions={historicalMassUnitOptions}
              />
            </>
          ),
        },
        {
          heading: "Byzantine-Era Units of Measurement",
          content: (
            <>
              <p>
                The Byzantine Empire inherited the Ancient Greek
                measurement tradition and used its own length (pous,
                orgyia) and mass (litra, ounkia) units until the fall of
                Constantinople in 1453.
              </p>
              <UnitList units={byzantineUnits} />
            </>
          ),
        },
        {
          heading: "Ottoman-Era Units of Measurement",
          content: (
            <>
              <p>
                Units such as arşın, endaze, okka and dirhem were used in
                Ottoman trade, construction and everyday life; they were
                fully abolished by the 1931 Weights and Measures Act,
                following the first metric reform efforts in 1869.
              </p>
              <UnitList units={ottomanUnits} />
            </>
          ),
        },
        {
          heading: "Old Turkic (Köktürk) Units of Measurement",
          content: (
            <>
              <p>
                The most important source for pre-Ottoman Turkic units of
                measurement is Kaşgarlı Mahmud&apos;s 11th-century work
                Dîvânu Lugâti&apos;t-Türk. Trade relations with China
                during the Köktürk period also led to an exchange of
                terminology in units of measurement.
              </p>
              <UnitList units={oldTurkicUnits} />
            </>
          ),
        },
        {
          heading: "Why are these units still searched for?",
          content: (
            <p>
              Although these measures are no longer official, they are
              still frequently sought after in history and archaeology
              research, in interpreting old land registry records and
              endowment (vakfiye) and Islamic court (şer&apos;iyye)
              documents, in school assignments, and among general culture
              enthusiasts. The tools on this page let you quickly convert
              these values to modern units.
            </p>
          ),
        },
        {
          heading: "Related categories",
          content: (
            <ul className="related-conversion-list">
              <li>
                <Link href="/en/categories/length">
                  All length units
                </Link>
              </li>
              <li>
                <Link href="/en/categories/mass">All mass units</Link>
              </li>
            </ul>
          ),
        },
      ]}
    />
  );
}
