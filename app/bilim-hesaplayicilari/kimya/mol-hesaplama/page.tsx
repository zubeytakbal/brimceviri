import type { Metadata } from "next";
import Link from "next/link";
import MolCalculator from "../../../components/MolCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Mol nedir?",
    answer:
      "Mol, kimyada madde miktarını ifade eden SI temel birimidir. 1 mol, tam olarak 6,02214076 × 10²³ tane parçacık (atom, molekül, iyon vb.) içerir — bu sayıya Avogadro sayısı denir.",
  },
  {
    question: "Mol sayısı nasıl hesaplanır?",
    answer:
      "Mol sayısı, kütlenin molar kütleye bölünmesiyle bulunur: n = m / M. Burada n mol sayısı, m gram cinsinden kütle, M ise g/mol cinsinden molar kütledir.",
  },
  {
    question: "Molar kütle nedir, nasıl bulunur?",
    answer:
      "Molar kütle, bir maddenin 1 molünün gram cinsinden kütlesidir. Periyodik tablodaki atom kütleleri toplanarak (bileşikler için) veya doğrudan okunarak (elementler için) bulunur — örneğin suyun (H₂O) molar kütlesi 2×1,008 + 16,00 = 18,02 g/mol'dür.",
  },
  {
    question: "Mol sayısından parçacık sayısı nasıl bulunur?",
    answer:
      "Mol sayısı, Avogadro sayısı (6,02214076 × 10²³) ile çarpılarak parçacık sayısına çevrilir: N = n × Nₐ.",
  },
];

export const metadata: Metadata = {
  title: "Mol Hesaplama: Kütleden Mol Sayısına, Mol Sayısından Kütleye",
  description:
    "Kütle ve molar kütleden mol sayısını, mol sayısından kütleyi ve parçacık sayısını anında hesaplayın. Hazır madde ön ayarlarıyla (su, NaCl, glikoz vb.) hızlı kullanım.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/kimya/mol-hesaplama",
  },
  openGraph: {
    title: "Mol Hesaplama: Kütleden Mol Sayısına, Mol Sayısından Kütleye",
    description:
      "Kütle ve molar kütleden mol sayısını, mol sayısından kütleyi hesaplayın.",
    url: buildSiteUrl("/bilim-hesaplayicilari/kimya/mol-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function MolHesaplamaPage() {
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
        name: "Mol Hesaplama",
        item: buildSiteUrl("/bilim-hesaplayicilari/kimya/mol-hesaplama"),
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
          <span>Mol Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Mol Hesaplama</h1>
          <p>
            Kütle ve molar kütleden mol sayısını, ya da mol sayısından
            kütleyi hesapla; sonuçta parçacık sayısını da gör. Hazır madde
            ön ayarlarıyla (su, NaCl, glikoz vb.) hızlıca dene.
          </p>
        </header>

        <div className="unit-page-layout chem-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>Mol nedir?</h2>
          <p>
            Mol, Uluslararası Birim Sistemi&apos;nde (SI) madde miktarını
            ifade eden temel birimdir. 1 mol, tam olarak{" "}
            <strong>6,02214076 × 10²³</strong> tane parçacık (atom, molekül,
            iyon veya başka bir birim) içerir. Bu sabit sayıya{" "}
            <strong>Avogadro sayısı</strong> denir ve kimyada mikroskobik
            parçacık dünyasıyla gram cinsinden ölçülebilir kütleler
            arasındaki köprüyü kurar.
          </p>

          <h2>Mol sayısı, kütle ve molar kütle ilişkisi</h2>
          <p>
            Üç büyüklük arasındaki temel bağıntı <strong>n = m / M</strong>{" "}
            şeklindedir: n mol sayısını, m gram cinsinden kütleyi, M ise
            g/mol cinsinden molar kütleyi ifade eder. Molar kütle, bir
            maddenin periyodik tablodaki atom kütlelerinin toplamına
            eşittir — örneğin su (H₂O) için 2 × 1,008 (hidrojen) + 16,00
            (oksijen) = 18,02 g/mol.
          </p>
          <p>
            Bu bağıntı iki yönde de kullanılabilir: elindeki kütleden kaç
            mol olduğunu bulabilir, ya da istediğin mol sayısı için kaç
            gram madde tartman gerektiğini hesaplayabilirsin — laboratuvar
            ve sınav sorularında en sık karşılaşılan işlem budur.
          </p>

          <h2>Mol sayısından parçacık sayısına geçiş</h2>
          <p>
            Bir mol sayısını gerçek parçacık sayısına çevirmek için
            Avogadro sayısıyla çarpma yapılır: <strong>N = n × Nₐ</strong>.
            Örneğin 2 mol suda 2 × 6,02214076 × 10²³ ≈ 1,204 × 10²⁴ su
            molekülü bulunur. Bu sayılar o kadar büyüktür ki günlük hayatta
            karşılaşılan hiçbir sayıyla kıyaslanamaz — bir avuç tuzda bile
            trilyonlarca kez trilyonlarca iyon vardır.
          </p>

          <h2>Avogadro sayısının tarihi: bir hipotezden SI tanımına</h2>
          <p>
            İtalyan bilim insanı Amedeo Avogadro, 1811'de eşit hacimdeki
            gazların (aynı sıcaklık ve basınçta) eşit sayıda parçacık
            içerdiğini öne sürdü — ancak bu sayıyı kendisi hiçbir zaman
            hesaplamadı ve "mol" kavramını da tanımlamadı. Sayının ilk
            gerçek nicel tahmini, 1865'te Avusturyalı fizikçi Josef
            Loschmidt tarafından gazların kinetik teorisi kullanılarak
            yapıldı.
          </p>
          <p>
            "Avogadro sayısı" adı, 20. yüzyıl başında Fransız fizikçi Jean
            Perrin'in Brown hareketi üzerine yaptığı deneysel çalışmalarla
            atom teorisini kesin biçimde kanıtlamasının ardından, Avogadro'nun
            anısına önerildi (Perrin bu çalışmasıyla 1926 Nobel Fizik
            Ödülü'nü kazandı). "Mol" teriminin kendisi ise Alman kimyager
            Wilhelm Ostwald tarafından 1900'lerin başında, Almanca "Molekül"
            kelimesinden türetilerek kullanıma sokuldu.
          </p>
          <p>
            2019'da Uluslararası Birimler Sistemi'nin (SI) temel
            büyüklüklerinin yeniden tanımlanması kapsamında, Avogadro sabiti
            artık deneysel ölçüme değil, tam olarak sabitlenmiş bir sayısal
            değere (6,02214076 × 10²³ mol⁻¹) dayanır — bu, mol biriminin
            fiziksel bir referans nesneye (eskiden karbon-12'nin 12
            gramına) değil, evrensel bir sabite bağlı olduğu anlamına gelir.
          </p>

          <h2>Molün sayma birimi olarak doğası</h2>
          <p>
            Mol, kavramsal olarak "düzine" veya "gros" gibi bir sayma
            birimidir — yalnızca astronomik büyüklükte bir sayıyı ifade
            eder. Bir maddenin molar kütlesinin gram cinsinden sayısal
            olarak atom kütlesine (u, birleşik atom kütle birimi) eşit
            çıkmasının nedeni, atom kütle biriminin tam olarak bu ilişkiyi
            sağlayacak şekilde tanımlanmış olmasıdır: 1 u, karbon-12
            atomunun kütlesinin tam olarak 1/12'sidir ve Avogadro sabiti bu
            tanımla matematiksel olarak örtüşür.
          </p>
          <p>
            Standart sıcaklık ve basınçta (0°C, 1 atm) ideal bir gazın 1
            molü 22,4 litre hacim kaplar — bu değer "molar hacim" olarak
            bilinir ve gaz stokiyometrisi hesaplarında sıkça kullanılır.
            IUPAC'ın 1982'de standart koşulları 100 kPa olarak
            güncellemesiyle bu değer 22,7 L/mol'e revize edilmiştir; bu
            yüzden hangi standart tanımın kullanıldığına dikkat etmek
            gerekir.
          </p>

          <h2>Mol kavramının gerçek dünyadaki yeri</h2>
          <p>
            Mol kavramı, laboratuvar dışında da geniş bir etki alanına
            sahiptir. Atmosferdeki karbon dioksit derişimi "ppm" (milyonda
            parça) cinsinden raporlanırken aslında mol oranı kullanılır.
            İlaç dozajlarının etken madde miktarları, endüstriyel kimyasal
            üretiminin reaktör ölçeklendirmeleri ve beslenme biliminde
            vitamin/mineral alım önerileri (bazıları mikromol cinsinden
            ifade edilir) doğrudan mol hesaplarına dayanır.
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
            Avogadro sabiti ve mol biriminin tanımı, Uluslararası Birimler
            Sistemi&apos;nin (SI) 2019 revizyonundaki kesin tanımına
            dayanır.
          </p>
        </section>
        </div>

        <div className="unit-page-converter">
          <MolCalculator />
        </div>
        </div>
      </div>
    </main>
  );
}
