import type { UnitScientificData } from "../unitScientificData";

export const kilogramKuvvetSantimetrekareScientificData: UnitScientificData =
  {
    slug: "kilogram-kuvvet-santimetrekare",

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
        value: "SI dışı, yerçekimsel metrik mühendislik birimi",
      },
      {
        label: "Birim adı",
        value: "Kilogram-kuvvet/santimetrekare (teknik atmosfer)",
      },
      {
        label: "Birim sembolü",
        value: "kgf/cm² (teknik atmosfer için: at)",
      },
      {
        label: "SI taban birimleri cinsinden",
        value: "kg·m⁻¹·s⁻²",
      },
      {
        label: "Temel bağıntı",
        value: "1 kgf/cm² = 98 066,5 Pa (tanım gereği kesin)",
      },
      {
        label: "Kesin tanımın dayanağı",
        value: "Standart yerçekimi ivmesi g₀ = 9,80665 m/s² (1901, 3. CGPM)",
      },
    ],

    equations: [
      {
        title: "Temel tanım",
        equation: "P(at) = F(kgf) / A(cm²)",
        explanation:
          "kgf/cm², bir kilogram-kuvvetin (kgf) bir santimetrekarelik alana (cm²) bölünmesiyle hesaplanan basıncı ifade eder.",
      },
      {
        title: "Kilogram-kuvvetin tanımı",
        equation: "1 kgf = 1 kg × g₀ = 9,80665 N",
        explanation:
          "Kilogram-kuvvet, bir kilogramlık kütleye standart yerçekimi ivmesinin (g₀) uyguladığı ağırlık kuvvetidir. g₀ sabit kabul edildiği için kgf de kesin bir değere sahiptir.",
      },
      {
        title: "Pascal cinsinden kgf/cm²",
        equation: "1 kgf/cm² = 98 066,5 Pa",
        explanation:
          "Kilogram-kuvvetin ve santimetrekarenin kesin tanımlarından türetilen bu değer, ölçüme dayalı değil, tam bir sabittir.",
      },
      {
        title: "Bar cinsinden kgf/cm²",
        equation: "1 kgf/cm² = 0,980665 bar",
        explanation:
          "Bar tam olarak 100 000 Pa olduğu için kgf/cm² ile bar arasındaki oran da kesin biçimde hesaplanabilir.",
      },
    ],

    scientificSections: [
      {
        title: "Kilogram-kuvvet ve standart yerçekiminin tanımı",
        paragraphs: [
          "1901 yılında 3. CGPM (Genel Ağırlıklar ve Ölçüler Konferansı), standart yerçekimi ivmesini tam olarak g₀ = 9,80665 m/s² olarak tanımladı. Bu tanım, o dönemde farklı coğrafi konumlarda ölçülen gerçek yerçekimi ivmesi değerlerinin ortalamasına yakın, sabitlenmiş bir referans değeriydi.",

          "Bu sabit sayesinde kilogram-kuvvet (kgf), bir kilogramlık kütlenin standart yerçekimi altındaki ağırlığı olarak kesin biçimde tanımlanabildi: 1 kgf = 9,80665 N. Kilogram-kuvvete dayanan kgf/cm² (teknik atmosfer) birimi de bu tanımdan türetildi.",

          "SI sistemi kuvvet birimi olarak newton'u benimsediğinde, kütleye dayalı kuvvet birimleri (kgf gibi) resmî SI'nın parçası olmaktan çıktı; ancak bu birimler kesin sabit tanımları sayesinde pascal cinsinden hâlâ tam doğrulukla ifade edilebilmektedir.",
        ],
      },
      {
        title: "Teknik atmosfer ile standart atmosfer arasındaki küçük ama önemli fark",
        paragraphs: [
          "Teknik atmosfer (at) 98 066,5 Pa'a, standart atmosfer (atm) ise 101 325 Pa'a eşittir. İki değer arasındaki fark yaklaşık 3258,5 Pa'dır; bu da teknik atmosferin standart atmosferden yaklaşık yüzde 3,3 daha küçük olduğu anlamına gelir.",

          "Bu fark, iki birimin tamamen bağımsız fiziksel kökenlerinden kaynaklanır: standart atmosfer barometrik ölçümlerden ve 1954 CGPM kararından türerken, teknik atmosfer kilogram-kuvvet ve standart yerçekimi tanımından türer.",

          "Mühendislik hesaplamalarında 'atmosfer' teriminin hangi tanıma göre kullanıldığının açıkça belirtilmesi önemlidir; aksi hâlde yüzde birkaçlık bir hesaplama hatası, özellikle güvenlik marjı dar sistemlerde belirgin sonuçlara yol açabilir.",
        ],
      },
    ],

    prefixes: [
      {
        name: "kgf/cm² (temel birim)",
        symbol: "kgf/cm², at",
        power: "10⁰ at",
        metreValue: "98 066,5 Pa",
        commonUse: "Eski pompa, kompresör ve kazan göstergeleri",
      },
      {
        name: "Eski otomotiv lastik basıncı göstergeleri",
        symbol: "≈2-2,5 kgf/cm²",
        power: "~10⁰ at",
        metreValue: "≈196-245 kPa",
        commonUse: "Bazı ülkelerde tarihsel lastik basıncı etiketleri",
      },
      {
        name: "Endüstriyel buhar kazanı basıncı",
        symbol: "≈10-20 kgf/cm²",
        power: "~10¹ at",
        metreValue: "≈1-2 MPa",
        commonUse: "Eski buhar kazanı göstergeleri ve servis kayıtları",
      },
    ],

    exactConversions: [
      {
        unit: "Pascal",
        symbol: "Pa",
        metreValue: "98 066,5 Pa",
        status: "Kesin",
        note: "Standart yerçekimi ivmesinin (g₀ = 9,80665 m/s²) kesin tanımından türetilir.",
      },
      {
        unit: "Bar",
        symbol: "bar",
        metreValue: "0,980665 bar",
        status: "Kesin",
        note: "Bar tam olarak 100 000 Pa olduğu için oran kesin biçimde hesaplanabilir.",
      },
      {
        unit: "Standart atmosfer",
        symbol: "atm",
        metreValue: "≈0,967841 atm",
        status: "Kesin",
        note: "Atmosfer tam olarak 101 325 Pa olduğu için oran kesin biçimde hesaplanabilir; gösterilen ondalık değer yuvarlanmıştır.",
      },
      {
        unit: "PSI (pound-force per square inch)",
        symbol: "psi",
        metreValue: "≈14,2233 psi",
        status: "Kesin",
        note: "PSI'nin pascal cinsinden kesin tanımından türetilen, ondalık gösterimi yuvarlanmış kesin bir orandır.",
      },
    ],

    measurementMethods: [],
  };
