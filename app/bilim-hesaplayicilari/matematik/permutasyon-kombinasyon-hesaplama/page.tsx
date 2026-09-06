import type { Metadata } from "next";
import Link from "next/link";
import CombinatoricsCalculator from "../../../components/CombinatoricsCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Permütasyon ve kombinasyon arasındaki fark nedir?",
    answer:
      "Permütasyonda (nPr) seçilen elemanların sırası önemlidir (örn. 1., 2., 3. sıradaki koşucular farklı sonuçlar sayılır); kombinasyonda (nCr) sadece hangi elemanların seçildiği önemlidir, sıra önemli değildir (örn. bir gruptan seçilen 3 kişilik komite).",
  },
  {
    question: "nPr ve nCr nasıl hesaplanır?",
    answer:
      "nPr = n! / (n-r)! formülüyle, nCr = n! / (r!×(n-r)!) formülüyle hesaplanır. n toplam eleman sayısı, r seçilecek eleman sayısıdır.",
  },
  {
    question: "Olasılık nasıl hesaplanır?",
    answer:
      "Klasik olasılık, P = (istenen/uygun durum sayısı) / (toplam durum sayısı) formülüyle hesaplanır. Örneğin bir zarda çift sayı gelme olasılığı 3/6 = 0,5 = %50'dir.",
  },
  {
    question: "nCr her zaman nPr'den küçük müdür?",
    answer:
      "Evet (r>1 olduğunda) — çünkü nPr, aynı r elemanın farklı sıralamalarını ayrı ayrı sayarken nCr bunları tek bir seçim olarak sayar: nCr = nPr / r!.",
  },
];

export const metadata: Metadata = {
  title: "Permütasyon, Kombinasyon ve Olasılık Hesaplama",
  description:
    "nPr (permütasyon), nCr (kombinasyon) ve klasik olasılığı adım adım hesapla — n ve r değerlerini gir, sonucu anında gör.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/matematik/permutasyon-kombinasyon-hesaplama",
  },
  openGraph: {
    title: "Permütasyon, Kombinasyon ve Olasılık Hesaplama",
    description: "nPr, nCr ve olasılık hesaplamalarını adım adım çöz.",
    url: buildSiteUrl(
      "/bilim-hesaplayicilari/matematik/permutasyon-kombinasyon-hesaplama"
    ),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function PermutasyonKombinasyonPage() {
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
        name: "Permütasyon, Kombinasyon ve Olasılık Hesaplama",
        item: buildSiteUrl(
          "/bilim-hesaplayicilari/matematik/permutasyon-kombinasyon-hesaplama"
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
          <span>Permütasyon, Kombinasyon ve Olasılık</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Permütasyon, Kombinasyon ve Olasılık Hesaplama</h1>
          <p>
            nPr, nCr ve klasik olasılığı adım adım hesapla — n ve r
            değerlerini gir, sonucu anında gör.
          </p>
        </header>

        <div className="unit-page-layout wide-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>Permütasyon nedir?</h2>
          <p>
            <strong>Permütasyon</strong>, n elemanlı bir kümeden, sıralamanın
            önemli olduğu şekilde r elemanı seçmenin/dizmenin kaç farklı
            yolu olduğunu sayar; nPr (veya P(n,r)) ile gösterilir ve nPr =
            n! / (n-r)! formülüyle hesaplanır. Örneğin 5 kişilik bir yarışta
            ilk 3 sırayı kimlerin alacağını sayarken sıra önemlidir — bu bir
            permütasyon problemidir.
          </p>

          <h2>Kombinasyon nedir?</h2>
          <p>
            <strong>Kombinasyon</strong>, n elemanlı bir kümeden, sıralamanın
            önemli olmadığı şekilde r elemanı seçmenin kaç farklı yolu
            olduğunu sayar; nCr (veya C(n,r), ya da{" "}
            <span style={{ whiteSpace: "nowrap" }}>(n r)</span> ikili
            katsayısı) ile gösterilir ve nCr = n! / (r!×(n-r)!) formülüyle
            hesaplanır. Örneğin 10 kişilik bir gruptan 3 kişilik bir komite
            seçerken sadece kimlerin seçildiği önemlidir, seçim sırası önemli
            değildir — bu bir kombinasyon problemidir.
          </p>

          <h2>nPr mi, nCr mi kullanmalıyım?</h2>
          <p>
            Kendine şu soruyu sor: <strong>seçim sırası bir fark yaratıyor
            mu?</strong> Yaratıyorsa (madalya sıralaması, şifre oluşturma,
            sıralı dizilim gibi) permütasyon; yaratmıyorsa (komite seçimi,
            loto sayıları, iskambil eli gibi) kombinasyon kullanılır. Aynı n
            ve r için nCr, nPr&apos;den her zaman küçük veya eşittir, çünkü nCr =
            nPr / r! — permütasyon, kombinasyonun her bir sonucunu r!
            farklı sırayla tekrar sayar.
          </p>

          <h2>Klasik olasılık nedir?</h2>
          <p>
            <strong>Olasılık</strong>, bir olayın gerçekleşme ihtimalinin
            sayısal ölçüsüdür. Tüm sonuçların eşit ihtimalli olduğu klasik
            (Laplace) olasılıkta P = (istenen/uygun durum sayısı) / (toplam
            durum sayısı) formülü kullanılır — 0 ile 1 arasında bir değer
            alır (0 = imkansız, 1 = kesin). Permütasyon ve kombinasyon,
            genellikle olasılık problemlerinde &quot;toplam durum sayısı&quot; ve
            &quot;istenen durum sayısı&quot;nı bulmak için kullanılır — örneğin bir
            loto çekilişinde kazanma olasılığını hesaplarken önce kombinasyon
            ile toplam olası çekiliş sayısı bulunur.
          </p>

          <h2>Gerçek hayatta nerede kullanılır?</h2>
          <p>
            İskambil ve loto oyunlarında olası el/çekiliş sayısını hesaplama,
            şifre ve PIN kombinasyonu güvenlik analizi, spor turnuvası
            eşleşme senaryoları, istatistik ve olasılık teorisinde örneklem
            sayma, genetik ve biyoinformatikte dizilim analizi permütasyon ve
            kombinasyonun yaygın kullanım alanlarıdır.
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
            Faktöriyel hesaplamak istersen{" "}
            <Link href="/bilim-hesaplayicilari/matematik/faktoriyel-hesaplama">
              Faktöriyel Hesaplama
            </Link>{" "}
            aracına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Permütasyon, kombinasyon ve klasik olasılık tanımları standart
            lise ve AYT matematik müfredatına dayanır.
          </p>
        </section>
        </div>

        <div className="unit-page-converter">
          <CombinatoricsCalculator />
        </div>
        </div>
      </div>
    </main>
  );
}
