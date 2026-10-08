import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import Converter from "../converter/Converter";
import { categoryPages } from "../converter/categoryPages";

export const metadata: Metadata = {
  title: "Tüm Birim Dönüşümleri",
  description:
    "Uzunluk, kütle, alan, hacim, basınç, sıcaklık, enerji ve mühendislik birimlerini tek sayfada çevirin.",
  alternates: {
    canonical: "/tum-birimler",
    languages: {
      tr: "/tum-birimler",
      en: "/en/all-conversions",
      "x-default": "/tum-birimler",
    },
  },
};

export default function AllConversionsPage() {
  return (
    <main className="all-conversions-page">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">›</span>
          <span>Tüm Birimler</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Tüm Birim Dönüşümleri</h1>

          <p>
            Kategoriyi seçin, değeri girin ve kullanmak istediğiniz
            birimler arasında anında çeviri yapın.
          </p>
        </header>

        <Converter />

        <section className="category-article-content">
          <h2>Bu çevirici nasıl çalışır?</h2>
          <p>
            Her kategoride birimler önce o kategorinin temel SI birimine (uzunlukta metre, kütlede kilogram, basınçta pascal)
            çevrilir, sonra hedef birime dönüştürülür. Bu yüzden listedeki iki birim arasında doğrudan bir tablo olmasa da
            sonuç her zaman tutarlıdır. Örneğin 5 inç → santimetre çevirisi 5 × 0,0254 = 0,127 m ve 0,127 m = 12,7 cm adımlarıyla
            yapılır. Dönüşüm katsayıları uluslararası tanımlara (SI ve NIST) dayanır; inç, ayak ve libre gibi birimler 1959
            uluslararası anlaşmasıyla metrik birimlere tam olarak bağlanmıştır.
          </p>
          <p>
            Sıcaklık bu kuralın istisnasıdır: Celsius, Fahrenheit ve Kelvin arasında yalnızca çarpım değil toplama da vardır
            (°F = °C × 1,8 + 32). Bu yüzden &quot;sıcaklık farkı&quot; çevirirken toplama kısmı kullanılmaz; 10 °C&apos;lik bir artış
            18 °F&apos;lik artışa karşılık gelir, 50 °F&apos;ye değil.
          </p>

          <h2>Kategoriler</h2>
          <p>
            Bir kategorinin tüm birimlerini, formüllerini ve hazır tablolarını görmek için aşağıdaki sayfalara gidebilirsiniz.
          </p>
          <ul className="related-conversion-list">
            {categoryPages.map((c) => (
              <li key={c.slug}>
                <Link href={`/kategoriler/${c.slug}`}>{c.title}</Link>: {c.description}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
