import {
  findEnglishCategoryPageByCategory,
  getEnglishCategoryPathByCategory,
} from "../converter/localizedCategoryPages";
import type { LocalizedConversionPage } from "../converter/localizedConversionPages";
import { buildSiteUrl } from "../siteConfig";

type EnglishConversionSeoProps = {
  conversionPage: LocalizedConversionPage;
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function EnglishConversionSeo({
  conversionPage,
}: EnglishConversionSeoProps) {
  const pageUrl = buildSiteUrl(`/en/${conversionPage.slug}`);
  const categoryPage = findEnglishCategoryPageByCategory(
    conversionPage.category
  );
  const categoryUrl = buildSiteUrl(
    getEnglishCategoryPathByCategory(conversionPage.category)
  );

  const faqs = [
    {
      question: "How precise are the results?",
      answer:
        "Conversion results are calculated to 12 significant figures. " +
        "Very large or very small values are shown in scientific notation.",
    },
    {
      question:
        `Is the ${conversionPage.fromName} to ` +
        `${conversionPage.toName} converter free?`,
      answer:
        "Yes. The conversion tool on BirimCeviri.app is free and requires no sign-up.",
    },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: buildSiteUrl("/en"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryPage?.title ?? conversionPage.categoryName,
        item: categoryUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${conversionPage.fromName} to ${conversionPage.toName} Converter`,
        item: pageUrl,
      },
    ],
  };

  const applicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${conversionPage.fromName} to ${conversionPage.toName} Converter`,
    url: pageUrl,
    description: `Free tool to convert ${conversionPage.fromName} to ${conversionPage.toName}.`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
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
        <h2>Frequently asked questions</h2>

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
