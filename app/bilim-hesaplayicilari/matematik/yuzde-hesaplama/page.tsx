import type { Metadata } from "next";
import Link from "next/link";
import PercentageCalculator from "../../../components/PercentageCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Bir sayının yüzdesini nasıl hesaplarım?",
    answer:
      "Y = (P/100) × X formülünü kullan. Örneğin 500'ün %18'ini bulmak için (18/100) × 500 = 90 işlemini yap. Bu araçta yüzde ve sayıyı girip 'Sonuç'u seçmen yeterli.",
  },
  {
    question: "Bir sayı diğerinin yüzde kaçıdır?",
    answer:
      "P = (Y/X) × 100 formülü kullanılır. Örneğin 90, 500'ün yüzde kaçıdır sorusunun cevabı (90/500) × 100 = %18'dir.",
  },
  {
    question: "Yüzde artış/azalış nasıl hesaplanır?",
    answer:
      "Değişim% = ((Yeni − Eski) / Eski) × 100 formülü kullanılır. Sonuç pozitifse artışı, negatifse azalışı gösterir. Örneğin 1200'den 1500'e çıkış, ((1500−1200)/1200) × 100 = %25 artıştır.",
  },
  {
    question: "Yüzde ile virgüllü sayı (ondalık) arasındaki ilişki nedir?",
    answer:
      "Bir yüzdeyi ondalık sayıya çevirmek için 100'e bölersin (örn. %18 = 0,18); ondalık sayıyı yüzdeye çevirmek için 100 ile çarparsın (örn. 0,18 = %18).",
  },
];

export const metadata: Metadata = {
  title: "Yüzde Hesaplama: Adım Adım Çözüm",
  description:
    "Bir sayının yüzdesini, bir sayının diğerinin yüzde kaçı olduğunu veya yüzde artış/azalışını adım adım hesapla.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/matematik/yuzde-hesaplama",
  },
  openGraph: {
    title: "Yüzde Hesaplama: Adım Adım Çözüm",
    description: "Yüzde hesaplama ve yüzde değişim işlemlerini adım adım çöz.",
    url: buildSiteUrl("/bilim-hesaplayicilari/matematik/yuzde-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function YuzdeHesaplamaPage() {
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
        name: "Yüzde Hesaplama",
        item: buildSiteUrl("/bilim-hesaplayicilari/matematik/yuzde-hesaplama"),
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
          <span>Yüzde Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Yüzde Hesaplama</h1>
          <p>
            Bir sayının yüzdesini, bir sayının diğerinin yüzde kaçı olduğunu
            veya yüzde artış/azalışını adım adım hesapla.
          </p>
        </header>

        <div className="unit-page-layout wide-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>Yüzde nedir?</h2>
          <p>
            <strong>Yüzde</strong> (%), bir bütünün yüzde birim (1/100)
            cinsinden ifade edilmiş parçasıdır — %P, P/100 ondalık kesrine
            eşittir. Örneğin %25, 25/100 = 0,25 demektir. Bir X sayısının
            %P&apos;si, Y = (P/100) × X formülüyle hesaplanır.
          </p>

          <h2>Üç temel yüzde sorusu</h2>
          <p>
            Yüzde problemlerinin neredeyse tamamı aynı formülün (Y = (P/100)
            × X) üç farklı bilinmeyeninden birini çözmeye indirgenir:
            &quot;X&apos;in %P&apos;si kaçtır?&quot; (Y bilinmiyor),
            &quot;Y, X&apos;in yüzde kaçıdır?&quot; (P bilinmiyor),
            &quot;Y, X&apos;in %P&apos;siyse X kaçtır?&quot; (X bilinmiyor).
            Bu araçta hangisini bilmediğini seçip diğer ikisini girmen
            yeterli.
          </p>

          <h2>Yüzde artış/azalış (yüzde değişim)</h2>
          <p>
            Bir değerin zamanla ne kadar değiştiğini yüzde olarak ifade etmek
            için farklı bir formül kullanılır: Değişim% = ((Yeni − Eski) /
            Eski) × 100. Sonuç pozitifse bu bir <strong>artışı</strong>,
            negatifse bir <strong>azalışı</strong> gösterir. Zam oranı,
            indirim oranı, enflasyon oranı gibi hesaplamalar bu formülle
            yapılır — dikkat: yüzde puandaki değişim (örn. %10&apos;dan
            %15&apos;e çıkış &quot;5 puan&quot;dır) ile yüzde değişim
            (bu örnekte %50&apos;lik bir artış) birbirinden farklıdır.
          </p>

          <h2>Yaygın kullanım örnekleri</h2>
          <p>
            İndirim hesaplama (bir ürünün %X indirimli fiyatı), KDV/vergi
            ekleme, zam/enflasyon oranı hesaplama, bir sınavda doğru
            cevapların yüzdesi, bir bütçenin ne kadarının harcandığı gibi
            günlük hayattaki sayısız hesaplama, yukarıdaki iki temel
            formülün bir uygulamasıdır.
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
            Oran ve orantı problemlerini çözmek istersen{" "}
            <Link href="/bilim-hesaplayicilari/matematik/oran-oranti-hesaplama">
              Oran-Orantı Hesaplama
            </Link>{" "}
            aracına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Yüzde tanımı ve hesaplama formülleri standart ortaokul/lise
            matematik müfredatına dayanır.
          </p>
        </section>
        </div>

        <div className="unit-page-converter">
          <PercentageCalculator />
        </div>
        </div>
      </div>
    </main>
  );
}
