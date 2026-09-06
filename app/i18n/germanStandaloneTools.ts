export type GermanStandaloneToolComponentKey =
  | "paintCalculator"
  | "tileCalculator"
  | "brickCalculator"
  | "dateCalculator"
  | "vatCalculator"
  | "bmiCalculator"
  | "pregnancyCalculator"
  | "lengthComparison"
  | "weightComparison"
  | "paceCalculator"
  | "acCapacityCalculator"
  | "electricityConsumptionCalculator"
  | "sleepCalculator";

export type GermanStandaloneTool = {
  slug: string;
  germanPath: string;
  turkishPath: string;
  title: string;
  description: string;
  intro: string;
  component: GermanStandaloneToolComponentKey;
  iconName:
    | "paintCalculator"
    | "tileCalculator"
    | "brickCalculator"
    | "dateCalculator"
    | "vatCalculator"
    | "bmiCalculator"
    | "pregnancyCalculator"
    | "length"
    | "mass"
    | "paceCalculator"
    | "acCapacityCalculator"
    | "electricityConsumptionCalculator"
    | "sleepCalculator";
  cardDescription: string;
  articleSections: Array<{
    title: string;
    body: string;
  }>;
  priority: number;
};

export const germanStandaloneTools: GermanStandaloneTool[] = [
  {
    slug: "farbrechner",
    germanPath: "/de/farbrechner",
    turkishPath: "/boya-hesaplama",
    title: "Farbrechner",
    description:
      "Berechnen Sie aus Raumabmessungen, Tueren, Fenstern und Anstrichen die benoetigte Farbmenge.",
    intro:
      "Geben Sie die Masse des Raums ein und sehen Sie sofort die Netto-Wandflaeche, die gesamte Streichflaeche und eine sinnvolle Eimerkombination.",
    component: "paintCalculator",
    iconName: "paintCalculator",
    cardDescription:
      "Berechnet Wandflaeche, Decke und benoetigte Farbmenge fuer einen Raum.",
    articleSections: [
      {
        title: "Was berechnet der Farbrechner?",
        body: "Das Tool zieht Tueren und Fenster von der Wandflaeche ab, multipliziert die Zieloberflaeche mit der Anzahl der Anstriche und zeigt die benoetigten Liter auf Basis der gewaehlten Deckkraft an.",
      },
      {
        title: "Wann ist das hilfreich?",
        body: "Vor dem Kauf von Farbe vermeiden Sie damit zu kleine oder zu grosse Mengen und koennen leichter abschaetzen, ob 2,5-Liter- oder 10-Liter-Eimer besser passen.",
      },
    ],
    priority: 0.7,
  },
  {
    slug: "fliesenrechner",
    germanPath: "/de/fliesenrechner",
    turkishPath: "/fayans-hesaplama",
    title: "Fliesenrechner",
    description:
      "Berechnen Sie die benoetigte Anzahl Fliesen inklusive Verschnitt anhand von Flaeche und Fliesengroesse.",
    intro:
      "Tragen Sie Flaeche, Fliesenbreite, Fliesenhoehe und Verschnitt ein, um sofort den Materialbedarf zu sehen.",
    component: "tileCalculator",
    iconName: "tileCalculator",
    cardDescription:
      "Berechnet Fliesenbedarf auf Basis von Flaeche, Format und Verschnitt.",
    articleSections: [
      {
        title: "Warum ist Verschnitt wichtig?",
        body: "Beim Schneiden an Kanten, Nischen und Ecken gehen fast immer Teilstuecke verloren. Darum ist ein realistischer Verschnitt bei der Bestellung entscheidend.",
      },
      {
        title: "Wie nutzt man die Ausgabe?",
        body: "Die benoetigte Fliesenanzahl laesst sich direkt mit den Packungsinhalten Ihres Haendlers abgleichen, um die passende Kartonanzahl zu bestimmen.",
      },
    ],
    priority: 0.7,
  },
  {
    slug: "ziegelrechner",
    germanPath: "/de/ziegelrechner",
    turkishPath: "/tugla-hesaplama",
    title: "Ziegelrechner",
    description:
      "Berechnen Sie den Ziegelbedarf inklusive Fugenstaerke und Verschnitt fuer eine Wandflaeche.",
    intro:
      "Mit Wandflaeche, Ziegelformat, Fugenstaerke und Reserve ermitteln Sie schnell den ungefaehren Materialbedarf.",
    component: "brickCalculator",
    iconName: "brickCalculator",
    cardDescription:
      "Berechnet den Bedarf an Ziegeln fuer Mauern mit Fuge und Reserve.",
    articleSections: [
      {
        title: "Was beruecksichtigt der Rechner?",
        body: "Die Fugenstaerke vergroessert die belegte Flaeche pro Stein. Dadurch veraendert sich die benoetigte Gesamtanzahl deutlich gegenueber einer reinen Nennmass-Rechnung.",
      },
      {
        title: "Fuer wen ist das sinnvoll?",
        body: "Das Tool eignet sich fuer grobe Vorplanung vor Angebotsanfragen, Materiallisten oder einem ersten Mengenabgleich mit dem Bauunternehmen.",
      },
    ],
    priority: 0.7,
  },
  {
    slug: "altersrechner",
    germanPath: "/de/altersrechner",
    turkishPath: "/yas-hesaplama",
    title: "Altersrechner",
    description:
      "Berechnen Sie das genaue Alter oder die Differenz zwischen zwei Daten in Jahren, Monaten und Tagen.",
    intro:
      "Das Tool zeigt neben der exakten Zeitspanne auch Gesamtwerte in Tagen, Wochen und Monaten.",
    component: "dateCalculator",
    iconName: "dateCalculator",
    cardDescription:
      "Zeigt Alters- oder Datumsdifferenzen mit Jahren, Monaten, Tagen und Summenwerten.",
    articleSections: [
      {
        title: "Warum nicht nur Tage zaehlen?",
        body: "Fuer viele Anwendungsfaelle ist die Darstellung als Jahre, Monate und Tage verstaendlicher als eine reine Tageszahl, etwa bei Alter, Vertragslaufzeiten oder Fristen.",
      },
      {
        title: "Welche Zusatzinfo gibt es?",
        body: "Sie sehen ausserdem, wann der naechste Jahrestag liegt und wie viele Tage bis dahin verbleiben.",
      },
    ],
    priority: 0.75,
  },
  {
    slug: "mehrwertsteuer-rechner",
    germanPath: "/de/mehrwertsteuer-rechner",
    turkishPath: "/kdv-hesaplama",
    title: "Mehrwertsteuer Rechner",
    description:
      "Rechnen Sie Netto, Steuerbetrag und Brutto schnell in beide Richtungen um.",
    intro:
      "Waehlen Sie die Berechnungsrichtung und den Steuersatz, um Netto- und Bruttowerte sauber aufzuteilen.",
    component: "vatCalculator",
    iconName: "vatCalculator",
    cardDescription:
      "Berechnet Netto-, Steuer- und Bruttobetraege mit frei waehlbarem Satz.",
    articleSections: [
      {
        title: "Wofuer eignet sich das Tool?",
        body: "Der Rechner hilft bei Angeboten, Rechnungen, Preislisten und schnellen Plausibilitaetschecks im Alltag, wenn Netto und Brutto auseinandergehalten werden muessen.",
      },
      {
        title: "Netto oder Brutto starten?",
        body: "Je nach Aufgabe koennen Sie entweder vom Nettobetrag zum Endpreis oder vom Endpreis zur enthaltenen Steuer zurueckrechnen.",
      },
    ],
    priority: 0.75,
  },
  {
    slug: "bmi-rechner",
    germanPath: "/de/bmi-rechner",
    turkishPath: "/bmi-hesaplama",
    title: "BMI Rechner",
    description:
      "Berechnen Sie BMI, Grundumsatz und den ungefaehren taeglichen Kalorienbedarf.",
    intro:
      "Mit Groesse, Gewicht, Alter, Geschlecht und Aktivitaetsniveau erhalten Sie eine schnelle Gesundheits- und Energieeinschaetzung.",
    component: "bmiCalculator",
    iconName: "bmiCalculator",
    cardDescription:
      "Berechnet BMI, Grundumsatz und taeglichen Kalorienbedarf.",
    articleSections: [
      {
        title: "Was sagt der BMI aus?",
        body: "Der BMI setzt Gewicht und Koerpergroesse ins Verhaeltnis. Er ist ein schneller Orientierungswert, ersetzt aber keine individuelle gesundheitliche Bewertung.",
      },
      {
        title: "Warum Aktivitaet einbeziehen?",
        body: "Der taegliche Energiebedarf haengt nicht nur vom Grundumsatz ab. Mit dem Aktivitaetsfaktor laesst sich die Alltagsbewegung grob einbeziehen.",
      },
    ],
    priority: 0.75,
  },
  {
    slug: "schwangerschaftswochen-rechner",
    germanPath: "/de/schwangerschaftswochen-rechner",
    turkishPath: "/gebelik-haftasi-hesaplama",
    title: "Schwangerschaftswochen Rechner",
    description:
      "Berechnen Sie Schwangerschaftswoche, Trimester und voraussichtlichen Geburtstermin.",
    intro:
      "Auf Basis des ersten Tages der letzten Periode zeigt der Rechner den aktuellen Stand der Schwangerschaft und die verbleibende Zeit bis zum Termin.",
    component: "pregnancyCalculator",
    iconName: "pregnancyCalculator",
    cardDescription:
      "Zeigt Schwangerschaftswoche, Trimester und voraussichtlichen Geburtstermin.",
    articleSections: [
      {
        title: "Wie wird gerechnet?",
        body: "Ueblich ist die Berechnung ab dem ersten Tag der letzten Periode. Von dort wird die Schwangerschaftsdauer medizinisch standardisiert weitergezaehlt.",
      },
      {
        title: "Wofuer ist das nuetzlich?",
        body: "Das Tool hilft bei einer ersten Orientierung fuer Arzttermine, Wochenangaben und den ungefaehren Geburtstermin, ersetzt aber keine medizinische Beratung.",
      },
    ],
    priority: 0.75,
  },
  {
    slug: "laengenvergleich",
    germanPath: "/de/laengenvergleich",
    turkishPath: "/uzunluk-karsilastirma",
    title: "Laengenvergleich",
    description:
      "Vergleichen Sie eine Laenge mit bekannten Referenzen wie Mensch, Giraffe, Fussballfeld oder Eiffelturm.",
    intro:
      "Abstrakte Zahlen werden mit vertrauten Groessen greifbarer, wenn man sie direkt ins Verhaeltnis setzt.",
    component: "lengthComparison",
    iconName: "length",
    cardDescription:
      "Setzt Laengenwerte in Bezug zu bekannten Objekten und Bauwerken.",
    articleSections: [
      {
        title: "Warum sind Referenzvergleiche hilfreich?",
        body: "Viele Nutzer koennen sich 25 Meter oder 330 Meter schwer vorstellen. Ein Vergleich mit Giraffe, Bus oder Eiffelturm macht die Zahl sofort anschaulicher.",
      },
      {
        title: "Wie wird sortiert?",
        body: "Die Liste priorisiert den Vergleich, dessen Verhaeltnis am naechsten an 1 liegt. So erscheint zuerst das Objekt, das der Eingabe am aehnlichsten ist.",
      },
    ],
    priority: 0.6,
  },
  {
    slug: "gewichtsvergleich",
    germanPath: "/de/gewichtsvergleich",
    turkishPath: "/agirlik-karsilastirma",
    title: "Gewichtsvergleich",
    description:
      "Vergleichen Sie ein Gewicht mit vertrauten Referenzen wie Katze, Mensch, Auto oder Blauwal.",
    intro:
      "Gerade bei sehr kleinen oder sehr grossen Werten hilft ein Referenzvergleich dabei, die Groessenordnung besser einzuordnen.",
    component: "weightComparison",
    iconName: "mass",
    cardDescription:
      "Vergleicht Gewichtsangaben mit alltagsnahen und grossen Referenzobjekten.",
    articleSections: [
      {
        title: "Wofuer ist das gut?",
        body: "Ob Produktgewicht, Lastannahme oder reines Interesse: Ein Vergleich mit typischen Objekten macht Gewichtsangaben verstaendlicher als eine nackte Zahl.",
      },
      {
        title: "Sind das exakte Werte?",
        body: "Nein. Es handelt sich um typische Durchschnittswerte fuer anschauliche Vergleiche, nicht um naturwissenschaftlich exakte Einzelmessungen.",
      },
    ],
    priority: 0.6,
  },
  {
    slug: "lauftempo-rechner",
    germanPath: "/de/lauftempo-rechner",
    turkishPath: "/kosu-pace-hesaplama",
    title: "Lauftempo Rechner",
    description:
      "Berechnen Sie Tempo, Distanz oder Laufzeit und sehen Sie Schätzwerte fuer 5K, 10K, Halbmarathon und Marathon.",
    intro:
      "Das Tool verbindet Distanz, Zeit und Minuten pro Kilometer miteinander und eignet sich fuer Training und Rennplanung.",
    component: "paceCalculator",
    iconName: "paceCalculator",
    cardDescription:
      "Berechnet Lauftempo, Distanz und Zielzeiten fuer Standardrennen.",
    articleSections: [
      {
        title: "Was kann berechnet werden?",
        body: "Wenn zwei der drei Werte bekannt sind, kann der dritte ermittelt werden: Distanz plus Zeit ergeben Tempo, Distanz plus Tempo ergeben Zeit, und Zeit plus Tempo ergeben Distanz.",
      },
      {
        title: "Wie sind die Rennschaetzungen zu lesen?",
        body: "Die Standarddistanzen gehen davon aus, dass das aktuelle Tempo konstant gehalten wird. Fuer laengere Rennen ist das eher eine Orientierung als ein garantiertes Ergebnis.",
      },
    ],
    priority: 0.75,
  },
  {
    slug: "klima-btu-rechner",
    germanPath: "/de/klima-btu-rechner",
    turkishPath: "/klima-btu-hesaplama",
    title: "Klima BTU Rechner",
    description:
      "Berechnen Sie eine passende BTU-Groesse fuer einen Raum anhand von Flaeche, Personenanzahl und Waermebelastung.",
    intro:
      "Raumgroesse, Sonneneinstrahlung und oberste Etage beeinflussen den Kuehlbedarf deutlich. Der Rechner fasst diese Faktoren in einer schnellen Schaetzung zusammen.",
    component: "acCapacityCalculator",
    iconName: "acCapacityCalculator",
    cardDescription:
      "Schaetzt die passende Klimaleistung fuer einen Raum in BTU.",
    articleSections: [
      {
        title: "Warum reichen Quadratmeter allein nicht?",
        body: "Gleiche Flaeche kann je nach Sonneneinstrahlung, Dachlage und Personenbelegung einen sehr unterschiedlichen Kuehlbedarf haben.",
      },
      {
        title: "Was ist das Ergebnis wert?",
        body: "Die Ausgabe eignet sich fuer eine erste Orientierung vor dem Geraetekauf und sollte bei schwierigen Raumsituationen mit Herstellerangaben abgeglichen werden.",
      },
    ],
    priority: 0.75,
  },
  {
    slug: "stromverbrauch-rechner",
    germanPath: "/de/stromverbrauch-rechner",
    turkishPath: "/elektrik-tuketimi-hesaplama",
    title: "Stromverbrauch Rechner",
    description:
      "Berechnen Sie taeglichen, monatlichen und jaehrlichen Stromverbrauch sowie Kosten auf Basis des kWh-Preises.",
    intro:
      "Mit Leistung, Nutzungsdauer und Anzahl der Nutzungstage laesst sich der Verbrauch eines Geraets schnell abschaetzen.",
    component: "electricityConsumptionCalculator",
    iconName: "electricityConsumptionCalculator",
    cardDescription:
      "Zeigt Verbrauch und Kosten fuer einzelne elektrische Geraete.",
    articleSections: [
      {
        title: "Wann hilft dieses Tool?",
        body: "Beim Vergleich von Heizgeraeten, Klimaanlagen, Haushaltsgeraeten oder Dauerverbrauchern sehen Sie schnell, welches Geraet mehr Stromkosten verursacht.",
      },
      {
        title: "Warum ist der kWh-Preis optional?",
        body: "Auch ohne Preis ist der Energieverbrauch nuetzlich. Wenn Sie Ihren Tarif kennen, laesst sich daraus direkt eine monatliche und jaehrliche Kostenschaetzung ableiten.",
      },
    ],
    priority: 0.75,
  },
  {
    slug: "schlafrechner",
    germanPath: "/de/schlafrechner",
    turkishPath: "/uyku-hesaplama",
    title: "Schlafrechner",
    description:
      "Finden Sie passende Schlaf- oder Aufstehzeiten anhand typischer 90-Minuten-Schlafzyklen.",
    intro:
      "Der Rechner zeigt mehrere moegliche Zeitfenster und markiert die ueblichen Empfehlungen fuer ausreichend Schlaf.",
    component: "sleepCalculator",
    iconName: "sleepCalculator",
    cardDescription:
      "Empfiehlt Schlaf- und Aufstehzeiten auf Basis von Schlafzyklen.",
    articleSections: [
      {
        title: "Warum in Schlafzyklen denken?",
        body: "Viele Menschen fuehlen sich ausgeruhter, wenn sie am Ende eines Schlafzyklus statt mitten in einer tiefen Phase aufwachen.",
      },
      {
        title: "Was bedeutet empfohlen?",
        body: "Die empfohlenen Optionen liegen am ehesten im gaengigen Bereich fuer gesunden Erwachsenenschlaf und dienen als praktische Orientierung.",
      },
    ],
    priority: 0.75,
  },
];

export function findGermanStandaloneToolBySlug(slug: string) {
  return germanStandaloneTools.find((tool) => tool.slug === slug);
}

export function findGermanStandaloneToolByTurkishPath(turkishPath: string) {
  return germanStandaloneTools.find((tool) => tool.turkishPath === turkishPath);
}
