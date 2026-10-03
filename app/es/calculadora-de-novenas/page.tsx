import type { Metadata } from "next";
import { NovenaLocalized } from "../../components/christian/CatholicLocalized";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { feastDate, NOVENA_FEASTS, novenaFor } from "../../converter/christian/christianCalc";
import { diffDays } from "../../converter/time/dateMath";
import { CATHOLIC_DICT, CATHOLIC_PATHS, catholicAlternates, longDate } from "../../i18n/catholicTools";
import { buildSiteUrl } from "../../siteConfig";

const P = CATHOLIC_PATHS.es;
const path = P.novena;
const d = CATHOLIC_DICT.es;
const year = new Date().getFullYear();
const title = "Calculadora de novenas: ¿cuándo empezar una novena?";
const description =
  "Calcula cuándo empezar una novena para que el noveno día sea la víspera de la fiesta: San Judas Tadeo, Virgen de Guadalupe, Divina Misericordia, Navidad y más.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, languages: catholicAlternates("novena") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "es_ES", type: "website" },
};

const rows = NOVENA_FEASTS.map((f) => ({ f, n: novenaFor(feastDate(f, year)!) })).sort((a, b) => diffDays(b.n.start, a.n.start));
const start = (id: string) => rows.find((r) => r.f.id === id)!.n.start;

const faqItems: FaqItem[] = [
  {
    question: "¿Cuándo se empieza una novena?",
    answer: "Nueve días antes de la fiesta: el noveno día de la novena es la víspera. Por ejemplo, para una fiesta el 29 de septiembre se empieza el 20 de septiembre.",
  },
  {
    question: "¿Cuándo empieza la Novena de Aguinaldos?",
    answer: "Del 16 al 24 de diciembre, los nueve días anteriores a Navidad.",
  },
  {
    question: `¿Cuándo empieza la novena a San Judas Tadeo en ${year}?`,
    answer: `La fiesta de San Judas Tadeo es el 28 de octubre, así que la novena empieza el ${longDate("es", start("jude"))}.`,
  },
  {
    question: "¿Cuándo empieza la novena a la Virgen de Guadalupe?",
    answer: `El 3 de diciembre, para terminar el 11 de diciembre, víspera de la fiesta del 12 de diciembre (${longDate("es", start("guadalupe"))} en ${year}).`,
  },
];

const related = [
  { href: P.rosary, label: "Misterios del Rosario de hoy" },
  { href: P.liturgical, label: "Calendario litúrgico de hoy" },
  { href: P.easter, label: "¿Cuándo es Semana Santa?" },
  { href: P.hub, label: "Todas las herramientas católicas" },
];

export default function NovenasPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/es", label: "Inicio" },
        { href: P.hub, label: "Herramientas católicas" },
        { href: path, label: "Calculadora de novenas" },
      ]}
      crumbLabel="Ruta de navegación"
      title="Calculadora de novenas"
      intro="Elige una novena o cualquier fecha: verás el día en que debes empezar para que el noveno día sea la víspera de la fiesta, y las próximas novenas del año."
      tool={<NovenaLocalized lang="es" initialDate={`${year}-01-01`} defaultFeast="jude" />}
      related={{ title: "Más herramientas católicas", links: related }}
      tocTitle="Contenido"
      tocItems={[
        { id: "fechas", label: `Fechas de novenas ${year}` },
        { id: "faq", label: "Preguntas frecuentes" },
      ]}
      faqTitle="Preguntas frecuentes"
      faqItems={faqItems}
    >
      <h2 id="fechas">Fechas de novenas {year}</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Novena</th>
              <th scope="col">Empieza</th>
              <th scope="col">Fiesta</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ f, n }) => (
              <tr key={f.id}>
                <td>{d.feasts[f.id]}</td>
                <td>{longDate("es", n.start)}</td>
                <td>{longDate("es", n.feastDay)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Las fiestas fijas siguen el Calendario Romano General. La Divina Misericordia, Pentecostés y el Sagrado Corazón dependen de la fecha de
        Pascua y cambian cada año. Algunas diócesis celebran ciertas fiestas en otra fecha.
      </p>
    </TimeToolPage>
  );
}
