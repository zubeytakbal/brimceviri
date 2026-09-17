import type { Metadata } from "next";
import Link from "next/link";
import EvVsIceComparisonCalculatorUz from "../../components/calculators/EvVsIceComparisonCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/elektromobil-benzinli-solishtirish";

const faqItems: FaqItem[] = [
  {
    question: "Elektromobil narx farqini necha yilda qoplaydi?",
    answer:
      "Bu, yillik necha km yurishingizga, benzinli va elektromobilning sarfiga, hududingizdagi yoqilg'i/elektr narxiga va ikki avtomobil orasidagi narx farqiga bog'liq. Yuqoridagi hisoblagichga o'z raqamlaringizni kiritib necha yilda (va necha kilometrda) narx farqi qoplanishini ko'rishingiz mumkin.",
  },
  {
    question: "Elektromobil zaryadlash benzindan qancha arzon?",
    answer:
      "O'rtacha hisobda bir elektromobil 100 km da taxminan 18 kWh, benzinli avtomobil esa taxminan 7,5 litr benzin sarflaydi. Joriy narxlar bilan solishtirilganda, elektromobillarning 100 km uchun energiya xarajati odatda benzinli avtomobillardan past bo'ladi; aniq farq hududingiz va tarif dilimiga qarab o'zgaradi.",
  },
  {
    question: "Bu hisob texnik xizmat va sug'urta xarajatlarini o'z ichiga oladimi?",
    answer:
      "Yo'q, bu vosita faqat yoqilg'i/elektr xarajati solishtirishga qaratilgan. Texnik xizmat, sug'urta, batareya umri va ikkinchi qo'l qiymati kabi omillar hisobga kiritilmagan; keng qamrovli qaror uchun bularni ham alohida baholashingiz kerak.",
  },
];

export const metadata: Metadata = {
  title: "Elektromobilmi yoki Benzinli Avtomobilmi? Xarajat Solishtirish",
  description:
    "O'z yillik kilometraj, sarf va narx farqingiz bilan elektromobilning benzinlisiga nisbatan necha yilda (necha km da) o'zini oqlashini hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/elektrikli-arac-maliyet-karsilastirma",
      "uz-UZ": pagePath,
      "x-default": "/elektrikli-arac-maliyet-karsilastirma",
    },
  },
  openGraph: {
    title: "Elektromobilmi yoki Benzinli Avtomobilmi? Xarajat Solishtirish",
    description: "O'z raqamlaringiz bilan elektromobilning necha yilda o'zini oqlashini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekEvVsIceComparisonPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Elektromobilmi yoki Benzinli Avtomobilmi?", item: buildSiteUrl(pagePath) },
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
          <span>Elektromobilmi yoki Benzinli Avtomobilmi?</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Elektromobilmi yoki Benzinli Avtomobilmi? Xarajat Solishtirish</h1>
          <p>
            O&apos;z yillik kilometrajingiz, avtomobillarning sarfi va
            ular orasidagi narx farqi bilan, elektromobilning
            benzinlisiga nisbatan necha yilda (va necha kilometrda)
            o&apos;zini oqlashini hisoblang.
          </p>
        </header>

        <EvVsIceComparisonCalculatorUz />

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
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Standart sarf qiymatlari umumiy ma&apos;lumotnoma
            raqamlaridir; aniq natija uchun o&apos;z avtomobilingizning
            sarfini va hududingizdagi joriy narxlarni kiritishingiz
            tavsiya etiladi.
          </p>
        </section>
      </div>
    </main>
  );
}
