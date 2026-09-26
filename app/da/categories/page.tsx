import type { Metadata } from "next";
import Link from "next/link";
import { danishCategoryPages } from "../../converter/localizedDanishCategoryPages";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Alle kategorier — Enhedsomregner",
  description:
    "Fuldstændig liste over omregninger for længde, masse, temperatur, tryk, energi og mange andre fysiske størrelser.",
  alternates: {
    canonical: "/da/categories",
    languages: {
      fr: "/fr/categories",
      es: "/es/categories",
      "es-419": "/es-419/categories",
      pt: "/pt/categories",
      it: "/it/categories",
      nl: "/nl/categories",
      sv: "/sv/categories",
      no: "/no/categories",
      da: "/da/categories",
      "x-default": "/da/categories",
    },
  },
  openGraph: {
    title: "Alle kategorier — Enhedsomregner",
    description: "Fuldstændig liste over alle kategorier for enhedsomregning.",
    url: buildSiteUrl("/da/categories"),
    siteName: "BirimCeviri.app",
    locale: "da_DK",
    type: "website",
  },
};

export default function DanishCategoriesIndexPage() {
  return (
    <main className="all-conversions-page" lang="da">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sidenavigation">
          <Link href="/da">Hjem</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Alle kategorier</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Alle kategorier for enhedsomregning</h1>
          <p>
            Vælg den fysiske størrelse, du er interesseret i, for at se alle
            enheder og omregningssider i den kategori.
          </p>
        </header>

        <section className="category-article-content">
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Kategori</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {danishCategoryPages.map((category) => (
                  <tr key={category.slug}>
                    <td>{category.title}</td>
                    <td>
                      <Link className="text-link" href={`/da/categories/${category.slug}`}>
                        Vis
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
