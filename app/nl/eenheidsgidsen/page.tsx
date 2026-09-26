import type { Metadata } from "next";
import LocalizedUnitGuideIndex from "../../components/LocalizedUnitGuideIndex";
import { nederlandsCategoryPages } from "../../converter/localizedNederlandsCategoryPages";
import { nederlandsUnitPages } from "../../converter/localizedNederlandsUnitPages";

export const metadata: Metadata = { title: "Eenhedengidsen", description: "Lees over symbolen, definities en toepassingen van eenheden.", alternates: { canonical: "/nl/eenheidsgidsen" } };

export default function NederlandsUnitGuidesIndexPage() {
  return <LocalizedUnitGuideIndex locale="nl" homeHref="/nl" homeLabel="Home" categoryPrefix="/nl/categorieen/" unitPrefix="/nl/eenheidsgidsen/" units={nederlandsUnitPages} categories={nederlandsCategoryPages} breadcrumbLabel="Kruimelpad" title="Eenhedengidsen" description="Elke gids legt het symbool, de definitie en de gebruikelijke toepassingen van een eenheid uit." overviewTitle="Eenheden begrijpen" overviewText="Kies een categorie om eenheden te vergelijken en open een gids voor meer uitleg." categoryLinkLabel="Bekijk omrekeningen in deze categorie" />;
}
