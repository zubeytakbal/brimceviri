import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { HolyWeekLocalized } from "../../components/christian/CatholicLocalized";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { westernFeasts } from "../../converter/christian/christianCalc";
import { addDaysYmd } from "../../converter/time/dateMath";
import { CATHOLIC_PATHS, catholicAlternates, EASTER_FEAST_NAMES, longDate, shortDate } from "../../i18n/catholicTools";
import { buildSiteUrl } from "../../siteConfig";

const P = CATHOLIC_PATHS.pt;
const path = P.easter;
const N = EASTER_FEAST_NAMES.pt;
const year = new Date().getFullYear();
const title = `Quando é a Páscoa ${year + 1}? Datas da Páscoa, Carnaval e Corpus Christi`;
const description = `Datas da Páscoa ${year + 1} e de qualquer ano: Carnaval, Quarta-feira de Cinzas, Semana Santa, Sexta-feira Santa, Pentecostes e Corpus Christi.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, languages: catholicAlternates("easter") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "pt_BR", type: "website" },
};

const at = (y: number, id: string) => westernFeasts(y)!.find((f) => f.id === id)!.date;
const years = Array.from({ length: 12 }, (_, i) => year - 1 + i);

const faqItems: FaqItem[] = [
  {
    question: `Quando é a Páscoa de ${year + 1}?`,
    answer: `O Domingo de Páscoa de ${year + 1} é em ${longDate("pt", at(year + 1, "easter"))}. A Sexta-feira Santa é em ${longDate("pt", at(year + 1, "good-friday"))}.`,
  },
  {
    question: `Quando é o Carnaval de ${year + 1}?`,
    answer: `A terça-feira de Carnaval é ${longDate("pt", at(year + 1, "shrove-tuesday"))}, 47 dias antes da Páscoa; a segunda-feira de Carnaval é ${longDate("pt", addDaysYmd(at(year + 1, "shrove-tuesday"), -1))} e a Quarta-feira de Cinzas, ${longDate("pt", at(year + 1, "ash-wednesday"))}.`,
  },
  {
    question: `Quando é Corpus Christi em ${year + 1}?`,
    answer: `Na quinta-feira ${longDate("pt", at(year + 1, "corpus-christi"))}, 60 dias depois da Páscoa.`,
  },
  {
    question: "Por que a data da Páscoa muda todo ano?",
    answer:
      "A Páscoa é celebrada no domingo depois da primeira lua cheia da primavera do hemisfério norte (pelas tabelas da Igreja, a partir de 21 de março). Por isso cai entre 22 de março e 25 de abril, e com ela mudam o Carnaval, a Quaresma, Pentecostes e Corpus Christi.",
  },
];

const related = [
  { href: P.liturgical, label: "Calendário litúrgico de hoje" },
  { href: P.rosary, label: "Mistérios do Terço de hoje" },
  { href: P.novena, label: "Calculadora de novenas" },
  { href: P.hub, label: "Todas as ferramentas católicas" },
];

export default function PascoaPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/pt", label: "Início" },
        { href: P.hub, label: "Ferramentas católicas" },
        { href: path, label: "Quando é a Páscoa?" },
      ]}
      crumbLabel="Caminho de navegação"
      title="Quando é a Páscoa?"
      intro="Digite um ano e veja as datas da Páscoa e da Semana Santa, com o Carnaval, a Quarta-feira de Cinzas, Pentecostes e Corpus Christi."
      tool={<HolyWeekLocalized lang="pt" initialYear={year} />}
      related={{ title: "Mais ferramentas católicas", links: related }}
      tocTitle="Conteúdo"
      tocItems={[
        { id: "tabela", label: `Páscoa e Carnaval ${years[0]}–${years[years.length - 1]}` },
        { id: "faq", label: "Perguntas frequentes" },
      ]}
      faqTitle="Perguntas frequentes"
      faqItems={faqItems}
    >
      <h2 id="tabela">
        Páscoa e Carnaval {years[0]}–{years[years.length - 1]}
      </h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Ano</th>
              <th scope="col">Carnaval (terça)</th>
              <th scope="col">{N["good-friday"]}</th>
              <th scope="col">Páscoa</th>
              <th scope="col">Corpus Christi</th>
            </tr>
          </thead>
          <tbody>
            {years.map((y) => (
              <tr key={y}>
                <td>{y}</td>
                <td>{shortDate("pt", at(y, "shrove-tuesday"))}</td>
                <td>{shortDate("pt", at(y, "good-friday"))}</td>
                <td>
                  <strong>{shortDate("pt", at(y, "easter"))}</strong>
                </td>
                <td>{shortDate("pt", at(y, "corpus-christi"))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        São as datas da Igreja Católica (e das igrejas protestantes). A Páscoa ortodoxa costuma cair mais tarde. Feriados e pontos facultativos
        dependem de cada país, estado e município. O tempo litúrgico de cada dia está no <Link href={P.liturgical}>calendário litúrgico</Link>.
      </p>
    </TimeToolPage>
  );
}
