import type { Metadata } from "next";
import Link from "next/link";
import MolalityCalculator from "../../../components/MolalityCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Molalite nedir?",
    answer:
      "Molalite (m), bir çözeltide çözünenin mol sayısının, çözücünün kilogram cinsinden kütlesine oranıdır. Birimi mol/kg'dır.",
  },
  {
    question: "Molalite ve molarite arasındaki fark nedir?",
    answer:
      "Molarite (M) çözelti hacmine (litre) dayanırken, molalite (m) çözücü kütlesine (kilogram) dayanır. Hacim sıcaklıkla değiştiği için molarite sıcaklığa bağlıyken, kütle sabit olduğu için molalite sıcaklıktan bağımsızdır.",
  },
  {
    question: "Molalite ne zaman kullanılır?",
    answer:
      "Molalite, özellikle sıcaklığın değiştiği deneylerde (kaynama noktası yükselmesi, donma noktası alçalması gibi kolligatif özellik hesaplarında) tercih edilir, çünkü sonuç sıcaklık dalgalanmalarından etkilenmez.",
  },
  {
    question: "Molalite nasıl hesaplanır?",
    answer:
      "Molalite, m = n / kg(çözücü) formülüyle hesaplanır. Burada n çözünenin mol sayısı, kg(çözücü) ise çözücünün kilogram cinsinden kütlesidir. Dikkat: paydada çözeltinin değil, yalnızca çözücünün kütlesi kullanılır.",
  },
];

export const metadata: Metadata = {
  title: "Molalite Hesaplama: mol/kg Derişim Hesaplayıcı",
  description:
    "Mol sayısı ve çözücü kütlesinden molaliteyi (mol/kg), molarite'den farklı olarak sıcaklıktan bağımsız bu derişim birimini anında hesaplayın.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/kimya/molalite-hesaplama",
  },
  openGraph: {
    title: "Molalite Hesaplama: mol/kg Derişim Hesaplayıcı",
    description:
      "Mol sayısı ve çözücü kütlesinden molaliteyi (mol/kg) hesaplayın.",
    url: buildSiteUrl("/bilim-hesaplayicilari/kimya/molalite-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function MolaliteHesaplamaPage() {
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
        name: "Molalite Hesaplama",
        item: buildSiteUrl("/bilim-hesaplayicilari/kimya/molalite-hesaplama"),
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
          <span>Molalite Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Molalite Hesaplama</h1>
          <p>
            Mol sayısı ve çözücü kütlesinden molaliteyi, ya da bildiğin iki
            değerden eksik olan üçüncüyü hesapla.
          </p>
        </header>

        <div className="unit-page-layout chem-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>Molalite nedir?</h2>
          <p>
            Molalite (m), çözünen maddenin mol sayısının, çözücünün
            kilogram cinsinden kütlesine oranıdır: <strong>m = n / kg(çözücü)</strong>.
            Molariteye çok benzer görünse de, aralarındaki tek ama kritik
            fark, paydada çözeltinin hacmi değil, yalnızca çözücünün
            kütlesinin kullanılmasıdır.
          </p>

          <h2>Molalite neden sıcaklıktan bağımsızdır?</h2>
          <p>
            Sıvıların hacmi sıcaklıkla değişir (ısınınca genleşir, soğuyunca
            büzülür), ama kütlesi değişmez. Molarite hacme dayandığı için
            sıcaklıkla birlikte (çok az da olsa) değişirken, molalite
            kütleye dayandığı için sıcaklık ne olursa olsun sabit kalır. Bu
            yüzden hassas bilimsel ölçümlerde, özellikle sıcaklığın
            değiştiği deneylerde molalite tercih edilir.
          </p>

          <h2>Kolligatif özellikler ve molalite</h2>
          <p>
            Molalite, kolligatif özellik hesaplarının (çözeltinin donma
            noktası alçalması, kaynama noktası yükselmesi, buhar basıncı
            düşmesi gibi çözünen parçacık sayısına bağlı özellikler)
            standart birimidir. Örneğin donma noktası alçalması ΔT = Kf × m
            formülüyle hesaplanır; burada Kf çözücüye özgü bir sabit, m ise
            molalitedir. Bu formüllerde molarite değil özellikle molalite
            kullanılır, çünkü deney sırasında sıcaklık değiştikçe hacim de
            değişir ve molarite yanıltıcı sonuç verir.
          </p>

          <h2>Antifriz ve tuzlama: gerçek dünya uygulaması</h2>
          <p>
            Kış aylarında yollara tuz serpilmesi veya araç radyatörlerine
            antifriz eklenmesi, doğrudan donma noktası alçalması ilkesine
            dayanır. Bu uygulamaların etkinliği hesaplanırken mühendisler
            molalite birimini kullanır, çünkü sonuç sıcaklığa bağlı hacim
            değişimlerinden etkilenmemelidir — antifriz sıcak motor
            odasında da soğuk dış havada da aynı koruma seviyesini
            sağlamalıdır.
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
            Molalite tanımı, IUPAC&apos;ın derişim birimleri standardına
            dayanır.
          </p>
        </section>
        </div>

        <div className="unit-page-converter">
          <MolalityCalculator />
        </div>
        </div>
      </div>
    </main>
  );
}
