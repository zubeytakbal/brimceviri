import type { Metadata } from "next";
import Link from "next/link";
import { germanCategoryPages } from "../../converter/localizedGermanCategoryPages";
import { germanConversionPages } from "../../converter/localizedGermanConversionPages";
import { buildSiteUrl } from "../../siteConfig";
import { germanStaticPaths } from "../../i18n/germanRoutes";

export const metadata: Metadata = {
  title: "Alle Umrechnungen",
  description:
    "Durchsuchen Sie alle verfügbaren deutschen Umrechnungsseiten nach Kategorie und öffnen Sie die passende Umrechnung direkt.",
  alternates: {
    canonical: germanStaticPaths.allConversions,
    languages: {
      tr: "/tum-birimler",
      en: "/en/all-conversions",
      de: germanStaticPaths.allConversions,
      "x-default": "/tum-birimler",
    },
  },
  openGraph: {
    title: "Alle Umrechnungen | BirimCeviri.app",
    description:
      "Alle deutschen Umrechnungsseiten für Länge, Masse, Druck und weitere Größen im Überblick.",
    url: buildSiteUrl(germanStaticPaths.allConversions),
    siteName: "BirimCeviri.app",
    locale: "de_DE",
    type: "website",
  },
};

export default function GermanAllConversionsPage() {
  const categories = germanCategoryPages.map((categoryPage) => ({
    page: categoryPage,
    conversions: germanConversionPages.filter(
      (conversionPage) => conversionPage.category === categoryPage.category
    ),
  }));

  return (
    <main className="unit-information-page" lang="de">
      <article className="unit-page-shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/de">Startseite</Link>
          <span aria-hidden="true">›</span>
          <span>Alle Umrechnungen</span>
        </nav>

        <header className="unit-page-header">
          <p className="unit-symbol">⇄</p>
          <h1>Alle Umrechnungen</h1>
          <p>
            Öffnen Sie deutsche Umrechnungsseiten nach Kategorie und springen
            Sie direkt zur gewünschten Einheitenkombination.
          </p>
        </header>

        <div className="unit-page-content">
          <section className="conversion-section">
            <h2>Wie ist die Seite aufgebaut?</h2>
            <p>
              Jede Kategorie bündelt verfügbare Einzelumrechnungen. So können
              Sie gezielt nach Länge, Masse, Druck, Temperatur oder weiteren
              Größen filtern, ohne erst manuell suchen zu müssen.
            </p>
          </section>

          {categories.map(({ page, conversions }) => (
            <section className="conversion-section related-conversions" key={page.slug}>
              <h2>{page.title}</h2>
              <ul className="related-conversion-list">
                {conversions.map((conversion) => (
                  <li key={conversion.slug}>
                    <Link href={`/de/${conversion.slug}`}>
                      {conversion.fromName} zu {conversion.toName}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
