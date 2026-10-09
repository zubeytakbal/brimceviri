import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import ColorCodeCalculatorUz from "../../components/calculators/ColorCodeCalculatorUz";
import { hexToRgb, hslToRgb, rgbToHex, rgbToHsl } from "../../converter/colorCodeCalculator";
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

const COLORS: Array<[string, string]> = [
  ["Qora", "#000000"],
  ["Oq", "#FFFFFF"],
  ["Qizil (red)", "#FF0000"],
  ["Yashil (CSS green)", "#008000"],
  ["Ko'k (blue)", "#0000FF"],
  ["To'q ko'k (navy)", "#000080"],
  ["Havorang (deepskyblue)", "#00BFFF"],
  ["Firuza (turquoise)", "#40E0D0"],
  ["Zarg'aldoq (orange)", "#FFA500"],
  ["Tilla rang (gold)", "#FFD700"],
  ["Binafsha (purple)", "#800080"],
  ["Kulrang (gray)", "#808080"],
  ["Kumushrang (silver)", "#C0C0C0"],
];

const EXAMPLE_HEX = "#1E88E5";
const EXAMPLE_RGB = hexToRgb(EXAMPLE_HEX)!;
const EXAMPLE_HSL = rgbToHsl(EXAMPLE_RGB);
const DARKER_HEX = rgbToHex(hslToRgb({ ...EXAMPLE_HSL, l: EXAMPLE_HSL.l - 10 })).toUpperCase();
const LIGHTER_HEX = rgbToHex(hslToRgb({ ...EXAMPLE_HSL, l: EXAMPLE_HSL.l + 15 })).toUpperCase();

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
          <h2>HEX kodni RGB ga qo&apos;lda aylantirish</h2>
          <p>
            {`HEX kod oltita o'n oltilik raqamdan iborat va ikkitadan uch guruhga bo'linadi: qizil, yashil, ko'k. Har bir guruh 0 dan 255 gacha bo'lgan son. O'n oltilik sanoq tizimida A = 10, B = 11, C = 12, D = 13, E = 14, F = 15. Masalan, ${EXAMPLE_HEX}: 1E = 1 × 16 + 14 = ${EXAMPLE_RGB.r}, 88 = 8 × 16 + 8 = ${EXAMPLE_RGB.g}, E5 = 14 × 16 + 5 = ${EXAMPLE_RGB.b}. Natija rgb(${EXAMPLE_RGB.r}, ${EXAMPLE_RGB.g}, ${EXAMPLE_RGB.b}), HSL ko'rinishida esa ${EXAMPLE_HSL.h}°, ${EXAMPLE_HSL.s}%, ${EXAMPLE_HSL.l}%.`}
          </p>
          <p>
            {`Teskari yo'nalishda har bir sonni 16 ga bo'lasiz: 229 ÷ 16 = 14, qoldiq 5, ya'ni E5. Uch xonali qisqa yozuvda (#F80) har bir raqam ikki marta takrorlanadi: #FF8800. Aylantirgich ham qisqa yozuvni shu tarzda kengaytiradi.`}
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
                {COLORS.map(([name, hex]) => {
                  const rgb = hexToRgb(hex)!;
                  const hsl = rgbToHsl(rgb);
                  return (
                    <tr key={hex}>
                      <td>
                        <span className="color-swatch" style={{ background: hex }} aria-hidden="true" /> {name}
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
            {`Qavs ichidagi inglizcha nomlar CSS dagi standart rang nomlari: kodda #40E0D0 o'rniga turquoise deb yozish ham mumkin. CSS dagi green aslida to'q yashil (#008000); yorqin yashil #00FF00 ga lime nomi berilgan.`}
          </p>

          <h2>Qaysi formatni qachon ishlatish kerak</h2>
          <ul>
            <li>
              {`HEX — veb-saytlar, CSS va dizayn dasturlarida rangni boshqalarga yuborishning eng qisqa yo'li.`}
            </li>
            <li>
              {`RGB — ekran rangni aynan shu uch nur bilan hosil qiladi. Shaffoflik kerak bo'lsa, to'rtinchi qiymat qo'shiladi: rgba(${EXAMPLE_RGB.r}, ${EXAMPLE_RGB.g}, ${EXAMPLE_RGB.b}, 0.5).`}
            </li>
            <li>
              {`HSL — rang tusini saqlab, uni ochroq yoki to'qroq qilishda qulay. ${EXAMPLE_HEX} ning yorqinligini 10 birlikka kamaytirsangiz ${DARKER_HEX}, 15 birlikka oshirsangiz ${LIGHTER_HEX} chiqadi; bu tugma ustiga kursor kelganda yoki fon uchun mos ochroq tus tanlashda ishlatiladi.`}
            </li>
          </ul>

          <h2>Ko&apos;p uchraydigan xatolar</h2>
          <ul>
            <li>
              {`O va 0 harflarini adashtirish: HEX kodda faqat 0–9 raqamlari va A–F harflari bo'ladi.`}
            </li>
            <li>
              {`Sakkiz xonali HEX (#1E88E580) — oxirgi ikki raqam shaffoflik. Bu aylantirgich faqat olti va uch xonali kodlarni qabul qiladi; oxirgi ikki raqamni olib tashlang va shaffoflikni CSS da rgba() orqali alohida bering.`}
            </li>
            <li>
              {`Bosma uchun ekran rangini ishlatish. Matbaa CMYK bo'yoqlari bilan ishlaydi va ekrandagi yorqin ko'k yoki yashilni har doim ham aniq chiqara olmaydi; bosma ishlarda bosmaxonaning rang profilini so'rang.`}
            </li>
            <li>
              {`Matn va fon kontrastini tekshirmaslik: bir-biriga yaqin yorqinlikdagi ranglarda matn qiyin o'qiladi. WCAG tavsiyalariga ko'ra oddiy matn uchun kontrast nisbati kamida 4,5:1 bo'lishi kerak.`}
            </li>
          </ul>

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
