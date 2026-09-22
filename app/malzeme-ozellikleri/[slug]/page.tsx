import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MaterialDensityConverter from "../../components/MaterialDensityConverter";
import MaterialMassVolumeCalculator from "../../components/MaterialMassVolumeCalculator";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import {
  findMaterialProfileById,
  findSimilarDensityMaterials,
  getAllMaterialProfiles,
} from "../../converter/materialsHub";
import { getAllMaterialComparisons } from "../../converter/materialComparisons";
import {
  materialCategoryLabels,
  type MaterialCategory,
} from "../../converter/materialsDatabase";
import { buildSiteUrl } from "../../siteConfig";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatDensity(value: number) {
  return value.toLocaleString("tr-TR", { maximumFractionDigits: 4 });
}

function getDensityUseNote(category: MaterialCategory) {
  const notes: Record<MaterialCategory, string> = {
    metal:
      "Metal yoğunluğu alaşım bileşimine, ısıl işleme ve sıcaklığa göre değişir. Bu değer, malzeme sınıfı belirtilmemiş ilk kütle ve hacim hesapları için nominal referanstır.",
    sivi:
      "Sıvı yoğunluğu özellikle sıcaklığa ve karışım oranına bağlıdır. Hassas dolum, ticari ürün veya güvenlik hesabında ürünün teknik föyündeki sıcaklığa bağlı değeri kullanın.",
    gaz:
      "Gaz yoğunluğu sıcaklık ve basınca güçlü biçimde bağlıdır. Bu değer, ilk karşılaştırma ve yaklaşık kütle hesabı içindir; proses hesabında aynı sıcaklık ve basınç koşullarındaki ölçülmüş değeri kullanın.",
    plastik:
      "Polimer yoğunluğu reçine türüne, dolgu maddesine ve üretim yöntemine göre değişebilir. Ürün tasarımı için üreticinin teknik veri föyündeki sınıfa özgü değeri doğrulayın.",
    "yapi-malzemesi":
      "Yapı malzemelerinde nem, gözeneklilik ve sıkışma derecesi yoğunluğu değiştirir. Hesap, kuru ve tipik malzeme için ilk tahmindir.",
    ahsap:
      "Ahşap yoğunluğu türün yanı sıra nem oranı ve lif yönüyle değişir. Kesin ağırlık hesabında ölçülen nem oranını ve gerçek parça hacmini kullanın.",
    gida:
      "Gıda ve mutfak malzemelerinde su, yağ ve hava oranı markaya ve hazırlama biçimine göre değişir. Sonuç, yaklaşık mutfak ve hacim hesabı içindir.",
  };

  return notes[category];
}

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function generateStaticParams() {
  return getAllMaterialProfiles().map((material) => ({ slug: material.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const material = findMaterialProfileById(slug);

  if (!material) {
    return { title: "Malzeme bulunamadı", robots: { index: false, follow: false } };
  }

  const title = `${material.nameTr} Yoğunluğu, Özellikleri ve Birim Çevirici`;
  const description = `${material.nameTr} yoğunluğu ${formatDensity(material.densityKgM3)} kg/m³. Yoğunluğu g/cm³, kg/L ve diğer birimlere çevir, bilinen tüm mühendislik özelliklerini gör.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/malzeme-ozellikleri/${slug}`,
      languages: {
        "uz-UZ": `/uz/material-xossalari/${slug}`,
        de: `/de/werkstoffeigenschaften/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(`/malzeme-ozellikleri/${slug}`),
      siteName: "BirimCeviri.app",
      locale: "tr_TR",
      type: "article",
    },
  };
}

export default async function MaterialPropertyPage({ params }: PageProps) {
  const { slug } = await params;
  const material = findMaterialProfileById(slug);

  if (!material) {
    notFound();
  }

  const pageUrl = buildSiteUrl(`/malzeme-ozellikleri/${slug}`);
  const similarMaterials = findSimilarDensityMaterials(slug, 5);
  const relatedComparisons = getAllMaterialComparisons().filter(
    (comparison) => comparison.first.id === slug || comparison.second.id === slug
  );
  const oneLitreMassKg = material.densityKgM3 / 1000;

  const faqItems: FaqItem[] = [
    {
      question: `${material.nameTr} yoğunluğu kaç kg/m³?`,
      answer: `${material.nameTr} yoğunluğu yaklaşık ${formatDensity(material.densityKgM3)} kg/m³ (${formatDensity(material.densityKgM3 / 1000)} g/cm³) değerindedir.`,
    },
    {
      question: `1 litre ${material.nameTr} yaklaşık kaç kg gelir?`,
      answer: `Bu referans yoğunlukla 1 litre ${material.nameTr} yaklaşık ${formatDensity(oneLitreMassKg)} kg gelir. Gerçek sonuç sıcaklık, malzeme sınıfı ve bileşime göre değişebilir.`,
    },
  ];

  if (material.thermalConductivityWmK !== null) {
    faqItems.push({
      question: `${material.nameTr} ısıl iletkenliği nedir?`,
      answer: `${material.nameTr} için tipik ısıl iletkenlik değeri yaklaşık ${material.thermalConductivityWmK} W/(m·K)'dir.`,
    });
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Malzeme Özellikleri", item: buildSiteUrl("/malzeme-ozellikleri") },
      { "@type": "ListItem", position: 3, name: material.nameTr, item: pageUrl },
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
          <Link href="/malzeme-ozellikleri">Malzeme Özellikleri</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{material.nameTr}</span>
        </nav>

        <header className="all-conversions-header">
          <h1>{material.nameTr} Yoğunluğu, Özellikleri ve Birim Çevirici</h1>
          <p>
            {material.nameTr} ({materialCategoryLabels[material.category]}
            kategorisi) yoğunluğu, bilinen mühendislik özellikleri ve
            canlı birim çevirici.
          </p>
        </header>

        <section className="category-article-content">
          <h2>{material.nameTr} Temel Özellikleri</h2>
          <dl className="unit-facts">
            <div>
              <dt>Yoğunluk</dt>
              <dd>
                {formatDensity(material.densityKgM3)} kg/m³ (
                {formatDensity(material.densityKgM3 / 1000)} g/cm³)
              </dd>
            </div>
            {material.thermalConductivityWmK !== null && (
              <div>
                <dt>Isıl İletkenlik</dt>
                <dd>
                  {material.variabilityNote && "~"}
                  {material.thermalConductivityWmK} W/(m·K)
                </dd>
              </div>
            )}
            {material.elasticModulusGPa !== null && (
              <div>
                <dt>Elastisite Modülü (Young Modülü)</dt>
                <dd>{material.elasticModulusGPa} GPa</dd>
              </div>
            )}
            {material.thermalExpansionPerMillionK !== null && (
              <div>
                <dt>Isıl Genleşme Katsayısı</dt>
                <dd>{material.thermalExpansionPerMillionK} × 10⁻⁶/K</dd>
              </div>
            )}
            {material.viscosityMPaS !== null && (
              <div>
                <dt>Dinamik Viskozite</dt>
                <dd>
                  {material.variabilityNote && "~"}
                  {material.viscosityMPaS} mPa·s
                </dd>
              </div>
            )}
          </dl>
          {material.variabilityNote && (
            <p className="calculator-usage-hint">
              <strong>Değişkenlik uyarısı:</strong> {material.variabilityNote}
            </p>
          )}
        </section>

        <section className="category-article-content">
          <h2>{material.nameTr} yoğunluk değerini doğru kullanma</h2>
          <p>{getDensityUseNote(material.category)}</p>
          <p>
            Bu referans değerle 1 litre {material.nameTr} yaklaşık {formatDensity(oneLitreMassKg)} kg,
            1 m³ ise yaklaşık {formatDensity(material.densityKgM3)} kg gelir.
          </p>
        </section>

        <MaterialMassVolumeCalculator
          densityKgM3={material.densityKgM3}
          materialName={material.nameTr}
        />

        <MaterialDensityConverter
          densityKgM3={material.densityKgM3}
          materialName={material.nameTr}
        />

        {similarMaterials.length > 0 && (
          <section className="category-article-content">
            <h2>{material.nameTr} ile Benzer Yoğunluktaki Malzemeler</h2>
            <ul className="related-conversion-list">
              {similarMaterials.map((similar) => (
                <li key={similar.id}>
                  <Link href={`/malzeme-ozellikleri/${similar.id}`}>
                    {similar.nameTr}
                  </Link>{" "}
                  — {formatDensity(similar.densityKgM3)} kg/m³
                </li>
              ))}
            </ul>
          </section>
        )}

        {relatedComparisons.length > 0 && (
          <section className="category-article-content">
            <h2>{material.nameTr} Karşılaştırmaları</h2>
            <ul className="related-conversion-list">
              {relatedComparisons.map((comparison) => (
                <li key={comparison.slug}>
                  <Link href={`/malzeme-karsilastirma/${comparison.slug}`}>
                    {comparison.first.nameTr} – {comparison.second.nameTr}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

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
            Bu malzemenin yoğunluğundan parça ağırlığını hesaplamak için{" "}
            <Link href="/malzeme-agirligi-hesaplama">Malzeme Ağırlığı Hesaplama</Link>
            {" "}sayfasına,{" "}
            {material.thermalConductivityWmK !== null && (
              <>
                ısı iletimi hesaplamaları için{" "}
                <Link href="/hesaplayicilar/isi-iletimi">Isı İletimi Hesaplayıcısı</Link>
                {" "}sayfasına,{" "}
              </>
            )}
            {material.viscosityMPaS !== null && (
              <>
                akışkan hesaplamaları için{" "}
                <Link href="/hesaplayicilar/reynolds-sayisi">Reynolds Sayısı Hesaplayıcısı</Link>
                {" "}sayfasına,{" "}
              </>
            )}
            tüm malzemeler için{" "}
            <Link href="/malzeme-ozellikleri">Malzeme Özellikleri</Link> ana
            sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Yoğunluk veritabanının başlangıç referansı,{" "}
            <a
              href="https://densitycalculator.net/density-table"
              target="_blank"
              rel="noreferrer"
            >
              232 malzemelik yoğunluk tablosudur
            </a>
            . Buradaki değerler ilk hesaplamaya yönelik nominal başvuru
            değerleridir. Her değer aynı sıcaklıkta veya aynı malzeme sınıfında
            ölçülmüş değildir; tasarım, güvenlik veya ticari ölçüm için ilgili
            ürünün teknik veri föyündeki koşullu değeri doğrulayın.
          </p>
        </section>
      </div>
    </main>
  );
}
