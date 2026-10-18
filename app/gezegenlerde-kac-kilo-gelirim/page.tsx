import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import PlanetWeightTool from "../components/astro/PlanetWeightTool";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { bodyWeights, MAIN_BODIES, sunWeight } from "../converter/planetWeights";
import { buildSiteUrl } from "../siteConfig";

const PATH = "/gezegenlerde-kac-kilo-gelirim";
const EXAMPLE = 70;
const WEIGHTS = [40, 50, 60, 70, 80, 90, 100];

const fmt = (v: number) => v.toLocaleString("tr-TR", { maximumFractionDigits: 1 });
const example = bodyWeights(EXAMPLE, MAIN_BODIES);
const at = (id: string) => example.find((r) => r.id === id)!;

const title = "Diğer Gezegenlerde Kaç Kilo Gelirim?";
const description = `Kilonuzu girin, Ay'da, Mars'ta, Jüpiter'de ve tüm gezegenlerde kaç kilo geldiğinizi görün: 70 kg gelen biri Ay'da ${fmt(at("ay").kg)}, Mars'ta ${fmt(at("mars").kg)}, Jüpiter'de ${fmt(at("jupiter").kg)} kg gelir.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  openGraph: { title, description, url: buildSiteUrl(PATH), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const faqItems: FaqItem[] = [
  {
    question: "Ay'da kaç kilo gelirim?",
    answer: `Ay'ın yüzey yerçekimi Dünya'nınkinin yaklaşık altıda biridir (%${Math.round(at("ay").ratio * 100)}). Dünya'da 70 kg gelen biri Ay'da tartıda ${fmt(at("ay").kg)} kg, 60 kg gelen biri ${fmt(bodyWeights(60, ["ay"])[0].kg)} kg görür. Bu yüzden astronotlar Ay'da sıçrayarak yürür.`,
  },
  {
    question: "Jüpiter'de kaç kilo gelirim?",
    answer: `Jüpiter'in yerçekimi Dünya'nın yaklaşık ${fmt(at("jupiter").ratio)} katıdır; 70 kg gelen biri Jüpiter'de ${fmt(at("jupiter").kg)} kg gelir. Jüpiter bir gaz devidir ve üzerinde durulacak katı bir yüzeyi yoktur; değer, atmosfer basıncının Dünya'daki deniz seviyesine eşit olduğu yükseklik içindir.`,
  },
  {
    question: "Mars'ta kaç kilo gelirim?",
    answer: `Mars'ın yerçekimi Dünya'nın yaklaşık %${Math.round(at("mars").ratio * 100)}'i kadardır. 70 kg gelen biri Mars'ta ${fmt(at("mars").kg)} kg, 80 kg gelen biri ${fmt(bodyWeights(80, ["mars"])[0].kg)} kg gelir. Merkür'ün yerçekimi de Mars'ınkiyle neredeyse aynıdır.`,
  },
  {
    question: "Güneş'te kaç kilo gelirim?",
    answer: `Güneş'in görünen yüzeyindeki yerçekimi yaklaşık 274 m/s², yani Dünya'nın 28 katıdır. 70 kg gelen biri orada ${fmt(sunWeight(70))} kg gelirdi; ancak Güneş'in katı bir yüzeyi yoktur ve yüzey sıcaklığı yaklaşık 5.500 °C'dir.`,
  },
  {
    question: "Başka bir gezegende kilom gerçekten değişir mi?",
    answer: "Hayır, vücudunuzdaki madde miktarı (kütle) her yerde aynıdır. Değişen, yerçekiminin sizi çekme kuvveti yani ağırlığınızdır. Tartılar bu kuvveti ölçüp Dünya yerçekimine göre kilograma çevirdiği için, aynı tartı Ay'da daha az, Jüpiter'de daha çok gösterir.",
  },
];

export default function PlanetWeightPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/gokcisimleri-ozellikleri", label: "Gezegenlerin Özellikleri" },
        { href: PATH, label: "Gezegenlerde Kaç Kilo Gelirim" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Diğer Gezegenlerde Kaç Kilo Gelirim?"
      intro="Dünya'daki kilonuzu girin: Merkür, Venüs, Ay, Mars, Jüpiter, Satürn, Uranüs, Neptün ve Plüton'da tartının kaç kilo göstereceği Güneş'e uzaklık sırasıyla listelenir. İsterseniz Jüpiter ve Satürn'ün uydularını, Ceres ve Eris'i de ekleyebilirsiniz."
      tool={<PlanetWeightTool defaultKg={EXAMPLE} />}
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: "/gezegenlerde-yas-hesaplama", label: "Diğer Gezegenlerde Kaç Yaşındayım?" },
          { href: "/gokcisimleri-ozellikleri", label: "Gezegenlerin Özellikleri" },
          { href: "/bu-gece-gezegenler", label: "Bu Gece Hangi Gezegenler Görünür?" },
          { href: "/ay-evreleri", label: "Ay Evreleri" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "tablo", label: "Kiloya göre gezegenlerde ağırlık tablosu" },
        { id: "nasil", label: "Gezegenlerde ağırlık nasıl hesaplanır?" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="tablo">Kiloya göre gezegenlerde ağırlık tablosu</h2>
      <p>Dünya&apos;daki bazı kilolar için her gök cisminde tartının göstereceği değer (kg):</p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>Dünya&apos;da</th>
              {example
                .filter((r) => r.id !== "dunya")
                .map((r) => (
                  <th key={r.id}>{r.name}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {WEIGHTS.map((w) => (
              <tr key={w}>
                <td>
                  <strong>{w} kg</strong>
                </td>
                {bodyWeights(w, MAIN_BODIES)
                  .filter((r) => r.id !== "dunya")
                  .map((r) => (
                    <td key={r.id}>{fmt(r.kg)}</td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="nasil">Gezegenlerde ağırlık nasıl hesaplanır?</h2>
      <p>
        Bir gök cismindeki ağırlığınız, Dünya&apos;daki kilonuzun o cismin yüzey yerçekiminin Dünya&apos;nınkine (9,8 m/s²) oranıyla çarpımıdır. Örneğin Mars&apos;ın
        yerçekimi 3,7 m/s² olduğu için 70 kg × 3,7 ÷ 9,8 = {fmt(at("mars").kg)} kg eder. Yerçekimi bir gök cisminin kütlesine ve yarıçapına bağlıdır: Satürn
        Dünya&apos;dan 95 kat ağır olduğu hâlde çok büyük olduğu için yüzeyindeki çekim Dünya&apos;nınkine yakındır.
      </p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>Gök cisimlerinin yüzey yerçekimi</caption>
          <thead>
            <tr>
              <th>Gök cismi</th>
              <th>Yerçekimi (m/s²)</th>
              <th>Dünya&apos;ya göre</th>
            </tr>
          </thead>
          <tbody>
            {example.map((r) => (
              <tr key={r.id}>
                <td>{r.name}</td>
                <td>{fmt(r.gravity)}</td>
                <td>{fmt(r.ratio)} kat</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Yerçekimi değerleri NASA&apos;nın gezegen bilgi sayfalarından alınmıştır. Jüpiter, Satürn, Uranüs ve Neptün gaz ve buz devleridir; değerleri, atmosfer
        basıncının Dünya&apos;daki deniz seviyesine eşit olduğu yükseklik içindir. Her gök cisminin kütlesi, çapı ve diğer özellikleri için{" "}
        <Link href="/gokcisimleri-ozellikleri">gezegenlerin özellikleri</Link> sayfasına, her gezegendeki yaşınız için{" "}
        <Link href="/gezegenlerde-yas-hesaplama">gezegenlerde yaş hesaplama</Link> aracına bakabilirsiniz.
      </p>
    </TimeToolPage>
  );
}
