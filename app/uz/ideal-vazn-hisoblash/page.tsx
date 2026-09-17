import type { Metadata } from "next";
import Link from "next/link";
import IdealWeightCalculatorUz from "../../components/calculators/IdealWeightCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/ideal-vazn-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Ideal vazn bilan BMI bo'yicha normal vazn bir xil narsami?",
    answer:
      "Yo'q, bular har xil usullar. BMI, vaznning bo'y kvadratiga bo'linishi bilan keng bir 'normal' oraliq beradi. Ideal vazn (Devine formulasi) esa faqat bo'yga asoslangan yagona bir mos yozuv qiymati beradi va klinik sharoitda dori dozalash kabi hisob-kitoblarda ishlatiladi. Ikkalasi bir-birini to'ldiruvchi, turli maqsadli vositalardir.",
  },
  {
    question: "Bu formula hamma uchun to'g'rimi?",
    answer:
      "Devine formulasi mushak massasi, tana tuzilishi yoki yosh kabi individual farqlarni hisobga olmaydi; bu umumiy mos yozuv nuqtasidir. Sportchilar yoki boshqa tana tipiga ega odamlarda haqiqiy sog'lom vazn bu qiymatdan sezilarli darajada farq qilishi mumkin.",
  },
];

export const metadata: Metadata = {
  title: "Ideal Vaznni Hisoblash (Devine Formulasi)",
  description:
    "Bo'y va jinsingizni kiriting; klinik sharoitda keng qo'llaniladigan Devine formulasi bilan ideal vaznni darhol hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/ideal-kilo-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/ideal-kilo-hesaplama",
    },
  },
  openGraph: {
    title: "Ideal Vaznni Hisoblash (Devine Formulasi)",
    description: "Bo'y va jinsga ko'ra Devine formulasi bilan ideal vaznni hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekIdealWeightCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Ideal Vaznni Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Ideal Vaznni Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Ideal Vaznni Hisoblash</h1>
          <p>
            Bo&apos;yingiz va jinsingizni kiriting: klinik sharoitda
            keng qo&apos;llaniladigan Devine formulasi bilan ideal
            vaznni darhol hisoblang.
          </p>
        </header>

        <IdealWeightCalculatorUz />

        <section className="category-article-content">
          <h2>Devine formulasi nima?</h2>
          <p>
            1974-yilda Dr. B.J. Devine tomonidan ishlab chiqilgan bu
            formula, dastlab dori dozalashni hisoblash uchun
            mo&apos;ljallangan bo&apos;lib, keyinchalik umumiy ideal
            vazn mos yozuvi sifatida keng tarqalgan:
          </p>
          <p>
            <strong>Erkak: Ideal Vazn (kg) = 50 + 2,3 × (Bo&apos;y(dyuym) − 60)</strong>
            <br />
            <strong>Ayol: Ideal Vazn (kg) = 45,5 + 2,3 × (Bo&apos;y(dyuym) − 60)</strong>
          </p>
          <p>
            Formula 152,4 sm (60 dyuym) va undan yuqori bo&apos;ylar
            uchun aniqlangan.
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
            BMI va kunlik kaloriya ehtiyojing uchun{" "}
            <Link href="/uz/bmi-hisoblash">BMI Hisoblash</Link>, tana
            yog&apos;i foizing uchun{" "}
            <Link href="/uz/tana-yogi-foizi-hisoblash">
              Tana Yog&apos;i Foizini Hisoblash
            </Link>
            , mashg&apos;ulot yuklamangiz uchun{" "}
            <Link href="/uz/1rm-hisoblash">1RM Hisoblash</Link>{" "}
            sahifalariga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Formula Dr. B.J. Devine&apos;ning 1974-yilda e&apos;lon
            qilgan va klinik sharoitda hozirgacha keng qo&apos;llaniladigan
            ideal tana vazni baholash usuliga asoslangan. Bu vosita
            tibbiy maslahat o&apos;rnini bosmaydi.
          </p>
        </section>
      </div>
    </main>
  );
}
