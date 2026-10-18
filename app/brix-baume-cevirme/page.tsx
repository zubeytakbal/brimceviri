import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import SugarTool from "../components/scales/SugarTool";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { sugarFrom } from "../converter/scales/sugar";
import { buildSiteUrl } from "../siteConfig";

const PATH = "/brix-baume-cevirme";
const B = (b: number) => sugarFrom("brix", b)!;
const f = (v: number, d = 1) => v.toLocaleString("tr-TR", { minimumFractionDigits: d, maximumFractionDigits: d });
const title = "Brix Baumé Çevirme: Şeker Derecesi";
const description = `Brix, Baumé, özgül ağırlık ve Öchsle arasında çeviri: 12 °Bx = ${f(B(12).baume)} °Bé = SG ${f(B(12).sg, 3)}, 68 °Bx = ${f(B(68).baume)} °Bé. Pekmez, şurup, meyve suyu ve şıra için tablo.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  openGraph: { title, description, url: buildSiteUrl(PATH), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const TABLE = [0, 5, 10, 12, 15, 20, 22, 25, 30, 35, 40, 45, 50, 55, 60, 65, 68, 70, 75, 80];

const faqItems: FaqItem[] = [
  { question: "Brix nedir?", answer: "Brix (°Bx), 100 gram çözeltideki çözünmüş şekerin gram cinsinden miktarıdır. 20 °Bx bir meyve suyunun 100 gramında yaklaşık 20 g çözünmüş kuru madde vardır. Refraktometreler doğrudan Brix gösterir; pekmez, reçel, şurup ve meyve suyu üretiminde kullanılır." },
  { question: "Baumé Brix'e nasıl çevrilir?", answer: `Önce Baumé değerinden özgül ağırlık bulunur: SG = 145 / (145 − °Bé). Ardından özgül ağırlıktan Brix hesaplanır. Örneğin ${f(B(68).baume)} °Bé, SG ${f(B(68).sg, 3)} ve yaklaşık 68 °Bx eder. Kabaca 1 °Bé ≈ 1,8 °Bx alınabilir, ama bu oran yüksek şeker derecelerinde kayar.` },
  { question: "Öchsle nedir, şırada nasıl kullanılır?", answer: `Öchsle (°Oe), Almanya ve İsviçre'de üzüm şırasının şekerini ölçmek için kullanılır ve özgül ağırlığın 1'den fazla olan kısmının bin katıdır: SG 1,090 = 90 °Oe. 90 °Oe yaklaşık ${f(sugarFrom("oechsle", 90)!.brix)} °Bx eder.` },
  { question: "Plato ile Brix aynı mı?", answer: "Pratikte evet. Plato (°P) bira yapımında kullanılır ve Brix gibi 100 g çözeltideki ekstrakt miktarını gösterir; iki ölçek arasındaki fark birkaç binde birdir. Bu çeviricideki hesap, bira endüstrisinin Plato denklemiyle (ASBC) yapılır." },
];

export default function SugarPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/kategoriler/yogunluk", label: "Yoğunluk Çevirici" },
        { href: PATH, label: "Brix Baumé Çevirme" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Brix - Baumé Çevirme"
      intro="Şeker derecesini Brix, Baumé, özgül ağırlık ya da Öchsle olarak girin, diğer ölçeklerdeki karşılığını görün. Pekmez, şurup, bal, meyve suyu ve üzüm şırası ölçümleri için."
      tool={<SugarTool />}
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: "/kategoriler/yogunluk", label: "Yoğunluk Çevirici" },
          { href: "/kategoriler/konsantrasyon", label: "Konsantrasyon (%, ppm)" },
          { href: "/kategoriler/alkol-derecesi", label: "Alkol Derecesi (Proof)" },
          { href: "/mutfak-olculeri-cevirici", label: "Mutfak Ölçüleri" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "olcekler", label: "Ölçekler arasındaki ilişki" },
        { id: "tablo", label: "Brix - Baumé - özgül ağırlık tablosu" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="olcekler">Ölçekler arasındaki ilişki</h2>
      <p>
        Dört ölçek de aynı şeyi, sıvının ne kadar yoğun olduğunu farklı biçimde söyler. Şeker suda çözündükçe sıvı ağırlaşır; bu yüzden şeker oranı
        (Brix) ile özgül ağırlık (SG) birlikte artar. Baumé hidrometrelerin, Brix refraktometrelerin, Öchsle ise şarapçıların ölçeğidir.
      </p>
      <ul>
        <li>Baumé: °Bé = 145 − 145 / SG (sudan ağır sıvılar için kullanılan ölçek)</li>
        <li>Öchsle: °Oe = (SG − 1) × 1000</li>
        <li>Brix: özgül ağırlıktan ASBC Plato denklemiyle hesaplanır</li>
      </ul>
      <p>
        Değerler 20 °C içindir ve yaklaşıktır; sıcak ölçülen pekmez ya da şurup daha hafif görünür. Özgül ağırlık, sıvının 1 litresinin yaklaşık kaç kilogram
        geldiğini de gösterir; litre ile kilogram arasındaki çeviri için <Link href="/kategoriler/yogunluk">yoğunluk çeviricisini</Link> kullanabilirsiniz.
      </p>

      <h2 id="tablo">Brix - Baumé - özgül ağırlık tablosu (20 °C)</h2>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>Brix (°Bx)</th>
              <th>Baumé (°Bé)</th>
              <th>Özgül ağırlık</th>
              <th>Öchsle (°Oe)</th>
            </tr>
          </thead>
          <tbody>
            {TABLE.map((b) => (
              <tr key={b}>
                <td>
                  <strong>{b}</strong>
                </td>
                <td>{f(B(b).baume)}</td>
                <td>{f(B(b).sg, 4)}</td>
                <td>{f(B(b).oechsle, 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TimeToolPage>
  );
}
