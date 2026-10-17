import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import RedenominationTool from "../components/money/RedenominationTool";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { REDENOMINATIONS, convertRedenomination } from "../converter/money/redenomination";
import { buildSiteUrl } from "../siteConfig";

const PATH = "/eski-para-yeni-para-cevirme";
const title = "Eski Para Yeni Para Çevirme: TL ve Manat";
const description =
  "1.000.000 eski TL = 1 TL, 250 milyon = 250 TL; 5.000 eski Azerbaycan manatı = 1 AZN, 5.000 eski Türkmen manatı = 1 TMT. Sadeleştirme oranlarıyla çevirici ve tablo.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  openGraph: { title, description, url: buildSiteUrl(PATH), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const fmt = (v: number) => v.toLocaleString("tr-TR", { maximumFractionDigits: 6 });
const OLD_TL = [100_000, 500_000, 1_000_000, 5_000_000, 10_000_000, 50_000_000, 100_000_000, 250_000_000, 1_000_000_000, 1_000_000_000_000];
const OLD_MANAT = [1_000, 5_000, 10_000, 50_000, 100_000, 1_000_000];

const faqItems: FaqItem[] = [
  { question: "1 milyon eski lira kaç TL?", answer: "1.000.000 eski Türk lirası 1 TL'dir. 1 Ocak 2005'te paradan altı sıfır atıldı; eski tutar 1.000.000'a bölünerek bugünkü TL karşılığı bulunur." },
  { question: "1 milyar eski lira kaç lira eder?", answer: "1.000.000.000 eski TL = 1.000 TL. Eski bir trilyon lira ise 1.000.000 TL'ye karşılık gelir." },
  { question: "YTL ile TL arasında fark var mı?", answer: "Hayır. 2005–2008 arasında kullanılan Yeni Türk lirası (YTL), 1 Ocak 2009'da 'yeni' ibaresi kaldırılarak 1'e 1 oranında Türk lirası (TL) adını aldı." },
  { question: "Eski Azerbaycan manatı kaç yeni manat?", answer: "1 Ocak 2006'da 5.000 eski manat (AZM) = 1 yeni manat (AZN) oranıyla sadeleştirme yapıldı. 100.000 AZM bugün 20 AZN'ye karşılık gelir." },
  { question: "Bu çevirme bugünkü satın alma gücünü gösterir mi?", answer: "Hayır. Sadeleştirme yalnızca paranın adını ve sıfırlarını değiştirir. 1995'teki 1 milyon liranın bugün ne alacağını bulmak için enflasyon (TÜFE) hesabı gerekir; bu çevirici onu yapmaz." },
];

export default function RedenominationPage() {
  const tr = REDENOMINATIONS.find((s) => s.id === "tr")!;
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/tum-birimler", label: "Dönüşümler" },
        { href: PATH, label: "Eski Para Yeni Para" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Eski Para Yeni Para Çevirme"
      intro="Eski Türk lirası, YTL ve TL arasında; eski ve yeni Azerbaycan manatı ile eski ve yeni Türkmen manatı arasında çevirin. Oranlar sadeleştirme kanunlarındaki sabit değerlerdir."
      tool={<RedenominationTool />}
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: "/doviz-cevirici", label: "Döviz Çevirici" },
          { href: "/tum-birimler", label: "Tüm Birim Dönüşümleri" },
          { href: "/tarih-cevirici", label: "Hicri Rumi Tarih Çevirici" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "tl", label: "Eski TL – TL tablosu" },
        { id: "manat", label: "Azerbaycan ve Türkmen manatı" },
        { id: "nasil", label: "Nasıl çevrilir?" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="tl">Eski Türk lirası – Türk lirası tablosu</h2>
      <p>
        5083 sayılı Kanun ile {tr.date} tarihinde Türk lirasından altı sıfır atıldı ve 1.000.000 eski lira 1 Yeni Türk lirası (YTL) oldu.
        1 Ocak 2009'da &quot;yeni&quot; ibaresi kaldırıldı; YTL ile bugünkü TL birebir aynıdır.
      </p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>Eski TL</th>
              <th>TL (YTL)</th>
            </tr>
          </thead>
          <tbody>
            {OLD_TL.map((v) => (
              <tr key={v}>
                <td>{fmt(v)} eski TL</td>
                <td>{fmt(convertRedenomination("tr", v, "eski-tl", "tl")!)} TL</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="manat">Azerbaycan ve Türkmen manatı</h2>
      <p>
        Azerbaycan 1 Ocak 2006'da, Türkmenistan 1 Ocak 2009'da para birimlerini aynı oranla sadeleştirdi: 5.000 eski manat 1 yeni manat oldu.
        Azerbaycan'da yeni paranın kodu AZN (eskisi AZM), Türkmenistan'da TMT (eskisi TMM).
      </p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>Eski manat</th>
              <th>Yeni Azerbaycan manatı</th>
              <th>Yeni Türkmen manatı</th>
            </tr>
          </thead>
          <tbody>
            {OLD_MANAT.map((v) => (
              <tr key={v}>
                <td>{fmt(v)}</td>
                <td>{fmt(convertRedenomination("az", v, "azm", "azn")!)} AZN</td>
                <td>{fmt(convertRedenomination("tm", v, "tmm", "tmt")!)} TMT</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="nasil">Eski para yeni paraya nasıl çevrilir?</h2>
      <p>
        Eski Türk lirasını bugünkü TL'ye çevirmek için tutarı 1.000.000'a bölün; kolay yolu sondan altı sıfırı silmektir: 7.500.000 eski TL = 7,5 TL.
        Manatlarda tutar 5.000'e bölünür: 25.000 eski manat = 5 yeni manat. Ters yönde, yani yeni paradan eski paraya geçerken aynı sayıyla çarpılır.
      </p>
      <p>
        Bu dönüşüm paranın yalnızca yeni adıyla karşılığını verir. Yıllar içindeki fiyat artışını hesaba katmaz; eski bir fiyatın bugünkü değerini
        bulmak için enflasyon hesabı gerekir. Güncel kurlar için <Link href="/doviz-cevirici">döviz çeviriciye</Link> bakabilirsiniz.
      </p>
    </TimeToolPage>
  );
}
