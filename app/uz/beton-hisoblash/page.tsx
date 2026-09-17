import type { Metadata } from "next";
import Link from "next/link";
import ConcreteCalculator from "../../components/ConcreteCalculator";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/beton-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "C25 beton sinfi nimani anglatadi?",
    answer:
      "C25 — betonning 28 kunlik bosim mustahkamligi taxminan 25 MPa (megapaskal) ekanligini bildiruvchi standart tasnif; turar-joy poydevori va plitalarida keng qo'llaniladigan sinf. Boshqa loyihalarda (masalan, baland binolar) yuqoriroq sinf beton kerak bo'lishi mumkin.",
  },
  {
    question: "Zaxira ulushi nega qo'shiladi?",
    answer:
      "Aralashtirish, quyish va yer notekisliklari paytida ma'lum miqdorda beton yo'qotiladi. Standart %5 zaxira ulushi ko'pchilik loyihalar uchun yetarli; notekis yerlarda yoki tajribasiz jamoalarda bu nisbatni oshirish xavfsizroq.",
  },
  {
    question: "Tayyor beton olishim kerakmi, o'zim aralashtirishim kerakmi?",
    answer:
      "Odatda 3-4 m³ dan ortiq quyishlarda tayyor beton (avtobetonaralashtirgich) olish, o'zi aralashtirishdan ko'ra iqtisodiy va barqarorroq natija beradi. Bu vosita tayyor beton buyurtma qilganda necha m³ so'rash kerakligini ham ko'rsatadi.",
  },
];

export const metadata: Metadata = {
  title: "Beton Hisoblash: Necha m³ Beton, Necha Qop Tsement Kerak?",
  description:
    "Poydevor, plita yoki ustun uchun kerakli beton hajmini, tsement qoplari sonini, qum va shag'al miqdorini zaxira ulushi dahil darhol hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/beton-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/beton-hesaplama",
    },
  },
  openGraph: {
    title: "Beton Hisoblash: Necha m³ Beton, Necha Qop Tsement Kerak?",
    description: "O'lchamlarni kiriting, kerakli beton hajmi va aralashma materiallarini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekConcreteCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Beton Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Beton Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Beton Hisoblash</h1>
          <p>
            Poydevor/plita (to&apos;g&apos;ri to&apos;rtburchak) yoki
            ustun (silindr) uchun kerakli beton hajmini, tsement qoplari
            sonini, qum va shag&apos;al miqdorini zaxira ulushi dahil
            darhol hisoblang.
          </p>
        </header>

        <ConcreteCalculator locale="uz" />

        <section className="category-article-content">
          <h2>Beton hajmi qanday hisoblanadi?</h2>
          <p>
            To&apos;g&apos;ri to&apos;rtburchak poydevor yoki plita
            uchun hajm uzunlik × kenglik × qalinlik formulasi bilan
            topiladi. Silindrsimon ustun uchun esa hajm π × radius² ×
            balandlik formulasi bilan hisoblanadi (radius — diametrning
            yarmi). Bu vosita kiritilgan o&apos;lchamlarga qarab
            to&apos;g&apos;ri formulani avtomatik qo&apos;llaydi.
          </p>

          <h2>Aralashma nisbatlari qayerdan olingan?</h2>
          <p>
            Natijalar standart C25 beton sinfining keng qo&apos;llaniladigan
            aralashma nisbatiga asoslangan: taxminan 1 m³ beton uchun
            350 kg tsement, 0,5 m³ qum, 0,8 m³ shag&apos;al (agregat)
            va 175 litr suv. Bu tayyor beton zavodlari odatda
            ishlatadigan nisbat; haqiqiy nisbat ishlatilgan agregat
            turiga, beton sinfiga va ob-havo sharoitiga qarab ozgina
            farq qilishi mumkin.
          </p>

          <h2>O&apos;zim aralashtirgan betonmi, tayyor betonmi?</h2>
          <p>
            Kichik hajmdagi ishlarda (masalan, bir necha ustun yoki
            kichik plita) tsement qopi, qum va shag&apos;alni o&apos;zingiz
            aralashtirishingiz mumkin — bu vosita sizga necha qop
            tsement va qancha qum/shag&apos;al kerakligini ko&apos;rsatadi.
            Kattaroq quyishlarda (bir necha metrkubdan ortiq) tayyor
            beton (avtobetonaralashtirgich bilan) buyurtma qilish ham
            tezroq, ham barqarorroq aralashma sifatini ta&apos;minlaydi
            — bu holda &quot;Zaxira dahil hajm&quot; natijasini tayyor
            beton firmasiga m³ da ehtiyojingiz sifatida yetkazishingiz
            mumkin.
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
            Qazish hajmi hisobi uchun{" "}
            <Link href="/uz/hafriyat-hisoblash">Hafriyat Hisoblash</Link>,{" "}
            devor g&apos;ishti ehtiyoji uchun{" "}
            <Link href="/uz/gisht-hisoblash">G&apos;isht Hisoblash</Link>,{" "}
            beton markasi (M300 kabi) bilan MPa sinfi orasida
            aylantirish uchun{" "}
            <Link href="/uz/beton-markasi-sinfi-aylantirgich">
              Beton Markasi va Sinfini Aylantirish
            </Link>{" "}
            sahifalariga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            C25 beton aralashma nisbatlari tayyor beton zavodlari va
            standart qurilish amaliyot qo&apos;llanmalari nashr etgan
            keng tarqalgan qiymatlardan jamlangan.
          </p>
        </section>
      </div>
    </main>
  );
}
