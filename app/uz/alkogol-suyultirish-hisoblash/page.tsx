import type { Metadata } from "next";
import Link from "next/link";
import AlcoholDilutionCalculatorUz from "../../components/calculators/AlcoholDilutionCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/alkogol-suyultirish-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Alkogol suyultirish qanday hisoblanadi?",
    answer:
      "Xuddi C₁V₁ = C₂V₂ bog'liqligi, mol/L o'rniga foiz (%) konsentratsiya bilan ishlatiladi: Boshlang'ich Konsentratsiya (%) × Boshlang'ich Hajm (mL) = Maqsadli Konsentratsiya (%) × Maqsadli Hajm (mL). Formula ikkala foiz konsentratsiyasi ham bir xil ta'rifga (masalan hajm bo'yicha %, v/v) asoslangan ekan amal qiladi.",
  },
  {
    question: "96% alkogoldan 70% alkogol qanday tayyorlanadi?",
    answer:
      "Misol: 1000 mL 70% alkogol tayyorlash uchun, 96% li boshlang'ichdan V₁ = (70 × 1000) / 96 ≈ 729 mL olinadi va ustiga suv qo'shib 1000 mL ga to'ldiriladi.",
  },
  {
    question: "70% alkogol nima uchun keng tarqalgan dezinfeksiya standarti?",
    answer:
      "JSST (WHO) va CDC kabi tashkilotlar etanol asosidagi dezinfektantlar uchun 60-90% oralig'ini, eng ko'p esa 70% ni ma'lumotnoma sifatida ko'rsatadi; bu ochiq, umumiy sog'liqni saqlash standartidir. Bu vosita bu ma'lumotni hisoblashga yordam berish uchun ishlatiladi, sizning maxsus holatingiz uchun qaysi konsentratsiya mos ekanligiga qaror qilmaydi.",
  },
];

export const metadata: Metadata = {
  title: "Alkogol Suyultirish Hisoblash (% Konsentratsiya)",
  description:
    "Boshlang'ich alkogol konsentratsiyasi va hajmidan, maqsadli konsentratsiya yoki hajmdan yetishmayotgan qiymatni C₁V₁ = C₂V₂ bog'liqligi bilan foiz (%) konsentratsiya hisobida hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/alkol-seyreltme-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/alkol-seyreltme-hesaplama",
    },
  },
  openGraph: {
    title: "Alkogol Suyultirish Hisoblash (% Konsentratsiya)",
    description: "Foiz konsentratsiya bilan alkogol suyultirish hisobini qiling.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekAlcoholDilutionCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Alkogol Suyultirish Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Alkogol Suyultirish Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Alkogol Suyultirish Hisoblash</h1>
          <p>
            Boshlang&apos;ich alkogol konsentratsiyasi va hajmidan,
            yoki maqsadli konsentratsiya va hajmdan yetishmayotgan
            qiymatni C₁V₁ = C₂V₂ bog&apos;liqligi bilan, foiz (%)
            konsentratsiya hisobida hisoblang.
          </p>
        </header>

        <AlcoholDilutionCalculatorUz />

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
            Formula konsentratsiya saqlanish qonuniga (C₁V₁ = C₂V₂)
            asoslangan. 70% kabi ma&apos;lumotnoma qiymatlari
            JSST/CDC kabi tashkilotlarning ochiq umumiy dezinfeksiya
            qo&apos;llanmalaridan olingan; bu vosita tibbiy/farmatsevtika
            maslahati o&apos;rnini bosmaydi.
          </p>
        </section>
      </div>
    </main>
  );
}
