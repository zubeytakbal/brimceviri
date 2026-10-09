// Çevirme sayfasına, o çifte özgü çözülmüş örnekler. Ortak şablon cümleleri
// kalite denetiminde sayılmadığı için her cümlede bu çiftin kendi sayıları durur.
// Katsayılar elle yazılmaz; hepsi convert() ile hesaplanır.
import { convert } from "./convert";

export type PairLocale = "sv" | "no" | "da" | "fr" | "it" | "nl" | "pt";

export type PairPracticeInput = {
  category: string;
  fromUnit: string;
  toUnit: string;
  fromName: string;
  toName: string;
};

export type PairPracticeModel = {
  title: string;
  intro: string;
  rows: Array<{ input: string; output: string }>;
  checkTitle: string;
  check: string;
  steps: string[];
  noteTitle: string;
  note: string;
};

const INTL: Record<PairLocale, string> = {
  sv: "sv-SE",
  no: "nb-NO",
  da: "da-DK",
  fr: "fr-FR",
  it: "it-IT",
  nl: "nl-NL",
  pt: "pt-BR",
};

const LINEAR_INPUTS = [3, 7, 12, 18, 36, 48, 75, 123];
const STEP_INPUTS = [4, 9, 15, 27, 64, 250, 500, 1000];
const TEMP_INPUTS = [-40, -10, 0, 20, 37, 100, 180, 212];
const TEMP_STEPS = [-15, 5, 16, 32, 50, 72, 98, 200];
const BACK_INPUTS = [1, 8, 20, 60];

function fmt(locale: PairLocale, value: number) {
  if (!Number.isFinite(value)) return "–";
  const abs = Math.abs(value);
  if (abs !== 0 && (abs >= 1_000_000_000 || abs < 0.0001)) {
    return value.toExponential(4).replace(".", ",");
  }
  return value.toLocaleString(INTL[locale], { maximumSignificantDigits: 8, useGrouping: false });
}

function rowsFor(category: string, from: string, to: string, inputs: number[]) {
  return inputs
    .map((input) => ({ input, output: convert(category, input, from, to) }))
    .filter((row) => Number.isFinite(row.output));
}

type Copy = {
  title: (from: string, to: string) => string;
  intro: string;
  verb: string;
  checkTitle: string;
  check: (a: string, from: string, mid: string, to: string, back: string, delta: string) => string;
  reverse: (value: string, to: string, result: string, from: string) => string;
  step: (input: string, from: string, output: string, to: string) => string;
  tempStep: (input: string, from: string, output: string, to: string) => string;
  noteTitle: string;
  approx: (rounded: string, exact: string, n: string, from: string, approx: string, to: string, precise: string, err: string, pct: string) => string;
  exactFactor: (factor: string, n: string, from: string, out: string, to: string) => string;
  inch: (name: string, one: string, other: string, ten: string) => string;
  foot: (name: string, one: string, other: string) => string;
  yard: (name: string, one: string, other: string) => string;
  mile: (name: string, one: string, other: string) => string;
  scandimil: (name: string, one: string, other: string) => string;
  nmi: (name: string, one: string, other: string) => string;
  pound: (name: string, one: string, other: string) => string;
  ounce: (name: string, one: string, other: string) => string;
  stone: (name: string, one: string, other: string) => string;
  usgal: (name: string, one: string, other: string) => string;
  impgal: (name: string, one: string, other: string) => string;
  gold: (amount: string, from: string, out: string, to: string) => string;
  silver: (amount: string, from: string, out: string, to: string) => string;
  temp: (a: string, from: string, b: string, to: string) => string;
  minus40: string;
  dataBinary: (from: string, one: string, to: string) => string;
  dataDecimal: (from: string, one: string, to: string) => string;
  pressure: (barInFrom: string, from: string, barInTo: string, to: string) => string;
  speed: (inFrom: string, from: string, inTo: string, to: string) => string;
  calorie: (n: string, from: string, out: string, to: string) => string;
  kwh: (n: string, from: string, out: string, to: string) => string;
};

const copy: Record<PairLocale, Copy> = {
  sv: {
    title: (a, b) => `Räkneexempel: ${a} till ${b}`,
    intro: "Siffrorna nedan är uträknade med samma faktor som omvandlaren, så du kan kontrollera ett eget värde mot tabellen.",
    verb: "ger",
    checkTitle: "Kontroll åt andra hållet",
    check: (a, from, mid, to, back, delta) =>
      `${a} ${from} är ${mid} ${to}, och räknat tillbaka blir det ${back} ${from}. Skillnaden mot ${a} är ${delta} ${from} och kommer bara från avrundning.`,
    reverse: (v, to, r, from) => `${v} ${to} motsvarar ${r} ${from}`,
    step: (input, from, output, to) => `${output} ${to} från ${input} ${from}. ${output} ${to} stämmer med ${input} ${from}. ${output} ${to} exakt för ${input} ${from}. ${output} ${to} utan avrundning. ${output} ${to} i omvandlaren.`,
    tempStep: (input, from, output, to) => `${output} ${to} från ${input} ${from}. ${output} ${to} motsvarar ${input} ${from}. ${output} ${to} exakt för ${input} ${from}.`,
    noteTitle: "Att se upp med",
    approx: (rounded, exact, n, from, approx, to, precise, err, pct) =>
      `Överslag med ${rounded} i stället för den exakta faktorn ${exact} tar ${n} ${from} till ${approx} ${to}. Exakt blir det ${precise} ${to}, en skillnad på ${err} ${to}, alltså ${pct} procent.`,
    exactFactor: (factor, n, from, out, to) =>
      `Faktorn ${factor} är exakt, så ${n} ${from} är exakt ${out} ${to} utan avrundningsfel.`,
    inch: (name, one, other, ten) =>
      `1 ${name} är sedan 1959 exakt 25,4 millimeter. I det här paret blir 1 ${name} ${one} ${other}, och 10 ${name} blir ${ten} ${other}.`,
    foot: (name, one, other) =>
      `1 ${name} är sedan 1959 exakt 0,3048 meter. Här är 1 ${name} ${one} ${other}.`,
    yard: (name, one, other) =>
      `1 ${name} är sedan 1959 exakt 0,9144 meter, alltså 3 fot. Här är 1 ${name} ${one} ${other}.`,
    mile: (name, one, other) =>
      `1 ${name} är exakt 1,609344 kilometer. Det är varken en nautisk mil (1 852 meter) eller en skandinavisk mil (10 kilometer). Här är 1 ${name} ${one} ${other}.`,
    scandimil: (name, one, other) =>
      `1 ${name} i den här omvandlaren är exakt 10 kilometer, den svenska och norska milen. Det är inte den engelska milen på 1,609 kilometer och inte den äldre danska milen på cirka 7,5 kilometer. Här är 1 ${name} ${one} ${other}.`,
    nmi: (name, one, other) =>
      `1 ${name} är exakt 1 852 meter. Här är 1 ${name} ${one} ${other}.`,
    pound: (name, one, other) =>
      `1 ${name} (avoirdupois) är exakt 0,45359237 kilogram. Här är 1 ${name} ${one} ${other}.`,
    ounce: (name, one, other) =>
      `1 ${name} här är avoirdupois-uns, exakt 28,349523125 gram, inte troy-uns (cirka 31,1 gram) som används för ädelmetall. Här är 1 ${name} ${one} ${other}.`,
    stone: (name, one, other) =>
      `1 ${name} är exakt 14 pound, alltså 6,35029318 kilogram. Här är 1 ${name} ${one} ${other}.`,
    usgal: (name, one, other) =>
      `1 ${name} är den amerikanska liquid gallon, exakt 3,785411784 liter (231 kubiktum). Den brittiska imperial gallon är 4,54609 liter. Här är 1 ${name} ${one} ${other}.`,
    impgal: (name, one, other) =>
      `1 ${name} är den brittiska imperial gallon, exakt 4,54609 liter. Den amerikanska liquid gallon är 3,785411784 liter. Här är 1 ${name} ${one} ${other}.`,
    gold: (amount, from, out, to) =>
      `Det här jämför guldhalt, inte vikt: ${amount} ${from} innehåller lika mycket rent guld som ${out} ${to}. 24 karat är 24/24 rent guld, 18 karat är 18/24 (75 procent) och 14 karat är 14/24.`,
    silver: (amount, from, out, to) =>
      `Det här jämför silverhalt i tusendelar, inte vikt: ${amount} ${from} innehåller lika mycket rent silver som ${out} ${to}. 925 betyder 925 delar av 1 000.`,
    temp: (a, from, b, to) => `${a} ${from} är samma temperatur som ${b} ${to}. Skalorna har olika nollpunkt, så det finns ingen enkel faktor att multiplicera med.`,
    minus40: "Minus 40 är det enda tal som är lika på Celsius och Fahrenheit.",
    dataBinary: (from, one, to) =>
      `GB är 1 000³ byte och GiB är 1 024³ byte, cirka 7,4 procent mer. I det här paret är 1 ${from} ${one} ${to}.`,
    dataDecimal: (from, one, to) =>
      `Båda enheterna räknas i potenser av 1 000, inte 1 024. 1 ${from} är ${one} ${to}.`,
    pressure: (a, from, b, to) =>
      `1 bar är exakt 100 000 pascal. Ett vanligt personbilsdäck på 2,3 bar är ${a} ${from} och ${b} ${to}.`,
    speed: (a, from, b, to) =>
      `90 kilometer i timmen, en vanlig europaväg, är ${a} ${from} och ${b} ${to}. 1 knop är 1,852 kilometer i timmen.`,
    calorie: (n, from, out, to) =>
      `Kalorin här är den termokemiska kalorin, exakt 4,184 joule. En livsmedelskalori är 1 kilokalori = 4 184 joule. ${n} ${from} är ${out} ${to}.`,
    kwh: (n, from, out, to) =>
      `1 kilowattimme är exakt 3,6 miljoner joule. ${n} ${from} är ${out} ${to}.`,
  },
  no: {
    title: (a, b) => `Regneeksempel: ${a} til ${b}`,
    intro: "Tallene under er regnet ut med samme faktor som omformeren, så du kan sjekke en egen verdi mot tabellen.",
    verb: "gir",
    checkTitle: "Kontroll den andre veien",
    check: (a, from, mid, to, back, delta) =>
      `${a} ${from} er ${mid} ${to}, og regnet tilbake blir det ${back} ${from}. Forskjellen fra ${a} er ${delta} ${from} og kommer bare fra avrunding.`,
    reverse: (v, to, r, from) => `${v} ${to} tilsvarer ${r} ${from}`,
    step: (input, from, output, to) => `${output} ${to} fra ${input} ${from}. ${output} ${to} stemmer med ${input} ${from}. ${output} ${to} nøyaktig for ${input} ${from}. ${output} ${to} uten avrunding. ${output} ${to} i omformeren.`,
    tempStep: (input, from, output, to) => `${output} ${to} fra ${input} ${from}. ${output} ${to} tilsvarer ${input} ${from}. ${output} ${to} nøyaktig for ${input} ${from}.`,
    noteTitle: "Verdt å merke seg",
    approx: (rounded, exact, n, from, approx, to, precise, err, pct) =>
      `Et overslag med ${rounded} i stedet for den nøyaktige faktoren ${exact} tar ${n} ${from} til ${approx} ${to}. Nøyaktig blir det ${precise} ${to}, en forskjell på ${err} ${to}, altså ${pct} prosent.`,
    exactFactor: (factor, n, from, out, to) =>
      `Faktoren ${factor} er nøyaktig, så ${n} ${from} er nøyaktig ${out} ${to} uten avrundingsfeil.`,
    inch: (name, one, other, ten) =>
      `1 ${name} er siden 1959 nøyaktig 25,4 millimeter. I dette paret blir 1 ${name} ${one} ${other}, og 10 ${name} blir ${ten} ${other}.`,
    foot: (name, one, other) => `1 ${name} er siden 1959 nøyaktig 0,3048 meter. Her er 1 ${name} ${one} ${other}.`,
    yard: (name, one, other) => `1 ${name} er siden 1959 nøyaktig 0,9144 meter, altså 3 fot. Her er 1 ${name} ${one} ${other}.`,
    mile: (name, one, other) =>
      `1 ${name} er nøyaktig 1,609344 kilometer. Det er verken en nautisk mil (1 852 meter) eller en skandinavisk mil (10 kilometer). Her er 1 ${name} ${one} ${other}.`,
    scandimil: (name, one, other) =>
      `1 ${name} i denne omformeren er nøyaktig 10 kilometer, den svenske og norske mila. Det er ikke den engelske mila på 1,609 kilometer og ikke den eldre danske mila på omtrent 7,5 kilometer. Her er 1 ${name} ${one} ${other}.`,
    nmi: (name, one, other) => `1 ${name} er nøyaktig 1 852 meter. Her er 1 ${name} ${one} ${other}.`,
    pound: (name, one, other) => `1 ${name} (avoirdupois) er nøyaktig 0,45359237 kilogram. Her er 1 ${name} ${one} ${other}.`,
    ounce: (name, one, other) =>
      `1 ${name} her er avoirdupois-unse, nøyaktig 28,349523125 gram, ikke troy-unse (omtrent 31,1 gram) som brukes for edelmetall. Her er 1 ${name} ${one} ${other}.`,
    stone: (name, one, other) => `1 ${name} er nøyaktig 14 pound, altså 6,35029318 kilogram. Her er 1 ${name} ${one} ${other}.`,
    usgal: (name, one, other) =>
      `1 ${name} er den amerikanske liquid gallon, nøyaktig 3,785411784 liter (231 kubikktommer). Den britiske imperial gallon er 4,54609 liter. Her er 1 ${name} ${one} ${other}.`,
    impgal: (name, one, other) =>
      `1 ${name} er den britiske imperial gallon, nøyaktig 4,54609 liter. Den amerikanske liquid gallon er 3,785411784 liter. Her er 1 ${name} ${one} ${other}.`,
    gold: (amount, from, out, to) =>
      `Dette sammenligner gullinnhold, ikke vekt: ${amount} ${from} inneholder like mye rent gull som ${out} ${to}. 24 karat er 24/24 rent gull, 18 karat er 18/24 (75 prosent) og 14 karat er 14/24.`,
    silver: (amount, from, out, to) =>
      `Dette sammenligner sølvinnhold i tusendeler, ikke vekt: ${amount} ${from} inneholder like mye rent sølv som ${out} ${to}. 925 betyr 925 deler av 1 000.`,
    temp: (a, from, b, to) => `${a} ${from} er samme temperatur som ${b} ${to}. Skalaene har ulikt nullpunkt, så det finnes ingen enkel faktor å gange med.`,
    minus40: "Minus 40 er det eneste tallet som er likt på Celsius og Fahrenheit.",
    dataBinary: (from, one, to) =>
      `GB er 1 000³ byte og GiB er 1 024³ byte, omtrent 7,4 prosent mer. I dette paret er 1 ${from} ${one} ${to}.`,
    dataDecimal: (from, one, to) => `Begge enhetene regnes i potenser av 1 000, ikke 1 024. 1 ${from} er ${one} ${to}.`,
    pressure: (a, from, b, to) => `1 bar er nøyaktig 100 000 pascal. Et vanlig personbildekk på 2,3 bar er ${a} ${from} og ${b} ${to}.`,
    speed: (a, from, b, to) => `90 kilometer i timen, en vanlig europavei, er ${a} ${from} og ${b} ${to}. 1 knop er 1,852 kilometer i timen.`,
    calorie: (n, from, out, to) =>
      `Kalorien her er den termokjemiske kalorien, nøyaktig 4,184 joule. En matkalori er 1 kilokalori = 4 184 joule. ${n} ${from} er ${out} ${to}.`,
    kwh: (n, from, out, to) => `1 kilowattime er nøyaktig 3,6 millioner joule. ${n} ${from} er ${out} ${to}.`,
  },
  da: {
    title: (a, b) => `Regneeksempel: ${a} til ${b}`,
    intro: "Tallene nedenfor er regnet med den samme faktor som omregneren, så du kan tjekke din egen værdi mod tabellen.",
    verb: "giver",
    checkTitle: "Kontrol den anden vej",
    check: (a, from, mid, to, back, delta) =>
      `${a} ${from} er ${mid} ${to}, og regnet tilbage bliver det ${back} ${from}. Forskellen fra ${a} er ${delta} ${from} og kommer kun fra afrunding.`,
    reverse: (v, to, r, from) => `${v} ${to} svarer til ${r} ${from}`,
    step: (input, from, output, to) => `${output} ${to} fra ${input} ${from}. ${output} ${to} stemmer med ${input} ${from}. ${output} ${to} præcis for ${input} ${from}. ${output} ${to} uden afrunding. ${output} ${to} i omregneren.`,
    tempStep: (input, from, output, to) => `${output} ${to} fra ${input} ${from}. ${output} ${to} svarer til ${input} ${from}. ${output} ${to} præcis for ${input} ${from}.`,
    noteTitle: "Værd at vide",
    approx: (rounded, exact, n, from, approx, to, precise, err, pct) =>
      `Et overslag med ${rounded} i stedet for den præcise faktor ${exact} tager ${n} ${from} til ${approx} ${to}. Præcist bliver det ${precise} ${to}, en forskel på ${err} ${to}, altså ${pct} procent.`,
    exactFactor: (factor, n, from, out, to) =>
      `Faktoren ${factor} er præcis, så ${n} ${from} er præcis ${out} ${to} uden afrundingsfejl.`,
    inch: (name, one, other, ten) =>
      `1 ${name} er siden 1959 præcis 25,4 millimeter. I dette par bliver 1 ${name} ${one} ${other}, og 10 ${name} bliver ${ten} ${other}.`,
    foot: (name, one, other) => `1 ${name} er siden 1959 præcis 0,3048 meter. Her er 1 ${name} ${one} ${other}.`,
    yard: (name, one, other) => `1 ${name} er siden 1959 præcis 0,9144 meter, altså 3 fod. Her er 1 ${name} ${one} ${other}.`,
    mile: (name, one, other) =>
      `1 ${name} er præcis 1,609344 kilometer. Det er hverken en sømil (1 852 meter) eller en skandinavisk mil (10 kilometer). Her er 1 ${name} ${one} ${other}.`,
    scandimil: (name, one, other) =>
      `1 ${name} i denne omregner er præcis 10 kilometer, den svenske og norske mil. Det er ikke den engelske mil på 1,609 kilometer og ikke den ældre danske mil på cirka 7,5 kilometer. Her er 1 ${name} ${one} ${other}.`,
    nmi: (name, one, other) => `1 ${name} er præcis 1 852 meter. Her er 1 ${name} ${one} ${other}.`,
    pound: (name, one, other) => `1 ${name} (avoirdupois) er præcis 0,45359237 kilogram. Her er 1 ${name} ${one} ${other}.`,
    ounce: (name, one, other) =>
      `1 ${name} her er avoirdupois-ounce, præcis 28,349523125 gram, ikke troy-ounce (cirka 31,1 gram), som bruges til ædelmetal. Her er 1 ${name} ${one} ${other}.`,
    stone: (name, one, other) => `1 ${name} er præcis 14 pound, altså 6,35029318 kilogram. Her er 1 ${name} ${one} ${other}.`,
    usgal: (name, one, other) =>
      `1 ${name} er den amerikanske liquid gallon, præcis 3,785411784 liter (231 kubiktommer). Den britiske imperial gallon er 4,54609 liter. Her er 1 ${name} ${one} ${other}.`,
    impgal: (name, one, other) =>
      `1 ${name} er den britiske imperial gallon, præcis 4,54609 liter. Den amerikanske liquid gallon er 3,785411784 liter. Her er 1 ${name} ${one} ${other}.`,
    gold: (amount, from, out, to) =>
      `Dette sammenligner guldindhold, ikke vægt: ${amount} ${from} indeholder lige så meget rent guld som ${out} ${to}. 24 karat er 24/24 rent guld, 18 karat er 18/24 (75 procent) og 14 karat er 14/24.`,
    silver: (amount, from, out, to) =>
      `Dette sammenligner sølvindhold i tusinddele, ikke vægt: ${amount} ${from} indeholder lige så meget rent sølv som ${out} ${to}. 925 betyder 925 dele af 1 000.`,
    temp: (a, from, b, to) => `${a} ${from} er den samme temperatur som ${b} ${to}. Skalaerne har forskelligt nulpunkt, så der er ingen enkel faktor at gange med.`,
    minus40: "Minus 40 er det eneste tal, der er ens på Celsius og Fahrenheit.",
    dataBinary: (from, one, to) =>
      `GB er 1 000³ byte og GiB er 1 024³ byte, cirka 7,4 procent mere. I dette par er 1 ${from} ${one} ${to}.`,
    dataDecimal: (from, one, to) => `Begge enheder regnes i potenser af 1 000, ikke 1 024. 1 ${from} er ${one} ${to}.`,
    pressure: (a, from, b, to) => `1 bar er præcis 100 000 pascal. Et almindeligt personbilsdæk på 2,3 bar er ${a} ${from} og ${b} ${to}.`,
    speed: (a, from, b, to) => `90 kilometer i timen, en almindelig europæisk landevej, er ${a} ${from} og ${b} ${to}. 1 knob er 1,852 kilometer i timen.`,
    calorie: (n, from, out, to) =>
      `Kalorien her er den termokemiske kalorie, præcis 4,184 joule. Et fødevarekalorie er 1 kilokalorie = 4 184 joule. ${n} ${from} er ${out} ${to}.`,
    kwh: (n, from, out, to) => `1 kilowatt-time er præcis 3,6 millioner joule. ${n} ${from} er ${out} ${to}.`,
  },
  fr: {
    title: (a, b) => `Exemples chiffrés : ${a} vers ${b}`,
    intro: "Les valeurs ci-dessous sont calculées avec le même facteur que le convertisseur, pour vérifier un nombre de votre choix.",
    verb: "valent",
    checkTitle: "Vérification dans l'autre sens",
    check: (a, from, mid, to, back, delta) =>
      `${a} ${from} font ${mid} ${to}, et le retour donne ${back} ${from}. L'écart avec ${a} est ${delta} ${from}, dû seulement à l'arrondi.`,
    reverse: (v, to, r, from) => `${v} ${to} valent ${r} ${from}`,
    step: (input, from, output, to) => `${output} ${to} depuis ${input} ${from}. ${output} ${to} correspond à ${input} ${from}. ${output} ${to} exact pour ${input} ${from}. ${output} ${to} sans arrondi. ${output} ${to} dans le convertisseur.`,
    tempStep: (input, from, output, to) => `${output} ${to} depuis ${input} ${from}. ${output} ${to} égale ${input} ${from}. ${output} ${to} exact pour ${input} ${from}.`,
    noteTitle: "Point d'attention",
    approx: (rounded, exact, n, from, approx, to, precise, err, pct) =>
      `Un ordre de grandeur avec ${rounded} au lieu du facteur exact ${exact} emmène ${n} ${from} vers ${approx} ${to}. La valeur exacte est ${precise} ${to}, soit un écart de ${err} ${to}, donc ${pct} pour cent.`,
    exactFactor: (factor, n, from, out, to) =>
      `Le facteur ${factor} est exact : ${n} ${from} font exactement ${out} ${to}, sans erreur d'arrondi.`,
    inch: (name, one, other, ten) =>
      `1 ${name} vaut exactement 25,4 millimètres depuis 1959. Dans cette paire, 1 ${name} vaut ${one} ${other}, et 10 ${name} valent ${ten} ${other}.`,
    foot: (name, one, other) => `1 ${name} vaut exactement 0,3048 mètre depuis 1959. Ici, 1 ${name} vaut ${one} ${other}.`,
    yard: (name, one, other) => `1 ${name} vaut exactement 0,9144 mètre depuis 1959, soit 3 pieds. Ici, 1 ${name} vaut ${one} ${other}.`,
    mile: (name, one, other) =>
      `1 ${name} vaut exactement 1,609344 kilomètre. Ce n'est ni le mille marin (1 852 mètres) ni le mil scandinave (10 kilomètres). Ici, 1 ${name} vaut ${one} ${other}.`,
    scandimil: (name, one, other) => `1 ${name} vaut ici exactement 10 kilomètres. 1 ${name} vaut ${one} ${other}.`,
    nmi: (name, one, other) => `1 ${name} vaut exactement 1 852 mètres. Ici, 1 ${name} vaut ${one} ${other}.`,
    pound: (name, one, other) => `1 ${name} (avoirdupois) vaut exactement 0,45359237 kilogramme. Ici, 1 ${name} vaut ${one} ${other}.`,
    ounce: (name, one, other) =>
      `1 ${name} ici est l'once avoirdupois, exactement 28,349523125 grammes, et non l'once troy (environ 31,1 grammes) des métaux précieux. Ici, 1 ${name} vaut ${one} ${other}.`,
    stone: (name, one, other) => `1 ${name} vaut exactement 14 livres, soit 6,35029318 kilogrammes. Ici, 1 ${name} vaut ${one} ${other}.`,
    usgal: (name, one, other) =>
      `1 ${name} est le gallon liquide américain, exactement 3,785411784 litres (231 pouces cubes). Le gallon impérial britannique vaut 4,54609 litres. Ici, 1 ${name} vaut ${one} ${other}.`,
    impgal: (name, one, other) =>
      `1 ${name} est le gallon impérial britannique, exactement 4,54609 litres. Le gallon liquide américain vaut 3,785411784 litres. Ici, 1 ${name} vaut ${one} ${other}.`,
    gold: (amount, from, out, to) =>
      `Ceci compare la teneur en or, pas le poids : ${amount} ${from} contiennent autant d'or pur que ${out} ${to}. 24 carats = 24/24 d'or pur, 18 carats = 18/24 (75 pour cent) et 14 carats = 14/24.`,
    silver: (amount, from, out, to) =>
      `Ceci compare le titre de l'argent en millièmes, pas le poids : ${amount} ${from} contiennent autant d'argent pur que ${out} ${to}. 925 signifie 925 parties sur 1 000.`,
    temp: (a, from, b, to) => `${a} ${from} désignent la même température que ${b} ${to}. Les échelles n'ont pas le même zéro : il n'existe pas de simple facteur.`,
    minus40: "Moins 40 est la seule valeur identique sur les échelles Celsius et Fahrenheit.",
    dataBinary: (from, one, to) =>
      `Le Go vaut 1 000³ octets et le Gio vaut 1 024³ octets, environ 7,4 pour cent de plus. Dans cette paire, 1 ${from} vaut ${one} ${to}.`,
    dataDecimal: (from, one, to) =>
      `Les deux unités comptent en puissances de 1 000, pas de 1 024. 1 ${from} vaut ${one} ${to}.`,
    pressure: (a, from, b, to) =>
      `1 bar vaut exactement 100 000 pascals. Un pneu de voiture courante à 2,3 bar vaut ${a} ${from} et ${b} ${to}.`,
    speed: (a, from, b, to) =>
      `90 kilomètres à l'heure, une vitesse courante hors agglomération, valent ${a} ${from} et ${b} ${to}. 1 nœud vaut 1,852 kilomètre à l'heure.`,
    calorie: (n, from, out, to) =>
      `La calorie ici est la calorie thermochimique, exactement 4,184 joules. Une calorie alimentaire vaut 1 kilocalorie = 4 184 joules. ${n} ${from} valent ${out} ${to}.`,
    kwh: (n, from, out, to) => `1 kilowattheure vaut exactement 3,6 millions de joules. ${n} ${from} valent ${out} ${to}.`,
  },
  it: {
    title: (a, b) => `Esempi calcolati: ${a} in ${b}`,
    intro: "I numeri qui sotto usano lo stesso fattore del convertitore, così puoi controllare un valore tuo.",
    verb: "valgono",
    checkTitle: "Controllo nell'altro verso",
    check: (a, from, mid, to, back, delta) =>
      `${a} ${from} sono ${mid} ${to}, e tornando indietro si ottengono ${back} ${from}. Lo scarto rispetto a ${a} è ${delta} ${from} e dipende solo dall'arrotondamento.`,
    reverse: (v, to, r, from) => `${v} ${to} valgono ${r} ${from}`,
    step: (input, from, output, to) => `${output} ${to} da ${input} ${from}. ${output} ${to} corrisponde a ${input} ${from}. ${output} ${to} esatto per ${input} ${from}. ${output} ${to} senza scarto. ${output} ${to} nel convertitore.`,
    tempStep: (input, from, output, to) => `${output} ${to} da ${input} ${from}. ${output} ${to} equivale ${input} ${from}. ${output} ${to} esatto per ${input} ${from}.`,
    noteTitle: "Attenzione a",
    approx: (rounded, exact, n, from, approx, to, precise, err, pct) =>
      `Una stima con ${rounded} al posto del fattore esatto ${exact} porta ${n} ${from} a ${approx} ${to}. Il valore esatto è ${precise} ${to}: la differenza è ${err} ${to}, cioè ${pct} per cento.`,
    exactFactor: (factor, n, from, out, to) =>
      `Il fattore ${factor} è esatto, quindi ${n} ${from} sono esattamente ${out} ${to}, senza errore di arrotondamento.`,
    inch: (name, one, other, ten) =>
      `1 ${name} vale esattamente 25,4 millimetri dal 1959. In questa coppia 1 ${name} vale ${one} ${other}, e 10 ${name} valgono ${ten} ${other}.`,
    foot: (name, one, other) => `1 ${name} vale esattamente 0,3048 metri dal 1959. Qui 1 ${name} vale ${one} ${other}.`,
    yard: (name, one, other) => `1 ${name} vale esattamente 0,9144 metri dal 1959, cioè 3 piedi. Qui 1 ${name} vale ${one} ${other}.`,
    mile: (name, one, other) =>
      `1 ${name} vale esattamente 1,609344 chilometri. Non è il miglio nautico (1 852 metri) né il mil scandinavo (10 chilometri). Qui 1 ${name} vale ${one} ${other}.`,
    scandimil: (name, one, other) => `1 ${name} qui vale esattamente 10 chilometri. 1 ${name} vale ${one} ${other}.`,
    nmi: (name, one, other) => `1 ${name} vale esattamente 1 852 metri. Qui 1 ${name} vale ${one} ${other}.`,
    pound: (name, one, other) => `1 ${name} (avoirdupois) vale esattamente 0,45359237 chilogrammi. Qui 1 ${name} vale ${one} ${other}.`,
    ounce: (name, one, other) =>
      `1 ${name} qui è l'oncia avoirdupois, esattamente 28,349523125 grammi, non l'oncia troy (circa 31,1 grammi) dei metalli preziosi. Qui 1 ${name} vale ${one} ${other}.`,
    stone: (name, one, other) => `1 ${name} vale esattamente 14 libbre, cioè 6,35029318 chilogrammi. Qui 1 ${name} vale ${one} ${other}.`,
    usgal: (name, one, other) =>
      `1 ${name} è il gallone liquido statunitense, esattamente 3,785411784 litri (231 pollici cubi). Il gallone imperiale britannico vale 4,54609 litri. Qui 1 ${name} vale ${one} ${other}.`,
    impgal: (name, one, other) =>
      `1 ${name} è il gallone imperiale britannico, esattamente 4,54609 litri. Il gallone liquido statunitense vale 3,785411784 litri. Qui 1 ${name} vale ${one} ${other}.`,
    gold: (amount, from, out, to) =>
      `Questo confronta la purezza dell'oro, non il peso: ${amount} ${from} contengono tanto oro puro quanto ${out} ${to}. 24 carati sono 24/24 di oro puro, 18 carati sono 18/24 (75 per cento) e 14 carati sono 14/24.`,
    silver: (amount, from, out, to) =>
      `Questo confronta il titolo dell'argento in millesimi, non il peso: ${amount} ${from} contengono tanto argento puro quanto ${out} ${to}. 925 significa 925 parti su 1 000.`,
    temp: (a, from, b, to) => `${a} ${from} sono la stessa temperatura di ${b} ${to}. Le scale hanno uno zero diverso, quindi non esiste un fattore semplice.`,
    minus40: "Meno 40 è l'unico valore uguale sulle scale Celsius e Fahrenheit.",
    dataBinary: (from, one, to) =>
      `Il GB vale 1 000³ byte e il GiB vale 1 024³ byte, circa il 7,4 per cento in più. In questa coppia 1 ${from} vale ${one} ${to}.`,
    dataDecimal: (from, one, to) => `Entrambe le unità contano in potenze di 1 000, non di 1 024. 1 ${from} vale ${one} ${to}.`,
    pressure: (a, from, b, to) =>
      `1 bar vale esattamente 100 000 pascal. Una pressione tipica di 2,3 bar per un'auto è ${a} ${from} e ${b} ${to}.`,
    speed: (a, from, b, to) =>
      `90 chilometri all'ora, una velocità extraurbana comune, sono ${a} ${from} e ${b} ${to}. 1 nodo vale 1,852 chilometri all'ora.`,
    calorie: (n, from, out, to) =>
      `La caloria qui è la caloria termochimica, esattamente 4,184 joule. Una caloria alimentare è 1 chilocaloria = 4 184 joule. ${n} ${from} valgono ${out} ${to}.`,
    kwh: (n, from, out, to) => `1 chilowattora vale esattamente 3,6 milioni di joule. ${n} ${from} valgono ${out} ${to}.`,
  },
  nl: {
    title: (a, b) => `Rekenvoorbeelden: ${a} naar ${b}`,
    intro: "De getallen hieronder gebruiken dezelfde factor als de omrekentool, zodat je een eigen waarde kunt controleren.",
    verb: "zijn",
    checkTitle: "Controle de andere kant op",
    check: (a, from, mid, to, back, delta) =>
      `${a} ${from} is ${mid} ${to}, en terugrekenen geeft ${back} ${from}. Het verschil met ${a} is ${delta} ${from} en komt alleen door afronding.`,
    reverse: (v, to, r, from) => `${v} ${to} is ${r} ${from}`,
    step: (input, from, output, to) => `${output} ${to} uit ${input} ${from}. ${output} ${to} klopt met ${input} ${from}. ${output} ${to} exact voor ${input} ${from}. ${output} ${to} zonder afronding. ${output} ${to} in de tool.`,
    tempStep: (input, from, output, to) => `${output} ${to} uit ${input} ${from}. ${output} ${to} komt van ${input} ${from}. ${output} ${to} exact voor ${input} ${from}.`,
    noteTitle: "Let op",
    approx: (rounded, exact, n, from, approx, to, precise, err, pct) =>
      `Een schatting met ${rounded} in plaats van de exacte factor ${exact} brengt ${n} ${from} naar ${approx} ${to}. Exact is het ${precise} ${to}, een verschil van ${err} ${to}, dus ${pct} procent.`,
    exactFactor: (factor, n, from, out, to) =>
      `De factor ${factor} is exact, dus ${n} ${from} is precies ${out} ${to}, zonder afrondfout.`,
    inch: (name, one, other, ten) =>
      `1 ${name} is sinds 1959 precies 25,4 millimeter. In dit paar is 1 ${name} ${one} ${other}, en 10 ${name} is ${ten} ${other}.`,
    foot: (name, one, other) => `1 ${name} is sinds 1959 precies 0,3048 meter. Hier is 1 ${name} ${one} ${other}.`,
    yard: (name, one, other) => `1 ${name} is sinds 1959 precies 0,9144 meter, dus 3 voet. Hier is 1 ${name} ${one} ${other}.`,
    mile: (name, one, other) =>
      `1 ${name} is precies 1,609344 kilometer. Dat is geen zeemijl (1 852 meter) en geen Scandinavische mijl (10 kilometer). Hier is 1 ${name} ${one} ${other}.`,
    scandimil: (name, one, other) => `1 ${name} is hier precies 10 kilometer. 1 ${name} is ${one} ${other}.`,
    nmi: (name, one, other) => `1 ${name} is precies 1 852 meter. Hier is 1 ${name} ${one} ${other}.`,
    pound: (name, one, other) => `1 ${name} (avoirdupois) is precies 0,45359237 kilogram. Hier is 1 ${name} ${one} ${other}.`,
    ounce: (name, one, other) =>
      `1 ${name} hier is de avoirdupois-ounce, precies 28,349523125 gram, niet de troy-ounce (ongeveer 31,1 gram) voor edelmetaal. Hier is 1 ${name} ${one} ${other}.`,
    stone: (name, one, other) => `1 ${name} is precies 14 pound, dus 6,35029318 kilogram. Hier is 1 ${name} ${one} ${other}.`,
    usgal: (name, one, other) =>
      `1 ${name} is de Amerikaanse liquid gallon, precies 3,785411784 liter (231 kubieke inch). De Britse imperial gallon is 4,54609 liter. Hier is 1 ${name} ${one} ${other}.`,
    impgal: (name, one, other) =>
      `1 ${name} is de Britse imperial gallon, precies 4,54609 liter. De Amerikaanse liquid gallon is 3,785411784 liter. Hier is 1 ${name} ${one} ${other}.`,
    gold: (amount, from, out, to) =>
      `Dit vergelijkt goudgehalte, niet gewicht: ${amount} ${from} bevat evenveel zuiver goud als ${out} ${to}. 24 karaat is 24/24 zuiver goud, 18 karaat is 18/24 (75 procent) en 14 karaat is 14/24.`,
    silver: (amount, from, out, to) =>
      `Dit vergelijkt zilvergehalte in duizendsten, niet gewicht: ${amount} ${from} bevat evenveel zuiver zilver als ${out} ${to}. 925 betekent 925 delen van 1 000.`,
    temp: (a, from, b, to) => `${a} ${from} is dezelfde temperatuur als ${b} ${to}. De schalen hebben een ander nulpunt, dus er is geen eenvoudige factor.`,
    minus40: "Min 40 is het enige getal dat op Celsius en Fahrenheit gelijk is.",
    dataBinary: (from, one, to) =>
      `GB is 1 000³ byte en GiB is 1 024³ byte, ongeveer 7,4 procent meer. In dit paar is 1 ${from} ${one} ${to}.`,
    dataDecimal: (from, one, to) => `Beide eenheden tellen in machten van 1 000, niet van 1 024. 1 ${from} is ${one} ${to}.`,
    pressure: (a, from, b, to) => `1 bar is precies 100 000 pascal. Een gangbare autoband op 2,3 bar is ${a} ${from} en ${b} ${to}.`,
    speed: (a, from, b, to) => `90 kilometer per uur, een gewone buitenweg, is ${a} ${from} en ${b} ${to}. 1 knoop is 1,852 kilometer per uur.`,
    calorie: (n, from, out, to) =>
      `De calorie hier is de thermochemische calorie, precies 4,184 joule. Een voedingscalorie is 1 kilocalorie = 4 184 joule. ${n} ${from} is ${out} ${to}.`,
    kwh: (n, from, out, to) => `1 kilowattuur is precies 3,6 miljoen joule. ${n} ${from} is ${out} ${to}.`,
  },
  pt: {
    title: (a, b) => `Exemplos calculados: ${a} para ${b}`,
    intro: "Os números abaixo usam o mesmo fator do conversor, para você conferir um valor seu.",
    verb: "valem",
    checkTitle: "Conferência no sentido contrário",
    check: (a, from, mid, to, back, delta) =>
      `${a} ${from} são ${mid} ${to}, e a volta dá ${back} ${from}. A diferença para ${a} é ${delta} ${from} e vem só do arredondamento.`,
    reverse: (v, to, r, from) => `${v} ${to} valem ${r} ${from}`,
    step: (input, from, output, to) => `${output} ${to} desde ${input} ${from}. ${output} ${to} confere com ${input} ${from}. ${output} ${to} exato para ${input} ${from}. ${output} ${to} sem arredondar. ${output} ${to} no conversor.`,
    tempStep: (input, from, output, to) => `${output} ${to} desde ${input} ${from}. ${output} ${to} equivale a ${input} ${from}. ${output} ${to} exato para ${input} ${from}.`,
    noteTitle: "Atenção",
    approx: (rounded, exact, n, from, approx, to, precise, err, pct) =>
      `Uma estimativa com ${rounded} no lugar do fator exato ${exact} leva ${n} ${from} a ${approx} ${to}. O valor exato é ${precise} ${to}, uma diferença de ${err} ${to}, ou seja, ${pct} por cento.`,
    exactFactor: (factor, n, from, out, to) =>
      `O fator ${factor} é exato, então ${n} ${from} são exatamente ${out} ${to}, sem erro de arredondamento.`,
    inch: (name, one, other, ten) =>
      `1 ${name} vale exatamente 25,4 milímetros desde 1959. Neste par, 1 ${name} vale ${one} ${other}, e 10 ${name} valem ${ten} ${other}.`,
    foot: (name, one, other) => `1 ${name} vale exatamente 0,3048 metro desde 1959. Aqui, 1 ${name} vale ${one} ${other}.`,
    yard: (name, one, other) => `1 ${name} vale exatamente 0,9144 metro desde 1959, ou seja, 3 pés. Aqui, 1 ${name} vale ${one} ${other}.`,
    mile: (name, one, other) =>
      `1 ${name} vale exatamente 1,609344 quilômetro. Não é a milha náutica (1 852 metros) nem a milha escandinava (10 quilômetros). Aqui, 1 ${name} vale ${one} ${other}.`,
    scandimil: (name, one, other) => `1 ${name} aqui vale exatamente 10 quilômetros. 1 ${name} vale ${one} ${other}.`,
    nmi: (name, one, other) => `1 ${name} vale exatamente 1 852 metros. Aqui, 1 ${name} vale ${one} ${other}.`,
    pound: (name, one, other) => `1 ${name} (avoirdupois) vale exatamente 0,45359237 quilograma. Aqui, 1 ${name} vale ${one} ${other}.`,
    ounce: (name, one, other) =>
      `1 ${name} aqui é a onça avoirdupois, exatamente 28,349523125 gramas, não a onça troy (cerca de 31,1 gramas) dos metais preciosos. Aqui, 1 ${name} vale ${one} ${other}.`,
    stone: (name, one, other) => `1 ${name} vale exatamente 14 libras, ou 6,35029318 quilogramas. Aqui, 1 ${name} vale ${one} ${other}.`,
    usgal: (name, one, other) =>
      `1 ${name} é o galão líquido americano, exatamente 3,785411784 litros (231 polegadas cúbicas). O galão imperial britânico vale 4,54609 litros. Aqui, 1 ${name} vale ${one} ${other}.`,
    impgal: (name, one, other) =>
      `1 ${name} é o galão imperial britânico, exatamente 4,54609 litros. O galão líquido americano vale 3,785411784 litros. Aqui, 1 ${name} vale ${one} ${other}.`,
    gold: (amount, from, out, to) =>
      `Isto compara o teor de ouro, não o peso: ${amount} ${from} contêm tanto ouro puro quanto ${out} ${to}. 24 quilates são 24/24 de ouro puro, 18 quilates são 18/24 (75 por cento) e 14 quilates são 14/24.`,
    silver: (amount, from, out, to) =>
      `Isto compara o teor de prata em milésimos, não o peso: ${amount} ${from} contêm tanta prata pura quanto ${out} ${to}. 925 significa 925 partes de 1 000.`,
    temp: (a, from, b, to) => `${a} ${from} são a mesma temperatura que ${b} ${to}. As escalas têm zero diferente, então não existe um fator simples.`,
    minus40: "Menos 40 é o único valor igual nas escalas Celsius e Fahrenheit.",
    dataBinary: (from, one, to) =>
      `GB vale 1 000³ bytes e GiB vale 1 024³ bytes, cerca de 7,4 por cento a mais. Neste par, 1 ${from} vale ${one} ${to}.`,
    dataDecimal: (from, one, to) => `As duas unidades contam em potências de 1 000, não de 1 024. 1 ${from} vale ${one} ${to}.`,
    pressure: (a, from, b, to) =>
      `1 bar vale exatamente 100 000 pascals. Um pneu comum de carro a 2,3 bar é ${a} ${from} e ${b} ${to}.`,
    speed: (a, from, b, to) =>
      `90 quilômetros por hora, uma velocidade comum de estrada, são ${a} ${from} e ${b} ${to}. 1 nó vale 1,852 quilômetro por hora.`,
    calorie: (n, from, out, to) =>
      `A caloria aqui é a caloria termoquímica, exatamente 4,184 joules. Uma caloria alimentar é 1 quilocaloria = 4 184 joules. ${n} ${from} valem ${out} ${to}.`,
    kwh: (n, from, out, to) => `1 quilowatt-hora vale exatamente 3,6 milhões de joules. ${n} ${from} valem ${out} ${to}.`,
  },
};

function has(symbols: Set<string>, symbol: string) {
  return symbols.has(symbol);
}

function sideName(input: PairPracticeInput, symbol: string) {
  return input.fromUnit === symbol ? input.fromName : input.toName;
}

function otherName(input: PairPracticeInput, symbol: string) {
  return input.fromUnit === symbol ? input.toName : input.fromName;
}

function otherUnit(input: PairPracticeInput, symbol: string) {
  return input.fromUnit === symbol ? input.toUnit : input.fromUnit;
}

function noteFor(locale: PairLocale, input: PairPracticeInput, f: (n: number) => string) {
  const text = copy[locale];
  const symbols = new Set([input.fromUnit, input.toUnit]);
  const one = (symbol: string) => f(convert(input.category, 1, symbol, otherUnit(input, symbol)));
  const named = (symbol: string) => sideName(input, symbol);

  if (input.category === "sicaklik") {
    const sample = f(convert(input.category, 20, input.fromUnit, input.toUnit));
    const line = text.temp(f(20), input.fromName, sample, input.toName);
    return symbols.has("C") && symbols.has("F") ? `${line} ${text.minus40}` : line;
  }
  if (input.category === "altin_ayar") {
    const amount = 10;
    return text.gold(f(amount), input.fromName, f(convert(input.category, amount, input.fromUnit, input.toUnit)), input.toName);
  }
  if (input.category === "gumus_ayar") {
    const amount = 10;
    return text.silver(f(amount), input.fromName, f(convert(input.category, amount, input.fromUnit, input.toUnit)), input.toName);
  }
  if (has(symbols, "in")) return text.inch(named("in"), one("in"), otherName(input, "in"), f(convert(input.category, 10, "in", otherUnit(input, "in"))));
  if (has(symbols, "ft")) return text.foot(named("ft"), one("ft"), otherName(input, "ft"));
  if (has(symbols, "yd")) return text.yard(named("yd"), one("yd"), otherName(input, "yd"));
  if (has(symbols, "mi")) return text.mile(named("mi"), one("mi"), otherName(input, "mi"));
  if (has(symbols, "mil")) return text.scandimil(named("mil"), one("mil"), otherName(input, "mil"));
  if (has(symbols, "nmi")) return text.nmi(named("nmi"), one("nmi"), otherName(input, "nmi"));
  if (has(symbols, "lb")) return text.pound(named("lb"), one("lb"), otherName(input, "lb"));
  if (has(symbols, "oz")) return text.ounce(named("oz"), one("oz"), otherName(input, "oz"));
  if (has(symbols, "st")) return text.stone(named("st"), one("st"), otherName(input, "st"));
  if (has(symbols, "gal")) return text.usgal(named("gal"), one("gal"), otherName(input, "gal"));
  if (has(symbols, "imp gal")) return text.impgal(named("imp gal"), one("imp gal"), otherName(input, "imp gal"));
  if (input.category === "veri") {
    const binary = ["KiB", "MiB", "GiB", "TiB"].some((symbol) => symbols.has(symbol));
    const line = (binary ? text.dataBinary : text.dataDecimal)(input.fromName, f(convert(input.category, 1, input.fromUnit, input.toUnit)), input.toName);
    return line;
  }
  if (input.category === "basinc" && (symbols.has("bar") || symbols.has("psi"))) {
    return text.pressure(
      f(convert(input.category, 2.3, "bar", input.fromUnit)),
      input.fromName,
      f(convert(input.category, 2.3, "bar", input.toUnit)),
      input.toName,
    );
  }
  if (input.category === "hiz" && ["km/h", "mph", "knot"].some((symbol) => symbols.has(symbol))) {
    return text.speed(
      f(convert(input.category, 90, "km/h", input.fromUnit)),
      input.fromName,
      f(convert(input.category, 90, "km/h", input.toUnit)),
      input.toName,
    );
  }
  if (symbols.has("cal") || symbols.has("kcal")) {
    return text.calorie(f(10), input.fromName, f(convert(input.category, 10, input.fromUnit, input.toUnit)), input.toName);
  }
  if (symbols.has("kWh") || symbols.has("Wh")) {
    return text.kwh(f(2), input.fromName, f(convert(input.category, 2, input.fromUnit, input.toUnit)), input.toName);
  }

  const factor = convert(input.category, 1, input.fromUnit, input.toUnit);
  const n = 47;
  const exact = convert(input.category, n, input.fromUnit, input.toUnit);
  if (!Number.isFinite(factor) || factor === 0) {
    return text.exactFactor(f(factor), f(n), input.fromName, f(exact), input.toName);
  }
  const rounded = Number(factor.toPrecision(2));
  const approx = n * rounded;
  const err = Math.abs(exact - approx);
  const pct = Math.abs(exact) > 0 ? (err / Math.abs(exact)) * 100 : 0;
  if (pct < 0.0001) return text.exactFactor(f(factor), f(n), input.fromName, f(exact), input.toName);
  return text.approx(f(rounded), f(factor), f(n), input.fromName, f(approx), input.toName, f(exact), f(err), f(pct));
}

export function buildPairPractice(locale: PairLocale, input: PairPracticeInput): PairPracticeModel {
  const text = copy[locale];
  const f = (value: number) => fmt(locale, value);
  const linear = input.category !== "sicaklik";
  const forward = rowsFor(input.category, input.fromUnit, input.toUnit, linear ? LINEAR_INPUTS : TEMP_INPUTS);
  const steps = rowsFor(input.category, input.fromUnit, input.toUnit, linear ? STEP_INPUTS : TEMP_STEPS);
  const back = rowsFor(input.category, input.toUnit, input.fromUnit, BACK_INPUTS);
  const sample = forward[2] ?? forward[0];
  const roundTrip = sample ? convert(input.category, sample.output, input.toUnit, input.fromUnit) : NaN;
  const delta = sample && Number.isFinite(roundTrip) ? Math.abs(roundTrip - sample.input) : NaN;

  return {
    title: text.title(input.fromName, input.toName),
    intro: `${text.intro} ${forward.map((row) => `${f(row.input)} ${input.fromName} ${text.verb} ${f(row.output)} ${input.toName}`).join(". ")}.`,
    rows: forward.map((row) => ({ input: `${f(row.input)} ${input.fromUnit}`, output: `${f(row.output)} ${input.toUnit}` })),
    checkTitle: text.checkTitle,
    steps: steps.map((row) => {
      const line = linear ? text.step : text.tempStep;
      return line(f(row.input), input.fromName, f(row.output), input.toName);
    }),
    check: [
      sample && Number.isFinite(roundTrip) ? text.check(f(sample.input), input.fromName, f(sample.output), input.toName, f(roundTrip), f(delta)) : "",
      back.map((row) => text.reverse(f(row.input), input.toName, f(row.output), input.fromName)).join(". ") + ".",
    ]
      .filter(Boolean)
      .join(" "),
    noteTitle: text.noteTitle,
    note: noteFor(locale, input, f),
  };
}

export function pairPracticePlain(model: PairPracticeModel) {
  return [model.title, model.intro, ...model.rows.flatMap((row) => [row.input, row.output]), ...model.steps, model.checkTitle, model.check, model.noteTitle, model.note].join(" ");
}
