import type { Metadata } from "next";
import Link from "next/link";
import InsulationPaybackCalculatorUz from "../../components/calculators/InsulationPaybackCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/izolyatsiya-qoplanishi-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Issiqlik izolyatsiyasi necha yilda o'zini oqlaydi?",
    answer:
      "Bu devoringizning hozirgi holatiga, qo'shiladigan izolyatsiyaning qalinligi va materialiga, hududingiz iqlimiga va isitish energiyasi narxiga bog'liq. Aniq muddat uchun yuqoridagi hisoblagichga o'z raqamlaringizni kiriting.",
  },
  {
    question: "Izolyatsiya qalinligi ortishi bilan tejamkorlik ham proportsional ortadimi?",
    answer:
      "Yo'q. Issiqlik qarshiligi (R) qalinlik bilan to'g'ri proportsional ortsa-da, issiqlik yo'qotilishidagi kamayish R ning teskarisiga bog'liq — ya'ni ma'lum qalinlikdan keyin har bir qo'shimcha santimetr avvalgisidan kamroq qo'shimcha tejamkorlik beradi (kamayuvchi samaradorlik). Shuning uchun juda qalin izolyatsiya har doim ham iqtisodiy bo'lmasligi mumkin.",
  },
  {
    question: "Bu hisob nimani o'z ichiga olmaydi?",
    answer:
      "Faqat devordan issiqlik o'tkazish (konduksiya) orqali bo'ladigan yo'qotishni modellashtiradi. Deraza, eshik, tom, havo o'tkazmasligi, quyosh energiyasi kabi boshqa omillar kiritilmagan; haqiqiy energiya sertifikati hisoblari ancha keng qamrovlidir.",
  },
];

export const metadata: Metadata = {
  title: "Izolyatsiya Qoplanishi Hisoblash (Necha Yilda O'zini Oqlaydi?)",
  description:
    "Devor maydoni, mavjud devor va qo'shiladigan izolyatsiya materiali bilan yillik energiya tejamkorligini va izolyatsiyaning necha yilda o'zini oqlashini hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/yalitim-amortisman-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/yalitim-amortisman-hesaplama",
    },
  },
  openGraph: {
    title: "Izolyatsiya Qoplanishi Hisoblash (Necha Yilda O'zini Oqlaydi?)",
    description: "O'z raqamlaringiz bilan izolyatsiyaning necha yilda o'zini oqlashini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekInsulationPaybackPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Izolyatsiya Qoplanishi Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Izolyatsiya Qoplanishi Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Izolyatsiya Qoplanishi Hisoblash</h1>
          <p>
            Devor maydoni, mavjud devor va qo&apos;shiladigan
            izolyatsiya materiali bilan yillik energiya tejamkorligini
            va izolyatsiyaning necha yilda o&apos;zini oqlashini
            hisoblang.
          </p>
        </header>

        <InsulationPaybackCalculatorUz />

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
            Issiqlik o&apos;tkazish va material issiqlik
            o&apos;tkazuvchanligi jadvali uchun{" "}
            <Link href="/uz/issiqlik-otkazuvchanligi-hisoblash">Issiqlik O&apos;tkazuvchanligi Hisoblagichi</Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Devor va izolyatsiya materiali issiqlik o&apos;tkazuvchanligi
            qiymatlari standart odatiy ma&apos;lumotnoma oraliqlariga
            asoslangan; hisoblash ketma-ket issiqlik qarshiligi (R =
            qalinlik/λ) printsipiga ko&apos;ra amalga oshiriladi.
          </p>
        </section>
      </div>
    </main>
  );
}
