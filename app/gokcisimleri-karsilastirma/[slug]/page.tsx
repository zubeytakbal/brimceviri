import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import {
  getAllCelestialBodyComparisons,
  getCelestialBodyComparison,
} from "../../converter/celestialBodyComparisons";
import { buildSiteUrl } from "../../siteConfig";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatNumber(value: number, maxFractionDigits = 2): string {
  return value.toLocaleString("tr-TR", { maximumFractionDigits: maxFractionDigits });
}

function formatRatio(value: number) {
  return value.toLocaleString("tr-TR", { maximumFractionDigits: 2 });
}

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function generateStaticParams() {
  return getAllCelestialBodyComparisons().map((comparison) => ({
    slug: comparison.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getCelestialBodyComparison(slug);

  if (!comparison) {
    return {
      title: "Karşılaştırma bulunamadı",
      robots: { index: false, follow: false },
    };
  }

  const { first, second, diameterRatio, largerId } = comparison;
  const largerName = largerId === first.id ? first.nameTr : second.nameTr;
  const smallerName = largerId === first.id ? second.nameTr : first.nameTr;

  const title = `${first.nameTr} mi ${second.nameTr} mi Daha Büyük? Karşılaştırma`;
  const description = `${first.nameTr} çapı ${formatNumber(
    first.diameterKm,
    0
  )} km, ${second.nameTr} çapı ${formatNumber(
    second.diameterKm,
    0
  )} km. ${largerName}, ${smallerName}'den ${formatRatio(
    diameterRatio
  )} kat daha büyük. Kütle, yerçekimi ve diğer özellikler karşılaştırması.`;

  return {
    title,
    description,
    alternates: { canonical: `/gokcisimleri-karsilastirma/${slug}` },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(`/gokcisimleri-karsilastirma/${slug}`),
      siteName: "BirimCeviri.app",
      locale: "tr_TR",
      type: "article",
    },
  };
}

export default async function CelestialBodyComparisonPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const comparison = getCelestialBodyComparison(slug);

  if (!comparison) {
    notFound();
  }

  const { first, second, context, diameterRatio, massRatio, largerId } =
    comparison;
  const largerBody = largerId === first.id ? first : second;
  const smallerBody = largerId === first.id ? second : first;
  const pageUrl = buildSiteUrl(`/gokcisimleri-karsilastirma/${slug}`);

  const faqItems: FaqItem[] = [
    {
      question: `${first.nameTr} mi ${second.nameTr} mi daha büyük?`,
      answer: `${largerBody.nameTr}, ${smallerBody.nameTr}'den çap olarak yaklaşık ${formatRatio(
        diameterRatio
      )} kat, kütle olarak yaklaşık ${formatRatio(massRatio)} kat daha büyüktür.`,
    },
    {
      question: `${first.nameTr}'in çapı kaç km?`,
      answer: `${first.nameTr}'in çapı yaklaşık ${formatNumber(
        first.diameterKm,
        0
      )} km'dir.`,
    },
    {
      question: `${second.nameTr}'in çapı kaç km?`,
      answer: `${second.nameTr}'in çapı yaklaşık ${formatNumber(
        second.diameterKm,
        0
      )} km'dir.`,
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
        name: "Gökcisimleri Özellikleri",
        item: buildSiteUrl("/gokcisimleri-ozellikleri"),
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
          <Link href="/gokcisimleri-ozellikleri">Gökcisimleri Özellikleri</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>
            {first.nameTr} – {second.nameTr}
          </span>
        </nav>

        <header className="all-conversions-header">
          <h1>
            {first.nameTr} mi {second.nameTr} mi Daha Büyük? Karşılaştırma
          </h1>
          <p>
            {largerBody.nameTr}, {smallerBody.nameTr}&#x27;den çap olarak
            yaklaşık {formatRatio(diameterRatio)} kat, kütle olarak yaklaşık{" "}
            {formatRatio(massRatio)} kat daha büyüktür.
          </p>
        </header>

        <section className="category-article-content">
          <h2>Karşılaştırma Tablosu</h2>

          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Özellik</th>
                  <th>{first.nameTr}</th>
                  <th>{second.nameTr}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Çap</td>
                  <td>{formatNumber(first.diameterKm, 0)} km</td>
                  <td>{formatNumber(second.diameterKm, 0)} km</td>
                </tr>
                <tr>
                  <td>Kütle</td>
                  <td>{formatNumber(first.massKg / 1e24, 3)} × 10²⁴ kg</td>
                  <td>{formatNumber(second.massKg / 1e24, 3)} × 10²⁴ kg</td>
                </tr>
                <tr>
                  <td>Yoğunluk</td>
                  <td>{formatNumber(first.densityKgM3, 0)} kg/m³</td>
                  <td>{formatNumber(second.densityKgM3, 0)} kg/m³</td>
                </tr>
                <tr>
                  <td>Yüzey Yerçekimi</td>
                  <td>{formatNumber(first.gravityMs2, 1)} m/s²</td>
                  <td>{formatNumber(second.gravityMs2, 1)} m/s²</td>
                </tr>
                <tr>
                  <td>Kaçış Hızı</td>
                  <td>{formatNumber(first.escapeVelocityKms, 1)} km/s</td>
                  <td>{formatNumber(second.escapeVelocityKms, 1)} km/s</td>
                </tr>
                <tr>
                  <td>Ortalama Sıcaklık</td>
                  <td>{formatNumber(first.meanTemperatureC, 0)} °C</td>
                  <td>{formatNumber(second.meanTemperatureC, 0)} °C</td>
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
              <Link href={`/gokcisimleri-ozellikleri/${first.id}`}>
                {first.nameTr} özellikleri ve ağırlık hesaplayıcı
              </Link>
            </li>
            <li>
              <Link href={`/gokcisimleri-ozellikleri/${second.id}`}>
                {second.nameTr} özellikleri ve ağırlık hesaplayıcı
              </Link>
            </li>
            <li>
              <Link href="/gokcisimleri-ozellikleri">
                Tüm gökcisimleri özellikleri sayfasına dön
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
