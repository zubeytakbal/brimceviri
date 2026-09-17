import type { Metadata } from "next";
import Link from "next/link";
import HeatInputCalculatorUz from "../../components/calculators/HeatInputCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/payvandlash-issiqlik-kiritishi-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Payvandlash issiqlik kiritishi (heat input) qanday hisoblanadi?",
    answer:
      "Issiqlik Kiritishi (kJ/mm) = (Voltaj × Tok kuchi × 60) / (Payvandlash Tezligi (mm/daqiqa) × 1000). Bu EN 1011 standartiga asoslangan umumiy hisobdir; jarayon samaradorlik koeffitsienti kiritilmagan.",
  },
  {
    question: "Issiqlik kiritishi nima uchun muhim?",
    answer:
      "Issiqlik kiritishi payvand chokining sovish tezligiga va shu orqali mikrostrukturasi, qattiqligi va yorilish xavfiga ta'sir qiladi. Juda yuqori yoki juda past issiqlik kiritishi materialga qarab noxush mexanik xususiyatlarga olib kelishi mumkin.",
  },
];

export const metadata: Metadata = {
  title: "Payvandlash Issiqlik Kiritishi Hisoblash (kJ/mm)",
  description:
    "Voltaj, tok kuchi va payvandlash tezligidan, EN 1011 standartiga asoslangan payvandlash issiqlik kiritishini (kJ/mm) hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/kaynak-isi-girdisi-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/kaynak-isi-girdisi-hesaplama",
    },
  },
  openGraph: {
    title: "Payvandlash Issiqlik Kiritishi Hisoblash (kJ/mm)",
    description: "Voltaj, tok kuchi va tezlikdan issiqlik kiritishini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekHeatInputCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Payvandlash Issiqlik Kiritishi Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Payvandlash Issiqlik Kiritishi Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Payvandlash Issiqlik Kiritishi Hisoblash</h1>
          <p>
            Voltaj, tok kuchi va payvandlash tezligini kiriting: EN 1011
            standartiga asoslangan issiqlik kiritishini (kJ/mm)
            hisoblang.
          </p>
        </header>

        <HeatInputCalculatorUz />

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
            Elektrod diametriga qarab amperajni hisoblash uchun{" "}
            <Link href="/uz/payvandlash-amperaji-hisoblash">
              Payvandlash Amperaji Hisoblash
            </Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Formula EN 1011-1 standartida belgilangan issiqlik kiritish
            hisobiga asoslangan. Bu vosita protsedura shartnomasi
            (WPS)ning o&apos;rnini bosmaydi.
          </p>
        </section>
      </div>
    </main>
  );
}
