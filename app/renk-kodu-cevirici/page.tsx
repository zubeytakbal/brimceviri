import type { Metadata } from "next";
import Link from "next/link";
import ColorCodeCalculator from "../components/ColorCodeCalculator";
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
            {" "}sayfasına bakabilirsin.
          </p>
        </section>
      </div>
    </main>
  );
}
