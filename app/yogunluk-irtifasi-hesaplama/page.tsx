import type { Metadata } from "next";
import Link from "next/link";
import DensityAltitudeCalculator from "../components/DensityAltitudeCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Yoğunluk irtifası (density altitude) nedir, neden önemli?",
    answer:
      "Yoğunluk irtifası, hava sıcaklığı ve basıncın uçak performansına etkisini tek bir 'eşdeğer irtifa' değerinde özetler. Sıcak ve/veya yüksek irtifalı havaalanlarında hava yoğunluğu azalır; bu da motor gücünü, kanat kaldırma kuvvetini ve pervane verimini düşürür — sonuç olarak kalkış mesafesi uzar, tırmanma oranı azalır.",
  },
  {
    question: "Basınç irtifasını nasıl bulurum?",
    answer:
      "Altimetreyi standart basınca (1013,25 hPa / 29,92 inHg) ayarladığında okunan değer basınç irtifasıdır. Sahada bu genellikle alan yüksekliğine yakın bir değerdir; QNH standarttan farklıysa (1013,25 hPa − QNH) × 30 kadar fitlik bir düzeltme eklenir.",
  },
];

export const metadata: Metadata = {
  title: "Yoğunluk İrtifası Hesaplama (Density Altitude)",
  description:
    "Basınç irtifası ve dış hava sıcaklığından (OAT), standart FAA kısayol formülüyle yoğunluk irtifasını (density altitude) hesapla.",
  alternates: {
    canonical: "/yogunluk-irtifasi-hesaplama",
  },
  openGraph: {
    title: "Yoğunluk İrtifası Hesaplama (Density Altitude)",
    description:
      "Basınç irtifası ve dış hava sıcaklığından yoğunluk irtifasını hesaplayın.",
    url: buildSiteUrl("/yogunluk-irtifasi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function DensityAltitudeCalculatorPage() {
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
        name: "Yoğunluk İrtifası Hesaplama",
        item: buildSiteUrl("/yogunluk-irtifasi-hesaplama"),
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
          <span>Yoğunluk İrtifası Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Yoğunluk İrtifası Hesaplama</h1>
          <p>
            Basınç irtifasını ve dış hava sıcaklığını (OAT) gir:
            standart FAA kısayol formülüyle yoğunluk irtifasını anında
            hesapla.
          </p>
        </header>

        <DensityAltitudeCalculator />

        <section className="category-article-content">
          <h2>Yoğunluk irtifası nasıl hesaplanır?</h2>
          <p>
            Önce o basınç irtifasındaki standart (ISA) sıcaklık
            bulunur:{" "}
            <strong>
              ISA Sıcaklığı (°C) = 15 − 2 × (Basınç İrtifası / 1000)
            </strong>
            . Ardından gerçek sıcaklığın (OAT) bu standarttan ne kadar
            saptığı, basınç irtifasına eklenir:{" "}
            <strong>
              Yoğunluk İrtifası = Basınç İrtifası + 120 × (OAT − ISA
              Sıcaklığı)
            </strong>
            . Bu, uçuş eğitiminde yaygın kullanılan FAA kısayol
            formülüdür.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>
              Yoğunluk irtifası (density altitude) nedir, neden önemli?
            </strong>
            <br />
            Yoğunluk irtifası, hava sıcaklığı ve basıncın uçak
            performansına etkisini tek bir &quot;eşdeğer irtifa&quot;
            değerinde özetler. Sıcak ve/veya yüksek irtifalı
            havaalanlarında hava yoğunluğu azalır; bu da motor gücünü,
            kanat kaldırma kuvvetini ve pervane verimini düşürür —
            sonuç olarak kalkış mesafesi uzar, tırmanma oranı azalır.
          </p>
          <p>
            <strong>Basınç irtifasını nasıl bulurum?</strong>
            <br />
            Altimetreyi standart basınca (1013,25 hPa / 29,92 inHg)
            ayarladığında okunan değer basınç irtifasıdır. Sahada bu
            genellikle alan yüksekliğine yakın bir değerdir; QNH
            standarttan farklıysa (1013,25 hPa − QNH) × 30 kadar
            fitlik bir düzeltme eklenir.
          </p>

          <h2>İlgili araçlar</h2>
          <p>
            Diğer pilot araçları için{" "}
            <Link href="/pilot-araclari">Pilot Araçları</Link> sayfasına
            bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Yoğunluk irtifası formülü, uçuş eğitiminde (FAA ve benzeri)
            yaygın kullanılan standart yaklaşık hesaplama yöntemine
            dayanmaktadır. Bu araç genel bilgilendirme ve ön çalışma
            amaçlıdır; gerçek uçuş planlaması için uçağın performans el
            kitabı (POH/AFM) esas alınmalıdır.
          </p>
        </section>
      </div>
    </main>
  );
}
