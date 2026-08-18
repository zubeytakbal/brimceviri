import type { UnitScientificData } from "../unitScientificData";

export const kilopascalScientificData: UnitScientificData = {
  slug: "kilopascal",

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
      value: "SI (pascalın resmî ön ekli katı)",
    },
    {
      label: "Birim adı",
      value: "Kilopascal",
    },
    {
      label: "Birim sembolü",
      value: "kPa",
    },
    {
      label: "SI taban birimleri cinsinden",
      value: "10³ kg·m⁻¹·s⁻²",
    },
    {
      label: "Temel bağıntı",
      value: "1 kPa = 1000 Pa = 10³ Pa (kesin)",
    },
    {
      label: "SI ön ek sisteminin kabulü",
      value: "1960 (11. CGPM)",
    },
  ],

  equations: [
    {
      title: "Temel tanım",
      equation: "1 kPa = 1000 Pa",
      explanation:
        "Kilopascal, 'kilo' SI ön ekinin (10³) doğrudan pascala uygulanmasıyla oluşur; dönüşüm ondalık basamak kaydırmaktan ibarettir.",
    },
    {
      title: "Bar cinsinden kilopascal",
      equation: "1 kPa = 0,01 bar",
      explanation:
        "Bar tam olarak 100 000 Pa olduğu için kilopascal ile bar arasındaki oran da kesin ve basittir.",
    },
    {
      title: "Atmosfer cinsinden kilopascal",
      equation: "1 kPa ≈ 0,00987 atm",
      explanation:
        "Standart atmosfer tam olarak 101 325 Pa olduğu için kilopascal ile atmosfer arasındaki oran kesin biçimde hesaplanabilir.",
    },
    {
      title: "PSI cinsinden kilopascal",
      equation: "1 kPa ≈ 0,145038 psi",
      explanation:
        "PSI'nin pascal cinsinden kesin tanımından türetilen, ondalık gösterimi yuvarlanmış kesin bir orandır.",
    },
  ],

  scientificSections: [
    {
      title: "SI ön ek sistemi ve kilo (10³) çarpanı",
      paragraphs: [
        "1960 yılında 11. Genel Ağırlıklar ve Ölçüler Konferansı (CGPM), kilo dahil standart SI ön eklerini içeren Uluslararası Birim Sistemi'ni resmî olarak kabul etti. Bu ön ek sistemi, herhangi bir SI birimine 10'un tam kuvvetleri hâlinde katlar ve alt katlar oluşturmayı sağlar.",

        "Pascal 1971'de SI'ya kabul edildiğinde, zaten yerleşik olan bu ön ek sistemi doğrudan pascala da uygulanabilir hâle geldi. Kilo ön eki (10³), pascalın günlük mühendislik ölçeğinde çok küçük kalması nedeniyle basınç için özellikle sık kullanılan bir ön ek oldu.",

        "Kilo ön ekinin seçilmesi keyfî değildir: 10³'lük adım, hektopascal (10²) ile megapascal (10⁶) arasında, günlük mühendislik basınçlarının çoğunu tek ve üç basamaklı sayılarla ifade etmeye imkân tanıyan bir ara ölçektir.",
      ],
    },
    {
      title: "Jeoteknik ve yapı mühendisliğinde kilopascal standardı",
      paragraphs: [
        "Jeoteknik mühendislikte zemin taşıma kapasitesi, konsolidasyon basıncı, ön yükleme basıncı ve efektif gerilme gibi büyüklükler neredeyse evrensel olarak kilopascal cinsinden raporlanır. Tipik bir zeminin izin verilen taşıma kapasitesi birkaç yüz kilopascal mertebesindedir.",

        "Yapı mühendisliğinde rüzgâr yükü ve kar yükü gibi yüzeye dağıtılmış yükler kilopascal cinsinden ifade edilir; bu değerler daha sonra yapı elemanlarının kesit hesaplarında kullanılır.",

        "Bu standardizasyon, farklı mühendislik disiplinleri arasında (jeoteknik, yapısal, hidrolik) ortak ve karşılaştırılabilir bir basınç ölçeği sağlar; aynı zamanda saha raporlarının ve tasarım hesaplarının okunabilirliğini artırır.",
      ],
    },
  ],

  prefixes: [
    {
      name: "Hektopascal (meteoroloji)",
      symbol: "hPa",
      power: "10⁻¹ kPa",
      metreValue: "100 Pa",
      commonUse: "Atmosfer basıncı raporlama",
    },
    {
      name: "Kilopascal (temel birim)",
      symbol: "kPa",
      power: "10⁰ kPa",
      metreValue: "1000 Pa",
      commonUse: "Jeoteknik, HVAC ve genel mühendislik basınçları",
    },
    {
      name: "Standart atmosfer (kPa cinsinden)",
      symbol: "≈101,325 kPa",
      power: "~10² kPa",
      metreValue: "101 325 Pa",
      commonUse: "Deniz seviyesi referans basıncı",
    },
    {
      name: "Zemin taşıma kapasitesi",
      symbol: "≈100-400 kPa",
      power: "~10² kPa",
      metreValue: "≈100 000-400 000 Pa",
      commonUse: "Jeoteknik mühendislik ve temel tasarımı",
    },
    {
      name: "Megapascal (malzeme gerilmesi)",
      symbol: "MPa",
      power: "10³ kPa",
      metreValue: "1 000 000 Pa",
      commonUse: "Malzeme dayanımı ve yüksek basınçlı hidrolik sistemler",
    },
  ],

  exactConversions: [
    {
      unit: "Pascal",
      symbol: "Pa",
      metreValue: "1000 Pa",
      status: "Kesin",
      note: "SI ön eki tanımı gereği tam olarak 10³ Pa'a eşittir.",
    },
    {
      unit: "Bar",
      symbol: "bar",
      metreValue: "0,01 bar",
      status: "Kesin",
      note: "Bar tam olarak 100 000 Pa olduğu için oran kesin biçimde hesaplanabilir.",
    },
    {
      unit: "Standart atmosfer",
      symbol: "atm",
      metreValue: "≈0,00987 atm",
      status: "Kesin",
      note: "Atmosfer tam olarak 101 325 Pa olduğu için oran kesin biçimde hesaplanabilir; gösterilen ondalık değer yuvarlanmıştır.",
    },
    {
      unit: "PSI (pound-force per square inch)",
      symbol: "psi",
      metreValue: "≈0,145038 psi",
      status: "Kesin",
      note: "PSI'nin pascal cinsinden kesin tanımından türetilen, ondalık gösterimi yuvarlanmış kesin bir orandır.",
    },
    {
      unit: "Milimetre cıva",
      symbol: "mmHg",
      metreValue: "≈7,50062 mmHg",
      status: "Kesin",
      note: "Konvansiyonel cıva yoğunluğu üzerinden tanımlanan mmHg değerinden türetilir.",
    },
  ],

  measurementMethods: [],
};
