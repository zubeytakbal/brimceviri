import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PairConverter from "../../converter/PairConverter";
import { convert } from "../../converter/convert";
import { findRussianConversionPage, russianConversionPages } from "../../converter/localizedRussianConversionPages";
import { russianCategoryPages, russianUnitPages } from "../../converter/localizedRussianReferencePages";
import { buildFullLanguageAlternates } from "../../i18n/routing";
import { buildSiteUrl } from "../../siteConfig";

type PageProps = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

function format(value: number) {
  return Number(value.toPrecision(10)).toLocaleString("ru-RU", { maximumFractionDigits: 10 });
}

export function generateStaticParams() {
  return russianConversionPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = findRussianConversionPage(slug);
  if (!page) return { title: "Перевод не найден", robots: { index: false } };
  const result = format(convert(page.source.category, 1, page.source.fromUnit, page.source.toUnit));
  return {
    title: `${page.fromName} → ${page.toName}: конвертер единиц`,
    description: `1 ${page.source.fromUnit} = ${result} ${page.source.toUnit}. Перевод величин, формула и таблица значений.`,
    alternates: { canonical: `/ru/${page.slug}`, ...buildFullLanguageAlternates(`/ru/${page.slug}`) },
    openGraph: { title: `${page.fromName} → ${page.toName}`, url: buildSiteUrl(`/ru/${page.slug}`), locale: "ru_RU" },
  };
}

export default async function RussianConversionPage({ params }: PageProps) {
  const { slug } = await params;
  const page = findRussianConversionPage(slug);
  if (!page) notFound();

  const { category, fromUnit, toUnit, reverseSlug } = page.source;
  const result = convert(category, 1, fromUnit, toUnit);
  const reverse = russianConversionPages.find((item) => item.sourceSlug === reverseSlug);
  const categoryPage = russianCategoryPages.find((item) => item.category === category)!;
  const relatedUnits = russianUnitPages.filter((item) => item.category === category && (item.unit === fromUnit || item.unit === toUnit));
  const rows = [1, 2, 5, 10, 25, 50, 100].map((value) => ({ value, result: convert(category, value, fromUnit, toUnit) }));
  const formula = category === "sicaklik"
    ? fromUnit === "C" ? "°F = (°C × 9/5) + 32" : "°C = (°F − 32) × 5/9"
    : `Значение в ${toUnit} = значение в ${fromUnit} × ${format(result)}`;

  const breadcrumbs = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: buildSiteUrl("/ru") },
      { "@type": "ListItem", position: 2, name: "Категории", item: buildSiteUrl("/ru/categories") },
      { "@type": "ListItem", position: 3, name: `${page.fromName} → ${page.toName}`, item: buildSiteUrl(`/ru/${slug}`) },
    ],
  };

  return (
    <main className="conversion-page" lang="ru">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, "\\u003c") }} />
      <div className="conversion-breadcrumb-wrap"><nav className="breadcrumbs" aria-label="Навигационная цепочка"><Link href="/ru">Главная</Link><span aria-hidden="true">›</span><Link href="/ru/categories">Категории</Link><span aria-hidden="true">›</span><span>{page.fromName} → {page.toName}</span></nav></div>
      <section className="conversion-hero"><div className="conversion-hero-inner"><div className="conversion-hero-tool">
        <h1>{page.fromName} → {page.toName}</h1>
        <p className="conversion-hero-description">1 {fromUnit} = {format(result)} {toUnit}. Введите число для мгновенного перевода.</p>
        <PairConverter category={category} fromUnit={fromUnit} toUnit={toUnit} fromName={page.fromName} toName={page.toName} locale="ru" />
      </div></div></section>
      <section className="conversion-section category-article-content">
        <h2>Формула перевода</h2><p>{formula}</p>
        <h2>Таблица перевода</h2>
        <table><thead><tr><th>{page.fromName} ({fromUnit})</th><th>{page.toName} ({toUnit})</th></tr></thead><tbody>
          {rows.map((row) => <tr key={row.value}><td>{format(row.value)}</td><td>{format(row.result)}</td></tr>)}
        </tbody></table>
        {reverse && <p>Обратный перевод: <Link href={`/ru/${reverse.slug}`}>{reverse.fromName} → {reverse.toName}</Link>.</p>}
        <p><Link href={`/ru/categories/${categoryPage.slug}`}>{categoryPage.title}</Link></p>
        <h2>О единицах измерения</h2><ul>{relatedUnits.map((unit) => <li key={unit.slug}><Link href={`/ru/unit-guides/${unit.slug}`}>{unit.name} ({unit.symbol})</Link></li>)}</ul>
      </section>
    </main>
  );
}
