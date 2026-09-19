import type { Metadata } from "next";
import Link from "next/link";
import ElementRankingTableDe from "../../components/ElementRankingTableDe";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Schwerste und leichteste Elemente: Sortierbare Elementtabelle",
  description:
    "Sortiere alle 118 Elemente nach Atommasse, Ordnungszahl oder Name — das schwerste Element, das leichteste Element und alle dazwischen in einer Tabelle.",
  alternates: {
    canonical: "/de/elementrangliste",
    languages: {
      tr: "/bilim-hesaplayicilari/kimya/element-siralamasi",
      de: "/de/elementrangliste",
      "x-default": "/bilim-hesaplayicilari/kimya/element-siralamasi",
    },
  },
  openGraph: {
    title: "Schwerste und leichteste Elemente: Sortierbare Elementtabelle",
    description: "Sortiere alle 118 Elemente nach Atommasse, Ordnungszahl oder Name.",
    url: buildSiteUrl("/de/elementrangliste"),
    siteName: "BirimCeviri.app",
    locale: "de_DE",
    type: "website",
  },
};

export default function GermanElementRankingPage() {
  return (
    <main className="all-conversions-page">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Seitenpfad">
          <Link href="/de">Startseite</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Elementrangliste</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Schwerste und leichteste Elemente</h1>
          <p>
            Sortiere alle 118 Elemente nach Atommasse, Ordnungszahl oder
            Name. Klicke auf eine Spaltenüberschrift, um die
            Sortierrichtung zu ändern.
          </p>
        </header>

        <ElementRankingTableDe />

        <section className="category-article-content">
          <h2>Welches ist das schwerste und leichteste Element?</h2>
          <p>
            Unter den natürlich vorkommenden Elementen ist{" "}
            <strong>Wasserstoff</strong> das leichteste (Atommasse 1,008
            u). Das schwerste natürliche Element ist <strong>Uran</strong>{" "}
            (Atommasse 238,029 u). Unter den im Labor künstlich
            synthetisierten, extrem kurzlebigen superschweren Elementen
            ist <strong>Oganesson</strong> das schwerste (Atommasse 294
            u).
          </p>

          <h2>Was bedeutet Atommasse?</h2>
          <p>
            Die Atommasse gibt das durchschnittliche Atomgewicht eines
            Elements in atomaren Masseneinheiten (u) an. Dieser Wert ist
            der gewichtete Durchschnitt aller natürlich vorkommenden
            Isotope des Elements und steht im Periodensystem meist als
            kleine Zahl unter jedem Element.
          </p>

          <h2>Wofür ist die Rangliste nützlich?</h2>
          <p>
            Das Periodensystem selbst ordnet die Elemente nach
            Ordnungszahl und chemischer Ähnlichkeit, aber manchmal
            braucht man eine schnelle Antwort auf die Frage &quot;welches
            Element ist schwerer/leichter&quot;. Diese Tabelle zeigt
            dieselben 118 Elemente aus einem anderen Blickwinkel —
            direkt numerisch sortiert — und beantwortet solche Fragen
            sofort.
          </p>

          <h2>Verwandte Tools</h2>
          <p>
            Für das vollständige Periodensystem siehe{" "}
            <Link href="/de/periodensystem">Periodensystem</Link>, für
            die Berechnung der Atommasse siehe{" "}
            <Link href="/de/atommasse-berechnen">Atommasse berechnen</Link>.
          </p>
        </section>
      </div>
    </main>
  );
}
