import type { Metadata } from "next";
import Link from "next/link";
import DilutionCalculator from "../../../components/DilutionCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Seyreltme formülü nedir?",
    answer:
      "Seyreltme, C₁V₁ = C₂V₂ bağıntısıyla hesaplanır. C₁ ve V₁ stok (derişik) çözeltinin derişimi ve hacmini, C₂ ve V₂ ise seyreltme sonrası çözeltinin derişimi ve hacmini ifade eder.",
  },
  {
    question: "Neden C₁V₁ = C₂V₂ geçerlidir?",
    answer:
      "Seyreltme sırasında çözücü (genellikle su) eklenir ama çözünen madde miktarı (mol sayısı) değişmez. Mol sayısı derişim × hacim olduğundan, seyreltme öncesi ve sonrası mol sayısı eşit kalır: C₁V₁ = n = C₂V₂.",
  },
  {
    question: "Stok çözeltiden ne kadar almam gerektiğini nasıl bulurum?",
    answer:
      "İstediğin son derişim (C₂) ve son hacmi (V₂) biliyorsan, stok çözeltiden alman gereken hacim V₁ = (C₂ × V₂) / C₁ formülüyle bulunur.",
  },
  {
    question: "Hacim birimleri farklı olursa ne olur?",
    answer:
      "C₁V₁ = C₂V₂ formülünde V₁ ve V₂'nin aynı birimde olması gerekir (ikisi de mL ya da ikisi de L). Hesap makinesi bu dönüşümü otomatik yapar.",
  },
];

export const metadata: Metadata = {
  title: "Seyreltme Hesaplama: C₁V₁ = C₂V₂ Hesaplayıcı",
  description:
    "Stok çözelti derişimi, hacmi ve hedef derişim veya hacimden eksik değeri C₁V₁ = C₂V₂ bağıntısıyla anında hesaplayın.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/kimya/seyreltme-hesaplama",
  },
  openGraph: {
    title: "Seyreltme Hesaplama: C₁V₁ = C₂V₂ Hesaplayıcı",
    description: "C₁V₁ = C₂V₂ bağıntısıyla seyreltme hesaplaması yapın.",
    url: buildSiteUrl("/bilim-hesaplayicilari/kimya/seyreltme-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function SeyreltmeHesaplamaPage() {
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
        name: "Seyreltme Hesaplama",
        item: buildSiteUrl("/bilim-hesaplayicilari/kimya/seyreltme-hesaplama"),
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
          <span>Seyreltme Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Seyreltme Hesaplama</h1>
          <p>
            Stok çözelti derişimi ve hacminden, ya da hedef derişim ve
            hacimden eksik değeri C₁V₁ = C₂V₂ bağıntısıyla hesapla.
          </p>
        </header>

        <div className="unit-page-layout chem-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>Seyreltme nedir?</h2>
          <p>
            Seyreltme, derişik (stok) bir çözeltiye çözücü (genellikle su)
            eklenerek daha düşük derişimli bir çözelti hazırlama işlemidir.
            Laboratuvarda, yüksek derişimli stok çözeltiler saklanır ve
            ihtiyaç duyulduğunda seyreltilerek istenen derişime getirilir.
          </p>

          <h2>C₁V₁ = C₂V₂ bağıntısının mantığı</h2>
          <p>
            Seyreltme sırasında yalnızca çözücü eklenir; çözünen maddenin
            toplam mol sayısı değişmez. Derişim × hacim, mol sayısına eşit
            olduğundan (n = C × V), seyreltme öncesi ve sonrası mol sayısı
            eşitlenir: <strong>C₁V₁ = C₂V₂</strong>. Burada C₁ ve V₁ stok
            çözeltinin derişim ve hacmini, C₂ ve V₂ ise seyreltme sonrası
            çözeltinin derişim ve hacmini ifade eder.
          </p>
          <p>
            Örneğin 2 mol/L'lik bir stok çözeltiden 100 mL alınıp su ile
            400 mL'ye tamamlandığında, son derişim C₂ = (2 × 100) / 400 ={" "}
            <strong>0,5 mol/L</strong> olur.
          </p>

          <h2>Seyreltme kaç kat yapılmış olur?</h2>
          <p>
            Seyreltme faktörü, V₂ / V₁ (ya da eşdeğer olarak C₁ / C₂)
            oranıyla bulunur. Yukarıdaki örnekte 400 / 100 = 4 kat
            seyreltme yapılmıştır — derişim de buna uygun olarak 4'e
            bölünmüştür (2 mol/L'den 0,5 mol/L'ye).
          </p>

          <h2>Seri seyreltme: mikrobiyoloji ve immünolojinin temel tekniği</h2>
          <p>
            Tek adımlı seyreltmenin ötesinde, "seri seyreltme" adı verilen
            ve genellikle 1:10'luk katlarla ardışık olarak uygulanan bir
            teknik, mikrobiyoloji ve immünolojide standart bir yöntemdir.
            19. yüzyıl sonunda Alman bakteriyolog Robert Koch, bakteri
            kültürlerini sayılabilir yoğunluğa indirmek için bu tür ardışık
            seyreltmeleri kullandı — bu yöntem, bulaşıcı hastalıkların
            etken mikroorganizmalarının izole edilip tanımlanmasında kritik
            rol oynadı ve modern mikrobiyoloji laboratuvarlarında hâlâ
            (koloni sayımı, antikor titresi belirleme gibi işlemlerde)
            temel bir teknik olarak kullanılmaya devam ediyor.
          </p>

          <h2>Seyreltmenin fiziksel bir sınırı var mıdır?</h2>
          <p>
            C₁V₁ = C₂V₂ bağıntısı matematiksel olarak sürekli bir fonksiyon
            gibi görünse de, gerçekte madde miktarı ayrık (kesikli) parçacık
            sayılarından oluşur. Bir çözelti yeterince seyreltilirse, teorik
            hesaplanan derişimde artık tek bir çözünen molekülü bile
            kalmayabilir — bu sınır, Avogadro sayısının (yaklaşık 6×10²³)
            sonluluğundan kaynaklanır. Bu fiziksel gerçek, örneğin
            homeopatik ürünlerde iddia edilen aşırı yüksek seyreltme
            oranlarının (bazı durumlarda 10⁻⁶⁰ mertebesinde) kimyasal
            olarak anlamsız olduğunu gösteren, bilim camiasında sıkça
            atıfta bulunulan bir argümandır.
          </p>

          <h2>Gerçek dünyada seri ve tekli seyreltme kullanımı</h2>
          <p>
            Moleküler biyolojide DNA ve RNA örnekleri, PCR (polimeraz
            zincir reaksiyonu) öncesinde belirli derişimlere seyreltilir.
            İlaç endüstrisinde, stok ilaç çözeltilerinden hasta ağırlığına
            veya yaşına göre ayarlanmış dozlar hazırlanır. Çevre
            laboratuvarlarında, bir ölçüm cihazının doğrusal ölçüm
            aralığına uyacak biçimde numunelerin seyreltilmesi ("standart
            eğri" hazırlama) rutin bir işlemdir.
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
            Seyreltme bağıntısı, madde miktarının (mol) korunumu ilkesine
            ve IUPAC&apos;ın derişim tanımlarına dayanır.
          </p>
        </section>
        </div>

        <div className="unit-page-converter">
          <DilutionCalculator />
        </div>
        </div>
      </div>
    </main>
  );
}
