// Páginas de categoria em português brasileiro — integradas ao sistema i18n.
// Arquivo independente (não modifica os arquivos existentes
// de tr/en/de/ar/uz/bn/fr/es).
//
// Escopo limitado aos 17 elementos que formam a identidade do site:
// 13 categorias fundamentais e 4 ferramentas universais na página inicial.
// Sem calculadoras científicas nem cotidianas. Conteúdo traduzido com a mesma profundidade dos artigos
// fonte em TR (app/converter/categoryArticles.ts e
// app/converter/articles/*/Article.ts).

export type LocalizedPortugueseCategoryFact = {
  label: string;
  value: string;
};

export type LocalizedPortugueseCategorySection = {
  title: string;
  paragraphs: string[];
};

export type LocalizedPortugueseCategoryUnitRow = {
  name: string;
  symbol: string;
  referenceValue: string;
  system: string;
  commonUse: string;
};

export type LocalizedPortugueseCategoryPage = {
  locale: "pt";
  slug: string;
  sourceSlug: string;
  category: string;
  title: string;
  description: string;
  introduction: string[];
  facts: LocalizedPortugueseCategoryFact[];
  sections: LocalizedPortugueseCategorySection[];
  unitTable: LocalizedPortugueseCategoryUnitRow[];
};

export const portugueseCategoryPages: LocalizedPortugueseCategoryPage[] = [
  {
    locale: "pt",
    slug: "comprimento",
    sourceSlug: "uzunluk",
    category: "uzunluk",
    title: "Conversão de unidades de comprimento",
    description:
      "Converta metros, quilômetros, centímetros, milhas e pés; consulte fórmulas e tabelas de referência.",
    introduction: [
      "Comprimento é uma grandeza física fundamental usada para descrever altura, largura, espessura ou a distância entre dois pontos. Um mesmo objeto pode ter diferentes medidas de comprimento, conforme a direção observada.",
      "Na física, o comprimento é representado pelo símbolo dimensional L. Área, volume, velocidade, aceleração, pressão e densidade são algumas grandezas definidas a partir dele.",
      "A unidade básica do Sistema Internacional (SI) é o metro (m). Nano, micro, mili, centi e quilômetro adaptam a medida à escala; fora do sistema métrico, polegada, pé, jarda e milha seguem em uso, sobretudo nos Estados Unidos e no Reino Unido.",
    ],
    facts: [
      { label: "Unidade básica do SI", value: "Metro" },
      { label: "Símbolo da unidade SI", value: "m" },
      { label: "Grandeza física", value: "Comprimento" },
      { label: "Símbolo dimensional", value: "L" },
      { label: "Definição do metro", value: "Distância percorrida pela luz no vácuo em 1/299.792.458 de segundo" },
    ],
    sections: [
      {
        title: "O que é comprimento?",
        paragraphs: [
          "Comprimento descreve altura, largura, profundidade ou a distância entre dois pontos. É uma grandeza física fundamental e pode assumir valores diferentes no mesmo objeto conforme a direção medida.",
          "Na física, é normalmente representado por L. Diversas grandezas derivadas, como área, volume, velocidade, aceleração, pressão e densidade, dependem da dimensão de comprimento.",
        ],
      },
      {
        title: "A unidade do SI para comprimento",
        paragraphs: [
          "No Sistema Internacional, a unidade básica de comprimento é o metro, com símbolo m. Ele é a referência para as demais unidades de comprimento.",
          "Quilômetro, centímetro, milímetro, micrômetro e nanômetro se relacionam ao metro por múltiplos e submúltiplos decimais. Isso permite conversões por potências de dez.",
        ],
      },
      {
        title: "A definição científica do metro",
        paragraphs: [
          "No passado, o metro dependia de dimensões da Terra e de padrões físicos. O avanço da metrologia exigiu uma definição estável e reproduzível em qualquer lugar.",
          "Hoje, o metro é o comprimento percorrido pela luz no vácuo em 1/299.792.458 de segundo. A definição se apoia no valor exato fixado para a velocidade da luz no vácuo.",
        ],
      },
      {
        title: "Unidades métricas de comprimento",
        paragraphs: [
          "No sistema métrico, as unidades se relacionam ao metro por potências de dez. Um quilômetro equivale a 1.000 metros, um centímetro a 0,01 metro e um milímetro a 0,001 metro.",
          "Para escalas muito pequenas, usam-se micrômetro, nanômetro e picômetro. Células podem ser medidas em micrômetros, comprimentos de onda em nanômetros e escalas atômicas em picômetros.",
        ],
      },
      {
        title: "Unidades fora do sistema métrico",
        paragraphs: [
          "Polegada, pé, jarda e milha terrestre são unidades comuns fora do sistema métrico. Elas aparecem no sistema norte-americano e em aplicações ligadas à tradição britânica.",
          "Uma polegada equivale exatamente a 2,54 centímetros; um pé tem 12 polegadas; uma jarda, 3 pés. A milha terrestre internacional equivale exatamente a 1.609,344 metros.",
        ],
      },
      {
        title: "Comprimento na navegação marítima e aérea",
        paragraphs: [
          "Na navegação marítima e aérea, as distâncias são geralmente expressas em milhas náuticas. Uma milha náutica equivale exatamente a 1.852 metros.",
          "A milha náutica se desenvolveu em ligação com coordenadas geográficas. O nó, unidade de velocidade, corresponde a uma milha náutica por hora.",
        ],
      },
      {
        title: "Como medir comprimento?",
        paragraphs: [
          "Em medições cotidianas, usam-se régua, trena, paquímetro e micrômetro. A escolha depende do tamanho do objeto e da precisão necessária.",
          "Na engenharia e na pesquisa, podem ser usados telêmetros a laser, máquinas de medição por coordenadas, interferômetros e sistemas ópticos.",
        ],
      },
      {
        title: "Precisão de medição e incerteza",
        paragraphs: [
          "Nenhuma medição física é perfeita. Resolução, calibração, condições ambientais e método aplicado contribuem para a incerteza.",
          "Em resultados científicos, informe o valor, a unidade e, quando necessário, a incerteza. Em engenharia de precisão, até a variação de temperatura pode alterar as dimensões de um material.",
        ],
      },
      {
        title: "Como converter unidades de comprimento?",
        paragraphs: [
          "Dentro do sistema métrico, use a razão entre as unidades: de metros para quilômetros, divida por 1.000; de quilômetros para metros, multiplique por 1.000.",
          "Entre sistema métrico e unidades anglo-americanas, use fatores definidos. Para converter polegadas em centímetros, por exemplo, multiplique por 2,54.",
        ],
      },
    ],
    unitTable: [
      { name: "Nanômetro", symbol: "nm", referenceValue: "0,000000001 m", system: "SI/métrico", commonUse: "Comprimento de onda e nanotecnologia" },
      { name: "Micrômetro", symbol: "µm", referenceValue: "0,000001 m", system: "SI/métrico", commonUse: "Células, partículas e fabricação de precisão" },
      { name: "Milímetro", symbol: "mm", referenceValue: "0,001 m", system: "SI/métrico", commonUse: "Desenho técnico e medidas pequenas" },
      { name: "Centímetro", symbol: "cm", referenceValue: "0,01 m", system: "SI/métrico", commonUse: "Medição de objetos cotidianos" },
      { name: "Decímetro", symbol: "dm", referenceValue: "0,1 m", system: "SI/métrico", commonUse: "Educação e relações de volume" },
      { name: "Metro", symbol: "m", referenceValue: "1 m", system: "SI", commonUse: "Medições básicas de comprimento" },
      { name: "Quilômetro", symbol: "km", referenceValue: "1.000 m", system: "SI/métrico", commonUse: "Distâncias rodoviárias e geográficas" },
      { name: "Polegada", symbol: "in", referenceValue: "0,0254 m", system: "Britânico/norte-americano", commonUse: "Telas, tubulações e medidas técnicas" },
      { name: "Pé", symbol: "ft", referenceValue: "0,3048 m", system: "Britânico/norte-americano", commonUse: "Altura, construção e aviação" },
      { name: "Jarda", symbol: "yd", referenceValue: "0,9144 m", system: "Britânico/norte-americano", commonUse: "Campos esportivos e distâncias" },
      { name: "Milha", symbol: "mi", referenceValue: "1.609,344 m", system: "Britânico/norte-americano", commonUse: "Distâncias rodoviárias" },
      { name: "Milha náutica", symbol: "nmi", referenceValue: "1.852 m", system: "Navegação marítima", commonUse: "Navegação marítima e aérea" },
    ],
  },
  {
    locale: "pt",
    slug: "area",
    sourceSlug: "alan",
    category: "alan",
    title: "Conversão de unidades de área",
    description:
      "Converta áreas entre metros quadrados, hectares e pés quadrados; para cálculos de terrenos, edifícios e construção.",
    introduction: [
      "A área é uma grandeza física derivada que expressa a extensão de uma região bidimensional. Como resulta do produto de um comprimento por outro comprimento na mesma unidade, a dimensão da área é sempre 'comprimento ao quadrado' (L²).",
      "No Sistema Internacional de Unidades, a unidade derivada de área é o metro quadrado (m²). Na agricultura e em terrenos, usam-se muito o hectare e unidades locais; no sistema britânico/norte-americano, o pé quadrado e o acre; no sul da Ásia, unidades locais como bigha e katha também são comuns.",
    ],
    facts: [
      { label: "Grandeza física", value: "Área" },
      { label: "Simbolo dimensional", value: "[L²]" },
      { label: "Unidade derivada do SI", value: "Metro quadrado" },
      { label: "Simbolo da unidade SI", value: "m²" },
      { label: "Fórmula básica (retângulo)", value: "Área = Comprimento × Largura" },
    ],
    sections: [
      {
        title: "O que é a área?",
        paragraphs: [
          "A área expressa a extensão de uma região plana ou projetada. A extensão de um terreno, o piso de um cômodo ou uma folha de papel são medidos em área.",
          "A área é uma grandeza derivada: obtém-se multiplicando uma unidade de comprimento básica por si mesma. Por isso a dimensão SI da área é L² (comprimento ao quadrado), e a área é sempre uma grandeza escalar positiva.",
        ],
      },
      {
        title: "A unidade SI da área: o metro quadrado",
        paragraphs: [
          "No Sistema Internacional de Unidades, a unidade derivada de área é o metro quadrado (m²), que representa a área ocupada por um quadrado cujo lado mede exatamente 1 metro.",
          "O metro quadrado não é uma unidade básica independente, mas uma unidade derivada obtida elevando ao quadrado a unidade de comprimento (o metro). Todas as demais unidades métricas de área (centímetro quadrado, quilômetro quadrado, etc.) relacionam-se com o metro quadrado por potências decimais.",
        ],
      },
      {
        title: "Por que as unidades de área se convertem com uma razão quadrática?",
        paragraphs: [
          "Ao converter unidades de comprimento, a razão usada deve ser elevada ao quadrado para as unidades de área. Por exemplo, 1 quilômetro equivale a 1000 metros, mas 1 quilômetro quadrado não equivale a 1000 metros quadrados, e sim a 1000², ou seja, 1.000.000 de metros quadrados.",
          "Isso ocorre porque, numa área, ambas as dimensões (comprimento e largura) aumentam ou diminuem na mesma proporção. Ignorar essa relação quadrática é o erro de cálculo mais frequente nas conversões de área -- acreditar que '1 km² = 1000 m²' é uma confusão comum.",
        ],
      },
      {
        title: "As unidades métricas de área",
        paragraphs: [
          "No sistema métrico, usam-se o milímetro quadrado e o centímetro quadrado para áreas pequenas, o metro quadrado para medições cotidianas e o quilômetro quadrado para grandes áreas. Um centímetro quadrado equivale a 0,0001 metro quadrado, e um quilômetro quadrado a 1.000.000 de metros quadrados.",
          "Para medir terrenos, usam-se o are (100 m²) e seu múltiplo, 100 vezes maior, o hectare (10.000 m²). O hectare é a unidade métrica de terreno mais usada no mundo para expressar a área de terras agrícolas.",
        ],
      },
      {
        title: "Unidades tradicionais de terreno na Turquia",
        paragraphs: [
          "Na Turquia, as unidades mais usadas para medir terras agrícolas são o dönüm e o dekar; ambas equivalem hoje a 1000 metros quadrados e são intercambiáveis. O dekar é o nome oficial usado na legislação de pesos e medidas, enquanto o dönüm é o equivalente tradicional da linguagem cotidiana.",
          "Na época otomana, o tamanho do dönüm variava conforme a região entre 900 e 1600 m². Com a lei de pesos e medidas de 1931, o dönüm foi alinhado ao dekar e padronizado exatamente em 1000 m².",
        ],
      },
      {
        title: "As unidades de área do sistema britânico/norte-americano",
        paragraphs: [
          "O pé quadrado (ft²) e a polegada quadrada (in²) são usados para áreas pequenas, enquanto o acre é usado para grandes parcelas de terreno no sistema de medidas britânico/norte-americano. Um acre equivale exatamente a 4046,8564224 metros quadrados.",
          "A origem histórica do acre remonta à área de terreno que uma junta de bois conseguia arar em um dia. Ainda hoje é amplamente usado em anúncios imobiliários nos Estados Unidos, no Reino Unido e em alguns países da Commonwealth.",
        ],
      },
      {
        title: "As unidades de terreno do sul da Ásia",
        paragraphs: [
          "Em países como Índia, Bangladesh, Paquistão e Nepal, ainda são amplamente usadas unidades locais de terreno como bigha, katha, killa, kanal, marla, guntha, biswa e decimal. O tamanho dessas unidades pode variar consideravelmente de uma região para outra, mesmo com o mesmo nome.",
          "Por exemplo, um bigha equivale a cerca de 1338 m² em Bengala Ocidental, mas pode corresponder a um valor diferente em outro estado. Por isso, em transações imobiliárias com essas unidades, é importante confirmar qual padrão regional está sendo utilizado.",
        ],
      },
      {
        title: "Como se calcula uma área?",
        paragraphs: [
          "Para uma área retangular, a fórmula é Área = Comprimento × Largura. Para um triângulo, usa-se Área = (Base × Altura) / 2, e para um círculo, Área = π × Raio².",
          "Em terrenos de forma irregular, a área é calculada dividindo a forma em retângulos ou triângulos menores, calculando a área de cada parte separadamente e somando-as (ou, em medições cadastrais, por meio de fórmulas de área de polígonos baseadas em coordenadas).",
        ],
      },
      {
        title: "Aspectos a considerar ao medir áreas",
        paragraphs: [
          "O valor de área indicado em um anúncio imobiliário ou em uma escritura deve ser interpretado conforme a unidade utilizada (m², dönüm, acre, bigha, etc.) e o padrão regional com o qual essa unidade é definida.",
          "Especialmente em transações imobiliárias internacionais, observar o equivalente exato em metros quadrados em vez da simples semelhança do nome da unidade evita mal-entendidos; a ferramenta de conversão desta página compara todas as unidades a partir de uma referência comum em metros quadrados.",
        ],
      },
    ],
    unitTable: [
      { name: "Milímetro quadrado", symbol: "mm²", referenceValue: "0,000001 m²", system: "SI/métrico", commonUse: "Desenho técnico e áreas pequenas" },
      { name: "Centímetro quadrado", symbol: "cm²", referenceValue: "0,0001 m²", system: "SI/métrico", commonUse: "Área de objetos pequenos" },
      { name: "Metro quadrado", symbol: "m²", referenceValue: "1 m²", system: "SI", commonUse: "Área de moradia, escritório e terreno" },
      { name: "Are", symbol: "a", referenceValue: "100 m²", system: "Métrico", commonUse: "Pequenas parcelas de terreno" },
      { name: "Dönüm / Dekar", symbol: "dönüm", referenceValue: "1000 m²", system: "Turquia (métrico)", commonUse: "Medição de terras agrícolas" },
      { name: "Hectare", symbol: "ha", referenceValue: "10.000 m²", system: "Métrico", commonUse: "Grandes terras agrícolas e florestais" },
      { name: "Quilômetro quadrado", symbol: "km²", referenceValue: "1.000.000 m²", system: "SI/métrico", commonUse: "Cidades, países e zonas geográficas" },
      { name: "Pé quadrado", symbol: "ft²", referenceValue: "0,092903 m²", system: "Britânico/norte-americano", commonUse: "Área de moradia (US/UK)" },
      { name: "Jarda quadrada", symbol: "yd²", referenceValue: "0,83612736 m²", system: "Britânico/norte-americano", commonUse: "Campos esportivos e têxtil" },
      { name: "Acre", symbol: "ac", referenceValue: "4046,8564224 m²", system: "Britânico/norte-americano", commonUse: "Grandes parcelas de terreno" },
      { name: "Bigha", symbol: "bigha", referenceValue: "≈1337,8 m² (variável conforme a região)", system: "Sul da Ásia", commonUse: "Terras agrícolas na Índia/Bangladesh" },
      { name: "Tsubo", symbol: "tsubo", referenceValue: "≈3,31 m²", system: "Japão", commonUse: "Medição de moradia e terreno no Japão" },
    ],
  },
  {
    locale: "pt",
    slug: "volume",
    sourceSlug: "hacim",
    category: "hacim",
    title: "Conversão de unidades de volume",
    description:
      "Converta volumes entre litros, mililitros e metros cúbicos; compare as unidades usuais para líquidos e recipientes.",
    introduction: [
      "O volume é uma grandeza física derivada que expressa o espaço ocupado ou contido por um objeto ou recipiente tridimensional. Como resulta do produto de uma unidade de comprimento nas três dimensões (comprimento × largura × altura), a dimensão do volume é L³ (comprimento ao cubo).",
      "No Sistema Internacional de Unidades, a unidade derivada de volume é o metro cúbico (m³); no dia a dia, o litro e o mililitro são muito mais usados. Na cozinha são comuns a xícara, a colher de sopa e a colher de chá, e no sistema norte-americano/britânico, o galão, o quarto, o pint e a onça líquida.",
    ],
    facts: [
      { label: "Grandeza física", value: "Volume" },
      { label: "Simbolo dimensional", value: "[L³]" },
      { label: "Unidade derivada do SI", value: "Metro cúbico" },
      { label: "Simbolo da unidade SI", value: "m³" },
      { label: "Unidade mais comum no uso diário", value: "Litro (L)" },
    ],
    sections: [
      {
        title: "O que é o volume?",
        paragraphs: [
          "O volume é a extensão do espaço tridimensional ocupado por um objeto ou que pode ser contido por um recipiente. O volume de um objeto sólido expressa sua grandeza física, enquanto o volume de um recipiente expressa a quantidade de líquido ou gás que ele pode conter.",
          "O volume é uma grandeza derivada, obtida multiplicando uma unidade de comprimento nas três dimensões (largura, altura, profundidade). Por isso sua dimensão SI é L³.",
        ],
      },
      {
        title: "A unidade SI do volume: o metro cúbico",
        paragraphs: [
          "No Sistema Internacional de Unidades, a unidade derivada de volume é o metro cúbico (m³), que representa o volume interno de um cubo cujo lado mede exatamente 1 metro.",
          "O metro cúbico é usado para grandes volumes (reservatórios de água, lançamento de concreto, volume de contêineres), enquanto no dia a dia prefere-se o litro, muito menor. Um metro cúbico equivale exatamente a 1000 litros.",
        ],
      },
      {
        title: "A relação entre o litro e o metro cúbico",
        paragraphs: [
          "O litro é uma unidade de volume prática, cujo uso junto ao SI é aceito, embora não seja oficialmente uma unidade do SI. Um litro equivale ao volume de um cubo de 10 centímetros de lado (1000 centímetros cúbicos).",
          "Os submúltiplos do litro -- decilitro, centilitro e mililitro -- são amplamente usados em medições de alimentos, medicamentos e laboratório. Um mililitro equivale exatamente a um centímetro cúbico (1 mL = 1 cm³).",
        ],
      },
      {
        title: "Por que as unidades de volume se convertem com uma razão cúbica?",
        paragraphs: [
          "Enquanto as unidades de comprimento se convertem com uma razão linear e as de área com uma razão quadrática, as unidades de volume se convertem com uma razão cúbica. Por exemplo, 1 metro equivale a 100 centímetros, mas 1 metro cúbico não equivale a 100 centímetros cúbicos, e sim a 100³, ou seja, 1.000.000 de centímetros cúbicos.",
          "Essa relação cúbica surge porque o volume varia simultaneamente em três dimensões e é o erro conceitual mais frequente nas conversões de volume -- exige um cálculo especialmente cuidadoso ao passar para unidades não métricas como o galão ou o pé cúbico.",
        ],
      },
      {
        title: "As medidas de cozinha",
        paragraphs: [
          "As medidas usadas em receitas, como colher de sopa, colher de chá e xícara, são unidades de volume padronizadas que permitem obter resultados coerentes em diferentes cozinhas. Equivalências geralmente aceitas: 1 colher de sopa ≈ 15 mL, 1 colher de chá ≈ 5 mL, 1 xícara ≈ 240 mL.",
          "Essas medidas não são padrões científicos exatos, mas valores aproximados amplamente aceitos na prática culinária; em receitas que exigem precisão (especialmente confeitaria), usar uma balança de cozinha digital é mais confiável.",
        ],
      },
      {
        title: "As unidades de volume líquido norte-americanas e britânicas",
        paragraphs: [
          "Os sistemas norte-americano e britânico usam unidades como galão, quarto, pint e onça líquida; mas o tamanho dessas unidades difere entre os dois sistemas. Um galão norte-americano equivale a 3,78541 litros, enquanto um galão imperial britânico equivale a 4,54609 litros -- cerca de 20% a mais.",
          "Essa diferença ocorre porque os dois países adotaram historicamente galões de referência distintos (o galão de vinho nos Estados Unidos, o galão imperial no Reino Unido). É sempre bom verificar a qual sistema pertence o valor de 'galão' ou 'onça' indicado em uma receita ou no rótulo de um produto.",
        ],
      },
      {
        title: "As unidades de volume agrícolas e históricas",
        paragraphs: [
          "O bushel e o peck são unidades de volume usadas historicamente para medir produtos secos como cereais, frutas e verduras; ainda hoje são usadas em alguns mercados agrícolas, especialmente nos Estados Unidos.",
          "Na época otomana, o kile e o şinik eram unidades de volume tradicionais usadas para medir cereais; 1 kile equivalia a 20 şinik. Embora essas unidades apresentem pequenas variações regionais, hoje servem como referência para interpretar textos e registros históricos.",
        ],
      },
      {
        title: "Como se calcula um volume?",
        paragraphs: [
          "Para um prisma retangular (caixa), usa-se a fórmula Volume = Comprimento × Largura × Altura. Para um cilindro, aplica-se Volume = π × Raio² × Altura, e para uma esfera, Volume = (4/3) × π × Raio³.",
          "O volume de sólidos de forma irregular costuma ser determinado pelo método do deslocamento (princípio de Arquimedes) -- submergindo o objeto em um recipiente cheio de água e medindo o volume de água deslocado.",
        ],
      },
      {
        title: "Medição do volume no petróleo e na indústria",
        paragraphs: [
          "Na indústria petrolífera, o volume é geralmente expresso em barris (bbl); 1 barril equivale exatamente a 158,987 litros (42 galões norte-americanos). Essa unidade é uma tradição que remonta ao século XIX, quando o petróleo era transportado em barris de madeira originalmente destinados a vinho.",
          "Em processos industriais, grandes volumes costumam ser expressos em metros cúbicos, e medições pequenas de laboratório em mililitros; a unidade adequada é escolhida conforme a magnitude do volume medido.",
        ],
      },
    ],
    unitTable: [
      { name: "Mililitro", symbol: "mL", referenceValue: "0,000001 m³", system: "SI/métrico", commonUse: "Doses médicas e medições pequenas" },
      { name: "Colher de chá", symbol: "cdch", referenceValue: "0,000005 m³ (≈5 mL)", system: "Medida de cozinha", commonUse: "Receitas culinárias" },
      { name: "Colher de sopa", symbol: "cds", referenceValue: "0,000015 m³ (≈15 mL)", system: "Medida de cozinha", commonUse: "Receitas culinárias" },
      { name: "Xícara", symbol: "xic", referenceValue: "0,00024 m³ (≈240 mL)", system: "Medida de cozinha", commonUse: "Receitas culinárias" },
      { name: "Litro", symbol: "L", referenceValue: "0,001 m³", system: "Métrico", commonUse: "Bebidas, combustível e volume diário" },
      { name: "Onça líquida (US)", symbol: "fl oz", referenceValue: "≈0,0000296 m³ (≈29,57 mL)", system: "Estados Unidos", commonUse: "Bebidas e embalagens cosméticas" },
      { name: "Pint (US)", symbol: "pt", referenceValue: "≈0,000473 m³ (≈473 mL)", system: "Estados Unidos", commonUse: "Medição de cerveja e leite" },
      { name: "Galão (US)", symbol: "gal", referenceValue: "≈0,003785 m³ (≈3,785 L)", system: "Estados Unidos", commonUse: "Combustível e grandes volumes líquidos" },
      { name: "Galão imperial", symbol: "imp gal", referenceValue: "≈0,004546 m³ (≈4,546 L)", system: "Britânico (imperial)", commonUse: "Combustível e medição de líquidos no Reino Unido" },
      { name: "Pé cúbico", symbol: "ft³", referenceValue: "≈0,0283168 m³", system: "Britânico/norte-americano", commonUse: "Construção e vazão de ar em climatização" },
      { name: "Barril (petróleo)", symbol: "bbl", referenceValue: "≈0,158987 m³ (≈158,987 L)", system: "Indústria petrolífera", commonUse: "Medição de petróleo bruto" },
      { name: "Metro cúbico", symbol: "m³", referenceValue: "1 m³", system: "SI", commonUse: "Reservatórios de água, concreto e grandes volumes" },
    ],
  },
  {
    locale: "pt",
    slug: "massa",
    sourceSlug: "kutle",
    category: "kutle",
    title: "Conversão de unidades de massa",
    description:
      "Converta rápido e grátis entre quilogramas, gramas, miligramas, toneladas e libras.",
    introduction: [
      "A massa é uma grandeza física fundamental relacionada à quantidade de matéria de um objeto e sua propriedade de inércia. No Sistema Internacional de Unidades, a unidade básica de massa é o quilograma, simbolizado por kg.",
      "Embora na linguagem cotidiana massa e peso sejam usados como sinônimos, são grandezas fisicamente distintas. A massa é medida em quilogramas, enquanto o peso, por ser uma força, é medido em newtons.",
    ],
    facts: [
      { label: "Grandeza física", value: "Massa" },
      { label: "Simbolo dimensional", value: "[M]" },
      { label: "Unidade básica do SI", value: "Quilograma" },
      { label: "Simbolo da unidade SI", value: "kg" },
      { label: "Área da metrologia", value: "Metrologia da massa" },
    ],
    sections: [
      {
        title: "O que é a massa?",
        paragraphs: [
          "A massa é a grandeza física relacionada à resistência que um objeto oferece à mudança de seu estado de movimento, ou seja, à inércia. Na mecânica clássica, a relação entre a força resultante aplicada a um objeto e a aceleração produzida se expressa pela igualdade F = m·a.",
          "Ao aplicar a mesma força, um objeto com maior massa adquire uma aceleração menor. Por isso a massa não expressa apenas, em sentido cotidiano, a quantidade de matéria contida em um objeto, mas desempenha um papel fundamental nas equações do movimento.",
          "A massa é uma grandeza escalar. Não tem direção e seu símbolo dimensional básico no sistema SI é a letra M.",
        ],
      },
      {
        title: "A diferença entre massa e peso",
        paragraphs: [
          "Massa e peso não são a mesma grandeza física. A massa é uma propriedade do objeto e se expressa em quilogramas. O peso, por outro lado, é a força que o objeto sofre em um campo gravitacional e se mede em newtons.",
          "A relação simplificada do peso se escreve W = m·g, onde W representa a força peso, m a massa e g a aceleração da gravidade local.",
          "A massa de um objeto permanece aproximadamente igual na Terra e na Lua; no entanto, seu peso varia porque a aceleração da gravidade local é diferente. Por isso, no uso científico, o quilograma é uma unidade de massa e não de peso.",
          "Na linguagem cotidiana, como o resultado de pesar algo é expresso em quilogramas, as palavras 'peso' e 'massa' costumam ser usadas indistintamente. O instrumento de medição na verdade detecta o efeito de uma força, mas é calibrado para mostrar o resultado em unidade de massa.",
        ],
      },
      {
        title: "Por que o quilograma é a unidade básica do SI para massa?",
        paragraphs: [
          "No Sistema Internacional de Unidades, a unidade básica de massa é o quilograma. Entre as unidades básicas do SI, o quilograma é a única cujo nome inclui um prefixo.",
          "A palavra grama desempenhou historicamente um papel importante nas primeiras definições de massa do sistema métrico. Mas ao se estabelecerem os padrões práticos, o quilograma se tornou a referência fundamental.",
          "Atualmente, o quilograma não é mais definido pela massa de um cilindro metálico físico, mas a partir do valor numérico fixado da constante de Planck. A relação dessa definição com a balança de Kibble e as medições elétricas é examinada em detalhe na página de informações dedicada ao quilograma.",
        ],
      },
      {
        title: "As unidades métricas de massa",
        paragraphs: [
          "As unidades métricas de massa são construídas a partir do quilograma, do grama e dos prefixos do SI que se acrescentam a eles. Um grama equivale a 0,001 quilograma, um miligrama a 0,001 grama e um micrograma a 0,001 miligrama.",
          "Para massas grandes, usa-se a tonelada. Uma tonelada métrica equivale exatamente a 1000 quilogramas. O símbolo da tonelada, cujo uso junto ao SI é aceito, é a letra minúscula t.",
          "A unidade adequada é escolhida conforme a magnitude da massa medida. A massa de uma pessoa ou de um produto pode ser expressa em quilogramas, o conteúdo de um alimento em gramas, o princípio ativo de um medicamento em miligramas ou microgramas, e a carga de um veículo em toneladas.",
        ],
      },
      {
        title: "A relação entre libra, onça e quilograma",
        paragraphs: [
          "A libra e a onça são unidades de massa usadas nos sistemas de medida tradicionais britânico e norte-americano. A libra avoirdupois internacional equivale exatamente a 0,45359237 quilograma.",
          "Uma libra avoirdupois se divide em 16 onças. Portanto, uma onça equivale exatamente a 0,028349523125 quilograma, ou 28,349523125 gramas.",
          "A libra usada para massa e a libra-força (pound-force), uma unidade de força, são grandezas diferentes. A libra expressa uma massa, e a libra-força, uma força. Em cálculos técnicos, os símbolos lb e lbf não devem ser confundidos.",
        ],
      },
      {
        title: "Como se mede a massa?",
        paragraphs: [
          "Para medir a massa podem ser usadas balanças de dois pratos, balanças eletrônicas, balanças analíticas, células de carga e diversos sistemas de pesagem industrial de diferentes capacidades.",
          "As balanças comparativas comparam a massa desconhecida com massas padrão rastreáveis. Nas balanças eletrônicas, as células de carga convertem a força aplicada em um sinal elétrico.",
          "Em medições de alta precisão, podem ser considerados fatores como o empuxo do ar, a aceleração da gravidade local, a temperatura, a umidade, as vibrações, os efeitos eletrostáticos e a densidade da massa padrão.",
          "A vinculação dos padrões de massa com os sistemas de medição nacionais e internacionais é chamada de rastreabilidade metrológica. A cadeia de calibração permite comparar medições realizadas em diferentes laboratórios e empresas.",
        ],
      },
      {
        title: "A relação entre densidade, volume e massa",
        paragraphs: [
          "Entre massa, densidade e volume existe a relação m = ρ·V. Aqui, m representa a massa, ρ a densidade e V o volume.",
          "Para um mesmo volume, a massa de dois materiais distintos pode diferir conforme sua densidade. Por exemplo, para o mesmo volume, aço e água não têm a mesma massa.",
          "No sistema SI, a unidade derivada básica da densidade é o quilograma por metro cúbico. Em aplicações de laboratório também são usadas habitualmente unidades como grama por centímetro cúbico ou grama por mililitro.",
        ],
      },
      {
        title: "A incerteza na medição da massa",
        paragraphs: [
          "Toda medição real carrega certa incerteza. O fato de uma balança mostrar muitos algarismos na tela não significa que todos esses algarismos sejam conhecidos com a mesma precisão.",
          "A resolução do instrumento, a repetibilidade, a não linearidade, o padrão de calibração, as condições ambientais e o método do usuário podem contribuir para a incerteza da medição de massa.",
          "Em trabalhos científicos e industriais, o resultado de uma medição deve ser avaliado junto com a unidade adequada, o número de algarismos significativos e a informação sobre a incerteza.",
        ],
      },
      {
        title: "Como escolher a unidade de massa adequada?",
        paragraphs: [
          "Escolher uma unidade compatível com a magnitude do objeto medido torna o resultado mais legível. A massa de uma pessoa pode ser expressa em quilogramas, o princípio ativo de um comprimido em miligramas, e a carga de um caminhão em toneladas.",
          "Para massas muito pequenas, podem ser usadas unidades com prefixo do SI como microgama, nanograma e picograma. Em escala atômica e molecular, unidades específicas como a unidade de massa atômica unificada podem ser mais práticas.",
          "Ao realizar uma conversão de unidades, é preciso verificar não apenas o valor numérico, mas também se a unidade utilizada expressa massa ou força.",
        ],
      },
    ],
    unitTable: [
      { name: "Nanograma", symbol: "ng", referenceValue: "10⁻¹² kg", system: "SI", commonUse: "Quantidades de matéria muito pequenas" },
      { name: "Micrograma", symbol: "µg", referenceValue: "10⁻⁹ kg", system: "SI", commonUse: "Medições médicas e de laboratório" },
      { name: "Miligrama", symbol: "mg", referenceValue: "10⁻⁶ kg", system: "SI", commonUse: "Doses de medicamentos e substâncias químicas" },
      { name: "Grama", symbol: "g", referenceValue: "0,001 kg", system: "SI", commonUse: "Alimentos e objetos pequenos" },
      { name: "Quilograma", symbol: "kg", referenceValue: "1 kg", system: "SI", commonUse: "Medições de massa básicas" },
      { name: "Tonelada", symbol: "t", referenceValue: "1000 kg", system: "Métrico", commonUse: "Transporte, carga e indústria" },
      { name: "Onça", symbol: "oz", referenceValue: "0,028349523125 kg", system: "Britânico/norte-americano", commonUse: "Alimentos e massas pequenas" },
      { name: "Libra", symbol: "lb", referenceValue: "0,45359237 kg", system: "Britânico/norte-americano", commonUse: "Massa corporal e de produtos" },
    ],
  },
  {
    locale: "pt",
    slug: "temperatura",
    sourceSlug: "sicaklik",
    category: "sicaklik",
    title: "Conversão de unidades de temperatura",
    description:
      "Converta temperaturas entre Celsius, Fahrenheit e Kelvin; consulte fórmulas e valores de exemplo.",
    introduction: [
      "A temperatura é uma grandeza física fundamental relacionada à energia cinética média das partículas de uma matéria, que expressa o quão 'quente' ou 'fria' essa matéria está. No Sistema Internacional de Unidades, a unidade básica de temperatura é o kelvin.",
      "No dia a dia, as escalas Celsius e Fahrenheit são as mais usadas; em trabalhos científicos usa-se o kelvin, em alguns cálculos de engenharia o Rankine, e em textos históricos pode aparecer o Réaumur. Diferentemente de muitas outras grandezas físicas, a conversão de temperatura entre unidades exige não apenas multiplicação, mas também soma ou subtração.",
    ],
    facts: [
      { label: "Grandeza física", value: "Temperatura (temperatura termodinâmica)" },
      { label: "Simbolo dimensional", value: "[Θ]" },
      { label: "Unidade básica do SI", value: "Kelvin" },
      { label: "Simbolo da unidade SI", value: "K" },
      { label: "Zero absoluto", value: "0 K = -273,15 °C = -459,67 °F" },
    ],
    sections: [
      {
        title: "O que é a temperatura?",
        paragraphs: [
          "A temperatura é uma grandeza diretamente relacionada à energia cinética (de movimento) média dos átomos e moléculas que compõem uma matéria. Quanto mais rápido as partículas se movem, mais 'quente' a matéria é considerada.",
          "A temperatura é uma das sete grandezas básicas do Sistema Internacional de Unidades e, como temperatura termodinâmica, é representada pelo símbolo Θ (teta). Diferentemente de muitas outras grandezas (como comprimento ou massa), não é uma grandeza diretamente aditiva -- colocar dois corpos em contato não soma suas temperaturas, mas os conduz a um equilíbrio.",
        ],
      },
      {
        title: "A unidade SI da temperatura: o kelvin",
        paragraphs: [
          "O kelvin é a unidade básica do SI para temperatura e é representado pelo símbolo K (sem o sinal de grau, escreve-se simplesmente 'K'). A escala Kelvin toma o zero absoluto (a temperatura mais baixa teoricamente possível) como ponto de partida (0 K).",
          "Desde a revisão do SI de 2019, o kelvin não é mais definido a partir do ponto triplo da água, mas a partir do valor numérico fixado da constante de Boltzmann (k). Isso garante que a unidade de temperatura se baseie em uma constante universal e não em uma substância de referência física.",
        ],
      },
      {
        title: "Por que a conversão de temperatura não é uma simples multiplicação?",
        paragraphs: [
          "Em grandezas como comprimento ou massa, a conversão de unidades é feita apenas com um fator multiplicativo (por exemplo, metro-centímetro). Na temperatura, como as escalas Celsius, Fahrenheit e Kelvin têm 'pontos zero' distintos, a conversão exige tanto multiplicação quanto soma ou subtração.",
          "Por exemplo, para passar de Celsius para Fahrenheit, o valor é primeiro multiplicado por 9/5 e depois somado a 32: °F = (°C × 9/5) + 32. Por isso a temperatura é, matematicamente, a única grandeza física comum com uma relação de conversão 'afim' (linear, mas que não passa pela origem).",
        ],
      },
      {
        title: "A escala Celsius",
        paragraphs: [
          "A escala Celsius foi desenvolvida em 1742 pelo astrônomo sueco Anders Celsius e define o ponto de congelamento da água em 0 °C e seu ponto de ebulição (a uma atmosfera de pressão) em 100 °C. É um sistema de referência prático que facilita a compreensão da escala no dia a dia.",
          "O Celsius é a escala de temperatura mais usada no mundo tanto em trabalhos científicos quanto na informação meteorológica diária da maioria dos países, incluindo o Brasil; um pequeno número de países, como os Estados Unidos, ainda prefere o Fahrenheit no uso diário.",
        ],
      },
      {
        title: "A escala Fahrenheit",
        paragraphs: [
          "A escala Fahrenheit foi desenvolvida em 1724 pelo físico alemão Daniel Gabriel Fahrenheit. Nessa escala, o ponto de congelamento da água é 32 °F e o ponto de ebulição 212 °F -- um intervalo exato de 180 graus entre o congelamento e a ebulição.",
          "O Fahrenheit ainda é usado hoje para medições de temperatura cotidianas em um pequeno número de países, principalmente os Estados Unidos; nos trabalhos científicos em nível mundial, cedeu em grande parte seu lugar ao Celsius e ao Kelvin.",
        ],
      },
      {
        title: "Rankine e Reaumur: escalas menos conhecidas",
        paragraphs: [
          "O Rankine é uma escala de temperatura absoluta que usa unidades do mesmo tamanho que o grau Fahrenheit, mas toma o zero absoluto como 0 °R; o ponto de congelamento da água é 491,67 °R. É preferido especialmente ao Kelvin em alguns cálculos de engenharia termodinâmica nos Estados Unidos.",
          "A escala Réaumur foi desenvolvida no século XVIII pelo cientista francês René Réaumur; fixa o ponto de congelamento da água em 0 °Ré e o de ebulição em 80 °Ré. Embora hoje praticamente não seja usada, ainda pode ser encontrada como referência histórica em alguns países europeus (especialmente em algumas receitas tradicionais da Rússia).",
        ],
      },
      {
        title: "O que significa o zero absoluto?",
        paragraphs: [
          "O zero absoluto (0 kelvin, -273,15 °C, -459,67 °F) é a temperatura teórica na qual as partículas possuem, em sentido clássico, a menor energia cinética possível. Segundo a mecânica quântica, as partículas não permanecem completamente imóveis nem mesmo no zero absoluto (energia do ponto zero), mas em sentido clássico não pode ser definida uma temperatura mais baixa.",
          "Em laboratório, já foram alcançadas temperaturas extremamente próximas do zero absoluto (da ordem do microkelvin, até do nanokelvin), mas segundo a terceira lei da termodinâmica é impossível alcançar exatamente o zero absoluto em um número finito de etapas.",
        ],
      },
      {
        title: "Como se mede a temperatura?",
        paragraphs: [
          "Para medir a temperatura, usam-se diferentes tecnologias: termômetros de mercúrio ou álcool, termômetros digitais, termopares, termômetros de resistência (RTD) e termômetros infravermelhos (sem contato). Cada um é adequado para uma faixa de temperatura e um nível de precisão diferentes.",
          "Os termopares são amplamente usados em ambientes industriais porque podem funcionar em uma faixa de temperatura muito ampla (às vezes de -200 °C a +2000 °C); calculam a temperatura a partir da diferença de tensão gerada na junção de dois metais distintos.",
        ],
      },
    ],
    unitTable: [
      { name: "Kelvin", symbol: "K", referenceValue: "Unidade básica", system: "SI", commonUse: "Cálculos científicos e termodinâmicos" },
      { name: "Celsius", symbol: "°C", referenceValue: "K = °C + 273,15", system: "Métrico (uso cotidiano)", commonUse: "Meteorologia, vida cotidiana, ciência" },
      { name: "Fahrenheit", symbol: "°F", referenceValue: "°F = (°C × 9/5) + 32", system: "Estados Unidos", commonUse: "Meteorologia diária nos Estados Unidos" },
      { name: "Rankine", symbol: "°R", referenceValue: "°R = (°C + 273,15) × 9/5", system: "Estados Unidos (engenharia)", commonUse: "Cálculos de engenharia termodinâmica" },
      { name: "Reaumur", symbol: "°Ré", referenceValue: "°Ré = °C × 4/5", system: "Histórico (Europa)", commonUse: "Textos históricos, receitas tradicionais" },
    ],
  },
  {
    locale: "pt",
    slug: "tempo",
    sourceSlug: "zaman",
    category: "zaman",
    title: "Conversão de unidades de tempo",
    description:
      "Use em uma única página as conversões de tempo essenciais entre segundos, minutos e horas.",
    introduction: [
      "O tempo é uma grandeza física fundamental que expressa a ordem em que os eventos ocorrem e a duração que os separa. No Sistema Internacional de Unidades, a unidade básica de tempo é o segundo, usado junto com unidades derivadas como minuto, hora e dia no dia a dia.",
      "Diferentemente de grandezas como comprimento ou massa, o tempo é um dos conceitos de medição mais antigos da história humana; a estrutura sexagesimal (base 60) da hora, do minuto e do segundo remonta a milhares de anos, até a antiga civilização babilônica.",
    ],
    facts: [
      { label: "Grandeza física", value: "Tempo" },
      { label: "Simbolo dimensional", value: "[T]" },
      { label: "Unidade básica do SI", value: "Segundo" },
      { label: "Simbolo da unidade SI", value: "s" },
      { label: "Definição atual do segundo", value: "9.192.631.770 períodos de oscilação do átomo de césio-133" },
    ],
    sections: [
      {
        title: "O que é o tempo?",
        paragraphs: [
          "O tempo é uma grandeza fundamental que expressa a ordem em que os eventos ocorrem e a duração decorrida entre dois eventos. Na física, é representado pelo símbolo dimensional T e participa da definição de diversas grandezas derivadas, como velocidade, aceleração e frequência.",
          "Na física clássica, o tempo era considerado uma grandeza absoluta que transcorria igualmente para todos os observadores; com a teoria da relatividade de Einstein, compreendeu-se que o tempo pode transcorrer de forma diferente conforme a velocidade do observador e o campo gravitacional (dilatação do tempo).",
        ],
      },
      {
        title: "A unidade SI do tempo: o segundo",
        paragraphs: [
          "O segundo é a unidade básica do SI para tempo, simbolizado por s. Historicamente, o segundo era definido como 1/86.400 de um dia (24 horas × 60 minutos × 60 segundos).",
          "Como essa definição se mostrou insuficientemente estável devido a pequenas irregularidades na velocidade de rotação da Terra, em 1967 o segundo foi redefinido como exatamente 9.192.631.770 períodos da radiação associada à transição entre dois níveis de energia fundamentais do átomo de césio-133. Essa definição permite que os relógios atômicos funcionem com a mesma precisão em qualquer lugar do mundo.",
        ],
      },
      {
        title: "A origem sexagesimal da hora, do minuto e do segundo",
        paragraphs: [
          "A divisão de uma hora em 60 minutos e de um minuto em 60 segundos remonta ao sistema numérico sexagesimal (base 60) usado pela antiga civilização babilônica. Os babilônios dividiam tanto o ângulo (360 graus) quanto o tempo segundo esse sistema.",
          "O número 60 foi escolhido porque é divisível exatamente por muitos números -- 2, 3, 4, 5, 6, 10, 12, 15, 20 e 30 -- o que facilita divisões práticas em cálculos cotidianos (por exemplo, dividir uma hora em três ou quatro partes) sem necessidade de números fracionários.",
        ],
      },
      {
        title: "A divisão do dia em 24 horas",
        paragraphs: [
          "A divisão do dia em 24 horas remonta ao Antigo Egito; os egípcios dividiam o dia em 12 partes iguais e a noite em outras 12, acompanhando o tempo por meio de relógios de sol e observações estelares.",
          "Essa divisão em 12 provavelmente se inspirou na contagem das falanges dos dedos (três falanges em cada um dos quatro dedos sem contar o polegar, 12 no total) ou no número de ciclos lunares de um ano (cerca de 12 luas cheias).",
        ],
      },
      {
        title: "A relação entre as unidades métricas de tempo",
        paragraphs: [
          "Os submúltiplos do segundo -- o milissegundo (0,001 segundo), o microssegundo e o nanossegundo -- são usados para medir eventos muito breves, como operações de processadores de computador, cronometragem esportiva e experimentos científicos.",
          "Seus múltiplos -- o minuto (60 segundos), a hora (3600 segundos) e o dia (86.400 segundos) -- são as unidades básicas usadas diariamente para contar o tempo. A conversão entre essas unidades é feita, diferentemente da temperatura, apenas por multiplicação/divisão, porque todas compartilham um ponto zero (origem) comum.",
        ],
      },
      {
        title: "O que é um segundo intercalar?",
        paragraphs: [
          "A velocidade de rotação da Terra em seu eixo apresenta, com o tempo, pequenas irregularidades devido aos efeitos das marés e a mudanças em sua estrutura interna; isso cria uma pequena defasagem entre o tempo 'preciso' medido pelos relógios atômicos e a duração do dia baseada na rotação real da Terra.",
          "Para compensar essa defasagem, desde 1972 adiciona-se um 'segundo intercalar' ao Tempo Universal Coordenado (UTC) quando necessário. É um mecanismo de correção semelhante ao dia adicional dos anos bissextos (29 de fevereiro), mas como a irregularidade da rotação terrestre é imprevisível, os segundos intercalares não são adicionados em um ciclo fixo como o calendário, e sim conforme necessário.",
        ],
      },
      {
        title: "Os fusos horários e o UTC",
        paragraphs: [
          "A Terra está dividida em cerca de 24 fusos horários, porque o Sol atinge seu ponto mais alto em horas diferentes conforme a longitude. Todos os fusos horários usam o Tempo Universal Coordenado (UTC) como ponto de referência e são expressos por uma diferença horária em relação a essa referência conforme sua região (por exemplo, Brasília é UTC-3 e Nova York é UTC-5 no inverno).",
          "O UTC é um padrão de tempo moderno que substituiu o antigo Tempo Médio de Greenwich (GMT) e é mantido por relógios atômicos; o GMT hoje é usado principalmente como nome do fuso horário correspondente ao horário de inverno no Reino Unido.",
        ],
      },
      {
        title: "Como se mede o tempo?",
        paragraphs: [
          "No dia a dia, usam-se relógios mecânicos e digitais, enquanto em aplicações científicas e tecnológicas (satélites GPS, redes de telecomunicações) usam-se relógios atômicos. Os relógios atômicos funcionam com precisão extremamente alta, baseada na frequência de oscilação estável de átomos de césio ou rubídio.",
          "Para que o sistema GPS possa determinar uma posição precisa, os relógios atômicos dos satélites devem estar sincronizados com precisão de nanossegundos; até uma pequena defasagem nesses relógios pode provocar grandes erros no cálculo da posição em terra.",
        ],
      },
    ],
    unitTable: [
      { name: "Milissegundo", symbol: "ms", referenceValue: "0,001 s", system: "SI/métrico", commonUse: "Operações de computador e cronometragem esportiva" },
      { name: "Segundo", symbol: "s", referenceValue: "1 s", system: "SI", commonUse: "Medição de tempo básica" },
      { name: "Minuto", symbol: "min", referenceValue: "60 s", system: "Aceito junto ao SI", commonUse: "Controle do tempo cotidiano" },
      { name: "Hora", symbol: "h", referenceValue: "3600 s", system: "Aceito junto ao SI", commonUse: "Tempo de trabalho, tempo de viagem" },
      { name: "Dia", symbol: "dia", referenceValue: "86.400 s", system: "Aceito junto ao SI", commonUse: "Calendário e cálculos de duração" },
    ],
  },
  {
    locale: "pt",
    slug: "velocidade",
    sourceSlug: "hiz",
    category: "hiz",
    title: "Conversão de unidades de velocidade",
    description:
      "Converta a velocidade entre km/h, m/s e mph; consulte exemplos de engenharia e de uso cotidiano.",
    introduction: [
      "A velocidade é uma grandeza física derivada que expressa a distância percorrida por um objeto por unidade de tempo. Como é obtida dividindo um comprimento por um tempo, a dimensão da velocidade é L/T (comprimento dividido por tempo).",
      "No dia a dia, o quilômetro por hora (km/h) e a milha por hora (mph) são as unidades de velocidade mais usadas; o metro por segundo (m/s) é preferido em trabalhos científicos, e o nó na navegação marítima e aérea. A velocidade da luz ocupa um lugar especial entre as unidades de velocidade, como limite superior absoluto alcançável no universo.",
    ],
    facts: [
      { label: "Grandeza física", value: "Velocidade" },
      { label: "Simbolo dimensional", value: "[L/T]" },
      { label: "Unidade derivada do SI", value: "Metro por segundo" },
      { label: "Simbolo da unidade SI", value: "m/s" },
      { label: "Limite de velocidade universal", value: "Velocidade da luz ≈ 299.792.458 m/s" },
    ],
    sections: [
      {
        title: "O que é a velocidade?",
        paragraphs: [
          "A velocidade expressa a distância percorrida por um objeto por unidade de tempo e é calculada pela fórmula Velocidade = Distância / Tempo. Embora a física tecnicamente distinga entre 'rapidez' (escalar, sem direção) e 'velocidade' (vetorial, com direção), na linguagem cotidiana os dois termos costumam ser usados indistintamente.",
          "A velocidade é uma grandeza derivada, obtida dividindo uma unidade de comprimento por uma unidade de tempo. Por isso sua dimensão SI é denotada L/T (ou L¹T⁻¹).",
        ],
      },
      {
        title: "A unidade SI da velocidade: o metro por segundo",
        paragraphs: [
          "No Sistema Internacional de Unidades, a unidade derivada de velocidade é o metro por segundo (m/s), que expressa que um objeto percorre um metro a cada segundo. Essa unidade é usada como padrão em cálculos científicos e fórmulas de física.",
          "No dia a dia, prefere-se o quilômetro por hora (km/h) ao metro por segundo, porque as velocidades dos veículos e as distâncias rodoviárias são expressas assim com números mais intuitivos nessa escala. 1 m/s equivale exatamente a 3,6 km/h.",
        ],
      },
      {
        title: "O quilômetro por hora e a milha por hora",
        paragraphs: [
          "O quilômetro por hora (km/h) é a unidade padrão de velocidade rodoviária nos países que usam o sistema métrico, incluindo o Brasil. A milha por hora (mph) é preferida em países que usam o sistema de medidas britânico, como Estados Unidos e Reino Unido.",
          "1 mph equivale a cerca de 1,60934 km/h. Essa diferença é uma fonte prática de confusão que pode levar a interpretar mal os velocímetros de veículos importados ou os limites de velocidade ao alugar um carro no exterior.",
        ],
      },
      {
        title: "O nó: a velocidade na navegação marítima e aérea",
        paragraphs: [
          "O nó (milha náutica por hora) é a unidade de velocidade padrão na navegação marítima e aérea; 1 nó significa exatamente percorrer uma milha náutica (1852 metros) em uma hora.",
          "O nome da unidade 'nó' vem historicamente do método usado para medir a velocidade dos navios: jogava-se na água uma corda marcada com nós e contava-se quantos nós passavam em um tempo determinado. Esse método foi usado durante séculos antes do surgimento dos instrumentos modernos de medição de velocidade.",
        ],
      },
      {
        title: "A velocidade da luz: o limite de velocidade do universo",
        paragraphs: [
          "A velocidade da luz no vácuo é definida exatamente como 299.792.458 m/s e constitui, segundo a teoria da relatividade especial de Einstein, o limite superior absoluto que pode ser alcançado pela informação ou por um objeto com massa no universo.",
          "O fato de a velocidade da luz ser definida como um número exato (e já ser considerada constante antes da revisão do SI de 2019) permite que a definição atual do metro também se apoie nessa constante -- o metro é definido como a distância percorrida pela luz em 1/299.792.458 de segundo.",
        ],
      },
      {
        title: "O número de Mach: uma relação com a velocidade do som",
        paragraphs: [
          "Na aviação, velocidades altas costumam ser expressas pelo número de Mach, que representa a relação entre a velocidade de um objeto e a velocidade do som naquele meio (Mach 1 = velocidade do som). A velocidade do som não é um valor fixo; varia conforme a temperatura e a densidade do ar (cerca de 343 m/s, ou 1235 km/h, ao nível do mar).",
          "Por isso, um mesmo número de Mach pode corresponder a velocidades reais diferentes (em km/h ou m/s) conforme a altitude e a temperatura -- a velocidade Mach 0,85 de um avião varia em seu valor real com a altitude.",
        ],
      },
      {
        title: "A diferença entre velocidade média e velocidade instantânea",
        paragraphs: [
          "A velocidade média é obtida dividindo a distância total percorrida pelo tempo total decorrido e fornece um único valor para todo um trajeto. A velocidade instantânea é a velocidade de um objeto em um momento específico e pode variar continuamente (aceleração, desaceleração, parada, etc.).",
          "Enquanto o velocímetro de um veículo mostra a velocidade instantânea, a velocidade média de um trajeto costuma ser calculada posteriormente a partir da distância total e da duração total -- ambos os valores diferem enquanto a velocidade não tiver se mantido constante durante o trajeto.",
        ],
      },
    ],
    unitTable: [
      { name: "Centímetro por segundo", symbol: "cm/s", referenceValue: "0,01 m/s", system: "SI/métrico", commonUse: "Laboratório e medição de movimento lento" },
      { name: "Metro por minuto", symbol: "m/min", referenceValue: "≈0,0167 m/s", system: "SI/métrico", commonUse: "Velocidade de esteiras transportadoras industriais" },
      { name: "Metro por segundo", symbol: "m/s", referenceValue: "1 m/s", system: "SI", commonUse: "Cálculos científicos e físicos" },
      { name: "Quilômetro por hora", symbol: "km/h", referenceValue: "≈0,278 m/s", system: "Métrico", commonUse: "Velocidade de veículos e limites rodoviários" },
      { name: "Milha por hora", symbol: "mph", referenceValue: "≈0,447 m/s", system: "Britânico/norte-americano", commonUse: "Velocidade de veículos nos EUA e Reino Unido" },
      { name: "No", symbol: "kn", referenceValue: "≈0,514 m/s", system: "Navegação marítima/aérea", commonUse: "Velocidade de navios e aviões" },
      { name: "Quilômetro por minuto", symbol: "km/min", referenceValue: "≈16,67 m/s", system: "Métrico", commonUse: "Cálculos de velocidade em distâncias curtas" },
      { name: "Quilômetro por segundo", symbol: "km/s", referenceValue: "1000 m/s", system: "Métrico", commonUse: "Velocidade de naves espaciais e corpos celestes" },
      { name: "Velocidade da luz", symbol: "c", referenceValue: "299.792.458 m/s", system: "Constante universal", commonUse: "Cálculos de física e astronomia" },
    ],
  },
  {
    locale: "pt",
    slug: "pressao",
    sourceSlug: "basinc",
    category: "basinc",
    title: "Conversão de unidades de pressão",
    description:
      "Converta a pressão entre pascal, quilopascal, bar e PSI; consulte fórmulas e usos na engenharia.",
    introduction: [
      "A pressão é a grandeza física que expressa a quantidade de força que atua perpendicularmente sobre uma superfície, em relação a essa superfície. Seu campo de aplicação é muito amplo, desde as tensões de contato entre sólidos até o fluido em uma tubulação, da atmosfera aos sistemas de vácuo. Na engenharia, a pressão não é apenas um valor numérico: é uma variável de projeto fundamental para a segurança, a estanqueidade, a resistência estrutural, a conversão de energia e o controle de processos.",
      "No Sistema Internacional de Unidades, a unidade derivada de pressão é o pascal, simbolizado por Pa. Um pascal corresponde à pressão exercida por uma força de um newton distribuída uniformemente sobre uma superfície de um metro quadrado. Por isso a pressão está diretamente ligada aos conceitos de força e superfície; compartilha a mesma estrutura dimensional com a tensão mecânica dos materiais, embora o contexto físico nem sempre seja o mesmo.",
      "No dia a dia e na indústria, a pressão é expressa na maioria das vezes em unidades mais práticas que o pascal. O quilopascal e o PSI são muito usados para a pressão dos pneus, o bar em sistemas de processo, o atm em condições atmosféricas e o milibar em meteorologia. O fato de diferentes setores terem adotado historicamente unidades diferentes torna especialmente importante entender bem as conversões de pressão e não confundir os tipos de pressão absoluta, relativa ou diferencial.",
    ],
    facts: [
      { label: "Grandeza física", value: "Pressão" },
      { label: "Unidade derivada do SI", value: "Pascal" },
      { label: "Simbolo SI", value: "Pa" },
      { label: "Relação básica", value: "P = F / A" },
      { label: "Equivalente SI", value: "1 Pa = 1 N/m²" },
      { label: "Formula dimensional", value: "M L⁻¹ T⁻²" },
      { label: "Atmosfera padrão", value: "101.325 Pa" },
      { label: "Referência do zero absoluto", value: "Vácuo total" },
    ],
    sections: [
      {
        title: "O que é a pressão?",
        paragraphs: [
          "A pressão não depende apenas da magnitude da força aplicada sobre uma superfície, mas também da superfície sobre a qual essa força é distribuída. Se a mesma força for aplicada sobre uma superfície menor, a pressão aumenta; se for distribuída sobre uma superfície maior, diminui. Por isso uma faca bem afiada pode cortar com pouca força, enquanto a mesma força sobre uma base larga produz um efeito superficial muito menor.",
          "Na mecânica dos fluidos, a pressão é considerada a componente de tensão normal que um fluido em repouso ou em movimento exerce sobre seu entorno. Em um fluido em repouso, a pressão é transmitida em todas as direções e está relacionada ao princípio de Pascal em recipientes fechados. Essa propriedade é a base das prensas hidráulicas, dos sistemas de freio e de diversos atuadores industriais.",
          "O conceito de pressão não se limita a líquidos e gases. O efeito da força normal média nas superfícies de contato também cria uma distribuição semelhante à pressão. Mas na engenharia, ao falar de pressão costuma-se pensar principalmente em sistemas fluidos como tubulações, reservatórios, compressores, dutos de ar, câmaras de vácuo e o ambiente atmosférico.",
        ],
      },
      {
        title: "A fórmula da pressão: P = F / A",
        paragraphs: [
          "A definição básica da pressão é dada pela relação P = F / A. Aqui, P representa a pressão, F a componente de força perpendicular à superfície, e A a superfície sobre a qual essa força é distribuída. A análise dimensional resulta em newton dividido por metro quadrado, o que equivale à unidade pascal.",
          "Essa relação, supondo uma distribuição uniforme da força, fornece a pressão média. Em problemas de contato reais ou em campos complexos dentro de um fluido, a pressão pode variar ao longo da superfície. Nesse caso, em vez de um único valor médio, considera-se a distribuição local de pressão, equações diferenciais e condições de contorno.",
          "Um erro frequente na prática é escolher mal a direção da força e a superfície efetiva. Por exemplo, ao calcular a força de um pistão, deve-se usar apenas a superfície de seção efetiva submetida à pressão. Ignorar detalhes geométricos como a junta, o parafuso ou a superfície de apoio pode causar erros de projeto.",
        ],
      },
      {
        title: "Por que o pascal é a unidade SI de pressão?",
        paragraphs: [
          "O pascal surge de forma natural da combinação do newton, unidade SI de força, e do metro quadrado, unidade SI de superfície. A igualdade 1 Pa = 1 N/m² não é apenas uma definição, mas também uma expressão dimensional que mostra a origem mecânica da pressão. Por isso não é necessário definir uma unidade básica independente para a pressão.",
          "O sistema SI busca relacionar de forma coerente as grandezas derivadas com as unidades básicas. Expressar a pressão em pascals fornece um arcabouço compatível com a densidade de energia, a tensão, o módulo de elasticidade e as equações de mecânica dos fluidos. O fato de uma mesma unidade poder ser usada em diferentes campos reduz os erros de conversão nos cálculos.",
          "Em escala cotidiana, o pascal costuma ser uma unidade muito pequena. Por isso a engenharia prefere escalas mais práticas como o quilopascal, o megapascal ou o bar. Ainda assim, todas elas acabam vinculadas ao pascal e, portanto, à base do SI.",
        ],
      },
      {
        title: "A história da medição da pressão: Torricelli e o barômetro",
        paragraphs: [
          "A medição sistemática da pressão começou em 1643 com o desenvolvimento do barômetro de mercúrio pelo cientista italiano Evangelista Torricelli. Torricelli observou que, ao submergir um tubo de vidro fechado em uma extremidade e cheio de mercúrio, com a extremidade aberta em um recipiente de mercúrio, o mercúrio do tubo parava em uma certa altura deixando um vácuo acima.",
          "Torricelli propôs que a altura da coluna de mercúrio era equilibrada pelo peso do ar exterior. Essa ideia estabeleceu a base experimental da noção de que o ar tem um peso mensurável e, portanto, uma pressão, e é considerada o ponto de partida do estudo da pressão como grandeza científica.",
          "Em 1648, por sugestão de Blaise Pascal, Florin Périer mediu um barômetro em diferentes altitudes no Puy de Dôme e demonstrou que a pressão atmosférica diminui com a altitude. Os trabalhos posteriores baseados nesses fundamentos trouxeram a coordenação internacional das unidades de medida com a Convenção do Metro de 1875, a definição precisa da atmosfera padrão em 1954 e a adoção do pascal no SI em 1971.",
        ],
      },
      {
        title: "Pressão absoluta, relativa e diferencial",
        paragraphs: [
          "A pressão absoluta é medida em relação ao vácuo total. Essa referência é a situação em que a pressão é teoricamente nula, e a pressão absoluta nunca pode ser negativa. As leis dos gases, os cálculos termodinâmicos e algumas relações ligadas à densidade funcionam com pressão absoluta.",
          "A pressão relativa (ou manométrica) é medida em relação à pressão atmosférica. A maioria dos manômetros de campo toma a atmosfera circundante como referência zero; por isso o valor lido na tela costuma ser pressão relativa. A relação entre pressão absoluta e relativa se expressa como P_abs = P_rel + P_atm.",
          "A pressão diferencial é a diferença de pressão entre dois pontos. Em aplicações como a obstrução de um filtro, a medição de vazão por meio de uma placa de orifício, a pressurização de uma sala ou o desempenho de um trocador de calor, acompanha-se diretamente a diferença de pressão entre duas linhas ou dois volumes distintos. Essa grandeza não é definida nem em relação ao vácuo total nem em relação apenas à atmosfera; é diretamente a diferença entre dois pontos.",
        ],
      },
      {
        title: "A pressão atmosférica",
        paragraphs: [
          "A pressão atmosférica é a pressão exercida sobre as superfícies pelo peso da coluna de ar da atmosfera terrestre. Em condições padrão próximas ao nível do mar, considera-se cerca de 101.325 Pa, ou seja, 1 atm. No entanto, esse valor não é constante; varia com a altitude, as condições meteorológicas e a temperatura.",
          "Barômetros são usados para medir a pressão atmosférica. Os barômetros de mercúrio foram historicamente instrumentos de referência, enquanto os sensores de pressão eletrônicos se generalizaram nas aplicações modernas. A pressão atmosférica é importante não apenas para a meteorologia, mas também para a tecnologia de vácuo, os sistemas de combustão e as conversões entre pressão relativa e absoluta.",
          "Em sistemas que funcionam com pressão relativa, as variações da pressão atmosférica podem afetar a interpretação da medição. Por exemplo, uma pressão relativa de 2 bar ao nível do mar e uma pressão relativa de 2 bar em grande altitude não fornecem o mesmo valor absoluto. Essa distinção pode ser determinante, especialmente em cálculos de compressão, densidade de gases e ponto de ebulição.",
        ],
      },
      {
        title: "A pressão hidrostática e a relação P = ρgh",
        paragraphs: [
          "Em um fluido em repouso, a pressão aumenta com a profundidade. Supondo densidade constante, a pressão relativa hidrostática se expressa aproximadamente pela relação P = ρgh. Aqui, ρ representa a densidade, g a aceleração da gravidade e h a altura da coluna de fluido.",
          "Essa relação é especialmente útil para reservatórios de água, tanques abertos, represas, medição de nível e manômetros de coluna líquida. Na mesma altura e no mesmo fluido, a pressão é considerada igual; a forma do recipiente não muda o resultado. O que determina o resultado é a densidade do fluido e a profundidade vertical em relação à superfície livre.",
          "A pressão hidrostática absoluta inclui não apenas o incremento ρgh, mas também a pressão inicial na superfície livre. Em um recipiente aberto, esse valor inicial costuma ser a pressão atmosférica. Portanto, ao calcular a pressão absoluta, deve-se somar não apenas o incremento devido à coluna de líquido, mas também a pressão externa sobre a superfície.",
        ],
      },
      {
        title: "Pressão estática, dinâmica e total",
        paragraphs: [
          "A pressão estática é a componente de pressão que representa o estado termodinâmico local do escoamento, do ponto de vista de um observador que se move com o fluido. A maioria dos pontos de medição em tubulações, reservatórios e dutos segue fundamentalmente a pressão estática. A maioria dos transmissores de pressão é projetada para medir essa grandeza.",
          "A pressão dinâmica expressa o efeito cinético devido à velocidade do escoamento e sua fórmula aproximada usual é q = 1/2 ρv². Esse termo desempenha um papel importante na abordagem de Bernoulli e é usado em métodos de medição de velocidade como o tubo de Pitot. Quanto maior a velocidade, maior a pressão dinâmica.",
          "Na abordagem de escoamento ideal, a pressão total é interpretada como a soma da pressão estática e da dinâmica. Em sistemas reais, essa distinção deve ser usada com cuidado devido ao atrito, à turbulência, à compressibilidade e às perdas locais. Ainda assim, a distinção estática-total-dinâmica continua sendo uma linguagem de engenharia fundamental em ventilação, aerodinâmica e medições de processo.",
        ],
      },
      {
        title: "A altura de pressão e a altura manométrica de uma bomba",
        paragraphs: [
          "A altura de pressão expressa uma pressão determinada em termos da altura equivalente de uma coluna de fluido. A relação básica se escreve h = P / (ρg). Assim, uma mesma pressão corresponde a uma altura diferente conforme a densidade do fluido.",
          "Nos sistemas de bombeamento, a pressão é interpretada na maioria das vezes não diretamente em pascals ou bar, mas em metros de coluna de fluido. Isso ocorre porque a função da bomba não é apenas dar pressão ao fluido, mas também fornecer a energia necessária para vencer uma determinada altura, as perdas por atrito e uma componente de velocidade. Por isso o conceito de altura manométrica é muito prático do ponto de vista da engenharia de campo.",
          "A altura de pressão e a altura geométrica não são o mesmo conceito. Confiar apenas na leitura de um manômetro sem considerar as perdas de carga nas tubulações, a carga de velocidade e as resistências locais pode gerar resultados errados na seleção de bombas e no balanceamento do sistema. Especialmente na água, no óleo e nos fluidos de processo, as diferenças de densidade exigem uma conversão feita com cuidado.",
        ],
      },
      {
        title: "Por que as unidades de pressão são diferentes?",
        paragraphs: [
          "A diversidade de unidades de pressão se explica em grande parte por razões históricas e setoriais. Enquanto o sistema SI toma o pascal como referência, a indústria continua usando o bar, a medicina o mmHg, a meteorologia o milibar, a automoção o PSI, e alguns documentos técnicos antigos a atmosfera técnica. Essa situação ocorre porque as diferentes áreas mantêm seus próprios hábitos de uso.",
          "Algumas unidades são mais intuitivas para o usuário. Por exemplo, a pressão de um pneu pode parecer mais legível expressa em cerca de 35 psi do que em 240 kPa, e a pressão de um processo em 3,5 bar em vez de 350.000 Pa. A escolha da unidade não depende apenas da precisão, mas também da cultura dos relatórios, da escala dos aparelhos e dos hábitos de campo.",
          "No entanto, como diferentes unidades expressam a mesma grandeza física, nos cálculos conjuntos é indispensável uma conversão cuidadosa. Confundir coeficientes aproximados com coeficientes definidos exatamente, ignorar a distinção relativa-absoluta, e ler mal os símbolos são fontes de erro importantes.",
        ],
      },
      {
        title: "Como se mede a pressão?",
        paragraphs: [
          "Para medir a pressão, primeiro é preciso determinar o tipo de pressão exigido: absoluta, relativa ou diferencial. Depois avalia-se a faixa de medição, o tipo de fluido, a temperatura, a compatibilidade química, as vibrações e o nível de precisão exigido. Um mesmo sensor pode não ser adequado para todas as aplicações.",
          "Para medições de baixa pressão e diferencial, podem ser usados transmissores diferenciais de diafragma; para altas pressões de processo, elementos de extensometria ou piezorresistivos; e para aplicações de vácuo, sensores absolutos específicos. Os manômetros de coluna líquida são muito úteis para ensinar o princípio básico; mas na indústria moderna são mais comuns os equipamentos eletrônicos.",
          "Para uma medição precisa, é preciso considerar a localização das linhas de impulso, a posição de montagem do sensor, o ajuste de zero e os efeitos da temperatura. Em linhas de gás e líquido, uma diferença de densidade ou uma condensação pode criar uma carga hidrostática adicional sobre o sensor. Por isso os detalhes de instalação determinam o resultado tanto quanto a escolha do equipamento.",
        ],
      },
      {
        title: "Sensores de pressão e manômetros",
        paragraphs: [
          "Os manômetros mecânicos, como os indicadores de tubo de Bourdon, convertem a pressão em um movimento de ponteiro legível por meio da deformação de um elemento elástico. Robustos, simples e sem necessidade de energia, são usados há muito tempo na indústria. No entanto, em aplicações que exigem precisão e registro de dados, os sensores eletrônicos são mais flexíveis.",
          "Os sensores de pressão eletrônicos podem ser piezorresistivos, capacitivos, de extensometria ou baseados em ressonância. Esses sensores convertem a variação de pressão em um sinal elétrico, que é transmitido a sistemas PLC, SCADA ou de aquisição de dados. Isso permite não apenas uma leitura instantânea, mas também alarmes, controle e análise de tendências.",
          "Os manômetros diferenciais fornecem a diferença de pressão entre dois pontos, os sensores absolutos a pressão em relação ao vácuo total, e os aparelhos manométricos a pressão em relação à atmosfera. Confiar apenas no valor numérico sem verificar o tipo de referência na ficha técnica de um equipamento pode levar a erros graves de interpretação.",
        ],
      },
      {
        title: "Áreas de uso da pressão na engenharia",
        paragraphs: [
          "A pressão é uma variável de projeto fundamental em diversas áreas da engenharia: tubulações, climatização, hidráulica, pneumática, processos químicos, usinas de energia, sistemas de distribuição de água, automoção e aeronáutica. Da espessura da parede de um reservatório à seleção de válvulas, das condições de saída de um compressor ao desempenho de um filtro, muitas decisões se baseiam em informações de pressão.",
          "Na engenharia de processos, os limites de pressão são monitorados para a operação segura de reatores, caldeiras, trocadores e separadores. As válvulas de segurança de pressão, os discos de ruptura e os malhas de controle são, portanto, equipamentos críticos. A pressão também é usada para a medição indireta de outras variáveis de processo, como vazão e nível.",
          "Na engenharia mecânica e da construção, a pressão é combinada com as superfícies de contato e as forças dos fluidos em análises de tensão. Na medicina e em dispositivos biomédicos, destacam-se a pressão arterial, as pressões de ventilação e as aplicações de vácuo; no meio ambiente e na meteorologia, as medições de pressão atmosférica e diferencial.",
        ],
      },
      {
        title: "Temperatura, altitude e incerteza na medição de pressão",
        paragraphs: [
          "A temperatura pode afetar tanto as propriedades do fluido medido quanto o comportamento do elemento sensor. Especialmente nos gases, como a temperatura modifica a densidade, é preciso reavaliar a relação pressão-volume-temperatura. Por isso, nas fichas técnicas dos sensores aparecem parâmetros como o desvio de zero e o desvio de span dependentes da temperatura.",
          "A pressão atmosférica costuma diminuir com a altitude. Essa situação modifica a relação entre a pressão relativa e a absoluta, e também pode afetar o comportamento de referência de alguns equipamentos de campo. Uma mesma condição de processo pode fornecer resultados de pressão absoluta diferentes em diferentes altitudes.",
          "Toda medição carrega uma incerteza. O padrão de calibração, a resolução, a histerese, o efeito da temperatura, a orientação de montagem, as vibrações e a deriva a longo prazo contribuem para a incerteza total. Em aplicações críticas, a decisão de projeto deve incorporar não apenas o valor nominal de pressão, mas também a classe do equipamento e a confiabilidade da medição.",
        ],
      },
      {
        title: "A relação e a diferença entre pressão e tensão",
        paragraphs: [
          "A pressão e a tensão compartilham a mesma estrutura dimensional e ambas podem ser expressas em pascals. Essa semelhança ocorre porque ambas representam um efeito de força por unidade de superfície. Mas isso não significa que sejam fisicamente a mesma grandeza.",
          "A pressão é geralmente concebida como uma tensão normal isotrópica exercida pelos fluidos; ou seja, em um fluido em repouso, a pressão em um mesmo ponto é idêntica em todas as direções. A tensão na mecânica dos sólidos, por outro lado, pode ter componentes normais e de cisalhamento, depender da direção e ter uma estrutura tensorial.",
          "Ignorar essa distinção pode causar interpretações erradas, especialmente em cálculos de parede de reservatório, superfície de junta ou resistência de materiais. A pressão interna de um fluido cria tensões circunferenciais e axiais sobre o reservatório; mas o campo de tensões no material do reservatório não é idêntico à pressão do fluido em si.",
        ],
      },
      {
        title: "Erros frequentes nos cálculos de pressão",
        paragraphs: [
          "O erro mais frequente é confundir a pressão relativa com a absoluta. Especialmente nas leis dos gases, nos cálculos de densidade e nas aplicações de vácuo, exige-se pressão absoluta, mas às vezes usa-se diretamente o valor relativo lido em um manômetro. Isso cria um erro sistemático no resultado.",
          "Outro erro consiste em arredondar os coeficientes de conversão ou usar uma referência de unidade incorreta. Ao converter entre PSI, bar, atm, mmHg e kPa, é preciso decidir qual nível de precisão é suficiente para os valores aproximados. Se a calibração do equipamento exige alta precisão, usar um número insuficiente de casas decimais pode causar problemas.",
          "Também são frequentes ignorar os efeitos hidrostáticos, desconsiderar a altura de montagem do sensor e não levar em conta o efeito da temperatura. Especialmente em linhas de impulso cheias de líquido, reservatórios fechados e aplicações de pressão diferencial, detalhes de instalação aparentemente menores podem modificar significativamente o resultado da medição.",
        ],
      },
    ],
    unitTable: [
      { name: "Pascal", symbol: "Pa", referenceValue: "1 Pa", system: "SI", commonUse: "Cálculos científicos e de engenharia" },
      { name: "Quilopascal", symbol: "kPa", referenceValue: "1000 Pa", system: "SI", commonUse: "Instalações, pneus e pressão de processo" },
      { name: "Bar", symbol: "bar", referenceValue: "100.000 Pa", system: "Métrico, fora do SI", commonUse: "Indústria, compressores e sistemas de processo" },
      { name: "Milibar", symbol: "mbar", referenceValue: "100 Pa", system: "Métrico, fora do SI", commonUse: "Meteorologia e medições atmosféricas" },
      { name: "Atmosfera padrão", symbol: "atm", referenceValue: "101.325 Pa", system: "Fora do SI", commonUse: "Atmosfera e condições de referência" },
      { name: "PSI", symbol: "psi", referenceValue: "≈6894,757293 Pa", system: "Britânico/norte-americano", commonUse: "Pneus, sistemas hidráulicos e pneumáticos" },
      { name: "Atmosfera técnica", symbol: "at", referenceValue: "98.066,5 Pa", system: "Fora do SI", commonUse: "Aplicações técnicas antigas" },
      { name: "Milímetro de mercúrio", symbol: "mmHg", referenceValue: "≈133,322 Pa", system: "Fora do SI", commonUse: "Medicina, vácuo e medições de pressão" },
      { name: "Milímetro de coluna de água", symbol: "mmH₂O", referenceValue: "≈9,80665 Pa", system: "Fora do SI", commonUse: "Medições de baixa pressão e ventilação" },
      { name: "Quilograma-força por centímetro quadrado", symbol: "kgf/cm²", referenceValue: "98.066,5 Pa", system: "Métrico, fora do SI", commonUse: "Antigos manômetros de bombas e caldeiras" },
    ],
  },
  {
    locale: "pt",
    slug: "energia",
    sourceSlug: "enerji",
    category: "enerji",
    title: "Conversão de unidades de energia",
    description:
      "Compare em uma única categoria as conversões de energia baseadas em joule, quilowatt-hora, caloria e BTU.",
    introduction: [
      "A energia é a grandeza física fundamental que expressa a capacidade de um sistema realizar trabalho. No Sistema Internacional de Unidades, a unidade derivada de energia é o joule, obtido a partir do produto de uma força e um deslocamento.",
      "No dia a dia, usam-se o quilowatt-hora (kWh) para as contas de energia elétrica, a caloria/quilocaloria em nutrição, o BTU em sistemas de climatização, o therm na cobrança de gás natural, e o eletronvolt na física de partículas subatômicas.",
    ],
    facts: [
      { label: "Grandeza física", value: "Energia (trabalho)" },
      { label: "Simbolo dimensional", value: "[ML²T⁻²]" },
      { label: "Unidade derivada do SI", value: "Joule" },
      { label: "Simbolo da unidade SI", value: "J" },
      { label: "Definição do joule", value: "1 J = deslocamento de 1 metro sob uma força de 1 newton (1 N·m)" },
    ],
    sections: [
      {
        title: "O que é a energia?",
        paragraphs: [
          "A energia é a capacidade de um objeto ou sistema realizar trabalho. Pode existir em muitas formas -- energia cinética (movimento), energia potencial (posição), energia térmica, energia química e energia elétrica -- e, segundo o princípio de conservação da energia, pode se transformar de uma forma em outra sem que sua quantidade total seja criada ou desaparecida.",
          "A energia é uma grandeza derivada, obtida pelo produto de uma força e um deslocamento (trabalho), e sua dimensão SI é denotada ML²T⁻² (massa × comprimento ao quadrado / tempo ao quadrado).",
        ],
      },
      {
        title: "A unidade SI da energia: o joule",
        paragraphs: [
          "O joule é a unidade derivada do SI para energia, simbolizado por J; recebe esse nome em homenagem ao físico britânico do século XIX James Prescott Joule. Um joule equivale à energia necessária para deslocar um objeto 1 metro sob o efeito de uma força de 1 newton.",
          "Como o joule ainda é uma unidade muito pequena para expressar muitas quantidades de energia cotidianas, na engenharia e no uso diário preferem-se seus múltiplos: o quilojoule (mil joules) e o megajoule (um milhão de joules).",
        ],
      },
      {
        title: "O quilowatt-hora: a unidade das contas de energia elétrica",
        paragraphs: [
          "O quilowatt-hora (kWh) é a quantidade de energia consumida por uma potência de um quilowatt usada durante uma hora, e constitui a unidade padrão de cobrança de energia elétrica no mundo todo. 1 kWh equivale exatamente a 3.600.000 joules (3,6 megajoules).",
          "Para calcular o consumo de energia de um aparelho elétrico, basta multiplicar sua potência (em watts) pelo seu tempo de funcionamento (em horas); por exemplo, um aparelho de 2000 watts que funciona 3 horas consome 6 kWh de energia.",
        ],
      },
      {
        title: "A caloria e a quilocaloria: a energia na nutrição",
        paragraphs: [
          "A caloria foi originalmente definida como a quantidade de energia necessária para elevar em 1 °C a temperatura de um grama de água, e 1 caloria equivale exatamente a 4,184 joules.",
          "O valor de 'calorias' que aparece nos rótulos dos alimentos é, na verdade, em sentido científico, quilocalorias (1000 calorias) -- essa convenção de nomenclatura em nutrição costuma gerar confusão; quando se diz que um alimento tem '200 calorias', na verdade fala-se de 200 quilocalorias (200.000 calorias).",
        ],
      },
      {
        title: "O BTU e o therm: a energia da climatização e do gás natural",
        paragraphs: [
          "O BTU (British Thermal Unit) é a quantidade de energia necessária para elevar em 1 °F a temperatura de uma libra de água; é uma unidade de origem norte-americana, mas amplamente usada no mundo para expressar a capacidade de sistemas de aquecimento e ar-condicionado. 1 BTU equivale a cerca de 1055,06 joules.",
          "O therm é uma grande unidade de energia usada na cobrança de gás natural e equivale exatamente a 100.000 BTU. Em alguns países, o consumo de gás natural é cobrado diretamente em therms em vez de metros cúbicos.",
        ],
      },
      {
        title: "O eletronvolt: a unidade do mundo subatômico",
        paragraphs: [
          "O eletronvolt (eV) expressa a energia cinética que um elétron adquire ao atravessar uma diferença de potencial de um volt; é uma unidade de energia extremamente pequena (1 eV ≈ 1,602176634 × 10⁻¹⁹ joules).",
          "Na física de partículas e na física atômica, as energias costumam ser expressas em eletronvolts (e seus múltiplos keV, MeV, GeV) em vez de joules, porque nessa escala o joule resulta em números extremamente pequenos e pouco práticos.",
        ],
      },
      {
        title: "O princípio de conservação da energia",
        paragraphs: [
          "Segundo o princípio de conservação da energia, também conhecido como a primeira lei da termodinâmica, a energia total de um sistema fechado permanece constante; a energia não é criada nem destruída, apenas se transforma de uma forma em outra.",
          "Por exemplo, no motor de um carro, a energia química (combustível) se transforma primeiro em energia térmica e depois em energia mecânica (movimento); embora nesse processo parte da energia se converta em calor não aproveitável por atrito e escape, a quantidade total de energia não muda.",
        ],
      },
      {
        title: "Por que a conversão entre unidades de energia é importante?",
        paragraphs: [
          "Diferentes setores preferem tradicionalmente unidades de energia diferentes: a engenharia elétrica o quilowatt-hora, a ciência da nutrição a quilocaloria, o setor de climatização o BTU, e o setor de gás natural o therm. Conseguir converter corretamente entre essas diferentes unidades é essencial para comparar a eficiência energética e calcular custos.",
          "Por exemplo, para comparar a eficiência de uma bomba de calor com a de uma caldeira a gás natural, é preciso converter o consumo de energia de ambos os sistemas para uma unidade comum (geralmente kWh ou joules).",
        ],
      },
    ],
    unitTable: [
      { name: "Joule", symbol: "J", referenceValue: "1 J", system: "SI", commonUse: "Cálculos científicos e físicos de energia" },
      { name: "Quilojoule", symbol: "kJ", referenceValue: "1000 J", system: "SI/métrico", commonUse: "Energia alimentar (em alguns países)" },
      { name: "Megajoule", symbol: "MJ", referenceValue: "1.000.000 J", system: "SI/métrico", commonUse: "Combustível e grandes quantidades de energia" },
      { name: "Caloria", symbol: "cal", referenceValue: "4,184 J", system: "Métrico (tradicional)", commonUse: "Nutrição e química" },
      { name: "Quilocaloria", symbol: "kcal", referenceValue: "4184 J", system: "Métrico (tradicional)", commonUse: "Rótulos de alimentos ('calorias')" },
      { name: "Watt-hora", symbol: "Wh", referenceValue: "3600 J", system: "Métrico (eletricidade)", commonUse: "Consumo de pequenos aparelhos" },
      { name: "Quilowatt-hora", symbol: "kWh", referenceValue: "3.600.000 J", system: "Métrico (eletricidade)", commonUse: "Cobrança de energia elétrica" },
      { name: "BTU", symbol: "Btu", referenceValue: "≈1055,06 J", system: "Britânico/norte-americano", commonUse: "Capacidade de climatização e aquecimento" },
      { name: "Therm", symbol: "th", referenceValue: "≈105.506.000 J", system: "Britânico/norte-americano", commonUse: "Cobrança de gás natural" },
      { name: "Eletronvolt", symbol: "eV", referenceValue: "≈1,602 × 10⁻¹⁹ J", system: "Física atômica/de partículas", commonUse: "Medição de energia atômica e nuclear" },
    ],
  },
  {
    locale: "pt",
    slug: "armazenamento-de-dados",
    sourceSlug: "veri",
    category: "veri",
    title: "Conversão de unidades de armazenamento de dados",
    description:
      "Converta entre bytes, kilobytes, megabytes, gigabytes e terabytes; compare os cálculos baseados em 1000 e 1024.",
    introduction: [
      "A unidade de armazenamento de dados (informação) expressa a quantidade de informação armazenada ou processada em um sistema de computação. A unidade mais básica é o bit; oito bits juntos formam um byte.",
      "Ao falar de armazenamento e velocidade de internet, aparecem tanto unidades decimais (base 1000) como kilobyte, megabyte, gigabyte e terabyte, quanto unidades binárias (base 1024) como kibibyte, mebibyte e gibibyte usadas pelos sistemas operacionais -- a diferença entre esses dois sistemas é a razão principal pela qual um disco comprado parece ter 'menos' espaço.",
    ],
    facts: [
      { label: "Menor unidade", value: "Bit (0 ou 1)" },
      { label: "Unidade básica", value: "Byte = 8 bits" },
      { label: "Sistema decimal (SI)", value: "1 KB = 1000 bytes, 1 MB = 1000 KB" },
      { label: "Sistema binário (IEC)", value: "1 KiB = 1024 bytes, 1 MiB = 1024 KiB" },
      { label: "Diferença entre 1000 e 1024", value: "≈7,4% de diferença entre 1 GB (decimal) e 1 GiB (binário)" },
    ],
    sections: [
      {
        title: "O que são o bit e o byte?",
        paragraphs: [
          "O bit (dígito binário) é a menor unidade de informação que um computador pode processar e só pode assumir dois valores: 0 ou 1. Oito bits juntos formam um byte; um byte pode representar 256 (2⁸) valores distintos -- suficiente, por exemplo, para codificar um caractere de texto.",
          "O bit é geralmente abreviado com um 'b' minúsculo e o byte com um 'B' maiúsculo; essa distinção pode gerar confusão, especialmente entre as velocidades de internet (Mbps = megabits por segundo) e o tamanho dos arquivos (MB = megabytes) -- uma conexão de internet de 100 Mbps corresponde teoricamente a uma velocidade de download de cerca de 12,5 MB por segundo (100 ÷ 8).",
        ],
      },
      {
        title: "Por que existem dois sistemas de unidades diferentes?",
        paragraphs: [
          "Como os computadores funcionam em sistema binário, o endereçamento de memória está naturalmente ligado a potências de 2 (como 1024, 1.048.576). Por isso o mundo do software historicamente entendeu 'kilobyte' como 1024 bytes.",
          "Os fabricantes de discos preferem, por razões de marketing e facilidade de cálculo, o prefixo decimal do SI (base 1000) -- um disco anunciado como '1 TB' por um fabricante contém na verdade exatamente 1.000.000.000.000 bytes, mas como o sistema operacional calcula em base 1024, ele exibe na tela um número menor, como '931 GB'.",
        ],
      },
      {
        title: "O padrão IEC: KiB, MiB, GiB",
        paragraphs: [
          "Para resolver essa confusão, em 1998 a Comissão Eletrotécnica Internacional (IEC) padronizou nomes distintos (kibibyte, mebibyte, gibibyte, tebibyte) e símbolos (KiB, MiB, GiB, TiB) para as unidades em base binária.",
          "Segundo esse padrão, os prefixos tradicionais como KB/MB/GB deveriam ser usados apenas em sentido decimal (base 1000), e para os valores em base 1024 seriam preferidos prefixos 'binários' como KiB/MiB/GiB. No entanto, no uso cotidiano e em muitos programas essa distinção ainda não é aplicada de forma coerente.",
        ],
      },
      {
        title: "Por que a diferença entre 1000 e 1024 cresce?",
        paragraphs: [
          "Enquanto no nível de kilobyte (1000 versus 1024) a diferença é de apenas 2,4%, essa diferença aumenta a cada unidade superior: no nível de megabyte é de ≈4,9%, no nível de gigabyte de ≈7,4%, e no nível de terabyte chega a ≈10%.",
          "Por isso, em grandes capacidades de armazenamento (como um disco de 1 TB), a diferença entre o cálculo decimal e o binário se torna grande o suficiente para dar ao usuário a impressão visível de ter 'menos espaço' (uma diferença de cerca de 90 GB).",
        ],
      },
      {
        title: "Unidades de armazenamento baseadas em bit: kilobit, megabit, gigabit",
        paragraphs: [
          "Os provedores de internet costumam expressar a velocidade de conexão em unidades baseadas em bit (kilobits por segundo, megabits por segundo, gigabits por segundo); é uma tradição histórica da engenharia de redes.",
          "Como os usuários costumam esperar a velocidade de download de um arquivo em bytes (MB por segundo), não saber que uma conexão de '100 Mbps' tem uma velocidade de download real de cerca de 12,5 MB por segundo pode dar a falsa impressão de que a conexão é 'lenta'.",
        ],
      },
      {
        title: "Os tamanhos de dados no dia a dia",
        paragraphs: [
          "Um documento de texto (uma página) costuma ocupar alguns kilobytes, uma foto comprimida (JPEG) alguns megabytes, e um arquivo de música comprimido (MP3) em média de 3 a 5 megabytes.",
          "Um filme em definição padrão (HD) pode ocupar entre 1 e 4 gigabytes, e um filme em resolução 4K entre 15 e 25 gigabytes aproximadamente; essas diferenças variam conforme a resolução e o método de compressão.",
        ],
      },
      {
        title: "A história da unidade de armazenamento de dados",
        paragraphs: [
          "O primeiro disco rígido apresentado pela IBM em 1956 (o RAMAC 305) tinha uma capacidade de cerca de 3,75 megabytes e ocupava o tamanho de uma sala inteira. Hoje, um cartão microSD pode conter milhões de vezes essa capacidade no tamanho da palma da mão.",
          "Esse enorme aumento de capacidade está intimamente relacionado não apenas aos avanços da tecnologia de armazenamento (como a passagem dos discos magnéticos para a memória flash), mas também à constante redução do custo por unidade.",
        ],
      },
    ],
    unitTable: [
      { name: "Bit", symbol: "bit", referenceValue: "0,125 byte", system: "Binário", commonUse: "Velocidade de rede (bps, Mbps)" },
      { name: "Byte", symbol: "B", referenceValue: "1 byte (8 bits)", system: "Unidade básica", commonUse: "Unidade básica do tamanho de arquivos" },
      { name: "Kilobyte", symbol: "KB", referenceValue: "1000 bytes", system: "Decimal (SI)", commonUse: "Documentos de texto" },
      { name: "Kibibyte", symbol: "KiB", referenceValue: "1024 bytes", system: "Binário (IEC)", commonUse: "Exibição de memoria do sistema operacional" },
      { name: "Megabyte", symbol: "MB", referenceValue: "1.000.000 bytes", system: "Decimal (SI)", commonUse: "Arquivos de fotos e musica" },
      { name: "Mebibyte", symbol: "MiB", referenceValue: "1.048.576 bytes", system: "Binário (IEC)", commonUse: "Capacidade de memoria RAM" },
      { name: "Gigabyte", symbol: "GB", referenceValue: "1.000.000.000 bytes", system: "Decimal (SI)", commonUse: "Capacidade de disco (rótulo do fabricante)" },
      { name: "Gibibyte", symbol: "GiB", referenceValue: "1.073.741.824 bytes", system: "Binário (IEC)", commonUse: "Exibição de disco do sistema operacional" },
      { name: "Terabyte", symbol: "TB", referenceValue: "1.000.000.000.000 bytes", system: "Decimal (SI)", commonUse: "Armazenamento de grande volume" },
      { name: "Petabyte", symbol: "PB", referenceValue: "1.000.000.000.000.000 bytes", system: "Decimal (SI)", commonUse: "Centros de dados e armazenamento em nuvem" },
    ],
  },
  {
    locale: "pt",
    slug: "eletricidade",
    sourceSlug: "elektrik",
    category: "elektrik",
    title: "Conversão de unidades elétricas",
    description:
      "Converta as grandezas elétricas básicas entre volt, quilovolt, ampere e miliampere; consulte valores de exemplo.",
    introduction: [
      "A eletricidade é uma área ampla composta por grandezas físicas relacionadas, mas distintas, como a tensão (diferença de potencial) e a corrente (fluxo de carga). Esta categoria reúne as duas grandezas básicas mais frequentes no trabalho elétrico cotidiano: o volt (tensão) e o ampere (corrente).",
      "Tensão e corrente não são a mesma grandeza física e não podem ser convertidas diretamente uma na outra; sua relação é estabelecida pela lei de Ohm (V = I × R), em função da resistência do circuito. As conversões desta página tratam cada grandeza separadamente (volt-quilovolt, ampere-miliampere, etc.).",
    ],
    facts: [
      { label: "Nome da unidade de tensão", value: "Volt (em homenagem a Alessandro Volta)" },
      { label: "Nome da unidade de corrente", value: "Ampere (em homenagem a Andre-Marie Ampere)" },
      { label: "Unidade básica do SI (corrente)", value: "Ampere (A) -- uma das 7 unidades básicas do SI" },
      { label: "Relação tensão-corrente-resistência", value: "Lei de Ohm: V = I × R" },
      { label: "Tensão de rede no Brasil", value: "127 V ou 220 V (monofásica, varia por estado/cidade), 60 Hz" },
    ],
    sections: [
      {
        title: "O que é a tensão (volt)?",
        paragraphs: [
          "A tensão (voltagem) expressa a diferença de potencial elétrico entre dois pontos de um circuito elétrico e pode ser considerada a 'força motriz' que faz os elétrons fluírem de um ponto a outro. Sua unidade SI é o volt (V).",
          "A unidade volt recebe esse nome em homenagem ao físico italiano Alessandro Volta, inventor da pilha elétrica. Valores como '1,5 V' ou '9 V' indicados em uma pilha expressam a diferença de potencial que essa pilha pode fornecer.",
        ],
      },
      {
        title: "O que é a corrente (ampere)?",
        paragraphs: [
          "A corrente elétrica expressa a quantidade de carga elétrica que passa por um condutor por unidade de tempo, e sua unidade SI é o ampere (A). Um ampere corresponde à passagem de cerca de 6,242 × 10¹⁸ elétrons por um ponto a cada segundo.",
          "A unidade ampere recebe esse nome em homenagem ao físico francês André-Marie Ampère, um dos fundadores do eletromagnetismo. O ampere era, antes da revisão do SI de 2019, uma das unidades básicas do SI; hoje ainda é considerada uma grandeza fundamental, mas agora é definida a partir da constante de carga elementar (e).",
        ],
      },
      {
        title: "Por que tensão e corrente não podem ser convertidas entre si?",
        paragraphs: [
          "Tensão (V) e corrente (A) são grandezas físicas diferentes -- uma expressa uma diferença de potencial, a outra a velocidade de um fluxo de carga. Por isso a pergunta 'quantos amperes são X volts' não tem resposta por si só sem conhecer a resistência (ou a potência) do circuito.",
          "A relação entre as duas é estabelecida pela lei de Ohm: V = I × R (Tensão = Corrente × Resistência). Por exemplo, uma tensão de 12 volts que atravessa uma resistência de 4 ohms produz uma corrente de 3 amperes; mas esses mesmos 12 volts aplicados a uma resistência diferente produzem um valor de corrente totalmente diferente.",
        ],
      },
      {
        title: "A relação entre potência, tensão e corrente",
        paragraphs: [
          "A potência elétrica (watt) é igual ao produto da tensão pela corrente: P = V × I. Essa fórmula mostra que um aparelho de mesma potência consumirá menos corrente com alta tensão e mais corrente com baixa tensão.",
          "Essa relação explica por que as redes de distribuição elétrica funcionam em alta tensão: transportar a mesma potência com uma corrente menor reduz consideravelmente as perdas de energia devidas à resistência das linhas de transmissão (aquecimento por efeito Joule).",
        ],
      },
      {
        title: "A tensão de rede no Brasil e no mundo",
        paragraphs: [
          "No Brasil, a tensão de rede residencial não é única: varia entre 127 V e 220 V (monofásica) conforme o estado e até mesmo a cidade -- a maior parte do Sudeste, Norte e parte do Centro-Oeste usa 127 V, enquanto o Sul, o Distrito Federal, Goiás e a maior parte do Nordeste usam 220 V. Em todo o país, a frequência é de 60 Hz.",
          "Essa variação dentro do próprio Brasil é a razão pela qual muitos aparelhos eletrônicos vendidos no país são 'bivolt' (funcionam tanto em 127 V quanto em 220 V automaticamente). Já em outros países, a tensão costuma ser única: Estados Unidos e Canadá usam 120 V, enquanto a maioria dos países europeus usa 230 V -- por isso aparelhos trazidos do exterior nem sempre podem ser usados diretamente sem um conversor de tensão.",
        ],
      },
      {
        title: "Corrente continua (CC) e corrente alternada (CA)",
        paragraphs: [
          "Na corrente contínua (CC), os elétrons fluem de forma constante em uma única direção -- pilhas e painéis solares produzem CC. Na corrente alternada (CA), a direção da corrente se inverte com uma frequência determinada a cada segundo (60 Hz no Brasil, ou seja, 60 vezes por segundo) -- a eletricidade da rede é CA.",
          "A razão principal pela qual a CA é preferida na distribuição em rede é que ela permite elevar ou reduzir facilmente a tensão por meio de transformadores; isso possibilita transportar eletricidade a longas distâncias com baixas perdas.",
        ],
      },
      {
        title: "O efeito da corrente elétrica no corpo humano",
        paragraphs: [
          "A intensidade da corrente que atravessa o corpo humano determina o efeito percebido: cerca de 1 miliampere mal é percebido, entre 10 e 20 miliamperes pode provocar contração muscular (incapacidade de soltar), e mais de 100 miliamperes pode causar arritmia cardíaca (fibrilação) e morte.",
          "Por isso, na segurança elétrica, não importa apenas a tensão, mas também a intensidade de corrente que pode se formar no circuito -- mesmo em um ambiente de baixa tensão mas de baixa resistência (por exemplo, úmido), pode se formar uma corrente perigosa.",
        ],
      },
    ],
    unitTable: [
      { name: "Milivolt", symbol: "mV", referenceValue: "0,001 V", system: "SI/métrico", commonUse: "Sensores e sinais bioelétricos" },
      { name: "Volt", symbol: "V", referenceValue: "1 V", system: "SI", commonUse: "Pilhas, tensão de rede e de circuito" },
      { name: "Quilovolt", symbol: "kV", referenceValue: "1000 V", system: "SI/métrico", commonUse: "Linhas de transmissão de alta tensão" },
      { name: "Miliampere", symbol: "mA", referenceValue: "0,001 A", system: "SI/métrico", commonUse: "Correntes de circuitos eletrônicos" },
      { name: "Ampere", symbol: "A", referenceValue: "1 A", system: "SI", commonUse: "Instalações domésticas e corrente de aparelhos" },
      { name: "Quiloampere", symbol: "kA", referenceValue: "1000 A", system: "SI/métrico", commonUse: "Correntes de curto-circuito e industriais" },
    ],
  },
  {
    locale: "pt",
    slug: "quilate-de-ouro",
    sourceSlug: "altin-ayar",
    category: "altin_ayar",
    title: "Conversão de quilates de ouro",
    description:
      "Converta entre ouro de 24, 22, 18 e 14 quilates conforme a quantidade de ouro puro; conheça a pureza e os usos de cada quilate.",
    introduction: [
      "Assim como a prata, o ouro quase nunca é usado puro na fabricação de joias, pois é um metal muito macio e se arranha facilmente -- por isso é ligado a outros metais como prata ou cobre. O quilate é a medida que indica a proporção de ouro puro nessa liga.",
      "A escala funciona sobre uma base de 24: 24 quilates significa ouro totalmente puro (100%), 18 quilates significa que 18/24 da liga (cerca de 75%) é ouro puro. A conversão aqui não consiste em 'expressar a mesma grandeza física em uma unidade diferente', mas em 'encontrar o equivalente em gramas da mesma liga com um grau de pureza diferente'.",
    ],
    facts: [
      { label: "Sistema de medida", value: "Padrão de pureza da joalheria (quilate)" },
      { label: "Referência básica", value: "24 quilates = 100% de ouro puro" },
      { label: "Quilate mais comum na Turquia", value: "22 quilates (pulseira, joalheria tradicional)" },
      { label: "Uso cotidiano internacional", value: "18 quilates (anel, colar)" },
      { label: "Lógica de cálculo", value: "Gramas × (quilate de origem / 24) ÷ (quilate de destino / 24)" },
    ],
    sections: [
      {
        title: "O que exatamente o quilate mede?",
        paragraphs: [
          "O quilate indica que parte do peso de uma peça de ouro é realmente ouro. 24 quilates é ouro puro; 18 e 14 quilates são formas de ouro misturadas com prata ou cobre, respectivamente, e portanto mais duras e menos puras.",
          "Por isso pode-se dizer que uma pulseira de 22 quilates tem um teor de ouro puro ligeiramente 'inferior' ao de 24 quilates, mas é mais resistente -- por isso os joalheiros costumam preferir 22 quilates para pulseiras e 18 quilates para anéis e colares.",
        ],
      },
      {
        title: "Como se calcula o teor de ouro puro?",
        paragraphs: [
          "Para descobrir a quantidade de ouro puro contida em uma pulseira de 10 gramas de 22 quilates: 10 × (22 / 24) = 9,17 gramas de ouro puro (equivalente a 24 quilates). Os 0,83 grama restantes são outros metais adicionados para dar resistência.",
          "Inversamente, se um joalheiro fundisse esses 9,17 gramas de ouro puro para refazê-los em 18 quilates: 9,17 ÷ (18 / 24) = 12,22 gramas de liga total seriam obtidos -- porque, sendo menor a proporção de ouro puro em 18 quilates, a mesma quantidade de ouro puro se distribui em um peso total maior.",
        ],
      },
      {
        title: "Para que serve cada quilate?",
        paragraphs: [
          "Devido à sua maciez, o ouro de 24 quilates praticamente não é usado na joalheria cotidiana; é preferido para lingotes e produtos de investimento. O de 22 quilates é o padrão de pulseiras e joalheria tradicional na Turquia e no Oriente Médio.",
          "O de 18 quilates, por sua alta resistência, é comum no mundo todo para joias de uso diário como anéis e colares com diamantes. O de 14 quilates, mais econômico e ainda mais resistente, é frequente especialmente nos mercados dos Estados Unidos e da Europa.",
        ],
      },
    ],
    unitTable: [
      { name: "Ouro de 24 quilates", symbol: "24K", referenceValue: "100% de ouro puro", system: "Padrão de joalheria", commonUse: "Lingotes, ouro de investimento" },
      { name: "Ouro de 22 quilates", symbol: "22K", referenceValue: "91,6% de ouro puro (22/24)", system: "Padrão de joalheria", commonUse: "Pulseira, joalheria tradicional" },
      { name: "Ouro de 18 quilates", symbol: "18K", referenceValue: "75% de ouro puro (18/24)", system: "Padrão de joalheria", commonUse: "Anel, colar, joalheria do dia a dia" },
      { name: "Ouro de 14 quilates", symbol: "14K", referenceValue: "58,3% de ouro puro (14/24)", system: "Padrão de joalheria", commonUse: "Joalheria econômica, mercado EUA/Europa" },
    ],
  },
  {
    locale: "pt",
    slug: "teor-de-prata",
    sourceSlug: "gumus-ayar",
    category: "gumus_ayar",
    title: "Conversão de teor de prata",
    description:
      "Converta em gramas de prata pura os teores 999, 925 (esterlina), 900 e 800; conheça o sistema de milésimos e seus usos na joalheria.",
    introduction: [
      "Assim como o ouro, a prata quase nunca é usada pura para fabricar joias ou objetos, pois é um metal macio que é ligado a outros metais como o cobre. O milésimo é a medida que indica a proporção de prata pura nessa liga.",
      "Diferentemente do quilate do ouro, expresso sobre uma base de 24, a pureza da prata é expressa sobre uma base de 1000 (milésimo): 999 corresponde a uma prata quase pura, enquanto 925 é o teor mais difundido do mundo, conhecido como 'prata esterlina'.",
    ],
    facts: [
      { label: "Sistema de medida", value: "Sistema de milésimos" },
      { label: "Referência principal", value: "999 = 99,9% de prata pura" },
      { label: "Teor de joalheria mais difundido", value: "925 (prata esterlina)" },
      { label: "Prata de investimento/lingote", value: "Teor 999 (prata fina)" },
      { label: "Regra de cálculo", value: "Gramas × (milésimo de origem / 1000) ÷ (milésimo de destino / 1000)" },
    ],
    sections: [
      {
        title: "O que realmente mede o teor de prata (milésimo)?",
        paragraphs: [
          "Diferentemente do ouro, a pureza da prata não é expressa sobre 24 unidades, mas em milésimos (base 1000). Um teor de 999 significa 999 partes por mil (ou seja, 99,9%) de prata pura na liga; o milésimo restante costuma corresponder a pequenos vestígios de outros elementos.",
          "O teor 925 (prata esterlina) significa que a liga contém 92,5% de prata pura, sendo o restante (7,5%) geralmente cobre. Essa pequena quantidade de cobre confere solidez à prata pura, que por natureza é muito macia e fácil de deformar.",
        ],
      },
      {
        title: "Por que a prata esterlina (925) é o padrão mundial?",
        paragraphs: [
          "A história do padrão de prata esterlina (925) remonta à Inglaterra do século XII e, com o tempo, se tornou o padrão mais amplamente aceito do mundo para joalheria, talheres e objetos de prata.",
          "A prata pura (999) é macia demais para objetos de uso cotidiano e se arranha facilmente; adicionar 7,5% de cobre dá à prata a dureza suficiente, preservando em grande parte seu brilho e cor característicos.",
        ],
      },
      {
        title: "Diferenças entre os teores 999, 900 e 800",
        paragraphs: [
          "O teor 999 (prata fina/pura) é preferido para lingotes e produtos de investimento porque o grau de pureza é o critério mais importante para os investidores; mas sua maciez faz com que raramente seja usado na joalheria cotidiana.",
          "O teor 900 (prata de moeda) foi historicamente usado nas moedas de prata de muitos países. O teor 800, comum especialmente na Europa (Alemanha, Áustria), é um padrão de joalheria menos puro que a prata esterlina, mas ainda resistente.",
        ],
      },
      {
        title: "Como se calcula a quantidade de prata pura?",
        paragraphs: [
          "Para determinar a quantidade de prata pura de um anel de prata de 10 gramas com teor 925: 10 × (925 / 1000) = 9,25 gramas de prata pura. Os 0,75 grama restantes são cobre ou outros metais adicionados para dar solidez.",
          "Aplica-se a mesma logica para converter entre diferentes teores: por exemplo, se e conhecida a quantidade de prata pura de uma liga de teor 925, seu equivalente em teor 999 e obtido dividindo essa quantidade por 999/1000.",
        ],
      },
      {
        title: "A relação entre o escurecimento da prata e sua pureza",
        paragraphs: [
          "O escurecimento (oxidação) de uma joia de prata com o tempo não se deve à prata em si, mas à reação do cobre da liga com os compostos de enxofre do ar. Por isso, uma prata de maior pureza (como a de teor 999) tende a escurecer menos.",
          "Alguns fabricantes desenvolveram ligas de prata esterlina 'resistentes ao escurecimento' para melhorar essa propriedade, usando elementos diferentes, como o germânio, em vez de cobre.",
        ],
      },
    ],
    unitTable: [
      { name: "Prata 999", symbol: "999", referenceValue: "99,9% de prata pura", system: "Padrão de joalheria", commonUse: "Lingotes, prata de investimento" },
      { name: "Prata 925", symbol: "925", referenceValue: "92,5% de prata pura (esterlina)", system: "Padrão de joalheria", commonUse: "Joalheria e talheres (padrão mundial)" },
      { name: "Prata 900", symbol: "900", referenceValue: "90% de prata pura", system: "Padrão de joalheria", commonUse: "Moedas de prata históricas" },
      { name: "Prata 800", symbol: "800", referenceValue: "80% de prata pura", system: "Padrão de joalheria (Europa)", commonUse: "Padrão de joalheria europeu" },
    ],
  },
];

export function findPortugueseCategoryPage(slug: string) {
  return portugueseCategoryPages.find((page) => page.slug === slug);
}

export function findPortugueseCategoryPageByTurkishSlug(sourceSlug: string) {
  return portugueseCategoryPages.find((page) => page.sourceSlug === sourceSlug);
}
