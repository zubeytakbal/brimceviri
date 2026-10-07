import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/app/components/SiteLink";
import { notFound } from "next/navigation";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { calculateAltitudeEffect } from "../../converter/mountainAltitudeEffect";
import {
  findMountainById,
  findSimilarElevationMountains,
  getAllMountains,
} from "../../converter/mountainsHub";
import { findNearestProvince } from "../../converter/provinceElevationHub";
import { buildSiteUrl } from "../../siteConfig";
import { trDative, trGenitive } from "../../converter/turkishSuffix";
import { FIRST_ASCENTS } from "../../converter/mountainFirstAscents";

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
  const description = `${trGenitive(mountain.nameTr)} yüksekliği, göreli yüksekliği, ilk tırmanış tarihi ve zirvede hava basıncının deniz seviyesine göre yüzdesi.`;

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
  const ascent = FIRST_ASCENTS[mountain.id];
  const similarMountains = findSimilarElevationMountains(slug, 3);
  const altitudeEffect = calculateAltitudeEffect(mountain.elevationM);
  const nearestProvince = findNearestProvince(mountain.elevationM);

  const faqItems: FaqItem[] = [
    {
      question: `${mountain.nameTr} kaç metre yüksekliğinde?`,
      answer: `${mountain.nameTr}, ${mountain.rangeTr} sıradağlarında yer alır ve ${mountain.elevationM.toLocaleString("tr-TR")} metre yüksekliğindedir.`,
    },
    {
      question: `${trDative(mountain.nameTr)} ilk tırmanış ne zaman yapıldı?`,
      answer: `${trDative(mountain.nameTr)} ilk başarılı tırmanış ${mountain.firstAscentYear} yılında gerçekleştirildi.`,
    },
    {
      question: `${trDative(mountain.nameTr)} ilk kış tırmanışı ne zaman yapıldı?`,
      answer: `${trDative(mountain.nameTr)} ilk kış tırmanışı ${mountain.firstWinterAscentYear} yılında gerçekleştirildi.`,
    },
    {
      question: `${trGenitive(mountain.nameTr)} zirvesinde su kaç derecede kaynar?`,
      answer: altitudeEffect
        ? `${trGenitive(mountain.nameTr)} zirvesinde (${mountain.elevationM.toLocaleString("tr-TR")} m) su yaklaşık ${formatNumber(altitudeEffect.waterBoilingPointC)}°C'de kaynar.`
        : "",
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

        {mountain.image && (
          <figure className="mountain-hero-image">
            <Image
              src={mountain.image.url}
              alt={`${mountain.nameTr} dağının fotoğrafı`}
              width={960}
              height={640}
              style={{ width: "100%", height: "auto", borderRadius: "12px" }}
              sizes="(max-width: 768px) 100vw, 800px"
              priority={false}
            />
            <figcaption className="calculator-field-note">
              Fotoğraf: {mountain.image.photographer} —{" "}
              {mountain.image.licenseUrl ? (
                <a href={mountain.image.licenseUrl} target="_blank" rel="noopener noreferrer">
                  {mountain.image.license}
                </a>
              ) : (
                mountain.image.license
              )}
              {" "}(Wikimedia Commons)
            </figcaption>
          </figure>
        )}

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
            <div>
              <dt>İlk Kış Tırmanışı</dt>
              <dd>{mountain.firstWinterAscentYear}</dd>
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
                <div>
                  <dt>Bu İrtifada Su Kaç Derecede Kaynar?</dt>
                  <dd>{formatNumber(altitudeEffect.waterBoilingPointC)} °C</dd>
                </div>
              </>
            )}
          </dl>
          <p>
            <small>
              Basınç ve kaynama noktası standart atmosfer formülüyle hesaplanır; zirvede{" "}
              {altitudeEffect ? `oksijenin kısmi basıncı deniz seviyesinin %${Math.round(altitudeEffect.percentOfSeaLevel)}'i kadardır` : "basınç düşüktür"}.
            </small>
          </p>
        </section>

        {ascent && (
          <section className="category-article-content">
            <h2>{mountain.nameTr} İlk Tırmanışı ({mountain.firstAscentYear})</h2>
            <p>
              {mountain.nameTr} zirvesine ilk kez {mountain.firstAscentYear} yılında {ascent.expeditionTr} çıktı: {ascent.climbers}.
              {ascent.noteTr ? ` ${ascent.noteTr}` : ""} İlk kış tırmanışı {mountain.firstWinterAscentYear} yılında yapıldı.
            </p>
          </section>
        )}

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

          <p>
            <small>
              Tüm zirveler: <Link href="/dunyanin-en-yuksek-daglari">Dünyanın En Yüksek Dağları</Link>
              {nearestProvince && (
                <>
                  {" "}· rakımca en yakın il: <Link href={`/il-rakimlari/${nearestProvince.id}`}>{nearestProvince.nameTr}</Link> (
                  {nearestProvince.elevationM.toLocaleString("tr-TR")} m)
                </>
              )}
              . Kaynak: Wikidata ve dağcılık kayıtları; basınç ICAO formülüyle hesaplanmıştır.
              {mountain.image && ` Fotoğraf: ${mountain.image.photographer}, ${mountain.image.license}.`}
            </small>
          </p>
        </section>
      </div>
    </main>
  );
}
