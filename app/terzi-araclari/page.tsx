import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Türkiye beden numarası hangi sisteme denk gelir?",
    answer:
      "Türkiye (TR) beden numaralandırması genel olarak Avrupa (EU) sistemiyle aynıdır. ABD (US) ve İngiltere (UK) sistemleri farklı sayılar kullanır — Beden Ölçüsü Çevirici aracımızla karşılıklarını görebilirsin.",
  },
  {
    question: "Yüzük ölçüsü nasıl ölçülür?",
    answer:
      "En doğru yöntem, elindeki bir yüzüğün iç çapını ölçmek ya da bir ip/kağıt şeridini parmağına sarıp uzunluğunu ölçmektir. Yüzük Ölçüsü Çevirici aracımız bu ölçüyü TR, Avrupa, ABD ve İngiltere sistemlerine çevirir.",
  },
];

export const metadata: Metadata = {
  title: "Terzi Araçları: Beden, Yüzük ve Ayakkabı Ölçüsü Çevirme",
  description:
    "Terzi ve moda sektöründe çalışanlar için tek sayfada toplanmış araçlar: beden ölçüsü (TR/EU/US/UK), yüzük ölçüsü ve ayakkabı numarası çevirme.",
  alternates: {
    canonical: "/terzi-araclari",
  },
  openGraph: {
    title: "Terzi Araçları: Beden, Yüzük ve Ayakkabı Ölçüsü Çevirme",
    description:
      "Beden, yüzük ve ayakkabı ölçüsü çevirme araçları tek sayfada.",
    url: buildSiteUrl("/terzi-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function TerziAraclariPage() {
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
        name: "Terzi Araçları",
        item: buildSiteUrl("/terzi-araclari"),
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
          <span>Terzi Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Terzi Araçları</h1>
          <p>
            Terzi, moda sektörü çalışanları ve kıyafet/aksesuar satın
            alırken doğru ölçüyü bulmak isteyen herkes için ölçü
            çevirme araçlarını tek sayfada topladık: beden, yüzük ve
            ayakkabı numarası.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>TR beden</strong> = EU beden (aynı numaralandırma)
            </li>
            <li>
              <strong>Kadın EU 38</strong> ≈ US 8 ≈ UK 10
            </li>
            <li>
              <strong>Erkek gömlek M</strong> ≈ 40 cm yaka ≈ TR 48-50
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/beden-olcusu-cevirici">Beden Ölçüsü Çevirici</Link>
              {" "}— kadın giyim bedenini TR/EU, US, UK arasında; erkek
              gömlek bedenini yaka/göğüs ölçüsüne göre çevir.
            </li>
            <li>
              <Link href="/yuzuk-olcusu-cevirici">Yüzük Ölçüsü Çevirici</Link>
              {" "}— yüzük ölçüsünü TR, Avrupa, ABD ve İngiltere
              sistemleri arasında çevir.
            </li>
            <li>
              <Link href="/ayakkabi-numarasi-cevirme">
                Ayakkabı Numarası Çevirici
              </Link>{" "}
              — marka bazlı (Nike, Adidas, Puma, New Balance, Converse)
              ayakkabı numarası çevir.
            </li>
            <li>
              <Link href="/kategoriler/uzunluk">Uzunluk Birim Dönüşümleri</Link>
            </li>
          </ul>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>Türkiye beden numarası hangi sisteme denk gelir?</strong>
            <br />
            Türkiye (TR) beden numaralandırması genel olarak Avrupa
            (EU) sistemiyle aynıdır. ABD (US) ve İngiltere (UK)
            sistemleri farklı sayılar kullanır —{" "}
            <Link href="/beden-olcusu-cevirici">
              Beden Ölçüsü Çevirici
            </Link>{" "}
            aracımızla karşılıklarını görebilirsin.
          </p>
          <p>
            <strong>Yüzük ölçüsü nasıl ölçülür?</strong>
            <br />
            En doğru yöntem, elindeki bir yüzüğün iç çapını ölçmek ya
            da bir ip/kağıt şeridini parmağına sarıp uzunluğunu
            ölçmektir.{" "}
            <Link href="/yuzuk-olcusu-cevirici">
              Yüzük Ölçüsü Çevirici
            </Link>{" "}
            aracımız bu ölçüyü TR, Avrupa, ABD ve İngiltere
            sistemlerine çevirir.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Beden karşılıkları, Türkiye&apos;de yaygın kullanılan giyim
            markalarının genel beden tablolarından; ayakkabı numarası
            karşılıkları ise markaların kendi resmî ölçü
            kılavuzlarından derlenmiştir.
          </p>
        </section>
      </div>
    </main>
  );
}
