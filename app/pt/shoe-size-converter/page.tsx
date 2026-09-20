import type { Metadata } from "next";
import Link from "next/link";
import ShoeSizeConverter from "../../components/ShoeSizeConverter";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Conversor de numeracao de calcados: BR, US, EU",
  description:
    "Converta as numeracoes de calcados brasileira (BR), americana (US) e europeia (EU); compare tambem os tamanhos de Nike, Adidas, Puma, New Balance e Converse.",
  alternates: {
    canonical: "/pt/shoe-size-converter",
    languages: {
      tr: "/ayakkabi-numarasi-cevirme",
      en: "/en/shoe-size-converter",
      de: "/de/schuhgroessen-umrechner",
      bn: "/bn/shoe-size-converter",
      fr: "/fr/shoe-size-converter",
      es: "/es/shoe-size-converter",
      "es-419": "/es-419/shoe-size-converter",
      pt: "/pt/shoe-size-converter",
      "x-default": "/ayakkabi-numarasi-cevirme",
    },
  },
  openGraph: {
    title: "Conversor de numeracao de calcados: BR, US, EU",
    description: "Converta as numeracoes de calcados brasileira, americana e europeia.",
    url: buildSiteUrl("/pt/shoe-size-converter"),
    siteName: "BirimCeviri.app",
    locale: "pt_BR",
    type: "website",
  },
};

export default function PortugueseShoeSizePage() {
  return (
    <main className="all-conversions-page" lang="pt-BR">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Trilha de navegacao">
          <Link href="/pt">Inicio</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Conversor de numeracao de calcados</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Conversor de numeracao de calcados: BR, US, EU</h1>

          <p>
            Digite a numeracao que voce conhece para ver instantaneamente as
            equivalencias americana (US), europeia (EU) e britanica (UK).
            Tabelas separadas para adulto masculino, feminino, bebe e
            crianca maior, com comparativo das marcas Nike, Adidas, Puma,
            New Balance e Converse.
          </p>
        </header>

        <ShoeSizeConverter locale="pt" />

        <section className="category-article-content">
          <h2>Por que a numeracao de calcados varia entre marcas e sistemas?</h2>
          <p>
            No Brasil, a numeracao usada nas lojas costuma seguir uma escala
            propria (diferente da europeia, embora proxima dela), enquanto
            calcados importados trazem frequentemente a numeracao americana
            (US) ou europeia (EU) na etiqueta. Alem disso, cada marca usa
            seus proprios moldes de fabricacao, entao um mesmo comprimento
            de pe pode corresponder a numeracoes diferentes, ou deslocadas
            em meio numero, conforme a marca.
          </p>
          <p>
            O resultado mais confiavel costuma ser medir o comprimento do
            pe em centimetros e escolher depois a opcao "Comprimento do
            pe" na ferramenta. Isso reduz os erros causados pelas
            diferencas de nomenclatura de numeracao entre marcas e paises.
          </p>
          <p>
            Em criancas, a numeracao americana (US) recomeca apos o 13,5;
            por isso as tabelas de bebe/crianca pequena e crianca maior
            ficam separadas, para manter clara a comparacao.
          </p>
        </section>

        <section className="conversion-section related-conversions">
          <h2>Ferramentas relacionadas</h2>
          <ul className="related-conversion-list">
            <li>
              <Link href="/pt/kitchen-measurement-converter">Conversor de medidas de cozinha</Link>
            </li>
            <li>
              <Link href="/pt/recipe-converter">Conversor de receitas</Link>
            </li>
            <li>
              <Link href="/pt/historical-units">Unidades de medida historicas</Link>
            </li>
            <li>
              <Link href="/pt/categories/comprimento">Conversao de unidades de comprimento</Link>
            </li>
          </ul>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>Outros idiomas</h2>
          <Link
            className="text-link"
            href="/ayakkabi-numarasi-cevirme"
            hrefLang="tr"
          >
            Türkçe versiyonu aç
          </Link>
        </section>
      </div>
    </main>
  );
}
