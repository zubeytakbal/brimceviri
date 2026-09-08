import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "1000 tabanlı (KB/MB/GB) ve 1024 tabanlı (KiB/MiB/GiB) depolama birimleri neden farklı?",
    answer:
      "Disk üreticileri 1 GB'ı 1.000.000.000 bayt (1000 tabanlı, SI standardı) olarak pazarlar; işletim sistemleri ise genelde 1 GiB'ı 1.073.741.824 bayt (1024 tabanlı, ikili) olarak hesaplar. Bu fark, satın aldığın diskin işletim sisteminde neden daha küçük göründüğünü açıklar.",
  },
  {
    question: "Unix zaman damgası hangi saat dilimindedir?",
    answer:
      "Unix zaman damgası (epoch) her zaman UTC referanslıdır; yerel saate çevrilmesi gerekir. Bu sayfadaki zaman damgası çevirici, Türkiye saatini (UTC+3) otomatik hesaba katar.",
  },
];

export const metadata: Metadata = {
  title: "Yazılımcı Araçları: Byte, Unix Zaman Damgası, Renk Kodu",
  description:
    "Yazılımcı ve bilişimciler için tek sayfada toplanmış araçlar: unix zaman damgası çevirici, HEX/RGB/HSL renk kodu çevirici, sayı tabanı ve veri depolama dönüşümleri.",
  alternates: {
    canonical: "/yazilimci-araclari",
  },
  openGraph: {
    title: "Yazılımcı Araçları: Byte, Unix Zaman Damgası, Renk Kodu",
    description:
      "Unix zaman damgası, renk kodu, sayı tabanı ve veri depolama dönüşümleri tek sayfada.",
    url: buildSiteUrl("/yazilimci-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function YazilimciAraclariPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Yazılımcı Araçları", item: buildSiteUrl("/yazilimci-araclari") },
    ],
  };

  return (
    <main className="all-conversions-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/meslekler">Mesleğe Göre Araçlar</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Yazılımcı Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Yazılımcı Araçları</h1>
          <p>
            Yazılımcı ve bilişimcilerin günlük olarak ihtiyaç duyduğu
            hesaplama araçlarını ve birim dönüşümlerini tek sayfada
            topladık: unix zaman damgası, renk kodu, sayı tabanı ve
            veri depolama dönüşümleri.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>1 KB</strong> = 1000 bayt, <strong>1 KiB</strong> = 1024 bayt
            </li>
            <li>
              <strong>Unix epoch</strong>: 1 Ocak 1970 00:00:00 UTC
            </li>
            <li>
              <strong>HEX renk</strong>: #RRGGBB (00-FF aralığında)
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/unix-zaman-damgasi-cevirici">Unix Zaman Damgası Çevirici</Link>
              {" "}— epoch (saniye/milisaniye) ile tarih arasında, Türkiye
              saatine göre çevrim yap.
            </li>
            <li>
              <Link href="/renk-kodu-cevirici">Renk Kodu Çevirici</Link>
              {" "}— HEX, RGB ve HSL renk kodları arasında canlı önizlemeyle
              çevrim yap.
            </li>
            <li>
              <Link href="/sayi-tabani-cevirici">Sayı Tabanı Çevirici</Link>
              {" "}— ikili, sekizli, onlu ve onaltılık sayı sistemleri
              arasında çevrim yap.
            </li>
            <li>
              <Link href="/kategoriler/veri">Veri Depolama Dönüşümleri</Link>
              {" "}— bayt, KB, MB, GB, TB ve 1024 tabanlı (KiB/MiB/GiB)
              birimler arasında dönüşüm yap.
            </li>
            <li>
              <Link href="/uzaktan-calisma-ofis-maliyeti-karsilastirma">
                Uzaktan Çalışma mı Ofis mi?
              </Link>{" "}
              — kendi yol masrafın ve giderlerinle uzaktan çalışmanın
              yıllık net tasarrufunu hesapla.
            </li>
          </ul>

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
