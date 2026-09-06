import type { Metadata } from "next";
import Link from "next/link";
import PythagoreanCalculator from "../../../components/PythagoreanCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Pisagor teoremi nedir?",
    answer:
      "Pisagor teoremi, bir dik üçgende hipotenüsün (dik açının karşısındaki, en uzun kenar) karesinin, diğer iki kenarın (dik kenarların) karelerinin toplamına eşit olduğunu söyler: c² = a² + b².",
  },
  {
    question: "Pisagor teoremi hangi üçgenlerde geçerlidir?",
    answer:
      "Sadece dik üçgenlerde (bir açısı tam 90° olan üçgenlerde) geçerlidir. Dik açısı olmayan üçgenlerde bu bağıntı doğru sonuç vermez, onun yerine kosinüs teoremi kullanılır.",
  },
  {
    question: "Hipotenüs nasıl bulunur?",
    answer:
      "İki dik kenar (a ve b) biliniyorsa, hipotenüs c = √(a² + b²) formülüyle bulunur. Örneğin a=3, b=4 için c = √(9+16) = √25 = 5.",
  },
  {
    question: "Bir dik kenar nasıl bulunur?",
    answer:
      "Hipotenüs (c) ve bir dik kenar (örn. b) biliniyorsa, diğer dik kenar a = √(c² − b²) formülüyle bulunur. Hipotenüs her zaman dik kenarlardan büyük olmalıdır.",
  },
];

export const metadata: Metadata = {
  title: "Pisagor Teoremi Hesaplama",
  description:
    "Dik üçgende hipotenüsü veya bir dik kenarı c² = a² + b² formülüyle adım adım hesapla.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/geometri/pisagor-teoremi-hesaplama",
  },
  openGraph: {
    title: "Pisagor Teoremi Hesaplama",
    description: "Dik üçgende eksik kenarı adım adım hesapla.",
    url: buildSiteUrl(
      "/bilim-hesaplayicilari/geometri/pisagor-teoremi-hesaplama"
    ),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function PisagorTeoremiPage() {
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
        name: "Geometri",
        item: buildSiteUrl("/bilim-hesaplayicilari/geometri"),
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Pisagor Teoremi Hesaplama",
        item: buildSiteUrl(
          "/bilim-hesaplayicilari/geometri/pisagor-teoremi-hesaplama"
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
          <Link href="/bilim-hesaplayicilari/geometri">Geometri</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Pisagor Teoremi Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Pisagor Teoremi Hesaplama</h1>
          <p>
            Dik üçgende hipotenüsü veya bir dik kenarı c² = a² + b²
            formülüyle adım adım hesapla.
          </p>
        </header>

        <div className="unit-page-layout wide-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>Pisagor teoremi nedir?</h2>
          <p>
            <strong>Pisagor teoremi</strong>, bir dik üçgende hipotenüsün
            (dik açının karşısındaki, en uzun kenar) karesinin, diğer iki
            kenarın (dik kenarların) karelerinin toplamına eşit olduğunu
            söyler: c² = a² + b². Adını, teoremi ilk kanıtladığına inanılan
            Antik Yunan matematikçisi Pisagor&apos;dan (Pythagoras, MÖ 6.
            yüzyıl) alır — ancak Babilliler ve Antik Mısırlıların bu
            ilişkiyi ondan çok önce pratik olarak bildiği, arkeolojik
            kayıtlarla belgelenmiştir.
          </p>

          <h2>Nasıl kullanılır?</h2>
          <p>
            Üç kenardan (a, b, c) hangisini bilmediğini seç, diğer ikisini
            gir. İki dik kenar (a ve b) biliniyorsa hipotenüs c = √(a² + b²)
            ile bulunur; hipotenüs ve bir dik kenar biliniyorsa diğer dik
            kenar, örneğin a = √(c² − b²) ile bulunur. Hipotenüs her zaman
            üçgenin en uzun kenarı olduğundan, girdiğin hipotenüs değeri
            ilgili dik kenardan büyük olmalıdır.
          </p>

          <h2>Pisagor üçlüleri</h2>
          <p>
            Bazı kenar uzunlukları tam sayı olarak Pisagor bağıntısını tam
            olarak sağlar — bunlara <strong>Pisagor üçlüsü</strong> denir.
            En bilinen örnek 3-4-5&apos;tir (3² + 4² = 9 + 16 = 25 = 5²);
            diğer yaygın üçlüler 5-12-13, 8-15-17 ve 7-24-25&apos;tir. Bu
            üçlülerin katları (örn. 6-8-10) da birer Pisagor üçlüsüdür.
          </p>

          <h2>Gerçek hayatta nerede kullanılır?</h2>
          <p>
            İnşaat ve marangozlukta bir köşenin tam dik olup olmadığını
            kontrol etme (3-4-5 kuralı), navigasyon ve harita okumada iki
            nokta arası düz mesafe hesaplama, ekran/TV boyutu (köşegen)
            hesaplamaları, bilgisayar grafiklerinde iki nokta arası mesafe
            (Öklid mesafesi) hesabı Pisagor teoreminin yaygın kullanım
            alanlarıdır.
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
            Pisagor teoremi tanımı ve ispatı standart ortaokul ve lise
            geometri müfredatına dayanır.
          </p>
        </section>
        </div>

        <div className="unit-page-converter">
          <PythagoreanCalculator />
        </div>
        </div>
      </div>
    </main>
  );
}
