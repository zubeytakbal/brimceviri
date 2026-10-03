import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import EmbedCodeBox from "../components/EmbedCodeBox";
import KitchenMeasuresConverter from "../components/KitchenMeasuresConverter";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { kitchenIngredientRows } from "../converter/kitchenMeasures";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "1 su bardağı un kaç gram, şeker kaç gram?",
    answer: "1 su bardağı (200 ml) un yaklaşık 100 gram, toz şeker yaklaşık 167 gram, pirinç yaklaşık 154 gram gelir. Tüm malzemeler için aşağıdaki tabloya bakın; un elenmiş ve bardak silme doldurulmuş kabul edilir.",
  },
  {
    question: "1 kilo un kaç su bardağı eder?",
    answer: "1 kg un yaklaşık 10 su bardağı, 1 kg toz şeker yaklaşık 6 su bardağı, 1 kg pirinç yaklaşık 6,5 su bardağı eder. Tablonun son sütunu her malzeme için 1 kg'ın kaç bardak olduğunu gösterir.",
  },
  {
    question: "1 litre kaç su bardağı?",
    answer: "1 litre 1.000 ml olduğu için 200 ml'lik su bardağıyla 5 bardak eder. 1 çay bardağı yaklaşık 100 ml, yani yarım su bardağıdır.",
  },
  {
    question: "Yarım ve çeyrek su bardağı kaç ml?",
    answer: "Yarım su bardağı 100 ml, üçte bir su bardağı yaklaşık 67 ml, çeyrek su bardağı 50 ml'dir. Bir \"dolu\" (tepeleme) yemek kaşığı silme kaşığın yaklaşık 1,5 katı gelir.",
  },
  {
    question: "1 yemek kaşığı kaç ml, kaç çay kaşığı eder?",
    answer:
      "1 yemek kaşığı 15 ml'dir ve 3 çay kaşığına eşittir (1 çay kaşığı 5 ml). 1 su bardağı ise 200 ml, yani yaklaşık 13,3 yemek kaşığına denk gelir.",
  },
  {
    question: "Neden aynı bardak farklı malzemelerde farklı gram tutuyor?",
    answer:
      "Bardak ve kaşıklar hacim (mililitre) ölçer, gram ise ağırlıktır. İki ölçü arasındaki bağlantı malzemenin yoğunluğuna bağlıdır; un gibi havadar malzemeler bal gibi yoğun malzemelerden çok daha hafiftir.",
  },
];

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const metadata: Metadata = {
  title: "1 Su Bardağı Kaç Gram? Mutfak Ölçüleri Çevirici (Un, Şeker, Pirinç)",
  description:
    "1 su bardağı un, şeker, pirinç, bulgur kaç gram? 1 kilo un kaç su bardağı? 45 malzeme için su bardağı, yemek kaşığı ve çay kaşığı gram karşılıkları ve çevirici.",
  alternates: {
    canonical: "/mutfak-olculeri-cevirici",
    languages: {
      tr: "/mutfak-olculeri-cevirici",
      en: "/en/kitchen-measurement-converter",
      "x-default": "/mutfak-olculeri-cevirici",
    },
  },
  openGraph: {
    title: "1 Su Bardağı Kaç Gram? Mutfak Ölçüleri Çevirici",
    description:
      "Malzemeye göre bardak, yemek kaşığı, çay kaşığı, gram ve mililitre arasında dönüşüm yapın.",
    url: buildSiteUrl("/mutfak-olculeri-cevirici"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

export default function KitchenMeasuresPage() {
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
        name: "Mutfak Ölçüleri Çevirici",
        item: buildSiteUrl("/mutfak-olculeri-cevirici"),
      },
    ],
  };

  return (
    <main className="all-conversions-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(buildFaqSchema(faqItems)),
        }}
      />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Mutfak Ölçüleri Çevirici</span>
        </nav>

        <div className="page-top-row">
          <header className="all-conversions-header">
            <h1>Mutfak Ölçüleri Çevirici</h1>

            <p>
              Malzemeyi ve bildiğin ölçüyü seç, bardak, yemek kaşığı, çay
              kaşığı, gram, mililitre ve litre karşılıklarını anında gör.
              Un, şeker, pirinç, bal, tereyağı ve daha fazlası için ayrı
              ayrı hesaplanmış ölçü değerleri kullanılıyor.
            </p>
          </header>

          <EmbedCodeBox
            embedPath="/embed/mutfak-olculeri"
            title="Mutfak Ölçüleri Çevirici"
          />
        </div>

        <KitchenMeasuresConverter locale="tr" />

        <section className="category-article-content">
          <h2>1 su bardağı un kaç gram, 1 yemek kaşığı şeker kaç gram?</h2>
          <p>
            Cevap malzemeye göre değişir: 1 su bardağı (200 ml) un yaklaşık
            100 gram gelirken, aynı bardak toz şeker 167 gram, bal ise 285
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
                  <th scope="col">1 kg kaç bardak</th>
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
                    <td>{(1000 / row.gramsPerBardak).toLocaleString("tr-TR", { maximumFractionDigits: 1 })} bardak</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Sık Sorulan Sorular</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

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
