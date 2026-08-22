import type { Metadata } from "next";
import Link from "next/link";
import ShoeSizeConverter from "../components/ShoeSizeConverter";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Ayakkabı Numarası Çevirme: TR, ABD, İngiltere Tablosu",
  description:
    "Ayakkabı numarasını TR/AB, ABD ve İngiltere sistemleri arasında çevirin. Nike, Adidas, Puma, New Balance ve Converse için marka bazlı numara tabloları.",
  alternates: {
    canonical: "/ayakkabi-numarasi-cevirme",
  },
  openGraph: {
    title: "Ayakkabı Numarası Çevirme: TR, ABD, İngiltere Tablosu",
    description:
      "Ayakkabı numarasını TR/AB, ABD ve İngiltere sistemleri arasında çevirin; Nike, Adidas, Puma, New Balance ve Converse marka tablolarını görün.",
    url: buildSiteUrl("/ayakkabi-numarasi-cevirme"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

export default function ShoeSizePage() {
  return (
    <main className="all-conversions-page">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">›</span>
          <span>Ayakkabı Numarası Çevirme</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Ayakkabı Numarası Çevirme</h1>

          <p>
            Bildiğin numarayı gir, TR/AB, ABD ve İngiltere karşılığını
            anında gör. Erkek, kadın, bebek ve büyük çocuk için ayrı
            tablolar; Nike, Adidas, Puma, New Balance ve Converse için
            marka bazlı numaralandırma mevcut.
          </p>
        </header>

        <ShoeSizeConverter />

        <section className="category-article-content">
          <h2>Ayakkabı numarası neden markaya göre değişir?</h2>
          <p>
            TR numarası ile AB (EU) numarası aynı sistemdir, birebir
            eşittir. Ama ABD ve İngiltere numaraları farklı bir
            ölçeğe dayanır, üstelik markalar kendi kalıplarına göre
            küçük sapmalar uygular — bu yüzden aynı ayak uzunluğu bir
            markada 42, başka bir markada 42,5 olarak etiketlenebilir.
            Buradaki tablolar markaların kendi resmi ölçü
            kılavuzlarından derlenmiştir; yine de en kesin sonuç için
            ayağını cm cinsinden ölçüp "Ayak Uzunluğu" alanından
            seçim yapmanı öneririz.
          </p>
          <p>
            Çocuk ayakkabılarında ABD numaralandırması 13,5'ten sonra
            1'den yeniden başlar (bebek/küçük çocuktan büyük çocuğa
            geçiş) — bu yüzden bebek ve büyük çocuk için ayrı iki
            tablo kullanılıyor.
          </p>
        </section>
      </div>
    </main>
  );
}
