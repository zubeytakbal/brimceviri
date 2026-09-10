import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { calculateAltitudeEffect } from "../../converter/mountainAltitudeEffect";
import {
  findNearestMountain,
  findProvinceById,
  getAllProvinces,
  getProvinceRankContext,
} from "../../converter/provinceElevationHub";
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
  return getAllProvinces().map((province) => ({ slug: province.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const province = findProvinceById(slug);

  if (!province) {
    return { title: "İl bulunamadı", robots: { index: false, follow: false } };
  }

  const title = `${province.nameTr} Rakımı: ${province.elevationM} Metre ve İrtifa Etkisi`;
  const description = `${province.nameTr}'in denizden yüksekliği, bu rakımdaki hava basıncı ve suyun kaç derecede kaynadığı.`;

  return {
    title,
    description,
    alternates: { canonical: `/il-rakimlari/${slug}` },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(`/il-rakimlari/${slug}`),
      siteName: "BirimCeviri.app",
      locale: "tr_TR",
      type: "article",
    },
  };
}

export default async function ProvinceElevationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const province = findProvinceById(slug);

  if (!province) {
    notFound();
  }

  const pageUrl = buildSiteUrl(`/il-rakimlari/${slug}`);
  const altitudeEffect = calculateAltitudeEffect(province.elevationM);
  const nearestMountain = findNearestMountain(province.elevationM);
  const rankContext = getProvinceRankContext(slug);
  const elevationDiff = nearestMountain
    ? nearestMountain.elevationM - province.elevationM
    : null;

  const faqItems: FaqItem[] = [
    {
      question: `${province.nameTr}'in rakımı kaç metre?`,
      answer: `${province.nameTr}, deniz seviyesinden ${province.elevationM.toLocaleString("tr-TR")} metre yüksekliktedir.`,
    },
    {
      question: `${province.nameTr}'de su kaç derecede kaynar?`,
      answer: altitudeEffect
        ? `${province.nameTr}'de (${province.elevationM.toLocaleString("tr-TR")} m) su yaklaşık ${formatNumber(altitudeEffect.waterBoilingPointC)}°C'de kaynar. Bu rakımda etki çok küçük olsa da, prensip aynı: irtifa arttıkça hava basıncı düşer, su daha düşük sıcaklıkta kaynar.`
        : "",
    },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "İllerin Rakımı", item: buildSiteUrl("/il-rakimlari") },
      { "@type": "ListItem", position: 3, name: province.nameTr, item: pageUrl },
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
          <Link href="/il-rakimlari">İllerin Rakımı</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{province.nameTr}</span>
        </nav>

        <header className="all-conversions-header">
          <h1>{province.nameTr} Rakımı ve İrtifa Etkisi</h1>
          <p>
            {province.nameTr}&apos;in denizden yüksekliği, bu rakımdaki
            hava basıncı ve suyun kaç derecede kaynadığı.
          </p>
        </header>

        <section className="category-article-content">
          <h2>{province.nameTr} Temel Özellikleri</h2>
          <dl className="unit-facts">
            <div>
              <dt>Rakım</dt>
              <dd>{province.elevationM.toLocaleString("tr-TR")} m</dd>
            </div>
            {altitudeEffect && (
              <>
                <div>
                  <dt>Hava Basıncı</dt>
                  <dd>{formatNumber(altitudeEffect.pressureHpa)} hPa</dd>
                </div>
                <div>
                  <dt>Deniz Seviyesine Göre Basınç Oranı</dt>
                  <dd>%{formatNumber(altitudeEffect.percentOfSeaLevel)}</dd>
                </div>
                <div>
                  <dt>Su Kaç Derecede Kaynar?</dt>
                  <dd>{formatNumber(altitudeEffect.waterBoilingPointC)} °C</dd>
                </div>
              </>
            )}
          </dl>
          <p className="calculator-usage-hint">
            <strong>Not:</strong> Hava basıncı standart ICAO/NOAA barometrik
            formülüyle, kaynama noktası ise Clausius-Clapeyron denklemiyle
            hesaplanmıştır.
          </p>
        </section>

        {rankContext && (
          <section className="category-article-content">
            <h2>Türkiye Rakım Sıralamasında {province.nameTr}</h2>
            <p>
              {province.nameTr}, Türkiye&apos;nin {rankContext.totalCount} ili
              arasında rakım sıralamasında <strong>{rankContext.rank}.</strong>{" "}
              sırada yer alır.
              {rankContext.nextHigher && (
                <>
                  {" "}Bir üst sırada{" "}
                  <Link href={`/il-rakimlari/${rankContext.nextHigher.id}`}>
                    {rankContext.nextHigher.nameTr}
                  </Link>{" "}
                  ({rankContext.nextHigher.elevationM.toLocaleString("tr-TR")} m)
                  bulunur.
                </>
              )}
              {rankContext.nextLower && (
                <>
                  {" "}Bir alt sırada ise{" "}
                  <Link href={`/il-rakimlari/${rankContext.nextLower.id}`}>
                    {rankContext.nextLower.nameTr}
                  </Link>{" "}
                  ({rankContext.nextLower.elevationM.toLocaleString("tr-TR")} m)
                  yer alır.
                </>
              )}
            </p>
          </section>
        )}

        {nearestMountain && elevationDiff !== null && (
          <section className="category-article-content">
            <h2>İlginizi Çekebilir: Dünyanın Zirveleriyle Karşılaştır</h2>
            <p>
              {province.nameTr} {province.elevationM.toLocaleString("tr-TR")}{" "}
              metre rakımdayken, dünyanın en yüksek zirvelerinden{" "}
              <Link href={`/dunyanin-en-yuksek-daglari/${nearestMountain.id}`}>
                {nearestMountain.nameTr}
              </Link>{" "}
              {nearestMountain.elevationM.toLocaleString("tr-TR")} metre — yani{" "}
              {province.nameTr}&apos;den yaklaşık{" "}
              {elevationDiff.toLocaleString("tr-TR")} metre daha yüksek.
            </p>
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
            Diğer iller için{" "}
            <Link href="/il-rakimlari">İllerin Rakımı</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Rakım değeri, il merkezi karayolu ölçümüne dayanan, birden fazla
            coğrafya kaynağıyla çapraz kontrol edilmiş değerdir. Basınç ve
            kaynama noktası standart atmosfer formülleriyle bu sayfada
            hesaplanmıştır.
          </p>
        </section>
      </div>
    </main>
  );
}
