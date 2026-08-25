import type { Metadata } from "next";
import Link from "next/link";
import RingSizeConverter from "../components/RingSizeConverter";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Yüzük Ölçüsü Çevirici: TR, ABD, İngiltere Tablosu",
  description:
    "Yüzük ölçüsünü iç çap (mm), Avrupa çevre (mm), ABD (US) ve İngiltere (UK) sistemleri arasında çevirin; standart kuyumculuk beden tablosunu görün.",
  alternates: {
    canonical: "/yuzuk-olcusu-cevirici",
    languages: {
      tr: "/yuzuk-olcusu-cevirici",
      en: "/en/ring-size-converter",
      "x-default": "/yuzuk-olcusu-cevirici",
    },
  },
  openGraph: {
    title: "Yüzük Ölçüsü Çevirici: TR, ABD, İngiltere Tablosu",
    description:
      "Yüzük ölçüsünü iç çap (mm), Avrupa çevre (mm), ABD ve İngiltere sistemleri arasında çevirin.",
    url: buildSiteUrl("/yuzuk-olcusu-cevirici"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RingSizePage() {
  return (
    <main className="all-conversions-page">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Yüzük Ölçüsü Çevirici</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Yüzük Ölçüsü Çevirici</h1>

          <p>
            Bildiğin yüzük ölçüsünü gir, TR (iç çap mm), Avrupa (çevre
            mm), ABD (US) ve İngiltere (UK) karşılığını anında gör.
            Ayakkabının aksine yüzük ölçüsü markaya göre değişmez —
            kuyumculuk sektöründe dünya genelinde aynı standart tablo
            kullanılır.
          </p>
        </header>

        <RingSizeConverter locale="tr" />

        <section className="category-article-content">
          <h2>Yüzük ölçüsü nasıl belirlenir?</h2>
          <p>
            Türkiye&apos;de yüzük ölçüsü genellikle parmağın iç çapının
            milimetre cinsinden karşılığıyla ifade edilir. Avrupa
            sisteminde ise doğrudan çevre (mm) kullanılır — çap ile çevre
            arasındaki ilişki basit bir geometri kuralıdır (çevre = çap ×
            π), bu yüzden ikisi arasında dönüşüm her zaman kesindir. ABD
            (US) ve İngiltere (UK) sistemleri ise kendi ardışık numara ve
            harf sıralamalarını kullanır; bu tablo kuyumculuk
            sektöründeki uluslararası standarttan derlenmiştir.
          </p>
          <p>
            En doğru sonuç için mevcut bir yüzüğün iç çapını cetvelle
            ölçüp &quot;TR (İç Çap mm)&quot; alanından seçim yapman
            önerilir.
          </p>
        </section>
      </div>
    </main>
  );
}
