import type { Metadata } from "next";
import Link from "next/link";
import TravelPlugVoltageCalculatorUz from "../../components/calculators/TravelPlugVoltageCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/sayohat-rozetka-voltaj-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Adapter kerakmi, o'zgartirgich kerakmi?",
    answer:
      "Adapter faqat vilkaning rozetkaga jismonan mos kelishi uchun kerak, voltajni o'zgartirmaydi. O'zgartirgich esa voltajni o'zgartiradi. Ko'pchilik telefon, noutbuk va kamera zaryadlagichi '100-240V' deb yozilgani uchun ikki voltajli va faqat adapterga muhtoj; soch quritgich, dazmol kabi bitta voltajli qurilmalar uchun o'zgartirgich ham kerak bo'lishi mumkin.",
  },
  {
    question: "Qurilmamning ikki voltajli ekanligini qanday bilaman?",
    answer:
      "Qurilmaning zaryadlagichi yoki o'zining ustidagi yorliqqa qarang. '100-240V, 50/60Hz' deb yozilgan bo'lsa, u ikki voltajli va dunyoning istalgan joyida ishlaydi, faqat rozetka shakli uchun adapter kerak bo'lishi mumkin. Faqat '230V' yoki '120V' kabi bitta qiymat yozilgan bo'lsa, boshqa voltajli mamlakatda o'zgartirgich ishlatishingiz kerak.",
  },
  {
    question: "O'zbekistondan ketayotganda qaysi mamlakatlarda ko'proq adapter kerak bo'ladi?",
    answer:
      "O'zbekiston C va F turidagi rozetkalarni ishlatadi (Yevropa standarti), 230V/50Hz bilan. Shu sababli ko'pchilik Yevropa mamlakatida va Turkiyada adapterga hojat yo'q. Ammo Buyuk Britaniya, Irlandiya, Malta kabi G turini ishlatadigan mamlakatlarga; AQSH, Kanada kabi A/B turini ishlatadigan mamlakatlarga; Hindiston kabi D/M turini ishlatadigan mamlakatlarga borganingizda albatta adapter kerak bo'ladi.",
  },
];

export const metadata: Metadata = {
  title: "Sayohat Rozetkasi va Voltaj Mosligini Hisoblash",
  description:
    "Boradigan mamlakatingizga adapter yoki o'zgartirgich olib borish kerakligini hisoblang: mamlakatingizni va borish mamlakatingizni tanlang, rozetka turi, voltaj va chastota mosligini darhol ko'ring.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/seyahat-priz-voltaj-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/seyahat-priz-voltaj-hesaplama",
    },
  },
  openGraph: {
    title: "Sayohat Rozetkasi va Voltaj Mosligini Hisoblash",
    description: "Ikki mamlakat tanlang, adapter yoki o'zgartirgich kerakligini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekTravelPlugVoltagePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Sayohat Rozetkasi va Voltaj Mosligini Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Sayohat Rozetkasi va Voltaj Mosligini Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Sayohat Rozetkasi va Voltaj Mosligini Hisoblash</h1>
          <p>
            Kelgan mamlakatingizni va boradigan mamlakatingizni
            tanlang; rozetka turi, voltaj va chastota farqiga qarab
            adapter yoki voltaj o&apos;zgartirgichga muhtoj
            ekanligingizni darhol hisoblang.
          </p>
        </header>

        <TravelPlugVoltageCalculatorUz />

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
            Voltaj, chastota va rozetka turi ma&apos;lumotlari
            mamlakatlarning rasmiy elektr infratuzilma standartlarini
            jamlagan dolzarb manbalardan o&apos;zaro tekshirilgan. Bu
            standartlar davlat darajasida belgilangani uchun juda
            barqaror, ammo ba&apos;zi mamlakatlarda (masalan, Braziliya)
            hududga qarab voltaj farq qilishi mumkin; muhim qurilmalar
            uchun sayohatdan oldin qurilmangizning o&apos;z yorlig&apos;ini
            tekshirish tavsiya etiladi.
          </p>
        </section>
      </div>
    </main>
  );
}
