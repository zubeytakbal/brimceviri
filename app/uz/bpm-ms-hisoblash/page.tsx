import type { Metadata } from "next";
import Link from "next/link";
import BpmDelayCalculatorUz from "../../components/calculators/BpmDelayCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/bpm-ms-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "BPM dan millisoniyaga qanday o'tiladi?",
    answer:
      "Bitta chorak notaning davomiyligi (ms) = 60000 / BPM formulasi bilan topiladi. Boshqa nota qiymatlari (yarim, sakkizlik, o'n oltilik va h.k.) bu davomiylikni koeffitsientlar bilan (2, 0,5, 0,25...) o'lchaydi.",
  },
  {
    question: "Nuqtali va triol nota davomiyliklari qanday hisoblanadi?",
    answer:
      "Nuqtali nota, oddiy davomiyligining 1,5 barobari davom etadi. Triol esa bitta zarbani uch teng qismga bo'lgani uchun oddiy davomiylikning 2/3 qismiga teng.",
  },
  {
    question: "Delay va reverb davomiyligini qo'shiqning tempiga qarab sozlash nima uchun muhim?",
    answer:
      "Delay yoki reverb davomiyligi qo'shiqning BPM iga qarab sozlanganda, effekt zarblar (beat) bilan mos ravishda ijro etiladi va miksda tartibsiz ko'rinmaydi. Shuning uchun prodyuserlar odatda delay/reverb davomiyliklarini chorak, sakkizlik kabi nota qiymatlariga qulflaydi.",
  },
];

export const metadata: Metadata = {
  title: "BPM - MS Hisoblash: Delay va Reverb Davomiyligi",
  description:
    "Tempo (BPM) qiymatidan chorak, sakkizlik, o'n oltilik kabi nota qiymatlarining millisoniya ko'rinishini hisoblang; delay va reverb davomiyliklarini qo'shiqning tempiga qulflang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/bpm-ms-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/bpm-ms-hesaplama",
    },
  },
  openGraph: {
    title: "BPM - MS Hisoblash: Delay va Reverb Davomiyligi",
    description: "BPM dan nota qiymatlarining millisoniya ko'rinishini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekBpmDelayCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "BPM - MS Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>BPM - MS Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>BPM - MS Hisoblash</h1>
          <p>
            Tempo (BPM) qiymatini kiriting: chorak, sakkizlik, o&apos;n
            oltilik kabi keng tarqalgan nota qiymatlarining oddiy,
            nuqtali va triol millisoniya ko&apos;rinishlarini darhol
            ko&apos;ring. Pastdagi ikkinchi vosita bilan, bilgan
            delay/reverb davomiyligingizdan orqaga qarab BPM ni ham
            topishingiz mumkin.
          </p>
        </header>

        <BpmDelayCalculatorUz />

        <section className="category-article-content">
          <h2>BPM dan millisoniyaga qanday o&apos;tiladi?</h2>
          <p>
            Bitta chorak notaning davomiyligi, 60000 ni BPM ga
            bo&apos;lish bilan topiladi: <strong>ms = 60000 / BPM</strong>.
            Masalan 120 BPM da bitta chorak nota 500 ms davom etadi.
            Boshqa nota qiymatlari bu davomiylikni o&apos;lchaydi:
            yarim 2×, sakkizlik 0,5×, o&apos;n oltilik 0,25× kabi.
          </p>

          <h2>Tez-tez So&apos;raladigan Savollar</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}
        </section>
      </div>
    </main>
  );
}
