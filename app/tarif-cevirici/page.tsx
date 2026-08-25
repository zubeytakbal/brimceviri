import type { Metadata } from "next";
import Link from "next/link";
import EmbedCodeBox from "../components/EmbedCodeBox";
import RecipeScalerConverter from "../components/RecipeScalerConverter";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Tarif Çevirici: Tarifi Ölçekle, Bardağı Grama Çevir",
  description:
    "Tarifini yapıştır, çarpanı seç: tüm malzeme miktarları anında ölçeklenir. Bilinen malzemelerde bardak/kaşık ölçüleri otomatik olarak grama çevrilir.",
  alternates: {
    canonical: "/tarif-cevirici",
    languages: {
      tr: "/tarif-cevirici",
      en: "/en/recipe-converter",
      "x-default": "/tarif-cevirici",
    },
  },
  openGraph: {
    title: "Tarif Çevirici: Tarifi Ölçekle, Bardağı Grama Çevir",
    description:
      "Tarifini yapıştır, porsiyonunu 2 katına çıkar veya yarıya indir; malzeme miktarları ve mümkün olduğunda gram karşılıkları otomatik hesaplanır.",
    url: buildSiteUrl("/tarif-cevirici"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RecipeScalerPage() {
  return (
    <main className="all-conversions-page">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Tarif Çevirici</span>
        </nav>

        <div className="page-top-row">
          <header className="all-conversions-header">
            <h1>Tarif Çevirici</h1>

            <p>
              Tarifini aşağıya, her malzeme ayrı satırda olacak şekilde
              yapıştır (ör. &quot;2 su bardağı un&quot;). Bir çarpan seç,
              tüm miktarlar anında ölçeklenir; bardak, yemek kaşığı veya
              çay kaşığıyla yazılmış ve{" "}
              <Link href="/mutfak-olculeri-cevirici">
                mutfak ölçüleri tablosunda
              </Link>{" "}
              bulunan malzemelerde gram karşılığı da otomatik gösterilir.
            </p>
          </header>

          <EmbedCodeBox
            embedPath="/embed/tarif-cevirici"
            title="Tarif Çevirici"
            height={700}
            maxWidth={560}
          />
        </div>

        <RecipeScalerConverter locale="tr" />

        <section className="category-article-content">
          <h2>Bir tarif nasıl 2 katına çıkarılır?</h2>
          <p>
            Her satırın başındaki miktarı çarpanla çarpmak yeterlidir:
            2 kişilik bir tarifi 4 kişilik yapmak için tüm miktarları 2
            ile çarparsın. Bu araç bunu senin için otomatik yapar —
            tarifi yapıştır, çarpanı (0,5x, 1,5x, 2x, 3x veya kendi
            sayın) seç, sonucu hemen gör.
          </p>
          <p>
            Sayı ile başlayan hemen hemen her satır (tam sayı, virgüllü
            değer, kesir gibi &quot;1/2&quot;, ya da &quot;yarım&quot;
            ve &quot;çeyrek&quot; gibi kelimeler) tanınır ve doğru
            şekilde ölçeklenir — malzeme adı ne olursa olsun.
          </p>

          <h2>Neden bazı satırlarda gram karşılığı görünmüyor?</h2>
          <p>
            Gram karşılığı yalnızca hem birim (bardak, yemek kaşığı, çay
            kaşığı, gram, ml, litre) hem de malzeme adı tanındığında
            hesaplanabilir. &quot;2 adet yumurta&quot; gibi adet bazlı
            veya listede olmayan bir malzeme içeren satırlar yine de
            doğru ölçeklenir, sadece ek gram bilgisi gösterilmez. Tüm
            malzeme listesini{" "}
            <Link href="/mutfak-olculeri-cevirici">
              mutfak ölçüleri çevirici sayfasında
            </Link>{" "}
            görebilirsin.
          </p>
        </section>
      </div>
    </main>
  );
}
