import type { Metadata } from "next";
import Link from "next/link";
import QsofaCalculatorUz from "../../components/calculators/QsofaCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/qsofa-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "qSOFA nima uchun ishlatiladi?",
    answer:
      "qSOFA (quick SOFA), sepsis shubhasi bo'lgan bemorlarda tez to'shak yonida xavf skriningini o'tkazish uchun ishlatiladigan, laboratoriya natijasi talab qilmaydigan 3 mezonli oddiy balldir.",
  },
  {
    question: "qSOFA bilan to'liq SOFA balli bir xil narsami?",
    answer:
      "Yo'q. qSOFA laboratoriya talab qilmaydigan tezkor skrining vositasidir; to'liq SOFA balli esa 6 organ tizimini laboratoriya qiymatlari bilan birga baholovchi, intensiv terapiyada ishlatiladigan ancha keng qamrovli balldir.",
  },
];

export const metadata: Metadata = {
  title: "qSOFA Hisoblash (Sepsis Skriningi)",
  description:
    "Sistolik qon bosimi, nafas olish soni va ong holatidan qSOFA ballini hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/qsofa-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/qsofa-hesaplama",
    },
  },
  openGraph: {
    title: "qSOFA Hisoblash (Sepsis Skriningi)",
    description: "qSOFA ballini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekQsofaPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "qSOFA Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>qSOFA Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>qSOFA Hisoblash</h1>
          <p>
            Sistolik qon bosimi, nafas olish soni va ong holatini
            belgilang: qSOFA ballini darhol hisoblang.
          </p>
        </header>

        <QsofaCalculatorUz />

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
            To&apos;liq SOFA balli uchun{" "}
            <Link href="/uz/sofa-balli-hisoblash">SOFA Ballini Hisoblash</Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Boshqa Xavf Ballash Vositalari</h2>
          <ul className="related-conversion-list">
            <li><Link href="/uz/sofa-balli-hisoblash">SOFA Ballini Hisoblash</Link></li>
            <li><Link href="/uz/glazgo-koma-shkalasi-hisoblash">Glazgo Koma Shkalasini Hisoblash</Link></li>
            <li><Link href="/uz/apgar-balli-hisoblash">APGAR Ballini Hisoblash</Link></li>
            <li><Link href="/uz/meld-balli-hisoblash">MELD Ballini Hisoblash</Link></li>
            <li><Link href="/uz/wells-balli-hisoblash">Wells Ballini Hisoblash</Link></li>
            <li><Link href="/uz/cha2ds2-vasc-balli-hisoblash">CHA2DS2-VASc Ballini Hisoblash</Link></li>
          </ul>

          <h2>Manbalar</h2>
          <p>
            Ball Sepsis-3 (2016) konsensus ta&apos;riflariga
            asoslangan. Bu vosita tibbiy maslahat o&apos;rnini
            bosmaydi; tashxis va davolash qarori uchun shifokorga
            murojaat qilish kerak.
          </p>
        </section>
      </div>
    </main>
  );
}
