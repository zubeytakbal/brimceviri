import type { Metadata } from "next";
import Link from "next/link";
import ElongationCalculator from "../components/ElongationCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Elastisite modülü (Young modülü) nedir?",
    answer:
      "Elastisite modülü, bir malzemenin elastik bölgede gerilmeye karşı ne kadar dirençli olduğunu gösteren bir sabittir (σ = E × ε). Değer ne kadar yüksekse, malzeme o kadar rijittir (aynı gerilme altında daha az uzar).",
  },
  {
    question: "Elastik uzama nasıl hesaplanır?",
    answer:
      "Önce gerilme σ = F / A (Kuvvet / Kesit Alanı) hesaplanır. Ardından birim şekil değiştirme ε = σ / E bulunur. Son olarak uzama ΔL = ε × L₀ (Başlangıç Uzunluğu) formülüyle hesaplanır.",
  },
  {
    question: "Bu hesap her kuvvet değeri için geçerli midir?",
    answer:
      "Hayır. Bu formül yalnızca malzemenin elastik bölgesinde (kuvvet kaldırıldığında eski haline döndüğü aralıkta) geçerlidir. Akma sınırının üzerindeki kuvvetlerde kalıcı (plastik) şekil değişimi oluşur ve bu basit formül geçerliliğini yitirir.",
  },
];

export const metadata: Metadata = {
  title: "Elastik Uzama Hesaplama (Hooke Yasası)",
  description:
    "Malzeme seç, kuvvet, kesit alanı ve başlangıç uzunluğunu gir: Hooke Yasası ile gerilmeyi ve elastik uzamayı hesapla. Elastisite modülü tablosu dahil.",
  alternates: {
    canonical: "/elastik-uzama-hesaplama",
  },
  openGraph: {
    title: "Elastik Uzama Hesaplama (Hooke Yasası)",
    description: "Kuvvet, kesit alanı ve uzunluktan elastik uzamayı hesapla.",
    url: buildSiteUrl("/elastik-uzama-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function ElongationCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Elastik Uzama Hesaplama", item: buildSiteUrl("/elastik-uzama-hesaplama") },
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
          <span>Elastik Uzama Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Elastik Uzama Hesaplama</h1>
          <p>
            Malzeme seç, kuvvet, kesit alanı ve başlangıç uzunluğunu
            gir: Hooke Yasası ile gerilmeyi (σ) ve elastik uzamayı
            (ΔL) hesapla. Altta elastisite modülü tablosunu da
            bulabilirsin.
          </p>
        </header>

        <ElongationCalculator />

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
            İnşaat hesaplamaları için{" "}
            <Link href="/insaatci-araclari">İnşaatçı Araçları</Link>
            {" "}sayfasına, mimar araçları için{" "}
            <Link href="/mimar-araclari">Mimar Araçları</Link>
            {" "}sayfasına, malzeme yoğunluğu ve diğer özellikleri için{" "}
            <Link href="/malzeme-ozellikleri">Malzeme Özellikleri</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Formül, malzeme mukavemetinde standart kabul edilen Hooke
            Yasası&apos;na (σ = Eε) dayanır. Elastisite modülü
            değerleri genel mühendislik referanslarıdır; kritik
            tasarımlarda malzeme sertifikası esas alınmalıdır.
          </p>
        </section>
      </div>
    </main>
  );
}
