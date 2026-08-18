import type { UnitScientificData } from "../unitScientificData";

export const barScientificData: UnitScientificData = {
  slug: "bar",

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
      value: "Bar",
    },
    {
      label: "Birim sembolü",
      value: "bar",
    },
    {
      label: "SI taban birimleri cinsinden",
      value: "kg·m⁻¹·s⁻²",
    },
    {
      label: "Temel bağıntı",
      value: "1 bar = 100 000 Pa = 10⁵ Pa (tanım gereği kesin)",
    },
    {
      label: "Önerildiği yıl",
      value: "1903 (William Napier Shaw)",
    },
  ],

  equations: [
    {
      title: "Temel tanım",
      equation: "1 bar = 100 000 Pa",
      explanation:
        "Bar, pascalın tam olarak 10⁵ katı olarak tanımlanır. Bu yuvarlak değer, dönüşümü basit bir ondalık kaydırma işlemine indirger.",
    },
    {
      title: "Milibar ilişkisi",
      equation: "1 mbar = 100 Pa = 1 hPa",
      explanation:
        "Milibar, bar'ın binde birine eşittir ve sayısal olarak hektopascal ile birebir aynı değeri verir; bu nedenle meteorolojik verilerde ikisi birbirinin yerine kullanılabilir.",
    },
    {
      title: "Atmosfer cinsinden bar",
      equation: "1 bar ≈ 0,986923 atm",
      explanation:
        "Standart atmosfer tam olarak 101 325 Pa olduğu için bar ile atmosfer arasındaki oran da kesin biçimde hesaplanabilir.",
    },
    {
      title: "PSI cinsinden bar",
      equation: "1 bar ≈ 14,5038 psi",
      explanation:
        "PSI'nin pascal cinsinden kesin tanımından türetilen, ondalık gösterimi yuvarlanmış kesin bir orandır.",
    },
  ],

  scientificSections: [
    {
      title: "Barın kökeni: William Napier Shaw ve meteorolojik basınç birimi",
      paragraphs: [
        "Bar adı, eski Yunanca 'baros' (ağırlık) kelimesinden gelir. Birim, 1903 yılında İngiliz meteorolog William Napier Shaw tarafından atmosfer basıncını daha pratik bir ölçekte ifade etmek amacıyla önerildi.",

        "Napier Shaw aynı zamanda bar'ın binde biri olan milibarı da tanımladı; bu alt birim, standart atmosfere yakın değerleri (yaklaşık 1013 mbar) rahat okunabilir tam sayılarla ifade etmeyi mümkün kıldı.",

        "Milibar, 20. yüzyıl boyunca dünya genelinde hava durumu raporlarının ve basınç haritalarının standart birimi oldu; bu miras, meteorolojinin bar ailesi birimlerine olan bağlılığının temel nedenidir.",
      ],
    },
    {
      title: "Bar neden yuvarlak bir SI katı olduğu hâlde resmî SI birimi değildir?",
      paragraphs: [
        "Bar, tam olarak 10⁵ pascala eşit olduğu için SI'nın ondalık yapısıyla sayısal olarak tam uyumludur. Yine de SI sistemi, basınç için resmî ön ekli birimleri (hektopascal, kilopascal, megapascal) tanımlar ve bar'ı bunların dışında tutar.",

        "Bu ayrımın nedeni tarihseldir: bar, SI'nın 1960'ta resmîleşmesinden çok önce, kendi başına yerleşmiş bağımsız bir meteorolojik ve endüstriyel birimdi. BIPM, bu kökleşmiş kullanımı tanıyarak bar'ı 'SI ile birlikte kullanımına izin verilen SI dışı birimler' listesine dahil etmiştir.",

        "Sonuç olarak bar, SI'nın parçası olmasa da pascal ile arasındaki kesin ve basit oran sayesinde bilimsel ve endüstriyel hesaplamalarda dönüşüm hatası riski taşımadan kullanılabilir.",
      ],
    },
  ],

  prefixes: [
    {
      name: "Milibar (hektopascal ile aynı)",
      symbol: "mbar",
      power: "10⁻³ bar",
      metreValue: "100 Pa",
      commonUse: "Meteoroloji ve hava durumu raporları",
    },
    {
      name: "Bar (temel birim)",
      symbol: "bar",
      power: "10⁰ bar",
      metreValue: "100 000 Pa",
      commonUse: "Genel endüstriyel ve mühendislik referansı",
    },
    {
      name: "Otomobil lastiği basıncı (Avrupa)",
      symbol: "≈2-2,5 bar",
      power: "~10⁰ bar",
      metreValue: "≈200-250 kPa",
      commonUse: "Avrupa'da yaygın lastik basıncı etiketleme geleneği",
    },
    {
      name: "Endüstriyel basınçlı hava sistemleri",
      symbol: "≈6-10 bar",
      power: "~10¹ bar",
      metreValue: "≈600 kPa-1 MPa",
      commonUse: "Kompresörler ve pnömatik sistemler",
    },
    {
      name: "Yüksek basınçlı su jeti kesme sistemleri",
      symbol: "≈2000-6000 bar",
      power: "~10³ bar",
      metreValue: "≈200-600 MPa",
      commonUse: "Endüstriyel su jeti ile hassas malzeme kesimi",
    },
  ],

  exactConversions: [
    {
      unit: "Pascal",
      symbol: "Pa",
      metreValue: "100 000 Pa",
      status: "Kesin",
      note: "Tanım gereği tam olarak 10⁵ Pa'a eşittir.",
    },
    {
      unit: "Standart atmosfer",
      symbol: "atm",
      metreValue: "≈0,986923 atm",
      status: "Kesin",
      note: "Atmosfer tam olarak 101 325 Pa olduğu için oran kesin biçimde hesaplanabilir; gösterilen ondalık değer yuvarlanmıştır.",
    },
    {
      unit: "PSI (pound-force per square inch)",
      symbol: "psi",
      metreValue: "≈14,5038 psi",
      status: "Kesin",
      note: "PSI'nin pascal cinsinden kesin tanımından türetilen, ondalık gösterimi yuvarlanmış kesin bir orandır.",
    },
    {
      unit: "Milimetre cıva",
      symbol: "mmHg",
      metreValue: "≈750,062 mmHg",
      status: "Kesin",
      note: "Konvansiyonel cıva yoğunluğu ve standart yerçekimi üzerinden tanımlanan mmHg değerinden türetilir.",
    },
  ],

  measurementMethods: [],
};
