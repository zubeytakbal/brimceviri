import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import PoolVolumeCalculator from "../components/PoolVolumeCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Havuz hacmi nasıl hesaplanır?",
    answer:
      "Dikdörtgen havuzlarda Hacim (m³) = Uzunluk × Genişlik × Ortalama Derinlik formülü kullanılır. Yuvarlak havuzlarda ise Hacim (m³) = π × (Çap/2)² × Ortalama Derinlik formülü kullanılır.",
  },
  {
    question: "Ortalama derinlik nasıl bulunur?",
    answer:
      "Sığ ve derin uçları farklı olan havuzlarda ortalama derinlik, (sığ uç derinliği + derin uç derinliği) / 2 formülüyle yaklaşık olarak hesaplanabilir.",
  },
];

export const metadata: Metadata = {
  title: "Havuz Hacmi Hesaplama (m³)",
  description:
    "Dikdörtgen veya yuvarlak havuzların ölçülerinden metreküp (m³) cinsinden su hacmini hesapla.",
  alternates: {
    canonical: "/havuz-hacmi-hesaplama",
  },
  openGraph: {
    title: "Havuz Hacmi Hesaplama (m³)",
    description: "Havuz ölçülerinden su hacmini hesapla.",
    url: buildSiteUrl("/havuz-hacmi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

// Yaygin havuz olculeri: hacim tabloda hesaplanir (1 m³ = 1000 L).
const ORNEK_HAVUZLAR: Array<{ ad: string; tip: "dikdortgen" | "yuvarlak"; u: number; g?: number; d: number }> = [
  { ad: "Şişme/çocuk havuzu (Ø 2,4 m)", tip: "yuvarlak", u: 2.4, d: 0.6 },
  { ad: "Yer üstü yuvarlak havuz (Ø 3,6 m)", tip: "yuvarlak", u: 3.6, d: 0.9 },
  { ad: "Yer üstü yuvarlak havuz (Ø 4,6 m)", tip: "yuvarlak", u: 4.6, d: 1.2 },
  { ad: "Küçük bahçe havuzu", tip: "dikdortgen", u: 6, g: 3, d: 1.4 },
  { ad: "Villa havuzu", tip: "dikdortgen", u: 8, g: 4, d: 1.5 },
  { ad: "Büyük villa havuzu", tip: "dikdortgen", u: 10, g: 5, d: 1.6 },
  { ad: "Yarı olimpik havuz", tip: "dikdortgen", u: 25, g: 12.5, d: 2 },
];

const hacim = (h: (typeof ORNEK_HAVUZLAR)[number]) => (h.tip === "yuvarlak" ? Math.PI * (h.u / 2) ** 2 * h.d : h.u * (h.g ?? 0) * h.d);
const sayi = (n: number, basamak = 1) => n.toLocaleString("tr-TR", { maximumFractionDigits: basamak });

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function PoolVolumeCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Havuz Teknisyeni Araçları", item: buildSiteUrl("/havuz-teknisyeni-araclari") },
      { "@type": "ListItem", position: 4, name: "Havuz Hacmi Hesaplama", item: buildSiteUrl("/havuz-hacmi-hesaplama") },
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
          <Link href="/havuz-teknisyeni-araclari">Havuz Teknisyeni Araçları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Havuz Hacmi Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Havuz Hacmi Hesaplama</h1>
          <p>
            Dikdörtgen veya yuvarlak havuzunun ölçülerini gir: su
            hacmini metreküp (m³) cinsinden hesapla.
          </p>
        </header>

        <PoolVolumeCalculator />

        <section className="category-article-content">
          <h2>Örnek hesap: 8 × 4 m villa havuzu</h2>
          <p>
            Havuzun sığ ucu 1,2 m, derin ucu 1,8 m olsun. Önce ortalama derinlik bulunur: (1,2 + 1,8) / 2 = 1,5 m.
            Hacim = 8 × 4 × 1,5 = <strong>48 m³</strong>. Bir metreküp 1000 litre olduğu için havuz yaklaşık
            48.000 litre su alır. Dakikada 20 litre veren bir bahçe hortumuyla bu, 48.000 / 20 = 2400 dakika,
            yani yaklaşık <strong>40 saat</strong> doldurma süresi demektir.
          </p>

          <h2>Yuvarlak havuzda hesap</h2>
          <p>
            Yuvarlak havuzlarda taban alanı π × r² ile bulunur; r çapın yarısıdır. 4,6 m çaplı, 1,2 m su derinliğine
            sahip yer üstü havuzda r = 2,3 m, taban alanı 3,1416 × 2,3² ≈ 16,6 m² ve hacim 16,6 × 1,2 ≈{" "}
            <strong>19,9 m³</strong> (yaklaşık 19.900 litre) olur. Oval havuzlar için π × (uzun çap / 2) × (kısa çap / 2)
            × derinlik formülü kullanılır.
          </p>

          <h2>Yaygın havuz ölçüleri ve hacimleri</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Havuz</th>
                  <th>Ölçü</th>
                  <th>Hacim (m³)</th>
                  <th>Litre</th>
                </tr>
              </thead>
              <tbody>
                {ORNEK_HAVUZLAR.map((h) => (
                  <tr key={h.ad}>
                    <td>{h.ad}</td>
                    <td>{h.tip === "yuvarlak" ? `Ø ${sayi(h.u)} m × ${sayi(h.d)} m` : `${sayi(h.u)} × ${sayi(h.g ?? 0)} × ${sayi(h.d)} m`}</td>
                    <td>{sayi(hacim(h))}</td>
                    <td>{sayi(Math.round(hacim(h) * 1000), 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Hacmi neden bilmek gerekir?</h2>
          <p>
            Klor, pH düzenleyici ve şok kimyasallarının dozu doğrudan su hacmine göre verilir; hacim yanlışsa doz da
            yanlış olur. Pompa ve kum filtresi seçimi de hacme göre yapılır: pompanın saatlik debisi, havuzdaki suyun
            tamamının makul sürede filtreden geçmesini sağlamalıdır. Su faturası ve ilk dolum maliyeti de hacimle
            doğru orantılıdır.
          </p>

          <h2>Sık yapılan hatalar</h2>
          <ul>
            <li>
              <strong>Kenar yüksekliğini derinlik sanmak:</strong> Su seviyesi genellikle havuz kenarının birkaç santim
              altındadır. Hesaba havuz duvarının yüksekliğini değil, suyun derinliğini yazın.
            </li>
            <li>
              <strong>Eğimli tabanı tek derinlikle hesaplamak:</strong> Sığ ve derin uç farklıysa ortalamayı kullanın;
              yalnızca derin ucu yazmak hacmi belirgin biçimde büyük gösterir.
            </li>
            <li>
              <strong>Santimetre ile metreyi karıştırmak:</strong> 120 cm = 1,2 m&apos;dir. Tüm ölçüleri aynı birime
              çevirmeden çarpmayın.
            </li>
            <li>
              <strong>Çap yerine yarıçapı kare almamak:</strong> Yuvarlak havuzda çapın kendisini değil, yarısını kareye
              alın; aksi halde hacim 4 kat büyük çıkar.
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
            Diğer havuz teknisyeni araçları için{" "}
            <Link href="/havuz-teknisyeni-araclari">Havuz Teknisyeni Araçları</Link>
            {" "}sayfasına, klor dozajı hesaplama için{" "}
            <Link href="/klor-dozaji-hesaplama">Klor Dozajı Hesaplama</Link>
            {" "}sayfasına bakabilirsin.
          </p>
        </section>
      </div>
    </main>
  );
}
