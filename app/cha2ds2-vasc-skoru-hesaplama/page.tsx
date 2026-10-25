import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import Cha2ds2Calculator from "../components/Cha2ds2Calculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "CHA2DS2-VASc skoru ne için kullanılır?",
    answer:
      "Atriyal fibrilasyonu (AF) olan hastalarda inme veya diğer tromboembolik olay riskini değerlendirmek için kullanılan, klinikte yaygın bir risk skorlama aracıdır. Skor, antikoagülan tedavi kararında klinisyene yol gösteren faktörlerden biridir.",
  },
  {
    question: "CHA2DS2-VASc ile CHA2DS2-VA arasındaki fark nedir?",
    answer:
      "2024 ESC (Avrupa Kardiyoloji Derneği) kılavuzunda, cinsiyet faktörünün bağımsız bir risk belirleyicisi olmadığı değerlendirilerek skordan çıkarılmış ve isim CHA2DS2-VA olarak revize edilmiştir. Bu araç her iki skoru da birlikte gösterir.",
  },
];

export const metadata: Metadata = {
  title: "CHA2DS2-VASc Skoru Hesaplama (İnme Riski)",
  description:
    "Atriyal fibrilasyonda inme riski faktörlerini işaretle: klasik CHA2DS2-VASc ve 2024 revize CHA2DS2-VA skorunu birlikte hesapla.",
  alternates: { canonical: "/cha2ds2-vasc-skoru-hesaplama" },
  openGraph: {
    title: "CHA2DS2-VASc Skoru Hesaplama (İnme Riski)",
    description: "Klasik ve 2024 revize CHA2DS2-VA inme riski skorunu hesaplayın.",
    url: buildSiteUrl("/cha2ds2-vasc-skoru-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function Cha2ds2Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "CHA2DS2-VASc Skoru Hesaplama", item: buildSiteUrl("/cha2ds2-vasc-skoru-hesaplama") },
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
          <span>CHA2DS2-VASc Skoru Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>CHA2DS2-VASc Skoru Hesaplama</h1>
          <p>
            Atriyal fibrilasyonda inme riski faktörlerini işaretle:
            klasik CHA2DS2-VASc ve 2024 revize CHA2DS2-VA skorunu
            birlikte anında hesapla.
          </p>
        </header>

        <Cha2ds2Calculator />

        <section className="category-article-content">
          <h2>CHA2DS2-VASc skoru nasıl hesaplanır?</h2>
          <p>
            Skor, risk faktörlerinin baş harflerinden oluşur: C
            (Konjestif kalp yetmezliği, +1), H (Hipertansiyon, +1), A2
            (Yaş ≥75, +2), D (Diyabet, +1), S2 (İnme/TİA/tromboemboli
            öyküsü, +2), V (Vasküler hastalık, +1), A (Yaş 65-74, +1),
            Sc (Kadın cinsiyet, +1). Toplam skor 0-9 arasındadır.
          </p>

          <h2>Örnek hesap</h2>
          <p>
            72 yaşında, hipertansiyonu olan bir kadın: yaş 65–74 (+1), hipertansiyon (+1) ve kadın cinsiyet (+1) ile CHA2DS2-VASc
            skoru 3&apos;tür. Cinsiyetin çıkarıldığı CHA2DS2-VA ile aynı hastanın puanı 2 olur.
          </p>

          <h2>Puan ne anlama gelir?</h2>
          <p>
            Puan arttıkça yıllık inme riski artar. 2024 ESC atriyal fibrilasyon kılavuzu, CHA2DS2-VA puanı 2 ve üzeri olan hastalarda
            oral antikoagülan tedaviyi önerir, 1 puanda düşünülebileceğini belirtir. Karar tek başına bu skora göre verilmez:
            kanama riski (örneğin HAS-BLED skoruyla) ve hastanın diğer durumları birlikte değerlendirilir. Bu araç tedavi önermez.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>CHA2DS2-VASc skoru ne için kullanılır?</strong>
            <br />
            Atriyal fibrilasyonu (AF) olan hastalarda inme veya diğer
            tromboembolik olay riskini değerlendirmek için kullanılan,
            klinikte yaygın bir risk skorlama aracıdır.
          </p>
          <p>
            <strong>
              CHA2DS2-VASc ile CHA2DS2-VA arasındaki fark nedir?
            </strong>
            <br />
            2024 ESC (Avrupa Kardiyoloji Derneği) kılavuzunda, cinsiyet
            faktörünün bağımsız bir risk belirleyicisi olmadığı
            değerlendirilerek skordan çıkarılmış ve isim CHA2DS2-VA
            olarak revize edilmiştir.
          </p>

          <h2>Diğer Risk Skorlama Araçları</h2>
          <ul className="related-conversion-list">
            <li><Link href="/glasgow-koma-skalasi-hesaplama">Glasgow Koma Skalası Hesaplama</Link></li>
            <li><Link href="/meld-skoru-hesaplama">MELD Skoru Hesaplama</Link></li>
            <li><Link href="/sofa-skoru-hesaplama">SOFA Skoru Hesaplama</Link></li>
            <li><Link href="/qsofa-hesaplama">qSOFA Hesaplama</Link></li>
            <li><Link href="/wells-skoru-hesaplama">Wells Skoru Hesaplama</Link></li>
          </ul>

          <h2>İlgili araçlar</h2>
          <p>
            Diğer doktor ve hemşire araçları için{" "}
            <Link href="/hesaplayicilar#klinik">Klinik Skorlar</Link>{" "}
            sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Skor, Lip GYH ve ark. (2010) tarafından geliştirilmiş ve
            2024 ESC Atriyal Fibrilasyon Kılavuzu&apos;nda revize
            edilmiştir. Bu araç tıbbi tavsiye yerine geçmez; tedavi
            kararı için güncel kılavuzlara ve bir hekime
            danışılmalıdır.
          </p>
        </section>
      </div>
    </main>
  );
}
