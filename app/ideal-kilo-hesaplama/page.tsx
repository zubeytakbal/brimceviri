import type { Metadata } from "next";
import Link from "next/link";
import IdealWeightCalculator from "../components/IdealWeightCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "İdeal kilo ile BMI'ye göre normal kilo aynı şey mi?",
    answer:
      "Hayır, farklı yöntemlerdir. BMI, kilonun boyun karesine bölünmesiyle geniş bir 'normal' aralık verir. İdeal kilo (Devine formülü) ise yalnızca boya dayalı tek bir referans değer üretir ve klinik ortamda ilaç dozlaması gibi hesaplamalarda kullanılır. İkisi birbirini tamamlayan, farklı amaçlı araçlardır.",
  },
  {
    question: "Bu formül herkes için geçerli mi?",
    answer:
      "Devine formülü, kas kütlesi, vücut yapısı veya yaş gibi bireysel farkları hesaba katmaz; genel bir referans noktasıdır. Sporcular veya farklı vücut tipine sahip kişilerde gerçek sağlıklı kilo bu değerden belirgin şekilde sapabilir.",
  },
];

export const metadata: Metadata = {
  title: "İdeal Kilo Hesaplama (Devine Formülü)",
  description:
    "Boy ve cinsiyetini gir; klinik ortamda yaygın kullanılan Devine formülüyle ideal kiloyu anında hesapla.",
  alternates: {
    canonical: "/ideal-kilo-hesaplama",
  },
  openGraph: {
    title: "İdeal Kilo Hesaplama (Devine Formülü)",
    description:
      "Boy ve cinsiyete göre Devine formülüyle ideal kiloyu hesaplayın.",
    url: buildSiteUrl("/ideal-kilo-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function IdealWeightCalculatorPage() {
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
        name: "İdeal Kilo Hesaplama",
        item: buildSiteUrl("/ideal-kilo-hesaplama"),
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
          <span>İdeal Kilo Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>İdeal Kilo Hesaplama</h1>
          <p>
            Boyunu ve cinsiyetini gir: klinik ortamda yaygın kullanılan
            Devine formülüyle ideal kiloyu anında hesapla.
          </p>
        </header>

        <IdealWeightCalculator />

        <section className="category-article-content">
          <h2>Devine formülü nedir?</h2>
          <p>
            1974&apos;te Dr. B.J. Devine tarafından geliştirilen bu
            formül, başlangıçta ilaç dozlaması hesaplamalarında
            kullanılmak üzere tasarlanmış, sonrasında genel bir ideal
            kilo referansı olarak yaygınlaşmıştır:
          </p>
          <p>
            <strong>Erkek: İdeal Kilo (kg) = 50 + 2,3 × (Boy(inç) − 60)</strong>
            <br />
            <strong>Kadın: İdeal Kilo (kg) = 45,5 + 2,3 × (Boy(inç) − 60)</strong>
          </p>
          <p>
            Formül 152,4 cm (60 inç) ve üzeri boylar için tanımlıdır.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>İdeal kilo ile BMI&apos;ye göre normal kilo aynı şey mi?</strong>
            <br />
            Hayır, farklı yöntemlerdir. BMI, kilonun boyun karesine
            bölünmesiyle geniş bir &quot;normal&quot; aralık verir.
            İdeal kilo (Devine formülü) ise yalnızca boya dayalı tek
            bir referans değer üretir ve klinik ortamda ilaç dozlaması
            gibi hesaplamalarda kullanılır.
          </p>
          <p>
            <strong>Bu formül herkes için geçerli mi?</strong>
            <br />
            Devine formülü, kas kütlesi, vücut yapısı veya yaş gibi
            bireysel farkları hesaba katmaz; genel bir referans
            noktasıdır. Sporcular veya farklı vücut tipine sahip
            kişilerde gerçek sağlıklı kilo bu değerden belirgin şekilde
            sapabilir.
          </p>

          <h2>İlgili araçlar</h2>
          <p>
            BMI ve günlük kalori ihtiyacın için{" "}
            <Link href="/bmi-hesaplama">BMI Hesaplama</Link>, vücut yağ
            oranın için{" "}
            <Link href="/vucut-yag-orani-hesaplama">
              Vücut Yağ Oranı Hesaplama
            </Link>
            , sağlık ve fitness ile ilgili diğer araçlar için{" "}
            <Link href="/diyetisyen-araclari">Diyetisyen Araçları</Link>{" "}
            sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Formül, Dr. B.J. Devine&apos;in 1974&apos;te yayımladığı ve
            klinik ortamda hâlâ yaygın kullanılan ideal vücut ağırlığı
            tahmin yöntemine dayanmaktadır. Bu araç tıbbi tavsiye
            yerine geçmez.
          </p>
        </section>
      </div>
    </main>
  );
}
