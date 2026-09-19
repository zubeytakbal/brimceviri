import type { Metadata } from "next";
import Link from "next/link";
import { spanishCategoryPages } from "../../converter/localizedSpanishCategoryPages";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Todas las categorias — Convertidor de unidades",
  description:
    "Lista completa de conversiones de unidades para longitud, masa, temperatura, presion, energia y muchas otras magnitudes fisicas.",
  alternates: {
    canonical: "/es/categories",
    languages: {
      es: "/es/categories",
      "x-default": "/es/categories",
    },
  },
  openGraph: {
    title: "Todas las categorias — Convertidor de unidades",
    description: "Lista completa de todas las categorias de conversion de unidades.",
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
        <nav className="breadcrumbs" aria-label="Ruta de navegacion">
          <Link href="/es">Inicio</Link>
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
