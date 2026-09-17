import type { Metadata } from "next";
import Link from "next/link";
import { getAllNumberFactsRange } from "../../../converter/numberFacts";
import { buildSiteUrl } from "../../../siteConfig";

export const metadata: Metadata = {
  title: "Sayı Özellikleri: Kare, Çarpanlar (Bölenler), Asal mı (1-100)",
  description:
    "1'den 100'e kadar her sayının karesini, çarpanlarını (bölenlerini), karekökünü, asal olup olmadığını ve daha fazlasını gör — istediğin sayıyı yazıp anında hesapla.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/matematik/sayilar",
  },
  openGraph: {
    title: "Sayı Özellikleri: Kare, Çarpanlar (Bölenler), Asal mı (1-100)",
    description: "Her sayının kare, karekök, asallık ve bölen bilgilerini gör.",
    url: buildSiteUrl("/bilim-hesaplayicilari/matematik/sayilar"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

export default function SayilarHubPage() {
  const numbers = getAllNumberFactsRange();

  return (
    <main className="all-conversions-page">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/bilim-hesaplayicilari">Bilim Hesaplayıcıları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/bilim-hesaplayicilari/matematik">Matematik</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Sayılar</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Sayı Özellikleri (1-100)</h1>
          <p>
            1&apos;den 100&apos;e kadar her sayının karesini, küpünü,
            karekökünü, asal olup olmadığını, bölenlerini, faktöriyelini
            ve Romen rakamı karşılığını gör. Her sayfada, istediğin
            başka bir sayıyı da anında hesaplayabileceğin canlı bir
            hesaplayıcı bulunur.
          </p>
        </header>

        <section className="category-article-content">
          <ul className="tool-list number-grid-list">
            {numbers.map((n) => (
              <li className="tool-list-item" key={n}>
                <Link
                  className="tool-list-link"
                  href={`/bilim-hesaplayicilari/matematik/sayilar/${n}`}
                >
                  <span className="tool-list-title">{n}</span>
                </Link>
              </li>
            ))}
          </ul>

          <h2>İlginizi Çekebilir</h2>
          <p>
            Ortalama, medyan, mod ve standart sapma için{" "}
            <Link href="/bilim-hesaplayicilari/matematik/ortalama-hesaplama">Ortalama Hesaplama</Link>,{" "}
            olasılık için{" "}
            <Link href="/bilim-hesaplayicilari/matematik/olasilik-hesaplama">Olasılık Hesaplama</Link>,{" "}
            aritmetik/geometrik diziler için{" "}
            <Link href="/bilim-hesaplayicilari/matematik/aritmetik-dizi-hesaplama">Aritmetik Dizi Hesaplama</Link>
            {" "}sayfasına, tüm matematik araçlarını görmek için{" "}
            <Link href="/bilim-hesaplayicilari/matematik">Matematik Hesaplayıcıları</Link>
            {" "}ana sayfasına bakabilirsin.
          </p>
        </section>
      </div>
    </main>
  );
}
