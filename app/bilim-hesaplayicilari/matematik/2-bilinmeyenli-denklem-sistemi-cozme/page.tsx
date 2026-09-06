import type { Metadata } from "next";
import Link from "next/link";
import EquationSystemCalculator from "../../../components/EquationSystemCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "2 bilinmeyenli denklem sistemi nedir?",
    answer:
      "İki farklı bilinmeyeni (örn. x ve y) aynı anda sağlayan iki denklemden oluşan bir sistemdir. Sistemi çözmek, her iki denklemi de aynı anda doğru yapan (x, y) değer çiftini/çiftlerini bulmak demektir.",
  },
  {
    question: "Denklemleri nasıl yazmalıyım?",
    answer:
      "Her denklemi kendi kutusuna, bir '=' işareti içerecek şekilde yaz — örn. x+y=10 ve x-y=4. Çarpma için * (örn. 2*x), üs için ^ (örn. x^2) kullan. Bilinmeyenler otomatik tanınır, sadece iki denklemde toplam iki farklı harf kullanmaya dikkat et.",
  },
  {
    question: "Sistemin birden fazla çözümü olabilir mi?",
    answer:
      "Evet. Örneğin bir doğru bir çemberi iki farklı noktada kesebilir — bu durumda sistemin iki farklı gerçek çözümü vardır ve ikisi de gösterilir.",
  },
  {
    question: "Sistem nasıl çözülüyor, cebirsel bir yöntem mi kullanılıyor?",
    answer:
      "Hayır — doğrusal, karesel, logaritmik, karışık her türlü denklem çiftini destekleyebilmek için sayısal bir arama yöntemi kullanılır: F(x,y) = (1. denklemin farkı)² + (2. denklemin farkı)² tanımlanır (bu her zaman sıfır veya daha büyüktür ve tam olarak ortak çözümde sıfır olur), arama bölgesine yayılan başlangıç noktalarından bu ifadenin en yakın kökü sayısal olarak bulunur.",
  },
];

export const metadata: Metadata = {
  title: "2 Bilinmeyenli Denklem Sistemi Çözme",
  description:
    "x ve y gibi iki bilinmeyenli, doğrusal veya doğrusal olmayan iki denklemden oluşan sistemi adım adım çöz.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/matematik/2-bilinmeyenli-denklem-sistemi-cozme",
  },
  openGraph: {
    title: "2 Bilinmeyenli Denklem Sistemi Çözme",
    description: "İki bilinmeyenli denklem sistemlerini adım adım çöz.",
    url: buildSiteUrl(
      "/bilim-hesaplayicilari/matematik/2-bilinmeyenli-denklem-sistemi-cozme"
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
  { label: "x+y=10, x-y=4", equations: ["x+y=10", "x-y=4"] },
  { label: "2x+3y=12, x-y=1", equations: ["2*x+3*y=12", "x-y=1"] },
  { label: "x²+y²=25, x=3", equations: ["x^2+y^2=25", "x=3"] },
  { label: "y=x², y=x+2", equations: ["y=x^2", "y=x+2"] },
];

export default function IkiBilinmeyenliDenklemSistemiPage() {
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
        name: "2 Bilinmeyenli Denklem Sistemi Çözme",
        item: buildSiteUrl(
          "/bilim-hesaplayicilari/matematik/2-bilinmeyenli-denklem-sistemi-cozme"
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
          <span>2 Bilinmeyenli Denklem Sistemi Çözme</span>
        </nav>

        <header className="all-conversions-header">
          <h1>2 Bilinmeyenli Denklem Sistemi Çözme</h1>
          <p>
            x ve y gibi iki bilinmeyenli iki denklemi aynı anda gir, ortak
            çözümü/çözümlerini adım adım bul.
          </p>
        </header>

        <div className="unit-page-layout wide-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>2 bilinmeyenli denklem sistemi nedir?</h2>
          <p>
            İki bilinmeyenli bir <strong>denklem sistemi</strong>, aynı iki
            değişkeni (genellikle x ve y) içeren iki ayrı denklemden oluşur.
            Sistemi <strong>çözmek</strong>, her iki denklemi de aynı anda
            doğru yapan (x, y) değer çiftini/çiftlerini bulmak demektir.
            Geometrik olarak, her denklem bir eğriyi (doğru, parabol, çember
            vb.) temsil eder; çözümler bu eğrilerin kesiştiği noktalardır.
          </p>

          <h2>Yaygın çözüm yöntemleri</h2>
          <p>
            Doğrusal sistemler için okulda genelde <strong>yerine koyma</strong>{" "}
            (bir denklemden bir değişkeni yalnız bırakıp diğerine yerine
            koyma) veya <strong>yok etme</strong> (denklemleri uygun
            katsayılarla çarpıp toplayarak bir değişkeni elemek) yöntemleri
            öğretilir. Ancak bu yöntemler karesel, logaritmik veya karışık
            denklemlere kolay genellenmez — bu araç, her türlü denklem
            çiftini destekleyebilmek için sayısal bir arama yöntemi kullanır
            ve bulduğu adımları gösterir.
          </p>

          <h2>Kaç çözüm olabilir?</h2>
          <p>
            İki doğrunun kesişimi gibi çoğu sistemin tek bir çözümü vardır,
            ama bir doğru ile bir çember gibi bir doğrusal olmayan çift
            birden fazla noktada kesişebilir (0, 1 veya 2 çözüm) — bu araç
            taradığı bölgede bulduğu tüm farklı gerçek çözümleri listeler.
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
            aracını), üç bilinmeyenli bir sistemin varsa{" "}
            <Link href="/bilim-hesaplayicilari/matematik/3-bilinmeyenli-denklem-sistemi-cozme">
              3 Bilinmeyenli Denklem Sistemi Çözme
            </Link>{" "}
            aracını kullanabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Yerine koyma ve yok etme yöntemleri standart lise matematik
            müfredatına, sayısal en küçük kareler yaklaşımı ise doğrusal
            olmayan sistemlerin genel çözüm yöntemine dayanır.
          </p>
        </section>
        </div>

        <div className="unit-page-converter">
          <EquationSystemCalculator
            variableCount={2}
            defaultEquations={["x+y=10", "x-y=4"]}
            examples={examples}
          />
        </div>
        </div>
      </div>
    </main>
  );
}
