import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import CatholicHubGuide from "../../components/dini/CatholicHubGuide";
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
        <CatholicHubGuide lang="pt" fromYear={new Date().getUTCFullYear()} />
      </div>
    </main>
  );
}
