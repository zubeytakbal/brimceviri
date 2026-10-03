import type { Metadata } from "next";
import GoldPurityCalculator from "../../components/GoldPurityCalculator";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { alloy, GOLD_GRADES, pureGold } from "../../converter/goldPurity";
import { GOLD_CALCULATOR_PATHS, goldCalculatorAlternates } from "../../i18n/goldCalculatorPaths";
import { buildSiteUrl } from "../../siteConfig";

const path = GOLD_CALCULATOR_PATHS.es;
const title = "Calculadora de oro: quilates, ley 750 y oro puro";
const description =
  "¿Cuánto oro puro tiene el oro de 18, 14 o 10 quilates? Quilates y ley (750, 585, 417), cómo pasar de 14 a 18 quilates y valor de fundición con el precio que tú indiques.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, languages: goldCalculatorAlternates() },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "es_ES", type: "website" },
};

const f = (n: number, d = 2) => n.toLocaleString("es-ES", { maximumFractionDigits: d });
const up = alloy(10, 14 / 24, 18 / 24);
const add = up && up.direction === "up" ? up.addPureGold : 0;

const faqItems: FaqItem[] = [
  {
    question: "¿Cuánto oro puro tiene el oro de 18 quilates?",
    answer: `El 75 %: 18 partes de oro puro de 24. Una pieza de 10 g de oro de 18 quilates (ley 750) contiene ${f(pureGold(10, 0.75), 2)} g de oro puro.`,
  },
  {
    question: "¿Qué significa 750 en el oro?",
    answer: `Es la ley: partes de oro puro por cada 1000. ${GOLD_GRADES.filter((g) => [375, 585, 750, 916, 999].includes(g.hallmark))
      .map((g) => `${g.hallmark} = ${g.karat} quilates`)
      .join(", ")}.`,
  },
  {
    question: "¿Cómo se pasa oro de 14 quilates a 18 quilates?",
    answer: `Añadiendo oro puro: para convertir 10 g de oro de 14 quilates en 18 quilates hay que agregar ${f(add, 2)} g de oro de 24 quilates.`,
  },
  {
    question: "¿Cómo calculo el valor de mi oro?",
    answer: "Peso × pureza × precio del gramo de oro puro. Escribe tú el precio actual; los compradores pagan menos que el valor de fundición.",
  },
];

export default function CalculadoraOroPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/es", label: "Inicio" },
        { href: "/es/categorias/quilate-de-oro", label: "Quilate de oro" },
        { href: path, label: "Calculadora de oro" },
      ]}
      crumbLabel="Ruta de navegación"
      title="Calculadora de oro: quilates y oro puro"
      intro="Escribe el peso y los quilates de tu oro: verás cuánto oro puro contiene, la misma cantidad de oro en otros quilates, cuánto oro puro o aleación añadir para cambiar de quilates y el valor de fundición al precio que indiques."
      tool={<GoldPurityCalculator lang="es" defaultBasis="karat" defaultKarat={18} defaultTarget={14} />}
      related={{
        title: "Más conversiones de oro",
        links: [
          { href: "/es/oro-14-quilates-oro-18-quilates", label: "Oro de 14 a 18 quilates" },
          { href: "/es/categorias/quilate-de-oro", label: "Todas las conversiones de quilates" },
        ],
      }}
      tocTitle="Contenido"
      tocItems={[
        { id: "tabla", label: "Tabla de quilates y ley" },
        { id: "faq", label: "Preguntas frecuentes" },
      ]}
      faqTitle="Preguntas frecuentes"
      faqItems={faqItems}
    >
      <h2 id="tabla">Tabla de quilates y ley</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Quilates</th>
              <th scope="col">Ley</th>
              <th scope="col">Oro puro</th>
              <th scope="col">Oro puro en 10 g</th>
            </tr>
          </thead>
          <tbody>
            {GOLD_GRADES.map((g) => (
              <tr key={g.karat}>
                <td>{g.karat} k</td>
                <td>{g.hallmark}</td>
                <td>{f((g.karat / 24) * 100, 1)} %</td>
                <td>{f(pureGold(10, g.karat / 24), 2)} g</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Los quilates del oro miden pureza, no peso: el oro puro tiene 24 quilates. La ley expresa la misma pureza en milésimas (18 quilates = 750).
        En joyería de España y Latinoamérica lo más habitual es el oro de 18 quilates. No guardamos ningún precio del oro: para el valor de
        fundición escribe tú el precio actual.
      </p>
    </TimeToolPage>
  );
}
