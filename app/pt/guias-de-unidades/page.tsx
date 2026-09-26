import type { Metadata } from "next";
import LocalizedUnitGuideIndex from "../../components/LocalizedUnitGuideIndex";
import { portugueseCategoryPages } from "../../converter/localizedPortugueseCategoryPages";
import { portugueseUnitPages } from "../../converter/localizedPortugueseUnitPages";

export const metadata: Metadata = {
  title: "Guias de unidades",
  description: "Consulte os guias de unidades disponíveis em português, organizados por categoria de conversão.",
  alternates: { canonical: "/pt/guias-de-unidades" },
};

export default function PortugueseUnitGuidesIndexPage() {
  return <LocalizedUnitGuideIndex locale="pt-BR" homeHref="/pt" homeLabel="Início" categoryPrefix="/pt/categorias/" unitPrefix="/pt/guias-de-unidades/" units={portugueseUnitPages} categories={portugueseCategoryPages} breadcrumbLabel="Trilha de navegação" title="Guias de unidades" description="Cada guia explica o símbolo, a definição e os usos comuns de uma unidade." overviewTitle="Entenda as unidades" overviewText="Escolha uma categoria para comparar unidades e abra um guia para conhecer seu símbolo e contexto de uso." categoryLinkLabel="Ver as conversões desta categoria" />;
}
