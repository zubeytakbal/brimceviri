import type { Metadata } from "next";
import Link from "next/link";
import HeatingCostComparisonCalculatorUz from "../../components/calculators/HeatingCostComparisonCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/qozon-konditsioner-solishtirish";

const faqItems: FaqItem[] = [
  {
    question: "Qozonmi yoki konditsionermi arzonroq isitadi?",
    answer:
      "Bu tabiiy gaz va elektr narxining nisbatiga, qozonning samaradorligiga va konditsionerning SCOP (mavsumiy samaradorlik koeffitsienti) qiymatiga bog'liq. Umuman olganda, yuqori SCOPli (3,5 dan yuqori) invertor konditsioner mo''tadil qish kunlarida tabiiy gazga nisbatan arzonroq isitishi mumkin; ammo juda sovuq kunlarda konditsionerning samaradorligi pasaygani uchun qozon ustunlik qilishi mumkin. O'z raqamlaringiz bilan yuqoridagi hisoblagichdan aniq natijani ko'ring.",
  },
  {
    question: "1 m³ tabiiy gaz necha kWh ga teng?",
    answer:
      "Standart hisob-kitob qoidasiga ko'ra 1 m³ tabiiy gaz taxminan 10,64 kWh energiya tarkibiga ega. Bu qiymat hisob-kitoblarda ishlatiladigan rasmiy aylantirish koeffitsientidir.",
  },
  {
    question: "Konditsionerning SCOP qiymati nima, qayerdan bilib olaman?",
    answer:
      "SCOP (Seasonal Coefficient of Performance), konditsionerning bir isitish mavsumi davomidagi o'rtacha samaradorligini ko'rsatadi. Qurilmaning energiya yorlig'ida yoki foydalanish qo'llanmasida ko'rsatiladi; A sinfli invertor konditsionerlarda odatda 3,5-4 orasida bo'ladi.",
  },
];

export const metadata: Metadata = {
  title: "Qozonmi yoki Konditsionermi? Isitish Xarajati Solishtirish",
  description:
    "Tabiiy gaz va elektr narxingiz bilan qozon va konditsionerning 1 kWh issiqlik uchun xarajatini solishtiring, qaysi biri arzonroq ekanligini hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/kombi-klima-isitma-maliyeti-karsilastirma",
      "uz-UZ": pagePath,
      "x-default": "/kombi-klima-isitma-maliyeti-karsilastirma",
    },
  },
  openGraph: {
    title: "Qozonmi yoki Konditsionermi? Isitish Xarajati Solishtirish",
    description: "O'z raqamlaringiz bilan qozon va konditsionerning isitish xarajatini solishtiring.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekHeatingCostComparisonPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Qozonmi yoki Konditsionermi?", item: buildSiteUrl(pagePath) },
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
          <span>Qozonmi yoki Konditsionermi?</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Qozonmi yoki Konditsionermi? Isitish Xarajati Solishtirish</h1>
          <p>
            Tabiiy gaz va elektr narxingiz bilan, qozon va
            konditsionerning 1 kWh issiqlik uchun xarajatini
            solishtiring, o&apos;z uyingiz uchun qaysi biri arzonroq
            ekanligini ko&apos;ring.
          </p>
        </header>

        <HeatingCostComparisonCalculatorUz />

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
            Izolyatsiya qoplanishi uchun{" "}
            <Link href="/uz/izolyatsiya-qoplanishi-hisoblash">Izolyatsiya Qoplanishi Hisoblash</Link>{" "}
            sahifasiga, issiqlik o&apos;tkazish hisoblari uchun{" "}
            <Link href="/uz/issiqlik-otkazuvchanligi-hisoblash">Issiqlik O&apos;tkazuvchanligi Hisoblagichi</Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Tabiiy gaz-kWh aylantirishi standart qiymatga (1 m³ =
            10,64 kWh) asoslangan, qozon samaradorliklari va
            konditsioner SCOP qiymatlari isitish sohasida keng
            qabul qilingan odatiy ma&apos;lumotnoma oraliqlariga
            asoslangan.
          </p>
        </section>
      </div>
    </main>
  );
}
