// Deutscher Kalender: gesetzliche Feiertage (nach Bundesland, aus germanHolidays), kirchliche und
// Brauchtumstage, Aktions- und Gedenktage, Lostage (Bauernregeln), Jahreszeiten und Zeitumstellung.
// Alle Termine werden aus Regeln berechnet (Osterdatum, n-ter Wochentag, Advent, Astronomie) –
// keine jährliche Pflege nötig.
import type { YMD } from "../time/calendars";
import {
  addDaysYmd,
  dayOfYear,
  diffDays,
  nthWeekdayYmd,
  weekdayOf,
  ymdKey,
} from "../time/dateMath";
import {
  easterSunday,
  germanHolidaysCached,
  type StateCode,
} from "../time/germanHolidays";
import { kalenderwoche } from "../time/germanDates";
import { moonState, phaseName, type PhaseName } from "../time/moon";
import { mevsimAni, type Mevsim } from "./astro";
import type { Gorsel } from "./trTakvim";

export type DeKategorie =
  | "feiertag"
  | "brauch"
  | "aktion"
  | "gedenk"
  | "lostag"
  | "natur";

export const DE_KATEGORIE: Record<DeKategorie, string> = {
  feiertag: "Gesetzlicher Feiertag",
  brauch: "Kirchliches Fest & Brauchtum",
  aktion: "Aktions- und Familientag",
  gedenk: "Gedenktag",
  lostag: "Lostag & Bauernregel",
  natur: "Jahreszeit & Zeitumstellung",
};

type Regel =
  | { typ: "fest"; m: number; t: number }
  | { typ: "ostern"; offset: number }
  | { typ: "wochentag"; m: number; wd: number; n: number }
  | { typ: "letzter"; m: number; wd: number }
  | { typ: "advent"; offset: number }
  | { typ: "feiertag"; id: string }
  | { typ: "astro"; olay: Mevsim }
  | { typ: "oktoberfest" };

export type DeTag = {
  id: string;
  name: string;
  kategorie: DeKategorie;
  bild: Gorsel;
  regel: Regel;
  kurz: string;
  info: string;
  /** /de/countdown/<slug> */
  countdown?: string;
  /** Dauer in Tagen (Eisheiligen, Hundstage) – nur für den Text, keine Tagesseiten */
  dauer?: number;
  seit?: number;
  links?: Array<{ href: string; label: string }>;
};

const FEIERTAGE = { href: "/de/feiertage", label: "Feiertage nach Bundesland" };
const BRUECKE = { href: "/de/brueckentage", label: "Brückentage planen" };

export const DE_TAGE: DeTag[] = [
  // Gesetzliche Feiertage
  {
    id: "neujahr",
    name: "Neujahr",
    kategorie: "feiertag",
    bild: "silvester",
    regel: { typ: "feiertag", id: "neujahr" },
    kurz: "Erster Tag des Jahres, bundesweiter Feiertag.",
    info: "Der 1. Januar ist in allen 16 Bundesländern gesetzlicher Feiertag. Der Jahresbeginn am 1. Januar setzte sich in Deutschland im 17. Jahrhundert allgemein durch.",
    countdown: "neujahr",
    links: [FEIERTAGE],
  },
  {
    id: "heilige-drei-koenige",
    name: "Heilige Drei Könige",
    kategorie: "feiertag",
    bild: "stern",
    regel: { typ: "feiertag", id: "heilige-drei-koenige" },
    kurz: "6. Januar, Feiertag in Baden-Württemberg, Bayern und Sachsen-Anhalt.",
    info: "Das Fest Epiphanias erinnert an die Weisen aus dem Morgenland, die dem Stern nach Bethlehem folgten. Sternsinger ziehen um den 6. Januar von Haus zu Haus und schreiben den Segen C+M+B an die Türen. Gesetzlicher Feiertag ist der Tag in Baden-Württemberg, Bayern und Sachsen-Anhalt.",
    links: [FEIERTAGE],
  },
  {
    id: "frauentag",
    name: "Internationaler Frauentag",
    kategorie: "feiertag",
    bild: "cicek",
    regel: { typ: "feiertag", id: "frauentag" },
    kurz: "8. März, Feiertag in Berlin (seit 2019) und Mecklenburg-Vorpommern (seit 2023).",
    info: "Der Internationale Frauentag geht auf die Frauenbewegung Anfang des 20. Jahrhunderts zurück und wird von den Vereinten Nationen seit 1977 begangen. In Berlin ist er seit 2019, in Mecklenburg-Vorpommern seit 2023 gesetzlicher Feiertag.",
    seit: 2019,
    links: [FEIERTAGE],
  },
  {
    id: "karfreitag",
    name: "Karfreitag",
    kategorie: "feiertag",
    bild: "kirche",
    regel: { typ: "feiertag", id: "karfreitag" },
    kurz: "Freitag vor Ostern, bundesweiter stiller Feiertag.",
    info: "Am Karfreitag gedenken Christen der Kreuzigung Jesu. Er ist in allen Bundesländern gesetzlicher Feiertag und ein „stiller Feiertag“: Öffentliche Tanzveranstaltungen sind je nach Landesrecht eingeschränkt.",
    countdown: "ostern",
    links: [FEIERTAGE, BRUECKE],
  },
  {
    id: "ostersonntag",
    name: "Ostersonntag",
    kategorie: "feiertag",
    bild: "ostern",
    regel: { typ: "feiertag", id: "ostersonntag" },
    kurz: "Erster Sonntag nach dem ersten Frühlingsvollmond; zwischen 22. März und 25. April.",
    info: "Ostern ist das höchste Fest der Christen und feiert die Auferstehung Jesu. Es fällt auf den ersten Sonntag nach dem ersten Vollmond im Frühling und liegt deshalb frühestens am 22. März und spätestens am 25. April. Nach dem Osterdatum richten sich Karneval, Himmelfahrt, Pfingsten und Fronleichnam.",
    countdown: "ostern",
    links: [FEIERTAGE],
  },
  {
    id: "ostermontag",
    name: "Ostermontag",
    kategorie: "feiertag",
    bild: "ostern",
    regel: { typ: "feiertag", id: "ostermontag" },
    kurz: "Montag nach Ostern, bundesweiter Feiertag.",
    info: "Der Ostermontag ist in allen Bundesländern gesetzlicher Feiertag. Zusammen mit Karfreitag entsteht ein verlängertes Wochenende von vier Tagen.",
    countdown: "ostern",
    links: [FEIERTAGE, BRUECKE],
  },
  {
    id: "tag-der-arbeit",
    name: "Tag der Arbeit",
    kategorie: "feiertag",
    bild: "isci",
    regel: { typ: "feiertag", id: "tag-der-arbeit" },
    kurz: "1. Mai, bundesweiter Feiertag.",
    info: "Der 1. Mai ist internationaler Kampftag der Arbeiterbewegung und in Deutschland seit 1933 gesetzlicher Feiertag. Am Vorabend wird vielerorts in den Mai getanzt, Maibäume werden aufgestellt.",
    links: [FEIERTAGE, BRUECKE],
  },
  {
    id: "christi-himmelfahrt",
    name: "Christi Himmelfahrt",
    kategorie: "feiertag",
    bild: "kirche",
    regel: { typ: "feiertag", id: "christi-himmelfahrt" },
    kurz: "Donnerstag, 39 Tage nach Ostersonntag; zugleich Vatertag.",
    info: "Christi Himmelfahrt wird 40 Tage nach Ostern (Ostersonntag mitgezählt) gefeiert und fällt immer auf einen Donnerstag. Der Brückentag am Freitag danach ist einer der beliebtesten des Jahres. Am selben Tag wird der Vatertag (Herrentag) begangen.",
    countdown: "vatertag",
    links: [FEIERTAGE, BRUECKE],
  },
  {
    id: "pfingstmontag",
    name: "Pfingsten",
    kategorie: "feiertag",
    bild: "kirche",
    regel: { typ: "feiertag", id: "pfingstmontag" },
    kurz: "Pfingstsonntag und -montag, 49 und 50 Tage nach Ostersonntag.",
    info: "Pfingsten erinnert an die Aussendung des Heiligen Geistes und liegt zwischen dem 10. Mai und dem 14. Juni. Pfingstmontag ist bundesweit gesetzlicher Feiertag, Pfingstsonntag ausdrücklich nur in Brandenburg.",
    countdown: "pfingsten",
    links: [FEIERTAGE],
  },
  {
    id: "fronleichnam",
    name: "Fronleichnam",
    kategorie: "feiertag",
    bild: "kirche",
    regel: { typ: "feiertag", id: "fronleichnam" },
    kurz: "Donnerstag, 60 Tage nach Ostersonntag; Feiertag vor allem im Süden und Westen.",
    info: "Fronleichnam ist ein katholisches Hochfest mit feierlichen Prozessionen. Gesetzlicher Feiertag ist es in Baden-Württemberg, Bayern, Hessen, Nordrhein-Westfalen, Rheinland-Pfalz und im Saarland sowie in einzelnen Gemeinden Sachsens und Thüringens.",
    links: [FEIERTAGE, BRUECKE],
  },
  {
    id: "mariae-himmelfahrt",
    name: "Mariä Himmelfahrt",
    kategorie: "feiertag",
    bild: "kirche",
    regel: { typ: "feiertag", id: "mariae-himmelfahrt" },
    kurz: "15. August, Feiertag im Saarland und in katholischen Gemeinden Bayerns.",
    info: "Mariä Himmelfahrt ist ein katholisches Hochfest. Gesetzlicher Feiertag ist der Tag im Saarland sowie in Bayern in Gemeinden mit überwiegend katholischer Bevölkerung.",
    links: [FEIERTAGE],
  },
  {
    id: "weltkindertag",
    name: "Weltkindertag",
    kategorie: "feiertag",
    bild: "kinder",
    regel: { typ: "feiertag", id: "weltkindertag" },
    kurz: "20. September, in Thüringen seit 2019 gesetzlicher Feiertag.",
    info: "Der Weltkindertag macht auf die Rechte der Kinder aufmerksam. In Deutschland wird er am 20. September begangen und ist in Thüringen seit 2019 gesetzlicher Feiertag.",
    seit: 2019,
    links: [FEIERTAGE],
  },
  {
    id: "tag-der-deutschen-einheit",
    name: "Tag der Deutschen Einheit",
    kategorie: "feiertag",
    bild: "deutschland",
    regel: { typ: "feiertag", id: "tag-der-deutschen-einheit" },
    kurz: "3. Oktober, Nationalfeiertag zur Wiedervereinigung 1990.",
    info: "Am 3. Oktober 1990 trat die DDR der Bundesrepublik bei. Der Tag der Deutschen Einheit ist der einzige durch Bundesrecht (Einigungsvertrag) festgelegte Feiertag und in allen Bundesländern arbeitsfrei.",
    countdown: "tag-der-deutschen-einheit",
    seit: 1990,
    links: [FEIERTAGE, BRUECKE],
  },
  {
    id: "reformationstag",
    name: "Reformationstag",
    kategorie: "feiertag",
    bild: "kirche",
    regel: { typ: "feiertag", id: "reformationstag" },
    kurz: "31. Oktober, Feiertag in neun Bundesländern im Norden und Osten.",
    info: "Am 31. Oktober 1517 veröffentlichte Martin Luther seine 95 Thesen – der Beginn der Reformation. Gesetzlicher Feiertag ist der Tag in Brandenburg, Mecklenburg-Vorpommern, Sachsen, Sachsen-Anhalt und Thüringen sowie seit 2018 in Bremen, Hamburg, Niedersachsen und Schleswig-Holstein.",
    links: [FEIERTAGE],
  },
  {
    id: "allerheiligen",
    name: "Allerheiligen",
    kategorie: "feiertag",
    bild: "kerze",
    regel: { typ: "feiertag", id: "allerheiligen" },
    kurz: "1. November, Feiertag in Baden-Württemberg, Bayern, NRW, Rheinland-Pfalz und im Saarland.",
    info: "An Allerheiligen gedenken Katholiken aller Heiligen; viele besuchen die Gräber ihrer Angehörigen, die mit Kerzen und Gestecken geschmückt werden. Der Tag ist ein stiller Feiertag.",
    links: [FEIERTAGE],
  },
  {
    id: "buss-und-bettag",
    name: "Buß- und Bettag",
    kategorie: "feiertag",
    bild: "kirche",
    regel: { typ: "feiertag", id: "buss-und-bettag" },
    kurz: "Mittwoch vor dem 23. November; gesetzlicher Feiertag nur in Sachsen.",
    info: "Der evangelische Buß- und Bettag liegt elf Tage vor dem ersten Advent. Bundesweit wurde er 1995 zur Finanzierung der Pflegeversicherung als Feiertag gestrichen; nur Sachsen behielt ihn – dort zahlen Arbeitnehmer dafür einen höheren Pflegebeitrag.",
    links: [FEIERTAGE],
  },
  {
    id: "erster-weihnachtstag",
    name: "Weihnachten",
    kategorie: "feiertag",
    bild: "weihnachten",
    regel: { typ: "feiertag", id: "erster-weihnachtstag" },
    kurz: "25. und 26. Dezember, bundesweite Feiertage.",
    info: "Weihnachten feiert die Geburt Jesu. Der 1. und 2. Weihnachtstag sind in allen Bundesländern gesetzliche Feiertage; beschert wird in Deutschland traditionell schon an Heiligabend.",
    countdown: "weihnachten",
    links: [FEIERTAGE, BRUECKE],
  },

  // Kirchliche Feste und Brauchtum
  {
    id: "lichtmess",
    name: "Mariä Lichtmess",
    kategorie: "lostag",
    bild: "kerze",
    regel: { typ: "fest", m: 2, t: 2 },
    kurz: "2. Februar; Lostag und traditionelles Ende der Weihnachtszeit.",
    info: "Mariä Lichtmess, 40 Tage nach Weihnachten, beendete früher die Weihnachtszeit; Kerzen wurden geweiht. Im Bauernjahr war Lichtmess ein wichtiger Lostag: „Ist's zu Lichtmess mild und rein, wird's ein langer Winter sein.“",
  },
  {
    id: "valentinstag",
    name: "Valentinstag",
    kategorie: "aktion",
    bild: "kalp",
    regel: { typ: "fest", m: 2, t: 14 },
    kurz: "14. Februar, Tag der Liebenden.",
    info: "Der Valentinstag geht auf den heiligen Valentin zurück. In Deutschland verbreitete er sich nach dem Zweiten Weltkrieg; Blumen und kleine Geschenke sind üblich. Kein Feiertag.",
    countdown: "valentinstag",
  },
  {
    id: "weiberfastnacht",
    name: "Weiberfastnacht",
    kategorie: "brauch",
    bild: "karneval",
    regel: { typ: "ostern", offset: -52 },
    kurz: "Donnerstag vor Rosenmontag; Beginn des Straßenkarnevals.",
    info: "Mit Weiberfastnacht beginnen die „tollen Tage“ des Straßenkarnevals, vor allem im Rheinland. Traditionell schneiden Frauen Männern die Krawatte ab. Kein gesetzlicher Feiertag, in Karnevalshochburgen aber oft ab mittags arbeitsfrei.",
    countdown: "rosenmontag",
  },
  {
    id: "rosenmontag",
    name: "Rosenmontag",
    kategorie: "brauch",
    bild: "karneval",
    regel: { typ: "ostern", offset: -48 },
    kurz: "48 Tage vor Ostersonntag; Höhepunkt des Karnevals mit großen Umzügen.",
    info: "Am Rosenmontag ziehen die großen Karnevalsumzüge durch Köln, Düsseldorf und Mainz. Der Tag ist kein gesetzlicher Feiertag, in vielen Städten des Rheinlands aber durch Brauch oder Vereinbarung arbeitsfrei.",
    countdown: "rosenmontag",
  },
  {
    id: "aschermittwoch",
    name: "Aschermittwoch",
    kategorie: "brauch",
    bild: "kirche",
    regel: { typ: "ostern", offset: -46 },
    kurz: "Ende des Karnevals und Beginn der 40-tägigen Fastenzeit.",
    info: "Am Aschermittwoch endet die Fastnacht, und die Fastenzeit bis Ostern beginnt (40 Tage ohne die Sonntage). Gläubige empfangen ein Aschenkreuz auf der Stirn.",
  },
  {
    id: "palmsonntag",
    name: "Palmsonntag",
    kategorie: "brauch",
    bild: "kirche",
    regel: { typ: "ostern", offset: -7 },
    kurz: "Sonntag vor Ostern; Beginn der Karwoche.",
    info: "Der Palmsonntag erinnert an den Einzug Jesu in Jerusalem und eröffnet die Karwoche mit Gründonnerstag, Karfreitag und Karsamstag.",
  },
  {
    id: "gruendonnerstag",
    name: "Gründonnerstag",
    kategorie: "brauch",
    bild: "kirche",
    regel: { typ: "ostern", offset: -3 },
    kurz: "Donnerstag vor Ostern; kein gesetzlicher Feiertag.",
    info: "Am Gründonnerstag erinnern Christen an das letzte Abendmahl. Er ist in Deutschland kein gesetzlicher Feiertag; in manchen Bundesländern haben Schulen bereits Osterferien.",
  },
  {
    id: "walpurgisnacht",
    name: "Walpurgisnacht",
    kategorie: "brauch",
    bild: "nevruz",
    regel: { typ: "fest", m: 4, t: 30 },
    kurz: "Nacht zum 1. Mai; Hexenfeste vor allem im Harz.",
    info: "In der Walpurgisnacht treffen sich der Sage nach die Hexen auf dem Brocken im Harz. Heute feiern viele Orte mit Feuern und Festen den „Tanz in den Mai“.",
  },
  {
    id: "muttertag",
    name: "Muttertag",
    kategorie: "aktion",
    bild: "cicek",
    regel: { typ: "wochentag", m: 5, wd: 0, n: 2 },
    kurz: "Zweiter Sonntag im Mai.",
    info: "Der Muttertag wird in Deutschland seit 1923 am zweiten Sonntag im Mai gefeiert. Er ist kein Feiertag; Blumen, Frühstück und Ausflüge mit der Familie sind üblich.",
    countdown: "muttertag",
  },
  {
    id: "vatertag",
    name: "Vatertag",
    kategorie: "aktion",
    bild: "kirche",
    regel: { typ: "ostern", offset: 39 },
    kurz: "An Christi Himmelfahrt; auch Herren- oder Männertag.",
    info: "Der Vatertag fällt in Deutschland immer auf Christi Himmelfahrt, einen gesetzlichen Feiertag. Traditionell ziehen Männergruppen mit Bollerwagen los; heute unternehmen viele Familien einen Ausflug.",
    countdown: "vatertag",
  },
  {
    id: "oktoberfest",
    name: "Oktoberfest (Anstich)",
    kategorie: "brauch",
    bild: "karneval",
    regel: { typ: "oktoberfest" },
    kurz: "Samstag im September; die Wiesn endet am ersten Oktobersonntag oder am 3. Oktober.",
    info: "Das Münchner Oktoberfest beginnt mit dem Anstich um 12 Uhr durch den Oberbürgermeister („O’zapft is!“) und dauert 16 bis 18 Tage. Es geht auf die Hochzeit von Kronprinz Ludwig und Therese im Oktober 1810 zurück.",
    countdown: "oktoberfest",
  },
  {
    id: "erntedank",
    name: "Erntedankfest",
    kategorie: "brauch",
    bild: "ernte",
    regel: { typ: "wochentag", m: 10, wd: 0, n: 1 },
    kurz: "Meist am ersten Sonntag im Oktober.",
    info: "Beim Erntedankfest danken die Kirchen für die Ernte; Altäre werden mit Feldfrüchten, Getreide und Kürbissen geschmückt. Die katholische und evangelische Kirche feiern es in der Regel am ersten Sonntag im Oktober.",
  },
  {
    id: "halloween",
    name: "Halloween",
    kategorie: "aktion",
    bild: "kuerbis",
    regel: { typ: "fest", m: 10, t: 31 },
    kurz: "31. Oktober, Abend vor Allerheiligen.",
    info: "Halloween („All Hallows’ Eve“) ist der Abend vor Allerheiligen. Der aus Irland und den USA stammende Brauch mit Kürbissen, Verkleidung und „Süßes oder Saures“ ist in Deutschland seit den 1990er-Jahren verbreitet. In einigen Bundesländern fällt er mit dem Reformationstag zusammen.",
    countdown: "halloween",
  },
  {
    id: "martinstag",
    name: "Sankt Martin",
    kategorie: "brauch",
    bild: "laterne",
    regel: { typ: "fest", m: 11, t: 11 },
    kurz: "11. November; Laternenumzüge und Martinsgans – und Beginn der Karnevalssession um 11:11 Uhr.",
    info: "Am Martinstag erinnern Laternenumzüge an den heiligen Martin, der seinen Mantel mit einem Bettler teilte. Traditionell gibt es Martinsgans und Weckmänner. Um 11:11 Uhr beginnt im Rheinland zugleich die neue Karnevalssession.",
    countdown: "martinstag",
  },
  {
    id: "volkstrauertag",
    name: "Volkstrauertag",
    kategorie: "gedenk",
    bild: "kerze",
    regel: { typ: "advent", offset: -14 },
    kurz: "Zwei Sonntage vor dem ersten Advent; Gedenken an die Opfer von Krieg und Gewaltherrschaft.",
    info: "Am Volkstrauertag gedenkt Deutschland der Kriegstoten und der Opfer von Gewaltherrschaft aller Nationen. Die zentrale Gedenkstunde findet im Bundestag statt; der Tag ist in allen Ländern ein stiller Tag.",
  },
  {
    id: "totensonntag",
    name: "Totensonntag",
    kategorie: "brauch",
    bild: "kerze",
    regel: { typ: "advent", offset: -7 },
    kurz: "Letzter Sonntag vor dem ersten Advent (Ewigkeitssonntag).",
    info: "Am Totensonntag, auch Ewigkeitssonntag, gedenken evangelische Christen der Verstorbenen. Er beschließt das Kirchenjahr und ist ein stiller Tag; vielerorts öffnen Weihnachtsmärkte erst danach.",
  },
  {
    id: "erster-advent",
    name: "1. Advent",
    kategorie: "brauch",
    bild: "advent",
    regel: { typ: "advent", offset: 0 },
    kurz: "Vierter Sonntag vor Weihnachten, zwischen dem 27. November und dem 3. Dezember.",
    info: "Mit dem ersten Advent beginnt das Kirchenjahr und die Vorweihnachtszeit. An jedem der vier Adventssonntage wird eine weitere Kerze am Adventskranz angezündet; der Adventskranz geht auf Johann Hinrich Wichern (1839) zurück.",
    countdown: "erster-advent",
  },
  {
    id: "nikolaus",
    name: "Nikolaustag",
    kategorie: "brauch",
    bild: "stern",
    regel: { typ: "fest", m: 12, t: 6 },
    kurz: "6. Dezember; Kinder stellen am Vorabend ihre Stiefel vor die Tür.",
    info: "Der Nikolaustag erinnert an den heiligen Nikolaus von Myra (im Süden der heutigen Türkei), der als Wohltäter der Kinder gilt. Am Abend des 5. Dezember stellen Kinder ihre geputzten Stiefel vor die Tür.",
    countdown: "nikolaus",
  },
  {
    id: "heiligabend",
    name: "Heiligabend",
    kategorie: "brauch",
    bild: "weihnachten",
    regel: { typ: "fest", m: 12, t: 24 },
    kurz: "24. Dezember; kein gesetzlicher Feiertag, aber meist ab mittags frei.",
    info: "An Heiligabend findet in Deutschland die Bescherung statt. Er ist kein gesetzlicher Feiertag; Geschäfte schließen um 14 Uhr, und viele Arbeitnehmer haben durch Tarif- oder Arbeitsvertrag ganz oder halb frei.",
    countdown: "weihnachten",
  },
  {
    id: "silvester",
    name: "Silvester",
    kategorie: "brauch",
    bild: "silvester",
    regel: { typ: "fest", m: 12, t: 31 },
    kurz: "31. Dezember; letzter Tag des Jahres, kein gesetzlicher Feiertag.",
    info: "Silvester ist nach Papst Silvester I. benannt. Um Mitternacht wird das neue Jahr mit Feuerwerk begrüßt; Bleigießen (heute Wachsgießen) und „Dinner for One“ gehören zu den Bräuchen. Der Tag ist kein gesetzlicher Feiertag.",
    countdown: "silvester",
  },

  // Gedenktage
  {
    id: "holocaust-gedenktag",
    name: "Tag des Gedenkens an die Opfer des Nationalsozialismus",
    kategorie: "gedenk",
    bild: "kerze",
    regel: { typ: "fest", m: 1, t: 27 },
    kurz: "27. Januar, Jahrestag der Befreiung des KZ Auschwitz 1945.",
    info: "Am 27. Januar 1945 befreite die Rote Armee das Konzentrations- und Vernichtungslager Auschwitz. Seit 1996 ist der Tag in Deutschland offizieller Gedenktag; die Vereinten Nationen begehen ihn seit 2005 als Internationalen Holocaust-Gedenktag.",
    seit: 1996,
  },
  {
    id: "mauerfall",
    name: "Tag des Mauerfalls",
    kategorie: "gedenk",
    bild: "deutschland",
    regel: { typ: "fest", m: 11, t: 9 },
    kurz: "9. November; Fall der Berliner Mauer 1989 – und „Schicksalstag“ der deutschen Geschichte.",
    info: "Am 9. November 1989 öffnete sich die Berliner Mauer. Das Datum gilt als Schicksalstag: 1918 wurde die Republik ausgerufen, 1938 fanden die Novemberpogrome statt. Deshalb ist der 9. November kein Feiertag, sondern ein Gedenktag.",
  },

  // Lostage und Bauernregeln
  {
    id: "eisheiligen",
    name: "Eisheiligen",
    kategorie: "lostag",
    bild: "kis",
    regel: { typ: "fest", m: 5, t: 11 },
    dauer: 5,
    kurz: "11. bis 15. Mai; danach gilt Frost als unwahrscheinlich.",
    info: "Die Eisheiligen Mamertus (11.), Pankratius (12.), Servatius (13.), Bonifatius (14.) und die „kalte Sophie“ (15. Mai) markieren nach alter Bauernregel die letzten Frostnächte. Gärtner pflanzen empfindliche Pflanzen deshalb erst danach aus. Im Norden zählt man meist nur die ersten drei.",
  },
  {
    id: "schafskaelte",
    name: "Schafskälte",
    kategorie: "lostag",
    bild: "kurban",
    regel: { typ: "fest", m: 6, t: 11 },
    kurz: "Kälteeinbruch zwischen dem 4. und 20. Juni, häufig um den 11. Juni.",
    info: "Die Schafskälte ist ein Kaltlufteinbruch im Juni, der statistisch recht zuverlässig auftritt. Der Name stammt daher, dass die Schafe zu dieser Zeit bereits geschoren sind und frieren.",
  },
  {
    id: "siebenschlaefer",
    name: "Siebenschläfertag",
    kategorie: "lostag",
    bild: "yaz",
    regel: { typ: "fest", m: 6, t: 27 },
    kurz: "27. Juni; „wie das Wetter am Siebenschläfertag, so bleibt es sieben Wochen danach“.",
    info: "Der Name geht auf die Legende von sieben Christen zurück, die in einer Höhle bei Ephesus fast 200 Jahre geschlafen haben sollen. Meteorologisch ist an der Regel etwas dran: Die Wetterlage um Ende Juni bis Anfang Juli (wegen der Kalenderreform eher um den 7. Juli) bleibt oft wochenlang stabil.",
  },
  {
    id: "hundstage",
    name: "Hundstage",
    kategorie: "lostag",
    bild: "yaz",
    regel: { typ: "fest", m: 7, t: 23 },
    dauer: 32,
    kurz: "23. Juli bis 23. August, die heißeste Zeit des Jahres.",
    info: "Die Hundstage sind nach dem Hundsstern Sirius im Sternbild Großer Hund benannt, der in der Antike um diese Zeit am Morgenhimmel wieder sichtbar wurde. Sie gelten als heißeste Wochen des Sommers.",
  },

  // Jahreszeiten und Zeitumstellung
  {
    id: "fruehlingsanfang",
    name: "Frühlingsanfang",
    kategorie: "natur",
    bild: "ilkbahar",
    regel: { typ: "astro", olay: "mart-ekinoksu" },
    kurz: "Astronomischer Frühlingsbeginn zur Tagundnachtgleiche im März.",
    info: "Zum astronomischen Frühlingsanfang überquert die Sonne den Himmelsäquator nach Norden; Tag und Nacht sind etwa gleich lang. Meteorologisch beginnt der Frühling schon am 1. März.",
  },
  {
    id: "sommerzeit",
    name: "Zeitumstellung auf Sommerzeit",
    kategorie: "natur",
    bild: "uhr",
    regel: { typ: "letzter", m: 3, wd: 0 },
    kurz: "Letzter Sonntag im März: Uhren um 2 Uhr eine Stunde vor auf 3 Uhr.",
    info: "In der Nacht zum letzten Sonntag im März werden die Uhren von 2 auf 3 Uhr vorgestellt (MEZ → MESZ); die Nacht ist eine Stunde kürzer. Grundlage ist die EU-Richtlinie 2000/84/EG. Die 2019 vom EU-Parlament beschlossene Abschaffung wurde bisher nicht umgesetzt.",
  },
  {
    id: "sommeranfang",
    name: "Sommeranfang",
    kategorie: "natur",
    bild: "yaz",
    regel: { typ: "astro", olay: "haziran-gundonumu" },
    kurz: "Sommersonnenwende: längster Tag des Jahres.",
    info: "Zur Sommersonnenwende steht die Sonne mittags am höchsten; es ist der längste Tag und die kürzeste Nacht des Jahres. Meteorologisch beginnt der Sommer am 1. Juni.",
  },
  {
    id: "herbstanfang",
    name: "Herbstanfang",
    kategorie: "natur",
    bild: "sonbahar",
    regel: { typ: "astro", olay: "eylul-ekinoksu" },
    kurz: "Tagundnachtgleiche im September; danach sind die Nächte länger als die Tage.",
    info: "Zum astronomischen Herbstanfang überquert die Sonne den Himmelsäquator nach Süden. Meteorologisch beginnt der Herbst am 1. September.",
  },
  {
    id: "winterzeit",
    name: "Zeitumstellung auf Winterzeit",
    kategorie: "natur",
    bild: "uhr",
    regel: { typ: "letzter", m: 10, wd: 0 },
    kurz: "Letzter Sonntag im Oktober: Uhren um 3 Uhr eine Stunde zurück auf 2 Uhr.",
    info: "In der Nacht zum letzten Sonntag im Oktober werden die Uhren von 3 auf 2 Uhr zurückgestellt (MESZ → MEZ); die Nacht ist eine Stunde länger. Die Winterzeit ist die eigentliche Normalzeit (MEZ).",
  },
  {
    id: "winteranfang",
    name: "Winteranfang",
    kategorie: "natur",
    bild: "kis",
    regel: { typ: "astro", olay: "aralik-gundonumu" },
    kurz: "Wintersonnenwende: kürzester Tag des Jahres.",
    info: "Zur Wintersonnenwende erreicht die Sonne ihren tiefsten Mittagsstand; es ist der kürzeste Tag des Jahres. Danach werden die Tage wieder länger. Meteorologisch beginnt der Winter am 1. Dezember.",
  },
];

export const findDeTag = (id: string) =>
  DE_TAGE.find((t) => t.id === id) ?? null;

const BERLIN = (d: Date) => {
  const s = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
  const [year, month, day] = s.split("-").map(Number);
  return { year, month, day };
};

/** Erster Advent: vierter Sonntag vor dem 25. Dezember. */
export function ersterAdvent(year: number): YMD {
  const x = { year, month: 12, day: 24 };
  return addDaysYmd(x, -weekdayOf(x) - 21);
}

export type DeTermin = {
  tag: DeTag;
  datum: YMD;
  bis?: YMD;
  zeit?: Date;
  laender?: StateCode[];
  teilweise?: StateCode[];
};

export function deTermine(tag: DeTag, year: number): DeTermin[] {
  if (tag.seit && year < tag.seit) return [];
  const r = tag.regel;
  switch (r.typ) {
    case "fest":
      return [
        {
          tag,
          datum: { year, month: r.m, day: r.t },
          ...(tag.dauer
            ? { bis: addDaysYmd({ year, month: r.m, day: r.t }, tag.dauer - 1) }
            : {}),
        },
      ];
    case "ostern":
      return [{ tag, datum: addDaysYmd(easterSunday(year), r.offset) }];
    case "wochentag":
      return [{ tag, datum: nthWeekdayYmd(year, r.m, r.wd, r.n) }];
    case "letzter":
      return [{ tag, datum: nthWeekdayYmd(year, r.m, r.wd, -1) }];
    case "advent":
      return [{ tag, datum: addDaysYmd(ersterAdvent(year), r.offset) }];
    case "oktoberfest": {
      // Ende: erster Sonntag im Oktober, oder der 3. Oktober, wenn dieser später liegt
      const sonntag = nthWeekdayYmd(year, 10, 0, 1);
      const ende = sonntag.day < 3 ? { year, month: 10, day: 3 } : sonntag;
      return [{ tag, datum: addDaysYmd(sonntag, -15), bis: ende }];
    }
    case "astro": {
      const an = mevsimAni(year, r.olay);
      return [{ tag, datum: BERLIN(an), zeit: an }];
    }
    case "feiertag": {
      const h = germanHolidaysCached(year).find((x) => x.id === r.id);
      if (!h) return [];
      // Weihnachten und Pfingsten: beide Tage als Zeitraum
      const bis =
        r.id === "erster-weihnachtstag"
          ? { year, month: 12, day: 26 }
          : undefined;
      const datum = r.id === "pfingstmontag" ? addDaysYmd(h.date, -1) : h.date;
      return [
        {
          tag,
          datum,
          bis: bis ?? (r.id === "pfingstmontag" ? h.date : undefined),
          laender: h.states,
          teilweise: h.partialStates,
        },
      ];
    }
  }
}

export const deJahresTermine = (year: number) =>
  DE_TAGE.flatMap((t) => deTermine(t, year)).sort((a, b) =>
    ymdKey(a.datum).localeCompare(ymdKey(b.datum)),
  );

const cache = new Map<number, Map<string, DeTermin[]>>();

/** Tag → Termine (mehrtägige nur bei Feiertagen wie Weihnachten/Pfingsten; Eisheiligen/Hundstage nur am ersten Tag). */
export function deTagesKarte(year: number) {
  let m = cache.get(year);
  if (m) return m;
  m = new Map();
  for (const t of deJahresTermine(year)) {
    const bis = t.tag.kategorie === "feiertag" && t.bis ? t.bis : t.datum;
    for (let d = t.datum; diffDays(d, bis) >= 0; d = addDaysYmd(d, 1))
      m.set(ymdKey(d), [...(m.get(ymdKey(d)) ?? []), t]);
  }
  cache.set(year, m);
  return m;
}

export const DE_MONATE = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];
export const DE_MONAT_SLUG = [
  "januar",
  "februar",
  "maerz",
  "april",
  "mai",
  "juni",
  "juli",
  "august",
  "september",
  "oktober",
  "november",
  "dezember",
];
export const DE_WOCHENTAGE = [
  "Sonntag",
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
];
export const DE_JAHRE = [2026, 2027, 2028];

export const deJahrPfad = (y: number) => `/de/kalender/${y}`;
export const deMonatPfad = (y: number, m: number) =>
  `/de/kalender/${y}/${DE_MONAT_SLUG[m - 1]}`;
/** Keine Tagesseiten: der Tag steht in der Monatsliste unter #tag-N. */
export const deTagPfad = (d: YMD) =>
  `/de/kalender/${d.year}/${DE_MONAT_SLUG[d.month - 1]}#tag-${d.day}`;
/** Besondere Tage stehen auf einer Seite; jeder Tag hat seinen Abschnitt. */
export const deBesondererTagPfad = (id: string) => `/de/besondere-tage#${id}`;

export const DE_MONDPHASE: Record<PhaseName, string> = {
  new: "Neumond",
  "waxing-crescent": "Zunehmende Sichel",
  first: "Erstes Viertel",
  "waxing-gibbous": "Zunehmender Mond",
  full: "Vollmond",
  "waning-gibbous": "Abnehmender Mond",
  last: "Letztes Viertel",
  "waning-crescent": "Abnehmende Sichel",
};

export function deTagInfo(d: YMD) {
  const mond = moonState(new Date(Date.UTC(d.year, d.month - 1, d.day, 10)));
  const kw = kalenderwoche(d);
  const tage = diffDays(
    { year: d.year, month: 1, day: 1 },
    { year: d.year + 1, month: 1, day: 1 },
  );
  const doy = dayOfYear(d);
  return {
    wochentag: DE_WOCHENTAGE[weekdayOf(d)],
    kw: kw.week,
    kwJahr: kw.year,
    tagImJahr: doy,
    restTage: tage - doy,
    mond: DE_MONDPHASE[phaseName(mond.age)],
    mondHell: mond.illumination,
    termine: deTagesKarte(d.year).get(ymdKey(d)) ?? [],
  };
}

/** Tage mit eigener Seite: mindestens ein Termin. */
export function deBelegteTage(year: number): YMD[] {
  return [...deTagesKarte(year).keys()].sort().map((k) => {
    const [y, m, t] = k.split("-").map(Number);
    return { year: y, month: m, day: t };
  });
}

export function deNaechster(tag: DeTag, ab: YMD): DeTermin | null {
  for (let y = ab.year; y <= ab.year + 2; y += 1) {
    const t = deTermine(tag, y).find(
      (x) => ymdKey(x.bis ?? x.datum) >= ymdKey(ab),
    );
    if (t) return t;
  }
  return null;
}
