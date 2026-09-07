import type { Metadata } from "next";
import Link from "next/link";
import TravelPlugVoltageCalculator from "../components/TravelPlugVoltageCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Adaptör mü, dönüştürücü mü gerekiyor?",
    answer:
      "Adaptör sadece fişin prize fiziksel olarak uyması için gereklidir, voltajı değiştirmez. Dönüştürücü ise voltajı değiştirir. Çoğu telefon, laptop ve kamera şarj cihazı '100-240V' yazdığı için çift voltajlıdır ve sadece adaptöre ihtiyaç duyar; saç kurutma makinesi, ütü gibi tek voltajlı cihazlar için dönüştürücü de gerekebilir.",
  },
  {
    question: "Cihazımın çift voltajlı olup olmadığını nasıl anlarım?",
    answer:
      "Cihazın şarj adaptörü veya kendisinin üzerindeki etikete bak. '100-240V, 50/60Hz' yazıyorsa çift voltajlıdır ve dünyanın her yerinde çalışır, sadece priz şekli için adaptöre ihtiyacın olabilir. Sadece '230V' veya '120V' gibi tek bir değer yazıyorsa, farklı voltajlı bir ülkede dönüştürücü kullanman gerekir.",
  },
  {
    question: "Türkiye'den giderken en çok hangi ülkelerde adaptöre ihtiyaç var?",
    answer:
      "Türkiye Tip C ve F priz kullanır (Avrupa standardı). Bu yüzden çoğu Avrupa ülkesinde adaptöre gerek yoktur. Ancak İngiltere, İrlanda, Malta gibi Tip G kullanan ülkelere; ABD, Kanada gibi Tip A/B kullanan ülkelere; Hindistan gibi Tip D/M kullanan ülkelere giderken mutlaka adaptör gerekir.",
  },
];

export const metadata: Metadata = {
  title: "Seyahat Priz ve Voltaj Uyumluluk Hesaplama",
  description:
    "Gideceğin ülkeye adaptör mü dönüştürücü mü götürmen gerektiğini hesapla: ülkeni ve varış ülkeni seç, priz tipi, voltaj ve frekans uyumunu anında gör.",
  alternates: {
    canonical: "/seyahat-priz-voltaj-hesaplama",
  },
  openGraph: {
    title: "Seyahat Priz ve Voltaj Uyumluluk Hesaplama",
    description: "İki ülke seç, adaptöre veya dönüştürücüye ihtiyacın olup olmadığını hesapla.",
    url: buildSiteUrl("/seyahat-priz-voltaj-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function TravelPlugVoltagePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Seyahat Priz ve Voltaj Uyumluluk Hesaplama", item: buildSiteUrl("/seyahat-priz-voltaj-hesaplama") },
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
          <span>Seyahat Priz ve Voltaj Uyumluluk Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Seyahat Priz ve Voltaj Uyumluluk Hesaplama</h1>
          <p>
            Geldiğin ülkeyi ve gideceğin ülkeyi seç; priz tipi,
            voltaj ve frekans farkına göre adaptöre veya voltaj
            dönüştürücüye ihtiyacın olup olmadığını anında hesapla.
          </p>
        </header>

        <TravelPlugVoltageCalculator />

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
            Elektrik hesaplamaları için{" "}
            <Link href="/kategoriler/elektrik">Elektrik Dönüşümleri</Link>
            {" "}sayfasına, döviz hesaplamaları için{" "}
            <Link href="/doviz-cevirici">Döviz Çevirici</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Voltaj, frekans ve priz tipi verileri, ülkelerin resmi
            elektrik altyapı standartlarını derleyen güncel
            referans kaynaklarından çapraz kontrol edilmiştir. Bu
            standartlar devlet düzeyinde belirlendiği için son derece
            durağandır, ancak bazı ülkelerde (örneğin Brezilya) bölgeye
            göre voltaj farklılık gösterebilir; kritik cihazlar için
            seyahat öncesi cihazının kendi etiketini kontrol etmen
            önerilir.
          </p>
        </section>
      </div>
    </main>
  );
}
