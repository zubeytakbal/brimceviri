import type { Metadata } from "next";
import Link from "next/link";
import BoltTorqueCalculator from "../components/BoltTorqueCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Cıvata sıkma torku nasıl belirlenir?",
    answer:
      "Cıvata sıkma torku; cıvata ölçüsüne (M6, M8, M10...) ve dayanım sınıfına (8.8, 10.9, 12.9) göre DIN 13 gibi standartlara dayanan referans tablolardan alınır. Bu araçtaki değerler, birbirinden bağımsız iki kaynaktan çapraz doğrulanmış genel referans değerleridir.",
  },
  {
    question: "K-faktör (nut factor) yöntemi nedir?",
    answer:
      "T = K × D × F formülü, uygulanan tork (T) ile elde edilen sıkma kuvveti (F) arasındaki ilişkiyi tahmin eder. K, sürtünme koşullarına bağlı bir katsayıdır (kuru/hafif yağlı bağlantılar için genelde ~0,2 kabul edilir); D cıvatanın nominal çapıdır.",
  },
  {
    question: "Neden bu değerler kesin kabul edilmemeli?",
    answer:
      "Gerçek gereken tork; yüzey kaplaması, yağlama durumu, somun tipi ve bağlantının özel tasarım gereksinimlerine göre önemli ölçüde değişebilir. Kritik veya standarda tabi montajlarda cıvata üreticisinin veya tasarımcının belirttiği kesin değer kullanılmalıdır.",
  },
];

export const metadata: Metadata = {
  title: "Cıvata Torku Hesaplama (DIN 13, 8.8/10.9/12.9)",
  description:
    "Cıvata ölçüsü ve dayanım sınıfından önerilen sıkma torkunu (Nm), K-faktör yöntemiyle de tahmini sıkma kuvvetini hesapla.",
  alternates: {
    canonical: "/civata-torku-hesaplama",
  },
  openGraph: {
    title: "Cıvata Torku Hesaplama (DIN 13, 8.8/10.9/12.9)",
    description: "Cıvata ölçüsü ve sınıfından sıkma torku hesapla.",
    url: buildSiteUrl("/civata-torku-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function BoltTorqueCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Cıvata Torku Hesaplama", item: buildSiteUrl("/civata-torku-hesaplama") },
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
          <span>Cıvata Torku Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Cıvata Torku Hesaplama</h1>
          <p>
            Cıvata ölçüsü ve dayanım sınıfını seç: önerilen başlangıç
            sıkma torkunu gör. K-faktör yöntemiyle, bu torkun yaklaşık
            ne kadar sıkma kuvveti oluşturduğunu da hesapla.
          </p>
        </header>

        <BoltTorqueCalculator />

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
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Tork değerleri, DIN 13 normuna dayanan ve iki bağımsız
            kaynaktan (birbirine yakın sonuçlar veren) çapraz
            doğrulanmış genel referanslardır. K-faktör yöntemi,
            cıvata mühendisliğinde yaygın kullanılan T = K × D × F
            bağıntısına dayanır. Bu araç mühendislik onayı yerine
            geçmez.
          </p>
        </section>
      </div>
    </main>
  );
}
