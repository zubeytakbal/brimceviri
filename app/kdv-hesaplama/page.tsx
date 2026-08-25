import type { Metadata } from "next";
import Link from "next/link";
import VatCalculator from "../components/VatCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Fişteki KDV dahil tutardan KDV'yi nasıl ayırırım?",
    answer:
      "\"KDV Dahil → KDV Hariç\" yönünü seç, fişteki toplam tutarı ve ürünün KDV oranını gir; araç sana hem matrahı hem KDV tutarını ayrı ayrı gösterir.",
  },
  {
    question: "Bu araç fatura kesmek için mi kullanılır?",
    answer:
      "Hayır, yalnızca hızlı bir hesap aracıdır; resmi fatura/e-fatura işlemleri için muhasebe yazılımı veya mali müşavir desteği kullanmalısın.",
  },
];

export const metadata: Metadata = {
  title: "KDV Hesaplama: KDV Dahil ve KDV Hariç Tutar",
  description:
    "Tutarı ve KDV oranını (%1, %10, %20) gir; KDV dahil veya KDV hariç tutarı, KDV miktarını anında hesapla.",
  alternates: {
    canonical: "/kdv-hesaplama",
  },
  openGraph: {
    title: "KDV Hesaplama: KDV Dahil ve KDV Hariç Tutar",
    description:
      "KDV dahil veya KDV hariç tutarı, KDV miktarını oran bazında hesaplayın.",
    url: buildSiteUrl("/kdv-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function VatCalculatorPage() {
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
        name: "KDV Hesaplama",
        item: buildSiteUrl("/kdv-hesaplama"),
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
          <span>KDV Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>KDV Hesaplama</h1>
          <p>
            Hesap yönünü seç (KDV hariç tutardan dahile, ya da tam
            tersi), tutarı ve oranı gir: KDV tutarını, matrahı ve toplam
            tutarı anında gör.
          </p>
        </header>

        <VatCalculator />

        <section className="category-article-content">
          <h2>Güncel KDV oranları nelerdir?</h2>
          <p>
            Türkiye&apos;de yürürlükteki temel KDV oranları %1 (temel
            gıda ve bazı zorunlu ihtiyaç maddeleri), %10 (bir grup gıda
            ve hizmet) ve %20&apos;dir (genel oran — çoğu mal ve
            hizmet). Aracın &quot;Özel oran&quot; seçeneğiyle bu üç
            standardın dışında bir oranla da hesaplama yapabilirsin.
          </p>

          <h2>KDV nasıl hesaplanır?</h2>
          <p>
            KDV hariç bir tutardan KDV dahil tutara giderken, tutar
            doğrudan oranla çarpılıp KDV miktarı bulunur ve tutara
            eklenir: <strong>KDV Tutarı = Tutar × Oran</strong>. Ters
            yönde, yani KDV dahil bir tutardan KDV hariç tutarı (matrahı)
            bulurken tutar (1 + oran) değerine bölünür:{" "}
            <strong>Matrah = Tutar / (1 + Oran)</strong> — çünkü elindeki
            tutarın içinde zaten KDV var, bu yüzden doğrudan oranla
            çarpmak yanlış (fazla) sonuç verir.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>Fişteki KDV dahil tutardan KDV&apos;yi nasıl ayırırım?</strong>
            <br />
            &quot;KDV Dahil → KDV Hariç&quot; yönünü seç, fişteki toplam
            tutarı ve ürünün KDV oranını gir; araç sana hem matrahı hem
            KDV tutarını ayrı ayrı gösterir.
          </p>
          <p>
            <strong>Bu araç fatura kesmek için mi kullanılır?</strong>
            <br />
            Hayır, yalnızca hızlı bir hesap aracıdır; resmi fatura/e-fatura
            işlemleri için muhasebe yazılımı veya mali müşavir desteği
            kullanmalısın.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            KDV oranları, T.C. Hazine ve Maliye Bakanlığı tarafından
            yürürlüğe konan güncel KDV oran tebliğlerine dayanmaktadır.
          </p>
        </section>
      </div>
    </main>
  );
}
