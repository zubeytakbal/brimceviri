import type { Metadata } from "next";
import Link from "next/link";
import PeriodicTable from "../../components/PeriodicTable";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Periodensystem: Alle 118 Elemente mit Details",
  description:
    "Interaktives Periodensystem — fahre über ein Element für Schnellinfos, klicke für die Detailseite mit Ordnungszahl, Atommasse, Kategorie und mehr.",
  alternates: {
    canonical: "/de/periodensystem",
    languages: {
      tr: "/bilim-hesaplayicilari/kimya/periyodik-tablo",
      de: "/de/periodensystem",
      "x-default": "/bilim-hesaplayicilari/kimya/periyodik-tablo",
    },
  },
  openGraph: {
    title: "Periodensystem: Alle 118 Elemente mit Details",
    description:
      "Interaktives Periodensystem — fahre über ein Element für Schnellinfos, klicke für die Detailseite.",
    url: buildSiteUrl("/de/periodensystem"),
    siteName: "BirimCeviri.app",
    locale: "de_DE",
    type: "website",
  },
};

export default function GermanPeriodicTablePage() {
  return (
    <main className="all-conversions-page">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Seitenpfad">
          <Link href="/de">Startseite</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Periodensystem</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Periodensystem</h1>
          <p>
            Alle 118 Elemente — mit Ordnungszahl, Atommasse und
            Kategorie. Klicke auf ein Element, um die
            Detailseite zu öffnen.
          </p>
        </header>

        <PeriodicTable locale="de" />

        <section className="category-article-content">
          <h2>Was ist das Periodensystem?</h2>
          <p>
            Das Periodensystem ist ein Klassifikationssystem, das die
            chemischen Elemente nach steigender Ordnungszahl und
            ähnlichen chemischen Eigenschaften anordnet. Elemente in
            derselben Spalte (Gruppe) haben eine ähnliche äußere
            Elektronenkonfiguration und damit ein ähnliches chemisches
            Verhalten; Elemente in derselben Zeile (Periode) haben die
            gleiche Anzahl an Elektronenschalen.
          </p>

          <h2>Was bedeuten die Farben?</h2>
          <p>
            Jede Farbe in der Tabelle zeigt eine Kategorie, in die
            Elemente nach ihrem allgemeinen chemischen und physikalischen
            Verhalten eingeteilt werden: Alkalimetalle,
            Erdalkalimetalle, Übergangsmetalle, Halbmetalle
            (Metalloide), Nichtmetalle, Halogene, Edelgase sowie die
            Lanthanoid- und Actinoid-Reihen. Die vollständige Liste
            findest du in der Legende unter der Tabelle.
          </p>

          <h2>Was steht auf den Elementseiten?</h2>
          <p>
            Jede Elementseite zeigt Ordnungszahl, Atommasse,
            Periode/Gruppe und Kategorie sowie einen Live-Rechner für
            Stoffmengenberechnungen.
          </p>

          <h2>Verwandte Tools</h2>
          <p>
            Um Elemente nach Eigenschaften zu sortieren, siehe die{" "}
            <Link href="/de/elementrangliste">Elementrangliste</Link>,{" "}
            für die Berechnung der durchschnittlichen Atommasse aus
            Isotopen siehe{" "}
            <Link href="/de/atommasse-berechnen">Atommasse berechnen</Link>,{" "}
            für die molare Masse von Verbindungen siehe{" "}
            <Link href="/de/chemische-verbindungen">Chemische Verbindungen</Link>.
          </p>
        </section>
      </div>
    </main>
  );
}
