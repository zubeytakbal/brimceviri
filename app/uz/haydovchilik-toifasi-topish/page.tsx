import type { Metadata } from "next";
import Link from "next/link";
import LicenseClassFinderCalculatorUz from "../../components/calculators/LicenseClassFinderCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/haydovchilik-toifasi-topish";

const faqItems: FaqItem[] = [
  {
    question: "O'zbekistonda haydovchilik guvohnomasi qancha yil amal qiladi?",
    answer:
      "Barcha toifadagi (A1, A, B, BE, C, CE, D, DE) haydovchilik guvohnomalari 10 yil amal qiladi, muddati tugagach my.gov.uz portali yoki BXBB (Bezopasnost Xarakati Boshqarmasi) orqali yangilanadi.",
  },
  {
    question: "A1 toifasi nima, unga kim muhtoj?",
    answer:
      "A1 — 2026-yil 1-yanvardan joriy etilgan, moped va skuterlar (dvigateli 50 sm³ gacha yoki elektr quvvati 4 kVt gacha, tezligi 50 km/soatgacha) uchun mo'ljallangan toifa. Uni olish uchun avtomaktabga qatnash shart emas; A, B, C yoki D toifasiga ega bo'lganlar A1 huquqiga alohida ega bo'ladi.",
  },
  {
    question: "B toifasi bilan yuk mashinasini haydash mumkinmi?",
    answer:
      "Yo'q. B toifasi faqat to'la vazni 3 500 kg gacha bo'lgan yengil avtomobillarni qamraydi. Og'irroq transport vositalari uchun C toifasi (21 yosh), 8 tadan ko'p yo'lovchi o'rindig'i bo'lgan transport uchun esa D toifasi (21 yosh) kerak.",
  },
];

export const metadata: Metadata = {
  title: "Qaysi Haydovchilik Guvohnomasi Toifasi Kerak?",
  description:
    "Transport vositangizning o'rindiqlar soni, og'irligi yoki mototsiklingizning turiga qarab O'zbekistonda qaysi haydovchilik guvohnomasi toifasi (A1, A, B, BE, C, CE, D, DE) kerakligini hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/ehliyet-sinifi-bulma",
      "uz-UZ": pagePath,
      "x-default": "/ehliyet-sinifi-bulma",
    },
  },
  openGraph: {
    title: "Qaysi Haydovchilik Guvohnomasi Toifasi Kerak?",
    description: "Toifangizni hisoblang: A1, A, B, BE, C, CE, D, DE.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekLicenseClassFinderPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Qaysi Haydovchilik Guvohnomasi Toifasi Kerak?", item: buildSiteUrl(pagePath) },
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
          <span>Qaysi Haydovchilik Guvohnomasi Toifasi Kerak?</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Qaysi Haydovchilik Guvohnomasi Toifasi Kerak?</h1>
          <p>
            Transport vositangizning o&apos;rindiqlar soni va
            og&apos;irligini yoki mototsiklingizning turini kiriting:
            O&apos;zbekistonda qaysi haydovchilik guvohnomasi toifasi
            kerakligini darhol hisoblang.
          </p>
        </header>

        <LicenseClassFinderCalculatorUz />

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
            Guvohnomangizni yangilash muddati uchun{" "}
            <Link href="/uz/haydovchilik-guvohnomasi-yangilash-muddati-hisoblash">
              Haydovchilik Guvohnomasini Yangilash Muddatini Hisoblash
            </Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Toifa ta&apos;riflari gov.uz rasmiy &quot;Haydovchilik
            guvohnomasi toifalari&quot; sahifasiga asoslangan; yosh
            chegaralari va amal qilish muddati bir nechta mustaqil
            manbadan (osonprava.uz, kun.uz, wikiprocedure.com) o&apos;zaro
            tekshirilgan. A1 (moped/skuter) toifasi 2026-yil
            1-yanvardan joriy etiladi. Bu vosita huquqiy maslahat
            o&apos;rnini bosmaydi; aniq va dolzarb ma&apos;lumot uchun
            rasmiy qonunchilikni yoki avtomaktabni tekshirish tavsiya
            etiladi. <em>(So&apos;nggi tekshiruv: sentyabr 2026)</em>
          </p>
        </section>
      </div>
    </main>
  );
}
