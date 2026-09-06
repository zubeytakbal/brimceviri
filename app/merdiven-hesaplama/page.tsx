import type { Metadata } from "next";
import Link from "next/link";
import StairCalculator from "../components/StairCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Merdiven basamak sayısı nasıl hesaplanır?",
    answer:
      "İki kat arasındaki toplam yükseklik, istenen rıht (basamak) yüksekliğine bölünüp en yakın tam sayıya yuvarlanır. Örneğin 280 cm yükseklikte 17,5 cm'lik rıht hedeflersen 16 basamak çıkar; toplam yükseklik bu sayıya tekrar bölünerek her basamağın gerçek yüksekliği eşitlenir.",
  },
  {
    question: "Blondel formülü nedir?",
    answer:
      "Blondel formülü, rahat ve güvenli bir merdiven adımı için kullanılan klasik bir mimarlık kuralıdır: 2 × rıht yüksekliği + basamak derinliği ≈ 63 cm. Bu formül, kısa adımlarla dik bir merdiven ya da uzun adımlarla düz bir merdiven arasında dengeli, yürüyüş adımına yakın bir oran verir.",
  },
  {
    question: "Rıht ve basamak derinliği için ideal ölçüler nedir?",
    answer:
      "Konut merdivenlerinde rıht yüksekliği genellikle 16-20 cm arasında (ideali ~17-18 cm), basamak derinliği ise 24-33 cm arasında (ideali ~28-30 cm) kabul edilir. Bu aralıkların dışına çıkan merdivenler ya çok dik ve yorucu ya da gereksiz uzun olur.",
  },
  {
    question: "Bu hesaplama projeme yeterli mi, yoksa mimar/mühendise mi danışmalıyım?",
    answer:
      "Bu araç, ön çalışma ve genel bir fikir edinmek için Blondel formülüne dayanan pratik bir tahmin sunar. Ancak yapı ruhsatı, statik hesap, korkuluk yüksekliği ve yönetmelik uyumluluğu gibi konular için mutlaka bir mimar veya inşaat mühendisiyle çalışman gerekir.",
  },
];

export const metadata: Metadata = {
  title: "Merdiven Hesaplama: Basamak Sayısı, Rıht ve Basamak Derinliği",
  description:
    "Toplam yükseklik ve istenen rıht yüksekliğine göre merdiven basamak sayısını, rıht yüksekliğini ve Blondel formülüyle basamak derinliğini hesapla.",
  alternates: {
    canonical: "/merdiven-hesaplama",
  },
  openGraph: {
    title: "Merdiven Hesaplama: Basamak Sayısı, Rıht ve Basamak Derinliği",
    description:
      "Yüksekliği gir, güvenli ve konforlu merdiven ölçülerini anında hesapla.",
    url: buildSiteUrl("/merdiven-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function StairCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: buildSiteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Merdiven Hesaplama",
        item: buildSiteUrl("/merdiven-hesaplama"),
      },
    ],
  };

  return (
    <main className="all-conversions-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(buildFaqSchema(faqItems)),
        }}
      />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Merdiven Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Merdiven Hesaplama</h1>
          <p>
            Toplam yükseklik ve istenen rıht yüksekliğine göre basamak
            sayısını, gerçek rıht yüksekliğini ve Blondel formülüyle
            basamak derinliğini anında hesapla.
          </p>
        </header>

        <StairCalculator />

        <section className="category-article-content">
          <h2>Basamak sayısı ve rıht yüksekliği nasıl belirlenir?</h2>
          <p>
            İki kat arasındaki toplam yükseklik (kat yüksekliği), istediğin
            rıht yüksekliğine bölünüp en yakın tam sayıya yuvarlanarak
            basamak sayısı bulunur. Ardından toplam yükseklik bu basamak
            sayısına tekrar bölünerek her basamağın gerçek, eşit yüksekliği
            hesaplanır — böylece merdivenin her adımı aynı yükseklikte
            olur.
          </p>

          <h2>Basamak derinliği neden Blondel formülüyle hesaplanıyor?</h2>
          <p>
            Basamak derinliği, rıht yüksekliğiyle ters orantılı bir dengeye
            sahip olmalıdır: rıht yüksekse basamak derinliğinin az olması,
            rıht alçaksa basamak derinliğinin fazla olması gerekir —
            aksi halde merdiven ya çok dik ya da gereksiz uzun olur.
            Mimarlıkta yaygın kullanılan Blondel formülü (2 × rıht +
            basamak derinliği ≈ 63 cm), bu dengeyi doğal bir yürüyüş
            adımına yakın tutarak hesaplar.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>Kaynaklar</h2>
          <p>
            Blondel formülü ve rıht/basamak derinliği için konforlu ölçü
            aralıkları, mimarlık ve iç mekan tasarımı literatüründe yaygın
            kabul gören standart merdiven tasarım kurallarına dayanır.
          </p>
        </section>
      </div>
    </main>
  );
}
