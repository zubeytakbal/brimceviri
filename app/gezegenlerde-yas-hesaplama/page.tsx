import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import PlanetAgeTool from "../components/astro/PlanetAgeTool";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { daysFromYears, PLANET_YEARS, planetAges } from "../converter/time/planetAge";
import { buildSiteUrl } from "../siteConfig";

const PATH = "/gezegenlerde-yas-hesaplama";
const EXAMPLE = 25;
const AGES = [10, 18, 25, 30, 40, 50, 65];

const num = (v: number, digits = 1) => v.toLocaleString("tr-TR", { minimumFractionDigits: digits, maximumFractionDigits: digits });
const example = planetAges(daysFromYears(EXAMPLE));
const at = (id: string) => example.find((r) => r.id === id)!;

const title = "Diğer Gezegenlerde Kaç Yaşındayım?";
const description = `Yaşınızı girin, Merkür'den Plüton'a her gezegendeki yaşınızı görün: 25 yaşındaysanız Mars'ta ${num(at("mars").age)}, Merkür'de ${num(at("merkur").age)}, Jüpiter'de ${num(at("jupiter").age, 2)} yaşındasınız.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  openGraph: { title, description, url: buildSiteUrl(PATH), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const faqItems: FaqItem[] = [
  {
    question: "Mars'ta kaç yaşındayım?",
    answer: `Mars'ta bir yıl 686,98 Dünya günü, yani yaklaşık 1,88 Dünya yılı sürer. Dünya'daki yaşınızı 1,88'e bölerek Mars yaşınızı bulabilirsiniz: 25 yaşındaki biri Mars'ta ${num(at("mars").age)}, 40 yaşındaki biri ${num(planetAges(daysFromYears(40))[3].age)} yaşındadır.`,
  },
  {
    question: "Jüpiter'de kaç yaşındayım?",
    answer: `Jüpiter Güneş'in çevresini 4.332,6 Dünya gününde (yaklaşık 11,86 yılda) dolanır. Bu yüzden 25 yaşındaki biri Jüpiter'de yalnızca ${num(at("jupiter").age, 2)} yaşındadır; Jüpiter'de 1 yaşına girmek için Dünya'da yaklaşık 12 yıl geçmesi gerekir.`,
  },
  {
    question: "Gezegen yaşı neden virgüllü çıkıyor?",
    answer: `Çünkü Dünya'da yaşadığınız süre, gezegenin yıl uzunluğuna tam bölünmez. 25 yaş yaklaşık 9.131 gündür, Mars'ta bir yıl 687 gün sürer: 9.131 ÷ 687 = ${num(at("mars").age, 2)}. Yani Mars'ta 13 yaşını doldurmuş ve 14. yılınızın yaklaşık %29'unu geçirmişsinizdir. Hesaplayıcı tam yaşınızı büyük yazıyla, bir sonraki yaşa ne zaman gireceğinizi de altında gösterir.`,
  },
  {
    question: "En yaşlı olduğum gezegen hangisi?",
    answer: `Merkür. Güneş'e en yakın gezegen olan Merkür bir turunu 88 günde tamamlar; Dünya'da geçen her yıl Merkür'de yaklaşık 4,15 yıl eder. 25 yaşındaki biri Merkür'de ${num(at("merkur").age)} yaşındadır.`,
  },
  {
    question: "Neptün'de kimse 1 yaşına girebilir mi?",
    answer: "Neptün'de bir yıl 60.189 Dünya günü, yani yaklaşık 164,8 Dünya yılıdır. Hiçbir insan Neptün'de 1 yaşına giremez; Neptün 1846'da keşfedildiğinden bu yana Güneş'in çevresini ancak 2011'de bir kez dolanmıştır.",
  },
  {
    question: "Yıl ile gün neden farklı?",
    answer: "Yıl, gezegenin Güneş'in çevresini bir kez dolanma süresidir; gün ise Güneş'in bir doğuşundan ötekine geçen süredir. Venüs'te bir Güneş günü 116,75 Dünya günü sürer ve bir Venüs yılı yalnızca yaklaşık iki Venüs gününden oluşur. Tabloda her gezegende kaç yaşında olduğunuzun yanında orada kaç gün yaşadığınız da gösterilir.",
  },
];

export default function PlanetAgePage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/gokcisimleri-ozellikleri", label: "Gezegenlerin Özellikleri" },
        { href: PATH, label: "Gezegenlerde Yaş Hesaplama" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Diğer Gezegenlerde Kaç Yaşındayım?"
      intro="Dünya'daki yaşınızı ya da doğum tarihinizi girin: Merkür, Venüs, Mars, Jüpiter, Satürn, Uranüs, Neptün ve Plüton'da kaç yaşında olduğunuz, orada kaç gün yaşadığınız ve her gezegendeki bir sonraki doğum gününüz sırayla gösterilir."
      tool={<PlanetAgeTool defaultAge={EXAMPLE} />}
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: "/gezegenlerde-kac-kilo-gelirim", label: "Diğer Gezegenlerde Kaç Kilo Gelirim?" },
          { href: "/gokcisimleri-ozellikleri", label: "Gezegenlerin Özellikleri" },
          { href: "/yas-hesaplama", label: "Yaş Hesaplama" },
          { href: "/bu-gece-gezegenler", label: "Bu Gece Hangi Gezegenler Görünür?" },
          { href: "/gokyuzu-olaylari-takvimi", label: "Gökyüzü Olayları Takvimi" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "tablo", label: "Yaşa göre gezegen yaşları tablosu" },
        { id: "nasil", label: "Gezegen yaşı nasıl hesaplanır?" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="tablo">Yaşa göre gezegen yaşları tablosu</h2>
      <p>
        Aşağıdaki tablo Dünya&apos;daki bazı yaşların her gezegende kaça karşılık geldiğini gösterir. Güneş&apos;e yakın gezegenlerde yıl kısa olduğu için
        yaşınız büyür, uzak gezegenlerde ise küçülür. Virgülden sonraki kısım, bir sonraki yaşa doğru ne kadar ilerlendiğini gösterir: Mars&apos;ta
        13,3 yaş, 13 yaşını doldurup 14. yılın yaklaşık üçte birini geçirmiş olmak demektir; 1&apos;in altındaki değerler (Neptün&apos;de 0,15 gibi) o
        gezegende henüz 1 yaşına girilmediğini gösterir.
      </p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>Dünya&apos;da</th>
              {PLANET_YEARS.filter((p) => p.id !== "dunya").map((p) => (
                <th key={p.id}>{p.name.replace(" (cüce gezegen)", "")}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {AGES.map((a) => (
              <tr key={a}>
                <td>
                  <strong>{a} yaş</strong>
                </td>
                {planetAges(daysFromYears(a))
                  .filter((r) => r.id !== "dunya")
                  .map((r) => (
                    <td key={r.id}>{num(r.age, r.age < 10 ? 2 : 1)}</td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="nasil">Gezegen yaşı nasıl hesaplanır?</h2>
      <p>
        Bir gezegendeki yaşınız, Dünya&apos;da yaşadığınız gün sayısının o gezegenin bir yılına (Güneş&apos;in çevresini bir kez dolanma süresine) bölümüdür.
        Örneğin 25 yaş yaklaşık 9.131 gündür; Mars&apos;ta bir yıl 686,98 gün sürdüğü için 9.131 ÷ 686,98 = {num(at("mars").age, 2)} Mars yılı eder.
        Doğum tarihinizi girerseniz hesap bugüne kadar geçen gün sayısıyla yapılır ve her gezegende bir sonraki tam yaşınıza ne zaman gireceğiniz de
        gösterilir.
      </p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>Gezegenlerde bir yıl ve bir gün ne kadar sürer?</caption>
          <thead>
            <tr>
              <th>Gezegen</th>
              <th>Bir yıl (Dünya günü)</th>
              <th>Bir yıl (Dünya yılı)</th>
              <th>Bir gün (Güneş günü)</th>
            </tr>
          </thead>
          <tbody>
            {PLANET_YEARS.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.orbitDays.toLocaleString("tr-TR")}</td>
                <td>{num(p.orbitDays / 365.25, 2)}</td>
                <td>{p.solarDayHours >= 48 ? `${num(p.solarDayHours / 24, 1)} Dünya günü` : `${num(p.solarDayHours, 1)} saat`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Yıl uzunlukları NASA&apos;nın gezegen bilgi sayfalarındaki yıldızıl yörünge dönemleridir (gezegenin yıldızlara göre Güneş çevresinde bir tur
        atma süresi). Gün uzunluğu Güneş&apos;in bir doğuşundan ötekine geçen süredir; Merkür ve Venüs&apos;te kendi ekseni çevresinde dönüş çok yavaş olduğu
        için bir Güneş günü aylarca sürer. Her gezegende kaç kilo geleceğinizi görmek için{" "}
        <Link href="/gezegenlerde-kac-kilo-gelirim">gezegenlerde kaç kilo gelirim</Link> aracına bakabilirsiniz.
      </p>
    </TimeToolPage>
  );
}
