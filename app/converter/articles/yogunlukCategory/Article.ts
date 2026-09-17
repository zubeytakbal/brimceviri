import type { CategoryArticle } from "../../categoryArticles";

export const yogunlukCategoryArticle: CategoryArticle = {
  slug: "yogunluk",

  introduction: [
    "Yoğunluk, bir maddenin birim hacimdeki kütlesini ifade eden türetilmiş bir fiziksel büyüklüktür. Bir maddenin ne kadar 'sıkı' veya 'gevşek' olduğunu, aynı hacimdeki iki farklı maddenin kütlece nasıl farklılaştığını gösterir.",

    "Uluslararası Birimler Sistemi'nde yoğunluğun türetilmiş birimi kilogram/metreküptür (kg/m³); laboratuvar ve günlük kullanımda ise gram/santimetreküp (g/cm³) ve kilogram/litre (kg/L) daha yaygındır. Bu üç birim sayısal olarak birbirine eşittir.",
  ],

  facts: [
    {
      label: "Fiziksel büyüklük",
      value: "Yoğunluk",
    },
    {
      label: "Boyut sembolü",
      value: "[ML⁻³]",
    },
    {
      label: "SI türetilmiş birimi",
      value: "Kilogram/Metreküp",
    },
    {
      label: "SI birim sembolü",
      value: "kg/m³",
    },
    {
      label: "Suyun yoğunluğu (4°C'de)",
      value: "1000 kg/m³ = 1 g/cm³ = 1 kg/L",
    },
  ],

  sections: [
    {
      title: "Yoğunluk nedir?",
      paragraphs: [
        "Yoğunluk, bir maddenin birim hacimdeki kütlesini ifade eder ve ρ (rho) sembolüyle gösterilir. Formülü ρ = m / V şeklindedir; burada m kütleyi, V ise hacmi ifade eder.",
        "Yoğunluk türetilmiş bir büyüklüktür; kütlenin hacme bölünmesinden elde edilir ve SI boyutu ML⁻³ (kütle bölü uzunluk küp) olarak gösterilir. Aynı maddenin farklı miktarlarda örnekleri (küçük veya büyük parçalar) her zaman aynı yoğunluğa sahiptir -- yoğunluk maddenin türüne özgü bir özelliktir, miktarına bağlı değildir.",
      ],
    },
    {
      title: "Suyun yoğunluğu neden referans alınır?",
      paragraphs: [
        "Suyun yoğunluğu 4°C'de (en yüksek yoğunluğa ulaştığı sıcaklıkta) tam olarak 1000 kg/m³'e, yani 1 g/cm³'e eşittir. Bu, gram ve santimetreküp birimlerinin tarihsel olarak suyun yoğunluğuna göre tanımlanmasından kaynaklanır.",
        "Bu referans değer sayesinde bir maddenin 'özgül ağırlığı' (specific gravity/relative density) kavramı ortaya çıkar -- bir maddenin yoğunluğunun suyun yoğunluğuna oranı olarak ifade edilir. Örneğin özgül ağırlığı 0,92 olan buz, sudan daha az yoğun olduğu için su üzerinde yüzer.",
      ],
    },
    {
      title: "Yoğunluk birimleri arasındaki eşitlik",
      paragraphs: [
        "Kilogram/metreküp (kg/m³), gram/santimetreküp (g/cm³) ve kilogram/litre (kg/L) arasında pratik bir ilişki vardır: 1 g/cm³ tam olarak 1 kg/L'ye ve 1000 kg/m³'e eşittir. Bu, hem kütle hem hacim biriminin aynı oranda (1000 kat) değişmesinden kaynaklanır.",
        "Bu eşitlik, laboratuvar ölçümlerinde (genellikle g/cm³ veya g/mL kullanılır) ve endüstriyel/mühendislik hesaplarında (genellikle kg/m³ kullanılır) aynı sayısal değerin farklı birimlerle ifade edilmesini kolaylaştırır.",
      ],
    },
    {
      title: "Yoğunluk, kütle ve hacim ilişkisi",
      paragraphs: [
        "Yoğunluk formülü (ρ = m/V) üç yönde de kullanılabilir: kütle ve hacimden yoğunluk, yoğunluk ve hacimden kütle veya yoğunluk ve kütleden hacim hesaplanabilir. Bu, malzeme ağırlığı hesaplamalarının (bir parçanın hacminden ağırlığını bulma) temelini oluşturur.",
        "Örneğin 2 metreküp hacminde ve 7850 kg/m³ yoğunluğunda (tipik çelik yoğunluğu) bir parçanın kütlesi, 2 × 7850 = 15.700 kg olarak hesaplanır.",
      ],
    },
    {
      title: "İngiliz/ABD sisteminde yoğunluk birimleri",
      paragraphs: [
        "ABD ve İngiltere mühendislik uygulamalarında pound/fitküp (lb/ft³) ve pound/inçküp (lb/in³) gibi birimler kullanılır. Bir lb/ft³ yaklaşık 16,02 kg/m³'e eşittir.",
        "Daha az bilinen bir birim olan slug/fitküp (slug/ft³), İngiliz mühendislik sisteminde kütle birimi olarak kullanılan 'slug' üzerine kuruludur -- slug, pound-kuvvetin ivme ile ilişkisinden (F=ma) türetilen, günlük hayatta neredeyse hiç karşılaşılmayan özel bir kütle birimidir.",
      ],
    },
    {
      title: "Sıvı ve gaz yoğunluğu neden değişkendir?",
      paragraphs: [
        "Katıların yoğunluğu genellikle sabit kabul edilirken, sıvı ve özellikle gazların yoğunluğu sıcaklık ve basınca bağlı olarak belirgin şekilde değişir. Hava, deniz seviyesinde yaklaşık 1,225 kg/m³ yoğunluğa sahipken, yükseklik arttıkça basınç düştüğü için yoğunluk da azalır.",
        "Bu değişkenlik, havacılıkta 'yoğunluk irtifası' kavramının, denizcilikte ise deniz suyu yoğunluğunun (tuzluluk ve sıcaklığa bağlı olarak) gemi batma hattı hesaplarında dikkate alınmasının nedenidir.",
      ],
    },
    {
      title: "Yoğunluk nasıl ölçülür?",
      paragraphs: [
        "Katı bir cismin yoğunluğunu ölçmek için kütlesi bir teraziyle, hacmi ise ya doğrudan geometrik ölçümle ya da suya batırıp taşan suyun hacmiyle (Arşimet prensibi) bulunur.",
        "Sıvıların yoğunluğu genellikle bir hidrometre (yoğunluk ölçer) ile doğrudan ölçülür; bu araç, sıvı içine batırıldığında yoğunluğa bağlı olarak farklı derinliğe batarak yoğunluğu doğrudan gösterir.",
      ],
    },
  ],

  unitTable: [
    {
      name: "Miligram/Litre",
      symbol: "mg/L",
      referenceValue: "0,001 kg/m³",
      system: "SI/metrik",
      commonUse: "Su kalitesi ve kirlilik ölçümü",
    },
    {
      name: "Gram/Litre",
      symbol: "g/L",
      referenceValue: "1 kg/m³",
      system: "SI/metrik",
      commonUse: "Çözelti derişimi",
    },
    {
      name: "Kilogram/Metreküp",
      symbol: "kg/m³",
      referenceValue: "1 kg/m³",
      system: "SI",
      commonUse: "Mühendislik ve malzeme yoğunluğu",
    },
    {
      name: "Gram/Santimetreküp",
      symbol: "g/cm³",
      referenceValue: "1000 kg/m³",
      system: "SI/metrik (laboratuvar)",
      commonUse: "Malzeme ve kimya laboratuvarı",
    },
    {
      name: "Kilogram/Litre",
      symbol: "kg/L",
      referenceValue: "1000 kg/m³",
      system: "SI/metrik",
      commonUse: "Sıvı yoğunluğu (yakıt, süt vb.)",
    },
    {
      name: "Pound/Fitküp",
      symbol: "lb/ft³",
      referenceValue: "≈16,02 kg/m³",
      system: "İngiliz/ABD",
      commonUse: "İnşaat ve malzeme mühendisliği",
    },
    {
      name: "Pound/İnçküp",
      symbol: "lb/in³",
      referenceValue: "≈27.680 kg/m³",
      system: "İngiliz/ABD",
      commonUse: "Metal ve alaşım yoğunluğu",
    },
  ],
};
