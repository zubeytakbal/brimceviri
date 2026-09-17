import type { Metadata } from "next";
import Link from "next/link";
import WellsScoreCalculatorUz from "../../components/calculators/WellsScoreCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/wells-balli-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Wells Balli nima uchun ishlatiladi?",
    answer:
      "Pulmoner emboliya (PE) shubhasi bo'lgan bemorlarda, keyingi tekshiruvlar (D-dimer, KT angiografiya) oldidan klinik ehtimollikni baholash uchun ishlatiladigan xavf ballash vositasidir.",
  },
  {
    question: "3 darajali va 2 darajali talqin orasidagi farq nima?",
    answer:
      "Klassik Wells balli past/o'rtacha/yuqori bo'lib 3 kategoriyaga bo'linadi. Keyinroq ishlab chiqilgan soddalashtirilgan (dichotomized) versiya esa faqat 'PE ehtimoli bor' / 'PE ehtimoli yo'q' tarzida 2 kategoriyadan foydalanadi; ikkala talqin ham klinik amaliyotda ishlatiladi.",
  },
];

export const metadata: Metadata = {
  title: "Wells Ballini Hisoblash (Pulmoner Emboliya)",
  description:
    "Klinik mezonlarni belgilang: pulmoner emboliya (PE) ehtimoli uchun Wells ballini va xavf kategoriyasini hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/wells-skoru-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/wells-skoru-hesaplama",
    },
  },
  openGraph: {
    title: "Wells Ballini Hisoblash (Pulmoner Emboliya)",
    description: "PE ehtimoli uchun Wells ballini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekWellsScorePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Wells Ballini Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Wells Ballini Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Wells Ballini Hisoblash (Pulmoner Emboliya)</h1>
          <p>
            Klinik mezonlarni belgilang: pulmoner emboliya (PE)
            ehtimoli uchun Wells ballini va xavf kategoriyasini
            darhol hisoblang.
          </p>
        </header>

        <WellsScoreCalculatorUz />

        <section className="category-article-content">
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
            <li><Link href="/uz/glazgo-koma-shkalasi-hisoblash">Glazgo Koma Shkalasini Hisoblash</Link></li>
            <li><Link href="/uz/apgar-balli-hisoblash">APGAR Ballini Hisoblash</Link></li>
            <li><Link href="/uz/meld-balli-hisoblash">MELD Ballini Hisoblash</Link></li>
            <li><Link href="/uz/sofa-balli-hisoblash">SOFA Ballini Hisoblash</Link></li>
            <li><Link href="/uz/qsofa-hisoblash">qSOFA Hisoblash</Link></li>
            <li><Link href="/uz/cha2ds2-vasc-balli-hisoblash">CHA2DS2-VASc Ballini Hisoblash</Link></li>
          </ul>

          <h2>Manbalar</h2>
          <p>
            Ball Wells PS va h.k. (2000) tomonidan e&apos;lon qilingan
            klinik qaror qoidasiga asoslangan. Bu vosita tibbiy
            maslahat o&apos;rnini bosmaydi; tashxis va davolash qarori
            uchun shifokorga murojaat qilish kerak.
          </p>
        </section>
      </div>
    </main>
  );
}
