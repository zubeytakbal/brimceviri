import type { Metadata } from "next";
import Link from "next/link";
import WeldingCurrentCalculatorUz from "../../components/calculators/WeldingCurrentCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/payvandlash-amperaji-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Payvandlash amperaji qanday hisoblanadi?",
    answer:
      "Qoplamali elektrod payvandlashda amperaj, elektrod o'zagi diametri (mm) bilan qoplama turiga qarab koeffitsientning ko'paytmasi orqali baholanadi: yupqa qoplamali uchun 40-45 A/mm, qalin qoplamali uchun 45-50 A/mm, temir kukuni bilan qalin qoplamali uchun 50-60 A/mm.",
  },
  {
    question: "Elektrod diametri qanday tanlanadi?",
    answer:
      "Elektrod diametri odatda payvandlanadigan material qalinligining taxminan to'rtdan uch qismiga teng tanlanadi; ildiz qatlamida esa yupqaroq elektrod afzal ko'riladi.",
  },
];

export const metadata: Metadata = {
  title: "Payvandlash Amperaji Hisoblash (Elektrod Diametriga Ko'ra)",
  description:
    "Elektrod o'zagi diametri va qoplama turidan, tavsiya etilgan payvandlash amperaji oralig'ini hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/kaynak-amperaji-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/kaynak-amperaji-hesaplama",
    },
  },
  openGraph: {
    title: "Payvandlash Amperaji Hisoblash (Elektrod Diametriga Ko'ra)",
    description: "Elektrod diametridan tavsiya etilgan amperaj oralig'ini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekWeldingCurrentCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Payvandlash Amperaji Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Payvandlash Amperaji Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Payvandlash Amperaji Hisoblash</h1>
          <p>
            Elektrod o&apos;zagi diametrini va qoplama turini kiriting:
            tavsiya etilgan amperaj oralig&apos;ini (boshlang&apos;ich
            nuqta sifatida) hisoblang.
          </p>
        </header>

        <WeldingCurrentCalculatorUz />

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
            Issiqlik kiritishini hisoblash uchun{" "}
            <Link href="/uz/payvandlash-issiqlik-kiritishi-hisoblash">
              Payvandlash Issiqlik Kiritishi Hisoblash
            </Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Formula, qoplamali elektrod yoy payvandlashda keng
            qo&apos;llaniladigan elektrod diametriga qarab amper
            koeffitsienti qoidasiga asoslangan. Materialga xos
            protsedura shartnomasi (WPS) har doim asos qilib olinishi
            kerak.
          </p>
        </section>
      </div>
    </main>
  );
}
