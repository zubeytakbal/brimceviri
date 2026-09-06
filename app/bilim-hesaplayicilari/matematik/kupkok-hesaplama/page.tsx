import type { Metadata } from "next";
import Link from "next/link";
import CubeRootCalculator from "../../../components/CubeRootCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Küpkök nedir?",
    answer:
      "Bir sayının küpkökü, kendisiyle üç kez çarpıldığında (küpü alındığında) o sayıyı veren değerdir: ∛x = y ⟺ y³ = x. Örneğin ∛27 = 3, çünkü 3 × 3 × 3 = 27.",
  },
  {
    question: "Karekökten farkı nedir?",
    answer:
      "Karekök, karesi alındığında (2. kuvvet) sonucu veren sayıyı bulur ve negatif sayılarda gerçek sayılarda tanımsızdır. Küpkök ise küpü alındığında (3. kuvvet) sonucu veren sayıyı bulur ve negatif sayılarda da tanımlıdır — çünkü negatif bir sayının küpü yine negatiftir (örn. (−2)³ = −8, dolayısıyla ∛−8 = −2).",
  },
  {
    question: "Tam küp sayı nedir?",
    answer:
      "Küpkökü tam sayı çıkan sayılara tam küp denir (1, 8, 27, 64, 125...). Asal çarpanlara ayrıldığında tüm üslerin 3'ün katı olması, sayının tam küp olduğunun göstergesidir.",
  },
  {
    question: "Küpkök nasıl sadeleştirilir?",
    answer:
      "Sayı asal çarpanlarına ayrılır, her çarpanın üssü 3'e bölünür — 3'e tam bölünen kısım küpkökten dışarı bir katsayı olarak çıkar, kalan (varsa) içeride kalır. Örneğin 24 = 2³×3 olduğundan ∛24 = 2∛3'tür.",
  },
];

export const metadata: Metadata = {
  title: "Küpkök Hesaplama: Asal Çarpanlarla Sadeleştirme",
  description:
    "Bir sayının küpkökünü, tam sayılarda asal çarpanlara ayırarak en sade radikal formuyla, ondalık sayılarda doğrudan hesaplayın.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/matematik/kupkok-hesaplama",
  },
  openGraph: {
    title: "Küpkök Hesaplama: Asal Çarpanlarla Sadeleştirme",
    description: "Küpkökü adım adım, en sade radikal formuyla hesaplayın.",
    url: buildSiteUrl("/bilim-hesaplayicilari/matematik/kupkok-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function KupkokHesaplamaPage() {
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
        name: "Küpkök Hesaplama",
        item: buildSiteUrl("/bilim-hesaplayicilari/matematik/kupkok-hesaplama"),
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
          <span>Küpkök Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Küpkök Hesaplama</h1>
          <p>
            Bir sayının küpkökünü, asal çarpanlara ayırarak en sade
            radikal formuyla ve ondalık karşılığıyla adım adım hesapla.
          </p>
        </header>

        <div className="unit-page-layout wide-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>Küpkök nedir?</h2>
          <p>
            Bir sayının <strong>küpkökü</strong>, kendisiyle üç kez
            çarpıldığında (küpü alındığında) o sayıyı veren değerdir: ∛x =
            y ⟺ y³ = x. Örneğin ∛27 = 3, çünkü 3 × 3 × 3 = 27. Küpkök
            simgesi, karekök simgesinin (√) üzerine küçük bir "3" (kök
            derecesi) eklenerek yazılır: ∛.
          </p>

          <h2>Karekökten temel farkı: negatif sayılar</h2>
          <p>
            Karekökün aksine, <strong>küpkök negatif sayılarda da gerçek
            sayılar kümesinde tanımlıdır</strong>. Bunun nedeni, negatif
            bir sayının küpünün yine negatif olmasıdır: (−2)³ = (−2)×(−2)×(−2)
            = −8. Dolayısıyla ∛−8 = −2'dir — karekökte olduğu gibi
            "tanımsız" bir durum söz konusu değildir, çünkü tek sayıda
            (3 kez) çarpılan negatif bir sayı negatif kalır.
          </p>

          <h2>Tam küp sayılar</h2>
          <p>
            Küpkökü tam sayı çıkan sayılara <strong>tam küp</strong> denir:
            1, 8, 27, 64, 125, 216... Asal çarpanlarına ayrıldığında tüm
            üslerin 3'ün katı olması, bir sayının tam küp olduğunun
            göstergesidir. Örneğin 216 = 2³ × 3³ — her iki üs de 3'ün katı
            olduğundan 216 tam küptür ve ∛216 = 2 × 3 = 6.
          </p>

          <h2>Sadeleştirme yöntemi: üçlü gruplar</h2>
          <p>
            Tam küp olmayan bir sayının küpkökü, karekökteki yönteme
            benzer şekilde sadeleştirilebilir — tek fark, çift yerine{" "}
            <strong>üçlü gruplar</strong> aranmasıdır. Sayı{" "}
            <Link href="/bilim-hesaplayicilari/matematik/ebob-ekok-hesaplama">
              asal çarpanlarına ayrılır
            </Link>
            , her çarpanın üssü 3'e bölünür: 3'e tam bölünen kısım
            küpkökten dışarı bir katsayı olarak çıkar, kalan (üssü 1 veya
            2 olan çarpan varsa) içeride kalır. Örneğin 24 = 2³ × 3: 2'nin
            üssü 3'e tam bölündüğünden dışarı 2¹ = 2 olarak çıkar, 3'ün
            üssü 1 olduğundan içeride kalır. Sonuç: ∛24 = 2∛3.
          </p>

          <h2>Küpkök ile üslü sayılar arasındaki ilişki</h2>
          <p>
            Küpkök, 1/3 kuvvetine yükseltmeye eşdeğerdir: ∛x = x^(1/3). Bu,
            karekökün x^(1/2) olarak yazılmasıyla aynı mantığın bir
            genellemesidir — n. dereceden kök, x^(1/n) biçiminde
            yazılabilir.
          </p>

          <h2>Gerçek hayatta nerede kullanılır?</h2>
          <p>
            Küpkök hesapları, geometri ve mühendislikte bir küpün
            hacminden kenar uzunluğunu bulmada (V = a³ ⟹ a = ∛V), fizikte
            yoğunluk-kütle-hacim ilişkilerinde, ve istatistikte bazı veri
            dönüşüm tekniklerinde (aşırı çarpık dağılımları
            normalleştirmek için) kullanılır.
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
            Küpkök sadeleştirme yöntemi ve tam küp tanımı, standart
            ortaokul ve lise matematik müfredatına dayanır.
          </p>
        </section>
        </div>

        <div className="unit-page-converter">
          <CubeRootCalculator />
        </div>
        </div>
      </div>
    </main>
  );
}
