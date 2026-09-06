import type { Metadata } from "next";
import Link from "next/link";
import EnthalpyCalculator from "../../../components/EnthalpyCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Entalpi nedir?",
    answer:
      "Entalpi (H), bir sistemin sahip olduğu toplam ısı enerjisini ifade eden bir hâl fonksiyonudur. Kimyada asıl önemli olan entalpi değişimi (ΔH) — bir tepkime sırasında sistemin ne kadar ısı alıp verdiğidir.",
  },
  {
    question: "q = mcΔT formülü nedir?",
    answer:
      "Bu, kalorimetri temel bağıntısıdır: q ısı miktarını (joule), m kütleyi (gram), c özgül ısıyı (J/g·°C), ΔT ise sıcaklık değişimini ifade eder. Sabit basınçta q, entalpi değişimine (ΔH) eşittir.",
  },
  {
    question: "Ekzotermik ve endotermik tepkime nedir?",
    answer:
      "Ekzotermik tepkimeler ısı açığa çıkarır (ΔH negatiftir, çevre ısınır); endotermik tepkimeler ısı soğurur (ΔH pozitiftir, çevre soğur). Yanma tepkimeleri ekzotermik, buzun erimesi endotermiktir.",
  },
  {
    question: "Özgül ısı nedir?",
    answer:
      "Özgül ısı (c), bir maddenin 1 gramının sıcaklığını 1°C artırmak için gereken enerji miktarıdır. Suyun özgül ısısı (4,18 J/g·°C) çoğu maddeden yüksektir — bu yüzden su ısınması ve soğuması yavaş olan bir maddedir.",
  },
];

export const metadata: Metadata = {
  title: "Entalpi Hesaplama: q = mcΔT Isı Hesaplayıcı",
  description:
    "Kütle, özgül ısı ve sıcaklık değişiminden ısı miktarını (entalpi değişimini), ya da bildiğin üç değerden eksik olanı anında hesaplayın.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/kimya/entalpi-hesaplama",
  },
  openGraph: {
    title: "Entalpi Hesaplama: q = mcΔT Isı Hesaplayıcı",
    description: "Kütle, özgül ısı ve ΔT'den ısı miktarını hesaplayın.",
    url: buildSiteUrl("/bilim-hesaplayicilari/kimya/entalpi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function EntalpiHesaplamaPage() {
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
        name: "Bilim Hesaplayıcıları",
        item: buildSiteUrl("/bilim-hesaplayicilari"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Kimya",
        item: buildSiteUrl("/bilim-hesaplayicilari/kimya"),
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Entalpi Hesaplama",
        item: buildSiteUrl("/bilim-hesaplayicilari/kimya/entalpi-hesaplama"),
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
          <Link href="/bilim-hesaplayicilari">Bilim Hesaplayıcıları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/bilim-hesaplayicilari/kimya">Kimya</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Entalpi Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Entalpi Hesaplama</h1>
          <p>
            Kütle, özgül ısı ve sıcaklık değişiminden ısı miktarını
            (entalpi değişimini), ya da bildiğin üç değerden eksik olanı
            hesapla.
          </p>
        </header>

        <div className="unit-page-layout chem-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>Entalpi nedir?</h2>
          <p>
            Entalpi (H), bir sistemin toplam ısı içeriğini ifade eden bir
            hâl fonksiyonudur; ancak kimyada mutlak entalpi değeri değil,{" "}
            <strong>entalpi değişimi</strong> (ΔH) önem taşır — bir
            tepkime sırasında sistemin çevresiyle ne kadar ısı alışverişi
            yaptığıdır. Sabit basınçta gerçekleşen tepkimelerde, ölçülen
            ısı miktarı (q) doğrudan entalpi değişimine eşittir: q = ΔH.
          </p>

          <h2>Kalorimetri: q = mcΔT bağıntısı</h2>
          <p>
            Isı miktarını doğrudan ölçmenin en temel yolu kalorimetridir;
            temel bağıntı <strong>q = m × c × ΔT</strong> şeklindedir.
            Burada m kütle (gram), c özgül ısı (J/g·°C), ΔT ise sıcaklık
            değişimidir (son sıcaklık eksi ilk sıcaklık). Örneğin 500 g
            suyun sıcaklığını 1°C artırmak için gereken ısı, 500 × 4,18 ×
            1 = <strong>2090 joule</strong>'dur.
          </p>

          <h2>Ekzotermik ve endotermik tepkimeler</h2>
          <p>
            Bir tepkime ısı açığa çıkarıyorsa <strong>ekzotermik</strong>{" "}
            (ΔH negatif, çevre ısınır) olarak adlandırılır — yanma
            tepkimeleri, nötrleşme tepkimeleri ve çoğu oksidasyon tepkimesi
            bu gruba girer. Bir tepkime ısı soğuruyorsa{" "}
            <strong>endotermik</strong> (ΔH pozitif, çevre soğur) olarak
            adlandırılır — buzun erimesi, amonyum nitratın suda çözünmesi
            (soğuk kompres paketlerinin çalışma ilkesi) bu gruba örnektir.
          </p>

          <h2>Hess Yasası: entalpinin toplanabilirliği</h2>
          <p>
            1840'ta İsviçre doğumlu Rus kimyager Germain Hess'in ortaya
            koyduğu Hess Yasası, bir tepkimenin toplam entalpi değişiminin,
            tepkimenin hangi adımlarla gerçekleştiğinden bağımsız olduğunu
            belirtir — yalnızca başlangıç ve bitiş durumlarına bağlıdır. Bu
            ilke, doğrudan ölçülmesi zor olan tepkimelerin entalpisinin,
            daha kolay ölçülebilen ara basamakların entalpilerinin
            toplanmasıyla dolaylı olarak hesaplanmasını mümkün kılar —
            termokimyanın en güçlü araçlarından biridir.
          </p>

          <h2>Suyun sıra dışı yüksek özgül ısısının önemi</h2>
          <p>
            Suyun özgül ısısı (4,18 J/g·°C), bilinen çoğu sıvı ve katıdan
            belirgin biçimde yüksektir. Bu özellik, göllerin ve
            okyanusların sıcaklığının kara alanlarına göre çok daha yavaş
            değişmesini sağlayarak kıyı bölgelerinin iklimini
            ılımanlaştırır; aynı zamanda canlı vücudundaki su içeriğinin
            ani sıcaklık dalgalanmalarına karşı doğal bir tampon görevi
            görmesini de açıklar.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>Kaynaklar</h2>
          <p>
            Kalorimetri bağıntısı ve özgül ısı değerleri, standart
            termokimya referans tablolarına dayanır.
          </p>
        </section>
        </div>

        <div className="unit-page-converter">
          <EnthalpyCalculator />
        </div>
        </div>
      </div>
    </main>
  );
}
