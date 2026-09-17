import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Bit hızı çok düşük veya çok yüksek olursa ne olur?",
    answer:
      "Çok düşük bit hızı bulanık, pikselli bir görüntüye yol açar. Çok yüksek bit hızı ise gereksiz yere büyük dosya boyutuna neden olur; hedef platforma (YouTube, Instagram vb.) göre önerilen bir aralıkta kalmak en iyisidir.",
  },
  {
    question: "Sabit (CBR) ve değişken (VBR) bit hızı arasındaki fark nedir?",
    answer:
      "CBR (Constant Bit Rate), videonun her anında aynı bit hızını korur — dosya boyutu tahmin etmek kolaydır, canlı yayın gibi kararlı bant genişliği gereken durumlarda tercih edilir. VBR (Variable Bit Rate), hareketli/karmaşık sahnelerde daha yüksek, sabit/basit sahnelerde daha düşük bit hızı kullanarak aynı kalitede daha küçük dosya boyutu elde eder — çoğu platforma yükleme için VBR önerilir.",
  },
  {
    question: "Bit hızı ile çözünürlük ve kare hızı (FPS) nasıl ilişkilidir?",
    answer:
      "Aynı bit hızında, çözünürlük veya kare hızı arttıkça kodlanacak görüntü verisi arttığı için kalite düşer. Bu yüzden 4K veya yüksek FPS (60fps gibi) bir video, 1080p/30fps ile aynı görsel kaliteyi korumak için çok daha yüksek bir bit hızına ihtiyaç duyar.",
  },
];

export const metadata: Metadata = {
  title: "Video Editör Araçları: Bit Hızı ve Dosya Boyutu Hesaplama",
  description:
    "Video editörleri için tek sayfada toplanmış araçlar: bit hızı ve dosya boyutu hesaplama, veri depolama birimi dönüşümleri.",
  alternates: {
    canonical: "/video-editor-araclari",
  },
  openGraph: {
    title: "Video Editör Araçları: Bit Hızı ve Dosya Boyutu Hesaplama",
    description: "Bit hızı ve dosya boyutu hesaplama tek sayfada.",
    url: buildSiteUrl("/video-editor-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const bitrateTable = [
  ["1080p, standart kare hızı (SDR)", "8 Mbps"],
  ["1080p, yüksek kare hızı (SDR)", "12 Mbps"],
  ["720p, standart kare hızı (SDR)", "5 Mbps"],
  ["720p, yüksek kare hızı (SDR)", "7,5 Mbps"],
  ["4K (2160p), standart kare hızı (SDR)", "35-45 Mbps"],
  ["4K (2160p), yüksek kare hızı (SDR)", "53-68 Mbps"],
];

export default function VideoEditorAraclariPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Video Editör Araçları", item: buildSiteUrl("/video-editor-araclari") },
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
          <span>Video Editör Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Video Editör Araçları</h1>
          <p>
            Video editörlerinin dışa aktarım ayarlarını planlarken
            ihtiyaç duyduğu hesaplama araçlarını tek sayfada topladık:
            bit hızı ve dosya boyutu hesaplama, veri depolama birimi
            dönüşümleri.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>Dosya Boyutu (MB)</strong> = Bit Hızı (Mbps) × Süre (sn) / 8
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/video-bit-hizi-hesaplama">
                Video Bit Hızı ve Dosya Boyutu Hesaplama
              </Link>{" "}
              — bit hızı ve süreden dosya boyutunu, ya da hedef dosya
              boyutundan bit hızını hesapla.
            </li>
            <li>
              <Link href="/kategoriler/veri">Veri Depolama Dönüşümleri</Link>
              {" "}— bayt, KB, MB, GB, TB birimleri arasında dönüşüm
              yap.
            </li>
          </ul>

          <h2>YouTube Önerilen Yükleme Bit Hızları</h2>
          <p>
            YouTube&apos;un yayınladığı önerilen yükleme bit hızı
            değerleri (H.264 kodek, SDR video):
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Çözünürlük ve kare hızına göre önerilen bit hızları</caption>
              <thead>
                <tr>
                  <th scope="col">Çözünürlük / Kare Hızı</th>
                  <th scope="col">Önerilen Bit Hızı</th>
                </tr>
              </thead>
              <tbody>
                {bitrateTable.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, index) => (
                      <td key={`${row[0]}-${index}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Bu değerler platform ve kodekten (H.264, H.265/HEVC, VP9 gibi)
            bağımsız evrensel bir kural değildir; farklı platformlar
            (Instagram, TikTok, Vimeo) ve daha yeni/verimli kodekler farklı
            önerilerde bulunabilir.
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
            Önerilen bit hızı değerleri, YouTube&apos;un yayıncılar için
            yayınladığı resmi yükleme önerilerine dayanır.
          </p>
        </section>
      </div>
    </main>
  );
}
