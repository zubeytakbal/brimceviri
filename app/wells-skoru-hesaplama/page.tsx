import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import WellsScoreCalculator from "../components/WellsScoreCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Wells Skoru ne için kullanılır?",
    answer:
      "Pulmoner emboli (PE) şüphesi olan hastalarda, ileri tetkik (D-dimer, BT anjiyografi) öncesi klinik olasılığı değerlendirmek için kullanılan bir risk skorlama aracıdır.",
  },
  {
    question: "3 seviyeli ve 2 seviyeli yorum arasındaki fark nedir?",
    answer:
      "Klasik Wells skoru düşük/orta/yüksek olmak üzere 3 kategoriye ayrılır. Daha sonra geliştirilen basitleştirilmiş (dichotomized) versiyon ise sadece 'PE olası' / 'PE olası değil' şeklinde 2 kategori kullanır; her iki yorum da klinik pratikte kullanılır.",
  },
];

export const metadata: Metadata = {
  title: "Wells Skoru Hesaplama: Pulmoner Emboli Olasılığı ve Yorumu",
  description:
    "Klinik kriterleri işaretle: pulmoner emboli (PE) olasılığı için Wells skorunu ve risk kategorisini hesapla.",
  alternates: { canonical: "/wells-skoru-hesaplama" },
  openGraph: {
    title: "Wells Skoru Hesaplama (Pulmoner Emboli)",
    description: "PE olasılığı için Wells skorunu hesaplayın.",
    url: buildSiteUrl("/wells-skoru-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function WellsScorePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Wells Skoru Hesaplama", item: buildSiteUrl("/wells-skoru-hesaplama") },
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
          <span>Wells Skoru Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Wells Skoru Hesaplama (Pulmoner Emboli)</h1>
          <p>
            Klinik kriterleri işaretle: pulmoner emboli (PE) olasılığı
            için Wells skorunu ve risk kategorisini anında hesapla.
          </p>
        </header>

        <WellsScoreCalculator />

        <section className="category-article-content">
          <h2 id="yorum">Wells skoru nasıl yorumlanır?</h2>
          <p>
            Pulmoner emboli için Wells skoru iki farklı biçimde yorumlanır. Klasik üç basamaklı yorum klinik olasılığı
            sınıflar; basitleştirilmiş iki basamaklı yorum ise bir sonraki adımı (D-dimer mi, doğrudan görüntüleme mi)
            seçmekte kullanılır.
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Puan</th>
                  <th>Üç basamaklı</th>
                  <th>İki basamaklı</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0–1,5</td>
                  <td>Düşük olasılık</td>
                  <td>PE olası değil</td>
                </tr>
                <tr>
                  <td>2–4</td>
                  <td>Orta olasılık</td>
                  <td>PE olası değil</td>
                </tr>
                <tr>
                  <td>4,5–6</td>
                  <td>Orta olasılık</td>
                  <td>PE olası</td>
                </tr>
                <tr>
                  <td>6&apos;nın üzeri</td>
                  <td>Yüksek olasılık</td>
                  <td>PE olası</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Örnek: kalp hızı 110/dk olan (1,5), iki hafta önce ameliyat olmuş (1,5) ve başka bir tanı PE&apos;den daha olası
            görünmeyen (3) bir hastanın skoru 6&apos;dır: üç basamaklı yorumda orta olasılık, iki basamaklı yorumda &quot;PE
            olası&quot; grubundadır. Skor bir karar destek aracıdır; tanı ve tedavi kararı hekime aittir.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>Wells Skoru ne için kullanılır?</strong>
            <br />
            Pulmoner emboli (PE) şüphesi olan hastalarda, ileri tetkik
            (D-dimer, BT anjiyografi) öncesi klinik olasılığı
            değerlendirmek için kullanılan bir risk skorlama
            aracıdır.
          </p>
          <p>
            <strong>3 seviyeli ve 2 seviyeli yorum arasındaki fark nedir?</strong>
            <br />
            Klasik Wells skoru düşük/orta/yüksek olmak üzere 3
            kategoriye ayrılır. Daha sonra geliştirilen
            basitleştirilmiş (dichotomized) versiyon ise sadece
            &quot;PE olası&quot; / &quot;PE olası değil&quot; şeklinde
            2 kategori kullanır.
          </p>

          <h2>Diğer Risk Skorlama Araçları</h2>
          <ul className="related-conversion-list">
            <li><Link href="/glasgow-koma-skalasi-hesaplama">Glasgow Koma Skalası Hesaplama</Link></li>
            <li><Link href="/meld-skoru-hesaplama">MELD Skoru Hesaplama</Link></li>
            <li><Link href="/sofa-skoru-hesaplama">SOFA Skoru Hesaplama</Link></li>
            <li><Link href="/qsofa-hesaplama">qSOFA Hesaplama</Link></li>
            <li><Link href="/cha2ds2-vasc-skoru-hesaplama">CHA2DS2-VASc Skoru Hesaplama</Link></li>
          </ul>

          <h2>İlgili araçlar</h2>
          <p>
            Diğer doktor ve hemşire araçları için{" "}
            <Link href="/hesaplayicilar#klinik">Klinik Skorlar</Link>{" "}
            sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Skor, Wells PS ve ark. (2000) tarafından yayımlanan klinik
            karar kuralına dayanmaktadır. Bu araç tıbbi tavsiye yerine
            geçmez; tanı ve tedavi kararı için bir hekime
            danışılmalıdır.
          </p>
        </section>
      </div>
    </main>
  );
}
