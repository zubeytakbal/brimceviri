import type { UnitArticle } from "../unitArticles";

export const kilogramMetreSaniyeArticle: UnitArticle = {
  slug: "kilogram-metre-saniye",

  introduction: [
    "Kilogram-metre/saniye (kg·m/s), momentumun (devinirlik veya hareket miktarı) Uluslararası Birim Sistemi'ndeki türetilmiş birimidir. Bir cismin kütlesi ile hızının çarpımı olarak tanımlanır: p = m × v.",

    "Momentum, klasik mekaniğin temel korunum yasalarından birinin (momentumun korunumu) merkezinde yer alır ve çarpışma analizlerinden roket itki hesaplarına kadar geniş bir uygulama alanına sahiptir.",
  ],

  keyFacts: [
    {
      label: "Sembolü",
      value: "kg·m/s",
    },
    {
      label: "Ölçtüğü büyüklük",
      value: "Momentum (devinirlik)",
    },
    {
      label: "Birim sistemi",
      value: "Uluslararası Birim Sistemi (SI, türetilmiş birim)",
    },
    {
      label: "1 kg·m/s",
      value: "1 N·s (impuls-momentum eşdeğerliği)",
    },
    {
      label: "Formül",
      value: "p = m × v",
    },
  ],

  sections: [
    {
      title: "Momentum nedir?",
      paragraphs: [
        "Momentum, bir cismin hareketindeki 'miktarı' ölçer ve kütle ile hız vektörünün çarpımıyla hesaplanır. Hem büyüklüğü hem yönü olan vektörel bir büyüklüktür; bu nedenle momentum hesaplarında hızın yönü de dikkate alınmalıdır.",

        "Ağır ve hızlı hareket eden bir cismin momentumu, hafif ve yavaş hareket eden bir cisimden çok daha büyüktür. Örneğin yavaş giden bir kamyon, hızlı giden bir bisikletten çok daha fazla momentuma sahip olabilir.",

        "Kilogram-metre/saniye, momentumu doğrudan SI'nin temel birimlerinden (kilogram, metre, saniye) türetildiği için ayrı bir fiziksel standarda ihtiyaç duymaz.",
      ],
    },
    {
      title: "Momentumun korunumu",
      paragraphs: [
        "Fizikteki en temel korunum yasalarından biri, dışarıdan bir net kuvvet etki etmediği sürece bir sistemin toplam momentumunun sabit kaldığını belirtir. Bu ilke, çarpışma analizlerinin temelini oluşturur.",

        "İki cisim çarpıştığında, çarpışma öncesi toplam momentum ile çarpışma sonrası toplam momentum birbirine eşittir. Bu prensip, araç kazalarının analizinden bilardo toplarının hareketine kadar sayısız alanda kullanılır.",

        "Roket itkisi de momentumun korunumu ilkesine dayanır: roket, yakıtını yüksek hızla arkaya fırlatarak kendisi ters yönde momentum kazanır.",
      ],
    },
    {
      title: "Momentum ve impuls arasındaki ilişki",
      paragraphs: [
        "İmpuls (itme), bir kuvvetin belirli bir süre boyunca uygulanmasıyla oluşan etkidir ve newton-saniye (N·s) ile ifade edilir. İmpuls-momentum teoremi, bir cisme uygulanan impulsun, o cismin momentumundaki değişime eşit olduğunu belirtir.",

        "Boyutsal olarak N·s ve kg·m/s birbirine eşittir (1 N·s = 1 kg·m/s), çünkü newton kendisi kg·m/s² olarak tanımlanır ve saniyeyle çarpıldığında kg·m/s elde edilir. Bu nedenle momentum ve impuls aynı birimle ifade edilebilir.",

        "Bu eşdeğerlik, hava yastığı tasarımı gibi güvenlik mühendisliği uygulamalarında pratik önem taşır: çarpışma süresini uzatmak, aynı momentum değişimi için gereken kuvveti azaltır.",
      ],
    },
  ],

  timeline: [
    {
      year: "1687",
      title: "Newton'ın ikinci yasası",
      description:
        "Isaac Newton, kuvvetin momentumun zamana göre değişim hızına eşit olduğunu tanımlayarak momentum kavramının modern fizikteki temelini attı.",
    },
    {
      year: "19. yüzyıl",
      title: "Momentumun korunumu ilkesinin genelleşmesi",
      description:
        "Klasik mekaniğin gelişimiyle birlikte momentumun korunumu, çarpışma ve etkileşim problemlerinin çözümünde temel bir araç hâline geldi.",
    },
  ],

  questions: [
    {
      question: "Momentum formülü nedir?",
      answer:
        "Momentum (p), kütle (m) ile hızın (v) çarpımıyla hesaplanır: p = m × v. SI biriminde sonuç kilogram-metre/saniye (kg·m/s) cinsinden ifade edilir.",
    },
    {
      question: "1 kg·m/s kaç N·s eder?",
      answer:
        "1 kg·m/s tam olarak 1 N·s'ye eşittir. Bu iki birim boyutsal olarak özdeştir çünkü newton, kg·m/s² olarak tanımlanır ve saniyeyle çarpıldığında kg·m/s elde edilir.",
    },
    {
      question: "Momentum neden vektörel bir büyüklüktür?",
      answer:
        "Momentum hem büyüklüğe hem de yöne sahiptir çünkü hız vektörel bir büyüklüktür. Bu nedenle momentum hesaplarında hareketin yönü mutlaka dikkate alınmalıdır.",
    },
    {
      question: "Momentumun korunumu ne anlama gelir?",
      answer:
        "Dışarıdan net bir kuvvet etki etmediği sürece kapalı bir sistemin toplam momentumu sabit kalır. Bu ilke, çarpışma ve etkileşim problemlerinin çözümünde temel bir araçtır.",
    },
  ],
};
