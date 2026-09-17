import type { Metadata } from "next";
import Link from "next/link";
import SuperheatSubcoolingCalculatorUz from "../../components/calculators/SuperheatSubcoolingCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/superheat-subcooling-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Superheat (ortiqcha qizdirish) qanday hisoblanadi?",
    answer:
      "Superheat = Bug'latgich Chiqish Harorati (o'lchangan) - To'yinganlik Harorati (bug'lanish bosimiga mos keluvchi). To'yinganlik harorati ishlatilayotgan sovutuvchi gazga xos bosim-harorat (P-T) kartasidan yoki ilovasidan o'qiladi.",
  },
  {
    question: "Subcooling (qo'shimcha sovutish) qanday hisoblanadi?",
    answer:
      "Subcooling = To'yinganlik Harorati (kondensator bosimiga mos keluvchi) - Suyuqlik Liniyasi Harorati (o'lchangan).",
  },
  {
    question: "Bu vosita sovutuvchi gaz uchun P-T aylantirish qiladimi?",
    answer:
      "Yo'q. Har bir sovutuvchi gazning (R410A, R32, R22, R134a va h.k.) o'ziga xos bosim-harorat munosabati bor. Bu vosita faqat siz o'qigan to'yinganlik harorati bilan o'lchagan haroratingiz orasidagi farqni hisoblaydi; P-T aylantirishni o'z P-T kartangizdan yoki ilovangizdan qilishingiz kerak.",
  },
];

export const metadata: Metadata = {
  title: "Superheat va Subcooling Hisoblash",
  description:
    "O'lchangan harorat va to'yinganlik haroratidan superheat (ortiqcha qizdirish) va subcooling (qo'shimcha sovutish) qiymatlarini hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/superheat-subcooling-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/superheat-subcooling-hesaplama",
    },
  },
  openGraph: {
    title: "Superheat va Subcooling Hisoblash",
    description: "Superheat va subcooling qiymatlarini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekSuperheatSubcoolingCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Superheat va Subcooling Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Superheat va Subcooling Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Superheat va Subcooling Hisoblash</h1>
          <p>
            To&apos;yinganlik haroratini o&apos;z P-T kartangizdan
            o&apos;qing, o&apos;lchagan haroratingiz bilan birga
            kiriting: superheat va subcooling qiymatlarini hisoblang.
          </p>
        </header>

        <SuperheatSubcoolingCalculatorUz />

        <section className="category-article-content">
          <h2>Odatiy superheat va subcooling oraliqlari</h2>
          <p>
            Sobit teshik (kapillyar quvur) tizimlarida superheat
            odatda 4-12°C oralig&apos;ida bo&apos;ladi. TXV
            (termostatik kengaytirish klapani) tizimlarida superheat
            odatda 5-7°C atrofida saqlanadi. Subcooling esa tizim
            dizayniga qarab o&apos;zgaradi, odatda 5-15°C
            oralig&apos;idadir. Bu qiymatlar umumiy ma&apos;lumot
            sifatida berilgan — qurilma ishlab chiqaruvchisining
            xizmat ko&apos;rsatish qo&apos;llanmasi asos qilib
            olinishi kerak.
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
            Formulalar sovutish sohasida standart hisoblangan
            superheat/subcooling ta&apos;riflariga asoslangan. Bu
            vosita xizmat ko&apos;rsatish qo&apos;llanmasi yoki
            qurilma ishlab chiqaruvchisi ko&apos;rsatmalarining
            o&apos;rnini bosmaydi.
          </p>
        </section>
      </div>
    </main>
  );
}
