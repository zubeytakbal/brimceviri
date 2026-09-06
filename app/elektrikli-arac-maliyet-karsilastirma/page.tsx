import type { Metadata } from "next";
import Link from "next/link";
import EmbedCodeBox from "../components/EmbedCodeBox";
import EvVsIceComparisonCalculator from "../components/EvVsIceComparisonCalculator";
import { getNationalGasolinePrice } from "../converter/liveFuelPrice";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Elektrikli araç fiyat farkını kaç yılda çıkarır?",
    answer:
      "Bu, yıllık kaç km yaptığına, benzinli ve elektrikli aracın tüketimine, bölgendeki yakıt/elektrik fiyatına ve iki araç arasındaki fiyat farkına bağlıdır. Yukarıdaki hesaplayıcıya kendi rakamlarını girerek kaç yılda (ve kaç kilometrede) fiyat farkının kapandığını görebilirsin.",
  },
  {
    question: "Elektrikli araç şarjı benzinden ne kadar daha ucuz?",
    answer:
      "Ortalama olarak bir elektrikli araç 100 km'de yaklaşık 18 kWh, benzinli bir araç ise yaklaşık 7,5 litre benzin tüketir. Güncel fiyatlarla karşılaştırıldığında, elektrikli araçların 100 km başına enerji maliyeti genellikle benzinli araçların altında kalır; kesin fark bölgene ve tarife dilimine göre değişir.",
  },
  {
    question: "Bu hesaplama bakım ve sigorta maliyetlerini kapsıyor mu?",
    answer:
      "Hayır, bu araç yalnızca yakıt/elektrik maliyeti karşılaştırmasına odaklanır. Bakım, sigorta, batarya ömrü ve ikinci el değeri gibi faktörler hesaba dahil değildir; kapsamlı bir karar için bunları da ayrıca değerlendirmelisin.",
  },
];

export const metadata: Metadata = {
  title: "Elektrikli Araç mı Benzinli Araç mı? Maliyet Karşılaştırma",
  description:
    "Kendi yıllık kilometren, tüketim ve fiyat farkınla elektrikli aracın benzinliye göre kaç yılda (kaç km'de) kendini amorti ettiğini hesapla.",
  alternates: {
    canonical: "/elektrikli-arac-maliyet-karsilastirma",
  },
  openGraph: {
    title: "Elektrikli Araç mı Benzinli Araç mı? Maliyet Karşılaştırma",
    description: "Kendi rakamlarınla elektrikli aracın kaç yılda kendini amorti ettiğini hesapla.",
    url: buildSiteUrl("/elektrikli-arac-maliyet-karsilastirma"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default async function EvVsIceComparisonPage() {
  const liveGasolinePrice = await getNationalGasolinePrice();
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Elektrikli Araç mı Benzinli Araç mı?", item: buildSiteUrl("/elektrikli-arac-maliyet-karsilastirma") },
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
          <span>Elektrikli Araç mı Benzinli Araç mı?</span>
        </nav>

        <div className="page-top-row">
          <header className="all-conversions-header">
            <h1>Elektrikli Araç mı Benzinli Araç mı? Maliyet Karşılaştırma</h1>
            <p>
              Kendi yıllık kilometren, araçların tüketimi ve aralarındaki
              fiyat farkıyla, elektrikli aracın benzinliye göre kaç
              yılda (ve kaç kilometrede) kendini amorti ettiğini hesapla.
            </p>
          </header>

          <EmbedCodeBox
            embedPath="/embed/elektrikli-arac-maliyet-karsilastirma"
            title="Elektrikli Araç mı Benzinli Araç mı?"
            height={820}
            maxWidth={560}
          />
        </div>

        <EvVsIceComparisonCalculator liveGasolinePrice={liveGasolinePrice} />

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
            Mevcut aracının yakıt tüketimini hesaplamak için{" "}
            <Link href="/yakit-tuketimi-hesaplama">Yakıt Tüketimi Hesaplama</Link>
            {" "}sayfasına, diğer otomotiv araçları için{" "}
            <Link href="/otomotiv-araclari">Otomotiv Araçları</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Varsayılan tüketim ve fiyat değerleri, güncel Türkiye
            ortalamalarına dayanan referans rakamlardır; kesin sonuç
            için kendi aracının tüketimini ve bölgendeki güncel
            fiyatları girmen önerilir.
          </p>
        </section>
      </div>
    </main>
  );
}
