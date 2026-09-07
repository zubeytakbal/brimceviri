import type { Metadata } from "next";
import Link from "next/link";
import EmbedCodeBox from "../components/EmbedCodeBox";
import LpgConversionPaybackCalculator from "../components/LpgConversionPaybackCalculator";
import { getNationalGasolinePrice, getNationalLpgPrice } from "../converter/liveFuelPrice";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "LPG dönüşümü kaç yılda kendini çıkarır?",
    answer:
      "Bu, yıllık kaç km yaptığına, aracının benzin tüketimine, LPG'de tüketim artışına, güncel benzin/LPG fiyatına ve dönüşüm sisteminin maliyetine bağlıdır. Yukarıdaki hesaplayıcıya kendi rakamlarını girerek kaç yılda (ve kaç kilometrede) amorti olduğunu görebilirsin.",
  },
  {
    question: "LPG'de yakıt tüketimi neden artıyor?",
    answer:
      "LPG'nin enerji yoğunluğu benzinden daha düşük olduğu için, aynı mesafeyi gitmek için litre bazında daha fazla yakıt tüketilir. Piyasa deneyimlerine göre bu artış genellikle %20-25 aralığındadır; aracın motor tipi ve montaj kalitesi bu oranı etkiler.",
  },
  {
    question: "LPG dönüşümünün ek maliyetleri var mı?",
    answer:
      "Evet, dönüşüm sisteminin ilk kurulum maliyetinin yanında, yılda ortalama 2.000-4.000 TL arasında periyodik bakım/ayar gideri de oluşur. Hesaplayıcı bu bakım maliyetini de yıllık tasarrufa dahil eder.",
  },
];

export const metadata: Metadata = {
  title: "LPG Dönüşüm Amortisman Hesaplama",
  description:
    "Kendi yıllık kilometren, aracının tüketimi ve dönüşüm maliyetinle, LPG dönüşümünün kaç yılda (kaç km'de) kendini çıkardığını hesapla.",
  alternates: {
    canonical: "/lpg-donusum-amortisman-hesaplama",
  },
  openGraph: {
    title: "LPG Dönüşüm Amortisman Hesaplama",
    description: "Kendi rakamlarınla LPG dönüşümünün kaç yılda kendini çıkardığını hesapla.",
    url: buildSiteUrl("/lpg-donusum-amortisman-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default async function LpgConversionPaybackPage() {
  const [liveGasolinePrice, liveLpgPrice] = await Promise.all([
    getNationalGasolinePrice(),
    getNationalLpgPrice(),
  ]);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "LPG Dönüşüm Amortisman Hesaplama", item: buildSiteUrl("/lpg-donusum-amortisman-hesaplama") },
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
          <span>LPG Dönüşüm Amortisman Hesaplama</span>
        </nav>

        <div className="page-top-row">
          <header className="all-conversions-header">
            <h1>LPG Dönüşüm Amortisman Hesaplama</h1>
            <p>
              Kendi yıllık kilometren, aracının tüketimi ve dönüşüm
              maliyetinle, LPG dönüşümünün kaç yılda (ve kaç
              kilometrede) kendini çıkardığını hesapla.
            </p>
          </header>

          <EmbedCodeBox
            embedPath="/embed/lpg-donusum-amortisman-hesaplama"
            title="LPG Dönüşüm Amortisman Hesaplama"
            height={860}
            maxWidth={560}
          />
        </div>

        <LpgConversionPaybackCalculator
          liveGasolinePrice={liveGasolinePrice}
          liveLpgPrice={liveLpgPrice}
        />

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
            {" "}sayfasına, elektrikli araç karşılaştırması için{" "}
            <Link href="/elektrikli-arac-maliyet-karsilastirma">
              Elektrikli Araç mı Benzinli Araç mı?
            </Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Tüketim artışı ve dönüşüm maliyeti varsayılanları, 2026
            yılına ait genel piyasa aralıklarından türetilmiştir;
            kesin sonuç için kendi aracının/servisinin verdiği
            rakamları kullanman önerilir. Benzin ve LPG fiyatları
            mümkün olduğunda güncel ulusal referans fiyatıyla otomatik
            doldurulur.
          </p>
        </section>
      </div>
    </main>
  );
}
