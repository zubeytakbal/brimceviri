import type { CategoryArticle } from "../../categoryArticles";

export const gumusAyarCategoryArticle: CategoryArticle = {
  slug: "gumus-ayar",

  introduction: [
    "Gümüş, altın gibi neredeyse hiçbir zaman saf hâlde takı veya eşya üretiminde kullanılmaz -- yumuşak bir metal olduğu için bakır gibi başka metallerle karıştırılıp alaşım hâline getirilir. Milyem (binde ayar), bu alaşımdaki saf gümüş oranını gösteren ölçüdür.",

    "Altın ayarının aksine gümüş saflığı 24 üzerinden değil, 1000 üzerinden (binde) ifade edilir: 999 neredeyse tamamen saf gümüş, 925 ise dünya genelinde 'sterlin gümüş' olarak bilinen en yaygın takı standardıdır.",
  ],

  facts: [
    {
      label: "Ölçüm sistemi",
      value: "Milyem (binde ayar) sistemi",
    },
    {
      label: "Temel referans",
      value: "999 = %99,9 saf gümüş",
    },
    {
      label: "Dünya genelinde en yaygın takı standardı",
      value: "925 (Sterlin Gümüş)",
    },
    {
      label: "Külçe/yatırımlık gümüş",
      value: "999 Ayar (Fine Silver)",
    },
    {
      label: "Hesaplama mantığı",
      value: "Gram × (kaynak milyem / 1000) ÷ (hedef milyem / 1000)",
    },
  ],

  sections: [
    {
      title: "Gümüş ayarı (milyem) tam olarak neyi ölçer?",
      paragraphs: [
        "Gümüş saflığı, altından farklı olarak 24 birim üzerinden değil, binde (milyem, 1000 üzerinden) ifade edilir. 999 ayar, alaşımın binde 999'unun (yani %99,9'unun) saf gümüş olduğu anlamına gelir; kalan binde 1 ise genellikle iz miktarda diğer elementlerdir.",
        "925 ayar (sterlin gümüş), alaşımın %92,5'inin saf gümüş, geri kalan %7,5'inin ise genellikle bakır olduğu anlamına gelir. Bu küçük miktardaki bakır, saf gümüşün çok yumuşak ve kolay deforme olan yapısına dayanıklılık kazandırır.",
      ],
    },
    {
      title: "Sterlin gümüş (925) neden dünya standardı?",
      paragraphs: [
        "925 ayar sterlin gümüş standardı, İngiltere'de 12. yüzyıla kadar uzanan bir tarihe sahiptir ve zamanla dünya genelinde takı, sofra takımı ve gümüş eşya üretiminde en yaygın kabul gören standart hâline gelmiştir.",
        "Saf gümüş (999) günlük kullanım eşyaları için fazla yumuşak ve çizilmeye açıktır; %7,5 oranında bakır eklenmesi gümüşe yeterli sertliği kazandırırken, gümüşün karakteristik parlaklığını ve rengini büyük ölçüde korur.",
      ],
    },
    {
      title: "999, 900 ve 800 ayar gümüş arasındaki farklar",
      paragraphs: [
        "999 ayar (fine silver/saf gümüş), külçe ve yatırımlık gümüş ürünlerinde tercih edilir çünkü yatırımcılar için saflık oranı en önemli kriterdir; ancak yumuşaklığı nedeniyle günlük takıda nadiren kullanılır.",
        "900 ayar (coin silver), tarihsel olarak birçok ülkenin gümüş madeni paralarında kullanılmıştır. 800 ayar ise özellikle Avrupa'da (Almanya, Avusturya gibi ülkelerde) yaygın olan, sterlin gümüşten daha düşük saflıkta ama yine de dayanıklı bir takı standardıdır.",
      ],
    },
    {
      title: "Saf gümüş içeriği nasıl hesaplanır?",
      paragraphs: [
        "10 gramlık 925 ayar bir gümüş yüzüğün içindeki saf gümüş miktarını bulmak için: 10 × (925 / 1000) = 9,25 gram saf gümüş içerir. Geri kalan 0,75 gram, dayanıklılık için eklenen bakır veya diğer metallerdir.",
        "Farklı ayarlar arasında dönüşüm yaparken de aynı mantık kullanılır: örneğin 925 ayar bir alaşımdaki saf gümüş miktarı biliniyorsa, bu miktarın 999 ayar karşılığı, saf gümüş miktarının 999/1000'e bölünmesiyle bulunur.",
      ],
    },
    {
      title: "Gümüşün kararması ve saflıkla ilişkisi",
      paragraphs: [
        "Gümüş takıların zamanla kararması (matlaşması), gümüşün kendisinden değil, alaşımdaki bakırın havadaki kükürt bileşikleriyle reaksiyona girmesinden kaynaklanır. Bu yüzden daha yüksek saflıktaki gümüş (999 gibi) daha az kararma eğilimi gösterir.",
        "Bazı üreticiler, sterlin gümüşün kararmaya karşı direncini artırmak için 'tarnish-resistant' (kararmaya dirençli) sterlin gümüş alaşımları geliştirmiştir; bunlar bakır yerine germanyum gibi farklı katkı maddeleri kullanır.",
      ],
    },
  ],

  unitTable: [
    {
      name: "999 Ayar Gümüş",
      symbol: "999",
      referenceValue: "%99,9 saf gümüş",
      system: "Kuyumculuk standardı",
      commonUse: "Külçe, yatırımlık gümüş",
    },
    {
      name: "925 Ayar Gümüş",
      symbol: "925",
      referenceValue: "%92,5 saf gümüş (Sterlin)",
      system: "Kuyumculuk standardı",
      commonUse: "Takı ve sofra takımı (dünya standardı)",
    },
    {
      name: "900 Ayar Gümüş",
      symbol: "900",
      referenceValue: "%90 saf gümüş",
      system: "Kuyumculuk standardı",
      commonUse: "Tarihi gümüş sikkeler",
    },
    {
      name: "800 Ayar Gümüş",
      symbol: "800",
      referenceValue: "%80 saf gümüş",
      system: "Kuyumculuk standardı (Avrupa)",
      commonUse: "Avrupa takı standardı",
    },
  ],
};
