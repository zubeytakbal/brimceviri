import type { CategoryArticle } from "../../categoryArticles";

export const alanCategoryArticle: CategoryArticle = {
  slug: "alan",

  introduction: [
    "Alan, iki boyutlu bir yüzeyin kapladığı büyüklüğü ifade eden türetilmiş bir fiziksel büyüklüktür. Bir uzunluk birimi ile aynı uzunluk biriminin çarpımından elde edildiği için, alanın boyutu her zaman 'uzunluk kare' (L²) şeklindedir.",

    "Uluslararası Birimler Sistemi'nde alanın türetilmiş birimi metrekaredir (m²). Tarım ve arazi ölçümlerinde dönüm, dekar ve hektar; İngiliz/ABD sisteminde fitkare ve akre; Güney Asya'da bigha, katha ve decimal gibi yerel birimler de yaygın olarak kullanılır.",
  ],

  facts: [
    {
      label: "Fiziksel büyüklük",
      value: "Alan",
    },
    {
      label: "Boyut sembolü",
      value: "[L²]",
    },
    {
      label: "SI türetilmiş birimi",
      value: "Metrekare",
    },
    {
      label: "SI birim sembolü",
      value: "m²",
    },
    {
      label: "Temel formül (dikdörtgen)",
      value: "Alan = Uzunluk × Genişlik",
    },
  ],

  sections: [
    {
      title: "Alan nedir?",
      paragraphs: [
        "Alan, bir yüzeyin veya düzlemsel bir bölgenin büyüklüğünü ifade eder. Bir arazi parçasının, bir odanın tabanının veya bir kağıt yaprağının ne kadar yer kapladığı alan cinsinden ölçülür.",
        "Alan türetilmiş bir büyüklüktür; temel bir uzunluk biriminin kendisiyle çarpılmasından elde edilir. Bu yüzden alanın SI boyutu L² (uzunluk kare) olarak gösterilir ve alan her zaman pozitif bir skaler büyüklüktür.",
      ],
    },
    {
      title: "Alanın SI birimi: metrekare",
      paragraphs: [
        "Uluslararası Birimler Sistemi'nde alanın türetilmiş birimi metrekaredir (m²) ve kenar uzunluğu tam olarak 1 metre olan bir karenin kapladığı alanı ifade eder.",
        "Metrekare, uzunluk biriminin (metre) karesi alınarak elde edildiği için ayrı bir temel birim değil, türetilmiş bir birimdir. Diğer tüm metrik alan birimleri (santimetrekare, kilometrekare gibi) metrekareye ondalık kuvvetlerle bağlanır.",
      ],
    },
    {
      title: "Alan birimleri neden karesel oranla dönüşür?",
      paragraphs: [
        "Uzunluk birimleri arasında dönüşüm yaparken kullanılan oran, alan birimleri arasında karesi alınarak kullanılmalıdır. Örneğin 1 kilometre 1000 metreye eşittir, ama 1 kilometrekare 1000 metrekareye değil, 1000² yani 1.000.000 metrekareye eşittir.",
        "Bu, alan biriminde her iki boyutun (uzunluk ve genişlik) da aynı oranda büyüdüğü/küçüldüğü gerçeğinden kaynaklanır. Bu kareli ilişkiyi gözden kaçırmak, alan dönüşümlerinde en sık yapılan hesap hatasıdır -- örneğin '1 km² = 1000 m²' sanmak yaygın bir yanılgıdır.",
      ],
    },
    {
      title: "Metrik alan birimleri",
      paragraphs: [
        "Metrik sistemde küçük alanlar için milimetrekare ve santimetrekare, günlük ölçümler için metrekare, büyük alanlar için ise kilometrekare kullanılır. Bir santimetrekare 0,0001 metrekareye, bir kilometrekare ise 1.000.000 metrekareye eşittir.",
        "Arazi ölçümlerinde ise ar (100 m²) ve onun 100 katı olan hektar (10.000 m²) kullanılır. Hektar, tarımsal arazi büyüklüklerini ifade etmek için dünya genelinde en yaygın kullanılan metrik arazi birimidir.",
      ],
    },
    {
      title: "Türkiye'de dönüm ve dekar",
      paragraphs: [
        "Türkiye'de tarımsal arazi ölçümünde en yaygın kullanılan birimler dönüm ve dekardır; ikisi de günümüzde 1000 metrekareye eşittir ve birbirinin yerine kullanılabilir. Dekar, resmî ölçüler ve ayarlar mevzuatındaki addır; dönüm ise günlük dilde kullanılan geleneksel karşılığıdır.",
        "Osmanlı döneminde dönümün büyüklüğü bölgeden bölgeye 900-1600 m² arasında değişebiliyordu. 1931'deki Ölçüler ve Ayarlar Kanunu ile dönüm, dekarla eşleştirilerek tam olarak 1000 m² olarak standartlaştırıldı.",
      ],
    },
    {
      title: "İngiliz/ABD sisteminde alan birimleri",
      paragraphs: [
        "Fitkare (ft²) ve inçkare (in²) küçük yüzeyler için, akre ise büyük arazi parçaları için İngiliz/ABD ölçü sisteminde kullanılan yaygın alan birimleridir. Bir akre tam olarak 4046,8564224 metrekareye eşittir.",
        "Akrenin tarihsel kökeni, bir çift öküzün bir günde sürebileceği tarla büyüklüğüne dayanır. Bugün hâlâ ABD, İngiltere ve bazı Commonwealth ülkelerinde gayrimenkul ilanlarında yaygın olarak kullanılır.",
      ],
    },
    {
      title: "Güney Asya arazi birimleri",
      paragraphs: [
        "Hindistan, Bangladeş, Pakistan ve Nepal gibi ülkelerde bigha, katha, killa, kanal, marla, guntha, biswa ve decimal gibi yerel arazi birimleri hâlâ yaygın olarak kullanılır. Bu birimlerin büyüklüğü, aynı isimle bile olsa bölgeden bölgeye önemli ölçüde değişebilir.",
        "Örneğin bir bigha, Batı Bengal'de yaklaşık 1338 m² iken başka bir eyalette farklı bir değere karşılık gelebilir. Bu yüzden bu birimlerle yapılan gayrimenkul işlemlerinde, hangi bölgesel standardın kullanıldığının teyit edilmesi önemlidir.",
      ],
    },
    {
      title: "Alan nasıl hesaplanır?",
      paragraphs: [
        "Dikdörtgen bir alan için formül Alan = Uzunluk × Genişlik'tir. Üçgen için Alan = (Taban × Yükseklik) / 2, daire için ise Alan = π × Yarıçap² formülü kullanılır.",
        "Düzensiz şekilli arazilerde alan, şeklin daha küçük dikdörtgen/üçgen parçalara bölünüp her parçanın alanının ayrı ayrı hesaplanıp toplanmasıyla (veya tapu/kadastro ölçümlerinde koordinat bazlı poligon alan formülleriyle) bulunur.",
      ],
    },
    {
      title: "Alan ölçümünde dikkat edilmesi gerekenler",
      paragraphs: [
        "Bir arazi ilanında veya tapu kaydında belirtilen alan değeri, kullanılan birime (m², dönüm, akre, bigha gibi) ve o birimin hangi bölgesel standarda göre tanımlandığına bağlı olarak yorumlanmalıdır.",
        "Özellikle uluslararası gayrimenkul işlemlerinde, birimin isim benzerliğine değil kesin metrekare karşılığına bakmak yanlış anlaşılmaları önler; bu sayfadaki dönüşüm aracı tüm birimleri ortak bir metrekare referansı üzerinden karşılaştırır.",
      ],
    },
  ],

  unitTable: [
    {
      name: "Milimetrekare",
      symbol: "mm²",
      referenceValue: "0,000001 m²",
      system: "SI/metrik",
      commonUse: "Teknik çizim ve küçük yüzeyler",
    },
    {
      name: "Santimetrekare",
      symbol: "cm²",
      referenceValue: "0,0001 m²",
      system: "SI/metrik",
      commonUse: "Küçük nesnelerin yüzey alanı",
    },
    {
      name: "Metrekare",
      symbol: "m²",
      referenceValue: "1 m²",
      system: "SI",
      commonUse: "Konut, ofis ve arsa alanı",
    },
    {
      name: "Ar",
      symbol: "a",
      referenceValue: "100 m²",
      system: "Metrik",
      commonUse: "Küçük arazi parselleri",
    },
    {
      name: "Dönüm / Dekar",
      symbol: "dönüm",
      referenceValue: "1000 m²",
      system: "Türkiye (metrik)",
      commonUse: "Tarımsal arazi ölçümü",
    },
    {
      name: "Hektar",
      symbol: "ha",
      referenceValue: "10.000 m²",
      system: "Metrik",
      commonUse: "Büyük tarım ve orman arazisi",
    },
    {
      name: "Kilometrekare",
      symbol: "km²",
      referenceValue: "1.000.000 m²",
      system: "SI/metrik",
      commonUse: "Şehir, ülke ve coğrafi alanlar",
    },
    {
      name: "Fitkare",
      symbol: "ft²",
      referenceValue: "0,092903 m²",
      system: "İngiliz/ABD",
      commonUse: "Konut alanı (ABD/İngiltere)",
    },
    {
      name: "Yardakare",
      symbol: "yd²",
      referenceValue: "0,83612736 m²",
      system: "İngiliz/ABD",
      commonUse: "Spor sahaları ve tekstil",
    },
    {
      name: "Akre",
      symbol: "ac",
      referenceValue: "4046,8564224 m²",
      system: "İngiliz/ABD",
      commonUse: "Büyük arazi parçaları",
    },
    {
      name: "Bigha",
      symbol: "bigha",
      referenceValue: "≈1337,8 m² (bölgeye göre değişir)",
      system: "Güney Asya",
      commonUse: "Hindistan/Bangladeş tarım arazisi",
    },
    {
      name: "Tsubo",
      symbol: "tsubo",
      referenceValue: "≈3,31 m²",
      system: "Japonya",
      commonUse: "Japon konut ve arsa ölçümü",
    },
  ],
};
