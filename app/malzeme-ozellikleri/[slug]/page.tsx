import type { Metadata } from "next";
import { seoTitle } from "../../seoTitle";
import Link from "@/app/components/SiteLink";
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
import { buoyancy, densityRank, litresPerKg, practicalRows } from "../../converter/materialPractical";
import { materialNotesTr } from "../../converter/materialNotes";
import { buildSiteUrl } from "../../siteConfig";

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
    title: seoTitle(title, `${material.nameTr} Yoğunluğu ve Özellikleri`, `${material.nameTr.match(/\(([^)]+)\)\s*$/)?.[1] ?? material.nameTr} Yoğunluğu ve Özellikleri`),
    description,
    alternates: {
      canonical: `/malzeme-ozellikleri/${slug}`,
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
  const practical = practicalRows(material, "tr");
  const perKg = litresPerKg(material);
  const float = buoyancy(material);
  const rank = densityRank(material);
  const note = materialNotesTr[material.id];

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
            {material.nameTr} ({materialCategoryLabels[material.category]}{" "}
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
            <p>
              <strong>Değişkenlik uyarısı:</strong> {material.variabilityNote}
            </p>
          )}
        </section>

        <section className="category-article-content">
          <h2>{material.nameTr} ne kadar ağır gelir?</h2>
          <div className="holiday-table-wrap">
            <table className="holiday-table">
              <thead>
                <tr>
                  <th scope="col">Ölçü</th>
                  <th scope="col">Yaklaşık ağırlık</th>
                </tr>
              </thead>
              <tbody>
                {practical.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{formatMass(row.massKg)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            1 kg {material.nameTr}{" "}
            {perKg >= 1000
              ? `yaklaşık ${(perKg / 1000).toLocaleString("tr-TR", { maximumFractionDigits: 2 })} m³`
              : perKg >= 1
                ? `yaklaşık ${perKg.toLocaleString("tr-TR", { maximumFractionDigits: 2 })} litre`
                : `yaklaşık ${(perKg * 1000).toLocaleString("tr-TR", { maximumFractionDigits: 1 })} cm³`}{" "}
            yer kaplar.{" "}
            {float.kind === "gas"
              ? float.lighterThanAir
                ? `Havadan yaklaşık ${(1 / float.ratio).toLocaleString("tr-TR", { maximumFractionDigits: 1 })} kat hafif olduğu için yükselir ve kapalı ortamda tavana yakın birikir.`
                : `Havadan yaklaşık ${float.ratio.toLocaleString("tr-TR", { maximumFractionDigits: 1 })} kat ağır olduğu için zemine çöker; sızıntıda bodrum ve çukurlarda birikir.`
              : float.floats
                ? `Suyun ${float.ratio.toLocaleString("tr-TR", { maximumFractionDigits: 2 })} katı yoğunlukta olduğu için suda yüzer${material.category === "sivi" || material.category === "gida" ? " (suyla karışmıyorsa üstte toplanır)" : ""}.`
                : float.ratio < 1.01
                  ? "Yoğunluğu suya çok yakındır."
                  : `Sudan ${float.ratio.toLocaleString("tr-TR", { maximumFractionDigits: 2 })} kat yoğun olduğu için suda batar.`}
          </p>
          <p>
            Bu sitedeki {rank.total} malzeme en yoğundan en hafife sıralandığında {rank.overall}. sırada,{" "}
            {materialCategoryLabels[material.category].toLocaleLowerCase("tr")} arasında{" "}
            {rank.categoryTotal} malzemenin {rank.inCategory}. sırasındadır.
            {rank.denser && rank.lighter && (
              <>
                {" "}Bir üstünde {rank.denser.nameTr} ({formatDensity(rank.denser.densityKgM3)} kg/m³), bir altında{" "}
                {rank.lighter.nameTr} ({formatDensity(rank.lighter.densityKgM3)} kg/m³) var.
              </>
            )}{" "}
            {getDensityUseNote(material.category)}
          </p>
        </section>

        {note && (
          <section className="category-article-content">
            <h2>{note.heading}</h2>
            {note.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>
        )}

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
                  <Link href={`/malzeme-ozellikleri?v=${comparison.slug}#hesapla`}>
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

          <p>
            Kaynak:{" "}
            <a href="https://densitycalculator.net/density-table" target="_blank" rel="noreferrer">
              yoğunluk tablosu
            </a>
            ; değerler oda sıcaklığındaki tipik başvuru değerleridir, ürün föyündeki değer önceliklidir.
            Parça ağırlığı için <Link href="/malzeme-agirligi-hesaplama">Malzeme Ağırlığı Hesaplama</Link>.
          </p>
        </section>
      </div>
    </main>
  );
}
