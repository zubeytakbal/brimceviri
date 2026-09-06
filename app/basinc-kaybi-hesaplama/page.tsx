import type { Metadata } from "next";
import Link from "next/link";
import PressureLossCalculator from "../components/PressureLossCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Basınç kaybı (yük kaybı) nasıl hesaplanır?",
    answer:
      "Basınçlı su hatlarında sürtünme kaynaklı basınç kaybı Hazen-Williams formülüyle hesaplanır: hf = 10,67×L×Q^1,852 / (C^1,852×D^4,87). L boru uzunluğu, Q debi, D çap, C ise boru malzemesine bağlı pürüzlülük katsayısıdır.",
  },
  {
    question: "Hazen-Williams C katsayısı nedir?",
    answer:
      "C, borunun iç yüzey pürüzlülüğünü temsil eden, malzemeye göre değişen bir sabittir. Pürüzsüz malzemeler (PVC, bakır) yüksek C değerine, paslı/eski çelik borular düşük C değerine sahiptir.",
  },
];

export const metadata: Metadata = {
  title: "Basınç Kaybı Hesaplama (Hazen-Williams)",
  description:
    "Boru uzunluğu, çapı, debi ve malzeme katsayısından Hazen-Williams formülüyle basınçlı hatlardaki yük/basınç kaybını hesapla.",
  alternates: { canonical: "/basinc-kaybi-hesaplama" },
  openGraph: {
    title: "Basınç Kaybı Hesaplama (Hazen-Williams)",
    description: "Basınçlı hatlardaki yük/basınç kaybını hesaplayın.",
    url: buildSiteUrl("/basinc-kaybi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function PressureLossPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Basınç Kaybı Hesaplama", item: buildSiteUrl("/basinc-kaybi-hesaplama") },
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
          <span>Basınç Kaybı Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Basınç Kaybı Hesaplama (Hazen-Williams)</h1>
          <p>
            Boru uzunluğu, çapı, debi ve malzeme katsayısını gir:
            hattaki sürtünme kaynaklı basınç kaybını anında hesapla.
          </p>
        </header>

        <PressureLossCalculator />

        <section className="category-article-content">
          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>Basınç kaybı (yük kaybı) nasıl hesaplanır?</strong>
            <br />
            Basınçlı su hatlarında sürtünme kaynaklı basınç kaybı
            Hazen-Williams formülüyle hesaplanır: hf =
            10,67×L×Q^1,852 / (C^1,852×D^4,87).
          </p>
          <p>
            <strong>Hazen-Williams C katsayısı nedir?</strong>
            <br />
            C, borunun iç yüzey pürüzlülüğünü temsil eden, malzemeye
            göre değişen bir sabittir. Pürüzsüz malzemeler (PVC,
            bakır) yüksek C değerine, paslı/eski çelik borular düşük
            C değerine sahiptir.
          </p>

          <h2>İlgili araçlar</h2>
          <p>
            Boru çapı, debi ve akış hızı için{" "}
            <Link href="/boru-capi-hesaplama">Boru Çapı Hesaplama</Link>,
            diğer tesisatçı araçları için{" "}
            <Link href="/tesisatci-araclari">Tesisatçı Araçları</Link>{" "}
            sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Hazen-Williams formülü, 1902&apos;den beri basınçlı su
            hatlarında yaygın kullanılan ampirik bir mühendislik
            formülüdür ve türbülanslı su akışı için geçerlidir; gaz
            veya yüksek viskoziteli sıvılar için kullanılmaz.
          </p>
        </section>
      </div>
    </main>
  );
}
