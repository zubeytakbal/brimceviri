import type { Metadata } from "next";
import Link from "next/link";
import StatisticsCalculator from "../../../components/StatisticsCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Aritmetik ortalama nasıl hesaplanır?",
    answer:
      "Tüm verilerin toplamı, veri sayısına bölünerek hesaplanır: Ortalama = Toplam / n. Örneğin 65, 70, 80 sayılarının ortalaması (65+70+80)/3 = 71,67'dir.",
  },
  {
    question: "Medyan (ortanca) nedir, ortalamadan farkı ne?",
    answer:
      "Medyan, veriler küçükten büyüğe sıralandığında ortadaki değerdir (veri sayısı çiftse ortadaki iki değerin ortalaması alınır). Ortalamadan farklı olarak medyan, aşırı uç değerlerden (outlier) çok daha az etkilenir — bu yüzden çarpık dağılımlarda (örn. maaş verileri) medyan daha temsili bir merkezi eğilim ölçüsüdür.",
  },
  {
    question: "Mod (tepe değer) nedir?",
    answer:
      "Mod, bir veri setinde en sık tekrar eden değerdir. Birden fazla değer aynı en yüksek frekansla tekrar edebilir (birden fazla mod), veya tüm değerler farklıysa hiç mod olmayabilir.",
  },
  {
    question: "Standart sapma neyi gösterir?",
    answer:
      "Standart sapma, verilerin ortalamadan ne kadar yayıldığının ölçüsüdür. Düşük standart sapma verilerin ortalamaya yakın kümelendiğini, yüksek standart sapma ise verilerin daha dağınık olduğunu gösterir. Bu araç hem kütle (n'e bölünen) hem örneklem (n-1'e bölünen) standart sapmasını hesaplar.",
  },
];

export const metadata: Metadata = {
  title: "Ortalama, Medyan, Mod ve Standart Sapma Hesaplama",
  description:
    "Bir veri listesinin aritmetik ortalamasını, medyanını, modunu, standart sapmasını ve varyansını adım adım hesapla.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/matematik/ortalama-hesaplama",
  },
  openGraph: {
    title: "Ortalama, Medyan, Mod ve Standart Sapma Hesaplama",
    description: "Temel istatistikleri adım adım hesapla.",
    url: buildSiteUrl("/bilim-hesaplayicilari/matematik/ortalama-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function OrtalamaHesaplamaPage() {
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
        name: "Matematik",
        item: buildSiteUrl("/bilim-hesaplayicilari/matematik"),
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Ortalama, Medyan, Mod ve Standart Sapma Hesaplama",
        item: buildSiteUrl("/bilim-hesaplayicilari/matematik/ortalama-hesaplama"),
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
          <Link href="/bilim-hesaplayicilari/matematik">Matematik</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Ortalama, Medyan, Mod ve Standart Sapma</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Ortalama, Medyan, Mod ve Standart Sapma Hesaplama</h1>
          <p>
            Bir veri listesinin aritmetik ortalamasını, medyanını, modunu,
            standart sapmasını ve varyansını adım adım hesapla.
          </p>
        </header>

        <div className="unit-page-layout wide-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>Merkezi eğilim ölçüleri: ortalama, medyan, mod</h2>
          <p>
            <strong>Aritmetik ortalama</strong>, bir veri setinin toplamının
            veri sayısına bölünmesiyle bulunur ve en yaygın kullanılan
            merkezi eğilim ölçüsüdür. <strong>Medyan</strong>, veriler
            sıralandığında ortadaki değerdir — aşırı uç değerlerden
            ortalama kadar etkilenmez, bu yüzden örneğin maaş veya ev
            fiyatı gibi çarpık dağılımlarda daha güvenilir bir &quot;tipik
            değer&quot; göstergesidir. <strong>Mod</strong> ise en sık
            tekrarlanan değerdir; kategorik veya ayrık verilerde
            (örneğin bir sınıfın en çok tercih ettiği renk) özellikle
            kullanışlıdır.
          </p>

          <h2>Yayılım ölçüleri: açıklık, varyans, standart sapma</h2>
          <p>
            Merkezi eğilim tek başına yeterli değildir — aynı ortalamaya
            sahip iki veri seti çok farklı şekilde dağılmış olabilir.{" "}
            <strong>Açıklık</strong> (range), en büyük ve en küçük değer
            arasındaki farktır — basit ama uç değerlere çok duyarlıdır.{" "}
            <strong>Varyans</strong> ve <strong>standart sapma</strong>,
            her verinin ortalamadan ne kadar uzaklaştığını (farkların
            karesinin ortalamasını) ölçerek daha güvenilir bir yayılım
            göstergesi sunar — standart sapma, varyansın kareköküdür ve
            orijinal veriyle aynı birimde olduğu için yorumlaması daha
            kolaydır.
          </p>

          <h2>Kütle mi, örneklem mi?</h2>
          <p>
            Elindeki veri, incelemek istediğin GRUBUN TAMAMIYSA (örn. bir
            sınıftaki tüm öğrencilerin notları) <strong>kütle (popülasyon)
            standart sapması</strong> kullanılır (n&apos;e bölünür). Elindeki
            veri daha büyük bir grubun sadece bir örneklemiyse (örn. bir
            şehirdeki tüm hanelerin gelirini tahmin etmek için seçilen 100
            hane), <strong>örneklem standart sapması</strong> kullanılır
            (n−1&apos;e bölünür — bu &quot;Bessel düzeltmesi&quot;, küçük örneklemlerin
            gerçek yayılımı olduğundan az tahmin etme eğilimini
            dengeler).
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
            Merkezi eğilim ve yayılım ölçüleri tanımları standart ortaokul,
            lise ve AYT istatistik müfredatına dayanır.
          </p>
        </section>
        </div>

        <div className="unit-page-converter">
          <StatisticsCalculator />
        </div>
        </div>
      </div>
    </main>
  );
}
