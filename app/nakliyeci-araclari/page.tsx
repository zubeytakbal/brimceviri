import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "CBM ve hacimsel ağırlık nedir?",
    answer:
      "CBM, bir kolinin metreküp cinsinden hacmidir. Hacimsel ağırlık ise bu hacmin taşıma moduna göre bir katsayıyla çarpılmasıyla bulunan ve nakliye ücretinin gerçek ağırlıkla karşılaştırılıp büyük olanı üzerinden hesaplanmasını sağlayan değerdir.",
  },
  {
    question: "Taşıma modları arasında hacimsel ağırlık katsayısı neden farklı?",
    answer:
      "Deniz, kara ve hava yolu araçlarının taşıma kapasitesi/hacim oranı farklı olduğu için sektörde her mod için ayrı standart katsayı kullanılır: deniz 1000, kara 3000, hava 6000 (bazı taşıyıcılarda 5000). Kesin katsayı taşıyıcı firmaya göre değişebilir.",
  },
];

export const metadata: Metadata = {
  title: "Nakliyeci Araçları: CBM, Hacimsel Ağırlık, Birim Dönüşümleri",
  description:
    "Nakliyeci, lojistik ve kargo profesyonelleri için tek sayfada toplanmış araçlar: CBM hesaplama, hacimsel ağırlık, ücrete esas ağırlık ve ilgili birim dönüşümleri.",
  alternates: { canonical: "/nakliyeci-araclari" },
  openGraph: {
    title: "Nakliyeci Araçları: CBM, Hacimsel Ağırlık, Birim Dönüşümleri",
    description: "CBM hesaplama, hacimsel ağırlık ve ücrete esas ağırlık tek sayfada.",
    url: buildSiteUrl("/nakliyeci-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const divisorTable = [
  ["Deniz Yolu", "1 m³ = 1000 kg"],
  ["Kara Yolu", "1 m³ ≈ 333 kg"],
  ["Hava Yolu", "1 m³ ≈ 167 kg (bazı taşıyıcılarda 200 kg)"],
];

export default function NakliyeciAraclariPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Nakliyeci Araçları", item: buildSiteUrl("/nakliyeci-araclari") },
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
          <span>Nakliyeci Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Nakliyeci Araçları</h1>
          <p>
            Nakliyeci, lojistik ve kargo profesyonellerinin günlük
            olarak ihtiyaç duyduğu hesaplama araçlarını ve referans
            bilgileri tek sayfada topladık: CBM hesaplama, hacimsel
            ağırlık, ücrete esas ağırlık ve ilgili birim
            dönüşümleri.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>CBM</strong> = Uzunluk(m) × Genişlik(m) × Yükseklik(m)
            </li>
            <li>
              <strong>Ücrete esas ağırlık</strong> = gerçek ağırlık ile
              hacimsel ağırlığın büyük olanı
            </li>
            <li>
              <strong>Hava yolu katsayısı</strong>: 1 m³ ≈ 167 kg
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/cbm-hesaplama">CBM ve Hacimsel Ağırlık Hesaplama</Link>
              {" "}— koli/palet ölçülerinden toplam hacmi ve ücrete
              esas ağırlığı hesapla.
            </li>
            <li>
              <Link href="/kategoriler/hacim">Hacim Dönüşümleri</Link>
              {" "}— m³, litre ve diğer hacim birimleri arasında
              dönüşüm yap.
            </li>
            <li>
              <Link href="/kategoriler/kutle">Kütle Dönüşümleri</Link>
              {" "}— kg, ton ve diğer ağırlık birimleri arasında
              dönüşüm yap.
            </li>
            <li>
              <Link href="/kategoriler/uzunluk">Uzunluk Dönüşümleri</Link>
              {" "}— metre, cm, inç ve ayak arasında dönüşüm yap.
            </li>
            <li>
              <Link href="/yakit-tuketimi-hesaplama">Yakıt Tüketimi Hesaplama</Link>
              {" "}— filo/araç yakıt tüketimini hesapla.
            </li>
          </ul>

          <h2>Taşıma Moduna Göre Hacimsel Ağırlık Katsayıları</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Sektörde yaygın kullanılan standart katsayılar</caption>
              <thead>
                <tr>
                  <th scope="col">Taşıma Modu</th>
                  <th scope="col">Katsayı</th>
                </tr>
              </thead>
              <tbody>
                {divisorTable.map((row) => (
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
            <strong>CBM ve hacimsel ağırlık nedir?</strong>
            <br />
            CBM, bir kolinin metreküp cinsinden hacmidir. Hacimsel
            ağırlık ise bu hacmin taşıma moduna göre bir katsayıyla
            çarpılmasıyla bulunan ve nakliye ücretinin gerçek
            ağırlıkla karşılaştırılıp büyük olanı üzerinden
            hesaplanmasını sağlayan değerdir.
          </p>
          <p>
            <strong>
              Taşıma modları arasında hacimsel ağırlık katsayısı
              neden farklı?
            </strong>
            <br />
            Deniz, kara ve hava yolu araçlarının taşıma
            kapasitesi/hacim oranı farklı olduğu için sektörde her
            mod için ayrı standart katsayı kullanılır. Kesin katsayı
            taşıyıcı firmaya göre değişebilir;{" "}
            <Link href="/cbm-hesaplama">CBM ve Hacimsel Ağırlık Hesaplama</Link>{" "}
            aracımızda özel katsayı da girebilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Katsayılar, uluslararası nakliye ve lojistik sektöründe
            yaygın kullanılan standart değerlere dayanmaktadır. Kesin
            navlun hesabı için taşıyıcı firmanın kendi tarifesine
            danışılmalıdır.
          </p>
        </section>
      </div>
    </main>
  );
}
