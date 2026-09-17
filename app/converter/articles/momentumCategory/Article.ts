import type { CategoryArticle } from "../../categoryArticles";

export const momentumCategoryArticle: CategoryArticle = {
  slug: "momentum",

  introduction: [
    "Momentum (devinirlik), hareket hâlindeki bir cismin kütlesi ile hızının çarpımından elde edilen türetilmiş bir fiziksel büyüklüktür. Çarpışma, itki ve hareket analizlerinde temel bir kavramdır.",

    "Uluslararası Birimler Sistemi'nde momentumun türetilmiş birimi kilogram-metre/saniyedir (kg·m/s); bu birim, impuls (itki) biriminin (newton-saniye, N·s) de sayısal ve boyutsal karşılığıdır.",
  ],

  facts: [
    {
      label: "Fiziksel büyüklük",
      value: "Momentum (devinirlik)",
    },
    {
      label: "Boyut sembolü",
      value: "[MLT⁻¹]",
    },
    {
      label: "SI türetilmiş birimi",
      value: "Kilogram-metre/saniye",
    },
    {
      label: "SI birim sembolü",
      value: "kg·m/s",
    },
    {
      label: "Temel formül",
      value: "p = m × v (Kütle × Hız)",
    },
  ],

  sections: [
    {
      title: "Momentum nedir?",
      paragraphs: [
        "Momentum, hareket hâlindeki bir cismin kütlesi ile hızının çarpımıdır ve genellikle p sembolüyle gösterilir: p = m × v. Vektörel bir büyüklüktür; hızın yönünde bir yöne sahiptir.",
        "Momentum, bir cismin 'hareketini durdurmanın ne kadar zor olduğunu' sezgisel olarak ifade eder -- aynı hızda giden bir kamyonu durdurmak, bir bisikleti durdurmaktan çok daha fazla kuvvet ve/veya süre gerektirir, çünkü kamyonun momentumu çok daha büyüktür.",
      ],
    },
    {
      title: "Momentumun SI birimi",
      paragraphs: [
        "Momentumun SI türetilmiş birimi kilogram-metre/saniyedir (kg·m/s); bu, kütle biriminin (kg) hız birimiyle (m/s) çarpımından elde edilir ve SI boyutu MLT⁻¹ olarak gösterilir.",
        "Örneğin 1000 kg kütleli bir araba 20 m/s hızla hareket ediyorsa, momentumu 1000 × 20 = 20.000 kg·m/s'dir.",
      ],
    },
    {
      title: "Momentumun korunumu ilkesi",
      paragraphs: [
        "Kapalı bir sistemde (dışarıdan net bir kuvvet etki etmiyorsa), toplam momentum çarpışma öncesi ve sonrasında sabit kalır. Bu ilke, bilardo toplarının çarpışmasından roket itiş sistemlerine kadar birçok fiziksel olayı açıklar.",
        "Örneğin iki bilardo topu çarpıştığında, çarpışma öncesi toplam momentum ile çarpışma sonrası toplam momentum eşittir -- bir topun kazandığı momentum, diğerinin kaybettiği momentuma eşittir.",
      ],
    },
    {
      title: "İmpuls (itki) ve momentum ilişkisi",
      paragraphs: [
        "İmpuls, bir kuvvetin belirli bir süre boyunca uygulanmasıyla oluşan etkidir ve J = F × t formülüyle hesaplanır. İmpuls-momentum teoremine göre, bir cisme uygulanan impuls, o cismin momentumundaki değişime eşittir: J = Δp.",
        "Bu ilişki nedeniyle impuls birimi (newton-saniye, N·s) ile momentum birimi (kg·m/s) boyutsal olarak birbirine eşittir ve sayısal olarak doğrudan karşılık gelir -- bu, momentum kategorisinde her iki birimin de bir arada bulunmasının nedenidir.",
      ],
    },
    {
      title: "Momentum neden güvenlik mühendisliğinde önemlidir?",
      paragraphs: [
        "Araç çarpışma testlerinde ve güvenlik tasarımında momentum kavramı kritik rol oynar: bir aracın çarpışma anındaki momentumunun ne kadar sürede sıfıra indirileceği (impuls süresi), yolculara aktarılan kuvvetin büyüklüğünü doğrudan etkiler.",
        "Hava yastıkları ve emniyet kemerleri, çarpışma anındaki momentum değişimini daha uzun bir süreye yayarak (aynı impuls için daha düşük tepe kuvveti oluşturarak) yolcuya binen anlık kuvveti azaltmayı hedefler.",
      ],
    },
    {
      title: "Momentum nasıl ölçülür?",
      paragraphs: [
        "Momentum doğrudan bir cihazla ölçülmez; kütle bir teraziyle, hız ise hız ölçüm sistemleriyle (radar, lazer hız ölçer, yüksek hızlı kamera gibi) ayrı ayrı ölçülüp çarpılarak hesaplanır.",
        "Parçacık fiziğinde ise momentum, genellikle manyetik alan içindeki bir parçacığın eğrilik yarıçapından dolaylı olarak hesaplanır -- yüklü bir parçacığın manyetik alanda izlediği yörüngenin eğriliği, o parçacığın momentumuyla doğrudan ilişkilidir.",
      ],
    },
  ],

  unitTable: [
    {
      name: "Kilogram-metre/saniye",
      symbol: "kg·m/s",
      referenceValue: "1 kg·m/s",
      system: "SI",
      commonUse: "Genel momentum hesaplamaları",
    },
    {
      name: "Newton-saniye",
      symbol: "N·s",
      referenceValue: "1 N·s (= 1 kg·m/s)",
      system: "SI",
      commonUse: "İmpuls (itki) hesaplamaları",
    },
    {
      name: "Pound-fit/saniye",
      symbol: "lb·ft/s",
      referenceValue: "≈0,138255 kg·m/s",
      system: "İngiliz/ABD",
      commonUse: "ABD mühendislik hesapları",
    },
  ],
};
