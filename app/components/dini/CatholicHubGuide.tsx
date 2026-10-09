import { westernEaster } from "../../converter/christian/christianCalc";
import { addDaysYmd } from "../../converter/time/dateMath";

// Contenido de referencia para los hubs católicos (es/pt): fechas de Pascua calculadas
// con el cómputo gregoriano, reparto de los misterios del Rosario y colores litúrgicos.

type Lang = "es" | "pt";

const C = {
  es: {
    h1: "Fechas de Pascua de los próximos años",
    head: ["Año", "Miércoles de Ceniza", "Domingo de Pascua", "Pentecostés"],
    note: "La Pascua cae el domingo siguiente a la primera luna llena eclesiástica a partir del 21 de marzo, por eso oscila entre el 22 de marzo y el 25 de abril. El Miércoles de Ceniza es 46 días antes y Pentecostés 49 días después.",
    h2: "Misterios del Rosario por día",
    days: [
      ["Lunes y sábado", "Gozosos"],
      ["Martes y viernes", "Dolorosos"],
      ["Miércoles y domingo", "Gloriosos"],
      ["Jueves", "Luminosos"],
    ],
    h3: "Colores litúrgicos",
    colors: "Verde en el Tiempo Ordinario; morado en Adviento y Cuaresma; blanco en Navidad, Pascua y fiestas del Señor y de la Virgen; rojo en Pentecostés, Domingo de Ramos y fiestas de mártires. El rosa puede usarse en los domingos Gaudete y Laetare.",
    locale: "es-ES",
  },
  pt: {
    h1: "Datas da Páscoa nos próximos anos",
    head: ["Ano", "Quarta-feira de Cinzas", "Domingo de Páscoa", "Pentecostes"],
    note: "A Páscoa cai no domingo seguinte à primeira lua cheia eclesiástica a partir de 21 de março, por isso varia entre 22 de março e 25 de abril. A Quarta-feira de Cinzas é 46 dias antes e o Pentecostes 49 dias depois.",
    h2: "Mistérios do Rosário por dia",
    days: [
      ["Segunda-feira e sábado", "Gozosos"],
      ["Terça-feira e sexta-feira", "Dolorosos"],
      ["Quarta-feira e domingo", "Gloriosos"],
      ["Quinta-feira", "Luminosos"],
    ],
    h3: "Cores litúrgicas",
    colors: "Verde no Tempo Comum; roxo no Advento e na Quaresma; branco no Natal, na Páscoa e nas festas do Senhor e de Nossa Senhora; vermelho no Pentecostes, no Domingo de Ramos e nas festas dos mártires. O rosa pode ser usado nos domingos Gaudete e Laetare.",
    locale: "pt-PT",
  },
} as const;

export default function CatholicHubGuide({ lang, fromYear }: { lang: Lang; fromYear: number }) {
  const t = C[lang];
  const fmt = (d: { year: number; month: number; day: number }) =>
    new Intl.DateTimeFormat(t.locale, { day: "numeric", month: "long", timeZone: "UTC" }).format(new Date(Date.UTC(d.year, d.month - 1, d.day)));
  const rows = Array.from({ length: 6 }, (_, i) => fromYear + i)
    .map((y) => ({ y, e: westernEaster(y) }))
    .filter((r): r is { y: number; e: NonNullable<typeof r.e> } => r.e !== null);
  return (
    <section className="category-article-content">
      <h2>{t.h1}</h2>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              {t.head.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ y, e }) => (
              <tr key={y}>
                <td>{y}</td>
                <td>{fmt(addDaysYmd(e, -46))}</td>
                <td>{fmt(e)}</td>
                <td>{fmt(addDaysYmd(e, 49))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>{t.note}</p>
      <h2>{t.h2}</h2>
      <ul>
        {t.days.map(([d, m]) => (
          <li key={d}>
            <strong>{d}:</strong> {m}
          </li>
        ))}
      </ul>
      <h2>{t.h3}</h2>
      <p>{t.colors}</p>
    </section>
  );
}
