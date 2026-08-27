import type { Metadata } from "next";
import Link from "next/link";
import FuelConsumptionCalculator from "../components/FuelConsumptionCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "km/lt ve lt/100km arasında nasıl çeviri yapılır?",
    answer:
      "İkisi ters orantılıdır: lt/100km = 100 / (km/lt). Örneğin aracın 1 litreyle 14 km gidiyorsa, 100 km'de 100/14 ≈ 7,14 litre yakar.",
  },
  {
    question: "Ortalama bir binek otomobil kaç lt/100km yakar?",
    answer:
      "Benzinli/dizel binek otomobillerde şehir içi kullanımda 6-9 lt/100km, şehir dışı/otoyolda 4-6 lt/100km aralığı tipiktir; araç, motor hacmi ve sürüş tarzına göre değişir.",
  },
  {
    question: "mpg (ABD) ile mpg (İngiltere) neden farklı?",
    answer:
      "ABD galonu (3,785 litre) ile İngiliz galonu (4,546 litre) farklı hacimlerdir; bu yüzden aynı km/lt değeri için ABD mpg değeri İngiltere mpg değerinden düşük çıkar.",
  },
];

export const metadata: Metadata = {
  title: "Yakıt Tüketimi Hesaplama: km/lt, lt/100km, mpg Çevirici",
  description:
    "km/lt, lt/100km ve mpg arasında yakıt tüketimini çevir; yolculuk mesafesi ve yakıt fiyatına göre toplam maliyeti hesapla.",
  alternates: {
    canonical: "/yakit-tuketimi-hesaplama",
  },
  openGraph: {
    title: "Yakıt Tüketimi Hesaplama: km/lt, lt/100km, mpg Çevirici",
    description:
      "Yakıt tüketimini km/lt, lt/100km ve mpg arasında çevirin; yolculuk maliyetini hesaplayın.",
    url: buildSiteUrl("/yakit-tuketimi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function FuelConsumptionCalculatorPage() {
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
        name: "Yakıt Tüketimi Hesaplama",
        item: buildSiteUrl("/yakit-tuketimi-hesaplama"),
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
          <span>Yakıt Tüketimi Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Yakıt Tüketimi Hesaplama</h1>
          <p>
            km/lt veya lt/100km değerlerinden birini gir, aracın yakıt
            tüketimini tüm birimlerde (km/lt, lt/100km, mpg) gör; ardından
            yolculuk mesafesi ve güncel yakıt fiyatıyla toplam maliyeti
            hesapla.
          </p>
        </header>

        <FuelConsumptionCalculator />

        <section className="category-article-content">
          <h2>km/lt ve lt/100km nasıl hesaplanır?</h2>
          <p>
            İki birim ters orantılıdır, basit bir çarpım/bölüm değildir:{" "}
            <strong>lt/100km = 100 / (km/lt)</strong> ve{" "}
            <strong>km/lt = 100 / (lt/100km)</strong>. Örneğin aracın 1
            litre yakıtla 14 km gidiyorsa (14 km/lt), 100 km&apos;de
            100 ÷ 14 ≈ 7,14 litre yakar demektir.
          </p>

          <h2>mpg (mil/galon) nereden geliyor?</h2>
          <p>
            mpg, ABD ve İngiltere&apos;de kullanılan bir yakıt tüketimi
            birimidir ve km/lt&apos;nin tersine, değer ne kadar yüksekse
            araç o kadar az yakıt tüketir (km/lt ile aynı yönde, lt/100km
            ile ters yönde çalışır). ABD galonu (3,785 L) ile İngiliz
            galonu (4,546 L) farklı olduğu için aynı aracın ABD mpg ve
            İngiltere mpg değerleri birbirinden farklı çıkar.
          </p>

          <h2>Yolculuk maliyeti nasıl hesaplanıyor?</h2>
          <p>
            Önce girdiğin lt/100km değeriyle yolculuk mesafesi orantılanarak
            gereken yakıt miktarı bulunur:{" "}
            <strong>Gereken Yakıt = (Mesafe / 100) × lt/100km</strong>.
            Ardından bu miktar litre başına yakıt fiyatıyla çarpılarak
            toplam maliyet elde edilir.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}
        </section>
      </div>
    </main>
  );
}
