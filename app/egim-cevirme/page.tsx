import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import SlopeTool from "../components/scales/SlopeTool";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { slopeFrom } from "../converter/scales/slope";
import { buildSiteUrl } from "../siteConfig";

const PATH = "/egim-cevirme";
const title = "Eğim Çevirme: Yüzde, Derece ve Oran";
const description =
  "Eğimi yüzde, derece, binde ve 1:n oranı arasında çevirin: %10 eğim = 5,71°, %100 = 45°, 1:12 = %8,33. Yükseklik farkı, eğik uzunluk ve hazır eğim tablosu.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  openGraph: { title, description, url: buildSiteUrl(PATH), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const f = (v: number, d = 2) => v.toLocaleString("tr-TR", { maximumFractionDigits: d });
const P = (p: number) => slopeFrom("percent", p)!;
const D = (d: number) => slopeFrom("degree", d)!;
const PERCENTS = [1, 2, 5, 8, 10, 12, 15, 20, 25, 30, 40, 50, 60, 75, 100, 150, 200];
const DEGREES = [1, 2, 3, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60];

const faqItems: FaqItem[] = [
  { question: "%10 eğim kaç derece?", answer: `%10 eğim ${f(P(10).degree)}°'dir. Yüzde, 100 metre yatay mesafede kaç metre yükselindiğini gösterir; %10 eğimde 100 metrede 10 metre çıkılır. Derece ise yerle yapılan açıdır ve tanjant ile hesaplanır: açı = arctan(10 / 100).` },
  { question: "%100 eğim dik duvar mı demek?", answer: "Hayır. %100 eğimde yatayda ne kadar gidilirse o kadar yükselinir; bu 45°'lik bir eğimdir. Dik duvar 90°'dir ve yüzde karşılığı sonsuzdur. Bu yüzden %100'ü aşan eğimler de olabilir: %200 eğim yaklaşık 63,4°'tür." },
  { question: "1:12 eğim yüzde kaç?", answer: `1:12, 12 birim yatayda 1 birim yükselmek demektir: 1 / 12 × 100 = %${f(P(100 / 12).percent)}, açı olarak ${f(P(100 / 12).degree)}°. Oranlar rampa ve yol projelerinde sık kullanılır; 1:20 = %5, 1:8 = %12,5.` },
  { question: "30 derece yüzde kaç eğim?", answer: `30° eğim %${f(D(30).percent)}'dir (tan 30° × 100). Açı büyüdükçe yüzde hızla artar: 40° ≈ %${f(D(40).percent, 1)}, 60° ≈ %${f(D(60).percent, 1)}.` },
  { question: "Binde eğim nerede kullanılır?", answer: "Binde (‰), çok yatık eğimler için kullanılır: kanalizasyon ve yağmur suyu boruları, demiryolu ve kanal eğimleri genellikle binde ile verilir. ‰20 = %2 = 1:50 eğimdir; 100 metrede 2 metre düşer." },
];

export default function SlopePage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/kategoriler/aci", label: "Açı Çevirici" },
        { href: PATH, label: "Eğim Çevirme" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Eğim Çevirme"
      intro="Yüzde, derece, binde ya da 1:n oranı olarak verilmiş bir eğimi diğer gösterimlere çevirin. Yatay mesafeyi girerseniz yükseklik farkını ve eğik uzunluğu da görürsünüz."
      tool={<SlopeTool />}
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: "/kategoriler/aci", label: "Açı Çevirici" },
          { href: "/pis-su-borusu-egimi-hesaplama", label: "Pis Su Borusu Eğimi" },
          { href: "/gunes-acisi-ve-golge-boyu-hesaplama", label: "Güneş Açısı ve Gölge" },
          { href: "/kategoriler/yagis-miktari", label: "Yağış Miktarı" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "nasil", label: "Eğim gösterimleri nasıl çevrilir?" },
        { id: "yuzde", label: "Yüzde → derece tablosu" },
        { id: "derece", label: "Derece → yüzde tablosu" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="nasil">Eğim gösterimleri nasıl çevrilir?</h2>
      <p>
        Bütün gösterimler aynı orana dayanır: <strong>eğim = dikey yükselme / yatay mesafe</strong>. Bu oranı 100 ile çarpınca yüzde, 1000 ile çarpınca binde
        bulunur. 1:n oranındaki n, oranın tersidir (yatay / dikey). Derece ise oranın arktanjantıdır, bu yüzden yüzdeyle doğru orantılı değildir: %10 yaklaşık
        5,7° iken %20 yaklaşık 11,3°, %100 ise 45°&apos;dir.
      </p>
      <ul>
        <li>Yüzde → derece: açı = arctan(yüzde / 100)</li>
        <li>Derece → yüzde: yüzde = tan(açı) × 100</li>
        <li>Oran 1:n → yüzde: yüzde = 100 / n</li>
        <li>Yükseklik farkı = yatay mesafe × yüzde / 100</li>
      </ul>
      <p>
        Örnek: 250 metrelik yatay mesafede %6 eğimli bir yol 250 × 0,06 = 15 metre yükselir. Eğim açısını başka açı birimlerine (radyan, grad) çevirmek için{" "}
        <Link href="/kategoriler/aci">açı çeviricisini</Link> kullanabilirsiniz.
      </p>

      <h2 id="yuzde">Yüzde → derece tablosu</h2>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>Yüzde</th>
              <th>Derece</th>
              <th>Binde</th>
              <th>Oran</th>
            </tr>
          </thead>
          <tbody>
            {PERCENTS.map((p) => (
              <tr key={p}>
                <td>
                  <strong>%{p}</strong>
                </td>
                <td>{f(P(p).degree)}°</td>
                <td>‰{p * 10}</td>
                <td>1:{f(P(p).ratio!)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="derece">Derece → yüzde tablosu</h2>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>Derece</th>
              <th>Yüzde</th>
              <th>Oran</th>
            </tr>
          </thead>
          <tbody>
            {DEGREES.map((d) => (
              <tr key={d}>
                <td>
                  <strong>{d}°</strong>
                </td>
                <td>%{f(D(d).percent)}</td>
                <td>1:{f(D(d).ratio!)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TimeToolPage>
  );
}
