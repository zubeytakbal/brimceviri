import type { Metadata } from "next";
import Link from "next/link";
import ProfessionCardGrid from "../components/ProfessionCardGrid";
import { professionCards } from "../converter/professionCards";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Mesleğe Göre Araçlar: Kuyumcu, Elektrikçi ve Diğerleri",
  description:
    "Kuyumculuk, elektrikçilik gibi mesleklerde günlük olarak kullanılan hesaplama araçlarının ve referans bilgilerinin mesleğe göre gruplandığı sayfa.",
  alternates: {
    canonical: "/meslekler",
  },
  openGraph: {
    title: "Mesleğe Göre Araçlar",
    description:
      "Kuyumculuk, elektrikçilik gibi mesleklerde kullanılan hesaplama araçları ve referans bilgileri, mesleğe göre gruplandı.",
    url: buildSiteUrl("/meslekler"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

export default function MesleklerPage() {
  return (
    <main className="other-categories-page">
      <div className="directory-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Mesleğe Göre Araçlar</span>
        </nav>

        <header className="other-categories-header">
          <h1>Mesleğe Göre Araçlar</h1>
          <p>
            Kuyumculuk, elektrikçilik gibi mesleklerde günlük olarak
            kullanılan hesaplama araçlarını ve referans bilgilerini
            mesleğe göre gruplandırdık. Her sayfa, o mesleğin ihtiyaç
            duyduğu dönüşümleri, hesaplayıcıları ve sabit referans
            tablolarını tek yerde toplar. Yıldız simgesine tıklayarak
            kendi mesleğini işaretleyebilir, ana sayfada senin için
            öne çıkarılmasını sağlayabilirsin.
          </p>
        </header>

        <section className="other-categories-section">
          <ProfessionCardGrid professions={professionCards} />
        </section>
      </div>
    </main>
  );
}
