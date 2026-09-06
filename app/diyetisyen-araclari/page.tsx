import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "BMI ile vücut yağ oranı arasındaki fark nedir?",
    answer:
      "BMI yalnızca boy ve kiloya dayanır, kas ile yağ kütlesini ayırt edemez. Vücut yağ oranı ise bant metre ölçüleriyle (US Navy yöntemi) vücut kompozisyonu hakkında daha doğrudan bir fikir verir. İkisini birlikte değerlendirmek daha güvenilir bir tablo sunar.",
  },
  {
    question: "Günlük kalori ihtiyacı (TDEE) nasıl hesaplanır?",
    answer:
      "Önce Mifflin-St Jeor formülüyle bazal metabolizma hızı (BMR) bulunur, ardından aktivite seviyesine göre bir katsayıyla çarpılır. BMI Hesaplama aracımız bu hesabı boy, kilo, yaş, cinsiyet ve aktivite seviyene göre otomatik yapar.",
  },
];

export const metadata: Metadata = {
  title: "Diyetisyen Araçları: BMI, Kalori İhtiyacı, Vücut Yağ Oranı",
  description:
    "Diyetisyen ve fitness koçları için tek sayfada toplanmış araçlar: BMI ve günlük kalori ihtiyacı (BMR/TDEE) hesaplama, US Navy yöntemiyle vücut yağ oranı hesaplama ve vücut kompozisyonu referans tabloları.",
  alternates: {
    canonical: "/diyetisyen-araclari",
  },
  openGraph: {
    title: "Diyetisyen Araçları: BMI, Kalori İhtiyacı, Vücut Yağ Oranı",
    description:
      "BMI, günlük kalori ihtiyacı ve vücut yağ oranı hesaplama araçları tek sayfada.",
    url: buildSiteUrl("/diyetisyen-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function DiyetisyenAraclariPage() {
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
        name: "Mesleğe Göre Araçlar",
        item: buildSiteUrl("/meslekler"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Diyetisyen Araçları",
        item: buildSiteUrl("/diyetisyen-araclari"),
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
          <Link href="/meslekler">Mesleğe Göre Araçlar</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Diyetisyen Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Diyetisyen Araçları</h1>
          <p>
            Diyetisyen, fitness koçu ve sağlık takibi yapan herkesin
            kullandığı hesaplama araçlarını ve referans bilgileri tek
            sayfada topladık: BMI, günlük kalori ihtiyacı (BMR/TDEE) ve
            vücut yağ oranı hesaplama.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>Normal BMI aralığı</strong>: 18,5 - 24,9
            </li>
            <li>
              <strong>Erkek fit vücut yağ oranı</strong>: %14-17
            </li>
            <li>
              <strong>Kadın fit vücut yağ oranı</strong>: %21-24
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/bmi-hesaplama">BMI Hesaplama</Link> — vücut
              kitle indeksini ve aktivite seviyene göre günlük kalori
              ihtiyacını (BMR/TDEE) hesapla.
            </li>
            <li>
              <Link href="/vucut-yag-orani-hesaplama">
                Vücut Yağ Oranı Hesaplama
              </Link>{" "}
              — bant metre ölçüleriyle (US Navy yöntemi) vücut yağ
              oranını hesapla.
            </li>
            <li>
              <Link href="/ideal-kilo-hesaplama">İdeal Kilo Hesaplama</Link>
              {" "}— Devine formülüyle, boy ve cinsiyete göre ideal
              kiloyu hesapla.
            </li>
            <li>
              <Link href="/agirlik-karsilastirma">Ağırlık Karşılaştırma</Link>
              {" "}·{" "}
              <Link href="/kategoriler/kutle">Kütle Birim Dönüşümleri</Link>
              {" "}·{" "}
              <Link href="/kategoriler/uzunluk">Uzunluk (Boy) Birim Dönüşümleri</Link>
            </li>
          </ul>

          <h2>Vücut Yağ Oranı Kategorileri</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>ACE (American Council on Exercise) vücut yağ oranı kategorileri</caption>
              <thead>
                <tr>
                  <th scope="col">Kategori</th>
                  <th scope="col">Erkek</th>
                  <th scope="col">Kadın</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Temel Yağ</td>
                  <td>%2-5</td>
                  <td>%10-13</td>
                </tr>
                <tr>
                  <td>Sporcu</td>
                  <td>%6-13</td>
                  <td>%14-20</td>
                </tr>
                <tr>
                  <td>Fit</td>
                  <td>%14-17</td>
                  <td>%21-24</td>
                </tr>
                <tr>
                  <td>Ortalama</td>
                  <td>%18-24</td>
                  <td>%25-31</td>
                </tr>
                <tr>
                  <td>Yüksek</td>
                  <td>%25+</td>
                  <td>%32+</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>BMI Kategorileri</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Dünya Sağlık Örgütü (WHO) standart BMI kategorileri</caption>
              <thead>
                <tr>
                  <th scope="col">Kategori</th>
                  <th scope="col">BMI Aralığı</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Zayıf</td>
                  <td>18,5&apos;in altı</td>
                </tr>
                <tr>
                  <td>Normal</td>
                  <td>18,5 - 24,9</td>
                </tr>
                <tr>
                  <td>Fazla Kilolu</td>
                  <td>25 - 29,9</td>
                </tr>
                <tr>
                  <td>Obez</td>
                  <td>30 ve üzeri</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>BMI ile vücut yağ oranı arasındaki fark nedir?</strong>
            <br />
            BMI yalnızca boy ve kiloya dayanır, kas ile yağ kütlesini
            ayırt edemez. Vücut yağ oranı ise bant metre ölçüleriyle
            (US Navy yöntemi) vücut kompozisyonu hakkında daha
            doğrudan bir fikir verir. İkisini birlikte değerlendirmek
            daha güvenilir bir tablo sunar.
          </p>
          <p>
            <strong>Günlük kalori ihtiyacı (TDEE) nasıl hesaplanır?</strong>
            <br />
            Önce Mifflin-St Jeor formülüyle bazal metabolizma hızı
            (BMR) bulunur, ardından aktivite seviyesine göre bir
            katsayıyla çarpılır.{" "}
            <Link href="/bmi-hesaplama">BMI Hesaplama</Link> aracımız bu
            hesabı boy, kilo, yaş, cinsiyet ve aktivite seviyene göre
            otomatik yapar.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            BMI kategorileri Dünya Sağlık Örgütü (WHO) standardına,
            vücut yağ oranı kategorileri American Council on Exercise
            (ACE) sınıflandırmasına dayanmaktadır. Bu sayfa tıbbi
            tavsiye yerine geçmez; sağlık kararların için bir hekim
            veya diyetisyene danışmalısın.
          </p>
        </section>
      </div>
    </main>
  );
}
