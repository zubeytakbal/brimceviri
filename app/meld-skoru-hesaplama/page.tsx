import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import MeldCalculator from "../components/MeldCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "MELD skoru ne için kullanılır?",
    answer:
      "MELD (Model for End-Stage Liver Disease), kronik karaciğer hastalığının ciddiyetini bilirubin, INR ve kreatinin değerlerinden hesaplayan, karaciğer nakli bekleme listesinde hasta önceliklendirmesi için kullanılan uluslararası standart bir skordur.",
  },
  {
    question: "MELD skoru neden 6 ile 40 arasında sınırlı?",
    answer:
      "Standart MELD formülü, çok düşük veya çok yüksek laboratuvar değerlerinin skoru anlamsız şekilde bozmasını önlemek için 6-40 aralığına sınırlandırılır; ayrıca diyalizdeki hastalarda kreatinin otomatik olarak 4,0 kabul edilir.",
  },
];

export const metadata: Metadata = {
  title: "MELD Skoru Hesaplama (Karaciğer Hastalığı)",
  description:
    "Bilirubin, INR ve kreatinin değerlerinden MELD skorunu hesapla; karaciğer hastalığının ciddiyetini değerlendir.",
  alternates: { canonical: "/meld-skoru-hesaplama" },
  openGraph: {
    title: "MELD Skoru Hesaplama (Karaciğer Hastalığı)",
    description: "MELD skorunu hesaplayın.",
    url: buildSiteUrl("/meld-skoru-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

// Örnek hesap: bilirubin 2,0, INR 1,5, kreatinin 1,2 (mg/dL).
const meldOrnek = 3.78 * Math.log(2) + 11.2 * Math.log(1.5) + 9.57 * Math.log(1.2) + 6.43;

export default function MeldPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "MELD Skoru Hesaplama", item: buildSiteUrl("/meld-skoru-hesaplama") },
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
          <span>MELD Skoru Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>MELD Skoru Hesaplama</h1>
          <p>
            Bilirubin, INR ve kreatinin değerlerini gir: MELD skorunu
            ve karaciğer hastalığının ciddiyetini anında hesapla.
          </p>
        </header>

        <MeldCalculator />

        <section className="category-article-content">
          <h2>MELD Formülü</h2>
          <p>
            MELD = 3.78×ln(bilirubin mg/dL) + 11.2×ln(INR) +
            9.57×ln(kreatinin mg/dL) + 6.43. Her değer en az 1,0 kabul
            edilir; kreatinin 4,0 ile sınırlandırılır ve diyalizdeki
            hastalarda otomatik olarak 4,0 kullanılır. Sonuç 6-40
            aralığına yuvarlanır.
          </p>

          <h2>Örnek hesap</h2>
          <p>
            Bilirubin 2,0 mg/dL, INR 1,5 ve kreatinin 1,2 mg/dL olan bir hastada: 3,78 × ln(2,0) + 11,2 × ln(1,5) + 9,57 × ln(1,2) +
            6,43 ≈ {meldOrnek.toLocaleString("tr-TR", { maximumFractionDigits: 1 })}; yuvarlanmış MELD skoru {Math.round(meldOrnek)}&apos;tir.
          </p>

          <h2>MELD puanı ne anlatır?</h2>
          <p>
            Skor yükseldikçe 3 aylık ölüm riski artar. Hastanede yatan kronik karaciğer hastalarında yapılan ve sık kaynak gösterilen
            çalışmada (Wiesner ve ark., 2003) puan aralıklarına göre 3 aylık ölüm oranları şöyle bulunmuştur:
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>MELD</th>
                  <th>3 aylık ölüm oranı</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>9 ve altı</td><td>%1,9</td></tr>
                <tr><td>10–19</td><td>%6,0</td></tr>
                <tr><td>20–29</td><td>%19,6</td></tr>
                <tr><td>30–39</td><td>%52,6</td></tr>
                <tr><td>40 ve üzeri</td><td>%71,3</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            Bu araç özgün MELD formülünü kullanır. ABD&apos;de nakil listesi 2016&apos;da sodyumu da hesaba katan MELD-Na&apos;ya, 2023&apos;te
            cinsiyet ve albümini de ekleyen MELD 3.0&apos;a geçti; ülkelerin ve merkezlerin kullandığı sürüm farklı olabilir.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>MELD skoru ne için kullanılır?</strong>
            <br />
            MELD, kronik karaciğer hastalığının ciddiyetini bilirubin,
            INR ve kreatinin değerlerinden hesaplayan, karaciğer nakli
            bekleme listesinde hasta önceliklendirmesi için kullanılan
            uluslararası standart bir skordur.
          </p>
          <p>
            <strong>MELD skoru neden 6 ile 40 arasında sınırlı?</strong>
            <br />
            Standart MELD formülü, çok düşük veya çok yüksek
            laboratuvar değerlerinin skoru anlamsız şekilde
            bozmasını önlemek için 6-40 aralığına sınırlandırılır;
            diyalizdeki hastalarda kreatinin otomatik olarak 4,0
            kabul edilir.
          </p>

          <h2>Diğer Risk Skorlama Araçları</h2>
          <ul className="related-conversion-list">
            <li><Link href="/glasgow-koma-skalasi-hesaplama">Glasgow Koma Skalası Hesaplama</Link></li>
            <li><Link href="/sofa-skoru-hesaplama">SOFA Skoru Hesaplama</Link></li>
            <li><Link href="/qsofa-hesaplama">qSOFA Hesaplama</Link></li>
            <li><Link href="/wells-skoru-hesaplama">Wells Skoru Hesaplama</Link></li>
            <li><Link href="/cha2ds2-vasc-skoru-hesaplama">CHA2DS2-VASc Skoru Hesaplama</Link></li>
          </ul>

          <h2>İlgili araçlar</h2>
          <p>
            Diğer doktor ve hemşire araçları için{" "}
            <Link href="/hesaplayicilar#klinik">Klinik Skorlar</Link>{" "}
            sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Skor, Kamath PS ve ark. (2001) tarafından geliştirilmiş
            ve UNOS/OPTN karaciğer nakli önceliklendirme sisteminde
            kullanılmaktadır. Bu araç tıbbi tavsiye yerine geçmez;
            klinik karar için bir hekime danışılmalıdır.
          </p>
        </section>
      </div>
    </main>
  );
}
