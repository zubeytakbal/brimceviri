import type { Metadata } from "next";
import Link from "next/link";
import ProjectileMotionCalculator from "../../../components/ProjectileMotionCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Eğik atış hareketi nedir?",
    answer:
      "Bir cismin yatayla belirli bir açı yaparak fırlatılıp, yalnızca yerçekiminin etkisi altında (hava direnci ihmal edilerek) izlediği parabolik yörüngedir. Hareket, yatay yönde sabit hızlı ve dikey yönde serbest düşme/atış hareketinin bileşkesi olarak incelenir.",
  },
  {
    question: "Eğik atışta menzil formülü nedir?",
    answer:
      "Zeminden fırlatılan bir cisim için menzil R = v₀² × sin(2θ) / g formülüyle hesaplanır. Başlangıç yüksekliği sıfırdan farklıysa, önce uçuş süresi hesaplanıp menzil = yatay hız × uçuş süresi şeklinde bulunur (bu hesaplayıcı ikisini de kapsar).",
  },
  {
    question: "Yatay atış ile eğik atış arasındaki fark nedir?",
    answer:
      "Yatay atışta cisim bir yükseklikten, yatayla 0° açıyla (yere paralel) fırlatılır; dikey başlangıç hızı yoktur. Eğik atış ise 0°-90° arasında herhangi bir açıyla fırlatmayı kapsar. Yatay atış, eğik atışın açının 0 olduğu özel bir durumudur.",
  },
  {
    question: "Hangi açıda menzil maksimum olur?",
    answer:
      "Başlangıç ve varış yüksekliği aynıysa (örneğin zeminden fırlatılıp zemine düşme), menzil 45°'de maksimum olur. Başlangıç yüksekliği fazlaysa optimum açı 45°'nin biraz altına iner.",
  },
];

export const metadata: Metadata = {
  title: "Eğik Atış Hesaplama (Menzil, Yükseklik, Süre)",
  description:
    "Başlangıç hızı, atış açısı ve yüksekliğe göre eğik atış hareketinin menzilini, maksimum yüksekliğini ve uçuş süresini hesapla. Açıyı sıfır bırakarak yatay atış hesabı da yapılabilir.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/fizik/egik-atis-hesaplama",
  },
  openGraph: {
    title: "Eğik Atış Hesaplama (Menzil, Yükseklik, Süre)",
    description:
      "Başlangıç hızı ve atış açısına göre eğik atış hareketini hesapla.",
    url: buildSiteUrl("/bilim-hesaplayicilari/fizik/egik-atis-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function ProjectileMotionPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Bilim Hesaplayıcıları",
        item: buildSiteUrl("/bilim-hesaplayicilari"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Fizik",
        item: buildSiteUrl("/bilim-hesaplayicilari/fizik"),
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Eğik Atış Hesaplama",
        item: buildSiteUrl("/bilim-hesaplayicilari/fizik/egik-atis-hesaplama"),
      },
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
          <Link href="/bilim-hesaplayicilari">Bilim Hesaplayıcıları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/bilim-hesaplayicilari/fizik">Fizik</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Eğik Atış Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Eğik Atış Hesaplama</h1>
          <p>
            Başlangıç hızını, atış açısını ve (varsa) başlangıç
            yüksekliğini gir; menzili, maksimum yüksekliği ve uçuş
            süresini hesapla.
          </p>
        </header>

        <ProjectileMotionCalculator />

        <section className="category-article-content">
          <h2>Eğik Atış Hareketi Nedir?</h2>
          <p>
            Eğik atış (açılı atış), bir cismin yatayla θ açısı
            yaparak belirli bir hızla fırlatılması ve havada
            yalnızca yerçekiminin etkisiyle parabolik bir yörünge
            izlemesidir. Hava direnci ihmal edildiğinde hareket iki
            bağımsız bileşene ayrılır:
          </p>
          <ul>
            <li>
              <strong>Yatay bileşen:</strong> Sabit hızlı doğrusal
              hareket (v₀ × cos θ), zamanla değişmez.
            </li>
            <li>
              <strong>Dikey bileşen:</strong> Yerçekimi ivmesiyle
              yavaşlayan/hızlanan hareket (v₀ × sin θ ile başlar, g
              kadar ivmeyle değişir).
            </li>
          </ul>

          <h2>Formüller</h2>
          <dl className="unit-facts">
            <div>
              <dt>Yatay hız bileşeni</dt>
              <dd>vₓ = v₀ × cos θ</dd>
            </div>
            <div>
              <dt>Dikey hız bileşeni</dt>
              <dd>vᵧ = v₀ × sin θ</dd>
            </div>
            <div>
              <dt>Maksimum yükseklik</dt>
              <dd>h_max = h₀ + vᵧ² / (2g)</dd>
            </div>
            <div>
              <dt>Uçuş süresi (h₀ = 0 için)</dt>
              <dd>t = 2 × vᵧ / g</dd>
            </div>
            <div>
              <dt>Menzil (h₀ = 0 için)</dt>
              <dd>R = v₀² × sin(2θ) / g</dd>
            </div>
          </dl>
          <p>
            Başlangıç yüksekliği (h₀) sıfırdan farklıysa, uçuş
            süresi h₀ + vᵧt − ½gt² = 0 denkleminin pozitif kökünden
            bulunur; bu hesaplayıcı bu genel durumu da kapsar.
          </p>

          <h2>Yatay Atış ile İlişkisi</h2>
          <p>
            Açıyı 0° girip başlangıç yüksekliğini (h₀) pozitif bir
            değer olarak bırakırsan, bu hesaplayıcı otomatik olarak
            klasik <strong>yatay atış</strong> problemine dönüşür:
            dikey başlangıç hızı sıfır olur, cisim sadece
            yerçekimiyle düşerken yatayda sabit hızla ilerler.
          </p>

          <h2>Nerede Kullanılır?</h2>
          <p>
            Eğik atış hesaplamaları spor bilimlerinde (atletizm,
            gülle/cirit atma optimum açı analizi), balistikte, inşaat
            ve peyzaj mühendisliğinde (fıskiye/sulama menzili),
            oyun/simülasyon geliştirmede ve elbette fizik
            derslerinde (TYT/AYT) sıkça karşılaşılan bir konudur.
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
            Diğer fizik hesaplayıcıları için{" "}
            <Link href="/bilim-hesaplayicilari/fizik">Fizik Hesaplayıcıları</Link>
            {" "}sayfasına bakabilirsin.
          </p>
        </section>
      </div>
    </main>
  );
}
