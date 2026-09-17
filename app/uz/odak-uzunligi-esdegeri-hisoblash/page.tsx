import type { Metadata } from "next";
import Link from "next/link";
import FocalLengthEquivalentCalculatorUz from "../../components/calculators/FocalLengthEquivalentCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/odak-uzunligi-esdegeri-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Crop factor (kesish koeffitsienti) nima?",
    answer:
      "Crop factor kameraning sensor o'lchamining 35mm to'liq kadr (full frame) sensoriga nisbatidir. Sensor kichraygan sari, bir xil linza torroq burchakni qamrab oladi; bu esa linzaning to'liq kadr ekvivalent fokus masofasining ortishini anglatadi.",
  },
  {
    question: "Ekvivalent fokus masofasi qanday hisoblanadi?",
    answer:
      "Ekvivalent Fokus Masofasi = Linzaning Haqiqiy Fokus Masofasi (mm) × Crop Factor. Masalan 50mm linza, 1,5 crop factorli APS-C kamerada 75mm to'liq kadr linzasiga o'xshash ko'rish burchagini beradi.",
  },
  {
    question: "Crop factor diafragmani (f-sonini) ham o'zgartiradimi?",
    answer:
      "Yo'q, yozilgan f-soni (yorug'lik miqdori) o'zgarmaydi. Ammo maydon chuqurligi nuqtayi nazaridan ba'zi fotograflar 'ekvivalent diafragma' (f-soni × crop factor) tushunchasidan ham foydalanadi; bu sahifa faqat ko'rish burchagi ekvivalentini hisoblaydi.",
  },
];

export const metadata: Metadata = {
  title: "Fokus Masofasi Ekvivalenti Hisoblash (Crop Factor)",
  description:
    "Linza fokus masofasidan APS-C, Micro Four Thirds va boshqa sensor formatlari uchun to'liq kadr (full frame) ekvivalent fokus masofasini hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/odak-uzakligi-esdegeri-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/odak-uzakligi-esdegeri-hesaplama",
    },
  },
  openGraph: {
    title: "Fokus Masofasi Ekvivalenti Hisoblash (Crop Factor)",
    description: "Sensor formatiga qarab to'liq kadr ekvivalent fokus masofasini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekFocalLengthEquivalentCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Fokus Masofasi Ekvivalenti Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Fokus Masofasi Ekvivalenti Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Fokus Masofasi Ekvivalenti Hisoblash</h1>
          <p>
            Linzangizning haqiqiy fokus masofasini kiriting, kameraning
            sensor formatiga qarab to&apos;liq kadr (full frame)
            ekvivalentini va boshqa barcha formatlardagi mos
            qiymatlarini bitta jadvalda ko&apos;ring.
          </p>
        </header>

        <FocalLengthEquivalentCalculatorUz />

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
            Boshqa fotografiya vositalari uchun{" "}
            <Link href="/uz/pozlama-esdegeri-hisoblash">
              Pozlama Ekvivalenti Hisoblash
            </Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>
        </section>
      </div>
    </main>
  );
}
