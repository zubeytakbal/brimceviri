import type { Metadata } from "next";
import Link from "next/link";
import { portugueseCategoryPages } from "../../converter/localizedPortugueseCategoryPages";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Todas as categorias — Conversor de unidades",
  description:
    "Lista completa de conversoes de unidades de comprimento, massa, temperatura, pressao, energia e muitas outras grandezas fisicas.",
  alternates: {
    canonical: "/pt/categories",
    languages: {
      pt: "/pt/categories",
      "x-default": "/pt/categories",
    },
  },
  openGraph: {
    title: "Todas as categorias — Conversor de unidades",
    description: "Lista completa de todas as categorias de conversao de unidades.",
    url: buildSiteUrl("/pt/categories"),
    siteName: "BirimCeviri.app",
    locale: "pt_BR",
    type: "website",
  },
};

export default function PortugueseCategoriesIndexPage() {
  return (
    <main className="all-conversions-page" lang="pt-BR">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Trilha de navegacao">
          <Link href="/pt">Inicio</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Todas as categorias</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Todas as categorias de conversao de unidades</h1>
          <p>
            Escolha a grandeza fisica que te interessa para ver todas as
            unidades e paginas de conversao dessa categoria.
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
                {portugueseCategoryPages.map((category) => (
                  <tr key={category.slug}>
                    <td>{category.title}</td>
                    <td>
                      <Link className="text-link" href={`/pt/categories/${category.slug}`}>
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
