import type { Metadata } from "next";
import Link from "next/link";
import { norwegianCategoryPages } from "../../converter/localizedNorwegianCategoryPages";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Alle kategorier — Enhetsomregner",
  description:
    "Fullstendig liste over omregninger for lengde, masse, temperatur, trykk, energi og mange andre fysiske størrelser.",
  alternates: {
    canonical: "/no/categories",
    languages: {
      fr: "/fr/categories",
      es: "/es/categories",
      "es-419": "/es-419/categories",
      pt: "/pt/categories",
      it: "/it/categories",
      nl: "/nl/categories",
      sv: "/sv/categories",
      no: "/no/categories",
      "x-default": "/no/categories",
    },
  },
  openGraph: {
    title: "Alle kategorier — Enhetsomregner",
    description: "Fullstendig liste over alle kategorier for enhetsomregning.",
    url: buildSiteUrl("/no/categories"),
    siteName: "BirimCeviri.app",
    locale: "nb_NO",
    type: "website",
  },
};

export default function NorwegianCategoriesIndexPage() {
  return (
    <main className="all-conversions-page" lang="nb">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sidenavigering">
          <Link href="/no">Hjem</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Alle kategorier</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Alle kategorier for enhetsomregning</h1>
          <p>
            Velg den fysiske størrelsen du er interessert i for å se alle
            enheter og omregningssider i den kategorien.
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
                {norwegianCategoryPages.map((category) => (
                  <tr key={category.slug}>
                    <td>{category.title}</td>
                    <td>
                      <Link className="text-link" href={`/no/categories/${category.slug}`}>
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
