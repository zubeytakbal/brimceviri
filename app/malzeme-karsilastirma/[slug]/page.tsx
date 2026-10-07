import type { Metadata } from "next";
import { seoTitle } from "../../seoTitle";
import Link from "@/app/components/SiteLink";
import { notFound } from "next/navigation";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import {
  getAllMaterialComparisons,
  getMaterialComparison,
} from "../../converter/materialComparisons";
import { materialCategoryLabels } from "../../converter/materialsDatabase";
import { litresPerKg, sharedShapes } from "../../converter/materialPractical";
import { buildSiteUrl } from "../../siteConfig";
import { trAblative, trEitherQuestion } from "../../converter/turkishSuffix";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatDensity(value: number) {
  return value.toLocaleString("tr-TR", { maximumFractionDigits: 4 });
}

function formatMass(kg: number) {
  if (kg >= 1000) return `${(kg / 1000).toLocaleString("tr-TR", { maximumFractionDigits: 2 })} ton`;
  if (kg >= 1) return `${kg.toLocaleString("tr-TR", { maximumFractionDigits: 2 })} kg`;
  if (kg >= 0.001) return `${(kg * 1000).toLocaleString("tr-TR", { maximumFractionDigits: 1 })} g`;
  return `${(kg * 1e6).toLocaleString("tr-TR", { maximumFractionDigits: 1 })} mg`;
}

function formatTonVolume(litresPerKgValue: number) {
  const m3 = litresPerKgValue; // 1 ton = 1000 kg → litre/kg × 1000 L = m³ olarak aynı sayı
  return m3 >= 1
    ? `${m3.toLocaleString("tr-TR", { maximumFractionDigits: 2 })} m³`
    : `${(m3 * 1000).toLocaleString("tr-TR", { maximumFractionDigits: 0 })} litre`;
}

type PropertyRow = { label: string; unit: string; first: number | null; second: number | null; higher: string };

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

  const title = `${trEitherQuestion(first.nameTr, second.nameTr)} Daha Ağır? Yoğunluk Karşılaştırması`;
  const description = `${first.nameTr} yoğunluğu ${formatDensity(
    first.densityKgM3
  )} kg/m³, ${second.nameTr} yoğunluğu ${formatDensity(
    second.densityKgM3
  )} kg/m³. ${denserName}, diğerinden ${formatRatio(
    densityRatio
  )} kat daha yoğun. Detaylı karşılaştırma ve mühendislik özellikleri.`;

  return {
    title: seoTitle(title, `${trEitherQuestion(first.nameTr, second.nameTr)} Daha Ağır?`, `${trEitherQuestion(first.nameTr.match(/\(([^)]+)\)\s*$/)?.[1] ?? first.nameTr, second.nameTr.match(/\(([^)]+)\)\s*$/)?.[1] ?? second.nameTr)} Daha Ağır?`),
    description,
    alternates: {
      canonical: `/malzeme-karsilastirma/${slug}`,
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
  const shapes = sharedShapes(first, second, "tr");
  const propertyRows: PropertyRow[] = [
    { label: "Isıl iletkenlik", unit: "W/(m·K)", first: first.thermalConductivityWmK, second: second.thermalConductivityWmK, higher: "ısıyı daha iyi iletir" },
    { label: "Elastisite modülü", unit: "GPa", first: first.elasticModulusGPa, second: second.elasticModulusGPa, higher: "daha rijittir (yük altında daha az esner)" },
    { label: "Isıl genleşme", unit: "× 10⁻⁶/K", first: first.thermalExpansionPerMillionK, second: second.thermalExpansionPerMillionK, higher: "ısınınca daha çok uzar" },
    { label: "Dinamik viskozite", unit: "mPa·s", first: first.viscosityMPaS, second: second.viscosityMPaS, higher: "daha koyu akar" },
  ].filter((row) => row.first !== null && row.second !== null);
  const bothFluid = ["sivi", "gida"].includes(first.category) && ["sivi", "gida"].includes(second.category);

  const faqItems: FaqItem[] = [
    {
      question: `${trEitherQuestion(first.nameTr, second.nameTr)} daha ağır?`,
      answer:
        denserId === "esit"
          ? `${first.nameTr} ve ${second.nameTr} yaklaşık olarak aynı yoğunluğa sahiptir.`
          : `${denserMaterial.nameTr}, ${trAblative(lighterMaterial.nameTr)} yaklaşık ${formatRatio(
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
            {trEitherQuestion(first.nameTr, second.nameTr)} Daha Ağır? Yoğunluk
            Karşılaştırması
          </h1>
          <p>
            {denserId === "esit"
              ? `${first.nameTr} ve ${second.nameTr} yaklaşık olarak aynı yoğunluğa sahiptir.`
              : `${denserMaterial.nameTr}, ${trAblative(lighterMaterial.nameTr)} yaklaşık ${formatRatio(
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
          <h2>Aynı ölçüde hangisi ne kadar gelir?</h2>
          <div className="holiday-table-wrap">
            <table className="holiday-table">
              <thead>
                <tr>
                  <th scope="col">Ölçü</th>
                  <th scope="col">{first.nameTr}</th>
                  <th scope="col">{second.nameTr}</th>
                  <th scope="col">Fark</th>
                </tr>
              </thead>
              <tbody>
                {shapes.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{formatMass(row.firstKg)}</td>
                    <td>{formatMass(row.secondKg)}</td>
                    <td>{formatMass(Math.abs(row.firstKg - row.secondKg))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Ters yönden bakınca: 1 ton {first.nameTr} {formatTonVolume(litresPerKg(first))}, 1 ton{" "}
            {second.nameTr} ise {formatTonVolume(litresPerKg(second))} yer kaplar.
            {bothFluid &&
              denserId !== "esit" &&
              ` Birbirine karışmadıklarında ${lighterMaterial.nameTr} üstte, ${denserMaterial.nameTr} altta toplanır.`}
          </p>
          {propertyRows.length > 0 && (
            <>
              <h2>Diğer özellikler</h2>
              <div className="holiday-table-wrap">
                <table className="holiday-table">
                  <thead>
                    <tr>
                      <th scope="col">Özellik</th>
                      <th scope="col">{first.nameTr}</th>
                      <th scope="col">{second.nameTr}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {propertyRows.map((row) => (
                      <tr key={row.label}>
                        <th scope="row">
                          {row.label} ({row.unit})
                        </th>
                        <td>{row.first}</td>
                        <td>{row.second}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <ul>
                {propertyRows
                  .filter((row) => row.first !== row.second)
                  .map((row) => {
                    const a = row.first as number;
                    const b = row.second as number;
                    const winner = a > b ? first.nameTr : second.nameTr;
                    const ratio = Math.max(a, b) / Math.min(a, b);
                    return (
                      <li key={row.label}>
                        {winner} {row.higher}
                        {Number.isFinite(ratio) && ratio >= 1.1 ? ` (yaklaşık ${formatRatio(ratio)} kat)` : ""}.
                      </li>
                    );
                  })}
              </ul>
            </>
          )}

          <h2>Sık Sorulan Sorular</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}
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

        <section className="category-article-content">
          <p>
          Yoğunluklar{" "}
          <a href="https://densitycalculator.net/density-table" target="_blank" rel="noreferrer">
            yoğunluk tablosundaki
          </a>{" "}
          oda sıcaklığı başvuru değerleridir.
          </p>
        </section>
      </div>
    </main>
  );
}
