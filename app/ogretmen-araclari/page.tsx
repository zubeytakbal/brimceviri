import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Harf notu tablosu her okulda aynı mı?",
    answer:
      "Hayır. Buradaki tablo (AA-FF, 4'lük sistem) Türkiye'deki birçok üniversitede yaygın kullanılan genel bir referanstır; okulunun veya üniversitenin kendi yönetmeliğinde farklı eşik değerleri olabilir.",
  },
  {
    question: "Devamsızlık limiti gün mü, yüzde mi hesaplanır?",
    answer:
      "İlkokul, ortaokul ve lisede devamsızlık genellikle gün üzerinden, üniversitede ise dersin toplam ders saatinin bir yüzdesi (örneğin teorik derste %30, uygulamalı derste %20 gibi) üzerinden hesaplanır. Devamsızlık Hesaplama aracımız her iki modu da destekler.",
  },
  {
    question: "Sınıf not ortalaması nasıl hesaplanır?",
    answer:
      "Basit aritmetik ortalamada tüm notlar toplanıp not sayısına bölünür. Ağırlıklı ortalamada ise (örneğin yazılı %70, sözlü %30 gibi) her not kendi ağırlığıyla çarpılıp toplanır, ağırlıkların toplamına bölünür. Ortalama Hesaplama aracımız her iki yöntemi de destekler.",
  },
  {
    question: "100'lük not sisteminden 4'lük sisteme dönüşüm neden önemli?",
    answer:
      "Türkiye'de lise ve ortaokul karneleri genellikle 100'lük sistemde tutulurken, üniversiteler ve YÖK'ün bazı denklik işlemleri 4'lük sistemi (GPA/AGNO) esas alır. Öğrenci geçmişini değerlendirirken veya yurt dışı başvurularında bu dönüşüm sıkça gerekir.",
  },
];

export const metadata: Metadata = {
  title: "Öğretmen Araçları: Harf Notu, Not Ortalaması",
  description:
    "Öğretmenler için tek sayfada toplanmış araçlar: harf notu (100'lük-4'lük sistem) hesaplama, not ortalaması ve devamsızlık hesaplama.",
  alternates: {
    canonical: "/ogretmen-araclari",
  },
  openGraph: {
    title: "Öğretmen Araçları: Harf Notu, Not Ortalaması",
    description: "Harf notu hesaplama tek sayfada.",
    url: buildSiteUrl("/ogretmen-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const letterGradeTable = [
  ["90-100", "AA", "4.0"],
  ["85-89", "BA", "3.5"],
  ["80-84", "BB", "3.0"],
  ["75-79", "CB", "2.5"],
  ["70-74", "CC", "2.0"],
  ["65-69", "DC", "1.5"],
  ["60-64", "DD", "1.0"],
  ["50-59", "FD", "0.5"],
  ["0-49", "FF", "0.0"],
];

export default function OgretmenAraclariPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Öğretmen Araçları", item: buildSiteUrl("/ogretmen-araclari") },
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
          <span>Öğretmen Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Öğretmen Araçları</h1>
          <p>
            Öğretmenlerin notlandırma ve sınıf yönetiminde ihtiyaç
            duyduğu hesaplama araçlarını tek sayfada topladık: harf
            notu hesaplama, not ortalaması ve devamsızlık hesaplama.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>90-100 puan</strong> ≈ AA (4.0)
            </li>
            <li>
              <strong>Üniversitede devamsızlık</strong>: teorik derste
              genellikle %30, uygulamalıda %20
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/harf-notu-hesaplama">Harf Notu Hesaplama</Link>
              {" "}— 100&apos;lük puanı harf notuna ve 4&apos;lük
              sisteme çevir.
            </li>
            <li>
              <Link href="/bilim-hesaplayicilari/matematik/ortalama-hesaplama">
                Ortalama Hesaplama
              </Link>{" "}
              — birden fazla notun aritmetik ortalamasını hesapla.
            </li>
            <li>
              <Link href="/devamsizlik-hesaplama">Devamsızlık Hesaplama</Link>
              {" "}— okul veya üniversite devamsızlık limitine göre
              kalan hakkı hesapla.
            </li>
          </ul>

          <h2>100&apos;lük - Harf Notu - 4&apos;lük Sistem Tablosu</h2>
          <p>
            Türkiye&apos;deki birçok üniversitede yaygın kullanılan genel
            referans dönüşüm tablosu:
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>100&apos;lük puan, harf notu ve 4&apos;lük sistem (GPA) karşılıkları</caption>
              <thead>
                <tr>
                  <th scope="col">100&apos;lük Puan</th>
                  <th scope="col">Harf Notu</th>
                  <th scope="col">4&apos;lük Sistem</th>
                </tr>
              </thead>
              <tbody>
                {letterGradeTable.map((row) => (
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
            Bu eşik değerleri kurumdan kuruma değişebilir; kesin ve güncel
            değer için okulunun veya üniversitenin kendi yönetmeliği esas
            alınmalıdır.
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
            Harf notu eşikleri, Türkiye&apos;deki üniversitelerde yaygın
            kullanılan genel bir referans tablosuna dayanır; devamsızlık
            oranları ise okul ve üniversitelerin sık uyguladığı örnek
            yönetmelik değerleridir. Bu sayfa yalnızca referans amaçlıdır,
            kesin kural için kurumunun kendi yönetmeliği esas alınmalıdır.
          </p>
        </section>
      </div>
    </main>
  );
}
