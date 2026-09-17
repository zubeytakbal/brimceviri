import type { Metadata } from "next";
import Link from "next/link";
import ConcreteMarkaClassCalculatorUz from "../../components/calculators/ConcreteMarkaClassCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildFullLanguageAlternates } from "../../i18n/routing";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/beton-markasi-sinfi-aylantirgich";

const faqItems: FaqItem[] = [
  {
    question: "Beton markasi va sinfi orasidagi farq nima?",
    answer:
      "Marka (M) — betonning o'rtacha mustahkamlik ko'rsatkichi, kgf/sm² da o'lchanadi va Sovet davridan qolgan GOST tizimiga tegishli. Sinf (B) — kafolatlangan mustahkamlik ko'rsatkichi, MPa da o'lchanadi va 95% ehtimollik bilan ta'minlanadigan minimal mustahkamlikni bildiradi (xalqaro standartlarga yaqinroq). Ikkalasi ham hozirgacha O'zbekiston qurilish bozorida parallel ishlatiladi.",
  },
  {
    question: "Nega marka va sinf orasidagi mos kelish aniq formula bilan emas?",
    answer:
      "Chunki sinf statistik kafolatlangan qiymat (o'rtachadan pastroq, ehtimollik nazariyasiga asoslangan), marka esa oddiy o'rtacha qiymat. Shu sababli ular orasidagi nisbat sof matematik ko'paytma emas, GOST tomonidan jadval shaklida belgilangan.",
  },
  {
    question: "Qaysi marka/sinfni tanlashim kerak?",
    answer:
      "Bu loyihaning turiga bog'liq: past yuklama uchun (yo'lka, ko'r maydon) M100-M150, oddiy poydevor va pollar uchun M200-M250, yuk ko'taruvchi konstruksiyalar uchun M300-M350, maxsus/og'ir konstruksiyalar uchun M400 va undan yuqori tavsiya etiladi. Aniq tanlov uchun loyiha muhandisi bilan maslahatlashish tavsiya etiladi.",
  },
];

export const metadata: Metadata = {
  title: "Beton Markasi va Sinfini Aylantirish (M ↔ B)",
  description:
    "Beton markasini (M100-M800) sinfga (B3.5-B60) yoki aksincha aylantiring; GOST 26633 standartiga asoslangan to'liq mos kelish jadvali bilan.",
  alternates: {
    canonical: pagePath,
    ...buildFullLanguageAlternates(pagePath),
  },
  openGraph: {
    title: "Beton Markasi va Sinfini Aylantirish (M ↔ B)",
    description: "Beton markasi va sinfi orasida aylantiring.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekConcreteMarkaClassPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Beton Markasi va Sinfini Aylantirish", item: buildSiteUrl(pagePath) },
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
          <span>Beton Markasi va Sinfini Aylantirish</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Beton Markasi va Sinfini Aylantirish</h1>
          <p>
            Beton markasini (M100-M800) yoki sinfini (B3.5-B60)
            tanlang: GOST 26633 standartiga asoslangan mos kelish
            qiymatini darhol ko&apos;ring.
          </p>
        </header>

        <ConcreteMarkaClassCalculatorUz />

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
            Beton hajmini va aralashma materiallarini hisoblash uchun{" "}
            <Link href="/uz/beton-hisoblash">Beton Hisoblash</Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Marka-sinf mos kelish jadvali GOST 26633 standartida
            keng qo&apos;llaniladigan, sohada barqaror qiymatlarga
            asoslangan. Bu vosita umumiy ma&apos;lumot maqsadida
            taqdim etilgan; muhim qurilish ishlarida yetkazib
            beruvchining rasmiy sertifikatidagi aniq qiymatga tayanish
            kerak.
          </p>
        </section>
      </div>
    </main>
  );
}
