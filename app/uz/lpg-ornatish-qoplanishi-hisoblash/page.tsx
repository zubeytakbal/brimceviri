import type { Metadata } from "next";
import Link from "next/link";
import LpgConversionPaybackCalculatorUz from "../../components/calculators/LpgConversionPaybackCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/lpg-ornatish-qoplanishi-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "LPG o'rnatish necha yilda o'zini oqlaydi?",
    answer:
      "Bu yillik necha km yurishingizga, avtomobilingizning benzin sarfiga, LPGda sarf oshishiga, joriy benzin/LPG narxiga va o'rnatish tizimi narxiga bog'liq. Yuqoridagi hisoblagichga o'z raqamlaringizni kiritib necha yilda (va necha kilometrda) qoplanishini ko'rishingiz mumkin.",
  },
  {
    question: "LPGda yoqilg'i sarfi nima uchun ortadi?",
    answer:
      "LPGning energiya zichligi benzindan past bo'lgani uchun, bir xil masofani bosib o'tish uchun litr hisobida ko'proq yoqilg'i sarflanadi. Bozor tajribasiga ko'ra bu oshish odatda 20-25% oralig'ida bo'ladi; avtomobilning dvigatel turi va o'rnatish sifati bu nisbatga ta'sir qiladi.",
  },
  {
    question: "LPG o'rnatishning qo'shimcha xarajatlari bormi?",
    answer:
      "Ha, o'rnatish tizimining dastlabki narxidan tashqari, yiliga davriy texnik xizmat/sozlash xarajati ham paydo bo'ladi. Hisoblagich bu texnik xizmat xarajatini ham yillik tejamkorlikka kiritadi.",
  },
];

export const metadata: Metadata = {
  title: "LPG O'rnatish Qoplanishi Hisoblash",
  description:
    "O'z yillik kilometraj, avtomobilingiz sarfi va o'rnatish narxi bilan, LPG o'rnatishning necha yilda (necha km da) o'zini oqlashini hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/lpg-donusum-amortisman-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/lpg-donusum-amortisman-hesaplama",
    },
  },
  openGraph: {
    title: "LPG O'rnatish Qoplanishi Hisoblash",
    description: "O'z raqamlaringiz bilan LPG o'rnatishning necha yilda o'zini oqlashini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekLpgConversionPaybackPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "LPG O'rnatish Qoplanishi Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>LPG O&apos;rnatish Qoplanishi Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>LPG O&apos;rnatish Qoplanishi Hisoblash</h1>
          <p>
            O&apos;z yillik kilometrajingiz, avtomobilingiz sarfi va
            o&apos;rnatish narxi bilan, LPG o&apos;rnatishning necha
            yilda (va necha kilometrda) o&apos;zini oqlashini hisoblang.
          </p>
        </header>

        <LpgConversionPaybackCalculatorUz />

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
            Mavjud avtomobilingizning yoqilg&apos;i sarfini hisoblash
            uchun{" "}
            <Link href="/uz/yoqilgi-sarfi-hisoblash">Yoqilg&apos;i Sarfi Hisoblash</Link>{" "}
            sahifasiga, elektromobil solishtirishi uchun{" "}
            <Link href="/uz/elektromobil-benzinli-solishtirish">
              Elektromobilmi yoki Benzinli Avtomobilmi?
            </Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Sarf oshishi standarti umumiy bozor oralig&apos;idan
            olingan; aniq natija uchun o&apos;z avtomobilingiz/ustaxonangiz
            bergan raqamlarni ishlatishingiz tavsiya etiladi.
          </p>
        </section>
      </div>
    </main>
  );
}
