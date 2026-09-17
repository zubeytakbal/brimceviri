import type { CategoryArticle } from "../../categoryArticles";

export const ozgulIsiCategoryArticle: CategoryArticle = {
  slug: "ozgul-isi",

  introduction: [
    "Özgül ısı, bir maddenin birim kütlesinin sıcaklığını 1 derece artırmak için gereken enerji miktarını ifade eden fiziksel büyüklüktür. Suyun iklim üzerindeki dengeleyici etkisinden malzeme ısıtma hesaplarına kadar birçok alanda önemli bir rol oynar.",

    "Uluslararası Birimler Sistemi'nde özgül ısının türetilmiş birimi Joule/kilogram-Kelvindir (J/kg·K); beslenme ve kimyada kalori/gram-Kelvin (cal/g·K), ABD mühendisliğinde ise BTU/pound-Fahrenhayt (Btu/lb·°F) kullanılır.",
  ],

  facts: [
    {
      label: "Fiziksel büyüklük",
      value: "Özgül ısı (özgül ısı kapasitesi)",
    },
    {
      label: "Boyut sembolü",
      value: "[L²T⁻²Θ⁻¹]",
    },
    {
      label: "SI türetilmiş birimi",
      value: "Joule/Kilogram-Kelvin",
    },
    {
      label: "SI birim sembolü",
      value: "J/kg·K",
    },
    {
      label: "Suyun özgül ısısı",
      value: "4184 J/kg·K (1 cal/g·K)",
    },
  ],

  sections: [
    {
      title: "Özgül ısı nedir?",
      paragraphs: [
        "Özgül ısı (c), bir maddenin 1 kilogramının sıcaklığını 1 Kelvin (veya 1°C) artırmak için gereken enerji miktarını ifade eder. Formülü q = m × c × ΔT şeklindedir; burada q ısı miktarı, m kütle, c özgül ısı, ΔT ise sıcaklık değişimidir.",
        "Özgül ısı, maddenin cinsine özgü bir özelliktir -- aynı miktarda enerji verildiğinde, düşük özgül ısıya sahip maddeler (metaller gibi) hızlı ısınırken, yüksek özgül ısıya sahip maddeler (su gibi) çok daha yavaş ısınır.",
      ],
    },
    {
      title: "Suyun olağanüstü yüksek özgül ısısı",
      paragraphs: [
        "Suyun özgül ısısı (4184 J/kg·K, yani tanım gereği tam olarak 1 cal/g·K) çoğu yaygın maddeden belirgin şekilde yüksektir -- örneğin demirin özgül ısısı yaklaşık 450 J/kg·K'dir, yani su demire göre yaklaşık 9 kat daha fazla ısı depolayabilir.",
        "Bu özellik, kalori biriminin tarihsel tanımının doğrudan kaynağıdır: 1 kalori, orijinal olarak 1 gram suyun sıcaklığını 1°C artırmak için gereken enerji olarak tanımlanmıştır.",
      ],
    },
    {
      title: "Suyun yüksek özgül ısısı iklimi nasıl etkiler?",
      paragraphs: [
        "Okyanuslar ve büyük göller, yüksek özgül ısıları sayesinde büyük miktarda ısı enerjisini depolayıp yavaşça salabilir; bu, kıyı bölgelerinin iç kesimlere göre daha ılıman bir iklime (yazın daha serin, kışın daha ılık) sahip olmasının başlıca nedenidir.",
        "Bu 'termal atalet' etkisi, denizden uzak kara içi bölgelerin neden daha 'sert' (yazın daha sıcak, kışın daha soğuk) bir iklime sahip olduğunu da açıklar -- toprak ve kayaların özgül ısısı sudan çok daha düşüktür.",
      ],
    },
    {
      title: "Özgül ısı ve ısı kapasitesi farkı",
      paragraphs: [
        "Özgül ısı, birim kütle başına tanımlanan bir madde özelliğiyken, ısı kapasitesi belirli bir nesnenin (belirli kütledeki bir cismin) toplam ısı depolama kapasitesini ifade eder ve ısı kapasitesi = kütle × özgül ısı formülüyle hesaplanır.",
        "Örneğin küçük bir su bardağı ile büyük bir su deposu aynı özgül ısıya (aynı madde olduğu için) sahiptir, ama depo çok daha fazla kütleye sahip olduğu için çok daha yüksek bir toplam ısı kapasitesine sahiptir.",
      ],
    },
    {
      title: "Malzeme seçiminde özgül ısının rolü",
      paragraphs: [
        "Isı depolama sistemlerinde (örneğin güneş enerjili su ısıtıcıları veya termal enerji depolama tankları) yüksek özgül ısıya sahip malzemeler tercih edilir, çünkü aynı hacimde daha fazla enerji depolayabilirler.",
        "Tersine, hızlı ısınması/soğuması istenen uygulamalarda (bazı pişirme kapları, ısı eşanjörleri gibi) düşük özgül ısıya sahip malzemeler (bakır, alüminyum gibi metaller) tercih edilir.",
      ],
    },
    {
      title: "Özgül ısı nasıl ölçülür?",
      paragraphs: [
        "Özgül ısı, kalorimetre adı verilen ve bir maddenin ısı alışverişini hassas şekilde ölçen cihazlarla belirlenir; bilinen bir kütledeki madde ısıtılır veya soğutulur ve verilen/alınan enerji ile sıcaklık değişimi ölçülerek özgül ısı hesaplanır.",
        "Yiyecek ve malzeme bilimi araştırmalarında yaygın kullanılan diferansiyel taramalı kalorimetre (DSC), özgül ısıyı geniş bir sıcaklık aralığında hassas şekilde ölçebilen modern bir tekniktir.",
      ],
    },
  ],

  unitTable: [
    {
      name: "Joule/Kilogram-Kelvin",
      symbol: "J/kg·K",
      referenceValue: "1 J/kg·K",
      system: "SI",
      commonUse: "Bilimsel ve mühendislik hesapları",
    },
    {
      name: "Kilojoule/Kilogram-Kelvin",
      symbol: "kJ/kg·K",
      referenceValue: "1000 J/kg·K",
      system: "SI/metrik",
      commonUse: "Malzeme ve termodinamik tablolar",
    },
    {
      name: "Kalori/Gram-Kelvin",
      symbol: "cal/g·K",
      referenceValue: "4184 J/kg·K",
      system: "Metrik (geleneksel)",
      commonUse: "Kimya ve beslenme bilimi",
    },
    {
      name: "BTU/Pound-Fahrenhayt",
      symbol: "Btu/lb·°F",
      referenceValue: "4186,8 J/kg·K",
      system: "İngiliz/ABD",
      commonUse: "ABD mühendislik hesapları",
    },
  ],
};
