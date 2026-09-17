import type { Metadata } from "next";
import Link from "next/link";
import CuttingSpeedCalculatorUz from "../../components/calculators/CuttingSpeedCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/kesish-tezligi-aylanish-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Kesish tezligidan aylanish (RPM) qanday hisoblanadi?",
    answer:
      "Aylanish (N) = (Kesish Tezligi (Vc, m/daqiqa) × 1000) / (π × Diametr (D, mm)). Bu formula tokarlik va frezalashda kesish asbobi yoki ish bo'lagining aylanish tezligini aniqlash uchun ishlatiladi.",
  },
  {
    question: "Kesish tezligi (Vc) qanday tanlanadi?",
    answer:
      "Kesish tezligi ish bo'lagi materiali, kesish asbobi turi (HSS, karbid va h.k.) va sovutish suyuqligidan foydalanishga qarab o'zgaradi. To'g'ri qiymat uchun kesish asbobi ishlab chiqaruvchisining katalogiga qarash kerak.",
  },
];

export const metadata: Metadata = {
  title: "Kesish Tezligi - Aylanish (RPM) Hisoblash",
  description:
    "Kesish tezligi (Vc), diametr (D) va aylanishdan (N) ikkitasini kiriting, uchinchisini tokarlik/frezalash formulasi bilan hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/kesme-hizi-devir-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/kesme-hizi-devir-hesaplama",
    },
  },
  openGraph: {
    title: "Kesish Tezligi - Aylanish (RPM) Hisoblash",
    description: "Kesish tezligi, diametr va aylanish orasida hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekCuttingSpeedCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Kesish Tezligi - Aylanish Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Kesish Tezligi - Aylanish Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Kesish Tezligi - Aylanish (RPM) Hisoblash</h1>
          <p>
            Kesish tezligi (Vc), diametr (D) va aylanishdan (N)
            qaysi birini hisoblamoqchi ekaningizni tanlang; qolgan
            ikkitasini kiriting.
          </p>
        </header>

        <CuttingSpeedCalculatorUz />

        <section className="category-article-content">
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
            Formula tokarlik va frezalash jarayonlarida standart
            hisoblangan kesish tezligi-aylanish bog&apos;liqligiga
            asoslangan. Kesish asbobi ishlab chiqaruvchisining katalog
            qiymatlari har doim asos qilib olinishi kerak.
          </p>
        </section>
      </div>
    </main>
  );
}
