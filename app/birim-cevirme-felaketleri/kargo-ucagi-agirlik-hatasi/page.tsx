import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Kargo uçağı neden 15 ton fazla yükle indi?",
    answer:
      "1994'te American International Airways'e (bugünkü Kalitta Air) ait bir kargo uçağının yükleme hesaplarında kilogram-pound dönüşümü doğru yapılmadı. Yük, kilogram cinsinden tartılıp pound olarak kaydedilmiş olmalı ya da tam tersi — sonuç olarak uçağa planlanandan yaklaşık 15 ton daha ağır bir yük yüklendi.",
  },
  {
    question: "Bu hata nasıl ortaya çıktı?",
    answer:
      "Olay, Amerikan Federal Havacılık İdaresi'ne (FAA) yapılan isimsiz bir ihbarla gün yüzüne çıktı. FAA'nın incelemesi, sorunun kilogram-pound dönüşümündeki bir hesaplama hatasından kaynaklandığını ortaya koydu.",
  },
  {
    question: "15 ton fazla yük neden tehlikeli?",
    answer:
      "Bir uçağın azami kalkış ve iniş ağırlığı, yapısal dayanıklılık, fren mesafesi ve performans hesaplarına göre belirlenir. Bu sınırın aşılması, özellikle iniş sırasında fren sisteminin ve iniş takımlarının kapasitesini zorlayabilir, pistin yetersiz kalmasına ve yapısal hasara yol açabilir.",
  },
  {
    question: "Kilogram ve pound karışıklığı havacılıkta ne sıklıkla yaşanıyor?",
    answer:
      "Havacılık, dünya genelinde hem metrik (çoğu ülke) hem imperial (ABD ve bazı eski İngiliz sömürgeleri) birimlerin karma kullanıldığı birkaç sektörden biri. Yakıt, yük ve irtifa gibi değerler ülkeden ülkeye farklı birimlerle raporlanabildiği için, bu tür karışıklıklar hâlâ risk taşıyan bir alan olarak kabul ediliyor.",
  },
];

export const metadata: Metadata = {
  title: "Kargo Uçağı: Kilogram-Pound Karışıklığıyla 15 Ton Fazla Yük",
  description:
    "1994'te bir kargo uçağı, yükleme hesaplarında kilogram-pound dönüşümü karıştırıldığı için gerekenden 15 ton daha ağır bir yükle indi. Gerçek olay, doğrulanmış kaynaklarla.",
  alternates: {
    canonical: "/birim-cevirme-felaketleri/kargo-ucagi-agirlik-hatasi",
  },
  openGraph: {
    title: "Kargo Uçağı: Kilogram-Pound Karışıklığıyla 15 Ton Fazla Yük",
    description:
      "Kilogram-pound dönüşüm hatası, bir kargo uçağının 15 ton fazla yükle inmesine yol açtı.",
    url: buildSiteUrl("/birim-cevirme-felaketleri/kargo-ucagi-agirlik-hatasi"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function CargoWeightErrorPage() {
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
        name: "Kargo Uçağı Ağırlık Hatası",
        item: buildSiteUrl("/birim-cevirme-felaketleri/kargo-ucagi-agirlik-hatasi"),
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
          <span>Kargo Uçağı Ağırlık Hatası</span>
        </nav>

        <header className="all-conversions-header">
          <div className="disaster-hero-meta">
            <span className="disaster-category-badge">Kargo</span>
            <span className="disaster-year-badge">1994</span>
          </div>
          <h1>Kargo Uçağı: Kilogram-Pound Karışıklığıyla 15 Ton Fazla Yük</h1>
          <p>
            American International Airways&apos;e ait bir kargo uçağı,
            yükleme hesaplarında kilogram-pound dönüşümü karıştırıldığı
            için gerekenden 15 ton daha ağır bir yükle iniş yaptı.
          </p>
        </header>

        <section className="category-article-content">
          <div className="disaster-fact-grid">
            <div>
              <span>Şirket</span>
              <strong>American International Airways</strong>
            </div>
            <div>
              <span>Yıl</span>
              <strong>1994</strong>
            </div>
            <div>
              <span>Fazla Yük</span>
              <strong>~15 ton</strong>
            </div>
            <div>
              <span>Nasıl Ortaya Çıktı</span>
              <strong>FAA&apos;ya anonim ihbar</strong>
            </div>
          </div>

          <h2>Ne oldu?</h2>
          <p>
            1994&apos;te, kargo taşımacılığı yapan American International
            Airways&apos;e (bugünkü adıyla Kalitta Air) ait bir uçak,
            planlanandan çok daha ağır bir yükle uçtu ve indi. Olay, bir
            kazaya yol açmadı — ama Amerikan Federal Havacılık İdaresi&apos;ne
            (FAA) yapılan isimsiz bir ihbar sayesinde ortaya çıktı ve
            resmi bir incelemeye konu oldu.
          </p>

          <h2>Hata nasıl oluştu?</h2>
          <p>
            FAA&apos;nın incelemesi, sorunun yükleme hesaplarında
            yapılan bir <strong>kilogram-pound dönüşüm hatasından</strong>{" "}
            kaynaklandığını ortaya koydu. Yükün ağırlığı bir birimde
            ölçülüp yanlışlıkla diğer birimmiş gibi işleme alınınca,
            uçağa gerçekte taşıyabileceğinden yaklaşık{" "}
            <strong>15 ton daha ağır</strong> bir yük yüklenmiş oldu.
          </p>

          <div className="disaster-pullquote">
            &quot;Bir sayı doğru görünebilir — ama hangi birimde
            olduğunu doğrulamadan güvenmek, 15 tonluk bir farkı
            gözden kaçırmak anlamına gelebilir.&quot;
          </div>

          <h2>Neden tehlikeliydi?</h2>
          <p>
            Bir uçağın azami kalkış ve iniş ağırlığı; kanat yapısının
            dayanıklılığı, fren sisteminin kapasitesi, iniş takımlarının
            gücü ve pist uzunluğu gibi birçok mühendislik hesabına göre
            belirlenir. Bu sınırın 15 ton gibi büyük bir farkla aşılması,
            özellikle iniş sırasında ciddi bir yapısal ve operasyonel
            risk oluşturur — bu olayda bir kaza yaşanmamış olması,
            sonucun her zaman böyle şanslı olacağı anlamına gelmez.
          </p>

          <h2>Bu bize ne öğretiyor?</h2>
          <p>
            Bu olay, birim hatalarının her zaman dramatik bir kaza ile
            sonuçlanmayabileceğini, ama yine de ciddi güvenlik riskleri
            taşıdığını gösteriyor. Kargo ve lojistik sektöründe, farklı
            ülkeler ve şirketler arasında kilogram ve pound birimlerinin
            bir arada kullanılması, bu tür hataların hâlâ mümkün
            olduğu anlamına geliyor.
          </p>

          <p className="category-inline-link">
            İlgili araç:{" "}
            <Link href="/kilogram-pound">Kilogram ↔ Pound çevirici</Link>{" "}
            ile yük hesaplarını doğrula.
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
            Bu sayfadaki bilgiler, olay hakkında yayınlanan havacılık
            tarihi derlemelerine ve FAA incelemesine atıfta bulunan
            kaynaklara dayanmaktadır.
          </p>
        </section>
      </div>
    </main>
  );
}
