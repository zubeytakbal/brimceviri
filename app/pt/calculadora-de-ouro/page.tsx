import type { Metadata } from "next";
import GoldPurityCalculator from "../../components/GoldPurityCalculator";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { alloy, GOLD_GRADES, pureGold } from "../../converter/goldPurity";
import { GOLD_CALCULATOR_PATHS, goldCalculatorAlternates } from "../../i18n/goldCalculatorPaths";
import { buildSiteUrl } from "../../siteConfig";

const path = GOLD_CALCULATOR_PATHS.pt;
const title = "Calculadora de ouro: ouro 18k (750), teor e ouro puro";
const description =
  "Quanto ouro puro tem o ouro 18k, 14k ou 10k? Quilates e teor (750, 585, 417), como passar de 14k para 18k e valor do ouro pelo preço que você informar.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, languages: goldCalculatorAlternates() },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "pt_BR", type: "website" },
};

const f = (n: number, d = 2) => n.toLocaleString("pt-BR", { maximumFractionDigits: d });
const up = alloy(10, 14 / 24, 18 / 24);
const add = up && up.direction === "up" ? up.addPureGold : 0;

const faqItems: FaqItem[] = [
  {
    question: "O que significa ouro 750?",
    answer: `Que a peça tem 750 partes de ouro puro em 1000, ou seja, 75 %: é o ouro 18k, o mais comum nas joias do Brasil. Em 10 g de ouro 750 há ${f(pureGold(10, 0.75), 2)} g de ouro puro.`,
  },
  {
    question: "Qual a diferença entre ouro 18k e ouro 24k?",
    answer:
      "O ouro 24k (999) é praticamente puro e muito macio. O ouro 18k tem 75 % de ouro e 25 % de outros metais, o que o torna mais resistente para joias.",
  },
  {
    question: "Quanto ouro puro é preciso para transformar ouro 14k em 18k?",
    answer: `Para 10 g de ouro 14k, adicione ${f(add, 2)} g de ouro 24k e você terá ${f(10 + add, 2)} g de ouro 18k.`,
  },
  {
    question: "Como calcular quanto vale meu ouro?",
    answer: "Peso × teor × preço do grama do ouro puro. Digite o preço atual; quem compra ouro usado paga menos que o valor de fundição.",
  },
];

export default function CalculadoraOuroPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/pt", label: "Início" },
        { href: "/pt/categorias/quilate-de-ouro", label: "Quilate de ouro" },
        { href: path, label: "Calculadora de ouro" },
      ]}
      crumbLabel="Caminho de navegação"
      title="Calculadora de ouro: teor e ouro puro"
      intro="Digite o peso e o teor do seu ouro: veja quanto ouro puro ele contém, a mesma quantidade de ouro em outro teor, quanto ouro puro ou liga adicionar para mudar o teor e o valor de fundição pelo preço que você informar."
      tool={<GoldPurityCalculator lang="pt" defaultBasis="hallmark" defaultKarat={18} defaultTarget={22} />}
      related={{
        title: "Mais conversões de ouro",
        links: [
          { href: "/pt/ouro-18-quilates-ouro-22-quilates", label: "Ouro 18k para 22k" },
          { href: "/pt/categorias/quilate-de-ouro", label: "Todas as conversões de quilates" },
        ],
      }}
      tocTitle="Conteúdo"
      tocItems={[
        { id: "tabela", label: "Tabela de quilates e teor" },
        { id: "faq", label: "Perguntas frequentes" },
      ]}
      faqTitle="Perguntas frequentes"
      faqItems={faqItems}
    >
      <h2 id="tabela">Tabela de quilates e teor</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Teor</th>
              <th scope="col">Quilates</th>
              <th scope="col">Ouro puro</th>
              <th scope="col">Ouro puro em 10 g</th>
            </tr>
          </thead>
          <tbody>
            {GOLD_GRADES.map((g) => (
              <tr key={g.karat}>
                <td>Ouro {g.hallmark}</td>
                <td>{g.karat}k</td>
                <td>{f(g.hallmark / 10, 1)} %</td>
                <td>{f(pureGold(10, g.hallmark / 1000), 2)} g</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        No Brasil o ouro é identificado pelo teor gravado na peça (750, 585, 999), por isso a calculadora usa o teor como padrão; também é
        possível calcular por quilates ÷ 24. Não armazenamos o preço do ouro: para o valor de fundição, digite o preço atual.
      </p>
    </TimeToolPage>
  );
}
