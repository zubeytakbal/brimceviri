import type { Metadata } from "next";
import Link from "next/link";
import PregnancyCalculator from "../components/PregnancyCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Tahmini doğum tarihi kesin midir?",
    answer:
      "Hayır — bu, istatistiksel bir ortalamadır (SAT + 280 gün). Gerçek doğum tarihi, düzensiz adet döngüsü, ultrason ölçümleri gibi faktörlere göre birkaç gün ile birkaç hafta arasında farklılık gösterebilir. Kesin takip için doktor kontrolü esastır.",
  },
  {
    question: "Adet döngüm düzensizse bu hesap doğru olur mu?",
    answer:
      "Düzensiz döngülerde SAT bazlı hesap daha az güvenilir olur; bu durumda doktorun yapacağı ultrason bazlı tarihlendirme daha doğru sonuç verir.",
  },
];

export const metadata: Metadata = {
  title: "Gebelik Haftası Hesaplama: Kaçıncı Haftadayım?",
  description:
    "Son adet tarihini gir: kaçıncı haftada ve hangi trimesterde olduğunu, tahmini doğum tarihini ve doğuma kalan gün sayısını anında hesapla.",
  alternates: {
    canonical: "/gebelik-haftasi-hesaplama",
  },
  openGraph: {
    title: "Gebelik Haftası Hesaplama: Kaçıncı Haftadayım?",
    description:
      "Son adet tarihinden gebelik haftasını ve tahmini doğum tarihini hesaplayın.",
    url: buildSiteUrl("/gebelik-haftasi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function PregnancyCalculatorPage() {
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
        name: "Gebelik Haftası Hesaplama",
        item: buildSiteUrl("/gebelik-haftasi-hesaplama"),
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
          <span>Gebelik Haftası Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Gebelik Haftası Hesaplama</h1>
          <p>
            Son adet tarihinin ilk gününü gir: kaçıncı haftada ve hangi
            trimesterde olduğunu, tahmini doğum tarihini ve doğuma kalan
            gün sayısını anında gör.
          </p>
        </header>

        <PregnancyCalculator />

        <section className="category-article-content">
          <h2>Gebelik haftası neden son adet tarihinden hesaplanır?</h2>
          <p>
            Döllenmenin gerçekleştiği tam tarih genelde bilinmediği için,
            hekimlikte standart uygulama gebeliği son adet tarihinin
            (SAT) ilk gününden itibaren saymaktır. Bu yönteme göre
            gebelik toplam 280 gün (40 hafta) sürer — döllenme genelde
            SAT&apos;tan yaklaşık 2 hafta sonra gerçekleştiği için, hesaplanan
            &quot;gebelik haftası&quot; ile gerçek embriyonik yaş arasında
            yaklaşık 2 haftalık bir fark vardır. Bu, hata değil, tıbbi
            standart tanımın kendisidir.
          </p>

          <h2>Trimesterler nasıl ayrılır?</h2>
          <p>
            Gebelik üç trimestere bölünür: <strong>1. trimester</strong>{" "}
            0-13. haftalar arası, <strong>2. trimester</strong> 13-27.
            haftalar arası ve <strong>3. trimester</strong> 27. haftadan
            doğuma kadar olan dönemdir.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>Tahmini doğum tarihi kesin midir?</strong>
            <br />
            Hayır — bu, istatistiksel bir ortalamadır (SAT + 280 gün).
            Gerçek doğum tarihi, düzensiz adet döngüsü, ultrason
            ölçümleri gibi faktörlere göre birkaç gün ile birkaç hafta
            arasında farklılık gösterebilir. Kesin takip için doktor
            kontrolü esastır.
          </p>
          <p>
            <strong>Adet döngüm düzensizse bu hesap doğru olur mu?</strong>
            <br />
            Düzensiz döngülerde SAT bazlı hesap daha az güvenilir olur;
            bu durumda doktorun yapacağı ultrason bazlı tarihlendirme
            daha doğru sonuç verir.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Hesaplama yöntemi (SAT + 280 gün / 40 hafta, trimester
            sınırları), kadın doğum pratiğinde yaygın kullanılan
            standart gebelik tarihlendirme kurallarına dayanır. Bu araç
            bilgilendirme amaçlıdır, tıbbi tavsiye yerine geçmez.
          </p>
        </section>
      </div>
    </main>
  );
}
