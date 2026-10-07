import Link from "@/app/components/SiteLink";
import type { FaqItem } from "../../converter/faqSchema";
import type { YMD } from "../../converter/time/calendars";
import { addDaysYmd, diffDays, formatYmd, formatYmdParts, isWeekend, ymdKey } from "../../converter/time/dateMath";
import {
  bridgePlans,
  DIYANET_VERIFIED_UNTIL,
  HOLIDAY_YEARS,
  holidaysFor,
  type BridgePlan,
  type Holiday,
  type HolidayLang,
} from "../../converter/time/holidays";
import TimeToolPage from "../time/TimeToolPage";
import HolidayIcsButton from "./HolidayIcsButton";
import IzinPlanlayici from "./IzinPlanlayici";

type Lang = HolidayLang;

export const holidayPaths = {
  hub: { tr: "/resmi-tatiller", en: "/en/federal-holidays" },
  // İngilizce yıl sayfaları yok: yıllar ana sayfadaki tarih tablosunda.
  year: (lang: Lang, year: number) => (lang === "tr" ? `/resmi-tatiller/${year}` : `/en/federal-holidays#y${year}`),
};

/** Tatil gunu -> geri sayim sayfasi */
const COUNTDOWN: Record<string, string> = {
  yilbasi: "/geri-sayim/yilbasi",
  "ramazan-bayrami": "/geri-sayim/ramazan-bayrami",
  "kurban-bayrami": "/geri-sayim/kurban-bayrami",
  "23-nisan": "/geri-sayim/23-nisan",
  "1-mayis": "/geri-sayim/1-mayis",
  "19-mayis": "/geri-sayim/19-mayis",
  "15-temmuz": "/geri-sayim/15-temmuz",
  "30-agustos": "/geri-sayim/30-agustos",
  "29-ekim": "/geri-sayim/29-ekim",
  "new-years-day": "/en/countdown/new-year",
  "independence-day": "/en/countdown/independence-day",
  thanksgiving: "/en/countdown/thanksgiving",
  christmas: "/en/countdown/christmas",
};

export type HolidayGroup = { id: string; name: string; start: YMD; end: YMD; fullDays: number; half?: YMD; items: Holiday[]; estimated?: boolean };

/** Ayni tatilin gunlerini (bayram, arefe) tek satirda toplar. */
export function groupHolidays(list: Holiday[]): HolidayGroup[] {
  const groups: HolidayGroup[] = [];
  for (const h of list) {
    // Ayni gune dusen baska bir tatil (2027: 19 Mayis bayramin 4. gunu) grubu bolmesin.
    const last = groups.slice(-3).reverse().find((g) => g.id === h.id && diffDays(g.end, h.date) <= 1);
    if (last) {
      last.end = h.date;
      last.items.push(h);
      if (h.kind === "full") last.fullDays += 1;
      else last.half = h.date;
      if (h.kind === "full" && h.dayIndex === 1) last.name = h.name.replace(/ 1\. Gün$/, "");
      continue;
    }
    groups.push({
      id: h.id,
      name: h.name.replace(/ \d\. Gün$/, "").replace(/ Arefesi$/, ""),
      start: h.date,
      end: h.date,
      fullDays: h.kind === "full" ? 1 : 0,
      ...(h.kind === "half" ? { half: h.date } : {}),
      items: [h],
      ...(h.estimated ? { estimated: true } : {}),
    });
  }
  return groups;
}

function todayIn(lang: Lang): YMD {
  // TR: Turkiye saati (UTC+3); EN: ABD dogu saati yaklasik (UTC-5).
  const d = new Date(Date.now() + (lang === "tr" ? 3 : -5) * 3600000);
  return { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate() };
}

function short(date: YMD, lang: Lang) {
  return formatYmdParts(date, lang, { day: "numeric", month: "long" });
}

function weekdayName(date: YMD, lang: Lang) {
  return formatYmdParts(date, lang, { weekday: "long" });
}

function rangeText(start: YMD, end: YMD, lang: Lang) {
  if (ymdKey(start) === ymdKey(end)) return short(start, lang);
  if (start.month === end.month) return lang === "tr" ? `${start.day}–${short(end, lang)}` : `${short(start, lang)}–${end.day}`;
  return `${short(start, lang)} – ${short(end, lang)}`;
}

function planText(plan: BridgePlan, lang: Lang) {
  const leave = lang === "tr" ? `${String(plan.leaveCost).replace(".", ",")} gün izinle` : `${plan.leaveCost} day${plan.leaveCost === 1 ? "" : "s"} off`;
  const total = lang === "tr" ? `${plan.totalDays} gün tatil` : `${plan.totalDays}-day break`;
  return { leave, total };
}

/* ------------------------------------------------------------------ */

const T = {
  tr: {
    home: "Ana Sayfa",
    hub: "Resmî Tatiller",
    crumbLabel: "Sayfa yolu",
    date: "Tarih",
    day: "Gün",
    holiday: "Tatil",
    length: "Süre",
    full: "tam gün",
    half: "yarım gün (13:00'ten sonra)",
    weekend: "hafta sonu",
    ics: "Takvime ekle (.ics)",
    countdown: "Geri sayım",
    estimated: "tahmini",
    calendarTitle: "Yıllık tatil takvimi",
    legendHoliday: "Resmî tatil",
    legendHalf: "Yarım gün",
    legendBridge: "Önerilen köprü izni",
    legendWeekend: "Hafta sonu",
    bridgeTitle: "Köprü günleri ve izin planı",
    faq: "Sık Sorulan Sorular",
    toc: "İçindekiler",
    related: "İlginizi çekebilir",
    weekdayHeads: ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"],
  },
  en: {
    home: "Home",
    hub: "Federal Holidays",
    crumbLabel: "Breadcrumb",
    date: "Date",
    day: "Day",
    holiday: "Holiday",
    length: "Note",
    full: "day off",
    half: "half day",
    weekend: "weekend",
    ics: "Add to calendar (.ics)",
    countdown: "Countdown",
    estimated: "estimated",
    calendarTitle: "Year-at-a-glance calendar",
    legendHoliday: "Federal holiday",
    legendHalf: "Half day",
    legendBridge: "Suggested day off",
    legendWeekend: "Weekend",
    bridgeTitle: "Long weekends and PTO planner",
    faq: "Frequently Asked Questions",
    toc: "On this page",
    related: "You may also like",
    weekdayHeads: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  },
};

const RELATED = {
  tr: [
    { href: "/takvim", label: "Türkiye Takvimi" },
    { href: "/ozel-gunler", label: "Özel Günler ve Tarihleri" },
    { href: "/is-gunu-hesaplama", label: "İş Günü Hesaplama" },
    { href: "/iki-tarih-arasi-gun-hesaplama", label: "İki Tarih Arası Gün Hesaplama" },
    { href: "/tarihe-gun-ekleme", label: "Tarihe Gün Ekleme" },
    { href: "/kacinci-hafta", label: "Bugün Kaçıncı Hafta?" },
    { href: "/geri-sayim", label: "Bayrama Kaç Gün Kaldı?" },
    { href: "/tarih-cevirici", label: "Hicri Tarih Çevirici" },
    { href: "/ay-evreleri", label: "Ay Evreleri" },
  ],
  en: [
    { href: "/en/business-day-calculator", label: "Business Day Calculator" },
    { href: "/en/days-between-dates", label: "Days Between Dates" },
    { href: "/en/date-calculator", label: "Date Calculator" },
    { href: "/en/week-number", label: "What Week Is It?" },
    { href: "/en/countdown", label: "Countdown to Holidays" },
    { href: "/en/world-clock", label: "World Clock" },
  ],
};

function HolidayTable({ list, lang }: { list: Holiday[]; lang: Lang }) {
  const t = T[lang];
  return (
    <div className="holiday-table-wrap">
      <table className="holiday-table">
        <thead>
          <tr>
            <th scope="col">{t.date}</th>
            <th scope="col">{t.day}</th>
            <th scope="col">{t.holiday}</th>
            <th scope="col">{t.length}</th>
          </tr>
        </thead>
        <tbody>
          {list.map((h) => {
            const weekend = isWeekend(h.date);
            const link = COUNTDOWN[h.id];
            return (
              <tr key={`${ymdKey(h.date)}-${h.name}`} className={`${h.kind === "half" ? "is-half" : ""}${weekend ? " is-weekend" : ""}`}>
                <td>
                  <time dateTime={ymdKey(h.date)}>{short(h.date, lang)}</time>
                </td>
                <td>{weekdayName(h.date, lang)}</td>
                <td>
                  {link && (h.dayIndex === undefined || h.dayIndex === 1) ? (
                    <Link href={link} prefetch={false}>
                      {h.name}
                    </Link>
                  ) : (
                    h.name
                  )}
                  {h.observedFor ? (
                    <small>
                      {" "}
                      (observed; actual date {formatYmdParts(h.observedFor, "en", { weekday: "long", month: "long", day: "numeric" })})
                    </small>
                  ) : null}
                  {h.estimated ? <small> ({t.estimated})</small> : null}
                </td>
                <td>
                  <span className={`holiday-badge${h.kind === "half" ? " is-half" : ""}${weekend ? " is-weekend" : ""}`}>
                    {weekend ? t.weekend : h.kind === "half" ? t.half : t.full}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function BridgeList({ plans, lang }: { plans: BridgePlan[]; lang: Lang }) {
  if (!plans.length) return null;
  return (
    <ul className="bridge-list">
      {plans.map((plan) => {
        const { leave, total } = planText(plan, lang);
        return (
          <li key={`${ymdKey(plan.start)}-${plan.leaveDays.length}`} className={plan.leaveCost <= 1.5 ? "is-best" : undefined}>
            <div className="bridge-head">
              <strong>{total}</strong>
              <span>{leave}</span>
            </div>
            <p>
              {rangeText(plan.start, plan.end, lang)}
              <br />
              <small>
                {lang === "tr" ? "İzin: " : "Take off: "}
                {plan.leaveDays.map((d) => `${short(d, lang)} ${formatYmdParts(d, lang, { weekday: "short" })}`).join(", ")}
              </small>
            </p>
          </li>
        );
      })}
    </ul>
  );
}

function YearNav({ lang, current }: { lang: Lang; current?: number }) {
  return (
    <nav className="holiday-years" aria-label={lang === "tr" ? "Yıllar" : "Years"}>
      {HOLIDAY_YEARS.map((y) =>
        y === current ? (
          <span key={y} aria-current="page">
            {y}
          </span>
        ) : (
          <Link key={y} href={holidayPaths.year(lang, y)} prefetch={false}>
            {y}
          </Link>
        )
      )}
    </nav>
  );
}

function summary(list: Holiday[]) {
  const full = list.filter((h) => h.kind === "full");
  const weekendFull = full.filter((h) => isWeekend(h.date));
  const halfWeekday = list.filter((h) => h.kind === "half" && !isWeekend(h.date));
  return { full: full.length, weekendFull: weekendFull.length, weekdayFull: full.length - weekendFull.length, halfWeekday: halfWeekday.length };
}

function NextHoliday({ lang }: { lang: Lang }) {
  const today = todayIn(lang);
  const upcoming = groupHolidays([...holidaysFor(lang, today.year), ...holidaysFor(lang, today.year + 1)]).find((g) => diffDays(today, g.end) >= 0);
  if (!upcoming) return null;
  const firstFull = upcoming.items.find((h) => h.kind === "full") ?? upcoming.items[0];
  const days = diffDays(today, firstFull.date);
  const link = COUNTDOWN[upcoming.id];
  return (
    <div className="holiday-next">
      <span>{lang === "tr" ? "Sıradaki resmî tatil" : "Next federal holiday"}</span>
      <strong>{upcoming.name}</strong>
      <em>
        {formatYmd(firstFull.date, lang)} ·{" "}
        {days <= 0
          ? lang === "tr"
            ? "bugün"
            : "today"
          : lang === "tr"
            ? `${days} gün kaldı`
            : `in ${days} day${days === 1 ? "" : "s"}`}
      </em>
      {link ? (
        <Link href={link} prefetch={false}>
          {lang === "tr" ? "Canlı geri sayım →" : "Live countdown →"}
        </Link>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Yil sayfasi                                                          */
/* ------------------------------------------------------------------ */

export function holidayYearMeta(lang: Lang, year: number) {
  const list = holidaysFor(lang, year);
  if (lang === "tr") {
    const groups = groupHolidays(list);
    const rb = groups.find((g) => g.id === "ramazan-bayrami");
    const kb = groups.find((g) => g.id === "kurban-bayrami");
    return {
      title: `${year} Resmî Tatilleri ve Köprü Günleri Listesi`,
      description: `${year} resmî tatil günleri: Ramazan Bayramı ${rb ? rangeText(rb.items.find((h) => h.kind === "full")!.date, rb.end, "tr") : ""}, Kurban Bayramı ${kb ? rangeText(kb.items.find((h) => h.kind === "full")!.date, kb.end, "tr") : ""}. Arefe yarım günleri, köprü günleri, izin planı ve takvime ekleme.`,
    };
  }
  return {
    title: `US Federal Holidays ${year}: Dates and Long Weekends`,
    description: `All 11 US federal holidays in ${year} with observed dates, a year calendar, long-weekend PTO ideas and a downloadable .ics calendar.`,
  };
}

export function HolidayYearPage({ lang, year }: { lang: Lang; year: number }) {
  const t = T[lang];
  const list = holidaysFor(lang, year);
  const plans = bridgePlans(lang, year);
  const groups = groupHolidays(list);
  const s = summary(list);
  const tr = lang === "tr";
  const path = holidayPaths.year(lang, year);
  const bestPlans = plans.filter((p) => p.leaveCost <= 1.5);
  const rb = groups.find((g) => g.id === "ramazan-bayrami");
  const kb = groups.find((g) => g.id === "kurban-bayrami");
  const firstFull = (g?: HolidayGroup) => g?.items.find((h) => h.kind === "full")?.date;
  const estimated = tr && year > DIYANET_VERIFIED_UNTIL;
  const shifted = list.filter((h) => h.observedFor);

  const faqItems: FaqItem[] = tr
    ? [
        {
          question: `${year} yılında kaç gün resmî tatil var?`,
          answer: `${year} yılında ${s.full} tam gün ve ${list.filter((h) => h.kind === "half").length} yarım gün resmî tatil vardır. Tam günlerin ${s.weekendFull} tanesi hafta sonuna denk geldiği için hafta içinde çalışılmayan resmî tatil günü sayısı ${s.weekdayFull}'dir${s.halfWeekday ? `; buna ${s.halfWeekday} yarım gün eklenir` : ""}.`,
        },
        ...(rb && firstFull(rb)
          ? [
              {
                question: `${year} Ramazan Bayramı ne zaman?`,
                answer: `${year} Ramazan Bayramı ${formatYmd(firstFull(rb)!, "tr")} başlar ve ${formatYmd(rb.end, "tr")} günü sona erer.${rb.half ? ` Arefe günü ${formatYmd(rb.half, "tr")} olup 13:00'ten itibaren yarım gün tatildir.` : ""}${estimated ? " Tarih, Diyanet takvimi yayımlanana kadar tahminidir." : ""}`,
              },
            ]
          : []),
        ...(kb && firstFull(kb)
          ? [
              {
                question: `${year} Kurban Bayramı ne zaman?`,
                answer: `${year} Kurban Bayramı ${formatYmd(firstFull(kb)!, "tr")} başlar ve dört gün sürerek ${formatYmd(kb.end, "tr")} günü biter.${kb.half ? ` Arefe ${formatYmd(kb.half, "tr")} günüdür.` : ""}${estimated ? " Tarih tahminidir." : ""}`,
              },
            ]
          : []),
        {
          question: `${year} yılında köprü günleri hangileri?`,
          answer: bestPlans.length
            ? `En verimli köprüler: ${bestPlans
                .map((p) => `${p.leaveDays.map((d) => short(d, "tr")).join(" ve ")} (${planText(p, "tr").leave} ${planText(p, "tr").total})`)
                .join("; ")}. Köprü günleri kendiliğinden tatil değildir; kamuda idari izin verilip verilmeyeceği Cumhurbaşkanlığı genelgesiyle ayrıca duyurulur.`
            : `${year} yılında tek günlük izinle uzayan bir tatil yok; daha uzun izin planları yukarıdaki listede.`,
        },
      ]
    : [
        {
          question: `How many federal holidays are there in ${year}?`,
          answer: `There are 11 federal holidays in ${year}${shifted.length ? `; ${shifted.length} of them fall on a weekend and are observed on a nearby weekday` : ""}.`,
        },
        ...shifted.map((h) => ({
          question: `Is ${formatYmdParts(h.date, "en", { month: "long", day: "numeric", year: "numeric" })} a federal holiday?`,
          answer: `Yes. ${h.name} falls on ${formatYmd(h.observedFor!, "en")}, so federal employees get ${formatYmd(h.date, "en")} off instead (the observed holiday).`,
        })),
        {
          question: "What happens when a federal holiday falls on a weekend?",
          answer:
            "Under federal law, a holiday that falls on a Saturday is observed on the preceding Friday, and one that falls on a Sunday is observed on the following Monday. Holidays defined as a Monday or Thursday never fall on a weekend.",
        },
      ];

  return (
    <TimeToolPage
      crumbs={[
        { href: tr ? "/" : "/en", label: t.home },
        { href: holidayPaths.hub[lang], label: t.hub },
        { href: path, label: String(year) },
      ]}
      crumbLabel={t.crumbLabel}
      title={tr ? `${year} Resmî Tatilleri ve Köprü Günleri` : `US Federal Holidays ${year}`}
      intro={
        tr
          ? `${year} yılında Türkiye'de ${s.full} tam gün ve ${list.filter((h) => h.kind === "half").length} yarım gün resmî tatil var; ${s.weekendFull} tanesi hafta sonuna denk geliyor. Aşağıda tüm tarihler, köprü günleri, yıllık takvim ve izin planı yer alıyor.`
          : `The 11 US federal holidays in ${year}, with the day each one is actually observed, a year calendar and the best long weekends to plan your PTO around.`
      }
      tool={
        <div className="holiday-tool">
          <YearNav lang={lang} current={year} />
          <div className="holiday-stats">
            <div>
              <strong>{s.weekdayFull}</strong>
              <span>{tr ? "hafta içi tatil günü" : "weekday holidays"}</span>
            </div>
            {tr && (
              <div>
                <strong>{s.halfWeekday}</strong>
                <span>yarım gün (arefe)</span>
              </div>
            )}
            <div>
              <strong>{tr ? s.weekendFull : shifted.length}</strong>
              <span>{tr ? "hafta sonuna denk gelen" : "moved off a weekend"}</span>
            </div>
            <div>
              <strong>{plans.length ? Math.max(...plans.map((p) => p.totalDays)) : "—"}</strong>
              <span>{tr ? "gün: en uzun köprü tatili" : "days: longest break idea"}</span>
            </div>
          </div>
          {year === todayIn(lang).year ? <NextHoliday lang={lang} /> : null}
          <HolidayTable list={list} lang={lang} />
          {estimated && (
            <p className="date-calc-note">
              Dini bayram tarihleri Umm al-Qura hesabına göredir. Diyanet {year} takvimini yayımladığında ±1 gün fark çıkabilir.
            </p>
          )}
          <div className="holiday-actions">
            <HolidayIcsButton
              items={list.map((h) => ({ date: ymdKey(h.date), name: h.name }))}
              fileName={tr ? `resmi-tatiller-${year}.ics` : `us-federal-holidays-${year}.ics`}
              label={t.ics}
              calendarName={tr ? `Resmî Tatiller ${year}` : `US Federal Holidays ${year}`}
            />
            <Link className="time-tool-button is-secondary" href={tr ? "/is-gunu-hesaplama" : "/en/business-day-calculator"} prefetch={false}>
              {tr ? "İş günü hesapla" : "Count business days"}
            </Link>
          </div>
        </div>
      }
      related={{ title: t.related, links: RELATED[lang] }}
      tocTitle={t.toc}
      tocItems={[
        { id: "kopru", label: t.bridgeTitle },
        ...(tr ? [{ id: "izin-plani", label: "İzin planlayıcı" }] : []),
        { id: "faq", label: t.faq },
      ]}
      faqTitle={t.faq}
      faqItems={faqItems}
    >
      <h2 id="kopru">
        {t.bridgeTitle} ({year})
      </h2>
      {tr ? (
        <p>
          Köprü günü, resmî tatil ile hafta sonu arasında kalan iş günüdür. Bu günlere yıllık izin eklerseniz tatil kesintisiz uzar.
          Aşağıdaki planlar hafta sonları ve resmî tatillerle birleşen izin günlerini gösterir; yarım gün arefeler 0,5 gün izin sayılır.
          Yeşil kartlar en verimli seçeneklerdir.
        </p>
      ) : (
        <p>
          These combinations join federal holidays and weekends with a few days of paid time off (PTO). Green cards give the most days off
          for the fewest vacation days.
        </p>
      )}
      <BridgeList plans={plans} lang={lang} />
      {tr ? (
        <>
          <h2 id="izin-plani">Kaç gün izinle en uzun tatil? ({year})</h2>
          <p>
            Kullanabileceğiniz izin gün sayısını girin; planlayıcı izinleri yıl içinde köprü günlerine dağıtarak toplamda en çok tatil gününü veren
            planı bulur.
          </p>
          <IzinPlanlayici year={year} />
        </>
      ) : null}

      <p id="takvim">
        {tr ? (
          <>
            Tatillerin işaretli olduğu {year} yılı takvimi: <Link href={`/takvim/${year}`}>{year} takvimi</Link>.
          </>
        ) : null}
      </p>

      <p>
        {tr ? (
          <>
            {rb && firstFull(rb) ? `${year} yılında Ramazan Bayramı ${rangeText(firstFull(rb)!, rb.end, "tr")}. ` : ""}
            {kb && firstFull(kb) ? `Kurban Bayramı ${rangeText(firstFull(kb)!, kb.end, "tr")}. ` : ""}
            Tatil kuralları, arefe ve hafta sonu uygulaması için <Link href={holidayPaths.hub[lang]}>resmî tatiller</Link> sayfasına bakın.
          </>
        ) : (
          <>
            Rules for weekend holidays, banks and markets: <Link href={holidayPaths.hub[lang]}>US federal holidays</Link>.
          </>
        )}
      </p>
      <YearNav lang={lang} current={year} />
    </TimeToolPage>
  );
}

/* ------------------------------------------------------------------ */
/* Hub                                                                  */
/* ------------------------------------------------------------------ */

export function holidayHubMeta(lang: Lang) {
  const y = todayIn(lang).year;
  return lang === "tr"
    ? {
        title: `Resmî Tatiller ${y}-${y + 1}: Tatil Günleri ve Bayram Tarihleri`,
        description: `Türkiye resmî tatil günleri: yaklaşan tatiller, ${y} ve ${y + 1} bayram tarihleri, arefe yarım günleri, köprü günleri ve 2030'a kadar Ramazan ve Kurban Bayramı tablosu.`,
      }
    : {
        title: `US Federal Holidays ${y} & ${y + 1}: Upcoming Holidays List`,
        description: `Upcoming US federal holidays with observed dates, days until each one, and full ${y}–2030 holiday calendars with long-weekend ideas.`,
      };
}

export function HolidayHubPage({ lang }: { lang: Lang }) {
  const t = T[lang];
  const tr = lang === "tr";
  const today = todayIn(lang);
  const horizon = addDaysYmd(today, 366);
  const upcoming = groupHolidays([...holidaysFor(lang, today.year), ...holidaysFor(lang, today.year + 1)]).filter(
    (g) => diffDays(today, g.end) >= 0 && diffDays(g.start, horizon) >= 0
  );
  const bayramTable = tr
    ? HOLIDAY_YEARS.map((y) => {
        const groups = groupHolidays(holidaysFor("tr", y));
        const pick = (id: string) => groups.filter((g) => g.id === id);
        return { year: y, rb: pick("ramazan-bayrami"), kb: pick("kurban-bayrami") };
      })
    : [];

  const faqItems: FaqItem[] = tr
    ? [
        {
          question: "Türkiye'de yılda kaç gün resmî tatil var?",
          answer:
            "Sabit tarihli 7 tam gün (1 Ocak, 23 Nisan, 1 Mayıs, 19 Mayıs, 15 Temmuz, 30 Ağustos, 29 Ekim), 3 gün Ramazan Bayramı ve 4 gün Kurban Bayramı ile toplam 14 tam gün resmî tatil vardır. Buna iki bayram arefesi ve 28 Ekim olmak üzere 3 yarım gün eklenir. Bazıları hafta sonuna denk geldiği için hafta içi tatil sayısı yıldan yıla değişir.",
        },
        {
          question: "Resmî tatil ile genel tatil arasındaki fark nedir?",
          answer:
            "2429 sayılı Kanun'a göre 29 Ekim ulusal bayramdır; diğer günler (yılbaşı, 23 Nisan, 1 Mayıs, 19 Mayıs, 15 Temmuz, 30 Ağustos ve dini bayramlar) genel tatildir. Günlük dilde hepsine resmî tatil denir; iş hukukundaki ücret kuralları ikisi için aynıdır.",
        },
        {
          question: "Bayram tarihleri neden her yıl değişir?",
          answer:
            "Ramazan ve Kurban Bayramı Hicri takvime göre kutlanır. Hicri yıl yaklaşık 354 gün olduğu için bayramlar miladi takvimde her yıl 10-11 gün öne gelir ve yaklaşık 33 yılda bütün mevsimleri dolaşır.",
        },
        {
          question: "Köprü günü resmî tatil mi?",
          answer:
            "Hayır. Köprü günü, tatille hafta sonu arasında kalan normal iş günüdür. Kamu çalışanlarına bazı yıllarda idari izin verilir; bu karar her seferinde ayrıca açıklanır. Özel sektörde yıllık izin kullanmak gerekir.",
        },
        {
          question: "Arefe günü tatil mi?",
          answer:
            "Ramazan ve Kurban Bayramı arefeleri ile 28 Ekim, 2429 sayılı Kanun'a göre saat 13:00'ten itibaren yarım gün resmî tatildir. Kamu kurumları öğleden sonra kapanır; özel sektörde uygulama iş sözleşmesine ve işverene göre değişir. Hafta sonuna denk gelen resmî tatil için hafta içinde telafi tatili verilmez.",
        },
      ]
    : [
        {
          question: "How many federal holidays are there in the US?",
          answer:
            "There are 11 federal holidays: New Year's Day, Martin Luther King Jr. Day, Washington's Birthday, Memorial Day, Juneteenth, Independence Day, Labor Day, Columbus Day, Veterans Day, Thanksgiving and Christmas.",
        },
        {
          question: "Do private employers have to give federal holidays off?",
          answer:
            "No. Federal holidays apply to federal employees and federal offices. Private employers decide their own holiday schedule, and most offer six to eight paid holidays.",
        },
        {
          question: "Why is a holiday sometimes on a different day?",
          answer:
            "When a fixed-date holiday falls on a Saturday it is observed on Friday; when it falls on a Sunday it is observed on Monday. The list above shows the observed day.",
        },
        {
          question: "Are banks and the stock market closed on federal holidays?",
          answer:
            "Most banks follow the Federal Reserve schedule and close on federal holidays, but when a holiday falls on a Saturday, Federal Reserve Banks stay open the Friday before. The NYSE and Nasdaq follow their own calendar: they are open on Columbus Day and Veterans Day but closed on Good Friday. Juneteenth (June 19) is the newest federal holiday, added in 2021.",
        },
      ];

  return (
    <TimeToolPage
      crumbs={[{ href: tr ? "/" : "/en", label: t.home }, { href: holidayPaths.hub[lang], label: t.hub }]}
      crumbLabel={t.crumbLabel}
      title={tr ? "Resmî Tatiller ve Bayram Tarihleri" : "US Federal Holidays"}
      intro={
        tr
          ? "Türkiye'de önümüzdeki 12 ayın resmî tatilleri, kaç gün kaldığı ve yıllara göre tam listeler. Her yılın sayfasında köprü günleri, izin planı ve takvime ekleme dosyası var."
          : "Every US federal holiday in the next 12 months with the observed date and days remaining, plus full calendars by year with long-weekend ideas."
      }
      tool={
        <div className="holiday-tool">
          <NextHoliday lang={lang} />
          <h2 className="holiday-subtitle">{tr ? "Yaklaşan resmî tatiller" : "Upcoming federal holidays"}</h2>
          <ul className="holiday-upcoming">
            {upcoming.map((g) => {
              const first = g.items.find((h) => h.kind === "full")?.date ?? g.start;
              const days = diffDays(today, first);
              const link = COUNTDOWN[g.id];
              return (
                <li key={`${g.id}-${ymdKey(g.start)}`}>
                  <time dateTime={ymdKey(first)}>
                    <b>{first.day}</b>
                    <small>{formatYmdParts(first, lang, { month: "short" })}</small>
                  </time>
                  <div>
                    <strong>{link ? <Link href={link} prefetch={false}>{g.name}</Link> : g.name}</strong>
                    <span>
                      {rangeText(first, g.end, lang)} {first.year}
                      {g.fullDays > 1 ? (tr ? ` · ${g.fullDays} gün` : ` · ${g.fullDays} days`) : ""}
                      {g.half ? (tr ? ` · arefe ${short(g.half, "tr")} (yarım gün)` : "") : ""}
                      {g.estimated ? ` · ${t.estimated}` : ""}
                    </span>
                  </div>
                  <em>{days <= 0 ? (tr ? "bugün" : "today") : tr ? `${days} gün` : `${days} days`}</em>
                </li>
              );
            })}
          </ul>
          <h2 className="holiday-subtitle">{tr ? "Yıllara göre tatil listeleri" : "Holiday calendars by year"}</h2>
          <div className="holiday-year-cards">
            {HOLIDAY_YEARS.map((y) => {
              const list = holidaysFor(lang, y);
              const s = summary(list);
              return (
                <Link key={y} href={holidayPaths.year(lang, y)} prefetch={false} className={y === today.year ? "is-current" : undefined}>
                  <strong>{y}</strong>
                  <span>{tr ? `${s.weekdayFull} hafta içi tatil` : `${s.weekdayFull} weekday holidays`}</span>
                </Link>
              );
            })}
          </div>
        </div>
      }
      related={{ title: t.related, links: RELATED[lang] }}
      tocTitle={t.toc}
      tocItems={
        tr
          ? [
              { id: "liste", label: "Türkiye'deki resmî tatiller" },
              { id: "bayramlar", label: "2025-2030 bayram tarihleri" },
              { id: "faq", label: t.faq },
            ]
          : [
              { id: "liste", label: "The 11 federal holidays" },
              { id: "dates", label: "Dates by year" },
              { id: "faq", label: t.faq },
            ]
      }
      faqTitle={t.faq}
      faqItems={faqItems}
    >
      <h2 id="liste">{tr ? "Türkiye'deki resmî tatiller" : "The 11 federal holidays"}</h2>
      {tr ? (
        <ul>
          <li>1 Ocak – Yılbaşı (tam gün)</li>
          <li>Ramazan Bayramı – 3 gün; arefesi 13:00&apos;ten sonra yarım gün</li>
          <li>23 Nisan – Ulusal Egemenlik ve Çocuk Bayramı</li>
          <li>1 Mayıs – Emek ve Dayanışma Günü</li>
          <li>19 Mayıs – Atatürk&apos;ü Anma, Gençlik ve Spor Bayramı</li>
          <li>Kurban Bayramı – 4 gün; arefesi 13:00&apos;ten sonra yarım gün</li>
          <li>15 Temmuz – Demokrasi ve Millî Birlik Günü</li>
          <li>30 Ağustos – Zafer Bayramı</li>
          <li>29 Ekim – Cumhuriyet Bayramı; 28 Ekim 13:00&apos;ten sonra yarım gün</li>
        </ul>
      ) : (
        <ul>
          <li>New Year&apos;s Day – January 1</li>
          <li>Martin Luther King Jr. Day – third Monday in January</li>
          <li>Washington&apos;s Birthday (Presidents&apos; Day) – third Monday in February</li>
          <li>Memorial Day – last Monday in May</li>
          <li>Juneteenth National Independence Day – June 19</li>
          <li>Independence Day – July 4</li>
          <li>Labor Day – first Monday in September</li>
          <li>Columbus Day – second Monday in October</li>
          <li>Veterans Day – November 11</li>
          <li>Thanksgiving Day – fourth Thursday in November</li>
          <li>Christmas Day – December 25</li>
        </ul>
      )}

      {!tr && (
        <>
          <h2 id="dates">
            Federal holiday dates {HOLIDAY_YEARS[0]}–{HOLIDAY_YEARS[HOLIDAY_YEARS.length - 1]}
          </h2>
          <p>Observed dates; when a holiday falls on a weekend, the observed weekday is shown with an asterisk.</p>
          <div className="holiday-table-wrap">
            <table className="holiday-table">
              <thead>
                <tr>
                  <th scope="col">Holiday</th>
                  {HOLIDAY_YEARS.map((y) => (
                    <th scope="col" key={y} id={`y${y}`}>
                      {y}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {holidaysFor("en", HOLIDAY_YEARS[0]).map((h) => (
                  <tr key={h.id}>
                    <th scope="row">{h.name}</th>
                    {HOLIDAY_YEARS.map((y) => {
                      const d = holidaysFor("en", y).find((x) => x.id === h.id);
                      return (
                        <td key={y}>
                          {d ? formatYmdParts(d.date, "en", { weekday: "short", month: "short", day: "numeric" }) : "—"}
                          {d?.observedFor ? "*" : ""}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tr && (
        <>
          <h2 id="bayramlar">2025-2030 Ramazan ve Kurban Bayramı tarihleri</h2>
          <div className="holiday-table-wrap">
            <table className="holiday-table">
              <thead>
                <tr>
                  <th scope="col">Yıl</th>
                  <th scope="col">Ramazan Bayramı</th>
                  <th scope="col">Kurban Bayramı</th>
                </tr>
              </thead>
              <tbody>
                {bayramTable.map((row) => (
                  <tr key={row.year}>
                    <td>
                      <Link href={holidayPaths.year("tr", row.year)} prefetch={false}>
                        {row.year}
                      </Link>
                    </td>
                    {[row.rb, row.kb].map((gs, i) => (
                      <td key={i}>
                        {gs
                          .map((g) => {
                            const first = g.items.find((h) => h.kind === "full")?.date ?? g.start;
                            return `${rangeText(first, g.end, "tr")} (${weekdayName(first, "tr")})${g.estimated ? "*" : ""}`;
                          })
                          .join(" · ")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            <small>
              * {DIYANET_VERIFIED_UNTIL + 1} ve sonrası Umm al-Qura hesabına göre tahminidir. {DIYANET_VERIFIED_UNTIL} dahil önceki yıllar Diyanet İşleri
              Başkanlığı takvimiyle aynıdır.
            </small>
          </p>
        </>
      )}
    </TimeToolPage>
  );
}
