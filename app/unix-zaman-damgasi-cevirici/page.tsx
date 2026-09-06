import type { Metadata } from "next";
import Link from "next/link";
import UnixTimestampCalculator from "../components/UnixTimestampCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Unix zaman damgası (timestamp) nedir?",
    answer:
      "Unix zaman damgası, 1 Ocak 1970 00:00:00 UTC (Unix epoch) referans anından itibaren geçen saniye (veya milisaniye) sayısıdır. Bilgisayarlar tarihleri genellikle bu tek sayı ile saklar.",
  },
  {
    question: "Saniye ve milisaniye tabanlı zaman damgası arasındaki fark nedir?",
    answer:
      "Saniye tabanlı zaman damgası (Unix time) 10 haneli bir sayıdır; JavaScript gibi bazı diller ise milisaniye tabanlı (13 haneli) zaman damgası kullanır. Bu araç iki birimi de destekler.",
  },
  {
    question: "Tarihten zaman damgasına çevirirken hangi saat dilimi kullanılıyor?",
    answer:
      "Tarih/saat girişi Türkiye saati (UTC+3) olarak kabul edilir; Türkiye 2016'dan beri yaz saati uygulamadığı için bu ofset sabittir.",
  },
];

export const metadata: Metadata = {
  title: "Unix Zaman Damgası Çevirici (Epoch Converter)",
  description:
    "Unix zaman damgasını (epoch) tarihe, tarihi de Türkiye saatine göre zaman damgasına çevir; saniye ve milisaniye birimlerini destekler.",
  alternates: {
    canonical: "/unix-zaman-damgasi-cevirici",
  },
  openGraph: {
    title: "Unix Zaman Damgası Çevirici (Epoch Converter)",
    description:
      "Unix zaman damgasını tarihe, tarihi zaman damgasına anında çevir.",
    url: buildSiteUrl("/unix-zaman-damgasi-cevirici"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UnixTimestampCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Yazılımcı Araçları", item: buildSiteUrl("/yazilimci-araclari") },
      { "@type": "ListItem", position: 4, name: "Unix Zaman Damgası Çevirici", item: buildSiteUrl("/unix-zaman-damgasi-cevirici") },
    ],
  };

  return (
    <main className="all-conversions-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/yazilimci-araclari">Yazılımcı Araçları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Unix Zaman Damgası Çevirici</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Unix Zaman Damgası Çevirici</h1>
          <p>
            Unix zaman damgasını (epoch) tarihe, tarih ve saati de
            zaman damgasına çevir. &quot;Şu Anki Zaman Damgası&quot;
            butonuyla mevcut anı tek tıkla alabilirsin.
          </p>
        </header>

        <UnixTimestampCalculator />

        <section className="category-article-content">
          <h2>Unix zaman damgası nedir?</h2>
          <p>
            Unix zaman damgası (epoch time), 1 Ocak 1970 00:00:00 UTC
            referans anından itibaren geçen saniye sayısıdır. Sunucular,
            veritabanları ve API&apos;ler tarih/saat bilgisini genellikle
            bu tek sayı ile taşır çünkü saat dilimi ve biçim
            karışıklığından bağımsızdır.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>İlgili araçlar</h2>
          <p>
            Diğer geliştirici araçları için{" "}
            <Link href="/yazilimci-araclari">Yazılımcı Araçları</Link>{" "}
            sayfasına, ikili/onaltılık sayı sistemleri için{" "}
            <Link href="/sayi-tabani-cevirici">Sayı Tabanı Çevirici</Link>
            {" "}sayfasına bakabilirsin.
          </p>
        </section>
      </div>
    </main>
  );
}
