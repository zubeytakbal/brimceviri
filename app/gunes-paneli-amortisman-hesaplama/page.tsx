import type { Metadata } from "next";
import Link from "next/link";
import EmbedCodeBox from "../components/EmbedCodeBox";
import SolarPanelPaybackCalculator from "../components/SolarPanelPaybackCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Güneş paneli kaç yılda kendini çıkarır?",
    answer:
      "Türkiye'de konut güneş enerjisi sistemlerinin amortisman süresi genellikle 4-7 yıl arasındadır; güneşlenmesi yüksek bölgelerde (Akdeniz, Ege, Güneydoğu) bu süre daha kısa, Karadeniz gibi bölgelerde daha uzun olur. Kendi sistem gücün, bölgen ve kurulum maliyetinle kesin süreyi yukarıdaki hesaplayıcıdan görebilirsin.",
  },
  {
    question: "1 kWp güneş paneli yılda ne kadar elektrik üretir?",
    answer:
      "Türkiye'de bölgeye göre değişmekle birlikte, 1 kWp'lik bir sistem yılda yaklaşık 1250-1700 kWh elektrik üretir. Akdeniz ve Güneydoğu Anadolu en yüksek, Karadeniz en düşük üretim değerlerine sahiptir.",
  },
  {
    question: "Fazla üretilen elektrik ne olur?",
    answer:
      "Şebekeye bağlı (on-grid) sistemlerde, tüketiminizi aşan üretim mahsuplaşma yoluyla şebekeye aktarılır ve genellikle perakende satış fiyatından daha düşük bir bedelle karşılığınıza yansır. Bu hesaplayıcı basitlik için tüm üretimin kendi tüketiminizde kullanıldığını varsayar; gerçek tasarrufunuz tüketim profilinize göre biraz farklı olabilir.",
  },
];

export const metadata: Metadata = {
  title: "Güneş Paneli Amortisman Hesaplama (Kaç Yılda Kendini Çıkarır?)",
  description:
    "Sistem gücün, bölgen ve elektrik fiyatınla güneş panelinin yıllık ürettiği elektriği, tasarrufu ve kaç yılda kendini çıkardığını hesapla.",
  alternates: {
    canonical: "/gunes-paneli-amortisman-hesaplama",
  },
  openGraph: {
    title: "Güneş Paneli Amortisman Hesaplama (Kaç Yılda Kendini Çıkarır?)",
    description: "Kendi rakamlarınla güneş panelinin amortisman süresini hesapla.",
    url: buildSiteUrl("/gunes-paneli-amortisman-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function SolarPanelPaybackPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Güneş Paneli Amortisman Hesaplama", item: buildSiteUrl("/gunes-paneli-amortisman-hesaplama") },
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
          <span>Güneş Paneli Amortisman Hesaplama</span>
        </nav>

        <div className="page-top-row">
          <header className="all-conversions-header">
            <h1>Güneş Paneli Amortisman Hesaplama</h1>
            <p>
              Sistem gücün, bölgen ve elektrik fiyatınla güneş
              panelinin yıllık ürettiği elektriği, tasarrufu ve kaç
              yılda kendini çıkardığını hesapla.
            </p>
          </header>

          <EmbedCodeBox
            embedPath="/embed/gunes-paneli-amortisman-hesaplama"
            title="Güneş Paneli Amortisman Hesaplama"
            height={680}
            maxWidth={560}
          />
        </div>

        <SolarPanelPaybackCalculator />

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
            Elektrik tüketimi hesaplamaları için{" "}
            <Link href="/elektrik-tuketimi-hesaplama">Elektrik Tüketimi Hesaplama</Link>
            {" "}sayfasına, yalıtım amortismanı için{" "}
            <Link href="/yalitim-amortisman-hesaplama">Yalıtım Amortisman Hesaplama</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Bölgesel verim değerleri, Türkiye güneş enerjisi
            potansiyeli haritalarındaki tipik kWh/kWp/yıl
            aralıklarına dayanır.
          </p>
        </section>
      </div>
    </main>
  );
}
