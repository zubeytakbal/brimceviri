import type { Metadata } from "next";
import LetterGradeCalculatorUz from "../../components/calculators/LetterGradeCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";
import Link from "next/link";

const pagePath = "/uz/harf-bahosi-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "100 balli baho harf bahosiga qanday o'giriladi?",
    answer:
      "Xalqaro miqyosda GPA hisob-kitobida keng qo'llaniladigan oddiy jadvalga ko'ra 90-100 oralig'i A, 80-89 oralig'i B, 70-79 oralig'i C tarzida davom etadi. Bu O'zbekistonning rasmiy ta'lim baholash tizimi emas — chunki O'zbekiston oliy ta'lim muassasalari asosan 100 balli reyting tizimidan foydalanadi, yagona standart harf-baho jadvali yo'q.",
  },
  {
    question: "Bu jadval har bir maktab/universitet uchun amal qiladimi?",
    answer:
      "Yo'q. Bu jadval xalqaro miqyosda tanish umumiy mos yozuv (masalan, chet elga o'qishga kirish yoki diplom ekvivalentligi hisob-kitoblarida foydalaniladigan GPA konventsiyasi); sizning maktabingiz yoki universitetingizning o'z reyting tizimida boshqacha mezonlar bo'lishi mumkin. Aniq natija uchun o'z ta'lim muassasangizning rasmiy manbasiga qarashingiz kerak.",
  },
];

export const metadata: Metadata = {
  title: "Harf Bahosini Hisoblash (100 Balli - 4,0 Tizim)",
  description:
    "100 balli bahoni, xalqaro miqyosda GPA hisob-kitobida ishlatiladigan mos yozuv jadvaliga ko'ra harf bahosiga (A, B, C...) va 4,0 balli tizimga o'giring.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/harf-notu-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/harf-notu-hesaplama",
    },
  },
  openGraph: {
    title: "Harf Bahosini Hisoblash (100 Balli - 4,0 Tizim)",
    description: "100 balli bahodan harf bahosi va 4,0 balli tizim ekvivalentini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekLetterGradeCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Harf Bahosini Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Harf Bahosini Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Harf Bahosini Hisoblash</h1>
          <p>
            100 balli bahoni kiriting: xalqaro miqyosda GPA
            hisob-kitobida ishlatiladigan mos yozuv jadvaliga ko&apos;ra
            harf bahosini va 4,0 balli tizim ekvivalentini ko&apos;ring.
          </p>
        </header>

        <LetterGradeCalculatorUz />

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
            Jadval, GPA hisob-kitobida xalqaro miqyosda keng
            tanilgan umumiy 100 balli-4,0 balli o&apos;girish
            konventsiyasiga asoslangan; O&apos;zbekistonning rasmiy
            standarti emas. O&apos;zbekiston oliy ta&apos;lim
            muassasalari asosan o&apos;zining 100 balli reyting
            tizimidan foydalanadi.
          </p>
        </section>
      </div>
    </main>
  );
}
