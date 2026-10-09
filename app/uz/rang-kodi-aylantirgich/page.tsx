import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import ColorCodeCalculatorUz from "../../components/calculators/ColorCodeCalculatorUz";
import { hexToRgb, rgbToHsl } from "../../converter/colorCodeCalculator";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/rang-kodi-aylantirgich";

const faqItems: FaqItem[] = [
  {
    question: "HEX rang kodi nima?",
    answer:
      "HEX qizil/yashil/ko'k (RGB) tarkibiy qismlarini 00-FF orasida o'n oltilik sonlar bilan ifodalaydigan, CSS va dizayn vositalarida eng keng ishlatiladigan rang ko'rsatilishidir; masalan #367DA5.",
  },
  {
    question: "RGB bilan HSL orasidagi farq nima?",
    answer:
      "RGB rangni qizil, yashil, ko'k yorug'lik miqdorlari bilan aniqlaydi. HSL esa xuddi shu rangni ton (hue), to'yinganlik (saturation) va yorqinlik (lightness) sifatida aniqlaydi; rangni quyuqlashtirish yoki ochish uchun HSL da faqat lightness qiymatini o'zgartirish yetarli.",
  },
];

// Ko'p ishlatiladigan ranglar; RGB va HSL qiymatlari sahifa yaratilganda hisoblanadi.
const RANGLAR: Array<[string, string]> = [
  ["Qora", "#000000"],
  ["Oq", "#FFFFFF"],
  ["Qizil", "#FF0000"],
  ["Yashil (CSS green)", "#008000"],
  ["Ko'k", "#0000FF"],
  ["To'q ko'k (navy)", "#000080"],
  ["To'q sariq (orange)", "#FFA500"],
  ["Oltin rang (gold)", "#FFD700"],
  ["Kulrang (gray)", "#808080"],
];

export const metadata: Metadata = {
  title: "Rang Kodi Aylantirgich: HEX, RGB, HSL Aylantirish",
  description:
    "HEX, RGB va HSL rang kodlari orasida darhol aylantiring; jonli rang ko'rinishi bilan veb va dizayn loyihalarida to'g'ri rangni toping.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/renk-kodu-cevirici",
      "uz-UZ": pagePath,
      "x-default": "/renk-kodu-cevirici",
    },
  },
  openGraph: {
    title: "Rang Kodi Aylantirgich: HEX, RGB, HSL Aylantirish",
    description: "HEX, RGB va HSL rang kodlari orasida darhol aylantiring.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekColorCodeCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Rang Kodi Aylantirgich", item: buildSiteUrl(pagePath) },
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
          <span>Rang Kodi Aylantirgich</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Rang Kodi Aylantirgich</h1>
          <p>
            HEX, RGB yoki HSL maydonlaridan istalganiga qiymat
            kiriting; boshqa ikkitasi va rang ko&apos;rinishi darhol
            yangilansin.
          </p>
        </header>

        <ColorCodeCalculatorUz />

        <section className="category-article-content">
          <h2>HEX kodni RGB ga qo&apos;lda qanday o&apos;tkaziladi?</h2>
          <p>
            HEX kod oltita o&apos;n oltilik raqamdan iborat va ikkitadan uchta guruhga bo&apos;linadi: qizil, yashil, ko&apos;k. Masalan, <strong>#367DA5</strong>:
            36 = 3 × 16 + 6 = 54, 7D = 7 × 16 + 13 = 125, A5 = 10 × 16 + 5 = 165. Natija <strong>rgb(54, 125, 165)</strong>. O&apos;n oltilik
            tizimda A = 10, B = 11, C = 12, D = 13, E = 14, F = 15. Uch xonali qisqa yozuvda (#F80) har bir raqam ikki marta yoziladi: #FF8800.
          </p>
          <h2>Ko&apos;p ishlatiladigan ranglar kodlari</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Rang</th>
                  <th>HEX</th>
                  <th>RGB</th>
                  <th>HSL</th>
                </tr>
              </thead>
              <tbody>
                {RANGLAR.map(([nom, hex]) => {
                  const rgb = hexToRgb(hex)!;
                  const hsl = rgbToHsl(rgb);
                  return (
                    <tr key={hex}>
                      <td>
                        <span className="color-swatch" style={{ background: hex }} aria-hidden="true" /> {nom}
                      </td>
                      <td>{hex}</td>
                      <td>
                        {rgb.r}, {rgb.g}, {rgb.b}
                      </td>
                      <td>
                        {hsl.h}°, {hsl.s}%, {hsl.l}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p>
            HSL rangning tusini saqlagan holda uni ochroq yoki to&apos;qroq qilish uchun eng qulay: faqat L qiymati o&apos;zgartiriladi. Bosma ishlarda
            CMYK ishlatiladi va ekran ranglari bosmada har doim aynan chiqmaydi.
          </p>

          <h2>Tez-tez So&apos;raladigan Savollar</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}
        </section>
      </div>
    </main>
  );
}
