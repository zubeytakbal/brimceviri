import type { Metadata } from "next";
import Link from "next/link";
import OneRepMaxCalculator from "../components/OneRepMaxCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "1RM (bir tekrar maksimum) nedir?",
    answer:
      "1RM, bir hareketi (bench press, squat, deadlift vb.) doğru teknikle tek seferde kaldırabileceğin en yüksek ağırlıktır. Antrenman programlarında kullanılacak ağırlıklar genelde 1RM'in yüzdesi olarak belirlenir.",
  },
  {
    question: "1RM nasıl hesaplanır?",
    answer:
      "Gerçek 1RM'ini bulmak için tek tekrarla maksimum ağırlığı denemek gerekir; bu risklidir. Bunun yerine, submaksimal bir ağırlıkla (örneğin 5 tekrar) yapılan bir set üzerinden Epley formülüyle (1RM = Ağırlık × (1 + Tekrar/30)) tahmini 1RM hesaplanır.",
  },
  {
    question: "Antrenman yüzdesi tablosu ne işe yarar?",
    answer:
      "Tahmini 1RM'inden yola çıkarak, güç (yüksek % düşük tekrar) veya hipertrofi (düşük % yüksek tekrar) odaklı bir antrenman programı için hangi ağırlığı kullanman gerektiğini gösterir.",
  },
];

export const metadata: Metadata = {
  title: "1RM Hesaplama: Bir Tekrar Maksimum ve Antrenman Yüzdesi",
  description:
    "Kaldırdığın ağırlık ve tekrar sayısından Epley formülüyle tahmini 1RM'ini (bir tekrar maksimum) hesapla; antrenman yüzdesi tablosuyla programına uygun ağırlıkları bul.",
  alternates: {
    canonical: "/1rm-hesaplama",
  },
  openGraph: {
    title: "1RM Hesaplama: Bir Tekrar Maksimum ve Antrenman Yüzdesi",
    description: "Epley formülüyle tahmini 1RM ve antrenman yüzdesi tablosu.",
    url: buildSiteUrl("/1rm-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function OneRepMaxCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Antrenör Araçları", item: buildSiteUrl("/antrenor-araclari") },
      { "@type": "ListItem", position: 4, name: "1RM Hesaplama", item: buildSiteUrl("/1rm-hesaplama") },
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
          <Link href="/antrenor-araclari">Antrenör Araçları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>1RM Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>1RM Hesaplama</h1>
          <p>
            Bir hareketle kaldırdığın ağırlığı ve yaptığın tekrar
            sayısını gir: Epley formülüyle tahmini 1RM&apos;ini ve
            antrenman programına uygun yüzde tablosunu gör.
          </p>
        </header>

        <OneRepMaxCalculator />

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
            Diğer antrenör araçları için{" "}
            <Link href="/antrenor-araclari">Antrenör Araçları</Link>
            {" "}sayfasına, beslenme ve klinik hesaplamalar için{" "}
            <Link href="/diyetisyen-araclari">Diyetisyen Araçları</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Epley formülü, direnç antrenmanında yaygın kullanılan
            tahmini bir modeldir; gerçek 1RM, teknik, yorgunluk ve
            hareket türüne göre değişebilir. Bu araç tıbbi veya
            antrenörlük tavsiyesi yerine geçmez.
          </p>
        </section>
      </div>
    </main>
  );
}
