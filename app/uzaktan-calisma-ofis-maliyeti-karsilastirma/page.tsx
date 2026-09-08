import type { Metadata } from "next";
import Link from "next/link";
import EmbedCodeBox from "../components/EmbedCodeBox";
import RemoteWorkVsOfficeCostCalculator from "../components/RemoteWorkVsOfficeCostCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Uzaktan çalışmak gerçekten tasarruf ettirir mi?",
    answer:
      "Bu, yol masrafına, öğle yemeği alışkanlığına ve evden çalışırken oluşan ek elektrik/ısınma giderine bağlıdır. Çoğu durumda yol ve yemek tasarrufu, ek ev giderinden daha büyük çıkar; ama uzun mesafeli ve pahalı toplu taşıma kullananlarda fark daha da büyür. Yukarıdaki hesaplayıcıya kendi rakamlarını girerek net sonucu görebilirsin.",
  },
  {
    question: "Evden çalışmanın ek maliyeti neden var?",
    answer:
      "Gün boyu evde bulunmak elektrik (aydınlatma, bilgisayar, ısıtıcı/klima) ve bazen ısınma giderini artırır. Bu hesaplayıcı bu ek maliyeti de hesaba katarak, sadece 'yol parası kalmıyor' değil, gerçek net tasarrufu gösterir.",
  },
  {
    question: "Hibrit çalışma (haftada birkaç gün ofis) için nasıl kullanılır?",
    answer:
      "Haftada kaç gün evden çalıştığını gir (0-5 arası); hesaplayıcı yıllık iş gününü buna göre oranlayıp, sadece evden çalıştığın günler için yol/yemek tasarrufunu ve ek ev giderini hesaplar.",
  },
];

export const metadata: Metadata = {
  title: "Uzaktan Çalışma mı Ofis mi? Maliyet Karşılaştırma",
  description:
    "Kendi yol masrafın, öğle yemeği farkın ve evden çalışmanın ek gideriyle, uzaktan çalışmanın yılda ne kadar tasarruf ettirdiğini (veya ettirmediğini) hesapla.",
  alternates: {
    canonical: "/uzaktan-calisma-ofis-maliyeti-karsilastirma",
  },
  openGraph: {
    title: "Uzaktan Çalışma mı Ofis mi? Maliyet Karşılaştırma",
    description: "Kendi rakamlarınla uzaktan çalışmanın yıllık net tasarrufunu hesapla.",
    url: buildSiteUrl("/uzaktan-calisma-ofis-maliyeti-karsilastirma"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function RemoteWorkVsOfficeCostPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Uzaktan Çalışma mı Ofis mi?", item: buildSiteUrl("/uzaktan-calisma-ofis-maliyeti-karsilastirma") },
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
          <span>Uzaktan Çalışma mı Ofis mi?</span>
        </nav>

        <div className="page-top-row">
          <header className="all-conversions-header">
            <h1>Uzaktan Çalışma mı Ofis mi? Maliyet Karşılaştırma</h1>
            <p>
              Kendi yol masrafın, öğle yemeği farkın ve evden
              çalışmanın ek gideriyle, uzaktan çalışmanın yılda ne
              kadar tasarruf ettirdiğini hesapla.
            </p>
          </header>

          <EmbedCodeBox
            embedPath="/embed/uzaktan-calisma-ofis-maliyeti-karsilastirma"
            title="Uzaktan Çalışma mı Ofis mi?"
            height={780}
            maxWidth={560}
          />
        </div>

        <RemoteWorkVsOfficeCostCalculator />

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
            Aracının yakıt maliyetini hesaplamak için{" "}
            <Link href="/yakit-tuketimi-hesaplama">Yakıt Tüketimi Hesaplama</Link>
            {" "}sayfasına, diğer karar-destek araçları için{" "}
            <Link href="/elektrikli-arac-maliyet-karsilastirma">
              Elektrikli Araç mı Benzinli Araç mı?
            </Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Yıllık iş günü varsayımı, Türkiye&apos;de yıllık izin ve
            resmi tatiller düşüldükten sonra ortalama çalışma günü
            sayısına dayanır; kendi kurumunun izin/tatil takvimine
            göre güncelleyebilirsin.
          </p>
        </section>
      </div>
    </main>
  );
}
