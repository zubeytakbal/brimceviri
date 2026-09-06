import type { Metadata } from "next";
import Link from "next/link";
import EmbedCodeBox from "../components/EmbedCodeBox";
import HeatingCostComparisonCalculator from "../components/HeatingCostComparisonCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Kombi mi klima mı daha ucuza ısıtır?",
    answer:
      "Bu, doğalgaz ve elektrik fiyatının oranına, kombinin verimine ve klimanın SCOP (mevsimsel performans katsayısı) değerine bağlıdır. Genel olarak yüksek SCOP'lu (3,5 üzeri) bir inverter klima, ılıman kış günlerinde doğalgaza göre daha ucuz ısıtabilir; ancak çok soğuk günlerde klimanın verimi düştüğü için kombi öne çıkabilir. Kendi rakamlarınla yukarıdaki hesaplayıcıdan kesin sonucu gör.",
  },
  {
    question: "1 m³ doğalgaz kaç kWh'e eşittir?",
    answer:
      "EPDK'nın doğalgaz faturalandırma standardına göre 1 Sm³ doğalgaz 10,64 kWh enerji içeriğine sahiptir. Bu değer faturalarda kullanılan resmi dönüşüm katsayısıdır.",
  },
  {
    question: "Klimanın SCOP değeri nedir, nereden öğrenirim?",
    answer:
      "SCOP (Seasonal Coefficient of Performance), klimanın bir ısıtma sezonu boyunca ortalama verimliliğini gösterir. Cihazın enerji etiketinde veya kullanım kılavuzunda belirtilir; A sınıfı inverter klimalarda genellikle 3,5-4 arasındadır.",
  },
];

export const metadata: Metadata = {
  title: "Kombi mi Klima mı? Isıtma Maliyeti Karşılaştırma",
  description:
    "Doğalgaz ve elektrik fiyatınla, kombi ile klimanın 1 kWh ısı başına maliyetini karşılaştır, hangisinin daha ucuz olduğunu hesapla.",
  alternates: {
    canonical: "/kombi-klima-isitma-maliyeti-karsilastirma",
  },
  openGraph: {
    title: "Kombi mi Klima mı? Isıtma Maliyeti Karşılaştırma",
    description: "Kendi rakamlarınla kombi ve klimanın ısıtma maliyetini karşılaştır.",
    url: buildSiteUrl("/kombi-klima-isitma-maliyeti-karsilastirma"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function HeatingCostComparisonPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Kombi mi Klima mı?", item: buildSiteUrl("/kombi-klima-isitma-maliyeti-karsilastirma") },
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
          <span>Kombi mi Klima mı?</span>
        </nav>

        <div className="page-top-row">
          <header className="all-conversions-header">
            <h1>Kombi mi Klima mı? Isıtma Maliyeti Karşılaştırma</h1>
            <p>
              Doğalgaz ve elektrik fiyatınla, kombi ile klimanın 1 kWh
              ısı başına maliyetini karşılaştır, kendi evin için
              hangisinin daha ucuz olduğunu gör.
            </p>
          </header>

          <EmbedCodeBox
            embedPath="/embed/kombi-klima-isitma-maliyeti-karsilastirma"
            title="Kombi mi Klima mı?"
            height={800}
            maxWidth={560}
          />
        </div>

        <HeatingCostComparisonCalculator />

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
            Yalıtım amortismanı için{" "}
            <Link href="/yalitim-amortisman-hesaplama">Yalıtım Amortisman Hesaplama</Link>
            {" "}sayfasına, ısı iletimi hesaplamaları için{" "}
            <Link href="/hesaplayicilar/isi-iletimi">Isı İletimi Hesaplayıcısı</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Doğalgaz-kWh dönüşümü EPDK&apos;nın resmi standardına
            (10,64 kWh/Sm³), kombi verimleri ve klima SCOP değerleri
            ısıtma sektöründe yaygın kabul gören tipik referans
            aralıklarına dayanır.
          </p>
        </section>
      </div>
    </main>
  );
}
