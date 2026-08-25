import type { Metadata } from "next";
import Link from "next/link";
import PaintCalculator from "../components/PaintCalculator";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Boya Hesaplama: Kaç Litre Boya Gerekir?",
  description:
    "Oda ölçülerini gir, kapı ve pencere sayısını seç: net duvar alanını, gereken boya litresini ve kutu kombinasyonunu anında hesapla.",
  alternates: {
    canonical: "/boya-hesaplama",
  },
  openGraph: {
    title: "Boya Hesaplama: Kaç Litre Boya Gerekir?",
    description:
      "Oda ölçülerinden net duvar alanını ve gereken boya miktarını hesaplayın.",
    url: buildSiteUrl("/boya-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function PaintCalculatorPage() {
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
        name: "Boya Hesaplama",
        item: buildSiteUrl("/boya-hesaplama"),
      },
    ],
  };

  return (
    <main className="all-conversions-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Boya Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Boya Hesaplama</h1>
          <p>
            Oda uzunluğu, genişliği ve duvar yüksekliğini gir; kapı ve
            pencere sayısını seç. Net duvar alanını, kat sayısına göre
            gereken boya litresini ve en yakın kutu kombinasyonunu anında
            görürsün.
          </p>
        </header>

        <PaintCalculator />

        <section className="category-article-content">
          <h2>1 litre boya kaç m² alanı boyar?</h2>
          <p>
            Bu tamamen boyanın cinsine ve yüzeye bağlıdır; su bazlı iç cephe
            boyalarında tek kat için genel ortalama 8-10 m²/litre, iki kat
            uygulamada ise 4-5 m²/litre civarındadır. En doğru rakam her
            zaman kullandığın boya kutusunun etiketinde &quot;m²/litre&quot;
            olarak yazılıdır — hesaplayıcıdaki &quot;Boya Verimi&quot;
            alanına o değeri gir, sonuç ona göre yeniden hesaplanır.
          </p>

          <h2>Hesaplama nasıl yapılıyor?</h2>
          <p>
            Önce brüt duvar alanı bulunur: <strong>2 × (uzunluk + genişlik) × yükseklik</strong>.
            Ardından kapı başına ortalama 1,6 m², pencere başına ortalama
            1,5 m² düşülerek net boyanacak alan elde edilir. Tavan da
            işaretlenirse uzunluk × genişlik kadar alan buna eklenir.
            Sonuç, seçtiğin kat sayısıyla çarpılıp girdiğin verime
            bölünerek litre cinsinden boya miktarına dönüştürülür.
          </p>
          <p>
            Kapı ve pencere alanları standart ev ölçülerine göre alınmış
            ortalamalardır; alışılmadık büyüklükte açıklıkların olduğu
            odalarda sonuç birkaç litre sapabilir. Hesap sonucunu kutu
            adedine yuvarlarken doğal olarak küçük bir fire payı da
            oluşur — yine de köşe/kenar boyamada kullanılan fırça kaybı ve
            ikinci kat için ekstra ihtiyaç olabileceğinden, sınırda
            kalıyorsan bir sonraki kutu boyutuna yuvarlamak güvenlidir.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>Neden tavanı ayrı işaretlemem gerekiyor?</strong>
            <br />
            Çoğu boyama işinde tavan ayrı bir boya (genelde mat, farklı
            renk) ile yapılır ve bazen hiç boyanmaz. Bu yüzden varsayılan
            olarak hesaba dahil edilmez; dahil etmek istersen kutuyu
            işaretlemen yeterli.
          </p>
          <p>
            <strong>Kaç kat boya sürmeliyim?</strong>
            <br />
            Açık renkten açık renge geçişte tek kat yeterli olabilir; koyu
            bir rengin üstünü açık renkle kapatmak veya sıva/alçı gibi emici
            yeni bir yüzeye boyamak için iki kat önerilir. Emin değilsen iki
            katı seçmek daha güvenlidir.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Formüldeki alan hesabı ve tipik verim aralıkları, DYO, Filli
            Boya ve Weber gibi üreticilerin yayımladığı boya hesaplama
            rehberlerinden derlenmiştir; kesin sarfiyat için her zaman
            kullandığın ürünün etiketindeki değeri esas al.
          </p>
        </section>
      </div>
    </main>
  );
}
