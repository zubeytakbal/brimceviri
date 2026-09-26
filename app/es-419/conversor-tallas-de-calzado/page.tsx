import type { Metadata } from "next";
import Link from "next/link";
import ShoeSizeConverter from "../../components/ShoeSizeConverter";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Conversor de tallas de calzado: US, EU, UK",
  description:
    "Convierte las tallas de calzado estadounidenses (US), europeas (EU) y británicas (UK); compara también las tallas de Nike, Adidas, Puma, New Balance y Converse.",
  alternates: {
    canonical: "/es-419/conversor-tallas-de-calzado",
    languages: {
      tr: "/ayakkabi-numarasi-cevirme",
      en: "/en/shoe-size-converter",
      de: "/de/schuhgroessen-umrechner",
      bn: "/bn/shoe-size-converter",
      fr: "/fr/convertisseur-de-pointures",
      es: "/es/conversor-tallas-de-calzado",
      "es-419": "/es-419/conversor-tallas-de-calzado",
      pt: "/pt/conversor-de-calcados",
      "x-default": "/ayakkabi-numarasi-cevirme",
    },
  },
  openGraph: {
    title: "Conversor de tallas de calzado: US, EU, UK",
    description: "Convierte las tallas de calzado estadounidenses, europeas y británicas.",
    url: buildSiteUrl("/es-419/conversor-tallas-de-calzado"),
    siteName: "BirimCeviri.app",
    locale: "es_LA",
    type: "website",
  },
};

export default function Es419ShoeSizePage() {
  return (
    <main className="all-conversions-page" lang="es-419">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Ruta de navegación">
          <Link href="/es-419">Inicio</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Conversor de tallas de calzado</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Conversor de tallas de calzado: US, EU, UK</h1>

          <p>
            Introduce la talla que conoces para ver al instante las
            equivalencias estadounidenses (US), europeas (EU) y británicas
            (UK). Tablas separadas para hombre, mujer, bebé y niño mayor, con
            comparativa de las marcas Nike, Adidas, Puma, New Balance y
            Converse.
          </p>
        </header>

        <ShoeSizeConverter locale="es-419" />

        <section className="category-article-content">
          <h2>¿Por qué varían las tallas de calzado según el país o la marca?</h2>
          <p>
            En América Latina convive el sistema estadounidense (US), muy
            usado por la cercanía comercial con Estados Unidos, con el
            sistema europeo (EU), que también aparece en muchas etiquetas
            importadas. Además, cada marca usa sus propios moldes de
            fabricación, por lo que una misma longitud de pie puede
            corresponder a una talla distinta, o desplazada media talla,
            según la marca.
          </p>
          <p>
            El resultado más fiable suele obtenerse midiendo la longitud
            del pie en centímetros y eligiendo después la opción «Longitud
            del pie» en la herramienta. Esto reduce los errores derivados
            de las diferencias de nomenclatura de tallas entre marcas y
            países.
          </p>
          <p>
            En niños, la numeración US vuelve a empezar después del 13,5;
            por eso las tablas de bebé/niño pequeño y niño mayor están
            separadas, para mantener clara la comparación.
          </p>
        </section>

        <section className="conversion-section related-conversions">
          <h2>Herramientas relacionadas</h2>
          <ul className="related-conversion-list">
            <li>
              <Link href="/es-419/conversor-medidas-de-cocina">Conversor de medidas de cocina</Link>
            </li>
            <li>
              <Link href="/es-419/conversor-de-recetas">Conversor de recetas</Link>
            </li>
            <li>
              <Link href="/es-419/unidades-historicas">Unidades de medida históricas</Link>
            </li>
            <li>
              <Link href="/es-419/categorias/longitud">Conversión de unidades de longitud</Link>
            </li>
          </ul>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>Otros idiomas</h2>
          <Link
            className="text-link"
            href="/ayakkabi-numarasi-cevirme"
            hrefLang="tr"
          >
            Abrir la versión en turco
          </Link>
        </section>
      </div>
    </main>
  );
}
