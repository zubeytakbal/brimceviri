import type { Metadata } from "next";
import Link from "next/link";
import VideoBitrateCalculatorUz from "../../components/calculators/VideoBitrateCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/video-bit-tezligi-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Video fayl hajmi bit tezligidan qanday hisoblanadi?",
    answer:
      "Fayl Hajmi (MB) = Bit Tezligi (Mbps) × Davomiylik (soniya) / 8. Masalan 8 Mbps bit tezligi bilan kodlangan 10 daqiqalik (600 soniya) video: 8 × 600 / 8 = 600 MB.",
  },
  {
    question: "Maqsadli fayl hajmi uchun qaysi bit tezligini tanlashim kerak?",
    answer:
      "Bit Tezligi (Mbps) = Fayl Hajmi (MB) × 8 / Davomiylik (soniya) formulasi bilan, ma'lum bir fayl hajmiga sig'ish uchun kerakli bit tezligini hisoblashingiz mumkin.",
  },
];

export const metadata: Metadata = {
  title: "Video Bit Tezligi va Fayl Hajmi Hisoblash",
  description:
    "Bit tezligi (Mbps) va davomiylikdan video fayl hajmini (MB), yoki maqsadli fayl hajmidan kerakli bit tezligini hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/video-bit-hizi-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/video-bit-hizi-hesaplama",
    },
  },
  openGraph: {
    title: "Video Bit Tezligi va Fayl Hajmi Hisoblash",
    description: "Bit tezligi va fayl hajmi orasida hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekVideoBitrateCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Video Bit Tezligi va Fayl Hajmi Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Video Bit Tezligi va Fayl Hajmi Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Video Bit Tezligi va Fayl Hajmi Hisoblash</h1>
          <p>
            Bit tezligidan (Mbps) fayl hajmini (MB), yoki maqsadli
            fayl hajmidan kerakli bit tezligini hisoblang.
          </p>
        </header>

        <VideoBitrateCalculatorUz />

        <section className="category-article-content">
          <h2>Tez-tez So&apos;raladigan Savollar</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}
        </section>
      </div>
    </main>
  );
}
