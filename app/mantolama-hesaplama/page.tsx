import type { Metadata } from "next";
import Link from "next/link";
import InsulationCalculator from "../components/InsulationCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Mantolama levhaları hangi ebatlarda satılır?",
    answer:
      "En yaygın EPS/XPS mantolama levha ebadı 100 × 50 cm'dir (0,5 m²). Bazı üreticiler 120 × 60 cm gibi farklı ebatlar da sunar; aracımızda kullandığın levhanın gerçek ebadını girebilirsin.",
  },
  {
    question: "Fire payı olarak ne kadar eklemeliyim?",
    answer:
      "Düz duvarlarda %10 fire payı genellikle yeterlidir. Pencere/kapı boşluğu çok, köşesi ve girintisi fazla olan cephelerde %15-20 fire payı kullanmak daha güvenlidir.",
  },
];

export const metadata: Metadata = {
  title: "Mantolama Hesaplama: Yalıtım Levhası Adedi",
  description:
    "Dış cephe alanını ve mantolama levha ebadını gir; fire payı dahil gereken yalıtım levhası adedini anında hesapla.",
  alternates: {
    canonical: "/mantolama-hesaplama",
  },
  openGraph: {
    title: "Mantolama Hesaplama: Yalıtım Levhası Adedi",
    description:
      "Dış cephe alanından, fire payı dahil gereken mantolama/yalıtım levhası adedini hesaplayın.",
    url: buildSiteUrl("/mantolama-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function InsulationCalculatorPage() {
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
        name: "Mantolama Hesaplama",
        item: buildSiteUrl("/mantolama-hesaplama"),
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
          <span>Mantolama Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Mantolama (Yalıtım) Hesaplama</h1>
          <p>
            Kaplanacak dış cephe alanını ve mantolama levha ebadını gir:
            fire payı dahil gereken yalıtım levhası adedini anında
            hesapla.
          </p>
        </header>

        <InsulationCalculator />

        <section className="category-article-content">
          <h2>Mantolama levhası adedi nasıl hesaplanır?</h2>
          <p>
            Önce tek bir levhanın alanı bulunur:{" "}
            <strong>Levha Alanı = (Genişlik / 100) × (Yükseklik / 100)</strong>{" "}
            (cm cinsinden girilen ölçüler metreye çevrilir). Kaplanacak
            alana fire payı eklenir:{" "}
            <strong>Fire Payı Dahil Alan = Alan × (1 + Fire Payı / 100)</strong>.
            Son olarak bu alan, levha alanına bölünüp yukarı
            yuvarlanarak gereken levha adedi bulunur.
          </p>

          <h2>Mantolama levhaları hangi ebatlarda satılır?</h2>
          <p>
            En yaygın EPS/XPS mantolama levha ebadı 100 × 50 cm&apos;dir
            (0,5 m²). Bazı üreticiler 120 × 60 cm gibi farklı ebatlar
            da sunar; aracımızda kullandığın levhanın gerçek ebadını
            girebilirsin.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>Fire payı olarak ne kadar eklemeliyim?</strong>
            <br />
            Düz duvarlarda %10 fire payı genellikle yeterlidir.
            Pencere/kapı boşluğu çok, köşesi ve girintisi fazla olan
            cephelerde %15-20 fire payı kullanmak daha güvenlidir.
          </p>

          <h2>İlgili araçlar</h2>
          <p>
            Mantolama öncesi veya sonrası ilgili diğer inşaat
            hesaplayıcıları için{" "}
            <Link href="/insaatci-araclari">İnşaatçı Araçları</Link>{" "}
            sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Levha ebadı ve fire payı değerleri, Türkiye piyasasında
            yaygın kullanılan mantolama/yalıtım ürünü standartlarına
            dayanmaktadır. Isı yalıtım kalınlığı ve malzeme seçimi
            (yönetmelik uyumluluğu dahil) için bir mimar veya makine
            mühendisiyle çalışılmalıdır.
          </p>
        </section>
      </div>
    </main>
  );
}
