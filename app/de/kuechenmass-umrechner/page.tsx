import type { Metadata } from "next";
import Link from "next/link";
import KitchenMeasuresConverter from "../../components/KitchenMeasuresConverter";
import { kitchenIngredientLabels } from "../../converter/kitchenIngredientLabels";
import { kitchenIngredientRows } from "../../converter/kitchenMeasures";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Küchenmaß Umrechner: Tassen, Löffel und Gramm",
  description:
    "Rechnen Sie Tassen, Esslöffel, Teelöffel, Gramm und Milliliter je nach Zutat um.",
  alternates: {
    canonical: "/de/kuechenmass-umrechner",
    languages: {
      tr: "/mutfak-olculeri-cevirici",
      en: "/en/kitchen-measurement-converter",
      de: "/de/kuechenmass-umrechner",
      "x-default": "/mutfak-olculeri-cevirici",
    },
  },
  openGraph: {
    title: "Küchenmaß Umrechner: Tassen, Löffel und Gramm",
    description:
      "Rechnen Sie Tassen, Esslöffel, Teelöffel, Gramm und Milliliter über zutatspezifische Dichten um.",
    url: buildSiteUrl("/de/kuechenmass-umrechner"),
    siteName: "BirimCeviri.app",
    locale: "de_DE",
    type: "website",
  },
};

export default function GermanKitchenMeasuresPage() {
  return (
    <main className="all-conversions-page" lang="de">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Brotkrumen">
          <Link href="/de">Startseite</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Küchenmaß Umrechner</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Küchenmaß Umrechner</h1>
          <p>
            Wählen Sie eine Zutat und die bekannte Einheit, um sofort
            Tassen-, Esslöffel-, Teelöffel-, Gramm-, Milliliter- und
            Literwerte zu sehen.
          </p>
        </header>

        <KitchenMeasuresConverter locale="de" />

        <section className="category-article-content">
          <h2>Warum wiegt die gleiche Tasse je nach Zutat unterschiedlich?</h2>
          <p>
            Tassen und Löffel messen Volumen, Gramm misst Gewicht. Die
            Verbindung dazwischen hängt von der Dichte der jeweiligen
            Zutat ab. Darum hat eine Tasse Mehl ein anderes Gewicht als
            eine Tasse Honig oder Zucker.
          </p>

          <h2>Zutaten Tabelle (1 Tasse = 200 ml)</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>
                Grammwerte pro Tasse, Esslöffel und Teelöffel
              </caption>
              <thead>
                <tr>
                  <th scope="col">Zutat</th>
                  <th scope="col">1 Tasse</th>
                  <th scope="col">1 Esslöffel</th>
                  <th scope="col">1 Teelöffel</th>
                </tr>
              </thead>
              <tbody>
                {kitchenIngredientRows.map((row) => (
                  <tr key={row.key}>
                    <td>{kitchenIngredientLabels.de[row.key]}</td>
                    <td>{Math.round(row.gramsPerBardak)} g</td>
                    <td>{Math.round((row.gramsPerBardak * 15) / 200)} g</td>
                    <td>{Math.round((row.gramsPerBardak * 5) / 200)} g</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p>
            Ein ganzes Rezept können Sie auf der{" "}
            <Link href="/de/rezept-umrechner">Rezept Umrechner</Link>
            {" "}Seite skalieren.
          </p>
        </section>
      </div>
    </main>
  );
}
