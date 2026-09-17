import type { Metadata } from "next";
import Link from "next/link";
import RealEstateCommissionCalculatorUz from "../../components/calculators/RealEstateCommissionCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/kochmas-mulk-komissiyasi-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Ko'chmas mulk komissiyasi odatda necha foiz bo'ladi?",
    answer:
      "O'zbekistonda rieltor/agentlik komissiyasi uchun qonun bilan belgilangan yagona bir stavka yo'q — foiz taraflar (mulk egasi va agentlik) o'rtasida erkin kelishiladi. Amaliyotda sotishda odatda 1-5% oralig'ida, ijarada esa ko'pincha 1 oylik ijara narxiga teng komissiya keng tarqalgan, lekin bu qat'iy qonuniy talab emas.",
  },
  {
    question: "Bu foizlar o'zgarishi mumkinmi?",
    answer:
      "Ha, komissiya foizi to'liq shartnoma erkinligiga asoslanadi va agentlikdan agentlikka farq qilishi mumkin. Bu vosita foizni siz kiritishingiz uchun ochiq maydon sifatida taqdim etadi; o'z shartnomangizdagi aniq foizni kiritishingiz kerak.",
  },
  {
    question: "Komissiyaga QQS kiradimi?",
    answer:
      "Bu vositada komissiya (QQS siz) va QQS miqdori alohida ko'rsatiladi, so'ngra ikkalasi qo'shilib jami komissiya topiladi. Standart QQS stavkasi 12%, lekin agentlikning soliq rejimiga qarab farq qilishi mumkin.",
  },
];

export const metadata: Metadata = {
  title: "Ko'chmas Mulk Komissiyasini Hisoblash: Sotish va Ijaraga Berish",
  description:
    "Sotish narxi yoki oylik ijaradan, kelishilgan komissiya foizi va QQS stavkasiga ko'ra ko'chmas mulk komissiyasini hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/emlak-komisyonu-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/emlak-komisyonu-hesaplama",
    },
  },
  openGraph: {
    title: "Ko'chmas Mulk Komissiyasini Hisoblash",
    description: "Sotish yoki ijaraga berish bitimida ko'chmas mulk komissiyasini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekRealEstateCommissionPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Ko'chmas Mulk Komissiyasini Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Ko&apos;chmas Mulk Komissiyasini Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Ko&apos;chmas Mulk Komissiyasini Hisoblash</h1>
          <p>
            Bitim turini (sotish yoki ijaraga berish) tanlang, narxni
            va komissiya foizini kiriting: QQS dahil va QQS siz
            ko&apos;chmas mulk komissiyasini darhol hisoblang.
          </p>
        </header>

        <RealEstateCommissionCalculatorUz />

        <section className="category-article-content">
          <h2>Ko&apos;chmas mulk komissiyasi qanday hisoblanadi?</h2>
          <p>
            <strong>Komissiya = Bitim Narxi × Foiz (%)</strong>, ustiga
            QQS qo&apos;shiladi. Foiz mulk egasi va agentlik/rieltor
            o&apos;rtasida erkin kelishiladi — O&apos;zbekistonda bu
            uchun qonun bilan belgilangan yagona stavka topilmadi.
          </p>

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
            QQS stavkasini o&apos;zgartirib umumiy hisob-kitob qilish
            uchun{" "}
            <Link href="/uz/qqs-hisoblash">QQS Hisoblash</Link>{" "}
            vositasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Bu vosita umumiy foiz + QQS matematikasini qo&apos;llaydi;
            komissiya foizini qonuniy tavan sifatida belgilamaydi,
            chunki O&apos;zbekistonda bunday aniq yuridik chegara
            topilmadi. Bu vosita huquqiy yoki moliyaviy maslahat
            o&apos;rnini bosmaydi.
          </p>
        </section>
      </div>
    </main>
  );
}
