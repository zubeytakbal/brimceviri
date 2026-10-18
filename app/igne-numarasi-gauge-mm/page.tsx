import type { Metadata } from "next";
import GaugeTool from "../components/scales/GaugeTool";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { FRENCH, NEEDLES } from "../converter/scales/workshop";
import { buildSiteUrl } from "../siteConfig";

const PATH = "/igne-numarasi-gauge-mm";
const title = "İğne ve Branül Numarası: Gauge - mm";
const description =
  "İğne ve branül numarasını (G) milimetreye çevirin: 18G = 1,27 mm, 20G = 0,908 mm, 22G = 0,718 mm. Kateter French ölçüsü (12 Fr = 4 mm) ve branül renkleri tablosu.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  openGraph: { title, description, url: buildSiteUrl(PATH), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const mm = (g: number) => NEEDLES.find((r) => r.id === `${g}G`)!.mm.toLocaleString("tr-TR", { maximumFractionDigits: 3 });
// Branül (periferik IV kateter) renkleri, ISO 10555-5; yalnızca üretici kataloglarıyla doğrulanan ölçüler.
const CANNULA: Array<[number, string]> = [[14, "turuncu"], [16, "gri"], [17, "beyaz"], [18, "yeşil"], [20, "pembe"], [22, "mavi"]];

const faqItems: FaqItem[] = [
  { question: "22G kaç mm?", answer: `22G iğnenin nominal dış çapı ${mm(22)} mm'dir. Branül etiketlerinde bu ölçü genellikle yuvarlatılarak 0,7 ya da 0,8 mm yazılır.` },
  { question: "Gauge numarası büyüdükçe iğne kalınlaşır mı?", answer: `Hayır, incelir. Numara, telin çekilme sayısından gelen eski bir ölçüdür: 14G ${mm(14)} mm iken 30G ${mm(30)} mm'dir. Kan alma ve serum için daha kalın (küçük numaralı), insülin ve deri içi enjeksiyon için daha ince (büyük numaralı) iğneler kullanılır.` },
  { question: "Pembe branül kaç numara?", answer: `Pembe branül 20G'dir (yaklaşık ${mm(20)} mm). Renkler uluslararası standarda göre verilir: turuncu 14G, gri 16G, beyaz 17G, yeşil 18G, pembe 20G, mavi 22G.` },
  { question: "French (Fr) ölçüsü nedir?", answer: "French ya da Charrière (Ch), sonda ve kateterlerin dış çevresine dayanan ölçüdür ve tanım gereği 1 Fr = 1/3 mm dış çaptır. 12 Fr bir sonda 4 mm, 18 Fr bir sonda 6 mm dış çaplıdır. Gauge'un tersine French büyüdükçe kateter kalınlaşır." },
];

export default function NeedlePage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/kategoriler/uzunluk", label: "Uzunluk Çevirici" },
        { href: PATH, label: "İğne Numarası (Gauge)" },
      ]}
      crumbLabel="Sayfa yolu"
      title="İğne ve Branül Numarası Çevirme"
      intro="İğne ve branül numarasını (gauge, G) ya da sonda ve kateter ölçüsünü (French, Fr) milimetreye çevirin veya bir dış çapı milimetre olarak girip en yakın numarayı bulun. Bu sayfa yalnızca ölçü çevirisi yapar."
      tool={
        <GaugeTool
          tables={[
            { id: "gauge", label: "İğne (Gauge)", rows: NEEDLES },
            { id: "french", label: "Kateter (French)", rows: FRENCH },
          ]}
          prefix=""
          defaultRow="22G"
        />
      }
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: "/kategoriler/kan-sekeri", label: "Kan Şekeri (mg/dL - mmol/L)" },
          { href: "/swg-mm-cevirici", label: "SWG - mm Çevirici" },
          { href: "/kategoriler/uzunluk", label: "Uzunluk Çevirici" },
          { href: "/matkap-ucu-olcusu-cevirme", label: "Matkap Ucu Ölçüsü" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "gauge", label: "İğne numarası (gauge) tablosu" },
        { id: "brannul", label: "Branül renkleri" },
        { id: "french", label: "French (Fr) tablosu" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="gauge">İğne numarası (gauge) tablosu</h2>
      <p>
        Değerler Birmingham (Stubs) iğne ölçüsündeki nominal dış çaplardır. İç çap duvar kalınlığına göre değiştiği için aynı numaralı iki iğnenin iç çapı farklı
        olabilir; üretici etiketleri dış çapı genellikle bir ondalığa yuvarlar.
      </p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>Gauge</th>
              <th>Dış çap (mm)</th>
              <th>Dış çap (inç)</th>
            </tr>
          </thead>
          <tbody>
            {NEEDLES.map((r) => (
              <tr key={r.id}>
                <td>
                  <strong>{r.id}</strong>
                </td>
                <td>{r.mm.toLocaleString("tr-TR", { maximumFractionDigits: 3 })}</td>
                <td>{r.inch.toLocaleString("tr-TR", { maximumFractionDigits: 5 })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="brannul">Branül renkleri</h2>
      <p>
        Branüllerin (periferik damar içi kateter) gövde rengi ölçüyü gösterir ve ISO 10555-5 standardına göre üreticiler arasında aynıdır. Aşağıdaki renkler üretici
        kataloglarıyla doğrulanan ölçülerdir; daha ince branüllerin renkleri için ürün etiketine bakın.
      </p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>Numara</th>
              <th>Renk</th>
              <th>Nominal dış çap (mm)</th>
            </tr>
          </thead>
          <tbody>
            {CANNULA.map(([g, color]) => (
              <tr key={g}>
                <td>
                  <strong>{g}G</strong>
                </td>
                <td>{color}</td>
                <td>{mm(g)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="french">French (Fr) tablosu</h2>
      <p>French ölçüsü sonda, kateter ve dren kalınlığı için kullanılır; dış çap (mm) = Fr / 3, dış çevre (mm) ≈ Fr × π / 3.</p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>French</th>
              <th>Dış çap (mm)</th>
              <th>Dış çap (inç)</th>
            </tr>
          </thead>
          <tbody>
            {FRENCH.map((r) => (
              <tr key={r.id}>
                <td>
                  <strong>{r.id}</strong>
                </td>
                <td>{r.mm.toLocaleString("tr-TR", { maximumFractionDigits: 2 })}</td>
                <td>{r.inch.toLocaleString("tr-TR", { maximumFractionDigits: 3 })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TimeToolPage>
  );
}
