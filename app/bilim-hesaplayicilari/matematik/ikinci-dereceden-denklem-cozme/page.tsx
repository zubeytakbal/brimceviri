import { germanMathAlternatesForTurkish } from "@/app/i18n/germanMathPages";
import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import QuadraticEquationCalculator from "../../../components/QuadraticEquationCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Delta (diskriminant) nedir?",
    answer:
      "Delta (Δ), ax² + bx + c = 0 denkleminin köklerinin durumunu belirleyen Δ = b² − 4ac ifadesidir. Denklemi doğrudan çözmeden, kaç tane gerçek kökü olduğunu (2, 1 ya da 0) söyler.",
  },
  {
    question: "Delta pozitif, sıfır ve negatif olunca ne olur?",
    answer:
      "Δ > 0 ise denklemin 2 farklı gerçek kökü vardır. Δ = 0 ise denklemin 1 tane (çift/tekrarlı) gerçek kökü vardır — parabol x eksenine tam bir noktada teğettir. Δ < 0 ise denklemin gerçek sayılarda hiç kökü yoktur — parabol x eksenini hiç kesmez.",
  },
  {
    question: "Kökler nasıl hesaplanır?",
    answer:
      "Δ ≥ 0 olduğunda kökler x = (−b ± √Δ) / 2a formülüyle (kuadratik formül) bulunur. Δ > 0 ise ± işaretinden iki farklı kök, Δ = 0 ise tek bir kök (± fark etmez) elde edilir.",
  },
  {
    question: "a katsayısı neden 0 olamaz?",
    answer:
      "a = 0 olduğunda x² terimi ortadan kalkar ve denklem bx + c = 0 şeklinde doğrusal (birinci dereceden) bir denkleme dönüşür — artık ikinci dereceden değildir.",
  },
];

// "Delta ile kök bulma" örnekleri: üç durum (Δ > 0, Δ = 0, Δ < 0); delta ve kökler derlemede hesaplanır.
const ORNEKLER: Array<[number, number, number]> = [
  [1, -5, 6],
  [2, 3, -2],
  [1, 0, -9],
  [1, -4, 4],
  [4, -12, 9],
  [1, 2, 5],
];
const sayi = (n: number) => n.toLocaleString("tr-TR", { maximumFractionDigits: 3 });
const terim = (k: number, x: string, ilk: boolean) => {
  if (k === 0) return "";
  const isaret = k < 0 ? (ilk ? "−" : " − ") : ilk ? "" : " + ";
  const mutlak = Math.abs(k);
  return `${isaret}${mutlak === 1 && x ? "" : sayi(mutlak)}${x}`;
};
const denklem = ([a, b, c]: [number, number, number]) => `${terim(a, "x²", true)}${terim(b, "x", false)}${terim(c, "", false)} = 0`;
const cozum = ([a, b, c]: [number, number, number]) => {
  const delta = b * b - 4 * a * c;
  if (delta < 0) return { delta, kokler: "Gerçek kök yok (Δ < 0)" };
  if (delta === 0) return { delta, kokler: `Tek (çakışık) kök: x = ${sayi(-b / (2 * a))}` };
  const x1 = (-b + Math.sqrt(delta)) / (2 * a);
  const x2 = (-b - Math.sqrt(delta)) / (2 * a);
  return { delta, kokler: `x₁ = ${sayi(x1)}, x₂ = ${sayi(x2)}` };
};

export const metadata: Metadata = {
  title: "İkinci Dereceden Denklem Çözme (Delta Hesaplama)",
  description:
    "ax² + bx + c = 0 denklemindeki delta (diskriminant) değerini ve kökleri adım adım hesapla — iki farklı kök, çift kök veya gerçek kök yok durumlarını gör.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/matematik/ikinci-dereceden-denklem-cozme",
    ...germanMathAlternatesForTurkish("/bilim-hesaplayicilari/matematik/ikinci-dereceden-denklem-cozme"),
  },
  openGraph: {
    title: "İkinci Dereceden Denklem Çözme (Delta Hesaplama)",
    description: "ax² + bx + c = 0 denklemini delta ile adım adım çöz.",
    url: buildSiteUrl(
      "/bilim-hesaplayicilari/matematik/ikinci-dereceden-denklem-cozme"
    ),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function IkinciDerecedenDenklemPage() {
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
        name: "Hesaplamalar",
        item: buildSiteUrl("/hesaplayicilar"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Matematik",
        item: buildSiteUrl("/hesaplayicilar#matematik"),
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "İkinci Dereceden Denklem Çözme",
        item: buildSiteUrl(
          "/bilim-hesaplayicilari/matematik/ikinci-dereceden-denklem-cozme"
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
          <Link href="/hesaplayicilar">Hesaplamalar</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/hesaplayicilar#matematik">Matematik</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>İkinci Dereceden Denklem Çözme</span>
        </nav>

        <header className="all-conversions-header">
          <h1>İkinci Dereceden Denklem Çözme (Delta Hesaplama)</h1>
          <p>
            ax² + bx + c = 0 denklemindeki a, b, c katsayılarını gir — delta
            (diskriminant) ve kökler adım adım hesaplansın.
          </p>
        </header>

        <div className="unit-page-converter">
          <div className="category-general-converter">
            <QuadraticEquationCalculator />
          </div>
        </div>

        <section className="category-article-content">
          <h2>İkinci dereceden denklem nedir?</h2>
          <p>
            <strong>İkinci dereceden (kuadratik) denklem</strong>, en yüksek
            üssü 2 olan, ax² + bx + c = 0 genel formundaki denklemdir (a ≠
            0). Grafiği bir <strong>parabol</strong>dür; denklemin gerçek
            kökleri, bu parabolün x eksenini kestiği noktaların x
            koordinatlarıdır.
          </p>

          <h2>Delta (diskriminant) nedir?</h2>
          <p>
            <strong>Delta (Δ)</strong>, denklemi doğrudan çözmeden kök
            durumunu ortaya koyan bir ifadedir: Δ = b² − 4ac. Bu araç
            girdiğin a, b, c değerleriyle önce deltayı, sonra köklerin kaç
            tane ve ne olduğunu hesaplar.
          </p>

          <h2>Delta&apos;nın işareti ne anlama gelir?</h2>
          <p>
            <strong>Δ &gt; 0:</strong> Parabol x eksenini 2 farklı noktada
            keser — denklemin 2 farklı gerçek kökü vardır.
            <br />
            <strong>Δ = 0:</strong> Parabol x eksenine tam 1 noktada teğettir
            — denklemin 1 tane (çift/tekrarlı) gerçek kökü vardır.
            <br />
            <strong>Δ &lt; 0:</strong> Parabol x eksenini hiç kesmez —
            denklemin gerçek sayılarda kökü yoktur (kökler karmaşık
            sayılardır).
          </p>

          <h2>Kuadratik formül (kök bulma formülü)</h2>
          <p>
            Δ ≥ 0 olduğunda kökler şu formülle bulunur: x = (−b ± √Δ) / 2a.
            Δ &gt; 0 iken ± işareti iki farklı kök verir (x₁ = (−b+√Δ)/2a,
            x₂ = (−b−√Δ)/2a); Δ = 0 iken √Δ = 0 olduğundan tek bir kök kalır
            (x = −b/2a).
          </p>

          <h2 id="delta-ile-kok-bulma">Delta ile kök bulma: çözülmüş örnekler</h2>
          <p>
            Önce Δ = b² − 4ac hesaplanır, sonra işaretine bakılır: Δ &gt; 0 ise iki kök, Δ = 0 ise tek kök vardır, Δ &lt; 0 ise
            gerçek kök yoktur. Örneğin x² − 5x + 6 = 0 için a = 1, b = −5, c = 6; Δ = 25 − 24 = 1 ve kökler (5 ± 1) / 2, yani 3 ve 2.
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th scope="col">Denklem</th>
                  <th scope="col">Δ = b² − 4ac</th>
                  <th scope="col">Kökler</th>
                </tr>
              </thead>
              <tbody>
                {ORNEKLER.map((o) => {
                  const r = cozum(o);
                  return (
                    <tr key={o.join(",")}>
                      <td>{denklem(o)}</td>
                      <td>{sayi(r.delta)}</td>
                      <td>{r.kokler}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <h2>Gerçek hayatta nerede kullanılır?</h2>
          <p>
            İkinci dereceden denklemler, bir cismin yerçekimi altındaki
            hareketinde (atış hareketi — yüksekliğin zamana göre denklemi
            karesel bir ifadedir), bir dikdörtgen alanın maksimum/minimum
            değerini bulma problemlerinde, kâr-zarar ve maliyet
            optimizasyonu problemlerinde (kârın karesel bir fonksiyon
            olduğu durumlarda) sıkça kullanılır.
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
            İki veya üç bilinmeyenli bir denklem sistemin varsa{" "}
            <Link href="/bilim-hesaplayicilari/matematik/2-bilinmeyenli-denklem-sistemi-cozme">
              2 Bilinmeyenli
            </Link>{" "}
            veya{" "}
            <Link href="/bilim-hesaplayicilari/matematik/3-bilinmeyenli-denklem-sistemi-cozme">
              3 Bilinmeyenli Denklem Sistemi Çözme
            </Link>{" "}
            aracına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Delta (diskriminant) tanımı ve kuadratik formül, standart lise
            (10. sınıf) matematik müfredatına dayanır.
          </p>
        </section>

      </div>
    </main>
  );
}
