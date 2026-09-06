import type { Metadata } from "next";
import Link from "next/link";
import AtomicMassCalculator from "../../../components/AtomicMassCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Ortalama atom kütlesi nedir?",
    answer:
      "Ortalama atom kütlesi, bir elementin doğada bulunan tüm izotoplarının kütlelerinin, doğal bolluk yüzdeleriyle ağırlıklandırılmış ortalamasıdır. Periyodik tabloda her elementin altında yazan değer budur.",
  },
  {
    question: "Ortalama atom kütlesi nasıl hesaplanır?",
    answer:
      "Her izotopun kütlesi, o izotopun doğal bolluk oranıyla (yüzde/100) çarpılır; bu çarpımlar toplanarak ağırlıklı ortalama bulunur: Ortalama = Σ(izotop kütlesi × bolluk oranı).",
  },
  {
    question: "İzotop nedir?",
    answer:
      "İzotoplar, aynı elementin farklı nötron sayısına (dolayısıyla farklı kütle numarasına) sahip atomlarıdır. Aynı sayıda proton içerdikleri için kimyasal özellikleri aynıdır, ancak kütleleri farklıdır.",
  },
  {
    question: "Neden atom kütlesi tam sayı değildir?",
    answer:
      "Periyodik tablodaki atom kütleleri neredeyse hiçbir zaman tam sayı değildir, çünkü bunlar birden fazla izotopun ağırlıklı ortalamasıdır. Örneğin klorun atom kütlesi 35,45 u'dur çünkü doğada hem klor-35 hem klor-37 izotopu farklı oranlarda bulunur.",
  },
];

export const metadata: Metadata = {
  title: "Atom Kütlesi Hesaplama: İzotop Ağırlıklı Ortalama Hesaplayıcı",
  description:
    "İzotop kütlelerini ve doğal bolluk yüzdelerini gir, ağırlıklı ortalama alarak elementin periyodik tablodaki ortalama atom kütlesini anında hesapla.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/kimya/atom-kutlesi-hesaplama",
  },
  openGraph: {
    title: "Atom Kütlesi Hesaplama: İzotop Ağırlıklı Ortalama Hesaplayıcı",
    description:
      "İzotop kütle ve bolluk yüzdelerinden ortalama atom kütlesini hesaplayın.",
    url: buildSiteUrl("/bilim-hesaplayicilari/kimya/atom-kutlesi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function AtomKutlesiHesaplamaPage() {
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
        name: "Atom Kütlesi Hesaplama",
        item: buildSiteUrl(
          "/bilim-hesaplayicilari/kimya/atom-kutlesi-hesaplama"
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
          <span>Atom Kütlesi Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Atom Kütlesi Hesaplama</h1>
          <p>
            İzotopların kütlelerini ve doğal bolluk yüzdelerini gir,
            ağırlıklı ortalama atom kütlesini hesapla.
          </p>
        </header>

        <div className="unit-page-layout chem-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>Ortalama atom kütlesi nedir?</h2>
          <p>
            Periyodik tabloda her elementin altında görülen atom kütlesi
            değeri, o elementin tek bir atomunun kütlesi değil, doğada
            bulunan tüm <strong>izotoplarının</strong> kütlelerinin,
            doğal bolluk oranlarıyla ağırlıklandırılmış ortalamasıdır. Bu
            yüzden periyodik tablodaki değerler neredeyse hiçbir zaman tam
            sayı değildir.
          </p>

          <h2>İzotop kavramı ve keşfi</h2>
          <p>
            İzotoplar, aynı sayıda proton (dolayısıyla aynı atom numarası
            ve kimyasal kimlik) ama farklı sayıda nötron içeren atomlardır.
            Kavram, İngiliz kimyager Frederick Soddy tarafından 1913'te
            radyoaktif bozunma serilerini incelerken ortaya atıldı; "izotop"
            adı Yunanca "isos" (eşit) ve "topos" (yer) kelimelerinden
            türetilmiştir çünkü izotoplar periyodik tabloda "aynı yeri"
            paylaşır. Soddy, bu çalışması nedeniyle 1921 Nobel Kimya
            Ödülü'nü kazandı. İzotopların kütle farkını doğrudan ölçen
            kütle spektrometresi ise Francis Aston tarafından geliştirildi
            ve Aston da 1922'de Nobel Kimya Ödülü aldı.
          </p>

          <h2>Ağırlıklı ortalama formülü</h2>
          <p>
            Ortalama atom kütlesi{" "}
            <strong>
              Σ(izotop kütlesi × bolluk oranı)
            </strong>{" "}
            formülüyle hesaplanır; burada bolluk oranı, yüzde değerin
            100'e bölünmüş hâlidir. Örneğin klorun iki doğal izotopu klor-35
            (kütle 34,969 u, bolluk %75,77) ve klor-37'dir (kütle 36,966
            u, bolluk %24,23). Ağırlıklı ortalama: 34,969 × 0,7577 +
            36,966 × 0,2423 ≈ <strong>35,45 u</strong> — tam olarak
            periyodik tabloda görülen değer.
          </p>

          <h2>Neden bazı elementlerin atom kütlesi neredeyse tam sayıdır?</h2>
          <p>
            Flor (18,998 u) veya alüminyum (26,982 u) gibi elementlerin
            atom kütlesi tam sayıya çok yakındır çünkü bu elementlerin
            doğada bilinen tek bir kararlı izotopu vardır (flor için
            yalnızca flor-19). Buna karşılık bor (10,81 u) gibi elementler,
            birbirine yakın oranlarda bulunan birden fazla izotopa sahip
            olduğu için ondalıklı kısmı daha belirgindir.
          </p>

          <h2>Kütle spektrometresi: izotop bolluğunun ölçüm yöntemi</h2>
          <p>
            İzotopların kütleleri ve doğal bolluk oranları, kütle
            spektrometresi adı verilen bir cihazla deneysel olarak ölçülür.
            Bu cihaz, atomları iyonlaştırıp elektrik ve manyetik alanlardan
            geçirerek kütle/yük oranına göre ayırır; her izotopun sinyal
            şiddeti, o izotopun görece bolluğunu verir. Bu teknoloji
            günümüzde yalnızca izotop analizinde değil, ilaç geliştirme,
            adli tıp ve arkeolojik tarihleme (karbon-14 yöntemi) gibi çok
            geniş bir alanda kullanılır.
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
            İzotop kütleleri ve doğal bolluk oranları, IUPAC&apos;ın
            standart atom ağırlıkları tablosuna dayanır.
          </p>
        </section>
        </div>

        <div className="unit-page-converter">
          <AtomicMassCalculator />
        </div>
        </div>
      </div>
    </main>
  );
}
