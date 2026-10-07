import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { getAllRegions } from "../../converter/regionElevationHubUz";
import { calculateAltitudeEffect } from "../../converter/mountainAltitudeEffect";
import { buildFullLanguageAlternates } from "../../i18n/routing";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/viloyatlar-balandligi";

const faqItems: FaqItem[] = [
  {
    question: "O'zbekistonning eng baland hududi qaysi?",
    answer: "Samarqand viloyati, taxminan 737 metr bilan O'zbekistonning eng baland (viloyat markazi bo'yicha) hududidir.",
  },
  {
    question: "O'zbekistonning eng past hududi qaysi?",
    answer: "Qoraqalpog'iston Respublikasi (Nukus), taxminan 77 metr bilan O'zbekistonning eng past hududidir.",
  },
];

export const metadata: Metadata = {
  title: "Viloyatlar Balandligi: O'zbekistonning 14 Hududining Balandligi",
  description:
    "O'zbekistonning 14 ma'muriy hududi markazining dengiz sathidan balandligini, o'sha balandlikdagi havo bosimini va suvning necha darajada qaynashini ko'ring.",
  alternates: {
    canonical: pagePath,
    ...buildFullLanguageAlternates(pagePath),
  },
  openGraph: {
    title: "Viloyatlar Balandligi: O'zbekistonning 14 Hududining Balandligi",
    description: "O'zbekistonning 14 hududining balandligini va balandlik ta'sirini solishtiring.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekRegionElevationHubPage() {
  const regions = getAllRegions().slice().sort((a, b) => b.elevationM - a.elevationM);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Viloyatlar Balandligi", item: buildSiteUrl(pagePath) },
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
          <span>Viloyatlar Balandligi</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Viloyatlar Balandligi va Balandlik Ta&apos;siri</h1>
          <p>
            O&apos;zbekistonning {regions.length} ta ma&apos;muriy
            hududi markazining dengiz sathidan balandligini,
            o&apos;sha balandlikdagi havo bosimini va suvning necha
            darajada qaynashini ko&apos;ring.
          </p>
        </header>

        <section className="category-article-content">
          <h2>Hududlar (balandlik bo&apos;yicha tartiblangan)</h2>
          <div className="holiday-table-wrap">
            <table className="holiday-table">
              <thead>
                <tr>
                  <th scope="col">Hudud</th>
                  <th scope="col">Markaz</th>
                  <th scope="col">Balandlik</th>
                  <th scope="col">Havo bosimi</th>
                  <th scope="col">Suv qaynashi</th>
                </tr>
              </thead>
              <tbody>
                {regions.map((region) => {
                  const e = calculateAltitudeEffect(region.elevationM);
                  return (
                    <tr key={region.id} id={region.id}>
                      <th scope="row">{region.name}</th>
                      <td>{region.centerCity}</td>
                      <td>{region.elevationM.toLocaleString("uz-UZ")} m</td>
                      <td>{e ? `${Math.round(e.pressureHpa).toLocaleString("uz-UZ")} hPa (${e.percentOfSeaLevel.toFixed(1)}%)` : "—"}</td>
                      <td>{e ? `${e.waterBoilingPointC.toFixed(1)} °C` : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p>
            Eng baland markaz {regions[0].name} ({regions[0].elevationM.toLocaleString("uz-UZ")} m), eng pasti{" "}
            {regions[regions.length - 1].name} ({regions[regions.length - 1].elevationM.toLocaleString("uz-UZ")} m). Farq{" "}
            {(regions[0].elevationM - regions[regions.length - 1].elevationM).toLocaleString("uz-UZ")} m; bu farq suvning
            qaynash haroratini taxminan{" "}
            {(
              (calculateAltitudeEffect(regions[regions.length - 1].elevationM)?.waterBoilingPointC ?? 0) -
              (calculateAltitudeEffect(regions[0].elevationM)?.waterBoilingPointC ?? 0)
            ).toFixed(1)}{" "}
            °C ga o&apos;zgartiradi. Havo bosimi xalqaro standart atmosfera formulasi bilan hisoblangan.
          </p>

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
            Ikkita hududni solishtirish uchun{" "}
            <Link href="/uz/viloyat-balandligini-solishtirish">Viloyat Balandligini Solishtirish</Link>{" "}
            sahifasiga, dunyoning eng baland cho&apos;qqilari bilan
            solishtirish uchun{" "}
            <Link href="/uz/dunyoning-eng-baland-toglari">Dunyoning Eng Baland Tog&apos;lari</Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Balandlik qiymatlari har bir hudud markazining
            koordinatalari uchun Open-Elevation ochiq API&apos;si
            (SRTM asosidagi raqamli balandlik modeli) orqali
            to&apos;g&apos;ridan-to&apos;g&apos;ri so&apos;rov
            yuborilib olingan, barchasi bir xil uslub bilan.
          </p>
        </section>
      </div>
    </main>
  );
}
