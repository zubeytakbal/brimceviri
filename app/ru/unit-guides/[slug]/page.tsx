import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { russianCategoryPages, russianUnitPages } from "../../../converter/localizedRussianReferencePages";
import { russianConversionPages } from "../../../converter/localizedRussianConversionPages";
import { buildFullLanguageAlternates } from "../../../i18n/routing";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return russianUnitPages.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const unit = russianUnitPages.find((item) => item.slug === slug);
  if (!unit) return { robots: { index: false } };
  const path = `/ru/unit-guides/${slug}`;
  return { title: `${unit.name} (${unit.symbol}) — что это?`, description: unit.description, alternates: { canonical: path, ...buildFullLanguageAlternates(path) } };
}
export default async function RussianUnitPage({ params }: Props) {
  const { slug } = await params;
  const unit = russianUnitPages.find((item) => item.slug === slug);
  if (!unit) notFound();
  const category = russianCategoryPages.find((item) => item.category === unit.category)!;
  const conversions = russianConversionPages.filter((item) => item.source.category === unit.category && (item.source.fromUnit === unit.unit || item.source.toUnit === unit.unit));
  return <main className="all-conversions-page" lang="ru"><div className="all-conversions-shell"><nav className="breadcrumbs" aria-label="Навигационная цепочка"><Link href="/ru">Главная</Link><span aria-hidden="true">›</span><Link href="/ru/unit-guides">Единицы</Link><span aria-hidden="true">›</span><span>{unit.name}</span></nav>
    <header className="all-conversions-header"><h1>{unit.name} ({unit.symbol})</h1><p>{unit.description}</p></header>
    <section className="category-article-content"><h2>{unit.name}: конвертеры</h2><ul>{conversions.map((item) => <li key={item.slug}><Link href={`/ru/${item.slug}`}>{item.fromName} → {item.toName}</Link></li>)}</ul><p><Link href={`/ru/categories/${category.slug}`}>{category.title}</Link></p></section>
  </div></main>;
}
