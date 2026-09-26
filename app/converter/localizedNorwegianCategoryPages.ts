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
      "Lengde er den fysiske størrelsen som beskriver avstanden mellom to punkter eller utstrekningen til et objekt i en bestemt retning. I vitenskapelige målinger er meter grunnenheten for lengde i Det internasjonale enhetssystemet (SI).",
      "I dagliglivet og i vitenskapelig arbeid brukes ulike lengdeenheter -- som nanometer, mikrometer, millimeter, centimeter, meter og kilometer -- avhengig av størrelsen på avstanden som måles.",
      "Enheter utenfor det metriske systemet, som tomme, fot, yard og mile, brukes fortsatt, særlig i sammenhenger knyttet til USA og Storbritannia.",
    ],
    facts: [
      { label: "SI-grunnenhet", value: "Meter" },
      { label: "SI-enhetssymbol", value: "m" },
      { label: "Fysisk størrelse", value: "Lengde" },
      { label: "Dimensjonssymbol", value: "L" },
      { label: "Gjeldende meterdefinisjon", value: "Avstanden lyset tilbakelegger i vakuum på 1/299 792 458 sekund" },
    ],
    sections: [
      {
        title: "Hva er lengde?",
        paragraphs: [
          "Lengde er en av de grunnleggende fysiske størrelsene som brukes til å beskrive høyden, bredden, tykkelsen til et objekt eller avstanden mellom to punkter. Avhengig av målretningen kan et og samme objekt ha flere ulike lengdeverdier.",
          "I fysikk betegnes lengde vanligvis med dimensjonssymbolet L. Lengdedimensjonen brukes til å definere mange avledede størrelser, som areal, volum, hastighet, akselerasjon, trykk og tetthet.",
        ],
      },
      {
        title: "SI-enheten for lengde",
        paragraphs: [
          "I Det internasjonale enhetssystemet er grunnenheten for lengde meter, som betegnes med symbolet m. Meter er referansen som brukes til å definere alle andre lengdeenheter.",
          "Metriske enheter som kilometer, centimeter, millimeter, mikrometer og nanometer er knyttet til meteren gjennom desimale multipler og delenheter. Denne strukturen gjør at omregning mellom metriske enheter kan gjøres ved hjelp av tierpotenser.",
        ],
      },
      {
        title: "Den vitenskapelige definisjonen av meteren",
        paragraphs: [
          "Meteren ble tidligere definert ut fra jordens dimensjoner og fysiske målestaver. Etter hvert som måleteknologien utviklet seg, oppsto behovet for en mer stabil definisjon som kunne reproduseres overalt i verden.",
          "I dag defineres en meter som lengden lyset tilbakelegger i vakuum i et tidsintervall på 1/299 792 458 sekund. Denne definisjonen bygger på at lysets hastighet i vakuum er fastsatt til nøyaktig 299 792 458 meter per sekund.",
        ],
      },
      {
        title: "Metriske lengdeenheter",
        paragraphs: [
          "I det metriske systemet er enhetene knyttet til meteren gjennom positive eller negative potenser av tallet 10. En kilometer tilsvarer 1000 meter, en centimeter tilsvarer 0,01 meter, og en millimeter tilsvarer 0,001 meter.",
          "For svært små lengder brukes mikrometer, nanometer og pikometer. Celler måles ofte i mikrometer, lysbølgelengder i nanometer, og enkelte avstander på atomært nivå kan uttrykkes i pikometer.",
        ],
      },
      {
        title: "Lengdeenheter utenfor det metriske systemet",
        paragraphs: [
          "Tomme, fot, yard og engelsk mil er vanlige lengdeenheter utenfor det metriske systemet. Disse enhetene brukes særlig i det amerikanske målesystemet og enkelte praksiser knyttet til britisk måletradisjon.",
          "En tomme tilsvarer nøyaktig 2,54 centimeter, en fot tilsvarer 12 tommer, og en yard tilsvarer 3 fot. En engelsk mil er definert til nøyaktig 1609,344 meter.",
        ],
      },
      {
        title: "Lengde i sjøfart og luftfart",
        paragraphs: [
          "I sjøfart og luftfart uttrykkes avstander vanligvis i nautiske mil. En nautisk mil tilsvarer nøyaktig 1852 meter.",
          "Den nautiske milen er utviklet fra en historisk måletilnærming knyttet til jordens geografiske koordinater. Fartsenheten knop betyr også nautiske mil per time.",
        ],
      },
      {
        title: "Hvordan måles lengde?",
        paragraphs: [
          "I hverdagslige målinger brukes verktøy som linjal, målebånd, skyvelær og mikrometer. Presisjonen til måleredskapet velges ut fra størrelsen på objektet som måles og nøyaktighetsnivå som kreves.",
          "I ingeniør- og forskningssammenheng kan laseravstandsmalere, koordinatmålemaskiner, interferometre og ulike optiske målesystemer benyttes.",
        ],
      },
      {
        title: "Målenøyaktighet og usikkerhet",
        paragraphs: [
          "Ingen fysisk måling er absolutt feilfri. Det finnes alltid en viss usikkerhet i måleresultatet, som skyldes instrumentets oppløsning, kalibrering, miljøforhold og metoden som brukes.",
          "Derfor bør ikke bare den målte verdien, men også måleusikkerheten og enheten som er brukt, oppgis i vitenskapelige resultater. Særlig i presist ingeniørarbeid kan selv temperaturendringer påvirke lengden til et materiale.",
        ],
      },
      {
        title: "Hvordan regnes lengdeenheter om?",
        paragraphs: [
          "Ved omregning innenfor samme målesystem brukes forholdet mellom enhetene. For eksempel deles verdien på 1000 for å regne meter om til kilometer, og ganges med 1000 for å regne kilometer om til meter.",
          "Ved omregning mellom det metriske systemet og britiske eller amerikanske enheter må man bruke definerte, eksakte omregningsfaktorer. For eksempel ganges verdien med 2,54 ved omregning fra tommer til centimeter.",
        ],
      },
    ],
    unitTable: [
      { name: "Nanometer", symbol: "nm", referenceValue: "0,000000001 m", system: "SI/metrisk", commonUse: "Lysbølgelengde og nanoteknologi" },
      { name: "Mikrometer", symbol: "µm", referenceValue: "0,000001 m", system: "SI/metrisk", commonUse: "Celler, partikler og presisjonsproduksjon" },
      { name: "Millimeter", symbol: "mm", referenceValue: "0,001 m", system: "SI/metrisk", commonUse: "Tekniske tegninger og små mål" },
      { name: "Centimeter", symbol: "cm", referenceValue: "0,01 m", system: "SI/metrisk", commonUse: "Måling av hverdagsgjenstander" },
      { name: "Desimeter", symbol: "dm", referenceValue: "0,1 m", system: "SI/metrisk", commonUse: "Undervisning og enkelte volumforhold" },
      { name: "Meter", symbol: "m", referenceValue: "1 m", system: "SI", commonUse: "Grunnleggende lengdemålinger" },
      { name: "Kilometer", symbol: "km", referenceValue: "1000 m", system: "SI/metrisk", commonUse: "Vei- og geografiske avstander" },
      { name: "Tomme", symbol: "in", referenceValue: "0,0254 m", system: "Britisk/amerikansk", commonUse: "Skjermer, rør og tekniske mål" },
      { name: "Fot", symbol: "ft", referenceValue: "0,3048 m", system: "Britisk/amerikansk", commonUse: "Høyde, bygg og luftfart" },
      { name: "Yard", symbol: "yd", referenceValue: "0,9144 m", system: "Britisk/amerikansk", commonUse: "Idrettsbaner og avstandsmålinger" },
      { name: "Engelsk mil", symbol: "mi", referenceValue: "1609,344 m", system: "Britisk/amerikansk", commonUse: "Veiavstander" },
      { name: "Nautisk mil", symbol: "nmi", referenceValue: "1852 m", system: "Sjøfart", commonUse: "Sjøfart og luftfart" },
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
      "Areal er en avledet fysisk størrelse som beskriver utstrekningen til en todimensjonal flate. Siden det oppstår ved å multiplisere en lengdeenhet med samme lengdeenhet, har areal alltid dimensjonen 'lengde i annen' (L²).",
      "I Det internasjonale enhetssystemet er den avledede enheten for areal kvadratmeter (m²). I landbruk og eiendomsmåling brukes også mål, dekar og hektar; i det britiske/amerikanske systemet kvadratfot og acre; og i Sør-Asia lokale enheter som bigha, katha og decimal.",
    ],
    facts: [
      { label: "Fysisk størrelse", value: "Areal" },
      { label: "Dimensjonssymbol", value: "[L²]" },
      { label: "SI-avledet enhet", value: "Kvadratmeter" },
      { label: "SI-enhetssymbol", value: "m²" },
      { label: "Grunnformel (rektangel)", value: "Areal = Lengde × Bredde" },
    ],
    sections: [
      {
        title: "Hva er areal?",
        paragraphs: [
          "Areal beskriver størrelsen på en flate eller et plant område. Hvor mye plass et jordstykke, gulvet i et rom eller et ark papir opptar, måles i areal.",
          "Areal er en avledet størrelse; den fremkommer ved å multiplisere en grunnleggende lengdeenhet med seg selv. Derfor angis SI-dimensjonen til areal som L² (lengde i annen), og areal er alltid en positiv skalar størrelse.",
        ],
      },
      {
        title: "SI-enheten for areal: kvadratmeter",
        paragraphs: [
          "I Det internasjonale enhetssystemet er den avledede enheten for areal kvadratmeter (m²), som beskriver arealet til et kvadrat med sidelengde nøyaktig 1 meter.",
          "Kvadratmeter er ikke en egen grunnenhet, men en avledet enhet, siden den fremkommer ved å kvadrere lengdeenheten (meter). Alle andre metriske arealenheter (som kvadratcentimeter og kvadratkilometer) er knyttet til kvadratmeter gjennom tierpotenser.",
        ],
      },
      {
        title: "Hvorfor regnes arealenheter om med et kvadratisk forhold?",
        paragraphs: [
          "Når man regner om mellom lengdeenheter, brukes forholdet direkte, men mellom arealenheter må dette forholdet kvadreres. For eksempel tilsvarer 1 kilometer 1000 meter, men 1 kvadratkilometer tilsvarer ikke 1000 kvadratmeter, men 1000², altså 1 000 000 kvadratmeter.",
          "Dette skyldes at begge dimensjonene (lengde og bredde) i en arealenhet vokser eller krymper i samme forhold. Å overse dette kvadratiske forholdet er den vanligste regnefeilen ved arealomregning -- for eksempel å tro at '1 km² = 1000 m²'.",
        ],
      },
      {
        title: "Metriske arealenheter",
        paragraphs: [
          "I det metriske systemet brukes kvadratmillimeter og kvadratcentimeter for små arealer, kvadratmeter for hverdagslige målinger, og kvadratkilometer for store arealer. En kvadratcentimeter tilsvarer 0,0001 kvadratmeter, og en kvadratkilometer tilsvarer 1 000 000 kvadratmeter.",
          "For eiendomsmåling brukes ar (100 m²) og hektar, som er 100 ganger større (10 000 m²). Hektar er den mest brukte metriske arealenheten i verden for å beskrive jordbruksarealer.",
        ],
      },
      {
        title: "Målenheten donum/dekar i Tyrkia",
        paragraphs: [
          "I Tyrkia er donum og dekar de mest brukte enhetene for å måle jordbruksareal; begge tilsvarer i dag 1000 kvadratmeter og kan brukes om hverandre. Dekar er det offisielle navnet i lovgivningen om mål og vekt, mens donum er den tradisjonelle betegnelsen i dagligtale.",
          "Under det osmanske riket kunne størrelsen på en donum variere fra 900 til 1600 m² avhengig av region. Med måleloven av 1931 ble donum standardisert til nøyaktig 1000 m² ved å knytte den til dekar.",
        ],
      },
      {
        title: "Arealenheter i det britiske/amerikanske systemet",
        paragraphs: [
          "Kvadratfot (ft²) og kvadrattomme (in²) brukes for små flater, mens acre brukes for store jordstykker i det britiske/amerikanske målesystemet. En acre tilsvarer nøyaktig 4046,8564224 kvadratmeter.",
          "Den historiske opprinnelsen til acre er størrelsen på jordet et par okser kunne pluye på en dag. Den brukes fortsatt i eiendomsannonser i USA, Storbritannia og enkelte samveldeland.",
        ],
      },
      {
        title: "Arealenheter i Sør-Asia",
        paragraphs: [
          "I land som India, Bangladesh, Pakistan og Nepal brukes fortsatt lokale arealenheter som bigha, katha, killa, kanal, marla, guntha, biswa og decimal. Størrelsen på disse enhetene kan variere betydelig fra region til region, selv under samme navn.",
          "For eksempel tilsvarer en bigha om lag 1338 m² i Vest-Bengal, mens den kan ha en annen verdi i en annen delstat. Derfor er det viktig å bekrefte hvilken regional standard som gjelder ved eiendomstransaksjoner med disse enhetene.",
        ],
      },
      {
        title: "Hvordan beregnes areal?",
        paragraphs: [
          "For et rektangulært areal er formelen Areal = Lengde × Bredde. For en trekant brukes Areal = (Grunnlinje × Høyde) / 2, og for en sirkel brukes Areal = π × Radius².",
          "For uregelmessig formede tomter finner man arealet ved å dele figuren opp i mindre rektangler/trekanter og beregne arealet til hver del for seg (eller ved koordinatbaserte polygonformler i matrikkelmålinger).",
        ],
      },
      {
        title: "Hva bør man være oppmerksom på ved arealmåling?",
        paragraphs: [
          "En arealverdi oppgitt i en eiendomsannonse eller et skjøte må tolkes ut fra enheten som er brukt (m², donum, acre, bigha) og hvilken regional standard denne enheten er definert etter.",
          "Særlig ved internasjonale eiendomstransaksjoner unngår man misforståelser ved å se på den eksakte kvadratmeterverdien fremfor navnelikheten til enheten; omregningsverktøyet på denne siden sammenligner alle enheter ut fra en felles kvadratmeterreferanse.",
        ],
      },
    ],
    unitTable: [
      { name: "Kvadratmillimeter", symbol: "mm²", referenceValue: "0,000001 m²", system: "SI/metrisk", commonUse: "Tekniske tegninger og små flater" },
      { name: "Kvadratcentimeter", symbol: "cm²", referenceValue: "0,0001 m²", system: "SI/metrisk", commonUse: "Overflateareal til små gjenstander" },
      { name: "Kvadratmeter", symbol: "m²", referenceValue: "1 m²", system: "SI", commonUse: "Bolig-, kontor- og tomteareal" },
      { name: "Ar", symbol: "a", referenceValue: "100 m²", system: "Metrisk", commonUse: "Små tomteparseller" },
      { name: "Donum/Dekar", symbol: "donum", referenceValue: "1000 m²", system: "Tyrkia (metrisk)", commonUse: "Måling av jordbruksareal" },
      { name: "Hektar", symbol: "ha", referenceValue: "10 000 m²", system: "Metrisk", commonUse: "Store jordbruks- og skogsarealer" },
      { name: "Kvadratkilometer", symbol: "km²", referenceValue: "1 000 000 m²", system: "SI/metrisk", commonUse: "By-, land- og geografiske arealer" },
      { name: "Kvadratfot", symbol: "ft²", referenceValue: "0,092903 m²", system: "Britisk/amerikansk", commonUse: "Boligareal (USA/Storbritannia)" },
      { name: "Kvadratyard", symbol: "yd²", referenceValue: "0,83612736 m²", system: "Britisk/amerikansk", commonUse: "Idrettsbaner og tekstil" },
      { name: "Acre", symbol: "ac", referenceValue: "4046,8564224 m²", system: "Britisk/amerikansk", commonUse: "Store jordstykker" },
      { name: "Bigha", symbol: "bigha", referenceValue: "≈1337,8 m² (varierer etter region)", system: "Sør-Asia", commonUse: "Jordbruksareal i India/Bangladesh" },
      { name: "Tsubo", symbol: "tsubo", referenceValue: "≈3,31 m²", system: "Japan", commonUse: "Japansk bolig- og tomtemåling" },
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
      "Volum er en avledet fysisk størrelse som beskriver størrelsen på rommet et tredimensjonalt objekt eller en beholder opptar eller kan romme. Siden det fremkommer ved å multiplisere en lengdeenhet i tre dimensjoner (lengde × bredde × høyde), har volum dimensjonen L³ (lengde i tredje).",
      "I Det internasjonale enhetssystemet er den avledede enheten for volum kubikkmeter (m³); i dagliglivet er liter og milliliter langt vanligere. I kjøkkenet brukes tradisjonelle mål som spiseskje, teskje og kopp, mens det amerikanske/britiske systemet bruker gallon, quart, pint og fluid ounce.",
    ],
    facts: [
      { label: "Fysisk størrelse", value: "Volum" },
      { label: "Dimensjonssymbol", value: "[L³]" },
      { label: "SI-avledet enhet", value: "Kubikkmeter" },
      { label: "SI-enhetssymbol", value: "m³" },
      { label: "Mest brukte enhet i dagliglivet", value: "Liter (L)" },
    ],
    sections: [
      {
        title: "Hva er volum?",
        paragraphs: [
          "Volum er størrelsen på det tredimensjonale rommet et objekt opptar eller en beholder kan romme. Volumet til et fast objekt beskriver dets fysiske størrelse, mens volumet til en beholder beskriver hvor mye væske eller gass den kan inneholde.",
          "Volum er en avledet størrelse; den fremkommer ved å multiplisere en lengdeenhet i tre dimensjoner (lengde, bredde, høyde). Derfor angis SI-dimensjonen som L³.",
        ],
      },
      {
        title: "SI-enheten for volum: kubikkmeter",
        paragraphs: [
          "I Det internasjonale enhetssystemet er den avledede enheten for volum kubikkmeter (m³), som beskriver det indre volumet til en kube der hver side er nøyaktig 1 meter.",
          "Kubikkmeter brukes for store volumer (som vanntanker, betongstøping og containervolum), mens liter, som er langt mindre, foretrekkes i dagliglivet. 1 kubikkmeter tilsvarer nøyaktig 1000 liter.",
        ],
      },
      {
        title: "Forholdet mellom liter og kubikkmeter",
        paragraphs: [
          "Liter er en praktisk volumenhet som er akseptert til bruk sammen med SI, men som ikke er en offisiell SI-enhet. En liter tilsvarer volumet til en kube med sidelengde 10 centimeter (1000 kubikkcentimeter).",
          "Delenhetene til liter -- desiliter, centiliter og milliliter -- brukes mye innen mat, medisin og laboratoriemålinger. En milliliter tilsvarer nøyaktig en kubikkcentimeter (1 mL = 1 cm³).",
        ],
      },
      {
        title: "Hvorfor regnes volumenheter om med et kubisk forhold?",
        paragraphs: [
          "Mens lengdeenheter regnes om med et lineært forhold og arealenheter med et kvadratisk forhold, regnes volumenheter om med et kubisk (tredje potens) forhold. For eksempel tilsvarer 1 meter 100 centimeter, men 1 kubikkmeter tilsvarer ikke 100 kubikkcentimeter, men 100³, altså 1 000 000 kubikkcentimeter.",
          "Dette kubiske forholdet skyldes at volumet endres i tre dimensjoner samtidig, og det er den vanligste misforståelsen ved volumomregning -- særlig ved overgang til ikke-metriske enheter som gallon og kubikkfot krever det nøye beregning.",
        ],
      },
      {
        title: "Målenheter på kjøkkenet",
        paragraphs: [
          "Mål som spiseskje, teskje og kopp som brukes i oppskrifter, er standardiserte volumenheter som sørger for at oppskrifter tilberedt i ulike kjøkken gir konsekvente resultater. Vanlig aksepterte tilsvarende verdier i Tyrkia er: 1 spiseskje ≈ 15 mL, 1 teskje ≈ 5 mL, 1 kopp ≈ 200 mL.",
          "Disse målene er ikke eksakte vitenskapelige standarder, men omtrentlige verdier som er allment akseptert i kjøkkenpraksis; for oppskrifter som krever presis måling (særlig ved baking) er det mer pålitelig å bruke en digital kjøkkenvekt.",
        ],
      },
      {
        title: "Amerikanske og britiske væskemål",
        paragraphs: [
          "I det amerikanske og britiske systemet brukes enheter som gallon, quart, pint og fluid ounce, men enhetsstørrelsene i disse to systemene er forskjellige. En amerikansk gallon tilsvarer 3,78541 liter, mens en britisk (imperial) gallon tilsvarer 4,54609 liter -- altså omtrent 20 % større.",
          "Denne forskjellen skyldes at de to landene historisk har akseptert ulike referansegalloner som standard (vingallon i USA, imperial gallon i Storbritannia). Man bør alltid sjekke hvilket system en 'gallon'- eller 'ounce'-verdi på en oppskrift eller produktetikett tilhører.",
        ],
      },
      {
        title: "Landbruks- og historiske volumenheter",
        paragraphs: [
          "Bushel og peck er historisk sett volumenheter som er brukt til å måle tørre varer som korn, frukt og grønnsaker; de brukes fremdeles i enkelte landbruksmarkeder, særlig i USA.",
          "Under det osmanske riket var kile og sinik tradisjonelle volumenheter brukt til kornmåling; 1 kile tilsvarte 20 sinik. Selv om disse enhetene varierte noe fra region til region, brukes de fortsatt som referanse ved tolkning av historiske tekster og opptegnelser.",
        ],
      },
      {
        title: "Hvordan beregnes volum?",
        paragraphs: [
          "For et rektangulært prisme (en boks) brukes formelen Volum = Lengde × Bredde × Høyde. For en sylinder gjelder Volum = π × Radius² × Høyde, og for en kule Volum = (4/3) × π × Radius³.",
          "Volumet til uregelmessig formede faste objekter kan ofte finnes ved fortrengningsmetoden (Arkimedes' prinsipp) -- ved å senke objektet i en vannfylt beholder og måle volumet av vannet som renner over.",
        ],
      },
      {
        title: "Volummåling i olje- og industrisammenheng",
        paragraphs: [
          "I oljeindustrien uttrykkes volum vanligvis i fat (barrel, bbl); 1 fat tilsvarer nøyaktig 158,987 liter (42 amerikanske gallon). Denne enheten stammer fra en tradisjon fra 1800-tallet da olje ble transportert i trefat for vin.",
          "I industrielle prosesser uttrykkes store volumer vanligvis i kubikkmeter, mens små laboratoriemålinger uttrykkes i milliliter; riktig enhetsvalg gjøres ut fra størrelsen på volumet som måles.",
        ],
      },
    ],
    unitTable: [
      { name: "Milliliter", symbol: "mL", referenceValue: "0,000001 m³", system: "SI/metrisk", commonUse: "Medisindoser og små målinger" },
      { name: "Teskje", symbol: "ts", referenceValue: "0,000005 m³ (≈5 mL)", system: "Kjøkkenmål", commonUse: "Oppskrifter" },
      { name: "Spiseskje", symbol: "ss", referenceValue: "0,000015 m³ (≈15 mL)", system: "Kjøkkenmål", commonUse: "Oppskrifter" },
      { name: "Kopp", symbol: "kopp", referenceValue: "0,0002 m³ (≈200 mL)", system: "Tyrkia (kjøkken)", commonUse: "Tyrkiske oppskrifter" },
      { name: "Liter", symbol: "L", referenceValue: "0,001 m³", system: "Metrisk", commonUse: "Drikke, drivstoff og daglig volummåling" },
      { name: "Fluid ounce (USA)", symbol: "fl oz", referenceValue: "≈0,0000296 m³ (≈29,57 mL)", system: "USA", commonUse: "Drikke- og kosmetikkemballasje" },
      { name: "Pint (USA)", symbol: "pt", referenceValue: "≈0,000473 m³ (≈473 mL)", system: "USA", commonUse: "Måling av øl og melk" },
      { name: "Gallon (USA)", symbol: "gal", referenceValue: "≈0,003785 m³ (≈3,785 L)", system: "USA", commonUse: "Drivstoff og store væskemengder" },
      { name: "Britisk gallon", symbol: "imp gal", referenceValue: "≈0,004546 m³ (≈4,546 L)", system: "Britisk (imperial)", commonUse: "Drivstoff- og væskemåling i Storbritannia" },
      { name: "Kubikkfot", symbol: "ft³", referenceValue: "≈0,0283168 m³", system: "Britisk/amerikansk", commonUse: "Bygg og HVAC-luftstrøm" },
      { name: "Fat (olje)", symbol: "bbl", referenceValue: "≈0,158987 m³ (≈158,987 L)", system: "Oljeindustri", commonUse: "Måling av råolje" },
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
      "Masse er en grunnleggende fysisk størrelse knyttet til mengden materie i et legeme og dets treghetsegenskap. I Det internasjonale enhetssystemet er grunnenheten for masse kilogram, og den betegnes med symbolet kg.",
      "Masse og vekt brukes ofte om hverandre i dagligtale, men de er fysisk sett ulike størrelser. Masse måles i kilogram, mens vekt -- som er en kraft -- måles i newton.",
    ],
    facts: [
      { label: "Fysisk størrelse", value: "Masse" },
      { label: "Dimensjonssymbol", value: "[M]" },
      { label: "SI-grunnenhet", value: "Kilogram" },
      { label: "SI-enhetssymbol", value: "kg" },
      { label: "Målevitenskapsfelt", value: "Massemetrologi" },
    ],
    sections: [
      {
        title: "Hva er masse?",
        paragraphs: [
          "Masse er den fysiske størrelsen knyttet til motstanden et legeme yter mot endring i bevegelsestilstand, altså treghet. I klassisk mekanikk uttrykkes forholdet mellom nettokraften som virker på et legeme og akselerasjonen den skaper, med F = m·å.",
          "Når samme kraft påvirker to legemer, får det legemet med størst masse mindre akselerasjon. Derfor beskriver ikke masse bare mengden materie i dagligdags forstand -- den spiller også en sentral rolle i bevegelsesligninger.",
          "Masse er en skalar størrelse. Den har ingen retning, og grunndimensjonssymbolet i SI-systemet betegnes med bokstaven M.",
        ],
      },
      {
        title: "Forskjellen mellom masse og vekt",
        paragraphs: [
          "Masse og vekt er ikke samme fysiske størrelse. Masse er en egenskap ved legemet og uttrykkes i kilogram. Vekt er derimot kraften legemet utsettes for i et gravitasjonsfelt, og måles i newton.",
          "Den forenklede vektsammenhengen er W = m·g. Her står W for vektkraften, m for massen og g for den lokale gravitasjonsakselerasjonen.",
          "Massen til et legeme forblir tilnærmet den samme på jorden og på månen, men fordi den lokale gravitasjonsakselerasjonen er ulik, endres vekten. Derfor er kilogram i vitenskapelig sammenheng en masseenhet, ikke en vektenhet.",
          "I dagligtale uttrykkes veieresultatet i kilogram, og ordene 'vekt' og 'masse' brukes derfor ofte om hverandre. En vekt registrerer i realiteten en kraftpåvirkning, men kalibreres til å vise resultatet i masseenheter.",
        ],
      },
      {
        title: "Hvorfor er kilogram SI-grunnenheten for masse?",
        paragraphs: [
          "I Det internasjonale enhetssystemet er grunnenheten for masse kilogram. Kilogram er den eneste SI-grunnenheten som har et prefiks i navnet sitt.",
          "Ordet gram spilte historisk en viktig rolle i de første massedefinisjonene i det metriske systemet. Men da praktiske standarder skulle etableres, ble kilogram den grunnleggende referansen.",
          "I dag defineres ikke kilogram ut fra massen til en fysisk metallsylinder, men ut fra en fastsatt tallverdi for Plancks konstant. Sammenhengen mellom denne definisjonen, Kibble-vekten og elektriske målinger er beskrevet i detalj på kilogram-informasjonssiden.",
        ],
      },
      {
        title: "Metriske masseenheter",
        paragraphs: [
          "Metriske masseenheter er bygget opp av kilogram, gram og SI-prefiksene som legges til disse. Et gram er 0,001 kilogram, et milligram er 0,001 gram, og et mikrogram er 0,001 milligram.",
          "For store masser brukes tonn. Et metrisk tonn tilsvarer nøyaktig 1000 kilogram. Symbolet for tonn, som er akseptert til bruk sammen med SI, er liten t.",
          "Riktig enhet velges ut fra størrelsen på massen som måles. Menneske- og produktmasser kan uttrykkes i kilogram, matinnhold i gram, virkestoffer i medisiner i milligram eller mikrogram, og kjøretøylaster i tonn.",
        ],
      },
      {
        title: "Forholdet mellom pund, ounce og kilogram",
        paragraphs: [
          "Pund og ounce er masseenheter brukt i de britiske og amerikanske tradisjonelle målesystemene. Det internasjonale avoirdupois-pundet tilsvarer nøyaktig 0,45359237 kilogram.",
          "Et avoirdupois-pund deles i 16 ounce. Dermed tilsvarer en ounce nøyaktig 0,028349523125 kilogram, eller 28,349523125 gram.",
          "Pund brukt i massekonvertering må ikke forveksles med kraftenheten pound-force. Pund uttrykker masse, mens pound-force uttrykker kraft. I tekniske beregninger må symbolene lb og lbf ikke blandes sammen.",
        ],
      },
      {
        title: "Hvordan måles masse?",
        paragraphs: [
          "Ved massemåling brukes likearmet vekt, elektronisk vekt, analysevekt, lastceller og industrielle veiesystemer med ulik kapasitet.",
          "Sammenlignende vekter sammenligner en ukjent masse med sporbare standardmasser. I elektroniske vekter kan lastceller omdanne den påfølgende kraften til et elektrisk signal.",
          "Ved høypresisjonsmålinger kan faktorer som luftens oppdrift, lokal gravitasjonsakselerasjon, temperatur, fuktighet, vibrasjon, elektrostatiske effekter og tettheten til standardmassen tas med i betraktningen.",
          "At massestandarder kobles til nasjonale og internasjonale målesystemer, kalles metrologisk sporbarhet. Kalibreringskjeden gjør det mulig å sammenligne målinger utført ved ulike laboratorier og virksomheter.",
        ],
      },
      {
        title: "Forholdet mellom tetthet, volum og masse",
        paragraphs: [
          "Mellom masse, tetthet og volum gjelder sammenhengen m = ρ·V. Her står m for masse, ρ for tetthet og V for volum.",
          "To stoffer med samme volum kan ha forskjellig masse avhengig av tettheten. For eksempel har stål og vann med samme volum ikke samme masse.",
          "I SI-systemet er grunnenheten for tetthet kilogram per kubikkmeter. I laboratoriesammenheng brukes også enheter som gram per kubikkcentimeter eller gram per milliliter.",
        ],
      },
      {
        title: "Usikkerhet i massemåling",
        paragraphs: [
          "Enhver reell måling har en viss usikkerhet. At en vekt viser mange sifre på skjermen, betyr ikke at alle sifrene er kjent med samme nøyaktighet.",
          "Instrumentoppløsning, repeterbarhet, ikke-linearitet, kalibreringsstandard, miljøforhold og brukermetode kan alle bidra til usikkerheten i en massemåling.",
          "I vitenskapelig og industrielt arbeid bør måleresultatet vurderes sammen med riktig enhet, gjeldende sifre og usikkerhetsinformasjon.",
        ],
      },
      {
        title: "Hvordan velges riktig masseenhet?",
        paragraphs: [
          "Å velge en enhet som passer til størrelsen på objektet som måles, gjør resultatet mer lesbart. Massen til et menneske kan uttrykkes i kilogram, virkestoffet i en tablett i milligram, og lasten til en lastebil i tonn.",
          "For svært små masser kan SI-prefikserte enheter som mikrogram, nanogram og pikogram brukes. På atom- og molekylskala kan spesielle enheter som den forente atommasseenheten være mer praktiske.",
          "Ved enhetsomregning må man ikke bare kontrollere den numeriske verdien, men også om enheten som brukes, uttrykker masse eller kraft.",
        ],
      },
    ],
    unitTable: [
      { name: "Nanogram", symbol: "ng", referenceValue: "10⁻¹² kg", system: "SI", commonUse: "Svært små stoffmengder" },
      { name: "Mikrogram", symbol: "µg", referenceValue: "10⁻⁹ kg", system: "SI", commonUse: "Medisin- og laboratoriemålinger" },
      { name: "Milligram", symbol: "mg", referenceValue: "10⁻⁶ kg", system: "SI", commonUse: "Medisindoser og kjemikalier" },
      { name: "Gram", symbol: "g", referenceValue: "0,001 kg", system: "SI", commonUse: "Mat og små gjenstander" },
      { name: "Kilogram", symbol: "kg", referenceValue: "1 kg", system: "SI", commonUse: "Grunnleggende massemålinger" },
      { name: "Tonn", symbol: "t", referenceValue: "1000 kg", system: "Metrisk", commonUse: "Kjøretøy, last og industri" },
      { name: "Ounce", symbol: "oz", referenceValue: "0,028349523125 kg", system: "Britisk/amerikansk", commonUse: "Mat og små masser" },
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
      "Temperatur er en grunnleggende fysisk størrelse knyttet til den gjennomsnittlige kinetiske energien til partiklene i et stoff, som beskriver hvor 'varmt' eller 'kaldt' stoffet er. I Det internasjonale enhetssystemet er grunnenheten for temperatur kelvin.",
      "I dagliglivet er Celsius og Fahrenheit de mest brukte skalaene; i vitenskapelig arbeid brukes kelvin, i enkelte ingeniørberegninger Rankine, og i historiske tekster Reaumur. I motsetning til de fleste andre fysiske størrelser krever omregning mellom temperaturenheter både multiplikasjon og addisjon/subtraksjon.",
    ],
    facts: [
      { label: "Fysisk størrelse", value: "Temperatur (termodynamisk temperatur)" },
      { label: "Dimensjonssymbol", value: "[Θ]" },
      { label: "SI-grunnenhet", value: "Kelvin" },
      { label: "SI-enhetssymbol", value: "K" },
      { label: "Absolutt nullpunkt", value: "0 K = -273,15 °C = -459,67 °F" },
    ],
    sections: [
      {
        title: "Hva er temperatur?",
        paragraphs: [
          "Temperatur er en størrelse direkte knyttet til den gjennomsnittlige kinetiske (bevegelses-)energien til atomene og molekylene som utgjør et stoff. Jo raskere partiklene beveger seg, desto 'varmere' anses stoffet å være.",
          "Temperatur er en av de sju grunnleggende størrelsene i Det internasjonale enhetssystemet og betegnes som termodynamisk temperatur med symbolet Θ (theta). I motsetning til mange andre størrelser (som lengde og masse) er den ikke en direkte additiv størrelse -- å slå sammen to legemer summerer ikke temperaturene deres, men fører dem mot en likevekt.",
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
          "Ved enhetsomregning for størrelser som lengde eller masse brukes bare en multiplikasjonsfaktor (for eksempel meter-centimeter). For temperatur har Celsius-, Fahrenheit- og Kelvin-skalaene ulike 'nullpunkter', så omregningen krever både multiplikasjon og addisjon/subtraksjon.",
          "For eksempel ganges verdien først med 9/5 og deretter legges 32 til når man går fra Celsius til Fahrenheit: °F = (°C × 9/5) + 32. Derfor er temperatur den eneste vanlige fysiske størrelsen som har et 'affint' (lineært, men ikke gjennom origo) omregningsforhold.",
        ],
      },
      {
        title: "Celsius-skalaen",
        paragraphs: [
          "Celsius-skalaen ble utviklet i 1742 av den svenske astronomen Anders Celsius, og definerer vannets frysepunkt til 0 °C og kokepunkt (ved 1 atmosfæres trykk) til 100 °C. Dette er et praktisk referansesystem som gjør skalaen lett å forstå i dagliglivet.",
          "Celsius er den mest brukte temperaturskalaen i vitenskapelig arbeid og i værrapportering i de fleste land i verden; et fåtall land, som USA, foretrekker fortsatt Fahrenheit i dagligbruk.",
        ],
      },
      {
        title: "Fahrenheit-skalaen",
        paragraphs: [
          "Fahrenheit-skalaen ble utviklet i 1724 av den tyske fysikeren Daniel Gabriel Fahrenheit. På denne skalaen er vannets frysepunkt 32 °F og kokepunkt 212 °F -- et intervall på hele 180 grader mellom frysing og koking.",
          "Fahrenheit brukes i dag hovedsakelig i USA og et fåtall andre land til daglig temperaturmåling; i vitenskapelig arbeid har den i stor grad blitt erstattet av Celsius og kelvin verden over.",
        ],
      },
      {
        title: "Rankine og Reaumur: mindre kjente skalaer",
        paragraphs: [
          "Rankine er en absolutt temperaturskala som bruker enheter på størrelse med Fahrenheit-grader, men som setter det absolutte nullpunktet til 0 °R; vannets frysepunkt er 491,67 °R. Den foretrekkes fremfor kelvin i enkelte termodynamiske ingeniørberegninger, særlig i USA.",
          "Reaumur-skalaen ble utviklet på 1700-tallet av den franske vitenskapsmannen Rene Reaumur; den setter vannets frysepunkt til 0 °Re og kokepunkt til 80 °Re. Den brukes nærmest ikke i dag, men kan fortsatt dukke opp som en historisk referanse i enkelte europeiske land (særlig i noen tradisjonelle russiske oppskrifter).",
        ],
      },
      {
        title: "Hva betyr absolutt nullpunkt?",
        paragraphs: [
          "Absolutt nullpunkt (0 kelvin, -273,15 °C, -459,67 °F) er den teoretiske temperaturen der partiklene har den lavest mulige kinetiske energien i klassisk forstand. Ifølge kvantemekanikken står ikke partikler helt stille selv ved absolutt nullpunkt (nullpunktsenergi), men i klassisk forstand kan ingen lavere temperatur defineres.",
          "Under laboratorieforhold har man oppnådd temperaturer svært nær absolutt nullpunkt (helt ned på mikrokelvin- og til og med nanokelvinnivå), men ifølge termodynamikkens tredje lov er det umulig å nå absolutt nullpunkt fullstendig i et endelig antall trinn.",
        ],
      },
      {
        title: "Hvordan måles temperatur?",
        paragraphs: [
          "Ved temperaturmåling brukes ulike teknologier som kvikksølv-/alkoholtermometre, digitale termometre, termoelementer, motstandstermometre (RTD) og infrarøde (kontaktløse) termometre. Hver av dem passer for ulike temperaturområder og presisjonsnivå.",
          "Termoelementer brukes ofte i industrielle miljøer fordi de kan fungere over et svært bredt temperaturområde (noen ganger fra -200 °C til +2000 °C); de beregner temperaturen ut fra spenningsforskjellen som oppstår der to ulike metaller møtes.",
        ],
      },
    ],
    unitTable: [
      { name: "Kelvin", symbol: "K", referenceValue: "Grunnenhet", system: "SI", commonUse: "Vitenskapelige og termodynamiske beregninger" },
      { name: "Celsius", symbol: "°C", referenceValue: "K = °C + 273,15", system: "Metrisk (dagligbruk)", commonUse: "Vær, dagligliv, vitenskap" },
      { name: "Fahrenheit", symbol: "°F", referenceValue: "°F = (°C × 9/5) + 32", system: "USA", commonUse: "Daglig værmelding i USA" },
      { name: "Rankine", symbol: "°R", referenceValue: "°R = (°C + 273,15) × 9/5", system: "USA (ingeniør)", commonUse: "Termodynamiske ingeniørberegninger" },
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
      "Tid er en grunnleggende fysisk størrelse som beskriver rekkefølgen av hendelser og varigheten mellom dem. I Det internasjonale enhetssystemet er grunnenheten for tid sekund, og den brukes i dagliglivet sammen med avledede enheter som minutt, time og dag.",
      "I motsetning til størrelser som lengde eller masse er tid et av menneskehetens eldste målebegreper; den 60-baserte strukturen til time, minutt og sekund går tusenvis av år tilbake, til det antikke Babylon.",
    ],
    facts: [
      { label: "Fysisk størrelse", value: "Tid" },
      { label: "Dimensjonssymbol", value: "[T]" },
      { label: "SI-grunnenhet", value: "Sekund" },
      { label: "SI-enhetssymbol", value: "s" },
      { label: "Gjeldende sekunddefinisjon", value: "9 192 631 770 svingningsperioder til et cesium-133-atom" },
    ],
    sections: [
      {
        title: "Hva er tid?",
        paragraphs: [
          "Tid er en grunnleggende størrelse som beskriver rekkefølgen hendelser skjer i, og varigheten mellom to hendelser. I fysikk betegnes den med dimensjonssymbolet T og inngår i definisjonen av mange avledede størrelser, som hastighet, akselerasjon og frekvens.",
          "Mens tid i klassisk fysikk ble ansett som en absolutt størrelse som fløt likt for alle observatører, har Einsteins relativitetsteori vist at tiden kan flyte ulikt avhengig av observatørens hastighet og gravitasjonsfelt (tidsdilatasjon).",
        ],
      },
      {
        title: "SI-enheten for tid: sekund",
        paragraphs: [
          "Sekund er SI-grunnenheten for tid og betegnes med symbolet s. Historisk ble sekundet definert som 1/86 400 av en dag (24 timer × 60 minutter × 60 sekunder).",
          "På grunn av små uregelmessigheter i jordens rotasjonshastighet ble denne definisjonen ansett som ikke stabil nok; i 1967 ble sekundet omdefinert til nøyaktig 9 192 631 770 perioder av strålingen som svarer til overgangen mellom to grunnenerginivåer i cesium-133-atomet. Denne definisjonen sikrer at atomklokker fungerer med samme presisjon overalt i verden.",
        ],
      },
      {
        title: "Den 60-baserte opprinnelsen til time, minutt og sekund",
        paragraphs: [
          "At en time deles i 60 minutter og et minutt i 60 sekunder, bygger på det 60-baserte (seksagesimale) tallsystemet som ble brukt av det antikke Babylon. Babylonerne delte både vinkler (360 grader) og tid etter dette systemet.",
          "Grunnen til at tallet 60 ble foretrukket, er at det kan deles jevnt på mange tall, som 2, 3, 4, 5, 6, 10, 12, 15, 20 og 30 -- dette gjorde praktisk inndeling (for eksempel å dele en time i tre eller fire) mulig uten å måtte bruke brøkdeler.",
        ],
      },
      {
        title: "Hvorfor er døgnet delt i 24 timer?",
        paragraphs: [
          "Inndelingen av døgnet i 24 timer går tilbake til det gamle Egypt; egypterne delte dagen i 12 og natten i 12 like deler og fulgte tiden med solur og stjerneobservasjoner.",
          "Denne 12-delingen er trolig inspirert av å telle leddene på fingrene til en hånd (tre ledd på hver av de fire fingrene utenom tommelen, totalt 12), eller av antall månesykluser i løpet av et år (om lag 12 fullmåner).",
        ],
      },
      {
        title: "Forholdet mellom metriske tidsenheter",
        paragraphs: [
          "Delenhetene til sekundet -- millisekund (0,001 sekund), mikrosekund og nanosekund -- brukes til å måle svært korte hendelser, som datamaskinprosesser, idrettstidtaking og vitenskapelige eksperimenter.",
          "Enhetene over sekundet -- minutt (60 sekunder), time (3600 sekunder) og døgn (86 400 sekunder) -- er de grunnleggende enhetene som brukes til å følge tiden i dagliglivet. I motsetning til temperatur skjer omregning mellom disse enhetene kun ved multiplikasjon/divisjon, fordi de alle deler et felles nullpunkt (startpunkt).",
        ],
      },
      {
        title: "Hva er et skuddsekund?",
        paragraphs: [
          "Jordens rotasjonshastighet om sin egen akse viser små uregelmessigheter over tid på grunn av tidevannseffekter og endringer i jordens indre struktur; dette fører til et lite avvik mellom den 'eksakte' tiden målt med atomklokker og døgnlengden basert på jordens faktiske rotasjon.",
          "For å kompensere for dette avviket har det siden 1972 blitt lagt til et 'skuddsekund' i Koordinert universaltid (UTC) ved behov. Dette er en korreksjonsmekanisme som ligner den ekstra dagen i skuddår (29. februar), men fordi uregelmessigheten i jordens rotasjonshastighet er uforutsigbar, legges skuddsekunder til ved behov og ikke etter en fast kalendersyklus.",
        ],
      },
      {
        title: "Tidssoner og UTC",
        paragraphs: [
          "Jorden er delt inn i om lag 24 tidssoner fordi solen når sitt høyeste punkt på ulike tidspunkter avhengig av lengdegrad. Alle tidssoner bruker Koordinert universaltid (UTC) som referansepunkt og uttrykkes som en tidsforskjell fra denne referansen for sin egen region (Norge er for eksempel UTC+1 om vinteren).",
          "UTC er en moderne tidsstandard som har erstattet den gamle Greenwich middeltid (GMT) og opprettholdes med atomklokker; GMT brukes nå mest som navnet på Storbritannias vintertidssone.",
        ],
      },
      {
        title: "Hvordan måles tid?",
        paragraphs: [
          "I dagliglivet brukes mekaniske og digitale klokker, mens atomklokker brukes i vitenskapelige og teknologiske anvendelser (som GPS-satellitter og telekommunikasjonsnett). Atomklokker fungerer med ekstremt høy presisjon basert på den stabile svingningsfrekvensen til cesium- eller rubidiumatomer.",
          "For at GPS-systemet skal kunne fastslå posisjon nøyaktig, må atomklokkene i satellittene være synkronisert på nanosekundnivå; selv et lite avvik i disse klokkene kan føre til store feil i posisjonsberegningen på bakken.",
        ],
      },
    ],
    unitTable: [
      { name: "Millisekund", symbol: "ms", referenceValue: "0,001 s", system: "SI/metrisk", commonUse: "Databehandling og idrettstidtaking" },
      { name: "Sekund", symbol: "s", referenceValue: "1 s", system: "SI", commonUse: "Grunnleggende tidsmåling" },
      { name: "Minutt", symbol: "min", referenceValue: "60 s", system: "Akseptert til bruk sammen med SI", commonUse: "Daglig tidsfølging" },
      { name: "Time", symbol: "t", referenceValue: "3600 s", system: "Akseptert til bruk sammen med SI", commonUse: "Arbeidstid, reisetid" },
      { name: "Døgn", symbol: "d", referenceValue: "86 400 s", system: "Akseptert til bruk sammen med SI", commonUse: "Kalender- og varighetsberegninger" },
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
      "Hastighet er en avledet fysisk størrelse som beskriver strekningen et legeme tilbakelegger per tidsenhet. Siden den fremkommer ved å dele lengde på tid, har hastighet dimensjonen L/T (lengde delt på tid).",
      "I dagliglivet er kilometer i timen (km/t) og engelske mil i timen (mph) de mest brukte hastighetsenhetene; i vitenskapelig arbeid foretrekkes meter per sekund (m/s), og i sjøfart og luftfart knop. Lysets hastighet har en særskilt plass blant hastighetsenheter som en absolutt øvre grense som kan nås i universet.",
    ],
    facts: [
      { label: "Fysisk størrelse", value: "Hastighet (fart)" },
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
          "Hastighet er en avledet størrelse; den fremkommer ved å dele en lengdeenhet på en tidsenhet. Derfor angis SI-dimensjonen som L/T (eller L¹T⁻¹).",
        ],
      },
      {
        title: "SI-enheten for hastighet: meter per sekund",
        paragraphs: [
          "I Det internasjonale enhetssystemet er den avledede enheten for hastighet meter per sekund (m/s), som beskriver at et legeme tilbakelegger en meter hvert sekund. Denne enheten brukes som standard i vitenskapelige beregninger og fysiske formler.",
          "I dagliglivet foretrekkes kilometer i timen (km/t) fremfor meter per sekund, fordi kjøretøyhastigheter og veiavstander uttrykkes med mer intuitive tall på denne skalaen. 1 m/s tilsvarer nøyaktig 3,6 km/t.",
        ],
      },
      {
        title: "Kilometer i timen og engelske mil i timen",
        paragraphs: [
          "Kilometer i timen (km/t) er standard hastighetsenhet i veitrafikken i land som bruker det metriske systemet, deriblant Norge. Engelske mil i timen (mph) foretrekkes i land som USA og Storbritannia, som bruker det britiske målesystemet.",
          "1 mph tilsvarer om lag 1,60934 km/t. Denne forskjellen er en praktisk kilde til forvirring som kan føre til feiltolkning av fartsmålere på importerte kjøretøy eller fartsgrenser ved leiebilkjøring i utlandet.",
        ],
      },
      {
        title: "Knop: hastighet i sjøfart og luftfart",
        paragraphs: [
          "Knop (nautiske mil i timen) er standard hastighetsenhet i sjøfart og luftfart; 1 knop tilsvarer nøyaktig strekningen på 1 nautisk mil (1852 meter) tilbakelagt på en time.",
          "Navnet knop kommer historisk fra å måle et fartøys hastighet ved å kaste ut et tau med knuter (knots) i vannet og telle hvor mange knuter som passerte i løpet av et bestemt tidsrom. Denne metoden ble brukt i århundrer for de moderne hastighetsmåleinstrumentene.",
        ],
      },
      {
        title: "Lysets hastighet: universets fartsgrense",
        paragraphs: [
          "Lysets hastighet er definert til nøyaktig 299 792 458 m/s i vakuum, og ifølge Einsteins spesielle relativitetsteori er den den absolutte øvre grensen for hva informasjon eller et legeme med masse kan oppnå i universet.",
          "At lysets hastighet er definert som et eksakt tall (den ble ansett som konstant også før SI-revisjonen i 2019), gjør at den gjeldende definisjonen av meteren også bygger på denne konstanten -- meteren er definert som strekningen lyset tilbakelegger på 1/299 792 458 sekund.",
        ],
      },
      {
        title: "Mach-tall: forhold til lydhastigheten",
        paragraphs: [
          "I luftfart uttrykkes høye hastigheter ofte med Mach-tall; dette er forholdet mellom et legemes hastighet og lydhastigheten i det aktuelle mediet (Mach 1 = lydhastigheten). Lydhastigheten er ikke en fast verdi -- den varierer med luftens temperatur og tetthet (om lag 343 m/s / 1235 km/t ved havnivå).",
          "Derfor kan samme Mach-tall tilsvare ulike faktiske hastigheter (km/t eller m/s) ved ulike høyder og temperaturer -- et flys hastighet på Mach 0,85 vil variere i faktisk hastighetsverdi avhengig av høyde.",
        ],
      },
      {
        title: "Forskjellen mellom gjennomsnittsfart og momentanfart",
        paragraphs: [
          "Gjennomsnittsfart finnes ved å dele den totale tilbakelagte strekningen på den totale tiden som har gått, og gir en enkelt verdi for en hel reise. Momentanfart er derimot fartøyets hastighet på et bestemt øyeblikk, og kan endre seg kontinuerlig (akselerasjon, oppbremsing, stopp).",
          "Mens en fartsmåler i et kjøretøy viser momentanfarten, beregnes gjennomsnittsfarten for en reise vanligvis i etterkant ut fra total strekning og total tid -- disse to verdiene er forskjellige så lenge farten ikke er konstant gjennom hele reisen.",
        ],
      },
    ],
    unitTable: [
      { name: "Centimeter per sekund", symbol: "cm/s", referenceValue: "0,01 m/s", system: "SI/metrisk", commonUse: "Laboratorie- og langsom bevegelsesmåling" },
      { name: "Meter per minutt", symbol: "m/min", referenceValue: "≈0,0167 m/s", system: "SI/metrisk", commonUse: "Industriell båndhastighet" },
      { name: "Meter per sekund", symbol: "m/s", referenceValue: "1 m/s", system: "SI", commonUse: "Vitenskapelige og fysiske beregninger" },
      { name: "Kilometer i timen", symbol: "km/t", referenceValue: "≈0,278 m/s", system: "Metrisk", commonUse: "Kjøretøyhastighet og fartsgrenser" },
      { name: "Engelske mil i timen", symbol: "mph", referenceValue: "≈0,447 m/s", system: "Britisk/amerikansk", commonUse: "Kjøretøyhastighet i USA og Storbritannia" },
      { name: "Knop", symbol: "knop", referenceValue: "≈0,514 m/s", system: "Sjøfart/luftfart", commonUse: "Skips- og flyhastighet" },
      { name: "Kilometer per minutt", symbol: "km/min", referenceValue: "≈16,67 m/s", system: "Metrisk", commonUse: "Kortdistanse fartsberegninger" },
      { name: "Kilometer per sekund", symbol: "km/s", referenceValue: "1000 m/s", system: "Metrisk", commonUse: "Romfartøy- og himmellegemehastigheter" },
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
      "Regn gratis og direkte om mellom pascal, bar, psi og atmosfære; se formler og tabeller.",
    introduction: [
      "Trykk beskriver hvor mye av kraften som virker vinkelrett på en flate som faller på hver arealenhet. Bruksområdet strekker seg fra kontaktspenninger mellom faste stoffer til væsken i et rør, fra atmosfæren til vakuumsystemer. I ingeniørfag er trykk ikke bare en tallverdi, men en grunnleggende designvariabel for sikkerhet, tetthet, strukturell styrke, energiomforming og prosesskontroll.",
      "I Det internasjonale enhetssystemet er den avledede enheten for trykk pascal, som betegnes med symbolet På. En pascal tilsvarer trykket som oppstår når en kraft på en newton fordeler seg jevnt over et areal på en kvadratmeter. Derfor er trykkenheten direkte knyttet til begrepene kraft og areal; samme dimensjonsstruktur deles også med materialspenning, men den fysiske sammenhengen er ikke alltid den samme.",
      "I dagliglivet og industrien uttrykkes trykk oftest med mer praktiske enheter enn pascal. Kilopascal og PSI brukes for dekktrykk, bar i prosessanlegg, atm ved atmosfæriske forhold, og millibar i meteorologi. At ulike sektorer historisk har tatt i bruk ulike enheter, gjør det særlig viktig å forstå trykkomregning riktig og ikke blande sammen absolutt, manometrisk og differensielt trykk.",
    ],
    facts: [
      { label: "Fysisk størrelse", value: "Trykk" },
      { label: "SI-avledet enhet", value: "Pascal" },
      { label: "SI-symbol", value: "På" },
      { label: "Grunnsammenheng", value: "P = F / Å" },
      { label: "SI-ekvivalent", value: "1 På = 1 N/m²" },
      { label: "Dimensjonsformel", value: "M L⁻¹ T⁻²" },
      { label: "Standard atmosfære", value: "101 325 På" },
      { label: "Absolutt nullpunktsreferanse", value: "Fullstendig vakuum" },
    ],
    sections: [
      {
        title: "Hva er trykk?",
        paragraphs: [
          "Trykk avhenger ikke bare av størrelsen på kraften som virker på en flate, men også av hvilket areal denne kraften fordeler seg over. Når samme kraft virker på et mindre areal, øker trykket; når den fordeler seg over et større areal, avtar det. Derfor kan en skarp kniv skjære med liten kraft, mens samme kraft over en bred flate gir en langt mindre overflateeffekt.",
          "I strømningsmekanikk betraktes trykk som normalspenningskomponenten en stillestående eller bevegelig væske utover på omgivelsene. I en stillestående væske overføres trykket i alle retninger og knyttes til Pascals prinsipp i lukkede beholdere. Denne egenskapen er grunnlaget for hydrauliske presser, bremsesystemer og mange industrielle aktuatorer.",
          "Trykkbegrepet er ikke begrenset til væsker og gasser. Den gjennomsnittlige normalkraftvirkningen ved kontaktflater danner også en trykklignende fordeling. Men i ingeniørfag er det oftest strømningssystemer som rør, tanker, kompressorer, luftkanaler, vakuumkammer og atmosfæriske omgivelser som står i fokus når man snakker om trykk.",
        ],
      },
      {
        title: "Trykkformelen: P = F / Å",
        paragraphs: [
          "Grunndefinisjonen av trykk gis ved sammenhengen P = F / Å. Her står P for trykk, F for kraftkomponenten vinkelrett på flaten, og Å for arealet denne kraften fordeler seg over. Enhetsanalyse gir newton delt på kvadratmeter, som tilsvarer pascal.",
          "Denne sammenhengen gir gjennomsnittstrykket forutsatt jevn kraftfordeling. I virkelige kontaktproblemer eller komplekse felt i en væske kan trykket variere langs flaten. I slike tilfeller tas lokal trykkfordeling, differensialligninger og grensebetingelser i betraktning i stedet for en enkelt gjennomsnittsverdi.",
          "En vanlig feil i praksis er å velge feil kraftretning eller virksomt areal. Ved beregning av for eksempel stempelkraft må kun det effektive tverrsnittsarealet som er utsatt for trykk, brukes. Når geometriske detaljer som pakninger, bolter eller støtteflater overses, kan det oppstå designfeil.",
        ],
      },
      {
        title: "Hvorfor er pascal SI-trykkenheten?",
        paragraphs: [
          "Pascal fremkommer som en naturlig kombinasjon av newton, SI-enheten for kraft, og kvadratmeter, SI-enheten for areal. Sammenhengen 1 På = 1 N/m² er derfor ikke bare en definisjon, men også et dimensjonsuttrykk som viser den mekaniske opprinnelsen til trykk. Det er ikke nødvendig å definere en egen grunnenhet for trykk.",
          "SI-systemet tar sikte på å knytte avledede størrelser konsekvent til grunnenheter. At trykk uttrykkes i pascal, gir et rammeverk som er konsistent med ligninger for energitetthet, spenning, elastisitetsmodul og strømningsmekanikk. At samme enhet kan brukes på tvers av ulike fagfelt, reduserer omregningsfeil i beregninger.",
          "Pascal er ofte en liten enhet i dagliglivet. Derfor foretrekkes mer praktiske skalaer som kilopascal, megapascal eller bar i ingeniørfag. Likevel er alle disse til syvende og sist knyttet til pascal, og dermed til SI-grunnlaget.",
        ],
      },
      {
        title: "Historien om trykkmåling: Torricelli og barometeret",
        paragraphs: [
          "Den systematiske målingen av trykk startet i 1643 da den italienske vitenskapsmannen Evangelista Torricelli utviklet kvikksølvbarometeret. Torricelli fylte et glassrør lukket i den ene enden med kvikksølv og senket den åpne enden ned i en beholder med kvikksølv, og observerte at kvikksølvet i røret ble stående på en bestemt høyde og etterlot et tomrom over seg.",
          "Torricelli foreslo at høyden på kvikksølvsøylen ble balansert av vekten til luften utenfor. Denne ideen dannet det eksperimentelle grunnlaget for oppfatningen om at luft har en målbar vekt, og dermed et trykk, og regnes som starten på den vitenskapelige undersøkelsen av trykk som størrelse.",
          "I 1648 viste Florin Perier, på forslag fra Blaise Pascal, ved å måle et barometer på ulike høyder på fjellet Puy-de-Dome, at atmosfæretrykket avtar med høyden. I århundrene som fulgte, bygde man videre på dette grunnlaget; Metersystemkonvensjonen i 1875 samordnet måleenheter internasjonalt, i 1954 kom den eksakte definisjonen av standard atmosfære, og i 1971 ble pascal tatt opp som SI-enhet.",
        ],
      },
      {
        title: "Absolutt, manometrisk og differensielt trykk",
        paragraphs: [
          "Absolutt trykk måles i forhold til fullstendig vakuum. Denne referansen er den teoretiske tilstanden der trykket er null, og absolutt trykk kan ikke være negativt. Særlig gasslover, termodynamiske beregninger og enkelte tetthetsrelaterte sammenhenger arbeider med absolutt trykk.",
          "Manometrisk trykk måles derimot i forhold til atmosfæretrykket. De fleste manometre på anlegg bruker omgivelsesatmosfæren som nullreferanse; derfor er verdien som vises på skjermen, oftest manometrisk trykk. Sammenhengen mellom absolutt og manometrisk trykk er P_abs = P_manometrisk + P_atm.",
          "Differensielt trykk er trykkforskjellen mellom to punkter. I bruksområder som filtertetting, debitmåling over en blenderplate, romtrykksetting og varmevekslerytelse overvåkes direkte trykkforskjellen mellom to ulike linjer eller volumer. Denne størrelsen defineres verken i forhold til fullstendig vakuum eller kun i forhold til atmosfæren; den er direkte forskjellen mellom to punkter.",
        ],
      },
      {
        title: "Atmosfæretrykk",
        paragraphs: [
          "Atmosfæretrykk er trykket luftsøylen i jordens atmosfære utover på flater på grunn av sin vekt. Under standardforhold nær havnivå regnes det som om lag 101 325 På, altså 1 atm. Denne verdien er imidlertid ikke konstant; den varierer med høyde, værforhold og temperaturendringer.",
          "Barometre brukes til å måle atmosfæretrykket. Kvikksølvbarometre har historisk vært referanseinstrumenter, mens elektroniske trykksensorer har blitt stadig mer utbredt i moderne anvendelser. Atmosfæretrykk er viktig ikke bare for meteorologi, men også for vakuumteknologi, forbrenningssystemer og omregning mellom manometrisk og absolutt trykk.",
          "I systemer som arbeider med manometrisk trykk, kan endringer i atmosfæretrykket påvirke måletolkningen. For eksempel gir 2 bar manometrisk trykk ved havnivå og 2 bar manometrisk trykk i høyereliggende områder ikke samme absoluttverdi. Dette skillet kan være avgjørende særlig i beregninger av kompresjon, gasstetthet og kokepunkt.",
        ],
      },
      {
        title: "Hydrostatisk trykk og sammenhengen P = ρgh",
        paragraphs: [
          "I en stillestående væske øker trykket med dybden. Under antakelse om konstant tetthet uttrykkes det hydrostatiske manometriske trykket omtrentlig med sammenhengen P = ρgh. Her representerer ρ tetthet, g tyngdeakselerasjon og h høyden på væskesøylen.",
          "Denne sammenhengen er særlig nyttig for vanntanker, åpne tanker, dammer, nivåmåling og væskefylte manometre. Ved samme høyde og i samme væske regnes trykket som likt; formen på beholderen endrer ikke resultatet. Det avgjørende er væskens tetthet og den vertikale dybden i forhold til den frie overflaten.",
          "Absolutt hydrostatisk trykk omfatter ikke bare økningen ρgh, men også starttrykket ved den frie overflaten. I en åpen beholder er denne startverdien vanligvis atmosfæretrykket. Derfor må man i beregning av absolutt trykk ikke bare legge til økningen fra væskesøylen, men også det ytre trykket ved overflaten.",
        ],
      },
      {
        title: "Statisk, dynamisk og totalt trykk",
        paragraphs: [
          "Statisk trykk er trykkomponenten som representerer den lokale termodynamiske tilstanden til strømningen sett fra en observatør som beveger seg med væsken. De fleste målepunkter i rørledninger, tanker og kanaler følger i hovedsak det statiske trykket. Storparten av trykktransmittere er utformet for å måle denne størrelsen.",
          "Dynamisk trykk uttrykker den kinetiske effekten som skyldes strømningshastigheten, og den ofte brukte tilnærmede sammenhengen er q = 1/2 ρv². Dette leddet spiller en viktig rolle i Bernoulli-tilnærmingen og brukes i hastighetsmålemetoder som pitotrør. Når hastigheten øker, øker også det dynamiske trykket.",
          "Totalt trykk tolkes i en ideell strømningstilnærming som summen av statisk og dynamisk trykk. I virkelige systemer må dette skillet brukes med forsiktighet på grunn av friksjon, turbulens, komprimerbarhet og lokale tap. Likevel er skillet mellom statisk, totalt og dynamisk trykk et grunnleggende ingeniørspråk innen ventilasjon, aerodynamikk og prosessmåling.",
        ],
      },
      {
        title: "Trykkhøyde og pumpeløfthøyde",
        paragraphs: [
          "Trykkhøyde er uttrykket for et bestemt trykk som den tilsvarende høyden på en væskesøyle. Grunnsammenhengen er h = P / (ρg). Dermed tilsvarer samme trykk ulike høydeverdier for væsker med ulik tetthet.",
          "I pumpesystemer tolkes trykk ofte direkte som meter væskesøyle i stedet for pascal eller bar. Dette er fordi pumpens oppgave ikke bare er å tilføre væsken trykk, men også å levere energien som kreves for å dekke en bestemt høyde, friksjonstap og hastighetskomponent. Derfor er begrepet lofthøyde svært praktisk sett fra feltingeniøren.",
          "Trykkhøyde og geometrisk høyde er ikke samme begrep. Å kun se på manometeravlesningen uten å ta hensyn til rørtap, hastighetshode og lokale motstander kan gi feilaktige resultater ved pumpevalg og systembalansering. Særlig for vann, olje og prosessvæsker krever tetthetsforskjeller at omregningen gjøres med omhu.",
        ],
      },
      {
        title: "Hvorfor er trykkenhetene forskjellige?",
        paragraphs: [
          "Mangfoldet av trykkenheter skyldes i stor grad historiske og bransjespesifikke årsaker. Mens SI-systemet legger til grunn pascal, brukes fortsatt bar i industrien, mmHg i medisin, millibar i meteorologi, PSI i bilindustrien, og enheter som at i enkelte eldre tekniske dokumenter. Dette skyldes at ulike fagfelt har beholdt sine egne bruksvaner.",
          "Enkelte enheter oppleves som mer intuitive for brukeren. For eksempel kan dekktrykk være mer lesbart som om lag 35 psi enn som 240 kPa, og prosesstrykk som 3,5 bar i stedet for 350 000 På. Valg av enhet handler ikke bare om nøyaktighet, men også om rapporteringskultur, instrumentskalering og feltvaner.",
          "Men fordi ulike enheter uttrykker samme fysiske størrelse, er nøyaktig omregning nødvendig i felles beregninger. Særlig å blande sammen omtrentlige og eksakt definerte koeffisienter, overse skillet mellom manometrisk og absolutt trykk, og feillesing av symboler er viktige feilkilder.",
        ],
      },
      {
        title: "Hvordan måles trykk?",
        paragraphs: [
          "Ved trykkmåling må man først avgjøre hvilken type trykk som kreves: absolutt, manometrisk eller differensielt. Deretter vurderes måleområde, væsketype, temperatur, kjemisk kompatibilitet, vibrasjon og påkrevd nøyaktighetsnivå. Samme sensor passer ikke nødvendigvis for enhver anvendelse.",
          "Ved lavtrykks- og differensmålinger kan membranbaserte differensielle transmittere brukes, ved høye prosesstrykk strekklapp- eller piezoresistive elementer, og i vakuumanvendelser spesielle absolutte sensorer. Væskefylte manometre er svært nyttige for å lære grunnprinsippet; men i moderne industri er elektroniske instrumenter langt vanligere.",
          "For korrekt måling må plassering av impulslinjer, sensormonteringsposisjon, nullpunktsjustering og temperatureffekter tas i betraktning. I gass- og væskelinjer kan tetthetsforskjeller eller kondensdannelse skape ekstra hydrostatisk belastning på sensoren. Derfor er installasjonsdetaljer like avgjørende for resultatet som selve instrumentvalget.",
        ],
      },
      {
        title: "Trykksensorer og manometre",
        paragraphs: [
          "Mekaniske manometre, som Bourdon-rørmålere, omdanner trykk til en avlesbar viserbevegelse via deformasjon av et elastisk element. På grunn av sin robuste, enkle og energifrie konstruksjon har de vært i bruk i industrien i lang tid. Men i anvendelser som krever høy presisjon og datalogging er elektroniske sensorer mer fleksible.",
          "Elektroniske trykksensorer kan være piezoresistive, kapasitive, strekklapp- eller resonansbaserte. Disse sensorene omdanner trykkendringer til elektriske signaler som overføres til PLS-, SCADA- eller datainnsamlingssystemer. Dermed blir ikke bare øyeblikkelig avlesning mulig, men også alarmering, styring og trendanalyse.",
          "Differensielle manometre gir trykkforskjellen mellom to punkter, absolutte sensorer gir trykket i forhold til fullstendig vakuum, og manometriske instrumenter gir trykket i forhold til atmosfæren. Å kun se på tallverdien uten å bekrefte referansetypen i et instruments datablad kan føre til alvorlige tolkningsfeil.",
        ],
      },
      {
        title: "Bruksområder for trykk i ingeniørfag",
        paragraphs: [
          "Trykk er en grunnleggende designvariabel innen mange ingeniørfelt, som rørlegging, HVAC, hydraulikk, pneumatikk, kjemisk prosessindustri, kraftverk, vannforsyningssystemer, bilindustri og luftfart. Fra tankveggtykkelse til ventilvalg, fra kompressorutløpsforhold til filterytelse, bygger mange beslutninger på trykkinformasjon.",
          "I prosessteknikk overvåkes trykkgrenser for å sikre trygg drift av reaktorer, kjeler, varmevekslere og separatorer. Trykksikkerhetsventiler, sprengningsskiver og kontrollsystemer er derfor kritisk utstyr. Trykk brukes også til indirekte måling av andre prosessvariabler, som debitt og nivå.",
          "I maskin- og bygningsteknikk knyttes trykk til spenningsanalyser via kontaktflater og væskekrefter. I medisin og biomedisinsk utstyr er blodtrykk, ventilasjonstrykk og vakuumanvendelser sentrale; i miljø og meteorologi er det atmosfæriske og differensielle trykkmålinger som står i fokus.",
        ],
      },
      {
        title: "Temperatur, høyde og usikkerhet i trykkmåling",
        paragraphs: [
          "Temperatur kan påvirke både egenskapene til væsken som måles og oppførselen til selve sensorelementet. Særlig for gasser endrer temperaturendringer tettheten, så sammenhengen mellom trykk, volum og temperatur må revurderes. Datablad for sensorer inneholder derfor parametere som temperaturavhengig nullpunktsforskyvning og spennforskyvning.",
          "Når høyden øker, avtar atmosfæretrykket vanligvis. Dette endrer forholdet mellom manometrisk og absolutt trykk og kan også påvirke referanseoppførselen til enkelte feltinstrumenter. Samme prosessforhold kan gi ulike absolutte trykkresultater ved ulike høyder over havet.",
          "Enhver måling har en usikkerhet. Kalibreringsstandard, oppløsning, hysterese, temperatureffekt, monteringsretning, vibrasjon og langsiktig drift bidrar alle til den totale usikkerheten. I kritiske anvendelser bør ikke bare den nominelle trykkverdien, men også instrumentklasse og målepålitelighet tas med i designbeslutningen.",
        ],
      },
      {
        title: "Forholdet og forskjellen mellom trykk og spenning",
        paragraphs: [
          "Trykk og spenning har samme dimensjonsstruktur, og begge kan uttrykkes i pascal. Denne likheten skyldes at begge representerer en krafteffekt per arealenhet. Men dette betyr ikke at de fysisk sett er helt samme størrelse.",
          "Trykk oppfattes for det meste som en isotrop normalspenning påført av væsker; det vil si at trykket på samme punkt i en stillestående væske er likt i alle retninger. Spenning i fast-stoff-mekanikk kan derimot inneholde både normal- og skjærkomponenter, er retningsavhengig og har en tensorstruktur.",
          "Å overse dette skillet kan føre til feiltolkning særlig i beregninger av beholdervegg, pakningsflate eller materialstyrke. Det indre trykket til en væske skaper ring- og aksialspenninger i en beholder; men spenningsfeltet i beholdermaterialet er ikke det samme som selve væsketrykket.",
        ],
      },
      {
        title: "Vanlige feil i trykkberegning",
        paragraphs: [
          "Den vanligste feilen er å forveksle manometrisk trykk med absolutt trykk. Særlig i gasslover, tetthetsberegninger og vakuumanvendelser kan den manometriske verdien på et manometer brukes direkte når absolutt trykk egentlig kreves. Dette skaper en systematisk feil i resultatet.",
          "En annen feil er å avrunde omregningskoeffisienter eller bruke feil enhetsreferanse. Ved omregning mellom PSI, bar, atm, mmHg og kPa må man avgjøre hvilket presisjonsnivå de tilnærmede verdiene er tilstrekkelige for. Hvis instrumentkalibreringen krever høy presisjon, kan mangelfull sifferbruk skape problemer.",
          "Å overse hydrostatiske effekter, ignorere sensorens monteringshøyde og unnlate å ta hensyn til temperatureffekten er også vanlig. Særlig i væskefylte impulslinjer, lukkede tanker og differensielle trykkanvendelser kan tilsynelatende små installasjonsdetaljer endre måleresultatet betydelig.",
        ],
      },
    ],
    unitTable: [
      { name: "Pascal", symbol: "Pa", referenceValue: "1 På", system: "SI", commonUse: "Vitenskapelige og ingeniørmessige beregninger" },
      { name: "Kilopascal", symbol: "kPa", referenceValue: "1000 På", system: "SI", commonUse: "Rørsystemer, dekk og prosesstrykk" },
      { name: "Bar", symbol: "bar", referenceValue: "100 000 På", system: "Metrisk, utenfor SI", commonUse: "Industri, kompressorer og prosessanlegg" },
      { name: "Millibar", symbol: "mbar", referenceValue: "100 På", system: "Metrisk, utenfor SI", commonUse: "Meteorologi og atmosfæriske målinger" },
      { name: "Standard atmosfære", symbol: "atm", referenceValue: "101 325 På", system: "Utenfor SI", commonUse: "Atmosfære og referanseforhold" },
      { name: "PSI", symbol: "psi", referenceValue: "≈ 6894,757293 På", system: "Britisk/amerikansk", commonUse: "Dekk, hydraulikk og pneumatiske systemer" },
      { name: "Teknisk atmosfære", symbol: "at", referenceValue: "98 066,5 På", system: "Utenfor SI", commonUse: "Eldre tekniske og ingeniørfaglige anvendelser" },
      { name: "Millimeter kvikksølv", symbol: "mmHg", referenceValue: "≈ 133,322 På", system: "Utenfor SI", commonUse: "Medisin, vakuum og trykkmålinger" },
      { name: "Millimeter vannsøyle", symbol: "mmH₂O", referenceValue: "≈ 9,80665 På", system: "Utenfor SI", commonUse: "Lavtrykks- og ventilasjonsmålinger" },
      { name: "Kilogram-kraft/kvadratcentimeter", symbol: "kgf/cm²", referenceValue: "98 066,5 På", system: "Metrisk, utenfor SI", commonUse: "Eldre pumpe- og kjelemålere, servicehandbøker" },
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
      "Energi er en grunnleggende fysisk størrelse som beskriver et systems evne til å utføre arbeid. I Det internasjonale enhetssystemet er den avledede enheten for energi joule, og den fremkommer ved å multiplisere kraft med forflytning.",
      "I dagliglivet brukes svært ulike energienheter: kilowattimer (kWh) på strømregninger, kalorier/kilokalorier i ernæring, BTU i oppvarmingssystemer, therm i naturgassfakturering, og elektronvolt i partikkelfysikk.",
    ],
    facts: [
      { label: "Fysisk størrelse", value: "Energi (arbeid)" },
      { label: "Dimensjonssymbol", value: "[ML²T⁻²]" },
      { label: "SI-avledet enhet", value: "Joule" },
      { label: "SI-enhetssymbol", value: "J" },
      { label: "Definisjon av joule", value: "1 J = 1 newtons kraft over 1 meters forflytning (1 N·m)" },
    ],
    sections: [
      {
        title: "Hva er energi?",
        paragraphs: [
          "Energi er evnen et legeme eller system har til å utføre arbeid. Den kan opptre i mange former, som kinetisk energi (bevegelse), potensiell energi (posisjon), varmeenergi, kjemisk energi og elektrisk energi; ifølge loven om bevaring av energi kan den omdannes fra en form til en annen, men den totale mengden kan verken oppstå av intet eller forsvinne.",
          "Energi er en avledet størrelse; den fremkommer ved å multiplisere kraft med forflytning (arbeid), og SI-dimensjonen angis som ML²T⁻² (masse × lengde i annen / tid i annen).",
        ],
      },
      {
        title: "SI-enheten for energi: joule",
        paragraphs: [
          "Joule er SI-enheten for energi og betegnes med symbolet J; den er oppkalt etter den britiske fysikeren James Prescott Joule fra 1800-tallet. En joule tilsvarer energien som kreves for å flytte et legeme 1 meter med en kraft på 1 newton.",
          "Fordi joule er ganske liten til å uttrykke mange energimengder i dagliglivet, foretrekkes ofte multipler som kilojoule (tusen joule) og megajoule (en million joule) i ingeniør- og dagligbruk.",
        ],
      },
      {
        title: "Kilowattime: enheten på strømregningen",
        paragraphs: [
          "Kilowattime (kWh) er energimengden som forbrukes når en effekt på 1 kilowatt brukes i 1 time, og den er standardenheten for strømfakturering verden over. 1 kWh tilsvarer nøyaktig 3 600 000 joule (3,6 megajoule).",
          "For å beregne energiforbruket til et elektrisk apparat er det nok å multiplisere effekten (watt) med brukstiden (timer); for eksempel forbruker et apparat på 2000 watt 6 kWh energi hvis det går i 3 timer.",
        ],
      },
      {
        title: "Kalori og kilokalori: energi i ernæring",
        paragraphs: [
          "Kalori ble opprinnelig definert som energimengden som kreves for å heve temperaturen til 1 gram vann med 1 °C, og 1 kalori tilsvarer nøyaktig 4,184 joule.",
          "'Kalori'-verdien man ser på matvareetiketter, er i vitenskapelig forstand egentlig kilokalori (1000 kalorier) -- denne konvensjonen i ernæringsvitenskapen (å skrive 'Kalori' med stor forbokstav) skaper ofte forvirring; når det står at en matvare inneholder '200 kalorier', menes det egentlig 200 kilokalorier (200 000 kalorier).",
        ],
      },
      {
        title: "BTU og therm: energi i oppvarming og naturgass",
        paragraphs: [
          "BTU (British Thermal Unit) er energimengden som kreves for å heve temperaturen til 1 pund vann med 1 °F, og den brukes -- opprinnelig fra USA, men nå utbredt over hele verden -- til å angi kapasiteten til oppvarmings-/kjølesystemer (klimaanlegg, varmtvannsberedere). 1 BTU tilsvarer om lag 1055,06 joule.",
          "Therm er en stor energienhet brukt i naturgassfakturering og tilsvarer nøyaktig 100 000 BTU. I enkelte land faktureres naturgassforbruk direkte i therm i stedet for kubikkmeter.",
        ],
      },
      {
        title: "Elektronvolt: enheten i den subatomære verdenen",
        paragraphs: [
          "Elektronvolt (eV) beskriver den kinetiske energien et elektron får når det beveger seg gjennom en potensialforskjell på 1 volt, og det er en ekstremt liten energienhet (1 eV ≈ 1,602176634 × 10⁻¹⁹ joule).",
          "I partikkelfysikk og atomfysikk uttrykkes energier vanligvis i elektronvolt (og dets multipler keV, MeV, GeV) i stedet for joule, fordi joule på denne skalaen gir ekstremt små og upraktiske tall.",
        ],
      },
      {
        title: "Prinsippet om bevaring av energi",
        paragraphs: [
          "Ifølge prinsippet om bevaring av energi, også kjent som termodynamikkens første lov, forblir den totale energien i et lukket system konstant; energi kan verken skapes eller ødelegges, bare omdannes fra en form til en annen.",
          "For eksempel omdannes kjemisk energi (drivstoff) i en bilmotor først til varmeenergi og deretter til mekanisk energi (bevegelse); selv om noe av energien i denne prosessen går tapt som ubrukelig varme via friksjon og eksos, forblir den totale energimengden uendret.",
        ],
      },
      {
        title: "Hvorfor er omregning mellom energienheter viktig?",
        paragraphs: [
          "Ulike bransjer foretrekker tradisjonelt ulike energienheter: elektroteknikk bruker kilowattime, ernæringsvitenskap kilokalori, HVAC-bransjen BTU, og naturgassbransjen therm. Riktig omregning mellom disse ulike enhetene er avgjørende for energieffektivitetssammenligninger og kostnadsberegninger.",
          "For å sammenligne effektiviteten til en varmepumpe med en naturgasskjel, må man for eksempel omregne begges energiforbruk til en felles enhet (vanligvis kWh eller joule).",
        ],
      },
    ],
    unitTable: [
      { name: "Joule", symbol: "J", referenceValue: "1 J", system: "SI", commonUse: "Vitenskapelige og fysiske energiberegninger" },
      { name: "Kilojoule", symbol: "kJ", referenceValue: "1000 J", system: "SI/metrisk", commonUse: "Matenergi (i enkelte land)" },
      { name: "Megajoule", symbol: "MJ", referenceValue: "1 000 000 J", system: "SI/metrisk", commonUse: "Drivstoff og store energimengder" },
      { name: "Kalori", symbol: "cal", referenceValue: "4,184 J", system: "Metrisk (tradisjonell)", commonUse: "Ernæring og kjemi" },
      { name: "Kilokalori", symbol: "kcal", referenceValue: "4184 J", system: "Metrisk (tradisjonell)", commonUse: "Matvareetiketter ('kalorier')" },
      { name: "Wattime", symbol: "Wh", referenceValue: "3600 J", system: "Metrisk (elektrisk)", commonUse: "Energiforbruk for små apparater" },
      { name: "Kilowattime", symbol: "kWh", referenceValue: "3 600 000 J", system: "Metrisk (elektrisk)", commonUse: "Strømfakturering" },
      { name: "BTU", symbol: "Btu", referenceValue: "≈1055,06 J", system: "Britisk/amerikansk", commonUse: "Klima- og oppvarmingskapasitet" },
      { name: "Therm", symbol: "th", referenceValue: "≈105 506 000 J", system: "Britisk/amerikansk", commonUse: "Naturgassfakturering" },
      { name: "Elektronvolt", symbol: "eV", referenceValue: "≈1,602 × 10⁻¹⁹ J", system: "Atom-/partikkelfysikk", commonUse: "Atomær og nukleær energimåling" },
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
      "Dataenheten beskriver mengden informasjon som er lagret eller behandlet i et datasystem. Den mest grunnleggende enheten er biten; åtte biter utgjør til sammen en byte.",
      "Når man snakker om lagring og internetthastighet, brukes både desimale (1000-baserte) enheter som kilobyte, megabyte, gigabyte og terabyte, samt binære (1024-baserte) enheter som operativsystemer bruker, som kibibyte, mebibyte og gibibyte -- forskjellen mellom disse to systemene er hovedgrunnen til at en kjøpt disk kan virke 'mindre' enn forventet.",
    ],
    facts: [
      { label: "Minste enhet", value: "Bit (0 eller 1)" },
      { label: "Grunnenhet", value: "Byte = 8 bit" },
      { label: "Desimalt (SI) system", value: "1 KB = 1000 byte, 1 MB = 1000 KB" },
      { label: "Binært (IEC) system", value: "1 KiB = 1024 byte, 1 MiB = 1024 KiB" },
      { label: "Forskjellen mellom 1000 og 1024", value: "≈ 7,4 % forskjell mellom 1 GB (desimal) og 1 GiB (binær)" },
    ],
    sections: [
      {
        title: "Hva er bit og byte?",
        paragraphs: [
          "Bit (binary digit) er den minste informasjonsenheten en datamaskin kan behandle, og kan bare ha to verdier: 0 eller 1. Åtte bit utgjør en byte; en byte kan representere 256 (2⁸) ulike verdier -- tilstrekkelig til for eksempel å kode et tegn i en tekst.",
          "Bit forkortes vanligvis med liten 'b', og byte med stor 'B'; dette skillet kan særlig skape forvirring mellom internetthastigheter (Mbps = megabit per sekund) og filstørrelser (MB = megabyte) -- en internettforbindelse på 100 Mbps tilsvarer i teorien en nedlastingshastighet på om lag 12,5 MB per sekund (100 ÷ 8).",
        ],
      },
      {
        title: "Hvorfor finnes det to ulike enhetssystemer?",
        paragraphs: [
          "Fordi datamaskiner arbeider i det binære systemet, er minneadressering naturlig knyttet til potenser av 2 (som 1024, 1048576). Derfor har programvareverdenen historisk ment 1024 byte når man har sagt 'kilobyte'.",
          "Diskprodusenter foretrekker derimot det desimale (1000-baserte) SI-prefikset av markedsførings- og beregningshensyn -- en disk en produsent kaller '1 TB', er i realiteten nøyaktig 1 000 000 000 000 byte, men fordi operativsystemet regner ut fra base 1024, viser skjermen et mindre tall som '931 GB'.",
        ],
      },
      {
        title: "IEC-standarden: KiB, MiB, GiB",
        paragraphs: [
          "For å rydde opp i denne forvirringen standardiserte Den internasjonale elektrotekniske kommisjon (IEC) i 1998 egne navn (kibibyte, mebibyte, gibibyte, tebibyte) og symboler (KiB, MiB, GiB, TiB) for binærbaserte enheter.",
          "Ifølge denne standarden bør tradisjonelle prefikser som KB/MB/GB kun brukes i 1000-basert (desimal) betydning, mens 'binære' prefikser som KiB/MiB/GiB bør brukes for 1024-baserte verdier. I dagligbruk og i mye programvare er imidlertid dette skillet fortsatt ikke konsekvent anvendt.",
        ],
      },
      {
        title: "Hvorfor øker forskjellen mellom 1000 og 1024?",
        paragraphs: [
          "På kilobyte-nivå (1000 mot 1024) er forskjellen bare 2,4 %, men denne forskjellen øker for hver høyere enhet: på megabyte-nivå ≈ 4,9 %, på gigabyte-nivå ≈ 7,4 %, og på terabyte-nivå nå 10 %.",
          "Derfor blir forskjellen mellom desimal og binær beregning ved store lagringskapasiteter (som en disk på 1 TB) så stor at brukeren merkbart opplever å ha 'mindre plass' enn forventet (om lag 90 GB forskjell).",
        ],
      },
      {
        title: "Bitbaserte dataenheter: kilobit, megabit, gigabit",
        paragraphs: [
          "Internettleverandører uttrykker vanligvis forbindelseshastighet med bitbaserte enheter (kilobit/sekund, megabit/sekund, gigabit/sekund); dette er en historisk tradisjon innen nettverksteknikk.",
          "Ettersom brukere ofte forventer nedlastingshastigheten i byte (MB/sekund), kan det å ikke vite at en '100 Mbps'-forbindelse faktisk gir en nedlastingshastighet på om lag 12,5 MB/sekund, føre til en feilaktig oppfatning av at forbindelsen er 'treg'.",
        ],
      },
      {
        title: "Datastørrelser i dagliglivet",
        paragraphs: [
          "Et tekstdokument (en side) er typisk noen få kilobyte, et komprimert fotografi (JPEG) noen få megabyte, og en komprimert musikkfil (MP3) i gjennomsnitt 3-5 megabyte.",
          "En film i standardoppløsning (HD) kan oppta om lag 1-4 gigabyte, mens en film i 4K-oppløsning kan oppta 15-25 gigabyte; disse forskjellene varierer avhengig av oppløsning og komprimeringsmetode.",
        ],
      },
      {
        title: "Historien om dataenheten",
        paragraphs: [
          "Den første harddisken IBM lanserte i 1956 (RAMAC 305) hadde en kapasitet på om lag 3,75 megabyte og var stor nok til å fylle et rom. I dag kan et mikroSD-kort romme millioner ganger denne kapasiteten i håndflatestørrelse.",
          "Denne enorme kapasitetsøkningen henger tett sammen både med fremskritt innen lagringsteknologi (som overgangen fra magnetiske disker til flashminne) og med den kontinuerlige nedgangen i kostnad per enhet.",
        ],
      },
    ],
    unitTable: [
      { name: "Bit", symbol: "bit", referenceValue: "0,125 byte", system: "Binær", commonUse: "Nettverkshastighet (bps, Mbps)" },
      { name: "Byte", symbol: "B", referenceValue: "1 byte (8 bit)", system: "Grunnenhet", commonUse: "Grunnleggende enhet for filstørrelse" },
      { name: "Kilobyte", symbol: "KB", referenceValue: "1000 byte", system: "Desimal (SI)", commonUse: "Tekstdokumenter" },
      { name: "Kibibyte", symbol: "KiB", referenceValue: "1024 byte", system: "Binær (IEC)", commonUse: "Minnevisning i operativsystem" },
      { name: "Megabyte", symbol: "MB", referenceValue: "1 000 000 byte", system: "Desimal (SI)", commonUse: "Bilde- og musikkfiler" },
      { name: "Mebibyte", symbol: "MiB", referenceValue: "1 048 576 byte", system: "Binær (IEC)", commonUse: "RAM-kapasitet (minne)" },
      { name: "Gigabyte", symbol: "GB", referenceValue: "1 000 000 000 byte", system: "Desimal (SI)", commonUse: "Diskkapasitet (produsentmerking)" },
      { name: "Gibibyte", symbol: "GiB", referenceValue: "1 073 741 824 byte", system: "Binær (IEC)", commonUse: "Diskvisning i operativsystem" },
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
      "Elektrisitet er et bredt fagfelt bestående av størrelser som er beslektet, men likevel forskjellige: spenning (potensialforskjell) og strøm (ladningsstrøm). Denne kategorien samler de to grunnleggende størrelsene man oftest møter i hverdagslig elektrisk arbeid -- volt (spenning) og amper (strøm).",
      "Spenning og strøm er ikke samme fysiske størrelse, og de kan ikke regnes direkte om til hverandre; forholdet mellom dem etableres av Ohms lov (V = I × R), avhengig av motstanden i kretsen. Omregningene på denne siden behandler hver størrelse for seg (volt-kilovolt, amper-milliamper).",
    ],
    facts: [
      { label: "Navnet på spenningsenheten", value: "Volt (etter Alessandro Volta)" },
      { label: "Navnet på strømenheten", value: "Amper (etter Andre-Marie Ampere)" },
      { label: "SI-grunnenhet (strøm)", value: "Amper (Å) -- en av SIs 7 grunnenheter" },
      { label: "Forholdet mellom spenning, strøm og motstand", value: "Ohms lov: V = I × R" },
      { label: "Nettspenning i Norge", value: "230 V (enfase), 400 V (trefase)" },
    ],
    sections: [
      {
        title: "Hva er spenning (volt)?",
        paragraphs: [
          "Spenning beskriver den elektriske potensialforskjellen mellom to punkter i en elektrisk krets, og kan tenkes på som den 'drivende kraften' som får elektroner til å strømme fra ett punkt til et annet. SI-enheten er volt (V).",
          "Enheten volt er oppkalt etter den italienske fysikeren Alessandro Volta, som oppfant det elektriske batteriet. Verdier som '1,5 V' eller '9 V' på et batteri angir potensialforskjellen batteriet kan levere.",
        ],
      },
      {
        title: "Hva er strøm (amper)?",
        paragraphs: [
          "Elektrisk strøm beskriver mengden elektrisk ladning som passerer gjennom en leder per tidsenhet, og SI-enheten er amper (Å). En amper tilsvarer om lag 6,242 × 10¹⁸ elektroner som passerer et punkt per sekund.",
          "Enheten amper er oppkalt etter den franske fysikeren Andre-Marie Ampere, en av grunnleggerne av elektromagnetismen. Før SI-revisjonen i 2019 var amper en av SIs grunnenheter; den regnes fortsatt som en grunnleggende størrelse, men defineres nå ut fra elementærladningskonstanten (e).",
        ],
      },
      {
        title: "Hvorfor kan ikke spenning og strøm regnes om til hverandre?",
        paragraphs: [
          "Spenning (V) og strøm (Å) er ulike fysiske størrelser -- den ene uttrykker potensialforskjell, den andre ladningsstrømningshastighet. Derfor har spørsmålet 'hvor mange amper tilsvarer X volt' alene ikke noe svar uten å kjenne motstanden (eller effekten) i kretsen.",
          "Forholdet mellom de to etableres av Ohms lov: V = I × R (spenning = strøm × motstand). For eksempel skaper en spenning på 12 volt gjennom en motstand på 4 ohm en strøm på 3 amper; men de samme 12 volt gir en helt annen strøm ved en annen motstand.",
        ],
      },
      {
        title: "Sammenhengen mellom effekt, spenning og strøm",
        paragraphs: [
          "Elektrisk effekt (watt) er lik produktet av spenning og strøm: P = V × I. Denne formelen viser at et apparat med samme effekt trekker lavere strøm ved høy spenning, og høyere strøm ved lav spenning.",
          "Dette forholdet forklarer hvorfor elektriske distribusjonsnett arbeider med høy spenning: å overføre samme effekt med lavere strøm reduserer betydelig energitapet (Joule-oppvarming) som skyldes motstand i overføringslinjene.",
        ],
      },
      {
        title: "Nettspenning i Norge og verden",
        paragraphs: [
          "I Norge er standard nettspenning i boliginstallasjoner 230 V, og i motsetning til det meste av Europa har mange norske boliginstallasjoner tradisjonelt basert seg på et IT-jordingssystem uten nøytralleder, der 230 V måles fase-til-fase i stedet for fase-til-jord; nyere installasjoner bygges i økende grad med et TN-system på samme måte som resten av Europa, med en frekvens på 50 Hz.",
          "Nettspenningen varierer fra land til land i verden; land som USA og Canada bruker 120 volt, mens det meste av Europa, deriblant Norge, foretrekker 230 volt. Denne forskjellen er hovedgrunnen til at elektriske apparater tatt med fra utlandet ikke kan brukes direkte uten en omformer.",
        ],
      },
      {
        title: "Likestrøm (DC) og vekselstrøm (AC)",
        paragraphs: [
          "I likestrøm (DC) strømmer elektronene konstant i en retning -- batterier og solcellepaneler produserer DC. I vekselstrøm (AC) skifter derimot strømretningen med en bestemt frekvens per sekund (50 Hz i Norge, altså 50 ganger per sekund) -- nettstrømmen er AC.",
          "Hovedgrunnen til at AC foretrekkes i nettdistribusjon, er at transformatorer enkelt kan heve og senke spenningen; dette gjør det mulig å overføre elektrisitet over lange avstander med lavt tap.",
        ],
      },
      {
        title: "Elektrisk strøms virkning på menneskekroppen",
        paragraphs: [
          "Størrelsen på strømmen som går gjennom menneskekroppen, avgjør hvilken effekt man merker: om lag 1 milliampere kjennes svakt, 10-20 milliampere kan gi muskelsammentrekning (manglende evne til å slippe taket), og over 100 milliampere kan føre til hjerterytmeforstyrrelse (fibrillering) og dødsfall.",
          "Derfor er det ikke bare spenningen, men også størrelsen på strømmen som kan oppstå i kretsen, som er avgjørende for elektrisk sikkerhet -- selv i lavspente, men lavohmige (for eksempel fuktige) omgivelser kan det oppstå farlig høy strøm.",
        ],
      },
    ],
    unitTable: [
      { name: "Millivolt", symbol: "mV", referenceValue: "0,001 V", system: "SI/metrisk", commonUse: "Sensor- og bioelektriske signaler" },
      { name: "Volt", symbol: "V", referenceValue: "1 V", system: "SI", commonUse: "Batteri-, nett- og kretsspenning" },
      { name: "Kilovolt", symbol: "kV", referenceValue: "1000 V", system: "SI/metrisk", commonUse: "Høyspente overføringslinjer" },
      { name: "Milliampere", symbol: "mA", referenceValue: "0,001 Å", system: "SI/metrisk", commonUse: "Elektroniske kretsstrømmer" },
      { name: "Ampere", symbol: "A", referenceValue: "1 Å", system: "SI", commonUse: "Boliginstallasjon og apparatstrøm" },
      { name: "Kiloampere", symbol: "kA", referenceValue: "1000 Å", system: "SI/metrisk", commonUse: "Kortslutnings- og industristrømmer" },
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
      "Gull brukes nesten aldri i ren form i smykker og gullvarer -- fordi det er et svært mykt og lett riper metall, blandes det med metaller som sølv og kobber til en legering. Karat (gullkarat) er målet som viser andelen rent gull i denne legeringen.",
      "Skalaen går over 24: 24 karat betyr helt rent gull (100 %), mens 22 karat betyr at 22/24 (om lag 91,6 %) av legeringen er rent gull. Omregningen her beregner gramekvivalenten mellom gull av ulik karat basert på innholdet av rent gull -- det vil si, ikke 'å uttrykke samme fysiske størrelse med en annen enhet', men 'å finne den tilsvarende verdien til samme legering ved ulik renhetsgrad'.",
    ],
    facts: [
      { label: "Målesystem", value: "Gullsmedstandard for renhet (karat)" },
      { label: "Grunnreferanse", value: "24 karat = 100 % rent gull" },
      { label: "Mest vanlige karat i Tyrkia", value: "22 karat (armbånd, tradisjonelle smykker)" },
      { label: "Internasjonal dagligbruk", value: "18 karat (ring, kjede)" },
      { label: "Beregningslogikk", value: "Gram × (kildekarat / 24) ÷ (målkarat / 24)" },
    ],
    sections: [
      {
        title: "Hva måler karat egentlig?",
        paragraphs: [
          "Karat viser hvor mye av vekten til et gullstykke som faktisk er gull. 24 karat er rent gull; 22, 18 og 14 karat er gull som er blandet med henholdsvis sølv/kobber i økende grad, og dermed hardere og mindre rent.",
          "Derfor kan vi si at et armbånd på 22 karat har et litt 'lettere' innhold av rent gull enn 24 karat, men er mer holdbart -- dette er grunnen til at gullsmeder ofte foretrekker 22 karat til armbånd, og gjerne 18 karat til ringer/kjeder.",
        ],
      },
      {
        title: "Hvordan beregnes innholdet av rent gull?",
        paragraphs: [
          "For å finne mengden rent gull i et armbånd på 10 gram, 22 karat: 10 × (22 / 24) = 9,17 gram tilsvarer rent (24-karats ekvivalent) gull. De gjenværende om lag 0,83 gram er andre metaller tilsatt for holdbarhet.",
          "Omvendt: hvis en gullsmed skulle smelte disse 9,17 gramene rent gull om til 18 karat, ville han få: 9,17 ÷ (18 / 24) = 12,22 gram totalt legering -- fordi andelen rent gull er lavere ved 18 karat, fordeler samme mengde rent gull seg over en større totalvekt.",
        ],
      },
      {
        title: "Hvilken karat brukes til hva?",
        paragraphs: [
          "24 karat brukes nærmest aldri i dagligsmykker på grunn av mykheten; det foretrekkes hovedsakelig til gullbarrer og investeringsprodukter. 22 karat er standarden for armbånd og tradisjonelle smykker i Tyrkia og Midtøsten.",
          "18 karat er utbredt over hele verden i dagligbrukssmykker som diamantringer og kjeder, siden det har høy holdbarhet. 14 karat er mer økonomisk og enda mer holdbart, og er særlig vanlig i det amerikanske og europeiske markedet.",
        ],
      },
    ],
    unitTable: [
      { name: "24 karat gull", symbol: "24K", referenceValue: "100 % rent gull", system: "Gullsmedstandard", commonUse: "Gullbarrer, investeringsgull" },
      { name: "22 karat gull", symbol: "22K", referenceValue: "91,6 % rent gull (22/24)", system: "Gullsmedstandard", commonUse: "Armbånd, tradisjonelle smykker" },
      { name: "18 karat gull", symbol: "18K", referenceValue: "75 % rent gull (18/24)", system: "Gullsmedstandard", commonUse: "Ring, kjede, dagligsmykker" },
      { name: "14 karat gull", symbol: "14K", referenceValue: "58,3 % rent gull (14/24)", system: "Gullsmedstandard", commonUse: "Økonomiske smykker, USA/Europa-markedet" },
    ],
  },
  {
    locale: "no",
    slug: "solvinnhold",
    sourceSlug: "gumus-ayar",
    category: "gumus_ayar",
    title: "Omregn sølvinnhold",
    description:
      "Regn gratis og direkte om mellom 999, 925, 900 og 800 sølv; se formler og tabeller.",
    introduction: [
      "Sølv brukes, i likhet med gull, nesten aldri i ren form til smykker eller gjenstander -- fordi det er et mykt metall, blandes det med andre metaller som kobber til en legering. Millesimal (finhet i tusendeler) er målet som viser andelen rent sølv i denne legeringen.",
      "I motsetning til gullkarat uttrykkes sølvrenhet ikke over 24, men over 1000 (i tusendeler): 999 er nærmest fullstendig rent sølv, mens 925 er den mest utbredte smykkestandarden i verden, kjent som 'sterlingsølv'.",
    ],
    facts: [
      { label: "Målesystem", value: "Millesimalsystem (finhet i tusendeler)" },
      { label: "Grunnreferanse", value: "999 = 99,9 % rent sølv" },
      { label: "Mest utbredte smykkestandard i verden", value: "925 (sterlingsølv)" },
      { label: "Sølv til barrer/investering", value: "999 finhet (fine silver)" },
      { label: "Beregningslogikk", value: "Gram × (kildefinhet / 1000) ÷ (målfinhet / 1000)" },
    ],
    sections: [
      {
        title: "Hva måler sølvfinheten (millesimal) egentlig?",
        paragraphs: [
          "I motsetning til gull uttrykkes sølvrenhet ikke over 24 enheter, men i tusendeler (millesimal, over 1000). 999 finhet betyr at 999 av 1000 deler (altså 99,9 %) av legeringen er rent sølv; den gjenværende ene delen er som regel sporstoffer av andre grunnstoffer.",
          "925 finhet (sterlingsølv) betyr at 92,5 % av legeringen er rent sølv, og de resterende 7,5 % som regel er kobber. Denne lille mengden kobber gir det rene sølvet, som ellers er svært mykt og lett deformerbart, økt holdbarhet.",
        ],
      },
      {
        title: "Hvorfor er sterlingsølv (925) verdensstandarden?",
        paragraphs: [
          "925 finhet sterlingsølv-standarden har røtter helt tilbake til 1100-tallet i England, og har over tid blitt den mest aksepterte standarden verden over for produksjon av smykker, bestikk og sølvtøy.",
          "Rent sølv (999) er for mykt og lett å ripe for hverdagsbruk; å tilsette om lag 7,5 % kobber gir sølvet tilstrekkelig hardhet, samtidig som det i stor grad bevarer sølvets karakteristiske glans og farge.",
        ],
      },
      {
        title: "Forskjellene mellom 999, 900 og 800 finhet sølv",
        paragraphs: [
          "999 finhet (fine silver/rent sølv) foretrekkes til barrer og investeringsprodukter i sølv, fordi renhetsgraden er det viktigste kriteriet for investorer; men på grunn av mykheten brukes det sjelden i dagligsmykker.",
          "900 finhet (coin silver) er historisk brukt i sølvmynter i mange land. 800 finhet er en smykkestandard som særlig er utbredt i Europa (som Tyskland og Østerrike) og har lavere renhet enn sterlingsølv, men er likevel holdbar.",
        ],
      },
      {
        title: "Hvordan beregnes innholdet av rent sølv?",
        paragraphs: [
          "For å finne mengden rent sølv i en sølvring på 10 gram, 925 finhet: 10 × (925 / 1000) = 9,25 gram rent sølv. De gjenværende 0,75 gram er kobber eller andre metaller tilsatt for holdbarhet.",
          "Samme logikk brukes ved omregning mellom ulike finheter: hvis mengden rent sølv i en legering på 925 finhet er kjent, finner man 999-finhets-ekvivalenten ved å dele mengden rent sølv på 999/1000.",
        ],
      },
      {
        title: "Sammenhengen mellom anløpning og renhet i sølv",
        paragraphs: [
          "At sølvsmykker anlopner (mister glansen) over tid, skyldes ikke sølvet selv, men at kobberet i legeringen reagerer med svovelforbindelser i luften. Derfor har sølv med høyere renhet (som 999) mindre tendens til å anløpe.",
          "Enkelte produsenter har utviklet 'anløpningsbestandige' sterlingsølvlegeringer for å forbedre denne egenskapen, ved å bruke andre tilsetningsstoffer, som germanium, i stedet for kobber.",
        ],
      },
    ],
    unitTable: [
      { name: "999 finhet sølv", symbol: "999", referenceValue: "99,9 % rent sølv", system: "Gullsmedstandard", commonUse: "Barrer, investeringssølv" },
      { name: "925 finhet sølv", symbol: "925", referenceValue: "92,5 % rent sølv (sterling)", system: "Gullsmedstandard", commonUse: "Smykker og bestikk (verdensstandard)" },
      { name: "900 finhet sølv", symbol: "900", referenceValue: "90 % rent sølv", system: "Gullsmedstandard", commonUse: "Historiske sølvmynter" },
      { name: "800 finhet sølv", symbol: "800", referenceValue: "80 % rent sølv", system: "Gullsmedstandard (Europa)", commonUse: "Europeisk smykkestandard" },
    ],
  },
];

export function findNorwegianCategoryPage(slug: string) {
  return norwegianCategoryPages.find((page) => page.slug === slug);
}

export function findNorwegianCategoryPageByTurkishSlug(sourceSlug: string) {
  return norwegianCategoryPages.find((page) => page.sourceSlug === sourceSlug);
}
