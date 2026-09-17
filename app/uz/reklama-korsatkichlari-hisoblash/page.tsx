import type { Metadata } from "next";
import AdMetricsCalculatorUz from "../../components/calculators/AdMetricsCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";
import Link from "next/link";

const pagePath = "/uz/reklama-korsatkichlari-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "CPM, CTR va CPC qanday hisoblanadi?",
    answer:
      "CPM (Ming Ko'rsatish Uchun Xarajat) = (Xarajat / Ko'rsatishlar Soni) × 1000. CTR (Bosish Nisbati) = (Bosishlar Soni / Ko'rsatishlar Soni) × 100. CPC (Bosish Uchun Xarajat) = Xarajat / Bosishlar Soni.",
  },
  {
    question: "ROI qanday hisoblanadi?",
    answer:
      "ROI (Investitsiya Qaytimi) = ((Olingan Daromad − Xarajat) / Xarajat) × 100. Musbat ROI reklama xarajati foydali bo'lganini bildiradi.",
  },
];

export const metadata: Metadata = {
  title: "Reklama Ko'rsatkichlarini Hisoblash: CPM, CTR, CPC, ROI",
  description:
    "Xarajat, ko'rsatish va bosish sonidan CPM, CTR va CPC ni hisoblang; xarajat va daromaddan reklama investitsiya qaytimini (ROI) hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/reklam-metrikleri-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/reklam-metrikleri-hesaplama",
    },
  },
  openGraph: {
    title: "Reklama Ko'rsatkichlarini Hisoblash",
    description: "CPM, CTR, CPC va ROI hisoblash bitta sahifada.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekAdMetricsCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Reklama Ko'rsatkichlarini Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Reklama Ko&apos;rsatkichlarini Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Reklama Ko&apos;rsatkichlarini Hisoblash</h1>
          <p>
            Xarajat, ko&apos;rsatish va bosish sonini kiriting: CPM,
            CTR va CPC ni hisoblang. Pastdagi ikkinchi vosita bilan,
            xarajat va daromaddan reklama investitsiya qaytimini
            (ROI) hisoblang.
          </p>
        </header>

        <AdMetricsCalculatorUz />

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
