import type { Metadata } from "next";
import Link from "next/link";
import ElementMeltingBoilingCalculator from "../components/ElementMeltingBoilingCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Erime ve kaynama noktası nedir?",
    answer:
      "Erime noktası, bir maddenin katı halden sıvı hale geçtiği; kaynama noktası ise sıvı halden gaz haline geçtiği sıcaklıktır. Bu değerler standart atmosfer basıncında (101,325 kPa) tanımlanır.",
  },
  {
    question: "Hangi element en yüksek erime noktasına sahiptir?",
    answer:
      "Bu tablodaki elementler arasında tungsten (3422°C), tüm metaller içinde en yüksek erime noktasına sahiptir. Bu yüzden ampul flamanı ve kaynak elektrotlarında kullanılır.",
  },
  {
    question: "Oda sıcaklığında sıvı halde bulunan tek metal hangisidir?",
    answer:
      "Cıva (Hg), -38,83°C gibi çok düşük bir erime noktasına sahip olduğu için oda sıcaklığında sıvı halde bulunan tek metaldir.",
  },
];

export const metadata: Metadata = {
  title: "Element Erime ve Kaynama Noktası Çevirici (°C, °F, K)",
  description:
    "Element seç: erime ve kaynama noktasını °C, °F ve Kelvin cinsinden aynı anda gör. 27 elementin erime/kaynama noktası tablosu dahil.",
  alternates: {
    canonical: "/erime-kaynama-noktasi-hesaplama",
  },
  openGraph: {
    title: "Element Erime ve Kaynama Noktası Çevirici (°C, °F, K)",
    description: "Element seç, erime ve kaynama noktasını üç sıcaklık biriminde gör.",
    url: buildSiteUrl("/erime-kaynama-noktasi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function ElementMeltingBoilingPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Element Erime ve Kaynama Noktası Çevirici", item: buildSiteUrl("/erime-kaynama-noktasi-hesaplama") },
    ],
  };

  return (
    <main className="all-conversions-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Element Erime ve Kaynama Noktası Çevirici</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Element Erime ve Kaynama Noktası Çevirici</h1>
          <p>
            Element seç: erime ve kaynama noktasını °C, °F ve Kelvin
            cinsinden aynı anda gör. Altta 27 elementin erime/kaynama
            noktası tablosunu da bulabilirsin.
          </p>
        </header>

        <ElementMeltingBoilingCalculator />

        <section className="category-article-content">
          <h2>Sık Sorulan Sorular</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>İlgili araçlar</h2>
          <p>
            Genel sıcaklık dönüşümleri için{" "}
            <Link href="/kategoriler/sicaklik">Sıcaklık Dönüşümleri</Link>
            {" "}sayfasına, kimya hesaplamaları için{" "}
            <Link href="/bilim-hesaplayicilari">Bilim Hesaplayıcıları</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Erime ve kaynama noktası değerleri, standart atmosfer
            basıncı (101,325 kPa) için CRC Handbook of Chemistry and
            Physics kaynaklı referans verilerine dayanır.
          </p>
        </section>
      </div>
    </main>
  );
}
