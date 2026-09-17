import type { Metadata } from "next";
import Link from "next/link";
import PressureLossCalculatorUz from "../../components/calculators/PressureLossCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/bosim-yoqotilishi-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Bosim yo'qotilishi (yuk yo'qotilishi) qanday hisoblanadi?",
    answer:
      "Bosimli suv liniyalarida ishqalanish sabab bo'lgan bosim yo'qotilishi Hazen-Uilyams formulasi bilan hisoblanadi: hf = 10,67×L×Q^1,852 / (C^1,852×D^4,87). L quvur uzunligi, Q sarf, D diametr, C esa quvur materialiga bog'liq notekislik koeffitsienti.",
  },
  {
    question: "Hazen-Uilyams C koeffitsienti nima?",
    answer:
      "C quvurning ichki yuza notekisligini ifodalovchi, materialga qarab o'zgaruvchi sobitdir. Silliq materiallar (PVC, mis) yuqori C qiymatiga, zanglagan/eski po'lat quvurlar past C qiymatiga ega.",
  },
];

export const metadata: Metadata = {
  title: "Bosim Yo'qotilishi Hisoblash (Hazen-Uilyams)",
  description:
    "Quvur uzunligi, diametri, sarf va material koeffitsientidan Hazen-Uilyams formulasi bilan bosimli liniyalardagi yuk/bosim yo'qotilishini hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/basinc-kaybi-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/basinc-kaybi-hesaplama",
    },
  },
  openGraph: {
    title: "Bosim Yo'qotilishi Hisoblash (Hazen-Uilyams)",
    description: "Bosimli liniyalardagi yuk/bosim yo'qotilishini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekPressureLossPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Bosim Yo'qotilishi Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Bosim Yo&apos;qotilishi Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Bosim Yo&apos;qotilishi Hisoblash (Hazen-Uilyams)</h1>
          <p>
            Quvur uzunligi, diametri, sarf va material koeffitsientini
            kiriting: liniyadagi ishqalanish sabab bo&apos;lgan bosim
            yo&apos;qotilishini darhol hisoblang.
          </p>
        </header>

        <PressureLossCalculatorUz />

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
            Quvur diametri, sarf va oqim tezligi uchun{" "}
            <Link href="/uz/quvur-diametri-sarfi-hisoblash">
              Quvur Diametri Hisoblash
            </Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Hazen-Uilyams formulasi 1902-yildan beri bosimli suv
            liniyalarida keng qo&apos;llaniladigan empirik muhandislik
            formulasidir va turbulent suv oqimi uchun amal qiladi; gaz
            yoki yuqori qovushqoqlikdagi suyuqliklar uchun
            ishlatilmaydi.
          </p>
        </section>
      </div>
    </main>
  );
}
