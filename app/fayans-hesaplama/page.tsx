import type { Metadata } from "next";
import Link from "next/link";
import TileCalculator from "../components/TileCalculator";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Fayans Hesaplama: Kaç Adet Fayans Gerekir?",
  description:
    "Kaplanacak alanı ve fayans ebadını gir, fire payı dahil gereken fayans adedini ve toplam alanı anında hesapla.",
  alternates: {
    canonical: "/fayans-hesaplama",
  },
  openGraph: {
    title: "Fayans Hesaplama: Kaç Adet Fayans Gerekir?",
    description:
      "Kaplanacak alan ve fayans ebadından gereken fayans adedini hesaplayın.",
    url: buildSiteUrl("/fayans-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function TileCalculatorPage() {
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
        name: "Fayans Hesaplama",
        item: buildSiteUrl("/fayans-hesaplama"),
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
          <span>Fayans Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Fayans Hesaplama</h1>
          <p>
            Kaplanacak alanı ve fayansın en/boy ölçüsünü gir; kesim ve
            desen kaybı için fire payını ayarla. Sonuçta fayans başına
            düşen alanı, fire dahil toplam alanı ve gereken fayans
            adedini görürsün.
          </p>
        </header>

        <TileCalculator />

        <section className="category-article-content">
          <h2>Fayans hesabında fire payı neden önemli?</h2>
          <p>
            Fayans döşerken duvar/zemin kenarlarında ve köşelerde kesim
            yapmak gerekir; bu kesimlerden çıkan parçalar genelde tekrar
            kullanılamaz. Ayrıca desenli veya büyük ebatlı fayanslarda
            hizalama kaybı da olur. Bu yüzden hesaplanan net alanın
            üzerine, basit dikdörtgen bir oda için %10, çok köşeli veya
            desenli döşemelerde %15-%20 fire payı eklemek pratikte daha
            gerçekçi sonuç verir.
          </p>

          <h2>Hesaplama nasıl yapılıyor?</h2>
          <p>
            Önce girdiğin en × boy ölçüsünden 1 fayansın kapladığı alan
            (m²) bulunur. Kaplanacak alan, seçtiğin fire payı oranıyla
            çarpılarak fire dahil toplam alana çevrilir. Son olarak bu
            alan, 1 fayansın alanına bölünüp yukarı yuvarlanarak gereken
            fayans adedi elde edilir — çünkü yarım fayans satın alınamaz,
            her zaman tam adede yuvarlamak gerekir.
          </p>
          <p>
            Fayanslar genelde kutu halinde ve kutu üzerinde yazan
            &quot;m²/kutu&quot; değeriyle satılır; mağazada kutu adedine
            geçerken buradaki &quot;fire dahil toplam alan&quot; sonucunu
            kutu başına düşen m² değerine bölmen yeterli.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>Duvar ve zemin fayansı için aynı hesap mı kullanılır?</strong>
            <br />
            Evet, formül aynıdır — tek fark kaplanacak alanı nasıl
            bulduğundur. Zeminde bu genelde oda uzunluğu × genişliği,
            duvarda ise duvar uzunluğu × yüksekliğidir.
          </p>
          <p>
            <strong>Fire payını neye göre seçmeliyim?</strong>
            <br />
            Dikdörtgen, köşesiz bir alanda %10 genelde yeterlidir. Oda
            köşeli/girintili ise, fayans çapraz döşenecekse veya desenli
            fayans kullanılacaksa %15-%20 aralığına çıkmak daha güvenlidir.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Fire payı aralıkları, yaygın seramik/fayans üreticilerinin ve
            uygulama ustalarının döşeme rehberlerinde önerdiği pratik
            değerlerden derlenmiştir.
          </p>
        </section>
      </div>
    </main>
  );
}
