import type { Metadata } from "next";
import Link from "next/link";
import ColorCodeCalculatorUz from "../../components/calculators/ColorCodeCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/rang-kodi-aylantirgich";

const faqItems: FaqItem[] = [
  {
    question: "HEX rang kodi nima?",
    answer:
      "HEX qizil/yashil/ko'k (RGB) tarkibiy qismlarini 00-FF orasida o'n oltilik sonlar bilan ifodalaydigan, CSS va dizayn vositalarida eng keng ishlatiladigan rang ko'rsatilishidir; masalan #367DA5.",
  },
  {
    question: "RGB bilan HSL orasidagi farq nima?",
    answer:
      "RGB rangni qizil, yashil, ko'k yorug'lik miqdorlari bilan aniqlaydi. HSL esa xuddi shu rangni ton (hue), to'yinganlik (saturation) va yorqinlik (lightness) sifatida aniqlaydi; rangni quyuqlashtirish yoki ochish uchun HSL da faqat lightness qiymatini o'zgartirish yetarli.",
  },
];

export const metadata: Metadata = {
  title: "Rang Kodi Aylantirgich: HEX, RGB, HSL Aylantirish",
  description:
    "HEX, RGB va HSL rang kodlari orasida darhol aylantiring; jonli rang ko'rinishi bilan veb va dizayn loyihalarida to'g'ri rangni toping.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/renk-kodu-cevirici",
      "uz-UZ": pagePath,
      "x-default": "/renk-kodu-cevirici",
    },
  },
  openGraph: {
    title: "Rang Kodi Aylantirgich: HEX, RGB, HSL Aylantirish",
    description: "HEX, RGB va HSL rang kodlari orasida darhol aylantiring.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekColorCodeCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Rang Kodi Aylantirgich", item: buildSiteUrl(pagePath) },
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
          <span>Rang Kodi Aylantirgich</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Rang Kodi Aylantirgich</h1>
          <p>
            HEX, RGB yoki HSL maydonlaridan istalganiga qiymat
            kiriting; boshqa ikkitasi va rang ko&apos;rinishi darhol
            yangilansin.
          </p>
        </header>

        <ColorCodeCalculatorUz />

        <section className="category-article-content">
          <h2>Tez-tez So&apos;raladigan Savollar</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}
        </section>
      </div>
    </main>
  );
}
