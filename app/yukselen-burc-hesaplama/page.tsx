import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import NatalTool, { type NatalCity } from "../components/astro/NatalTool";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { turkeyProvinces } from "../converter/geo/turkeyProvinces";
import { ZODIAC_TR } from "../converter/time/moonPosition";
import { degreeInSign, localToUtc, natalChart, risingDurations } from "../converter/time/natalChart";
import { buildSiteUrl } from "../siteConfig";

const PATH = "/yukselen-burc-hesaplama";

// Sayfadaki örnek: 15 Mayıs 1990, 10:30, İstanbul.
const ist = turkeyProvinces.find((p) => p.id === "istanbul")!;
const ex = natalChart(localToUtc(1990, 5, 15, 10, 30), ist.lat, ist.lon);
const sign = (l: number) => ZODIAC_TR[degreeInSign(l).sign];

const title = "Yükselen Burç Hesaplama ve Ay Burcu";
const description = `Doğum tarihi, saati ve iline göre yükselen burç, ay burcu ve güneş burcu: ör. 15 Mayıs 1990 10:30 İstanbul = Güneş ${sign(ex.sun)}, Ay ${sign(ex.moon)}, yükselen ${sign(ex.asc)}. Türkiye'nin eski yaz saatleri dahil.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  openGraph: { title, description, url: buildSiteUrl(PATH), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const cities: NatalCity[] = [...turkeyProvinces]
  .sort((a, b) => a.name.localeCompare(b.name, "tr"))
  .map((p) => ({ id: p.id, name: p.name, lat: p.lat, lon: p.lon }));

// Her burcun ufukta yükselme süresi enleme göre değişir: İstanbul ve Antalya karşılaştırması (bugünün tarihiyle).
const today = new Date();
const dayUtc = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()) - 3 * 3600000);
const antalya = turkeyProvinces.find((p) => p.id === "antalya")!;
const risingIst = risingDurations(dayUtc, ist.lat, ist.lon);
const risingAnt = risingDurations(dayUtc, antalya.lat, antalya.lon);
const hm = (min: number) => `${Math.floor(min / 60)} sa ${String(min % 60).padStart(2, "0")} dk`;
const fastest = risingIst.indexOf(Math.min(...risingIst));
const slowest = risingIst.indexOf(Math.max(...risingIst));

const faqItems: FaqItem[] = [
  { question: "Yükselen burç nedir?", answer: "Doğduğunuz anda doğu ufkunda yükselmekte olan burçtur. Dünya kendi ekseni etrafında döndüğü için 12 burcun her biri gün içinde sırayla doğu ufkundan yükselir; yükselen burç bu yüzden doğum gününe değil, doğum saatine ve yerine bağlıdır." },
  { question: "Yükselen burç için doğum saati neden gerekli?", answer: `Yükselen burç ortalama 2 saatte bir değişir ve her 4 dakikada yaklaşık 1 derece ilerler. Örneğin 15 Mayıs 1990'da İstanbul'da saat 10:30'da doğan birinin yükseleni ${sign(ex.asc)} ${degreeInSign(ex.asc).deg}°'dir; ama burç sınırına çok yakın olduğu için 15 dakika önce doğmuş olsaydı yükseleni ${ZODIAC_TR[ex.ascRange[1] ?? degreeInSign(ex.asc).sign]} olurdu.` },
  { question: "Ay burcu nedir, nasıl bulunur?", answer: "Doğum anında Ay'ın bulunduğu burçtur. Ay bir burçta ortalama 2,5 gün kaldığı için ay burcu çoğu zaman yalnızca doğum tarihinden bulunabilir; ancak Ay o gün burç değiştirdiyse doğru sonuç için doğum saati gerekir. Hesaplayıcı bu durumda iki ihtimali birlikte gösterir." },
  { question: "Eski doğum tarihlerinde yaz saati hesaba katılıyor mu?", answer: "Evet. Türkiye 2016'ya kadar yaz ve kış saati uyguluyordu; örneğin Ocak 1985'te saat UTC+2, Temmuz 2000'de UTC+3'tü. Hesaplayıcı, doğum tarihindeki resmî saati uluslararası saat dilimi veritabanından (IANA) alarak doğum anını UTC'ye çevirir ve kullanılan farkı sonuçta gösterir." },
  { question: "Güneş burcum neden burç tarihlerinden farklı çıkıyor?", answer: "Gazetelerdeki burç tarihleri ortalamadır. Güneş bir burçtan diğerine her yıl birkaç saat farkla geçer; burç değişiminin olduğu günlerde doğanların güneş burcu, doğum saatine göre bir önceki ya da bir sonraki burç olabilir. Hesaplayıcı Güneş'in o andaki gerçek konumunu kullanır." },
];

export default function NatalPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/ay-evreleri", label: "Ay Evreleri" },
        { href: PATH, label: "Yükselen Burç Hesaplama" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Yükselen Burç Hesaplama"
      intro="Doğum tarihinizi, saatinizi ve doğduğunuz ili girin; doğum anında doğu ufkunda yükselen burç (yükselen), Ay'ın ve Güneş'in bulunduğu burçlar derece hassasiyetiyle hesaplanır."
      tool={<NatalTool cities={cities} defaultCity="istanbul" />}
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: "/ay-evreleri", label: "Ay Evreleri ve Ay'ın Burcu" },
          { href: "/gunes-dogusu-ve-batisi", label: "Güneş Doğuşu ve Batışı" },
          { href: "/dogdugum-gun-hangi-gun", label: "Doğduğum Gün Hangi Gün" },
          { href: "/yas-hesaplama", label: "Yaş Hesaplama" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "nasil", label: "Yükselen burç nasıl hesaplanır?" },
        { id: "sure", label: "Hangi burç ne kadar sürede yükselir?" },
        { id: "not", label: "Hesap hakkında not" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="nasil">Yükselen burç nasıl hesaplanır?</h2>
      <p>
        Hesap üç adımdan oluşur. Önce doğum saati, o tarihte Türkiye&apos;de geçerli olan resmî saate göre (2016 öncesinde yaz ve kış saati dahil) evrensel
        saate (UTC) çevrilir. Sonra doğum yerinin boylamıyla <strong>yerel yıldız zamanı</strong> bulunur; bu, gökyüzünün o anda doğum yerine göre ne kadar
        döndüğünü gösterir. Son olarak doğum yerinin enlemi ve ekliptiğin eğikliğiyle, doğu ufkunun Güneş&apos;in yıllık yolunu (ekliptik) kestiği nokta
        hesaplanır: yükselen burç bu noktanın bulunduğu burçtur.
      </p>
      <p>
        Güneş ve Ay burçları ise doğum anında bu iki gök cisminin ekliptik üzerindeki konumundan bulunur. Ay&apos;ın konumu{" "}
        <Link href="/ay-evreleri">ay evreleri</Link> sayfasındaki burç hesabıyla aynı yöntemle (Jean Meeus&apos;un Ay formülleri) yapılır.
      </p>

      <h2 id="sure">Hangi burç ne kadar sürede yükselir?</h2>
      <p>
        Burçlar ufukta eşit sürede yükselmez: ekliptik ufka eğik durduğu için bazı burçlar dik, bazıları yatık açıyla doğar ve süre enleme göre değişir.
        Bugün İstanbul&apos;da en hızlı yükselen burç <strong>{ZODIAC_TR[fastest]}</strong> ({hm(risingIst[fastest])}), en yavaş yükselen{" "}
        <strong>{ZODIAC_TR[slowest]}</strong> ({hm(risingIst[slowest])}). Bu yüzden hızlı yükselen burçlar yükselen olarak daha seyrek görülür.
      </p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>Burç</th>
              <th>İstanbul</th>
              <th>Antalya</th>
            </tr>
          </thead>
          <tbody>
            {ZODIAC_TR.map((name, i) => (
              <tr key={name}>
                <td>
                  <strong>{name}</strong>
                </td>
                <td>{hm(risingIst[i])}</td>
                <td>{hm(risingAnt[i])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="not">Hesap hakkında not</h2>
      <p>
        Burçlar tropikal zodyağa göredir: ekliptik, ilkbahar ekinoksu noktasından (0° Koç) başlayarak 30&apos;ar derecelik on iki dilime bölünür.
        Hesaplayıcı yalnızca gök cisimlerinin ve ufkun konumunu verir; burç yorumu içermez. Astroloji bilimsel bir yöntem değildir, sonuçları merak
        ve eğlence amacıyla değerlendirin. Konumlar bağımsız astronomi yazılımlarıyla karşılaştırılmış, yükselen derecesi 0,01° içinde örtüşmüştür;
        sonucun doğruluğu en çok doğum saatinin doğruluğuna bağlıdır.
      </p>
    </TimeToolPage>
  );
}
