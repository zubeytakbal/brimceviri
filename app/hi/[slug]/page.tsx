import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PairConverter from "../../converter/PairConverter";
import { convert } from "../../converter/convert";
import { findHindiConversionPage, hindiConversionPages } from "../../converter/localizedHindiConversionPages";
import { hindiCategoryPages, hindiUnitPages } from "../../converter/localizedHindiReferencePages";
import { buildFullLanguageAlternates } from "../../i18n/routing";
import { buildSiteUrl } from "../../siteConfig";

type PageProps = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

function format(value: number) {
  return Number(value.toPrecision(10)).toLocaleString("hi-IN", { maximumFractionDigits: 10 });
}

export function generateStaticParams() {
  return hindiConversionPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = findHindiConversionPage(slug);
  if (!page) return { title: "रूपांतरण नहीं मिला", robots: { index: false } };
  const result = format(convert(page.source.category, 1, page.source.fromUnit, page.source.toUnit));
  return {
    title: `${page.fromName} से ${page.toName} परिवर्तक`,
    description: `1 ${page.source.fromUnit} = ${result} ${page.source.toUnit}। तुरंत गणना करें, सूत्र और रूपांतरण तालिका देखें।`,
    alternates: { canonical: `/hi/${page.slug}`, ...buildFullLanguageAlternates(`/hi/${page.slug}`) },
    openGraph: { title: `${page.fromName} से ${page.toName}`, url: buildSiteUrl(`/hi/${page.slug}`), locale: "hi_IN" },
  };
}

export default async function HindiConversionPage({ params }: PageProps) {
  const { slug } = await params;
  const page = findHindiConversionPage(slug);
  if (!page) notFound();

  const { category, fromUnit, toUnit, reverseSlug } = page.source;
  const result = convert(category, 1, fromUnit, toUnit);
  const reverse = hindiConversionPages.find((item) => item.sourceSlug === reverseSlug);
  const categoryPage = hindiCategoryPages.find((item) => item.category === category)!;
  const relatedUnits = hindiUnitPages.filter((item) => item.category === category && (item.unit === fromUnit || item.unit === toUnit));
  const rows = [1, 2, 5, 10, 25, 50, 100].map((value) => ({ value, result: convert(category, value, fromUnit, toUnit) }));
  const formula = category === "sicaklik"
    ? fromUnit === "C" ? "°F = (°C × 9/5) + 32" : "°C = (°F − 32) × 5/9"
    : `${toUnit} में मान = ${fromUnit} में मान × ${format(result)}`;
  const breadcrumbs = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "मुख्य पृष्ठ", item: buildSiteUrl("/hi") },
      { "@type": "ListItem", position: 2, name: "श्रेणियाँ", item: buildSiteUrl("/hi/categories") },
      { "@type": "ListItem", position: 3, name: `${page.fromName} से ${page.toName}`, item: buildSiteUrl(`/hi/${slug}`) },
    ],
  };

  return (
    <main className="conversion-page" lang="hi">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, "\\u003c") }} />
      <div className="conversion-breadcrumb-wrap"><nav className="breadcrumbs" aria-label="पृष्ठ क्रम"><Link href="/hi">मुख्य पृष्ठ</Link><span aria-hidden="true">›</span><Link href="/hi/categories">श्रेणियाँ</Link><span aria-hidden="true">›</span><span>{page.fromName} से {page.toName}</span></nav></div>
      <section className="conversion-hero"><div className="conversion-hero-inner"><div className="conversion-hero-tool">
        <h1>{page.fromName} से {page.toName}</h1>
        <p className="conversion-hero-description">1 {fromUnit} = {format(result)} {toUnit}। तुरंत परिणाम पाने के लिए मान लिखें।</p>
        <PairConverter category={category} fromUnit={fromUnit} toUnit={toUnit} fromName={page.fromName} toName={page.toName} locale="hi" />
      </div></div></section>
      <section className="conversion-section category-article-content">
        <h2>रूपांतरण का सूत्र</h2><p>{formula}</p>
        <h2>रूपांतरण तालिका</h2>
        <table><thead><tr><th>{page.fromName} ({fromUnit})</th><th>{page.toName} ({toUnit})</th></tr></thead><tbody>
          {rows.map((row) => <tr key={row.value}><td>{format(row.value)}</td><td>{format(row.result)}</td></tr>)}
        </tbody></table>
        {reverse && <p>उल्टा रूपांतरण: <Link href={`/hi/${reverse.slug}`}>{reverse.fromName} से {reverse.toName}</Link></p>}
        <p><Link href={`/hi/categories/${categoryPage.slug}`}>{categoryPage.title}</Link></p>
        <h2>इकाइयों के बारे में</h2><ul>{relatedUnits.map((unit) => <li key={unit.slug}><Link href={`/hi/unit-guides/${unit.slug}`}>{unit.name} ({unit.symbol})</Link></li>)}</ul>
      </section>
    </main>
  );
}
