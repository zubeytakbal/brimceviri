import type { Metadata } from "next";
import Link from "next/link";
import BsaCalculator from "../components/BsaCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Vücut yüzey alanı (BSA) neden hesaplanır?",
    answer:
      "BSA, ilaç dozlamasında kilogram başına doza (mg/kg) alternatif olarak yüzey alanına göre dozlama (mg/m²) yaklaşımını mümkün kılar; ayrıca kalp ve böbrek gibi organ fonksiyonlarını 'kişi boyutuna göre' normalize etmek için kullanılır. Bu araç yalnızca BSA değerini hesaplar, doz önermez.",
  },
  {
    question: "Mosteller formülü diğer formüllerden farklı mı?",
    answer:
      "Evet, birden fazla BSA formülü vardır (Du Bois, Haycock gibi); sonuçlar birbirine çok yakın ama özdeş değildir. Mosteller formülü basitliği nedeniyle günlük klinik pratikte en yaygın tercih edilen yöntemdir.",
  },
];

export const metadata: Metadata = {
  title: "Vücut Yüzey Alanı Hesaplama (BSA - Mosteller Formülü)",
  description:
    "Boy ve kilodan, Mosteller formülüyle vücut yüzey alanını (BSA, m²) hesapla.",
  alternates: { canonical: "/vucut-yuzey-alani-hesaplama" },
  openGraph: {
    title: "Vücut Yüzey Alanı Hesaplama (BSA - Mosteller Formülü)",
    description: "Boy ve kilodan vücut yüzey alanını hesaplayın.",
    url: buildSiteUrl("/vucut-yuzey-alani-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function BsaCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Vücut Yüzey Alanı Hesaplama", item: buildSiteUrl("/vucut-yuzey-alani-hesaplama") },
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
          <span>Vücut Yüzey Alanı Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Vücut Yüzey Alanı Hesaplama (BSA)</h1>
          <p>
            Boy ve kiloyu gir: Mosteller formülüyle vücut yüzey alanını
            (m²) anında hesapla.
          </p>
        </header>

        <BsaCalculator />

        <section className="category-article-content">
          <h2>BSA (Mosteller) formülü nedir?</h2>
          <p>
            <strong>BSA (m²) = √(Boy(cm) × Kilo(kg) / 3600)</strong>. Bu
            formül, 1987&apos;de Dr. Richard Mosteller tarafından
            yayımlanmış, basitliği ve doğruluğu nedeniyle klinik
            pratikte en yaygın kullanılan BSA tahmin yöntemidir.
            Erişkin normal BSA aralığı yaklaşık 1,6-2,0 m²&apos;dir.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>Vücut yüzey alanı (BSA) neden hesaplanır?</strong>
            <br />
            BSA, ilaç dozlamasında kilogram başına doza (mg/kg)
            alternatif olarak yüzey alanına göre dozlama (mg/m²)
            yaklaşımını mümkün kılar; ayrıca kalp ve böbrek gibi organ
            fonksiyonlarını &quot;kişi boyutuna göre&quot; normalize
            etmek için kullanılır. Bu araç yalnızca BSA değerini
            hesaplar, doz önermez.
          </p>
          <p>
            <strong>Mosteller formülü diğer formüllerden farklı mı?</strong>
            <br />
            Evet, birden fazla BSA formülü vardır (Du Bois, Haycock
            gibi); sonuçlar birbirine çok yakın ama özdeş değildir.
            Mosteller formülü basitliği nedeniyle günlük klinik
            pratikte en yaygın tercih edilen yöntemdir.
          </p>

          <h2>İlgili araçlar</h2>
          <p>
            Diğer doktor ve hemşire araçları için{" "}
            <Link href="/doktor-hemsire-araclari">Doktor ve Hemşire Araçları</Link>{" "}
            sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Formül, Mosteller RD (1987), &quot;Simplified calculation
            of body-surface area&quot;, New England Journal of
            Medicine yayınına dayanmaktadır. Bu araç tıbbi tavsiye
            yerine geçmez; klinik kararlar için bir hekime
            danışılmalıdır.
          </p>
        </section>
      </div>
    </main>
  );
}
