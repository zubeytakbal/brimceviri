import type { Metadata } from "next";
import Link from "next/link";
import TireSizeCalculator from "../components/TireSizeCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Lastik ebadı kodu (örn. 205/55 R16) nasıl okunur?",
    answer:
      "205, lastiğin genişliğidir (mm). 55, yanak oranıdır (%) — yanak yüksekliğinin genişliğe oranı. R, radyal yapı demektir. 16 ise jantın çapıdır (inç). Yanak yüksekliği = Genişlik × (Yanak Oranı / 100) formülüyle bulunur.",
  },
  {
    question: "Farklı ebat lastik takınca hız göstergesi neden sapar?",
    answer:
      "Hız göstergesi, tekerleğin dönüş hızını orijinal lastiğin çevresine göre hıza çevirir. Farklı çapta bir lastik takıldığında tekerlek çevresi değişir, bu yüzden aynı dönüş hızında kat edilen gerçek mesafe (ve dolayısıyla gerçek hız) göstergeden farklı olur.",
  },
  {
    question: "Dış çapı çok farklı lastik takmak sorun yaratır mı?",
    answer:
      "Evet. Üreticiler genellikle orijinal ebattan %3'ten fazla dış çap sapmasını önermez; büyük sapmalar hız göstergesi/kilometre sayacı hatasına, ABS/ESP gibi elektronik sistemlerin yanlış çalışmasına ve bazı ülkelerde muayeneden geçmemeye yol açabilir. Değişiklik öncesi bir lastikçiye danışmak en güvenlisidir.",
  },
];

export const metadata: Metadata = {
  title: "Lastik Ebatı Hesaplama: Dış Çap ve Hız Göstergesi Sapması",
  description:
    "Lastik ebat kodundan (örn. 205/55 R16) dış çapı, çevreyi ve km başına devir sayısını hesapla; iki farklı ebat girerek hız göstergesi ve km sayacı sapmasını öğren.",
  alternates: {
    canonical: "/lastik-ebati-hesaplama",
  },
  openGraph: {
    title: "Lastik Ebatı Hesaplama: Dış Çap ve Hız Göstergesi Sapması",
    description:
      "Lastik ebadından dış çap, çevre ve hız göstergesi sapmasını hesaplayın.",
    url: buildSiteUrl("/lastik-ebati-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function TireSizeCalculatorPage() {
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
        name: "Lastik Ebatı Hesaplama",
        item: buildSiteUrl("/lastik-ebati-hesaplama"),
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
          <span>Lastik Ebatı Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Lastik Ebatı Hesaplama</h1>
          <p>
            Lastik ebat kodunu (genişlik/yanak oranı/jant çapı) gir:
            dış çapı, çevreyi ve km başına devir sayısını hesapla. İki
            farklı ebat girerek aralarındaki hız göstergesi sapmasını
            da görebilirsin.
          </p>
        </header>

        <TireSizeCalculator />

        <section className="category-article-content">
          <h2>Lastik ebadı kodu nasıl okunur?</h2>
          <p>
            Örneğin <strong>205/55 R16</strong> kodunda: 205, lastiğin
            genişliği (mm); 55, yanak oranı (%) — yanak yüksekliğinin
            genişliğe oranı; R, radyal yapı; 16 ise jantın çapıdır
            (inç).
          </p>

          <h2>Dış çap nasıl hesaplanır?</h2>
          <p>
            Önce yanak yüksekliği bulunur:{" "}
            <strong>Yanak Yüksekliği = Genişlik × (Yanak Oranı / 100)</strong>.
            Ardından jant çapı milimetreye çevrilip iki yanak
            yüksekliği eklenir:{" "}
            <strong>
              Dış Çap = (Jant Çapı × 25,4) + (2 × Yanak Yüksekliği)
            </strong>
            . Çevre ise{" "}
            <strong>Çevre = π × Dış Çap</strong> formülüyle, km başına
            devir sayısı da{" "}
            <strong>1.000.000 / Çevre (mm)</strong> formülüyle bulunur.
          </p>

          <h2>Hız göstergesi sapması nasıl oluşur?</h2>
          <p>
            Hız göstergesi, tekerleğin dönüş hızını orijinal lastiğin
            çevresine göre hıza çevirir. Yeni lastiğin çevresi daha
            büyükse, tekerlek her turda daha fazla mesafe kat eder ama
            gösterge bunu hesaba katmadığı için gerçek hız, gösterilen
            hızdan daha yüksek olur (çevre küçükse tam tersi geçerlidir).
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>
              Lastik ebadı kodu (örn. 205/55 R16) nasıl okunur?
            </strong>
            <br />
            205, lastiğin genişliğidir (mm). 55, yanak oranıdır (%) —
            yanak yüksekliğinin genişliğe oranı. R, radyal yapı demektir.
            16 ise jantın çapıdır (inç).
          </p>
          <p>
            <strong>
              Farklı ebat lastik takınca hız göstergesi neden sapar?
            </strong>
            <br />
            Hız göstergesi, tekerleğin dönüş hızını orijinal lastiğin
            çevresine göre hıza çevirir. Farklı çapta bir lastik
            takıldığında tekerlek çevresi değişir, bu yüzden aynı dönüş
            hızında kat edilen gerçek mesafe (ve dolayısıyla gerçek
            hız) göstergeden farklı olur.
          </p>
          <p>
            <strong>
              Dış çapı çok farklı lastik takmak sorun yaratır mı?
            </strong>
            <br />
            Evet. Üreticiler genellikle orijinal ebattan %3&apos;ten
            fazla dış çap sapmasını önermez; büyük sapmalar hız
            göstergesi/kilometre sayacı hatasına, ABS/ESP gibi
            elektronik sistemlerin yanlış çalışmasına ve bazı
            ülkelerde muayeneden geçmemeye yol açabilir. Değişiklik
            öncesi bir lastikçiye danışmak en güvenlisidir.
          </p>

          <h2>İlgili araçlar</h2>
          <p>
            Diğer otomotiv hesaplayıcıları için{" "}
            <Link href="/otomotiv-araclari">Otomotiv Araçları</Link>{" "}
            sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Lastik ebat kodu ve dış çap formülü, lastik
            üreticilerinin (ETRTO standardı) yayımladığı genel lastik
            ölçülendirme kurallarına dayanmaktadır. Aracına uygun
            lastik ebadı için her zaman aracının kullanım kılavuzuna
            veya yetkili lastikçiye danış.
          </p>
        </section>
      </div>
    </main>
  );
}
