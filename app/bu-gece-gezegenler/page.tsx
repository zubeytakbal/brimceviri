import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import PlanetTool, { type PlanetCity } from "../components/astro/PlanetTool";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { turkeyProvinces } from "../converter/geo/turkeyProvinces";
import { planetNight, VISIBILITY_TR } from "../converter/time/planets";
import { buildSiteUrl } from "../siteConfig";

const PATH = "/bu-gece-gezegenler";
const TR_OFFSET = 3 * 3600000;

// Sayfa her gece yeniden derlenir: İstanbul için o gecenin özeti ham HTML'de yer alır.
const now = new Date();
const trNow = new Date(now.getTime() + TR_OFFSET);
const ymd = `${trNow.getUTCFullYear()}-${String(trNow.getUTCMonth() + 1).padStart(2, "0")}-${String(trNow.getUTCDate()).padStart(2, "0")}`;
const dayStart = new Date(Date.UTC(trNow.getUTCFullYear(), trNow.getUTCMonth(), trNow.getUTCDate()) - TR_OFFSET);
const ist = turkeyProvinces.find((p) => p.id === "istanbul")!;
const night = planetNight(dayStart, ist.lat, ist.lon);
const visible = night.planets.filter((p) => p.visibility !== "none");
const clock = (d: Date | null) => (d ? new Intl.DateTimeFormat("tr-TR", { timeZone: "Europe/Istanbul", hour: "2-digit", minute: "2-digit" }).format(d) : "—");
const dateText = new Intl.DateTimeFormat("tr-TR", { timeZone: "Europe/Istanbul", day: "numeric", month: "long", year: "numeric" }).format(now);
const venus = night.planets.find((p) => p.id === "venus")!;

const title = "Bu Gece Hangi Gezegenler Görünür?";
const description = `${dateText} gecesi İstanbul'da görünen gezegenler: ${visible.length ? visible.map((p) => p.name).join(", ") : "yok"}. 81 ilde Merkür, Venüs, Mars, Jüpiter ve Satürn'ün görünme saatleri, yönü ve parlaklığı.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  openGraph: { title, description, url: buildSiteUrl(PATH), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const cities: PlanetCity[] = [...turkeyProvinces]
  .sort((a, b) => a.name.localeCompare(b.name, "tr"))
  .map((p) => ({ id: p.id, name: p.name, lat: p.lat, lon: p.lon }));

const faqItems: FaqItem[] = [
  { question: "Gökyüzündeki en parlak yıldız gibi görünen şey ne?", answer: "Akşam batıda ya da sabah doğuda çok parlak, titremeyen bir nokta görüyorsanız büyük ihtimalle Venüs'tür; Venüs Ay'dan sonra gece gökyüzünün en parlak cismidir. Gecenin ortasında güneye yakın parlak bir nokta ise çoğu zaman Jüpiter'dir. Yukarıdaki tablo o gece hangisinin nerede olduğunu gösterir." },
  { question: "Venüs bu akşam görünüyor mu?", answer: venus.visibility === "none" ? `${dateText} itibarıyla Venüs Güneş'e çok yakın (açı ${Math.round(venus.elongation)}°) olduğu için Türkiye'den görünmüyor. Venüs Güneş'ten uzaklaştıkça önce akşam ya da sabah ufkunda yeniden görünmeye başlar.` : `Evet. ${dateText} gecesi İstanbul'da Venüs ${VISIBILITY_TR[venus.visibility].toLowerCase()}${venus.window ? `; ${clock(venus.window.from)}–${clock(venus.window.to)} arasında ufkun üstünde` : ""}.` },
  { question: "Gezegeni yıldızdan nasıl ayırırım?", answer: "Gezegenler yıldızlar gibi göz kırpmaz; daha sabit bir ışıkla parlar. Ayrıca her gece aynı yıldızlara göre biraz yer değiştirir. Mars kızılımsı, Satürn sarımsı, Jüpiter ve Venüs ise beyaz renktedir." },
  { question: "Parlaklık (kadir) değeri ne anlama gelir?", answer: "Astronomide parlaklık kadir (magnitüd) ile ölçülür ve sayı küçüldükçe cisim parlaklaşır. Venüs yaklaşık −4, Jüpiter yaklaşık −1,6 ile −2,9 arası, Mars 2 ile −2,9 arası değişir. Şehir içinde yaklaşık 3 kadire kadar olan cisimler çıplak gözle görülebilir; beş gezegenin hepsi uygun konumdayken bu sınırın içindedir." },
  { question: "Merkür neden nadiren görülür?", answer: "Merkür Güneş'e en yakın gezegendir ve Güneş'ten hiçbir zaman 28°'den fazla uzaklaşmaz. Bu yüzden yalnızca gün batımından hemen sonra ya da gün doğumundan hemen önce, ufka yakın ve kısa bir süre için görülebilir." },
];

export default function PlanetPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/ay-evreleri", label: "Ay Evreleri" },
        { href: PATH, label: "Bu Gece Gezegenler" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Bu Gece Hangi Gezegenler Görünür?"
      intro="İlinizi ve tarihi seçin: çıplak gözle görülen beş gezegenin (Merkür, Venüs, Mars, Jüpiter, Satürn) o gece hangi saatlerde ufkun üstünde olduğu, en iyi görüldüğü saat ve yön, parlaklığı ve bulunduğu takımyıldız."
      tool={<PlanetTool cities={cities} defaultCity="istanbul" initialDate={ymd} />}
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: "/gokyuzu-olaylari-takvimi", label: "Gökyüzü Olayları Takvimi" },
          { href: "/ay-evreleri", label: "Ay Evreleri" },
          { href: "/gunes-dogusu-ve-batisi", label: "Güneş Doğuşu ve Batışı" },
          { href: "/gokcisimleri-ozellikleri", label: "Gezegenlerin Özellikleri" },
          { href: "/yukselen-burc-hesaplama", label: "Yükselen Burç Hesaplama" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "bu-gece", label: `${dateText} gecesi İstanbul` },
        { id: "nasil", label: "Gezegenler nerede ve ne zaman görülür?" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="bu-gece">{dateText} gecesi İstanbul</h2>
      <p>
        Gün batımı {clock(night.sunset)}, ertesi sabah gün doğumu {clock(night.sunrise)}.{" "}
        {visible.length
          ? `Bu gece çıplak gözle görülebilen gezegenler: ${visible.map((p) => p.name).join(", ")}.`
          : "Bu gece çıplak gözle görülebilen bir gezegen yok."}
      </p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>Gezegen</th>
              <th>Ne zaman?</th>
              <th>En iyi saat ve yön</th>
              <th>Parlaklık</th>
              <th>Takımyıldız</th>
            </tr>
          </thead>
          <tbody>
            {night.planets.map((p) => (
              <tr key={p.id}>
                <td>
                  <strong>{p.name}</strong>
                </td>
                <td>{p.window ? `${clock(p.window.from)}–${clock(p.window.to)}` : VISIBILITY_TR.none}</td>
                <td>{p.best ? `${clock(p.best.at)}, ${p.best.direction}, ${Math.round(p.best.altitude)}°` : "—"}</td>
                <td>{p.magnitude.toLocaleString("tr-TR", { maximumFractionDigits: 1 })}</td>
                <td>{p.constellation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="nasil">Gezegenler nerede ve ne zaman görülür?</h2>
      <p>
        Gezegenler Güneş&apos;in yıllık yoluna (ekliptik) yakın bir kuşakta, burç takımyıldızlarının önünde hareket eder. Bir gezegenin o gece görülüp
        görülmeyeceği, gökyüzünde Güneş&apos;e ne kadar uzak göründüğüne bağlıdır: Güneş&apos;e 10°&apos;den yakın olanlar parlak gökyüzünde kaybolur. Güneş&apos;in
        doğusunda kalan gezegen akşamları batıda, batısında kalan sabahları doğuda görülür; Güneş&apos;in tam karşısındaki (karşı konumdaki) gezegen ise gün
        batımında doğar ve bütün gece görülür.
      </p>
      <p>
        Tablodaki saatler, gezegenin karanlıkta (gün batımından 45 dakika sonra ile gün doğumundan 45 dakika önce arasında) ufkun 5° üstünde olduğu
        aralıktır; dağ, bina ya da ağaç gibi engeller alçaktaki gezegeni gizleyebilir. Konumlar NASA JPL verileriyle doğrulanmış açık kaynaklı astronomy-engine
        kütüphanesiyle hesaplanır. Ay&apos;ın konumu ve evresi için <Link href="/ay-evreleri">ay evreleri</Link> sayfasına bakabilirsiniz.
      </p>
    </TimeToolPage>
  );
}
