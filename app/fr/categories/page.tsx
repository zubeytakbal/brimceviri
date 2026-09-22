import type { Metadata } from "next";
import Link from "next/link";
import { frenchCategoryPages } from "../../converter/localizedFrenchCategoryPages";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Toutes les catégories — Convertisseur d’unités",
  description:
    "Liste complète des conversions d’unités pour la longueur, la masse, la température, la pression, l’énergie et bien d’autres grandeurs physiques.",
  alternates: {
    canonical: "/fr/categories",
    languages: {
      fr: "/fr/categories",
      "x-default": "/fr/categories",
    },
  },
  openGraph: {
    title: "Toutes les catégories — Convertisseur d’unités",
    description: "Liste complète des catégories de conversion d’unités.",
    url: buildSiteUrl("/fr/categories"),
    siteName: "BirimCeviri.app",
    locale: "fr_FR",
    type: "website",
  },
};

export default function FrenchCategoriesIndexPage() {
  return (
    <main className="all-conversions-page" lang="fr">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Fil d'Ariane">
          <Link href="/fr">Accueil</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Toutes les catégories</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Toutes les catégories de conversion d’unités</h1>
          <p>
            Choisissez la grandeur physique qui vous intéresse pour voir
            toutes les unités et pages de conversion de cette catégorie.
          </p>
        </header>

        <section className="category-article-content">
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Catégorie</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {frenchCategoryPages.map((category) => (
                  <tr key={category.slug}>
                    <td>{category.title}</td>
                    <td>
                      <Link className="text-link" href={`/fr/categories/${category.slug}`}>
                        Voir
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
