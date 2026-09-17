import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { calculateAltitudeEffect } from "../../../converter/mountainAltitudeEffect";
import {
  findMountainByIdUz,
  findSimilarElevationMountainsUz,
  getAllMountainsUz,
} from "../../../converter/mountainsDatabaseUz";
import { findNearestRegion } from "../../../converter/regionElevationHubUz";
import { buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatNumber(value: number): string {
  return value.toLocaleString("uz-UZ", { maximumFractionDigits: 1 });
}

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function generateStaticParams() {
  return getAllMountainsUz().map((mountain) => ({ slug: mountain.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const mountain = findMountainByIdUz(slug);

  if (!mountain) {
    return { title: "Tog' topilmadi", robots: { index: false, follow: false } };
  }

  const title = `${mountain.nameUz} Balandligi: ${mountain.elevationM} Metr`;
  const description = `${mountain.nameUz}ning balandligi, nisbiy balandligi, birinchi chiqish sanasi va cho'qqidagi havo bosimining dengiz sathiga nisbatan foizi.`;

  return {
    title,
    description,
    alternates: { canonical: `/uz/dunyoning-eng-baland-toglari/${slug}` },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(`/uz/dunyoning-eng-baland-toglari/${slug}`),
      siteName: "BirimCeviri.app",
      locale: "uz_UZ",
      type: "article",
    },
  };
}

export default async function UzbekMountainDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const mountain = findMountainByIdUz(slug);

  if (!mountain) {
    notFound();
  }

  const pageUrl = buildSiteUrl(`/uz/dunyoning-eng-baland-toglari/${slug}`);
  const similarMountains = findSimilarElevationMountainsUz(slug, 3);
  const altitudeEffect = calculateAltitudeEffect(mountain.elevationM);
  const nearestRegion = findNearestRegion(mountain.elevationM);

  const faqItems: FaqItem[] = [
    {
      question: `${mountain.nameUz} necha metr balandlikda?`,
      answer: `${mountain.nameUz}, ${mountain.rangeUz} tog' tizimida joylashgan va ${mountain.elevationM.toLocaleString("uz-UZ")} metr balandlikdadir.`,
    },
    {
      question: `${mountain.nameUz}ga birinchi chiqish qachon amalga oshirilgan?`,
      answer: `${mountain.nameUz}ga birinchi muvaffaqiyatli chiqish ${mountain.firstAscentYear}-yilda amalga oshirilgan.`,
    },
    {
      question: `${mountain.nameUz}ga birinchi qishki chiqish qachon amalga oshirilgan?`,
      answer: `${mountain.nameUz}ga birinchi qishki chiqish ${mountain.firstWinterAscentYear}-yilda amalga oshirilgan. Qish sharoitida (o'ta sovuq, qisqa kun yorug'ligi, kuchli shamol) chiqish yoz mavsumiga qaraganda ancha qiyin hisoblanadi.`,
    },
    {
      question: `${mountain.nameUz}ning cho'qqisida suv necha darajada qaynaydi?`,
      answer: altitudeEffect
        ? `${mountain.nameUz}ning cho'qqisida (${mountain.elevationM.toLocaleString("uz-UZ")} m) suv taxminan ${formatNumber(altitudeEffect.waterBoilingPointC)}°C da qaynaydi — dengiz sathidagi 100°C ga qaraganda ancha past, chunki qaynash nuqtasi atrof-muhit bosimiga bog'liq va balandlik oshgani sari bosim pasayadi.`
        : "",
    },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Dunyoning Eng Baland Tog'lari",
        item: buildSiteUrl("/uz/dunyoning-eng-baland-toglari"),
      },
      { "@type": "ListItem", position: 3, name: mountain.nameUz, item: pageUrl },
    ],
  };

  return (
    <main className="all-conversions-page" lang="uz">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sahifa yo'li">
          <Link href="/uz">Bosh sahifa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/uz/dunyoning-eng-baland-toglari">Dunyoning Eng Baland Tog&apos;lari</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{mountain.nameUz}</span>
        </nav>

        <header className="all-conversions-header">
          <h1>{mountain.nameUz} Xususiyatlari</h1>
          <p>
            {mountain.nameUz}ning balandligi, nisbiy balandligi va
            cho&apos;qqidagi havo bosimining dengiz sathiga nisbatan
            foizi.
          </p>
        </header>

        {mountain.image && (
          <figure className="mountain-hero-image">
            <Image
              src={mountain.image.url}
              alt={`${mountain.nameUz} tog'ining fotosurati`}
              width={960}
              height={640}
              style={{ width: "100%", height: "auto", borderRadius: "12px" }}
              sizes="(max-width: 768px) 100vw, 800px"
              priority={false}
            />
            <figcaption className="calculator-field-note">
              Foto: {mountain.image.photographer} —{" "}
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
          <h2>{mountain.nameUz} Asosiy Xususiyatlari</h2>
          <dl className="unit-facts">
            <div>
              <dt>Balandlik</dt>
              <dd>{mountain.elevationM.toLocaleString("uz-UZ")} m</dd>
            </div>
            <div>
              <dt>Nisbiy Balandlik (Prominence)</dt>
              <dd>{mountain.prominenceM.toLocaleString("uz-UZ")} m</dd>
            </div>
            <div>
              <dt>Tog&apos; Tizimi</dt>
              <dd>{mountain.rangeUz}</dd>
            </div>
            <div>
              <dt>Joylashgan Mamlakat(lar)</dt>
              <dd>{mountain.countriesUz.join(", ")}</dd>
            </div>
            <div>
              <dt>Birinchi Chiqish Yili</dt>
              <dd>{mountain.firstAscentYear}</dd>
            </div>
            <div>
              <dt>Birinchi Qishki Chiqish</dt>
              <dd>{mountain.firstWinterAscentYear}</dd>
            </div>
            {altitudeEffect && (
              <>
                <div>
                  <dt>Cho&apos;qqidagi Havo Bosimi</dt>
                  <dd>{formatNumber(altitudeEffect.pressureHpa)} hPa</dd>
                </div>
                <div>
                  <dt>Dengiz Sathiga Nisbatan Bosim/Kislorod Nisbati</dt>
                  <dd>%{formatNumber(altitudeEffect.percentOfSeaLevel)}</dd>
                </div>
                <div>
                  <dt>Bu Balandlikda Suv Necha Darajada Qaynaydi?</dt>
                  <dd>{formatNumber(altitudeEffect.waterBoilingPointC)} °C</dd>
                </div>
              </>
            )}
          </dl>
          <p className="calculator-usage-hint">
            <strong>Eslatma:</strong> Havo bosimi standart ICAO/NOAA
            barometrik formulasi bilan hisoblangan; haqiqiy qiymat
            ob-havo va mavsumga qarab o&apos;zgarishi mumkin.
            Kislorodning hajmiy nisbati (%20,9) balandlik bilan
            o&apos;zgarmaydi — o&apos;zgaradigani kislorodning qisman
            bosimi, shuning uchun bir xil foiz ham bosim, ham
            &quot;samarali kislorod&quot; uchun to&apos;g&apos;ri
            keladi. Qaynash nuqtasi, pasayuvchi bosimga bog&apos;liq
            holda Klauzius-Klapeyron tenglamasi bilan hisoblangan —
            shuning uchun baland joyda ovqat pishirish uzoqroq
            davom etadi, chunki suv pastroq haroratda qaynaydi.
          </p>
        </section>

        {similarMountains.length > 0 && (
          <section className="category-article-content">
            <h2>{mountain.nameUz} Bilan O&apos;xshash Balandlikdagi Cho&apos;qqilar</h2>
            <ul className="related-conversion-list">
              {similarMountains.map((similar) => (
                <li key={similar.id}>
                  <Link href={`/uz/dunyoning-eng-baland-toglari/${similar.id}`}>
                    {similar.nameUz}
                  </Link>{" "}
                  — {similar.elevationM.toLocaleString("uz-UZ")} m
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="category-article-content">
          <h2>Tez-tez So&apos;raladigan Savollar</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>Tegishli vositalar</h2>
          <p>
            Boshqa cho&apos;qqilar uchun{" "}
            <Link href="/uz/dunyoning-eng-baland-toglari">Dunyoning Eng Baland Tog&apos;lari</Link>{" "}
            sahifasiga, O&apos;zbekiston viloyatlarining balandligi bilan
            solishtirish uchun{" "}
            <Link href="/uz/viloyatlar-balandligi">Viloyatlar Balandligi</Link>{" "}
            sahifasiga qarashingiz mumkin.
            {nearestRegion && (
              <>
                {" "}O&apos;zbekiston viloyatlari orasida balandlik
                bo&apos;yicha eng yaqin mos yozuv nuqtasi{" "}
                <Link href={`/uz/viloyatlar-balandligi/${nearestRegion.id}`}>
                  {nearestRegion.name}
                </Link>
                {" "}({nearestRegion.elevationM.toLocaleString("uz-UZ")} m) — baribir{" "}
                {mountain.nameUz}dan minglab metr pastroq.
              </>
            )}
          </p>

          <h2>Manbalar</h2>
          <p>
            Balandlik, nisbiy balandlik, birinchi chiqish va birinchi
            qishki chiqish sanalari Wikipedia/Wikidata va tog&apos;chilik
            manbalaridan (American Alpine Club, Planetmountain,
            Explorersweb) o&apos;zaro tekshirilgan qiymatlardir. Havo
            bosimi standart ICAO/NOAA barometrik formulasi bilan bu
            sahifada hisoblangan.
            {mountain.image && (
              <>
                {" "}Foto Wikimedia Commons&apos;dan,{" "}
                {mountain.image.photographer} tomonidan{" "}
                {mountain.image.license} litsenziyasi bilan
                ulashilgan.
              </>
            )}
          </p>
        </section>
      </div>
    </main>
  );
}
