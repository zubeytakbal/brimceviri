import type { Metadata } from "next";
import LocalizedUnitGuideIndex from "../../components/LocalizedUnitGuideIndex";
import { spanishCategoryPages } from "../../converter/localizedSpanishCategoryPages";
import { spanishUnitPages } from "../../converter/localizedSpanishUnitPages";

export const metadata: Metadata = {
  title: "Guías de unidades",
  description: "Consulta las guías de unidades disponibles en español, organizadas por categoría de conversión.",
  alternates: { canonical: "/es/guias-de-unidades" },
};

export default function SpanishUnitGuidesIndexPage() {
  return <LocalizedUnitGuideIndex locale="es" homeHref="/es" homeLabel="Inicio" categoryPrefix="/es/categorias/" unitPrefix="/es/guias-de-unidades/" units={spanishUnitPages} categories={spanishCategoryPages} breadcrumbLabel="Ruta de navegación" title="Guías de unidades" description="Cada guía explica el símbolo, la definición y los usos habituales de una unidad." overviewTitle="Comprende las unidades" overviewText="Elige una categoría para comparar unidades y abre una guía para conocer su símbolo y su contexto de uso." categoryLinkLabel="Ver las conversiones de esta categoría" />;
}
