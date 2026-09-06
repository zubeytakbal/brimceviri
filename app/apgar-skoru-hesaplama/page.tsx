import type { Metadata } from "next";
import Link from "next/link";
import ApgarCalculator from "../components/ApgarCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "APGAR skoru ne zaman ölçülür?",
    answer:
      "APGAR skoru, doğumdan tam olarak 1. ve 5. dakikada değerlendirilir; skor düşük çıkarsa 10. dakikada tekrar ölçülür.",
  },
  {
    question: "APGAR skoru bebeğin uzun vadeli sağlığını mı gösterir?",
    answer:
      "Hayır. APGAR, doğum anındaki hızlı bir ilk değerlendirmedir; bebeğin uzun vadeli sağlığı veya gelişimi hakkında tek başına bir gösterge değildir.",
  },
];

export const metadata: Metadata = {
  title: "APGAR Skoru Hesaplama (Yenidoğan Değerlendirmesi)",
  description:
    "Görünüm, nabız, refleks, aktivite ve solunumu seç: APGAR skorunu ve yenidoğan değerlendirme kategorisini hesapla.",
  alternates: { canonical: "/apgar-skoru-hesaplama" },
  openGraph: {
    title: "APGAR Skoru Hesaplama (Yenidoğan Değerlendirmesi)",
    description: "APGAR skorunu ve değerlendirme kategorisini hesaplayın.",
    url: buildSiteUrl("/apgar-skoru-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function ApgarPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "APGAR Skoru Hesaplama", item: buildSiteUrl("/apgar-skoru-hesaplama") },
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
          <span>APGAR Skoru Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>APGAR Skoru Hesaplama</h1>
          <p>
            Görünüm, nabız, refleks, aktivite ve solunumu seç: APGAR
            toplam puanını ve yenidoğan değerlendirme kategorisini
            anında hesapla.
          </p>
        </header>

        <ApgarCalculator />

        <section className="category-article-content">
          <h2>APGAR skoru nedir?</h2>
          <p>
            APGAR, 1952&apos;de Dr. Virginia Apgar tarafından
            geliştirilen, yenidoğanın doğum sonrası ilk hayati
            belirtilerini değerlendiren bir puanlama sistemidir.
            &quot;APGAR&quot; kelimesi Appearance (Görünüm), Pulse
            (Nabız), Grimace (Refleks), Activity (Aktivite) ve
            Respiration (Solunum) kelimelerinin baş harflerinden
            türetilmiştir. Her kriter 0-2 puan alır, toplam 0-10
            arasındadır.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>APGAR skoru ne zaman ölçülür?</strong>
            <br />
            APGAR skoru, doğumdan tam olarak 1. ve 5. dakikada
            değerlendirilir; skor düşük çıkarsa 10. dakikada tekrar
            ölçülür.
          </p>
          <p>
            <strong>
              APGAR skoru bebeğin uzun vadeli sağlığını mı gösterir?
            </strong>
            <br />
            Hayır. APGAR, doğum anındaki hızlı bir ilk
            değerlendirmedir; bebeğin uzun vadeli sağlığı veya
            gelişimi hakkında tek başına bir gösterge değildir.
          </p>

          <h2>İlgili araçlar</h2>
          <p>
            Diğer doktor ve hemşire araçları için{" "}
            <Link href="/doktor-hemsire-araclari">Doktor ve Hemşire Araçları</Link>{" "}
            sayfasına, gebelik takibi için{" "}
            <Link href="/gebelik-haftasi-hesaplama">Gebelik Haftası Hesaplama</Link>{" "}
            aracına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Skala, Apgar V (1953), &quot;A proposal for a new method
            of evaluation of the newborn infant&quot;, Current
            Researches in Anesthesia &amp; Analgesia yayınına
            dayanmaktadır. Bu araç tıbbi tavsiye yerine geçmez.
          </p>
        </section>
      </div>
    </main>
  );
}
