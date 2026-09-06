import type { Metadata } from "next";
import Link from "next/link";
import SofaCalculator from "../components/SofaCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "SOFA skoru ne için kullanılır?",
    answer:
      "SOFA (Sequential Organ Failure Assessment), yoğun bakımda 6 organ sisteminin (solunum, koagülasyon, karaciğer, kardiyovasküler, santral sinir sistemi, böbrek) fonksiyon bozukluğunu 0-4 puan üzerinden değerlendiren, organ yetmezliği ciddiyetini izlemek için kullanılan kapsamlı bir skordur.",
  },
  {
    question: "SOFA puanları nereden gelir?",
    answer:
      "Her alt sistem için standart klinik/laboratuvar kriter aralıklarından (örneğin PaO2/FiO2 oranı, trombosit sayısı, bilirubin, GKS, kreatinin) uygun puan seçilir; bu araç seçtiğin puanları toplar, laboratuvar hesabı yapmaz.",
  },
];

export const metadata: Metadata = {
  title: "SOFA Skoru Hesaplama (Organ Yetmezliği)",
  description:
    "6 organ sisteminin (solunum, koagülasyon, karaciğer, kardiyovasküler, SSS, böbrek) puanlarını seç: SOFA toplam skorunu hesapla.",
  alternates: { canonical: "/sofa-skoru-hesaplama" },
  openGraph: {
    title: "SOFA Skoru Hesaplama (Organ Yetmezliği)",
    description: "SOFA toplam skorunu hesaplayın.",
    url: buildSiteUrl("/sofa-skoru-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function SofaPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "SOFA Skoru Hesaplama", item: buildSiteUrl("/sofa-skoru-hesaplama") },
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
          <span>SOFA Skoru Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>SOFA Skoru Hesaplama</h1>
          <p>
            6 organ sisteminin puanlarını seç: SOFA (Sequential Organ
            Failure Assessment) toplam skorunu anında hesapla.
          </p>
        </header>

        <SofaCalculator />

        <section className="category-article-content">
          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>SOFA skoru ne için kullanılır?</strong>
            <br />
            SOFA, yoğun bakımda 6 organ sisteminin fonksiyon
            bozukluğunu 0-4 puan üzerinden değerlendiren, organ
            yetmezliği ciddiyetini izlemek için kullanılan kapsamlı
            bir skordur.
          </p>
          <p>
            <strong>SOFA puanları nereden gelir?</strong>
            <br />
            Her alt sistem için standart klinik/laboratuvar kriter
            aralıklarından (örneğin PaO2/FiO2 oranı, trombosit
            sayısı, bilirubin, GKS, kreatinin) uygun puan seçilir; bu
            araç seçtiğin puanları toplar.
          </p>

          <h2>İlgili araçlar</h2>
          <p>
            Hızlı sepsis taraması için{" "}
            <Link href="/qsofa-hesaplama">qSOFA Hesaplama</Link>, diğer
            doktor ve hemşire araçları için{" "}
            <Link href="/doktor-hemsire-araclari">Doktor ve Hemşire Araçları</Link>{" "}
            sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Skor, Vincent JL ve ark. (1996) tarafından geliştirilmiş
            ve Sepsis-3 (2016) tanımlarında güncellenmiştir. Bu araç
            tıbbi tavsiye yerine geçmez; klinik karar için bir hekime
            danışılmalıdır.
          </p>
        </section>
      </div>
    </main>
  );
}
