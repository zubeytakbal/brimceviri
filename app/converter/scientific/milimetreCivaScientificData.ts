import type { UnitScientificData } from "../unitScientificData";

export const milimetreCivaScientificData: UnitScientificData = {
  slug: "milimetre-civa",

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
      value: "SI dışı, tarihsel ve tıbbi mühendislik birimi",
    },
    {
      label: "Birim adı",
      value: "Milimetre cıva",
    },
    {
      label: "Birim sembolü",
      value: "mmHg",
    },
    {
      label: "SI taban birimleri cinsinden",
      value: "kg·m⁻¹·s⁻²",
    },
    {
      label: "Temel bağıntı",
      value: "1 mmHg = 133,322387415 Pa (konvansiyonel, kesin değer)",
    },
    {
      label: "Tanımda kullanılan konvansiyonel cıva yoğunluğu",
      value: "13 595,1 kg/m³ (0 °C)",
    },
  ],

  equations: [
    {
      title: "Hidrostatik basınç bağıntısı",
      equation: "P = ρ·g·h",
      explanation:
        "Bir cıva sütununun oluşturduğu basınç, cıvanın yoğunluğu (ρ), yerçekimi ivmesi (g) ve sütun yüksekliği (h) çarpımına eşittir.",
    },
    {
      title: "Konvansiyonel mmHg tanımı",
      equation: "1 mmHg = 13 595,1 kg/m³ × 9,80665 m/s² × 0,001 m",
      explanation:
        "mmHg'nin kesin değeri (133,322387415 Pa), cıvanın konvansiyonel yoğunluğu ve standart yerçekimi ivmesi üzerinden hesaplanır; gerçek bir ölçüme değil, tanımlı sabitlere dayanır.",
    },
    {
      title: "Torr tanımı",
      equation: "1 Torr = 1/760 atm = 133,3223684211 Pa",
      explanation:
        "Torr, standart atmosferin tam 1/760'ı olarak tanımlanır. mmHg'ye son derece yakın ama bağımsız bir tanıma dayandığı için matematiksel olarak tam eşit değildir.",
    },
    {
      title: "Bar cinsinden mmHg",
      equation: "1 mmHg ≈ 0,00133322 bar",
      explanation:
        "Bar tam olarak 100 000 Pa olduğu için mmHg ile bar arasındaki oran da kesin biçimde hesaplanabilir.",
    },
  ],

  scientificSections: [
    {
      title: "mmHg'nin kesin tanımı: konvansiyonel cıva yoğunluğu",
      paragraphs: [
        "mmHg'nin modern kesin değeri, cıvanın konvansiyonel yoğunluğu (13 595,1 kg/m³, 0 santigrat derecede kabul edilen sabit bir referans değer) ile standart yerçekimi ivmesinin (9,80665 m/s²) çarpımından türetilir.",

        "Bu yaklaşım, gerçek cıvanın sıcaklığa bağlı yoğunluk değişiminden bağımsız, sabit ve tekrarlanabilir bir tanım sağlar. Böylece mmHg, farklı laboratuvarlarda farklı sıcaklık koşullarında bile aynı sayısal değere karşılık gelir.",

        "Sonuç olarak 1 mmHg tam olarak 133,322387415 Pa'a eşittir; bu değer ölçüme dayalı değil, uluslararası kabul görmüş sabit bir tanımdır.",
      ],
    },
    {
      title: "mmHg ile Torr arasındaki milyonda birkaçlık fark",
      paragraphs: [
        "Torr birimi, 1950'lerde Evangelista Torricelli'nin onuruna verilmiş ve standart atmosferin tam 1/760'ı olarak tanımlanmıştır: 1 Torr = 101 325 Pa / 760 = 133,3223684211... Pa.",

        "Konvansiyonel mmHg (133,322387415 Pa) ile Torr (133,3223684211 Pa) arasındaki fark yaklaşık 0,000019 Pa'dır; bağıl olarak yaklaşık 0,14 ppm (milyonda 0,14 birim) mertebesindedir.",

        "Bu fark, iki biriminin bağımsız fiziksel kökenlerinden kaynaklanır: mmHg cıva yoğunluğu üzerinden, Torr ise standart atmosferin kesin bölümü olarak tanımlanır. Pratikte hiçbir uygulamada bu fark ölçülebilir bir sonuç doğurmadığı için mmHg ve Torr günlük ve klinik kullanımda birbirinin yerine geçebilir kabul edilir.",
      ],
    },
  ],

  prefixes: [
    {
      name: "Yüksek vakum eşiği",
      symbol: "<10⁻³ Torr",
      power: "<10⁻³ mmHg",
      metreValue: "<0,133 Pa",
      commonUse: "Vakum fiziği ve ince film kaplama sistemleri",
    },
    {
      name: "Normal kan basıncı (sistolik/diyastolik)",
      symbol: "≈120/80 mmHg",
      power: "~10² mmHg",
      metreValue: "≈16,0/10,7 kPa",
      commonUse: "Klinik tansiyon ölçümü referans aralığı",
    },
    {
      name: "Deniz seviyesi atmosfer basıncı",
      symbol: "≈760 mmHg",
      power: "~10³ mmHg",
      metreValue: "≈101 325 Pa",
      commonUse: "Barometrik referans ve standart atmosfer yaklaşık değeri",
    },
  ],

  exactConversions: [
    {
      unit: "Pascal",
      symbol: "Pa",
      metreValue: "133,322387415 Pa",
      status: "Kesin",
      note: "Cıvanın konvansiyonel yoğunluğu ve standart yerçekimi ivmesinden türetilir.",
    },
    {
      unit: "Bar",
      symbol: "bar",
      metreValue: "≈0,00133322 bar",
      status: "Kesin",
      note: "Bar tam olarak 100 000 Pa olduğu için oran kesin biçimde hesaplanabilir; gösterilen ondalık değer yuvarlanmıştır.",
    },
    {
      unit: "Standart atmosfer",
      symbol: "atm",
      metreValue: "≈0,00131579 atm (1/760)",
      status: "Kesin",
      note: "Atmosfer tam olarak 101 325 Pa olduğu için oran kesin biçimde hesaplanabilir; gösterilen ondalık değer yuvarlanmıştır.",
    },
    {
      unit: "Torr",
      symbol: "Torr",
      metreValue: "≈1,0000001424 Torr",
      status: "Yaklaşık",
      note: "mmHg ve Torr bağımsız biçimde tanımlandığı için matematiksel olarak tam eşit değildir; fark yaklaşık 0,14 ppm'dir.",
    },
  ],

  measurementMethods: [],
};
