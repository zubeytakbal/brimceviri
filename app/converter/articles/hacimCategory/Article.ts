import type { CategoryArticle } from "../../categoryArticles";

export const hacimCategoryArticle: CategoryArticle = {
  slug: "hacim",

  introduction: [
    "Hacim, üç boyutlu bir cismin veya bir kabın kapladığı ya da alabildiği uzayın büyüklüğünü ifade eden türetilmiş bir fiziksel büyüklüktür. Bir uzunluk biriminin üç boyutta (uzunluk × genişlik × yükseklik) çarpımından elde edildiği için hacmin boyutu L³ (uzunluk küp) şeklindedir.",

    "Uluslararası Birimler Sistemi'nde hacmin türetilmiş birimi metreküptür (m³); günlük hayatta ise litre ve mililitre çok daha yaygın kullanılır. Mutfakta yemek kaşığı, çay kaşığı ve su bardağı gibi geleneksel ölçüler, Amerikan/İngiliz sisteminde ise galon, quart, pint ve sıvı ons yaygındır.",
  ],

  facts: [
    {
      label: "Fiziksel büyüklük",
      value: "Hacim",
    },
    {
      label: "Boyut sembolü",
      value: "[L³]",
    },
    {
      label: "SI türetilmiş birimi",
      value: "Metreküp",
    },
    {
      label: "SI birim sembolü",
      value: "m³",
    },
    {
      label: "Günlük kullanımda en yaygın birim",
      value: "Litre (L)",
    },
  ],

  sections: [
    {
      title: "Hacim nedir?",
      paragraphs: [
        "Hacim, bir cismin kapladığı veya bir kabın alabileceği üç boyutlu uzayın büyüklüğüdür. Katı bir cismin hacmi onun fiziksel büyüklüğünü, bir kabın hacmi ise içine alabileceği sıvı veya gaz miktarını ifade eder.",
        "Hacim türetilmiş bir büyüklüktür; bir uzunluk biriminin üç boyutta (en, boy, yükseklik) çarpımından elde edilir. Bu yüzden SI boyutu L³ olarak gösterilir.",
      ],
    },
    {
      title: "Hacmin SI birimi: metreküp",
      paragraphs: [
        "Uluslararası Birimler Sistemi'nde hacmin türetilmiş birimi metreküptür (m³) ve her kenarı tam olarak 1 metre olan bir küpün iç hacmini ifade eder.",
        "Metreküp büyük hacimler için (su depoları, beton dökümü, konteyner hacmi gibi) kullanılırken, günlük hayatta çok daha küçük olan litre birimi tercih edilir. 1 metreküp tam olarak 1000 litreye eşittir.",
      ],
    },
    {
      title: "Litre ve metreküp ilişkisi",
      paragraphs: [
        "Litre, SI ile birlikte kullanımı kabul edilen ancak resmî bir SI birimi olmayan pratik bir hacim birimidir. Bir litre, kenarı 10 santimetre olan bir küpün hacmine (1000 santimetreküp) eşittir.",
        "Litrenin alt katları olan desilitre, santilitre ve mililitre; gıda, ilaç ve laboratuvar ölçümlerinde yaygın olarak kullanılır. Bir mililitre tam olarak bir santimetreküpe eşittir (1 mL = 1 cm³).",
      ],
    },
    {
      title: "Hacim birimleri neden kübik oranla dönüşür?",
      paragraphs: [
        "Uzunluk birimleri doğrusal oranla, alan birimleri karesel oranla dönüşürken, hacim birimleri kübik (küp) oranla dönüşür. Örneğin 1 metre 100 santimetreye eşittir, ama 1 metreküp 100 santimetreküpe değil, 100³ yani 1.000.000 santimetreküpe eşittir.",
        "Bu kübik ilişki, hacmin üç boyutta aynı anda değişmesinden kaynaklanır ve hacim dönüşümlerinde en sık karşılaşılan kavram yanılgısıdır -- özellikle metrik olmayan (galon, fitküp gibi) birimlere geçerken dikkatli hesaplama gerektirir.",
      ],
    },
    {
      title: "Mutfak ölçü birimleri",
      paragraphs: [
        "Yemek tariflerinde kullanılan yemek kaşığı, çay kaşığı ve su bardağı gibi ölçüler standartlaştırılmış hacim birimleridir; bu sayede farklı mutfaklarda hazırlanan tarifler tutarlı sonuç verir. Türkiye'de yaygın kabul gören karşılıklar: 1 yemek kaşığı ≈ 15 mL, 1 çay kaşığı ≈ 5 mL, 1 su bardağı ≈ 200 mL.",
        "Bu ölçüler kesin bilimsel standartlar değil, mutfak pratiğinde yaygın kabul gören yaklaşık değerlerdir; hassas ölçüm gerektiren tariflerde (özellikle pasta/hamur işlerinde) dijital mutfak tartısı kullanmak daha güvenilirdir.",
      ],
    },
    {
      title: "ABD ve İngiliz sıvı ölçü birimleri",
      paragraphs: [
        "ABD ve İngiltere sistemlerinde galon, quart, pint ve sıvı ons gibi birimler kullanılır; ancak bu iki sistemin birim büyüklükleri birbirinden farklıdır. Bir ABD galonu 3,78541 litreye eşitken, bir İngiliz (imperial) galonu 4,54609 litreye eşittir -- yani yaklaşık %20 daha büyüktür.",
        "Bu fark, iki ülkenin tarihsel olarak farklı referans galonlarını (ABD'de şarap galonu, İngiltere'de imperial galon) standart kabul etmesinden kaynaklanır. Bir tarif veya ürün etiketindeki 'galon' veya 'ons' değerinin hangi sisteme ait olduğu her zaman kontrol edilmelidir.",
      ],
    },
    {
      title: "Tarımsal ve tarihi hacim birimleri",
      paragraphs: [
        "Bushel ve peck, tarihsel olarak tahıl, meyve ve sebze gibi kuru ürünlerin ölçümünde kullanılan hacim birimleridir; günümüzde hâlâ bazı tarım pazarlarında (özellikle ABD'de) kullanılmaya devam eder.",
        "Osmanlı döneminde kile ve şinik, tahıl ölçümünde kullanılan geleneksel hacim birimleriydi; 1 kile 20 şiniğe eşitti. Bu birimler bölgeden bölgeye küçük farklılıklar gösterse de, günümüzde tarihi metin ve kayıtların yorumlanmasında referans olarak kullanılır.",
      ],
    },
    {
      title: "Hacim nasıl hesaplanır?",
      paragraphs: [
        "Dikdörtgenler prizması (kutu) için Hacim = Uzunluk × Genişlik × Yükseklik formülü kullanılır. Silindir için Hacim = π × Yarıçap² × Yükseklik, küre için ise Hacim = (4/3) × π × Yarıçap³ formülü geçerlidir.",
        "Düzensiz şekilli katı cisimlerin hacmi genellikle taşırma yöntemiyle (Arşimet prensibi) -- cismi su dolu bir kaba batırıp taşan suyun hacmini ölçerek -- bulunabilir.",
      ],
    },
    {
      title: "Petrol ve endüstriyel hacim ölçümü",
      paragraphs: [
        "Petrol endüstrisinde hacim genellikle varil (barrel, bbl) cinsinden ifade edilir; 1 varil tam olarak 158,987 litreye (42 ABD galonu) eşittir. Bu birim, 19. yüzyılda petrolün ahşap şarap fıçılarında taşınmasından kalma bir gelenektir.",
        "Endüstriyel proseslerde ise büyük hacimler genellikle metreküp, küçük laboratuvar ölçümleri ise mililitre cinsinden ifade edilir; doğru birim seçimi ölçülen hacmin büyüklüğüne göre yapılır.",
      ],
    },
  ],

  unitTable: [
    {
      name: "Mililitre",
      symbol: "mL",
      referenceValue: "0,000001 m³",
      system: "SI/metrik",
      commonUse: "İlaç dozları ve küçük ölçümler",
    },
    {
      name: "Çay Kaşığı",
      symbol: "çk",
      referenceValue: "0,000005 m³ (≈5 mL)",
      system: "Mutfak ölçüsü",
      commonUse: "Yemek tarifleri",
    },
    {
      name: "Yemek Kaşığı",
      symbol: "yk",
      referenceValue: "0,000015 m³ (≈15 mL)",
      system: "Mutfak ölçüsü",
      commonUse: "Yemek tarifleri",
    },
    {
      name: "Su Bardağı",
      symbol: "sb",
      referenceValue: "0,0002 m³ (≈200 mL)",
      system: "Türkiye (mutfak)",
      commonUse: "Türk mutfağı tarifleri",
    },
    {
      name: "Litre",
      symbol: "L",
      referenceValue: "0,001 m³",
      system: "Metrik",
      commonUse: "İçecek, yakıt ve günlük hacim ölçümü",
    },
    {
      name: "Sıvı Ons (ABD)",
      symbol: "fl oz",
      referenceValue: "≈0,0000296 m³ (≈29,57 mL)",
      system: "ABD",
      commonUse: "İçecek ve kozmetik ambalajları",
    },
    {
      name: "Pint (ABD)",
      symbol: "pt",
      referenceValue: "≈0,000473 m³ (≈473 mL)",
      system: "ABD",
      commonUse: "Bira ve süt ölçümü",
    },
    {
      name: "Galon (ABD)",
      symbol: "gal",
      referenceValue: "≈0,003785 m³ (≈3,785 L)",
      system: "ABD",
      commonUse: "Yakıt ve büyük hacimli sıvılar",
    },
    {
      name: "İngiliz Galonu",
      symbol: "imp gal",
      referenceValue: "≈0,004546 m³ (≈4,546 L)",
      system: "İngiliz (Imperial)",
      commonUse: "İngiltere'de yakıt ve sıvı ölçümü",
    },
    {
      name: "Fitküp",
      symbol: "ft³",
      referenceValue: "≈0,0283168 m³",
      system: "İngiliz/ABD",
      commonUse: "İnşaat ve HVAC hava debisi",
    },
    {
      name: "Varil (Petrol)",
      symbol: "bbl",
      referenceValue: "≈0,158987 m³ (≈158,987 L)",
      system: "Petrol endüstrisi",
      commonUse: "Ham petrol ölçümü",
    },
    {
      name: "Metreküp",
      symbol: "m³",
      referenceValue: "1 m³",
      system: "SI",
      commonUse: "Su depoları, beton ve büyük hacimler",
    },
  ],
};
