import type { Metadata } from "next";
import Link from "next/link";
import MolariteCalculator from "../../../components/MolariteCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Molarite nedir?",
    answer:
      "Molarite (M), bir çözeltinin derişimini ifade eden birimdir; çözünenin mol sayısının, çözeltinin litre cinsinden hacmine bölünmesiyle bulunur. Birimi mol/L'dir.",
  },
  {
    question: "Molarite nasıl hesaplanır?",
    answer:
      "Molarite, M = n / V formülüyle hesaplanır. Burada M molarite (mol/L), n çözünenin mol sayısı, V ise çözeltinin litre cinsinden hacmidir.",
  },
  {
    question: "Molarite ile mol sayısı arasındaki fark nedir?",
    answer:
      "Mol sayısı bir maddenin miktarını ifade ederken, molarite bu miktarın belirli bir hacimdeki çözeltide ne kadar yoğun (derişik) olduğunu gösterir. Aynı mol sayısı, farklı hacimlerde farklı molarite verir.",
  },
  {
    question: "Mililitre cinsinden hacimle molarite hesaplanabilir mi?",
    answer:
      "Evet, hesap makinesi hacmi otomatik olarak litreye çevirir. Formülde hacmin litre cinsinden kullanılması gerektiğini unutmamak önemlidir — mililitre değeri 1000'e bölünerek litreye çevrilir.",
  },
];

export const metadata: Metadata = {
  title: "Molarite Hesaplama: Mol/L Derişim Hesaplayıcı",
  description:
    "Mol sayısı ve hacimden molariteyi (mol/L), molarite ve hacimden mol sayısını, molarite ve mol sayısından hacmi anında hesaplayın.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/kimya/molarite-hesaplama",
  },
  openGraph: {
    title: "Molarite Hesaplama: Mol/L Derişim Hesaplayıcı",
    description:
      "Mol sayısı ve hacimden molariteyi (mol/L) anında hesaplayın.",
    url: buildSiteUrl("/bilim-hesaplayicilari/kimya/molarite-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function MolariteHesaplamaPage() {
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
        name: "Molarite Hesaplama",
        item: buildSiteUrl("/bilim-hesaplayicilari/kimya/molarite-hesaplama"),
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
          <span>Molarite Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Molarite Hesaplama</h1>
          <p>
            Mol sayısı ve hacimden molariteyi, molarite ve hacimden mol
            sayısını, ya da molarite ve mol sayısından gereken hacmi hesapla.
          </p>
        </header>

        <div className="unit-page-layout chem-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>Molarite nedir?</h2>
          <p>
            Molarite (M), kimyada bir çözeltinin derişimini ifade eden en
            yaygın kullanılan birimdir. Çözeltide çözünmüş maddenin mol
            sayısının, çözeltinin toplam hacmine (litre cinsinden)
            bölünmesiyle bulunur. Birimi <strong>mol/L</strong>'dir ve
            genellikle büyük M harfiyle veya köşeli parantezle ([ ])
            gösterilir.
          </p>

          <h2>Molarite, mol sayısı ve hacim ilişkisi</h2>
          <p>
            Üç büyüklük arasındaki temel bağıntı{" "}
            <strong>M = n / V</strong> şeklindedir: M molariteyi (mol/L), n
            çözünenin mol sayısını, V ise çözeltinin litre cinsinden hacmini
            ifade eder. Bu bağıntı üç yönde de kullanılabilir — hangi
            büyüklüğü bilmiyorsan diğer ikisinden onu hesaplayabilirsin.
          </p>
          <p>
            Örneğin 0,5 mol NaCl, 500 mL (0,5 L) suda çözüldüğünde,
            çözeltinin molaritesi 0,5 / 0,5 = <strong>1 mol/L</strong> olur.
            Laboratuvar ölçümlerinde hacim genellikle mililitre cinsinden
            ölçüldüğü için, hesap yapılmadan önce litreye çevrilmesi gerekir.
          </p>

          <h2>Molarite neden önemlidir?</h2>
          <p>
            Molarite, titrasyon, seyreltme ve stokiyometri hesaplarının
            temelini oluşturur. Laboratuvarda bir çözelti hazırlarken,
            istenen molaritede kaç gram madde tartılması gerektiğini
            hesaplamak için molar kütle ile birlikte kullanılır — bu
            hesaplama için{" "}
            <Link href="/bilim-hesaplayicilari/kimya/mol-hesaplama">
              Mol Hesaplama
            </Link>{" "}
            aracımızı da kullanabilirsin.
          </p>

          <h2>Molaritenin sıcaklığa bağımlılığı: molalite ile farkı</h2>
          <p>
            Molarite, tanımı gereği çözeltinin <strong>hacmine</strong>{" "}
            dayanır ve hacim sıcaklıkla birlikte genleşip büzüldüğü için,
            aynı çözeltinin molaritesi sıcaklık değiştikçe (çok az da olsa)
            değişir. Bu, hassas analitik çalışmalarda göz ardı edilmemesi
            gereken bir noktadır. Buna karşılık{" "}
            <strong>molalite</strong> (mol/kg çözücü), kütleye dayandığı
            için sıcaklıktan tamamen bağımsızdır — bu nedenle kolligatif
            özellik hesaplarında (kaynama noktası yükselmesi, donma noktası
            alçalması gibi) molarite yerine molalite tercih edilir.
          </p>

          <h2>Zayıf elektrolitlerde "formal" ve "gerçek" derişim ayrımı</h2>
          <p>
            Bir asit veya baz suda tam olarak ayrışmıyorsa (zayıf
            elektrolit), hesaplanan molarite yalnızca çözeltiye kaç mol
            madde eklendiğini gösteren bir "formal derişim"dir; ortamdaki
            gerçek iyon derişimi bundan daha düşük olabilir. Örneğin 0,1
            mol/L asetik asit çözeltisinde gerçek [H⁺] derişimi 0,1 mol/L
            değil, ayrışma sabitine (Ka) bağlı olarak çok daha küçük bir
            değerdir. Bu ayrım, pH hesaplarında molaritenin doğrudan [H⁺]
            ile karıştırılmaması gerektiğini gösterir.
          </p>

          <h2>Molaritenin tarihsel alternatifleri: normalite</h2>
          <p>
            SI birim sistemi standartlaşmadan önce, özellikle asit-baz ve
            redoks titrasyonlarında <strong>normalite</strong> (N,
            eşdeğer-gram/L) birimi yaygın kullanılıyordu; bu birim, bir
            maddenin kaç mol H⁺ veya elektron aktarabildiğini (eşdeğerlik
            faktörünü) doğrudan hesaba katıyordu. IUPAC, normaliteyi
            belirsizliğe açık bulduğu (aynı maddenin farklı tepkimelerde
            farklı eşdeğerlik faktörüne sahip olabilmesi) için artık
            kullanılmamasını, bunun yerine molarite ve açık eşdeğerlik
            faktörünün ayrı ayrı belirtilmesini önerir.
          </p>

          <h2>Gerçek dünyada molarite kullanımı</h2>
          <p>
            Klinik biyokimyada kan glikozu, elektrolit (Na⁺, K⁺, Ca²⁺) ve
            ilaç düzeyleri sıklıkla milimol/litre (mmol/L) cinsinden
            raporlanır. Endüstriyel süreç kontrolünde reaktif derişimlerinin
            hassas biçimde ayarlanması, ürün kalitesini doğrudan etkiler.
            Çevresel su kalitesi standartları da genellikle belirli
            kirleticilerin izin verilen maksimum molar derişimini tanımlar.
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
            Molarite tanımı, Uluslararası Temel ve Uygulamalı Kimya
            Birliği&apos;nin (IUPAC) derişim birimleri standardına dayanır.
          </p>
        </section>
        </div>

        <div className="unit-page-converter">
          <MolariteCalculator />
        </div>
        </div>
      </div>
    </main>
  );
}
