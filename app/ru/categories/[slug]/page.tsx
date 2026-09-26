import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { russianCategoryPages, russianUnitPages } from "../../../converter/localizedRussianReferencePages";
import { russianConversionPages } from "../../../converter/localizedRussianConversionPages";
import { buildFullLanguageAlternates } from "../../../i18n/routing";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return russianCategoryPages.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = russianCategoryPages.find((item) => item.slug === slug);
  if (!page) return { robots: { index: false } };
  const path = `/ru/categories/${slug}`;
  return { title: page.title, description: page.description, alternates: { canonical: path, ...buildFullLanguageAlternates(path) } };
}
export default async function RussianCategoryPage({ params }: Props) {
  const { slug } = await params;
  const page = russianCategoryPages.find((item) => item.slug === slug);
  if (!page) notFound();
  return <main className="all-conversions-page" lang="ru"><div className="all-conversions-shell">
    <nav className="breadcrumbs" aria-label="Навигационная цепочка"><Link href="/ru">Главная</Link><span aria-hidden="true">›</span><Link href="/ru/categories">Категории</Link><span aria-hidden="true">›</span><span>{page.title}</span></nav>
    <header className="all-conversions-header"><h1>{page.title}</h1><p>{page.description}</p></header>
    <section className="category-article-content"><h2>Конвертеры</h2><ul>{russianConversionPages.filter((item) => item.source.category === page.category).map((item) => <li key={item.slug}><Link href={`/ru/${item.slug}`}>{item.fromName} → {item.toName}</Link></li>)}</ul>
    <h2>Справочник единиц</h2><ul>{russianUnitPages.filter((item) => item.category === page.category).map((item) => <li key={item.slug}><Link href={`/ru/unit-guides/${item.slug}`}>{item.name} ({item.symbol})</Link></li>)}</ul></section>
  </div></main>;
}
