import type { Metadata } from "next";
import Link from "next/link";
import FactorialCalculator from "../../../components/FactorialCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Faktöriyel nedir?",
    answer:
      "Bir n negatif olmayan tam sayısının faktöriyeli (n!), 1'den n'e kadar olan tüm pozitif tam sayıların çarpımıdır: n! = n × (n-1) × (n-2) × ... × 2 × 1.",
  },
  {
    question: "0! neden 1'e eşittir?",
    answer:
      "0!, matematiksel olarak 'boş çarpım' (hiçbir sayının çarpılmadığı durum) olarak tanımlanır ve boş çarpımın değeri, çarpmanın etkisiz elemanı olan 1'dir. Bu tanım, permütasyon ve kombinasyon formüllerinin tüm sınır durumlarda tutarlı çalışmasını sağlar.",
  },
  {
    question: "Faktöriyel neden bu kadar hızlı büyür?",
    answer:
      "Her adımda bir önceki sonucu artan bir sayıyla çarptığımız için büyüme üstel fonksiyonlardan bile hızlıdır. 10! = 3.628.800 iken, 20! zaten 18 basamaklı bir sayıdır (2.432.902.008.176.640.000) — bu patlayıcı büyüme, Stirling yaklaşımı gibi özel formüllerin geliştirilmesine yol açmıştır.",
  },
  {
    question: "Negatif sayıların faktöriyeli var mı?",
    answer:
      "Negatif tam sayıların faktöriyeli standart tanımda yoktur (tanımsızdır). Ancak faktöriyel kavramı, Gama fonksiyonu (Γ) aracılığıyla tam sayı olmayan ve negatif olmayan-tam-sayı-dışı değerlere genelleştirilebilir — bu, üniversite düzeyinde analiz konusudur.",
  },
];

export const metadata: Metadata = {
  title: "Faktöriyel Hesaplama (n!): Adım Adım Çözüm",
  description:
    "Bir sayının faktöriyelini (n!) anında hesaplayın — basamak sayısı ve sondaki sıfır sayısıyla birlikte, adım adım çözümle.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/matematik/faktoriyel-hesaplama",
  },
  openGraph: {
    title: "Faktöriyel Hesaplama (n!): Adım Adım Çözüm",
    description: "n! değerini adım adım hesaplayın.",
    url: buildSiteUrl("/bilim-hesaplayicilari/matematik/faktoriyel-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function FaktoriyelHesaplamaPage() {
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
        name: "Faktöriyel Hesaplama",
        item: buildSiteUrl(
          "/bilim-hesaplayicilari/matematik/faktoriyel-hesaplama"
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
          <span>Faktöriyel Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Faktöriyel Hesaplama</h1>
          <p>
            Bir sayının faktöriyelini (n!) anında hesapla — basamak sayısı
            ve sondaki sıfır sayısıyla birlikte, adım adım çözümle.
          </p>
        </header>

        <div className="unit-page-layout wide-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>Faktöriyel nedir?</h2>
          <p>
            Bir <strong>n</strong> negatif olmayan tam sayısının{" "}
            <strong>faktöriyeli</strong> (n! olarak yazılır, &quot;n faktöriyel&quot;
            okunur), 1&apos;den n&apos;e kadar olan tüm pozitif tam sayıların
            çarpımıdır: n! = n × (n−1) × (n−2) × ... × 2 × 1. Örneğin 5! =
            5 × 4 × 3 × 2 × 1 = 120. Ünlem işareti (!) gösterimi ilk kez
            1808&apos;de Fransız matematikçi Christian Kramp tarafından
            kullanılmıştır — kendi ifadesiyle, matbaacıların büyük
            sayıların çarpımını yazarken karşılaştığı pratik zorluğu
            çözmek için.
          </p>

          <h2>0! neden 1&apos;dir?</h2>
          <p>
            Faktöriyel tanımı n=0 için de genişletilmiştir: 0! = 1. Bunun
            nedeni, matematikte <strong>boş çarpım</strong> kavramıdır —
            hiçbir terimin çarpılmadığı bir çarpımın sonucu, çarpmanın
            etkisiz elemanı olan 1 kabul edilir (tıpkı boş bir toplamın
            0 olması gibi). Bu tanım keyfi değildir: permütasyon formülü
            n!/(n−r)! gibi ifadelerin r=n olduğu sınır durumda anlamlı
            kalabilmesi için matematiksel olarak gereklidir.
          </p>

          <h2>Faktöriyelin patlayıcı büyümesi</h2>
          <p>
            Faktöriyel, bilinen en hızlı büyüyen fonksiyonlardan biridir —
            üstel fonksiyonlardan (aⁿ) bile daha hızlı büyür. 10! =
            3.628.800 iken, 20! = 2.432.902.008.176.640.000 (19 basamaklı),
            100! ise 158 basamaklı bir sayıdır. Bu denli büyük sayılarla
            çalışmak için matematikçiler <strong>Stirling
            yaklaşımı</strong>nı geliştirmiştir (n! ≈ √(2πn)(n/e)ⁿ) — n
            büyüdükçe gerçek değere giderek yakınsayan, hesaplaması çok
            daha kolay bir tahmin formülü.
          </p>

          <h2>Sondaki sıfır sayısı ve Legendre formülü</h2>
          <p>
            n!&apos;in sonunda kaç tane sıfır olduğu, aslında n! içindeki 10&apos;un
            (yani 2×5&apos;in) kaç kez çarpan olarak geçtiğiyle ilgilidir.
            2&apos;ler her zaman 5&apos;lerden fazla olduğundan, sondaki sıfır
            sayısı doğrudan n! içindeki 5 çarpanlarının sayısına eşittir —
            bu, Adrien-Marie Legendre&apos;nin adını taşıyan formülle
            ⌊n/5⌋+⌊n/25⌋+⌊n/125⌋+... şeklinde hesaplanır (her terim, o
            kuvvetteki 5&apos;in katlarını sayar).
          </p>

          <h2>Faktöriyelin permütasyon ve kombinasyonla ilişkisi</h2>
          <p>
            Faktöriyel, olasılık ve kombinatorik matematiğinin temel yapı
            taşıdır: n farklı nesnenin kaç farklı sırada dizilebileceği
            tam olarak n! ile verilir (permütasyon). n nesneden r tanesini
            sıra önemli/önemsiz seçme formülleri de (nPr = n!/(n−r)!, nCr
            = n!/(r!(n−r)!)) doğrudan faktöriyel üzerine kuruludur.
          </p>

          <h2>Gerçek hayatta nerede kullanılır?</h2>
          <p>
            Faktöriyel, olasılık hesaplarında (bir yarışta kaç farklı
            sonuç sırası olabileceği), şifreleme ve kombinatorik
            algoritmalarda (bir kilidin kaç farklı kombinasyonu olduğu),
            ve istatistikte (binom dağılımı formülünün içinde) sürekli
            karşımıza çıkar.
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
            nPr (permütasyon), nCr (kombinasyon) veya olasılık hesaplamak
            istersen{" "}
            <Link href="/bilim-hesaplayicilari/matematik/permutasyon-kombinasyon-hesaplama">
              Permütasyon, Kombinasyon ve Olasılık Hesaplama
            </Link>{" "}
            aracına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Faktöriyel tanımı ve Legendre&apos;nin sondaki sıfır formülü,
            standart kombinatorik matematik kaynaklarına dayanır.
          </p>
        </section>
        </div>

        <div className="unit-page-converter">
          <FactorialCalculator />
        </div>
        </div>
      </div>
    </main>
  );
}
