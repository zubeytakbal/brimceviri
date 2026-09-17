import type { Metadata } from "next";
import Link from "next/link";
import CbmCalculatorUz from "../../components/calculators/CbmCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/cbm-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "CBM nima, qanday hisoblanadi?",
    answer:
      "CBM (Cubic Meter) — koli yoki paletning kub metrdagi hajmi. Formula: CBM = Uzunlik(m) × Kenglik(m) × Balandlik(m). Tashish va logistikada narxlash va konteyner/yuk mashinasi to'lish rejalashtirishi uchun ishlatiladi.",
  },
  {
    question: "Hajmiy og'irlik nima, haqiqiy og'irlikdan farqi nima?",
    answer:
      "Hajmiy (volumetrik) og'irlik — kolining egallagan hajmini tashish turiga qarab bir koeffitsiyentga ko'paytirish orqali topiladigan 'shartli' og'irlik. Tashish narxi haqiqiy og'irlik bilan hajmiy og'irlikning kattasi (to'lovga asos og'irlik) bo'yicha hisoblanadi — yengil, lekin hajmi katta yuklarda hajmiy og'irlik ishga tushadi.",
  },
  {
    question: "Hajmiy og'irlik koeffitsiyenti tashish turiga qarab nega o'zgaradi?",
    answer:
      "Har bir tashish turida (dengiz, quruqlik, havo) transport vositalarining sig'im/hajm nisbati farq qilgani uchun sohada turli standart koeffitsiyentlar ishlatiladi: dengiz yo'lida 1 m³ = 1000 kg, quruqlik yo'lida 1 m³ ≈ 333 kg, havo yo'lida 1 m³ ≈ 167 kg. Tashuvchi firmaga qarab kichik farqlar bo'lishi mumkin.",
  },
];

export const metadata: Metadata = {
  title: "CBM va Hajmiy Og'irlikni Hisoblash",
  description:
    "Koli/palet o'lchamlaridan jami CBM (m³), hajmiy og'irlik va to'lovga asos og'irlikni hisoblang. Dengiz, quruqlik va havo yo'li koeffitsiyentlari bilan.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/cbm-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/cbm-hesaplama",
    },
  },
  openGraph: {
    title: "CBM va Hajmiy Og'irlikni Hisoblash",
    description: "Jami CBM, hajmiy og'irlik va to'lovga asos og'irlikni hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const divisorTableUz = [
  ["Dengiz Yo'li", "1000", "1 m³ = 1000 kg"],
  ["Quruqlik Yo'li", "3000", "1 m³ ≈ 333 kg"],
  ["Havo Yo'li", "6000 (ba'zi tashuvchilarda 5000)", "1 m³ ≈ 167 kg (ba'zi tashuvchilarda 200 kg)"],
];

export default function UzbekCbmPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "CBM va Hajmiy Og'irlikni Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>CBM va Hajmiy Og&apos;irlikni Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>CBM va Hajmiy Og&apos;irlikni Hisoblash</h1>
          <p>
            Koli yoki palet o&apos;lchamlarini kiriting: jami CBM
            (m³), hajmiy og&apos;irlik va tashish narxiga asos
            og&apos;irlikni darhol hisoblang.
          </p>
        </header>

        <CbmCalculatorUz />

        <section className="category-article-content">
          <h2>Tashish Turiga Ko&apos;ra Hajmiy Og&apos;irlik Koeffitsiyentlari</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Keng qo&apos;llaniladigan standart koeffitsiyentlar (tashuvchiga qarab farq qilishi mumkin)</caption>
              <thead>
                <tr>
                  <th scope="col">Tashish Turi</th>
                  <th scope="col">Koeffitsiyent (sm³ / koeffitsiyent = kg)</th>
                  <th scope="col">m³ Ekvivalenti</th>
                </tr>
              </thead>
              <tbody>
                {divisorTableUz.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, index) => (
                      <td key={`${row[0]}-${index}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
            Koeffitsiyentlar xalqaro tashish va logistika sohasida keng
            qo&apos;llaniladigan standart qiymatlarga asoslangan. Aniq
            navlun hisobi uchun tashuvchi firmaning o&apos;z tarifiga
            murojaat qilish kerak.
          </p>
        </section>
      </div>
    </main>
  );
}
