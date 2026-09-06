import type { Metadata } from "next";
import Link from "next/link";
import MeldCalculator from "../components/MeldCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "MELD skoru ne için kullanılır?",
    answer:
      "MELD (Model for End-Stage Liver Disease), kronik karaciğer hastalığının ciddiyetini bilirubin, INR ve kreatinin değerlerinden hesaplayan, karaciğer nakli bekleme listesinde hasta önceliklendirmesi için kullanılan uluslararası standart bir skordur.",
  },
  {
    question: "MELD skoru neden 6 ile 40 arasında sınırlı?",
    answer:
      "Standart MELD formülü, çok düşük veya çok yüksek laboratuvar değerlerinin skoru anlamsız şekilde bozmasını önlemek için 6-40 aralığına sınırlandırılır; ayrıca diyalizdeki hastalarda kreatinin otomatik olarak 4,0 kabul edilir.",
  },
];

export const metadata: Metadata = {
  title: "MELD Skoru Hesaplama (Karaciğer Hastalığı)",
  description:
    "Bilirubin, INR ve kreatinin değerlerinden MELD skorunu hesapla; karaciğer hastalığının ciddiyetini değerlendir.",
  alternates: { canonical: "/meld-skoru-hesaplama" },
  openGraph: {
    title: "MELD Skoru Hesaplama (Karaciğer Hastalığı)",
    description: "MELD skorunu hesaplayın.",
    url: buildSiteUrl("/meld-skoru-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function MeldPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "MELD Skoru Hesaplama", item: buildSiteUrl("/meld-skoru-hesaplama") },
    ],
  };

  return (
    <main className="all-conversions-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>MELD Skoru Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>MELD Skoru Hesaplama</h1>
          <p>
            Bilirubin, INR ve kreatinin değerlerini gir: MELD skorunu
            ve karaciğer hastalığının ciddiyetini anında hesapla.
          </p>
        </header>

        <MeldCalculator />

        <section className="category-article-content">
          <h2>MELD Formülü</h2>
          <p>
            MELD = 3.78×ln(bilirubin mg/dL) + 11.2×ln(INR) +
            9.57×ln(kreatinin mg/dL) + 6.43. Her değer en az 1,0 kabul
            edilir; kreatinin 4,0 ile sınırlandırılır ve diyalizdeki
            hastalarda otomatik olarak 4,0 kullanılır. Sonuç 6-40
            aralığına yuvarlanır.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>MELD skoru ne için kullanılır?</strong>
            <br />
            MELD, kronik karaciğer hastalığının ciddiyetini bilirubin,
            INR ve kreatinin değerlerinden hesaplayan, karaciğer nakli
            bekleme listesinde hasta önceliklendirmesi için kullanılan
            uluslararası standart bir skordur.
          </p>
          <p>
            <strong>MELD skoru neden 6 ile 40 arasında sınırlı?</strong>
            <br />
            Standart MELD formülü, çok düşük veya çok yüksek
            laboratuvar değerlerinin skoru anlamsız şekilde
            bozmasını önlemek için 6-40 aralığına sınırlandırılır;
            diyalizdeki hastalarda kreatinin otomatik olarak 4,0
            kabul edilir.
          </p>

          <h2>İlgili araçlar</h2>
          <p>
            Diğer doktor ve hemşire araçları için{" "}
            <Link href="/doktor-hemsire-araclari">Doktor ve Hemşire Araçları</Link>{" "}
            sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Skor, Kamath PS ve ark. (2001) tarafından geliştirilmiş
            ve UNOS/OPTN karaciğer nakli önceliklendirme sisteminde
            kullanılmaktadır. Bu araç tıbbi tavsiye yerine geçmez;
            klinik karar için bir hekime danışılmalıdır.
          </p>
        </section>
      </div>
    </main>
  );
}
