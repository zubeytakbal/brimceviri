import type { Metadata } from "next";
import Link from "next/link";
import { germanUnitPages } from "../../converter/localizedGermanUnitPages";
import { buildSiteUrl } from "../../siteConfig";
import { germanStaticPaths } from "../../i18n/germanRoutes";

const categoryTitles: Record<string, string> = {
  uzunluk: "Längeneinheiten",
  alan: "Flächeneinheiten",
  hacim: "Volumeneinheiten",
  kutle: "Masseneinheiten",
  sicaklik: "Temperatureinheiten",
  zaman: "Zeiteinheiten",
  hiz: "Geschwindigkeitseinheiten",
  basinc: "Druckeinheiten",
  enerji: "Energie- und Leistungseinheiten",
  debi: "Volumenstrom-Einheiten",
  elektrik: "Elektrische Einheiten",
};

export const metadata: Metadata = {
  title: "Einheitenleitfaden",
  description:
    "Öffnen Sie deutsche Leitfäden zu Längen-, Massen-, Druck-, Temperatur- und weiteren Einheiten mit Symbolen, Definitionen und Einsatzkontext.",
  alternates: {
    canonical: germanStaticPaths.units,
    languages: {
      tr: "/birimler",
      en: "/en/units",
      de: germanStaticPaths.units,
      "x-default": "/birimler",
    },
  },
  openGraph: {
    title: "Einheitenleitfaden | BirimCeviri.app",
    description:
      "Definitionen, Symbole und praktische Hinweise zu deutschen Einheitenleitfäden.",
    url: buildSiteUrl(germanStaticPaths.units),
    siteName: "BirimCeviri.app",
    locale: "de_DE",
    type: "website",
  },
};

export default function GermanUnitsPage() {
  const categories = Object.keys(categoryTitles)
    .map((category) => ({
      category,
      title: categoryTitles[category],
      units: germanUnitPages.filter((page) => page.category === category),
    }))
    .filter((group) => group.units.length > 0);

  return (
    <main className="unit-information-page" lang="de">
      <article className="unit-page-shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/de">Startseite</Link>
          <span aria-hidden="true">›</span>
          <span>Einheitenleitfaden</span>
        </nav>

        <header className="unit-page-header">
          <p className="unit-symbol">SI</p>
          <h1>Einheitenleitfaden</h1>
          <p>
            Öffnen Sie deutsche Leitfäden zu gebräuchlichen technischen Einheiten
            und vergleichen Sie Symbole, Definitionen und typische Anwendungen.
          </p>
        </header>

        <div className="unit-page-content">
          <section className="conversion-section">
            <h2>Was zeigt dieser Leitfaden?</h2>
            <p>
              Die Seite bündelt verfügbare deutsche Einheitenleitfäden nach
              Größenkategorie. Jede Detailseite erklärt Symbol, Einordnung,
              SI-Bezug und typische Einsatzfelder der jeweiligen Einheit.
            </p>
          </section>

          {categories.map((group) => (
            <section className="conversion-section related-conversions" key={group.category}>
              <h2>{group.title}</h2>
              <ul className="related-conversion-list">
                {group.units.map((unitPage) => (
                  <li key={unitPage.slug}>
                    <Link href={`/de/einheiten/${unitPage.slug}`}>
                      <strong>{unitPage.name}</strong>
                      {" — "}
                      {unitPage.symbol}
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
