import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import AltinHesaplama from "../../components/AltinHesaplama";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { findSikke, hasGram, ZIYNET_MILYEM } from "../../converter/turkishAltin";
import { buildSiteUrl } from "../../siteConfig";
import { seoTitle } from "../../seoTitle";

// "Çeyrek altın kaç gram" araması için ayrı sayfa: adet tablosu, ziynet–Ata çeyrek farkı ve diğer altınlara karşılığı.
const path = "/altin-hesaplama/ceyrek-altin";
const title = "Çeyrek Altın Kaç Gram? 1–50 Adet Tablosu ve Hesaplama";
const description =
  "2, 5, 10, 20 çeyrek altın kaç gram eder, içinde kaç gram has altın var? Adet adet çeyrek altın tablosu, ziynet ve Ata çeyrek farkı, kaç çeyreğin yarım, tam ve gremse ettiği.";

export const metadata: Metadata = {
  title: seoTitle(title, "Çeyrek Altın Kaç Gram? Adet Tablosu ve Hesaplama"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const gr = (n: number) => n.toLocaleString("tr-TR", { minimumFractionDigits: 3, maximumFractionDigits: 3 });
const ceyrek = findSikke("ceyrek-altin")!;
const ata = findSikke("ata-ceyrek")!;
const has = (g: number) => hasGram(g, ZIYNET_MILYEM);
const ADETLER = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20, 25, 30, 50];
const KARSILIK = ["yarim-altin", "tam-altin", "gremse-altin", "besli-altin"].map((id) => findSikke(id)!);

const faqItems: FaqItem[] = [
  {
    question: "1 çeyrek altın kaç gram?",
    answer: `Ziynet çeyrek altın ${gr(ceyrek.gram)} gramdır. Darphane 22 ayar (${ZIYNET_MILYEM.toLocaleString("tr-TR")} milyem) bastığı için içinde ${gr(has(ceyrek.gram))} gram saf (has) altın vardır.`,
  },
  {
    question: "2 çeyrek altın kaç gram eder?",
    answer: `2 çeyrek ${gr(2 * ceyrek.gram)} gram eder; bu, bir yarım altının ağırlığına eşittir.`,
  },
  {
    question: "10 çeyrek altın kaç gram?",
    answer: `10 ziynet çeyrek ${gr(10 * ceyrek.gram)} gramdır ve ${gr(has(10 * ceyrek.gram))} gram has altın içerir. 10 Ata çeyrek ise ${gr(10 * ata.gram)} gramdır.`,
  },
  {
    question: "Çeyrek altın kaç ayar?",
    answer: "22 ayardır. Ağırlığının yaklaşık %91,7'si saf altın, kalanı sertlik veren alaşım metalleridir (bakır, gümüş).",
  },
  {
    question: "Ata çeyrek ile ziynet çeyrek arasındaki fark nedir?",
    answer: `İkisi de çeyrek değerindedir ama Atatürk portreli Ata çeyrek ${gr(ata.gram)} gram, ziynet çeyrek ${gr(ceyrek.gram)} gramdır. Aradaki ${gr(ata.gram - ceyrek.gram)} gram fazlalık nedeniyle Ata çeyrek biraz daha pahalıdır.`,
  },
  {
    question: "Kaç çeyrek bir tam altın eder?",
    answer: `4 çeyrek bir tam eder. Ziynet serisinde ağırlık da birebir tutar: 4 × ${gr(ceyrek.gram)} = ${gr(4 * ceyrek.gram)} gram, yani bir tam altının ağırlığı.`,
  },
];

export default function CeyrekAltinPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana sayfa" },
        { href: "/altin-hesaplama", label: "Altın Hesaplama" },
        { href: path, label: "Çeyrek altın" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Çeyrek altın kaç gram?"
      intro={`Ziynet çeyrek altın ${gr(ceyrek.gram)} gram ve 22 ayardır. Elinizdeki çeyrek sayısını girin; toplam ağırlığı, içindeki has altını ve güncel gram fiyatıyla değerini hesaplayın.`}
      tool={<AltinHesaplama baslangic="ceyrek-altin" />}
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: "/ceyrek-bilezik-hesaplama", label: "Çeyrek altın kaç gram bilezik eder?" },
          { href: "/altin-hesaplama/cumhuriyet-altini", label: "Cumhuriyet altını kaç gram?" },
          { href: "/altin-hesaplama", label: "Altın hesaplama (tüm altın türleri)" },
          { href: "/has-hesaplama", label: "Hurda altın ve has hesaplama" },
          { href: "/zekat-hesaplama", label: "Altın zekâtı hesaplama" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "adet", label: "Adet adet çeyrek altın kaç gram?" },
        { id: "ata", label: "Ziynet çeyrek ve Ata çeyrek" },
        { id: "karsilik", label: "Kaç çeyrek ne eder?" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="adet">Adet adet çeyrek altın kaç gram?</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Çeyrek</th>
              <th scope="col">Ziynet çeyrek</th>
              <th scope="col">İçindeki has altın</th>
              <th scope="col">Ata çeyrek</th>
            </tr>
          </thead>
          <tbody>
            {ADETLER.map((n) => (
              <tr key={n}>
                <th scope="row">{n} çeyrek</th>
                <td>{gr(n * ceyrek.gram)} g</td>
                <td>{gr(has(n * ceyrek.gram))} g</td>
                <td>{gr(n * ata.gram)} g</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Has altın, çeyreğin içindeki 24 ayar saf altındır (ağırlık × {ZIYNET_MILYEM.toLocaleString("tr-TR")} / 1000). Kuyumcular çeyreği
        bozdururken ya da bileziğe çevirirken bu has karşılığı üzerinden hesap yapar.
      </p>

      <h2 id="ata">Ziynet çeyrek ve Ata çeyrek</h2>
      <p>
        Piyasada iki çeşit çeyrek vardır. Düğün ve hediyelerde takılan <strong>ziynet çeyrek</strong> {gr(ceyrek.gram)} gram, Atatürk portreli{" "}
        <strong>Ata çeyrek</strong> ise {gr(ata.gram)} gramdır. İkisi de 22 ayardır; değerleri aynı sayılsa da Ata çeyrekte {gr(ata.gram - ceyrek.gram)}{" "}
        gram daha fazla altın vardır. Bu fark 10 çeyrekte {gr(10 * (ata.gram - ceyrek.gram))} grama, 20 çeyrekte {gr(20 * (ata.gram - ceyrek.gram))}{" "}
        grama çıkar; bu yüzden alırken ya da bozdururken hangi çeyrek olduğunu belirtin.
      </p>

      <h2 id="karsilik">Kaç çeyrek ne eder?</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Altın</th>
              <th scope="col">Kaç çeyrek eder?</th>
              <th scope="col">Ağırlık</th>
            </tr>
          </thead>
          <tbody>
            {KARSILIK.map((s) => (
              <tr key={s.id}>
                <th scope="row">{s.ad}</th>
                <td>{(s.deger * 4).toLocaleString("tr-TR")} çeyrek</td>
                <td>{gr(s.gram)} g</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Ziynet serisinde ağırlıklar çeyreğin tam katlarıdır: yarım altın 2, tam altın 4, gremse 10, beşli 20 çeyrek ağırlığındadır. Çeyreklerinizi
        bileziğe çevirmeyi düşünüyorsanız işçilik payıyla birlikte hesap için{" "}
        <Link href="/ceyrek-bilezik-hesaplama">çeyrekten bileziğe hesaplama</Link> sayfasına bakın.
      </p>
      <p>
        <small>
          Ağırlıklar Darphane ve Damga Matbaası Genel Müdürlüğü&apos;nün ziynet ve Cumhuriyet altını standartlarına göredir. TL değeri girdiğiniz
          gram fiyatıyla hesaplanır; kuyumcu alış-satış fiyatları işçilik ve marj nedeniyle farklıdır.
        </small>
      </p>
    </TimeToolPage>
  );
}
