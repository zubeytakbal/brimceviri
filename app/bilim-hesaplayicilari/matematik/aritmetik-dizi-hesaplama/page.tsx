import type { Metadata } from "next";
import Link from "next/link";
import ArithmeticSequenceCalculator from "../../../components/ArithmeticSequenceCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Aritmetik dizi nedir?",
    answer:
      "Aritmetik dizi, ardışık terimleri arasındaki farkın (ortak fark, d) her zaman sabit olduğu sayı dizisidir. Örneğin 3, 7, 11, 15, 19 dizisinde her terim bir öncekinden 4 fazladır (d=4).",
  },
  {
    question: "n. terim formülü nedir?",
    answer:
      "aₙ = a₁ + (n-1) × d formülüyle hesaplanır; burada a₁ ilk terimi, d ortak farkı, n ise bulunmak istenen terimin sırasını ifade eder.",
  },
  {
    question: "İlk n teriminin toplamı nasıl bulunur?",
    answer:
      "Sₙ = n/2 × (a₁ + aₙ) formülüyle hesaplanır. Bu formül, ilk ve son terimin ortalamasının, terim sayısıyla çarpılmasına dayanır — çünkü aritmetik dizide terimler eşit aralıklarla arttığı için baştan ve sondan eşleştirilen çiftlerin toplamı hep aynıdır.",
  },
];

export const metadata: Metadata = {
  title: "Aritmetik Dizi Hesaplama",
  description:
    "Aritmetik dizinin n. terimini ve ilk n teriminin toplamını adım adım hesapla — ilk terim ve ortak farkı gir, sonucu anında gör.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/matematik/aritmetik-dizi-hesaplama",
  },
  openGraph: {
    title: "Aritmetik Dizi Hesaplama",
    description: "n. terimi ve dizi toplamını adım adım hesaplayın.",
    url: buildSiteUrl("/bilim-hesaplayicilari/matematik/aritmetik-dizi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function AritmetikDiziHesaplamaPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Bilim Hesaplayıcıları", item: buildSiteUrl("/bilim-hesaplayicilari") },
      { "@type": "ListItem", position: 3, name: "Matematik", item: buildSiteUrl("/bilim-hesaplayicilari/matematik") },
      { "@type": "ListItem", position: 4, name: "Aritmetik Dizi Hesaplama", item: buildSiteUrl("/bilim-hesaplayicilari/matematik/aritmetik-dizi-hesaplama") },
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
          <Link href="/bilim-hesaplayicilari">Bilim Hesaplayıcıları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/bilim-hesaplayicilari/matematik">Matematik</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Aritmetik Dizi Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Aritmetik Dizi Hesaplama</h1>
          <p>
            Aritmetik dizinin n. terimini ve ilk n teriminin toplamını
            adım adım hesapla — ilk terimi ve ortak farkı gir, sonucu
            anında gör.
          </p>
        </header>

        <div className="unit-page-layout wide-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>Aritmetik dizi nedir?</h2>
          <p>
            <strong>Aritmetik dizi</strong>, ardışık terimleri arasındaki
            farkın (ortak fark, d) sabit olduğu bir sayı dizisidir.
            Genel terimi aₙ = a₁ + (n-1) × d formülüyle ifade edilir;
            burada a₁ ilk terim, d ortak fark, n ise terimin sırasıdır.
          </p>

          <h2>İlk n teriminin toplamı</h2>
          <p>
            Aritmetik dizinin ilk n teriminin toplamı Sₙ = n/2 × (a₁ +
            aₙ) formülüyle hesaplanır. Bu formül, dizinin ilk ve son
            teriminin ortalamasının terim sayısıyla çarpılmasına
            dayanır — aritmetik dizide baştan ve sondan eşleştirilen
            her çiftin toplamı (a₁+aₙ, a₂+aₙ₋₁, ...) her zaman aynıdır.
          </p>

          <h2>Genç Gauss&apos;un ünlü hikayesi</h2>
          <p>
            Bu toplam formülünün keşfine dair en ünlü anekdot, Alman
            matematikçi Carl Friedrich Gauss ile ilgilidir: rivayete
            göre öğretmeni sınıfı meşgul etmek için öğrencilerden 1&apos;den
            100&apos;e kadar olan sayıları toplamalarını istemiş; küçük
            Gauss saniyeler içinde sayıları 1+100, 2+99, 3+98 şeklinde
            eşleştirerek her çiftin 101 ettiğini fark etmiş ve 50 × 101
            = 5050 sonucuna anında ulaşmıştır. Bu, tam olarak Sₙ = n/2 ×
            (a₁ + aₙ) formülünün mantığıdır.
          </p>

          <h2>Aritmetik dizi gerçek hayatta nerede kullanılır?</h2>
          <p>
            Aritmetik diziler, sabit bir miktarın düzenli aralıklarla
            arttığı/azaldığı birçok gerçek durumu modellemek için
            kullanılır: sabit bir zamlama ile artan kira ödemeleri,
            bir stadyumdaki koltuk sıralarının düzenli artan sayısı,
            veya sabit bir hızda azalan bir yakıt deposu bu tür
            modellemeye örnektir.
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
            Sabit oranla çarpılarak artan/azalan diziler için{" "}
            <Link href="/bilim-hesaplayicilari/matematik/geometrik-dizi-hesaplama">Geometrik Dizi Hesaplama</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Aritmetik dizi tanımı ve formülleri standart ortaokul, lise
            ve AYT matematik müfredatına dayanır.
          </p>
        </section>
        </div>

        <div className="unit-page-converter">
          <ArithmeticSequenceCalculator />
        </div>
        </div>
      </div>
    </main>
  );
}
