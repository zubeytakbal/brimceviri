import type { Metadata } from "next";
import Link from "next/link";
import ShoeSizeConverter from "../../components/ShoeSizeConverter";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Conversor de tallas de calzado: US, EU, UK",
  description:
    "Convierte las tallas de calzado estadounidenses (US), europeas (EU) y britanicas (UK); compara tambien las tallas de Nike, Adidas, Puma, New Balance y Converse.",
  alternates: {
    canonical: "/es-419/shoe-size-converter",
    languages: {
      tr: "/ayakkabi-numarasi-cevirme",
      en: "/en/shoe-size-converter",
      de: "/de/schuhgroessen-umrechner",
      bn: "/bn/shoe-size-converter",
      fr: "/fr/shoe-size-converter",
      es: "/es/shoe-size-converter",
      "es-419": "/es-419/shoe-size-converter",
      "x-default": "/ayakkabi-numarasi-cevirme",
    },
  },
  openGraph: {
    title: "Conversor de tallas de calzado: US, EU, UK",
    description: "Convierte las tallas de calzado estadounidenses, europeas y britanicas.",
    url: buildSiteUrl("/es-419/shoe-size-converter"),
    siteName: "BirimCeviri.app",
    locale: "es_LA",
    type: "website",
  },
};

export default function Es419ShoeSizePage() {
  return (
    <main className="all-conversions-page" lang="es-419">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Ruta de navegacion">
          <Link href="/es-419">Inicio</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Conversor de tallas de calzado</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Conversor de tallas de calzado: US, EU, UK</h1>

          <p>
            Introduce la talla que conoces para ver al instante las
            equivalencias estadounidenses (US), europeas (EU) y britanicas
            (UK). Tablas separadas para hombre, mujer, bebe y nino mayor, con
            comparativa de las marcas Nike, Adidas, Puma, New Balance y
            Converse.
          </p>
        </header>

        <ShoeSizeConverter locale="es-419" />

        <section className="category-article-content">
          <h2>¿Por que varian las tallas de calzado segun el pais o la marca?</h2>
          <p>
            En America Latina convive el sistema estadounidense (US), muy
            usado por la cercania comercial con Estados Unidos, con el
            sistema europeo (EU), que tambien aparece en muchas etiquetas
            importadas. Ademas, cada marca usa sus propios moldes de
            fabricacion, por lo que una misma longitud de pie puede
            corresponder a una talla distinta, o desplazada media talla,
            segun la marca.
          </p>
          <p>
            El resultado mas fiable suele obtenerse midiendo la longitud
            del pie en centimetros y eligiendo despues la opcion "Longitud
            del pie" en la herramienta. Esto reduce los errores derivados
            de las diferencias de nomenclatura de tallas entre marcas y
            paises.
          </p>
          <p>
            En ninos, la numeracion US vuelve a empezar despues del 13,5;
            por eso las tablas de bebe/nino pequeno y nino mayor estan
            separadas, para mantener clara la comparacion.
          </p>
        </section>

        <section className="conversion-section related-conversions">
          <h2>Herramientas relacionadas</h2>
          <ul className="related-conversion-list">
            <li>
              <Link href="/es-419/kitchen-measurement-converter">Conversor de medidas de cocina</Link>
            </li>
            <li>
              <Link href="/es-419/recipe-converter">Conversor de recetas</Link>
            </li>
            <li>
              <Link href="/es-419/historical-units">Unidades de medida historicas</Link>
            </li>
            <li>
              <Link href="/es-419/categories/longitud">Conversion de unidades de longitud</Link>
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
            Türkçe versiyonu aç
          </Link>
        </section>
      </div>
    </main>
  );
}
