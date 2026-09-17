import type { Metadata } from "next";
import Link from "next/link";
import PixelCalculatorUz from "../../components/calculators/PixelCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/piksel-sm-dpi-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Piksel bilan sm orasida qanday aylantirish qilinadi?",
    answer:
      "Piksel soni, fizik o'lcham (dyuym hisobida) DPI (dyuymga to'g'ri keladigan nuqta soni) ga ko'paytirilib topiladi: piksel = (sm / 2,54) × DPI. Teskari yo'nalishda, fizik o'lcham = piksel / DPI formulasi bilan hisoblanadi.",
  },
  {
    question: "Chop etish uchun qaysi DPI qiymati ishlatilishi kerak?",
    answer:
      "Veb va ekran dizayni uchun 72-96 DPI yetarli. Standart sifatli chop etish uchun 300 DPI, yuqori sifatli/professional chop etish uchun 600 DPI keng ishlatiladigan qiymatlardir.",
  },
];

export const metadata: Metadata = {
  title: "Piksel, SM va DPI Hisoblash",
  description:
    "Piksel soni, fizik o'lcham (sm/dyuym) yoki DPI qiymatidan ikkitasini kiriting: yetishmayotgan uchinchi qiymatni darhol hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/piksel-cm-dpi-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/piksel-cm-dpi-hesaplama",
    },
  },
  openGraph: {
    title: "Piksel, SM va DPI Hisoblash",
    description: "Piksel, fizik o'lcham va DPI hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const dpiTableUz = [
  ["Veb / ekran dizayni", "72-96 DPI"],
  ["Standart chop etish (broshyura, vizitka)", "300 DPI"],
  ["Yuqori sifatli / professional chop etish", "600 DPI"],
];

export default function UzbekPixelCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Piksel, SM va DPI Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Piksel, SM va DPI Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Piksel, SM va DPI Hisoblash</h1>
          <p>
            Piksel soni, fizik o&apos;lcham yoki DPI qiymatidan
            ikkitasini kiriting: yetishmayotgan uchinchi qiymatni
            darhol hisoblang.
          </p>
        </header>

        <PixelCalculatorUz />

        <section className="category-article-content">
          <h2>Keng Ishlatiladigan DPI Qiymatlari</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Foydalanish maqsadiga qarab odatiy DPI qiymatlari</caption>
              <thead>
                <tr>
                  <th scope="col">Foydalanish Maqsadi</th>
                  <th scope="col">Odatiy DPI</th>
                </tr>
              </thead>
              <tbody>
                {dpiTableUz.map((row) => (
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

          <h2>Tegishli vositalar</h2>
          <p>
            Fotokamera fokus masofasi ekvivalenti uchun{" "}
            <Link href="/uz/odak-uzunligi-esdegeri-hisoblash">Fokus Masofasi Ekvivalenti Hisoblash</Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Formula raqamli tasvir aniqligi va chop etish sohasida
            standart hisoblangan piksel/dyuym/DPI bog&apos;liqligiga
            asoslangan.
          </p>
        </section>
      </div>
    </main>
  );
}
