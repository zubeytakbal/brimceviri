import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Gimli Glider uçağı neden yakıtsız kaldı?",
    answer:
      "Uçağın yakıt göstergesi arızalıydı, bu yüzden yer ekibi yakıt miktarını elle hesapladı. Hesaplamada yakıt yoğunluğunu litre başına 0,803 kg yerine litre başına 1,77 pound ile çarptılar — iki sayı da doğru gibi görünüyordu ama farklı birim sistemlerindendi. Sonuçta uçağa ihtiyacının yaklaşık yarısı kadar yakıt yüklendi.",
  },
  {
    question: "Bu hata neden oluştu?",
    answer:
      "Bu uçak, Air Canada'nın metrik sisteme (litre, kilogram) geçen ilk Boeing 767'siydi. Ama yer ekibi hâlâ imperial sisteme (pound) alışkındı ve kullanılan yoğunluk katsayısı yanlışlıkla pound cinsindendi. Kısacası uçak metrikti, insanların kafası hâlâ imperialdeydi.",
  },
  {
    question: "Uçak nasıl güvenli indi?",
    answer:
      "Kaptan Robert Pearson deneyimli bir planör pilotuydu ve motorsuz bir uçağı süzülerek indirme tekniklerini biliyordu. İkinci pilot Maurice Quintal ise yakınlarda, artık kullanılmayan eski bir hava üssü (Gimli) olduğunu hatırladı. Uçak, motorları tamamen dururken 17 km'den fazla süzülerek bu pistin üzerine indi.",
  },
  {
    question: "Kaza sonucu can kaybı oldu mu?",
    answer:
      "Hayır. Uçaktaki 61 yolcu ve 8 mürettebatın (toplam 69 kişi) hepsi hayatta kaldı, sadece birkaç hafif yaralanma yaşandı. Bu, dikkatli pilotluk sayesinde bir felaketin nasıl önlendiğinin en bilinen örneklerinden biri oldu.",
  },
];

export const metadata: Metadata = {
  title: "Gimli Glider: Yakıtsız Kalan Boeing 767",
  description:
    "Air Canada Uçuş 143, yakıt hesabında kilogram yerine pound kullanıldığı için ihtiyacının yarısı yakıtla havalandı ve 41.000 fitte iki motoru birden durdu. Gerçek olay, doğrulanmış kaynaklarla.",
  alternates: {
    canonical: "/birim-cevirme-felaketleri/gimli-glider",
  },
  openGraph: {
    title: "Gimli Glider: Yakıtsız Kalan Boeing 767",
    description:
      "Kilogram yerine pound kullanılınca uçak, ihtiyacının yarısı yakıtla havalandı.",
    url: buildSiteUrl("/birim-cevirme-felaketleri/gimli-glider"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function GimliGliderPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Birim Çevirme Felaketleri",
        item: buildSiteUrl("/birim-cevirme-felaketleri"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Gimli Glider",
        item: buildSiteUrl("/birim-cevirme-felaketleri/gimli-glider"),
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
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }}
      />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/birim-cevirme-felaketleri">Birim Çevirme Felaketleri</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Gimli Glider</span>
        </nav>

        <header className="all-conversions-header">
          <div className="disaster-hero-meta">
            <span className="disaster-category-badge">Havacılık</span>
            <span className="disaster-year-badge">23 Temmuz 1983</span>
          </div>
          <h1>Gimli Glider: Yakıtsız Kalan Boeing 767</h1>
          <p>
            Air Canada Uçuş 143, yer ekibinin yakıt hesabında kilogram
            yerine pound kullanmasıyla ihtiyacının yaklaşık yarısı kadar
            yakıtla havalandı ve 41.000 fitte iki motoru birden durdu.
          </p>
        </header>

        <section className="category-article-content">
          <div className="disaster-fact-grid">
            <div>
              <span>Uçak</span>
              <strong>Air Canada 767, Uçuş 143</strong>
            </div>
            <div>
              <span>Güzergah</span>
              <strong>Montreal → Edmonton</strong>
            </div>
            <div>
              <span>Neden</span>
              <strong>kg/lb yoğunluk karışıklığı</strong>
            </div>
            <div>
              <span>Sonuç</span>
              <strong>69 kişi hayatta kaldı</strong>
            </div>
          </div>

          <h2>Ne oldu?</h2>
          <p>
            23 Temmuz 1983&apos;te Air Canada&apos;nın Montreal&apos;den
            Edmonton&apos;a giden Boeing 767&apos;si, Manitoba üzerinde
            41.000 fit yükseklikteyken önce bir, sonra diğer motorunu
            kaybetti. Uçak tamamen motorsuz kaldı — bir yolcu jetinin
            havada bu şekilde süzülerek uçması son derece nadir bir
            durumdu.
          </p>

          <h2>Hata nasıl oluştu?</h2>
          <p>
            Bu uçak, Air Canada&apos;nın metrik sisteme (litre, kilogram)
            geçen ilk Boeing 767&apos;siydi. Uçağın otomatik yakıt
            göstergesi arızalıydı, bu yüzden yer ekibi depodaki yakıtı
            elle (bir çubukla) ölçüp, hacmi kütleye çevirmek için bir
            yoğunluk katsayısı kullandı. Doğru katsayı litre başına{" "}
            <strong>0,803 kilogram</strong> olmalıydı; ama ekip yanlışlıkla
            litre başına <strong>1,77 pound</strong> kullandı — sayısal
            olarak makul görünen ama tamamen farklı bir birim sisteminden
            gelen bir değer. Sonuçta uçağa istenen 22.300 kg yerine
            yaklaşık yarısı kadar yakıt yüklendi.
          </p>

          <div className="disaster-pullquote">
            &quot;Uçak metrik sisteme geçmişti, ama insanların kafası hâlâ
            imperial sistemdeydi.&quot;
          </div>

          <h2>Uçak nasıl güvenle indi?</h2>
          <p>
            Kaptan Robert Pearson, tesadüfen deneyimli bir planör
            pilotuydu ve motorsuz bir uçağı süzülerek kontrol etme
            tekniklerini biliyordu. İkinci pilot Maurice Quintal ise
            yakınlarda, artık askeri kullanımdan çıkmış eski bir hava
            üssü olan Gimli&apos;yi hatırladı. Uçak, iki motoru da
            tamamen dururken 17 kilometreden fazla süzülerek bu pistin
            üzerine iniş yaptı — pistin bir bölümü o gün otomobil
            yarışları için bariyerlerle kapatılmış olsa da, uçak güvenle
            durdu. 61 yolcu ve 8 mürettebatın tamamı hayatta kaldı.
          </p>

          <h2>Bu bize ne öğretiyor?</h2>
          <p>
            Bu olay, bir sistemin (uçağın kendisi) metrik birimlere
            geçmesinin yeterli olmadığını, o sistemi kullanan tüm
            insanların ve süreçlerin de aynı birimlere geçmesi
            gerektiğini gösteriyor. Tek bir yanlış katsayı — 0,803 yerine
            1,77 — neredeyse büyük bir felakete yol açıyordu.
          </p>

          <p className="category-inline-link">
            İlgili araç:{" "}
            <Link href="/kilogram-pound">Kilogram ↔ Pound çevirici</Link>{" "}
            ile bu olaydaki kg/lb farkını kendin hesaplayabilirsin.
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
            Bu sayfadaki bilgiler, olay hakkındaki resmi Kanada ulaşım
            güvenliği incelemeleri ve havacılık tarihi kaynaklarına
            dayanan yaygın, doğrulanmış anlatımlara dayanmaktadır.
          </p>
        </section>
      </div>
    </main>
  );
}
