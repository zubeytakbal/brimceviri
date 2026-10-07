import Link from "@/app/components/SiteLink";
import type { FaqItem } from "../../converter/faqSchema";
import { moonPhasesBetween, moonState, phaseName, type PhaseKind, type PhaseName } from "../../converter/time/moon";
import TimeToolPage from "../time/TimeToolPage";
import LiveMoon, { type LiveMoonCopy } from "./LiveMoon";
import MoonIcon from "./MoonIcon";

// Ay evreleri ve dolunay takvimi (TR: Turkiye saati, EN: UTC). Sunucuda Meeus
// algoritmasiyla hesaplanir, gunluk yenilenir.

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

const KIND_FRACTION: Record<PhaseKind, number> = { new: 0, first: 0.25, full: 0.5, last: 0.75 };

// Geleneksel (Kuzey Amerika) dolunay adlari, takvim ayina gore.
const FULL_MOON_NAMES_EN = ["Wolf Moon", "Snow Moon", "Worm Moon", "Pink Moon", "Flower Moon", "Strawberry Moon", "Buck Moon", "Sturgeon Moon", "Harvest Moon", "Hunter's Moon", "Beaver Moon", "Cold Moon"];

export default function MoonPhasesPage({ lang }: { lang: "tr" | "en" }) {
  const tr = lang === "tr";
  const timeZone = tr ? "Europe/Istanbul" : "UTC";
  const locale = tr ? "tr-TR" : "en-US";
  const now = new Date();
  const state = moonState(now);
  const events = moonPhasesBetween(new Date(now.getTime() - 86400000), new Date(now.getTime() + 400 * 86400000));
  const fulls = events.filter((e) => e.kind === "full" && e.date > now).slice(0, 12);
  const nextNew = events.find((e) => e.kind === "new" && e.date > now);
  const nextFull = fulls.find((e) => e.date > now);
  const fmt = (date: Date, opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(locale, { timeZone, ...opts }).format(date);
  const dateTime = (date: Date) => fmt(date, { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });

  // Bu ayin takvimi: her gun yerel 12:00'deki evre.
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit" }).formatToParts(now);
  const year = Number(parts.find((p) => p.type === "year")!.value);
  const month = Number(parts.find((p) => p.type === "month")!.value);
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const offsetHours = tr ? 3 : 0;
  const firstWeekday = (new Date(Date.UTC(year, month - 1, 1)).getUTCDay() + 6) % 7;
  const monthKey = fmt(new Date(Date.UTC(year, month - 1, 15)), { year: "numeric", month: "numeric" });
  const monthEvents = moonPhasesBetween(new Date(Date.UTC(year, month - 1, 1) - 2 * 86400000), new Date(Date.UTC(year, month, 1) + 2 * 86400000)).filter(
    (e) => fmt(e.date, { year: "numeric", month: "numeric" }) === monthKey
  );
  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const noon = new Date(Date.UTC(year, month - 1, i + 1, 12 - offsetHours));
    const s = moonState(noon);
    const main = monthEvents.find((e) => Number(fmt(e.date, { day: "numeric" })) === i + 1);
    return { day: i + 1, fraction: s.fraction, main };
  });
  const monthTitle = fmt(new Date(Date.UTC(year, month - 1, 15)), { month: "long", year: "numeric" });
  const weekdays = tr ? ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"] : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const currentName = NAMES[lang][phaseName(state.age)];

  const faqItems: FaqItem[] = tr
    ? [
        { question: "Dolunay ne zaman?", answer: nextFull ? `Bir sonraki dolunay ${dateTime(nextFull.date)} (Türkiye saati).` : "" },
        { question: "Bugün ay hangi evrede?", answer: `Bu sayfanın son güncellendiği anda Ay "${currentName}" evresindeydi; aydınlanma %${Math.round(state.illumination * 100)}. Sayfanın üstündeki canlı gösterge her saniye güncellenir.` },
        { question: "Yeni ay ne zaman?", answer: nextNew ? `Bir sonraki yeni ay ${dateTime(nextNew.date)} (Türkiye saati). Hilal genellikle yeni aydan 1-2 gün sonra akşam batı ufkunda görülür.` : "" },
        { question: "Ay döngüsü kaç gün sürer?", answer: "Bir yeni aydan diğerine ortalama 29,53 gün geçer (sinodik ay). Ay'ın yörüngesi eliptik olduğu için tek tek döngüler 29,2 ile 29,9 gün arasında değişebilir." },
        { question: "Ay neden evre değiştirir?", answer: "Ay kendi ışığını üretmez; Güneş ışığını yansıtır. Dünya etrafında dönerken Güneş'le yaptığı açı değiştikçe aydınlık yüzünün ne kadarını gördüğümüz de değişir." },
      ]
    : [
        { question: "When is the next full moon?", answer: nextFull ? `The next full moon is on ${dateTime(nextFull.date)} UTC.` : "" },
        { question: "What phase is the moon in today?", answer: `When this page was last updated the Moon was a ${currentName}, ${Math.round(state.illumination * 100)}% illuminated. The live display at the top updates every second.` },
        { question: "When is the next new moon?", answer: nextNew ? `The next new moon is on ${dateTime(nextNew.date)} UTC. The young crescent usually appears in the western evening sky 1–2 days later.` : "" },
        { question: "How long is a lunar cycle?", answer: "On average 29.53 days pass from one new moon to the next (the synodic month); individual cycles range from about 29.2 to 29.9 days." },
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
      title={tr ? "Ay Evreleri ve Dolunay Takvimi" : "Moon Phases & Full Moon Calendar"}
      intro={
        tr
          ? `Ay şu an: ${currentName} (%${Math.round(state.illumination * 100)} aydınlık). ${nextFull ? `Sonraki dolunay ${fmt(nextFull.date, { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })}.` : ""} Tüm saatler Türkiye saatidir.`
          : `The Moon now: ${currentName} (${Math.round(state.illumination * 100)}% illuminated). ${nextFull ? `Next full moon: ${fmt(nextFull.date, { month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })} UTC.` : ""}`
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
        { id: "takvim", label: tr ? `${monthTitle} ay takvimi` : `${monthTitle} moon calendar` },
        { id: "dolunaylar", label: tr ? "Önümüzdeki dolunaylar" : "Upcoming full moons" },
        { id: "evreler", label: tr ? "Tüm ay evreleri" : "All moon phases" },
        { id: "nedir", label: tr ? "Ay evreleri nelerdir?" : "The eight phases" },
        { id: "faq", label: tr ? "Sık sorulan sorular" : "FAQ" },
      ]}
      faqTitle={tr ? "Sık Sorulan Sorular" : "Frequently Asked Questions"}
      faqItems={faqItems}
    >
      <h2 id="takvim">{tr ? `${monthTitle} ay takvimi` : `${monthTitle} moon calendar`}</h2>
      <div className="moon-calendar">
        {weekdays.map((w) => (
          <span key={w} className="moon-calendar-head">
            {w}
          </span>
        ))}
        {Array.from({ length: firstWeekday }, (_, i) => (
          <span key={`e${i}`} />
        ))}
        {days.map((d) => (
          <span key={d.day} className={`moon-calendar-day${d.main ? " is-main" : ""}`}>
            <b>{d.day}</b>
            <MoonIcon fraction={d.main ? KIND_FRACTION[d.main.kind] : d.fraction} size={30} />
            {d.main && <small>{KIND_NAMES[lang][d.main.kind]}</small>}
          </span>
        ))}
      </div>

      <h2 id="dolunaylar">{tr ? "Önümüzdeki dolunaylar" : "Upcoming full moons"}</h2>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>{tr ? "Tarih ve saat (TSİ)" : "Date and time (UTC)"}</th>
              {!tr && <th>Name</th>}
            </tr>
          </thead>
          <tbody>
            {fulls.map((e) => (
              <tr key={e.date.toISOString()}>
                <td>{dateTime(e.date)}</td>
                {!tr && <td>{FULL_MOON_NAMES_EN[Number(fmt(e.date, { month: "numeric" })) - 1]}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="evreler">{tr ? "Tüm ay evreleri (önümüzdeki 3 ay)" : "All moon phases (next 3 months)"}</h2>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>{tr ? "Evre" : "Phase"}</th>
              <th>{tr ? "Tarih ve saat" : "Date and time"}</th>
            </tr>
          </thead>
          <tbody>
            {events
              .filter((e) => e.date > now && e.date.getTime() < now.getTime() + 92 * 86400000)
              .map((e) => (
                <tr key={e.date.toISOString()}>
                  <td>
                    <span className="moon-phase-cell">
                      <MoonIcon fraction={KIND_FRACTION[e.kind]} size={22} /> {KIND_NAMES[lang][e.kind]}
                    </span>
                  </td>
                  <td>{dateTime(e.date)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <h2 id="nedir">{tr ? "Ay evreleri nelerdir?" : "The eight phases"}</h2>
      {tr ? (
        <>
          <p>
            Ay yaklaşık 29,5 günde sekiz evreden geçer: <strong>yeni ay</strong> (görünmez), <strong>büyüyen hilal</strong>,{" "}
            <strong>ilk dördün</strong> (yarım ay, sağ tarafı aydınlık), <strong>büyüyen şişkin ay</strong>, <strong>dolunay</strong>,{" "}
            <strong>küçülen şişkin ay</strong>, <strong>son dördün</strong> (sol tarafı aydınlık) ve <strong>küçülen hilal</strong>. Dört
            ana evre (yeni ay, ilk dördün, dolunay, son dördün) belirli bir anda gerçekleşir; aradaki evreler birkaç gün sürer.
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
