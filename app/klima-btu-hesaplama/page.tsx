import type { Metadata } from "next";
import Link from "next/link";
import AcCapacityCalculator from "../components/AcCapacityCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Salon ve yatak odasında aynı formül mü kullanılır?",
    answer:
      "Evet, temel formül aynıdır — sadece odanın alanı, içindeki kişi sayısı ve güneş/kat durumu değişir. Mutfak gibi ekstra ısı kaynağı olan (ocak, fırın) mekanlarda gerçek ihtiyaç bu hesaptan biraz daha yüksek çıkabilir.",
  },
  {
    question: "Neden bir üst standart kapasiteye yuvarlanıyor?",
    answer:
      "Klimalar piyasada sabit kapasite adımlarıyla (9.000, 12.000 BTU gibi) satılır; hesaplanan ihtiyacın hemen altındaki bir kapasiteyi almak odayı yeterince soğutamamana yol açar, bu yüzden bir üst standart kapasite güvenli tercihtir.",
  },
];

export const metadata: Metadata = {
  title: "Klima BTU Hesaplama: Kaç BTU Klima Almalıyım?",
  description:
    "Oda alanını, kişi sayısını ve güneş/kat durumunu gir: odana uygun klima soğutma kapasitesini (BTU) ve en yakın standart kapasiteyi anında hesapla.",
  alternates: {
    canonical: "/klima-btu-hesaplama",
  },
  openGraph: {
    title: "Klima BTU Hesaplama: Kaç BTU Klima Almalıyım?",
    description:
      "Oda alanından uygun klima soğutma kapasitesini (BTU) hesaplayın.",
    url: buildSiteUrl("/klima-btu-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function AcCapacityCalculatorPage() {
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
        name: "Klima BTU Hesaplama",
        item: buildSiteUrl("/klima-btu-hesaplama"),
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
          <span>Klima BTU Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Klima BTU Hesaplama</h1>
          <p>
            Oda alanını, kişi sayısını, güneş alma ve kat durumunu gir:
            odana uygun soğutma kapasitesini (BTU) ve en yakın standart
            klima kapasitesini (9.000 / 12.000 / 18.000 / 24.000 /
            30.000 BTU) anında gör.
          </p>
        </header>

        <AcCapacityCalculator />

        <section className="category-article-content">
          <h2>BTU nedir, klima gücüyle ne ilgisi var?</h2>
          <p>
            BTU (British Thermal Unit), bir klimanın saatte çekebileceği
            ısı miktarını ifade eden bir birimdir — kabaca klimanın
            &quot;soğutma gücü&quot; olarak düşünebilirsin. Oda için
            gereğinden düşük BTU&apos;lu bir klima sürekli tam güçte
            çalışıp yeterince soğutamaz ve daha çok elektrik harcar;
            gereğinden yüksek BTU&apos;lu bir klima ise odayı çok hızlı
            soğutup sık sık açılıp kapanır (kısa devirli çalışma), bu da
            hem enerji israfına hem nem dengesinin bozulmasına yol açar.
            Doğru kapasite seçimi bu yüzden hem konfor hem tasarruf
            açısından önemlidir.
          </p>

          <h2>Hesaplama nasıl yapılıyor?</h2>
          <p>
            Yaygın kullanılan pratik formül, oda alanının metrekare
            başına 500-600 BTU ile çarpılmasına dayanır; bu araçta 600
            BTU/m² kullanılmıştır. Odadaki her kişi için insan vücudunun
            yaydığı ısıyı karşılamak üzere 600 BTU eklenir. Oda gün boyu
            doğrudan güneş alıyorsa veya en üst kat/çatı katındaysa,
            ekstra ısı yükü için toplam ihtiyaca %10&apos;ar ek yapılır.
            Son olarak hesaplanan toplam, piyasada satılan standart
            klima kapasitelerinden (9.000, 12.000, 18.000, 24.000,
            30.000 BTU) bir üstteki değere yuvarlanır.
          </p>
          <p>
            Bu hesap pratik bir yaklaşım sunar; tavan yüksekliği normalin
            çok üzerindeyse, odada yoğun ısı kaynağı (fırın, çok sayıda
            elektronik cihaz) varsa veya yalıtım özellikle zayıfsa, bir
            klima teknisyeninden yerinde keşif almak daha doğru sonuç
            verir.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>Salon ve yatak odasında aynı formül mü kullanılır?</strong>
            <br />
            Evet, temel formül aynıdır — sadece odanın alanı, içindeki
            kişi sayısı ve güneş/kat durumu değişir. Mutfak gibi ekstra
            ısı kaynağı olan (ocak, fırın) mekanlarda gerçek ihtiyaç bu
            hesaptan biraz daha yüksek çıkabilir.
          </p>
          <p>
            <strong>Neden bir üst standart kapasiteye yuvarlanıyor?</strong>
            <br />
            Klimalar piyasada sabit kapasite adımlarıyla (9.000, 12.000
            BTU gibi) satılır; hesaplanan ihtiyacın hemen altındaki bir
            kapasiteyi almak odayı yeterince soğutamamana yol açar, bu
            yüzden bir üst standart kapasite güvenli tercihtir.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Formüldeki m² başına BTU aralığı (500-600) ve kişi başına ek
            yük (600 BTU), klima üreticilerinin (Vestel, Toshiba,
            Mitsubishi gibi) yayımladığı kapasite seçim rehberlerinde
            yaygın kullanılan pratik değerlerdir.
          </p>
        </section>
      </div>
    </main>
  );
}
