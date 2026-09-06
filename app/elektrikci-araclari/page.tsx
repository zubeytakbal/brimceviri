import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "1 kW kaç amper eder?",
    answer:
      "Bu, gerilime ve faz sayısına göre değişir. Tek faz 230V'ta yaklaşık 4,3 A, üç faz 400V'ta yaklaşık 1,4 A'dır (güç faktörü 1 varsayımıyla). Kesin değeri, gerilim ve güç faktörünü girerek kW ↔ Amper Hesaplama aracımızla bulabilirsin.",
  },
  {
    question: "B tipi ve C tipi sigorta arasındaki fark nedir?",
    answer:
      "Bu, sigortanın anlık (kısa devre) açma akımı eşiğini belirler. B tipi, anma akımının 3-5 katında açar ve aydınlatma/priz gibi düşük ani akımlı devrelerde kullanılır. C tipi, 5-10 katında açar ve motor, transformatör gibi orta seviye ani akım (inrush current) çeken yüklerde tercih edilir. D tipi ise 10-20 kat ile büyük motor ve transformatör gibi çok yüksek ani akımlı yükler içindir.",
  },
  {
    question: "Kablo kesiti nasıl belirlenir?",
    answer:
      "Kablo kesiti iki kritere göre belirlenir: akım taşıma kapasitesi (termal sınır) ve izin verilen gerilim düşümü. Kablo Kesiti Hesaplama aracımız gerilim düşümü kriterine göre gereken minimum kesiti hesaplar; nihai seçimde kablonun akım taşıma kapasitesinin de (üreticinin veya ilgili standardın tablosuna göre) yeterli olduğu kontrol edilmelidir.",
  },
];

export const metadata: Metadata = {
  title: "Elektrikçi Araçları: Kablo Kesiti, Gerilim Düşümü, Amper Hesaplama",
  description:
    "Elektrikçi ve elektrik mühendisleri için tek sayfada toplanmış araçlar: kablo kesiti, gerilim düşümü, motor akımı, kW-amper hesaplama, Ohm Yasası ve sigorta/kablo renk kodu referans tabloları.",
  alternates: {
    canonical: "/elektrikci-araclari",
  },
  openGraph: {
    title: "Elektrikçi Araçları: Kablo Kesiti, Gerilim Düşümü, Amper Hesaplama",
    description:
      "Kablo kesiti, gerilim düşümü, motor akımı, kW-amper hesaplama ve elektrik referans tabloları tek sayfada.",
    url: buildSiteUrl("/elektrikci-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const breakerRatingTable = [
  ["6 A", "Küçük aydınlatma hatları"],
  ["10 A", "Aydınlatma devreleri"],
  ["16 A", "Priz devreleri (standart oda)"],
  ["20 A", "Mutfak, yoğun priz hattı"],
  ["25 A", "Klima, elektrikli fırın gibi tekil yükler"],
  ["32 A", "Elektrikli ocak, yoğun yük hatları"],
  ["40 A", "Ana dağıtım alt hatları"],
  ["50 A", "Ana dağıtım alt hatları (yüksek yük)"],
  ["63 A", "Bina/daire ana sigortası (tipik)"],
];

const breakerTypeTable = [
  ["B Tipi", "3-5 × In", "Aydınlatma, priz devreleri, konut tesisatı"],
  ["C Tipi", "5-10 × In", "Motor, transformatör gibi orta ani akımlı yükler"],
  ["D Tipi", "10-20 × In", "Büyük motor, transformatör, X-ray gibi yüksek ani akımlı yükler"],
];

const wireColorTable = [
  ["Faz (L1 / Line)", "Kahverengi"],
  ["Faz (L2)", "Siyah"],
  ["Faz (L3)", "Gri"],
  ["Nötr (N)", "Mavi"],
  ["Toprak (PE)", "Sarı-Yeşil (çizgili)"],
];

const gridVoltageTable = [
  ["Tek Faz (Konut)", "230 V", "50 Hz"],
  ["Üç Faz (Sanayi/Ticari)", "400 V", "50 Hz"],
];

const awgTable = [
  ["14 AWG", "≈ 2,08 mm² (yaygın karşılık: 2,5 mm²)"],
  ["12 AWG", "≈ 3,31 mm² (yaygın karşılık: 4 mm²)"],
  ["10 AWG", "≈ 5,26 mm² (yaygın karşılık: 6 mm²)"],
  ["8 AWG", "≈ 8,37 mm² (yaygın karşılık: 10 mm²)"],
  ["6 AWG", "≈ 13,3 mm² (yaygın karşılık: 16 mm²)"],
];

export default function ElektrikciAraclariPage() {
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
        name: "Elektrikçi Araçları",
        item: buildSiteUrl("/elektrikci-araclari"),
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
          <span>Elektrikçi Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Elektrikçi Araçları</h1>
          <p>
            Elektrikçi ve elektrik mühendislerinin saha ve proje
            işlerinde kullandığı hesaplama araçlarını ve referans
            bilgileri tek sayfada topladık: kablo kesiti, gerilim
            düşümü, motor akımı, güç-akım dönüşümü ve sigorta/kablo
            standartları.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>1 kW</strong> ≈ 4,3 A (tek faz 230V)
            </li>
            <li>
              <strong>1 kW</strong> ≈ 1,4 A (üç faz 400V)
            </li>
            <li>
              <strong>Standart sigorta kademeleri</strong>: 6-63 A
              arası
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/muhendislik-hesaplayicilari/elektrik-hesaplari/kablo-kesiti-hesaplama">
                Kablo Kesiti Hesaplama
              </Link>{" "}
              — gerilim, akım, uzunluk ve izin verilen gerilim düşümünden
              gereken minimum kablo kesitini hesapla.
            </li>
            <li>
              <Link href="/muhendislik-hesaplayicilari/elektrik-hesaplari/gerilim-dusumu-hesaplama">
                Gerilim Düşümü Hesaplama
              </Link>{" "}
              — mevcut kablo kesiti ve hat uzunluğuna göre gerilim
              düşümünü hesapla.
            </li>
            <li>
              <Link href="/muhendislik-hesaplayicilari/elektrik-hesaplari/motor-akimi-hesaplama">
                Motor Akımı Hesaplama
              </Link>{" "}
              — motor gücü, gerilim ve güç faktöründen çekilen akımı
              hesapla.
            </li>
            <li>
              <Link href="/muhendislik-hesaplayicilari/elektrik-hesaplari/kw-to-amper-hesaplama">
                kW → Amper Hesaplama
              </Link>{" "}
              /{" "}
              <Link href="/muhendislik-hesaplayicilari/elektrik-hesaplari/amper-to-kw-hesaplama">
                Amper → kW Hesaplama
              </Link>
            </li>
            <li>
              <Link href="/hesaplayicilar/ohm-yasasi">Ohm Yasası Hesaplayıcısı</Link>
              {" "}— gerilim, akım ve direnç arasında dönüşüm yap.
            </li>
            <li>
              <Link href="/elektrik-tuketimi-hesaplama">Elektrik Tüketimi Hesaplama</Link>
              {" "}— cihazların günlük/aylık kWh tüketimini ve tahmini
              faturasını hesapla.
            </li>
            <li>
              <Link href="/kategoriler/elektrik">Volt / Amper Birim Dönüşümleri</Link>
              {" "}·{" "}
              <Link href="/kategoriler/direnc">Direnç (Ohm) Dönüşümleri</Link>
              {" "}·{" "}
              <Link href="/kategoriler/kapasitans">Kapasitans (Farad) Dönüşümleri</Link>
              {" "}·{" "}
              <Link href="/kategoriler/enduktans">Endüktans (Henry) Dönüşümleri</Link>
              {" "}·{" "}
              <Link href="/kategoriler/elektrik-yuku">Elektrik Yükü (Coulomb) Dönüşümleri</Link>
            </li>
            <li>
              <Link href="/awg-mm2-cevirici">AWG - mm² Çevirici</Link>
              {" "}— Amerikan tel gauge (AWG) ölçüsü ile mm² kesit alanı
              arasında dönüşüm yap.
            </li>
            <li>
              <Link href="/led-ampul-tasarruf-hesaplama">LED Ampul Tasarruf Hesaplama</Link>
              {" "}— akkor/halojen ampulden LED&apos;e geçişin yıllık
              tasarrufunu ve amortisman süresini hesapla.
            </li>
            <li>
              <Link href="/gunes-paneli-amortisman-hesaplama">
                Güneş Paneli Amortisman Hesaplama
              </Link>{" "}
              — sistem gücü ve bölgeye göre güneş panelinin kaç
              yılda kendini çıkardığını hesapla.
            </li>
          </ul>

          <h2>Sigorta (Otomat) Amper Kademeleri</h2>
          <p>
            IEC 60898 standardına göre yaygın kullanılan tercih edilen
            (preferred) sigorta anma akımı değerleri ve tipik kullanım
            alanları:
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Standart sigorta (otomat) amper kademeleri</caption>
              <thead>
                <tr>
                  <th scope="col">Anma Akımı</th>
                  <th scope="col">Tipik Kullanım</th>
                </tr>
              </thead>
              <tbody>
                {breakerRatingTable.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, index) => (
                      <td key={`${row[0]}-${index}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Bu değerler standart üretim kademeleridir; bir devre için
            doğru sigorta seçimi kablo kesiti, yük tipi ve toplam
            tesisatın projesine göre belirlenmelidir.
          </p>

          <h2>Sigorta Tip Karakteristikleri (B / C / D)</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Sigorta tip karakteristikleri ve anlık açma akımı</caption>
              <thead>
                <tr>
                  <th scope="col">Tip</th>
                  <th scope="col">Anlık Açma Akımı</th>
                  <th scope="col">Tipik Kullanım</th>
                </tr>
              </thead>
              <tbody>
                {breakerTypeTable.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, index) => (
                      <td key={`${row[0]}-${index}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Kablo Renk Kodları (IEC 60446)</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Faz, nötr ve toprak iletkeni standart renk kodları</caption>
              <thead>
                <tr>
                  <th scope="col">İletken</th>
                  <th scope="col">Standart Renk</th>
                </tr>
              </thead>
              <tbody>
                {wireColorTable.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, index) => (
                      <td key={`${row[0]}-${index}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Türkiye Şebeke Gerilimi</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Türkiye&apos;de yaygın şebeke gerilimleri</caption>
              <thead>
                <tr>
                  <th scope="col">Sistem</th>
                  <th scope="col">Gerilim</th>
                  <th scope="col">Frekans</th>
                </tr>
              </thead>
              <tbody>
                {gridVoltageTable.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, index) => (
                      <td key={`${row[0]}-${index}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>AWG - mm² Kablo Kesiti Karşılıkları</h2>
          <p>
            İthal ekipman veya ABD/Kanada kaynaklı şemalarda kablo
            kesitleri genellikle AWG (American Wire Gauge)
            cinsindendir. Yaklaşık metrik karşılıkları:
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>AWG kablo kesiti - mm² yaklaşık karşılıkları</caption>
              <thead>
                <tr>
                  <th scope="col">AWG</th>
                  <th scope="col">Metrik Karşılık</th>
                </tr>
              </thead>
              <tbody>
                {awgTable.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, index) => (
                      <td key={`${row[0]}-${index}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Bu tablo yalnızca kesit alanı karşılığını gösterir; akım
            taşıma kapasitesi yalıtım tipi ve montaj yöntemine göre
            değiştiğinden, gerçek proje için üreticinin veya ilgili
            standardın (IEC/TSE) tablosuna bakılmalıdır.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>1 kW kaç amper eder?</strong>
            <br />
            Bu, gerilime ve faz sayısına göre değişir. Tek faz 230V&apos;ta
            yaklaşık 4,3 A, üç faz 400V&apos;ta yaklaşık 1,4 A&apos;dır (güç
            faktörü 1 varsayımıyla). Kesin değeri, gerilim ve güç
            faktörünü girerek{" "}
            <Link href="/muhendislik-hesaplayicilari/elektrik-hesaplari/kw-to-amper-hesaplama">
              kW ↔ Amper Hesaplama
            </Link>{" "}
            aracımızla bulabilirsin.
          </p>
          <p>
            <strong>B tipi ve C tipi sigorta arasındaki fark nedir?</strong>
            <br />
            Bu, sigortanın anlık (kısa devre) açma akımı eşiğini
            belirler. B tipi, anma akımının 3-5 katında açar ve
            aydınlatma/priz gibi düşük ani akımlı devrelerde kullanılır.
            C tipi, 5-10 katında açar ve motor, transformatör gibi orta
            seviye ani akım (inrush current) çeken yüklerde tercih
            edilir. D tipi ise 10-20 kat ile büyük motor ve transformatör
            gibi çok yüksek ani akımlı yükler içindir.
          </p>
          <p>
            <strong>Kablo kesiti nasıl belirlenir?</strong>
            <br />
            Kablo kesiti iki kritere göre belirlenir: akım taşıma
            kapasitesi (termal sınır) ve izin verilen gerilim düşümü.{" "}
            <Link href="/muhendislik-hesaplayicilari/elektrik-hesaplari/kablo-kesiti-hesaplama">
              Kablo Kesiti Hesaplama
            </Link>{" "}
            aracımız gerilim düşümü kriterine göre gereken minimum
            kesiti hesaplar; nihai seçimde kablonun akım taşıma
            kapasitesinin de (üreticinin veya ilgili standardın
            tablosuna göre) yeterli olduğu kontrol edilmelidir.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Sigorta anma akımı kademeleri IEC 60898-1 standardındaki
            tercih edilen değerlere, kablo renk kodları IEC 60446
            standardına dayanmaktadır. Bu sayfa yalnızca referans ve
            hesaplama amaçlıdır; nihai tesisat kararları için her zaman
            yetkili bir elektrik mühendisi/elektrikçiye ve yürürlükteki
            yönetmeliklere (TEDAŞ, TSE) başvurulmalıdır.
          </p>
        </section>
      </div>
    </main>
  );
}
