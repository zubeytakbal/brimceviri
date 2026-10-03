import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { CATHOLIC_PATHS } from "../../i18n/catholicTools";
import { buildSiteUrl } from "../../siteConfig";

const P = CATHOLIC_PATHS.es;
const title = "Herramientas católicas: Rosario de hoy, novenas, calendario litúrgico";
const description = "Herramientas católicas gratuitas: misterios del Rosario de hoy, calculadora de novenas, calendario litúrgico con color y ciclo de lecturas, y fechas de Semana Santa.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: P.hub, languages: { en: CATHOLIC_PATHS.en.hub, es: P.hub, pt: CATHOLIC_PATHS.pt.hub, "x-default": CATHOLIC_PATHS.en.hub } },
  openGraph: { title, description, url: buildSiteUrl(P.hub), siteName: "BirimCeviri.app", locale: "es_ES", type: "website" },
};

const tools = [
  { href: P.rosary, label: "Misterios del Rosario de hoy", text: "Qué misterios se rezan hoy y guía para rezar el Rosario cuenta por cuenta." },
  { href: P.novena, label: "Calculadora de novenas", text: "Cuándo empezar una novena: San Judas, Guadalupe, Divina Misericordia, Aguinaldos y más." },
  { href: P.liturgical, label: "Calendario litúrgico", text: "Tiempo litúrgico, color y ciclo de lecturas de cualquier día." },
  { href: P.easter, label: "¿Cuándo es Semana Santa?", text: "Semana Santa, Pascua, Ceniza y Pentecostés de cualquier año." },
];

export default function HerramientasCatolicasPage() {
  return (
    <main className="other-categories-page">
      <div className="directory-shell">
        <nav className="breadcrumbs" aria-label="Ruta de navegación">
          <Link href="/es">Inicio</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Herramientas católicas</span>
        </nav>
        <header className="other-categories-header">
          <h1>Herramientas católicas</h1>
          <p>
            Herramientas para rezar y seguir el año litúrgico. Todos los resultados salen de reglas fijas: el cálculo de la Pascua, el Calendario
            Romano General y el reparto semanal de los misterios del Rosario.
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
      </div>
    </main>
  );
}
