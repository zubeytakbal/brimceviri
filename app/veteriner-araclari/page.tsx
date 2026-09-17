import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Bu sayfadaki araçlar tıbbi/veteriner tavsiye yerine geçer mi?",
    answer:
      "Hayır. Buradaki araçların hepsi genel bilgilendirme ve birim çevirme amaçlıdır; hiçbiri ilaç dozu önermez veya belirlemez. Doz-hacim hesaplayıcısı, veteriner hekim tarafından zaten belirlenmiş bir mg/kg değerini birim çevirir; klinik kararlar için her zaman bir veteriner hekime danışılmalıdır.",
  },
  {
    question: "Neden türe özel (köpek, kedi vb.) örnek doz tablosu yok?",
    answer:
      "Aynı ilaç bir türde güvenli, başka bir türde toksik olabilir. Güvenli doz aralığı ilaca, türe, yaşa ve klinik duruma göre değişir ve tek bir genel tabloyla sorumlu şekilde verilemez. Bu yüzden bu araç setinde bilinçli olarak yer almıyor.",
  },
  {
    question: "Normal vücut sıcaklığı ve kalp atış hızı neden önemlidir?",
    answer:
      "Bu değerler, bir muayenede hastanın normal fizyolojik sınırlar içinde olup olmadığını hızlıca değerlendirmek için kullanılan genel referans aralıklarıdır — teşhis veya tedavi kararı için tek başına yeterli değildir, her zaman klinik muayenenin bütünüyle birlikte değerlendirilmelidir.",
  },
];

export const metadata: Metadata = {
  title: "Veteriner Araçları: Doz-Hacim Hesaplama, Birim Dönüşümleri",
  description:
    "Veteriner hekimler için tek sayfada toplanmış araçlar: reçete edilen mg/kg dozunu mL hacme çevirme, ağırlık ve vücut sıcaklığı birim dönüşümleri.",
  alternates: {
    canonical: "/veteriner-araclari",
  },
  openGraph: {
    title: "Veteriner Araçları: Doz-Hacim Hesaplama, Birim Dönüşümleri",
    description: "Doz-hacim hesaplama, ağırlık ve sıcaklık dönüşümleri tek sayfada.",
    url: buildSiteUrl("/veteriner-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const normalVitalsTable = [
  ["Köpek", "38,3 - 39,2 °C", "60 - 140 /dk"],
  ["Kedi", "38,1 - 39,2 °C", "140 - 220 /dk"],
  ["At", "37,2 - 38,3 °C", "28 - 44 /dk"],
  ["Sığır", "38,0 - 39,3 °C", "48 - 84 /dk"],
];

export default function VeterinerAraclariPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Veteriner Araçları", item: buildSiteUrl("/veteriner-araclari") },
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
          <span>Veteriner Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Veteriner Araçları</h1>
          <p>
            Veteriner hekimlerin günlük olarak ihtiyaç duyduğu
            hesaplama araçlarını ve birim dönüşümlerini tek sayfada
            topladık: reçete edilen dozun mL hacme çevrilmesi, ağırlık
            ve vücut sıcaklığı birim dönüşümleri. Hiçbiri ilaç dozu
            önermez — doz değeri her zaman kullanıcı tarafından girilir.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>Toplam Doz</strong> = mg/kg × Ağırlık (kg)
            </li>
            <li>
              <strong>Uygulanacak Hacim</strong> = Toplam Doz ÷ Konsantrasyon (mg/mL)
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/veteriner-ilac-dozu-hesaplama">
                Veteriner İlaç Dozu ve Hacmi Hesaplama
              </Link>{" "}
              — reçete edilen mg/kg dozunu, ağırlık ve konsantrasyonla
              birlikte uygulanacak mL hacme çevir.
            </li>
            <li>
              <Link href="/kategoriler/kutle">Kütle Dönüşümleri</Link>
              {" "}— kg, gram ve pound (lb) birimleri arasında dönüşüm
              yap.
            </li>
            <li>
              <Link href="/kategoriler/sicaklik">Sıcaklık Dönüşümleri</Link>
              {" "}— hayvanın vücut sıcaklığını °C ve °F arasında çevir.
            </li>
          </ul>

          <h2>Türlere Göre Normal Vücut Sıcaklığı ve Nabız</h2>
          <p>
            Sağlıklı, dinlenme halindeki hayvanlarda yaygın olarak
            görülen genel referans aralıkları:
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Türlere göre normal vücut sıcaklığı ve nabız aralıkları</caption>
              <thead>
                <tr>
                  <th scope="col">Tür</th>
                  <th scope="col">Normal Vücut Sıcaklığı</th>
                  <th scope="col">Normal Nabız</th>
                </tr>
              </thead>
              <tbody>
                {normalVitalsTable.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, index) => (
                      <td key={`${row[0]}-${index}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Bu aralıklar genel referanstır; yaş, ırk, boyut, stres
            düzeyi ve ortam sıcaklığı gibi faktörlere göre sağlıklı
            bireylerde bile değişiklik gösterebilir. Kesin
            değerlendirme her zaman bir veteriner hekim tarafından
            yapılmalıdır.
          </p>

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
            Normal vücut sıcaklığı ve nabız aralıkları, veteriner
            hekimlik literatüründe yaygın kabul gören genel fizyolojik
            referans değerlerine dayanır.
          </p>
        </section>
      </div>
    </main>
  );
}
