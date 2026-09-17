import type { Metadata } from "next";
import Link from "next/link";
import ElongationCalculatorUz from "../../components/calculators/ElongationCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/elastik-chozilish-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Elastisiya moduli (Yung moduli) nima?",
    answer:
      "Elastisiya moduli materialning elastik sohada kuchlanishga qanchalik chidamli ekanligini ko'rsatuvchi sobitdir (σ = E × ε). Qiymat qancha yuqori bo'lsa, material shuncha qattiq bo'ladi (bir xil kuchlanish ostida kamroq cho'ziladi).",
  },
  {
    question: "Elastik cho'zilish qanday hisoblanadi?",
    answer:
      "Avval kuchlanish σ = F / A (Kuch / Kesim Maydoni) hisoblanadi. Keyin nisbiy shakl o'zgarishi ε = σ / E topiladi. Nihoyat cho'zilish ΔL = ε × L₀ (Boshlang'ich Uzunlik) formulasi bilan hisoblanadi.",
  },
  {
    question: "Bu hisob har qanday kuch qiymati uchun to'g'ri keladimi?",
    answer:
      "Yo'q. Bu formula faqat materialning elastik sohasida (kuch olib tashlanganda oldingi holatiga qaytadigan oraliqda) amal qiladi. Oqim chegarasidan yuqori kuchlarda doimiy (plastik) shakl o'zgarishi yuzaga keladi va bu oddiy formula o'z kuchini yo'qotadi.",
  },
];

export const metadata: Metadata = {
  title: "Elastik Cho'zilish Hisoblash (Guk Qonuni)",
  description:
    "Material tanlang, kuch, kesim maydoni va boshlang'ich uzunlikni kiriting: Guk Qonuni bilan kuchlanishni va elastik cho'zilishni hisoblang. Elastisiya moduli jadvali kiritilgan.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/elastik-uzama-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/elastik-uzama-hesaplama",
    },
  },
  openGraph: {
    title: "Elastik Cho'zilish Hisoblash (Guk Qonuni)",
    description: "Kuch, kesim maydoni va uzunlikdan elastik cho'zilishni hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekElongationCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Elastik Cho'zilish Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Elastik Cho&apos;zilish Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Elastik Cho&apos;zilish Hisoblash</h1>
          <p>
            Material tanlang, kuch, kesim maydoni va boshlang&apos;ich
            uzunlikni kiriting: Guk Qonuni bilan kuchlanishni (σ) va
            elastik cho&apos;zilishni (ΔL) hisoblang. Pastda
            elastisiya moduli jadvalini ham topishingiz mumkin.
          </p>
        </header>

        <ElongationCalculatorUz />

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
            Haroratga bog&apos;liq o&apos;lcham o&apos;zgarishi uchun{" "}
            <Link href="/uz/issiqlik-kengayishi-hisoblash">
              Issiqlik Kengayishi Hisoblash
            </Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Formula material mustahkamligida standart hisoblangan Guk
            Qonuniga (σ = Eε) asoslangan. Elastisiya moduli qiymatlari
            umumiy muhandislik ma&apos;lumotnomalaridir; muhim
            loyihalarda material sertifikati asos qilib olinishi
            kerak.
          </p>
        </section>
      </div>
    </main>
  );
}
