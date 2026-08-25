import type { Metadata } from "next";
import Link from "next/link";
import KitchenMeasuresConverter from "../components/KitchenMeasuresConverter";
import { kitchenIngredientRows } from "../converter/kitchenMeasures";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Mutfak Ölçüleri Çevirici: Bardak, Kaşık, Gram Hesaplama",
  description:
    "1 su bardağı, yemek kaşığı ve çay kaşığının gram karşılığını malzemeye göre hesaplayın. Un, şeker, pirinç, bal ve 15+ malzeme için ölçü tablosu.",
  alternates: {
    canonical: "/mutfak-olculeri-cevirici",
    languages: {
      tr: "/mutfak-olculeri-cevirici",
      en: "/en/kitchen-measurement-converter",
      "x-default": "/mutfak-olculeri-cevirici",
    },
  },
  openGraph: {
    title: "Mutfak Ölçüleri Çevirici: Bardak, Kaşık, Gram Hesaplama",
    description:
      "Malzemeye göre bardak, yemek kaşığı, çay kaşığı, gram ve mililitre arasında dönüşüm yapın.",
    url: buildSiteUrl("/mutfak-olculeri-cevirici"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

export default function KitchenMeasuresPage() {
  return (
    <main className="all-conversions-page">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Mutfak Ölçüleri Çevirici</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Mutfak Ölçüleri Çevirici</h1>

          <p>
            Malzemeyi ve bildiğin ölçüyü seç, bardak, yemek kaşığı, çay
            kaşığı, gram, mililitre ve litre karşılıklarını anında gör.
            Un, şeker, pirinç, bal, tereyağı ve daha fazlası için ayrı
            ayrı hesaplanmış ölçü değerleri kullanılıyor.
          </p>
        </header>

        <KitchenMeasuresConverter locale="tr" />

        <section className="category-article-content">
          <h2>1 su bardağı un kaç gram, 1 yemek kaşığı şeker kaç gram?</h2>
          <p>
            Cevap malzemeye göre değişir: 1 su bardağı (200 ml) un yaklaşık
            130 gram gelirken, aynı bardak toz şeker 200 gram, bal ise 285
            gram civarındadır. Bunun sebebi her malzemenin yoğunluğunun
            (aynı hacimdeki ağırlığının) farklı olması — un havadar ve
            hafifken, bal yoğun ve ağırdır. Bu yüzden tek bir &quot;1 bardak
            = X gram&quot; kuralı yerine, malzemeye özel bir tablo kullanmak
            gerekir.
          </p>
          <p>
            Buradaki değerler yaygın mutfak referanslarından derlenmiş
            ortalamalardır ve pratik kullanım için yeterince hassastır;
            yine de eleme, sıkıştırma veya markaya göre birkaç gram fark
            olabileceğini unutma. Hassas tarifler (özellikle pastacılık)
            için mümkünse mutfak tartısı kullanmak en doğru sonucu verir.
          </p>

          <h2>Malzeme Ölçü Tablosu (1 Su Bardağı = 200 ml)</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Malzemelerin bardak, yemek kaşığı ve çay kaşığı gram karşılıkları</caption>
              <thead>
                <tr>
                  <th scope="col">Malzeme</th>
                  <th scope="col">1 Su Bardağı</th>
                  <th scope="col">1 Yemek Kaşığı</th>
                  <th scope="col">1 Çay Kaşığı</th>
                </tr>
              </thead>
              <tbody>
                {kitchenIngredientRows.map((row) => (
                  <tr key={row.key}>
                    <td>{row.label}</td>
                    <td>{Math.round(row.gramsPerBardak)} g</td>
                    <td>
                      {Math.round((row.gramsPerBardak * 15) / 200)} g
                    </td>
                    <td>
                      {Math.round((row.gramsPerBardak * 5) / 200)} g
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>1 yemek kaşığı kaç ml, kaç çay kaşığı eder?</strong>
            <br />
            1 yemek kaşığı 15 ml&apos;dir ve 3 çay kaşığına eşittir (1 çay kaşığı
            5 ml). 1 su bardağı ise 200 ml, yani yaklaşık 13,3 yemek
            kaşığına denk gelir.
          </p>
          <p>
            <strong>Neden aynı bardak farklı malzemelerde farklı gram tutuyor?</strong>
            <br />
            Bardak ve kaşıklar hacim (mililitre) ölçer, gram ise ağırlıktır.
            İki ölçü arasındaki bağlantı malzemenin yoğunluğuna bağlıdır;
            un gibi havadar malzemeler bal gibi yoğun malzemelerden çok
            daha hafiftir.
          </p>
          <p>
            Elindeki tüm tarifi tek seferde ölçeklendirmek (2 katına
            çıkarmak, yarıya indirmek) istersen{" "}
            <Link href="/tarif-cevirici">tarif çevirici sayfasını</Link>{" "}
            kullanabilirsin — tarifi yapıştır, çarpanı seç, satır satır
            sonucu gör.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Tablodaki değerler, yaygın kullanılan Türk mutfağı ölçü
            rehberlerinden (Sana, Nefis Yemek Tarifleri, Carrefoursa mutfak
            içerikleri) derlenmiş ve yuvarlatılmış ortalama değerlerdir.
          </p>
        </section>
      </div>
    </main>
  );
}
