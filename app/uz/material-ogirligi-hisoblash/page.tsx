import type { Metadata } from "next";
import Link from "next/link";
import MaterialWeightCalculatorUz from "../../components/calculators/MaterialWeightCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/material-ogirligi-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Po'latning zichligi qancha?",
    answer:
      "Uglerodli po'latning zichligi taxminan 7850 kg/m³ (7,85 g/sm³). Zanglamaydigan po'lat turlari odatda 8000 kg/m³ atrofida bo'ladi.",
  },
  {
    question: "Material og'irligi qanday hisoblanadi?",
    answer:
      "Og'irlik (kg) = Zichlik (kg/m³) × Hajm (m³). Kichik bo'laklarda hajm odatda sm³ da o'lchanadi; bu holda Og'irlik (kg) = Zichlik (kg/m³) × Hajm (sm³) / 1.000.000.",
  },
  {
    question: "Alyuminiyning zichligi qancha?",
    answer:
      "Alyuminiyning zichligi taxminan 2700 kg/m³ (2,7 g/sm³); bu uni po'latdan (7850 kg/m³) taxminan 2,9 marta yengil qiladi.",
  },
];

export const metadata: Metadata = {
  title: "Material Zichliklari Jadvali va Og'irlik Hisoblash",
  description:
    "Po'lat, alyuminiy, mis kabi keng tarqalgan materiallarning zichlik jadvalidan, hajmdan og'irlikni yoki og'irlikdan hajmni hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/malzeme-agirligi-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/malzeme-agirligi-hesaplama",
    },
  },
  openGraph: {
    title: "Material Zichliklari Jadvali va Og'irlik Hisoblash",
    description: "Zichlik jadvalidan material og'irligi yoki hajmini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekMaterialWeightCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Material Zichliklari Jadvali va Og'irlik Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Material Zichliklari Jadvali va Og&apos;irlik Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Material Zichliklari Jadvali va Og&apos;irlik Hisoblash</h1>
          <p>
            Material tanlang, hajmini (sm³) kiriting: og&apos;irligini
            (kg) hisoblang — yoki bilgan og&apos;irligingizdan hajmni
            toping. Pastda keng tarqalgan materiallarning zichlik
            jadvalini ham topishingiz mumkin.
          </p>
        </header>

        <MaterialWeightCalculatorUz />

        <section className="category-article-content">
          <h2>Tez-tez So&apos;raladigan Savollar</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>Manbalar</h2>
          <p>
            Zichlik qiymatlari ~20°C uchun keng qabul qilingan umumiy
            muhandislik ma&apos;lumotnoma qiymatlaridir; qotishma va tur
            farqlariga qarab kichik og&apos;ishlar bo&apos;lishi mumkin.
          </p>
        </section>
      </div>
    </main>
  );
}
