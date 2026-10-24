import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import StairCalculator from "../components/StairCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Merdiven basamak sayısı nasıl hesaplanır?",
    answer:
      "İki kat arasındaki toplam yükseklik, istenen rıht (basamak) yüksekliğine bölünüp en yakın tam sayıya yuvarlanır. Örneğin 280 cm yükseklikte 17,5 cm'lik rıht hedeflersen 16 basamak çıkar; toplam yükseklik bu sayıya tekrar bölünerek her basamağın gerçek yüksekliği eşitlenir.",
  },
  {
    question: "Blondel formülü nedir?",
    answer:
      "Blondel formülü, rahat ve güvenli bir merdiven adımı için kullanılan klasik bir mimarlık kuralıdır: 2 × rıht yüksekliği + basamak derinliği ≈ 63 cm. Bu formül, kısa adımlarla dik bir merdiven ya da uzun adımlarla düz bir merdiven arasında dengeli, yürüyüş adımına yakın bir oran verir.",
  },
  {
    question: "Rıht ve basamak derinliği için ideal ölçüler nedir?",
    answer:
      "Konut merdivenlerinde rıht yüksekliği genellikle 16-20 cm arasında (ideali ~17-18 cm), basamak derinliği ise 24-33 cm arasında (ideali ~28-30 cm) kabul edilir. Bu aralıkların dışına çıkan merdivenler ya çok dik ve yorucu ya da gereksiz uzun olur.",
  },
  {
    question: "Bu hesaplama projeme yeterli mi, yoksa mimar/mühendise mi danışmalıyım?",
    answer:
      "Bu araç, ön çalışma ve genel bir fikir edinmek için Blondel formülüne dayanan pratik bir tahmin sunar. Ancak yapı ruhsatı, statik hesap, korkuluk yüksekliği ve yönetmelik uyumluluğu gibi konular için mutlaka bir mimar veya inşaat mühendisiyle çalışman gerekir.",
  },
];

const KAT_YUKSEKLIKLERI = [250, 270, 280, 300, 320, 350];
/** 17 cm hedef rıhtla eşit basamaklar ve Blondel (2h + b = 63) basamak genişliği. */
function merdiven(H: number) {
  const n = Math.round(H / 17);
  const h = H / n;
  const b = 63 - 2 * h;
  return { n, h, b, boy: (n - 1) * b };
}
const cm = (x: number, basamak = 1) => x.toLocaleString("tr-TR", { maximumFractionDigits: basamak });

export const metadata: Metadata = {
  title: "Merdiven Hesaplama: Basamak Sayısı ve Rıht Yüksekliği",
  description:
    "Toplam yükseklik ve istenen rıht yüksekliğine göre merdiven basamak sayısını, rıht yüksekliğini ve Blondel formülüyle basamak derinliğini hesapla.",
  alternates: {
    canonical: "/merdiven-hesaplama",
    languages: {
      "uz-UZ": "/uz/zinapoya-hisoblash",
    },
  },
  openGraph: {
    title: "Merdiven Hesaplama: Basamak Sayısı ve Rıht Yüksekliği",
    description:
      "Yüksekliği gir, güvenli ve konforlu merdiven ölçülerini anında hesapla.",
    url: buildSiteUrl("/merdiven-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function StairCalculatorPage() {
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
        name: "Merdiven Hesaplama",
        item: buildSiteUrl("/merdiven-hesaplama"),
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
          <span>Merdiven Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Merdiven Hesaplama</h1>
          <p>
            Toplam yükseklik ve istenen rıht yüksekliğine göre basamak
            sayısını, gerçek rıht yüksekliğini ve Blondel formülüyle
            basamak derinliğini anında hesapla.
          </p>
        </header>

        <StairCalculator />

        <section className="category-article-content">
          <h2 id="formul">Merdiven hesaplama formülü</h2>
          <p>Merdiven hesabı üç adımda yapılır. Kat yüksekliğine H, rıht sayısına n diyelim:</p>
          <ol>
            <li>
              <strong>Rıht sayısı:</strong> n = H ÷ 17 (sonuç en yakın tam sayıya yuvarlanır; 17 cm rahat bir hedef rıhttır).
            </li>
            <li>
              <strong>Gerçek rıht:</strong> h = H ÷ n. Böylece bütün basamaklar eşit yükseklikte olur.
            </li>
            <li>
              <strong>Basamak genişliği:</strong> b = 63 − 2h (Blondel: 2h + b ≈ 60–64 cm). Merdivenin yatay boyu (n − 1) × b
              kadardır, çünkü son rıht üst kata çıkar.
            </li>
          </ol>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Kat yüksekliği</th>
                  <th>Rıht sayısı</th>
                  <th>Rıht</th>
                  <th>Basamak genişliği</th>
                  <th>Yatay boy</th>
                </tr>
              </thead>
              <tbody>
                {KAT_YUKSEKLIKLERI.map((H) => {
                  const r = merdiven(H);
                  return (
                    <tr key={H}>
                      <td>{H} cm</td>
                      <td>{r.n}</td>
                      <td>{cm(r.h)} cm</td>
                      <td>{cm(r.b)} cm</td>
                      <td>{cm(r.boy / 100, 2)} m</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <h2 id="riht">Rıht, basamak ve sahanlık ne demek?</h2>
          <p>
            <strong>Rıht</strong>, iki basamak arasındaki dik yüzey ve onun yüksekliğidir; merdivenin ne kadar dik olduğunu
            belirler. <strong>Basamak (ayak basılan yüzey)</strong>, üzerine basılan yatay yüzeydir; genişliği yürüyüşün
            rahatlığını belirler. <strong>Sahanlık</strong>, merdiven kolunu ikiye bölen düz dinlenme alanıdır ve dönüşlü
            merdivenlerde kolun yön değiştirdiği yerdir.
          </p>

          <h2 id="sahanlik">Sahanlıklı merdiven nasıl hesaplanır?</h2>
          <p>
            Rıht sayısı ve rıht yüksekliği sahanlıktan etkilenmez; aynı formülle bulunur. Fark, basamakların iki kola
            bölünmesidir. Örneğin 300 cm kat yüksekliğinde {merdiven(300).n} rıht çıkar; iki kollu bir merdivende ilk kola{" "}
            {Math.ceil(merdiven(300).n / 2)}, ikinci kola {merdiven(300).n - Math.ceil(merdiven(300).n / 2)} rıht verilir.
            Her kolun yatay boyu kendi basamak sayısıyla hesaplanır, araya sahanlık derinliği eklenir. Tasarımda sahanlık
            derinliği genellikle en az merdiven kolunun genişliği kadar tutulur ki taşınan eşyalar dönüşte sıkışmasın.
          </p>

          <h2>Basamak sayısı ve rıht yüksekliği nasıl belirlenir?</h2>
          <p>
            İki kat arasındaki toplam yükseklik (kat yüksekliği), istediğin
            rıht yüksekliğine bölünüp en yakın tam sayıya yuvarlanarak
            basamak sayısı bulunur. Ardından toplam yükseklik bu basamak
            sayısına tekrar bölünerek her basamağın gerçek, eşit yüksekliği
            hesaplanır — böylece merdivenin her adımı aynı yükseklikte
            olur.
          </p>

          <h2>Basamak derinliği neden Blondel formülüyle hesaplanıyor?</h2>
          <p>
            Basamak derinliği, rıht yüksekliğiyle ters orantılı bir dengeye
            sahip olmalıdır: rıht yüksekse basamak derinliğinin az olması,
            rıht alçaksa basamak derinliğinin fazla olması gerekir —
            aksi halde merdiven ya çok dik ya da gereksiz uzun olur.
            Mimarlıkta yaygın kullanılan Blondel formülü (2 × rıht +
            basamak derinliği ≈ 63 cm), bu dengeyi doğal bir yürüyüş
            adımına yakın tutarak hesaplar.
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
            Diğer inşaat hesaplamaları için{" "}
            <Link href="/insaatci-araclari">İnşaatçı Araçları</Link>,{" "}
            mimar araçları için{" "}
            <Link href="/mimar-araclari">Mimar Araçları</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Blondel formülü ve rıht/basamak derinliği için konforlu ölçü
            aralıkları, mimarlık ve iç mekan tasarımı literatüründe yaygın
            kabul gören standart merdiven tasarım kurallarına dayanır.
          </p>
        </section>
      </div>
    </main>
  );
}
