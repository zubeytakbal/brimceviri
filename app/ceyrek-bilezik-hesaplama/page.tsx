import type { Metadata } from "next";
import BilezikHesaplama from "../components/BilezikHesaplama";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { bilezikKarsiligi, SIKKELER } from "../converter/turkishAltin";
import { buildSiteUrl } from "../siteConfig";

const path = "/ceyrek-bilezik-hesaplama";
const title = "Çeyrek Altın Kaç Gram Bilezik Eder? Çeyrekten Bileziğe Hesaplama";
const description =
  "Çeyrek, yarım, tam ve Ata altınlarını girin: kaç gram 22 ayar bilezik ettiğini işçiliksiz ve işçilikli olarak hesaplayın. 1'den 20 çeyreğe kadar bilezik gramı tablosu.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const g = (n: number) => n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const ceyrek = SIKKELER.find((s) => s.id === "ceyrek-altin")!;
const on = bilezikKarsiligi({ "ceyrek-altin": 10 }, 30)!;

const faqItems: FaqItem[] = [
  {
    question: "1 çeyrek altın kaç gram?",
    answer: `Ziynet çeyrek altın ${ceyrek.gram.toLocaleString("tr-TR")} gramdır ve 22 ayar basılır; içindeki has (24 ayar) altın yaklaşık 1,61 gramdır. Ata çeyrek ise 1,804 gramdır.`,
  },
  {
    question: "10 çeyrek altın kaç gram bilezik eder?",
    answer: `10 çeyrek yaklaşık ${g(on.brut)} gram 22 ayar altındır; işçiliksiz birebir değişimde ${g(on.isciliksiz)} gram bilezik eder. Kuyumcu 30 milyem işçilik alırsa yaklaşık ${g(on.iscilikli)} gram bilezik alabilirsiniz.`,
  },
  {
    question: "Çeyrek altını bileziğe çevirince neden gram azalıyor?",
    answer:
      "Çeyrek ve bilezik aynı ayarda (22 ayar) olsa da kuyumcu bileziği işçilik payıyla satar. Bu pay milyem olarak eklenir; örneğin 916 milyemlik bilezik 946 milyemden satılıyorsa 30 milyem işçilik vardır ve aynı altınla yaklaşık %3 daha az gram bilezik alırsınız.",
  },
  {
    question: "Bilezik işçiliği kaç milyem olur?",
    answer:
      "22 ayar düz ve burma bileziklerde işçilik genellikle 10–60 milyem arasındadır; modelli ve el işi bileziklerde daha yüksek olabilir. İşçilik kuyumcuya göre değiştiği için almadan önce sorun.",
  },
];

export default function CeyrekBilezikPage() {
  const satirlar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 20];
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/kuyumcu-araclari", label: "Kuyumcu Araçları" },
        { href: path, label: "Çeyrek → Bilezik" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Çeyrek Altın Kaç Gram Bilezik Eder?"
      intro="Elinizdeki çeyrek, yarım, tam ve Ata altınların sayısını girin; kaç gram 22 ayar bilezik ettiğini işçiliksiz ve kuyumcunun işçilik payıyla birlikte görün."
      tool={<BilezikHesaplama />}
      related={{
        title: "Diğer altın araçları",
        links: [
          { href: "/altin-hesaplama", label: "Altın Hesaplama (çeyrek, yarım, tam)" },
          { href: "/has-hesaplama", label: "Hurda Altın ve Has Hesaplama" },
          { href: "/24-ayar-altin-22-ayar-altin", label: "24 Ayar → 22 Ayar Çevirme" },
          { href: "/kategoriler/altin-ayar", label: "Altın Ayar Dönüşümleri" },
          { href: "/zekat-hesaplama", label: "Altın Zekâtı Hesaplama" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "tablo", label: "Çeyrek sayısına göre bilezik gramı" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
      <h2 id="tablo">Çeyrek sayısına göre bilezik gramı</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Çeyrek</th>
              <th scope="col">İşçiliksiz bilezik</th>
              <th scope="col">20 milyem işçilikle</th>
              <th scope="col">40 milyem işçilikle</th>
            </tr>
          </thead>
          <tbody>
            {satirlar.map((n) => {
              const a = bilezikKarsiligi({ "ceyrek-altin": n }, 20)!;
              const b = bilezikKarsiligi({ "ceyrek-altin": n }, 40)!;
              return (
                <tr key={n}>
                  <th scope="row">{n} çeyrek</th>
                  <td>{g(a.isciliksiz)} g</td>
                  <td>{g(a.iscilikli)} g</td>
                  <td>{g(b.iscilikli)} g</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p>Değerler 22 ayar (916 milyem) bilezik içindir. Kuyumcular arasında çeyrek alış ve bilezik satış milyemleri farklılık gösterebilir; tablo tahmini karşılıktır.</p>
    </TimeToolPage>
  );
}
