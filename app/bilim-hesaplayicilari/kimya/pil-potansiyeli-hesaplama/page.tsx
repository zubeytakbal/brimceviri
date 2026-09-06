import type { Metadata } from "next";
import Link from "next/link";
import CellPotentialCalculator from "../../../components/CellPotentialCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Pil potansiyeli (hücre potansiyeli) nedir?",
    answer:
      "Pil potansiyeli (E°hücre), bir galvanik hücrenin katot ve anot elektrotları arasındaki potansiyel farkıdır. Voltaj cinsinden ölçülür ve pilin elektrik üretme gücünü belirler.",
  },
  {
    question: "Pil potansiyeli nasıl hesaplanır?",
    answer:
      "E°hücre = E°katot - E°anot formülüyle hesaplanır. Burada her iki değer de standart indirgenme potansiyeli (V) olarak, aynı referansa (standart hidrojen elektrodu, 0,00 V) göre alınır.",
  },
  {
    question: "Pozitif ve negatif hücre potansiyeli ne anlama gelir?",
    answer:
      "E°hücre pozitifse tepkime kendiliğinden gerçekleşir (galvanik pil, elektrik üretir). E°hücre negatifse tepkime kendiliğinden gerçekleşmez, gerçekleşmesi için dışarıdan elektrik enerjisi verilmesi gerekir (elektroliz).",
  },
  {
    question: "Standart hidrojen elektrodu neden 0,00 V'dur?",
    answer:
      "Standart indirgenme potansiyelleri, mutlak değil göreceli ölçümlerdir; bu yüzden standart hidrojen elektrodu (H⁺/H₂) keyfi olarak referans noktası kabul edilip 0,00 V değeri atanmıştır. Diğer tüm elektrot potansiyelleri bu referansa göre ölçülür.",
  },
];

export const metadata: Metadata = {
  title: "Pil Potansiyeli Hesaplama: E°hücre Hesaplayıcı",
  description:
    "Katot ve anot standart indirgenme potansiyellerinden hücre potansiyelini (E°hücre) ve tepkimenin kendiliğinden olup olmadığını anında hesaplayın.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/kimya/pil-potansiyeli-hesaplama",
  },
  openGraph: {
    title: "Pil Potansiyeli Hesaplama: E°hücre Hesaplayıcı",
    description: "Katot ve anot potansiyellerinden E°hücre'yi hesaplayın.",
    url: buildSiteUrl(
      "/bilim-hesaplayicilari/kimya/pil-potansiyeli-hesaplama"
    ),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function PilPotansiyeliHesaplamaPage() {
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
        name: "Pil Potansiyeli Hesaplama",
        item: buildSiteUrl(
          "/bilim-hesaplayicilari/kimya/pil-potansiyeli-hesaplama"
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
          <span>Pil Potansiyeli Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Pil Potansiyeli Hesaplama</h1>
          <p>
            Katot ve anot standart indirgenme potansiyellerinden hücre
            potansiyelini ve tepkimenin kendiliğinden olup olmadığını
            hesapla.
          </p>
        </header>

        <div className="unit-page-layout chem-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>Pil potansiyeli nedir?</h2>
          <p>
            Bir galvanik hücrede iki farklı metal elektrot, elektronları
            farklı şiddette tutma eğilimindedir. Bu fark, elektronların bir
            elektrottan diğerine kendiliğinden akmasını sağlar — bu akış
            elektrik akımıdır. Elektrotlar arasındaki bu potansiyel
            farkına <strong>hücre potansiyeli</strong> (E°hücre) denir ve{" "}
            <strong>E°hücre = E°katot - E°anot</strong> formülüyle
            hesaplanır.
          </p>

          <h2>Standart indirgenme potansiyelleri tablosu nasıl okunur?</h2>
          <p>
            Her yarı tepkime, standart koşullarda (25°C, 1 M derişim, 1 atm
            basınç) ölçülen bir standart indirgenme potansiyeline sahiptir.
            Bu değerler, standart hidrojen elektroduna (H⁺/H₂, keyfi olarak
            0,00 V kabul edilir) göre ölçülür. Potansiyeli daha pozitif
            olan elektrot indirgenme eğilimi daha güçlüdür (katot olur),
            daha negatif olan ise yükseltgenme eğilimindedir (anot olur).
          </p>

          <h2>Daniell pili: klasik bir örnek</h2>
          <p>
            Kimya tarihinin en bilinen galvanik hücrelerinden biri olan
            Daniell pili, çinko (Zn²⁺/Zn, -0,76 V) anodu ile bakır
            (Cu²⁺/Cu, +0,34 V) katodunu birleştirir. Hücre potansiyeli
            0,34 - (-0,76) = <strong>1,10 V</strong> olur; pozitif değer,
            tepkimenin kendiliğinden gerçekleştiğini ve elektrik ürettiğini
            gösterir. John Frederic Daniell bu pili 1836'da geliştirdi ve
            dönemin telgraf sistemlerinde yaygın olarak kullanıldı.
          </p>

          <h2>Kendiliğinden ve kendiliğinden olmayan tepkimeler</h2>
          <p>
            E°hücre pozitifse tepkime kendiliğinden gerçekleşir — bu bir{" "}
            <strong>galvanik (voltaik) pil</strong>dir ve kimyasal
            enerjiyi elektrik enerjisine dönüştürür. E°hücre negatifse
            tepkime kendiliğinden gerçekleşmez; bu tür bir tepkimeyi
            zorlamak için dışarıdan elektrik enerjisi vermek gerekir — bu
            işleme <strong>elektroliz</strong> denir ve alüminyum
            üretiminden metal kaplamacılığına kadar birçok endüstriyel
            süreçte kullanılır.
          </p>

          <h2>Gerçek dünyada pil potansiyeli</h2>
          <p>
            Günlük hayatta kullandığımız pillerin voltaj değerleri
            (alkalin pil ~1,5 V, lityum iyon pil ~3,7 V) doğrudan içlerindeki
            elektrot çiftlerinin standart potansiyel farkından gelir.
            Birden fazla hücrenin seri bağlanmasıyla (araba akülerinde
            olduğu gibi) daha yüksek toplam voltaj elde edilebilir —
            standart bir kurşun-asit araba aküsü, her biri yaklaşık 2,1 V
            üreten 6 hücrenin seri bağlanmasıyla 12 V verir.
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
            Standart indirgenme potansiyelleri, standart elektrokimya
            referans tablolarına (25°C, 1 M, 1 atm) dayanır.
          </p>
        </section>
        </div>

        <div className="unit-page-converter">
          <CellPotentialCalculator />
        </div>
        </div>
      </div>
    </main>
  );
}
