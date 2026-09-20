// Paginas de categoria em portugues (Brasil) -- integradas ao novo sistema
// i18n. Arquivo independente e novo (nao modifica os arquivos existentes
// de tr/en/de/ar/uz/bn/fr/es).
//
// Escopo deliberadamente limitado aos 17 elementos que formam a
// identidade do site (13 categorias fundamentais + 4 ferramentas
// universais na pagina inicial) -- sem calculadoras cientificas nem
// cotidianas. Conteudo traduzido com a mesma profundidade dos artigos
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
    title: "Conversao de unidades de comprimento",
    description:
      "Converta gratis e instantaneamente entre metros, quilometros, centimetros, milhas e pes; consulte formulas e tabelas.",
    introduction: [
      "O comprimento e uma das grandezas fisicas fundamentais usadas para descrever a altura, a largura ou a espessura de um objeto, ou a distancia entre dois pontos. Dependendo da direcao medida, um mesmo objeto pode ter varios valores de comprimento.",
      "Na fisica, o comprimento e normalmente representado pelo simbolo dimensional L. Muitas grandezas derivadas, como area, volume, velocidade, aceleracao, pressao e densidade, sao definidas a partir da dimensao de comprimento.",
      "No Sistema Internacional de Unidades (SI), a unidade basica de comprimento e o metro (m). Dependendo da magnitude da distancia medida, usam-se o nanometro, o micrometro, o milimetro, o centimetro, o metro ou o quilometro. Fora do sistema metrico, a polegada, o pe, a jarda e a milha continuam em uso, especialmente nos Estados Unidos e no Reino Unido.",
    ],
    facts: [
      { label: "Unidade basica do SI", value: "Metro" },
      { label: "Simbolo da unidade SI", value: "m" },
      { label: "Grandeza fisica", value: "Comprimento" },
      { label: "Simbolo dimensional", value: "L" },
      { label: "Definicao atual do metro", value: "Distancia percorrida pela luz no vacuo em 1/299.792.458 de segundo" },
    ],
    sections: [
      {
        title: "O que e o comprimento?",
        paragraphs: [
          "O comprimento serve para descrever a altura, a largura, a profundidade de um objeto ou a distancia entre dois pontos; e uma das grandezas fisicas fundamentais. Dependendo da direcao medida, um mesmo objeto pode apresentar varios valores de comprimento.",
          "Na fisica, o comprimento e geralmente representado pelo simbolo dimensional L. Diversas grandezas derivadas, como area, volume, velocidade, aceleracao, pressao e densidade, sao definidas a partir da dimensao de comprimento.",
        ],
      },
      {
        title: "A unidade SI do comprimento",
        paragraphs: [
          "No Sistema Internacional de Unidades, a unidade basica de comprimento e o metro, simbolizado por m. O metro serve como referencia fundamental para definir todas as demais unidades de comprimento.",
          "Unidades metricas como quilometro, centimetro, milimetro, micrometro e nanometro relacionam-se com o metro por multiplos e submultiplos decimais. Essa estrutura permite realizar conversoes entre unidades metricas usando potencias de dez.",
        ],
      },
      {
        title: "A definicao cientifica do metro",
        paragraphs: [
          "No passado, o metro era definido a partir das dimensoes da Terra e de padroes fisicos. Com o avanco da tecnologia de medicao, tornou-se necessaria uma definicao mais estavel e reproduzivel em qualquer lugar do mundo.",
          "Atualmente, um metro e definido como o comprimento do trajeto percorrido pela luz no vacuo durante um intervalo de 1/299.792.458 de segundo. Essa definicao se baseia no fato de que a velocidade da luz no vacuo e fixada exatamente em 299.792.458 metros por segundo.",
        ],
      },
      {
        title: "As unidades metricas de comprimento",
        paragraphs: [
          "No sistema metrico, as unidades se relacionam com o metro por potencias positivas ou negativas de 10. Um quilometro equivale a 1000 metros, um centimetro a 0,01 metro e um milimetro a 0,001 metro.",
          "Para comprimentos muito pequenos, usam-se o micrometro, o nanometro e o picometro. Celulas costumam ser medidas em micrometros, comprimentos de onda da luz em nanometros e algumas distancias em escala atomica em picometros.",
        ],
      },
      {
        title: "As unidades de comprimento fora do sistema metrico",
        paragraphs: [
          "A polegada, o pe, a jarda e a milha terrestre sao unidades de comprimento comuns fora do sistema metrico. Sao usadas especialmente no sistema de medidas norte-americano e em algumas aplicacoes ligadas a tradicao britanica.",
          "Uma polegada equivale exatamente a 2,54 centimetros, um pe a 12 polegadas e uma jarda a 3 pes. Uma milha terrestre e definida exatamente como 1609,344 metros.",
        ],
      },
      {
        title: "O comprimento na navegacao maritima e aerea",
        paragraphs: [
          "Na navegacao maritima e aerea, as distancias sao geralmente expressas em milhas nauticas. Uma milha nautica equivale exatamente a 1852 metros.",
          "A milha nautica se desenvolveu a partir de um metodo de medicao historico relacionado as coordenadas geograficas da Terra. A unidade de velocidade chamada no tambem significa uma milha nautica por hora.",
        ],
      },
      {
        title: "Como se mede o comprimento?",
        paragraphs: [
          "Em medicoes cotidianas, usam-se ferramentas como regua, trena, paquimetro e micrometro. A precisao do instrumento escolhido depende do tamanho do objeto a medir e do nivel de precisao exigido.",
          "Em engenharia e pesquisa cientifica, podem ser usados telemetros a laser, maquinas de medicao por coordenadas, interferometros e diversos sistemas de medicao optica.",
        ],
      },
      {
        title: "Precisao de medicao e incerteza",
        paragraphs: [
          "Nenhuma medicao fisica e absolutamente perfeita. O resultado de uma medicao sempre carrega certa incerteza devido a resolucao do instrumento usado, sua calibracao, as condicoes ambientais e o metodo aplicado.",
          "Por isso, em resultados cientificos convem indicar nao apenas o valor medido, mas tambem a incerteza da medicao e a unidade utilizada. Especialmente em trabalhos de engenharia de precisao, ate uma variacao de temperatura pode afetar o comprimento de um material.",
        ],
      },
      {
        title: "Como se convertem as unidades de comprimento?",
        paragraphs: [
          "Em conversoes dentro de um mesmo sistema de medida, usa-se a razao entre as unidades. Por exemplo, para converter metros em quilometros, divide-se o valor por 1000; para converter quilometros em metros, multiplica-se o valor por 1000.",
          "Em conversoes entre o sistema metrico e as unidades britanicas ou norte-americanas, e preciso usar os coeficientes de conversao exatos definidos. Por exemplo, para converter polegadas em centimetros, multiplica-se o valor por 2,54.",
        ],
      },
    ],
    unitTable: [
      { name: "Nanometro", symbol: "nm", referenceValue: "0,000000001 m", system: "SI/metrico", commonUse: "Comprimento de onda da luz e nanotecnologia" },
      { name: "Micrometro", symbol: "µm", referenceValue: "0,000001 m", system: "SI/metrico", commonUse: "Celulas, particulas e fabricacao de precisao" },
      { name: "Milimetro", symbol: "mm", referenceValue: "0,001 m", system: "SI/metrico", commonUse: "Desenho tecnico e medidas pequenas" },
      { name: "Centimetro", symbol: "cm", referenceValue: "0,01 m", system: "SI/metrico", commonUse: "Medicao de objetos cotidianos" },
      { name: "Decimetro", symbol: "dm", referenceValue: "0,1 m", system: "SI/metrico", commonUse: "Educacao e algumas relacoes de volume" },
      { name: "Metro", symbol: "m", referenceValue: "1 m", system: "SI", commonUse: "Medicoes de comprimento basicas" },
      { name: "Quilometro", symbol: "km", referenceValue: "1000 m", system: "SI/metrico", commonUse: "Distancias rodoviarias e geograficas" },
      { name: "Polegada", symbol: "in", referenceValue: "0,0254 m", system: "Britanico/norte-americano", commonUse: "Telas, tubulacoes e medidas tecnicas" },
      { name: "Pe", symbol: "ft", referenceValue: "0,3048 m", system: "Britanico/norte-americano", commonUse: "Altura, construcao e aviacao" },
      { name: "Jarda", symbol: "yd", referenceValue: "0,9144 m", system: "Britanico/norte-americano", commonUse: "Campos esportivos e medicao de distancias" },
      { name: "Milha", symbol: "mi", referenceValue: "1609,344 m", system: "Britanico/norte-americano", commonUse: "Distancias rodoviarias" },
      { name: "Milha nautica", symbol: "nmi", referenceValue: "1852 m", system: "Navegacao maritima", commonUse: "Navegacao maritima e aerea" },
    ],
  },
  {
    locale: "pt",
    slug: "area",
    sourceSlug: "alan",
    category: "alan",
    title: "Conversao de unidades de area",
    description:
      "Converta areas entre metros quadrados, hectares e pes quadrados; para calculos de terrenos, edificios e construcao.",
    introduction: [
      "A area e uma grandeza fisica derivada que expressa a extensao de uma regiao bidimensional. Como resulta do produto de um comprimento por outro comprimento na mesma unidade, a dimensao da area e sempre 'comprimento ao quadrado' (L²).",
      "No Sistema Internacional de Unidades, a unidade derivada de area e o metro quadrado (m²). Na agricultura e em terrenos, usam-se muito o hectare e unidades locais; no sistema britanico/norte-americano, o pe quadrado e o acre; no sul da Asia, unidades locais como bigha e katha tambem sao comuns.",
    ],
    facts: [
      { label: "Grandeza fisica", value: "Area" },
      { label: "Simbolo dimensional", value: "[L²]" },
      { label: "Unidade derivada do SI", value: "Metro quadrado" },
      { label: "Simbolo da unidade SI", value: "m²" },
      { label: "Formula basica (retangulo)", value: "Area = Comprimento × Largura" },
    ],
    sections: [
      {
        title: "O que e a area?",
        paragraphs: [
          "A area expressa a extensao de uma regiao plana ou projetada. A extensao de um terreno, o piso de um comodo ou uma folha de papel sao medidos em area.",
          "A area e uma grandeza derivada: obtem-se multiplicando uma unidade de comprimento basica por si mesma. Por isso a dimensao SI da area e L² (comprimento ao quadrado), e a area e sempre uma grandeza escalar positiva.",
        ],
      },
      {
        title: "A unidade SI da area: o metro quadrado",
        paragraphs: [
          "No Sistema Internacional de Unidades, a unidade derivada de area e o metro quadrado (m²), que representa a area ocupada por um quadrado cujo lado mede exatamente 1 metro.",
          "O metro quadrado nao e uma unidade basica independente, mas uma unidade derivada obtida elevando ao quadrado a unidade de comprimento (o metro). Todas as demais unidades metricas de area (centimetro quadrado, quilometro quadrado, etc.) relacionam-se com o metro quadrado por potencias decimais.",
        ],
      },
      {
        title: "Por que as unidades de area se convertem com uma razao quadratica?",
        paragraphs: [
          "Ao converter unidades de comprimento, a razao usada deve ser elevada ao quadrado para as unidades de area. Por exemplo, 1 quilometro equivale a 1000 metros, mas 1 quilometro quadrado nao equivale a 1000 metros quadrados, e sim a 1000², ou seja, 1.000.000 de metros quadrados.",
          "Isso ocorre porque, numa area, ambas as dimensoes (comprimento e largura) aumentam ou diminuem na mesma proporcao. Ignorar essa relacao quadratica e o erro de calculo mais frequente nas conversoes de area -- acreditar que '1 km² = 1000 m²' e uma confusao comum.",
        ],
      },
      {
        title: "As unidades metricas de area",
        paragraphs: [
          "No sistema metrico, usam-se o milimetro quadrado e o centimetro quadrado para areas pequenas, o metro quadrado para medicoes cotidianas e o quilometro quadrado para grandes areas. Um centimetro quadrado equivale a 0,0001 metro quadrado, e um quilometro quadrado a 1.000.000 de metros quadrados.",
          "Para medir terrenos, usam-se o are (100 m²) e seu multiplo, 100 vezes maior, o hectare (10.000 m²). O hectare e a unidade metrica de terreno mais usada no mundo para expressar a area de terras agricolas.",
        ],
      },
      {
        title: "Unidades tradicionais de terreno na Turquia",
        paragraphs: [
          "Na Turquia, as unidades mais usadas para medir terras agricolas sao o dönüm e o dekar; ambas equivalem hoje a 1000 metros quadrados e sao intercambiaveis. O dekar e o nome oficial usado na legislacao de pesos e medidas, enquanto o dönüm e o equivalente tradicional da linguagem cotidiana.",
          "Na epoca otomana, o tamanho do dönüm variava conforme a regiao entre 900 e 1600 m². Com a lei de pesos e medidas de 1931, o dönüm foi alinhado ao dekar e padronizado exatamente em 1000 m².",
        ],
      },
      {
        title: "As unidades de area do sistema britanico/norte-americano",
        paragraphs: [
          "O pe quadrado (ft²) e a polegada quadrada (in²) sao usados para areas pequenas, enquanto o acre e usado para grandes parcelas de terreno no sistema de medidas britanico/norte-americano. Um acre equivale exatamente a 4046,8564224 metros quadrados.",
          "A origem historica do acre remonta a area de terreno que uma junta de bois conseguia arar em um dia. Ainda hoje e amplamente usado em anuncios imobiliarios nos Estados Unidos, no Reino Unido e em alguns paises da Commonwealth.",
        ],
      },
      {
        title: "As unidades de terreno do sul da Asia",
        paragraphs: [
          "Em paises como India, Bangladesh, Paquistao e Nepal, ainda sao amplamente usadas unidades locais de terreno como bigha, katha, killa, kanal, marla, guntha, biswa e decimal. O tamanho dessas unidades pode variar consideravelmente de uma regiao para outra, mesmo com o mesmo nome.",
          "Por exemplo, um bigha equivale a cerca de 1338 m² em Bengala Ocidental, mas pode corresponder a um valor diferente em outro estado. Por isso, em transacoes imobiliarias com essas unidades, e importante confirmar qual padrao regional esta sendo utilizado.",
        ],
      },
      {
        title: "Como se calcula uma area?",
        paragraphs: [
          "Para uma area retangular, a formula e Area = Comprimento × Largura. Para um triangulo, usa-se Area = (Base × Altura) / 2, e para um circulo, Area = π × Raio².",
          "Em terrenos de forma irregular, a area e calculada dividindo a forma em retangulos ou triangulos menores, calculando a area de cada parte separadamente e somando-as (ou, em medicoes cadastrais, por meio de formulas de area de poligonos baseadas em coordenadas).",
        ],
      },
      {
        title: "Aspectos a considerar ao medir areas",
        paragraphs: [
          "O valor de area indicado em um anuncio imobiliario ou em uma escritura deve ser interpretado conforme a unidade utilizada (m², dönüm, acre, bigha, etc.) e o padrao regional com o qual essa unidade e definida.",
          "Especialmente em transacoes imobiliarias internacionais, observar o equivalente exato em metros quadrados em vez da simples semelhanca do nome da unidade evita mal-entendidos; a ferramenta de conversao desta pagina compara todas as unidades a partir de uma referencia comum em metros quadrados.",
        ],
      },
    ],
    unitTable: [
      { name: "Milimetro quadrado", symbol: "mm²", referenceValue: "0,000001 m²", system: "SI/metrico", commonUse: "Desenho tecnico e areas pequenas" },
      { name: "Centimetro quadrado", symbol: "cm²", referenceValue: "0,0001 m²", system: "SI/metrico", commonUse: "Area de objetos pequenos" },
      { name: "Metro quadrado", symbol: "m²", referenceValue: "1 m²", system: "SI", commonUse: "Area de moradia, escritorio e terreno" },
      { name: "Are", symbol: "a", referenceValue: "100 m²", system: "Metrico", commonUse: "Pequenas parcelas de terreno" },
      { name: "Dönüm / Dekar", symbol: "dönüm", referenceValue: "1000 m²", system: "Turquia (metrico)", commonUse: "Medicao de terras agricolas" },
      { name: "Hectare", symbol: "ha", referenceValue: "10.000 m²", system: "Metrico", commonUse: "Grandes terras agricolas e florestais" },
      { name: "Quilometro quadrado", symbol: "km²", referenceValue: "1.000.000 m²", system: "SI/metrico", commonUse: "Cidades, paises e zonas geograficas" },
      { name: "Pe quadrado", symbol: "ft²", referenceValue: "0,092903 m²", system: "Britanico/norte-americano", commonUse: "Area de moradia (US/UK)" },
      { name: "Jarda quadrada", symbol: "yd²", referenceValue: "0,83612736 m²", system: "Britanico/norte-americano", commonUse: "Campos esportivos e textil" },
      { name: "Acre", symbol: "ac", referenceValue: "4046,8564224 m²", system: "Britanico/norte-americano", commonUse: "Grandes parcelas de terreno" },
      { name: "Bigha", symbol: "bigha", referenceValue: "≈1337,8 m² (variavel conforme a regiao)", system: "Sul da Asia", commonUse: "Terras agricolas na India/Bangladesh" },
      { name: "Tsubo", symbol: "tsubo", referenceValue: "≈3,31 m²", system: "Japao", commonUse: "Medicao de moradia e terreno no Japao" },
    ],
  },
  {
    locale: "pt",
    slug: "volume",
    sourceSlug: "hacim",
    category: "hacim",
    title: "Conversao de unidades de volume",
    description:
      "Converta volumes entre litros, mililitros e metros cubicos; compare as unidades usuais para liquidos e recipientes.",
    introduction: [
      "O volume e uma grandeza fisica derivada que expressa o espaco ocupado ou contido por um objeto ou recipiente tridimensional. Como resulta do produto de uma unidade de comprimento nas tres dimensoes (comprimento × largura × altura), a dimensao do volume e L³ (comprimento ao cubo).",
      "No Sistema Internacional de Unidades, a unidade derivada de volume e o metro cubico (m³); no dia a dia, o litro e o mililitro sao muito mais usados. Na cozinha sao comuns a xicara, a colher de sopa e a colher de cha, e no sistema norte-americano/britanico, o galao, o quarto, o pint e a onca liquida.",
    ],
    facts: [
      { label: "Grandeza fisica", value: "Volume" },
      { label: "Simbolo dimensional", value: "[L³]" },
      { label: "Unidade derivada do SI", value: "Metro cubico" },
      { label: "Simbolo da unidade SI", value: "m³" },
      { label: "Unidade mais comum no uso diario", value: "Litro (L)" },
    ],
    sections: [
      {
        title: "O que e o volume?",
        paragraphs: [
          "O volume e a extensao do espaco tridimensional ocupado por um objeto ou que pode ser contido por um recipiente. O volume de um objeto solido expressa sua grandeza fisica, enquanto o volume de um recipiente expressa a quantidade de liquido ou gas que ele pode conter.",
          "O volume e uma grandeza derivada, obtida multiplicando uma unidade de comprimento nas tres dimensoes (largura, altura, profundidade). Por isso sua dimensao SI e L³.",
        ],
      },
      {
        title: "A unidade SI do volume: o metro cubico",
        paragraphs: [
          "No Sistema Internacional de Unidades, a unidade derivada de volume e o metro cubico (m³), que representa o volume interno de um cubo cujo lado mede exatamente 1 metro.",
          "O metro cubico e usado para grandes volumes (reservatorios de agua, lancamento de concreto, volume de contêineres), enquanto no dia a dia prefere-se o litro, muito menor. Um metro cubico equivale exatamente a 1000 litros.",
        ],
      },
      {
        title: "A relacao entre o litro e o metro cubico",
        paragraphs: [
          "O litro e uma unidade de volume pratica, cujo uso junto ao SI e aceito, embora nao seja oficialmente uma unidade do SI. Um litro equivale ao volume de um cubo de 10 centimetros de lado (1000 centimetros cubicos).",
          "Os submultiplos do litro -- decilitro, centilitro e mililitro -- sao amplamente usados em medicoes de alimentos, medicamentos e laboratorio. Um mililitro equivale exatamente a um centimetro cubico (1 mL = 1 cm³).",
        ],
      },
      {
        title: "Por que as unidades de volume se convertem com uma razao cubica?",
        paragraphs: [
          "Enquanto as unidades de comprimento se convertem com uma razao linear e as de area com uma razao quadratica, as unidades de volume se convertem com uma razao cubica. Por exemplo, 1 metro equivale a 100 centimetros, mas 1 metro cubico nao equivale a 100 centimetros cubicos, e sim a 100³, ou seja, 1.000.000 de centimetros cubicos.",
          "Essa relacao cubica surge porque o volume varia simultaneamente em tres dimensoes e e o erro conceitual mais frequente nas conversoes de volume -- exige um calculo especialmente cuidadoso ao passar para unidades nao metricas como o galao ou o pe cubico.",
        ],
      },
      {
        title: "As medidas de cozinha",
        paragraphs: [
          "As medidas usadas em receitas, como colher de sopa, colher de cha e xicara, sao unidades de volume padronizadas que permitem obter resultados coerentes em diferentes cozinhas. Equivalencias geralmente aceitas: 1 colher de sopa ≈ 15 mL, 1 colher de cha ≈ 5 mL, 1 xicara ≈ 240 mL.",
          "Essas medidas nao sao padroes cientificos exatos, mas valores aproximados amplamente aceitos na pratica culinaria; em receitas que exigem precisao (especialmente confeitaria), usar uma balanca de cozinha digital e mais confiavel.",
        ],
      },
      {
        title: "As unidades de volume liquido norte-americanas e britanicas",
        paragraphs: [
          "Os sistemas norte-americano e britanico usam unidades como galao, quarto, pint e onca liquida; mas o tamanho dessas unidades difere entre os dois sistemas. Um galao norte-americano equivale a 3,78541 litros, enquanto um galao imperial britanico equivale a 4,54609 litros -- cerca de 20% a mais.",
          "Essa diferenca ocorre porque os dois paises adotaram historicamente galoes de referencia distintos (o galao de vinho nos Estados Unidos, o galao imperial no Reino Unido). E sempre bom verificar a qual sistema pertence o valor de 'galao' ou 'onca' indicado em uma receita ou no rotulo de um produto.",
        ],
      },
      {
        title: "As unidades de volume agricolas e historicas",
        paragraphs: [
          "O bushel e o peck sao unidades de volume usadas historicamente para medir produtos secos como cereais, frutas e verduras; ainda hoje sao usadas em alguns mercados agricolas, especialmente nos Estados Unidos.",
          "Na epoca otomana, o kile e o şinik eram unidades de volume tradicionais usadas para medir cereais; 1 kile equivalia a 20 şinik. Embora essas unidades apresentem pequenas variacoes regionais, hoje servem como referencia para interpretar textos e registros historicos.",
        ],
      },
      {
        title: "Como se calcula um volume?",
        paragraphs: [
          "Para um prisma retangular (caixa), usa-se a formula Volume = Comprimento × Largura × Altura. Para um cilindro, aplica-se Volume = π × Raio² × Altura, e para uma esfera, Volume = (4/3) × π × Raio³.",
          "O volume de solidos de forma irregular costuma ser determinado pelo metodo do deslocamento (principio de Arquimedes) -- submergindo o objeto em um recipiente cheio de agua e medindo o volume de agua deslocado.",
        ],
      },
      {
        title: "Medicao do volume no petroleo e na industria",
        paragraphs: [
          "Na industria petrolifera, o volume e geralmente expresso em barris (bbl); 1 barril equivale exatamente a 158,987 litros (42 galoes norte-americanos). Essa unidade e uma tradicao que remonta ao seculo XIX, quando o petroleo era transportado em barris de madeira originalmente destinados a vinho.",
          "Em processos industriais, grandes volumes costumam ser expressos em metros cubicos, e medicoes pequenas de laboratorio em mililitros; a unidade adequada e escolhida conforme a magnitude do volume medido.",
        ],
      },
    ],
    unitTable: [
      { name: "Mililitro", symbol: "mL", referenceValue: "0,000001 m³", system: "SI/metrico", commonUse: "Doses medicas e medicoes pequenas" },
      { name: "Colher de cha", symbol: "cdch", referenceValue: "0,000005 m³ (≈5 mL)", system: "Medida de cozinha", commonUse: "Receitas culinarias" },
      { name: "Colher de sopa", symbol: "cds", referenceValue: "0,000015 m³ (≈15 mL)", system: "Medida de cozinha", commonUse: "Receitas culinarias" },
      { name: "Xicara", symbol: "xic", referenceValue: "0,00024 m³ (≈240 mL)", system: "Medida de cozinha", commonUse: "Receitas culinarias" },
      { name: "Litro", symbol: "L", referenceValue: "0,001 m³", system: "Metrico", commonUse: "Bebidas, combustivel e volume diario" },
      { name: "Onca liquida (US)", symbol: "fl oz", referenceValue: "≈0,0000296 m³ (≈29,57 mL)", system: "Estados Unidos", commonUse: "Bebidas e embalagens cosmeticas" },
      { name: "Pint (US)", symbol: "pt", referenceValue: "≈0,000473 m³ (≈473 mL)", system: "Estados Unidos", commonUse: "Medicao de cerveja e leite" },
      { name: "Galao (US)", symbol: "gal", referenceValue: "≈0,003785 m³ (≈3,785 L)", system: "Estados Unidos", commonUse: "Combustivel e grandes volumes liquidos" },
      { name: "Galao imperial", symbol: "imp gal", referenceValue: "≈0,004546 m³ (≈4,546 L)", system: "Britanico (imperial)", commonUse: "Combustivel e medicao de liquidos no Reino Unido" },
      { name: "Pe cubico", symbol: "ft³", referenceValue: "≈0,0283168 m³", system: "Britanico/norte-americano", commonUse: "Construcao e vazao de ar em climatizacao" },
      { name: "Barril (petroleo)", symbol: "bbl", referenceValue: "≈0,158987 m³ (≈158,987 L)", system: "Industria petrolifera", commonUse: "Medicao de petroleo bruto" },
      { name: "Metro cubico", symbol: "m³", referenceValue: "1 m³", system: "SI", commonUse: "Reservatorios de agua, concreto e grandes volumes" },
    ],
  },
  {
    locale: "pt",
    slug: "massa",
    sourceSlug: "kutle",
    category: "kutle",
    title: "Conversao de unidades de massa",
    description:
      "Converta rapido e gratis entre quilogramas, gramas, miligramas, toneladas e libras.",
    introduction: [
      "A massa e uma grandeza fisica fundamental relacionada a quantidade de materia de um objeto e sua propriedade de inercia. No Sistema Internacional de Unidades, a unidade basica de massa e o quilograma, simbolizado por kg.",
      "Embora na linguagem cotidiana massa e peso sejam usados como sinonimos, sao grandezas fisicamente distintas. A massa e medida em quilogramas, enquanto o peso, por ser uma forca, e medido em newtons.",
    ],
    facts: [
      { label: "Grandeza fisica", value: "Massa" },
      { label: "Simbolo dimensional", value: "[M]" },
      { label: "Unidade basica do SI", value: "Quilograma" },
      { label: "Simbolo da unidade SI", value: "kg" },
      { label: "Area da metrologia", value: "Metrologia da massa" },
    ],
    sections: [
      {
        title: "O que e a massa?",
        paragraphs: [
          "A massa e a grandeza fisica relacionada a resistencia que um objeto oferece a mudanca de seu estado de movimento, ou seja, a inercia. Na mecanica classica, a relacao entre a forca resultante aplicada a um objeto e a aceleracao produzida se expressa pela igualdade F = m·a.",
          "Ao aplicar a mesma forca, um objeto com maior massa adquire uma aceleracao menor. Por isso a massa nao expressa apenas, em sentido cotidiano, a quantidade de materia contida em um objeto, mas desempenha um papel fundamental nas equacoes do movimento.",
          "A massa e uma grandeza escalar. Nao tem direcao e seu simbolo dimensional basico no sistema SI e a letra M.",
        ],
      },
      {
        title: "A diferenca entre massa e peso",
        paragraphs: [
          "Massa e peso nao sao a mesma grandeza fisica. A massa e uma propriedade do objeto e se expressa em quilogramas. O peso, por outro lado, e a forca que o objeto sofre em um campo gravitacional e se mede em newtons.",
          "A relacao simplificada do peso se escreve W = m·g, onde W representa a forca peso, m a massa e g a aceleracao da gravidade local.",
          "A massa de um objeto permanece aproximadamente igual na Terra e na Lua; no entanto, seu peso varia porque a aceleracao da gravidade local e diferente. Por isso, no uso cientifico, o quilograma e uma unidade de massa e nao de peso.",
          "Na linguagem cotidiana, como o resultado de pesar algo e expresso em quilogramas, as palavras 'peso' e 'massa' costumam ser usadas indistintamente. O instrumento de medicao na verdade detecta o efeito de uma forca, mas e calibrado para mostrar o resultado em unidade de massa.",
        ],
      },
      {
        title: "Por que o quilograma e a unidade basica do SI para massa?",
        paragraphs: [
          "No Sistema Internacional de Unidades, a unidade basica de massa e o quilograma. Entre as unidades basicas do SI, o quilograma e a unica cujo nome inclui um prefixo.",
          "A palavra grama desempenhou historicamente um papel importante nas primeiras definicoes de massa do sistema metrico. Mas ao se estabelecerem os padroes praticos, o quilograma se tornou a referencia fundamental.",
          "Atualmente, o quilograma nao e mais definido pela massa de um cilindro metalico fisico, mas a partir do valor numerico fixado da constante de Planck. A relacao dessa definicao com a balanca de Kibble e as medicoes eletricas e examinada em detalhe na pagina de informacoes dedicada ao quilograma.",
        ],
      },
      {
        title: "As unidades metricas de massa",
        paragraphs: [
          "As unidades metricas de massa sao construidas a partir do quilograma, do grama e dos prefixos do SI que se acrescentam a eles. Um grama equivale a 0,001 quilograma, um miligrama a 0,001 grama e um micrograma a 0,001 miligrama.",
          "Para massas grandes, usa-se a tonelada. Uma tonelada metrica equivale exatamente a 1000 quilogramas. O simbolo da tonelada, cujo uso junto ao SI e aceito, e a letra minuscula t.",
          "A unidade adequada e escolhida conforme a magnitude da massa medida. A massa de uma pessoa ou de um produto pode ser expressa em quilogramas, o conteudo de um alimento em gramas, o principio ativo de um medicamento em miligramas ou microgramas, e a carga de um veiculo em toneladas.",
        ],
      },
      {
        title: "A relacao entre libra, onca e quilograma",
        paragraphs: [
          "A libra e a onca sao unidades de massa usadas nos sistemas de medida tradicionais britanico e norte-americano. A libra avoirdupois internacional equivale exatamente a 0,45359237 quilograma.",
          "Uma libra avoirdupois se divide em 16 oncas. Portanto, uma onca equivale exatamente a 0,028349523125 quilograma, ou 28,349523125 gramas.",
          "A libra usada para massa e a libra-forca (pound-force), uma unidade de forca, sao grandezas diferentes. A libra expressa uma massa, e a libra-forca, uma forca. Em calculos tecnicos, os simbolos lb e lbf nao devem ser confundidos.",
        ],
      },
      {
        title: "Como se mede a massa?",
        paragraphs: [
          "Para medir a massa podem ser usadas balancas de dois pratos, balancas eletronicas, balancas analiticas, celulas de carga e diversos sistemas de pesagem industrial de diferentes capacidades.",
          "As balancas comparativas comparam a massa desconhecida com massas padrao rastreaveis. Nas balancas eletronicas, as celulas de carga convertem a forca aplicada em um sinal eletrico.",
          "Em medicoes de alta precisao, podem ser considerados fatores como o empuxo do ar, a aceleracao da gravidade local, a temperatura, a umidade, as vibracoes, os efeitos eletrostaticos e a densidade da massa padrao.",
          "A vinculacao dos padroes de massa com os sistemas de medicao nacionais e internacionais e chamada de rastreabilidade metrologica. A cadeia de calibracao permite comparar medicoes realizadas em diferentes laboratorios e empresas.",
        ],
      },
      {
        title: "A relacao entre densidade, volume e massa",
        paragraphs: [
          "Entre massa, densidade e volume existe a relacao m = ρ·V. Aqui, m representa a massa, ρ a densidade e V o volume.",
          "Para um mesmo volume, a massa de dois materiais distintos pode diferir conforme sua densidade. Por exemplo, para o mesmo volume, aco e agua nao tem a mesma massa.",
          "No sistema SI, a unidade derivada basica da densidade e o quilograma por metro cubico. Em aplicacoes de laboratorio tambem sao usadas habitualmente unidades como grama por centimetro cubico ou grama por mililitro.",
        ],
      },
      {
        title: "A incerteza na medicao da massa",
        paragraphs: [
          "Toda medicao real carrega certa incerteza. O fato de uma balanca mostrar muitos algarismos na tela nao significa que todos esses algarismos sejam conhecidos com a mesma precisao.",
          "A resolucao do instrumento, a repetibilidade, a nao linearidade, o padrao de calibracao, as condicoes ambientais e o metodo do usuario podem contribuir para a incerteza da medicao de massa.",
          "Em trabalhos cientificos e industriais, o resultado de uma medicao deve ser avaliado junto com a unidade adequada, o numero de algarismos significativos e a informacao sobre a incerteza.",
        ],
      },
      {
        title: "Como escolher a unidade de massa adequada?",
        paragraphs: [
          "Escolher uma unidade compativel com a magnitude do objeto medido torna o resultado mais legivel. A massa de uma pessoa pode ser expressa em quilogramas, o principio ativo de um comprimido em miligramas, e a carga de um caminhao em toneladas.",
          "Para massas muito pequenas, podem ser usadas unidades com prefixo do SI como microgama, nanograma e picograma. Em escala atomica e molecular, unidades especificas como a unidade de massa atomica unificada podem ser mais praticas.",
          "Ao realizar uma conversao de unidades, e preciso verificar nao apenas o valor numerico, mas tambem se a unidade utilizada expressa massa ou forca.",
        ],
      },
    ],
    unitTable: [
      { name: "Nanograma", symbol: "ng", referenceValue: "10⁻¹² kg", system: "SI", commonUse: "Quantidades de materia muito pequenas" },
      { name: "Micrograma", symbol: "µg", referenceValue: "10⁻⁹ kg", system: "SI", commonUse: "Medicoes medicas e de laboratorio" },
      { name: "Miligrama", symbol: "mg", referenceValue: "10⁻⁶ kg", system: "SI", commonUse: "Doses de medicamentos e substancias quimicas" },
      { name: "Grama", symbol: "g", referenceValue: "0,001 kg", system: "SI", commonUse: "Alimentos e objetos pequenos" },
      { name: "Quilograma", symbol: "kg", referenceValue: "1 kg", system: "SI", commonUse: "Medicoes de massa basicas" },
      { name: "Tonelada", symbol: "t", referenceValue: "1000 kg", system: "Metrico", commonUse: "Transporte, carga e industria" },
      { name: "Onca", symbol: "oz", referenceValue: "0,028349523125 kg", system: "Britanico/norte-americano", commonUse: "Alimentos e massas pequenas" },
      { name: "Libra", symbol: "lb", referenceValue: "0,45359237 kg", system: "Britanico/norte-americano", commonUse: "Massa corporal e de produtos" },
    ],
  },
  {
    locale: "pt",
    slug: "temperatura",
    sourceSlug: "sicaklik",
    category: "sicaklik",
    title: "Conversao de unidades de temperatura",
    description:
      "Converta temperaturas entre Celsius, Fahrenheit e Kelvin; consulte formulas e valores de exemplo.",
    introduction: [
      "A temperatura e uma grandeza fisica fundamental relacionada a energia cinetica media das particulas de uma materia, que expressa o quao 'quente' ou 'fria' essa materia esta. No Sistema Internacional de Unidades, a unidade basica de temperatura e o kelvin.",
      "No dia a dia, as escalas Celsius e Fahrenheit sao as mais usadas; em trabalhos cientificos usa-se o kelvin, em alguns calculos de engenharia o Rankine, e em textos historicos pode aparecer o Reaumur. Diferentemente de muitas outras grandezas fisicas, a conversao de temperatura entre unidades exige nao apenas multiplicacao, mas tambem soma ou subtracao.",
    ],
    facts: [
      { label: "Grandeza fisica", value: "Temperatura (temperatura termodinamica)" },
      { label: "Simbolo dimensional", value: "[Θ]" },
      { label: "Unidade basica do SI", value: "Kelvin" },
      { label: "Simbolo da unidade SI", value: "K" },
      { label: "Zero absoluto", value: "0 K = -273,15 °C = -459,67 °F" },
    ],
    sections: [
      {
        title: "O que e a temperatura?",
        paragraphs: [
          "A temperatura e uma grandeza diretamente relacionada a energia cinetica (de movimento) media dos atomos e moleculas que compoem uma materia. Quanto mais rapido as particulas se movem, mais 'quente' a materia e considerada.",
          "A temperatura e uma das sete grandezas basicas do Sistema Internacional de Unidades e, como temperatura termodinamica, e representada pelo simbolo Θ (teta). Diferentemente de muitas outras grandezas (como comprimento ou massa), nao e uma grandeza diretamente aditiva -- colocar dois corpos em contato nao soma suas temperaturas, mas os conduz a um equilibrio.",
        ],
      },
      {
        title: "A unidade SI da temperatura: o kelvin",
        paragraphs: [
          "O kelvin e a unidade basica do SI para temperatura e e representado pelo simbolo K (sem o sinal de grau, escreve-se simplesmente 'K'). A escala Kelvin toma o zero absoluto (a temperatura mais baixa teoricamente possivel) como ponto de partida (0 K).",
          "Desde a revisao do SI de 2019, o kelvin nao e mais definido a partir do ponto triplo da agua, mas a partir do valor numerico fixado da constante de Boltzmann (k). Isso garante que a unidade de temperatura se baseie em uma constante universal e nao em uma substancia de referencia fisica.",
        ],
      },
      {
        title: "Por que a conversao de temperatura nao e uma simples multiplicacao?",
        paragraphs: [
          "Em grandezas como comprimento ou massa, a conversao de unidades e feita apenas com um fator multiplicativo (por exemplo, metro-centimetro). Na temperatura, como as escalas Celsius, Fahrenheit e Kelvin tem 'pontos zero' distintos, a conversao exige tanto multiplicacao quanto soma ou subtracao.",
          "Por exemplo, para passar de Celsius para Fahrenheit, o valor e primeiro multiplicado por 9/5 e depois somado a 32: °F = (°C × 9/5) + 32. Por isso a temperatura e, matematicamente, a unica grandeza fisica comum com uma relacao de conversao 'afim' (linear, mas que nao passa pela origem).",
        ],
      },
      {
        title: "A escala Celsius",
        paragraphs: [
          "A escala Celsius foi desenvolvida em 1742 pelo astronomo sueco Anders Celsius e define o ponto de congelamento da agua em 0 °C e seu ponto de ebulicao (a uma atmosfera de pressao) em 100 °C. E um sistema de referencia pratico que facilita a compreensao da escala no dia a dia.",
          "O Celsius e a escala de temperatura mais usada no mundo tanto em trabalhos cientificos quanto na informacao meteorologica diaria da maioria dos paises, incluindo o Brasil; um pequeno numero de paises, como os Estados Unidos, ainda prefere o Fahrenheit no uso diario.",
        ],
      },
      {
        title: "A escala Fahrenheit",
        paragraphs: [
          "A escala Fahrenheit foi desenvolvida em 1724 pelo fisico alemao Daniel Gabriel Fahrenheit. Nessa escala, o ponto de congelamento da agua e 32 °F e o ponto de ebulicao 212 °F -- um intervalo exato de 180 graus entre o congelamento e a ebulicao.",
          "O Fahrenheit ainda e usado hoje para medicoes de temperatura cotidianas em um pequeno numero de paises, principalmente os Estados Unidos; nos trabalhos cientificos em nivel mundial, cedeu em grande parte seu lugar ao Celsius e ao Kelvin.",
        ],
      },
      {
        title: "Rankine e Reaumur: escalas menos conhecidas",
        paragraphs: [
          "O Rankine e uma escala de temperatura absoluta que usa unidades do mesmo tamanho que o grau Fahrenheit, mas toma o zero absoluto como 0 °R; o ponto de congelamento da agua e 491,67 °R. E preferido especialmente ao Kelvin em alguns calculos de engenharia termodinamica nos Estados Unidos.",
          "A escala Reaumur foi desenvolvida no seculo XVIII pelo cientista frances Rene Reaumur; fixa o ponto de congelamento da agua em 0 °Ré e o de ebulicao em 80 °Ré. Embora hoje praticamente nao seja usada, ainda pode ser encontrada como referencia historica em alguns paises europeus (especialmente em algumas receitas tradicionais da Russia).",
        ],
      },
      {
        title: "O que significa o zero absoluto?",
        paragraphs: [
          "O zero absoluto (0 kelvin, -273,15 °C, -459,67 °F) e a temperatura teorica na qual as particulas possuem, em sentido classico, a menor energia cinetica possivel. Segundo a mecanica quantica, as particulas nao permanecem completamente imoveis nem mesmo no zero absoluto (energia do ponto zero), mas em sentido classico nao pode ser definida uma temperatura mais baixa.",
          "Em laboratorio, ja foram alcancadas temperaturas extremamente proximas do zero absoluto (da ordem do microkelvin, ate do nanokelvin), mas segundo a terceira lei da termodinamica e impossivel alcancar exatamente o zero absoluto em um numero finito de etapas.",
        ],
      },
      {
        title: "Como se mede a temperatura?",
        paragraphs: [
          "Para medir a temperatura, usam-se diferentes tecnologias: termometros de mercurio ou alcool, termometros digitais, termopares, termometros de resistencia (RTD) e termometros infravermelhos (sem contato). Cada um e adequado para uma faixa de temperatura e um nivel de precisao diferentes.",
          "Os termopares sao amplamente usados em ambientes industriais porque podem funcionar em uma faixa de temperatura muito ampla (as vezes de -200 °C a +2000 °C); calculam a temperatura a partir da diferenca de tensao gerada na juncao de dois metais distintos.",
        ],
      },
    ],
    unitTable: [
      { name: "Kelvin", symbol: "K", referenceValue: "Unidade basica", system: "SI", commonUse: "Calculos cientificos e termodinamicos" },
      { name: "Celsius", symbol: "°C", referenceValue: "K = °C + 273,15", system: "Metrico (uso cotidiano)", commonUse: "Meteorologia, vida cotidiana, ciencia" },
      { name: "Fahrenheit", symbol: "°F", referenceValue: "°F = (°C × 9/5) + 32", system: "Estados Unidos", commonUse: "Meteorologia diaria nos Estados Unidos" },
      { name: "Rankine", symbol: "°R", referenceValue: "°R = (°C + 273,15) × 9/5", system: "Estados Unidos (engenharia)", commonUse: "Calculos de engenharia termodinamica" },
      { name: "Reaumur", symbol: "°Ré", referenceValue: "°Ré = °C × 4/5", system: "Historico (Europa)", commonUse: "Textos historicos, receitas tradicionais" },
    ],
  },
  {
    locale: "pt",
    slug: "tempo",
    sourceSlug: "zaman",
    category: "zaman",
    title: "Conversao de unidades de tempo",
    description:
      "Use em uma unica pagina as conversoes de tempo essenciais entre segundos, minutos e horas.",
    introduction: [
      "O tempo e uma grandeza fisica fundamental que expressa a ordem em que os eventos ocorrem e a duracao que os separa. No Sistema Internacional de Unidades, a unidade basica de tempo e o segundo, usado junto com unidades derivadas como minuto, hora e dia no dia a dia.",
      "Diferentemente de grandezas como comprimento ou massa, o tempo e um dos conceitos de medicao mais antigos da historia humana; a estrutura sexagesimal (base 60) da hora, do minuto e do segundo remonta a milhares de anos, ate a antiga civilizacao babilonica.",
    ],
    facts: [
      { label: "Grandeza fisica", value: "Tempo" },
      { label: "Simbolo dimensional", value: "[T]" },
      { label: "Unidade basica do SI", value: "Segundo" },
      { label: "Simbolo da unidade SI", value: "s" },
      { label: "Definicao atual do segundo", value: "9.192.631.770 periodos de oscilacao do atomo de cesio-133" },
    ],
    sections: [
      {
        title: "O que e o tempo?",
        paragraphs: [
          "O tempo e uma grandeza fundamental que expressa a ordem em que os eventos ocorrem e a duracao decorrida entre dois eventos. Na fisica, e representado pelo simbolo dimensional T e participa da definicao de diversas grandezas derivadas, como velocidade, aceleracao e frequencia.",
          "Na fisica classica, o tempo era considerado uma grandeza absoluta que transcorria igualmente para todos os observadores; com a teoria da relatividade de Einstein, compreendeu-se que o tempo pode transcorrer de forma diferente conforme a velocidade do observador e o campo gravitacional (dilatacao do tempo).",
        ],
      },
      {
        title: "A unidade SI do tempo: o segundo",
        paragraphs: [
          "O segundo e a unidade basica do SI para tempo, simbolizado por s. Historicamente, o segundo era definido como 1/86.400 de um dia (24 horas × 60 minutos × 60 segundos).",
          "Como essa definicao se mostrou insuficientemente estavel devido a pequenas irregularidades na velocidade de rotacao da Terra, em 1967 o segundo foi redefinido como exatamente 9.192.631.770 periodos da radiacao associada a transicao entre dois niveis de energia fundamentais do atomo de cesio-133. Essa definicao permite que os relogios atomicos funcionem com a mesma precisao em qualquer lugar do mundo.",
        ],
      },
      {
        title: "A origem sexagesimal da hora, do minuto e do segundo",
        paragraphs: [
          "A divisao de uma hora em 60 minutos e de um minuto em 60 segundos remonta ao sistema numerico sexagesimal (base 60) usado pela antiga civilizacao babilonica. Os babilonios dividiam tanto o angulo (360 graus) quanto o tempo segundo esse sistema.",
          "O numero 60 foi escolhido porque e divisivel exatamente por muitos numeros -- 2, 3, 4, 5, 6, 10, 12, 15, 20 e 30 -- o que facilita divisoes praticas em calculos cotidianos (por exemplo, dividir uma hora em tres ou quatro partes) sem necessidade de numeros fracionarios.",
        ],
      },
      {
        title: "A divisao do dia em 24 horas",
        paragraphs: [
          "A divisao do dia em 24 horas remonta ao Antigo Egito; os egipcios dividiam o dia em 12 partes iguais e a noite em outras 12, acompanhando o tempo por meio de relogios de sol e observacoes estelares.",
          "Essa divisao em 12 provavelmente se inspirou na contagem das falanges dos dedos (tres falanges em cada um dos quatro dedos sem contar o polegar, 12 no total) ou no numero de ciclos lunares de um ano (cerca de 12 luas cheias).",
        ],
      },
      {
        title: "A relacao entre as unidades metricas de tempo",
        paragraphs: [
          "Os submultiplos do segundo -- o milissegundo (0,001 segundo), o microssegundo e o nanossegundo -- sao usados para medir eventos muito breves, como operacoes de processadores de computador, cronometragem esportiva e experimentos cientificos.",
          "Seus multiplos -- o minuto (60 segundos), a hora (3600 segundos) e o dia (86.400 segundos) -- sao as unidades basicas usadas diariamente para contar o tempo. A conversao entre essas unidades e feita, diferentemente da temperatura, apenas por multiplicacao/divisao, porque todas compartilham um ponto zero (origem) comum.",
        ],
      },
      {
        title: "O que e um segundo intercalar?",
        paragraphs: [
          "A velocidade de rotacao da Terra em seu eixo apresenta, com o tempo, pequenas irregularidades devido aos efeitos das mares e a mudancas em sua estrutura interna; isso cria uma pequena defasagem entre o tempo 'preciso' medido pelos relogios atomicos e a duracao do dia baseada na rotacao real da Terra.",
          "Para compensar essa defasagem, desde 1972 adiciona-se um 'segundo intercalar' ao Tempo Universal Coordenado (UTC) quando necessario. E um mecanismo de correcao semelhante ao dia adicional dos anos bissextos (29 de fevereiro), mas como a irregularidade da rotacao terrestre e imprevisivel, os segundos intercalares nao sao adicionados em um ciclo fixo como o calendario, e sim conforme necessario.",
        ],
      },
      {
        title: "Os fusos horarios e o UTC",
        paragraphs: [
          "A Terra esta dividida em cerca de 24 fusos horarios, porque o Sol atinge seu ponto mais alto em horas diferentes conforme a longitude. Todos os fusos horarios usam o Tempo Universal Coordenado (UTC) como ponto de referencia e sao expressos por uma diferenca horaria em relacao a essa referencia conforme sua regiao (por exemplo, Brasilia e UTC-3 e Nova York e UTC-5 no inverno).",
          "O UTC e um padrao de tempo moderno que substituiu o antigo Tempo Medio de Greenwich (GMT) e e mantido por relogios atomicos; o GMT hoje e usado principalmente como nome do fuso horario correspondente ao horario de inverno no Reino Unido.",
        ],
      },
      {
        title: "Como se mede o tempo?",
        paragraphs: [
          "No dia a dia, usam-se relogios mecanicos e digitais, enquanto em aplicacoes cientificas e tecnologicas (satelites GPS, redes de telecomunicacoes) usam-se relogios atomicos. Os relogios atomicos funcionam com precisao extremamente alta, baseada na frequencia de oscilacao estavel de atomos de cesio ou rubidio.",
          "Para que o sistema GPS possa determinar uma posicao precisa, os relogios atomicos dos satelites devem estar sincronizados com precisao de nanossegundos; ate uma pequena defasagem nesses relogios pode provocar grandes erros no calculo da posicao em terra.",
        ],
      },
    ],
    unitTable: [
      { name: "Milissegundo", symbol: "ms", referenceValue: "0,001 s", system: "SI/metrico", commonUse: "Operacoes de computador e cronometragem esportiva" },
      { name: "Segundo", symbol: "s", referenceValue: "1 s", system: "SI", commonUse: "Medicao de tempo basica" },
      { name: "Minuto", symbol: "min", referenceValue: "60 s", system: "Aceito junto ao SI", commonUse: "Controle do tempo cotidiano" },
      { name: "Hora", symbol: "h", referenceValue: "3600 s", system: "Aceito junto ao SI", commonUse: "Tempo de trabalho, tempo de viagem" },
      { name: "Dia", symbol: "dia", referenceValue: "86.400 s", system: "Aceito junto ao SI", commonUse: "Calendario e calculos de duracao" },
    ],
  },
  {
    locale: "pt",
    slug: "velocidade",
    sourceSlug: "hiz",
    category: "hiz",
    title: "Conversao de unidades de velocidade",
    description:
      "Converta a velocidade entre km/h, m/s e mph; consulte exemplos de engenharia e de uso cotidiano.",
    introduction: [
      "A velocidade e uma grandeza fisica derivada que expressa a distancia percorrida por um objeto por unidade de tempo. Como e obtida dividindo um comprimento por um tempo, a dimensao da velocidade e L/T (comprimento dividido por tempo).",
      "No dia a dia, o quilometro por hora (km/h) e a milha por hora (mph) sao as unidades de velocidade mais usadas; o metro por segundo (m/s) e preferido em trabalhos cientificos, e o no na navegacao maritima e aerea. A velocidade da luz ocupa um lugar especial entre as unidades de velocidade, como limite superior absoluto alcancavel no universo.",
    ],
    facts: [
      { label: "Grandeza fisica", value: "Velocidade" },
      { label: "Simbolo dimensional", value: "[L/T]" },
      { label: "Unidade derivada do SI", value: "Metro por segundo" },
      { label: "Simbolo da unidade SI", value: "m/s" },
      { label: "Limite de velocidade universal", value: "Velocidade da luz ≈ 299.792.458 m/s" },
    ],
    sections: [
      {
        title: "O que e a velocidade?",
        paragraphs: [
          "A velocidade expressa a distancia percorrida por um objeto por unidade de tempo e e calculada pela formula Velocidade = Distancia / Tempo. Embora a fisica tecnicamente distinga entre 'rapidez' (escalar, sem direcao) e 'velocidade' (vetorial, com direcao), na linguagem cotidiana os dois termos costumam ser usados indistintamente.",
          "A velocidade e uma grandeza derivada, obtida dividindo uma unidade de comprimento por uma unidade de tempo. Por isso sua dimensao SI e denotada L/T (ou L¹T⁻¹).",
        ],
      },
      {
        title: "A unidade SI da velocidade: o metro por segundo",
        paragraphs: [
          "No Sistema Internacional de Unidades, a unidade derivada de velocidade e o metro por segundo (m/s), que expressa que um objeto percorre um metro a cada segundo. Essa unidade e usada como padrao em calculos cientificos e formulas de fisica.",
          "No dia a dia, prefere-se o quilometro por hora (km/h) ao metro por segundo, porque as velocidades dos veiculos e as distancias rodoviarias sao expressas assim com numeros mais intuitivos nessa escala. 1 m/s equivale exatamente a 3,6 km/h.",
        ],
      },
      {
        title: "O quilometro por hora e a milha por hora",
        paragraphs: [
          "O quilometro por hora (km/h) e a unidade padrao de velocidade rodoviaria nos paises que usam o sistema metrico, incluindo o Brasil. A milha por hora (mph) e preferida em paises que usam o sistema de medidas britanico, como Estados Unidos e Reino Unido.",
          "1 mph equivale a cerca de 1,60934 km/h. Essa diferenca e uma fonte pratica de confusao que pode levar a interpretar mal os velocimetros de veiculos importados ou os limites de velocidade ao alugar um carro no exterior.",
        ],
      },
      {
        title: "O no: a velocidade na navegacao maritima e aerea",
        paragraphs: [
          "O no (milha nautica por hora) e a unidade de velocidade padrao na navegacao maritima e aerea; 1 no significa exatamente percorrer uma milha nautica (1852 metros) em uma hora.",
          "O nome da unidade 'no' vem historicamente do metodo usado para medir a velocidade dos navios: jogava-se na agua uma corda marcada com nos e contava-se quantos nos passavam em um tempo determinado. Esse metodo foi usado durante seculos antes do surgimento dos instrumentos modernos de medicao de velocidade.",
        ],
      },
      {
        title: "A velocidade da luz: o limite de velocidade do universo",
        paragraphs: [
          "A velocidade da luz no vacuo e definida exatamente como 299.792.458 m/s e constitui, segundo a teoria da relatividade especial de Einstein, o limite superior absoluto que pode ser alcancado pela informacao ou por um objeto com massa no universo.",
          "O fato de a velocidade da luz ser definida como um numero exato (e ja ser considerada constante antes da revisao do SI de 2019) permite que a definicao atual do metro tambem se apoie nessa constante -- o metro e definido como a distancia percorrida pela luz em 1/299.792.458 de segundo.",
        ],
      },
      {
        title: "O numero de Mach: uma relacao com a velocidade do som",
        paragraphs: [
          "Na aviacao, velocidades altas costumam ser expressas pelo numero de Mach, que representa a relacao entre a velocidade de um objeto e a velocidade do som naquele meio (Mach 1 = velocidade do som). A velocidade do som nao e um valor fixo; varia conforme a temperatura e a densidade do ar (cerca de 343 m/s, ou 1235 km/h, ao nivel do mar).",
          "Por isso, um mesmo numero de Mach pode corresponder a velocidades reais diferentes (em km/h ou m/s) conforme a altitude e a temperatura -- a velocidade Mach 0,85 de um aviao varia em seu valor real com a altitude.",
        ],
      },
      {
        title: "A diferenca entre velocidade media e velocidade instantanea",
        paragraphs: [
          "A velocidade media e obtida dividindo a distancia total percorrida pelo tempo total decorrido e fornece um unico valor para todo um trajeto. A velocidade instantanea e a velocidade de um objeto em um momento especifico e pode variar continuamente (aceleracao, desaceleracao, parada, etc.).",
          "Enquanto o velocimetro de um veiculo mostra a velocidade instantanea, a velocidade media de um trajeto costuma ser calculada posteriormente a partir da distancia total e da duracao total -- ambos os valores diferem enquanto a velocidade nao tiver se mantido constante durante o trajeto.",
        ],
      },
    ],
    unitTable: [
      { name: "Centimetro por segundo", symbol: "cm/s", referenceValue: "0,01 m/s", system: "SI/metrico", commonUse: "Laboratorio e medicao de movimento lento" },
      { name: "Metro por minuto", symbol: "m/min", referenceValue: "≈0,0167 m/s", system: "SI/metrico", commonUse: "Velocidade de esteiras transportadoras industriais" },
      { name: "Metro por segundo", symbol: "m/s", referenceValue: "1 m/s", system: "SI", commonUse: "Calculos cientificos e fisicos" },
      { name: "Quilometro por hora", symbol: "km/h", referenceValue: "≈0,278 m/s", system: "Metrico", commonUse: "Velocidade de veiculos e limites rodoviarios" },
      { name: "Milha por hora", symbol: "mph", referenceValue: "≈0,447 m/s", system: "Britanico/norte-americano", commonUse: "Velocidade de veiculos nos EUA e Reino Unido" },
      { name: "No", symbol: "kn", referenceValue: "≈0,514 m/s", system: "Navegacao maritima/aerea", commonUse: "Velocidade de navios e avioes" },
      { name: "Quilometro por minuto", symbol: "km/min", referenceValue: "≈16,67 m/s", system: "Metrico", commonUse: "Calculos de velocidade em distancias curtas" },
      { name: "Quilometro por segundo", symbol: "km/s", referenceValue: "1000 m/s", system: "Metrico", commonUse: "Velocidade de naves espaciais e corpos celestes" },
      { name: "Velocidade da luz", symbol: "c", referenceValue: "299.792.458 m/s", system: "Constante universal", commonUse: "Calculos de fisica e astronomia" },
    ],
  },
  {
    locale: "pt",
    slug: "pressao",
    sourceSlug: "basinc",
    category: "basinc",
    title: "Conversao de unidades de pressao",
    description:
      "Converta a pressao entre pascal, quilopascal, bar e PSI; consulte formulas e usos na engenharia.",
    introduction: [
      "A pressao e a grandeza fisica que expressa a quantidade de forca que atua perpendicularmente sobre uma superficie, em relacao a essa superficie. Seu campo de aplicacao e muito amplo, desde as tensoes de contato entre solidos ate o fluido em uma tubulacao, da atmosfera aos sistemas de vacuo. Na engenharia, a pressao nao e apenas um valor numerico: e uma variavel de projeto fundamental para a seguranca, a estanqueidade, a resistencia estrutural, a conversao de energia e o controle de processos.",
      "No Sistema Internacional de Unidades, a unidade derivada de pressao e o pascal, simbolizado por Pa. Um pascal corresponde a pressao exercida por uma forca de um newton distribuida uniformemente sobre uma superficie de um metro quadrado. Por isso a pressao esta diretamente ligada aos conceitos de forca e superficie; compartilha a mesma estrutura dimensional com a tensao mecanica dos materiais, embora o contexto fisico nem sempre seja o mesmo.",
      "No dia a dia e na industria, a pressao e expressa na maioria das vezes em unidades mais praticas que o pascal. O quilopascal e o PSI sao muito usados para a pressao dos pneus, o bar em sistemas de processo, o atm em condicoes atmosfericas e o milibar em meteorologia. O fato de diferentes setores terem adotado historicamente unidades diferentes torna especialmente importante entender bem as conversoes de pressao e nao confundir os tipos de pressao absoluta, relativa ou diferencial.",
    ],
    facts: [
      { label: "Grandeza fisica", value: "Pressao" },
      { label: "Unidade derivada do SI", value: "Pascal" },
      { label: "Simbolo SI", value: "Pa" },
      { label: "Relacao basica", value: "P = F / A" },
      { label: "Equivalente SI", value: "1 Pa = 1 N/m²" },
      { label: "Formula dimensional", value: "M L⁻¹ T⁻²" },
      { label: "Atmosfera padrao", value: "101.325 Pa" },
      { label: "Referencia do zero absoluto", value: "Vacuo total" },
    ],
    sections: [
      {
        title: "O que e a pressao?",
        paragraphs: [
          "A pressao nao depende apenas da magnitude da forca aplicada sobre uma superficie, mas tambem da superficie sobre a qual essa forca e distribuida. Se a mesma forca for aplicada sobre uma superficie menor, a pressao aumenta; se for distribuida sobre uma superficie maior, diminui. Por isso uma faca bem afiada pode cortar com pouca forca, enquanto a mesma forca sobre uma base larga produz um efeito superficial muito menor.",
          "Na mecanica dos fluidos, a pressao e considerada a componente de tensao normal que um fluido em repouso ou em movimento exerce sobre seu entorno. Em um fluido em repouso, a pressao e transmitida em todas as direcoes e esta relacionada ao principio de Pascal em recipientes fechados. Essa propriedade e a base das prensas hidraulicas, dos sistemas de freio e de diversos atuadores industriais.",
          "O conceito de pressao nao se limita a liquidos e gases. O efeito da forca normal media nas superficies de contato tambem cria uma distribuicao semelhante a pressao. Mas na engenharia, ao falar de pressao costuma-se pensar principalmente em sistemas fluidos como tubulacoes, reservatorios, compressores, dutos de ar, camaras de vacuo e o ambiente atmosferico.",
        ],
      },
      {
        title: "A formula da pressao: P = F / A",
        paragraphs: [
          "A definicao basica da pressao e dada pela relacao P = F / A. Aqui, P representa a pressao, F a componente de forca perpendicular a superficie, e A a superficie sobre a qual essa forca e distribuida. A analise dimensional resulta em newton dividido por metro quadrado, o que equivale a unidade pascal.",
          "Essa relacao, supondo uma distribuicao uniforme da forca, fornece a pressao media. Em problemas de contato reais ou em campos complexos dentro de um fluido, a pressao pode variar ao longo da superficie. Nesse caso, em vez de um unico valor medio, considera-se a distribuicao local de pressao, equacoes diferenciais e condicoes de contorno.",
          "Um erro frequente na pratica e escolher mal a direcao da forca e a superficie efetiva. Por exemplo, ao calcular a forca de um pistao, deve-se usar apenas a superficie de secao efetiva submetida a pressao. Ignorar detalhes geometricos como a junta, o parafuso ou a superficie de apoio pode causar erros de projeto.",
        ],
      },
      {
        title: "Por que o pascal e a unidade SI de pressao?",
        paragraphs: [
          "O pascal surge de forma natural da combinacao do newton, unidade SI de forca, e do metro quadrado, unidade SI de superficie. A igualdade 1 Pa = 1 N/m² nao e apenas uma definicao, mas tambem uma expressao dimensional que mostra a origem mecanica da pressao. Por isso nao e necessario definir uma unidade basica independente para a pressao.",
          "O sistema SI busca relacionar de forma coerente as grandezas derivadas com as unidades basicas. Expressar a pressao em pascals fornece um arcabouco compativel com a densidade de energia, a tensao, o modulo de elasticidade e as equacoes de mecanica dos fluidos. O fato de uma mesma unidade poder ser usada em diferentes campos reduz os erros de conversao nos calculos.",
          "Em escala cotidiana, o pascal costuma ser uma unidade muito pequena. Por isso a engenharia prefere escalas mais praticas como o quilopascal, o megapascal ou o bar. Ainda assim, todas elas acabam vinculadas ao pascal e, portanto, a base do SI.",
        ],
      },
      {
        title: "A historia da medicao da pressao: Torricelli e o barometro",
        paragraphs: [
          "A medicao sistematica da pressao comecou em 1643 com o desenvolvimento do barometro de mercurio pelo cientista italiano Evangelista Torricelli. Torricelli observou que, ao submergir um tubo de vidro fechado em uma extremidade e cheio de mercurio, com a extremidade aberta em um recipiente de mercurio, o mercurio do tubo parava em uma certa altura deixando um vacuo acima.",
          "Torricelli propos que a altura da coluna de mercurio era equilibrada pelo peso do ar exterior. Essa ideia estabeleceu a base experimental da nocao de que o ar tem um peso mensuravel e, portanto, uma pressao, e e considerada o ponto de partida do estudo da pressao como grandeza cientifica.",
          "Em 1648, por sugestao de Blaise Pascal, Florin Perier mediu um barometro em diferentes altitudes no Puy de Dome e demonstrou que a pressao atmosferica diminui com a altitude. Os trabalhos posteriores baseados nesses fundamentos trouxeram a coordenacao internacional das unidades de medida com a Convencao do Metro de 1875, a definicao precisa da atmosfera padrao em 1954 e a adocao do pascal no SI em 1971.",
        ],
      },
      {
        title: "Pressao absoluta, relativa e diferencial",
        paragraphs: [
          "A pressao absoluta e medida em relacao ao vacuo total. Essa referencia e a situacao em que a pressao e teoricamente nula, e a pressao absoluta nunca pode ser negativa. As leis dos gases, os calculos termodinamicos e algumas relacoes ligadas a densidade funcionam com pressao absoluta.",
          "A pressao relativa (ou manometrica) e medida em relacao a pressao atmosferica. A maioria dos manometros de campo toma a atmosfera circundante como referencia zero; por isso o valor lido na tela costuma ser pressao relativa. A relacao entre pressao absoluta e relativa se expressa como P_abs = P_rel + P_atm.",
          "A pressao diferencial e a diferenca de pressao entre dois pontos. Em aplicacoes como a obstrucao de um filtro, a medicao de vazao por meio de uma placa de orificio, a pressurizacao de uma sala ou o desempenho de um trocador de calor, acompanha-se diretamente a diferenca de pressao entre duas linhas ou dois volumes distintos. Essa grandeza nao e definida nem em relacao ao vacuo total nem em relacao apenas a atmosfera; e diretamente a diferenca entre dois pontos.",
        ],
      },
      {
        title: "A pressao atmosferica",
        paragraphs: [
          "A pressao atmosferica e a pressao exercida sobre as superficies pelo peso da coluna de ar da atmosfera terrestre. Em condicoes padrao proximas ao nivel do mar, considera-se cerca de 101.325 Pa, ou seja, 1 atm. No entanto, esse valor nao e constante; varia com a altitude, as condicoes meteorologicas e a temperatura.",
          "Barometros sao usados para medir a pressao atmosferica. Os barometros de mercurio foram historicamente instrumentos de referencia, enquanto os sensores de pressao eletronicos se generalizaram nas aplicacoes modernas. A pressao atmosferica e importante nao apenas para a meteorologia, mas tambem para a tecnologia de vacuo, os sistemas de combustao e as conversoes entre pressao relativa e absoluta.",
          "Em sistemas que funcionam com pressao relativa, as variacoes da pressao atmosferica podem afetar a interpretacao da medicao. Por exemplo, uma pressao relativa de 2 bar ao nivel do mar e uma pressao relativa de 2 bar em grande altitude nao fornecem o mesmo valor absoluto. Essa distincao pode ser determinante, especialmente em calculos de compressao, densidade de gases e ponto de ebulicao.",
        ],
      },
      {
        title: "A pressao hidrostatica e a relacao P = ρgh",
        paragraphs: [
          "Em um fluido em repouso, a pressao aumenta com a profundidade. Supondo densidade constante, a pressao relativa hidrostatica se expressa aproximadamente pela relacao P = ρgh. Aqui, ρ representa a densidade, g a aceleracao da gravidade e h a altura da coluna de fluido.",
          "Essa relacao e especialmente util para reservatorios de agua, tanques abertos, represas, medicao de nivel e manometros de coluna liquida. Na mesma altura e no mesmo fluido, a pressao e considerada igual; a forma do recipiente nao muda o resultado. O que determina o resultado e a densidade do fluido e a profundidade vertical em relacao a superficie livre.",
          "A pressao hidrostatica absoluta inclui nao apenas o incremento ρgh, mas tambem a pressao inicial na superficie livre. Em um recipiente aberto, esse valor inicial costuma ser a pressao atmosferica. Portanto, ao calcular a pressao absoluta, deve-se somar nao apenas o incremento devido a coluna de liquido, mas tambem a pressao externa sobre a superficie.",
        ],
      },
      {
        title: "Pressao estatica, dinamica e total",
        paragraphs: [
          "A pressao estatica e a componente de pressao que representa o estado termodinamico local do escoamento, do ponto de vista de um observador que se move com o fluido. A maioria dos pontos de medicao em tubulacoes, reservatorios e dutos segue fundamentalmente a pressao estatica. A maioria dos transmissores de pressao e projetada para medir essa grandeza.",
          "A pressao dinamica expressa o efeito cinetico devido a velocidade do escoamento e sua formula aproximada usual e q = 1/2 ρv². Esse termo desempenha um papel importante na abordagem de Bernoulli e e usado em metodos de medicao de velocidade como o tubo de Pitot. Quanto maior a velocidade, maior a pressao dinamica.",
          "Na abordagem de escoamento ideal, a pressao total e interpretada como a soma da pressao estatica e da dinamica. Em sistemas reais, essa distincao deve ser usada com cuidado devido ao atrito, a turbulencia, a compressibilidade e as perdas locais. Ainda assim, a distincao estatica-total-dinamica continua sendo uma linguagem de engenharia fundamental em ventilacao, aerodinamica e medicoes de processo.",
        ],
      },
      {
        title: "A altura de pressao e a altura manometrica de uma bomba",
        paragraphs: [
          "A altura de pressao expressa uma pressao determinada em termos da altura equivalente de uma coluna de fluido. A relacao basica se escreve h = P / (ρg). Assim, uma mesma pressao corresponde a uma altura diferente conforme a densidade do fluido.",
          "Nos sistemas de bombeamento, a pressao e interpretada na maioria das vezes nao diretamente em pascals ou bar, mas em metros de coluna de fluido. Isso ocorre porque a funcao da bomba nao e apenas dar pressao ao fluido, mas tambem fornecer a energia necessaria para vencer uma determinada altura, as perdas por atrito e uma componente de velocidade. Por isso o conceito de altura manometrica e muito pratico do ponto de vista da engenharia de campo.",
          "A altura de pressao e a altura geometrica nao sao o mesmo conceito. Confiar apenas na leitura de um manometro sem considerar as perdas de carga nas tubulacoes, a carga de velocidade e as resistencias locais pode gerar resultados errados na selecao de bombas e no balanceamento do sistema. Especialmente na agua, no oleo e nos fluidos de processo, as diferencas de densidade exigem uma conversao feita com cuidado.",
        ],
      },
      {
        title: "Por que as unidades de pressao sao diferentes?",
        paragraphs: [
          "A diversidade de unidades de pressao se explica em grande parte por razoes historicas e setoriais. Enquanto o sistema SI toma o pascal como referencia, a industria continua usando o bar, a medicina o mmHg, a meteorologia o milibar, a automocao o PSI, e alguns documentos tecnicos antigos a atmosfera tecnica. Essa situacao ocorre porque as diferentes areas mantem seus proprios habitos de uso.",
          "Algumas unidades sao mais intuitivas para o usuario. Por exemplo, a pressao de um pneu pode parecer mais legivel expressa em cerca de 35 psi do que em 240 kPa, e a pressao de um processo em 3,5 bar em vez de 350.000 Pa. A escolha da unidade nao depende apenas da precisao, mas tambem da cultura dos relatorios, da escala dos aparelhos e dos habitos de campo.",
          "No entanto, como diferentes unidades expressam a mesma grandeza fisica, nos calculos conjuntos e indispensavel uma conversao cuidadosa. Confundir coeficientes aproximados com coeficientes definidos exatamente, ignorar a distincao relativa-absoluta, e ler mal os simbolos sao fontes de erro importantes.",
        ],
      },
      {
        title: "Como se mede a pressao?",
        paragraphs: [
          "Para medir a pressao, primeiro e preciso determinar o tipo de pressao exigido: absoluta, relativa ou diferencial. Depois avalia-se a faixa de medicao, o tipo de fluido, a temperatura, a compatibilidade quimica, as vibracoes e o nivel de precisao exigido. Um mesmo sensor pode nao ser adequado para todas as aplicacoes.",
          "Para medicoes de baixa pressao e diferencial, podem ser usados transmissores diferenciais de diafragma; para altas pressoes de processo, elementos de extensometria ou piezorresistivos; e para aplicacoes de vacuo, sensores absolutos especificos. Os manometros de coluna liquida sao muito uteis para ensinar o principio basico; mas na industria moderna sao mais comuns os equipamentos eletronicos.",
          "Para uma medicao precisa, e preciso considerar a localizacao das linhas de impulso, a posicao de montagem do sensor, o ajuste de zero e os efeitos da temperatura. Em linhas de gas e liquido, uma diferenca de densidade ou uma condensacao pode criar uma carga hidrostatica adicional sobre o sensor. Por isso os detalhes de instalacao determinam o resultado tanto quanto a escolha do equipamento.",
        ],
      },
      {
        title: "Sensores de pressao e manometros",
        paragraphs: [
          "Os manometros mecanicos, como os indicadores de tubo de Bourdon, convertem a pressao em um movimento de ponteiro legivel por meio da deformacao de um elemento elastico. Robustos, simples e sem necessidade de energia, sao usados ha muito tempo na industria. No entanto, em aplicacoes que exigem precisao e registro de dados, os sensores eletronicos sao mais flexiveis.",
          "Os sensores de pressao eletronicos podem ser piezorresistivos, capacitivos, de extensometria ou baseados em ressonancia. Esses sensores convertem a variacao de pressao em um sinal eletrico, que e transmitido a sistemas PLC, SCADA ou de aquisicao de dados. Isso permite nao apenas uma leitura instantanea, mas tambem alarmes, controle e analise de tendencias.",
          "Os manometros diferenciais fornecem a diferenca de pressao entre dois pontos, os sensores absolutos a pressao em relacao ao vacuo total, e os aparelhos manometricos a pressao em relacao a atmosfera. Confiar apenas no valor numerico sem verificar o tipo de referencia na ficha tecnica de um equipamento pode levar a erros graves de interpretacao.",
        ],
      },
      {
        title: "Areas de uso da pressao na engenharia",
        paragraphs: [
          "A pressao e uma variavel de projeto fundamental em diversas areas da engenharia: tubulacoes, climatizacao, hidraulica, pneumatica, processos quimicos, usinas de energia, sistemas de distribuicao de agua, automocao e aeronautica. Da espessura da parede de um reservatorio a selecao de valvulas, das condicoes de saida de um compressor ao desempenho de um filtro, muitas decisoes se baseiam em informacoes de pressao.",
          "Na engenharia de processos, os limites de pressao sao monitorados para a operacao segura de reatores, caldeiras, trocadores e separadores. As valvulas de seguranca de pressao, os discos de ruptura e os malhas de controle sao, portanto, equipamentos criticos. A pressao tambem e usada para a medicao indireta de outras variaveis de processo, como vazao e nivel.",
          "Na engenharia mecanica e da construcao, a pressao e combinada com as superficies de contato e as forcas dos fluidos em analises de tensao. Na medicina e em dispositivos biomedicos, destacam-se a pressao arterial, as pressoes de ventilacao e as aplicacoes de vacuo; no meio ambiente e na meteorologia, as medicoes de pressao atmosferica e diferencial.",
        ],
      },
      {
        title: "Temperatura, altitude e incerteza na medicao de pressao",
        paragraphs: [
          "A temperatura pode afetar tanto as propriedades do fluido medido quanto o comportamento do elemento sensor. Especialmente nos gases, como a temperatura modifica a densidade, e preciso reavaliar a relacao pressao-volume-temperatura. Por isso, nas fichas tecnicas dos sensores aparecem parametros como o desvio de zero e o desvio de span dependentes da temperatura.",
          "A pressao atmosferica costuma diminuir com a altitude. Essa situacao modifica a relacao entre a pressao relativa e a absoluta, e tambem pode afetar o comportamento de referencia de alguns equipamentos de campo. Uma mesma condicao de processo pode fornecer resultados de pressao absoluta diferentes em diferentes altitudes.",
          "Toda medicao carrega uma incerteza. O padrao de calibracao, a resolucao, a histerese, o efeito da temperatura, a orientacao de montagem, as vibracoes e a deriva a longo prazo contribuem para a incerteza total. Em aplicacoes criticas, a decisao de projeto deve incorporar nao apenas o valor nominal de pressao, mas tambem a classe do equipamento e a confiabilidade da medicao.",
        ],
      },
      {
        title: "A relacao e a diferenca entre pressao e tensao",
        paragraphs: [
          "A pressao e a tensao compartilham a mesma estrutura dimensional e ambas podem ser expressas em pascals. Essa semelhanca ocorre porque ambas representam um efeito de forca por unidade de superficie. Mas isso nao significa que sejam fisicamente a mesma grandeza.",
          "A pressao e geralmente concebida como uma tensao normal isotropica exercida pelos fluidos; ou seja, em um fluido em repouso, a pressao em um mesmo ponto e identica em todas as direcoes. A tensao na mecanica dos solidos, por outro lado, pode ter componentes normais e de cisalhamento, depender da direcao e ter uma estrutura tensorial.",
          "Ignorar essa distincao pode causar interpretacoes erradas, especialmente em calculos de parede de reservatorio, superficie de junta ou resistencia de materiais. A pressao interna de um fluido cria tensoes circunferenciais e axiais sobre o reservatorio; mas o campo de tensoes no material do reservatorio nao e identico a pressao do fluido em si.",
        ],
      },
      {
        title: "Erros frequentes nos calculos de pressao",
        paragraphs: [
          "O erro mais frequente e confundir a pressao relativa com a absoluta. Especialmente nas leis dos gases, nos calculos de densidade e nas aplicacoes de vacuo, exige-se pressao absoluta, mas as vezes usa-se diretamente o valor relativo lido em um manometro. Isso cria um erro sistematico no resultado.",
          "Outro erro consiste em arredondar os coeficientes de conversao ou usar uma referencia de unidade incorreta. Ao converter entre PSI, bar, atm, mmHg e kPa, e preciso decidir qual nivel de precisao e suficiente para os valores aproximados. Se a calibracao do equipamento exige alta precisao, usar um numero insuficiente de casas decimais pode causar problemas.",
          "Tambem sao frequentes ignorar os efeitos hidrostaticos, desconsiderar a altura de montagem do sensor e nao levar em conta o efeito da temperatura. Especialmente em linhas de impulso cheias de liquido, reservatorios fechados e aplicacoes de pressao diferencial, detalhes de instalacao aparentemente menores podem modificar significativamente o resultado da medicao.",
        ],
      },
    ],
    unitTable: [
      { name: "Pascal", symbol: "Pa", referenceValue: "1 Pa", system: "SI", commonUse: "Calculos cientificos e de engenharia" },
      { name: "Quilopascal", symbol: "kPa", referenceValue: "1000 Pa", system: "SI", commonUse: "Instalacoes, pneus e pressao de processo" },
      { name: "Bar", symbol: "bar", referenceValue: "100.000 Pa", system: "Metrico, fora do SI", commonUse: "Industria, compressores e sistemas de processo" },
      { name: "Milibar", symbol: "mbar", referenceValue: "100 Pa", system: "Metrico, fora do SI", commonUse: "Meteorologia e medicoes atmosfericas" },
      { name: "Atmosfera padrao", symbol: "atm", referenceValue: "101.325 Pa", system: "Fora do SI", commonUse: "Atmosfera e condicoes de referencia" },
      { name: "PSI", symbol: "psi", referenceValue: "≈6894,757293 Pa", system: "Britanico/norte-americano", commonUse: "Pneus, sistemas hidraulicos e pneumaticos" },
      { name: "Atmosfera tecnica", symbol: "at", referenceValue: "98.066,5 Pa", system: "Fora do SI", commonUse: "Aplicacoes tecnicas antigas" },
      { name: "Milimetro de mercurio", symbol: "mmHg", referenceValue: "≈133,322 Pa", system: "Fora do SI", commonUse: "Medicina, vacuo e medicoes de pressao" },
      { name: "Milimetro de coluna de agua", symbol: "mmH₂O", referenceValue: "≈9,80665 Pa", system: "Fora do SI", commonUse: "Medicoes de baixa pressao e ventilacao" },
      { name: "Quilograma-forca por centimetro quadrado", symbol: "kgf/cm²", referenceValue: "98.066,5 Pa", system: "Metrico, fora do SI", commonUse: "Antigos manometros de bombas e caldeiras" },
    ],
  },
  {
    locale: "pt",
    slug: "energia",
    sourceSlug: "enerji",
    category: "enerji",
    title: "Conversao de unidades de energia",
    description:
      "Compare em uma unica categoria as conversoes de energia baseadas em joule, quilowatt-hora, caloria e BTU.",
    introduction: [
      "A energia e a grandeza fisica fundamental que expressa a capacidade de um sistema realizar trabalho. No Sistema Internacional de Unidades, a unidade derivada de energia e o joule, obtido a partir do produto de uma forca e um deslocamento.",
      "No dia a dia, usam-se o quilowatt-hora (kWh) para as contas de energia eletrica, a caloria/quilocaloria em nutricao, o BTU em sistemas de climatizacao, o therm na cobranca de gas natural, e o eletronvolt na fisica de particulas subatomicas.",
    ],
    facts: [
      { label: "Grandeza fisica", value: "Energia (trabalho)" },
      { label: "Simbolo dimensional", value: "[ML²T⁻²]" },
      { label: "Unidade derivada do SI", value: "Joule" },
      { label: "Simbolo da unidade SI", value: "J" },
      { label: "Definicao do joule", value: "1 J = deslocamento de 1 metro sob uma forca de 1 newton (1 N·m)" },
    ],
    sections: [
      {
        title: "O que e a energia?",
        paragraphs: [
          "A energia e a capacidade de um objeto ou sistema realizar trabalho. Pode existir em muitas formas -- energia cinetica (movimento), energia potencial (posicao), energia termica, energia quimica e energia eletrica -- e, segundo o principio de conservacao da energia, pode se transformar de uma forma em outra sem que sua quantidade total seja criada ou desaparecida.",
          "A energia e uma grandeza derivada, obtida pelo produto de uma forca e um deslocamento (trabalho), e sua dimensao SI e denotada ML²T⁻² (massa × comprimento ao quadrado / tempo ao quadrado).",
        ],
      },
      {
        title: "A unidade SI da energia: o joule",
        paragraphs: [
          "O joule e a unidade derivada do SI para energia, simbolizado por J; recebe esse nome em homenagem ao fisico britanico do seculo XIX James Prescott Joule. Um joule equivale a energia necessaria para deslocar um objeto 1 metro sob o efeito de uma forca de 1 newton.",
          "Como o joule ainda e uma unidade muito pequena para expressar muitas quantidades de energia cotidianas, na engenharia e no uso diario preferem-se seus multiplos: o quilojoule (mil joules) e o megajoule (um milhao de joules).",
        ],
      },
      {
        title: "O quilowatt-hora: a unidade das contas de energia eletrica",
        paragraphs: [
          "O quilowatt-hora (kWh) e a quantidade de energia consumida por uma potencia de um quilowatt usada durante uma hora, e constitui a unidade padrao de cobranca de energia eletrica no mundo todo. 1 kWh equivale exatamente a 3.600.000 joules (3,6 megajoules).",
          "Para calcular o consumo de energia de um aparelho eletrico, basta multiplicar sua potencia (em watts) pelo seu tempo de funcionamento (em horas); por exemplo, um aparelho de 2000 watts que funciona 3 horas consome 6 kWh de energia.",
        ],
      },
      {
        title: "A caloria e a quilocaloria: a energia na nutricao",
        paragraphs: [
          "A caloria foi originalmente definida como a quantidade de energia necessaria para elevar em 1 °C a temperatura de um grama de agua, e 1 caloria equivale exatamente a 4,184 joules.",
          "O valor de 'calorias' que aparece nos rotulos dos alimentos e, na verdade, em sentido cientifico, quilocalorias (1000 calorias) -- essa convencao de nomenclatura em nutricao costuma gerar confusao; quando se diz que um alimento tem '200 calorias', na verdade fala-se de 200 quilocalorias (200.000 calorias).",
        ],
      },
      {
        title: "O BTU e o therm: a energia da climatizacao e do gas natural",
        paragraphs: [
          "O BTU (British Thermal Unit) e a quantidade de energia necessaria para elevar em 1 °F a temperatura de uma libra de agua; e uma unidade de origem norte-americana, mas amplamente usada no mundo para expressar a capacidade de sistemas de aquecimento e ar-condicionado. 1 BTU equivale a cerca de 1055,06 joules.",
          "O therm e uma grande unidade de energia usada na cobranca de gas natural e equivale exatamente a 100.000 BTU. Em alguns paises, o consumo de gas natural e cobrado diretamente em therms em vez de metros cubicos.",
        ],
      },
      {
        title: "O eletronvolt: a unidade do mundo subatomico",
        paragraphs: [
          "O eletronvolt (eV) expressa a energia cinetica que um eletron adquire ao atravessar uma diferenca de potencial de um volt; e uma unidade de energia extremamente pequena (1 eV ≈ 1,602176634 × 10⁻¹⁹ joules).",
          "Na fisica de particulas e na fisica atomica, as energias costumam ser expressas em eletronvolts (e seus multiplos keV, MeV, GeV) em vez de joules, porque nessa escala o joule resulta em numeros extremamente pequenos e pouco praticos.",
        ],
      },
      {
        title: "O principio de conservacao da energia",
        paragraphs: [
          "Segundo o principio de conservacao da energia, tambem conhecido como a primeira lei da termodinamica, a energia total de um sistema fechado permanece constante; a energia nao e criada nem destruida, apenas se transforma de uma forma em outra.",
          "Por exemplo, no motor de um carro, a energia quimica (combustivel) se transforma primeiro em energia termica e depois em energia mecanica (movimento); embora nesse processo parte da energia se converta em calor nao aproveitavel por atrito e escape, a quantidade total de energia nao muda.",
        ],
      },
      {
        title: "Por que a conversao entre unidades de energia e importante?",
        paragraphs: [
          "Diferentes setores preferem tradicionalmente unidades de energia diferentes: a engenharia eletrica o quilowatt-hora, a ciencia da nutricao a quilocaloria, o setor de climatizacao o BTU, e o setor de gas natural o therm. Conseguir converter corretamente entre essas diferentes unidades e essencial para comparar a eficiencia energetica e calcular custos.",
          "Por exemplo, para comparar a eficiencia de uma bomba de calor com a de uma caldeira a gas natural, e preciso converter o consumo de energia de ambos os sistemas para uma unidade comum (geralmente kWh ou joules).",
        ],
      },
    ],
    unitTable: [
      { name: "Joule", symbol: "J", referenceValue: "1 J", system: "SI", commonUse: "Calculos cientificos e fisicos de energia" },
      { name: "Quilojoule", symbol: "kJ", referenceValue: "1000 J", system: "SI/metrico", commonUse: "Energia alimentar (em alguns paises)" },
      { name: "Megajoule", symbol: "MJ", referenceValue: "1.000.000 J", system: "SI/metrico", commonUse: "Combustivel e grandes quantidades de energia" },
      { name: "Caloria", symbol: "cal", referenceValue: "4,184 J", system: "Metrico (tradicional)", commonUse: "Nutricao e quimica" },
      { name: "Quilocaloria", symbol: "kcal", referenceValue: "4184 J", system: "Metrico (tradicional)", commonUse: "Rotulos de alimentos ('calorias')" },
      { name: "Watt-hora", symbol: "Wh", referenceValue: "3600 J", system: "Metrico (eletricidade)", commonUse: "Consumo de pequenos aparelhos" },
      { name: "Quilowatt-hora", symbol: "kWh", referenceValue: "3.600.000 J", system: "Metrico (eletricidade)", commonUse: "Cobranca de energia eletrica" },
      { name: "BTU", symbol: "Btu", referenceValue: "≈1055,06 J", system: "Britanico/norte-americano", commonUse: "Capacidade de climatizacao e aquecimento" },
      { name: "Therm", symbol: "th", referenceValue: "≈105.506.000 J", system: "Britanico/norte-americano", commonUse: "Cobranca de gas natural" },
      { name: "Eletronvolt", symbol: "eV", referenceValue: "≈1,602 × 10⁻¹⁹ J", system: "Fisica atomica/de particulas", commonUse: "Medicao de energia atomica e nuclear" },
    ],
  },
  {
    locale: "pt",
    slug: "armazenamento-de-dados",
    sourceSlug: "veri",
    category: "veri",
    title: "Conversao de unidades de armazenamento de dados",
    description:
      "Converta entre bytes, kilobytes, megabytes, gigabytes e terabytes; compare os calculos baseados em 1000 e 1024.",
    introduction: [
      "A unidade de armazenamento de dados (informacao) expressa a quantidade de informacao armazenada ou processada em um sistema de computacao. A unidade mais basica e o bit; oito bits juntos formam um byte.",
      "Ao falar de armazenamento e velocidade de internet, aparecem tanto unidades decimais (base 1000) como kilobyte, megabyte, gigabyte e terabyte, quanto unidades binarias (base 1024) como kibibyte, mebibyte e gibibyte usadas pelos sistemas operacionais -- a diferenca entre esses dois sistemas e a razao principal pela qual um disco comprado parece ter 'menos' espaco.",
    ],
    facts: [
      { label: "Menor unidade", value: "Bit (0 ou 1)" },
      { label: "Unidade basica", value: "Byte = 8 bits" },
      { label: "Sistema decimal (SI)", value: "1 KB = 1000 bytes, 1 MB = 1000 KB" },
      { label: "Sistema binario (IEC)", value: "1 KiB = 1024 bytes, 1 MiB = 1024 KiB" },
      { label: "Diferenca entre 1000 e 1024", value: "≈7,4% de diferenca entre 1 GB (decimal) e 1 GiB (binario)" },
    ],
    sections: [
      {
        title: "O que sao o bit e o byte?",
        paragraphs: [
          "O bit (digito binario) e a menor unidade de informacao que um computador pode processar e so pode assumir dois valores: 0 ou 1. Oito bits juntos formam um byte; um byte pode representar 256 (2⁸) valores distintos -- suficiente, por exemplo, para codificar um caractere de texto.",
          "O bit e geralmente abreviado com um 'b' minusculo e o byte com um 'B' maiusculo; essa distincao pode gerar confusao, especialmente entre as velocidades de internet (Mbps = megabits por segundo) e o tamanho dos arquivos (MB = megabytes) -- uma conexao de internet de 100 Mbps corresponde teoricamente a uma velocidade de download de cerca de 12,5 MB por segundo (100 ÷ 8).",
        ],
      },
      {
        title: "Por que existem dois sistemas de unidades diferentes?",
        paragraphs: [
          "Como os computadores funcionam em sistema binario, o enderecamento de memoria esta naturalmente ligado a potencias de 2 (como 1024, 1.048.576). Por isso o mundo do software historicamente entendeu 'kilobyte' como 1024 bytes.",
          "Os fabricantes de discos preferem, por razoes de marketing e facilidade de calculo, o prefixo decimal do SI (base 1000) -- um disco anunciado como '1 TB' por um fabricante contem na verdade exatamente 1.000.000.000.000 bytes, mas como o sistema operacional calcula em base 1024, ele exibe na tela um numero menor, como '931 GB'.",
        ],
      },
      {
        title: "O padrao IEC: KiB, MiB, GiB",
        paragraphs: [
          "Para resolver essa confusao, em 1998 a Comissao Eletrotecnica Internacional (IEC) padronizou nomes distintos (kibibyte, mebibyte, gibibyte, tebibyte) e simbolos (KiB, MiB, GiB, TiB) para as unidades em base binaria.",
          "Segundo esse padrao, os prefixos tradicionais como KB/MB/GB deveriam ser usados apenas em sentido decimal (base 1000), e para os valores em base 1024 seriam preferidos prefixos 'binarios' como KiB/MiB/GiB. No entanto, no uso cotidiano e em muitos programas essa distincao ainda nao e aplicada de forma coerente.",
        ],
      },
      {
        title: "Por que a diferenca entre 1000 e 1024 cresce?",
        paragraphs: [
          "Enquanto no nivel de kilobyte (1000 versus 1024) a diferenca e de apenas 2,4%, essa diferenca aumenta a cada unidade superior: no nivel de megabyte e de ≈4,9%, no nivel de gigabyte de ≈7,4%, e no nivel de terabyte chega a ≈10%.",
          "Por isso, em grandes capacidades de armazenamento (como um disco de 1 TB), a diferenca entre o calculo decimal e o binario se torna grande o suficiente para dar ao usuario a impressao visivel de ter 'menos espaco' (uma diferenca de cerca de 90 GB).",
        ],
      },
      {
        title: "Unidades de armazenamento baseadas em bit: kilobit, megabit, gigabit",
        paragraphs: [
          "Os provedores de internet costumam expressar a velocidade de conexao em unidades baseadas em bit (kilobits por segundo, megabits por segundo, gigabits por segundo); e uma tradicao historica da engenharia de redes.",
          "Como os usuarios costumam esperar a velocidade de download de um arquivo em bytes (MB por segundo), nao saber que uma conexao de '100 Mbps' tem uma velocidade de download real de cerca de 12,5 MB por segundo pode dar a falsa impressao de que a conexao e 'lenta'.",
        ],
      },
      {
        title: "Os tamanhos de dados no dia a dia",
        paragraphs: [
          "Um documento de texto (uma pagina) costuma ocupar alguns kilobytes, uma foto comprimida (JPEG) alguns megabytes, e um arquivo de musica comprimido (MP3) em media de 3 a 5 megabytes.",
          "Um filme em definicao padrao (HD) pode ocupar entre 1 e 4 gigabytes, e um filme em resolucao 4K entre 15 e 25 gigabytes aproximadamente; essas diferencas variam conforme a resolucao e o metodo de compressao.",
        ],
      },
      {
        title: "A historia da unidade de armazenamento de dados",
        paragraphs: [
          "O primeiro disco rigido apresentado pela IBM em 1956 (o RAMAC 305) tinha uma capacidade de cerca de 3,75 megabytes e ocupava o tamanho de uma sala inteira. Hoje, um cartao microSD pode conter milhoes de vezes essa capacidade no tamanho da palma da mao.",
          "Esse enorme aumento de capacidade esta intimamente relacionado nao apenas aos avancos da tecnologia de armazenamento (como a passagem dos discos magneticos para a memoria flash), mas tambem a constante reducao do custo por unidade.",
        ],
      },
    ],
    unitTable: [
      { name: "Bit", symbol: "bit", referenceValue: "0,125 byte", system: "Binario", commonUse: "Velocidade de rede (bps, Mbps)" },
      { name: "Byte", symbol: "B", referenceValue: "1 byte (8 bits)", system: "Unidade basica", commonUse: "Unidade basica do tamanho de arquivos" },
      { name: "Kilobyte", symbol: "KB", referenceValue: "1000 bytes", system: "Decimal (SI)", commonUse: "Documentos de texto" },
      { name: "Kibibyte", symbol: "KiB", referenceValue: "1024 bytes", system: "Binario (IEC)", commonUse: "Exibicao de memoria do sistema operacional" },
      { name: "Megabyte", symbol: "MB", referenceValue: "1.000.000 bytes", system: "Decimal (SI)", commonUse: "Arquivos de fotos e musica" },
      { name: "Mebibyte", symbol: "MiB", referenceValue: "1.048.576 bytes", system: "Binario (IEC)", commonUse: "Capacidade de memoria RAM" },
      { name: "Gigabyte", symbol: "GB", referenceValue: "1.000.000.000 bytes", system: "Decimal (SI)", commonUse: "Capacidade de disco (rotulo do fabricante)" },
      { name: "Gibibyte", symbol: "GiB", referenceValue: "1.073.741.824 bytes", system: "Binario (IEC)", commonUse: "Exibicao de disco do sistema operacional" },
      { name: "Terabyte", symbol: "TB", referenceValue: "1.000.000.000.000 bytes", system: "Decimal (SI)", commonUse: "Armazenamento de grande volume" },
      { name: "Petabyte", symbol: "PB", referenceValue: "1.000.000.000.000.000 bytes", system: "Decimal (SI)", commonUse: "Centros de dados e armazenamento em nuvem" },
    ],
  },
  {
    locale: "pt",
    slug: "eletricidade",
    sourceSlug: "elektrik",
    category: "elektrik",
    title: "Conversao de unidades eletricas",
    description:
      "Converta as grandezas eletricas basicas entre volt, quilovolt, ampere e miliampere; consulte valores de exemplo.",
    introduction: [
      "A eletricidade e uma area ampla composta por grandezas fisicas relacionadas, mas distintas, como a tensao (diferenca de potencial) e a corrente (fluxo de carga). Esta categoria reune as duas grandezas basicas mais frequentes no trabalho eletrico cotidiano: o volt (tensao) e o ampere (corrente).",
      "Tensao e corrente nao sao a mesma grandeza fisica e nao podem ser convertidas diretamente uma na outra; sua relacao e estabelecida pela lei de Ohm (V = I × R), em funcao da resistencia do circuito. As conversoes desta pagina tratam cada grandeza separadamente (volt-quilovolt, ampere-miliampere, etc.).",
    ],
    facts: [
      { label: "Nome da unidade de tensao", value: "Volt (em homenagem a Alessandro Volta)" },
      { label: "Nome da unidade de corrente", value: "Ampere (em homenagem a Andre-Marie Ampere)" },
      { label: "Unidade basica do SI (corrente)", value: "Ampere (A) -- uma das 7 unidades basicas do SI" },
      { label: "Relacao tensao-corrente-resistencia", value: "Lei de Ohm: V = I × R" },
      { label: "Tensao de rede no Brasil", value: "127 V ou 220 V (monofasica, varia por estado/cidade), 60 Hz" },
    ],
    sections: [
      {
        title: "O que e a tensao (volt)?",
        paragraphs: [
          "A tensao (voltagem) expressa a diferenca de potencial eletrico entre dois pontos de um circuito eletrico e pode ser considerada a 'forca motriz' que faz os eletrons fluirem de um ponto a outro. Sua unidade SI e o volt (V).",
          "A unidade volt recebe esse nome em homenagem ao fisico italiano Alessandro Volta, inventor da pilha eletrica. Valores como '1,5 V' ou '9 V' indicados em uma pilha expressam a diferenca de potencial que essa pilha pode fornecer.",
        ],
      },
      {
        title: "O que e a corrente (ampere)?",
        paragraphs: [
          "A corrente eletrica expressa a quantidade de carga eletrica que passa por um condutor por unidade de tempo, e sua unidade SI e o ampere (A). Um ampere corresponde a passagem de cerca de 6,242 × 10¹⁸ eletrons por um ponto a cada segundo.",
          "A unidade ampere recebe esse nome em homenagem ao fisico frances Andre-Marie Ampere, um dos fundadores do eletromagnetismo. O ampere era, antes da revisao do SI de 2019, uma das unidades basicas do SI; hoje ainda e considerada uma grandeza fundamental, mas agora e definida a partir da constante de carga elementar (e).",
        ],
      },
      {
        title: "Por que tensao e corrente nao podem ser convertidas entre si?",
        paragraphs: [
          "Tensao (V) e corrente (A) sao grandezas fisicas diferentes -- uma expressa uma diferenca de potencial, a outra a velocidade de um fluxo de carga. Por isso a pergunta 'quantos amperes sao X volts' nao tem resposta por si so sem conhecer a resistencia (ou a potencia) do circuito.",
          "A relacao entre as duas e estabelecida pela lei de Ohm: V = I × R (Tensao = Corrente × Resistencia). Por exemplo, uma tensao de 12 volts que atravessa uma resistencia de 4 ohms produz uma corrente de 3 amperes; mas esses mesmos 12 volts aplicados a uma resistencia diferente produzem um valor de corrente totalmente diferente.",
        ],
      },
      {
        title: "A relacao entre potencia, tensao e corrente",
        paragraphs: [
          "A potencia eletrica (watt) e igual ao produto da tensao pela corrente: P = V × I. Essa formula mostra que um aparelho de mesma potencia consumira menos corrente com alta tensao e mais corrente com baixa tensao.",
          "Essa relacao explica por que as redes de distribuicao eletrica funcionam em alta tensao: transportar a mesma potencia com uma corrente menor reduz consideravelmente as perdas de energia devidas a resistencia das linhas de transmissao (aquecimento por efeito Joule).",
        ],
      },
      {
        title: "A tensao de rede no Brasil e no mundo",
        paragraphs: [
          "No Brasil, a tensao de rede residencial nao e unica: varia entre 127 V e 220 V (monofasica) conforme o estado e ate mesmo a cidade -- a maior parte do Sudeste, Norte e parte do Centro-Oeste usa 127 V, enquanto o Sul, o Distrito Federal, Goias e a maior parte do Nordeste usam 220 V. Em todo o pais, a frequencia e de 60 Hz.",
          "Essa variacao dentro do proprio Brasil e a razao pela qual muitos aparelhos eletronicos vendidos no pais sao 'bivolt' (funcionam tanto em 127 V quanto em 220 V automaticamente). Ja em outros paises, a tensao costuma ser unica: Estados Unidos e Canada usam 120 V, enquanto a maioria dos paises europeus usa 230 V -- por isso aparelhos trazidos do exterior nem sempre podem ser usados diretamente sem um conversor de tensao.",
        ],
      },
      {
        title: "Corrente continua (CC) e corrente alternada (CA)",
        paragraphs: [
          "Na corrente continua (CC), os eletrons fluem de forma constante em uma unica direcao -- pilhas e paineis solares produzem CC. Na corrente alternada (CA), a direcao da corrente se inverte com uma frequencia determinada a cada segundo (60 Hz no Brasil, ou seja, 60 vezes por segundo) -- a eletricidade da rede e CA.",
          "A razao principal pela qual a CA e preferida na distribuicao em rede e que ela permite elevar ou reduzir facilmente a tensao por meio de transformadores; isso possibilita transportar eletricidade a longas distancias com baixas perdas.",
        ],
      },
      {
        title: "O efeito da corrente eletrica no corpo humano",
        paragraphs: [
          "A intensidade da corrente que atravessa o corpo humano determina o efeito percebido: cerca de 1 miliampere mal e percebido, entre 10 e 20 miliamperes pode provocar contracao muscular (incapacidade de soltar), e mais de 100 miliamperes pode causar arritmia cardiaca (fibrilacao) e morte.",
          "Por isso, na seguranca eletrica, nao importa apenas a tensao, mas tambem a intensidade de corrente que pode se formar no circuito -- mesmo em um ambiente de baixa tensao mas de baixa resistencia (por exemplo, umido), pode se formar uma corrente perigosa.",
        ],
      },
    ],
    unitTable: [
      { name: "Milivolt", symbol: "mV", referenceValue: "0,001 V", system: "SI/metrico", commonUse: "Sensores e sinais bioeletricos" },
      { name: "Volt", symbol: "V", referenceValue: "1 V", system: "SI", commonUse: "Pilhas, tensao de rede e de circuito" },
      { name: "Quilovolt", symbol: "kV", referenceValue: "1000 V", system: "SI/metrico", commonUse: "Linhas de transmissao de alta tensao" },
      { name: "Miliampere", symbol: "mA", referenceValue: "0,001 A", system: "SI/metrico", commonUse: "Correntes de circuitos eletronicos" },
      { name: "Ampere", symbol: "A", referenceValue: "1 A", system: "SI", commonUse: "Instalacoes domesticas e corrente de aparelhos" },
      { name: "Quiloampere", symbol: "kA", referenceValue: "1000 A", system: "SI/metrico", commonUse: "Correntes de curto-circuito e industriais" },
    ],
  },
  {
    locale: "pt",
    slug: "quilate-de-ouro",
    sourceSlug: "altin-ayar",
    category: "altin_ayar",
    title: "Conversao de quilates de ouro",
    description:
      "Converta entre ouro de 24, 22, 18 e 14 quilates conforme a quantidade de ouro puro; conheca a pureza e os usos de cada quilate.",
    introduction: [
      "Assim como a prata, o ouro quase nunca e usado puro na fabricacao de joias, pois e um metal muito macio e se arranha facilmente -- por isso e ligado a outros metais como prata ou cobre. O quilate e a medida que indica a proporcao de ouro puro nessa liga.",
      "A escala funciona sobre uma base de 24: 24 quilates significa ouro totalmente puro (100%), 18 quilates significa que 18/24 da liga (cerca de 75%) e ouro puro. A conversao aqui nao consiste em 'expressar a mesma grandeza fisica em uma unidade diferente', mas em 'encontrar o equivalente em gramas da mesma liga com um grau de pureza diferente'.",
    ],
    facts: [
      { label: "Sistema de medida", value: "Padrao de pureza da joalheria (quilate)" },
      { label: "Referencia basica", value: "24 quilates = 100% de ouro puro" },
      { label: "Quilate mais comum na Turquia", value: "22 quilates (pulseira, joalheria tradicional)" },
      { label: "Uso cotidiano internacional", value: "18 quilates (anel, colar)" },
      { label: "Logica de calculo", value: "Gramas × (quilate de origem / 24) ÷ (quilate de destino / 24)" },
    ],
    sections: [
      {
        title: "O que exatamente o quilate mede?",
        paragraphs: [
          "O quilate indica que parte do peso de uma peca de ouro e realmente ouro. 24 quilates e ouro puro; 18 e 14 quilates sao formas de ouro misturadas com prata ou cobre, respectivamente, e portanto mais duras e menos puras.",
          "Por isso pode-se dizer que uma pulseira de 22 quilates tem um teor de ouro puro ligeiramente 'inferior' ao de 24 quilates, mas e mais resistente -- por isso os joalheiros costumam preferir 22 quilates para pulseiras e 18 quilates para aneis e colares.",
        ],
      },
      {
        title: "Como se calcula o teor de ouro puro?",
        paragraphs: [
          "Para descobrir a quantidade de ouro puro contida em uma pulseira de 10 gramas de 22 quilates: 10 × (22 / 24) = 9,17 gramas de ouro puro (equivalente a 24 quilates). Os 0,83 grama restantes sao outros metais adicionados para dar resistencia.",
          "Inversamente, se um joalheiro fundisse esses 9,17 gramas de ouro puro para refaze-los em 18 quilates: 9,17 ÷ (18 / 24) = 12,22 gramas de liga total seriam obtidos -- porque, sendo menor a proporcao de ouro puro em 18 quilates, a mesma quantidade de ouro puro se distribui em um peso total maior.",
        ],
      },
      {
        title: "Para que serve cada quilate?",
        paragraphs: [
          "Devido a sua maciez, o ouro de 24 quilates praticamente nao e usado na joalheria cotidiana; e preferido para lingotes e produtos de investimento. O de 22 quilates e o padrao de pulseiras e joalheria tradicional na Turquia e no Oriente Medio.",
          "O de 18 quilates, por sua alta resistencia, e comum no mundo todo para joias de uso diario como aneis e colares com diamantes. O de 14 quilates, mais economico e ainda mais resistente, e frequente especialmente nos mercados dos Estados Unidos e da Europa.",
        ],
      },
    ],
    unitTable: [
      { name: "Ouro de 24 quilates", symbol: "24K", referenceValue: "100% de ouro puro", system: "Padrao de joalheria", commonUse: "Lingotes, ouro de investimento" },
      { name: "Ouro de 22 quilates", symbol: "22K", referenceValue: "91,6% de ouro puro (22/24)", system: "Padrao de joalheria", commonUse: "Pulseira, joalheria tradicional" },
      { name: "Ouro de 18 quilates", symbol: "18K", referenceValue: "75% de ouro puro (18/24)", system: "Padrao de joalheria", commonUse: "Anel, colar, joalheria do dia a dia" },
      { name: "Ouro de 14 quilates", symbol: "14K", referenceValue: "58,3% de ouro puro (14/24)", system: "Padrao de joalheria", commonUse: "Joalheria economica, mercado EUA/Europa" },
    ],
  },
  {
    locale: "pt",
    slug: "teor-de-prata",
    sourceSlug: "gumus-ayar",
    category: "gumus_ayar",
    title: "Conversao de teor de prata",
    description:
      "Converta em gramas de prata pura os teores 999, 925 (esterlina), 900 e 800; conheca o sistema de milesimos e seus usos na joalheria.",
    introduction: [
      "Assim como o ouro, a prata quase nunca e usada pura para fabricar joias ou objetos, pois e um metal macio que e ligado a outros metais como o cobre. O milesimo e a medida que indica a proporcao de prata pura nessa liga.",
      "Diferentemente do quilate do ouro, expresso sobre uma base de 24, a pureza da prata e expressa sobre uma base de 1000 (milesimo): 999 corresponde a uma prata quase pura, enquanto 925 e o teor mais difundido do mundo, conhecido como 'prata esterlina'.",
    ],
    facts: [
      { label: "Sistema de medida", value: "Sistema de milesimos" },
      { label: "Referencia principal", value: "999 = 99,9% de prata pura" },
      { label: "Teor de joalheria mais difundido", value: "925 (prata esterlina)" },
      { label: "Prata de investimento/lingote", value: "Teor 999 (prata fina)" },
      { label: "Regra de calculo", value: "Gramas × (milesimo de origem / 1000) ÷ (milesimo de destino / 1000)" },
    ],
    sections: [
      {
        title: "O que realmente mede o teor de prata (milesimo)?",
        paragraphs: [
          "Diferentemente do ouro, a pureza da prata nao e expressa sobre 24 unidades, mas em milesimos (base 1000). Um teor de 999 significa 999 partes por mil (ou seja, 99,9%) de prata pura na liga; o milesimo restante costuma corresponder a pequenos vestigios de outros elementos.",
          "O teor 925 (prata esterlina) significa que a liga contem 92,5% de prata pura, sendo o restante (7,5%) geralmente cobre. Essa pequena quantidade de cobre confere solidez a prata pura, que por natureza e muito macia e facil de deformar.",
        ],
      },
      {
        title: "Por que a prata esterlina (925) e o padrao mundial?",
        paragraphs: [
          "A historia do padrao de prata esterlina (925) remonta a Inglaterra do seculo XII e, com o tempo, se tornou o padrao mais amplamente aceito do mundo para joalheria, talheres e objetos de prata.",
          "A prata pura (999) e macia demais para objetos de uso cotidiano e se arranha facilmente; adicionar 7,5% de cobre da a prata a dureza suficiente, preservando em grande parte seu brilho e cor caracteristicos.",
        ],
      },
      {
        title: "Diferencas entre os teores 999, 900 e 800",
        paragraphs: [
          "O teor 999 (prata fina/pura) e preferido para lingotes e produtos de investimento porque o grau de pureza e o criterio mais importante para os investidores; mas sua maciez faz com que raramente seja usado na joalheria cotidiana.",
          "O teor 900 (prata de moeda) foi historicamente usado nas moedas de prata de muitos paises. O teor 800, comum especialmente na Europa (Alemanha, Austria), e um padrao de joalheria menos puro que a prata esterlina, mas ainda resistente.",
        ],
      },
      {
        title: "Como se calcula a quantidade de prata pura?",
        paragraphs: [
          "Para determinar a quantidade de prata pura de um anel de prata de 10 gramas com teor 925: 10 × (925 / 1000) = 9,25 gramas de prata pura. Os 0,75 grama restantes sao cobre ou outros metais adicionados para dar solidez.",
          "Aplica-se a mesma logica para converter entre diferentes teores: por exemplo, se e conhecida a quantidade de prata pura de uma liga de teor 925, seu equivalente em teor 999 e obtido dividindo essa quantidade por 999/1000.",
        ],
      },
      {
        title: "A relacao entre o escurecimento da prata e sua pureza",
        paragraphs: [
          "O escurecimento (oxidacao) de uma joia de prata com o tempo nao se deve a prata em si, mas a reacao do cobre da liga com os compostos de enxofre do ar. Por isso, uma prata de maior pureza (como a de teor 999) tende a escurecer menos.",
          "Alguns fabricantes desenvolveram ligas de prata esterlina 'resistentes ao escurecimento' para melhorar essa propriedade, usando elementos diferentes, como o germanio, em vez de cobre.",
        ],
      },
    ],
    unitTable: [
      { name: "Prata 999", symbol: "999", referenceValue: "99,9% de prata pura", system: "Padrao de joalheria", commonUse: "Lingotes, prata de investimento" },
      { name: "Prata 925", symbol: "925", referenceValue: "92,5% de prata pura (esterlina)", system: "Padrao de joalheria", commonUse: "Joalheria e talheres (padrao mundial)" },
      { name: "Prata 900", symbol: "900", referenceValue: "90% de prata pura", system: "Padrao de joalheria", commonUse: "Moedas de prata historicas" },
      { name: "Prata 800", symbol: "800", referenceValue: "80% de prata pura", system: "Padrao de joalheria (Europa)", commonUse: "Padrao de joalheria europeu" },
    ],
  },
];

export function findPortugueseCategoryPage(slug: string) {
  return portugueseCategoryPages.find((page) => page.slug === slug);
}

export function findPortugueseCategoryPageByTurkishSlug(sourceSlug: string) {
  return portugueseCategoryPages.find((page) => page.sourceSlug === sourceSlug);
}
