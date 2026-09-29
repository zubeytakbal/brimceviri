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
  | "sleepCalculator"
  | "fuelConsumptionCalculator"
  | "laminateCalculator"
  | "wallpaperCalculator"
  | "movingBoxCalculator"
  | "naturalGasCalculator"
  | "evChargingCalculator";

export type GermanStandaloneTool = {
  slug: string;
  germanPath: string;
  turkishPath: string;
  title: string;
  /** Titel in den Suchergebnissen; ohne Angabe wird title verwendet. */
  metaTitle?: string;
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
    | "sleepCalculator"
    | "fuelConsumptionCalculator"
    | "laminateCalculator"
    | "wallpaperCalculator"
    | "movingBoxCalculator"
    | "naturalGasCalculator"
    | "evChargingCalculator";
  cardDescription: string;
  articleSections: Array<{
    title: string;
    body: string;
  }>;
  /** Sichtbare FAQ, zusätzlich als FAQPage-Daten ausgegeben. */
  faq?: Array<{ question: string; answer: string }>;
  priority: number;
};

export const germanStandaloneTools: GermanStandaloneTool[] = [
  {
    slug: "farbrechner",
    germanPath: "/de/farbrechner",
    turkishPath: "/boya-hesaplama",
    title: "Farbrechner",
    metaTitle: "Farbrechner: Wie viel Wandfarbe brauche ich?",
    description: "Wie viel Wandfarbe brauchen Sie? Aus Raummaßen, Türen, Fenstern, Anstrichen und Ergiebigkeit berechnet der Farbrechner Liter und Eimergrößen.",
    intro: "Geben Sie Länge, Breite und Höhe des Raums ein. Türen und Fenster werden abgezogen; auf Wunsch wird die Decke mitgerechnet. Das Ergebnis zeigt die Streichfläche, die benötigte Farbmenge und eine passende Eimerkombination.",
    component: "paintCalculator",
    iconName: "paintCalculator",
    cardDescription: "Berechnet Wandfläche, Decke und benötigte Farbmenge für einen Raum.",
    articleSections: [
      { title: "So wird die Farbmenge berechnet", body: "Wandfläche = 2 × (Länge + Breite) × Raumhöhe, abzüglich rund 2 m² pro Tür und 1,5 m² pro Fenster. Farbmenge in Litern = Streichfläche × Anzahl der Anstriche ÷ Ergiebigkeit. Die Ergiebigkeit steht auf dem Eimer, meist in m² pro Liter für einen Anstrich." },
      { title: "Beispiel: Zimmer mit 4 × 5 m", body: "Bei 2,5 m Raumhöhe haben die Wände 2 × (4 + 5) × 2,5 = 45 m². Abzüglich einer Tür (2 m²) und eines Fensters (1,5 m²) bleiben 41,5 m². Zwei Anstriche ergeben 83 m²; bei einer Ergiebigkeit von 7 m²/l sind das rund 11,9 Liter, also zum Beispiel ein 10-Liter- und ein 2,5-Liter-Eimer." },
      { title: "Ergiebigkeit richtig einschätzen", body: "Weiße Dispersionsfarbe reicht meist für 6 bis 8 m² pro Liter und Anstrich. Raufaser, rauer Putz und saugende Untergründe verbrauchen deutlich mehr; auf neuem Gipskarton oder Putz empfiehlt sich vorher Tiefengrund. Bei kräftigen Farbtönen oder starkem Farbwechsel sind oft zwei bis drei Anstriche nötig." },
      { title: "Lieber etwas mehr kaufen", body: "Planen Sie 10 % Reserve für Ausbesserungen ein. Farbe aus einer Charge vermeidet Farbtonunterschiede, besonders bei getönten Farben." },
    ],
    faq: [
      { question: "Wie viel Farbe brauche ich für 20 m² Wand?", answer: "Bei zwei Anstrichen und 7 m²/l Ergiebigkeit etwa 20 × 2 ÷ 7 = 5,7 Liter, also ein 5-Liter-Eimer plus Reserve." },
      { question: "Wie viel Farbe braucht ein Zimmer mit 12 m² Grundfläche?", answer: "Ein 3 × 4 m großes Zimmer mit 2,5 m Höhe hat etwa 35 m² Wandfläche (ohne Tür und Fenster rund 31,5 m²). Für zwei Anstriche sind das bei 7 m²/l rund 9 Liter." },
      { question: "Muss ich zweimal streichen?", answer: "Meist ja. Ein Anstrich deckt nur auf gleichem hellen Untergrund zuverlässig. Bei Farbwechsel, Raufaser oder neuem Putz sind zwei Anstriche üblich." },
      { question: "Wie viel Farbe brauche ich für die Decke?", answer: "Die Deckenfläche entspricht der Grundfläche (Länge × Breite). Aktivieren Sie im Rechner die Option Decke, dann wird sie mitgerechnet." },
    ],
    priority: 0.7,
  },
  {
    slug: "fliesenrechner",
    germanPath: "/de/fliesenrechner",
    turkishPath: "/fayans-hesaplama",
    title: "Fliesenrechner",
    metaTitle: "Fliesenrechner: Wie viele Fliesen brauche ich?",
    description: "Wie viele Fliesen brauchen Sie? Fläche, Fliesenformat und Verschnitt eingeben und Stückzahl sowie Quadratmeter inklusive Reserve berechnen.",
    intro: "Geben Sie die zu belegende Fläche, die Fliesenbreite und -höhe in Zentimetern und den Verschnitt ein. Der Rechner zeigt die Fläche pro Fliese und die benötigte Stückzahl.",
    component: "tileCalculator",
    iconName: "tileCalculator",
    cardDescription: "Berechnet Fliesenbedarf auf Basis von Fläche, Format und Verschnitt.",
    articleSections: [
      { title: "So rechnet der Fliesenrechner", body: "Anzahl Fliesen = Fläche ÷ Fläche einer Fliese × (1 + Verschnitt), aufgerundet. Die Fläche einer Fliese ist Breite × Höhe; 60 × 60 cm ergibt 0,36 m², 30 × 60 cm ergibt 0,18 m²." },
      { title: "Beispiel: 20 m² Boden mit 60 × 60 cm", body: "20 ÷ 0,36 = 55,6 Fliesen. Mit 10 % Verschnitt sind es 61,1, also 62 Fliesen. Da Fliesen meist in Paketen verkauft werden, rechnen Sie die Paketanzahl mit der m²-Angabe auf der Verpackung nach." },
      { title: "Wie viel Verschnitt einplanen?", body: "Gerade Verlegung in rechteckigen Räumen: etwa 5 bis 10 %. Diagonale Verlegung oder Fischgrät: 15 % und mehr. Viele Ecken, Säulen oder kleine Räume erhöhen den Verschnitt. Heben Sie ein paar Ersatzfliesen für spätere Reparaturen auf." },
      { title: "Fugen und Kleber", body: "Die Fugenbreite verändert die Stückzahl kaum, aber den Fugenmörtel: bei großen Formaten reichen oft 2 bis 3 mm, bei Wandfliesen im Bad sind 2 mm üblich. Der Kleberbedarf liegt je nach Zahnung meist bei 3 bis 5 kg pro m²." },
    ],
    faq: [
      { question: "Wie viele Fliesen brauche ich für 10 m²?", answer: "Bei 30 × 60 cm (0,18 m²) sind es 10 ÷ 0,18 = 55,6, mit 10 % Verschnitt 62 Fliesen." },
      { question: "Wie viele 60 × 60 Fliesen sind ein Quadratmeter?", answer: "2,78 Fliesen, denn eine Fliese hat 0,36 m². Ohne Verschnitt brauchen Sie also knapp 3 Fliesen pro m²." },
      { question: "Wie viel Verschnitt bei Fliesen?", answer: "Rechnen Sie bei gerader Verlegung mit 5 bis 10 %, bei diagonaler Verlegung mit mindestens 15 %." },
    ],
    priority: 0.7,
  },
  {
    slug: "ziegelrechner",
    germanPath: "/de/ziegelrechner",
    turkishPath: "/tugla-hesaplama",
    title: "Ziegelrechner",
    metaTitle: "Ziegelrechner: Wie viele Steine pro m² Mauer?",
    description: "Wie viele Ziegel oder Mauersteine brauchen Sie? Wandfläche, Steinformat und Fugenstärke eingeben und die Stückzahl mit Verschnitt berechnen.",
    intro: "Geben Sie die Wandfläche, die sichtbare Breite und Höhe des Steins in Zentimetern, die Fugenstärke und den Verschnitt ein. Der Rechner zeigt die Fläche pro Stein mit Fuge und die benötigte Anzahl.",
    component: "brickCalculator",
    iconName: "brickCalculator",
    cardDescription: "Berechnet den Bedarf an Ziegeln für Mauern mit Fuge und Reserve.",
    articleSections: [
      { title: "So wird die Steinanzahl berechnet", body: "Fläche pro Stein = (Steinbreite + Fuge) × (Steinhöhe + Fuge). Anzahl = Wandfläche ÷ Fläche pro Stein × (1 + Verschnitt). Maßgeblich sind die Maße der Ansichtsfläche, also die Seite, die in der Wand sichtbar ist." },
      { title: "Beispiel: Normalformat (NF)", body: "Ein NF-Ziegel misst 24 × 11,5 × 7,1 cm. Im Läuferverband ist die Ansichtsfläche 24 × 7,1 cm; mit 1 cm Fuge sind das 25 × 8,1 cm = 0,02025 m². Pro Quadratmeter Wand sind das rund 49 Steine, für 12 m² Wand mit 5 % Verschnitt etwa 623 Steine." },
      { title: "Übliche Steinformate", body: "Dünnformat (DF): 24 × 11,5 × 5,2 cm, rund 64 Steine pro m² Ansicht. Normalformat (NF): 24 × 11,5 × 7,1 cm, rund 49 Steine pro m². 2 DF: 24 × 11,5 × 11,3 cm, rund 33 Steine pro m². Großformatige Planziegel werden mit Dünnbettmörtel verklebt; hier ist die Fuge nur etwa 1 mm stark." },
      { title: "Wandstärke beachten", body: "Die Stückzahl gilt für eine Steinlage in der Wanddicke (zum Beispiel 11,5 cm). Bei einer 24 cm dicken Wand aus NF-Steinen im Blockverband verdoppelt sich die Anzahl ungefähr." },
    ],
    faq: [
      { question: "Wie viele NF-Steine brauche ich pro m²?", answer: "Bei 1 cm Fuge rund 49 Steine pro m² für eine 11,5 cm dicke Wand." },
      { question: "Wie viel Verschnitt bei Mauersteinen?", answer: "Meist 3 bis 5 %. Bei vielen Öffnungen, Ecken oder Bruchgefahr beim Transport eher mehr." },
      { question: "Wie dick ist eine Mörtelfuge?", answer: "Bei klassischem Mauerwerk etwa 10 bis 12 mm, bei Planziegeln mit Dünnbettmörtel nur 1 bis 3 mm." },
    ],
    priority: 0.7,
  },
  {
    slug: "altersrechner",
    germanPath: "/de/altersrechner",
    turkishPath: "/yas-hesaplama",
    title: "Altersrechner",
    metaTitle: "Altersrechner: Wie alt bin ich genau?",
    description: "Wie alt bin ich genau? Der Altersrechner zeigt Ihr Alter in Jahren, Monaten und Tagen, dazu die Gesamtzahl der Tage und Wochen und den nächsten Geburtstag.",
    intro: "Geben Sie Ihr Geburtsdatum ein und bei Bedarf ein anderes Stichtagsdatum. Sie sehen das genaue Alter in Jahren, Monaten und Tagen sowie laufende Summen in Monaten, Wochen und Tagen.",
    component: "dateCalculator",
    iconName: "dateCalculator",
    cardDescription: "Zeigt Alters- oder Datumsdifferenzen mit Jahren, Monaten, Tagen und Summenwerten.",
    articleSections: [
      { title: "So wird das Alter berechnet", body: "Am Tag der Geburt ist man 0 Jahre alt und wird an jedem Geburtstag ein Jahr älter. Der Rechner zieht das Geburtsjahr vom aktuellen Jahr ab, zieht ein weiteres Jahr ab, wenn der Geburtstag in diesem Jahr noch nicht war, und zählt danach die vollen Monate und die restlichen Tage." },
      { title: "Beispiel", body: "Wer am 15. März 1990 geboren ist, ist am 28. September 2026 genau 36 Jahre, 6 Monate und 13 Tage alt: 36 Jahre bis zum 15. März 2026, 6 Monate bis zum 15. September 2026 und 13 weitere Tage." },
      { title: "Schaltjahre und der 29. Februar", body: "Schaltjahre werden automatisch berücksichtigt, jeder Tag zwischen den beiden Daten wird exakt gezählt. Nach deutschem Recht (§ 188 BGB) vollendet ein am 29. Februar Geborener in Nichtschaltjahren ein Lebensjahr mit Ablauf des 28. Februar." },
      { title: "Auch für andere Zeiträume", body: "Da der Rechner die Zeit zwischen zwei beliebigen Daten misst, eignet er sich auch für die Dauer eines Arbeitsverhältnisses, das Alter eines Gebäudes oder das Alter an einem bestimmten Stichtag, zum Beispiel am Tag der Einschulung oder beim Renteneintritt." },
    ],
    faq: [
      { question: "Wie alt bin ich, wenn ich 2000 geboren bin?", answer: "Im Jahr 2026 werden Sie 26. Vor Ihrem Geburtstag in diesem Jahr sind Sie noch 25." },
      { question: "Wie viele Tage bin ich alt?", answer: "Geben Sie Ihr Geburtsdatum ein; der Rechner zeigt die Gesamtzahl der gelebten Tage sowie Wochen und Monate." },
      { question: "Wann bin ich volljährig?", answer: "In Deutschland, Österreich und der Schweiz mit 18 Jahren, also am 18. Geburtstag." },
    ],
    priority: 0.75,
  },
  {
    slug: "mehrwertsteuer-rechner",
    germanPath: "/de/mehrwertsteuer-rechner",
    turkishPath: "/kdv-hesaplama",
    title: "Mehrwertsteuer-Rechner",
    metaTitle: "Mehrwertsteuer-Rechner: Netto und Brutto mit 19 % und 7 %",
    description: "Mehrwertsteuer berechnen: Netto in Brutto und Brutto in Netto mit 19 % oder 7 % Umsatzsteuer oder einem eigenen Satz, inklusive Steuerbetrag.",
    intro: "Wählen Sie, ob Ihr Betrag netto oder brutto ist, und den Steuersatz: 19 %, 7 % oder einen eigenen Satz, zum Beispiel für Österreich oder die Schweiz. Der Rechner zeigt Netto, Mehrwertsteuer und Brutto.",
    component: "vatCalculator",
    iconName: "vatCalculator",
    cardDescription: "Berechnet Netto-, Steuer- und Bruttobeträge mit frei wählbarem Satz.",
    articleSections: [
      { title: "Netto in Brutto", body: "Brutto = Netto × (1 + Steuersatz). Bei 19 %: 100 € × 1,19 = 119 €, davon 19 € Mehrwertsteuer. Bei 7 %: 100 € × 1,07 = 107 €." },
      { title: "Brutto in Netto", body: "Netto = Brutto ÷ (1 + Steuersatz), nicht Brutto minus 19 %. 119 € ÷ 1,19 = 100 € netto. Wer einfach 19 % abzieht, erhält fälschlich 96,39 €. Faustregel: Bei 19 % sind 15,97 % des Bruttopreises Mehrwertsteuer (19/119), bei 7 % sind es 6,54 % (7/107)." },
      { title: "Steuersätze in Deutschland", body: "Der Regelsatz beträgt 19 %. Der ermäßigte Satz von 7 % gilt unter anderem für viele Lebensmittel, Bücher und Zeitungen, den öffentlichen Nahverkehr und kulturelle Veranstaltungen. Einige Leistungen sind steuerfrei, etwa viele ärztliche Leistungen. Im Zweifel hilft das Umsatzsteuergesetz oder eine Steuerberatung." },
      { title: "Österreich und Schweiz", body: "Österreich: 20 % Normalsatz, ermäßigt 10 % und 13 %. Schweiz: 8,1 % Normalsatz, 2,6 % reduzierter Satz und 3,8 % Sondersatz für Beherbergung. Tragen Sie den Satz als eigenen Wert ein." },
    ],
    faq: [
      { question: "Wie rechne ich 19 % Mehrwertsteuer drauf?", answer: "Multiplizieren Sie den Nettobetrag mit 1,19. 250 € netto × 1,19 = 297,50 € brutto." },
      { question: "Wie rechne ich die Mehrwertsteuer aus dem Bruttobetrag heraus?", answer: "Teilen Sie den Bruttobetrag durch 1,19 (bzw. 1,07). Die Differenz ist die Mehrwertsteuer: 59,50 € ÷ 1,19 = 50 € netto, also 9,50 € Mehrwertsteuer." },
      { question: "Ist Umsatzsteuer dasselbe wie Mehrwertsteuer?", answer: "Ja. Umsatzsteuer ist der gesetzliche Begriff, Mehrwertsteuer die umgangssprachliche Bezeichnung für dieselbe Steuer." },
      { question: "Wie viel Prozent vom Brutto sind 19 % Mehrwertsteuer?", answer: "15,97 %. Denn von 119 € Bruttopreis sind 19 € Steuer: 19 ÷ 119 = 0,1597." },
    ],
    priority: 0.75,
  },
  {
    slug: "bmi-rechner",
    germanPath: "/de/bmi-rechner",
    turkishPath: "/bmi-hesaplama",
    title: "BMI-Rechner",
    metaTitle: "BMI-Rechner mit Grundumsatz und Kalorienbedarf",
    description: "BMI berechnen und einordnen (WHO), dazu Grundumsatz nach Mifflin-St Jeor und täglicher Kalorienbedarf nach Aktivitätsniveau.",
    intro: "Geben Sie Größe, Gewicht, Alter, Geschlecht und Aktivitätsniveau ein. Sie erhalten Ihren Body-Mass-Index mit WHO-Einordnung sowie Grundumsatz und ungefähren Tagesbedarf an Kalorien.",
    component: "bmiCalculator",
    iconName: "bmiCalculator",
    cardDescription: "Berechnet BMI, Grundumsatz und täglichen Kalorienbedarf.",
    articleSections: [
      { title: "So wird der BMI berechnet", body: "BMI = Gewicht in kg ÷ (Größe in m)². Beispiel: 75 kg bei 1,80 m ergibt 75 ÷ 3,24 = 23,1." },
      { title: "BMI-Tabelle der WHO", body: "Unter 18,5: Untergewicht. 18,5 bis 24,9: Normalgewicht. 25 bis 29,9: Übergewicht (Präadipositas). Ab 30: Adipositas. Die Einteilung gilt für Erwachsene; für Kinder und Jugendliche werden alters- und geschlechtsabhängige Perzentilen verwendet." },
      { title: "Grundumsatz und Kalorienbedarf", body: "Der Grundumsatz wird mit der Mifflin-St-Jeor-Formel geschätzt: Männer 10 × Gewicht + 6,25 × Größe (cm) − 5 × Alter + 5, Frauen dieselbe Formel mit − 161 statt + 5. Multipliziert mit dem Aktivitätsfaktor (etwa 1,2 für sitzend bis 1,9 für sehr aktiv) ergibt sich der ungefähre Tagesbedarf." },
      { title: "Grenzen des BMI", body: "Der BMI unterscheidet nicht zwischen Muskeln und Fett. Sportler mit viel Muskelmasse können einen hohen BMI haben, ohne übergewichtig zu sein. Taillenumfang und Körperfettanteil ergänzen die Einschätzung; bei gesundheitlichen Fragen hilft die Hausarztpraxis." },
    ],
    faq: [
      { question: "Welcher BMI ist normal?", answer: "Für Erwachsene gilt ein BMI von 18,5 bis 24,9 als Normalgewicht." },
      { question: "Wie berechne ich meinen BMI?", answer: "Teilen Sie Ihr Gewicht in Kilogramm durch das Quadrat Ihrer Größe in Metern: 68 kg ÷ (1,70 m)² = 23,5." },
      { question: "Wie viele Kalorien brauche ich am Tag?", answer: "Das hängt von Grundumsatz und Aktivität ab. Eine 30-jährige Frau mit 65 kg und 1,68 m hat einen Grundumsatz von rund 1.390 kcal; bei leichter Aktivität (Faktor 1,375) sind es etwa 1.910 kcal pro Tag." },
    ],
    priority: 0.75,
  },
  {
    slug: "schwangerschaftswochen-rechner",
    germanPath: "/de/schwangerschaftswochen-rechner",
    turkishPath: "/gebelik-haftasi-hesaplama",
    title: "Schwangerschaftswochen-Rechner",
    metaTitle: "SSW-Rechner: In welcher Schwangerschaftswoche bin ich?",
    description: "In welcher SSW bin ich? Aus dem ersten Tag der letzten Periode berechnet der Rechner Schwangerschaftswoche, Trimester und voraussichtlichen Geburtstermin.",
    intro: "Geben Sie den ersten Tag Ihrer letzten Menstruation ein. Der Rechner zeigt die aktuelle Schwangerschaftswoche, das Trimester und den errechneten Geburtstermin (ET).",
    component: "pregnancyCalculator",
    iconName: "pregnancyCalculator",
    cardDescription: "Zeigt Schwangerschaftswoche, Trimester und voraussichtlichen Geburtstermin.",
    articleSections: [
      { title: "So werden die Schwangerschaftswochen gezählt", body: "Ärztinnen und Hebammen zählen ab dem ersten Tag der letzten Periode, nicht ab der Befruchtung. Eine Schwangerschaft dauert im Mittel 40 Wochen (280 Tage). Im Mutterpass steht die Schwangerschaftswoche oft als vollendete Wochen plus Tage, zum Beispiel 12+3: zwölf Wochen und drei Tage, also die 13. SSW." },
      { title: "Geburtstermin nach der Naegele-Regel", body: "Errechneter Termin = erster Tag der letzten Periode + 7 Tage − 3 Monate + 1 Jahr, was 280 Tagen entspricht. Beispiel: Letzte Periode am 1. Januar 2026, errechneter Termin am 8. Oktober 2026. Bei längeren oder kürzeren Zyklen verschiebt sich der Termin entsprechend (erweiterte Naegele-Regel)." },
      { title: "Trimester", body: "Erstes Trimester: 1. bis 13. SSW. Zweites Trimester: 14. bis 27. SSW. Drittes Trimester: ab der 28. SSW bis zur Geburt." },
      { title: "Mutterschutz", body: "Der Mutterschutz beginnt in Deutschland sechs Wochen vor dem errechneten Termin und endet in der Regel acht Wochen nach der Geburt (bei Früh- und Mehrlingsgeburten zwölf Wochen). Nur wenige Kinder kommen genau am errechneten Termin zur Welt; eine frühe Ultraschalluntersuchung kann den Termin korrigieren." },
    ],
    faq: [
      { question: "In welcher SSW bin ich?", answer: "Zählen Sie die Wochen seit dem ersten Tag der letzten Periode. Liegt dieser 10 Wochen und 3 Tage zurück, sind Sie bei 10+3, also in der 11. SSW." },
      { question: "Was bedeutet 12+3?", answer: "Zwölf vollendete Schwangerschaftswochen und drei Tage. Sie befinden sich damit in der 13. Schwangerschaftswoche." },
      { question: "Wann beginnt der Mutterschutz?", answer: "Sechs Wochen vor dem errechneten Geburtstermin. Den genauen Zeitraum mit Verlängerung bei Früh- und Mehrlingsgeburten, Mutterschaftsgeld und Elternzeit-Frist zeigt der Mutterschutzrechner." },
      { question: "Wie genau ist der errechnete Termin?", answer: "Er ist eine Schätzung. Die meisten Kinder kommen in den zwei Wochen vor oder nach dem Termin zur Welt; ein früher Ultraschall ist die genaueste Datierung." },
    ],
    priority: 0.75,
  },
  {
    slug: "laengenvergleich",
    germanPath: "/de/laengenvergleich",
    turkishPath: "/uzunluk-karsilastirma",
    title: "Längenvergleich",
    metaTitle: "Längenvergleich: Längen anschaulich vergleichen",
    description: "Vergleichen Sie eine Länge mit bekannten Größen wie Körpergröße, Giraffe, Fußballfeld oder Eiffelturm.",
    intro: "Geben Sie eine Länge ein und sehen Sie, wie oft sie in vertraute Vergleichsgrößen passt. So werden Zahlen wie 25 m oder 330 m greifbar.",
    component: "lengthComparison",
    iconName: "length",
    cardDescription: "Setzt Längenwerte in Bezug zu bekannten Objekten und Bauwerken.",
    articleSections: [
      { title: "Warum Vergleiche helfen", body: "Viele Menschen können sich 25 oder 330 Meter nur schwer vorstellen. Ein Vergleich mit einem Fußballfeld (rund 105 m) oder dem Eiffelturm (330 m) macht die Größenordnung sofort verständlich." },
      { title: "Wie die Ergebnisse sortiert sind", body: "Zuerst erscheint die Vergleichsgröße, deren Maß Ihrem Wert am nächsten kommt, danach die übrigen Vergleiche." },
      { title: "Genauigkeit", body: "Die Vergleichswerte sind typische Durchschnittswerte und dienen der Anschauung. Für exakte Umrechnungen zwischen Einheiten nutzen Sie den Längenumrechner." },
    ],
    faq: [
      { question: "Wie lang ist ein Fußballfeld?", answer: "Ein Spielfeld für internationale Spiele ist 100 bis 110 m lang; der Standard vieler Stadien liegt bei 105 m." },
      { question: "Wie hoch ist der Eiffelturm?", answer: "Rund 330 m einschließlich Antenne." },
    ],
    priority: 0.6,
  },
  {
    slug: "gewichtsvergleich",
    germanPath: "/de/gewichtsvergleich",
    turkishPath: "/agirlik-karsilastirma",
    title: "Gewichtsvergleich",
    metaTitle: "Gewichtsvergleich: Gewichte anschaulich vergleichen",
    description: "Vergleichen Sie ein Gewicht mit bekannten Größen wie einer Katze, einem Menschen, einem Auto oder einem Blauwal.",
    intro: "Geben Sie ein Gewicht ein und sehen Sie anschauliche Vergleiche mit Alltagsgegenständen und großen Objekten.",
    component: "weightComparison",
    iconName: "mass",
    cardDescription: "Vergleicht Gewichtsangaben mit alltagsnahen und grossen Referenzobjekten.",
    articleSections: [
      { title: "Wann ist der Vergleich nützlich?", body: "Bei Lasten, Zuladungen oder großen Zahlen hilft ein Vergleich, die Größenordnung schnell einzuschätzen: 1,5 Tonnen entsprechen etwa einem Kleinwagen." },
      { title: "Sind die Werte exakt?", body: "Die Vergleichswerte sind Durchschnittswerte zur Veranschaulichung. Für genaue Umrechnungen zwischen kg, Pfund oder Tonnen nutzen Sie die Gewichtsumrechner." },
    ],
    faq: [
      { question: "Wie schwer ist ein Auto?", answer: "Ein Kleinwagen wiegt etwa 1 bis 1,2 Tonnen, ein Mittelklassewagen 1,4 bis 1,7 Tonnen." },
      { question: "Wie schwer ist ein Blauwal?", answer: "Ausgewachsene Blauwale wiegen meist zwischen 100 und 150 Tonnen." },
    ],
    priority: 0.6,
  },
  {
    slug: "lauftempo-rechner",
    germanPath: "/de/lauftempo-rechner",
    turkishPath: "/kosu-pace-hesaplama",
    title: "Lauftempo-Rechner",
    metaTitle: "Pace-Rechner: Lauftempo in min/km und Zielzeit",
    description: "Pace berechnen: Lauftempo in min/km aus Strecke und Zeit, Zielzeit aus Pace oder Strecke aus Zeit, mit Zeiten für 5 km, 10 km, Halbmarathon und Marathon.",
    intro: "Geben Sie zwei der drei Werte Strecke, Zeit und Pace ein, um den dritten zu berechnen. Dazu sehen Sie die Geschwindigkeit in km/h und die Endzeiten für 5 km, 10 km, Halbmarathon und Marathon.",
    component: "paceCalculator",
    iconName: "paceCalculator",
    cardDescription: "Berechnet Lauftempo, Distanz und Zielzeiten für Standardrennen.",
    articleSections: [
      { title: "So wird die Pace berechnet", body: "Pace = Zeit ÷ Strecke. 10 km in 50 Minuten ergeben 5:00 min/km. Umgekehrt ist die Zielzeit Pace × Strecke und die Geschwindigkeit in km/h = 60 ÷ Pace in Minuten: 5:00 min/km entsprechen 12 km/h, 6:00 min/km 10 km/h." },
      { title: "Zielzeiten nach Pace", body: "Bei 5:00 min/km: 5 km in 25:00, 10 km in 50:00, Halbmarathon in 1:45:29, Marathon in 3:30:59. Bei 6:00 min/km: 5 km in 30:00, 10 km in 1:00:00, Halbmarathon in 2:06:35, Marathon in 4:13:10. Für einen Marathon unter 4 Stunden brauchen Sie eine Pace von höchstens 5:41 min/km." },
      { title: "Die Prognosen richtig lesen", body: "Die Zeiten setzen voraus, dass Sie die Pace über die ganze Strecke halten. Auf längeren Distanzen werden die meisten Läufer langsamer; eine Pace, die für 5 km passt, ist für einen Marathon meist zu schnell." },
    ],
    faq: [
      { question: "Was ist eine gute Pace für Anfänger?", answer: "Viele Einsteiger laufen locker zwischen 6:30 und 8:00 min/km. Eine gute Faustregel: Sie sollten sich dabei noch unterhalten können." },
      { question: "Welche Pace brauche ich für einen Marathon unter 4 Stunden?", answer: "5:41 min/km über die gesamten 42,195 km." },
      { question: "Wie rechne ich km/h in Pace um?", answer: "Teilen Sie 60 durch die Geschwindigkeit: 10 km/h ergeben 6:00 min/km, 12 km/h 5:00 min/km." },
    ],
    priority: 0.75,
  },
  {
    slug: "klima-btu-rechner",
    germanPath: "/de/klima-btu-rechner",
    turkishPath: "/klima-btu-hesaplama",
    title: "Klima-BTU-Rechner",
    metaTitle: "Klimaanlage berechnen: Welche Leistung in kW und BTU?",
    description: "Welche Klimaanlage passt zum Raum? Aus Fläche, Sonneneinstrahlung, Personen und Dachgeschoss die nötige Kühlleistung in BTU und kW abschätzen.",
    intro: "Geben Sie die Raumfläche, die Zahl der Personen und die Lage des Raums ein. Der Rechner schätzt die nötige Kühlleistung in BTU/h; darunter finden Sie die Umrechnung in Kilowatt.",
    component: "acCapacityCalculator",
    iconName: "acCapacityCalculator",
    cardDescription: "Schätzt die passende Klimaleistung für einen Raum in BTU.",
    articleSections: [
      { title: "BTU und Kilowatt", body: "Klimageräte werden oft in BTU/h angegeben, in Deutschland zusätzlich in Kilowatt. 1 kW Kühlleistung entspricht rund 3.412 BTU/h. Ein 9.000-BTU-Gerät hat also etwa 2,6 kW, ein 12.000-BTU-Gerät etwa 3,5 kW." },
      { title: "Faustregel für die Kühlleistung", body: "Für normal gedämmte Räume in Deutschland rechnet man grob mit 60 bis 100 Watt Kühlleistung pro Quadratmeter. Ein 25 m² großes Zimmer braucht damit etwa 1,5 bis 2,5 kW, also 5.000 bis 9.000 BTU/h. Pro zusätzlicher Person kommen rund 100 bis 150 W hinzu." },
      { title: "Sonne und Dachgeschoss", body: "Räume mit großen Süd- oder Westfenstern und Dachgeschosswohnungen heizen sich stärker auf. Der Rechner schlägt dann einen Zuschlag auf; unter einem schlecht gedämmten Dach kann der Bedarf um 20 % und mehr steigen." },
      { title: "Monoblock oder Split-Gerät?", body: "Mobile Monoblock-Geräte sind günstig, aber weniger effizient, weil warme Luft über den Abluftschlauch durch ein Fenster geführt wird. Split-Klimaanlagen kühlen leiser und effizienter, müssen aber von einem Fachbetrieb installiert werden." },
    ],
    faq: [
      { question: "Wie viel kW Klimaanlage für 20 m²?", answer: "Etwa 1,2 bis 2 kW (rund 4.000 bis 7.000 BTU/h), bei viel Sonne oder im Dachgeschoss eher mehr." },
      { question: "Wie viele BTU sind 1 kW?", answer: "1 kW entspricht etwa 3.412 BTU pro Stunde." },
      { question: "Was passiert bei einem zu kleinen Gerät?", answer: "Es läuft ständig auf voller Leistung und erreicht an heißen Tagen die gewünschte Temperatur nicht. Ein deutlich zu großes Gerät kühlt dagegen zu schnell und entfeuchtet schlechter." },
    ],
    priority: 0.75,
  },
  {
    slug: "stromverbrauch-rechner",
    germanPath: "/de/stromverbrauch-rechner",
    turkishPath: "/elektrik-tuketimi-hesaplama",
    title: "Stromverbrauchsrechner",
    metaTitle: "Stromverbrauch berechnen: kWh und Kosten pro Gerät",
    description: "Stromverbrauch und Stromkosten eines Geräts berechnen: Leistung in Watt, Nutzungsdauer und Strompreis in €/kWh eingeben und Verbrauch pro Tag, Monat und Jahr sehen.",
    intro: "Geben Sie die Leistung des Geräts in Watt, die tägliche Nutzungsdauer, die Nutzungstage pro Monat und optional Ihren Strompreis ein. Der Rechner zeigt Verbrauch und Kosten pro Tag, Monat und Jahr.",
    component: "electricityConsumptionCalculator",
    iconName: "electricityConsumptionCalculator",
    cardDescription: "Zeigt Verbrauch und Kosten für einzelne elektrische Geräte.",
    articleSections: [
      { title: "Formel", body: "Verbrauch in kWh = Leistung in Watt × Stunden ÷ 1.000. Kosten = kWh × Arbeitspreis. Ein Gerät mit 1.800 W, das eine Stunde läuft, verbraucht 1,8 kWh; bei 0,35 €/kWh kostet das 63 Cent." },
      { title: "Beispiel: Heizlüfter", body: "Ein Heizlüfter mit 2.000 W, der täglich 3 Stunden an 30 Tagen läuft, verbraucht 2 × 3 × 30 = 180 kWh im Monat. Bei 0,35 €/kWh sind das 63 € im Monat." },
      { title: "Welchen Strompreis eintragen?", body: "Tragen Sie den Arbeitspreis pro kWh aus Ihrer Stromrechnung ein, in Euro (35 Cent = 0,35). Der monatliche Grundpreis fällt unabhängig vom Verbrauch an und ist hier nicht enthalten. Neukundentarife lagen zuletzt oft um 0,27 €/kWh, viele Bestandskunden zahlen mehr." },
      { title: "Typische Leistungen", body: "LED-Lampe 5 bis 10 W, Laptop 30 bis 70 W, Fernseher 50 bis 150 W, Kühlschrank im Mittel 15 bis 40 W (Jahresverbrauch meist 100 bis 250 kWh), Wasserkocher 2.000 bis 3.000 W, Heizlüfter 2.000 W. Geräte mit Thermostat laufen nicht dauerhaft mit voller Leistung; der tatsächliche Verbrauch ist dann niedriger." },
    ],
    faq: [
      { question: "Wie rechne ich Watt in kWh um?", answer: "Watt × Betriebsstunden ÷ 1.000. Ein 100-W-Gerät, das 10 Stunden läuft, verbraucht 1 kWh." },
      { question: "Was kostet 1 kWh Strom?", answer: "Das steht auf Ihrer Stromrechnung als Arbeitspreis. In Deutschland liegt er je nach Tarif meist zwischen etwa 0,25 und 0,40 €." },
      { question: "Wie viel Strom verbraucht ein Standby-Gerät im Jahr?", answer: "1 W Dauer-Standby ergibt 8,76 kWh pro Jahr, bei 0,35 €/kWh also rund 3 € pro Watt und Jahr." },
    ],
    priority: 0.75,
  },
  {
    slug: "schlafrechner",
    germanPath: "/de/schlafrechner",
    turkishPath: "/uyku-hesaplama",
    title: "Schlafrechner",
    metaTitle: "Schlafrechner: Wann sollte ich schlafen gehen?",
    description: "Wann sollte ich ins Bett gehen? Der Schlafrechner berechnet Einschlaf- und Weckzeiten nach 90-Minuten-Schlafzyklen, inklusive 15 Minuten Einschlafzeit.",
    intro: "Wählen Sie, ob Sie Ihre Weckzeit oder Ihre Schlafenszeit kennen. Der Rechner rechnet in 90-Minuten-Zyklen vor oder zurück, berücksichtigt rund 15 Minuten zum Einschlafen und hebt die Option mit der empfohlenen Schlafdauer hervor.",
    component: "sleepCalculator",
    iconName: "sleepCalculator",
    cardDescription: "Empfiehlt Schlaf- und Aufstehzeiten auf Basis von Schlafzyklen.",
    articleSections: [
      { title: "So funktioniert der Schlafrechner", body: "Eine Nacht besteht aus mehreren Schlafzyklen aus Leicht-, Tief- und REM-Schlaf, die im Mittel etwa 90 Minuten dauern. Wer am Ende eines Zyklus aufwacht, fühlt sich meist frischer als beim Wecken aus dem Tiefschlaf. Zubettgehzeit = Weckzeit − 15 Minuten Einschlafzeit − Anzahl der Zyklen × 90 Minuten." },
      { title: "Beispiel: Wecker um 6:30 Uhr", body: "Für 5 Zyklen (7,5 Stunden Schlaf): 6:30 − 7:30 − 0:15 = 22:45 Uhr. Für 6 Zyklen (9 Stunden): 21:15 Uhr. Für 4 Zyklen (6 Stunden): 0:15 Uhr." },
      { title: "Wie viel Schlaf ist nötig?", body: "Erwachsene brauchen in der Regel 7 bis 9 Stunden Schlaf, Jugendliche 8 bis 10 Stunden und Schulkinder 9 bis 12 Stunden. Die empfohlene Option im Rechner liegt diesen Werten für Erwachsene am nächsten." },
      { title: "Grenzen der Methode", body: "Die Dauer eines Zyklus schwankt von Mensch zu Mensch und von Nacht zu Nacht. Verstehen Sie die Zeiten als Ausgangspunkt. Anhaltende Einschlafprobleme, lautes Schnarchen oder starke Tagesmüdigkeit sollten ärztlich abgeklärt werden." },
    ],
    faq: [
      { question: "Wann muss ich schlafen gehen, wenn ich um 6 Uhr aufstehe?", answer: "Um 20:45 Uhr (6 Zyklen, 9 Stunden) oder um 22:15 Uhr (5 Zyklen, 7,5 Stunden), jeweils inklusive 15 Minuten Einschlafzeit." },
      { question: "Wie lange dauert ein Schlafzyklus?", answer: "Im Durchschnitt etwa 90 Minuten, individuell zwischen rund 80 und 120 Minuten." },
      { question: "Reichen 6 Stunden Schlaf?", answer: "Für die meisten Erwachsenen nicht. Empfohlen werden mindestens 7 Stunden." },
    ],
    priority: 0.75,
  },
  {
    slug: "kraftstoffverbrauchsrechner",
    germanPath: "/de/kraftstoffverbrauchsrechner",
    turkishPath: "/yakit-tuketimi-hesaplama",
    title: "Kraftstoffverbrauchsrechner",
    metaTitle: "Spritverbrauch berechnen: l/100 km und Fahrtkosten",
    description: "Spritverbrauch berechnen und umrechnen: l/100 km, km/l und mpg, dazu die Spritkosten einer Fahrt aus Strecke, Verbrauch und Literpreis.",
    intro: "Geben Sie Ihren Verbrauch in l/100 km oder km/l ein; der Rechner rechnet in die anderen Einheiten um. Darunter berechnen Sie die Kraftstoffmenge und Kosten für eine Fahrt.",
    component: "fuelConsumptionCalculator",
    iconName: "fuelConsumptionCalculator",
    cardDescription: "Rechnet zwischen km/l, l/100km und mpg um und schätzt die Fahrtkosten.",
    articleSections: [
      { title: "Verbrauch selbst ermitteln", body: "Tanken Sie voll, notieren Sie den Kilometerstand und tanken Sie beim nächsten Mal wieder voll. Verbrauch in l/100 km = getankte Liter ÷ gefahrene Kilometer × 100. Beispiel: 45 Liter für 600 km ergeben 7,5 l/100 km." },
      { title: "Fahrtkosten berechnen", body: "Kosten = Strecke ÷ 100 × Verbrauch × Literpreis. Für 500 km bei 6,5 l/100 km und 1,75 €/l: 5 × 6,5 × 1,75 = 56,88 €. Für Hin- und Rückfahrt verdoppeln Sie die Strecke." },
      { title: "Umrechnung der Einheiten", body: "km/l = 100 ÷ (l/100 km); 5 l/100 km entsprechen 20 km/l. US-Meilen pro Gallone = 235,215 ÷ (l/100 km), britische mpg = 282,481 ÷ (l/100 km)." },
      { title: "Was den Verbrauch beeinflusst", body: "Hohe Geschwindigkeit auf der Autobahn, Kurzstrecken mit kaltem Motor, Dachboxen, niedriger Reifendruck und Klimaanlage erhöhen den Verbrauch. Die Herstellerangabe nach WLTP liegt im Alltag oft darunter." },
    ],
    faq: [
      { question: "Wie berechne ich den Verbrauch auf 100 km?", answer: "Getankte Liter durch gefahrene Kilometer teilen und mit 100 multiplizieren: 38 l für 520 km ergeben 7,3 l/100 km." },
      { question: "Was kostet eine Fahrt von 300 km?", answer: "Bei 7 l/100 km und 1,75 €/l: 3 × 7 × 1,75 = 36,75 €." },
      { question: "Wie viele km/l sind 6 l/100 km?", answer: "16,7 km pro Liter (100 ÷ 6)." },
    ],
    priority: 0.7,
  },
  {
    slug: "laminatrechner",
    germanPath: "/de/laminatrechner",
    turkishPath: "/parke-hesaplama",
    title: "Laminatrechner",
    metaTitle: "Laminatrechner: Wie viele Pakete Laminat brauche ich?",
    description: "Wie viele Pakete Laminat oder Parkett brauchen Sie? Fläche, m² pro Paket und Verschnitt eingeben und die Paketanzahl berechnen.",
    intro: "Geben Sie die zu verlegende Fläche, die Fläche pro Paket (steht auf der Verpackung) und den Verschnitt ein. Der Rechner zeigt die Gesamtfläche mit Verschnitt und die nötige Paketanzahl.",
    component: "laminateCalculator",
    iconName: "laminateCalculator",
    cardDescription: "Berechnet die benötigten Laminatpakete inklusive Verschnitt.",
    articleSections: [
      { title: "So wird gerechnet", body: "Pakete = Fläche × (1 + Verschnitt) ÷ m² pro Paket, aufgerundet. Beispiel: 20 m² mit 8 % Verschnitt ergeben 21,6 m²; bei 2,13 m² pro Paket sind das 10,1, also 11 Pakete." },
      { title: "Wie viel Verschnitt?", body: "Bei gerader Verlegung in rechteckigen Räumen reichen meist 5 bis 8 %. Diagonale Verlegung, Fischgrät oder viele Ecken und Türzargen brauchen 10 bis 15 %. Das Reststück einer Reihe kann oft als Anfang der nächsten Reihe verwendet werden." },
      { title: "Raumfläche messen", body: "Messen Sie Länge und Breite an der Wand und multiplizieren Sie beides. L-förmige Räume teilen Sie in Rechtecke auf und addieren die Flächen. Denken Sie auch an Trittschalldämmung und Sockelleisten (Umfang des Raums minus Türbreiten)." },
    ],
    faq: [
      { question: "Wie viele Pakete Laminat für 15 m²?", answer: "Mit 8 % Verschnitt 16,2 m²; bei 2,22 m² pro Paket sind das 7,3, also 8 Pakete." },
      { question: "Wie viel Verschnitt bei Laminat?", answer: "Bei gerader Verlegung meist 5 bis 8 %, bei diagonaler Verlegung 10 bis 15 %." },
      { question: "Kann ich übrige Pakete zurückgeben?", answer: "Viele Baumärkte nehmen originalverpackte Pakete zurück; fragen Sie vor dem Kauf nach. Ein Paket als Reserve ist für spätere Reparaturen sinnvoll." },
    ],
    priority: 0.7,
  },
  {
    slug: "tapetenrechner",
    germanPath: "/de/tapetenrechner",
    turkishPath: "/duvar-kagidi-hesaplama",
    title: "Tapetenrechner",
    metaTitle: "Tapetenrechner: Wie viele Rollen Tapete brauche ich?",
    description: "Wie viele Tapetenrollen brauchen Sie? Wandbreiten, Raumhöhe, Rollenmaß und Verschnitt eingeben und die Rollenzahl berechnen.",
    intro: "Geben Sie die Breite jeder Wand, die Raumhöhe, Breite und Länge der Rolle sowie den Verschnitt ein. Der Rechner zeigt die Wandfläche, die Fläche pro Rolle und die benötigte Rollenzahl.",
    component: "wallpaperCalculator",
    iconName: "wallpaperCalculator",
    cardDescription: "Berechnet die benötigten Tapetenrollen für einen Raum, inklusive Verschnitt.",
    articleSections: [
      { title: "Standardrolle in Deutschland", body: "Die übliche Tapetenrolle ist 10,05 m lang und 53 cm breit, also rund 5,3 m². Vliestapeten gibt es auch in 70 cm oder 1,06 m Breite; die Maße stehen auf dem Etikett." },
      { title: "So wird gerechnet", body: "Wandfläche = Summe der Wandbreiten × Raumhöhe. Rollen = Wandfläche × (1 + Verschnitt) ÷ Fläche pro Rolle, aufgerundet. Beispiel: 4 Wände mit zusammen 16 m bei 2,5 m Höhe ergeben 40 m²; mit 15 % Verschnitt 46 m², geteilt durch 5,3 m² sind das 8,7, also 9 Rollen." },
      { title: "Rapport und Verschnitt", body: "Bei gemusterten Tapeten muss das Muster an der Nachbarbahn anschließen (Rapport). Je größer der Rapport, desto mehr Verschnitt: bei Uni-Tapeten reichen 10 %, bei großem Rapport können 20 bis 25 % nötig sein. Fenster und Türen werden meist nicht abgezogen, weil die Reste selten verwendbar sind." },
      { title: "Gleiche Anfertigungsnummer", body: "Kaufen Sie alle Rollen mit derselben Chargen- bzw. Anfertigungsnummer, sonst können Farbtöne leicht abweichen." },
    ],
    faq: [
      { question: "Wie viele Tapetenrollen für 20 m² Wand?", answer: "Bei der Standardrolle (5,3 m²) und 10 % Verschnitt: 22 ÷ 5,3 = 4,2, also 5 Rollen." },
      { question: "Wie viele Bahnen bekomme ich aus einer Rolle?", answer: "Bei 2,5 m Raumhöhe plus 10 cm Zugabe sind es aus einer 10,05-m-Rolle 3 volle Bahnen." },
      { question: "Muss ich Fenster und Türen abziehen?", answer: "Kleine Fenster und Türen werden meist nicht abgezogen. Bei großen Fensterfronten können Sie die Fläche abziehen." },
    ],
    priority: 0.7,
  },
  {
    slug: "umzugskartons-rechner",
    germanPath: "/de/umzugskartons-rechner",
    turkishPath: "/tasinma-kutusu-hesaplama",
    title: "Umzugskartons-Rechner",
    metaTitle: "Umzugskartons-Rechner: Wie viele Kartons brauche ich?",
    description: "Wie viele Umzugskartons brauchen Sie? Nach Wohnungsgröße die Zahl kleiner und großer Kartons sowie das ungefähre Transportervolumen schätzen.",
    intro: "Wählen Sie die Größe Ihrer Wohnung. Der Rechner schätzt, wie viele kleine und große Umzugskartons Sie brauchen und wie groß der Transporter ungefähr sein sollte.",
    component: "movingBoxCalculator",
    iconName: "movingBoxCalculator",
    cardDescription: "Schätzt Umzugskartons und Transportervolumen anhand der Wohnungsgröße.",
    articleSections: [
      { title: "Faustregeln für Umzugskartons", body: "Als grober Anhaltspunkt gelten 20 bis 30 Kartons pro Zimmer. Bücher, Geschirr und Vorräte gehören in kleine Kartons (Bücherkartons), damit sie tragbar bleiben; leichte Dinge wie Bettwäsche und Kleidung in große Kartons." },
      { title: "Transporter richtig wählen", body: "Eine 1-Zimmer-Wohnung passt meist in einen Transporter mit 8 bis 12 m³ Ladevolumen, eine 3-Zimmer-Wohnung braucht eher 20 m³ und mehr. Große Möbel wie Schränke und Sofas bestimmen den Platzbedarf stärker als die Kartons." },
      { title: "Tipps zum Packen", body: "Schwere Kartons nicht über rund 20 kg befüllen. Beschriften Sie jeden Karton mit Raum und Inhalt, und stellen Sie einen Karton mit Dingen für die erste Nacht zusammen. Die Zahlen des Rechners sind Durchschnittswerte; wer viel besitzt oder sammelt, braucht mehr." },
    ],
    faq: [
      { question: "Wie viele Umzugskartons für eine 2-Zimmer-Wohnung?", answer: "Meist 40 bis 60 Kartons, je nach Hausstand." },
      { question: "Wie schwer darf ein Umzugskarton sein?", answer: "Aus Rücksicht auf Rücken und Karton sollte er nicht mehr als etwa 20 kg wiegen." },
    ],
    priority: 0.65,
  },
  {
    slug: "erdgaskosten-rechner",
    germanPath: "/de/erdgaskosten-rechner",
    turkishPath: "/dogalgaz-tuketimi-hesaplama",
    title: "Erdgaskosten-Rechner",
    metaTitle: "Gaskosten berechnen: m³ in kWh und Euro",
    description: "Gaskosten berechnen: Verbrauch in m³ und Preis eingeben, Gesamtkosten und ungefähre Energiemenge in kWh sehen, mit Formel für Zustandszahl und Brennwert.",
    intro: "Geben Sie den Gasverbrauch in Kubikmetern und den Preis pro m³ ein. Der Rechner zeigt die Gesamtkosten und eine ungefähre Umrechnung in Kilowattstunden.",
    component: "naturalGasCalculator",
    iconName: "naturalGasCalculator",
    cardDescription: "Berechnet Erdgaskosten und das ungefähre kWh-Äquivalent.",
    articleSections: [
      { title: "Von m³ zu kWh", body: "Der Gaszähler misst Kubikmeter, abgerechnet wird aber in Kilowattstunden. kWh = m³ × Zustandszahl × Brennwert. Beide Werte stehen auf Ihrer Gasrechnung; typisch sind eine Zustandszahl um 0,95 und ein Brennwert zwischen 10 und 11,5 kWh/m³. Beispiel: 1.000 m³ × 0,95 × 11,2 = 10.640 kWh." },
      { title: "Preis pro kWh in Preis pro m³ umrechnen", body: "Da Tarife meist in Cent pro kWh angegeben sind, multiplizieren Sie den kWh-Preis mit Zustandszahl und Brennwert: 0,11 €/kWh × 0,95 × 11,2 ≈ 1,17 € pro m³. Diesen Wert können Sie in den Rechner eintragen." },
      { title: "Typischer Verbrauch", body: "Ein Einfamilienhaus mit Gasheizung verbraucht oft 15.000 bis 25.000 kWh im Jahr, eine Wohnung mit 70 m² etwa 8.000 bis 12.000 kWh. Der Grundpreis pro Monat kommt zu den verbrauchsabhängigen Kosten hinzu." },
    ],
    faq: [
      { question: "Wie rechne ich Kubikmeter Gas in kWh um?", answer: "Kubikmeter × Zustandszahl × Brennwert, zum Beispiel 100 m³ × 0,95 × 11 = 1.045 kWh." },
      { question: "Wo finde ich Zustandszahl und Brennwert?", answer: "Auf Ihrer jährlichen Gasabrechnung. Beide Werte schwanken leicht je nach Region und Abrechnungszeitraum." },
      { question: "Wie viele kWh hat 1 m³ Erdgas?", answer: "Etwa 10 bis 11 kWh, je nach Gasqualität und Zustandszahl." },
    ],
    priority: 0.65,
  },
  {
    slug: "e-auto-laderechner",
    germanPath: "/de/e-auto-laderechner",
    turkishPath: "/elektrikli-arac-sarj-hesaplama",
    title: "E-Auto-Laderechner",
    metaTitle: "E-Auto Ladezeit berechnen: Wallbox, Reichweite und Kosten",
    description: "Ladezeit, Reichweite und Ladekosten für Elektroautos berechnen: Akkugröße, Ladestand, Ladeleistung (Wallbox, Schuko, Schnelllader) und Strompreis eingeben.",
    intro: "Berechnen Sie, wie lange das Laden dauert oder wie weit Sie mit einer Ladung kommen. Optional vergleichen Sie die Kosten pro 100 km mit einem Benziner.",
    component: "evChargingCalculator",
    iconName: "evChargingCalculator",
    cardDescription: "Berechnet Ladezeit oder geschätzte Reichweite eines Elektroautos.",
    articleSections: [
      { title: "So wird die Ladezeit berechnet", body: "Benötigte Energie = Akkukapazität × (Zielladestand − aktueller Ladestand). Ladezeit = Energie ÷ (Ladeleistung × Wirkungsgrad). Beispiel: 60-kWh-Akku von 20 auf 80 % = 36 kWh; an einer 11-kW-Wallbox mit 90 % Wirkungsgrad dauert das 36 ÷ 9,9 = 3,6 Stunden, also etwa 3 Stunden 38 Minuten." },
      { title: "Typische Ladeleistungen", body: "Haushaltssteckdose (Schuko): 2,3 kW, geeignet für gelegentliches Laden über Nacht. Wallbox: 11 kW (in Deutschland meldepflichtig beim Netzbetreiber, 22 kW genehmigungspflichtig). DC-Schnelllader: 50 bis über 300 kW, wobei die Ladeleistung oberhalb von etwa 80 % Ladestand stark abnimmt." },
      { title: "Ladekosten", body: "Kosten pro 100 km = Verbrauch in kWh/100 km × Strompreis. Bei 17 kWh/100 km und 0,35 €/kWh zu Hause sind das 5,95 €. An öffentlichen Schnellladern liegen die Preise oft bei 0,50 bis 0,80 €/kWh." },
      { title: "Reichweite schätzen", body: "Reichweite = nutzbare Energie ÷ Verbrauch × 100. Im Winter, bei Autobahnfahrt und mit Heizung steigt der Verbrauch deutlich, die Reichweite sinkt entsprechend." },
    ],
    faq: [
      { question: "Wie lange lädt ein E-Auto an der Wallbox?", answer: "Bei 11 kW etwa 3,5 bis 4 Stunden für 20 bis 80 % eines 60-kWh-Akkus; ein vollständiges Laden von fast leer dauert rund 6 bis 7 Stunden." },
      { question: "Wie lange dauert das Laden an der Haushaltssteckdose?", answer: "Mit 2,3 kW rund 17 Stunden für 36 kWh (etwa 20 auf 80 % bei 60 kWh)." },
      { question: "Was kostet eine Ladung zu Hause?", answer: "36 kWh × 0,35 €/kWh = 12,60 €, zuzüglich rund 10 % Ladeverluste." },
    ],
    priority: 0.65,
  },
];

export function findGermanStandaloneToolBySlug(slug: string) {
  return germanStandaloneTools.find((tool) => tool.slug === slug);
}

export function findGermanStandaloneToolByTurkishPath(turkishPath: string) {
  return germanStandaloneTools.find((tool) => tool.turkishPath === turkishPath);
}
