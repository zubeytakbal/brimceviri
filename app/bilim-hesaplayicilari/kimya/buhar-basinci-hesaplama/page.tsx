import type { Metadata } from "next";
import Link from "next/link";
import VaporPressureCalculator from "../../../components/VaporPressureCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Buhar basıncı nedir?",
    answer:
      "Buhar basıncı, kapalı bir kapta sıvı ile buhar fazı arasında denge kurulduğunda, buhar fazının uyguladığı basınçtır. Sıcaklık arttıkça buhar basıncı da artar.",
  },
  {
    question: "Clausius-Clapeyron denklemi nedir?",
    answer:
      "ln(P₂/P₁) = -(ΔHvap/R) × (1/T₂ - 1/T₁) şeklindedir. Bir sıvının iki farklı sıcaklıktaki buhar basınçlarını, buharlaşma entalpisi (ΔHvap) ile ilişkilendirir. Sıcaklıkların mutlaka Kelvin cinsinden olması gerekir.",
  },
  {
    question: "Neden sıcaklık arttıkça buhar basıncı artar?",
    answer:
      "Sıcaklık arttıkça sıvı moleküllerinin ortalama kinetik enerjisi artar, daha fazla molekül sıvı yüzeyinden kaçarak buhar fazına geçebilecek enerjiye ulaşır — bu da buhar basıncını yükseltir.",
  },
  {
    question: "Kaynama noktası ile buhar basıncı arasındaki ilişki nedir?",
    answer:
      "Bir sıvının kaynama noktası, buhar basıncının dış (atmosfer) basıncına eşitlendiği sıcaklıktır. Bu yüzden yükseklerde (düşük atmosfer basıncında) su daha düşük sıcaklıkta kaynar.",
  },
];

export const metadata: Metadata = {
  title: "Buhar Basıncı Hesaplama: Clausius-Clapeyron Hesaplayıcı",
  description:
    "Referans sıcaklık/basınç ve buharlaşma entalpisinden, Clausius-Clapeyron denklemiyle yeni sıcaklıktaki buhar basıncını anında hesaplayın.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/kimya/buhar-basinci-hesaplama",
  },
  openGraph: {
    title: "Buhar Basıncı Hesaplama: Clausius-Clapeyron Hesaplayıcı",
    description: "Clausius-Clapeyron denklemiyle buhar basıncı hesaplayın.",
    url: buildSiteUrl(
      "/bilim-hesaplayicilari/kimya/buhar-basinci-hesaplama"
    ),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function BuharBasinciHesaplamaPage() {
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
        name: "Buhar Basıncı Hesaplama",
        item: buildSiteUrl(
          "/bilim-hesaplayicilari/kimya/buhar-basinci-hesaplama"
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
          <Link href="/bilim-hesaplayicilari/kimya">Kimya</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Buhar Basıncı Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Buhar Basıncı Hesaplama</h1>
          <p>
            Referans sıcaklık/basınç ve buharlaşma entalpisinden, yeni
            sıcaklıktaki buhar basıncını Clausius-Clapeyron denklemiyle
            hesapla.
          </p>
        </header>

        <div className="unit-page-layout chem-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>Buhar basıncı nedir?</h2>
          <p>
            Kapalı bir kapta bulunan bir sıvı, moleküllerinin bir kısmı
            sürekli buharlaşıp bir kısmı da yoğunlaşarak zamanla dinamik
            bir dengeye ulaşır. Bu dengedeki buhar fazının uyguladığı
            basınca <strong>buhar basıncı</strong> denir. Buhar basıncı,
            sıcaklığa güçlü biçimde bağlıdır — sıcaklık arttıkça daha
            fazla molekül buharlaşabilecek enerjiye ulaşır ve buhar basıncı
            yükselir.
          </p>

          <h2>Clausius-Clapeyron denklemi</h2>
          <p>
            Bir sıvının farklı sıcaklıklardaki buhar basınçlarını
            birbirine bağlayan temel denklem{" "}
            <strong>ln(P₂/P₁) = -(ΔHvap/R) × (1/T₂ - 1/T₁)</strong>{" "}
            şeklindedir. Burada P₁ ve P₂ iki farklı sıcaklıktaki buhar
            basınçları, T₁ ve T₂ bu sıcaklıklar (mutlaka Kelvin cinsinden),
            ΔHvap molar buharlaşma entalpisi, R ise ideal gaz sabitidir
            (8,314 J/mol·K). Denklem, Rudolf Clausius ve Benoît Paul Émile
            Clapeyron'un 19. yüzyıl ortasındaki termodinamik
            çalışmalarından türetilmiştir.
          </p>

          <h2>Kaynama noktası ile ilişkisi</h2>
          <p>
            Bir sıvının <strong>kaynama noktası</strong>, buhar basıncının
            tam olarak çevredeki atmosfer basıncına eşitlendiği sıcaklıktır.
            Bu yüzden yüksek rakımlarda (Everest zirvesi gibi, atmosfer
            basıncının çok düşük olduğu yerlerde) su çok daha düşük bir
            sıcaklıkta (yaklaşık 70°C civarında) kaynar — bu da yemek
            pişirmeyi zorlaştırır ve dağcıların basınçlı tencere kullanma
            nedenlerinden biridir.
          </p>

          <h2>Buharlaşma entalpisi (ΔHvap) neyi ifade eder?</h2>
          <p>
            ΔHvap, 1 molce sıvının sabit sıcaklıkta buhar fazına geçmesi
            için gereken enerji miktarıdır — moleküller arası çekim
            kuvvetlerinin ne kadar güçlü olduğunun bir göstergesidir. Güçlü
            hidrojen bağları içeren su (40,7 kJ/mol), zayıf moleküller
            arası kuvvetlere sahip aseton (29,1 kJ/mol) gibi maddelerden
            belirgin biçimde daha yüksek bir ΔHvap değerine sahiptir — bu
            da suyun neden aynı koşullarda daha yavaş buharlaştığını
            açıklar.
          </p>

          <h2>Gerçek dünyada buhar basıncı</h2>
          <p>
            Buhar basıncı hesapları, kimyasal madde depolama güvenliğinden
            (uçucu ve yanıcı sıvıların kapalı kaplarda oluşturacağı basınç
            tahmini) distilasyon süreçlerinin tasarımına, hava tahmininde
            nem ve yoğuşma hesaplarından parfüm ve solvent
            formülasyonlarına kadar geniş bir mühendislik ve endüstri
            alanında kullanılır.
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
            Clausius-Clapeyron denklemi ve buharlaşma entalpisi değerleri,
            standart termodinamik referans tablolarına dayanır.
          </p>
        </section>
        </div>

        <div className="unit-page-converter">
          <VaporPressureCalculator />
        </div>
        </div>
      </div>
    </main>
  );
}
