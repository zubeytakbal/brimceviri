import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProvinceComparisonTool from "../../components/ProvinceComparisonTool";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import {
  findPopularComparisonBySlug,
  popularProvinceComparisons,
} from "../../converter/popularProvinceComparisons";
import { compareProvinces } from "../../converter/provinceComparison";
import { buildSiteUrl } from "../../siteConfig";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatNumber(value: number): string {
  return value.toLocaleString("tr-TR", { maximumFractionDigits: 1 });
}

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function generateStaticParams() {
  return popularProvinceComparisons.map((comparison) => ({ slug: comparison.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comparison = findPopularComparisonBySlug(slug);
  const result = comparison
    ? compareProvinces(comparison.provinceIdA, comparison.provinceIdB)
    : null;

  if (!comparison || !result) {
    return { title: "Karşılaştırma bulunamadı", robots: { index: false, follow: false } };
  }

  const title = `${result.provinceA.nameTr} - ${result.provinceB.nameTr} Rakım Karşılaştırması`;
  const description = `${result.provinceA.nameTr} ile ${result.provinceB.nameTr} arasındaki rakım farkı, hava basıncı ve kaynama noktası karşılaştırması.`;

  return {
    title,
    description,
    alternates: { canonical: `/il-rakimi-karsilastirma/${slug}` },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(`/il-rakimi-karsilastirma/${slug}`),
      siteName: "BirimCeviri.app",
      locale: "tr_TR",
      type: "article",
    },
  };
}

export default async function ProvinceComparisonDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const comparison = findPopularComparisonBySlug(slug);
  const result = comparison
    ? compareProvinces(comparison.provinceIdA, comparison.provinceIdB)
    : null;

  if (!comparison || !result) {
    notFound();
  }

  const pageUrl = buildSiteUrl(`/il-rakimi-karsilastirma/${slug}`);

  const faqItems: FaqItem[] = [
    {
      question: `${result.provinceA.nameTr} ile ${result.provinceB.nameTr} arasında kaç metre rakım farkı var?`,
      answer: `${result.provinceA.nameTr} ${result.provinceA.elevationM.toLocaleString("tr-TR")} m, ${result.provinceB.nameTr} ise ${result.provinceB.elevationM.toLocaleString("tr-TR")} m rakımda — aralarında ${formatNumber(Math.abs(result.elevationDiffM))} metre fark var.`,
    },
    {
      question: "Bu rakım farkının sağlığa etkisi var mı?",
      answer:
        result.healthTier === "belirgin"
          ? "Evet, bu fark tıbbi kaynaklara göre belirgin sayılan eşiğin üzerinde — vücudun uyum sağlaması zaman alabilir."
          : result.healthTier === "orta"
            ? "Hafif düzeyde hissedilebilir bir fark olabilir, özellikle ani fiziksel aktivitede."
            : "Bu fark küçük, günlük hayatta hissedilir bir etkisi yoktur.",
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
        name: "İl Rakımı Karşılaştırma",
        item: buildSiteUrl("/il-rakimi-karsilastirma"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${result.provinceA.nameTr} - ${result.provinceB.nameTr}`,
        item: pageUrl,
      },
    ],
  };

  return (
    <main className="all-conversions-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/il-rakimi-karsilastirma">İl Rakımı Karşılaştırma</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>
            {result.provinceA.nameTr} - {result.provinceB.nameTr}
          </span>
        </nav>

        <header className="all-conversions-header">
          <h1>
            {result.provinceA.nameTr} - {result.provinceB.nameTr} Rakım Karşılaştırması
          </h1>
          <p>
            {result.provinceA.nameTr} ile {result.provinceB.nameTr} arasındaki
            rakım farkını, hava basıncı ve kaynama noktası farkını gör.
          </p>
        </header>

        <ProvinceComparisonTool
          defaultProvinceIdA={comparison.provinceIdA}
          defaultProvinceIdB={comparison.provinceIdB}
        />

        <section className="category-article-content">
          <h2>Sık Sorulan Sorular</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>İlgili araçlar</h2>
          <p>
            Diğer il karşılaştırmaları için{" "}
            <Link href="/il-rakimi-karsilastirma">İl Rakımı Karşılaştırma</Link>
            {" "}sayfasına, tek tek il rakımları için{" "}
            <Link href="/il-rakimlari">İllerin Rakımı</Link>
            {" "}sayfasına bakabilirsin.
          </p>
        </section>
      </div>
    </main>
  );
}
