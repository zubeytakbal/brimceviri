import type { Metadata } from "next";
import Link from "next/link";
import TransitTimeCalculator from "../components/TransitTimeCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Knot ile deniz mili arasındaki ilişki nedir?",
    answer:
      "Knot, tanım gereği saatte kat edilen deniz mili sayısıdır (1 knot = 1 deniz mili/saat). Bu yüzden mesafe deniz mili, hız knot cinsinden girildiğinde süre hesabı doğrudan ve kesindir: Süre (saat) = Mesafe (nm) / Hız (knot).",
  },
  {
    question: "1 deniz mili kaç km'dir?",
    answer:
      "1 deniz mili tam olarak 1852 metre, yani 1,852 km'dir. Bu değer, Dünya'nın enlem dairesi üzerinde 1 dakikalık yay uzunluğuna dayanır ve uluslararası olarak standartlaştırılmıştır.",
  },
];

export const metadata: Metadata = {
  title: "Seyir Süresi Hesaplama: Mesafe ve Hızdan Süre Bulma",
  description:
    "Mesafe (deniz mili, km veya mil) ve hızı (knot, km/saat veya mph) gir; klasik navigasyon formülüyle seyir süresini saat ve dakika olarak hesapla.",
  alternates: {
    canonical: "/seyir-suresi-hesaplama",
  },
  openGraph: {
    title: "Seyir Süresi Hesaplama: Mesafe ve Hızdan Süre Bulma",
    description:
      "Mesafe ve hızdan, klasik navigasyon formülüyle seyir süresini hesaplayın.",
    url: buildSiteUrl("/seyir-suresi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function TransitTimeCalculatorPage() {
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
        name: "Seyir Süresi Hesaplama",
        item: buildSiteUrl("/seyir-suresi-hesaplama"),
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
          <span>Seyir Süresi Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Seyir Süresi Hesaplama</h1>
          <p>
            Mesafeyi (deniz mili, km veya mil) ve hızı (knot, km/saat
            veya mph) gir: klasik navigasyon formülüyle seyir süresini
            saat ve dakika olarak anında hesapla.
          </p>
        </header>

        <TransitTimeCalculator />

        <section className="category-article-content">
          <h2>Seyir süresi nasıl hesaplanır?</h2>
          <p>
            Temel navigasyon formülü basittir:{" "}
            <strong>Süre = Mesafe / Hız</strong>. Deniz mili ve knot
            birbiriyle doğrudan uyumludur çünkü{" "}
            <strong>1 knot = 1 deniz mili/saat</strong> olarak
            tanımlanmıştır — bu yüzden pilotlar ve gemi kaptanları
            genellikle mesafeyi deniz mili, hızı knot cinsinden
            kullanarak süreyi doğrudan hesaplar.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>Knot ile deniz mili arasındaki ilişki nedir?</strong>
            <br />
            Knot, tanım gereği saatte kat edilen deniz mili sayısıdır
            (1 knot = 1 deniz mili/saat). Bu yüzden mesafe deniz mili,
            hız knot cinsinden girildiğinde süre hesabı doğrudan ve
            kesindir: Süre (saat) = Mesafe (nm) / Hız (knot).
          </p>
          <p>
            <strong>1 deniz mili kaç km&apos;dir?</strong>
            <br />
            1 deniz mili tam olarak 1852 metre, yani 1,852 km&apos;dir.
            Bu değer, Dünya&apos;nın enlem dairesi üzerinde 1 dakikalık
            yay uzunluğuna dayanır ve uluslararası olarak
            standartlaştırılmıştır.
          </p>

          <h2>İlgili araçlar</h2>
          <p>
            Diğer havacılık araçları için{" "}
            <Link href="/pilot-araclari">Pilot Araçları</Link>, denizcilik
            araçları için{" "}
            <Link href="/kaptan-araclari">Kaptan Araçları</Link> sayfasına,
            deniz mili ve fit birimi dönüşümleri için{" "}
            <Link href="/kategoriler/uzunluk">Uzunluk Dönüşümleri</Link>{" "}
            sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Deniz mili tanımı ve knot ilişkisi, uluslararası denizcilik
            ve havacılık standartlarına dayanan sabit, değişmeyen
            fiziksel tanımlardır.
          </p>
        </section>
      </div>
    </main>
  );
}
