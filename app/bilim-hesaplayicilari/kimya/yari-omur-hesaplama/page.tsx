import type { Metadata } from "next";
import Link from "next/link";
import HalfLifeCalculator from "../../../components/HalfLifeCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Yarı ömür nedir?",
    answer:
      "Yarı ömür (t½), radyoaktif bir maddenin başlangıç miktarının tam yarısının bozunması için geçen süredir. Her element/izotop için sabit bir değerdir ve başlangıç miktarından bağımsızdır.",
  },
  {
    question: "Yarı ömür formülü nedir?",
    answer:
      "Kalan miktar N = N₀ × (1/2)^(t/t½) formülüyle hesaplanır. Burada N₀ başlangıç miktarı, t geçen süre, t½ ise yarı ömürdür.",
  },
  {
    question: "Neden 3 yarı ömür sonra %12,5 kalır?",
    answer:
      "Her yarı ömürde miktar yarıya iner: 1 yarı ömür sonra %50, 2 yarı ömür sonra %25, 3 yarı ömür sonra %12,5 kalır. Bu, (1/2)ⁿ formülünün doğrudan sonucudur (n = geçen yarı ömür sayısı).",
  },
  {
    question: "Karbon-14 tarihleme yönteminde yarı ömür nasıl kullanılır?",
    answer:
      "Karbon-14'ün yarı ömrü 5730 yıldır. Bir fosildeki kalan karbon-14 oranı ölçülerek, kaç yarı ömür geçtiği ve dolayısıyla fosilin yaklaşık yaşı hesaplanabilir.",
  },
];

export const metadata: Metadata = {
  title: "Yarı Ömür Hesaplama: Radyoaktif Bozunma Hesaplayıcı",
  description:
    "Başlangıç/kalan miktar, geçen süre ve yarı ömürden eksik değeri N = N₀ × (1/2)^(t/t½) bağıntısıyla anında hesaplayın.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/kimya/yari-omur-hesaplama",
  },
  openGraph: {
    title: "Yarı Ömür Hesaplama: Radyoaktif Bozunma Hesaplayıcı",
    description: "Radyoaktif bozunma hesaplarını anında yapın.",
    url: buildSiteUrl("/bilim-hesaplayicilari/kimya/yari-omur-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function YariOmurHesaplamaPage() {
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
        name: "Bilim Hesaplayıcıları",
        item: buildSiteUrl("/bilim-hesaplayicilari"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Kimya",
        item: buildSiteUrl("/bilim-hesaplayicilari/kimya"),
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Yarı Ömür Hesaplama",
        item: buildSiteUrl("/bilim-hesaplayicilari/kimya/yari-omur-hesaplama"),
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
          <Link href="/bilim-hesaplayicilari">Bilim Hesaplayıcıları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/bilim-hesaplayicilari/kimya">Kimya</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Yarı Ömür Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Yarı Ömür Hesaplama</h1>
          <p>
            Başlangıç/kalan miktar, geçen süre ve yarı ömürden bildiğin üç
            değeri gir, eksik olan dördüncüyü hesapla.
          </p>
        </header>

        <div className="unit-page-layout chem-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>Yarı ömür nedir?</h2>
          <p>
            Yarı ömür (t½), radyoaktif bir izotopun mevcut miktarının tam
            yarısının bozunması için geçen süredir. Bu değer, izotopun
            başlangıçta ne kadar olduğundan tamamen bağımsızdır — ister 1
            gram ister 1 ton olsun, aynı izotop için yarı ömür her zaman
            aynıdır. Temel bağıntı{" "}
            <strong>N = N₀ × (1/2)^(t/t½)</strong> şeklindedir; burada N₀
            başlangıç miktarını, N kalan miktarı, t geçen süreyi, t½ ise
            yarı ömrü ifade eder.
          </p>

          <h2>Üstel bozunmanın mantığı</h2>
          <p>
            Radyoaktif bozunma, her an aynı ORANDA gerçekleşir — sabit bir
            miktar değil, sabit bir yüzde kaybolur. Bu yüzden bozunma
            "doğrusal" değil "üstel"dir: her yarı ömür geçtiğinde kalan
            miktar tam olarak yarıya iner. 1 yarı ömür sonra %50, 2 yarı
            ömür sonra %25, 3 yarı ömür sonra %12,5, 4 yarı ömür sonra
            %6,25 kalır — miktar hiçbir zaman matematiksel olarak tam sıfıra
            ulaşmaz, sürekli yarıya inmeye devam eder.
          </p>

          <h2>Karbon-14 tarihleme: yarı ömrün en ünlü uygulaması</h2>
          <p>
            1949'da Willard Libby'nin geliştirdiği karbon-14 tarihleme
            yöntemi, canlı organizmaların yaşarken atmosferdeki karbon-14'ü
            sabit oranda bünyesine aldığı, öldükten sonra ise bu izotopun
            5730 yıllık yarı ömrüyle bozunmaya başladığı ilkesine dayanır.
            Bir fosildeki kalan karbon-14 oranı ölçülerek, o canlının kaç
            yıl önce öldüğü hesaplanabilir. Libby bu buluşuyla 1960 Nobel
            Kimya Ödülü'nü kazandı; yöntem arkeoloji ve jeolojide devrim
            yarattı.
          </p>

          <h2>Farklı izotopların çok farklı yarı ömürleri</h2>
          <p>
            Yarı ömür, izotoptan izotopa muazzam farklılıklar gösterir:
            tıbbi görüntülemede kullanılan teknesyum-99m'in yarı ömrü
            yalnızca 6 saat iken, nükleer reaktörlerde kullanılan
            uranyum-238'in yarı ömrü yaklaşık 4,5 milyar yıldır — Dünya'nın
            yaşına yakın bir süre. Bu büyük fark, kısa yarı ömürlü
            izotopların tıbbi tanı gibi hızlı uygulamalarda, uzun yarı
            ömürlü izotopların ise jeolojik tarihleme gibi çok uzun vadeli
            ölçümlerde kullanılmasını sağlar.
          </p>

          <h2>Nükleer tıp ve radyoaktif atık yönetiminde yarı ömür</h2>
          <p>
            Yarı ömür hesabı, nükleer tıpta hastaya verilen radyoaktif
            izleyicinin ne kadar sürede vücuttan (radyoaktif olarak) temiz
            hâle geleceğini belirlemede kritik önem taşır. Aynı şekilde
            nükleer santrallerden çıkan radyoaktif atıkların ne kadar süre
            güvenli biçimde depolanması gerektiği de doğrudan atık
            içindeki izotopların yarı ömürlerine göre hesaplanır.
          </p>

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
            Yarı ömür bağıntısı, radyoaktif bozunmanın üstel yasasına
            dayanır.
          </p>
        </section>
        </div>

        <div className="unit-page-converter">
          <HalfLifeCalculator />
        </div>
        </div>
      </div>
    </main>
  );
}
