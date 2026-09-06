import type { Metadata } from "next";
import Link from "next/link";
import PpmCalculator from "../../../components/PpmCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "ppm nedir?",
    answer:
      "ppm (milyonda parça), çok küçük derişimleri ifade etmek için kullanılan bir birimdir. Çözünen maddenin kütlesinin, çözeltinin toplam kütlesine oranının bir milyon ile çarpılmasıyla bulunur.",
  },
  {
    question: "ppm nasıl hesaplanır?",
    answer:
      "ppm = (çözünen kütlesi / çözelti kütlesi) × 10⁶ formülüyle hesaplanır. Su bazlı seyreltik çözeltilerde 1 ppm yaklaşık olarak 1 mg/L'ye eşdeğerdir.",
  },
  {
    question: "ppm ile kütlece yüzde arasındaki fark nedir?",
    answer:
      "İkisi de aynı orana dayanır, tek fark ölçek çarpanıdır: kütlece yüzde 100 ile, ppm ise 1.000.000 ile çarpılır. 1 ppm = %0,0001'dir. ppm, kütlece yüzdenin çok küçük değerler için pratik hâlidir.",
  },
  {
    question: "ppm nerelerde kullanılır?",
    answer:
      "ppm, içme suyu kalite standartlarında (klor, kurşun, nitrat gibi kirleticilerin izin verilen üst sınırları), atmosferdeki gaz derişimlerinde (karbon dioksit ppm cinsinden raporlanır) ve gıda güvenliği düzenlemelerinde (katkı maddesi üst sınırları) yaygın kullanılır.",
  },
];

export const metadata: Metadata = {
  title: "ppm Hesaplama: Milyonda Parça Derişim Hesaplayıcı",
  description:
    "Çözünen ve çözücü kütlesinden ppm değerini, ya da ppm ve bilinen bir kütleden diğerini anında hesaplayın.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/kimya/ppm-hesaplama",
  },
  openGraph: {
    title: "ppm Hesaplama: Milyonda Parça Derişim Hesaplayıcı",
    description: "Çözünen ve çözücü kütlesinden ppm değerini hesaplayın.",
    url: buildSiteUrl("/bilim-hesaplayicilari/kimya/ppm-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function PpmHesaplamaPage() {
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
        name: "Kimya",
        item: buildSiteUrl("/bilim-hesaplayicilari/kimya"),
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "ppm Hesaplama",
        item: buildSiteUrl("/bilim-hesaplayicilari/kimya/ppm-hesaplama"),
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
          <Link href="/bilim-hesaplayicilari/kimya">Kimya</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>ppm Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>ppm Hesaplama</h1>
          <p>
            Çözünen ve çözücü kütlesinden ppm değerini, ya da bildiğin iki
            değerden eksik olan üçüncüyü hesapla.
          </p>
        </header>

        <div className="unit-page-layout chem-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>ppm nedir?</h2>
          <p>
            ppm (parts per million, milyonda parça), aşırı düşük
            derişimleri anlaşılır sayılarla ifade etmek için kullanılan bir
            birimdir. Kütlece yüzde ile aynı orana dayanır — tek fark, 100
            yerine 1.000.000 ile çarpılmasıdır:{" "}
            <strong>ppm = (çözünen / çözelti) × 10⁶</strong>. Bu, %0,0001
            gibi okunması zor bir sayı yerine "1 ppm" gibi daha sezgisel
            bir değer kullanmayı mümkün kılar.
          </p>

          <h2>Su bazlı çözeltilerde pratik bir kısayol</h2>
          <p>
            Suyun yoğunluğu 1 g/mL'ye çok yakın olduğu için, seyreltik
            sulu çözeltilerde 1 ppm yaklaşık olarak 1 miligram çözünen
            madde / 1 litre su anlamına gelir. Bu yaklaşım, çevre
            mühendisliğinde ve su analizi laboratuvarlarında ppm'i doğrudan
            mg/L olarak okumayı mümkün kılan yaygın bir pratik kısayoldur.
          </p>

          <h2>ppm'in çevre ve halk sağlığındaki rolü</h2>
          <p>
            İçme suyu standartları, kirletici madde derişimlerini genellikle
            ppm cinsinden tanımlar — örneğin Dünya Sağlık Örgütü, içme
            suyunda kurşun derişiminin 0,01 ppm'i (10 ppb) geçmemesini
            önerir. Atmosferdeki karbon dioksit derişimi de ppm cinsinden
            izlenir; sanayi devrimi öncesinde yaklaşık 280 ppm olan bu
            değer, günümüzde 420 ppm'in üzerine çıkmıştır ve iklim
            değişikliği tartışmalarının merkezinde yer alır.
          </p>

          <h2>ppb ve ppt: daha da küçük derişimler</h2>
          <p>
            ppm'den daha küçük derişimler için <strong>ppb</strong> (parts
            per billion, milyarda parça, ×10⁹) ve <strong>ppt</strong>{" "}
            (parts per trillion, trilyonda parça, ×10¹²) birimleri
            kullanılır. Her birim, bir öncekinden 1000 kat daha küçük
            derişimleri ifade eder — 1 ppm = 1000 ppb = 1.000.000 ppt.
            Ağır metal kirliliği veya iz miktardaki toksik maddeler gibi
            son derece düşük derişimli ölçümlerde bu birimler tercih
            edilir.
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
            ppm tanımı, IUPAC&apos;ın derişim birimleri standardına
            dayanır.
          </p>
        </section>
        </div>

        <div className="unit-page-converter">
          <PpmCalculator />
        </div>
        </div>
      </div>
    </main>
  );
}
