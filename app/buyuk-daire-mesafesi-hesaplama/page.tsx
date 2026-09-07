import type { Metadata } from "next";
import Link from "next/link";
import GreatCircleCalculator from "../components/GreatCircleCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Büyük daire (great circle) rotası nedir, neden kullanılır?",
    answer:
      "Büyük daire rotası, Dünya'nın küresel yüzeyinde iki nokta arasındaki en kısa yoldur. Uzun okyanus geçişlerinde ve uzun menzilli uçuşlarda, sabit pusula rotası (rhumb line) izlemek yerine büyük daire rotası izlemek belirgin şekilde daha az mesafe (dolayısıyla daha az yakıt ve süre) gerektirir.",
  },
  {
    question: "Büyük daire rotasında rota neden sürekli değişir?",
    answer:
      "Büyük daire, düz bir çizgi değil kavisli bir hattır (Dünya'nın küresel şekli nedeniyle); bu yüzden bu rotayı izleyen bir gemi/uçak sabit bir pusula yönü tutamaz, rotasını sürekli küçük adımlarla güncellemesi gerekir. Bu araçtaki 'başlangıç rotası' yalnızca hareketin başındaki yöndür.",
  },
];

export const metadata: Metadata = {
  title: "Büyük Daire Mesafesi Hesaplama (Great Circle Distance)",
  description:
    "İki nokta arasındaki enlem/boylam koordinatlarından, Haversine formülüyle büyük daire mesafesini (deniz mili/km) ve başlangıç rotasını hesapla.",
  alternates: {
    canonical: "/buyuk-daire-mesafesi-hesaplama",
  },
  openGraph: {
    title: "Büyük Daire Mesafesi Hesaplama (Great Circle Distance)",
    description:
      "İki koordinat arasındaki büyük daire mesafesini ve başlangıç rotasını hesaplayın.",
    url: buildSiteUrl("/buyuk-daire-mesafesi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function GreatCircleCalculatorPage() {
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
        name: "Büyük Daire Mesafesi Hesaplama",
        item: buildSiteUrl("/buyuk-daire-mesafesi-hesaplama"),
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
          <span>Büyük Daire Mesafesi Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Büyük Daire Mesafesi Hesaplama</h1>
          <p>
            İki noktanın enlem ve boylamını gir: Haversine formülüyle
            aralarındaki en kısa küre-üzeri (büyük daire) mesafeyi ve
            başlangıç rotasını anında hesapla.
          </p>
        </header>

        <GreatCircleCalculator />

        <section className="category-article-content">
          <h2>Büyük daire mesafesi nasıl hesaplanır?</h2>
          <p>
            Haversine formülü kullanılır — iki nokta arasındaki
            merkezi açıyı bulan, kürenin tam geometrisine dayanan
            (yaklaşık değil) bir formüldür:
          </p>
          <p>
            <strong>
              a = sin²(Δφ/2) + cos φ1 × cos φ2 × sin²(Δλ/2)
            </strong>
            <br />
            <strong>c = 2 × atan2(√a, √(1−a))</strong>
          </p>
          <p>
            Küre üzerinde 1 yay dakikası tanım gereği tam olarak 1
            deniz miline eşit olduğu için, mesafe doğrudan{" "}
            <strong>c (derece) × 60</strong> ile deniz mili cinsinden
            bulunur.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>
              Büyük daire (great circle) rotası nedir, neden kullanılır?
            </strong>
            <br />
            Büyük daire rotası, Dünya&apos;nın küresel yüzeyinde iki
            nokta arasındaki en kısa yoldur. Uzun okyanus geçişlerinde
            ve uzun menzilli uçuşlarda, sabit pusula rotası (rhumb
            line) izlemek yerine büyük daire rotası izlemek belirgin
            şekilde daha az mesafe gerektirir.
          </p>
          <p>
            <strong>
              Büyük daire rotasında rota neden sürekli değişir?
            </strong>
            <br />
            Büyük daire, düz bir çizgi değil kavisli bir hattır; bu
            yüzden bu rotayı izleyen bir gemi/uçak sabit bir pusula
            yönü tutamaz, rotasını sürekli küçük adımlarla
            güncellemesi gerekir.
          </p>

          <h2>İlgili araçlar</h2>
          <p>
            Diğer kaptan araçları için{" "}
            <Link href="/kaptan-araclari">Kaptan Araçları</Link>, pilot
            araçları için{" "}
            <Link href="/pilot-araclari">Pilot Araçları</Link> sayfasına,
            iki konum arasındaki teorik minimum ağ gecikmesi için{" "}
            <Link href="/ping-gecikme-hesaplama">Ping / Gecikme Hesaplama</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Haversine formülü, küresel trigonometrinin standart, kesin
            bir uygulamasıdır ve seyir/navigasyon yazılımlarında yaygın
            kullanılır. Gerçek Dünya tam bir küre olmadığı
            (hafif basık elipsoit) için çok uzun mesafelerde küçük bir
            sapma olabilir; hassas navigasyon için sertifikalı
            ekipman kullanılmalıdır.
          </p>
        </section>
      </div>
    </main>
  );
}
