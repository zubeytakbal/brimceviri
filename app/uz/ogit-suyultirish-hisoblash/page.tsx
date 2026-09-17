import type { Metadata } from "next";
import Link from "next/link";
import FertilizerDilutionCalculatorUz from "../../components/calculators/FertilizerDilutionCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/ogit-suyultirish-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "O'g'it yorlig'idagi '1:200' nisbati nimani anglatadi?",
    answer:
      "1:200, 1 birlik o'g'itga 200 birlik suv qo'shilishi kerakligini anglatadi. Masalan 3 litr (3000 ml) suv tayyorlamoqchi bo'lsangiz, 3000/200 = 15 ml o'g'it qo'shishingiz kerak.",
  },
  {
    question: "Yorliqda 'ml/litr' yozilgan bo'lsa qanday hisoblayman?",
    answer:
      "Bu format to'g'ridan-to'g'ri dozani ko'rsatadi: masalan '5 ml/litr' degani, tayyorlagan har 1 litr suv uchun 5 ml o'g'it qo'shishingiz kerak degani. Umumiy suv miqdorini litr hisobida dozaga ko'paytirib jami o'g'it miqdorini topishingiz mumkin.",
  },
  {
    question: "Tavsiya etilgan nisbatdan ko'p o'g'it qo'shsam nima bo'ladi?",
    answer:
      "Ortiqcha dozadagi o'g'it o'simlikning ildizlarida 'ildiz kuyishi' deb ataladigan zararga olib kelishi va o'simlikka zarar yetkazishi mumkin. Tavsiya etilgan nisbatga rioya qilish, zarur bo'lsa yengil suyultirilgan holda qo'llash xavfsizroqdir.",
  },
];

export const metadata: Metadata = {
  title: "O'g'it Suyultirish Hisoblash (O'simlik/Bog' Uchun)",
  description:
    "Suyuq o'g'it yorlig'idagi nisbatni (1:200) yoki dozani (ml/litr) kiriting, tayyorlamoqchi bo'lgan suv miqdoringizga qarab qo'shishingiz kerak bo'lgan o'g'it miqdorini hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/gubre-seyreltme-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/gubre-seyreltme-hesaplama",
    },
  },
  openGraph: {
    title: "O'g'it Suyultirish Hisoblash (O'simlik/Bog' Uchun)",
    description: "Yorliqdagi nisbat yoki doza bilan, tayyorlash kerak bo'lgan o'g'it miqdorini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekFertilizerDilutionPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "O'g'it Suyultirish Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>O&apos;g&apos;it Suyultirish Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>O&apos;g&apos;it Suyultirish Hisoblash</h1>
          <p>
            Suyuq o&apos;g&apos;it yorlig&apos;idagi nisbatni (masalan
            1:200) yoki dozani (masalan 5 ml/litr) kiriting,
            tayyorlamoqchi bo&apos;lgan suv miqdoringizga qarab
            qo&apos;shishingiz kerak bo&apos;lgan o&apos;g&apos;it
            miqdorini hisoblang.
          </p>
        </header>

        <FertilizerDilutionCalculatorUz />

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
            Qishloq xo&apos;jaligi miqyosida o&apos;g&apos;it hisobi
            uchun{" "}
            <Link href="/uz/ogit-ehtiyoji-hisoblash">O&apos;g&apos;it Ehtiyoji Hisoblash</Link>{" "}
            sahifasiga, sug&apos;orish hisoblari uchun{" "}
            <Link href="/uz/sugorish-vaqti-hisoblash">Sug&apos;orish Vaqti Hisoblash</Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Hisoblash o&apos;g&apos;it ishlab chiqaruvchilarining
            mahsulot yorliqlarida standart sifatida ishlatadigan
            nisbat/doza ko&apos;rsatish shakllariga asoslangan. Har
            bir mahsulotning tavsiya etilgan nisbati farqli
            bo&apos;lishi mumkinligi uchun o&apos;z mahsulotingizning
            yorlig&apos;idagi qiymatdan foydalanish tavsiya etiladi.
          </p>
        </section>
      </div>
    </main>
  );
}
