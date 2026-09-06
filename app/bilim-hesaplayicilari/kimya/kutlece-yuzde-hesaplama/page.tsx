import type { Metadata } from "next";
import Link from "next/link";
import MassPercentCalculator from "../../../components/MassPercentCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Kütlece yüzde derişim nedir?",
    answer:
      "Kütlece yüzde (% w/w), bir çözeltide çözünen maddenin kütlesinin, çözeltinin toplam kütlesine oranının 100 ile çarpılmasıyla bulunan bir derişim birimidir.",
  },
  {
    question: "Kütlece yüzde nasıl hesaplanır?",
    answer:
      "Kütlece yüzde = (çözünen kütlesi / çözelti kütlesi) × 100 formülüyle hesaplanır. Çözelti kütlesi, çözünen ve çözücü kütlelerinin toplamıdır.",
  },
  {
    question: "Çözücü kütlesi ile çözelti kütlesi aynı şey midir?",
    answer:
      "Hayır. Çözücü, çözünen maddeyi eritmek için kullanılan madde (genellikle su); çözelti ise çözünen ve çözücünün toplamıdır. Örneğin 20 g tuz 80 g suda çözüldüğünde, çözücü kütlesi 80 g, çözelti kütlesi ise 100 g'dır.",
  },
  {
    question: "Kütlece yüzdeden çözünen kütlesi nasıl bulunur?",
    answer:
      "Çözücü kütlesi biliniyorsa, çözünen kütlesi = (yüzde × çözücü kütlesi) / (100 - yüzde) formülüyle hesaplanır.",
  },
];

export const metadata: Metadata = {
  title: "Kütlece Yüzde Hesaplama: % Derişim Hesaplayıcı",
  description:
    "Çözünen ve çözücü kütlesinden kütlece yüzdeyi, yüzde ve çözücüden çözünen kütlesini, yüzde ve çözünenden çözücü kütlesini anında hesaplayın.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/kimya/kutlece-yuzde-hesaplama",
  },
  openGraph: {
    title: "Kütlece Yüzde Hesaplama: % Derişim Hesaplayıcı",
    description:
      "Çözünen ve çözücü kütlesinden kütlece yüzdeyi anında hesaplayın.",
    url: buildSiteUrl("/bilim-hesaplayicilari/kimya/kutlece-yuzde-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function KutleceYuzdeHesaplamaPage() {
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
        name: "Kütlece Yüzde Hesaplama",
        item: buildSiteUrl(
          "/bilim-hesaplayicilari/kimya/kutlece-yuzde-hesaplama"
        ),
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
          <span>Kütlece Yüzde Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Kütlece Yüzde Hesaplama</h1>
          <p>
            Çözünen ve çözücü kütlesinden kütlece yüzdeyi, ya da yüzde ve
            bilinen bir kütleden diğerini hesapla.
          </p>
        </header>

        <div className="unit-page-layout chem-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>Kütlece yüzde nedir?</h2>
          <p>
            Kütlece yüzde (% w/w), kimyada çözelti derişimini ifade etmenin
            en basit yollarından biridir. Çözünen maddenin kütlesinin,
            çözeltinin toplam kütlesine oranını yüzde olarak ifade eder.
            Molarite gibi hacim ölçümü gerektirmediği için, özellikle katı
            karışımlarda ve laboratuvar dışı günlük hesaplamalarda (örneğin
            gıda etiketlerinde) sıkça kullanılır.
          </p>

          <h2>Kütlece yüzde, çözünen ve çözücü ilişkisi</h2>
          <p>
            Temel bağıntı <strong>% = (çözünen kütlesi / çözelti kütlesi) × 100</strong>{" "}
            şeklindedir. Çözelti kütlesi, çözünen ve çözücü kütlelerinin
            toplamıdır: çözelti = çözünen + çözücü. Örneğin 20 g tuz, 80 g
            suda çözüldüğünde, çözelti kütlesi 20 + 80 = 100 g olur ve
            kütlece yüzde 20/100 × 100 = <strong>%20</strong> bulunur.
          </p>
          <p>
            Bu bağıntı üç yönde de kullanılabilir: yüzde ve çözücü
            kütlesinden çözünen kütlesi, ya da yüzde ve çözünen kütlesinden
            çözücü kütlesi hesaplanabilir — laboratuvar ve sınav
            sorularında sıkça karşılaşılan bir işlemdir.
          </p>

          <h2>Kütlece yüzde ile diğer derişim birimlerinin farkı</h2>
          <p>
            Kimyada birden fazla "yüzde derişim" tanımı bulunur ve bunların
            karıştırılması yaygın bir hatadır. <strong>Kütlece yüzde</strong>{" "}
            (w/w%) kütle/kütle oranını ifade ederken,{" "}
            <strong>hacimce yüzde</strong> (v/v%) hacim/hacim oranını ifade
            eder — alkollü içeceklerdeki "sertlik derecesi" (örneğin %5
            alkol) hacimce yüzdedir. <strong>Kütlece/hacimce yüzde</strong>{" "}
            (w/v%) ise kütleyi hacme oranlar; örneğin serum fizyolojik
            çözeltisi %0,9 NaCl (w/v), her 100 mL çözeltide 0,9 g NaCl
            bulunduğu anlamına gelir. Bu üç tanımın karıştırılması, özellikle
            ilaç ve gıda formülasyonlarında ciddi hesaplama hatalarına yol
            açabilir.
          </p>
          <p>
            Çok küçük derişimlerde (%0,0001'in altı gibi) kütlece yüzde
            yerine <strong>ppm</strong> (milyonda parça) veya{" "}
            <strong>ppb</strong> (milyarda parça) birimleri tercih edilir;
            ppm, kütlece yüzdenin ondan bine kadar ölçeklendirilmiş hâli
            olarak düşünülebilir (1 ppm = %0,0001).
          </p>

          <h2>Kütlece yüzdenin sıcaklıktan bağımsızlığı</h2>
          <p>
            Kütlece yüzdenin molariteye kıyasla önemli bir avantajı,
            yalnızca kütle ölçümüne dayanması nedeniyle sıcaklıktan
            etkilenmemesidir — bir çözeltinin hacmi ısındıkça genleşse
            bile, içindeki madde kütleleri sabit kalır. Bu özellik, onu
            özellikle sıcaklık kontrolünün zor olduğu endüstriyel
            ortamlarda ve uzun süreli depolama gerektiren ürünlerde (gıda,
            kozmetik) tercih edilen bir derişim birimi yapar.
          </p>

          <h2>Kütlece yüzde nerelerde kullanılır?</h2>
          <p>
            Kütlece yüzde, tuzlu su çözeltilerinden alaşımlara, ilaç
            formülasyonlarından gıda ürünlerinin bileşim etiketlerine kadar
            geniş bir kullanım alanına sahiptir. Molariteden farklı olarak
            sıcaklıkla değişmez, çünkü yalnızca kütle ölçümüne dayanır —
            bu da onu bazı uygulamalarda daha pratik bir derişim birimi
            yapar. Kuyumculukta ayar sistemi de kütlece yüzdenin bir
            uygulamasıdır: 18 ayar altın, kütlece %75 saf altın içerir
            (24 ayarın 18/24'ü).
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
            Kütlece yüzde derişim tanımı, IUPAC&apos;ın derişim birimleri
            standardına dayanır.
          </p>
        </section>
        </div>

        <div className="unit-page-converter">
          <MassPercentCalculator />
        </div>
        </div>
      </div>
    </main>
  );
}
