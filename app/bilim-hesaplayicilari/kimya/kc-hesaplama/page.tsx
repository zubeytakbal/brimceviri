import type { Metadata } from "next";
import Link from "next/link";
import EquilibriumConstantCalculator from "../../../components/EquilibriumConstantCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Kc (denge sabiti) nedir?",
    answer:
      "Kc, tersinir bir kimyasal tepkimenin dengeye ulaştığı andaki ürün ve reaktan derişimleri arasındaki sabit oranı ifade eder. Belirli bir sıcaklıkta her tepkime için sabit bir değerdir.",
  },
  {
    question: "Kc nasıl hesaplanır?",
    answer:
      "aA + bB ⇌ cC + dD şeklindeki bir denge tepkimesi için Kc = [C]^c[D]^d / [A]^a[B]^b formülüyle hesaplanır. Yalnızca gaz ve çözeltideki türlerin derişimleri denkleme dahil edilir; saf katı ve sıvılar ihmal edilir.",
  },
  {
    question: "Kc büyük veya küçük olması ne anlama gelir?",
    answer:
      "Kc >> 1 ise dengede ürünler baskındır (tepkime büyük ölçüde ileri yönde ilerlemiştir). Kc << 1 ise dengede reaktanlar baskındır (tepkime pek ilerlememiştir). Kc ≈ 1 ise reaktan ve ürün derişimleri birbirine yakındır.",
  },
  {
    question: "Kc sıcaklıkla değişir mi?",
    answer:
      "Evet. Kc yalnızca sıcaklığa bağlıdır — derişim, basınç veya katalizör değişiklikleri Kc değerini değiştirmez, yalnızca dengeye ulaşma hızını veya denge konumunu etkiler.",
  },
];

export const metadata: Metadata = {
  title: "Kc Hesaplama: Denge Sabiti Hesaplayıcı",
  description:
    "Reaktan ve ürünlerin denge derişimlerinden ve denklem katsayılarından Kc denge sabitini anında hesaplayın.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/kimya/kc-hesaplama",
  },
  openGraph: {
    title: "Kc Hesaplama: Denge Sabiti Hesaplayıcı",
    description: "Denge derişimlerinden Kc'yi hesaplayın.",
    url: buildSiteUrl("/bilim-hesaplayicilari/kimya/kc-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function KcHesaplamaPage() {
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
        name: "Kc Hesaplama",
        item: buildSiteUrl("/bilim-hesaplayicilari/kimya/kc-hesaplama"),
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
          <span>Kc Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Kc Hesaplama</h1>
          <p>
            Reaktan ve ürünlerin denge derişimlerinden ve denklem
            katsayılarından denge sabitini (Kc) hesapla.
          </p>
        </header>

        <div className="unit-page-layout chem-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>Denge sabiti (Kc) nedir?</h2>
          <p>
            Tersinir bir kimyasal tepkime, ileri ve geri yöndeki tepkime
            hızları eşitlendiğinde <strong>dinamik dengeye</strong> ulaşır
            — bu noktada derişimler artık gözle görülür biçimde değişmez,
            ama tepkime moleküler düzeyde her iki yönde de devam eder.{" "}
            <strong>aA + bB ⇌ cC + dD</strong> şeklindeki bir tepkime için
            denge sabiti <strong>Kc = [C]ᶜ[D]ᵈ / [A]ᵃ[B]ᵇ</strong>{" "}
            formülüyle tanımlanır; burada köşeli parantez mol/L cinsinden
            denge derişimini ifade eder.
          </p>

          <h2>Kütle etkisi yasası</h2>
          <p>
            Bu bağıntı, 1864'te Norveçli bilim insanları Cato Guldberg ve
            Peter Waage tarafından ortaya konan{" "}
            <strong>kütle etkisi yasası</strong>na (law of mass action)
            dayanır. Yasa, bir tepkimenin hızının, tepkiyen maddelerin
            derişimlerinin çarpımıyla orantılı olduğunu belirtir; bu
            ilkeden yola çıkılarak denge durumundaki derişimler arasındaki
            sabit oran matematiksel olarak türetilir.
          </p>

          <h2>Kc değerinin büyüklüğü ne anlatır?</h2>
          <p>
            Kc değeri, bir tepkimenin dengede "ne kadar ileri gittiğinin"
            doğrudan bir göstergesidir. Kc değeri çok büyükse (örneğin
            10⁶'dan büyük), dengede neredeyse tüm reaktanlar ürüne
            dönüşmüştür. Kc değeri çok küçükse (örneğin 10⁻⁶'dan küçük),
            tepkime dengede pratikte hiç ilerlememiş, reaktanlar baskın
            kalmıştır. Kc'nin 1'e yakın olduğu durumlarda ise dengede
            hem reaktan hem ürün belirgin miktarlarda bulunur.
          </p>

          <h2>Saf katı ve sıvılar neden denklemde yer almaz?</h2>
          <p>
            Kc ifadesinde yalnızca gaz hâlindeki ve çözeltideki türlerin
            derişimleri kullanılır; saf katı ve saf sıvıların "derişimi"
            sabit kabul edildiği için (kendi yoğunluklarına eşittir ve
            tepkime sırasında değişmez) bu terimler matematiksel olarak
            Kc ifadesine dahil edilmez, sanki değerleri "1" imiş gibi
            davranılır. Bu, CaCO₃(k) ⇌ CaO(k) + CO₂(g) gibi tepkimelerde
            Kc = [CO₂] gibi sadeleşmiş bir ifadeyle sonuçlanır.
          </p>

          <h2>Le Chatelier ilkesiyle ilişkisi</h2>
          <p>
            Kc, sabit bir sıcaklıkta değişmez; ancak bir sistem dengeden
            uzaklaştırıldığında (derişim, basınç veya sıcaklık değişikliği
            ile), Le Chatelier ilkesine göre sistem yeni bir denge
            konumuna doğru kayar — bu yeni konumda derişimler farklıdır,
            ama Kc oranı (sıcaklık sabitse) aynı kalır. Bu, endüstriyel
            kimyada verimi artırmak için denge koşullarının nasıl
            optimize edileceğini anlamanın temelini oluşturur (örneğin
            Haber-Bosch amonyak sentezinde yüksek basınç kullanılması).
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
            Denge sabiti tanımı, kütle etkisi yasasına ve IUPAC&apos;ın
            kimyasal denge standartlarına dayanır.
          </p>
        </section>
        </div>

        <div className="unit-page-converter">
          <EquilibriumConstantCalculator />
        </div>
        </div>
      </div>
    </main>
  );
}
