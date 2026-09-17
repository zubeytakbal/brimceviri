import type { Metadata } from "next";
import Link from "next/link";
import StatisticsCalculator from "../../../components/StatisticsCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Medyan (ortanca) nasıl hesaplanır?",
    answer:
      "Veriler önce küçükten büyüğe sıralanır. Veri sayısı tekse tam ortadaki değer medyandır. Veri sayısı çiftse, ortadaki iki değerin aritmetik ortalaması alınır. Örneğin 3, 5, 8, 12, 20 verisinde medyan 8'dir (tam ortadaki değer); 4, 8, 15, 16 verisinde ise medyan (8+15)/2 = 11,5'tir.",
  },
  {
    question: "Medyan ile aritmetik ortalama arasındaki fark nedir?",
    answer:
      "Aritmetik ortalama tüm verilerin toplamının veri sayısına bölünmesiyle bulunur ve her veriden etkilenir; bir tek aşırı uç değer (outlier) ortalamayı büyük ölçüde değiştirebilir. Medyan ise yalnızca 'ortadaki' değere bakar, bu yüzden uç değerlerden çok daha az etkilenir.",
  },
  {
    question: "Medyan ne zaman ortalamadan daha güvenilir bir gösterge olur?",
    answer:
      "Veri dağılımı çarpıksa (bazı çok yüksek veya çok düşük uç değerler varsa) medyan daha temsili bir 'tipik değer' verir. Klasik örnek maaş verileridir: birkaç çok yüksek maaş, ortalamayı yukarı çeker ve çoğu çalışanın gerçek maaşından uzaklaştırır; medyan ise bu uç değerlerden etkilenmeden gerçek 'ortanca' maaşı gösterir.",
  },
];

export const metadata: Metadata = {
  title: "Medyan (Ortanca) Hesaplama",
  description:
    "Bir veri listesinin medyanını (ortanca değerini) adım adım hesapla — veri sayısı tek veya çift olsa da doğru sonucu anında gör.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/matematik/medyan-hesaplama",
  },
  openGraph: {
    title: "Medyan (Ortanca) Hesaplama",
    description: "Veri listenizin medyanını anında hesaplayın.",
    url: buildSiteUrl("/bilim-hesaplayicilari/matematik/medyan-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function MedyanHesaplamaPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Bilim Hesaplayıcıları", item: buildSiteUrl("/bilim-hesaplayicilari") },
      { "@type": "ListItem", position: 3, name: "Matematik", item: buildSiteUrl("/bilim-hesaplayicilari/matematik") },
      { "@type": "ListItem", position: 4, name: "Medyan Hesaplama", item: buildSiteUrl("/bilim-hesaplayicilari/matematik/medyan-hesaplama") },
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
          <span>Medyan Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Medyan (Ortanca) Hesaplama</h1>
          <p>
            Bir veri listesinin medyanını (ortanca değerini) adım adım
            hesapla — veriler otomatik sıralanır, tek/çift veri sayısı
            fark etmeksizin doğru sonucu anında gör.
          </p>
        </header>

        <div className="unit-page-layout wide-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>Medyan nedir?</h2>
          <p>
            <strong>Medyan (ortanca)</strong>, bir veri seti küçükten
            büyüğe sıralandığında tam ortada kalan değerdir. Veri sayısı
            tekse doğrudan ortadaki eleman medyandır; çiftse ortadaki iki
            elemanın aritmetik ortalaması alınır.
          </p>

          <h2>Medyan adım adım nasıl bulunur?</h2>
          <p>
            Önce tüm veriler küçükten büyüğe sıralanır. Ardından veri
            sayısı (n) tek mi çift mi kontrol edilir. n tekse, (n+1)/2.
            sıradaki değer medyandır. n çiftse, n/2. ve (n/2 + 1). sıradaki
            iki değerin ortalaması alınır. Örneğin 7 verilik bir sette
            4. sıradaki değer medyandır; 6 verilik bir sette 3. ve 4.
            sıradaki değerlerin ortalaması medyandır.
          </p>

          <h2>Medyan neden uç değerlere karşı dayanıklıdır?</h2>
          <p>
            Medyan yalnızca sıralamadaki konuma bakar, değerlerin
            büyüklüğüne değil. Bu yüzden bir veri setindeki en büyük
            değeri alıp aşırı büyütseniz bile (örneğin 100&apos;ü 100.000
            yapsanız), medyan değişmez — çünkü o değerin sıralamadaki
            konumu (en sonda olması) aynı kalır. Aritmetik ortalama ise
            böyle bir değişiklikte büyük ölçüde kayar.
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
            Ortalama, mod, varyans ve standart sapmayı birlikte
            hesaplamak için{" "}
            <Link href="/bilim-hesaplayicilari/matematik/ortalama-hesaplama">Ortalama Hesaplama</Link>,{" "}
            sadece mod (tepe değer) için{" "}
            <Link href="/bilim-hesaplayicilari/matematik/mod-hesaplama">Mod Hesaplama</Link>,{" "}
            sadece standart sapma için{" "}
            <Link href="/bilim-hesaplayicilari/matematik/standart-sapma-hesaplama">Standart Sapma Hesaplama</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Medyan tanımı ve hesaplama yöntemi standart ortaokul, lise
            ve AYT istatistik müfredatına dayanır.
          </p>
        </section>
        </div>

        <div className="unit-page-converter">
          <StatisticsCalculator />
        </div>
        </div>
      </div>
    </main>
  );
}
