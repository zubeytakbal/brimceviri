import type { Metadata } from "next";
import Link from "next/link";
import BradenScaleCalculatorUz from "../../components/calculators/BradenScaleCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/braden-shkalasi-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Braden Shkalasi nima uchun ishlatiladi?",
    answer:
      "Bosim (dekubitus) yarasi rivojlanish xavfini baholash uchun ishlatiladigan, sezgi idroki, namlik, faollik, harakatchanlik, ovqatlanish va ishqalanish/sirpanishdan iborat 6 kichik shkaladan tashkil topgan hamshiralik xavf skrining vositasidir.",
  },
  {
    question: "Braden Shkalasida past ball nima uchun yuqori xavfni ko'rsatadi?",
    answer:
      "Braden Shkalasida ko'plab boshqa ballardan farqli o'laroq, past jami ball yuqoriroq bosim yarasi xavfini ko'rsatadi; har bir kichik shkala 1 (eng yomon) dan 4 (eng yaxshi) gacha ballanadi va jami 6-23 oralig'ida bo'ladi.",
  },
];

export const metadata: Metadata = {
  title: "Braden Shkalasini Hisoblash (Bosim Yarasi Xavfi)",
  description:
    "Sezgi idroki, namlik, faollik, harakatchanlik, ovqatlanish va ishqalanish/sirpanish kichik shkalalarini tanlang: Braden Shkalasi jami ballini hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/braden-skalasi-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/braden-skalasi-hesaplama",
    },
  },
  openGraph: {
    title: "Braden Shkalasini Hisoblash (Bosim Yarasi Xavfi)",
    description: "Braden Shkalasi jami ballini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekBradenScalePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Braden Shkalasini Hisoblash",
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
          <span>Braden Shkalasini Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Braden Shkalasini Hisoblash</h1>
          <p>
            Sezgi idroki, namlik, faollik, harakatchanlik, ovqatlanish
            va ishqalanish/sirpanish kichik shkalalarini tanlang:
            Braden Shkalasi jami ballini va bosim yarasi xavfini
            darhol hisoblang.
          </p>
        </header>

        <BradenScaleCalculatorUz />

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
            Yiqilish xavfi uchun{" "}
            <Link href="/uz/morse-yiqilish-shkalasi-hisoblash">Morse Yiqilish Shkalasini Hisoblash</Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Ball Bergstrom N, Braden BJ va h.k. (1987) tomonidan
            ishlab chiqilgan. Bu vosita tibbiy maslahat o&apos;rnini
            bosmaydi; parvarish rejasi uchun mas&apos;ul tibbiyot
            jamoasiga murojaat qilish kerak.
          </p>
        </section>
      </div>
    </main>
  );
}
