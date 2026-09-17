import type { Metadata } from "next";
import Link from "next/link";
import IrrigationCalculatorUz from "../../components/calculators/IrrigationCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/sugorish-vaqti-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Sug'orish vaqti qanday hisoblanadi?",
    answer:
      "1 mm suv chuqurligi, 1 m² maydonda 1 litrga teng. Kerakli Jami Suv (L) = Maqsadli Sug'orish Miqdori (mm) × Maydon (m²). Sug'orish Vaqti (daqiqa) = (Kerakli Suv (L) / Tizim Sarfi (L/soat)) × 60.",
  },
  {
    question: "Tomchilatib sug'orishda tizim sarfi qanday topiladi?",
    answer:
      "Tomchilatib sug'orishda jami tizim sarfi, bitta emitterning sarfi (L/soat) bilan jami emitterlar sonining ko'paytmasi bilan topiladi.",
  },
  {
    question: "Maqsadli sug'orish miqdori (mm) qayerdan topiladi?",
    answer:
      "Maqsadli sug'orish miqdori o'simlik yoki o't turiga, mavsumga, tuproq tuzilishiga, bug'lanish va yog'ingarchilik holatiga qarab o'zgaradi. Bu vosita bu qiymatni belgilamaydi — bu qiymatni landshaft mutaxassisidan yoki o'simlik parvarishi qo'llanmasidan olishingiz kerak.",
  },
];

export const metadata: Metadata = {
  title: "Sug'orish Vaqti Hisoblash (Tomchilatib/Sprinkler)",
  description:
    "Maqsadli sug'orish miqdori (mm), sug'oriladigan maydon (m²) va tizim sarfidan (L/soat), kerakli jami suv va sug'orish vaqtini (daqiqa) hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/sulama-suresi-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/sulama-suresi-hesaplama",
    },
  },
  openGraph: {
    title: "Sug'orish Vaqti Hisoblash (Tomchilatib/Sprinkler)",
    description: "Maydon va sarfdan sug'orish vaqtini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekIrrigationCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Sug'orish Vaqti Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Sug&apos;orish Vaqti Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Sug&apos;orish Vaqti Hisoblash</h1>
          <p>
            Maqsadli sug&apos;orish miqdorini (mm), sug&apos;oriladigan
            maydonni (m²) va sug&apos;orish tizimi sarfini (L/soat)
            kiriting: kerakli jami suv va sug&apos;orish vaqtini
            (daqiqa) hisoblang.
          </p>
        </header>

        <IrrigationCalculatorUz />

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
            O&apos;g&apos;it suyultirish nisbati uchun{" "}
            <Link href="/uz/ogit-suyultirish-hisoblash">O&apos;g&apos;it Suyultirish Hisoblash</Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Formula 1 mm suv chuqurligining 1 m² maydonda 1 litrga
            teng bo&apos;lgan asosiy birlik bog&apos;liqligiga
            asoslangan. Bu vosita landshaft konsultatsiyasi o&apos;rnini
            bosmaydi; maqsadli sug&apos;orish miqdorini belgilamaydi.
          </p>
        </section>
      </div>
    </main>
  );
}
