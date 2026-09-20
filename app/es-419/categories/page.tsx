import type { Metadata } from "next";
import Link from "next/link";
import { es419CategoryPages } from "../../converter/localizedEs419CategoryPages";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Todas las categorias — Convertidor de unidades",
  description:
    "Lista completa de conversiones de unidades para longitud, masa, temperatura, presion, energia y muchas otras magnitudes fisicas.",
  alternates: {
    canonical: "/es-419/categories",
    languages: {
      "es-419": "/es-419/categories",
      pt: "/pt/categories",
      "x-default": "/es-419/categories",
    },
  },
  openGraph: {
    title: "Todas las categorias — Convertidor de unidades",
    description: "Lista completa de todas las categorias de conversion de unidades.",
    url: buildSiteUrl("/es-419/categories"),
    siteName: "BirimCeviri.app",
    locale: "es_LA",
    type: "website",
  },
};

export default function Es419CategoriesIndexPage() {
  return (
    <main className="all-conversions-page" lang="es-419">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Ruta de navegacion">
          <Link href="/es-419">Inicio</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Todas las categorias</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Todas las categorias de conversion de unidades</h1>
          <p>
            Elige la magnitud fisica que te interese para ver todas las
            unidades y paginas de conversion de esa categoria.
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
                {es419CategoryPages.map((category) => (
                  <tr key={category.slug}>
                    <td>{category.title}</td>
                    <td>
                      <Link className="text-link" href={`/es-419/categories/${category.slug}`}>
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
