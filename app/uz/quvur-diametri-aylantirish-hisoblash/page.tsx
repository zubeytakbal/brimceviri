import type { Metadata } from "next";
import Link from "next/link";
import PipeNominalSizeCalculatorUz from "../../components/calculators/PipeNominalSizeCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/quvur-diametri-aylantirish-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "DN nimani anglatadi, haqiqiy tashqi diametrga tengmi?",
    answer:
      "DN (Diameter Nominal) EN ISO 6708 standartiga muvofiq quvurning nominal, ya'ni nomiga xos diametrini ifodalaydi — haqiqiy tashqi diametrni to'g'ridan-to'g'ri ko'rsatmaydi. Masalan, DN50 quvurning haqiqiy tashqi diametri 60,3 mm, 50 mm emas.",
  },
  {
    question: "NPS bilan DN orasidagi farq nima?",
    answer:
      "NPS (Nominal Pipe Size) Amerika/ANSI tizimida dyuym bilan nominal o'lchamni; DN esa Yevropa/EN ISO tizimida millimetr bilan nominal diametrni ifodalaydi. Ikkalasi bir xil quvur o'lchamiga to'g'ri keladi (masalan, DN50 = NPS 2\"), ammo haqiqiy tashqi diametr qiymatlari standartga qarab (DIN/EN yoki ASME/ANSI) bir necha millimetr farq qilishi mumkin.",
  },
  {
    question: "Nega DN65 (NPS 2½) uchun ikkita turli tashqi diametr qiymati bor?",
    answer:
      "DN65/NPS 2½ quvurning tashqi diametri DIN/EN standartida 76,1 mm, ASME/ANSI (Amerika) standartida esa 73,0 mm. Bu yaxlitlash xatosi emas, ikkita turli quvur standarti orasidagi haqiqiy farqdir; qaysi standart bo'yicha ishlayotganingizni albatta tasdiqlang.",
  },
];

export const metadata: Metadata = {
  title: "Quvur Diametri Aylantirish Hisoblash (DN - NPS - mm)",
  description:
    "Nominal quvur diametrini (DN) tanlang: NPS (dyuym) ekvivalentini va haqiqiy tashqi diametrini (mm) ko'ring. EN ISO 6708/DIN standartiga muvofiq quvur diametri jadvali.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/boru-capi-donusum-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/boru-capi-donusum-hesaplama",
    },
  },
  openGraph: {
    title: "Quvur Diametri Aylantirish Hisoblash (DN - NPS - mm)",
    description: "DN, NPS va haqiqiy tashqi diametr qiymatlarini bir-biriga aylantiring.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekPipeNominalSizePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Quvur Diametri Aylantirish Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Quvur Diametri Aylantirish Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Quvur Diametri Aylantirish Hisoblash</h1>
          <p>
            Nominal quvur diametrini (DN) tanlang: NPS (dyuym)
            ekvivalentini va haqiqiy tashqi diametrini (mm/dyuym)
            ko&apos;ring. Pastda EN ISO 6708/DIN standartiga muvofiq
            to&apos;liq quvur diametri jadvalini ham topishingiz mumkin.
          </p>
        </header>

        <PipeNominalSizeCalculatorUz />

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
            Tashqi diametr qiymatlari EN ISO 6708/DIN standartiga
            asoslangan va ikkita mustaqil manbadan o&apos;zaro
            tasdiqlangan.
          </p>
        </section>
      </div>
    </main>
  );
}
