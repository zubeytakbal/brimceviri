import type { Metadata } from "next";
import Link from "next/link";
import HeatPumpVsBoilerCalculatorUz from "../../components/calculators/HeatPumpVsBoilerCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/issiqlik-nasosi-qozon-solishtirish";

const faqItems: FaqItem[] = [
  {
    question: "Issiqlik nasosimi yoki qozonmi arzonroq?",
    answer:
      "Bu tabiiy gaz va elektr narxlari nisbatiga, issiqlik nasosining COP qiymatiga va qozonning samaradorligiga bog'liq. Odatda COP qiymati 3 dan yuqori issiqlik nasoslari ishlatish xarajati jihatidan qozondan arzonroqqa tushadi; ammo o'rnatish narxi yuqoriroq bo'ladi. Yuqoridagi hisoblagichga o'z raqamlaringizni kiritib aniq natijani ko'rishingiz mumkin.",
  },
  {
    question: "Issiqlik nasosining o'rnatish narxi necha yilda o'zini oqlaydi?",
    answer:
      "Issiqlik nasosi bilan qozon orasidagi o'rnatish narxi farqini, yillik ishlatish tejamkorligiga bo'lib qoplanish muddatini hisoblashingiz mumkin. Bu muddat uy kattaligiga, izolyatsiyaga, elektr/tabiiy gaz narxi nisbatiga va tanlangan tizimning COP qiymatiga qarab o'zgaradi.",
  },
  {
    question: "Issiqlik nasosining COP qiymati nima uchun o'zgaradi?",
    answer:
      "COP (Samaradorlik Koeffitsienti) tashqi havo harorati pasaygan sari kamayadi — juda sovuq kunlarda issiqlik nasosi kamroq samarali ishlaydi. Hisoblagichdagi COP qiymati mavsumiy o'rtachani ifodalaydi, qurilmaning energiya yorlig'idagi mavsumiy (SCOP) qiymatidan foydalanish aniqroq natija beradi.",
  },
];

export const metadata: Metadata = {
  title: "Issiqlik Nasosimi yoki Qozonmi? Xarajat Solishtirish",
  description:
    "O'z tabiiy gaz/elektr narxingiz, issiqlik ehtiyojingiz va o'rnatish narxi farqingiz bilan issiqlik nasosining qozonga nisbatan necha yilda o'zini oqlashini hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/isi-pompasi-kombi-karsilastirma",
      "uz-UZ": pagePath,
      "x-default": "/isi-pompasi-kombi-karsilastirma",
    },
  },
  openGraph: {
    title: "Issiqlik Nasosimi yoki Qozonmi? Xarajat Solishtirish",
    description: "O'z raqamlaringiz bilan issiqlik nasosining qozonga nisbatan necha yilda o'zini oqlashini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekHeatPumpVsBoilerPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Issiqlik Nasosimi yoki Qozonmi?", item: buildSiteUrl(pagePath) },
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
          <span>Issiqlik Nasosimi yoki Qozonmi?</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Issiqlik Nasosimi yoki Qozonmi? Xarajat Solishtirish</h1>
          <p>
            O&apos;z tabiiy gaz/elektr narxingiz, yillik issiqlik
            ehtiyojingiz va o&apos;rnatish narxi farqingiz bilan,
            issiqlik nasosining qozonga nisbatan necha yilda
            o&apos;zini oqlashini hisoblang.
          </p>
        </header>

        <HeatPumpVsBoilerCalculatorUz />

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
            Konditsioner bilan qozonni solishtirish uchun{" "}
            <Link href="/uz/qozon-konditsioner-solishtirish">
              Qozonmi yoki Konditsionermi?
            </Link>{" "}
            sahifasiga, izolyatsiya yatirimining qoplanishi uchun{" "}
            <Link href="/uz/izolyatsiya-qoplanishi-hisoblash">
              Izolyatsiya Qoplanishi Hisoblash
            </Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Tabiiy gaz-kWh aylantirishi standart qiymatga asoslangan.
            Issiqlik nasosi COP oralig&apos;i va qozon samaradorligi
            qiymatlari sohada keng qabul qilingan umumiy ma&apos;lumotnoma
            oraliqlaridir; aniq natija uchun o&apos;z qurilmangizning
            texnik xususiyatlaridan foydalanish tavsiya etiladi.
          </p>
        </section>
      </div>
    </main>
  );
}
