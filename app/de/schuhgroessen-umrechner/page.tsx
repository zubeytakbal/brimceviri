import type { Metadata } from "next";
import Link from "next/link";
import ShoeSizeConverter from "../../components/ShoeSizeConverter";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Schuhgroessen Umrechner: EU, US und UK Tabelle",
  description:
    "Rechnen Sie Schuhgroessen zwischen EU, US und UK um. Vergleichen Sie Standardtabellen sowie Marken wie Nike, Adidas, Puma, New Balance und Converse.",
  alternates: {
    canonical: "/de/schuhgroessen-umrechner",
    languages: {
      tr: "/ayakkabi-numarasi-cevirme",
      en: "/en/shoe-size-converter",
      de: "/de/schuhgroessen-umrechner",
      "x-default": "/ayakkabi-numarasi-cevirme",
    },
  },
  openGraph: {
    title: "Schuhgroessen Umrechner: EU, US und UK Tabelle",
    description:
      "Vergleichen Sie EU-, US- und UK-Schuhgroessen sowie markenbezogene Tabellen.",
    url: buildSiteUrl("/de/schuhgroessen-umrechner"),
    siteName: "BirimCeviri.app",
    locale: "de_DE",
    type: "website",
  },
};

export default function GermanShoeSizePage() {
  return (
    <main className="all-conversions-page" lang="de">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Brotkrumen">
          <Link href="/de">Startseite</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Schuhgroessen Umrechner</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Schuhgroessen Umrechner</h1>
          <p>
            Geben Sie die bekannte Groesse ein und sehen Sie sofort die
            passenden EU-, US- und UK-Werte. Fuer Herren, Damen,
            Kleinkinder und groessere Kinder stehen eigene Tabellen zur
            Verfuegung.
          </p>
        </header>

        <ShoeSizeConverter locale="de" />

        <section className="category-article-content">
          <h2>Warum unterscheiden sich Schuhgroessen je nach Marke?</h2>
          <p>
            Das EU-System ist relativ stabil, doch US- und UK-Systeme
            folgen anderen Skalen. Dazu kommen markeneigene Leisten und
            Passformentscheidungen, sodass die gleiche Fusslaenge bei
            einer Marke etwas anders ausfallen kann.
          </p>
          <p>
            Fuer die beste Annaeherung messen Sie Ihre Fusslaenge in
            Zentimetern und verwenden diese als Ausgangswert.
          </p>
        </section>
      </div>
    </main>
  );
}
