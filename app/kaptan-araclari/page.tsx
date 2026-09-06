import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "GT (Gros Tonaj) ile DWT (Ölü Ağırlık Tonajı) arasındaki fark nedir?",
    answer:
      "GT (Gross Tonnage), geminin kapalı iç hacmini ifade eden hacimsel bir ölçüdür; bir ağırlık birimi değildir. DWT (Deadweight Tonnage) ise geminin taşıyabileceği toplam ağırlığı (kargo, yakıt, su, mürettebat dahil) ifade eder. Bir gemi tarifesinde/limanda GT genellikle liman ücretleri ve tescil için, DWT ise kargo taşıma kapasitesini karşılaştırmak için kullanılır.",
  },
  {
    question: "NT (Net Tonaj) nedir?",
    answer:
      "NT (Net Tonnage), geminin yolcu ve kargo taşımaya ayrılan kullanılabilir hacmini ifade eder; GT'den makine dairesi, mürettebat mahalli gibi ticari olmayan alanlar çıkarılarak hesaplanır. Liman ve kanal geçiş ücretleri sıklıkla NT'ye göre belirlenir.",
  },
  {
    question: "Neden denizcilikte km yerine deniz mili kullanılır?",
    answer:
      "Deniz mili, Dünya üzerindeki enlem dairesinin 1 dakikalık yayına eşit olacak şekilde tanımlanmıştır; bu da onu harita ve pusula koordinatlarıyla (enlem/boylam dakikası) doğrudan uyumlu, seyir için pratik bir birim yapar.",
  },
  {
    question: "Beaufort (Bofor) skalası nedir?",
    answer:
      "Beaufort skalası, rüzgar hızını 0'dan 12'ye kadar deniz durumu gözlemlerine bağlayan uluslararası bir sınıflandırmadır. Kaptan Francis Beaufort tarafından geliştirilmiş, mekanik anemometrelerden önce rüzgar şiddetini tahmin etmek için kullanılmış; günümüzde hâlâ hava/deniz raporlarında referans olarak kullanılır.",
  },
];

export const metadata: Metadata = {
  title: "Kaptan Araçları: Tonaj (GT/DWT), Deniz Mili, Seyir Süresi",
  description:
    "Gemi kaptanları için tek sayfada toplanmış araçlar: seyir süresi hesaplama, deniz mili/knot birim dönüşümleri ve gemi tonaj terimleri (GT, DWT, NT) referansı.",
  alternates: {
    canonical: "/kaptan-araclari",
  },
  openGraph: {
    title: "Kaptan Araçları: Tonaj (GT/DWT), Deniz Mili, Seyir Süresi",
    description:
      "Seyir süresi hesaplama, deniz mili/knot dönüşümleri ve gemi tonaj terimleri tek sayfada.",
    url: buildSiteUrl("/kaptan-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const tonnageTable = [
  [
    "GT (Gros Tonaj)",
    "Hacim (birimsiz gösterge)",
    "Geminin toplam kapalı iç hacmi",
    "Liman ücretleri, tescil, gemi büyüklüğü sınıflandırması",
  ],
  [
    "NT (Net Tonaj)",
    "Hacim (birimsiz gösterge)",
    "Ticari amaçlı kullanılabilir hacim (GT − teknik alanlar)",
    "Liman/kanal geçiş ücretleri",
  ],
  [
    "DWT (Ölü Ağırlık Tonajı)",
    "Ağırlık (ton)",
    "Kargo + yakıt + su + erzam + mürettebat toplam ağırlığı",
    "Kargo taşıma kapasitesi karşılaştırması",
  ],
];

const beaufortTable = [
  ["0", "Sakin", "< 1 km/h", "Deniz ayna gibi"],
  ["3", "Tatlı Rüzgar", "12-19 km/h", "Büyük dalgacıklar, köpüklü tepeler"],
  ["6", "Kuvvetli Rüzgar", "39-49 km/h", "Büyük dalgalar, yaygın köpük"],
  ["8", "Fırtına", "62-74 km/h", "Orta yükseklikte dalgalar, kırılan tepeler"],
  ["10", "Tam Fırtına", "89-102 km/h", "Çok yüksek dalgalar, görüş azalır"],
  ["12", "Kasırga", "≥ 118 km/h", "Hava köpük ve spreyle dolu"],
];

export default function KaptanAraclariPage() {
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
        name: "Kaptan Araçları",
        item: buildSiteUrl("/kaptan-araclari"),
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
          <span>Kaptan Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Kaptan Araçları</h1>
          <p>
            Gemi kaptanları ve denizcilik öğrencileri için hesaplama
            araçlarını ve referans bilgileri tek sayfada topladık:
            seyir süresi hesaplama, deniz mili/knot birim dönüşümleri
            ve gemi tonaj terimleri.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>1 deniz mili</strong> = 1852 m
            </li>
            <li>
              <strong>1 knot</strong> = 1 deniz mili/saat ≈ 1,852
              km/saat
            </li>
            <li>
              <strong>GT</strong> hacim, <strong>DWT</strong> ağırlık
              ölçer — ikisi farklı şeydir
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/seyir-suresi-hesaplama">Seyir Süresi Hesaplama</Link>
              {" "}— mesafe ve hızdan (knot dahil) seyir süresini
              hesapla.
            </li>
            <li>
              <Link href="/kategoriler/hiz">Hız Dönüşümleri</Link> —
              knot, km/saat, mph ve diğer hız birimleri.
            </li>
            <li>
              <Link href="/kategoriler/uzunluk">Uzunluk Dönüşümleri</Link>
              {" "}— deniz mili, metre ve diğer uzunluk birimleri.
            </li>
            <li>
              <Link href="/buyuk-daire-mesafesi-hesaplama">
                Büyük Daire Mesafesi Hesaplama
              </Link>{" "}
              — iki koordinat arasındaki en kısa küre-üzeri mesafeyi ve
              başlangıç rotasını hesapla.
            </li>
          </ul>

          <h2>Gemi Tonaj Terimleri (GT / NT / DWT)</h2>
          <p>
            &quot;Tonaj&quot; denizcilikte tek bir ölçüyü değil, farklı
            amaçlara hizmet eden birkaç farklı kavramı ifade eder:
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Gemi tonaj terimleri ve kullanım alanları</caption>
              <thead>
                <tr>
                  <th scope="col">Terim</th>
                  <th scope="col">Ölçtüğü Şey</th>
                  <th scope="col">Tanım</th>
                  <th scope="col">Kullanım Alanı</th>
                </tr>
              </thead>
              <tbody>
                {tonnageTable.map((row) => (
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
            GT ve NT hesaplaması, geminin ayrıntılı iç hacim
            ölçümlerine dayanan ve Uluslararası Tonilato Ölçme
            Sözleşmesi&apos;nde (IMO) tanımlanan resmî bir formülle
            yapılır; bu yüzden burada bir hesaplayıcı değil, kavramların
            ne anlama geldiğini açıklayan bir referans sunuyoruz. Kesin
            tonaj değerleri geminin tonilato belgesinde yer alır.
          </p>

          <h2>Beaufort (Bofor) Rüzgar Şiddeti Skalası</h2>
          <p>
            Kaptan Francis Beaufort tarafından geliştirilen bu skala,
            rüzgar hızını görsel deniz durumu gözlemlerine bağlayan
            0-12 arası bir sınıflandırmadır — hâlâ hava/deniz
            raporlarında yaygın kullanılır:
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Beaufort (Bofor) rüzgar şiddeti skalası (seçilmiş kademeler)</caption>
              <thead>
                <tr>
                  <th scope="col">Bofor No</th>
                  <th scope="col">Tanım</th>
                  <th scope="col">Rüzgar Hızı</th>
                  <th scope="col">Deniz Durumu</th>
                </tr>
              </thead>
              <tbody>
                {beaufortTable.map((row) => (
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
          <p>
            <strong>
              GT (Gros Tonaj) ile DWT (Ölü Ağırlık Tonajı) arasındaki
              fark nedir?
            </strong>
            <br />
            GT (Gross Tonnage), geminin kapalı iç hacmini ifade eden
            hacimsel bir ölçüdür; bir ağırlık birimi değildir. DWT
            (Deadweight Tonnage) ise geminin taşıyabileceği toplam
            ağırlığı (kargo, yakıt, su, mürettebat dahil) ifade eder.
          </p>
          <p>
            <strong>NT (Net Tonaj) nedir?</strong>
            <br />
            NT (Net Tonnage), geminin yolcu ve kargo taşımaya ayrılan
            kullanılabilir hacmini ifade eder; GT&apos;den makine
            dairesi, mürettebat mahalli gibi ticari olmayan alanlar
            çıkarılarak hesaplanır. Liman ve kanal geçiş ücretleri
            sıklıkla NT&apos;ye göre belirlenir.
          </p>
          <p>
            <strong>Neden denizcilikte km yerine deniz mili kullanılır?</strong>
            <br />
            Deniz mili, Dünya üzerindeki enlem dairesinin 1 dakikalık
            yayına eşit olacak şekilde tanımlanmıştır; bu da onu harita
            ve pusula koordinatlarıyla (enlem/boylam dakikası) doğrudan
            uyumlu, seyir için pratik bir birim yapar.
          </p>
          <p>
            <strong>Beaufort (Bofor) skalası nedir?</strong>
            <br />
            Beaufort skalası, rüzgar hızını 0&apos;dan 12&apos;ye kadar
            deniz durumu gözlemlerine bağlayan uluslararası bir
            sınıflandırmadır. Günümüzde hâlâ hava/deniz raporlarında
            referans olarak kullanılır.
          </p>

          <h2>Demir Zinciri (Kaloma) Genel Kuralı</h2>
          <p>
            Demirleme yaparken bırakılacak zincir uzunluğu (kaloma),
            su derinliğine, hava/akıntı koşullarına ve teknenin
            büyüklüğüne göre değişir. Yaygın kullanılan genel kural,
            sakin koşullarda su derinliğinin{" "}
            <strong>3-5 katı kadar</strong> zincir bırakmaktır; rüzgar
            ve akıntı arttıkça bu oran yükseltilir. Bu, gemiye ve
            koşullara göre değişen bir seyirci kuralıdır — kesin
            değer için geminin demirleme prosedürleri ve kaptanın
            değerlendirmesi esastır.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Tonaj terim tanımları, IMO&apos;nun Uluslararası Tonilato
            Ölçme Sözleşmesi&apos;ndeki (International Convention on
            Tonnage Measurement of Ships) genel tanımlarına
            dayanmaktadır. Kesin tonaj hesaplamaları için geminin
            resmî tonilato belgesi ve yetkili sınıflandırma kuruluşu
            esas alınmalıdır.
          </p>
        </section>
      </div>
    </main>
  );
}
