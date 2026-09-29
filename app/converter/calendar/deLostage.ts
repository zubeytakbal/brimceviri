// Lostage und Bauernregeln: feste Kalendertage des Bauernjahres, an denen nach alter Überlieferung
// das Wetter der folgenden Wochen „gelost“ wurde. Die Sprüche sind überliefert; ihr Wortlaut
// variiert regional. Keine Wettervorhersage.
import type { YMD } from "../time/calendars";
import { diffDays } from "../time/dateMath";

export type Lostag = {
  m: number;
  t: number;
  name: string;
  regel: string;
  besondererTag?: string;
};

export const LOSTAGE: Lostag[] = [
  {
    m: 1,
    t: 6,
    name: "Heilige Drei Könige",
    regel: "Ist bis Dreikönig kein Winter, kommt keiner mehr dahinter.",
    besondererTag: "heilige-drei-koenige",
  },
  {
    m: 2,
    t: 2,
    name: "Mariä Lichtmess",
    regel:
      "Wenn's an Lichtmess stürmt und schneit, ist der Frühling nicht mehr weit.",
    besondererTag: "lichtmess",
  },
  {
    m: 2,
    t: 24,
    name: "Matthias",
    regel: "Matthias bricht's Eis; hat er keins, so macht er eins.",
  },
  {
    m: 5,
    t: 11,
    name: "Eisheiligen (11.–15. Mai)",
    regel: "Pankraz, Servaz, Bonifaz machen erst dem Sommer Platz.",
    besondererTag: "eisheiligen",
  },
  {
    m: 5,
    t: 25,
    name: "Urban",
    regel:
      "Wie's Wetter sich an Urban verhält, so ist's noch zwanzig Tage bestellt.",
  },
  {
    m: 6,
    t: 8,
    name: "Medardus",
    regel:
      "Was Sankt Medardus für Wetter hält, solch Wetter auch in die Ernte fällt.",
  },
  {
    m: 6,
    t: 11,
    name: "Schafskälte",
    regel:
      "Kaltlufteinbruch um die Junimitte, wenn die Schafe frisch geschoren sind.",
    besondererTag: "schafskaelte",
  },
  {
    m: 6,
    t: 24,
    name: "Johanni",
    regel: "Wie's Wetter am Johanni war, so bleibt's wohl 40 Tage gar.",
  },
  {
    m: 6,
    t: 27,
    name: "Siebenschläfer",
    regel: "Das Wetter am Siebenschläfertag sieben Wochen bleiben mag.",
    besondererTag: "siebenschlaefer",
  },
  {
    m: 7,
    t: 23,
    name: "Beginn der Hundstage",
    regel: "Hundstage hell und klar zeigen an ein gutes Jahr.",
    besondererTag: "hundstage",
  },
  {
    m: 8,
    t: 10,
    name: "Laurentius",
    regel: "Laurentius heiter und gut, einen schönen Herbst verheißen tut.",
  },
  {
    m: 8,
    t: 24,
    name: "Bartholomäus",
    regel: "Wie Bartholomäus sich hält, so ist der ganze Herbst bestellt.",
  },
  {
    m: 9,
    t: 8,
    name: "Mariä Geburt",
    regel: "Zu Mariä Geburt fliegen die Schwalben furt.",
  },
  {
    m: 9,
    t: 29,
    name: "Michaeli",
    regel: "Regnet's am Michaelitag, sanft der Winter werden mag.",
  },
  {
    m: 11,
    t: 1,
    name: "Allerheiligen",
    regel: "Allerheiligen Reif macht zu Weihnachten alles steif.",
    besondererTag: "allerheiligen",
  },
  {
    m: 11,
    t: 11,
    name: "Martini",
    regel: "Hat Martini einen weißen Bart, wird der Winter lang und hart.",
    besondererTag: "martinstag",
  },
  {
    m: 11,
    t: 25,
    name: "Katharina",
    regel:
      "Kathrein stellt den Tanz ein – letzte Feste vor der stillen Adventszeit.",
  },
  {
    m: 12,
    t: 4,
    name: "Barbara",
    regel: "Zweige schneiden zu Sankt Barbara, Blüten sind bis Weihnacht da.",
  },
  {
    m: 12,
    t: 13,
    name: "Lucia",
    regel: "Sankt Luzia kürzt den Tag, so viel sie ihn kürzen mag.",
  },
  {
    m: 12,
    t: 21,
    name: "Thomas",
    regel: "Sankt Thomas bringt die längste Nacht.",
  },
  {
    m: 12,
    t: 25,
    name: "Weihnachten",
    regel: "Grüne Weihnachten, weiße Ostern.",
    besondererTag: "erster-weihnachtstag",
  },
];

/** Heutiger oder nächster Lostag (mit Datum im laufenden bzw. nächsten Jahr). */
export function naechsteLostage(heute: YMD, n: number) {
  const out: Array<{ l: Lostag; datum: YMD; rest: number }> = [];
  for (const y of [heute.year, heute.year + 1]) {
    for (const l of LOSTAGE) {
      const datum = { year: y, month: l.m, day: l.t };
      const rest = diffDays(heute, datum);
      if (rest >= 0) out.push({ l, datum, rest });
    }
  }
  return out.slice(0, n);
}
