import type { Metadata } from "next";
import ZoningCalculatorUz from "../../components/calculators/ZoningCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";
import Link from "next/link";

const pagePath = "/uz/qurilish-zichligi-koeffitsiyenti-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "KAKS (qurilish zichligi koeffitsiyenti) nima?",
    answer:
      "KAKS bir uchastkada qurilishi mumkin bo'lgan jami qurilish maydonining, uchastka maydoniga nisbatini bildiradi. Bu ko'plab mamlakatlarning shahar qurilishi qonunchiligida qo'llaniladigan xalqaro tanish tushuncha (floor area ratio).",
  },
  {
    question: "Jami qurilish maydoni qanday hisoblanadi?",
    answer:
      "Jami Qurilish Maydoni (m²) = Uchastka Maydoni (m²) × KAKS. Masalan, 1.000 m² uchastkada KAKS qiymati 2,0 bo'lsa, jami 2.000 m² qurilish maydoni qurish mumkin.",
  },
  {
    question: "TAKS nima va qavatlar soni qanday taxmin qilinadi?",
    answer:
      "TAKS (asos maydoni koeffitsiyenti) bitta qavat egallashi mumkin bo'lgan maksimal maydonni belgilaydi: Maksimal Asos Maydoni = Uchastka Maydoni × TAKS. Jami qurilish maydonini asos maydoniga bo'lish, taxminan necha qavat qurish mumkinligini ko'rsatadi.",
  },
  {
    question: "KAKS va TAKS qiymatlarini qayerdan bilib olaman?",
    answer:
      "Bu qiymatlar uchastkaga xos bo'lib, shahar qurilish-arxitektura boshqarmasidan yoki qurilish uchun ruxsatnoma hujjatidan olinadi. Bu vosita bu qiymatlarni belgilamaydi, faqat birlik hisobini amalga oshiradi.",
  },
];

export const metadata: Metadata = {
  title: "Qurilish Zichligi Koeffitsiyentini (KAKS) Hisoblash",
  description:
    "Uchastka maydoni, KAKS va TAKS qiymatidan jami qurilish maydonini, maksimal asos maydonini va taxminiy qavatlar sonini hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/emsal-kaks-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/emsal-kaks-hesaplama",
    },
  },
  openGraph: {
    title: "Qurilish Zichligi Koeffitsiyentini (KAKS) Hisoblash",
    description: "Uchastka maydoni va KAKS qiymatidan qurilish maydonini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekZoningCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Qurilish Zichligi Koeffitsiyentini Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Qurilish Zichligi Koeffitsiyentini Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Qurilish Zichligi Koeffitsiyentini (KAKS) Hisoblash</h1>
          <p>
            Uchastka maydonini va KAKS qiymatini kiriting: jami
            qurilish maydonini hisoblang. TAKS qiymatini ham
            qo&apos;shsangiz, maksimal asos maydoni va taxminiy
            qavatlar sonini ham ko&apos;rasiz.
          </p>
        </header>

        <ZoningCalculatorUz />

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
            Formula xalqaro miqyosda qo&apos;llaniladigan qurilish
            zichligi koeffitsiyenti (floor area ratio) tushunchasiga
            asoslangan. Bu vosita qurilish maslahati o&apos;rnini
            bosmaydi; KAKS/TAKS qiymatlarini o&apos;zi belgilamaydi —
            bu qiymatlarni shahar qurilish-arxitektura boshqarmasidan
            olishingiz kerak.
          </p>
        </section>
      </div>
    </main>
  );
}
