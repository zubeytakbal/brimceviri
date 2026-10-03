import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import ZakatCalculator from "../../components/ZakatCalculator";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { getGoldPricePerGram, getSilverPricePerGram } from "../../converter/liveMetalPrice";
import { ZakatHawlCalculator } from "../../components/dini/ArabicIslamicTools";
import { riyadhYawm } from "../../converter/calendar/saTaqwim";
import { ymdKey } from "../../converter/time/dateMath";
import { ARABIC_ISLAMIC_HUB, ARABIC_ISLAMIC_PATHS, islamicAlternates } from "../../i18n/islamicToolPaths";
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
    question: "كم نصاب الذهب عيار 21 وعيار 18؟",
    answer:
      "النصاب 85 جرامًا من الذهب الخالص (عيار 24)، ويعادل نحو 97.14 جرامًا من عيار 21، و92.73 جرامًا من عيار 22، و113.33 جرامًا من عيار 18، لأن الذهب الخالص في عيار 21 هو 21 من 24 جزءًا.",
  },
  {
    question: "كيف أحسب زكاة الراتب والمال المدخر؟",
    answer:
      "إذا بلغت مدخراتك النصاب فاحفظ تاريخ ذلك اليوم، وبعد سنة هجرية كاملة زكِّ كل ما عندك يومها بنسبة 2.5%، بما فيه ما أضفته من رواتب الأشهر الأخيرة (طريقة الحول الواحد). ومن حسب بالسنة الميلادية جعل النسبة 2.577%.",
  },
  {
    question: "هل تجب الزكاة في حلي الاستعمال الشخصي؟",
    answer:
      "هذه مسألة خلافية بين الفقهاء: بعضهم يرى عدم وجوب الزكاة في الحلي المُعَدّ للاستعمال المباح، وبعضهم يرى وجوبها كسائر الذهب والفضة. يُنصح بالرجوع إلى جهة إفتاء موثوقة في بلدك لمعرفة الرأي المعتمد.",
  },
];

export const metadata: Metadata = {
  title: "حاسبة الزكاة: زكاة الذهب عيار 21 و18 والمال المدخر",
  description:
    "احسب زكاة المال والذهب عيار 21 و18 و24 والفضة بسعر السوق الحي، ونصاب الذهب بكل عيار، ومتى يحول الحول على راتبك ومدخراتك.",
  alternates: {
    canonical: "/ar/zakat-calculator",
    languages: islamicAlternates("zakat"),
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

const NISAB_IYAR = [24, 22, 21, 18].map((k) => ({ k, g: (85 * 24) / k }));

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
      { "@type": "ListItem", position: 2, name: "أدوات إسلامية", item: buildSiteUrl(ARABIC_ISLAMIC_HUB) },
      { "@type": "ListItem", position: 3, name: "حاسبة الزكاة", item: buildSiteUrl("/ar/zakat-calculator") },
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
          <Link href={ARABIC_ISLAMIC_HUB}>أدوات إسلامية</Link>
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
          <h2 id="hawl">زكاة الراتب والمدخرات: متى يحول الحول؟</h2>
          <p>
            لمن يدخر من راتبه كل شهر: أدخل تاريخ بلوغ مدخراتك النصاب أول مرة، فتعرف يوم حولان الحول بالهجري والميلادي ومقدار الزكاة على رصيدك يومها.
          </p>
        </section>
        <ZakatHawlCalculator initialDate={ymdKey(riyadhYawm())} />

        <section className="category-article-content">
          <h2 id="iyar">نصاب الذهب حسب العيار</h2>
          <div className="holiday-table-wrap">
            <table className="holiday-table">
              <thead>
                <tr>
                  <th scope="col">العيار</th>
                  <th scope="col">نسبة الذهب الخالص</th>
                  <th scope="col">وزن النصاب</th>
                </tr>
              </thead>
              <tbody>
                {NISAB_IYAR.map(({ k, g }) => (
                  <tr key={k}>
                    <th scope="row">عيار {k}</th>
                    <td>{((k / 24) * 100).toFixed(1)}%</td>
                    <td>{g.toFixed(2)} جرام</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            لحساب زكاة ذهب عيار 21 مثلًا: اضرب الوزن في 21 ثم اقسم على 24 لتعرف الذهب الخالص، فإن بلغ 85 جرامًا فالزكاة ربع العشر من قيمته (2.5%). الحاسبة
            أعلاه تفعل ذلك تلقائيًا عند اختيار العيار.
          </p>

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
            كل الحاسبات الإسلامية في <Link href={ARABIC_ISLAMIC_HUB}>صفحة الأدوات الإسلامية</Link>، ومنها{" "}
            <Link href={ARABIC_ISLAMIC_PATHS.iddah}>حاسبة العدة</Link> و<Link href={ARABIC_ISLAMIC_PATHS.aqiqah}>حساب يوم العقيقة</Link>. لحساب أوقات الصلاة واتجاه القبلة يمكنك زيارة{" "}
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
