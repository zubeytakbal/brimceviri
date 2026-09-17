import type { Metadata } from "next";
import Link from "next/link";
import GcsCalculatorUz from "../../components/calculators/GcsCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/glazgo-koma-shkalasi-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Glazgo Koma Shkalasi (GKS) ballari nimani anglatadi?",
    answer:
      "GKS 3 dan 15 gacha o'zgaradi: 14-15 yengil, 9-13 o'rtacha, 3-8 og'ir ong buzilishini ko'rsatadi. Minimal ball 3 (chuqur koma), maksimal ball 15 (to'liq uyg'oq va oryentatsiyalangan).",
  },
  {
    question: "Bemor intubatsiya qilingan bo'lsa nutqiy javob qanday baholanadi?",
    answer:
      "Bemor intubatsiya qilingan yoki traxeostomiyali bo'lsa nutqiy javob baholanmaydi va odatda ballga 'T' belgisi qo'yib ko'rsatiladi; jami ball hisoblanganda bu holat alohida qayd etilishi kerak.",
  },
];

export const metadata: Metadata = {
  title: "Glazgo Koma Shkalasini (GKS) Hisoblash",
  description:
    "Ko'z ochish, nutqiy javob va motor javobni tanlang: Glazgo Koma Shkalasi (GKS) jami ballini va ong darajasi kategoriyasini hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/glasgow-koma-skalasi-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/glasgow-koma-skalasi-hesaplama",
    },
  },
  openGraph: {
    title: "Glazgo Koma Shkalasini (GKS) Hisoblash",
    description: "GKS jami ballini va ong darajasi kategoriyasini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekGcsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Glazgo Koma Shkalasini Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Glazgo Koma Shkalasini Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Glazgo Koma Shkalasi (GKS) Hisoblash</h1>
          <p>
            Ko&apos;z ochish, nutqiy javob va motor javobni tanlang:
            GKS jami ballini va ong darajasi kategoriyasini darhol
            hisoblang.
          </p>
        </header>

        <GcsCalculatorUz />

        <section className="category-article-content">
          <h2>GKS nima?</h2>
          <p>
            Glazgo Koma Shkalasi 1974-yilda Graham Teasdale va Bryan
            Jennett tomonidan ishlab chiqilgan, bosh miya jarohati
            olgan yoki ong buzilishiga duch kelgan bemorlarning ong
            darajasini ob&apos;ektiv o&apos;lchash uchun ishlatiladigan
            xalqaro tan olingan klinik baholash shkalasidir. Ko&apos;z
            ochish (1-4), nutqiy javob (1-5) va motor javob (1-6)
            ballarining yig&apos;indisidan iborat.
          </p>

          <h2>Tez-tez So&apos;raladigan Savollar</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>Boshqa Xavf Ballash Vositalari</h2>
          <ul className="related-conversion-list">
            <li><Link href="/uz/apgar-balli-hisoblash">APGAR Ballini Hisoblash</Link></li>
            <li><Link href="/uz/meld-balli-hisoblash">MELD Ballini Hisoblash</Link></li>
            <li><Link href="/uz/sofa-balli-hisoblash">SOFA Ballini Hisoblash</Link></li>
            <li><Link href="/uz/qsofa-hisoblash">qSOFA Hisoblash</Link></li>
            <li><Link href="/uz/wells-balli-hisoblash">Wells Ballini Hisoblash</Link></li>
            <li><Link href="/uz/cha2ds2-vasc-balli-hisoblash">CHA2DS2-VASc Ballini Hisoblash</Link></li>
          </ul>

          <h2>Manbalar</h2>
          <p>
            Shkala Teasdale G, Jennett B (1974), &quot;Assessment of
            coma and impaired consciousness&quot;, The Lancet
            nashriga asoslangan. Bu vosita tibbiy maslahat o&apos;rnini
            bosmaydi; klinik baholash uchun shifokorga murojaat
            qilish kerak.
          </p>
        </section>
      </div>
    </main>
  );
}
