import type { CategoryArticle } from "../../categoryArticles";

export const debiCategoryArticle: CategoryArticle = {
  slug: "debi",

  introduction: [
    "Debi, birim zamanda bir kesitten geçen akışkan (sıvı veya gaz) hacmini ifade eden türetilmiş bir fiziksel büyüklüktür. Su tesisatı, sulama sistemleri, pompa seçimi ve HVAC uygulamalarında günlük olarak karşılaşılan temel bir büyüklüktür.",

    "Günlük hayatta ve tesisatçılıkta en sık kullanılan debi birimleri metreküp/saat (m³/h) ve litre/dakika (L/min)'dir; daha mühendislik ağırlıklı hesaplarda CFM (fit küp/dakika) ve GPM (galon/dakika) gibi birimler tercih edilir.",
  ],

  facts: [
    {
      label: "Fiziksel büyüklük",
      value: "Hacimsel debi (akış hızı)",
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
      label: "Temel formül",
      value: "Debi (Q) = Hacim / Zaman = Kesit Alanı × Akış Hızı",
    },
  ],

  sections: [
    {
      title: "Debi nedir?",
      paragraphs: [
        "Debi, bir boru, kanal veya kesitten birim zamanda geçen akışkan (su, hava, yakıt gibi) hacmini ifade eder. Genellikle Q sembolüyle gösterilir ve Q = V / t (hacim bölü zaman) formülüyle hesaplanır.",
        "Debi, aynı zamanda kesit alanı ile akış hızının çarpımı olarak da ifade edilebilir: Q = A × v. Bu ilişki, süreklilik denklemi olarak bilinir ve boru çapı hesaplamalarının temelini oluşturur.",
      ],
    },
    {
      title: "Debinin SI birimi",
      paragraphs: [
        "Uluslararası Birimler Sistemi'nde debinin türetilmiş birimi metreküp/saniyedir (m³/s); ancak bu birim günlük tesisat uygulamaları için genellikle çok büyük kaldığından, pratikte metreküp/saat (m³/h) ve litre/dakika (L/min) gibi daha küçük ölçekli birimler tercih edilir.",
        "Bir birimden diğerine geçerken hem hacim hem de zaman biriminin dönüştürüldüğüne dikkat edilmelidir; örneğin 1 m³/saat, 1000 litrenin 60 dakikaya bölünmesiyle yaklaşık 16,67 L/dakikaya eşittir.",
      ],
    },
    {
      title: "Ev ve bina tesisatında debi",
      paragraphs: [
        "Konut tesisatında musluk, duş başlığı ve sayaçların debi değerleri genellikle litre/dakika cinsinden ifade edilir; bir standart duş başlığı tipik olarak 6-12 L/dakika arasında su akıtır.",
        "Bina su şebekesi tasarımında ise toplam debi ihtiyacı (aynı anda kaç musluğun/duşun kullanılacağı tahmin edilerek) metreküp/saat cinsinden hesaplanır ve buna göre ana hat boru çapı belirlenir.",
      ],
    },
    {
      title: "Debi ve boru çapı ilişkisi",
      paragraphs: [
        "Aynı debiyi taşımak için kullanılan boru çapı küçüldükçe, akışkanın hızı artmak zorundadır (Q = A × v ilişkisi gereği); bu da sürtünme kaynaklı basınç kaybının artmasına yol açar.",
        "Bu yüzden tesisat tasarımında sadece yeterli debiyi sağlamak değil, aynı zamanda akış hızını önerilen aralıkta (aşırı yüksek olmayacak şekilde) tutacak boru çapını seçmek de önemlidir.",
      ],
    },
    {
      title: "Sulama sistemlerinde debi",
      paragraphs: [
        "Bahçe ve tarım sulamasında damla sulama sistemlerinin debisi genellikle litre/saat (damlatıcı başına), sprinkler sistemlerinin debisi ise litre/dakika cinsinden ifade edilir.",
        "Bir sulama sisteminin toplam su ihtiyacını hesaplamak için, kullanılan tüm damlatıcı veya başlıkların debilerinin toplanması ve bu toplamın su kaynağının (şebeke veya pompa) sağlayabileceği maksimum debiyle karşılaştırılması gerekir.",
      ],
    },
    {
      title: "Debi nasıl ölçülür?",
      paragraphs: [
        "Debi ölçümünde su sayaçları, türbin tipi debimetreler, manyetik (elektromanyetik) debimetreler ve ultrasonik debimetreler gibi farklı teknolojiler kullanılır; her biri farklı akışkan tipi ve hassasiyet gereksinimine göre tercih edilir.",
        "Basit bir tahmini ölçüm için, bilinen hacimli bir kabın (örneğin 1 litrelik) doldurulma süresi kronometreyle ölçülerek debi yaklaşık olarak hesaplanabilir -- bu yöntem özellikle düşük debili musluk ve duş başlıklarının kontrolünde pratik bir yol sunar.",
      ],
    },
  ],

  unitTable: [
    {
      name: "Litre/Dakika",
      symbol: "L/min",
      referenceValue: "≈0,0000167 m³/s",
      system: "Metrik (günlük kullanım)",
      commonUse: "Musluk, duş ve küçük ölçekli su akışı",
    },
    {
      name: "Metreküp/Saat",
      symbol: "m³/h",
      referenceValue: "≈0,000278 m³/s",
      system: "Metrik (tesisat)",
      commonUse: "Bina su tesisatı ve pompa kapasitesi",
    },
  ],
};
