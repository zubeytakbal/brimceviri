import type { Metadata } from "next";
import Link from "next/link";
import { swedishCategoryPages } from "../../converter/localizedSwedishCategoryPages";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Alla kategorier — Enhetsomvandlare",
  description:
    "Fullständig lista över omvandlingar för längd, massa, temperatur, tryck, energi och många andra fysiska storheter.",
  alternates: {
    canonical: "/sv/categories",
    languages: {
      fr: "/fr/categories",
      es: "/es/categories",
      "es-419": "/es-419/categories",
      pt: "/pt/categories",
      it: "/it/categories",
      nl: "/nl/categories",
      sv: "/sv/categories",
      "x-default": "/sv/categories",
    },
  },
  openGraph: {
    title: "Alla kategorier — Enhetsomvandlare",
    description: "Fullständig lista över alla kategorier för enhetsomvandling.",
    url: buildSiteUrl("/sv/categories"),
    siteName: "BirimCeviri.app",
    locale: "sv_SE",
    type: "website",
  },
};

export default function SwedishCategoriesIndexPage() {
  return (
    <main className="all-conversions-page" lang="sv">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sidnavigering">
          <Link href="/sv">Hem</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Alla kategorier</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Alla kategorier för enhetsomvandling</h1>
          <p>
            Välj den fysiska storhet du är intresserad av för att se alla
            enheter och omvandlingssidor i den kategorin.
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
                {swedishCategoryPages.map((category) => (
                  <tr key={category.slug}>
                    <td>{category.title}</td>
                    <td>
                      <Link className="text-link" href={`/sv/categories/${category.slug}`}>
                        Visa
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
