import type { Metadata } from "next";
import Link from "next/link";
import KitchenMeasuresConverter from "../../components/KitchenMeasuresConverter";
import { kitchenIngredientLabels } from "../../converter/kitchenIngredientLabels";
import { kitchenIngredientRows } from "../../converter/kitchenMeasures";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Conversor de Xícaras para Gramas (medidas de cozinha)",
  description:
    "Converta xícaras, colheres, gramas e mililitros para mais de 40 ingredientes: farinha, açúcar, arroz, mel, manteiga e muito mais.",
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
    title: "Conversor de Xícaras para Gramas (medidas de cozinha)",
    description: "Converta xícaras, colheres, gramas e mililitros para mais de 40 ingredientes.",
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
        <nav className="breadcrumbs" aria-label="Trilha de navegação">
          <Link href="/pt">Início</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Conversor de medidas de cozinha</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Conversor de medidas de cozinha</h1>

          <p>
            Escolha o ingrediente e a unidade que você conhece para ver
            instantaneamente a equivalência em xícaras, colheres de sopa,
            colheres de chá, gramas, mililitros e litros. Cada ingrediente
            tem uma densidade diferente, então o cálculo usa valores
            específicos para farinha, açúcar, arroz, mel, manteiga e
            muitos outros.
          </p>
        </header>

        <KitchenMeasuresConverter locale="pt" />

        <section className="category-article-content">
          <h2>Quantos gramas há em uma xícara de farinha ou uma colher de açúcar?</h2>
          <p>
            Não existe uma regra única válida para todos os ingredientes,
            porque a xícara mede um volume enquanto o grama mede uma
            massa. Uma xícara de farinha é mais leve que uma xícara de
            açúcar, e o mel é mais pesado que ambos — por isso a
            conversão varia conforme a densidade do ingrediente.
          </p>
          <p>
            Os valores indicados aqui são médias práticas adaptadas ao uso
            culinário cotidiano. O peso final pode variar ligeiramente
            conforme o quanto o ingrediente está compactado ou a variedade
            do produto, mas o resultado continua confiável o suficiente
            para uso doméstico.
          </p>

          <h2>Lista de ingredientes comuns (1 xícara = 240 ml)</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Gramas aproximadas por xícara, colher de sopa e colher de chá</caption>
              <thead>
                <tr>
                  <th scope="col">Ingrediente</th>
                  <th scope="col">1 xícara</th>
                  <th scope="col">1 colher de sopa</th>
                  <th scope="col">1 colher de chá</th>
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
            <strong>Quantos mililitros há em uma colher de sopa?</strong>
            <br />
            Uma colher de sopa equivale a 15 mililitros, ou seja, 3
            colheres de chá. A xícara usada aqui corresponde a 240
            mililitros (a mesma medida do «copo americano» usado nas
            receitas brasileiras).
          </p>
          <p>
            <strong>Por que o peso de uma xícara varia conforme o ingrediente?</strong>
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
              <Link href="/pt/shoe-size-converter">Conversor de numeração de calçados</Link>
            </li>
            <li>
              <Link href="/pt/historical-units">Unidades de medida históricas</Link>
            </li>
            <li>
              <Link href="/pt/categories/massa">Conversão de unidades de massa</Link>
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
            Abrir a versão em turco
          </Link>
        </section>
      </div>
    </main>
  );
}
