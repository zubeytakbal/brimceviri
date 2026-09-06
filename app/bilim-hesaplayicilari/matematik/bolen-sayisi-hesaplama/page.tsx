import type { Metadata } from "next";
import Link from "next/link";
import DivisorCountCalculator from "../../../components/DivisorCountCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Bölen sayısı nasıl hesaplanır?",
    answer:
      "Sayı asal çarpanlarına ayrılır (n = p₁^a₁ × p₂^a₂ × ... × pₖ^aₖ), her üsse 1 eklenir ve bu değerler çarpılır: (a₁+1)(a₂+1)...(aₖ+1). Sonuç, n'nin toplam pozitif bölen sayısını verir.",
  },
  {
    question: "Tam sayı (asal olmayan) sayı nedir?",
    answer:
      "Asal sayı, sadece 1'e ve kendisine bölünebilen (tam olarak 2 böleni olan) sayıdır. Bir sayının bölen sayısı 2 ise, o sayı asaldır.",
  },
  {
    question: "Mükemmel sayı (tam sayı) nedir?",
    answer:
      "Kendisi hariç tüm pozitif bölenlerinin toplamı kendisine eşit olan sayılara mükemmel sayı denir (örn. 6 = 1+2+3, 28 = 1+2+4+7+14). Bölenler toplamı formülü, mükemmel sayıları incelemek için kullanılır.",
  },
  {
    question: "Bir sayının çok sayıda böleni olması ne anlama gelir?",
    answer:
      "Çok sayıda küçük asal çarpana sahip sayılar (örn. 12=2²×3, 24=2³×3, 36=2²×3²) genellikle çok sayıda bölene sahiptir — bu sayılara 'yüksek bileşik sayılar' denir ve takvim/zaman birimlerinde (60 dakika, 24 saat, 360 derece) tercih edilmelerinin nedeni budur, çünkü birçok tam sayıya kolayca bölünebilirler.",
  },
];

export const metadata: Metadata = {
  title: "Bölen Sayısı Hesaplama: Asal Çarpanlarla Bul",
  description:
    "Bir sayının kaç pozitif böleni olduğunu, bölenlerinin toplamını ve tüm bölenlerin listesini asal çarpanlara ayırarak hesaplayın.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/matematik/bolen-sayisi-hesaplama",
  },
  openGraph: {
    title: "Bölen Sayısı Hesaplama: Asal Çarpanlarla Bul",
    description: "Bir sayının bölen sayısını adım adım hesaplayın.",
    url: buildSiteUrl(
      "/bilim-hesaplayicilari/matematik/bolen-sayisi-hesaplama"
    ),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function BolenSayisiHesaplamaPage() {
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
        name: "Bölen Sayısı Hesaplama",
        item: buildSiteUrl(
          "/bilim-hesaplayicilari/matematik/bolen-sayisi-hesaplama"
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
          <span>Bölen Sayısı Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Bölen Sayısı Hesaplama</h1>
          <p>
            Bir sayının kaç pozitif böleni olduğunu, bölenlerinin
            toplamını ve tüm bölenlerin listesini adım adım hesapla.
          </p>
        </header>

        <div className="unit-page-layout wide-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>Bölen nedir?</h2>
          <p>
            Bir sayının <strong>böleni</strong>, o sayıyı kalansız
            (tam olarak) bölen pozitif tam sayıdır. Örneğin 12'nin
            bölenleri 1, 2, 3, 4, 6 ve 12'dir — bu altı sayının her biri
            12'yi tam böler.
          </p>

          <h2>Bölen sayısı formülü</h2>
          <p>
            Bir sayının kaç böleni olduğunu tek tek denemeden bulmanın
            sistematik yolu, sayıyı{" "}
            <Link href="/bilim-hesaplayicilari/matematik/ebob-ekok-hesaplama">
              asal çarpanlarına ayırmaktır
            </Link>
            : n = p₁^a₁ × p₂^a₂ × ... × pₖ^aₖ. Bu durumda toplam bölen
            sayısı (a₁+1)(a₂+1)...(aₖ+1) formülüyle bulunur. Örneğin 36 =
            2² × 3² olduğundan bölen sayısı (2+1)(2+1) = 9'dur — gerçekten
            de 36'nın bölenleri 1, 2, 3, 4, 6, 9, 12, 18, 36 olmak üzere
            tam 9 tanedir.
          </p>

          <h2>Formülün mantığı</h2>
          <p>
            Bu formülün çalışma nedeni kombinatoriktir: her bölen, asıl
            sayının her bir asal çarpanından 0 ile o çarpanın üssü
            arasında bağımsız bir miktar "seçilerek" oluşturulur. p₁'in
            üssü için (0'dan a₁'e kadar) a₁+1 farklı seçenek, p₂'nin üssü
            için a₂+1 seçenek vardır ve bu seçimler birbirinden bağımsız
            olduğundan toplam kombinasyon sayısı bu seçeneklerin
            çarpımıdır — tıpkı bir kombinatorik "çarpma kuralı"
            probleminde olduğu gibi.
          </p>

          <h2>Bölenler toplamı</h2>
          <p>
            Bir sayının tüm bölenlerinin toplamı da benzer bir formülle
            bulunur: her asal çarpan için (p^(a+1)−1)/(p−1) geometrik
            seri toplamı hesaplanır ve bu değerler çarpılır. Bu formül,{" "}
            <strong>mükemmel sayılar</strong> gibi sayı teorisi
            problemlerinde kullanılır — kendisi hariç bölenlerinin toplamı
            kendisine eşit olan sayılar (6, 28, 496, 8128...), antik Yunan
            matematikçilerinden beri incelenen ilginç bir konudur.
          </p>

          <h2>Asal sayı ile bölen sayısı ilişkisi</h2>
          <p>
            Bir sayının bölen sayısı tam olarak 2 ise, o sayı{" "}
            <strong>asaldır</strong> — çünkü asal sayılar tanım gereği
            sadece 1'e ve kendisine bölünür, başka böleni yoktur. Bölen
            sayısı 1 olan tek sayı 1'dir (kendisi hariç başka böleni
            olmayan tek pozitif tam sayı). 2'den fazla bölene sahip
            sayılara <strong>bileşik sayı</strong> denir.
          </p>

          <h2>Gerçek hayatta nerede kullanılır?</h2>
          <p>
            Çok sayıda böleni olan sayılar (yüksek bileşik sayılar),
            günlük hayatta ölçü birimlerinin tabanı olarak tercih edilir
            — 60 (dakika/saniye), 24 (saat), 360 (derece) gibi sayılar,
            birçok tam sayıya kolayca bölünebildiği için seçilmiştir
            (örneğin 60'ın 12 böleni vardır: 1,2,3,4,5,6,10,12,15,20,30,60
            — bu da bir saati ikiye, üçe, dörde, beşe... eşit parçalara
            bölmeyi kolaylaştırır). Kriptografi alanında da asal
            sayıların (2 böleni olan sayılar) özel önemi vardır — RSA gibi
            şifreleme algoritmaları büyük asal sayıların çarpanlarına
            ayrılmasının zorluğuna dayanır.
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
            Bölen sayısı ve bölenler toplamı formülleri, standart sayı
            teorisi kaynaklarına dayanır.
          </p>
        </section>
        </div>

        <div className="unit-page-converter">
          <DivisorCountCalculator />
        </div>
        </div>
      </div>
    </main>
  );
}
