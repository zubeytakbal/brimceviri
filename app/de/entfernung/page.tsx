import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import EntfernungsRechner from "../../components/de/EntfernungsRechner";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { GEONAMES_SOURCE, germanCities } from "../../converter/geo/germanCities";
import { ENTFERNUNG_HUBS, entfernungStadtPath, findGermanCity, luftlinieKm } from "../../converter/geo/germanDistances";
import { GERMAN_STATES } from "../../converter/time/germanHolidays";
import { buildSiteUrl } from "../../siteConfig";

const path = "/de/entfernung";
const title = "Entfernung zwischen deutschen Städten (Luftlinie)";
const description = `Entfernungsrechner für ${germanCities.length} deutsche Großstädte: Luftlinie in km, Himmelsrichtung und Tabellen ab Berlin, Hamburg, München, Köln und Frankfurt.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "de_DE", type: "website" },
};

const km = (v: number) => Math.round(v).toLocaleString("de-DE");

export default function EntfernungPage() {
  const hubs = ENTFERNUNG_HUBS.map((id) => findGermanCity(id)!);
  let far = { a: germanCities[0], b: germanCities[1], d: 0 };
  for (const a of germanCities) for (const b of germanCities) {
    const d = luftlinieKm(a, b);
    if (d > far.d) far = { a, b, d };
  }
  const faqItems: FaqItem[] = [
    {
      question: "Was ist die Luftlinie?",
      answer: "Die kürzeste Entfernung zwischen zwei Punkten auf der Erdoberfläche, gemessen entlang eines Großkreises. Straßen und Bahnstrecken sind wegen Kurven, Umgehungen und Topografie immer länger.",
    },
    {
      question: "Welche Großstädte liegen am weitesten auseinander?",
      answer: `Unter den ${germanCities.length} Städten hier: ${far.a.name} und ${far.b.name} mit ${km(far.d)} km Luftlinie.`,
    },
    {
      question: "Von welchem Punkt aus wird gemessen?",
      answer: "Von der Koordinate des Stadtzentrums laut GeoNames. Zwischen einzelnen Adressen innerhalb der Städte kann die Entfernung daher um einige Kilometer abweichen.",
    },
  ];
  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: path, label: "Entfernung" },
        ]}
        crumbLabel="Brotkrumen"
        title="Entfernung zwischen deutschen Städten"
        intro={`Zwei Städte wählen und die Luftlinie in Kilometern ablesen. Für jede der ${germanCities.length} Großstädte gibt es außerdem eine Tabelle mit den Entfernungen zu allen anderen.`}
        tool={<EntfernungsRechner />}
        related={{
          title: "Das könnte Sie auch interessieren",
          links: [
            { href: "/de/feiertage", label: "Feiertage nach Bundesland" },
            { href: "/de/pendlerpauschale-rechner", label: "Pendlerpauschale-Rechner" },
            { href: "/de/kraftstoffverbrauchsrechner", label: "Kraftstoffverbrauch berechnen" },
            { href: "/de/kategorien/laenge", label: "Längen umrechnen" },
          ],
        }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "ab", label: "Entfernungen ab den größten Städten" },
          { id: "staedte", label: "Alle Städte nach Bundesland" },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="ab">Entfernungen ab den größten Städten</h2>
        <div className="time-tool-chips">
          {hubs.map((c) => (
            <Link key={c.id} href={entfernungStadtPath(c)} prefetch={false}>
              Entfernung ab {c.name}
            </Link>
          ))}
        </div>

        <h2 id="staedte">Alle Städte nach Bundesland</h2>
        {GERMAN_STATES.map((st) => {
          const list = germanCities.filter((c) => c.land === st.code).sort((a, b) => a.name.localeCompare(b.name, "de"));
          if (!list.length) return null;
          return (
            <p key={st.code}>
              <strong>{st.name}:</strong>{" "}
              {list.map((c, i) => (
                <span key={c.id}>
                  {i > 0 && ", "}
                  <Link href={entfernungStadtPath(c)} prefetch={false}>
                    {c.name}
                  </Link>
                </span>
              ))}
            </p>
          );
        })}
        <p>
          <small>Koordinaten: {GEONAMES_SOURCE}. Luftlinie auf der Kugel mit dem mittleren Erdradius von 6.371 km berechnet.</small>
        </p>
      </TimeToolPage>
    </div>
  );
}
