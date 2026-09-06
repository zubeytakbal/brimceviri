import type { Metadata } from "next";
import Link from "next/link";
import BodyFatCalculator from "../components/BodyFatCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Bu hesaplama yöntemi ne kadar doğru?",
    answer:
      "US Navy (ABD Deniz Kuvvetleri) yöntemi, kaliper veya vücut kompozisyonu tartısı olmadan yalnızca bant metreyle yapılan tahmin yöntemleri arasında en güvenilirlerden biridir; ancak DEXA tarama gibi laboratuvar yöntemlerine göre birkaç puan sapma gösterebilir. Genel takip ve fikir edinme amaçlı kullanılmalıdır.",
  },
  {
    question: "Ölçüleri nereden ve nasıl almalıyım?",
    answer:
      "Boyun çevresini adem elmasının hemen altından, bel çevresini göbek deliği hizasından, kadınlarda kalça çevresini kalçanın en geniş noktasından, bant metreyi sıkmadan ölçmelisin. Tutarlı sonuç için her zaman aynı saatte (örneğin sabah) ölçüm yapmak faydalıdır.",
  },
  {
    question: "BMI yerine neden vücut yağ oranına da bakılmalı?",
    answer:
      "BMI yalnızca boy ve kiloya dayanır, kas ile yağ kütlesini ayırt edemez — kas kütlesi yüksek biri BMI'ye göre 'fazla kilolu' çıkabilir. Vücut yağ oranı, vücut kompozisyonu hakkında daha doğrudan bir fikir verir.",
  },
];

export const metadata: Metadata = {
  title: "Vücut Yağ Oranı Hesaplama (US Navy Yöntemi)",
  description:
    "Boyun, bel (ve kadınlarda kalça) çevresi ölçülerinden, bant metre dışında ekipman gerektirmeyen US Navy yöntemiyle vücut yağ oranını hesapla.",
  alternates: {
    canonical: "/vucut-yag-orani-hesaplama",
  },
  openGraph: {
    title: "Vücut Yağ Oranı Hesaplama (US Navy Yöntemi)",
    description:
      "Bant metre ölçüleriyle US Navy yöntemine göre vücut yağ oranını hesaplayın.",
    url: buildSiteUrl("/vucut-yag-orani-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function BodyFatCalculatorPage() {
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
        name: "Vücut Yağ Oranı Hesaplama",
        item: buildSiteUrl("/vucut-yag-orani-hesaplama"),
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
          <span>Vücut Yağ Oranı Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Vücut Yağ Oranı Hesaplama</h1>
          <p>
            Cinsiyet, boy, boyun ve bel çevresini (kadınlarda kalça
            çevresini de) gir: US Navy yöntemiyle vücut yağ oranını ve
            kategorini anında hesapla — sadece bant metre yeterli.
          </p>
        </header>

        <BodyFatCalculator />

        <section className="category-article-content">
          <h2>US Navy yöntemi nasıl çalışır?</h2>
          <p>
            Bu yöntem, boyun ve bel (kadınlarda ayrıca kalça) çevresi
            ile boy arasındaki oranı logaritmik bir formülle vücut yağ
            oranına çevirir. ABD Deniz Kuvvetleri&apos;nin fitness
            standartlarında kullanılan bu yöntem, kaliper veya özel
            ekipman gerektirmeden, yalnızca bant metreyle makul bir
            tahmin sağlar.
          </p>

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

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>Bu hesaplama yöntemi ne kadar doğru?</strong>
            <br />
            US Navy yöntemi, kaliper veya vücut kompozisyonu tartısı
            olmadan yalnızca bant metreyle yapılan tahmin yöntemleri
            arasında en güvenilirlerden biridir; ancak DEXA tarama gibi
            laboratuvar yöntemlerine göre birkaç puan sapma
            gösterebilir. Genel takip ve fikir edinme amaçlı
            kullanılmalıdır.
          </p>
          <p>
            <strong>Ölçüleri nereden ve nasıl almalıyım?</strong>
            <br />
            Boyun çevresini adem elmasının hemen altından, bel çevresini
            göbek deliği hizasından, kadınlarda kalça çevresini
            kalçanın en geniş noktasından, bant metreyi sıkmadan
            ölçmelisin. Tutarlı sonuç için her zaman aynı saatte
            (örneğin sabah) ölçüm yapmak faydalıdır.
          </p>
          <p>
            <strong>BMI yerine neden vücut yağ oranına da bakılmalı?</strong>
            <br />
            BMI yalnızca boy ve kiloya dayanır, kas ile yağ kütlesini
            ayırt edemez — kas kütlesi yüksek biri BMI&apos;ye göre
            &quot;fazla kilolu&quot; çıkabilir. Vücut yağ oranı, vücut
            kompozisyonu hakkında daha doğrudan bir fikir verir.
          </p>

          <h2>İlgili araçlar</h2>
          <p>
            BMI ve günlük kalori ihtiyacın için{" "}
            <Link href="/bmi-hesaplama">BMI Hesaplama</Link>, sağlık ve
            fitness ile ilgili diğer araçlar için{" "}
            <Link href="/diyetisyen-araclari">Diyetisyen Araçları</Link>{" "}
            sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Hesaplama formülü, ABD Deniz Kuvvetleri&apos;nin fitness
            standardında kullanılan yaygın US Navy vücut yağ oranı
            tahmin yöntemine; kategori aralıkları ise American Council
            on Exercise (ACE) tarafından yayımlanan standart vücut yağ
            oranı sınıflandırmasına dayanmaktadır. Bu araç tıbbi tavsiye
            yerine geçmez.
          </p>
        </section>
      </div>
    </main>
  );
}
