import type { Metadata } from "next";
import Link from "next/link";
import StairCalculatorUz from "../../components/calculators/StairCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/zinapoya-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Zinapoya zinapoyalar soni qanday hisoblanadi?",
    answer:
      "Ikki qavat orasidagi umumiy balandlik, xohlagan zina (pog'ona) balandligiga bo'linib eng yaqin butun songa yaxlitlanadi. Masalan, 280 sm balandlikda 17,5 sm lik zinani maqsad qilsangiz 16 ta zinapoya chiqadi; umumiy balandlik bu songa qayta bo'linib har bir zinaning haqiqiy balandligi tenglashtiriladi.",
  },
  {
    question: "Blondel formulasi nima?",
    answer:
      "Blondel formulasi — qulay va xavfsiz zinapoya qadami uchun ishlatiladigan klassik me'morchilik qoidasi: 2 × zina balandligi + zina chuqurligi ≈ 63 sm. Bu formula qisqa qadamli tik zinapoya bilan uzun qadamli tekis zinapoya orasida muvozanatli, yurish qadamiga yaqin nisbat beradi.",
  },
  {
    question: "Zina balandligi va chuqurligi uchun ideal o'lchamlar qanday?",
    answer:
      "Turar-joy zinapoyalarida zina balandligi odatda 16-20 sm oralig'ida (ideali ~17-18 sm), zina chuqurligi esa 24-33 sm oralig'ida (ideali ~28-30 sm) deb hisoblanadi. Bu oraliqlardan tashqariga chiqadigan zinapoyalar yoki juda tik va charchatuvchi, yoki keraksiz uzun bo'ladi.",
  },
  {
    question: "Bu hisoblash loyihamga yetarlimi, yoki me'mor/muhandisga murojaat qilishim kerakmi?",
    answer:
      "Bu vosita, dastlabki ishlash va umumiy tasavvur olish uchun Blondel formulasiga asoslangan amaliy taxmin taqdim etadi. Ammo qurilish ruxsatnomasi, statik hisob, panjara balandligi va me'yoriy muvofiqlik kabi masalalar uchun albatta me'mor yoki qurilish muhandisi bilan ishlashingiz kerak.",
  },
];

export const metadata: Metadata = {
  title: "Zinapoya Hisoblash: Zinapoyalar Soni, Balandlik va Chuqurlik",
  description:
    "Umumiy balandlik va xohlagan zina balandligiga qarab zinapoyalar sonini, zina balandligini va Blondel formulasi bilan zina chuqurligini hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/merdiven-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/merdiven-hesaplama",
    },
  },
  openGraph: {
    title: "Zinapoya Hisoblash: Zinapoyalar Soni, Balandlik va Chuqurlik",
    description: "Balandlikni kiriting, xavfsiz va qulay zinapoya o'lchamlarini darhol hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekStairCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Zinapoya Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Zinapoya Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Zinapoya Hisoblash</h1>
          <p>
            Umumiy balandlik va xohlagan zina balandligiga qarab
            zinapoyalar sonini, haqiqiy zina balandligini va Blondel
            formulasi bilan zina chuqurligini darhol hisoblang.
          </p>
        </header>

        <StairCalculatorUz />

        <section className="category-article-content">
          <h2>Zinapoyalar soni va zina balandligi qanday belgilanadi?</h2>
          <p>
            Ikki qavat orasidagi umumiy balandlik (qavat balandligi)
            xohlagan zina balandligiga bo&apos;linib eng yaqin butun
            songa yaxlitlanadi va zinapoyalar soni topiladi. Keyin
            umumiy balandlik bu zinapoyalar soniga qayta bo&apos;linib
            har bir zinaning haqiqiy, teng balandligi hisoblanadi —
            shunday qilib zinapoyaning har bir qadami bir xil
            balandlikda bo&apos;ladi.
          </p>

          <h2>Zina chuqurligi nega Blondel formulasi bilan hisoblanadi?</h2>
          <p>
            Zina chuqurligi zina balandligiga teskari proportsional
            muvozanatga ega bo&apos;lishi kerak: zina balandligi
            baland bo&apos;lsa chuqurligi kam, past bo&apos;lsa
            chuqurligi ko&apos;p bo&apos;lishi kerak — aks holda
            zinapoya yoki juda tik, yoki keraksiz uzun bo&apos;ladi.
            Me&apos;morchilikda keng qo&apos;llaniladigan Blondel
            formulasi (2 × zina balandligi + zina chuqurligi ≈ 63 sm)
            bu muvozanatni tabiiy yurish qadamiga yaqin ushlab
            hisoblaydi.
          </p>

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
            Blondel formulasi va zina balandligi/chuqurligi uchun
            qulay o&apos;lcham oraliqlari, me&apos;morchilik va ichki
            makon dizayni adabiyotida keng qabul qilingan standart
            zinapoya dizayni qoidalariga asoslangan.
          </p>
        </section>
      </div>
    </main>
  );
}
