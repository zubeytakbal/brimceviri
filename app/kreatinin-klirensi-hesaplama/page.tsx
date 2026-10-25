import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
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
  title: "Kreatinin Klirensi (CrCl) Hesaplama: Cockcroft-Gault",
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

// Örnek hesap: 60 yaş, 70 kg, kreatinin 1,0 mg/dL, erkek.
const ccrOrnek = ((140 - 60) * 70) / (72 * 1.0);

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
          <h1>Kreatinin Klirensi (CrCl) Hesaplama</h1>
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

          <h2>Örnek hesap</h2>
          <p>
            60 yaşında, 70 kg, serum kreatinini 1,0 mg/dL olan bir erkekte: (140 − 60) × 70 / (72 × 1,0) ≈{" "}
            {ccrOrnek.toLocaleString("tr-TR", { maximumFractionDigits: 1 })} mL/dk. Aynı değerlerdeki bir kadında sonuç 0,85 ile
            çarpılır: {(ccrOrnek * 0.85).toLocaleString("tr-TR", { maximumFractionDigits: 1 })} mL/dk. Laboratuvar sonucu µmol/L
            ise mg/dL&apos;ye çevirmek için 88,4&apos;e bölün (88 µmol/L ≈ 1,0 mg/dL).
          </p>

          <h2>Sonucu yorumlarken</h2>
          <p>
            İlaç prospektüslerindeki doz ayarları çoğunlukla Cockcroft-Gault ile bulunan klirense göre verilir. Kronik böbrek
            hastalığının evrelemesinde ise eGFR kullanılır; KDIGO kategorileri karşılaştırma için şöyledir:
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>KDIGO kategorisi</th>
                  <th>GFR (mL/dk/1,73 m²)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>G1 – normal ya da yüksek</td><td>≥90</td></tr>
                <tr><td>G2 – hafif azalmış</td><td>60–89</td></tr>
                <tr><td>G3a – hafif-orta azalmış</td><td>45–59</td></tr>
                <tr><td>G3b – orta-ağır azalmış</td><td>30–44</td></tr>
                <tr><td>G4 – ağır azalmış</td><td>15–29</td></tr>
                <tr><td>G5 – böbrek yetmezliği</td><td>&lt;15</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            Formül kiloya dayandığı için obez hastalarda gerçek kilo klirensi olduğundan yüksek gösterebilir; bu durumda ideal ya da
            düzeltilmiş kilo kullanımı tartışılır (<Link href="/ideal-kilo-hesaplama">ideal kilo hesaplama</Link>). Kas kütlesi çok
            düşük yaşlı hastalarda ve böbrek fonksiyonu hızla değişen akut durumlarda tahmin güvenilirliğini yitirir.
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
            Vücut yüzey alanı hesaplaması için{" "}
            <Link href="/vucut-yuzey-alani-hesaplama">Vücut Yüzey Alanı Hesaplama</Link>,{" "}
            diğer doktor ve hemşire araçları için{" "}
            <Link href="/hesaplayicilar#klinik">Klinik Skorlar</Link>{" "}
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
