import type { Metadata } from "next";
import LocalizedUnitGuideIndex from "../../components/LocalizedUnitGuideIndex";
import { es419CategoryPages } from "../../converter/localizedEs419CategoryPages";
import { es419UnitPages } from "../../converter/localizedEs419UnitPages";

export const metadata: Metadata = {
  title: "Guías de unidades",
  description: "Consulta las guías de unidades disponibles en español para Latinoamérica, organizadas por categoría.",
  alternates: { canonical: "/es-419/unit-guides" },
};

export default function Es419UnitGuidesIndexPage() {
  return <LocalizedUnitGuideIndex locale="es-419" homeHref="/es-419" homeLabel="Inicio" categoryPrefix="/es-419/categories/" unitPrefix="/es-419/unit-guides/" units={es419UnitPages} categories={es419CategoryPages} breadcrumbLabel="Ruta de navegación" title="Guías de unidades" description="Cada guía explica el símbolo, la definición y los usos habituales de una unidad." overviewTitle="Comprende las unidades" overviewText="Elige una categoría para comparar unidades y abre una guía para conocer su símbolo y su contexto de uso." categoryLinkLabel="Ver las conversiones de esta categoría" />;
}
