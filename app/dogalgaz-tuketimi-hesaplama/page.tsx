import { buildFullLanguageAlternates } from "@/app/i18n/routing";
import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import NaturalGasCalculator from "../components/NaturalGasCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Doğalgaz faturamdaki m³ değerini nereden görürüm?",
    answer:
      "Faturanın \"tüketim\" veya \"gerçek tüketim\" bölümünde m³ cinsinden yazar; bazı faturalarda ayrıca \"düzeltilmiş\" (correction katsayılı) bir m³ değeri de bulunur.",
  },
  {
    question: "kWh karşılığı neden yaklaşık?",
    answer:
      "Doğalgazın enerji içeriği (alt ısıl değer), gazın kaynağına ve dağıtım bölgesine göre az miktarda değişir; bu araç Türkiye ortalaması bir katsayı kullanır, faturandaki gerçek değer birkaç yüzde farklı olabilir.",
  },
];

const ISIL_DEGERLER = [9000, 9100, 9155, 9200, 9300];
const sayi = (n: number, basamak = 0) => n.toLocaleString("tr-TR", { maximumFractionDigits: basamak });

export const metadata: Metadata = {
  title: "Doğalgaz Tüketimi Hesaplama: m³'ten Maliyet Hesabı",
  description:
    "Doğalgaz tüketimini (m³) ve birim fiyatı gir; toplam maliyeti ve yaklaşık kWh karşılığını anında hesapla.",
  alternates: {
    canonical: "/dogalgaz-tuketimi-hesaplama",
    ...buildFullLanguageAlternates("/dogalgaz-tuketimi-hesaplama"),
  },
  openGraph: {
    title: "Doğalgaz Tüketimi Hesaplama: m³'ten Maliyet Hesabı",
    description:
      "m³ cinsinden doğalgaz tüketiminden toplam maliyeti ve yaklaşık kWh karşılığını hesaplayın.",
    url: buildSiteUrl("/dogalgaz-tuketimi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function NaturalGasCalculatorPage() {
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
        name: "Doğalgaz Tüketimi Hesaplama",
        item: buildSiteUrl("/dogalgaz-tuketimi-hesaplama"),
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
          <span>Doğalgaz Tüketimi Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Doğalgaz Tüketimi Hesaplama</h1>
          <p>
            Doğalgaz tüketimini (m³) ve birim fiyatı gir: toplam maliyeti
            ve yaklaşık enerji (kWh) karşılığını anında gör.
          </p>
        </header>

        <NaturalGasCalculator />

        <section className="category-article-content">
          <h2 id="kwh">Doğalgaz m³ kaç kWh?</h2>
          <p>
            Faturada doğalgaz metreküp olarak ölçülür ama enerji olarak (kWh) faturalanır. Çeviri, faturanızda yazan{" "}
            <strong>üst ısıl değer</strong> (kcal/m³) ile yapılır: <strong>kWh = m³ × düzeltme katsayısı × üst ısıl değer ÷
            860</strong>. 860 kcal bir kWh&apos;e eşittir; düzeltme katsayısı ise sayaçtaki gazın basınç ve sıcaklığını
            standart koşula çeviren, 1&apos;e yakın bir sayıdır. Üst ısıl değer şehre ve aya göre biraz değiştiği için 1
            m³&apos;ün karşılığı da değişir:
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Üst ısıl değer</th>
                  <th>1 m³</th>
                  <th>100 m³</th>
                  <th>250 m³</th>
                </tr>
              </thead>
              <tbody>
                {ISIL_DEGERLER.map((k) => (
                  <tr key={k}>
                    <td>{sayi(k)} kcal/m³</td>
                    <td>{sayi(k / 860, 2)} kWh</td>
                    <td>{sayi((100 * k) / 860)} kWh</td>
                    <td>{sayi((250 * k) / 860)} kWh</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Tablo düzeltme katsayısı 1 alınarak hesaplandı. Yukarıdaki araç ortalama olarak 1 m³ = 10,55 kWh kullanır; kendi
            faturanızdaki değerle tam karşılığı bu formülle bulabilirsiniz. Tersi de aynı formülle bulunur: 1.000 kWh,
            9.155 kcal/m³ üst ısıl değerde yaklaşık {sayi((1000 * 860) / 9155)} m³ eder.
          </p>

          <h2>Doğalgaz maliyeti nasıl hesaplanır?</h2>
          <p>
            Hesap basittir: <strong>Toplam Maliyet = Tüketim (m³) × Birim
            Fiyat (₺/m³)</strong>. kWh karşılığı ise Türkiye ortalaması bir
            katsayıyla (yaklaşık 10,55 kWh/m³) tahmini olarak gösterilir;
            gerçek faturandaki katsayı bölgeye göre farklılık gösterebilir.
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
            Isıtma sistemi seçimi için{" "}
            <Link href="/isi-pompasi-kombi-karsilastirma">Isı Pompası - Kombi Karşılaştırma</Link>,{" "}
            yalıtımın geri dönüşü için{" "}
            <Link href="/yalitim-amortisman-hesaplama">Yalıtım Amortisman Hesaplama</Link>,{" "}
            elektrik tüketimi için{" "}
            <Link href="/elektrik-tuketimi-hesaplama">Elektrik Tüketimi Hesaplama</Link>
            {" "}sayfasına bakabilirsin.
          </p>
        </section>
      </div>
    </main>
  );
}
