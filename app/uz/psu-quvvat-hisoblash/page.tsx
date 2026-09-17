import type { Metadata } from "next";
import Link from "next/link";
import PsuCalculatorUz from "../../components/calculators/PsuCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/psu-quvvat-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "PSU (quvvat manbai) quvvati qanday hisoblanadi?",
    answer:
      "Avval tizimdagi barcha komponentlarning (CPU, GPU, ona plata, RAM, disk, ventilyatorlar) jami quvvat sarfi (W) qo'shiladi. Keyin vaqtinchalik yuk sakrashlarini va PSU samaradorlik egri chizig'ini qoplash uchun bu jamiga 20-30% xavfsizlik zaxirasi qo'shiladi.",
  },
  {
    question: "Nima uchun xavfsizlik zaxirasi qo'shishim kerak?",
    answer:
      "Komponentlar qisqa muddat nominal quvvatlaridan yuqori tortishi mumkin (ayniqsa GPUlar). Shuningdek 80+ samaradorlik sertifikatiga ega PSUlar sig'imining 50-60% ida ishlatilganda eng samarali ishlaydi; to'liq sig'imga yaqin doimiy ishlatish PSU umrini qisqartirishi mumkin.",
  },
  {
    question: "CPU va GPU TDP qiymatlarini qayerdan topaman?",
    answer:
      "TDP (Thermal Design Power) qiymatlari ishlab chiqaruvchining (Intel, AMD, NVIDIA) mahsulot sahifasida yoki qutida ko'rsatiladi.",
  },
];

export const metadata: Metadata = {
  title: "PSU Quvvat Manbai Hisoblash (Vatt)",
  description:
    "CPU, GPU va boshqa komponentlarning quvvatidan (W), xavfsizlik zaxirasi bilan tavsiya etilgan PSU (quvvat manbai) vattajini hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/psu-guc-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/psu-guc-hesaplama",
    },
  },
  openGraph: {
    title: "PSU Quvvat Manbai Hisoblash (Vatt)",
    description: "Komponent quvvatlaridan tavsiya etilgan PSU vattajini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekPsuCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "PSU Quvvat Manbai Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>PSU Quvvat Manbai Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>PSU Quvvat Manbai Hisoblash</h1>
          <p>
            CPU, GPU va boshqa komponentlarning quvvatini (W)
            kiriting: xavfsizlik zaxirasi bilan tavsiya etilgan PSU
            vattajini hisoblang.
          </p>
        </header>

        <PsuCalculatorUz />

        <section className="category-article-content">
          <h2>Tez-tez So&apos;raladigan Savollar</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}
        </section>
      </div>
    </main>
  );
}
