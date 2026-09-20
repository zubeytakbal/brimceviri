import type { Metadata } from "next";
import Link from "next/link";
import KitchenMeasuresConverter from "../../components/KitchenMeasuresConverter";
import { kitchenIngredientLabels } from "../../converter/kitchenIngredientLabels";
import { kitchenIngredientRows } from "../../converter/kitchenMeasures";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Conversor de Xicaras para Gramas (medidas de cozinha)",
  description:
    "Converta xicaras, colheres, gramas e mililitros para mais de 40 ingredientes: farinha, acucar, arroz, mel, manteiga e muito mais.",
  alternates: {
    canonical: "/pt/kitchen-measurement-converter",
    languages: {
      tr: "/mutfak-olculeri-cevirici",
      en: "/en/kitchen-measurement-converter",
      de: "/de/kuechenmass-umrechner",
      bn: "/bn/kitchen-measurement-converter",
      fr: "/fr/kitchen-measurement-converter",
      es: "/es/kitchen-measurement-converter",
      "es-419": "/es-419/kitchen-measurement-converter",
      pt: "/pt/kitchen-measurement-converter",
      "x-default": "/mutfak-olculeri-cevirici",
    },
  },
  openGraph: {
    title: "Conversor de Xicaras para Gramas (medidas de cozinha)",
    description: "Converta xicaras, colheres, gramas e mililitros para mais de 40 ingredientes.",
    url: buildSiteUrl("/pt/kitchen-measurement-converter"),
    siteName: "BirimCeviri.app",
    locale: "pt_BR",
    type: "website",
  },
};

export default function PortugueseKitchenMeasurementsPage() {
  return (
    <main className="all-conversions-page" lang="pt-BR">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Trilha de navegacao">
          <Link href="/pt">Inicio</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Conversor de medidas de cozinha</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Conversor de medidas de cozinha</h1>

          <p>
            Escolha o ingrediente e a unidade que voce conhece para ver
            instantaneamente a equivalencia em xicaras, colheres de sopa,
            colheres de cha, gramas, mililitros e litros. Cada ingrediente
            tem uma densidade diferente, entao o calculo usa valores
            especificos para farinha, acucar, arroz, mel, manteiga e
            muitos outros.
          </p>
        </header>

        <KitchenMeasuresConverter locale="pt" />

        <section className="category-article-content">
          <h2>Quantas gramas tem uma xicara de farinha ou uma colher de acucar?</h2>
          <p>
            Nao existe uma regra unica valida para todos os ingredientes,
            porque a xicara mede um volume enquanto a grama mede uma
            massa. Uma xicara de farinha e mais leve que uma xicara de
            acucar, e o mel e mais pesado que ambos -- por isso a
            conversao varia conforme a densidade do ingrediente.
          </p>
          <p>
            Os valores indicados aqui sao medias praticas adaptadas ao uso
            culinario cotidiano. O peso final pode variar ligeiramente
            conforme o quanto o ingrediente esta compactado ou a variedade
            do produto, mas o resultado continua confiavel o suficiente
            para uso domestico.
          </p>

          <h2>Lista de ingredientes comuns (1 xicara = 240 ml)</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Gramas aproximadas por xicara, colher de sopa e colher de cha</caption>
              <thead>
                <tr>
                  <th scope="col">Ingrediente</th>
                  <th scope="col">1 xicara</th>
                  <th scope="col">1 colher de sopa</th>
                  <th scope="col">1 colher de cha</th>
                </tr>
              </thead>
              <tbody>
                {kitchenIngredientRows.map((row) => (
                  <tr key={row.key}>
                    <td>{kitchenIngredientLabels.pt[row.key]}</td>
                    <td>{Math.round((row.gramsPerBardak * 240) / 200)} g</td>
                    <td>{Math.round((row.gramsPerBardak * 240 * 15) / (200 * 200))} g</td>
                    <td>{Math.round((row.gramsPerBardak * 240 * 5) / (200 * 200))} g</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Perguntas frequentes</h2>
          <p>
            <strong>Quantos mililitros tem uma colher de sopa?</strong>
            <br />
            Uma colher de sopa equivale a 15 mililitros, ou seja, 3
            colheres de cha. A xicara usada aqui corresponde a 240
            mililitros (a mesma medida do "copo americano" usado nas
            receitas brasileiras).
          </p>
          <p>
            <strong>Por que o peso de uma xicara varia conforme o ingrediente?</strong>
            <br />
            Porque o volume permanece constante, mas a densidade varia. Um
            ingrediente leve como a farinha pesa menos que um denso como o
            mel para o mesmo volume.
          </p>
          <p>
            Para ajustar uma receita completa, experimente o{" "}
            <Link href="/pt/recipe-converter">conversor de receitas</Link>.
          </p>
        </section>

        <section className="conversion-section related-conversions">
          <h2>Ferramentas relacionadas</h2>
          <ul className="related-conversion-list">
            <li>
              <Link href="/pt/recipe-converter">Conversor de receitas</Link>
            </li>
            <li>
              <Link href="/pt/shoe-size-converter">Conversor de numeracao de calcados</Link>
            </li>
            <li>
              <Link href="/pt/historical-units">Unidades de medida historicas</Link>
            </li>
            <li>
              <Link href="/pt/categories/massa">Conversao de unidades de massa</Link>
            </li>
          </ul>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>Outros idiomas</h2>
          <Link
            className="text-link"
            href="/mutfak-olculeri-cevirici"
            hrefLang="tr"
          >
            Türkçe versiyonu aç
          </Link>
        </section>
      </div>
    </main>
  );
}
