import type { Metadata } from "next";
import Link from "next/link";
import ElectricityConsumptionCalculator from "../components/ElectricityConsumptionCalculator";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Elektrik Tüketimi Hesaplama: Cihaz Kaç kWh Tüketir?",
  description:
    "Cihazın gücünü (watt) ve günlük kullanım süresini gir: günlük, aylık ve yıllık elektrik tüketimini (kWh) ve isteğe bağlı olarak maliyetini hesapla.",
  alternates: {
    canonical: "/elektrik-tuketimi-hesaplama",
  },
  openGraph: {
    title: "Elektrik Tüketimi Hesaplama: Cihaz Kaç kWh Tüketir?",
    description:
      "Cihaz gücünden günlük, aylık ve yıllık elektrik tüketimini (kWh) hesaplayın.",
    url: buildSiteUrl("/elektrik-tuketimi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function ElectricityConsumptionPage() {
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
        name: "Elektrik Tüketimi Hesaplama",
        item: buildSiteUrl("/elektrik-tuketimi-hesaplama"),
      },
    ],
  };

  return (
    <main className="all-conversions-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Elektrik Tüketimi Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Elektrik Tüketimi Hesaplama</h1>
          <p>
            Cihazın gücünü (watt), günlük kaç saat çalıştığını ve ayda
            kaç gün kullanıldığını gir: günlük, aylık ve yıllık elektrik
            tüketimini (kWh) anında gör. Faturandaki kWh birim fiyatını
            eklersen tahmini maliyeti de hesaplar.
          </p>
        </header>

        <ElectricityConsumptionCalculator />

        <section className="category-article-content">
          <h2>kWh nasıl hesaplanır?</h2>
          <p>
            Elektrikli cihazların gücü watt (W) cinsinden yazılıdır;
            elektrik faturaları ise kilovatsaat (kWh) üzerinden
            hesaplanır. İkisi arasındaki dönüşüm basittir:{" "}
            <strong>kWh = (Watt × Saat) / 1000</strong>. Örneğin 1500
            watt&apos;lık bir ısıtıcı günde 2 saat çalışırsa: (1500 × 2)
            / 1000 = 3 kWh/gün tüketir. Bu günlük değer, kullanılan gün
            sayısıyla çarpılarak aylık veya yıllık tüketime çevrilir.
          </p>

          <h2>Cihazımın gücünü nereden öğrenirim?</h2>
          <p>
            Çoğu cihazın arkasında veya altında bulunan bilgi
            etiketinde, kullanım kılavuzunda ya da üreticinin ürün
            sayfasında watt (W) değeri yazılıdır. Etiket kW cinsinden
            yazıyorsa 1000 ile çarparak watt&apos;a çevirebilirsin (1 kW
            = 1000 W).
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>Neden kWh birim fiyatını sizin belirlemeniz gerekiyor da araç önermiyor?</strong>
            <br />
            Elektrik birim fiyatı abonelik tipine (mesken/ticarethane),
            tüketim dilimine ve zaman içindeki güncellemelere göre
            değişir. Yanlış/güncel olmayan bir fiyat varsayımıyla seni
            yanıltmak yerine, faturandaki gerçek kWh fiyatını kendin
            girmeni istiyoruz — bu şekilde sonuç her zaman güncel ve
            doğru kalır.
          </p>
          <p>
            <strong>Bekleme modundaki (standby) tüketimi de hesaba katmalı mıyım?</strong>
            <br />
            Bu araç yalnızca cihazın aktif çalışma süresini hesaba
            katar. Sürekli prizde takılı kalan cihazların (TV, şarj
            adaptörü gibi) bekleme modu tüketimi ayrı ve genelde çok
            küçük bir yüktür; hassas bir toplam istiyorsan bunu ayrıca
            eklemen gerekir.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            kWh dönüşüm formülü (Watt × Saat / 1000), elektrik
            dağıtım şirketlerinin ve enerji verimliliği kuruluşlarının
            yayımladığı standart tüketim hesaplama yöntemine dayanır.
          </p>
        </section>
      </div>
    </main>
  );
}
