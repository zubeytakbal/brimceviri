import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Boru çapı nasıl hesaplanır?",
    answer:
      "Boru çapı, süreklilik denklemi (Q=A×v) kullanılarak debi ve istenen akış hızından hesaplanır: D=√(4Q/(π×v)).",
  },
  {
    question: "Basınç kaybı neden önemlidir?",
    answer:
      "Uzun ve dar borularda sürtünme kaynaklı basınç kaybı, hattın sonunda yetersiz su basıncına yol açabilir. Hazen-Williams formülüyle hesaplanan basınç kaybı, doğru boru çapı ve pompa seçimi için kullanılır.",
  },
];

export const metadata: Metadata = {
  title: "Tesisatçı Araçları: Boru Çapı, Debi, Basınç Kaybı",
  description:
    "Tesisatçı ve mekanik tesisat profesyonelleri için tek sayfada toplanmış araçlar: boru çapı, debi, akış hızı ve basınç kaybı hesaplama, birim dönüşümleri.",
  alternates: { canonical: "/tesisatci-araclari" },
  openGraph: {
    title: "Tesisatçı Araçları: Boru Çapı, Debi, Basınç Kaybı",
    description: "Boru çapı, debi, akış hızı ve basınç kaybı hesaplama tek sayfada.",
    url: buildSiteUrl("/tesisatci-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const velocityTable = [
  ["İçme suyu şebekesi (ana hat)", "0,5 - 2,0 m/s"],
  ["İçme suyu şebekesi (servis bağlantısı)", "0,5 - 2,5 m/s"],
  ["Basınçlı atık su hattı", "0,7 - 3,0 m/s"],
  ["Isıtma tesisatı (sirkülasyon)", "0,3 - 1,5 m/s"],
];

export default function TesisatciAraclariPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Tesisatçı Araçları", item: buildSiteUrl("/tesisatci-araclari") },
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
          <span>Tesisatçı Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Tesisatçı Araçları</h1>
          <p>
            Tesisatçı ve mekanik tesisat profesyonellerinin günlük
            olarak ihtiyaç duyduğu hesaplama araçlarını ve referans
            bilgileri tek sayfada topladık: boru çapı, debi, akış
            hızı ve basınç kaybı hesaplama.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>Süreklilik denklemi</strong>: Q = A × v
            </li>
            <li>
              <strong>Tavsiye edilen su hızı</strong>: 0,5 - 2,5 m/s
            </li>
            <li>
              <strong>PVC boru C katsayısı</strong>: ~150 (Hazen-Williams)
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/boru-capi-hesaplama">
                Boru Çapı, Debi ve Akış Hızı Hesaplama
              </Link>{" "}
              — üç değerden ikisini gir, üçüncüsünü hesapla.
            </li>
            <li>
              <Link href="/basinc-kaybi-hesaplama">
                Basınç Kaybı Hesaplama (Hazen-Williams)
              </Link>{" "}
              — boru hattındaki sürtünme kaynaklı basınç kaybını
              hesapla.
            </li>
            <li>
              <Link href="/kategoriler/basinc">Basınç Dönüşümleri</Link>
              {" "}— bar, PSI ve diğer basınç birimleri arasında
              dönüşüm yap.
            </li>
            <li>
              <Link href="/kategoriler/hacim">Hacim Dönüşümleri</Link>
              {" "}— litre, m³ ve diğer hacim birimleri arasında
              dönüşüm yap.
            </li>
            <li>
              <Link href="/kategoriler/uzunluk">Uzunluk Dönüşümleri</Link>
              {" "}— mm, cm, inç ve diğer uzunluk birimleri arasında
              dönüşüm yap.
            </li>
            <li>
              <Link href="/isil-genlesme-hesaplama">Isıl Genleşme Hesaplama</Link>
              {" "}— boru veya hattın sıcaklık farkına göre ne kadar
              uzayıp kısalacağını hesapla.
            </li>
            <li>
              <Link href="/boru-capi-donusum-hesaplama">
                Boru Çapı Dönüşüm Hesaplama
              </Link>{" "}
              — nominal boru çapından (DN) NPS ve gerçek dış çap
              (mm/inç) karşılığını bul.
            </li>
            <li>
              <Link href="/kombi-klima-isitma-maliyeti-karsilastirma">
                Kombi mi Klima mı?
              </Link>{" "}
              — doğalgaz ve elektrik fiyatınla ısıtma maliyetini
              kıyasla.
            </li>
          </ul>

          <h2>Su Hatlarında Tavsiye Edilen Akış Hızları</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Genel referans değerler — proje şartnamesine göre değişebilir</caption>
              <thead>
                <tr>
                  <th scope="col">Hat Türü</th>
                  <th scope="col">Tavsiye Edilen Hız</th>
                </tr>
              </thead>
              <tbody>
                {velocityTable.map((row) => (
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
            <strong>Boru çapı nasıl hesaplanır?</strong>
            <br />
            Boru çapı, süreklilik denklemi (Q=A×v) kullanılarak
            debi ve istenen akış hızından hesaplanır: D=√(4Q/(π×v)).
          </p>
          <p>
            <strong>Basınç kaybı neden önemlidir?</strong>
            <br />
            Uzun ve dar borularda sürtünme kaynaklı basınç kaybı,
            hattın sonunda yetersiz su basıncına yol açabilir.{" "}
            <Link href="/basinc-kaybi-hesaplama">Basınç Kaybı Hesaplama</Link>{" "}
            aracımızla doğru boru çapı ve pompa seçimi için gerekli
            değerleri bulabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Formüller, akışkanlar mekaniği ve Hazen-Williams (1902)
            ampirik denklemine dayanır. Doğalgaz tesisatı gibi ayrı
            standartlara (TS 7363) tabi hesaplar bu sayfanın
            kapsamı dışındadır.
          </p>
        </section>
      </div>
    </main>
  );
}
