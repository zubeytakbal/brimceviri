// Deutsche Mathe-Rechner: Seiteninhalte (Schulbegriffe, Beispiele aus dem deutschen Alltag).
import { buildLanguageAlternates } from "./routing";

export type GermanMathKey = "bruch" | "ggtKgv" | "primfaktor" | "wurzel" | "quadratisch" | "roemisch" | "mittelwert" | "binomial" | "division" | "pythagoras" | "area" | "volumen" | "lgs";

export type GermanMathPage = {
  key: GermanMathKey;
  path: string;
  /** Türkische Entsprechung für hreflang. */
  trPath?: string;
  title: string;
  metaTitle: string;
  shortTitle: string;
  description: string;
  intro: string;
  sections: Array<{ id: string; title: string; paragraphs?: string[]; list?: string[]; table?: { head: string[]; rows: string[][] } }>;
  faq: Array<{ question: string; answer: string }>;
};

const TR = "/bilim-hesaplayicilari/matematik";

const squares = Array.from({ length: 20 }, (_, i) => i + 1);
const primesTo100 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];

export const germanMathPages: GermanMathPage[] = [
  {
    key: "bruch",
    path: "/de/bruchrechner",
    trPath: `${TR}/kesir-hesaplama`,
    title: "Bruchrechner",
    metaTitle: "Bruchrechner mit Rechenweg: Brüche addieren und kürzen",
    shortTitle: "Bruchrechner",
    description: "Brüche addieren, subtrahieren, multiplizieren und dividieren – mit Hauptnenner, Kürzen, gemischter Zahl und vollständigem Rechenweg.",
    intro: "Zwei Brüche eingeben, Rechenart wählen – der Rechner zeigt das gekürzte Ergebnis, die gemischte Zahl, die Dezimalzahl und jeden Rechenschritt.",
    sections: [
      {
        id: "addieren",
        title: "Brüche addieren und subtrahieren",
        paragraphs: [
          "Brüche lassen sich nur addieren, wenn sie denselben Nenner haben. Dazu wird der Hauptnenner gesucht – das kleinste gemeinsame Vielfache (kgV) der Nenner – und jeder Bruch entsprechend erweitert. Danach werden nur die Zähler addiert.",
          "Beispiel: 1/4 + 1/6. Hauptnenner ist kgV(4, 6) = 12. 1/4 = 3/12 und 1/6 = 2/12, also 3/12 + 2/12 = 5/12.",
        ],
      },
      {
        id: "multiplizieren",
        title: "Brüche multiplizieren und dividieren",
        paragraphs: [
          "Multiplizieren: Zähler mal Zähler, Nenner mal Nenner – 2/3 · 3/4 = 6/12 = 1/2.",
          "Dividieren: Mit dem Kehrwert des zweiten Bruchs multiplizieren – 3/4 : 1/2 = 3/4 · 2/1 = 6/4 = 3/2 = 1 1/2.",
        ],
      },
      {
        id: "kuerzen",
        title: "Kürzen und Erweitern",
        paragraphs: [
          "Beim Kürzen werden Zähler und Nenner durch dieselbe Zahl geteilt, beim Erweitern mit derselben Zahl multipliziert; der Wert des Bruchs bleibt gleich. Vollständig gekürzt ist ein Bruch, wenn Zähler und Nenner durch ihren größten gemeinsamen Teiler (ggT) geteilt wurden.",
        ],
      },
    ],
    faq: [
      { question: "Wie addiert man Brüche mit verschiedenen Nennern?", answer: "Hauptnenner suchen (kgV der Nenner), beide Brüche darauf erweitern und dann die Zähler addieren. 1/3 + 1/4 = 4/12 + 3/12 = 7/12." },
      { question: "Wie teilt man durch einen Bruch?", answer: "Man multipliziert mit dem Kehrwert: 2/5 : 3/4 = 2/5 · 4/3 = 8/15." },
      { question: "Was ist eine gemischte Zahl?", answer: "Eine ganze Zahl mit Bruch, etwa 2 1/3. Sie entspricht dem unechten Bruch 7/3 (2 · 3 + 1 = 7)." },
    ],
  },
  {
    key: "ggtKgv",
    path: "/de/ggt-kgv-rechner",
    trPath: `${TR}/ebob-ekok-hesaplama`,
    title: "ggT und kgV Rechner",
    metaTitle: "ggT und kgV Rechner mit Rechenweg",
    shortTitle: "ggT und kgV",
    description: "Größten gemeinsamen Teiler (ggT) und kleinstes gemeinsames Vielfaches (kgV) berechnen – über Primfaktorzerlegung und euklidischen Algorithmus, für zwei oder mehr Zahlen.",
    intro: "Zwei oder mehr Zahlen eingeben. Der Rechner bestimmt ggT und kgV und zeigt beide Lösungswege aus dem Unterricht: Primfaktorzerlegung und euklidischen Algorithmus.",
    sections: [
      {
        id: "primfaktoren",
        title: "ggT und kgV über Primfaktoren",
        paragraphs: [
          "Beide Zahlen in Primfaktoren zerlegen: 84 = 2² · 3 · 7 und 36 = 2² · 3². Für den ggT nimmt man die gemeinsamen Primfaktoren mit dem kleinsten Exponenten (2² · 3 = 12), für das kgV alle Primfaktoren mit dem größten Exponenten (2² · 3² · 7 = 252).",
        ],
      },
      {
        id: "euklid",
        title: "Euklidischer Algorithmus",
        paragraphs: [
          "Die größere Zahl wird durch die kleinere geteilt, dann der Divisor durch den Rest – so lange, bis der Rest 0 ist. Der letzte Rest ungleich 0 ist der ggT: 84 = 2 · 36 + 12, 36 = 3 · 12 + 0, also ggT = 12. Das kgV folgt aus a · b : ggT = 84 · 36 : 12 = 252.",
        ],
      },
      {
        id: "anwendung",
        title: "Wofür braucht man ggT und kgV?",
        list: [
          "ggT: Brüche vollständig kürzen – 36/84 geteilt durch 12 ergibt 3/7.",
          "kgV: Hauptnenner beim Addieren von Brüchen finden.",
          "Alltag: Fährt ein Bus alle 12 und ein anderer alle 18 Minuten, treffen sie sich nach kgV(12, 18) = 36 Minuten wieder.",
        ],
      },
    ],
    faq: [
      { question: "Was ist der Unterschied zwischen ggT und kgV?", answer: "Der ggT ist die größte Zahl, durch die beide Zahlen teilbar sind; das kgV ist die kleinste Zahl, die ein Vielfaches beider Zahlen ist." },
      { question: "Wie hängen ggT und kgV zusammen?", answer: "Für zwei natürliche Zahlen gilt: ggT(a, b) · kgV(a, b) = a · b." },
      { question: "Was bedeutet ggT = 1?", answer: "Die Zahlen sind teilerfremd, etwa 8 und 15. Ihr kgV ist dann einfach ihr Produkt." },
    ],
  },
  {
    key: "primfaktor",
    path: "/de/primfaktorzerlegung",
    title: "Primfaktorzerlegung",
    metaTitle: "Primfaktorzerlegung Rechner mit Rechenweg und Teilern",
    shortTitle: "Primfaktorzerlegung",
    description: "Primfaktorzerlegung jeder Zahl bis 1 Billion mit Rechenweg, Potenzschreibweise, Anzahl der Teiler und Teilerliste; zeigt auch, ob eine Zahl eine Primzahl ist.",
    intro: "Eine natürliche Zahl eingeben: Der Rechner zerlegt sie in Primfaktoren, schreibt das Ergebnis in Potenzschreibweise und listet alle Teiler auf.",
    sections: [
      {
        id: "vorgehen",
        title: "So zerlegt man eine Zahl in Primfaktoren",
        paragraphs: [
          "Man teilt die Zahl so lange durch die kleinstmögliche Primzahl, bis 1 übrig bleibt: 360 : 2 = 180, 180 : 2 = 90, 90 : 2 = 45, 45 : 3 = 15, 15 : 3 = 5, 5 : 5 = 1. Also 360 = 2³ · 3² · 5.",
          "Jede natürliche Zahl größer als 1 hat genau eine solche Zerlegung (Fundamentalsatz der Arithmetik).",
        ],
      },
      {
        id: "teiler",
        title: "Anzahl der Teiler",
        paragraphs: ["Aus den Exponenten ergibt sich die Zahl der Teiler: Alle Exponenten um 1 erhöhen und multiplizieren. 360 = 2³ · 3² · 5 hat (3+1) · (2+1) · (1+1) = 24 Teiler."],
      },
      { id: "primzahlen", title: "Primzahlen bis 100", paragraphs: [primesTo100.join(", ") + " – insgesamt 25 Primzahlen."] },
    ],
    faq: [
      { question: "Ist 1 eine Primzahl?", answer: "Nein. Eine Primzahl hat genau zwei Teiler, 1 und sich selbst; die 1 hat nur einen." },
      { question: "Ist 2 eine Primzahl?", answer: "Ja, 2 ist die kleinste und die einzige gerade Primzahl." },
      { question: "Wofür braucht man die Primfaktorzerlegung?", answer: "Für ggT und kgV, zum Kürzen von Brüchen, zum teilweisen Wurzelziehen und um die Anzahl der Teiler zu bestimmen." },
    ],
  },
  {
    key: "wurzel",
    path: "/de/wurzelrechner",
    trPath: `${TR}/karekok-hesaplama`,
    title: "Wurzelrechner",
    metaTitle: "Wurzelrechner: Quadratwurzel und n-te Wurzel",
    shortTitle: "Wurzelrechner",
    description: "Quadratwurzel, Kubikwurzel und n-te Wurzel berechnen, Wurzeln teilweise ziehen (√72 = 6√2) mit Rechenweg über die Primfaktorzerlegung, dazu die Quadratzahlen bis 400.",
    intro: "Zahl und Wurzelexponent eingeben. Der Rechner zeigt den Dezimalwert, macht die Probe und vereinfacht die Wurzel, wenn möglich (teilweises Wurzelziehen).",
    sections: [
      {
        id: "vereinfachen",
        title: "Wurzeln teilweise ziehen",
        paragraphs: [
          "Man zerlegt den Radikanden in Primfaktoren und zieht je zwei gleiche Faktoren (bei der Kubikwurzel je drei) vor die Wurzel: 72 = 2³ · 3² = (2 · 3)² · 2, also √72 = 6√2.",
        ],
      },
      { id: "quadratzahlen", title: "Quadratzahlen von 1 bis 20", table: { head: ["n", "n²", "√n²"], rows: squares.map((n) => [String(n), String(n * n), String(n)]) } },
      {
        id: "regeln",
        title: "Rechenregeln für Wurzeln",
        list: ["√a · √b = √(a · b), zum Beispiel √2 · √8 = √16 = 4", "√a : √b = √(a : b)", "√(a²) = |a|", "Die n-te Wurzel ist die Potenz mit dem Exponenten 1/n: ⁿ√a = a^(1/n)"],
      },
    ],
    faq: [
      { question: "Kann man aus negativen Zahlen die Wurzel ziehen?", answer: "Die Quadratwurzel einer negativen Zahl ist keine reelle Zahl. Ungerade Wurzeln gehen: Die Kubikwurzel aus −8 ist −2." },
      { question: "Was ist √2?", answer: "Ungefähr 1,41421356. √2 ist irrational, hat also unendlich viele Nachkommastellen ohne Periode." },
      { question: "Wie rechnet man die Wurzel im Kopf ab?", answer: "Zwischen zwei Quadratzahlen einordnen: √50 liegt zwischen √49 = 7 und √64 = 8, knapp über 7 (genau 7,07)." },
    ],
  },
  {
    key: "quadratisch",
    path: "/de/pq-formel-rechner",
    trPath: `${TR}/ikinci-dereceden-denklem-cozme`,
    title: "pq-Formel und Mitternachtsformel Rechner",
    metaTitle: "pq-Formel Rechner und Mitternachtsformel mit Rechenweg",
    shortTitle: "pq-Formel / abc-Formel",
    description: "Quadratische Gleichungen lösen mit pq-Formel oder Mitternachtsformel (abc-Formel): Diskriminante, Lösungsmenge, Scheitelpunkt und Rechenweg.",
    intro: "Wählen Sie die Formel, die Sie im Unterricht gelernt haben – pq-Formel für x² + px + q = 0 oder Mitternachtsformel für ax² + bx + c = 0. Der Rechner zeigt Lösungen, Diskriminante, Scheitelpunkt und den Rechenweg.",
    sections: [
      {
        id: "unterschied",
        title: "pq-Formel oder Mitternachtsformel?",
        paragraphs: [
          "Beide Formeln lösen dieselben Gleichungen. Die pq-Formel x₁,₂ = −p/2 ± √((p/2)² − q) setzt die Normalform voraus, also a = 1. Die Mitternachtsformel (auch abc-Formel) x₁,₂ = (−b ± √(b² − 4ac)) / 2a funktioniert für jedes a ≠ 0.",
          "Welche Formel gelehrt wird, hängt von Bundesland, Schulform und Lehrkraft ab; in Baden-Württemberg lernen Gymnasien zum Beispiel meist die Mitternachtsformel, Realschulen die pq-Formel. Wer die pq-Formel nutzen will, teilt die Gleichung zuerst durch a.",
        ],
      },
      {
        id: "diskriminante",
        title: "Die Diskriminante",
        list: ["D > 0: zwei verschiedene Lösungen – die Parabel schneidet die x-Achse zweimal", "D = 0: eine doppelte Lösung – der Scheitelpunkt liegt auf der x-Achse", "D < 0: keine reelle Lösung – die Parabel berührt die x-Achse nicht"],
      },
      {
        id: "vieta",
        title: "Probe mit dem Satz von Vieta",
        paragraphs: ["Für x² + px + q = 0 gilt: x₁ + x₂ = −p und x₁ · x₂ = q. Beispiel x² − 5x + 6 = 0: Die Lösungen 2 und 3 ergeben 2 + 3 = 5 = −p und 2 · 3 = 6 = q."],
      },
    ],
    faq: [
      { question: "Warum heißt sie Mitternachtsformel?", answer: "Weil man sie – so der Spruch – auch dann aufsagen können soll, wenn man um Mitternacht geweckt wird." },
      { question: "Wie bringe ich eine Gleichung in die Normalform?", answer: "Alles auf eine Seite bringen und durch den Faktor vor x² teilen: 2x² − 8x + 6 = 0 wird zu x² − 4x + 3 = 0, also p = −4 und q = 3." },
      { question: "Wie finde ich den Scheitelpunkt?", answer: "Die x-Koordinate ist −b/2a (bei der Normalform −p/2); diesen Wert in die Funktion einsetzen ergibt die y-Koordinate." },
    ],
  },
  {
    key: "roemisch",
    path: "/de/roemische-zahlen",
    title: "Römische Zahlen umrechnen",
    metaTitle: "Römische Zahlen umrechnen: Rechner, Tabelle und Regeln",
    shortTitle: "Römische Zahlen",
    description: "Römische Zahlen in arabische umrechnen und umgekehrt (1 bis 3999), mit Zerlegung, Tabelle der Zeichen und den Schreibregeln.",
    intro: "Eine Zahl oder eine römische Zahl eingeben – der Rechner erkennt die Richtung selbst, zeigt das Ergebnis und die Zerlegung und prüft die Schreibweise.",
    sections: [
      { id: "zeichen", title: "Die römischen Zeichen", table: { head: ["Zeichen", "Wert"], rows: [["I", "1"], ["V", "5"], ["X", "10"], ["L", "50"], ["C", "100"], ["D", "500"], ["M", "1000"]] } },
      {
        id: "regeln",
        title: "Schreibregeln",
        list: [
          "Zeichen werden von groß nach klein geschrieben und addiert: MDCLXVI = 1666.",
          "Steht ein kleineres Zeichen vor einem größeren, wird es abgezogen – nur I vor V und X, X vor L und C, C vor D und M: IV = 4, XC = 90, CM = 900.",
          "I, X, C und M höchstens dreimal hintereinander; V, L und D nie doppelt.",
          "Die größte darstellbare Zahl in der Standardschreibweise ist MMMCMXCIX = 3999.",
        ],
      },
      {
        id: "alltag",
        title: "Römische Zahlen im Alltag",
        paragraphs: [
          "Jahreszahlen auf Gebäuden und im Filmabspann (2026 = MMXXVI), Kapitel, Päpste und Könige (Ludwig XIV.). Viele Uhren zeigen die 4 übrigens als IIII statt IV – eine alte Tradition, die das Zifferblatt symmetrischer wirken lässt.",
        ],
      },
    ],
    faq: [
      { question: "Wie schreibt man 2026 in römischen Zahlen?", answer: "MMXXVI: MM = 2000, XX = 20, VI = 6." },
      { question: "Gibt es eine römische Null?", answer: "Nein. Die Römer kannten kein Zeichen für die Null." },
      { question: "Wie schreibt man 4 und 9?", answer: "4 = IV (5 − 1) und 9 = IX (10 − 1); ebenso 40 = XL, 90 = XC, 400 = CD und 900 = CM." },
    ],
  },
  {
    key: "mittelwert",
    path: "/de/mittelwert-rechner",
    trPath: `${TR}/ortalama-hesaplama`,
    title: "Mittelwert-Rechner",
    metaTitle: "Mittelwert, Median und Standardabweichung berechnen",
    shortTitle: "Mittelwert und Median",
    description: "Durchschnitt (arithmetisches Mittel), Median, Modus, Spannweite, Varianz und Standardabweichung berechnen – für Stichprobe und Grundgesamtheit, mit Dezimalkomma.",
    intro: "Zahlen mit Semikolon oder Leerzeichen getrennt eingeben (Dezimalkomma erlaubt). Der Rechner zeigt Mittelwert, Median, Modus, Spannweite, Varianz und Standardabweichung.",
    sections: [
      {
        id: "mittel-median",
        title: "Mittelwert oder Median?",
        paragraphs: [
          "Der Mittelwert ist die Summe aller Werte geteilt durch ihre Anzahl. Der Median ist der mittlere Wert der sortierten Liste – bei gerader Anzahl der Durchschnitt der beiden mittleren.",
          "Ausreißer verschieben den Mittelwert, den Median kaum. Deshalb wird etwa beim Einkommen oft der Median angegeben: Ein paar sehr hohe Gehälter heben den Durchschnitt, der Median zeigt, was die mittlere Person verdient.",
        ],
      },
      {
        id: "streuung",
        title: "Standardabweichung: Stichprobe oder Grundgesamtheit",
        paragraphs: [
          "Die Standardabweichung misst, wie stark die Werte um den Mittelwert streuen. Liegen alle Werte vor (Grundgesamtheit), teilt man die Summe der quadrierten Abweichungen durch n; bei einer Stichprobe durch n − 1. Im Schulunterricht wird meist durch n geteilt, in der Statistik bei Stichproben durch n − 1.",
        ],
      },
    ],
    faq: [
      { question: "Wie berechne ich den Durchschnitt?", answer: "Alle Werte addieren und durch ihre Anzahl teilen: (2 + 4 + 9) : 3 = 5." },
      { question: "Was ist der Modus?", answer: "Der Wert, der am häufigsten vorkommt. Kommt jeder Wert nur einmal vor, gibt es keinen Modus." },
      { question: "Wie berechne ich meinen Notendurchschnitt?", answer: "Mit Gewichtung, etwa doppelt zählenden Klassenarbeiten, geht es am einfachsten mit dem Notenrechner." },
    ],
  },
  {
    key: "binomial",
    path: "/de/binomialkoeffizient-rechner",
    trPath: `${TR}/permutasyon-kombinasyon-hesaplama`,
    title: "Binomialkoeffizient „n über k“",
    metaTitle: "n über k Rechner: Binomialkoeffizient und Lotto-Chancen",
    shortTitle: "n über k",
    description: "Binomialkoeffizient „n über k“ exakt berechnen: Anzahl der Kombinationen ohne Reihenfolge, Fakultät und Gewinnchancen, zum Beispiel beim Lotto 6 aus 49.",
    intro: "n und k eingeben: Der Rechner zeigt exakt, auf wie viele Arten man k aus n Elementen auswählen kann, und die Wahrscheinlichkeit für genau eine Kombination.",
    sections: [
      {
        id: "formel",
        title: "Die Formel",
        paragraphs: ["n über k = n! / (k! · (n − k)!). Beispiel 5 über 2 = 120 / (2 · 6) = 10: Aus fünf Personen lassen sich zehn verschiedene Zweierteams bilden."],
      },
      {
        id: "lotto",
        title: "Beispiel Lotto 6 aus 49",
        paragraphs: [
          "Beim Lotto 6 aus 49 gibt es 49 über 6 = 13.983.816 mögliche Tipps. Die Chance auf sechs Richtige liegt also bei 1 : 13.983.816. Mit der Superzahl (0 bis 9) für den Jackpot wird daraus 1 : 139.838.160.",
          "Beim Eurojackpot werden 5 aus 50 und 2 aus 12 gezogen: 2.118.760 · 66 = 139.838.160 Kombinationen – zufällig genau dieselbe Chance wie beim Lotto-Jackpot.",
        ],
      },
      {
        id: "pascal",
        title: "Das Pascalsche Dreieck",
        paragraphs: ["Jede Zahl im Pascalschen Dreieck ist die Summe der beiden darüberliegenden; die n-te Zeile enthält die Werte n über 0 bis n über n. Die Zeile 1 4 6 4 1 sind die Koeffizienten von (a + b)⁴."],
      },
    ],
    faq: [
      { question: "Was bedeutet „n über k“?", answer: "Die Anzahl der Möglichkeiten, k Elemente aus n auszuwählen, ohne auf die Reihenfolge zu achten und ohne Zurücklegen." },
      { question: "Was ist der Unterschied zur Permutation?", answer: "Bei Permutationen zählt die Reihenfolge: Aus 5 Personen lassen sich 20 geordnete Paare (Kapitän und Vize) bilden, aber nur 10 ungeordnete Teams." },
      { question: "Wie hoch ist die Chance auf 6 Richtige mit Superzahl?", answer: "1 : 139.838.160, also etwa 0,0000007 Prozent." },
    ],
  },
  {
    key: "division",
    path: "/de/schriftlich-dividieren",
    title: "Schriftlich dividieren",
    metaTitle: "Schriftlich dividieren: Rechner mit Rest und Rechenweg",
    shortTitle: "Schriftliche Division",
    description: "Schriftliche Division Schritt für Schritt wie im Heft: teilen, multiplizieren, subtrahieren, herunterholen – mit Rest, Probe und Dezimalergebnis.",
    intro: "Dividend und Divisor eingeben. Der Rechner zeigt die Rechnung genau so, wie sie in der Grundschule ins Heft geschrieben wird, mit Rest und Probe.",
    sections: [
      {
        id: "schritte",
        title: "Die vier Schritte",
        list: [
          "Teilen: Wie oft passt der Divisor in die ersten Stellen? Die Zahl kommt ins Ergebnis.",
          "Multiplizieren: Diese Ergebnisziffer mal den Divisor rechnen und darunterschreiben.",
          "Subtrahieren: Abziehen – der Rest muss kleiner als der Divisor sein.",
          "Herunterholen: Die nächste Ziffer des Dividenden neben den Rest schreiben und von vorn beginnen.",
        ],
      },
      {
        id: "beispiel",
        title: "Beispiel 1234 : 5",
        paragraphs: [
          "12 : 5 = 2, 2 · 5 = 10, 12 − 10 = 2, die 3 herunterholen: 23. 23 : 5 = 4, 4 · 5 = 20, Rest 3, die 4 herunterholen: 34. 34 : 5 = 6, 6 · 5 = 30, Rest 4. Ergebnis: 1234 : 5 = 246 Rest 4.",
          "Probe: 246 · 5 + 4 = 1234. Mit Komma weitergerechnet ergibt sich 246,8.",
        ],
      },
      {
        id: "tipps",
        title: "Typische Fehler",
        list: [
          "Eine Null im Ergebnis vergessen, wenn der Divisor nach dem Herunterholen nicht passt (1224 : 12 = 102).",
          "Einen Rest stehen lassen, der größer als der Divisor ist – dann war die Ergebnisziffer zu klein.",
          "Die Probe weglassen: Ergebnis mal Divisor plus Rest muss den Dividenden ergeben.",
        ],
      },
    ],
    faq: [
      { question: "Wie schreibt man den Rest?", answer: "Hinter das Ergebnis, etwa „246 Rest 4“ oder kurz „246 R 4“." },
      { question: "In welcher Klasse lernt man schriftlich dividieren?", answer: "Meist in der 4. Klasse der Grundschule, mit einstelligem Divisor; zweistellige Divisoren folgen oft in Klasse 5." },
      { question: "Wie rechnet man mit Komma weiter?", answer: "Nach der letzten Ziffer ein Komma ins Ergebnis setzen und statt einer Ziffer eine 0 herunterholen, so lange, bis der Rest 0 ist oder genug Stellen dastehen." },
    ],
  },
  {
    key: "pythagoras",
    path: "/de/satz-des-pythagoras-rechner",
    title: "Satz des Pythagoras",
    metaTitle: "Satz des Pythagoras Rechner: Hypotenuse und Kathete",
    shortTitle: "Satz des Pythagoras",
    description: "Fehlende Seite im rechtwinkligen Dreieck berechnen – Hypotenuse oder Kathete – mit Rechenweg, Fläche, Umfang und Höhe.",
    intro: "Zwei Seiten eines rechtwinkligen Dreiecks eingeben und die dritte leer lassen. Der Rechner bestimmt die fehlende Seite nach a² + b² = c² und zeigt den Rechenweg.",
    sections: [
      {
        id: "formel",
        title: "a² + b² = c²",
        paragraphs: [
          "Im rechtwinkligen Dreieck ist die Summe der Quadrate über den Katheten gleich dem Quadrat über der Hypotenuse. Die Hypotenuse c liegt dem rechten Winkel gegenüber und ist die längste Seite.",
          "Hypotenuse gesucht: c = √(a² + b²). Kathete gesucht: a = √(c² − b²).",
        ],
      },
      {
        id: "tripel",
        title: "Pythagoreische Tripel",
        table: {
          head: ["a", "b", "c"],
          rows: [
            ["3", "4", "5"],
            ["5", "12", "13"],
            ["6", "8", "10"],
            ["8", "15", "17"],
            ["7", "24", "25"],
            ["20", "21", "29"],
          ],
        },
      },
      {
        id: "alltag",
        title: "Im Alltag",
        list: [
          "Bildschirmdiagonale: Ein 55-Zoll-Fernseher im Format 16:9 ist etwa 47,9 Zoll breit und 27 Zoll hoch.",
          "Leiter an der Wand: Eine 5-m-Leiter, deren Fuß 1,5 m von der Wand steht, reicht √(25 − 2,25) ≈ 4,77 m hoch.",
          "Rechter Winkel beim Bauen: Mit einer 3-4-5-Schnur prüfen Handwerker, ob eine Ecke rechtwinklig ist.",
        ],
      },
    ],
    faq: [
      { question: "Welche Seite ist die Hypotenuse?", answer: "Die Seite gegenüber dem rechten Winkel; sie ist immer die längste Seite im Dreieck." },
      { question: "Gilt der Satz für jedes Dreieck?", answer: "Nein, nur für rechtwinklige Dreiecke. Für andere Dreiecke verwendet man den Kosinussatz." },
      { question: "Wie prüfe ich, ob ein Dreieck rechtwinklig ist?", answer: "Wenn a² + b² = c² gilt (mit c als längster Seite), ist es rechtwinklig – etwa 5, 12 und 13, weil 25 + 144 = 169." },
    ],
  },
  {
    key: "area",
    path: "/de/flaechenrechner",
    title: "Flächenrechner",
    metaTitle: "Flächenrechner: Kreis, Rechteck, Dreieck, Trapez",
    shortTitle: "Flächenrechner",
    description: "Flächeninhalt und Umfang berechnen: Kreis, Rechteck, Dreieck, Trapez und Parallelogramm – mit Formeln und Beispielen.",
    intro: "Figur wählen und die Maße eingeben. Der Rechner zeigt Flächeninhalt, Umfang und – wo sinnvoll – Durchmesser oder Diagonale.",
    sections: [
      {
        id: "formeln",
        title: "Die Formeln",
        table: {
          head: ["Figur", "Flächeninhalt", "Umfang"],
          rows: [
            ["Quadrat", "a²", "4 · a"],
            ["Rechteck", "a · b", "2 · (a + b)"],
            ["Dreieck", "g · h / 2", "a + b + c"],
            ["Parallelogramm", "g · h", "2 · (a + b)"],
            ["Trapez", "(a + c) / 2 · h", "a + b + c + d"],
            ["Kreis", "π · r²", "2 · π · r"],
          ],
        },
      },
      {
        id: "einheiten",
        title: "Flächeneinheiten",
        paragraphs: ["1 m² = 100 dm² = 10.000 cm². 1 Ar = 100 m², 1 Hektar = 10.000 m², 1 km² = 100 Hektar."],
      },
    ],
    faq: [
      { question: "Wie berechne ich die Fläche eines Zimmers?", answer: "Länge mal Breite: 4,5 m · 3,2 m = 14,4 m². L-förmige Räume in Rechtecke zerlegen und die Flächen addieren." },
      { question: "Wie groß ist ein Kreis mit 1 m Durchmesser?", answer: "Radius 0,5 m, also π · 0,25 ≈ 0,785 m²." },
      { question: "Was ist die Höhe beim Dreieck?", answer: "Der senkrechte Abstand von der Grundseite zur gegenüberliegenden Ecke – nicht die Länge einer schrägen Seite." },
    ],
  },
  {
    key: "volumen",
    path: "/de/volumenrechner",
    title: "Volumenrechner",
    metaTitle: "Volumenrechner: Zylinder, Kegel, Kugel, Quader",
    shortTitle: "Volumenrechner",
    description: "Volumen, Oberfläche und Mantelfläche berechnen: Würfel, Quader, Zylinder, Kegel, Kugel und quadratische Pyramide – mit Formeln und Umrechnung in Liter.",
    intro: "Körper wählen und die Maße eingeben. Der Rechner zeigt Volumen, Oberfläche und – je nach Körper – Grund- und Mantelfläche; bei Maßen in Zentimetern auch das Volumen in Litern.",
    sections: [
      {
        id: "formeln",
        title: "Formelsammlung Körper",
        table: {
          head: ["Körper", "Volumen", "Oberfläche"],
          rows: [
            ["Würfel", "a³", "6 · a²"],
            ["Quader", "a · b · c", "2 · (ab + ac + bc)"],
            ["Zylinder", "π · r² · h", "2 · π · r · (r + h)"],
            ["Kegel", "⅓ · π · r² · h", "π · r · (r + s)"],
            ["Kugel", "⁴⁄₃ · π · r³", "4 · π · r²"],
            ["Quadratische Pyramide", "⅓ · a² · h", "a² + 2 · a · hs"],
          ],
        },
      },
      {
        id: "liter",
        title: "Volumen in Liter umrechnen",
        paragraphs: ["1 Liter = 1 dm³ = 1.000 cm³, 1 m³ = 1.000 Liter. Ein Zylinder mit 3 cm Radius und 4 cm Höhe fasst π · 9 · 4 ≈ 113,1 cm³, also rund 0,11 Liter."],
      },
    ],
    faq: [
      { question: "Was ist der Unterschied zwischen Oberfläche und Mantelfläche?", answer: "Die Mantelfläche ist nur die Seitenfläche (beim Zylinder das „Etikett“), die Oberfläche umfasst zusätzlich Grund- und Deckfläche." },
      { question: "Wie viel passt in einen Eimer?", answer: "Näherungsweise als Zylinder: Radius 14 cm, Höhe 30 cm ergibt π · 196 · 30 ≈ 18.473 cm³, also gut 18 Liter." },
      { question: "Warum hat der Kegel ein Drittel des Zylindervolumens?", answer: "Ein Kegel mit gleicher Grundfläche und Höhe passt genau dreimal in den Zylinder – das gilt ebenso für Pyramide und Prisma." },
    ],
  },
  {
    key: "lgs",
    path: "/de/gleichungssystem-rechner",
    trPath: `${TR}/2-bilinmeyenli-denklem-sistemi-cozme`,
    title: "Lineare Gleichungssysteme lösen",
    metaTitle: "Gleichungssystem Rechner: Gauß-Verfahren mit Rechenweg",
    shortTitle: "Gleichungssysteme (Gauß)",
    description: "Lineare Gleichungssysteme mit 2 oder 3 Unbekannten lösen – nach dem Gauß-Verfahren mit Rechenweg; erkennt keine und unendlich viele Lösungen.",
    intro: "Die Faktoren vor x, y (und z) sowie die rechte Seite jeder Gleichung eingeben. Der Rechner löst das System mit dem Gauß-Verfahren und zeigt jeden Umformungsschritt.",
    sections: [
      {
        id: "gauss",
        title: "So funktioniert das Gauß-Verfahren",
        paragraphs: [
          "Man formt das Gleichungssystem in Stufenform um: Mit Gleichung I wird x aus den anderen Gleichungen eliminiert, dann mit Gleichung II das y aus Gleichung III. Die letzte Gleichung enthält nur noch z; durch Rückwärtseinsetzen folgen y und x.",
          "Erlaubte Umformungen: Gleichungen vertauschen, mit einer Zahl ungleich 0 multiplizieren und ein Vielfaches einer Gleichung zu einer anderen addieren.",
        ],
      },
      {
        id: "verfahren",
        title: "Andere Lösungsverfahren",
        list: [
          "Einsetzungsverfahren: eine Gleichung nach einer Variablen auflösen und in die andere einsetzen.",
          "Gleichsetzungsverfahren: beide Gleichungen nach derselben Variablen auflösen und gleichsetzen.",
          "Additionsverfahren: Gleichungen so addieren, dass eine Variable wegfällt – das Gauß-Verfahren ist die systematische Form davon.",
        ],
      },
      {
        id: "loesbarkeit",
        title: "Keine oder unendlich viele Lösungen",
        paragraphs: ["Entsteht beim Umformen eine Zeile 0 = 5, widersprechen sich die Gleichungen: keine Lösung. Entsteht 0 = 0, ist eine Gleichung überflüssig: unendlich viele Lösungen."],
      },
    ],
    faq: [
      { question: "Wie viele Gleichungen brauche ich?", answer: "Für eine eindeutige Lösung so viele unabhängige Gleichungen wie Unbekannte: zwei für x und y, drei für x, y und z." },
      { question: "Was bedeutet die Schreibweise II − 2 · I?", answer: "Von Gleichung II wird das Zweifache von Gleichung I abgezogen, damit eine Variable wegfällt." },
      { question: "Wie mache ich die Probe?", answer: "Die gefundenen Werte in jede Ausgangsgleichung einsetzen; beide Seiten müssen übereinstimmen." },
    ],
  },
];

export function findGermanMathPage(key: GermanMathKey) {
  return germanMathPages.find((p) => p.key === key)!;
}

export function germanMathAlternates(page: GermanMathPage) {
  return page.trPath ? buildLanguageAlternates({ tr: page.trPath, de: page.path }, "tr") : undefined;
}

/** Für die türkischen Seiten: deutsche Entsprechung eines türkischen Pfads. */
export function germanMathAlternatesForTurkish(trPath: string) {
  const page = germanMathPages.find((p) => p.trPath === trPath);
  return page ? buildLanguageAlternates({ tr: trPath, de: page.path }, "tr") : {};
}

export const germanMathLinks = [
  ...germanMathPages.map((p) => ({ href: p.path, label: p.shortTitle })),
  { href: "/de/prozentrechner", label: "Prozentrechner" },
  { href: "/de/dreisatz-rechner", label: "Dreisatz" },
  { href: "/de/notenrechner", label: "Notenrechner" },
];
