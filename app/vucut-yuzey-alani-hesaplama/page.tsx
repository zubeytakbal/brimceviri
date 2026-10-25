import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
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

const BSA_ORNEKLERI: Array<[number, number]> = [
  [110, 18],
  [160, 55],
  [170, 70],
  [185, 95],
];

const bsa = (m2: number) => m2.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

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

          <h2>Mosteller, Du Bois ve Haycock karşılaştırması</h2>
          <p>
            Du Bois formülü 1916&apos;da, Haycock formülü 1978&apos;de çocuklar için yayımlandı. Aynı boy ve kilo için üç formülün sonucu
            birbirine çok yakındır:
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Boy / kilo</th>
                  <th>Mosteller</th>
                  <th>Du Bois</th>
                  <th>Haycock</th>
                </tr>
              </thead>
              <tbody>
                {BSA_ORNEKLERI.map(([boy, kilo]) => (
                  <tr key={`${boy}-${kilo}`}>
                    <td>{boy} cm / {kilo} kg</td>
                    <td>{bsa(Math.sqrt((boy * kilo) / 3600))} m²</td>
                    <td>{bsa(0.007184 * kilo ** 0.425 * boy ** 0.725)} m²</td>
                    <td>{bsa(0.024265 * kilo ** 0.5378 * boy ** 0.3964)} m²</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Örneğin 170 cm ve 70 kg için Mosteller sonucu √(170 × 70 / 3600) ≈ {bsa(Math.sqrt((170 * 70) / 3600))} m²&apos;dir. Çok
            yüksek ya da çok düşük vücut kitle indeksinde formüller arasındaki fark büyüyebilir; kemoterapi gibi dar aralıklı
            ilaçlarda hangi formülün ve hangi kilonun kullanılacağı kurum protokolüyle belirlenir.
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
            Böbrek fonksiyonu değerlendirmesi için{" "}
            <Link href="/kreatinin-klirensi-hesaplama">Kreatinin Klirensi Hesaplama</Link>,{" "}
            vücut kitle indeksi için{" "}
            <Link href="/bmi-hesaplama">BMI Hesaplama</Link>
            {" "}sayfasına, diğer doktor ve hemşire araçları için{" "}
            <Link href="/hesaplayicilar#klinik">Klinik Skorlar</Link>{" "}
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
