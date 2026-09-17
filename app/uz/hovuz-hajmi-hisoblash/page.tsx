import type { Metadata } from "next";
import Link from "next/link";
import PoolVolumeCalculatorUz from "../../components/calculators/PoolVolumeCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/hovuz-hajmi-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Hovuz hajmi qanday hisoblanadi?",
    answer:
      "To'rtburchak hovuzlarda Hajm (m³) = Uzunlik × Kenglik × O'rtacha Chuqurlik formulasi ishlatiladi. Yumaloq hovuzlarda esa Hajm (m³) = π × (Diametr/2)² × O'rtacha Chuqurlik formulasi ishlatiladi.",
  },
  {
    question: "O'rtacha chuqurlik qanday topiladi?",
    answer:
      "Sayoz va chuqur uchlari farqli hovuzlarda o'rtacha chuqurlik, (sayoz uch chuqurligi + chuqur uch chuqurligi) / 2 formulasi bilan taxminan hisoblanishi mumkin.",
  },
];

export const metadata: Metadata = {
  title: "Hovuz Hajmi Hisoblash (m³)",
  description:
    "To'rtburchak yoki yumaloq hovuzlarning o'lchamlaridan kub metr (m³) hisobida suv hajmini hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/havuz-hacmi-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/havuz-hacmi-hesaplama",
    },
  },
  openGraph: {
    title: "Hovuz Hajmi Hisoblash (m³)",
    description: "Hovuz o'lchamlaridan suv hajmini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekPoolVolumeCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Hovuz Hajmi Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Hovuz Hajmi Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Hovuz Hajmi Hisoblash</h1>
          <p>
            To&apos;rtburchak yoki yumaloq hovuzingizning
            o&apos;lchamlarini kiriting: suv hajmini kub metr (m³)
            hisobida hisoblang.
          </p>
        </header>

        <PoolVolumeCalculatorUz />

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
            Xlor dozasini hisoblash uchun{" "}
            <Link href="/uz/xlor-dozasi-hisoblash">Xlor Dozasi Hisoblash</Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>
        </section>
      </div>
    </main>
  );
}
