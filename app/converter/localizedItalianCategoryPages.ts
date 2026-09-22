// Pagine di categoria in italiano -- integrate nel nuovo sistema i18n.
// File indipendente e nuovo (non modifica i file esistenti di
// tr/en/de/ar/uz/bn/fr/es/pt).
//
// Ambito deliberatamente limitato ai 17 elementi che formano
// l'identita del sito (13 categorie fondamentali + 4 strumenti
// universali nella home page) -- senza calcolatrici scientifiche ne
// quotidiane. Contenuto tradotto con la stessa profondita degli
// articoli fonte in TR (app/converter/categoryArticles.ts e
// app/converter/articles/*/Article.ts).

export type LocalizedItalianCategoryFact = {
  label: string;
  value: string;
};

export type LocalizedItalianCategorySection = {
  title: string;
  paragraphs: string[];
};

export type LocalizedItalianCategoryUnitRow = {
  name: string;
  symbol: string;
  referenceValue: string;
  system: string;
  commonUse: string;
};

export type LocalizedItalianCategoryPage = {
  locale: "it";
  slug: string;
  sourceSlug: string;
  category: string;
  title: string;
  description: string;
  introduction: string[];
  facts: LocalizedItalianCategoryFact[];
  sections: LocalizedItalianCategorySection[];
  unitTable: LocalizedItalianCategoryUnitRow[];
};

export const italianCategoryPages: LocalizedItalianCategoryPage[] = [
  {
    locale: "it",
    slug: "lunghezza",
    sourceSlug: "uzunluk",
    category: "uzunluk",
    title: "Conversione delle unità di lunghezza",
    description:
      "Converti gratis e istantaneamente tra metri, chilometri, centimetri, miglia e piedi; consulta formule e tabelle.",
    introduction: [
      "La lunghezza e una delle grandezze fisiche fondamentali usate per descrivere l'altezza, la larghezza o lo spessore di un oggetto, o la distanza tra due punti. A seconda della direzione misurata, uno stesso oggetto puo avere più valori di lunghezza.",
      "In fisica, la lunghezza e generalmente rappresentata dal simbolo dimensionale L. Molte grandezze derivate, come l'area, il volume, la velocità, l'accelerazione, la pressione e la densita, sono definite a partire dalla dimensione di lunghezza.",
      "Nel Sistema Internazionale di Unità (SI), l'unità di base della lunghezza e il metro (m). A seconda della grandezza della distanza misurata si usano il nanometro, il micrometro, il millimetro, il centimetro, il metro o il chilometro. Fuori dal sistema metrico, il pollice, il piede, la iarda e il miglio sono ancora usati, specialmente negli Stati Uniti e nel Regno Unito.",
    ],
    facts: [
      { label: "Unità di base del SI", value: "Metro" },
      { label: "Simbolo dell'unità SI", value: "m" },
      { label: "Grandezza fisica", value: "Lunghezza" },
      { label: "Simbolo dimensionale", value: "L" },
      { label: "Definizione attuale del metro", value: "Distanza percorsa dalla luce nel vuoto in 1/299.792.458 di secondo" },
    ],
    sections: [
      {
        title: "Che cos'e la lunghezza?",
        paragraphs: [
          "La lunghezza serve a descrivere l'altezza, la larghezza, la profondita di un oggetto o la distanza tra due punti; e una delle grandezze fisiche fondamentali. A seconda della direzione misurata, uno stesso oggetto puo presentare più valori di lunghezza.",
          "In fisica, la lunghezza e generalmente rappresentata dal simbolo dimensionale L. Numerose grandezze derivate, come l'area, il volume, la velocità, l'accelerazione, la pressione e la densita, sono definite a partire dalla dimensione di lunghezza.",
        ],
      },
      {
        title: "L'unità SI della lunghezza",
        paragraphs: [
          "Nel Sistema Internazionale di Unità, l'unità di base della lunghezza e il metro, simboleggiato da m. Il metro serve come riferimento fondamentale per definire tutte le altre unità di lunghezza.",
          "Le unità metriche come il chilometro, il centimetro, il millimetro, il micrometro e il nanometro sono legate al metro tramite multipli e sottomultipli decimali. Questa struttura permette di eseguire le conversioni tra unità metriche usando potenze di dieci.",
        ],
      },
      {
        title: "La definizione scientifica del metro",
        paragraphs: [
          "In passato, il metro era definito a partire dalle dimensioni della Terra e da campioni fisici. Con il progresso della tecnologia di misurazione e diventata necessaria una definizione più stabile e riproducibile ovunque nel mondo.",
          "Attualmente, un metro e definito come la lunghezza del percorso compiùto dalla luce nel vuoto durante un intervallo di 1/299.792.458 di secondo. Questa definizione si basa sul fatto che la velocità della luce nel vuoto e fissata esattamente a 299.792.458 metri al secondo.",
        ],
      },
      {
        title: "Le unità metriche di lunghezza",
        paragraphs: [
          "Nel sistema metrico, le unità sono legate al metro tramite potenze positive o negative di 10. Un chilometro equivale a 1000 metri, un centimetro a 0,01 metri e un millimetro a 0,001 metri.",
          "Per lunghezze molto piccole si usano il micrometro, il nanometro e il picometro. Le cellule vengono spesso misurate in micrometri, le lunghezze d'onda della luce in nanometri e alcune distanze su scala atomica in picometri.",
        ],
      },
      {
        title: "Le unità di lunghezza fuori dal sistema metrico",
        paragraphs: [
          "Il pollice, il piede, la iarda e il miglio terrestre sono unità di lunghezza comuni fuori dal sistema metrico. Sono usati specialmente nel sistema di misura statunitense e in alcune applicazioni legate alla tradizione britannica.",
          "Un pollice equivale esattamente a 2,54 centimetri, un piede a 12 pollici e una iarda a 3 piedi. Un miglio terrestre e definito esattamente come 1609,344 metri.",
        ],
      },
      {
        title: "La lunghezza nella navigazione marittima e aerea",
        paragraphs: [
          "Nella navigazione marittima e aerea, le distanze sono generalmente espresse in miglia nautiche. Un miglio nautico equivale esattamente a 1852 metri.",
          "Il miglio nautico si e sviluppato a partire da un approccio di misurazione storico legato alle coordinate geografiche della Terra. L'unità di velocità chiamata nodo significa anche un miglio nautico all'ora.",
        ],
      },
      {
        title: "Come si misura la lunghezza?",
        paragraphs: [
          "Nelle misurazioni quotidiane si usano strumenti come il righello, il metro a nastro, il calibro e il micrometro. La precisione dello strumento scelto dipende dalla dimensione dell'oggetto da misurare e dal livello di precisione richiesto.",
          "In ingegneria e nella ricerca scientifica possono essere usati telemetri laser, macchine di misura a coordinate, interferometri e diversi sistemi di misurazione ottica.",
        ],
      },
      {
        title: "Precisione di misurazione e incertezza",
        paragraphs: [
          "Nessuna misurazione fisica e assolutamente perfetta. Il risultato di una misurazione comporta sempre una certa incertezza dovuta alla risoluzione dello strumento utilizzato, alla sua calibrazione, alle condizioni ambientali e al metodo applicato.",
          "Per questo, nei risultati scientifici conviene indicare non solo il valore misurato, ma anche l'incertezza della misurazione e l'unità utilizzata. Specialmente nei lavori di ingegneria di precisione, anche una variazione di temperatura puo influire sulla lunghezza di un materiale.",
        ],
      },
      {
        title: "Come si convertono le unità di lunghezza?",
        paragraphs: [
          "Nelle conversioni all'interno dello stesso sistema di misura si usa il rapporto tra le unità. Ad esempio, per convertire metri in chilometri si divide il valore per 1000; per convertire chilometri in metri si moltiplica il valore per 1000.",
          "Nelle conversioni tra il sistema metrico e le unità britanniche o statunitensi bisogna usare i coefficienti di conversione esatti definiti. Ad esempio, per convertire pollici in centimetri si moltiplica il valore per 2,54.",
        ],
      },
    ],
    unitTable: [
      { name: "Nanometro", symbol: "nm", referenceValue: "0,000000001 m", system: "SI/metrico", commonUse: "Lunghezza d'onda della luce e nanotecnologia" },
      { name: "Micrometro", symbol: "µm", referenceValue: "0,000001 m", system: "SI/metrico", commonUse: "Cellule, particelle e fabbricazione di precisione" },
      { name: "Millimetro", symbol: "mm", referenceValue: "0,001 m", system: "SI/metrico", commonUse: "Disegno tecnico e misure piccole" },
      { name: "Centimetro", symbol: "cm", referenceValue: "0,01 m", system: "SI/metrico", commonUse: "Misurazione di oggetti quotidiani" },
      { name: "Decimetro", symbol: "dm", referenceValue: "0,1 m", system: "SI/metrico", commonUse: "Didattica e alcune relazioni di volume" },
      { name: "Metro", symbol: "m", referenceValue: "1 m", system: "SI", commonUse: "Misurazioni di lunghezza di base" },
      { name: "Chilometro", symbol: "km", referenceValue: "1000 m", system: "SI/metrico", commonUse: "Distanze stradali e geografiche" },
      { name: "Pollice", symbol: "in", referenceValue: "0,0254 m", system: "Britannico/statunitense", commonUse: "Schermi, tubazioni e misure tecniche" },
      { name: "Piede", symbol: "ft", referenceValue: "0,3048 m", system: "Britannico/statunitense", commonUse: "Altezza, edilizia e aviazione" },
      { name: "Iarda", symbol: "yd", referenceValue: "0,9144 m", system: "Britannico/statunitense", commonUse: "Campi sportivi e misurazione di distanze" },
      { name: "Miglio", symbol: "mi", referenceValue: "1609,344 m", system: "Britannico/statunitense", commonUse: "Distanze stradali" },
      { name: "Miglio nautico", symbol: "nmi", referenceValue: "1852 m", system: "Navigazione marittima", commonUse: "Navigazione marittima e aerea" },
    ],
  },
  {
    locale: "it",
    slug: "area",
    sourceSlug: "alan",
    category: "alan",
    title: "Conversione delle unità di area",
    description:
      "Converti aree tra metri quadrati, ettari e piedi quadrati; per calcoli di terreni, edifici ed edilizia.",
    introduction: [
      "L'area e una grandezza fisica derivata che esprime l'estensione di una regione bidimensionale. Poiche risulta dal prodotto di una lunghezza per un'altra lunghezza nella stessa unità, la dimensione dell'area e sempre 'lunghezza al quadrato' (L²).",
      "Nel Sistema Internazionale di Unità, l'unità derivata dell'area e il metro quadrato (m²). In agricoltura e per i terreni si usano molto l'ettaro e unità locali; nel sistema britannico/statunitense, il piede quadrato e l'acro; nel sud dell'Asia, unità locali come bigha e katha sono anch'esse comuni.",
    ],
    facts: [
      { label: "Grandezza fisica", value: "Area" },
      { label: "Simbolo dimensionale", value: "[L²]" },
      { label: "Unità derivata del SI", value: "Metro quadrato" },
      { label: "Simbolo dell'unità SI", value: "m²" },
      { label: "Formula di base (rettangolo)", value: "Area = Lunghezza × Larghezza" },
    ],
    sections: [
      {
        title: "Che cos'e l'area?",
        paragraphs: [
          "L'area esprime l'estensione di una regione piana o proiettata. L'estensione di un terreno, il pavimento di una stanza o un foglio di carta sono misurati in area.",
          "L'area e una grandezza derivata: si ottiene moltiplicando un'unità di lunghezza di base per se stessa. Per questo la dimensione SI dell'area e L² (lunghezza al quadrato), e l'area e sempre una grandezza scalare positiva.",
        ],
      },
      {
        title: "L'unità SI dell'area: il metro quadrato",
        paragraphs: [
          "Nel Sistema Internazionale di Unità, l'unità derivata dell'area e il metro quadrato (m²), che rappresenta l'area occupata da un quadrato il cui lato misura esattamente 1 metro.",
          "Il metro quadrato non e un'unità di base indipendente, ma un'unità derivata ottenuta elevando al quadrato l'unità di lunghezza (il metro). Tutte le altre unità metriche di area (centimetro quadrato, chilometro quadrato, ecc.) sono legate al metro quadrato tramite potenze decimali.",
        ],
      },
      {
        title: "Perché le unità di area si convertono con un rapporto quadratico?",
        paragraphs: [
          "Nel convertire unità di lunghezza, il rapporto usato deve essere elevato al quadrato per le unità di area. Ad esempio, 1 chilometro equivale a 1000 metri, ma 1 chilometro quadrato non equivale a 1000 metri quadrati, bensi a 1000², ossia 1.000.000 di metri quadrati.",
          "Questo accade perché, in un'area, entrambe le dimensioni (lunghezza e larghezza) aumentano o diminuiscono nella stessa proporzione. Ignorare questa relazione quadratica e l'errore di calcolo più frequente nelle conversioni di area -- credere che '1 km² = 1000 m²' e una confusione comune.",
        ],
      },
      {
        title: "Le unità metriche di area",
        paragraphs: [
          "Nel sistema metrico si usano il millimetro quadrato e il centimetro quadrato per aree piccole, il metro quadrato per misurazioni quotidiane e il chilometro quadrato per grandi aree. Un centimetro quadrato equivale a 0,0001 metri quadrati, e un chilometro quadrato a 1.000.000 di metri quadrati.",
          "Per misurare i terreni si usano l'ara (100 m²) e il suo multiplo, 100 volte maggiore, l'ettaro (10.000 m²). L'ettaro e l'unità metrica di terreno più usata al mondo per esprimere l'area di terreni agricoli.",
        ],
      },
      {
        title: "Unità tradizionali di terreno in Turchia",
        paragraphs: [
          "In Turchia, le unità più usate per misurare i terreni agricoli sono il dönüm e il dekar; entrambe equivalgono oggi a 1000 metri quadrati e sono intercambiabili. Il dekar e il nome ufficiale usato nella legislazione su pesi e misure, mentre il dönüm e l'equivalente tradizionale del linguaggio quotidiano.",
          "In epoca ottomana, la dimensione del dönüm variava a seconda della regione tra 900 e 1600 m². Con la legge su pesi e misure del 1931, il dönüm fu allineato al dekar e standardizzato esattamente a 1000 m².",
        ],
      },
      {
        title: "Le unità di area del sistema britannico/statunitense",
        paragraphs: [
          "Il piede quadrato (ft²) e il pollice quadrato (in²) sono usati per aree piccole, mentre l'acro e usato per grandi appezzamenti di terreno nel sistema di misura britannico/statunitense. Un acro equivale esattamente a 4046,8564224 metri quadrati.",
          "L'origine storica dell'acro risale all'area di terreno che un paio di buoi poteva arare in un giorno. Ancora oggi e ampiamente usato negli annunci immobiliari negli Stati Uniti, nel Regno Unito e in alcuni paesi del Commonwealth.",
        ],
      },
      {
        title: "Le unità di terreno del sud dell'Asia",
        paragraphs: [
          "In paesi come India, Bangladesh, Pakistan e Nepal si continuano a usare ampiamente unità locali di terreno come bigha, katha, killa, kanal, marla, guntha, biswa e decimal. La dimensione di queste unità puo variare considerevolmente da una regione all'altra, anche con lo stesso nome.",
          "Ad esempio, un bigha equivale a circa 1338 m² nel Bengala Occidentale, ma puo corrispondere a un valore diverso in un altro stato. Per questo, nelle transazioni immobiliari con queste unità, e importante confermare quale standard regionale si sta utilizzando.",
        ],
      },
      {
        title: "Come si calcola un'area?",
        paragraphs: [
          "Per un'area rettangolare, la formula e Area = Lunghezza × Larghezza. Per un triangolo si usa Area = (Base × Altezza) / 2, e per un cerchio, Area = π × Raggio².",
          "Nei terreni di forma irregolare, l'area viene calcolata dividendo la forma in rettangoli o triangoli più piccoli, calcolando l'area di ogni parte separatamente e sommandole (o, nei rilievi catastali, tramite formule di area di poligoni basate su coordinate).",
        ],
      },
      {
        title: "Aspetti da considerare nel misurare le aree",
        paragraphs: [
          "Il valore di area indicato in un annuncio immobiliare o in un atto deve essere interpretato in base all'unità utilizzata (m², dönüm, acro, bigha, ecc.) e allo standard regionale con cui quell'unità e definita.",
          "Specialmente nelle transazioni immobiliari internazionali, considerare l'equivalente esatto in metri quadrati invece della semplice somiglianza del nome dell'unità evita malintesi; lo strumento di conversione di questa pagina confronta tutte le unità a partire da un riferimento comune in metri quadrati.",
        ],
      },
    ],
    unitTable: [
      { name: "Millimetro quadrato", symbol: "mm²", referenceValue: "0,000001 m²", system: "SI/metrico", commonUse: "Disegno tecnico e aree piccole" },
      { name: "Centimetro quadrato", symbol: "cm²", referenceValue: "0,0001 m²", system: "SI/metrico", commonUse: "Area di oggetti piccoli" },
      { name: "Metro quadrato", symbol: "m²", referenceValue: "1 m²", system: "SI", commonUse: "Area di abitazioni, uffici e terreni" },
      { name: "Ara", symbol: "a", referenceValue: "100 m²", system: "Metrico", commonUse: "Piccoli appezzamenti di terreno" },
      { name: "Dönüm / Dekar", symbol: "dönüm", referenceValue: "1000 m²", system: "Turchia (metrico)", commonUse: "Misurazione di terreni agricoli" },
      { name: "Ettaro", symbol: "ha", referenceValue: "10.000 m²", system: "Metrico", commonUse: "Grandi terreni agricoli e forestali" },
      { name: "Chilometro quadrato", symbol: "km²", referenceValue: "1.000.000 m²", system: "SI/metrico", commonUse: "Citta, paesi e zone geografiche" },
      { name: "Piede quadrato", symbol: "ft²", referenceValue: "0,092903 m²", system: "Britannico/statunitense", commonUse: "Area di abitazioni (US/UK)" },
      { name: "Iarda quadrata", symbol: "yd²", referenceValue: "0,83612736 m²", system: "Britannico/statunitense", commonUse: "Campi sportivi e tessile" },
      { name: "Acro", symbol: "ac", referenceValue: "4046,8564224 m²", system: "Britannico/statunitense", commonUse: "Grandi appezzamenti di terreno" },
      { name: "Bigha", symbol: "bigha", referenceValue: "≈1337,8 m² (variabile a seconda della regione)", system: "Sud dell'Asia", commonUse: "Terreni agricoli in India/Bangladesh" },
      { name: "Tsubo", symbol: "tsubo", referenceValue: "≈3,31 m²", system: "Giappone", commonUse: "Misurazione di abitazioni e terreni in Giappone" },
    ],
  },
  {
    locale: "it",
    slug: "volume",
    sourceSlug: "hacim",
    category: "hacim",
    title: "Conversione delle unità di volume",
    description:
      "Converti volumi tra litri, millilitri e metri cubi; confronta le unità comuni per liquidi e contenitori.",
    introduction: [
      "Il volume e una grandezza fisica derivata che esprime lo spazio occupato o contenuto da un oggetto o contenitore tridimensionale. Poiche risulta dal prodotto di un'unità di lunghezza nelle tre dimensioni (lunghezza × larghezza × altezza), la dimensione del volume e L³ (lunghezza al cubo).",
      "Nel Sistema Internazionale di Unità, l'unità derivata del volume e il metro cubo (m³); nella vita quotidiana si usano molto di più il litro e il millilitro. In cucina sono comuni la tazza, il cucchiaio e il cucchiaino, e nel sistema statunitense/britannico, il gallone, il quarto, la pinta e l'oncia liquida.",
    ],
    facts: [
      { label: "Grandezza fisica", value: "Volume" },
      { label: "Simbolo dimensionale", value: "[L³]" },
      { label: "Unità derivata del SI", value: "Metro cubo" },
      { label: "Simbolo dell'unità SI", value: "m³" },
      { label: "Unità più comune nell'uso quotidiano", value: "Litro (L)" },
    ],
    sections: [
      {
        title: "Che cos'e il volume?",
        paragraphs: [
          "Il volume e l'estensione dello spazio tridimensionale occupato da un oggetto o che puo essere contenuto da un recipiente. Il volume di un oggetto solido esprime la sua grandezza fisica, mentre il volume di un contenitore esprime la quantità di liquido o gas che puo contenere.",
          "Il volume e una grandezza derivata, ottenuta moltiplicando un'unità di lunghezza nelle tre dimensioni (larghezza, altezza, profondita). Per questo la sua dimensione SI e L³.",
        ],
      },
      {
        title: "L'unità SI del volume: il metro cubo",
        paragraphs: [
          "Nel Sistema Internazionale di Unità, l'unità derivata del volume e il metro cubo (m³), che rappresenta il volume interno di un cubo il cui lato misura esattamente 1 metro.",
          "Il metro cubo e usato per grandi volumi (serbatoi d'acqua, getti di calcestruzzo, volume di container), mentre nella vita quotidiana si preferisce il litro, molto più piccolo. Un metro cubo equivale esattamente a 1000 litri.",
        ],
      },
      {
        title: "La relazione tra il litro e il metro cubo",
        paragraphs: [
          "Il litro e un'unità di volume pratica, il cui uso accanto al SI e accettato, anche se non e ufficialmente un'unità del SI. Un litro equivale al volume di un cubo di 10 centimetri di lato (1000 centimetri cubi).",
          "I sottomultipli del litro -- decilitro, centilitro e millilitro -- sono ampiamente usati nelle misurazioni di alimenti, farmaci e laboratorio. Un millilitro equivale esattamente a un centimetro cubo (1 mL = 1 cm³).",
        ],
      },
      {
        title: "Perché le unità di volume si convertono con un rapporto cubico?",
        paragraphs: [
          "Mentre le unità di lunghezza si convertono con un rapporto lineare e quelle di area con un rapporto quadratico, le unità di volume si convertono con un rapporto cubico. Ad esempio, 1 metro equivale a 100 centimetri, ma 1 metro cubo non equivale a 100 centimetri cubi, bensi a 100³, ossia 1.000.000 di centimetri cubi.",
          "Questa relazione cubica sorge perché il volume varia simultaneamente in tre dimensioni ed e l'errore concettuale più frequente nelle conversioni di volume -- richiede un calcolo particolarmente attento nel passare a unità non metriche come il gallone o il piede cubo.",
        ],
      },
      {
        title: "Le misure di cucina",
        paragraphs: [
          "Le misure usate nelle ricette, come il cucchiaio, il cucchiaino e la tazza, sono unità di volume standardizzate che permettono di ottenere risultati coerenti in cucine diverse. Equivalenze generalmente accettate: 1 cucchiaio ≈ 15 mL, 1 cucchiaino ≈ 5 mL, 1 tazza ≈ 250 mL.",
          "Queste misure non sono standard scientifici esatti, ma valori approssimativi ampiamente accettati nella pratica culinaria; nelle ricette che richiedono precisione (specialmente la pasticceria), usare una bilancia da cucina digitale e più affidabile.",
        ],
      },
      {
        title: "Le unità di volume liquido statunitensi e britanniche",
        paragraphs: [
          "I sistemi statunitense e britannico usano unità come il gallone, il quarto, la pinta e l'oncia liquida; ma la dimensione di queste unità differisce tra i due sistemi. Un gallone statunitense equivale a 3,78541 litri, mentre un gallone imperiale britannico equivale a 4,54609 litri -- circa il 20% in più.",
          "Questa differenza e dovuta al fatto che i due paesi hanno storicamente adottato galloni di riferimento diversi (il gallone del vino negli Stati Uniti, il gallone imperiale nel Regno Unito). Conviene sempre verificare a quale sistema appartiene il valore di 'gallone' o 'oncia' indicato in una ricetta o sull'etichetta di un prodotto.",
        ],
      },
      {
        title: "Le unità di volume agricole e storiche",
        paragraphs: [
          "Il bushel e il peck sono unità di volume usate storicamente per misurare prodotti secchi come cereali, frutta e verdura; oggi sono ancora usate in alcuni mercati agricoli, specialmente negli Stati Uniti.",
          "In epoca ottomana, il kile e lo şinik erano unità di volume tradizionali usate per misurare i cereali; 1 kile equivaleva a 20 şinik. Sebbene queste unità presentino piccole variazioni regionali, oggi servono come riferimento per interpretare testi e documenti storici.",
        ],
      },
      {
        title: "Come si calcola un volume?",
        paragraphs: [
          "Per un prisma rettangolare (scatola) si usa la formula Volume = Lunghezza × Larghezza × Altezza. Per un cilindro si applica Volume = π × Raggio² × Altezza, e per una sfera, Volume = (4/3) × π × Raggio³.",
          "Il volume di solidi di forma irregolare viene solitamente determinato con il metodo dello spostamento (principio di Archimede) -- immergendo l'oggetto in un recipiente pieno d'acqua e misurando il volume d'acqua spostato.",
        ],
      },
      {
        title: "Misurazione del volume nel petrolio e nell'industria",
        paragraphs: [
          "Nell'industria petrolifera, il volume e generalmente espresso in barili (bbl); 1 barile equivale esattamente a 158,987 litri (42 galloni statunitensi). Questa unità e una tradizione che risale al XIX secolo, quando il petrolio veniva trasportato in barili di legno originariamente destinati al vino.",
          "Nei processi industriali, i grandi volumi sono generalmente espressi in metri cubi, e le misurazioni piccole di laboratorio in millilitri; l'unità adeguata viene scelta in base alla grandezza del volume misurato.",
        ],
      },
    ],
    unitTable: [
      { name: "Millilitro", symbol: "mL", referenceValue: "0,000001 m³", system: "SI/metrico", commonUse: "Dosi mediche e misurazioni piccole" },
      { name: "Cucchiaino", symbol: "ct", referenceValue: "0,000005 m³ (≈5 mL)", system: "Misura da cucina", commonUse: "Ricette culinarie" },
      { name: "Cucchiaio", symbol: "cs", referenceValue: "0,000015 m³ (≈15 mL)", system: "Misura da cucina", commonUse: "Ricette culinarie" },
      { name: "Tazza", symbol: "tazza", referenceValue: "0,00025 m³ (≈250 mL)", system: "Misura da cucina", commonUse: "Ricette culinarie" },
      { name: "Litro", symbol: "L", referenceValue: "0,001 m³", system: "Metrico", commonUse: "Bevande, carburante e volume quotidiano" },
      { name: "Oncia liquida (US)", symbol: "fl oz", referenceValue: "≈0,0000296 m³ (≈29,57 mL)", system: "Stati Uniti", commonUse: "Bevande e confezioni cosmetiche" },
      { name: "Pinta (US)", symbol: "pt", referenceValue: "≈0,000473 m³ (≈473 mL)", system: "Stati Uniti", commonUse: "Misurazione di birra e latte" },
      { name: "Gallone (US)", symbol: "gal", referenceValue: "≈0,003785 m³ (≈3,785 L)", system: "Stati Uniti", commonUse: "Carburante e grandi volumi liquidi" },
      { name: "Gallone imperiale", symbol: "imp gal", referenceValue: "≈0,004546 m³ (≈4,546 L)", system: "Britannico (imperiale)", commonUse: "Carburante e misurazione di liquidi nel Regno Unito" },
      { name: "Piede cubo", symbol: "ft³", referenceValue: "≈0,0283168 m³", system: "Britannico/statunitense", commonUse: "Edilizia e portata d'aria in climatizzazione" },
      { name: "Barile (petrolio)", symbol: "bbl", referenceValue: "≈0,158987 m³ (≈158,987 L)", system: "Industria petrolifera", commonUse: "Misurazione di petrolio greggio" },
      { name: "Metro cubo", symbol: "m³", referenceValue: "1 m³", system: "SI", commonUse: "Serbatoi d'acqua, calcestruzzo e grandi volumi" },
    ],
  },
  {
    locale: "it",
    slug: "massa",
    sourceSlug: "kutle",
    category: "kutle",
    title: "Conversione delle unità di massa",
    description:
      "Converti rapidamente e gratis tra chilogrammi, grammi, milligrammi, tonnellate e libbre.",
    introduction: [
      "La massa e una grandezza fisica fondamentale legata alla quantità di materia di un oggetto e alla sua proprieta di inerzia. Nel Sistema Internazionale di Unità, l'unità di base della massa e il chilogrammo, simboleggiato da kg.",
      "Sebbene nel linguaggio quotidiano massa e peso siano spesso usati come sinonimi, sono grandezze fisicamente distinte. La massa si misura in chilogrammi, mentre il peso, essendo una forza, si misura in newton.",
    ],
    facts: [
      { label: "Grandezza fisica", value: "Massa" },
      { label: "Simbolo dimensionale", value: "[M]" },
      { label: "Unità di base del SI", value: "Chilogrammo" },
      { label: "Simbolo dell'unità SI", value: "kg" },
      { label: "Ambito della metrologia", value: "Metrologia della massa" },
    ],
    sections: [
      {
        title: "Che cos'e la massa?",
        paragraphs: [
          "La massa e la grandezza fisica legata alla resistenza che un oggetto offre al cambiamento del proprio stato di movimento, ossia all'inerzia. Nella meccanica classica, la relazione tra la forza netta applicata a un oggetto e l'accelerazione prodotta si esprime con l'uguaglianza F = m·a.",
          "Applicando la stessa forza, un oggetto con massa maggiore acquisisce un'accelerazione minore. Per questo la massa non esprime solo, in senso quotidiano, la quantità di materia contenuta in un oggetto, ma svolge un ruolo fondamentale nelle equazioni del moto.",
          "La massa e una grandezza scalare. Non ha direzione e il suo simbolo dimensionale di base nel sistema SI e la lettera M.",
        ],
      },
      {
        title: "La differenza tra massa e peso",
        paragraphs: [
          "Massa e peso non sono la stessa grandezza fisica. La massa e una proprieta dell'oggetto e si esprime in chilogrammi. Il peso, invece, e la forza che l'oggetto subisce in un campo gravitazionale e si misura in newton.",
          "La relazione semplificata del peso si scrive W = m·g, dove W rappresenta la forza peso, m la massa e g l'accelerazione di gravita locale.",
          "La massa di un oggetto rimane approssimativamente uguale sulla Terra e sulla Luna; tuttavia, il suo peso varia perché l'accelerazione di gravita locale e diversa. Per questo, nell'uso scientifico, il chilogrammo e un'unità di massa e non di peso.",
          "Nel linguaggio quotidiano, poiche il risultato del pesare qualcosa e espresso in chilogrammi, le parole 'peso' e 'massa' vengono spesso usate in modo intercambiabile. Lo strumento di misura in realta rileva l'effetto di una forza, ma e calibrato per mostrare il risultato in unità di massa.",
        ],
      },
      {
        title: "Perché il chilogrammo e l'unità di base del SI per la massa?",
        paragraphs: [
          "Nel Sistema Internazionale di Unità, l'unità di base della massa e il chilogrammo. Tra le unità di base del SI, il chilogrammo e l'unica il cui nome include un prefisso.",
          "La parola grammo ha svolto storicamente un ruolo importante nelle prime definizioni di massa del sistema metrico. Ma con l'affermarsi dei campioni pratici, il chilogrammo e diventato il riferimento fondamentale.",
          "Attualmente, il chilogrammo non e più definito dalla massa di un cilindro metallico fisico, ma a partire dal valore numerico fissato della costante di Planck. La relazione di questa definizione con la bilancia di Kibble e le misurazioni elettriche e esaminata in dettaglio nella pagina informativa dedicata al chilogrammo.",
        ],
      },
      {
        title: "Le unità metriche di massa",
        paragraphs: [
          "Le unità metriche di massa si costruiscono a partire dal chilogrammo, dal grammo e dai prefissi del SI che vi si aggiungono. Un grammo equivale a 0,001 chilogrammi, un milligrammo a 0,001 grammi e un microgrammo a 0,001 milligrammi.",
          "Per masse grandi si usa la tonnellata. Una tonnellata metrica equivale esattamente a 1000 chilogrammi. Il simbolo della tonnellata, il cui uso accanto al SI e accettato, e la lettera minuscola t.",
          "L'unità adeguata viene scelta in base alla grandezza della massa misurata. La massa di una persona o di un prodotto puo essere espressa in chilogrammi, il contenuto di un alimento in grammi, il principio attivo di un farmaco in milligrammi o microgrammi, e il carico di un veicolo in tonnellate.",
        ],
      },
      {
        title: "La relazione tra libbra, oncia e chilogrammo",
        paragraphs: [
          "La libbra e l'oncia sono unità di massa usate nei sistemi di misura tradizionali britannico e statunitense. La libbra avoirdupois internazionale equivale esattamente a 0,45359237 chilogrammi.",
          "Una libbra avoirdupois si divide in 16 once. Pertanto, un'oncia equivale esattamente a 0,028349523125 chilogrammi, o 28,349523125 grammi.",
          "La libbra usata per la massa e la libbra-forza (pound-force), un'unità di forza, sono grandezze diverse. La libbra esprime una massa, e la libbra-forza, una forza. Nei calcoli tecnici i simboli lb e lbf non devono essere confusi.",
        ],
      },
      {
        title: "Come si misura la massa?",
        paragraphs: [
          "Per misurare la massa possono essere usate bilance a due piatti, bilance elettroniche, bilance analitiche, celle di carico e diversi sistemi di pesatura industriale di varie capacita.",
          "Le bilance comparative confrontano la massa sconosciuta con masse campione tracciabili. Nelle bilance elettroniche, le celle di carico convertono la forza applicata in un segnale elettrico.",
          "Nelle misurazioni ad alta precisione possono essere considerati fattori come la spinta dell'aria, l'accelerazione di gravita locale, la temperatura, l'umidita, le vibrazioni, gli effetti elettrostatici e la densita della massa campione.",
          "Il collegamento dei campioni di massa con i sistemi di misura nazionali e internazionali si chiama tracciabilita metrologica. La catena di calibrazione permette di confrontare misurazioni effettuate in laboratori e aziende diverse.",
        ],
      },
      {
        title: "La relazione tra densita, volume e massa",
        paragraphs: [
          "Tra massa, densita e volume esiste la relazione m = ρ·V. Qui, m rappresenta la massa, ρ la densita e V il volume.",
          "Per uno stesso volume, la massa di due materiali diversi puo differire in base alla loro densita. Ad esempio, per lo stesso volume, l'acciaio e l'acqua non hanno la stessa massa.",
          "Nel sistema SI, l'unità derivata di base della densita e il chilogrammo per metro cubo. Nelle applicazioni di laboratorio si usano anche abitualmente unità come il grammo per centimetro cubo o il grammo per millilitro.",
        ],
      },
      {
        title: "L'incertezza nella misurazione della massa",
        paragraphs: [
          "Ogni misurazione reale comporta una certa incertezza. Il fatto che una bilancia mostri molte cifre sullo schermo non significa che tutte quelle cifre siano conosciute con la stessa precisione.",
          "La risoluzione dello strumento, la ripetibilita, la non linearita, il campione di calibrazione, le condizioni ambientali e il metodo dell'utente possono contribuire all'incertezza della misurazione di massa.",
          "Nei lavori scientifici e industriali, il risultato di una misurazione deve essere valutato insieme all'unità adeguata, al numero di cifre significative e alle informazioni sull'incertezza.",
        ],
      },
      {
        title: "Come scegliere l'unità di massa adeguata?",
        paragraphs: [
          "Scegliere un'unità adatta alla grandezza dell'oggetto misurato rende il risultato più leggibile. La massa di una persona puo essere espressa in chilogrammi, il principio attivo di una compressa in milligrammi, e il carico di un camion in tonnellate.",
          "Per masse molto piccole possono essere usate unità con prefisso del SI come il microgrammo, il nanogrammo e il picogrammo. Su scala atomica e molecolare, unità specifiche come l'unità di massa atomica unificata possono essere più pratiche.",
          "Nell'eseguire una conversione di unità bisogna verificare non solo il valore numerico, ma anche se l'unità utilizzata esprime massa o forza.",
        ],
      },
    ],
    unitTable: [
      { name: "Nanogrammo", symbol: "ng", referenceValue: "10⁻¹² kg", system: "SI", commonUse: "Quantità di materia molto piccole" },
      { name: "Microgrammo", symbol: "µg", referenceValue: "10⁻⁹ kg", system: "SI", commonUse: "Misurazioni mediche e di laboratorio" },
      { name: "Milligrammo", symbol: "mg", referenceValue: "10⁻⁶ kg", system: "SI", commonUse: "Dosi di farmaci e sostanze chimiche" },
      { name: "Grammo", symbol: "g", referenceValue: "0,001 kg", system: "SI", commonUse: "Alimenti e oggetti piccoli" },
      { name: "Chilogrammo", symbol: "kg", referenceValue: "1 kg", system: "SI", commonUse: "Misurazioni di massa di base" },
      { name: "Tonnellata", symbol: "t", referenceValue: "1000 kg", system: "Metrico", commonUse: "Trasporto, carico e industria" },
      { name: "Oncia", symbol: "oz", referenceValue: "0,028349523125 kg", system: "Britannico/statunitense", commonUse: "Alimenti e masse piccole" },
      { name: "Libbra", symbol: "lb", referenceValue: "0,45359237 kg", system: "Britannico/statunitense", commonUse: "Massa corporea e di prodotti" },
    ],
  },
  {
    locale: "it",
    slug: "temperatura",
    sourceSlug: "sicaklik",
    category: "sicaklik",
    title: "Conversione delle unità di temperatura",
    description:
      "Converti le temperature tra Celsius, Fahrenheit e Kelvin; consulta formule e valori di esempio.",
    introduction: [
      "La temperatura e una grandezza fisica fondamentale legata all'energia cinetica media delle particelle di una materia, che esprime quanto 'calda' o 'fredda' sia quella materia. Nel Sistema Internazionale di Unità, l'unità di base della temperatura e il kelvin.",
      "Nella vita quotidiana, le scale Celsius e Fahrenheit sono le più usate; nei lavori scientifici si usa il kelvin, in alcuni calcoli di ingegneria il Rankine, e nei testi storici puo comparire il Reaumur. A differenza di molte altre grandezze fisiche, la conversione di temperatura tra unità richiede non solo moltiplicazione, ma anche somma o sottrazione.",
    ],
    facts: [
      { label: "Grandezza fisica", value: "Temperatura (temperatura termodinamica)" },
      { label: "Simbolo dimensionale", value: "[Θ]" },
      { label: "Unità di base del SI", value: "Kelvin" },
      { label: "Simbolo dell'unità SI", value: "K" },
      { label: "Zero assoluto", value: "0 K = -273,15 °C = -459,67 °F" },
    ],
    sections: [
      {
        title: "Che cos'e la temperatura?",
        paragraphs: [
          "La temperatura e una grandezza direttamente legata all'energia cinetica (di movimento) media degli atomi e delle molecole che compongono una materia. Quanto più velocemente si muovono le particelle, tanto più 'calda' e considerata la materia.",
          "La temperatura e una delle sette grandezze di base del Sistema Internazionale di Unità e, come temperatura termodinamica, e rappresentata dal simbolo Θ (theta). A differenza di molte altre grandezze (come la lunghezza o la massa), non e una grandezza direttamente additiva -- mettere a contatto due corpi non somma le loro temperature, ma li porta verso un equilibrio.",
        ],
      },
      {
        title: "L'unità SI della temperatura: il kelvin",
        paragraphs: [
          "Il kelvin e l'unità di base del SI per la temperatura ed e rappresentato dal simbolo K (senza il simbolo di grado, si scrive semplicemente 'K'). La scala Kelvin prende lo zero assoluto (la temperatura più bassa teoricamente possibile) come punto di partenza (0 K).",
          "Dalla revisione del SI del 2019, il kelvin non e più definito a partire dal punto triplo dell'acqua, ma dal valore numerico fissato della costante di Boltzmann (k). Cio garantisce che l'unità di temperatura si basi su una costante universale e non su una sostanza di riferimento fisica.",
        ],
      },
      {
        title: "Perché la conversione di temperatura non e una semplice moltiplicazione?",
        paragraphs: [
          "In grandezze come la lunghezza o la massa, la conversione di unità avviene solo con un fattore moltiplicativo (ad esempio, metro-centimetro). Nella temperatura, poiche le scale Celsius, Fahrenheit e Kelvin hanno 'punti zero' diversi, la conversione richiede sia moltiplicazione che somma o sottrazione.",
          "Ad esempio, per passare da Celsius a Fahrenheit, il valore viene prima moltiplicato per 9/5 e poi si somma 32: °F = (°C × 9/5) + 32. Per questo la temperatura e, matematicamente, l'unica grandezza fisica comune con una relazione di conversione 'affine' (lineare, ma che non passa per l'origine).",
        ],
      },
      {
        title: "La scala Celsius",
        paragraphs: [
          "La scala Celsius fu sviluppata nel 1742 dall'astronomo svedese Anders Celsius e definisce il punto di congelamento dell'acqua a 0 °C e il suo punto di ebollizione (a una pressione di un'atmosfera) a 100 °C. E un sistema di riferimento pratico che facilita la comprensione della scala nella vita quotidiana.",
          "Il Celsius e la scala di temperatura più usata al mondo sia nei lavori scientifici che nelle informazioni meteorologiche quotidiane della maggior parte dei paesi, inclusa l'Italia; un piccolo numero di paesi, come gli Stati Uniti, continua a preferire il Fahrenheit nell'uso quotidiano.",
        ],
      },
      {
        title: "La scala Fahrenheit",
        paragraphs: [
          "La scala Fahrenheit fu sviluppata nel 1724 dal fisico tedesco Daniel Gabriel Fahrenheit. In questa scala, il punto di congelamento dell'acqua e 32 °F e il punto di ebollizione 212 °F -- un intervallo esatto di 180 gradi tra congelamento ed ebollizione.",
          "Il Fahrenheit e ancora usato oggi per le misurazioni di temperatura quotidiane in un piccolo numero di paesi, principalmente gli Stati Uniti; nei lavori scientifici a livello mondiale ha in gran parte ceduto il posto al Celsius e al Kelvin.",
        ],
      },
      {
        title: "Rankine e Reaumur: scale meno conosciute",
        paragraphs: [
          "Il Rankine e una scala di temperatura assoluta che usa unità della stessa dimensione del grado Fahrenheit, ma prende lo zero assoluto come 0 °R; il punto di congelamento dell'acqua e 491,67 °R. E preferito specialmente al Kelvin in alcuni calcoli di ingegneria termodinamica negli Stati Uniti.",
          "La scala Reaumur fu sviluppata nel XVIII secolo dallo scienziato francese Rene Reaumur; fissa il punto di congelamento dell'acqua a 0 °Ré e quello di ebollizione a 80 °Ré. Sebbene oggi praticamente non sia usata, puo ancora essere trovata come riferimento storico in alcuni paesi europei (specialmente in alcune ricette tradizionali russe).",
        ],
      },
      {
        title: "Che cosa significa lo zero assoluto?",
        paragraphs: [
          "Lo zero assoluto (0 kelvin, -273,15 °C, -459,67 °F) e la temperatura teorica alla quale le particelle possiedono, in senso classico, la minima energia cinetica possibile. Secondo la meccanica quantistica, le particelle non rimangono completamente immobili nemmeno allo zero assoluto (energia di punto zero), ma in senso classico non puo essere definita una temperatura più bassa.",
          "In laboratorio sono state raggiunte temperature estremamente vicine allo zero assoluto (dell'ordine del microkelvin, persino del nanokelvin), ma secondo il terzo principio della termodinamica e impossibile raggiungere esattamente lo zero assoluto in un numero finito di passaggi.",
        ],
      },
      {
        title: "Come si misura la temperatura?",
        paragraphs: [
          "Per misurare la temperatura si usano diverse tecnologie: termometri a mercurio o alcol, termometri digitali, termocoppie, termometri a resistenza (RTD) e termometri a infrarossi (senza contatto). Ognuno e adatto a un intervallo di temperatura e a un livello di precisione diversi.",
          "Le termocoppie sono ampiamente usate in ambito industriale perché possono funzionare in un intervallo di temperatura molto ampio (a volte da -200 °C a +2000 °C); calcolano la temperatura a partire dalla differenza di tensione generata nella giunzione di due metalli diversi.",
        ],
      },
    ],
    unitTable: [
      { name: "Kelvin", symbol: "K", referenceValue: "Unità di base", system: "SI", commonUse: "Calcoli scientifici e termodinamici" },
      { name: "Celsius", symbol: "°C", referenceValue: "K = °C + 273,15", system: "Metrico (uso quotidiano)", commonUse: "Meteorologia, vita quotidiana, scienza" },
      { name: "Fahrenheit", symbol: "°F", referenceValue: "°F = (°C × 9/5) + 32", system: "Stati Uniti", commonUse: "Meteorologia quotidiana negli Stati Uniti" },
      { name: "Rankine", symbol: "°R", referenceValue: "°R = (°C + 273,15) × 9/5", system: "Stati Uniti (ingegneria)", commonUse: "Calcoli di ingegneria termodinamica" },
      { name: "Reaumur", symbol: "°Ré", referenceValue: "°Ré = °C × 4/5", system: "Storico (Europa)", commonUse: "Testi storici, ricette tradizionali" },
    ],
  },
  {
    locale: "it",
    slug: "tempo",
    sourceSlug: "zaman",
    category: "zaman",
    title: "Conversione delle unità di tempo",
    description:
      "Usa in un'unica pagina le conversioni di tempo essenziali tra secondi, minuti e ore.",
    introduction: [
      "Il tempo e una grandezza fisica fondamentale che esprime l'ordine in cui accadono gli eventi e la durata che li separa. Nel Sistema Internazionale di Unità, l'unità di base del tempo e il secondo, usato insieme a unità derivate come il minuto, l'ora e il giorno nella vita quotidiana.",
      "A differenza di grandezze come la lunghezza o la massa, il tempo e uno dei concetti di misurazione più antichi della storia umana; la struttura sessagesimale (base 60) dell'ora, del minuto e del secondo risale a migliaia di anni fa, all'antica civilta babilonese.",
    ],
    facts: [
      { label: "Grandezza fisica", value: "Tempo" },
      { label: "Simbolo dimensionale", value: "[T]" },
      { label: "Unità di base del SI", value: "Secondo" },
      { label: "Simbolo dell'unità SI", value: "s" },
      { label: "Definizione attuale del secondo", value: "9.192.631.770 periodi di oscillazione dell'atomo di cesio-133" },
    ],
    sections: [
      {
        title: "Che cos'e il tempo?",
        paragraphs: [
          "Il tempo e una grandezza fondamentale che esprime l'ordine in cui accadono gli eventi e la durata trascorsa tra due eventi. In fisica e rappresentato dal simbolo dimensionale T e interviene nella definizione di numerose grandezze derivate, come la velocità, l'accelerazione e la frequenza.",
          "Nella fisica classica, il tempo era considerato una grandezza assoluta che trascorreva allo stesso modo per tutti gli osservatori; con la teoria della relativita di Einstein si e compreso che il tempo puo trascorrere in modo diverso a seconda della velocità dell'osservatore e del campo gravitazionale (dilatazione del tempo).",
        ],
      },
      {
        title: "L'unità SI del tempo: il secondo",
        paragraphs: [
          "Il secondo e l'unità di base del SI per il tempo, simboleggiato da s. Storicamente, il secondo era definito come 1/86.400 di un giorno (24 ore × 60 minuti × 60 secondi).",
          "Poiche questa definizione si e rivelata insufficientemente stabile a causa di piccole irregolarita nella velocità di rotazione della Terra, nel 1967 il secondo fu ridefinito come esattamente 9.192.631.770 periodi della radiazione associata alla transizione tra due livelli di energia fondamentali dell'atomo di cesio-133. Questa definizione permette agli orologi atomici di funzionare con la stessa precisione ovunque nel mondo.",
        ],
      },
      {
        title: "L'origine sessagesimale dell'ora, del minuto e del secondo",
        paragraphs: [
          "La divisione di un'ora in 60 minuti e di un minuto in 60 secondi risale al sistema numerico sessagesimale (base 60) usato dall'antica civilta babilonese. I babilonesi dividevano sia l'angolo (360 gradi) sia il tempo secondo questo sistema.",
          "Il numero 60 fu scelto perché e divisibile esattamente per molti numeri -- 2, 3, 4, 5, 6, 10, 12, 15, 20 e 30 -- il che facilita divisioni pratiche nei calcoli quotidiani (ad esempio, dividere un'ora in tre o quattro parti) senza bisogno di numeri frazionari.",
        ],
      },
      {
        title: "La divisione del giorno in 24 ore",
        paragraphs: [
          "La divisione del giorno in 24 ore risale all'Antico Egitto; gli egizi dividevano il giorno in 12 parti uguali e la notte in altre 12, seguendo il tempo tramite meridiane e osservazioni stellari.",
          "Questa divisione in 12 probabilmente si ispirava al conteggio delle falangi delle dita (tre falangi in ciascuno dei quattro dita senza contare il pollice, 12 in totale) o al numero di cicli lunari di un anno (circa 12 lune piene).",
        ],
      },
      {
        title: "La relazione tra le unità metriche di tempo",
        paragraphs: [
          "I sottomultipli del secondo -- il millisecondo (0,001 secondi), il microsecondo e il nanosecondo -- sono usati per misurare eventi molto brevi, come le operazioni dei processori informatici, la cronometraggio sportivo e gli esperimenti scientifici.",
          "I loro multipli -- il minuto (60 secondi), l'ora (3600 secondi) e il giorno (86.400 secondi) -- sono le unità di base usate quotidianamente per tenere il conto del tempo. La conversione tra queste unità avviene, a differenza della temperatura, solo tramite moltiplicazione/divisione, perché tutte condividono un punto zero (origine) comune.",
        ],
      },
      {
        title: "Che cos'e un secondo intercalare?",
        paragraphs: [
          "La velocità di rotazione della Terra sul proprio asse presenta, nel tempo, piccole irregolarita dovute agli effetti delle maree e a cambiamenti nella sua struttura interna; cio crea un piccolo scarto tra il tempo 'preciso' misurato dagli orologi atomici e la durata del giorno basata sulla rotazione reale della Terra.",
          "Per compensare questo scarto, dal 1972 viene aggiunto un 'secondo intercalare' al Tempo Coordinato Universale (UTC) quando necessario. E un meccanismo di correzione simile al giorno aggiuntivo degli anni bisestili (29 febbraio), ma poiche l'irregolarita della rotazione terrestre e imprevedibile, i secondi intercalari non vengono aggiunti in un ciclo fisso come il calendario, bensi secondo necessita.",
        ],
      },
      {
        title: "I fusi orari e l'UTC",
        paragraphs: [
          "La Terra e divisa in circa 24 fusi orari, perché il Sole raggiunge il suo punto più alto a orari diversi a seconda della longitudine. Tutti i fusi orari usano il Tempo Coordinato Universale (UTC) come punto di riferimento e sono espressi tramite una differenza oraria rispetto a questo riferimento a seconda della loro regione (ad esempio, l'Italia e UTC+1 in inverno).",
          "L'UTC e uno standard di tempo moderno che ha sostituito l'antico Tempo Medio di Greenwich (GMT) ed e mantenuto tramite orologi atomici; il GMT oggi e usato soprattutto come nome del fuso orario corrispondente all'orario invernale nel Regno Unito.",
        ],
      },
      {
        title: "Come si misura il tempo?",
        paragraphs: [
          "Nella vita quotidiana si usano orologi meccanici e digitali, mentre nelle applicazioni scientifiche e tecnologiche (satelliti GPS, reti di telecomunicazioni) si usano orologi atomici. Gli orologi atomici funzionano con una precisione estremamente elevata, basata sulla frequenza di oscillazione stabile di atomi di cesio o rubidio.",
          "Affinche il sistema GPS possa determinare una posizione precisa, gli orologi atomici dei satelliti devono essere sincronizzati con precisione di nanosecondi; anche un piccolo scarto in questi orologi puo provocare grandi errori nel calcolo della posizione a terra.",
        ],
      },
    ],
    unitTable: [
      { name: "Millisecondo", symbol: "ms", referenceValue: "0,001 s", system: "SI/metrico", commonUse: "Operazioni informatiche e cronometraggio sportivo" },
      { name: "Secondo", symbol: "s", referenceValue: "1 s", system: "SI", commonUse: "Misurazione di tempo di base" },
      { name: "Minuto", symbol: "min", referenceValue: "60 s", system: "Accettato accanto al SI", commonUse: "Controllo del tempo quotidiano" },
      { name: "Ora", symbol: "h", referenceValue: "3600 s", system: "Accettato accanto al SI", commonUse: "Tempo di lavoro, tempo di viaggio" },
      { name: "Giorno", symbol: "giorno", referenceValue: "86.400 s", system: "Accettato accanto al SI", commonUse: "Calendario e calcoli di durata" },
    ],
  },
  {
    locale: "it",
    slug: "velocita",
    sourceSlug: "hiz",
    category: "hiz",
    title: "Conversione delle unità di velocità",
    description:
      "Converti la velocità tra km/h, m/s e mph; consulta esempi di ingegneria e di uso quotidiano.",
    introduction: [
      "La velocità e una grandezza fisica derivata che esprime la distanza percorsa da un oggetto per unità di tempo. Poiche si ottiene dividendo una lunghezza per un tempo, la dimensione della velocità e L/T (lunghezza divisa per tempo).",
      "Nella vita quotidiana, il chilometro all'ora (km/h) e il miglio all'ora (mph) sono le unità di velocità più usate; il metro al secondo (m/s) e preferito nei lavori scientifici, e il nodo nella navigazione marittima e aerea. La velocità della luce occupa un posto speciale tra le unità di velocità, come limite superiore assoluto raggiungibile nell'universo.",
    ],
    facts: [
      { label: "Grandezza fisica", value: "Velocità" },
      { label: "Simbolo dimensionale", value: "[L/T]" },
      { label: "Unità derivata del SI", value: "Metro al secondo" },
      { label: "Simbolo dell'unità SI", value: "m/s" },
      { label: "Limite di velocità universale", value: "Velocità della luce ≈ 299.792.458 m/s" },
    ],
    sections: [
      {
        title: "Che cos'e la velocità?",
        paragraphs: [
          "La velocità esprime la distanza percorsa da un oggetto per unità di tempo e si calcola con la formula Velocità = Distanza / Tempo. Sebbene la fisica distingua tecnicamente tra 'rapidita' (scalare, senza direzione) e 'velocità' (vettoriale, con direzione), nel linguaggio quotidiano i due termini vengono spesso usati in modo intercambiabile.",
          "La velocità e una grandezza derivata, ottenuta dividendo un'unità di lunghezza per un'unità di tempo. Per questo la sua dimensione SI e indicata come L/T (o L¹T⁻¹).",
        ],
      },
      {
        title: "L'unità SI della velocità: il metro al secondo",
        paragraphs: [
          "Nel Sistema Internazionale di Unità, l'unità derivata della velocità e il metro al secondo (m/s), che esprime che un oggetto percorre un metro ogni secondo. Questa unità e usata come standard nei calcoli scientifici e nelle formule di fisica.",
          "Nella vita quotidiana si preferisce il chilometro all'ora (km/h) al metro al secondo, perché le velocità dei veicoli e le distanze stradali sono espresse così con numeri più intuitivi a quella scala. 1 m/s equivale esattamente a 3,6 km/h.",
        ],
      },
      {
        title: "Il chilometro all'ora e il miglio all'ora",
        paragraphs: [
          "Il chilometro all'ora (km/h) e l'unità standard di velocità stradale nei paesi che usano il sistema metrico, tra cui l'Italia. Il miglio all'ora (mph) e preferito nei paesi che usano il sistema di misura britannico, come Stati Uniti e Regno Unito.",
          "1 mph equivale a circa 1,60934 km/h. Questa differenza e una fonte pratica di confusione che puo portare a interpretare male i tachimetri di veicoli importati o i limiti di velocità quando si noleggia un'auto all'estero.",
        ],
      },
      {
        title: "Il nodo: la velocità nella navigazione marittima e aerea",
        paragraphs: [
          "Il nodo (miglio nautico all'ora) e l'unità di velocità standard nella navigazione marittima e aerea; 1 nodo significa esattamente percorrere un miglio nautico (1852 metri) in un'ora.",
          "Il nome dell'unità 'nodo' deriva storicamente dal metodo usato per misurare la velocità delle navi: si gettava in acqua una corda con dei nodi e si contava quanti nodi passavano in un tempo determinato. Questo metodo fu usato per secoli prima dell'avvento degli strumenti moderni di misurazione della velocità.",
        ],
      },
      {
        title: "La velocità della luce: il limite di velocità dell'universo",
        paragraphs: [
          "La velocità della luce nel vuoto e definita esattamente come 299.792.458 m/s e costituisce, secondo la teoria della relativita speciale di Einstein, il limite superiore assoluto che puo essere raggiunto dall'informazione o da un oggetto con massa nell'universo.",
          "Il fatto che la velocità della luce sia definita come un numero esatto (ed era gia considerata costante prima della revisione del SI del 2019) permette che la definizione attuale del metro si basi anch'essa su questa costante -- il metro e definito come la distanza percorsa dalla luce in 1/299.792.458 di secondo.",
        ],
      },
      {
        title: "Il numero di Mach: una relazione con la velocità del suono",
        paragraphs: [
          "In aviazione, le velocità elevate vengono spesso espresse tramite il numero di Mach, che rappresenta il rapporto tra la velocità di un oggetto e la velocità del suono in quel mezzo (Mach 1 = velocità del suono). La velocità del suono non e un valore fisso; varia in base alla temperatura e alla densita dell'aria (circa 343 m/s, ovvero 1235 km/h, a livello del mare).",
          "Per questo, uno stesso numero di Mach puo corrispondere a velocità reali diverse (in km/h o m/s) a seconda dell'altitudine e della temperatura -- la velocità Mach 0,85 di un aereo varia nel suo valore reale con l'altitudine.",
        ],
      },
      {
        title: "La differenza tra velocità media e velocità istantanea",
        paragraphs: [
          "La velocità media si ottiene dividendo la distanza totale percorsa per il tempo totale trascorso e fornisce un unico valore per l'intero tragitto. La velocità istantanea e la velocità di un oggetto in un momento specifico e puo variare continuamente (accelerazione, decelerazione, arresto, ecc.).",
          "Mentre il tachimetro di un veicolo mostra la velocità istantanea, la velocità media di un tragitto viene solitamente calcolata a posteriori a partire dalla distanza totale e dalla durata totale -- i due valori differiscono finche la velocità non e rimasta costante durante il tragitto.",
        ],
      },
    ],
    unitTable: [
      { name: "Centimetro al secondo", symbol: "cm/s", referenceValue: "0,01 m/s", system: "SI/metrico", commonUse: "Laboratorio e misurazione di movimento lento" },
      { name: "Metro al minuto", symbol: "m/min", referenceValue: "≈0,0167 m/s", system: "SI/metrico", commonUse: "Velocità di nastri trasportatori industriali" },
      { name: "Metro al secondo", symbol: "m/s", referenceValue: "1 m/s", system: "SI", commonUse: "Calcoli scientifici e fisici" },
      { name: "Chilometro all'ora", symbol: "km/h", referenceValue: "≈0,278 m/s", system: "Metrico", commonUse: "Velocità di veicoli e limiti stradali" },
      { name: "Miglio all'ora", symbol: "mph", referenceValue: "≈0,447 m/s", system: "Britannico/statunitense", commonUse: "Velocità di veicoli negli USA e nel Regno Unito" },
      { name: "Nodo", symbol: "kn", referenceValue: "≈0,514 m/s", system: "Navigazione marittima/aerea", commonUse: "Velocità di navi e aerei" },
      { name: "Chilometro al minuto", symbol: "km/min", referenceValue: "≈16,67 m/s", system: "Metrico", commonUse: "Calcoli di velocità su brevi distanze" },
      { name: "Chilometro al secondo", symbol: "km/s", referenceValue: "1000 m/s", system: "Metrico", commonUse: "Velocità di navicelle spaziali e corpi celesti" },
      { name: "Velocità della luce", symbol: "c", referenceValue: "299.792.458 m/s", system: "Costante universale", commonUse: "Calcoli di fisica e astronomia" },
    ],
  },
  {
    locale: "it",
    slug: "pressione",
    sourceSlug: "basinc",
    category: "basinc",
    title: "Conversione delle unità di pressione",
    description:
      "Converti la pressione tra pascal, chilopascal, bar e PSI; consulta formule e usi in ingegneria.",
    introduction: [
      "La pressione e la grandezza fisica che esprime la quantità di forza che agisce perpendicolarmente su una superficie, in relazione a quella superficie. Il suo campo di applicazione e molto ampio, dalle tensioni di contatto tra solidi al fluido in una tubazione, dall'atmosfera ai sistemi di vuoto. In ingegneria, la pressione non e solo un valore numerico: e una variabile di progetto fondamentale per la sicurezza, la tenuta, la resistenza strutturale, la conversione di energia e il controllo dei processi.",
      "Nel Sistema Internazionale di Unità, l'unità derivata della pressione e il pascal, simboleggiato da Pa. Un pascal corrisponde alla pressione esercitata da una forza di un newton distribuita uniformemente su una superficie di un metro quadrato. Per questo la pressione e direttamente legata ai concetti di forza e superficie; condivide la stessa struttura dimensionale con lo sforzo meccanico dei materiali, anche se il contesto fisico non e sempre lo stesso.",
      "Nella vita quotidiana e nell'industria, la pressione e espressa la maggior parte delle volte in unità più pratiche del pascal. Il chilopascal e il PSI sono molto usati per la pressione degli pneumatici, il bar nei sistemi di processo, l'atm nelle condizioni atmosferiche e il millibar in meteorologia. Il fatto che diversi settori abbiano storicamente adottato unità diverse rende particolarmente importante comprendere bene le conversioni di pressione e non confondere i tipi di pressione assoluta, relativa o differenziale.",
    ],
    facts: [
      { label: "Grandezza fisica", value: "Pressione" },
      { label: "Unità derivata del SI", value: "Pascal" },
      { label: "Simbolo SI", value: "Pa" },
      { label: "Relazione di base", value: "P = F / A" },
      { label: "Equivalente SI", value: "1 Pa = 1 N/m²" },
      { label: "Formula dimensionale", value: "M L⁻¹ T⁻²" },
      { label: "Atmosfera standard", value: "101.325 Pa" },
      { label: "Riferimento dello zero assoluto", value: "Vuoto totale" },
    ],
    sections: [
      {
        title: "Che cos'e la pressione?",
        paragraphs: [
          "La pressione non dipende solo dalla grandezza della forza applicata su una superficie, ma anche dalla superficie su cui quella forza e distribuita. Se la stessa forza viene applicata su una superficie più piccola, la pressione aumenta; se viene distribuita su una superficie maggiore, diminuisce. Per questo un coltello ben affilato puo tagliare con poca forza, mentre la stessa forza su una base larga produce un effetto superficiale molto minore.",
          "Nella meccanica dei fluidi, la pressione e considerata la componente di sforzo normale che un fluido in quiete o in movimento esercita sul suo intorno. In un fluido in quiete, la pressione si trasmette in tutte le direzioni ed e legata al principio di Pascal nei recipienti chiusi. Questa proprieta e alla base delle presse idrauliche, dei sistemi frenanti e di numerosi attuatori industriali.",
          "Il concetto di pressione non si limita a liquidi e gas. L'effetto della forza normale media sulle superfici di contatto crea anch'esso una distribuzione simile alla pressione. Ma in ingegneria, parlando di pressione si pensa principalmente a sistemi fluidi come tubazioni, serbatoi, compressori, condotti d'aria, camere a vuoto e l'ambiente atmosferico.",
        ],
      },
      {
        title: "La formula della pressione: P = F / A",
        paragraphs: [
          "La definizione di base della pressione e data dalla relazione P = F / A. Qui, P rappresenta la pressione, F la componente di forza perpendicolare alla superficie, e A la superficie su cui quella forza e distribuita. L'analisi dimensionale da newton diviso metro quadrato, che equivale all'unità pascal.",
          "Questa relazione, supponendo una distribuzione uniforme della forza, fornisce la pressione media. In problemi di contatto reali o in campi complessi all'interno di un fluido, la pressione puo variare lungo la superficie. In tal caso, invece di un unico valore medio, si considera la distribuzione locale di pressione, le equazioni differenziali e le condizioni al contorno.",
          "Un errore frequente nella pratica e scegliere male la direzione della forza e la superficie effettiva. Ad esempio, nel calcolare la forza di un pistone si deve usare solo la superficie della sezione effettiva sottoposta alla pressione. Ignorare dettagli geometrici come la guarnizione, il bullone o la superficie di appoggio puo provocare errori di progettazione.",
        ],
      },
      {
        title: "Perché il pascal e l'unità SI della pressione?",
        paragraphs: [
          "Il pascal nasce in modo naturale dalla combinazione del newton, unità SI di forza, e del metro quadrato, unità SI di superficie. L'uguaglianza 1 Pa = 1 N/m² non e solo una definizione, ma anche un'espressione dimensionale che mostra l'origine meccanica della pressione. Per questo non e necessario definire un'unità di base indipendente per la pressione.",
          "Il sistema SI cerca di relazionare in modo coerente le grandezze derivate con le unità di base. Esprimere la pressione in pascal fornisce un quadro compatibile con la densita di energia, lo sforzo, il modulo di elasticita e le equazioni della meccanica dei fluidi. Il fatto che una stessa unità possa essere usata in campi diversi riduce gli errori di conversione nei calcoli.",
          "Su scala quotidiana, il pascal e solitamente un'unità molto piccola. Per questo l'ingegneria preferisce scale più pratiche come il chilopascal, il megapascal o il bar. Ciononostante, tutte finiscono per essere legate al pascal e, quindi, alla base del SI.",
        ],
      },
      {
        title: "La storia della misurazione della pressione: Torricelli e il barometro",
        paragraphs: [
          "La misurazione sistematica della pressione inizio nel 1643 con lo sviluppo del barometro a mercurio da parte dello scienziato italiano Evangelista Torricelli. Torricelli osservo che, immergendo un tubo di vetro chiuso a un'estremita e riempito di mercurio, con l'estremita aperta in un recipiente di mercurio, il mercurio nel tubo si fermava a una certa altezza lasciando un vuoto sopra.",
          "Torricelli propose che l'altezza della colonna di mercurio fosse bilanciata dal peso dell'aria esterna. Questa idea pose le basi sperimentali della nozione che l'aria ha un peso misurabile e, quindi, una pressione, ed e considerata il punto di partenza dello studio della pressione come grandezza scientifica.",
          "Nel 1648, su suggerimento di Blaise Pascal, Florin Perier misuro un barometro a diverse altitudini sul Puy de Dome e dimostro che la pressione atmosferica diminuisce con l'altitudine. I lavori successivi basati su questi fondamenti portarono al coordinamento internazionale delle unità di misura con la Convenzione del Metro del 1875, la definizione precisa dell'atmosfera standard nel 1954 e l'adozione del pascal nel SI nel 1971.",
        ],
      },
      {
        title: "Pressione assoluta, relativa e differenziale",
        paragraphs: [
          "La pressione assoluta e misurata rispetto al vuoto totale. Questo riferimento e la situazione in cui la pressione e teoricamente nulla, e la pressione assoluta non puo mai essere negativa. Le leggi dei gas, i calcoli termodinamici e alcune relazioni legate alla densita funzionano con la pressione assoluta.",
          "La pressione relativa (o manometrica) e misurata rispetto alla pressione atmosferica. La maggior parte dei manometri sul campo prende l'atmosfera circostante come riferimento zero; per questo il valore letto sullo schermo e solitamente la pressione relativa. La relazione tra pressione assoluta e relativa si esprime come P_ass = P_rel + P_atm.",
          "La pressione differenziale e la differenza di pressione tra due punti. In applicazioni come l'ostruzione di un filtro, la misurazione di portata tramite una piastra a foro, la pressurizzazione di una stanza o le prestazioni di uno scambiatore di calore, si segue direttamente la differenza di pressione tra due linee o due volumi diversi. Questa grandezza non e definita ne rispetto al vuoto totale ne rispetto alla sola atmosfera; e direttamente la differenza tra due punti.",
        ],
      },
      {
        title: "La pressione atmosferica",
        paragraphs: [
          "La pressione atmosferica e la pressione esercitata sulle superfici dal peso della colonna d'aria dell'atmosfera terrestre. In condizioni standard vicine al livello del mare si considera di circa 101.325 Pa, ossia 1 atm. Tuttavia, questo valore non e costante; varia con l'altitudine, le condizioni meteorologiche e la temperatura.",
          "I barometri sono usati per misurare la pressione atmosferica. I barometri a mercurio sono stati storicamente strumenti di riferimento, mentre i sensori di pressione elettronici si sono generalizzati nelle applicazioni moderne. La pressione atmosferica e importante non solo per la meteorologia, ma anche per la tecnologia del vuoto, i sistemi di combustione e le conversioni tra pressione relativa e assoluta.",
          "Nei sistemi che funzionano con pressione relativa, le variazioni della pressione atmosferica possono influire sull'interpretazione della misurazione. Ad esempio, una pressione relativa di 2 bar a livello del mare e una pressione relativa di 2 bar ad alta quota non forniscono lo stesso valore assoluto. Questa distinzione puo essere determinante, specialmente nei calcoli di compressione, densita dei gas e punto di ebollizione.",
        ],
      },
      {
        title: "La pressione idrostatica e la relazione P = ρgh",
        paragraphs: [
          "In un fluido in quiete, la pressione aumenta con la profondita. Supponendo una densita costante, la pressione relativa idrostatica si esprime approssimativamente con la relazione P = ρgh. Qui, ρ rappresenta la densita, g l'accelerazione di gravita e h l'altezza della colonna di fluido.",
          "Questa relazione risulta particolarmente utile per serbatoi d'acqua, vasche aperte, dighe, misurazione del livello e manometri a colonna liquida. Alla stessa altezza e nello stesso fluido, la pressione e considerata uguale; la forma del recipiente non cambia il risultato. Cio che conta e la densita del fluido e la profondita verticale rispetto alla superficie libera.",
          "La pressione idrostatica assoluta include non solo l'incremento ρgh, ma anche la pressione iniziale sulla superficie libera. In un recipiente aperto, questo valore iniziale e solitamente la pressione atmosferica. Pertanto, nel calcolare la pressione assoluta bisogna sommare non solo l'incremento dovuto alla colonna di liquido, ma anche la pressione esterna sulla superficie.",
        ],
      },
      {
        title: "Pressione statica, dinamica e totale",
        paragraphs: [
          "La pressione statica e la componente di pressione che rappresenta lo stato termodinamico locale del flusso, dal punto di vista di un osservatore che si muove con il fluido. La maggior parte dei punti di misurazione in tubazioni, serbatoi e condotti segue fondamentalmente la pressione statica. La maggior parte dei trasmettitori di pressione e progettata per misurare questa grandezza.",
          "La pressione dinamica esprime l'effetto cinetico dovuto alla velocità del flusso e la sua formula approssimativa abituale e q = 1/2 ρv². Questo termine svolge un ruolo importante nell'approccio di Bernoulli e viene usato in metodi di misurazione della velocità come il tubo di Pitot. Quanto maggiore e la velocità, tanto maggiore e la pressione dinamica.",
          "Nell'approccio di flusso ideale, la pressione totale e interpretata come la somma della pressione statica e di quella dinamica. Nei sistemi reali, questa distinzione deve essere usata con cautela a causa dell'attrito, della turbolenza, della comprimibilita e delle perdite locali. Ciononostante, la distinzione statica-totale-dinamica rimane un linguaggio ingegneristico fondamentale in ventilazione, aerodinamica e misurazioni di processo.",
        ],
      },
      {
        title: "L'altezza di pressione e la prevalenza di una pompa",
        paragraphs: [
          "L'altezza di pressione esprime una determinata pressione in termini dell'altezza equivalente di una colonna di fluido. La relazione di base si scrive h = P / (ρg). Così, una stessa pressione corrisponde a un'altezza diversa a seconda della densita del fluido.",
          "Nei sistemi di pompaggio, la pressione e interpretata la maggior parte delle volte non direttamente in pascal o bar, ma in metri di colonna di fluido. Cio accade perché la funzione della pompa non e solo dare pressione al fluido, ma anche fornirgli l'energia necessaria per superare una determinata altezza, le perdite per attrito e una componente di velocità. Per questo il concetto di prevalenza e molto pratico dal punto di vista dell'ingegneria sul campo.",
          "L'altezza di pressione e l'altezza geometrica non sono lo stesso concetto. Affidarsi solo alla lettura di un manometro senza considerare le perdite di carico nelle tubazioni, il carico di velocità e le resistenze locali puo dare luogo a risultati errati nella selezione delle pompe e nel bilanciamento del sistema. Specialmente nell'acqua, nell'olio e nei fluidi di processo, le differenze di densita richiedono una conversione fatta con attenzione.",
        ],
      },
      {
        title: "Perché le unità di pressione sono diverse?",
        paragraphs: [
          "La diversita delle unità di pressione si spiega in gran parte per ragioni storiche e settoriali. Mentre il sistema SI prende il pascal come riferimento, l'industria continua a usare il bar, la medicina il mmHg, la meteorologia il millibar, l'automotive il PSI, e alcuni documenti tecnici antichi l'atmosfera tecnica. Questa situazione e dovuta al fatto che i diversi ambiti mantengono le proprie abitudini d'uso.",
          "Alcune unità risultano più intuitive per l'utente. Ad esempio, la pressione di uno pneumatico puo sembrare più leggibile espressa in circa 35 psi che in 240 kPa, e la pressione di un processo in 3,5 bar invece che in 350.000 Pa. La scelta dell'unità non dipende solo dalla precisione, ma anche dalla cultura dei rapporti, dalla scala degli strumenti e dalle abitudini sul campo.",
          "Tuttavia, poiche unità diverse esprimono la stessa grandezza fisica, nei calcoli congiunti e indispensabile una conversione accurata. Confondere coefficienti approssimati con coefficienti definiti esattamente, ignorare la distinzione relativa-assoluta, e leggere male i simboli sono importanti fonti di errore.",
        ],
      },
      {
        title: "Come si misura la pressione?",
        paragraphs: [
          "Per misurare la pressione bisogna prima determinare il tipo di pressione richiesto: assoluta, relativa o differenziale. Poi si valuta l'intervallo di misurazione, il tipo di fluido, la temperatura, la compatibilita chimica, le vibrazioni e il livello di precisione richiesto. Uno stesso sensore potrebbe non essere adatto a tutte le applicazioni.",
          "Per misurazioni di bassa pressione e differenziale possono essere usati trasmettitori differenziali a diaframma; per alte pressioni di processo, elementi estensimetrici o piezoresistivi; e per applicazioni di vuoto, sensori assoluti specifici. I manometri a colonna liquida sono molto utili per insegnare il principio di base; ma nell'industria moderna sono più comuni le apparecchiature elettroniche.",
          "Per una misurazione precisa bisogna considerare la posizione delle linee di impulso, la posizione di montaggio del sensore, la regolazione dello zero e gli effetti della temperatura. Nelle linee di gas e liquido, una differenza di densita o una condensazione puo creare un carico idrostatico aggiuntivo sul sensore. Per questo i dettagli di installazione determinano il risultato tanto quanto la scelta dell'apparecchiatura.",
        ],
      },
      {
        title: "Sensori di pressione e manometri",
        paragraphs: [
          "I manometri meccanici, come gli indicatori a tubo di Bourdon, convertono la pressione in un movimento di lancetta leggibile tramite la deformazione di un elemento elastico. Robusti, semplici e senza bisogno di energia, sono usati da tempo nell'industria. Tuttavia, nelle applicazioni che richiedono precisione e registrazione dei dati, i sensori elettronici sono più flessibili.",
          "I sensori di pressione elettronici possono essere piezoresistivi, capacitivi, estensimetrici o basati su risonanza. Questi sensori convertono la variazione di pressione in un segnale elettrico, che viene trasmesso a sistemi PLC, SCADA o di acquisizione dati. Cio permette non solo una lettura istantanea, ma anche allarmi, controllo e analisi delle tendenze.",
          "I manometri differenziali forniscono la differenza di pressione tra due punti, i sensori assoluti la pressione rispetto al vuoto totale, e gli strumenti manometrici la pressione rispetto all'atmosfera. Affidarsi solo al valore numerico senza verificare il tipo di riferimento nella scheda tecnica di un'apparecchiatura puo portare a gravi errori di interpretazione.",
        ],
      },
      {
        title: "Ambiti di utilizzo della pressione in ingegneria",
        paragraphs: [
          "La pressione e una variabile di progetto fondamentale in numerosi ambiti dell'ingegneria: tubazioni, climatizzazione, idraulica, pneumatica, processi chimici, centrali energetiche, sistemi di distribuzione dell'acqua, automotive e aeronautica. Dallo spessore della parete di un serbatoio alla selezione delle valvole, dalle condizioni di uscita di un compressore alle prestazioni di un filtro, molte decisioni si basano su informazioni di pressione.",
          "Nell'ingegneria di processo si monitorano i limiti di pressione per il funzionamento sicuro di reattori, caldaie, scambiatori e separatori. Le valvole di sicurezza della pressione, i dischi di rottura e gli anelli di controllo sono, quindi, apparecchiature critiche. La pressione e usata anche per la misurazione indiretta di altre variabili di processo, come la portata e il livello.",
          "Nell'ingegneria meccanica e edile, la pressione e combinata con le superfici di contatto e le forze dei fluidi nelle analisi di sforzo. In medicina e nei dispositivi biomedici spiccano la pressione arteriosa, le pressioni di ventilazione e le applicazioni di vuoto; nell'ambiente e nella meteorologia, le misurazioni di pressione atmosferica e differenziale.",
        ],
      },
      {
        title: "Temperatura, altitudine e incertezza nella misurazione della pressione",
        paragraphs: [
          "La temperatura puo influire sia sulle proprieta del fluido misurato sia sul comportamento dell'elemento sensore. Specialmente nei gas, poiche la temperatura modifica la densita, bisogna rivalutare la relazione pressione-volume-temperatura. Per questo nelle schede tecniche dei sensori compaiono parametri come la deriva dello zero e la deriva dello span dipendenti dalla temperatura.",
          "La pressione atmosferica tende a diminuire con l'altitudine. Questa situazione modifica la relazione tra la pressione relativa e quella assoluta, e puo anche influire sul comportamento di riferimento di alcune apparecchiature sul campo. Una stessa condizione di processo puo dare risultati di pressione assoluta diversi a diverse altitudini.",
          "Ogni misurazione comporta un'incertezza. Il campione di calibrazione, la risoluzione, l'isteresi, l'effetto della temperatura, l'orientamento di montaggio, le vibrazioni e la deriva a lungo termine contribuiscono tutti all'incertezza totale. Nelle applicazioni critiche, la decisione di progettazione deve incorporare non solo il valore nominale di pressione, ma anche la classe dell'apparecchiatura e l'affidabilita della misurazione.",
        ],
      },
      {
        title: "La relazione e la differenza tra pressione e sforzo",
        paragraphs: [
          "La pressione e lo sforzo condividono la stessa struttura dimensionale ed entrambi possono essere espressi in pascal. Questa somiglianza e dovuta al fatto che entrambi rappresentano un effetto di forza per unità di superficie. Ma cio non significa che siano fisicamente la stessa grandezza.",
          "La pressione e generalmente concepita come uno sforzo normale isotropo esercitato dai fluidi; cioe, in un fluido in quiete, la pressione in uno stesso punto e identica in tutte le direzioni. Lo sforzo nella meccanica dei solidi, invece, puo avere componenti normali e di taglio, dipendere dalla direzione e avere una struttura tensoriale.",
          "Ignorare questa distinzione puo provocare interpretazioni errate, specialmente nei calcoli della parete di un serbatoio, della superficie di una guarnizione o della resistenza dei materiali. La pressione interna di un fluido crea sforzi circonferenziali e assiali sul serbatoio; ma il campo di sforzi nel materiale del serbatoio non e identico alla pressione del fluido in se.",
        ],
      },
      {
        title: "Errori frequenti nei calcoli di pressione",
        paragraphs: [
          "L'errore più frequente e confondere la pressione relativa con quella assoluta. Specialmente nelle leggi dei gas, nei calcoli di densita e nelle applicazioni di vuoto e richiesta la pressione assoluta, ma a volte si usa direttamente il valore relativo letto su un manometro. Cio crea un errore sistematico nel risultato.",
          "Un altro errore consiste nell'arrotondare i coefficienti di conversione o nell'usare un riferimento di unità errato. Nel convertire tra PSI, bar, atm, mmHg e kPa bisogna decidere quale livello di precisione sia sufficiente per i valori approssimati. Se la calibrazione dell'apparecchiatura richiede alta precisione, usare un numero insufficiente di decimali puo causare problemi.",
          "Sono frequenti anche l'ignorare gli effetti idrostatici, il trascurare l'altezza di montaggio del sensore e il non considerare l'effetto della temperatura. Specialmente nelle linee di impulso piene di liquido, nei serbatoi chiusi e nelle applicazioni di pressione differenziale, dettagli di installazione apparentemente minori possono modificare significativamente il risultato della misurazione.",
        ],
      },
    ],
    unitTable: [
      { name: "Pascal", symbol: "Pa", referenceValue: "1 Pa", system: "SI", commonUse: "Calcoli scientifici e di ingegneria" },
      { name: "Chilopascal", symbol: "kPa", referenceValue: "1000 Pa", system: "SI", commonUse: "Impianti, pneumatici e pressione di processo" },
      { name: "Bar", symbol: "bar", referenceValue: "100.000 Pa", system: "Metrico, fuori dal SI", commonUse: "Industria, compressori e sistemi di processo" },
      { name: "Millibar", symbol: "mbar", referenceValue: "100 Pa", system: "Metrico, fuori dal SI", commonUse: "Meteorologia e misurazioni atmosferiche" },
      { name: "Atmosfera standard", symbol: "atm", referenceValue: "101.325 Pa", system: "Fuori dal SI", commonUse: "Atmosfera e condizioni di riferimento" },
      { name: "PSI", symbol: "psi", referenceValue: "≈6894,757293 Pa", system: "Britannico/statunitense", commonUse: "Pneumatici, sistemi idraulici e pneumatici" },
      { name: "Atmosfera tecnica", symbol: "at", referenceValue: "98.066,5 Pa", system: "Fuori dal SI", commonUse: "Applicazioni tecniche antiche" },
      { name: "Millimetro di mercurio", symbol: "mmHg", referenceValue: "≈133,322 Pa", system: "Fuori dal SI", commonUse: "Medicina, vuoto e misurazioni di pressione" },
      { name: "Millimetro di colonna d'acqua", symbol: "mmH₂O", referenceValue: "≈9,80665 Pa", system: "Fuori dal SI", commonUse: "Misurazioni di bassa pressione e ventilazione" },
      { name: "Chilogrammo-forza per centimetro quadrato", symbol: "kgf/cm²", referenceValue: "98.066,5 Pa", system: "Metrico, fuori dal SI", commonUse: "Vecchi manometri di pompe e caldaie" },
    ],
  },
  {
    locale: "it",
    slug: "energia",
    sourceSlug: "enerji",
    category: "enerji",
    title: "Conversione delle unità di energia",
    description:
      "Confronta in un'unica categoria le conversioni di energia basate su joule, chilowattora, caloria e BTU.",
    introduction: [
      "L'energia e la grandezza fisica fondamentale che esprime la capacita di un sistema di compiere lavoro. Nel Sistema Internazionale di Unità, l'unità derivata dell'energia e il joule, ottenuto dal prodotto di una forza e uno spostamento.",
      "Nella vita quotidiana si usano il chilowattora (kWh) per le bollette elettriche, la caloria/chilocaloria in nutrizione, il BTU nei sistemi di climatizzazione, il therm nella fatturazione del gas naturale, e l'elettronvolt in fisica delle particelle subatomiche.",
    ],
    facts: [
      { label: "Grandezza fisica", value: "Energia (lavoro)" },
      { label: "Simbolo dimensionale", value: "[ML²T⁻²]" },
      { label: "Unità derivata del SI", value: "Joule" },
      { label: "Simbolo dell'unità SI", value: "J" },
      { label: "Definizione del joule", value: "1 J = spostamento di 1 metro sotto una forza di 1 newton (1 N·m)" },
    ],
    sections: [
      {
        title: "Che cos'e l'energia?",
        paragraphs: [
          "L'energia e la capacita di un oggetto o sistema di compiere lavoro. Puo esistere in molte forme -- energia cinetica (movimento), energia potenziale (posizione), energia termica, energia chimica ed energia elettrica -- e, secondo il principio di conservazione dell'energia, puo trasformarsi da una forma all'altra senza che la sua quantità totale venga creata o distrutta.",
          "L'energia e una grandezza derivata, ottenuta tramite il prodotto di una forza e uno spostamento (lavoro), e la sua dimensione SI e indicata come ML²T⁻² (massa × lunghezza al quadrato / tempo al quadrato).",
        ],
      },
      {
        title: "L'unità SI dell'energia: il joule",
        paragraphs: [
          "Il joule e l'unità derivata del SI per l'energia, simboleggiato da J; prende il nome dal fisico britannico del XIX secolo James Prescott Joule. Un joule equivale all'energia necessaria per spostare un oggetto di 1 metro sotto l'effetto di una forza di 1 newton.",
          "Poiche il joule e ancora un'unità molto piccola per esprimere molte quantità di energia quotidiane, in ingegneria e nell'uso quotidiano si preferiscono i suoi multipli: il chilojoule (mille joule) e il megajoule (un milione di joule).",
        ],
      },
      {
        title: "Il chilowattora: l'unità delle bollette elettriche",
        paragraphs: [
          "Il chilowattora (kWh) e la quantità di energia consumata da una potenza di un chilowatt usata per un'ora, e costituisce l'unità standard della fatturazione elettrica in tutto il mondo. 1 kWh equivale esattamente a 3.600.000 joule (3,6 megajoule).",
          "Per calcolare il consumo energetico di un apparecchio elettrico basta moltiplicare la sua potenza (in watt) per il suo tempo di funzionamento (in ore); ad esempio, un apparecchio da 2000 watt che funziona per 3 ore consuma 6 kWh di energia.",
        ],
      },
      {
        title: "La caloria e la chilocaloria: l'energia nella nutrizione",
        paragraphs: [
          "La caloria fu originariamente definita come la quantità di energia necessaria per elevare di 1 °C la temperatura di un grammo d'acqua, e 1 caloria equivale esattamente a 4,184 joule.",
          "Il valore di 'calorie' che compare sulle etichette degli alimenti e in realta, in senso scientifico, chilocalorie (1000 calorie) -- questa convenzione di denominazione in nutrizione genera spesso confusione; quando si dice che un alimento ha '200 calorie', in realta si parla di 200 chilocalorie (200.000 calorie).",
        ],
      },
      {
        title: "Il BTU e il therm: l'energia della climatizzazione e del gas naturale",
        paragraphs: [
          "Il BTU (British Thermal Unit) e la quantità di energia necessaria per elevare di 1 °F la temperatura di una libbra d'acqua; e un'unità di origine statunitense, ma ampiamente usata nel mondo per esprimere la capacita dei sistemi di riscaldamento e climatizzazione. 1 BTU equivale a circa 1055,06 joule.",
          "Il therm e una grande unità di energia usata nella fatturazione del gas naturale ed equivale esattamente a 100.000 BTU. In alcuni paesi, il consumo di gas naturale viene fatturato direttamente in therm invece che in metri cubi.",
        ],
      },
      {
        title: "L'elettronvolt: l'unità del mondo subatomico",
        paragraphs: [
          "L'elettronvolt (eV) esprime l'energia cinetica che un elettrone acquisisce attraversando una differenza di potenziale di un volt; e un'unità di energia estremamente piccola (1 eV ≈ 1,602176634 × 10⁻¹⁹ joule).",
          "Nella fisica delle particelle e nella fisica atomica, le energie vengono spesso espresse in elettronvolt (e nei suoi multipli keV, MeV, GeV) invece che in joule, perché a quella scala il joule da luogo a numeri estremamente piccoli e poco pratici.",
        ],
      },
      {
        title: "Il principio di conservazione dell'energia",
        paragraphs: [
          "Secondo il principio di conservazione dell'energia, noto anche come primo principio della termodinamica, l'energia totale di un sistema chiuso rimane costante; l'energia non viene creata ne distrutta, si trasforma solo da una forma all'altra.",
          "Ad esempio, nel motore di un'automobile, l'energia chimica (carburante) si trasforma prima in energia termica e poi in energia meccanica (movimento); sebbene in questo processo parte dell'energia si converta in calore non sfruttabile per attrito e scarico, la quantità totale di energia non cambia.",
        ],
      },
      {
        title: "Perché e importante la conversione tra unità di energia?",
        paragraphs: [
          "Settori diversi preferiscono tradizionalmente unità di energia diverse: l'ingegneria elettrica il chilowattora, la scienza della nutrizione la chilocaloria, il settore della climatizzazione il BTU, e il settore del gas naturale il therm. Poter convertire correttamente tra queste diverse unità e essenziale per confrontare l'efficienza energetica e calcolare i costi.",
          "Ad esempio, per confrontare l'efficienza di una pompa di calore con quella di una caldaia a gas naturale bisogna convertire il consumo energetico di entrambi i sistemi in un'unità comune (generalmente kWh o joule).",
        ],
      },
    ],
    unitTable: [
      { name: "Joule", symbol: "J", referenceValue: "1 J", system: "SI", commonUse: "Calcoli scientifici e fisici di energia" },
      { name: "Chilojoule", symbol: "kJ", referenceValue: "1000 J", system: "SI/metrico", commonUse: "Energia alimentare (in alcuni paesi)" },
      { name: "Megajoule", symbol: "MJ", referenceValue: "1.000.000 J", system: "SI/metrico", commonUse: "Carburante e grandi quantità di energia" },
      { name: "Caloria", symbol: "cal", referenceValue: "4,184 J", system: "Metrico (tradizionale)", commonUse: "Nutrizione e chimica" },
      { name: "Chilocaloria", symbol: "kcal", referenceValue: "4184 J", system: "Metrico (tradizionale)", commonUse: "Etichette degli alimenti ('calorie')" },
      { name: "Wattora", symbol: "Wh", referenceValue: "3600 J", system: "Metrico (elettricità)", commonUse: "Consumo di piccoli apparecchi" },
      { name: "Chilowattora", symbol: "kWh", referenceValue: "3.600.000 J", system: "Metrico (elettricità)", commonUse: "Fatturazione elettrica" },
      { name: "BTU", symbol: "Btu", referenceValue: "≈1055,06 J", system: "Britannico/statunitense", commonUse: "Capacita di climatizzazione e riscaldamento" },
      { name: "Therm", symbol: "th", referenceValue: "≈105.506.000 J", system: "Britannico/statunitense", commonUse: "Fatturazione del gas naturale" },
      { name: "Elettronvolt", symbol: "eV", referenceValue: "≈1,602 × 10⁻¹⁹ J", system: "Fisica atomica/delle particelle", commonUse: "Misurazione di energia atomica e nucleare" },
    ],
  },
  {
    locale: "it",
    slug: "archiviazione-dati",
    sourceSlug: "veri",
    category: "veri",
    title: "Conversione delle unità di archiviazione dati",
    description:
      "Converti tra byte, kilobyte, megabyte, gigabyte e terabyte; confronta i calcoli basati su 1000 e 1024.",
    introduction: [
      "L'unità di archiviazione dati (informazione) esprime la quantità di informazione memorizzata o elaborata in un sistema informatico. L'unità più basilare e il bit; otto bit insieme formano un byte.",
      "Parlando di archiviazione e velocità di internet compaiono sia unità decimali (base 1000) come il kilobyte, il megabyte, il gigabyte e il terabyte, sia unità binarie (base 1024) come il kibibyte, il mebibyte e il gibibyte usate dai sistemi operativi -- la differenza tra questi due sistemi e il motivo principale per cui un disco acquistato sembra avere 'meno' spazio.",
    ],
    facts: [
      { label: "Unità più piccola", value: "Bit (0 o 1)" },
      { label: "Unità di base", value: "Byte = 8 bit" },
      { label: "Sistema decimale (SI)", value: "1 KB = 1000 byte, 1 MB = 1000 KB" },
      { label: "Sistema binario (IEC)", value: "1 KiB = 1024 byte, 1 MiB = 1024 KiB" },
      { label: "Differenza tra 1000 e 1024", value: "≈7,4% di differenza tra 1 GB (decimale) e 1 GiB (binario)" },
    ],
    sections: [
      {
        title: "Che cosa sono il bit e il byte?",
        paragraphs: [
          "Il bit (cifra binaria) e l'unità di informazione più piccola che un computer possa elaborare e puo assumere solo due valori: 0 o 1. Otto bit insieme formano un byte; un byte puo rappresentare 256 (2⁸) valori distinti -- sufficiente, ad esempio, per codificare un carattere di testo.",
          "Il bit e generalmente abbreviato con una 'b' minuscola e il byte con una 'B' maiuscola; questa distinzione puo generare confusione, specialmente tra le velocità di internet (Mbps = megabit al secondo) e la dimensione dei file (MB = megabyte) -- una connessione internet di 100 Mbps corrisponde teoricamente a una velocità di download di circa 12,5 MB al secondo (100 ÷ 8).",
        ],
      },
      {
        title: "Perché esistono due sistemi di unità diversi?",
        paragraphs: [
          "Poiche i computer funzionano in sistema binario, l'indirizzamento della memoria e naturalmente legato a potenze di 2 (come 1024, 1.048.576). Per questo il mondo del software ha storicamente inteso 'kilobyte' come 1024 byte.",
          "I produttori di dischi preferiscono, per ragioni di marketing e facilita di calcolo, il prefisso decimale del SI (base 1000) -- un disco pubblicizzato come '1 TB' da un produttore contiene in realta esattamente 1.000.000.000.000 byte, ma poiche il sistema operativo calcola in base 1024, mostra sullo schermo un numero minore, come '931 GB'.",
        ],
      },
      {
        title: "Lo standard IEC: KiB, MiB, GiB",
        paragraphs: [
          "Per risolvere questa confusione, nel 1998 la Commissione Elettrotecnica Internazionale (IEC) ha standardizzato nomi distinti (kibibyte, mebibyte, gibibyte, tebibyte) e simboli (KiB, MiB, GiB, TiB) per le unità in base binaria.",
          "Secondo questo standard, i prefissi tradizionali come KB/MB/GB dovrebbero essere usati solo in senso decimale (base 1000), e per i valori in base 1024 sarebbero preferiti prefissi 'binari' come KiB/MiB/GiB. Tuttavia, nell'uso quotidiano e in molti programmi questa distinzione non e ancora applicata in modo coerente.",
        ],
      },
      {
        title: "Perché cresce la differenza tra 1000 e 1024?",
        paragraphs: [
          "Mentre a livello di kilobyte (1000 contro 1024) la differenza e solo del 2,4%, questa differenza aumenta a ogni unità superiore: a livello di megabyte e di ≈4,9%, a livello di gigabyte di ≈7,4%, e a livello di terabyte arriva al ≈10%.",
          "Per questo, nelle grandi capacita di archiviazione (come un disco da 1 TB), la differenza tra il calcolo decimale e quello binario diventa abbastanza grande da dare all'utente l'impressione visibile di avere 'meno spazio' (una differenza di circa 90 GB).",
        ],
      },
      {
        title: "Unità di archiviazione basate sul bit: kilobit, megabit, gigabit",
        paragraphs: [
          "I fornitori di servizi internet esprimono solitamente la velocità di connessione in unità basate sul bit (kilobit al secondo, megabit al secondo, gigabit al secondo); e una tradizione storica dell'ingegneria delle reti.",
          "Poiche gli utenti si aspettano solitamente la velocità di download di un file in byte (MB al secondo), non sapere che una connessione di '100 Mbps' ha una velocità di download reale di circa 12,5 MB al secondo puo dare la falsa impressione che la connessione sia 'lenta'.",
        ],
      },
      {
        title: "Le dimensioni dei dati nella vita quotidiana",
        paragraphs: [
          "Un documento di testo (una pagina) occupa solitamente alcuni kilobyte, una foto compressa (JPEG) alcuni megabyte, e un file musicale compresso (MP3) in media da 3 a 5 megabyte.",
          "Un film in definizione standard (HD) puo occupare tra 1 e 4 gigabyte, e un film in risoluzione 4K tra 15 e 25 gigabyte circa; queste differenze variano in base alla risoluzione e al metodo di compressione.",
        ],
      },
      {
        title: "La storia dell'unità di archiviazione dati",
        paragraphs: [
          "Il primo disco rigido presentato da IBM nel 1956 (il RAMAC 305) aveva una capacita di circa 3,75 megabyte e occupava la dimensione di un'intera stanza. Oggi, una scheda microSD puo contenere milioni di volte quella capacita nelle dimensioni di un palmo di mano.",
          "Questo enorme aumento di capacita e strettamente legato non solo ai progressi della tecnologia di archiviazione (come il passaggio dai dischi magnetici alla memoria flash), ma anche alla costante riduzione del costo per unità.",
        ],
      },
    ],
    unitTable: [
      { name: "Bit", symbol: "bit", referenceValue: "0,125 byte", system: "Binario", commonUse: "Velocità di rete (bps, Mbps)" },
      { name: "Byte", symbol: "B", referenceValue: "1 byte (8 bit)", system: "Unità di base", commonUse: "Unità di base della dimensione dei file" },
      { name: "Kilobyte", symbol: "KB", referenceValue: "1000 byte", system: "Decimale (SI)", commonUse: "Documenti di testo" },
      { name: "Kibibyte", symbol: "KiB", referenceValue: "1024 byte", system: "Binario (IEC)", commonUse: "Visualizzazione della memoria del sistema operativo" },
      { name: "Megabyte", symbol: "MB", referenceValue: "1.000.000 byte", system: "Decimale (SI)", commonUse: "File di foto e musica" },
      { name: "Mebibyte", symbol: "MiB", referenceValue: "1.048.576 byte", system: "Binario (IEC)", commonUse: "Capacita di memoria RAM" },
      { name: "Gigabyte", symbol: "GB", referenceValue: "1.000.000.000 byte", system: "Decimale (SI)", commonUse: "Capacita del disco (etichetta del produttore)" },
      { name: "Gibibyte", symbol: "GiB", referenceValue: "1.073.741.824 byte", system: "Binario (IEC)", commonUse: "Visualizzazione del disco del sistema operativo" },
      { name: "Terabyte", symbol: "TB", referenceValue: "1.000.000.000.000 byte", system: "Decimale (SI)", commonUse: "Archiviazione di grande volume" },
      { name: "Petabyte", symbol: "PB", referenceValue: "1.000.000.000.000.000 byte", system: "Decimale (SI)", commonUse: "Data center e archiviazione cloud" },
    ],
  },
  {
    locale: "it",
    slug: "elettricita",
    sourceSlug: "elektrik",
    category: "elektrik",
    title: "Conversione delle unità elettriche",
    description:
      "Converti le grandezze elettriche di base tra volt, chilovolt, ampere e milliampere; consulta valori di esempio.",
    introduction: [
      "L'elettricità e un campo ampio composto da grandezze fisiche correlate ma distinte, come la tensione (differenza di potenziale) e la corrente (flusso di carica). Questa categoria riunisce le due grandezze di base più frequenti nel lavoro elettrico quotidiano: il volt (tensione) e l'ampere (corrente).",
      "Tensione e corrente non sono la stessa grandezza fisica e non possono essere convertite direttamente l'una nell'altra; la loro relazione e stabilita dalla legge di Ohm (V = I × R), in funzione della resistenza del circuito. Le conversioni di questa pagina trattano ogni grandezza separatamente (volt-chilovolt, ampere-milliampere, ecc.).",
    ],
    facts: [
      { label: "Nome dell'unità di tensione", value: "Volt (in onore di Alessandro Volta)" },
      { label: "Nome dell'unità di corrente", value: "Ampere (in onore di Andre-Marie Ampere)" },
      { label: "Unità di base del SI (corrente)", value: "Ampere (A) -- una delle 7 unità di base del SI" },
      { label: "Relazione tensione-corrente-resistenza", value: "Legge di Ohm: V = I × R" },
      { label: "Tensione di rete in Italia", value: "230 V (monofase), 400 V (trifase), 50 Hz" },
    ],
    sections: [
      {
        title: "Che cos'e la tensione (volt)?",
        paragraphs: [
          "La tensione (voltaggio) esprime la differenza di potenziale elettrico tra due punti di un circuito elettrico e puo essere considerata la 'forza motrice' che fa fluire gli elettroni da un punto all'altro. La sua unità SI e il volt (V).",
          "L'unità volt prende il nome dal fisico italiano Alessandro Volta, inventore della pila elettrica. Valori come '1,5 V' o '9 V' indicati su una pila esprimono la differenza di potenziale che quella pila puo fornire.",
        ],
      },
      {
        title: "Che cos'e la corrente (ampere)?",
        paragraphs: [
          "La corrente elettrica esprime la quantità di carica elettrica che attraversa un conduttore per unità di tempo, e la sua unità SI e l'ampere (A). Un ampere corrisponde al passaggio di circa 6,242 × 10¹⁸ elettroni attraverso un punto ogni secondo.",
          "L'unità ampere prende il nome dal fisico francese Andre-Marie Ampere, uno dei fondatori dell'elettromagnetismo. L'ampere era, prima della revisione del SI del 2019, una delle unità di base del SI; oggi e ancora considerata una grandezza fondamentale, ma ora e definita a partire dalla costante di carica elementare (e).",
        ],
      },
      {
        title: "Perché tensione e corrente non possono essere convertite tra loro?",
        paragraphs: [
          "Tensione (V) e corrente (A) sono grandezze fisiche diverse -- una esprime una differenza di potenziale, l'altra la velocità di un flusso di carica. Per questo la domanda 'quanti ampere sono X volt' non ha risposta da sola senza conoscere la resistenza (o la potenza) del circuito.",
          "La relazione tra le due e stabilita dalla legge di Ohm: V = I × R (Tensione = Corrente × Resistenza). Ad esempio, una tensione di 12 volt che attraversa una resistenza di 4 ohm produce una corrente di 3 ampere; ma quegli stessi 12 volt applicati a una resistenza diversa producono un valore di corrente completamente diverso.",
        ],
      },
      {
        title: "La relazione tra potenza, tensione e corrente",
        paragraphs: [
          "La potenza elettrica (watt) e uguale al prodotto della tensione per la corrente: P = V × I. Questa formula mostra che un apparecchio della stessa potenza consumera meno corrente con alta tensione e più corrente con bassa tensione.",
          "Questa relazione spiega perché le reti di distribuzione elettrica funzionano ad alta tensione: trasportare la stessa potenza con una corrente minore riduce notevolmente le perdite di energia dovute alla resistenza delle linee di trasmissione (riscaldamento per effetto Joule).",
        ],
      },
      {
        title: "La tensione di rete in Italia e nel mondo",
        paragraphs: [
          "In Italia, la tensione di rete standard degli impianti residenziali e di 230 volt per il monofase, e di 400 volt per i sistemi trifase usati negli impianti industriali e commerciali (con una frequenza di 50 Hz).",
          "Nel mondo, la tensione di rete varia a seconda del paese; Stati Uniti e Canada usano 120 volt, mentre la maggior parte dei paesi europei, tra cui l'Italia, preferisce 230 volt. Questa differenza e il motivo principale per cui gli apparecchi elettrici portati dall'estero non possono essere usati direttamente senza un convertitore.",
        ],
      },
      {
        title: "Corrente continua (CC) e corrente alternata (CA)",
        paragraphs: [
          "Nella corrente continua (CC), gli elettroni fluiscono in modo costante in un'unica direzione -- le pile e i pannelli solari producono CC. Nella corrente alternata (CA), la direzione della corrente si inverte con una frequenza determinata ogni secondo (50 Hz in Italia, ossia 50 volte al secondo) -- l'elettricità di rete e CA.",
          "Il motivo principale per cui la CA e preferita nella distribuzione in rete e che permette di elevare o ridurre facilmente la tensione tramite trasformatori; questo rende possibile trasportare l'elettricità su lunghe distanze con basse perdite.",
        ],
      },
      {
        title: "L'effetto della corrente elettrica sul corpo umano",
        paragraphs: [
          "L'intensita della corrente che attraversa il corpo umano determina l'effetto percepito: circa 1 milliampere e appena percepibile, tra 10 e 20 milliampere puo provocare contrazione muscolare (incapacita di lasciare la presa), e oltre 100 milliampere puo causare aritmia cardiaca (fibrillazione) e morte.",
          "Per questo, nella sicurezza elettrica, non conta solo la tensione, ma anche l'intensita di corrente che si puo formare nel circuito -- anche in un ambiente a bassa tensione ma a bassa resistenza (ad esempio, umido), si puo formare una corrente pericolosa.",
        ],
      },
    ],
    unitTable: [
      { name: "Millivolt", symbol: "mV", referenceValue: "0,001 V", system: "SI/metrico", commonUse: "Sensori e segnali bioelettrici" },
      { name: "Volt", symbol: "V", referenceValue: "1 V", system: "SI", commonUse: "Pile, tensione di rete e di circuito" },
      { name: "Chilovolt", symbol: "kV", referenceValue: "1000 V", system: "SI/metrico", commonUse: "Linee di trasmissione ad alta tensione" },
      { name: "Milliampere", symbol: "mA", referenceValue: "0,001 A", system: "SI/metrico", commonUse: "Correnti di circuiti elettronici" },
      { name: "Ampere", symbol: "A", referenceValue: "1 A", system: "SI", commonUse: "Impianti domestici e corrente di apparecchi" },
      { name: "Chiloampere", symbol: "kA", referenceValue: "1000 A", system: "SI/metrico", commonUse: "Correnti di cortocircuito e industriali" },
    ],
  },
  {
    locale: "it",
    slug: "caratura-oro",
    sourceSlug: "altin-ayar",
    category: "altin_ayar",
    title: "Conversione della caratura dell'oro",
    description:
      "Converti tra oro a 24, 22, 18 e 14 carati in base alla quantità di oro puro; scopri la purezza e gli usi di ogni caratura.",
    introduction: [
      "Come l'argento, l'oro non viene quasi mai usato puro nella fabbricazione di gioielli, poiche e un metallo molto tenero e si graffia facilmente -- per questo viene legato ad altri metalli come l'argento o il rame. Il carato e la misura che indica la proporzione di oro puro in quella lega.",
      "La scala funziona su base 24: 24 carati significa oro completamente puro (100%), 18 carati significa che 18/24 della lega (circa il 75%) e oro puro. La conversione qui non consiste nell'esprimere la stessa grandezza fisica in un'unità diversa, ma nel trovare l'equivalente in grammi della stessa lega con un grado di purezza diverso.",
    ],
    facts: [
      { label: "Sistema di misura", value: "Standard di purezza della gioielleria (carato)" },
      { label: "Riferimento di base", value: "24 carati = 100% di oro puro" },
      { label: "Carato più comune in Turchia", value: "22 carati (bracciale, gioielleria tradizionale)" },
      { label: "Uso quotidiano internazionale", value: "18 carati (anello, collana)" },
      { label: "Logica di calcolo", value: "Grammi × (carato di origine / 24) ÷ (carato di destinazione / 24)" },
    ],
    sections: [
      {
        title: "Che cosa misura esattamente il carato?",
        paragraphs: [
          "Il carato indica quale parte del peso di un pezzo d'oro sia realmente oro. 24 carati e oro puro; 18 e 14 carati sono forme d'oro mescolate con argento o rame, rispettivamente, e quindi più dure e meno pure.",
          "Per questo si puo dire che un bracciale a 22 carati abbia un contenuto di oro puro leggermente 'inferiore' rispetto a 24 carati, ma sia più resistente -- per questo i gioiellieri preferiscono solitamente 22 carati per i bracciali e 18 carati per anelli e collane.",
        ],
      },
      {
        title: "Come si calcola il contenuto di oro puro?",
        paragraphs: [
          "Per scoprire la quantità di oro puro contenuta in un bracciale da 10 grammi a 22 carati: 10 × (22 / 24) = 9,17 grammi di oro puro (equivalente a 24 carati). I restanti 0,83 grammi sono altri metalli aggiunti per dare resistenza.",
          "Al contrario, se un gioielliere fondesse quei 9,17 grammi di oro puro per rifarli in 18 carati: 9,17 ÷ (18 / 24) = 12,22 grammi di lega totale si otterrebbero -- perché essendo minore la proporzione di oro puro a 18 carati, la stessa quantità di oro puro si distribuisce in un peso totale maggiore.",
        ],
      },
      {
        title: "A cosa serve ogni carato?",
        paragraphs: [
          "A causa della sua morbidezza, l'oro a 24 carati non viene praticamente usato nella gioielleria quotidiana; e preferito per lingotti e prodotti di investimento. Quello a 22 carati e lo standard di bracciali e gioielleria tradizionale in Turchia e Medio Oriente.",
          "Quello a 18 carati, per la sua alta resistenza, e comune in tutto il mondo per gioielli di uso quotidiano come anelli e collane con diamanti. Quello a 14 carati, più economico e ancora più resistente, e frequente specialmente nei mercati di Stati Uniti ed Europa.",
        ],
      },
    ],
    unitTable: [
      { name: "Oro a 24 carati", symbol: "24K", referenceValue: "100% di oro puro", system: "Standard di gioielleria", commonUse: "Lingotti, oro da investimento" },
      { name: "Oro a 22 carati", symbol: "22K", referenceValue: "91,6% di oro puro (22/24)", system: "Standard di gioielleria", commonUse: "Bracciale, gioielleria tradizionale" },
      { name: "Oro a 18 carati", symbol: "18K", referenceValue: "75% di oro puro (18/24)", system: "Standard di gioielleria", commonUse: "Anello, collana, gioielleria quotidiana" },
      { name: "Oro a 14 carati", symbol: "14K", referenceValue: "58,3% di oro puro (14/24)", system: "Standard di gioielleria", commonUse: "Gioielleria economica, mercato USA/Europa" },
    ],
  },
  {
    locale: "it",
    slug: "titolo-argento",
    sourceSlug: "gumus-ayar",
    category: "gumus_ayar",
    title: "Conversione del titolo dell'argento",
    description:
      "Converti in grammi di argento puro i titoli 999, 925 (sterling), 900 e 800; scopri il sistema dei millesimi e i suoi usi in gioielleria.",
    introduction: [
      "Come l'oro, anche l'argento non viene quasi mai usato puro per fabbricare gioielli o oggetti, poiche e un metallo tenero che viene legato ad altri metalli come il rame. Il millesimo e la misura che indica la proporzione di argento puro in quella lega.",
      "A differenza della caratura dell'oro, espressa su base 24, la purezza dell'argento e espressa su base 1000 (millesimo): 999 corrisponde ad argento quasi puro, mentre 925 e il titolo più diffuso al mondo, noto come 'argento sterling'.",
    ],
    facts: [
      { label: "Sistema di misura", value: "Sistema dei millesimi" },
      { label: "Riferimento principale", value: "999 = 99,9% di argento puro" },
      { label: "Titolo di gioielleria più diffuso", value: "925 (argento sterling)" },
      { label: "Argento da investimento/lingotto", value: "Titolo 999 (argento fino)" },
      { label: "Regola di calcolo", value: "Grammi × (millesimo di origine / 1000) ÷ (millesimo di destinazione / 1000)" },
    ],
    sections: [
      {
        title: "Che cosa misura realmente il titolo dell'argento (millesimo)?",
        paragraphs: [
          "A differenza dell'oro, la purezza dell'argento non e espressa su 24 unità, ma in millesimi (base 1000). Un titolo di 999 significa 999 parti per mille (ossia il 99,9%) di argento puro nella lega; il millesimo rimanente corrisponde solitamente a piccole tracce di altri elementi.",
          "Il titolo 925 (argento sterling) significa che la lega contiene il 92,5% di argento puro, essendo il resto (7,5%) generalmente rame. Questa piccola quantità di rame conferisce solidita all'argento puro, che per natura e molto tenero e facile da deformare.",
        ],
      },
      {
        title: "Perché l'argento sterling (925) e lo standard mondiale?",
        paragraphs: [
          "La storia dello standard dell'argento sterling (925) risale all'Inghilterra del XII secolo e, con il tempo, e diventata lo standard più ampiamente accettato al mondo per gioielleria, posateria e oggetti d'argento.",
          "L'argento puro (999) e troppo tenero per oggetti di uso quotidiano e si graffia facilmente; aggiungere il 7,5% di rame conferisce all'argento la durezza sufficiente, conservando in gran parte la sua brillantezza e il colore caratteristici.",
        ],
      },
      {
        title: "Differenze tra i titoli 999, 900 e 800",
        paragraphs: [
          "Il titolo 999 (argento fino/puro) e preferito per lingotti e prodotti di investimento perché il grado di purezza e il criterio più importante per gli investitori; ma la sua morbidezza fa si che venga raramente usato nella gioielleria quotidiana.",
          "Il titolo 900 (argento da moneta) e stato storicamente usato nelle monete d'argento di molti paesi. Il titolo 800, comune specialmente in Europa (Germania, Austria), e uno standard di gioielleria meno puro dell'argento sterling, ma comunque resistente.",
        ],
      },
      {
        title: "Come si calcola la quantità di argento puro?",
        paragraphs: [
          "Per determinare la quantità di argento puro di un anello d'argento da 10 grammi con titolo 925: 10 × (925 / 1000) = 9,25 grammi di argento puro. I restanti 0,75 grammi sono rame o altri metalli aggiunti per dare solidita.",
          "Si applica la stessa logica per convertire tra titoli diversi: ad esempio, se e nota la quantità di argento puro di una lega con titolo 925, il suo equivalente in titolo 999 si ottiene dividendo quella quantità per 999/1000.",
        ],
      },
      {
        title: "La relazione tra l'annerimento dell'argento e la sua purezza",
        paragraphs: [
          "L'annerimento (ossidazione) di un gioiello d'argento nel tempo non e dovuto all'argento in se, ma alla reazione del rame della lega con i composti di zolfo nell'aria. Per questo, un argento di maggiore purezza (come quello a titolo 999) tende ad annerirsi meno.",
          "Alcuni produttori hanno sviluppato leghe di argento sterling 'resistenti all'annerimento' per migliorare questa proprieta, usando elementi diversi, come il germanio, al posto del rame.",
        ],
      },
    ],
    unitTable: [
      { name: "Argento 999", symbol: "999", referenceValue: "99,9% di argento puro", system: "Standard di gioielleria", commonUse: "Lingotti, argento da investimento" },
      { name: "Argento 925", symbol: "925", referenceValue: "92,5% di argento puro (sterling)", system: "Standard di gioielleria", commonUse: "Gioielleria e posateria (standard mondiale)" },
      { name: "Argento 900", symbol: "900", referenceValue: "90% di argento puro", system: "Standard di gioielleria", commonUse: "Monete d'argento storiche" },
      { name: "Argento 800", symbol: "800", referenceValue: "80% di argento puro", system: "Standard di gioielleria (Europa)", commonUse: "Standard di gioielleria europeo" },
    ],
  },
];

export function findItalianCategoryPage(slug: string) {
  return italianCategoryPages.find((page) => page.slug === slug);
}

export function findItalianCategoryPageByTurkishSlug(sourceSlug: string) {
  return italianCategoryPages.find((page) => page.sourceSlug === sourceSlug);
}
