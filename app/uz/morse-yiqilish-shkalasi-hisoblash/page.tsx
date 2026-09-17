import type { Metadata } from "next";
import Link from "next/link";
import MorseFallScaleCalculatorUz from "../../components/calculators/MorseFallScaleCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/morse-yiqilish-shkalasi-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Morse Yiqilish Shkalasi nima uchun ishlatiladi?",
    answer:
      "Statsionarda yotgan bemorlarda yiqilish xavfini baholash uchun ishlatiladigan, yiqilish tarixi, yurish yordamchisi, IV davolash va yurish kabi 6 mezonni ballaydigan hamshiralik xavf skrining vositasidir.",
  },
  {
    question: "Morse balli yuqori chiqsa nima qilish kerak?",
    answer:
      "Yuqori xavf kategoriyasi, yiqilishning oldini olish protokollarining (yaqindan kuzatuv, yordam bilan harakatlanish, to'shak signalizatsiyasi kabi) ishga tushirilishi kerakligini bildiradi; aniq parvarish rejasi mas'ul tibbiyot jamoasi tomonidan belgilanishi kerak.",
  },
];

export const metadata: Metadata = {
  title: "Morse Yiqilish Shkalasini Hisoblash",
  description:
    "Yiqilish tarixi, yurish yordamchisi, IV davolash va yurish mezonlarini belgilang: Morse Yiqilish Ballini va xavf kategoriyasini hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/morse-dusme-skalasi-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/morse-dusme-skalasi-hesaplama",
    },
  },
  openGraph: {
    title: "Morse Yiqilish Shkalasini Hisoblash",
    description: "Morse Yiqilish Ballini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekMorseFallScalePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Morse Yiqilish Shkalasini Hisoblash",
        item: buildSiteUrl(pagePath),
      },
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
          <span>Morse Yiqilish Shkalasini Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Morse Yiqilish Shkalasini Hisoblash</h1>
          <p>
            Yiqilish tarixi, yurish yordamchisi, IV davolash va
            yurish mezonlarini belgilang: Morse Yiqilish Ballini va
            xavf kategoriyasini darhol hisoblang.
          </p>
        </header>

        <MorseFallScaleCalculatorUz />

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
            Bosim yarasi xavfi uchun{" "}
            <Link href="/uz/braden-shkalasi-hisoblash">Braden Shkalasini Hisoblash</Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Ball Morse JM va h.k. (1989) tomonidan ishlab chiqilgan.
            Bu vosita tibbiy maslahat o&apos;rnini bosmaydi; parvarish
            rejasi uchun mas&apos;ul tibbiyot jamoasiga murojaat
            qilish kerak.
          </p>
        </section>
      </div>
    </main>
  );
}
