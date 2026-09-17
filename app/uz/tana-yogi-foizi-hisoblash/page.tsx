import type { Metadata } from "next";
import Link from "next/link";
import BodyFatCalculatorUz from "../../components/calculators/BodyFatCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/tana-yogi-foizi-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Bu hisoblash usuli qanchalik aniq?",
    answer:
      "US Navy (AQSH Harbiy-dengiz kuchlari) usuli, kaliper yoki tana kompozitsiyasi tarozisi bo'lmasdan faqat santimetrli lenta bilan qilinadigan baholash usullari orasida eng ishonchlilaridan biridir; lekin DEXA skanerlash kabi laboratoriya usullariga nisbatan bir necha foiz farq berishi mumkin. Umumiy kuzatuv va tasavvur olish maqsadida ishlatilishi kerak.",
  },
  {
    question: "O'lchamlarni qayerdan va qanday olishim kerak?",
    answer:
      "Bo'yin aylanasini tomoq olmasining pastidan, bel aylanasini kindik chizig'idan, ayollarda son aylanasini sonning eng keng nuqtasidan, lentani qisib olmasdan o'lchash kerak. Barqaror natija uchun har doim bir xil vaqtda (masalan, ertalab) o'lchash foydali.",
  },
  {
    question: "BMI o'rniga nega tana yog'i foiziga ham qaralishi kerak?",
    answer:
      "BMI faqat bo'y va vaznga asoslanadi, mushak va yog' massasini farqlay olmaydi — mushak massasi yuqori odam BMI bo'yicha 'ortiqcha vaznli' chiqishi mumkin. Tana yog'i foizi tana kompozitsiyasi haqida to'g'ridan-to'g'ri tasavvur beradi.",
  },
];

export const metadata: Metadata = {
  title: "Tana Yog'i Foizini Hisoblash (US Navy Usuli)",
  description:
    "Bo'yin, bel (va ayollarda son) aylanasi o'lchamlaridan, santimetrli lentadan boshqa jihoz talab qilmaydigan US Navy usuli bilan tana yog'i foizini hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/vucut-yag-orani-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/vucut-yag-orani-hesaplama",
    },
  },
  openGraph: {
    title: "Tana Yog'i Foizini Hisoblash (US Navy Usuli)",
    description:
      "Santimetrli lenta o'lchamlari bilan US Navy usuliga ko'ra tana yog'i foizini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekBodyFatCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Tana Yog'i Foizini Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Tana Yog&apos;i Foizini Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Tana Yog&apos;i Foizini Hisoblash</h1>
          <p>
            Jinsi, bo&apos;y, bo&apos;yin va bel aylanasini (ayollarda
            son aylanasini ham) kiriting: US Navy usuli bilan tana
            yog&apos;i foizini va toifasini darhol hisoblang — faqat
            santimetrli lenta yetarli.
          </p>
        </header>

        <BodyFatCalculatorUz />

        <section className="category-article-content">
          <h2>US Navy usuli qanday ishlaydi?</h2>
          <p>
            Bu usul, bo&apos;yin va bel (ayollarda qo&apos;shimcha
            ravishda son) aylanasi bilan bo&apos;y orasidagi nisbatni
            logarifmik formula bilan tana yog&apos;i foiziga
            aylantiradi. AQSH Harbiy-dengiz kuchlarining fitness
            standartlarida qo&apos;llaniladigan bu usul, kaliper yoki
            maxsus jihoz talab qilmasdan, faqat santimetrli lenta bilan
            maqbul baholash beradi.
          </p>

          <h2>Tana Yog&apos;i Foizi Toifalari</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>ACE (American Council on Exercise) tana yog&apos;i foizi toifalari</caption>
              <thead>
                <tr>
                  <th scope="col">Toifa</th>
                  <th scope="col">Erkak</th>
                  <th scope="col">Ayol</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Asosiy Yog&apos;</td>
                  <td>%2-5</td>
                  <td>%10-13</td>
                </tr>
                <tr>
                  <td>Sportchi</td>
                  <td>%6-13</td>
                  <td>%14-20</td>
                </tr>
                <tr>
                  <td>Fit</td>
                  <td>%14-17</td>
                  <td>%21-24</td>
                </tr>
                <tr>
                  <td>O&apos;rtacha</td>
                  <td>%18-24</td>
                  <td>%25-31</td>
                </tr>
                <tr>
                  <td>Yuqori</td>
                  <td>%25+</td>
                  <td>%32+</td>
                </tr>
              </tbody>
            </table>
          </div>

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
            BMI va kunlik kaloriya ehtiyojing uchun{" "}
            <Link href="/uz/bmi-hisoblash">BMI Hisoblash</Link>, ideal
            vazningiz uchun{" "}
            <Link href="/uz/ideal-vazn-hisoblash">
              Ideal Vaznni Hisoblash
            </Link>
            , mashg&apos;ulot yuklamangiz uchun{" "}
            <Link href="/uz/1rm-hisoblash">1RM Hisoblash</Link>{" "}
            sahifalariga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Hisoblash formulasi AQSH Harbiy-dengiz kuchlarining fitness
            standartida qo&apos;llaniladigan keng tarqalgan US Navy
            tana yog&apos;i foizini baholash usuliga; toifa oraliqlari
            esa American Council on Exercise (ACE) tomonidan e&apos;lon
            qilingan standart tana yog&apos;i foizi tasnifiga
            asoslangan. Bu vosita tibbiy maslahat o&apos;rnini bosmaydi.
          </p>
        </section>
      </div>
    </main>
  );
}
