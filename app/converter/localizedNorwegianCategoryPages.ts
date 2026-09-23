// Norske kategorisider -- integrert i det nye i18n-systemet.
// Frittstaende, ny fil (endrer ingen eksisterende tr/en/de/ar/uz/bn/fr/es/pt/it/nl/sv-filer).
//
// Bevisst begrenset til de 17 elementene som utgjor sidens identitet
// (13 karnekategorier + 4 universelle verktoy pa forsiden) -- ingen
// vitenskapelige eller hverdagslige kalkulatorer. Innhold oversatt direkte
// fra TR-kildeartiklene (app/converter/categoryArticles.ts og
// app/converter/articles/*/Article.ts), ikke fra et mellomsprak.

export type LocalizedNorwegianCategoryFact = {
  label: string;
  value: string;
};

export type LocalizedNorwegianCategorySection = {
  title: string;
  paragraphs: string[];
};

export type LocalizedNorwegianCategoryUnitRow = {
  name: string;
  symbol: string;
  referenceValue: string;
  system: string;
  commonUse: string;
};

export type LocalizedNorwegianCategoryPage = {
  locale: "no";
  slug: string;
  sourceSlug: string;
  category: string;
  title: string;
  description: string;
  introduction: string[];
  facts: LocalizedNorwegianCategoryFact[];
  sections: LocalizedNorwegianCategorySection[];
  unitTable: LocalizedNorwegianCategoryUnitRow[];
};

export const norwegianCategoryPages: LocalizedNorwegianCategoryPage[] = [
  {
    locale: "no",
    slug: "lengde",
    sourceSlug: "uzunluk",
    category: "uzunluk",
    title: "Omregn lengdeenheter",
    description:
      "Regn gratis og direkte om mellom meter, kilometer, centimeter, mil og fot; se formler og tabeller.",
    introduction: [
      "Lengde er den fysiske storrelsen som beskriver avstanden mellom to punkter eller utstrekningen til et objekt i en bestemt retning. I vitenskapelige malinger er meter grunnenheten for lengde i Det internasjonale enhetssystemet (SI).",
      "I dagliglivet og i vitenskapelig arbeid brukes ulike lengdeenheter -- som nanometer, mikrometer, millimeter, centimeter, meter og kilometer -- avhengig av storrelsen pa avstanden som males.",
      "Enheter utenfor det metriske systemet, som tomme, fot, yard og mile, brukes fortsatt, saerlig i sammenhenger knyttet til USA og Storbritannia.",
    ],
    facts: [
      { label: "SI-grunnenhet", value: "Meter" },
      { label: "SI-enhetssymbol", value: "m" },
      { label: "Fysisk storrelse", value: "Lengde" },
      { label: "Dimensjonssymbol", value: "L" },
      { label: "Gjeldende meterdefinisjon", value: "Avstanden lyset tilbakelegger i vakuum pa 1/299 792 458 sekund" },
    ],
    sections: [
      {
        title: "Hva er lengde?",
        paragraphs: [
          "Lengde er en av de grunnleggende fysiske storrelsene som brukes til a beskrive hoyden, bredden, tykkelsen til et objekt eller avstanden mellom to punkter. Avhengig av malretningen kan et og samme objekt ha flere ulike lengdeverdier.",
          "I fysikk betegnes lengde vanligvis med dimensjonssymbolet L. Lengdedimensjonen brukes til a definere mange avledede storrelser, som areal, volum, hastighet, akselerasjon, trykk og tetthet.",
        ],
      },
      {
        title: "SI-enheten for lengde",
        paragraphs: [
          "I Det internasjonale enhetssystemet er grunnenheten for lengde meter, som betegnes med symbolet m. Meter er referansen som brukes til a definere alle andre lengdeenheter.",
          "Metriske enheter som kilometer, centimeter, millimeter, mikrometer og nanometer er knyttet til meteren gjennom desimale multipler og delenheter. Denne strukturen gjor at omregning mellom metriske enheter kan gjores ved hjelp av tierpotenser.",
        ],
      },
      {
        title: "Den vitenskapelige definisjonen av meteren",
        paragraphs: [
          "Meteren ble tidligere definert ut fra jordens dimensjoner og fysiske malestaver. Etter hvert som maleteknologien utviklet seg, oppsto behovet for en mer stabil definisjon som kunne reproduseres overalt i verden.",
          "I dag defineres en meter som lengden lyset tilbakelegger i vakuum i et tidsintervall pa 1/299 792 458 sekund. Denne definisjonen bygger pa at lysets hastighet i vakuum er fastsatt til noyaktig 299 792 458 meter per sekund.",
        ],
      },
      {
        title: "Metriske lengdeenheter",
        paragraphs: [
          "I det metriske systemet er enhetene knyttet til meteren gjennom positive eller negative potenser av tallet 10. En kilometer tilsvarer 1000 meter, en centimeter tilsvarer 0,01 meter, og en millimeter tilsvarer 0,001 meter.",
          "For svaert sma lengder brukes mikrometer, nanometer og pikometer. Celler males ofte i mikrometer, lysbolgelengder i nanometer, og enkelte avstander pa atomart niva kan uttrykkes i pikometer.",
        ],
      },
      {
        title: "Lengdeenheter utenfor det metriske systemet",
        paragraphs: [
          "Tomme, fot, yard og engelsk mil er vanlige lengdeenheter utenfor det metriske systemet. Disse enhetene brukes saerlig i det amerikanske malesystemet og enkelte praksiser knyttet til britisk maletradisjon.",
          "En tomme tilsvarer noyaktig 2,54 centimeter, en fot tilsvarer 12 tommer, og en yard tilsvarer 3 fot. En engelsk mil er definert til noyaktig 1609,344 meter.",
        ],
      },
      {
        title: "Lengde i sjofart og luftfart",
        paragraphs: [
          "I sjofart og luftfart uttrykkes avstander vanligvis i nautiske mil. En nautisk mil tilsvarer noyaktig 1852 meter.",
          "Den nautiske milen er utviklet fra en historisk maletilnaerming knyttet til jordens geografiske koordinater. Fartsenheten knop betyr ogsa nautiske mil per time.",
        ],
      },
      {
        title: "Hvordan males lengde?",
        paragraphs: [
          "I hverdagslige malinger brukes verktoy som linjal, maleband, skyvelaer og mikrometer. Presisjonen til maleredskapet velges ut fra storrelsen pa objektet som males og noyaktighetsniva som kreves.",
          "I ingenior- og forskningssammenheng kan laseravstandsmalere, koordinatmalemaskiner, interferometre og ulike optiske malesystemer benyttes.",
        ],
      },
      {
        title: "Malenoyaktighet og usikkerhet",
        paragraphs: [
          "Ingen fysisk maling er absolutt feilfri. Det finnes alltid en viss usikkerhet i maleresultatet, som skyldes instrumentets opplosning, kalibrering, miljoforhold og metoden som brukes.",
          "Derfor bor ikke bare den malte verdien, men ogsa maleusikkerheten og enheten som er brukt, oppgis i vitenskapelige resultater. Saerlig i presist ingeniorarbeid kan selv temperaturendringer pavirke lengden til et materiale.",
        ],
      },
      {
        title: "Hvordan regnes lengdeenheter om?",
        paragraphs: [
          "Ved omregning innenfor samme malesystem brukes forholdet mellom enhetene. For eksempel deles verdien pa 1000 for a regne meter om til kilometer, og ganges med 1000 for a regne kilometer om til meter.",
          "Ved omregning mellom det metriske systemet og britiske eller amerikanske enheter ma man bruke definerte, eksakte omregningsfaktorer. For eksempel ganges verdien med 2,54 ved omregning fra tommer til centimeter.",
        ],
      },
    ],
    unitTable: [
      { name: "Nanometer", symbol: "nm", referenceValue: "0,000000001 m", system: "SI/metrisk", commonUse: "Lysbolgelengde og nanoteknologi" },
      { name: "Mikrometer", symbol: "µm", referenceValue: "0,000001 m", system: "SI/metrisk", commonUse: "Celler, partikler og presisjonsproduksjon" },
      { name: "Millimeter", symbol: "mm", referenceValue: "0,001 m", system: "SI/metrisk", commonUse: "Tekniske tegninger og sma mal" },
      { name: "Centimeter", symbol: "cm", referenceValue: "0,01 m", system: "SI/metrisk", commonUse: "Maling av hverdagsgjenstander" },
      { name: "Desimeter", symbol: "dm", referenceValue: "0,1 m", system: "SI/metrisk", commonUse: "Undervisning og enkelte volumforhold" },
      { name: "Meter", symbol: "m", referenceValue: "1 m", system: "SI", commonUse: "Grunnleggende lengdemalinger" },
      { name: "Kilometer", symbol: "km", referenceValue: "1000 m", system: "SI/metrisk", commonUse: "Vei- og geografiske avstander" },
      { name: "Tomme", symbol: "in", referenceValue: "0,0254 m", system: "Britisk/amerikansk", commonUse: "Skjermer, ror og tekniske mal" },
      { name: "Fot", symbol: "ft", referenceValue: "0,3048 m", system: "Britisk/amerikansk", commonUse: "Hoyde, bygg og luftfart" },
      { name: "Yard", symbol: "yd", referenceValue: "0,9144 m", system: "Britisk/amerikansk", commonUse: "Idrettsbaner og avstandsmalinger" },
      { name: "Engelsk mil", symbol: "mi", referenceValue: "1609,344 m", system: "Britisk/amerikansk", commonUse: "Veiavstander" },
      { name: "Nautisk mil", symbol: "nmi", referenceValue: "1852 m", system: "Sjofart", commonUse: "Sjofart og luftfart" },
    ],
  },
  {
    locale: "no",
    slug: "areal",
    sourceSlug: "alan",
    category: "alan",
    title: "Omregn arealenheter",
    description:
      "Regn gratis og direkte om mellom kvadratmeter, dekar, hektar og kvadratfot; se formler og tabeller.",
    introduction: [
      "Areal er en avledet fysisk storrelse som beskriver utstrekningen til en todimensjonal flate. Siden det oppstar ved a multiplisere en lengdeenhet med samme lengdeenhet, har areal alltid dimensjonen 'lengde i annen' (L²).",
      "I Det internasjonale enhetssystemet er den avledede enheten for areal kvadratmeter (m²). I landbruk og eiendomsmaling brukes ogsa mal, dekar og hektar; i det britiske/amerikanske systemet kvadratfot og acre; og i Sor-Asia lokale enheter som bigha, katha og decimal.",
    ],
    facts: [
      { label: "Fysisk storrelse", value: "Areal" },
      { label: "Dimensjonssymbol", value: "[L²]" },
      { label: "SI-avledet enhet", value: "Kvadratmeter" },
      { label: "SI-enhetssymbol", value: "m²" },
      { label: "Grunnformel (rektangel)", value: "Areal = Lengde × Bredde" },
    ],
    sections: [
      {
        title: "Hva er areal?",
        paragraphs: [
          "Areal beskriver storrelsen pa en flate eller et plant omrade. Hvor mye plass et jordstykke, gulvet i et rom eller et ark papir opptar, males i areal.",
          "Areal er en avledet storrelse; den fremkommer ved a multiplisere en grunnleggende lengdeenhet med seg selv. Derfor angis SI-dimensjonen til areal som L² (lengde i annen), og areal er alltid en positiv skalar storrelse.",
        ],
      },
      {
        title: "SI-enheten for areal: kvadratmeter",
        paragraphs: [
          "I Det internasjonale enhetssystemet er den avledede enheten for areal kvadratmeter (m²), som beskriver arealet til et kvadrat med sidelengde noyaktig 1 meter.",
          "Kvadratmeter er ikke en egen grunnenhet, men en avledet enhet, siden den fremkommer ved a kvadrere lengdeenheten (meter). Alle andre metriske arealenheter (som kvadratcentimeter og kvadratkilometer) er knyttet til kvadratmeter gjennom tierpotenser.",
        ],
      },
      {
        title: "Hvorfor regnes arealenheter om med et kvadratisk forhold?",
        paragraphs: [
          "Nar man regner om mellom lengdeenheter, brukes forholdet direkte, men mellom arealenheter ma dette forholdet kvadreres. For eksempel tilsvarer 1 kilometer 1000 meter, men 1 kvadratkilometer tilsvarer ikke 1000 kvadratmeter, men 1000², altsa 1 000 000 kvadratmeter.",
          "Dette skyldes at begge dimensjonene (lengde og bredde) i en arealenhet vokser eller krymper i samme forhold. A overse dette kvadratiske forholdet er den vanligste regnefeilen ved arealomregning -- for eksempel a tro at '1 km² = 1000 m²'.",
        ],
      },
      {
        title: "Metriske arealenheter",
        paragraphs: [
          "I det metriske systemet brukes kvadratmillimeter og kvadratcentimeter for sma arealer, kvadratmeter for hverdagslige malinger, og kvadratkilometer for store arealer. En kvadratcentimeter tilsvarer 0,0001 kvadratmeter, og en kvadratkilometer tilsvarer 1 000 000 kvadratmeter.",
          "For eiendomsmaling brukes ar (100 m²) og hektar, som er 100 ganger storre (10 000 m²). Hektar er den mest brukte metriske arealenheten i verden for a beskrive jordbruksarealer.",
        ],
      },
      {
        title: "Malenheten donum/dekar i Tyrkia",
        paragraphs: [
          "I Tyrkia er donum og dekar de mest brukte enhetene for a male jordbruksareal; begge tilsvarer i dag 1000 kvadratmeter og kan brukes om hverandre. Dekar er det offisielle navnet i lovgivningen om mal og vekt, mens donum er den tradisjonelle betegnelsen i dagligtale.",
          "Under det osmanske riket kunne storrelsen pa en donum variere fra 900 til 1600 m² avhengig av region. Med maleloven av 1931 ble donum standardisert til noyaktig 1000 m² ved a knytte den til dekar.",
        ],
      },
      {
        title: "Arealenheter i det britiske/amerikanske systemet",
        paragraphs: [
          "Kvadratfot (ft²) og kvadrattomme (in²) brukes for sma flater, mens acre brukes for store jordstykker i det britiske/amerikanske malesystemet. En acre tilsvarer noyaktig 4046,8564224 kvadratmeter.",
          "Den historiske opprinnelsen til acre er storrelsen pa jordet et par okser kunne pluye pa en dag. Den brukes fortsatt i eiendomsannonser i USA, Storbritannia og enkelte samveldeland.",
        ],
      },
      {
        title: "Arealenheter i Sor-Asia",
        paragraphs: [
          "I land som India, Bangladesh, Pakistan og Nepal brukes fortsatt lokale arealenheter som bigha, katha, killa, kanal, marla, guntha, biswa og decimal. Storrelsen pa disse enhetene kan variere betydelig fra region til region, selv under samme navn.",
          "For eksempel tilsvarer en bigha om lag 1338 m² i Vest-Bengal, mens den kan ha en annen verdi i en annen delstat. Derfor er det viktig a bekrefte hvilken regional standard som gjelder ved eiendomstransaksjoner med disse enhetene.",
        ],
      },
      {
        title: "Hvordan beregnes areal?",
        paragraphs: [
          "For et rektangulaert areal er formelen Areal = Lengde × Bredde. For en trekant brukes Areal = (Grunnlinje × Hoyde) / 2, og for en sirkel brukes Areal = π × Radius².",
          "For uregelmessig formede tomter finner man arealet ved a dele figuren opp i mindre rektangler/trekanter og beregne arealet til hver del for seg (eller ved koordinatbaserte polygonformler i matrikkelmalinger).",
        ],
      },
      {
        title: "Hva bor man vaere oppmerksom pa ved arealmaling?",
        paragraphs: [
          "En arealverdi oppgitt i en eiendomsannonse eller et skjote ma tolkes ut fra enheten som er brukt (m², donum, acre, bigha) og hvilken regional standard denne enheten er definert etter.",
          "Saerlig ved internasjonale eiendomstransaksjoner unngar man misforstaelser ved a se pa den eksakte kvadratmeterverdien fremfor navnelikheten til enheten; omregningsverktoyet pa denne siden sammenligner alle enheter ut fra en felles kvadratmeterreferanse.",
        ],
      },
    ],
    unitTable: [
      { name: "Kvadratmillimeter", symbol: "mm²", referenceValue: "0,000001 m²", system: "SI/metrisk", commonUse: "Tekniske tegninger og sma flater" },
      { name: "Kvadratcentimeter", symbol: "cm²", referenceValue: "0,0001 m²", system: "SI/metrisk", commonUse: "Overflateareal til sma gjenstander" },
      { name: "Kvadratmeter", symbol: "m²", referenceValue: "1 m²", system: "SI", commonUse: "Bolig-, kontor- og tomteareal" },
      { name: "Ar", symbol: "a", referenceValue: "100 m²", system: "Metrisk", commonUse: "Sma tomteparseller" },
      { name: "Donum/Dekar", symbol: "donum", referenceValue: "1000 m²", system: "Tyrkia (metrisk)", commonUse: "Maling av jordbruksareal" },
      { name: "Hektar", symbol: "ha", referenceValue: "10 000 m²", system: "Metrisk", commonUse: "Store jordbruks- og skogsarealer" },
      { name: "Kvadratkilometer", symbol: "km²", referenceValue: "1 000 000 m²", system: "SI/metrisk", commonUse: "By-, land- og geografiske arealer" },
      { name: "Kvadratfot", symbol: "ft²", referenceValue: "0,092903 m²", system: "Britisk/amerikansk", commonUse: "Boligareal (USA/Storbritannia)" },
      { name: "Kvadratyard", symbol: "yd²", referenceValue: "0,83612736 m²", system: "Britisk/amerikansk", commonUse: "Idrettsbaner og tekstil" },
      { name: "Acre", symbol: "ac", referenceValue: "4046,8564224 m²", system: "Britisk/amerikansk", commonUse: "Store jordstykker" },
      { name: "Bigha", symbol: "bigha", referenceValue: "≈1337,8 m² (varierer etter region)", system: "Sor-Asia", commonUse: "Jordbruksareal i India/Bangladesh" },
      { name: "Tsubo", symbol: "tsubo", referenceValue: "≈3,31 m²", system: "Japan", commonUse: "Japansk bolig- og tomtemaling" },
    ],
  },
  {
    locale: "no",
    slug: "volum",
    sourceSlug: "hacim",
    category: "hacim",
    title: "Omregn volumenheter",
    description:
      "Regn gratis og direkte om mellom liter, milliliter, kubikkmeter og kopper; se formler og tabeller.",
    introduction: [
      "Volum er en avledet fysisk storrelse som beskriver storrelsen pa rommet et tredimensjonalt objekt eller en beholder opptar eller kan romme. Siden det fremkommer ved a multiplisere en lengdeenhet i tre dimensjoner (lengde × bredde × hoyde), har volum dimensjonen L³ (lengde i tredje).",
      "I Det internasjonale enhetssystemet er den avledede enheten for volum kubikkmeter (m³); i dagliglivet er liter og milliliter langt vanligere. I kjokkenet brukes tradisjonelle mal som spiseskje, teskje og kopp, mens det amerikanske/britiske systemet bruker gallon, quart, pint og fluid ounce.",
    ],
    facts: [
      { label: "Fysisk storrelse", value: "Volum" },
      { label: "Dimensjonssymbol", value: "[L³]" },
      { label: "SI-avledet enhet", value: "Kubikkmeter" },
      { label: "SI-enhetssymbol", value: "m³" },
      { label: "Mest brukte enhet i dagliglivet", value: "Liter (L)" },
    ],
    sections: [
      {
        title: "Hva er volum?",
        paragraphs: [
          "Volum er storrelsen pa det tredimensjonale rommet et objekt opptar eller en beholder kan romme. Volumet til et fast objekt beskriver dets fysiske storrelse, mens volumet til en beholder beskriver hvor mye vaeske eller gass den kan inneholde.",
          "Volum er en avledet storrelse; den fremkommer ved a multiplisere en lengdeenhet i tre dimensjoner (lengde, bredde, hoyde). Derfor angis SI-dimensjonen som L³.",
        ],
      },
      {
        title: "SI-enheten for volum: kubikkmeter",
        paragraphs: [
          "I Det internasjonale enhetssystemet er den avledede enheten for volum kubikkmeter (m³), som beskriver det indre volumet til en kube der hver side er noyaktig 1 meter.",
          "Kubikkmeter brukes for store volumer (som vanntanker, betongstoping og containervolum), mens liter, som er langt mindre, foretrekkes i dagliglivet. 1 kubikkmeter tilsvarer noyaktig 1000 liter.",
        ],
      },
      {
        title: "Forholdet mellom liter og kubikkmeter",
        paragraphs: [
          "Liter er en praktisk volumenhet som er akseptert til bruk sammen med SI, men som ikke er en offisiell SI-enhet. En liter tilsvarer volumet til en kube med sidelengde 10 centimeter (1000 kubikkcentimeter).",
          "Delenhetene til liter -- desiliter, centiliter og milliliter -- brukes mye innen mat, medisin og laboratoriemalinger. En milliliter tilsvarer noyaktig en kubikkcentimeter (1 mL = 1 cm³).",
        ],
      },
      {
        title: "Hvorfor regnes volumenheter om med et kubisk forhold?",
        paragraphs: [
          "Mens lengdeenheter regnes om med et lineaert forhold og arealenheter med et kvadratisk forhold, regnes volumenheter om med et kubisk (tredje potens) forhold. For eksempel tilsvarer 1 meter 100 centimeter, men 1 kubikkmeter tilsvarer ikke 100 kubikkcentimeter, men 100³, altsa 1 000 000 kubikkcentimeter.",
          "Dette kubiske forholdet skyldes at volumet endres i tre dimensjoner samtidig, og det er den vanligste misforstaelsen ved volumomregning -- saerlig ved overgang til ikke-metriske enheter som gallon og kubikkfot krever det noye beregning.",
        ],
      },
      {
        title: "Malenheter pa kjokkenet",
        paragraphs: [
          "Mal som spiseskje, teskje og kopp som brukes i oppskrifter, er standardiserte volumenheter som sorger for at oppskrifter tilberedt i ulike kjokken gir konsekvente resultater. Vanlig aksepterte tilsvarende verdier i Tyrkia er: 1 spiseskje ≈ 15 mL, 1 teskje ≈ 5 mL, 1 kopp ≈ 200 mL.",
          "Disse malene er ikke eksakte vitenskapelige standarder, men omtrentlige verdier som er allment akseptert i kjokkenpraksis; for oppskrifter som krever presis maling (saerlig ved baking) er det mer palitelig a bruke en digital kjokkenvekt.",
        ],
      },
      {
        title: "Amerikanske og britiske vaskemal",
        paragraphs: [
          "I det amerikanske og britiske systemet brukes enheter som gallon, quart, pint og fluid ounce, men enhetsstorrelsene i disse to systemene er forskjellige. En amerikansk gallon tilsvarer 3,78541 liter, mens en britisk (imperial) gallon tilsvarer 4,54609 liter -- altsa omtrent 20 % storre.",
          "Denne forskjellen skyldes at de to landene historisk har akseptert ulike referansegalloner som standard (vingallon i USA, imperial gallon i Storbritannia). Man bor alltid sjekke hvilket system en 'gallon'- eller 'ounce'-verdi pa en oppskrift eller produktetikett tilhorer.",
        ],
      },
      {
        title: "Landbruks- og historiske volumenheter",
        paragraphs: [
          "Bushel og peck er historisk sett volumenheter som er brukt til a male torre varer som korn, frukt og gronnsaker; de brukes fremdeles i enkelte landbruksmarkeder, saerlig i USA.",
          "Under det osmanske riket var kile og sinik tradisjonelle volumenheter brukt til kornmaling; 1 kile tilsvarte 20 sinik. Selv om disse enhetene varierte noe fra region til region, brukes de fortsatt som referanse ved tolkning av historiske tekster og opptegnelser.",
        ],
      },
      {
        title: "Hvordan beregnes volum?",
        paragraphs: [
          "For et rektangulaert prisme (en boks) brukes formelen Volum = Lengde × Bredde × Hoyde. For en sylinder gjelder Volum = π × Radius² × Hoyde, og for en kule Volum = (4/3) × π × Radius³.",
          "Volumet til uregelmessig formede faste objekter kan ofte finnes ved fortrengningsmetoden (Arkimedes' prinsipp) -- ved a senke objektet i en vannfylt beholder og male volumet av vannet som renner over.",
        ],
      },
      {
        title: "Volummaling i olje- og industrisammenheng",
        paragraphs: [
          "I oljeindustrien uttrykkes volum vanligvis i fat (barrel, bbl); 1 fat tilsvarer noyaktig 158,987 liter (42 amerikanske gallon). Denne enheten stammer fra en tradisjon fra 1800-tallet da olje ble transportert i traefat for vin.",
          "I industrielle prosesser uttrykkes store volumer vanligvis i kubikkmeter, mens sma laboratoriemalinger uttrykkes i milliliter; riktig enhetsvalg gjores ut fra storrelsen pa volumet som males.",
        ],
      },
    ],
    unitTable: [
      { name: "Milliliter", symbol: "mL", referenceValue: "0,000001 m³", system: "SI/metrisk", commonUse: "Medisindoser og sma malinger" },
      { name: "Teskje", symbol: "ts", referenceValue: "0,000005 m³ (≈5 mL)", system: "Kjokkenmal", commonUse: "Oppskrifter" },
      { name: "Spiseskje", symbol: "ss", referenceValue: "0,000015 m³ (≈15 mL)", system: "Kjokkenmal", commonUse: "Oppskrifter" },
      { name: "Kopp", symbol: "kopp", referenceValue: "0,0002 m³ (≈200 mL)", system: "Tyrkia (kjokken)", commonUse: "Tyrkiske oppskrifter" },
      { name: "Liter", symbol: "L", referenceValue: "0,001 m³", system: "Metrisk", commonUse: "Drikke, drivstoff og daglig volummaling" },
      { name: "Fluid ounce (USA)", symbol: "fl oz", referenceValue: "≈0,0000296 m³ (≈29,57 mL)", system: "USA", commonUse: "Drikke- og kosmetikkemballasje" },
      { name: "Pint (USA)", symbol: "pt", referenceValue: "≈0,000473 m³ (≈473 mL)", system: "USA", commonUse: "Maling av ol og melk" },
      { name: "Gallon (USA)", symbol: "gal", referenceValue: "≈0,003785 m³ (≈3,785 L)", system: "USA", commonUse: "Drivstoff og store vaeskemengder" },
      { name: "Britisk gallon", symbol: "imp gal", referenceValue: "≈0,004546 m³ (≈4,546 L)", system: "Britisk (imperial)", commonUse: "Drivstoff- og vaeskemaling i Storbritannia" },
      { name: "Kubikkfot", symbol: "ft³", referenceValue: "≈0,0283168 m³", system: "Britisk/amerikansk", commonUse: "Bygg og HVAC-luftstrom" },
      { name: "Fat (olje)", symbol: "bbl", referenceValue: "≈0,158987 m³ (≈158,987 L)", system: "Oljeindustri", commonUse: "Maling av raolje" },
      { name: "Kubikkmeter", symbol: "m³", referenceValue: "1 m³", system: "SI", commonUse: "Vanntanker, betong og store volumer" },
    ],
  },
  {
    locale: "no",
    slug: "masse",
    sourceSlug: "kutle",
    category: "kutle",
    title: "Omregn masseenheter",
    description:
      "Regn gratis og direkte om mellom kilogram, gram, tonn og pund; se formler og tabeller.",
    introduction: [
      "Masse er en grunnleggende fysisk storrelse knyttet til mengden materie i et legeme og dets treghetsegenskap. I Det internasjonale enhetssystemet er grunnenheten for masse kilogram, og den betegnes med symbolet kg.",
      "Masse og vekt brukes ofte om hverandre i dagligtale, men de er fysisk sett ulike storrelser. Masse males i kilogram, mens vekt -- som er en kraft -- males i newton.",
    ],
    facts: [
      { label: "Fysisk storrelse", value: "Masse" },
      { label: "Dimensjonssymbol", value: "[M]" },
      { label: "SI-grunnenhet", value: "Kilogram" },
      { label: "SI-enhetssymbol", value: "kg" },
      { label: "Malevitenskapsfelt", value: "Massemetrologi" },
    ],
    sections: [
      {
        title: "Hva er masse?",
        paragraphs: [
          "Masse er den fysiske storrelsen knyttet til motstanden et legeme yter mot endring i bevegelsestilstand, altsa treghet. I klassisk mekanikk uttrykkes forholdet mellom nettokraften som virker pa et legeme og akselerasjonen den skaper, med F = m·a.",
          "Nar samme kraft pavirker to legemer, far det legemet med storst masse mindre akselerasjon. Derfor beskriver ikke masse bare mengden materie i dagligdags forstand -- den spiller ogsa en sentral rolle i bevegelsesligninger.",
          "Masse er en skalar storrelse. Den har ingen retning, og grunndimensjonssymbolet i SI-systemet betegnes med bokstaven M.",
        ],
      },
      {
        title: "Forskjellen mellom masse og vekt",
        paragraphs: [
          "Masse og vekt er ikke samme fysiske storrelse. Masse er en egenskap ved legemet og uttrykkes i kilogram. Vekt er derimot kraften legemet utsettes for i et gravitasjonsfelt, og males i newton.",
          "Den forenklede vektsammenhengen er W = m·g. Her star W for vektkraften, m for massen og g for den lokale gravitasjonsakselerasjonen.",
          "Massen til et legeme forblir tilnaermet den samme pa jorden og pa manen, men fordi den lokale gravitasjonsakselerasjonen er ulik, endres vekten. Derfor er kilogram i vitenskapelig sammenheng en masseenhet, ikke en vektenhet.",
          "I dagligtale uttrykkes veieresultatet i kilogram, og ordene 'vekt' og 'masse' brukes derfor ofte om hverandre. En vekt registrerer i realiteten en kraftpavirkning, men kalibreres til a vise resultatet i masseenheter.",
        ],
      },
      {
        title: "Hvorfor er kilogram SI-grunnenheten for masse?",
        paragraphs: [
          "I Det internasjonale enhetssystemet er grunnenheten for masse kilogram. Kilogram er den eneste SI-grunnenheten som har et prefiks i navnet sitt.",
          "Ordet gram spilte historisk en viktig rolle i de forste massedefinisjonene i det metriske systemet. Men da praktiske standarder skulle etableres, ble kilogram den grunnleggende referansen.",
          "I dag defineres ikke kilogram ut fra massen til en fysisk metallsylinder, men ut fra en fastsatt tallverdi for Plancks konstant. Sammenhengen mellom denne definisjonen, Kibble-vekten og elektriske malinger er beskrevet i detalj pa kilogram-informasjonssiden.",
        ],
      },
      {
        title: "Metriske masseenheter",
        paragraphs: [
          "Metriske masseenheter er bygget opp av kilogram, gram og SI-prefiksene som legges til disse. Et gram er 0,001 kilogram, et milligram er 0,001 gram, og et mikrogram er 0,001 milligram.",
          "For store masser brukes tonn. Et metrisk tonn tilsvarer noyaktig 1000 kilogram. Symbolet for tonn, som er akseptert til bruk sammen med SI, er liten t.",
          "Riktig enhet velges ut fra storrelsen pa massen som males. Menneske- og produktmasser kan uttrykkes i kilogram, matinnhold i gram, virkestoffer i medisiner i milligram eller mikrogram, og kjoretoylaster i tonn.",
        ],
      },
      {
        title: "Forholdet mellom pund, ounce og kilogram",
        paragraphs: [
          "Pund og ounce er masseenheter brukt i de britiske og amerikanske tradisjonelle malesystemene. Det internasjonale avoirdupois-pundet tilsvarer noyaktig 0,45359237 kilogram.",
          "Et avoirdupois-pund deles i 16 ounce. Dermed tilsvarer en ounce noyaktig 0,028349523125 kilogram, eller 28,349523125 gram.",
          "Pund brukt i massekonvertering ma ikke forveksles med kraftenheten pound-force. Pund uttrykker masse, mens pound-force uttrykker kraft. I tekniske beregninger ma symbolene lb og lbf ikke blandes sammen.",
        ],
      },
      {
        title: "Hvordan males masse?",
        paragraphs: [
          "Ved massemaling brukes likearmet vekt, elektronisk vekt, analysevekt, lastceller og industrielle veiesystemer med ulik kapasitet.",
          "Sammenlignende vekter sammenligner en ukjent masse med sporbare standardmasser. I elektroniske vekter kan lastceller omdanne den pafolgende kraften til et elektrisk signal.",
          "Ved hoypresisjonsmalinger kan faktorer som luftens oppdrift, lokal gravitasjonsakselerasjon, temperatur, fuktighet, vibrasjon, elektrostatiske effekter og tettheten til standardmassen tas med i betraktningen.",
          "At massestandarder kobles til nasjonale og internasjonale malesystemer, kalles metrologisk sporbarhet. Kalibreringskjeden gjor det mulig a sammenligne malinger utfort ved ulike laboratorier og virksomheter.",
        ],
      },
      {
        title: "Forholdet mellom tetthet, volum og masse",
        paragraphs: [
          "Mellom masse, tetthet og volum gjelder sammenhengen m = ρ·V. Her star m for masse, ρ for tetthet og V for volum.",
          "To stoffer med samme volum kan ha forskjellig masse avhengig av tettheten. For eksempel har stal og vann med samme volum ikke samme masse.",
          "I SI-systemet er grunnenheten for tetthet kilogram per kubikkmeter. I laboratoriesammenheng brukes ogsa enheter som gram per kubikkcentimeter eller gram per milliliter.",
        ],
      },
      {
        title: "Usikkerhet i massemaling",
        paragraphs: [
          "Enhver reell maling har en viss usikkerhet. At en vekt viser mange sifre pa skjermen, betyr ikke at alle sifrene er kjent med samme noyaktighet.",
          "Instrumentoppl0sning, repeterbarhet, ikke-linearitet, kalibreringsstandard, miljoforhold og brukermetode kan alle bidra til usikkerheten i en massemaling.",
          "I vitenskapelig og industrielt arbeid bor maleresultatet vurderes sammen med riktig enhet, gjeldende sifre og usikkerhetsinformasjon.",
        ],
      },
      {
        title: "Hvordan velges riktig masseenhet?",
        paragraphs: [
          "A velge en enhet som passer til storrelsen pa objektet som males, gjor resultatet mer lesbart. Massen til et menneske kan uttrykkes i kilogram, virkestoffet i en tablett i milligram, og lasten til en lastebil i tonn.",
          "For svaert sma masser kan SI-prefikserte enheter som mikrogram, nanogram og pikogram brukes. Pa atom- og molekylskala kan spesielle enheter som den forente atommasseenheten vaere mer praktiske.",
          "Ved enhetsomregning ma man ikke bare kontrollere den numeriske verdien, men ogsa om enheten som brukes, uttrykker masse eller kraft.",
        ],
      },
    ],
    unitTable: [
      { name: "Nanogram", symbol: "ng", referenceValue: "10⁻¹² kg", system: "SI", commonUse: "Svaert sma stoffmengder" },
      { name: "Mikrogram", symbol: "µg", referenceValue: "10⁻⁹ kg", system: "SI", commonUse: "Medisin- og laboratoriemalinger" },
      { name: "Milligram", symbol: "mg", referenceValue: "10⁻⁶ kg", system: "SI", commonUse: "Medisindoser og kjemikalier" },
      { name: "Gram", symbol: "g", referenceValue: "0,001 kg", system: "SI", commonUse: "Mat og sma gjenstander" },
      { name: "Kilogram", symbol: "kg", referenceValue: "1 kg", system: "SI", commonUse: "Grunnleggende massemalinger" },
      { name: "Tonn", symbol: "t", referenceValue: "1000 kg", system: "Metrisk", commonUse: "Kjoretoy, last og industri" },
      { name: "Ounce", symbol: "oz", referenceValue: "0,028349523125 kg", system: "Britisk/amerikansk", commonUse: "Mat og sma masser" },
      { name: "Pund", symbol: "lb", referenceValue: "0,45359237 kg", system: "Britisk/amerikansk", commonUse: "Kropps- og produktmasse" },
    ],
  },
  {
    locale: "no",
    slug: "temperatur",
    sourceSlug: "sicaklik",
    category: "sicaklik",
    title: "Omregn temperaturenheter",
    description:
      "Regn gratis og direkte om mellom Celsius, Fahrenheit og Kelvin; se formler og tabeller.",
    introduction: [
      "Temperatur er en grunnleggende fysisk storrelse knyttet til den gjennomsnittlige kinetiske energien til partiklene i et stoff, som beskriver hvor 'varmt' eller 'kaldt' stoffet er. I Det internasjonale enhetssystemet er grunnenheten for temperatur kelvin.",
      "I dagliglivet er Celsius og Fahrenheit de mest brukte skalaene; i vitenskapelig arbeid brukes kelvin, i enkelte ingeniorberegninger Rankine, og i historiske tekster Reaumur. I motsetning til de fleste andre fysiske storrelser krever omregning mellom temperaturenheter bade multiplikasjon og addisjon/subtraksjon.",
    ],
    facts: [
      { label: "Fysisk storrelse", value: "Temperatur (termodynamisk temperatur)" },
      { label: "Dimensjonssymbol", value: "[Θ]" },
      { label: "SI-grunnenhet", value: "Kelvin" },
      { label: "SI-enhetssymbol", value: "K" },
      { label: "Absolutt nullpunkt", value: "0 K = -273,15 °C = -459,67 °F" },
    ],
    sections: [
      {
        title: "Hva er temperatur?",
        paragraphs: [
          "Temperatur er en storrelse direkte knyttet til den gjennomsnittlige kinetiske (bevegelses-)energien til atomene og molekylene som utgjor et stoff. Jo raskere partiklene beveger seg, desto 'varmere' anses stoffet a vaere.",
          "Temperatur er en av de sju grunnleggende storrelsene i Det internasjonale enhetssystemet og betegnes som termodynamisk temperatur med symbolet Θ (theta). I motsetning til mange andre storrelser (som lengde og masse) er den ikke en direkte additiv storrelse -- a slaa sammen to legemer summerer ikke temperaturene deres, men fører dem mot en likevekt.",
        ],
      },
      {
        title: "SI-enheten for temperatur: kelvin",
        paragraphs: [
          "Kelvin er SI-grunnenheten for temperatur og betegnes med symbolet K (uten gradetegn, kun 'K' skrives). Kelvin-skalaen bruker det absolutte nullpunktet (den teoretisk lavest mulige temperaturen) som utgangspunkt (0 K).",
          "Med SI-revisjonen i 2019 defineres kelvin ikke lenger ut fra trippelpunktet til vann, men ut fra en fastsatt tallverdi for Boltzmann-konstanten (k). Dette sikrer at temperaturenheten er knyttet til en universell konstant, ikke et fysisk referansestoff.",
        ],
      },
      {
        title: "Hvorfor er ikke temperaturomregning bare multiplikasjon?",
        paragraphs: [
          "Ved enhetsomregning for storrelser som lengde eller masse brukes bare en multiplikasjonsfaktor (for eksempel meter-centimeter). For temperatur har Celsius-, Fahrenheit- og Kelvin-skalaene ulike 'nullpunkter', sa omregningen krever bade multiplikasjon og addisjon/subtraksjon.",
          "For eksempel ganges verdien forst med 9/5 og deretter legges 32 til nar man gar fra Celsius til Fahrenheit: °F = (°C × 9/5) + 32. Derfor er temperatur den eneste vanlige fysiske storrelsen som har et 'affint' (lineaert, men ikke gjennom origo) omregningsforhold.",
        ],
      },
      {
        title: "Celsius-skalaen",
        paragraphs: [
          "Celsius-skalaen ble utviklet i 1742 av den svenske astronomen Anders Celsius, og definerer vannets frysepunkt til 0 °C og kokepunkt (ved 1 atmosfaeres trykk) til 100 °C. Dette er et praktisk referansesystem som gjor skalaen lett a forsta i dagliglivet.",
          "Celsius er den mest brukte temperaturskalaen i vitenskapelig arbeid og i vaerrapportering i de fleste land i verden; et fatall land, som USA, foretrekker fortsatt Fahrenheit i dagligbruk.",
        ],
      },
      {
        title: "Fahrenheit-skalaen",
        paragraphs: [
          "Fahrenheit-skalaen ble utviklet i 1724 av den tyske fysikeren Daniel Gabriel Fahrenheit. Pa denne skalaen er vannets frysepunkt 32 °F og kokepunkt 212 °F -- et intervall pa hele 180 grader mellom frysing og koking.",
          "Fahrenheit brukes i dag hovedsakelig i USA og et fatall andre land til daglig temperaturmaling; i vitenskapelig arbeid har den i stor grad blitt erstattet av Celsius og kelvin verden over.",
        ],
      },
      {
        title: "Rankine og Reaumur: mindre kjente skalaer",
        paragraphs: [
          "Rankine er en absolutt temperaturskala som bruker enheter pa storrelse med Fahrenheit-grader, men som setter det absolutte nullpunktet til 0 °R; vannets frysepunkt er 491,67 °R. Den foretrekkes fremfor kelvin i enkelte termodynamiske ingeniorberegninger, saerlig i USA.",
          "Reaumur-skalaen ble utviklet pa 1700-tallet av den franske vitenskapsmannen Rene Reaumur; den setter vannets frysepunkt til 0 °Re og kokepunkt til 80 °Re. Den brukes naermest ikke i dag, men kan fortsatt dukke opp som en historisk referanse i enkelte europeiske land (saerlig i noen tradisjonelle russiske oppskrifter).",
        ],
      },
      {
        title: "Hva betyr absolutt nullpunkt?",
        paragraphs: [
          "Absolutt nullpunkt (0 kelvin, -273,15 °C, -459,67 °F) er den teoretiske temperaturen der partiklene har den lavest mulige kinetiske energien i klassisk forstand. Ifolge kvantemekanikken star ikke partikler helt stille selv ved absolutt nullpunkt (nullpunktsenergi), men i klassisk forstand kan ingen lavere temperatur defineres.",
          "Under laboratorieforhold har man oppnadd temperaturer svaert naer absolutt nullpunkt (helt ned pa mikrokelvin- og til og med nanokelvinniva), men ifolge termodynamikkens tredje lov er det umulig a na absolutt nullpunkt fullstendig i et endelig antall trinn.",
        ],
      },
      {
        title: "Hvordan males temperatur?",
        paragraphs: [
          "Ved temperaturmaling brukes ulike teknologier som kvikksolv-/alkoholtermometre, digitale termometre, termoelementer, motstandstermometre (RTD) og infrarode (kontaktlose) termometre. Hver av dem passer for ulike temperaturomrader og presisjonsniva.",
          "Termoelementer brukes ofte i industrielle miljoer fordi de kan fungere over et svaert bredt temperaturomrade (noen ganger fra -200 °C til +2000 °C); de beregner temperaturen ut fra spenningsforskjellen som oppstar der to ulike metaller mates.",
        ],
      },
    ],
    unitTable: [
      { name: "Kelvin", symbol: "K", referenceValue: "Grunnenhet", system: "SI", commonUse: "Vitenskapelige og termodynamiske beregninger" },
      { name: "Celsius", symbol: "°C", referenceValue: "K = °C + 273,15", system: "Metrisk (dagligbruk)", commonUse: "Vaer, dagligliv, vitenskap" },
      { name: "Fahrenheit", symbol: "°F", referenceValue: "°F = (°C × 9/5) + 32", system: "USA", commonUse: "Daglig vaermelding i USA" },
      { name: "Rankine", symbol: "°R", referenceValue: "°R = (°C + 273,15) × 9/5", system: "USA (ingenior)", commonUse: "Termodynamiske ingeniorberegninger" },
      { name: "Reaumur", symbol: "°Re", referenceValue: "°Re = °C × 4/5", system: "Historisk (Europa)", commonUse: "Historiske tekster, tradisjonelle oppskrifter" },
    ],
  },
  {
    locale: "no",
    slug: "tid",
    sourceSlug: "zaman",
    category: "zaman",
    title: "Omregn tidsenheter",
    description:
      "Regn gratis og direkte om mellom sekunder, minutter, timer og dager; se formler og tabeller.",
    introduction: [
      "Tid er en grunnleggende fysisk storrelse som beskriver rekkefolgen av hendelser og varigheten mellom dem. I Det internasjonale enhetssystemet er grunnenheten for tid sekund, og den brukes i dagliglivet sammen med avledede enheter som minutt, time og dag.",
      "I motsetning til storrelser som lengde eller masse er tid et av menneskehetens eldste malebegreper; den 60-baserte strukturen til time, minutt og sekund gar tusenvis av ar tilbake, til det antikke Babylon.",
    ],
    facts: [
      { label: "Fysisk storrelse", value: "Tid" },
      { label: "Dimensjonssymbol", value: "[T]" },
      { label: "SI-grunnenhet", value: "Sekund" },
      { label: "SI-enhetssymbol", value: "s" },
      { label: "Gjeldende sekunddefinisjon", value: "9 192 631 770 svingningsperioder til et cesium-133-atom" },
    ],
    sections: [
      {
        title: "Hva er tid?",
        paragraphs: [
          "Tid er en grunnleggende storrelse som beskriver rekkefolgen hendelser skjer i, og varigheten mellom to hendelser. I fysikk betegnes den med dimensjonssymbolet T og inngar i definisjonen av mange avledede storrelser, som hastighet, akselerasjon og frekvens.",
          "Mens tid i klassisk fysikk ble ansett som en absolutt storrelse som fl0t likt for alle observatorer, har Einsteins relativitetsteori vist at tiden kan flyte ulikt avhengig av observatorens hastighet og gravitasjonsfelt (tidsdilatasjon).",
        ],
      },
      {
        title: "SI-enheten for tid: sekund",
        paragraphs: [
          "Sekund er SI-grunnenheten for tid og betegnes med symbolet s. Historisk ble sekundet definert som 1/86 400 av en dag (24 timer × 60 minutter × 60 sekunder).",
          "Pa grunn av sma uregelmessigheter i jordens rotasjonshastighet ble denne definisjonen ansett som ikke stabil nok; i 1967 ble sekundet omdefinert til noyaktig 9 192 631 770 perioder av straalingen som svarer til overgangen mellom to grunnenerginivaer i cesium-133-atomet. Denne definisjonen sikrer at atomklokker fungerer med samme presisjon overalt i verden.",
        ],
      },
      {
        title: "Den 60-baserte opprinnelsen til time, minutt og sekund",
        paragraphs: [
          "At en time deles i 60 minutter og et minutt i 60 sekunder, bygger pa det 60-baserte (seksagesimale) tallsystemet som ble brukt av det antikke Babylon. Babylonerne delte bade vinkler (360 grader) og tid etter dette systemet.",
          "Grunnen til at tallet 60 ble foretrukket, er at det kan deles jevnt pa mange tall, som 2, 3, 4, 5, 6, 10, 12, 15, 20 og 30 -- dette gjorde praktisk inndeling (for eksempel a dele en time i tre eller fire) mulig uten a matte bruke brokdeler.",
        ],
      },
      {
        title: "Hvorfor er dognet delt i 24 timer?",
        paragraphs: [
          "Inndelingen av dognet i 24 timer gar tilbake til det gamle Egypt; egypterne delte dagen i 12 og natten i 12 like deler og fulgte tiden med solur og stjerneobservasjoner.",
          "Denne 12-delingen er trolig inspirert av a telle leddene pa fingrene til en hand (tre ledd pa hver av de fire fingrene utenom tommelen, totalt 12), eller av antall manesykluser i lopet av et ar (om lag 12 fullmaner).",
        ],
      },
      {
        title: "Forholdet mellom metriske tidsenheter",
        paragraphs: [
          "Delenhetene til sekundet -- millisekund (0,001 sekund), mikrosekund og nanosekund -- brukes til a male svaert korte hendelser, som datamaskinprosesser, idrettstidtaking og vitenskapelige eksperimenter.",
          "Enhetene over sekundet -- minutt (60 sekunder), time (3600 sekunder) og dogn (86 400 sekunder) -- er de grunnleggende enhetene som brukes til a folge tiden i dagliglivet. I motsetning til temperatur skjer omregning mellom disse enhetene kun ved multiplikasjon/divisjon, fordi de alle deler et felles nullpunkt (startpunkt).",
        ],
      },
      {
        title: "Hva er et skuddsekund?",
        paragraphs: [
          "Jordens rotasjonshastighet om sin egen akse viser sma uregelmessigheter over tid pa grunn av tidevannseffekter og endringer i jordens indre struktur; dette forer til et lite avvik mellom den 'eksakte' tiden malt med atomklokker og dognlengden basert pa jordens faktiske rotasjon.",
          "For a kompensere for dette avviket har det siden 1972 blitt lagt til et 'skuddsekund' i Koordinert universaltid (UTC) ved behov. Dette er en korreksjonsmekanisme som ligner den ekstra dagen i skuddar (29. februar), men fordi uregelmessigheten i jordens rotasjonshastighet er uforutsigbar, legges skuddsekunder til ved behov og ikke etter en fast kalendersyklus.",
        ],
      },
      {
        title: "Tidssoner og UTC",
        paragraphs: [
          "Jorden er delt inn i om lag 24 tidssoner fordi solen nar sitt hoyeste punkt pa ulike tidspunkter avhengig av lengdegrad. Alle tidssoner bruker Koordinert universaltid (UTC) som referansepunkt og uttrykkes som en tidsforskjell fra denne referansen for sin egen region (Norge er for eksempel UTC+1 om vinteren).",
          "UTC er en moderne tidsstandard som har erstattet den gamle Greenwich middeltid (GMT) og opprettholdes med atomklokker; GMT brukes na mest som navnet pa Storbritannias vintertidssone.",
        ],
      },
      {
        title: "Hvordan males tid?",
        paragraphs: [
          "I dagliglivet brukes mekaniske og digitale klokker, mens atomklokker brukes i vitenskapelige og teknologiske anvendelser (som GPS-satellitter og telekommunikasjonsnett). Atomklokker fungerer med ekstremt hoy presisjon basert pa den stabile svingningsfrekvensen til cesium- eller rubidiumatomer.",
          "For at GPS-systemet skal kunne fastsla posisjon noyaktig, ma atomklokkene i satellittene vaere synkronisert pa nanosekundniva; selv et lite avvik i disse klokkene kan fore til store feil i posisjonsberegningen pa bakken.",
        ],
      },
    ],
    unitTable: [
      { name: "Millisekund", symbol: "ms", referenceValue: "0,001 s", system: "SI/metrisk", commonUse: "Databehandling og idrettstidtaking" },
      { name: "Sekund", symbol: "s", referenceValue: "1 s", system: "SI", commonUse: "Grunnleggende tidsmaling" },
      { name: "Minutt", symbol: "min", referenceValue: "60 s", system: "Akseptert til bruk sammen med SI", commonUse: "Daglig tidsfolging" },
      { name: "Time", symbol: "t", referenceValue: "3600 s", system: "Akseptert til bruk sammen med SI", commonUse: "Arbeidstid, reisetid" },
      { name: "Dogn", symbol: "d", referenceValue: "86 400 s", system: "Akseptert til bruk sammen med SI", commonUse: "Kalender- og varighetsberegninger" },
    ],
  },
  {
    locale: "no",
    slug: "hastighet",
    sourceSlug: "hiz",
    category: "hiz",
    title: "Omregn hastighetsenheter",
    description:
      "Regn gratis og direkte om mellom km/t, m/s, mph og knop; se formler og tabeller.",
    introduction: [
      "Hastighet er en avledet fysisk storrelse som beskriver strekningen et legeme tilbakelegger per tidsenhet. Siden den fremkommer ved a dele lengde pa tid, har hastighet dimensjonen L/T (lengde delt pa tid).",
      "I dagliglivet er kilometer i timen (km/t) og engelske mil i timen (mph) de mest brukte hastighetsenhetene; i vitenskapelig arbeid foretrekkes meter per sekund (m/s), og i sjofart og luftfart knop. Lysets hastighet har en saerskilt plass blant hastighetsenheter som en absolutt ovre grense som kan naas i universet.",
    ],
    facts: [
      { label: "Fysisk storrelse", value: "Hastighet (fart)" },
      { label: "Dimensjonssymbol", value: "[L/T]" },
      { label: "SI-avledet enhet", value: "Meter per sekund" },
      { label: "SI-enhetssymbol", value: "m/s" },
      { label: "Universell hastighetsgrense", value: "Lysets hastighet ≈ 299 792 458 m/s" },
    ],
    sections: [
      {
        title: "Hva er hastighet?",
        paragraphs: [
          "Hastighet beskriver strekningen et legeme tilbakelegger per tidsenhet, og beregnes med formelen Hastighet = Strekning / Tid. I fysikken skilles det teknisk mellom 'fart' (skalar, uten retning) og 'hastighet' (vektor, med retning), men i dagligtale brukes de ofte om hverandre.",
          "Hastighet er en avledet storrelse; den fremkommer ved a dele en lengdeenhet pa en tidsenhet. Derfor angis SI-dimensjonen som L/T (eller L¹T⁻¹).",
        ],
      },
      {
        title: "SI-enheten for hastighet: meter per sekund",
        paragraphs: [
          "I Det internasjonale enhetssystemet er den avledede enheten for hastighet meter per sekund (m/s), som beskriver at et legeme tilbakelegger en meter hvert sekund. Denne enheten brukes som standard i vitenskapelige beregninger og fysiske formler.",
          "I dagliglivet foretrekkes kilometer i timen (km/t) fremfor meter per sekund, fordi kjoretoyhastigheter og veiavstander uttrykkes med mer intuitive tall pa denne skalaen. 1 m/s tilsvarer noyaktig 3,6 km/t.",
        ],
      },
      {
        title: "Kilometer i timen og engelske mil i timen",
        paragraphs: [
          "Kilometer i timen (km/t) er standard hastighetsenhet i veitrafikken i land som bruker det metriske systemet, deriblant Norge. Engelske mil i timen (mph) foretrekkes i land som USA og Storbritannia, som bruker det britiske malesystemet.",
          "1 mph tilsvarer om lag 1,60934 km/t. Denne forskjellen er en praktisk kilde til forvirring som kan fore til feiltolkning av fartsmalere pa importerte kjoretoy eller fartsgrenser ved leiebilkjoring i utlandet.",
        ],
      },
      {
        title: "Knop: hastighet i sjofart og luftfart",
        paragraphs: [
          "Knop (nautiske mil i timen) er standard hastighetsenhet i sjofart og luftfart; 1 knop tilsvarer noyaktig strekningen pa 1 nautisk mil (1852 meter) tilbakelagt pa en time.",
          "Navnet knop kommer historisk fra a maale et fartoys hastighet ved a kaste ut et tau med knuter (knots) i vannet og telle hvor mange knuter som passerte i lopet av et bestemt tidsrom. Denne metoden ble brukt i arhundrer for de moderne hastighetsmaleinstrumentene.",
        ],
      },
      {
        title: "Lysets hastighet: universets fartsgrense",
        paragraphs: [
          "Lysets hastighet er definert til noyaktig 299 792 458 m/s i vakuum, og ifolge Einsteins spesielle relativitetsteori er den den absolutte ovre grensen for hva informasjon eller et legeme med masse kan oppna i universet.",
          "At lysets hastighet er definert som et eksakt tall (den ble ansett som konstant ogsa for SI-revisjonen i 2019), gjor at den gjeldende definisjonen av meteren ogsa bygger pa denne konstanten -- meteren er definert som strekningen lyset tilbakelegger pa 1/299 792 458 sekund.",
        ],
      },
      {
        title: "Mach-tall: forhold til lydhastigheten",
        paragraphs: [
          "I luftfart uttrykkes hoye hastigheter ofte med Mach-tall; dette er forholdet mellom et legemes hastighet og lydhastigheten i det aktuelle mediet (Mach 1 = lydhastigheten). Lydhastigheten er ikke en fast verdi -- den varierer med luftens temperatur og tetthet (om lag 343 m/s / 1235 km/t ved havniva).",
          "Derfor kan samme Mach-tall tilsvare ulike faktiske hastigheter (km/t eller m/s) ved ulike hoyder og temperaturer -- et flys hastighet pa Mach 0,85 vil variere i faktisk hastighetsverdi avhengig av hoyde.",
        ],
      },
      {
        title: "Forskjellen mellom gjennomsnittsfart og momentanfart",
        paragraphs: [
          "Gjennomsnittsfart finnes ved a dele den totale tilbakelagte strekningen pa den totale tiden som har gatt, og gir en enkelt verdi for en hel reise. Momentanfart er derimot fartoyets hastighet pa et bestemt oyeblikk, og kan endre seg kontinuerlig (akselerasjon, oppbremsing, stopp).",
          "Mens en fartsmaler i et kjoretoy viser momentanfarten, beregnes gjennomsnittsfarten for en reise vanligvis i etterkant ut fra total strekning og total tid -- disse to verdiene er forskjellige sa lenge farten ikke er konstant gjennom hele reisen.",
        ],
      },
    ],
    unitTable: [
      { name: "Centimeter per sekund", symbol: "cm/s", referenceValue: "0,01 m/s", system: "SI/metrisk", commonUse: "Laboratorie- og langsom bevegelsesmaling" },
      { name: "Meter per minutt", symbol: "m/min", referenceValue: "≈0,0167 m/s", system: "SI/metrisk", commonUse: "Industriell bandhastighet" },
      { name: "Meter per sekund", symbol: "m/s", referenceValue: "1 m/s", system: "SI", commonUse: "Vitenskapelige og fysiske beregninger" },
      { name: "Kilometer i timen", symbol: "km/t", referenceValue: "≈0,278 m/s", system: "Metrisk", commonUse: "Kjoretoyhastighet og fartsgrenser" },
      { name: "Engelske mil i timen", symbol: "mph", referenceValue: "≈0,447 m/s", system: "Britisk/amerikansk", commonUse: "Kjoretoyhastighet i USA og Storbritannia" },
      { name: "Knop", symbol: "knop", referenceValue: "≈0,514 m/s", system: "Sjofart/luftfart", commonUse: "Skips- og flyhastighet" },
      { name: "Kilometer per minutt", symbol: "km/min", referenceValue: "≈16,67 m/s", system: "Metrisk", commonUse: "Kortdistanse fartsberegninger" },
      { name: "Kilometer per sekund", symbol: "km/s", referenceValue: "1000 m/s", system: "Metrisk", commonUse: "Romfartoy- og himmellegemehastigheter" },
      { name: "Lyshastighet", symbol: "c", referenceValue: "299 792 458 m/s", system: "Universell konstant", commonUse: "Fysikk- og astronomiberegninger" },
    ],
  },
  {
    locale: "no",
    slug: "trykk",
    sourceSlug: "basinc",
    category: "basinc",
    title: "Omregn trykkenheter",
    description:
      "Regn gratis og direkte om mellom pascal, bar, psi og atmosfaere; se formler og tabeller.",
    introduction: [
      "Trykk beskriver hvor mye av kraften som virker vinkelrett pa en flate som faller pa hver arealenhet. Bruksomradet strekker seg fra kontaktspenninger mellom faste stoffer til vaesken i et ror, fra atmosfaeren til vakuumsystemer. I ingeniorfag er trykk ikke bare en tallverdi, men en grunnleggende designvariabel for sikkerhet, tetthet, strukturell styrke, energiomforming og prosesskontroll.",
      "I Det internasjonale enhetssystemet er den avledede enheten for trykk pascal, som betegnes med symbolet Pa. En pascal tilsvarer trykket som oppstar nar en kraft pa en newton fordeler seg jevnt over et areal pa en kvadratmeter. Derfor er trykkenheten direkte knyttet til begrepene kraft og areal; samme dimensjonsstruktur deles ogsa med materialspenning, men den fysiske sammenhengen er ikke alltid den samme.",
      "I dagliglivet og industrien uttrykkes trykk oftest med mer praktiske enheter enn pascal. Kilopascal og PSI brukes for dekktrykk, bar i prosessanlegg, atm ved atmosfaeriske forhold, og millibar i meteorologi. At ulike sektorer historisk har tatt i bruk ulike enheter, gjor det saerlig viktig a forsta trykkomregning riktig og ikke blande sammen absolutt, manometrisk og differensielt trykk.",
    ],
    facts: [
      { label: "Fysisk storrelse", value: "Trykk" },
      { label: "SI-avledet enhet", value: "Pascal" },
      { label: "SI-symbol", value: "Pa" },
      { label: "Grunnsammenheng", value: "P = F / A" },
      { label: "SI-ekvivalent", value: "1 Pa = 1 N/m²" },
      { label: "Dimensjonsformel", value: "M L⁻¹ T⁻²" },
      { label: "Standard atmosfaere", value: "101 325 Pa" },
      { label: "Absolutt nullpunktsreferanse", value: "Fullstendig vakuum" },
    ],
    sections: [
      {
        title: "Hva er trykk?",
        paragraphs: [
          "Trykk avhenger ikke bare av storrelsen pa kraften som virker pa en flate, men ogsa av hvilket areal denne kraften fordeler seg over. Nar samme kraft virker pa et mindre areal, oker trykket; nar den fordeler seg over et storre areal, avtar det. Derfor kan en skarp kniv skjaere med liten kraft, mens samme kraft over en bred flate gir en langt mindre overflateeffekt.",
          "I stromningsmekanikk betraktes trykk som normalspenningskomponenten en stillestaende eller bevegelig vaeske utover pa omgivelsene. I en stillestaende vaeske overfores trykket i alle retninger og knyttes til Pascals prinsipp i lukkede beholdere. Denne egenskapen er grunnlaget for hydrauliske presser, bremsesystemer og mange industrielle aktuatorer.",
          "Trykkbegrepet er ikke begrenset til vaesker og gasser. Den gjennomsnittlige normalkraftvirkningen ved kontaktflater danner ogsa en trykklignende fordeling. Men i ingeniorfag er det oftest stromningssystemer som ror, tanker, kompressorer, luftkanaler, vakuumkammer og atmosfaeriske omgivelser som star i fokus nar man snakker om trykk.",
        ],
      },
      {
        title: "Trykkformelen: P = F / A",
        paragraphs: [
          "Grunndefinisjonen av trykk gis ved sammenhengen P = F / A. Her star P for trykk, F for kraftkomponenten vinkelrett pa flaten, og A for arealet denne kraften fordeler seg over. Enhetsanalyse gir newton delt pa kvadratmeter, som tilsvarer pascal.",
          "Denne sammenhengen gir gjennomsnittstrykket forutsatt jevn kraftfordeling. I virkelige kontaktproblemer eller komplekse felt i en vaeske kan trykket variere langs flaten. I slike tilfeller tas lokal trykkfordeling, differensialligninger og grensebetingelser i betraktning i stedet for en enkelt gjennomsnittsverdi.",
          "En vanlig feil i praksis er a velge feil kraftretning eller virksomt areal. Ved beregning av for eksempel stempelkraft ma kun det effektive tverrsnittsarealet som er utsatt for trykk, brukes. Nar geometriske detaljer som pakninger, bolter eller stotteflater overses, kan det oppsta designfeil.",
        ],
      },
      {
        title: "Hvorfor er pascal SI-trykkenheten?",
        paragraphs: [
          "Pascal fremkommer som en naturlig kombinasjon av newton, SI-enheten for kraft, og kvadratmeter, SI-enheten for areal. Sammenhengen 1 Pa = 1 N/m² er derfor ikke bare en definisjon, men ogsa et dimensjonsuttrykk som viser den mekaniske opprinnelsen til trykk. Det er ikke nodvendig a definere en egen grunnenhet for trykk.",
          "SI-systemet tar sikte pa a knytte avledede storrelser konsekvent til grunnenheter. At trykk uttrykkes i pascal, gir et rammeverk som er konsistent med ligninger for energitetthet, spenning, elastisitetsmodul og stromningsmekanikk. At samme enhet kan brukes pa tvers av ulike fagfelt, reduserer omregningsfeil i beregninger.",
          "Pascal er ofte en liten enhet i dagliglivet. Derfor foretrekkes mer praktiske skalaer som kilopascal, megapascal eller bar i ingeniorfag. Likevel er alle disse til syvende og sist knyttet til pascal, og dermed til SI-grunnlaget.",
        ],
      },
      {
        title: "Historien om trykkmaling: Torricelli og barometeret",
        paragraphs: [
          "Den systematiske malingen av trykk startet i 1643 da den italienske vitenskapsmannen Evangelista Torricelli utviklet kvikksolvbarometeret. Torricelli fylte et glassror lukket i den ene enden med kvikksolv og senket den apne enden ned i en beholder med kvikksolv, og observerte at kvikksolvet i roret ble staende pa en bestemt hoyde og etterlot et tomrom over seg.",
          "Torricelli foreslo at hoyden pa kvikksolvsoylen ble balansert av vekten til luften utenfor. Denne ideen dannet det eksperimentelle grunnlaget for oppfatningen om at luft har en malbar vekt, og dermed et trykk, og regnes som starten pa den vitenskapelige undersokelsen av trykk som storrelse.",
          "I 1648 viste Florin Perier, pa forslag fra Blaise Pascal, ved a male et barometer pa ulike hoyder pa fjellet Puy-de-Dome, at atmosfaeretrykket avtar med hoyden. I arhundrene som fulgte, bygde man videre pa dette grunnlaget; Metersystemkonvensjonen i 1875 samordnet maleenheter internasjonalt, i 1954 kom den eksakte definisjonen av standard atmosfaere, og i 1971 ble pascal tatt opp som SI-enhet.",
        ],
      },
      {
        title: "Absolutt, manometrisk og differensielt trykk",
        paragraphs: [
          "Absolutt trykk males i forhold til fullstendig vakuum. Denne referansen er den teoretiske tilstanden der trykket er null, og absolutt trykk kan ikke vaere negativt. Saerlig gasslover, termodynamiske beregninger og enkelte tetthetsrelaterte sammenhenger arbeider med absolutt trykk.",
          "Manometrisk trykk males derimot i forhold til atmosfaeretrykket. De fleste manometre pa anlegg bruker omgivelsesatmosfaeren som nullreferanse; derfor er verdien som vises pa skjermen, oftest manometrisk trykk. Sammenhengen mellom absolutt og manometrisk trykk er P_abs = P_manometrisk + P_atm.",
          "Differensielt trykk er trykkforskjellen mellom to punkter. I bruksomrader som filtertetting, debitmaling over en blenderplate, romtrykksetting og varmevekslerytelse overvakes direkte trykkforskjellen mellom to ulike linjer eller volumer. Denne storrelsen defineres verken i forhold til fullstendig vakuum eller kun i forhold til atmosfaeren; den er direkte forskjellen mellom to punkter.",
        ],
      },
      {
        title: "Atmosfaeretrykk",
        paragraphs: [
          "Atmosfaeretrykk er trykket luftsoylen i jordens atmosfaere utover pa flater pa grunn av sin vekt. Under standardforhold naer havniva regnes det som om lag 101 325 Pa, altsa 1 atm. Denne verdien er imidlertid ikke konstant; den varierer med hoyde, vaerforhold og temperaturendringer.",
          "Barometre brukes til a male atmosfaeretrykket. Kvikksolvbarometre har historisk vaert referanseinstrumenter, mens elektroniske trykksensorer har blitt stadig mer utbredt i moderne anvendelser. Atmosfaeretrykk er viktig ikke bare for meteorologi, men ogsa for vakuumteknologi, forbrenningssystemer og omregning mellom manometrisk og absolutt trykk.",
          "I systemer som arbeider med manometrisk trykk, kan endringer i atmosfaeretrykket pavirke maletolkningen. For eksempel gir 2 bar manometrisk trykk ved havniva og 2 bar manometrisk trykk i hoyereliggende omrader ikke samme absoluttverdi. Dette skillet kan vaere avgjorende saerlig i beregninger av kompresjon, gasstetthet og kokepunkt.",
        ],
      },
      {
        title: "Hydrostatisk trykk og sammenhengen P = ρgh",
        paragraphs: [
          "I en stillestaende vaeske oker trykket med dybden. Under antakelse om konstant tetthet uttrykkes det hydrostatiske manometriske trykket omtrentlig med sammenhengen P = ρgh. Her representerer ρ tetthet, g tyngdeakselerasjon og h hoyden pa vaskesoylen.",
          "Denne sammenhengen er saerlig nyttig for vanntanker, apne tanker, dammer, nivamaling og vaskefylte manometre. Ved samme hoyde og i samme vaeske regnes trykket som likt; formen pa beholderen endrer ikke resultatet. Det avgjorende er vaeskens tetthet og den vertikale dybden i forhold til den frie overflaten.",
          "Absolutt hydrostatisk trykk omfatter ikke bare okningen ρgh, men ogsa starttrykket ved den frie overflaten. I en apen beholder er denne startverdien vanligvis atmosfaeretrykket. Derfor ma man i beregning av absolutt trykk ikke bare legge til okningen fra vaskesoylen, men ogsa det ytre trykket ved overflaten.",
        ],
      },
      {
        title: "Statisk, dynamisk og totalt trykk",
        paragraphs: [
          "Statisk trykk er trykkomponenten som representerer den lokale termodynamiske tilstanden til stromningen sett fra en observator som beveger seg med vaesken. De fleste malepunkter i rorledninger, tanker og kanaler folger i hovedsak det statiske trykket. Storparten av trykktransmittere er utformet for a male denne storrelsen.",
          "Dynamisk trykk uttrykker den kinetiske effekten som skyldes stromningshastigheten, og den ofte brukte tilnaermede sammenhengen er q = 1/2 ρv². Dette leddet spiller en viktig rolle i Bernoulli-tilnaermingen og brukes i hastighetsmalemetoder som pitotror. Nar hastigheten oker, oker ogsa det dynamiske trykket.",
          "Totalt trykk tolkes i en ideell stromningstilnaerming som summen av statisk og dynamisk trykk. I virkelige systemer ma dette skillet brukes med forsiktighet pa grunn av friksjon, turbulens, komprimerbarhet og lokale tap. Likevel er skillet mellom statisk, totalt og dynamisk trykk et grunnleggende ingeniorspraak innen ventilasjon, aerodynamikk og prosessmaling.",
        ],
      },
      {
        title: "Trykkhoyde og pumpelofthoyde",
        paragraphs: [
          "Trykkhoyde er uttrykket for et bestemt trykk som den tilsvarende hoyden pa en vaskesoyle. Grunnsammenhengen er h = P / (ρg). Dermed tilsvarer samme trykk ulike hoydeverdier for vaesker med ulik tetthet.",
          "I pumpesystemer tolkes trykk ofte direkte som meter vaeskesoyle i stedet for pascal eller bar. Dette er fordi pumpens oppgave ikke bare er a tilfore vaesken trykk, men ogsa a levere energien som kreves for a dekke en bestemt hoyde, friksjonstap og hastighetskomponent. Derfor er begrepet lofthoyde svaert praktisk sett fra feltingenioren.",
          "Trykkhoyde og geometrisk hoyde er ikke samme begrep. A kun se pa manometeravlesningen uten a ta hensyn til rortap, hastighetshode og lokale motstander kan gi feilaktige resultater ved pumpevalg og systembalansering. Saerlig for vann, olje og prosessvaesker krever tetthetsforskjeller at omregningen gjores med omhu.",
        ],
      },
      {
        title: "Hvorfor er trykkenhetene forskjellige?",
        paragraphs: [
          "Mangfoldet av trykkenheter skyldes i stor grad historiske og bransjespesifikke arsaker. Mens SI-systemet legger til grunn pascal, brukes fortsatt bar i industrien, mmHg i medisin, millibar i meteorologi, PSI i bilindustrien, og enheter som at i enkelte eldre tekniske dokumenter. Dette skyldes at ulike fagfelt har beholdt sine egne bruksvaner.",
          "Enkelte enheter oppleves som mer intuitive for brukeren. For eksempel kan dekktrykk vaere mer lesbart som om lag 35 psi enn som 240 kPa, og prosesstrykk som 3,5 bar i stedet for 350 000 Pa. Valg av enhet handler ikke bare om noyaktighet, men ogsa om rapporteringskultur, instrumentskalering og feltvaner.",
          "Men fordi ulike enheter uttrykker samme fysiske storrelse, er noyaktig omregning nodvendig i felles beregninger. Saerlig a blande sammen omtrentlige og eksakt definerte koeffisienter, overse skillet mellom manometrisk og absolutt trykk, og feillesing av symboler er viktige feilkilder.",
        ],
      },
      {
        title: "Hvordan males trykk?",
        paragraphs: [
          "Ved trykkmaling ma man forst avgjore hvilken type trykk som kreves: absolutt, manometrisk eller differensielt. Deretter vurderes maleomrade, vaesketype, temperatur, kjemisk kompatibilitet, vibrasjon og pakrevd noyaktighetsniva. Samme sensor passer ikke nodvendigvis for enhver anvendelse.",
          "Ved lavtrykks- og differensmalinger kan membranbaserte differensielle transmittere brukes, ved hoye prosesstrykk strekklapp- eller piezoresistive elementer, og i vakuumanvendelser spesielle absolutte sensorer. Vaskefylte manometre er svaert nyttige for a laere grunnprinsippet; men i moderne industri er elektroniske instrumenter langt vanligere.",
          "For korrekt maling ma plassering av impulslinjer, sensormonteringsposisjon, nullpunktsjustering og temperatureffekter tas i betraktning. I gass- og vaskelinjer kan tetthetsforskjeller eller kondensdannelse skape ekstra hydrostatisk belastning pa sensoren. Derfor er installasjonsdetaljer like avgjorende for resultatet som selve instrumentvalget.",
        ],
      },
      {
        title: "Trykksensorer og manometre",
        paragraphs: [
          "Mekaniske manometre, som Bourdon-rormalere, omdanner trykk til en avlesbar viserbevegelse via deformasjon av et elastisk element. Pa grunn av sin robuste, enkle og energifrie konstruksjon har de vaert i bruk i industrien i lang tid. Men i anvendelser som krever hoy presisjon og datalogging er elektroniske sensorer mer fleksible.",
          "Elektroniske trykksensorer kan vaere piezoresistive, kapasitive, strekklapp- eller resonansbaserte. Disse sensorene omdanner trykkendringer til elektriske signaler som overfores til PLS-, SCADA- eller datainnsamlingssystemer. Dermed blir ikke bare oyeblikkelig avlesning mulig, men ogsa alarmering, styring og trendanalyse.",
          "Differensielle manometre gir trykkforskjellen mellom to punkter, absolutte sensorer gir trykket i forhold til fullstendig vakuum, og manometriske instrumenter gir trykket i forhold til atmosfaeren. A kun se pa tallverdien uten a bekrefte referansetypen i et instruments datablad kan fore til alvorlige tolkningsfeil.",
        ],
      },
      {
        title: "Bruksomrader for trykk i ingeniorfag",
        paragraphs: [
          "Trykk er en grunnleggende designvariabel innen mange ingeniorfelt, som rorlegging, HVAC, hydraulikk, pneumatikk, kjemisk prosessindustri, kraftverk, vannforsyningssystemer, bilindustri og luftfart. Fra tankveggtykkelse til ventilvalg, fra kompressorutlopsforhold til filterytelse, bygger mange beslutninger pa trykkinformasjon.",
          "I prosessteknikk overvakes trykkgrenser for a sikre trygg drift av reaktorer, kjeler, varmevekslere og separatorer. Trykksikkerhetsventiler, sprengningsskiver og kontrollsystemer er derfor kritisk utstyr. Trykk brukes ogsa til indirekte maling av andre prosessvariabler, som debitt og niva.",
          "I maskin- og bygningsteknikk knyttes trykk til spenningsanalyser via kontaktflater og vaeskekrefter. I medisin og biomedisinsk utstyr er blodtrykk, ventilasjonstrykk og vakuumanvendelser sentrale; i miljo og meteorologi er det atmosfaeriske og differensielle trykkmalinger som star i fokus.",
        ],
      },
      {
        title: "Temperatur, hoyde og usikkerhet i trykkmaling",
        paragraphs: [
          "Temperatur kan pavirke bade egenskapene til vaesken som males og oppforselen til selve sensorelementet. Saerlig for gasser endrer temperaturendringer tettheten, sa sammenhengen mellom trykk, volum og temperatur ma revurderes. Datablad for sensorer inneholder derfor parametere som temperaturavhengig nullpunktsforskyvning og spennforskyvning.",
          "Nar hoyden oker, avtar atmosfaeretrykket vanligvis. Dette endrer forholdet mellom manometrisk og absolutt trykk og kan ogsa pavirke referanseoppforselen til enkelte feltinstrumenter. Samme prosessforhold kan gi ulike absolutte trykkresultater ved ulike hoyder over havet.",
          "Enhver maling har en usikkerhet. Kalibreringsstandard, oppl0sning, hysterese, temperatureffekt, monteringsretning, vibrasjon og langsiktig drift bidrar alle til den totale usikkerheten. I kritiske anvendelser bor ikke bare den nominelle trykkverdien, men ogsa instrumentklasse og malepalitelighet tas med i designbeslutningen.",
        ],
      },
      {
        title: "Forholdet og forskjellen mellom trykk og spenning",
        paragraphs: [
          "Trykk og spenning har samme dimensjonsstruktur, og begge kan uttrykkes i pascal. Denne likheten skyldes at begge representerer en krafteffekt per arealenhet. Men dette betyr ikke at de fysisk sett er helt samme storrelse.",
          "Trykk oppfattes for det meste som en isotrop normalspenning pafort av vaesker; det vil si at trykket pa samme punkt i en stillestaende vaeske er likt i alle retninger. Spenning i fast-stoff-mekanikk kan derimot inneholde bade normal- og skjaerkomponenter, er retningsavhengig og har en tensorstruktur.",
          "A overse dette skillet kan fore til feiltolkning saerlig i beregninger av beholdervegg, pakningsflate eller materialstyrke. Det indre trykket til en vaeske skaper ring- og aksialspenninger i en beholder; men spenningsfeltet i beholdermaterialet er ikke det samme som selve vaesketrykket.",
        ],
      },
      {
        title: "Vanlige feil i trykkberegning",
        paragraphs: [
          "Den vanligste feilen er a forveksle manometrisk trykk med absolutt trykk. Saerlig i gasslover, tetthetsberegninger og vakuumanvendelser kan den manometriske verdien pa et manometer brukes direkte nar absolutt trykk egentlig kreves. Dette skaper en systematisk feil i resultatet.",
          "En annen feil er a avrunde omregningskoeffisienter eller bruke feil enhetsreferanse. Ved omregning mellom PSI, bar, atm, mmHg og kPa ma man avgjore hvilket presisjonsniva de tilnaermede verdiene er tilstrekkelige for. Hvis instrumentkalibreringen krever hoy presisjon, kan mangelfull sifferbruk skape problemer.",
          "A overse hydrostatiske effekter, ignorere sensorens monteringshoyde og unnlate a ta hensyn til temperatureffekten er ogsa vanlig. Saerlig i vaskefylte impulslinjer, lukkede tanker og differensielle trykkanvendelser kan tilsynelatende sma installasjonsdetaljer endre maleresultatet betydelig.",
        ],
      },
    ],
    unitTable: [
      { name: "Pascal", symbol: "Pa", referenceValue: "1 Pa", system: "SI", commonUse: "Vitenskapelige og ingeniormessige beregninger" },
      { name: "Kilopascal", symbol: "kPa", referenceValue: "1000 Pa", system: "SI", commonUse: "Rorsystemer, dekk og prosesstrykk" },
      { name: "Bar", symbol: "bar", referenceValue: "100 000 Pa", system: "Metrisk, utenfor SI", commonUse: "Industri, kompressorer og prosessanlegg" },
      { name: "Millibar", symbol: "mbar", referenceValue: "100 Pa", system: "Metrisk, utenfor SI", commonUse: "Meteorologi og atmosfaeriske malinger" },
      { name: "Standard atmosfaere", symbol: "atm", referenceValue: "101 325 Pa", system: "Utenfor SI", commonUse: "Atmosfaere og referanseforhold" },
      { name: "PSI", symbol: "psi", referenceValue: "≈ 6894,757293 Pa", system: "Britisk/amerikansk", commonUse: "Dekk, hydraulikk og pneumatiske systemer" },
      { name: "Teknisk atmosfaere", symbol: "at", referenceValue: "98 066,5 Pa", system: "Utenfor SI", commonUse: "Eldre tekniske og ingeniorfaglige anvendelser" },
      { name: "Millimeter kvikksolv", symbol: "mmHg", referenceValue: "≈ 133,322 Pa", system: "Utenfor SI", commonUse: "Medisin, vakuum og trykkmalinger" },
      { name: "Millimeter vannsoyle", symbol: "mmH₂O", referenceValue: "≈ 9,80665 Pa", system: "Utenfor SI", commonUse: "Lavtrykks- og ventilasjonsmalinger" },
      { name: "Kilogram-kraft/kvadratcentimeter", symbol: "kgf/cm²", referenceValue: "98 066,5 Pa", system: "Metrisk, utenfor SI", commonUse: "Eldre pumpe- og kjelemalere, servicehandbøker" },
    ],
  },
  {
    locale: "no",
    slug: "energi",
    sourceSlug: "enerji",
    category: "enerji",
    title: "Omregn energienheter",
    description:
      "Regn gratis og direkte om mellom joule, kilokalori, kWh og BTU; se formler og tabeller.",
    introduction: [
      "Energi er en grunnleggende fysisk storrelse som beskriver et systems evne til a utfore arbeid. I Det internasjonale enhetssystemet er den avledede enheten for energi joule, og den fremkommer ved a multiplisere kraft med forflytning.",
      "I dagliglivet brukes svaert ulike energienheter: kilowattimer (kWh) pa strømregninger, kalorier/kilokalorier i ernaering, BTU i oppvarmingssystemer, therm i naturgassfakturering, og elektronvolt i partikkelfysikk.",
    ],
    facts: [
      { label: "Fysisk storrelse", value: "Energi (arbeid)" },
      { label: "Dimensjonssymbol", value: "[ML²T⁻²]" },
      { label: "SI-avledet enhet", value: "Joule" },
      { label: "SI-enhetssymbol", value: "J" },
      { label: "Definisjon av joule", value: "1 J = 1 newtons kraft over 1 meters forflytning (1 N·m)" },
    ],
    sections: [
      {
        title: "Hva er energi?",
        paragraphs: [
          "Energi er evnen et legeme eller system har til a utfore arbeid. Den kan opptre i mange former, som kinetisk energi (bevegelse), potensiell energi (posisjon), varmeenergi, kjemisk energi og elektrisk energi; ifolge loven om bevaring av energi kan den omdannes fra en form til en annen, men den totale mengden kan verken oppsta av intet eller forsvinne.",
          "Energi er en avledet storrelse; den fremkommer ved a multiplisere kraft med forflytning (arbeid), og SI-dimensjonen angis som ML²T⁻² (masse × lengde i annen / tid i annen).",
        ],
      },
      {
        title: "SI-enheten for energi: joule",
        paragraphs: [
          "Joule er SI-enheten for energi og betegnes med symbolet J; den er oppkalt etter den britiske fysikeren James Prescott Joule fra 1800-tallet. En joule tilsvarer energien som kreves for a flytte et legeme 1 meter med en kraft pa 1 newton.",
          "Fordi joule er ganske liten til a uttrykke mange energimengder i dagliglivet, foretrekkes ofte multipler som kilojoule (tusen joule) og megajoule (en million joule) i ingenior- og dagligbruk.",
        ],
      },
      {
        title: "Kilowattime: enheten pa strømregningen",
        paragraphs: [
          "Kilowattime (kWh) er energimengden som forbrukes nar en effekt pa 1 kilowatt brukes i 1 time, og den er standardenheten for strømfakturering verden over. 1 kWh tilsvarer noyaktig 3 600 000 joule (3,6 megajoule).",
          "For a beregne energiforbruket til et elektrisk apparat er det nok a multiplisere effekten (watt) med brukstiden (timer); for eksempel forbruker et apparat pa 2000 watt 6 kWh energi hvis det gar i 3 timer.",
        ],
      },
      {
        title: "Kalori og kilokalori: energi i ernaering",
        paragraphs: [
          "Kalori ble opprinnelig definert som energimengden som kreves for a heve temperaturen til 1 gram vann med 1 °C, og 1 kalori tilsvarer noyaktig 4,184 joule.",
          "'Kalori'-verdien man ser pa matvareetiketter, er i vitenskapelig forstand egentlig kilokalori (1000 kalorier) -- denne konvensjonen i ernaeringsvitenskapen (a skrive 'Kalori' med stor forbokstav) skaper ofte forvirring; nar det star at en matvare inneholder '200 kalorier', menes det egentlig 200 kilokalorier (200 000 kalorier).",
        ],
      },
      {
        title: "BTU og therm: energi i oppvarming og naturgass",
        paragraphs: [
          "BTU (British Thermal Unit) er energimengden som kreves for a heve temperaturen til 1 pund vann med 1 °F, og den brukes -- opprinnelig fra USA, men na utbredt over hele verden -- til a angi kapasiteten til oppvarmings-/kjolesystemer (klimaanlegg, varmtvannsberedere). 1 BTU tilsvarer om lag 1055,06 joule.",
          "Therm er en stor energienhet brukt i naturgassfakturering og tilsvarer noyaktig 100 000 BTU. I enkelte land faktureres naturgassforbruk direkte i therm i stedet for kubikkmeter.",
        ],
      },
      {
        title: "Elektronvolt: enheten i den subatomaere verdenen",
        paragraphs: [
          "Elektronvolt (eV) beskriver den kinetiske energien et elektron far nar det beveger seg gjennom en potensialforskjell pa 1 volt, og det er en ekstremt liten energienhet (1 eV ≈ 1,602176634 × 10⁻¹⁹ joule).",
          "I partikkelfysikk og atomfysikk uttrykkes energier vanligvis i elektronvolt (og dets multipler keV, MeV, GeV) i stedet for joule, fordi joule pa denne skalaen gir ekstremt sma og upraktiske tall.",
        ],
      },
      {
        title: "Prinsippet om bevaring av energi",
        paragraphs: [
          "Ifolge prinsippet om bevaring av energi, ogsa kjent som termodynamikkens forste lov, forblir den totale energien i et lukket system konstant; energi kan verken skapes eller odelegges, bare omdannes fra en form til en annen.",
          "For eksempel omdannes kjemisk energi (drivstoff) i en bilmotor forst til varmeenergi og deretter til mekanisk energi (bevegelse); selv om noe av energien i denne prosessen gar tapt som ubrukelig varme via friksjon og eksos, forblir den totale energimengden uendret.",
        ],
      },
      {
        title: "Hvorfor er omregning mellom energienheter viktig?",
        paragraphs: [
          "Ulike bransjer foretrekker tradisjonelt ulike energienheter: elektroteknikk bruker kilowattime, ernaeringsvitenskap kilokalori, HVAC-bransjen BTU, og naturgassbransjen therm. Riktig omregning mellom disse ulike enhetene er avgjorende for energieffektivitetssammenligninger og kostnadsberegninger.",
          "For a sammenligne effektiviteten til en varmepumpe med en naturgasskjel, ma man for eksempel omregne begges energiforbruk til en felles enhet (vanligvis kWh eller joule).",
        ],
      },
    ],
    unitTable: [
      { name: "Joule", symbol: "J", referenceValue: "1 J", system: "SI", commonUse: "Vitenskapelige og fysiske energiberegninger" },
      { name: "Kilojoule", symbol: "kJ", referenceValue: "1000 J", system: "SI/metrisk", commonUse: "Matenergi (i enkelte land)" },
      { name: "Megajoule", symbol: "MJ", referenceValue: "1 000 000 J", system: "SI/metrisk", commonUse: "Drivstoff og store energimengder" },
      { name: "Kalori", symbol: "cal", referenceValue: "4,184 J", system: "Metrisk (tradisjonell)", commonUse: "Ernaering og kjemi" },
      { name: "Kilokalori", symbol: "kcal", referenceValue: "4184 J", system: "Metrisk (tradisjonell)", commonUse: "Matvareetiketter ('kalorier')" },
      { name: "Wattime", symbol: "Wh", referenceValue: "3600 J", system: "Metrisk (elektrisk)", commonUse: "Energiforbruk for sma apparater" },
      { name: "Kilowattime", symbol: "kWh", referenceValue: "3 600 000 J", system: "Metrisk (elektrisk)", commonUse: "Strømfakturering" },
      { name: "BTU", symbol: "Btu", referenceValue: "≈1055,06 J", system: "Britisk/amerikansk", commonUse: "Klima- og oppvarmingskapasitet" },
      { name: "Therm", symbol: "th", referenceValue: "≈105 506 000 J", system: "Britisk/amerikansk", commonUse: "Naturgassfakturering" },
      { name: "Elektronvolt", symbol: "eV", referenceValue: "≈1,602 × 10⁻¹⁹ J", system: "Atom-/partikkelfysikk", commonUse: "Atomaer og nukleaer energimaling" },
    ],
  },
  {
    locale: "no",
    slug: "datalagring",
    sourceSlug: "veri",
    category: "veri",
    title: "Omregn datalagringsenheter",
    description:
      "Regn gratis og direkte om mellom byte, kilobyte, megabyte og gigabyte; se formler og tabeller.",
    introduction: [
      "Dataenheten beskriver mengden informasjon som er lagret eller behandlet i et datasystem. Den mest grunnleggende enheten er biten; atte biter utgjor til sammen en byte.",
      "Nar man snakker om lagring og internetthastighet, brukes bade desimale (1000-baserte) enheter som kilobyte, megabyte, gigabyte og terabyte, samt binaere (1024-baserte) enheter som operativsystemer bruker, som kibibyte, mebibyte og gibibyte -- forskjellen mellom disse to systemene er hovedgrunnen til at en kjopt disk kan virke 'mindre' enn forventet.",
    ],
    facts: [
      { label: "Minste enhet", value: "Bit (0 eller 1)" },
      { label: "Grunnenhet", value: "Byte = 8 bit" },
      { label: "Desimalt (SI) system", value: "1 KB = 1000 byte, 1 MB = 1000 KB" },
      { label: "Binaert (IEC) system", value: "1 KiB = 1024 byte, 1 MiB = 1024 KiB" },
      { label: "Forskjellen mellom 1000 og 1024", value: "≈ 7,4 % forskjell mellom 1 GB (desimal) og 1 GiB (binaer)" },
    ],
    sections: [
      {
        title: "Hva er bit og byte?",
        paragraphs: [
          "Bit (binary digit) er den minste informasjonsenheten en datamaskin kan behandle, og kan bare ha to verdier: 0 eller 1. Atte bit utgjor en byte; en byte kan representere 256 (2⁸) ulike verdier -- tilstrekkelig til for eksempel a kode et tegn i en tekst.",
          "Bit forkortes vanligvis med liten 'b', og byte med stor 'B'; dette skillet kan saerlig skape forvirring mellom internetthastigheter (Mbps = megabit per sekund) og filstorrelser (MB = megabyte) -- en internettforbindelse pa 100 Mbps tilsvarer i teorien en nedlastingshastighet pa om lag 12,5 MB per sekund (100 ÷ 8).",
        ],
      },
      {
        title: "Hvorfor finnes det to ulike enhetssystemer?",
        paragraphs: [
          "Fordi datamaskiner arbeider i det binaere systemet, er minneadressering naturlig knyttet til potenser av 2 (som 1024, 1048576). Derfor har programvareverdenen historisk ment 1024 byte nar man har sagt 'kilobyte'.",
          "Diskprodusenter foretrekker derimot det desimale (1000-baserte) SI-prefikset av markedsforings- og beregningshensyn -- en disk en produsent kaller '1 TB', er i realiteten noyaktig 1 000 000 000 000 byte, men fordi operativsystemet regner ut fra base 1024, viser skjermen et mindre tall som '931 GB'.",
        ],
      },
      {
        title: "IEC-standarden: KiB, MiB, GiB",
        paragraphs: [
          "For a rydde opp i denne forvirringen standardiserte Den internasjonale elektrotekniske kommisjon (IEC) i 1998 egne navn (kibibyte, mebibyte, gibibyte, tebibyte) og symboler (KiB, MiB, GiB, TiB) for binaerbaserte enheter.",
          "Ifolge denne standarden bor tradisjonelle prefikser som KB/MB/GB kun brukes i 1000-basert (desimal) betydning, mens 'binaere' prefikser som KiB/MiB/GiB bor brukes for 1024-baserte verdier. I dagligbruk og i mye programvare er imidlertid dette skillet fortsatt ikke konsekvent anvendt.",
        ],
      },
      {
        title: "Hvorfor oker forskjellen mellom 1000 og 1024?",
        paragraphs: [
          "Pa kilobyte-niva (1000 mot 1024) er forskjellen bare 2,4 %, men denne forskjellen oker for hver hoyere enhet: pa megabyte-niva ≈ 4,9 %, pa gigabyte-niva ≈ 7,4 %, og pa terabyte-niva na 10 %.",
          "Derfor blir forskjellen mellom desimal og binaer beregning ved store lagringskapasiteter (som en disk pa 1 TB) sa stor at brukeren merkbart opplever a ha 'mindre plass' enn forventet (om lag 90 GB forskjell).",
        ],
      },
      {
        title: "Bitbaserte dataenheter: kilobit, megabit, gigabit",
        paragraphs: [
          "Internettleverandorer uttrykker vanligvis forbindelseshastighet med bitbaserte enheter (kilobit/sekund, megabit/sekund, gigabit/sekund); dette er en historisk tradisjon innen nettverksteknikk.",
          "Ettersom brukere ofte forventer nedlastingshastigheten i byte (MB/sekund), kan det a ikke vite at en '100 Mbps'-forbindelse faktisk gir en nedlastingshastighet pa om lag 12,5 MB/sekund, fore til en feilaktig oppfatning av at forbindelsen er 'treg'.",
        ],
      },
      {
        title: "Datastorrelser i dagliglivet",
        paragraphs: [
          "Et tekstdokument (en side) er typisk noen fa kilobyte, et komprimert fotografi (JPEG) noen fa megabyte, og en komprimert musikkfil (MP3) i gjennomsnitt 3-5 megabyte.",
          "En film i standardoppl0sning (HD) kan oppta om lag 1-4 gigabyte, mens en film i 4K-oppl0sning kan oppta 15-25 gigabyte; disse forskjellene varierer avhengig av oppl0sning og komprimeringsmetode.",
        ],
      },
      {
        title: "Historien om dataenheten",
        paragraphs: [
          "Den forste harddisken IBM lanserte i 1956 (RAMAC 305) hadde en kapasitet pa om lag 3,75 megabyte og var stor nok til a fylle et rom. I dag kan et mikroSD-kort romme millioner ganger denne kapasiteten i handflatestorrelse.",
          "Denne enorme kapasitetsokningen henger tett sammen bade med fremskritt innen lagringsteknologi (som overgangen fra magnetiske disker til flashminne) og med den kontinuerlige nedgangen i kostnad per enhet.",
        ],
      },
    ],
    unitTable: [
      { name: "Bit", symbol: "bit", referenceValue: "0,125 byte", system: "Binaer", commonUse: "Nettverkshastighet (bps, Mbps)" },
      { name: "Byte", symbol: "B", referenceValue: "1 byte (8 bit)", system: "Grunnenhet", commonUse: "Grunnleggende enhet for filstorrelse" },
      { name: "Kilobyte", symbol: "KB", referenceValue: "1000 byte", system: "Desimal (SI)", commonUse: "Tekstdokumenter" },
      { name: "Kibibyte", symbol: "KiB", referenceValue: "1024 byte", system: "Binaer (IEC)", commonUse: "Minnevisning i operativsystem" },
      { name: "Megabyte", symbol: "MB", referenceValue: "1 000 000 byte", system: "Desimal (SI)", commonUse: "Bilde- og musikkfiler" },
      { name: "Mebibyte", symbol: "MiB", referenceValue: "1 048 576 byte", system: "Binaer (IEC)", commonUse: "RAM-kapasitet (minne)" },
      { name: "Gigabyte", symbol: "GB", referenceValue: "1 000 000 000 byte", system: "Desimal (SI)", commonUse: "Diskkapasitet (produsentmerking)" },
      { name: "Gibibyte", symbol: "GiB", referenceValue: "1 073 741 824 byte", system: "Binaer (IEC)", commonUse: "Diskvisning i operativsystem" },
      { name: "Terabyte", symbol: "TB", referenceValue: "1 000 000 000 000 byte", system: "Desimal (SI)", commonUse: "Storvolumlagring" },
      { name: "Petabyte", symbol: "PB", referenceValue: "1 000 000 000 000 000 byte", system: "Desimal (SI)", commonUse: "Datasenter- og skylagring" },
    ],
  },
  {
    locale: "no",
    slug: "elektrisitet",
    sourceSlug: "elektrik",
    category: "elektrik",
    title: "Omregn elektriske enheter",
    description:
      "Regn gratis og direkte om mellom volt, kilovolt, amper og milliamper; se formler og tabeller.",
    introduction: [
      "Elektrisitet er et bredt fagfelt bestaende av storrelser som er beslektet, men likevel forskjellige: spenning (potensialforskjell) og strom (ladningsstrom). Denne kategorien samler de to grunnleggende storrelsene man oftest moter i hverdagslig elektrisk arbeid -- volt (spenning) og amper (strom).",
      "Spenning og strom er ikke samme fysiske storrelse, og de kan ikke regnes direkte om til hverandre; forholdet mellom dem etableres av Ohms lov (V = I × R), avhengig av motstanden i kretsen. Omregningene pa denne siden behandler hver storrelse for seg (volt-kilovolt, amper-milliamper).",
    ],
    facts: [
      { label: "Navnet pa spenningsenheten", value: "Volt (etter Alessandro Volta)" },
      { label: "Navnet pa strømenheten", value: "Amper (etter Andre-Marie Ampere)" },
      { label: "SI-grunnenhet (strom)", value: "Amper (A) -- en av SIs 7 grunnenheter" },
      { label: "Forholdet mellom spenning, strom og motstand", value: "Ohms lov: V = I × R" },
      { label: "Nettspenning i Norge", value: "230 V (enfase), 400 V (trefase)" },
    ],
    sections: [
      {
        title: "Hva er spenning (volt)?",
        paragraphs: [
          "Spenning beskriver den elektriske potensialforskjellen mellom to punkter i en elektrisk krets, og kan tenkes pa som den 'drivende kraften' som far elektroner til a strømme fra ett punkt til et annet. SI-enheten er volt (V).",
          "Enheten volt er oppkalt etter den italienske fysikeren Alessandro Volta, som oppfant det elektriske batteriet. Verdier som '1,5 V' eller '9 V' pa et batteri angir potensialforskjellen batteriet kan levere.",
        ],
      },
      {
        title: "Hva er strom (amper)?",
        paragraphs: [
          "Elektrisk strom beskriver mengden elektrisk ladning som passerer gjennom en leder per tidsenhet, og SI-enheten er amper (A). En amper tilsvarer om lag 6,242 × 10¹⁸ elektroner som passerer et punkt per sekund.",
          "Enheten amper er oppkalt etter den franske fysikeren Andre-Marie Ampere, en av grunnleggerne av elektromagnetismen. For SI-revisjonen i 2019 var amper en av SIs grunnenheter; den regnes fortsatt som en grunnleggende storrelse, men defineres na ut fra elementaerladningskonstanten (e).",
        ],
      },
      {
        title: "Hvorfor kan ikke spenning og strom regnes om til hverandre?",
        paragraphs: [
          "Spenning (V) og strom (A) er ulike fysiske storrelser -- den ene uttrykker potensialforskjell, den andre ladningsstrømningshastighet. Derfor har sporsmalet 'hvor mange amper tilsvarer X volt' alene ikke noe svar uten a kjenne motstanden (eller effekten) i kretsen.",
          "Forholdet mellom de to etableres av Ohms lov: V = I × R (spenning = strom × motstand). For eksempel skaper en spenning pa 12 volt gjennom en motstand pa 4 ohm en strom pa 3 amper; men de samme 12 volt gir en helt annen strom ved en annen motstand.",
        ],
      },
      {
        title: "Sammenhengen mellom effekt, spenning og strom",
        paragraphs: [
          "Elektrisk effekt (watt) er lik produktet av spenning og strom: P = V × I. Denne formelen viser at et apparat med samme effekt trekker lavere strom ved hoy spenning, og hoyere strom ved lav spenning.",
          "Dette forholdet forklarer hvorfor elektriske distribusjonsnett arbeider med hoy spenning: a overfore samme effekt med lavere strom reduserer betydelig energitapet (Joule-oppvarming) som skyldes motstand i overforingslinjene.",
        ],
      },
      {
        title: "Nettspenning i Norge og verden",
        paragraphs: [
          "I Norge er standard nettspenning i boliginstallasjoner 230 V, og i motsetning til det meste av Europa har mange norske boliginstallasjoner tradisjonelt basert seg pa et IT-jordingssystem uten noytralleder, der 230 V males fase-til-fase i stedet for fase-til-jord; nyere installasjoner bygges i okende grad med et TN-system pa samme mate som resten av Europa, med en frekvens pa 50 Hz.",
          "Nettspenningen varierer fra land til land i verden; land som USA og Canada bruker 120 volt, mens det meste av Europa, deriblant Norge, foretrekker 230 volt. Denne forskjellen er hovedgrunnen til at elektriske apparater tatt med fra utlandet ikke kan brukes direkte uten en omformer.",
        ],
      },
      {
        title: "Likestrom (DC) og vekselstrom (AC)",
        paragraphs: [
          "I likestrom (DC) strømmer elektronene konstant i en retning -- batterier og solcellepaneler produserer DC. I vekselstrom (AC) skifter derimot strømretningen med en bestemt frekvens per sekund (50 Hz i Norge, altsa 50 ganger per sekund) -- nettstrømmen er AC.",
          "Hovedgrunnen til at AC foretrekkes i nettdistribusjon, er at transformatorer enkelt kan heve og senke spenningen; dette gjor det mulig a overfore elektrisitet over lange avstander med lavt tap.",
        ],
      },
      {
        title: "Elektrisk stroms virkning pa menneskekroppen",
        paragraphs: [
          "Storrelsen pa strømmen som gar gjennom menneskekroppen, avgjor hvilken effekt man merker: om lag 1 milliampere kjennes svakt, 10-20 milliampere kan gi muskelsammentrekning (manglende evne til a slippe taket), og over 100 milliampere kan fore til hjerterytmeforstyrrelse (fibrillering) og dodsfall.",
          "Derfor er det ikke bare spenningen, men ogsa storrelsen pa strommen som kan oppsta i kretsen, som er avgjorende for elektrisk sikkerhet -- selv i lavspente, men lavohmige (for eksempel fuktige) omgivelser kan det oppsta farlig hoy strom.",
        ],
      },
    ],
    unitTable: [
      { name: "Millivolt", symbol: "mV", referenceValue: "0,001 V", system: "SI/metrisk", commonUse: "Sensor- og bioelektriske signaler" },
      { name: "Volt", symbol: "V", referenceValue: "1 V", system: "SI", commonUse: "Batteri-, nett- og kretsspenning" },
      { name: "Kilovolt", symbol: "kV", referenceValue: "1000 V", system: "SI/metrisk", commonUse: "Hoyspente overforingslinjer" },
      { name: "Milliampere", symbol: "mA", referenceValue: "0,001 A", system: "SI/metrisk", commonUse: "Elektroniske kretsstrommer" },
      { name: "Ampere", symbol: "A", referenceValue: "1 A", system: "SI", commonUse: "Boliginstallasjon og apparatstrom" },
      { name: "Kiloampere", symbol: "kA", referenceValue: "1000 A", system: "SI/metrisk", commonUse: "Kortslutnings- og industristrommer" },
    ],
  },
  {
    locale: "no",
    slug: "gullkarat",
    sourceSlug: "altin-ayar",
    category: "altin_ayar",
    title: "Omregn gullkarat",
    description:
      "Regn gratis og direkte om mellom 24, 22, 18 og 14 karat gull; se formler og tabeller.",
    introduction: [
      "Gull brukes nesten aldri i ren form i smykker og gullvarer -- fordi det er et svaert mykt og lett riper metall, blandes det med metaller som solv og kobber til en legering. Karat (gullkarat) er malet som viser andelen rent gull i denne legeringen.",
      "Skalaen gar over 24: 24 karat betyr helt rent gull (100 %), mens 22 karat betyr at 22/24 (om lag 91,6 %) av legeringen er rent gull. Omregningen her beregner gramekvivalenten mellom gull av ulik karat basert pa innholdet av rent gull -- det vil si, ikke 'a uttrykke samme fysiske storrelse med en annen enhet', men 'a finne den tilsvarende verdien til samme legering ved ulik renhetsgrad'.",
    ],
    facts: [
      { label: "Malesystem", value: "Gullsmedstandard for renhet (karat)" },
      { label: "Grunnreferanse", value: "24 karat = 100 % rent gull" },
      { label: "Mest vanlige karat i Tyrkia", value: "22 karat (armband, tradisjonelle smykker)" },
      { label: "Internasjonal dagligbruk", value: "18 karat (ring, kjede)" },
      { label: "Beregningslogikk", value: "Gram × (kildekarat / 24) ÷ (malkarat / 24)" },
    ],
    sections: [
      {
        title: "Hva maler karat egentlig?",
        paragraphs: [
          "Karat viser hvor mye av vekten til et gullstykke som faktisk er gull. 24 karat er rent gull; 22, 18 og 14 karat er gull som er blandet med henholdsvis solv/kobber i okende grad, og dermed hardere og mindre rent.",
          "Derfor kan vi si at et armband pa 22 karat har et litt 'lettere' innhold av rent gull enn 24 karat, men er mer holdbart -- dette er grunnen til at gullsmeder ofte foretrekker 22 karat til armband, og gjerne 18 karat til ringer/kjeder.",
        ],
      },
      {
        title: "Hvordan beregnes innholdet av rent gull?",
        paragraphs: [
          "For a finne mengden rent gull i et armband pa 10 gram, 22 karat: 10 × (22 / 24) = 9,17 gram tilsvarer rent (24-karats ekvivalent) gull. De gjenvaerende om lag 0,83 gram er andre metaller tilsatt for holdbarhet.",
          "Omvendt: hvis en gullsmed skulle smelte disse 9,17 gramene rent gull om til 18 karat, ville han fa: 9,17 ÷ (18 / 24) = 12,22 gram totalt legering -- fordi andelen rent gull er lavere ved 18 karat, fordeler samme mengde rent gull seg over en storre totalvekt.",
        ],
      },
      {
        title: "Hvilken karat brukes til hva?",
        paragraphs: [
          "24 karat brukes naermest aldri i dagligsmykker pa grunn av mykheten; det foretrekkes hovedsakelig til gullbarrer og investeringsprodukter. 22 karat er standarden for armband og tradisjonelle smykker i Tyrkia og Midtosten.",
          "18 karat er utbredt over hele verden i dagligbrukssmykker som diamantringer og kjeder, siden det har hoy holdbarhet. 14 karat er mer okonomisk og enda mer holdbart, og er saerlig vanlig i det amerikanske og europeiske markedet.",
        ],
      },
    ],
    unitTable: [
      { name: "24 karat gull", symbol: "24K", referenceValue: "100 % rent gull", system: "Gullsmedstandard", commonUse: "Gullbarrer, investeringsgull" },
      { name: "22 karat gull", symbol: "22K", referenceValue: "91,6 % rent gull (22/24)", system: "Gullsmedstandard", commonUse: "Armband, tradisjonelle smykker" },
      { name: "18 karat gull", symbol: "18K", referenceValue: "75 % rent gull (18/24)", system: "Gullsmedstandard", commonUse: "Ring, kjede, dagligsmykker" },
      { name: "14 karat gull", symbol: "14K", referenceValue: "58,3 % rent gull (14/24)", system: "Gullsmedstandard", commonUse: "Okonomiske smykker, USA/Europa-markedet" },
    ],
  },
  {
    locale: "no",
    slug: "solvinnhold",
    sourceSlug: "gumus-ayar",
    category: "gumus_ayar",
    title: "Omregn solvinnhold",
    description:
      "Regn gratis og direkte om mellom 999, 925, 900 og 800 solv; se formler og tabeller.",
    introduction: [
      "Solv brukes, i likhet med gull, naesten aldri i ren form til smykker eller gjenstander -- fordi det er et mykt metall, blandes det med andre metaller som kobber til en legering. Millesimal (finhet i tusendeler) er malet som viser andelen rent solv i denne legeringen.",
      "I motsetning til gullkarat uttrykkes solvrenhet ikke over 24, men over 1000 (i tusendeler): 999 er naermest fullstendig rent solv, mens 925 er den mest utbredte smykkestandarden i verden, kjent som 'sterlingsolv'.",
    ],
    facts: [
      { label: "Malesystem", value: "Millesimalsystem (finhet i tusendeler)" },
      { label: "Grunnreferanse", value: "999 = 99,9 % rent solv" },
      { label: "Mest utbredte smykkestandard i verden", value: "925 (sterlingsolv)" },
      { label: "Solv til barrer/investering", value: "999 finhet (fine silver)" },
      { label: "Beregningslogikk", value: "Gram × (kildefinhet / 1000) ÷ (malfinhet / 1000)" },
    ],
    sections: [
      {
        title: "Hva maler solvfinheten (millesimal) egentlig?",
        paragraphs: [
          "I motsetning til gull uttrykkes solvrenhet ikke over 24 enheter, men i tusendeler (millesimal, over 1000). 999 finhet betyr at 999 av 1000 deler (altsa 99,9 %) av legeringen er rent solv; den gjenvaerende ene delen er som regel sporstoffer av andre grunnstoffer.",
          "925 finhet (sterlingsolv) betyr at 92,5 % av legeringen er rent solv, og de resterende 7,5 % som regel er kobber. Denne lille mengden kobber gir det rene solvet, som ellers er svaert mykt og lett deformerbart, okt holdbarhet.",
        ],
      },
      {
        title: "Hvorfor er sterlingsolv (925) verdensstandarden?",
        paragraphs: [
          "925 finhet sterlingsolv-standarden har rotter helt tilbake til 1100-tallet i England, og har over tid blitt den mest aksepterte standarden verden over for produksjon av smykker, bestikk og solvtoy.",
          "Rent solv (999) er for mykt og lett a ripe for hverdagsbruk; a tilsette om lag 7,5 % kobber gir solvet tilstrekkelig hardhet, samtidig som det i stor grad bevarer solvets karakteristiske glans og farge.",
        ],
      },
      {
        title: "Forskjellene mellom 999, 900 og 800 finhet solv",
        paragraphs: [
          "999 finhet (fine silver/rent solv) foretrekkes til barrer og investeringsprodukter i solv, fordi renhetsgraden er det viktigste kriteriet for investorer; men pa grunn av mykheten brukes det sjelden i dagligsmykker.",
          "900 finhet (coin silver) er historisk brukt i solvmynter i mange land. 800 finhet er en smykkestandard som saerlig er utbredt i Europa (som Tyskland og Osterrike) og har lavere renhet enn sterlingsolv, men er likevel holdbar.",
        ],
      },
      {
        title: "Hvordan beregnes innholdet av rent solv?",
        paragraphs: [
          "For a finne mengden rent solv i en solvring pa 10 gram, 925 finhet: 10 × (925 / 1000) = 9,25 gram rent solv. De gjenvaerende 0,75 gram er kobber eller andre metaller tilsatt for holdbarhet.",
          "Samme logikk brukes ved omregning mellom ulike finheter: hvis mengden rent solv i en legering pa 925 finhet er kjent, finner man 999-finhets-ekvivalenten ved a dele mengden rent solv pa 999/1000.",
        ],
      },
      {
        title: "Sammenhengen mellom anlopning og renhet i solv",
        paragraphs: [
          "At solvsmykker anlopner (mister glansen) over tid, skyldes ikke solvet selv, men at kobberet i legeringen reagerer med svovelforbindelser i luften. Derfor har solv med hoyere renhet (som 999) mindre tendens til a anlope.",
          "Enkelte produsenter har utviklet 'anlopningsbestandige' sterlingsolvlegeringer for a forbedre denne egenskapen, ved a bruke andre tilsetningsstoffer, som germanium, i stedet for kobber.",
        ],
      },
    ],
    unitTable: [
      { name: "999 finhet solv", symbol: "999", referenceValue: "99,9 % rent solv", system: "Gullsmedstandard", commonUse: "Barrer, investeringssolv" },
      { name: "925 finhet solv", symbol: "925", referenceValue: "92,5 % rent solv (sterling)", system: "Gullsmedstandard", commonUse: "Smykker og bestikk (verdensstandard)" },
      { name: "900 finhet solv", symbol: "900", referenceValue: "90 % rent solv", system: "Gullsmedstandard", commonUse: "Historiske solvmynter" },
      { name: "800 finhet solv", symbol: "800", referenceValue: "80 % rent solv", system: "Gullsmedstandard (Europa)", commonUse: "Europeisk smykkestandard" },
    ],
  },
];

export function findNorwegianCategoryPage(slug: string) {
  return norwegianCategoryPages.find((page) => page.slug === slug);
}

export function findNorwegianCategoryPageByTurkishSlug(sourceSlug: string) {
  return norwegianCategoryPages.find((page) => page.sourceSlug === sourceSlug);
}
