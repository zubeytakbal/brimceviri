import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import AyarCevirici from "../components/AyarCevirici";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { seoTitle } from "../seoTitle";
import { buildSiteUrl } from "../siteConfig";

// "24 ayar altını 22 ayara çevirme": kuyumcu milyemiyle (995 → 916) gram altının 22 ayar karşılığı, eklenen alaşım,
// has altından 22 ayara ve gram altınla bilezik hesabı.
const path = "/24-ayar-altin-22-ayar-altin";
const title = "24 Ayar Altını 22 Ayara Çevirme: Formül ve Tablo";
const description =
  "24 ayar gram altın kaç gram 22 ayar eder, kaç gram alaşım eklenir? Kuyumcu milyemiyle (995 → 916) formül, 1–100 gram tablo, has altından 22 ayara çevirme ve gram altınla bilezik hesabı.";

export const metadata: Metadata = {
  title: seoTitle(title, "24 Ayar Altını 22 Ayara Çevirme"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const g = (n: number) => n.toLocaleString("tr-TR", { minimumFractionDigits: 3, maximumFractionDigits: 3 });
const M24 = 995;
const M22 = 916;
const yirmiIkiye = (w: number, m = M24) => (w * m) / M22;
const GRAMLAR = [1, 2, 5, 10, 20, 50, 100];

const faqItems: FaqItem[] = [
  {
    question: "24 ayar altını 22 ayara çevirme formülü nedir?",
    answer: `22 ayar ağırlık = 24 ayar ağırlık × 995 / 916. Kuyumcular gram altını 995, 22 ayarı 916 milyem sayar; formül has altının değişmediği varsayımına dayanır. Kitaptaki ayar hesabıyla (24 / 22) sonuç biraz daha yüksek çıkar: 10 g için ${g(10 * 24 / 22)} g.`,
  },
  {
    question: "10 gram 24 ayar altın kaç gram 22 ayar eder?",
    answer: `${g(yirmiIkiye(10))} gram 22 ayar eder. Aradaki ${g(yirmiIkiye(10) - 10)} gram, altına sertlik vermek için eklenen bakır ve gümüş alaşımıdır.`,
  },
  {
    question: "Has altın 22 ayara nasıl çevrilir?",
    answer: `Has altın 1000 milyem sayılır: 22 ayar ağırlık = has gram × 1000 / 916. 10 gram has altın ${g(yirmiIkiye(10, 1000))} gram 22 ayar eder.`,
  },
  {
    question: "24 ayar gram altınla kaç gram bilezik alınır?",
    answer: `İşçiliksiz eşdeğer 10 g gram altın için ${g(yirmiIkiye(10))} g'dır. Kuyumcu bileziği işçilikle sattığı için (ör. 20 milyem işçilikle 936 milyem) alabileceğiniz bilezik ${g((10 * M24) / 936)} g civarına iner.`,
  },
  {
    question: "22 ayar altın kaç milyem?",
    answer: "916 milyem: binde 916'sı saf altındır. Bilezik, ziynet ve Cumhuriyet altınları 22 ayardır; gram ve külçe altın 24 ayar (995 ya da 999,9) satılır.",
  },
];

export default function YirmiDortYirmiIkiPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana sayfa" },
        { href: "/altin-hesaplama", label: "Altın Hesaplama" },
        { href: path, label: "24 ayar → 22 ayar" },
      ]}
      crumbLabel="Sayfa yolu"
      title="24 ayar altını 22 ayara çevirme"
      intro="Gram altın (24 ayar) bileziğe ya da takıya dönüşürken içine alaşım katılır: has altın aynı kalır, ağırlık artar. Gramı girin; kaç gram 22 ayar ettiğini ve eklenen alaşımı görün."
      tool={<AyarCevirici kaynak={24} hedef={22} />}
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: "/22-ayar-altin-24-ayar-altin", label: "22 ayar altını 24 ayara çevirme" },
          { href: "/ceyrek-bilezik-hesaplama", label: "Çeyrek altın kaç gram bilezik eder?" },
          { href: "/has-hesaplama", label: "Hurda altın ve has hesaplama" },
          { href: "/kategoriler/altin-ayar", label: "Tüm altın ayar dönüşümleri" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "tablo", label: "24 ayardan 22 ayara tablo" },
        { id: "formul", label: "Formül: kuyumcu milyemi ve ayar hesabı" },
        { id: "bilezik", label: "Gram altınla bilezik almak" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="tablo">24 ayardan 22 ayara tablo</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">24 ayar (995)</th>
              <th scope="col">22 ayar karşılığı</th>
              <th scope="col">Eklenen alaşım</th>
              <th scope="col">Has altından (1000)</th>
            </tr>
          </thead>
          <tbody>
            {GRAMLAR.map((w) => (
              <tr key={w}>
                <th scope="row">{w} g</th>
                <td>{g(yirmiIkiye(w))} g</td>
                <td>{g(yirmiIkiye(w) - w)} g</td>
                <td>{g(yirmiIkiye(w, 1000))} g</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>Son sütun, aynı ağırlıkta saf (1000 milyem) has altının kaç gram 22 ayar ettiğini gösterir; külçe ve hurda hesaplarında has üzerinden konuşulur.</p>

      <h2 id="formul">Formül: kuyumcu milyemi ve ayar hesabı</h2>
      <p>
        Çevirmede değişmeyen şey içindeki saf altındır. 24 ayar gram altın 995 milyemdir; yani 10 gramında {g(10 * 0.995)} gram has vardır. Bu has altın 22
        ayarda (916 milyem) {g(yirmiIkiye(10))} grama karşılık gelir: <strong>22 ayar = 24 ayar × 995 / 916</strong>.
      </p>
      <p>
        Bazı kaynaklar ayarı 24&apos;e bölerek hesaplar (22 ayar = 22/24 = %91,67). Bu kitap hesabıyla 10 gram 24 ayar {g((10 * 24) / 22)} gram 22 ayar
        eder. Aradaki fark, kuyumcunun gram altını tam saf değil 995 milyem saymasından gelir; alışverişte geçerli olan milyem hesabıdır.
      </p>

      <h2 id="bilezik">Gram altınla bilezik almak</h2>
      <p>
        Gram altınızı bileziğe çevirdiğinizde eşdeğer ağırlığın tamamını alamazsınız, çünkü bilezik işçilik payıyla satılır: kuyumcu 22 ayar bileziği
        916 değil, örneğin 936 ya da 946 milyem üzerinden fiyatlar. Bu yüzden 10 gram gram altınla işçiliksiz {g(yirmiIkiye(10))} gram yerine yaklaşık{" "}
        {g((10 * M24) / 936)}–{g((10 * M24) / 946)} gram bilezik alınır. Çeyrek ve ziynet altınlarla bilezik hesabı için{" "}
        <Link href="/ceyrek-bilezik-hesaplama">çeyrekten bileziğe hesaplama</Link> sayfasına bakın.
      </p>
      <p>
        <small>Milyemler kuyumcu uygulamasına göredir (24 ayar gram altın 995, 22 ayar 916). İşçilik milyemleri kuyumcuya göre değişir.</small>
      </p>
    </TimeToolPage>
  );
}
