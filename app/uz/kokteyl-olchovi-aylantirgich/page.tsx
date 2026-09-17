import type { Metadata } from "next";
import Link from "next/link";
import BarVolumeCalculatorUz from "../../components/calculators/BarVolumeCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/kokteyl-olchovi-aylantirgich";

const faqItems: FaqItem[] = [
  {
    question: "1 oz necha mL?",
    answer: "1 AQSH suyuqlik unsiyasi (fl oz) taxminan 29,57 mL ga teng.",
  },
  {
    question: "Jigger va pony qancha sig'adi?",
    answer:
      "Standart jigger odatda bir tomonida 1 oz (~3 cl), boshqa tomonida 1,5 oz (~4,4 cl) o'lchaydi. Pony esa yakka o'zi 1 oz'lik o'lchovdir.",
  },
  {
    question: "Nima uchun suyuqlik unsiyasi og'irlik unsiyasi (oz) bilan aralashtirilmasligi kerak?",
    answer:
      "Ikkalasi ham \"oz\" qisqartmasidan foydalanadi, lekin butunlay boshqa narsalarni o'lchaydi: suyuqlik unsiyasi hajm birligi (~29,57 mL), og'irlik unsiyasi esa massa birligi (~28,35 g). Kokteyl retseptlarida uchraydigan \"oz\" har doim suyuqlik unsiyasidir.",
  },
];

export const metadata: Metadata = {
  title: "Kokteyl O'lchovi Aylantirgich: Oz, mL, Cl",
  description:
    "Kokteyl va bar o'lchovlarini oz (suyuqlik unsiyasi), mL va cl orasida darhol aylantiring; jigger va pony kabi bar o'lchagichlarining mos qiymatlarini ko'ring.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/kokteyl-olcusu-cevirici",
      "uz-UZ": pagePath,
      "x-default": "/kokteyl-olcusu-cevirici",
    },
  },
  openGraph: {
    title: "Kokteyl O'lchovi Aylantirgich: Oz, mL, Cl",
    description: "Oz, mL va cl orasida kokteyl o'lchovini aylantiring.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekBarVolumeCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Kokteyl O'lchovi Aylantirgich", item: buildSiteUrl(pagePath) },
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
          <span>Kokteyl O&apos;lchovi Aylantirgich</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Kokteyl O&apos;lchovi Aylantirgich</h1>
          <p>
            Kokteyl retseptlarida uchraydigan oz (suyuqlik unsiyasi),
            mL va cl o&apos;lchovlarini bir qiymatdan boshqalariga
            darhol aylantiring.
          </p>
        </header>

        <BarVolumeCalculatorUz />

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
            Alkogol foizi va standart ichimlik hisobi uchun{" "}
            <Link href="/uz/abv-standart-ichimlik-hisoblash">
              ABV va Standart Ichimlik Hisoblash
            </Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>
        </section>
      </div>
    </main>
  );
}
