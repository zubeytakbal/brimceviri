import type { Metadata } from "next";
import { worldCityPaths } from "@/app/converter/time/nordicWorld";
import { notFound } from "next/navigation";
import Link from "@/app/components/SiteLink";
import TimeToolPage from "../../../components/time/TimeToolPage";
import CityLiveClock from "../../../components/world/CityLiveClock";
import type { FaqItem } from "../../../converter/faqSchema";
import { cityFacts, describeDifference, hourMapping, nearbyCities } from "../../../converter/time/cityFacts";
import { buildGermanCityReading } from "../../../converter/time/germanCityReading";
import { cityNameDe, cityPathDe, countryNameDe, findCityDe, citySlugDe } from "../../../converter/time/germanWorld";
import { differenceMinutes, formatUtcOffset, offsetMinutes } from "../../../converter/time/timezones";
import { worldCities } from "../../../converter/time/worldCities";
import { countriesDe, countryPathDe, deOf } from "../../../converter/geo/worldGeoDe";
import { buildLanguageAlternates } from "../../../i18n/routing";
import { seoTitle } from "../../../seoTitle";
import { buildSiteUrl } from "../../../siteConfig";

// Zeitverschiebung und Sommerzeit ändern sich im Jahresverlauf.
export const revalidate = 21600;
export const dynamicParams = false;

export function generateStaticParams() {
  return worldCities.map((city) => ({ stadt: citySlugDe(city) }));
}

const BERLIN = "Europe/Berlin";

/** Zeiträume, in denen die Zeitverschiebung vom üblichen Wert abweicht (unterschiedliche Umstellungstage). */
function differencePeriods(timeZone: string, year: number) {
  const days: Array<{ date: Date; diff: number }> = [];
  for (let t = Date.UTC(year, 0, 1, 12); t < Date.UTC(year + 1, 0, 1); t += 86400000) {
    days.push({ date: new Date(t), diff: differenceMinutes(BERLIN, timeZone, new Date(t)) });
  }
  const periods: Array<{ from: Date; to: Date; diff: number }> = [];
  for (const d of days) {
    const last = periods[periods.length - 1];
    if (last && last.diff === d.diff) last.to = d.date;
    else periods.push({ from: d.date, to: d.date, diff: d.diff });
  }
  return { periods };
}

const dm = (d: Date) => new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "2-digit", timeZone: "UTC" }).format(d);

function hoursText(minutes: number) {
  if (minutes === 0) return "gleiche Uhrzeit";
  const a = Math.abs(minutes);
  const h = Math.floor(a / 60);
  const m = a % 60;
  return `${minutes > 0 ? "+" : "−"}${h}${m ? `:${String(m).padStart(2, "0")}` : ""} Std.`;
}

export async function generateMetadata({ params }: { params: Promise<{ stadt: string }> }): Promise<Metadata> {
  const city = findCityDe((await params).stadt);
  if (!city) return {};
  const name = cityNameDe(city);
  const now = new Date();
  const diff = differenceMinutes(BERLIN, city.timeZone, now);
  const path = cityPathDe(city);
  const title = `Uhrzeit ${name}: Wie spät ist es jetzt in ${name}?`;
  const description = `Aktuelle Uhrzeit in ${name} (${countryNameDe(city)}) live. ${
    diff === 0 ? "Gleiche Uhrzeit wie in Deutschland" : `Zeitverschiebung zu Deutschland: ${describeDifference(diff, "de")}`
  }, Zeitzone ${formatUtcOffset(offsetMinutes(city.timeZone, now))}, Sommerzeit sowie Sonnenaufgang und -untergang.`;
  return {
    title: seoTitle(title, `Uhrzeit ${name}: Wie spät ist es in ${name}?`, `Uhrzeit ${name} jetzt`),
    description,
    alternates: {
      canonical: path,
      ...buildLanguageAlternates(worldCityPaths(city), "tr"),
    },
    openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "de_DE", type: "website" },
  };
}

export default async function GermanCityTimePage({ params }: { params: Promise<{ stadt: string }> }) {
  const city = findCityDe((await params).stadt);
  if (!city) notFound();
  const land = countriesDe.find((c) => c.nameEn === city.countryEn) ?? null;
  const name = cityNameDe(city);
  const country = countryNameDe(city);
  const now = new Date();
  const year = now.getUTCFullYear();
  const facts = cityFacts(city, now, "de");
  const diff = differenceMinutes(BERLIN, city.timeZone, now);
  const winter = differenceMinutes(BERLIN, city.timeZone, new Date(Date.UTC(year, 0, 15, 12)));
  const summer = differenceMinutes(BERLIN, city.timeZone, new Date(Date.UTC(year, 6, 15, 12)));
  const mapping = hourMapping(BERLIN, city.timeZone, now, "de");
  const nearby = nearbyCities(city, 10);
  const path = cityPathDe(city);
  const isBerlinZone = diff === 0 && winter === 0 && summer === 0;
  const { periods } = differencePeriods(city.timeZone, year);
  // Kurze Abweichungen (höchstens einige Wochen) gesondert nennen.
  const main = [winter, summer];
  const exceptions = periods.filter((p) => !main.includes(p.diff));
  const exceptionText = exceptions.length
    ? ` Ausnahme: ${exceptions.map((p) => `vom ${dm(p.from)} bis ${dm(p.to)} ${hoursText(p.diff)}`).join(" und ")}, weil ${name} und Deutschland die Uhren an unterschiedlichen Tagen umstellen.`
    : "";
  const noon = mapping[12];
  const reading = buildGermanCityReading(city, now);

  const faqItems: FaqItem[] = [
    {
      question: `Wie spät ist es in ${name}?`,
      answer: `Die Uhr oben zeigt die aktuelle Uhrzeit in ${name} sekundengenau. ${name} liegt derzeit in der Zeitzone ${facts.utcLabel}${
        isBerlinZone ? " und hat dieselbe Uhrzeit wie Deutschland." : ` und ist Deutschland ${describeDifference(diff, "de")}.`
      }`,
    },
    {
      question: `Wie groß ist die Zeitverschiebung zwischen Deutschland und ${name}?`,
      answer:
        (winter === summer
          ? `Meist ${hoursText(winter)} (${winter === 0 ? "keine Zeitverschiebung" : winter > 0 ? `${name} ist Deutschland voraus` : `in ${name} ist es früher`}).`
          : `Im deutschen Winter ${hoursText(winter)}, im Sommer ${hoursText(summer)}, weil ${facts.observesDst ? `${name} die Uhren anders umstellt als Deutschland` : `${name} keine Sommerzeit hat`}.`) +
        exceptionText,
    },
    {
      question: `Hat ${name} Sommerzeit?`,
      answer: facts.observesDst
        ? `Ja. ${facts.transition ? `Die nächste Zeitumstellung ist am ${facts.transition.date}: Die Uhren werden um ${facts.transition.time} auf ${facts.transition.newTime} ${facts.transition.forward ? "vorgestellt" : "zurückgestellt"} (danach ${facts.transition.newOffset}).` : ""}`
        : `Nein. In ${name} gilt das ganze Jahr ${facts.utcLabel}; es gibt keine Zeitumstellung.`,
    },
    {
      question: `Wie spät ist es in ${name}, wenn es in Deutschland 12 Uhr ist?`,
      answer: `Dann ist es in ${name} ${noon.to} Uhr${noon.dayNote ? ` (${noon.dayNote})` : ""}.`,
    },
  ];

  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: "/de/weltuhr", label: "Weltuhr" },
          { href: path, label: name },
        ]}
        crumbLabel="Brotkrumen"
        title={`Uhrzeit ${name}`}
        intro={`Wie spät ist es in ${name} (${country})? Aktuelle Uhrzeit live, Zeitverschiebung zu Deutschland, Zeitzone, Sommerzeit und Sonnenzeiten.`}
        tool={
          <>
            <CityLiveClock
              timeZone={city.timeZone}
              lang="de"
              cityName={name}
              copy={{ localCaption: `Aktuelle Uhrzeit in ${name}`, yourTime: "Ihre Uhrzeit", sameAsYou: "gleiche Uhrzeit wie bei Ihnen", ahead: "voraus", behind: "zurück" }}
            />
            <div className="holiday-stats">
              <div>
                <strong>{hoursText(diff)}</strong>
                <span>zu Deutschland</span>
              </div>
              <div>
                <strong>{facts.utcLabel}</strong>
                <span>{facts.zoneName}</span>
              </div>
              <div>
                <strong>{facts.observesDst ? (facts.dstNow ? "Sommerzeit" : "Winterzeit") : "keine"}</strong>
                <span>Zeitumstellung</span>
              </div>
              {facts.sunRows[0] && (
                <div>
                  <strong>
                    {facts.sunRows[0].sunrise} – {facts.sunRows[0].sunset}
                  </strong>
                  <span>Sonnenaufgang – Sonnenuntergang</span>
                </div>
              )}
            </div>
          </>
        }
        related={{
          title: "Das könnte Sie auch interessieren",
          links: [
            { href: `/de/zeitzonenrechner?f=berlin&t=${city.en}`, label: `Uhrzeit Deutschland – ${name} umrechnen` },
            ...(land ? [{ href: countryPathDe(land)!, label: `${deOf(land).name}: Hauptstadt, Währung und Karte` }] : []),
            { href: "/de/weltuhr", label: "Weltuhr" },
            { href: "/de/zeitzonenrechner", label: "Zeitzonenrechner" },
            { href: "/de/kalenderwoche", label: "Aktuelle Kalenderwoche" },
          ],
        }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "zeitverschiebung", label: `Zeitverschiebung Deutschland – ${name}` },
          { id: "umrechnen", label: "Uhrzeiten umrechnen" },
          { id: "sonne", label: "Sonnenaufgang und Sonnenuntergang" },
          { id: "zahlen", label: `${name} in Zahlen` },
          { id: "staedte", label: "Weitere Städte" },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="zeitverschiebung">
          Zeitverschiebung Deutschland – {name}
        </h2>
        <p>
          {isBerlinZone
            ? `${name} hat dieselbe Uhrzeit wie Deutschland: im Winter MEZ (UTC+1), im Sommer MESZ (UTC+2).`
            : `${name} liegt in der Zeitzone ${facts.utcLabel} (${facts.zoneName}) und ist Deutschland derzeit ${describeDifference(diff, "de")}.`}{" "}
          {facts.observesDst
            ? facts.transition
              ? `Die nächste Zeitumstellung in ${name} ist am ${facts.transition.date}; dann gilt ${facts.transition.newOffset}.`
              : ""
            : `${name} stellt die Uhren nicht um. Weil Deutschland Sommerzeit hat, ändert sich der Abstand zweimal im Jahr um eine Stunde.`}
        </p>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">Zeitraum</th>
                <th scope="col">Zeitverschiebung zu Deutschland</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Jetzt</td>
                <td>{hoursText(diff)}</td>
              </tr>
              <tr>
                <td>Winter (Mitte Januar)</td>
                <td>{hoursText(winter)}</td>
              </tr>
              <tr>
                <td>Sommer (Mitte Juli)</td>
                <td>{hoursText(summer)}</td>
              </tr>
              {exceptions.map((p) => (
                <tr key={p.from.toISOString()}>
                  <td>
                    {dm(p.from)}–{dm(p.to)}{year}
                  </td>
                  <td>{hoursText(p.diff)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!isBerlinZone && (
          <>
            <h2 id="umrechnen">Uhrzeiten umrechnen: Deutschland → {name}</h2>
            <p>Mit ✓ markiert sind Stunden, die an beiden Orten in der üblichen Arbeitszeit (9–18 Uhr) liegen. Stand: heute.</p>
            <div className="holiday-table-wrap">
              <table className="holiday-table">
                <thead>
                  <tr>
                    <th scope="col">Deutschland</th>
                    <th scope="col">{name}</th>
                  </tr>
                </thead>
                <tbody>
                  {mapping.map((row) => (
                    <tr key={row.from} className={row.overlap ? "is-overlap" : undefined}>
                      <td>{row.from} Uhr</td>
                      <td>
                        {row.to} Uhr{row.dayNote ? ` (${row.dayNote})` : ""}
                        {row.overlap ? " ✓" : ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        <h2 id="sonne">Sonnenaufgang und Sonnenuntergang in {name}</h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">Tag</th>
                <th scope="col">Sonnenaufgang</th>
                <th scope="col">Sonnenuntergang</th>
                <th scope="col">Tageslänge</th>
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
          <small>Ortszeit {name}; berechnet nach dem NOAA-Verfahren, Genauigkeit etwa ±2 Minuten.</small>
        </p>

        <h2 id="zahlen">{reading.heading}</h2>
        {reading.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        <h2 id="staedte">Weitere Städte</h2>
        <p>
          {nearby.map((c, i) => (
            <span key={c.en}>
              {i > 0 ? ", " : ""}
              <Link href={cityPathDe(c)} prefetch={false}>
                Uhrzeit {cityNameDe(c)}
              </Link>
            </span>
          ))}
          . Alle Städte auf einen Blick zeigt die <Link href="/de/weltuhr">Weltuhr</Link>.
        </p>
      </TimeToolPage>
    </div>
  );
}
