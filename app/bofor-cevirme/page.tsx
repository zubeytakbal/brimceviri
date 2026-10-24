import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import BeaufortTool from "../components/scales/BeaufortTool";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { BEAUFORT, beaufortOf } from "../converter/scales/beaufort";
import { buildSiteUrl } from "../siteConfig";

const PATH = "/bofor-cevirme";
const title = "Bofor Çevirme: Rüzgâr Hızı km/h ve Knot";
const description =
  "Rüzgâr hızını bofora çevirin: 45 km/h = 6 bofor (kuvvetli rüzgâr), 5 bofor = 29–38 km/h. WMO Beaufort tablosu, knot ve m/s karşılıkları, olası dalga yüksekliği.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  openGraph: { title, description, url: buildSiteUrl(PATH), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const r = ([a, b]: [number, number | null]) => (b === null ? `≥ ${a.toLocaleString("tr-TR")}` : a === b ? `${a.toLocaleString("tr-TR")}` : `${a.toLocaleString("tr-TR")}–${b.toLocaleString("tr-TR")}`);
const f = (n: number) => BEAUFORT[n];

const faqItems: FaqItem[] = [
  { question: "5 bofor kaç km/h?", answer: `5 bofor (${f(5).name.toLowerCase()}) ${r(f(5).kmh)} km/h, yani ${r(f(5).kn)} knot rüzgâr demektir. Açık denizde olası dalga yüksekliği yaklaşık ${f(5).wave} metredir.` },
  { question: "7 bofor kaç km/h?", answer: `7 bofor (${f(7).name.toLowerCase()}) ${r(f(7).kmh)} km/h, ${r(f(7).kn)} knot rüzgârdır. Küçük tekneler için tehlikeli kabul edilir; açık denizde dalgalar yaklaşık ${f(7).wave} metreye ulaşır.` },
  { question: "Kaç bofor fırtına sayılır?", answer: `Beaufort ölçeğinde 8 bofor (${r(f(8).kmh)} km/h) fırtına, 9 bofor kuvvetli fırtına, 10 bofor tam fırtına, 11 bofor şiddetli fırtına ve 12 bofor (${r(f(12).kmh)} km/h) kasırgadır.` },
  { question: "Bofor ile knot arasındaki fark nedir?", answer: "Knot bir hız birimidir (saatte 1 deniz mili = 1,852 km/h); bofor ise rüzgârı 0'dan 12'ye kadar derecelendiren bir ölçektir. Her bofor derecesi bir hız aralığına karşılık gelir, bu yüzden bofordan hıza çevirince tek değer değil aralık çıkar." },
  { question: "60 km/h rüzgâr kaç bofor?", answer: `60 km/h, ${beaufortOf(60, "kmh")!.force} bofor (${beaufortOf(60, "kmh")!.name.toLowerCase()}) aralığına girer (${r(beaufortOf(60, "kmh")!.kmh)} km/h).` },
];

export default function BeaufortPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/kategoriler/hiz", label: "Hız Çevirici" },
        { href: PATH, label: "Bofor Çevirme" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Bofor (Beaufort) Çevirme"
      intro="Rüzgâr hızını km/h, knot, m/s ya da mph olarak girin, bofor derecesini görün; ya da bofor derecesini seçip hız aralığını ve deniz durumunu öğrenin."
      tool={<BeaufortTool />}
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: "/knot-kilometre-saat", label: "Knot - km/h" },
          { href: "/kategoriler/hiz", label: "Hız Çevirici" },
          { href: "/hesaplayicilar#harita-ve-havacilik", label: "Harita, Coğrafya ve Havacılık" },
          { href: "/yan-ruzgar-hesaplama", label: "Yan Rüzgâr Hesaplama" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "tablo", label: "Bofor tablosu (0–12)" },
        { id: "okuma", label: "Hava ve deniz tahmininde bofor" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="tablo">Bofor tablosu (0–12)</h2>
      <p>
        Değerler Dünya Meteoroloji Örgütü (WMO) tablosundandır. km/h ve knot sütunları tam sayıya yuvarlanmış olduğundan sınırlar m/s sütunuyla birkaç
        onda bir farklı olabilir; çevirici her birimi kendi sütunuyla sınıflandırır.
      </p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>Bofor</th>
              <th>Adı</th>
              <th>km/h</th>
              <th>Knot</th>
              <th>m/s</th>
              <th>Dalga (m)</th>
            </tr>
          </thead>
          <tbody>
            {BEAUFORT.map((l) => (
              <tr key={l.force}>
                <td>
                  <strong>{l.force}</strong>
                </td>
                <td>{l.name}</td>
                <td>{r(l.kmh)}</td>
                <td>{r(l.kn)}</td>
                <td>{r(l.ms)}</td>
                <td>{l.wave.toLocaleString("tr-TR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="okuma">Hava ve deniz tahmininde bofor</h2>
      <p>
        Denizcilik tahminlerinde rüzgâr çoğunlukla yön ve bofor olarak verilir: &quot;poyraz 5, yer yer 6&quot; kuzeydoğudan {r(f(5).kmh)} km/h, zaman zaman{" "}
        {r(f(6).kmh)} km/h esen rüzgâr demektir. Dalga yükseklikleri açık deniz için verilen olası değerlerdir; kıyıda, körfezlerde ve rüzgârın kısa
        mesafede estiği yerlerde dalga daha alçak kalır.
      </p>
      <p>
        Ölçek 1805&apos;te İngiliz denizci Francis Beaufort tarafından yelkenlilerin taşıyabildiği yelken miktarına göre tanımlandı; bugünkü hız
        aralıkları sonradan anemometre ölçümleriyle eklendi. Knot ile km/h arasındaki tam çeviri için{" "}
        <Link href="/knot-kilometre-saat">knot - km/h</Link> sayfasına bakabilirsiniz.
      </p>
    </TimeToolPage>
  );
}
