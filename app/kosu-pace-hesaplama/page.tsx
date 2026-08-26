import type { Metadata } from "next";
import Link from "next/link";
import PaceCalculator from "../components/PaceCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Koşu Pace Hesaplama: Tempo, Hız ve Bitiş Süresi",
  description:
    "Mesafe, süre ve tempo (dakika/km) arasında hesaplama yap; 5K, 10K, yarı maraton ve maraton için tahmini bitiş sürelerini anında gör.",
  alternates: {
    canonical: "/kosu-pace-hesaplama",
  },
  openGraph: {
    title: "Koşu Pace Hesaplama: Tempo, Hız ve Bitiş Süresi",
    description:
      "Mesafe, süre ve tempo arasında hesaplama yap; yarış mesafeleri için tahmini bitiş sürelerini gör.",
    url: buildSiteUrl("/kosu-pace-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

const faqItems: FaqItem[] = [
  {
    question: "Pace ile hız arasındaki fark nedir?",
    answer:
      "Pace (tempo), bir kilometreyi koşmak için geçen süredir (dk:sn/km) — koşucular arasında en yaygın kullanılan birimdir. Hız ise saatte kaç kilometre koştuğunu gösterir (km/sa). İkisi birbirinin tersidir; bu araç ikisini de birlikte gösterir.",
  },
  {
    question: "Yarış tahminleri ne kadar güvenilir?",
    answer:
      "Tahminler, mevcut temponu değişmeden koruyacağın varsayımına dayanır. Gerçekte uzun mesafelerde (özellikle maratonda) yorgunluk nedeniyle tempo düşebilir; bu yüzden kısa mesafe temponu doğrudan maraton tahmini için kullanmak iyimser bir üst sınır verir, kesin bir garanti değil.",
  },
];

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function PaceCalculatorPage() {
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
        name: "Koşu Pace Hesaplama",
        item: buildSiteUrl("/kosu-pace-hesaplama"),
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
          <span>Koşu Pace Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Koşu Pace Hesaplama</h1>
          <p>
            Mesafe + süre gir, temponu (dakika/km) bul; ya da tersi
            yönde hesapla. 5K, 10K, yarı maraton ve maraton için
            tahmini bitiş sürelerini aynı anda gör.
          </p>
        </header>

        <PaceCalculator />

        <section className="category-article-content">
          <h2>Pace nasıl hesaplanır?</h2>
          <p>
            Temel formül basittir:{" "}
            <strong>Tempo = Toplam Süre ÷ Mesafe</strong>. Örneğin 10
            kilometreyi 50 dakikada koşan birinin temposu 50 / 10 = 5
            dakika/km&apos;dir. Aynı formül tersine çevrilerek bilinen
            iki değerden üçüncüsü bulunabilir: mesafe ve tempo
            biliniyorsa süre, süre ve tempo biliniyorsa mesafe
            hesaplanır.
          </p>

          <h2>Yarış mesafeleri hangi standartlara dayanıyor?</h2>
          <p>
            5K ve 10K isimlerinden anlaşılacağı gibi tam olarak 5 ve
            10 kilometredir. Yarı maraton 21,0975 km, tam maraton ise
            42,195 km&apos;dir — bu iki mesafe World Athletics
            (Dünya Atletizm Federasyonu) tarafından resmi olarak
            belirlenmiştir.
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
            Yarış mesafeleri World Athletics&apos;in resmi mesafe
            standartlarına dayanır; tempo/hız dönüşüm formülü temel
            kinematik ilişkidir (hız = mesafe / zaman).
          </p>
        </section>
      </div>
    </main>
  );
}
