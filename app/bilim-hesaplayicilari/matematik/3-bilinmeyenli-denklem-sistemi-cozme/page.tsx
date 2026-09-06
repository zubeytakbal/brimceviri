import type { Metadata } from "next";
import Link from "next/link";
import EquationSystemCalculator from "../../../components/EquationSystemCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "3 bilinmeyenli denklem sistemi nedir?",
    answer:
      "Üç farklı bilinmeyeni (örn. x, y ve z) aynı anda sağlayan üç denklemden oluşan bir sistemdir. Sistemi çözmek, üç denklemi de aynı anda doğru yapan (x, y, z) değer üçlüsünü/üçlülerini bulmak demektir.",
  },
  {
    question: "Denklemleri nasıl yazmalıyım?",
    answer:
      "Her denklemi kendi kutusuna, bir '=' işareti içerecek şekilde yaz — örn. x+y+z=6. Çarpma için * (örn. 2*x), üs için ^ kullan. Üç denklemde toplam üç farklı harf (bilinmeyen) kullanmaya dikkat et.",
  },
  {
    question: "Bu araç sadece doğrusal sistemleri mi çözer?",
    answer:
      "Hayır — doğrusal, karesel, logaritmik veya karışık denklem üçlülerini de destekler; sayısal bir arama yöntemiyle çözer, sadece Gauss eliminasyonuyla sınırlı değildir.",
  },
  {
    question: "3 bilinmeyenli bir sistemin hiç çözümü olmayabilir mi?",
    answer:
      "Evet — örneğin birbiriyle çelişen (paralel ama farklı sabitli) düzlemleri temsil eden denklemler taradığımız bölgede gerçek sayılarda ortak bir noktada kesişmeyebilir; bu durumda çözüm bulunamadığı açıkça bildirilir.",
  },
];

export const metadata: Metadata = {
  title: "3 Bilinmeyenli Denklem Sistemi Çözme",
  description:
    "x, y ve z gibi üç bilinmeyenli, doğrusal veya doğrusal olmayan üç denklemden oluşan sistemi adım adım çöz.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/matematik/3-bilinmeyenli-denklem-sistemi-cozme",
  },
  openGraph: {
    title: "3 Bilinmeyenli Denklem Sistemi Çözme",
    description: "Üç bilinmeyenli denklem sistemlerini adım adım çöz.",
    url: buildSiteUrl(
      "/bilim-hesaplayicilari/matematik/3-bilinmeyenli-denklem-sistemi-cozme"
    ),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const examples = [
  {
    label: "x+y+z=6, x-y=1, y-z=1",
    equations: ["x+y+z=6", "x-y=1", "y-z=1"],
  },
  {
    label: "2x+y-z=3, x-y+2z=4, 3x+2y+z=10",
    equations: ["2*x+y-z=3", "x-y+2*z=4", "3*x+2*y+z=10"],
  },
  {
    label: "x+y+z=12, x=2y, y=2z",
    equations: ["x+y+z=12", "x=2*y", "y=2*z"],
  },
];

export default function UcBilinmeyenliDenklemSistemiPage() {
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
        name: "Bilim Hesaplayıcıları",
        item: buildSiteUrl("/bilim-hesaplayicilari"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Matematik",
        item: buildSiteUrl("/bilim-hesaplayicilari/matematik"),
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "3 Bilinmeyenli Denklem Sistemi Çözme",
        item: buildSiteUrl(
          "/bilim-hesaplayicilari/matematik/3-bilinmeyenli-denklem-sistemi-cozme"
        ),
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
          <Link href="/bilim-hesaplayicilari">Bilim Hesaplayıcıları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/bilim-hesaplayicilari/matematik">Matematik</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>3 Bilinmeyenli Denklem Sistemi Çözme</span>
        </nav>

        <header className="all-conversions-header">
          <h1>3 Bilinmeyenli Denklem Sistemi Çözme</h1>
          <p>
            x, y ve z gibi üç bilinmeyenli üç denklemi aynı anda gir, ortak
            çözümü/çözümlerini adım adım bul.
          </p>
        </header>

        <div className="unit-page-layout wide-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>3 bilinmeyenli denklem sistemi nedir?</h2>
          <p>
            Üç bilinmeyenli bir <strong>denklem sistemi</strong>, aynı üç
            değişkeni (genellikle x, y ve z) içeren üç ayrı denklemden
            oluşur. Sistemi <strong>çözmek</strong>, üç denklemi de aynı anda
            doğru yapan (x, y, z) değer üçlüsünü/üçlülerini bulmak demektir.
            Geometrik olarak her doğrusal denklem 3 boyutlu uzayda bir
            düzlemi temsil eder; doğrusal bir sistemin tek çözümü, genellikle
            üç düzlemin kesiştiği tek bir noktadır.
          </p>

          <h2>Klasik çözüm yöntemi: Gauss eliminasyonu</h2>
          <p>
            Okulda doğrusal 3×3 sistemler genelde{" "}
            <strong>Gauss eliminasyonu</strong> (denklemleri sırayla
            birleştirip önce bir bilinmeyeni, sonra bir diğerini eleyerek geriye
            doğru çözme) ile elle çözülür. Bu yöntem sadece doğrusal
            sistemler için işler; bu araç ise karesel, logaritmik veya
            karışık denklem üçlülerini de kapsayacak şekilde sayısal bir
            arama yöntemi kullanır.
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
            Tek bilinmeyenli bir denklemin varsa{" "}
            <Link href="/bilim-hesaplayicilari/matematik/1-bilinmeyenli-denklem-cozme">
              1 Bilinmeyenli Denklem Çözme
            </Link>{" "}
            aracını (ikinci dereceden bir denklem için delta ile{" "}
            <Link href="/bilim-hesaplayicilari/matematik/ikinci-dereceden-denklem-cozme">
              İkinci Dereceden Denklem Çözme
            </Link>{" "}
            aracını), iki bilinmeyenli bir sistemin varsa{" "}
            <Link href="/bilim-hesaplayicilari/matematik/2-bilinmeyenli-denklem-sistemi-cozme">
              2 Bilinmeyenli Denklem Sistemi Çözme
            </Link>{" "}
            aracını kullanabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Gauss eliminasyonu ve doğrusal cebir temelleri standart lise ve
            üniversite matematik müfredatına, sayısal en küçük kareler
            yaklaşımı ise doğrusal olmayan sistemlerin genel çözüm yöntemine
            dayanır.
          </p>
        </section>
        </div>

        <div className="unit-page-converter">
          <EquationSystemCalculator
            variableCount={3}
            defaultEquations={["x+y+z=6", "x-y=1", "y-z=1"]}
            examples={examples}
          />
        </div>
        </div>
      </div>
    </main>
  );
}
