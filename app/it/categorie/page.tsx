import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { italianCategoryPages } from "../../converter/localizedItalianCategoryPages";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Tutte le categorie — Convertitore di unità",
  description:
    "Elenco completo delle conversioni di unità di lunghezza, massa, temperatura, pressione, energia e molte altre grandezze fisiche.",
  alternates: {
    canonical: "/it/categorie",
    languages: {
      fr: "/fr/categories",
      es: "/es/categorias",
      pt: "/pt/categorias",
      it: "/it/categorie",
      "x-default": "/it/categorie",
    },
  },
  openGraph: {
    title: "Tutte le categorie — Convertitore di unità",
    description: "Elenco completo di tutte le categorie di conversione di unità.",
    url: buildSiteUrl("/it/categorie"),
    siteName: "BirimCeviri.app",
    locale: "it_IT",
    type: "website",
  },
};

export default function ItalianCategoriesIndexPage() {
  return (
    <main className="all-conversions-page" lang="it">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Percorso di navigazione">
          <Link href="/it">Home</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Tutte le categorie</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Tutte le categorie di conversione di unità</h1>
          <p>
            Scegli la grandezza fisica che ti interessa per vedere tutte le
            unità e le pagine di conversione di quella categoria.
          </p>
        </header>

        <section className="category-article-content">
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Categoria</th>
                  <th>Cosa trovi qui</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {italianCategoryPages.map((category) => (
                  <tr key={category.slug}>
                    <td>{category.title}</td>
                    <td>{category.description}</td>
                    <td>
                      <Link className="text-link" href={`/it/categorie/${category.slug}`}>
                        Vedi
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h2>Come funzionano le conversioni</h2>
          <p>Ogni categoria raccoglie le unità che misurano la stessa grandezza, come lunghezza, massa o pressione. Il valore viene convertito prima nell’unità di base del SI (metro, chilogrammo o pascal) e poi nell’unità desiderata, così il risultato è sempre coerente tra due unità qualsiasi. Esempio: 5 pollici = 5 × 0,0254 = 0,127 m = 12,7 cm.</p>
          <p>La temperatura è un’eccezione: tra Celsius e Fahrenheit c’è anche una somma (°F = °C × 1,8 + 32). Una differenza di 10 °C corrisponde quindi a 18 °F, non a 50 °F.</p>
        </section>
      </div>
    </main>
  );
}
