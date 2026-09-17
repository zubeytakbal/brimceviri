import type { Metadata } from "next";
import Link from "next/link";
import AbvCalculatorUz from "../../components/calculators/AbvCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/abv-standart-ichimlik-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Sof alkogol miqdori qanday hisoblanadi?",
    answer:
      "Sof Alkogol Hajmi (mL) = Ichimlik Hajmi (mL) × ABV (%) / 100. Og'irlikka aylantirish uchun etanolning zichligiga (~0,789 g/mL) ko'paytiriladi: Sof Alkogol Og'irligi (g) = Sof Alkogol Hajmi (mL) × 0,789.",
  },
  {
    question: "Standart ichimlik (standard drink) nima?",
    answer:
      "Standart ichimlik turli ichimlik turlarini (pivo, vino, viski va h.k.) solishtirish imkonini beruvchi, belgilangan miqdordagi sof alkogolga mos keluvchi ma'lumotnoma birligidir. Xalqaro keng qo'llaniladigan ma'lumotnoma 10 g sof alkogoldir; AQSH 14 g, Angliya 8 g kabi turli mamlakat standartlari ham mavjud.",
  },
];

export const metadata: Metadata = {
  title: "ABV va Standart Ichimlik Hisoblash",
  description:
    "Ichimlik hajmi va alkogol foizidan (ABV) sof alkogol miqdorini (mL va g) va standart ichimlik sonini hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/abv-standart-icki-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/abv-standart-icki-hesaplama",
    },
  },
  openGraph: {
    title: "ABV va Standart Ichimlik Hisoblash",
    description: "Ichimlik hajmi va ABV dan sof alkogol miqdorini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekAbvCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "ABV va Standart Ichimlik Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>ABV va Standart Ichimlik Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>ABV va Standart Ichimlik Hisoblash</h1>
          <p>
            Ichimlik hajmi va alkogol foizini (ABV) kiriting: sof
            alkogol miqdorini (mL va g) va standart ichimlik sonini
            hisoblang.
          </p>
        </header>

        <AbvCalculatorUz />

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
            Oz/mL/cl aylantirish uchun{" "}
            <Link href="/uz/kokteyl-olchovi-aylantirgich">
              Kokteyl O&apos;lchovi Aylantirgich
            </Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Formula etanolning zichligiga (~0,789 g/mL, 20°C da)
            asoslangan. Standart ichimlik ma&apos;lumotnoma qiymati
            mamlakatga qarab o&apos;zgaradi; bu vosita tibbiy maslahat
            o&apos;rnini bosmaydi.
          </p>
        </section>
      </div>
    </main>
  );
}
