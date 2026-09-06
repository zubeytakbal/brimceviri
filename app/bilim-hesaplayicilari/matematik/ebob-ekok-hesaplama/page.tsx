import type { Metadata } from "next";
import Link from "next/link";
import EbobEkokCalculator from "../../../components/EbobEkokCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "EBOB nedir?",
    answer:
      "EBOB (En Büyük Ortak Bölen), iki veya daha fazla sayının ortak bölenleri arasındaki en büyük sayıdır. Bazı kaynaklarda OBEB (Ortak Bölenlerin En Büyüğü) olarak da geçer.",
  },
  {
    question: "EKOK nedir?",
    answer:
      "EKOK (En Küçük Ortak Kat), iki veya daha fazla sayının ortak katları arasındaki en küçük sayıdır. Bazı kaynaklarda OKEK (Ortak Katların En Küçüğü) olarak da geçer.",
  },
  {
    question: "EBOB ve EKOK nasıl hesaplanır?",
    answer:
      "En güvenilir yöntem, sayıları asal çarpanlarına ayırmaktır. EBOB, ortak asal çarpanların en küçük üssü alınarak; EKOK ise sayılarda geçen tüm asal çarpanların en büyük üssü alınarak bulunur.",
  },
  {
    question: "EBOB × EKOK ile sayıların çarpımı arasında bir ilişki var mı?",
    answer:
      "İki sayı için EBOB(a,b) × EKOK(a,b) = a × b eşitliği geçerlidir. Üç veya daha fazla sayı için bu basit eşitlik genellikle geçerli değildir.",
  },
];

export const metadata: Metadata = {
  title: "EBOB-EKOK Hesaplama: Asal Çarpanlarla Adım Adım Çözüm",
  description:
    "İki veya daha fazla sayının EBOB (OBEB) ve EKOK (OKEK) değerini asal çarpanlara ayırma yöntemiyle adım adım hesaplayın.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/matematik/ebob-ekok-hesaplama",
  },
  openGraph: {
    title: "EBOB-EKOK Hesaplama: Asal Çarpanlarla Adım Adım Çözüm",
    description:
      "İki veya daha fazla sayının EBOB ve EKOK değerini adım adım hesaplayın.",
    url: buildSiteUrl(
      "/bilim-hesaplayicilari/matematik/ebob-ekok-hesaplama"
    ),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function EbobEkokHesaplamaPage() {
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
        name: "EBOB-EKOK Hesaplama",
        item: buildSiteUrl(
          "/bilim-hesaplayicilari/matematik/ebob-ekok-hesaplama"
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
          <span>EBOB-EKOK Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>EBOB-EKOK Hesaplama</h1>
          <p>
            İki veya daha fazla sayının en büyük ortak bölenini (EBOB) ve en
            küçük ortak katını (EKOK) asal çarpanlara ayırma yöntemiyle adım
            adım hesapla.
          </p>
        </header>

        <div className="unit-page-layout wide-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>EBOB (OBEB) nedir?</h2>
          <p>
            <strong>En Büyük Ortak Bölen (EBOB)</strong>, iki veya daha fazla
            doğal sayıyı kalansız bölen tüm ortak bölenler arasındaki en
            büyük değerdir. Örneğin 12'nin bölenleri 1, 2, 3, 4, 6, 12;
            18'in bölenleri ise 1, 2, 3, 6, 9, 18'dir. Bu iki kümenin ortak
            elemanları arasındaki en büyüğü 6'dır, dolayısıyla EBOB(12,
            18) = 6'dır.
          </p>

          <h2>EKOK (OKEK) nedir?</h2>
          <p>
            <strong>En Küçük Ortak Kat (EKOK)</strong>, iki veya daha fazla
            doğal sayının ortak katları arasındaki en küçük değerdir.
            12'nin katları 12, 24, 36, 48...; 18'in katları ise 18, 36,
            54... şeklindedir. Bu kümelerin ortak elemanları arasındaki en
            küçüğü 36'dır, dolayısıyla EKOK(12, 18) = 36'dır.
          </p>

          <h2>Asal çarpanlara ayırma yöntemi</h2>
          <p>
            EBOB ve EKOK'u bulmanın en güvenilir ve sistematik yolu,
            sayıları asal çarpanlarına ayırmaktır. Her sayı, asal sayıların
            (2, 3, 5, 7, 11...) çarpımı biçiminde tek bir şekilde yazılabilir
            — bu, <strong>aritmetiğin temel teoremi</strong> olarak bilinir.
            12 = 2² × 3 ve 18 = 2 × 3² şeklinde yazıldıktan sonra:
          </p>
          <p>
            <strong>EBOB</strong>, ortak asal çarpanların en küçük üssü
            alınarak bulunur: ortak çarpanlar 2 ve 3'tür, en küçük üsleri
            2¹ ve 3¹'dir, dolayısıyla EBOB = 2 × 3 = 6.
          </p>
          <p>
            <strong>EKOK</strong>, sayılarda geçen tüm asal çarpanların en
            büyük üssü alınarak bulunur: 2'nin en büyük üssü 2², 3'ün en
            büyük üssü 3²'dir, dolayısıyla EKOK = 4 × 9 = 36.
          </p>

          <h2>Öklid algoritması (alternatif yöntem)</h2>
          <p>
            Büyük sayılarda asal çarpanlara ayırma zahmetli olabilir; bu
            durumda <strong>Öklid algoritması</strong> daha hızlı bir yol
            sunar: EBOB(a, b) = EBOB(b, a mod b) eşitliği, b sıfır olana
            kadar tekrarlanır. EKOK ise EBOB bulunduktan sonra EKOK(a, b) =
            (a × b) / EBOB(a, b) formülüyle hesaplanır. Bu yöntem, özellikle
            bilgisayar programlarında tercih edilir çünkü asal çarpanlara
            ayırmaktan çok daha hızlıdır.
          </p>

          <h2>EBOB ve EKOK arasındaki ilişki</h2>
          <p>
            İki sayı için <strong>EBOB(a, b) × EKOK(a, b) = a × b</strong>{" "}
            eşitliği her zaman geçerlidir. Örneğimizde EBOB × EKOK = 6 × 36
            = 216, ve a × b = 12 × 18 = 216 — eşitlik sağlanır. Ancak üç
            veya daha fazla sayı için bu basit eşitlik genellikle geçerli
            değildir; bu yüzden çok sayılı hesaplarda asal çarpanlara
            ayırma veya ardışık Öklid uygulaması daha güvenilirdir.
          </p>

          <h2>Gerçek hayatta nerede kullanılır?</h2>
          <p>
            EBOB, kesirleri sadeleştirmede ve eşit parçalara bölme
            problemlerinde (örneğin farklı uzunluktaki kalasları eşit ve en
            uzun parçalara kesme) kullanılır. EKOK ise farklı periyotlarla
            tekrar eden olayların ne zaman aynı anda gerçekleşeceğini
            bulmada (örneğin iki otobüsün aynı anda kalkacağı ilk zaman) ve
            farklı paydalı kesirleri toplarken ortak payda bulmada
            kullanılır.
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
            Asal çarpanlara ayırma yöntemi ve aritmetiğin temel teoremi,
            standart ortaokul ve lise matematik müfredatına dayanır.
          </p>
        </section>
        </div>

        <div className="unit-page-converter">
          <EbobEkokCalculator />
        </div>
        </div>
      </div>
    </main>
  );
}
