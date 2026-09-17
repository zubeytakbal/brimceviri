import type { Metadata } from "next";
import Link from "next/link";
import SeedRateCalculatorUz from "../../components/calculators/SeedRateCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/urugi-miqdori-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Ming don og'irligi (TDW) nima?",
    answer:
      "Ming don og'irligi 1000 dona urug' donasining gram hisobidagi og'irligidir; odatda urug' yorlig'ida yoki sertifikatida ko'rsatiladi. Don kattaligi ortishi bilan ming don og'irligi ham ortadi.",
  },
  {
    question: "Urug' miqdori (urug'lik) qanday hisoblanadi?",
    answer:
      "Dekar uchun Kerakli Urug'lik (kg/da) = (Maqsadli O'simlik Soni/m² × Ming Don Og'irligi (g)) ÷ (Unib Chiqish Darajasi % × Tozalik Darajasi % × 1000). Unib chiqish va tozalik darajasi pasayishi bilan, bir xil o'simlik sonini olish uchun ko'proq urug' ekishingiz kerak bo'ladi.",
  },
  {
    question: "Maqsadli o'simlik soni va ming don og'irligi qayerdan topiladi?",
    answer:
      "Maqsadli o'simlik soni (zichlik) mahsulot turiga, ekish vaqtiga va hududga qarab o'zgaradi; ming don og'irligi esa ishlatadigan urug' partiyangizga xos bo'lib, yorlig'ida yozilgan bo'ladi. Bu qiymatlarni agronomdan yoki urug' yorlig'idan olishingiz kerak.",
  },
];

export const metadata: Metadata = {
  title: "Urug' Miqdori Hisoblash (Urug'lik, kg/dekar)",
  description:
    "Maqsadli o'simlik soni, ming don og'irligi, unib chiqish va tozalik darajasidan, dekar va umumiy maydon uchun kerakli urug'lik miqdorini (kg) hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/tohum-miktari-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/tohum-miktari-hesaplama",
    },
  },
  openGraph: {
    title: "Urug' Miqdori Hisoblash (Urug'lik, kg/dekar)",
    description: "Ming don og'irligidan urug'lik miqdorini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekSeedRateCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Urug' Miqdori Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Urug&apos; Miqdori Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Urug&apos; Miqdori Hisoblash</h1>
          <p>
            Maqsadli o&apos;simlik sonini, ming don og&apos;irligini,
            unib chiqish va tozalik darajasini kiriting: dekar va
            umumiy maydon uchun kerakli urug&apos;lik miqdorini (kg)
            hisoblang.
          </p>
        </header>

        <SeedRateCalculatorUz />

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
            O&apos;g&apos;it ehtiyojini hisoblash uchun{" "}
            <Link href="/uz/ogit-ehtiyoji-hisoblash">O&apos;g&apos;it Ehtiyoji Hisoblash</Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Formula qishloq xo&apos;jaligida standart hisoblangan ming
            don og&apos;irligi (TDW) asosidagi urug&apos;lik hisobiga
            asoslangan. Bu vosita qishloq xo&apos;jaligi
            konsultatsiyasi o&apos;rnini bosmaydi; maqsadli o&apos;simlik
            sonini yoki nav tanlovini belgilamaydi.
          </p>
        </section>
      </div>
    </main>
  );
}
