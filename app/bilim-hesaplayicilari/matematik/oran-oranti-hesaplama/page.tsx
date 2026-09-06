import type { Metadata } from "next";
import Link from "next/link";
import RatioProportionCalculator from "../../../components/RatioProportionCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Oran nedir?",
    answer:
      "Oran, iki niceliğin birbirine bölünmesiyle elde edilen ilişkidir. a/b (ya da a:b) şeklinde yazılır ve 'a'nın 'b'ye göre kaç kat/kaçta kaç olduğunu ifade eder.",
  },
  {
    question: "Orantı nedir?",
    answer:
      "Orantı, iki oranın birbirine eşit olmasıdır: a/b = c/d. Bu dört sayıya orantının terimleri denir; a ve d 'dış terimler', b ve c 'iç terimler' olarak adlandırılır.",
  },
  {
    question: "Çapraz çarpma yöntemi nedir?",
    answer:
      "a/b = c/d orantısında, iç terimlerin çarpımı dış terimlerin çarpımına eşittir: b × c = a × d. Bu eşitlik, dört terimden biri bilinmediğinde onu bulmak için kullanılır.",
  },
  {
    question: "Doğru orantı ile ters orantı arasındaki fark nedir?",
    answer:
      "Doğru orantıda bir nicelik artarken diğeri de aynı oranda artar (a/b = c/d biçiminde). Ters orantıda ise bir nicelik artarken diğeri aynı oranda azalır (a×b = c×d biçiminde, çarpımları sabit kalır).",
  },
];

export const metadata: Metadata = {
  title: "Oran-Orantı Hesaplama: Çapraz Çarpma ile Bilinmeyeni Bul",
  description:
    "a/b = c/d orantısında bilinmeyen terimi çapraz çarpma yöntemiyle adım adım hesaplayın.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/matematik/oran-oranti-hesaplama",
  },
  openGraph: {
    title: "Oran-Orantı Hesaplama: Çapraz Çarpma ile Bilinmeyeni Bul",
    description: "Orantıdaki bilinmeyen terimi adım adım hesaplayın.",
    url: buildSiteUrl(
      "/bilim-hesaplayicilari/matematik/oran-oranti-hesaplama"
    ),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function OranOrantiHesaplamaPage() {
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
        name: "Oran-Orantı Hesaplama",
        item: buildSiteUrl(
          "/bilim-hesaplayicilari/matematik/oran-oranti-hesaplama"
        ),
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
          <span>Oran-Orantı Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Oran-Orantı Hesaplama</h1>
          <p>
            a/b = c/d orantısındaki dört terimden üçünü gir, bilinmeyeni
            çapraz çarpma yöntemiyle adım adım hesapla.
          </p>
        </header>

        <div className="unit-page-layout wide-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>Oran nedir?</h2>
          <p>
            <strong>Oran</strong>, iki niceliğin birbirine bölünmesiyle
            elde edilen ilişkidir; a/b veya a:b biçiminde yazılır ve &quot;a,
            b&apos;nin kaç katı/kaçta kaçı&quot; sorusuna cevap verir. Oranlar,
            birimsiz olabileceği gibi (örneğin bir sınıftaki kız/erkek
            öğrenci oranı) aynı birimden iki niceliğin karşılaştırılmasıyla
            da (örneğin km/saat) elde edilebilir.
          </p>

          <h2>Orantı ve terimleri</h2>
          <p>
            İki oranın birbirine eşit olmasına <strong>orantı</strong>{" "}
            denir: a/b = c/d. Bu dört sayıya orantının{" "}
            <strong>terimleri</strong> denir — a ve d &quot;dış terimler&quot; (uç
            terimler), b ve c ise &quot;iç terimler&quot; (orta terimler) olarak
            adlandırılır. Bu terminoloji, Öklid&apos;in MÖ 3. yüzyılda yazdığı{" "}
            <em>Elementler</em> adlı eserindeki orantı teorisine kadar
            uzanır.
          </p>

          <h2>Çapraz çarpma (iç-dış terimler çarpımı)</h2>
          <p>
            Bir orantının en temel özelliği, <strong>iç terimlerin
            çarpımının dış terimlerin çarpımına eşit olmasıdır</strong>: b ×
            c = a × d. Bu eşitlik &quot;çapraz çarpma&quot; olarak bilinir çünkü a/b =
            c/d yazıldığında a ile d, b ile c birbirine çapraz konumdadır.
            Dört terimden biri bilinmediğinde, bu eşitlik cebirsel olarak
            o terime göre çözülerek bilinmeyen bulunur.
          </p>

          <h2>Doğru orantı ile ters orantı</h2>
          <p>
            <strong>Doğru orantıda</strong>, bir nicelik artarken diğeri de
            aynı oranda artar — a/b = c/d biçimindeki klasik orantı
            budur (örneğin sabit hızda alınan yol ile geçen süre doğru
            orantılıdır). <strong>Ters orantıda</strong> ise bir nicelik
            artarken diğeri aynı oranda azalır; çarpımları sabit kalır: a ×
            b = c × d (örneğin sabit bir mesafeyi kaç kişinin, ne kadar
            sürede tamamlayacağı genellikle ters orantılıdır — işçi sayısı
            arttıkça süre azalır). Bu hesaplayıcı doğru orantı biçimini
            (a/b = c/d) çözer.
          </p>

          <h2>Ölçek ve harita orantıları</h2>
          <p>
            Orantı, haritalarda ve teknik çizimlerde <strong>ölçek</strong>{" "}
            kavramının temelidir — 1:100.000 ölçekli bir haritada, haritadaki
            1 cm gerçekte 100.000 cm&apos;ye (1 km) karşılık gelir. Bu tür
            problemler de doğrudan a/b = c/d orantı denklemiyle çözülür.
          </p>

          <h2>Gerçek hayatta nerede kullanılır?</h2>
          <p>
            Oran-orantı, tarif ölçülerini büyütüp küçültmede, döviz
            kurlarında (bir para biriminin diğerine dönüşümü), harita
            ölçeklerinde, karışım problemlerinde (boya, beton, ilaç
            dozajı) ve fotoğraf/ekran en-boy oranlarında sürekli
            kullanılır — matematikte en çok pratik uygulaması olan
            konulardan biridir.
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
            Bir sayının yüzdesini, bir sayının diğerinin yüzde kaçı
            olduğunu veya yüzde artış/azalışını hesaplamak istersen{" "}
            <Link href="/bilim-hesaplayicilari/matematik/yuzde-hesaplama">
              Yüzde Hesaplama
            </Link>{" "}
            aracına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Orantı terminolojisi ve çapraz çarpma kuralı, standart
            ortaokul matematik müfredatına dayanır.
          </p>
        </section>
        </div>

        <div className="unit-page-converter">
          <RatioProportionCalculator />
        </div>
        </div>
      </div>
    </main>
  );
}
