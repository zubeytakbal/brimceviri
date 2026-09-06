import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Bu sayfadaki araçlar eczacılık veya tıbbi tavsiye yerine geçer mi?",
    answer:
      "Hayır. Buradaki araçların hepsi C₁V₁ = C₂V₂ ve türevi derişim bağıntılarıyla birim çevirimi yapar; hiçbiri hangi derişimin veya dozun uygun olduğunu belirlemez. Klinik ve majistral hazırlık kararları için her zaman bir eczacıya veya hekime danışılmalıdır.",
  },
  {
    question: "Yüzde (%) derişim ile molarite (mol/L) arasındaki fark nedir?",
    answer:
      "Molarite, çözünen maddenin mol sayısını hacme oranlar (mol/L). Yüzde derişim ise kütlece veya hacimce oranı ifade eder (örneğin %70 alkol, hacimce %70 etanol demektir). C₁V₁ = C₂V₂ bağıntısı, C₁ ve C₂ aynı derişim biriminde olduğu sürece her ikisinde de geçerlidir.",
  },
];

export const metadata: Metadata = {
  title: "Eczacı Araçları: Seyreltme, Molarite, PPM Hesaplama",
  description:
    "Eczacılar için tek sayfada toplanmış araçlar: alkol seyreltme (% derişim), mol/L seyreltme, molarite, molalite ve ppm hesaplama.",
  alternates: {
    canonical: "/eczaci-araclari",
  },
  openGraph: {
    title: "Eczacı Araçları: Seyreltme, Molarite, PPM Hesaplama",
    description: "Alkol seyreltme ve derişim hesaplamaları tek sayfada.",
    url: buildSiteUrl("/eczaci-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function EczaciAraclariPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Eczacı Araçları", item: buildSiteUrl("/eczaci-araclari") },
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
          <span>Eczacı Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Eczacı Araçları</h1>
          <p>
            Eczacıların günlük olarak ihtiyaç duyduğu derişim ve
            seyreltme hesaplarını tek sayfada topladık: alkol
            seyreltme (% derişim), mol/L cinsinden seyreltme,
            molarite, molalite ve ppm hesaplama. Hiçbiri hangi
            derişimin uygun olduğunu önermez — bu değer her zaman
            kullanıcı tarafından girilir.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>Derişim korunumu</strong>: C₁V₁ = C₂V₂
            </li>
            <li>
              <strong>Yaygın dezenfeksiyon standardı</strong>: %70 etanol
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/alkol-seyreltme-hesaplama">Alkol Seyreltme Hesaplama</Link>
              {" "}— stok ve hedef alkol derişimi/hacminden eksik
              değeri yüzde (%) derişim cinsinden hesapla.
            </li>
            <li>
              <Link href="/bilim-hesaplayicilari/kimya/seyreltme-hesaplama">Seyreltme Hesaplama (mol/L)</Link>
              {" "}— stok çözelti hazırlığı için C₁V₁ = C₂V₂ bağıntısıyla
              molarite cinsinden hesapla.
            </li>
            <li>
              <Link href="/bilim-hesaplayicilari/kimya/molarite-hesaplama">Molarite Hesaplama</Link>
              {" "}— çözünen madde miktarı ve hacimden molarite (mol/L) hesapla.
            </li>
            <li>
              <Link href="/bilim-hesaplayicilari/kimya/molalite-hesaplama">Molalite Hesaplama</Link>
              {" "}— çözünen madde miktarı ve çözücü kütlesinden molalite (mol/kg) hesapla.
            </li>
            <li>
              <Link href="/bilim-hesaplayicilari/kimya/ppm-hesaplama">ppm Hesaplama</Link>
              {" "}— çok düşük derişimleri milyonda parça (ppm) cinsinden hesapla.
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
        </section>
      </div>
    </main>
  );
}
