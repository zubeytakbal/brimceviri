import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Ruhsatta motor gücü neden kW yazıyor, beygirgücü değil?",
    answer:
      "Avrupa Birliği düzenlemeleri, araç tescil belgelerinde resmî güç değerinin kilowatt (kW) cinsinden verilmesini şart koşar. Beygirgücü (hp/PS) değeri, tüketicilerin daha aşina olduğu geleneksel bir referans olarak ek bilgi şeklinde sunulur. 1 kW ≈ 1,35962 beygirgücüdür.",
  },
  {
    question: "Lastik ebadı kodu (örn. 205/55 R16) nasıl okunur?",
    answer:
      "205, lastiğin genişliğidir (mm). 55, yanak oranıdır (%). R, radyal yapı demektir. 16 ise jantın çapıdır (inç). Lastik Ebatı Hesaplama aracımızla bu koddan dış çapı ve hız göstergesi sapmasını hesaplayabilirsin.",
  },
  {
    question: "1 litre/100km kaç mil/galona (mpg) eşittir?",
    answer:
      "Bu iki ölçüm sistemi ters orantılıdır (biri ne kadar yakıt tükettiğini, diğeri ne kadar mesafe gidebildiğini ölçer). Yakıt Tüketimi Hesaplama aracımız bu dönüşümü otomatik yapar.",
  },
  {
    question: "Lastik üretim tarihi (DOT kodu) nasıl okunur?",
    answer:
      "Lastiğin yanağındaki DOT kodunun son 4 hanesi üretim tarihini gösterir: ilk 2 hane yılın kaçıncı haftası, son 2 hane ise yılı belirtir. Örneğin '2523' 2023'ün 25. haftasında üretildiği anlamına gelir.",
  },
];

export const metadata: Metadata = {
  title: "Otomotiv Araçları: Yakıt Tüketimi, Lastik Ebatı, Güç-Tork",
  description:
    "Araç sahipleri ve otomotiv meraklıları için tek sayfada toplanmış araçlar: yakıt tüketimi, lastik ebatı, elektrikli araç şarj süresi, motor gücü (kW/beygirgücü) ve tork dönüşümleri.",
  alternates: {
    canonical: "/otomotiv-araclari",
  },
  openGraph: {
    title: "Otomotiv Araçları: Yakıt Tüketimi, Lastik Ebatı, Güç-Tork",
    description:
      "Yakıt tüketimi, lastik ebatı, elektrikli araç şarj süresi, motor gücü ve tork dönüşümleri tek sayfada.",
    url: buildSiteUrl("/otomotiv-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const tireCodeTable = [
  ["205", "Genişlik (mm)"],
  ["55", "Yanak oranı (%)"],
  ["R", "Radyal yapı"],
  ["16", "Jant çapı (inç)"],
];

export default function OtomotivAraclariPage() {
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
        name: "Otomotiv Araçları",
        item: buildSiteUrl("/otomotiv-araclari"),
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
          <span>Otomotiv Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Otomotiv Araçları</h1>
          <p>
            Araç sahiplerinin, lastikçilerin ve otomotiv meraklılarının
            günlük olarak ihtiyaç duyduğu hesaplama araçlarını ve
            referans bilgileri tek sayfada topladık: yakıt tüketimi,
            lastik ebatı, elektrikli araç şarj süresi, motor gücü ve
            tork dönüşümleri.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>1 kW</strong> ≈ 1,36 beygirgücü
            </li>
            <li>
              <strong>Lastik ebadı</strong>: Genişlik/Yanak Oranı Rim
              (örn. 205/55 R16)
            </li>
            <li>
              <strong>Üretici toleransı</strong>: dış çap sapması
              genelde %3&apos;ü geçmemeli
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/yakit-tuketimi-hesaplama">Yakıt Tüketimi Hesaplama</Link>
              {" "}— L/100km, mpg ve diğer yakıt tüketimi birimleri
              arasında dönüşüm yap.
            </li>
            <li>
              <Link href="/elektrikli-arac-maliyet-karsilastirma">
                Elektrikli Araç mı Benzinli Araç mı?
              </Link>{" "}
              — kendi kilometren ve fiyat farkınla elektrikli aracın
              kaç yılda kendini amorti ettiğini hesapla.
            </li>
            <li>
              <Link href="/lpg-donusum-amortisman-hesaplama">
                LPG Dönüşüm Amortisman Hesaplama
              </Link>{" "}
              — kendi kilometren, tüketimin ve dönüşüm maliyetinle
              LPG&apos;nin kaç yılda kendini çıkardığını hesapla.
            </li>
            <li>
              <Link href="/ehliyet-sinifi-bulma">
                Hangi Ehliyet Sınıfı Gerekli?
              </Link>{" "}
              — aracının koltuk sayısı, ağırlığı ve römork bilgisiyle
              gereken ehliyet sınıfını hesapla.
            </li>
            <li>
              <Link href="/ehliyet-yenileme-suresi-hesaplama">
                Ehliyet Yenileme Süresi Hesaplama
              </Link>{" "}
              — ehliyet sınıfına ve veriliş tarihine göre sürücü
              belgenin ne zaman yenilenmesi gerektiğini hesapla.
            </li>
            <li>
              <Link href="/lastik-ebati-hesaplama">Lastik Ebatı Hesaplama</Link>
              {" "}— lastik kodundan dış çapı, çevreyi ve hız göstergesi
              sapmasını hesapla.
            </li>
            <li>
              <Link href="/elektrikli-arac-sarj-hesaplama">
                Elektrikli Araç Şarj Süresi Hesaplama
              </Link>
            </li>
            <li>
              <Link href="/kategoriler/guc">Güç Dönüşümleri</Link> —
              kilowatt (kW) ve beygirgücü (hp/PS) arasında dönüşüm yap.
            </li>
            <li>
              <Link href="/kategoriler/tork">Tork Dönüşümleri</Link> —
              Newton-metre (Nm) ve diğer tork birimleri.
            </li>
            <li>
              <Link href="/kategoriler/hiz">Hız Dönüşümleri</Link> —
              km/h, mph, m/s.
            </li>
            <li>
              <Link href="/kategoriler/basinc">Basınç Dönüşümleri</Link>
              {" "}— lastik basıncı için PSI, bar ve diğer basınç
              birimleri arasında dönüşüm yap.
            </li>
          </ul>

          <h2>Lastik Ebadı Kodu Nasıl Okunur?</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>
                Örnek lastik ebadı kodu: 205/55 R16
              </caption>
              <thead>
                <tr>
                  <th scope="col">Kod Parçası</th>
                  <th scope="col">Anlamı</th>
                </tr>
              </thead>
              <tbody>
                {tireCodeTable.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, index) => (
                      <td key={`${row[0]}-${index}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Lastik Üretim Tarihi (DOT Kodu) Nasıl Okunur?</h2>
          <p>
            Lastiğin yanağında bulunan DOT kodunun son 4 hanesi üretim
            tarihini gösterir: ilk 2 hane yılın kaçıncı haftası
            olduğunu, son 2 hane ise yılı belirtir. Örneğin{" "}
            <strong>&quot;2523&quot;</strong>, 2023 yılının 25.
            haftasında (Haziran ayı civarı) üretildiği anlamına gelir.
            Lastikler genellikle 6 yıl civarında (kullanılmamış olsa
            bile) değiştirilmesi önerilir, çünkü kauçuk zamanla sertleşip
            performans kaybeder.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>
              Ruhsatta motor gücü neden kW yazıyor, beygirgücü değil?
            </strong>
            <br />
            Avrupa Birliği düzenlemeleri, araç tescil belgelerinde
            resmî güç değerinin kilowatt (kW) cinsinden verilmesini
            şart koşar. Beygirgücü (hp/PS) değeri, tüketicilerin daha
            aşina olduğu geleneksel bir referans olarak ek bilgi
            şeklinde sunulur. 1 kW ≈ 1,35962 beygirgücüdür.
          </p>
          <p>
            <strong>
              Lastik ebadı kodu (örn. 205/55 R16) nasıl okunur?
            </strong>
            <br />
            205, lastiğin genişliğidir (mm). 55, yanak oranıdır (%). R,
            radyal yapı demektir. 16 ise jantın çapıdır (inç).{" "}
            <Link href="/lastik-ebati-hesaplama">
              Lastik Ebatı Hesaplama
            </Link>{" "}
            aracımızla bu koddan dış çapı ve hız göstergesi sapmasını
            hesaplayabilirsin.
          </p>
          <p>
            <strong>1 litre/100km kaç mil/galona (mpg) eşittir?</strong>
            <br />
            Bu iki ölçüm sistemi ters orantılıdır (biri ne kadar yakıt
            tükettiğini, diğeri ne kadar mesafe gidebildiğini ölçer).{" "}
            <Link href="/yakit-tuketimi-hesaplama">
              Yakıt Tüketimi Hesaplama
            </Link>{" "}
            aracımız bu dönüşümü otomatik yapar.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Lastik ebat kodu ve dış çap formülü ETRTO standardına,
            güç/beygirgücü karşılıkları AB düzenlemelerine
            dayanmaktadır. Aracına özel değerler için her zaman
            kullanım kılavuzuna veya yetkili servise danış.
          </p>
        </section>
      </div>
    </main>
  );
}
