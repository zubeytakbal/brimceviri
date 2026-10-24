import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
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

const sayi = (n: number, basamak = 0) => n.toLocaleString("tr-TR", { maximumFractionDigits: basamak });

export const metadata: Metadata = {
  title: "Isınırken Doğalgaz mı Klima mı? Hangisi Daha Ucuz Hesaplama",
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
            <h1>Isınırken Doğalgaz mı Klima mı? Hangisi Daha Ucuz?</h1>
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
          <h2 id="hangisi-ucuz">Aynı ısı için ne kadar enerji ödersiniz?</h2>
          <p>
            Kombi, klima ve elektrikli soba odaya aynı ısıyı farklı miktarda enerjiyle verir. Kombi yaktığı gazın yaklaşık
            %90&apos;ını ısıya çevirir; klima ise dışarıdaki havadan ısı taşıdığı için harcadığı her kWh elektriğe karşılık
            SCOP değeri kadar ısı verir. Tablo, evin ayda 1.000 kWh ısıya ihtiyaç duyduğu bir durum için hesaplandı (1 m³
            doğalgaz = 10,64 kWh).
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Isıtıcı</th>
                  <th>Verim</th>
                  <th>1.000 kWh ısı için</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Kombi</td>
                  <td>%90</td>
                  <td>{sayi(1000 / (10.64 * 0.9))} m³ doğalgaz</td>
                </tr>
                {[2.5, 3.5, 4.5].map((scop) => (
                  <tr key={scop}>
                    <td>Klima</td>
                    <td>SCOP {sayi(scop, 1)}</td>
                    <td>{sayi(1000 / scop)} kWh elektrik</td>
                  </tr>
                ))}
                <tr>
                  <td>Elektrikli soba</td>
                  <td>%100</td>
                  <td>1.000 kWh elektrik</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="esik">Klima hangi fiyatta doğalgazdan ucuza gelir?</h2>
          <p>
            Faturalardaki iki birim fiyatı karşılaştırmak yeterli: elektriğin kWh fiyatı, doğalgazın m³ fiyatının aşağıdaki
            oranından düşükse klima daha ucuz ısıtır.
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Klimanın SCOP değeri</th>
                  <th>Klima ucuzsa: kWh fiyatı &lt; m³ fiyatı ×</th>
                </tr>
              </thead>
              <tbody>
                {[2.5, 3, 3.5, 4, 4.5].map((scop) => (
                  <tr key={scop}>
                    <td>{sayi(scop, 1)}</td>
                    <td>{sayi(scop / (10.64 * 0.9), 2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Örneğin SCOP değeri 3,5 olan bir klimada eşik {sayi(3.5 / (10.64 * 0.9), 2)}&apos;dir: doğalgazın m³ fiyatı 10 TL
            ise elektriğin kWh fiyatı {sayi((10 * 3.5) / (10.64 * 0.9), 2)} TL&apos;nin altındaysa klima kazanır. Elektrikli
            soba ise kombiyle ancak elektrik kWh fiyatı m³ fiyatının yaklaşık onda biri olduğunda eşitlenir, bu yüzden
            pratikte neredeyse her zaman en pahalısıdır. Klima yalnızca bulunduğu odayı ısıtır; tüm evi kombiyle
            karşılaştırırken aynı alanı hesaba katın.
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
            Isı pompasını kombiyle karşılaştırmak için{" "}
            <Link href="/isi-pompasi-kombi-karsilastirma">Isı Pompası mı Kombi mi?</Link>
            {" "}sayfasına, yalıtım amortismanı için{" "}
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
