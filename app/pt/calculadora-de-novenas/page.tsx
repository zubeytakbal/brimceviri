import type { Metadata } from "next";
import { NovenaLocalized } from "../../components/christian/CatholicLocalized";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { feastDate, NOVENA_FEASTS, novenaFor } from "../../converter/christian/christianCalc";
import { diffDays } from "../../converter/time/dateMath";
import { CATHOLIC_DICT, CATHOLIC_PATHS, catholicAlternates, longDate } from "../../i18n/catholicTools";
import { buildSiteUrl } from "../../siteConfig";

const P = CATHOLIC_PATHS.pt;
const path = P.novena;
const d = CATHOLIC_DICT.pt;
const year = new Date().getFullYear();
const title = "Calculadora de novenas: quando começar uma novena?";
const description =
  "Saiba quando começar uma novena para que o nono dia seja a véspera da festa: Nossa Senhora Aparecida, São Judas Tadeu, Santo Antônio, Divina Misericórdia, Natal e outras.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, languages: catholicAlternates("novena") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "pt_BR", type: "website" },
};

const rows = NOVENA_FEASTS.map((f) => ({ f, n: novenaFor(feastDate(f, year)!) })).sort((a, b) => diffDays(b.n.start, a.n.start));
const start = (id: string) => rows.find((r) => r.f.id === id)!.n.start;

const faqItems: FaqItem[] = [
  {
    question: "Quando se começa uma novena?",
    answer: "Nove dias antes da festa: o nono dia da novena é a véspera. Por exemplo, para uma festa em 29 de setembro, começa-se em 20 de setembro.",
  },
  {
    question: "Quando começa a novena de Nossa Senhora Aparecida?",
    answer: `A festa é em 12 de outubro, então a novena vai de 3 a 11 de outubro (${longDate("pt", start("aparecida"))} em ${year}).`,
  },
  {
    question: `Quando começa a novena de São Judas Tadeu em ${year}?`,
    answer: `A festa de São Judas Tadeu é em 28 de outubro, e a novena começa em ${longDate("pt", start("jude"))}.`,
  },
  {
    question: "E a trezena de Santo Antônio?",
    answer: "Em muitas paróquias do Brasil reza-se a trezena, de 1º a 13 de junho, dia da festa. A novena tradicional vai de 4 a 12 de junho.",
  },
];

const related = [
  { href: P.rosary, label: "Mistérios do Terço de hoje" },
  { href: P.liturgical, label: "Calendário litúrgico de hoje" },
  { href: P.easter, label: "Quando é a Páscoa?" },
  { href: P.hub, label: "Todas as ferramentas católicas" },
];

export default function NovenasPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/pt", label: "Início" },
        { href: P.hub, label: "Ferramentas católicas" },
        { href: path, label: "Calculadora de novenas" },
      ]}
      crumbLabel="Caminho de navegação"
      title="Calculadora de novenas"
      intro="Escolha uma novena ou qualquer data: veja o dia de começar para que o nono dia seja a véspera da festa, e as próximas novenas do ano."
      tool={<NovenaLocalized lang="pt" initialDate={`${year}-01-01`} defaultFeast="aparecida" />}
      related={{ title: "Mais ferramentas católicas", links: related }}
      tocTitle="Conteúdo"
      tocItems={[
        { id: "datas", label: `Datas das novenas em ${year}` },
        { id: "faq", label: "Perguntas frequentes" },
      ]}
      faqTitle="Perguntas frequentes"
      faqItems={faqItems}
    >
      <h2 id="datas">Datas das novenas em {year}</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Novena</th>
              <th scope="col">Começa</th>
              <th scope="col">Festa</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ f, n }) => (
              <tr key={f.id}>
                <td>{d.feasts[f.id]}</td>
                <td>{longDate("pt", n.start)}</td>
                <td>{longDate("pt", n.feastDay)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        As festas fixas seguem o Calendário Romano Geral. Divina Misericórdia, Pentecostes e Sagrado Coração dependem da data da Páscoa e mudam
        a cada ano. Algumas dioceses celebram certas festas em outra data.
      </p>
    </TimeToolPage>
  );
}
