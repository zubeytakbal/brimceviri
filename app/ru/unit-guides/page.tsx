import type { Metadata } from "next";
import Link from "next/link";
import { russianCategoryPages, russianUnitPages } from "../../converter/localizedRussianReferencePages";
import { buildFullLanguageAlternates } from "../../i18n/routing";

export const metadata: Metadata = { title: "Справочник единиц", description: "लंबाई, द्रव्यमान, आयतन और तापमान की Единицы और उन — конвертеры देखें।", alternates: { canonical: "/ru/unit-guides", ...buildFullLanguageAlternates("/ru/unit-guides") } };
export default function RussianUnitGuidesPage() {
  return <main className="all-conversions-page" lang="ru"><div className="all-conversions-shell"><nav className="breadcrumbs" aria-label="Навигационная цепочка"><Link href="/ru">Главная</Link><span aria-hidden="true">›</span><span>Справочник единиц</span></nav>
    <header className="all-conversions-header"><h1>Справочник единиц</h1><p>Узнайте значения единиц и их соотношения.</p></header>
    {russianCategoryPages.map((category) => <section className="category-article-content" key={category.slug}><h2><Link href={`/ru/categories/${category.slug}`}>{category.title}</Link></h2><ul>{russianUnitPages.filter((unit) => unit.category === category.category).map((unit) => <li key={unit.slug}><Link href={`/ru/unit-guides/${unit.slug}`}>{unit.name} ({unit.symbol})</Link></li>)}</ul></section>)}
  </div></main>;
}
