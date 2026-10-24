import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import ExcavationCalculator from "../components/ExcavationCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Gevşeme (şişme) payı neden önemli?",
    answer:
      "Toprak yerinde sıkışık haldeyken kazılıp gevşetildiğinde hacmi artar (bulking/swell). Bu yüzden kamyon sayısını yerinde kazı hacmine göre değil, gevşeme payı eklenmiş hacme göre hesaplamak gerekir; aksi halde kamyon sayısı eksik çıkar.",
  },
  {
    question: "Gevşeme payı toprak tipine göre değişir mi?",
    answer:
      "Evet. Kumlu topraklarda gevşeme payı genellikle %10-15, ortalama karışık topraklarda %20-30, kil ve killi topraklarda %25-40 civarındadır. Aracımızdaki %25 varsayılan değer ortalama bir toprak tipi içindir; kendi zemin durumuna göre bu oranı değiştirebilirsin.",
  },
  {
    question: "Kamyon kasa hacmi olarak ne girmeliyim?",
    answer:
      "Türkiye'de yaygın kullanılan damperli kamyonların kasa hacmi genellikle 8-12 m³ civarındadır; aracın varsayılanı 10 m³'tür. Kullanacağın kamyonun gerçek kasa hacmini biliyorsan onu girmen daha doğru sonuç verir.",
  },
];

const KAZILAR = [20, 50, 100, 250, 500, 1000];
const ZEMINLER: Array<[string, number]> = [
  ["Kum, çakıl", 12],
  ["Karışık toprak", 25],
  ["Kil", 35],
  ["Patlatılmış kaya", 60],
];
const sayi = (n: number) => n.toLocaleString("tr-TR", { maximumFractionDigits: 0 });

export const metadata: Metadata = {
  title: "Hafriyat ve Kazı Hesaplama: Kazı Hacmi ve Kamyon Sayısı",
  description:
    "Temel veya bodrum kazısının uzunluk, genişlik ve derinliğinden yerinde kazı hacmini, gevşeme payı eklenmiş hacmi ve gereken kamyon yükü sayısını hesapla.",
  alternates: {
    canonical: "/hafriyat-hesaplama",
  },
  openGraph: {
    title: "Hafriyat ve Kazı Hesaplama: Kazı Hacmi ve Kamyon Sayısı",
    description:
      "Kazı hacmini, gevşeme payı eklenmiş hacmi ve gereken kamyon yükü sayısını hesaplayın.",
    url: buildSiteUrl("/hafriyat-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function ExcavationCalculatorPage() {
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
        name: "Hafriyat ve Kazı Hesaplama",
        item: buildSiteUrl("/hafriyat-hesaplama"),
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
          <span>Hafriyat ve Kazı Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Hafriyat ve Kazı Hesaplama</h1>
          <p>
            Kazı alanının uzunluk, genişlik ve derinliğini gir: yerinde
            kazı hacmini, gevşeme payı eklenmiş taşınacak hacmi ve
            gereken kamyon yükü sayısını anında hesapla.
          </p>
        </header>

        <ExcavationCalculator />

        <section className="category-article-content">
          <h2>Kaç kamyon hafriyat çıkar?</h2>
          <p>
            Kamyon sayısını yerindeki kazı hacmi değil, kazıldıktan sonra kabaran gevşek hacim belirler. Tablo ortalama karışık
            toprak için %25 kabarma payıyla hesaplandı; kasalar silme dolu kabul edildi.
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Yerinde kazı</th>
                  <th>Gevşek hacim</th>
                  <th>10 m³ kamyon</th>
                  <th>15 m³ kamyon</th>
                </tr>
              </thead>
              <tbody>
                {KAZILAR.map((v) => (
                  <tr key={v}>
                    <td>{sayi(v)} m³</td>
                    <td>{sayi(v * 1.25)} m³</td>
                    <td>{Math.ceil((v * 1.25) / 10)} sefer</td>
                    <td>{Math.ceil((v * 1.25) / 15)} sefer</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Toprak türüne göre aynı kazı</h2>
          <p>
            100 m³&apos;lük bir kazının kamyona yüklenecek hacmi zemine göre belirgin biçimde değişir. Tablodaki kabarma
            payları, kazı kılavuzlarında verilen aralıkların ortasıdır.
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Zemin</th>
                  <th>Kabarma payı</th>
                  <th>100 m³ kazının gevşek hacmi</th>
                  <th>10 m³ kamyonla sefer</th>
                </tr>
              </thead>
              <tbody>
                {ZEMINLER.map(([ad, pay]) => (
                  <tr key={ad}>
                    <td>{ad}</td>
                    <td>%{pay}</td>
                    <td>{sayi(100 * (1 + pay / 100))} m³</td>
                    <td>{Math.ceil((100 * (1 + pay / 100)) / 10)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Örnek: bodrum katlı bir ev</h2>
          <p>
            12 × 10 m tabanlı, 3 m derinliğinde bir bodrum kazısı yerinde {sayi(12 * 10 * 3)} m³ eder. Killi zeminde %35
            kabarmayla bu hacim {sayi(12 * 10 * 3 * 1.35)} m³&apos;e çıkar ve 10 m³&apos;lük kamyonla{" "}
            {Math.ceil((12 * 10 * 3 * 1.35) / 10)} sefer demektir. Aynı kazı kumlu zeminde {Math.ceil((12 * 10 * 3 * 1.12) / 10)}{" "}
            seferde biter. Toprağın bir kısmı geri dolguda kullanılacaksa, bu miktarı sahada bırakıp yalnız fazlasını
            taşıtmak sefer sayısını düşürür.
          </p>

          <h2>Kazı hacmi nasıl hesaplanır?</h2>
          <p>
            Dikdörtgen kesitli bir kazının yerinde (bank) hacmi{" "}
            <strong>Hacim = Uzunluk × Genişlik × Derinlik</strong>{" "}
            formülüyle bulunur. Bu, toprağın doğal, sıkışık hâldeki
            hacmidir — henüz kazılmamış durumdaki hacme karşılık gelir.
          </p>

          <h2>Gevşeme (şişme) payı nedir?</h2>
          <p>
            Toprak kazılıp gevşetildiğinde, tanecikler arasındaki
            boşluklar arttığı için hacmi genişler; buna{" "}
            <strong>gevşeme veya şişme payı (bulking/swell factor)</strong>{" "}
            denir. Kamyonla taşıma planlaması bu gevşek hacme göre
            yapılmalıdır, çünkü kamyona yüklenen toprak artık yerinde
            hâldeki gibi sıkışık değildir.{" "}
            <strong>Gevşek Hacim = Yerinde Hacim × (1 + Gevşeme Payı / 100)</strong>.
          </p>
          <p>
            Gerekli kamyon sayısı ise gevşek hacmin, kullanılan
            kamyonun kasa hacmine bölünüp yukarı yuvarlanmasıyla bulunur:{" "}
            <strong>Kamyon Sayısı = ⌈Gevşek Hacim / Kamyon Kasa Hacmi⌉</strong>.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>Gevşeme (şişme) payı neden önemli?</strong>
            <br />
            Toprak yerinde sıkışık haldeyken kazılıp gevşetildiğinde
            hacmi artar (bulking/swell). Bu yüzden kamyon sayısını
            yerinde kazı hacmine göre değil, gevşeme payı eklenmiş
            hacme göre hesaplamak gerekir; aksi halde kamyon sayısı
            eksik çıkar.
          </p>
          <p>
            <strong>Gevşeme payı toprak tipine göre değişir mi?</strong>
            <br />
            Evet. Kumlu topraklarda gevşeme payı genellikle %10-15,
            ortalama karışık topraklarda %20-30, kil ve killi
            topraklarda %25-40 civarındadır. Aracımızdaki %25 varsayılan
            değer ortalama bir toprak tipi içindir; kendi zemin
            durumuna göre bu oranı değiştirebilirsin.
          </p>
          <p>
            <strong>Kamyon kasa hacmi olarak ne girmeliyim?</strong>
            <br />
            Türkiye&apos;de yaygın kullanılan damperli kamyonların kasa
            hacmi genellikle 8-12 m³ civarındadır; aracın varsayılanı 10
            m³&apos;tür. Kullanacağın kamyonun gerçek kasa hacmini
            biliyorsan onu girmen daha doğru sonuç verir.
          </p>

          <h2>İlgili araçlar</h2>
          <p>
            Kazı tamamlandıktan sonra dökülecek beton hacmi ve malzeme
            miktarı için{" "}
            <Link href="/beton-hesaplama">Beton Hesaplama</Link>{" "}
            aracına, inşaat işleriyle ilgili diğer araçlar için{" "}
            <Link href="/insaatci-araclari">İnşaatçı Araçları</Link>{" "}
            sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Gevşeme/şişme payı aralıkları, inşaat mühendisliğinde yaygın
            kullanılan zemin sınıflandırma tablolarındaki tipik
            değerlere dayanır. Kesin değerler zemin etüdü ve saha
            koşullarına göre değişebilir; büyük ölçekli veya hassas
            projelerde bir inşaat mühendisiyle çalışılmalıdır.
          </p>
        </section>
      </div>
    </main>
  );
}
