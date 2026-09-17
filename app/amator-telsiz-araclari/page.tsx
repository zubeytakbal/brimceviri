import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Bu sayfadaki araç bir anten analizörünün yerini alır mı?",
    answer:
      "Hayır. Bu araç yalnızca teorik bir başlangıç uzunluğu hesaplar; gerçek montajda SWR (duran dalga oranı) ölçülüp anten buna göre ince ayar yapılmalıdır.",
  },
  {
    question: "Formülde neden 150 değil 142,5 (veya 71,25) kullanılıyor?",
    answer:
      "Serbest uzayda yarım dalga boyu 150/frekans(MHz) metredir (λ = 300/f, yarısı = 150/f). Ancak gerçek bir telin ucundaki 'uç etkisi' (end effect) ve tel çapı/dielektrik ortam nedeniyle elektriksel uzunluk, serbest uzay değerinin yaklaşık %95'i kadardır — bu yüzden pratik formüllerde 150 yerine ~142,5 (150 × 0,95) katsayısı kullanılır. Kesin uzunluk yine de SWR ölçümüyle ince ayar gerektirir.",
  },
  {
    question: "SWR (duran dalga oranı) nedir ve neden önemlidir?",
    answer:
      "SWR, antene giden güç ile antenden yansıyan güç arasındaki oranı ifade eder. İdeal değer 1:1'dir; 2:1'in altı genellikle kabul edilebilir sayılır. Yüksek SWR, gücün verici yerine kabloya/vericiye geri yansıdığı ve hatta cihaza zarar verebileceği anlamına gelir — bu yüzden anten kurulduktan sonra mutlaka bir SWR metre ile ölçülmelidir.",
  },
  {
    question: "Dipol mü, vertikal mi tercih edilmeli?",
    answer:
      "Dipol anten iki yönde (uçlarına dik) daha güçlü yayın yapar ve genellikle yükseğe kurulması gerekir; kurulumu ucuz ve basittir. Vertikal (çeyrek dalga) anten her yöne (omnidirectional) eşit yayın yapar, daha az yer kaplar ama iyi bir topraklama/radial sistemi gerektirir. Seçim, mevcut alana, hedeflenen menzile ve bütçeye göre değişir.",
  },
];

export const metadata: Metadata = {
  title: "Amatör Telsiz Araçları: Anten Uzunluğu Hesaplama",
  description:
    "Amatör telsizciler için tek sayfada toplanmış araçlar: dipol/vertikal anten uzunluğu hesaplama, Hz/kHz/MHz frekans dönüşümleri.",
  alternates: {
    canonical: "/amator-telsiz-araclari",
  },
  openGraph: {
    title: "Amatör Telsiz Araçları: Anten Uzunluğu Hesaplama",
    description: "Anten uzunluğu hesaplama tek sayfada.",
    url: buildSiteUrl("/amator-telsiz-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const amateurBandTable = [
  ["160 m", "1,8 - 2,0 MHz"],
  ["80 m", "3,5 - 3,8 MHz"],
  ["40 m", "7,0 - 7,2 MHz"],
  ["20 m", "14,0 - 14,35 MHz"],
  ["15 m", "21,0 - 21,45 MHz"],
  ["10 m", "28,0 - 29,7 MHz"],
  ["2 m (VHF)", "144 - 146 MHz"],
  ["70 cm (UHF)", "430 - 440 MHz"],
];

export default function AmatorTelsizAraclariPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Amatör Telsiz Araçları", item: buildSiteUrl("/amator-telsiz-araclari") },
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
          <span>Amatör Telsiz Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Amatör Telsiz Araçları</h1>
          <p>
            Amatör telsizcilerin anten kurulumunda ihtiyaç duyduğu
            hesaplama araçlarını tek sayfada topladık: dipol/vertikal
            anten uzunluğu hesaplama, Hz/kHz/MHz frekans dönüşümleri.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>Yarım Dalga Dipol</strong> = 142,5 / Frekans (MHz) metre
            </li>
            <li>
              <strong>Çeyrek Dalga Vertikal</strong> = 71,25 / Frekans (MHz) metre
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/anten-uzunlugu-hesaplama">Anten Uzunluğu Hesaplama</Link>
              {" "}— frekanstan dipol/vertikal anten uzunluğu hesapla,
              ya da anten uzunluğundan rezonans frekansını bul.
            </li>
            <li>
              <Link href="/kategoriler/frekans">Frekans Dönüşümleri</Link>
              {" "}— Hz, kHz, MHz ve GHz birimleri arasında dönüşüm yap.
            </li>
          </ul>

          <h2>Amatör Telsiz Bantları (IARU Bölge 1)</h2>
          <p>
            Türkiye&apos;nin de içinde bulunduğu IARU Bölge 1&apos;de yaygın
            olarak kullanılan amatör telsiz frekans bantları:
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Yaygın amatör telsiz (HF/VHF/UHF) bantları ve frekans aralıkları</caption>
              <thead>
                <tr>
                  <th scope="col">Bant</th>
                  <th scope="col">Frekans Aralığı</th>
                </tr>
              </thead>
              <tbody>
                {amateurBandTable.map((row) => (
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
            Kesin bant sınırları ve kullanım kısıtları (lisans sınıfına göre
            izin verilen güç, mod vb.) ülkeden ülkeye ve lisans sınıfına
            göre değişebilir; Türkiye&apos;de güncel tahsis için BTK&apos;nın
            (Bilgi Teknolojileri ve İletişim Kurumu) ilgili yönetmeliğine
            bakılmalıdır.
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
            Anten uzunluğu formülleri (142,5/f ve 71,25/f), amatör telsiz
            camiasında ve ARRL (American Radio Relay League) gibi
            kaynaklarda yaygın kullanılan standart pratik formüllerdir.
            Bant tahsisleri IARU Bölge 1 genel referanslarına dayanır.
          </p>
        </section>
      </div>
    </main>
  );
}
