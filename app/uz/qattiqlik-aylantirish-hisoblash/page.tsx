import type { Metadata } from "next";
import Link from "next/link";
import HardnessConversionCalculatorUz from "../../components/calculators/HardnessConversionCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/qattiqlik-aylantirish-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Brinell, Rokvell va Vikkers qattiqlik aylantirish qanchalik aniq?",
    answer:
      "ASTM E140 standartiga muvofiq bajarilgan bu aylantirishlar taxminan ±5% aniqlikda amal qiladi. Muhim yoki shartnomaviy o'lchovlarda har doim to'g'ridan-to'g'ri o'lchov asos qilib olinishi kerak.",
  },
  {
    question: "Bu aylantirish jadvali har qanday material uchun amal qiladimi?",
    answer:
      "Yo'q. ASTM E140 jadvali faqat issiqlik ishlovi ko'rgan yoki ko'rmagan (ostenitik bo'lmagan) po'latlar uchun amal qiladi. Zanglamaydigan po'lat, alyuminiy, mis qotishmalari va cho'yan uchun boshqa, alohida aylantirish jadvallaridan foydalanish kerak.",
  },
  {
    question: "Rokvell B (HRB) bilan Rokvell C (HRC) orasidagi farq nima?",
    answer:
      "HRB shkalasi yumshoqroq materiallar (taxminan 100 HRB gacha) uchun, HRC shkalasi esa qattiqlashtirilgan po'lat kabi qattiqroq materiallar uchun ishlatiladi. Ikkalasi turli uch va yukdan foydalanadi; to'g'ridan-to'g'ri solishtirilmaydi, faqat Brinell/Vikkers orqali bilvosita moslashtiriladi.",
  },
];

export const metadata: Metadata = {
  title: "Qattiqlik Aylantirish Hisoblash (Brinell, Rokvell, Vikkers)",
  description:
    "Brinell (HB), Rokvell C/B (HRC/HRB) yoki Vikkers (HV) qattiqlik qiymatini kiriting, boshqa shkalalardagi eng yaqin ekvivalentini ko'ring. ASTM E140 jadvali kiritilgan.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/sertlik-donusum-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/sertlik-donusum-hesaplama",
    },
  },
  openGraph: {
    title: "Qattiqlik Aylantirish Hisoblash (Brinell, Rokvell, Vikkers)",
    description: "HB, HRC, HRB va HV qattiqlik qiymatlarini bir-biriga aylantiring.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekHardnessConversionPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Qattiqlik Aylantirish Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Qattiqlik Aylantirish Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Qattiqlik Aylantirish Hisoblash</h1>
          <p>
            Brinell (HB), Rokvell C/B (HRC/HRB) yoki Vikkers (HV)
            qattiqlik qiymatini kiriting: boshqa shkalalardagi eng
            yaqin ekvivalentini ko&apos;ring. Pastda ASTM E140 asosidagi
            to&apos;liq aylantirish jadvalini ham topishingiz mumkin.
          </p>
        </header>

        <HardnessConversionCalculatorUz />

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
            Aylantirish qiymatlari ASTM E140 standartiga asoslangan,
            ikkita mustaqil manbadan (po&apos;lat sanoati ma&apos;lumotnoma
            hisoblagichlari va ASTM E140 qisqacha jadvallari) o&apos;zaro
            tasdiqlangan taxminiy qiymatlardir.
          </p>
        </section>
      </div>
    </main>
  );
}
