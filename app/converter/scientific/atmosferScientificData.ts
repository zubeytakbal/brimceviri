import type { UnitScientificData } from "../unitScientificData";

export const atmosferScientificData: UnitScientificData = {
  slug: "atmosfer",

  properties: [
    {
      label: "Fiziksel büyüklük",
      value: "Basınç",
    },
    {
      label: "Boyut sembolü",
      value: "[M L⁻¹ T⁻²]",
      note: "Kütle, uzunluk ve zamanın SI taban boyutları cinsinden gösterimi",
    },
    {
      label: "SI durumu",
      value: "SI dışı, SI ile birlikte kullanımına izin verilen birim",
    },
    {
      label: "Birim adı",
      value: "atmosfer (standart atmosfer)",
    },
    {
      label: "Birim sembolü",
      value: "atm",
    },
    {
      label: "SI taban birimleri cinsinden",
      value: "kg·m⁻¹·s⁻²",
    },
    {
      label: "Temel bağıntı",
      value: "1 atm = 101 325 Pa (tanım gereği kesin)",
    },
    {
      label: "Kesin tanım yılı",
      value: "1954 (10. CGPM)",
    },
    {
      label: "Kavramsal kökeni",
      value: "Torricelli'nin cıvalı barometre deneyleri (1643)",
    },
  ],

  equations: [
    {
      title: "Standart atmosfer tanımı",
      equation: "1 atm = 101 325 Pa",
      explanation:
        "Standart atmosfer, 1954 yılında 10. CGPM tarafından tam olarak 101 325 Pa olarak tanımlanmıştır. Bu değer ölçüme dayalı değil, uluslararası anlaşmayla sabitlenmiş kesin bir değerdir.",
    },
    {
      title: "Barometrik yükseklik formülü",
      equation: "P(h) = P₀ · e^(−Mgh / RT)",
      explanation:
        "Atmosfer basıncı yükseklikle yaklaşık üstel biçimde azalır. Buradaki P₀ deniz seviyesi basıncını, M havanın molar kütlesini, g yerçekimi ivmesini, h yüksekliği, R gaz sabitini ve T mutlak sıcaklığı ifade eder.",
    },
    {
      title: "Cıva sütunu basıncı",
      equation: "P = ρ·g·h",
      explanation:
        "Cıvalı bir barometrede basınç, cıvanın yoğunluğu (ρ), yerçekimi ivmesi (g) ve sütun yüksekliği (h) çarpımına eşittir. Standart atmosferin 1954 öncesi tanımı, 0 santigrat derecede 760 mm yüksekliğindeki bir cıva sütununun bu şekilde hesaplanan basıncına dayanıyordu.",
    },
    {
      title: "Mutlak ve gösterge basıncı ilişkisi",
      equation: "P_mutlak = P_gösterge + P_atm",
      explanation:
        "Çoğu basınç göstergesi, çevredeki atmosfer basıncına göre sıfırlanmış gösterge basıncını ölçer. Mutlak basınca ulaşmak için gösterge okumasına o anki atmosfer basıncı eklenir.",
    },
  ],

  scientificSections: [
    {
      title: "Atmosfer neden SI dışı bir birimdir?",
      paragraphs: [
        "SI sistemi basınç için türetilmiş birim olarak pascalı tanımlar; atmosfer bu resmî tanımın parçası değildir. Atmosfer, tarihsel olarak barometrik ölçümlerden türetilen, daha sonra pascal cinsinden kesin bir değerle sabitlenen bağımsız bir referans birimidir.",

        "BIPM (Uluslararası Ağırlıklar ve Ölçüler Bürosu), atmosferi bar ve mmHg gibi 'SI ile birlikte kullanımına izin verilen SI dışı birimler' kategorisinde sınıflandırır. Bu birimler resmî SI birimi olmasa da yaygın kullanımları nedeniyle bilimsel yayınlarda kabul görür.",

        "Atmosferin SI dışı kalmasının nedeni pratik değil, tarihseldir: pascal 1971'de SI'ya kabul edildiğinde atmosfer zaten onlarca yıldır yerleşik bir referans birimiydi ve pascal cinsinden kesin biçimde tanımlanarak kullanımı sürdürülmüştür.",
      ],
    },
    {
      title: "Barometrik formül ve yükseklikle basınç azalması",
      paragraphs: [
        "Atmosfer basıncı, ölçüm noktasının üstünde kalan hava sütununun ağırlığından kaynaklanır. Yükseklik arttıkça üstteki hava miktarı azaldığı için basınç da azalır; bu ilişki sabit bir oranla değil, yaklaşık üstel bir azalma biçiminde gerçekleşir.",

        "Uluslararası Standart Atmosfer (ISA) modeli, deniz seviyesinde 1 atm basınç ve 15 santigrat derece sıcaklık kabul ederek yükseklikle basınç ve sıcaklık değişimini standart bir tablo hâlinde tanımlar. Bu model, gerçek atmosferin ortalama davranışına yakın bir yaklaşım sunar.",

        "Basınç altimetreleri ve hava aracı performans hesaplamaları, ölçülen basıncı ISA modelindeki beklenen değerlerle karşılaştırarak yaklaşık irtifayı belirler. Gerçek atmosfer koşulları standart modelden saptığında, hesaplanan irtifa da gerçek yükseklikten sapabilir.",
      ],
    },
    {
      title: "760 mmHg konvansiyonu ve atmosfer tanımı",
      paragraphs: [
        "1954 öncesinde standart atmosfer, 0 santigrat derecede ve standart yerçekimi ivmesinde (9,80665 m/s²) 760 mm yüksekliğindeki bir cıva sütununun oluşturduğu basınç olarak tanımlanıyordu. Bu tanım, cıvanın konvansiyonel yoğunluk değerine dayanıyordu.",

        "1954 yılında 10. CGPM, standart atmosferi cıva ölçümlerinden bağımsızlaştırarak tam olarak 101 325 Pa olarak yeniden tanımladı. Milimetre cıva (mmHg) birimi ise ayrı biçimde, konvansiyonel cıva yoğunluğu üzerinden tam olarak 133,322387415 Pa olarak sabitlendi.",

        "Bu iki birimin bağımsız olarak sabitlenmesi nedeniyle 760 mmHg ile 1 atm arasındaki ilişki artık matematiksel olarak tam eşit değildir; aradaki fark milyonda birkaç birim mertebesinde son derece küçüktür ve pratik hesaplarda göz ardı edilebilir.",
      ],
    },
    {
      title: "Kimyada standart basınç referansı olarak atmosfer",
      paragraphs: [
        "Standart sıcaklık ve basınç (STP) kavramı, gazların hacim ve yoğunluk gibi özelliklerini karşılaştırılabilir kılmak için tanımlanmış referans koşullardır. Tarihsel olarak STP, 0 santigrat derece ve 1 standart atmosfer basınç olarak kabul edilmiştir.",

        "Bu tanıma göre 1 mol ideal gazın STP koşullarındaki molar hacmi yaklaşık 22,414 litredir. Pek çok ders kitabı ve tablo, bu değeri uzun süre standart referans olarak kullanmıştır.",

        "1982 yılında IUPAC (Uluslararası Temel ve Uygulamalı Kimya Birliği), standart basıncı 1 atmosferden (101 325 Pa) tam olarak 100 000 Pa'a (1 bar) güncellemeyi önerdi. Bu değişiklik sonrasında güncel STP molar hacmi yaklaşık 22,711 litre olarak hesaplanır; ancak eski 1 atm tabanlı değerler hâlâ pek çok kaynakta kullanılmaktadır.",
      ],
    },
  ],

  prefixes: [
    {
      name: "Yüksek vakum ortamı",
      symbol: "≈10⁻⁹ atm",
      power: "10⁻⁹ atm",
      metreValue: "≈10⁻⁴ Pa",
      commonUse: "Parçacık hızlandırıcıları ve ince film kaplama sistemleri",
    },
    {
      name: "Yaklaşık 10 km irtifa (ISA)",
      symbol: "≈0,26 atm",
      power: "10⁻¹ atm",
      metreValue: "≈26 000 Pa",
      commonUse: "Yolcu uçağı seyir irtifası basıncı",
    },
    {
      name: "Deniz seviyesi (standart atmosfer)",
      symbol: "1 atm",
      power: "10⁰ atm",
      metreValue: "101 325 Pa",
      commonUse: "Referans basınç, kalibrasyon ve STP tanımı",
    },
    {
      name: "10 metre deniz suyu derinliği",
      symbol: "≈2 atm (mutlak)",
      power: "2×10⁰ atm",
      metreValue: "≈203 000 Pa",
      commonUse: "Dalış ve sualtı mühendisliği basınç hesapları",
    },
    {
      name: "Mariana Çukuru (yaklaşık 11 km derinlik)",
      symbol: "≈1100 atm",
      power: "10³ atm",
      metreValue: "≈1,1×10⁸ Pa",
      commonUse: "Derin deniz araştırma araçlarının basınç dayanımı",
    },
    {
      name: "Elmas örs hücresi deneyleri",
      symbol: "≈10⁶ atm",
      power: "10⁶ atm",
      metreValue: "≈10¹¹ Pa",
      commonUse: "Yüksek basınç fiziği ve gezegen içi koşul simülasyonları",
    },
  ],

  exactConversions: [
    {
      unit: "Pascal",
      symbol: "Pa",
      metreValue: "101 325 Pa",
      status: "Kesin",
      note: "10. CGPM (1954) tarafından tam değer olarak tanımlanmıştır.",
    },
    {
      unit: "Bar",
      symbol: "bar",
      metreValue: "1,01325 bar",
      status: "Kesin",
      note: "Bar tam olarak 100 000 Pa olduğu için oran kesin biçimde hesaplanabilir.",
    },
    {
      unit: "PSI (pound-force per square inch)",
      symbol: "psi",
      metreValue: "≈14,695948775 psi",
      status: "Kesin",
      note: "PSI'nin pascal cinsinden kesin tanımından türetilen, ondalık gösterimi yuvarlanmış kesin bir orandır.",
    },
    {
      unit: "Teknik atmosfer / kilogram-kuvvet santimetrekare",
      symbol: "at, kgf/cm²",
      metreValue: "≈1,033227 at",
      status: "Kesin",
      note: "İki birim de kesin sabit değerlere dayandığı için oran kesindir; gösterilen ondalık değer yuvarlanmıştır.",
    },
    {
      unit: "Milimetre cıva",
      symbol: "mmHg",
      metreValue: "≈760 mmHg",
      status: "Yaklaşık",
      note: "Atmosfer ve mmHg birbirinden bağımsız kesin değerlerle tanımlandığı için 760 mmHg değeri 1 atm'ye son derece yakın ama matematiksel olarak tam eşit değildir.",
    },
  ],

  measurementMethods: [
    {
      title: "Cıvalı barometre (Torricelli tipi)",
      description:
        "Kapalı bir tüpteki cıva sütununun yüksekliğini, dışarıdaki hava basıncının dengesiyle ölçer.",
      typicalUse: "Tarihsel ve laboratuvar referans ölçümleri",
    },
    {
      title: "Aneroid barometre",
      description:
        "İçi kısmen boşaltılmış esnek bir metal kapsülün basınç değişimiyle büzülüp genişlemesini mekanik olarak gösterir.",
      typicalUse: "Taşınabilir hava durumu istasyonları ve ev tipi barometreler",
    },
    {
      title: "Piezorezistif / kapasitif basınç sensörü",
      description:
        "Basınç altında elastik bir elemanın elektriksel direncindeki veya kapasitesindeki değişimi ölçerek atmosfer basıncını elektronik sinyale çevirir.",
      typicalUse: "Meteoroloji istasyonları, akıllı telefonlar ve otomasyon sistemleri",
    },
    {
      title: "Radyosonde basınç sensörü",
      description:
        "Meteorolojik balonlara bağlı ölçüm cihazları, atmosferin farklı katmanlarındaki basıncı yükseklikle birlikte kaydeder.",
      typicalUse: "Üst atmosfer araştırmaları ve hava tahmin modelleri",
    },
    {
      title: "Basınç altimetresi",
      description:
        "Dışarıdaki hava basıncını Uluslararası Standart Atmosfer modelindeki beklenen değerlerle karşılaştırarak yaklaşık irtifa hesaplar.",
      typicalUse: "Havacılıkta irtifa göstergeleri",
    },
    {
      title: "Sıvı kolonlu manometre",
      description:
        "Bir sıvı sütununun yüksekliğindeki değişimi basınca dönüştüren, atmosfer basıncına göre gösterge veya mutlak değer verebilen temel ölçüm yöntemi.",
      typicalUse: "Eğitim, laboratuvar referansı ve düşük basınç ölçümü",
    },
  ],
};
