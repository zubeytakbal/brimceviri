import type { Metadata } from "next";
import Link from "next/link";
import CurrencyConverterCalculatorUz from "../../components/calculators/CurrencyConverterCalculatorUz";
import { getExchangeRates } from "../../converter/exchangeRates";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/valyuta-aylantirgich";

const faqItems: FaqItem[] = [
  {
    question: "Bu valyuta kursi joriymi?",
    answer:
      "Ha, kurslar Frankfurter (ECB ma'lumotnoma kurslari) orqali jonli olinadi va soatlik yangilanadi. Manba tashkilotning o'zi ish kunlarida kuniga bir marta yangilanadi.",
  },
  {
    question: "Bu yerdagi kurs bank kursidan nima uchun farq qiladi?",
    answer:
      "Bu yerda ko'rsatilgan, oraliq kurs (mid-market rate) deb nomlanuvchi ma'lumotnoma kursidir. Banklar va valyuta ayirboshlash shoxobchalari oldi-sotdi operatsiyalarida farq (spread) qo'llaydi; shuning uchun haqiqatda olishingiz yoki to'lashingiz kerak bo'lgan kurs bu yerda ko'rsatilgandan biroz farqli bo'ladi.",
  },
  {
    question: "Qaysi valyutalar qo'llab-quvvatlanadi?",
    answer:
      "Hozircha Turk Lirasi (TRY), AQSH Dollari (USD), Evro (EUR) va Angliya Funt Sterlingi (GBP) orasida aylantirish qilishingiz mumkin.",
  },
];

export const metadata: Metadata = {
  title: "Valyuta Aylantirgich (Dollar, Evro, Funt Sterling - Turk Lirasi)",
  description:
    "Kunlik yangilanadigan ma'lumotnoma kurslari bilan dollar, evro, funt sterling va turk lirasi orasida valyuta aylantirgich. Miqdoringizni kiriting, xohlagan valyutaga aylantiring.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/doviz-cevirici",
      "uz-UZ": pagePath,
      "x-default": "/doviz-cevirici",
    },
  },
  openGraph: {
    title: "Valyuta Aylantirgich (Dollar, Evro, Funt Sterling - Turk Lirasi)",
    description: "Joriy kurslar bilan dollar, evro, funt sterling va turk lirasi orasida darhol aylantirish.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default async function UzbekCurrencyConverterPage() {
  const rates = await getExchangeRates();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Valyuta Aylantirgich", item: buildSiteUrl(pagePath) },
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
          <span>Valyuta Aylantirgich</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Valyuta Aylantirgich</h1>
          <p>
            Kunlik yangilanadigan ma&apos;lumotnoma kurslari bilan
            dollar, evro, funt sterling va turk lirasi orasida
            aylantiring. Miqdoringizni kiriting, valyutalarni tanlang.
          </p>
        </header>

        <CurrencyConverterCalculatorUz rates={rates} />

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
            Boshqa birlik aylantirishlari uchun{" "}
            <Link href="/uz">Bosh sahifa</Link> orqali barcha
            kategoriyalarga o&apos;tishingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Kurslar Frankfurter API orqali, Yevropa Markaziy Banki
            (ECB) ma&apos;lumotnoma kurslariga asoslanib olinadi.
          </p>
        </section>
      </div>
    </main>
  );
}
