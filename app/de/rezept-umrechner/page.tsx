import { seoTitle } from "../../seoTitle";
import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import RecipeScalerConverter from "../../components/RecipeScalerConverter";
import {
  GERMAN_CAKE_RECIPE,
  germanPanRatio,
  germanRecipeFact,
} from "../../converter/germanPageFacts";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: seoTitle("Rezept Umrechner: Rezept skalieren und Tassen in Gramm", "Rezept-Umrechner: Rezept skalieren"),
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
      "Verdoppeln, halbieren oder skalieren Sie ein Rezept und sehen Sie Grammwerte für erkannte Zutaten.",
    url: buildSiteUrl("/de/rezept-umrechner"),
    siteName: "BirimCeviri.app",
    locale: "de_DE",
    type: "website",
  },
};

export default function GermanRecipeScalerPage() {
  const facts = germanRecipeFact();
  const pan26 = germanPanRatio(26).toLocaleString("de-DE", { maximumFractionDigits: 2 });
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
            multipliziert. Diese Seite übernimmt das automatisch für
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

          <h2>Beispiel: Kuchen für 4 statt 6 Personen</h2>
          <p>Der Faktor ist 4 / 6 ≈ 0,67. Jede Menge wird damit multipliziert:</p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Zutat</th>
                  <th>Für 6</th>
                  <th>Für 4</th>
                </tr>
              </thead>
              <tbody>
                {GERMAN_CAKE_RECIPE.map(([zutat, menge, einheit]) => (
                  <tr key={zutat}>
                    <td>{zutat}</td>
                    <td>
                      {menge} {einheit}
                    </td>
                    <td>
                      {((menge * 4) / 6).toLocaleString("de-DE", { maximumFractionDigits: 0 })} {einheit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>Aus 3 Eiern werden rechnerisch 2: das geht hier glatt auf. Bei halben Eiern ein Ei verquirlen und die Hälfte abwiegen, etwa 25 g.</p>

          <h2>Backform und Backzeit</h2>
          <p>
            Die Fläche einer runden Form wächst mit dem Quadrat des Durchmessers. Eine 26-cm-Springform hat (26 / 20)² ≈ {pan26}-mal so viel
            Fläche wie eine 20-cm-Form; für die gleiche Teighöhe passt also die etwa 1,7-fache Menge. Die Backzeit hängt von der Teighöhe
            ab, nicht von der Menge: Bleibt der Teig gleich hoch, ändert sich wenig. Wird er höher, etwas niedriger und länger backen und
            mit einem Holzstäbchen prüfen.
          </p>
          <h2>{facts.title}</h2>
          {facts.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      </div>
    </main>
  );
}
