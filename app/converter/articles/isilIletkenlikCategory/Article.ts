import type { CategoryArticle } from "../../categoryArticles";

export const isilIletkenlikCategoryArticle: CategoryArticle = {
  slug: "isil-iletkenlik",

  introduction: [
    "Isıl iletkenlik, bir malzemenin ısıyı ne kadar iyi ilettiğini ifade eden fiziksel özelliktir. Yalıtım malzemesi seçiminden elektronik soğutma tasarımına kadar birçok mühendislik kararının temelinde yer alır.",

    "Uluslararası Birimler Sistemi'nde ısıl iletkenliğin türetilmiş birimi watt/metre-Kelvindir (W/m·K); ABD mühendislik uygulamalarında ise BTU/saat-fit-°F yaygın kullanılır.",
  ],

  facts: [
    {
      label: "Fiziksel büyüklük",
      value: "Isıl iletkenlik",
    },
    {
      label: "Boyut sembolü",
      value: "[MLT⁻³Θ⁻¹]",
    },
    {
      label: "SI türetilmiş birimi",
      value: "Watt/Metre-Kelvin",
    },
    {
      label: "SI birim sembolü",
      value: "W/m·K",
    },
    {
      label: "Bakırın ısıl iletkenliği",
      value: "≈400 W/m·K (yüksek iletken)",
    },
  ],

  sections: [
    {
      title: "Isıl iletkenlik nedir?",
      paragraphs: [
        "Isıl iletkenlik (k), bir malzemenin ısıyı iletme kabiliyetini ifade eder ve Fourier'in ısı iletim yasasının temel katsayısıdır. Yüksek ısıl iletkenliğe sahip malzemeler (metaller gibi) ısıyı hızlı iletir; düşük ısıl iletkenliğe sahip malzemeler (köpük, yün gibi) ise ısıyı yavaş iletir ve yalıtkan olarak kullanılır.",
        "Isıl iletkenlik, malzemenin cinsine özgü bir özelliktir; parçanın kalınlığından veya boyutundan bağımsızdır -- bu, onu ısı transferi hesaplarında güvenilir bir referans değeri yapar.",
      ],
    },
    {
      title: "Isıl iletkenliğin SI birimi",
      paragraphs: [
        "Watt/metre-Kelvin (W/m·K), ısıl iletkenliğin SI türetilmiş birimidir; 1 metre kalınlığındaki bir malzeme katmanının iki yüzü arasında 1 Kelvin'lik sıcaklık farkı olduğunda, 1 metrekarelik alandan saniyede kaç watt'lık ısı geçtiğini ifade eder.",
        "Bu birim, Fourier'in ısı iletim denkleminin (q = -k × ∇T) doğrudan bir parçasıdır ve inşaat, HVAC ve elektronik soğutma mühendisliğinde temel bir tasarım parametresidir.",
      ],
    },
    {
      title: "Yalıtım malzemeleri neden düşük ısıl iletkenliğe sahiptir?",
      paragraphs: [
        "Cam yünü, taş yünü, EPS ve XPS gibi yalıtım malzemeleri, içlerinde hapsolmuş hava (veya başka bir gaz) cepleri sayesinde düşük ısıl iletkenliğe sahiptir -- hava, katı malzemelerden çok daha düşük bir ısıl iletkenliğe (yaklaşık 0,025 W/m·K) sahiptir.",
        "Bu yüzden iyi bir yalıtım malzemesi tasarımı, malzemenin kendisinden çok, içindeki gözenek yapısının havayı hareketsiz tutabilme (konveksiyonu engelleme) kabiliyetine dayanır.",
      ],
    },
    {
      title: "Metaller neden iyi ısı iletkenidir?",
      paragraphs: [
        "Metaller, serbest elektronlarının ısı enerjisini hızla taşıyabilmesi nedeniyle genellikle yüksek ısıl iletkenliğe sahiptir. Gümüş ve bakır, bilinen en yüksek ısıl iletkenliğe sahip pratik malzemeler arasındadır (sırasıyla yaklaşık 429 ve 400 W/m·K).",
        "Bu özellik, bakırın elektronik soğutucularda (heat sink) ve tencere tabanlarında neden tercih edildiğini açıklar -- ısıyı hızla ve eşit şekilde dağıtabilir.",
      ],
    },
    {
      title: "R-değeri ve ısıl iletkenlik ilişkisi",
      paragraphs: [
        "İnşaat sektöründe yalıtım performansı genellikle 'R-değeri' (ısıl direnç) ile ifade edilir; R-değeri, malzeme kalınlığının ısıl iletkenliğe bölünmesiyle bulunur (R = kalınlık / k). Bu yüzden aynı malzeme daha kalın uygulandığında R-değeri artar.",
        "Yüksek R-değeri, daha iyi yalıtım anlamına gelirken, düşük ısıl iletkenlik (k) tek başına bir malzemenin ne kadar kalın kullanılması gerektiğini belirlemez -- ikisi birlikte değerlendirilmelidir.",
      ],
    },
    {
      title: "Isıl iletkenlik nasıl ölçülür?",
      paragraphs: [
        "Isıl iletkenlik, laboratuvar ortamında 'korumalı sıcak plaka' (guarded hot plate) yöntemi veya 'ısı akışı ölçer' (heat flow meter) cihazlarıyla ölçülür; bu yöntemler, bilinen bir sıcaklık farkında malzemeden geçen ısı akısını doğrudan ölçer.",
        "Yalıtım malzemesi üreticileri, ürünlerinin ısıl iletkenlik değerlerini genellikle standart test koşullarında (belirli bir ortalama sıcaklıkta) ölçüp teknik veri sayfalarında beyan eder.",
      ],
    },
  ],

  unitTable: [
    {
      name: "Watt/Metre-Kelvin",
      symbol: "W/m·K",
      referenceValue: "1 W/m·K",
      system: "SI",
      commonUse: "Yalıtım malzemesi ve inşaat mühendisliği",
    },
    {
      name: "Watt/Santimetre-Kelvin",
      symbol: "W/cm·K",
      referenceValue: "100 W/m·K",
      system: "SI/metrik",
      commonUse: "Elektronik ve malzeme bilimi",
    },
    {
      name: "Kilowatt/Metre-Kelvin",
      symbol: "kW/m·K",
      referenceValue: "1000 W/m·K",
      system: "SI/metrik",
      commonUse: "Yüksek iletkenlikli malzeme hesapları",
    },
    {
      name: "BTU/Saat-Fit-°F",
      symbol: "Btu/h·ft·°F",
      referenceValue: "≈1,730735 W/m·K",
      system: "İngiliz/ABD",
      commonUse: "ABD inşaat ve HVAC mühendisliği",
    },
  ],
};
