import type { Metadata } from "next";
import Link from "next/link";
import ExposureCalculatorUz from "../../components/calculators/ExposureCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/pozlama-esdegeri-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Pozlama uchburchagi (exposure triangle) nima?",
    answer:
      "Pozlama uchburchagi fotosuratning yorqinligini belgilaydigan uchta sozlamani ifodalaydi: ISO (yorug'likka sezgirlik), diafragma (f-soni, yorug'lik miqdori) va chodir tezligi (deklanshyorning ochiq turish vaqti). Uchtasidan birini o'zgartirganingizda, bir xil yorqinlikni saqlash uchun boshqa ikkitasidan birini ham o'zgartirishingiz kerak.",
  },
  {
    question: "Ekvivalent pozlama qanday hisoblanadi?",
    answer:
      "Yorqinlik ISO × Chodir Vaqti / Diafragma² nisbatiga proportsionaldir. Bu vosita mavjud sozlamalaringiz bilan bir xil yorqinlikni saqlaydigan tarzda, yangi sozlamalardan kiritmagan uchinchi qiymatni shu bog'liqlik yordamida hisoblaydi.",
  },
  {
    question: "Diafragmani bir stop ochsam chodir tezligini qanday o'zgartirishim kerak?",
    answer:
      "Diafragmani bir to'liq stop ochish (masalan f/8 dan f/5,6 ga) sensorga tushadigan yorug'likni 2 baravar oshiradi. Bir xil yorqinlikni saqlash uchun chodir tezligini bir stop tezlashtirishingiz (masalan 1/125 dan 1/250 ga) kerak.",
  },
];

export const metadata: Metadata = {
  title: "Pozlama Ekvivalenti Hisoblash (Exposure Triangle)",
  description:
    "ISO, diafragma va chodir tezligidan ikkitasini o'zgartiring, bir xil pozlamani saqlaydigan uchinchi qiymatni hisoblang; pozlama uchburchagini amaliy vosita bilan o'rganing.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/pozlama-esdegeri-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/pozlama-esdegeri-hesaplama",
    },
  },
  openGraph: {
    title: "Pozlama Ekvivalenti Hisoblash (Exposure Triangle)",
    description: "ISO, diafragma va chodir tezligi orasida ekvivalent pozlama hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekExposureCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Pozlama Ekvivalenti Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Pozlama Ekvivalenti Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Pozlama Ekvivalenti Hisoblash</h1>
          <p>
            Mavjud ISO, diafragma va chodir tezligi sozlamalaringizni
            kiriting. Yangi sozlamalardan istalgan ikkitasini
            to&apos;ldiring, bir xil pozlamani saqlaydigan uchinchi
            qiymatni darhol hisoblang.
          </p>
        </header>

        <ExposureCalculatorUz />

        <section className="category-article-content">
          <h2>Pozlama uchburchagi qanday ishlaydi?</h2>
          <p>
            Sensorga yetib boradigan yorug&apos;lik miqdori{" "}
            <strong>ISO × Chodir Vaqti / Diafragma²</strong> nisbatiga
            proportsionaldir. Bu uchlikdan birini o&apos;zgartirganingizda,
            bir xil yorqinlikni saqlash uchun boshqa ikkitasidan
            kamida bittasini ham o&apos;zgartirishingiz kerak — bu
            vosita o&apos;sha hisobni siz uchun bajaradi.
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
            Sensor formatiga qarab fokus masofasi ekvivalenti uchun{" "}
            <Link href="/uz/odak-uzunligi-esdegeri-hisoblash">
              Fokus Masofasi Ekvivalenti Hisoblash
            </Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Formula fotografiyada standart hisoblangan pozlama
            qiymati (exposure value) bog&apos;liqligiga asoslangan.
            Ekstremal uzun pozlamalarda kuzatiladigan reciprocity
            failure kabi plyonka/sensorga xos og&apos;ishlar bu
            hisobga kiritilmagan.
          </p>
        </section>
      </div>
    </main>
  );
}
