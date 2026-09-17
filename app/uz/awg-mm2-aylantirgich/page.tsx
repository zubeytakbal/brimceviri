import type { Metadata } from "next";
import Link from "next/link";
import AwgConverterUz from "../../components/calculators/AwgConverterUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/awg-mm2-aylantirgich";

const faqItems: FaqItem[] = [
  {
    question: "AWG nima?",
    answer:
      "AWG (American Wire Gauge) — Shimoliy Amerikada sim va kabel diametrini ifodalash uchun ishlatiladigan standart o'lchov tizimi. AWG qiymati kichraysa, simning diametri va kesimi kattalashadi.",
  },
  {
    question: "AWG dan mm² ga qanday aylantiriladi?",
    answer:
      "Avval AWG qiymatidan diametr (mm) hisoblanadi: diametr = 0,127 × 92^((36-AWG)/39). Keyin kesim maydoni doira maydoni formulasi (A = π/4 × diametr²) bilan topiladi.",
  },
  {
    question: "2,5 mm² kabel necha AWG ga to'g'ri keladi?",
    answer:
      "2,5 mm² kesimli kabel taxminan 13 AWG ga to'g'ri keladi. Aniq qiymat o'nlik bo'lgani uchun amalda eng yaqin standart AWG o'lchami ishlatiladi.",
  },
];

export const metadata: Metadata = {
  title: "AWG - mm² Aylantirgich (Sim Diametri va Kesim Maydoni)",
  description:
    "AWG (American Wire Gauge) qiymatidan diametr va kesim maydonini (mm²), yoki kesim maydonidan eng yaqin AWG qiymatini hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/awg-mm2-cevirici",
      "uz-UZ": pagePath,
      "x-default": "/awg-mm2-cevirici",
    },
  },
  openGraph: {
    title: "AWG - mm² Aylantirgich (Sim Diametri va Kesim Maydoni)",
    description: "AWG va mm² orasida sim diametri va kesim maydoni aylantirish qiling.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekAwgConverterPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "AWG - mm² Aylantirgich", item: buildSiteUrl(pagePath) },
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
          <span>AWG - mm² Aylantirgich</span>
        </nav>

        <header className="all-conversions-header">
          <h1>AWG - mm² Aylantirgich</h1>
          <p>
            AWG qiymatidan diametr va kesim maydonini, yoki kesim
            maydonidan eng yaqin AWG qiymatini hisoblang. Pastda
            keng tarqalgan AWG o&apos;lchamlarining to&apos;liq
            jadvalini ham topishingiz mumkin.
          </p>
        </header>

        <AwgConverterUz />

        <section className="category-article-content">
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
            Formula AWG ning standart matematik ta&apos;rifiga
            (ASTM B258) asoslangan. Tok o&apos;tkazish sig&apos;imi
            bu vositaning qamroviga kirmaydi; tegishli elektr
            o&apos;rnatish qoidalariga murojaat qilish kerak.
          </p>
        </section>
      </div>
    </main>
  );
}
