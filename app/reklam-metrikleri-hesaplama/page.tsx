import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import AdMetricsCalculator from "../components/AdMetricsCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "CPM, CTR ve CPC nasıl hesaplanır?",
    answer:
      "CPM (Bin Gösterim Başına Maliyet) = (Maliyet / Gösterim Sayısı) × 1000. CTR (Tıklama Oranı) = (Tıklama Sayısı / Gösterim Sayısı) × 100. CPC (Tıklama Başına Maliyet) = Maliyet / Tıklama Sayısı.",
  },
  {
    question: "ROI nasıl hesaplanır?",
    answer:
      "ROI (Yatırım Getirisi) = ((Elde Edilen Gelir - Maliyet) / Maliyet) × 100. Pozitif bir ROI, reklam harcamasının kârlı olduğunu gösterir.",
  },
];

// Ornek kampanya: tum metrikler ayni girdilerden hesaplanir.
const KAMPANYA = { maliyet: 5000, gosterim: 250000, tiklama: 3000, donusum: 90, gelir: 13500 };
const tl = (n: number, basamak = 2) => n.toLocaleString("tr-TR", { maximumFractionDigits: basamak });

export const metadata: Metadata = {
  title: "Reklam Metrikleri Hesaplama: CPM, CTR, CPC, ROI",
  description:
    "Maliyet, gösterim ve tıklama sayısından CPM, CTR ve CPC hesapla; maliyet ve gelirden reklam yatırım getirisini (ROI) hesapla.",
  alternates: {
    canonical: "/reklam-metrikleri-hesaplama",
    languages: {
      "uz-UZ": "/uz/reklama-korsatkichlari-hisoblash",
    },
  },
  openGraph: {
    title: "Reklam Metrikleri Hesaplama: CPM, CTR, CPC, ROI",
    description: "CPM, CTR, CPC ve ROI hesaplama tek sayfada.",
    url: buildSiteUrl("/reklam-metrikleri-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function AdMetricsCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Dijital Pazarlamacı Araçları", item: buildSiteUrl("/dijital-pazarlamaci-araclari") },
      { "@type": "ListItem", position: 4, name: "Reklam Metrikleri Hesaplama", item: buildSiteUrl("/reklam-metrikleri-hesaplama") },
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
          <Link href="/dijital-pazarlamaci-araclari">Dijital Pazarlamacı Araçları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Reklam Metrikleri Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Reklam Metrikleri Hesaplama</h1>
          <p>
            Maliyet, gösterim ve tıklama sayısını gir: CPM, CTR ve CPC
            hesapla. Alttaki ikinci araçla, maliyet ve gelirden reklam
            yatırım getirisini (ROI) hesapla.
          </p>
        </header>

        <AdMetricsCalculator />

        <section className="category-article-content">
          <h2>Örnek kampanya: bütün metrikler tek tabloda</h2>
          <p>
            Bir e-ticaret sitesi bir haftada {tl(KAMPANYA.maliyet)} TL reklam harcıyor; reklamlar {tl(KAMPANYA.gosterim)} kez gösteriliyor,{" "}
            {tl(KAMPANYA.tiklama)} tıklama ve {KAMPANYA.donusum} satış getiriyor, satışlardan {tl(KAMPANYA.gelir)} TL gelir elde ediliyor.
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Metrik</th>
                  <th>Formül</th>
                  <th>Sonuç</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>CPM (bin gösterim maliyeti)</td>
                  <td>Maliyet / gösterim × 1000</td>
                  <td>{tl((KAMPANYA.maliyet / KAMPANYA.gosterim) * 1000)} TL</td>
                </tr>
                <tr>
                  <td>CTR (tıklama oranı)</td>
                  <td>Tıklama / gösterim × 100</td>
                  <td>%{tl((KAMPANYA.tiklama / KAMPANYA.gosterim) * 100)}</td>
                </tr>
                <tr>
                  <td>CPC (tıklama maliyeti)</td>
                  <td>Maliyet / tıklama</td>
                  <td>{tl(KAMPANYA.maliyet / KAMPANYA.tiklama)} TL</td>
                </tr>
                <tr>
                  <td>Dönüşüm oranı</td>
                  <td>Satış / tıklama × 100</td>
                  <td>%{tl((KAMPANYA.donusum / KAMPANYA.tiklama) * 100)}</td>
                </tr>
                <tr>
                  <td>CPA (satış başına maliyet)</td>
                  <td>Maliyet / satış</td>
                  <td>{tl(KAMPANYA.maliyet / KAMPANYA.donusum)} TL</td>
                </tr>
                <tr>
                  <td>ROAS (reklam getirisi)</td>
                  <td>Gelir / maliyet</td>
                  <td>{tl(KAMPANYA.gelir / KAMPANYA.maliyet)} kat</td>
                </tr>
                <tr>
                  <td>ROI (yatırım getirisi)</td>
                  <td>(Gelir − maliyet) / maliyet × 100</td>
                  <td>%{tl(((KAMPANYA.gelir - KAMPANYA.maliyet) / KAMPANYA.maliyet) * 100)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>ROAS ile ROI neden farklı?</h2>
          <p>
            ROAS yalnızca reklam harcamasına karşı ciroyu ölçer; 2,7 kat ROAS &quot;her 1 TL reklam 2,7 TL satış getirdi&quot; demektir.
            Ama satışın içinde ürün maliyeti, kargo ve komisyon da vardır. Ürünlerin brüt kâr marjı yüzde 30 ise 13.500 TL cironun
            yalnızca 4.050 TL&apos;si kâr payıdır; bu da 5.000 TL&apos;lik reklam harcamasını karşılamaz. Yani yüksek görünen bir ROAS ile
            zarar etmek mümkündür. Kârda kalmak için gereken en düşük ROAS = 1 / brüt kâr marjı formülüyle bulunur: yüzde 30 marj için
            1 / 0,30 ≈ 3,3.
          </p>

          <h2>Sık yapılan hatalar</h2>
          <ul>
            <li>
              <strong>CTR&apos;yi tek başına başarı saymak:</strong> Çok tıklanan ama satış getirmeyen reklam yalnızca bütçeyi hızlı tüketir;
              CTR&apos;yi dönüşüm oranıyla birlikte değerlendirin.
            </li>
            <li>
              <strong>KDV&apos;li ve KDV&apos;siz tutarları karıştırmak:</strong> Reklam maliyeti ile gelir aynı şekilde (ikisi de KDV hariç)
              girilmelidir; aksi halde ROI yüzde 20&apos;ye varan oranda hatalı çıkar.
            </li>
            <li>
              <strong>Farklı tarih aralıklarını karşılaştırmak:</strong> Satış, reklam tıklamasından günler sonra gelebilir; gelir ile
              maliyeti aynı dönem için ve platformun dönüşüm penceresini dikkate alarak eşleştirin.
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
            Diğer dijital pazarlamacı araçları için{" "}
            <Link href="/dijital-pazarlamaci-araclari">Dijital Pazarlamacı Araçları</Link>
            {" "}sayfasına bakabilirsin.
          </p>
        </section>
      </div>
    </main>
  );
}
