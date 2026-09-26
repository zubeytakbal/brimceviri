import type { Metadata } from "next";
import Link from "next/link";
import RecipeScalerConverter from "../../components/RecipeScalerConverter";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Rezept Umrechner: Rezept skalieren und Tassen in Gramm",
  description:
    "Fügen Sie Ihr Rezept ein, wählen Sie einen Faktor und skalieren Sie alle Mengen sofort. Erkannte Zutaten erhalten passende Grammwerte.",
  alternates: {
    canonical: "/de/rezept-umrechner",
    languages: {
      tr: "/tarif-cevirici",
      en: "/en/recipe-converter",
      de: "/de/rezept-umrechner",
      "x-default": "/tarif-cevirici",
    },
  },
  openGraph: {
    title: "Rezept Umrechner: Rezept skalieren und Tassen in Gramm",
    description:
      "Verdoppeln, halbieren oder skalieren Sie ein Rezept und sehen Sie Grammwerte fuer erkannte Zutaten.",
    url: buildSiteUrl("/de/rezept-umrechner"),
    siteName: "BirimCeviri.app",
    locale: "de_DE",
    type: "website",
  },
};

export default function GermanRecipeScalerPage() {
  return (
    <main className="all-conversions-page" lang="de">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Brotkrumen">
          <Link href="/de">Startseite</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Rezept Umrechner</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Rezept Umrechner</h1>
          <p>
            Fügen Sie Ihr Rezept zeilenweise ein, wählen Sie einen
            Multiplikator und skalieren Sie jede Menge sofort. Wenn Zutat
            und Einheit erkannt werden, erscheint auch ein Grammwert.
          </p>
        </header>

        <RecipeScalerConverter locale="de" />

        <section className="category-article-content">
          <h2>Wie verdoppelt man ein Rezept?</h2>
          <p>
            Jede Mengenangabe wird mit dem gewünschten Faktor
            multipliziert. Diese Seite übernimmt das automatisch fuer
            ganze Zahlen, Dezimalwerte und einfache Brüche.
          </p>
          <p>
            Wenn Sie lieber einzelne Zutaten direkt zwischen Tasse,
            Löffel und Gramm umrechnen möchten, nutzen Sie den{" "}
            <Link href="/de/kuechenmass-umrechner">
              Küchenmaß Umrechner
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
