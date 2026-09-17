import type { Metadata } from "next";
import Link from "next/link";
import Cha2ds2CalculatorUz from "../../components/calculators/Cha2ds2CalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/cha2ds2-vasc-balli-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "CHA2DS2-VASc balli nima uchun ishlatiladi?",
    answer:
      "Atriyal fibrilyatsiyasi (AF) bo'lgan bemorlarda insult yoki boshqa tromboembolik hodisa xavfini baholash uchun ishlatiladigan, klinikada keng tarqalgan xavf ballash vositasidir. Ball antikoagulyant davolash qarorida shifokorga yo'l ko'rsatuvchi omillardan biridir.",
  },
  {
    question: "CHA2DS2-VASc bilan CHA2DS2-VA orasidagi farq nima?",
    answer:
      "2024-yilgi ESC (Yevropa Kardiologiya Jamiyati) qo'llanmasida, jins omili mustaqil xavf belgilovchisi emasligi baholanib ballardan chiqarib tashlangan va nomi CHA2DS2-VA sifatida qayta ko'rilgan. Bu vosita ikkala ballni ham birgalikda ko'rsatadi.",
  },
];

export const metadata: Metadata = {
  title: "CHA2DS2-VASc Ballini Hisoblash (Insult Xavfi)",
  description:
    "Atriyal fibrilyatsiyada insult xavfi omillarini belgilang: klassik CHA2DS2-VASc va 2024 qayta ko'rilgan CHA2DS2-VA ballini birgalikda hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/cha2ds2-vasc-skoru-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/cha2ds2-vasc-skoru-hesaplama",
    },
  },
  openGraph: {
    title: "CHA2DS2-VASc Ballini Hisoblash (Insult Xavfi)",
    description: "Klassik va 2024 qayta ko'rilgan CHA2DS2-VA insult xavfi ballini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekCha2ds2Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "CHA2DS2-VASc Ballini Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>CHA2DS2-VASc Ballini Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>CHA2DS2-VASc Ballini Hisoblash</h1>
          <p>
            Atriyal fibrilyatsiyada insult xavfi omillarini belgilang:
            klassik CHA2DS2-VASc va 2024 qayta ko&apos;rilgan
            CHA2DS2-VA ballini birgalikda darhol hisoblang.
          </p>
        </header>

        <Cha2ds2CalculatorUz />

        <section className="category-article-content">
          <h2>CHA2DS2-VASc balli qanday hisoblanadi?</h2>
          <p>
            Ball xavf omillarining bosh harflaridan tashkil topgan: C
            (Kongestiv yurak yetishmovchiligi, +1), H (Gipertoniya,
            +1), A2 (Yosh ≥75, +2), D (Diabet, +1), S2 (Insult/TIA/
            tromboemboliya tarixi, +2), V (Qon tomir kasalligi, +1),
            A (Yosh 65-74, +1), Sc (Ayol jinsi, +1). Jami ball 0-9
            orasida.
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
            <li><Link href="/uz/meld-balli-hisoblash">MELD Ballini Hisoblash</Link></li>
            <li><Link href="/uz/sofa-balli-hisoblash">SOFA Ballini Hisoblash</Link></li>
            <li><Link href="/uz/qsofa-hisoblash">qSOFA Hisoblash</Link></li>
            <li><Link href="/uz/wells-balli-hisoblash">Wells Ballini Hisoblash</Link></li>
          </ul>

          <h2>Manbalar</h2>
          <p>
            Ball Lip GYH va h.k. (2010) tomonidan ishlab chiqilgan va
            2024 ESC Atriyal Fibrilyatsiya Qo&apos;llanmasida qayta
            ko&apos;rilgan. Bu vosita tibbiy maslahat o&apos;rnini
            bosmaydi; davolash qarori uchun joriy qo&apos;llanmalarga
            va shifokorga murojaat qilish kerak.
          </p>
        </section>
      </div>
    </main>
  );
}
