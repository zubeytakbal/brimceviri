import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hindiCategoryPages, hindiUnitPages } from "../../../converter/localizedHindiReferencePages";
import { hindiConversionPages } from "../../../converter/localizedHindiConversionPages";
import { buildFullLanguageAlternates } from "../../../i18n/routing";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return hindiCategoryPages.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = hindiCategoryPages.find((item) => item.slug === slug);
  if (!page) return { robots: { index: false } };
  const path = `/hi/categories/${slug}`;
  return { title: page.title, description: page.description, alternates: { canonical: path, ...buildFullLanguageAlternates(path) } };
}
export default async function HindiCategoryPage({ params }: Props) {
  const { slug } = await params;
  const page = hindiCategoryPages.find((item) => item.slug === slug);
  if (!page) notFound();
  return <main className="all-conversions-page" lang="hi"><div className="all-conversions-shell">
    <nav className="breadcrumbs" aria-label="पृष्ठ क्रम"><Link href="/hi">मुख्य पृष्ठ</Link><span aria-hidden="true">›</span><Link href="/hi/categories">श्रेणियाँ</Link><span aria-hidden="true">›</span><span>{page.title}</span></nav>
    <header className="all-conversions-header"><h1>{page.title}</h1><p>{page.description}</p></header>
    <section className="category-article-content"><h2>परिवर्तक</h2><ul>{hindiConversionPages.filter((item) => item.source.category === page.category).map((item) => <li key={item.slug}><Link href={`/hi/${item.slug}`}>{item.fromName} से {item.toName}</Link></li>)}</ul>
    <h2>इकाई मार्गदर्शिकाएँ</h2><ul>{hindiUnitPages.filter((item) => item.category === page.category).map((item) => <li key={item.slug}><Link href={`/hi/unit-guides/${item.slug}`}>{item.name} ({item.symbol})</Link></li>)}</ul></section>
  </div></main>;
}
