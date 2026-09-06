import type { Metadata } from "next";
import Link from "next/link";
import VetDoseCalculator from "../components/VetDoseCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Bu araç bana doğru ilaç dozunu söyler mi?",
    answer:
      "Hayır. Bu araç yalnızca zaten belirlenmiş bir mg/kg doz değerini, hayvanın ağırlığı ve ilaç konsantrasyonuyla birlikte uygulanacak mL hacme çevirir. Hangi mg/kg dozunun uygun olduğunu belirlemez veya önermez — bu değer ilaca, türe ve hayvanın klinik durumuna göre değişir ve her zaman bir veteriner hekimden veya resmi ilaç prospektüsünden alınmalıdır.",
  },
  {
    question: "Toplam doz ve uygulanacak hacim nasıl hesaplanır?",
    answer:
      "Toplam Doz (mg) = Reçete Edilen Doz (mg/kg) × Hayvan Ağırlığı (kg). Uygulanacak Hacim (mL) = Toplam Doz (mg) ÷ İlaç Konsantrasyonu (mg/mL).",
  },
  {
    question: "Neden köpek/kedi gibi türe özel örnek doz değerleri verilmiyor?",
    answer:
      "Aynı ilaç bir türde güvenli, başka bir türde toksik olabilir (örneğin bazı insan ağrı kesicileri kedilerde ölümcül olabilir). Güvenli bir doz aralığı; ilaca, türe, hayvanın yaşına ve klinik durumuna özgüdür ve tek bir genel tabloyla sorumlu şekilde verilemez. Bu yüzden bu sayfa örnek doz değeri içermez.",
  },
];

export const metadata: Metadata = {
  title: "Veteriner İlaç Dozu ve Hacmi Hesaplama (mg/kg - mL)",
  description:
    "Veteriner hekim tarafından reçete edilen mg/kg dozunu, hayvan ağırlığı ve ilaç konsantrasyonuyla birlikte uygulanacak mL hacme çevir. Doz değerini belirlemez, yalnızca birim çevirimi yapar.",
  alternates: {
    canonical: "/veteriner-ilac-dozu-hesaplama",
  },
  openGraph: {
    title: "Veteriner İlaç Dozu ve Hacmi Hesaplama (mg/kg - mL)",
    description:
      "Reçete edilen mg/kg dozunu, ağırlık ve konsantrasyonla birlikte mL hacme çevir.",
    url: buildSiteUrl("/veteriner-ilac-dozu-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function VetDoseCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Veteriner Araçları", item: buildSiteUrl("/veteriner-araclari") },
      { "@type": "ListItem", position: 4, name: "Veteriner İlaç Dozu ve Hacmi Hesaplama", item: buildSiteUrl("/veteriner-ilac-dozu-hesaplama") },
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
          <Link href="/veteriner-araclari">Veteriner Araçları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Veteriner İlaç Dozu ve Hacmi Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Veteriner İlaç Dozu ve Hacmi Hesaplama</h1>
          <p>
            Zaten belirlenmiş bir mg/kg doz değerini, hayvan ağırlığı
            ve ilaç konsantrasyonuyla birlikte uygulanacak mL hacme
            çevir. Bu araç doz değerini belirlemez — yalnızca birim
            çevirimi yapar.
          </p>
        </header>

        <VetDoseCalculator />

        <section className="category-article-content">
          <h2>Toplam doz ve hacim nasıl hesaplanır?</h2>
          <p>
            <strong>Toplam Doz (mg) = Reçete Edilen Doz (mg/kg) ×
            Hayvan Ağırlığı (kg)</strong>. Enjeksiyon veya oral
            solüsyon uygulamalarında, bu toplam dozun kaç mL&apos;ye
            karşılık geldiğini bulmak için{" "}
            <strong>Uygulanacak Hacim (mL) = Toplam Doz (mg) ÷ İlaç
            Konsantrasyonu (mg/mL)</strong> formülü kullanılır.
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
            Diğer veteriner araçları için{" "}
            <Link href="/veteriner-araclari">Veteriner Araçları</Link>
            {" "}sayfasına, ağırlık birimleri (kg/lb) için{" "}
            <Link href="/kategoriler/kutle">Kütle Dönüşümleri</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Formül, temel doz-konsantrasyon aritmetiğine dayanır. Bu
            araç ve sonuçları tıbbi/veteriner tavsiye yerine geçmez;
            uygulanacak dozu belirlemez.
          </p>
        </section>
      </div>
    </main>
  );
}
