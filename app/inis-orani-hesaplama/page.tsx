import type { Metadata } from "next";
import Link from "next/link";
import DescentRateCalculator from "../components/DescentRateCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "İniş oranı (rate of descent) nasıl hesaplanır?",
    answer:
      "Önce iniş gradyanı bulunur: Gradyan (ft/nm) = tan(İniş Açısı) × 6076,12 (1 deniz mili = 6076,12 ft). Ardından yer hızıyla çarpılıp 60'a bölünerek dakikadaki iniş oranı bulunur: İniş Oranı (ft/dk) = Yer Hızı (knot) × Gradyan (ft/nm) / 60.",
  },
  {
    question: "'Yer hızı çarpı 5' kuralı nedir?",
    answer:
      "Standart 3° yaklaşma açısı için yaygın kullanılan bir kısayoldur: İniş Oranı (ft/dk) ≈ Yer Hızı (knot) × 5. Bu, tam trigonometrik hesabın 3° için yaklaşık bir karşılığıdır; bu araç herhangi bir açı için tam sonucu verir.",
  },
];

export const metadata: Metadata = {
  title: "İniş Oranı Hesaplama (Rate of Descent)",
  description:
    "Yer hızı ve iniş açısından, dakikadaki fit cinsinden gereken iniş oranını (rate of descent) hesapla.",
  alternates: {
    canonical: "/inis-orani-hesaplama",
  },
  openGraph: {
    title: "İniş Oranı Hesaplama (Rate of Descent)",
    description:
      "Yer hızı ve iniş açısından iniş oranını hesaplayın.",
    url: buildSiteUrl("/inis-orani-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function DescentRateCalculatorPage() {
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
        name: "İniş Oranı Hesaplama",
        item: buildSiteUrl("/inis-orani-hesaplama"),
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
          <span>İniş Oranı Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>İniş Oranı Hesaplama</h1>
          <p>
            Yer hızını ve iniş açısını gir: dakikadaki fit cinsinden
            gereken iniş oranını (rate of descent) anında hesapla.
          </p>
        </header>

        <DescentRateCalculator />

        <section className="category-article-content">
          <h2>İniş oranı nasıl hesaplanır?</h2>
          <p>
            Önce iniş gradyanı bulunur:{" "}
            <strong>
              Gradyan (ft/nm) = tan(İniş Açısı) × 6076,12
            </strong>{" "}
            (1 deniz mili = 6076,12 ft). Ardından yer hızıyla çarpılıp
            60&apos;a bölünerek dakikadaki iniş oranı bulunur:{" "}
            <strong>
              İniş Oranı (ft/dk) = Yer Hızı (knot) × Gradyan (ft/nm) /
              60
            </strong>
            .
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>&quot;Yer hızı çarpı 5&quot; kuralı nedir?</strong>
            <br />
            Standart 3° yaklaşma açısı için yaygın kullanılan bir
            kısayoldur: İniş Oranı (ft/dk) ≈ Yer Hızı (knot) × 5. Bu,
            tam trigonometrik hesabın 3° için yaklaşık bir
            karşılığıdır; bu araç herhangi bir açı için tam sonucu
            verir.
          </p>

          <h2>İlgili araçlar</h2>
          <p>
            Diğer pilot araçları için{" "}
            <Link href="/pilot-araclari">Pilot Araçları</Link> sayfasına
            bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Formül, uçuş eğitiminde standart kullanılan temel
            trigonometrik yaklaşma/iniş hesabına dayanmaktadır. Bu
            araç genel bilgilendirme ve ön çalışma amaçlıdır; gerçek
            yaklaşma prosedürü için resmî yayınlar (yaklaşma
            plakaları) esas alınmalıdır.
          </p>
        </section>
      </div>
    </main>
  );
}
