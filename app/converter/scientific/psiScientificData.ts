import type { UnitScientificData } from "../unitScientificData";

export const psiScientificData: UnitScientificData = {
  slug: "psi",

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
      value: "SI dışı, İngiliz/Amerikan mühendislik birimi",
    },
    {
      label: "Birim adı",
      value: "PSI (pound-force per square inch)",
    },
    {
      label: "Birim sembolü",
      value: "psi",
    },
    {
      label: "SI taban birimleri cinsinden",
      value: "kg·m⁻¹·s⁻²",
    },
    {
      label: "Temel bağıntı",
      value: "1 psi = 6894,757293168 Pa (tanım gereği kesin)",
    },
    {
      label: "Kesin tanımın dayanağı",
      value: "1959 Uluslararası Yarda ve Pound Anlaşması",
    },
  ],

  equations: [
    {
      title: "Pascal cinsinden PSI",
      equation: "P(psi) = P(Pa) / 6894,76",
      explanation:
        "Pascal cinsinden verilen bir basınç değeri, 6894,757293168 sabitine bölünerek psi cinsine çevrilir. Bu sabit, pound-kuvvet ve inçin SI birimleri cinsinden kesin tanımlarından türetilmiştir.",
    },
    {
      title: "Temel tanım",
      equation: "P(psi) = F(lbf) / A(in²)",
      explanation:
        "PSI, bir yüzeye dik doğrultuda etkiyen kuvvetin (pound-kuvvet, lbf) bu kuvvetin yayıldığı alana (inçkare, in²) bölünmesiyle hesaplanır.",
    },
    {
      title: "Mutlak ve gösterge basıncı ilişkisi (PSI)",
      equation: "psia = psig + 14,696",
      explanation:
        "Deniz seviyesinde standart atmosfer basıncı yaklaşık 14,696 psi olduğu için mutlak basınç (psia), gösterge basıncına (psig) bu sabit değer eklenerek hesaplanır.",
    },
    {
      title: "Bar cinsinden PSI",
      equation: "P(bar) = P(psi) × 0,0689476",
      explanation:
        "PSI cinsinden bir basınç değeri, yaklaşık 0,0689476 ile çarpılarak bar cinsine çevrilir. Bu katsayı, psi'nin pascal cinsinden kesin değerinin bar'a (100 000 Pa) oranından hesaplanır.",
    },
  ],

  scientificSections: [
    {
      title: "1959 Uluslararası Yarda ve Pound Anlaşması ve PSI'nin kesin tanımı",
      paragraphs: [
        "1959 yılında Amerika Birleşik Devletleri, Birleşik Krallık, Avustralya, Kanada, Yeni Zelanda ve Güney Afrika arasında imzalanan Uluslararası Yarda ve Pound Anlaşması, pound ve inç birimlerini SI birimleri cinsinden tam olarak sabitledi: 1 pound tam olarak 0,45359237 kilograma, 1 inç tam olarak 25,4 milimetreye eşitlendi.",

        "Bu anlaşmadan önce farklı ülkelerde kullanılan pound ve inç tanımları arasında çok küçük ama ölçülebilir farklar bulunuyordu. Anlaşma, bu birimleri uluslararası düzeyde birbiriyle tutarlı hâle getirdi.",

        "Pound-kuvvet ve inçkarenin kesin SI karşılıkları belirlendiği için PSI'nin pascal cinsinden değeri de matematiksel olarak kesin biçimde hesaplanabilir hâle geldi: 1 psi tam olarak 6894,757293168 Pa'a eşittir.",
      ],
    },
    {
      title: "Malzeme mühendisliğinde ksi (kilopsi) kullanımı",
      paragraphs: [
        "Ksi (kilopsi), 1000 psi'ye eşit, resmî olmayan ancak malzeme mühendisliğinde yaygın kullanılan bir katıdır. Çekme dayanımı, akma dayanımı ve elastisite modülü gibi büyüklükler, sayıları daha okunabilir kılmak için genellikle ksi cinsinden ifade edilir.",

        "Örneğin yapısal çeliğin akma dayanımı tipik olarak 36 ila 50 ksi aralığında, elastisite modülü ise yaklaşık 29.000 ksi (bazen 29 Mpsi olarak da yazılır) mertebesindedir. Bu değerler, ABD kaynaklı mühendislik standartlarında ve malzeme veri sayfalarında sıkça karşılaşılan referans noktalarıdır.",

        "Ksi biriminin resmî bir SI ön eki olmamasına rağmen mühendislik pratiğinde bu kadar yaygın kullanılması, PSI'nin Anglo-Amerikan teknik kültüründeki derin köklerinin bir göstergesidir.",
      ],
    },
  ],

  prefixes: [
    {
      name: "PSI (temel birim)",
      symbol: "psi",
      power: "10⁰ psi",
      metreValue: "6894,757293168 Pa",
      commonUse: "Otomobil lastiği basıncı (≈30-35 psi)",
    },
    {
      name: "Ksi (kilopsi, gayriresmî)",
      symbol: "ksi",
      power: "10³ psi",
      metreValue: "≈6,89 MPa",
      commonUse: "Malzeme mühendisliğinde çekme dayanımı ve elastisite modülü",
    },
    {
      name: "Endüstriyel hidrolik sistem basıncı",
      symbol: "≈1500-3000 psi",
      power: "~10³ psi",
      metreValue: "≈10-20 MPa",
      commonUse: "Hidrolik presler ve mobil hidrolik ekipmanlar",
    },
    {
      name: "Yüksek basınçlı su jeti kesme sistemleri",
      symbol: "≈30 000-90 000 psi",
      power: "~10⁴-10⁵ psi",
      metreValue: "≈200-620 MPa",
      commonUse: "Endüstriyel su jeti ile hassas malzeme kesimi",
    },
    {
      name: "Mpsi (megapsi, gayriresmî)",
      symbol: "Mpsi",
      power: "10⁶ psi",
      metreValue: "≈6,89 GPa",
      commonUse: "Bazı malzemelerin elastisite modülünün ifade edilmesi",
    },
  ],

  exactConversions: [
    {
      unit: "Pascal",
      symbol: "Pa",
      metreValue: "6894,757293168 Pa",
      status: "Kesin",
      note: "1959 Uluslararası Yarda ve Pound Anlaşması'ndaki kesin pound ve inç tanımlarından türetilir.",
    },
    {
      unit: "Bar",
      symbol: "bar",
      metreValue: "≈0,0689476 bar",
      status: "Kesin",
      note: "Bar tam olarak 100 000 Pa olduğu için oran kesin biçimde hesaplanabilir; gösterilen ondalık değer yuvarlanmıştır.",
    },
    {
      unit: "Standart atmosfer",
      symbol: "atm",
      metreValue: "≈0,068046 atm",
      status: "Kesin",
      note: "Atmosfer tam olarak 101 325 Pa olduğu için oran kesin biçimde hesaplanabilir; gösterilen ondalık değer yuvarlanmıştır.",
    },
    {
      unit: "Gösterge basıncından mutlak basınca (deniz seviyesinde)",
      symbol: "psig → psia",
      metreValue: "psia = psig + 14,696",
      status: "Kesin",
      note: "Çarpımsal bir dönüşüm değil, toplamsal bir bağıntıdır; eklenen sabit, deniz seviyesindeki standart atmosfer basıncının psi cinsinden karşılığıdır.",
    },
  ],

  measurementMethods: [],
};
