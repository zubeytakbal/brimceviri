import type { Metadata } from "next";
import Link from "next/link";
import CreatinineClearanceCalculatorUz from "../../components/calculators/CreatinineClearanceCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/kreatinin-klirensi-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Kreatinin klirensi nima uchun ishlatiladi?",
    answer:
      "Kreatinin klirensi buyrak funksiyasining (glomerulyar filtratsiya tezligining) taxminiy qiymatidir. Ayniqsa buyrak orqali chiqariladigan dorilarning dozasini sozlashda klinik ma'lumotnoma sifatida ishlatiladi. Bu vosita faqat taxminiy klirens qiymatini hisoblaydi, doza tavsiya qilmaydi.",
  },
  {
    question: "Cockcroft-Gault bilan eGFR (MDRD/CKD-EPI) bir xil narsami?",
    answer:
      "Yo'q, bular turli formulalar. Cockcroft-Gault vaznga asoslangan va ayniqsa dori dozasini sozlashda keng qo'llaniladi; MDRD va CKD-EPI kabi eGFR formulalari esa surunkali buyrak kasalligini bosqichlashda afzal ko'riladi va tana yuzasi maydoniga nisbatan normallashtirilgan.",
  },
];

export const metadata: Metadata = {
  title: "Kreatinin Klirensini Hisoblash (Cockcroft-Gault)",
  description:
    "Yosh, vazn, jins va zardob kreatininidan, Cockcroft-Gault formulasi bilan taxminiy kreatinin klirensini hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/kreatinin-klirensi-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/kreatinin-klirensi-hesaplama",
    },
  },
  openGraph: {
    title: "Kreatinin Klirensini Hisoblash (Cockcroft-Gault)",
    description: "Cockcroft-Gault formulasi bilan taxminiy kreatinin klirensini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekCreatinineClearancePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Kreatinin Klirensini Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Kreatinin Klirensini Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Kreatinin Klirensini Hisoblash</h1>
          <p>
            Yosh, vazn, jins va zardob kreatininini kiriting:
            Cockcroft-Gault formulasi bilan taxminiy kreatinin
            klirensini darhol hisoblang.
          </p>
        </header>

        <CreatinineClearanceCalculatorUz />

        <section className="category-article-content">
          <h2>Cockcroft-Gault formulasi nima?</h2>
          <p>
            <strong>
              CrCl (mL/daq) = [(140 − Yosh) × Vazn(kg) × (Ayol bo&apos;lsa 0,85)] /
              (72 × Zardob Kreatinini (mg/dL))
            </strong>
            . 1976-yilda e&apos;lon qilingan bu formula, buyrak orqali
            chiqariladigan dorilarning dozasini sozlashda klinikada
            keng qo&apos;llaniladigan standart baholash usulidir.
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
            Tana yuzasi maydoni hisobi uchun{" "}
            <Link href="/uz/tana-yuzasi-maydoni-hisoblash">Tana Yuzasi Maydonini Hisoblash</Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Formula Cockcroft DW, Gault MH (1976), &quot;Prediction of
            creatinine clearance from serum creatinine&quot;, Nephron
            nashriga asoslangan. Bu vosita tibbiy maslahat o&apos;rnini
            bosmaydi; klinik qarorlar uchun shifokorga murojaat qilish
            kerak.
          </p>
        </section>
      </div>
    </main>
  );
}
