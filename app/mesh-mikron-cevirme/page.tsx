import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import SieveTool from "../components/scales/SieveTool";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { ASTM_E11 } from "../converter/scales/sieve";
import { buildSiteUrl } from "../siteConfig";

const PATH = "/mesh-mikron-cevirme";
const title = "Mesh Mikron Çevirme: Elek Numarası Tablosu";
const description =
  "Elek numarasını (mesh) mikrona çevirin: 200 mesh = 75 µm, 100 mesh = 150 µm, 325 mesh = 45 µm. ASTM E11 standart elek tablosu, mm ve inç karşılıkları, mikrondan mesh bulma.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  openGraph: { title, description, url: buildSiteUrl(PATH), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const um = (mesh: number) => ASTM_E11.find((s) => s.mesh === mesh)!.micron;
const n = (v: number) => v.toLocaleString("tr-TR", { maximumFractionDigits: 3 });

const faqItems: FaqItem[] = [
  { question: "200 mesh kaç mikron?", answer: `ASTM E11 standardına göre 200 numaralı elek açıklığı ${um(200)} µm (${n(um(200) / 1000)} mm)'dir. 200 mesh altı denilen toz, bu elekten geçen ${um(200)} mikrondan ince tanelerdir.` },
  { question: "100 mesh kaç mikron?", answer: `100 mesh elek açıklığı ${um(100)} µm, yani ${n(um(100) / 1000)} mm'dir.` },
  { question: "Mesh numarası neden formülle mikrona çevrilmez?", answer: "Mesh, bir inçteki tel sayısıdır; açıklık ise tellerin arasındaki boşluktur. Aynı tel sayısında kalın tel kullanılırsa açıklık küçülür. Bu yüzden 25.400 / mesh hesabı açıklığı her zaman olduğundan büyük gösterir; doğru değer standart elek tablosundan okunur." },
  { question: "Mesh numarası büyüdükçe elek inceliyor mu?", answer: `Evet. Numara bir inçteki tel sayısını gösterdiği için büyüdükçe delikler küçülür: 20 mesh ${um(20)} µm, 200 mesh ${um(200)} µm, 400 mesh ${um(400)} µm açıklıktadır.` },
];

export default function SievePage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/kategoriler/uzunluk", label: "Uzunluk Çevirici" },
        { href: PATH, label: "Mesh Mikron Çevirme" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Mesh - Mikron Çevirme"
      intro="Elek numarasını seçip açıklığını mikron, mm ve inç olarak görün ya da tanecik boyutunu mikron olarak girip en yakın standart eleği bulun."
      tool={<SieveTool />}
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: "/mikrometre-milimetre", label: "Mikrometre - Milimetre" },
          { href: "/kategoriler/uzunluk", label: "Uzunluk Çevirici" },
          { href: "/kategoriler/konsantrasyon", label: "Konsantrasyon (ppm)" },
          { href: "/awg-mm2-cevirici", label: "AWG - mm² Çevirici" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "tablo", label: "Standart elek tablosu" },
        { id: "nedir", label: "Mesh nedir, açıklık nasıl okunur?" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="tablo">Standart elek tablosu (ASTM E11)</h2>
      <p>Açıklıklar ISO 565 serisindeki değerlerle aynıdır; laboratuvar elekleri genellikle bu numaralarla satılır.</p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>Mesh (No.)</th>
              <th>Açıklık (µm)</th>
              <th>Açıklık (mm)</th>
              <th>Açıklık (inç)</th>
            </tr>
          </thead>
          <tbody>
            {ASTM_E11.map((s) => (
              <tr key={s.mesh}>
                <td>
                  <strong>{s.mesh}</strong>
                </td>
                <td>{n(s.micron)}</td>
                <td>{n(s.micron / 1000)}</td>
                <td>{(s.micron / 25400).toLocaleString("tr-TR", { maximumFractionDigits: 4 })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="nedir">Mesh nedir, açıklık nasıl okunur?</h2>
      <p>
        Mesh, elek telinin bir inçlik (25,4 mm) uzunluğundaki göz sayısıdır. 200 mesh bir elekte inç başına yaklaşık 200 göz vardır, ama her gözün
        açıklığı 25.400 / 200 = 127 µm değil {um(200)} µm&apos;dir; aradaki fark telin kalınlığıdır. Kum, çimento, boya pigmenti, metal tozu ve gıda
        ürünlerinde tane boyutu &quot;-200 mesh&quot; (elekten geçen) ya da &quot;+100 mesh&quot; (elekte kalan) diye yazılır.
      </p>
      <p>
        Mikron (µm) milimetrenin binde biridir. Elek açıklığını farklı uzunluk birimlerinde görmek için{" "}
        <Link href="/mikrometre-milimetre">mikrometre - milimetre</Link> çeviricisini kullanabilirsiniz.
      </p>
    </TimeToolPage>
  );
}
