import { buildFullLanguageAlternates } from "@/app/i18n/routing";
import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import LaminateCalculator from "../components/LaminateCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Parke hesaplamada fire payı neden gerekli?",
    answer:
      "Kesim kayıpları, köşe/kenar uyumsuzlukları ve nakliye/döşeme sırasında hasar görebilecek parçalar için genellikle %10 fire payı önerilir; düzensiz oda şekillerinde bu oranı artırmak gerekebilir.",
  },
  {
    question: "Paket içi m² değerini nereden öğrenirim?",
    answer:
      "Bu bilgi genellikle ürün ambalajının üzerinde veya satıcının ürün sayfasında yazar; standart 8mm laminat parkelerde yaygın değer paket başına yaklaşık 2-2,5 m² civarındadır.",
  },
];

// Ornek odalar: %10 fire ve paket basina 2,22 m² ile paket sayisi; supurgelik = cevre - kapi genisligi (0,9 m).
const ODALAR: Array<[string, number, number]> = [
  ["Küçük yatak odası", 3, 3],
  ["Çocuk odası", 3.2, 3.6],
  ["Yatak odası", 3.6, 4.2],
  ["Salon", 4, 5.5],
  ["Geniş salon", 5, 7],
];
const PAKET_M2 = 2.22;
const paket = (alan: number, fire: number) => Math.ceil((alan * (1 + fire / 100)) / PAKET_M2);
const m = (n: number) => n.toLocaleString("tr-TR", { maximumFractionDigits: 2 });

export const metadata: Metadata = {
  title: "Parke Hesaplama: Kaç Paket Laminat Parke Gerekir?",
  description:
    "Kaplanacak alanı, paket içi m² değerini ve fire payını gir; döşeme için gereken parke paketi sayısını anında hesapla.",
  alternates: {
    canonical: "/parke-hesaplama",
    ...buildFullLanguageAlternates("/parke-hesaplama"),
  },
  openGraph: {
    title: "Parke Hesaplama: Kaç Paket Laminat Parke Gerekir?",
    description:
      "Alan ve paket içi m² değerinden gereken parke paketi sayısını hesaplayın.",
    url: buildSiteUrl("/parke-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function LaminateCalculatorPage() {
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
        name: "Parke Hesaplama",
        item: buildSiteUrl("/parke-hesaplama"),
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
          <span>Parke Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Parke Hesaplama</h1>
          <p>
            Kaplanacak alanı, seçtiğin parkenin paket içi m² değerini ve
            fire payını gir: gereken parke paketi sayısını anında gör.
          </p>
        </header>

        <LaminateCalculator />

        <section className="category-article-content">
          <h2>Parke ihtiyacı nasıl hesaplanır?</h2>
          <p>
            Önce fire payı eklenmiş toplam alan bulunur:{" "}
            <strong>Fire Dahil Alan = Alan × (1 + Fire Payı / 100)</strong>.
            Ardından bu alan, paket içi m² değerine bölünüp yukarı
            yuvarlanarak gereken paket sayısı elde edilir.
          </p>

          <h2>Örnek hesap: 3,6 × 4,2 m yatak odası</h2>
          <p>
            Oda alanı 3,6 × 4,2 = 15,12 m². Düz döşemede yüzde 10 fire eklenince 15,12 × 1,10 = 16,63 m² gerekir. Paket başına 2,22 m²
            giren bir laminat için 16,63 / 2,22 = 7,49 çıkar ve yukarı yuvarlanarak <strong>8 paket</strong> alınır. Süpürgelik için oda
            çevresi hesaplanır: 2 × (3,6 + 4,2) = 15,6 m; 0,9 m&apos;lik kapı boşluğu düşülünce 14,7 m süpürgelik gerekir, kesim payıyla
            birlikte bir boy fazlası alınması pratiktir.
          </p>

          <h2>Oda ölçülerine göre paket sayısı</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Oda</th>
                  <th>Ölçü</th>
                  <th>Alan</th>
                  <th>Paket (%10 fire)</th>
                  <th>Paket (%15 fire, çapraz)</th>
                  <th>Süpürgelik</th>
                </tr>
              </thead>
              <tbody>
                {ODALAR.map(([ad, a, b]) => (
                  <tr key={ad}>
                    <td>{ad}</td>
                    <td>
                      {m(a)} × {m(b)} m
                    </td>
                    <td>{m(a * b)} m²</td>
                    <td>{paket(a * b, 10)}</td>
                    <td>{paket(a * b, 15)}</td>
                    <td>{m(2 * (a + b) - 0.9)} m</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Tablo, paket başına 2,22 m² varsayar; kendi ürününüzün değerini ambalajdan kontrol edip hesaplayıcıya girin. Çapraz (45°)
            ya da balıksırtı döşemede kesim kaybı arttığı için fire payı genellikle yüzde 15 ve üzerinde tutulur.
          </p>

          <h2>Döşemeden önce</h2>
          <ul>
            <li>
              <strong>Alanı duvar dibinden ölçün:</strong> L biçimli ya da girintili odaları dikdörtgenlere bölüp alanları toplayın; dolap
              altı gibi kaplanmayacak yerleri düşün.
            </li>
            <li>
              <strong>Aynı parti numarasından alın:</strong> Farklı üretim partilerinde renk tonu az da olsa değişebilir; eksik kalırsa
              sonradan alınan paket fark edilebilir. Bu yüzden fire payını baştan eklemek daha güvenlidir.
            </li>
            <li>
              <strong>Genleşme payı ve bekletme:</strong> Laminat ve ahşap parke sıcaklık ve neme göre çalışır. Duvar kenarında bırakılacak
              boşluk ve paketlerin döşemeden önce odada ne kadar bekletileceği üreticiye göre değişir; ambalajdaki talimata uyun.
            </li>
            <li>
              <strong>Şilte (alt katman):</strong> Parke altı şilte de aynı alan kadar, ama genellikle rulo halinde satılır; rulo m² değerine
              göre ayrıca hesaplanır.
            </li>
          </ul>

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
            Aynı yenileme projesinde işine yarayabilecek diğer araçlar:{" "}
            <Link href="/boya-hesaplama">Boya Hesaplama</Link>,{" "}
            <Link href="/fayans-hesaplama">Fayans Hesaplama</Link>,{" "}
            <Link href="/siva-hesaplama">Sıva Hesaplama</Link>,{" "}
            <Link href="/duvar-kagidi-hesaplama">Duvar Kağıdı Hesaplama</Link>.
          </p>
        </section>
      </div>
    </main>
  );
}
