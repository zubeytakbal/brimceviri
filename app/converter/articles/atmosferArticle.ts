import type { UnitArticle } from "../unitArticles";

export const atmosferArticle: UnitArticle = {
  slug: "atmosfer",

  introduction: [
    "Atmosfer, basıncı ifade etmek için kullanılan ve atm sembolüyle gösterilen bir birimdir. Dünya atmosferinin deniz seviyesindeki ortalama basıncına yakın bir referans değere dayanır ve genellikle 'standart atmosfer' olarak anılır.",

    "Standart atmosfer, tanım gereği tam olarak 101 325 pascala eşittir. SI biriminin kendisi değildir; ancak kimya, meteoroloji, havacılık ve dalış gibi pek çok alanda SI ile birlikte kullanımına izin verilen bir referans birimdir.",
  ],

  keyFacts: [
    {
      label: "Birim adı",
      value: "Atmosfer (standart atmosfer)",
    },
    {
      label: "Sembolü",
      value: "atm",
    },
    {
      label: "Ölçtüğü büyüklük",
      value: "Basınç",
    },
    {
      label: "Birim sistemi",
      value: "SI dışı, SI ile birlikte kullanımına izin verilen birim",
    },
    {
      label: "1 atmosfer",
      value: "101 325 Pa (tanımlı, kesin değer)",
    },
    {
      label: "1 atmosfer",
      value: "1,01325 bar",
    },
    {
      label: "1 atmosfer",
      value: "≈ 14,6959 PSI",
    },
  ],

  sections: [
    {
      title: "Atmosfer nedir?",
      paragraphs: [
        "Atmosfer, Dünya'nın deniz seviyesindeki ortalama hava basıncına yakın bir değeri referans alan basınç birimidir. Standart atmosfer, gerçek ve değişken hava basıncının değil, tanım gereği sabitlenmiş kesin bir referans değerin adıdır.",

        "Bir yerdeki gerçek atmosfer basıncı; yüksekliğe, sıcaklığa ve anlık hava koşullarına bağlı olarak sürekli değişir. Standart atmosfer ise bu değişkenlikten bağımsız, karşılaştırma ve kalibrasyon amacıyla kullanılan sabit bir sayısal değerdir.",

        "Atmosfer birimi çoğunlukla mutlak basıncı ifade etmek için kullanılır; yani bir kabın veya sistemin içindeki basıncı, boşluk (mutlak sıfır basınç) referans alarak belirtir.",
      ],
    },
    {
      title: "Atmosfer birimi neden ortaya çıktı?",
      paragraphs: [
        "17. yüzyılda cıvalı barometrenin icadından sonra bilim insanları, deniz seviyesindeki hava basıncının barometre üzerinde belirli ve tekrarlanabilir bir cıva sütunu yüksekliği oluşturduğunu fark etti. Bu gözlem, basıncı ifade etmek için doğal bir referans noktası sundu.",

        "Kimya ve fizik deneylerinde gazların hacim, sıcaklık ve basınç ilişkilerini karşılaştırabilmek için ortak bir referans basınca ihtiyaç duyuldu. Deniz seviyesindeki tipik hava basıncına yakın bir değer, bu karşılaştırmalar için pratik bir başlangıç noktası oldu.",

        "Zamanla bu referans değer 'bir atmosfer' adıyla anılmaya başladı ve laboratuvar ölçümlerinde, mühendislik hesaplarında ve daha sonra meteorolojide standart bir karşılaştırma birimi hâline geldi.",
      ],
    },
    {
      title: "Torricelli ve cıvalı barometrenin icadı",
      paragraphs: [
        "1643 yılında İtalyan bilim insanı Evangelista Torricelli, bir ucu kapalı cam bir tüpü cıvayla doldurup açık ucunu bir cıva kabına daldırarak ilk cıvalı barometreyi oluşturdu. Tüpteki cıva belirli bir yükseklikte durarak üstünde bir boşluk (Torricelli boşluğu) bıraktı.",

        "Torricelli, tüpteki cıva sütununun yüksekliğinin dışarıdaki havanın ağırlığı tarafından dengelendiğini öne sürdü. Bu fikir, havanın ölçülebilir bir ağırlığı ve dolayısıyla bir basıncı olduğu görüşünün deneysel temelini oluşturdu.",

        "Torricelli'nin deneyi, atmosfer basıncının ilk kez sistematik ve tekrarlanabilir biçimde ölçülmesini sağladı. Bu buluş, sonraki yüzyıllarda basınç biriminin cıva sütunu yüksekliğiyle ilişkilendirilmesinin de temelini oluşturdu.",
      ],
    },
    {
      title: "Standart atmosferin tanımlanma süreci",
      paragraphs: [
        "1954 yılından önce 'bir atmosfer', 0 santigrat derecede ve standart yerçekimi ivmesinde 760 milimetre yüksekliğinde bir cıva sütununun oluşturduğu basınç olarak tanımlanıyordu. Bu tanım, cıvanın konvansiyonel yoğunluğuna ve standart yerçekimine bağlıydı.",

        "1954 yılında Uluslararası Ağırlıklar ve Ölçüler Genel Konferansı'nın (CGPM) 10. toplantısında standart atmosfer, ölçüme dayalı bir tanımdan bağımsızlaştırılarak tam olarak 101 325 pascal olacak biçimde kesin sayısal bir değerle tanımlandı.",

        "Bu değişiklikle standart atmosfer, cıva yoğunluğu gibi fiziksel bir maddenin özelliklerine değil, doğrudan pascal biriminin kesin bir katına dayanan, uluslararası olarak sabitlenmiş bir referans hâline geldi.",
      ],
    },
    {
      title: "Yükseklikle atmosfer basıncının değişimi",
      paragraphs: [
        "Atmosfer basıncı, üstteki hava sütununun ağırlığından kaynaklanır. Yükseklik arttıkça üstte kalan hava miktarı azaldığı için basınç da azalır; bu ilişki doğrusal değil, yaklaşık olarak üstel bir azalma biçimindedir.",

        "1952 yılında Uluslararası Sivil Havacılık Örgütü (ICAO), deniz seviyesinde 1 standart atmosfer basınç ve 15 santigrat derece sıcaklık kabul eden Uluslararası Standart Atmosfer (ISA) modelini yayımladı. Bu model, havacılıkta irtifa ölçümü ve uçak performans hesapları için ortak bir referans sağlar.",

        "Basınç altimetreleri, dışarıdaki hava basıncını ISA modelindeki beklenen değerlerle karşılaştırarak yaklaşık uçuş irtifasını hesaplar. Bu nedenle standart atmosfer, yalnızca laboratuvar ölçümlerinde değil, günlük hava taşımacılığında da doğrudan kullanılan bir referanstır.",
      ],
    },
    {
      title: "Atmosfer biriminin sembolü nasıl yazılır?",
      paragraphs: [
        "Atmosfer biriminin uluslararası sembolü küçük harflerle atm biçiminde yazılır. Sayısal değer ile birim sembolü arasında boşluk bırakılması önerilir: 2 atm doğru kullanıma örnektir.",

        "Sembole çoğul eki getirilmez; iki atmosfer için 2 atm yazılır, 2 atm'ler biçiminde bir kullanım yapılmaz. Atm sembolü, teknik atmosfer birimini gösteren at sembolüyle karıştırılmamalıdır; bu iki birim farklı değerlere karşılık gelir.",

        "Bilimsel metinlerde 'standart atmosfer' ifadesi tam terim olarak, kısaltmalarda ise atm sembolü kullanılır. Basınç değerinin mutlak mı yoksa gösterge basıncı mı olduğu genellikle ayrıca belirtilir.",
      ],
    },
    {
      title: "Atmosfer nerelerde kullanılır?",
      paragraphs: [
        "Kimyada standart sıcaklık ve basınç (STP) koşulları tarihsel olarak 1 atmosfer basınç referans alınarak tanımlanmıştır. Gazların molar hacmi gibi pek çok tablo değeri bu referansa göre hesaplanmıştır.",

        "Dalış ve sualtı mühendisliğinde su derinliğinin oluşturduğu ek basınç genellikle atmosfer cinsinden ifade edilir; yaklaşık her 10 metre deniz suyu derinliği, deniz seviyesindeki hava basıncına yakın bir ek basınç oluşturur.",

        "Vakum teknolojisinde, gaz depolama sistemlerinde ve endüstriyel basınçlı kap tasarımında atmosfer birimi, mutlak basıncı sezgisel biçimde ifade etmek için sıkça tercih edilir. Meteorolojide ise güncel hava basıncı genellikle standart atmosfere yakın hektopascal değerleriyle karşılaştırılır.",
      ],
    },
    {
      title: "Standart atmosfer ile teknik atmosfer farkı",
      paragraphs: [
        "Standart atmosfer (atm) ve teknik atmosfer (at) benzer isimlere sahip olsa da farklı tanımlara dayanan iki ayrı birimdir. Teknik atmosfer, 1 kilogram-kuvvetin 1 santimetrekarelik alana uyguladığı basınç olarak tanımlanır ve tam olarak 98 066,5 pascala eşittir.",

        "Standart atmosfer ise barometrik ölçümlerden türetilen, 101 325 pascala eşit ayrı bir referans değerdir. İki birim arasındaki fark küçük olsa da (yaklaşık yüzde 3,3), hassas mühendislik hesaplarında hangi biriminin kullanıldığının belirtilmesi önemlidir.",

        "Uygulamada 'atmosfer' terimi çoğunlukla standart atmosferi (atm) ifade eder; teknik atmosfer (at) özellikle bazı Avrupa ülkelerinin eski mühendislik geleneğinde ve kgf/cm² birimiyle birlikte anılır.",
      ],
    },
    {
      title: "Atmosfer ve diğer basınç birimleri",
      paragraphs: [
        "1 standart atmosfer tam olarak 101 325 Pa'a ve 1,01325 bar'a eşittir. Bu değerler tanım gereği kesindir; ölçüme dayalı yaklaşık değerler değildir.",

        "1 atmosfer yaklaşık 14,6959 PSI'ya ve yaklaşık 760 milimetre cıvaya (mmHg) karşılık gelir. Milimetre cıvanın konvansiyonel tanımı ile standart atmosferin tanımı birbirinden bağımsız sabitlendiği için 760 mmHg değeri atm'ye son derece yakın ama matematiksel olarak tam eşit değildir.",

        "Dönüşüm yapılırken bir değerin mutlak mı yoksa gösterge basıncı mı olduğuna dikkat edilmelidir. Örneğin bir lastik basıncı göstergesindeki '2 atm' okuması genellikle atmosfere göre gösterge basıncını ifade eder; mutlak basınca çevrilirken standart atmosfer değerinin ayrıca eklenmesi gerekir.",
      ],
    },
  ],

  timeline: [
    {
      year: "1643",
      title: "Cıvalı barometrenin icadı",
      description:
        "Evangelista Torricelli, cıva sütunu yüksekliğiyle hava basıncını gösteren ilk barometreyi oluşturdu.",
    },
    {
      year: "1648",
      title: "Puy-de-Dôme deneyi",
      description:
        "Florin Périer, Blaise Pascal'ın önerisiyle gerçekleştirdiği dağ deneyinde atmosfer basıncının yükseklikle azaldığını gösterdi.",
    },
    {
      year: "1875",
      title: "Metre Konvansiyonu",
      description:
        "Ölçü birimlerinin uluslararası koordinasyonu için CGPM ve BIPM'in kurumsal temelini oluşturan anlaşma imzalandı.",
    },
    {
      year: "1952",
      title: "Uluslararası Standart Atmosfer (ISA)",
      description:
        "ICAO, deniz seviyesinde 1 atm basıncı referans alan Uluslararası Standart Atmosfer modelini yayımladı.",
    },
    {
      year: "1954",
      title: "Standart atmosferin kesin tanımı",
      description:
        "10. CGPM, standart atmosferi tam olarak 101 325 Pa olarak tanımlayarak cıva sütunu ölçümlerinden bağımsız hâle getirdi.",
    },
    {
      year: "1971",
      title: "Pascal biriminin SI'ya kabulü",
      description:
        "14. CGPM, basınç için pascal birimini kabul etti; atmosfer SI dışı ancak SI ile birlikte kullanılan bir birim statüsünde kaldı.",
    },
    {
      year: "1982",
      title: "IUPAC'ın standart basınç referansını değiştirmesi",
      description:
        "IUPAC, standart sıcaklık ve basınç (STP) tanımında referans basıncı 1 atmosferden 100 000 Pa'a (1 bar) güncellemeyi önerdi.",
    },
  ],

  questions: [
    {
      question: "1 atmosfer kaç Pascal'dır?",
      answer:
        "1 standart atmosfer tam olarak 101 325 Pa'a eşittir. Bu değer ölçüme dayalı değil, uluslararası olarak tanımlanmış kesin bir değerdir.",
    },
    {
      question: "1 atmosfer kaç bar eder?",
      answer:
        "1 atmosfer 1,01325 bar'a eşittir. Atmosferi bara çevirmek için değer 1,01325 ile çarpılır.",
    },
    {
      question: "1 atmosfer kaç PSI eder?",
      answer:
        "1 atmosfer yaklaşık 14,6959 PSI'ya (pound-force per square inch) eşittir.",
    },
    {
      question:
        "Standart atmosfer ile teknik atmosfer arasındaki fark nedir?",
      answer:
        "Standart atmosfer (atm) 101 325 Pa'a, teknik atmosfer (at) ise kilogram-kuvvete dayanan tanımıyla 98 066,5 Pa'a eşittir. Benzer isimlere sahip olsalar da farklı referans değerlerine dayanan iki ayrı birimdir.",
    },
    {
      question: "Atmosfer birimi SI birimi midir?",
      answer:
        "Hayır. Atmosfer, Uluslararası Birim Sistemi'nin (SI) resmî bir birimi değildir; ancak bar ve mmHg gibi SI ile birlikte kullanımına izin verilen birimlerden biridir.",
    },
    {
      question:
        "Gerçek atmosfer basıncı her zaman tam olarak 1 atm midir?",
      answer:
        "Hayır. Gerçek hava basıncı yüksekliğe, sıcaklığa ve hava koşullarına göre sürekli değişir. Standart atmosfer, bu değişken basıncın değil, sabitlenmiş bir referans değerin adıdır.",
    },
  ],
};
