import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import VideoBitrateCalculator from "../components/VideoBitrateCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Video dosya boyutu bit hızından nasıl hesaplanır?",
    answer:
      "Dosya Boyutu (MB) = Bit Hızı (Mbps) × Süre (saniye) / 8. Örneğin 8 Mbps bit hızıyla kodlanmış 10 dakikalık (600 saniye) bir video: 8 × 600 / 8 = 600 MB.",
  },
  {
    question: "Hedef dosya boyutu için hangi bit hızını seçmeliyim?",
    answer:
      "Bit Hızı (Mbps) = Dosya Boyutu (MB) × 8 / Süre (saniye) formülüyle, belirli bir dosya boyutuna sığmak için gereken bit hızını hesaplayabilirsin.",
  },
];

// YouTube'un yukleme icin onerdigi SDR video bit hizlari (Mbps; standart / yuksek kare hizi).
const YOUTUBE_ONERI: Array<[string, number, number]> = [
  ["360p", 1, 1.5],
  ["480p", 2.5, 4],
  ["720p", 5, 7.5],
  ["1080p", 8, 12],
  ["1440p", 16, 24],
  ["2160p (4K)", 40, 60],
];
const dakikaMb = (mbps: number) => (mbps * 60) / 8;
const tr = (n: number) => n.toLocaleString("tr-TR", { maximumFractionDigits: 1 });

export const metadata: Metadata = {
  title: "Video Bit Hızı ve Dosya Boyutu Hesaplama",
  description:
    "Bit hızı (Mbps) ve süreden video dosya boyutunu (MB), ya da hedef dosya boyutundan gereken bit hızını hesapla.",
  alternates: {
    canonical: "/video-bit-hizi-hesaplama",
  },
  openGraph: {
    title: "Video Bit Hızı ve Dosya Boyutu Hesaplama",
    description: "Bit hızı ve dosya boyutu arasında hesaplama yap.",
    url: buildSiteUrl("/video-bit-hizi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function VideoBitrateCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Video Editör Araçları", item: buildSiteUrl("/video-editor-araclari") },
      { "@type": "ListItem", position: 4, name: "Video Bit Hızı ve Dosya Boyutu Hesaplama", item: buildSiteUrl("/video-bit-hizi-hesaplama") },
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
          <Link href="/video-editor-araclari">Video Editör Araçları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Video Bit Hızı ve Dosya Boyutu Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Video Bit Hızı ve Dosya Boyutu Hesaplama</h1>
          <p>
            Bit hızından (Mbps) dosya boyutunu (MB), ya da hedef dosya
            boyutundan gereken bit hızını hesapla.
          </p>
        </header>

        <VideoBitrateCalculator />

        <section className="category-article-content">
          <h2>Dakikada kaç MB? Çözünürlüğe göre tablo</h2>
          <p>
            Aşağıdaki bit hızları YouTube&apos;un yükleme için önerdiği SDR değerleridir (4K için önerilen 35-45 Mbps aralığının
            ortası alınmıştır). Dosya boyutu yalnızca video akışı içindir; ses akışı ve kapsayıcı (MP4, MKV) birkaç yüzde ekler.
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Çözünürlük</th>
                  <th>24-30 fps</th>
                  <th>1 dakika</th>
                  <th>1 saat</th>
                  <th>48-60 fps</th>
                  <th>1 dakika</th>
                </tr>
              </thead>
              <tbody>
                {YOUTUBE_ONERI.map(([ad, std, yuksek]) => (
                  <tr key={ad}>
                    <td>{ad}</td>
                    <td>{tr(std)} Mbps</td>
                    <td>{tr(dakikaMb(std))} MB</td>
                    <td>{tr((dakikaMb(std) * 60) / 1000)} GB</td>
                    <td>{tr(yuksek)} Mbps</td>
                    <td>{tr(dakikaMb(yuksek))} MB</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Örnek: 2 GB&apos;lık sınıra sığdırmak</h2>
          <p>
            45 dakikalık bir ders kaydını 2 GB (2000 MB) sınırı olan bir platforma yükleyeceksiniz. Süre 45 × 60 = 2700 saniye.
            Gereken toplam bit hızı 2000 × 8 / 2700 ≈ 5,9 Mbps. Ses için 192 kbps (0,19 Mbps) ayırırsanız videoya yaklaşık{" "}
            <strong>5,7 Mbps</strong> kalır; bu da 1080p için önerilen 8 Mbps&apos;in altında, 720p için yeterli bir değerdir.
            Güvenli tarafta kalmak için sonucu yüzde 3-5 düşük tutmak, kapsayıcı ek yükünü karşılar.
          </p>

          <h2>Neden 8&apos;e bölüyoruz?</h2>
          <p>
            Bit hızı saniyedeki <em>bit</em> sayısıdır (Mbps = megabit/saniye), dosya boyutu ise <em>bayt</em> ile ölçülür.
            1 bayt = 8 bit olduğu için megabit cinsinden toplamı 8&apos;e bölmek megabaytı verir. İnternet hızı da Mbps ile
            verildiğinden aynı mantık indirme süresi için de geçerlidir: 100 Mbps bağlantı saniyede en fazla 12,5 MB indirir.
          </p>

          <h2>Sık yapılan hatalar</h2>
          <ul>
            <li>
              <strong>Mb ile MB&apos;ı karıştırmak:</strong> Küçük b bit, büyük B bayttır; aradaki fark 8 kattır.
            </li>
            <li>
              <strong>Değişken bit hızını (VBR) sabit sanmak:</strong> Hareketli sahnelerde bit hızı yükselir; hedef boyut için
              ortalama bit hızı ayarlanmalı, en yüksek değer sınırlanmalıdır.
            </li>
            <li>
              <strong>Sesi unutmak:</strong> Stereo AAC ses tipik olarak 128-320 kbps&apos;dir; uzun videolarda toplam boyuta
              yüzlerce megabayt ekleyebilir.
            </li>
            <li>
              <strong>MB ile MiB farkı:</strong> İşletim sistemleri bazen 1 MB = 1.048.576 bayt (MiB) gösterir; bu yüzden
              dosya, hesaplanandan yaklaşık yüzde 5 küçük görünebilir.
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

          <h2>İlgili araçlar</h2>
          <p>
            Diğer video editör araçları için{" "}
            <Link href="/video-editor-araclari">Video Editör Araçları</Link>
            {" "}sayfasına, megabit ve megabayt birimlerini doğrudan
            çevirmek için{" "}
            <Link href="/megabit-megabayt">Megabit - Megabayt Çevirici</Link>
            {" "}sayfasına bakabilirsin.
          </p>
        </section>
      </div>
    </main>
  );
}
