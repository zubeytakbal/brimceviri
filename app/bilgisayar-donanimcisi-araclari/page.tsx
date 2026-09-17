import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Bu araç bana kesin PSU modelini önerir mi?",
    answer:
      "Hayır. Bu araç yalnızca önerilen wattaj aralığını hesaplar; hangi PSU modelinin (verimlilik sertifikası, konnektör tipi, marka) uygun olduğunu belirlemez.",
  },
  {
    question: "80 Plus sertifikası nedir ve neden önemlidir?",
    answer:
      "80 Plus, bir güç kaynağının AC'den DC'ye dönüştürme verimliliğini ölçen bağımsız bir sertifika programıdır. White (temel), Bronze, Silver, Gold, Platinum ve Titanium kademeleri vardır — üst kademeye çıktıkça verimlilik artar, yani aynı güçte daha az elektrik israf edilir (daha az ısı, daha düşük fatura, genellikle daha sessiz fan).",
  },
  {
    question: "PSU neden %100 yükte değil, %40-60 yükte en verimlidir?",
    answer:
      "Çoğu güç kaynağının verimlilik eğrisi, tam yükte (%100) değil orta yükte (genellikle %40-60 arası) tepe noktasına ulaşır; hem çok düşük hem çok yüksek yükte verimlilik düşer. Bu yüzden sistemin gerçek tüketiminin, PSU'nun toplam kapasitesinin yaklaşık yarısı civarında olması (yani PSU'yu sistem ihtiyacının 1,7-2 katı seçmek) hem verimlilik hem de gelecekteki yükseltmeler için güvenlik payı açısından yaygın bir öneridir.",
  },
];

export const metadata: Metadata = {
  title: "Bilgisayar Donanımcısı Araçları: PSU Güç Hesaplama",
  description:
    "Bilgisayar donanımcıları için tek sayfada toplanmış araçlar: CPU/GPU gücünden PSU (güç kaynağı) wattajı hesaplama, veri depolama dönüşümleri.",
  alternates: {
    canonical: "/bilgisayar-donanimcisi-araclari",
  },
  openGraph: {
    title: "Bilgisayar Donanımcısı Araçları: PSU Güç Hesaplama",
    description: "PSU güç hesaplama tek sayfada.",
    url: buildSiteUrl("/bilgisayar-donanimcisi-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const efficiencyTable = [
  ["80 Plus (White)", "%80 / %80 / %80"],
  ["80 Plus Bronze", "%82 / %85 / %82"],
  ["80 Plus Silver", "%85 / %88 / %85"],
  ["80 Plus Gold", "%87 / %90 / %87"],
  ["80 Plus Platinum", "%90 / %92 / %89"],
  ["80 Plus Titanium", "%90 / %94 / %91"],
];

export default function BilgisayarDonanimcisiAraclariPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Bilgisayar Donanımcısı Araçları", item: buildSiteUrl("/bilgisayar-donanimcisi-araclari") },
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
          <Link href="/meslekler">Mesleğe Göre Araçlar</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Bilgisayar Donanımcısı Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Bilgisayar Donanımcısı Araçları</h1>
          <p>
            Bilgisayar donanımcılarının sistem kurarken ihtiyaç
            duyduğu hesaplama araçlarını tek sayfada topladık: CPU/GPU
            gücünden PSU wattajı hesaplama, veri depolama birimi
            dönüşümleri.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>Önerilen Güvenlik Payı</strong>: %20-30
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/psu-guc-hesaplama">PSU Güç Kaynağı Hesaplama</Link>
              {" "}— CPU, GPU ve diğer bileşenlerin gücünden önerilen
              PSU wattajını hesapla.
            </li>
            <li>
              <Link href="/kategoriler/veri">Veri Depolama Dönüşümleri</Link>
              {" "}— bayt, KB, MB, GB, TB birimleri arasında dönüşüm
              yap.
            </li>
            <li>
              <Link href="/ping-gecikme-hesaplama">Ping / Gecikme Hesaplama</Link>
              {" "}— iki konum arasındaki mesafeye göre fiziksel olarak
              mümkün olan en düşük ping süresini hesapla.
            </li>
          </ul>

          <h2>80 Plus Verimlilik Sertifikası Kademeleri</h2>
          <p>
            80 Plus programının, PSU&apos;nun %20 / %50 / %100 yük
            noktalarında sağlaması gereken minimum verimlilik yüzdeleri
            (115V, redundant olmayan tip):
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>80 Plus sertifika kademeleri ve minimum verimlilik yüzdeleri (%20/%50/%100 yükte)</caption>
              <thead>
                <tr>
                  <th scope="col">Sertifika Kademesi</th>
                  <th scope="col">Min. Verimlilik (%20/%50/%100 yük)</th>
                </tr>
              </thead>
              <tbody>
                {efficiencyTable.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, index) => (
                      <td key={`${row[0]}-${index}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Sık Sorulan Sorular</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>Kaynaklar</h2>
          <p>
            80 Plus verimlilik yüzdeleri, 80 PLUS sertifika programının
            (CLEAResult tarafından yönetilen) yayınladığı resmi test
            kriterlerine dayanır.
          </p>
        </section>
      </div>
    </main>
  );
}
