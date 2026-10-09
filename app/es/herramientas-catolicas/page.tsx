import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import DirectoryGuide, { type DirectoryGuideContent } from "../../components/DirectoryGuide";
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

const guide: DirectoryGuideContent = {
  sections: [
    {
      heading: "Qué calcula cada herramienta",
      paragraphs: [
        "La página del Rosario aplica el reparto semanal que propuso Juan Pablo II en la carta apostólica Rosarium Virginis Mariae (2002), la misma que introdujo los misterios luminosos: gozosos el lunes y el sábado, dolorosos el martes y el viernes, gloriosos el miércoles y el domingo, luminosos el jueves. La guía avanza cuenta por cuenta desde la señal de la cruz y el Credo hasta la Salve, con las cinco decenas en orden y la oración de Fátima como opción.",
        "La calculadora de novenas cuenta nueve días hacia atrás desde la fiesta, de modo que el último día de la novena es la víspera. Para fiestas de fecha fija, como San Judas Tadeo el 28 de octubre o la Virgen de Guadalupe el 12 de diciembre, el resultado cambia solo de día de la semana; para las que dependen de la Pascua, como Pentecostés o el Sagrado Corazón, cambia cada año. Por la misma regla, la Novena de Aguinaldos va del 16 al 24 de diciembre.",
        "El calendario litúrgico indica para cualquier fecha el tiempo litúrgico, la semana, el color de los ornamentos y los ciclos de lecturas: A, B o C para los domingos y año I o II para las ferias del Tiempo Ordinario. El año litúrgico empieza el primer domingo de Adviento, por eso el ciclo cambia a finales de noviembre o principios de diciembre y no el 1 de enero.",
        "La página de Semana Santa calcula el Domingo de Resurrección de cualquier año entre 1583 y 4099 y, a partir de él, las fechas que se mueven con la Pascua: Miércoles de Ceniza 46 días antes, Domingo de Ramos una semana antes, Ascensión 39 días después y Pentecostés 49 días después.",
      ],
    },
    {
      heading: "Cómo se fija la fecha de la Pascua",
      paragraphs: [
        "La regla occidental dice que la Pascua es el primer domingo después de la luna llena eclesiástica que cae el 21 de marzo o después. Tanto el equinoccio como la luna llena son valores de tabla, no observaciones astronómicas: el equinoccio se fija siempre en el 21 de marzo y la luna se obtiene con el ciclo de 19 años y las epactas de la reforma gregoriana de 1582 (bula Inter gravissimas de Gregorio XIII). Por eso la Pascua cae siempre entre el 22 de marzo y el 25 de abril.",
        "Las Iglesias ortodoxas aplican la misma idea con el calendario juliano, que hoy va trece días por detrás del gregoriano. Las dos fechas coinciden algunos años, como en 2025, pero a menudo la Pascua ortodoxa llega una o varias semanas más tarde.",
      ],
    },
    {
      heading: "Cuándo usar cada una",
      paragraphs: [
        "Si quieres organizar vacaciones, viajes o actividades de la parroquia, empieza por la fecha de Semana Santa. Si preparas las lecturas del domingo o te preguntas por qué el sacerdote viste de morado o de rosa, consulta el calendario litúrgico. Para la oración diaria, la página del Rosario te dice qué misterios tocan hoy, y si has hecho una promesa o quieres llegar a una fiesta con la novena terminada, la calculadora te da el día exacto para empezar.",
        "Todas las fechas siguen el Calendario Romano General y las Normas universales sobre el año litúrgico. Las conferencias episcopales pueden trasladar algunas solemnidades al domingo y cada diócesis tiene sus propios patronos, así que para la liturgia oficial de tu país conviene revisar también el calendario o directorio litúrgico que publica la conferencia episcopal.",
      ],
    },
  ],
  faqHeading: "Preguntas frecuentes",
  faq: [
    {
      question: "¿La luna llena de Pascua es la luna llena real?",
      answer:
        "No siempre. La Iglesia usa una luna llena calculada con tablas, que se aproxima a la astronómica y suele diferir de ella en uno o dos días como mucho. Por eso en algunos años la Pascua no cae el domingo que daría la observación del cielo.",
    },
    {
      question: "¿Por qué la Novena de Aguinaldos empieza el 16 de diciembre?",
      answer:
        "Porque son los nueve días anteriores a Navidad: del 16 al 24 de diciembre, de modo que el último día es la Nochebuena. Es una costumbre muy extendida en Colombia, Ecuador y Venezuela.",
    },
  ],
};

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
        <DirectoryGuide guide={guide} />
      </div>
    </main>
  );
}
