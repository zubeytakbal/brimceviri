import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import GaugeTool from "../components/scales/GaugeTool";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { SWG } from "../converter/scales/workshop";
import { buildSiteUrl } from "../siteConfig";

const PATH = "/swg-mm-cevirici";
const title = "SWG - mm Çevirici: Tel Kalınlığı Tablosu";
const description =
  "İngiliz tel numarasını (SWG) milimetreye çevirin: 16 SWG = 1,626 mm, 18 SWG = 1,219 mm, 20 SWG = 0,914 mm. 7/0'dan 50'ye tam tablo ve mm'den en yakın SWG.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  openGraph: { title, description, url: buildSiteUrl(PATH), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const mm = (id: string) => SWG.find((r) => r.id === id)!.mm.toLocaleString("tr-TR", { maximumFractionDigits: 3 });

const faqItems: FaqItem[] = [
  { question: "SWG nedir?", answer: "SWG (Standard Wire Gauge), 1884'te İngiltere'de kabul edilen tel kalınlığı numaralandırmasıdır. Numara büyüdükçe tel incelir: 7/0 SWG 12,7 mm iken 50 SWG 0,025 mm'dir. Bugün İngiltere'de çoğunlukla milimetre kullanılsa da kuyumculuk teli, yay teli ve eski çizimlerde hâlâ görülür." },
  { question: "SWG ile AWG aynı mı?", answer: `Hayır. AWG ABD'nin tel numaralandırmasıdır ve aynı numara farklı kalınlığa karşılık gelir: 18 SWG ${mm("18")} mm iken 18 AWG yaklaşık 1,024 mm'dir. Elektrik kablolarında genellikle AWG ya da mm² kullanılır.` },
  { question: "16 SWG kaç mm?", answer: `16 SWG ${mm("16")} mm (0,064 inç) kalınlığındadır. 14 SWG ${mm("14")} mm, 18 SWG ${mm("18")} mm, 20 SWG ${mm("20")} mm'dir.` },
];

export default function SwgPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/kategoriler/uzunluk", label: "Uzunluk Çevirici" },
        { href: PATH, label: "SWG - mm Çevirici" },
      ]}
      crumbLabel="Sayfa yolu"
      title="SWG - mm Çevirici"
      intro="İngiliz standart tel numarasını (SWG) milimetre ve inç olarak görün ya da bir tel kalınlığını milimetre olarak girip en yakın SWG numarasını bulun."
      tool={<GaugeTool tables={[{ id: "swg", label: "SWG", rows: SWG }]} prefix="SWG " defaultRow="16" />}
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: "/awg-mm2-cevirici", label: "AWG - mm² Çevirici" },
          { href: "/matkap-ucu-olcusu-cevirme", label: "Matkap Ucu Ölçüsü" },
          { href: "/kategoriler/vida-hatvesi", label: "Vida Hatvesi (TPI - mm)" },
          { href: "/mesh-mikron-cevirme", label: "Mesh - Mikron (Elek)" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "tablo", label: "SWG tablosu (7/0 – 50)" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="tablo">SWG tablosu (7/0 – 50)</h2>
      <p>
        Değerler İngiliz standart tel kalınlığı tanımındaki inç ölçüleridir; milimetre karşılıkları 1 inç = 25,4 mm ile hesaplanmıştır. Amerikan tel numaraları
        için <Link href="/awg-mm2-cevirici">AWG - mm² çeviricisine</Link> bakın.
      </p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>SWG</th>
              <th>inç</th>
              <th>mm</th>
            </tr>
          </thead>
          <tbody>
            {SWG.map((r) => (
              <tr key={r.id}>
                <td>
                  <strong>{r.id}</strong>
                </td>
                <td>{r.inch.toLocaleString("tr-TR", { maximumFractionDigits: 4 })}</td>
                <td>{r.mm.toLocaleString("tr-TR", { maximumFractionDigits: 4 })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TimeToolPage>
  );
}
