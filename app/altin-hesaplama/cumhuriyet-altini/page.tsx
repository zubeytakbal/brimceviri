import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import AltinHesaplama from "../../components/AltinHesaplama";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { findSikke, hasGram, SIKKELER, ZIYNET_MILYEM } from "../../converter/turkishAltin";
import { buildSiteUrl } from "../../siteConfig";
import { seoTitle } from "../../seoTitle";

// "Cumhuriyet altını kaç gram" araması için ayrı sayfa: adet tablosu, Ata serisi ve ziynet tam altınla farkı.
const path = "/altin-hesaplama/cumhuriyet-altini";
const title = "Cumhuriyet Altını Kaç Gram? Ata Lira Tablosu ve Hesaplama";
const description =
  "5, 10, 20 Cumhuriyet altını kaç gram eder, içinde kaç gram has altın var? Ata lira adet tablosu, Ata çeyrekten beşliye Cumhuriyet serisi ve ziynet tam altınla ağırlık farkı.";

export const metadata: Metadata = {
  title: seoTitle(title, "Cumhuriyet Altını Kaç Gram? Adet Tablosu, Hesaplama"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const gr = (n: number) => n.toLocaleString("tr-TR", { minimumFractionDigits: 3, maximumFractionDigits: 3 });
const ata = findSikke("cumhuriyet-altini")!;
const tam = findSikke("tam-altin")!;
const ceyrek = findSikke("ceyrek-altin")!;
const has = (g: number) => hasGram(g, ZIYNET_MILYEM);
const ADETLER = [1, 2, 3, 4, 5, 10, 15, 20, 25, 50];
const ATA_SERISI = SIKKELER.filter((s) => s.seri === "ata");
const fark = ata.gram - tam.gram;

const faqItems: FaqItem[] = [
  {
    question: "1 Cumhuriyet altını kaç gram?",
    answer: `Cumhuriyet altını (Ata lira) ${gr(ata.gram)} gramdır ve 22 ayar basılır; içinde ${gr(has(ata.gram))} gram saf (has) altın vardır.`,
  },
  {
    question: "Cumhuriyet altını kaç ayar?",
    answer: `22 ayardır (${ZIYNET_MILYEM.toLocaleString("tr-TR")} milyem). Ağırlığının yaklaşık %91,7'si saf altındır.`,
  },
  {
    question: "5 Cumhuriyet altını kaç gram?",
    answer: `5 Cumhuriyet altını ${gr(5 * ata.gram)} gramdır ve ${gr(has(5 * ata.gram))} gram has altın içerir. Bu, bir Ata beşlinin ağırlığına eşittir.`,
  },
  {
    question: "20 Cumhuriyet altını kaç gram?",
    answer: `20 Cumhuriyet altını ${gr(20 * ata.gram)} gramdır; içindeki has altın ${gr(has(20 * ata.gram))} gramdır.`,
  },
  {
    question: "Cumhuriyet altını ile tam altın aynı mı?",
    answer: `Değer olarak ikisi de bir tam (teklik) altındır ama ağırlıkları farklıdır: Cumhuriyet altını ${gr(ata.gram)} gram, ziynet tam altın ${gr(tam.gram)} gramdır. Cumhuriyet altınında ${gr(fark)} gram daha fazla altın olduğu için fiyatı daha yüksektir.`,
  },
  {
    question: "Cumhuriyet altını kaç çeyrek eder?",
    answer: `Değer olarak 4 çeyrek eder. Ağırlık olarak ise ${gr(ata.gram)} gram, ${(ata.gram / ceyrek.gram).toLocaleString("tr-TR", { maximumFractionDigits: 2 })} ziynet çeyreğe denk gelir; bozdururken kuyumcu bu fazlalığı has karşılığıyla hesaplar.`,
  },
];

export default function CumhuriyetAltiniPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana sayfa" },
        { href: "/altin-hesaplama", label: "Altın Hesaplama" },
        { href: path, label: "Cumhuriyet altını" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Cumhuriyet altını kaç gram?"
      intro={`Atatürk portreli Cumhuriyet altını (Ata lira) ${gr(ata.gram)} gram ve 22 ayardır. Adet girerek toplam ağırlığı, has altını ve güncel gram fiyatıyla değerini hesaplayın.`}
      tool={<AltinHesaplama baslangic="cumhuriyet-altini" />}
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: "/altin-hesaplama/ceyrek-altin", label: "Çeyrek altın kaç gram?" },
          { href: "/ceyrek-bilezik-hesaplama", label: "Altını bileziğe çevirme hesaplama" },
          { href: "/altin-hesaplama", label: "Altın hesaplama (tüm altın türleri)" },
          { href: "/has-hesaplama", label: "Hurda altın ve has hesaplama" },
          { href: "/zekat-hesaplama", label: "Altın zekâtı hesaplama" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "adet", label: "Adet adet Cumhuriyet altını kaç gram?" },
        { id: "seri", label: "Ata (Cumhuriyet) serisi" },
        { id: "tam", label: "Cumhuriyet altını ile tam altın farkı" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="adet">Adet adet Cumhuriyet altını kaç gram?</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Adet</th>
              <th scope="col">Toplam ağırlık</th>
              <th scope="col">İçindeki has altın</th>
            </tr>
          </thead>
          <tbody>
            {ADETLER.map((n) => (
              <tr key={n}>
                <th scope="row">{n} Cumhuriyet altını</th>
                <td>{gr(n * ata.gram)} g</td>
                <td>{gr(has(n * ata.gram))} g</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="seri">Ata (Cumhuriyet) serisi</h2>
      <p>
        Cumhuriyet altını, Atatürk portreli Ata serisinin teklik parçasıdır. Serinin diğer parçaları da aynı oranla basılır; hepsi ziynet
        serisindeki karşılığından biraz daha ağırdır.
      </p>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Altın</th>
              <th scope="col">Değer</th>
              <th scope="col">Ağırlık</th>
              <th scope="col">Has altın</th>
            </tr>
          </thead>
          <tbody>
            {ATA_SERISI.map((s) => (
              <tr key={s.id}>
                <th scope="row">{s.ad}</th>
                <td>{s.deger.toLocaleString("tr-TR")} tam</td>
                <td>{gr(s.gram)} g</td>
                <td>{gr(has(s.gram))} g</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="tam">Cumhuriyet altını ile tam altın farkı</h2>
      <p>
        Kuyumcuda &quot;tam altın&quot; denince çoğunlukla ziynet tam altın ({gr(tam.gram)} g) anlaşılır. Cumhuriyet altını ise {gr(ata.gram)} gramdır;
        tane başına {gr(fark)} gram, has olarak {gr(has(fark))} gram daha fazla altın içerir. 10 adette fark {gr(10 * fark)} grama ulaşır. Bu nedenle
        Cumhuriyet altını yatırım için, ziynet tam ise takı ve hediye için daha çok tercih edilir. Ziynet altınların gramları için{" "}
        <Link href="/altin-hesaplama">altın hesaplama</Link> tablosuna bakabilirsiniz.
      </p>
      <p>
        <small>
          Ağırlıklar Darphane ve Damga Matbaası Genel Müdürlüğü&apos;nün Cumhuriyet altını standartlarına göredir. TL değeri girdiğiniz gram
          fiyatıyla hesaplanır; kuyumcu alış-satış fiyatları işçilik ve marj nedeniyle farklıdır.
        </small>
      </p>
    </TimeToolPage>
  );
}
