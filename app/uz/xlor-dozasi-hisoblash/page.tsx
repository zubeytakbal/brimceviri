import type { Metadata } from "next";
import Link from "next/link";
import ChlorineDoseCalculatorUz from "../../components/calculators/ChlorineDoseCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/xlor-dozasi-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Xlor dozasi qanday hisoblanadi?",
    answer:
      "ppm mg/L ga teng. Kerakli sof xlor miqdori (mg) = (Maqsadli Xlor - Mavjud Xlor) ppm × Hovuz Hajmi (litr). Bu qiymat 1000 ga bo'linib gramga aylantiriladi, so'ng mahsulotning faol xlor foiziga bo'linib umumiy mahsulot miqdori topiladi.",
  },
  {
    question: "Maqsadli xlor darajasi qancha bo'lishi kerak?",
    answer:
      "Suzish hovuzlarida erkin xlor odatda 1-3 ppm oralig'ida ushlab turiladi; shoklash kabi maxsus holatlarda bu qiymat ancha yuqori bo'lishi mumkin. Bu vosita maqsadli qiymatni belgilamaydi — buni hovuz parvarishlash qo'llanmasidan yoki mahalliy qonunchilikdan olishingiz kerak.",
  },
  {
    question: "Mahsulotning faol xlor foizi qayerdan topiladi?",
    answer:
      "Suyuq xlor odatda 12-15%, granulali kaltsiy gipoxlorit odatda 65-70% faol xlor tarkibiga ega. Bu qiymat mahsulotning qadog'i/yorlig'ida ko'rsatiladi.",
  },
];

export const metadata: Metadata = {
  title: "Xlor Dozasi Hisoblash (Hovuz)",
  description:
    "Hovuz hajmi, mavjud va maqsadli xlor darajasidan, mahsulotning faol xlor foiziga qarab kerakli xlor mahsuloti miqdorini (gram) hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/klor-dozaji-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/klor-dozaji-hesaplama",
    },
  },
  openGraph: {
    title: "Xlor Dozasi Hisoblash (Hovuz)",
    description: "Hovuz hajmi va xlor darajasidan mahsulot miqdorini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekChlorineDoseCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Xlor Dozasi Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Xlor Dozasi Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Xlor Dozasi Hisoblash</h1>
          <p>
            Hovuz hajmini, mavjud va maqsadli xlor darajasini (ppm)
            va mahsulotingizning faol xlor foizini kiriting: kerakli
            mahsulot miqdorini (gram) hisoblang.
          </p>
        </header>

        <ChlorineDoseCalculatorUz />

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
            Hovuz hajmini hisoblash uchun{" "}
            <Link href="/uz/hovuz-hajmi-hisoblash">Hovuz Hajmi Hisoblash</Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Formula ppm (og&apos;irlik/hajm) konsentratsiya
            ta&apos;rifiga asoslangan asosiy xlorlash arifmetikasiga
            tayanadi. Bu vosita hovuz parvarishlash konsultatsiyasi
            o&apos;rnini bosmaydi; maqsadli xlor darajasini
            belgilamaydi.
          </p>
        </section>
      </div>
    </main>
  );
}
