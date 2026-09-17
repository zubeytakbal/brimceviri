import type { Metadata } from "next";
import Link from "next/link";
import AntennaLengthCalculatorUz from "../../components/calculators/AntennaLengthCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/anten-uzunligi-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Dipol anten uzunligi qanday hisoblanadi?",
    answer:
      "Yarim to'lqin dipol anten uzunligi (metr) = 142,5 / Chastota (MHz) formulasi bilan hisoblanadi. Bu formula uch effektini (end effect) hisobga oluvchi amaliy koeffitsientni o'z ichiga oladi.",
  },
  {
    question: "Chorak to'lqin vertikal anten uzunligi qanday hisoblanadi?",
    answer:
      "Chorak to'lqin vertikal anten yarim to'lqin dipolning yarmiga teng: Uzunlik (metr) = 71,25 / Chastota (MHz).",
  },
  {
    question: "To'liq to'lqin uzunligi bilan amaliy anten uzunligi nima uchun farq qiladi?",
    answer:
      "To'liq to'lqin uzunligi (λ = 300/f) bo'sh fazodagi nazariy qiymatdir. Haqiqiy antenda o'tkazgichning qalinligi va uchlardagi sig'im effekti (end effect) tufayli amaliy anten uzunligi nazariy qiymatdan biroz qisqaroq bo'ladi; shuning uchun 142,5 va 71,25 kabi tuzatilgan koeffitsientlar ishlatiladi.",
  },
];

export const metadata: Metadata = {
  title: "Anten Uzunligi Hisoblash (Dipol / Vertikal)",
  description:
    "Chastotadan (MHz) yarim to'lqin dipol va chorak to'lqin vertikal anten uzunligini hisoblang; yoki qo'lingizdagi anten uzunligidan rezonans chastotasini toping.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/anten-uzunlugu-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/anten-uzunlugu-hesaplama",
    },
  },
  openGraph: {
    title: "Anten Uzunligi Hisoblash (Dipol / Vertikal)",
    description: "Chastotadan anten uzunligini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekAntennaLengthCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Anten Uzunligi Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Anten Uzunligi Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Anten Uzunligi Hisoblash</h1>
          <p>
            Ishlamoqchi bo&apos;lgan chastotani (MHz) kiriting: yarim
            to&apos;lqin dipol va chorak to&apos;lqin vertikal anten
            uzunliklarini hisoblang. Yoki qo&apos;lingizdagi dipol
            uzunligidan qaysi chastotaga rezonans qilishini toping.
          </p>
        </header>

        <AntennaLengthCalculatorUz />

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
            Formulalar havaskor radioaloqada keng qo&apos;llaniladigan
            amaliy anten uzunligi bog&apos;liqliklariga asoslangan.
            Haqiqiy samaradorlik uchun anten analizatori bilan SWR
            o&apos;lchovi tavsiya etiladi.
          </p>
        </section>
      </div>
    </main>
  );
}
