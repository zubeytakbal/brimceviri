import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import DirectoryGuide, { type DirectoryGuideContent } from "../../components/DirectoryGuide";
import { CATHOLIC_PATHS } from "../../i18n/catholicTools";
import { buildSiteUrl } from "../../siteConfig";

const P = CATHOLIC_PATHS.pt;
const title = "Ferramentas católicas: Terço de hoje, novenas, calendário litúrgico";
const description = "Ferramentas católicas gratuitas: mistérios do Terço de hoje, calculadora de novenas, calendário litúrgico com cor e ano das leituras, e datas da Páscoa e do Carnaval.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: P.hub, languages: { en: CATHOLIC_PATHS.en.hub, es: CATHOLIC_PATHS.es.hub, pt: P.hub, "x-default": CATHOLIC_PATHS.en.hub } },
  openGraph: { title, description, url: buildSiteUrl(P.hub), siteName: "BirimCeviri.app", locale: "pt_BR", type: "website" },
};

const tools = [
  { href: P.rosary, label: "Mistérios do Terço de hoje", text: "Quais mistérios rezar hoje e guia para rezar o Terço conta por conta." },
  { href: P.novena, label: "Calculadora de novenas", text: "Quando começar uma novena: Aparecida, São Judas, Santo Antônio, Divina Misericórdia e outras." },
  { href: P.liturgical, label: "Calendário litúrgico", text: "Tempo litúrgico, cor e ano das leituras de qualquer dia." },
  { href: P.easter, label: "Quando é a Páscoa?", text: "Páscoa, Carnaval, Semana Santa e Corpus Christi de qualquer ano." },
];

const guide: DirectoryGuideContent = {
  sections: [
    {
      heading: "O que cada ferramenta calcula",
      paragraphs: [
        "A página do Terço segue a distribuição semanal proposta por João Paulo II na carta apostólica Rosarium Virginis Mariae, de 2002, que também acrescentou os mistérios luminosos. Segunda e sábado são dias dos gozosos, terça e sexta dos dolorosos, quarta e domingo dos gloriosos, e quinta dos luminosos. O guia acompanha conta por conta, do sinal da cruz e do Creio até a Salve-Rainha, e permite incluir a oração de Fátima depois de cada Glória. O nome terço vem da época em que o Rosário completo tinha quinze mistérios: rezar cinco era rezar a terça parte.",
        "A calculadora de novenas volta nove dias a partir da festa, de forma que o último dia de oração seja a véspera. Nas festas de data fixa, como Nossa Senhora Aparecida em 12 de outubro ou São Judas Tadeu em 28 de outubro, só muda o dia da semana de um ano para outro. Nas festas ligadas à Páscoa, como Pentecostes e o Sagrado Coração de Jesus, a data muda todo ano, e a novena da Divina Misericórdia acaba começando na Sexta-feira Santa.",
        "O calendário litúrgico mostra, para qualquer dia, o tempo litúrgico, a semana, a cor dos paramentos e os ciclos de leituras: Ano A, B ou C nos domingos e ano par ou ímpar nos dias de semana do Tempo Comum. Como o ano litúrgico começa no primeiro domingo do Advento, a troca de ciclo acontece no fim de novembro ou no começo de dezembro.",
        "A página da Páscoa calcula o Domingo de Páscoa de qualquer ano entre 1583 e 4099 e, a partir dele, as datas móveis que interessam no Brasil: a terça-feira de Carnaval cai 47 dias antes, a Quarta-feira de Cinzas 46 dias antes, Pentecostes 49 dias depois e Corpus Christi, sempre numa quinta-feira, 60 dias depois.",
      ],
    },
    {
      heading: "Como a data da Páscoa é definida",
      paragraphs: [
        "Pela regra ocidental, a Páscoa é o primeiro domingo depois da lua cheia eclesiástica que cai em 21 de março ou depois dessa data. O equinócio é fixado por convenção em 21 de março e a lua cheia sai de tabelas, baseadas no ciclo de 19 anos e nas epactas da reforma gregoriana de 1582, promulgada pelo papa Gregório XIII na bula Inter gravissimas. O resultado é que a Páscoa nunca cai antes de 22 de março nem depois de 25 de abril, e o Carnaval, que depende dela, varia entre o começo de fevereiro e o começo de março.",
        "As Igrejas ortodoxas usam a mesma regra sobre o calendário juliano, hoje treze dias atrasado em relação ao gregoriano. Em alguns anos as duas Páscoas coincidem, como em 2025, mas em muitos outros a ortodoxa vem uma ou mais semanas depois.",
      ],
    },
    {
      heading: "Quando usar cada uma",
      paragraphs: [
        "Para planejar feriados, viagens ou a agenda da paróquia, comece pela data da Páscoa, que já traz o Carnaval e Corpus Christi. Para preparar as leituras de domingo ou entender a cor usada na missa, abra o calendário litúrgico. No dia a dia, a página do Terço mostra quais mistérios rezar hoje, e para quem fez uma promessa ou quer terminar a novena na véspera da festa, a calculadora indica o dia certo de começar.",
        "As datas seguem o Calendário Romano Geral e as Normas Universais do Ano Litúrgico. No Brasil, algumas solenidades são transferidas para o domingo e cada diocese tem seus padroeiros, por isso, para a liturgia oficial, vale consultar também o Diretório da Liturgia publicado anualmente pela CNBB.",
      ],
    },
  ],
  faqHeading: "Perguntas frequentes",
  faq: [
    {
      question: "A lua cheia da Páscoa é a lua cheia do céu?",
      answer:
        "Nem sempre. A Igreja usa uma lua cheia calculada por tabelas, que se aproxima da astronômica e costuma diferir dela em no máximo um ou dois dias. Por isso, em certos anos a Páscoa não cai no domingo que a observação do céu indicaria.",
    },
    {
      question: "Corpus Christi é feriado nacional?",
      answer:
        "Não é feriado nacional fixo: é ponto facultativo federal, e muitos estados e municípios o declaram feriado. A data, porém, é sempre a quinta-feira 60 dias depois da Páscoa.",
    },
  ],
};

export default function FerramentasCatolicasPage() {
  return (
    <main className="other-categories-page">
      <div className="directory-shell">
        <nav className="breadcrumbs" aria-label="Caminho de navegação">
          <Link href="/pt">Início</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Ferramentas católicas</span>
        </nav>
        <header className="other-categories-header">
          <h1>Ferramentas católicas</h1>
          <p>
            Ferramentas para rezar e acompanhar o ano litúrgico. Todos os resultados vêm de regras fixas: o cálculo da Páscoa, o Calendário Romano
            Geral e a distribuição semanal dos mistérios do Terço.
          </p>
        </header>
        <ul className="tool-hub-list dini-hub-list">
          {tools.map((t) => (
            <li key={t.href}>
              <Link href={t.href}>
                <span>{t.label}</span>
                <small>{t.text}</small>
              </Link>
            </li>
          ))}
        </ul>
        <DirectoryGuide guide={guide} />
      </div>
    </main>
  );
}
