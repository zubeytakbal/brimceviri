import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Amortisman hesaplama araçları neden faydalı ömür/oran listesi içermiyor?",
    answer:
      "Faydalı ömür ve amortisman oranları, Maliye Bakanlığı'nın binlerce sabit kıymet kalemi için ayrı ayrı belirlediği ve zaman zaman güncellediği bir listeye bağlıdır. Bu listeyi hatasız ve güncel tutmak tek bir genel araçla güvenle sağlanamaz; bu yüzden faydalı ömrü kendi kaynağından bulup girmen istenir.",
  },
  {
    question: "Bu sayfadaki araçlar resmi beyan için kullanılabilir mi?",
    answer:
      "Hayır. Buradaki araçlar genel bilgilendirme ve ön hesaplama amaçlıdır. Resmi vergi beyanları ve mali tablolar için her zaman güncel mevzuata ve bir mali müşavire danışılmalıdır.",
  },
];

export const metadata: Metadata = {
  title: "Muhasebeci Araçları: Amortisman, KDV Hesaplama",
  description:
    "Muhasebeci ve mali müşavirler için tek sayfada toplanmış araçlar: amortisman hesaplama (normal ve azalan bakiyeler), KDV hesaplama ve ilgili dönüşümler.",
  alternates: { canonical: "/muhasebeci-araclari" },
  openGraph: {
    title: "Muhasebeci Araçları: Amortisman, KDV Hesaplama",
    description: "Amortisman ve KDV hesaplama tek sayfada.",
    url: buildSiteUrl("/muhasebeci-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function MuhasebeciAraclariPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Muhasebeci Araçları", item: buildSiteUrl("/muhasebeci-araclari") },
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
          <Link href="/meslekler">Mesleğe Göre Araçlar</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Muhasebeci Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Muhasebeci Araçları</h1>
          <p>
            Muhasebeci ve mali müşavirlerin günlük olarak ihtiyaç
            duyduğu hesaplama araçlarını tek sayfada topladık:
            amortisman hesaplama, KDV hesaplama ve ilgili
            dönüşümler.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>Normal amortisman</strong> = (Maliyet − Hurda
              Değeri) / Faydalı Ömür
            </li>
            <li>
              <strong>Azalan bakiyeler oranı</strong> = normal oranın
              2 katı (üst sınır %50)
            </li>
            <li>
              <strong>KDV dahil tutar</strong> = matrah × (1 + KDV oranı)
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/amortisman-hesaplama">Amortisman Hesaplama</Link>
              {" "}— maliyet, faydalı ömür ve hurda değerinden yıllara
              göre amortisman tablosu hesapla.
            </li>
            <li>
              <Link href="/kdv-hesaplama">KDV Hesaplama</Link>
              {" "}— KDV dahil ve KDV hariç tutarları hesapla.
            </li>
          </ul>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>
              Amortisman hesaplama araçları neden faydalı ömür/oran
              listesi içermiyor?
            </strong>
            <br />
            Faydalı ömür ve amortisman oranları, Maliye
            Bakanlığı&apos;nın binlerce sabit kıymet kalemi için ayrı
            ayrı belirlediği ve zaman zaman güncellediği bir listeye
            bağlıdır. Bu yüzden faydalı ömrü kendi kaynağından bulup
            girmen istenir.
          </p>
          <p>
            <strong>
              Bu sayfadaki araçlar resmi beyan için kullanılabilir mi?
            </strong>
            <br />
            Hayır. Buradaki araçlar genel bilgilendirme ve ön
            hesaplama amaçlıdır. Resmi vergi beyanları ve mali
            tablolar için her zaman güncel mevzuata ve bir mali
            müşavire danışılmalıdır.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Amortisman yöntemleri Vergi Usul Kanunu&apos;na (VUK 315
            ve mükerrer 315. madde), KDV hesabı ise 3065 sayılı
            Katma Değer Vergisi Kanunu&apos;na dayanmaktadır. Bu
            sayfa ve bağlı araçlar genel bilgilendirme amaçlıdır.
          </p>
        </section>
      </div>
    </main>
  );
}
