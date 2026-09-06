import type { Metadata } from "next";
import Link from "next/link";
import HardnessConversionCalculator from "../components/HardnessConversionCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Brinell, Rockwell ve Vickers sertlik dönüşümü ne kadar doğrudur?",
    answer:
      "ASTM E140 standardına göre yapılan bu dönüşümler yaklaşık ±%5 hassasiyetle geçerlidir. Kritik veya sözleşmeye bağlı ölçümlerde her zaman doğrudan ölçüm esas alınmalıdır.",
  },
  {
    question: "Bu dönüşüm tablosu her malzeme için geçerli mi?",
    answer:
      "Hayır. ASTM E140 tablosu yalnızca ısıl işlem görmüş veya görmemiş (ostenitik olmayan) çelikler için geçerlidir. Paslanmaz çelik, alüminyum, bakır alaşımları ve dökme demir için farklı, ayrı dönüşüm tabloları kullanılması gerekir.",
  },
  {
    question: "Rockwell B (HRB) ile Rockwell C (HRC) arasındaki fark nedir?",
    answer:
      "HRB ölçeği daha yumuşak malzemeler (yaklaşık 100 HRB'ye kadar) için, HRC ölçeği ise sertleştirilmiş çelik gibi daha sert malzemeler için kullanılır. İkisi farklı uç ve yük kullanır; doğrudan karşılaştırılamaz, sadece Brinell/Vickers üzerinden dolaylı olarak eşleştirilebilir.",
  },
];

export const metadata: Metadata = {
  title: "Sertlik Dönüşüm Hesaplama (Brinell, Rockwell, Vickers)",
  description:
    "Brinell (HB), Rockwell C/B (HRC/HRB) veya Vickers (HV) sertlik değerini gir, diğer ölçeklerdeki en yakın eşdeğerini gör. ASTM E140 tablosu dahil.",
  alternates: {
    canonical: "/sertlik-donusum-hesaplama",
  },
  openGraph: {
    title: "Sertlik Dönüşüm Hesaplama (Brinell, Rockwell, Vickers)",
    description: "HB, HRC, HRB ve HV sertlik değerlerini birbirine dönüştür.",
    url: buildSiteUrl("/sertlik-donusum-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function HardnessConversionPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Sertlik Dönüşüm Hesaplama", item: buildSiteUrl("/sertlik-donusum-hesaplama") },
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
          <span>Sertlik Dönüşüm Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Sertlik Dönüşüm Hesaplama</h1>
          <p>
            Brinell (HB), Rockwell C/B (HRC/HRB) veya Vickers (HV)
            sertlik değerini gir: diğer ölçeklerdeki en yakın eşdeğerini
            gör. Altta ASTM E140 tabanlı tam dönüşüm tablosunu da
            bulabilirsin.
          </p>
        </header>

        <HardnessConversionCalculator />

        <section className="category-article-content">
          <h2>Sık Sorulan Sorular</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>İlgili araçlar</h2>
          <p>
            Kaynak işleri için{" "}
            <Link href="/kaynakci-araclari">Kaynakçı Araçları</Link>
            {" "}sayfasına, işleme parametreleri için{" "}
            <Link href="/cnc-torna-araclari">CNC/Torna Operatörü Araçları</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Dönüşüm değerleri ASTM E140 standardına dayanan, iki
            bağımsız kaynaktan (steel-endüstrisi referans hesaplayıcıları
            ve ASTM E140 özet tabloları) çapraz doğrulanmış yaklaşık
            değerlerdir.
          </p>
        </section>
      </div>
    </main>
  );
}
