import type { Metadata } from "next";
import Link from "next/link";
import BrickCalculator from "../components/BrickCalculator";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Tuğla Hesaplama: Kaç Adet Tuğla Gerekir?",
  description:
    "Duvar alanını ve tuğla ölçüsünü gir, derz payı ve fire dahil gereken tuğla adedini anında hesapla.",
  alternates: {
    canonical: "/tugla-hesaplama",
  },
  openGraph: {
    title: "Tuğla Hesaplama: Kaç Adet Tuğla Gerekir?",
    description:
      "Duvar alanından derz ve fire payı dahil gereken tuğla adedini hesaplayın.",
    url: buildSiteUrl("/tugla-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function BrickCalculatorPage() {
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
        name: "Tuğla Hesaplama",
        item: buildSiteUrl("/tugla-hesaplama"),
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
          <span>Tuğla Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Tuğla Hesaplama</h1>
          <p>
            Duvar alanını, tuğlanın en/yükseklik ölçüsünü ve derz
            kalınlığını gir; gereken tuğla adedini fire payı dahil
            anında gör.
          </p>
        </header>

        <BrickCalculator />

        <section className="category-article-content">
          <h2>Derz kalınlığı hesaba neden dahil ediliyor?</h2>
          <p>
            Tuğlalar duvara yan yana değil, aralarında harç dolgusu
            (derz) bırakılarak örülür. Bu derz payı hesaba katılmazsa
            gereken tuğla sayısı olduğundan fazla çıkar, çünkü her tuğla
            duvarda kendi ölçüsünden biraz daha fazla yer kaplar.
            Yaygın kullanılan derz kalınlığı 10 mm civarındadır; ince
            derzli uygulamalarda bu değer 5-8 mm&apos;ye kadar
            düşebilir.
          </p>

          <h2>Hesaplama nasıl yapılıyor?</h2>
          <p>
            Tuğlanın en ve yükseklik ölçüsüne, girdiğin derz kalınlığı
            eklenerek tuğlanın duvarda gerçekte kapladığı alan bulunur.
            Duvar alanı, seçtiğin fire payı oranıyla çarpılıp bu birim
            alana bölünür ve sonuç yukarı yuvarlanarak gereken tuğla
            adedi elde edilir. Kırılma ve kesim payı için varsayılan
            fire oranı %5&apos;tir; alışılmadık ölçülerde kesim yapılan
            duvarlarda bu oranı artırmak daha güvenlidir.
          </p>
          <p>
            Bu hesap yalnızca tuğla adedini verir; harç (çimento-kum)
            miktarı duvar kalınlığına ve harç karışım oranına göre ayrıca
            hesaplanmalıdır, bu yüzden sonuca dahil edilmemiştir.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>Tuğlanın derinlik (kalınlık) ölçüsünü neden sormuyorsunuz?</strong>
            <br />
            Adet hesabı yalnızca duvarın yüzeyinde görünen en × yükseklik
            alanına bağlıdır; tuğlanın derinliği duvarın kalınlığını
            belirler ama yüzeyde kaç tuğla göründüğünü değiştirmez.
          </p>
          <p>
            <strong>Kapı ve pencere alanlarını düşmem gerekiyor mu?</strong>
            <br />
            Evet — &quot;Duvar Alanı&quot; alanına, kapı ve pencere gibi
            boşlukları zaten düşülmüş net duvar alanını girmelisin.
            Brüt alan/boşluk hesaplama mantığı için{" "}
            <Link href="/boya-hesaplama">boya hesaplama aracına</Link>{" "}
            bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Derz kalınlığı ve fire payı aralıkları, yaygın duvar tuğlası
            üreticilerinin ve inşaat uygulama rehberlerinin önerdiği
            pratik değerlerden derlenmiştir.
          </p>
        </section>
      </div>
    </main>
  );
}
