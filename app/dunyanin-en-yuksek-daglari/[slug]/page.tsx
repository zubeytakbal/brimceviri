import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { calculateAltitudeEffect } from "../../converter/mountainAltitudeEffect";
import {
  findMountainById,
  findSimilarElevationMountains,
  getAllMountains,
} from "../../converter/mountainsHub";
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
  return getAllMountains().map((mountain) => ({ slug: mountain.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const mountain = findMountainById(slug);

  if (!mountain) {
    return { title: "Dağ bulunamadı", robots: { index: false, follow: false } };
  }

  const title = `${mountain.nameTr} Yüksekliği: ${mountain.elevationM} Metre`;
  const description = `${mountain.nameTr}'in yüksekliği, göreli yüksekliği, ilk tırmanış tarihi ve zirvede hava basıncının deniz seviyesine göre yüzdesi.`;

  return {
    title,
    description,
    alternates: { canonical: `/dunyanin-en-yuksek-daglari/${slug}` },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(`/dunyanin-en-yuksek-daglari/${slug}`),
      siteName: "BirimCeviri.app",
      locale: "tr_TR",
      type: "article",
    },
  };
}

export default async function MountainDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const mountain = findMountainById(slug);

  if (!mountain) {
    notFound();
  }

  const pageUrl = buildSiteUrl(`/dunyanin-en-yuksek-daglari/${slug}`);
  const similarMountains = findSimilarElevationMountains(slug, 3);
  const altitudeEffect = calculateAltitudeEffect(mountain.elevationM);

  const faqItems: FaqItem[] = [
    {
      question: `${mountain.nameTr} kaç metre yüksekliğinde?`,
      answer: `${mountain.nameTr}, ${mountain.rangeTr} sıradağlarında yer alır ve ${mountain.elevationM.toLocaleString("tr-TR")} metre yüksekliğindedir.`,
    },
    {
      question: `${mountain.nameTr}'e ilk tırmanış ne zaman yapıldı?`,
      answer: `${mountain.nameTr}'e ilk başarılı tırmanış ${mountain.firstAscentYear} yılında gerçekleştirildi.`,
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
        name: "Dünyanın En Yüksek Dağları",
        item: buildSiteUrl("/dunyanin-en-yuksek-daglari"),
      },
      { "@type": "ListItem", position: 3, name: mountain.nameTr, item: pageUrl },
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
          <Link href="/dunyanin-en-yuksek-daglari">Dünyanın En Yüksek Dağları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{mountain.nameTr}</span>
        </nav>

        <header className="all-conversions-header">
          <h1>{mountain.nameTr} Özellikleri</h1>
          <p>
            {mountain.nameTr}&apos;in yüksekliği, göreli yüksekliği ve
            zirvede hava basıncının deniz seviyesine göre yüzdesi.
          </p>
        </header>

        <section className="category-article-content">
          <h2>{mountain.nameTr} Temel Özellikleri</h2>
          <dl className="unit-facts">
            <div>
              <dt>Yükseklik</dt>
              <dd>{mountain.elevationM.toLocaleString("tr-TR")} m</dd>
            </div>
            <div>
              <dt>Göreli Yükseklik (Prominence)</dt>
              <dd>{mountain.prominenceM.toLocaleString("tr-TR")} m</dd>
            </div>
            <div>
              <dt>Sıradağ</dt>
              <dd>{mountain.rangeTr}</dd>
            </div>
            <div>
              <dt>Bulunduğu Ülke(ler)</dt>
              <dd>{mountain.countriesTr.join(", ")}</dd>
            </div>
            <div>
              <dt>İlk Tırmanış Yılı</dt>
              <dd>{mountain.firstAscentYear}</dd>
            </div>
            {altitudeEffect && (
              <>
                <div>
                  <dt>Zirvede Hava Basıncı</dt>
                  <dd>{formatNumber(altitudeEffect.pressureHpa)} hPa</dd>
                </div>
                <div>
                  <dt>Deniz Seviyesine Göre Basınç/Oksijen Oranı</dt>
                  <dd>%{formatNumber(altitudeEffect.percentOfSeaLevel)}</dd>
                </div>
              </>
            )}
          </dl>
          <p className="calculator-usage-hint">
            <strong>Not:</strong> Hava basıncı standart ICAO/NOAA barometrik
            formülüyle hesaplanmıştır; gerçek değer hava durumuna ve mevsime
            göre değişebilir. Oksijenin hacimsel oranı (%20,9) irtifayla
            değişmez — değişen, oksijenin kısmi basıncıdır, bu yüzden aynı
            yüzde hem basınç hem de &quot;etkili oksijen&quot; için geçerlidir.
          </p>
        </section>

        {similarMountains.length > 0 && (
          <section className="category-article-content">
            <h2>{mountain.nameTr} ile Benzer Yükseklikteki Zirveler</h2>
            <ul className="related-conversion-list">
              {similarMountains.map((similar) => (
                <li key={similar.id}>
                  <Link href={`/dunyanin-en-yuksek-daglari/${similar.id}`}>
                    {similar.nameTr}
                  </Link>{" "}
                  — {similar.elevationM.toLocaleString("tr-TR")} m
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
            Diğer zirveler için{" "}
            <Link href="/dunyanin-en-yuksek-daglari">Dünyanın En Yüksek Dağları</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Yükseklik, göreli yükseklik ve ilk tırmanış tarihi Wikipedia/Wikidata
            kaynaklı, çapraz kontrol edilmiş değerlerdir. Hava basıncı standart
            ICAO/NOAA barometrik formülüyle bu sayfada hesaplanmıştır.
          </p>
        </section>
      </div>
    </main>
  );
}
