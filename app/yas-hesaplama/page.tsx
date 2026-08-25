import type { Metadata } from "next";
import Link from "next/link";
import DateCalculator from "../components/DateCalculator";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Yaş Hesaplama: Kaç Yaşındasın? (İki Tarih Arası Fark)",
  description:
    "Doğum tarihini gir, yaşını yıl-ay-gün olarak hesapla. İki tarih arasındaki gün, hafta ve ay farkını da aynı araçla anında görebilirsin.",
  alternates: {
    canonical: "/yas-hesaplama",
  },
  openGraph: {
    title: "Yaş Hesaplama: Kaç Yaşındasın? (İki Tarih Arası Fark)",
    description:
      "Doğum tarihinden yaşını, ya da iki tarih arasındaki farkı yıl-ay-gün olarak hesapla.",
    url: buildSiteUrl("/yas-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function DateCalculatorPage() {
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
        name: "Yaş Hesaplama",
        item: buildSiteUrl("/yas-hesaplama"),
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
          <span>Yaş Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Yaş Hesaplama</h1>
          <p>
            Doğum tarihini ve hedef tarihi seç: yaşını yıl, ay ve gün
            olarak, toplam gün/hafta/ay sayısını ve sonraki yıl dönümüne
            kalan gün sayısını gör. Aynı araç iki tarih arasındaki farkı
            hesaplamak için de kullanılabilir — başlangıç tarihine doğum
            günü yerine herhangi bir tarihi girebilirsin.
          </p>
        </header>

        <DateCalculator />

        <section className="category-article-content">
          <h2>Yaş nasıl hesaplanır?</h2>
          <p>
            Yaş hesaplaması basit bir çıkarma gibi görünse de, ay ve gün
            farkını doğru bulmak için takvimdeki değişken ay uzunluklarını
            (28-31 gün) hesaba katmak gerekir. Bu araç, hedef tarihten
            doğum tarihini çıkarırken önce gün, sonra ay, sonra yıl
            farkını bulur; gün farkı negatif çıkarsa bir önceki ayın gün
            sayısını ekleyip bir ay geriye sayar — böylece &quot;15
            Mart&apos;tan 3 Şubat&apos;a kaç ay geçti&quot; gibi sınır
            durumlarda da doğru sonuç verir.
          </p>

          <h2>İki tarih arasındaki fark nasıl hesaplanır?</h2>
          <p>
            Aynı hesaplama mantığı, doğum tarihiyle sınırlı değil — iki
            tarih arasındaki farkı bulmak için de kullanılabilir. Örneğin
            bir projenin başlangıç ve bitiş tarihi, ya da bir sözleşmenin
            süresi arasındaki gün sayısını öğrenmek için başlangıç
            tarihine ilk tarihi, hedef tarihe ikinci tarihi girmen
            yeterli.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>Sonraki yıl dönümü ne anlama geliyor?</strong>
            <br />
            Başlangıç tarihindeki ay ve günün, hedef tarihten sonraki ilk
            tekrarını gösterir. Başlangıç tarihi bir doğum günüyse, bu
            senin bir sonraki doğum gününe kaç gün kaldığını gösterir.
          </p>
          <p>
            <strong>29 Şubat doğumlular için ne oluyor?</strong>
            <br />
            Artık yıl olmayan yıllarda 29 Şubat bulunmadığı için tarayıcı
            bu tarihi otomatik olarak 1 Mart&apos;a kaydırır; bu yaygın
            kabul gören bir yaklaşımdır.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Hesaplama, JavaScript&apos;in yerleşik takvim/tarih
            mantığına dayanır; ay uzunlukları Gregoryen takvim
            kurallarına göre otomatik belirlenir.
          </p>
        </section>
      </div>
    </main>
  );
}
