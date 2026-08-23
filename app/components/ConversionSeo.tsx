import {
  findCategoryPageByCategory,
  getCategoryPathByCategory,
} from "../converter/categoryPages";
import type { ConversionPage } from "../converter/conversionPages";
import { buildSiteUrl } from "../siteConfig";

type ConversionSeoProps = {
  conversionPage: ConversionPage;
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function ConversionSeo({
  conversionPage,
}: ConversionSeoProps) {
  const pageUrl = buildSiteUrl(`/${conversionPage.slug}`);
  const categoryPage = findCategoryPageByCategory(
    conversionPage.category
  );
  const categoryUrl = buildSiteUrl(
    getCategoryPathByCategory(conversionPage.category)
  );

  const faqs = [
    {
      question: "Sonuçlar ne kadar hassas hesaplanıyor?",
      answer:
        "Dönüşüm sonuçları 12 anlamlı basamağa kadar hesaplanır. " +
        "Çok büyük veya çok küçük değerler bilimsel gösterimle sunulur.",
    },
    {
      question:
        `${conversionPage.fromName} – ` +
        `${conversionPage.toName} çevirici ücretsiz mi?`,
      answer:
        "Evet. BirimCeviri.app üzerindeki dönüşüm aracı ücretsizdir ve kayıt olmadan kullanılabilir.",
    },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: buildSiteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryPage?.title ?? conversionPage.category,
        item: categoryUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name:
          `${conversionPage.fromName} – ` +
          `${conversionPage.toName} Çevirici`,
        item: pageUrl,
      },
    ],
  };

  const applicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name:
      `${conversionPage.fromName} – ` +
      `${conversionPage.toName} Çevirici`,
    url: pageUrl,
    description:
      `${conversionPage.fromName} değerini ` +
      `${conversionPage.toName} birimine dönüştüren ücretsiz araç.`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Tüm platformlar",
    browserRequirements: "JavaScript destekleyen bir web tarayıcısı",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "TRY",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(breadcrumbSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(applicationSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(faqSchema),
        }}
      />

      <section className="conversion-section faq-section">
        <h2>Sık sorulan sorular</h2>

        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
