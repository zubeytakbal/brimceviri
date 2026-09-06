import type { Metadata } from "next";
import Link from "next/link";
import LetterGradeCalculator from "../components/LetterGradeCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "100'lük not, harf notuna nasıl çevrilir?",
    answer:
      "Türkiye'de birçok üniversitede yaygın kullanılan bir tabloya göre 90-100 arası AA, 85-89 arası BA, 80-84 arası BB şeklinde devam eder. Ancak kesin eşik değerleri kurumdan kuruma değişebilir.",
  },
  {
    question: "Bu tablo her okul/üniversite için geçerli mi?",
    answer:
      "Hayır. Bu tablo yaygın kullanılan genel bir referanstır; senin okulunun veya üniversitenin kendi yönetmeliğinde farklı eşik değerleri olabilir. Kesin sonuç için kurumunun resmi kaynağına bakmalısın.",
  },
];

export const metadata: Metadata = {
  title: "Harf Notu Hesaplama (100'lük - 4'lük Sistem)",
  description:
    "100'lük puanı, yaygın kullanılan bir referans tabloya göre harf notuna (AA, BA, BB...) ve 4'lük sisteme çevir.",
  alternates: {
    canonical: "/harf-notu-hesaplama",
  },
  openGraph: {
    title: "Harf Notu Hesaplama (100'lük - 4'lük Sistem)",
    description: "100'lük puandan harf notu ve 4'lük sistem karşılığını hesapla.",
    url: buildSiteUrl("/harf-notu-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function LetterGradeCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Öğretmen Araçları", item: buildSiteUrl("/ogretmen-araclari") },
      { "@type": "ListItem", position: 4, name: "Harf Notu Hesaplama", item: buildSiteUrl("/harf-notu-hesaplama") },
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
          <Link href="/ogretmen-araclari">Öğretmen Araçları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Harf Notu Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Harf Notu Hesaplama</h1>
          <p>
            100&apos;lük puanı gir: yaygın kullanılan bir referans
            tabloya göre harf notunu ve 4&apos;lük sistem karşılığını
            gör.
          </p>
        </header>

        <LetterGradeCalculator />

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
            Diğer öğretmen araçları için{" "}
            <Link href="/ogretmen-araclari">Öğretmen Araçları</Link>
            {" "}sayfasına, ağırlıklı not ortalaması hesaplama için{" "}
            <Link href="/bilim-hesaplayicilari/matematik/ortalama-hesaplama">Ortalama Hesaplama</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Tablo, Türkiye&apos;de üniversitelerde yaygın kullanılan
            genel bir 100&apos;lük-4&apos;lük dönüşüm referansına
            dayanır; resmi bir standart değildir.
          </p>
        </section>
      </div>
    </main>
  );
}
