import { getGermanCategorySlug } from "../i18n/germanRoutes";

export type LocalizedGermanCategoryFact = {
  label: string;
  value: string;
};

export type LocalizedGermanCategorySection = {
  title: string;
  paragraphs: string[];
};

export type LocalizedGermanCategoryPage = {
  locale: "de";
  slug: string;
  sourceSlug: string;
  category: string;
  title: string;
  description: string;
  introduction: string[];
  facts: LocalizedGermanCategoryFact[];
  sections: LocalizedGermanCategorySection[];
};

function createCategoryPage(
  sourceSlug: string,
  category: string,
  title: string,
  description: string,
  introduction: string[],
  facts: LocalizedGermanCategoryFact[],
  sections: LocalizedGermanCategorySection[]
): LocalizedGermanCategoryPage {
  const slug = getGermanCategorySlug(category);

  if (!slug) {
    throw new Error(`Missing German category slug for ${category}`);
  }

  return {
    locale: "de",
    slug,
    sourceSlug,
    category,
    title,
    description,
    introduction,
    facts,
    sections,
  };
}

export const germanCategoryPages: LocalizedGermanCategoryPage[] = [
  createCategoryPage(
    "ivme",
    "ivme",
    "Beschleunigungseinheiten und Umrechnungen",
    "Rechnen Sie zwischen Meter pro Sekundequadrat, Fuß pro Sekundequadrat und der Erdbeschleunigung (g) um und erfahren Sie mehr über Fahrzeugleistung und Physikberechnungen.",
    [
      "Beschleunigung ist eine abgeleitete physikalische Größe, die die Änderungsrate der Geschwindigkeit eines Körpers pro Zeiteinheit angibt. Sie ist ein grundlegender Begriff in vielen Bereichen, von der Fahrzeugleistung über die Raketenphysik bis zur Erdbebenmessung und Schwerkraftforschung.",
      "Im Internationalen Einheitensystem ist die abgeleitete Einheit der Beschleunigung Meter pro Sekundequadrat (m/s²); im Alltag und in der Technik dienen zudem Vielfache der Erdbeschleunigung (g) als gebräuchliche Referenz.",
    ],
    [
      { label: "Physikalische Größe", value: "Beschleunigung" },
      { label: "Dimensionssymbol", value: "[LT⁻²]" },
      { label: "Abgeleitete SI-Einheit", value: "Meter pro Sekundequadrat" },
      { label: "SI-Einheitensymbol", value: "m/s²" },
      { label: "Standard-Erdbeschleunigung", value: "g = 9,80665 m/s²" },
    ],
    [
      {
        title: "Was ist Beschleunigung?",
        paragraphs: [
          "Beschleunigung ist das Verhältnis der Geschwindigkeitsänderung eines Körpers zur verstrichenen Zeit (a = Δv/Δt) und eine der grundlegenden Komponenten von Newtons zweitem Bewegungsgesetz (F = m × a). Sie ist eine vektorielle Größe; sowohl Beschleunigen, Abbremsen als auch Richtungsänderungen werden als Beschleunigung bezeichnet.",
          "Beschleunigung ist eine abgeleitete Größe; sie ergibt sich aus der Division der Geschwindigkeitseinheit (m/s) durch die Zeit und besitzt die SI-Dimension LT⁻².",
        ],
      },
      {
        title: "Die SI-Einheit der Beschleunigung",
        paragraphs: [
          "Meter pro Sekundequadrat (m/s²) ist die abgeleitete SI-Einheit der Beschleunigung und gibt an, um wie viele Meter pro Sekunde sich die Geschwindigkeit eines Körpers jede Sekunde ändert. Eine Beschleunigung von 5 m/s² bedeutet beispielsweise, dass die Geschwindigkeit des Körpers jede Sekunde um 5 m/s zunimmt.",
          "Diese Einheit wird in einem weiten Anwendungsbereich verwendet, von Fahrzeugleistungstests (Beschleunigungszeit von 0 auf 100 km/h) bis zu Berechnungen für Raketenstarts.",
        ],
      },
      {
        title: "Die Erdbeschleunigung (g) als Standardreferenz",
        paragraphs: [
          "Die Erdbeschleunigung (g) ist die Beschleunigung, die ein frei fallender Körper an der Erdoberfläche erfährt; ihr Standardwert wird mit genau 9,80665 m/s² angesetzt (der tatsächliche Wert kann je nach geografischer Lage und Höhe geringfügig abweichen).",
          "Die Einheit 'g' wird besonders in Luft- und Raumfahrttechnik verwendet, um die auf Piloten oder Astronauten wirkende Beschleunigung anzugeben -- eine 'Kurve mit 3g' bedeutet beispielsweise eine Beschleunigung, die dem Dreifachen der Standard-Erdbeschleunigung entspricht.",
        ],
      },
      {
        title: "Gal: die Einheit der Schwerkraftmessung",
        paragraphs: [
          "Gal ist eine Beschleunigungseinheit aus dem CGS-System, benannt nach dem italienischen Wissenschaftler Galileo Galilei; 1 Gal entspricht genau 1 Zentimeter pro Sekundequadrat (0,01 m/s²).",
          "Die Einheit Gal (und ihr Tausendstel, das Milligal) wird in Geophysik und Gravimetrie verwendet, um sehr kleine Schwankungen der lokalen Erdbeschleunigung zu messen -- diese Messungen liefern wichtige Informationen für die Erdöl- und Mineralerkundung sowie die geologische Strukturanalyse.",
        ],
      },
      {
        title: "Beschleunigung bei der Fahrzeugleistung",
        paragraphs: [
          "In der Fahrzeugtechnik wird die Leistung meist als 'Beschleunigungszeit von 0 auf 100 km/h' angegeben; dieser Wert spiegelt indirekt die durchschnittliche Beschleunigung eines Fahrzeugs wider (Durchschnittsbeschleunigung = Geschwindigkeitsänderung / verstrichene Zeit).",
          "Leistungsstarke Sportwagen erreichen meist eine Durchschnittsbeschleunigung von etwa 0,3 bis 0,5 g, während die Startbeschleunigung von Flugzeugen typischerweise deutlich niedriger ist (etwa 0,3 g); bei Raketenstarts kann die Beschleunigung dagegen mehrere g erreichen.",
        ],
      },
      {
        title: "Wie wird Beschleunigung gemessen?",
        paragraphs: [
          "Beschleunigung wird mit Sensoren namens Beschleunigungsmesser (Akzelerometer) gemessen; diese Sensoren kommen heute in vielen Geräten zum Einsatz, von Smartphones über Fahrzeugsicherheitssysteme (Airbag-Auslösung) bis zu Erdbebenmessstationen und Raumfahrzeugen.",
          "Moderne MEMS-basierte (mikro-elektro-mechanische Systeme) Beschleunigungsmesser lassen sich sehr klein bauen und ermöglichen äußerst präzise Messungen; diese Technologie bildet auch die Grundlage für die Bildschirmdrehung und Schrittzählung von Smartphones.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "acisal_hiz",
    "acisal_hiz",
    "Winkelgeschwindigkeitseinheiten und Umrechnungen",
    "Rechnen Sie zwischen U/min, Radiant pro Sekunde und Grad pro Sekunde um und erfahren Sie mehr über Motordrehzahl und Rotationsbewegungen.",
    [
      "Winkelgeschwindigkeit ist die physikalische Größe, die die Drehrate eines Körpers um seine Rotationsachse beschreibt. Sie ist ein grundlegender Begriff in vielen technischen und physikalischen Anwendungen, von der Motordrehzahl über die Planetenrotation bis zu Zentrifugen und rotierenden Maschinenteilen.",
      "Im Internationalen Einheitensystem ist die abgeleitete Einheit der Winkelgeschwindigkeit Radiant pro Sekunde (rad/s); im Alltag sowie in der Fahrzeug- und Maschinentechnik ist dagegen Umdrehungen pro Minute (U/min, RPM) deutlich gebräuchlicher.",
    ],
    [
      { label: "Physikalische Größe", value: "Winkelgeschwindigkeit" },
      { label: "Dimensionssymbol", value: "[T⁻¹]" },
      { label: "Abgeleitete SI-Einheit", value: "Radiant pro Sekunde" },
      { label: "SI-Einheitensymbol", value: "rad/s" },
      { label: "Umrechnung U/min–rad/s", value: "1 U/min = 2π/60 rad/s ≈ 0,1047 rad/s" },
    ],
    [
      {
        title: "Was ist Winkelgeschwindigkeit?",
        paragraphs: [
          "Winkelgeschwindigkeit (ω, Omega) beschreibt, welchen Winkel ein Körper um eine Rotationsachse pro Zeiteinheit zurücklegt. Sie kann als das rotatorische Gegenstück zur linearen Geschwindigkeit betrachtet werden und wird meist in rad/s angegeben.",
          "Winkelgeschwindigkeit hängt mit der linearen Geschwindigkeit über die Formel v = ω × r zusammen, wobei r der Abstand zum Drehzentrum ist. Das bedeutet, dass Punkte einer Scheibe nahe der Mitte bei gleicher Winkelgeschwindigkeit eine geringere lineare Geschwindigkeit besitzen als Punkte nahe dem Rand.",
        ],
      },
      {
        title: "Die SI-Einheit der Winkelgeschwindigkeit: Radiant pro Sekunde",
        paragraphs: [
          "Radiant pro Sekunde (rad/s) ist die abgeleitete SI-Einheit der Winkelgeschwindigkeit und gibt an, wie viele Radiant ein Körper pro Sekunde überstreicht. Wird eine volle Umdrehung (360°, 2π Radiant) in einer Sekunde vollendet, beträgt die Winkelgeschwindigkeit 2π rad/s.",
          "Da Radiant eine dimensionslose Größe ist (Verhältnis Bogenlänge/Radius), wird die SI-Dimension der Winkelgeschwindigkeit einfach als T⁻¹ (Kehrwert der Zeit) dargestellt -- das bedeutet, dass Winkelgeschwindigkeit mathematisch dieselbe Dimension wie Frequenz (Hz) besitzt, jedoch eine andere physikalische Bedeutung hat.",
        ],
      },
      {
        title: "U/min: die Einheit der Motoren- und Maschinenwelt",
        paragraphs: [
          "U/min (Umdrehungen pro Minute, englisch RPM) ist die in Fahrzeug- und Maschinentechnik standardmäßig verwendete Einheit zur Angabe der Drehzahl von Motoren, Turbinen und rotierenden Maschinenteilen.",
          "1 U/min bedeutet eine volle Umdrehung pro Minute; zur Umrechnung in rad/s wird mit 2π/60 (etwa 0,1047) multipliziert -- dies ergibt sich daraus, dass eine Minute 60 Sekunden und eine Umdrehung 2π Radiant entspricht.",
        ],
      },
      {
        title: "Zusammenhang zwischen Motordrehzahl und Drehmoment",
        paragraphs: [
          "Die von einem Motor erzeugte Leistung entspricht dem Produkt aus Drehmoment und Winkelgeschwindigkeit (P = τ × ω); dieser Zusammenhang erklärt, warum zwei Motoren mit gleicher Leistung unterschiedliche Drehmoment-Drehzahl-Kombinationen aufweisen können.",
          "Motoren mit hohem Drehmoment bei niedriger Drehzahl (wie Dieselmotoren) werden meist bei Anwendungen mit hohem Zugkraftbedarf (Lkw, Traktor) bevorzugt, während hochdrehende Motoren bei Anwendungen mit hoher Leistungsdichte (Sportwagen) zum Einsatz kommen.",
        ],
      },
      {
        title: "Zentrifugalkraft und Winkelgeschwindigkeit",
        paragraphs: [
          "Die Zentrifugalwirkung, die ein Körper bei einer Kreisbewegung erfährt, ist proportional zum Quadrat der Winkelgeschwindigkeit (F = m × ω² × r); deshalb führt schon eine kleine Erhöhung der Winkelgeschwindigkeit zu einer deutlich größeren Zunahme der wirkenden Kraft.",
          "Dieser Zusammenhang erklärt, warum Zentrifugen (Laborzentrifugen, der Schleudergang einer Waschmaschine) mit sehr hohen Drehzahlen arbeiten -- eine hohe Winkelgeschwindigkeit erhöht die für Trennung oder Schleudern benötigte Kraft erheblich.",
        ],
      },
      {
        title: "Wie wird Winkelgeschwindigkeit gemessen?",
        paragraphs: [
          "Winkelgeschwindigkeit kann direkt mit Geräten namens Tachometer (Drehzahlmesser) gemessen werden; die Drehzahlanzeige im Armaturenbrett von Kraftfahrzeugen führt diese Messung kontinuierlich durch.",
          "In industriellen Anwendungen wird die Drehzahl einer Welle oder Scheibe mit optischen oder magnetischen Sensoren präzise gemessen; diese Messungen liefern auch die Rückmeldung (Feedback) für Motorsteuerungssysteme.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "guc",
    "guc",
    "Leistungseinheiten und Umrechnungen",
    "Rechnen Sie zwischen Watt, Kilowatt, Megawatt und PS um und erfahren Sie mehr über Motorleistung, Generatorkapazität und Elektrogeräte.",
    [
      "Leistung ist eine abgeleitete physikalische Größe, die die pro Zeiteinheit verrichtete Arbeit oder übertragene Energiemenge angibt. Sie ist ein grundlegender Begriff in vielen Bereichen, von der Motorleistung über die Stromrechnung bis zur Klimaanlagenkapazität und Generatorauswahl.",
      "Im Internationalen Einheitensystem ist die abgeleitete Einheit der Leistung das Watt (W); in der Fahrzeugtechnik wird zusätzlich die Pferdestärke (sowohl metrisch als auch in britisch-amerikanischer Version) verwendet, in der Kältetechnik spezielle Einheiten wie die Kältetonne.",
    ],
    [
      { label: "Physikalische Größe", value: "Leistung" },
      { label: "Dimensionssymbol", value: "[ML²T⁻³]" },
      { label: "Abgeleitete SI-Einheit", value: "Watt" },
      { label: "SI-Einheitensymbol", value: "W" },
      { label: "Grundformel", value: "P = Arbeit / Zeit = Energie / Zeit" },
    ],
    [
      {
        title: "Was ist Leistung?",
        paragraphs: [
          "Leistung gibt die pro Zeiteinheit verrichtete Arbeit oder übertragene Energiemenge an und wird mit dem Symbol P dargestellt: P = W / t (Arbeit geteilt durch Zeit). Wird dieselbe Arbeit in kürzerer Zeit verrichtet, ist dafür eine höhere Leistung erforderlich.",
          "Leistung ist eine abgeleitete Größe; sie ergibt sich aus der Division der Energieeinheit (Joule) durch die Zeit (Sekunde) und besitzt die SI-Dimension ML²T⁻³.",
        ],
      },
      {
        title: "Die SI-Einheit der Leistung: Watt",
        paragraphs: [
          "Watt ist die abgeleitete SI-Einheit der Leistung und wird mit dem Symbol W dargestellt; benannt nach dem schottischen Ingenieur James Watt, bekannt für seine Weiterentwicklungen der Dampfmaschine. Ein Watt entspricht der Übertragung oder Verrichtung von 1 Joule Energie pro Sekunde.",
          "Sehr unterschiedliche Leistungsgrößen -- der Stromverbrauch von Elektrogeräten (Glühbirne, Computer), die Motorleistung von Antrieben oder die Erzeugungskapazität von Kraftwerken -- werden in Watt und seinen Vielfachen (Kilowatt, Megawatt, Gigawatt) angegeben.",
        ],
      },
      {
        title: "Pferdestärke: zwei unterschiedliche Standards",
        paragraphs: [
          "Die Pferdestärke wurde historisch von James Watt vorgeschlagen, um die Leistung seiner Dampfmaschinen mit der Zugkraft von Pferden zu vergleichen; sie wird in der Fahrzeugtechnik bis heute verwendet, es gibt jedoch zwei voneinander abweichende Standards.",
          "Die metrische Pferdestärke (PS, 735,49875 W) ist die in Deutschland und weiten Teilen Europas übliche Angabe in Fahrzeugkatalogen, während die mechanische beziehungsweise angloamerikanische Pferdestärke (HP, 745,7 W) in britischen und US-amerikanischen Katalogen verwendet wird. Der Unterschied von rund 1,4 % wirkt klein, kann bei leistungsstarken Motoren aber zu einer spürbaren Zahlenabweichung führen.",
        ],
      },
      {
        title: "Kältetonne: die Einheit der Klimatechnik",
        paragraphs: [
          "Die Kältetonne (Ton of Refrigeration, TR) ist eine historische Einheit, die auf der Kälteleistung beruht, die nötig ist, um innerhalb eines Tages 1 US-Tonne (2000 Pfund) Eis zu schmelzen; 1 TR entspricht exakt 3516,853 Watt (etwa 12.000 BTU/h).",
          "Diese Einheit stammt aus den USA, wird aber weltweit in der HLK-Branche noch verwendet, insbesondere zur Angabe der Kapazität großer gewerblicher Klimaanlagen und Kaltwassersätze (Chiller).",
        ],
      },
      {
        title: "Leistung und Energie nicht verwechseln",
        paragraphs: [
          "Leistung und Energie werden häufig verwechselt: Leistung gibt an, mit welcher Geschwindigkeit Energie übertragen wird (Watt), Energie dagegen, wie viel Arbeit insgesamt verrichtet wurde (Joule oder Kilowattstunde). Eine Kilowattstunde (kWh) ist die Gesamtenergie, die verbraucht wird, wenn eine Leistung von 1 Kilowatt eine Stunde lang genutzt wird.",
          "Diese Unterscheidung ist entscheidend, um Stromrechnungen zu verstehen: Abgerechnet wird nicht die momentane Leistung eines Geräts (Watt), sondern die insgesamt in einem bestimmten Zeitraum verbrauchte Energie (kWh).",
        ],
      },
      {
        title: "Wie wird Leistung gemessen?",
        paragraphs: [
          "Elektrische Leistung kann direkt mit einem Wattmeter gemessen werden; dieses Gerät misst Spannung und Stromstärke gleichzeitig und berechnet durch Multiplikation die Momentanleistung. Mechanische Leistung wird meist mit Prüfgeräten, sogenannten Dynamometern, über die Messung von Drehmoment und Drehzahl ermittelt.",
          "Auf Motorprüfständen wird die Leistungskurve eines Motors ermittelt, indem die Drehmomentwerte bei unterschiedlichen Drehzahlen gemessen und mit der Formel P = τ × ω berechnet werden; diese Kurve zeigt, in welchem Drehzahlbereich der Motor am effizientesten arbeitet.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "momentum",
    "momentum",
    "Impulseinheiten und Umrechnungen",
    "Rechnen Sie zwischen Kilogramm-Meter pro Sekunde und Newtonsekunde um und erfahren Sie mehr über Stoß- und Impulsberechnungen.",
    [
      "Impuls ist eine abgeleitete physikalische Größe, die sich aus dem Produkt von Masse und Geschwindigkeit eines bewegten Körpers ergibt. Er ist ein grundlegender Begriff bei der Analyse von Stößen, Kraftstößen und Bewegungsvorgängen.",
      "Im Internationalen Einheitensystem ist die abgeleitete Einheit des Impulses Kilogramm-Meter pro Sekunde (kg·m/s); diese Einheit entspricht zahlenmäßig und dimensional auch der Einheit des Kraftstoßes (Newtonsekunde, N·s).",
    ],
    [
      { label: "Physikalische Größe", value: "Impuls" },
      { label: "Dimensionssymbol", value: "[MLT⁻¹]" },
      { label: "Abgeleitete SI-Einheit", value: "Kilogramm-Meter pro Sekunde" },
      { label: "SI-Einheitensymbol", value: "kg·m/s" },
      { label: "Grundformel", value: "p = m × v (Masse × Geschwindigkeit)" },
    ],
    [
      {
        title: "Was ist Impuls?",
        paragraphs: [
          "Impuls ist das Produkt aus Masse und Geschwindigkeit eines bewegten Körpers und wird meist mit dem Symbol p dargestellt: p = m × v. Er ist eine vektorielle Größe und zeigt in Richtung der Geschwindigkeit.",
          "Impuls drückt anschaulich aus, 'wie schwer es ist, die Bewegung eines Körpers zu stoppen' -- einen Lkw bei gleicher Geschwindigkeit zum Stehen zu bringen erfordert weit mehr Kraft und/oder Zeit als ein Fahrrad, weil der Impuls des Lkw viel größer ist.",
        ],
      },
      {
        title: "Die SI-Einheit des Impulses",
        paragraphs: [
          "Die abgeleitete SI-Einheit des Impulses ist Kilogramm-Meter pro Sekunde (kg·m/s); sie ergibt sich aus der Multiplikation der Masseneinheit (kg) mit der Geschwindigkeitseinheit (m/s) und besitzt die SI-Dimension MLT⁻¹.",
          "Bewegt sich beispielsweise ein Auto mit einer Masse von 1000 kg mit 20 m/s, beträgt sein Impuls 1000 × 20 = 20.000 kg·m/s.",
        ],
      },
      {
        title: "Das Prinzip der Impulserhaltung",
        paragraphs: [
          "In einem geschlossenen System (ohne von außen wirkende Nettokraft) bleibt der Gesamtimpuls vor und nach einem Stoß konstant. Dieses Prinzip erklärt viele physikalische Vorgänge, vom Zusammenstoß von Billardkugeln bis zu Raketenantrieben.",
          "Stoßen beispielsweise zwei Billardkugeln zusammen, ist der Gesamtimpuls vor dem Stoß gleich dem Gesamtimpuls danach -- der Impuls, den eine Kugel gewinnt, entspricht genau dem Impuls, den die andere verliert.",
        ],
      },
      {
        title: "Zusammenhang zwischen Kraftstoß und Impuls",
        paragraphs: [
          "Ein Kraftstoß ist die Wirkung, die entsteht, wenn eine Kraft über eine bestimmte Zeitspanne wirkt, und wird mit J = F × t berechnet. Nach dem Kraftstoß-Impuls-Theorem entspricht der auf einen Körper wirkende Kraftstoß der Änderung seines Impulses: J = Δp.",
          "Deshalb sind die Einheit des Kraftstoßes (Newtonsekunde, N·s) und die Einheit des Impulses (kg·m/s) dimensional gleich und entsprechen sich zahlenmäßig direkt -- aus diesem Grund finden sich in dieser Kategorie beide Einheiten nebeneinander.",
        ],
      },
      {
        title: "Warum ist Impuls in der Sicherheitstechnik wichtig?",
        paragraphs: [
          "Bei Fahrzeugcrashtests und in der Sicherheitskonstruktion spielt der Impulsbegriff eine entscheidende Rolle: Wie schnell der Impuls eines Fahrzeugs beim Aufprall auf null reduziert wird (die Dauer des Kraftstoßes), beeinflusst direkt, welche Kraft auf die Insassen wirkt.",
          "Airbags und Sicherheitsgurte verlängern die Zeitspanne, über die sich der Impuls beim Aufprall ändert (wodurch bei gleichem Kraftstoß eine geringere Spitzenkraft entsteht), und verringern so die auf die Insassen wirkende Momentankraft.",
        ],
      },
      {
        title: "Wie wird Impuls gemessen?",
        paragraphs: [
          "Impuls wird nicht direkt mit einem Gerät gemessen; Masse wird mit einer Waage, Geschwindigkeit mit Geschwindigkeitsmesssystemen (Radar, Laser-Geschwindigkeitsmesser, Hochgeschwindigkeitskamera) getrennt gemessen und anschließend multipliziert.",
          "In der Teilchenphysik wird der Impuls meist indirekt aus dem Krümmungsradius der Bahn eines Teilchens in einem Magnetfeld berechnet -- die Krümmung der Bahn eines geladenen Teilchens im Magnetfeld steht in direktem Zusammenhang mit seinem Impuls.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "viskozite_dinamik",
    "viskozite_dinamik",
    "Viskositätseinheiten und Umrechnungen",
    "Rechnen Sie zwischen Pascalsekunde und Centipoise um und erfahren Sie mehr über die Reynolds-Zahl und Strömungsmechanikberechnungen.",
    [
      "Viskosität (dynamische Viskosität) ist die physikalische Größe, die den Fließwiderstand eines Fluids beschreibt. Sie erklärt, warum 'dickflüssige' Fluide wie Honig langsamer fließen als 'dünnflüssige' Fluide wie Wasser.",
      "Im Internationalen Einheitensystem ist die abgeleitete Einheit der dynamischen Viskosität Pascalsekunde (Pa·s); in Industrie und Motorölklassifizierung sind jedoch die aus dem CGS-System stammenden Einheiten Poise (P) und besonders Centipoise (cP) deutlich gebräuchlicher.",
    ],
    [
      { label: "Physikalische Größe", value: "Dynamische Viskosität" },
      { label: "Dimensionssymbol", value: "[ML⁻¹T⁻¹]" },
      { label: "Abgeleitete SI-Einheit", value: "Pascalsekunde" },
      { label: "SI-Einheitensymbol", value: "Pa·s" },
      { label: "Viskosität von Wasser (20 °C)", value: "≈1 Centipoise (cP) = 0,001 Pa·s" },
    ],
    [
      {
        title: "Was ist Viskosität?",
        paragraphs: [
          "Viskosität bezeichnet die innere Reibung eines Fluids (Flüssigkeit oder Gas), also seinen Widerstand gegen Fließen. Ein Fluid mit hoher Viskosität (wie Honig) fließt langsam, während ein Fluid mit niedriger Viskosität (wie Wasser) leichter fließt.",
          "Dynamische Viskosität wird meist mit dem Symbol μ (My) dargestellt und bildet in der Strömungsmechanik die Grundlage zahlreicher technischer Berechnungen, von der Rohrleitungsauslegung bis zur Motorölauswahl.",
        ],
      },
      {
        title: "Die SI-Einheit der Viskosität: Pascalsekunde",
        paragraphs: [
          "Pascalsekunde (Pa·s) ist die abgeleitete SI-Einheit der dynamischen Viskosität. Eine Viskosität von 1 Pa·s bedeutet, dass unter bestimmten Standardbedingungen das Verhältnis von Schubspannung zu Schergeschwindigkeit zwischen den Fluidschichten gleich 1 ist.",
          "Pa·s ist für die meisten im Alltag vorkommenden Fluide (Wasser, Luft) eine recht große Einheit; deshalb wird in der Praxis Millipascalsekunde (mPa·s) bevorzugt. Eine nützliche Gleichheit: 1 mPa·s entspricht genau 1 Centipoise (cP).",
        ],
      },
      {
        title: "Poise und Centipoise: die von der Industrie bevorzugten Einheiten",
        paragraphs: [
          "Poise (P) ist eine Viskositätseinheit aus dem CGS-System (Zentimeter-Gramm-Sekunde) und ist nach dem französischen Physiologen Jean Léonard Marie Poiseuille benannt. 1 Poise entspricht 0,1 Pa·s.",
          "Centipoise (cP) ist ein Hundertstel eines Poise und in der Praxis die am häufigsten verwendete Viskositätseinheit, da die Viskosität von Wasser bei 20 °C fast genau 1 Centipoise beträgt -- das macht sie zu einem anschaulichen Referenzwert.",
        ],
      },
      {
        title: "Viskositätsbeispiele aus dem Alltag",
        paragraphs: [
          "Wasser hat bei 20 °C eine Viskosität von etwa 1 cP, Olivenöl etwa 80 cP, während Honig je nach Temperatur eine deutlich höhere Viskosität von 2000 bis 10.000 cP aufweist.",
          "Motoröle liegen typischerweise zwischen 50 und 300 cP; da sich die Viskosität von Motoröl jedoch stark mit der Temperatur ändert (kalt dickflüssiger, warm dünnflüssiger), wird statt eines einzelnen festen Werts das SAE-Klassifizierungssystem verwendet (etwa 5W-30, 10W-40).",
        ],
      },
      {
        title: "Wie verändert sich die Viskosität mit der Temperatur?",
        paragraphs: [
          "Bei Flüssigkeiten nimmt die Viskosität mit steigender Temperatur meist ab -- die Bindungen zwischen den Molekülen schwächen sich ab, und das Fluid fließt leichter. Deshalb fließt kalter Honig schwer vom Löffel, erwärmter Honig dagegen deutlich leichter.",
          "Bei Gasen verhält es sich umgekehrt: Mit steigender Temperatur nimmt die Viskosität zu, da die schnellere Bewegung der Gasmoleküle die Zusammenstöße zwischen ihnen und damit die innere Reibung erhöht.",
        ],
      },
      {
        title: "Zusammenhang zwischen Viskosität und Reynolds-Zahl",
        paragraphs: [
          "Die dynamische Viskosität ist eine direkte Komponente der Reynolds-Zahl-Formel (Re = ρvD/μ), die bestimmt, ob eine Strömung laminar (geordnet, geschichtet) oder turbulent (ungeordnet, verwirbelt) ist.",
          "Fluide mit hoher Viskosität (wie Honig) besitzen eine niedrige Reynolds-Zahl und neigen daher leichter zu laminarer Strömung, während Fluide mit niedriger Viskosität (wie Luft) unter denselben Bedingungen leichter in Turbulenz übergehen können.",
        ],
      },
      {
        title: "Wie wird Viskosität gemessen?",
        paragraphs: [
          "Viskosimeter sind Geräte zur Messung der Viskosität eines Fluids. Gebräuchliche Bauarten sind Kapillarviskosimeter (messen die Fließzeit durch ein enges Rohr), Rotationsviskosimeter (messen den Widerstand einer in das Fluid rotierenden Welle) und Kugelfall-Viskosimeter.",
          "In der Industrie wird die Viskositätsmessung bei Motoröl und Lebensmitteln routinemäßig zur Qualitätskontrolle durchgeführt, um zu prüfen, ob ein Produkt die erwarteten Leistungs- oder Texturmerkmale erfüllt.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "veri",
    "veri",
    "Datenspeicher-Einheiten und Umrechnungen",
    "Rechnen Sie zwischen Byte, Kilobyte, Megabyte, Gigabyte und Terabyte um und erfahren Sie mehr über den Unterschied zwischen dezimaler und binärer Basis.",
    [
      "Eine Dateneinheit gibt an, wie viel Information in einem Computersystem gespeichert oder verarbeitet wird. Die grundlegendste Einheit ist das Bit; acht Bit zusammen bilden ein Byte.",
      "Beim Sprechen über Speicherplatz und Internetgeschwindigkeit begegnen einem sowohl dezimale (auf 1000 basierende) Einheiten wie Kilobyte, Megabyte, Gigabyte und Terabyte als auch binäre (auf 1024 basierende) Einheiten wie Kibibyte, Mebibyte und Gibibyte, die von Betriebssystemen verwendet werden -- der Unterschied zwischen diesen beiden Systemen ist der Hauptgrund, warum eine gekaufte Festplatte scheinbar 'weniger' Speicherplatz bietet als angegeben.",
    ],
    [
      { label: "Kleinste Einheit", value: "Bit (0 oder 1)" },
      { label: "Basiseinheit", value: "Byte = 8 Bit" },
      { label: "Dezimales (SI-)System", value: "1 KB = 1000 Byte, 1 MB = 1000 KB" },
      { label: "Binäres (IEC-)System", value: "1 KiB = 1024 Byte, 1 MiB = 1024 KiB" },
      { label: "Unterschied 1000 zu 1024", value: "≈7,4 % Unterschied zwischen 1 GB (dezimal) und 1 GiB (binär)" },
    ],
    [
      {
        title: "Was sind Bit und Byte?",
        paragraphs: [
          "Ein Bit (binary digit) ist die kleinste Informationseinheit, die ein Computer verarbeiten kann, und kann nur zwei Werte annehmen: 0 oder 1. Acht Bit ergeben ein Byte; ein Byte kann 256 (2⁸) verschiedene Werte darstellen -- ausreichend, um zum Beispiel ein Textzeichen zu kodieren.",
          "Bit wird üblicherweise mit kleinem 'b' abgekürzt, Byte mit großem 'B'; diese Unterscheidung führt besonders bei Internetgeschwindigkeiten (Mbit/s = Megabit pro Sekunde) im Vergleich zu Dateigrößen (MB = Megabyte) zu Verwirrung -- eine Internetverbindung mit 100 Mbit/s entspricht theoretisch einer Downloadgeschwindigkeit von etwa 12,5 MB pro Sekunde (100 ÷ 8).",
        ],
      },
      {
        title: "Warum gibt es zwei verschiedene Einheitensysteme?",
        paragraphs: [
          "Da Computer binär arbeiten, ist die Speicheradressierung naturgemäß mit Zweierpotenzen (wie 1024, 1.048.576) verknüpft. Deshalb meinte die Softwarewelt historisch mit 'Kilobyte' eigentlich 1024 Byte.",
          "Festplattenhersteller bevorzugen dagegen aus Marketing- und Rechengründen die dezimale (auf 1000 basierende) SI-Vorsilbe -- eine vom Hersteller als '1 TB' bezeichnete Festplatte hat tatsächlich genau 1.000.000.000.000 Byte, doch da das Betriebssystem auf Basis von 1024 rechnet, zeigt es eine kleinere Zahl wie '931 GB' an.",
        ],
      },
      {
        title: "Der IEC-Standard: KiB, MiB, GiB",
        paragraphs: [
          "Um diese Verwirrung zu beseitigen, standardisierte die Internationale Elektrotechnische Kommission (IEC) 1998 eigene Namen (Kibibyte, Mebibyte, Gibibyte, Tebibyte) und Symbole (KiB, MiB, GiB, TiB) für binär basierte Einheiten.",
          "Nach diesem Standard sollten herkömmliche Vorsilben wie KB/MB/GB nur im dezimalen (1000er) Sinn verwendet werden, während für auf 1024 basierende Werte die 'binären' Vorsilben KiB/MiB/GiB bevorzugt werden sollten. Im Alltagsgebrauch und in vielen Programmen wird diese Unterscheidung jedoch weiterhin nicht konsequent umgesetzt.",
        ],
      },
      {
        title: "Warum wird der Unterschied zwischen 1000 und 1024 größer?",
        paragraphs: [
          "Auf Kilobyte-Ebene (1000 gegenüber 1024) beträgt der Unterschied nur etwa 2,4 %, doch dieser Unterschied wächst mit jeder größeren Einheit: auf Megabyte-Ebene etwa 4,9 %, auf Gigabyte-Ebene etwa 7,4 % und auf Terabyte-Ebene erreicht er etwa 10 %.",
          "Deshalb wird bei großen Speicherkapazitäten (wie einer 1-TB-Festplatte) der Unterschied zwischen dezimaler und binärer Berechnung so groß, dass Nutzer ihn als deutlich 'fehlenden Speicherplatz' wahrnehmen (ein Unterschied von etwa 90 GB).",
        ],
      },
      {
        title: "Bit-basierte Dateneinheiten: Kilobit, Megabit, Gigabit",
        paragraphs: [
          "Internetanbieter geben die Verbindungsgeschwindigkeit meist in bit-basierten Einheiten an (Kilobit pro Sekunde, Megabit pro Sekunde, Gigabit pro Sekunde); dies ist eine historische Tradition der Netzwerktechnik.",
          "Da Nutzer die Downloadgeschwindigkeit meist in Byte erwarten (MB pro Sekunde), kann die Unkenntnis, dass eine '100-Mbit/s'-Verbindung tatsächlich rund 12,5 MB/s entspricht, fälschlich den Eindruck erwecken, die Verbindung sei 'langsam'.",
        ],
      },
      {
        title: "Datenmengen im Alltag",
        paragraphs: [
          "Ein Textdokument (eine Seite) ist typischerweise wenige Kilobyte groß, ein komprimiertes Foto (JPEG) einige Megabyte, eine komprimierte Musikdatei (MP3) im Schnitt 3 bis 5 Megabyte.",
          "Ein Film in Standardauflösung (HD) belegt etwa 1 bis 4 Gigabyte, ein Film in 4K-Auflösung dagegen etwa 15 bis 25 Gigabyte; diese Unterschiede hängen von Auflösung und Kompressionsverfahren ab.",
        ],
      },
      {
        title: "Geschichte der Dateneinheit",
        paragraphs: [
          "Die erste von IBM 1956 vorgestellte Festplatte (RAMAC 305) hatte eine Kapazität von etwa 3,75 Megabyte und füllte einen ganzen Raum. Heute kann eine microSD-Karte ein Vielfaches dieser Kapazität in Handflächengröße fassen.",
          "Dieser enorme Kapazitätszuwachs hängt eng mit dem technologischen Fortschritt der Speichertechnik (etwa dem Wechsel von Magnetplatten zu Flash-Speicher) sowie mit den stetig sinkenden Kosten pro Speichereinheit zusammen.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "elektrik_direnc",
    "elektrik_direnc",
    "Widerstandseinheiten und Umrechnungen",
    "Rechnen Sie zwischen Ohm, Kiloohm und Megaohm um und erfahren Sie mehr über Schaltungsdesign und das Ohmsche Gesetz.",
    [
      "Elektrischer Widerstand ist die physikalische Größe, die angibt, wie stark ein Leiter dem Fluss von elektrischem Strom entgegenwirkt. Er ist die Grundlage zahlreicher elektrischer und elektronischer Anwendungen, von der Schaltungsentwicklung bis zu Heizelementen.",
      "Im Internationalen Einheitensystem ist die abgeleitete Einheit des Widerstands das Ohm (Ω). Bei kleinen Schaltungselementen wird Ohm verwendet, bei großen Widerständen (etwa Isolationswiderständen) Kiloohm (kΩ) und Megaohm (MΩ).",
    ],
    [
      { label: "Physikalische Größe", value: "Elektrischer Widerstand" },
      { label: "Dimensionssymbol", value: "[ML²T⁻³I⁻²]" },
      { label: "Abgeleitete SI-Einheit", value: "Ohm" },
      { label: "SI-Einheitensymbol", value: "Ω" },
      { label: "Grundformel (Ohmsches Gesetz)", value: "R = U / I (Widerstand = Spannung / Stromstärke)" },
    ],
    [
      {
        title: "Was ist elektrischer Widerstand?",
        paragraphs: [
          "Elektrischer Widerstand ist der Grad, mit dem ein Leiter dem Elektronenfluss (elektrischen Strom) entgegenwirkt. Je höher der Widerstand eines Leiters, desto weniger Strom fließt bei gleicher Spannung.",
          "Widerstand hängt vom Material des Leiters (spezifischer Widerstand), seiner Länge, Querschnittsfläche und Temperatur ab. Ein langes, dünnes Kabel besitzt einen höheren Widerstand als ein kurzes, dickes Kabel.",
        ],
      },
      {
        title: "Die SI-Einheit des Widerstands: Ohm",
        paragraphs: [
          "Ohm ist die abgeleitete SI-Einheit des elektrischen Widerstands und wird mit dem Symbol Ω (Omega) dargestellt; benannt nach dem deutschen Physiker Georg Simon Ohm. Ein Widerstand von 1 Ohm in einem Stromkreis führt bei einer angelegten Spannung von 1 Volt zu einem Stromfluss von 1 Ampere.",
          "Das Ohmsche Gesetz (U = I × R) beschreibt den grundlegenden Zusammenhang zwischen Spannung, Stromstärke und Widerstand und ist eine der zentralen Formeln der Elektro- und Elektroniktechnik.",
        ],
      },
      {
        title: "Unterschied zwischen Widerstand und spezifischem Widerstand",
        paragraphs: [
          "Widerstand bezeichnet den Gesamtwiderstand eines bestimmten Objekts (etwa eines Drahtes mit bestimmter Länge und Querschnitt), während der spezifische Widerstand (Resistivität) eine materialspezifische, von der Größe unabhängige Eigenschaft ist.",
          "Materialien mit niedrigem spezifischem Widerstand wie Kupfer werden als gute Leiter verwendet, während Materialien mit hohem spezifischem Widerstand wie Gummi und Glas als Isolatoren dienen. Ein längerer oder dünnerer Draht aus demselben Material besitzt trotz gleichen spezifischen Widerstands einen höheren Gesamtwiderstand.",
        ],
      },
      {
        title: "Widerstands-Farbcodes",
        paragraphs: [
          "Der Wert fester Widerstände in elektronischen Schaltungen wird meist über farbige Ringe (Widerstands-Farbcode) angegeben; jede Farbe steht für einen bestimmten Zahlenwert oder Multiplikator.",
          "Dieses System stammt aus einer Zeit, in der das Aufdrucken von Zahlen auf kleine Widerstandsbauteile unpraktisch war, wird aber bis heute als gängiger Standard verwendet; Varianten mit vier, fünf oder sechs Ringen liefern unterschiedliche Genauigkeitsstufen für Widerstandswert und Toleranz.",
        ],
      },
      {
        title: "Der Einfluss der Temperatur auf den Widerstand",
        paragraphs: [
          "Bei den meisten metallischen Leitern steigt der Widerstand mit zunehmender Temperatur -- die erwärmten Metallatome schwingen stärker und behindern den Elektronenfluss zusätzlich. Dieser Zusammenhang wird bei Temperatursensoren (RTD, widerstandsbasierte Temperaturmessung) genutzt.",
          "Bei Halbleitern verhält es sich umgekehrt: Mit steigender Temperatur sinkt der Widerstand meist, da mehr Elektronen ins Leitungsband gelangen können. Dieses unterschiedliche Verhalten ist einer der Hauptgründe, warum Metalle und Halbleitermaterialien in der Elektronik für unterschiedliche Zwecke eingesetzt werden.",
        ],
      },
      {
        title: "Supraleitung: Widerstand null",
        paragraphs: [
          "Manche Materialien verlieren beim Abkühlen auf extrem niedrige, nahe dem absoluten Nullpunkt liegende Temperaturen ihren Widerstand vollständig und werden supraleitend; in diesem Zustand kann elektrischer Strom ohne jeden Energieverlust unbegrenzt fließen.",
          "Supraleitung wird in vielen fortgeschrittenen Technologien eingesetzt, von den starken Magneten in MRT-Geräten bis zu Teilchenbeschleunigern; die meisten dieser Materialien funktionieren jedoch nur bei sehr niedrigen Temperaturen, die häufig eine Kühlung mit flüssigem Helium oder flüssigem Stickstoff erfordern.",
        ],
      },
      {
        title: "Wie wird Widerstand gemessen?",
        paragraphs: [
          "Widerstand kann direkt mit der Ohmmeter-Funktion eines Multimeters gemessen werden; das Gerät legt an das zu prüfende Bauteil eine kleine Spannung an und berechnet den Widerstand aus dem gemessenen Stromfluss.",
          "Eine Widerstandsmessung an einer stromführenden (unter Spannung stehenden) Schaltung liefert meist irreführende Ergebnisse; für eine korrekte Messung muss das Bauteil deshalb aus der Schaltung entfernt oder die Schaltung spannungsfrei geschaltet werden.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "kapasitans",
    "kapasitans",
    "Kapazitätseinheiten und Umrechnungen",
    "Rechnen Sie zwischen Farad, Millifarad, Mikrofarad, Nanofarad und Pikofarad um und erfahren Sie mehr über Kondensatorwerte im Schaltungsdesign.",
    [
      "Kapazität ist die physikalische Größe, die angibt, wie viel elektrische Ladung ein Kondensator bei einer bestimmten Spannung speichern kann. Sie spielt in elektronischen Schaltungen eine grundlegende Rolle bei Energiespeicherung, Filterung und Zeitsteuerung.",
      "Im Internationalen Einheitensystem ist die abgeleitete Einheit der Kapazität das Farad (F); da ein Farad für alltägliche elektronische Bauteile extrem groß ist, sind in der Praxis Mikrofarad (µF), Nanofarad (nF) und Pikofarad (pF) deutlich gebräuchlicher.",
    ],
    [
      { label: "Physikalische Größe", value: "Kapazität" },
      { label: "Dimensionssymbol", value: "[M⁻¹L⁻²T⁴I²]" },
      { label: "Abgeleitete SI-Einheit", value: "Farad" },
      { label: "SI-Einheitensymbol", value: "F" },
      { label: "Grundformel", value: "C = Q / U (Kapazität = Ladung / Spannung)" },
    ],
    [
      {
        title: "Was ist Kapazität?",
        paragraphs: [
          "Kapazität gibt die Menge elektrischer Ladung an, die ein Kondensator (ein Bauteil aus zwei leitenden Platten mit einem dazwischenliegenden isolierenden Material) bei einer bestimmten Spannung speichern kann. Die Formel lautet C = Q / U, wobei Q die gespeicherte Ladung und U die Spannung ist.",
          "Kapazität hängt allein von den physikalischen Eigenschaften des Kondensators ab (Plattenfläche, Abstand zwischen den Platten, Art des dazwischenliegenden Isoliermaterials); sie ist ein fester Wert, unabhängig von der Spannung oder Ladungsmenge im Stromkreis.",
        ],
      },
      {
        title: "Die SI-Einheit der Kapazität: Farad",
        paragraphs: [
          "Farad ist die abgeleitete SI-Einheit der Kapazität und wird mit dem Symbol F dargestellt; benannt nach dem britischen Wissenschaftler Michael Faraday, bekannt für seine Pionierarbeiten im Bereich Elektromagnetismus.",
          "1 Farad ist die Kapazität, die bei einer angelegten Spannung von 1 Volt eine Ladung von 1 Coulomb speichern kann. Das ist ein für alltägliche elektronische Bauteile extrem großer Wert -- deshalb liegen praktische Kondensatoren meist im Mikrofarad-, Nanofarad- oder Pikofarad-Bereich.",
        ],
      },
      {
        title: "Warum werden Pikofarad und Mikrofarad verwendet?",
        paragraphs: [
          "Die meisten in Standard-Elektronikschaltungen verwendeten Kondensatoren haben Werte zwischen Pikofarad (ein Billionstel Farad) und Mikrofarad (ein Millionstel Farad); das zeigt, wie groß die Einheit Farad in der Praxis tatsächlich ist.",
          "Ein Frequenzabstimmungskondensator in einer Radioschaltung liegt beispielsweise meist im Pikofarad-Bereich, während ein Filterkondensator in einem Netzteil mehrere hundert Mikrofarad betragen kann.",
        ],
      },
      {
        title: "Superkondensatoren: Speicherung auf Farad-Niveau",
        paragraphs: [
          "Anders als herkömmliche Kondensatoren können Superkondensatoren (Ultrakondensatoren) Kapazitätswerte von mehreren Farad, teilweise sogar Tausenden von Farad erreichen. Dies wird durch spezielle Elektrodenmaterialien und eine sehr große effektive Oberfläche ermöglicht.",
          "Superkondensatoren können deutlich schneller ge- und entladen werden als Batterien und besitzen eine viel längere Lebensdauer, speichern jedoch pro Volumen meist weniger Gesamtenergie als Batterien -- deshalb werden sie meist nicht anstelle von, sondern zusammen mit Akkus eingesetzt (für kurzzeitige hohe Leistungsanforderungen).",
        ],
      },
      {
        title: "Die Formel des Plattenkondensators",
        paragraphs: [
          "Die Kapazität des einfachsten Kondensatortyps, des Plattenkondensators, wird mit der Formel C = ε × (A/d) berechnet, wobei ε die Permittivität des Isoliermaterials, A die Plattenfläche und d der Abstand zwischen den Platten ist.",
          "Diese Formel zeigt, dass größere Platten und geringere Abstände (oder Materialien mit höherer Dielektrizitätskonstante) eine höhere Kapazität ergeben -- dieses Prinzip bildet die Grundlage der Kondensatorauslegung.",
        ],
      },
      {
        title: "Wofür werden Kondensatoren in Schaltungen verwendet?",
        paragraphs: [
          "Kondensatoren werden für viele Zwecke eingesetzt: um Spannungsschwankungen in Netzteilen zu glätten (Filterung), um in Zeitsteuerungsschaltungen durch definiertes Auf- und Entladen eine Verzögerung zu erzeugen, oder um in Audiosystemen bestimmte Frequenzen durchzulassen und andere zu blockieren (Filterschaltungen).",
          "Auch Touchscreens funktionieren nach diesem Prinzip: Sie erkennen die durch eine Fingerberührung verursachte Kapazitätsänderung -- das ist das grundlegende Funktionsprinzip der kapazitiven Touch-Technologie.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "enduktans",
    "enduktans",
    "Induktivitätseinheiten und Umrechnungen",
    "Rechnen Sie zwischen Henry, Millihenry und Mikrohenry um und erfahren Sie mehr über Spulen- und Transformatorendesign.",
    [
      "Induktivität ist die physikalische Größe, die die Fähigkeit eines Bauteils (meist einer Spule) angibt, bei einer Änderung des durch sie fließenden Stroms eine Spannung in sich selbst zu induzieren. Sie liegt der Funktionsweise vieler elektrischer Maschinen zugrunde, von Transformatoren bis zu Motoren.",
      "Im Internationalen Einheitensystem ist die abgeleitete Einheit der Induktivität das Henry (H); in praktischen elektronischen Bauteilen werden meist deutlich kleinere Werte wie Millihenry (mH) und Mikrohenry (µH) verwendet.",
    ],
    [
      { label: "Physikalische Größe", value: "Induktivität" },
      { label: "Dimensionssymbol", value: "[ML²T⁻²I⁻²]" },
      { label: "Abgeleitete SI-Einheit", value: "Henry" },
      { label: "SI-Einheitensymbol", value: "H" },
      { label: "Grundformel", value: "U = L × (dI/dt) (Induzierte Spannung = Induktivität × Stromänderungsrate)" },
    ],
    [
      {
        title: "Was ist Induktivität?",
        paragraphs: [
          "Induktivität ist die Eigenschaft eines Leiters (besonders einer Spule), bei einer Änderung des durch ihn fließenden Stroms eine dieser Änderung entgegenwirkende Spannung zu induzieren. Dieses Phänomen beruht auf Faradays Gesetz der elektromagnetischen Induktion.",
          "Ändert sich der durch eine Spule fließende Strom schnell, erzeugt die Spule eine Spannung, die dieser Änderung entgegenwirkt -- diese Eigenschaft beschreibt das Verhalten der Induktivität, 'plötzlichen Änderungen zu widerstehen', und wird mit dem Symbol L dargestellt.",
        ],
      },
      {
        title: "Die SI-Einheit der Induktivität: Henry",
        paragraphs: [
          "Henry ist die abgeleitete SI-Einheit der Induktivität und wird mit dem Symbol H dargestellt; benannt nach dem US-amerikanischen Wissenschaftler Joseph Henry, der die elektromagnetische Induktion unabhängig von Faraday entdeckte.",
          "Beträgt die Induktivität einer Spule 1 Henry, wird eine Spannung von 1 Volt induziert, wenn sich der durch sie fließende Strom um 1 Ampere pro Sekunde ändert. In der Praxis ist 1 Henry ein recht großer Wert; alltägliche elektronische Bauteile verwenden meist Spulen im Millihenry- oder Mikrohenry-Bereich.",
        ],
      },
      {
        title: "Induktivität in Spulen und Transformatoren",
        paragraphs: [
          "Die Induktivität einer Spule hängt von der Windungszahl, der Geometrie der Spule (Länge, Querschnittsfläche) und dem Kernmaterial (Luft, Eisen, Ferrit) ab. Mehr Windungen und ein Eisen- oder Ferritkern erhöhen die Induktivität erheblich.",
          "Transformatoren funktionieren, indem zwei oder mehr Spulen über einen gemeinsamen magnetischen Kern induktiv miteinander verbunden werden; dadurch kann die Spannung in einem Stromkreis ohne physische Verbindung auf einen anderen übertragen und umgewandelt werden.",
        ],
      },
      {
        title: "Warum wird Induktivität als 'Widerstand gegen Stromänderung' bezeichnet?",
        paragraphs: [
          "Wird versucht, den durch eine Spule fließenden Strom plötzlich zu unterbrechen, kann dies zu einem starken Spannungssprung in der Spule führen (manchmal sogar zu Funkenbildung) -- denn die Spule induziert eine starke Spannung, die der plötzlichen Stromänderung entgegenwirkt.",
          "Diese Eigenschaft erfordert beim Schaltungsentwurf besondere Vorkehrungen (etwa den Einsatz von Freilaufdioden), um schädliche Spannungsspitzen zu vermeiden, die beim Abschalten von Elektromotoren oder Relais entstehen können.",
        ],
      },
      {
        title: "Induktiver Blindwiderstand und Wechselstrom",
        paragraphs: [
          "In Wechselstromkreisen (AC) zeigt eine Spule eine frequenzabhängige, widerstandsähnliche Wirkung (induktiver Blindwiderstand); diese Wirkung wird mit der Formel X_L = 2πfL berechnet (f: Frequenz, L: Induktivität).",
          "Mit steigender Frequenz nimmt auch der induktive Blindwiderstand zu -- deshalb werden Spulen häufig in Filterschaltungen eingesetzt, die niedrige Frequenzen durchlassen und hohe blockieren (Tiefpassfilter).",
        ],
      },
      {
        title: "Wie wird Induktivität gemessen?",
        paragraphs: [
          "Induktivität kann direkt mit speziellen Messgeräten namens LCR-Meter gemessen werden; diese Geräte legen ein Testsignal an und berechnen aus der Reaktion des Bauteils die Induktivität (sowie meist auch Widerstand und Kapazität).",
          "Manche Multimeter besitzen eine einfache Induktivitätsmessfunktion, doch für Anwendungen mit hohem Genauigkeitsanspruch (Spulenentwicklung, Transformatorprüfung) werden meist spezielle LCR-Meter bevorzugt.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "elektrik_yuk",
    "elektrik_yuk",
    "Elektrische-Ladungseinheiten und Umrechnungen",
    "Rechnen Sie zwischen Coulomb, Millicoulomb, Mikrocoulomb und Nanocoulomb um und erfahren Sie mehr über Batteriekapazität und elektrostatische Berechnungen.",
    [
      "Elektrische Ladung ist eine grundlegende physikalische Eigenschaft, die Teilchen oder Körper zu elektromagnetischen Wechselwirkungen befähigt. Sie ist eine zentrale Größe in vielen Bereichen, von Batterien über statische Elektrizität bis zu Elektrolyseprozessen und der Teilchenphysik.",
      "Im Internationalen Einheitensystem ist die abgeleitete Einheit der elektrischen Ladung das Coulomb (C). In alltäglichen elektronischen Anwendungen werden meist deutlich kleinere Werte wie Millicoulomb (mC), Mikrocoulomb (µC) und Nanocoulomb (nC) verwendet.",
    ],
    [
      { label: "Physikalische Größe", value: "Elektrische Ladung" },
      { label: "Dimensionssymbol", value: "[TI]" },
      { label: "Abgeleitete SI-Einheit", value: "Coulomb" },
      { label: "SI-Einheitensymbol", value: "C" },
      { label: "Elementarladung (Elektron/Proton)", value: "e ≈ 1,602176634 × 10⁻¹⁹ C" },
    ],
    [
      {
        title: "Was ist elektrische Ladung?",
        paragraphs: [
          "Elektrische Ladung ist eine grundlegende Eigenschaft, die dazu führt, dass Teilchen sich über die elektromagnetische Kraft anziehen oder abstoßen. Ladung tritt in zwei Formen auf: positiv (bei Protonen) und negativ (bei Elektronen); gleichnamige Ladungen stoßen sich ab, ungleichnamige ziehen sich an.",
          "Elektrische Ladung wird seit der SI-Revision 2019 über den exakt festgelegten Zahlenwert der Elementarladung (e) definiert; dadurch beruht die Einheit Coulomb nicht mehr auf einer indirekten Messung, sondern auf einer universellen Naturkonstante.",
        ],
      },
      {
        title: "Die SI-Einheit der elektrischen Ladung: Coulomb",
        paragraphs: [
          "Coulomb ist die abgeleitete SI-Einheit der elektrischen Ladung und wird mit dem Symbol C dargestellt; benannt nach dem französischen Physiker Charles-Augustin de Coulomb. Ein Coulomb entspricht der Gesamtladung von etwa 6,242 × 10¹⁸ Elektronen.",
          "Coulomb lässt sich auch aus dem Produkt von Stromstärke (Ampere) und Zeit (Sekunde) ableiten: Q = I × t. Dieser Zusammenhang zeigt die direkte Verbindung zwischen elektrischer Ladung und elektrischem Strom -- fließt ein Strom von 1 Ampere eine Sekunde lang, wird genau eine Ladung von 1 Coulomb transportiert.",
        ],
      },
      {
        title: "Die Elementarladung: die kleinste Ladungseinheit des Universums",
        paragraphs: [
          "Der Ladungsbetrag eines Elektrons oder Protons (abgesehen vom Vorzeichen) ist die kleinste im Universum beobachtete Ladungseinheit und wird als 'Elementarladung' (e) bezeichnet; ihr Wert beträgt etwa 1,602176634 × 10⁻¹⁹ Coulomb.",
          "Alle in der Natur beobachteten freien Ladungen sind ganzzahlige Vielfache dieser Elementarladung (manche fundamentalen Teilchen wie Quarks tragen zwar eine gebrochene Ladung, werden aber nie frei beobachtet) -- diese Eigenschaft wird als 'Quantelung' der Ladung bezeichnet.",
        ],
      },
      {
        title: "Batteriekapazität und Amperestunde",
        paragraphs: [
          "Die Kapazität von Batterien und Akkus wird meist nicht in Coulomb, sondern in Amperestunden (Ah) oder Milliamperestunden (mAh) angegeben; das ist im Alltag eine anschaulichere Einheit. 1 Amperestunde entspricht genau 3600 Coulomb.",
          "Ein Smartphone-Akku mit '4000 mAh' Kapazität kann theoretisch 4 Stunden lang einen Strom von 1 Ampere liefern (oder 1 Stunde lang 4000 Milliampere) -- die tatsächliche Nutzungsdauer hängt vom Stromverbrauch des Geräts ab.",
        ],
      },
      {
        title: "Statische Elektrizität und Ladungsaufbau",
        paragraphs: [
          "Statische Elektrizität ist ein Ladungsungleichgewicht, das entsteht, wenn beim Reiben zweier unterschiedlicher Materialien Elektronen von einer Oberfläche zur anderen übergehen; das ist der Grund für den kleinen Stromschlag, den man im Winter beim Berühren einer Türklinke spürt.",
          "Statische Ladungen liegen meist nur im Mikrocoulomb- oder Nanocoulomb-Bereich, können aber sehr hohen Spannungen (teilweise Tausenden von Volt) entsprechen, da die Kapazität sehr gering ist (gemäß dem Zusammenhang U = Q/C).",
        ],
      },
      {
        title: "Die Erhaltung der elektrischen Ladung",
        paragraphs: [
          "Die Erhaltung der elektrischen Ladung ist eines der grundlegendsten Erhaltungsgesetze der Physik: Die Gesamtladung eines geschlossenen Systems bleibt konstant, kann weder erzeugt noch vernichtet, sondern nur von einem Ort zum anderen übertragen werden.",
          "Dieses Prinzip bildet die Grundlage von Berechnungen in vielen Bereichen, von elektrochemischen Reaktionen (Batterien, Elektrolyse) bis zu Kollisionsexperimenten in der Teilchenphysik.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "altin_ayar",
    "altin_ayar",
    "Goldkarat-Umrechnungen",
    "Rechnen Sie zwischen 24, 22, 18 und 14 Karat Gold basierend auf dem reinen Goldgehalt um und erfahren Sie mehr über Reinheitsgrade in der Schmuckherstellung.",
    [
      "Gold wird bei Schmuck fast nie in reiner Form verwendet -- da es ein sehr weiches und leicht verkratzbares Metall ist, wird es mit Metallen wie Silber oder Kupfer zu einer Legierung verbunden. Karat (in Deutschland oft auch als Feingehalt in Promille angegeben) ist das Maß für den Anteil an reinem Gold in dieser Legierung.",
      "Die Skala läuft bis 24: 24 Karat bedeutet vollständig reines Gold (100 %), 22 Karat bedeutet, dass 22/24 der Legierung (etwa 91,6 %) reines Gold sind. Die Umrechnung berechnet dabei nicht dieselbe physikalische Größe in anderen Einheiten, sondern den Gramm-Gegenwert derselben Legierung bei unterschiedlichem Reinheitsgrad.",
    ],
    [
      { label: "Messsystem", value: "Feingehaltsstandard der Schmuckherstellung (Karat)" },
      { label: "Grundreferenz", value: "24 Karat = 100 % reines Gold" },
      { label: "In Deutschland gebräuchlichster Feingehalt", value: "585 (14 Karat, Alltagsschmuck)" },
      { label: "International bei Ring/Kette verbreitet", value: "18 Karat (750)" },
      { label: "Berechnungslogik", value: "Gramm × (Ausgangskarat / 24) ÷ (Zielkarat / 24)" },
    ],
    [
      {
        title: "Was genau misst Karat?",
        paragraphs: [
          "Karat gibt an, welcher Anteil des Gewichts eines Goldstücks tatsächlich aus Gold besteht. 24 Karat ist reines Gold; 22, 18 und 14 Karat sind Gold, das mit Silber beziehungsweise Kupfer legiert und dadurch härter, aber weniger rein ist.",
          "Ein 22-karätiges Armband enthält also im Vergleich zu 24 Karat etwas weniger reines Gold, ist dafür aber widerstandsfähiger -- deshalb bevorzugen Goldschmiede für Armbänder oft 22 Karat und für Ringe und Ketten meist 18 oder 14 Karat.",
        ],
      },
      {
        title: "Wie wird der Reingoldgehalt berechnet?",
        paragraphs: [
          "Um den Reingoldanteil eines 10 Gramm schweren 22-karätigen Armbands zu ermitteln: 10 × (22 / 24) = 9,17 Gramm reines (24-Karat-äquivalentes) Gold. Die restlichen etwa 0,83 Gramm sind andere Metalle, die für Stabilität zugesetzt wurden.",
          "Würde ein Goldschmied dieselben 9,17 Gramm reines Gold einschmelzen und zu 18 Karat umarbeiten: 9,17 ÷ (18 / 24) = 12,22 Gramm Gesamtlegierung -- weil der Reingoldanteil bei 18 Karat geringer ist, verteilt sich dieselbe Menge reines Gold auf ein größeres Gesamtgewicht.",
        ],
      },
      {
        title: "Welcher Feingehalt wird wofür verwendet?",
        paragraphs: [
          "24 Karat wird wegen seiner Weichheit kaum für Alltagsschmuck verwendet, sondern vor allem für Barren und Anlagegold. 22 Karat ist in der Türkei und im Nahen Osten der Standard für Armbänder und traditionellen Schmuck.",
          "18 Karat ist wegen seiner höheren Härte weltweit bei Alltagsschmuck wie Ringen mit Diamanten und Ketten verbreitet. 14 Karat (585) ist in Deutschland der gebräuchlichste Feingehalt für Alltagsschmuck, da es günstiger und noch widerstandsfähiger ist.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "yogunluk",
    "yogunluk",
    "Dichteeinheiten und Umrechnungen",
    "Rechnen Sie zwischen Kilogramm pro Kubikmeter und Gramm pro Kubikzentimeter um und vergleichen Sie die Dichte von Wasser und gängigen Materialien.",
    [
      "Dichte ist eine abgeleitete physikalische Größe, die die Masse eines Stoffes pro Volumeneinheit angibt. Sie zeigt, wie 'kompakt' oder 'locker' ein Stoff ist und wie sich die Massen zweier verschiedener Stoffe bei gleichem Volumen unterscheiden.",
      "Im Internationalen Einheitensystem ist die abgeleitete Einheit der Dichte Kilogramm pro Kubikmeter (kg/m³); im Labor und Alltag sind Gramm pro Kubikzentimeter (g/cm³) und Kilogramm pro Liter (kg/L) gebräuchlicher. Diese drei Einheiten sind zahlenmäßig gleich.",
    ],
    [
      { label: "Physikalische Größe", value: "Dichte" },
      { label: "Dimensionssymbol", value: "[ML⁻³]" },
      { label: "Abgeleitete SI-Einheit", value: "Kilogramm pro Kubikmeter" },
      { label: "SI-Einheitensymbol", value: "kg/m³" },
      { label: "Dichte von Wasser (bei 4 °C)", value: "1000 kg/m³ = 1 g/cm³ = 1 kg/L" },
    ],
    [
      {
        title: "Was ist Dichte?",
        paragraphs: [
          "Dichte gibt die Masse eines Stoffes pro Volumeneinheit an und wird mit dem Symbol ρ (Rho) dargestellt. Die Formel lautet ρ = m / V, wobei m die Masse und V das Volumen ist.",
          "Dichte ist eine abgeleitete Größe; sie ergibt sich aus der Division von Masse durch Volumen und besitzt die SI-Dimension ML⁻³ (Masse durch Länge hoch drei). Unterschiedlich große Proben desselben Stoffes (kleine oder große Stücke) besitzen stets dieselbe Dichte -- Dichte ist eine stoffspezifische Eigenschaft und hängt nicht von der Menge ab.",
        ],
      },
      {
        title: "Warum ist die Dichte von Wasser die Referenz?",
        paragraphs: [
          "Die Dichte von Wasser bei 4 °C (der Temperatur seiner höchsten Dichte) entspricht genau 1000 kg/m³, also 1 g/cm³. Das liegt daran, dass die Einheiten Gramm und Kubikzentimeter historisch anhand der Dichte von Wasser definiert wurden.",
          "Dieser Referenzwert liegt dem Begriff der 'relativen Dichte' (spezifisches Gewicht) zugrunde -- dem Verhältnis der Dichte eines Stoffes zur Dichte von Wasser. Eis mit einer relativen Dichte von 0,92 ist beispielsweise weniger dicht als Wasser und schwimmt deshalb an der Oberfläche.",
        ],
      },
      {
        title: "Gleichwertigkeit zwischen Dichteeinheiten",
        paragraphs: [
          "Zwischen Kilogramm pro Kubikmeter (kg/m³), Gramm pro Kubikzentimeter (g/cm³) und Kilogramm pro Liter (kg/L) besteht ein praktischer Zusammenhang: 1 g/cm³ entspricht genau 1 kg/L und 1000 kg/m³. Das liegt daran, dass sich sowohl die Masse- als auch die Volumeneinheit im gleichen Verhältnis (um den Faktor 1000) ändern.",
          "Diese Gleichwertigkeit erleichtert es, denselben Zahlenwert bei Labormessungen (meist g/cm³ oder g/mL) und bei industriellen beziehungsweise technischen Berechnungen (meist kg/m³) mit unterschiedlichen Einheiten auszudrücken.",
        ],
      },
      {
        title: "Zusammenhang zwischen Dichte, Masse und Volumen",
        paragraphs: [
          "Die Dichteformel (ρ = m/V) lässt sich in alle drei Richtungen verwenden: Aus Masse und Volumen kann die Dichte, aus Dichte und Volumen die Masse und aus Dichte und Masse das Volumen berechnet werden. Das ist die Grundlage für die Berechnung des Materialgewichts (das Gewicht eines Bauteils aus seinem Volumen).",
          "Ein Bauteil mit 2 Kubikmeter Volumen und einer Dichte von 7850 kg/m³ (typische Stahldichte) hat beispielsweise eine Masse von 2 × 7850 = 15.700 kg.",
        ],
      },
      {
        title: "Dichteeinheiten im britisch-amerikanischen System",
        paragraphs: [
          "In der britisch-amerikanischen Ingenieurpraxis werden Einheiten wie Pfund pro Kubikfuß (lb/ft³) und Pfund pro Kubikzoll (lb/in³) verwendet. Ein lb/ft³ entspricht etwa 16,02 kg/m³.",
          "Eine weniger bekannte Einheit ist Slug pro Kubikfuß (slug/ft³), die auf dem im britischen Maßsystem verwendeten Masseeinheit 'Slug' beruht -- Slug ist eine spezielle, im Alltag kaum vorkommende Masseeinheit, die sich aus dem Zusammenhang von Pound-force und Beschleunigung (F=ma) ableitet.",
        ],
      },
      {
        title: "Warum ist die Dichte von Flüssigkeiten und Gasen veränderlich?",
        paragraphs: [
          "Während die Dichte von Feststoffen meist als konstant angenommen wird, verändert sich die Dichte von Flüssigkeiten und besonders von Gasen deutlich in Abhängigkeit von Temperatur und Druck. Luft hat auf Meereshöhe eine Dichte von etwa 1,225 kg/m³; mit zunehmender Höhe sinkt der Druck und damit auch die Dichte.",
          "Diese Veränderlichkeit ist der Grund, warum in der Luftfahrt der Begriff 'Dichtehöhe' und in der Seefahrt die (von Salzgehalt und Temperatur abhängige) Dichte des Meerwassers bei der Berechnung der Tiefgangslinie von Schiffen berücksichtigt wird.",
        ],
      },
      {
        title: "Wie wird Dichte gemessen?",
        paragraphs: [
          "Um die Dichte eines Festkörpers zu messen, wird seine Masse mit einer Waage bestimmt und sein Volumen entweder direkt geometrisch gemessen oder durch Eintauchen in Wasser über die verdrängte Wassermenge (archimedisches Prinzip) ermittelt.",
          "Die Dichte von Flüssigkeiten wird meist direkt mit einem Aräometer (Dichtemesser) gemessen; dieses Gerät sinkt beim Eintauchen in die Flüssigkeit je nach Dichte unterschiedlich tief ein und zeigt die Dichte direkt an.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "kuvvet",
    "kuvvet",
    "Krafteinheiten und Umrechnungen",
    "Rechnen Sie zwischen Newton und Kilogramm-Kraft um und erfahren Sie mehr über die Kraftformel und ihre Anwendung in der Technik.",
    [
      "Kraft ist die physikalische Einwirkung, die die Geschwindigkeit eines Körpers (nach Betrag oder Richtung) verändern, ihn beschleunigen, abbremsen oder seine Form verändern kann. Nach Newtons zweitem Bewegungsgesetz entspricht Kraft dem Produkt aus Masse und Beschleunigung.",
      "Im Internationalen Einheitensystem ist die abgeleitete Einheit der Kraft das Newton (N); in der Technik werden zudem Kilogramm-Kraft (kgf) und Pound-force (lbf), in Physik und Chemie für kleine Kräfte auch Dyn verwendet.",
    ],
    [
      { label: "Physikalische Größe", value: "Kraft" },
      { label: "Dimensionssymbol", value: "[MLT⁻²]" },
      { label: "Abgeleitete SI-Einheit", value: "Newton" },
      { label: "SI-Einheitensymbol", value: "N" },
      { label: "Grundformel", value: "F = m × a (Newtons zweites Gesetz)" },
    ],
    [
      {
        title: "Was ist Kraft?",
        paragraphs: [
          "Kraft ist eine physikalische Einwirkung, die den Bewegungszustand eines Körpers verändern kann (beschleunigen, abbremsen, Richtung ändern) oder ihn verformen kann. Sie ist eine vektorielle Größe; sie besitzt sowohl einen Betrag als auch eine Richtung.",
          "Nach Newtons zweitem Bewegungsgesetz entspricht die auf einen Körper wirkende Nettokraft dem Produkt aus seiner Masse und der dadurch bewirkten Beschleunigung: F = m × a. Dies ist eine der grundlegendsten Gleichungen der klassischen Mechanik.",
        ],
      },
      {
        title: "Die SI-Einheit der Kraft: Newton",
        paragraphs: [
          "Newton ist die abgeleitete SI-Einheit der Kraft und wird mit dem Symbol N dargestellt; benannt nach dem englischen Physiker Isaac Newton. Ein Newton entspricht der Kraft, die nötig ist, um einen Körper mit 1 Kilogramm Masse mit 1 m/s² zu beschleunigen (1 N = 1 kg·m/s²).",
          "Im Alltag ist 1 Newton eine recht kleine Kraft -- sie entspricht etwa der Gewichtskraft, die ein rund 100 Gramm schwerer Apfel auf der Erde erfährt.",
        ],
      },
      {
        title: "Gewicht ist eine Kraft",
        paragraphs: [
          "Gewicht ist die Kraft, die ein Körper in einem Gravitationsfeld erfährt, und wird mit der Formel W = m × g berechnet, wobei g die lokale Erdbeschleunigung ist (im Mittel 9,80665 m/s² auf der Erde).",
          "Deshalb sollte 'Gewicht' technisch nicht in Kilogramm, sondern in Newton gemessen werden; das umgangssprachlich in Kilogramm angegebene 'Gewicht' ist eigentlich die Masse. Die Masse eines Körpers bleibt auf der Erde und dem Mond gleich, sein Gewicht (als Kraft) ändert sich jedoch aufgrund unterschiedlicher Erdbeschleunigung.",
        ],
      },
      {
        title: "Kilogramm-Kraft und Pound-force",
        paragraphs: [
          "Kilogramm-Kraft (kgf) ist eine 'gravitationsbasierte' Einheit, die die Gewichtskraft angibt, die ein Körper mit 1 Kilogramm Masse bei der Standard-Erdbeschleunigung (9,80665 m/s²) erfährt; 1 kgf entspricht exakt 9,80665 Newton.",
          "Analog dazu ist Pound-force (lbf) die Kraft, die ein Körper mit 1 Pfund Masse bei Standard-Erdbeschleunigung erfährt, und entspricht etwa 4,4482216 Newton. Da diese Einheiten das Risiko einer Verwechslung mit der Masseneinheit (kg, lb) bergen, wird in der Wissenschaft meist das Newton bevorzugt.",
        ],
      },
      {
        title: "Dyn: Kraft im CGS-System",
        paragraphs: [
          "Dyn ist die Krafteinheit des heute weitgehend aufgegebenen CGS-Systems (Zentimeter-Gramm-Sekunde); 1 Dyn ist definiert als die Kraft, die eine Masse von 1 Gramm mit 1 cm/s² beschleunigt, und entspricht 0,00001 (10⁻⁵) Newton.",
          "Obwohl Dyn heute selten verwendet wird, findet man die Einheit noch in älterer wissenschaftlicher Literatur sowie in manchen Chemie- und Physikquellen, in denen sehr kleine Kräfte wie die Oberflächenspannung angegeben werden.",
        ],
      },
      {
        title: "Zusammenhang zwischen Kraft und Druck",
        paragraphs: [
          "Druck ist definiert als Kraft pro Flächeneinheit (P = F/A); Kraft und Druck sind daher eng verwandte, aber nicht identische Größen. Dieselbe Kraft erzeugt auf einer kleineren Fläche einen deutlich höheren Druck.",
          "Dieser Zusammenhang erklärt beispielsweise, warum die Spitze einer Nadel so leicht eindringen kann: Die auf die Nadelspitze wirkende Kraft ist zwar gering, doch da die Kontaktfläche extrem klein ist, entsteht dabei ein sehr hoher Druck.",
        ],
      },
      {
        title: "Wie wird Kraft gemessen?",
        paragraphs: [
          "Zur Kraftmessung werden Federkraftmesser (Dynamometer), Wägezellen (Load Cells) und piezoelektrische Sensoren eingesetzt. Federkraftmesser berechnen die Kraft, indem sie messen, wie stark sich eine Feder unter Krafteinwirkung dehnt (nach dem Hookeschen Gesetz).",
          "In industriellen Wägesystemen und Präzisionsgeräten wie Drehmomentschlüsseln werden meist Wägezellen eingesetzt; diese wandeln die einwirkende Kraft in ein elektrisches Signal um und ermöglichen so eine digitale Messung.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "tork",
    "tork",
    "Drehmomenteinheiten und Umrechnungen",
    "Rechnen Sie zwischen Newtonmeter und Pfund-Fuß um und erfahren Sie mehr über Motordrehmoment, Drehmomentschlüssel und Schraubwerte.",
    [
      "Drehmoment ist eine abgeleitete physikalische Größe, die die Drehwirkung einer Kraft um eine Achse beschreibt. Es begegnet einem in vielen technischen und alltäglichen Anwendungen, von der Motorleistung bis zu Anzugswerten von Schrauben.",
      "Im Internationalen Einheitensystem ist die abgeleitete Einheit des Drehmoments das Newtonmeter (N·m); in der Fahrzeugtechnik ist zudem Kilogramm-Kraft-Meter (kgf·m), in der US-amerikanischen Technik Pfund-Fuß (lb-ft) gebräuchlich.",
    ],
    [
      { label: "Physikalische Größe", value: "Drehmoment" },
      { label: "Dimensionssymbol", value: "[ML²T⁻²]" },
      { label: "Abgeleitete SI-Einheit", value: "Newtonmeter" },
      { label: "SI-Einheitensymbol", value: "N·m" },
      { label: "Grundformel", value: "Drehmoment (τ) = Kraft × Hebelarm (Abstand)" },
    ],
    [
      {
        title: "Was ist Drehmoment?",
        paragraphs: [
          "Drehmoment ist die Drehwirkung, die eine Kraft um eine Drehachse ausübt, und wird mit dem Symbol τ (Tau) dargestellt. Die Formel lautet τ = F × r, wobei F die wirkende Kraft und r der senkrechte Abstand (Hebelarm) zwischen Angriffspunkt der Kraft und Drehachse ist.",
          "Eine Kraft gleicher Größe erzeugt ein größeres Drehmoment, wenn sie an einem weiter von der Drehachse entfernten Punkt angreift. Dieses Prinzip wird Hebelwirkung genannt und erklärt, warum ein langer Schraubenschlüssel das Lösen einer Mutter erleichtert.",
        ],
      },
      {
        title: "Die SI-Einheit des Drehmoments: Newtonmeter",
        paragraphs: [
          "Newtonmeter (N·m) ist die abgeleitete SI-Einheit des Drehmoments; sie entspricht dem Drehmoment, das entsteht, wenn eine Kraft von 1 Newton in 1 Meter Abstand von der Drehachse angreift.",
          "Newtonmeter hat dieselbe dimensionale Darstellung (N·m) wie die SI-Basisentsprechung der Energieeinheit Joule; Drehmoment und Energie sind jedoch völlig unterschiedliche physikalische Größen -- deshalb wird Drehmoment niemals in 'Joule' angegeben, sondern stets als N·m geschrieben.",
        ],
      },
      {
        title: "Warum sollte Drehmoment nicht mit Joule verwechselt werden?",
        paragraphs: [
          "Energie ist das Skalarprodukt aus einer Kraft und der Verschiebung in Richtung dieser Kraft (ergibt eine Zahl); Drehmoment ist dagegen das Vektorprodukt aus einer Kraft und dem Hebelarm (ergibt eine gerichtete Größe). Beide werden mathematisch aus unterschiedlichen Operationen abgeleitet (Skalarprodukt gegenüber Vektorprodukt).",
          "Wegen dieses konzeptionellen Unterschieds können Drehmoment und Energie trotz gleicher Zahlenwert-Einheit (N·m) nicht gegeneinander ausgetauscht werden -- ein Motordrehmoment von 300 N·m bedeutet nicht 300 Joule Energie.",
        ],
      },
      {
        title: "Motordrehmoment und Anwendung im Fahrzeugbau",
        paragraphs: [
          "Das Motordrehmoment eines Fahrzeugs zeigt, wie viel 'Zugkraft' oder Beschleunigungsvermögen der Motor liefert; hohes Drehmoment bei niedriger Drehzahl ist meist wichtig für zügiges Anfahren und Bergfahrten.",
          "Der Zusammenhang zwischen Drehmoment und Leistung (PS) hängt von der Drehzahl (U/min) ab: Leistung = Drehmoment × Winkelgeschwindigkeit. Deshalb werden Drehmoment- und Leistungskurve eines Motors gemeinsam betrachtet, um sein Verhalten bei unterschiedlichen Drehzahlen zu verstehen.",
        ],
      },
      {
        title: "Drehmomentschlüssel und Schraubenanzug",
        paragraphs: [
          "Drehmomentschlüssel werden verwendet, um eine Schraube oder Mutter genau bis zum vom Hersteller vorgegebenen Drehmomentwert anzuziehen; das verhindert sowohl ein Lösen durch zu geringes als auch eine Beschädigung von Schraube oder Gewinde durch zu starkes Anziehen.",
          "In Fahrzeug- und Maschinenbau gibt es für jede Schraubverbindung (etwa Radschrauben oder Zylinderkopfdeckel) einen vom Hersteller festgelegten genauen Drehmomentwert (meist in N·m); wird dieser über- oder unterschritten, kann das ein Sicherheitsrisiko darstellen.",
        ],
      },
      {
        title: "Kilogramm-Kraft-Meter und Pfund-Fuß",
        paragraphs: [
          "Kilogramm-Kraft-Meter (kgf·m) ist eine gravitationsbasierte Drehmomenteinheit, die vor allem in einigen (europäischen und asiatischen) Fahrzeugkatalogen noch verwendet wird; 1 kgf·m entspricht genau 9,80665 N·m.",
          "Pfund-Fuß (lb-ft) ist die in der US-amerikanischen Fahrzeug- und Maschinenbautechnik standardmäßig verwendete Drehmomenteinheit; 1 lb-ft entspricht etwa 1,355818 N·m. Beim Interpretieren von Drehmomentwerten aus US-amerikanischen Motorkatalogen ist die korrekte Umrechnung in N·m wichtig.",
        ],
      },
      {
        title: "Wie wird Drehmoment gemessen?",
        paragraphs: [
          "Zur Drehmomentmessung werden Drehmomentschlüssel (einfach mechanisch oder digital), Drehmomentsensoren (auf Basis von Dehnungsmessstreifen) und Dynamometer eingesetzt. Auf Motorprüfständen können Dynamometer das Drehmoment und die Leistungsabgabe eines Motors bei unterschiedlichen Drehzahlen gleichzeitig messen.",
          "In präzisionskritischen industriellen Anwendungen (etwa Luftfahrt oder Medizintechnikfertigung) können digitale Drehmomentschlüssel das aufgebrachte Drehmoment in Echtzeit anzeigen und bei Überschreiten des festgelegten Werts warnen.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "aci",
    "aci",
    "Winkeleinheiten und Umrechnungen",
    "Rechnen Sie zwischen Grad, Radiant und Gon um und erfahren Sie mehr über Trigonometrie, technisches Zeichnen und Navigation.",
    [
      "Ein Winkel ist eine geometrische Größe, die das Ausmaß der Drehung beschreibt, das entsteht, wenn sich zwei Geraden oder Ebenen in einem Punkt schneiden. Er ist eine grundlegende Messgröße in zahllosen Bereichen, von der Trigonometrie über technisches Zeichnen bis zu Navigation und Computergrafik.",
      "Im Alltag und im Geometrieunterricht ist Grad die gebräuchlichste Winkeleinheit; in Mathematik und Physik wird dagegen meist Radiant bevorzugt, da es die Ableitungs- und Integralformeln trigonometrischer Funktionen erheblich vereinfacht. Gon ist eine dezimalfreundliche Einheit, die vor allem in der Geodäsie verwendet wird.",
    ],
    [
      { label: "Physikalische Größe", value: "Ebener Winkel" },
      { label: "Dimensionssymbol", value: "dimensionslos (Verhältnis Bogenlänge/Radius)" },
      { label: "Abgeleitete SI-Einheit", value: "Radiant" },
      { label: "SI-Einheitensymbol", value: "rad" },
      { label: "Vollkreis", value: "360° = 2π rad = 400 gon = 1 volle Umdrehung" },
    ],
    [
      {
        title: "Was ist ein Winkel?",
        paragraphs: [
          "Ein Winkel beschreibt das Ausmaß der Drehung zwischen zwei von einem Punkt ausgehenden Strahlen (oder dem Schnitt zweier Geraden). Er ist eine grundlegende Messgröße in Geometrie, Trigonometrie, Navigation und technischem Zeichnen.",
          "Technisch ist ein Winkel eine dimensionslose Größe -- er wird als Verhältnis der Bogenlänge eines Kreises zu seinem Radius definiert (im Bogenmaß). Das bedeutet, dass ein Winkel keine 'grundlegende' physikalische Dimension wie Länge, Masse oder Zeit besitzt, sondern ein reines Verhältnis ist.",
        ],
      },
      {
        title: "Radiant: die natürliche Winkeleinheit der Mathematik",
        paragraphs: [
          "Ein Radiant ist definiert als der Winkel, den ein Kreisbogen mit einer Länge gleich dem Radius im Mittelpunkt bildet. Da ein Vollkreis einen Umfang von etwa dem 6,2832-fachen (also 2π) seines Radius hat, entspricht ein Vollkreis 2π Radiant.",
          "Der mathematische Vorteil des Radianten besteht darin, dass trigonometrische Funktionen (Sinus, Kosinus) bei Ableitung und Integration ohne zusätzliche Umrechnungskonstante direkt verwendet werden können -- deshalb wird Radiant in fortgeschrittener Mathematik, Physik und Technik bevorzugt.",
        ],
      },
      {
        title: "Grad: die Winkeleinheit des Alltags",
        paragraphs: [
          "Grad teilt einen Vollkreis in 360 gleiche Teile und ist die im Alltag und im grundlegenden Geometrieunterricht am häufigsten verwendete Winkeleinheit. Ein Grad lässt sich in 60 Bogenminuten unterteilen, eine Bogenminute wiederum in 60 Bogensekunden.",
          "Die Wahl der Zahl 360 geht auf das sexagesimale (60er-)Zahlensystem des antiken Babylon zurück; dass 360 durch viele Zahlen wie 2, 3, 4, 5, 6, 8, 9, 10 und 12 teilbar ist, erleichterte die Aufteilung von Winkeln in praktische Brüche (Hälfte, Drittel, Viertel). Auch die Nähe von 360 zur Anzahl der Tage eines Sonnenjahres (etwa 365) gilt als historischer Einflussfaktor.",
        ],
      },
      {
        title: "Gon: die dezimalfreundliche Winkeleinheit",
        paragraphs: [
          "Gon (Gradiant) ist eine nach der Französischen Revolution im Zuge des metrischen Systems vorgeschlagene Winkeleinheit, die einen rechten Winkel in genau 100 Teile unterteilt; ein Vollkreis entspricht 400 Gon.",
          "Der wesentliche Vorteil von Gon ist seine Kompatibilität mit dem Dezimalsystem -- ein rechter Winkel wird als 100 Gon, ein gestreckter Winkel als 200 Gon ausgedrückt. Aus diesem Grund wird es besonders in Europa in Teilen der Geodäsie und Kartografie noch verwendet.",
        ],
      },
      {
        title: "Vollständige Umdrehung und Drehzahl",
        paragraphs: [
          "Eine volle Umdrehung beschreibt eine vollständige Drehung, bei der ein Körper zu seiner Ausgangslage zurückkehrt, und entspricht 360° (2π Radiant). Diese Einheit ist besonders nützlich, um anzugeben, wie oft sich ein rotierendes Maschinenteil oder ein Objekt gedreht hat.",
          "In der Technik wird die Umdrehungszahl oft auch zeitbezogen angegeben (Umdrehungen pro Minute, U/min beziehungsweise RPM); dies zeigt den direkten Zusammenhang zwischen Winkel und der Kategorie Winkelgeschwindigkeit.",
        ],
      },
      {
        title: "Umrechnung zwischen Winkeleinheiten",
        paragraphs: [
          "Zur Umrechnung zwischen Grad und Radiant wird der Faktor π/180 verwendet: Radiant = Grad × (π/180), Grad = Radiant × (180/π). Diese Beziehung ergibt sich daraus, dass die Zahl π (etwa 3,14159) der Hälfte eines Vollkreises (180°) entspricht.",
          "Der Zusammenhang zwischen Gon und Grad ist einfacher: 100 Gon = 90°, also entspricht 1 Gon 0,9°. Dieses einfache Verhältnis ist eine direkte Folge davon, dass Gon für Kompatibilität mit dem Dezimalsystem entworfen wurde.",
        ],
      },
      {
        title: "Wo werden Winkel verwendet?",
        paragraphs: [
          "In Navigation und Seefahrt werden Kurse und Kompassrichtungen in Grad angegeben (0-360°). Auch im technischen Zeichnen, bei Dachneigungen im Bauwesen und bei Rampenwinkeln werden meist Gradangaben verwendet.",
          "In Computergrafik und Spiele-Engines erfolgen interne Berechnungen meist in Radiant (da die trigonometrischen Funktionen der Programmiersprachen Radiant erwarten), während dem Nutzer angezeigte Werte meist in Grad umgerechnet werden.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "frekans",
    "frekans",
    "Frequenzeinheiten und Umrechnungen",
    "Rechnen Sie zwischen Hertz, Kilohertz, Megahertz und Gigahertz um und erfahren Sie mehr über Elektronik, Audio- und Funkfrequenzen.",
    [
      "Frequenz ist eine abgeleitete physikalische Größe, die angibt, wie oft sich ein Ereignis oder eine Schwingung pro Zeiteinheit wiederholt. Sie ist ein grundlegender Begriff in vielen Bereichen, von Schallwellen über Funkkommunikation bis zum Stromnetz und Computerprozessoren.",
      "Im Internationalen Einheitensystem ist die abgeleitete Einheit der Frequenz das Hertz (Hz). Im Alltag begegnet Kilohertz (kHz) häufig bei Audio- und Radiofrequenzen, Megahertz (MHz) bei Rundfunksendungen und Gigahertz (GHz) bei WLAN und Computerprozessorgeschwindigkeiten.",
    ],
    [
      { label: "Physikalische Größe", value: "Frequenz" },
      { label: "Dimensionssymbol", value: "[T⁻¹]" },
      { label: "Abgeleitete SI-Einheit", value: "Hertz" },
      { label: "SI-Einheitensymbol", value: "Hz" },
      { label: "Menschlicher Hörbereich", value: "≈20 Hz bis 20.000 Hz (20 kHz)" },
    ],
    [
      {
        title: "Was ist Frequenz?",
        paragraphs: [
          "Frequenz gibt an, wie oft sich ein periodischer Vorgang (Schwingung, Welle, Drehung) pro Zeiteinheit wiederholt, und wird mit dem Symbol f dargestellt. Frequenz ist der Kehrwert der Periodendauer (der Zeit für eine vollständige Wiederholung): f = 1/T.",
          "Frequenz ist eine abgeleitete Größe; ihre SI-Dimension wird als T⁻¹ (Kehrwert der Zeit) dargestellt. Das ergibt sich daraus, dass Frequenz unmittelbar die Frage 'wie oft pro Sekunde' beantwortet.",
        ],
      },
      {
        title: "Die SI-Einheit der Frequenz: Hertz",
        paragraphs: [
          "Hertz ist die abgeleitete SI-Einheit der Frequenz und wird mit dem Symbol Hz dargestellt; benannt zu Ehren des deutschen Physikers Heinrich Hertz, der elektromagnetische Wellen experimentell nachwies. Ein Hertz bedeutet einen vollständigen Zyklus beziehungsweise eine Schwingung pro Sekunde.",
          "Ein Wechselstrom mit 50 Hz ändert beispielsweise 50-mal pro Sekunde seine Richtung; eine Schallwelle mit 440 Hz (der Standard-Kammerton 'A' in der Musik) schwingt 440-mal pro Sekunde.",
        ],
      },
      {
        title: "Schall- und Hörfrequenzen",
        paragraphs: [
          "Das menschliche Ohr kann typischerweise Schallfrequenzen zwischen 20 Hz und 20.000 Hz (20 kHz) wahrnehmen; Töne unterhalb dieses Bereichs werden Infraschall, oberhalb Ultraschall genannt und sind für das menschliche Ohr nicht hörbar.",
          "Der in der Musik als Stimmreferenz übliche Kammerton 'A' (A4) liegt bei 440 Hz. Verschiedene Musikinstrumente und die menschliche Stimme erzeugen unterschiedliche Klangfarben durch verschiedene Vielfache und Kombinationen dieser Grundfrequenz.",
        ],
      },
      {
        title: "Die Netzfrequenz",
        paragraphs: [
          "In Deutschland und dem Großteil Europas arbeitet das Stromnetz mit einer Frequenz von 50 Hz, während in den USA und einigen anderen Ländern 60 Hz Standard sind. Diese Frequenz gibt an, wie oft der Wechselstrom pro Sekunde seine Richtung ändert.",
          "Dieser Unterschied in der Netzfrequenz birgt das Risiko, dass manche Elektrogeräte (besonders solche mit Motor oder frequenzabhängigen Uhrwerken) beim Wechsel von einem Land in ein anderes nicht korrekt funktionieren.",
        ],
      },
      {
        title: "Funkwellen und drahtlose Kommunikation",
        paragraphs: [
          "Radio- und Fernsehübertragungen nutzen Frequenzen im Megahertz-Bereich (UKW-Radio sendet beispielsweise im Bereich 88-108 MHz). WLAN-Netzwerke arbeiten meist in den Bändern 2,4 GHz und 5 GHz.",
          "Eine höhere Frequenz bietet meist eine größere Datenübertragungskapazität (Bandbreite), hat jedoch Nachteile bei Reichweite und Durchdringung von Wänden oder Hindernissen -- deshalb ist 5-GHz-WLAN schneller, aber kurzreichweitiger, während 2,4-GHz-WLAN langsamer ist, dafür aber weiter reicht und Hindernisse besser durchdringt.",
        ],
      },
      {
        title: "Prozessorgeschwindigkeit und Gigahertz",
        paragraphs: [
          "Die Geschwindigkeit von Computerprozessoren (CPU) wird meist in Gigahertz (GHz) angegeben; dies zeigt, wie viele Milliarden 'Taktzyklen' der Prozessor pro Sekunde erzeugen kann.",
          "Die Prozessorleistung hängt jedoch nicht allein von der Taktfrequenz ab -- auch Kernanzahl, Architektureffizienz und Cache-Größe bestimmen die tatsächliche Leistung; deshalb bedeutet ein höherer GHz-Wert nicht immer einen schnelleren Prozessor.",
        ],
      },
      {
        title: "Zusammenhang zwischen Frequenz und Wellenlänge",
        paragraphs: [
          "Frequenz ist umgekehrt proportional zur Wellenlänge: Ist die Geschwindigkeit einer Welle konstant (etwa für Licht oder Schall in einem bestimmten Medium), verkürzt sich die Wellenlänge mit steigender Frequenz. Der Zusammenhang wird mit der Formel f × λ = v ausgedrückt (f: Frequenz, λ: Wellenlänge, v: Wellengeschwindigkeit).",
          "Dieser Zusammenhang erklärt, warum das elektromagnetische Spektrum einen weiten Bereich abdeckt -- von hochfrequenten (kurzwelligen) Röntgenstrahlen bis zu niederfrequenten (langwelligen) Radiowellen.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "debi_hacimsel",
    "debi_hacimsel",
    "Volumenstromeinheiten und Umrechnungen",
    "Rechnen Sie zwischen Kubikmeter pro Sekunde, CFM und GPM um und erfahren Sie mehr über Lüftungs- und Pumpenkapazitätsberechnungen.",
    [
      "Volumenstrom ist eine technische Größe, die das Fluidvolumen angibt, das pro Zeiteinheit einen Querschnitt durchströmt. Sie bildet die Grundlage zahlreicher technischer Anwendungen, von Lüftungsanlagen über Pumpenkapazitäten bis zu Prozessauslegung und HLK-Berechnungen.",
      "Im Internationalen Einheitensystem ist die abgeleitete Einheit des Volumenstroms Kubikmeter pro Sekunde (m³/s); in der Lüftungstechnik ist CFM (Kubikfuß pro Minute), bei Pumpen und Flüssigkeitstransfersystemen dagegen GPM (Gallonen pro Minute) gebräuchlich.",
    ],
    [
      { label: "Physikalische Größe", value: "Volumenstrom" },
      { label: "Dimensionssymbol", value: "[L³T⁻¹]" },
      { label: "Abgeleitete SI-Einheit", value: "Kubikmeter pro Sekunde" },
      { label: "SI-Einheitensymbol", value: "m³/s" },
      { label: "HLK-Standardeinheit", value: "CFM (Kubikfuß pro Minute)" },
    ],
    [
      {
        title: "Was ist Volumenstrom?",
        paragraphs: [
          "Volumenstrom gibt an, welches Fluidvolumen pro Zeiteinheit ein Rohr, einen Kanal oder einen Querschnitt durchströmt, und wird meist mit dem Symbol Q dargestellt. Nach der Kontinuitätsgleichung wird er mit der Formel Q = A × v berechnet, wobei A die Querschnittsfläche und v die Strömungsgeschwindigkeit ist.",
          "Diese Größe ist eine zentrale Eingangsgröße bei der technischen Auslegung von Pumpen, Ventilatoren, Kompressoren und Rohrleitungen -- sie bestimmt, wie viel Fluid ein System mit welcher Geschwindigkeit transportieren kann.",
        ],
      },
      {
        title: "CFM: der Standard in HLK und Lüftungstechnik",
        paragraphs: [
          "CFM (Cubic Feet per Minute, Kubikfuß pro Minute) ist eine ursprünglich aus den USA stammende, aber weltweit verbreitete Standardeinheit zur Angabe der Ventilator- und Klimaanlagenkapazität in der HLK-Branche (Heizung, Lüftung, Klimatechnik).",
          "Bei der Berechnung des Lüftungsbedarfs eines Raumes wird der erforderliche CFM-Wert anhand des Raumvolumens und der gewünschten Luftwechselrate (wie oft die gesamte Luft pro Stunde ausgetauscht wird) ermittelt; dieser Wert dient dann zur Auswahl eines geeigneten Ventilators oder einer Klimaanlage.",
        ],
      },
      {
        title: "GPM: der Standard bei Pumpen und Flüssigkeitstransfer",
        paragraphs: [
          "GPM (Gallons per Minute, Gallonen pro Minute) ist die Standardeinheit für Pumpenkapazität und Flüssigkeitstransfersysteme, besonders in US-amerikanischen Gerätekatalogen. Bei der Pumpenauswahl werden sowohl GPM (Volumenstrom) als auch die Förderhöhe gemeinsam betrachtet.",
          "Eine in GPM angegebene Pumpenkapazität wird beim Übergang zum metrischen System in Einheiten wie Liter pro Minute oder Kubikmeter pro Stunde umgerechnet, um sie mit lokalen technischen Standards vergleichbar zu machen.",
        ],
      },
      {
        title: "Zusammenhang zwischen Volumenstrom und Querschnittsfläche",
        paragraphs: [
          "Um denselben Volumenstrom zu gewährleisten, muss die Strömungsgeschwindigkeit bei kleinerem Kanal- oder Rohrquerschnitt proportional steigen (gemäß der Beziehung Q = A × v). Das erhöht in Kanälen mit kleinem Querschnitt das Risiko von Geräuschen und Druckverlusten durch die höhere Geschwindigkeit.",
          "Bei der Auslegung von HLK-Kanälen wird deshalb nicht nur der benötigte CFM-Wert angestrebt, sondern auch, dass die Luftgeschwindigkeit im Kanal in einem akzeptablen Bereich bleibt (meist wenige Meter pro Sekunde).",
        ],
      },
      {
        title: "Leistungskurven von Kompressoren und Ventilatoren",
        paragraphs: [
          "Die Leistung von Ventilatoren und Kompressoren wird meist über eine 'Leistungskurve' dargestellt; diese Kurve zeigt, welchen Volumenstrom das Gerät bei unterschiedlichen Druck- (oder Förderhöhen-)Werten liefern kann.",
          "Der tatsächliche Betriebspunkt eines Systems ergibt sich am Schnittpunkt dieser Leistungskurve mit der eigenen Widerstandskurve des Systems (die aus dem Gesamtwiderstand von Rohren, Bögen, Filtern und anderen Elementen resultiert).",
        ],
      },
      {
        title: "Geräte zur Messung des Volumenstroms",
        paragraphs: [
          "In Lüftungssystemen wird der Volumenstrom meist mit einem Anemometer (Luftgeschwindigkeitsmesser) ermittelt, indem die Geschwindigkeit im Kanalquerschnitt gemessen und mit der Querschnittsfläche multipliziert wird. Bei Flüssigkeitssystemen können Turbinen-, magnetisch-induktive oder Ultraschall-Durchflussmesser den Volumenstrom direkt messen.",
          "In industriellen Prozessen ist die Genauigkeit der Durchflussmessung sowohl für die Prozesseffizienz als auch für die Sicherheit entscheidend (Vermeidung von zu hohem oder zu niedrigem Durchfluss).",
        ],
      },
    ]
  ),
  createCategoryPage(
    "debi_kutlesel",
    "debi_kutlesel",
    "Massenstromeinheiten und Umrechnungen",
    "Rechnen Sie zwischen Kilogramm pro Sekunde und Kilogramm pro Stunde um und erfahren Sie mehr über industrielle Prozess- und Durchsatzberechnungen.",
    [
      "Massenstrom ist eine technische Größe, die die Masse eines Fluids angibt, das pro Zeiteinheit einen Querschnitt durchströmt. In der Verfahrenstechnik, bei Verbrennungssystemen und industriellen Prozessen ist er, besonders wenn sich die Dichte des Fluids ändern kann, ein zuverlässigeres Maß als der Volumenstrom.",
      "Im Internationalen Einheitensystem ist die abgeleitete Einheit des Massenstroms Kilogramm pro Sekunde (kg/s); in industriellen Anwendungen wird zudem Kilogramm pro Stunde (kg/h), im Labormaßstab Gramm pro Sekunde (g/s) bevorzugt.",
    ],
    [
      { label: "Physikalische Größe", value: "Massenstrom" },
      { label: "Dimensionssymbol", value: "[MT⁻¹]" },
      { label: "Abgeleitete SI-Einheit", value: "Kilogramm pro Sekunde" },
      { label: "SI-Einheitensymbol", value: "kg/s" },
      { label: "Grundformel", value: "ṁ = ρ × Q (Dichte × Volumenstrom)" },
    ],
    [
      {
        title: "Was ist Massenstrom?",
        paragraphs: [
          "Massenstrom gibt die Masse eines Fluids an, die pro Zeiteinheit einen Querschnitt durchströmt, und wird meist mit dem Symbol ṁ (m mit Punkt) dargestellt. Er steht über die Formel ṁ = ρ × Q mit Dichte (ρ) und Volumenstrom (Q) in Beziehung.",
          "Nach dem Prinzip der Massenerhaltung bleibt der Massenstrom bei einer stationären Strömung an jedem Querschnitt eines Rohres entlang des gesamten Rohres konstant -- auch wenn sich Querschnittsfläche oder Strömungsgeschwindigkeit ändern.",
        ],
      },
      {
        title: "Warum unterscheidet sich Massenstrom vom Volumenstrom?",
        paragraphs: [
          "Volumenstrom (m³/s) misst das Volumen eines Fluids, während Massenstrom direkt die Masse misst. Bei kompressiblen Fluiden (wie Gasen) ändert sich die Dichte mit Druck und Temperatur, sodass eine Gasströmung mit gleichem Massenstrom an unterschiedlichen Stellen entlang eines Rohres einen unterschiedlichen Volumenstrom aufweisen kann.",
          "Deshalb bevorzugen Ingenieure bei Anwendungen mit erheblich veränderlicher Dichte -- etwa Verbrennungssystemen, Gasturbinen und Kompressoren -- meist den Massenstrom: er ist ein direkt mit dem Massenerhaltungssatz vereinbares, druck- und temperaturunabhängiges Maß.",
        ],
      },
      {
        title: "Massenstrom in Verbrennungs- und Motorsystemen",
        paragraphs: [
          "In Verbrennungsmotoren und Strahltriebwerken beeinflusst der Massenstrom von Luft und Kraftstoff unmittelbar Verbrennungseffizienz und Motorleistung. Das Luft-Kraftstoff-Verhältnis (nach Masse) ist ein kritischer Parameter, der für eine effiziente und saubere Verbrennung präzise geregelt werden muss.",
          "Der in modernen Fahrzeugen verwendete 'Luftmassenmesser' (Mass Air Flow, MAF-Sensor) misst direkt den Massenstrom der in den Motor einströmenden Luft und stellt sicher, dass das Einspritzsystem die richtige Kraftstoffmenge zuführt.",
        ],
      },
      {
        title: "Massenstrom in der Verfahrenstechnik",
        paragraphs: [
          "Bei der Auslegung chemischer Prozesse bildet der Massenstrom von Edukten und Produkten die Grundlage für Stoffbilanzberechnungen; die insgesamt in einen Reaktor eintretende Masse muss der insgesamt austretenden Masse entsprechen (sofern während der Reaktion keine Stoffverluste auftreten).",
          "Dieses Prinzip ist eines der grundlegendsten technischen Werkzeuge bei der Auslegung und Effizienzanalyse industrieller Anlagen und wird meist in kg/h oder t/h angegeben.",
        ],
      },
      {
        title: "Wie wird Massenstrom gemessen?",
        paragraphs: [
          "Coriolis-Durchflussmesser sind Präzisionsgeräte, die den Massenstrom eines Fluids direkt messen können; sie funktionieren, indem sie die Coriolis-Kraft messen, die entsteht, wenn das Fluid ein schwingendes Rohr durchströmt, und sind von Dichteänderungen unabhängig.",
          "Alternativ kann der Massenstrom auch indirekt berechnet werden, indem der Volumenstrom gemessen und mit der ebenfalls gemessenen Dichte multipliziert wird; diese Methode erfordert jedoch eine genaue und aktuelle Kenntnis der Dichte.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "manyetik_alan",
    "manyetik_alan",
    "Magnetfeldstärke-Einheiten und Umrechnungen",
    "Rechnen Sie zwischen Ampere pro Meter und Oersted um und erfahren Sie mehr über elektromagnetische Feldstärkeberechnungen.",
    [
      "Magnetfeldstärke ist die physikalische Größe, die angibt, wie stark die magnetisierende Wirkung ist, die von der Quelle eines Magnetfeldes (ein stromdurchflossener Draht oder ein Magnet) erzeugt wird. Sie ist die Grundlage zahlreicher Anwendungen, von Elektromagneten bis zu magnetischen Speichergeräten.",
      "Im Internationalen Einheitensystem ist die abgeleitete Einheit der Magnetfeldstärke Ampere pro Meter (A/m); die aus dem alten CGS-System stammende Einheit Oersted (Oe) wird besonders in der Industrie für magnetische Werkstoffe noch häufig verwendet.",
    ],
    [
      { label: "Physikalische Größe", value: "Magnetfeldstärke" },
      { label: "Dimensionssymbol", value: "[IL⁻¹]" },
      { label: "Abgeleitete SI-Einheit", value: "Ampere pro Meter" },
      { label: "SI-Einheitensymbol", value: "A/m" },
      { label: "Umrechnung Oersted", value: "1 Oe ≈ 79,5775 A/m" },
    ],
    [
      {
        title: "Was ist Magnetfeldstärke?",
        paragraphs: [
          "Magnetfeldstärke (H) beschreibt die 'magnetisierende Kraft', die von der Quelle eines Magnetfeldes erzeugt wird, und wird meist mit dem Symbol H dargestellt. Sie beschreibt die Intensität der magnetischen Wirkung, die ein stromdurchflossener Draht oder eine Spule in ihrer Umgebung erzeugt.",
          "Magnetfeldstärke ist eine andere Größe als die magnetische Flussdichte (B, gemessen in Tesla) -- H hängt unabhängig von den magnetischen Eigenschaften (Permeabilität) des Mediums nur von der Quelle ab, während B zusätzlich von der magnetischen Permeabilität des Mediums abhängt.",
        ],
      },
      {
        title: "Die SI-Einheit des Magnetfelds: Ampere pro Meter",
        paragraphs: [
          "Ampere pro Meter (A/m) ist die abgeleitete SI-Einheit der Magnetfeldstärke; sie ergibt sich aus dem Verhältnis der Windungszahl einer Spule und des sie durchfließenden Stroms zur Länge der Spule.",
          "Diese Einheit spiegelt den direkten Zusammenhang zwischen Magnetfeld und elektrischem Strom (Ampere) wider -- nach dem Ampèreschen Gesetz kann ein Magnetfeld nur durch bewegte elektrische Ladungen (Strom) erzeugt werden.",
        ],
      },
      {
        title: "Oersted: die Magnetfeldeinheit des CGS-Systems",
        paragraphs: [
          "Oersted (Oe) ist eine Einheit der Magnetfeldstärke aus dem CGS-System (Zentimeter-Gramm-Sekunde), benannt nach dem dänischen Physiker Hans Christian Ørsted; 1 Oersted entspricht etwa 79,5775 A/m.",
          "Obwohl Oersted heute offiziell außerhalb des SI-Systems liegt, wird die Einheit in der Magnet- und Datenspeicherindustrie weiterhin häufig verwendet, besonders zur Angabe der 'Koerzitivfeldstärke' eines Werkstoffs.",
        ],
      },
      {
        title: "Magnetfeld und Elektromagnete",
        paragraphs: [
          "Die Stärke eines Elektromagneten hängt direkt von der Windungszahl der Spule, dem durchfließenden Strom und der Geometrie der Spule ab; mehr Windungen oder ein höherer Strom erzeugen eine stärkere Magnetfeldstärke.",
          "Dieses Prinzip liegt zahlreichen Anwendungen zugrunde, von Türklingeln bis zu den riesigen supraleitenden Magneten in MRT-Geräten -- Windungszahl und Strom werden so ausgelegt, dass die gewünschte Magnetfeldstärke erreicht wird.",
        ],
      },
      {
        title: "Koerzitivfeldstärke bei magnetischen Werkstoffen",
        paragraphs: [
          "Die 'Koerzitivfeldstärke' eines Dauermagneten ist die von außen angelegte Magnetfeldstärke, die nötig ist, um seine Magnetisierung umzukehren, und wird meist in Oersted oder kA/m angegeben.",
          "Werkstoffe mit hoher Koerzitivfeldstärke (hartmagnetische Materialien) werden für die Herstellung von Dauermagneten bevorzugt, während Werkstoffe mit niedriger Koerzitivfeldstärke (weichmagnetische Materialien) in Anwendungen wie Transformatorkernen eingesetzt werden, die fortlaufend magnetisiert und entmagnetisiert werden müssen.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "manyetik_aki",
    "manyetik_aki",
    "Magnetischer-Fluss-Einheiten und Umrechnungen",
    "Rechnen Sie zwischen Weber und Milliweber um und erfahren Sie mehr über Transformatoren- und elektromagnetische Induktionsberechnungen.",
    [
      "Magnetischer Fluss ist die physikalische Größe, die die gesamte Menge an Magnetfeld angibt, die durch eine Fläche tritt. Er bildet die Grundlage der elektromagnetischen Induktion -- des Funktionsprinzips von Transformatoren, Generatoren und Elektromotoren.",
      "Im Internationalen Einheitensystem ist die abgeleitete Einheit des magnetischen Flusses das Weber (Wb); für kleinere Werte werden Milliweber (mWb), Mikroweber (µWb) und Nanoweber (nWb) verwendet.",
    ],
    [
      { label: "Physikalische Größe", value: "Magnetischer Fluss" },
      { label: "Dimensionssymbol", value: "[ML²T⁻²I⁻¹]" },
      { label: "Abgeleitete SI-Einheit", value: "Weber" },
      { label: "SI-Einheitensymbol", value: "Wb" },
      { label: "Grundformel", value: "Φ = B × A (Magnetische Flussdichte × Fläche)" },
    ],
    [
      {
        title: "Was ist magnetischer Fluss?",
        paragraphs: [
          "Magnetischer Fluss (Φ) gibt die Gesamtzahl der Magnetfeldlinien an, die durch eine Fläche treten, und ergibt sich aus dem Produkt von magnetischer Flussdichte (B, in Tesla) und der Fläche (A): Φ = B × A.",
          "Magnetischer Fluss misst, 'wie viel' eines Magnetfelds durch eine bestimmte Fläche tritt -- bei gleicher magnetischer Flussdichte tritt durch eine größere Fläche mehr magnetischer Fluss.",
        ],
      },
      {
        title: "Die SI-Einheit des magnetischen Flusses: Weber",
        paragraphs: [
          "Weber ist die abgeleitete SI-Einheit des magnetischen Flusses und wird mit dem Symbol Wb dargestellt; benannt nach dem deutschen Physiker Wilhelm Eduard Weber. 1 Weber entspricht einer gleichmäßigen magnetischen Flussdichte von 1 Tesla, die durch eine Fläche von 1 Quadratmeter tritt.",
          "Die Einheit Weber ist zugleich Bestandteil der Definition der Einheit der magnetischen Flussdichte (Tesla): 1 Tesla = 1 Wb/m² -- dies zeigt den direkten mathematischen Zusammenhang beider Einheiten.",
        ],
      },
      {
        title: "Faradays Induktionsgesetz und magnetischer Fluss",
        paragraphs: [
          "Nach dem Faradayschen Gesetz der elektromagnetischen Induktion wird in einem Stromkreis eine elektromotorische Kraft (Spannung) induziert, wenn sich der magnetische Fluss in diesem Kreis zeitlich ändert: EMK = -dΦ/dt (das Negative der zeitlichen Änderungsrate des Flusses).",
          "Dieses Prinzip bildet die Grundlage der Funktionsweise von Generatoren (die mechanische in elektrische Energie umwandeln), Transformatoren und Elektromotoren -- bei allen wird durch gezielte Änderung des durch eine Spule tretenden magnetischen Flusses Spannung oder Bewegung erzeugt.",
        ],
      },
      {
        title: "Magnetischer Fluss in Transformatoren",
        paragraphs: [
          "In einem Transformator erzeugt der veränderliche Strom in der Primärwicklung über den gemeinsamen Eisenkern einen veränderlichen magnetischen Fluss; dieser veränderliche Fluss induziert in der Sekundärwicklung eine Spannung.",
          "Das Spannungsübersetzungsverhältnis eines Transformators hängt direkt von der Windungszahl der Primär- und Sekundärwicklung ab, da beide Wicklungen denselben magnetischen Fluss teilen -- das zeigt die zentrale Rolle des magnetischen Flusses in der Transformatorauslegung.",
        ],
      },
      {
        title: "Magnetischer Fluss und das Lenzsche Gesetz",
        paragraphs: [
          "Das Lenzsche Gesetz besagt, dass die Richtung eines induzierten Stroms stets der Änderung des magnetischen Flusses entgegenwirkt, die ihn verursacht hat; dies ist eine natürliche Folge des Energieerhaltungssatzes bei der elektromagnetischen Induktion.",
          "Dieses Prinzip wird in vielen praktischen Anwendungen genutzt, von Induktionskochfeldern bis zu magnetischen Bremssystemen (in manchen Zügen und Schnellaufzügen) -- der sich ändernde magnetische Fluss erzeugt über entgegenwirkende Ströme einen kontrollierten Widerstands- oder Erwärmungseffekt.",
        ],
      },
      {
        title: "Wie wird magnetischer Fluss gemessen?",
        paragraphs: [
          "Magnetischer Fluss wird meist nicht direkt, sondern indirekt berechnet, indem die magnetische Flussdichte (mit einem Gauss- oder Teslameter) gemessen und mit einer bekannten Fläche multipliziert wird.",
          "Spezielle Geräte namens Fluxmeter können die Änderung des durch eine Spule tretenden magnetischen Flusses direkt durch Integration messen; dies wird besonders bei der Qualitätsprüfung von Magneten und der Verifikation von Magnetkreisen eingesetzt.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "viskozite_kinematik",
    "viskozite_kinematik",
    "Kinematische-Viskositätseinheiten und Umrechnungen",
    "Rechnen Sie zwischen Quadratmeter pro Sekunde und Zentistokes um und erfahren Sie mehr über Motoröl- und Flüssigkeitsklassifizierung.",
    [
      "Kinematische Viskosität ist die physikalische Größe, die das Verhältnis der dynamischen Viskosität eines Fluids zu seiner Dichte angibt. Sie wird in vielen technischen Anwendungen als Alternative zur dynamischen Viskosität verwendet, von der Motorölklassifizierung bis zu strömungsmechanischen Berechnungen.",
      "Im Internationalen Einheitensystem ist die abgeleitete Einheit der kinematischen Viskosität Quadratmeter pro Sekunde (m²/s); in der Öl- und Fahrzeugindustrie ist jedoch die aus dem CGS-System stammende Einheit Zentistokes (cSt) deutlich gebräuchlicher.",
    ],
    [
      { label: "Physikalische Größe", value: "Kinematische Viskosität" },
      { label: "Dimensionssymbol", value: "[L²T⁻¹]" },
      { label: "Abgeleitete SI-Einheit", value: "Quadratmeter pro Sekunde" },
      { label: "SI-Einheitensymbol", value: "m²/s" },
      { label: "Grundformel", value: "ν = μ / ρ (Dynamische Viskosität / Dichte)" },
    ],
    [
      {
        title: "Was ist kinematische Viskosität?",
        paragraphs: [
          "Kinematische Viskosität (ν, Ny) ergibt sich, indem die dynamische Viskosität (μ) eines Fluids durch seine Dichte (ρ) geteilt wird: ν = μ / ρ. Sie gibt an, wie stark ein Fluid 'im Verhältnis zu seinem eigenen Gewicht' dem Fließen widersteht.",
          "Während dynamische Viskosität die innere Reibung eines Fluids direkt misst, setzt kinematische Viskosität diesen Widerstand in Beziehung zur Dichte des Fluids -- deshalb ist sie in der Strömungsmechanik (besonders bei der Berechnung der Reynolds-Zahl) unmittelbar nützlicher.",
        ],
      },
      {
        title: "Die SI-Einheit der kinematischen Viskosität",
        paragraphs: [
          "Quadratmeter pro Sekunde (m²/s) ist die abgeleitete SI-Einheit der kinematischen Viskosität, für alltägliche Fluide jedoch extrem groß. Deshalb werden in der Praxis Quadratmillimeter pro Sekunde (mm²/s) oder Zentistokes (cSt) bevorzugt -- beide sind zahlenmäßig identisch.",
          "Die kinematische Viskosität eines Fluids mit niedriger Viskosität wie Wasser liegt bei 20 °C bei etwa 1 cSt (0,000001 m²/s); da die Dichte von Wasser etwa 1 g/cm³ beträgt, entspricht dieser Wert zahlenmäßig auch seiner dynamischen Viskosität (etwa 1 cP).",
        ],
      },
      {
        title: "Zentistokes: die Einheit der Öl- und Fahrzeugindustrie",
        paragraphs: [
          "Zentistokes (cSt) ist ein Hundertstel der aus dem CGS-System stammenden Einheit Stokes, benannt nach dem britischen Physiker George Gabriel Stokes. Sie ist weltweit die Standardeinheit für die Viskositätsklassifizierung von Motoröl, Hydrauliköl und anderen industriellen Fluiden.",
          "Die auf Motorölbehältern angegebenen Viskositätswerte (etwa die kinematische Viskosität bei 100 °C) werden meist in Zentistokes angegeben und dienen dazu zu überprüfen, ob das Öl der jeweiligen SAE-Viskositätsklasse (etwa 5W-30) entspricht.",
        ],
      },
      {
        title: "Warum wird durch die Dichte geteilt?",
        paragraphs: [
          "Selbst wenn zwei Fluide dieselbe dynamische Viskosität besitzen, kann sich ihr Fließverhalten (besonders die Fließgeschwindigkeit unter Schwerkrafteinfluss) unterscheiden, wenn ihre Dichte unterschiedlich ist. Kinematische Viskosität berücksichtigt diesen Dichteeffekt und ermöglicht so einen faireren Vergleich des 'Fließverhaltens' von Fluiden.",
          "Diese Eigenschaft ist der Grund, warum kinematische Viskosität besonders bei schwerkraftgetriebenen Systemen (etwa wenn ein Fluid in einem Viskosimeter allein durch sein eigenes Gewicht fließt) die natürlich gemessene Größe ist.",
        ],
      },
      {
        title: "Die SAE-Motorölklassifizierung",
        paragraphs: [
          "Das SAE-Klassifizierungssystem (Society of Automotive Engineers) für Motoröle basiert sowohl auf der kinematischen Viskosität bei niedriger Temperatur (Kaltstart) als auch bei hoher Temperatur (Betriebstemperatur, meist 100 °C).",
          "Bei der Bezeichnung '5W-30' steht die '5W' für die Fließfähigkeit des Öls bei kaltem Wetter (W für Winter), während '30' die Viskositätsklasse bei 100 °C angibt -- damit soll erreicht werden, dass ein Öl beim Kaltstart flüssig genug ist, um den Motor zu schützen, und bei Betriebstemperatur 'dick' genug bleibt, um einen ausreichenden Schmierfilm zu erhalten.",
        ],
      },
      {
        title: "Wie wird kinematische Viskosität gemessen?",
        paragraphs: [
          "Kinematische Viskosität wird am häufigsten mit Kapillarviskosimetern (vom Typ Ostwald oder Cannon-Fenske) gemessen; dabei wird gemessen, wie lange das Fluid unter Schwerkrafteinfluss durch ein enges Röhrchen fließt, woraus sich die kinematische Viskosität direkt berechnen lässt.",
          "Alternativ lässt sich kinematische Viskosität auch indirekt ermitteln, indem die dynamische Viskosität gemessen und durch die Dichte des Fluids geteilt wird; dieses Verfahren wird bevorzugt in Laboren mit Rotationsviskosimetern eingesetzt.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "isil_iletkenlik",
    "isil_iletkenlik",
    "Wärmeleitfähigkeitseinheiten und Umrechnungen",
    "Rechnen Sie zwischen Watt pro Meter-Kelvin und BTU pro Stunde-Fuß-°F um und erfahren Sie mehr über Dämmstoffauswahl und Wärmeleitungsberechnungen.",
    [
      "Wärmeleitfähigkeit ist die physikalische Eigenschaft, die angibt, wie gut ein Werkstoff Wärme leitet. Sie ist die Grundlage vieler technischer Entscheidungen, von der Dämmstoffauswahl bis zur Kühlkörperauslegung in der Elektronik.",
      "Im Internationalen Einheitensystem ist die abgeleitete Einheit der Wärmeleitfähigkeit Watt pro Meter-Kelvin (W/(m·K)); in US-amerikanischen technischen Anwendungen ist dagegen BTU pro Stunde-Fuß-°F gebräuchlich.",
    ],
    [
      { label: "Physikalische Größe", value: "Wärmeleitfähigkeit" },
      { label: "Dimensionssymbol", value: "[MLT⁻³Θ⁻¹]" },
      { label: "Abgeleitete SI-Einheit", value: "Watt pro Meter-Kelvin" },
      { label: "SI-Einheitensymbol", value: "W/(m·K)" },
      { label: "Wärmeleitfähigkeit von Kupfer", value: "≈400 W/(m·K) (hoher Leiter)" },
    ],
    [
      {
        title: "Was ist Wärmeleitfähigkeit?",
        paragraphs: [
          "Wärmeleitfähigkeit (k) beschreibt die Fähigkeit eines Werkstoffs, Wärme zu leiten, und ist der grundlegende Koeffizient in Fouriers Gesetz der Wärmeleitung. Werkstoffe mit hoher Wärmeleitfähigkeit (wie Metalle) leiten Wärme schnell; Werkstoffe mit niedriger Wärmeleitfähigkeit (wie Schaumstoff oder Wolle) leiten Wärme langsam und werden als Dämmstoffe eingesetzt.",
          "Wärmeleitfähigkeit ist eine stoffspezifische Eigenschaft; sie ist unabhängig von Dicke oder Größe eines Bauteils -- das macht sie zu einem verlässlichen Referenzwert für Wärmeübertragungsberechnungen.",
        ],
      },
      {
        title: "Die SI-Einheit der Wärmeleitfähigkeit",
        paragraphs: [
          "Watt pro Meter-Kelvin (W/(m·K)) ist die abgeleitete SI-Einheit der Wärmeleitfähigkeit; sie gibt an, wie viele Watt Wärme pro Sekunde durch eine Fläche von 1 Quadratmeter fließen, wenn zwischen den beiden Seiten einer 1 Meter dicken Materialschicht ein Temperaturunterschied von 1 Kelvin besteht.",
          "Diese Einheit ist direkter Bestandteil von Fouriers Wärmeleitungsgleichung (q = -k × ∇T) und ein grundlegender Auslegungsparameter in Bauwesen, HLK-Technik und Elektronikkühlung.",
        ],
      },
      {
        title: "Warum haben Dämmstoffe eine niedrige Wärmeleitfähigkeit?",
        paragraphs: [
          "Dämmstoffe wie Glaswolle, Steinwolle, EPS und XPS besitzen dank eingeschlossener Luft- (oder anderer Gas-)Poren eine niedrige Wärmeleitfähigkeit -- Luft hat eine deutlich niedrigere Wärmeleitfähigkeit (etwa 0,025 W/(m·K)) als feste Stoffe.",
          "Deshalb beruht ein guter Dämmstoff weniger auf dem Material selbst als auf der Fähigkeit seiner Porenstruktur, die Luft bewegungslos zu halten (Konvektion zu verhindern).",
        ],
      },
      {
        title: "Warum leiten Metalle Wärme gut?",
        paragraphs: [
          "Metalle besitzen meist eine hohe Wärmeleitfähigkeit, da ihre freien Elektronen Wärmeenergie schnell transportieren können. Silber und Kupfer gehören zu den praktisch verfügbaren Werkstoffen mit der höchsten bekannten Wärmeleitfähigkeit (etwa 429 beziehungsweise 400 W/(m·K)).",
          "Diese Eigenschaft erklärt, warum Kupfer in elektronischen Kühlkörpern und Topfböden bevorzugt wird -- es kann Wärme schnell und gleichmäßig verteilen.",
        ],
      },
      {
        title: "Zusammenhang zwischen R-Wert und Wärmeleitfähigkeit",
        paragraphs: [
          "In der Baubranche wird die Dämmleistung meist mit dem 'R-Wert' (Wärmedurchlasswiderstand) angegeben; der R-Wert ergibt sich aus der Materialdicke geteilt durch die Wärmeleitfähigkeit (R = Dicke / k). Deshalb steigt der R-Wert desselben Materials, wenn es dicker verarbeitet wird.",
          "Ein hoher R-Wert bedeutet eine bessere Dämmung, während eine niedrige Wärmeleitfähigkeit (k) allein nicht bestimmt, wie dick ein Material verwendet werden muss -- beide Größen müssen gemeinsam betrachtet werden.",
        ],
      },
      {
        title: "Wie wird Wärmeleitfähigkeit gemessen?",
        paragraphs: [
          "Wärmeleitfähigkeit wird im Labor mit der Methode der 'geschützten Heizplatte' (Guarded Hot Plate) oder mit Wärmestrommessgeräten (Heat Flow Meter) ermittelt; diese Verfahren messen den Wärmestrom durch ein Material bei bekanntem Temperaturunterschied direkt.",
          "Dämmstoffhersteller messen die Wärmeleitfähigkeit ihrer Produkte meist unter standardisierten Prüfbedingungen (bei einer bestimmten Mitteltemperatur) und geben sie in technischen Datenblättern an.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "isi_akisi",
    "isi_akisi",
    "Wärmestromdichteeinheiten und Umrechnungen",
    "Rechnen Sie zwischen Watt pro Quadratmeter und Kilowatt pro Quadratmeter um und erfahren Sie mehr über Oberflächenwärmeübertragung und Dämmberechnungen.",
    [
      "Wärmestromdichte ist die physikalische Größe, die die pro Flächeneinheit und Zeiteinheit übertragene Wärmeenergiemenge angibt. Sie wird in vielen Bereichen genutzt, von Solarenergieberechnungen über Gebäudedämmung bis zur Elektronikkühlung und Industrieofenauslegung.",
      "Im Internationalen Einheitensystem ist die abgeleitete Einheit der Wärmestromdichte Watt pro Quadratmeter (W/m²); für große Werte wird Kilowatt pro Quadratmeter (kW/m²) verwendet, in der wissenschaftlichen Literatur gelegentlich auch Kalorie pro Quadratzentimeter-Sekunde.",
    ],
    [
      { label: "Physikalische Größe", value: "Wärmestromdichte" },
      { label: "Dimensionssymbol", value: "[MT⁻³]" },
      { label: "Abgeleitete SI-Einheit", value: "Watt pro Quadratmeter" },
      { label: "SI-Einheitensymbol", value: "W/m²" },
      { label: "Solare Einstrahlung (Freiland)", value: "≈1000 W/m² (auf Meereshöhe, mittags)" },
    ],
    [
      {
        title: "Was ist Wärmestromdichte?",
        paragraphs: [
          "Wärmestromdichte gibt die Wärmeenergiemenge an, die pro Flächeneinheit und Zeiteinheit durch eine Oberfläche fließt, und wird meist mit dem Symbol q dargestellt. Sie dient dazu zu messen, wie schnell eine Oberfläche sich erwärmt oder Wärme verliert.",
          "Wärmestromdichte ergibt sich aus dem Produkt von Wärmeleitfähigkeit und Temperaturgradient (Fouriersches Gesetz: q = -k × dT/dx); dieser Zusammenhang zeigt, dass die Wärmestromdichte sowohl von den Materialeigenschaften als auch von der Größe des Temperaturunterschieds abhängt.",
        ],
      },
      {
        title: "Die SI-Einheit der Wärmestromdichte",
        paragraphs: [
          "Watt pro Quadratmeter (W/m²) ist die abgeleitete SI-Einheit der Wärmestromdichte und gibt an, wie viele Watt Wärmeenergie pro Sekunde durch eine Fläche von 1 Quadratmeter fließen.",
          "Diese Einheit liegt zahlreichen Energieberechnungen zugrunde, vom Wirkungsgrad von Solarmodulen bis zum Wärmeverlust von Gebäudewänden -- derselbe Gesamtwärmeverlust ergibt bei einer kleineren Fläche einen höheren Wärmestromdichtewert.",
        ],
      },
      {
        title: "Solare Einstrahlung und Wärmestromdichte",
        paragraphs: [
          "Außerhalb der Erdatmosphäre beträgt die solare Einstrahlung (Solarkonstante) etwa 1361 W/m²; beim Durchqueren der Atmosphäre geht ein Teil verloren, sodass sie auf Meereshöhe an einem klaren Tag mittags auf etwa 1000 W/m² sinkt.",
          "Dieser Wert dient als Standardreferenz bei Leistungsberechnungen für Solarmodule (Photovoltaik) und solare Warmwasserbereiter -- die Modulleistung wird meist nach dieser Standardtestbedingung (STC) von 1000 W/m² angegeben.",
        ],
      },
      {
        title: "Wärmestromdichte bei der Gebäudedämmung",
        paragraphs: [
          "Die durch eine Wand, ein Dach oder ein Fenster eines Gebäudes entweichende Wärmemenge lässt sich als Wärmestromdichte ausdrücken; dieser Wert hängt vom Temperaturunterschied zwischen innen und außen sowie vom Wärmedurchlasswiderstand (der Dämmqualität) des Bauteils ab.",
          "Eine gut gedämmte Wand hat eine deutlich niedrigere Wärmestromdichte als eine ungedämmte Wand -- dieser Unterschied schlägt sich direkt in der Energierechnung und der erforderlichen Heiz- beziehungsweise Kühlkapazität nieder.",
        ],
      },
      {
        title: "Wärmestromdichte bei der Elektronikkühlung",
        paragraphs: [
          "Moderne Prozessoren und Leistungselektronikbauteile erzeugen auf kleiner Fläche große Wärmemengen; das kann zu sehr hohen Wärmestromdichtewerten führen (teilweise über 100 W/cm²).",
          "Um diese hohe Wärmestromdichte auf sicheren Temperaturen zu halten, werden Kühlkörper, Wärmeleitpasten und bei manchen Hochleistungssystemen Flüssigkeitskühlung eingesetzt -- unzureichende Kühlung kann zur Überhitzung und zum Ausfall des Bauteils führen.",
        ],
      },
      {
        title: "Wie wird Wärmestromdichte gemessen?",
        paragraphs: [
          "Wärmestromdichte kann direkt mit sogenannten Wärmestromsensoren gemessen werden, meist dünnen, auf eine Oberfläche aufgesetzten Plattengeräten; diese Sensoren berechnen die Wärmestromdichte aus dem geringen Temperaturunterschied zwischen den beiden Seiten der Platte.",
          "Bei Gebäudedämmprüfungen dient die Messung der Wärmestromdichte dazu zu überprüfen, wie gut die tatsächliche Dämmleistung vor Ort mit den theoretischen Berechnungen übereinstimmt.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "ozgul_isi",
    "ozgul_isi",
    "Spezifische-Wärmekapazitätseinheiten und Umrechnungen",
    "Rechnen Sie zwischen Joule pro Kilogramm-Kelvin und Kalorie pro Gramm-Kelvin um und erfahren Sie mehr über die Erwärmungskapazität von Materialien.",
    [
      "Spezifische Wärmekapazität ist die physikalische Größe, die die Energiemenge angibt, die nötig ist, um die Temperatur einer Masseeinheit eines Stoffes um 1 Grad zu erhöhen. Sie spielt eine wichtige Rolle, von der ausgleichenden Wirkung von Wasser auf das Klima bis zu Materialerwärmungsberechnungen.",
      "Im Internationalen Einheitensystem ist die abgeleitete Einheit der spezifischen Wärmekapazität Joule pro Kilogramm-Kelvin (J/(kg·K)); in Ernährung und Chemie ist Kalorie pro Gramm-Kelvin (cal/(g·K)), in der US-amerikanischen Technik BTU pro Pfund-Fahrenheit (Btu/(lb·°F)) gebräuchlich.",
    ],
    [
      { label: "Physikalische Größe", value: "Spezifische Wärmekapazität" },
      { label: "Dimensionssymbol", value: "[L²T⁻²Θ⁻¹]" },
      { label: "Abgeleitete SI-Einheit", value: "Joule pro Kilogramm-Kelvin" },
      { label: "SI-Einheitensymbol", value: "J/(kg·K)" },
      { label: "Spezifische Wärmekapazität von Wasser", value: "4184 J/(kg·K) (1 cal/(g·K))" },
    ],
    [
      {
        title: "Was ist spezifische Wärmekapazität?",
        paragraphs: [
          "Spezifische Wärmekapazität (c) gibt an, welche Energiemenge nötig ist, um 1 Kilogramm eines Stoffes um 1 Kelvin (beziehungsweise 1 °C) zu erwärmen. Die Formel lautet q = m × c × ΔT, wobei q die Wärmemenge, m die Masse, c die spezifische Wärmekapazität und ΔT die Temperaturänderung ist.",
          "Spezifische Wärmekapazität ist eine stoffspezifische Eigenschaft -- bei gleicher zugeführter Energiemenge erwärmen sich Stoffe mit niedriger spezifischer Wärmekapazität (wie Metalle) schnell, während sich Stoffe mit hoher spezifischer Wärmekapazität (wie Wasser) deutlich langsamer erwärmen.",
        ],
      },
      {
        title: "Die außergewöhnlich hohe spezifische Wärmekapazität von Wasser",
        paragraphs: [
          "Die spezifische Wärmekapazität von Wasser (4184 J/(kg·K), also per Definition genau 1 cal/(g·K)) ist deutlich höher als bei den meisten gebräuchlichen Stoffen -- Eisen hat beispielsweise eine spezifische Wärmekapazität von etwa 450 J/(kg·K), das heißt, Wasser kann etwa 9-mal mehr Wärme speichern als Eisen.",
          "Diese Eigenschaft ist die direkte Quelle der historischen Definition der Kalorie: 1 Kalorie war ursprünglich definiert als die Energiemenge, die nötig ist, um die Temperatur von 1 Gramm Wasser um 1 °C zu erhöhen.",
        ],
      },
      {
        title: "Wie beeinflusst die hohe spezifische Wärmekapazität von Wasser das Klima?",
        paragraphs: [
          "Ozeane und große Seen können dank ihrer hohen spezifischen Wärmekapazität große Wärmemengen speichern und langsam wieder abgeben; das ist der Hauptgrund, warum Küstenregionen ein milderes Klima haben als das Landesinnere (kühlere Sommer, mildere Winter).",
          "Diese 'thermische Trägheit' erklärt auch, warum vom Meer entfernte Binnenregionen ein 'raueres' Klima haben (heißere Sommer, kältere Winter) -- die spezifische Wärmekapazität von Boden und Gestein ist deutlich niedriger als die von Wasser.",
        ],
      },
      {
        title: "Unterschied zwischen spezifischer Wärmekapazität und Wärmekapazität",
        paragraphs: [
          "Spezifische Wärmekapazität ist eine pro Masseeinheit definierte Stoffeigenschaft, während Wärmekapazität die gesamte Wärmespeicherfähigkeit eines bestimmten Objekts (eines Körpers mit bestimmter Masse) angibt und mit der Formel Wärmekapazität = Masse × spezifische Wärmekapazität berechnet wird.",
          "Ein kleines Glas Wasser und ein großer Wassertank besitzen beispielsweise dieselbe spezifische Wärmekapazität (da es sich um denselben Stoff handelt), doch da der Tank eine viel größere Masse hat, besitzt er eine deutlich höhere Gesamtwärmekapazität.",
        ],
      },
      {
        title: "Die Rolle der spezifischen Wärmekapazität bei der Materialwahl",
        paragraphs: [
          "Bei Wärmespeichersystemen (etwa solaren Warmwasserbereitern oder thermischen Energiespeichertanks) werden Materialien mit hoher spezifischer Wärmekapazität bevorzugt, da sie bei gleichem Volumen mehr Energie speichern können.",
          "Umgekehrt werden bei Anwendungen, die schnelles Erwärmen oder Abkühlen erfordern (manche Kochgeschirre, Wärmetauscher), Materialien mit niedriger spezifischer Wärmekapazität (Metalle wie Kupfer oder Aluminium) bevorzugt.",
        ],
      },
      {
        title: "Wie wird spezifische Wärmekapazität gemessen?",
        paragraphs: [
          "Spezifische Wärmekapazität wird mit Geräten namens Kalorimeter bestimmt, die den Wärmeaustausch eines Stoffes präzise messen; eine Menge eines Stoffes bekannter Masse wird erwärmt oder abgekühlt, und aus der zugeführten beziehungsweise abgegebenen Energie und der gemessenen Temperaturänderung wird die spezifische Wärmekapazität berechnet.",
          "Die in der Lebensmittel- und Materialforschung gebräuchliche dynamische Differenzkalorimetrie (DSC) ist eine moderne Technik, mit der sich die spezifische Wärmekapazität über einen weiten Temperaturbereich präzise messen lässt.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "alan",
    "alan",
    "Flächeneinheiten und Umrechnungen",
    "Rechnen Sie zwischen Quadratmeter, Quadratfuß und Hektar um und vergleichen Sie Flächeneinheiten für Grundstücke, Gebäude und Technik.",
    [
      "Fläche ist eine abgeleitete physikalische Größe, die die Ausdehnung einer zweidimensionalen Oberfläche beschreibt. Da sie sich aus der Multiplikation einer Längeneinheit mit derselben Längeneinheit ergibt, besitzt Fläche immer die Dimension 'Länge zum Quadrat' (L²).",
      "Im Internationalen Einheitensystem ist die abgeleitete Einheit der Fläche der Quadratmeter (m²). In der Landwirtschaft und Landvermessung sind zudem Ar und Hektar, im britisch-amerikanischen System Quadratfuß und Acre sowie in anderen Regionen lokale Einheiten wie Bigha, Katha oder Tsubo gebräuchlich.",
    ],
    [
      { label: "Physikalische Größe", value: "Fläche" },
      { label: "Dimensionssymbol", value: "[L²]" },
      { label: "Abgeleitete SI-Einheit", value: "Quadratmeter" },
      { label: "SI-Einheitensymbol", value: "m²" },
      { label: "Grundformel (Rechteck)", value: "Fläche = Länge × Breite" },
    ],
    [
      {
        title: "Was ist Fläche?",
        paragraphs: [
          "Fläche beschreibt die Größe einer Oberfläche oder eines ebenen Bereichs. Wie viel Platz ein Grundstück, der Boden eines Zimmers oder ein Blatt Papier einnimmt, wird in Flächeneinheiten gemessen.",
          "Fläche ist eine abgeleitete Größe; sie ergibt sich aus der Multiplikation einer Längeneinheit mit sich selbst. Deshalb wird die SI-Dimension der Fläche als L² (Länge zum Quadrat) dargestellt, und Fläche ist stets eine positive skalare Größe.",
        ],
      },
      {
        title: "Die SI-Einheit der Fläche: Quadratmeter",
        paragraphs: [
          "Im Internationalen Einheitensystem ist die abgeleitete Einheit der Fläche der Quadratmeter (m²); er entspricht der Fläche eines Quadrats mit einer Seitenlänge von genau 1 Meter.",
          "Da der Quadratmeter durch Quadrieren der Längeneinheit (Meter) entsteht, ist er keine eigenständige Basiseinheit, sondern eine abgeleitete Einheit. Alle anderen metrischen Flächeneinheiten (wie Quadratzentimeter oder Quadratkilometer) sind über Zehnerpotenzen mit dem Quadratmeter verbunden.",
        ],
      },
      {
        title: "Warum rechnen sich Flächeneinheiten quadratisch um?",
        paragraphs: [
          "Der bei der Umrechnung von Längeneinheiten verwendete Faktor muss bei Flächeneinheiten quadriert werden. Ein Kilometer entspricht beispielsweise 1000 Metern, doch ein Quadratkilometer entspricht nicht 1000, sondern 1000² -- also 1.000.000 Quadratmetern.",
          "Das liegt daran, dass sich bei einer Fläche beide Dimensionen (Länge und Breite) im selben Verhältnis vergrößern oder verkleinern. Dieses quadratische Verhältnis zu übersehen ist der häufigste Rechenfehler bei Flächenumrechnungen -- etwa die verbreitete Fehlannahme '1 km² = 1000 m²'.",
        ],
      },
      {
        title: "Metrische Flächeneinheiten",
        paragraphs: [
          "Im metrischen System werden für kleine Flächen Quadratmillimeter und Quadratzentimeter verwendet, für alltägliche Messungen Quadratmeter und für große Flächen Quadratkilometer. Ein Quadratzentimeter entspricht 0,0001 Quadratmetern, ein Quadratkilometer 1.000.000 Quadratmetern.",
          "Bei Landflächen werden Ar (100 m²) und das 100-Fache davon, der Hektar (10.000 m²), verwendet. Hektar ist weltweit die gebräuchlichste metrische Einheit zur Angabe landwirtschaftlicher Flächengrößen.",
        ],
      },
      {
        title: "Dönüm und Dekar in der Türkei",
        paragraphs: [
          "In der Türkei sind Dönüm und Dekar die bei landwirtschaftlichen Flächen am häufigsten verwendeten Einheiten; beide entsprechen heute genau 1000 Quadratmetern und werden synonym verwendet. Dekar ist die offizielle Bezeichnung im türkischen Maß- und Eichgesetz, Dönüm die im Alltag gebräuchliche traditionelle Bezeichnung.",
          "In der osmanischen Zeit konnte die Größe eines Dönüm je nach Region zwischen 900 und 1600 m² variieren. Mit dem Maß- und Eichgesetz von 1931 wurde Dönüm mit Dekar gleichgesetzt und exakt auf 1000 m² standardisiert.",
        ],
      },
      {
        title: "Flächeneinheiten im britisch-amerikanischen System",
        paragraphs: [
          "Quadratfuß (ft²) und Quadratzoll (in²) werden für kleine Flächen verwendet, Acre für große Grundstücke -- gebräuchliche Flächeneinheiten im britisch-amerikanischen Maßsystem. Ein Acre entspricht genau 4046,8564224 Quadratmetern.",
          "Der historische Ursprung des Acre geht auf die Ackerfläche zurück, die ein Ochsengespann an einem Tag pflügen konnte. Auch heute wird die Einheit in den USA, dem Vereinigten Königreich und einigen Commonwealth-Ländern bei Immobilienangaben häufig verwendet.",
        ],
      },
      {
        title: "Südasiatische Landflächeneinheiten",
        paragraphs: [
          "In Ländern wie Indien, Bangladesch, Pakistan und Nepal sind lokale Landflächeneinheiten wie Bigha, Katha, Killa, Kanal, Marla, Guntha, Biswa und Decimal weiterhin gebräuchlich. Die Größe dieser Einheiten kann selbst bei gleichem Namen von Region zu Region erheblich variieren.",
          "Ein Bigha entspricht in Westbengalen beispielsweise etwa 1338 m², kann in einem anderen Bundesstaat aber einem anderen Wert entsprechen. Deshalb ist es bei Immobiliengeschäften mit diesen Einheiten wichtig zu prüfen, welcher regionale Standard verwendet wird.",
        ],
      },
      {
        title: "Wie wird Fläche berechnet?",
        paragraphs: [
          "Für eine rechteckige Fläche lautet die Formel Fläche = Länge × Breite. Für ein Dreieck gilt Fläche = (Grundseite × Höhe) / 2, für einen Kreis Fläche = π × Radius².",
          "Bei unregelmäßig geformten Grundstücken wird die Fläche ermittelt, indem die Form in kleinere Rechtecke oder Dreiecke zerlegt und die Einzelflächen addiert werden (oder bei Kataster- und Vermessungsmessungen über koordinatenbasierte Polygonflächenformeln).",
        ],
      },
      {
        title: "Worauf bei der Flächenmessung zu achten ist",
        paragraphs: [
          "Ein in einem Grundstücksinserat oder Grundbucheintrag angegebener Flächenwert muss anhand der verwendeten Einheit (m², Dönüm, Acre, Bigha und Ähnliches) und des regionalen Standards, nach dem diese Einheit definiert ist, interpretiert werden.",
          "Besonders bei internationalen Immobiliengeschäften verhindert es Missverständnisse, nicht auf die Namensähnlichkeit einer Einheit, sondern auf ihren exakten Quadratmeter-Gegenwert zu achten; das Umrechnungstool auf dieser Seite vergleicht alle Einheiten anhand einer gemeinsamen Quadratmeter-Referenz.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "hacim",
    "hacim",
    "Volumeneinheiten und Umrechnungen",
    "Rechnen Sie zwischen Liter, Milliliter und Kubikmeter um und vergleichen Sie gebräuchliche Volumeneinheiten für Flüssigkeiten und Behälter.",
    [
      "Volumen ist eine abgeleitete physikalische Größe, die angibt, wie viel dreidimensionalen Raum ein Körper einnimmt oder ein Behälter fassen kann. Da sie sich aus der Multiplikation einer Längeneinheit in drei Dimensionen (Länge × Breite × Höhe) ergibt, besitzt Volumen die Dimension L³ (Länge hoch drei).",
      "Im Internationalen Einheitensystem ist die abgeleitete Einheit des Volumens der Kubikmeter (m³); im Alltag sind Liter und Milliliter deutlich gebräuchlicher. In der Küche sind traditionelle Maße wie Esslöffel und Teelöffel üblich, im amerikanisch-britischen System dagegen Gallone, Quart, Pint und Flüssigunze.",
    ],
    [
      { label: "Physikalische Größe", value: "Volumen" },
      { label: "Dimensionssymbol", value: "[L³]" },
      { label: "Abgeleitete SI-Einheit", value: "Kubikmeter" },
      { label: "SI-Einheitensymbol", value: "m³" },
      { label: "Gebräuchlichste Alltagseinheit", value: "Liter (L)" },
    ],
    [
      {
        title: "Was ist Volumen?",
        paragraphs: [
          "Volumen ist die Größe des dreidimensionalen Raums, den ein Körper einnimmt oder ein Behälter fassen kann. Das Volumen eines Festkörpers beschreibt seine physische Größe, das Volumen eines Gefäßes die Menge an Flüssigkeit oder Gas, die es aufnehmen kann.",
          "Volumen ist eine abgeleitete Größe; sie ergibt sich aus der Multiplikation einer Längeneinheit in drei Dimensionen (Länge, Breite, Höhe). Deshalb wird ihre SI-Dimension als L³ dargestellt.",
        ],
      },
      {
        title: "Die SI-Einheit des Volumens: Kubikmeter",
        paragraphs: [
          "Im Internationalen Einheitensystem ist die abgeleitete Einheit des Volumens der Kubikmeter (m³); er entspricht dem Innenvolumen eines Würfels, dessen Kanten jeweils genau 1 Meter lang sind.",
          "Kubikmeter wird für große Volumina verwendet (Wassertanks, Betonmengen, Containervolumen), während im Alltag die deutlich kleinere Einheit Liter bevorzugt wird. 1 Kubikmeter entspricht genau 1000 Litern.",
        ],
      },
      {
        title: "Zusammenhang zwischen Liter und Kubikmeter",
        paragraphs: [
          "Liter ist eine praktische Volumeneinheit, die zwar zusammen mit dem SI verwendet werden darf, aber keine offizielle SI-Einheit ist. Ein Liter entspricht dem Volumen eines Würfels mit 10 Zentimeter Kantenlänge (1000 Kubikzentimeter).",
          "Die Unterteilungen des Liters -- Deziliter, Zentiliter und Milliliter -- werden häufig bei Lebensmitteln, Arzneimitteln und Labormessungen verwendet. Ein Milliliter entspricht genau einem Kubikzentimeter (1 mL = 1 cm³).",
        ],
      },
      {
        title: "Warum rechnen sich Volumeneinheiten kubisch um?",
        paragraphs: [
          "Während sich Längeneinheiten linear und Flächeneinheiten quadratisch umrechnen, erfolgt die Umrechnung von Volumeneinheiten kubisch (in der dritten Potenz). Ein Meter entspricht beispielsweise 100 Zentimetern, doch ein Kubikmeter entspricht nicht 100, sondern 100³ -- also 1.000.000 Kubikzentimetern.",
          "Dieser kubische Zusammenhang ergibt sich daraus, dass sich Volumen gleichzeitig in drei Dimensionen ändert, und ist der häufigste Denkfehler bei Volumenumrechnungen -- besonders beim Wechsel zu nichtmetrischen Einheiten (wie Gallone oder Kubikfuß) ist sorgfältiges Rechnen erforderlich.",
        ],
      },
      {
        title: "Küchenmaßeinheiten",
        paragraphs: [
          "In Kochrezepten verwendete Maße wie Esslöffel und Teelöffel sind standardisierte Volumeneinheiten, die dafür sorgen, dass in unterschiedlichen Küchen zubereitete Rezepte konsistente Ergebnisse liefern. Gebräuchliche Näherungswerte: 1 Esslöffel (EL) ≈ 15 mL, 1 Teelöffel (TL) ≈ 5 mL.",
          "Diese Maße sind keine exakten wissenschaftlichen Standards, sondern in der Küchenpraxis gebräuchliche Näherungswerte; bei Rezepten, die eine genaue Messung erfordern (besonders beim Backen), ist eine digitale Küchenwaage verlässlicher.",
        ],
      },
      {
        title: "US-amerikanische und britische Flüssigkeitsmaße",
        paragraphs: [
          "Im US-amerikanischen und britischen System werden Einheiten wie Gallone, Quart, Pint und Flüssigunze verwendet; die Größe dieser Einheiten unterscheidet sich jedoch zwischen beiden Systemen. Eine US-Gallone entspricht 3,78541 Litern, eine britische (Imperial-)Gallone dagegen 4,54609 Litern -- also etwa 20 % mehr.",
          "Dieser Unterschied geht darauf zurück, dass beide Länder historisch unterschiedliche Referenzgallonen (in den USA die Weingallone, in Großbritannien die Imperial-Gallone) als Standard übernommen haben. Bei einer 'Gallonen'- oder 'Unzen'-Angabe auf einem Rezept oder Produktetikett sollte stets geprüft werden, welchem System sie entstammt.",
        ],
      },
      {
        title: "Landwirtschaftliche und historische Volumeneinheiten",
        paragraphs: [
          "Bushel und Peck sind historisch zur Messung trockener Erzeugnisse wie Getreide, Obst und Gemüse verwendete Volumeneinheiten; sie werden heute noch auf manchen landwirtschaftlichen Märkten, besonders in den USA, genutzt.",
          "In der osmanischen Zeit waren Kile und Şinik traditionelle Volumeneinheiten zur Getreidemessung; 1 Kile entsprach 20 Şinik. Diese Einheiten variierten regional leicht, dienen heute jedoch als Referenz zur Interpretation historischer Texte und Aufzeichnungen.",
        ],
      },
      {
        title: "Wie wird Volumen berechnet?",
        paragraphs: [
          "Für einen Quader (Kasten) gilt die Formel Volumen = Länge × Breite × Höhe. Für einen Zylinder gilt Volumen = π × Radius² × Höhe, für eine Kugel Volumen = (4/3) × π × Radius³.",
          "Das Volumen unregelmäßig geformter Festkörper lässt sich meist über die Verdrängungsmethode (archimedisches Prinzip) ermitteln -- indem der Körper in ein mit Wasser gefülltes Gefäß getaucht und das Volumen des verdrängten Wassers gemessen wird.",
        ],
      },
      {
        title: "Volumenmessung in Erdöl und Industrie",
        paragraphs: [
          "In der Erdölindustrie wird Volumen meist in Barrel (bbl) angegeben; 1 Barrel entspricht genau 158,987 Litern (42 US-Gallonen). Diese Einheit stammt aus dem 19. Jahrhundert, als Erdöl in hölzernen Weinfässern transportiert wurde.",
          "In industriellen Prozessen werden große Volumina meist in Kubikmeter, kleine Labormengen dagegen in Milliliter angegeben; die richtige Einheitenwahl richtet sich nach der Größenordnung des gemessenen Volumens.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "uzunluk",
    "uzunluk",
    "Längeneinheiten und Umrechnungen",
    "Rechnen Sie zwischen Meter, Kilometer, Zentimeter, Millimeter, Meilen, Fuß, Zoll und Yard um und vergleichen Sie metrische und nichtmetrische Längeneinheiten.",
    [
      "Länge ist die physikalische Größe, die den Abstand zwischen zwei Punkten oder die Ausdehnung eines Objekts in einer bestimmten Richtung beschreibt. In der wissenschaftlichen Messung ist die SI-Basiseinheit der Länge der Meter.",
      "Je nach Größenordnung der gemessenen Strecke werden im Alltag und in der Wissenschaft unterschiedliche Längeneinheiten verwendet, etwa Nanometer, Mikrometer, Millimeter, Zentimeter, Meter und Kilometer.",
      "Einheiten außerhalb des metrischen Systems wie Zoll, Fuß, Yard und Meile werden weiterhin verwendet, insbesondere in den Vereinigten Staaten, im Vereinigten Königreich und in damit verbundenen Bereichen.",
    ],
    [
      { label: "SI-Basiseinheit", value: "Meter" },
      { label: "SI-Einheitensymbol", value: "m" },
      { label: "Physikalische Größe", value: "Länge" },
      { label: "Dimensionssymbol", value: "L" },
      { label: "Aktuelle Meter-Definition", value: "Die Strecke, die Licht im Vakuum in 1/299.792.458 Sekunde zurücklegt" },
    ],
    [
      {
        title: "Was ist Länge?",
        paragraphs: [
          "Länge ist eine der grundlegenden physikalischen Größen, mit denen die Ausdehnung, Breite, Höhe oder Dicke eines Objekts oder der Abstand zwischen zwei Punkten beschrieben wird. Je nach gemessener Richtung kann für dasselbe Objekt mehr als ein Längenwert vorliegen.",
          "In der Physik wird Länge üblicherweise mit dem Dimensionssymbol L dargestellt. Die Längendimension wird bei der Definition zahlreicher abgeleiteter Größen wie Fläche, Volumen, Geschwindigkeit, Beschleunigung, Druck und Dichte verwendet.",
        ],
      },
      {
        title: "Die SI-Einheit der Länge",
        paragraphs: [
          "Im Internationalen Einheitensystem ist die Basiseinheit der Länge der Meter mit dem Symbol m. Der Meter ist die grundlegende Referenz, auf der die Definition aller anderen Längeneinheiten beruht.",
          "Metrische Einheiten wie Kilometer, Zentimeter, Millimeter, Mikrometer und Nanometer sind über dezimale Vielfache und Teile mit dem Meter verbunden. Diese Struktur ermöglicht Umrechnungen zwischen metrischen Einheiten allein über Zehnerpotenzen.",
        ],
      },
      {
        title: "Die wissenschaftliche Definition des Meters",
        paragraphs: [
          "Der Meter wurde in der Vergangenheit anhand der Erdabmessungen und physischer Maßstäbe definiert. Mit dem Fortschritt der Messtechnik entstand der Bedarf an einer stabileren, überall auf der Welt reproduzierbaren Definition.",
          "Heute ist ein Meter definiert als die Strecke, die Licht im Vakuum in einem Zeitintervall von 1/299.792.458 Sekunde zurücklegt. Diese Definition beruht darauf, dass die Lichtgeschwindigkeit im Vakuum exakt mit 299.792.458 Metern pro Sekunde festgelegt ist.",
        ],
      },
      {
        title: "Metrische Längeneinheiten",
        paragraphs: [
          "Im metrischen System sind Einheiten über positive oder negative Zehnerpotenzen mit dem Meter verbunden. Ein Kilometer entspricht 1000 Metern, ein Zentimeter 0,01 Metern und ein Millimeter 0,001 Metern.",
          "Für sehr kleine Längen werden Mikrometer, Nanometer und Pikometer verwendet. Zellen werden meist in Mikrometern, Lichtwellenlängen in Nanometern und manche Abstände auf atomarer Ebene in Pikometern angegeben.",
        ],
      },
      {
        title: "Längeneinheiten außerhalb des metrischen Systems",
        paragraphs: [
          "Zoll, Fuß, Yard und die Landmeile sind gebräuchliche Längeneinheiten außerhalb des metrischen Systems. Sie werden vor allem im US-amerikanischen Maßsystem und in an die britische Maßtradition angelehnten Anwendungen verwendet.",
          "Ein Zoll entspricht exakt 2,54 Zentimetern, ein Fuß 12 Zoll und ein Yard 3 Fuß. Eine Landmeile ist exakt als 1609,344 Meter definiert.",
        ],
      },
      {
        title: "Länge in der Seefahrt und Luftfahrt",
        paragraphs: [
          "In Seefahrt und Luftfahrt werden Entfernungen meist in Seemeilen angegeben. Eine Seemeile entspricht exakt 1852 Metern.",
          "Die Seemeile geht auf einen historischen Messansatz zurück, der mit den geografischen Koordinaten der Erde verknüpft ist. Die Geschwindigkeitseinheit Knoten bedeutet dementsprechend eine Seemeile pro Stunde.",
        ],
      },
      {
        title: "Wie wird Länge gemessen?",
        paragraphs: [
          "Für alltägliche Messungen werden Werkzeuge wie Lineal, Bandmaß, Messschieber und Mikrometerschraube verwendet. Die Wahl des Messwerkzeugs richtet sich nach der Größe des zu messenden Objekts und der erforderlichen Genauigkeit.",
          "In Technik und Wissenschaft können Laserentfernungsmesser, Koordinatenmessgeräte, Interferometer und verschiedene optische Messsysteme eingesetzt werden.",
        ],
      },
      {
        title: "Messgenauigkeit und Unsicherheit",
        paragraphs: [
          "Keine physikalische Messung ist absolut fehlerfrei. Jedes Messergebnis besitzt eine gewisse Unsicherheit, die durch die Auflösung des verwendeten Geräts, seine Kalibrierung, Umgebungsbedingungen und die angewendete Methode bedingt ist.",
          "Deshalb sollten in wissenschaftlichen Ergebnissen nicht nur der Messwert, sondern auch die Messunsicherheit und die verwendete Einheit angegeben werden. Besonders in der Präzisionstechnik kann bereits eine Temperaturänderung die Länge eines Materials beeinflussen.",
        ],
      },
      {
        title: "Wie werden Längeneinheiten umgerechnet?",
        paragraphs: [
          "Bei Umrechnungen innerhalb desselben Maßsystems wird das Verhältnis zwischen den Einheiten genutzt. Um Meter in Kilometer umzurechnen, wird der Wert beispielsweise durch 1000 geteilt; für die umgekehrte Richtung wird mit 1000 multipliziert.",
          "Bei Umrechnungen zwischen dem metrischen System und britischen oder US-amerikanischen Einheiten müssen exakt definierte Umrechnungsfaktoren verwendet werden. Bei der Umrechnung von Zoll in Zentimeter wird der Wert beispielsweise mit 2,54 multipliziert.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "kutle",
    "kutle",
    "Masseneinheiten und Umrechnungen",
    "Rechnen Sie zwischen Kilogramm, Gramm, Milligramm, Tonne, Pfund und Unze um und vergleichen Sie metrische und angloamerikanische Masseneinheiten.",
    [
      "Masse ist die physikalische Grundgröße, die mit der Materiemenge eines Körpers und seiner Trägheit zusammenhängt. Im Internationalen Einheitensystem ist die Basiseinheit der Masse das Kilogramm mit dem Symbol kg.",
      "Masse und Gewicht werden im Alltag oft gleichbedeutend verwendet, sind physikalisch jedoch unterschiedliche Größen. Masse wird in Kilogramm gemessen, Gewicht dagegen ist eine Kraft und wird in Newton gemessen.",
    ],
    [
      { label: "Physikalische Größe", value: "Masse" },
      { label: "Dimensionssymbol", value: "[M]" },
      { label: "SI-Basiseinheit", value: "Kilogramm" },
      { label: "SI-Einheitensymbol", value: "kg" },
      { label: "Messwissenschaftliches Fachgebiet", value: "Massemetrologie" },
    ],
    [
      {
        title: "Was ist Masse?",
        paragraphs: [
          "Masse ist die physikalische Größe, die mit dem Widerstand eines Körpers gegen eine Änderung seines Bewegungszustands zusammenhängt, also mit der Trägheit. In der klassischen Mechanik wird der Zusammenhang zwischen der auf einen Körper wirkenden Nettokraft und der daraus resultierenden Beschleunigung durch die Gleichung F = m·a ausgedrückt.",
          "Wirkt dieselbe Kraft, erfährt ein Körper mit größerer Masse eine kleinere Beschleunigung. Masse beschreibt daher nicht nur im Alltagssinn die in einem Körper enthaltene Materie, sondern spielt auch in den Bewegungsgleichungen eine grundlegende Rolle.",
          "Masse ist eine skalare Größe. Sie besitzt keine Richtung und wird im SI-System mit dem Basisdimensionssymbol M dargestellt.",
        ],
      },
      {
        title: "Der Unterschied zwischen Masse und Gewicht",
        paragraphs: [
          "Masse und Gewicht sind nicht dieselbe physikalische Größe. Masse ist eine Eigenschaft des Körpers und wird in Kilogramm angegeben. Gewicht dagegen ist die Kraft, die ein Körper in einem Gravitationsfeld erfährt, und wird in Newton gemessen.",
          "Die vereinfachte Gewichtsbeziehung lautet W = m·g. Dabei ist W die Gewichtskraft, m die Masse und g die lokale Erdbeschleunigung.",
          "Die Masse eines Körpers bleibt auf der Erde und auf dem Mond annähernd gleich; da die lokale Erdbeschleunigung jedoch unterschiedlich ist, ändert sich sein Gewicht. Deshalb ist das Kilogramm im wissenschaftlichen Gebrauch eine Einheit der Masse, nicht des Gewichts.",
          "Im Alltag wird das Ergebnis einer Waage in Kilogramm angegeben, weshalb die Begriffe Gewicht und Masse häufig synonym verwendet werden. Das Messgerät erfasst zwar tatsächlich eine Kraftwirkung, ist aber so kalibriert, dass es das Ergebnis in einer Masseneinheit anzeigt.",
        ],
      },
      {
        title: "Warum ist das Kilogramm die SI-Basiseinheit der Masse?",
        paragraphs: [
          "Im Internationalen Einheitensystem ist die Basiseinheit der Masse das Kilogramm. Das Kilogramm ist die einzige SI-Basiseinheit, deren Name eine Vorsilbe enthält.",
          "Der Begriff Gramm spielte historisch bei den ersten Massedefinitionen des metrischen Systems eine wichtige Rolle. Bei der Festlegung praktischer Standards wurde jedoch das Kilogramm zur grundlegenden Referenz.",
          "Heute wird das Kilogramm nicht mehr über die Masse eines physischen Metallzylinders definiert, sondern über den festgelegten Zahlenwert des Planckschen Wirkungsquantums. Der Zusammenhang dieser Definition mit der Kibble-Waage und elektrischen Messungen ist ein eigenes, weiterführendes Fachthema der Metrologie.",
        ],
      },
      {
        title: "Metrische Masseneinheiten",
        paragraphs: [
          "Metrische Masseneinheiten bauen auf Kilogramm und Gramm sowie den zugehörigen SI-Vorsilben auf. Ein Gramm entspricht 0,001 Kilogramm, ein Milligramm 0,001 Gramm und ein Mikrogramm 0,001 Milligramm.",
          "Für große Massen wird die Tonne verwendet. Eine metrische Tonne entspricht exakt 1000 Kilogramm. Das gemeinsam mit dem SI zugelassene Symbol der Tonne ist das kleine t.",
          "Die passende Einheit richtet sich nach der Größenordnung der gemessenen Masse. Personen- und Produktmassen werden in Kilogramm, Lebensmittelinhalte in Gramm, Arzneistoffe in Milligramm oder Mikrogramm und Fahrzeugladungen in Tonnen angegeben.",
        ],
      },
      {
        title: "Das Verhältnis von Pfund, Unze und Kilogramm",
        paragraphs: [
          "Pfund und Unze sind Masseneinheiten aus dem britischen und amerikanischen traditionellen Maßsystem. Das international standardisierte Avoirdupois-Pfund entspricht exakt 0,45359237 Kilogramm.",
          "Ein Avoirdupois-Pfund wird in 16 Unzen unterteilt. Demnach entspricht eine Unze exakt 0,028349523125 Kilogramm beziehungsweise 28,349523125 Gramm.",
          "Das bei Masseumrechnungen verwendete Pfund (lb) und die Krafteinheit Pound-force (lbf) sind unterschiedliche Größen. Pfund bezeichnet eine Masse, Pound-force eine Kraft. Bei technischen Berechnungen dürfen die Symbole lb und lbf nicht verwechselt werden.",
        ],
      },
      {
        title: "Wie wird Masse gemessen?",
        paragraphs: [
          "Zur Massemessung können Balkenwaagen, elektronische Waagen, Analysewaagen, Wägezellen und Industriewaagesysteme unterschiedlicher Kapazität eingesetzt werden.",
          "Vergleichswaagen vergleichen eine unbekannte Masse mit rückführbaren Normalgewichten. Bei elektronischen Waagen wandeln Wägezellen die einwirkende Kraft in ein elektrisches Signal um.",
          "Bei hochpräzisen Messungen können Auftriebskraft der Luft, lokale Erdbeschleunigung, Temperatur, Luftfeuchtigkeit, Vibration, elektrostatische Effekte und die Dichte des Normalgewichts berücksichtigt werden.",
          "Die Rückführung von Massenormalen auf nationale und internationale Messsysteme wird als messtechnische Rückverfolgbarkeit bezeichnet. Die Kalibrierkette ermöglicht die Vergleichbarkeit von Messungen aus verschiedenen Laboren und Betrieben.",
        ],
      },
      {
        title: "Der Zusammenhang zwischen Dichte, Volumen und Masse",
        paragraphs: [
          "Zwischen Masse, Dichte und Volumen besteht die Beziehung m = ρ·V. Dabei ist m die Masse, ρ die Dichte und V das Volumen.",
          "Zwei Stoffe mit demselben Volumen können je nach ihrer Dichte unterschiedliche Massen haben. Gleiche Volumina von Stahl und Wasser besitzen beispielsweise nicht dieselbe Masse.",
          "Im SI-System ist die abgeleitete Basiseinheit der Dichte Kilogramm pro Kubikmeter. In Laboranwendungen sind auch Einheiten wie Gramm pro Kubikzentimeter oder Gramm pro Milliliter gebräuchlich.",
        ],
      },
      {
        title: "Unsicherheit bei der Massemessung",
        paragraphs: [
          "Jede reale Messung ist mit einer gewissen Unsicherheit behaftet. Zeigt eine Waage viele Nachkommastellen an, bedeutet das nicht, dass alle Stellen mit derselben Genauigkeit bekannt sind.",
          "Geräteauflösung, Wiederholbarkeit, Nichtlinearität, Kalibrierstandard, Umgebungsbedingungen und die Vorgehensweise des Anwenders können zur Unsicherheit einer Massemessung beitragen.",
          "In Wissenschaft und Industrie sollte ein Messergebnis stets zusammen mit der passenden Einheit, den signifikanten Stellen und der Messunsicherheit bewertet werden.",
        ],
      },
      {
        title: "Wie wählt man die passende Masseneinheit?",
        paragraphs: [
          "Die Wahl einer der Größenordnung des gemessenen Objekts angemessenen Einheit macht das Ergebnis besser lesbar. Die Masse eines Menschen wird in Kilogramm, der Wirkstoff einer Tablette in Milligramm und eine Lkw-Ladung in Tonnen angegeben.",
          "Bei sehr kleinen Massen können SI-Einheiten mit Vorsilben wie Mikrogramm, Nanogramm und Pikogramm verwendet werden. Auf atomarer und molekularer Ebene sind spezielle Einheiten wie die vereinheitlichte atomare Masseneinheit praktischer.",
          "Bei einer Einheitenumrechnung sollte nicht nur der Zahlenwert betrachtet werden, sondern auch geprüft werden, ob die verwendete Einheit tatsächlich eine Masse oder eine Kraft ausdrückt.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "sicaklik",
    "sicaklik",
    "Temperatureinheiten und Umrechnungen",
    "Rechnen Sie zwischen Celsius, Fahrenheit und Kelvin um und prüfen Sie die Formeln für Temperaturskalen mit unterschiedlichem Nullpunkt.",
    [
      "Temperatur ist eine grundlegende physikalische Größe, die mit der mittleren kinetischen Energie der Teilchen eines Stoffes zusammenhängt und angibt, wie 'warm' oder 'kalt' er ist. Im Internationalen Einheitensystem ist die Basiseinheit der Temperatur das Kelvin.",
      "Im Alltag sind Celsius und Fahrenheit die gebräuchlichsten Skalen; in der Wissenschaft wird Kelvin verwendet, in manchen technischen Berechnungen Rankine und in historischen Texten gelegentlich Réaumur. Anders als bei den meisten anderen physikalischen Größen erfordert die Umrechnung zwischen Temperatureinheiten nicht nur Multiplikation, sondern auch Addition beziehungsweise Subtraktion.",
    ],
    [
      { label: "Physikalische Größe", value: "Temperatur (thermodynamische Temperatur)" },
      { label: "Dimensionssymbol", value: "[Θ]" },
      { label: "SI-Basiseinheit", value: "Kelvin" },
      { label: "SI-Einheitensymbol", value: "K" },
      { label: "Absoluter Nullpunkt", value: "0 K = -273,15 °C = -459,67 °F" },
    ],
    [
      {
        title: "Was ist Temperatur?",
        paragraphs: [
          "Temperatur ist eine Größe, die unmittelbar mit der mittleren kinetischen (Bewegungs-)Energie der Atome und Moleküle eines Stoffes zusammenhängt. Je schneller sich die Teilchen bewegen, als desto 'wärmer' gilt der Stoff.",
          "Temperatur ist eine der sieben Basisgrößen des Internationalen Einheitensystems und wird als thermodynamische Temperatur mit dem Symbol Θ (Theta) dargestellt. Anders als viele andere Größen (etwa Länge oder Masse) ist sie nicht direkt additiv -- werden zwei Körper zusammengebracht, addieren sich ihre Temperaturen nicht, sondern gleichen sich zu einem Gleichgewichtswert an.",
        ],
      },
      {
        title: "Die SI-Einheit der Temperatur: Kelvin",
        paragraphs: [
          "Kelvin ist die SI-Basiseinheit der Temperatur und wird mit dem Symbol K dargestellt (ohne Gradzeichen, nur 'K'). Die Kelvin-Skala setzt den absoluten Nullpunkt (die theoretisch tiefstmögliche Temperatur) als Ausgangspunkt (0 K) fest.",
          "Seit der SI-Revision 2019 wird Kelvin nicht mehr über den Tripelpunkt von Wasser definiert, sondern über den exakt festgelegten Zahlenwert der Boltzmann-Konstante (k). Dadurch beruht die Temperatureinheit nicht mehr auf einem physischen Referenzstoff, sondern auf einer universellen Naturkonstante.",
        ],
      },
      {
        title: "Warum ist eine Temperaturumrechnung nicht nur Multiplikation?",
        paragraphs: [
          "Bei Größen wie Länge oder Masse erfolgt die Einheitenumrechnung allein über einen Multiplikationsfaktor (etwa Meter-Zentimeter). Bei der Temperatur haben Celsius, Fahrenheit und Kelvin dagegen unterschiedliche 'Nullpunkte', weshalb die Umrechnung sowohl Multiplikation als auch Addition beziehungsweise Subtraktion erfordert.",
          "Beim Übergang von Celsius zu Fahrenheit wird der Wert zunächst mit 9/5 multipliziert und dann 32 addiert: °F = (°C × 9/5) + 32. Deshalb ist Temperatur die einzige gebräuchliche physikalische Größe mit einer mathematisch 'affinen' (linearen, aber nicht durch den Ursprung verlaufenden) Umrechnungsbeziehung.",
        ],
      },
      {
        title: "Die Celsius-Skala",
        paragraphs: [
          "Die Celsius-Skala wurde 1742 vom schwedischen Astronomen Anders Celsius entwickelt und definiert den Gefrierpunkt von Wasser als 0 °C und den Siedepunkt (bei 1 Atmosphäre Druck) als 100 °C. Das macht sie zu einem im Alltag leicht verständlichen Referenzsystem.",
          "Celsius ist weltweit die in Wissenschaft und in den meisten Ländern für die tägliche Wetterberichterstattung am häufigsten verwendete Temperaturskala; nur wenige Länder wie die USA bevorzugen im Alltag weiterhin Fahrenheit.",
        ],
      },
      {
        title: "Die Fahrenheit-Skala",
        paragraphs: [
          "Die Fahrenheit-Skala wurde 1724 vom deutschen Physiker Daniel Gabriel Fahrenheit entwickelt. Auf dieser Skala liegt der Gefrierpunkt von Wasser bei 32 °F, der Siedepunkt bei 212 °F -- zwischen Gefrier- und Siedepunkt liegt eine Spanne von genau 180 Grad.",
          "Fahrenheit wird heute noch in wenigen Ländern, allen voran den USA, zur täglichen Temperaturangabe verwendet; in der Wissenschaft wurde es weltweit größtenteils durch Celsius und Kelvin abgelöst.",
        ],
      },
      {
        title: "Rankine und Réaumur: weniger bekannte Skalen",
        paragraphs: [
          "Rankine ist eine absolute Temperaturskala, die Grade in Fahrenheit-Größe verwendet, deren Nullpunkt jedoch der absolute Nullpunkt (0 °R) ist; der Gefrierpunkt von Wasser liegt bei 491,67 °R. Sie wird besonders in einigen US-amerikanischen thermodynamischen Berechnungen anstelle von Kelvin bevorzugt.",
          "Die Réaumur-Skala wurde im 18. Jahrhundert vom französischen Wissenschaftler René Réaumur entwickelt; sie setzt den Gefrierpunkt von Wasser bei 0 °Ré und den Siedepunkt bei 80 °Ré an. Obwohl sie heute praktisch nicht mehr verwendet wird, begegnet man ihr gelegentlich als historischem Bezug in einigen europäischen Ländern, etwa in traditionellen russischen Rezepten.",
        ],
      },
      {
        title: "Was bedeutet der absolute Nullpunkt?",
        paragraphs: [
          "Der absolute Nullpunkt (0 Kelvin, -273,15 °C, -459,67 °F) ist die theoretische Temperatur, bei der Teilchen im klassischen Sinne die niedrigstmögliche kinetische Energie besitzen. Aufgrund der Quantenmechanik kommen Teilchen selbst am absoluten Nullpunkt nicht vollständig zur Ruhe (Nullpunktenergie), doch im klassischen Sinne lässt sich keine niedrigere Temperatur definieren.",
          "Unter Laborbedingungen wurden Temperaturen erreicht, die dem absoluten Nullpunkt extrem nahekommen (im Mikrokelvin- bis Nanokelvin-Bereich), doch nach dem dritten Hauptsatz der Thermodynamik ist es unmöglich, den absoluten Nullpunkt in endlich vielen Schritten exakt zu erreichen.",
        ],
      },
      {
        title: "Wie wird Temperatur gemessen?",
        paragraphs: [
          "Zur Temperaturmessung werden verschiedene Technologien eingesetzt, etwa Quecksilber- oder Alkoholthermometer, digitale Thermometer, Thermoelemente, Widerstandsthermometer (RTD) und berührungslose Infrarotthermometer. Jede Bauart eignet sich für einen bestimmten Temperaturbereich und Genauigkeitsanspruch.",
          "Thermoelemente werden in industriellen Umgebungen häufig eingesetzt, da sie über einen sehr weiten Temperaturbereich arbeiten können (teilweise von -200 °C bis +2000 °C); sie berechnen die Temperatur aus der Spannungsdifferenz, die an der Verbindungsstelle zweier unterschiedlicher Metalle entsteht.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "zaman",
    "zaman",
    "Zeiteinheiten und Umrechnungen",
    "Rechnen Sie zwischen Sekunden, Minuten und Stunden um und vergleichen Sie die exakten Grundbeziehungen dieser Zeiteinheiten.",
    [
      "Zeit ist eine grundlegende physikalische Größe, die die Reihenfolge von Ereignissen und die Zeitspanne zwischen ihnen beschreibt. Im Internationalen Einheitensystem ist die Basiseinheit der Zeit die Sekunde, die im Alltag zusammen mit abgeleiteten Einheiten wie Minute, Stunde und Tag verwendet wird.",
      "Anders als Größen wie Länge oder Masse ist Zeit eines der ältesten Messkonzepte der Menschheitsgeschichte; die auf 60 basierende Struktur von Stunde, Minute und Sekunde reicht Jahrtausende zurück bis zur antiken babylonischen Zivilisation.",
    ],
    [
      { label: "Physikalische Größe", value: "Zeit" },
      { label: "Dimensionssymbol", value: "[T]" },
      { label: "SI-Basiseinheit", value: "Sekunde" },
      { label: "SI-Einheitensymbol", value: "s" },
      { label: "Aktuelle Sekunden-Definition", value: "9.192.631.770 Schwingungsperioden eines Cäsium-133-Atoms" },
    ],
    [
      {
        title: "Was ist Zeit?",
        paragraphs: [
          "Zeit ist eine grundlegende Größe, die die Reihenfolge angibt, in der Ereignisse stattfinden, sowie die Dauer zwischen zwei Ereignissen. In der Physik wird sie mit dem Dimensionssymbol T dargestellt und ist Bestandteil der Definition vieler abgeleiteter Größen wie Geschwindigkeit, Beschleunigung und Frequenz.",
          "In der klassischen Physik galt Zeit als absolute Größe, die für alle Beobachter gleich verläuft; mit Einsteins Relativitätstheorie wurde jedoch verstanden, dass Zeit je nach Geschwindigkeit und Gravitationsfeld des Beobachters unterschiedlich vergehen kann (Zeitdilatation).",
        ],
      },
      {
        title: "Die SI-Einheit der Zeit: die Sekunde",
        paragraphs: [
          "Die Sekunde ist die SI-Basiseinheit der Zeit und wird mit dem Symbol s dargestellt. Historisch war die Sekunde als 1/86.400 eines Tages definiert (24 Stunden × 60 Minuten × 60 Sekunden).",
          "Da kleine Unregelmäßigkeiten in der Erdrotation diese Definition als nicht stabil genug erwiesen, wurde die Sekunde 1967 neu definiert: als genau 9.192.631.770 Perioden der Strahlung, die dem Übergang zwischen den Grundenergiezuständen eines Cäsium-133-Atoms entspricht. Diese Definition ermöglicht es Atomuhren, überall auf der Welt mit derselben Präzision zu arbeiten.",
        ],
      },
      {
        title: "Der auf 60 basierende Ursprung von Stunde, Minute und Sekunde",
        paragraphs: [
          "Dass eine Stunde in 60 Minuten und eine Minute in 60 Sekunden unterteilt ist, geht auf das sexagesimale (60er-)Zahlensystem der antiken babylonischen Zivilisation zurück. Die Babylonier teilten sowohl Winkel (360 Grad) als auch Zeit nach diesem System ein.",
          "Die Zahl 60 wurde bevorzugt, weil sie durch viele Zahlen wie 2, 3, 4, 5, 6, 10, 12, 15, 20 und 30 restlos teilbar ist -- das erleichterte praktische Aufteilungen im Alltag (etwa eine Stunde in drei oder vier Teile), ohne Bruchzahlen zu benötigen.",
        ],
      },
      {
        title: "Die Einteilung des Tages in 24 Stunden",
        paragraphs: [
          "Die Einteilung des Tages in 24 Stunden reicht bis ins alte Ägypten zurück; die Ägypter teilten Tag und Nacht jeweils in 12 gleiche Teile und verfolgten die Zeit mit Sonnenuhren und Sternbeobachtungen.",
          "Diese Zwölferteilung geht vermutlich auf das Zählen der Fingerglieder einer Hand zurück (vier Finger ohne Daumen mit je drei Gliedern, insgesamt 12) oder auf die Anzahl der Mondzyklen im Jahr (etwa 12 Vollmonde).",
        ],
      },
      {
        title: "Zusammenhang zwischen metrischen Zeiteinheiten",
        paragraphs: [
          "Die Unterteilungen der Sekunde -- Millisekunde (0,001 Sekunde), Mikrosekunde und Nanosekunde -- werden zur Messung sehr kurzer Ereignisse verwendet, etwa bei Computerprozessen, Sportzeitmessung und wissenschaftlichen Experimenten.",
          "Die größeren Einheiten Minute (60 Sekunden), Stunde (3600 Sekunden) und Tag (86.400 Sekunden) sind dagegen die grundlegenden Einheiten zur Zeitverfolgung im Alltag. Die Umrechnung zwischen diesen Einheiten erfolgt, anders als bei der Temperatur, ausschließlich durch Multiplikation beziehungsweise Division, da sie alle denselben Nullpunkt (Beginn) teilen.",
        ],
      },
      {
        title: "Was ist eine Schaltsekunde?",
        paragraphs: [
          "Die Rotationsgeschwindigkeit der Erde um ihre eigene Achse zeigt aufgrund von Gezeiteneffekten und Veränderungen im Erdinneren im Laufe der Zeit kleine Unregelmäßigkeiten; dies führt zu einer geringen Abweichung zwischen der von Atomuhren gemessenen 'exakten' Zeit und der auf der tatsächlichen Erdrotation beruhenden Taglänge.",
          "Um diese Abweichung auszugleichen, wird der Koordinierten Weltzeit (UTC) seit 1972 bei Bedarf eine 'Schaltsekunde' hinzugefügt. Dies ist ein ähnlicher Korrekturmechanismus wie der zusätzliche Tag im Schaltjahr (29. Februar), doch da die Unregelmäßigkeit der Erdrotation nicht vorhersehbar ist, werden Schaltsekunden nicht nach einem festen Kalenderzyklus, sondern bei Bedarf eingefügt.",
        ],
      },
      {
        title: "Zeitzonen und UTC",
        paragraphs: [
          "Da die Sonne an verschiedenen Längengraden zu unterschiedlichen Uhrzeiten ihren Höchststand erreicht, ist die Erde in etwa 24 Zeitzonen unterteilt. Alle Zeitzonen nutzen die Koordinierte Weltzeit (UTC) als Referenzpunkt und werden als Stundenabweichung von dieser Referenz angegeben (Deutschland liegt in der Regel bei UTC+1, während der Sommerzeit bei UTC+2).",
          "UTC hat die frühere Greenwich Mean Time (GMT) als modernen Zeitstandard abgelöst und wird mit Atomuhren fortgeführt; GMT wird heute eher als Name der britischen Winterzeit-Zeitzone verwendet.",
        ],
      },
      {
        title: "Wie wird Zeit gemessen?",
        paragraphs: [
          "Im Alltag werden mechanische und digitale Uhren verwendet, in wissenschaftlichen und technischen Anwendungen (GPS-Satelliten, Telekommunikationsnetze) dagegen Atomuhren. Atomuhren arbeiten mit extrem hoher Präzision auf Basis der stabilen Schwingungsfrequenz von Cäsium- oder Rubidium-Atomen.",
          "Damit das GPS-System eine genaue Positionsbestimmung liefern kann, müssen die Atomuhren der Satelliten auf Nanosekundenebene synchronisiert sein; schon eine kleine Abweichung dieser Uhren kann bei der Positionsberechnung auf der Erde zu erheblichen Fehlern führen.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "hiz",
    "hiz",
    "Geschwindigkeitseinheiten und Umrechnungen",
    "Rechnen Sie zwischen Kilometer pro Stunde, Meter pro Sekunde und Meilen pro Stunde um und vergleichen Sie gebräuchliche Geschwindigkeitseinheiten.",
    [
      "Geschwindigkeit ist eine abgeleitete physikalische Größe, die angibt, welche Strecke ein Körper pro Zeiteinheit zurücklegt. Da sie sich aus der Division von Länge durch Zeit ergibt, besitzt Geschwindigkeit die Dimension L/T (Länge durch Zeit).",
      "Im Alltag sind Kilometer pro Stunde (km/h) und Meilen pro Stunde (mph) die gebräuchlichsten Geschwindigkeitseinheiten; in der Wissenschaft wird Meter pro Sekunde (m/s) bevorzugt, in Seefahrt und Luftfahrt der Knoten. Die Lichtgeschwindigkeit nimmt unter den Geschwindigkeitseinheiten eine besondere Stellung ein, da sie eine absolute Obergrenze im Universum darstellt.",
    ],
    [
      { label: "Physikalische Größe", value: "Geschwindigkeit" },
      { label: "Dimensionssymbol", value: "[L/T]" },
      { label: "Abgeleitete SI-Einheit", value: "Meter pro Sekunde" },
      { label: "SI-Einheitensymbol", value: "m/s" },
      { label: "Universelle Geschwindigkeitsgrenze", value: "Lichtgeschwindigkeit ≈ 299.792.458 m/s" },
    ],
    [
      {
        title: "Was ist Geschwindigkeit?",
        paragraphs: [
          "Geschwindigkeit gibt die Strecke an, die ein Körper pro Zeiteinheit zurücklegt, und wird mit der Formel Geschwindigkeit = Strecke / Zeit berechnet. In der Physik wird technisch zwischen 'Bahngeschwindigkeit' (skalar, richtungslos) und 'Geschwindigkeit' (vektoriell, gerichtet) unterschieden, im Alltag werden beide Begriffe jedoch meist synonym verwendet.",
          "Geschwindigkeit ist eine abgeleitete Größe; sie ergibt sich aus der Division der Längeneinheit durch die Zeiteinheit. Deshalb wird ihre SI-Dimension als L/T (beziehungsweise L¹T⁻¹) dargestellt.",
        ],
      },
      {
        title: "Die SI-Einheit der Geschwindigkeit: Meter pro Sekunde",
        paragraphs: [
          "Im Internationalen Einheitensystem ist die abgeleitete Einheit der Geschwindigkeit Meter pro Sekunde (m/s); sie gibt an, dass sich ein Körper jede Sekunde einen Meter weit bewegt. In wissenschaftlichen Berechnungen und physikalischen Formeln ist dies die Standardeinheit.",
          "Im Alltag wird statt Meter pro Sekunde meist Kilometer pro Stunde (km/h) verwendet, da Fahrzeuggeschwindigkeiten und Streckenlängen in diesem Maßstab intuitivere Zahlen ergeben. 1 m/s entspricht genau 3,6 km/h.",
        ],
      },
      {
        title: "Kilometer pro Stunde und Meilen pro Stunde",
        paragraphs: [
          "Kilometer pro Stunde (km/h) ist in Ländern mit metrischem System, darunter auch Deutschland, die im Straßenverkehr standardmäßig verwendete Geschwindigkeitseinheit. Meilen pro Stunde (mph) wird dagegen in Ländern mit britischem Maßsystem wie den USA und dem Vereinigten Königreich bevorzugt.",
          "1 mph entspricht etwa 1,60934 km/h. Dieser Unterschied ist eine praktische Fehlerquelle, die zu Verwechslungen führen kann -- etwa bei Tachoanzeigen importierter Fahrzeuge oder bei der Interpretation von Geschwindigkeitsbegrenzungen bei Mietwagen im Ausland.",
        ],
      },
      {
        title: "Der Knoten: Geschwindigkeit in Seefahrt und Luftfahrt",
        paragraphs: [
          "Der Knoten (Seemeile pro Stunde) ist die in Seefahrt und Luftfahrt standardmäßig verwendete Geschwindigkeitseinheit; 1 Knoten bedeutet genau eine zurückgelegte Seemeile (1852 Meter) pro Stunde.",
          "Der Name der Einheit Knoten geht historisch darauf zurück, dass man zur Geschwindigkeitsmessung von Schiffen ein mit Knoten markiertes Seil ins Wasser warf und zählte, wie viele Knoten in einer bestimmten Zeit durchliefen. Diese Methode wurde jahrhundertelang vor modernen Geschwindigkeitsmessgeräten eingesetzt.",
        ],
      },
      {
        title: "Lichtgeschwindigkeit: die Geschwindigkeitsgrenze des Universums",
        paragraphs: [
          "Die Lichtgeschwindigkeit im Vakuum ist exakt auf 299.792.458 m/s festgelegt und stellt nach Einsteins spezieller Relativitätstheorie die absolute Obergrenze dar, die Information oder ein massebehafteter Körper im Universum erreichen kann.",
          "Dass die Lichtgeschwindigkeit als exakte Zahl definiert ist (sie galt schon vor der SI-Revision 2019 als konstant), sorgt dafür, dass auch die aktuelle Definition des Meters auf dieser Konstante beruht -- ein Meter ist definiert als die Strecke, die Licht in 1/299.792.458 Sekunde zurücklegt.",
        ],
      },
      {
        title: "Die Machzahl: Verhältnis zur Schallgeschwindigkeit",
        paragraphs: [
          "In der Luftfahrt werden hohe Geschwindigkeiten meist mit der Machzahl angegeben; sie beschreibt das Verhältnis der Geschwindigkeit eines Körpers zur Schallgeschwindigkeit im jeweiligen Medium (Mach 1 = Schallgeschwindigkeit). Die Schallgeschwindigkeit ist kein fester Wert, sondern hängt von Temperatur und Dichte der Luft ab (auf Meereshöhe etwa 343 m/s beziehungsweise 1235 km/h).",
          "Deshalb kann dieselbe Machzahl bei unterschiedlichen Höhen und Temperaturen unterschiedlichen tatsächlichen Geschwindigkeiten (km/h oder m/s) entsprechen -- die tatsächliche Geschwindigkeit eines Flugzeugs bei Mach 0,85 variiert je nach Flughöhe.",
        ],
      },
      {
        title: "Unterschied zwischen Durchschnitts- und Momentangeschwindigkeit",
        paragraphs: [
          "Die Durchschnittsgeschwindigkeit ergibt sich, indem die insgesamt zurückgelegte Strecke durch die insgesamt verstrichene Zeit geteilt wird, und liefert einen einzigen Wert für eine gesamte Fahrt. Die Momentangeschwindigkeit ist dagegen die Geschwindigkeit eines Körpers zu einem bestimmten Zeitpunkt und kann sich ständig ändern (Beschleunigen, Abbremsen, Anhalten).",
          "Während der Tacho eines Fahrzeugs die Momentangeschwindigkeit anzeigt, wird die Durchschnittsgeschwindigkeit einer Fahrt meist nachträglich aus Gesamtstrecke und Gesamtdauer berechnet -- diese beiden Werte unterscheiden sich immer dann, wenn die Geschwindigkeit während der Fahrt nicht konstant bleibt.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "basinc",
    "basinc",
    "Druckeinheiten und Umrechnungen",
    "Rechnen Sie zwischen Pascal, Kilopascal, Bar, PSI, Atmosphäre, mmHg und weiteren Druckeinheiten um und vergleichen Sie typische technische Anwendungen.",
    [
      "Druck ist die physikalische Größe, die angibt, wie viel Kraft senkrecht auf eine Fläche verteilt wirkt. Das Anwendungsgebiet reicht von Kontaktspannungen zwischen Festkörpern über strömende Flüssigkeiten in Rohrleitungen bis zur Atmosphäre und zu Vakuumsystemen. In der Technik ist Druck nicht nur eine Zahl, sondern eine zentrale Auslegungsgröße für Sicherheit, Dichtheit, strukturelle Festigkeit, Energieumwandlung und Prozesssteuerung.",
      "Im Internationalen Einheitensystem ist die abgeleitete Einheit des Drucks das Pascal mit dem Symbol Pa. Ein Pascal entspricht dem Druck, der entsteht, wenn eine Kraft von einem Newton gleichmäßig auf eine Fläche von einem Quadratmeter verteilt wird. Damit ist die Druckeinheit direkt mit den Begriffen Kraft und Fläche verknüpft; dieselbe Dimensionsstruktur teilt sich der Druck auch mit der mechanischen Spannung, auch wenn der physikalische Kontext nicht immer identisch ist.",
      "Im Alltag und in der Industrie wird Druck meist mit praktischeren Einheiten als dem Pascal ausgedrückt. Bei Reifendrücken sind Kilopascal und PSI gebräuchlich, in Prozessanlagen Bar, bei atmosphärischen Bedingungen atm und in der Meteorologie Millibar. Weil sich verschiedene Branchen historisch für unterschiedliche Einheiten entschieden haben, ist ein korrektes Verständnis der Druckumrechnung und eine klare Unterscheidung zwischen Absolut-, Über- und Differenzdruck besonders wichtig.",
    ],
    [
      { label: "Physikalische Größe", value: "Druck" },
      { label: "Abgeleitete SI-Einheit", value: "Pascal" },
      { label: "SI-Symbol", value: "Pa" },
      { label: "Grundgleichung", value: "P = F / A" },
      { label: "SI-Äquivalent", value: "1 Pa = 1 N/m²" },
      { label: "Dimensionsformel", value: "M L⁻¹ T⁻²" },
      { label: "Standardatmosphäre", value: "101.325 Pa" },
      { label: "Referenz für Absolutdruck", value: "vollständiges Vakuum" },
    ],
    [
      {
        title: "Was ist Druck?",
        paragraphs: [
          "Bei Druck kommt es nicht nur auf die Größe der auf eine Fläche wirkenden Kraft an, sondern auch darauf, über welche Fläche sich diese Kraft verteilt. Wirkt dieselbe Kraft auf eine kleinere Fläche, steigt der Druck; verteilt sie sich auf eine größere Fläche, sinkt er. Deshalb kann ein scharfes Messer mit geringer Kraft schneiden, während dieselbe Kraft auf einer breiten Auflagefläche eine viel geringere Wirkung erzielt.",
          "In der Strömungsmechanik wird Druck als die Normalspannungskomponente betrachtet, die eine ruhende oder strömende Flüssigkeit auf ihre Umgebung ausübt. In einer ruhenden Flüssigkeit wirkt der Druck in alle Richtungen und wird in geschlossenen Behältern über das Pascalsche Prinzip weitergegeben. Diese Eigenschaft bildet die Grundlage für hydraulische Pressen, Bremssysteme und zahlreiche industrielle Aktuatoren.",
          "Der Druckbegriff ist nicht auf Flüssigkeiten und Gase beschränkt. Auch die mittlere Normalkraftwirkung an Kontaktflächen erzeugt eine druckähnliche Verteilung. In der Technik denkt man beim Begriff Druck jedoch meist an Rohrleitungen, Tanks, Kompressoren, Luftkanäle, Vakuumkammern und die Atmosphäre.",
        ],
      },
      {
        title: "Die Druckformel: P = F / A",
        paragraphs: [
          "Die grundlegende Definition des Drucks lautet P = F / A, wobei P der Druck, F die senkrecht auf eine Fläche wirkende Kraft und A die Fläche ist, über die sich diese Kraft verteilt. Die Einheitenanalyse ergibt Newton pro Quadratmeter, was genau dem Pascal entspricht.",
          "Diese Beziehung liefert den mittleren Druck bei gleichmäßiger Kraftverteilung. Bei realen Kontaktproblemen oder komplexen Strömungsfeldern kann der Druck über die Fläche variieren; dann reicht ein einzelner Mittelwert nicht aus, und lokale Druckverteilung, Differentialgleichungen und Randbedingungen müssen berücksichtigt werden.",
          "Ein in der Praxis häufiger Fehler ist die falsche Wahl von Kraftrichtung und wirksamer Fläche. Bei der Berechnung einer Kolbenkraft etwa darf nur die tatsächlich vom Druck beaufschlagte wirksame Querschnittsfläche verwendet werden. Werden geometrische Details wie Dichtungen, Bolzen oder Auflageflächen vernachlässigt, können Auslegungsfehler entstehen.",
        ],
      },
      {
        title: "Warum ist das Pascal die SI-Druckeinheit?",
        paragraphs: [
          "Das Pascal ergibt sich aus der natürlichen Verbindung der SI-Einheit der Kraft, dem Newton, mit der SI-Einheit der Fläche, dem Quadratmeter. Die Gleichung 1 Pa = 1 N/m² ist deshalb nicht nur eine Definition, sondern zugleich ein dimensionaler Ausdruck des mechanischen Ursprungs von Druck. Eine eigenständige Basiseinheit für Druck ist dadurch nicht nötig.",
          "Das SI-System verknüpft abgeleitete Größen konsistent mit den Basiseinheiten. Die Angabe von Druck in Pascal schafft einen Rahmen, der mit Energiedichte, mechanischer Spannung, Elastizitätsmodul und den Gleichungen der Strömungsmechanik kompatibel ist. Dass dieselbe Einheit in verschiedenen Fachgebieten verwendet werden kann, verringert Umrechnungsfehler in Berechnungen.",
          "Im Alltag ist das Pascal meist eine sehr kleine Einheit. Deshalb werden in der Technik praktischere Größenordnungen wie Kilopascal, Megapascal oder Bar bevorzugt. Dennoch lassen sich alle diese Einheiten letztlich auf das Pascal und damit auf die SI-Basis zurückführen.",
        ],
      },
      {
        title: "Geschichte der Druckmessung: Torricelli und das Barometer",
        paragraphs: [
          "Die systematische Druckmessung begann 1643, als der italienische Wissenschaftler Evangelista Torricelli das erste Quecksilberbarometer baute. Er füllte ein einseitig geschlossenes Glasrohr mit Quecksilber und tauchte das offene Ende in ein Gefäß mit Quecksilber; die Säule blieb auf einer bestimmten Höhe stehen und ließ darüber einen leeren Raum entstehen.",
          "Torricelli folgerte, dass die Höhe der Quecksilbersäule durch das Gewicht der umgebenden Luft ausgeglichen wird. Dies war der erste experimentelle Beleg dafür, dass Luft ein messbares Gewicht und damit einen Druck besitzt, und markierte den Beginn des Drucks als wissenschaftliche Größe.",
          "1648 trug Florin Périer auf Vorschlag von Blaise Pascal ein Barometer auf den Puy-de-Dôme und zeigte, dass der Luftdruck mit der Höhe abnimmt. Spätere Meilensteine bauten darauf auf, etwa die Meterkonvention von 1875, die exakte Definition der Standardatmosphäre 1954 und die Aufnahme des Pascal als SI-Einheit 1971.",
        ],
      },
      {
        title: "Absolutdruck, Überdruck und Differenzdruck",
        paragraphs: [
          "Absolutdruck wird gegenüber einem vollständigen Vakuum gemessen, dem theoretischen Nullpunkt des Drucks; er kann nicht negativ werden. Gasgesetze, thermodynamische Berechnungen und mehrere dichtebezogene Beziehungen erfordern für korrekte Ergebnisse den Absolutdruck.",
          "Überdruck (Gauge-Druck) wird relativ zum umgebenden Atmosphärendruck gemessen. Die meisten Manometer im Feld sind auf die lokale Atmosphäre genullt, sodass der angezeigte Wert fast immer ein Überdruck ist. Absolut- und Überdruck hängen zusammen über: Absolutdruck = Überdruck + Atmosphärendruck.",
          "Differenzdruck ist die Differenz zwischen zwei Messpunkten, etwa vor und nach einem Filter, an einer Blende oder zwischen den beiden Seiten eines Wärmetauschers. Er bezieht sich weder auf ein Vakuum noch auf die Atmosphäre, sondern direkt auf einen zweiten Druckpunkt, was ihn für Durchflussmessungen und die Zustandsüberwachung von Anlagen besonders nützlich macht.",
        ],
      },
      {
        title: "Atmosphärendruck",
        paragraphs: [
          "Atmosphärendruck ist der Druck, den die Gewichtskraft der Luftsäule der Erdatmosphäre auf Oberflächen ausübt. Unter Standardbedingungen nahe dem Meeresspiegel wird er mit etwa 101.325 Pa beziehungsweise 1 atm angesetzt. Dieser Wert ist jedoch nicht fest, sondern ändert sich mit Höhe, Wetter und Temperatur.",
          "Barometer werden zur Messung des Atmosphärendrucks eingesetzt. Quecksilberbarometer waren historisch das Referenzinstrument, heute sind elektronische Drucksensoren weit verbreitet. Der Atmosphärendruck ist nicht nur für die Meteorologie wichtig, sondern auch für Vakuumtechnik, Verbrennungssysteme und die Umrechnung zwischen Über- und Absolutdruck.",
          "In Systemen, die mit Überdruck arbeiten, können Schwankungen des Atmosphärendrucks die Messinterpretation beeinflussen. Ein Überdruck von 2 bar auf Meereshöhe entspricht beispielsweise nicht demselben Absolutwert wie 2 bar Überdruck in großer Höhe. Diese Unterscheidung kann besonders bei Verdichtungs-, Gasdichte- und Siedepunktberechnungen entscheidend sein.",
        ],
      },
      {
        title: "Hydrostatischer Druck und die Beziehung P = ρgh",
        paragraphs: [
          "In einer ruhenden Flüssigkeit steigt der Druck mit zunehmender Tiefe. Bei konstanter Dichte wird der hydrostatische Überdruck näherungsweise durch P = ρgh beschrieben, wobei ρ die Dichte, g die Erdbeschleunigung und h die Höhe der Flüssigkeitssäule über dem betrachteten Punkt ist.",
          "Diese Beziehung wird für Wassertanks, offene Becken, Staudämme, Füllstandsmessung und Flüssigkeitssäulenmanometer genutzt. In derselben Tiefe und Flüssigkeit gilt der Druck als gleich, unabhängig von der Form des Behälters — entscheidend sind die Flüssigkeitsdichte und die senkrechte Tiefe unter der freien Oberfläche.",
          "Der absolute hydrostatische Druck umfasst nicht nur den Zuwachs ρgh, sondern auch den Ausgangsdruck an der freien Oberfläche. In einem offenen Behälter ist dieser Ausgangswert in der Regel der Atmosphärendruck. Bei der Berechnung des Absolutdrucks muss deshalb neben dem Zuwachs durch die Flüssigkeitssäule auch der äußere Druck an der Oberfläche addiert werden.",
        ],
      },
      {
        title: "Statischer, dynamischer und Gesamtdruck",
        paragraphs: [
          "Statischer Druck ist die Druckkomponente, die aus Sicht eines mit der Strömung mitbewegten Beobachters den lokalen thermodynamischen Zustand der Strömung darstellt. Die meisten Messpunkte in Rohrleitungen, Tanks und Kanälen erfassen im Wesentlichen den statischen Druck, und die Mehrzahl der Druckmessumformer ist für diese Größe ausgelegt.",
          "Dynamischer Druck beschreibt den kinetischen Effekt der Strömungsgeschwindigkeit und wird häufig näherungsweise mit q = 1/2 ρv² berechnet. Dieser Term spielt in der Bernoulli-Betrachtung eine wichtige Rolle und wird bei Geschwindigkeitsmessverfahren wie dem Prandtlrohr genutzt. Mit zunehmender Geschwindigkeit steigt auch der dynamische Druck.",
          "Der Gesamtdruck wird in der idealisierten Strömungsbetrachtung als Summe aus statischem und dynamischem Druck interpretiert. In realen Systemen müssen Reibung, Turbulenz, Kompressibilität und lokale Verluste berücksichtigt werden. Dennoch ist die Unterscheidung zwischen statischem, dynamischem und Gesamtdruck in Lüftungstechnik, Aerodynamik und Prozessmesstechnik eine grundlegende technische Sprache.",
        ],
      },
      {
        title: "Druckhöhe und Pumpenförderhöhe",
        paragraphs: [
          "Die Druckhöhe ist die Darstellung eines bestimmten Drucks als äquivalente Höhe einer Flüssigkeitssäule. Die Grundbeziehung lautet h = P / (ρg). Derselbe Druck entspricht dadurch bei Flüssigkeiten unterschiedlicher Dichte unterschiedlichen Höhenwerten.",
          "Bei Pumpensystemen wird Druck oft nicht direkt in Pascal oder Bar, sondern in Metern Flüssigkeitssäule interpretiert. Denn die Aufgabe einer Pumpe besteht nicht nur darin, der Flüssigkeit Druck zu verleihen, sondern auch, die Energie für eine bestimmte Höhe, Reibungsverluste und Geschwindigkeitskomponenten bereitzustellen. Deshalb ist der Begriff der Förderhöhe in der Praxis sehr nützlich.",
          "Druckhöhe und geometrische Höhe sind nicht dasselbe. Werden Rohrverluste, Geschwindigkeitshöhe und lokale Widerstände nicht berücksichtigt und nur die Manometeranzeige betrachtet, kann dies bei Pumpenauswahl und Systemabgleich zu fehlerhaften Ergebnissen führen. Besonders bei Wasser, Öl und Prozessflüssigkeiten mit unterschiedlicher Dichte muss die Umrechnung sorgfältig erfolgen.",
        ],
      },
      {
        title: "Warum unterscheiden sich Druckeinheiten?",
        paragraphs: [
          "Die Vielfalt der Druckeinheiten hat vor allem historische und branchenspezifische Gründe. Während das SI-System auf dem Pascal basiert, werden in der Industrie weiterhin Bar, in der Medizin mmHg, in der Meteorologie Millibar, in der Automobiltechnik PSI und in älteren technischen Dokumenten teils die technische Atmosphäre verwendet. Dies liegt daran, dass verschiedene Fachbereiche ihre eigenen Nutzungsgewohnheiten beibehalten.",
          "Manche Einheiten sind für Anwender intuitiver. Ein Reifendruck von etwa 35 psi lässt sich beispielsweise leichter einordnen als 240 kPa, und ein Prozessdruck von 3,5 bar leichter als 350.000 Pa. Die Wahl der Einheit hängt nicht nur von der Genauigkeit ab, sondern auch von Berichtskultur, Geräteskalierung und Praxisgewohnheiten vor Ort.",
          "Da unterschiedliche Einheiten dieselbe physikalische Größe ausdrücken, ist bei gemeinsamen Berechnungen eine sorgfältige Umrechnung zwingend erforderlich. Besonders das Vermischen von näherungsweisen und exakt definierten Faktoren, das Übersehen der Unterscheidung zwischen Über- und Absolutdruck sowie falsch gelesene Symbole sind wichtige Fehlerquellen.",
        ],
      },
      {
        title: "Wie wird Druck gemessen?",
        paragraphs: [
          "Bei der Druckmessung muss zunächst geklärt werden, welche Druckart benötigt wird: absolut, relativ (Überdruck) oder differentiell. Anschließend werden Messbereich, Art des Mediums, Temperatur, chemische Verträglichkeit, Vibration und erforderliche Genauigkeit bewertet. Nicht jeder Sensor ist für jede Anwendung geeignet.",
          "Für niedrige Drücke und kleine Differenzen werden häufig membranbasierte Differenzdruckmessumformer eingesetzt, für höhere Prozessdrücke Dehnungsmessstreifen oder piezoresistive Elemente und für Vakuumanwendungen spezielle Absolutdrucksensoren. Flüssigkeitssäulenmanometer sind weiterhin nützlich, um das Grundprinzip zu vermitteln, auch wenn elektronische Geräte die moderne Industrie dominieren.",
          "Für eine korrekte Messung müssen die Verlegung der Impulsleitungen, die Einbauhöhe des Sensors, der Nullpunktabgleich und Temperatureinflüsse berücksichtigt werden. Bei Gas- und Flüssigkeitsleitungen können Dichteunterschiede oder Kondensatbildung eine zusätzliche hydrostatische Last auf den Sensor erzeugen. Deshalb bestimmen neben der Gerätewahl auch die Installationsdetails das Messergebnis.",
        ],
      },
      {
        title: "Drucksensoren und Manometer",
        paragraphs: [
          "Mechanische Manometer, etwa Geräte mit Bourdon-Röhrenfeder, wandeln Druck über die Verformung eines elastischen Elements in eine ablesbare Zeigerbewegung um. Ihre Robustheit, Einfachheit und der fehlende Strombedarf haben sie lange in der Industrie verbreitet gehalten.",
          "Elektronische Drucksensoren können piezoresistiv, kapazitiv, dehnungsmessstreifenbasiert oder resonanzbasiert arbeiten. Sie wandeln eine Druckänderung in ein elektrisches Signal um, das an SPS, SCADA-Systeme oder Datenlogger weitergegeben werden kann, wodurch Alarme, Regelkreise und Trendanalysen möglich werden statt nur einer Momentanablesung.",
          "Differenzdruckmanometer liefern die Druckdifferenz zwischen zwei Punkten, Absolutdrucksensoren den Druck gegenüber vollständigem Vakuum und Überdruckgeräte den Druck gegenüber der Atmosphäre. Wird auf einem Datenblatt der Referenztyp nicht geprüft und nur der Zahlenwert betrachtet, kann dies zu erheblichen Fehlinterpretationen führen.",
        ],
      },
      {
        title: "Einsatzbereiche von Druck in der Technik",
        paragraphs: [
          "Druck ist eine grundlegende Auslegungsgröße in zahlreichen technischen Bereichen wie Rohrleitungsbau, HLK-Technik, Hydraulik, Pneumatik, chemischer Prozesstechnik, Kraftwerken, Wasserversorgungssystemen, Automobil- und Luftfahrttechnik. Von der Wandstärke eines Tanks über die Ventilauswahl bis zu den Austrittsbedingungen eines Kompressors und der Filterleistung basieren viele Entscheidungen auf Druckangaben.",
          "In der Prozesstechnik werden Druckgrenzen überwacht, um Reaktoren, Kessel, Wärmetauscher und Abscheider sicher zu betreiben. Sicherheitsventile, Berstscheiben und Regelkreise sind deshalb kritische Ausrüstungsteile. Druck wird zudem zur indirekten Messung anderer Prozessgrößen wie Durchfluss und Füllstand genutzt.",
          "Im Maschinen- und Bauingenieurwesen verbindet sich Druck über Kontaktflächen und Flüssigkeitskräfte mit Spannungsanalysen. In der Medizin- und Biomedizintechnik stehen Blutdruck, Beatmungsdrücke und Vakuumanwendungen im Vordergrund, in Umwelt und Meteorologie dagegen atmosphärische und differentielle Druckmessungen.",
        ],
      },
      {
        title: "Temperatur, Höhe und Messunsicherheit bei der Druckmessung",
        paragraphs: [
          "Temperatur kann sowohl die Eigenschaften des gemessenen Mediums als auch das Verhalten des Sensorelements beeinflussen. Besonders bei Gasen verändert eine Temperaturänderung die Dichte, sodass die Druck-Volumen-Temperatur-Beziehung neu betrachtet werden muss. In Sensor-Datenblättern finden sich deshalb Angaben wie temperaturabhängiger Nullpunkt- und Spannenfehler.",
          "Mit zunehmender Höhe sinkt der Atmosphärendruck in der Regel. Das verändert die Beziehung zwischen Über- und Absolutdruck und kann auch das Referenzverhalten mancher Feldgeräte beeinflussen. Derselbe Prozesszustand kann in unterschiedlichen Höhenlagen unterschiedliche Absolutdruckwerte ergeben.",
          "Jede Messung ist mit einer Unsicherheit behaftet. Kalibrierstandard, Auflösung, Hysterese, Temperatureinfluss, Einbaulage, Vibration und Langzeitdrift tragen zur Gesamtunsicherheit bei. Bei kritischen Anwendungen sollten nicht nur der Nominaldruckwert, sondern auch Geräteklasse und Messzuverlässigkeit in die Auslegungsentscheidung einfließen.",
        ],
      },
      {
        title: "Zusammenhang und Unterschied zwischen Druck und mechanischer Spannung",
        paragraphs: [
          "Druck und mechanische Spannung besitzen dieselbe Dimensionsstruktur und können beide in Pascal ausgedrückt werden. Diese Ähnlichkeit rührt daher, dass beide eine Kraftwirkung pro Flächeneinheit darstellen. Das bedeutet jedoch nicht, dass es sich physikalisch um exakt dieselbe Größe handelt.",
          "Druck wird meist als isotrope Normalspannung betrachtet, die Flüssigkeiten ausüben — in einer ruhenden Flüssigkeit ist der Druck an einem Punkt in alle Richtungen gleich. Spannung in der Festkörpermechanik kann dagegen Normal- und Schubkomponenten enthalten, ist richtungsabhängig und besitzt eine Tensorstruktur.",
          "Wird dieser Unterschied übersehen, kann dies besonders bei Berechnungen zu Behälterwänden, Dichtflächen oder Materialfestigkeit zu Fehlinterpretationen führen. Der Innendruck einer Flüssigkeit erzeugt in einem Behälter Umfangs- und Axialspannungen; das Spannungsfeld im Behältermaterial ist jedoch nicht identisch mit dem Flüssigkeitsdruck selbst.",
        ],
      },
      {
        title: "Häufige Fehler bei Druckberechnungen",
        paragraphs: [
          "Der häufigste Fehler ist die Verwechslung von Überdruck und Absolutdruck. Besonders bei Gasgesetzen, Dichteberechnungen und Vakuumanwendungen wird eigentlich der Absolutdruck benötigt, doch oft wird direkt der am Manometer angezeigte Überdruckwert verwendet, was zu einem systematischen Fehler führt.",
          "Ein weiterer häufiger Fehler ist das Runden von Umrechnungsfaktoren oder die Verwendung eines falschen Einheitenbezugs beim Umrechnen zwischen PSI, Bar, atm, mmHg und kPa. Auch das Vernachlässigen hydrostatischer Effekte, der Einbauhöhe des Sensors oder des Temperatureinflusses kann ein Messergebnis stärker verändern, als zunächst vermutet.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "enerji",
    "enerji",
    "Energieeinheiten und Umrechnungen",
    "Rechnen Sie zwischen Joule, Kilowattstunde, Kalorie und BTU um und erfahren Sie mehr über Energieeinheiten in Stromrechnung, Ernährung und Heiztechnik.",
    [
      "Energie ist eine grundlegende physikalische Größe, die die Fähigkeit eines Systems beschreibt, Arbeit zu verrichten. Im Internationalen Einheitensystem ist die abgeleitete Einheit der Energie das Joule, das sich aus dem Produkt von Kraft und Weg ergibt.",
      "Im Alltag werden ganz unterschiedliche Energieeinheiten verwendet: Kilowattstunde (kWh) auf der Stromrechnung, Kalorie beziehungsweise Kilokalorie in der Ernährung, BTU in Heizsystemen, Therm bei der Erdgasabrechnung und Elektronvolt in der Teilchenphysik.",
    ],
    [
      { label: "Physikalische Größe", value: "Energie (Arbeit)" },
      { label: "Dimensionssymbol", value: "[ML²T⁻²]" },
      { label: "Abgeleitete SI-Einheit", value: "Joule" },
      { label: "SI-Einheitensymbol", value: "J" },
      { label: "Definition des Joule", value: "1 J = Verschiebung um 1 Meter mit einer Kraft von 1 Newton (1 N·m)" },
    ],
    [
      {
        title: "Was ist Energie?",
        paragraphs: [
          "Energie ist die Fähigkeit eines Körpers oder Systems, Arbeit zu verrichten. Sie kann in vielen unterschiedlichen Formen auftreten -- kinetische Energie (Bewegung), potentielle Energie (Lage), Wärmeenergie, chemische Energie und elektrische Energie; nach dem Energieerhaltungssatz kann sie von einer Form in eine andere umgewandelt werden, ihre Gesamtmenge entsteht jedoch nicht aus dem Nichts und verschwindet nicht.",
          "Energie ist eine abgeleitete Größe; sie ergibt sich aus dem Produkt von Kraft und Weg (Arbeit) und besitzt die SI-Dimension ML²T⁻² (Masse × Länge zum Quadrat / Zeit zum Quadrat).",
        ],
      },
      {
        title: "Die SI-Einheit der Energie: Joule",
        paragraphs: [
          "Joule ist die abgeleitete SI-Einheit der Energie und wird mit dem Symbol J dargestellt; benannt nach dem britischen Physiker James Prescott Joule aus dem 19. Jahrhundert. Ein Joule entspricht der Energie, die nötig ist, um einen Körper mit einer Kraft von 1 Newton um 1 Meter zu bewegen.",
          "Da Joule für viele im Alltag vorkommende Energiemengen recht klein ist, werden in Technik und Alltag häufiger Vielfache wie Kilojoule (tausend Joule) und Megajoule (eine Million Joule) verwendet.",
        ],
      },
      {
        title: "Kilowattstunde: die Einheit der Stromrechnung",
        paragraphs: [
          "Eine Kilowattstunde (kWh) ist die Energiemenge, die verbraucht wird, wenn eine Leistung von 1 Kilowatt eine Stunde lang genutzt wird, und ist weltweit die Standardeinheit bei der Stromabrechnung. 1 kWh entspricht genau 3.600.000 Joule (3,6 Megajoule).",
          "Um den Energieverbrauch eines Elektrogeräts zu berechnen, genügt es, die Leistung (Watt) mit der Betriebsdauer (Stunden) zu multiplizieren; ein 2000-Watt-Gerät, das 3 Stunden läuft, verbraucht beispielsweise 6 kWh Energie.",
        ],
      },
      {
        title: "Kalorie und Kilokalorie: Energie in der Ernährung",
        paragraphs: [
          "Eine Kalorie war ursprünglich definiert als die Energiemenge, die nötig ist, um die Temperatur von 1 Gramm Wasser um 1 °C zu erhöhen; 1 Kalorie entspricht genau 4,184 Joule.",
          "Der auf Lebensmitteletiketten angegebene 'Kalorien'-Wert ist im wissenschaftlichen Sinne eigentlich eine Kilokalorie (1000 Kalorien) -- diese in der Ernährungswissenschaft übliche Bezeichnung (großgeschriebenes 'Kalorie') führt häufig zu Verwirrung; wird angegeben, ein Lebensmittel enthalte '200 Kalorien', ist tatsächlich von 200 Kilokalorien (200.000 Kalorien) die Rede. In Deutschland und der EU ist zusätzlich die Angabe in Kilojoule (kJ) auf Lebensmitteletiketten gesetzlich vorgeschrieben.",
        ],
      },
      {
        title: "BTU und Therm: Energie in Heiztechnik und Erdgas",
        paragraphs: [
          "BTU (British Thermal Unit) ist die Energiemenge, die nötig ist, um die Temperatur von 1 Pfund Wasser um 1 °F zu erhöhen, und wird -- ursprünglich aus den USA stammend -- weltweit zur Angabe der Kapazität von Heiz- und Kühlsystemen (Klimaanlage, Heizkessel) verwendet. 1 BTU entspricht etwa 1055,06 Joule.",
          "Therm ist eine größere, bei der Erdgasabrechnung verwendete Energieeinheit und entspricht genau 100.000 BTU. In manchen Ländern wird der Erdgasverbrauch statt in Kubikmetern direkt in Therm abgerechnet.",
        ],
      },
      {
        title: "Elektronvolt: die Einheit der subatomaren Welt",
        paragraphs: [
          "Elektronvolt (eV) ist die kinetische Energie, die ein Elektron beim Durchlaufen einer Potentialdifferenz von 1 Volt gewinnt, und ist eine extrem kleine Energieeinheit (1 eV ≈ 1,602176634 × 10⁻¹⁹ Joule).",
          "In Teilchen- und Atomphysik werden Energien meist statt in Joule in Elektronvolt (und dessen Vielfachen keV, MeV, GeV) angegeben, da Joule auf dieser Skala zu unpraktisch kleinen Zahlen führen würde.",
        ],
      },
      {
        title: "Das Prinzip der Energieerhaltung",
        paragraphs: [
          "Nach dem Energieerhaltungssatz, auch bekannt als erster Hauptsatz der Thermodynamik, bleibt die Gesamtenergie in einem geschlossenen System konstant; Energie kann weder erzeugt noch vernichtet werden, sondern nur von einer Form in eine andere umgewandelt werden.",
          "Im Motor eines Autos wird beispielsweise chemische Energie (Kraftstoff) zunächst in Wärmeenergie und dann in mechanische Energie (Bewegung) umgewandelt; obwohl dabei ein Teil der Energie durch Reibung und Abgase in nicht nutzbare Wärme übergeht, bleibt die Gesamtenergiemenge unverändert.",
        ],
      },
      {
        title: "Warum ist die Umrechnung zwischen Energieeinheiten wichtig?",
        paragraphs: [
          "Verschiedene Branchen bevorzugen traditionell unterschiedliche Energieeinheiten: die Elektrotechnik die Kilowattstunde, die Ernährungswissenschaft die Kilokalorie, die HLK-Branche BTU und die Erdgasbranche Therm. Eine korrekte Umrechnung zwischen diesen Einheiten ist entscheidend für Energieeffizienzvergleiche und Kostenberechnungen.",
          "Um beispielsweise die Effizienz einer Wärmepumpe mit einem Gaskessel zu vergleichen, muss der Energieverbrauch beider Systeme in eine gemeinsame Einheit (meist kWh oder Joule) umgerechnet werden.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "debi",
    "debi",
    "Volumenstrom-Einheiten und Umrechnungen",
    "Rechnen Sie zwischen Kubikmeter pro Stunde und Liter pro Minute um und vergleichen Sie gebräuchliche Einheiten für Pumpen- und Versorgungssysteme.",
    [
      "Volumenstrom ist eine abgeleitete physikalische Größe, die das Fluidvolumen (Flüssigkeit oder Gas) angibt, das pro Zeiteinheit einen Querschnitt durchströmt. Er ist eine im Alltag ständig auftretende Größe bei Wasserinstallationen, Bewässerungssystemen, Pumpenauswahl und HLK-Anwendungen.",
      "Im Alltag und in der Installationstechnik sind Kubikmeter pro Stunde (m³/h) und Liter pro Minute (L/min) die am häufigsten verwendeten Volumenstromeinheiten; in eher technisch geprägten Berechnungen werden dagegen Einheiten wie CFM (Kubikfuß pro Minute) und GPM (Gallonen pro Minute) bevorzugt.",
    ],
    [
      { label: "Physikalische Größe", value: "Volumenstrom" },
      { label: "Dimensionssymbol", value: "[L³T⁻¹]" },
      { label: "Abgeleitete SI-Einheit", value: "Kubikmeter pro Sekunde" },
      { label: "SI-Einheitensymbol", value: "m³/s" },
      { label: "Grundformel", value: "Volumenstrom (Q) = Volumen / Zeit = Querschnittsfläche × Strömungsgeschwindigkeit" },
    ],
    [
      {
        title: "Was ist Volumenstrom?",
        paragraphs: [
          "Volumenstrom gibt das Fluidvolumen (Wasser, Luft, Kraftstoff und Ähnliches) an, das pro Zeiteinheit ein Rohr, einen Kanal oder einen Querschnitt durchströmt. Er wird meist mit dem Symbol Q dargestellt und mit der Formel Q = V / t (Volumen geteilt durch Zeit) berechnet.",
          "Volumenstrom lässt sich auch als Produkt aus Querschnittsfläche und Strömungsgeschwindigkeit ausdrücken: Q = A × v. Diese Beziehung ist als Kontinuitätsgleichung bekannt und bildet die Grundlage für die Berechnung von Rohrdurchmessern.",
        ],
      },
      {
        title: "Die SI-Einheit des Volumenstroms",
        paragraphs: [
          "Im Internationalen Einheitensystem ist die abgeleitete Einheit des Volumenstroms Kubikmeter pro Sekunde (m³/s); da diese Einheit für alltägliche Installationsanwendungen meist zu groß ist, werden in der Praxis kleinere Einheiten wie Kubikmeter pro Stunde (m³/h) und Liter pro Minute (L/min) bevorzugt.",
          "Beim Wechsel zwischen den Einheiten muss beachtet werden, dass sowohl die Volumen- als auch die Zeiteinheit umgerechnet wird; 1 m³/h entspricht beispielsweise 1000 Litern geteilt durch 60 Minuten, also etwa 16,67 L/min.",
        ],
      },
      {
        title: "Volumenstrom in der Haus- und Gebäudeinstallation",
        paragraphs: [
          "In der Hausinstallation werden Volumenstromwerte von Wasserhähnen, Duschköpfen und Wasserzählern meist in Liter pro Minute angegeben; ein üblicher Duschkopf gibt typischerweise 6 bis 12 L/min ab.",
          "Bei der Planung der Wasserversorgung eines Gebäudes wird der gesamte Volumenstrombedarf (unter Schätzung, wie viele Zapfstellen gleichzeitig genutzt werden) in Kubikmeter pro Stunde berechnet, und danach der Durchmesser der Hauptleitung festgelegt.",
        ],
      },
      {
        title: "Zusammenhang zwischen Volumenstrom und Rohrdurchmesser",
        paragraphs: [
          "Um denselben Volumenstrom zu transportieren, muss die Strömungsgeschwindigkeit bei kleinerem Rohrdurchmesser steigen (gemäß der Beziehung Q = A × v); dies führt zu einem höheren reibungsbedingten Druckverlust.",
          "Deshalb ist es bei der Installationsplanung wichtig, nicht nur einen ausreichenden Volumenstrom sicherzustellen, sondern auch einen Rohrdurchmesser zu wählen, der die Strömungsgeschwindigkeit im empfohlenen Bereich (nicht übermäßig hoch) hält.",
        ],
      },
      {
        title: "Volumenstrom in Bewässerungssystemen",
        paragraphs: [
          "Bei der Garten- und landwirtschaftlichen Bewässerung wird der Volumenstrom von Tropfbewässerungssystemen meist in Liter pro Stunde (je Tropfer), der von Sprinkleranlagen in Liter pro Minute angegeben.",
          "Um den Gesamtwasserbedarf eines Bewässerungssystems zu berechnen, müssen die Volumenströme aller verwendeten Tropfer oder Düsen addiert und mit dem maximalen Volumenstrom der Wasserquelle (Netz oder Pumpe) verglichen werden.",
        ],
      },
      {
        title: "Wie wird Volumenstrom gemessen?",
        paragraphs: [
          "Zur Volumenstrommessung werden unterschiedliche Technologien wie Wasserzähler, Turbinen-Durchflussmesser, magnetisch-induktive Durchflussmesser und Ultraschall-Durchflussmesser eingesetzt; welches Verfahren geeignet ist, hängt von Fluidart und geforderter Genauigkeit ab.",
          "Für eine einfache Schätzung kann die Füllzeit eines Gefäßes mit bekanntem Volumen (etwa 1 Liter) mit einer Stoppuhr gemessen werden, um den Volumenstrom näherungsweise zu berechnen -- ein praktischer Weg besonders zur Kontrolle von Wasserhähnen und Duschköpfen mit geringem Durchfluss.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "elektrik",
    "elektrik",
    "Elektrische Einheiten und Umrechnungen",
    "Rechnen Sie zwischen Volt und Kilovolt oder zwischen Ampere und Milliampere um und vergleichen Sie gebräuchliche elektrische Einheiten.",
    [
      "Elektrizität ist ein weites Feld, das aus miteinander verknüpften, aber unterschiedlichen physikalischen Größen wie Spannung (Potentialdifferenz) und Stromstärke (Ladungsfluss) besteht. Diese Kategorie fasst die beiden im elektrotechnischen Alltag am häufigsten benötigten Größen zusammen -- Volt (Spannung) und Ampere (Stromstärke).",
      "Spannung und Stromstärke sind nicht dieselbe physikalische Größe und lassen sich nicht direkt ineinander umrechnen; ihr Zusammenhang wird über das Ohmsche Gesetz (U = I × R) in Abhängigkeit vom Widerstand des Stromkreises hergestellt. Die Umrechnungen auf dieser Seite behandeln jede Größe für sich (Volt-Kilovolt, Ampere-Milliampere).",
    ],
    [
      { label: "Name der Spannungseinheit", value: "Volt (nach Alessandro Volta)" },
      { label: "Name der Stromeinheit", value: "Ampere (nach André-Marie Ampère)" },
      { label: "SI-Basiseinheit (Strom)", value: "Ampere (A) -- eine der 7 SI-Basiseinheiten" },
      { label: "Zusammenhang Spannung-Strom-Widerstand", value: "Ohmsches Gesetz: U = I × R" },
      { label: "Netzspannung in Deutschland", value: "230 V (einphasig), 400 V (dreiphasig)" },
    ],
    [
      {
        title: "Was ist Spannung (Volt)?",
        paragraphs: [
          "Spannung beschreibt die elektrische Potentialdifferenz zwischen zwei Punkten eines Stromkreises und kann als die 'treibende Kraft' verstanden werden, die Elektronen von einem Punkt zum anderen fließen lässt. Die SI-Einheit ist das Volt (V).",
          "Die Einheit Volt ist nach dem italienischen Physiker Alessandro Volta benannt, dem Erfinder der elektrischen Batterie. Angaben wie '1,5 V' oder '9 V' auf einer Batterie geben die Potentialdifferenz an, die diese Batterie liefern kann.",
        ],
      },
      {
        title: "Was ist Stromstärke (Ampere)?",
        paragraphs: [
          "Elektrische Stromstärke gibt die Menge elektrischer Ladung an, die pro Zeiteinheit durch einen Leiter fließt; die SI-Einheit ist das Ampere (A). Ein Ampere entspricht dem Durchfluss von etwa 6,242 × 10¹⁸ Elektronen pro Sekunde an einem Punkt.",
          "Die Einheit Ampere ist nach dem französischen Physiker André-Marie Ampère benannt, einem der Begründer des Elektromagnetismus. Vor der SI-Revision 2019 war Ampere eine der Basiseinheiten des SI, die auf einem festgelegten Wert beruhte; heute gilt es weiterhin als Basisgröße, wird aber über die Elementarladungskonstante (e) definiert.",
        ],
      },
      {
        title: "Warum lassen sich Spannung und Stromstärke nicht ineinander umrechnen?",
        paragraphs: [
          "Spannung (V) und Stromstärke (A) sind unterschiedliche physikalische Größen -- die eine beschreibt eine Potentialdifferenz, die andere die Fließgeschwindigkeit von Ladung. Deshalb hat die Frage 'wie viel Ampere entsprechen X Volt' für sich genommen keine Antwort, ohne den Widerstand (oder die Leistung) im Stromkreis zu kennen.",
          "Der Zusammenhang zwischen beiden wird über das Ohmsche Gesetz hergestellt: U = I × R (Spannung = Stromstärke × Widerstand). Eine Spannung von 12 Volt erzeugt beispielsweise an einem Widerstand von 4 Ohm einen Strom von 3 Ampere; dieselben 12 Volt ergeben an einem anderen Widerstand jedoch einen völlig anderen Stromwert.",
        ],
      },
      {
        title: "Zusammenhang zwischen Leistung, Spannung und Stromstärke",
        paragraphs: [
          "Elektrische Leistung (Watt) entspricht dem Produkt aus Spannung und Stromstärke: P = U × I. Diese Formel zeigt, dass ein Gerät mit gleicher Leistung bei höherer Spannung eine geringere Stromstärke und bei niedrigerer Spannung eine höhere Stromstärke benötigt.",
          "Dieser Zusammenhang erklärt, warum Stromnetze mit hoher Spannung betrieben werden: Wird dieselbe Leistung mit geringerer Stromstärke übertragen, verringert sich der widerstandsbedingte Energieverlust (Joulesche Wärme) in den Übertragungsleitungen erheblich.",
        ],
      },
      {
        title: "Netzspannung in Deutschland und weltweit",
        paragraphs: [
          "In Deutschland beträgt die Standardnetzspannung in Wohninstallationen einphasig 230 Volt, bei den in Industrie und Gewerbe genutzten dreiphasigen Systemen 400 Volt (bei einer Frequenz von 50 Hz).",
          "Weltweit variiert die Netzspannung von Land zu Land; während die USA und Kanada 120 Volt verwenden, nutzt der Großteil Europas, einschließlich Deutschland, 230 Volt. Dieser Unterschied ist der Hauptgrund, warum aus dem Ausland mitgebrachte Elektrogeräte nicht ohne einen Spannungswandler direkt betrieben werden können.",
        ],
      },
      {
        title: "Gleichstrom (DC) und Wechselstrom (AC)",
        paragraphs: [
          "Bei Gleichstrom (DC) fließen Elektronen konstant in eine Richtung -- Batterien und Solarmodule erzeugen Gleichstrom. Bei Wechselstrom (AC) kehrt sich die Stromrichtung mit einer bestimmten Frequenz pro Sekunde um (in Deutschland 50 Hz, also 50-mal pro Sekunde) -- der Netzstrom ist Wechselstrom.",
          "Der Hauptgrund, warum AC für die Netzverteilung bevorzugt wird, ist, dass sich die Spannung mithilfe von Transformatoren leicht erhöhen oder senken lässt; das ermöglicht den verlustarmen Transport von Strom über große Entfernungen.",
        ],
      },
      {
        title: "Wirkung von elektrischem Strom auf den menschlichen Körper",
        paragraphs: [
          "Die Stärke des durch den menschlichen Körper fließenden Stroms bestimmt die spürbare Wirkung: Etwa 1 Milliampere wird leicht wahrgenommen, 10 bis 20 Milliampere können zu Muskelverkrampfungen führen (man kann die Hand nicht mehr lösen), über 100 Milliampere können Herzrhythmusstörungen (Kammerflimmern) und den Tod verursachen.",
          "Deshalb ist bei der elektrischen Sicherheit nicht nur die Spannung entscheidend, sondern auch die Stärke des Stroms, der im Stromkreis entstehen kann -- selbst bei niedriger Spannung kann in einer Umgebung mit geringem Widerstand (etwa Feuchtigkeit) ein gefährlich hoher Strom entstehen.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "gumus-ayar",
    "gumus_ayar",
    "Silberreinheit-Einheiten und Umrechnungen",
    "Rechnen Sie zwischen 999, 925 (Sterling), 900 und 800 Silber anhand des Feingehalts in Gramm um und erfahren Sie mehr über Feingehaltswerte und Verwendung in der Schmuckherstellung.",
    [
      "Silber wird, wie Gold, bei Schmuck und Gebrauchsgegenständen fast nie in reiner Form verwendet -- da es ein weiches Metall ist, wird es mit anderen Metallen wie Kupfer legiert. Der Feingehalt (in Promille) gibt den Anteil an reinem Silber in dieser Legierung an.",
      "Anders als beim Goldkarat wird die Silberreinheit nicht auf einer 24er-Skala, sondern in Tausendsteln (Promille) angegeben: 999 steht für nahezu reines Silber, 925 ist der weltweit als 'Sterlingsilber' bekannte, gebräuchlichste Schmuckstandard.",
    ],
    [
      { label: "Messsystem", value: "Feingehaltssystem (Promille)" },
      { label: "Grundreferenz", value: "999 = 99,9 % reines Silber" },
      { label: "Weltweit gebräuchlichster Schmuckstandard", value: "925 (Sterlingsilber)" },
      { label: "Barren-/Anlagesilber", value: "999er Feingehalt (Feinsilber)" },
      { label: "Berechnungslogik", value: "Gramm × (Ausgangsfeingehalt / 1000) ÷ (Zielfeingehalt / 1000)" },
    ],
    [
      {
        title: "Was genau misst der Silber-Feingehalt (Promille)?",
        paragraphs: [
          "Anders als bei Gold wird die Silberreinheit nicht in 24 Teilen, sondern in Tausendsteln (Promille) angegeben. Ein Feingehalt von 999 bedeutet, dass 999 von 1000 Teilen der Legierung (also 99,9 %) reines Silber sind; das verbleibende eine Tausendstel besteht meist aus Spuren anderer Elemente.",
          "Ein Feingehalt von 925 (Sterlingsilber) bedeutet, dass 92,5 % der Legierung reines Silber sind, die restlichen 7,5 % meist Kupfer. Diese geringe Kupfermenge verleiht dem sehr weichen und leicht verformbaren reinen Silber die nötige Härte.",
        ],
      },
      {
        title: "Warum ist Sterlingsilber (925) der Weltstandard?",
        paragraphs: [
          "Der Sterlingsilber-Standard mit 925er Feingehalt reicht in England bis ins 12. Jahrhundert zurück und hat sich im Laufe der Zeit weltweit zum am meisten anerkannten Standard für Schmuck, Besteck und Silberwaren entwickelt.",
          "Reines Silber (999) ist für Gebrauchsgegenstände zu weich und anfällig für Kratzer; die Zugabe von 7,5 % Kupfer verleiht dem Silber die nötige Härte, während der charakteristische Glanz und die Farbe des Silbers weitgehend erhalten bleiben.",
        ],
      },
      {
        title: "Unterschiede zwischen 999, 900 und 800 Silber",
        paragraphs: [
          "999er Silber (Feinsilber) wird wegen seiner Weichheit bei Barren und Anlagemünzen bevorzugt, da für Anleger der Reinheitsgrad das wichtigste Kriterium ist; für Alltagsschmuck wird es dagegen selten verwendet.",
          "900er Silber (Münzsilber) wurde historisch in Silbermünzen vieler Länder verwendet. 800er Silber ist besonders in Deutschland, Österreich und weiteren europäischen Ländern ein gebräuchlicher, gegenüber Sterlingsilber etwas weniger reiner, aber dennoch widerstandsfähiger Schmuckstandard und trägt dort traditionell den Feingehaltsstempel '800'.",
        ],
      },
      {
        title: "Wie wird der Reinsilbergehalt berechnet?",
        paragraphs: [
          "Um den Reinsilberanteil eines 10 Gramm schweren Silberrings mit 925er Feingehalt zu ermitteln: 10 × (925 / 1000) = 9,25 Gramm reines Silber. Die restlichen 0,75 Gramm sind zur Stabilität zugesetztes Kupfer oder andere Metalle.",
          "Beim Umrechnen zwischen verschiedenen Feingehalten gilt dieselbe Logik: Ist die Reinsilbermenge in einer 925er Legierung bekannt, ergibt sich ihr 999er-Äquivalent, indem diese Menge durch 999/1000 geteilt wird.",
        ],
      },
      {
        title: "Anlaufen von Silber und Zusammenhang mit der Reinheit",
        paragraphs: [
          "Das Anlaufen (Nachdunkeln) von Silberschmuck über die Zeit rührt nicht vom Silber selbst her, sondern von der Reaktion des in der Legierung enthaltenen Kupfers mit Schwefelverbindungen in der Luft. Deshalb läuft Silber mit höherem Feingehalt (wie 999er) weniger stark an.",
          "Manche Hersteller haben anlaufresistente Sterlingsilber-Legierungen entwickelt, um die Anlaufbeständigkeit zu erhöhen; diese verwenden statt Kupfer andere Zusatzstoffe wie Germanium.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "kan-sekeri",
    "kan_sekeri",
    "Blutzucker-Einheiten und Umrechnungen",
    "Rechnen Sie den Blutzuckerwert (Glukose) zwischen mg/dL und mmol/L um und vergleichen Sie die in den USA gebräuchliche Einheit mit der weltweit üblichen SI-Einheit.",
    [
      "Blutzucker (Blutglukose) ist eine Messgröße, die die Glukosemenge im Blut angibt und eine zentrale Rolle bei der Diabetesüberwachung spielt. Weltweit werden zwei unterschiedliche Einheitensysteme verwendet: die SI-Einheit Millimol pro Liter (mmol/L) und die besonders in den USA gebräuchliche Einheit Milligramm pro Deziliter (mg/dL).",
      "Der Unterschied zwischen diesen beiden Einheiten führt bei Personen, die internationale medizinische Fachliteratur verfolgen oder im Ausland Tests durchführen lassen, häufig zu Verwirrung -- derselbe Zahlenwert (etwa '100') kann in den beiden Einheiten einen völlig unterschiedlichen Blutzuckerspiegel bedeuten.",
    ],
    [
      { label: "Gemessener Stoff", value: "Glukose (Blutzucker)" },
      { label: "SI-Einheit (weltweit)", value: "Millimol pro Liter (mmol/L)" },
      { label: "In den USA gebräuchliche Einheit", value: "Milligramm pro Deziliter (mg/dL)" },
      { label: "Umrechnungsfaktor", value: "mg/dL = mmol/L × 18,016" },
      { label: "Molare Masse von Glukose", value: "≈180,16 g/mol" },
    ],
    [
      {
        title: "Warum wird Blutzucker in zwei unterschiedlichen Einheiten gemessen?",
        paragraphs: [
          "Die Weltgesundheitsorganisation und die meisten Länder, darunter Deutschland, geben Blutglukose gemäß dem SI-Einheitensystem in Millimol pro Liter (mmol/L) an. Die USA verwenden dagegen traditionell weiterhin die Einheit Milligramm pro Deziliter (mg/dL).",
          "Der Umrechnungsfaktor zwischen beiden Einheiten (18,016) leitet sich aus der molaren Masse von Glukose (etwa 180,16 g/mol) ab -- das ergibt sich daraus, dass 1 Millimol Glukose einer Masse von 180,16 Milligramm entspricht, also bezogen auf 1 Deziliter (0,1 Liter) 18,016 Milligramm.",
        ],
      },
      {
        title: "Wie rechnet man von mg/dL in mmol/L um?",
        paragraphs: [
          "Um von mg/dL in mmol/L umzurechnen, wird der Wert durch 18,016 geteilt: mmol/L = mg/dL ÷ 18,016. Ein Wert von 100 mg/dL entspricht beispielsweise etwa 5,55 mmol/L.",
          "In umgekehrter Richtung, von mmol/L zu mg/dL, wird der Wert mit 18,016 multipliziert: mg/dL = mmol/L × 18,016. Dieser einfache Multiplikations-/Divisionszusammenhang ergibt sich daraus, dass Glukose ein einzelnes Molekül mit fester molarer Masse ist.",
        ],
      },
      {
        title: "Allgemeine Referenzbereiche (nur zur Information)",
        paragraphs: [
          "Häufig verwendete allgemeine Referenzbereiche für den Nüchternblutzucker: Der Normalbereich liegt meist bei etwa 70-99 mg/dL (3,9-5,5 mmol/L); ein Bereich von 100-125 mg/dL (5,6-6,9 mmol/L) gilt als 'Prädiabetes', ein Wert ab 126 mg/dL (7,0 mmol/L) (bei wiederholten Tests) kann auf Diabetes hinweisen.",
          "Diese Werte dienen ausschließlich der allgemeinen Information und sind keine verbindlichen medizinischen Grenzwerte; sie können je nach Testmethode, Labor und klinischer Situation der jeweiligen Person variieren. Die Interpretation von Blutzuckerwerten und die Diagnose müssen stets von einer Ärztin oder einem Arzt vorgenommen werden.",
        ],
      },
      {
        title: "Methoden der Blutzuckermessung",
        paragraphs: [
          "Blutzucker kann anhand einer Kapillarblutprobe aus dem Finger mit einem Blutzuckermessgerät (Heimmessgerät) oder im Labor aus einer venösen Blutprobe gemessen werden. Zwischen beiden Methoden können kleine Unterschiede bestehen, weshalb für eine gesicherte Diagnose die Labormessung bevorzugt wird.",
          "Systeme zur kontinuierlichen Glukoseüberwachung (CGM) verfolgen den Glukosespiegel über einen unter die Haut eingesetzten Sensor rund um die Uhr automatisch; das ermöglicht besonders Menschen mit Diabetes, Glukoseschwankungen engmaschiger zu beobachten.",
        ],
      },
      {
        title: "Unterschied zwischen HbA1c und Momentanblutzucker",
        paragraphs: [
          "Eine Momentanmessung des Blutzuckers (mg/dL oder mmol/L) zeigt nur den Glukosespiegel zu diesem Zeitpunkt, während der HbA1c-Test (glykiertes Hämoglobin) den durchschnittlichen Blutzuckerspiegel der vergangenen 2-3 Monate widerspiegelt und meist in Prozent (%) angegeben wird.",
          "Beide Messungen ergänzen sich: Die Momentanmessung zeigt tägliche Schwankungen, HbA1c das langfristige Kontrollniveau; im Diabetesmanagement werden beide gemeinsam bewertet.",
        ],
      },
    ]
  ),
  createCategoryPage(
    "vitamin-d",
    "vitamin_d",
    "Vitamin-D-Einheiten und Umrechnungen",
    "Rechnen Sie den Vitamin-D-Wert (25-OH) im Blutserum zwischen ng/mL und nmol/L um und vergleichen Sie die in den USA gebräuchliche Einheit mit der weltweit üblichen SI-Einheit.",
    [
      "Der Vitamin-D-Spiegel (25-Hydroxyvitamin D, 25-OH D) ist eine standardisierte Labormessung, die den Vitamin-D-Speicher im Blut anzeigt. Weltweit werden zwei unterschiedliche Einheiten verwendet: die SI-Einheit Nanomol pro Liter (nmol/L) und die besonders in den USA gebräuchliche Einheit Nanogramm pro Milliliter (ng/mL).",
      "In Deutschland kommen je nach Labor beide Einheiten vor. Der Unterschied zwischen ihnen kann beim Lesen ausländischer Laborergebnisse oder internationaler medizinischer Fachliteratur zu Verwirrung führen -- derselbe Zahlenwert kann in den beiden Einheiten einen sehr unterschiedlichen Vitamin-D-Spiegel bedeuten.",
    ],
    [
      { label: "Gemessener Stoff", value: "25-Hydroxyvitamin D (25-OH D)" },
      { label: "SI-Einheit (weltweit)", value: "Nanomol pro Liter (nmol/L)" },
      { label: "In den USA gebräuchliche Einheit", value: "Nanogramm pro Milliliter (ng/mL)" },
      { label: "Umrechnungsfaktor", value: "nmol/L = ng/mL × 2,496" },
      { label: "Molare Masse von 25-OH-Vitamin-D", value: "≈400,64 g/mol" },
    ],
    [
      {
        title: "Warum wird der Vitamin-D-Spiegel in zwei unterschiedlichen Einheiten gemessen?",
        paragraphs: [
          "Länder, die dem internationalen SI-Einheitensystem folgen (darunter Deutschland und die meisten europäischen Länder), geben den Vitamin-D-Spiegel in Nanomol pro Liter (nmol/L) an. Die USA verwenden dagegen traditionell weiterhin die massebasierte Einheit Nanogramm pro Milliliter (ng/mL).",
          "Der Umrechnungsfaktor (2,496) leitet sich aus der molaren Masse des 25-Hydroxyvitamin-D-Moleküls (etwa 400,64 g/mol) ab; dieser Zusammenhang erklärt, warum sich die Einheiten mit einem festen Faktor ineinander umrechnen lassen.",
        ],
      },
      {
        title: "Wie rechnet man von ng/mL in nmol/L um?",
        paragraphs: [
          "Um von ng/mL in nmol/L umzurechnen, wird der Wert mit 2,496 multipliziert: nmol/L = ng/mL × 2,496. Ein Wert von 30 ng/mL entspricht beispielsweise etwa 74,9 nmol/L.",
          "In umgekehrter Richtung, von nmol/L zu ng/mL, wird der Wert durch 2,496 geteilt: ng/mL = nmol/L ÷ 2,496. Dieser einfache proportionale Zusammenhang ergibt sich daraus, dass das Molekül eine feste molare Masse besitzt.",
        ],
      },
      {
        title: "Allgemeine Referenzbereiche (nur zur Information)",
        paragraphs: [
          "In manchen internationalen Quellen (etwa der Endocrine Society) häufig zitierte allgemeine Bereiche: unter 20 ng/mL (50 nmol/L) gilt als 'Mangel', 20-29 ng/mL (50-72,5 nmol/L) als 'relativer Mangel', ab 30 ng/mL (75 nmol/L) wird meist von einem 'ausreichenden' Wert gesprochen.",
          "Diese Grenzwerte können zwischen verschiedenen Gesundheitsorganisationen leicht variieren und sollten unter Berücksichtigung von Alter, Gesundheitszustand und geografischer Region der jeweiligen Person interpretiert werden. Diese Seite dient ausschließlich der allgemeinen Information; die endgültige Beurteilung muss von einer Ärztin oder einem Arzt vorgenommen werden.",
        ],
      },
      {
        title: "Warum wird Vitamin D anders gemessen als andere Vitamine?",
        paragraphs: [
          "Der Großteil des im Blut zirkulierenden Vitamin D liegt in Form von 25-Hydroxyvitamin D vor, das in der Leber gebildet wird und eine relativ lange Halbwertszeit besitzt; deshalb wird zur Beurteilung des Vitamin-D-Status dieser spezifische Metabolit gemessen (nicht die aktive Hormonform 1,25-Dihydroxyvitamin D).",
          "Diese Wahl beruht auf der längeren und stabileren Präsenz von 25-OH D im Blutkreislauf -- die aktive Form ändert sich viel schneller und unterliegt einer strengen hormonellen Regulation, weshalb sie den langfristigen Vitamin-D-Speicher weniger zuverlässig widerspiegelt.",
        ],
      },
      {
        title: "Vitamin-D-Quellen",
        paragraphs: [
          "Der Körper kann durch UVB-Strahlung des Sonnenlichts auf der Haut selbst Vitamin D bilden; das ist für die meisten Menschen die wichtigste Vitamin-D-Quelle. Auch wenige Lebensmittel wie fetter Fisch, Eigelb und angereicherte Milchprodukte enthalten von Natur aus Vitamin D.",
          "Bei Menschen in nördlichen Breitengraden, mit geringer Sonnenexposition oder dunklerer Hautfarbe kann die Vitamin-D-Bildung niedriger ausfallen; solche Faktoren werden bei der Beurteilung eines möglichen Vitamin-D-Präparatebedarfs meist berücksichtigt.",
        ],
      },
    ]
  ),
];

export function findGermanCategoryPage(slug: string) {
  return germanCategoryPages.find(
    (categoryPage) => categoryPage.slug === slug
  );
}

export function findGermanCategoryPageByTurkishSlug(
  sourceSlug: string
) {
  return germanCategoryPages.find(
    (categoryPage) => categoryPage.sourceSlug === sourceSlug
  );
}

export function findGermanCategoryPageByCategory(
  category: string
) {
  return germanCategoryPages.find(
    (categoryPage) => categoryPage.category === category
  );
}

export function getGermanCategoryPathByCategory(
  category: string
) {
  const categoryPage =
    findGermanCategoryPageByCategory(category);

  return categoryPage
    ? `/de/kategorien/${categoryPage.slug}`
    : `/de/kategorien/${category}`;
}
