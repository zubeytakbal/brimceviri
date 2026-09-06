import type { Metadata } from "next";
import Link from "next/link";
import SquareRootCalculator from "../../../components/SquareRootCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Karekök nedir?",
    answer:
      "Bir sayının karekökü, kendisiyle çarpıldığında o sayıyı veren negatif olmayan sayıdır. √x = y ise y × y = x'tir. Örneğin √16 = 4, çünkü 4 × 4 = 16.",
  },
  {
    question: "Tam kare sayı nedir?",
    answer:
      "Karekökü tam sayı olan sayılara tam kare denir (1, 4, 9, 16, 25, 36...). Bir tam sayının asal çarpanlarına ayrıldığında tüm üslerin çift olması, o sayının tam kare olduğunun garantisidir.",
  },
  {
    question: "Tam kare olmayan bir sayının karekökü nasıl sadeleştirilir?",
    answer:
      "Sayı asal çarpanlarına ayrılır. Her asal çarpanın üssü ikiye bölünür: çift kısımlar (tam bölünen kısım) karekökten dışarı bir katsayı olarak çıkar, üssü tek kalan (bölünemeyen) çarpanlar içeride kalır. Örneğin 12 = 2²×3 olduğundan √12 = 2√3'tür.",
  },
  {
    question: "Negatif bir sayının karekökü var mı?",
    answer:
      "Gerçek sayılar kümesinde negatif bir sayının karekökü tanımlı değildir, çünkü hiçbir gerçek sayının karesi negatif olamaz. Bu, karmaşık sayılar kümesinde 'i' (sanal birim) ile tanımlanır, ancak bu ortaokul-lise müfredatının dışındadır.",
  },
];

export const metadata: Metadata = {
  title: "Karekök Hesaplama: Asal Çarpanlarla Sadeleştirme",
  description:
    "Bir sayının karekökünü, tam sayılarda asal çarpanlara ayırarak en sade radikal formuyla, ondalık sayılarda doğrudan hesaplayın.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/matematik/karekok-hesaplama",
  },
  openGraph: {
    title: "Karekök Hesaplama: Asal Çarpanlarla Sadeleştirme",
    description: "Karekökü adım adım, en sade radikal formuyla hesaplayın.",
    url: buildSiteUrl("/bilim-hesaplayicilari/matematik/karekok-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function KarekokHesaplamaPage() {
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
        name: "Karekök Hesaplama",
        item: buildSiteUrl(
          "/bilim-hesaplayicilari/matematik/karekok-hesaplama"
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
          <span>Karekök Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Karekök Hesaplama</h1>
          <p>
            Bir sayının karekökünü, asal çarpanlara ayırarak en sade
            radikal formuyla ve ondalık karşılığıyla adım adım hesapla.
          </p>
        </header>

        <div className="unit-page-layout wide-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>Karekök nedir?</h2>
          <p>
            Bir sayının <strong>karekökü</strong>, kendisiyle çarpıldığında
            o sayıyı veren negatif olmayan değerdir: √x = y ⟺ y² = x. Kök
            alma işlemi, üs alma işleminin tersidir — tıpkı çıkarmanın
            toplamanın tersi, bölmenin çarpmanın tersi olması gibi.
            Karekök simgesi (√) ilk kez 16. yüzyılda Alman matematikçi
            Christoff Rudolff tarafından kullanılmıştır; kökünden geldiği
            düşünülen "radix" (Latince "kök") kelimesinden dolayı sayıya{" "}
            <strong>radikand</strong> (kök içi) denir.
          </p>

          <h2>Tam kare sayılar</h2>
          <p>
            Karekökü tam sayı çıkan sayılara <strong>tam kare</strong>{" "}
            denir: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100... Bir sayının tam
            kare olup olmadığını asal çarpanlarına ayırarak da anlayabiliriz:
            tüm asal çarpanların üssü çiftse, sayı tam karedir. Örneğin 36 =
            2² × 3² — her iki üs de çift olduğundan 36 tam karedir ve √36 =
            2¹ × 3¹ = 6.
          </p>

          <h2>Sadeleştirme yöntemi: çift-tek üs ayrımı</h2>
          <p>
            Tam kare olmayan bir sayının karekökü, "en sade radikal form"a
            indirgenebilir. Yöntem:{" "}
            <Link href="/bilim-hesaplayicilari/matematik/ebob-ekok-hesaplama">
              sayıyı asal çarpanlarına ayır
            </Link>
            , her asal çarpanın üssünü ikiye böl — çift kısım (tam
            bölünen) karekökten bir katsayı olarak dışarı çıkar, kalan tek
            kısım (üssü 1 olan çarpan varsa) içeride kalır. Örneğin 12 = 2²
            × 3: 2'nin üssü olan 2, ikiye tam bölünüp dışarı 2¹ = 2 olarak
            çıkar; 3'ün üssü 1 olduğundan içeride kalır. Sonuç: √12 = 2√3.
          </p>

          <h2>Karekök alma yöntemlerinin tarihi</h2>
          <p>
            Karekök hesaplama, matematiğin bilinen en eski problemlerinden
            biridir — Babilliler'in MÖ 1800 civarına tarihlenen kil
            tabletlerinde (YBC 7289) √2'nin şaşırtıcı derecede hassas bir
            yaklaşık değeri bulunmuştur. Eski Yunan matematikçi
            Pisagorcular, √2'nin tam sayıların oranı olarak yazılamayacağını
            (yani <strong>irrasyonel</strong> olduğunu) keşfettiklerinde bu
            fikrin döneminin sayı anlayışını sarstığı bilinir. Newton-Raphson
            yöntemi gibi modern sayısal algoritmalar, bugün hesap
            makinelerinin ve bilgisayarların karekök hesaplarken kullandığı
            temel yaklaşımlardandır.
          </p>

          <h2>Karekök ile üslü sayılar arasındaki ilişki</h2>
          <p>
            Karekök, aslında 1/2 kuvvetine yükseltmeye eşdeğerdir: √x = x^(1/2).
            Bu gösterim, küpkök (x^(1/3)) ve daha yüksek dereceden kökler
            için de genellenebilir — n. dereceden kök, x^(1/n) olarak
            yazılır. Bu ilişki, üslü sayılarla kök işlemlerinin aynı
            matematiksel çerçevede ele alınmasını sağlar.
          </p>

          <h2>Gerçek hayatta nerede kullanılır?</h2>
          <p>
            Karekök hesapları, Pisagor teoreminde (dik üçgende hipotenüs
            uzunluğu bulma), fizik formüllerinde (serbest düşme hızı,
            sarkaç periyodu), standart sapma hesaplarında (istatistikte
            varyansın karekökü alınarak bulunur) ve mühendislikte alan-kenar
            ilişkilerinde (bir karenin alanından kenar uzunluğunu bulma
            gibi) sürekli kullanılır.
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
            Karekök sadeleştirme yöntemi ve tam kare tanımı, standart
            ortaokul ve lise matematik müfredatına dayanır.
          </p>
        </section>
        </div>

        <div className="unit-page-converter">
          <SquareRootCalculator />
        </div>
        </div>
      </div>
    </main>
  );
}
