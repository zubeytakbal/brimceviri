import type { Metadata } from "next";
import Link from "next/link";
import { hindiCategoryPages, hindiUnitPages } from "../../converter/localizedHindiReferencePages";
import { buildFullLanguageAlternates } from "../../i18n/routing";

export const metadata: Metadata = { title: "इकाई मार्गदर्शिकाएँ", description: "लंबाई, द्रव्यमान, आयतन और तापमान की इकाइयाँ और उनके रूपांतरण देखें।", alternates: { canonical: "/hi/unit-guides", ...buildFullLanguageAlternates("/hi/unit-guides") } };
export default function HindiUnitGuidesPage() {
  return <main className="all-conversions-page" lang="hi"><div className="all-conversions-shell"><nav className="breadcrumbs" aria-label="पृष्ठ क्रम"><Link href="/hi">मुख्य पृष्ठ</Link><span aria-hidden="true">›</span><span>इकाई मार्गदर्शिकाएँ</span></nav>
    <header className="all-conversions-header"><h1>इकाई मार्गदर्शिकाएँ</h1><p>इकाइयों के अर्थ और आपस में संबंध पढ़ें।</p></header>
    {hindiCategoryPages.map((category) => <section className="category-article-content" key={category.slug}><h2><Link href={`/hi/categories/${category.slug}`}>{category.title}</Link></h2><ul>{hindiUnitPages.filter((unit) => unit.category === category.category).map((unit) => <li key={unit.slug}><Link href={`/hi/unit-guides/${unit.slug}`}>{unit.name} ({unit.symbol})</Link></li>)}</ul></section>)}
  </div></main>;
}
