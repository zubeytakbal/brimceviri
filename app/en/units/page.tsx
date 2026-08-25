import type { Metadata } from "next";
import Link from "next/link";
import { englishUnitPages } from "../../converter/localizedUnitPages";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Unit Guide: Definitions, Symbols and History",
  description:
    "Explore length, mass and pressure units, their symbols, definitions, historical information and related conversion calculators.",
  alternates: {
    canonical: "/en/units",
    languages: {
      tr: "/birimler",
      en: "/en/units",
      "x-default": "/birimler",
    },
  },
  openGraph: {
    title: "Unit Guide | BirimCeviri.app",
    description:
      "Learn about length, mass and pressure units, their symbols, definitions, history and conversion relationships.",
    url: buildSiteUrl("/en/units"),
    siteName: "BirimCeviri.app",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Unit Guide | BirimCeviri.app",
    description:
      "Learn about length, mass and pressure units, their symbols, definitions, history and conversion relationships.",
  },
};

export default function EnglishUnitsPage() {
  const lengthUnits = englishUnitPages.filter(
    (page) => page.category === "uzunluk"
  );

  const massUnits = englishUnitPages.filter(
    (page) => page.category === "kutle"
  );

  const pressureUnits = englishUnitPages.filter(
    (page) => page.category === "basinc"
  );

  return (
    <main className="unit-information-page" lang="en">
      <article className="unit-page-shell">
        <nav
          className="breadcrumbs"
          aria-label="Breadcrumb"
        >
          <Link href="/en">Home</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Unit Guide</span>
        </nav>

        <header className="unit-page-header">
          <p className="unit-symbol">SI</p>
          <h1>Measurement Unit Guide</h1>
          <p>
            Explore measurement units, their symbols,
            definitions, historical development and related
            conversion tools.
          </p>
        </header>

        <div className="unit-page-content">
          <section className="conversion-section">
            <h2>What is a measurement unit?</h2>
            <p>
              A measurement unit is a defined quantity used as a
              reference for expressing and comparing physical
              measurements. A numerical value without a unit does
              not fully describe a physical measurement.
            </p>
            <p>
              Standardized units allow measurements performed in
              different places and at different times to be
              compared consistently. The International System of
              Units provides the primary measurement framework
              used in science and engineering.
            </p>
          </section>

          <section className="conversion-section related-conversions">
            <h2>Length units</h2>
            <p>
              Length units describe distance, height, width,
              thickness and other one-dimensional measurements.
            </p>
            <ul className="related-conversion-list">
              {lengthUnits.map((unitPage) => (
                <li key={unitPage.slug}>
                  <Link href={`/en/units/${unitPage.slug}`}>
                    <strong>{unitPage.name}</strong>
                    {" - "}
                    {unitPage.symbol}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="conversion-section related-conversions">
            <h2>Mass units</h2>
            <p>
              Mass units express the quantity of matter associated
              with an object. Mass should not be confused with
              weight, which is a force affected by gravitational
              acceleration.
            </p>
            <ul className="related-conversion-list">
              {massUnits.map((unitPage) => (
                <li key={unitPage.slug}>
                  <Link href={`/en/units/${unitPage.slug}`}>
                    <strong>{unitPage.name}</strong>
                    {" - "}
                    {unitPage.symbol}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="conversion-section related-conversions">
            <h2>Pressure units</h2>
            <p>
              Pressure units describe force distributed over an
              area. Practical work commonly switches between
              pascal, kilopascal, bar and PSI depending on the
              field and the scale of the measurement.
            </p>
            <ul className="related-conversion-list">
              {pressureUnits.map((unitPage) => (
                <li key={unitPage.slug}>
                  <Link href={`/en/units/${unitPage.slug}`}>
                    <strong>{unitPage.name}</strong>
                    {" - "}
                    {unitPage.symbol}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="conversion-section">
            <h2>Metric and imperial units</h2>
            <p>
              Metric units use decimal relationships based on
              powers of ten. Prefixes such as kilo, centi and milli
              indicate multiples or subdivisions of a base unit.
            </p>
            <p>
              Imperial and United States customary units include
              measurements such as the foot, mile and pound.
              Defined conversion factors are required when
              converting between these systems and metric units.
            </p>
          </section>

          <section className="conversion-section">
            <h2>Unit symbols</h2>
            <p>
              Unit symbols are standardized abbreviations. Symbols
              are case-sensitive and normally remain unchanged in
              the plural. For example, meter is represented by m,
              kilometer by km and kilogram by kg.
            </p>
          </section>

          <section className="conversion-section language-alternatives">
            <h2>Other languages</h2>
            <Link
              className="text-link"
              href="/birimler"
              hrefLang="tr"
            >
              View the Turkish unit guide
            </Link>
          </section>
        </div>
      </article>
    </main>
  );
}
