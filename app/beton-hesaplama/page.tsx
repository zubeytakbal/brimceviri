import type { Metadata } from "next";
import Link from "next/link";
import ConcreteCalculator from "../components/ConcreteCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Bir torba çimento kaç kg'dır?",
    answer:
      "Türkiye'de standart çimento torbası 25 kg veya 50 kg olarak satılır; bu araç sonucu 25 kg'lık torba sayısı olarak verir, 50 kg'lık torba kullanıyorsan sonucu ikiye bölebilirsin.",
  },
  {
    question: "Fire payı neden ekleniyor?",
    answer:
      "Karıştırma, dökme ve zemin düzensizlikleri sırasında bir miktar beton kaybı olur. Varsayılan %5 fire payı çoğu proje için yeterlidir; düzensiz zeminlerde veya deneyimsiz ekiplerde bu oranı artırmak daha güvenlidir.",
  },
  {
    question: "Hazır beton mu almalıyım, yoksa kendim mi karıştırmalıyım?",
    answer:
      "Genellikle 3-4 m³'ün üzerindeki dökümlerde hazır beton (transmikser) almak, kendi karıştırmaktan daha ekonomik ve tutarlı sonuç verir. Bu araç, hazır beton sipariş ederken kaç m³ istemen gerektiğini de gösterir.",
  },
  {
    question: "C25 beton sınıfı ne demek?",
    answer:
      "C25, betonun 28 günlük basınç dayanımının yaklaşık 25 MPa (megapaskal) olduğunu belirten standart bir sınıflandırmadır; konut temeli ve döşemelerde yaygın kullanılan bir sınıftır. Farklı projelerde (örn. yüksek yapılar) daha yüksek sınıf beton gerekebilir.",
  },
];

export const metadata: Metadata = {
  title: "Beton Hesaplama: Kaç m³ Beton, Kaç Torba Çimento Gerekir?",
  description:
    "Temel, döşeme veya kolon için gereken beton hacmini, çimento torba sayısını, kum ve çakıl miktarını fire payı dahil anında hesapla.",
  alternates: {
    canonical: "/beton-hesaplama",
  },
  openGraph: {
    title: "Beton Hesaplama: Kaç m³ Beton, Kaç Torba Çimento Gerekir?",
    description:
      "Boyutları gir, gereken beton hacmini ve karışım malzemelerini (çimento, kum, çakıl, su) anında hesapla.",
    url: buildSiteUrl("/beton-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function ConcreteCalculatorPage() {
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
        name: "Beton Hesaplama",
        item: buildSiteUrl("/beton-hesaplama"),
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
          <span>Beton Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Beton Hesaplama</h1>
          <p>
            Temel/döşeme (dikdörtgen) veya kolon (silindir) için gereken
            beton hacmini, çimento torba sayısını, kum ve çakıl miktarını
            fire payı dahil anında hesapla.
          </p>
        </header>

        <ConcreteCalculator />

        <section className="category-article-content">
          <h2>Beton hacmi nasıl hesaplanır?</h2>
          <p>
            Dikdörtgen bir temel veya döşeme için hacim, uzunluk × genişlik
            × kalınlık formülüyle bulunur. Silindirik bir kolon için ise
            hacim, π × yarıçap² × yükseklik formülüyle hesaplanır (yarıçap,
            çapın yarısıdır). Bu araç, girdiğin ölçülere göre doğru
            formülü otomatik uygular.
          </p>

          <h2>Karışım oranları nereden geliyor?</h2>
          <p>
            Sonuçlar, standart C25 beton sınıfının yaygın kullanılan
            karışım oranına dayanır: yaklaşık 1 m³ beton için 350 kg
            çimento, 0,5 m³ kum, 0,8 m³ çakıl (agrega) ve 175 litre su.
            Bu, hazır beton santrallerinin tipik olarak kullandığı bir
            orandır; gerçek oran, kullanılan agrega türüne, beton
            sınıfına ve hava koşullarına göre biraz değişebilir.
          </p>

          <h2>Kendi karıştırdığım beton mu, hazır beton mu?</h2>
          <p>
            Küçük ölçekli işlerde (örn. birkaç kolon veya küçük bir
            döşeme) çimento torbası, kum ve çakılı kendin karıştırabilirsin
            — bu araç sana kaç torba çimento ve ne kadar kum/çakıl
            gerektiğini gösterir. Daha büyük dökümlerde (birkaç metreküpün
            üzerinde) hazır beton (transmikser ile) sipariş etmek hem daha
            hızlı hem de daha tutarlı bir karışım kalitesi sağlar — bu
            durumda &quot;Fire dahil hacim&quot; sonucunu hazır beton firmasına
            m³ cinsinden ihtiyacın olarak iletebilirsin.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>Kaynaklar</h2>
          <p>
            C25 beton karışım oranları, hazır beton santrallerinin ve
            standart inşaat uygulama rehberlerinin yayınladığı yaygın
            değerlerden derlenmiştir.
          </p>
        </section>
      </div>
    </main>
  );
}
