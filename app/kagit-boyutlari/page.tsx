import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import PaperTool from "../components/scales/PaperTool";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { A_SERIES, B_SERIES, C_SERIES, US_SIZES, pixels, type PaperSize } from "../converter/scales/paper";
import { buildSiteUrl } from "../siteConfig";

const PATH = "/kagit-boyutlari";
const title = "Kâğıt Boyutları: A4 Kaç cm, A3, A5, B5";
const description =
  "A4 = 21 × 29,7 cm, A3 = 29,7 × 42 cm, A5 = 14,8 × 21 cm. A, B ve C serisi kâğıt ölçüleri mm, cm ve inç olarak; 300 dpi piksel (A4 = 2480 × 3508) ve yaprak ağırlığı.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  openGraph: { title, description, url: buildSiteUrl(PATH), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const n = (v: number, d = 1) => v.toLocaleString("tr-TR", { maximumFractionDigits: d });

const faqItems: FaqItem[] = [
  { question: "A4 kağıt kaç cm?", answer: `A4 kâğıt 21 × 29,7 cm (210 × 297 mm), inç olarak yaklaşık 8,27 × 11,69'dur. 300 dpi'de ${pixels(210, 300)} × ${pixels(297, 300)} piksel eder.` },
  { question: "A3, A4'ün kaç katı?", answer: "A3, A4'ün tam iki katıdır (29,7 × 42 cm). A serisinde her boyut bir büyüğünün uzun kenarından ikiye katlanmış hâlidir: iki A4 yan yana bir A3, iki A5 bir A4 eder. Kenar oranı her zaman √2 ≈ 1,414 olduğu için büyütme ve küçültmede şekil bozulmaz." },
  { question: "A4 ile Letter aynı mı?", answer: "Hayır. ABD ve Kanada'da kullanılan Letter 21,59 × 27,94 cm'dir; A4'ten biraz daha geniş ve 1,76 cm daha kısadır. Yurt dışından gelen belgeler yazdırılırken sayfa boyutu A4'e uyarlanmazsa kenarlar kesilebilir." },
  { question: "80 gramlık A4 kağıt bir yaprak kaç gram?", answer: "A4 kâğıdın alanı 0,06237 m²'dir; 80 g/m² kâğıtta bir yaprak yaklaşık 4,99 gram, 500 yapraklık bir top yaklaşık 2,5 kg gelir. Kâğıt gramajını başka birimlere çevirmek için gramaj çeviricisini kullanabilirsiniz." },
];

function SizeTable({ rows }: { rows: PaperSize[] }) {
  return (
    <div className="conversion-table-wrap">
      <table className="conversion-table">
        <thead>
          <tr>
            <th>Boyut</th>
            <th>mm</th>
            <th>cm</th>
            <th>inç</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.id}>
              <td>
                <strong>{p.id}</strong>
              </td>
              <td>
                {n(p.w)} × {n(p.h)}
              </td>
              <td>
                {n(p.w / 10, 2)} × {n(p.h / 10, 2)}
              </td>
              <td>
                {n(p.w / 25.4, 2)} × {n(p.h / 25.4, 2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PaperPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/kategoriler/uzunluk", label: "Uzunluk Çevirici" },
        { href: PATH, label: "Kâğıt Boyutları" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Kâğıt Boyutları"
      intro="Bir kâğıt boyutu seçin; ölçüsünü mm, cm ve inç olarak, istediğiniz çözünürlükte piksel karşılığını ve gramaja göre bir yaprağın ağırlığını görün."
      tool={<PaperTool />}
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: "/kategoriler/gramaj", label: "Gramaj (g/m²) Çevirici" },
          { href: "/inc-santimetre", label: "İnç - Santimetre" },
          { href: "/kategoriler/uzunluk", label: "Uzunluk Çevirici" },
          { href: "/kategoriler/alan", label: "Alan Çevirici" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "a", label: "A serisi (A0 – A10)" },
        { id: "b", label: "B serisi (B0 – B10)" },
        { id: "c", label: "C serisi zarflar" },
        { id: "abd", label: "ABD kâğıt boyutları" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="a">A serisi (A0 – A10)</h2>
      <p>
        ISO 216 standardında A0 tam 1 m² alanlıdır (841 × 1189 mm) ve kenar oranı √2&apos;dir. Her küçük boyut, bir öncekinin uzun kenarı ikiye bölünerek
        bulunur; ölçüler milimetreye aşağı yuvarlanır. Türkiye&apos;de fotokopi, dilekçe ve resmî yazışmalarda A4 kullanılır.
      </p>
      <SizeTable rows={A_SERIES} />

      <h2 id="b">B serisi (B0 – B10)</h2>
      <p>B serisi, A boyutlarının arasına düşen ölçüleri verir (B0 = 1000 × 1414 mm). Kitap, afiş ve pasaport gibi basılı işlerde kullanılır.</p>
      <SizeTable rows={B_SERIES} />

      <h2 id="c">C serisi zarflar</h2>
      <p>C serisi zarf boyutlarıdır ve aynı numaralı A kâğıdını katlamadan alır: C4 zarfa A4, C5 zarfa A5 ya da bir kez katlanmış A4 girer.</p>
      <SizeTable rows={C_SERIES} />

      <h2 id="abd">ABD kâğıt boyutları</h2>
      <p>
        ABD ve Kanada&apos;da ISO yerine inç tabanlı boyutlar kullanılır. Ölçüleri santimetreye çevirmek için <Link href="/inc-santimetre">inç - santimetre</Link>{" "}
        çeviricisini kullanabilirsiniz.
      </p>
      <SizeTable rows={US_SIZES} />
    </TimeToolPage>
  );
}
