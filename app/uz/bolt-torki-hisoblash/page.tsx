import type { Metadata } from "next";
import Link from "next/link";
import BoltTorqueCalculatorUz from "../../components/calculators/BoltTorqueCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/bolt-torki-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Bolt siqish torki qanday belgilanadi?",
    answer:
      "Bolt siqish torki bolt o'lchamiga (M6, M8, M10...) va mustahkamlik sinfiga (8.8, 10.9, 12.9) qarab DIN 13 kabi standartlarga asoslangan ma'lumotnoma jadvallaridan olinadi. Bu vositadagi qiymatlar bir-biridan mustaqil ikki manbadan o'zaro tasdiqlangan umumiy ma'lumotnoma qiymatlaridir.",
  },
  {
    question: "K-koeffitsienti (nut factor) usuli nima?",
    answer:
      "T = K × D × F formulasi qo'llanilgan tork (T) bilan olingan siqish kuchi (F) orasidagi bog'liqlikni taxmin qiladi. K ishqalanish sharoitlariga bog'liq koeffitsientdir (quruq/yengil moylangan ulanishlar uchun odatda ~0,2 qabul qilinadi); D bolt nominal diametridir.",
  },
  {
    question: "Nima uchun bu qiymatlar aniq deb qabul qilinmasligi kerak?",
    answer:
      "Haqiqiy zarur tork yuza qoplamasi, moylash holati, gayka turi va ulanishning maxsus dizayn talablariga qarab sezilarli darajada o'zgarishi mumkin. Muhim yoki standartga bo'ysunuvchi montajlarda bolt ishlab chiqaruvchisi yoki dizaynerning ko'rsatgan aniq qiymati ishlatilishi kerak.",
  },
];

export const metadata: Metadata = {
  title: "Bolt Torki Hisoblash (DIN 13, 8.8/10.9/12.9)",
  description:
    "Bolt o'lchami va mustahkamlik sinfidan tavsiya etilgan siqish torkini (Nm), K-koeffitsienti usuli bilan taxminiy siqish kuchini ham hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/civata-torku-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/civata-torku-hesaplama",
    },
  },
  openGraph: {
    title: "Bolt Torki Hisoblash (DIN 13, 8.8/10.9/12.9)",
    description: "Bolt o'lchami va sinfidan siqish torkini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekBoltTorqueCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Bolt Torki Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Bolt Torki Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Bolt Torki Hisoblash</h1>
          <p>
            Bolt o&apos;lchami va mustahkamlik sinfini tanlang:
            tavsiya etilgan boshlang&apos;ich siqish torkini ko&apos;ring.
            K-koeffitsienti usuli bilan bu torkning taxminan qancha
            siqish kuchi hosil qilishini ham hisoblang.
          </p>
        </header>

        <BoltTorqueCalculatorUz />

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
            Tork qiymatlari DIN 13 me&apos;yoriga asoslangan va ikki
            mustaqil manbadan (bir-biriga yaqin natijalar beruvchi)
            o&apos;zaro tasdiqlangan umumiy ma&apos;lumotnomalardir.
            K-koeffitsienti usuli bolt muhandisligida keng
            qo&apos;llaniladigan T = K × D × F bog&apos;liqligiga
            asoslangan. Bu vosita muhandislik tasdig&apos;ining
            o&apos;rnini bosmaydi.
          </p>
        </section>
      </div>
    </main>
  );
}
