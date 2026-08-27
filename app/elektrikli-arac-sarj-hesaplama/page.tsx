import type { Metadata } from "next";
import Link from "next/link";
import EvChargingCalculator from "../components/EvChargingCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Şarj süresi hesaplamasında verimlilik neden önemli?",
    answer:
      "Şarj sırasında bataryaya aktarılan enerjinin bir kısmı ısı olarak kaybolur; AC şarjda bu kayıp genelde %10-15, DC hızlı şarjda daha düşüktür. Varsayılan %90 verimlilik ortalama bir tahmindir.",
  },
  {
    question: "Menzil hesaplaması neden tahmini?",
    answer:
      "Gerçek menzil; hız, hava sıcaklığı, klima/kalorifer kullanımı, yük ve sürüş tarzına göre değişir. Bu araç, aracın ortalama tüketim değerine (kWh/100km) göre teorik bir tahmin verir.",
  },
];

export const metadata: Metadata = {
  title: "Elektrikli Araç Şarj Süresi ve Menzil Hesaplama",
  description:
    "Batarya kapasitesi, şarj yüzdesi ve şarj gücünden tahmini şarj süresini; batarya ve tüketimden tahmini menzili hesapla.",
  alternates: {
    canonical: "/elektrikli-arac-sarj-hesaplama",
  },
  openGraph: {
    title: "Elektrikli Araç Şarj Süresi ve Menzil Hesaplama",
    description:
      "Elektrikli araçlar için tahmini şarj süresi ve menzil hesaplayın.",
    url: buildSiteUrl("/elektrikli-arac-sarj-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function EvChargingCalculatorPage() {
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
        name: "Elektrikli Araç Şarj Hesaplama",
        item: buildSiteUrl("/elektrikli-arac-sarj-hesaplama"),
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
          <span>Elektrikli Araç Şarj Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Elektrikli Araç Şarj Süresi ve Menzil Hesaplama</h1>
          <p>
            Şarj süresi mi yoksa menzil mi hesaplamak istediğini seç;
            batarya kapasitesi, şarj gücü veya tüketim değerlerini girerek
            anında tahmini sonucu gör.
          </p>
        </header>

        <EvChargingCalculator />

        <section className="category-article-content">
          <h2>Şarj süresi nasıl hesaplanır?</h2>
          <p>
            Önce gereken enerji miktarı bulunur:{" "}
            <strong>
              Gereken Enerji = Batarya Kapasitesi × (Hedef % − Mevcut %) / 100
            </strong>
            . Ardından bu enerji, şarj cihazının gücüne ve verimliliğine
            bölünerek tahmini süre elde edilir.
          </p>

          <h2>Menzil nasıl hesaplanır?</h2>
          <p>
            <strong>
              Menzil (km) = Batarya Kapasitesi (kWh) / Tüketim (kWh/100km) × 100
            </strong>
            . Örneğin 60 kWh&apos;lik bir batarya, 16 kWh/100km tüketen bir
            araçta teorik olarak yaklaşık 375 km menzil verir.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}
        </section>
      </div>
    </main>
  );
}
