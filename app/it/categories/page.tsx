import type { Metadata } from "next";
import Link from "next/link";
import { italianCategoryPages } from "../../converter/localizedItalianCategoryPages";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Tutte le categorie — Convertitore di unità",
  description:
    "Elenco completo delle conversioni di unità di lunghezza, massa, temperatura, pressione, energia e molte altre grandezze fisiche.",
  alternates: {
    canonical: "/it/categories",
    languages: {
      fr: "/fr/categories",
      es: "/es/categories",
      "es-419": "/es-419/categories",
      pt: "/pt/categories",
      it: "/it/categories",
      "x-default": "/it/categories",
    },
  },
  openGraph: {
    title: "Tutte le categorie — Convertitore di unità",
    description: "Elenco completo di tutte le categorie di conversione di unità.",
    url: buildSiteUrl("/it/categories"),
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
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {italianCategoryPages.map((category) => (
                  <tr key={category.slug}>
                    <td>{category.title}</td>
                    <td>
                      <Link className="text-link" href={`/it/categories/${category.slug}`}>
                        Vedi
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
