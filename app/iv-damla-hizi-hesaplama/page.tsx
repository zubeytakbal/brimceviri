import type { Metadata } from "next";
import Link from "next/link";
import IvDripRateCalculator from "../components/IvDripRateCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Damla faktörü (gtt/mL) ne demek, nasıl seçilir?",
    answer:
      "Damla faktörü, kullanılan IV setinin 1 mL sıvıyı kaç damlaya böldüğünü gösterir. Standart makro setler genellikle 10, 15 veya 20 gtt/mL; pediatrik/mikro setler ise 60 gtt/mL'dir. Kullandığın setin ambalajında bu değer yazılıdır.",
  },
  {
    question: "Bu araç reçete edilen hızı/hacmi değiştirir mi?",
    answer:
      "Hayır. Bu araç yalnızca hekim tarafından reçete edilmiş hacim ve süreyi damla/dakika birimine çevirir. Reçete edilen değeri belirlemez, değiştirmez; sonuç her zaman hekim talimatı ve kurum protokolüyle karşılaştırılmalıdır.",
  },
];

export const metadata: Metadata = {
  title: "IV Damla Hızı Hesaplama (Damla/Dakika)",
  description:
    "Toplam hacim, süre ve damla faktöründen, dakikadaki damla sayısını (gtt/dk) ve mL/saat karşılığını hesapla.",
  alternates: { canonical: "/iv-damla-hizi-hesaplama" },
  openGraph: {
    title: "IV Damla Hızı Hesaplama (Damla/Dakika)",
    description: "Hacim, süre ve damla faktöründen damla hızını hesaplayın.",
    url: buildSiteUrl("/iv-damla-hizi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function IvDripRatePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "IV Damla Hızı Hesaplama", item: buildSiteUrl("/iv-damla-hizi-hesaplama") },
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
          <span>IV Damla Hızı Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>IV Damla Hızı Hesaplama</h1>
          <p>
            Toplam hacmi, süreyi ve damla faktörünü gir: dakikadaki
            damla sayısını (gtt/dk) ve pompa hızı (mL/saat) karşılığını
            anında hesapla.
          </p>
        </header>

        <IvDripRateCalculator />

        <section className="category-article-content">
          <h2>Damla hızı nasıl hesaplanır?</h2>
          <p>
            <strong>
              Damla/dk = (Toplam Hacim (mL) × Damla Faktörü (gtt/mL)) /
              Süre (dakika)
            </strong>
            . İnfüzyon pompası kullanılıyorsa, pompanın mL/saat ayarı
            tercih edilmelidir; damla sayma yöntemi yalnızca pompa
            olmayan durumlar için kullanılır.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>Damla faktörü (gtt/mL) ne demek, nasıl seçilir?</strong>
            <br />
            Damla faktörü, kullanılan IV setinin 1 mL sıvıyı kaç
            damlaya böldüğünü gösterir. Standart makro setler genellikle
            10, 15 veya 20 gtt/mL; pediatrik/mikro setler ise 60
            gtt/mL&apos;dir.
          </p>
          <p>
            <strong>Bu araç reçete edilen hızı/hacmi değiştirir mi?</strong>
            <br />
            Hayır. Bu araç yalnızca hekim tarafından reçete edilmiş
            hacim ve süreyi damla/dakika birimine çevirir. Sonuç her
            zaman hekim talimatı ve kurum protokolüyle
            karşılaştırılmalıdır.
          </p>

          <h2>İlgili araçlar</h2>
          <p>
            Diğer doktor ve hemşire araçları için{" "}
            <Link href="/doktor-hemsire-araclari">Doktor ve Hemşire Araçları</Link>{" "}
            sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Formül, hemşirelik eğitiminde standart kullanılan temel IV
            infüzyon hesabına dayanmaktadır. Bu araç tıbbi tavsiye
            yerine geçmez ve reçete edilen tedaviyi değiştirmez.
          </p>
        </section>
      </div>
    </main>
  );
}
