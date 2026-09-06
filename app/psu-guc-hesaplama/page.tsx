import type { Metadata } from "next";
import Link from "next/link";
import PsuCalculator from "../components/PsuCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "PSU (güç kaynağı) gücü nasıl hesaplanır?",
    answer:
      "Önce sistemdeki tüm bileşenlerin (CPU, GPU, anakart, RAM, disk, fanlar) toplam güç tüketimi (W) toplanır. Ardından geçici yük sivrilmelerini ve PSU verimlilik eğrisini karşılamak için bu toplama %20-30 güvenlik payı eklenir.",
  },
  {
    question: "Neden güvenlik payı eklemeliyim?",
    answer:
      "Bileşenler kısa süreli olarak nominal güçlerinin üzerinde çekim yapabilir (özellikle GPU'lar). Ayrıca 80+ verimlilik sertifikalı PSU'lar, kapasitelerinin %50-60'ında kullanıldığında en verimli çalışır; tam kapasiteye yakın sürekli çalıştırmak PSU ömrünü kısaltabilir.",
  },
  {
    question: "CPU ve GPU TDP değerlerini nereden bulurum?",
    answer:
      "TDP (Thermal Design Power) değerleri, üreticinin (Intel, AMD, NVIDIA) ürün sayfasında veya kutu üzerinde belirtilir.",
  },
];

export const metadata: Metadata = {
  title: "PSU Güç Kaynağı Hesaplama (Watt)",
  description:
    "CPU, GPU ve diğer bileşenlerin gücünden (W), güvenlik payı dahil önerilen PSU (güç kaynağı) wattajını hesapla.",
  alternates: {
    canonical: "/psu-guc-hesaplama",
  },
  openGraph: {
    title: "PSU Güç Kaynağı Hesaplama (Watt)",
    description: "Bileşen güçlerinden önerilen PSU wattajını hesapla.",
    url: buildSiteUrl("/psu-guc-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function PsuCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Bilgisayar Donanımcısı Araçları", item: buildSiteUrl("/bilgisayar-donanimcisi-araclari") },
      { "@type": "ListItem", position: 4, name: "PSU Güç Kaynağı Hesaplama", item: buildSiteUrl("/psu-guc-hesaplama") },
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
          <Link href="/bilgisayar-donanimcisi-araclari">Bilgisayar Donanımcısı Araçları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>PSU Güç Kaynağı Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>PSU Güç Kaynağı Hesaplama</h1>
          <p>
            CPU, GPU ve diğer bileşenlerin gücünü (W) gir: güvenlik
            payı dahil önerilen PSU wattajını hesapla.
          </p>
        </header>

        <PsuCalculator />

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
            Diğer bilgisayar donanımcısı araçları için{" "}
            <Link href="/bilgisayar-donanimcisi-araclari">Bilgisayar Donanımcısı Araçları</Link>
            {" "}sayfasına bakabilirsin.
          </p>
        </section>
      </div>
    </main>
  );
}
