import type { Metadata } from "next";
import Link from "next/link";
import TireSizeCalculatorUz from "../../components/calculators/TireSizeCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/shina-olchami-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Shina o'lchami kodi (masalan, 205/55 R16) qanday o'qiladi?",
    answer:
      "205 — shinaning kengligi (mm). 55 — yon devor nisbati (%) — yon devor balandligining kenglikka nisbati. R — radial tuzilma degani. 16 esa diskning diametri (dyuym). Yon devor balandligi = Kenglik × (Yon Devor Nisbati / 100) formulasi bilan topiladi.",
  },
  {
    question: "Boshqa o'lchamdagi shina o'rnatilganda spidometr nega sapadi?",
    answer:
      "Spidometr, g'ildirakning aylanish tezligini original shinaning aylanasiga qarab tezlikka aylantiradi. Boshqa diametrdagi shina o'rnatilganda g'ildirak aylanasi o'zgaradi, shuning uchun bir xil aylanish tezligida bosib o'tilgan haqiqiy masofa (demak, haqiqiy tezlik) ko'rsatkichdan farq qiladi.",
  },
  {
    question: "Tashqi diametri juda farq qiladigan shina o'rnatish muammo tug'diradimi?",
    answer:
      "Ha. Ishlab chiqaruvchilar odatda original o'lchamdan %3 dan ortiq tashqi diametr farqini tavsiya qilmaydi; katta farqlar spidometr/kilometrometr xatosiga, ABS/ESP kabi elektron tizimlarning noto'g'ri ishlashiga va ba'zi mamlakatlarda texnik ko'rikdan o'tmaslikka olib kelishi mumkin. O'zgartirishdan oldin shinachi ustaga murojaat qilish eng xavfsizi.",
  },
];

export const metadata: Metadata = {
  title: "Shina O'lchamini Hisoblash: Tashqi Diametr va Spidometr Sapishi",
  description:
    "Shina o'lchami kodidan (masalan, 205/55 R16) tashqi diametrni, aylanani va km uchun aylanish sonini hisoblang; ikkita turli o'lcham kiritib spidometr va kilometrometr sapishini biling.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/lastik-ebati-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/lastik-ebati-hesaplama",
    },
  },
  openGraph: {
    title: "Shina O'lchamini Hisoblash",
    description: "Shina o'lchamidan tashqi diametr, aylana va spidometr sapishini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekTireSizeCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Shina O'lchamini Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Shina O&apos;lchamini Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Shina O&apos;lchamini Hisoblash</h1>
          <p>
            Shina o&apos;lchami kodini (kenglik/yon devor nisbati/disk
            diametri) kiriting: tashqi diametrni, aylanani va km uchun
            aylanish sonini hisoblang. Ikkita turli o&apos;lcham
            kiritib ular orasidagi spidometr sapishini ham
            ko&apos;rishingiz mumkin.
          </p>
        </header>

        <TireSizeCalculatorUz />

        <section className="category-article-content">
          <h2>Shina o&apos;lchami kodi qanday o&apos;qiladi?</h2>
          <p>
            Masalan <strong>205/55 R16</strong> kodida: 205 — shinaning
            kengligi (mm); 55 — yon devor nisbati (%) — yon devor
            balandligining kenglikka nisbati; R — radial tuzilma; 16
            esa diskning diametri (dyuym).
          </p>

          <h2>Tashqi diametr qanday hisoblanadi?</h2>
          <p>
            Avval yon devor balandligi topiladi:{" "}
            <strong>Yon Devor Balandligi = Kenglik × (Yon Devor Nisbati / 100)</strong>.
            Keyin disk diametri millimetrga aylantirilib ikkita yon
            devor balandligi qo&apos;shiladi:{" "}
            <strong>
              Tashqi Diametr = (Disk Diametri × 25,4) + (2 × Yon Devor Balandligi)
            </strong>
            . Aylana esa{" "}
            <strong>Aylana = π × Tashqi Diametr</strong> formulasi
            bilan, km uchun aylanish soni esa{" "}
            <strong>1 000 000 / Aylana (mm)</strong> formulasi bilan
            topiladi.
          </p>

          <h2>Spidometr sapishi qanday yuzaga keladi?</h2>
          <p>
            Spidometr, g&apos;ildirakning aylanish tezligini original
            shinaning aylanasiga qarab tezlikka aylantiradi. Yangi
            shinaning aylanasi kattaroq bo&apos;lsa, g&apos;ildirak
            har aylanishda ko&apos;proq masofa bosib o&apos;tadi, lekin
            ko&apos;rsatkich buni hisobga olmagani uchun haqiqiy
            tezlik ko&apos;rsatilgan tezlikdan yuqoriroq bo&apos;ladi
            (aylana kichik bo&apos;lsa aksincha).
          </p>

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
            Shina o&apos;lchami kodi va tashqi diametr formulasi,
            shina ishlab chiqaruvchilarining (ETRTO standarti) e&apos;lon
            qilgan umumiy shina o&apos;lchamlash qoidalariga
            asoslangan. Transport vositangizga mos shina o&apos;lchami
            uchun har doim foydalanish qo&apos;llanmasi yoki vakolatli
            shinachiga murojaat qiling.
          </p>
        </section>
      </div>
    </main>
  );
}
