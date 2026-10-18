import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import SkyCalendar from "../components/astro/SkyCalendar";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { SOLAR_ECLIPSES, TURKEY_SOLAR_DETAILS } from "../converter/time/eclipses";
import { METEOR_SHOWERS, meteorPeak, nightName, skyEvents } from "../converter/time/skyEvents";
import { buildSiteUrl } from "../siteConfig";

const PATH = "/gokyuzu-olaylari-takvimi";
const DAY = 86400000;

// Sayfa her gece yeniden derlenir: önümüzdeki 13 ayın olayları ham HTML'de yer alır.
const now = new Date();
const from = new Date(now.getTime() - DAY);
const to = new Date(now.getTime() + 395 * DAY);
const events = skyEvents(from, to);
const year = Number(new Intl.DateTimeFormat("en", { timeZone: "Europe/Istanbul", year: "numeric" }).format(now));
const dayFmt = new Intl.DateTimeFormat("tr-TR", { timeZone: "Europe/Istanbul", day: "numeric", month: "long", year: "numeric" });

// Her meteor yağmurunun sıradaki zirvesi (bu yıl geçtiyse gelecek yıl).
const meteors = METEOR_SHOWERS.map((s) => {
  const peak = meteorPeak(s, year);
  return peak.peak.getTime() > now.getTime() - DAY ? peak : meteorPeak(s, year + 1);
}).sort((a, b) => a.peak.getTime() - b.peak.getTime());
const nextMeteor = meteors[0];
const nextSolarTr = SOLAR_ECLIPSES.find((e) => new Date(e.peak) > now && (e.obscuration.istanbul || e.obscuration.ankara));
const solarDetail = nextSolarTr ? TURKEY_SOLAR_DETAILS[nextSolarTr.peak.slice(0, 10)] : undefined;
const nextEclipse = events.find((e) => e.kind === "eclipse");
const supermoon = events.find((e) => e.title.startsWith("Süper ay"));

const title = `Gökyüzü Olayları Takvimi ${year}–${year + 1}`;
const description = `Sıradaki: ${nextMeteor.name} meteor yağmuru, ${nightName(nextMeteor.nightMid)} (saatte ~${nextMeteor.expected} meteor). Türkiye saatiyle tutulmalar, süper ay, gezegen yakınlaşmaları ve ekinokslar.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  openGraph: { title, description, url: buildSiteUrl(PATH), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const faqItems: FaqItem[] = [
  {
    question: "Sıradaki meteor yağmuru ne zaman?",
    answer: `${nextMeteor.name}, en yoğun ${nightName(nextMeteor.nightMid)} görülür. Işık kirliliğinden uzak, açık bir gökte en iyi saatte saatte yaklaşık ${nextMeteor.expected} meteor beklenebilir; zirve gecesi Ay %${nextMeteor.moonPercent} aydınlık olacak.`,
  },
  {
    question: "Türkiye'den görülecek bir sonraki güneş tutulması ne zaman?",
    answer: nextSolarTr
      ? `${dayFmt.format(new Date(nextSolarTr.peak))} tarihindeki güneş tutulması Türkiye'den parçalı olarak görülecek: Güneş diskinin İstanbul'da yaklaşık %${nextSolarTr.obscuration.istanbul}, Ankara'da %${nextSolarTr.obscuration.ankara}, İzmir'de %${nextSolarTr.obscuration.izmir} kadarı örtülecek${solarDetail ? `; en yüksek oran ${solarDetail.max[0]} (%${solarDetail.max[1]}), en düşük ${solarDetail.min[0]} (%${solarDetail.min[1]})` : ""}. Güneş'e asla korumasız ya da sıradan güneş gözlüğüyle bakmayın.`
      : "2035'e kadar olan listede Türkiye'den görülecek başka güneş tutulması yok.",
  },
  {
    question: "ZHR nedir, gerçekten saatte o kadar meteor görür müyüm?",
    answer: "ZHR (zenit saatlik oranı), radyant tam tepedeyken ve gökyüzü 6,5 kadirlik yıldızları gösterecek kadar karanlıkken bir gözlemcinin saatte göreceği meteor sayısıdır. Radyant alçaktaysa sayı radyant yüksekliğinin sinüsüyle azalır; tablodaki beklenen sayı Ankara için bu düzeltmeyle hesaplanmıştır. Şehir ışıkları ya da parlak Ay bu sayıyı birkaç kat düşürebilir.",
  },
  {
    question: "Meteor yağmurunu izlemek için teleskop gerekir mi?",
    answer: "Hayır. Meteorlar gökyüzünün her yerinde görülebilir; teleskop ve dürbün görüş alanını daralttığı için işe yaramaz. Şehirden uzak, karanlık bir yere gidip gözlerinizin 20-30 dakika karanlığa alışmasını bekleyin ve gökyüzünün geniş bir bölümüne bakın.",
  },
  {
    question: "Ay ve gezegen yan yana göründüğünde ne oluyor?",
    answer: "Ay ve gezegenler gökyüzünde aynı kuşakta (ekliptiğe yakın) hareket ettiği için zaman zaman birbirine yakın görünür. Bu bir perspektif olayıdır; gerçekte aralarında yüz milyonlarca kilometre vardır. Ay her ay her gezegenin yanından bir kez geçer, ancak bunların bazıları Türkiye'den karanlıkta ve birbirine birkaç derece yakın görülür.",
  },
];

export default function SkyEventsPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/ay-evreleri", label: "Ay Evreleri" },
        { href: PATH, label: "Gökyüzü Olayları Takvimi" },
      ]}
      crumbLabel="Sayfa yolu"
      title={`Gökyüzü Olayları Takvimi ${year}–${year + 1}`}
      intro="Önümüzdeki 13 ayda Türkiye'den izlenebilecek gökyüzü olayları: meteor yağmurlarının zirve gecesi, Ay ve Güneş tutulmaları, süper ay, gezegenlerin en iyi görüldüğü günler, Ay–gezegen yakınlaşmaları, ekinoks ve gündönümleri. Tüm saatler Türkiye saatidir."
      tool={<SkyCalendar events={events.map((e) => ({ ...e, at: e.at.toISOString() }))} />}
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: "/bu-gece-gezegenler", label: "Bu Gece Hangi Gezegenler Görünür?" },
          { href: "/ay-evreleri", label: "Ay Evreleri" },
          { href: "/ay-gozlem-cizelgesi", label: "Ay Gözlem Çizelgesi" },
          { href: "/gunes-dogusu-ve-batisi", label: "Güneş Doğuşu ve Batışı" },
          { href: "/en-uzun-gun-ve-en-kisa-gun", label: "En Uzun Gün ve En Kısa Gün" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "meteor", label: "Meteor yağmurları" },
        { id: "tutulma", label: "Tutulmalar ve süper ay" },
        { id: "gezegen", label: "Gezegen olayları ne anlama gelir?" },
        { id: "yontem", label: "Hesaplama yöntemi" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="meteor">Meteor yağmurları</h2>
      <p>
        Meteor yağmuru, Dünya bir kuyrukluyıldızın ya da asteroidin yörüngesinde bıraktığı toz bulutunun içinden geçerken görülür. Her yağmurun
        meteorları gökyüzünde aynı noktadan (radyant) çıkıyormuş gibi görünür ve yağmur adını bu noktanın bulunduğu takımyıldızdan alır. Yıl içindeki
        en güçlü yağmurlar Aralık&apos;taki Geminidler, Ağustos&apos;taki Perseidler ve Ocak başındaki Kuadrantidlerdir.
      </p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>Sıradaki zirveler ve Ankara&apos;dan beklenen sayılar</caption>
          <thead>
            <tr>
              <th>Yağmur</th>
              <th>Zirve gecesi</th>
              <th>ZHR</th>
              <th>Saatte en çok</th>
              <th>Ay</th>
              <th>Etkin dönem</th>
            </tr>
          </thead>
          <tbody>
            {meteors.map((m) => (
              <tr key={m.id}>
                <td>
                  <strong>{m.name}</strong>
                  <br />
                  {m.parent}
                </td>
                <td>{nightName(m.nightMid)}</td>
                <td>{m.zhr}</td>
                <td>~{m.expected}</td>
                <td>%{m.moonPercent}</td>
                <td>{m.active}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        &quot;Saatte en çok&quot;, zirve gecesi Ankara&apos;da radyantın karanlıkta en yüksek olduğu saatteki değerdir (ZHR × radyant yüksekliğinin
        sinüsü). Ay&apos;ın aydınlık oranı yüksekse sönük meteorlar görünmez; %50&apos;nin üstünde Ay ışığı sayıyı yarıya ya da daha azına indirebilir. Çoğu
        yağmurda en iyi saatler gece yarısından sonra, sabaha karşıdır.
      </p>

      <h2 id="tutulma">Tutulmalar ve süper ay</h2>
      <p>
        {nextEclipse ? (
          <>
            Önümüzdeki 13 aydaki ilk tutulma: <strong>{dayFmt.format(nextEclipse.at)}</strong>, {nextEclipse.title.toLowerCase()}. {nextEclipse.detail}{" "}
          </>
        ) : null}
        {nextSolarTr ? (
          <>
            Türkiye&apos;den görülecek bir sonraki güneş tutulması <strong>{dayFmt.format(new Date(nextSolarTr.peak))}</strong> tarihinde; Güneş diskinin
            İzmir&apos;de yaklaşık %{nextSolarTr.obscuration.izmir}, İstanbul&apos;da %{nextSolarTr.obscuration.istanbul} kadarı örtülecek.{" "}
          </>
        ) : null}
        {supermoon ? (
          <>
            Takvimdeki süper ay {dayFmt.format(supermoon.at)} tarihinde ({supermoon.detail.replace("Ay'ın Dünya'ya uzaklığı ", "").replace(/\.$/, "")}).{" "}
          </>
        ) : null}
        2035&apos;e kadar tüm tutulmalar ve her yılın dolunay uzaklıkları <Link href="/ay-evreleri">ay evreleri</Link> sayfasında yer alır.
      </p>

      <h2 id="gezegen">Gezegen olayları ne anlama gelir?</h2>
      <p>
        <strong>Karşı konum:</strong> Mars, Jüpiter ya da Satürn Güneş&apos;in tam karşısına geldiğinde gün batımında doğar, gece yarısı en yüksekte olur
        ve sabaha kadar görülür. Gezegen o sırada Dünya&apos;ya en yakın konumuna da yakındır, bu yüzden yılın en parlak hâlindedir.
      </p>
      <p>
        <strong>En büyük uzanım:</strong> Merkür ve Venüs Güneş&apos;e Dünya&apos;dan daha yakın oldukları için gökyüzünde Güneş&apos;ten hiçbir zaman çok
        uzaklaşmaz. Güneş&apos;e açısal uzaklıklarının en büyük olduğu gün (doğu uzanımı akşam, batı uzanımı sabah) onları görmek için en uygun
        dönemdir. Merkür bu dönemde bile ufka yakın ve yalnızca birkaç gün görülebilir.
      </p>
      <p>
        <strong>Yakınlaşma:</strong> İki cisim gökyüzünde birkaç derece yakın göründüğünde (bir derece, kol mesafesinde tutulan serçe parmağının
        genişliği kadardır) yakınlaşma olur. Takvimde Ay–gezegen yakınlaşmaları 3°&apos;den, gezegen–gezegen yakınlaşmaları 2°&apos;den yakın olanlarla
        sınırlıdır ve yalnızca Türkiye&apos;den karanlıkta ya da alacakaranlıkta görülebilenler listelenir. O gece gezegenlerin saatleri için{" "}
        <Link href="/bu-gece-gezegenler">bu gece gezegenler</Link> aracını kullanabilirsiniz.
      </p>

      <h2 id="yontem">Hesaplama yöntemi</h2>
      <p>
        Gezegen, Ay ve Güneş konumları NASA JPL verileriyle doğrulanmış açık kaynaklı astronomy-engine kütüphanesiyle hesaplanır; ekinoks ve gündönümü
        anları, dolunaylar ve karşı konum tarihleri yayımlanmış almanaklarla dakikalar içinde örtüşür. Meteor yağmurlarının zirve konumu (Güneş
        boylamı), ZHR değeri ve etkin dönemi Uluslararası Meteor Örgütü&apos;nün (IMO) görsel meteor yağmurları çalışma listesinden alınmıştır; zirve
        anı her yıl birkaç saat oynayabileceği için tabloda zirvenin düştüğü gece verilir. Görünürlük ve yön bilgisi Ankara içindir; Türkiye&apos;nin
        başka yerlerinde saatler birkaç dakika ile bir saat arasında değişebilir.
      </p>
    </TimeToolPage>
  );
}
