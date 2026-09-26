import type { Metadata } from "next";
import Link from "next/link";
import RingSizeConverter from "../../components/RingSizeConverter";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Ringgrößen Umrechner: mm, US und UK Tabelle",
  description:
    "Vergleichen Sie Ringgrößen zwischen Innendurchmesser, EU-Umfang sowie US- und UK-System.",
  alternates: {
    canonical: "/de/ringgroessen-umrechner",
    languages: {
      tr: "/yuzuk-olcusu-cevirici",
      en: "/en/ring-size-converter",
      de: "/de/ringgroessen-umrechner",
      "x-default": "/yuzuk-olcusu-cevirici",
    },
  },
  openGraph: {
    title: "Ringgrößen Umrechner: mm, US und UK Tabelle",
    description:
      "Vergleichen Sie Ringgrößen zwischen Durchmesser, Umfang, US und UK.",
    url: buildSiteUrl("/de/ringgroessen-umrechner"),
    siteName: "BirimCeviri.app",
    locale: "de_DE",
    type: "website",
  },
};

export default function GermanRingSizePage() {
  return (
    <main className="all-conversions-page" lang="de">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Brotkrumen">
          <Link href="/de">Startseite</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Ringgrößen Umrechner</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Ringgrößen Umrechner</h1>
          <p>
            Geben Sie die bekannte Ringgröße ein und vergleichen Sie
            sofort Innendurchmesser, Umfang sowie die US- und
            UK-Entsprechung.
          </p>
        </header>

        <RingSizeConverter locale="de" />

        <section className="category-article-content">
          <h2>Wie wird eine Ringgröße bestimmt?</h2>
          <p>
            Am verlässlichsten ist der Innendurchmesser des Rings in
            Millimetern. Das europäische System arbeitet direkt mit dem
            Umfang, während US und UK eigene Skalen verwenden.
          </p>
          <p>
            Messen Sie fuer das beste Ergebnis den Innendurchmesser eines
            gut passenden Rings und wählen Sie den nächsten Wert aus.
          </p>
        </section>
      </div>
    </main>
  );
}
