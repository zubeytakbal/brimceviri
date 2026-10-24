import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
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

const ISI_IHTIYACI = [5000, 8000, 10000, 15000, 20000];
const sayi = (n: number, basamak = 0) => n.toLocaleString("tr-TR", { maximumFractionDigits: basamak });

export const metadata: Metadata = {
  title: "Isı Pompası mı Kombi mi? Hangisi Ucuz, Kaç Yılda Çıkarır?",
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
            <h1>Isı Pompası mı Kombi mi? Hangisi Daha Ucuz Isıtır?</h1>
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
          <h2 id="yillik">Bir kışta kaç m³ doğalgaz, kaç kWh elektrik?</h2>
          <p>
            Isı pompası ile kombinin farkı, aynı yıllık ısı ihtiyacını hangi enerjiyle karşıladığıdır. Aşağıdaki tablo evin
            yıllık ısı ihtiyacına göre iki sistemin harcadığı enerjiyi gösterir; kombi verimi %90, havadan suya ısı
            pompasının mevsimsel verimi (SCOP) 3,5 alındı. Yıllık ısı ihtiyacınızı geçen kışın doğalgaz faturalarından
            bulabilirsiniz: toplam m³ × 10,64 × 0,9.
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Yıllık ısı ihtiyacı</th>
                  <th>Kombi</th>
                  <th>Isı pompası (SCOP 3,5)</th>
                </tr>
              </thead>
              <tbody>
                {ISI_IHTIYACI.map((q) => (
                  <tr key={q}>
                    <td>{sayi(q)} kWh</td>
                    <td>{sayi(q / (10.64 * 0.9))} m³</td>
                    <td>{sayi(q / 3.5)} kWh</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Tablo enerji miktarını verir; hangisinin ucuz olduğunu iki fiyat belirler. Yıllık 10.000 kWh ısı isteyen bir evde
            kombi {sayi(10000 / (10.64 * 0.9))} m³ gaz, ısı pompası {sayi(10000 / 3.5)} kWh elektrik harcar. Bu iki miktarı
            faturanızdaki birim fiyatlarla çarpınca yıllık işletme farkı çıkar; kurulum fiyat farkını bu yıllık farka
            bölmek de sistemin kaç yılda kendini çıkaracağını gösterir. Isı pompasının verimi dış hava soğudukça düşer, bu
            yüzden çok soğuk bölgelerde SCOP değerini düşük girmek daha gerçekçidir.
          </p>

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
