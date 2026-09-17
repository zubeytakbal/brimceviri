import type { Metadata } from "next";
import Link from "next/link";
import GeometricSequenceCalculator from "../../../components/GeometricSequenceCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Geometrik dizi nedir?",
    answer:
      "Geometrik dizi, ardışık terimleri arasındaki oranın (ortak oran, r) her zaman sabit olduğu sayı dizisidir. Örneğin 2, 6, 18, 54 dizisinde her terim bir öncekinin 3 katıdır (r=3).",
  },
  {
    question: "n. terim formülü nedir?",
    answer:
      "aₙ = a₁ × r^(n-1) formülüyle hesaplanır; burada a₁ ilk terimi, r ortak oranı, n ise bulunmak istenen terimin sırasını ifade eder.",
  },
  {
    question: "İlk n teriminin toplamı nasıl bulunur?",
    answer:
      "r ≠ 1 olduğunda Sₙ = a₁ × (rⁿ - 1)/(r - 1) formülüyle hesaplanır. r = 1 olduğunda (tüm terimler eşit olduğunda) ise toplam basitçe Sₙ = a₁ × n'dir.",
  },
];

export const metadata: Metadata = {
  title: "Geometrik Dizi Hesaplama",
  description:
    "Geometrik dizinin n. terimini ve ilk n teriminin toplamını adım adım hesapla — ilk terim ve ortak oranı gir, sonucu anında gör.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/matematik/geometrik-dizi-hesaplama",
  },
  openGraph: {
    title: "Geometrik Dizi Hesaplama",
    description: "n. terimi ve dizi toplamını adım adım hesaplayın.",
    url: buildSiteUrl("/bilim-hesaplayicilari/matematik/geometrik-dizi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function GeometrikDiziHesaplamaPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Bilim Hesaplayıcıları", item: buildSiteUrl("/bilim-hesaplayicilari") },
      { "@type": "ListItem", position: 3, name: "Matematik", item: buildSiteUrl("/bilim-hesaplayicilari/matematik") },
      { "@type": "ListItem", position: 4, name: "Geometrik Dizi Hesaplama", item: buildSiteUrl("/bilim-hesaplayicilari/matematik/geometrik-dizi-hesaplama") },
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
          <span>Geometrik Dizi Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Geometrik Dizi Hesaplama</h1>
          <p>
            Geometrik dizinin n. terimini ve ilk n teriminin toplamını
            adım adım hesapla — ilk terimi ve ortak oranı gir, sonucu
            anında gör.
          </p>
        </header>

        <div className="unit-page-layout wide-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>Geometrik dizi nedir?</h2>
          <p>
            <strong>Geometrik dizi</strong>, ardışık terimleri
            arasındaki oranın (ortak oran, r) sabit olduğu bir sayı
            dizisidir. Genel terimi aₙ = a₁ × r^(n-1) formülüyle ifade
            edilir; burada a₁ ilk terim, r ortak oran, n ise terimin
            sırasıdır.
          </p>

          <h2>İlk n teriminin toplamı</h2>
          <p>
            Geometrik dizinin ilk n teriminin toplamı, r ≠ 1 için Sₙ =
            a₁ × (rⁿ - 1)/(r - 1) formülüyle hesaplanır. r = 1 özel
            durumunda tüm terimler birbirine eşit olduğu için toplam
            basitçe a₁ × n&apos;dir.
          </p>

          <h2>Satranç tahtası efsanesi: üstel büyümenin gücü</h2>
          <p>
            Geometrik dizilerin ne kadar hızlı büyüyebileceğini gösteren
            en ünlü örneklerden biri, satranç oyununun icadına dair
            efsanedir: hükümdar, oyunu icat eden bilgeye ödül olarak
            satranç tahtasının ilk karesine 1 buğday tanesi, ikinci
            kareye 2, üçüncü kareye 4 (her karede bir öncekinin 2 katı)
            koymayı kabul eder. Kulağa mütevazı gelen bu istek, 64.
            karede toplamda 2⁶⁴-1&apos;e (yaklaşık 18,4 kentilyon) tane
            buğday tanesine denk gelir — bu, dünyanın o günkü tüm buğday
            üretiminden kat kat fazladır. Bu hikaye, geometrik dizilerin
            (üstel büyümenin) neden aritmetik dizilerden çok daha hızlı
            büyüdüğünün klasik bir örneğidir.
          </p>

          <h2>Geometrik dizi gerçek hayatta nerede kullanılır?</h2>
          <p>
            Bileşik faizli bir yatırımın büyümesi, bir bakterinin ikiye
            bölünerek çoğalması, radyoaktif bir maddenin yarı ömürle
            azalması ve bir topun her sekişinde belirli bir oranda
            enerji kaybederek daha az zıplaması gibi birçok gerçek
            olay, geometrik dizi/üstel fonksiyonlarla modellenir.
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
            Sabit farkla artan/azalan diziler için{" "}
            <Link href="/bilim-hesaplayicilari/matematik/aritmetik-dizi-hesaplama">Aritmetik Dizi Hesaplama</Link>,{" "}
            üslü sayı hesaplamaları için{" "}
            <Link href="/bilim-hesaplayicilari/matematik/uslu-sayilar-hesaplama">Üslü Sayılar Hesaplama</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Geometrik dizi tanımı ve formülleri standart ortaokul, lise
            ve AYT matematik müfredatına dayanır.
          </p>
        </section>
        </div>

        <div className="unit-page-converter">
          <GeometricSequenceCalculator />
        </div>
        </div>
      </div>
    </main>
  );
}
