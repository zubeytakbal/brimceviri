import type { Metadata } from "next";
import Link from "next/link";
import BmiCalculator from "../components/BmiCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Kilo vermek/almak istiyorsam bu sayıyı nasıl kullanmalıyım?",
    answer:
      "Günlük kalori ihtiyacın, mevcut kilonu koruman için gereken yaklaşık miktardır. Kilo vermek isteyenler genelde bu değerin biraz altında, kilo almak isteyenler biraz üstünde beslenir — ama büyük değişiklikler öncesi bir diyetisyene danışmak en sağlıklısıdır.",
  },
  {
    question: "Sonuçlar tıbbi tavsiye yerine geçer mi?",
    answer:
      "Hayır. Bu araç genel bir bilgilendirme ve hızlı hesaplama aracıdır; sağlık kararların için bir hekim veya diyetisyene danışmalısın.",
  },
];

export const metadata: Metadata = {
  title: "BMI Hesaplama: Vücut Kitle İndeksi ve Günlük Kalori İhtiyacı",
  description:
    "Boy, kilo, yaş ve aktivite seviyeni gir: vücut kitle indeksini (BMI), kategorini ve günlük kalori ihtiyacını anında hesapla.",
  alternates: {
    canonical: "/bmi-hesaplama",
  },
  openGraph: {
    title: "BMI Hesaplama: Vücut Kitle İndeksi ve Günlük Kalori İhtiyacı",
    description:
      "Vücut kitle indeksini (BMI) ve günlük kalori ihtiyacını hesaplayın.",
    url: buildSiteUrl("/bmi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function BmiCalculatorPage() {
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
        name: "BMI Hesaplama",
        item: buildSiteUrl("/bmi-hesaplama"),
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
          <span>BMI Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>BMI Hesaplama</h1>
          <p>
            Boyunu, kilonu, yaşını, cinsiyetini ve aktivite seviyeni gir:
            vücut kitle indeksini (BMI), kategorini ve günlük kalori
            ihtiyacını anında gör.
          </p>
        </header>

        <BmiCalculator />

        <section className="category-article-content">
          <h2>BMI (vücut kitle indeksi) nedir, nasıl hesaplanır?</h2>
          <p>
            BMI, kilonun boyun karesine bölünmesiyle bulunur:{" "}
            <strong>BMI = Kilo (kg) / Boy² (m²)</strong>. Dünya Sağlık
            Örgütü&apos;nün (WHO) yaygın kullanılan sınıflandırmasına
            göre 18,5 altı &quot;zayıf&quot;, 18,5-24,9 arası
            &quot;normal&quot;, 25-29,9 arası &quot;fazla kilolu&quot; ve
            30 üzeri &quot;obez&quot; kabul edilir.
          </p>
          <p>
            BMI, kas kütlesi yüksek kişilerde (örneğin sporcularda)
            yanıltıcı olabilir çünkü kas dokusu yağdan daha ağırdır;
            genel nüfus için hızlı bir tarama ölçütüdür, tıbbi bir teşhis
            aracı değildir.
          </p>

          <h2>Günlük kalori ihtiyacı nasıl hesaplanıyor?</h2>
          <p>
            Bu araç, bazal metabolizma hızını (BMR — vücudun dinlenme
            halindeyken harcadığı enerji) Mifflin-St Jeor formülüyle
            hesaplar; bu formül, eski Harris-Benedict formülüne göre
            günümüzde daha doğru kabul edilir. BMR daha sonra seçtiğin
            aktivite seviyesine karşılık gelen bir katsayıyla (1,2 ile
            1,9 arası) çarpılarak günlük toplam kalori ihtiyacına (TDEE)
            ulaşılır.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>Kilo vermek/almak istiyorsam bu sayıyı nasıl kullanmalıyım?</strong>
            <br />
            Günlük kalori ihtiyacın, mevcut kilonu koruman için gereken
            yaklaşık miktardır. Kilo vermek isteyenler genelde bu
            değerin biraz altında, kilo almak isteyenler biraz üstünde
            beslenir — ama büyük değişiklikler öncesi bir diyetisyene
            danışmak en sağlıklısıdır.
          </p>
          <p>
            <strong>Sonuçlar tıbbi tavsiye yerine geçer mi?</strong>
            <br />
            Hayır. Bu araç genel bir bilgilendirme ve hızlı hesaplama
            aracıdır; sağlık kararların için bir hekim veya diyetisyene
            danışmalısın.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            BMI kategorileri Dünya Sağlık Örgütü (WHO) sınıflandırmasına,
            kalori hesabı Mifflin-St Jeor (1990) formülüne dayanır.
          </p>
        </section>
      </div>
    </main>
  );
}
