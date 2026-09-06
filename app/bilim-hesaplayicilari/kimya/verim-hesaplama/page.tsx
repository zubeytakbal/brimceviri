import type { Metadata } from "next";
import Link from "next/link";
import YieldCalculator from "../../../components/YieldCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Yüzde verim nedir?",
    answer:
      "Yüzde verim, bir kimyasal tepkimeden gerçekte elde edilen ürün miktarının, stokiyometrik hesaba göre elde edilmesi beklenen teorik miktara oranının yüzde olarak ifadesidir.",
  },
  {
    question: "Yüzde verim nasıl hesaplanır?",
    answer:
      "% verim = (gerçek verim / teorik verim) × 100 formülüyle hesaplanır. Gerçek verim ve teorik verim aynı birimde olmalıdır (ikisi de gram ya da ikisi de mol).",
  },
  {
    question: "Teorik verim nasıl bulunur?",
    answer:
      "Teorik verim, dengelenmiş bir denklemin mol oranları kullanılarak stokiyometrik hesapla bulunur — bu hesap için Stokiyometri Hesaplama aracımızı kullanabilirsin.",
  },
  {
    question: "Neden gerçek verim her zaman teorik verimden azdır?",
    answer:
      "Yan tepkimeler, tamamlanmamış tepkimeler, saflaştırma sırasındaki madde kayıpları ve deneysel hatalar nedeniyle gerçek verim teorik verime hiçbir zaman tam olarak ulaşmaz; %100 verim yalnızca teorik bir üst sınırdır.",
  },
];

export const metadata: Metadata = {
  title: "Verim Hesaplama: Yüzde Verim Hesaplayıcı",
  description:
    "Gerçek ve teorik verimden yüzde verimi, ya da yüzde verim ve bilinen bir değerden diğerini anında hesaplayın.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/kimya/verim-hesaplama",
  },
  openGraph: {
    title: "Verim Hesaplama: Yüzde Verim Hesaplayıcı",
    description: "Gerçek ve teorik verimden yüzde verimi hesaplayın.",
    url: buildSiteUrl("/bilim-hesaplayicilari/kimya/verim-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function VerimHesaplamaPage() {
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
        name: "Verim Hesaplama",
        item: buildSiteUrl("/bilim-hesaplayicilari/kimya/verim-hesaplama"),
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
          <span>Verim Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Verim Hesaplama</h1>
          <p>
            Gerçek ve teorik verimden yüzde verimi, ya da bildiğin iki
            değerden eksik olan üçüncüyü hesapla.
          </p>
        </header>

        <div className="unit-page-layout chem-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>Yüzde verim nedir?</h2>
          <p>
            Yüzde verim, bir kimyasal tepkimenin laboratuvarda ne kadar
            "başarılı" gerçekleştiğini ölçen bir orandır. Stokiyometrik
            hesap, tepkimeye giren reaktanların tamamının ürüne
            dönüştüğünü varsayarak bir <strong>teorik verim</strong>{" "}
            öngörür; ancak gerçek deneylerde bu miktara neredeyse hiçbir
            zaman tam olarak ulaşılmaz. Deneyde tartılan gerçek ürün
            miktarına <strong>gerçek verim</strong> denir ve formül{" "}
            <strong>% verim = (gerçek verim / teorik verim) × 100</strong>{" "}
            şeklindedir.
          </p>

          <h2>Gerçek verim neden her zaman teorik verimden azdır?</h2>
          <p>
            Birkaç neden bir tepkimenin verimini teorik maksimumun altına
            çeker: <strong>yan tepkimeler</strong> (aynı reaktanlardan
            istenmeyen başka ürünlerin de oluşması), <strong>tersinir
            tepkimeler</strong> (tepkimenin tam tamamlanmadan dengeye
            ulaşması), <strong>saflaştırma kayıpları</strong> (süzme,
            kristallendirme gibi işlemler sırasında ürünün bir kısmının
            kaybedilmesi) ve basit <strong>deneysel hatalar</strong>{" "}
            (dökülme, buharlaşma, tartım hassasiyeti). Bu yüzden endüstriyel
            kimyada %90 üzeri verim bile genellikle çok başarılı kabul
            edilir.
          </p>

          <h2>Verim, stokiyometri ile birlikte nasıl kullanılır?</h2>
          <p>
            Verim hesaplaması, stokiyometrik hesaplamanın doğal devamıdır:
            önce dengelenmiş denklemden teorik verim hesaplanır, ardından
            deneyde elde edilen gerçek miktarla karşılaştırılır. Teorik
            verimi hesaplamak için{" "}
            <Link href="/bilim-hesaplayicilari/kimya/stokiyometri-hesaplama">
              Stokiyometri Hesaplama
            </Link>{" "}
            aracımızı kullanabilirsin.
          </p>

          <h2>Endüstriyel kimyada verimin önemi</h2>
          <p>
            İlaç ve kimya endüstrisinde, üretim süreçlerinin verimi
            doğrudan maliyeti ve çevresel etkiyi belirler. Düşük verimli
            bir süreç, aynı ürün miktarı için daha fazla hammadde
            tüketimi, daha fazla atık ve daha yüksek maliyet anlamına
            gelir. Bu yüzden kimya mühendisleri, endüstriyel süreçleri
            tasarlarken katalizörler, sıcaklık/basınç optimizasyonu ve
            tepkime süresi ayarlamaları gibi yöntemlerle verimi artırmaya
            büyük önem verir.
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
            Yüzde verim tanımı, IUPAC&apos;ın stokiyometri ve reaksiyon
            verimliliği standartlarına dayanır.
          </p>
        </section>
        </div>

        <div className="unit-page-converter">
          <YieldCalculator />
        </div>
        </div>
      </div>
    </main>
  );
}
