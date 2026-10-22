import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import ColorCodeCalculator from "../components/ColorCodeCalculator";
import { hexToRgb, rgbToHsl } from "../converter/colorCodeCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "HEX renk kodu nedir?",
    answer:
      "HEX, kırmızı/yeşil/mavi (RGB) bileşenlerini 00-FF arasında onaltılık sayılarla ifade eden, CSS ve tasarım araçlarında en yaygın kullanılan renk gösterimidir; örneğin #367DA5.",
  },
  {
    question: "RGB ile HSL arasındaki fark nedir?",
    answer:
      "RGB rengi kırmızı, yeşil, mavi ışık miktarlarıyla tanımlar. HSL ise aynı rengi ton (hue), doygunluk (saturation) ve parlaklık (lightness) olarak tanımlar; bir rengi koyulaştırıp açmak istediğinde HSL'de sadece lightness değerini değiştirmek yeterlidir.",
  },
];

// Sik kullanilan renkler; RGB ve HSL degerleri sayfa uretilirken ceviriciyle hesaplanir.
const RENKLER: Array<[string, string]> = [
  ["Siyah", "#000000"],
  ["Beyaz", "#FFFFFF"],
  ["Kırmızı", "#FF0000"],
  ["Türk bayrağı kırmızısı", "#E30A17"],
  ["Yeşil (CSS green)", "#008000"],
  ["Mavi", "#0000FF"],
  ["Lacivert (navy)", "#000080"],
  ["Turuncu (orange)", "#FFA500"],
  ["Altın sarısı (gold)", "#FFD700"],
  ["Mor (purple)", "#800080"],
  ["Gri (gray)", "#808080"],
  ["Gümüş (silver)", "#C0C0C0"],
];

export const metadata: Metadata = {
  title: "Renk Kodu Çevirici: HEX, RGB, HSL Dönüşümü",
  description:
    "HEX, RGB ve HSL renk kodları arasında anında çevir; canlı renk önizlemesiyle web ve tasarım projelerinde doğru rengi bul.",
  alternates: {
    canonical: "/renk-kodu-cevirici",
  },
  openGraph: {
    title: "Renk Kodu Çevirici: HEX, RGB, HSL Dönüşümü",
    description: "HEX, RGB ve HSL renk kodları arasında anında çevir.",
    url: buildSiteUrl("/renk-kodu-cevirici"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function ColorCodeCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Yazılımcı Araçları", item: buildSiteUrl("/yazilimci-araclari") },
      { "@type": "ListItem", position: 4, name: "Renk Kodu Çevirici", item: buildSiteUrl("/renk-kodu-cevirici") },
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
          <Link href="/yazilimci-araclari">Yazılımcı Araçları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Renk Kodu Çevirici</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Renk Kodu Çevirici</h1>
          <p>
            HEX, RGB veya HSL alanlarından herhangi birine değer gir;
            diğer ikisi ve renk önizlemesi anında güncellensin.
          </p>
        </header>

        <ColorCodeCalculator />

        <section className="category-article-content">
          <h2>HEX kodu RGB&apos;ye elle nasıl çevrilir?</h2>
          <p>
            HEX kodu altı onaltılık basamaktan oluşur ve ikişerli üç gruba ayrılır: kırmızı, yeşil, mavi. Her grup 0-255 arası bir
            sayıdır. Örneğin <strong>#367DA5</strong>: 36 = 3 × 16 + 6 = 54, 7D = 7 × 16 + 13 = 125, A5 = 10 × 16 + 5 = 165. Sonuç{" "}
            <strong>rgb(54, 125, 165)</strong> olur. Onaltılık sistemde A = 10, B = 11, C = 12, D = 13, E = 14, F = 15&apos;tir. Üç
            basamaklı kısa yazımda (#F80) her basamak iki kez yazılır: #FF8800.
          </p>

          <h2>Sık kullanılan renklerin kodları</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Renk</th>
                  <th>HEX</th>
                  <th>RGB</th>
                  <th>HSL</th>
                </tr>
              </thead>
              <tbody>
                {RENKLER.map(([ad, hex]) => {
                  const rgb = hexToRgb(hex)!;
                  const hsl = rgbToHsl(rgb);
                  return (
                    <tr key={hex}>
                      <td>
                        <span className="color-swatch" style={{ background: hex }} aria-hidden="true" /> {ad}
                      </td>
                      <td>{hex}</td>
                      <td>
                        {rgb.r}, {rgb.g}, {rgb.b}
                      </td>
                      <td>
                        {hsl.h}°, %{hsl.s}, %{hsl.l}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p>
            Türk bayrağı kırmızısı için verilen #E30A17, bayrak kırmızısının ekranda ve web&apos;de yaygın olarak
            kullanılan karşılığıdır; baskıda renk, kâğıt ve mürekkebe göre farklı görünebilir.
          </p>

          <h2>Hangi gösterimi ne zaman kullanmalı?</h2>
          <ul>
            <li>
              <strong>HEX:</strong> Web sitelerinde, CSS&apos;te ve tasarım programlarında renk paylaşmanın en kısa yolu.
            </li>
            <li>
              <strong>RGB:</strong> Ekranların rengi ürettiği biçimdir; saydamlık gerektiğinde rgba(54, 125, 165, 0.5) gibi dördüncü bir değer eklenir.
            </li>
            <li>
              <strong>HSL:</strong> Rengin tonunu koruyup açmak ya da koyulaştırmak için en kolayıdır; bir düğmenin üzerine gelince
              rengini %10 koyulaştırmak için yalnızca L değeri düşürülür.
            </li>
            <li>
              <strong>CMYK:</strong> Matbaa baskısında kullanılır ve bu araçta yoktur; ekran renkleri (RGB) baskıda her zaman birebir
              elde edilemez, bu yüzden baskı işlerinde matbaanın renk profiline bakılmalıdır.
            </li>
          </ul>

          <h2>Sık Sorulan Sorular</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>İlgili araçlar</h2>
          <p>
            Diğer geliştirici araçları için{" "}
            <Link href="/yazilimci-araclari">Yazılımcı Araçları</Link>{" "}
            sayfasına, piksel/DPI hesaplama için{" "}
            <Link href="/piksel-cm-dpi-hesaplama">Piksel, CM ve DPI Hesaplama</Link>
            {" "}sayfasına, sosyal medya görsel boyutları için{" "}
            <Link href="/sosyal-medya-gorsel-boyutlari-hesaplama">Sosyal Medya Görsel Boyutları Hesaplama</Link>
            {" "}sayfasına bakabilirsin.
          </p>
        </section>
      </div>
    </main>
  );
}
