import type { Metadata } from "next";
import Link from "next/link";
import SofaCalculatorUz from "../../components/calculators/SofaCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/sofa-balli-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "SOFA balli nima uchun ishlatiladi?",
    answer:
      "SOFA (Sequential Organ Failure Assessment) intensiv terapiyada 6 organ tizimining (nafas olish, koagulyatsiya, jigar, yurak-qon tomir, markaziy asab tizimi, buyrak) funksiya buzilishini 0-4 ball orqali baholovchi, organ yetishmovchiligi jiddiyligini kuzatish uchun ishlatiladigan keng qamrovli balldir.",
  },
  {
    question: "SOFA ballari qayerdan olinadi?",
    answer:
      "Har bir kichik tizim uchun standart klinik/laboratoriya mezon oraliqlaridan (masalan PaO2/FiO2 nisbati, trombotsit soni, bilirubin, GKS, kreatinin) mos ball tanlanadi; bu vosita siz tanlagan ballarni yig'adi, laboratoriya hisobini bajarmaydi.",
  },
];

export const metadata: Metadata = {
  title: "SOFA Ballini Hisoblash (Organ Yetishmovchiligi)",
  description:
    "6 organ tizimining (nafas olish, koagulyatsiya, jigar, yurak-qon tomir, MAT, buyrak) ballarini tanlang: SOFA jami ballini hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/sofa-skoru-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/sofa-skoru-hesaplama",
    },
  },
  openGraph: {
    title: "SOFA Ballini Hisoblash (Organ Yetishmovchiligi)",
    description: "SOFA jami ballini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekSofaPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "SOFA Ballini Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>SOFA Ballini Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>SOFA Ballini Hisoblash</h1>
          <p>
            6 organ tizimining ballarini tanlang: SOFA (Sequential
            Organ Failure Assessment) jami ballini darhol hisoblang.
          </p>
        </header>

        <SofaCalculatorUz />

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
            Tezkor sepsis skriningi uchun{" "}
            <Link href="/uz/qsofa-hisoblash">qSOFA Hisoblash</Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Boshqa Xavf Ballash Vositalari</h2>
          <ul className="related-conversion-list">
            <li><Link href="/uz/qsofa-hisoblash">qSOFA Hisoblash</Link></li>
            <li><Link href="/uz/glazgo-koma-shkalasi-hisoblash">Glazgo Koma Shkalasini Hisoblash</Link></li>
            <li><Link href="/uz/apgar-balli-hisoblash">APGAR Ballini Hisoblash</Link></li>
            <li><Link href="/uz/meld-balli-hisoblash">MELD Ballini Hisoblash</Link></li>
            <li><Link href="/uz/wells-balli-hisoblash">Wells Ballini Hisoblash</Link></li>
            <li><Link href="/uz/cha2ds2-vasc-balli-hisoblash">CHA2DS2-VASc Ballini Hisoblash</Link></li>
          </ul>

          <h2>Manbalar</h2>
          <p>
            Ball Vincent JL va h.k. (1996) tomonidan ishlab chiqilgan
            va Sepsis-3 (2016) ta&apos;riflarida yangilangan. Bu
            vosita tibbiy maslahat o&apos;rnini bosmaydi; klinik qaror
            uchun shifokorga murojaat qilish kerak.
          </p>
        </section>
      </div>
    </main>
  );
}
