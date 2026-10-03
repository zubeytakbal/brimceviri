import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { RosaryLocalized } from "../../components/christian/CatholicLocalized";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { MYSTERY_BY_WEEKDAY, type MysterySet } from "../../converter/christian/christianCalc";
import { CATHOLIC_DICT, CATHOLIC_PATHS, catholicAlternates, weekdayName } from "../../i18n/catholicTools";
import { buildSiteUrl } from "../../siteConfig";

const P = CATHOLIC_PATHS.pt;
const path = P.rosary;
const d = CATHOLIC_DICT.pt;
const year = new Date().getFullYear();
const title = "Mistérios do Terço de hoje: quais mistérios rezar hoje?";
const description =
  "Quais mistérios do Terço se rezam hoje conforme o dia da semana: gozosos, dolorosos, gloriosos e luminosos. Reze o Terço conta por conta com o guia.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, languages: catholicAlternates("rosary") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "pt_BR", type: "website" },
};

const dias = (set: MysterySet) => [0, 1, 2, 3, 4, 5, 6].filter((i) => MYSTERY_BY_WEEKDAY[i] === set).map((i) => weekdayName("pt", i));

const faqItems: FaqItem[] = [
  ...(Object.keys(d.mysteries) as MysterySet[]).map((set) => ({
    question: `Em que dias se rezam os ${d.mysteries[set].name}?`,
    answer: `${dias(set).join(" e ")}. São eles: ${d.mysteries[set].items.join(", ")}.`.replace(/^./, (c) => c.toUpperCase()),
  })),
  {
    question: "Quantas ave-marias tem o Terço?",
    answer: "Cinco mistérios com dez ave-marias somam 50, mais as três ave-marias do início: 53 no total. O Rosário completo, com os quatro grupos de mistérios, tem 20 mistérios.",
  },
];

const related = [
  { href: P.novena, label: "Calculadora de novenas" },
  { href: P.liturgical, label: "Calendário litúrgico de hoje" },
  { href: P.easter, label: "Quando é a Páscoa?" },
  { href: P.hub, label: "Todas as ferramentas católicas" },
];

export default function TercoHojePage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/pt", label: "Início" },
        { href: P.hub, label: "Ferramentas católicas" },
        { href: path, label: "Mistérios do Terço de hoje" },
      ]}
      crumbLabel="Caminho de navegação"
      title="Mistérios do Terço de hoje"
      intro="Veja quais mistérios correspondem a hoje e reze o Terço conta por conta: o guia mostra a oração, o mistério e quantas ave-marias faltam."
      tool={<RosaryLocalized lang="pt" initialDate={`${year}-01-01`} />}
      related={{ title: "Mais ferramentas católicas", links: related }}
      tocTitle="Conteúdo"
      tocItems={[
        { id: "semana", label: "Mistérios de cada dia da semana" },
        { id: "faq", label: "Perguntas frequentes" },
      ]}
      faqTitle="Perguntas frequentes"
      faqItems={faqItems}
    >
      <h2 id="semana">Mistérios de cada dia da semana</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Dia</th>
              <th scope="col">Mistérios</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6, 0].map((i) => (
              <tr key={i}>
                <td>{weekdayName("pt", i)}</td>
                <td>{d.mysteries[MYSTERY_BY_WEEKDAY[i]].name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Essa distribuição semanal vem da carta apostólica Rosarium Virginis Mariae de São João Paulo II (2002), que acrescentou os Mistérios
        Luminosos às quintas-feiras. No guia você pode escolher qualquer grupo de mistérios. Para saber quando começar uma novena, use a{" "}
        <Link href={P.novena}>calculadora de novenas</Link>.
      </p>
    </TimeToolPage>
  );
}
