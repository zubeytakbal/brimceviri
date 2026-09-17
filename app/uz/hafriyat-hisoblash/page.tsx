import type { Metadata } from "next";
import Link from "next/link";
import ExcavationCalculatorUz from "../../components/calculators/ExcavationCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/hafriyat-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Bo'shashish (shishish) payi nima uchun muhim?",
    answer:
      "Tuproq joyida siqilgan holatda qazib bo'shashtirilganda hajmi ortadi (bulking/swell). Shuning uchun yuk mashinasi sonini joyidagi qazish hajmiga emas, bo'shashish payi qo'shilgan hajmga qarab hisoblash kerak; aks holda yuk mashinasi soni yetarli chiqmaydi.",
  },
  {
    question: "Bo'shashish payi tuproq turiga qarab o'zgaradimi?",
    answer:
      "Ha. Qumli tuproqlarda bo'shashish payi odatda 10-15%, o'rtacha aralash tuproqlarda 20-30%, loy va loyli tuproqlarda 25-40% atrofida bo'ladi. Vositamizdagi 25% standart qiymat o'rtacha tuproq turi uchundir; o'z tuprog'ingiz holatiga qarab bu nisbatni o'zgartirishingiz mumkin.",
  },
  {
    question: "Yuk mashinasi kuzovi hajmi sifatida nima kiritishim kerak?",
    answer:
      "Keng qo'llaniladigan samosval yuk mashinalarining kuzov hajmi odatda 8-12 m³ atrofida bo'ladi; vositaning standart qiymati 10 m³. Ishlatadigan yuk mashinangizning haqiqiy kuzov hajmini bilsangiz, uni kiritish aniqroq natija beradi.",
  },
];

export const metadata: Metadata = {
  title: "Qazish va Hafriyat Hisoblash: Qazish Hajmi va Yuk Mashinasi Soni",
  description:
    "Fundament yoki podval qazishning uzunlik, kenglik va chuqurligidan joyidagi qazish hajmini, bo'shashish payi qo'shilgan hajmni va kerakli yuk mashinasi reyslari sonini hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/hafriyat-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/hafriyat-hesaplama",
    },
  },
  openGraph: {
    title: "Qazish va Hafriyat Hisoblash: Qazish Hajmi va Yuk Mashinasi Soni",
    description:
      "Qazish hajmini, bo'shashish payi qo'shilgan hajmni va kerakli yuk mashinasi reyslari sonini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekExcavationCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Qazish va Hafriyat Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Qazish va Hafriyat Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Qazish va Hafriyat Hisoblash</h1>
          <p>
            Qazish maydonining uzunlik, kenglik va chuqurligini
            kiriting: joyidagi qazish hajmini, bo&apos;shashish payi
            qo&apos;shilgan tashiladigan hajmni va kerakli yuk
            mashinasi reyslari sonini darhol hisoblang.
          </p>
        </header>

        <ExcavationCalculatorUz />

        <section className="category-article-content">
          <h2>Qazish hajmi qanday hisoblanadi?</h2>
          <p>
            To&apos;rtburchak kesimli qazishning joyidagi (bank) hajmi{" "}
            <strong>Hajm = Uzunlik × Kenglik × Chuqurlik</strong>{" "}
            formulasi bilan topiladi. Bu tuproqning tabiiy, siqilgan
            holatdagi hajmi — hali qazilmagan holatdagi hajmga mos
            keladi.
          </p>

          <h2>Bo&apos;shashish (shishish) payi nima?</h2>
          <p>
            Tuproq qazib bo&apos;shashtirilganda, zarrachalar orasidagi
            bo&apos;shliqlar ortgani uchun hajmi kengayadi; bunga{" "}
            <strong>bo&apos;shashish yoki shishish payi (bulking/swell factor)</strong>{" "}
            deyiladi. Yuk mashinasi bilan tashish rejalashtirilishi bu
            bo&apos;shashgan hajmga qarab qilinishi kerak, chunki yuk
            mashinasiga yuklangan tuproq endi joyidagi kabi siqilgan
            emas.{" "}
            <strong>Bo&apos;shashgan Hajm = Joyidagi Hajm × (1 + Bo&apos;shashish Payi / 100)</strong>.
          </p>
          <p>
            Kerakli yuk mashinasi soni esa bo&apos;shashgan hajmning,
            ishlatilgan yuk mashinasining kuzov hajmiga bo&apos;linib
            yuqoriga yaxlitlanishi bilan topiladi:{" "}
            <strong>Yuk Mashinasi Soni = ⌈Bo&apos;shashgan Hajm / Yuk Mashinasi Kuzovi Hajmi⌉</strong>.
          </p>

          <h2>Tez-tez So&apos;raladigan Savollar</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>Manbalar</h2>
          <p>
            Bo&apos;shashish/shishish payi oraliqlari qurilish
            muhandisligida keng qo&apos;llaniladigan tuproq
            tasniflash jadvallaridagi odatiy qiymatlarga asoslangan.
            Aniq qiymatlar tuproq tekshiruvi va maydon sharoitlariga
            qarab o&apos;zgarishi mumkin; katta miqyosli yoki muhim
            loyihalarda qurilish muhandisi bilan ishlash kerak.
          </p>
        </section>
      </div>
    </main>
  );
}
