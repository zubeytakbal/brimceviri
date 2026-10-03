import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { HolyWeekLocalized } from "../../components/christian/CatholicLocalized";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { westernFeasts } from "../../converter/christian/christianCalc";
import { CATHOLIC_PATHS, catholicAlternates, EASTER_FEAST_NAMES, longDate, shortDate } from "../../i18n/catholicTools";
import { buildSiteUrl } from "../../siteConfig";

const P = CATHOLIC_PATHS.es;
const path = P.easter;
const N = EASTER_FEAST_NAMES.es;
const year = new Date().getFullYear();
const title = `¿Cuándo es Semana Santa ${year + 1}? Fechas de Pascua por año`;
const description = `Fechas de Semana Santa y Pascua de ${year + 1} y de cualquier año: Domingo de Ramos, Jueves y Viernes Santo, Domingo de Resurrección, Miércoles de Ceniza y Pentecostés.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, languages: catholicAlternates("easter") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "es_ES", type: "website" },
};

const at = (y: number, id: string) => westernFeasts(y)!.find((f) => f.id === id)!.date;
const years = Array.from({ length: 12 }, (_, i) => year - 1 + i);

const faqItems: FaqItem[] = [
  {
    question: `¿Cuándo es Semana Santa ${year + 1}?`,
    answer: `Empieza el Domingo de Ramos, ${longDate("es", at(year + 1, "palm-sunday"))}. El Jueves Santo es el ${longDate("es", at(year + 1, "maundy-thursday"))}, el Viernes Santo el ${longDate("es", at(year + 1, "good-friday"))} y el Domingo de Resurrección el ${longDate("es", at(year + 1, "easter"))}.`,
  },
  {
    question: "¿Por qué la Semana Santa cambia de fecha cada año?",
    answer:
      "La Pascua se celebra el domingo siguiente a la primera luna llena de primavera (según las tablas de la Iglesia, a partir del 21 de marzo). Por eso cae entre el 22 de marzo y el 25 de abril, y con ella se mueven la Cuaresma, la Semana Santa y Pentecostés.",
  },
  {
    question: `¿Cuándo es el Miércoles de Ceniza ${year + 1}?`,
    answer: `El ${longDate("es", at(year + 1, "ash-wednesday"))}, 46 días antes del Domingo de Resurrección. Ese día empieza la Cuaresma.`,
  },
];

const related = [
  { href: P.liturgical, label: "Calendario litúrgico de hoy" },
  { href: P.rosary, label: "Misterios del Rosario de hoy" },
  { href: P.novena, label: "Calculadora de novenas" },
  { href: P.hub, label: "Todas las herramientas católicas" },
];

export default function SemanaSantaPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/es", label: "Inicio" },
        { href: P.hub, label: "Herramientas católicas" },
        { href: path, label: "¿Cuándo es Semana Santa?" },
      ]}
      crumbLabel="Ruta de navegación"
      title="¿Cuándo es Semana Santa?"
      intro="Escribe un año y obtén las fechas de Semana Santa y Pascua, con el Carnaval, el Miércoles de Ceniza, la Ascensión, Pentecostés y el Corpus Christi."
      tool={<HolyWeekLocalized lang="es" initialYear={year} />}
      related={{ title: "Más herramientas católicas", links: related }}
      tocTitle="Contenido"
      tocItems={[
        { id: "tabla", label: `Semana Santa ${years[0]}–${years[years.length - 1]}` },
        { id: "faq", label: "Preguntas frecuentes" },
      ]}
      faqTitle="Preguntas frecuentes"
      faqItems={faqItems}
    >
      <h2 id="tabla">
        Semana Santa {years[0]}–{years[years.length - 1]}
      </h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Año</th>
              <th scope="col">{N["palm-sunday"]}</th>
              <th scope="col">{N["maundy-thursday"]}</th>
              <th scope="col">{N["good-friday"]}</th>
              <th scope="col">Pascua</th>
            </tr>
          </thead>
          <tbody>
            {years.map((y) => (
              <tr key={y}>
                <td>{y}</td>
                <td>{shortDate("es", at(y, "palm-sunday"))}</td>
                <td>{shortDate("es", at(y, "maundy-thursday"))}</td>
                <td>{shortDate("es", at(y, "good-friday"))}</td>
                <td>
                  <strong>{shortDate("es", at(y, "easter"))}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Son las fechas de la Iglesia católica (y de las iglesias protestantes). La Pascua ortodoxa suele caer más tarde. Los días festivos oficiales
        dependen de cada país o región. El tiempo litúrgico de cada día está en el <Link href={P.liturgical}>calendario litúrgico</Link>.
      </p>
    </TimeToolPage>
  );
}
