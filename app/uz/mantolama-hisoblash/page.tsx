import type { Metadata } from "next";
import Link from "next/link";
import InsulationCalculatorUz from "../../components/calculators/InsulationCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/mantolama-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Mantolama (issiqlik izolyatsiyasi) plitalari qanday o'lchamlarda sotiladi?",
    answer:
      "Eng keng tarqalgan EPS/XPS mantolama plita o'lchami 100 × 50 sm (0,5 m²). Ba'zi ishlab chiqaruvchilar 120 × 60 sm kabi boshqa o'lchamlarni ham taklif qiladi; vositamizda o'zingiz ishlatadigan plitaning haqiqiy o'lchamini kiritishingiz mumkin.",
  },
  {
    question: "Zaxira ulushi sifatida qancha qo'shishim kerak?",
    answer:
      "Tekis devorlarda odatda %10 zaxira ulushi yetarli. Deraza/eshik bo'shlig'i ko'p, burchak va chuqurchalari ko'p bo'lgan fasadlarda %15-20 zaxira ulushini ishlatish xavfsizroq.",
  },
];

export const metadata: Metadata = {
  title: "Mantolama Hisoblash: Izolyatsiya Plitasi Soni",
  description:
    "Tashqi fasad maydoni va mantolama plita o'lchamini kiriting; zaxira ulushi dahil kerakli izolyatsiya plitasi sonini darhol hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/mantolama-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/mantolama-hesaplama",
    },
  },
  openGraph: {
    title: "Mantolama Hisoblash: Izolyatsiya Plitasi Soni",
    description: "Fasad maydonidan kerakli mantolama/izolyatsiya plitasi sonini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekInsulationCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Mantolama Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Mantolama Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Mantolama (Izolyatsiya) Hisoblash</h1>
          <p>
            Qoplanadigan tashqi fasad maydonini va mantolama plita
            o&apos;lchamini kiriting: zaxira ulushi dahil kerakli
            izolyatsiya plitasi sonini darhol hisoblang.
          </p>
        </header>

        <InsulationCalculatorUz />

        <section className="category-article-content">
          <h2>Mantolama plitasi soni qanday hisoblanadi?</h2>
          <p>
            Avval bitta plitaning maydoni topiladi:{" "}
            <strong>Plita Maydoni = (Kenglik / 100) × (Balandlik / 100)</strong>{" "}
            (santimetrda kiritilgan o&apos;lchamlar metrga aylantiriladi).
            Qoplanadigan maydonga zaxira ulushi qo&apos;shiladi:{" "}
            <strong>Zaxira Ulushi Dahil Maydon = Maydon × (1 + Zaxira Ulushi / 100)</strong>.
            Nihoyat, bu maydon plita maydoniga bo&apos;linib yuqoriga
            yaxlitlanadi va kerakli plitalar soni topiladi.
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
            Plita o&apos;lchami va zaxira ulushi qiymatlari bozorda
            keng qo&apos;llaniladigan mantolama/izolyatsiya mahsuloti
            standartlariga asoslangan. Issiqlik izolyatsiyasi
            qalinligi va material tanlovi uchun me&apos;mor yoki
            mexanika muhandisi bilan ishlash tavsiya etiladi.
          </p>
        </section>
      </div>
    </main>
  );
}
