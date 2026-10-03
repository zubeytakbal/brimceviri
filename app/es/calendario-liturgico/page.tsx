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

const P = CATHOLIC_PATHS.es;
const path = P.liturgical;
const d = CATHOLIC_DICT.es;
const year = new Date().getFullYear();
const title = "Calendario litúrgico: ¿qué tiempo y color litúrgico es hoy?";
const description =
  "Tiempo litúrgico de hoy, color litúrgico, semana del Tiempo Ordinario y ciclo de lecturas (A, B, C; año par o impar) para cualquier fecha del calendario católico.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, languages: catholicAlternates("liturgical") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "es_ES", type: "website" },
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
    question: `¿Qué ciclo litúrgico empieza en Adviento de ${year}?`,
    answer: `El año litúrgico que empieza el ${longDate("es", advent)} es el ciclo ${ly.sundayCycle} para los domingos y el año ${ly.weekdayCycle} (${ly.weekdayCycle === "I" ? "impar" : "par"}) para las lecturas de las ferias.`,
  },
  {
    question: "¿Qué significan los colores litúrgicos?",
    answer:
      "Morado: Adviento y Cuaresma, espera y penitencia. Blanco: Navidad, Pascua y fiestas del Señor, de la Virgen y de santos no mártires. Verde: Tiempo Ordinario. Rojo: Domingo de Ramos, Viernes Santo, Pentecostés y mártires. Rosa: domingos Gaudete y Laetare.",
  },
  {
    question: "¿Cómo se cuentan las semanas del Tiempo Ordinario?",
    answer:
      "La primera semana empieza tras el Bautismo del Señor y se interrumpe con la Cuaresma. Después de Pentecostés se retoma contando hacia atrás desde Jesucristo Rey del Universo, que es siempre la semana 34.",
  },
];

const related = [
  { href: P.rosary, label: "Misterios del Rosario de hoy" },
  { href: P.novena, label: "Calculadora de novenas" },
  { href: P.easter, label: "¿Cuándo es Semana Santa?" },
  { href: P.hub, label: "Todas las herramientas católicas" },
];

export default function CalendarioLiturgicoPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/es", label: "Inicio" },
        { href: P.hub, label: "Herramientas católicas" },
        { href: path, label: "Calendario litúrgico" },
      ]}
      crumbLabel="Ruta de navegación"
      title="Calendario litúrgico de hoy"
      intro="Elige una fecha y mira el tiempo litúrgico, la semana, el color de los ornamentos, las solemnidades y el ciclo de lecturas, con los próximos 14 días."
      tool={<LiturgicalCalendarTool lang="es" initialDate={`${year}-01-01`} />}
      related={{ title: "Más herramientas católicas", links: related }}
      tocTitle="Contenido"
      tocItems={[
        { id: "ano", label: `Año litúrgico ${year}–${year + 1}` },
        { id: "faq", label: "Preguntas frecuentes" },
      ]}
      faqTitle="Preguntas frecuentes"
      faqItems={faqItems}
    >
      <h2 id="ano">
        Año litúrgico {year}–{year + 1} (ciclo {ly.sundayCycle})
      </h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <tbody>
            {rows.map(([name, date]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{longDate("es", date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Las fechas siguen el Calendario Romano General. Algunos países trasladan la Epifanía, la Ascensión o el Corpus Christi al domingo. Las
        fechas de Semana Santa de otros años están en <Link href={P.easter}>¿cuándo es Semana Santa?</Link>.
      </p>
    </TimeToolPage>
  );
}
