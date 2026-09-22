import type { Metadata } from "next";
import Link from "next/link";
import { spanishCategoryPages } from "../../converter/localizedSpanishCategoryPages";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Todas las categorías — Convertidor de unidades",
  description:
    "Lista completa de conversiones de unidades para longitud, masa, temperatura, presión, energía y otras magnitudes físicas.",
  alternates: {
    canonical: "/es/categories",
    languages: {
      es: "/es/categories",
      "es-419": "/es-419/categories",
      pt: "/pt/categories",
      "x-default": "/es/categories",
    },
  },
  openGraph: {
    title: "Todas las categorías — Convertidor de unidades",
    description: "Lista completa de categorías de conversión de unidades.",
    url: buildSiteUrl("/es/categories"),
    siteName: "BirimCeviri.app",
    locale: "es_ES",
    type: "website",
  },
};

export default function SpanishCategoriesIndexPage() {
  return (
    <main className="all-conversions-page" lang="es">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Ruta de navegación">
          <Link href="/es">Inicio</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Todas las categorías</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Todas las categorías de conversión de unidades</h1>
          <p>
            Elige la magnitud física que te interese para ver sus unidades y
            páginas de conversión.
          </p>
        </header>

        <section className="category-article-content">
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Categoría</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {spanishCategoryPages.map((category) => (
                  <tr key={category.slug}>
                    <td>{category.title}</td>
                    <td>
                      <Link className="text-link" href={`/es/categories/${category.slug}`}>
                        Ver
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
