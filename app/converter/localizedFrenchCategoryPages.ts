// Pages de categorie francaises -- integrees au nouveau systeme i18n
// Fichier independant et nouveau (ne touche pas aux fichiers tr/en/de/ar/uz/bn existants).
//
// Portee volontairement limitee aux 17 elements qui forment l'identite
// du site (13 categories fondamentales + 4 outils universels sur la
// page d'accueil) -- pas de calculatrices scientifiques ni du quotidien.
// Contenu traduit avec la meme profondeur que les articles TR sources
// (app/converter/categoryArticles.ts et app/converter/articles/*/Article.ts).

export type LocalizedFrenchCategoryFact = {
  label: string;
  value: string;
};

export type LocalizedFrenchCategorySection = {
  title: string;
  paragraphs: string[];
};

export type LocalizedFrenchCategoryUnitRow = {
  name: string;
  symbol: string;
  referenceValue: string;
  system: string;
  commonUse: string;
};

export type LocalizedFrenchCategoryPage = {
  locale: "fr";
  slug: string;
  sourceSlug: string;
  category: string;
  title: string;
  description: string;
  introduction: string[];
  facts: LocalizedFrenchCategoryFact[];
  sections: LocalizedFrenchCategorySection[];
  unitTable: LocalizedFrenchCategoryUnitRow[];
};

export const frenchCategoryPages: LocalizedFrenchCategoryPage[] = [
  {
    locale: "fr",
    slug: "longueur",
    sourceSlug: "uzunluk",
    category: "uzunluk",
    title: "Conversion des unites de longueur",
    description:
      "Convertissez gratuitement et rapidement entre metres, kilometres, centimetres, miles et pieds ; consultez les formules et les tableaux.",
    introduction: [
      "La longueur est l'une des grandeurs physiques fondamentales utilisees pour decrire la hauteur, la largeur, l'epaisseur d'un objet ou la distance entre deux points. Selon la direction mesuree, un meme objet peut avoir plusieurs valeurs de longueur.",
      "En physique, la longueur est generalement representee par le symbole dimensionnel L. Elle intervient dans la definition de nombreuses grandeurs derivees comme la surface, le volume, la vitesse, l'acceleration, la pression et la densite.",
      "Dans le systeme international d'unites (SI), l'unite de base de la longueur est le metre, note m. Selon l'ampleur de la distance mesuree, on utilise le nanometre, le micrometre, le millimetre, le centimetre, le metre ou le kilometre. Le pouce, le pied, le yard et le mile restent utilises hors du systeme metrique, notamment aux Etats-Unis et au Royaume-Uni.",
    ],
    facts: [
      { label: "Unite de base SI", value: "Metre" },
      { label: "Symbole de l'unite SI", value: "m" },
      { label: "Grandeur physique", value: "Longueur" },
      { label: "Symbole dimensionnel", value: "L" },
      { label: "Definition actuelle du metre", value: "Distance parcourue par la lumiere dans le vide en 1/299 792 458 seconde" },
    ],
    sections: [
      {
        title: "Qu'est-ce que la longueur ?",
        paragraphs: [
          "La longueur sert a decrire la hauteur, la largeur, la profondeur d'un objet ou la distance entre deux points ; c'est l'une des grandeurs physiques fondamentales. Selon la direction mesuree, un meme objet peut presenter plusieurs valeurs de longueur.",
          "En physique, la longueur est generalement notee par le symbole dimensionnel L. De nombreuses grandeurs derivees, telles que la surface, le volume, la vitesse, l'acceleration, la pression et la densite, sont definies a partir de la dimension de longueur.",
        ],
      },
      {
        title: "L'unite SI de la longueur",
        paragraphs: [
          "Dans le systeme international d'unites, l'unite de base de la longueur est le metre, symbolise par m. Le metre sert de reference fondamentale pour definir toutes les autres unites de longueur.",
          "Les unites metriques comme le kilometre, le centimetre, le millimetre, le micrometre et le nanometre sont reliees au metre par des multiples et sous-multiples decimaux. Cette structure permet d'effectuer les conversions entre unites metriques a l'aide de puissances de dix.",
        ],
      },
      {
        title: "La definition scientifique du metre",
        paragraphs: [
          "Le metre a autrefois ete defini a partir des dimensions de la Terre puis a l'aide d'etalons physiques. Avec le progres des technologies de mesure, une definition plus stable et reproductible partout dans le monde est devenue necessaire.",
          "Aujourd'hui, un metre est defini comme la longueur du trajet parcouru par la lumiere dans le vide pendant un intervalle de temps de 1/299 792 458 de seconde. Cette definition repose sur le fait que la vitesse de la lumiere dans le vide est fixee a exactement 299 792 458 metres par seconde.",
        ],
      },
      {
        title: "Les unites metriques de longueur",
        paragraphs: [
          "Dans le systeme metrique, les unites sont reliees au metre par des puissances positives ou negatives de 10. Un kilometre equivaut a 1000 metres, un centimetre a 0,01 metre et un millimetre a 0,001 metre.",
          "Pour les tres petites longueurs, on utilise le micrometre, le nanometre et le picometre. Les cellules se mesurent le plus souvent en micrometres, les longueurs d'onde de la lumiere en nanometres, et certaines distances a l'echelle atomique en picometres.",
        ],
      },
      {
        title: "Les unites de longueur hors systeme metrique",
        paragraphs: [
          "Le pouce, le pied, le yard et le mile terrestre sont des unites de longueur courantes en dehors du systeme metrique. Elles restent utilisees notamment dans le systeme de mesure americain et dans certaines applications liees a la tradition britannique.",
          "Un pouce equivaut exactement a 2,54 centimetres, un pied a 12 pouces, et un yard a 3 pieds. Un mile terrestre est defini exactement comme 1609,344 metres.",
        ],
      },
      {
        title: "La longueur en navigation maritime et aerienne",
        paragraphs: [
          "En navigation maritime et aerienne, les distances sont le plus souvent exprimees en milles marins. Un mille marin equivaut exactement a 1852 metres.",
          "Le mille marin a ete developpe a partir d'une approche de mesure historique liee aux coordonnees geographiques de la Terre. L'unite de vitesse appelee noeud designe egalement un mille marin par heure.",
        ],
      },
      {
        title: "Comment mesure-t-on la longueur ?",
        paragraphs: [
          "Pour les mesures quotidiennes, on utilise des outils comme la regle, le metre-ruban, le pied a coulisse et le micrometre. La precision de l'instrument choisi depend de la taille de l'objet a mesurer et du niveau de precision requis.",
          "Dans l'ingenierie et la recherche scientifique, on peut utiliser des telemetres laser, des machines de mesure a coordonnees, des interferometres et divers systemes de mesure optique.",
        ],
      },
      {
        title: "Precision de mesure et incertitude",
        paragraphs: [
          "Aucune mesure physique n'est absolument parfaite. Le resultat d'une mesure comporte toujours une certaine incertitude liee a la resolution de l'appareil utilise, a son etalonnage, aux conditions environnementales et a la methode appliquee.",
          "C'est pourquoi, dans les resultats scientifiques, il convient d'indiquer non seulement la valeur mesuree mais aussi l'incertitude de mesure et l'unite utilisee. Dans les travaux d'ingenierie de precision, meme une variation de temperature peut affecter la longueur d'un materiau.",
        ],
      },
      {
        title: "Comment convertir les unites de longueur ?",
        paragraphs: [
          "Pour les conversions au sein d'un meme systeme de mesure, on utilise le rapport entre les unites. Par exemple, pour convertir des metres en kilometres, on divise la valeur par 1000 ; pour convertir des kilometres en metres, on multiplie la valeur par 1000.",
          "Pour les conversions entre le systeme metrique et les unites britanniques ou americaines, il faut utiliser les coefficients de conversion exacts definis. Par exemple, pour convertir des pouces en centimetres, on multiplie la valeur par 2,54.",
        ],
      },
    ],
    unitTable: [
      { name: "Nanometre", symbol: "nm", referenceValue: "0,000000001 m", system: "SI/metrique", commonUse: "Longueur d'onde de la lumiere et nanotechnologie" },
      { name: "Micrometre", symbol: "µm", referenceValue: "0,000001 m", system: "SI/metrique", commonUse: "Cellules, particules et fabrication de precision" },
      { name: "Millimetre", symbol: "mm", referenceValue: "0,001 m", system: "SI/metrique", commonUse: "Dessin technique et petites mesures" },
      { name: "Centimetre", symbol: "cm", referenceValue: "0,01 m", system: "SI/metrique", commonUse: "Mesure des objets du quotidien" },
      { name: "Decimetre", symbol: "dm", referenceValue: "0,1 m", system: "SI/metrique", commonUse: "Enseignement et certaines relations de volume" },
      { name: "Metre", symbol: "m", referenceValue: "1 m", system: "SI", commonUse: "Mesures de longueur de base" },
      { name: "Kilometre", symbol: "km", referenceValue: "1000 m", system: "SI/metrique", commonUse: "Distances routieres et geographiques" },
      { name: "Pouce", symbol: "in", referenceValue: "0,0254 m", system: "Britannique/americain", commonUse: "Ecrans, tuyaux et mesures techniques" },
      { name: "Pied", symbol: "ft", referenceValue: "0,3048 m", system: "Britannique/americain", commonUse: "Hauteur, construction et aviation" },
      { name: "Yard", symbol: "yd", referenceValue: "0,9144 m", system: "Britannique/americain", commonUse: "Terrains de sport et mesures de distance" },
      { name: "Mile", symbol: "mi", referenceValue: "1609,344 m", system: "Britannique/americain", commonUse: "Distances routieres" },
      { name: "Mille marin", symbol: "nmi", referenceValue: "1852 m", system: "Navigation maritime", commonUse: "Navigation maritime et aerienne" },
    ],
  },
  {
    locale: "fr",
    slug: "surface",
    sourceSlug: "alan",
    category: "alan",
    title: "Conversion des unites de surface",
    description:
      "Convertissez les surfaces entre metres carres, hectares et pieds carres ; pour les calculs de terrain, de batiment et de construction.",
    introduction: [
      "La surface est une grandeur physique derivee qui exprime l'etendue d'une region bidimensionnelle. Comme elle resulte du produit d'une longueur par une longueur de meme unite, la dimension de la surface est toujours « longueur au carre » (L²).",
      "Dans le systeme international d'unites, l'unite derivee de la surface est le metre carre (m²). En agriculture et pour les terrains, le dönüm et le dekar (Turquie) et l'hectare sont largement utilises ; dans le systeme britannique/americain, le pied carre et l'acre ; en Asie du Sud, des unites locales comme le bigha, le katha et le decimal sont egalement courantes.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Surface" },
      { label: "Symbole dimensionnel", value: "[L²]" },
      { label: "Unite derivee SI", value: "Metre carre" },
      { label: "Symbole de l'unite SI", value: "m²" },
      { label: "Formule de base (rectangle)", value: "Surface = Longueur × Largeur" },
    ],
    sections: [
      {
        title: "Qu'est-ce que la surface ?",
        paragraphs: [
          "La surface exprime l'etendue d'une surface ou d'une region plane. La superficie d'un terrain, le sol d'une piece ou l'etendue d'une feuille de papier se mesurent en surface.",
          "La surface est une grandeur derivee : elle s'obtient en multipliant une unite de longueur de base par elle-meme. C'est pourquoi la dimension SI de la surface est L² (longueur au carre), et la surface est toujours une grandeur scalaire positive.",
        ],
      },
      {
        title: "L'unite SI de la surface : le metre carre",
        paragraphs: [
          "Dans le systeme international d'unites, l'unite derivee de la surface est le metre carre (m²), qui represente la surface occupee par un carre dont le cote mesure exactement 1 metre.",
          "Le metre carre n'est pas une unite de base independante mais une unite derivee, obtenue en elevant au carre l'unite de longueur (le metre). Toutes les autres unites metriques de surface (centimetre carre, kilometre carre, etc.) se rattachent au metre carre par des puissances decimales.",
        ],
      },
      {
        title: "Pourquoi les unites de surface se convertissent-elles selon un rapport au carre ?",
        paragraphs: [
          "Lors de la conversion entre unites de longueur, le rapport utilise doit etre eleve au carre pour les unites de surface. Par exemple, 1 kilometre equivaut a 1000 metres, mais 1 kilometre carre n'equivaut pas a 1000 metres carres, mais a 1000² soit 1 000 000 metres carres.",
          "Cela vient du fait que, pour une surface, les deux dimensions (longueur et largeur) augmentent ou diminuent dans la meme proportion. Negliger cette relation au carre est l'erreur de calcul la plus frequente dans les conversions de surface -- croire par exemple que « 1 km² = 1000 m² » est une meprise courante.",
        ],
      },
      {
        title: "Les unites metriques de surface",
        paragraphs: [
          "Dans le systeme metrique, on utilise le millimetre carre et le centimetre carre pour les petites surfaces, le metre carre pour les mesures quotidiennes, et le kilometre carre pour les grandes surfaces. Un centimetre carre equivaut a 0,0001 metre carre, et un kilometre carre a 1 000 000 metres carres.",
          "Pour les mesures de terrain, on utilise l'are (100 m²) et son multiple 100 fois plus grand, l'hectare (10 000 m²). L'hectare est l'unite metrique de terrain la plus largement utilisee dans le monde pour exprimer la superficie des terres agricoles.",
        ],
      },
      {
        title: "Le dönüm et le dekar en Turquie",
        paragraphs: [
          "En Turquie, les unites les plus utilisees pour mesurer les terres agricoles sont le dönüm et le dekar ; les deux equivalent aujourd'hui a 1000 metres carres et sont interchangeables. Le dekar est le nom officiel utilise dans la legislation sur les poids et mesures, tandis que le dönüm est l'equivalent traditionnel utilise dans le langage courant.",
          "A l'epoque ottomane, la taille du dönüm variait selon la region, entre 900 et 1600 m². Avec la loi sur les poids et mesures de 1931, le dönüm a ete aligne sur le dekar et standardise a exactement 1000 m².",
        ],
      },
      {
        title: "Les unites de surface du systeme britannique/americain",
        paragraphs: [
          "Le pied carre (ft²) et le pouce carre (in²) sont utilises pour les petites surfaces, tandis que l'acre sert pour les grandes parcelles de terrain dans le systeme de mesure britannique/americain. Un acre equivaut exactement a 4046,8564224 metres carres.",
          "L'origine historique de l'acre remonte a la surface de terrain qu'une paire de boeufs pouvait labourer en une journee. Aujourd'hui encore, cette unite est largement utilisee dans les annonces immobilieres aux Etats-Unis, au Royaume-Uni et dans certains pays du Commonwealth.",
        ],
      },
      {
        title: "Les unites de terrain d'Asie du Sud",
        paragraphs: [
          "Dans des pays comme l'Inde, le Bangladesh, le Pakistan et le Nepal, des unites de terrain locales telles que le bigha, le katha, le killa, le kanal, le marla, le guntha, le biswa et le decimal restent largement utilisees. La taille de ces unites peut varier considerablement d'une region a l'autre, meme sous un meme nom.",
          "Par exemple, un bigha equivaut a environ 1338 m² au Bengale-Occidental, mais peut correspondre a une valeur differente dans un autre Etat. C'est pourquoi, lors de transactions immobilieres utilisant ces unites, il est important de verifier quel standard regional est applique.",
        ],
      },
      {
        title: "Comment calcule-t-on une surface ?",
        paragraphs: [
          "Pour une surface rectangulaire, la formule est Surface = Longueur × Largeur. Pour un triangle, on utilise Surface = (Base × Hauteur) / 2, et pour un cercle, Surface = π × Rayon².",
          "Pour les terrains de forme irreguliere, la surface se calcule en decoupant la forme en rectangles ou triangles plus petits, en calculant la surface de chaque partie separement puis en les additionnant (ou, dans les mesures cadastrales, a l'aide de formules de surface de polygone basees sur des coordonnees).",
        ],
      },
      {
        title: "Points a surveiller lors de la mesure de surface",
        paragraphs: [
          "La valeur de surface indiquee dans une annonce immobiliere ou un acte de propriete doit etre interpretee en fonction de l'unite utilisee (m², dönüm, acre, bigha, etc.) et du standard regional selon lequel cette unite est definie.",
          "En particulier dans les transactions immobilieres internationales, se fier a l'equivalent exact en metres carres plutot qu'a la simple similitude de nom de l'unite evite les malentendus ; l'outil de conversion de cette page compare toutes les unites a partir d'une reference commune en metres carres.",
        ],
      },
    ],
    unitTable: [
      { name: "Millimetre carre", symbol: "mm²", referenceValue: "0,000001 m²", system: "SI/metrique", commonUse: "Dessin technique et petites surfaces" },
      { name: "Centimetre carre", symbol: "cm²", referenceValue: "0,0001 m²", system: "SI/metrique", commonUse: "Surface des petits objets" },
      { name: "Metre carre", symbol: "m²", referenceValue: "1 m²", system: "SI", commonUse: "Surface d'habitation, de bureau et de terrain" },
      { name: "Are", symbol: "a", referenceValue: "100 m²", system: "Metrique", commonUse: "Petites parcelles de terrain" },
      { name: "Dönüm / Dekar", symbol: "dönüm", referenceValue: "1000 m²", system: "Turquie (metrique)", commonUse: "Mesure des terres agricoles" },
      { name: "Hectare", symbol: "ha", referenceValue: "10 000 m²", system: "Metrique", commonUse: "Grandes terres agricoles et forestieres" },
      { name: "Kilometre carre", symbol: "km²", referenceValue: "1 000 000 m²", system: "SI/metrique", commonUse: "Villes, pays et zones geographiques" },
      { name: "Pied carre", symbol: "ft²", referenceValue: "0,092903 m²", system: "Britannique/americain", commonUse: "Surface d'habitation (US/UK)" },
      { name: "Yard carre", symbol: "yd²", referenceValue: "0,83612736 m²", system: "Britannique/americain", commonUse: "Terrains de sport et textile" },
      { name: "Acre", symbol: "ac", referenceValue: "4046,8564224 m²", system: "Britannique/americain", commonUse: "Grandes parcelles de terrain" },
      { name: "Bigha", symbol: "bigha", referenceValue: "≈1337,8 m² (variable selon la region)", system: "Asie du Sud", commonUse: "Terres agricoles en Inde/au Bangladesh" },
      { name: "Tsubo", symbol: "tsubo", referenceValue: "≈3,31 m²", system: "Japon", commonUse: "Mesure de l'habitat et du terrain au Japon" },
    ],
  },
  {
    locale: "fr",
    slug: "volume",
    sourceSlug: "hacim",
    category: "hacim",
    title: "Conversion des unites de volume",
    description:
      "Convertissez les volumes entre litres, millilitres et metres cubes ; comparez les unites courantes pour les liquides et les recipients.",
    introduction: [
      "Le volume est une grandeur physique derivee qui exprime l'etendue de l'espace occupe ou contenu par un objet ou un recipient tridimensionnel. Comme il resulte du produit d'une unite de longueur dans les trois dimensions (longueur × largeur × hauteur), la dimension du volume est L³ (longueur au cube).",
      "Dans le systeme international d'unites, l'unite derivee du volume est le metre cube (m³) ; au quotidien, le litre et le millilitre sont beaucoup plus utilises. En cuisine, la tasse, la cuillere a soupe et la cuillere a cafe sont des mesures traditionnelles, tandis que le systeme americain/britannique utilise le gallon, le quart, le pinte et l'once liquide.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Volume" },
      { label: "Symbole dimensionnel", value: "[L³]" },
      { label: "Unite derivee SI", value: "Metre cube" },
      { label: "Symbole de l'unite SI", value: "m³" },
      { label: "Unite la plus courante au quotidien", value: "Litre (L)" },
    ],
    sections: [
      {
        title: "Qu'est-ce que le volume ?",
        paragraphs: [
          "Le volume est l'etendue de l'espace tridimensionnel occupe par un objet ou pouvant etre contenu dans un recipient. Le volume d'un objet solide exprime son ampleur physique, tandis que le volume d'un recipient exprime la quantite de liquide ou de gaz qu'il peut contenir.",
          "Le volume est une grandeur derivee, obtenue en multipliant une unite de longueur dans les trois dimensions (largeur, hauteur, profondeur). C'est pourquoi sa dimension SI est L³.",
        ],
      },
      {
        title: "L'unite SI du volume : le metre cube",
        paragraphs: [
          "Dans le systeme international d'unites, l'unite derivee du volume est le metre cube (m³), qui represente le volume interieur d'un cube dont chaque cote mesure exactement 1 metre.",
          "Le metre cube est utilise pour de grands volumes (reservoirs d'eau, coulage de beton, volume de conteneurs), tandis que le litre, bien plus petit, est prefere au quotidien. Un metre cube equivaut exactement a 1000 litres.",
        ],
      },
      {
        title: "La relation entre le litre et le metre cube",
        paragraphs: [
          "Le litre est une unite de volume pratique, acceptee pour un usage conjoint avec le SI mais qui n'est pas officiellement une unite SI. Un litre equivaut au volume d'un cube de 10 centimetres de cote (1000 centimetres cubes).",
          "Les sous-multiples du litre -- decilitre, centilitre et millilitre -- sont largement utilises dans les mesures alimentaires, medicales et de laboratoire. Un millilitre equivaut exactement a un centimetre cube (1 mL = 1 cm³).",
        ],
      },
      {
        title: "Pourquoi les unites de volume se convertissent-elles selon un rapport cubique ?",
        paragraphs: [
          "Alors que les unites de longueur se convertissent selon un rapport lineaire et les unites de surface selon un rapport au carre, les unites de volume se convertissent selon un rapport cubique. Par exemple, 1 metre equivaut a 100 centimetres, mais 1 metre cube n'equivaut pas a 100 centimetres cubes, mais a 100³ soit 1 000 000 centimetres cubes.",
          "Cette relation cubique resulte du fait que le volume varie simultanement dans trois dimensions ; c'est la meprise conceptuelle la plus frequente dans les conversions de volume -- elle exige un calcul particulierement attentif lors du passage a des unites non metriques comme le gallon ou le pied cube.",
        ],
      },
      {
        title: "Les mesures de cuisine",
        paragraphs: [
          "Les mesures utilisees dans les recettes, comme la cuillere a soupe, la cuillere a cafe et la tasse, sont des unites de volume standardisees qui permettent d'obtenir des resultats coherents dans differentes cuisines. Equivalences generalement admises : 1 cuillere a soupe ≈ 15 mL, 1 cuillere a cafe ≈ 5 mL, 1 tasse ≈ 250 mL.",
          "Ces mesures ne sont pas des normes scientifiques exactes mais des valeurs approximatives largement admises dans la pratique culinaire ; pour les recettes exigeant une precision (notamment en patisserie), l'usage d'une balance de cuisine numerique est plus fiable.",
        ],
      },
      {
        title: "Les unites de volume liquide americaines et britanniques",
        paragraphs: [
          "Les systemes americain et britannique utilisent des unites comme le gallon, le quart, le pinte et l'once liquide ; mais la taille de ces unites differe entre les deux systemes. Un gallon americain equivaut a 3,78541 litres, tandis qu'un gallon imperial britannique equivaut a 4,54609 litres -- soit environ 20 % de plus.",
          "Cette difference s'explique par le fait que les deux pays ont historiquement adopte des gallons de reference differents (le gallon a vin aux Etats-Unis, le gallon imperial au Royaume-Uni). Il faut toujours verifier a quel systeme appartient la valeur « gallon » ou « once » indiquee sur une recette ou une etiquette de produit.",
        ],
      },
      {
        title: "Les unites de volume agricoles et historiques",
        paragraphs: [
          "Le boisseau (bushel) et le peck sont des unites de volume historiquement utilisees pour mesurer des produits secs comme les cereales, les fruits et les legumes ; elles restent utilisees aujourd'hui dans certains marches agricoles, notamment aux Etats-Unis.",
          "A l'epoque ottomane, le kile et le şinik etaient des unites de volume traditionnelles utilisees pour mesurer les cereales ; 1 kile equivalait a 20 şinik. Bien que ces unites presentent de legeres variations regionales, elles servent aujourd'hui de reference pour interpreter les textes et registres historiques.",
        ],
      },
      {
        title: "Comment calcule-t-on un volume ?",
        paragraphs: [
          "Pour un pave droit (boite), la formule est Volume = Longueur × Largeur × Hauteur. Pour un cylindre, Volume = π × Rayon² × Hauteur s'applique, et pour une sphere, Volume = (4/3) × π × Rayon³.",
          "Le volume des solides de forme irreguliere peut generalement etre determine par la methode du deplacement d'eau (principe d'Archimede) -- en immergeant l'objet dans un recipient rempli d'eau et en mesurant le volume d'eau deplace.",
        ],
      },
      {
        title: "Mesure du volume dans le petrole et l'industrie",
        paragraphs: [
          "Dans l'industrie petroliere, le volume est generalement exprime en barils (bbl) ; 1 baril equivaut exactement a 158,987 litres (42 gallons americains). Cette unite est une tradition remontant au XIXe siecle, lorsque le petrole etait transporte dans des futs en bois initialement destines au vin.",
          "Dans les procedes industriels, les grands volumes sont generalement exprimes en metres cubes, tandis que les petites mesures de laboratoire le sont en millilitres ; le choix de l'unite appropriee depend de l'ampleur du volume mesure.",
        ],
      },
    ],
    unitTable: [
      { name: "Millilitre", symbol: "mL", referenceValue: "0,000001 m³", system: "SI/metrique", commonUse: "Doses medicales et petites mesures" },
      { name: "Cuillere a cafe", symbol: "cc", referenceValue: "0,000005 m³ (≈5 mL)", system: "Mesure de cuisine", commonUse: "Recettes de cuisine" },
      { name: "Cuillere a soupe", symbol: "cs", referenceValue: "0,000015 m³ (≈15 mL)", system: "Mesure de cuisine", commonUse: "Recettes de cuisine" },
      { name: "Tasse", symbol: "tasse", referenceValue: "0,00025 m³ (≈250 mL)", system: "Mesure de cuisine", commonUse: "Recettes de cuisine" },
      { name: "Litre", symbol: "L", referenceValue: "0,001 m³", system: "Metrique", commonUse: "Boissons, carburant et volume quotidien" },
      { name: "Once liquide (US)", symbol: "fl oz", referenceValue: "≈0,0000296 m³ (≈29,57 mL)", system: "Etats-Unis", commonUse: "Boissons et emballages cosmetiques" },
      { name: "Pinte (US)", symbol: "pt", referenceValue: "≈0,000473 m³ (≈473 mL)", system: "Etats-Unis", commonUse: "Mesure de la biere et du lait" },
      { name: "Gallon (US)", symbol: "gal", referenceValue: "≈0,003785 m³ (≈3,785 L)", system: "Etats-Unis", commonUse: "Carburant et grands volumes liquides" },
      { name: "Gallon imperial", symbol: "imp gal", referenceValue: "≈0,004546 m³ (≈4,546 L)", system: "Britannique (imperial)", commonUse: "Carburant et mesure de liquides au Royaume-Uni" },
      { name: "Pied cube", symbol: "ft³", referenceValue: "≈0,0283168 m³", system: "Britannique/americain", commonUse: "Construction et debit d'air CVC" },
      { name: "Baril (petrole)", symbol: "bbl", referenceValue: "≈0,158987 m³ (≈158,987 L)", system: "Industrie petroliere", commonUse: "Mesure du petrole brut" },
      { name: "Metre cube", symbol: "m³", referenceValue: "1 m³", system: "SI", commonUse: "Reservoirs d'eau, beton et grands volumes" },
    ],
  },
  {
    locale: "fr",
    slug: "masse",
    sourceSlug: "kutle",
    category: "kutle",
    title: "Conversion des unites de masse",
    description:
      "Convertissez rapidement et gratuitement entre kilogrammes, grammes, milligrammes, tonnes et livres.",
    introduction: [
      "La masse est une grandeur physique fondamentale liee a la quantite de matiere d'un objet et a sa propriete d'inertie. Dans le systeme international d'unites, l'unite de base de la masse est le kilogramme, symbolise par kg.",
      "Bien que masse et poids soient souvent employes comme synonymes dans le langage courant, ce sont des grandeurs physiquement distinctes. La masse se mesure en kilogrammes, tandis que le poids, qui est une force, se mesure en newtons.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Masse" },
      { label: "Symbole dimensionnel", value: "[M]" },
      { label: "Unite de base SI", value: "Kilogramme" },
      { label: "Symbole de l'unite SI", value: "kg" },
      { label: "Domaine de metrologie", value: "Metrologie de la masse" },
    ],
    sections: [
      {
        title: "Qu'est-ce que la masse ?",
        paragraphs: [
          "La masse est la grandeur physique liee a la resistance qu'oppose un objet a un changement de son etat de mouvement, c'est-a-dire a son inertie. En mecanique classique, la relation entre la force nette appliquee a un objet et l'acceleration produite s'exprime par l'egalite F = m·a.",
          "Lorsqu'une meme force est appliquee, un objet de masse plus grande acquiert une acceleration plus faible. La masse ne se contente donc pas d'exprimer, au sens courant, la quantite de matiere contenue dans un objet : elle joue un role fondamental dans les equations du mouvement.",
          "La masse est une grandeur scalaire. Elle n'a pas de direction et son symbole dimensionnel de base dans le systeme SI est la lettre M.",
        ],
      },
      {
        title: "La difference entre masse et poids",
        paragraphs: [
          "La masse et le poids ne sont pas la meme grandeur physique. La masse est une propriete de l'objet et s'exprime en kilogrammes. Le poids, quant a lui, est la force que subit l'objet dans un champ gravitationnel et se mesure en newtons.",
          "La relation simplifiee du poids s'ecrit W = m·g, ou W represente la force de poids, m la masse et g l'acceleration de la pesanteur locale.",
          "La masse d'un objet reste approximativement la meme sur Terre et sur la Lune ; en revanche, son poids varie car l'acceleration de la pesanteur locale differe. C'est pourquoi, en usage scientifique, le kilogramme est une unite de masse et non de poids.",
          "Dans le langage courant, comme le resultat d'une pesee s'exprime en kilogrammes, les mots « poids » et « masse » sont souvent utilises l'un pour l'autre. L'appareil de mesure detecte en realite l'effet d'une force, mais il est etalonne pour afficher le resultat en unite de masse.",
        ],
      },
      {
        title: "Pourquoi le kilogramme est-il l'unite de base SI de la masse ?",
        paragraphs: [
          "Dans le systeme international d'unites, l'unite de base de la masse est le kilogramme. Le kilogramme est la seule unite de base du SI dont le nom comporte un prefixe.",
          "Le mot gramme a historiquement joue un role important dans les premieres definitions de masse du systeme metrique. Mais lors de l'etablissement des etalons pratiques, le kilogramme est devenu la reference fondamentale.",
          "Aujourd'hui, le kilogramme n'est plus defini par la masse d'un cylindre metallique physique. Il est defini a partir de la valeur numerique fixee de la constante de Planck. Le lien de cette definition avec la balance de Kibble et les mesures electriques est examine en detail sur la page d'information dediee au kilogramme.",
        ],
      },
      {
        title: "Les unites metriques de masse",
        paragraphs: [
          "Les unites metriques de masse sont construites a partir du kilogramme, du gramme et des prefixes SI qui leur sont ajoutes. Un gramme equivaut a 0,001 kilogramme, un milligramme a 0,001 gramme et un microgramme a 0,001 milligramme.",
          "Pour les grandes masses, on utilise la tonne. Une tonne metrique equivaut exactement a 1000 kilogrammes. Le symbole de la tonne, dont l'usage est accepte avec le SI, est la lettre minuscule t.",
          "L'unite appropriee se choisit selon l'ampleur de la masse mesuree. La masse d'une personne ou d'un produit peut s'exprimer en kilogrammes, la teneur d'un aliment en grammes, un principe actif medicamenteux en milligrammes ou microgrammes, et la charge d'un vehicule en tonnes.",
        ],
      },
      {
        title: "La relation entre la livre, l'once et le kilogramme",
        paragraphs: [
          "La livre et l'once sont des unites de masse utilisees dans les systemes de mesure traditionnels britannique et americain. La livre avoirdupois internationale equivaut exactement a 0,45359237 kilogramme.",
          "Une livre avoirdupois se divise en 16 onces. Une once equivaut donc exactement a 0,028349523125 kilogramme, soit 28,349523125 grammes.",
          "La livre utilisee pour la masse et la livre-force (pound-force), une unite de force, sont deux grandeurs differentes. La livre exprime une masse, la livre-force une force. Dans les calculs techniques, il ne faut pas confondre les symboles lb et lbf.",
        ],
      },
      {
        title: "Comment mesure-t-on la masse ?",
        paragraphs: [
          "Pour mesurer la masse, on peut utiliser une balance a deux plateaux, une balance electronique, une balance analytique, une cellule de charge, ainsi que divers systemes de pesage industriels de capacites differentes.",
          "Les balances comparatives comparent la masse inconnue a des masses etalons tracables. Dans les balances electroniques, les cellules de charge convertissent la force appliquee en un signal electrique.",
          "Pour les mesures de haute precision, des facteurs comme la poussee d'Archimede de l'air, l'acceleration de la pesanteur locale, la temperature, l'humidite, les vibrations, les effets electrostatiques et la densite de la masse etalon peuvent etre pris en compte.",
          "Le rattachement des etalons de masse aux systemes de mesure nationaux et internationaux est appele tracabilite metrologique. La chaine d'etalonnage permet de comparer les mesures effectuees dans differents laboratoires et entreprises.",
        ],
      },
      {
        title: "La relation entre densite, volume et masse",
        paragraphs: [
          "La relation m = ρ·V existe entre la masse, la densite et le volume. Ici, m represente la masse, ρ la densite et V le volume.",
          "Pour un meme volume, la masse de deux matieres differentes peut varier selon leur densite. Par exemple, pour un meme volume, l'acier et l'eau n'ont pas la meme masse.",
          "Dans le systeme SI, l'unite derivee de base de la densite est le kilogramme par metre cube. Dans les applications de laboratoire, des unites comme le gramme par centimetre cube ou le gramme par millilitre sont egalement couramment utilisees.",
        ],
      },
      {
        title: "L'incertitude dans la mesure de la masse",
        paragraphs: [
          "Toute mesure reelle comporte une certaine incertitude. Le fait qu'une balance affiche un grand nombre de chiffres a l'ecran ne signifie pas que tous ces chiffres sont connus avec la meme precision.",
          "La resolution de l'appareil, la repetabilite, la non-linearite, l'etalon de calibration, les conditions environnementales et la methode de l'utilisateur peuvent tous contribuer a l'incertitude de la mesure de masse.",
          "Dans les travaux scientifiques et industriels, le resultat d'une mesure doit etre evalue avec l'unite appropriee, le nombre de chiffres significatifs et l'information sur l'incertitude.",
        ],
      },
      {
        title: "Comment choisir l'unite de masse appropriee ?",
        paragraphs: [
          "Choisir une unite adaptee a l'ampleur de l'objet mesure rend le resultat plus lisible. La masse d'une personne peut s'exprimer en kilogrammes, le principe actif d'un comprime en milligrammes, et le chargement d'un camion en tonnes.",
          "Pour les tres petites masses, des unites a prefixe SI comme le microgramme, le nanogramme et le picogramme peuvent etre utilisees. A l'echelle des atomes et des molecules, des unites specifiques comme l'unite de masse atomique unifiee peuvent etre plus pratiques.",
          "Lors d'une conversion d'unite, il faut verifier non seulement la valeur numerique, mais aussi si l'unite utilisee exprime une masse ou une force.",
        ],
      },
    ],
    unitTable: [
      { name: "Nanogramme", symbol: "ng", referenceValue: "10⁻¹² kg", system: "SI", commonUse: "Tres faibles quantites de matiere" },
      { name: "Microgramme", symbol: "µg", referenceValue: "10⁻⁹ kg", system: "SI", commonUse: "Mesures medicales et de laboratoire" },
      { name: "Milligramme", symbol: "mg", referenceValue: "10⁻⁶ kg", system: "SI", commonUse: "Doses medicamenteuses et substances chimiques" },
      { name: "Gramme", symbol: "g", referenceValue: "0,001 kg", system: "SI", commonUse: "Alimentation et petits objets" },
      { name: "Kilogramme", symbol: "kg", referenceValue: "1 kg", system: "SI", commonUse: "Mesures de masse de base" },
      { name: "Tonne", symbol: "t", referenceValue: "1000 kg", system: "Metrique", commonUse: "Transport, fret et industrie" },
      { name: "Once", symbol: "oz", referenceValue: "0,028349523125 kg", system: "Britannique/americain", commonUse: "Alimentation et petites masses" },
      { name: "Livre", symbol: "lb", referenceValue: "0,45359237 kg", system: "Britannique/americain", commonUse: "Masse corporelle et masse des produits" },
    ],
  },
  {
    locale: "fr",
    slug: "temperature",
    sourceSlug: "sicaklik",
    category: "sicaklik",
    title: "Conversion des unites de temperature",
    description:
      "Convertissez les temperatures entre Celsius, Fahrenheit et Kelvin ; consultez les formules et des valeurs d'exemple.",
    introduction: [
      "La temperature est une grandeur physique fondamentale liee a l'energie cinetique moyenne des particules d'une matiere, exprimant a quel point cette matiere est « chaude » ou « froide ». Dans le systeme international d'unites, l'unite de base de la temperature est le kelvin.",
      "Au quotidien, les echelles Celsius et Fahrenheit sont les plus utilisees ; le kelvin sert dans les travaux scientifiques, le Rankine dans certains calculs d'ingenierie, et le Reaumur apparait dans des textes historiques. Contrairement a de nombreuses autres grandeurs physiques, la conversion de temperature entre unites necessite non seulement une multiplication mais aussi une addition ou une soustraction.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Temperature (temperature thermodynamique)" },
      { label: "Symbole dimensionnel", value: "[Θ]" },
      { label: "Unite de base SI", value: "Kelvin" },
      { label: "Symbole de l'unite SI", value: "K" },
      { label: "Zero absolu", value: "0 K = -273,15 °C = -459,67 °F" },
    ],
    sections: [
      {
        title: "Qu'est-ce que la temperature ?",
        paragraphs: [
          "La temperature est une grandeur directement liee a l'energie cinetique (de mouvement) moyenne des atomes et des molecules qui composent une matiere. Plus les particules se deplacent rapidement, plus la matiere est consideree comme « chaude ».",
          "La temperature est l'une des sept grandeurs de base du systeme international d'unites et est representee, en tant que temperature thermodynamique, par le symbole Θ (theta). Contrairement a de nombreuses autres grandeurs (comme la longueur ou la masse), ce n'est pas une grandeur directement additive -- mettre en contact deux corps n'additionne pas leurs temperatures, mais les conduit vers un equilibre.",
        ],
      },
      {
        title: "L'unite SI de la temperature : le kelvin",
        paragraphs: [
          "Le kelvin est l'unite de base SI de la temperature, symbolise par K (sans symbole de degre, on ecrit simplement « K »). L'echelle Kelvin prend le zero absolu (la temperature la plus basse theoriquement possible) comme point de depart (0 K).",
          "Depuis la revision du SI de 2019, le kelvin n'est plus defini a partir du point triple de l'eau, mais a partir de la valeur numerique fixee de la constante de Boltzmann (k). Cela garantit que l'unite de temperature repose sur une constante universelle plutot que sur une substance de reference physique.",
        ],
      },
      {
        title: "Pourquoi la conversion de temperature n'est-elle pas une simple multiplication ?",
        paragraphs: [
          "Pour des grandeurs comme la longueur ou la masse, la conversion d'unite se fait uniquement par un facteur multiplicatif (par exemple metre-centimetre). Pour la temperature, les echelles Celsius, Fahrenheit et Kelvin ayant des « points zero » differents, la conversion necessite a la fois une multiplication et une addition/soustraction.",
          "Par exemple, pour passer de Celsius a Fahrenheit, la valeur est d'abord multipliee par 9/5, puis 32 est ajoute : °F = (°C × 9/5) + 32. C'est pourquoi la temperature est, mathematiquement, la seule grandeur physique courante ayant une relation de conversion « affine » (lineaire mais ne passant pas par l'origine).",
        ],
      },
      {
        title: "L'echelle Celsius",
        paragraphs: [
          "L'echelle Celsius a ete developpee en 1742 par l'astronome suedois Anders Celsius et definit le point de congelation de l'eau a 0 °C et son point d'ebullition (a une pression d'une atmosphere) a 100 °C. C'est un systeme de reference pratique qui facilite la comprehension de l'echelle dans la vie quotidienne.",
          "Le Celsius est l'echelle de temperature la plus utilisee dans le monde pour les travaux scientifiques et pour les bulletins meteorologiques quotidiens dans la plupart des pays ; un petit nombre de pays, comme les Etats-Unis, continuent de preferer le Fahrenheit au quotidien.",
        ],
      },
      {
        title: "L'echelle Fahrenheit",
        paragraphs: [
          "L'echelle Fahrenheit a ete developpee en 1724 par le physicien allemand Daniel Gabriel Fahrenheit. Dans cette echelle, le point de congelation de l'eau est de 32 °F et son point d'ebullition de 212 °F -- soit un intervalle exact de 180 degres entre congelation et ebullition.",
          "Le Fahrenheit continue d'etre utilise aujourd'hui pour les mesures de temperature quotidiennes dans un petit nombre de pays, principalement les Etats-Unis ; dans les travaux scientifiques a l'echelle mondiale, il a largement cede la place au Celsius et au Kelvin.",
        ],
      },
      {
        title: "Rankine et Reaumur : des echelles moins connues",
        paragraphs: [
          "Le Rankine est une echelle de temperature absolue qui utilise des unites de la meme taille que le degre Fahrenheit, mais qui prend le zero absolu comme 0 °R ; le point de congelation de l'eau y est de 491,67 °R. Il est particulierement prefere au Kelvin dans certains calculs d'ingenierie thermodynamique aux Etats-Unis.",
          "L'echelle Reaumur a ete developpee au XVIIIe siecle par le scientifique francais Rene Reaumur ; elle fixe le point de congelation de l'eau a 0 °Re et son point d'ebullition a 80 °Re. Bien qu'elle ne soit pratiquement plus utilisee aujourd'hui, on peut encore la rencontrer comme reference historique dans certains pays europeens (notamment dans certaines recettes traditionnelles en Russie).",
        ],
      },
      {
        title: "Que signifie le zero absolu ?",
        paragraphs: [
          "Le zero absolu (0 kelvin, -273,15 °C, -459,67 °F) est la temperature theorique a laquelle les particules possedent, au sens classique, la plus faible energie cinetique possible. En raison de la mecanique quantique, les particules ne restent pas completement immobiles meme au zero absolu (energie du point zero), mais aucune temperature plus basse ne peut etre definie au sens classique.",
          "En laboratoire, des temperatures extremement proches du zero absolu (de l'ordre du microkelvin, voire du nanokelvin) ont pu etre atteintes, mais selon le troisieme principe de la thermodynamique, il est impossible d'atteindre exactement le zero absolu en un nombre fini d'etapes.",
        ],
      },
      {
        title: "Comment mesure-t-on la temperature ?",
        paragraphs: [
          "Pour mesurer la temperature, differentes technologies sont utilisees : thermometres au mercure ou a alcool, thermometres numeriques, thermocouples, thermometres a resistance (RTD) et thermometres infrarouges (sans contact). Chacune convient a une plage de temperature et un niveau de precision differents.",
          "Les thermocouples sont largement utilises en milieu industriel car ils peuvent fonctionner sur une tres large plage de temperature (parfois de -200 °C a +2000 °C) ; ils calculent la temperature a partir de la difference de tension generee a la jonction de deux metaux differents.",
        ],
      },
    ],
    unitTable: [
      { name: "Kelvin", symbol: "K", referenceValue: "Unite de base", system: "SI", commonUse: "Calculs scientifiques et thermodynamiques" },
      { name: "Celsius", symbol: "°C", referenceValue: "K = °C + 273,15", system: "Metrique (usage quotidien)", commonUse: "Meteorologie, vie quotidienne, sciences" },
      { name: "Fahrenheit", symbol: "°F", referenceValue: "°F = (°C × 9/5) + 32", system: "Etats-Unis", commonUse: "Meteorologie quotidienne aux Etats-Unis" },
      { name: "Rankine", symbol: "°R", referenceValue: "°R = (°C + 273,15) × 9/5", system: "Etats-Unis (ingenierie)", commonUse: "Calculs d'ingenierie thermodynamique" },
      { name: "Reaumur", symbol: "°Re", referenceValue: "°Re = °C × 4/5", system: "Historique (Europe)", commonUse: "Textes historiques, recettes traditionnelles" },
    ],
  },
  {
    locale: "fr",
    slug: "temps",
    sourceSlug: "zaman",
    category: "zaman",
    title: "Conversion des unites de temps",
    description:
      "Utilisez sur une seule page les conversions de temps essentielles entre secondes, minutes et heures.",
    introduction: [
      "Le temps est une grandeur physique fondamentale exprimant l'ordre dans lequel se produisent les evenements et la duree qui les separe. Dans le systeme international d'unites, l'unite de base du temps est la seconde, utilisee avec des unites derivees comme la minute, l'heure et le jour dans la vie quotidienne.",
      "Contrairement a des grandeurs comme la longueur ou la masse, le temps est l'un des concepts de mesure les plus anciens de l'histoire humaine ; la structure sexagesimale (base 60) de l'heure, de la minute et de la seconde remonte a plusieurs millenaires, a l'ancienne civilisation babylonienne.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Temps" },
      { label: "Symbole dimensionnel", value: "[T]" },
      { label: "Unite de base SI", value: "Seconde" },
      { label: "Symbole de l'unite SI", value: "s" },
      { label: "Definition actuelle de la seconde", value: "9 192 631 770 periodes d'oscillation de l'atome de cesium-133" },
    ],
    sections: [
      {
        title: "Qu'est-ce que le temps ?",
        paragraphs: [
          "Le temps est une grandeur fondamentale exprimant l'ordre dans lequel se produisent les evenements et la duree ecoulee entre deux evenements. En physique, il est represente par le symbole dimensionnel T et intervient dans la definition de nombreuses grandeurs derivees comme la vitesse, l'acceleration et la frequence.",
          "En physique classique, le temps est considere comme une grandeur absolue s'ecoulant de la meme maniere pour tous les observateurs ; mais avec la theorie de la relativite d'Einstein, on a compris que le temps peut s'ecouler differemment selon la vitesse de l'observateur et le champ gravitationnel (dilatation du temps).",
        ],
      },
      {
        title: "L'unite SI du temps : la seconde",
        paragraphs: [
          "La seconde est l'unite de base SI du temps, symbolisee par s. Historiquement, la seconde etait definie comme 1/86 400 d'un jour (24 heures × 60 minutes × 60 secondes).",
          "Cette definition s'etant averee insuffisamment stable en raison de petites irregularites dans la vitesse de rotation de la Terre, la seconde a ete redefinie en 1967 comme correspondant exactement a 9 192 631 770 periodes de la radiation associee a la transition entre deux niveaux d'energie fondamentaux de l'atome de cesium-133. Cette definition permet aux horloges atomiques de fonctionner avec la meme precision partout dans le monde.",
        ],
      },
      {
        title: "L'origine sexagesimale de l'heure, de la minute et de la seconde",
        paragraphs: [
          "La division d'une heure en 60 minutes et d'une minute en 60 secondes remonte au systeme numerique sexagesimal (base 60) utilise par l'ancienne civilisation babylonienne. Les Babyloniens divisaient aussi bien l'angle (360 degres) que le temps selon ce systeme.",
          "Le choix du nombre 60 s'explique par le fait qu'il est divisible exactement par de nombreux nombres -- 2, 3, 4, 5, 6, 10, 12, 15, 20 et 30 -- ce qui facilite les partages pratiques dans les calculs quotidiens (par exemple diviser une heure en trois ou quatre) sans avoir besoin de nombres fractionnaires.",
        ],
      },
      {
        title: "La division du jour en 24 heures",
        paragraphs: [
          "La division du jour en 24 heures remonte a l'Egypte antique ; les Egyptiens divisaient le jour en 12 parties egales et la nuit en 12 autres parties egales, suivant le temps a l'aide de cadrans solaires et d'observations stellaires.",
          "Cette division par 12 s'inspire probablement du comptage des phalanges des doigts (trois phalanges sur chacun des quatre doigts hors pouce, soit 12 au total) ou du nombre de cycles lunaires dans une annee (environ 12 pleines lunes).",
        ],
      },
      {
        title: "La relation entre les unites metriques de temps",
        paragraphs: [
          "Les sous-multiples de la seconde -- milliseconde (0,001 seconde), microseconde et nanoseconde -- sont utilises pour mesurer des evenements tres brefs, comme les operations des processeurs informatiques, le chronometrage sportif et les experiences scientifiques.",
          "Ses multiples -- minute (60 secondes), heure (3600 secondes) et jour (86 400 secondes) -- sont les unites de base utilisees au quotidien pour suivre le temps. La conversion entre ces unites se fait, contrairement a la temperature, uniquement par multiplication/division, car elles partagent toutes un point zero (origine) commun.",
        ],
      },
      {
        title: "Qu'est-ce qu'une seconde intercalaire ?",
        paragraphs: [
          "La vitesse de rotation de la Terre sur elle-meme presente, au fil du temps, de petites irregularites dues aux effets de maree et aux variations de sa structure interne ; cela cree un leger decalage entre le temps « precis » mesure par les horloges atomiques et la duree du jour basee sur la rotation reelle de la Terre.",
          "Pour compenser ce decalage, une « seconde intercalaire » est ajoutee au Temps Universel Coordonne (UTC) lorsque necessaire, depuis 1972. C'est un mecanisme de correction similaire au jour supplementaire des annees bissextiles (29 fevrier), mais comme l'irregularite de la rotation de la Terre est imprevisible, les secondes intercalaires ne sont pas ajoutees selon un cycle fixe comme le calendrier, mais selon les besoins.",
        ],
      },
      {
        title: "Les fuseaux horaires et l'UTC",
        paragraphs: [
          "La Terre est divisee en environ 24 fuseaux horaires, car le Soleil atteint son point culminant a des heures differentes selon la longitude. Tous les fuseaux horaires utilisent le Temps Universel Coordonne (UTC) comme point de reference et s'expriment par un decalage horaire par rapport a cette reference selon leur region (par exemple, la France metropolitaine est a UTC+1 en hiver).",
          "L'UTC est une norme de temps moderne qui a remplace l'ancien Temps Moyen de Greenwich (GMT) et qui est maintenu par des horloges atomiques ; le GMT est aujourd'hui surtout utilise comme nom du fuseau horaire correspondant a l'heure d'hiver au Royaume-Uni.",
        ],
      },
      {
        title: "Comment mesure-t-on le temps ?",
        paragraphs: [
          "Au quotidien, on utilise des montres mecaniques et numeriques, tandis que les applications scientifiques et technologiques (satellites GPS, reseaux de telecommunications) utilisent des horloges atomiques. Les horloges atomiques fonctionnent avec une precision extremement elevee, basee sur la frequence d'oscillation stable des atomes de cesium ou de rubidium.",
          "Pour que le systeme GPS puisse determiner une position precise, les horloges atomiques des satellites doivent etre synchronisees a la nanoseconde pres ; meme un leger decalage dans ces horloges peut entrainer d'importantes erreurs dans le calcul de la position au sol.",
        ],
      },
    ],
    unitTable: [
      { name: "Milliseconde", symbol: "ms", referenceValue: "0,001 s", system: "SI/metrique", commonUse: "Operations informatiques et chronometrage sportif" },
      { name: "Seconde", symbol: "s", referenceValue: "1 s", system: "SI", commonUse: "Mesure de temps de base" },
      { name: "Minute", symbol: "min", referenceValue: "60 s", system: "Accepte avec le SI", commonUse: "Suivi du temps au quotidien" },
      { name: "Heure", symbol: "h", referenceValue: "3600 s", system: "Accepte avec le SI", commonUse: "Temps de travail, temps de trajet" },
      { name: "Jour", symbol: "j", referenceValue: "86 400 s", system: "Accepte avec le SI", commonUse: "Calendrier et calculs de duree" },
    ],
  },
  {
    locale: "fr",
    slug: "vitesse",
    sourceSlug: "hiz",
    category: "hiz",
    title: "Conversion des unites de vitesse",
    description:
      "Convertissez la vitesse entre km/h, m/s et mph ; consultez des exemples d'ingenierie et d'usage quotidien.",
    introduction: [
      "La vitesse est une grandeur physique derivee qui exprime la distance parcourue par un objet par unite de temps. Comme elle s'obtient en divisant une longueur par un temps, la dimension de la vitesse est L/T (longueur divisee par temps).",
      "Au quotidien, le kilometre par heure (km/h) et le mile par heure (mph) sont les unites de vitesse les plus utilisees ; le metre par seconde (m/s) est prefere dans les travaux scientifiques, et le noeud en navigation maritime et aerienne. La vitesse de la lumiere occupe une place particuliere parmi les unites de vitesse, en tant que limite superieure absolue atteignable dans l'univers.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Vitesse" },
      { label: "Symbole dimensionnel", value: "[L/T]" },
      { label: "Unite derivee SI", value: "Metre par seconde" },
      { label: "Symbole de l'unite SI", value: "m/s" },
      { label: "Limite de vitesse universelle", value: "Vitesse de la lumiere ≈ 299 792 458 m/s" },
    ],
    sections: [
      {
        title: "Qu'est-ce que la vitesse ?",
        paragraphs: [
          "La vitesse exprime la distance parcourue par un objet par unite de temps et se calcule par la formule Vitesse = Distance / Temps. Bien que la physique distingue techniquement la « vitesse scalaire » (sans direction) de la « vitesse vectorielle » (avec direction), les deux termes sont generalement employes l'un pour l'autre dans le langage courant.",
          "La vitesse est une grandeur derivee, obtenue en divisant une unite de longueur par une unite de temps. C'est pourquoi sa dimension SI est notee L/T (ou L¹T⁻¹).",
        ],
      },
      {
        title: "L'unite SI de la vitesse : le metre par seconde",
        paragraphs: [
          "Dans le systeme international d'unites, l'unite derivee de la vitesse est le metre par seconde (m/s), qui exprime le fait qu'un objet parcourt un metre a chaque seconde. Cette unite est utilisee comme standard dans les calculs scientifiques et les formules de physique.",
          "Au quotidien, le kilometre par heure (km/h) est prefere au metre par seconde, car les vitesses des vehicules et les distances routieres s'expriment ainsi avec des nombres plus intuitifs a cette echelle. 1 m/s equivaut exactement a 3,6 km/h.",
        ],
      },
      {
        title: "Le kilometre par heure et le mile par heure",
        paragraphs: [
          "Le kilometre par heure (km/h) est l'unite standard de vitesse routiere dans les pays utilisant le systeme metrique, dont la France. Le mile par heure (mph) est prefere dans des pays utilisant le systeme de mesure britannique, comme les Etats-Unis et le Royaume-Uni.",
          "1 mph equivaut a environ 1,60934 km/h. Cette difference est une source pratique de confusion, pouvant entrainer une mauvaise interpretation des compteurs de vitesse de vehicules importes ou des limitations de vitesse lors de la location d'une voiture a l'etranger.",
        ],
      },
      {
        title: "Le noeud : la vitesse en navigation maritime et aerienne",
        paragraphs: [
          "Le noeud (mille marin par heure) est l'unite de vitesse standard en navigation maritime et aerienne ; 1 noeud signifie exactement la distance d'un mille marin (1852 metres) parcourue en une heure.",
          "Le nom de l'unite « noeud » vient historiquement du fait que, pour mesurer la vitesse des navires, on jetait a l'eau une corde marquee de noeuds et on comptait le nombre de noeuds ayant defile en un temps donne. Cette methode a ete utilisee pendant des siecles avant l'apparition des instruments de mesure de vitesse modernes.",
        ],
      },
      {
        title: "La vitesse de la lumiere : la limite de vitesse de l'univers",
        paragraphs: [
          "La vitesse de la lumiere dans le vide est definie comme exactement 299 792 458 m/s et constitue, selon la theorie de la relativite restreinte d'Einstein, la limite superieure absolue que peut atteindre une information ou un objet massif dans l'univers.",
          "Le fait que la vitesse de la lumiere soit definie comme un nombre exact (et deja consideree comme constante avant la revision SI de 2019) permet que la definition actuelle du metre repose elle aussi sur cette constante -- le metre etant defini comme la distance parcourue par la lumiere en 1/299 792 458 de seconde.",
        ],
      },
      {
        title: "Le nombre de Mach : un rapport a la vitesse du son",
        paragraphs: [
          "En aviation, les vitesses elevees sont generalement exprimees a l'aide du nombre de Mach, qui represente le rapport entre la vitesse d'un objet et la vitesse du son dans ce milieu (Mach 1 = vitesse du son). La vitesse du son n'est pas une valeur fixe ; elle varie selon la temperature et la densite de l'air (environ 343 m/s, soit 1235 km/h, au niveau de la mer).",
          "C'est pourquoi un meme nombre de Mach peut correspondre a des vitesses reelles differentes (en km/h ou m/s) selon l'altitude et la temperature -- la vitesse Mach 0,85 d'un avion varie en valeur reelle avec l'altitude.",
        ],
      },
      {
        title: "La difference entre vitesse moyenne et vitesse instantanee",
        paragraphs: [
          "La vitesse moyenne s'obtient en divisant la distance totale parcourue par le temps total ecoule et donne une valeur unique pour l'ensemble d'un trajet. La vitesse instantanee est la vitesse d'un objet a un moment precis et peut varier continuellement (acceleration, ralentissement, arret).",
          "Alors que le compteur de vitesse d'un vehicule indique la vitesse instantanee, la vitesse moyenne d'un trajet est generalement calculee a posteriori a partir de la distance totale et de la duree totale -- ces deux valeurs different tant que la vitesse n'est pas restee constante pendant le trajet.",
        ],
      },
    ],
    unitTable: [
      { name: "Centimetre par seconde", symbol: "cm/s", referenceValue: "0,01 m/s", system: "SI/metrique", commonUse: "Laboratoire et mesure de mouvement lent" },
      { name: "Metre par minute", symbol: "m/min", referenceValue: "≈0,0167 m/s", system: "SI/metrique", commonUse: "Vitesse de convoyeur industriel" },
      { name: "Metre par seconde", symbol: "m/s", referenceValue: "1 m/s", system: "SI", commonUse: "Calculs scientifiques et physiques" },
      { name: "Kilometre par heure", symbol: "km/h", referenceValue: "≈0,278 m/s", system: "Metrique", commonUse: "Vitesse des vehicules et limitations routieres" },
      { name: "Mile par heure", symbol: "mph", referenceValue: "≈0,447 m/s", system: "Britannique/americain", commonUse: "Vitesse des vehicules aux Etats-Unis et au Royaume-Uni" },
      { name: "Noeud", symbol: "kn", referenceValue: "≈0,514 m/s", system: "Navigation maritime/aerienne", commonUse: "Vitesse des navires et des avions" },
      { name: "Kilometre par minute", symbol: "km/min", referenceValue: "≈16,67 m/s", system: "Metrique", commonUse: "Calculs de vitesse sur courte distance" },
      { name: "Kilometre par seconde", symbol: "km/s", referenceValue: "1000 m/s", system: "Metrique", commonUse: "Vitesse des engins spatiaux et des corps celestes" },
      { name: "Vitesse de la lumiere", symbol: "c", referenceValue: "299 792 458 m/s", system: "Constante universelle", commonUse: "Calculs de physique et d'astronomie" },
    ],
  },
  {
    locale: "fr",
    slug: "pression",
    sourceSlug: "basinc",
    category: "basinc",
    title: "Conversion des unites de pression",
    description:
      "Convertissez la pression entre pascal, kilopascal, bar et PSI ; consultez les formules et les usages en ingenierie.",
    introduction: [
      "La pression est la grandeur physique exprimant la quantite de force agissant perpendiculairement sur une surface, rapportee a cette surface. Elle a un champ d'application tres large, des contraintes de contact entre solides au fluide dans une conduite, de l'atmosphere aux systemes sous vide. En ingenierie, la pression n'est pas seulement une valeur numerique : c'est une variable de conception fondamentale pour la securite, l'etancheite, la resistance structurelle, la conversion d'energie et le controle des procedes.",
      "Dans le systeme international d'unites, l'unite derivee de la pression est le pascal, symbolise par Pa. Un pascal correspond a la pression exercee par une force d'un newton repartie uniformement sur une surface d'un metre carre. La pression est donc directement liee aux notions de force et de surface ; sa structure dimensionnelle est partagee avec la contrainte mecanique des materiaux, mais leur contexte physique n'est pas toujours identique.",
      "Dans la vie quotidienne et l'industrie, la pression est le plus souvent exprimee dans des unites plus pratiques que le pascal. Le kilopascal et le PSI sont largement utilises pour la pression des pneus, le bar dans les systemes de procede, l'atm dans les conditions atmospheriques, et le millibar en meteorologie. Le fait que differents secteurs aient historiquement adopte des unites differentes rend particulierement important de bien comprendre les conversions de pression et de ne pas confondre les types de pression absolue, relative ou differentielle.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Pression" },
      { label: "Unite derivee SI", value: "Pascal" },
      { label: "Symbole SI", value: "Pa" },
      { label: "Relation de base", value: "P = F / A" },
      { label: "Equivalent SI", value: "1 Pa = 1 N/m²" },
      { label: "Formule dimensionnelle", value: "M L⁻¹ T⁻²" },
      { label: "Atmosphere standard", value: "101 325 Pa" },
      { label: "Reference du zero absolu", value: "Vide total" },
    ],
    sections: [
      {
        title: "Qu'est-ce que la pression ?",
        paragraphs: [
          "La pression ne depend pas seulement de la grandeur de la force appliquee sur une surface, mais aussi de la surface sur laquelle cette force est repartie. Si la meme force est appliquee sur une surface plus petite, la pression augmente ; repartie sur une surface plus grande, elle diminue. C'est pourquoi un couteau bien affute peut couper avec peu de force, alors que la meme force sur une base large produit un effet de surface bien plus faible.",
          "En mecanique des fluides, la pression est consideree comme la composante de contrainte normale qu'un fluide au repos ou en mouvement exerce sur son environnement. Dans un fluide au repos, la pression se transmet dans toutes les directions et est liee au principe de Pascal dans les recipients fermes. Cette propriete est a la base des presses hydrauliques, des systemes de freinage et de nombreux actionneurs industriels.",
          "Le concept de pression ne se limite pas aux liquides et aux gaz. L'effet de force normale moyenne aux surfaces de contact cree egalement une repartition semblable a une pression. Mais en ingenierie, lorsqu'on parle de pression, on pense generalement en priorite aux systemes fluides comme les tuyaux, reservoirs, compresseurs, gaines d'air, chambres a vide et environnement atmospherique.",
        ],
      },
      {
        title: "La formule de la pression : P = F / A",
        paragraphs: [
          "La definition de base de la pression est donnee par la relation P = F / A. Ici, P represente la pression, F la composante de force perpendiculaire a la surface, et A la surface sur laquelle cette force est repartie. L'analyse dimensionnelle donne newton divise par metre carre, ce qui equivaut a l'unite pascal.",
          "Cette relation donne la pression moyenne en supposant une repartition uniforme de la force. Dans les problemes reels de contact ou dans des champs complexes au sein d'un fluide, la pression peut varier le long de la surface. Dans ce cas, plutot qu'une seule valeur moyenne, on prend en compte la repartition locale de la pression, des equations differentielles et des conditions aux limites.",
          "Une erreur frequente dans la pratique consiste a mal choisir la direction de la force et la surface effective. Par exemple, pour calculer la force d'un piston, seule la surface de section effective soumise a la pression doit etre utilisee. Negliger des details geometriques comme le joint, le boulon ou la surface d'appui peut entrainer des erreurs de conception.",
        ],
      },
      {
        title: "Pourquoi le pascal est-il l'unite SI de pression ?",
        paragraphs: [
          "Le pascal derive naturellement de la combinaison du newton, unite SI de force, et du metre carre, unite SI de surface. L'egalite 1 Pa = 1 N/m² n'est donc pas seulement une definition, mais aussi une expression dimensionnelle montrant l'origine mecanique de la pression. Il n'est ainsi pas necessaire de definir une unite de base distincte pour la pression.",
          "Le systeme SI vise a relier de maniere coherente les grandeurs derivees aux unites de base. Exprimer la pression en pascals fournit un cadre compatible avec la densite d'energie, la contrainte, le module d'elasticite et les equations de mecanique des fluides. Le fait qu'une meme unite puisse etre utilisee dans differents domaines reduit les erreurs de conversion dans les calculs.",
          "A l'echelle quotidienne, le pascal est souvent une unite tres petite. C'est pourquoi l'ingenierie prefere des echelles plus pratiques comme le kilopascal, le megapascal ou le bar. Toutes ces unites restent neanmoins finalement rattachees au pascal, et donc a la base SI.",
        ],
      },
      {
        title: "L'histoire de la mesure de la pression : Torricelli et le barometre",
        paragraphs: [
          "La mesure systematique de la pression a commence en 1643 avec la mise au point du barometre a mercure par le scientifique italien Evangelista Torricelli. Torricelli a observe que, lorsqu'un tube de verre ferme a une extremite et rempli de mercure etait plonge, extremite ouverte, dans un recipient de mercure, le mercure du tube s'arretait a une certaine hauteur en laissant un vide au-dessus.",
          "Torricelli a propose que la hauteur de la colonne de mercure etait equilibree par le poids de l'air exterieur. Cette idee a fourni le fondement experimental de l'idee que l'air a un poids mesurable, et donc une pression, et est consideree comme le point de depart de l'etude de la pression en tant que grandeur scientifique.",
          "En 1648, sur suggestion de Blaise Pascal, Florin Perier a mesure un barometre a differentes altitudes sur le puy de Dome et a montre que la pression atmospherique diminue avec l'altitude. Les travaux ulterieurs bases sur ces fondations ont apporte la coordination internationale des unites de mesure avec la Convention du Metre de 1875, la definition precise de l'atmosphere standard en 1954, et l'adoption du pascal dans le SI en 1971.",
        ],
      },
      {
        title: "Pression absolue, relative et differentielle",
        paragraphs: [
          "La pression absolue se mesure par rapport au vide total. Cette reference est la situation ou la pression est theoriquement nulle, et la pression absolue ne peut jamais etre negative. Les lois des gaz, les calculs thermodynamiques et certaines relations liees a la densite fonctionnent notamment avec la pression absolue.",
          "La pression relative (ou manometrique) se mesure par rapport a la pression atmospherique. La plupart des manometres de terrain prennent l'atmosphere ambiante comme reference zero ; la valeur lue a l'ecran est donc le plus souvent une pression relative. La relation entre pression absolue et pression relative s'ecrit P_abs = P_rel + P_atm.",
          "La pression differentielle est la difference de pression entre deux points. Dans des applications comme le colmatage d'un filtre, la mesure de debit via une plaque a orifice, la mise en surpression d'une piece ou la performance d'un echangeur de chaleur, on suit directement la difference de pression entre deux conduites ou deux volumes distincts. Cette grandeur n'est definie ni par rapport au vide total, ni par rapport a la seule atmosphere ; elle est directement la difference entre deux points.",
        ],
      },
      {
        title: "La pression atmospherique",
        paragraphs: [
          "La pression atmospherique est la pression exercee sur les surfaces par le poids de la colonne d'air de l'atmosphere terrestre. Dans des conditions standard proches du niveau de la mer, elle est consideree comme valant environ 101 325 Pa, soit 1 atm. Cette valeur n'est cependant pas constante ; elle varie avec l'altitude, les conditions meteorologiques et la temperature.",
          "Les barometres sont utilises pour mesurer la pression atmospherique. Les barometres a mercure ont historiquement servi d'instruments de reference, tandis que les capteurs de pression electroniques se sont generalises dans les applications modernes. La pression atmospherique est importante non seulement pour la meteorologie, mais aussi pour la technologie du vide, les systemes de combustion et les conversions entre pression relative et absolue.",
          "Dans les systemes fonctionnant en pression relative, les variations de la pression atmospherique peuvent affecter l'interpretation de la mesure. Par exemple, une pression relative de 2 bars au niveau de la mer et une pression relative de 2 bars en haute altitude ne donnent pas la meme valeur absolue. Cette distinction peut etre determinante, en particulier dans les calculs de compression, de densite des gaz et de point d'ebullition.",
        ],
      },
      {
        title: "La pression hydrostatique et la relation P = ρgh",
        paragraphs: [
          "Dans un fluide au repos, la pression augmente avec la profondeur. Sous l'hypothese d'une densite constante, la pression relative hydrostatique s'exprime approximativement par la relation P = ρgh. Ici, ρ represente la densite, g l'acceleration de la pesanteur, et h la hauteur de la colonne de fluide.",
          "Cette relation est particulierement utile pour les reservoirs d'eau, les cuves ouvertes, les barrages, la mesure de niveau et les manometres a colonne liquide. A une meme hauteur et dans un meme fluide, la pression est consideree comme egale ; la forme du recipient ne change pas le resultat. Ce qui est determinant, c'est la densite du fluide et la profondeur verticale par rapport a la surface libre.",
          "La pression hydrostatique absolue inclut non seulement l'augmentation ρgh, mais aussi la pression initiale a la surface libre. Dans un recipient ouvert, cette valeur initiale est generalement la pression atmospherique. Le calcul de la pression absolue doit donc ajouter non seulement l'augmentation due a la colonne de liquide, mais aussi la pression exterieure a la surface.",
        ],
      },
      {
        title: "Pression statique, dynamique et totale",
        paragraphs: [
          "La pression statique est la composante de pression representant l'etat thermodynamique local de l'ecoulement, du point de vue d'un observateur se deplacant avec le fluide. La plupart des points de mesure dans les canalisations, reservoirs et conduits suivent essentiellement la pression statique. La majorite des transmetteurs de pression sont concus pour mesurer cette grandeur.",
          "La pression dynamique exprime l'effet cinetique du a la vitesse de l'ecoulement et sa formule approximative courante est q = 1/2 ρv². Ce terme joue un role important dans l'approche de Bernoulli et est utilise dans des methodes de mesure de vitesse comme le tube de Pitot. Plus la vitesse augmente, plus la pression dynamique augmente.",
          "Dans l'approche d'ecoulement ideal, la pression totale est interpretee comme la somme de la pression statique et de la pression dynamique. Dans les systemes reels, cette distinction doit etre utilisee avec prudence en raison du frottement, de la turbulence, de la compressibilite et des pertes locales. Neanmoins, la distinction statique-totale-dynamique reste un langage d'ingenierie fondamental en ventilation, aerodynamique et mesures de procede.",
        ],
      },
      {
        title: "La hauteur de pression et la hauteur manometrique de pompe",
        paragraphs: [
          "La hauteur de pression exprime une pression donnee en termes de hauteur equivalente de colonne de fluide. La relation de base s'ecrit h = P / (ρg). Ainsi, une meme pression correspond a une hauteur differente selon la densite du fluide.",
          "Dans les systemes de pompage, la pression est le plus souvent interpretee non pas directement en pascals ou en bars, mais en metres de colonne de fluide. En effet, le role de la pompe n'est pas seulement de fournir de la pression au fluide, mais aussi de lui apporter l'energie necessaire pour compenser une certaine hauteur, des pertes de frottement et une composante de vitesse. C'est pourquoi la notion de hauteur manometrique est tres pratique du point de vue de l'ingenierie de terrain.",
          "La hauteur de pression et la hauteur geometrique ne sont pas la meme notion. Se fier uniquement a la lecture d'un manometre sans tenir compte des pertes de charge dans les tuyaux, de la charge de vitesse et des resistances locales peut entrainer des resultats errones dans le choix de la pompe et l'equilibrage du systeme. En particulier pour l'eau, l'huile et les fluides de procede, les differences de densite exigent une conversion effectuee avec soin.",
        ],
      },
      {
        title: "Pourquoi les unites de pression sont-elles differentes ?",
        paragraphs: [
          "La diversite des unites de pression s'explique en grande partie par des raisons historiques et sectorielles. Alors que le systeme SI prend le pascal comme reference, l'industrie continue d'utiliser le bar, la medecine le mmHg, la meteorologie le millibar, l'automobile le PSI, et certains anciens documents techniques l'atmosphere technique. Cette situation resulte du fait que differents domaines conservent leurs propres habitudes d'usage.",
          "Certaines unites paraissent plus intuitives a l'utilisateur. Par exemple, la pression d'un pneu peut sembler plus lisible exprimee en environ 35 psi plutot qu'en 240 kPa, et la pression d'un procede en 3,5 bar plutot qu'en 350 000 Pa. Le choix de l'unite ne depend donc pas seulement de la precision, mais aussi de la culture de reporting, de l'echelonnage des appareils et des habitudes de terrain.",
          "Cependant, comme differentes unites expriment la meme grandeur physique, une conversion soigneuse est indispensable dans les calculs communs. La confusion entre coefficients approximatifs et coefficients exactement definis, l'oubli de la distinction relatif-absolu, et la mauvaise lecture des symboles sont des sources d'erreur importantes.",
        ],
      },
      {
        title: "Comment mesure-t-on la pression ?",
        paragraphs: [
          "Pour mesurer la pression, il faut d'abord determiner le type de pression requis : absolue, relative ou differentielle. Ensuite, on evalue la plage de mesure, le type de fluide, la temperature, la compatibilite chimique, les vibrations et le niveau de precision requis. Un meme capteur peut ne pas convenir a toutes les applications.",
          "Pour les mesures de basse pression et de difference, des transmetteurs differentiels a diaphragme peuvent etre utilises ; pour les hautes pressions de procede, des elements a jauge de contrainte ou piezoresistifs ; et pour les applications sous vide, des capteurs absolus specifiques. Les manometres a colonne liquide sont tres utiles pour enseigner le principe de base ; mais dans l'industrie moderne, les appareils electroniques sont plus repandus.",
          "Pour une mesure precise, il faut tenir compte de l'emplacement des lignes d'impulsion, de la position de montage du capteur, du reglage du zero et des effets de temperature. Dans les conduites de gaz et de liquide, une difference de densite ou une condensation peut creer une charge hydrostatique supplementaire sur le capteur. C'est pourquoi les details d'installation determinent le resultat autant que le choix de l'appareil.",
        ],
      },
      {
        title: "Capteurs de pression et manometres",
        paragraphs: [
          "Les manometres mecaniques, comme les indicateurs a tube de Bourdon, convertissent la pression en un mouvement d'aiguille lisible via la deformation d'un element elastique. Robustes, simples et ne necessitant pas d'energie, ils sont utilises depuis longtemps dans l'industrie. Cependant, dans les applications necessitant precision et enregistrement de donnees, les capteurs electroniques sont plus flexibles.",
          "Les capteurs de pression electroniques peuvent etre piezoresistifs, capacitifs, a jauge de contrainte ou bases sur la resonance. Ces capteurs convertissent la variation de pression en signal electrique, transmis a des systemes PLC, SCADA ou d'acquisition de donnees. Cela permet non seulement une lecture instantanee, mais aussi des alarmes, du controle et de l'analyse de tendance.",
          "Les manometres differentiels donnent la difference de pression entre deux points, les capteurs absolus la pression par rapport au vide total, et les appareils manometriques la pression par rapport a l'atmosphere. Se fier uniquement a la valeur numerique sans verifier le type de reference sur la fiche technique d'un appareil peut conduire a de graves erreurs d'interpretation.",
        ],
      },
      {
        title: "Domaines d'utilisation de la pression en ingenierie",
        paragraphs: [
          "La pression est une variable de conception fondamentale dans de nombreux domaines de l'ingenierie : tuyauterie, CVC, hydraulique, pneumatique, procedes chimiques, centrales energetiques, systemes de distribution d'eau, automobile et aeronautique. De l'epaisseur de paroi d'un reservoir au choix des vannes, des conditions de sortie d'un compresseur a la performance d'un filtre, de nombreuses decisions reposent sur l'information de pression.",
          "En genie des procedes, les limites de pression sont surveillees pour l'exploitation en securite des reacteurs, chaudieres, echangeurs et separateurs. Les soupapes de securite, disques de rupture et boucles de controle sont donc des equipements critiques. La pression est egalement utilisee pour la mesure indirecte d'autres variables de procede comme le debit et le niveau.",
          "En genie mecanique et du batiment, la pression se combine avec les surfaces de contact et les forces des fluides dans les analyses de contrainte. En medecine et dans les dispositifs biomedicaux, la pression arterielle, les pressions de ventilation et les applications sous vide sont au premier plan ; en environnement et en meteorologie, ce sont les mesures de pression atmospherique et differentielle.",
        ],
      },
      {
        title: "Temperature, altitude et incertitude dans la mesure de pression",
        paragraphs: [
          "La temperature peut affecter a la fois les proprietes du fluide mesure et le comportement de l'element du capteur. En particulier pour les gaz, comme la temperature modifie la densite, la relation pression-volume-temperature doit etre reevaluee. C'est pourquoi les fiches techniques des capteurs mentionnent des parametres comme le decalage de zero et le decalage de gain dependant de la temperature.",
          "La pression atmospherique diminue generalement avec l'altitude. Cette situation modifie la relation entre pression relative et pression absolue, et peut aussi affecter le comportement de reference de certains appareils de terrain. Une meme condition de procede peut donner des resultats de pression absolue differents a des altitudes differentes.",
          "Toute mesure comporte une incertitude. La norme d'etalonnage, la resolution, l'hysteresis, l'effet de temperature, l'orientation de montage, les vibrations et la derive a long terme contribuent tous a l'incertitude totale. Dans les applications critiques, la decision de conception doit integrer non seulement la valeur nominale de pression, mais aussi la classe de l'appareil et la fiabilite de la mesure.",
        ],
      },
      {
        title: "La relation et la difference entre pression et contrainte",
        paragraphs: [
          "La pression et la contrainte partagent la meme structure dimensionnelle et peuvent toutes deux s'exprimer en pascals. Cette similitude vient du fait que les deux representent un effet de force par unite de surface. Mais cela ne signifie pas qu'il s'agit physiquement de la meme grandeur.",
          "La pression est generalement concue comme une contrainte normale isotrope exercee par les fluides ; c'est-a-dire que, dans un fluide au repos, la pression en un meme point est identique dans toutes les directions. La contrainte en mecanique des solides peut en revanche comporter des composantes normales et de cisaillement, dependre de la direction et avoir une structure tensorielle.",
          "Negliger cette distinction peut conduire a des interpretations erronees, notamment dans les calculs de paroi de reservoir, de surface de joint ou de resistance des materiaux. La pression interne d'un fluide cree des contraintes circonferentielles et axiales sur le reservoir ; mais le champ de contrainte dans le materiau du reservoir n'est pas identique a la pression du fluide elle-meme.",
        ],
      },
      {
        title: "Erreurs frequentes dans les calculs de pression",
        paragraphs: [
          "L'erreur la plus frequente consiste a confondre pression relative et pression absolue. En particulier dans les lois des gaz, les calculs de densite et les applications sous vide, la pression absolue est requise, mais la valeur relative lue sur un manometre est parfois utilisee directement. Cela cree une erreur systematique dans le resultat.",
          "Une autre erreur consiste a arrondir les coefficients de conversion ou a utiliser une reference d'unite incorrecte. Lors de la conversion entre PSI, bar, atm, mmHg et kPa, il faut decider du niveau de precision suffisant pour les valeurs approximatives. Si l'etalonnage de l'appareil exige une haute precision, l'utilisation d'un nombre insuffisant de decimales peut poser probleme.",
          "Negliger les effets hydrostatiques, ignorer la hauteur de montage du capteur et ne pas tenir compte de l'effet de la temperature sont egalement frequents. En particulier dans les lignes d'impulsion remplies de liquide, les reservoirs fermes et les applications de pression differentielle, des details d'installation apparemment mineurs peuvent modifier de maniere significative le resultat de la mesure.",
        ],
      },
    ],
    unitTable: [
      { name: "Pascal", symbol: "Pa", referenceValue: "1 Pa", system: "SI", commonUse: "Calculs scientifiques et d'ingenierie" },
      { name: "Kilopascal", symbol: "kPa", referenceValue: "1 000 Pa", system: "SI", commonUse: "Installations, pneus et pression de procede" },
      { name: "Bar", symbol: "bar", referenceValue: "100 000 Pa", system: "Metrique, hors SI", commonUse: "Industrie, compresseurs et systemes de procede" },
      { name: "Millibar", symbol: "mbar", referenceValue: "100 Pa", system: "Metrique, hors SI", commonUse: "Meteorologie et mesures atmospheriques" },
      { name: "Atmosphere standard", symbol: "atm", referenceValue: "101 325 Pa", system: "Hors SI", commonUse: "Atmosphere et conditions de reference" },
      { name: "PSI", symbol: "psi", referenceValue: "≈ 6894,757293 Pa", system: "Britannique/americain", commonUse: "Pneus, systemes hydrauliques et pneumatiques" },
      { name: "Atmosphere technique", symbol: "at", referenceValue: "98 066,5 Pa", system: "Hors SI", commonUse: "Anciennes applications techniques et d'ingenierie" },
      { name: "Millimetre de mercure", symbol: "mmHg", referenceValue: "≈ 133,322 Pa", system: "Hors SI", commonUse: "Medecine, vide et mesures de pression" },
      { name: "Millimetre de colonne d'eau", symbol: "mmH₂O", referenceValue: "≈ 9,80665 Pa", system: "Hors SI", commonUse: "Mesures de basse pression et de ventilation" },
      { name: "Kilogramme-force par centimetre carre", symbol: "kgf/cm²", referenceValue: "98 066,5 Pa", system: "Metrique, hors SI", commonUse: "Anciens manometres de pompes et chaudieres" },
    ],
  },
  {
    locale: "fr",
    slug: "energie",
    sourceSlug: "enerji",
    category: "enerji",
    title: "Conversion des unites d'energie",
    description:
      "Comparez sur une seule categorie les conversions d'energie basees sur le joule, le kilowattheure, la calorie et le BTU.",
    introduction: [
      "L'energie est la grandeur physique fondamentale exprimant la capacite d'un systeme a produire un travail. Dans le systeme international d'unites, l'unite derivee de l'energie est le joule, obtenu a partir du produit d'une force et d'un deplacement.",
      "Au quotidien, on utilise le kilowattheure (kWh) pour les factures d'electricite, la calorie/kilocalorie pour l'alimentation, le BTU pour les systemes de chauffage, le therm pour la facturation du gaz naturel, et l'electronvolt en physique des particules subatomiques.",
    ],
    facts: [
      { label: "Grandeur physique", value: "Energie (travail)" },
      { label: "Symbole dimensionnel", value: "[ML²T⁻²]" },
      { label: "Unite derivee SI", value: "Joule" },
      { label: "Symbole de l'unite SI", value: "J" },
      { label: "Definition du joule", value: "1 J = deplacement de 1 metre sous une force de 1 newton (1 N·m)" },
    ],
    sections: [
      {
        title: "Qu'est-ce que l'energie ?",
        paragraphs: [
          "L'energie est la capacite d'un objet ou d'un systeme a produire un travail. Elle peut exister sous de nombreuses formes -- energie cinetique (mouvement), energie potentielle (position), energie thermique, energie chimique et energie electrique -- et, selon le principe de conservation de l'energie, peut se transformer d'une forme a une autre sans que sa quantite totale n'apparaisse ni ne disparaisse.",
          "L'energie est une grandeur derivee, obtenue par le produit d'une force et d'un deplacement (travail), et sa dimension SI est notee ML²T⁻² (masse × longueur au carre / temps au carre).",
        ],
      },
      {
        title: "L'unite SI de l'energie : le joule",
        paragraphs: [
          "Le joule est l'unite derivee SI de l'energie, symbolise par J ; il est nomme en l'honneur du physicien britannique du XIXe siecle James Prescott Joule. Un joule equivaut a l'energie necessaire pour deplacer un objet de 1 metre sous l'effet d'une force de 1 newton.",
          "Comme le joule reste une unite tres petite pour exprimer de nombreuses quantites d'energie quotidiennes, ses multiples -- le kilojoule (mille joules) et le megajoule (un million de joules) -- sont plus souvent preferes en ingenierie et dans l'usage courant.",
        ],
      },
      {
        title: "Le kilowattheure : l'unite des factures d'electricite",
        paragraphs: [
          "Le kilowattheure (kWh) est la quantite d'energie consommee par une puissance d'un kilowatt utilisee pendant une heure, et constitue l'unite standard de la facturation electrique dans le monde entier. 1 kWh equivaut exactement a 3 600 000 joules (3,6 megajoules).",
          "Pour calculer la consommation d'energie d'un appareil electrique, il suffit de multiplier sa puissance (en watts) par sa duree de fonctionnement (en heures) ; par exemple, un appareil de 2000 watts fonctionnant 3 heures consomme 6 kWh d'energie.",
        ],
      },
      {
        title: "La calorie et la kilocalorie : l'energie en nutrition",
        paragraphs: [
          "La calorie a ete definie a l'origine comme la quantite d'energie necessaire pour elever d'un degre Celsius la temperature d'un gramme d'eau, et 1 calorie equivaut exactement a 4,184 joules.",
          "La valeur « calorie » indiquee sur les etiquettes alimentaires est en realite, au sens scientifique, une kilocalorie (1000 calories) -- cette convention de denomination en nutrition (« Calorie » avec une majuscule) prete souvent a confusion ; lorsqu'un aliment est annonce comme contenant « 200 calories », il s'agit en realite de 200 kilocalories (200 000 calories).",
        ],
      },
      {
        title: "Le BTU et le therm : l'energie du chauffage et du gaz naturel",
        paragraphs: [
          "Le BTU (British Thermal Unit) est la quantite d'energie necessaire pour elever d'un degre Fahrenheit la temperature d'une livre d'eau ; c'est une unite d'origine americaine mais largement utilisee dans le monde pour exprimer la capacite des systemes de chauffage et de climatisation. 1 BTU equivaut a environ 1055,06 joules.",
          "Le therm est une grande unite d'energie utilisee pour la facturation du gaz naturel et equivaut exactement a 100 000 BTU. Dans certains pays, la consommation de gaz naturel est facturee directement en therms plutot qu'en metres cubes.",
        ],
      },
      {
        title: "L'electronvolt : l'unite du monde subatomique",
        paragraphs: [
          "L'electronvolt (eV) exprime l'energie cinetique acquise par un electron traversant une difference de potentiel d'un volt ; c'est une unite d'energie extremement petite (1 eV ≈ 1,602176634 × 10⁻¹⁹ joule).",
          "En physique des particules et en physique atomique, les energies sont generalement exprimees en electronvolts (et en ses multiples keV, MeV, GeV) plutot qu'en joules, car a cette echelle le joule conduit a des nombres extremement petits et peu pratiques.",
        ],
      },
      {
        title: "Le principe de conservation de l'energie",
        paragraphs: [
          "Selon le principe de conservation de l'energie, aussi connu comme premier principe de la thermodynamique, l'energie totale d'un systeme ferme reste constante ; l'energie ne peut etre ni creee ni detruite, seulement transformee d'une forme a une autre.",
          "Par exemple, dans le moteur d'une voiture, l'energie chimique (carburant) se transforme d'abord en energie thermique, puis en energie mecanique (mouvement) ; bien qu'une partie de l'energie se transforme dans ce processus en chaleur inutilisable par frottement et par l'echappement, la quantite totale d'energie ne change pas.",
        ],
      },
      {
        title: "Pourquoi la conversion entre unites d'energie est-elle importante ?",
        paragraphs: [
          "Differents secteurs preferent traditionnellement des unites d'energie differentes : le genie electrique le kilowattheure, la science de la nutrition la kilocalorie, le secteur CVC le BTU, et le secteur du gaz naturel le therm. Pouvoir convertir correctement entre ces differentes unites est essentiel pour comparer l'efficacite energetique et calculer les couts.",
          "Par exemple, pour comparer l'efficacite d'une pompe a chaleur avec celle d'une chaudiere a gaz naturel, il faut convertir la consommation d'energie des deux systemes vers une unite commune (generalement le kWh ou le joule).",
        ],
      },
    ],
    unitTable: [
      { name: "Joule", symbol: "J", referenceValue: "1 J", system: "SI", commonUse: "Calculs scientifiques et physiques d'energie" },
      { name: "Kilojoule", symbol: "kJ", referenceValue: "1000 J", system: "SI/metrique", commonUse: "Energie alimentaire (dans certains pays)" },
      { name: "Megajoule", symbol: "MJ", referenceValue: "1 000 000 J", system: "SI/metrique", commonUse: "Carburant et grandes quantites d'energie" },
      { name: "Calorie", symbol: "cal", referenceValue: "4,184 J", system: "Metrique (traditionnel)", commonUse: "Nutrition et chimie" },
      { name: "Kilocalorie", symbol: "kcal", referenceValue: "4184 J", system: "Metrique (traditionnel)", commonUse: "Etiquettes alimentaires (« calories »)" },
      { name: "Wattheure", symbol: "Wh", referenceValue: "3600 J", system: "Metrique (electricite)", commonUse: "Consommation des petits appareils" },
      { name: "Kilowattheure", symbol: "kWh", referenceValue: "3 600 000 J", system: "Metrique (electricite)", commonUse: "Facturation electrique" },
      { name: "BTU", symbol: "Btu", referenceValue: "≈1055,06 J", system: "Britannique/americain", commonUse: "Capacite de climatisation et de chauffage" },
      { name: "Therm", symbol: "th", referenceValue: "≈105 506 000 J", system: "Britannique/americain", commonUse: "Facturation du gaz naturel" },
      { name: "Electronvolt", symbol: "eV", referenceValue: "≈1,602 × 10⁻¹⁹ J", system: "Physique atomique/des particules", commonUse: "Mesure de l'energie atomique et nucleaire" },
    ],
  },
  {
    locale: "fr",
    slug: "stockage-de-donnees",
    sourceSlug: "veri",
    category: "veri",
    title: "Conversion des unites de stockage de donnees",
    description:
      "Convertissez entre octets, kilooctets, megaoctets, gigaoctets et teraoctets ; comparez les calculs bases sur 1000 et 1024.",
    introduction: [
      "L'unite de stockage de donnees (information) exprime la quantite d'information stockee ou traitee dans un systeme informatique. L'unite la plus fondamentale est le bit ; huit bits reunis forment un octet.",
      "Lorsqu'on parle de stockage et de vitesse internet, on rencontre aussi bien des unites decimales (base 1000) comme le kilooctet, le megaoctet, le gigaoctet et le teraoctet, que des unites binaires (base 1024) comme le kibioctet, le mebioctet et le gibioctet utilisees par les systemes d'exploitation -- la difference entre ces deux systemes est la principale raison pour laquelle un disque achete parait « manquer » d'espace.",
    ],
    facts: [
      { label: "Plus petite unite", value: "Bit (0 ou 1)" },
      { label: "Unite de base", value: "Octet (Byte) = 8 bits" },
      { label: "Systeme decimal (SI)", value: "1 Ko = 1000 octets, 1 Mo = 1000 Ko" },
      { label: "Systeme binaire (IEC)", value: "1 Kio = 1024 octets, 1 Mio = 1024 Kio" },
      { label: "Difference entre 1000 et 1024", value: "≈7,4 % d'ecart entre 1 Go (decimal) et 1 Gio (binaire)" },
    ],
    sections: [
      {
        title: "Qu'est-ce qu'un bit et un octet ?",
        paragraphs: [
          "Le bit (binary digit) est la plus petite unite d'information qu'un ordinateur puisse traiter et ne peut prendre que deux valeurs : 0 ou 1. Huit bits reunis forment un octet ; un octet peut representer 256 (2⁸) valeurs differentes -- suffisant, par exemple, pour coder un caractere de texte.",
          "Le bit est generalement abrege par un « b » minuscule et l'octet par un « o » (ou « B » en anglais) majuscule ; cette distinction peut preter a confusion, notamment entre les vitesses internet (Mbps = megabits/seconde) et les tailles de fichiers (Mo = megaoctets) -- une connexion internet de 100 Mbps correspond theoriquement a une vitesse de telechargement d'environ 12,5 Mo par seconde (100 ÷ 8).",
        ],
      },
      {
        title: "Pourquoi existe-t-il deux systemes d'unites differents ?",
        paragraphs: [
          "Les ordinateurs fonctionnant en systeme binaire, l'adressage memoire est naturellement lie a des puissances de 2 (comme 1024, 1 048 576). C'est pourquoi le monde du logiciel a historiquement entendu par « kilooctet » 1024 octets.",
          "Les fabricants de disques preferent, pour des raisons de marketing et de simplicite de calcul, le prefixe SI decimal (base 1000) -- un disque annonce comme « 1 To » par un fabricant contient en realite exactement 1 000 000 000 000 octets, mais comme le systeme d'exploitation le calcule en base 1024, il affiche a l'ecran un nombre plus petit, comme « 931 Go ».",
        ],
      },
      {
        title: "La norme IEC : Kio, Mio, Gio",
        paragraphs: [
          "Pour resoudre cette confusion, la Commission Electrotechnique Internationale (CEI) a standardise en 1998 des noms distincts (kibioctet, mebioctet, gibioctet, tebioctet) et des symboles (Kio, Mio, Gio, Tio) pour les unites en base binaire.",
          "Selon cette norme, les prefixes traditionnels comme Ko/Mo/Go devraient etre reserves au sens decimal (base 1000), et les prefixes « binaires » comme Kio/Mio/Gio preferes pour les valeurs en base 1024. Cependant, dans l'usage quotidien et dans de nombreux logiciels, cette distinction n'est toujours pas appliquee de maniere coherente.",
        ],
      },
      {
        title: "Pourquoi l'ecart entre 1000 et 1024 s'accroit-il ?",
        paragraphs: [
          "Alors que l'ecart entre 1000 et 1024 n'est que de 2,4 % au niveau du kilooctet, cet ecart croit a chaque unite superieure : environ 4,9 % au niveau du megaoctet, environ 7,4 % au niveau du gigaoctet, et jusqu'a environ 10 % au niveau du teraoctet.",
          "C'est pourquoi, pour les grandes capacites de stockage (comme un disque d'1 To), l'ecart entre le calcul decimal et le calcul binaire devient suffisamment important pour donner a l'utilisateur l'impression visible d'un « espace manquant » (un ecart d'environ 90 Go).",
        ],
      },
      {
        title: "Les unites de stockage basees sur le bit : kilobit, megabit, gigabit",
        paragraphs: [
          "Les fournisseurs d'acces internet expriment generalement la vitesse de connexion en unites basees sur le bit (kilobits/seconde, megabits/seconde, gigabits/seconde) ; c'est une tradition historique du genie des reseaux.",
          "Comme les utilisateurs attendent generalement la vitesse de telechargement d'un fichier en octets (Mo/seconde), ignorer qu'une connexion « 100 Mbps » a une vitesse de telechargement reelle d'environ 12,5 Mo/seconde peut conduire a l'illusion trompeuse que la connexion est « lente ».",
        ],
      },
      {
        title: "Les tailles de donnees au quotidien",
        paragraphs: [
          "Un document texte (une page) fait typiquement quelques kilooctets, une photo compressee (JPEG) quelques megaoctets, et un fichier musical compresse (MP3) en moyenne 3 a 5 megaoctets.",
          "Un film en definition standard (HD) peut occuper environ 1 a 4 gigaoctets, et un film en resolution 4K environ 15 a 25 gigaoctets ; ces differences varient selon la resolution et la methode de compression.",
        ],
      },
      {
        title: "L'histoire de l'unite de stockage de donnees",
        paragraphs: [
          "Le premier disque dur introduit par IBM en 1956 (le RAMAC 305) avait une capacite d'environ 3,75 megaoctets et occupait la taille d'une piece entiere. Aujourd'hui, une carte microSD peut contenir des millions de fois cette capacite dans la taille d'une paume de main.",
          "Cette enorme augmentation de capacite est etroitement liee non seulement aux progres de la technologie de stockage (comme le passage des disques magnetiques a la memoire flash), mais aussi a la baisse continue du cout par unite.",
        ],
      },
    ],
    unitTable: [
      { name: "Bit", symbol: "bit", referenceValue: "0,125 octet", system: "Binaire", commonUse: "Vitesse reseau (bps, Mbps)" },
      { name: "Octet", symbol: "o", referenceValue: "1 octet (8 bits)", system: "Unite de base", commonUse: "Unite de base de la taille des fichiers" },
      { name: "Kilooctet", symbol: "Ko", referenceValue: "1000 octets", system: "Decimal (SI)", commonUse: "Documents texte" },
      { name: "Kibioctet", symbol: "Kio", referenceValue: "1024 octets", system: "Binaire (IEC)", commonUse: "Affichage memoire du systeme d'exploitation" },
      { name: "Megaoctet", symbol: "Mo", referenceValue: "1 000 000 octets", system: "Decimal (SI)", commonUse: "Fichiers photo et musicaux" },
      { name: "Mebioctet", symbol: "Mio", referenceValue: "1 048 576 octets", system: "Binaire (IEC)", commonUse: "Capacite de memoire vive (RAM)" },
      { name: "Gigaoctet", symbol: "Go", referenceValue: "1 000 000 000 octets", system: "Decimal (SI)", commonUse: "Capacite de disque (etiquette fabricant)" },
      { name: "Gibioctet", symbol: "Gio", referenceValue: "1 073 741 824 octets", system: "Binaire (IEC)", commonUse: "Affichage disque du systeme d'exploitation" },
      { name: "Teraoctet", symbol: "To", referenceValue: "1 000 000 000 000 octets", system: "Decimal (SI)", commonUse: "Stockage a grand volume" },
      { name: "Petaoctet", symbol: "Po", referenceValue: "1 000 000 000 000 000 octets", system: "Decimal (SI)", commonUse: "Centre de donnees et stockage en nuage" },
    ],
  },
  {
    locale: "fr",
    slug: "electricite",
    sourceSlug: "elektrik",
    category: "elektrik",
    title: "Conversion des unites electriques",
    description:
      "Convertissez les grandeurs electriques de base entre volt, kilovolt, ampere et milliampere ; consultez des valeurs d'exemple.",
    introduction: [
      "L'electricite est un vaste domaine compose de grandeurs physiques liees mais distinctes, comme la tension (difference de potentiel) et le courant (flux de charge). Cette categorie reunit les deux grandeurs de base les plus frequemment rencontrees dans les travaux electriques quotidiens : le volt (tension) et l'ampere (courant).",
      "La tension et le courant ne sont pas la meme grandeur physique et ne peuvent pas etre directement convertis l'un en l'autre ; leur relation s'etablit par la loi d'Ohm (V = I × R), en fonction de la resistance du circuit. Les conversions de cette page traitent chaque grandeur separement (volt-kilovolt, ampere-milliampere, etc.).",
    ],
    facts: [
      { label: "Nom de l'unite de tension", value: "Volt (en l'honneur d'Alessandro Volta)" },
      { label: "Nom de l'unite de courant", value: "Ampere (en l'honneur d'Andre-Marie Ampere)" },
      { label: "Unite de base SI (courant)", value: "Ampere (A) -- l'une des 7 unites de base du SI" },
      { label: "Relation tension-courant-resistance", value: "Loi d'Ohm : V = I × R" },
      { label: "Tension secteur en France", value: "230 V (monophase), 400 V (triphase)" },
    ],
    sections: [
      {
        title: "Qu'est-ce que la tension (volt) ?",
        paragraphs: [
          "La tension (voltage) exprime la difference de potentiel electrique entre deux points d'un circuit electrique ; elle peut etre consideree comme la « force motrice » permettant aux electrons de circuler d'un point a un autre. Son unite SI est le volt (V).",
          "L'unite volt est nommee en l'honneur du physicien italien Alessandro Volta, inventeur de la pile electrique. Des valeurs comme « 1,5 V » ou « 9 V » indiquees sur une pile expriment la difference de potentiel que cette pile peut fournir.",
        ],
      },
      {
        title: "Qu'est-ce que le courant (ampere) ?",
        paragraphs: [
          "Le courant electrique exprime la quantite de charge electrique traversant un conducteur par unite de temps, et son unite SI est l'ampere (A). Un ampere correspond au passage d'environ 6,242 × 10¹⁸ electrons par un point donne, chaque seconde.",
          "L'unite ampere est nommee en l'honneur du physicien francais Andre-Marie Ampere, l'un des fondateurs de l'electromagnetisme. L'ampere etait, avant la revision du SI de 2019, l'une des unites de base du SI ; il continue d'etre considere comme une grandeur fondamentale, mais est desormais defini a partir de la constante de charge elementaire (e).",
        ],
      },
      {
        title: "Pourquoi la tension et le courant ne peuvent-ils pas etre convertis l'un en l'autre ?",
        paragraphs: [
          "La tension (V) et le courant (A) sont des grandeurs physiques differentes -- l'une exprime une difference de potentiel, l'autre la vitesse d'un flux de charge. C'est pourquoi la question « combien d'amperes fait X volts » n'a pas de reponse a elle seule, sans connaitre la resistance (ou la puissance) du circuit.",
          "La relation entre les deux s'etablit par la loi d'Ohm : V = I × R (Tension = Courant × Resistance). Par exemple, une tension de 12 volts traversant une resistance de 4 ohms produit un courant de 3 amperes ; mais ces memes 12 volts appliques a une resistance differente produisent une valeur de courant totalement differente.",
        ],
      },
      {
        title: "La relation entre puissance, tension et courant",
        paragraphs: [
          "La puissance electrique (watt) est egale au produit de la tension et du courant : P = V × I. Cette formule montre qu'un appareil de meme puissance consommera moins de courant sous haute tension et plus de courant sous basse tension.",
          "Cette relation explique pourquoi les reseaux de distribution electrique fonctionnent en haute tension : transporter la meme puissance avec un courant plus faible reduit considerablement les pertes d'energie dues a la resistance des lignes de transmission (echauffement par effet Joule).",
        ],
      },
      {
        title: "La tension secteur en France et dans le monde",
        paragraphs: [
          "En France, la tension secteur standard des installations residentielles est de 230 volts pour le monophase, et de 400 volts pour les systemes triphases utilises dans les installations industrielles et commerciales (a une frequence de 50 Hz).",
          "Dans le monde, la tension secteur varie selon les pays ; les Etats-Unis et le Canada utilisent 120 volts, tandis que la plupart des pays europeens, dont la France, preferent 230 volts. Cette difference est la principale raison pour laquelle les appareils electriques rapportes de l'etranger ne peuvent pas etre utilises directement sans convertisseur.",
        ],
      },
      {
        title: "Courant continu (DC) et courant alternatif (AC)",
        paragraphs: [
          "En courant continu (DC), les electrons circulent de maniere constante dans une seule direction -- les piles et les panneaux solaires produisent du DC. En courant alternatif (AC), la direction du courant s'inverse a une frequence determinee chaque seconde (50 Hz en France, soit 50 fois par seconde) -- l'electricite du secteur est en AC.",
          "La principale raison pour laquelle l'AC est preferee pour la distribution en reseau est qu'elle permet d'elever ou d'abaisser facilement la tension a l'aide de transformateurs ; cela rend possible le transport de l'electricite sur de longues distances avec de faibles pertes.",
        ],
      },
      {
        title: "L'effet du courant electrique sur le corps humain",
        paragraphs: [
          "L'intensite du courant traversant le corps humain determine l'effet ressenti : environ 1 milliampere est a peine perceptible, 10 a 20 milliamperes peuvent provoquer une contraction musculaire (incapacite a lacher prise), et plus de 100 milliamperes peuvent entrainer un trouble du rythme cardiaque (fibrillation) et la mort.",
          "C'est pourquoi, en securite electrique, ce n'est pas seulement la tension qui est determinante, mais aussi l'intensite du courant susceptible de se former dans le circuit -- meme dans un environnement a basse tension mais a faible resistance (par exemple humide), un courant dangereux peut se former.",
        ],
      },
    ],
    unitTable: [
      { name: "Millivolt", symbol: "mV", referenceValue: "0,001 V", system: "SI/metrique", commonUse: "Capteurs et signaux bioelectriques" },
      { name: "Volt", symbol: "V", referenceValue: "1 V", system: "SI", commonUse: "Piles, tension secteur et de circuit" },
      { name: "Kilovolt", symbol: "kV", referenceValue: "1000 V", system: "SI/metrique", commonUse: "Lignes de transport haute tension" },
      { name: "Milliampere", symbol: "mA", referenceValue: "0,001 A", system: "SI/metrique", commonUse: "Courants de circuits electroniques" },
      { name: "Ampere", symbol: "A", referenceValue: "1 A", system: "SI", commonUse: "Installations domestiques et courant des appareils" },
      { name: "Kiloampere", symbol: "kA", referenceValue: "1000 A", system: "SI/metrique", commonUse: "Courants de court-circuit et industriels" },
    ],
  },
  {
    locale: "fr",
    slug: "carat-or",
    sourceSlug: "altin-ayar",
    category: "altin_ayar",
    title: "Conversion des carats d'or",
    description:
      "Convertissez entre l'or 24, 22, 18 et 14 carats selon la quantite d'or pur ; decouvrez la purete et les usages de chaque carat.",
    introduction: [
      "Comme l'argent, l'or n'est presque jamais utilise pur dans la fabrication de bijoux, car c'est un metal tres mou et facilement raye -- on l'allie donc a d'autres metaux comme l'argent ou le cuivre. Le carat est la mesure indiquant la proportion d'or pur dans cet alliage.",
      "L'echelle fonctionne sur une base de 24 : 24 carats signifie de l'or entierement pur (100 %), 18 carats signifie que 18/24 de l'alliage (environ 75 %) est de l'or pur. La conversion ici ne consiste pas a « exprimer la meme grandeur physique dans une unite differente », mais a « trouver l'equivalent en grammes d'un meme alliage a un taux de purete different ».",
    ],
    facts: [
      { label: "Systeme de mesure", value: "Standard de purete de la bijouterie (carat)" },
      { label: "Reference de base", value: "24 carats = 100 % d'or pur" },
      { label: "Carat le plus repandu en Turquie", value: "22 carats (bracelet, bijouterie traditionnelle)" },
      { label: "Usage quotidien international", value: "18 carats (bague, collier)" },
      { label: "Logique de calcul", value: "Grammes × (carat source / 24) ÷ (carat cible / 24)" },
    ],
    sections: [
      {
        title: "Que mesure exactement le carat ?",
        paragraphs: [
          "Le carat indique quelle proportion du poids d'une piece d'or est reellement de l'or. 24 carats est de l'or pur ; 22, 18 et 14 carats sont des formes d'or respectivement melangees a de l'argent ou du cuivre, et donc plus dures et moins pures.",
          "On peut ainsi dire qu'un bracelet 22 carats contient une teneur en or pur legerement inferieure a celle du 24 carats, mais qu'il est plus resistant -- c'est pourquoi les bijoutiers preferent generalement le 22 carats pour les bracelets, et le 18 carats pour les bagues et colliers.",
        ],
      },
      {
        title: "Comment calcule-t-on la teneur en or pur ?",
        paragraphs: [
          "Pour determiner la quantite d'or pur contenue dans un bracelet de 10 grammes en 22 carats : 10 × (22 / 24) = 9,17 grammes d'or pur (equivalent 24 carats). Les 0,83 gramme restants sont d'autres metaux ajoutes pour la resistance.",
          "Inversement, si un bijoutier fondait ces 9,17 grammes d'or pur pour les refaconner en 18 carats : 9,17 ÷ (18 / 24) = 12,22 grammes d'alliage total seraient obtenus -- car, le taux d'or pur etant plus faible en 18 carats, la meme quantite d'or pur se repartit sur un poids total plus grand.",
        ],
      },
      {
        title: "A quoi sert chaque carat ?",
        paragraphs: [
          "En raison de sa mollesse, le 24 carats est pratiquement inutilise dans la bijouterie quotidienne ; il est plutot prefere pour les lingots et les produits d'investissement. Le 22 carats est le standard du bracelet et de la bijouterie traditionnelle en Turquie et au Moyen-Orient.",
          "Le 18 carats, grace a sa haute resistance, est repandu dans le monde entier pour les bijoux d'usage quotidien comme les bagues et colliers sertis de diamants. Le 14 carats, plus economique et encore plus resistant, est frequent notamment sur les marches americain et europeen.",
        ],
      },
    ],
    unitTable: [
      { name: "Or 24 carats", symbol: "24K", referenceValue: "100 % d'or pur", system: "Standard de bijouterie", commonUse: "Lingots, or d'investissement" },
      { name: "Or 22 carats", symbol: "22K", referenceValue: "91,6 % d'or pur (22/24)", system: "Standard de bijouterie", commonUse: "Bracelet, bijouterie traditionnelle" },
      { name: "Or 18 carats", symbol: "18K", referenceValue: "75 % d'or pur (18/24)", system: "Standard de bijouterie", commonUse: "Bague, collier, bijou quotidien" },
      { name: "Or 14 carats", symbol: "14K", referenceValue: "58,3 % d'or pur (14/24)", system: "Standard de bijouterie", commonUse: "Bijouterie economique, marche US/Europe" },
    ],
  },
  {
    locale: "fr",
    slug: "carat-argent",
    sourceSlug: "gumus-ayar",
    category: "gumus_ayar",
    title: "Conversion des titres d'argent",
    description:
      "Convertissez en grammes d'argent pur les titres 999, 925 (sterling), 900 et 800 ; decouvrez le systeme des milliemes et ses usages en bijouterie.",
    introduction: [
      "Comme l'or, l'argent n'est presque jamais utilise pur pour fabriquer des bijoux ou des objets, car c'est un metal tendre que l'on allie a d'autres metaux comme le cuivre. Le millieme est la mesure indiquant la proportion d'argent pur dans cet alliage.",
      "Contrairement au titrage de l'or exprime sur une base de 24, la purete de l'argent est exprimee sur une base de 1000 (millieme) : 999 correspond a un argent quasiment pur, tandis que 925 est le titre le plus repandu au monde, connu sous le nom d'« argent sterling ».",
    ],
    facts: [
      { label: "Systeme de mesure", value: "Systeme des milliemes" },
      { label: "Reference principale", value: "999 = 99,9 % d'argent pur" },
      { label: "Titre de bijouterie le plus repandu", value: "925 (argent sterling)" },
      { label: "Argent d'investissement/lingot", value: "Titre 999 (argent fin)" },
      { label: "Regle de calcul", value: "Grammes × (millieme source / 1000) ÷ (millieme cible / 1000)" },
    ],
    sections: [
      {
        title: "Que mesure vraiment le titre de l'argent (millieme) ?",
        paragraphs: [
          "Contrairement a l'or, la purete de l'argent n'est pas exprimee sur 24 unites mais en milliemes (base 1000). Un titre de 999 signifie 999 parts pour mille (soit 99,9 %) d'argent pur dans l'alliage ; le millieme restant correspond generalement a de faibles traces d'autres elements.",
          "Le titre 925 (argent sterling) signifie que l'alliage contient 92,5 % d'argent pur, le reste (7,5 %) etant generalement du cuivre. Cette faible quantite de cuivre apporte de la solidite a l'argent pur, naturellement tres tendre et facilement deformable.",
        ],
      },
      {
        title: "Pourquoi l'argent sterling (925) est-il la norme mondiale ?",
        paragraphs: [
          "L'histoire du standard de l'argent sterling (925) remonte a l'Angleterre du XIIe siecle, et il est devenu au fil du temps la norme la plus largement acceptee dans le monde pour la bijouterie, l'orfevrerie de table et les objets en argent.",
          "L'argent pur (999) est trop tendre pour les objets d'usage quotidien et se raye facilement ; l'ajout de 7,5 % de cuivre confere a l'argent une durete suffisante tout en preservant en grande partie son eclat et sa couleur caracteristiques.",
        ],
      },
      {
        title: "Difference entre les titres 999, 900 et 800",
        paragraphs: [
          "Le titre 999 (argent fin/pur) est privilegie pour les lingots et les produits d'investissement, car le taux de purete est le critere le plus important pour les investisseurs ; mais sa tendrete le rend peu utilise pour la bijouterie quotidienne.",
          "Le titre 900 (argent de monnaie) a ete historiquement utilise dans les pieces d'argent de nombreux pays. Le titre 800, courant notamment en Europe (Allemagne, Autriche), est un standard de bijouterie moins pur que l'argent sterling mais tout de meme durable.",
        ],
      },
      {
        title: "Comment calculer la quantite d'argent pur ?",
        paragraphs: [
          "Pour determiner la quantite d'argent pur d'une bague en argent de 10 grammes titrant 925 : 10 × (925 / 1000) = 9,25 grammes d'argent pur. Les 0,75 gramme restants sont du cuivre ou d'autres metaux ajoutes pour la solidite.",
          "La meme logique s'applique pour convertir entre differents titres : connaissant la quantite d'argent pur d'un alliage a 925, on obtient son equivalent en titre 999 en divisant cette quantite par 999/1000.",
        ],
      },
      {
        title: "Le lien entre le ternissement de l'argent et sa purete",
        paragraphs: [
          "Le ternissement d'un bijou en argent avec le temps n'est pas du a l'argent lui-meme, mais a la reaction du cuivre de l'alliage avec les composes soufres de l'air. Un argent plus pur (comme le titre 999) a donc tendance a ternir moins facilement.",
          "Certains fabricants ont mis au point des alliages « anti-ternissement » pour ameliorer la resistance au ternissement de l'argent sterling, en utilisant d'autres elements comme le germanium a la place du cuivre.",
        ],
      },
    ],
    unitTable: [
      { name: "Argent 999", symbol: "999", referenceValue: "99,9 % d'argent pur", system: "Standard de bijouterie", commonUse: "Lingots, argent d'investissement" },
      { name: "Argent 925", symbol: "925", referenceValue: "92,5 % d'argent pur (sterling)", system: "Standard de bijouterie", commonUse: "Bijouterie et orfevrerie de table (standard mondial)" },
      { name: "Argent 900", symbol: "900", referenceValue: "90 % d'argent pur", system: "Standard de bijouterie", commonUse: "Pieces d'argent historiques" },
      { name: "Argent 800", symbol: "800", referenceValue: "80 % d'argent pur", system: "Standard de bijouterie (Europe)", commonUse: "Standard de bijouterie europeen" },
    ],
  },
];

export function findFrenchCategoryPage(slug: string) {
  return frenchCategoryPages.find((page) => page.slug === slug);
}

export function findFrenchCategoryPageByTurkishSlug(sourceSlug: string) {
  return frenchCategoryPages.find((page) => page.sourceSlug === sourceSlug);
}
