import type { Metadata } from "next";
import Link from "next/link";
import CategoryUnitConverter from "../../components/CategoryUnitConverter";
import StaticPageLayout from "../../components/StaticPageLayout";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title:
    "Historische Masseinheiten: Byzantinisch, Osmanisch und Alttuerkisch",
  description:
    "Rechnen Sie historische Masseinheiten aus byzantinischer, osmanischer und alttuerkischer Zeit in Meter und Gramm um.",
  alternates: {
    canonical: "/de/historische-masseinheiten",
    languages: {
      tr: "/tarihi-olcu-birimleri",
      en: "/en/historical-units",
      de: "/de/historische-masseinheiten",
      "x-default": "/tarihi-olcu-birimleri",
    },
  },
  openGraph: {
    title:
      "Historische Masseinheiten: Byzantinisch, Osmanisch und Alttuerkisch",
    description:
      "Wandeln Sie historische byzantinische, osmanische und alttuerkische Masseinheiten in moderne Meter und Gramm um.",
    url: buildSiteUrl("/de/historische-masseinheiten"),
    siteName: "BirimCeviri.app",
    locale: "de_DE",
    type: "website",
  },
};

const historicalLengthUnitOptions = [
  { value: "m", label: "Meter (m)", symbol: "m" },
  { value: "arşın", label: "Arsin", symbol: "arşın" },
  { value: "endaze", label: "Endaze", symbol: "endaze" },
  { value: "pus", label: "Byzantinischer Fuss (Pous)", symbol: "pus" },
  {
    value: "orgyia",
    label: "Byzantinische Klafter (Orgyia)",
    symbol: "orgyia",
  },
  { value: "çığ", label: "Cig", symbol: "çığ" },
];

const historicalMassUnitOptions = [
  { value: "g", label: "Gramm (g)", symbol: "g" },
  { value: "okka", label: "Okka", symbol: "okka" },
  { value: "dirhem", label: "Dirhem", symbol: "dirhem" },
  { value: "litra", label: "Byzantinische Litra", symbol: "litra" },
  { value: "ounkia", label: "Byzantinische Ounkia", symbol: "ounkia" },
];

const byzantineUnits = [
  {
    href: "/birimler/bizans-ayagi",
    name: "Byzantinischer Fuss (pous)",
    value: "~ 0.3148 m",
    note: "Aus der antiken griechischen Tradition, im Einsatz bis 1453.",
  },
  {
    href: "/birimler/bizans-kulaci",
    name: "Byzantinische Klafter (orgyia)",
    value: "= 6 pous ~ 1.8888 m",
    note: "Abstand zwischen den Fingerspitzen bei ausgebreiteten Armen.",
  },
  {
    href: "/birimler/bizans-litrasi",
    name: "Byzantinische Litra (litra)",
    value: "~ 324 g",
    note: "Grundlegende Masseeinheit aus der Tradition der roemischen libra.",
  },
  {
    href: "/birimler/bizans-onsu",
    name: "Byzantinische Ounkia (ounkia)",
    value: "= 1/12 litra ~ 27 g",
    note: "Nicht identisch mit der modernen ounce.",
  },
];

const ottomanUnits = [
  {
    href: "/birimler/arsin",
    name: "Arsin",
    value: "~ 0.68 m",
    note: "Im Handel meist 68 cm, im Bauwesen gab es abweichende Varianten.",
  },
  {
    href: "/birimler/endaze",
    name: "Endaze",
    value: "= 0.65 m",
    note: "Vor allem bei Stoffen und Textilien gebraeuchlich.",
  },
  {
    href: "/birimler/okka",
    name: "Okka",
    value: "= 400 dirhem ~ 1282.945 g",
    note: "Weit verbreitete Gewichtsangabe in Markt und Alltag.",
  },
  {
    href: "/birimler/dirhem",
    name: "Dirhem",
    value: "= 1/400 okka ~ 3.207 g",
    note: "Haefig fuer Gewuerze, Edelmetalle und Medikamente genutzt.",
  },
];

const oldTurkicUnits = [
  {
    href: "/birimler/cig",
    name: "Cig",
    value: "~ 0.333 m",
    note: "Alttuerkische Laengeneinheit aus Divanu Lugati't-Turk.",
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
              <strong>{unit.value}</strong> - {unit.note}
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
}

export default function GermanHistoricalUnitsPage() {
  return (
    <StaticPageLayout
      locale="de"
      breadcrumbAriaLabel="Brotkrumen"
      breadcrumbs={[
        { href: "/de", label: "Startseite" },
        { label: "Historische Masseinheiten" },
      ]}
      title="Historische Masseinheiten"
      description="Entdecken Sie byzantinische, osmanische und alttuerkische Masseinheiten mit ihren modernen Entsprechungen in Meter und Gramm."
      alternateLink={{
        href: "/en/historical-units",
        hrefLang: "en",
        label: "Englische Version ansehen",
      }}
      sections={[
        {
          heading: "Von Byzanz bis zur Republik",
          content: (
            <>
              <p>
                Die Messgeschichte in Anatolien stammt nicht aus einer
                einzigen Quelle. Byzantinische, osmanische und aeltere
                tuerkische Systeme haben ueber Jahrhunderte nebeneinander
                gewirkt, bevor das metrische System verbindlich wurde.
              </p>
              <p>
                Diese Seite fasst typische historische Einheiten zusammen
                und zeigt ihre heutigen Entsprechungen in SI-Einheiten.
              </p>
            </>
          ),
        },
        {
          heading: "Historischer Laengenumrechner",
          content: (
            <>
              <p>
                Rechnen Sie Arsin, Endaze, byzantinischen Fuss,
                byzantinische Klafter und Cig direkt in Meter und
                untereinander um.
              </p>
              <CategoryUnitConverter
                category="uzunluk"
                locale="de"
                unitOptions={historicalLengthUnitOptions}
              />
            </>
          ),
        },
        {
          heading: "Historischer Masseumrechner",
          content: (
            <>
              <p>
                Rechnen Sie Okka, Dirhem, byzantinische Litra und
                Ounkia direkt in Gramm und untereinander um.
              </p>
              <CategoryUnitConverter
                category="kutle"
                locale="de"
                unitOptions={historicalMassUnitOptions}
              />
            </>
          ),
        },
        {
          heading: "Byzantinische Einheiten",
          content: (
            <>
              <p>
                Das byzantinische Reich uebernahm viele antike
                Messkonzepte und nutzte eigene Laengen- und
                Masseeinheiten bis in das spaete Mittelalter.
              </p>
              <UnitList units={byzantineUnits} />
            </>
          ),
        },
        {
          heading: "Osmanische Einheiten",
          content: (
            <>
              <p>
                Einheiten wie Arsin, Endaze, Okka und Dirhem spielten im
                Handel, in Werkstaetten und im Alltag eine wichtige Rolle.
              </p>
              <UnitList units={ottomanUnits} />
            </>
          ),
        },
        {
          heading: "Alttuerkische Einheiten",
          content: (
            <>
              <p>
                Fruehe tuerkische Quellen und Handelskontakte zeigen, dass
                bestimmte Laengenmasse schon lange vor der Moderne in
                Gebrauch waren.
              </p>
              <UnitList units={oldTurkicUnits} />
            </>
          ),
        },
        {
          heading: "Verwandte Kategorien",
          content: (
            <ul className="related-conversion-list">
              <li>
                <Link href="/de/kategorien/laenge">Alle Laengeneinheiten</Link>
              </li>
              <li>
                <Link href="/de/kategorien/masse">Alle Masseeinheiten</Link>
              </li>
            </ul>
          ),
        },
      ]}
    />
  );
}
