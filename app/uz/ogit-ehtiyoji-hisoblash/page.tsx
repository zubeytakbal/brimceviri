import type { Metadata } from "next";
import Link from "next/link";
import FertilizerCalculatorUz from "../../components/calculators/FertilizerCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/ogit-ehtiyoji-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Bu vosita menga qaysi o'g'it va dozani ishlatishim kerakligini aytadimi?",
    answer:
      "Yo'q. Bu vosita, allaqachon belgilangan maqsadli ozuqa dozasini (kg/dekar), ishlatadigan o'g'itingizning ozuqa tarkibi foizi bilan birga, mahsulot miqdoriga (kg) aylantiradi. Qaysi ozuqa dozasining mos ekanligini belgilamaydi — bu qiymat tuproq tahlili natijasiga va mahsulot turiga qarab o'zgaradi.",
  },
  {
    question: "O'g'it ehtiyoji qanday hisoblanadi?",
    answer:
      "Dekar uchun Kerakli O'g'it (kg/da) = Maqsadli Ozuqa Dozasi (kg/da) ÷ (O'g'itning Ozuqa Tarkibi % / 100). Masalan, dekarga 6 kg azot maqsad qilsangiz va o'g'itingiz 20% azot tarkibiga ega bo'lsa, dekarga 6 ÷ 0,20 = 30 kg o'g'it kerak bo'ladi.",
  },
];

export const metadata: Metadata = {
  title: "O'g'it Ehtiyoji Hisoblash (kg/dekar)",
  description:
    "Maqsadli ozuqa dozasini (kg/dekar) va o'g'itning ozuqa tarkibi foizini kiriting; dekar va umumiy maydon uchun kerakli o'g'it miqdorini (kg) hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/gubre-ihtiyaci-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/gubre-ihtiyaci-hesaplama",
    },
  },
  openGraph: {
    title: "O'g'it Ehtiyoji Hisoblash (kg/dekar)",
    description: "Maqsadli ozuqa dozasidan o'g'it miqdorini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekFertilizerCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "O'g'it Ehtiyoji Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>O&apos;g&apos;it Ehtiyoji Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>O&apos;g&apos;it Ehtiyoji Hisoblash</h1>
          <p>
            Maqsadli ozuqa dozasini (kg/dekar) va ishlatadigan
            o&apos;g&apos;itingizning ozuqa tarkibi foizini kiriting:
            dekar va umumiy maydon uchun kerakli o&apos;g&apos;it
            miqdorini (kg) hisoblang.
          </p>
        </header>

        <FertilizerCalculatorUz />

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
            Urug&apos; miqdorini hisoblash uchun{" "}
            <Link href="/uz/urugi-miqdori-hisoblash">Urug&apos; Miqdori Hisoblash</Link>{" "}
            sahifasiga, uy/bog&apos; o&apos;simliklari uchun suyuq
            o&apos;g&apos;it suyultirish hisobi uchun{" "}
            <Link href="/uz/ogit-suyultirish-hisoblash">O&apos;g&apos;it Suyultirish Hisoblash</Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Formula asosiy ozuqa dozasi-tarkib arifmetikasiga
            asoslangan. Bu vosita va uning natijalari qishloq xo&apos;jaligi
            konsultatsiyasi o&apos;rnini bosmaydi; qaysi dozaning mos
            ekanligini belgilamaydi.
          </p>
        </section>
      </div>
    </main>
  );
}
