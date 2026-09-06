import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "1 torba çimento kaç kg'dır?",
    answer:
      "Beton Hesaplama aracımızda kullandığımız standart çimento torbası 25 kg'dır. Bazı piyasa ürünlerinde bu değer değişebilir; kullandığın ürünün etiketindeki gerçek ağırlığı esas al.",
  },
  {
    question: "Boya kutuları hangi hacimlerde satılır?",
    answer:
      "Türkiye'de en yaygın iç cephe boya kutu hacimleri 2,5 litre, 7,5 litre ve 15 litredir. Boya Hesaplama aracımız gereken litreyi bu üç kutu boyutuna göre en verimli kombinasyona böler.",
  },
  {
    question: "Fayans/seramik hangi ebatlarda bulunur?",
    answer:
      "Piyasada en yaygın bulunan fayans/seramik ebatları 20x20, 30x30, 30x60, 60x60 ve 60x120 cm'dir. Fayans Hesaplama aracına kaplanacak alanı ve seçtiğin ebadı girerek fire payı dahil gereken adedi hesaplayabilirsin.",
  },
];

export const metadata: Metadata = {
  title: "İnşaatçı Araçları: Boya, Fayans, Tuğla, Beton Hesaplama",
  description:
    "İnşaatçı, usta ve müteahhitler için tek sayfada toplanmış araçlar: boya, fayans, tuğla, beton, sıva ve merdiven hesaplama, malzeme torba ağırlığı ve ebat referans tabloları.",
  alternates: {
    canonical: "/insaatci-araclari",
  },
  openGraph: {
    title: "İnşaatçı Araçları: Boya, Fayans, Tuğla, Beton Hesaplama",
    description:
      "Boya, fayans, tuğla, beton, sıva ve merdiven hesaplama araçları ve malzeme referans tabloları tek sayfada.",
    url: buildSiteUrl("/insaatci-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const bagWeightTable = [
  ["Çimento", "25 kg", "Beton, çimento esaslı sıva"],
  ["Alçı", "30 kg", "Alçı sıva"],
];

const paintCanTable = [
  ["2,5 L", "Küçük alanlar, rötuş"],
  ["7,5 L", "Orta büyüklükte oda"],
  ["15 L", "Büyük alan, çok odalı işler"],
];

const tileSizeTable = [
  ["20 × 20 cm", "Küçük alan, banyo, mutfak"],
  ["30 × 30 cm", "Standart zemin/duvar"],
  ["30 × 60 cm", "Duvar ve zemin, yaygın tercih"],
  ["60 × 60 cm", "Geniş alan, salon"],
  ["60 × 120 cm", "Büyük format, modern uygulamalar"],
];

const doorSizeTable = [
  ["Oda Kapısı (iç mekân)", "80-90 cm", "200-210 cm"],
  ["Banyo/WC Kapısı", "70-80 cm", "200-210 cm"],
  ["Giriş Kapısı (dış mekân)", "90-100 cm", "200-210 cm"],
  ["Balkon/Teras Kapısı", "80-100 cm", "200-210 cm"],
];

export default function InsaatciAraclariPage() {
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
        name: "Mesleğe Göre Araçlar",
        item: buildSiteUrl("/meslekler"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "İnşaatçı Araçları",
        item: buildSiteUrl("/insaatci-araclari"),
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
          <Link href="/meslekler">Mesleğe Göre Araçlar</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>İnşaatçı Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>İnşaatçı Araçları</h1>
          <p>
            İnşaatçı, usta ve müteahhitlerin saha işlerinde kullandığı
            hesaplama araçlarını ve referans bilgileri tek sayfada
            topladık: boya, fayans, tuğla, beton, sıva, merdiven
            hesaplama ve malzeme torba ağırlığı/ebat tabloları.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>1 torba çimento</strong> = 25 kg
            </li>
            <li>
              <strong>Boya kutuları</strong>: 2,5 / 7,5 / 15 L
            </li>
            <li>
              <strong>Yaygın fayans ebadı</strong>: 60 × 60 cm
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/boya-hesaplama">Boya Hesaplama</Link> — oda
              ölçülerinden net duvar alanını ve gereken boya litresini
              hesapla.
            </li>
            <li>
              <Link href="/fayans-hesaplama">Fayans Hesaplama</Link> —
              kaplanacak alan ve fayans ebadından fire payı dahil
              gereken adedi hesapla.
            </li>
            <li>
              <Link href="/tugla-hesaplama">Tuğla Hesaplama</Link> —
              duvar alanı ve tuğla ölçüsünden gereken tuğla adedini
              hesapla.
            </li>
            <li>
              <Link href="/beton-hesaplama">Beton Hesaplama</Link> —
              temel, döşeme veya kolon için gereken beton hacmini,
              çimento torba sayısını, kum ve çakıl miktarını hesapla.
            </li>
            <li>
              <Link href="/siva-hesaplama">Sıva Hesaplama</Link> —
              sıvanacak alan ve kalınlığa göre gereken alçı veya çimento
              esaslı sıva miktarını hesapla.
            </li>
            <li>
              <Link href="/merdiven-hesaplama">Merdiven Hesaplama</Link>
              {" "}— toplam yükseklik ve rıht yüksekliğine göre basamak
              sayısını ve derinliğini hesapla.
            </li>
            <li>
              <Link href="/duvar-kagidi-hesaplama">Duvar Kağıdı Hesaplama</Link>
              {" "}·{" "}
              <Link href="/parke-hesaplama">Parke (Laminat) Hesaplama</Link>
            </li>
            <li>
              <Link href="/hafriyat-hesaplama">Hafriyat ve Kazı Hesaplama</Link>
              {" "}— kazı hacmini, gevşeme payı eklenmiş hacmi ve gereken
              kamyon yükü sayısını hesapla.
            </li>
            <li>
              <Link href="/mantolama-hesaplama">Mantolama Hesaplama</Link>
              {" "}— dış cephe alanından, fire payı dahil gereken yalıtım
              levhası adedini hesapla.
            </li>
            <li>
              <Link href="/kategoriler/uzunluk">Uzunluk</Link> ·{" "}
              <Link href="/kategoriler/alan">Alan</Link> ·{" "}
              <Link href="/kategoriler/hacim">Hacim</Link> birim
              dönüşümleri
            </li>
            <li>
              <Link href="/isil-genlesme-hesaplama">Isıl Genleşme Hesaplama</Link>
              {" "}— bina elemanlarının sıcaklık farkına göre uzama/kısalma
              miktarını hesapla.
            </li>
            <li>
              <Link href="/elastik-uzama-hesaplama">Elastik Uzama Hesaplama</Link>
              {" "}— Hooke Yasası ile yük altındaki bir elemanın elastik
              uzamasını hesapla.
            </li>
            <li>
              <Link href="/hesaplayicilar/isi-iletimi">Isı İletimi Hesaplayıcısı</Link>
              {" "}— cam yünü, taş yünü, XPS, EPS ve poliüretan köpük dahil
              yalıtım malzemelerinin ısıl iletkenlik değerleriyle ısı
              kaybını hesapla.
            </li>
            <li>
              <Link href="/yalitim-amortisman-hesaplama">Yalıtım Amortisman Hesaplama</Link>
              {" "}— duvar yalıtımının kaç yılda kendini çıkardığını
              yıllık enerji tasarrufu üzerinden hesapla.
            </li>
          </ul>

          <h2>Malzeme Torba Ağırlıkları</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Yaygın inşaat malzemesi torba ağırlıkları</caption>
              <thead>
                <tr>
                  <th scope="col">Malzeme</th>
                  <th scope="col">Standart Torba Ağırlığı</th>
                  <th scope="col">Kullanım Alanı</th>
                </tr>
              </thead>
              <tbody>
                {bagWeightTable.map((row) => (
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
            Bu değerler hesaplayıcılarımızda varsayılan olarak
            kullandığımız yaygın piyasa ağırlıklarıdır; kullandığın
            ürünün etiketindeki gerçek ağırlık farklıysa hesaplayıcıdaki
            ilgili alanı güncelleyebilirsin.
          </p>

          <h2>Yaygın Boya Kutu Hacimleri</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Yaygın iç cephe boya kutu hacimleri</caption>
              <thead>
                <tr>
                  <th scope="col">Hacim</th>
                  <th scope="col">Tipik Kullanım</th>
                </tr>
              </thead>
              <tbody>
                {paintCanTable.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, index) => (
                      <td key={`${row[0]}-${index}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Yaygın Fayans/Seramik Ebatları</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Piyasada yaygın bulunan fayans/seramik ebatları</caption>
              <thead>
                <tr>
                  <th scope="col">Ebat</th>
                  <th scope="col">Tipik Kullanım</th>
                </tr>
              </thead>
              <tbody>
                {tileSizeTable.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, index) => (
                      <td key={`${row[0]}-${index}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Standart Kapı Ölçüleri</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Yaygın kullanılan standart kapı ölçüleri</caption>
              <thead>
                <tr>
                  <th scope="col">Kapı Tipi</th>
                  <th scope="col">Genişlik</th>
                  <th scope="col">Yükseklik</th>
                </tr>
              </thead>
              <tbody>
                {doorSizeTable.map((row) => (
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
            Bunlar piyasada en sık karşılaşılan aralıklardır; kesin
            ölçü, kapı üreticisine ve mimari projeye göre değişir.
            Pencere ölçüleri ise doğrama/cephe tasarımına göre büyük
            ölçüde değiştiğinden burada sabit bir tablo verilmemiştir —
            pencere ölçüsü her zaman mimari projeden alınmalıdır.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>1 torba çimento kaç kg&apos;dır?</strong>
            <br />
            Beton Hesaplama aracımızda kullandığımız standart çimento
            torbası 25 kg&apos;dır. Bazı piyasa ürünlerinde bu değer
            değişebilir; kullandığın ürünün etiketindeki gerçek ağırlığı
            esas al.
          </p>
          <p>
            <strong>Boya kutuları hangi hacimlerde satılır?</strong>
            <br />
            Türkiye&apos;de en yaygın iç cephe boya kutu hacimleri 2,5
            litre, 7,5 litre ve 15 litredir.{" "}
            <Link href="/boya-hesaplama">Boya Hesaplama</Link> aracımız
            gereken litreyi bu üç kutu boyutuna göre en verimli
            kombinasyona böler.
          </p>
          <p>
            <strong>Fayans/seramik hangi ebatlarda bulunur?</strong>
            <br />
            Piyasada en yaygın bulunan fayans/seramik ebatları 20x20,
            30x30, 30x60, 60x60 ve 60x120 cm&apos;dir.{" "}
            <Link href="/fayans-hesaplama">Fayans Hesaplama</Link>{" "}
            aracına kaplanacak alanı ve seçtiğin ebadı girerek fire
            payı dahil gereken adedi hesaplayabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Torba ağırlıkları ve ebat bilgileri, Türkiye piyasasında
            yaygın kullanılan ürün standartlarına dayanmaktadır. Yapısal
            (taşıyıcı) beton, statik hesap ve yönetmelik uyumluluğu
            gerektiren işlerde her zaman bir inşaat mühendisi veya
            mimarla çalışılmalıdır — bu sayfa yalnızca ön çalışma ve
            referans amaçlıdır.
          </p>
        </section>
      </div>
    </main>
  );
}
