import type { Metadata } from "next";
import Link from "next/link";
import GoldPriceCalculator from "../../components/GoldPriceCalculator";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { getUsdExchangeRates } from "../../converter/liveCurrencyRatesUsd";
import { getGoldPricePerGram, getSilverPricePerGram } from "../../converter/liveMetalPrice";
import { buildSiteUrl } from "../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "لماذا يختلف السعر هنا عن سعر محل الذهب؟",
    answer:
      "هذه الأداة تعرض سعر المعدن الخام (سعر السوق العالمي) فقط. محلات الذهب تضيف عادة مصنعية وهامش ربح ومصاريف تشغيل فوق سعر المعدن الخام، لذلك يكون السعر النهائي في المحل أعلى غالبًا.",
  },
  {
    question: "ما الفرق بين عيار 24 و21 و18؟",
    answer:
      "العيار يحدد نسبة الذهب الخالص في القطعة: عيار 24 يعني ذهبًا خالصًا 100%، وعيار 21 يعني 21/24 (نحو 87.5%) ذهبًا خالصًا والباقي معادن أخرى، وعيار 18 يعني 18/24 (75%) ذهبًا خالصًا. كلما قل العيار قلت نسبة الذهب الخالص وقلت قيمته لكل جرام.",
  },
];

export const metadata: Metadata = {
  title: "حاسبة سعر الذهب والفضة الحي",
  description:
    "احسب قيمة الذهب أو الفضة حسب الوزن والعيار وعملتك، باستخدام سعر السوق العالمي الحي المحدث تلقائيًا.",
  alternates: {
    canonical: "/ar/gold-price-calculator",
  },
  openGraph: {
    title: "حاسبة سعر الذهب والفضة الحي",
    description: "احسب قيمة الذهب أو الفضة حسب الوزن والعيار وعملتك بسعر حي.",
    url: buildSiteUrl("/ar/gold-price-calculator"),
    siteName: "BirimCeviri.app",
    locale: "ar_AR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default async function GoldPriceCalculatorPage() {
  const [goldPrice, silverPrice, usdRates] = await Promise.all([
    getGoldPricePerGram(),
    getSilverPricePerGram(),
    getUsdExchangeRates(),
  ]);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: buildSiteUrl("/ar") },
      { "@type": "ListItem", position: 2, name: "حاسبة سعر الذهب والفضة", item: buildSiteUrl("/ar/gold-price-calculator") },
    ],
  };

  return (
    <main className="all-conversions-page" lang="ar" dir="rtl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="مسار الصفحة">
          <Link href="/ar">الرئيسية</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>حاسبة سعر الذهب والفضة</span>
        </nav>

        <header className="all-conversions-header">
          <h1>حاسبة سعر الذهب والفضة الحي</h1>
          <p>
            اختر المعدن والوزن والعيار وعملتك لمعرفة القيمة الحالية بسعر
            السوق العالمي الحي، المحدث تلقائيًا كل ساعة تقريبًا.
          </p>
        </header>

        <GoldPriceCalculator
          goldPricePerGramUsd={goldPrice?.pricePerGramUsd ?? null}
          silverPricePerGramUsd={silverPrice?.pricePerGramUsd ?? null}
          usdRates={usdRates?.rates ?? null}
        />

        <section className="category-article-content">
          <h2>الأسئلة الشائعة</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>أدوات ذات صلة</h2>
          <p>
            لحساب زكاة الذهب والفضة والمال بشكل كامل يمكنك زيارة{" "}
            <Link href="/ar/zakat-calculator">حاسبة الزكاة</Link>.
          </p>
        </section>
      </div>
    </main>
  );
}
