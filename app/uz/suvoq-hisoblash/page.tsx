import type { Metadata } from "next";
import Link from "next/link";
import PlasterCalculatorUz from "../../components/calculators/PlasterCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/suvoq-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "1 m² suvoq uchun necha kg gips/aralashma kerak?",
    answer:
      "Bu suvoq qalinligi va mahsulotga qarab o'zgaradi; ichki fasadda keng qo'llaniladigan tayyor gips suvoq mahsulotlarida 1 sm qalinlik uchun m² boshiga taxminan 9 kg, tsement asosli tashqi fasad suvoqlarida esa taxminan 16 kg ishlatiladi. Aniq sarf mahsulot qadog'idagi jadvalga qarab o'zgarishi mumkin — bu vositada bu qiymatni xohlaganingizcha o'zgartira olasiz.",
  },
  {
    question: "Gips suvoqmi, tsement asosli suvoqmi ishlatishim kerak?",
    answer:
      "Gips suvoq odatda namlik olmaydigan ichki xonalarda (mehmonxona, yotoqxona kabi) ishlatiladi; yengil, oson qo'llaniladi va kamroq material talab qiladi. Tsement asosli suvoq esa tashqi fasadlar, hammom/oshxona kabi nam joylar va namlik/suv ta'siriga chidamlilik talab qilinadigan joylar uchun afzal ko'riladi.",
  },
  {
    question: "Suvoq qalinligi odatda necha sm bo'ladi?",
    answer:
      "Ichki xona gips suvoqlarida odatda 1-2 sm oralig'ida qalinlik qo'llaniladi; tashqi fasad tsement asosli suvoqlarda esa devor tekisligiga qarab 1,5-3 sm oralig'ida o'zgarishi mumkin. Juda notekis devorlarda qalinroq suvoq qatlami kerak bo'lishi mumkin.",
  },
  {
    question: "Zaxira ulushi nega qo'shiladi?",
    answer:
      "Aralashtirish, qo'llash paytida to'kilish va devor yuzasidagi notekisliklar tufayli ma'lum miqdorda material yo'qotiladi. Standart %5 zaxira ulushi tekis devorlar uchun yetarli; eski yoki notekis devorlarda bu nisbatni %10-15 gacha oshirish xavfsizroq.",
  },
];

export const metadata: Metadata = {
  title: "Suvoq Hisoblash: Necha kg Gips yoki Aralashma Kerak?",
  description:
    "Suvoqlanadigan maydon, qalinlik va mahsulot sarfi qiymatiga qarab kerakli gips suvoq yoki tsement asosli suvoq miqdorini va qoplar sonini zaxira ulushi dahil hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/siva-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/siva-hesaplama",
    },
  },
  openGraph: {
    title: "Suvoq Hisoblash: Necha kg Gips yoki Aralashma Kerak?",
    description: "Maydon va qalinlikni kiriting, kerakli suvoq materialini darhol hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekPlasterCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Suvoq Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Suvoq Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Suvoq Hisoblash</h1>
          <p>
            Gips suvoq (ichki fasad) yoki tsement asosli suvoq (tashqi
            fasad) uchun suvoqlanadigan maydon va qalinlikka qarab
            kerakli material miqdorini va qoplar sonini zaxira ulushi
            dahil darhol hisoblang.
          </p>
        </header>

        <PlasterCalculatorUz />

        <section className="category-article-content">
          <h2>Suvoq miqdori qanday hisoblanadi?</h2>
          <p>
            Kerakli suvoq materiali, suvoqlanadigan maydon (m²) ×
            qalinlik (sm) × mahsulotning m² uchun 1 sm uchun sarflaydigan
            kg formulasi bilan hisoblanadi. Bu sarf qiymati mahsulotga
            qarab o&apos;zgaradi; shuning uchun vositada standart bir
            qiymat taklif qilinadi, lekin siz ishlatadigan mahsulot
            qadog&apos;idagi jadvalga qarab o&apos;zgartirishingiz
            mumkin.
          </p>

          <h2>Gips suvoqmi, tsement asosli suvoqmi?</h2>
          <p>
            <strong>Gips suvoq</strong> namlik olmaydigan ichki
            xonalarda ishlatiladigan yengil va oson qo&apos;llaniladigan
            materialdir; 1 sm qalinlik uchun odatda m² boshiga taxminan
            9 kg sarflanadi. <strong>Tsement asosli suvoq</strong> esa
            tashqi fasad va nam joylar (hammom, oshxona) uchun afzal
            ko&apos;riladi, suv va namlikka chidamliroq; 1 sm qalinlik
            uchun odatda m² boshiga taxminan 16 kg sarflanadi. Bu
            raqamlar keng tarqalgan mahsulotlarga asoslangan umumiy
            qiymatlar, rasmiy/sobit standart emas.
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
            Xuddi shu ta&apos;mirlash loyihasida foydali bo&apos;lishi
            mumkin bo&apos;lgan boshqa vositalar:{" "}
            <Link href="/uz/boya-hisoblash">Bo&apos;yoq Hisoblash</Link>,{" "}
            <Link href="/uz/fayans-hisoblash">Fayans Hisoblash</Link>,{" "}
            <Link href="/uz/laminat-hisoblash">Laminat Hisoblash</Link>,{" "}
            <Link href="/uz/devor-qogozi-hisoblash">Devor Qog&apos;ozi Hisoblash</Link>.
          </p>

          <h2>Manbalar</h2>
          <p>
            m² uchun kg sarf qiymatlari keng tarqalgan tayyor gips
            suvoq va tsement asosli suvoq mahsulotlarining
            qadoqlarida e&apos;lon qilingan odatiy sarf jadvallaridan
            jamlangan; mahsulotga qarab o&apos;zgarishi mumkin.
          </p>
        </section>
      </div>
    </main>
  );
}
