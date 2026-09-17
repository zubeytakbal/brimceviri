import type { Metadata } from "next";
import Link from "next/link";
import ApgarCalculatorUz from "../../components/calculators/ApgarCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/apgar-balli-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "APGAR balli qachon o'lchanadi?",
    answer:
      "APGAR balli, tug'ilishdan aniq 1- va 5-daqiqada baholanadi; ball past chiqsa 10-daqiqada qayta o'lchanadi.",
  },
  {
    question: "APGAR balli chaqaloqning uzoq muddatli sog'ligini ko'rsatadimi?",
    answer:
      "Yo'q. APGAR tug'ilish paytidagi tezkor dastlabki baholashdir; chaqaloqning uzoq muddatli sog'ligi yoki rivojlanishi haqida yakka o'zi ko'rsatkich emas.",
  },
];

export const metadata: Metadata = {
  title: "APGAR Ballini Hisoblash (Yangi Tug'ilgan Chaqaloq Baholash)",
  description:
    "Ko'rinish, puls, refleks, faollik va nafas olishni tanlang: APGAR ballini va yangi tug'ilgan chaqaloq baholash kategoriyasini hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/apgar-skoru-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/apgar-skoru-hesaplama",
    },
  },
  openGraph: {
    title: "APGAR Ballini Hisoblash (Yangi Tug'ilgan Chaqaloq Baholash)",
    description: "APGAR ballini va baholash kategoriyasini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekApgarPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "APGAR Ballini Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>APGAR Ballini Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>APGAR Ballini Hisoblash</h1>
          <p>
            Ko&apos;rinish, puls, refleks, faollik va nafas olishni
            tanlang: APGAR jami ballini va yangi tug&apos;ilgan
            chaqaloq baholash kategoriyasini darhol hisoblang.
          </p>
        </header>

        <ApgarCalculatorUz />

        <section className="category-article-content">
          <h2>APGAR balli nima?</h2>
          <p>
            APGAR 1952-yilda Dr. Virginia Apgar tomonidan ishlab
            chiqilgan, yangi tug&apos;ilgan chaqaloqning tug&apos;ilishdan
            keyingi dastlabki hayotiy belgilarini baholovchi ball
            tizimidir. &quot;APGAR&quot; so&apos;zi Appearance
            (Ko&apos;rinish), Pulse (Puls), Grimace (Refleks), Activity
            (Faollik) va Respiration (Nafas olish) so&apos;zlarining
            bosh harflaridan olingan. Har bir mezon 0-2 ball oladi,
            jami 0-10 orasida.
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
            <li><Link href="/uz/meld-balli-hisoblash">MELD Ballini Hisoblash</Link></li>
            <li><Link href="/uz/sofa-balli-hisoblash">SOFA Ballini Hisoblash</Link></li>
            <li><Link href="/uz/qsofa-hisoblash">qSOFA Hisoblash</Link></li>
            <li><Link href="/uz/wells-balli-hisoblash">Wells Ballini Hisoblash</Link></li>
            <li><Link href="/uz/cha2ds2-vasc-balli-hisoblash">CHA2DS2-VASc Ballini Hisoblash</Link></li>
          </ul>

          <h2>Manbalar</h2>
          <p>
            Shkala Apgar V (1953), &quot;A proposal for a new method
            of evaluation of the newborn infant&quot;, Current
            Researches in Anesthesia &amp; Analgesia nashriga
            asoslangan. Bu vosita tibbiy maslahat o&apos;rnini
            bosmaydi.
          </p>
        </section>
      </div>
    </main>
  );
}
