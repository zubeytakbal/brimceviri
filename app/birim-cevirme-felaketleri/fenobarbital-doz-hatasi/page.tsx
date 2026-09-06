import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Grain ile gram arasındaki fark nedir?",
    answer:
      "Grain (gr), tarihte tahıl tanesinin ağırlığından türetilmiş çok eski bir kütle birimidir ve 0,06479891 grama eşittir. Gram ise metrik sistemin temel kütle birimidir. Yani 1 gram, 1 grain'den yaklaşık 15,43 kat daha ağırdır.",
  },
  {
    question: "1999 fenobarbital olayında ne oldu?",
    answer:
      "Bir hastaya günde 0,5 grain fenobarbital (sakinleştirici bir ilaç) verilmesi reçete edilmişti. Reçete yanlış okunduğu için hastaya günde 0,5 gram verildi — grain yerine gram uygulandığında doz yaklaşık 15,43 kat arttı. İlaç, günde üç ayrı intravenöz enjeksiyonla uygulandı.",
  },
  {
    question: "Hasta nasıl etkilendi?",
    answer:
      "ABD merkezli İlaç Güvenliği Uygulamaları Enstitüsü'nün (ISMP) raporuna göre, hasta birkaç gün boyunca normalin çok üzerinde doz aldıktan sonra solunum sorunları yaşamaya başladı. İlaç kesildiğinde hasta tamamen iyileşti.",
  },
  {
    question: "Bu tür hatalar tıpta neden hâlâ yaşanabiliyor?",
    answer:
      "Grain gibi eski, metrik olmayan birimler artık modern tıpta neredeyse hiç kullanılmıyor olsa da, eski reçete formatlarında veya farklı ülkelerin alışkanlıklarında hâlâ karşılaşılabiliyor. ISMP gibi kuruluşlar, bu tür hataları önlemek için ilaç reçetelerinde sadece metrik birimlerin (mg, g gibi) kullanılmasını önerir.",
  },
];

export const metadata: Metadata = {
  title: "Fenobarbital Doz Hatası: Gram ile Grain Karıştırılınca",
  description:
    "1999'da bir hastaya, reçetedeki 'grain' birimi 'gram' ile karıştırıldığı için gerekenin yaklaşık 15 katı fenobarbital dozu verildi. Gerçek olay, doğrulanmış kaynaklarla.",
  alternates: {
    canonical: "/birim-cevirme-felaketleri/fenobarbital-doz-hatasi",
  },
  openGraph: {
    title: "Fenobarbital Doz Hatası: Gram ile Grain Karıştırılınca",
    description:
      "Grain yerine gram kullanılınca doz, gerekenden yaklaşık 15 kat fazla oldu.",
    url: buildSiteUrl("/birim-cevirme-felaketleri/fenobarbital-doz-hatasi"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function PhenobarbitalDosingErrorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Birim Çevirme Felaketleri",
        item: buildSiteUrl("/birim-cevirme-felaketleri"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Fenobarbital Doz Hatası",
        item: buildSiteUrl("/birim-cevirme-felaketleri/fenobarbital-doz-hatasi"),
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
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }}
      />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/birim-cevirme-felaketleri">Birim Çevirme Felaketleri</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Fenobarbital Doz Hatası</span>
        </nav>

        <header className="all-conversions-header">
          <div className="disaster-hero-meta">
            <span className="disaster-category-badge">Tıp</span>
            <span className="disaster-year-badge">1999</span>
          </div>
          <h1>Fenobarbital Doz Hatası: Gram ile Grain Karıştırılınca</h1>
          <p>
            Bir hastaya, reçetedeki &quot;grain&quot; birimi
            &quot;gram&quot; ile karıştırıldığı için gerekenin yaklaşık
            15 katı fenobarbital dozu verildi.
          </p>
        </header>

        <section className="category-article-content">
          <div className="disaster-fact-grid">
            <div>
              <span>İlaç</span>
              <strong>Fenobarbital (sakinleştirici)</strong>
            </div>
            <div>
              <span>Hata</span>
              <strong>grain yerine gram</strong>
            </div>
            <div>
              <span>Doz Farkı</span>
              <strong>~15,43 kat</strong>
            </div>
            <div>
              <span>Sonuç</span>
              <strong>Tam iyileşme</strong>
            </div>
          </div>

          <h2>Ne oldu?</h2>
          <p>
            1999&apos;da bir hastaya, güçlü bir sakinleştirici olan
            fenobarbitalin günde <strong>0,5 grain</strong> verilmesi
            reçete edildi. Ancak reçete yanlış okundu ve hastaya günde{" "}
            <strong>0,5 gram</strong> uygulandı — ilaç, günde üç ayrı
            intravenöz enjeksiyonla verildi. Olay, İlaç Güvenliği
            Uygulamaları Enstitüsü (ISMP) tarafından raporlandı.
          </p>

          <h2>Hata nasıl bu kadar büyüdü?</h2>
          <p>
            Grain, tarihte tahıl tanesinin ağırlığından türetilmiş çok
            eski bir birimdir ve <strong>1 grain ≈ 0,065 gram</strong>{" "}
            eder. &quot;0,5&quot; sayısı reçetede aynı kalsa da, birim
            grain&apos;den grama değiştiğinde doz, olması gerekenin
            yaklaşık <strong>15,43 katına</strong> çıktı. Sayı aynıydı,
            ama birim farklıydı — ve sonuç, hayati tehlike oluşturan bir
            doz aşımıydı.
          </p>

          <div className="disaster-pullquote">
            &quot;0,5 sayısı değişmedi. Sadece hangi birimde olduğu
            unutuldu — ve bu, dozun 15 katına çıkmasına yetti.&quot;
          </div>

          <h2>Hasta ne oldu?</h2>
          <p>
            ISMP&apos;nin raporuna göre hasta, birkaç gün boyunca aşırı
            yüksek doz fenobarbital aldıktan sonra solunum sorunları
            yaşamaya başladı. Doktorlar durumu fark edip ilacı
            kestiğinde hasta tamamen iyileşti — ama olay, doz
            hesaplamalarında birim hatalarının ne kadar hızlı hayati
            hale gelebileceğini gösterdi.
          </p>

          <h2>Bu bize ne öğretiyor?</h2>
          <p>
            ISMP bu olayın ardından, ilaç reçetelerinde sadece metrik
            birimlerin (miligram, gram gibi) kullanılmasını, grain gibi
            eski ve karıştırılmaya açık birimlerden kaçınılmasını
            önerdi. Tıpta bir birim hatası, mühendislikteki bir hatadan
            farklı olarak anında ve doğrudan bir insan hayatını
            etkileyebilir — bu da doğru birimi kullanmayı, sadece
            teknik değil, hayati bir konu haline getiriyor.
          </p>

          <p className="category-inline-link">
            İlgili araç:{" "}
            <Link href="/gram-grain">Gram ↔ Grain çevirici</Link> ile bu
            olaydaki 15,43 katlık farkı kendin hesaplayabilirsin.
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
            Bu sayfadaki bilgiler, İlaç Güvenliği Uygulamaları Enstitüsü
            (ISMP) tarafından yayınlanan vaka raporuna dayanmaktadır.
          </p>
        </section>
      </div>
    </main>
  );
}
