import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/app/components/SiteLink";
import EntfernungsRechner from "../../../components/de/EntfernungsRechner";
import TimeToolPage from "../../../components/time/TimeToolPage";
import type { FaqItem } from "../../../converter/faqSchema";
import { GEONAMES_SOURCE, germanCities } from "../../../converter/geo/germanCities";
import { entfernungenAb, entfernungPaarPath, entfernungStadtPath, findGermanCity, himmelsrichtung } from "../../../converter/geo/germanDistances";
import { GERMAN_STATES } from "../../../converter/time/germanHolidays";
import { seoTitle } from "../../../seoTitle";
import { buildSiteUrl } from "../../../siteConfig";

export const dynamicParams = false;

type PageProps = { params: Promise<{ stadt: string }> };

export function generateStaticParams() {
  return germanCities.map((c) => ({ stadt: c.id }));
}

const km = (v: number) => Math.round(v).toLocaleString("de-DE");
const landOf = (code: string) => GERMAN_STATES.find((s) => s.code === code)!;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const city = findGermanCity((await params).stadt);
  if (!city) return {};
  const rows = entfernungenAb(city);
  const path = entfernungStadtPath(city);
  const title = `Entfernung von ${city.name} zu ${rows.length} Großstädten (Luftlinie)`;
  const description = `Luftlinie von ${city.name} nach ${rows
    .slice(0, 3)
    .map((r) => `${r.city.name} (${km(r.km)} km)`)
    .join(", ")} und zu allen anderen deutschen Großstädten, mit Himmelsrichtung.`;
  return {
    title: seoTitle(title, `Entfernung ab ${city.name}: Luftlinie in km`),
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "de_DE", type: "website" },
  };
}

export default async function EntfernungStadtPage({ params }: PageProps) {
  const city = findGermanCity((await params).stadt);
  if (!city) notFound();
  const rows = entfernungenAb(city);
  const nearest = rows.slice(0, 5);
  const farthest = rows[rows.length - 1];
  const land = landOf(city.land);
  const sameLand = rows.filter((r) => r.city.land === city.land);

  const faqItems: FaqItem[] = [
    {
      question: `Welche Großstadt liegt am nächsten an ${city.name}?`,
      answer: `${nearest[0].city.name} mit ${km(nearest[0].km)} km Luftlinie, danach ${nearest[1].city.name} (${km(nearest[1].km)} km) und ${nearest[2].city.name} (${km(nearest[2].km)} km).`,
    },
    {
      question: `Welche Großstadt ist am weitesten von ${city.name} entfernt?`,
      answer: `${farthest.city.name} mit ${km(farthest.km)} km Luftlinie in Richtung ${himmelsrichtung(farthest.grad)}.`,
    },
    {
      question: "Warum ist die Strecke mit dem Auto länger?",
      answer: "Die Luftlinie ist die kürzeste Verbindung über die Erdoberfläche. Straßen folgen dem Gelände, umfahren Orte und Gewässer; die tatsächliche Fahrstrecke ist deshalb immer länger. Für die genaue Route nutzen Sie einen Routenplaner.",
    },
  ];

  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: "/de/entfernung", label: "Entfernung" },
          { href: entfernungStadtPath(city), label: city.name },
        ]}
        crumbLabel="Brotkrumen"
        title={`Entfernung von ${city.name}`}
        intro={`Luftlinie von ${city.name}${land.name !== city.name ? ` (${land.name})` : ""} zu ${rows.length} deutschen Großstädten, sortiert nach Entfernung. Die nächste ist ${nearest[0].city.name} mit ${km(nearest[0].km)} km, die entfernteste ${farthest.city.name} mit ${km(farthest.km)} km.`}
        tool={<EntfernungsRechner fromId={city.id} toId={nearest[0].city.id} />}
        related={{
          title: "Das könnte Sie auch interessieren",
          links: [
            ...nearest.map((r) => ({ href: entfernungStadtPath(r.city), label: `Entfernung ab ${r.city.name}` })),
            { href: `/de/feiertage/${land.slug}`, label: `Feiertage ${land.name}` },
            { href: "/de/entfernung", label: "Alle Städte" },
          ],
        }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "naechste", label: "Die nächsten Großstädte" },
          { id: "tabelle", label: `Entfernungstabelle ab ${city.name}` },
          ...(sameLand.length ? [{ id: "bundesland", label: `Großstädte in ${land.name}` }] : []),
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="naechste">Die nächsten Großstädte</h2>
        <ul>
          {nearest.map((r) => (
            <li key={r.city.id}>
              {r.city.name}: {km(r.km)} km Richtung {himmelsrichtung(r.grad)}
            </li>
          ))}
        </ul>

        <h2 id="tabelle">Entfernungstabelle ab {city.name}</h2>
        <div className="conversion-table-wrap">
          <table className="conversion-table">
            <thead>
              <tr>
                <th scope="col">Nach</th>
                <th scope="col">Luftlinie</th>
                <th scope="col">Richtung</th>
                <th scope="col">Bundesland</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const pair = entfernungPaarPath(city, r.city);
                return (
                  <tr key={r.city.id}>
                    <td>
                      <Link href={pair ?? entfernungStadtPath(r.city)} prefetch={false}>
                        {r.city.name}
                      </Link>
                    </td>
                    <td>{km(r.km)} km</td>
                    <td>{himmelsrichtung(r.grad)}</td>
                    <td>{landOf(r.city.land).short}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {sameLand.length > 0 && (
          <>
            <h2 id="bundesland">Großstädte in {land.name}</h2>
            <p>
              {sameLand.map((r, i) => (
                <span key={r.city.id}>
                  {i > 0 && ", "}
                  {r.city.name} ({km(r.km)} km)
                </span>
              ))}
            </p>
          </>
        )}
        <p>
          <small>
            Koordinaten des Stadtzentrums: {GEONAMES_SOURCE}. Luftlinie auf der Kugel (mittlerer Erdradius 6.371 km); zwischen einzelnen Adressen kann
            die Entfernung um einige Kilometer abweichen.
          </small>
        </p>
      </TimeToolPage>
    </div>
  );
}
