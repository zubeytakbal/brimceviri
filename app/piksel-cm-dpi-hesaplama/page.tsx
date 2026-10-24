import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import PixelCalculator from "../components/PixelCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Piksel ile cm arasında nasıl dönüşüm yapılır?",
    answer:
      "Piksel sayısı, fiziksel boyut (inç cinsinden) ile DPI (inç başına nokta sayısı) çarpılarak bulunur: piksel = (cm / 2,54) × DPI. Ters yönde, fiziksel boyut = piksel / DPI formülüyle hesaplanır.",
  },
  {
    question: "Baskı için hangi DPI değeri kullanılmalı?",
    answer:
      "Web ve ekran tasarımı için 72-96 DPI yeterlidir. Standart kalitede baskı için 300 DPI, yüksek kaliteli/profesyonel baskı için 600 DPI yaygın kullanılan değerlerdir.",
  },
];

export const metadata: Metadata = {
  title: "Piksel CM DPI Hesaplama: Piksel Kaç CM, 9:16 Kaç Piksel?",
  description:
    "Piksel, cm ve DPI'dan ikisini gir, üçüncüsünü hesapla. 9:16 ve 16:9 çözünürlükleri, 72-300 DPI'da piksel kaç cm ve A4'ün piksel ölçüsü tablolarda.",
  alternates: { canonical: "/piksel-cm-dpi-hesaplama" },
  openGraph: {
    title: "Piksel CM DPI Hesaplama: Piksel Kaç CM, 9:16 Kaç Piksel?",
    description: "Piksel, fiziksel boyut ve DPI hesaplayın; 9:16 çözünürlükleri ve DPI tabloları.",
    url: buildSiteUrl("/piksel-cm-dpi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const sayi = (n: number, basamak = 0) => n.toLocaleString("tr-TR", { maximumFractionDigits: basamak });

/** 9:16 dikey (Reels, TikTok, Story) ve aynı ölçülerin 16:9 yatay hâli; yükseklik = genişlik × 16 / 9. */
const DIKEY_GENISLIKLER: Array<[number, string]> = [
  [720, "HD"],
  [1080, "Full HD"],
  [1440, "2K (QHD)"],
  [2160, "4K (UHD)"],
];

/** 1080 piksel genişlikte yaygın oranların yüksekliği. */
const ORANLAR: Array<[number, number]> = [
  [1, 1],
  [4, 5],
  [3, 4],
  [2, 3],
  [9, 16],
  [16, 9],
  [4, 3],
];

const PIKSELLER = [100, 500, 1000, 1080, 1920, 3000];
const DPILAR = [72, 96, 150, 300];
const cm = (piksel: number, dpi: number) => (piksel / dpi) * 2.54;
const piksel = (santim: number, dpi: number) => Math.round((santim / 2.54) * dpi);

const KAGITLAR: Array<[string, number, number]> = [
  ["A4", 21, 29.7],
  ["A5", 14.8, 21],
  ["10 × 15 cm fotoğraf", 10, 15],
  ["Biyometrik 5 × 6 cm", 5, 6],
];

const dpiTable = [
  ["Web / ekran tasarımı", "72-96 DPI"],
  ["Standart baskı (broşür, kartvizit)", "300 DPI"],
  ["Yüksek kaliteli / profesyonel baskı", "600 DPI"],
];

export default function PixelCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Piksel, CM ve DPI Hesaplama", item: buildSiteUrl("/piksel-cm-dpi-hesaplama") },
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
          <span>Piksel, CM ve DPI Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Piksel, CM ve DPI Hesaplama</h1>
          <p>
            Piksel sayısı, fiziksel boyut veya DPI değerinden ikisini
            gir: eksik olan üçüncü değeri anında hesapla.
          </p>
        </header>

        <PixelCalculator />

        <section className="category-article-content">
          <h2 id="9-16">9:16 kaç piksel?</h2>
          <p>
            9:16, genişliğin yüksekliğe oranıdır: genişlik 9 birimse yükseklik 16 birimdir. Telefon ekranı, Instagram Reels ve
            Story, TikTok ve YouTube Shorts dikey 9:16 kullanır. En yaygın ölçü <strong>1080 × 1920 piksel</strong>dir. Aynı
            ölçüler yan çevrildiğinde 16:9 yatay video ve ekran ölçüsü olur.
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th scope="col">Çözünürlük</th>
                  <th scope="col">9:16 (dikey)</th>
                  <th scope="col">16:9 (yatay)</th>
                </tr>
              </thead>
              <tbody>
                {DIKEY_GENISLIKLER.map(([g, ad]) => (
                  <tr key={g}>
                    <td>{ad}</td>
                    <td>
                      {g} × {(g * 16) / 9}
                    </td>
                    <td>
                      {(g * 16) / 9} × {g}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>Başka bir oranın 1080 piksel genişlikteki yüksekliği (yükseklik = 1080 × ikinci sayı / birinci sayı):</p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th scope="col">Oran</th>
                  <th scope="col">1080 genişlikte</th>
                </tr>
              </thead>
              <tbody>
                {ORANLAR.map(([a, b]) => (
                  <tr key={`${a}-${b}`}>
                    <td>
                      {a}:{b}
                    </td>
                    <td>
                      1080 × {Math.round((1080 * b) / a)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Platformların önerdiği ölçüler için{" "}
            <Link href="/sosyal-medya-gorsel-boyutlari-hesaplama">Sosyal Medya Görsel Boyutları</Link> sayfasına bakabilirsin.
          </p>

          <h2 id="piksel-cm">Piksel kaç cm?</h2>
          <p>
            Pikselin tek başına santimetre karşılığı yoktur; kaç cm olacağını DPI belirler. 1 inç 2,54 cm olduğu için{" "}
            <strong>cm = piksel ÷ DPI × 2,54</strong>. 72 DPI&apos;da 1 piksel yaklaşık {sayi(cm(1, 72), 4)} cm, 300 DPI&apos;da{" "}
            {sayi(cm(1, 300), 4)} cm&apos;dir. Tablodaki değerler santimetredir.
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th scope="col">Piksel</th>
                  {DPILAR.map((d) => (
                    <th key={d} scope="col">
                      {d} DPI
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PIKSELLER.map((px) => (
                  <tr key={px}>
                    <td>{sayi(px)}</td>
                    {DPILAR.map((d) => (
                      <td key={d}>{sayi(cm(px, d), 1)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 id="kagit">A4 ve fotoğraf kaç piksel?</h2>
          <p>Baskı ölçüsünden piksele: piksel = cm ÷ 2,54 × DPI. Baskı için genellikle 300 DPI istenir.</p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th scope="col">Kâğıt</th>
                  <th scope="col">150 DPI</th>
                  <th scope="col">300 DPI</th>
                </tr>
              </thead>
              <tbody>
                {KAGITLAR.map(([ad, g, y]) => (
                  <tr key={ad}>
                    <td>{ad}</td>
                    <td>
                      {piksel(g, 150)} × {piksel(y, 150)}
                    </td>
                    <td>
                      {piksel(g, 300)} × {piksel(y, 300)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 id="dpi">DPI nasıl hesaplanır?</h2>
          <p>
            Elinde piksel ölçüsü ve basılacak boyut varsa <strong>DPI = piksel ÷ (cm ÷ 2,54)</strong>. Örneğin 3000 piksel
            genişliğindeki bir fotoğraf 20 cm genişlikte basılırsa 3000 ÷ (20 ÷ 2,54) ≈ {sayi(3000 / (20 / 2.54))} DPI olur;
            300 DPI&apos;ın üstünde kaldığı için net basılır. Aynı fotoğraf 50 cm basılırsa ≈ {sayi(3000 / (50 / 2.54))} DPI&apos;a
            düşer.
          </p>

          <h2>Yaygın Kullanılan DPI Değerleri</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Kullanım amacına göre tipik DPI değerleri</caption>
              <thead>
                <tr>
                  <th scope="col">Kullanım Amacı</th>
                  <th scope="col">Tipik DPI</th>
                </tr>
              </thead>
              <tbody>
                {dpiTable.map((row) => (
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
            <strong>Piksel ile cm arasında nasıl dönüşüm yapılır?</strong>
            <br />
            Piksel sayısı, fiziksel boyut (inç cinsinden) ile DPI
            (inç başına nokta sayısı) çarpılarak bulunur: piksel =
            (cm / 2,54) × DPI. Ters yönde, fiziksel boyut = piksel /
            DPI formülüyle hesaplanır.
          </p>
          <p>
            <strong>Baskı için hangi DPI değeri kullanılmalı?</strong>
            <br />
            Web ve ekran tasarımı için 72-96 DPI yeterlidir. Standart
            kalitede baskı için 300 DPI, yüksek kaliteli/profesyonel
            baskı için 600 DPI yaygın kullanılan değerlerdir.
          </p>

          <h2>İlgili araçlar</h2>
          <p>
            Diğer grafik tasarımcı araçları için{" "}
            <Link href="/hesaplayicilar#dosya-ve-gorsel">Dosya ve Görsel Araçları</Link>{" "}
            sayfasına, uzunluk birimleri arasında genel dönüşüm için{" "}
            <Link href="/kategoriler/uzunluk">Uzunluk Dönüşümleri</Link>{" "}
            sayfasına, fotoğraf makinesi odak uzaklığı eşdeğeri için{" "}
            <Link href="/odak-uzakligi-esdegeri-hesaplama">Odak Uzaklığı Eşdeğeri Hesaplama</Link>{" "}
            sayfasına, sosyal medya görsel boyutları için{" "}
            <Link href="/sosyal-medya-gorsel-boyutlari-hesaplama">Sosyal Medya Görsel Boyutları Hesaplama</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Formül, dijital görüntü çözünürlüğü ve baskı sektöründe
            standart kabul edilen piksel/inç/DPI ilişkisine
            dayanmaktadır.
          </p>
        </section>
      </div>
    </main>
  );
}
