import {
  findGermanCategoryPageByCategory,
  getGermanCategoryPathByCategory,
} from "../converter/localizedGermanCategoryPages";
import type { LocalizedGermanConversionPage } from "../converter/localizedGermanConversionPages";
import { buildSiteUrl } from "../siteConfig";

type GermanConversionSeoProps = {
  conversionPage: LocalizedGermanConversionPage;
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function GermanConversionSeo({
  conversionPage,
}: GermanConversionSeoProps) {
  const pageUrl = buildSiteUrl(`/de/${conversionPage.slug}`);
  const categoryPage = findGermanCategoryPageByCategory(
    conversionPage.category
  );
  const categoryUrl = buildSiteUrl(
    getGermanCategoryPathByCategory(conversionPage.category)
  );

  const faqs = [
    {
      question: "Wie genau sind die Ergebnisse?",
      answer:
        "Die Umrechnungsergebnisse werden mit 12 signifikanten Stellen berechnet. " +
        "Sehr große oder sehr kleine Werte werden in wissenschaftlicher Notation angezeigt.",
    },
    {
      question: `Ist der Umrechner von ${conversionPage.fromName} zu ${conversionPage.toName} kostenlos?`,
      answer:
        "Ja. Das Umrechnungswerkzeug auf BirimCeviri.app ist kostenlos und erfordert keine Anmeldung.",
    },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Startseite",
        item: buildSiteUrl("/de"),
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
        name: `${conversionPage.fromName} zu ${conversionPage.toName} Umrechner`,
        item: pageUrl,
      },
    ],
  };

  const applicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${conversionPage.fromName} zu ${conversionPage.toName} Umrechner`,
    url: pageUrl,
    description: `Kostenloses Werkzeug zur Umrechnung von ${conversionPage.fromName} in ${conversionPage.toName}.`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Alle",
    browserRequirements: "Erfordert JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
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
        <h2>{"Häufig gestellte Fragen"}</h2>

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
