import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/app/components/SiteLink";
import EntfernungsRechner from "../../../../components/de/EntfernungsRechner";
import TimeToolPage from "../../../../components/time/TimeToolPage";
import type { FaqItem } from "../../../../converter/faqSchema";
import {
  entfernungenAb,
  entfernungPaare,
  entfernungPaarPath,
  entfernungStadtPath,
  findEntfernungPaar,
  himmelsrichtung,
  kurs,
  lageAdjektiv,
  luftlinieKm,
  mittelpunkt,
  naechsteStadt,
} from "../../../../converter/geo/germanDistances";
import { todayBerlin } from "../../../../converter/time/germanDates";
import { GERMAN_STATES } from "../../../../converter/time/germanHolidays";
import { sunTimes } from "../../../../converter/time/solar";
import { seoTitle } from "../../../../seoTitle";
import { buildSiteUrl } from "../../../../siteConfig";

// Sonnenzeiten beziehen sich auf den aktuellen Tag.
export const revalidate = 86400;
export const dynamicParams = false;

type PageProps = { params: Promise<{ stadt: string; ziel: string }> };

export function generateStaticParams() {
  return entfernungPaare().map((p) => ({ stadt: p.from.id, ziel: p.to.id }));
}

const km = (v: number) => Math.round(v).toLocaleString("de-DE");
const km1 = (v: number) => v.toLocaleString("de-DE", { maximumFractionDigits: 1 });
const landOf = (code: string) => GERMAN_STATES.find((s) => s.code === code)!;
const uhr = (d: Date) => new Intl.DateTimeFormat("de-DE", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Berlin" }).format(d);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { stadt, ziel } = await params;
  const pair = findEntfernungPaar(stadt, ziel);
  if (!pair) return {};
  const d = luftlinieKm(pair.from, pair.to);
  const path = `/de/entfernung/${pair.from.id}/${pair.to.id}`;
  const title = `Entfernung ${pair.from.name} – ${pair.to.name}: ${km(d)} km Luftlinie`;
  const description = `${pair.to.name} liegt ${km(d)} km Luftlinie ${lageAdjektiv(kurs(pair.from, pair.to))} von ${pair.from.name}. Dazu Himmelsrichtung, Mittelpunkt der Strecke und Sonnenzeiten beider Städte.`;
  return {
    title: seoTitle(title, `Entfernung ${pair.from.name} – ${pair.to.name}`),
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "de_DE", type: "website" },
  };
}

export default async function EntfernungPaarPage({ params }: PageProps) {
  const { stadt, ziel } = await params;
  const pair = findEntfernungPaar(stadt, ziel);
  if (!pair) notFound();
  const { from, to } = pair;
  const d = luftlinieKm(from, to);
  const grad = kurs(from, to);
  const mid = mittelpunkt(from, to);
  const nearMid = naechsteStadt(mid);
  const today = todayBerlin();
  const sun = [from, to].map((c) => ({ city: c, t: sunTimes(today.year, today.month, today.day, c.lat, c.lon) }));
  const sunDiff =
    sun[0].t.kind === "normal" && sun[1].t.kind === "normal" ? Math.round((sun[1].t.sunrise.getTime() - sun[0].t.sunrise.getTime()) / 60000) : null;
  const landA = landOf(from.land);
  const landB = landOf(to.land);
  // Zielnahe Städte: so unterscheidet sich die Liste je Strecke.
  const weitere = entfernungenAb(to)
    .filter((r) => r.city.id !== from.id)
    .slice(0, 6)
    .map((r) => ({ href: entfernungPaarPath(from, r.city) ?? entfernungStadtPath(r.city), label: `nach ${r.city.name}: ${km(luftlinieKm(from, r.city))} km` }));

  const faqItems: FaqItem[] = [
    { question: `Wie weit ist es von ${from.name} nach ${to.name}?`, answer: `${km1(d)} km Luftlinie.` },
    { question: `In welcher Richtung liegt ${to.name} von ${from.name} aus?`, answer: `Im ${himmelsrichtung(grad)} (${Math.round(grad)}°).` },
  ];

  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: "/de/entfernung", label: "Entfernung" },
          { href: entfernungStadtPath(from), label: from.name },
          { href: `/de/entfernung/${from.id}/${to.id}`, label: to.name },
        ]}
        crumbLabel="Brotkrumen"
        title={`Entfernung ${from.name} – ${to.name}`}
        intro={`${to.name}${landB.name !== to.name ? ` (${landB.name})` : ""} liegt ${km(d)} km Luftlinie ${lageAdjektiv(grad)} von ${from.name}${landA.name !== from.name ? ` (${landA.name})` : ""}.`}
        tool={<EntfernungsRechner fromId={from.id} toId={to.id} />}
        related={{
          title: "Weitere Entfernungen",
          links: [...weitere, { href: entfernungStadtPath(to), label: `Entfernung ab ${to.name}` }, { href: "/de/entfernung", label: "Alle Städte" }],
        }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "ueberblick", label: "Überblick" },
          { id: "sonne", label: "Sonne" },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="ueberblick">Überblick</h2>
        <div className="conversion-table-wrap">
          <table className="conversion-table city-facts-table">
            <tbody>
              <tr>
                <th scope="row">Luftlinie</th>
                <td>
                  {km1(d)} km ({km1(d / 1.609344)} Meilen)
                </td>
              </tr>
              <tr>
                <th scope="row">Richtung</th>
                <td>
                  {himmelsrichtung(grad)} ({Math.round(grad)}°)
                </td>
              </tr>
              <tr>
                <th scope="row">Bundesländer</th>
                <td>
                  <Link href={`/de/feiertage?land=${landA.slug}`}>{landA.name}</Link>
                  {landA.code !== landB.code && (
                    <>
                      {" "}
                      und <Link href={`/de/feiertage?land=${landB.slug}`}>{landB.name}</Link>
                    </>
                  )}
                </td>
              </tr>
              <tr>
                <th scope="row">Mittelpunkt</th>
                <td>
                  {mid.lat.toFixed(2).replace(".", ",")}° N, {mid.lon.toFixed(2).replace(".", ",")}° O, nahe {nearMid.city.name} ({km(nearMid.km)} km)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="sonne">Sonne in {from.name} und {to.name}</h2>
        <div className="conversion-table-wrap">
          <table className="conversion-table">
            <thead>
              <tr>
                <th scope="col">Stadt</th>
                <th scope="col">Sonnenaufgang</th>
                <th scope="col">Sonnenuntergang</th>
              </tr>
            </thead>
            <tbody>
              {sun.map(({ city, t }) => (
                <tr key={city.id}>
                  <td>{city.name}</td>
                  <td>{t.kind === "normal" ? `${uhr(t.sunrise)} Uhr` : "–"}</td>
                  <td>{t.kind === "normal" ? `${uhr(t.sunset)} Uhr` : "–"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {sunDiff !== null && sunDiff !== 0 && (
          <p>
            In {sunDiff > 0 ? from.name : to.name} geht die Sonne heute etwa {Math.abs(sunDiff)} Minuten früher auf als in {sunDiff > 0 ? to.name : from.name}.
          </p>
        )}
      </TimeToolPage>
    </div>
  );
}
