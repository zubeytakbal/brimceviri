import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import EmbedCodeBox from "../components/EmbedCodeBox";
import InsulationPaybackCalculator from "../components/InsulationPaybackCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Yalıtım yaptırmak kaç yılda kendini çıkarır?",
    answer:
      "Bu, duvarının mevcut durumuna, eklenen yalıtımın kalınlık ve malzemesine, bölgenin iklimine ve ısıtma enerjisi fiyatına bağlıdır. Genel olarak Türkiye'de dış duvar yalıtımı 2-6 yıl arasında kendini çıkarabilir; kesin süre için yukarıdaki hesaplayıcıya kendi rakamlarını gir.",
  },
  {
    question: "Yalıtım kalınlığı arttıkça tasarruf da orantılı artar mı?",
    answer:
      "Hayır. Isıl direnç (R) kalınlıkla doğru orantılı artsa da, ısı kaybındaki azalma R'nin tersiyle ilişkilidir — yani belli bir kalınlıktan sonra ek her santimetre, öncekinden daha az ek tasarruf sağlar (azalan verim). Bu yüzden çok kalın yalıtım her zaman ekonomik olmayabilir.",
  },
  {
    question: "Bu hesaplama neyi kapsamıyor?",
    answer:
      "Yalnızca duvardan ısı iletimiyle (kondüksiyon) olan kaybı modeller. Pencere, kapı, çatı, hava sızdırmazlığı, güneş kazancı gibi diğer etkenler dahil değildir; gerçek enerji kimlik belgesi hesaplamaları çok daha kapsamlıdır.",
  },
];

/** [ad, kalınlık (cm), ısı iletkenliği λ (W/mK)] */
const LEVHALAR: Array<[string, number, number]> = [
  ["3 cm EPS", 3, 0.04],
  ["5 cm EPS", 5, 0.04],
  ["5 cm grafitli EPS", 5, 0.032],
  ["8 cm EPS", 8, 0.04],
  ["10 cm EPS", 10, 0.04],
  ["5 cm taş yünü", 5, 0.036],
];
const sayi = (n: number, basamak = 0) => n.toLocaleString("tr-TR", { maximumFractionDigits: basamak });

export const metadata: Metadata = {
  title: "Mantolama Kaç Yılda Kendini Öder? Yalıtım Tasarruf Hesaplama",
  description:
    "Duvar alanı, mevcut duvar ve eklenecek yalıtım malzemesiyle yıllık enerji tasarrufunu ve yalıtımın kaç yılda kendini çıkardığını hesapla.",
  alternates: {
    canonical: "/yalitim-amortisman-hesaplama",
  },
  openGraph: {
    title: "Yalıtım Amortisman Hesaplama (Kaç Yılda Kendini Çıkarır?)",
    description: "Kendi rakamlarınla yalıtımın kaç yılda kendini çıkardığını hesapla.",
    url: buildSiteUrl("/yalitim-amortisman-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function InsulationPaybackPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Yalıtım Amortisman Hesaplama", item: buildSiteUrl("/yalitim-amortisman-hesaplama") },
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
          <span>Yalıtım Amortisman Hesaplama</span>
        </nav>

        <div className="page-top-row">
          <header className="all-conversions-header">
            <h1>Mantolama Kaç Yılda Kendini Öder? Yalıtım Tasarruf Hesaplama</h1>
            <p>
              Duvar alanı, mevcut duvar ve eklenecek yalıtım malzemesiyle
              yıllık enerji tasarrufunu ve yalıtımın kaç yılda kendini
              çıkardığını hesapla.
            </p>
          </header>

          <EmbedCodeBox
            embedPath="/embed/yalitim-amortisman-hesaplama"
            title="Yalıtım Amortisman Hesaplama"
            height={780}
            maxWidth={560}
          />
        </div>

        <InsulationPaybackCalculator />

        <section className="category-article-content">
          <h2 id="tasarruf">Mantolama duvardan kaçan ısıyı ne kadar azaltır?</h2>
          <p>
            Duvardan kaçan ısı, duvarın ısı geçirgenlik katsayısıyla (U, W/m²K) orantılıdır. Yalıtım levhası duvara{" "}
            <strong>kalınlık ÷ ısı iletkenliği</strong> kadar ısıl direnç ekler ve yeni U değeri{" "}
            <strong>1 ÷ (1/U + kalınlık/λ)</strong> olur. Tablo, yalıtımsız bir tuğla duvar için örnek olarak U = 1,5 W/m²K
            alınarak hesaplandı.
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Levha</th>
                  <th>Yeni U</th>
                  <th>Isı kaybındaki azalma</th>
                </tr>
              </thead>
              <tbody>
                {LEVHALAR.map(([ad, cm, lambda]) => {
                  const u = 1 / (1 / 1.5 + cm / 100 / lambda);
                  return (
                    <tr key={ad}>
                      <td>{ad}</td>
                      <td>{sayi(u, 2)} W/m²K</td>
                      <td>%{sayi((1 - u / 1.5) * 100)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p>
            Tablodan görülen azalan getiri, kalınlık seçimindeki asıl sorudur: 3 cm&apos;den 5 cm&apos;ye geçmek kaybı belirgin
            biçimde azaltırken, 8 cm&apos;den 10 cm&apos;ye geçişin ek katkısı küçüktür. Bu oran yalnızca duvar içindir; evin
            toplam ısı kaybında pencere, çatı ve hava sızıntısının da payı olduğundan faturadaki düşüş duvar
            kaybındaki azalmadan küçük çıkar. Kaç yılda kendini ödediğini görmek için yukarıdaki araca kendi duvar alanınızı,
            ısıtma fiyatınızı ve mantolama teklifini girin.
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
            Isı iletimi ve malzeme ısıl iletkenlik tablosu için{" "}
            <Link href="/hesaplayicilar/isi-iletimi">Isı İletimi Hesaplayıcısı</Link>
            {" "}sayfasına, diğer inşaat hesaplamaları için{" "}
            <Link href="/hesaplayicilar#ev-ve-yapi">Ev, İnşaat ve Bahçe</Link>
            {" "}sayfasına bakabilirsin. Isıtma sistemi seçimi için{" "}
            <Link href="/isi-pompasi-kombi-karsilastirma">Isı Pompası - Kombi Karşılaştırma</Link>,{" "}
            <Link href="/kombi-klima-isitma-maliyeti-karsilastirma">Kombi - Klima Isıtma Maliyeti Karşılaştırma</Link>
            {" "}sayfalarına, güneş enerjisi yatırımı için{" "}
            <Link href="/gunes-paneli-amortisman-hesaplama">Güneş Paneli Amortisman Hesaplama</Link>
            {" "}sayfasına, aydınlatma tasarrufu için{" "}
            <Link href="/led-ampul-tasarruf-hesaplama">LED Ampul Tasarruf Hesaplama</Link>
            {" "}sayfasına, mantolama malzemesi ihtiyacı için{" "}
            <Link href="/mantolama-hesaplama">Mantolama Hesaplama</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Duvar ve yalıtım malzemesi ısıl iletkenlik değerleri TS 825
            standardı kapsamındaki tipik referans aralıklarına
            dayanır; hesaplama, seri ısıl direnç (R = kalınlık/λ)
            prensibine göre yapılır.
          </p>
        </section>
      </div>
    </main>
  );
}
