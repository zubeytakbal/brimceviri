import type { Metadata } from "next";
import Link from "next/link";
import SleepCalculator from "../components/SleepCalculator";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Uyku Hesaplama: Kaçta Yatmalı, Kaçta Kalkmalıyım?",
  description:
    "Kalkmak istediğin saati (ya da yatacağın saati) gir: 90 dakikalık uyku döngülerine göre en dinlenmiş uyanacağın saatleri anında hesapla.",
  alternates: {
    canonical: "/uyku-hesaplama",
  },
  openGraph: {
    title: "Uyku Hesaplama: Kaçta Yatmalı, Kaçta Kalkmalıyım?",
    description:
      "90 dakikalık uyku döngülerine göre ideal yatış ve kalkış saatlerini hesaplayın.",
    url: buildSiteUrl("/uyku-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function SleepCalculatorPage() {
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
        name: "Uyku Hesaplama",
        item: buildSiteUrl("/uyku-hesaplama"),
      },
    ],
  };

  return (
    <main className="all-conversions-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Uyku Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Uyku Hesaplama</h1>
          <p>
            Kalkmak istediğin saati gir (ya da yatacağın saati): 90
            dakikalık uyku döngülerine göre hangi saatte uyursan daha
            dinlenmiş uyanacağını gör. 5-6 döngü (7,5-9 saat) genel
            olarak önerilen aralıktır.
          </p>
        </header>

        <SleepCalculator />

        <section className="category-article-content">
          <h2>Neden uyku süresi değil, döngü sayısı önemli?</h2>
          <p>
            Uyku, yaklaşık 90 dakika süren tekrarlayan döngülerden
            oluşur; her döngü hafif uyku, derin uyku ve REM (rüya)
            evrelerini içerir. Bir döngünün ortasında (özellikle derin
            uyku evresinde) uyanmak, kendini yorgun ve sersemlemiş
            hissetmene yol açar — bu yüzden toplam uyku süresi kadar,
            tam bir döngünün sonunda uyanmak da önemlidir. Bu araç, hedef
            saatine göre tam döngü sayılarıyla biten saatleri önerir.
          </p>

          <h2>Hesaplama nasıl yapılıyor?</h2>
          <p>
            Ortalama bir yetişkinin uykuya dalması yaklaşık 15 dakika
            sürer; bu araç bu süreyi de hesaba katar. &quot;Kaçta
            yatmalıyım?&quot; sorusunda, girdiğin kalkış saatinden geriye
            doğru (15 dakika uykuya dalma süresi + 3/4/5/6 döngü × 90
            dakika) çıkarılarak olası yatış saatleri bulunur.
            &quot;Kaçta kalkmalıyım?&quot; sorusunda ise aynı hesap
            ileri yönde yapılır.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>Neden 5 ve 6 döngü &quot;önerilen&quot; olarak işaretli?</strong>
            <br />
            Sağlık kuruluşlarının yetişkinler için önerdiği 7-9 saatlik
            uyku aralığına en yakın düşen döngü sayıları bunlardır (5
            döngü ≈ 7,5 saat, 6 döngü ≈ 9 saat). 3-4 döngü (4,5-6 saat)
            de gösterilir ama düzenli olarak bu kadar az uyumak
            önerilmez — bu seçenekler daha çok tek seferlik zorunlu
            durumlar için bir referanstır.
          </p>
          <p>
            <strong>Bu hesap herkes için birebir doğru mu?</strong>
            <br />
            Hayır — döngü uzunluğu kişiden kişiye biraz değişebilir (75-120
            dakika aralığında olabilir) ve yaş, stres, kafein gibi
            faktörler de uykuyu etkiler. Bu araç genel bir kılavuzdur,
            kesin bir tıbbi ölçüm değildir.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            90 dakikalık ortalama uyku döngüsü süresi ve yetişkinler
            için önerilen 7-9 saatlik uyku aralığı, yaygın kabul gören
            uyku hijyeni kaynaklarına dayanmaktadır.
          </p>
        </section>
      </div>
    </main>
  );
}
