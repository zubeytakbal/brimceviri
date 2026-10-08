import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import HeatInputCalculator from "../components/HeatInputCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Kaynak ısı girdisi (heat input) nasıl hesaplanır?",
    answer:
      "Isı Girdisi (kJ/mm) = (Voltaj × Akım × 60) / (Kaynak Hızı (mm/dakika) × 1000). Bu, EN 1011 standardına dayanan genel bir hesaptır; işlem verimi katsayısı dahil değildir.",
  },
  {
    question: "Isı girdisi neden önemlidir?",
    answer:
      "Isı girdisi, kaynak dikişinin soğuma hızını ve dolayısıyla mikroyapısını, sertliğini ve çatlak riskini etkiler. Çok yüksek veya çok düşük ısı girdisi, malzemeye göre istenmeyen mekanik özelliklere yol açabilir.",
  },
];

// EN 1011-1 isil verim katsayilari (k) ve ornek MAG parametreleri icin ark enerjisi tablosu.
const VERIM: Array<[string, string, number]> = [
  ["Tozaltı kaynağı (SAW)", "121", 1.0],
  ["Örtülü elektrot (MMA)", "111", 0.8],
  ["MIG/MAG", "131 / 135", 0.8],
  ["Özlü tel (FCAW)", "114 / 136", 0.8],
  ["TIG", "141", 0.6],
  ["Plazma", "15", 0.6],
];
const HIZLAR = [150, 200, 250, 300, 400, 500];
const arkEnerjisi = (u: number, i: number, v: number) => (u * i * 60) / (v * 1000);
const kj = (n: number) => n.toLocaleString("tr-TR", { maximumFractionDigits: 2 });

export const metadata: Metadata = {
  title: "Kaynak Isı Girdisi Hesaplama (kJ/mm)",
  description:
    "Voltaj, akım ve kaynak hızından, EN 1011 standardına dayanan kaynak ısı girdisini (kJ/mm) hesapla.",
  alternates: {
    canonical: "/kaynak-isi-girdisi-hesaplama",
  },
  openGraph: {
    title: "Kaynak Isı Girdisi Hesaplama (kJ/mm)",
    description: "Voltaj, akım ve hızdan ısı girdisini hesapla.",
    url: buildSiteUrl("/kaynak-isi-girdisi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function HeatInputCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Kaynakçı Araçları", item: buildSiteUrl("/kaynakci-araclari") },
      { "@type": "ListItem", position: 4, name: "Kaynak Isı Girdisi Hesaplama", item: buildSiteUrl("/kaynak-isi-girdisi-hesaplama") },
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
          <Link href="/kaynakci-araclari">Kaynakçı Araçları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Kaynak Isı Girdisi Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Kaynak Isı Girdisi Hesaplama</h1>
          <p>
            Voltaj, akım ve kaynak hızını gir: EN 1011 standardına
            dayanan ısı girdisini (kJ/mm) hesapla.
          </p>
        </header>

        <HeatInputCalculator />

        <section className="category-article-content">
          <h2>Ark enerjisi ve ısı girdisi farkı</h2>
          <p>
            Formülün verdiği değer aslında <strong>ark enerjisidir</strong>: arktan çıkan toplam enerjinin dikiş boyuna bölümü. Bu
            enerjinin tamamı parçaya geçmez. EN 1011-1 standardı, ısı girdisini bulmak için ark enerjisini kaynak yöntemine özgü ısıl
            verim katsayısı (k) ile çarpar: Q = k × U × I × 60 / (v × 1000).
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Kaynak yöntemi</th>
                  <th>ISO 4063 no</th>
                  <th>Isıl verim (k)</th>
                </tr>
              </thead>
              <tbody>
                {VERIM.map(([ad, no, k]) => (
                  <tr key={ad}>
                    <td>{ad}</td>
                    <td>{no}</td>
                    <td>{kj(k)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Örnek hesap: MAG kaynağı</h2>
          <p>
            24 V gerilim, 220 A akım ve 300 mm/dk kaynak hızıyla yapılan bir MAG dikişinde ark enerjisi 24 × 220 × 60 / (300 × 1000) ≈{" "}
            <strong>{kj(arkEnerjisi(24, 220, 300))} kJ/mm</strong> olur. MAG için k = 0,8 olduğundan ısı girdisi{" "}
            {kj(arkEnerjisi(24, 220, 300))} × 0,8 ≈ <strong>{kj(arkEnerjisi(24, 220, 300) * 0.8)} kJ/mm</strong>&apos;dir. Kaynak prosedür
            şartnamesinde (WPS) hangi değerin (ark enerjisi mi, ısı girdisi mi) istendiğine dikkat edin.
          </p>

          <h2>Kaynak hızının etkisi (24 V, 220 A)</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Kaynak hızı (mm/dk)</th>
                  <th>Ark enerjisi (kJ/mm)</th>
                  <th>Isı girdisi, k = 0,8 (kJ/mm)</th>
                </tr>
              </thead>
              <tbody>
                {HIZLAR.map((v) => (
                  <tr key={v}>
                    <td>{v}</td>
                    <td>{kj(arkEnerjisi(24, 220, v))}</td>
                    <td>{kj(arkEnerjisi(24, 220, v) * 0.8)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Hız yarıya inince ısı girdisi iki katına çıkar. Salınımlı (zikzak) kaynakta hız, dikiş boyunca ilerleme hızıdır; salınım
            yaparken torcun kat ettiği yol değildir. Bu yüzden salınımlı pasolarda ısı girdisi genellikle düz pasolardan yüksektir.
          </p>

          <h2>Sık yapılan hatalar</h2>
          <ul>
            <li>
              <strong>Makinedeki ayar değerini kullanmak:</strong> Gerilim ve akım, kaynak sırasında ölçülen gerçek değerler olmalıdır;
              ayar ile ark gerilimi kablo kayıpları nedeniyle farklı olabilir.
            </li>
            <li>
              <strong>Hızı cm/dk girmek:</strong> Formül mm/dk içindir; 30 cm/dk = 300 mm/dk&apos;dır.
            </li>
            <li>
              <strong>Darbeli (pulse) kaynakta ortalama değerler:</strong> Darbeli akımda gerilim × akım çarpımı yerine makinenin gösterdiği
              anlık güç ya da enerji değeri kullanılmalıdır.
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
            Diğer kaynakçı araçları için{" "}
            <Link href="/kaynakci-araclari">Kaynakçı Araçları</Link>
            {" "}sayfasına, elektrot çapına göre amperaj hesaplama için{" "}
            <Link href="/kaynak-amperaji-hesaplama">Kaynak Amperajı Hesaplama</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Formül, EN 1011-1 standardında tanımlanan ısı girdisi
            hesabına dayanır. Bu araç bir prosedür şartnamesinin (WPS)
            yerini almaz.
          </p>
        </section>
      </div>
    </main>
  );
}
