import type { Metadata } from "next";
import Link from "next/link";
import EmbedCodeBox from "../components/EmbedCodeBox";
import HeatPumpVsBoilerCalculator from "../components/HeatPumpVsBoilerCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Isı pompası mı kombi mi daha ucuz?",
    answer:
      "Bu, doğalgaz ve elektrik fiyatlarının oranına, ısı pompasının COP değerine ve kombinin verimine bağlıdır. Genellikle COP değeri 3'ün üzerindeki ısı pompaları, işletme maliyeti açısından kombiden daha ucuza gelir; ancak kurulum maliyeti daha yüksektir. Yukarıdaki hesaplayıcıya kendi rakamlarını girerek net sonucu görebilirsin.",
  },
  {
    question: "Isı pompasının kurulum maliyeti kaç yılda kendini çıkarır?",
    answer:
      "Isı pompası ile kombi arasındaki kurulum maliyeti farkını, yıllık işletme tasarrufuna bölerek amortisman süresini hesaplayabilirsin. Bu süre; ev büyüklüğüne, yalıtıma, elektrik/doğalgaz fiyat oranına ve seçilen sistemin COP değerine göre değişir.",
  },
  {
    question: "Isı pompasının COP değeri neden değişir?",
    answer:
      "COP (Performans Katsayısı), dış hava sıcaklığı düştükçe azalır — çok soğuk günlerde ısı pompası daha az verimli çalışır. Hesaplayıcıdaki COP değeri sezonluk bir ortalamayı temsil eder, cihazın enerji etiketindeki mevsimsel (SCOP) değeri kullanman daha doğru sonuç verir.",
  },
];

export const metadata: Metadata = {
  title: "Isı Pompası mı Kombi mi? Maliyet Karşılaştırma",
  description:
    "Kendi doğalgaz/elektrik fiyatın, ısı ihtiyacın ve kurulum maliyeti farkınla ısı pompasının kombiye göre kaç yılda kendini çıkardığını hesapla.",
  alternates: {
    canonical: "/isi-pompasi-kombi-karsilastirma",
  },
  openGraph: {
    title: "Isı Pompası mı Kombi mi? Maliyet Karşılaştırma",
    description: "Kendi rakamlarınla ısı pompasının kombiye göre kaç yılda kendini çıkardığını hesapla.",
    url: buildSiteUrl("/isi-pompasi-kombi-karsilastirma"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function HeatPumpVsBoilerPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Isı Pompası mı Kombi mi?", item: buildSiteUrl("/isi-pompasi-kombi-karsilastirma") },
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
          <span>Isı Pompası mı Kombi mi?</span>
        </nav>

        <div className="page-top-row">
          <header className="all-conversions-header">
            <h1>Isı Pompası mı Kombi mi? Maliyet Karşılaştırma</h1>
            <p>
              Kendi doğalgaz/elektrik fiyatın, yıllık ısı ihtiyacın ve
              kurulum maliyeti farkınla, ısı pompasının kombiye göre
              kaç yılda kendini çıkardığını hesapla.
            </p>
          </header>

          <EmbedCodeBox
            embedPath="/embed/isi-pompasi-kombi-karsilastirma"
            title="Isı Pompası mı Kombi mi?"
            height={900}
            maxWidth={560}
          />
        </div>

        <HeatPumpVsBoilerCalculator />

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
            Klima ile kombiyi karşılaştırmak için{" "}
            <Link href="/kombi-klima-isitma-maliyeti-karsilastirma">
              Kombi mi Klima mı?
            </Link>
            {" "}sayfasına, yalıtım yatırımının amortismanı için{" "}
            <Link href="/yalitim-amortisman-hesaplama">
              Yalıtım Amortisman Hesaplama
            </Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Doğalgaz-kWh dönüşümü EPDK&apos;nın resmi standart değerine
            dayanır. Isı pompası COP aralığı ve kombi verimi
            değerleri, sektörde yaygın kabul gören genel referans
            aralıklarıdır; kesin sonuç için kendi cihazının teknik
            özelliklerini kullanman önerilir.
          </p>
        </section>
      </div>
    </main>
  );
}
