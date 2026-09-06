import type { Metadata } from "next";
import Link from "next/link";
import WeightBalanceCalculator from "../components/WeightBalanceCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Ağırlık merkezi (CG) nasıl hesaplanır?",
    answer:
      "Her kalemin momenti (ağırlık × kol) bulunur, tüm momentler toplanır ve toplam ağırlığa bölünür: CG = Toplam Moment / Toplam Ağırlık. Kol (arm), aracın referans noktasına (datum) olan mesafedir.",
  },
  {
    question: "Bu araç uçağımın CG limitlerini biliyor mu?",
    answer:
      "Hayır. Her aracın boş ağırlığı ve kol değerleri, kayıt numarasına (tail number) özel donanıma göre değişir — bu yüzden bu araç hiçbir uçağa özel veri varsaymaz, sadece senin girdiğin sayılarla matematiği yapar. Hesaplanan CG'nin güvenli aralıkta olup olmadığını her zaman kendi aracının POH/AFM belgesindeki CG zarfıyla karşılaştırmalısın.",
  },
];

export const metadata: Metadata = {
  title: "Ağırlık ve Denge Hesaplama (Weight and Balance)",
  description:
    "Yük kalemlerinin ağırlığını ve kolunu (arm) gir; toplam ağırlığı, toplam momenti ve ağırlık merkezini (CG) hesapla.",
  alternates: {
    canonical: "/agirlik-denge-hesaplama",
  },
  openGraph: {
    title: "Ağırlık ve Denge Hesaplama (Weight and Balance)",
    description:
      "Yük kalemlerinden toplam ağırlığı ve ağırlık merkezini (CG) hesaplayın.",
    url: buildSiteUrl("/agirlik-denge-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function WeightBalanceCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: buildSiteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Ağırlık ve Denge Hesaplama",
        item: buildSiteUrl("/agirlik-denge-hesaplama"),
      },
    ],
  };

  return (
    <main className="all-conversions-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(buildFaqSchema(faqItems)),
        }}
      />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Ağırlık ve Denge Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Ağırlık ve Denge Hesaplama</h1>
          <p>
            Her yük kaleminin (boş araç, yolcu, bagaj, yakıt) ağırlığını
            ve kolunu (referans noktasına mesafesi) gir: toplam
            ağırlığı, toplam momenti ve ağırlık merkezini (CG) anında
            hesapla.
          </p>
        </header>

        <WeightBalanceCalculator />

        <section className="category-article-content">
          <h2>Ağırlık merkezi (CG) nasıl hesaplanır?</h2>
          <p>
            Her kalemin momenti bulunur:{" "}
            <strong>Moment = Ağırlık × Kol (Arm)</strong>. Tüm
            kalemlerin ağırlıkları ve momentleri ayrı ayrı toplanır,
            ardından ağırlık merkezi bulunur:{" "}
            <strong>CG = Toplam Moment / Toplam Ağırlık</strong>. Kol
            (arm), aracın üreticinin belirlediği referans noktasına
            (datum) olan mesafedir ve POH/AFM belgesinde kalem başına
            verilir.
          </p>
          <p>
            <strong>Yakıt yoğunluğu referansı:</strong> Avgas (100LL)
            yaklaşık 0,72 kg/L (6 lb/US galon), jet yakıtı (Jet A-1)
            yaklaşık 0,80-0,82 kg/L (6,7-6,8 lb/US galon) yoğunluğa
            sahiptir — yakıt ağırlığını hacimden hesaplarken bu
            değerleri kullanabilirsin. Kesin değer sıcaklığa göre
            hafifçe değişir.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>Bu araç uçağımın CG limitlerini biliyor mu?</strong>
            <br />
            Hayır. Her aracın boş ağırlığı ve kol değerleri, kayıt
            numarasına (tail number) özel donanıma göre değişir — bu
            yüzden bu araç hiçbir uçağa özel veri varsaymaz, sadece
            senin girdiğin sayılarla matematiği yapar. Hesaplanan
            CG&apos;nin güvenli aralıkta olup olmadığını her zaman
            kendi aracının POH/AFM belgesindeki CG zarfıyla
            karşılaştırmalısın.
          </p>

          <h2>İlgili araçlar</h2>
          <p>
            Diğer pilot araçları için{" "}
            <Link href="/pilot-araclari">Pilot Araçları</Link> sayfasına
            bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Moment/CG formülü, uçuş eğitiminde standart kullanılan
            temel ağırlık ve denge hesabına dayanmaktadır. Bu araç
            genel bilgilendirme ve ön çalışma amaçlıdır; gerçek uçuş
            kararı için aracın kendi POH/AFM belgesi esas alınmalıdır.
          </p>
        </section>
      </div>
    </main>
  );
}
