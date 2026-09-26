import type { Metadata } from "next";
import Link from "next/link";
import KitchenMeasuresConverter from "../../components/KitchenMeasuresConverter";
import { kitchenIngredientLabels } from "../../converter/kitchenIngredientLabels";
import { kitchenIngredientRows } from "../../converter/kitchenMeasures";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Conversor de Tazas a Gramos (medidas de cocina)",
  description:
    "Convierte tazas, cucharadas, gramos y mililitros para más de 40 ingredientes: harina, azúcar, arroz, miel, mantequilla y mucho más.",
  alternates: {
    canonical: "/es-419/conversor-medidas-de-cocina",
    languages: {
      tr: "/mutfak-olculeri-cevirici",
      en: "/en/kitchen-measurement-converter",
      de: "/de/kuechenmass-umrechner",
      bn: "/bn/kitchen-measurement-converter",
      fr: "/fr/convertisseur-mesures-cuisine",
      es: "/es/conversor-medidas-de-cocina",
      "es-419": "/es-419/conversor-medidas-de-cocina",
      pt: "/pt/conversor-de-medidas-de-cozinha",
      "x-default": "/mutfak-olculeri-cevirici",
    },
  },
  openGraph: {
    title: "Conversor de Tazas a Gramos (medidas de cocina)",
    description: "Convierte tazas, cucharadas, gramos y mililitros para más de 40 ingredientes.",
    url: buildSiteUrl("/es-419/conversor-medidas-de-cocina"),
    siteName: "BirimCeviri.app",
    locale: "es_LA",
    type: "website",
  },
};

export default function Es419KitchenMeasurementsPage() {
  return (
    <main className="all-conversions-page" lang="es-419">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Ruta de navegación">
          <Link href="/es-419">Inicio</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Conversor de medidas de cocina</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Conversor de medidas de cocina</h1>

          <p>
            Elige el ingrediente y la unidad que conoces para ver al
            instante la equivalencia en tazas, cucharadas, cucharaditas,
            gramos, mililitros y litros. Cada ingrediente tiene una
            densidad distinta, por lo que el cálculo usa valores
            específicos para la harina, el azúcar, el arroz, la miel, la
            mantequilla y muchos otros.
          </p>
        </header>

        <KitchenMeasuresConverter locale="es-419" />

        <section className="category-article-content">
          <h2>¿Cuántos gramos hay en una taza de harina o una cucharada de azúcar?</h2>
          <p>
            No existe una regla única válida para todos los ingredientes,
            porque la taza mide un volumen mientras que el gramo mide una
            masa. Una taza de harina es más ligera que una taza de azúcar,
            y la miel es más pesada que ambas — por eso la conversión
            varía según la densidad del ingrediente.
          </p>
          <p>
            Los valores indicados aquí son promedios prácticos adaptados a
            la cocina cotidiana. El peso final puede variar ligeramente
            según el compactado o la variedad del producto, pero el
            resultado sigue siendo suficientemente fiable para el uso
            domestico.
          </p>

          <h2>Lista de ingredientes habituales (1 taza = 250 ml)</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Gramos aproximados por taza, cucharada y cucharadita</caption>
              <thead>
                <tr>
                  <th scope="col">Ingrediente</th>
                  <th scope="col">1 taza</th>
                  <th scope="col">1 cucharada</th>
                  <th scope="col">1 cucharadita</th>
                </tr>
              </thead>
              <tbody>
                {kitchenIngredientRows.map((row) => (
                  <tr key={row.key}>
                    <td>{kitchenIngredientLabels["es-419"][row.key]}</td>
                    <td>{Math.round((row.gramsPerBardak * 250) / 200)} g</td>
                    <td>{Math.round((row.gramsPerBardak * 250 * 15) / (200 * 200))} g</td>
                    <td>{Math.round((row.gramsPerBardak * 250 * 5) / (200 * 200))} g</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Preguntas frecuentes</h2>
          <p>
            <strong>¿Cuántos mililitros tiene una cucharada?</strong>
            <br />
            Una cucharada equivale a 15 mililitros, es decir, 3
            cucharaditas. La taza usada aquí corresponde a 250 mililitros
            (taza métrica, la más común en las recetas de América Latina).
          </p>
          <p>
            <strong>¿Por qué el peso de una taza varía según el ingrediente?</strong>
            <br />
            Porque el volumen se mantiene constante, pero la densidad
            varía. Un ingrediente ligero como la harina pesa menos que uno
            denso como la miel para el mismo volumen.
          </p>
          <p>
            Para ajustar una receta completa, prueba el{" "}
            <Link href="/es-419/conversor-de-recetas">conversor de recetas</Link>.
          </p>
        </section>

        <section className="conversion-section related-conversions">
          <h2>Herramientas relacionadas</h2>
          <ul className="related-conversion-list">
            <li>
              <Link href="/es-419/conversor-de-recetas">Conversor de recetas</Link>
            </li>
            <li>
              <Link href="/es-419/conversor-tallas-de-calzado">Conversor de tallas de calzado</Link>
            </li>
            <li>
              <Link href="/es-419/unidades-historicas">Unidades de medida históricas</Link>
            </li>
            <li>
              <Link href="/es-419/categorias/masa">Conversión de unidades de masa</Link>
            </li>
          </ul>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>Otros idiomas</h2>
          <Link
            className="text-link"
            href="/mutfak-olculeri-cevirici"
            hrefLang="tr"
          >
            Abrir la versión en turco
          </Link>
        </section>
      </div>
    </main>
  );
}
