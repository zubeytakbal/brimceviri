import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import AyarCevirici from "../components/AyarCevirici";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { seoTitle } from "../seoTitle";
import { buildSiteUrl } from "../siteConfig";

// "22 ayar altını 24 ayara çevirme": bilezik ve ziynet altının has karşılığı, 24 ayar gram altın eşdeğeri (916 → 995)
// ve bozdururken kuyumcunun hesabı.
const path = "/22-ayar-altin-24-ayar-altin";
const title = "22 Ayar Altını 24 Ayara Çevirme: Has Karşılığı ve Tablo";
const description =
  "22 ayar bilezik kaç gram has altın, kaç gram 24 ayar gram altın eder? 1–100 gram tablo, kuyumcu milyemiyle formül (916 → 995) ve bileziği bozdururken işçiliğin neden düşüldüğü.";

export const metadata: Metadata = {
  title: seoTitle(title, "22 Ayar Altını 24 Ayara Çevirme"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const g = (n: number) => n.toLocaleString("tr-TR", { minimumFractionDigits: 3, maximumFractionDigits: 3 });
const M24 = 995;
const M22 = 916;
const has = (w: number) => (w * M22) / 1000;
const gramAltin = (w: number) => (w * M22) / M24;
const GRAMLAR = [1, 5, 10, 15, 20, 30, 50, 100];

const faqItems: FaqItem[] = [
  {
    question: "22 ayar altını 24 ayara çevirme nasıl yapılır?",
    answer: `24 ayar karşılığı = 22 ayar ağırlık × 916 / 995. 10 gram 22 ayar, ${g(gramAltin(10))} gram 24 ayar gram altına denk gelir. Bu bir değer hesabıdır; altının kendisini 24 ayara çıkarmak için içindeki alaşımın rafineride ayrılması gerekir.`,
  },
  {
    question: "10 gram 22 ayar bilezik kaç gram has altın eder?",
    answer: `${g(has(10))} gram has (saf) altın eder: 10 × 916 / 1000. Kalan ${g(10 - has(10))} gram bakır ve gümüş alaşımıdır.`,
  },
  {
    question: "20 gram bilezik kaç gram gram altın eder?",
    answer: `İşçiliksiz ${g(gramAltin(20))} gram 24 ayar gram altın eder. Kuyumcu bozdururken 916 milyem üzerinden has hesabı yapar ve kendi alış marjını düşer.`,
  },
  {
    question: "Bilezik bozdururken işçilik neden geri alınmaz?",
    answer: "İşçilik, bileziğin yapım bedelidir ve satış fiyatına eklenir. Bozdurmada kuyumcu yalnızca içindeki altını alır, bileziği eritip yeniden işleyeceği için işçilik ödemez. Bu yüzden takı olarak alınan altın, gram altına göre bozdururken daha çok kayıp verir.",
  },
  {
    question: "22 ayar altın neden 916 milyem?",
    answer: "22 ayar, 24 parçanın 22'si altın demektir (%91,67). Damga standardı bunu binde 916 olarak yazar; Türkiye'de bilezik ve Darphane altınları 916 milyem kabul edilir.",
  },
];

export default function YirmiIkiYirmiDortPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana sayfa" },
        { href: "/altin-hesaplama", label: "Altın Hesaplama" },
        { href: path, label: "22 ayar → 24 ayar" },
      ]}
      crumbLabel="Sayfa yolu"
      title="22 ayar altını 24 ayara çevirme"
      intro="Bilezik, ziynet ve Cumhuriyet altınları 22 ayardır. Gramı girin; içinde kaç gram has altın olduğunu ve kaç gram 24 ayar gram altına denk geldiğini görün."
      tool={<AyarCevirici kaynak={22} hedef={24} />}
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: "/24-ayar-altin-22-ayar-altin", label: "24 ayar altını 22 ayara çevirme" },
          { href: "/altin-hesaplama", label: "Altın hesaplama (çeyrek, yarım, tam)" },
          { href: "/has-hesaplama", label: "Hurda altın ve has hesaplama" },
          { href: "/kategoriler/altin-ayar", label: "Tüm altın ayar dönüşümleri" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "tablo", label: "22 ayardan 24 ayara tablo" },
        { id: "bozdurma", label: "Bilezik bozdururken hesap" },
        { id: "rafineri", label: "22 ayar altın 24 ayara çıkarılabilir mi?" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="tablo">22 ayardan 24 ayara tablo</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">22 ayar (916)</th>
              <th scope="col">Has altın (1000)</th>
              <th scope="col">24 ayar gram altın (995)</th>
              <th scope="col">İçindeki alaşım</th>
            </tr>
          </thead>
          <tbody>
            {GRAMLAR.map((w) => (
              <tr key={w}>
                <th scope="row">{w} g</th>
                <td>{g(has(w))} g</td>
                <td>{g(gramAltin(w))} g</td>
                <td>{g(w - has(w))} g</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Has altın tam saf (1000 milyem) altındır; piyasadaki 24 ayar gram altın ise 995 milyemdir. Bu yüzden aynı bilezik, has olarak {g(has(10))} gram,
        gram altın olarak {g(gramAltin(10))} gram eder (10 gram için).
      </p>

      <h2 id="bozdurma">Bilezik bozdururken hesap</h2>
      <p>
        Kuyumcu 22 ayar bileziği bozdururken işçiliği düşer ve has karşılığı üzerinden hesap yapar: 20 gram bilezik × 916 / 1000 = {g(has(20))} gram has.
        Satın alırken ise aynı bilezik işçilikle, örneğin 936 milyemden ({g((20 * 936) / 1000)} gram has fiyatına) satılır. Alış ile bozdurma arasındaki
        bu fark takı altınının maliyetidir. Ziynet ve Cumhuriyet altınlarının has karşılıkları için{" "}
        <Link href="/altin-hesaplama">altın hesaplama</Link> sayfasına bakın.
      </p>

      <h2 id="rafineri">22 ayar altın 24 ayara çıkarılabilir mi?</h2>
      <p>
        Kuyumcu tezgâhında hayır. 22 ayarı 24 ayara çıkarmak için içindeki bakır ve gümüşün kimyasal ya da elektrolitik yolla ayrılması gerekir; bunu
        rafineriler toplu olarak yapar. Günlük hayatta &quot;22 ayarı 24 ayara çevirme&quot;, bu sayfadaki gibi değer hesabıdır: elinizdeki altın kaç gram
        gram altın eder?
      </p>
      <p>
        <small>Milyemler kuyumcu uygulamasına göredir (22 ayar 916, 24 ayar gram altın 995). Kuyumcu alış fiyatları işçilik ve marj nedeniyle farklıdır.</small>
      </p>
    </TimeToolPage>
  );
}
