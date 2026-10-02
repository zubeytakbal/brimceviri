// İsveççe, Norveççe ve Danca şehir saati sayfası ("Vad är klockan i New York?").
// Almanca /de/uhrzeit/[stadt] sayfasının karşılığı; fark kullanıcının ülkesine göre.
import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { cityFacts, describeDifference, hourMapping, nearbyCities } from "../../converter/time/cityFacts";
import type { NordicLocale } from "../../converter/time/nordicWeek";
import { cityNameNordic, cityPathNordic, countryNameNordic, NORDIC_WORLD_BASE, worldCityPaths } from "../../converter/time/nordicWorld";
import { differenceMinutes, formatUtcOffset, offsetMinutes } from "../../converter/time/timezones";
import type { WorldCity } from "../../converter/time/worldCities";
import { buildLanguageAlternates } from "../../i18n/routing";
import { buildSiteUrl } from "../../siteConfig";
import { NORDIC_TIME_UI } from "../time/nordicTimeCopy";
import TimeToolPage from "../time/TimeToolPage";
import CityLiveClock from "./CityLiveClock";

const HOME_ZONE: Record<NordicLocale, string> = { sv: "Europe/Stockholm", no: "Europe/Oslo", da: "Europe/Copenhagen" };

type Copy = {
  home: string;
  boardCrumb: string;
  metaTitle: (n: string) => string;
  description: (n: string, country: string, diffText: string, utc: string) => string;
  sameAsHome: string;
  diffToHome: (d: string) => string;
  h1: (n: string) => string;
  intro: (n: string, country: string) => string;
  clock: { localCaption: (n: string) => string; yourTime: string; sameAsYou: string; ahead: string; behind: string };
  toHome: string;
  dst: string;
  summer: string;
  winter: string;
  none: string;
  sun: string;
  diffTitle: (n: string) => string;
  sameZoneText: (n: string) => string;
  zoneText: (n: string, utc: string, zone: string, d: string) => string;
  nextChange: (n: string, date: string, offset: string) => string;
  noDst: (n: string) => string;
  period: string;
  diffCol: string;
  now: string;
  winterRow: string;
  summerRow: string;
  convertTitle: (n: string) => string;
  convertNote: string;
  homeCol: string;
  sunTitle: (n: string) => string;
  day: string;
  sunrise: string;
  sunset: string;
  dayLength: string;
  sunNote: (n: string) => string;
  moreTitle: string;
  timeIn: (n: string) => string;
  allCities: string;
  board: string;
  faq: (a: { n: string; utc: string; same: boolean; d: string; winter: string; summer: string; dstAnswer: string; noon: string }) => Array<{ question: string; answer: string }>;
  dstYes: (date: string, time: string, newTime: string, forward: boolean, offset: string) => string;
  dstNo: (n: string, utc: string) => string;
  hoursText: (minutes: number) => string;
};

function hours(minutes: number, same: string, unit: string) {
  if (minutes === 0) return same;
  const a = Math.abs(minutes);
  const h = Math.floor(a / 60);
  const m = a % 60;
  return `${minutes > 0 ? "+" : "−"}${h}${m ? `:${String(m).padStart(2, "0")}` : ""} ${unit}`;
}

const COPY: Record<NordicLocale, Copy> = {
  sv: {
    home: "Sverige",
    boardCrumb: "Världsklocka",
    metaTitle: (n) => `Vad är klockan i ${n}? Aktuell tid nu`,
    description: (n, c, d, utc) => `Aktuell tid i ${n} (${c}) live. ${d}, tidszon ${utc}, sommartid samt soluppgång och solnedgång.`,
    sameAsHome: "Samma tid som i Sverige",
    diffToHome: (d) => `Tidsskillnad mot Sverige: ${d}`,
    h1: (n) => `Vad är klockan i ${n}?`,
    intro: (n, c) => `Aktuell tid i ${n} (${c}) live, tidsskillnad mot Sverige, tidszon, sommartid och soltider.`,
    clock: { localCaption: (n) => `Aktuell tid i ${n}`, yourTime: "Din tid", sameAsYou: "samma tid som hos dig", ahead: "före", behind: "efter" },
    toHome: "mot Sverige",
    dst: "Sommartid",
    summer: "sommartid",
    winter: "vintertid",
    none: "ingen",
    sun: "Soluppgång – solnedgång",
    diffTitle: (n) => `Tidsskillnad Sverige – ${n}`,
    sameZoneText: (n) => `${n} har samma tid som Sverige: på vintern CET (UTC+1), på sommaren CEST (UTC+2).`,
    zoneText: (n, utc, z, d) => `${n} ligger i tidszonen ${utc} (${z}) och är just nu ${d} Sverige.`,
    nextChange: (n, date, o) => `Nästa omställning i ${n} är ${date}; då gäller ${o}.`,
    noDst: (n) => `${n} ställer inte om klockan. Eftersom Sverige har sommartid ändras skillnaden två gånger om året med en timme.`,
    period: "Period",
    diffCol: "Tidsskillnad mot Sverige",
    now: "Nu",
    winterRow: "Vinter (mitten av januari)",
    summerRow: "Sommar (mitten av juli)",
    convertTitle: (n) => `Omvandla tider: Sverige → ${n}`,
    convertNote: "Markerade med ✓ är timmar som på båda orterna ligger inom vanlig arbetstid (9–18). Gäller idag.",
    homeCol: "Sverige",
    sunTitle: (n) => `Soluppgång och solnedgång i ${n}`,
    day: "Dag",
    sunrise: "Soluppgång",
    sunset: "Solnedgång",
    dayLength: "Dagslängd",
    sunNote: (n) => `Lokal tid i ${n}; beräknat med NOAA-metoden, noggrannhet cirka ±2 minuter.`,
    moreTitle: "Fler städer",
    timeIn: (n) => `Klockan i ${n}`,
    allCities: "Alla städer på en gång visar",
    board: "världsklockan",
    faq: (a) => [
      { question: `Vad är klockan i ${a.n}?`, answer: `Klockan ovan visar aktuell tid i ${a.n} på sekunden. ${a.n} ligger just nu i tidszonen ${a.utc}${a.same ? " och har samma tid som Sverige." : ` och är ${a.d} Sverige.`}` },
      { question: `Hur stor är tidsskillnaden mellan Sverige och ${a.n}?`, answer: a.winter === a.summer ? `Oftast ${a.winter}.` : `På svensk vinter ${a.winter}, på sommaren ${a.summer}.` },
      { question: `Har ${a.n} sommartid?`, answer: a.dstAnswer },
      { question: `Vad är klockan i ${a.n} när den är 12 i Sverige?`, answer: `Då är klockan ${a.noon} i ${a.n}.` },
    ],
    dstYes: (date, time, newTime, forward, o) => `Ja. Nästa omställning är ${date}: klockan ${forward ? "ställs fram" : "ställs tillbaka"} från ${time} till ${newTime} (därefter ${o}).`,
    dstNo: (n, utc) => `Nej. I ${n} gäller ${utc} hela året; klockan ställs inte om.`,
    hoursText: (m) => hours(m, "samma tid", "tim"),
  },
  no: {
    home: "Norge",
    boardCrumb: "Verdensklokke",
    metaTitle: (n) => `Hva er klokka i ${n}? Nåværende tid`,
    description: (n, c, d, utc) => `Nåværende tid i ${n} (${c}) direkte. ${d}, tidssone ${utc}, sommertid og soloppgang og solnedgang.`,
    sameAsHome: "Samme tid som i Norge",
    diffToHome: (d) => `Tidsforskjell til Norge: ${d}`,
    h1: (n) => `Hva er klokka i ${n}?`,
    intro: (n, c) => `Nåværende tid i ${n} (${c}) direkte, tidsforskjell til Norge, tidssone, sommertid og soltider.`,
    clock: { localCaption: (n) => `Nåværende tid i ${n}`, yourTime: "Din tid", sameAsYou: "samme tid som hos deg", ahead: "foran", behind: "bak" },
    toHome: "til Norge",
    dst: "Sommertid",
    summer: "sommertid",
    winter: "vintertid",
    none: "ingen",
    sun: "Soloppgang – solnedgang",
    diffTitle: (n) => `Tidsforskjell Norge – ${n}`,
    sameZoneText: (n) => `${n} har samme tid som Norge: om vinteren CET (UTC+1), om sommeren CEST (UTC+2).`,
    zoneText: (n, utc, z, d) => `${n} ligger i tidssonen ${utc} (${z}) og er nå ${d} Norge.`,
    nextChange: (n, date, o) => `Neste omstilling i ${n} er ${date}; da gjelder ${o}.`,
    noDst: (n) => `${n} stiller ikke klokka. Fordi Norge har sommertid, endres forskjellen to ganger i året med én time.`,
    period: "Periode",
    diffCol: "Tidsforskjell til Norge",
    now: "Nå",
    winterRow: "Vinter (midten av januar)",
    summerRow: "Sommer (midten av juli)",
    convertTitle: (n) => `Regn om klokkeslett: Norge → ${n}`,
    convertNote: "Merket med ✓ er timer som begge steder ligger innenfor vanlig arbeidstid (9–18). Gjelder i dag.",
    homeCol: "Norge",
    sunTitle: (n) => `Soloppgang og solnedgang i ${n}`,
    day: "Dag",
    sunrise: "Soloppgang",
    sunset: "Solnedgang",
    dayLength: "Daglengde",
    sunNote: (n) => `Lokal tid i ${n}; beregnet med NOAA-metoden, nøyaktighet omtrent ±2 minutter.`,
    moreTitle: "Flere byer",
    timeIn: (n) => `Klokka i ${n}`,
    allCities: "Alle byer samlet viser",
    board: "verdensklokka",
    faq: (a) => [
      { question: `Hva er klokka i ${a.n}?`, answer: `Klokka over viser nåværende tid i ${a.n} på sekundet. ${a.n} ligger nå i tidssonen ${a.utc}${a.same ? " og har samme tid som Norge." : ` og er ${a.d} Norge.`}` },
      { question: `Hvor stor er tidsforskjellen mellom Norge og ${a.n}?`, answer: a.winter === a.summer ? `Som regel ${a.winter}.` : `Om norsk vinter ${a.winter}, om sommeren ${a.summer}.` },
      { question: `Har ${a.n} sommertid?`, answer: a.dstAnswer },
      { question: `Hva er klokka i ${a.n} når den er 12 i Norge?`, answer: `Da er klokka ${a.noon} i ${a.n}.` },
    ],
    dstYes: (date, time, newTime, forward, o) => `Ja. Neste omstilling er ${date}: klokka stilles ${forward ? "fram" : "tilbake"} fra ${time} til ${newTime} (deretter ${o}).`,
    dstNo: (n, utc) => `Nei. I ${n} gjelder ${utc} hele året; klokka stilles ikke om.`,
    hoursText: (m) => hours(m, "samme tid", "t"),
  },
  da: {
    home: "Danmark",
    boardCrumb: "Verdensur",
    metaTitle: (n) => `Hvad er klokken i ${n}? Aktuel tid nu`,
    description: (n, c, d, utc) => `Den aktuelle tid i ${n} (${c}) live. ${d}, tidszone ${utc}, sommertid samt solopgang og solnedgang.`,
    sameAsHome: "Samme tid som i Danmark",
    diffToHome: (d) => `Tidsforskel til Danmark: ${d}`,
    h1: (n) => `Hvad er klokken i ${n}?`,
    intro: (n, c) => `Den aktuelle tid i ${n} (${c}) live, tidsforskel til Danmark, tidszone, sommertid og soltider.`,
    clock: { localCaption: (n) => `Aktuel tid i ${n}`, yourTime: "Din tid", sameAsYou: "samme tid som hos dig", ahead: "foran", behind: "bagud" },
    toHome: "til Danmark",
    dst: "Sommertid",
    summer: "sommertid",
    winter: "vintertid",
    none: "ingen",
    sun: "Solopgang – solnedgang",
    diffTitle: (n) => `Tidsforskel Danmark – ${n}`,
    sameZoneText: (n) => `${n} har samme tid som Danmark: om vinteren CET (UTC+1), om sommeren CEST (UTC+2).`,
    zoneText: (n, utc, z, d) => `${n} ligger i tidszonen ${utc} (${z}) og er lige nu ${d} i forhold til Danmark.`,
    nextChange: (n, date, o) => `Næste omstilling i ${n} er ${date}; derefter gælder ${o}.`,
    noDst: (n) => `${n} stiller ikke uret om. Fordi Danmark har sommertid, ændrer forskellen sig to gange om året med en time.`,
    period: "Periode",
    diffCol: "Tidsforskel til Danmark",
    now: "Nu",
    winterRow: "Vinter (midt i januar)",
    summerRow: "Sommer (midt i juli)",
    convertTitle: (n) => `Omregn klokkeslæt: Danmark → ${n}`,
    convertNote: "Markeret med ✓ er timer, der begge steder ligger inden for normal arbejdstid (9–18). Gælder i dag.",
    homeCol: "Danmark",
    sunTitle: (n) => `Solopgang og solnedgang i ${n}`,
    day: "Dag",
    sunrise: "Solopgang",
    sunset: "Solnedgang",
    dayLength: "Dagslængde",
    sunNote: (n) => `Lokal tid i ${n}; beregnet med NOAA-metoden, nøjagtighed cirka ±2 minutter.`,
    moreTitle: "Flere byer",
    timeIn: (n) => `Klokken i ${n}`,
    allCities: "Alle byer samlet viser",
    board: "verdensuret",
    faq: (a) => [
      { question: `Hvad er klokken i ${a.n}?`, answer: `Uret ovenfor viser den aktuelle tid i ${a.n} på sekundet. ${a.n} ligger lige nu i tidszonen ${a.utc}${a.same ? " og har samme tid som Danmark." : ` og er ${a.d} i forhold til Danmark.`}` },
      { question: `Hvor stor er tidsforskellen mellem Danmark og ${a.n}?`, answer: a.winter === a.summer ? `Som regel ${a.winter}.` : `I den danske vinter ${a.winter}, om sommeren ${a.summer}.` },
      { question: `Har ${a.n} sommertid?`, answer: a.dstAnswer },
      { question: `Hvad er klokken i ${a.n}, når den er 12 i Danmark?`, answer: `Så er klokken ${a.noon} i ${a.n}.` },
    ],
    dstYes: (date, time, newTime, forward, o) => `Ja. Næste omstilling er ${date}: uret stilles ${forward ? "frem" : "tilbage"} fra ${time} til ${newTime} (derefter ${o}).`,
    dstNo: (n, utc) => `Nej. I ${n} gælder ${utc} hele året; uret stilles ikke om.`,
    hoursText: (m) => hours(m, "samme tid", "t."),
  },
};

export function nordicCityAlternates(city: WorldCity) {
  return buildLanguageAlternates(worldCityPaths(city), "tr");
}

export function nordicCityMetadata(locale: NordicLocale, city: WorldCity): Metadata {
  const c = COPY[locale];
  const name = cityNameNordic(locale, city);
  const now = new Date();
  const diff = differenceMinutes(HOME_ZONE[locale], city.timeZone, now);
  const path = cityPathNordic(locale, city);
  const description = c.description(name, countryNameNordic(locale, city), diff === 0 ? c.sameAsHome : c.diffToHome(describeDifference(diff, locale)), formatUtcOffset(offsetMinutes(city.timeZone, now)));
  return {
    title: c.metaTitle(name),
    description,
    alternates: { canonical: path, ...nordicCityAlternates(city) },
    openGraph: { title: c.metaTitle(name), description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: NORDIC_TIME_UI[locale].ogLocale, type: "website" },
  };
}

export default function NordicCityTimePage({ locale, city }: { locale: NordicLocale; city: WorldCity }) {
  const c = COPY[locale];
  const ui = NORDIC_TIME_UI[locale];
  const home = HOME_ZONE[locale];
  const name = cityNameNordic(locale, city);
  const country = countryNameNordic(locale, city);
  const now = new Date();
  const year = now.getUTCFullYear();
  const facts = cityFacts(city, now, locale);
  const diff = differenceMinutes(home, city.timeZone, now);
  const winter = differenceMinutes(home, city.timeZone, new Date(Date.UTC(year, 0, 15, 12)));
  const summer = differenceMinutes(home, city.timeZone, new Date(Date.UTC(year, 6, 15, 12)));
  const mapping = hourMapping(home, city.timeZone, now, locale);
  const nearby = nearbyCities(city, 10);
  const path = cityPathNordic(locale, city);
  const sameZone = diff === 0 && winter === 0 && summer === 0;
  const noon = mapping[12];
  const base = NORDIC_WORLD_BASE[locale];

  const dstAnswer = facts.observesDst
    ? facts.transition
      ? c.dstYes(facts.transition.date, facts.transition.time, facts.transition.newTime, facts.transition.forward, facts.transition.newOffset)
      : c.dstYes("—", "—", "—", true, facts.utcLabel)
    : c.dstNo(name, facts.utcLabel);

  return (
    <div lang={locale === "no" ? "nb" : locale}>
      <TimeToolPage
        crumbs={[
          { href: ui.homeHref, label: ui.home },
          { href: base, label: c.boardCrumb },
          { href: path, label: name },
        ]}
        crumbLabel={ui.crumbLabel}
        title={c.h1(name)}
        intro={c.intro(name, country)}
        tool={
          <>
            <CityLiveClock
              timeZone={city.timeZone}
              lang={locale}
              cityName={name}
              copy={{ ...c.clock, localCaption: c.clock.localCaption(name) }}
            />
            <div className="holiday-stats">
              <div>
                <strong>{c.hoursText(diff)}</strong>
                <span>{c.toHome}</span>
              </div>
              <div>
                <strong>{facts.utcLabel}</strong>
                <span>{facts.zoneName}</span>
              </div>
              <div>
                <strong>{facts.observesDst ? (facts.dstNow ? c.summer : c.winter) : c.none}</strong>
                <span>{c.dst}</span>
              </div>
              {facts.sunRows[0] && (
                <div>
                  <strong>
                    {facts.sunRows[0].sunrise} – {facts.sunRows[0].sunset}
                  </strong>
                  <span>{c.sun}</span>
                </div>
              )}
            </div>
          </>
        }
        related={{
          title: ui.relatedTitle,
          links: [
            ...nearby.slice(0, 4).map((other) => ({ href: cityPathNordic(locale, other), label: c.timeIn(cityNameNordic(locale, other)) })),
            { href: base, label: c.boardCrumb },
          ],
        }}
        tocTitle={ui.tocTitle}
        tocItems={[
          { id: "tidsskillnad", label: c.diffTitle(name) },
          ...(sameZone ? [] : [{ id: "omvandla", label: c.convertTitle(name) }]),
          { id: "sol", label: c.sunTitle(name) },
          { id: "stader", label: c.moreTitle },
          { id: "faq", label: ui.faqTitle },
        ]}
        faqTitle={ui.faqTitle}
        faqItems={c.faq({
          n: name,
          utc: facts.utcLabel,
          same: sameZone,
          d: describeDifference(diff, locale),
          winter: c.hoursText(winter),
          summer: c.hoursText(summer),
          dstAnswer,
          noon: `${noon.to}${noon.dayNote ? ` (${noon.dayNote})` : ""}`,
        })}
      >
        <h2 id="tidsskillnad">{c.diffTitle(name)}</h2>
        <p>
          {sameZone ? c.sameZoneText(name) : c.zoneText(name, facts.utcLabel, facts.zoneName, describeDifference(diff, locale))}{" "}
          {facts.observesDst ? (facts.transition ? c.nextChange(name, facts.transition.date, facts.transition.newOffset) : "") : c.noDst(name)}
        </p>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">{c.period}</th>
                <th scope="col">{c.diffCol}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{c.now}</td>
                <td>{c.hoursText(diff)}</td>
              </tr>
              <tr>
                <td>{c.winterRow}</td>
                <td>{c.hoursText(winter)}</td>
              </tr>
              <tr>
                <td>{c.summerRow}</td>
                <td>{c.hoursText(summer)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {!sameZone && (
          <>
            <h2 id="omvandla">{c.convertTitle(name)}</h2>
            <p>{c.convertNote}</p>
            <div className="holiday-table-wrap">
              <table className="holiday-table">
                <thead>
                  <tr>
                    <th scope="col">{c.homeCol}</th>
                    <th scope="col">{name}</th>
                  </tr>
                </thead>
                <tbody>
                  {mapping.map((row) => (
                    <tr key={row.from} className={row.overlap ? "is-overlap" : undefined}>
                      <td>{row.from}</td>
                      <td>
                        {row.to}
                        {row.dayNote ? ` (${row.dayNote})` : ""}
                        {row.overlap ? " ✓" : ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        <h2 id="sol">{c.sunTitle(name)}</h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">{c.day}</th>
                <th scope="col">{c.sunrise}</th>
                <th scope="col">{c.sunset}</th>
                <th scope="col">{c.dayLength}</th>
              </tr>
            </thead>
            <tbody>
              {facts.sunRows.map((row) => (
                <tr key={row.date}>
                  <td>{row.date}</td>
                  <td>{row.sunrise}</td>
                  <td>{row.sunset}</td>
                  <td>{row.dayLength}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          <small>{c.sunNote(name)}</small>
        </p>

        <h2 id="stader">{c.moreTitle}</h2>
        <p>
          {nearby.map((other, i) => (
            <span key={other.en}>
              {i > 0 ? ", " : ""}
              <Link href={cityPathNordic(locale, other)} prefetch={false}>
                {c.timeIn(cityNameNordic(locale, other))}
              </Link>
            </span>
          ))}
          . {c.allCities} <Link href={base}>{c.board}</Link>.
        </p>
      </TimeToolPage>
    </div>
  );
}
