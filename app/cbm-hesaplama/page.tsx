import type { Metadata } from "next";
import Link from "next/link";
import CbmCalculator from "../components/CbmCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "CBM nedir, nasıl hesaplanır?",
    answer:
      "CBM (Cubic Meter), bir kolinin veya paletin metreküp cinsinden hacmidir. Formül: CBM = Uzunluk(m) × Genişlik(m) × Yükseklik(m). Nakliye ve lojistikte fiyatlandırma ve konteyner/kamyon doluluk planlaması için kullanılır.",
  },
  {
    question: "Hacimsel ağırlık nedir, gerçek ağırlıktan farkı ne?",
    answer:
      "Hacimsel (volümetrik) ağırlık, kolinin kapladığı hacmin taşıma moduna göre bir katsayıyla çarpılmasıyla bulunan 'sanal' ağırlıktır. Nakliye ücreti, gerçek ağırlık ile hacimsel ağırlığın büyük olanı (ücrete esas ağırlık) üzerinden hesaplanır — hafif ama hacimli kargolarda hacimsel ağırlık devreye girer.",
  },
  {
    question: "Hacimsel ağırlık katsayısı taşıma moduna göre neden değişiyor?",
    answer:
      "Her taşıma modunda (deniz, kara, hava) araçların kapasite/hacim oranı farklı olduğu için sektörde farklı standart katsayılar kullanılır: deniz yolunda 1 m³ = 1000 kg, kara yolunda 1 m³ ≈ 333 kg, hava yolunda 1 m³ ≈ 167 kg. Taşıyıcı firmaya göre küçük farklılıklar olabilir.",
  },
];

export const metadata: Metadata = {
  title: "CBM ve Hacimsel Ağırlık Hesaplama",
  description:
    "Koli/palet ölçülerinden toplam CBM (m³), hacimsel ağırlık ve ücrete esas ağırlığı hesapla. Deniz, kara ve hava yolu katsayıları dahil.",
  alternates: { canonical: "/cbm-hesaplama" },
  openGraph: {
    title: "CBM ve Hacimsel Ağırlık Hesaplama",
    description: "Toplam CBM, hacimsel ağırlık ve ücrete esas ağırlığı hesaplayın.",
    url: buildSiteUrl("/cbm-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const divisorTable = [
  ["Deniz Yolu", "1000", "1 m³ = 1000 kg"],
  ["Kara Yolu", "3000", "1 m³ ≈ 333 kg"],
  ["Hava Yolu", "6000 (bazı taşıyıcılarda 5000)", "1 m³ ≈ 167 kg (bazı taşıyıcılarda 200 kg)"],
];

export default function CbmPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "CBM ve Hacimsel Ağırlık Hesaplama", item: buildSiteUrl("/cbm-hesaplama") },
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
          <span>CBM ve Hacimsel Ağırlık Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>CBM ve Hacimsel Ağırlık Hesaplama</h1>
          <p>
            Koli veya palet ölçülerini gir: toplam CBM (m³), hacimsel
            ağırlık ve nakliye ücretine esas ağırlığı anında hesapla.
          </p>
        </header>

        <CbmCalculator />

        <section className="category-article-content">
          <h2>Taşıma Moduna Göre Hacimsel Ağırlık Katsayıları</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Yaygın kullanılan standart katsayılar (taşıyıcıya göre değişebilir)</caption>
              <thead>
                <tr>
                  <th scope="col">Taşıma Modu</th>
                  <th scope="col">Katsayı (cm³ / katsayı = kg)</th>
                  <th scope="col">m³ Karşılığı</th>
                </tr>
              </thead>
              <tbody>
                {divisorTable.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, index) => (
                      <td key={`${row[0]}-${index}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>CBM nedir, nasıl hesaplanır?</strong>
            <br />
            CBM (Cubic Meter), bir kolinin veya paletin metreküp
            cinsinden hacmidir. Formül: CBM = Uzunluk(m) ×
            Genişlik(m) × Yükseklik(m). Nakliye ve lojistikte
            fiyatlandırma ve konteyner/kamyon doluluk planlaması
            için kullanılır.
          </p>
          <p>
            <strong>Hacimsel ağırlık nedir, gerçek ağırlıktan farkı ne?</strong>
            <br />
            Hacimsel (volümetrik) ağırlık, kolinin kapladığı hacmin
            taşıma moduna göre bir katsayıyla çarpılmasıyla bulunan
            &quot;sanal&quot; ağırlıktır. Nakliye ücreti, gerçek
            ağırlık ile hacimsel ağırlığın büyük olanı (ücrete esas
            ağırlık) üzerinden hesaplanır — hafif ama hacimli
            kargolarda hacimsel ağırlık devreye girer.
          </p>
          <p>
            <strong>
              Hacimsel ağırlık katsayısı taşıma moduna göre neden
              değişiyor?
            </strong>
            <br />
            Her taşıma modunda araçların kapasite/hacim oranı farklı
            olduğu için sektörde farklı standart katsayılar
            kullanılır. Taşıyıcı firmaya göre küçük farklılıklar
            olabilir; kesin hesap için &quot;Özel katsayı&quot;
            seçeneğini kullanabilirsin.
          </p>

          <h2>İlgili araçlar</h2>
          <p>
            Diğer nakliyeci ve lojistik araçları için{" "}
            <Link href="/nakliyeci-araclari">Nakliyeci Araçları</Link>{" "}
            sayfasına, hacim birimleri arasında genel dönüşüm için{" "}
            <Link href="/kategoriler/hacim">Hacim Dönüşümleri</Link>{" "}
            sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Katsayılar, uluslararası nakliye ve lojistik sektöründe
            yaygın kullanılan standart değerlere dayanmaktadır. Kesin
            navlun hesabı için taşıyıcı firmanın kendi tarifesine
            danışılmalıdır.
          </p>
        </section>
      </div>
    </main>
  );
}
