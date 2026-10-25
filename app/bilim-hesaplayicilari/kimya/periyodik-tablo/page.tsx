import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import PeriodicTable from "../../../components/PeriodicTable";
import { buildSiteUrl } from "../../../siteConfig";
import BreadcrumbSchema from "../../../components/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Periyodik Tablo: 118 Elementin Tamamı, Ayrıntılı Bilgilerle",
  description:
    "İnteraktif periyodik tablo — 118 elementin atom numarası, atom kütlesi, periyodu ve grubu; sık aranan elementler için kullanım alanlarını da içeren ayrıntılı sayfalar.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/kimya/periyodik-tablo",
    languages: { de: "/de/periodensystem" },
  },
  openGraph: {
    title: "Periyodik Tablo: 118 Elementin Tamamı, Ayrıntılı Bilgilerle",
    description:
      "İnteraktif periyodik tablo — 118 elementin atom numarası, kütlesi, periyodu ve grubu tek tabloda.",
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
        <BreadcrumbSchema items={[{ name: "Ana Sayfa", href: "/" }, { name: "Hesaplamalar", href: "/hesaplayicilar" }, { name: "Kimya", href: "/hesaplayicilar#kimya" }, { name: "Periyodik Tablo", href: "/bilim-hesaplayicilari/kimya/periyodik-tablo" }]} />
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/hesaplayicilar">Hesaplamalar</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/hesaplayicilar#kimya">Kimya</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Periyodik Tablo</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Periyodik Tablo</h1>
          <p>
            118 elementin tamamı — atom numarası, atom kütlesi ve
            kategorisiyle birlikte. Bir elemente tıklayınca bilgileri tablonun
            üstünde görünür; sık aranan elementlerde ayrıntılı sayfaya geçebilirsin.
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
            Sık aranan elementlerin (karbon, hidrojen, oksijen, azot, demir
            gibi) kendi sayfası var: atom numarası, atom kütlesi, periyot/grup
            bilgisi ve kategorisinin yanında tarihçe, kullanım alanları ve ek
            bilgiler yer alır. Diğer elementlerin temel bilgileri tablonun
            kendisinde görünür.
          </p>

          <h2>İlgili araçlar</h2>
          <p>
            Atom kütlesi hesaplama için{" "}
            <Link href="/bilim-hesaplayicilari/kimya/atom-kutlesi-hesaplama">Atom Kütlesi Hesaplama</Link>,{" "}
            bileşiklerin molar kütlesi için{" "}
            <Link href="/bilim-hesaplayicilari/kimya/bilesikler">Bileşikler</Link>
            {" "}sayfasına bakabilirsin.
          </p>
        </section>
      </div>
    </main>
  );
}
