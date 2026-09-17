import type { Metadata } from "next";
import Link from "next/link";
import NumberBaseCalculator from "../../components/NumberBaseCalculator";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/son-tizimi-cevirgich";

const faqItems: FaqItem[] = [
  {
    question: "Ikkilik (binary) son tizimi nima?",
    answer:
      "Ikkilik tizim faqat 0 va 1 raqamlarini ishlatadigan son ko'rsatish shaklidir. Kompyuterlar ma'lumotni elektron sxemalarda ikki holat (yoniq/o'chiq) bilan ifodalagani uchun asosan ikkilik tizimdan foydalanadi.",
  },
  {
    question: "O'n oltilik (hexadecimal) tizim qayerda ishlatiladi?",
    answer:
      "O'n oltilik tizim 0-9 raqamlari bilan A-F harflarini ishlatadi. Rang kodlari (#FF00FF kabi), xotira manzillari va past darajali dasturlashda ikkilik sonlarni qisqaroq va o'qish uchun qulayroq ko'rsatish uchun qo'llaniladi.",
  },
  {
    question: "Nega manfiy natija beradigan ayirish qo'llab-quvvatlanmaydi?",
    answer:
      "Bu vosita ishorasiz (unsigned) ikkilik arifmetikadan foydalanadi; shuning uchun ayirish amalida katta sonni avval kiritishingiz kerak. Ishorali manfiy son ko'rinishi (two's complement) bu vositaning qamroviga kirmaydi.",
  },
];

export const metadata: Metadata = {
  title: "Son Tizimi Aylantirgich: Ikkilik, Sakkizlik, O'nlik, O'n Oltilik",
  description:
    "Ikkilik (binary), sakkizlik (octal), o'nlik (decimal) va o'n oltilik (hexadecimal) son tizimlari o'rtasida darhol aylantiring; ikkilik sonlar bilan qo'shish, ayirish va ko'paytirish qiling.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/sayi-tabani-cevirici",
      bn: "/bn/number-base-calculator",
      "uz-UZ": pagePath,
      "x-default": "/sayi-tabani-cevirici",
    },
  },
  openGraph: {
    title: "Son Tizimi Aylantirgich: Ikkilik, Sakkizlik, O'nlik, O'n Oltilik",
    description:
      "Ikkilik, sakkizlik, o'nlik va o'n oltilik son tizimlari o'rtasida darhol aylantiring.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekNumberBaseCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Son Tizimi Aylantirgich", item: buildSiteUrl(pagePath) },
    ],
  };

  return (
    <main className="all-conversions-page" lang="uz">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }}
      />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sahifa yo'li">
          <Link href="/uz">Bosh sahifa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Son Tizimi Aylantirgich</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Son Tizimi Aylantirgich</h1>
          <p>
            Ikkilik, sakkizlik, o&apos;nlik va o&apos;n oltilik son
            tizimlari o&apos;rtasida darhol aylantiring; pastdagi ikkinchi
            vosita bilan ikkita ikkilik sonni qo&apos;shing, ayiring yoki
            ko&apos;paytiring.
          </p>
        </header>

        <NumberBaseCalculator locale="uz" />

        <section className="category-article-content">
          <h2>Son tizimlari nima, qanday ishlaydi?</h2>
          <p>
            Kundalik hayotda ishlatadigan <strong>o&apos;nlik (decimal)</strong>{" "}
            tizim 10 ta raqamdan (0-9) foydalanadi. Kompyuterlar esa
            ma&apos;lumotni <strong>ikkilik (binary)</strong> tizimda, faqat
            0 va 1 raqamlari bilan ifodalaydi. <strong>Sakkizlik (octal)</strong>{" "}
            va <strong>o&apos;n oltilik (hexadecimal)</strong> tizimlar uzun
            ikkilik sonlarni qisqaroq va o&apos;qish uchun qulayroq
            ko&apos;rsatish uchun ishlatiladi — ayniqsa dasturlash, tarmoq
            manzillashuvi va rang kodlarida tez-tez uchraydi.
          </p>
          <p>
            Sonning tizimini o&apos;zgartirish uning qiymatini emas, faqat
            ko&apos;rsatish shaklini o&apos;zgartiradi. Masalan, o&apos;nlik
            tizimda 10 soni ikkilik tizimda 1010, o&apos;n oltilik tizimda
            esa A deb yoziladi — barchasi bir xil miqdorni ifodalaydi.
          </p>

          <h2>Ikkilik sonlar bilan qo&apos;shish, ayirish, ko&apos;paytirish qanday qilinadi?</h2>
          <p>
            Ikkilik arifmetika o&apos;nlik tizimdagi amallar bilan bir xil
            mantiqda ishlaydi; yagona farq har bir xona faqat 0 yoki 1
            bo&apos;lishi mumkinligidir. Bu vosita kiritgan ikkita ikkilik
            soningizni orqa fonda o&apos;nlik tizimga o&apos;girib amalni
            bajaradi, natijani yana ikkilik ko&apos;rinishda ko&apos;rsatadi.
          </p>

          <h2>Tez-tez So&apos;raladigan Savollar</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>Boshqa tillar</h2>
          <Link className="text-link" href="/sayi-tabani-cevirici" hrefLang="tr">
            Turkcha versiyasini ko&apos;rish
          </Link>
        </section>
      </div>
    </main>
  );
}
