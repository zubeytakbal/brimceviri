import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hindiCategoryPages, hindiUnitPages } from "../../../converter/localizedHindiReferencePages";
import { hindiConversionPages } from "../../../converter/localizedHindiConversionPages";
import { buildFullLanguageAlternates } from "../../../i18n/routing";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return hindiUnitPages.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const unit = hindiUnitPages.find((item) => item.slug === slug);
  if (!unit) return { robots: { index: false } };
  const path = `/hi/unit-guides/${slug}`;
  return { title: `${unit.name} (${unit.symbol}) क्या है?`, description: unit.description, alternates: { canonical: path, ...buildFullLanguageAlternates(path) } };
}
export default async function HindiUnitPage({ params }: Props) {
  const { slug } = await params;
  const unit = hindiUnitPages.find((item) => item.slug === slug);
  if (!unit) notFound();
  const category = hindiCategoryPages.find((item) => item.category === unit.category)!;
  const conversions = hindiConversionPages.filter((item) => item.source.category === unit.category && (item.source.fromUnit === unit.unit || item.source.toUnit === unit.unit));
  return <main className="all-conversions-page" lang="hi"><div className="all-conversions-shell"><nav className="breadcrumbs" aria-label="पृष्ठ क्रम"><Link href="/hi">मुख्य पृष्ठ</Link><span aria-hidden="true">›</span><Link href="/hi/unit-guides">इकाइयाँ</Link><span aria-hidden="true">›</span><span>{unit.name}</span></nav>
    <header className="all-conversions-header"><h1>{unit.name} ({unit.symbol})</h1><p>{unit.description}</p></header>
    <section className="category-article-content"><h2>{unit.name} के रूपांतरण</h2><ul>{conversions.map((item) => <li key={item.slug}><Link href={`/hi/${item.slug}`}>{item.fromName} से {item.toName}</Link></li>)}</ul><p><Link href={`/hi/categories/${category.slug}`}>{category.title}</Link></p></section>
  </div></main>;
}
