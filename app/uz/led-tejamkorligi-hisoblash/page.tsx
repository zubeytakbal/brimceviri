import type { Metadata } from "next";
import Link from "next/link";
import LedSavingsCalculatorUz from "../../components/calculators/LedSavingsCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/led-tejamkorligi-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "LED lampochka necha yilda o'zini oqlaydi?",
    answer:
      "LED lampochkalar odatda juda qisqa muddatda (bir necha oy ichida) o'zini oqlaydi, chunki ham lampochka narxi past, ham energiya tejamkorligi yuqori. O'z lampochkalaringiz soni, foydalanish muddatingiz va elektr narxingiz bilan aniq muddatni yuqoridagi hisoblagichdan ko'rishingiz mumkin.",
  },
  {
    question: "60W cho'g'langan lampochka o'rniga necha W LED olishim kerak?",
    answer:
      "60W cho'g'langan lampochka taxminan 800 lümen yorug'lik beradi; bir xil yorqinlikni taxminan 8-9W LED lampochka ta'minlaydi. Aniq qiymat ishlab chiqaruvchiga qarab o'zgaradi, qadoqdagi lümen qiymatiga qarash eng to'g'risidir.",
  },
  {
    question: "LED lampochkalar nima uchun bunchalik kam vatt sarflaydi?",
    answer:
      "LEDlar yorug'likni cho'g'langan/galogen lampochkalarga nisbatan ancha samarali ishlab chiqaradi; sarflagan energiyasining ko'p qismi issiqlik o'rniga yorug'likka aylanadi. Shuning uchun bir xil lümen (yorqinlik) uchun ancha kam vatt yetarli bo'ladi.",
  },
];

export const metadata: Metadata = {
  title: "LED Tejamkorligi Hisoblash (Necha Yilda O'zini Oqlaydi?)",
  description:
    "Lampochkalar soni, foydalanish muddati va elektr narxiga qarab LED lampochkaga o'tishning yillik tejamkorligini va qoplanish muddatini hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/led-ampul-tasarruf-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/led-ampul-tasarruf-hesaplama",
    },
  },
  openGraph: {
    title: "LED Tejamkorligi Hisoblash (Necha Yilda O'zini Oqlaydi?)",
    description: "O'z raqamlaringiz bilan LED lampochkaga o'tishning tejamkorligini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekLedSavingsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "LED Tejamkorligi Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>LED Tejamkorligi Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>LED Tejamkorligi Hisoblash</h1>
          <p>
            Lampochkalar soningizni, kunlik foydalanish muddatingizni
            va elektr narxingizni kiriting: LED lampochkaga
            o&apos;tishning yillik tejamkorligini va necha kun/yilda
            o&apos;zini oqlashini hisoblang.
          </p>
        </header>

        <LedSavingsCalculatorUz />

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
            Elektromobil xarajati uchun{" "}
            <Link href="/uz/elektromobil-benzinli-solishtirish">
              Elektromobilmi yoki Benzinli Avtomobilmi?
            </Link>{" "}
            sahifasiga, izolyatsiya qoplanishi uchun{" "}
            <Link href="/uz/izolyatsiya-qoplanishi-hisoblash">Izolyatsiya Qoplanishi Hisoblash</Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Cho&apos;g&apos;langan-LED quvvat ekvivalentliklari,
            yoritish sohasida keng qabul qilingan lümen asosidagi
            solishtirish jadvallariga asoslangan.
          </p>
        </section>
      </div>
    </main>
  );
}
