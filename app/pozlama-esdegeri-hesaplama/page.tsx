import type { Metadata } from "next";
import Link from "next/link";
import ExposureCalculator from "../components/ExposureCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Pozlama üçgeni (exposure triangle) nedir?",
    answer:
      "Pozlama üçgeni, bir fotoğrafın parlaklığını belirleyen üç ayarı ifade eder: ISO (ışık duyarlılığı), diyafram (f-sayısı, ışık miktarı) ve enstantane hızı (deklanşörün açık kalma süresi). Üçünden birini değiştirdiğinde, aynı parlaklığı korumak için diğer ikisinden birini de değiştirmen gerekir.",
  },
  {
    question: "Eşdeğer pozlama nasıl hesaplanır?",
    answer:
      "Parlaklık, ISO × Enstantane Süresi / Diyafram² oranıyla orantılıdır. Bu araç, mevcut ayarlarınla aynı parlaklığı koruyacak şekilde, yeni ayarlardan girmediğin üçüncü değeri bu bağıntıyı kullanarak hesaplar.",
  },
  {
    question: "Diyaframı bir stop açarsam enstantaneyi nasıl değiştirmeliyim?",
    answer:
      "Diyaframı bir tam stop açmak (örneğin f/8'den f/5,6'ya) sensöre gelen ışığı 2 katına çıkarır. Aynı parlaklığı korumak için enstantaneyi bir stop hızlandırman (örneğin 1/125'ten 1/250'ye) gerekir.",
  },
];

export const metadata: Metadata = {
  title: "Pozlama Eşdeğeri Hesaplama (Exposure Triangle)",
  description:
    "ISO, diyafram ve enstantane hızından ikisini değiştir, aynı pozlamayı koruyacak üçüncü değeri hesapla; pozlama üçgenini pratik bir araçla öğren.",
  alternates: {
    canonical: "/pozlama-esdegeri-hesaplama",
  },
  openGraph: {
    title: "Pozlama Eşdeğeri Hesaplama (Exposure Triangle)",
    description: "ISO, diyafram ve enstantane arasında eşdeğer pozlama hesapla.",
    url: buildSiteUrl("/pozlama-esdegeri-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function ExposureCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Fotoğrafçı Araçları", item: buildSiteUrl("/fotografci-araclari") },
      { "@type": "ListItem", position: 4, name: "Pozlama Eşdeğeri Hesaplama", item: buildSiteUrl("/pozlama-esdegeri-hesaplama") },
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
          <Link href="/fotografci-araclari">Fotoğrafçı Araçları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Pozlama Eşdeğeri Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Pozlama Eşdeğeri Hesaplama</h1>
          <p>
            Mevcut ISO, diyafram ve enstantane ayarlarını gir. Yeni
            ayarlardan herhangi ikisini doldur, aynı pozlamayı
            koruyacak üçüncü değeri anında hesapla.
          </p>
        </header>

        <ExposureCalculator />

        <section className="category-article-content">
          <h2>Pozlama üçgeni nasıl çalışır?</h2>
          <p>
            Sensöre ulaşan ışık miktarı, <strong>ISO × Enstantane
            Süresi / Diyafram²</strong> oranıyla orantılıdır. Bu üçlüden
            birini değiştirdiğinde, aynı parlaklığı korumak için diğer
            ikisinden en az birini de değiştirmen gerekir — bu araç o
            hesabı senin için yapar.
          </p>

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
            Diğer fotoğrafçı araçları için{" "}
            <Link href="/fotografci-araclari">Fotoğrafçı Araçları</Link>
            {" "}sayfasına, sensör formatına göre odak uzaklığı eşdeğeri için{" "}
            <Link href="/odak-uzakligi-esdegeri-hesaplama">Odak Uzaklığı Eşdeğeri Hesaplama</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Formül, fotoğrafçılıkta standart kabul edilen pozlama
            değeri (exposure value) bağıntısına dayanır. Ekstrem
            uzun pozlamalarda görülen reciprocity failure gibi
            film/sensöre özgü sapmalar bu hesaba dahil değildir.
          </p>
        </section>
      </div>
    </main>
  );
}
