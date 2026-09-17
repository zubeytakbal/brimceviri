import type { Metadata } from "next";
import Link from "next/link";
import RegionComparisonToolUz from "../../components/calculators/RegionComparisonToolUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildFullLanguageAlternates } from "../../i18n/routing";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/viloyat-balandligini-solishtirish";

const faqItems: FaqItem[] = [
  {
    question: "Balandlik farqining sog'liqqa ta'siri qachon sezilarli bo'ladi?",
    answer:
      "Tibbiy manbalarga ko'ra 1 500 metrdan yuqori 'baland balandlik' hisoblanadi, 2 500 metr va undan yuqorida tanaga ta'siri (nafas qisilishi, yurak urishi kabi) sezilarli darajada oshadi. Bu sahifa, ikkita hudud balandlik farqiga qarab bu chegarani o'tib-o'tmaganini ko'rsatadi.",
  },
  {
    question: "Bu solishtirish tibbiy maslahatmi?",
    answer:
      "Yo'q, bu sahifa faqat umumiy fizik/statistik ma'lumot beradi; shaxsiy sog'liq holatiga qarab maslahat uchun shifokorga murojaat qilishingiz kerak.",
  },
];

export const metadata: Metadata = {
  title: "Viloyat Balandligini Solishtirish: Ikki Hududni Bosim va Sog'liq Jihatidan Qiyoslash",
  description:
    "Ikkita hududning balandligini, havo bosimini va suvning qaynash nuqtasini solishtiring; balandlik farqining sog'liqqa ta'siri sezilarli ekanligini bilib oling.",
  alternates: {
    canonical: pagePath,
    ...buildFullLanguageAlternates(pagePath),
  },
  openGraph: {
    title: "Viloyat Balandligini Solishtirish",
    description: "Ikki hududning balandligini va balandlik ta'sirini solishtiring.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekRegionComparisonHubPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Viloyat Balandligini Solishtirish", item: buildSiteUrl(pagePath) },
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
          <span>Viloyat Balandligini Solishtirish</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Viloyat Balandligini Solishtirish</h1>
          <p>
            Ikkita hududni tanlang: balandlik farqini, havo bosimi
            farqini va suvning qaynash nuqtasi farqini darhol
            ko&apos;ring; balandlik farqining sog&apos;liqqa
            ta&apos;siri sezilarli ekanligini bilib oling.
          </p>
        </header>

        <RegionComparisonToolUz />

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
            Hududlarning bittalab balandligi uchun{" "}
            <Link href="/uz/viloyatlar-balandligi">Viloyatlar Balandligi</Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>
        </section>
      </div>
    </main>
  );
}
