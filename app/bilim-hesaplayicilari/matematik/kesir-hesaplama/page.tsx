import type { Metadata } from "next";
import Link from "next/link";
import FractionCalculator from "../../../components/FractionCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Kesirler nasıl toplanır veya çıkarılır?",
    answer:
      "Paydalar eşit değilse önce ortak payda bulunur (paydaların EKOK'u kullanılabilir), her kesir bu ortak paydaya göre genişletilir, ardından paylar toplanır veya çıkarılır. Sonuç, en büyük ortak bölene (EBOB) göre sadeleştirilir.",
  },
  {
    question: "Kesirler nasıl çarpılır veya bölünür?",
    answer:
      "Çarpmada paylar kendi aralarında, paydalar kendi aralarında çarpılır. Bölmede ise ikinci kesrin ters çevrilmiş hali (payı ve paydası yer değiştirmiş) ile çarpma işlemi yapılır.",
  },
  {
    question: "Bir kesir nasıl sadeleştirilir?",
    answer:
      "Payın ve paydanın en büyük ortak böleni (EBOB) bulunur, hem pay hem payda bu sayıya bölünür. Sonuçta pay ve paydanın 1'den başka ortak böleni kalmaz.",
  },
  {
    question: "Bileşik kesir nedir, tam sayılı kesire nasıl çevrilir?",
    answer:
      "Payı paydasından büyük veya eşit olan kesirlere bileşik kesir denir. Tam sayılı kesire çevirmek için pay paydaya bölünür; bölüm tam kısmı, kalan ise yeni payı oluşturur (payda değişmez).",
  },
];

export const metadata: Metadata = {
  title: "Kesir Hesaplama: Toplama, Çıkarma, Çarpma, Bölme",
  description:
    "İki kesri toplayın, çıkarın, çarpın veya bölün — sonucu sadeleştirilmiş, ondalık ve tam sayılı kesir gösterimiyle adım adım hesaplayın.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/matematik/kesir-hesaplama",
  },
  openGraph: {
    title: "Kesir Hesaplama: Toplama, Çıkarma, Çarpma, Bölme",
    description:
      "İki kesirle dört işlem yapın, sonucu adım adım görün.",
    url: buildSiteUrl("/bilim-hesaplayicilari/matematik/kesir-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function KesirHesaplamaPage() {
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
        name: "Kesir Hesaplama",
        item: buildSiteUrl("/bilim-hesaplayicilari/matematik/kesir-hesaplama"),
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
          <span>Kesir Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Kesir Hesaplama</h1>
          <p>
            İki kesri topla, çıkar, çarp veya böl — sonucu sadeleştirilmiş
            haliyle, ondalık karşılığıyla ve tam sayılı kesir gösterimiyle
            adım adım gör.
          </p>
        </header>

        <div className="unit-page-layout wide-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>Kesir nedir?</h2>
          <p>
            Bir <strong>kesir</strong>, bir bütünün eşit parçalara
            bölünmesiyle elde edilen parçalardan bir ya da birkaçını ifade
            eden sayıdır. a/b biçiminde yazılır; a <strong>pay</strong>{" "}
            (bütünden kaç parça alındığı), b ise <strong>payda</strong>{" "}
            (bütünün kaç eşit parçaya bölündüğü) olarak adlandırılır. Payda
            asla sıfır olamaz, çünkü bir bütünü "sıfır parçaya" bölmek
            tanımsızdır.
          </p>

          <h2>Toplama ve çıkarmada ortak payda</h2>
          <p>
            Paydaları farklı iki kesri toplamak veya çıkarmak için önce{" "}
            <strong>ortak payda</strong> bulunmalıdır — bu genellikle iki
            paydanın{" "}
            <Link href="/bilim-hesaplayicilari/matematik/ebob-ekok-hesaplama">
              en küçük ortak katı (EKOK)
            </Link>{" "}
            alınarak yapılır. Her kesir bu ortak paydaya göre genişletilir
            (pay ve payda aynı sayıyla çarpılır — bu, kesrin değerini
            değiştirmez, çünkü aslında 1'e eşit bir sayı ile çarpma
            yapılmış olur), ardından paylar toplanır ya da çıkarılır.
          </p>

          <h2>Çarpma ve bölme kuralları</h2>
          <p>
            Kesirlerin <strong>çarpımında</strong> ortak payda aramaya
            gerek yoktur: paylar kendi aralarında, paydalar kendi
            aralarında çarpılır (a/b × c/d = (a×c)/(b×d)).{" "}
            <strong>Bölme</strong> ise "ikinci kesrin tersini alıp çarpma"
            kuralına dayanır (a/b ÷ c/d = a/b × d/c = (a×d)/(b×c)) — bunun
            matematiksel nedeni, bir sayıyı c/d'ye bölmenin, o sayıyı
            d/c'nin çarpmaya göre tersi (çarpımsal tersi) ile çarpmakla
            aynı sonucu vermesidir.
          </p>

          <h2>Sadeleştirme ve EBOB bağlantısı</h2>
          <p>
            Bir işlem sonucunda elde edilen kesir genellikle{" "}
            <strong>sadeleştirilmelidir</strong>: pay ve paydanın{" "}
            <Link href="/bilim-hesaplayicilari/matematik/ebob-ekok-hesaplama">
              en büyük ortak böleni (EBOB)
            </Link>{" "}
            bulunur, ikisi de bu sayıya bölünür. Örneğin 6/8'in payı ve
            paydasının EBOB'u 2'dir, sadeleştirilmiş hali 3/4'tür. EBOB 1
            ise kesir zaten en sade halindedir.
          </p>

          <h2>Bileşik kesir ve tam sayılı kesir</h2>
          <p>
            Payı paydasından büyük veya paydaya eşit olan kesirlere{" "}
            <strong>bileşik kesir</strong> denir (örn. 7/3). Bu, pay
            paydaya bölünerek <strong>tam sayılı kesire</strong> çevrilebilir:
            bölümün tam kısmı tam sayı olarak yazılır, kalan ise paydası
            aynı kalan yeni bir kesir olur (7/3 = 2 tam 1/3, çünkü 7 = 2×3 +
            1).
          </p>

          <h2>Gerçek hayatta nerede kullanılır?</h2>
          <p>
            Kesir işlemleri, yemek tariflerinde ölçü ayarlarken (bir
            tarifi 1,5 katına çıkarmak gibi), inşaat ve marangozlukta ölçü
            hesaplarında, finansal oranlarda (hisse payları, faiz oranları)
            ve olasılık hesaplarında sürekli karşımıza çıkar. Bilgisayar
            biliminde de kesirli sayıların ikili (binary) sistemde tam
            olarak temsil edilememesi, kayan noktalı sayı hatalarının
            (floating-point) temel nedenlerinden biridir.
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
            Kesir işlemlerinin kuralları, standart ortaokul matematik
            müfredatına dayanır.
          </p>
        </section>
        </div>

        <div className="unit-page-converter">
          <FractionCalculator />
        </div>
        </div>
      </div>
    </main>
  );
}
