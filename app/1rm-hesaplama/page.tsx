import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import OneRepMaxCalculator from "../components/OneRepMaxCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "1RM (bir tekrar maksimum) nedir?",
    answer:
      "1RM, bir hareketi (bench press, squat, deadlift vb.) doğru teknikle tek seferde kaldırabileceğin en yüksek ağırlıktır. Antrenman programlarında kullanılacak ağırlıklar genelde 1RM'in yüzdesi olarak belirlenir.",
  },
  {
    question: "1RM nasıl hesaplanır?",
    answer:
      "Gerçek 1RM'ini bulmak için tek tekrarla maksimum ağırlığı denemek gerekir; bu risklidir. Bunun yerine, submaksimal bir ağırlıkla (örneğin 5 tekrar) yapılan bir set üzerinden Epley formülüyle (1RM = Ağırlık × (1 + Tekrar/30)) tahmini 1RM hesaplanır.",
  },
  {
    question: "Antrenman yüzdesi tablosu ne işe yarar?",
    answer:
      "Tahmini 1RM'inden yola çıkarak, güç (yüksek % düşük tekrar) veya hipertrofi (düşük % yüksek tekrar) odaklı bir antrenman programı için hangi ağırlığı kullanman gerektiğini gösterir.",
  },
];

const TEKRARLAR = [1, 2, 3, 4, 5, 6, 8, 10, 12];
/** Epley: ağırlık / 1RM = 1 / (1 + tekrar / 30) */
const yuzde = (tekrar: number) => (tekrar === 1 ? 100 : 100 / (1 + tekrar / 30));

export const metadata: Metadata = {
  title: "1RM Hesaplama: Bir Tekrar Maksimum ve Antrenman Yüzdesi",
  description:
    "Kaldırdığın ağırlık ve tekrar sayısından Epley formülüyle tahmini 1RM'ini (bir tekrar maksimum) hesapla; antrenman yüzdesi tablosuyla programına uygun ağırlıkları bul.",
  alternates: {
    canonical: "/1rm-hesaplama",
    languages: {
      "uz-UZ": "/uz/1rm-hisoblash",
    },
  },
  openGraph: {
    title: "1RM Hesaplama: Bir Tekrar Maksimum ve Antrenman Yüzdesi",
    description: "Epley formülüyle tahmini 1RM ve antrenman yüzdesi tablosu.",
    url: buildSiteUrl("/1rm-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function OneRepMaxCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Tüm Hesaplamalar", item: buildSiteUrl("/hesaplayicilar") },
      { "@type": "ListItem", position: 3, name: "Sağlık ve Spor", item: buildSiteUrl("/hesaplayicilar#saglik-ve-spor") },
      { "@type": "ListItem", position: 4, name: "1RM Hesaplama", item: buildSiteUrl("/1rm-hesaplama") },
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
          <Link href="/hesaplayicilar#saglik-ve-spor">Sağlık ve Spor</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>1RM Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>1RM Hesaplama</h1>
          <p>
            Bir hareketle kaldırdığın ağırlığı ve yaptığın tekrar
            sayısını gir: Epley formülüyle tahmini 1RM&apos;ini ve
            antrenman programına uygun yüzde tablosunu gör.
          </p>
        </header>

        <OneRepMaxCalculator />

        <section className="category-article-content">
          <h2 id="tekrar">Kaç tekrar, 1RM&apos;nin yüzde kaçı?</h2>
          <p>
            Bu sayfadaki hesap Epley formülünü kullanır: <strong>1RM = ağırlık × (1 + tekrar ÷ 30)</strong>. Formül tersten
            okunduğunda, belli bir tekrar sayısını ancak kaldırabildiğiniz ağırlığın 1RM&apos;nin yüzde kaçı olduğunu verir.
            Antrenman programları bu tabloyla kurulur.
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Tekrar</th>
                  <th>1RM&apos;nin %&apos;si</th>
                  <th>1RM 100 kg ise</th>
                </tr>
              </thead>
              <tbody>
                {TEKRARLAR.map((r) => (
                  <tr key={r}>
                    <td>{r}</td>
                    <td>%{Math.round(yuzde(r))}</td>
                    <td>{Math.round(yuzde(r) * 10) / 10} kg</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Örnek: bench press&apos;te 80 kg&apos;ı 6 tekrar kaldırabiliyorsanız tahmini 1RM&apos;niz 80 × (1 + 6 ÷ 30) ={" "}
            {80 * (1 + 6 / 30)} kg&apos;dır. Formül 10–12 tekrara kadar güvenilirdir; daha yüksek tekrarlarda tahmin sapar.
            Gerçek 1RM denemesini yardımcı (spotter) eşliğinde ve ısındıktan sonra yapın.
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
            Diğer antrenör araçları için{" "}
            <Link href="/hesaplayicilar#saglik-ve-spor">Sağlık ve Spor</Link>
            {" "}sayfasına, beslenme ve klinik hesaplamalar için{" "}
            <Link href="/hesaplayicilar#saglik-ve-spor">Sağlık ve Spor</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Epley formülü, direnç antrenmanında yaygın kullanılan
            tahmini bir modeldir; gerçek 1RM, teknik, yorgunluk ve
            hareket türüne göre değişebilir. Bu araç tıbbi veya
            antrenörlük tavsiyesi yerine geçmez.
          </p>
        </section>
      </div>
    </main>
  );
}
