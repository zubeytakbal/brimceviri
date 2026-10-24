import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import RomanTool from "../components/ebced/RomanTool";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { toRoman } from "../converter/text/roman";
import { buildSiteUrl } from "../siteConfig";

const PATH = "/roma-rakamlari-cevirme";
const YEAR = new Date().getFullYear();
const title = "Roma Rakamları Çevirici ve Tablosu";
const description = `Sayıyı Roma rakamına, Roma rakamını sayıya çevirin: ${YEAR} = ${toRoman(YEAR)}, 1923 = MCMXXIII, XXI = 21. 1–100 tablosu, yüzyıllar, yıllar ve yazım kuralları.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  openGraph: { title, description, url: buildSiteUrl(PATH), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const R = (n: number) => toRoman(n)!;
const SYMBOLS: Array<[string, number]> = [["I", 1], ["V", 5], ["X", 10], ["L", 50], ["C", 100], ["D", 500], ["M", 1000]];
const CENTURIES = [11, 13, 15, 16, 18, 19, 20, 21];
const YEARS = [1071, 1299, 1453, 1876, 1908, 1920, 1923, 2000, YEAR];

const faqItems: FaqItem[] = [
  { question: `${YEAR} Roma rakamıyla nasıl yazılır?`, answer: `${YEAR} = ${R(YEAR)}. Binler, yüzler, onlar ve birler ayrı ayrı yazılıp yan yana getirilir: ${YEAR - (YEAR % 1000)} = ${R(YEAR - (YEAR % 1000))}${YEAR % 1000 ? `, ${YEAR % 1000} = ${R(YEAR % 1000)}` : ""}.` },
  { question: "4 neden IIII değil IV yazılır?", answer: "Standart yazımda aynı harf en fazla üç kez yan yana gelir; dört yerine beşten bir eksik anlamında IV yazılır (9 = IX, 40 = XL, 90 = XC, 400 = CD, 900 = CM). Saat kadranlarında geleneksel olarak IIII görülmesi bir süs tercihidir; çevirici IIII'yi 4 olarak okur ve standart yazımı ayrıca gösterir." },
  { question: "Roma rakamlarında sıfır var mı?", answer: "Hayır. Roma rakam sisteminde sıfırı gösteren bir sembol yoktur; bu yüzden çevirici 1'den başlar. Sıfır kavramı Avrupa'ya Hint-Arap rakamlarıyla birlikte geldi." },
  { question: "21. yüzyıl Roma rakamıyla nasıl yazılır?", answer: `XXI. yüzyıl. Yüzyıllar Türkçede çoğunlukla Roma rakamı ve nokta ile yazılır: ${R(15)}. yüzyıl 1401–1500, ${R(20)}. yüzyıl 1901–2000, ${R(21)}. yüzyıl 2001–2100 yıllarını kapsar.` },
  { question: "3999'dan büyük sayılar nasıl yazılır?", answer: `Harfin üzerine çizilen çizgi (vinculum) değeri binle çarpar: V̅ = 5000, X̅ = 10.000, M̅ = 1.000.000. Örneğin 12.345 = ${R(12345)}. Gündelik kullanımda bu kadar büyük sayılar nadiren Roma rakamıyla yazılır.` },
];

export default function RomanPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/saat-ve-tarih", label: "Tarih ve Saat" },
        { href: PATH, label: "Roma Rakamları" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Roma Rakamları Çevirici"
      intro="Bir sayıyı Roma rakamına ya da Roma rakamıyla yazılmış bir ifadeyi sayıya çevirin. Yıllar, yüzyıllar, saat kadranları ve kitap bölümleri için kullanabilirsiniz."
      tool={<RomanTool />}
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: "/ebced-hesabi", label: "Ebced Hesabı" },
          { href: "/tarih-cevirici", label: "Hicri Rumi Tarih Çevirici" },
          { href: "/dogdugum-gun-hangi-gun", label: "Doğduğum Gün Hangi Gün" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "kurallar", label: "Roma rakamları nasıl okunur?" },
        { id: "tablo", label: "1–100 Roma rakamları tablosu" },
        { id: "yuzyil", label: "Yüzyıllar ve yıllar" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="kurallar">Roma rakamları nasıl okunur?</h2>
      <p>Yedi harf vardır: {SYMBOLS.map(([s, v]) => `${s} = ${v.toLocaleString("tr-TR")}`).join(", ")}. Okurken üç kural uygulanır:</p>
      <ol>
        <li>
          <strong>Büyükten küçüğe toplanır.</strong> XV = 10 + 5 = 15, MDCC = 1000 + 500 + 200 = 1700.
        </li>
        <li>
          <strong>Küçük harf büyükten önce gelirse çıkarılır.</strong> IV = 4, IX = 9, XL = 40, XC = 90, CD = 400, CM = 900. Yalnızca I, X ve C çıkarılabilir;
          bunlar da yalnızca kendisinin 5 ya da 10 katı olan harften önce gelir (IC yerine XCIX yazılır).
        </li>
        <li>
          <strong>Aynı harf en fazla üç kez yan yana yazılır.</strong> 3 = III ama 4 = IV; V, L ve D hiç tekrarlanmaz.
        </li>
      </ol>
      <p>
        Örnek: 1923 = M (1000) + CM (900) + XX (20) + III (3) = {R(1923)}. Çevirici bu kurallara uymayan ama yaygın görülen yazımları (saat kadranındaki IIII gibi)
        de okur ve standart karşılığını gösterir.
      </p>

      <h2 id="tablo">1–100 Roma rakamları tablosu</h2>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              {[0, 1, 2, 3, 4].map((c) => (
                <th key={c} colSpan={1}>
                  {c * 20 + 1}–{c * 20 + 20}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 20 }, (_, row) => (
              <tr key={row}>
                {[0, 1, 2, 3, 4].map((c) => {
                  const n = c * 20 + row + 1;
                  return (
                    <td key={c}>
                      {n} = <strong>{R(n)}</strong>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="yuzyil">Yüzyıllar ve yıllar</h2>
      <p>
        Türkçede yüzyıllar Roma rakamı ve nokta ile yazılır. Bir yüzyıl, adının bir eksiğinin yüz katından bir sonraki yılla başlar: XIX. yüzyıl 1801&apos;de
        başlar, 1900&apos;de biter.
      </p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>Yüzyıl</th>
              <th>Roma rakamı</th>
              <th>Yıllar</th>
            </tr>
          </thead>
          <tbody>
            {CENTURIES.map((c) => (
              <tr key={c}>
                <td>{c}. yüzyıl</td>
                <td>
                  <strong>{R(c)}.</strong>
                </td>
                <td>
                  {(c - 1) * 100 + 1}–{c * 100}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>Bazı yılların Roma rakamıyla yazılışı:</p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>Yıl</th>
              <th>Roma rakamı</th>
            </tr>
          </thead>
          <tbody>
            {YEARS.map((y) => (
              <tr key={y}>
                <td>{y}</td>
                <td>
                  <strong>{R(y)}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Eski belgelerde yıl Roma rakamı yerine hicri ya da Rumi takvimle yazılmışsa <Link href="/tarih-cevirici">tarih çeviricisini</Link>, Arap harfleriyle
        tarih düşürülmüşse <Link href="/ebced-hesabi">ebced hesabını</Link> kullanabilirsiniz.
      </p>
    </TimeToolPage>
  );
}
