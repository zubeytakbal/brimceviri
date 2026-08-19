import type { UnitArticle } from "../unitArticles";

export const kilogramMetrekupArticle: UnitArticle = {
  slug: "kilogram-metrekup",

  introduction: [
    "Kilogram/metreküp (kg/m³), Uluslararası Birim Sistemi'nde yoğunluğun türetilmiş birimidir ve bir maddenin birim hacmindeki kütlesini ifade eder. Kütle (kg) ve hacim (m³) birimlerinin doğrudan birleşiminden oluştuğu için ayrı bir tanıma değil, iki temel SI biriminin oranına dayanır.",

    "Yoğunluk, bir malzemenin hafif mi ağır mı olduğunu, suda batıp batmayacağını veya bir yapı elemanının taşıyacağı yükü belirlemede kullanılan temel fiziksel büyüklüktür. kg/m³, bilimsel yayınlardan mühendislik hesaplarına kadar bu büyüklüğün standart ifade birimidir.",
  ],

  keyFacts: [
    {
      label: "Sembolü",
      value: "kg/m³",
    },
    {
      label: "Ölçtüğü büyüklük",
      value: "Yoğunluk (kütle/hacim)",
    },
    {
      label: "Birim sistemi",
      value: "Uluslararası Birim Sistemi (SI, türetilmiş birim)",
    },
    {
      label: "Suyun yoğunluğu",
      value: "≈ 1000 kg/m³ (4 °C'de)",
    },
    {
      label: "1 kg/m³",
      value: "0,001 g/cm³",
    },
  ],

  sections: [
    {
      title: "Kilogram/metreküp nedir?",
      paragraphs: [
        "Kilogram/metreküp, bir metreküp hacminde bulunan maddenin kaç kilogram kütleye sahip olduğunu gösterir. Formülü ρ = m/V şeklindedir; burada m kütleyi (kg), V hacmi (m³) ve ρ (ro) yoğunluğu temsil eder.",

        "kg/m³, ayrı bir birim sistemi gerektirmez; doğrudan SI'nin iki temel biriminden (kilogram ve metre) türetilir. Bu yüzden bilimsel makalelerde ve mühendislik standartlarında yoğunluk için varsayılan birim olarak kabul edilir.",

        "Örneğin hava yaklaşık 1,2 kg/m³, su yaklaşık 1000 kg/m³ ve çelik yaklaşık 7850 kg/m³ yoğunluğa sahiptir. Bu büyük sayısal aralık, kg/m³'ün geniş bir yelpazedeki malzemeleri aynı ölçekte karşılaştırmayı mümkün kılar.",
      ],
    },
    {
      title: "Yoğunluk neden önemlidir?",
      paragraphs: [
        "Yoğunluk, bir cismin suda yüzüp yüzmeyeceğini belirleyen temel etkendir: yoğunluğu sudan düşük malzemeler yüzer, yüksek olanlar batar. Bu ilke gemi tasarımından dalış ekipmanlarına kadar birçok mühendislik alanında kullanılır.",

        "İnşaat ve malzeme mühendisliğinde yoğunluk, bir malzemenin taşıyacağı yükü, yapısal elemanların ağırlığını ve temel tasarımını doğrudan etkiler. Beton, çelik ve ahşap gibi malzemelerin yoğunluk farkı, aynı hacimdeki elemanların çok farklı ağırlıklara sahip olmasına yol açar.",

        "Akışkanlar mekaniğinde yoğunluk; basınç, kaldırma kuvveti ve akış davranışını belirleyen temel parametrelerden biridir. Hidrostatik basınç ve Reynolds sayısı gibi hesaplamalar doğrudan akışkanın yoğunluk değerine dayanır.",
      ],
    },
    {
      title: "kg/m³ ve diğer yoğunluk birimleri",
      paragraphs: [
        "1 kg/m³ tam olarak 0,001 g/cm³'e eşittir; bu iki birim arasındaki dönüşüm yalnızca 1000 ile çarpma veya bölme işlemidir. Laboratuvar ortamında küçük numuneler için g/cm³, endüstriyel ve mühendislik hesaplarında ise kg/m³ tercih edilir.",

        "kg/L birimi de yaygın kullanılır ve sayısal olarak g/cm³ ile birebir aynıdır (1 kg/L = 1 g/cm³ = 1000 kg/m³). Petrol, yakıt ve gıda sektöründe yoğunluk genellikle kg/L cinsinden etiketlenir.",

        "İngiliz ve Amerikan ölçü sistemlerinde lb/ft³ ve lb/gal gibi birimler kullanılır. 1 kg/m³ yaklaşık 0,062428 lb/ft³'e eşittir; bu birimler özellikle ABD kaynaklı mühendislik dokümanlarında karşımıza çıkar.",
      ],
    },
    {
      title: "Yaygın malzemelerin yoğunlukları",
      paragraphs: [
        "Referans olarak bazı malzemelerin yaklaşık yoğunlukları: hava 1,2 kg/m³, saf su (4 °C'de) 1000 kg/m³, deniz suyu yaklaşık 1025 kg/m³, alüminyum 2700 kg/m³, çelik 7850 kg/m³ ve kurşun 11340 kg/m³ civarındadır.",

        "Suyun yoğunluğu sıcaklıkla değişir ve 4 °C'de en yüksek değerine (yaklaşık 1000 kg/m³) ulaşır; hem daha soğuk hem daha sıcak suyun yoğunluğu bu değerin biraz altındadır. Bu, buzun su üzerinde yüzmesinin de temel nedenidir.",

        "Malzeme yoğunluğu karşılaştırmaları, doğru malzeme seçimi, taşıma maliyeti hesapları ve yapısal tasarım için mühendislik pratiğinde sık başvurulan bir referans niteliğindedir.",
      ],
    },
  ],

  timeline: [
    {
      year: "M.Ö. 3. yüzyıl",
      title: "Arşimet'in yoğunluk ilkesi",
      description:
        "Arşimet, bir cismin sıvı içindeki kaldırma kuvvetinin yer değiştirdiği sıvının ağırlığına eşit olduğunu keşfederek yoğunluk kavramının bilimsel temelini attı.",
    },
    {
      year: "1795",
      title: "Metrik sistemin kabulü",
      description:
        "Kilogram ve metre birimlerinin standartlaştırılmasıyla, bu iki birimden türetilen kg/m³ kavramsal olarak mümkün hâle geldi.",
    },
    {
      year: "1960",
      title: "SI sisteminin resmîleşmesi",
      description:
        "11. CGPM'de kabul edilen Uluslararası Birim Sistemi, kg/m³'ü yoğunluk için resmî türetilmiş birim olarak tanımladı.",
    },
  ],

  questions: [
    {
      question: "1 kg/m³ kaç g/cm³ eder?",
      answer:
        "1 kg/m³ tam olarak 0,001 g/cm³'e eşittir. kg/m³'ten g/cm³'e çevirmek için değer 1000'e bölünür.",
    },
    {
      question: "Suyun yoğunluğu kaç kg/m³'tür?",
      answer:
        "Saf suyun yoğunluğu 4 °C'de yaklaşık 1000 kg/m³'tür. Sıcaklık değiştikçe bu değer hafifçe azalır.",
    },
    {
      question: "Yoğunluk formülü nedir?",
      answer:
        "Yoğunluk (ρ), kütlenin (m) hacme (V) bölünmesiyle hesaplanır: ρ = m/V. SI biriminde sonuç kg/m³ cinsinden ifade edilir.",
    },
    {
      question: "kg/m³ ile kg/L arasındaki fark nedir?",
      answer:
        "1 kg/L, 1000 kg/m³'e eşittir. kg/L birimi genellikle yakıt ve sıvı ürünlerde, kg/m³ ise bilimsel ve mühendislik hesaplarında tercih edilir.",
    },
  ],
};
