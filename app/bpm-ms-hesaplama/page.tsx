import type { Metadata } from "next";
import Link from "next/link";
import BpmDelayCalculator from "../components/BpmDelayCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "BPM'den milisaniyeye nasıl geçilir?",
    answer:
      "Bir dörtlük notanın süresi (ms) = 60000 / BPM formülüyle bulunur. Diğer nota değerleri (ikilik, sekizlik, onaltılık vb.) bu süre çarpanlarla (2, 0,5, 0,25...) ölçeklenir.",
  },
  {
    question: "Noktalı ve triole nota süreleri nasıl hesaplanır?",
    answer:
      "Noktalı bir nota, normal süresinin 1,5 katı kadar sürer. Triole ise bir vuruşu üç eşit parçaya böldüğü için normal sürenin 2/3'ü kadardır.",
  },
  {
    question: "Delay ve reverb süresini şarkının temposuna göre ayarlamak neden önemli?",
    answer:
      "Delay veya reverb süresi şarkının BPM'ine göre ayarlandığında, efekt vuruşlarla (beat) uyumlu çalar ve mix'te dağınık durmaz. Bu yüzden prodüktörler genelde delay/reverb sürelerini dörtlük, sekizlik gibi nota değerlerine kilitler.",
  },
];

export const metadata: Metadata = {
  title: "BPM - MS Hesaplama: Delay ve Reverb Süresi",
  description:
    "Tempo (BPM) değerinden dörtlük, sekizlik, onaltılık gibi nota değerlerinin milisaniye karşılığını hesapla; delay ve reverb sürelerini şarkının temposuna kilitle.",
  alternates: {
    canonical: "/bpm-ms-hesaplama",
  },
  openGraph: {
    title: "BPM - MS Hesaplama: Delay ve Reverb Süresi",
    description: "BPM'den nota değerlerinin milisaniye karşılığını hesapla.",
    url: buildSiteUrl("/bpm-ms-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function BpmDelayCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Müzisyen Araçları", item: buildSiteUrl("/muzisyen-araclari") },
      { "@type": "ListItem", position: 4, name: "BPM - MS Hesaplama", item: buildSiteUrl("/bpm-ms-hesaplama") },
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
          <Link href="/muzisyen-araclari">Müzisyen Araçları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>BPM - MS Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>BPM - MS Hesaplama</h1>
          <p>
            Tempo (BPM) değerini gir: dörtlük, sekizlik, onaltılık gibi
            yaygın nota değerlerinin düz, noktalı ve triole milisaniye
            karşılıklarını anında gör. Alttaki ikinci araçla, bildiğin
            bir delay/reverb süresinden geriye doğru BPM de bulabilirsin.
          </p>
        </header>

        <BpmDelayCalculator />

        <section className="category-article-content">
          <h2>BPM&apos;den milisaniyeye nasıl geçilir?</h2>
          <p>
            Bir dörtlük notanın süresi, 60000&apos;in BPM&apos;e
            bölünmesiyle bulunur: <strong>ms = 60000 / BPM</strong>.
            Örneğin 120 BPM&apos;de bir dörtlük nota 500 ms sürer.
            Diğer nota değerleri bu süreyi ölçekler: ikilik 2×, sekizlik
            0,5×, onaltılık 0,25× gibi.
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
            Diğer müzisyen araçları için{" "}
            <Link href="/muzisyen-araclari">Müzisyen Araçları</Link>{" "}
            sayfasına, Hz/kHz frekans dönüşümleri için{" "}
            <Link href="/kategoriler/frekans">Frekans Dönüşümleri</Link>
            {" "}sayfasına bakabilirsin.
          </p>
        </section>
      </div>
    </main>
  );
}
