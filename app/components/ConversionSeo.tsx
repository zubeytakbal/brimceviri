import type { ConversionPage } from "../converter/conversionPages";

type ConversionSeoProps = {
  conversionPage: ConversionPage;
  formattedOneUnitResult: string;
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function ConversionSeo({
  conversionPage,
  formattedOneUnitResult,
}: ConversionSeoProps) {
  const pageUrl = `https://birimceviri.app/${conversionPage.slug}`;
  const categoryUrl =
    `https://birimceviri.app/kategoriler/` +
    conversionPage.category;

  const faqs = [
    {
      question:
        `1 ${conversionPage.fromName} kaç ` +
        `${conversionPage.toName} eder?`,
      answer:
        `1 ${conversionPage.fromUnit}, ` +
        `${formattedOneUnitResult} ` +
        `${conversionPage.toUnit} değerine eşittir.`,
    },
    {
      question:
        `${conversionPage.fromName}, ` +
        `${conversionPage.toName} birimine nasıl çevrilir?`,
      answer: conversionPage.explanation,
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
        item: "https://birimceviri.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: conversionPage.category,
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