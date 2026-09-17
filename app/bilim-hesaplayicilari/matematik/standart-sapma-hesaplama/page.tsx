import type { Metadata } from "next";
import Link from "next/link";
import StatisticsCalculator from "../../../components/StatisticsCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Standart sapma nasıl hesaplanır?",
    answer:
      "Standart sapma, varyansın kareköküdür. Önce ortalama bulunur, her verinin ortalamadan farkının karesi alınıp toplanır, bu toplam veri sayısına (kütle) veya veri sayısının bir eksiğine (örneklem) bölünür, sonra karekökü alınır.",
  },
  {
    question: "Kütle ve örneklem standart sapması arasındaki fark nedir?",
    answer:
      "Elindeki veri incelemek istediğin grubun TAMAMIYSA (örneğin bir sınıftaki tüm öğrenciler) kütle (popülasyon) standart sapması kullanılır ve n'e bölünür. Elindeki veri daha büyük bir grubun sadece bir örneklemiyse, örneklem standart sapması kullanılır ve n-1'e bölünür — bu 'Bessel düzeltmesi', küçük örneklemlerin gerçek yayılımı olduğundan az tahmin etmesini önler.",
  },
  {
    question: "Düşük ve yüksek standart sapma ne anlama gelir?",
    answer:
      "Düşük standart sapma, verilerin ortalamaya yakın kümelendiğini (tutarlı, az değişken bir veri seti); yüksek standart sapma ise verilerin ortalamadan geniş bir aralıkta dağıldığını (değişken, tutarsız bir veri seti) gösterir. Örneğin iki sınıfın da ortalaması 70 olabilir, ama biri 65-75 arası (düşük standart sapma), diğeri 30-100 arası (yüksek standart sapma) dağılmış olabilir.",
  },
];

export const metadata: Metadata = {
  title: "Standart Sapma Hesaplama",
  description:
    "Bir veri listesinin standart sapmasını (kütle veya örneklem) adım adım hesapla — ortalama ve varyans otomatik gösterilir.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/matematik/standart-sapma-hesaplama",
  },
  openGraph: {
    title: "Standart Sapma Hesaplama",
    description: "Veri listenizin standart sapmasını anında hesaplayın.",
    url: buildSiteUrl("/bilim-hesaplayicilari/matematik/standart-sapma-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function StandartSapmaHesaplamaPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Bilim Hesaplayıcıları", item: buildSiteUrl("/bilim-hesaplayicilari") },
      { "@type": "ListItem", position: 3, name: "Matematik", item: buildSiteUrl("/bilim-hesaplayicilari/matematik") },
      { "@type": "ListItem", position: 4, name: "Standart Sapma Hesaplama", item: buildSiteUrl("/bilim-hesaplayicilari/matematik/standart-sapma-hesaplama") },
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
          <span>Standart Sapma Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Standart Sapma Hesaplama</h1>
          <p>
            Bir veri listesinin standart sapmasını adım adım hesapla —
            hem kütle (popülasyon) hem örneklem standart sapması
            otomatik gösterilir.
          </p>
        </header>

        <div className="unit-page-layout wide-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>Standart sapma nedir?</h2>
          <p>
            <strong>Standart sapma</strong>, bir veri setindeki
            değerlerin ortalamadan ortalama olarak ne kadar uzaklaştığını
            gösteren, en yaygın kullanılan yayılım (dağılım) ölçüsüdür.
            Varyansın kareköküdür ve bu sayede orijinal veriyle aynı
            birimde olur — bu da yorumlanmasını varyanstan çok daha
            kolay kılar.
          </p>

          <h2>Standart sapma formülü</h2>
          <p>
            Kütle standart sapması σ = √(Σ(x - x̄)² / n), örneklem
            standart sapması ise s = √(Σ(x - x̄)² / (n-1)) formülüyle
            hesaplanır. Burada x her bir veriyi, x̄ ortalamayı, n veri
            sayısını ifade eder.
          </p>

          <h2>Standart sapma günlük hayatta neden önemlidir?</h2>
          <p>
            Standart sapma, bir ürünün kalite tutarlılığından (fabrika
            üretiminde ölçü toleransları) finansal yatırımların risk
            seviyesine (bir hissenin fiyat oynaklığı) kadar birçok
            alanda &apos;ne kadar tutarlı/güvenilir&apos; sorusuna cevap
            verir. Aynı ortalama getiriye sahip iki yatırımdan düşük
            standart sapmalı olan, daha öngörülebilir (daha az riskli)
            kabul edilir.
          </p>

          <h2>Normal dağılımda standart sapma kuralı</h2>
          <p>
            Normal (çan eğrisi) dağılıma sahip bir veri setinde, verilerin
            yaklaşık %68&apos;i ortalamanın ±1 standart sapma aralığında,
            %95&apos;i ±2 standart sapma aralığında, %99,7&apos;si ise ±3
            standart sapma aralığında yer alır — bu, istatistikte
            &apos;68-95-99,7 kuralı&apos; olarak bilinir.
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
            Ortalama, medyan ve mod ile birlikte hesaplamak için{" "}
            <Link href="/bilim-hesaplayicilari/matematik/ortalama-hesaplama">Ortalama Hesaplama</Link>,{" "}
            sadece varyans için{" "}
            <Link href="/bilim-hesaplayicilari/matematik/varyans-hesaplama">Varyans Hesaplama</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Standart sapma tanımı ve hesaplama yöntemi standart lise ve
            AYT istatistik müfredatına dayanır.
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
