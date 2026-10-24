import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import GcsCalculator from "../components/GcsCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Glasgow Koma Skalası (GKS) puanları ne anlama gelir?",
    answer:
      "GKS 3 ile 15 arasında değişir: 13-15 hafif, 9-12 orta, 3-8 şiddetli bilinç bozukluğunu gösterir. Minimum skor 3 (derin koma), maksimum skor 15'tir (tam uyanık ve oryante).",
  },
  {
    question: "Hasta entübeyse sözel yanıt nasıl puanlanır?",
    answer:
      "Hasta entübe veya trakeostomili ise sözel yanıt değerlendirilemez ve genellikle skora 'T' notu düşülerek belirtilir; toplam puan hesaplanırken bu durum ayrıca not edilmelidir.",
  },
];

const GKS_SATIRLAR: Array<[number, string, string, string]> = [
  [6, "—", "—", "Emirlere uyar"],
  [5, "—", "Oryante, uygun konuşma", "Ağrılı uyaranı lokalize eder"],
  [4, "Spontan", "Konfüze konuşma", "Ağrıdan çeker (fleksiyon)"],
  [3, "Sesle", "Uygunsuz kelimeler", "Anormal fleksiyon (dekortike)"],
  [2, "Ağrılı uyaranla", "Anlaşılmaz sesler", "Ekstansiyon (deserebre)"],
  [1, "Yanıt yok", "Yanıt yok", "Yanıt yok"],
];

export const metadata: Metadata = {
  title: "GKS Hesaplama: Glasgow Koma Skalası Puan Tablosu",
  description:
    "Göz açma, sözel yanıt ve motor yanıtı seç: Glasgow Koma Skalası (GKS) toplam puanını ve bilinç düzeyi kategorisini hesapla.",
  alternates: { canonical: "/glasgow-koma-skalasi-hesaplama" },
  openGraph: {
    title: "GKS Hesaplama: Glasgow Koma Skalası Puan Tablosu",
    description: "GKS toplam puanını ve bilinç düzeyi kategorisini hesaplayın.",
    url: buildSiteUrl("/glasgow-koma-skalasi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function GcsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Glasgow Koma Skalası Hesaplama", item: buildSiteUrl("/glasgow-koma-skalasi-hesaplama") },
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
          <span>Glasgow Koma Skalası Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>GKS Hesaplama (Glasgow Koma Skalası)</h1>
          <p>
            Göz açma, sözel yanıt ve motor yanıtı seç: GKS toplam
            puanını ve bilinç düzeyi kategorisini anında hesapla.
          </p>
        </header>

        <GcsCalculator />

        <section className="category-article-content">
          <h2>GKS nedir?</h2>
          <p>
            Glasgow Koma Skalası, 1974&apos;te Graham Teasdale ve
            Bryan Jennett tarafından geliştirilen, beyin travması
            geçiren veya bilinç bozukluğu yaşayan hastaların bilinç
            düzeyini objektif olarak ölçmek için kullanılan
            uluslararası kabul görmüş bir klinik değerlendirme
            ölçeğidir. Göz açma (1-4), sözel yanıt (1-5) ve motor
            yanıt (1-6) puanlarının toplamından oluşur.
          </p>

          <h2 id="tablo">GKS puan tablosu</h2>
          <p>Üç yanıt ayrı ayrı puanlanır ve toplanır; kayıtta genellikle &quot;G3 S4 M5 = 12&quot; biçiminde yazılır.</p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Puan</th>
                  <th>Göz açma (G)</th>
                  <th>Sözel yanıt (S)</th>
                  <th>Motor yanıt (M)</th>
                </tr>
              </thead>
              <tbody>
                {GKS_SATIRLAR.map(([p, g, s, m]) => (
                  <tr key={p}>
                    <td>{p}</td>
                    <td>{g}</td>
                    <td>{s}</td>
                    <td>{m}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 id="yorum">GKS puanı nasıl yorumlanır?</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Toplam</th>
                  <th>Bilinç bozukluğu</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>13–15</td>
                  <td>Hafif</td>
                </tr>
                <tr>
                  <td>9–12</td>
                  <td>Orta</td>
                </tr>
                <tr>
                  <td>3–8</td>
                  <td>Ağır (koma)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Örnek: sesle gözünü açan (G3), konfüze konuşan (S4) ve ağrılı uyaranı lokalize eden (M5) bir hastanın GKS&apos;si
            12&apos;dir ve orta düzey bilinç bozukluğuna karşılık gelir. Toplam puan tek başına yeterli değildir; aynı toplam
            farklı bileşenlerle oluşabildiği için üç alt puanın ayrı kaydedilmesi önerilir. Bu araç klinik değerlendirmenin
            yerine geçmez.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>Glasgow Koma Skalası (GKS) puanları ne anlama gelir?</strong>
            <br />
            GKS 3 ile 15 arasında değişir: 13-15 hafif, 9-12 orta, 3-8
            şiddetli bilinç bozukluğunu gösterir.
          </p>
          <p>
            <strong>Hasta entübeyse sözel yanıt nasıl puanlanır?</strong>
            <br />
            Hasta entübe veya trakeostomili ise sözel yanıt
            değerlendirilemez ve genellikle skora &quot;T&quot; notu
            düşülerek belirtilir.
          </p>

          <h2>Diğer Risk Skorlama Araçları</h2>
          <ul className="related-conversion-list">
            <li><Link href="/apgar-skoru-hesaplama">Apgar Skoru Hesaplama</Link></li>
            <li><Link href="/meld-skoru-hesaplama">MELD Skoru Hesaplama</Link></li>
            <li><Link href="/sofa-skoru-hesaplama">SOFA Skoru Hesaplama</Link></li>
            <li><Link href="/qsofa-hesaplama">qSOFA Hesaplama</Link></li>
            <li><Link href="/wells-skoru-hesaplama">Wells Skoru Hesaplama</Link></li>
            <li><Link href="/cha2ds2-vasc-skoru-hesaplama">CHA2DS2-VASc Skoru Hesaplama</Link></li>
          </ul>

          <h2>İlgili araçlar</h2>
          <p>
            Diğer doktor ve hemşire araçları için{" "}
            <Link href="/hesaplayicilar#klinik">Klinik Skorlar</Link>{" "}
            sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Skala, Teasdale G, Jennett B (1974), &quot;Assessment of
            coma and impaired consciousness&quot;, The Lancet
            yayınına dayanmaktadır. Bu araç tıbbi tavsiye yerine
            geçmez; klinik değerlendirme için bir hekime
            danışılmalıdır.
          </p>
        </section>
      </div>
    </main>
  );
}
