import type { Metadata } from "next";
import Link from "next/link";
import TheoreticalLatencyCalculatorUz from "../../components/calculators/TheoreticalLatencyCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/ping-kechikish-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Nazariy minimal ping nima?",
    answer:
      "Yorug'likning tola-optik kabel ichidagi tezligiga (~200.000 km/s) asoslangan, ikki nuqta orasida fizik jihatdan mumkin bo'lgan eng past kechikish vaqtidir. Hech qanday internet ulanishi, masofa o'zgarmas ekan, bu qiymatdan pastga tusha olmaydi.",
  },
  {
    question: "Haqiqiy ping nima uchun nazariy qiymatdan yuqori chiqadi?",
    answer:
      "Haqiqiy ma'lumot ikki nuqta orasida to'g'ri chiziq bo'ylab yurmaydi; kabel yo'nalishi odatda katta doira masofasidan uzunroq va ma'lumot yo'lda bir nechta yo'naltirgich, kalit va tarmoq darvozasidan o'tadi. Bu jihozlarning har biri kichik kechikishlar qo'shadi, shuning uchun haqiqiy ping nazariy quyi chegaradan odatda 1,5-3 barobar yuqori chiqadi.",
  },
  {
    question: "O'yin serveri tanlashda bu hisob qanday ishlatiladi?",
    answer:
      "Joylashuvingiz bilan serverning joylashuvi orasidagi nazariy minimal pingni ko'rib, qaysi server hududi siz uchun fizik jihatdan afzalroq ekanligini solishtirishingiz mumkin. Haqiqiy ping serverning o'z infratuzilmasi va tarmoq yo'liga qarab o'zgarsa-da, masofa har doim quyi chegarani belgilaydi.",
  },
];

export const metadata: Metadata = {
  title: "Ping / Kechikish Hisoblash (Masofaga Ko'ra Nazariy Minimal)",
  description:
    "Ikki shahar/server joylashuvi orasidagi masofaga qarab fizik jihatdan mumkin bo'lgan eng past ping (kechikish) vaqtini va haqiqiy taxminni hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/ping-gecikme-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/ping-gecikme-hesaplama",
    },
  },
  openGraph: {
    title: "Ping / Kechikish Hisoblash (Masofaga Ko'ra Nazariy Minimal)",
    description: "Ikki joylashuv orasidagi masofaga qarab nazariy minimal ping vaqtini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekTheoreticalLatencyPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Ping / Kechikish Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Ping / Kechikish Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Ping / Kechikish Hisoblash</h1>
          <p>
            Joylashuvingizni va o&apos;yin serveri/maqsadli serverning
            joyini tanlang; ular orasidagi masofaga qarab fizik
            jihatdan mumkin bo&apos;lgan eng past ping (kechikish)
            vaqtini va haqiqiy taxminiy oraliqni hisoblang.
          </p>
        </header>

        <TheoreticalLatencyCalculatorUz />

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
            Ikki nuqta orasidagi katta doira masofasi va marshrut
            hisoblari uchun{" "}
            <Link href="/uz/katta-doira-masofasi-hisoblash">
              Katta Doira Masofasi Hisoblash
            </Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Tola-optik kabellarda yorug&apos;lik tezligi, shishaning
            sinish ko&apos;rsatkichiga (~1,5) asoslangan va
            bo&apos;shliqdagi yorug&apos;lik tezligining (299.792
            km/s) taxminan uchdan ikki qismini tashkil qiladi — bu
            tarmoq muhandisligida keng qabul qilingan fizik
            sobitdir. Haqiqiy dunyo kechikish oralig&apos;i, o&apos;xshash
            masofalardagi umumiy kuzatuvlarga asoslangan dag&apos;al
            taxmindir.
          </p>
        </section>
      </div>
    </main>
  );
}
