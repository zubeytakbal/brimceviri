import type { Metadata } from "next";
import Link from "next/link";
import PipeFlowCalculator from "../components/PipeFlowCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Boru çapı nasıl hesaplanır?",
    answer:
      "Boru çapı, süreklilik denklemi (Q = A×v) kullanılarak debi (Q) ve istenen akış hızından (v) hesaplanır: D = √(4Q/(π×v)). Bu formül basınçlı su/sıvı hatları için geçerlidir.",
  },
  {
    question: "Su hatlarında tavsiye edilen akış hızı nedir?",
    answer:
      "İçme suyu şebekelerinde tavsiye edilen akış hızı genelde 0,5-2,5 m/s aralığındadır. Çok düşük hız çökelmeye, çok yüksek hız aşınma ve gürültüye yol açabilir.",
  },
];

export const metadata: Metadata = {
  title: "Boru Çapı, Debi ve Akış Hızı Hesaplama",
  description:
    "Süreklilik denklemiyle (Q=A×v) boru çapı, debi veya akış hızından istediğini hesapla. Basınçlı su/sıvı hatları için.",
  alternates: { canonical: "/boru-capi-hesaplama" },
  openGraph: {
    title: "Boru Çapı, Debi ve Akış Hızı Hesaplama",
    description: "Boru çapı, debi ve akış hızı hesaplayın.",
    url: buildSiteUrl("/boru-capi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function PipeFlowPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Boru Çapı, Debi ve Akış Hızı Hesaplama", item: buildSiteUrl("/boru-capi-hesaplama") },
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
          <span>Boru Çapı, Debi ve Akış Hızı Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Boru Çapı, Debi ve Akış Hızı Hesaplama</h1>
          <p>
            Debi, akış hızı veya boru çapından ikisini gir: eksik olan
            üçüncü değeri anında hesapla.
          </p>
        </header>

        <PipeFlowCalculator />

        <section className="category-article-content">
          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>Boru çapı nasıl hesaplanır?</strong>
            <br />
            Boru çapı, süreklilik denklemi (Q = A×v) kullanılarak
            debi (Q) ve istenen akış hızından (v) hesaplanır: D =
            √(4Q/(π×v)). Bu formül basınçlı su/sıvı hatları için
            geçerlidir.
          </p>
          <p>
            <strong>Su hatlarında tavsiye edilen akış hızı nedir?</strong>
            <br />
            İçme suyu şebekelerinde tavsiye edilen akış hızı genelde
            0,5-2,5 m/s aralığındadır. Çok düşük hız çökelmeye, çok
            yüksek hız aşınma ve gürültüye yol açabilir.
          </p>

          <h2>İlgili araçlar</h2>
          <p>
            Boru hattındaki basınç kaybı için{" "}
            <Link href="/basinc-kaybi-hesaplama">Basınç Kaybı Hesaplama</Link>,
            diğer tesisatçı araçları için{" "}
            <Link href="/tesisatci-araclari">Tesisatçı Araçları</Link>{" "}
            sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Formül, akışkanlar mekaniğinde temel süreklilik
            denklemine dayanır. Doğalgaz iç tesisatı gibi basınç
            kaybı ve gaz yoğunluğuna bağlı hesaplar TS 7363
            standardına göre ayrıca yapılmalıdır.
          </p>
        </section>
      </div>
    </main>
  );
}
