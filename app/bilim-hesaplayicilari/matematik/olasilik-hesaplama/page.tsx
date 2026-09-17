import type { Metadata } from "next";
import Link from "next/link";
import CombinatoricsCalculator from "../../../components/CombinatoricsCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Klasik olasılık nasıl hesaplanır?",
    answer:
      "Klasik (Laplace) olasılıkta P = (istenen durum sayısı) / (toplam durum sayısı) formülü kullanılır. Tüm sonuçların eşit ihtimalli olduğu varsayılır. Örneğin standart bir zarda 4'ten büyük sayı gelme olasılığı, istenen durumlar (5, 6) / toplam durumlar (1, 2, 3, 4, 5, 6) = 2/6 = 1/3'tür.",
  },
  {
    question: "Olasılık değeri hangi aralıkta olur?",
    answer:
      "Olasılık her zaman 0 ile 1 arasında bir değerdir (veya yüzde olarak %0 ile %100 arası). 0, olayın imkansız olduğunu; 1, olayın kesin gerçekleşeceğini gösterir. 0,5 (%50) ise olayın gerçekleşme ile gerçekleşmeme ihtimalinin eşit olduğu anlamına gelir.",
  },
  {
    question: "Permütasyon ve kombinasyon olasılık hesaplarında nasıl kullanılır?",
    answer:
      "Karmaşık olasılık problemlerinde 'toplam durum sayısı' ve 'istenen durum sayısı' genellikle permütasyon (nPr, sıralamanın önemli olduğu durumlarda) veya kombinasyon (nCr, sıralamanın önemli olmadığı durumlarda) ile bulunur. Örneğin bir loto çekilişinde kazanma olasılığını hesaplarken, önce kombinasyon ile toplam olası çekiliş sayısı bulunur, sonra istenen (kazanan) durum sayısına bölünür.",
  },
  {
    question: "Bağımsız olaylarda olasılık nasıl birleştirilir?",
    answer:
      "İki bağımsız olayın İKİSİNİN DE gerçekleşme olasılığı, tekil olasılıklarının çarpımıyla bulunur (P(A ve B) = P(A) × P(B)) — örneğin art arda iki kez yazı gelme olasılığı 0,5 × 0,5 = 0,25'tir. Birbirini dışlayan iki olaydan HERHANGİ BİRİNİN gerçekleşme olasılığı ise tekil olasılıkların toplamıyla bulunur (P(A veya B) = P(A) + P(B)).",
  },
];

export const metadata: Metadata = {
  title: "Olasılık Hesaplama",
  description:
    "Klasik olasılığı adım adım hesapla — istenen ve toplam durum sayısını gir, sonucu kesir/ondalık/yüzde olarak anında gör.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/matematik/olasilik-hesaplama",
  },
  openGraph: {
    title: "Olasılık Hesaplama",
    description: "Klasik olasılık hesaplamalarını adım adım çözün.",
    url: buildSiteUrl("/bilim-hesaplayicilari/matematik/olasilik-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function OlasilikHesaplamaPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Bilim Hesaplayıcıları", item: buildSiteUrl("/bilim-hesaplayicilari") },
      { "@type": "ListItem", position: 3, name: "Matematik", item: buildSiteUrl("/bilim-hesaplayicilari/matematik") },
      { "@type": "ListItem", position: 4, name: "Olasılık Hesaplama", item: buildSiteUrl("/bilim-hesaplayicilari/matematik/olasilik-hesaplama") },
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
          <Link href="/bilim-hesaplayicilari">Bilim Hesaplayıcıları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/bilim-hesaplayicilari/matematik">Matematik</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Olasılık Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Olasılık Hesaplama</h1>
          <p>
            Klasik olasılığı adım adım hesapla — istenen ve toplam
            durum sayısını gir, sonucu kesir, ondalık ve yüzde olarak
            anında gör.
          </p>
        </header>

        <div className="unit-page-layout wide-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>Olasılık nedir?</h2>
          <p>
            <strong>Olasılık</strong>, bir olayın gerçekleşme
            ihtimalinin sayısal ölçüsüdür ve 0 (imkansız) ile 1 (kesin)
            arasında bir değer alır. Klasik (Laplace) olasılıkta tüm
            sonuçların eşit ihtimalli olduğu varsayılır ve P =
            (istenen durum sayısı) / (toplam durum sayısı) formülü
            kullanılır.
          </p>

          <h2>Basit bir olasılık örneği</h2>
          <p>
            Standart bir zar atıldığında çift sayı gelme olasılığını
            hesaplayalım: istenen durumlar (2, 4, 6) 3 tanedir, toplam
            durumlar (1, 2, 3, 4, 5, 6) 6 tanedir. Olasılık = 3/6 = 0,5
            = %50&apos;dir.
          </p>

          <h2>Permütasyon ve kombinasyonla karmaşık olasılık hesapları</h2>
          <p>
            Daha karmaşık problemlerde &quot;toplam durum sayısı&quot; genellikle
            kombinasyon (nCr, sıralama önemsizse) veya permütasyon
            (nPr, sıralama önemliyse) ile bulunur. Örneğin 6 sayıdan
            oluşan bir loto çekilişinde 49 sayıdan 6&apos;sının doğru
            tahmin edilme olasılığını hesaplamak için önce 49C6 ile
            toplam olası kombinasyon sayısı bulunur, sonra 1 (tek doğru
            kombinasyon) bu sayıya bölünür.
          </p>

          <h2>Bağımsız olaylar ve birleşik olasılık</h2>
          <p>
            İki bağımsız olayın İKİSİNİN DE gerçekleşmesi isteniyorsa,
            olasılıklar çarpılır: P(A ve B) = P(A) × P(B). Birbirini
            dışlayan iki olaydan HERHANGİ BİRİNİN gerçekleşmesi
            isteniyorsa, olasılıklar toplanır: P(A veya B) = P(A) +
            P(B). Bu iki temel kural, zar, para ve kart gibi klasik
            olasılık problemlerinin çoğunun çözümünde kullanılır.
          </p>

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
            Permütasyon ve kombinasyon (nPr, nCr) hesaplamak için{" "}
            <Link href="/bilim-hesaplayicilari/matematik/permutasyon-kombinasyon-hesaplama">
              Permütasyon, Kombinasyon ve Olasılık Hesaplama
            </Link>
            , faktöriyel hesaplamak için{" "}
            <Link href="/bilim-hesaplayicilari/matematik/faktoriyel-hesaplama">Faktöriyel Hesaplama</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Klasik olasılık tanımı ve formülü standart lise ve AYT
            matematik müfredatına dayanır.
          </p>
        </section>
        </div>

        <div className="unit-page-converter">
          <CombinatoricsCalculator />
        </div>
        </div>
      </div>
    </main>
  );
}
