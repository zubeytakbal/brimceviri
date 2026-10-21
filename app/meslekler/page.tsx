import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
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

        <section className="category-article-content">
          <h2>Meslek sayfalarında neler var?</h2>
          <p>
            Bu sitede {professionCards.length} meslek için ayrı sayfa bulunur. Her sayfa, o meslekte gün içinde en çok yapılan
            hesapları bir araya getirir: birim çevirileri, formüllü hesaplayıcılar ve elde tutulan referans tablolar. Hesaplar
            tarayıcınızda yapılır; girdiğiniz değerler hiçbir yere gönderilmez.
          </p>

          <h2>Birkaç örnek</h2>
          <ul>
            <li>
              <strong>Kuyumcu:</strong> 22 ayar altının saflığı 22 / 24 = 0,9167, yani 916,7 milyemdir. 10 gram 22 ayar bilezikte
              10 × 0,9167 ≈ 9,17 gram has altın bulunur. Ayar, milyem ve has hesapları kuyumcu sayfasında tek ekranda yapılır.
            </li>
            <li>
              <strong>Elektrikçi:</strong> 230 V tek fazlı hatta 3 kW&apos;lık bir rezistanslı ısıtıcı yaklaşık 3000 / 230 ≈ 13 A
              çeker. Bu akıma ve hat uzunluğuna göre kablo kesiti ile gerilim düşümü elektrikçi sayfasındaki araçlarla bulunur.
            </li>
            <li>
              <strong>Havuz teknisyeni:</strong> 8 × 4 m, ortalama 1,5 m derinlikteki bir havuz 48 m³ su alır; klor ve pH
              kimyasallarının dozu bu hacme göre hesaplanır.
            </li>
          </ul>

          <h2>Kendi mesleğinizi öne çıkarın</h2>
          <p>
            Kartlardaki yıldız simgesine dokunduğunuzda seçtiğiniz meslek ana sayfada en üstte gösterilir. Bu tercih yalnızca
            sizin tarayıcınızda saklanır. Listede olmayan bir meslek ya da eksik gördüğünüz bir hesap varsa{" "}
            <Link href="/iletisim">iletişim sayfasından</Link> bize yazabilirsiniz.
          </p>
        </section>
      </div>
    </main>
  );
}
