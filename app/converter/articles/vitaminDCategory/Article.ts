import type { CategoryArticle } from "../../categoryArticles";

export const vitaminDCategoryArticle: CategoryArticle = {
  slug: "vitamin-d",

  introduction: [
    "Vitamin D (25-hidroksivitamin D, 25-OH D) seviyesi, kandaki vitamin D deposunu gösteren standart bir laboratuvar ölçümüdür. Dünya genelinde iki farklı birim kullanılır: SI birimi olan nanomol/litre (nmol/L) ve özellikle ABD'de yaygın olan nanogram/mililitre (ng/mL).",

    "Bu iki birim arasındaki fark, yurt dışı laboratuvar sonuçlarını okurken veya uluslararası sağlık kaynaklarını takip ederken karışıklığa yol açabilir -- aynı sayısal değer iki farklı birimde çok farklı bir vitamin D seviyesini ifade edebilir.",
  ],

  facts: [
    {
      label: "Ölçülen madde",
      value: "25-hidroksivitamin D (25-OH D)",
    },
    {
      label: "SI birimi (dünya geneli)",
      value: "Nanomol/Litre (nmol/L)",
    },
    {
      label: "ABD'de yaygın birim",
      value: "Nanogram/Mililitre (ng/mL)",
    },
    {
      label: "Dönüşüm faktörü",
      value: "nmol/L = ng/mL × 2,496",
    },
    {
      label: "25-OH Vitamin D'nin molar kütlesi",
      value: "≈400,64 g/mol",
    },
  ],

  sections: [
    {
      title: "Vitamin D seviyesi neden iki farklı birimle ölçülür?",
      paragraphs: [
        "Uluslararası SI birim sistemini takip eden ülkeler (Türkiye dahil çoğu Avrupa ülkesi) vitamin D seviyesini nanomol/litre (nmol/L) cinsinden ifade eder. ABD ise geleneksel olarak kütle bazlı nanogram/mililitre (ng/mL) birimini kullanmaya devam eder.",
        "Dönüşüm faktörü (2,496), 25-hidroksivitamin D molekülünün molar kütlesinden (yaklaşık 400,64 g/mol) türetilir; bu ilişki, birimler arası dönüşümün neden sabit bir çarpan ile yapılabildiğini açıklar.",
      ],
    },
    {
      title: "ng/mL'den nmol/L'ye dönüşüm nasıl yapılır?",
      paragraphs: [
        "ng/mL biriminden nmol/L'ye geçmek için değer 2,496 ile çarpılır: nmol/L = ng/mL × 2,496. Örneğin 30 ng/mL'lik bir değer, yaklaşık 74,9 nmol/L'ye karşılık gelir.",
        "Ters yönde, nmol/L'den ng/mL'ye geçmek için değer 2,496'ya bölünür: ng/mL = nmol/L ÷ 2,496. Bu basit oransal ilişki, molekülün sabit bir molar kütleye sahip olmasından kaynaklanır.",
      ],
    },
    {
      title: "Genel referans aralıkları (bilgilendirme amaçlı)",
      paragraphs: [
        "Bazı uluslararası kaynaklarda (örneğin Endocrine Society) yaygın olarak atıfta bulunulan genel aralıklar: 20 ng/mL (50 nmol/L) altı 'yetersizlik/eksiklik', 20-29 ng/mL (50-72,5 nmol/L) aralığı 'göreceli yetersizlik', 30 ng/mL (75 nmol/L) ve üzeri ise genellikle 'yeterli' olarak değerlendirilir.",
        "Bu eşik değerler farklı sağlık kuruluşları arasında küçük farklılıklar gösterebilir ve kişinin yaşı, sağlık durumu ve coğrafi bölgesine göre yorumlanmalıdır. Bu sayfa yalnızca genel bilgilendirme amaçlıdır; kesin değerlendirme bir hekim tarafından yapılmalıdır.",
      ],
    },
    {
      title: "Vitamin D neden diğer vitaminlerden farklı ölçülür?",
      paragraphs: [
        "Kandaki dolaşan vitamin D'nin çoğu, karaciğerde üretilen ve nispeten uzun yarı ömre sahip 25-hidroksivitamin D formundadır; bu yüzden vitamin D durumunu değerlendirmek için bu spesifik metabolit ölçülür (aktif hormon formu olan 1,25-dihidroksivitamin D değil).",
        "Bu tercih, 25-OH D'nin kan dolaşımındaki daha uzun ve stabil varlığından kaynaklanır -- aktif form çok daha hızlı değiştiği ve sıkı hormonal kontrole tabi olduğu için, uzun vadeli vitamin D deposunu daha güvenilir şekilde yansıtmaz.",
      ],
    },
    {
      title: "Vitamin D kaynakları",
      paragraphs: [
        "Vücut, cildin güneş ışığındaki UVB radyasyonuna maruz kalmasıyla kendi vitamin D'sini üretebilir; bu, çoğu insan için en büyük vitamin D kaynağıdır. Yağlı balık, yumurta sarısı ve güçlendirilmiş süt ürünleri gibi az sayıda gıda da doğal olarak vitamin D içerir.",
        "Kuzey enlemlerde yaşayan, güneşe az maruz kalan veya koyu tenli bireylerde vitamin D sentezi daha düşük olabilir; bu durumlar genellikle vitamin D takviyesi ihtiyacının değerlendirilmesinde dikkate alınır.",
      ],
    },
  ],

  unitTable: [
    {
      name: "Nanomol/Litre",
      symbol: "nmol/L",
      referenceValue: "1 nmol/L",
      system: "SI (dünya geneli)",
      commonUse: "Türkiye ve Avrupa'da laboratuvar sonucu",
    },
    {
      name: "Nanogram/Mililitre",
      symbol: "ng/mL",
      referenceValue: "≈2,496 nmol/L",
      system: "Geleneksel (ABD)",
      commonUse: "ABD'de laboratuvar sonucu",
    },
  ],
};
