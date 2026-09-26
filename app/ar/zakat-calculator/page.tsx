import type { Metadata } from "next";
import Link from "next/link";
import ZakatCalculator from "../../components/ZakatCalculator";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { getGoldPricePerGram, getSilverPricePerGram } from "../../converter/liveMetalPrice";
import { buildSiteUrl } from "../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "ما هو نصاب الزكاة؟",
    answer:
      "النصاب هو الحد الأدنى من المال الذي إذا بلغه المسلم واستمر معه حولاً كاملاً (سنة هجرية) وجبت عليه الزكاة. يُقدَّر تقليديًا بـ 85 جرامًا من الذهب الخالص أو 595 جرامًا من الفضة الخالصة، وتُفضّل كثير من الهيئات المعاصرة نصاب الفضة عند حساب زكاة النقد لأنه أقل قيمة وأنفع للفقراء.",
  },
  {
    question: "كم نسبة الزكاة الواجبة؟",
    answer:
      "نسبة زكاة المال والذهب والفضة وعروض التجارة هي 2.5% (ربع العشر) من إجمالي المال الزكوي الذي بلغ النصاب واستمر حولاً كاملاً.",
  },
  {
    question: "هل تجب الزكاة في حلي الاستعمال الشخصي؟",
    answer:
      "هذه مسألة خلافية بين الفقهاء: بعضهم يرى عدم وجوب الزكاة في الحلي المُعَدّ للاستعمال المباح، وبعضهم يرى وجوبها كسائر الذهب والفضة. يُنصح بالرجوع إلى جهة إفتاء موثوقة في بلدك لمعرفة الرأي المعتمد.",
  },
];

export const metadata: Metadata = {
  title: "حاسبة الزكاة",
  description:
    "احسب زكاة المال والذهب والفضة وعروض التجارة باستخدام سعر السوق الحي للذهب والفضة، مع دعم نصاب الذهب ونصاب الفضة.",
  alternates: {
    canonical: "/ar/zakat-calculator",
  },
  openGraph: {
    title: "حاسبة الزكاة",
    description: "احسب زكاة المال والذهب والفضة بسعر السوق الحي.",
    url: buildSiteUrl("/ar/zakat-calculator"),
    siteName: "BirimCeviri.app",
    locale: "ar_AR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default async function ZakatCalculatorPage() {
  const [goldPrice, silverPrice] = await Promise.all([
    getGoldPricePerGram(),
    getSilverPricePerGram(),
  ]);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: buildSiteUrl("/ar") },
      { "@type": "ListItem", position: 2, name: "حاسبة الزكاة", item: buildSiteUrl("/ar/zakat-calculator") },
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
          <span>حاسبة الزكاة</span>
        </nav>

        <header className="all-conversions-header">
          <h1>حاسبة الزكاة</h1>
          <p>
            أدخل نقدك ومدخراتك وعروض تجارتك وذهبك وفضتك لمعرفة إجمالي مالك
            الزكوي، وهل بلغ النصاب، ومقدار الزكاة الواجبة عليك، باستخدام سعر
            السوق العالمي الحي للذهب والفضة.
          </p>
        </header>

        <ZakatCalculator
          goldPricePerGramUsd={goldPrice?.pricePerGramUsd ?? null}
          silverPricePerGramUsd={silverPrice?.pricePerGramUsd ?? null}
          priceUpdatedAtIso={goldPrice?.updatedAtIso ?? null}
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
            لحساب أوقات الصلاة واتجاه القبلة يمكنك زيارة{" "}
            <Link href="/ar/prayer-times-calculator">حاسبة مواقيت الصلاة واتجاه القبلة</Link>
            {" "}، ولتحويل التاريخ بين الميلادي والهجري يمكنك زيارة{" "}
            <Link href="/ar/hijri-date-converter">محول التاريخ الهجري الميلادي</Link>
            {" "}، ولحساب قيمة الذهب أو الفضة حسب الوزن والعيار وعملتك بسعر حي يمكنك زيارة{" "}
            <Link href="/ar/gold-price-calculator">حاسبة سعر الذهب والفضة</Link>.
          </p>

          <h2>مصادر البيانات</h2>
          <p>
            يُجلب سعر الذهب والفضة من سعر السوق العالمي الحي (بالدولار
            الأمريكي)، ويُحدَّث تلقائيًا كل ساعة تقريبًا. في حال تعذّر جلب
            السعر الحي، يمكنك إدخال السعر الحالي يدويًا.
          </p>
        </section>
      </div>
    </main>
  );
}
