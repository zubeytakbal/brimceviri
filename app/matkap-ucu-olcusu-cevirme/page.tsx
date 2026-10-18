import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import GaugeTool from "../components/scales/GaugeTool";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { FRACTION_DRILLS, NUMBER_LETTER_DRILLS } from "../converter/scales/workshop";
import { buildSiteUrl } from "../siteConfig";

const PATH = "/matkap-ucu-olcusu-cevirme";
const title = "Matkap Ucu Ölçüsü: İnç, Numara ve mm";
const description =
  "İnç ve numaralı matkap uçlarını milimetreye çevirin: 1/4\" = 6,35 mm, 1/8\" = 3,175 mm, #7 = 5,105 mm, F = 6,528 mm. Kesirli, numaralı ve harfli uç tablosu, mm'den en yakın uç.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  openGraph: { title, description, url: buildSiteUrl(PATH), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const f = (v: number, d = 3) => v.toLocaleString("tr-TR", { maximumFractionDigits: d });

const faqItems: FaqItem[] = [
  { question: "1/4 inç matkap kaç mm?", answer: "1/4\" matkap ucu 6,35 mm'dir. Metrik seride en yakın uç 6,4 mm'dir; 6,5 mm'lik uç biraz daha geniş delik açar." },
  { question: "Numaralı matkap ucu nedir?", answer: "ABD'de 1/4 inçten küçük uçlar #1'den #80'e kadar numaralarla adlandırılır; numara büyüdükçe uç incelir. #80 0,343 mm, #1 5,791 mm'dir. 5,9 mm'den 10,5 mm'ye kadar olan ölçüler A'dan Z'ye harflerle gösterilir." },
  { question: "İnç vida için kılavuz matkabı nasıl seçilir?", answer: "Kılavuz matkabı diş dibinden biraz büyük olmalıdır. Örneğin 1/4\"-20 UNC için yaygın olarak #7 (5,105 mm) uç kullanılır. Metrik vidalarda kılavuz matkabı vida çapından hatvenin çıkarılmasıyla bulunur (M10 × 1,5 için 8,5 mm)." },
];

export default function DrillPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/kategoriler/uzunluk", label: "Uzunluk Çevirici" },
        { href: PATH, label: "Matkap Ucu Ölçüsü" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Matkap Ucu Ölçüsü Çevirme"
      intro="Kesirli inç, numaralı (#1–#80) ya da harfli (A–Z) matkap ucunun milimetre karşılığını görün veya bir ölçüyü milimetre olarak girip her serideki en yakın ucu bulun."
      tool={
        <GaugeTool
          tables={[
            { id: "kesir", label: "Kesirli inç", rows: FRACTION_DRILLS },
            { id: "numara", label: "Numaralı ve harfli", rows: NUMBER_LETTER_DRILLS },
          ]}
          prefix=""
          metricStep={0.1}
          defaultRow={'1/4"'}
        />
      }
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: "/kategoriler/vida-hatvesi", label: "Vida Hatvesi (TPI - mm)" },
          { href: "/swg-mm-cevirici", label: "SWG - mm Çevirici" },
          { href: "/inc-milimetre", label: "İnç - Milimetre" },
          { href: "/kategoriler/uzunluk", label: "Uzunluk Çevirici" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "kesir", label: "Kesirli inç matkap tablosu" },
        { id: "numara", label: "Numaralı ve harfli matkap tablosu" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="kesir">Kesirli inç matkap tablosu</h2>
      <p>
        İnç matkaplar 1/64 inç (0,397 mm) adımlarla ilerler. Milimetre değerleri 1 inç = 25,4 mm ile hesaplanmıştır; tam çeviri için{" "}
        <Link href="/inc-milimetre">inç - milimetre</Link> sayfasına bakabilirsiniz.
      </p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>İnç</th>
              <th>Ondalık inç</th>
              <th>mm</th>
            </tr>
          </thead>
          <tbody>
            {FRACTION_DRILLS.map((r) => (
              <tr key={r.id}>
                <td>
                  <strong>{r.id}</strong>
                </td>
                <td>{f(r.inch, 4)}</td>
                <td>{f(r.mm)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="numara">Numaralı ve harfli matkap tablosu</h2>
      <p>Numaralı uçlar #80&apos;den (en ince) #1&apos;e doğru kalınlaşır; harfli uçlar #1&apos;den sonra A ile başlayıp Z&apos;ye kadar devam eder.</p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>Uç</th>
              <th>inç</th>
              <th>mm</th>
            </tr>
          </thead>
          <tbody>
            {NUMBER_LETTER_DRILLS.map((r) => (
              <tr key={r.id}>
                <td>
                  <strong>{r.id}</strong>
                </td>
                <td>{f(r.inch, 4)}</td>
                <td>{f(r.mm)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TimeToolPage>
  );
}
