import type { Metadata } from "next";
import Link from "next/link";
import GreatCircleCalculatorUz from "../../components/calculators/GreatCircleCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/katta-doira-masofasi-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Katta doira (great circle) marshruti nima, nima uchun ishlatiladi?",
    answer:
      "Katta doira marshruti, Yerning sferik yuzasida ikki nuqta orasidagi eng qisqa yo'ldir. Uzoq okean o'tishlarida va uzoq masofali uchishlarda, doimiy kompas marshruti (rhumb line) kuzatish o'rniga katta doira marshrutini kuzatish sezilarli darajada kamroq masofa (demak kamroq yoqilg'i va vaqt) talab qiladi.",
  },
  {
    question: "Katta doira marshrutida yo'nalish nima uchun doimiy o'zgaradi?",
    answer:
      "Katta doira to'g'ri chiziq emas, egri chiziqdir (Yerning sferik shakli tufayli); shuning uchun bu marshrutni kuzatuvchi kema/samolyot doimiy kompas yo'nalishini saqlay olmaydi, yo'nalishini doimiy kichik qadamlar bilan yangilab turishi kerak. Bu vositadagi 'boshlang'ich yo'nalish' faqat harakatning boshidagi yo'nalishdir.",
  },
];

export const metadata: Metadata = {
  title: "Katta Doira Masofasi Hisoblash (Great Circle Distance)",
  description:
    "Ikki nuqta orasidagi kenglik/uzunlik koordinatalaridan, Haversine formulasi bilan katta doira masofasini (dengiz mili/km) va boshlang'ich yo'nalishni hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/buyuk-daire-mesafesi-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/buyuk-daire-mesafesi-hesaplama",
    },
  },
  openGraph: {
    title: "Katta Doira Masofasi Hisoblash (Great Circle Distance)",
    description:
      "Ikki koordinata orasidagi katta doira masofasini va boshlang'ich yo'nalishni hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekGreatCircleCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Katta Doira Masofasi Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Katta Doira Masofasi Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Katta Doira Masofasi Hisoblash</h1>
          <p>
            Ikki nuqtaning kengligi va uzunligini kiriting: Haversine
            formulasi bilan ular orasidagi eng qisqa sfera-ustki
            (katta doira) masofani va boshlang&apos;ich yo&apos;nalishni
            darhol hisoblang.
          </p>
        </header>

        <GreatCircleCalculatorUz />

        <section className="category-article-content">
          <h2>Katta doira masofasi qanday hisoblanadi?</h2>
          <p>
            Haversine formulasi ishlatiladi — ikki nuqta orasidagi
            markaziy burchakni topuvchi, sferaning to&apos;liq
            geometriyasiga asoslangan (taxminiy emas) formula:
          </p>
          <p>
            <strong>
              a = sin²(Δφ/2) + cos φ1 × cos φ2 × sin²(Δλ/2)
            </strong>
            <br />
            <strong>c = 2 × atan2(√a, √(1−a))</strong>
          </p>
          <p>
            Sfera ustida 1 yoy daqiqasi ta&apos;rifiga ko&apos;ra
            aniq 1 dengiz miliga teng bo&apos;lgani uchun, masofa
            to&apos;g&apos;ridan-to&apos;g&apos;ri{" "}
            <strong>c (daraja) × 60</strong> bilan dengiz mili
            hisobida topiladi.
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
            Haversine formulasi sferik trigonometriyaning standart,
            aniq qo&apos;llanilishidir va seyr/navigatsiya
            dasturlarida keng ishlatiladi. Haqiqiy Yer to&apos;liq
            sfera bo&apos;lmagani (yengil siqilgan ellipsoid) uchun
            juda uzoq masofalarda kichik og&apos;ish bo&apos;lishi
            mumkin; aniq navigatsiya uchun sertifikatlangan
            jihozlardan foydalanish kerak.
          </p>
        </section>
      </div>
    </main>
  );
}
