import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Yoğunluk irtifası (density altitude) nedir, neden önemli?",
    answer:
      "Yoğunluk irtifası, hava sıcaklığı ve basıncın uçak performansına etkisini tek bir 'eşdeğer irtifa' değerinde özetler. Sıcak ve/veya yüksek irtifalı havaalanlarında hava yoğunluğu azalır; bu da motor gücünü, kanat kaldırma kuvvetini ve pervane verimini düşürür — sonuç olarak kalkış mesafesi uzar, tırmanma oranı azalır. Yüksek yoğunluk irtifası, gerçek irtifadan çok daha 'yüksekte uçuyormuş gibi' bir performans anlamına gelir.",
  },
  {
    question: "Uçuş seviyesi (Flight Level) nedir?",
    answer:
      "Uçuş seviyesi (FL), standart basınca (1013,25 hPa / 29,92 inHg) göre ayarlanmış bir altimetrenin gösterdiği irtifadır ve yüzler hanesi atılarak ifade edilir — FL350, yaklaşık 35.000 fit basınç irtifasına karşılık gelir. Belirli bir geçiş irtifasının üzerinde uçan tüm uçaklar aynı standart basınç referansını kullanır; bu da farklı uçaklar arasında dikey ayrımın (separation) güvenli şekilde sağlanmasını mümkün kılar.",
  },
  {
    question: "1 fit kaç metredir?",
    answer:
      "1 fit tam olarak 0,3048 metredir. Sivil havacılıkta irtifa (ICAO standardı gereği, Rusya ve Çin gibi az sayıda istisna dışında) geleneksel olarak fit cinsinden ifade edilir.",
  },
];

export const metadata: Metadata = {
  title: "Pilot Araçları: Yoğunluk İrtifası, Uçuş Seviyesi, Fit-Metre",
  description:
    "Pilotlar için tek sayfada toplanmış araçlar: yoğunluk irtifası (density altitude) hesaplama, uçuş seviyesi (flight level) referansı, knot ve fit birim dönüşümleri.",
  alternates: {
    canonical: "/pilot-araclari",
  },
  openGraph: {
    title: "Pilot Araçları: Yoğunluk İrtifası, Uçuş Seviyesi, Fit-Metre",
    description:
      "Yoğunluk irtifası hesaplama, uçuş seviyesi referansı, knot ve fit birim dönüşümleri tek sayfada.",
    url: buildSiteUrl("/pilot-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const flightLevelTable = [
  ["FL100", "10.000 ft", "≈ 3048 m"],
  ["FL180", "18.000 ft", "≈ 5486 m"],
  ["FL250", "25.000 ft", "≈ 7620 m"],
  ["FL350", "35.000 ft", "≈ 10.668 m"],
  ["FL410", "41.000 ft", "≈ 12.497 m"],
];

export default function PilotAraclariPage() {
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
        name: "Mesleğe Göre Araçlar",
        item: buildSiteUrl("/meslekler"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Pilot Araçları",
        item: buildSiteUrl("/pilot-araclari"),
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
          <Link href="/meslekler">Mesleğe Göre Araçlar</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Pilot Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Pilot Araçları</h1>
          <p>
            Pilotlar ve havacılık öğrencileri için hesaplama araçlarını
            ve referans bilgileri tek sayfada topladık: yoğunluk
            irtifası hesaplama, uçuş seviyesi referansı, knot ve fit
            birim dönüşümleri.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>1 fit</strong> = 0,3048 m
            </li>
            <li>
              <strong>1 knot</strong> ≈ 1,852 km/saat
            </li>
            <li>
              <strong>FL350</strong> ≈ 35.000 ft basınç irtifası
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/seyir-suresi-hesaplama">Seyir Süresi Hesaplama</Link>
              {" "}— mesafe ve hızdan (knot dahil) uçuş/seyir süresini
              hesapla.
            </li>
            <li>
              <Link href="/kategoriler/hiz">Hız Dönüşümleri</Link> —
              knot, km/saat, mph ve diğer hız birimleri.
            </li>
            <li>
              <Link href="/kategoriler/uzunluk">Uzunluk Dönüşümleri</Link>
              {" "}— fit, metre ve diğer uzunluk birimleri.
            </li>
            <li>
              <Link href="/kategoriler/basinc">Basınç Dönüşümleri</Link>
              {" "}— altimetre ayarı (QNH) için hPa, inHg ve diğer
              basınç birimleri.
            </li>
            <li>
              <Link href="/yogunluk-irtifasi-hesaplama">
                Yoğunluk İrtifası Hesaplama
              </Link>{" "}
              — basınç irtifası ve dış hava sıcaklığından (OAT)
              yoğunluk irtifasını hesapla.
            </li>
            <li>
              <Link href="/yan-ruzgar-hesaplama">
                Yan Rüzgar Bileşeni Hesaplama
              </Link>{" "}
              — rüzgar yönü, hızı ve pist yönünden yan rüzgar ve
              baş/kuyruk rüzgar bileşenini hesapla.
            </li>
            <li>
              <Link href="/inis-orani-hesaplama">İniş Oranı Hesaplama</Link>
              {" "}— yer hızı ve iniş açısından dakikadaki iniş
              oranını hesapla.
            </li>
            <li>
              <Link href="/agirlik-denge-hesaplama">
                Ağırlık ve Denge Hesaplama
              </Link>{" "}
              — yük kalemlerinin ağırlığı ve kolundan ağırlık
              merkezini (CG) hesapla.
            </li>
          </ul>

          <h2>Uçuş Seviyesi (Flight Level) Referans Tablosu</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Yaygın uçuş seviyeleri ve yaklaşık irtifa karşılıkları</caption>
              <thead>
                <tr>
                  <th scope="col">Uçuş Seviyesi</th>
                  <th scope="col">Basınç İrtifası (ft)</th>
                  <th scope="col">Yaklaşık Metre</th>
                </tr>
              </thead>
              <tbody>
                {flightLevelTable.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, index) => (
                      <td key={`${row[0]}-${index}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>
              Yoğunluk irtifası (density altitude) nedir, neden önemli?
            </strong>
            <br />
            Yoğunluk irtifası, hava sıcaklığı ve basıncın uçak
            performansına etkisini tek bir &quot;eşdeğer irtifa&quot;
            değerinde özetler. Sıcak ve/veya yüksek irtifalı
            havaalanlarında hava yoğunluğu azalır; bu da motor gücünü,
            kanat kaldırma kuvvetini ve pervane verimini düşürür —
            sonuç olarak kalkış mesafesi uzar, tırmanma oranı azalır.
          </p>
          <p>
            <strong>Uçuş seviyesi (Flight Level) nedir?</strong>
            <br />
            Uçuş seviyesi (FL), standart basınca (1013,25 hPa / 29,92
            inHg) göre ayarlanmış bir altimetrenin gösterdiği
            irtifadır ve yüzler hanesi atılarak ifade edilir — FL350,
            yaklaşık 35.000 fit basınç irtifasına karşılık gelir.
          </p>
          <p>
            <strong>1 fit kaç metredir?</strong>
            <br />
            1 fit tam olarak 0,3048 metredir. Sivil havacılıkta irtifa
            (ICAO standardı gereği) geleneksel olarak fit cinsinden
            ifade edilir.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Yoğunluk irtifası formülü, uçuş eğitiminde (FAA ve
            benzeri) yaygın kullanılan standart yaklaşık hesaplama
            yöntemine dayanmaktadır. Bu araç genel bilgilendirme ve ön
            çalışma amaçlıdır; gerçek uçuş planlaması için uçağın
            performans el kitabı (POH/AFM) ve resmî briefing
            kaynakları esas alınmalıdır.
          </p>
        </section>
      </div>
    </main>
  );
}
