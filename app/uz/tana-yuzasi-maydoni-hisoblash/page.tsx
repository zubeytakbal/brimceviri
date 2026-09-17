import type { Metadata } from "next";
import Link from "next/link";
import BsaCalculatorUz from "../../components/calculators/BsaCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/tana-yuzasi-maydoni-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Tana yuzasi maydoni (BSA) nima uchun hisoblanadi?",
    answer:
      "BSA dori dozalashda kilogramm boshiga doza (mg/kg)ga alternativ sifatida yuza maydoniga qarab dozalash (mg/m²) yondashuvini imkoniyatini beradi; shuningdek yurak va buyrak kabi organ funksiyalarini 'shaxs o'lchamiga nisbatan' normallashtirish uchun ishlatiladi. Bu vosita faqat BSA qiymatini hisoblaydi, doza tavsiya qilmaydi.",
  },
  {
    question: "Mosteller formulasi boshqa formulalardan farq qiladimi?",
    answer:
      "Ha, bir nechta BSA formulasi mavjud (Du Bois, Haycock kabi); natijalar bir-biriga juda yaqin, lekin bir xil emas. Mosteller formulasi soddaligi tufayli kundalik klinik amaliyotda eng ko'p tanlanadigan usuldir.",
  },
];

export const metadata: Metadata = {
  title: "Tana Yuzasi Maydoni Hisoblash (BSA - Mosteller Formulasi)",
  description:
    "Bo'y va vazndan, Mosteller formulasi bilan tana yuzasi maydonini (BSA, m²) hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/vucut-yuzey-alani-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/vucut-yuzey-alani-hesaplama",
    },
  },
  openGraph: {
    title: "Tana Yuzasi Maydoni Hisoblash (BSA - Mosteller Formulasi)",
    description: "Bo'y va vazndan tana yuzasi maydonini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekBsaCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Tana Yuzasi Maydoni Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Tana Yuzasi Maydoni Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Tana Yuzasi Maydoni Hisoblash (BSA)</h1>
          <p>
            Bo&apos;y va vaznni kiriting: Mosteller formulasi bilan
            tana yuzasi maydonini (m²) darhol hisoblang.
          </p>
        </header>

        <BsaCalculatorUz />

        <section className="category-article-content">
          <h2>BSA (Mosteller) formulasi nima?</h2>
          <p>
            <strong>BSA (m²) = √(Bo&apos;y(sm) × Vazn(kg) / 3600)</strong>.
            Bu formula 1987-yilda Dr. Richard Mosteller tomonidan
            e&apos;lon qilingan, soddaligi va aniqligi tufayli klinik
            amaliyotda eng keng qo&apos;llaniladigan BSA baholash
            usulidir. Kattalar uchun normal BSA oralig&apos;i taxminan
            1,6-2,0 m².
          </p>

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
            Buyrak funksiyasini baholash uchun{" "}
            <Link href="/uz/kreatinin-klirensi-hisoblash">Kreatinin Klirensini Hisoblash</Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Formula Mosteller RD (1987), &quot;Simplified calculation
            of body-surface area&quot;, New England Journal of
            Medicine nashriga asoslangan. Bu vosita tibbiy maslahat
            o&apos;rnini bosmaydi; klinik qarorlar uchun shifokorga
            murojaat qilish kerak.
          </p>
        </section>
      </div>
    </main>
  );
}
