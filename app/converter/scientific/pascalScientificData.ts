import type { UnitScientificData } from "../unitScientificData";

export const pascalScientificData: UnitScientificData = {
  slug: "pascal",

  properties: [
    {
      label: "Fiziksel büyüklük",
      value: "Basınç ve mekanik gerilme",
    },
    {
      label: "Boyut sembolü",
      value: "[M L⁻¹ T⁻²]",
      note: "Kütle, uzunluk ve zamanın SI taban boyutları cinsinden gösterimi",
    },
    {
      label: "SI durumu",
      value: "Türetilmiş birim (özel adı olan)",
    },
    {
      label: "Birim adı",
      value: "pascal",
    },
    {
      label: "Birim sembolü",
      value: "Pa",
    },
    {
      label: "SI taban birimleri cinsinden",
      value: "kg·m⁻¹·s⁻²",
    },
    {
      label: "Temel bağıntı",
      value: "1 Pa = 1 N/m²",
    },
    {
      label: "SI'ya kabul yılı",
      value: "1971 (14. CGPM)",
    },
    {
      label: "Adını aldığı bilim insanı",
      value: "Blaise Pascal (1623-1662)",
    },
  ],

  equations: [
    {
      title: "Basıncın temel tanımı",
      equation: "P = F / A",
      explanation:
        "Basınç, bir yüzeye dik doğrultuda etkiyen kuvvetin (F) bu kuvvetin yayıldığı alana (A) bölünmesiyle hesaplanır. Aynı kuvvet daha küçük bir alana uygulandığında basınç artar.",
    },
    {
      title: "SI taban birimleri cinsinden pascal",
      equation: "1 Pa = 1 N/m² = 1 kg·m⁻¹·s⁻²",
      explanation:
        "Newton kendisi kg·m·s⁻² birimine karşılık geldiği için pascal, kütle, uzunluk ve zamanın SI taban birimleri cinsinden kg·m⁻¹·s⁻² olarak ifade edilebilir.",
    },
    {
      title: "Hidrostatik basınç",
      equation: "ΔP = ρ·g·h",
      explanation:
        "Durgun bir akışkan içinde derinlik arttıkça basınç artar. Buradaki ρ akışkan yoğunluğunu, g yerçekimi ivmesini ve h düşey derinliği ifade eder. Bu ilişki Pascal'ın hidrostatik çalışmalarıyla doğrudan bağlantılıdır.",
    },
    {
      title: "Pascal ilkesi",
      equation: "F₁ / A₁ = F₂ / A₂",
      explanation:
        "Kapalı bir kap içindeki durgun akışkana uygulanan basınç her noktaya eşit iletilir. Bu ilişki, küçük bir pistonla büyük bir pistonda daha yüksek kuvvet elde etmeyi sağlayan hidrolik preslerin temelini oluşturur.",
    },
    {
      title: "Standart atmosfer tanımı",
      equation: "1 atm = 101 325 Pa",
      explanation:
        "Standart atmosfer, 1954 yılında 10. CGPM tarafından tam olarak 101 325 Pa olarak tanımlanmıştır. Bu değer ölçüme dayalı değil, uluslararası anlaşmayla sabitlenmiş kesin bir değerdir.",
    },
  ],

  scientificSections: [
    {
      title: "Pascal neden bir SI türetilmiş birimidir?",
      paragraphs: [
        "SI sistemi yedi temel birim üzerine kuruludur; basınç bunlardan biri değildir. Pascal, kuvvetin birimi olan newton ile alanın birimi olan metrekarenin oranından türetilir ve bu nedenle 'türetilmiş birim' olarak sınıflandırılır.",

        "Türetilmiş birimlerin bir kısmına, kullanım kolaylığı için özel bir ad verilir. Newton, joule, watt ve pascal bu tür birimlerdendir. Özel ad verilmemiş olsaydı basınç her zaman 'newton bölü metrekare' biçiminde, daha uzun bir ifadeyle yazılmak zorunda kalırdı.",

        "Pascalın türetilmiş bir birim olması, tanımının keyfi olduğu anlamına gelmez. Newton ve metrekare SI taban birimleri (kilogram, metre, saniye) üzerinden kesin biçimde tanımlıdır; dolayısıyla pascal da nihayetinde bu taban birimlere dayanır.",
      ],
    },
    {
      title: "Pascal ilkesi ve hidrolik sistemler",
      paragraphs: [
        "Pascal ilkesi, kapalı bir kap içindeki durgun bir akışkana uygulanan basınç değişiminin akışkanın her noktasına ve kabın çeperlerine eşit şiddette iletildiğini belirtir. Bu, akışkanın sıkıştırılamaz kabul edildiği durumlarda geçerlidir.",

        "Bir hidrolik preste küçük kesitli bir pistona uygulanan kuvvet, akışkan aracılığıyla daha geniş kesitli bir pistona iletilir. Basınç her iki pistonda eşit olduğundan, geniş pistondaki kuvvet küçük pistondakinden daha büyük olur; bu oran piston alanlarının oranına eşittir.",

        "Bu ilke yalnızca hidrolik preslerde değil, fren sistemlerinde, hidrolik krikolarda ve pek çok endüstriyel aktüatörde de kullanılır. Kazanç kuvvet yönünde elde edilirken, küçük pistonun kat ettiği mesafe büyük pistona göre daha fazladır; enerji korunumu bu şekilde sağlanır.",
      ],
    },
    {
      title: "Basınç ile mekanik gerilme arasındaki ilişki",
      paragraphs: [
        "Basınç ve mekanik gerilme aynı boyut yapısına ([M L⁻¹ T⁻²]) sahiptir ve her ikisi de pascal cinsinden ifade edilir. Bu benzerlik, her iki büyüklüğün de birim alana düşen kuvveti temsil etmesinden kaynaklanır.",

        "Akışkan basıncı genellikle izotropiktir; yani durgun bir akışkanda aynı noktadaki basınç her yönde aynı büyüklüktedir. Katı bir malzemedeki gerilme ise yön bağımlıdır ve normal bileşenlerin yanı sıra kayma bileşenleri de içerebilir.",

        "Malzeme biliminde elastisite modülü (Young modülü) ve akma dayanımı gibi büyüklükler pascal cinsinden, genellikle megapascal veya gigapascal ölçeğinde ifade edilir. Örneğin yapı çeliğinin elastisite modülü yaklaşık 200 GPa mertebesindedir.",
      ],
    },
    {
      title: "Meteorolojide hektopascal kullanımı",
      paragraphs: [
        "Meteorolojide atmosfer basıncı geleneksel olarak hektopascal (hPa) cinsinden raporlanır. 1 hPa tam olarak 100 Pa'a eşittir ve sayısal olarak eski milibar (mbar) birimiyle birebir aynı değeri verir.",

        "Hektopascalın tercih edilme nedeni, tarihsel milibar geleneğiyle sayısal uyumluluğunu korurken SI sistemine uygun bir birim olmasıdır. Hava durumu haritalarında görülen 1013 hPa gibi değerler, standart atmosfere yakın deniz seviyesi basıncını ifade eder.",

        "Basınç merkezleri, cephe sistemleri ve fırtına şiddeti gibi meteorolojik değerlendirmeler büyük ölçüde hPa cinsinden ifade edilen basınç haritalarına dayanır. Alçak basınç merkezleri genellikle 1000 hPa'nın altında, yüksek basınç merkezleri ise 1020 hPa'nın üzerinde değerler gösterir.",
      ],
    },
  ],

  prefixes: [
    {
      name: "nanopaskal",
      symbol: "nPa",
      power: "10⁻⁹ Pa",
      metreValue: "0,000000001 Pa",
      commonUse: "Çok düşük vakum ve hassas laboratuvar ölçümleri",
    },
    {
      name: "mikropaskal",
      symbol: "µPa",
      power: "10⁻⁶ Pa",
      metreValue: "0,000001 Pa",
      commonUse: "Akustik basınç ve sualtı ses ölçümleri",
    },
    {
      name: "milipaskal",
      symbol: "mPa",
      power: "10⁻³ Pa",
      metreValue: "0,001 Pa",
      commonUse: "Viskozite birimleriyle birlikte kullanım (mPa·s)",
    },
    {
      name: "pascal",
      symbol: "Pa",
      power: "10⁰ Pa",
      metreValue: "1 Pa",
      commonUse: "Temel SI basınç birimi",
    },
    {
      name: "hektopaskal",
      symbol: "hPa",
      power: "10² Pa",
      metreValue: "100 Pa",
      commonUse: "Meteoroloji, atmosfer basıncı raporlama",
    },
    {
      name: "kilopaskal",
      symbol: "kPa",
      power: "10³ Pa",
      metreValue: "1000 Pa",
      commonUse: "Tesisat, lastik basıncı, proses sistemleri",
    },
    {
      name: "megapaskal",
      symbol: "MPa",
      power: "10⁶ Pa",
      metreValue: "1 000 000 Pa",
      commonUse: "Hidrolik sistemler ve malzeme gerilmesi",
    },
    {
      name: "gigapaskal",
      symbol: "GPa",
      power: "10⁹ Pa",
      metreValue: "1 000 000 000 Pa",
      commonUse: "Elastisite modülü ve yüksek mukavemetli malzemeler",
    },
  ],

  exactConversions: [
    {
      unit: "Bar",
      symbol: "bar",
      metreValue: "100 000 Pa",
      status: "Kesin",
      note: "Tanım gereği tam olarak 100 000 Pa'a eşittir.",
    },
    {
      unit: "Standart atmosfer",
      symbol: "atm",
      metreValue: "101 325 Pa",
      status: "Kesin",
      note: "10. CGPM (1954) tarafından tam değer olarak tanımlanmıştır.",
    },
    {
      unit: "Teknik atmosfer / kilogram-kuvvet santimetrekare",
      symbol: "at, kgf/cm²",
      metreValue: "98 066,5 Pa",
      status: "Kesin",
      note: "Standart yerçekimi ivmesi g₀ = 9,80665 m/s² üzerinden tanımlanan kilogram-kuvvete dayanır.",
    },
    {
      unit: "Milimetre cıva",
      symbol: "mmHg",
      metreValue: "133,322387415 Pa",
      status: "Kesin",
      note: "Konvansiyonel cıva yoğunluğu ve standart yerçekimi üzerinden tanımlanan kesin bir değerdir.",
    },
    {
      unit: "PSI (pound-force per square inch)",
      symbol: "psi",
      metreValue: "6894,757293168 Pa",
      status: "Kesin",
      note: "Pound-force ve inçin kesin tanımlı değerlerinden türetilir.",
    },
    {
      unit: "Milimetre su sütunu",
      symbol: "mmH₂O",
      metreValue: "9,80665 Pa",
      status: "Yaklaşık",
      note: "Konvansiyonel bir referans yoğunluk ve standart yerçekimi kullanılarak tanımlanır; gerçek su yoğunluğu sıcaklığa bağlı olarak değişir.",
    },
  ],

  measurementMethods: [
    {
      title: "Bourdon tüpü",
      description:
        "Basınç altında şekli değişen kıvrık bir metal tüpün hareketini ibreye aktararak basıncı mekanik olarak gösterir.",
      typicalUse: "Endüstriyel manometreler ve saha göstergeleri",
    },
    {
      title: "Diyaframlı basınç sensörü",
      description:
        "İnce bir diyaframın basınç farkı altında esnemesini elektriksel veya mekanik bir sinyale dönüştürür.",
      typicalUse: "Diferansiyel basınç ölçümü ve proses kontrolü",
    },
    {
      title: "Piezorezistif sensör",
      description:
        "Basınç altında elastik bir elemanın elektriksel direncindeki değişimi ölçerek basıncı elektrik sinyaline çevirir.",
      typicalUse: "Otomotiv, endüstriyel otomasyon ve taşınabilir cihazlar",
    },
    {
      title: "Kapasitif basınç sensörü",
      description:
        "Basınç altında değişen bir kapasitörün elektriksel kapasitesini ölçerek yüksek hassasiyetli basınç okuması sağlar.",
      typicalUse: "Hassas proses ölçümü ve laboratuvar cihazları",
    },
    {
      title: "Sıvı kolonlu manometre",
      description:
        "Bir sıvı sütununun (cıva veya su) yüksekliğindeki değişimi basınca dönüştüren temel, aletsiz ölçüm yöntemidir.",
      typicalUse: "Eğitim, laboratuvar referansı ve düşük basınç ölçümü",
    },
    {
      title: "Piezoelektrik sensör",
      description:
        "Bazı kristallerin basınç altında elektrik yükü üretmesi ilkesine dayanır; hızlı basınç değişimlerini yüksek frekansla algılayabilir.",
      typicalUse: "Dinamik basınç ölçümü, yanma odaları ve darbe testleri",
    },
  ],
};
