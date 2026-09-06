import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "1 su bardağı kaç ml, kaç gram eder?",
    answer:
      "1 su bardağı 200 ml'dir. Gram karşılığı malzemeye göre değişir çünkü bardak hacim, gram ise ağırlık ölçer — örneğin 1 su bardağı un yaklaşık 130 gram, 1 su bardağı toz şeker ise yaklaşık 200 gramdır. Mutfak Ölçüleri Çevirici aracımız 15'ten fazla malzeme için bu karşılığı otomatik hesaplar.",
  },
  {
    question: "Fırın sıcaklığı °F cinsinden verilen bir tarifte, °C'ye nasıl çeviririm?",
    answer:
      "°C = (°F − 32) × 5/9 formülüyle çevirebilirsin, ya da aşağıdaki Fırın Sıcaklığı Dönüşüm Tablosu'ndaki en yakın yaygın değeri kullanabilirsin. Sıcaklık Dönüşümleri sayfamızdan da tam hassasiyette çevirim yapabilirsin.",
  },
  {
    question: "Gas Mark nedir?",
    answer:
      "Gas Mark, İngiltere'de gazlı fırınlarda kullanılan bir sıcaklık ölçeğidir (1'den 9'a kadar). İngiliz tariflerinde sıkça karşılaşılır; aşağıdaki tabloda yaklaşık °C ve °F karşılıklarını bulabilirsin.",
  },
  {
    question: "Yabancı bir tarifteki 'cup' ölçüsü kaç ml?",
    answer:
      "Bu, tarifin hangi ülkeden geldiğine göre değişir: ABD'de 1 cup 240 ml, Avustralya'da ve metrik tariflerde 1 cup 250 ml'dir. Türkiye'deki standart su bardağı (200 ml) bu ikisinden de küçüktür — yabancı bir tarifi uygularken bu farkı göz önünde bulundurmak önemlidir.",
  },
];

export const metadata: Metadata = {
  title: "Aşçı Araçları: Mutfak Ölçüleri, Tarif Çevirme, Fırın Sıcaklığı",
  description:
    "Aşçı ve ev aşçıları için tek sayfada toplanmış araçlar: mutfak ölçüleri çevirici, tarif ölçekleyici, fırın sıcaklığı dönüşüm tablosu (°C/°F/Gas Mark).",
  alternates: {
    canonical: "/asci-araclari",
  },
  openGraph: {
    title: "Aşçı Araçları: Mutfak Ölçüleri, Tarif Çevirme, Fırın Sıcaklığı",
    description:
      "Mutfak ölçüleri çevirici, tarif ölçekleyici ve fırın sıcaklığı dönüşüm tablosu tek sayfada.",
    url: buildSiteUrl("/asci-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const ovenTempTable = [
  ["Çok Düşük", "120°C", "250°F", "1/2"],
  ["Düşük", "150°C", "300°F", "2"],
  ["Orta-Düşük", "160°C", "325°F", "3"],
  ["Orta", "180°C", "350°F", "4"],
  ["Orta-Yüksek", "190°C", "375°F", "5"],
  ["Yüksek", "200°C", "400°F", "6"],
  ["Çok Yüksek", "220°C", "425°F", "7"],
  ["Kızartma/Maksimum", "230°C", "450°F", "8"],
];

const cupSizeTable = [
  ["ABD (US Cup)", "240 ml"],
  ["Metrik / Avustralya", "250 ml"],
  ["Türkiye (standart su bardağı)", "200 ml"],
];

export default function AsciAraclariPage() {
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
        name: "Aşçı Araçları",
        item: buildSiteUrl("/asci-araclari"),
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
          <span>Aşçı Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Aşçı Araçları</h1>
          <p>
            Aşçı, şef ve ev aşçılarının mutfakta günlük olarak
            kullandığı hesaplama araçlarını ve referans bilgileri tek
            sayfada topladık: mutfak ölçüleri, tarif ölçekleme ve fırın
            sıcaklığı dönüşümleri.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>1 su bardağı</strong> = 200 ml
            </li>
            <li>
              <strong>1 yemek kaşığı</strong> = 15 ml = 3 çay kaşığı
            </li>
            <li>
              <strong>180°C fırın</strong> ≈ 350°F ≈ Gas Mark 4
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/mutfak-olculeri-cevirici">Mutfak Ölçüleri Çevirici</Link>
              {" "}— su bardağı, yemek kaşığı ve çay kaşığının gram
              karşılığını malzemeye göre hesapla.
            </li>
            <li>
              <Link href="/tarif-cevirici">Tarif Çevirici</Link> —
              tarifi yapıştır, porsiyonu ölçekle; miktarlar ve gram
              karşılıkları otomatik hesaplanır.
            </li>
            <li>
              <Link href="/kategoriler/hacim">Hacim</Link> ·{" "}
              <Link href="/kategoriler/kutle">Kütle</Link> ·{" "}
              <Link href="/kategoriler/sicaklik">Sıcaklık</Link> birim
              dönüşümleri
            </li>
          </ul>

          <h2>Fırın Sıcaklığı Dönüşüm Tablosu</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Yaygın fırın sıcaklığı karşılıkları (°C / °F / Gas Mark)</caption>
              <thead>
                <tr>
                  <th scope="col">Tanım</th>
                  <th scope="col">Santigrat</th>
                  <th scope="col">Fahrenhayt</th>
                  <th scope="col">Gas Mark</th>
                </tr>
              </thead>
              <tbody>
                {ovenTempTable.map((row) => (
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
            Bu değerler yaygın kullanılan yaklaşık karşılıklardır;
            fırınlar arası kalibrasyon farkı olabileceğinden tarifteki
            pişirme süresini ve görünümü de kontrol etmek en
            güvenlisidir. Tam hassasiyette dönüşüm için{" "}
            <Link href="/kategoriler/sicaklik">Sıcaklık Dönüşümleri</Link>{" "}
            sayfasını kullanabilirsin.
          </p>

          <h2>Ülkeye Göre Bardak (Cup) Ölçüleri</h2>
          <p>
            Yabancı tariflerde geçen &quot;cup&quot; ölçüsü, tarifin
            geldiği ülkeye göre değişir ve Türkiye&apos;deki standart
            su bardağından (200 ml) farklıdır:
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Ülkeye göre 1 bardak (cup) hacim karşılığı</caption>
              <thead>
                <tr>
                  <th scope="col">Ülke/Standart</th>
                  <th scope="col">1 Bardak (Cup)</th>
                </tr>
              </thead>
              <tbody>
                {cupSizeTable.map((row) => (
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
            <strong>1 su bardağı kaç ml, kaç gram eder?</strong>
            <br />
            1 su bardağı 200 ml&apos;dir. Gram karşılığı malzemeye göre
            değişir çünkü bardak hacim, gram ise ağırlık ölçer —
            örneğin 1 su bardağı un yaklaşık 130 gram, 1 su bardağı toz
            şeker ise yaklaşık 200 gramdır.{" "}
            <Link href="/mutfak-olculeri-cevirici">
              Mutfak Ölçüleri Çevirici
            </Link>{" "}
            aracımız 15&apos;ten fazla malzeme için bu karşılığı
            otomatik hesaplar.
          </p>
          <p>
            <strong>
              Fırın sıcaklığı °F cinsinden verilen bir tarifte, °C&apos;ye
              nasıl çeviririm?
            </strong>
            <br />
            °C = (°F − 32) × 5/9 formülüyle çevirebilirsin, ya da
            yukarıdaki Fırın Sıcaklığı Dönüşüm Tablosu&apos;ndaki en
            yakın yaygın değeri kullanabilirsin.
          </p>
          <p>
            <strong>Gas Mark nedir?</strong>
            <br />
            Gas Mark, İngiltere&apos;de gazlı fırınlarda kullanılan bir
            sıcaklık ölçeğidir (1&apos;den 9&apos;a kadar). İngiliz
            tariflerinde sıkça karşılaşılır; yukarıdaki tabloda
            yaklaşık °C ve °F karşılıklarını bulabilirsin.
          </p>
          <p>
            <strong>Yabancı bir tarifteki &quot;cup&quot; ölçüsü kaç ml?</strong>
            <br />
            Bu, tarifin hangi ülkeden geldiğine göre değişir: ABD&apos;de
            1 cup 240 ml, Avustralya&apos;da ve metrik tariflerde 1 cup
            250 ml&apos;dir. Türkiye&apos;deki standart su bardağı (200
            ml) bu ikisinden de küçüktür — yabancı bir tarifi
            uygularken bu farkı göz önünde bulundurmak önemlidir.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Fırın sıcaklığı karşılıkları ve malzeme ölçü tablosu,
            uluslararası mutfak yayınlarında yaygın kullanılan
            standart değerlere dayanmaktadır. Kesin sonuç için her
            zaman kendi fırınının davranışını ve tarifin talimatlarını
            esas al.
          </p>
        </section>
      </div>
    </main>
  );
}
