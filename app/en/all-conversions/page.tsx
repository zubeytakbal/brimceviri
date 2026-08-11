import type { Metadata } from "next";
import Link from "next/link";
import { englishConversionPages } from "../../converter/localizedConversionPages";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "All Unit Converters",

  description:
    "Browse all available length, mass and pressure conversion calculators. Convert metric and imperial units with formulas and conversion tables.",

  alternates: {
    canonical: "/en/all-conversions",
    languages: {
      tr: "/tum-birimler",
      en: "/en/all-conversions",
      "x-default": "/tum-birimler",
    },
  },

  openGraph: {
    title: "All Unit Converters | BirimCeviri.app",
    description:
      "Browse free online length, mass and pressure conversion tools.",
    url: buildSiteUrl("/en/all-conversions"),
    siteName: "BirimCeviri.app",
    locale: "en_US",
    type: "website",
  },
};

export default function EnglishAllConversionsPage() {
  const lengthConversions = englishConversionPages.filter(
    (page) => page.category === "uzunluk"
  );

  const massConversions = englishConversionPages.filter(
    (page) => page.category === "kutle"
  );

  const pressureConversions = englishConversionPages.filter(
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

          <span aria-hidden="true">›</span>

          <span>All Converters</span>
        </nav>

        <header className="unit-page-header">
          <p className="unit-symbol">⇄</p>

          <h1>All Unit Converters</h1>

          <p>
            Browse all available conversion calculators and select
            the measurement units you want to convert.
          </p>
        </header>

        <div className="unit-page-content">
          <section className="conversion-section">
            <h2>How to use the converters</h2>

            <p>
              Select a conversion below, enter a numerical value
              and view the converted result instantly. Each page
              also provides the conversion formula and a table of
              example values.
            </p>
          </section>

          <section className="conversion-section related-conversions">
            <h2>Length converters</h2>

            <p>
              Convert between meters, kilometers, centimeters,
              millimeters, miles and feet.
            </p>

            <ul className="related-conversion-list">
              {lengthConversions.map((page) => (
                <li key={page.slug}>
                  <Link href={`/en/${page.slug}`}>
                    {page.fromName} to {page.toName}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="conversion-section related-conversions">
            <h2>Mass converters</h2>

            <p>
              Convert between kilograms, grams, milligrams,
              tonnes, pounds and ounces.
            </p>

            <ul className="related-conversion-list">
              {massConversions.map((page) => (
                <li key={page.slug}>
                  <Link href={`/en/${page.slug}`}>
                    {page.fromName} to {page.toName}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="conversion-section related-conversions">
            <h2>Pressure converters</h2>

            <p>
              Convert between pascals, kilopascals, bar,
              atmospheres, PSI, mmHg and kilogram-force per
              square centimeter.
            </p>

            <ul className="related-conversion-list">
              {pressureConversions.map((page) => (
                <li key={page.slug}>
                  <Link href={`/en/${page.slug}`}>
                    {page.fromName} to {page.toName}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="conversion-section">
            <h2>Metric and imperial conversions</h2>

            <p>
              Metric conversions generally use decimal factors
              based on powers of ten. Conversions involving
              imperial or United States customary units use
              standardized conversion factors.
            </p>

            <p>
              The physical quantity remains unchanged during a
              conversion; only the unit and its corresponding
              numerical value change.
            </p>
          </section>

          <section className="conversion-section language-alternatives">
            <h2>Other languages</h2>

            <Link
              className="text-link"
              href="/tum-birimler"
              hrefLang="tr"
            >
              Türkçe dönüşüm listesini görüntüle
            </Link>
          </section>
        </div>
      </article>
    </main>
  );
}
