import type { Metadata } from "next";
import Link from "next/link";
import ShoeSizeConverter from "../../components/ShoeSizeConverter";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Conversor de numeração de calçados: BR, US, EU",
  description:
    "Converta as numerações de calçados brasileira (BR), americana (US) e europeia (EU); compare também os tamanhos de Nike, Adidas, Puma, New Balance e Converse.",
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
    title: "Conversor de numeração de calçados: BR, US, EU",
    description: "Converta as numerações de calçados brasileira, americana e europeia.",
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
        <nav className="breadcrumbs" aria-label="Trilha de navegação">
          <Link href="/pt">Início</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Conversor de numeração de calçados</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Conversor de numeração de calçados: BR, US, EU</h1>

          <p>
            Digite a numeração que você conhece para ver instantaneamente as
            equivalências americana (US), europeia (EU) e britânica (UK).
            Tabelas separadas para adulto masculino, feminino, bebê e
            criança maior, com comparativo das marcas Nike, Adidas, Puma,
            New Balance e Converse.
          </p>
        </header>

        <ShoeSizeConverter locale="pt" />

        <section className="category-article-content">
          <h2>Por que a numeração de calçados varia entre marcas e sistemas?</h2>
          <p>
            No Brasil, a numeração usada nas lojas costuma seguir uma escala
            própria (diferente da europeia, embora próxima dela), enquanto
            calçados importados trazem frequentemente a numeração americana
            (US) ou europeia (EU) na etiqueta. Além disso, cada marca usa
            seus próprios moldes de fabricação, então um mesmo comprimento
            de pé pode corresponder a numerações diferentes, ou deslocadas
            em meio número, conforme a marca.
          </p>
          <p>
            O resultado mais confiável costuma ser medir o comprimento do
            pé em centímetros e escolher depois a opção «Comprimento do
            pé» na ferramenta. Isso reduz os erros causados pelas
            diferenças de nomenclatura de numeração entre marcas e países.
          </p>
          <p>
            Em crianças, a numeração americana (US) recomeça após o 13,5;
            por isso as tabelas de bebê/criança pequena e criança maior
            ficam separadas, para manter clara a comparação.
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
              <Link href="/pt/historical-units">Unidades de medida históricas</Link>
            </li>
            <li>
              <Link href="/pt/categories/comprimento">Conversão de unidades de comprimento</Link>
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
            Abrir a versão em turco
          </Link>
        </section>
      </div>
    </main>
  );
}
