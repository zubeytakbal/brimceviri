import type { Metadata } from "next";
import Link from "next/link";
import PlasterCalculator from "../components/PlasterCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "1 m² sıva için kaç kg alçı/harç gerekir?",
    answer:
      "Bu, sıva kalınlığına ve ürüne göre değişir; iç cephede yaygın kullanılan hazır alçı sıva ürünlerinde 1 cm kalınlık için m² başına yaklaşık 9 kg, çimento esaslı dış cephe sıvalarında ise yaklaşık 16 kg kullanılır. Kesin tüketim, ürünün ambalajındaki tabloya göre değişebilir — bu araçta bu değeri istediğin gibi değiştirebilirsin.",
  },
  {
    question: "Alçı sıva mı, çimento esaslı sıva mı kullanmalıyım?",
    answer:
      "Alçı sıva genellikle nem almayan iç mekanlarda (oturma odası, yatak odası gibi) kullanılır; hafif, kolay uygulanır ve daha az malzeme gerektirir. Çimento esaslı sıva ise dış cepheler, banyo/mutfak gibi nemli alanlar ve nem/su etkisine dayanıklılık gereken yerler için tercih edilir.",
  },
  {
    question: "Sıva kalınlığı genellikle kaç cm olur?",
    answer:
      "İç mekan alçı sıvalarda genellikle 1-2 cm arası bir kalınlık uygulanır; dış cephe çimento esaslı sıvalarda ise duvar düzgünlüğüne göre 1,5-3 cm arasında değişebilir. Çok düzensiz duvarlarda daha kalın bir sıva tabakası gerekebilir.",
  },
  {
    question: "Fire payı neden ekleniyor?",
    answer:
      "Karıştırma, uygulama sırasında dökülme ve duvar yüzeyindeki düzensizlikler nedeniyle bir miktar malzeme kaybı olur. Varsayılan %5 fire payı düzgün duvarlar için yeterlidir; eski veya düzensiz duvarlarda bu oranı %10-15'e çıkarman daha güvenlidir.",
  },
];

export const metadata: Metadata = {
  title: "Sıva Hesaplama: Kaç kg Alçı veya Harç Gerekir?",
  description:
    "Sıvanacak alan, kalınlık ve ürün tüketim değerine göre gereken alçı sıva veya çimento esaslı sıva miktarını ve torba sayısını fire payı dahil hesapla.",
  alternates: {
    canonical: "/siva-hesaplama",
  },
  openGraph: {
    title: "Sıva Hesaplama: Kaç kg Alçı veya Harç Gerekir?",
    description:
      "Alanı ve kalınlığı gir, gereken sıva malzemesini ve torba sayısını anında hesapla.",
    url: buildSiteUrl("/siva-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function PlasterCalculatorPage() {
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
        name: "Sıva Hesaplama",
        item: buildSiteUrl("/siva-hesaplama"),
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
          <span>Sıva Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Sıva Hesaplama</h1>
          <p>
            Alçı sıva (iç cephe) veya çimento esaslı sıva (dış cephe) için
            sıvanacak alan ve kalınlığa göre gereken malzeme miktarını ve
            torba sayısını fire payı dahil anında hesapla.
          </p>
        </header>

        <PlasterCalculator />

        <section className="category-article-content">
          <h2>Sıva miktarı nasıl hesaplanır?</h2>
          <p>
            Gereken sıva malzemesi, sıvanacak alan (m²) × kalınlık (cm) ×
            ürünün m² başına 1 cm için tükettiği kg formülüyle hesaplanır.
            Bu tüketim değeri ürüne göre değişir; bu yüzden araçta
            varsayılan bir değer sunulur ama kullandığın ürünün
            ambalajındaki tabloya göre değiştirebilirsin.
          </p>

          <h2>Alçı sıva mı, çimento esaslı sıva mı?</h2>
          <p>
            <strong>Alçı sıva</strong>, nem almayan iç mekanlarda
            kullanılan hafif ve kolay uygulanan bir malzemedir; 1 cm
            kalınlık için genellikle m² başına yaklaşık 9 kg tüketilir.{" "}
            <strong>Çimento esaslı sıva</strong> ise dış cephe ve nemli
            alanlar (banyo, mutfak) için tercih edilir, su ve neme karşı
            daha dayanıklıdır; 1 cm kalınlık için genellikle m² başına
            yaklaşık 16 kg tüketilir. Bu rakamlar yaygın ürünlere dayanan
            genel değerlerdir, resmi/sabit bir standart değildir.
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
            m² başına kg tüketim değerleri, yaygın hazır alçı sıva ve
            çimento esaslı sıva ürünlerinin ambalajlarında yayınlanan tipik
            tüketim tablolarından derlenmiştir; ürüne göre değişebilir.
          </p>
        </section>
      </div>
    </main>
  );
}
