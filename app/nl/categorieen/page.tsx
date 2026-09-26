import type { Metadata } from "next";
import Link from "next/link";
import { nederlandsCategoryPages } from "../../converter/localizedNederlandsCategoryPages";

export const metadata: Metadata = { title: "Alle categorieën — Eenheden omrekenen", description: "Bekijk alle categorieën voor het omrekenen van eenheden.", alternates: { canonical: "/nl/categorieen" } };

export default function NederlandsCategoriesPage() {
  return <main className="all-conversions-page" lang="nl"><div className="all-conversions-shell"><nav className="breadcrumbs" aria-label="Kruimelpad"><Link href="/nl">Home</Link><span aria-hidden="true">›</span><span>Categorieën</span></nav><header className="all-conversions-header"><p>Eenheden omrekenen</p><h1>Alle categorieën</h1><p>Kies een categorie voor eenheden, formules en omrekeningstabellen.</p></header><div className="conversion-table-wrap"><table className="conversion-table"><thead><tr><th>Categorie</th><th>Beschrijving</th></tr></thead><tbody>{nederlandsCategoryPages.map((category) => <tr key={category.slug}><td><Link href={`/nl/categorieen/${category.slug}`}>{category.title}</Link></td><td>{category.description}</td></tr>)}</tbody></table></div></div></main>;
}
