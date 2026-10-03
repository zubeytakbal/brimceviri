import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import HasHesaplamaCalculator from "../components/HasHesaplamaCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Hurda altın nasıl hesaplanır?",
    answer: "Hurda altının değeri içindeki has altına göre belirlenir: has gram = gram × milyem ÷ 1000. Örneğin 10 gram 14 ayar (585 milyem) hurda altında 5,85 gram, 10 gram 22 ayar (916) hurdada 9,16 gram has altın vardır. Kuyumcu bu has miktarını güncel has altın fiyatıyla çarpar.",
  },
  {
    question: "22 ayar kaç milyem, 14 ayar kaç milyem?",
    answer: "24 ayar 995–999, 22 ayar 916, 21 ayar 875, 18 ayar 750, 14 ayar 585, 8 ayar 333 milyemdir. Milyem, 1000 birim alaşım içindeki saf altın miktarıdır.",
  },
  {
    question: "Has altın/gümüş ne demek?",
    answer:
      "Has, bir alaşımın içindeki saf metal miktarını ifade eder. Örneğin 10 gram 22 ayar (916 milyem) altının has değeri 10 × 0,916 = 9,16 gramdır; kalan kısım gümüş veya bakır gibi katkı metalidir.",
  },
  {
    question: "Farklı ayarlarda hurda altın/gümüş karıştırırsam sonuç ayarı nasıl bulunur?",
    answer:
      "Her bileşenin gramını milyemiyle çarpıp toplarsın (toplam has), sonra toplam ağırlığa bölüp 1000 ile çarparsın. Araç bunu otomatik yapar: birden fazla bileşen eklediğinde ağırlıklı ortalama ile sonuç ayarı hesaplanır.",
  },
  {
    question: "Ayar ile milyem arasındaki fark nedir?",
    answer:
      "Ayar, altında 24 birim üzerinden saflığı ifade eder (24 ayar = tam saf). Milyem ise binde (‰) cinsinden ifade edilen saflıktır ve hem altın hem gümüşte kullanılabilir; 22 ayar = 916 milyem, 18 ayar = 750 milyem gibi.",
  },
  {
    question: "Eski/hurda altınımı yeni takıyla değiştirirken ayar farkı nasıl hesaplanır?",
    answer:
      "Elindeki hurda parçanın gramını ve ayarını (milyemini), almak istediğin yeni parçanın ayarıyla birlikte Has Hesaplama aracına gir; ikisini 'bileşen' olarak ekleyip has (saf) içerikleri karşılaştırabilir, ya da hurdanı yeni ayara eritmek için gereken karışımı hesaplayabilirsin. Bu araç yalnızca ayar/milyem matematiği yapar, güncel gram altın fiyatını içermez.",
  },
];

export const metadata: Metadata = {
  title: "Hurda Altın Hesaplama: 14, 22, 24 Ayar Has ve Milyem",
  description:
    "Hurda altınının gramını ve ayarını gir: içindeki has (24 ayar) altını, milyemini ve farklı ayarlardaki parçaları karıştırınca çıkan ayarı hesapla. 22 ayar kaç milyem, 14 ayar hurda nasıl hesaplanır?",
  alternates: {
    canonical: "/has-hesaplama",
    languages: {
      "uz-UZ": "/uz/sof-oltin-hisoblash",
    },
  },
  openGraph: {
    title: "Hurda Altın Hesaplama: 14, 22, 24 Ayar Has ve Milyem",
    description:
      "Gram ve ayar (milyem) girerek has altın/gümüş içeriğini ve alaşım karıştırma sonucunu hesaplayın.",
    url: buildSiteUrl("/has-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function HasHesaplamaPage() {
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
        name: "Has Hesaplama",
        item: buildSiteUrl("/has-hesaplama"),
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
          <span>Has Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Has Altın ve Gümüş Hesaplama</h1>
          <p>
            Metal türünü seç, ağırlığı (gram) ve ayarı (milyem) gir: has
            (saf) metal içeriğini anında gör. Farklı ayarlarda birden
            fazla parça/hurda ekleyerek alaşım karıştırma sonucundaki
            ayarı da hesaplayabilirsin.
          </p>
        </header>

        <HasHesaplamaCalculator />

        <section className="category-article-content">
          <h2>Has değeri nasıl hesaplanır?</h2>
          <p>
            Has hesaplama, bir alaşımın brüt ağırlığının ne kadarının saf
            metal olduğunu bulur: <strong>Has Gram = Brüt Gram × (Milyem / 1000)</strong>.
            Örneğin 10 gram 18 ayar (750 milyem) altının has değeri
            10 × 0,750 = 7,5 gramdır; kalan 2,5 gram gümüş, bakır gibi
            katkı metalidir.
          </p>

          <h2>Alaşım karıştırma (birden fazla bileşen)</h2>
          <p>
            Farklı ayarlarda birkaç parçayı eritip tek bir alaşım
            oluşturacaksan, sonuç ayarı basit ortalama değil,{" "}
            <strong>ağırlıklı ortalamadır</strong>: her bileşenin has
            gramı toplanır, toplam ağırlığa bölünüp 1000 ile çarpılır —{" "}
            <strong>Sonuç Milyem = (Σ Has Gram / Σ Brüt Gram) × 1000</strong>.
            Bu, kuyumcuların hurda altın/gümüşü yeniden ayarlarken
            kullandığı standart yöntemdir.
          </p>

          <h2>Ayar ve milyem tablosu</h2>
          <p>
            Altında yaygın ayarlar: 24 ayar (999 milyem, saf altın), 22
            ayar (916 milyem), 18 ayar (750 milyem), 14 ayar (585
            milyem), 8 ayar (333 milyem). Gümüşte ise doğrudan milyem
            değeri kullanılır: 999 (saf gümüş), 925 (sterlin gümüş), 900
            ve 800 ayar en yaygın standartlardır. Bu değerleri &quot;Hızlı
            seç&quot; menüsünden doğrudan seçebilirsin.
          </p>

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
            Sabit ayarlar arasında (24/22/18/14 ayar altın veya
            999/925/900/800 ayar gümüş) doğrudan gram dönüşümü için{" "}
            <Link href="/kategoriler/altin-ayar">Altın Ayar Dönüşümleri</Link>{" "}
            ve{" "}
            <Link href="/kategoriler/gumus-ayar">Gümüş Ayar Dönüşümleri</Link>{" "}
            sayfalarına bakabilirsin. Bu araç ise onlardan farklı olarak
            serbest milyem girişine ve birden fazla bileşeni karıştırma
            hesabına izin verir. Kuyumculukla ilgili tüm araçları ve
            referans tabloları tek sayfada görmek için{" "}
            <Link href="/kuyumcu-araclari">Kuyumcu Araçları</Link>{" "}
            sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Ayar/milyem karşılıkları, kuyumculukta yaygın kullanılan
            uluslararası has (fineness) standartlarına dayanmaktadır.
            Resmî damga/ayar tespiti için her zaman yetkili bir ayar
            tespit merkezine (probe/mihenk) başvurulmalıdır — bu araç
            yalnızca matematiksel bir hesap sunar.
          </p>
        </section>
      </div>
    </main>
  );
}
