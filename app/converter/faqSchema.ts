// FAQPage yapisal veri (JSON-LD) uretici -- Google'in SSS zengin
// sonuc (rich snippet) gostermesi icin, sayfada zaten gorunur olan
// SSS metnini schema.org formatina cevirir. Metin, gorunur icerikle
// birebir eslesmelidir (Google kurallarina uymak icin).

export type FaqItem = {
  question: string;
  answer: string;
};

export function buildFaqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
