import type { Metadata } from "next";
import Link from "next/link";
import EmbedCodeBox from "../components/EmbedCodeBox";
import InsulationPaybackCalculator from "../components/InsulationPaybackCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Yalıtım yaptırmak kaç yılda kendini çıkarır?",
    answer:
      "Bu, duvarının mevcut durumuna, eklenen yalıtımın kalınlık ve malzemesine, bölgenin iklimine ve ısıtma enerjisi fiyatına bağlıdır. Genel olarak Türkiye'de dış duvar yalıtımı 2-6 yıl arasında kendini çıkarabilir; kesin süre için yukarıdaki hesaplayıcıya kendi rakamlarını gir.",
  },
  {
    question: "Yalıtım kalınlığı arttıkça tasarruf da orantılı artar mı?",
    answer:
      "Hayır. Isıl direnç (R) kalınlıkla doğru orantılı artsa da, ısı kaybındaki azalma R'nin tersiyle ilişkilidir — yani belli bir kalınlıktan sonra ek her santimetre, öncekinden daha az ek tasarruf sağlar (azalan verim). Bu yüzden çok kalın yalıtım her zaman ekonomik olmayabilir.",
  },
  {
    question: "Bu hesaplama neyi kapsamıyor?",
    answer:
      "Yalnızca duvardan ısı iletimiyle (kondüksiyon) olan kaybı modeller. Pencere, kapı, çatı, hava sızdırmazlığı, güneş kazancı gibi diğer etkenler dahil değildir; gerçek enerji kimlik belgesi hesaplamaları çok daha kapsamlıdır.",
  },
];

export const metadata: Metadata = {
  title: "Yalıtım Amortisman Hesaplama (Kaç Yılda Kendini Çıkarır?)",
  description:
    "Duvar alanı, mevcut duvar ve eklenecek yalıtım malzemesiyle yıllık enerji tasarrufunu ve yalıtımın kaç yılda kendini çıkardığını hesapla.",
  alternates: {
    canonical: "/yalitim-amortisman-hesaplama",
  },
  openGraph: {
    title: "Yalıtım Amortisman Hesaplama (Kaç Yılda Kendini Çıkarır?)",
    description: "Kendi rakamlarınla yalıtımın kaç yılda kendini çıkardığını hesapla.",
    url: buildSiteUrl("/yalitim-amortisman-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function InsulationPaybackPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Yalıtım Amortisman Hesaplama", item: buildSiteUrl("/yalitim-amortisman-hesaplama") },
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
          <span>Yalıtım Amortisman Hesaplama</span>
        </nav>

        <div className="page-top-row">
          <header className="all-conversions-header">
            <h1>Yalıtım Amortisman Hesaplama</h1>
            <p>
              Duvar alanı, mevcut duvar ve eklenecek yalıtım malzemesiyle
              yıllık enerji tasarrufunu ve yalıtımın kaç yılda kendini
              çıkardığını hesapla.
            </p>
          </header>

          <EmbedCodeBox
            embedPath="/embed/yalitim-amortisman-hesaplama"
            title="Yalıtım Amortisman Hesaplama"
            height={780}
            maxWidth={560}
          />
        </div>

        <InsulationPaybackCalculator />

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
            Isı iletimi ve malzeme ısıl iletkenlik tablosu için{" "}
            <Link href="/hesaplayicilar/isi-iletimi">Isı İletimi Hesaplayıcısı</Link>
            {" "}sayfasına, diğer inşaat hesaplamaları için{" "}
            <Link href="/insaatci-araclari">İnşaatçı Araçları</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Duvar ve yalıtım malzemesi ısıl iletkenlik değerleri TS 825
            standardı kapsamındaki tipik referans aralıklarına
            dayanır; hesaplama, seri ısıl direnç (R = kalınlık/λ)
            prensibine göre yapılır.
          </p>
        </section>
      </div>
    </main>
  );
}
