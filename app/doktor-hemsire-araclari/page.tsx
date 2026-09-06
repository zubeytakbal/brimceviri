import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Bu sayfadaki araçlar tıbbi tavsiye yerine geçer mi?",
    answer:
      "Hayır. Buradaki araçların hepsi genel bilgilendirme ve hesaplama amaçlıdır; hiçbiri ilaç dozu veya tedavi önermez. Tanısal skorlar (GKS, APGAR, CHA2DS2-VASc) birer referans değer üretir, klinisyen yorumlar. Klinik kararlar için her zaman bir hekime danışılmalıdır.",
  },
  {
    question: "Neden pediyatrik ilaç doz hesaplama aracı yok?",
    answer:
      "Güvenli bir pediyatrik doz hesabı, ilaca özel maksimum doz sınırı ve konsantrasyon-hacim çevrimi gerektirir; bunlar tek bir genel formülle güvenle sağlanamaz ve profesyonel eczacı gözetimi gerektirir. Bu yüzden bu araç setinde bilinçli olarak yer almıyor.",
  },
];

export const metadata: Metadata = {
  title: "Doktor ve Hemşire Araçları: Skorlar, BSA, Laboratuvar Dönüşümleri",
  description:
    "Doktor, hemşire ve sağlık öğrencileri için tek sayfada toplanmış araçlar: Glasgow Koma Skalası, APGAR, CHA2DS2-VASc, vücut yüzey alanı, kreatinin klirensi, IV damla hızı ve laboratuvar birim dönüşümleri.",
  alternates: { canonical: "/doktor-hemsire-araclari" },
  openGraph: {
    title: "Doktor ve Hemşire Araçları: Skorlar, BSA, Laboratuvar Dönüşümleri",
    description: "Klinik skorlar, BSA, kreatinin klirensi, IV damla hızı ve laboratuvar birim dönüşümleri tek sayfada.",
    url: buildSiteUrl("/doktor-hemsire-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function DoktorHemsireAraclariPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Doktor ve Hemşire Araçları", item: buildSiteUrl("/doktor-hemsire-araclari") },
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
          <span>Doktor ve Hemşire Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Doktor ve Hemşire Araçları</h1>
          <p>
            Doktor, hemşire ve sağlık bilimleri öğrencileri için
            hesaplama araçlarını tek sayfada topladık: klinik
            skorlama sistemleri, vücut yüzey alanı, kreatinin
            klirensi, IV damla hızı ve laboratuvar birim dönüşümleri.
            Hiçbiri ilaç dozu önermez — tümü tanısal referans değer
            veya birim çevirimi yapar.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>GKS aralığı</strong>: 3 (derin koma) - 15 (tam
              uyanık)
            </li>
            <li>
              <strong>Normal APGAR</strong>: 7-10 puan
            </li>
            <li>
              <strong>126 mg/dL glukoz</strong> = 7,0 mmol/L
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Klinik Skorlama Araçları</h2>
          <ul>
            <li>
              <Link href="/glasgow-koma-skalasi-hesaplama">
                Glasgow Koma Skalası (GKS) Hesaplama
              </Link>{" "}
              — göz açma, sözel ve motor yanıttan bilinç düzeyi
              puanını hesapla.
            </li>
            <li>
              <Link href="/apgar-skoru-hesaplama">APGAR Skoru Hesaplama</Link>
              {" "}— yenidoğanın doğum sonrası ilk değerlendirme
              puanını hesapla.
            </li>
            <li>
              <Link href="/cha2ds2-vasc-skoru-hesaplama">
                CHA2DS2-VASc Skoru Hesaplama
              </Link>{" "}
              — atriyal fibrilasyonda inme riski skorunu (klasik ve
              2024 revize) hesapla.
            </li>
            <li>
              <Link href="/wells-skoru-hesaplama">Wells Skoru Hesaplama</Link>
              {" "}— pulmoner emboli klinik olasılık skorunu hesapla.
            </li>
            <li>
              <Link href="/qsofa-hesaplama">qSOFA Hesaplama</Link>
              {" "}— sepsis şüphesinde hızlı yatak başı tarama puanını hesapla.
            </li>
            <li>
              <Link href="/sofa-skoru-hesaplama">SOFA Skoru Hesaplama</Link>
              {" "}— yoğun bakımda 6 organ sisteminin yetmezlik skorunu hesapla.
            </li>
            <li>
              <Link href="/meld-skoru-hesaplama">MELD Skoru Hesaplama</Link>
              {" "}— karaciğer hastalığının ciddiyet skorunu hesapla.
            </li>
            <li>
              <Link href="/morse-dusme-skalasi-hesaplama">
                Morse Düşme Skalası Hesaplama
              </Link>{" "}
              — hastanede düşme riski skorunu hesapla.
            </li>
            <li>
              <Link href="/braden-skalasi-hesaplama">Braden Skalası Hesaplama</Link>
              {" "}— basınç yarası gelişme riski skorunu hesapla.
            </li>
          </ul>

          <h2>Referans ve Birim Çevirme Araçları</h2>
          <ul>
            <li>
              <Link href="/vucut-yuzey-alani-hesaplama">
                Vücut Yüzey Alanı Hesaplama (BSA)
              </Link>{" "}
              — Mosteller formülüyle vücut yüzey alanını hesapla.
            </li>
            <li>
              <Link href="/kreatinin-klirensi-hesaplama">
                Kreatinin Klirensi Hesaplama
              </Link>{" "}
              — Cockcroft-Gault formülüyle böbrek fonksiyonu tahmini.
            </li>
            <li>
              <Link href="/iv-damla-hizi-hesaplama">
                IV Damla Hızı Hesaplama
              </Link>{" "}
              — hacim, süre ve damla faktöründen damla/dakika hesapla.
            </li>
            <li>
              <Link href="/kategoriler/kan-sekeri">
                Kan Şekeri Birim Dönüşümleri
              </Link>{" "}
              — glukoz değerini mg/dL ↔ mmol/L arasında çevir.
            </li>
            <li>
              <Link href="/kategoriler/vitamin-d">
                Vitamin D Birim Dönüşümleri
              </Link>{" "}
              — Vitamin D değerini ng/mL ↔ nmol/L arasında çevir.
            </li>
          </ul>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>Bu sayfadaki araçlar tıbbi tavsiye yerine geçer mi?</strong>
            <br />
            Hayır. Buradaki araçların hepsi genel bilgilendirme ve
            hesaplama amaçlıdır; hiçbiri ilaç dozu veya tedavi
            önermez. Tanısal skorlar (GKS, APGAR, CHA2DS2-VASc) birer
            referans değer üretir, klinisyen yorumlar.
          </p>
          <p>
            <strong>Neden pediyatrik ilaç doz hesaplama aracı yok?</strong>
            <br />
            Güvenli bir pediyatrik doz hesabı, ilaca özel maksimum doz
            sınırı ve konsantrasyon-hacim çevrimi gerektirir; bunlar
            tek bir genel formülle güvenle sağlanamaz ve profesyonel
            eczacı gözetimi gerektirir. Bu yüzden bu araç setinde
            bilinçli olarak yer almıyor.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Her aracın kaynağı kendi sayfasında ayrıca belirtilmiştir.
            Bu sayfa ve bağlı araçlar genel bilgilendirme amaçlıdır,
            tıbbi tavsiye yerine geçmez.
          </p>
        </section>
      </div>
    </main>
  );
}
