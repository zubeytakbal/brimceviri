import type { Metadata } from "next";
import Link from "next/link";
import AntennaLengthCalculator from "../components/AntennaLengthCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Dipol anten uzunluğu nasıl hesaplanır?",
    answer:
      "Yarım dalga dipol anten uzunluğu (metre) = 142,5 / Frekans (MHz) formülüyle hesaplanır. Bu formül, uç etkisini (end effect) hesaba katan pratik bir katsayı içerir.",
  },
  {
    question: "Çeyrek dalga vertikal anten uzunluğu nasıl hesaplanır?",
    answer:
      "Çeyrek dalga vertikal anten, yarım dalga dipolün yarısı kadardır: Uzunluk (metre) = 71,25 / Frekans (MHz).",
  },
  {
    question: "Tam dalga boyu ile pratik anten uzunluğu neden farklı?",
    answer:
      "Tam dalga boyu (λ = 300/f), serbest uzaydaki teorik değerdir. Gerçek bir antende iletkenin kalınlığı ve uçlardaki kapasitif etki (end effect) nedeniyle, pratik anten uzunluğu teorik değerden biraz kısadır; bu yüzden 142,5 ve 71,25 gibi düzeltilmiş katsayılar kullanılır.",
  },
];

export const metadata: Metadata = {
  title: "Anten Uzunluğu Hesaplama (Dipol / Vertikal)",
  description:
    "Frekanstan (MHz) yarım dalga dipol ve çeyrek dalga vertikal anten uzunluğunu hesapla; ya da elindeki anten uzunluğundan rezonans frekansını bul.",
  alternates: {
    canonical: "/anten-uzunlugu-hesaplama",
  },
  openGraph: {
    title: "Anten Uzunluğu Hesaplama (Dipol / Vertikal)",
    description: "Frekanstan anten uzunluğu hesapla.",
    url: buildSiteUrl("/anten-uzunlugu-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function AntennaLengthCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Amatör Telsiz Araçları", item: buildSiteUrl("/amator-telsiz-araclari") },
      { "@type": "ListItem", position: 4, name: "Anten Uzunluğu Hesaplama", item: buildSiteUrl("/anten-uzunlugu-hesaplama") },
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
          <Link href="/amator-telsiz-araclari">Amatör Telsiz Araçları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Anten Uzunluğu Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Anten Uzunluğu Hesaplama</h1>
          <p>
            Çalışmak istediğin frekansı (MHz) gir: yarım dalga dipol
            ve çeyrek dalga vertikal anten uzunluklarını hesapla. Ya da
            elindeki dipol uzunluğundan hangi frekansa rezonans
            yaptığını bul.
          </p>
        </header>

        <AntennaLengthCalculator />

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
            Diğer amatör telsiz araçları için{" "}
            <Link href="/amator-telsiz-araclari">Amatör Telsiz Araçları</Link>
            {" "}sayfasına, Hz/kHz/MHz frekans dönüşümleri için{" "}
            <Link href="/kategoriler/frekans">Frekans Dönüşümleri</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Formüller, amatör telsizcilikte yaygın kullanılan pratik
            anten uzunluğu bağıntılarına dayanır. Gerçek performans
            için anten analizörü ile SWR ölçümü önerilir.
          </p>
        </section>
      </div>
    </main>
  );
}
