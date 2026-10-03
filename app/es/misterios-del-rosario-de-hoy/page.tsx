import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { RosaryLocalized } from "../../components/christian/CatholicLocalized";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { MYSTERY_BY_WEEKDAY, type MysterySet } from "../../converter/christian/christianCalc";
import { CATHOLIC_DICT, CATHOLIC_PATHS, catholicAlternates, weekdayName } from "../../i18n/catholicTools";
import { buildSiteUrl } from "../../siteConfig";

const P = CATHOLIC_PATHS.es;
const path = P.rosary;
const d = CATHOLIC_DICT.es;
const year = new Date().getFullYear();
const title = "Misterios del Rosario de hoy: ¿qué misterios se rezan hoy?";
const description =
  "Qué misterios del Rosario se rezan hoy según el día de la semana: gozosos, dolorosos, gloriosos y luminosos. Reza el Rosario cuenta por cuenta con la guía.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, languages: catholicAlternates("rosary") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "es_ES", type: "website" },
};

const dias = (set: MysterySet) => [0, 1, 2, 3, 4, 5, 6].filter((i) => MYSTERY_BY_WEEKDAY[i] === set).map((i) => weekdayName("es", i));

const faqItems: FaqItem[] = [
  ...(Object.keys(d.mysteries) as MysterySet[]).map((set) => ({
    question: `¿Qué días se rezan los ${d.mysteries[set].name}?`,
    answer: `Los ${dias(set).join(" y ")}. Son: ${d.mysteries[set].items.join(", ")}.`,
  })),
  {
    question: "¿Cuántas avemarías tiene el Rosario?",
    answer: "Cinco misterios de diez avemarías suman 50, más las tres avemarías del inicio: 53 en total.",
  },
];

const related = [
  { href: P.novena, label: "Calculadora de novenas" },
  { href: P.liturgical, label: "Calendario litúrgico de hoy" },
  { href: P.easter, label: "¿Cuándo es Semana Santa?" },
  { href: P.hub, label: "Todas las herramientas católicas" },
];

export default function RosarioHoyPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/es", label: "Inicio" },
        { href: P.hub, label: "Herramientas católicas" },
        { href: path, label: "Misterios del Rosario de hoy" },
      ]}
      crumbLabel="Ruta de navegación"
      title="Misterios del Rosario de hoy"
      intro="Mira qué misterios corresponden hoy y reza el Rosario cuenta por cuenta: la guía muestra la oración, el misterio y cuántas avemarías faltan."
      tool={<RosaryLocalized lang="es" initialDate={`${year}-01-01`} />}
      related={{ title: "Más herramientas católicas", links: related }}
      tocTitle="Contenido"
      tocItems={[
        { id: "semana", label: "Misterios según el día de la semana" },
        { id: "faq", label: "Preguntas frecuentes" },
      ]}
      faqTitle="Preguntas frecuentes"
      faqItems={faqItems}
    >
      <h2 id="semana">Misterios según el día de la semana</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Día</th>
              <th scope="col">Misterios</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6, 0].map((i) => (
              <tr key={i}>
                <td>{weekdayName("es", i)}</td>
                <td>{d.mysteries[MYSTERY_BY_WEEKDAY[i]].name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Este reparto semanal procede de la carta apostólica Rosarium Virginis Mariae de san Juan Pablo II (2002), que añadió los Misterios
        Luminosos para el jueves. Algunas personas mantienen costumbres anteriores, como los Gozosos en los domingos de Adviento y los Dolorosos en
        los domingos de Cuaresma; en la guía puedes elegir cualquier serie. Para saber cuándo empezar una novena usa la{" "}
        <Link href={P.novena}>calculadora de novenas</Link>.
      </p>
    </TimeToolPage>
  );
}
