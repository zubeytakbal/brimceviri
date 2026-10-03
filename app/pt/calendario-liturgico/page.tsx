import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { LiturgicalCalendarTool } from "../../components/christian/CatholicLocalized";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { adventSunday, westernEaster } from "../../converter/christian/christianCalc";
import { baptismOfTheLord, liturgicalDay } from "../../converter/christian/liturgicalCalendar";
import { addDaysYmd } from "../../converter/time/dateMath";
import { CATHOLIC_DICT, CATHOLIC_PATHS, catholicAlternates, longDate } from "../../i18n/catholicTools";
import { buildSiteUrl } from "../../siteConfig";

const P = CATHOLIC_PATHS.pt;
const path = P.liturgical;
const d = CATHOLIC_DICT.pt;
const year = new Date().getFullYear();
const title = "Calendário litúrgico: qual o tempo e a cor litúrgica de hoje?";
const description =
  "Tempo litúrgico de hoje, cor litúrgica, semana do Tempo Comum e ano das leituras (A, B, C; ano par ou ímpar) para qualquer data do calendário católico.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, languages: catholicAlternates("liturgical") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "pt_BR", type: "website" },
};

const advent = adventSunday(year);
const easter = westernEaster(year + 1)!;
const ly = liturgicalDay(advent)!;
const rows: Array<[string, { year: number; month: number; day: number }]> = [
  [d.seasons.advent, advent],
  [d.celebrations.christmas, { year, month: 12, day: 25 }],
  [d.celebrations.baptism, baptismOfTheLord(year + 1)],
  [d.celebrations["ash-wednesday"], addDaysYmd(easter, -46)],
  [d.celebrations["palm-sunday"], addDaysYmd(easter, -7)],
  [d.celebrations.easter, easter],
  [d.celebrations.pentecost, addDaysYmd(easter, 49)],
  [d.celebrations["christ-the-king"], addDaysYmd(adventSunday(year + 1), -7)],
];

const faqItems: FaqItem[] = [
  {
    question: `Qual é o ano litúrgico que começa no Advento de ${year}?`,
    answer: `O ano litúrgico que começa em ${longDate("pt", advent)} é o Ano ${ly.sundayCycle} para os domingos e o Ano ${ly.weekdayCycle} (${ly.weekdayCycle === "I" ? "ímpar" : "par"}) para as leituras dos dias de semana.`,
  },
  {
    question: "O que significam as cores litúrgicas?",
    answer:
      "Roxo: Advento e Quaresma, espera e penitência. Branco: Natal, Páscoa e festas do Senhor, de Nossa Senhora e dos santos não mártires. Verde: Tempo Comum. Vermelho: Domingo de Ramos, Sexta-feira da Paixão, Pentecostes e mártires. Rosa: domingos Gaudete e Laetare.",
  },
  {
    question: "Como se contam as semanas do Tempo Comum?",
    answer:
      "A primeira semana começa depois do Batismo do Senhor e é interrompida pela Quaresma. Depois de Pentecostes, a contagem é retomada de trás para frente a partir de Cristo Rei, que é sempre a 34ª semana.",
  },
];

const related = [
  { href: P.rosary, label: "Mistérios do Terço de hoje" },
  { href: P.novena, label: "Calculadora de novenas" },
  { href: P.easter, label: "Quando é a Páscoa?" },
  { href: P.hub, label: "Todas as ferramentas católicas" },
];

export default function CalendarioLiturgicoPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/pt", label: "Início" },
        { href: P.hub, label: "Ferramentas católicas" },
        { href: path, label: "Calendário litúrgico" },
      ]}
      crumbLabel="Caminho de navegação"
      title="Calendário litúrgico de hoje"
      intro="Escolha uma data e veja o tempo litúrgico, a semana, a cor dos paramentos, as solenidades e o ano das leituras, com os próximos 14 dias."
      tool={<LiturgicalCalendarTool lang="pt" initialDate={`${year}-01-01`} />}
      related={{ title: "Mais ferramentas católicas", links: related }}
      tocTitle="Conteúdo"
      tocItems={[
        { id: "ano", label: `Ano litúrgico ${year}–${year + 1}` },
        { id: "faq", label: "Perguntas frequentes" },
      ]}
      faqTitle="Perguntas frequentes"
      faqItems={faqItems}
    >
      <h2 id="ano">
        Ano litúrgico {year}–{year + 1} (Ano {ly.sundayCycle})
      </h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <tbody>
            {rows.map(([name, date]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{longDate("pt", date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        As datas seguem o Calendário Romano Geral. No Brasil, a Epifania e a Ascensão são celebradas no domingo. As datas da Páscoa e do Carnaval
        de outros anos estão em <Link href={P.easter}>quando é a Páscoa</Link>.
      </p>
    </TimeToolPage>
  );
}
