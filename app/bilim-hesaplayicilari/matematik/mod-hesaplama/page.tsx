import type { Metadata } from "next";
import Link from "next/link";
import StatisticsCalculator from "../../../components/StatisticsCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Mod (tepe değer) nasıl hesaplanır?",
    answer:
      "Veri setindeki her değerin kaç kez tekrarlandığı sayılır; en yüksek frekansa (tekrar sayısına) sahip değer moddur. Örneğin 2, 3, 3, 5, 7, 7, 7, 9 verisinde 7 üç kez tekrarlandığı için mod 7'dir.",
  },
  {
    question: "Bir veri setinde birden fazla mod olabilir mi?",
    answer:
      "Evet. İki değer aynı (en yüksek) frekansla tekrar ediyorsa veri seti 'bimodal' (iki modlu) olarak adlandırılır; ikiden fazla değer eşit en yüksek frekansa sahipse 'multimodal' (çok modlu) denir. Tüm değerler yalnızca bir kez geçiyorsa, veri setinin modu yoktur.",
  },
  {
    question: "Mod, ortalama ve medyandan nasıl farklıdır?",
    answer:
      "Ortalama ve medyan sayısal büyüklüğe dayanırken, mod yalnızca tekrar sıklığına (frekansa) bakar. Bu yüzden mod, kategorik verilerde (örneğin bir ankette en çok seçilen renk veya marka) kullanılabilen tek merkezi eğilim ölçüsüdür — kategorik veriler sayısal olarak sıralanamadığı için ortalama veya medyan hesaplanamaz.",
  },
];

export const metadata: Metadata = {
  title: "Mod (Tepe Değer) Hesaplama",
  description:
    "Bir veri listesinde en sık tekrarlanan değeri (modu) adım adım hesapla — tek mod, birden fazla mod veya modsuz veri setlerini otomatik tespit et.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/matematik/mod-hesaplama",
  },
  openGraph: {
    title: "Mod (Tepe Değer) Hesaplama",
    description: "Veri listenizin modunu (en sık tekrarlanan değerini) anında hesaplayın.",
    url: buildSiteUrl("/bilim-hesaplayicilari/matematik/mod-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function ModHesaplamaPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Bilim Hesaplayıcıları", item: buildSiteUrl("/bilim-hesaplayicilari") },
      { "@type": "ListItem", position: 3, name: "Matematik", item: buildSiteUrl("/bilim-hesaplayicilari/matematik") },
      { "@type": "ListItem", position: 4, name: "Mod Hesaplama", item: buildSiteUrl("/bilim-hesaplayicilari/matematik/mod-hesaplama") },
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
          <span>Mod Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Mod (Tepe Değer) Hesaplama</h1>
          <p>
            Bir veri listesinde en sık tekrarlanan değeri (modu) adım
            adım hesapla — tek mod, birden fazla mod veya hiç mod
            olmayan durumları otomatik tespit et.
          </p>
        </header>

        <div className="unit-page-layout wide-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>Mod nedir?</h2>
          <p>
            <strong>Mod (tepe değer)</strong>, bir veri setinde en sık
            tekrarlanan değerdir. Ortalama ve medyandan farklı olarak
            mod, verinin büyüklüğüne değil yalnızca tekrar sıklığına
            (frekansına) bakar.
          </p>

          <h2>Mod nasıl bulunur?</h2>
          <p>
            Veri setindeki her benzersiz değerin kaç kez geçtiği sayılır.
            En yüksek tekrar sayısına sahip değer (veya değerler) mod
            olarak belirlenir. Örneğin 4, 4, 6, 8, 8, 8, 9 verisinde 8
            üç kez, 4 iki kez, 6 ve 9 birer kez geçer; en yüksek frekans
            8&apos;de olduğu için mod 8&apos;dir.
          </p>

          <h2>Unimodal, bimodal ve modsuz veri setleri</h2>
          <p>
            Tek bir değer en yüksek frekansa sahipse veri seti
            &apos;unimodal&apos; (tek modlu) denir. İki farklı değer eşit
            şekilde en yüksek frekansa sahipse &apos;bimodal&apos; (iki
            modlu), ikiden fazlaysa &apos;multimodal&apos; (çok modlu)
            olarak adlandırılır. Tüm değerler birer kez geçiyorsa (hiçbir
            değer diğerinden daha sık tekrarlanmıyorsa), veri setinin
            modu yoktur.
          </p>

          <h2>Mod ne zaman kullanışlıdır?</h2>
          <p>
            Mod, özellikle kategorik veya ayrık verilerde (bir sınıfın
            en çok tercih ettiği ders, bir mağazada en çok satılan
            bedeni gibi) tercih edilir çünkü bu tür verilerde ortalama
            veya medyan anlamlı bir sonuç vermeyebilir — örneğin
            &quot;ortalama beden numarası&quot; anlamsızken, &quot;en çok satılan
            beden numarası&quot; (mod) doğrudan işe yarar bir bilgidir.
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
            Ortalama, medyan, varyans ve standart sapmayı birlikte
            hesaplamak için{" "}
            <Link href="/bilim-hesaplayicilari/matematik/ortalama-hesaplama">Ortalama Hesaplama</Link>,{" "}
            sadece medyan için{" "}
            <Link href="/bilim-hesaplayicilari/matematik/medyan-hesaplama">Medyan Hesaplama</Link>,{" "}
            sadece varyans için{" "}
            <Link href="/bilim-hesaplayicilari/matematik/varyans-hesaplama">Varyans Hesaplama</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Mod tanımı ve hesaplama yöntemi standart ortaokul, lise ve
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
