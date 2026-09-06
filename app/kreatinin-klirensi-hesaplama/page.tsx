import type { Metadata } from "next";
import Link from "next/link";
import CreatinineClearanceCalculator from "../components/CreatinineClearanceCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Kreatinin klirensi ne için kullanılır?",
    answer:
      "Kreatinin klirensi, böbrek fonksiyonunun (glomerüler filtrasyon hızının) bir tahminidir. Özellikle böbrek yoluyla atılan ilaçların doz ayarlamasında klinik referans olarak kullanılır. Bu araç yalnızca tahmini klirens değerini hesaplar, doz önermez.",
  },
  {
    question: "Cockcroft-Gault ile eGFR (MDRD/CKD-EPI) aynı şey mi?",
    answer:
      "Hayır, farklı formüllerdir. Cockcroft-Gault kiloya dayanır ve özellikle ilaç doz ayarlamasında yaygın kullanılır; MDRD ve CKD-EPI gibi eGFR formülleri ise kronik böbrek hastalığı evrelemesinde tercih edilir ve vücut yüzey alanına göre normalize edilmiştir.",
  },
];

export const metadata: Metadata = {
  title: "Kreatinin Klirensi Hesaplama (Cockcroft-Gault)",
  description:
    "Yaş, kilo, cinsiyet ve serum kreatininden, Cockcroft-Gault formülüyle tahmini kreatinin klirensini hesapla.",
  alternates: { canonical: "/kreatinin-klirensi-hesaplama" },
  openGraph: {
    title: "Kreatinin Klirensi Hesaplama (Cockcroft-Gault)",
    description: "Cockcroft-Gault formülüyle tahmini kreatinin klirensini hesaplayın.",
    url: buildSiteUrl("/kreatinin-klirensi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function CreatinineClearancePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Kreatinin Klirensi Hesaplama", item: buildSiteUrl("/kreatinin-klirensi-hesaplama") },
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
          <span>Kreatinin Klirensi Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Kreatinin Klirensi Hesaplama</h1>
          <p>
            Yaş, kilo, cinsiyet ve serum kreatinini gir: Cockcroft-Gault
            formülüyle tahmini kreatinin klirensini anında hesapla.
          </p>
        </header>

        <CreatinineClearanceCalculator />

        <section className="category-article-content">
          <h2>Cockcroft-Gault formülü nedir?</h2>
          <p>
            <strong>
              CrCl (mL/dk) = [(140 − Yaş) × Kilo(kg) × (Kadınsa 0,85)] /
              (72 × Serum Kreatinin (mg/dL))
            </strong>
            . 1976&apos;da yayımlanan bu formül, böbrek yoluyla atılan
            ilaçların doz ayarlamasında klinikte yaygın kullanılan
            standart bir tahmin yöntemidir.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>Kreatinin klirensi ne için kullanılır?</strong>
            <br />
            Kreatinin klirensi, böbrek fonksiyonunun (glomerüler
            filtrasyon hızının) bir tahminidir. Özellikle böbrek
            yoluyla atılan ilaçların doz ayarlamasında klinik referans
            olarak kullanılır. Bu araç yalnızca tahmini klirens
            değerini hesaplar, doz önermez.
          </p>
          <p>
            <strong>Cockcroft-Gault ile eGFR (MDRD/CKD-EPI) aynı şey mi?</strong>
            <br />
            Hayır, farklı formüllerdir. Cockcroft-Gault kiloya dayanır
            ve özellikle ilaç doz ayarlamasında yaygın kullanılır;
            MDRD ve CKD-EPI gibi eGFR formülleri ise kronik böbrek
            hastalığı evrelemesinde tercih edilir.
          </p>

          <h2>İlgili araçlar</h2>
          <p>
            Diğer doktor ve hemşire araçları için{" "}
            <Link href="/doktor-hemsire-araclari">Doktor ve Hemşire Araçları</Link>{" "}
            sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Formül, Cockcroft DW, Gault MH (1976), &quot;Prediction of
            creatinine clearance from serum creatinine&quot;, Nephron
            yayınına dayanmaktadır. Bu araç tıbbi tavsiye yerine
            geçmez; klinik kararlar için bir hekime danışılmalıdır.
          </p>
        </section>
      </div>
    </main>
  );
}
