import type { Metadata } from "next";
import Link from "next/link";
import { portugueseCategoryPages } from "../../converter/localizedPortugueseCategoryPages";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Todas as categorias — Conversor de unidades",
  description:
    "Lista completa de conversões de unidades de comprimento, massa, temperatura, pressão, energia e muitas outras grandezas físicas.",
  alternates: {
    canonical: "/pt/categorias",
    languages: {
      fr: "/fr/categories",
      es: "/es/categorias",
      "es-419": "/es-419/categorias",
      pt: "/pt/categorias",
      "x-default": "/pt/categorias",
    },
  },
  openGraph: {
    title: "Todas as categorias — Conversor de unidades",
    description: "Lista completa de todas as categorias de conversão de unidades.",
    url: buildSiteUrl("/pt/categorias"),
    siteName: "BirimCeviri.app",
    locale: "pt_BR",
    type: "website",
  },
};

export default function PortugueseCategoriesIndexPage() {
  return (
    <main className="all-conversions-page" lang="pt-BR">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Trilha de navegação">
          <Link href="/pt">Início</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Todas as categorias</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Todas as categorias de conversão de unidades</h1>
          <p>
            Escolha a grandeza física que te interessa para ver todas as
            unidades e páginas de conversão dessa categoria.
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
                      <Link className="text-link" href={`/pt/categorias/${category.slug}`}>
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
