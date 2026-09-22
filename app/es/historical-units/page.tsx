import Link from "next/link";
import CategoryUnitConverter from "../../components/CategoryUnitConverter";
import StaticPageLayout from "../../components/StaticPageLayout";
import { buildSiteUrl } from "../../siteConfig";

export const metadata = {
  title: "Unidades de medida históricas",
  description:
    "Descubre las unidades de medida bizantinas, otomanas y turcas antiguas, y convierte a metros y gramos con breves explicaciones.",
  alternates: {
    canonical: "/es/historical-units",
    languages: {
      tr: "/tarihi-olcu-birimleri",
      en: "/en/historical-units",
      de: "/de/historische-masseinheiten",
      bn: "/bn/historical-units",
      fr: "/fr/historical-units",
      es: "/es/historical-units",
      "es-419": "/es-419/historical-units",
      pt: "/pt/historical-units",
      "x-default": "/tarihi-olcu-birimleri",
    },
  },
  openGraph: {
    title: "Unidades de medida históricas",
    description: "Descubre las unidades de medida bizantinas, otomanas y turcas antiguas.",
    url: buildSiteUrl("/es/historical-units"),
    siteName: "BirimCeviri.app",
    locale: "es_ES",
    type: "website",
  },
};

const historicalLengthUnitOptions = [
  { value: "m", label: "Metro (m)", symbol: "m" },
  { value: "arşın", label: "Arşın", symbol: "arşın" },
  { value: "endaze", label: "Endaze", symbol: "endaze" },
  { value: "pus", label: "Pie bizantino (Pous)", symbol: "pus" },
  { value: "orgyia", label: "Braza bizantina (Orgyia)", symbol: "orgyia" },
  { value: "çığ", label: "Çığ", symbol: "çığ" },
];

const historicalMassUnitOptions = [
  { value: "g", label: "Gramo (g)", symbol: "g" },
  { value: "okka", label: "Okka otomana", symbol: "okka" },
  { value: "dirhem", label: "Dirhem", symbol: "dirhem" },
  { value: "litra", label: "Litra bizantina", symbol: "litra" },
  { value: "ounkia", label: "Ounkia bizantina", symbol: "ounkia" },
];

const byzantineUnits = [
  {
    href: "/birimler/bizans-ayagi",
    name: "Pie bizantino (pous)",
    value: "≈ 0,3148 m",
    note: "Extensión del pie griego antiguo, usada en el ámbito bizantino hasta 1453.",
  },
  {
    href: "/birimler/bizans-kulaci",
    name: "Braza bizantina (orgyia)",
    value: "= 6 pous ≈ 1,8888 m",
    note: "Distancia entre las puntas de los dedos con los brazos completamente extendidos.",
  },
  {
    href: "/birimler/bizans-litrasi",
    name: "Litra bizantina (litra)",
    value: "≈ 324 g",
    note: "Unidad básica de masa de tradición bizantina, influida por la libra romana.",
  },
  {
    href: "/birimler/bizans-onsu",
    name: "Ounkia bizantina (ounkia)",
    value: "= 1/12 litra ≈ 27 g",
    note: "Distinta de la onza moderna de los sistemas británico y estadounidense.",
  },
];

const ottomanUnits = [
  {
    href: "/birimler/arsin",
    name: "Arşın",
    value: "≈ 0,68 m",
    note: "Tenía varios usos, entre ellos el arşın de mercado y el de construcción; sus valores podían variar según el contexto.",
  },
  {
    href: "/birimler/endaze",
    name: "Endaze",
    value: "= 0,65 m",
    note: "Usada especialmente para medir telas y textiles en el comercio.",
  },
  {
    href: "/birimler/okka",
    name: "Okka otomana (Okka)",
    value: "= 400 dirhem ≈ 1282,945 g",
    note: "Una de las unidades de masa más conocidas de los mercados otomanos tradicionales.",
  },
  {
    href: "/birimler/dirhem",
    name: "Dirhem",
    value: "= 1/400 okka ≈ 3,207 g",
    note: "Usada para cantidades pequeñas, como metales preciosos, especias y algunos cosméticos.",
  },
];

const oldTurkicUnits = [
  {
    href: "/birimler/cig",
    name: "Çığ",
    value: "≈ 0,333 m",
    note: "Antigua unidad de longitud turca documentada en fuentes lingüísticas e históricas.",
  },
];

function UnitList({
  units,
}: {
  units: Array<{
    href: string;
    name: string;
    value: string;
    note: string;
  }>;
}) {
  return (
    <ul className="calculator-example-list">
      {units.map((unit) => (
        <li key={unit.href}>
          <article>
            <h3>
              <Link href={unit.href}>{unit.name}</Link>
            </h3>
            <p>
              <strong>{unit.value}</strong> {" - "} {unit.note}
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
}

export default function SpanishHistoricalUnitsPage() {
  return (
    <StaticPageLayout
      locale="es"
      breadcrumbAriaLabel="Ruta de navegación"
      breadcrumbs={[
        { href: "/es", label: "Inicio" },
        { label: "Unidades de medida históricas" },
      ]}
      title="Unidades de medida históricas"
      description="Descubre unidades de medida bizantinas, otomanas y turcas antiguas con equivalentes modernos en metros y gramos, y conviértelas con dos herramientas prácticas."
      alternateLink={{
        href: "/tarihi-olcu-birimleri",
        hrefLang: "tr",
        label: "Abrir la versión en turco",
      }}
      sections={[
        {
          heading: "Breve contexto histórico",
          content: (
            <>
              <p>
                La historia de la medición en Anatolia y su entorno no
                comenzó con el sistema métrico moderno. Reunió tradiciones
                bizantinas, otomanas y turcas anteriores, cuyos valores
                podían variar según la época y el lugar.
              </p>
              <p>
                Por eso nombres como arşın, okka y dirhem todavía aparecen
                en documentos, libros e investigaciones históricas.
              </p>
            </>
          ),
        },
        {
          heading: "Conversor de unidades de longitud históricas",
          content: (
            <>
              <p>
                Convierte directamente entre arşın, endaze, pie bizantino,
                braza bizantina y çığ, con un equivalente moderno en
                metros. Para consultar las unidades de longitud modernas,
                abre la{" "}
                <Link href="/es/categories/longitud">biblioteca completa de longitudes</Link>.
              </p>
              <CategoryUnitConverter
                category="uzunluk"
                locale="es"
                unitOptions={historicalLengthUnitOptions}
              />
            </>
          ),
        },
        {
          heading: "Conversor de unidades de masa históricas",
          content: (
            <>
              <p>
                Convierte entre la okka otomana, el dirhem, la litra
                bizantina y la ounkia bizantina, usando el gramo moderno
                como referencia. Para unidades modernas como el kilogramo y
                la tonelada, consulta la{" "}
                <Link href="/es/categories/masa">guía completa de unidades de masa</Link>.
              </p>
              <CategoryUnitConverter
                category="kutle"
                locale="es"
                unitOptions={historicalMassUnitOptions}
              />
            </>
          ),
        },
        {
          heading: "Unidades de época bizantina",
          content: (
            <>
              <p>
                Bizancio heredó tradiciones de medición griegas y romanas,
                adaptadas para el comercio y la construcción durante siglos.
              </p>
              <UnitList units={byzantineUnits} />
            </>
          ),
        },
        {
          heading: "Unidades de época otomana",
          content: (
            <>
              <p>
                Antes de la adopción completa del sistema métrico en el
                siglo XX, unidades como arşın, endaze, okka y dirhem se
                usaban en comercio, construcción y vida cotidiana.
              </p>
              <UnitList units={ottomanUnits} />
            </>
          ),
        },
        {
          heading: "Unidades turcas aún más antiguas",
          content: (
            <>
              <p>
                Algunas unidades se conocen por fuentes lingüísticas e
                históricas. Ayudan a interpretar escritos antiguos en
                relación con medidas modernas.
              </p>
              <UnitList units={oldTurkicUnits} />
            </>
          ),
        },
        {
          heading: "¿Por qué siguen siendo importantes estas unidades hoy?",
          content: (
            <>
              <p>
                Estos nombres aparecen en documentos de fundaciones pías
                (waqf), registros antiguos, investigación histórica y
                traducciones. Convertirlos a metros o gramos ayuda a
                interpretarlos con rapidez.
              </p>
              <p>
                La página es útil para estudiantes, creadores de contenido
                y cualquier persona que quiera interpretar cifras históricas
                con referencias modernas claras.
              </p>
            </>
          ),
        },
        {
          heading: "Herramientas relacionadas",
          content: (
            <ul className="related-conversion-list">
              <li>
                <Link href="/es/kitchen-measurement-converter">Conversor de medidas de cocina</Link>
              </li>
              <li>
                <Link href="/es/recipe-converter">Conversor de recetas</Link>
              </li>
              <li>
                <Link href="/es/shoe-size-converter">Conversor de tallas de calzado</Link>
              </li>
            </ul>
          ),
        },
      ]}
    />
  );
}
