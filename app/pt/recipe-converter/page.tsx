import type { Metadata } from "next";
import Link from "next/link";
import RecipeScalerConverter from "../../components/RecipeScalerConverter";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Conversor de receitas",
  description:
    "Cole sua receita, escolha um multiplicador para aumentar ou diminuir, e obtenha instantaneamente as novas quantidades -- alguns ingredientes tambem sao convertidos automaticamente para gramas.",
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
        <nav className="breadcrumbs" aria-label="Trilha de navegacao">
          <Link href="/pt">Inicio</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Conversor de receitas</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Conversor de receitas</h1>

          <p>
            Cole sua receita linha por linha, por exemplo: "2 xicaras de
            farinha". Depois de escolher o multiplicador, o site calcula
            instantaneamente as novas quantidades. Se o ingrediente for
            reconhecido e estiver expresso em uma unidade como xicara ou
            colher, tambem e mostrado um valor aproximado em gramas.
          </p>
        </header>

        <RecipeScalerConverter locale="pt" />

        <section className="category-article-content">
          <h2>Como aumentar ou diminuir uma receita?</h2>
          <p>
            O principio e simples: multiplicar cada quantidade pelo mesmo
            fator. Se a receita e para 2 pessoas e voce quer 4, o
            multiplicador e 2. Esta ferramenta faz isso automaticamente
            para cada linha que comeca com uma quantidade legivel (numero
            inteiro, fracao ou decimal).
          </p>
          <p>
            Voce tambem pode indicar o numero de porcoes originais e o
            numero de porcoes desejadas: o multiplicador sera calculado
            automaticamente, sem precisar calcular na mao.
          </p>

          <h2>Por que algumas linhas nao mostram gramas?</h2>
          <p>
            A conversao para gramas so aparece quando a ferramenta
            reconhece ao mesmo tempo a unidade e o nome do ingrediente. Uma
            linha como "2 ovos" sera ajustada corretamente, mas nao
            mostrara gramas adicionais porque o ovo nao esta na lista de
            conversao por volume.
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
              <Link href="/pt/shoe-size-converter">Conversor de numeracao de calcados</Link>
            </li>
            <li>
              <Link href="/pt/historical-units">Unidades de medida historicas</Link>
            </li>
          </ul>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>Outros idiomas</h2>
          <Link className="text-link" href="/tarif-cevirici" hrefLang="tr">
            Türkçe versiyonu aç
          </Link>
        </section>
      </div>
    </main>
  );
}
