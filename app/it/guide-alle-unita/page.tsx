import type { Metadata } from "next";
import LocalizedUnitGuideIndex from "../../components/LocalizedUnitGuideIndex";
import { italianCategoryPages } from "../../converter/localizedItalianCategoryPages";
import { italianUnitPages } from "../../converter/localizedItalianUnitPages";

export const metadata: Metadata = {
  title: "Guide alle unità",
  description:
    "Consulta le guide alle unità disponibili in italiano, organizzate per categoria.",
  alternates: { canonical: "/it/guide-alle-unita" },
};

export default function ItalianUnitGuidesIndexPage() {
  return (
    <LocalizedUnitGuideIndex
      locale="it"
      homeHref="/it"
      homeLabel="Home"
      categoryPrefix="/it/categorie/"
      unitPrefix="/it/guide-alle-unita/"
      units={italianUnitPages}
      categories={italianCategoryPages}
      breadcrumbLabel="Percorso di navigazione"
      title="Guide alle unità"
      description="Ogni guida spiega il simbolo, la definizione e gli usi comuni di un'unità."
      overviewTitle="Comprendere le unità"
      overviewText="Scegli una categoria per confrontare le unità e apri una guida per scoprirne simbolo e contesto d'uso."
      categoryLinkLabel="Vedi le conversioni di questa categoria"
    />
  );
}
