import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { calculateAltitudeEffect } from "../../../converter/mountainAltitudeEffect";
import {
  findNearestMountainUz,
  findRegionById,
  getAllRegions,
  getRegionRankContext,
} from "../../../converter/regionElevationHubUz";
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
  return getAllRegions().map((region) => ({ slug: region.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const region = findRegionById(slug);

  if (!region) {
    return { title: "Hudud topilmadi", robots: { index: false, follow: false } };
  }

  const title = `${region.name} Balandligi: ${region.elevationM} Metr va Balandlik Ta'siri`;
  const description = `${region.name} (${region.centerCity})ning dengiz sathidan balandligi, bu balandlikdagi havo bosimi va suvning necha darajada qaynashi.`;

  return {
    title,
    description,
    alternates: { canonical: `/uz/viloyatlar-balandligi/${slug}` },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(`/uz/viloyatlar-balandligi/${slug}`),
      siteName: "BirimCeviri.app",
      locale: "uz_UZ",
      type: "article",
    },
  };
}

export default async function UzbekRegionElevationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const region = findRegionById(slug);

  if (!region) {
    notFound();
  }

  const pageUrl = buildSiteUrl(`/uz/viloyatlar-balandligi/${slug}`);
  const altitudeEffect = calculateAltitudeEffect(region.elevationM);
  const nearestMountain = findNearestMountainUz(region.elevationM);
  const rankContext = getRegionRankContext(slug);
  const elevationDiff = nearestMountain
    ? nearestMountain.elevationM - region.elevationM
    : null;

  const faqItems: FaqItem[] = [
    {
      question: `${region.name}ning balandligi necha metr?`,
      answer: `${region.name} markazi (${region.centerCity}), dengiz sathidan ${region.elevationM.toLocaleString("uz-UZ")} metr balandlikdadir.`,
    },
    {
      question: `${region.name}da suv necha darajada qaynaydi?`,
      answer: altitudeEffect
        ? `${region.name}da (${region.elevationM.toLocaleString("uz-UZ")} m) suv taxminan ${formatNumber(altitudeEffect.waterBoilingPointC)}°C da qaynaydi. Bu balandlikda ta'sir juda kichik bo'lsa ham, printsip bir xil: balandlik oshgani sari havo bosimi pasayadi, suv pastroq haroratda qaynaydi.`
        : "",
    },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Viloyatlar Balandligi", item: buildSiteUrl("/uz/viloyatlar-balandligi") },
      { "@type": "ListItem", position: 3, name: region.name, item: pageUrl },
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
          <Link href="/uz/viloyatlar-balandligi">Viloyatlar Balandligi</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{region.name}</span>
        </nav>

        <header className="all-conversions-header">
          <h1>{region.name} Balandligi va Balandlik Ta&apos;siri</h1>
          <p>
            {region.name} ({region.centerCity})ning dengiz sathidan
            balandligi, bu balandlikdagi havo bosimi va suvning necha
            darajada qaynashi.
          </p>
        </header>

        <section className="category-article-content">
          <h2>{region.name} Asosiy Xususiyatlari</h2>
          <dl className="unit-facts">
            <div>
              <dt>Markaz</dt>
              <dd>{region.centerCity}</dd>
            </div>
            <div>
              <dt>Balandlik</dt>
              <dd>{region.elevationM.toLocaleString("uz-UZ")} m</dd>
            </div>
            {altitudeEffect && (
              <>
                <div>
                  <dt>Havo Bosimi</dt>
                  <dd>{formatNumber(altitudeEffect.pressureHpa)} hPa</dd>
                </div>
                <div>
                  <dt>Dengiz Sathiga Nisbatan Bosim Nisbati</dt>
                  <dd>%{formatNumber(altitudeEffect.percentOfSeaLevel)}</dd>
                </div>
                <div>
                  <dt>Suv Necha Darajada Qaynaydi?</dt>
                  <dd>{formatNumber(altitudeEffect.waterBoilingPointC)} °C</dd>
                </div>
              </>
            )}
          </dl>
          <p className="calculator-usage-hint">
            <strong>Eslatma:</strong> Havo bosimi standart ICAO/NOAA
            barometrik formulasi bilan, qaynash nuqtasi esa
            Klauzius-Klapeyron tenglamasi bilan hisoblangan.
          </p>
        </section>

        {rankContext && (
          <section className="category-article-content">
            <h2>O&apos;zbekiston Balandlik Reytingida {region.name}</h2>
            <p>
              {region.name}, O&apos;zbekistonning {rankContext.totalCount} ta
              hududi orasida balandlik reytingida{" "}
              <strong>{rankContext.rank}.</strong> o&apos;rinda turadi.
              {rankContext.nextHigher && (
                <>
                  {" "}Bir yuqori o&apos;rinda{" "}
                  <Link href={`/uz/viloyatlar-balandligi/${rankContext.nextHigher.id}`}>
                    {rankContext.nextHigher.name}
                  </Link>{" "}
                  ({rankContext.nextHigher.elevationM.toLocaleString("uz-UZ")} m)
                  joylashgan.
                </>
              )}
              {rankContext.nextLower && (
                <>
                  {" "}Bir past o&apos;rinda esa{" "}
                  <Link href={`/uz/viloyatlar-balandligi/${rankContext.nextLower.id}`}>
                    {rankContext.nextLower.name}
                  </Link>{" "}
                  ({rankContext.nextLower.elevationM.toLocaleString("uz-UZ")} m)
                  turadi.
                </>
              )}
            </p>
          </section>
        )}

        {nearestMountain && elevationDiff !== null && (
          <section className="category-article-content">
            <h2>Sizni Qiziqtirishi Mumkin: Dunyo Cho&apos;qqilari Bilan Solishtiring</h2>
            <p>
              {region.name} {region.elevationM.toLocaleString("uz-UZ")}{" "}
              metr balandlikda bo&apos;lsa, dunyoning eng baland
              cho&apos;qqilaridan{" "}
              <Link href={`/uz/dunyoning-eng-baland-toglari/${nearestMountain.id}`}>
                {nearestMountain.nameUz}
              </Link>{" "}
              {nearestMountain.elevationM.toLocaleString("uz-UZ")} metr — ya&apos;ni{" "}
              {region.name}dan taxminan{" "}
              {elevationDiff.toLocaleString("uz-UZ")} metr balandroq.
            </p>
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
            Boshqa hududlar uchun{" "}
            <Link href="/uz/viloyatlar-balandligi">Viloyatlar Balandligi</Link>{" "}
            sahifasiga, ikkita hududni solishtirish uchun{" "}
            <Link href="/uz/viloyat-balandligini-solishtirish">
              Viloyat Balandligini Solishtirish
            </Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Balandlik qiymati {region.centerCity} shahri
            koordinatalari uchun Open-Elevation ochiq API&apos;si
            (SRTM asosidagi raqamli balandlik modeli) orqali
            to&apos;g&apos;ridan-to&apos;g&apos;ri so&apos;rov
            yuborilib olingan. Bosim va qaynash nuqtasi standart
            atmosfera formulalari bilan bu sahifada hisoblangan.
          </p>
        </section>
      </div>
    </main>
  );
}
