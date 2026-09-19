import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import {
  getAllMaterialComparisons,
  getMaterialComparison,
} from "../../converter/materialComparisons";
import { materialCategoryLabels } from "../../converter/materialsDatabase";
import { buildSiteUrl } from "../../siteConfig";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatDensity(value: number) {
  return value.toLocaleString("tr-TR", { maximumFractionDigits: 4 });
}

function formatRatio(value: number) {
  return value.toLocaleString("tr-TR", { maximumFractionDigits: 2 });
}

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function generateStaticParams() {
  return getAllMaterialComparisons().map((comparison) => ({
    slug: comparison.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getMaterialComparison(slug);

  if (!comparison) {
    return {
      title: "Karşılaştırma bulunamadı",
      robots: { index: false, follow: false },
    };
  }

  const { first, second, densityRatio, denserId } = comparison;
  const denserName = denserId === first.id ? first.nameTr : second.nameTr;

  const title = `${first.nameTr} mi ${second.nameTr} mi Daha Ağır? Yoğunluk Karşılaştırması`;
  const description = `${first.nameTr} yoğunluğu ${formatDensity(
    first.densityKgM3
  )} kg/m³, ${second.nameTr} yoğunluğu ${formatDensity(
    second.densityKgM3
  )} kg/m³. ${denserName}, diğerinden ${formatRatio(
    densityRatio
  )} kat daha yoğun. Detaylı karşılaştırma ve mühendislik özellikleri.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/malzeme-karsilastirma/${slug}`,
      languages: {
        "uz-UZ": `/uz/material-solishtirish/${slug}`,
        de: `/de/werkstoffvergleich/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(`/malzeme-karsilastirma/${slug}`),
      siteName: "BirimCeviri.app",
      locale: "tr_TR",
      type: "article",
    },
  };
}

export default async function MaterialComparisonPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const comparison = getMaterialComparison(slug);

  if (!comparison) {
    notFound();
  }

  const { first, second, context, densityRatio, denserId } = comparison;
  const denserMaterial = denserId === first.id ? first : second;
  const lighterMaterial = denserId === first.id ? second : first;
  const pageUrl = buildSiteUrl(`/malzeme-karsilastirma/${slug}`);

  const faqItems: FaqItem[] = [
    {
      question: `${first.nameTr} mi ${second.nameTr} mi daha ağır?`,
      answer:
        denserId === "esit"
          ? `${first.nameTr} ve ${second.nameTr} yaklaşık olarak aynı yoğunluğa sahiptir.`
          : `${denserMaterial.nameTr}, ${lighterMaterial.nameTr}'den yaklaşık ${formatRatio(
              densityRatio
            )} kat daha yoğundur (ağırdır).`,
    },
    {
      question: `${first.nameTr} yoğunluğu kaç kg/m³?`,
      answer: `${first.nameTr} yoğunluğu yaklaşık ${formatDensity(
        first.densityKgM3
      )} kg/m³ (${formatDensity(first.densityKgM3 / 1000)} g/cm³) değerindedir.`,
    },
    {
      question: `${second.nameTr} yoğunluğu kaç kg/m³?`,
      answer: `${second.nameTr} yoğunluğu yaklaşık ${formatDensity(
        second.densityKgM3
      )} kg/m³ (${formatDensity(second.densityKgM3 / 1000)} g/cm³) değerindedir.`,
    },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Malzeme Özellikleri",
        item: buildSiteUrl("/malzeme-ozellikleri"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${first.nameTr} – ${second.nameTr} Karşılaştırması`,
        item: pageUrl,
      },
    ],
  };

  return (
    <main className="all-conversions-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(buildFaqSchema(faqItems)),
        }}
      />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/malzeme-ozellikleri">Malzeme Özellikleri</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>
            {first.nameTr} – {second.nameTr}
          </span>
        </nav>

        <header className="all-conversions-header">
          <h1>
            {first.nameTr} mi {second.nameTr} mi Daha Ağır? Yoğunluk
            Karşılaştırması
          </h1>
          <p>
            {denserId === "esit"
              ? `${first.nameTr} ve ${second.nameTr} yaklaşık olarak aynı yoğunluğa sahiptir.`
              : `${denserMaterial.nameTr}, ${lighterMaterial.nameTr}'den yaklaşık ${formatRatio(
                  densityRatio
                )} kat daha yoğundur.`}
          </p>
        </header>

        <section className="category-article-content">
          <h2>Yoğunluk Karşılaştırma Tablosu</h2>

          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Malzeme</th>
                  <th>Yoğunluk (kg/m³)</th>
                  <th>Yoğunluk (g/cm³)</th>
                  <th>Kategori</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Link href={`/malzeme-ozellikleri/${first.id}`}>
                      {first.nameTr}
                    </Link>
                  </td>
                  <td>{formatDensity(first.densityKgM3)}</td>
                  <td>{formatDensity(first.densityKgM3 / 1000)}</td>
                  <td>{materialCategoryLabels[first.category]}</td>
                </tr>
                <tr>
                  <td>
                    <Link href={`/malzeme-ozellikleri/${second.id}`}>
                      {second.nameTr}
                    </Link>
                  </td>
                  <td>{formatDensity(second.densityKgM3)}</td>
                  <td>{formatDensity(second.densityKgM3 / 1000)}</td>
                  <td>{materialCategoryLabels[second.category]}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="flagship-sector-note">{context}</p>
        </section>

        <section className="category-article-content">
          <h2>
            {first.nameTr} ve {second.nameTr} Hakkında Daha Fazla Bilgi
          </h2>
          <ul>
            <li>
              <Link href={`/malzeme-ozellikleri/${first.id}`}>
                {first.nameTr} yoğunluğu, özellikleri ve birim çevirici
              </Link>
            </li>
            <li>
              <Link href={`/malzeme-ozellikleri/${second.id}`}>
                {second.nameTr} yoğunluğu, özellikleri ve birim çevirici
              </Link>
            </li>
            <li>
              <Link href="/malzeme-ozellikleri">
                Tüm malzeme özellikleri sayfasına dön
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
