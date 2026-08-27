import type { UnitPage } from "./unitPages";
import { unitPages } from "./unitPages";
import { getGermanCategorySlug } from "../i18n/germanRoutes";

export type LocalizedGermanUnitPage = UnitPage & {
  locale: "de";
  sourceSlug: string;
  categoryName: string;
};

type GermanUnitContent = {
  name: string;
  slug: string;
  categoryName: string;
  shortDescription: string;
  historySummary: string;
  measurementSystem: string;
  commonUses: string;
};

const germanUnitContent: Record<string, GermanUnitContent> = {
  metre: {
    name: "Meter",
    slug: "meter",
    categoryName: "Länge",
    shortDescription:
      "Der Meter ist die SI-Basiseinheit der Länge und die wichtigste Referenz für Abstände und Abmessungen.",
    historySummary:
      "Der Meter entstand im Zuge der metrischen Standardisierung und wird heute über die Lichtgeschwindigkeit im Vakuum definiert.",
    measurementSystem: "Internationales Einheitensystem (SI)",
    commonUses: "Bauwesen, Wissenschaft, Fertigung und allgemeine Messungen",
  },
  kilometre: {
    name: "Kilometer",
    slug: "kilometer",
    categoryName: "Länge",
    shortDescription:
      "Der Kilometer ist eine Längeneinheit von 1000 Metern und wird vor allem für größere Entfernungen verwendet.",
    historySummary:
      "Als dezimales Vielfaches des Meters wurde der Kilometer zur praktischen Einheit für Straßen-, Reise- und Kartendistanzen.",
    measurementSystem: "Internationales Einheitensystem (SI, Vielfacheinheit)",
    commonUses: "Straßenentfernungen, Geographie, Kartographie und Infrastruktur",
  },
  santimetre: {
    name: "Zentimeter",
    slug: "zentimeter",
    categoryName: "Länge",
    shortDescription:
      "Der Zentimeter ist ein Hundertstel Meter und eignet sich für kürzere Alltags- und Objektmaße.",
    historySummary:
      "Der Zentimeter entwickelte sich als dezimale Untereinheit des Meters und wurde in Bildung, Handel und Alltag schnell verbreitet.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Möbel, Kleidung, Anthropometrie und tägliche Messungen",
  },
  milimetre: {
    name: "Millimeter",
    slug: "millimeter",
    categoryName: "Länge",
    shortDescription:
      "Der Millimeter ist ein Tausendstel Meter und wird für präzise technische Maße eingesetzt.",
    historySummary:
      "Mit steigenden Anforderungen an Fertigung und Toleranzen gewann der Millimeter in Technik und Produktion stark an Bedeutung.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Technische Zeichnung, Bearbeitung, Mechanik und Toleranzen",
  },
  mil: {
    name: "Meile",
    slug: "meile",
    categoryName: "Länge",
    shortDescription:
      "Die Meile ist eine nichtmetrische Längeneinheit und entspricht international exakt 1609,344 Metern.",
    historySummary:
      "Die moderne internationale Meile geht auf ältere Wegmaße zurück und wurde 1959 mit einem festen Meterwert vereinheitlicht.",
    measurementSystem: "Imperiales und US-amerikanisches Maßsystem",
    commonUses: "Straßenentfernungen, Navigation und großräumige Feldmessungen",
  },
  fit: {
    name: "Fuß",
    slug: "fuss",
    categoryName: "Länge",
    shortDescription:
      "Der Fuß ist eine imperiale Längeneinheit mit dem exakten Wert 0,3048 Meter.",
    historySummary:
      "Der Fuß stammt aus älteren körperbezogenen Maßtraditionen; sein moderner internationaler Wert wurde 1959 festgelegt.",
    measurementSystem: "Imperiales und US-amerikanisches Maßsystem",
    commonUses: "Architektur, Höhenangaben, Luftfahrt und Baupraxis",
  },
  inc: {
    name: "Zoll",
    slug: "zoll",
    categoryName: "Länge",
    shortDescription:
      "Der Zoll ist eine kurze imperiale Längeneinheit; 1 Zoll entspricht exakt 2,54 Zentimetern.",
    historySummary:
      "Der moderne internationale Zoll wurde 1959 mit exakt 25,4 Millimetern definiert und ist heute technisch eindeutig festgelegt.",
    measurementSystem: "Imperiales und US-amerikanisches Maßsystem",
    commonUses: "Bildschirmgrößen, Rohrleitungen, Verbindungselemente und Katalogmaße",
  },
  yarda: {
    name: "Yard",
    slug: "yard",
    categoryName: "Länge",
    shortDescription:
      "Das Yard ist eine imperiale Längeneinheit mit dem exakten Wert 0,9144 Meter.",
    historySummary:
      "Das Yard entwickelte sich aus älteren Land- und Körpermaßen und wurde später international auf einen festen Meterwert normiert.",
    measurementSystem: "Imperiales und US-amerikanisches Maßsystem",
    commonUses: "Sportflächen, Textilien, Landschaftsbau und Geländeplanung",
  },
  kilogram: {
    name: "Kilogramm",
    slug: "kilogramm",
    categoryName: "Masse",
    shortDescription:
      "Das Kilogramm ist die SI-Basiseinheit der Masse und die zentrale Referenz in Technik, Handel und Wissenschaft.",
    historySummary:
      "Das Kilogramm war früher an ein physisches Normal gebunden und wird heute über den festgelegten Zahlenwert der Planck-Konstanten definiert.",
    measurementSystem: "Internationales Einheitensystem (SI)",
    commonUses: "Handel, Logistik, Labor, Produktion und technische Berechnungen",
  },
  gram: {
    name: "Gramm",
    slug: "gramm",
    categoryName: "Masse",
    shortDescription:
      "Das Gramm ist ein Tausendstel Kilogramm und eignet sich für kleinere Stoffmengen.",
    historySummary:
      "Als praktische metrische Untereinheit des Kilogramms wurde das Gramm in Labor, Handel und Alltag weit verbreitet.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Lebensmittel, Chemie, Pharmazie und Feinwägungen",
  },
  miligram: {
    name: "Milligramm",
    slug: "milligramm",
    categoryName: "Masse",
    shortDescription:
      "Das Milligramm ist ein Tausendstel Gramm und wird für sehr kleine Massen verwendet.",
    historySummary:
      "Mit der Entwicklung präziser Analysen und Dosierungen wurde das Milligramm in Medizin und Labor unverzichtbar.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Arzneidosen, analytische Chemie und Präzisionsformulierungen",
  },
  pound: {
    name: "Pfund",
    slug: "pfund",
    categoryName: "Masse",
    shortDescription:
      "Das Pfund ist eine nichtmetrische Masseneinheit; 1 internationales Pfund entspricht exakt 0,45359237 Kilogramm.",
    historySummary:
      "Das moderne Avoirdupois-Pfund wurde international normiert und ist bis heute tief in vielen englischsprachigen Anwendungen verankert.",
    measurementSystem: "Imperiales und US-amerikanisches Maßsystem",
    commonUses: "Einzelhandel, Versand, Nährwertangaben und technische Kataloge",
  },
  ton: {
    name: "Tonne",
    slug: "tonne",
    categoryName: "Masse",
    shortDescription:
      "Die metrische Tonne ist eine große Masseneinheit von 1000 Kilogramm.",
    historySummary:
      "Die Tonne wurde als kompakte metrische Einheit für große Stoffmengen in Industrie, Logistik und Rohstoffhandel etabliert.",
    measurementSystem: "Metrisches System, mit dem SI verwendet",
    commonUses: "Logistik, Schwerindustrie, Rohstoffe und Produktionsmengen",
  },
  ons: {
    name: "Unze",
    slug: "unze",
    categoryName: "Masse",
    shortDescription:
      "Die Unze ist eine kleine imperiale Masseneinheit; 1 Avoirdupois-Unze entspricht 28,349523125 Gramm.",
    historySummary:
      "Historisch gab es mehrere Unzen; in der modernen Technik und im Handel wird die standardisierte Avoirdupois-Unze verwendet.",
    measurementSystem: "Imperiales und US-amerikanisches Maßsystem",
    commonUses: "Verpackung, Lebensmittel und leichte Handelsmengen",
  },
  pascal: {
    name: "Pascal",
    slug: "pascal",
    categoryName: "Druck",
    shortDescription:
      "Das Pascal ist die SI-Einheit des Drucks und direkt über 1 Pa = 1 N/m² definiert.",
    historySummary:
      "Benannt nach Blaise Pascal wurde diese Einheit zur wissenschaftlichen Standardreferenz für Druckangaben im SI.",
    measurementSystem: "Internationales Einheitensystem (SI)",
    commonUses: "Wissenschaftliche Berechnungen, Werkstofftechnik und Referenzumrechnungen",
  },
  kilopascal: {
    name: "Kilopascal",
    slug: "kilopascal",
    categoryName: "Druck",
    shortDescription:
      "Das Kilopascal ist eine Druckeinheit von 1000 Pascal und liefert für viele Anwendungen besser lesbare Zahlen.",
    historySummary:
      "In technischen Dokumenten setzte sich das Kilopascal durch, weil Einzel-Pascal-Werte für viele Praxisbereiche zu klein sind.",
    measurementSystem: "Internationales Einheitensystem (SI, Vielfacheinheit)",
    commonUses: "HLK, Reifenfülldruck, Bautechnik und Prozessdaten",
  },
  bar: {
    name: "Bar",
    slug: "bar",
    categoryName: "Druck",
    shortDescription:
      "Das Bar ist eine technische Druckeinheit von 100000 Pascal und in der Praxis sehr verbreitet.",
    historySummary:
      "Obwohl es keine SI-Einheit ist, blieb das Bar wegen seiner kompakten Darstellung praktischer Druckbereiche in Industrie und Service beliebt.",
    measurementSystem: "Technische Nicht-SI-Einheit",
    commonUses: "Hydraulik, Pneumatik, Kompressoren und Manometer",
  },
  psi: {
    name: "PSI",
    slug: "psi",
    categoryName: "Druck",
    shortDescription:
      "PSI steht für pound-force per square inch und ist eine verbreitete Druckeinheit in der angloamerikanischen Technik.",
    historySummary:
      "PSI blieb in Werkstatt-, Fahrzeug- und Hydraulikanwendungen verbreitet, auch nachdem SI-Einheiten in vielen Bereichen zunahmen.",
    measurementSystem: "Imperiale und US-technische Nutzung",
    commonUses: "Reifendruck, Hydraulik, Serviceunterlagen und Feldmessungen",
  },
  "milimetre-civa": {
    name: "Millimeter Quecksilbersäule",
    slug: "millimeter-quecksilbersaeule",
    categoryName: "Druck",
    shortDescription:
      "Millimeter Quecksilbersäule ist eine historische Druckeinheit auf Basis einer Quecksilbersäule.",
    historySummary:
      "Die Einheit wurde durch Quecksilbermanometer geprägt und ist besonders aus Medizin, Labor und Vakuumtechnik bekannt.",
    measurementSystem: "Historische Nicht-SI-Einheit",
    commonUses: "Blutdruckwerte, Laborreferenzen und Vakuummessungen",
  },
  metrekare: {
    name: "Quadratmeter",
    slug: "quadratmeter",
    categoryName: "Fläche",
    shortDescription:
      "Der Quadratmeter ist die SI-abgeleitete Einheit der Fläche.",
    historySummary:
      "Als zweidimensionale Ableitung des Meters wurde der Quadratmeter zum Standardmaß für Oberflächen und Grundflächen.",
    measurementSystem: "Internationales Einheitensystem (SI)",
    commonUses: "Gebäude, Bodenflächen, Paneele und Querschnittsangaben",
  },
  hektar: {
    name: "Hektar",
    slug: "hektar",
    categoryName: "Fläche",
    shortDescription:
      "Der Hektar ist eine große Flächeneinheit; 1 ha entspricht exakt 10000 Quadratmetern.",
    historySummary:
      "Der Hektar wurde zur praktischen metrischen Einheit für Landflächen, weil große Grundstücke damit kompakter beschrieben werden können.",
    measurementSystem: "Metrisches System, mit dem SI verwendet",
    commonUses: "Landwirtschaft, Flächennutzung und größere Grundstücke",
  },
  fitkare: {
    name: "Quadratfuß",
    slug: "quadratfuss",
    categoryName: "Fläche",
    shortDescription:
      "Der Quadratfuß ist eine imperiale Flächeneinheit und leitet sich direkt vom Fußmaß ab.",
    historySummary:
      "Mit der weiten Verbreitung des Fußes in Bau und Immobilien wurde auch der Quadratfuß zur üblichen Flächeneinheit.",
    measurementSystem: "Imperiales und US-amerikanisches Maßsystem",
    commonUses: "Immobilien, Raumflächen und angloamerikanische Bauunterlagen",
  },
  litre: {
    name: "Liter",
    slug: "liter",
    categoryName: "Volumen",
    shortDescription:
      "Der Liter ist eine weit verbreitete Volumeneinheit für Flüssigkeiten und Behälterinhalte.",
    historySummary:
      "Als praktische metrische Volumeneinheit verbindet der Liter Alltagsgebrauch, Laborpraxis und technische Anwendungen.",
    measurementSystem: "Metrisches System, mit dem SI verwendet",
    commonUses: "Flüssigkeiten, Tankvolumen, Laborbehälter und Alltagsmaße",
  },
  metrekup: {
    name: "Kubikmeter",
    slug: "kubikmeter",
    categoryName: "Volumen",
    shortDescription:
      "Der Kubikmeter ist die SI-abgeleitete Einheit des Volumens und die Standardreferenz für größere Raum- und Flüssigkeitsmengen.",
    historySummary:
      "Als dreidimensionale Ableitung des Meters wurde der Kubikmeter zur wissenschaftlichen und technischen Standardgröße für Volumen.",
    measurementSystem: "Internationales Einheitensystem (SI)",
    commonUses: "Raumvolumen, Behälter, Speicher und Prozessanlagen",
  },
  mililitre: {
    name: "Milliliter",
    slug: "milliliter",
    categoryName: "Volumen",
    shortDescription:
      "Der Milliliter ist ein Tausendstel Liter und eignet sich für kleine, präzise Flüssigkeitsmengen.",
    historySummary:
      "Mit wachsender Bedeutung von Medizin, Labor und Dosiertechnik wurde der Milliliter zu einer zentralen Feineinheit.",
    measurementSystem: "Metrisches System, mit dem SI verwendet",
    commonUses: "Medizin, Labormuster und kleine Flüssigkeitsmengen",
  },
  santigrat: {
    name: "Celsius",
    slug: "celsius",
    categoryName: "Temperatur",
    shortDescription:
      "Celsius ist eine der gebräuchlichsten Temperaturskalen im Alltag und in der Technik.",
    historySummary:
      "Die Celsius-Skala verbreitete sich stark, weil ihre Bezugspunkte mit den Phasenwechseln von Wasser anschaulich verknüpft sind.",
    measurementSystem: "Temperaturskala, zusammen mit dem SI verwendet",
    commonUses: "Wetter, HLK, Prozessführung und alltägliche Temperaturen",
  },
  fahrenhayt: {
    name: "Fahrenheit",
    slug: "fahrenheit",
    categoryName: "Temperatur",
    shortDescription:
      "Fahrenheit ist eine Temperaturskala, die besonders in den Vereinigten Staaten noch häufig verwendet wird.",
    historySummary:
      "Die Fahrenheit-Skala blieb in Teilen der angloamerikanischen Welt in Wetter-, Haushalts- und Gebrauchsanwendungen fest verankert.",
    measurementSystem: "Imperiale und US-amerikanische Temperaturskala",
    commonUses: "US-Wetterdaten, Haushalt und ausgewählte technische Referenzen",
  },
  kelvin: {
    name: "Kelvin",
    slug: "kelvin",
    categoryName: "Temperatur",
    shortDescription:
      "Kelvin ist die SI-Basiseinheit der thermodynamischen Temperatur.",
    historySummary:
      "Die Kelvin-Skala wurde entwickelt, um absolute Temperaturen ab dem absoluten Nullpunkt konsistent zu beschreiben.",
    measurementSystem: "Internationales Einheitensystem (SI)",
    commonUses: "Thermodynamik, Wissenschaft und absolute Temperaturskalen",
  },
  saniye: {
    name: "Sekunde",
    slug: "sekunde",
    categoryName: "Zeit",
    shortDescription:
      "Die Sekunde ist die SI-Basiseinheit der Zeit und Grundlage zahlreicher abgeleiteter Größen.",
    historySummary:
      "Die moderne Sekunde wird über eine atomare Übergangsfrequenz definiert und dadurch hochpräzise reproduzierbar.",
    measurementSystem: "Internationales Einheitensystem (SI)",
    commonUses: "Experimente, Bewegungsanalyse, Datenaufzeichnung und Timing",
  },
  dakika: {
    name: "Minute",
    slug: "minute",
    categoryName: "Zeit",
    shortDescription:
      "Die Minute ist eine praktische Zeiteinheit von 60 Sekunden.",
    historySummary:
      "Als bewährte Zwischenstufe zwischen Sekunde und Stunde blieb die Minute in Alltag, Planung und Technik unverzichtbar.",
    measurementSystem: "Nicht-SI-Einheit, mit dem SI verwendet",
    commonUses: "Kurzzeitangaben, Planung, Sport und Prozessschritte",
  },
  saat: {
    name: "Stunde",
    slug: "stunde",
    categoryName: "Zeit",
    shortDescription:
      "Die Stunde ist eine weit verbreitete Zeiteinheit von 3600 Sekunden.",
    historySummary:
      "Sie entstand aus zivilen und astronomischen Zeitordnungen und ist bis heute zentral für Alltag und Betriebsplanung.",
    measurementSystem: "Nicht-SI-Einheit, mit dem SI verwendet",
    commonUses: "Arbeitszeiten, Reisen, Energieverbrauch und Tagesplanung",
  },
  "metre-saniye": {
    name: "Meter pro Sekunde",
    slug: "meter-pro-sekunde",
    categoryName: "Geschwindigkeit",
    shortDescription:
      "Meter pro Sekunde ist die SI-abgeleitete Einheit der Geschwindigkeit.",
    historySummary:
      "Aus Meter und Sekunde zusammengesetzt wurde diese Einheit zur Standardsprache der Physik und Ingenieurwissenschaften.",
    measurementSystem: "Internationales Einheitensystem (SI)",
    commonUses: "Strömungen, Mechanik, Versuchstechnik und Wissenschaft",
  },
  "kilometre-saat": {
    name: "Kilometer pro Stunde",
    slug: "kilometer-pro-stunde",
    categoryName: "Geschwindigkeit",
    shortDescription:
      "Kilometer pro Stunde ist eine praktische Geschwindigkeitseinheit für Verkehr und Feldanwendungen.",
    historySummary:
      "Mit dem Ausbau metrischer Verkehrssysteme wurde km/h zur dominanten Straßengeschwindigkeitseinheit in vielen Ländern.",
    measurementSystem: "Metrische praktische Einheit",
    commonUses: "Fahrzeuggeschwindigkeiten, Verkehr und Feldmessungen",
  },
  "mil-saat": {
    name: "Meilen pro Stunde",
    slug: "meilen-pro-stunde",
    categoryName: "Geschwindigkeit",
    shortDescription:
      "Meilen pro Stunde ist eine nichtmetrische Geschwindigkeitseinheit, die vor allem in den USA verbreitet ist.",
    historySummary:
      "Die Einheit entwickelte sich aus dem Zusammenspiel von Meile und Stunde in angloamerikanischen Verkehrssystemen.",
    measurementSystem: "Imperiales und US-amerikanisches Maßsystem",
    commonUses: "Straßenverkehr, Fahrzeugtechnik und Berichte im angloamerikanischen Raum",
  },
  joule: {
    name: "Joule",
    slug: "joule",
    categoryName: "Energie",
    shortDescription:
      "Das Joule ist die SI-abgeleitete Einheit der Energie und wird für Arbeit, Wärme und Energieinhalte verwendet.",
    historySummary:
      "Mit der modernen Vereinheitlichung von Mechanik und Thermodynamik wurde das Joule zur zentralen SI-Energieeinheit.",
    measurementSystem: "Internationales Einheitensystem (SI)",
    commonUses: "Thermodynamik, Energiebilanzen und wissenschaftliche Berechnungen",
  },
  kilovatsaat: {
    name: "Kilowattstunde",
    slug: "kilowattstunde",
    categoryName: "Energie",
    shortDescription:
      "Die Kilowattstunde ist eine praktische Energieeinheit, die vor allem im Stromverbrauchswesen genutzt wird.",
    historySummary:
      "Sie wurde im Energiesektor wichtig, weil sie Leistung und Zeit direkt in eine gut abrechenbare Energiemenge verbindet.",
    measurementSystem: "Technische und kommerzielle Energieeinheit",
    commonUses: "Stromabrechnung, Speichertechnik und Energievergleiche",
  },
  watt: {
    name: "Watt",
    slug: "watt",
    categoryName: "Leistung",
    shortDescription:
      "Das Watt ist die SI-abgeleitete Einheit der Leistung und beschreibt eine Energieübertragungsrate.",
    historySummary:
      "Das Watt etablierte sich als Standardgröße für Leistungsangaben in elektrischen und mechanischen Systemen.",
    measurementSystem: "Internationales Einheitensystem (SI)",
    commonUses: "Geräteleistung, elektrische Lasten und Maschinenangaben",
  },
  kilowatt: {
    name: "Kilowatt",
    slug: "kilowatt",
    categoryName: "Leistung",
    shortDescription:
      "Das Kilowatt ist eine Leistungseinheit von 1000 Watt und eignet sich für größere Anlagen- und Geräteleistungen.",
    historySummary:
      "Viele praktische Leistungswerte liegen im Tausenderbereich, weshalb sich das Kilowatt in Technik und Versorgung stark etabliert hat.",
    measurementSystem: "Internationales Einheitensystem (SI, Vielfacheinheit)",
    commonUses: "HLK-Anlagen, Generatoren, Maschinen und Netztechnik",
  },
  megawatt: {
    name: "Megawatt",
    slug: "megawatt",
    categoryName: "Leistung",
    shortDescription:
      "Das Megawatt (MW) ist eine große Leistungseinheit von 1.000.000 Watt und wird für Kraftwerke und Großanlagen verwendet.",
    historySummary:
      "Mit der Industrialisierung der Stromerzeugung wurde das Megawatt zur praktischen Standardeinheit für Kraftwerkskapazitäten.",
    measurementSystem: "Internationales Einheitensystem (SI, Vielfacheinheit)",
    commonUses: "Kraftwerkskapazität, Wind-/Solaranlagen und Großindustrie",
  },
  "metrekup-saat": {
    name: "Kubikmeter pro Stunde",
    slug: "kubikmeter-pro-stunde",
    categoryName: "Durchfluss",
    shortDescription:
      "Kubikmeter pro Stunde ist eine praktische Einheit des Volumenstroms für Gebäude- und Prozesssysteme.",
    historySummary:
      "In HLK-, Wasser- und Prozessanwendungen wurde m³/h zu einer gut lesbaren Standardgröße für stündliche Fördermengen.",
    measurementSystem: "Technische Volumenstrom-Einheit",
    commonUses: "Pumpenauswahl, HLK, Wassertechnik und Prozessströme",
  },
  "litre-dakika": {
    name: "Liter pro Minute",
    slug: "liter-pro-minute",
    categoryName: "Durchfluss",
    shortDescription:
      "Liter pro Minute ist eine anschauliche Volumenstrom-Einheit für kleinere Systeme.",
    historySummary:
      "Die Einheit wurde in Service-, Labor- und kleineren Verteilanlagen verbreitet, weil Minutenwerte dort leichter zu deuten sind.",
    measurementSystem: "Technische Volumenstrom-Einheit",
    commonUses: "Wasserleitungen, Geräteversorgung und kleinere Prozessströme",
  },
  volt: {
    name: "Volt",
    slug: "volt",
    categoryName: "Elektrizität",
    shortDescription:
      "Das Volt ist die SI-abgeleitete Einheit der elektrischen Spannung.",
    historySummary:
      "Mit der Entwicklung elektrischer Messtechnik wurde das Volt zu einer Grundgröße der Elektrotechnik.",
    measurementSystem: "Internationales Einheitensystem (SI)",
    commonUses: "Elektronik, Stromversorgung und Netzspannungen",
  },
  kilovolt: {
    name: "Kilovolt",
    slug: "kilovolt",
    categoryName: "Elektrizität",
    shortDescription:
      "Das Kilovolt ist eine Spannungseinheit von 1000 Volt und wird für höhere Spannungsniveaus verwendet.",
    historySummary:
      "Mit zunehmenden Netz- und Übertragungsspannungen wurde das Kilovolt zur kompakten Standarddarstellung größerer Spannungswerte.",
    measurementSystem: "Internationales Einheitensystem (SI, Vielfacheinheit)",
    commonUses: "Mittelspannung, Transformatoren und Hochspannungstechnik",
  },
  amper: {
    name: "Ampere",
    slug: "ampere",
    categoryName: "Elektrizität",
    shortDescription:
      "Das Ampere ist die SI-Basiseinheit der elektrischen Stromstärke.",
    historySummary:
      "Als Grundgröße der Elektrotechnik wurde das Ampere zentral für die Beschreibung von Ladungsfluss und Stromkreisen.",
    measurementSystem: "Internationales Einheitensystem (SI)",
    commonUses: "Strommessung, Schutztechnik und Gerätekennwerte",
  },
  miliamper: {
    name: "Milliampere",
    slug: "milliampere",
    categoryName: "Elektrizität",
    shortDescription:
      "Das Milliampere ist ein Tausendstel Ampere und eignet sich für kleine Stromstärken.",
    historySummary:
      "Mit dem Aufkommen von Elektronik, Sensorik und Präzisionsinstrumenten wurde das Milliampere besonders wichtig.",
    measurementSystem: "Internationales Einheitensystem (SI, Untereinheit)",
    commonUses: "Elektronik, Sensoren und Niedrigstrom-Messungen",
  },
};

export const germanUnitPages: LocalizedGermanUnitPage[] = unitPages
  .map((page) => {
    const content = germanUnitContent[page.slug];

    if (!content) {
      return null;
    }

    return {
      ...page,
      locale: "de",
      sourceSlug: page.slug,
      slug: content.slug,
      name: content.name,
      categoryName: content.categoryName,
      shortDescription: content.shortDescription,
      historySummary: content.historySummary,
      measurementSystem: content.measurementSystem,
      commonUses: content.commonUses,
    };
  })
  .filter((page): page is LocalizedGermanUnitPage => page !== null);

export function findGermanUnitPage(
  category: string,
  unit: string
) {
  return germanUnitPages.find(
    (page) => page.category === category && page.unit === unit
  );
}

export function findGermanUnitPageBySlug(slug: string) {
  return germanUnitPages.find((page) => page.slug === slug);
}

export function findGermanUnitPageByTurkishSlug(
  sourceSlug: string
) {
  return germanUnitPages.find(
    (page) => page.sourceSlug === sourceSlug
  );
}

export function findGermanUnitPageByCategorySlug(
  category: string
) {
  const slug = getGermanCategorySlug(category);
  return germanUnitPages.filter(
    (page) => page.category === category || page.categoryName === slug
  );
}
