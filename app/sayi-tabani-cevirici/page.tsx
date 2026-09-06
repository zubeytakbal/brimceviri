import type { Metadata } from "next";
import Link from "next/link";
import NumberBaseCalculator from "../components/NumberBaseCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "İkili (binary) sayı sistemi nedir?",
    answer:
      "İkili sistem, yalnızca 0 ve 1 rakamlarını kullanan sayı gösterim biçimidir. Bilgisayarlar veriyi elektronik devrelerde iki durumla (açık/kapalı) temsil ettiği için temel olarak ikili sistemi kullanır.",
  },
  {
    question: "Onaltılık (hexadecimal) sistem nerede kullanılır?",
    answer:
      "Onaltılık sistem, 0-9 rakamları ile A-F harflerini kullanır. Renk kodları (#FF00FF gibi), bellek adresleri ve düşük seviyeli programlamada ikili sayıları daha kısa ve okunaklı göstermek için tercih edilir.",
  },
  {
    question: "Negatif sonuç veren çıkarma işlemini neden desteklemiyor?",
    answer:
      "Bu araç işaretsiz (unsigned) ikili aritmetik kullanır; bu yüzden çıkarma işleminde büyük sayıyı önce girmen gerekir. İşaretli negatif sayı gösterimi (two's complement) bu aracın kapsamı dışındadır.",
  },
];

export const metadata: Metadata = {
  title: "Sayı Tabanı Çevirici: İkili, Sekizli, Onlu, Onaltılık Dönüşüm",
  description:
    "İkili (binary), sekizli (octal), onlu (decimal) ve onaltılık (hexadecimal) sayı sistemleri arasında anında çevirin; ikili sayılarla toplama, çıkarma ve çarpma yapın.",
  alternates: {
    canonical: "/sayi-tabani-cevirici",
    languages: {
      tr: "/sayi-tabani-cevirici",
      bn: "/bn/number-base-calculator",
      "x-default": "/sayi-tabani-cevirici",
    },
  },
  openGraph: {
    title: "Sayı Tabanı Çevirici: İkili, Sekizli, Onlu, Onaltılık Dönüşüm",
    description:
      "İkili, sekizli, onlu ve onaltılık sayı sistemleri arasında anında çevirin.",
    url: buildSiteUrl("/sayi-tabani-cevirici"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function NumberBaseCalculatorPage() {
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
        name: "Matematik",
        item: buildSiteUrl("/bilim-hesaplayicilari/matematik"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Sayı Tabanı Çevirici",
        item: buildSiteUrl("/sayi-tabani-cevirici"),
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
          <Link href="/bilim-hesaplayicilari/matematik">Matematik</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Sayı Tabanı Çevirici</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Sayı Tabanı Çevirici</h1>
          <p>
            İkili, sekizli, onlu ve onaltılık sayı sistemleri arasında anında
            çevir; aşağıdaki ikinci araçla iki ikili sayıyı topla, çıkar veya
            çarp.
          </p>
        </header>

        <NumberBaseCalculator />

        <section className="category-article-content">
          <h2>Sayı tabanları nedir, nasıl çalışır?</h2>
          <p>
            Günlük hayatta kullandığımız <strong>onlu (decimal)</strong>{" "}
            sistem 10 rakam (0-9) kullanır. Bilgisayarlar ise veriyi{" "}
            <strong>ikili (binary)</strong> sistemde, yalnızca 0 ve 1
            rakamlarıyla temsil eder. <strong>Sekizli (octal)</strong> ve{" "}
            <strong>onaltılık (hexadecimal)</strong> sistemler, uzun ikili
            sayıları daha kısa ve okunabilir göstermek için kullanılır —
            özellikle programlama, ağ adresleme ve renk kodlarında sıkça
            karşına çıkarlar.
          </p>
          <p>
            Bir sayının tabanını değiştirmek, o sayının değerini değil,
            yalnızca gösterim biçimini değiştirir. Örneğin onlu sistemde 10
            sayısı, ikili sistemde 1010, onaltılık sistemde ise A olarak
            yazılır — hepsi aynı miktarı temsil eder.
          </p>

          <h2>İkili sayılarla toplama, çıkarma, çarpma nasıl yapılır?</h2>
          <p>
            İkili aritmetik, onlu sistemdeki işlemlerle aynı mantıkla
            çalışır; tek fark her basamağın yalnızca 0 veya 1 olabilmesidir.
            Bu araç, girdiğin iki ikili sayıyı arka planda onlu sisteme
            çevirip işlemi yapar, sonucu tekrar ikili olarak gösterir.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}
        </section>
      </div>
    </main>
  );
}
