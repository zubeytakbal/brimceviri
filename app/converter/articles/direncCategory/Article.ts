import type { CategoryArticle } from "../../categoryArticles";

export const direncCategoryArticle: CategoryArticle = {
  slug: "direnc",

  introduction: [
    "Elektrik direnci, bir iletkenin elektrik akımının geçişine karşı gösterdiği zorluğu ifade eden fiziksel büyüklüktür. Devre tasarımından ısıtıcı elemanlara kadar birçok elektrik ve elektronik uygulamasının temelini oluşturur.",

    "Uluslararası Birimler Sistemi'nde direncin türetilmiş birimi ohmdur (Ω). Küçük devre elemanlarında ohm, büyük dirençlerde (yalıtım direnci gibi) ise kiloohm (kΩ) ve megaohm (MΩ) kullanılır.",
  ],

  facts: [
    {
      label: "Fiziksel büyüklük",
      value: "Elektrik direnci",
    },
    {
      label: "Boyut sembolü",
      value: "[ML²T⁻³I⁻²]",
    },
    {
      label: "SI türetilmiş birimi",
      value: "Ohm",
    },
    {
      label: "SI birim sembolü",
      value: "Ω",
    },
    {
      label: "Temel formül (Ohm Yasası)",
      value: "R = V / I (Direnç = Gerilim / Akım)",
    },
  ],

  sections: [
    {
      title: "Elektrik direnci nedir?",
      paragraphs: [
        "Elektrik direnci, bir iletkenin elektron akışına (elektrik akımına) karşı gösterdiği zorluk derecesidir. Bir iletkenin direnci ne kadar yüksekse, aynı gerilim altında o kadar az akım geçer.",
        "Direnç, iletkenin cinsine (özdirenç), uzunluğuna, kesit alanına ve sıcaklığına bağlıdır. Uzun ve ince bir kablo, kısa ve kalın bir kabloya göre daha fazla direnç gösterir.",
      ],
    },
    {
      title: "Direncin SI birimi: Ohm",
      paragraphs: [
        "Ohm, elektrik direncinin SI türetilmiş birimidir ve Ω (omega) sembolüyle gösterilir; Alman fizikçi Georg Simon Ohm'un onuruna adlandırılmıştır. Bir devrede 1 ohm'luk direnç, 1 voltluk gerilim uygulandığında 1 amperlik akım akmasına neden olan dirençtir.",
        "Ohm Yasası (V = I × R), gerilim, akım ve direnç arasındaki temel ilişkiyi tanımlar ve elektrik/elektronik mühendisliğinin en temel formüllerinden biridir.",
      ],
    },
    {
      title: "Direnç ve özdirenç farkı",
      paragraphs: [
        "Direnç, belirli bir nesnenin (belirli uzunluk ve kesitteki bir tel gibi) toplam direncini ifade ederken, özdirenç (resistivity) bir malzemenin cinsine özgü, boyuttan bağımsız bir özelliktir.",
        "Bakır gibi düşük özdirençli malzemeler iyi iletken olarak kullanılırken, lastik ve cam gibi yüksek özdirençli malzemeler yalıtkan olarak kullanılır. Aynı malzemeden yapılmış daha uzun veya daha ince bir tel, aynı özdirence sahip olsa da daha yüksek toplam dirence sahiptir.",
      ],
    },
    {
      title: "Direnç renk kodları",
      paragraphs: [
        "Elektronik devrelerde kullanılan sabit dirençlerin değeri genellikle üzerlerindeki renkli bantlarla (direnç renk kodu) ifade edilir; her renk belirli bir sayısal değeri veya çarpanı temsil eder.",
        "Bu sistem, küçük direnç elemanlarının üzerine sayı yazmanın pratik olmadığı dönemlerden kalma ama günümüzde de yaygın kullanılan bir standarttır; dört, beş veya altı bantlı versiyonları farklı hassasiyet seviyelerinde direnç değeri ve tolerans bilgisi taşır.",
      ],
    },
    {
      title: "Sıcaklığın direnç üzerindeki etkisi",
      paragraphs: [
        "Çoğu metalik iletkende sıcaklık arttıkça direnç de artar -- ısınan metal atomları daha fazla titreşir ve elektronların akışını daha fazla engeller. Bu ilişki, sıcaklık sensörlerinde (RTD - direnç tabanlı sıcaklık ölçer) kullanılır.",
        "Yarı iletkenlerde ise durum tam tersidir: sıcaklık arttıkça direnç genellikle azalır, çünkü daha fazla elektron iletim bandına geçebilir hâle gelir. Bu farklı davranış, metal ve yarı iletken malzemelerin elektronikte farklı amaçlarla kullanılmasının temel nedenlerinden biridir.",
      ],
    },
    {
      title: "Süperiletkenlik: sıfır direnç",
      paragraphs: [
        "Bazı malzemeler, mutlak sıfıra yakın çok düşük sıcaklıklara soğutulduğunda direncini tamamen kaybederek süperiletken hâle gelir; bu durumda elektrik akımı hiçbir enerji kaybı olmadan sonsuza kadar akabilir.",
        "Süperiletkenlik, MRI cihazlarındaki güçlü mıknatıslardan parçacık hızlandırıcılara kadar birçok ileri teknoloji uygulamasında kullanılır; ancak bu malzemelerin çoğu çok düşük sıcaklıklarda (genellikle sıvı helyum veya sıvı azot soğutması gerektirecek düzeyde) çalışabilir.",
      ],
    },
    {
      title: "Direnç nasıl ölçülür?",
      paragraphs: [
        "Direnç, bir multimetrenin ohmmetre fonksiyonu kullanılarak doğrudan ölçülebilir; cihaz test edilen bileşene küçük bir gerilim uygulayıp akan akımı ölçerek direnci hesaplar.",
        "Devre üzerindeyken (enerjili) direnç ölçümü genellikle yanıltıcı sonuç verir; bu yüzden doğru ölçüm için bileşenin devreden çıkarılması veya devrenin enerjisinin kesilmesi gerekir.",
      ],
    },
  ],

  unitTable: [
    {
      name: "Ohm",
      symbol: "Ω",
      referenceValue: "1 Ω",
      system: "SI",
      commonUse: "Devre elemanları ve direnç ölçümü",
    },
    {
      name: "Kiloohm",
      symbol: "kΩ",
      referenceValue: "1000 Ω",
      system: "SI/metrik",
      commonUse: "Elektronik devre dirençleri",
    },
    {
      name: "Megaohm",
      symbol: "MΩ",
      referenceValue: "1.000.000 Ω",
      system: "SI/metrik",
      commonUse: "Yalıtım direnci ölçümü",
    },
  ],
};
