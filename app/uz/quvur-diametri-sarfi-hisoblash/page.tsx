import type { Metadata } from "next";
import Link from "next/link";
import PipeFlowCalculatorUz from "../../components/calculators/PipeFlowCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/quvur-diametri-sarfi-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Quvur diametri qanday hisoblanadi?",
    answer:
      "Quvur diametri uzluksizlik tenglamasi (Q = A×v) yordamida sarf (Q) va istalgan oqim tezligidan (v) hisoblanadi: D = √(4Q/(π×v)). Bu formula bosimli suv/suyuqlik liniyalari uchun amal qiladi.",
  },
  {
    question: "Suv liniyalarida tavsiya etilgan oqim tezligi qancha?",
    answer:
      "Ichimlik suvi tarmoqlarida tavsiya etilgan oqim tezligi odatda 0,5-2,5 m/s oralig'idadir. Juda past tezlik cho'kishga, juda yuqori tezlik esa yeyilish va shovqinga olib kelishi mumkin.",
  },
];

export const metadata: Metadata = {
  title: "Quvur Diametri, Sarf va Oqim Tezligi Hisoblash",
  description:
    "Uzluksizlik tenglamasi (Q=A×v) bilan quvur diametri, sarf yoki oqim tezligidan xohlaganingizni hisoblang. Bosimli suv/suyuqlik liniyalari uchun.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/boru-capi-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/boru-capi-hesaplama",
    },
  },
  openGraph: {
    title: "Quvur Diametri, Sarf va Oqim Tezligi Hisoblash",
    description: "Quvur diametri, sarf va oqim tezligini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekPipeFlowPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Quvur Diametri, Sarf va Oqim Tezligi Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Quvur Diametri, Sarf va Oqim Tezligi Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Quvur Diametri, Sarf va Oqim Tezligi Hisoblash</h1>
          <p>
            Sarf, oqim tezligi yoki quvur diametridan ikkitasini
            kiriting: yetishmayotgan uchinchi qiymatni darhol
            hisoblang.
          </p>
        </header>

        <PipeFlowCalculatorUz />

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
            Quvur liniyasidagi bosim yo&apos;qotilishi uchun{" "}
            <Link href="/uz/bosim-yoqotilishi-hisoblash">
              Bosim Yo&apos;qotilishi Hisoblash
            </Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Formula suyuqliklar mexanikasida asosiy uzluksizlik
            tenglamasiga asoslangan. Tabiiy gaz ichki tarmog&apos;i
            kabi bosim yo&apos;qotilishi va gaz zichligiga bog&apos;liq
            hisoblar alohida tegishli standartga muvofiq amalga
            oshirilishi kerak.
          </p>
        </section>
      </div>
    </main>
  );
}
