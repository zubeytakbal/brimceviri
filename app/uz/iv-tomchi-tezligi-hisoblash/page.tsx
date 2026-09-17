import type { Metadata } from "next";
import Link from "next/link";
import IvDripRateCalculatorUz from "../../components/calculators/IvDripRateCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/iv-tomchi-tezligi-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Tomchi koeffitsienti (gtt/mL) nimani anglatadi, qanday tanlanadi?",
    answer:
      "Tomchi koeffitsienti ishlatilayotgan IV to'plamning 1 mL suyuqlikni necha tomchiga bo'lishini ko'rsatadi. Standart makro to'plamlar odatda 10, 15 yoki 20 gtt/mL; pediatrik/mikro to'plamlar esa 60 gtt/mL. Ishlatayotgan to'plamingizning qadog'ida bu qiymat yozilgan.",
  },
  {
    question: "Bu vosita retsept qilingan tezlik/hajmni o'zgartiradimi?",
    answer:
      "Yo'q. Bu vosita faqat shifokor tomonidan retsept qilingan hajm va vaqtni tomchi/daqiqa birligiga aylantiradi. Retsept qilingan qiymatni belgilamaydi, o'zgartirmaydi; natija har doim shifokor ko'rsatmasi va muassasa protokoli bilan solishtirilishi kerak.",
  },
];

export const metadata: Metadata = {
  title: "IV Tomchi Tezligini Hisoblash (Tomchi/Daqiqa)",
  description:
    "Jami hajm, vaqt va tomchi koeffitsientidan, daqiqadagi tomchilar sonini (gtt/daq) va mL/soat ko'rinishini hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/iv-damla-hizi-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/iv-damla-hizi-hesaplama",
    },
  },
  openGraph: {
    title: "IV Tomchi Tezligini Hisoblash (Tomchi/Daqiqa)",
    description: "Hajm, vaqt va tomchi koeffitsientidan tomchi tezligini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekIvDripRatePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "IV Tomchi Tezligini Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>IV Tomchi Tezligini Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>IV Tomchi Tezligini Hisoblash</h1>
          <p>
            Jami hajm, vaqt va tomchi koeffitsientini kiriting:
            daqiqadagi tomchilar sonini (gtt/daq) va pompa tezligi
            (mL/soat) ko&apos;rinishini darhol hisoblang.
          </p>
        </header>

        <IvDripRateCalculatorUz />

        <section className="category-article-content">
          <h2>Tomchi tezligi qanday hisoblanadi?</h2>
          <p>
            <strong>
              Tomchi/daq = (Jami Hajm (mL) × Tomchi Koeffitsienti
              (gtt/mL)) / Vaqt (daqiqa)
            </strong>
            . Infuzion nasos ishlatilsa, nasosning mL/soat sozlamasi
            afzal ko&apos;rilishi kerak; tomchi sanash usuli faqat
            nasos bo&apos;lmagan holatlar uchun ishlatiladi.
          </p>

          <h2>Tez-tez So&apos;raladigan Savollar</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>Manbalar</h2>
          <p>
            Formula hamshiralik ta&apos;limida standart ishlatiladigan
            asosiy IV infuzion hisobiga asoslangan. Bu vosita tibbiy
            maslahat o&apos;rnini bosmaydi va retsept qilingan
            davolashni o&apos;zgartirmaydi.
          </p>
        </section>
      </div>
    </main>
  );
}
