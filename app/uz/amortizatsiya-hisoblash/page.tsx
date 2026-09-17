import type { Metadata } from "next";
import Link from "next/link";
import AmortismanCalculatorUz from "../../components/calculators/AmortismanCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/amortizatsiya-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Chiziqli va kamayuvchi qoldiq amortizatsiya usuli orasidagi farq nima?",
    answer:
      "Chiziqli (teng miqdorli) usulda har yili bir xil miqdorda amortizatsiya ajratiladi. Kamayuvchi qoldiq usulida esa har yili qolgan (yil boshi) qiymat ustidan sobit foiz bilan amortizatsiya hisoblanadi; shuning uchun dastlabki yillarda yuqoriroq, keyingi yillarda kamayuvchi miqdorlar chiqadi.",
  },
  {
    question: "Foydali muddat yilini qayerdan topaman?",
    answer:
      "Foydali muddat yillari, mahalliy soliq kodeksi va buxgalteriya standartlariga muvofiq, asosiy vosita toifasiga qarab belgilanadi. Bu vosita siz kiritgan yil qiymati bilan hisoblaydi; aniq qiymatni o'z tashkilotingizning buxgalteri yoki tegishli me'yoriy hujjatdan tekshirishingiz kerak.",
  },
];

export const metadata: Metadata = {
  title: "Amortizatsiyani Hisoblash (Chiziqli va Kamayuvchi Qoldiq)",
  description:
    "Tannarx, foydali muddat va qutqaruv qiymatidan chiziqli yoki kamayuvchi qoldiq usuli bilan yillar bo'yicha amortizatsiya jadvalini hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/amortisman-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/amortisman-hesaplama",
    },
  },
  openGraph: {
    title: "Amortizatsiyani Hisoblash",
    description: "Yillar bo'yicha amortizatsiya jadvalini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekAmortismanPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Amortizatsiyani Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Amortizatsiyani Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Amortizatsiyani Hisoblash</h1>
          <p>
            Tannarx, foydali muddat va qutqaruv qiymatini kiriting:
            chiziqli yoki kamayuvchi qoldiq usuli bilan yillar
            bo&apos;yicha amortizatsiya jadvalini darhol hisoblang.
          </p>
        </header>

        <AmortismanCalculatorUz />

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
            QQS hisoblash uchun{" "}
            <Link href="/uz/qqs-hisoblash">QQS Hisoblash</Link>{" "}
            vositasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Chiziqli va kamayuvchi qoldiq amortizatsiya usullari
            xalqaro buxgalteriya amaliyotida keng qo&apos;llaniladigan
            standart usullardir. Bu vosita umumiy ma&apos;lumot
            maqsadida taqdim etilgan; rasmiy hisobotlarda dolzarb
            mahalliy soliq kodeksi va buxgalter maslahatiga murojaat
            qilishingiz kerak.
          </p>
        </section>
      </div>
    </main>
  );
}
