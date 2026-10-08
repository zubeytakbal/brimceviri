import Link from "@/app/components/SiteLink";
import MoonCalendarTools from "./MoonCalendarTools";
import MoonRiseSet, { type MoonPlace } from "./MoonRiseSet";
import { turkeyProvinces } from "../../converter/geo/turkeyProvinces";
import { regionNames, worldCities, worldRegions } from "../../converter/time/worldCities";
import type { FaqItem } from "../../converter/faqSchema";
import { moonState, type PhaseKind, type PhaseName } from "../../converter/time/moon";
import TimeToolPage from "../time/TimeToolPage";
import LiveMoon, { type LiveMoonCopy } from "./LiveMoon";
import MoonIcon from "./MoonIcon";

// Ay evreleri ve dolunay takvimi (TR: Turkiye saati, EN: UTC). Meeus algoritmasiyla
// hesaplanir; tarihe bagli bolumler tarayicida ziyaretcinin saatiyle yenilenir.

const NAMES: Record<"tr" | "en", Record<PhaseName, string>> = {
  tr: {
    new: "Yeni ay",
    "waxing-crescent": "Büyüyen hilal",
    first: "İlk dördün",
    "waxing-gibbous": "Büyüyen şişkin ay",
    full: "Dolunay",
    "waning-gibbous": "Küçülen şişkin ay",
    last: "Son dördün",
    "waning-crescent": "Küçülen hilal",
  },
  en: {
    new: "New Moon",
    "waxing-crescent": "Waxing Crescent",
    first: "First Quarter",
    "waxing-gibbous": "Waxing Gibbous",
    full: "Full Moon",
    "waning-gibbous": "Waning Gibbous",
    last: "Third Quarter",
    "waning-crescent": "Waning Crescent",
  },
};

const KIND_NAMES: Record<"tr" | "en", Record<PhaseKind, string>> = {
  tr: { new: "Yeni ay", first: "İlk dördün", full: "Dolunay", last: "Son dördün" },
  en: { new: "New Moon", first: "First Quarter", full: "Full Moon", last: "Third Quarter" },
};

// Sekiz evre: ay yasi araligi (phaseName ile ayni sinirlar), Turkiye'den gorunus ve gokyuzunde
// gorulme zamani. Dogus/batis saatleri evreye gore yaklasiktir (Gunes'e gore konum).
const PHASE_GUIDE_TR: Array<{ id: PhaseName; fraction: number; ages: string; look: string; when: string }> = [
  { id: "new", fraction: 0, ages: "0–1 ve 28,5–29,5", look: "Görünmez; aydınlık yüzü Güneş'e dönüktür.", when: "Güneş'le birlikte doğar ve batar; gökyüzünde fark edilmez." },
  { id: "waxing-crescent", fraction: 0.1, ages: "1–6,4", look: "Sağ kenarda ince, büyüyen bir hilal.", when: "Gün batımından sonra akşam batı ufkunda, birkaç saat görülür." },
  { id: "first", fraction: 0.25, ages: "6,4–8,4", look: "Yarım ay; sağ yarısı aydınlık.", when: "Öğlen civarı doğar, gece yarısı civarı batar; akşamları en iyi görülür." },
  { id: "waxing-gibbous", fraction: 0.4, ages: "8,4–13,8", look: "Yarıdan fazlası aydınlık, sağdan dolmaya devam eder.", when: "Öğleden sonra doğar; akşamdan gece yarısını geçene kadar görülür." },
  { id: "full", fraction: 0.5, ages: "13,8–15,8", look: "Tamamen aydınlık, yuvarlak disk.", when: "Gün batımında doğar, gün doğumunda batar; bütün gece gökyüzündedir." },
  { id: "waning-gibbous", fraction: 0.6, ages: "15,8–21,2", look: "Sağ taraftan kararmaya başlar, solu aydınlık kalır.", when: "Akşam geç saatte doğar; gecenin ikinci yarısında ve sabah görülür." },
  { id: "last", fraction: 0.75, ages: "21,2–23,2", look: "Yarım ay; sol yarısı aydınlık.", when: "Gece yarısı civarı doğar, öğlen civarı batar; sabah gökyüzünde görülür." },
  { id: "waning-crescent", fraction: 0.9, ages: "23,2–28,5", look: "Sol kenarda incelen bir hilal.", when: "Gün doğumundan önce doğu ufkunda, sabaha karşı görülür." },
];

function moonPlaces(lang: "tr" | "en"): MoonPlace[] {
  const tr = lang === "tr";
  const provinces = [...turkeyProvinces]
    .sort((a, b) => a.name.localeCompare(b.name, "tr"))
    .map((p) => ({ id: p.id, label: p.name, group: tr ? "Türkiye (81 il)" : "Türkiye (81 provinces)", lat: p.lat, lon: p.lon, timeZone: "Europe/Istanbul" }));
  const world = worldRegions
    .filter((r) => r !== "turkey")
    .flatMap((r) =>
      worldCities
        .filter((c) => c.region === r)
        .map((c) => ({
          id: c.en,
          label: tr ? `${c.nameTr} (${c.countryTr})` : `${c.nameEn} (${c.countryEn})`,
          group: regionNames[r][lang],
          lat: c.lat,
          lon: c.lon,
          timeZone: c.timeZone,
        }))
        .sort((a, b) => a.label.localeCompare(b.label, tr ? "tr" : "en")),
    );
  return tr ? [...provinces, ...world] : [...world, ...provinces];
}

export default function MoonPhasesPage({ lang }: { lang: "tr" | "en" }) {
  const tr = lang === "tr";
  const now = new Date();
  const state = moonState(now);
  // Dolunayin %97'den fazla aydinlik gorundugu sure: (1 - cos a) / 2 >= 0.97.
  const nearFullDays = ((Math.PI - Math.acos(1 - 2 * 0.97)) / Math.PI) * 29.530589;

  const faqItems: FaqItem[] = tr
    ? [
        { question: "Bugün ay hangi evrede?", answer: "Sayfanın en üstündeki canlı gösterge Ay'ın şu anki evresini, aydınlanma yüzdesini ve ay yaşını saniye saniye gösterir. Hemen altındaki şeritte dün, yarın ve önümüzdeki günlerin ayı da görülür." },
        { question: "Geçen salı (ya da dün) ay nasıldı?", answer: "\"Son 7 gün ve önümüzdeki 7 gün\" şeridinde her günün akşamki ay görünümü, evre adı ve aydınlanma yüzdesi yer alır. Daha eski bir gün için \"Herhangi bir günde ay nasıldı?\" bölümünden tarihi seçmeniz yeterli." },
        { question: "Ay döngüsü kaç gün sürer?", answer: "Bir yeni aydan diğerine ortalama 29,53 gün geçer (sinodik ay). Ay'ın yörüngesi eliptik olduğu için tek tek döngüler 29,2 ile 29,9 gün arasında değişebilir." },
        { question: "Bir ay evresi kaç gün sürer?", answer: "Yeni ay, ilk dördün, dolunay ve son dördün aslında tek bir anda gerçekleşir; bu sayfada o anın bir gün öncesi ve sonrası aynı adla gösterilir (yaklaşık 2 gün). Aradaki hilal ve şişkin ay evrelerinin her biri yaklaşık 5,4 gün sürer." },
        { question: "Dolunay kaç gün sürer?", answer: `Tam dolunay tek bir andır, ama Ay yaklaşık ${nearFullDays.toLocaleString("tr-TR", { maximumFractionDigits: 1 })} gün boyunca %97'den fazla aydınlık görünür. Bu yüzden dolunaydan bir gün önce ve sonra da gözle dolunay gibi görünür.` },
        { question: "Dolunaydan sonra hangi evre gelir?", answer: "Dolunaydan sonra küçülen şişkin ay, ardından son dördün (sol yarısı aydınlık yarım ay), küçülen hilal ve yeni ay gelir. Sıralama: yeni ay, büyüyen hilal, ilk dördün, büyüyen şişkin ay, dolunay, küçülen şişkin ay, son dördün, küçülen hilal." },
        { question: "Ay bu gece saat kaçta doğacak?", answer: "Ayın doğuş saati şehre göre değişir; örneğin Van'da İstanbul'dan genellikle 50-70 dakika (ortalama 1 saat) önce doğar. \"Ay bugün saat kaçta doğuyor\" bölümünden ilinizi seçtiğinizde bugünün ve önümüzdeki 6 günün doğuş, batış ve en yüksek nokta saatleri görünür." },
        { question: "Ay hangi saatlerde görülür?", answer: "Evreye bağlıdır: dolunay gün batımında doğar ve bütün gece görülür; ilk dördün öğlen doğar, akşamları görülür; son dördün gece yarısı doğar, sabah görülür. Hilal ise ya akşam batı ufkunda ya da sabaha karşı doğu ufkunda kısa süre görünür." },
        { question: "Ay neden evre değiştirir?", answer: "Ay kendi ışığını üretmez; Güneş ışığını yansıtır. Dünya etrafında dönerken Güneş'le yaptığı açı değiştikçe aydınlık yüzünün ne kadarını gördüğümüz de değişir." },
      ]
    : [
        { question: "What phase is the moon in today?", answer: "The live display at the top shows the current phase, illumination and moon age, updated every second. The strip below it shows yesterday, tomorrow and the days around them." },
        { question: "What did the moon look like on a past date?", answer: "Use the date picker under \"What did the Moon look like on any date?\": it shows the phase, illumination and the nearest full and new moons for any day between 1900 and 2100." },
        { question: "How long is a lunar cycle?", answer: "On average 29.53 days pass from one new moon to the next (the synodic month); individual cycles range from about 29.2 to 29.9 days." },
        { question: "How long does a full moon last?", answer: `The exact full moon is an instant, but the Moon stays more than 97% illuminated for about ${nearFullDays.toFixed(1)} days, so it looks full the day before and after as well.` },
      ];

  const copy: LiveMoonCopy = tr
    ? { caption: "Ay şu an", illumination: "Aydınlanma", age: "Ay yaşı", days: "gün", nextFull: "Sonraki dolunay", nextNew: "Sonraki yeni ay", names: NAMES.tr }
    : { caption: "The Moon now", illumination: "Illumination", age: "Moon age", days: "days", nextFull: "Next full moon", nextNew: "Next new moon", names: NAMES.en };

  return (
    <TimeToolPage
      crumbs={[
        { href: tr ? "/" : "/en", label: tr ? "Ana Sayfa" : "Home" },
        { href: tr ? "/ay-evreleri" : "/en/moon-phases", label: tr ? "Ay Evreleri" : "Moon Phases" },
      ]}
      crumbLabel={tr ? "Sayfa yolu" : "Breadcrumb"}
      title={tr ? "Ay Evreleri: Bugün, Dün ve Bu Hafta Ay Nasıl?" : "Moon Phases & Full Moon Calendar"}
      intro={
        tr
          ? "Ay'ın şu anki evresi, son 7 gün ile önümüzdeki 7 günün ay görünümü, istediğiniz bir tarihte ayın nasıl olduğu ve dolunay, yeni ay saatleri. Tüm saatler Türkiye saatidir."
          : "The Moon's current phase, the last and next 7 days, the Moon on any date you choose, and exact full and new moon times in UTC."
      }
      tool={<LiveMoon lang={lang} copy={copy} initialFraction={state.fraction} />}
      related={{
        title: tr ? "İlginizi çekebilir" : "You may also like",
        links: tr
          ? [
              { href: "/tarih-cevirici", label: "Hicri Rumi Tarih Çevirici" },
              { href: "/geri-sayim#ramazan", label: "Ramazan'a kaç gün kaldı?" },
              { href: "/dunya-saatleri", label: "Dünya Saatleri" },
              { href: "/online-saat", label: "Online Saat" },
              { href: "/geri-sayim", label: "Geri Sayım" },
            ]
          : [
              { href: "/en/hijri-date-converter", label: "Hijri Date Converter" },
              { href: "/en/world-clock", label: "World Clock" },
              { href: "/en/countdown", label: "Countdown" },
              { href: "/en/online-clock", label: "Online Clock" },
            ],
      }}
      tocTitle={tr ? "İçindekiler" : "Contents"}
      tocItems={[
        { id: "hafta", label: tr ? "Son 7 gün ve önümüzdeki 7 gün" : "Last and next 7 days" },
        { id: "dogus", label: tr ? "Ay doğuş ve batış saatleri" : "Moonrise and moonset" },
        { id: "tarih", label: tr ? "Herhangi bir günde ay" : "The Moon on any date" },
        { id: "takvim", label: tr ? "Aylık ay takvimi" : "Monthly moon calendar" },
        { id: "dolunaylar", label: tr ? "Önümüzdeki dolunaylar" : "Upcoming full moons" },
        { id: "evreler", label: tr ? "Tüm ay evreleri" : "All moon phases" },
        { id: "nedir", label: tr ? "Ay evreleri nelerdir?" : "The eight phases" },
        { id: "faq", label: tr ? "Sık sorulan sorular" : "FAQ" },
      ]}
      faqTitle={tr ? "Sık Sorulan Sorular" : "Frequently Asked Questions"}
      faqItems={faqItems}
    >
      <MoonCalendarTools
        lang={lang}
        initialNow={now.getTime()}
        names={NAMES[lang]}
        kindNames={KIND_NAMES[lang]}
        riseSet={
          <>
            <h2 id="dogus">{tr ? "Ay bugün saat kaçta doğuyor, kaçta batıyor?" : "Moonrise and moonset times"}</h2>
            <p>
              {tr
                ? "Şehrinizi seçin ya da konumunuzu kullanın: bugün ve önümüzdeki 6 gün için ayın doğuş, batış ve gökyüzünde en yüksek olduğu saatler ile Ay'ın şu anki yönü görünür. Türkiye'nin 81 ili ve dünyanın büyük şehirleri listededir."
                : "Choose a city or use your location to see moonrise, moonset and the Moon's highest point for today and the next 6 days, plus where the Moon is right now."}
            </p>
            <MoonRiseSet lang={lang} places={moonPlaces(lang)} defaultId={tr ? "istanbul" : "london"} initialNow={now.getTime()} />
          </>
        }
      />

      <h2 id="nedir">{tr ? "Ay evreleri nelerdir?" : "The eight phases"}</h2>
      {tr ? (
        <>
          <p>
            Ay yaklaşık 29,5 günde sekiz evreden geçer. Dört ana evre (yeni ay, ilk dördün, dolunay, son dördün) belirli bir anda
            gerçekleşir; aradaki hilal ve şişkin ay evreleri birkaç gün sürer. Aşağıdaki tablo her evrenin hangi ay yaşı aralığına
            denk geldiğini, Türkiye&apos;den (kuzey yarımküre) nasıl göründüğünü ve gökyüzünde ne zaman aranacağını özetler.
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Evre</th>
                  <th>Ay yaşı (gün)</th>
                  <th>Görünüş</th>
                  <th>Ne zaman görülür?</th>
                </tr>
              </thead>
              <tbody>
                {PHASE_GUIDE_TR.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <span className="moon-phase-cell">
                        <MoonIcon fraction={p.fraction} size={22} /> {NAMES.tr[p.id]}
                      </span>
                    </td>
                    <td>{p.ages}</td>
                    <td>{p.look}</td>
                    <td>{p.when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Kolay hatırlama yolu: Türkiye&apos;den bakıldığında ay <strong>sağdan dolar, sağdan boşalır</strong>. Sağ tarafı aydınlıksa
            büyüyor (dolunaya gidiyor), sol tarafı aydınlıksa küçülüyordur (yeni aya gidiyor). Güney yarımkürede bu görünüm tersine döner.
          </p>
          <p>
            Hicri takvimde aylar hilalin görülmesiyle başlar; Ramazan ve bayram tarihleri bu yüzden Ay&apos;a bağlıdır. Tarih çevirmek için{" "}
            <Link href="/tarih-cevirici">Hicri tarih çeviricisine</Link> bakabilirsin.
          </p>
        </>
      ) : (
        <p>
          Over about 29.5 days the Moon passes through eight phases: new moon, waxing crescent, first quarter, waxing gibbous, full
          moon, waning gibbous, third quarter and waning crescent. The four principal phases happen at a precise instant; the phases
          in between last several days. Times on this page are computed with Jean Meeus&apos;s lunar algorithms and are accurate to
          about a minute.
        </p>
      )}
    </TimeToolPage>
  );
}
