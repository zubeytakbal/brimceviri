import type { Metadata } from "next";
import Link from "next/link";
import { es419CategoryPages } from "../../converter/localizedEs419CategoryPages";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Todas las categorías — Convertidor de unidades",
  description:
    "Lista completa de conversiones de unidades para longitud, masa, temperatura, presión, energía y muchas otras magnitudes físicas.",
  alternates: {
    canonical: "/es-419/categorias",
    languages: {
      fr: "/fr/categories",
      es: "/es/categorias",
      "es-419": "/es-419/categorias",
      pt: "/pt/categorias",
      "x-default": "/es-419/categorias",
    },
  },
  openGraph: {
    title: "Todas las categorías — Convertidor de unidades",
    description: "Lista completa de todas las categorías de conversión de unidades.",
    url: buildSiteUrl("/es-419/categorias"),
    siteName: "BirimCeviri.app",
    locale: "es_LA",
    type: "website",
  },
};

export default function Es419CategoriesIndexPage() {
  return (
    <main className="all-conversions-page" lang="es-419">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Ruta de navegación">
          <Link href="/es-419">Inicio</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Todas las categorías</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Todas las categorías de conversión de unidades</h1>
          <p>
            Elige la magnitud física que te interese para ver todas las
            unidades y páginas de conversión de esa categoría.
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
                {es419CategoryPages.map((category) => (
                  <tr key={category.slug}>
                    <td>{category.title}</td>
                    <td>
                      <Link className="text-link" href={`/es-419/categorias/${category.slug}`}>
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
