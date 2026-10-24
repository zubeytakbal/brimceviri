import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import ZoningCalculator from "../components/ZoningCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "KAKS (Emsal) nedir?",
    answer:
      "KAKS, \"Kat Alanı Katsayısı\"nın kısaltmasıdır ve halk arasında \"emsal\" olarak da bilinir. Bir arsada yapılabilecek toplam inşaat alanının, arsa alanına oranını ifade eder.",
  },
  {
    question: "Toplam inşaat alanı nasıl hesaplanır?",
    answer:
      "Toplam İnşaat Alanı (m²) = Arsa Alanı (m²) × KAKS. Örneğin 1.000 m² bir arsada KAKS değeri 2,0 ise, toplam 2.000 m² inşaat alanı yapılabilir.",
  },
  {
    question: "TAKS nedir ve kat sayısı nasıl tahmin edilir?",
    answer:
      "TAKS (Taban Alanı Katsayısı), bir katın kaplayabileceği maksimum alanı belirler: Maksimum Taban Alanı = Arsa Alanı × TAKS. Toplam inşaat alanının taban alanına bölünmesi, yaklaşık kaç kat yapılabileceğini gösterir.",
  },
  {
    question: "KAKS ve TAKS değerlerini nereden öğrenirim?",
    answer:
      "Bu değerler parsele özeldir ve belediyenin e-imar sisteminden veya imar durum belgesinden öğrenilir. Bu araç bu değerleri belirlemez, yalnızca birim çevirimi yapar.",
  },
];

const ARSALAR = [300, 500, 1000];
const EMSALLER = [0.3, 0.5, 1, 1.5, 2, 2.5];
const IKILILER: Array<[number, number]> = [
  [0.3, 0.6],
  [0.3, 1.2],
  [0.35, 1.4],
  [0.4, 1.6],
  [0.4, 2],
  [0.5, 2.5],
];
const sayi = (n: number, basamak = 0) => n.toLocaleString("tr-TR", { minimumFractionDigits: basamak > 1 ? 2 : 0, maximumFractionDigits: basamak });

export const metadata: Metadata = {
  title: "Emsal (KAKS) Hesaplama: İnşaat Alanı ve Kat Sayısı",
  description:
    "Arsa alanı, KAKS (emsal) ve TAKS değerinden toplam inşaat alanını, maksimum taban alanını ve tahmini kat sayısını hesapla.",
  alternates: {
    canonical: "/emsal-kaks-hesaplama",
    languages: {
      "uz-UZ": "/uz/qurilish-zichligi-koeffitsiyenti-hisoblash",
    },
  },
  openGraph: {
    title: "Emsal (KAKS) Hesaplama: İnşaat Alanı ve Kat Sayısı",
    description: "Arsa alanı ve KAKS değerinden inşaat alanını hesapla.",
    url: buildSiteUrl("/emsal-kaks-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function ZoningCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Tüm Hesaplamalar", item: buildSiteUrl("/hesaplayicilar") },
      { "@type": "ListItem", position: 3, name: "Ev, İnşaat ve Bahçe", item: buildSiteUrl("/hesaplayicilar#ev-ve-yapi") },
      { "@type": "ListItem", position: 4, name: "Emsal (KAKS) Hesaplama", item: buildSiteUrl("/emsal-kaks-hesaplama") },
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
          <Link href="/hesaplayicilar#ev-ve-yapi">Ev, İnşaat ve Bahçe</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Emsal (KAKS) Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Emsal (KAKS) Hesaplama</h1>
          <p>
            Arsa alanını ve KAKS (emsal) değerini gir: toplam inşaat
            alanını hesapla. TAKS değerini de eklersen, maksimum taban
            alanı ve tahmini kat sayısını da görürsün.
          </p>
        </header>

        <ZoningCalculator />

        <section className="category-article-content">
          <h2>Arsanıza kaç m² bina yapılır?</h2>
          <p>
            İmar durum belgesindeki emsal (KAKS) değeri, arsa alanıyla çarpılınca yapılabilecek toplam kat alanını verir.
            Aşağıdaki tablo sık görülen arsa büyüklükleri ve emsal değerleri için bu çarpımı hazır gösterir.
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Emsal (KAKS)</th>
                  {ARSALAR.map((a) => (
                    <th key={a}>{sayi(a)} m² arsa</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {EMSALLER.map((e) => (
                  <tr key={e}>
                    <td>{sayi(e, 2)}</td>
                    {ARSALAR.map((a) => (
                      <td key={a}>{sayi(a * e)} m²</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Kaç kat çıkar? KAKS ile TAKS birlikte</h2>
          <p>
            TAKS, binanın zemine oturabileceği en büyük alanı sınırlar. Toplam kat alanı (KAKS) taban alanına (TAKS) bölününce
            kaba kat sayısı çıkar; yani kat sayısı arsa büyüklüğünden bağımsız olarak <strong>KAKS ÷ TAKS</strong> kadardır.
            Tablo 500 m²&apos;lik bir arsa için hesaplandı.
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>TAKS / KAKS</th>
                  <th>Taban alanı</th>
                  <th>Toplam kat alanı</th>
                  <th>Kaba kat sayısı</th>
                </tr>
              </thead>
              <tbody>
                {IKILILER.map(([taks, kaks]) => (
                  <tr key={`${taks}-${kaks}`}>
                    <td>
                      {sayi(taks, 2)} / {sayi(kaks, 2)}
                    </td>
                    <td>{sayi(500 * taks)} m²</td>
                    <td>{sayi(500 * kaks)} m²</td>
                    <td>{sayi(kaks / taks, 1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Kat sayısı kesirli çıkarsa son kat tam taban alanında yapılamaz; kalan hak çoğu projede daha küçük bir üst kata ya
            da çekme kata kullanılır. Planda ayrıca kat adedi ya da bina yüksekliği (Hmax) yazıyorsa, hangisi daha önce dolarsa
            o sınır geçerlidir.
          </p>

          <h2>Emsale sayılmayan alanlar ve %30 sınırı</h2>
          <p>
            Planlı Alanlar İmar Yönetmeliği bazı alanları emsal hesabının dışında tutar; bodrum kattaki sığınak, asansör
            boşlukları ve tesisat alanları ile yönetmeliğin istediği yangın merdiveni ve son kat üzerindeki ortak teras çatı
            bunlara örnektir. Bu emsal harici alanların toplamı, emsale esas alanın %30&apos;unu geçemez. Ocak 2026
            değişikliğiyle zorunlu otopark alanları bu %30 hesabının dışında tutuldu.
          </p>
          <p>
            Pratikte bunun anlamı şudur: emsal 1,50 olan 400 m²&apos;lik bir arsada emsale esas alan {sayi(400 * 1.5)} m²
            iken, bu sınır içinde en fazla {sayi(400 * 1.5 * 0.3)} m² emsal harici alan eklenebilir; projedeki toplam kapalı
            alan bu yüzden imar durumunda yazan rakamdan büyük çıkabilir. Belediyeler kendi imar yönetmelikleriyle listeyi %30
            sınırı içinde değiştirebildiği için kesin listeyi parselin bağlı olduğu belediyeden öğrenmek gerekir.
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
            Diğer ev ve inşaat araçları için{" "}
            <Link href="/hesaplayicilar#ev-ve-yapi">Ev, İnşaat ve Bahçe</Link>
            {" "}bölümüne, alan birimi dönüşümleri için{" "}
            <Link href="/kategoriler/alan">Alan Dönüşümleri</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            KAKS ve TAKS tanımları ile emsal harici alanlara ilişkin %30 sınırı Planlı Alanlar İmar Yönetmeliği&apos;nin 4, 5 ve
            22. maddelerine dayanır (Resmî Gazete, 3 Temmuz 2017; sonraki değişiklikleriyle). Tablolar yalnızca bu tanımlarla
            hesaplandı. Parselinize ait değerler imar durum belgesinde yer alır; bu araç imar danışmanlığının yerine geçmez.
          </p>
        </section>
      </div>
    </main>
  );
}
