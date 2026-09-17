import type { Metadata } from "next";
import Link from "next/link";
import KeresteCalculatorUz from "../../components/calculators/KeresteCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/yogoch-hajmi-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Yog'och kub metr hisobi qanday qilinadi?",
    answer:
      "Yog'och hajmi uzunlik (m) × kenglik (sm/100) × qalinlik (sm/100) formulasi bilan hisoblanadi. Bir nechta yog'och bo'lagi uchun har bir bo'lakning hajmi soniga ko'paytirilib qo'shiladi.",
  },
  {
    question: "Zaxira ulushi nega qo'shiladi?",
    answer:
      "Kesish, randalash va ishlov berish paytida yog'och hajmining bir qismi yo'qoladi. Bu yo'qotishni qoplash uchun buyurtma berishda hisoblangan hajmga odatda %5-10 oralig'ida zaxira ulushi qo'shiladi.",
  },
];

export const metadata: Metadata = {
  title: "Yog'och Kub Metrini Hisoblash",
  description:
    "Yog'och bo'laklarining uzunligi, kengligi, qalinligi va sonidan jami hajmni (m³) va zaxira dahil jamini hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/kereste-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/kereste-hesaplama",
    },
  },
  openGraph: {
    title: "Yog'och Kub Metrini Hisoblash",
    description: "Yog'och hajmini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekKeresteCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Yog'och Kub Metrini Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Yog&apos;och Kub Metrini Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Yog&apos;och Kub Metrini Hisoblash</h1>
          <p>
            Yog&apos;och bo&apos;laklarining uzunligi, kengligi,
            qalinligi va sonini kiriting: jami hajmni va zaxira dahil
            jamini darhol hisoblang.
          </p>
        </header>

        <KeresteCalculatorUz />

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
            Formula asosiy geometriya hajm hisobiga asoslangan. Zaxira
            ulushi umumiy mos yozuv qiymati; material turiga va ishlov
            berish usuliga qarab o&apos;zgarishi mumkin.
          </p>
        </section>
      </div>
    </main>
  );
}
