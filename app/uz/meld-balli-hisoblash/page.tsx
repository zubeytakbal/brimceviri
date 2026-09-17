import type { Metadata } from "next";
import Link from "next/link";
import MeldCalculatorUz from "../../components/calculators/MeldCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/meld-balli-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "MELD balli nima uchun ishlatiladi?",
    answer:
      "MELD (Model for End-Stage Liver Disease) surunkali jigar kasalligining jiddiyligini bilirubin, INR va kreatinin qiymatlaridan hisoblaydigan, jigar transplantatsiyasi kutish ro'yxatida bemorlarni ustuvorlashtirish uchun ishlatiladigan xalqaro standart balldir.",
  },
  {
    question: "MELD balli nima uchun 6 dan 40 gacha cheklangan?",
    answer:
      "Standart MELD formulasi juda past yoki juda yuqori laboratoriya qiymatlarining ballni ma'nosiz buzishining oldini olish uchun 6-40 oralig'iga cheklanadi; shuningdek dializdagi bemorlarda kreatinin avtomatik ravishda 4,0 deb qabul qilinadi.",
  },
];

export const metadata: Metadata = {
  title: "MELD Ballini Hisoblash (Jigar Kasalligi)",
  description:
    "Bilirubin, INR va kreatinin qiymatlaridan MELD ballini hisoblang; jigar kasalligining jiddiyligini baholang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/meld-skoru-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/meld-skoru-hesaplama",
    },
  },
  openGraph: {
    title: "MELD Ballini Hisoblash (Jigar Kasalligi)",
    description: "MELD ballini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekMeldPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "MELD Ballini Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>MELD Ballini Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>MELD Ballini Hisoblash</h1>
          <p>
            Bilirubin, INR va kreatinin qiymatlarini kiriting: MELD
            ballini va jigar kasalligining jiddiyligini darhol
            hisoblang.
          </p>
        </header>

        <MeldCalculatorUz />

        <section className="category-article-content">
          <h2>MELD Formulasi</h2>
          <p>
            MELD = 3.78×ln(bilirubin mg/dL) + 11.2×ln(INR) +
            9.57×ln(kreatinin mg/dL) + 6.43. Har bir qiymat kamida 1,0
            deb qabul qilinadi; kreatinin 4,0 bilan cheklanadi va
            dializdagi bemorlarda avtomatik ravishda 4,0 ishlatiladi.
            Natija 6-40 oralig&apos;iga yaxlitlanadi.
          </p>

          <h2>Tez-tez So&apos;raladigan Savollar</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>Boshqa Xavf Ballash Vositalari</h2>
          <ul className="related-conversion-list">
            <li><Link href="/uz/glazgo-koma-shkalasi-hisoblash">Glazgo Koma Shkalasini Hisoblash</Link></li>
            <li><Link href="/uz/apgar-balli-hisoblash">APGAR Ballini Hisoblash</Link></li>
            <li><Link href="/uz/sofa-balli-hisoblash">SOFA Ballini Hisoblash</Link></li>
            <li><Link href="/uz/qsofa-hisoblash">qSOFA Hisoblash</Link></li>
            <li><Link href="/uz/wells-balli-hisoblash">Wells Ballini Hisoblash</Link></li>
            <li><Link href="/uz/cha2ds2-vasc-balli-hisoblash">CHA2DS2-VASc Ballini Hisoblash</Link></li>
          </ul>

          <h2>Manbalar</h2>
          <p>
            Ball Kamath PS va h.k. (2001) tomonidan ishlab chiqilgan
            va UNOS/OPTN jigar transplantatsiyasi ustuvorlashtirish
            tizimida ishlatiladi. Bu vosita tibbiy maslahat o&apos;rnini
            bosmaydi; klinik qaror uchun shifokorga murojaat qilish
            kerak.
          </p>
        </section>
      </div>
    </main>
  );
}
