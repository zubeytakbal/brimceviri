import type { Metadata } from "next";
import Link from "next/link";
import SocialMediaSizeCalculatorUz from "../../components/calculators/SocialMediaSizeCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/ijtimoiy-media-tasvir-olchamlari-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Instagram post o'lchami necha piksel bo'lishi kerak?",
    answer:
      "Kvadrat post uchun 1080×1080 px, vertikal post uchun 1080×1350 px, gorizontal post uchun 1080×566 px tavsiya etiladi. Story va Reels uchun 1080×1920 px ishlatiladi.",
  },
  {
    question: "YouTube thumbnail o'lchami qancha?",
    answer:
      "YouTube video thumbnaili uchun tavsiya etilgan o'lcham 1280×720 piksel (16:9 nisbat).",
  },
  {
    question: "Rasmim to'g'ri nisbatga ega bo'lmasa nima bo'ladi?",
    answer:
      "Platforma rasmni odatda markazlashtirib avtomatik kesadi yoki chetlarida bo'shliq qoldiradi. Yuqoridagi hisoblagichga o'z rasmingizning kengligi va balandligini kiritib, qaysi tomondan qancha kesilishi kerakligini ham hisoblashingiz mumkin.",
  },
];

export const metadata: Metadata = {
  title: "Ijtimoiy Media Tasvir O'lchamlari Hisoblash (Instagram, YouTube, X...)",
  description:
    "Instagram, YouTube, Facebook, X, LinkedIn va TikTok uchun to'g'ri tasvir o'lchamini tanlang; o'z rasmingiz bu nisbatga mos kelishini va kerakli kesishni hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/sosyal-medya-gorsel-boyutlari-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/sosyal-medya-gorsel-boyutlari-hesaplama",
    },
  },
  openGraph: {
    title: "Ijtimoiy Media Tasvir O'lchamlari Hisoblash (Instagram, YouTube, X...)",
    description: "Platformaga qarab to'g'ri tasvir o'lchamini va kesish ehtiyojini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekSocialMediaSizePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Ijtimoiy Media Tasvir O'lchamlari Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Ijtimoiy Media Tasvir O&apos;lchamlari Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Ijtimoiy Media Tasvir O&apos;lchamlari Hisoblash</h1>
          <p>
            Platforma va kontent turini tanlang, to&apos;g&apos;ri
            piksel o&apos;lchamini va en-bo&apos;y nisbatini
            ko&apos;ring. O&apos;z rasmingiz o&apos;lchamlarini
            kiritsangiz, qaysi tomondan qancha kesilishi
            kerakligini ham hisoblaydi.
          </p>
        </header>

        <SocialMediaSizeCalculatorUz />

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
            Piksel, sm va DPI aylantirishlar uchun{" "}
            <Link href="/uz/piksel-sm-dpi-hisoblash">Piksel, SM va DPI Hisoblash</Link>{" "}
            sahifasiga, rang kodi aylantirishlar uchun{" "}
            <Link href="/uz/rang-kodi-aylantirgich">Rang Kodi Aylantirgich</Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            O&apos;lchamlar bir nechta joriy ma&apos;lumotnoma
            manbalaridan o&apos;zaro tasdiqlangan; platformalar bu
            qiymatlarni vaqti-vaqti bilan o&apos;zgartiradi, muhim
            dizayn uchun platformaning o&apos;z joriy yordam
            sahifasini tekshirish tavsiya etiladi.
          </p>
        </section>
      </div>
    </main>
  );
}
