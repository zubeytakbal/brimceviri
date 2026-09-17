import type { Metadata } from "next";
import Link from "next/link";
import ElementMeltingBoilingCalculatorUz from "../../components/calculators/ElementMeltingBoilingCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/erish-qaynash-nuqtasi-aylantirgich";

const faqItems: FaqItem[] = [
  {
    question: "Erish va qaynash nuqtasi nima?",
    answer:
      "Erish nuqtasi — moddaning qattiq holatdan suyuq holatga o'tadigan; qaynash nuqtasi esa suyuq holatdan gaz holatiga o'tadigan haroratdir. Bu qiymatlar standart atmosfera bosimida (101,325 kPa) aniqlanadi.",
  },
  {
    question: "Qaysi element eng yuqori erish nuqtasiga ega?",
    answer:
      "Bu jadvaldagi elementlar orasida volfram (3422°C) barcha metallar ichida eng yuqori erish nuqtasiga ega. Shuning uchun lampa filamenti va payvandlash elektrodlarida ishlatiladi.",
  },
  {
    question: "Xona haroratida suyuq holatda bo'ladigan yagona metall qaysi?",
    answer:
      "Simob (Hg) -38,83°C kabi juda past erish nuqtasiga ega bo'lgani uchun xona haroratida suyuq holatda bo'ladigan yagona metalldir.",
  },
];

export const metadata: Metadata = {
  title: "Element Erish va Qaynash Nuqtasi Aylantirgich (°C, °F, K)",
  description:
    "Elementni tanlang: erish va qaynash nuqtasini °C, °F va Kelvinda bir vaqtda ko'ring. 27 elementning erish/qaynash nuqtasi jadvali kiritilgan.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/erime-kaynama-noktasi-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/erime-kaynama-noktasi-hesaplama",
    },
  },
  openGraph: {
    title: "Element Erish va Qaynash Nuqtasi Aylantirgich (°C, °F, K)",
    description: "Elementni tanlang, erish va qaynash nuqtasini uchta harorat birligida ko'ring.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekElementMeltingBoilingPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Element Erish va Qaynash Nuqtasi Aylantirgich", item: buildSiteUrl(pagePath) },
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
          <span>Element Erish va Qaynash Nuqtasi Aylantirgich</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Element Erish va Qaynash Nuqtasi Aylantirgich</h1>
          <p>
            Elementni tanlang: erish va qaynash nuqtasini °C, °F va
            Kelvinda bir vaqtda ko&apos;ring. Pastda 27 elementning
            erish/qaynash nuqtasi jadvalini ham topishingiz mumkin.
          </p>
        </header>

        <ElementMeltingBoilingCalculatorUz />

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
            Erish va qaynash nuqtasi qiymatlari, standart atmosfera
            bosimi (101,325 kPa) uchun CRC Handbook of Chemistry and
            Physics manbasidagi ma&apos;lumotnoma ma&apos;lumotlariga
            asoslangan.
          </p>
        </section>
      </div>
    </main>
  );
}
