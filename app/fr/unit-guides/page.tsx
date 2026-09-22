import type { Metadata } from "next";
import LocalizedUnitGuideIndex from "../../components/LocalizedUnitGuideIndex";
import { frenchCategoryPages } from "../../converter/localizedFrenchCategoryPages";
import { frenchUnitPages } from "../../converter/localizedFrenchUnitPages";

export const metadata: Metadata = {
  title: "Guides des unités",
  description: "Parcourez les guides d'unités disponibles en français, classés par catégorie de conversion.",
  alternates: { canonical: "/fr/unit-guides" },
};

export default function FrenchUnitGuidesIndexPage() {
  return <LocalizedUnitGuideIndex locale="fr" homeHref="/fr" homeLabel="Accueil" categoryPrefix="/fr/categories/" unitPrefix="/fr/unit-guides/" units={frenchUnitPages} categories={frenchCategoryPages} breadcrumbLabel="Fil d’Ariane" title="Guides des unités" description="Chaque guide explique le symbole, la définition et les usages courants d’une unité." overviewTitle="Comprendre les unités" overviewText="Choisissez une catégorie pour comparer les unités, puis ouvrez un guide pour connaître son symbole et son contexte d’utilisation." categoryLinkLabel="Voir les conversions de cette catégorie" />;
}
