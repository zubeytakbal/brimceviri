import type { Metadata } from "next";
import Link from "next/link";
import MaterialWeightCalculator from "../components/MaterialWeightCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Çeliğin yoğunluğu kaçtır?",
    answer:
      "Karbon çeliğinin yoğunluğu yaklaşık 7850 kg/m³'tür (7,85 g/cm³). Paslanmaz çelik türleri genelde 8000 kg/m³ civarındadır.",
  },
  {
    question: "Malzeme ağırlığı nasıl hesaplanır?",
    answer:
      "Ağırlık (kg) = Yoğunluk (kg/m³) × Hacim (m³). Küçük parçalarda hacim genelde cm³ cinsinden ölçülür; bu durumda Ağırlık (kg) = Yoğunluk (kg/m³) × Hacim (cm³) / 1.000.000.",
  },
  {
    question: "Alüminyumun yoğunluğu kaçtır?",
    answer:
      "Alüminyumun yoğunluğu yaklaşık 2700 kg/m³'tür (2,7 g/cm³); bu da onu çelikten (7850 kg/m³) yaklaşık 2,9 kat daha hafif yapar.",
  },
];

export const metadata: Metadata = {
  title: "Malzeme Yoğunlukları Tablosu ve Ağırlık Hesaplama",
  description:
    "Çelik, alüminyum, bakır gibi yaygın malzemelerin yoğunluk tablosundan, hacimden ağırlığı ya da ağırlıktan hacmi hesapla.",
  alternates: {
    canonical: "/malzeme-agirligi-hesaplama",
  },
  openGraph: {
    title: "Malzeme Yoğunlukları Tablosu ve Ağırlık Hesaplama",
    description: "Yoğunluk tablosundan malzeme ağırlığı veya hacmi hesapla.",
    url: buildSiteUrl("/malzeme-agirligi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function MaterialWeightCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Malzeme Yoğunlukları Tablosu ve Ağırlık Hesaplama", item: buildSiteUrl("/malzeme-agirligi-hesaplama") },
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
          <span>Malzeme Yoğunlukları Tablosu ve Ağırlık Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Malzeme Yoğunlukları Tablosu ve Ağırlık Hesaplama</h1>
          <p>
            Malzeme seç, hacmini (cm³) gir: ağırlığını (kg) hesapla —
            ya da bildiğin ağırlıktan hacmi bul. Altta yaygın
            malzemelerin yoğunluk tablosunu da bulabilirsin.
          </p>
        </header>

        <MaterialWeightCalculator />

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
            {" "}sayfasına, CNC/torna işleri için{" "}
            <Link href="/cnc-torna-araclari">CNC/Torna Operatörü Araçları</Link>
            {" "}sayfasına, kütle birimi dönüşümleri için{" "}
            <Link href="/kategoriler/kutle">Kütle Dönüşümleri</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Yoğunluk değerleri, ~20°C için yaygın kabul gören genel
            mühendislik referans değerleridir; alaşım ve tür farklarına
            göre küçük sapmalar olabilir.
          </p>
        </section>
      </div>
    </main>
  );
}
