import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { danishCategoryPages } from "../../converter/localizedDanishCategoryPages";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Alle kategorier — Enhedsomregner",
  description:
    "Fuldstændig liste over omregninger for længde, masse, temperatur, tryk, energi og mange andre fysiske størrelser.",
  alternates: {
    canonical: "/da/kategorier",
    languages: {
      fr: "/fr/categories",
      es: "/es/categorias",
      pt: "/pt/categorias",
      it: "/it/categorie",
      nl: "/nl/categorieen",
      sv: "/sv/kategorier",
      no: "/no/kategorier",
      da: "/da/kategorier",
      "x-default": "/da/kategorier",
    },
  },
  openGraph: {
    title: "Alle kategorier — Enhedsomregner",
    description: "Fuldstændig liste over alle kategorier for enhedsomregning.",
    url: buildSiteUrl("/da/kategorier"),
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
                  <th>Hvad du finder her</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {danishCategoryPages.map((category) => (
                  <tr key={category.slug}>
                    <td>{category.title}</td>
                    <td>{category.description}</td>
                    <td>
                      <Link className="text-link" href={`/da/kategorier/${category.slug}`}>
                        Vis
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h2>Sådan fungerer omregningerne</h2>
          <p>Hver kategori samler enheder, der måler den samme størrelse, for eksempel længde, masse eller tryk. Værdien regnes først om til SI-grundenheden (meter, kilogram eller pascal) og derefter til den ønskede enhed, så resultatet altid er konsistent mellem to enheder. Eksempel: 5 tommer = 5 × 0,0254 = 0,127 m = 12,7 cm.</p>
          <p>Temperatur er en undtagelse: mellem celsius og fahrenheit indgår også en addition (°F = °C × 1,8 + 32). En temperaturforskel på 10 °C svarer derfor til 18 °F, ikke 50 °F.</p>
        </section>
      </div>
    </main>
  );
}
