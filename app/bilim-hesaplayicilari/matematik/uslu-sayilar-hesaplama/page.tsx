import type { Metadata } from "next";
import Link from "next/link";
import ExponentCalculator from "../../../components/ExponentCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Üslü sayı nedir?",
    answer:
      "Üslü sayı, bir tabanın (a) kendisiyle belirli sayıda (n, üs) çarpılması işlemidir: aⁿ = a × a × ... × a (n tane a). a tabanı, n ise üssü ifade eder.",
  },
  {
    question: "Sıfırıncı kuvvet neden 1'dir?",
    answer:
      "a≠0 için a⁰ = 1'dir. Bunun nedeni, üs kurallarının tutarlılığıdır: aᵐ/aⁿ = aᵐ⁻ⁿ kuralında m=n alındığında aⁿ/aⁿ = a⁰ = 1 elde edilir (herhangi bir sayının kendisine bölümü 1'dir).",
  },
  {
    question: "Negatif üs ne anlama gelir?",
    answer:
      "a⁻ⁿ = 1/aⁿ'dir. Negatif üs, tabanın çarpımsal tersinin (1/a) pozitif üssü olarak düşünülebilir — üs kurallarının negatif tamsayılara tutarlı biçimde genişletilmesinden gelir.",
  },
  {
    question: "Kesirli (rasyonel) üs ne anlama gelir?",
    answer:
      "a^(1/n) = ⁿ√a'dır — yani 1/n'inci kuvvet, n'inci dereceden kök almaya eşdeğerdir. Örneğin a^(1/2) = √a, a^(1/3) = ³√a. Genel olarak a^(m/n) = ⁿ√(aᵐ)'dir.",
  },
];

export const metadata: Metadata = {
  title: "Üslü Sayılar Hesaplama (aⁿ): Adım Adım Çözüm",
  description:
    "Bir sayının üslü halini (aⁿ) hesaplayın — pozitif, negatif ve sıfır üslerle, adım adım çözümle.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/matematik/uslu-sayilar-hesaplama",
  },
  openGraph: {
    title: "Üslü Sayılar Hesaplama (aⁿ): Adım Adım Çözüm",
    description: "aⁿ değerini adım adım hesaplayın.",
    url: buildSiteUrl(
      "/bilim-hesaplayicilari/matematik/uslu-sayilar-hesaplama"
    ),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UsluSayilarHesaplamaPage() {
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
        name: "Üslü Sayılar Hesaplama",
        item: buildSiteUrl(
          "/bilim-hesaplayicilari/matematik/uslu-sayilar-hesaplama"
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
          <span>Üslü Sayılar Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Üslü Sayılar Hesaplama</h1>
          <p>
            Bir sayının üslü halini (aⁿ) pozitif, negatif ve sıfır
            üslerle adım adım hesapla.
          </p>
        </header>

        <div className="unit-page-layout wide-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>Üslü sayı nedir?</h2>
          <p>
            <strong>Üslü sayı</strong>, bir sayının (taban, a) kendisiyle
            belirli bir sayıda (üs, n) tekrar tekrar çarpılmasını ifade
            eden kısa bir gösterimdir: aⁿ = a × a × ... × a (n tane a).
            Örneğin 2⁴ = 2×2×2×2 = 16. Bu gösterim, tekrarlı çarpmayı
            yazmayı kolaylaştırmak için geliştirilmiştir — modern üs
            gösterimi (a²) ilk kez 17. yüzyılda René Descartes tarafından
            sistematik biçimde kullanılmıştır.
          </p>

          <h2>Sıfırıncı ve negatif üs kuralları</h2>
          <p>
            Üs kuralları, tam sayılara tutarlı biçimde genişletilir.{" "}
            <strong>Bölme kuralından</strong> (aᵐ/aⁿ = aᵐ⁻ⁿ) yola çıkarsak:
            m=n olduğunda aⁿ/aⁿ = a⁰ elde edilir, ama aynı zamanda aⁿ/aⁿ =
            1'dir (herhangi bir sayının kendisine bölümü) — bu yüzden a⁰ =
            1 (a≠0) tanımlanır. Benzer şekilde m=0 alındığında a⁰/aⁿ =
            a⁻ⁿ, ve a⁰/aⁿ = 1/aⁿ olduğundan a⁻ⁿ = 1/aⁿ sonucuna ulaşılır —
            yani negatif üs, tabanın tersinin pozitif üssüdür.
          </p>

          <h2>Kesirli (rasyonel) üs ve kökler</h2>
          <p>
            Üs kavramı, kesirli sayılara da genişletilebilir: a^(1/n) =
            ⁿ√a. Bu ilişki, üs kurallarının (aᵐ)ⁿ = aᵐˣⁿ kuralından
            gelir — eğer a^(1/2) sayısını karesini alırsak (a^(1/2))² =
            a^(2/2) = a¹ = a elde ederiz, ki bu tam olarak karekökün
            tanımıdır (kendisiyle çarpıldığında a'yı veren sayı). Genel
            olarak a^(m/n) = ⁿ√(aᵐ) = (ⁿ√a)ᵐ'dir.
          </p>

          <h2>Üs alma kuralları (özet)</h2>
          <p>
            Üslü sayılarla işlem yaparken sıkça kullanılan temel kurallar:
            aᵐ × aⁿ = aᵐ⁺ⁿ (aynı tabanlı çarpımda üsler toplanır), aᵐ/aⁿ =
            aᵐ⁻ⁿ (aynı tabanlı bölümde üsler çıkarılır), (aᵐ)ⁿ = aᵐˣⁿ
            (kuvvetin kuvveti alınırken üsler çarpılır), (a×b)ⁿ = aⁿ×bⁿ
            (çarpımın kuvveti, her çarpanın ayrı ayrı kuvvetine eşittir).
          </p>

          <h2>Negatif taban ve tek/çift üs</h2>
          <p>
            Negatif bir tabanın tam sayı üssü alınırken, üssün tek veya
            çift olması sonucun işaretini belirler: negatif tabanın çift
            üssü pozitif (örn. (−2)² = 4), tek üssü ise negatif sonuç
            verir (örn. (−2)³ = −8). Negatif tabanın kesirli (tam sayı
            olmayan) üssü ise gerçek sayılar kümesinde genellikle tanımsız
            kabul edilir, çünkü karşılık gelen kök gerçek sayılarda
            mevcut olmayabilir.
          </p>

          <h2>Gerçek hayatta nerede kullanılır?</h2>
          <p>
            Üslü sayılar, bilgisayar biliminde ikili sistem ve bellek
            boyutlarında (2¹⁰ = 1024 byte = 1 KB), bileşik faiz ve nüfus
            artışı gibi üstel büyüme modellerinde, bilimsel gösterimde çok
            büyük/küçük sayıları ifade etmede (örneğin Avogadro sayısı
            6,022×10²³) ve fizik/kimyadaki birçok formülde (yarı ömür,
            radyoaktif bozunma gibi) temel bir araçtır.
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
            Üs kuralları ve tanımları, standart ortaokul ve lise
            matematik müfredatına dayanır.
          </p>
        </section>
        </div>

        <div className="unit-page-converter">
          <ExponentCalculator />
        </div>
        </div>
      </div>
    </main>
  );
}
