import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { swedishCategoryPages } from "../../converter/localizedSwedishCategoryPages";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Alla kategorier — Enhetsomvandlare",
  description:
    "Fullständig lista över omvandlingar för längd, massa, temperatur, tryck, energi och många andra fysiska storheter.",
  alternates: {
    canonical: "/sv/kategorier",
    languages: {
      fr: "/fr/categories",
      es: "/es/categorias",
      pt: "/pt/categorias",
      it: "/it/categorie",
      nl: "/nl/categorieen",
      sv: "/sv/kategorier",
      "x-default": "/sv/kategorier",
    },
  },
  openGraph: {
    title: "Alla kategorier — Enhetsomvandlare",
    description: "Fullständig lista över alla kategorier för enhetsomvandling.",
    url: buildSiteUrl("/sv/kategorier"),
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
                  <th>Vad du hittar här</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {swedishCategoryPages.map((category) => (
                  <tr key={category.slug}>
                    <td>{category.title}</td>
                    <td>{category.description}</td>
                    <td>
                      <Link className="text-link" href={`/sv/kategorier/${category.slug}`}>
                        Visa
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h2>Så fungerar omvandlingarna</h2>
          <p>Varje kategori samlar enheter som mäter samma storhet, till exempel längd, massa eller tryck. Värdet räknas först om till SI-grundenheten (meter, kilogram eller pascal) och sedan till målenheten, så att resultatet alltid blir konsekvent mellan två enheter. Exempel: 5 tum = 5 × 0,0254 = 0,127 m = 12,7 cm.</p>
          <p>Temperatur är ett undantag: mellan celsius och fahrenheit ingår även en addition (°F = °C × 1,8 + 32). En temperaturskillnad på 10 °C motsvarar därför 18 °F, inte 50 °F.</p>
        </section>
      </div>
    </main>
  );
}
