import type { Metadata } from "next";
import Link from "next/link";
import SolarPanelPaybackCalculatorUz from "../../components/calculators/SolarPanelPaybackCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/quyosh-paneli-qoplanishi-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Quyosh paneli necha yilda o'zini oqlaydi?",
    answer:
      "Bu tizim quvvatingizga, hududingizning quyosh energiyasi salohiyatiga va o'rnatish narxiga bog'liq. Aniq muddat uchun yuqoridagi hisoblagichga o'z raqamlaringizni kiriting.",
  },
  {
    question: "1 kWp quyosh paneli yiliga qancha elektr ishlab chiqaradi?",
    answer:
      "Bu hududga qarab o'zgaradi. NASA POWER'ning Toshkent koordinatalari uchun 20 yillik iqlim ma'lumotlariga ko'ra o'rtacha quyosh nurlanishi 4,61 kWh/m²/kun (yiliga ~1683 kWh/m²) ni tashkil qiladi; tizim yo'qotishlarini hisobga olganda 1 kWp'lik tizim Toshkentda yiliga taxminan 1300-1400 kWh elektr ishlab chiqarishi kutiladi. Janubiy hududlarda (Buxoro, Surxondaryo) bu qiymat yanada yuqori bo'lishi mumkin. Aniq qiymat uchun mahalliy quyosh energiyasi xaritalariga yoki quyosh paneli yetkazib beruvchiga murojaat qiling.",
  },
  {
    question: "Ortiqcha ishlab chiqarilgan elektr nima bo'ladi?",
    answer:
      "Tarmoqqa ulangan (on-grid) tizimlarda, iste'molingizdan ortiq ishlab chiqarish hisob-kitob orqali tarmoqqa uzatiladi va odatda chakana sotish narxidan past narxda qaytariladi. Bu hisoblagich soddalik uchun barcha ishlab chiqarishning o'z iste'molingizda ishlatilishini taxmin qiladi; haqiqiy tejamkorligingiz iste'mol profilingizga qarab biroz farq qilishi mumkin.",
  },
];

export const metadata: Metadata = {
  title: "Quyosh Paneli Qoplanishi Hisoblash (Necha Yilda O'zini Oqlaydi?)",
  description:
    "Tizim quvvatingiz, hududiy samaradorlik va elektr narxingiz bilan quyosh panelining yillik ishlab chiqargan elektrini, tejamkorligini va necha yilda o'zini oqlashini hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/gunes-paneli-amortisman-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/gunes-paneli-amortisman-hesaplama",
    },
  },
  openGraph: {
    title: "Quyosh Paneli Qoplanishi Hisoblash (Necha Yilda O'zini Oqlaydi?)",
    description: "O'z raqamlaringiz bilan quyosh panelining qoplanish muddatini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekSolarPanelPaybackPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Quyosh Paneli Qoplanishi Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Quyosh Paneli Qoplanishi Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Quyosh Paneli Qoplanishi Hisoblash</h1>
          <p>
            Tizim quvvatingiz, hududiy samaradorlik va elektr
            narxingiz bilan quyosh panelining yillik ishlab chiqargan
            elektrini, tejamkorligini va necha yilda o&apos;zini
            oqlashini hisoblang.
          </p>
        </header>

        <SolarPanelPaybackCalculatorUz />

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
            Elektr sarfi hisoblari uchun{" "}
            <Link href="/uz/elektr-tuketimi-hisoblash">Elektr Sarfi Hisoblash</Link>{" "}
            sahifasiga, izolyatsiya qoplanishi uchun{" "}
            <Link href="/uz/izolyatsiya-qoplanishi-hisoblash">Izolyatsiya Qoplanishi Hisoblash</Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Toshkent uchun standart quyosh nurlanishi qiymati NASA
            POWER loyihasining Toshkent koordinatalari (41,2995°N,
            69,2401°E) uchun 20 yillik (2001-2020) iqlim
            ma&apos;lumotlaridan olingan. Elektr narxi standart tarifi
            2026-yil iyun holatiga ko&apos;ra O&apos;zbekiston
            Energetika vazirligining rasmiy tarif e&apos;lonlariga
            asoslangan.
          </p>
        </section>
      </div>
    </main>
  );
}
