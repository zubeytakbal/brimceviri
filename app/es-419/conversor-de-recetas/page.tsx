import type { Metadata } from "next";
import Link from "next/link";
import RecipeScalerConverter from "../../components/RecipeScalerConverter";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Conversor de recetas",
  description:
    "Pega tu receta, elige un multiplicador para aumentarla o reducirla, y obtén al instante las nuevas cantidades — algunos ingredientes también se convierten automáticamente a gramos.",
  alternates: {
    canonical: "/es-419/conversor-de-recetas",
    languages: {
      tr: "/tarif-cevirici",
      en: "/en/recipe-converter",
      de: "/de/rezept-umrechner",
      bn: "/bn/recipe-converter",
      fr: "/fr/convertisseur-de-recettes",
      es: "/es/conversor-de-recetas",
      "es-419": "/es-419/conversor-de-recetas",
      pt: "/pt/conversor-de-receitas",
      "x-default": "/tarif-cevirici",
    },
  },
  openGraph: {
    title: "Conversor de recetas",
    description: "Pega tu receta y obtén al instante las nuevas cantidades.",
    url: buildSiteUrl("/es-419/conversor-de-recetas"),
    siteName: "BirimCeviri.app",
    locale: "es_LA",
    type: "website",
  },
};

export default function Es419RecipeConverterPage() {
  return (
    <main className="all-conversions-page" lang="es-419">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Ruta de navegación">
          <Link href="/es-419">Inicio</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Conversor de recetas</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Conversor de recetas</h1>

          <p>
            Pega tu receta línea por línea, por ejemplo: «2 tazas de
            harina». Una vez elegido el multiplicador, el sitio calcula al
            instante las nuevas cantidades. Si el ingrediente se reconoce y
            está expresado en una unidad como la taza o la cucharada,
            también se muestra un valor aproximado en gramos.
          </p>
        </header>

        <RecipeScalerConverter locale="es-419" />

        <section className="category-article-content">
          <h2>¿Cómo aumentar o reducir una receta?</h2>
          <p>
            El principio es sencillo: multiplicar cada cantidad por el
            mismo factor. Si la receta es para 2 personas y quieres 4, el
            multiplicador es 2. Esta herramienta lo hace automáticamente
            para cada línea que empiece con una cantidad legible (número
            entero, fracción o decimal).
          </p>
          <p>
            También puedes indicar el número de porciones originales y el
            número de porciones deseadas: el multiplicador se calculará
            entonces automáticamente, sin necesidad de calcularlo a mano.
          </p>

          <h2>¿Por qué algunas líneas no muestran gramos?</h2>
          <p>
            La conversión a gramos solo aparece cuando la herramienta
            reconoce a la vez la unidad y el nombre del ingrediente. Una
            línea como «2 huevos» se ajustará correctamente, pero no
            mostrará gramos adicionales porque el huevo no figura en la
            lista de conversión por volumen.
          </p>
          <p>
            Para ver la lista de ingredientes admitidos, abre el{" "}
            <Link href="/es-419/conversor-medidas-de-cocina">
              conversor de medidas de cocina
            </Link>
            .
          </p>
        </section>

        <section className="conversion-section related-conversions">
          <h2>Herramientas relacionadas</h2>
          <ul className="related-conversion-list">
            <li>
              <Link href="/es-419/conversor-medidas-de-cocina">Conversor de medidas de cocina</Link>
            </li>
            <li>
              <Link href="/es-419/conversor-tallas-de-calzado">Conversor de tallas de calzado</Link>
            </li>
            <li>
              <Link href="/es-419/unidades-historicas">Unidades de medida históricas</Link>
            </li>
          </ul>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>Otros idiomas</h2>
          <Link className="text-link" href="/tarif-cevirici" hrefLang="tr">
            Abrir la versión en turco
          </Link>
        </section>
      </div>
    </main>
  );
}
