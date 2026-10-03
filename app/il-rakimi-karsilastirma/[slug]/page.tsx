import type { Metadata } from "next";
import { seoTitle } from "../../seoTitle";
import Link from "@/app/components/SiteLink";
import { notFound } from "next/navigation";
import ProvinceComparisonTool from "../../components/ProvinceComparisonTool";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import {
  findPopularComparisonBySlug,
  popularProvinceComparisons,
} from "../../converter/popularProvinceComparisons";
import { compareProvinces, lastikGostergeArtisiBar, ortalamaEgim, paketGenlesmesi } from "../../converter/provinceComparison";
import { ilceOzeti, mutfakNotu } from "../../converter/geo/ilceRakimHub";
import { roadKm } from "../../converter/geo/provinceDistances";
import { findProvince } from "../../converter/geo/turkeyProvinces";
import { trAblative, trDative, trLocative } from "../../converter/turkishSuffix";
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
    title: seoTitle(title, `${result.provinceA.nameTr} - ${result.provinceB.nameTr} Rakımı`),
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
  const [alcak, yuksek] = result.provinceA.elevationM <= result.provinceB.elevationM ? [result.provinceA, result.provinceB] : [result.provinceB, result.provinceA];
  const pa = findProvince(result.provinceA.id);
  const pb = findProvince(result.provinceB.id);
  const yol = pa && pb ? roadKm(pa, pb) : 0;
  const egim = ortalamaEgim(result.elevationDiffM, yol);
  const genlesme = paketGenlesmesi(alcak.pressureHpa, yuksek.pressureHpa);
  const lastik = lastikGostergeArtisiBar(alcak.pressureHpa, yuksek.pressureHpa);
  const fark = Math.abs(result.elevationDiffM);
  const n0 = (x: number) => Math.round(x).toLocaleString("tr-TR");
  const n1 = (x: number) => x.toLocaleString("tr-TR", { maximumFractionDigits: 1 });
  const n2 = (x: number) => x.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const ozetA = ilceOzeti(result.provinceA.id);
  const ozetB = ilceOzeti(result.provinceB.id);
  const mutfak = mutfakNotu(yuksek.elevationM);

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
    {
      question: `${trLocative(alcak.nameTr)} ve ${trLocative(yuksek.nameTr)} su kaç derecede kaynar?`,
      answer: `${trLocative(alcak.nameTr)} yaklaşık ${n1(alcak.boilingPointC)} °C, ${trLocative(yuksek.nameTr)} yaklaşık ${n1(yuksek.boilingPointC)} °C. Aradaki ${n1(alcak.boilingPointC - yuksek.boilingPointC)} derecelik fark yüzünden ${trLocative(yuksek.nameTr)} haşlama biraz daha uzun sürer.`,
    },
    {
      question: `${trAblative(alcak.nameTr)} ${trDative(yuksek.nameTr)} giderken kapalı paketler şişer mi?`,
      answer: `Evet. Hava basıncı ${n0(alcak.pressureHpa)} hPa'dan ${n0(yuksek.pressureHpa)} hPa'ya düştüğü için ${trLocative(alcak.nameTr)} kapatılan bir cips paketi ya da pet şişedeki hava ${trLocative(yuksek.nameTr)} yaklaşık %${n0((genlesme - 1) * 100)} genişlemeye çalışır; paketler gerilir, şişe açılınca fışkırabilir.`,
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
          <h2>
            {trAblative(alcak.nameTr)} {trDative(yuksek.nameTr)} Çıkınca Neler Değişir?
          </h2>
          <p>
            {yuksek.nameTr}, {trAblative(alcak.nameTr)} {n0(fark)} metre yüksekte.{" "}
            {yol > 0 && egim ? (
              <>
                İki il merkezi arası karayolu {n0(yol)} km; yol boyunca ortalama her 100 km&apos;de {n0(egim.metre100km)} metre tırmanılır (ortalama eğim {`%${n2(egim.yuzde)}`}). Gerçek yolda iniş-çıkışlar bu ortalamanın üstündedir.
              </>
            ) : null}
          </p>
          <div className="holiday-table-wrap">
            <table className="holiday-table">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">{alcak.nameTr}</th>
                  <th scope="col">{yuksek.nameTr}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Rakım</th>
                  <td>{n0(alcak.elevationM)} m</td>
                  <td>{n0(yuksek.elevationM)} m</td>
                </tr>
                <tr>
                  <th scope="row">Hava basıncı</th>
                  <td>{n0(alcak.pressureHpa)} hPa</td>
                  <td>{n0(yuksek.pressureHpa)} hPa</td>
                </tr>
                <tr>
                  <th scope="row">Her nefeste oksijen (deniz seviyesine göre)</th>
                  <td>%{n0((alcak.pressureHpa / 1013.25) * 100)}</td>
                  <td>%{n0((yuksek.pressureHpa / 1013.25) * 100)}</td>
                </tr>
                <tr>
                  <th scope="row">Su kaynama noktası</th>
                  <td>{n1(alcak.boilingPointC)} °C</td>
                  <td>{n1(yuksek.boilingPointC)} °C</td>
                </tr>
                <tr>
                  <th scope="row">1 litrelik kapalı paket</th>
                  <td>1 L</td>
                  <td>{n2(genlesme)} L&apos;ye genişlemeye çalışır</td>
                </tr>
                <tr>
                  <th scope="row">Lastik basınç saati (2,2 bar ayarlı)</th>
                  <td>2,2 bar</td>
                  <td>≈{n2(2.2 + lastik)} bar gösterir</td>
                </tr>
                {ozetA && ozetB ? (
                  <tr>
                    <th scope="row">İlçelerin rakım aralığı</th>
                    {[alcak, yuksek].map((p) => {
                      const o = p.id === result.provinceA.id ? ozetA : ozetB;
                      return (
                        <td key={p.id}>
                          {o.enAlcak.rakim < 10 ? "<10" : `≈${n0(o.enAlcak.rakim)}`}–≈{n0(o.enYuksek.rakim)} m ({o.enYuksek.ad})
                        </td>
                      );
                    })}
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
          <ul>
            <li>
              <strong>Oksijen:</strong> havadaki oksijen oranı her yerde %21&apos;dir ama {trLocative(yuksek.nameTr)} hava daha seyrek olduğu için her nefeste{" "}
              {trDative(alcak.nameTr)} göre yaklaşık %{n0((1 - yuksek.pressureHpa / alcak.pressureHpa) * 100)} daha az oksijen alınır.{" "}
              {fark >= 1500 ? "İlk günlerde merdiven ve yokuşta çabuk nefes nefese kalmak normaldir." : "Bu fark çoğu kişide fark edilmez."}
            </li>
            <li>
              <strong>Lastik:</strong> lastiğin içindeki hava değişmez ama dış basınç düştüğü için gösterge yaklaşık {n2(lastik)} bar fazla okur. Basıncı{" "}
              {trLocative(yuksek.nameTr)} ayarlıyorsanız soğuk lastikte üreticinin değerine göre ayarlayın.
            </li>
            <li>
              <strong>Mutfak ({yuksek.nameTr}):</strong> {mutfak.metin}
            </li>
          </ul>
        </section>

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
