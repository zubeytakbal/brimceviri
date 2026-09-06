import type { Metadata } from "next";
import Link from "next/link";
import AmortismanCalculator from "../components/AmortismanCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Normal ve azalan bakiyeler amortisman yöntemi arasındaki fark nedir?",
    answer:
      "Normal (eşit tutarlı) yöntemde her yıl aynı tutarda amortisman ayrılır. Azalan bakiyeler yönteminde ise her yıl, kalan (yıl başı) değer üzerinden sabit bir oranla amortisman hesaplanır; bu yüzden ilk yıllarda daha yüksek, sonraki yıllarda azalan tutarlar çıkar.",
  },
  {
    question: "Faydalı ömür yılını nereden bulabilirim?",
    answer:
      "Faydalı ömür yılları, Maliye Bakanlığı'nın Vergi Usul Kanunu (VUK) kapsamında yayımladığı, sabit kıymet sınıflarına göre belirlenmiş amortisman oranları listesinden bulunur. Bu araç, senin girdiğin yıl değeriyle hesaplama yapar; liste zamanla güncellenebildiği için güncel değeri kendi kaynağından teyit etmen gerekir.",
  },
];

export const metadata: Metadata = {
  title: "Amortisman Hesaplama (Normal ve Azalan Bakiyeler)",
  description:
    "Maliyet, faydalı ömür ve hurda değerinden normal veya azalan bakiyeler usulüyle yıllara göre amortisman tablosu hesapla.",
  alternates: { canonical: "/amortisman-hesaplama" },
  openGraph: {
    title: "Amortisman Hesaplama (Normal ve Azalan Bakiyeler)",
    description: "Yıllara göre amortisman tablosu hesaplayın.",
    url: buildSiteUrl("/amortisman-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function AmortismanPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Amortisman Hesaplama", item: buildSiteUrl("/amortisman-hesaplama") },
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
          <span>Amortisman Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Amortisman Hesaplama</h1>
          <p>
            Maliyet, faydalı ömür ve hurda değerini gir: normal veya
            azalan bakiyeler usulüyle yıllara göre amortisman
            tablosunu anında hesapla.
          </p>
        </header>

        <AmortismanCalculator />

        <section className="category-article-content">
          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>
              Normal ve azalan bakiyeler amortisman yöntemi arasındaki
              fark nedir?
            </strong>
            <br />
            Normal (eşit tutarlı) yöntemde her yıl aynı tutarda
            amortisman ayrılır. Azalan bakiyeler yönteminde ise her
            yıl, kalan (yıl başı) değer üzerinden sabit bir oranla
            amortisman hesaplanır; bu yüzden ilk yıllarda daha
            yüksek, sonraki yıllarda azalan tutarlar çıkar.
          </p>
          <p>
            <strong>Faydalı ömür yılını nereden bulabilirim?</strong>
            <br />
            Faydalı ömür yılları, Maliye Bakanlığı&apos;nın Vergi
            Usul Kanunu (VUK) kapsamında yayımladığı, sabit kıymet
            sınıflarına göre belirlenmiş amortisman oranları
            listesinden bulunur. Bu araç senin girdiğin yıl
            değeriyle hesaplama yapar.
          </p>

          <h2>İlgili araçlar</h2>
          <p>
            KDV hesaplama için{" "}
            <Link href="/kdv-hesaplama">KDV Hesaplama</Link>, diğer
            muhasebeci araçları için{" "}
            <Link href="/muhasebeci-araclari">Muhasebeci Araçları</Link>{" "}
            sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Normal ve azalan bakiyeler amortisman yöntemleri, Vergi
            Usul Kanunu (VUK) 315. madde ve mükerrer 315. maddede
            tanımlıdır. Bu araç genel bilgilendirme amaçlıdır, resmi
            beyanlarda güncel mevzuata ve mali müşavirine
            danışmalısın.
          </p>
        </section>
      </div>
    </main>
  );
}
