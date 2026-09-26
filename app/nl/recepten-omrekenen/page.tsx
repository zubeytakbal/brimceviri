import type { Metadata } from "next";
import Link from "next/link";
import RecipeScalerConverter from "../../components/RecipeScalerConverter";

export const metadata: Metadata = { title: "Recept omrekenen", description: "Pas de hoeveelheden in een recept aan voor het gewenste aantal porties.", alternates: { canonical: "/nl/recepten-omrekenen" } };
export default function NederlandsRecipeConverterPage() { return <main className="calculator-page" lang="nl"><div className="calculator-shell"><nav className="breadcrumbs" aria-label="Kruimelpad"><Link href="/nl">Home</Link><span aria-hidden="true">›</span><span>Recept omrekenen</span></nav><header className="calculator-hero"><p>Recepten</p><h1>Recept omrekenen</h1><p>Plak een recept, kies een vermenigvuldiger en krijg direct de aangepaste hoeveelheden.</p></header><RecipeScalerConverter locale="nl" /></div></main>; }
