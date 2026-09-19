import Link from "next/link";
import CategoryUnitConverter from "../../components/CategoryUnitConverter";
import StaticPageLayout from "../../components/StaticPageLayout";
import { buildSiteUrl } from "../../siteConfig";

export const metadata = {
  title: "Unidades de medida historicas",
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
      "x-default": "/tarihi-olcu-birimleri",
    },
  },
  openGraph: {
    title: "Unidades de medida historicas",
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
    note: "Extension del pie griego antiguo, usada hasta 1453.",
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
    note: "Unidad de masa basica de la tradicion bizantina, influida por la libra romana.",
  },
  {
    href: "/birimler/bizans-onsu",
    name: "Ounkia bizantina (ounkia)",
    value: "= 1/12 litra ≈ 27 g",
    note: "Distinta de la onza moderna de los sistemas britanico y estadounidense.",
  },
];

const ottomanUnits = [
  {
    href: "/birimler/arsin",
    name: "Arşın",
    value: "≈ 0,68 m",
    note: "Tenia varios usos: el arşın de mercado, el mas conocido, y el arşın de construccion, usado para longitudes mayores.",
  },
  {
    href: "/birimler/endaze",
    name: "Endaze",
    value: "= 0,65 m",
    note: "Usada especialmente para medir tela y textiles, asi como en el comercio relacionado.",
  },
  {
    href: "/birimler/okka",
    name: "Okka otomana (Okka)",
    value: "= 400 dirhem ≈ 1282,945 g",
    note: "Una de las unidades de peso mas conocidas de los mercados otomanos tradicionales.",
  },
  {
    href: "/birimler/dirhem",
    name: "Dirhem",
    value: "= 1/400 okka ≈ 3,207 g",
    note: "Usada para cantidades pequenas, como metales preciosos, especias y algunos cosmeticos.",
  },
];

const oldTurkicUnits = [
  {
    href: "/birimler/cig",
    name: "Çığ",
    value: "≈ 0,333 m",
    note: "Una antigua unidad de longitud turca, encontrada en fuentes linguisticas e historicas antiguas.",
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
      breadcrumbAriaLabel="Ruta de navegacion"
      breadcrumbs={[
        { href: "/es", label: "Inicio" },
        { label: "Unidades de medida historicas" },
      ]}
      title="Unidades de medida historicas"
      description="Descubre las unidades de medida bizantinas, otomanas y turcas antiguas con sus equivalentes modernos en metros y gramos, y convierte directamente con dos herramientas practicas."
      alternateLink={{
        href: "/tarihi-olcu-birimleri",
        hrefLang: "tr",
        label: "Türkçe versiyonu aç",
      }}
      sections={[
        {
          heading: "Breve contexto historico",
          content: (
            <>
              <p>
                La historia de la medicion en Anatolia y esta region no
                comenzo con el sistema metrico moderno; atraveso varias
                capas de sistemas bizantino y despues otomano, pasando por
                medidas turcas aun mas antiguas.
              </p>
              <p>
                Por eso nombres como arşın, okka y dirhem todavia aparecen
                hoy en documentos antiguos, asi como en algunos libros e
                investigaciones historicas.
              </p>
            </>
          ),
        },
        {
          heading: "Conversor de unidades de longitud historicas",
          content: (
            <>
              <p>
                Convierte directamente entre arşın, endaze, pie bizantino,
                braza bizantina y çığ, con el equivalente moderno en
                metros. Para ver todas las unidades de longitud modernas,
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
          heading: "Conversor de unidades de masa historicas",
          content: (
            <>
              <p>
                Convierte entre la okka otomana, el dirhem, la litra
                bizantina y la ounkia bizantina, usando el gramo moderno
                como referencia. Para unidades modernas como el kilogramo y
                la tonelada, abre la{" "}
                <Link href="/es/categories/masa">biblioteca completa de masas</Link>.
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
          heading: "Unidades de la epoca bizantina",
          content: (
            <>
              <p>
                Bizancio heredo gran parte de la tradicion de medicion
                griega y romana, y creo unidades de longitud y masa
                practicas que se mantuvieron en uso en el comercio y la
                construccion durante siglos.
              </p>
              <UnitList units={byzantineUnits} />
            </>
          ),
        },
        {
          heading: "Unidades de la epoca otomana",
          content: (
            <>
              <p>
                Antes de que el Estado otomano pasara completamente al
                sistema metrico en el siglo XX, unidades como el arşın, el
                endaze, la okka y el dirhem se usaban en el comercio, la
                construccion y la vida cotidiana.
              </p>
              <UnitList units={ottomanUnits} />
            </>
          ),
        },
        {
          heading: "Unidades turcas aun mas antiguas",
          content: (
            <>
              <p>
                Algunas unidades antiguas siguen siendo conocidas gracias a
                fuentes linguisticas e historicas, y son importantes para
                entender escritos antiguos y relacionarlos con las medidas
                modernas.
              </p>
              <UnitList units={oldTurkicUnits} />
            </>
          ),
        },
        {
          heading: "¿Por que siguen siendo importantes estas unidades hoy?",
          content: (
            <>
              <p>
                Estos nombres todavia aparecen hoy en actas de waqf,
                antiguos registros, investigacion historica y trabajos de
                traduccion; convertirlos a metros o gramos ayuda a
                entenderlos rapidamente.
              </p>
              <p>
                Esta pagina tambien es util para estudiantes, creadores de
                contenido y cualquier persona que quiera leer cifras
                historicas segun referencias modernas claras.
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
