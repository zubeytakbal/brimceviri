import type { Metadata } from "next";
import Link from "next/link";
import PeriodicTable from "../../../components/PeriodicTable";
import { buildSiteUrl } from "../../../siteConfig";

export const metadata: Metadata = {
  title: "Periyodik Tablo: 118 Elementin Tamamı, Ayrıntılı Bilgilerle",
  description:
    "İnteraktif periyodik tablo — bir elementin üzerine gelerek hızlı bilgi al, tıklayarak atom numarası, kütlesi, kullanım alanları ve daha fazlasını içeren ayrıntılı sayfaya git.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/kimya/periyodik-tablo",
  },
  openGraph: {
    title: "Periyodik Tablo: 118 Elementin Tamamı, Ayrıntılı Bilgilerle",
    description:
      "İnteraktif periyodik tablo — bir elementin üzerine gelerek hızlı bilgi al, tıklayarak ayrıntılı sayfaya git.",
    url: buildSiteUrl("/bilim-hesaplayicilari/kimya/periyodik-tablo"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

export default function PeriyodikTabloPage() {
  return (
    <main className="all-conversions-page">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/bilim-hesaplayicilari">Bilim Hesaplayıcıları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/bilim-hesaplayicilari/kimya">Kimya</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Periyodik Tablo</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Periyodik Tablo</h1>
          <p>
            118 elementin tamamı — atom numarası, atom kütlesi ve
            kategorisiyle birlikte. Bir elemente tıklayarak ayrıntılı bilgi
            sayfasını aç.
          </p>
        </header>

        <PeriodicTable />

        <section className="category-article-content">
          <h2>Periyodik tablo nedir?</h2>
          <p>
            Periyodik tablo, kimyasal elementleri artan atom numarasına ve
            benzer kimyasal özelliklere göre düzenleyen bir sınıflandırma
            sistemidir. Aynı sütundaki (grup) elementler benzer dış
            elektron dizilimine, dolayısıyla benzer kimyasal davranışa
            sahiptir; aynı satırdaki (periyot) elementlerin ise elektron
            kabuğu sayısı birbirine eşittir.
          </p>

          <h2>Renklerin anlamı ne?</h2>
          <p>
            Tablodaki her renk, elementlerin genel kimyasal ve fiziksel
            davranışına göre gruplandığı bir kategoriyi gösterir: alkali
            metaller, toprak alkali metaller, geçiş metalleri, yarı
            metaller (metaloidler), ametaller, halojenler, soy gazlar ve
            lantanit/aktinit serileri. Tam liste tablonun altındaki
            açıklama kısmında yer alıyor.
          </p>

          <h2>Element sayfalarında ne var?</h2>
          <p>
            Her elementin kendi sayfasında atom numarası, atom kütlesi,
            periyot/grup bilgisi ve kategorisi bulunur; öncelikli
            elementlerde (müfredatta sık geçenler) ayrıca tarihçe,
            kullanım alanları ve ek bilgiler de yer alır. Liste zamanla
            genişleyecek.
          </p>
        </section>
      </div>
    </main>
  );
}
