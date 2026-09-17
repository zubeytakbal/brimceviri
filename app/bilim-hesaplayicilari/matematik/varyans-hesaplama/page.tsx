import type { Metadata } from "next";
import Link from "next/link";
import StatisticsCalculator from "../../../components/StatisticsCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Varyans nasıl hesaplanır?",
    answer:
      "Önce verilerin ortalaması bulunur. Her verinin ortalamadan farkı alınıp karesi hesaplanır. Bu karelerin toplamı, kütle (popülasyon) varyansında veri sayısına (n), örneklem varyansında ise veri sayısının bir eksiğine (n-1) bölünür.",
  },
  {
    question: "Varyans neden farkların karesini alır, doğrudan farkı değil?",
    answer:
      "Ortalamadan sapmaların (farkların) toplamı matematiksel olarak her zaman sıfır çıkar — pozitif ve negatif sapmalar birbirini götürür. Kare alınması hem bu sıfırlanma sorununu çözer hem de büyük sapmalara küçük sapmalardan orantısız daha fazla ağırlık verir.",
  },
  {
    question: "Varyans ile standart sapma arasındaki fark nedir?",
    answer:
      "Standart sapma, varyansın kareköküdür. Varyans, birimi orijinal verinin karesi olduğu için (örneğin veriler 'kg' ise varyans 'kg²' cinsindendir) doğrudan yorumlanması zordur; standart sapma karekök alındığı için orijinal veriyle aynı birimde olur ve bu yüzden pratikte daha sık tercih edilir.",
  },
];

export const metadata: Metadata = {
  title: "Varyans Hesaplama",
  description:
    "Bir veri listesinin varyansını (kütle veya örneklem) adım adım hesapla — ortalama, farkların karesi ve sonuç otomatik gösterilir.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/matematik/varyans-hesaplama",
  },
  openGraph: {
    title: "Varyans Hesaplama",
    description: "Veri listenizin varyansını anında hesaplayın.",
    url: buildSiteUrl("/bilim-hesaplayicilari/matematik/varyans-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function VaryansHesaplamaPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Bilim Hesaplayıcıları", item: buildSiteUrl("/bilim-hesaplayicilari") },
      { "@type": "ListItem", position: 3, name: "Matematik", item: buildSiteUrl("/bilim-hesaplayicilari/matematik") },
      { "@type": "ListItem", position: 4, name: "Varyans Hesaplama", item: buildSiteUrl("/bilim-hesaplayicilari/matematik/varyans-hesaplama") },
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
          <span>Varyans Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Varyans Hesaplama</h1>
          <p>
            Bir veri listesinin varyansını adım adım hesapla — hem
            kütle (popülasyon) hem örneklem varyansı otomatik
            gösterilir.
          </p>
        </header>

        <div className="unit-page-layout wide-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>Varyans nedir?</h2>
          <p>
            <strong>Varyans</strong>, bir veri setindeki değerlerin
            ortalamadan ne kadar uzaklaştığının (yayılımının) ölçüsüdür.
            Her verinin ortalamadan farkının karesi alınıp bu kareler
            ortalaması hesaplanarak bulunur.
          </p>

          <h2>Varyans formülü</h2>
          <p>
            Kütle (popülasyon) varyansı σ² = Σ(x - x̄)² / n formülüyle,
            örneklem varyansı ise s² = Σ(x - x̄)² / (n-1) formülüyle
            hesaplanır. Burada x her bir veriyi, x̄ ortalamayı, n ise
            veri sayısını ifade eder. Örneklem varyansındaki (n-1)
            bölümü &apos;Bessel düzeltmesi&apos; olarak bilinir ve küçük
            örneklemlerin gerçek yayılımı olduğundan az tahmin etme
            eğilimini dengeler.
          </p>

          <h2>Kütle mi, örneklem mi?</h2>
          <p>
            Elindeki veri incelemek istediğin GRUBUN TAMAMIYSA (örneğin
            bir sınıftaki tüm öğrencilerin notları), kütle varyansı
            kullanılır. Elindeki veri daha büyük bir grubun sadece bir
            örneklemiyse (örneğin bir şehirdeki tüm hanelerin gelirini
            tahmin etmek için seçilen 100 hane), örneklem varyansı
            kullanılır.
          </p>

          <h2>Varyans neden doğrudan yorumlanması zor bir birimdedir?</h2>
          <p>
            Varyans hesaplanırken farkların karesi alındığı için,
            sonucun birimi orijinal verinin karesidir — örneğin veriler
            santimetre cinsindense varyans &apos;santimetre kare&apos;
            cinsindendir, bu da sezgisel bir yorum yapmayı zorlaştırır.
            Bu yüzden pratikte varyansın kareköktü olan standart sapma
            (orijinal veriyle aynı birimde) daha sık kullanılır.
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
            Ortalama, medyan, mod ve standart sapmayı birlikte
            hesaplamak için{" "}
            <Link href="/bilim-hesaplayicilari/matematik/ortalama-hesaplama">Ortalama Hesaplama</Link>,{" "}
            sadece standart sapma için{" "}
            <Link href="/bilim-hesaplayicilari/matematik/standart-sapma-hesaplama">Standart Sapma Hesaplama</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Varyans tanımı ve hesaplama yöntemi standart lise ve AYT
            istatistik müfredatına dayanır.
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
