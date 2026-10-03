import type { Metadata } from "next";
import { FidanSayisiHesaplama } from "../components/HayvancilikAraclari";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { dekaraBitki } from "../converter/hayvancilik";
import { tarimRelated } from "../i18n/tarimAraclari";
import { seoTitle } from "../seoTitle";
import { buildSiteUrl } from "../siteConfig";

const path = "/dekara-fidan-sayisi-hesaplama";
const title = "Dekara Fidan Sayısı Hesaplama: Dönüme Kaç Ağaç, Kaç Fide?";
const description =
  "Sıra arası ve sıra üzeri mesafeyi girin: dekara (dönüme) kaç fidan, ağaç ya da fide düştüğünü, üçgen (şeşbeş) dikimde kaç bitki sığdığını ve tarlanız için toplam fidanı hesaplayın.";

export const metadata: Metadata = {
  title: seoTitle(title, "Dekara Fidan Sayısı Hesaplama"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const ornekler: Array<[string, number, number, "m" | "cm"]> = [
  ["Ceviz", 10, 10, "m"],
  ["Zeytin", 6, 6, "m"],
  ["Badem, kiraz", 6, 5, "m"],
  ["Fındık (ocak)", 4.5, 4.5, "m"],
  ["Elma (yarı bodur)", 4, 2, "m"],
  ["Elma (bodur)", 3.5, 1, "m"],
  ["Bağ (asma)", 2.5, 1.5, "m"],
  ["Domates (tarla)", 120, 40, "cm"],
  ["Biber", 70, 30, "cm"],
  ["Lahana", 60, 50, "cm"],
];

const faqItems: FaqItem[] = [
  {
    question: "Dekara fidan sayısı nasıl hesaplanır?",
    answer: "1 dekar 1.000 m²'dir. Bir fidanın kapladığı alan sıra arası × sıra üzeri mesafedir; 1.000 bu alana bölünür. Örneğin 4 m × 1,5 m dikimde bir fidan 6 m² kaplar, dekara 1.000 ÷ 6 = 166 fidan düşer.",
  },
  {
    question: "Dönüme kaç ceviz ağacı dikilir?",
    answer: `10 m × 10 m dikimde dönüme ${Math.floor(dekaraBitki("dikdortgen", 10, 10)!)}, 8 m × 8 m dikimde ${Math.floor(dekaraBitki("dikdortgen", 8, 8)!)} ceviz ağacı düşer. Mesafe çeşide, anaca ve toprağa göre ziraat mühendisiyle belirlenmelidir.`,
  },
  {
    question: "Üçgen (şeşbeş) dikim kaç ağaç kazandırır?",
    answer: "Eşkenar üçgen dikimde sıralar arası mesafe dikim mesafesinin 0,866 katıdır; aynı ağaç arası mesafede kare dikime göre dekara yaklaşık %15 daha fazla bitki sığar ve ağaçlar eşit aralıklı kalır.",
  },
  {
    question: "Fide alırken ne kadar yedek almalıyım?",
    answer: "Dikimden sonra ölen ya da zayıf kalan fideleri tamamlamak için genellikle %5–10 yedek alınır. Hesaplayıcıdaki yedek yüzdesi bunu toplam sayıya ekler.",
  },
];

export default function FidanSayisiPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/ciftci-araclari", label: "Tarım ve Hayvancılık" },
        { href: path, label: "Dekara Fidan Sayısı" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Dekara Fidan ve Fide Sayısı Hesaplama"
      intro="Sıra arası ve sıra üzeri dikim mesafesini girin; dekara (dönüme) kaç fidan, ağaç ya da fide düştüğünü ve tarlanız için yedekle birlikte kaç adet almanız gerektiğini görün. Üçgen (şeşbeş) dikim de hesaplanır."
      tool={<FidanSayisiHesaplama />}
      related={{ title: "Diğer tarım ve hayvancılık araçları", links: tarimRelated(path) }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "ornekler", label: "Yaygın dikim mesafeleri" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
      <h2 id="ornekler">Yaygın dikim mesafeleri ve dekara düşen bitki</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Bitki</th>
              <th scope="col">Sıra arası × sıra üzeri</th>
              <th scope="col">Dekara</th>
            </tr>
          </thead>
          <tbody>
            {ornekler.map(([ad, a, b, u]) => {
              const k = u === "cm" ? 0.01 : 1;
              return (
                <tr key={ad}>
                  <th scope="row">{ad}</th>
                  <td>
                    {String(a).replace(".", ",")} × {String(b).replace(".", ",")} {u}
                  </td>
                  <td>{Math.floor(dekaraBitki("dikdortgen", a * k, b * k)!).toLocaleString("tr-TR")} adet</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p>Mesafeler örnektir; çeşit, anaç, sulama ve makineli işleme göre değişir. Kesin dikim planı için il veya ilçe tarım müdürlüğüne ya da bir ziraat mühendisine danışın.</p>
    </TimeToolPage>
  );
}
