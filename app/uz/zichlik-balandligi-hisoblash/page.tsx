import type { Metadata } from "next";
import Link from "next/link";
import DensityAltitudeCalculatorUz from "../../components/calculators/DensityAltitudeCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/zichlik-balandligi-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Zichlik balandligi (density altitude) nima, nima uchun muhim?",
    answer:
      "Zichlik balandligi havo harorati va bosimining samolyot samaradorligiga ta'sirini bitta 'ekvivalent balandlik' qiymatida umumlashtiradi. Issiq va/yoki baland balandlikdagi aeroportlarda havo zichligi kamayadi; bu esa dvigatel quvvatini, qanot ko'tarish kuchini va vint samaradorligini pasaytiradi — natijada ko'tarilish masofasi uzayadi, tirmashish tezligi kamayadi.",
  },
  {
    question: "Bosim balandligini qanday topaman?",
    answer:
      "Altimetrni standart bosimga (1013,25 hPa / 29,92 inHg) sozlaganingizda o'qilgan qiymat bosim balandligidir. Maydonda bu odatda joyning balandligiga yaqin qiymat bo'ladi; QNH standartdan farq qilsa (1013,25 hPa − QNH) × 30 ft miqdorida tuzatish qo'shiladi.",
  },
];

export const metadata: Metadata = {
  title: "Zichlik Balandligi Hisoblash (Density Altitude)",
  description:
    "Bosim balandligi va tashqi havo haroratidan (OAT), standart FAA qisqa formulasi bilan zichlik balandligini (density altitude) hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/yogunluk-irtifasi-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/yogunluk-irtifasi-hesaplama",
    },
  },
  openGraph: {
    title: "Zichlik Balandligi Hisoblash (Density Altitude)",
    description:
      "Bosim balandligi va tashqi havo haroratidan zichlik balandligini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekDensityAltitudeCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Zichlik Balandligi Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Zichlik Balandligi Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Zichlik Balandligi Hisoblash</h1>
          <p>
            Bosim balandligini va tashqi havo haroratini (OAT)
            kiriting: standart FAA qisqa formulasi bilan zichlik
            balandligini darhol hisoblang.
          </p>
        </header>

        <DensityAltitudeCalculatorUz />

        <section className="category-article-content">
          <h2>Zichlik balandligi qanday hisoblanadi?</h2>
          <p>
            Avval o&apos;sha bosim balandligidagi standart (ISA)
            harorat topiladi:{" "}
            <strong>
              ISA Harorati (°C) = 15 − 2 × (Bosim Balandligi / 1000)
            </strong>
            . Keyin haqiqiy haroratning (OAT) bu standartdan qanchalik
            og&apos;ishi bosim balandligiga qo&apos;shiladi:{" "}
            <strong>
              Zichlik Balandligi = Bosim Balandligi + 120 × (OAT −
              ISA Harorati)
            </strong>
            . Bu uchish ta&apos;limida keng qo&apos;llaniladigan FAA
            qisqa formulasidir.
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
            Uchish rejalashtirish uchun{" "}
            <Link href="/uz/pasayish-tezligi-hisoblash">Pasayish Tezligi Hisoblash</Link>,{" "}
            <Link href="/uz/yon-shamol-hisoblash">Yon Shamol Hisoblash</Link>,{" "}
            <Link href="/uz/ogirlik-muvozanat-hisoblash">Og&apos;irlik va Muvozanat Hisoblash</Link>{" "}
            sahifalariga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Zichlik balandligi formulasi uchish ta&apos;limida (FAA va
            shunga o&apos;xshash) keng qo&apos;llaniladigan standart
            taxminiy hisoblash usuliga asoslangan. Bu vosita umumiy
            ma&apos;lumot va dastlabki tayyorgarlik maqsadida; haqiqiy
            uchish rejalashtirish uchun samolyotning samaradorlik
            qo&apos;llanmasi (POH/AFM) asos qilib olinishi kerak.
          </p>
        </section>
      </div>
    </main>
  );
}
