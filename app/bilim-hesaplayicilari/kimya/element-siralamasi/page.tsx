import type { Metadata } from "next";
import Link from "next/link";
import ElementRankingTable from "../../../components/ElementRankingTable";
import { buildSiteUrl } from "../../../siteConfig";

export const metadata: Metadata = {
  title: "En Ağır ve En Hafif Elementler: Sıralanabilir Element Tablosu",
  description:
    "118 elementi atom kütlesine, atom numarasına veya isme göre sırala — en ağır element, en hafif element ve aradaki tüm elementleri tek tabloda gör.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/kimya/element-siralamasi",
  },
  openGraph: {
    title: "En Ağır ve En Hafif Elementler: Sıralanabilir Element Tablosu",
    description:
      "118 elementi atom kütlesine, atom numarasına veya isme göre sırala.",
    url: buildSiteUrl("/bilim-hesaplayicilari/kimya/element-siralamasi"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

export default function ElementSiralamasiPage() {
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
          <span>Element Sıralaması</span>
        </nav>

        <header className="all-conversions-header">
          <h1>En Ağır ve En Hafif Elementler</h1>
          <p>
            118 elementin tamamını atom kütlesine, atom numarasına veya
            isme göre sırala. Sütun başlığına tıklayarak sıralama yönünü
            değiştirebilirsin.
          </p>
        </header>

        <ElementRankingTable />

        <section className="category-article-content">
          <h2>En ağır ve en hafif element hangisi?</h2>
          <p>
            Doğada bulunan elementler arasında en hafif element{" "}
            <strong>hidrojen</strong>&apos;dir (atom kütlesi 1,008 u). En
            ağır doğal element ise <strong>uranyum</strong>&apos;dur (atom
            kütlesi 238,029 u). Laboratuvarda yapay olarak sentezlenen,
            çok kısa ömürlü süper ağır elementler arasında ise en ağırı{" "}
            <strong>oganesson</strong>&apos;dur (atom kütlesi 294 u).
          </p>

          <h2>Atom kütlesi ne anlama gelir?</h2>
          <p>
            Atom kütlesi, bir elementin ortalama atom ağırlığını, atomik
            kütle birimi (u) cinsinden ifade eder. Bu değer, o elementin
            doğada bulunan izotoplarının ağırlıklı ortalamasıdır ve
            periyodik tabloda genellikle her elementin altında küçük bir
            sayı olarak yazılır.
          </p>

          <h2>Sıralama neden faydalı?</h2>
          <p>
            Periyodik tablonun kendisi elementleri atom numarasına ve
            kimyasal benzerliğe göre düzenler, ama bazen sadece "hangi
            element daha ağır/hafif" sorusuna hızlı cevap gerekir. Bu
            tablo, aynı 118 elementi farklı bir açıdan -- doğrudan sayısal
            sıralamayla -- göstererek bu tür soruları anında yanıtlar.
          </p>
        </section>
      </div>
    </main>
  );
}
