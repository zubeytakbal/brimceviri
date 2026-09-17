import type { CategoryArticle } from "../../categoryArticles";

export const torkCategoryArticle: CategoryArticle = {
  slug: "tork",

  introduction: [
    "Tork (moment), bir kuvvetin bir eksen etrafında döndürme etkisini ifade eden türetilmiş bir fiziksel büyüklüktür. Motor performansından cıvata sıkma değerlerine kadar birçok mühendislik ve günlük yaşam uygulamasında karşımıza çıkar.",

    "Uluslararası Birimler Sistemi'nde torkun türetilmiş birimi newton-metredir (N·m); otomotiv sektöründe kilogram-kuvvet-metre (kgf·m), ABD mühendisliğinde ise pound-fit (lb-ft) yaygın olarak kullanılır.",
  ],

  facts: [
    {
      label: "Fiziksel büyüklük",
      value: "Tork (döndürme momenti)",
    },
    {
      label: "Boyut sembolü",
      value: "[ML²T⁻²]",
    },
    {
      label: "SI türetilmiş birimi",
      value: "Newton-metre",
    },
    {
      label: "SI birim sembolü",
      value: "N·m",
    },
    {
      label: "Temel formül",
      value: "Tork (τ) = Kuvvet × Kol Kolu (Mesafe)",
    },
  ],

  sections: [
    {
      title: "Tork nedir?",
      paragraphs: [
        "Tork, bir kuvvetin bir dönme ekseni etrafında oluşturduğu döndürme etkisidir ve τ (tau) sembolüyle gösterilir. Formülü τ = F × r şeklindedir; burada F uygulanan kuvveti, r ise kuvvetin uygulama noktası ile dönme ekseni arasındaki dik mesafeyi (kol kolu) ifade eder.",
        "Aynı büyüklükteki bir kuvvet, dönme eksenine daha uzak bir noktaya uygulandığında daha büyük bir tork oluşturur. Bu ilkeye kaldıraç etkisi denir ve bir somunu gevşetirken uzun bir anahtar kullanmanın neden daha kolay olduğunu açıklar.",
      ],
    },
    {
      title: "Torkun SI birimi: newton-metre",
      paragraphs: [
        "Newton-metre (N·m), torkun SI türetilmiş birimidir; 1 newton'luk bir kuvvetin, dönme ekseninden 1 metre uzaklıkta uygulanmasıyla oluşan torku ifade eder.",
        "Newton-metre, enerji biriminin de (Joule) SI temel karşılığıyla (N·m) aynı boyutsal ifadeye sahiptir; ancak tork ve enerji birbirinden tamamen farklı fiziksel büyüklüklerdir -- bu yüzden tork asla 'Joule' cinsinden ifade edilmez, her zaman N·m olarak yazılır.",
      ],
    },
    {
      title: "Tork neden Joule ile karıştırılmamalı?",
      paragraphs: [
        "Enerji, bir kuvvet ile o kuvvet doğrultusundaki yer değiştirmenin skaler çarpımıdır (bir sayı verir); tork ise bir kuvvet ile kol kolunun vektörel çarpımıdır (yönü olan bir büyüklük verir). İkisi matematiksel olarak farklı işlemlerden (skaler çarpım vs. vektörel çarpım) türetilir.",
        "Bu kavramsal fark nedeniyle, aynı sayısal birime (N·m) sahip olsalar da tork ve enerji birbirinin yerine kullanılamaz -- bir motorun 300 N·m torku, 300 Joule enerji anlamına gelmez.",
      ],
    },
    {
      title: "Motor torku ve otomotiv kullanımı",
      paragraphs: [
        "Bir aracın motor torku, motorun ne kadar 'çekiş gücü' veya ivmelenme kapasitesi sunduğunu gösterir; genellikle düşük devirlerde yüksek tork, hızlı kalkış ve yokuş çıkma performansı için önemlidir.",
        "Tork ile beygirgücü (güç) arasındaki ilişki devir sayısına (RPM) bağlıdır: Güç = Tork × Açısal Hız. Bu yüzden bir motorun hem tork hem de güç eğrisi, farklı devirlerdeki performansını anlamak için birlikte değerlendirilir.",
      ],
    },
    {
      title: "Tork anahtarı ve cıvata sıkma",
      paragraphs: [
        "Tork anahtarları, bir cıvata veya somunu üretici tarafından belirtilen tam tork değerine kadar sıkmak için kullanılır; bu, hem yetersiz sıkmadan kaynaklanan gevşemeyi hem de aşırı sıkmadan kaynaklanan cıvata/diş hasarını önler.",
        "Otomotiv ve makine mühendisliğinde her cıvata bağlantısı için (jant cıvatası, motor kapağı gibi) üretici tarafından belirlenmiş kesin bir tork değeri (genellikle N·m cinsinden) vardır; bu değerin aşılması veya altında kalınması güvenlik riski oluşturabilir.",
      ],
    },
    {
      title: "Kilogram-kuvvet-metre ve pound-fit",
      paragraphs: [
        "Kilogram-kuvvet-metre (kgf·m), özellikle bazı otomotiv kataloglarında (Avrupa ve Asya menşeli) hâlâ kullanılan gravitasyonel bir tork birimidir; 1 kgf·m tam olarak 9,80665 N·m'ye eşittir.",
        "Pound-fit (lb-ft), ABD mühendislik ve otomotiv sektöründe standart tork birimidir; 1 lb-ft yaklaşık 1,355818 N·m'ye eşittir. ABD kaynaklı bir motor kataloğundaki tork değerini yorumlarken bu birimin doğru şekilde N·m'ye çevrilmesi önemlidir.",
      ],
    },
    {
      title: "Tork nasıl ölçülür?",
      paragraphs: [
        "Tork ölçümünde tork anahtarları (basit mekanik/dijital), tork sensörleri (strain gauge tabanlı) ve dinamometreler kullanılır. Motor test bankolarında dinamometreler, motorun farklı devirlerdeki tork ve güç çıktısını eş zamanlı ölçebilir.",
        "Hassas endüstriyel uygulamalarda (havacılık, tıbbi cihaz üretimi gibi) dijital tork anahtarları, uygulanan torku gerçek zamanlı olarak gösterip belirlenen değeri aştığında uyarı verebilir.",
      ],
    },
  ],

  unitTable: [
    {
      name: "Newton-metre",
      symbol: "N·m",
      referenceValue: "1 N·m",
      system: "SI",
      commonUse: "Motor torku ve mühendislik hesapları",
    },
    {
      name: "Kilonewton-metre",
      symbol: "kN·m",
      referenceValue: "1000 N·m",
      system: "SI/metrik",
      commonUse: "Büyük yapısal ve endüstriyel tork",
    },
    {
      name: "Kilogram-kuvvet-metre",
      symbol: "kgf·m",
      referenceValue: "9,80665 N·m",
      system: "Gravitasyonel (metrik)",
      commonUse: "Otomotiv katalogları (Avrupa/Asya)",
    },
    {
      name: "Pound-fit",
      symbol: "lb·ft",
      referenceValue: "≈1,355818 N·m",
      system: "İngiliz/ABD",
      commonUse: "ABD otomotiv ve mühendislik",
    },
  ],
};
