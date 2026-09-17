import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Antrenör Araçları ile Diyetisyen Araçları arasındaki fark nedir?",
    answer:
      "Diyetisyen Araçları beslenme ve klinik ölçümlere (BMI, kalori ihtiyacı, vücut yağ oranı) odaklanır. Antrenör Araçları ise antrenman performansına (1RM, koşu temposu) odaklanır. İkisini birlikte kullanabilirsin.",
  },
  {
    question: "Bu sayfadaki araçlar antrenörlük tavsiyesi yerine geçer mi?",
    answer:
      "Hayır. Buradaki araçlar genel hesaplama amaçlıdır; kişiye özel antrenman programı veya sağlık tavsiyesi vermez.",
  },
  {
    question: "Kuvvet, hipertrofi ve dayanıklılık antrenmanı için hangi %1RM aralığı kullanılır?",
    answer:
      "Genel kabul gören yaklaşıma göre: maksimal kuvvet için %85-100 1RM (1-5 tekrar), kas hacmi/hipertrofi için %67-85 1RM (6-12 tekrar), kas dayanıklılığı için %67 1RM altı (15+ tekrar) hedeflenir. Bu aralıklar genel bir çerçevedir; program tasarımı sporcunun hedefine, deneyimine ve dönemine (periodizasyon) göre uyarlanır.",
  },
  {
    question: "Tahmini 1RM formülleri neden gerçek 1RM'den sapabilir?",
    answer:
      "Epley gibi formüller, düşük-orta tekrar sayılarında (genelde 10-12 tekrarın altında) makul tahminler verir; tekrar sayısı arttıkça (15+ gibi) tahmin hatası büyür çünkü kas yorgunluğu doğrusal olmayan bir şekilde etkiler. En güvenilir 1RM, doğrudan test edilerek (uygun ısınma ve gözetim ile) bulunandır; formül sonucu yalnızca bir başlangıç noktasıdır.",
  },
];

export const metadata: Metadata = {
  title: "Antrenör Araçları: 1RM Hesaplama, Koşu Temposu",
  description:
    "Antrenör ve sporcular için tek sayfada toplanmış araçlar: 1RM (bir tekrar maksimum) hesaplama, antrenman yüzdesi tablosu, koşu pace hesaplama.",
  alternates: {
    canonical: "/antrenor-araclari",
  },
  openGraph: {
    title: "Antrenör Araçları: 1RM Hesaplama, Koşu Temposu",
    description: "1RM hesaplama ve koşu pace hesaplama tek sayfada.",
    url: buildSiteUrl("/antrenor-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function AntrenorAraclariPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Antrenör Araçları", item: buildSiteUrl("/antrenor-araclari") },
    ],
  };

  return (
    <main className="all-conversions-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/meslekler">Mesleğe Göre Araçlar</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Antrenör Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Antrenör Araçları</h1>
          <p>
            Antrenör ve sporcuların performans takibinde ihtiyaç
            duyduğu hesaplama araçlarını tek sayfada topladık: 1RM
            (bir tekrar maksimum) hesaplama, antrenman yüzdesi
            tablosu ve koşu temposu hesaplama. Beslenme ve klinik
            hesaplamalar için{" "}
            <Link href="/diyetisyen-araclari">Diyetisyen Araçları</Link>
            {" "}sayfasına bakabilirsin.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>1RM (Epley)</strong> = Ağırlık × (1 + Tekrar/30)
            </li>
            <li>
              <strong>%75 1RM</strong> ≈ 10 tekrarlık set ağırlığı
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/1rm-hesaplama">1RM Hesaplama</Link>
              {" "}— kaldırdığın ağırlık ve tekrar sayısından tahmini
              1RM&apos;ini ve antrenman yüzdesi tablosunu hesapla.
            </li>
            <li>
              <Link href="/kosu-pace-hesaplama">Koşu Pace Hesaplama</Link>
              {" "}— mesafe, süre ve tempo arasında hesaplama yap;
              yarış mesafeleri için tahmini bitiş süresi gör.
            </li>
          </ul>

          <h2>Antrenman Hedefine Göre %1RM Aralıkları</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Antrenman hedefine göre yaygın kullanılan %1RM ve tekrar aralıkları</caption>
              <thead>
                <tr>
                  <th scope="col">Hedef</th>
                  <th scope="col">%1RM</th>
                  <th scope="col">Tekrar Aralığı</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Maksimal Kuvvet</td>
                  <td>%85 - 100</td>
                  <td>1 - 5</td>
                </tr>
                <tr>
                  <td>Hipertrofi (Kas Hacmi)</td>
                  <td>%67 - 85</td>
                  <td>6 - 12</td>
                </tr>
                <tr>
                  <td>Kas Dayanıklılığı</td>
                  <td>%67 altı</td>
                  <td>15+</td>
                </tr>
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
            %1RM ve tekrar aralıkları, güç antrenmanı literatüründe
            (örn. NSCA - National Strength and Conditioning Association)
            yaygın kabul gören genel çerçevelere dayanır.
          </p>
        </section>
      </div>
    </main>
  );
}
