import type { Metadata } from "next";
import Link from "next/link";
import RecipeScalerConverter from "../../components/RecipeScalerConverter";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Conversor de receitas",
  description:
    "Cole sua receita, escolha um multiplicador para aumentar ou diminuir e obtenha instantaneamente as novas quantidades — alguns ingredientes também são convertidos automaticamente para gramas.",
  alternates: {
    canonical: "/pt/recipe-converter",
    languages: {
      tr: "/tarif-cevirici",
      en: "/en/recipe-converter",
      de: "/de/rezept-umrechner",
      bn: "/bn/recipe-converter",
      fr: "/fr/recipe-converter",
      es: "/es/recipe-converter",
      "es-419": "/es-419/recipe-converter",
      pt: "/pt/recipe-converter",
      "x-default": "/tarif-cevirici",
    },
  },
  openGraph: {
    title: "Conversor de receitas",
    description: "Cole sua receita e obtenha instantaneamente as novas quantidades.",
    url: buildSiteUrl("/pt/recipe-converter"),
    siteName: "BirimCeviri.app",
    locale: "pt_BR",
    type: "website",
  },
};

export default function PortugueseRecipeConverterPage() {
  return (
    <main className="all-conversions-page" lang="pt-BR">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Trilha de navegação">
          <Link href="/pt">Início</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Conversor de receitas</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Conversor de receitas</h1>

          <p>
            Cole sua receita linha por linha, por exemplo: «2 xícaras de
            farinha». Depois de escolher o multiplicador, o site calcula
            instantaneamente as novas quantidades. Se o ingrediente for
            reconhecido e estiver expresso em uma unidade como xícara ou
            colher, também é mostrado um valor aproximado em gramas.
          </p>
        </header>

        <RecipeScalerConverter locale="pt" />

        <section className="category-article-content">
          <h2>Como aumentar ou diminuir uma receita?</h2>
          <p>
            O princípio é simples: multiplicar cada quantidade pelo mesmo
            fator. Se a receita é para 2 pessoas e você quer 4, o
            multiplicador é 2. Esta ferramenta faz isso automaticamente
            para cada linha que começa com uma quantidade legível (número
            inteiro, fração ou decimal).
          </p>
          <p>
            Você também pode indicar o número de porções originais e o
            número de porções desejadas: o multiplicador será calculado
            automaticamente, sem precisar calcular à mão.
          </p>

          <h2>Por que algumas linhas não mostram gramas?</h2>
          <p>
            A conversão para gramas só aparece quando a ferramenta
            reconhece ao mesmo tempo a unidade e o nome do ingrediente. Uma
            linha como «2 ovos» será ajustada corretamente, mas não
            mostrará gramas adicionais porque o ovo não está na lista de
            conversão por volume.
          </p>
          <p>
            Para ver a lista de ingredientes suportados, abra o{" "}
            <Link href="/pt/kitchen-measurement-converter">
              conversor de medidas de cozinha
            </Link>
            .
          </p>
        </section>

        <section className="conversion-section related-conversions">
          <h2>Ferramentas relacionadas</h2>
          <ul className="related-conversion-list">
            <li>
              <Link href="/pt/kitchen-measurement-converter">Conversor de medidas de cozinha</Link>
            </li>
            <li>
              <Link href="/pt/shoe-size-converter">Conversor de numeração de calçados</Link>
            </li>
            <li>
              <Link href="/pt/historical-units">Unidades de medida históricas</Link>
            </li>
          </ul>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>Outros idiomas</h2>
          <Link className="text-link" href="/tarif-cevirici" hrefLang="tr">
            Abrir a versão em turco
          </Link>
        </section>
      </div>
    </main>
  );
}
