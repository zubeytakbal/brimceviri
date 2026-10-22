import { buildFullLanguageAlternates } from "@/app/i18n/routing";
import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import MovingBoxCalculator from "../components/MovingBoxCalculator";
import { getMovingBoxEstimate, homeTypeOrder } from "../converter/movingBoxCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Bu rakamlar kesin midir?",
    answer:
      "Hayır, nakliye sektöründe ev tipine göre kullanılan ortalama tahminlerdir; eşya miktarınız, biriktirdiğiniz kitap/eşya yoğunluğu ve balkon/depo eşyalarına göre gerçek ihtiyacınız değişebilir.",
  },
  {
    question: "Küçük ve büyük koli arasındaki fark nedir?",
    answer:
      "Küçük koliler genelde kitap, mutfak eşyası gibi ağır/küçük parçalar için, büyük koliler ise yastık, battaniye, giysi gibi hafif/hacimli eşyalar için kullanılır.",
  },
];

export const metadata: Metadata = {
  title: "Taşınma Kutusu Hesaplama: Ev Tipine Göre Kaç Koli Gerekir?",
  description:
    "Ev tipini seç (stüdyo, 1+1, 2+1, 3+1...); taşınma için tahmini koli sayısını ve kamyon hacmini gör.",
  alternates: {
    canonical: "/tasinma-kutusu-hesaplama",
    ...buildFullLanguageAlternates("/tasinma-kutusu-hesaplama"),
  },
  openGraph: {
    title: "Taşınma Kutusu Hesaplama: Ev Tipine Göre Kaç Koli Gerekir?",
    description:
      "Ev tipine göre tahmini taşınma kolisi sayısını ve kamyon hacmini hesaplayın.",
    url: buildSiteUrl("/tasinma-kutusu-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function MovingBoxCalculatorPage() {
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
        name: "Taşınma Kutusu Hesaplama",
        item: buildSiteUrl("/tasinma-kutusu-hesaplama"),
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
          <span>Taşınma Kutusu Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Taşınma Kutusu Hesaplama</h1>
          <p>
            Ev tipini seç: taşınma için tahmini küçük/büyük koli sayısını
            ve gereken kamyon hacmini gör.
          </p>
        </header>

        <MovingBoxCalculator />

        <section className="category-article-content">
          <h2>Bu tahminler nasıl belirlendi?</h2>
          <p>
            Rakamlar, nakliye sektöründe ev tipine göre yaygın kullanılan
            ortalama koli ve kamyon hacmi değerlerine dayanır. Kesin bir
            fiziksel formülden değil, sektörel deneyimden gelen bir referans
            tablosudur; gerçek ihtiyacınız eşya miktarınıza göre değişebilir.
          </p>

          <h2>Ev tipine göre tahmini koli ve araç hacmi</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Ev</th>
                  <th>Küçük koli</th>
                  <th>Büyük koli</th>
                  <th>Toplam koli</th>
                  <th>Araç hacmi</th>
                </tr>
              </thead>
              <tbody>
                {homeTypeOrder.map((tip) => {
                  const e = getMovingBoxEstimate(tip);
                  return (
                    <tr key={tip}>
                      <td>{e.label}</td>
                      <td>{e.smallBoxCount}</td>
                      <td>{e.largeBoxCount}</td>
                      <td>{e.smallBoxCount + e.largeBoxCount}</td>
                      <td>{e.truckVolumeM3} m³</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <h2>Örnek: 2+1 daire</h2>
          <p>
            Tabloya göre 2+1 bir ev için yaklaşık 28 küçük ve 18 büyük, toplam 46 koli ile 18 m³ araç hacmi gerekir. Evde çok sayıda kitap
            varsa küçük koli sayısını artırın: kitaplar büyük koliye konunca taşınamayacak kadar ağırlaşır. Balkon, kiler ve depo eşyaları
            tabloya dahil değildir; bunlar için koli sayısına yüzde 10-20 eklemek ve nakliyeciye ayrıca bildirmek sürprizleri önler.
          </p>

          <h2>Hangi eşya hangi koliye?</h2>
          <ul>
            <li>
              <strong>Küçük koli:</strong> Kitap, dosya, tabak, bardak, konserve ve alet gibi küçük ama ağır eşyalar. Koliyi kolayca
              kaldırabileceğiniz ağırlıkta tutun.
            </li>
            <li>
              <strong>Büyük koli:</strong> Yastık, yorgan, havlu, giysi ve oyuncak gibi hafif ama hacimli eşyalar.
            </li>
            <li>
              <strong>Kolisiz taşınanlar:</strong> Mobilya, beyaz eşya, yatak ve halı koli sayısına girmez; araç hacmi tahmininde ise
              hesaba katılmıştır.
            </li>
          </ul>

          <h2>Paketleme sırası</h2>
          <ol>
            <li>Mevsim dışı giysiler, kitaplar ve süs eşyaları birkaç gün önceden paketlenir.</li>
            <li>Mutfakta günlük kullanılmayan tabak ve tencereler ayrılır; kırılacaklar kâğıda sarılıp dik yerleştirilir.</li>
            <li>Taşınma günü gerekecek eşyalar (belgeler, şarj aletleri, ilaçlar, birkaç kıyafet) ayrı bir çantada kalır.</li>
            <li>Her koliye oda adı ve kısa içerik yazılır; yeni evde koliler doğrudan doğru odaya bırakılır.</li>
          </ol>

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
            Diğer nakliyeci araçları için{" "}
            <Link href="/nakliyeci-araclari">Nakliyeci Araçları</Link>{" "}
            sayfasına bakabilirsin.
          </p>
        </section>
      </div>
    </main>
  );
}
