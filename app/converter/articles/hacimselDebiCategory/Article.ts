import type { CategoryArticle } from "../../categoryArticles";

export const hacimselDebiCategoryArticle: CategoryArticle = {
  slug: "hacimsel-debi",

  introduction: [
    "Hacimsel debi, birim zamanda bir kesitten geçen akışkan hacmini ifade eden mühendislik büyüklüğüdür. Havalandırma sistemlerinden pompa kapasitesine, endüstriyel proses tasarımından HVAC hesaplarına kadar birçok mühendislik uygulamasının temelini oluşturur.",

    "Uluslararası Birimler Sistemi'nde hacimsel debinin türetilmiş birimi metreküp/saniyedir (m³/s); havalandırma mühendisliğinde CFM (fitküp/dakika), pompa ve sıvı transfer sistemlerinde ise GPM (galon/dakika) yaygın olarak kullanılır.",
  ],

  facts: [
    {
      label: "Fiziksel büyüklük",
      value: "Hacimsel debi",
    },
    {
      label: "Boyut sembolü",
      value: "[L³T⁻¹]",
    },
    {
      label: "SI türetilmiş birimi",
      value: "Metreküp/Saniye",
    },
    {
      label: "SI birim sembolü",
      value: "m³/s",
    },
    {
      label: "HVAC standart birimi",
      value: "CFM (Fitküp/Dakika)",
    },
  ],

  sections: [
    {
      title: "Hacimsel debi nedir?",
      paragraphs: [
        "Hacimsel debi, bir boru, kanal veya kesitten birim zamanda geçen akışkan hacmini ifade eder ve genellikle Q sembolüyle gösterilir. Süreklilik denklemine göre Q = A × v formülüyle hesaplanır; burada A kesit alanı, v ise akış hızıdır.",
        "Bu büyüklük, mühendislik tasarımında pompa, fan, kompresör ve boru hattı seçiminin temel girdisidir -- bir sistemin ne kadar akışkanı ne hızda taşıyabileceğini belirler.",
      ],
    },
    {
      title: "CFM: HVAC ve havalandırma standardı",
      paragraphs: [
        "CFM (Cubic Feet per Minute, fitküp/dakika), özellikle HVAC (ısıtma, havalandırma, klima) sektöründe fan ve klima kapasitesini ifade etmek için ABD kökenli ama dünya genelinde yaygın kullanılan standart birimdir.",
        "Bir odanın havalandırma ihtiyacı hesaplanırken, oda hacmi ve istenen hava değişim sayısına (saatte kaç kez tüm havanın değişeceği) göre gereken CFM değeri belirlenir; bu değer daha sonra uygun fan veya klima kapasitesinin seçilmesinde kullanılır.",
      ],
    },
    {
      title: "GPM: pompa ve sıvı transfer standardı",
      paragraphs: [
        "GPM (Gallons per Minute, galon/dakika), pompa kapasitesi ve sıvı transfer sistemlerinde (özellikle ABD kaynaklı ekipman kataloglarında) standart birimdir. Bir pompa seçilirken hem GPM (debi) hem de basma yüksekliği (head) birlikte değerlendirilir.",
        "GPM cinsinden verilen bir pompa kapasitesi, metrik sisteme geçerken litre/dakika veya metreküp/saat gibi birimlere çevrilerek yerel mühendislik standartlarıyla uyumlu hâle getirilir.",
      ],
    },
    {
      title: "Hacimsel debi ve kesit alanı ilişkisi",
      paragraphs: [
        "Aynı hacimsel debiyi sağlamak için kullanılan kanal veya boru kesiti küçüldükçe, akış hızı orantılı olarak artmak zorundadır (Q = A × v ilişkisi gereği). Bu, küçük kesitli kanallarda daha yüksek hız kaynaklı gürültü ve basınç kaybı riskini beraberinde getirir.",
        "HVAC kanal tasarımında bu yüzden yalnızca gereken CFM değeri değil, aynı zamanda kanal içindeki hava hızının kabul edilebilir bir aralıkta (genellikle saniyede birkaç metre) kalması da hedeflenir.",
      ],
    },
    {
      title: "Kompresör ve fan performans eğrileri",
      paragraphs: [
        "Fan ve kompresörlerin performansı genellikle bir 'performans eğrisi' ile ifade edilir; bu eğri, farklı basınç (veya basma yüksekliği) değerlerinde cihazın sağlayabileceği hacimsel debiyi gösterir.",
        "Bir sistemin gerçek çalışma noktası, bu performans eğrisi ile sistemin kendi direnç eğrisinin (borular, dirsekler, filtreler gibi elemanların oluşturduğu toplam dirençten kaynaklanan) kesiştiği noktada belirlenir.",
      ],
    },
    {
      title: "Hacimsel debi ölçüm cihazları",
      paragraphs: [
        "Havalandırma sistemlerinde hacimsel debi genellikle bir anemometre (hava hızı ölçer) ile kanal kesitindeki hızı ölçüp kesit alanıyla çarparak hesaplanır. Sıvı sistemlerinde ise türbin tipi, manyetik veya ultrasonik debimetreler doğrudan hacimsel debiyi ölçebilir.",
        "Endüstriyel proseslerde debi ölçüm doğruluğu, hem proses verimliliği hem de güvenlik (aşırı veya yetersiz akışın önlenmesi) açısından kritik önem taşır.",
      ],
    },
  ],

  unitTable: [
    {
      name: "Litre/Saniye",
      symbol: "L/s",
      referenceValue: "0,001 m³/s",
      system: "Metrik",
      commonUse: "Su tesisatı ve pompa hesapları",
    },
    {
      name: "Metreküp/Saniye",
      symbol: "m³/s",
      referenceValue: "1 m³/s",
      system: "SI",
      commonUse: "Büyük ölçekli mühendislik hesapları",
    },
    {
      name: "Fitküp/Dakika (CFM)",
      symbol: "cfm",
      referenceValue: "≈0,000472 m³/s",
      system: "İngiliz/ABD (HVAC)",
      commonUse: "Fan ve klima kapasitesi",
    },
    {
      name: "Galon/Dakika (GPM)",
      symbol: "gpm",
      referenceValue: "≈0,0000631 m³/s",
      system: "İngiliz/ABD",
      commonUse: "Pompa ve sıvı transfer kapasitesi",
    },
  ],
};
